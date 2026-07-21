//! Guardian-verifiable heartbeat — the signed proof-of-life that makes the
//! dead-man's-switch **trustless**. **(P6)**
//!
//! The original switch trusted the coordinator's server clock: a malicious relay could
//! claim a vault was "recoverable" and trigger an early inheritance release. This module
//! fixes that. A heartbeat is now a **signed, timestamped proof-of-life** the owner emits
//! with their own Ed25519 key; every guardian re-verifies it **independently** before
//! acting. The relay can therefore neither
//!
//! - **forge liveness** (it has no secret key, so it cannot mint a heartbeat for a future
//!   time to keep a dead owner's vault looking alive), nor
//! - **fake silence** (a guardian checks the owner's *own* signed timestamp against
//!   [`is_lapsed`] itself, rather than trusting the relay's `state` flag).
//!
//! ## THE canonical message (MUST be byte-identical across Rust + both web apps)
//! ```text
//! msg = b"steward-heartbeat-v1" || vault_id (UTF-8 bytes) || unix_time (u64, 8 bytes BIG-ENDIAN)
//! heartbeat_sig = Ed25519_sign(heartbeat_secret_key, msg)
//! ```
//! Ed25519 standard sizes: 32-byte public key, 64-byte signature, 32-byte secret seed.
//! The vault records the owner's Ed25519 heartbeat **public** key at creation; the secret
//! never reaches the coordinator (except in the clearly-marked demo convenience path, where
//! the coordinator generates a keypair and hands the secret back — see the coordinator's
//! `create_vault`/`demo_vault`).
//!
//! ## Channels
//! **Channel A (implemented here):** the owner posts `{ time, sig_hex }` to the coordinator,
//! which stores the latest as a **bulletin**; guardians `GET` it and re-verify. This module
//! is channel A's crypto core.
//!
//! **Channel B (`TODO(channel-b)` — on-chain, not yet implemented):** publish the same signed
//! heartbeat as an on-chain memo (e.g. a self-send carrying the `heartbeat_message` bytes, or
//! `time || sig`, in an Orchard memo field), so a guardian can confirm liveness straight from
//! the chain with **no relay at all**. The message format above is deliberately chain-friendly
//! (short, domain-separated, fixed layout) so channel B reuses [`sign_heartbeat`] /
//! [`verify_heartbeat`] verbatim — only the *transport* of the `(time, sig)` pair changes
//! (`steward-signer` would build the memo tx; a guardian would scan for it). The coordinator's
//! `GET /vault/:id/heartbeat` bulletin carries another `TODO(channel-b)` hook at that seam.

use ed25519_dalek::{Signature, Signer, SigningKey, Verifier, VerifyingKey};
use serde::{Deserialize, Serialize};

use crate::error::{Error, Result};

/// Domain-separation prefix on every heartbeat message. The `-v1` suffix pins the layout
/// below; bump it (and reject the old tag) if the message construction ever changes, so a
/// signature over one layout can never be replayed as another.
pub const HEARTBEAT_DOMAIN: &[u8] = b"steward-heartbeat-v1";

/// Ed25519 public-key length (bytes).
pub const PUBKEY_LEN: usize = 32;
/// Ed25519 signature length (bytes).
pub const SIG_LEN: usize = 64;
/// Ed25519 secret-key **seed** length (bytes) — RFC 8032, not the 64-byte expanded key.
pub const SECRET_LEN: usize = 32;

/// Build **THE** canonical heartbeat message. This is the single source of truth for the
/// byte layout; `sign_heartbeat` and `verify_heartbeat` both go through it, and the web
/// apps (`@noble/ed25519`) rebuild the identical bytes.
///
/// `msg = HEARTBEAT_DOMAIN || vault_id.as_bytes() || time.to_be_bytes()`
pub fn heartbeat_message(vault_id: &str, time: u64) -> Vec<u8> {
    let id = vault_id.as_bytes();
    let mut msg = Vec::with_capacity(HEARTBEAT_DOMAIN.len() + id.len() + 8);
    msg.extend_from_slice(HEARTBEAT_DOMAIN);
    msg.extend_from_slice(id);
    msg.extend_from_slice(&time.to_be_bytes()); // u64, BIG-ENDIAN
    msg
}

