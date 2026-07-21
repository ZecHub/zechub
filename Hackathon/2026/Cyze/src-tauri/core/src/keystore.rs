//! Passphrase-encrypted keystore.
//!
//! ## v2 envelope (current)
//!
//! ```text
//! magic "FROSTKS2" (8) | version u8=2 | slot_count u8 |
//!   slot* | body_nonce (24) | AEAD(DEK, plaintext)
//! ```
//!
//! A random 32-byte **data encryption key (DEK)** encrypts the payload. The
//! DEK is then *wrapped* (encrypted) independently under one or more **key
//! slots**, each derived from a different secret with Argon2id. Any single
//! slot can unwrap the DEK, so the same keystore can be opened by either the
//! login passphrase or a recovery code — without the secrets ever touching
//! each other and without re-encrypting the payload when a secret changes.
//!
//! Each slot is:
//!
//! ```text
//! kind u8 | m_cost_kib u32 | t_cost u32 | p u8 | salt (16) |
//!   wrap_nonce (24) | wrapped_dek_len u16 | wrapped_dek (len)
//! ```
//!
//! The wrapped-DEK AEAD binds the slot descriptor as AAD; the payload AEAD
//! binds the whole header as AAD, so neither slots nor params can be tampered.
//!
//! ## v1 envelope (legacy, read-only)
//!
//! ```text
//! magic "FROSTKS1" (8) | version u8=1 | m_cost u32 | t_cost u32 | p u8 |
//!   salt (16) | nonce (24) | AEAD(key, plaintext)
//! ```
//!
//! where the key is Argon2id(passphrase) directly. v1 keystores still unlock
//! with the passphrase and are migrated to v2 on the next save.
//!
//! The plaintext is an upstream-format credentials TOML (see [`crate::config`]),
//! so a decrypted keystore is a valid upstream config.

use std::path::{Path, PathBuf};

use argon2::{Algorithm, Argon2, Params, Version};
use chacha20poly1305::{
    aead::{Aead, KeyInit, Payload},
    XChaCha20Poly1305, XNonce,
};
use rand::RngCore;
use zeroize::Zeroizing;

use crate::error::CoreError;

const MAGIC_V1: &[u8; 8] = b"FROSTKS1";
const MAGIC_V2: &[u8; 8] = b"FROSTKS2";
const VERSION_V1: u8 = 1;
const VERSION_V2: u8 = 2;
const SALT_LEN: usize = 16;
const NONCE_LEN: usize = 24;
const DEK_LEN: usize = 32;
const V1_HEADER_LEN: usize = 8 + 1 + 4 + 4 + 1 + SALT_LEN + NONCE_LEN;

/// Slot secret kinds.
const KIND_PASSPHRASE: u8 = 1;
const KIND_RECOVERY: u8 = 2;

/// Argon2id parameters, stored per slot so they can be raised later without
/// breaking existing keystores.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct KdfParams {
    pub m_cost_kib: u32,
    pub t_cost: u32,
    pub p_cost: u8,
}

impl Default for KdfParams {
    fn default() -> Self {
        // 64 MiB, 3 iterations, 1 lane.
        Self {
            m_cost_kib: 64 * 1024,
            t_cost: 3,
            p_cost: 1,
        }
    }
}

/// Build the AEAD cipher from a 32-byte key. Explicit `Key::from_slice`
/// typing avoids an `AsRef`/`Into` inference ambiguity that appears when other
/// crypto crates (e.g. the Zcash wallet stack) are also in the dependency tree.
fn xchacha(key: &[u8]) -> XChaCha20Poly1305 {
    XChaCha20Poly1305::new(chacha20poly1305::Key::from_slice(key))
}

fn derive_key(
    secret: &str,
    salt: &[u8],
    params: &KdfParams,
) -> Result<Zeroizing<[u8; 32]>, CoreError> {
    let argon_params = Params::new(params.m_cost_kib, params.t_cost, params.p_cost as u32, Some(32))
        .map_err(|e| CoreError::Crypto(e.to_string()))?;
    let argon = Argon2::new(Algorithm::Argon2id, Version::V0x13, argon_params);
    let mut key = Zeroizing::new([0u8; 32]);
    argon
        .hash_password_into(secret.as_bytes(), salt, key.as_mut())
        .map_err(|e| CoreError::Crypto(e.to_string()))?;
    Ok(key)
}

