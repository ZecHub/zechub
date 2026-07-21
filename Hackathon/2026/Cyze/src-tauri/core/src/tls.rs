//! Self-signed TLS certificate generation for the embedded frostd sidecar.

use std::path::Path;

use rcgen::{CertifiedKey, generate_simple_self_signed};

use crate::error::CoreError;

/// A generated certificate + key pair in PEM form.
pub struct GeneratedCert {
    pub cert_pem: String,
    pub key_pem: String,
}

/// Generate a self-signed certificate whose SANs cover localhost and the
/// given extra hosts/IPs (so LAN participants can connect by IP).
pub fn generate_self_signed(extra_sans: &[String]) -> Result<GeneratedCert, CoreError> {
    let mut sans: Vec<String> = vec!["localhost".into(), "127.0.0.1".into()];
    sans.extend(extra_sans.iter().cloned());
    sans.dedup();
    let CertifiedKey { cert, key_pair } =
        generate_simple_self_signed(sans).map_err(|e| CoreError::Tls(e.to_string()))?;
    Ok(GeneratedCert {
        cert_pem: cert.pem(),
        key_pem: key_pair.serialize_pem(),
    })
}

/// SHA-256 fingerprint of a PEM certificate's DER bytes, hex with colons,
/// for display so users can verify what they're trusting.
pub fn cert_fingerprint(cert_pem: &str) -> Result<String, CoreError> {
    let der = pem_to_der(cert_pem)?;
    // chacha20poly1305 doesn't give us SHA-256; use a tiny standalone impl via
    // the `ring`-free route: frost ecosystem already pulls sha2 transitively.
    use sha2::{Digest, Sha256};
    let hash = Sha256::digest(&der);
    Ok(hash
        .iter()
        .map(|b| format!("{b:02X}"))
        .collect::<Vec<_>>()
        .join(":"))
}

fn pem_to_der(pem: &str) -> Result<Vec<u8>, CoreError> {
    let b64: String = pem
        .lines()
        .filter(|l| !l.starts_with("-----"))
        .collect::<Vec<_>>()
        .join("");
    use base64::Engine;
    base64::engine::general_purpose::STANDARD
        .decode(b64.trim())
        .map_err(|e| CoreError::Tls(e.to_string()))
}

/// Write cert + key PEMs to disk (key with restrictive permissions on Unix).
pub fn write_cert_files(
    cert: &GeneratedCert,
    cert_path: &Path,
    key_path: &Path,
) -> Result<(), CoreError> {
    if let Some(dir) = cert_path.parent() {
        std::fs::create_dir_all(dir)?;
    }
    std::fs::write(cert_path, &cert.cert_pem)?;
    std::fs::write(key_path, &cert.key_pem)?;
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(key_path, std::fs::Permissions::from_mode(0o600))?;
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generate_and_fingerprint() {
        let cert = generate_self_signed(&["192.168.1.10".into()]).unwrap();
        assert!(cert.cert_pem.contains("BEGIN CERTIFICATE"));
        assert!(cert.key_pem.contains("PRIVATE KEY"));
        let fp = cert_fingerprint(&cert.cert_pem).unwrap();
        // 32 bytes -> 32 hex pairs joined by colons.
        assert_eq!(fp.split(':').count(), 32);
    }
}