/// Sign a proof-of-life for `vault_id` at `time` with the owner's Ed25519 heartbeat
/// secret-key seed. Ed25519 is deterministic (RFC 8032), so identical inputs always yield
/// identical bytes — which is exactly what lets the Rust and JS implementations be compared
/// signature-for-signature in the cross-impl proof.
pub fn sign_heartbeat(sk_bytes: &[u8; SECRET_LEN], vault_id: &str, time: u64) -> [u8; SIG_LEN] {
    let sk = SigningKey::from_bytes(sk_bytes);
    sk.sign(&heartbeat_message(vault_id, time)).to_bytes()
}

/// Verify a heartbeat signature against the owner's recorded public key, rebuilding the
/// exact canonical message. Returns `false` — never panics — on a malformed public key or
/// any verification failure. Without the secret key, a relay cannot produce a `sig_bytes`
/// that passes here, so it cannot forge liveness.
pub fn verify_heartbeat(
    pk_bytes: &[u8; PUBKEY_LEN],
    vault_id: &str,
    time: u64,
    sig_bytes: &[u8; SIG_LEN],
) -> bool {
    let Ok(vk) = VerifyingKey::from_bytes(pk_bytes) else {
        return false;
    };
    let sig = Signature::from_bytes(sig_bytes);
    vk.verify(&heartbeat_message(vault_id, time), &sig).is_ok()
}

/// Derive the Ed25519 heartbeat **public** key from a secret-key seed.
///
/// Used only by the coordinator's **demo** path (it mints a keypair and returns the secret
/// so a script can sign). A real owner derives this client-side and sends only the public
/// key; the coordinator never sees the secret.
pub fn public_key(sk_bytes: &[u8; SECRET_LEN]) -> [u8; PUBKEY_LEN] {
    SigningKey::from_bytes(sk_bytes).verifying_key().to_bytes()
}

/// Whether the dead-man's-switch has **lapsed** at `now`, judged purely from the owner's
/// own signed timestamp:
///
/// ```text
/// now > latest_time + interval_secs + grace_secs
/// ```
///
/// This is the authoritative inheritance gate. A guardian computes it **independently** from
/// a heartbeat it verified itself — it never trusts the coordinator's `state` hint. Saturating
/// arithmetic so a pathological interval/grace can never wrap the deadline backwards.
pub fn is_lapsed(latest_time: u64, interval_secs: u64, grace_secs: u64, now: u64) -> bool {
    now > latest_time
        .saturating_add(interval_secs)
        .saturating_add(grace_secs)
}

// --- hex conveniences (the coordinator + CLI store/transport hex) ---------------------

/// Decode a 32-byte Ed25519 public key from hex (rejects wrong length / bad hex).
pub fn decode_pubkey(pubkey_hex: &str) -> Result<[u8; PUBKEY_LEN]> {
    decode_fixed(pubkey_hex, "heartbeat public key")
}

/// Decode a 32-byte Ed25519 secret-key seed from hex (rejects wrong length / bad hex).
pub fn decode_secret(secret_hex: &str) -> Result<[u8; SECRET_LEN]> {
    decode_fixed(secret_hex, "heartbeat secret key")
}

/// Decode a 64-byte Ed25519 signature from hex (rejects wrong length / bad hex).
pub fn decode_sig(sig_hex: &str) -> Result<[u8; SIG_LEN]> {
    decode_fixed(sig_hex, "heartbeat signature")
}

fn decode_fixed<const N: usize>(s: &str, what: &str) -> Result<[u8; N]> {
    let bytes = hex::decode(s.trim())?;
    bytes
        .try_into()
        .map_err(|v: Vec<u8>| Error::Config(format!("{what} must be {N} bytes, got {}", v.len())))
}

/// Sign a heartbeat from a hex secret seed, returning the signature as hex. Convenience for
/// the `steward-cli heartbeat-sign` helper the demo script calls.
pub fn sign_heartbeat_hex(sk_hex: &str, vault_id: &str, time: u64) -> Result<String> {
    let sk = decode_secret(sk_hex)?;
    Ok(hex::encode(sign_heartbeat(&sk, vault_id, time)))
}