// ---------------------------------------------------------------------------
// Recovery phrase (BIP-39, 12 words / 128 bits)
// ---------------------------------------------------------------------------

/// Generate a fresh 12-word BIP-39 recovery phrase (128 bits of entropy).
pub fn generate_recovery_phrase() -> Result<Zeroizing<String>, CoreError> {
    let mut entropy = Zeroizing::new([0u8; 16]);
    rand::thread_rng().fill_bytes(entropy.as_mut());
    let mnemonic = bip39::Mnemonic::from_entropy(entropy.as_ref())
        .map_err(|e| CoreError::Crypto(format!("recovery phrase: {e}")))?;
    Ok(Zeroizing::new(mnemonic.to_string()))
}

/// Validate (and normalize) a user-entered recovery phrase. Returns the
/// canonical lowercase, single-spaced form on success.
pub fn normalize_recovery_phrase(input: &str) -> Result<Zeroizing<String>, CoreError> {
    let cleaned = input.split_whitespace().collect::<Vec<_>>().join(" ");
    let mnemonic = bip39::Mnemonic::parse(&cleaned)
        .map_err(|_| CoreError::Crypto("recovery phrase is not valid".into()))?;
    Ok(Zeroizing::new(mnemonic.to_string()))
}

// ---------------------------------------------------------------------------
// v2 envelope
// ---------------------------------------------------------------------------

#[derive(Clone)]
struct Slot {
    kind: u8,
    params: KdfParams,
    salt: [u8; SALT_LEN],
    wrap_nonce: [u8; NONCE_LEN],
    wrapped_dek: Vec<u8>,
}

/// Bytes that authenticate a slot's wrapped DEK (everything but the ciphertext).
fn slot_descriptor(kind: u8, params: &KdfParams, salt: &[u8], wrap_nonce: &[u8]) -> Vec<u8> {
    let mut d = Vec::with_capacity(1 + 9 + SALT_LEN + NONCE_LEN);
    d.push(kind);
    d.extend_from_slice(&params.m_cost_kib.to_le_bytes());
    d.extend_from_slice(&params.t_cost.to_le_bytes());
    d.push(params.p_cost);
    d.extend_from_slice(salt);
    d.extend_from_slice(wrap_nonce);
    d
}

/// Wrap a DEK under a secret, producing a new slot.
fn wrap_dek(dek: &[u8; DEK_LEN], secret: &str, params: &KdfParams, kind: u8) -> Result<Slot, CoreError> {
    let mut rng = rand::thread_rng();
    let mut salt = [0u8; SALT_LEN];
    rng.fill_bytes(&mut salt);
    let mut wrap_nonce = [0u8; NONCE_LEN];
    rng.fill_bytes(&mut wrap_nonce);

    let kek = derive_key(secret, &salt, params)?;
    let descriptor = slot_descriptor(kind, params, &salt, &wrap_nonce);
    let cipher = xchacha(kek.as_ref());
    let wrapped_dek = cipher
        .encrypt(
            XNonce::from_slice(&wrap_nonce),
            Payload {
                msg: dek.as_ref(),
                aad: &descriptor,
            },
        )
        .map_err(|e| CoreError::Crypto(e.to_string()))?;
    Ok(Slot {
        kind,
        params: *params,
        salt,
        wrap_nonce,
        wrapped_dek,
    })
}

/// Try to unwrap a slot's DEK with `secret`; `None` if the secret is wrong.
fn try_unwrap(slot: &Slot, secret: &str) -> Option<Zeroizing<[u8; DEK_LEN]>> {
    let kek = derive_key(secret, &slot.salt, &slot.params).ok()?;
    let descriptor = slot_descriptor(slot.kind, &slot.params, &slot.salt, &slot.wrap_nonce);
    let cipher = xchacha(kek.as_ref());
    let dek = cipher
        .decrypt(
            XNonce::from_slice(&slot.wrap_nonce),
            Payload {
                msg: &slot.wrapped_dek,
                aad: &descriptor,
            },
        )
        .ok()?;
    let arr: [u8; DEK_LEN] = dek.try_into().ok()?;
    Some(Zeroizing::new(arr))
}

