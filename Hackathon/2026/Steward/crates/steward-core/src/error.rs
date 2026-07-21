//! Crate error type.

use thiserror::Error;

/// Errors produced by `steward-core`.
#[derive(Debug, Error)]
pub enum Error {
    /// A FROST protocol operation failed (keygen, signing, aggregation).
    #[error("frost error: {0}")]
    Frost(String),

    /// Threshold/participant configuration was invalid (e.g. t > n, t == 0).
    #[error("invalid threshold configuration: {0}")]
    Config(String),

    /// The randomizer supplied for signing did not match the transaction's alpha.
    #[error("randomizer mismatch: FROST alpha must equal the tx builder's rk = ak + [alpha]G")]
    RandomizerMismatch,

    /// (De)serialization failure.
    #[error("serialization error: {0}")]
    Serde(#[from] serde_json::Error),

    /// Hex decoding failure.
    #[error("hex decode error: {0}")]
    Hex(#[from] hex::FromHexError),
}

/// Convenience result alias.
pub type Result<T> = std::result::Result<T, Error>;