/// Derive the hex public key from a hex secret seed (the coordinator's demo path).
pub fn public_key_hex(sk_hex: &str) -> Result<String> {
    let sk = decode_secret(sk_hex)?;
    Ok(hex::encode(public_key(&sk)))
}

/// Verify a hex-encoded heartbeat against a hex public key. `false` on any decode or
/// verification failure. The coordinator uses this to reject a forged/garbled bulletin.
pub fn verify_heartbeat_hex(pubkey_hex: &str, vault_id: &str, time: u64, sig_hex: &str) -> bool {
    let (Ok(pk), Ok(sig)) = (decode_pubkey(pubkey_hex), decode_sig(sig_hex)) else {
        return false;
    };
    verify_heartbeat(&pk, vault_id, time, &sig)
}

// --- serde types (wire / storage) -----------------------------------------------------

/// The owner's Ed25519 heartbeat **public** key, recorded at vault creation (32-byte hex).
/// The relay holds only this — never the secret — so it can *verify* proofs-of-life but never
/// *forge* them.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct HeartbeatPubkey {
    /// 32-byte Ed25519 public key, hex-encoded.
    pub pubkey_hex: String,
}

impl HeartbeatPubkey {
    /// Wrap a hex public key, validating it decodes to exactly 32 bytes.
    pub fn from_hex(pubkey_hex: impl Into<String>) -> Result<Self> {
        let pubkey_hex = pubkey_hex.into();
        decode_pubkey(&pubkey_hex)?; // validate length/hex up front
        Ok(Self { pubkey_hex })
    }
}

/// A single signed proof-of-life: the owner's timestamp plus their Ed25519 signature over the
/// canonical message. The coordinator stores the latest verified one as the vault's
/// **bulletin**; each guardian fetches and re-verifies it before acting on a release.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Heartbeat {
    /// Unix seconds the owner signed as their proof-of-life.
    pub time: u64,
    /// Ed25519 signature over `heartbeat_message(vault_id, time)`, 64-byte hex.
    pub sig_hex: String,
}