fn serialize_header(slots: &[Slot], body_nonce: &[u8; NONCE_LEN]) -> Vec<u8> {
    let mut h = Vec::new();
    h.extend_from_slice(MAGIC_V2);
    h.push(VERSION_V2);
    h.push(slots.len() as u8);
    for s in slots {
        h.push(s.kind);
        h.extend_from_slice(&s.params.m_cost_kib.to_le_bytes());
        h.extend_from_slice(&s.params.t_cost.to_le_bytes());
        h.push(s.params.p_cost);
        h.extend_from_slice(&s.salt);
        h.extend_from_slice(&s.wrap_nonce);
        h.extend_from_slice(&(s.wrapped_dek.len() as u16).to_le_bytes());
        h.extend_from_slice(&s.wrapped_dek);
    }
    h.extend_from_slice(body_nonce);
    h
}

/// Parse a v2 file into (slots, body_nonce, header_len).
fn parse_v2(data: &[u8]) -> Result<(Vec<Slot>, [u8; NONCE_LEN], usize), CoreError> {
    let malformed = |m: &str| CoreError::MalformedKeystore(m.to_string());
    let mut p = 8usize; // after magic
    if data.len() < 10 {
        return Err(malformed("file too short"));
    }
    let _version = data[p];
    p += 1;
    let slot_count = data[p] as usize;
    p += 1;

    let mut slots = Vec::with_capacity(slot_count);
    for _ in 0..slot_count {
        // kind(1) + params(9) + salt + nonce + len(2)
        let fixed = 1 + 9 + SALT_LEN + NONCE_LEN + 2;
        if data.len() < p + fixed {
            return Err(malformed("truncated slot header"));
        }
        let kind = data[p];
        let m_cost_kib = u32::from_le_bytes(data[p + 1..p + 5].try_into().unwrap());
        let t_cost = u32::from_le_bytes(data[p + 5..p + 9].try_into().unwrap());
        let p_cost = data[p + 9];
        let salt: [u8; SALT_LEN] = data[p + 10..p + 10 + SALT_LEN].try_into().unwrap();
        let nonce_off = p + 10 + SALT_LEN;
        let wrap_nonce: [u8; NONCE_LEN] =
            data[nonce_off..nonce_off + NONCE_LEN].try_into().unwrap();
        let len_off = nonce_off + NONCE_LEN;
        let wrapped_len = u16::from_le_bytes(data[len_off..len_off + 2].try_into().unwrap()) as usize;
        let dek_off = len_off + 2;
        if data.len() < dek_off + wrapped_len {
            return Err(malformed("truncated wrapped key"));
        }
        let wrapped_dek = data[dek_off..dek_off + wrapped_len].to_vec();
        p = dek_off + wrapped_len;
        slots.push(Slot {
            kind,
            params: KdfParams {
                m_cost_kib,
                t_cost,
                p_cost,
            },
            salt,
            wrap_nonce,
            wrapped_dek,
        });
    }

    if data.len() < p + NONCE_LEN {
        return Err(malformed("missing body nonce"));
    }
    let body_nonce: [u8; NONCE_LEN] = data[p..p + NONCE_LEN].try_into().unwrap();
    let header_len = p + NONCE_LEN;
    Ok((slots, body_nonce, header_len))
}

/// An unlocked keystore: the DEK plus every key slot. Lets the holder re-seal
/// the payload (config mutations) and add/replace slots (passphrase change,
/// recovery) without rotating the DEK, so other slots keep working.
pub struct KeystoreFile {
    dek: Zeroizing<[u8; DEK_LEN]>,
    slots: Vec<Slot>,
}

impl KeystoreFile {
    /// Whether a recovery-code slot is present.
    pub fn has_recovery(&self) -> bool {
        self.slots.iter().any(|s| s.kind == KIND_RECOVERY)
    }

    /// Derive a 32-byte subkey bound to `info` from the DEK, without exposing
    /// the DEK itself. Used to key auxiliary encrypted stores (e.g. the per-
    /// group SQLCipher wallet database). Deterministic for a given DEK+info, so
    /// the same key is recovered on every unlock. The DEK is a uniformly random
    /// 32-byte key, so `SHA-256(domain || dek || len(info) || info)` is a sound
    /// PRF here; `info` is length-prefixed to avoid ambiguity between inputs.
    pub fn derive_subkey(&self, info: &[u8]) -> Zeroizing<[u8; 32]> {
        use sha2::{Digest, Sha256};
        let mut h = Sha256::new();
        h.update(b"cyze-keystore-subkey-v1");
        h.update(&self.dek[..]);
        h.update((info.len() as u64).to_le_bytes());
        h.update(info);
        let digest = h.finalize();
        let mut key = [0u8; 32];
        key.copy_from_slice(&digest);
        Zeroizing::new(key)
    }

