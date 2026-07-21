//! Heartbeat — the guardian-verifiable proof-of-life (§6 of the spec).
//!
//! Thin UniFFI wrappers over [`steward_core::heartbeat`]. The canonical message is
//! `"steward-heartbeat-v1" ‖ vault_id ‖ time_be`, byte-identical to the Rust core,
//! the web apps (`@noble/ed25519`) and ZecAuth — so an owner, a guardian, and this
//! SDK all agree signature-for-signature.

use rand::rngs::OsRng;
use rand::RngCore;

use crate::error::StewardError;

/// A freshly generated Ed25519 heartbeat keypair, returned to the owner at vault
/// setup. Record the `pubkey_hex` on the vault; keep the `secret_hex` on-device and
/// use it to sign each proof-of-life.
#[derive(uniffi::Record)]
pub struct HeartbeatKey {
    /// 32-byte Ed25519 secret-key **seed**, hex (RFC 8032; never leaves the device).
    pub secret_hex: String,
    /// 32-byte Ed25519 public key, hex — publish this on the vault record.
    pub pubkey_hex: String,
}

/// Sign a proof-of-life for `vault_id` at `time` (unix seconds) with the owner's
/// hex heartbeat secret seed. Deterministic (RFC 8032): identical inputs → identical
/// bytes. Returns the 64-byte signature as hex.
#[uniffi::export]
pub fn sign_heartbeat(sk_hex: String, vault_id: String, time: u64) -> Result<String, StewardError> {
    Ok(steward_core::heartbeat::sign_heartbeat_hex(&sk_hex, &vault_id, time)?)
}

/// Verify a hex heartbeat signature against the vault's recorded hex public key and
/// the canonical message. Returns `false` — never throws — on any decode or
/// verification failure. A relay has no secret key, so it cannot forge a `true` here.
#[uniffi::export]
pub fn verify_heartbeat(pubkey_hex: String, vault_id: String, time: u64, sig_hex: String) -> bool {
    steward_core::heartbeat::verify_heartbeat_hex(&pubkey_hex, &vault_id, time, &sig_hex)
}

/// Derive the hex Ed25519 public key from a hex secret seed.
#[uniffi::export]
pub fn heartbeat_pubkey(sk_hex: String) -> Result<String, StewardError> {
    Ok(steward_core::heartbeat::public_key_hex(&sk_hex)?)
}

/// Whether the dead-man's-switch has **lapsed** at `now`, judged purely from the
/// owner's own signed timestamp: `now > latest + interval + grace` (saturating).
/// This is the authoritative inheritance gate a guardian computes on its own clock
/// from a heartbeat it verified itself — never trusting a relay's state flag.
#[uniffi::export]
pub fn is_lapsed(latest: u64, interval: u64, grace: u64, now: u64) -> bool {
    steward_core::heartbeat::is_lapsed(latest, interval, grace, now)
}

/// Generate a fresh Ed25519 heartbeat keypair (owner setup). The secret is 32
/// random bytes from the platform CSPRNG; the public key is derived from it.
#[uniffi::export]
pub fn generate_heartbeat_key() -> HeartbeatKey {
    let mut seed = [0u8; 32];
    OsRng.fill_bytes(&mut seed);
    // `public_key` accepts any 32-byte seed and cannot fail; derive without a
    // hex round-trip so the whole call is infallible.
    let pubkey_hex = hex::encode(steward_core::heartbeat::public_key(&seed));
    let secret_hex = hex::encode(seed);
    HeartbeatKey { secret_hex, pubkey_hex }
}