impl Heartbeat {
    /// Verify this signed heartbeat against `pubkey_hex` for `vault_id`.
    pub fn verify(&self, pubkey_hex: &str, vault_id: &str) -> bool {
        verify_heartbeat_hex(pubkey_hex, vault_id, self.time, &self.sig_hex)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // A FIXED cross-implementation vector. `SK` is an arbitrary 32-byte seed; the expected
    // public key + signature are the deterministic Ed25519 outputs over the canonical message
    // for `(VAULT_ID, TIME)`. The web-app cross-impl proof reproduces these exact hex strings
    // with `@noble/ed25519`, byte-for-byte (Ed25519 is deterministic — RFC 8032).
    const SK_HEX: &str = "00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff";
    const VAULT_ID: &str = "vault-1";
    const TIME: u64 = 1_752_000_000;

    fn sk() -> [u8; 32] {
        decode_secret(SK_HEX).unwrap()
    }
    fn pk() -> [u8; 32] {
        public_key(&sk())
    }

    #[test]
    fn message_layout_is_exact() {
        // domain (20) || "vault-1" (7) || 8 big-endian time bytes.
        let msg = heartbeat_message("vault-1", 0x0102_0304_0506_0708);
        assert_eq!(&msg[..20], b"steward-heartbeat-v1");
        assert_eq!(&msg[20..27], b"vault-1");
        assert_eq!(&msg[27..], &[1, 2, 3, 4, 5, 6, 7, 8]); // big-endian
        assert_eq!(msg.len(), 20 + 7 + 8);
    }

    #[test]
    fn sign_verify_roundtrip() {
        let sig = sign_heartbeat(&sk(), VAULT_ID, TIME);
        assert!(verify_heartbeat(&pk(), VAULT_ID, TIME, &sig));
    }

    #[test]
    fn deterministic_signature() {
        // Same inputs → identical bytes (this is what makes Rust↔JS parity checkable).
        assert_eq!(
            sign_heartbeat(&sk(), VAULT_ID, TIME),
            sign_heartbeat(&sk(), VAULT_ID, TIME)
        );
    }

    #[test]
    fn wrong_pubkey_fails() {
        let sig = sign_heartbeat(&sk(), VAULT_ID, TIME);
        let other = public_key(&[7u8; 32]);
        assert_ne!(other, pk());
        assert!(!verify_heartbeat(&other, VAULT_ID, TIME, &sig));
    }

    #[test]
    fn wrong_vault_id_fails() {
        let sig = sign_heartbeat(&sk(), VAULT_ID, TIME);
        assert!(!verify_heartbeat(&pk(), "vault-2", TIME, &sig));
    }

    #[test]
    fn tampered_time_fails() {
        let sig = sign_heartbeat(&sk(), VAULT_ID, TIME);
        assert!(!verify_heartbeat(&pk(), VAULT_ID, TIME + 1, &sig));
    }

    #[test]
    fn tampered_signature_fails() {
        let mut sig = sign_heartbeat(&sk(), VAULT_ID, TIME);
        sig[0] ^= 0x01;
        assert!(!verify_heartbeat(&pk(), VAULT_ID, TIME, &sig));
    }

    #[test]
    fn malformed_pubkey_returns_false_not_panic() {
        // All-zero and a wrong-length hex must be rejected safely.
        assert!(!verify_heartbeat_hex("00", VAULT_ID, TIME, &"11".repeat(64)));
        let sig = hex::encode(sign_heartbeat(&sk(), VAULT_ID, TIME));
        assert!(!verify_heartbeat_hex("zz", VAULT_ID, TIME, &sig));
    }

    #[test]
    fn is_lapsed_boundaries() {
        let latest = 1_000_000u64;
        let interval = 30 * 86_400u64;
        let grace = 7 * 86_400u64;
        let trip = latest + interval + grace; // now > trip ⇒ lapsed

        assert!(!is_lapsed(latest, interval, grace, latest)); // fresh
        assert!(!is_lapsed(latest, interval, grace, trip - 1)); // just inside grace
        assert!(!is_lapsed(latest, interval, grace, trip)); // exactly at the deadline — NOT yet lapsed (strict >)
        assert!(is_lapsed(latest, interval, grace, trip + 1)); // one second past ⇒ lapsed
    }

    #[test]
    fn is_lapsed_saturates() {
        // Pathological interval/grace must not wrap; nothing is ever "lapsed" past u64::MAX.
        assert!(!is_lapsed(u64::MAX, u64::MAX, u64::MAX, u64::MAX));
    }

    #[test]
    fn hex_helpers_roundtrip_and_pubkey_derivation() {
        let sig_hex = sign_heartbeat_hex(SK_HEX, VAULT_ID, TIME).unwrap();
        let pk_hex = public_key_hex(SK_HEX).unwrap();
        assert!(verify_heartbeat_hex(&pk_hex, VAULT_ID, TIME, &sig_hex));

        let hb = Heartbeat { time: TIME, sig_hex };
        assert!(hb.verify(&pk_hex, VAULT_ID));
        assert!(!hb.verify(&pk_hex, "other-vault"));
        assert!(HeartbeatPubkey::from_hex(pk_hex).is_ok());
        assert!(HeartbeatPubkey::from_hex("nothex").is_err());
    }

    // FIXED KNOWN-ANSWER VECTOR — pins the canonical bytes so a refactor that changed the
    // message layout (or a wrong-endian time) would break here, and so the web apps have a
    // concrete target to match. Values were produced by this very module and independently
    // reproduced by `@noble/ed25519` (see the cross-impl proof in the task report).
    #[test]
    fn known_answer_vector() {
        let pk_hex = public_key_hex(SK_HEX).unwrap();
        let sig_hex = sign_heartbeat_hex(SK_HEX, VAULT_ID, TIME).unwrap();
        assert_eq!(
            pk_hex,
            "3ccd241cffc9b3618044b97d036d8614593d8b017c340f1dee8773385517654b"
        );
        assert_eq!(
            sig_hex,
            "0fa0a75b41478dee5dd0ca37efbd0ae5704093df0b5c5169d39c8f57df3c01f3\
             31f870ebbfd28ab1afbedf5950be8451b96754fb3bcbb9173574f5e629f91c05"
        );
    }
}