    /// Re-encrypt `plaintext` under the existing DEK and slots (new body nonce).
    pub fn reseal(&self, plaintext: &[u8]) -> Result<Vec<u8>, CoreError> {
        let mut body_nonce = [0u8; NONCE_LEN];
        rand::thread_rng().fill_bytes(&mut body_nonce);
        let header = serialize_header(&self.slots, &body_nonce);
        let cipher = xchacha(self.dek.as_ref());
        let ciphertext = cipher
            .encrypt(
                XNonce::from_slice(&body_nonce),
                Payload {
                    msg: plaintext,
                    aad: &header,
                },
            )
            .map_err(|e| CoreError::Crypto(e.to_string()))?;
        let mut out = header;
        out.extend_from_slice(&ciphertext);
        Ok(out)
    }

    /// Replace the passphrase slot (preserving any recovery slot).
    pub fn set_passphrase(&mut self, new_passphrase: &str) -> Result<(), CoreError> {
        let slot = wrap_dek(&self.dek, new_passphrase, &KdfParams::default(), KIND_PASSPHRASE)?;
        self.slots.retain(|s| s.kind != KIND_PASSPHRASE);
        self.slots.push(slot);
        Ok(())
    }

    /// Add or replace the recovery slot for `phrase`.
    pub fn set_recovery(&mut self, phrase: &str) -> Result<(), CoreError> {
        let slot = wrap_dek(&self.dek, phrase, &KdfParams::default(), KIND_RECOVERY)?;
        self.slots.retain(|s| s.kind != KIND_RECOVERY);
        self.slots.push(slot);
        Ok(())
    }

    /// A brand-new keystore protected by a passphrase and a recovery phrase.
    fn new(passphrase: &str, recovery_phrase: &str) -> Result<Self, CoreError> {
        let mut dek = Zeroizing::new([0u8; DEK_LEN]);
        rand::thread_rng().fill_bytes(dek.as_mut());
        let params = KdfParams::default();
        let slots = vec![
            wrap_dek(&dek, passphrase, &params, KIND_PASSPHRASE)?,
            wrap_dek(&dek, recovery_phrase, &params, KIND_RECOVERY)?,
        ];
        Ok(Self { dek, slots })
    }

    /// An in-memory model for a legacy v1 keystore, so the next save migrates
    /// it to v2. Has only a passphrase slot (no recovery until one is added).
    fn migrated(passphrase: &str) -> Result<Self, CoreError> {
        let mut dek = Zeroizing::new([0u8; DEK_LEN]);
        rand::thread_rng().fill_bytes(dek.as_mut());
        let slots = vec![wrap_dek(&dek, passphrase, &KdfParams::default(), KIND_PASSPHRASE)?];
        Ok(Self { dek, slots })
    }
}

/// Open a v2 envelope: find a slot of `want_kind` that `secret` unwraps, then
/// decrypt the payload. Returns the unlocked model plus the plaintext.
fn open_v2(
    data: &[u8],
    secret: &str,
    want_kind: u8,
) -> Result<(KeystoreFile, Zeroizing<Vec<u8>>), CoreError> {
    let (slots, body_nonce, header_len) = parse_v2(data)?;
    let header = &data[..header_len];
    let ciphertext = &data[header_len..];

    for slot in slots.iter().filter(|s| s.kind == want_kind) {
        if let Some(dek) = try_unwrap(slot, secret) {
            let cipher = xchacha(dek.as_ref());
            let plaintext = cipher
                .decrypt(
                    XNonce::from_slice(&body_nonce),
                    Payload {
                        msg: ciphertext,
                        aad: header,
                    },
                )
                .map_err(|_| CoreError::InvalidPassphrase)?;
            return Ok((
                KeystoreFile { dek, slots: slots.clone() },
                Zeroizing::new(plaintext),
            ));
        }
    }
    Err(CoreError::InvalidPassphrase)
}

// ---------------------------------------------------------------------------
// v1 envelope (legacy read path) and shared low-level helpers, kept for the
// migration path and existing tests.
// ---------------------------------------------------------------------------

