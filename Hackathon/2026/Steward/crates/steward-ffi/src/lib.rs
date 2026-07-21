//! # steward-ffi
//!
//! The **mobile SDK** for the [Steward protocol](../../../docs/SPEC.md): one Rust
//! crate that [UniFFI](https://mozilla.github.io/uniffi-rs/) turns into **both** a
//! Kotlin (Android) and a Swift (iOS) library over [`steward_core`]. It mirrors how
//! ZecAuth shipped native SDKs, but with one generated surface instead of
//! hand-written JNI + a separate Swift port.
//!
//! It exposes exactly the pieces a wallet needs to *hold a share and co-sign*, to
//! *prove liveness*, and to *set up a vault* — with the same on-device security
//! posture as the browser guardian ([`steward-guardian-wasm`]): the FROST
//! `KeyPackage` is decrypted **inside** the [`Guardian`] object and is never handed
//! back across the FFI boundary; nonces are single-use; the sealed blob is
//! Argon2id + XChaCha20-Poly1305.
//!
//! ## Surface (all UniFFI-compatible types — `String`, `u64`, `bool`, records, enums, objects)
//!
//! **Heartbeat** (§6 of the spec — the dead-man's-switch proof-of-life):
//! [`sign_heartbeat`], [`verify_heartbeat`], [`heartbeat_pubkey`], [`is_lapsed`],
//! [`generate_heartbeat_key`].
//!
//! **Keygen** (owner / trusted dealer, §4.1): [`split_authority`] → a
//! [`VaultKeygen`] of the public package + `ak` + one [`GuardianShare`] per guardian.
//!
//! **Guardian keystore + signing** (§4.2 / §5): [`seal_share`], [`open_guardian`]
//! → a [`Guardian`] object with `round1` / `round2` / `handle_relay_message` /
//! `identifier` / `wipe`.
//!
//! **Coordinator / advanced primitives** (§5): [`build_signing_package`],
//! [`aggregate_signature`], [`verify_aggregate`], [`randomized_verifying_key_hex`],
//! and (simulation-only) [`random_randomizer_hex`].
//!
//! ## Relationship to `steward-guardian-wasm`
//! That crate is left **untouched**. The guardian handle + keystore here are a
//! faithful re-implementation of its pure state machine (`GuardianCore`, the `wire`
//! `Message` mirror, the sealed-blob format) minus the `wasm_bindgen` glue — the two
//! read from the same [`steward_core`] primitives and produce byte-identical wire
//! output, so a share sealed by one opens in the other.
//!
//! [`steward-guardian-wasm`]: https://docs.rs/steward-guardian-wasm

// Emit the UniFFI scaffolding for this crate. With the proc-macro approach
// (`#[uniffi::export]` / `#[derive(uniffi::Object|Record|Error)]`) this is the only
// glue file needed — no UDL, no build.rs. The namespace is the crate name
// (`steward_ffi`), which is also the generated binding filenames.
uniffi::setup_scaffolding!();

mod error;
mod guardian;
mod heartbeat;
mod keygen;
mod keystore;
mod signing;

pub use error::StewardError;
pub use guardian::{open_guardian, Guardian, RelayAction};
pub use heartbeat::{
    generate_heartbeat_key, heartbeat_pubkey, is_lapsed, sign_heartbeat, verify_heartbeat,
    HeartbeatKey,
};
pub use keygen::{split_authority, GuardianShare, VaultKeygen};
pub use keystore::seal_share;
pub use signing::{
    aggregate_signature, build_signing_package, random_randomizer_hex,
    randomized_verifying_key_hex, verify_aggregate,
};

use steward_core::redpallas::Identifier;

/// A FROST [`Identifier`] as its canonical hex — the exact string that appears,
/// quoted, as the `identifier` field on the wire. Shared by keygen + the guardian.
pub(crate) fn identifier_hex(id: &Identifier) -> String {
    serde_json::to_string(id)
        .map(|s| s.trim_matches('"').to_string())
        .unwrap_or_default()
}

/// Decode a 32-byte value from hex (accepts surrounding whitespace). Shared helper.
pub(crate) fn decode_32(s: &str) -> Result<[u8; 32], StewardError> {
    let bytes = hex::decode(s.trim())?;
    <[u8; 32]>::try_from(bytes.as_slice())
        .map_err(|_| StewardError::Format { msg: "expected 32 bytes (64 hex chars)".into() })
}
