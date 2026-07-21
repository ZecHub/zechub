//! The FFI error type.
//!
//! One `enum` crossing the boundary as a typed exception on both platforms
//! (Kotlin `StewardException.*`, Swift `StewardError.*`). It mirrors the browser
//! guardian's internal `GErr` so the two SDKs fail the same way, and carries a
//! human-readable `msg` on the variants that need detail.

/// Errors returned by the Steward mobile SDK.
#[derive(Debug, thiserror::Error, uniffi::Error)]
pub enum StewardError {
    /// JSON (de)serialization failed — a malformed share / package / message.
    #[error("json error: {msg}")]
    Json {
        /// Underlying serde_json message.
        msg: String,
    },
    /// Hex decoding failed (bad characters, or the wrong length for a fixed field).
    #[error("hex decode error: {msg}")]
    Hex {
        /// Underlying hex message.
        msg: String,
    },
    /// Key-derivation (Argon2id) failure — e.g. invalid KDF parameters.
    #[error("key-derivation error: {msg}")]
    Kdf {
        /// Underlying KDF message.
        msg: String,
    },
    /// The keystore could not be opened: **wrong passphrase or a corrupted blob**
    /// (indistinguishable by design — a wrong passphrase must not be told apart
    /// from tampering).
    #[error("could not open keystore: wrong passphrase or corrupted blob")]
    BadPassphrase,
    /// A wrapped FROST error from [`steward_core`] (keygen / commit / sign / aggregate).
    #[error("frost error: {msg}")]
    Frost {
        /// Underlying FROST message.
        msg: String,
    },
    /// A malformed input: bad length, unknown blob version, a non-32-byte field, ...
    #[error("format error: {msg}")]
    Format {
        /// What was malformed.
        msg: String,
    },
    /// The [`Guardian`](crate::Guardian) handle has been wiped; no key material remains.
    #[error("guardian handle has been wiped (no key material)")]
    Wiped,
    /// No live round-1 nonces for this session (round 1 was skipped, or the nonces
    /// were already consumed by a round 2 — the single-use discipline).
    #[error("no live nonces for this session (missing round 1, or nonces already consumed)")]
    NoSession,
    /// A guardian received a message it should never be sent (a coordinator-bound reply).
    #[error("guardian received an unexpected coordinator-bound reply")]
    Unexpected,
    /// The platform RNG failed.
    #[error("rng error: {msg}")]
    Rng {
        /// Underlying RNG message.
        msg: String,
    },
}

impl From<serde_json::Error> for StewardError {
    fn from(e: serde_json::Error) -> Self {
        StewardError::Json { msg: e.to_string() }
    }
}

impl From<hex::FromHexError> for StewardError {
    fn from(e: hex::FromHexError) -> Self {
        StewardError::Hex { msg: e.to_string() }
    }
}

impl From<steward_core::Error> for StewardError {
    fn from(e: steward_core::Error) -> Self {
        StewardError::Frost { msg: e.to_string() }
    }
}