/// Encrypt `plaintext` into the legacy v1 envelope (passphrase only).
pub fn seal(plaintext: &[u8], passphrase: &str, params: &KdfParams) -> Result<Vec<u8>, CoreError> {
    let mut rng = rand::thread_rng();
    let mut salt = [0u8; SALT_LEN];
    rng.fill_bytes(&mut salt);
    let mut nonce = [0u8; NONCE_LEN];
    rng.fill_bytes(&mut nonce);

    let mut header = Vec::with_capacity(V1_HEADER_LEN);
    header.extend_from_slice(MAGIC_V1);
    header.push(VERSION_V1);
    header.extend_from_slice(&params.m_cost_kib.to_le_bytes());
    header.extend_from_slice(&params.t_cost.to_le_bytes());
    header.push(params.p_cost);
    header.extend_from_slice(&salt);
    header.extend_from_slice(&nonce);

    let key = derive_key(passphrase, &salt, params)?;
    let cipher = xchacha(key.as_ref());
    let ciphertext = cipher
        .encrypt(XNonce::from_slice(&nonce), Payload { msg: plaintext, aad: &header })
        .map_err(|e| CoreError::Crypto(e.to_string()))?;

    let mut out = header;
    out.extend_from_slice(&ciphertext);
    Ok(out)
}

/// Decrypt a legacy v1 envelope.
pub fn open(data: &[u8], passphrase: &str) -> Result<Zeroizing<Vec<u8>>, CoreError> {
    if data.len() < V1_HEADER_LEN {
        return Err(CoreError::MalformedKeystore("file too short".into()));
    }
    if &data[..8] != MAGIC_V1 {
        return Err(CoreError::MalformedKeystore("bad magic".into()));
    }
    let version = data[8];
    if version != VERSION_V1 {
        return Err(CoreError::UnsupportedKeystoreVersion(version));
    }
    let params = KdfParams {
        m_cost_kib: u32::from_le_bytes(data[9..13].try_into().unwrap()),
        t_cost: u32::from_le_bytes(data[13..17].try_into().unwrap()),
        p_cost: data[17],
    };
    let salt = &data[18..18 + SALT_LEN];
    let nonce = &data[18 + SALT_LEN..V1_HEADER_LEN];
    let header = &data[..V1_HEADER_LEN];
    let ciphertext = &data[V1_HEADER_LEN..];

    let key = derive_key(passphrase, salt, &params)?;
    let cipher = xchacha(key.as_ref());
    let plaintext = cipher
        .decrypt(XNonce::from_slice(nonce), Payload { msg: ciphertext, aad: header })
        .map_err(|_| CoreError::InvalidPassphrase)?;
    Ok(Zeroizing::new(plaintext))
}

/// Atomically write `data` to `path` (temp file in the same directory, then
/// rename), mirroring upstream frost-client's write_atomic behavior.
pub fn write_atomic(path: &Path, data: &[u8]) -> Result<(), CoreError> {
    let dir = path
        .parent()
        .ok_or_else(|| CoreError::Config("keystore path has no parent".into()))?;
    std::fs::create_dir_all(dir)?;
    let tmp = dir.join(format!(
        ".{}.tmp",
        path.file_name().unwrap_or_default().to_string_lossy()
    ));
    std::fs::write(&tmp, data)?;
    // Restrict to owner-only before the rename so the final file is never
    // momentarily world-readable. Sensitive files (keystore, settings) must not
    // be left at the default umask on multi-user systems.
    restrict_to_owner(&tmp)?;
    std::fs::rename(&tmp, path)?;
    Ok(())
}

/// Set owner-only permissions (`0o600`) on a file. No-op on non-Unix platforms,
/// where directory ACLs from the OS-specific data dir are relied upon instead.
pub fn restrict_to_owner(path: &Path) -> Result<(), CoreError> {
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(path, std::fs::Permissions::from_mode(0o600))?;
    }
    #[cfg(not(unix))]
    let _ = path;
    Ok(())
}

/// Set owner-only permissions (`0o700`) on a directory. No-op on non-Unix.
pub fn restrict_dir_to_owner(path: &Path) -> Result<(), CoreError> {
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(path, std::fs::Permissions::from_mode(0o700))?;
    }
    #[cfg(not(unix))]
    let _ = path;
    Ok(())
}

/// On-disk keystore handle: knows its path, seals/opens on demand.
pub struct Keystore {
    path: PathBuf,
}

impl Keystore {
    pub fn new(path: PathBuf) -> Self {
        Self { path }
    }

    pub fn path(&self) -> &Path {
        &self.path
    }

    pub fn exists(&self) -> bool {
        self.path.exists()
    }

    /// Whether the on-disk keystore is a legacy (v1) file that should be
    /// migrated to the v2 envelope on the next save.
    pub fn is_legacy(&self) -> bool {
        match std::fs::read(&self.path) {
            Ok(data) => data.len() >= 8 && &data[..8] == MAGIC_V1,
            Err(_) => false,
        }
    }

    /// Whether the on-disk keystore has a recovery slot configured.
    pub fn recovery_enabled(&self) -> bool {
        let Ok(data) = std::fs::read(&self.path) else {
            return false;
        };
        if data.len() < 8 || &data[..8] != MAGIC_V2 {
            return false;
        }
        parse_v2(&data)
            .map(|(slots, _, _)| slots.iter().any(|s| s.kind == KIND_RECOVERY))
            .unwrap_or(false)
    }

    /// Create a new keystore (v2). Generates a fresh recovery phrase, which is
    /// returned so the UI can show it once. Fails if a keystore already exists.
    pub fn create(
        &self,
        plaintext: &[u8],
        passphrase: &str,
    ) -> Result<(Zeroizing<String>, KeystoreFile), CoreError> {
        if self.exists() {
            return Err(CoreError::KeystoreExists);
        }
        let phrase = generate_recovery_phrase()?;
        let file = KeystoreFile::new(passphrase, &phrase)?;
        write_atomic(&self.path, &file.reseal(plaintext)?)?;
        Ok((phrase, file))
    }

    /// Persist a re-sealed payload from an unlocked model (config mutations).
    pub fn save_file(&self, file: &KeystoreFile, plaintext: &[u8]) -> Result<(), CoreError> {
        write_atomic(&self.path, &file.reseal(plaintext)?)
    }

    /// Unlock with the passphrase. Transparently handles legacy v1 files,
    /// returning a v2 model that migrates on the next save.
    pub fn unlock(
        &self,
        passphrase: &str,
    ) -> Result<(KeystoreFile, Zeroizing<Vec<u8>>), CoreError> {
        if !self.exists() {
            return Err(CoreError::KeystoreNotFound);
        }
        let data = std::fs::read(&self.path)?;
        if data.len() >= 8 && &data[..8] == MAGIC_V2 {
            open_v2(&data, passphrase, KIND_PASSPHRASE)
        } else if data.len() >= 8 && &data[..8] == MAGIC_V1 {
            let plaintext = open(&data, passphrase)?;
            Ok((KeystoreFile::migrated(passphrase)?, plaintext))
        } else {
            Err(CoreError::MalformedKeystore("unrecognized keystore".into()))
        }
    }

    /// Unlock with the recovery phrase (forgotten-passphrase path). Only works
    /// for v2 keystores that have a recovery slot.
    pub fn unlock_with_recovery(
        &self,
        phrase: &str,
    ) -> Result<(KeystoreFile, Zeroizing<Vec<u8>>), CoreError> {
        if !self.exists() {
            return Err(CoreError::KeystoreNotFound);
        }
        let data = std::fs::read(&self.path)?;
        if data.len() < 8 || &data[..8] != MAGIC_V2 {
            return Err(CoreError::Crypto(
                "this keystore has no recovery code".into(),
            ));
        }
        open_v2(&data, phrase, KIND_RECOVERY)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn test_params() -> KdfParams {
        KdfParams {
            m_cost_kib: 8,
            t_cost: 1,
            p_cost: 1,
        }
    }

    #[test]
    fn v1_roundtrip() {
        let sealed = seal(b"hello frost", "pass", &test_params()).unwrap();
        let opened = open(&sealed, "pass").unwrap();
        assert_eq!(opened.as_slice(), b"hello frost");
    }

    #[test]
    fn v1_wrong_passphrase() {
        let sealed = seal(b"hello frost", "pass", &test_params()).unwrap();
        assert!(matches!(open(&sealed, "wrong"), Err(CoreError::InvalidPassphrase)));
    }

    #[test]
    fn not_a_keystore() {
        assert!(matches!(
            open(b"definitely not a keystore", "pass"),
            Err(CoreError::MalformedKeystore(_))
        ));
    }

    #[test]
    fn recovery_phrase_is_12_words_and_valid() {
        let phrase = generate_recovery_phrase().unwrap();
        assert_eq!(phrase.split_whitespace().count(), 12);
        // Round-trips through validation.
        let norm = normalize_recovery_phrase(&phrase).unwrap();
        assert_eq!(norm.as_str(), phrase.as_str());
        // Garbage is rejected.
        assert!(normalize_recovery_phrase("not a real mnemonic phrase at all").is_err());
    }

    #[test]
    fn v2_unlocks_with_either_secret() {
        let phrase = generate_recovery_phrase().unwrap();
        let file = KeystoreFile::new("pass", &phrase).unwrap();
        let sealed = file.reseal(b"secret payload").unwrap();

        let (_f, pt) = open_v2(&sealed, "pass", KIND_PASSPHRASE).unwrap();
        assert_eq!(pt.as_slice(), b"secret payload");

        let (_f, pt) = open_v2(&sealed, &phrase, KIND_RECOVERY).unwrap();
        assert_eq!(pt.as_slice(), b"secret payload");

        // Wrong passphrase fails; recovery phrase is not accepted as passphrase.
        assert!(open_v2(&sealed, "wrong", KIND_PASSPHRASE).is_err());
        assert!(open_v2(&sealed, &phrase, KIND_PASSPHRASE).is_err());
    }

    #[test]
    fn changing_passphrase_keeps_recovery() {
        let phrase = generate_recovery_phrase().unwrap();
        let mut file = KeystoreFile::new("old", &phrase).unwrap();
        file.set_passphrase("new").unwrap();
        let sealed = file.reseal(b"data").unwrap();

        assert!(open_v2(&sealed, "old", KIND_PASSPHRASE).is_err());
        assert_eq!(
            open_v2(&sealed, "new", KIND_PASSPHRASE).unwrap().1.as_slice(),
            b"data"
        );
        // Recovery phrase still opens it after the passphrase change.
        assert_eq!(
            open_v2(&sealed, &phrase, KIND_RECOVERY).unwrap().1.as_slice(),
            b"data"
        );
    }

    #[test]
    fn v2_tampered_slot_fails() {
        let phrase = generate_recovery_phrase().unwrap();
        let file = KeystoreFile::new("pass", &phrase).unwrap();
        let mut sealed = file.reseal(b"data").unwrap();
        // Flip a byte inside the first slot's salt; the wrapped DEK must reject.
        sealed[12] ^= 1;
        assert!(open_v2(&sealed, "pass", KIND_PASSPHRASE).is_err());
    }

    #[test]
    fn file_create_and_unlock_with_recovery() {
        let dir = tempfile::tempdir().unwrap();
        let ks = Keystore::new(dir.path().join("keystore.frost"));
        let (phrase, _file) = ks.create(b"toml data", "pw").unwrap();
        assert!(ks.exists());
        assert!(ks.recovery_enabled());

        let (_f, pt) = ks.unlock("pw").unwrap();
        assert_eq!(pt.as_slice(), b"toml data");

        let (mut f, pt) = ks.unlock_with_recovery(&phrase).unwrap();
        assert_eq!(pt.as_slice(), b"toml data");
        // Recovery path can set a new passphrase, then persist.
        f.set_passphrase("reset").unwrap();
        ks.save_file(&f, &pt).unwrap();
        assert!(ks.unlock("reset").is_ok());
        assert!(ks.unlock("pw").is_err());
    }

    #[test]
    fn legacy_v1_unlocks_and_migrates_on_save() {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("keystore.frost");
        // Write a v1 file directly.
        write_atomic(&path, &seal(b"legacy", "pw", &KdfParams::default()).unwrap()).unwrap();
        let ks = Keystore::new(path);
        assert!(!ks.recovery_enabled());

        let (mut file, pt) = ks.unlock("pw").unwrap();
        assert_eq!(pt.as_slice(), b"legacy");
        // Saving migrates the file to v2.
        ks.save_file(&file, &pt).unwrap();
        assert!(ks.unlock("pw").is_ok());
        // A recovery code can now be added.
        let phrase = generate_recovery_phrase().unwrap();
        file.set_recovery(&phrase).unwrap();
        ks.save_file(&file, &pt).unwrap();
        assert!(ks.recovery_enabled());
        assert!(ks.unlock_with_recovery(&phrase).is_ok());
    }
}
