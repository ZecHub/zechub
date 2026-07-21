//! Coordinator error type.

use thiserror::Error;

/// Errors produced while orchestrating a signing session or gating a ceremony.
#[derive(Debug, Error)]
pub enum CoordinatorError {
    /// The transport (relay) failed to send or receive.
    #[error("transport error: {0}")]
    Transport(String),

    /// A `steward-core` crypto operation failed (commit / sign / aggregate).
    #[error("core crypto error: {0}")]
    Core(#[from] steward_core::Error),

    /// A wire message failed to (de)serialize.
    #[error("message serialization error: {0}")]
    Serde(#[from] serde_json::Error),

    /// Fewer than the threshold `t` guardians completed a round before the timeout.
    #[error("quorum not met: needed {needed} signers, only {got} responded before the timeout")]
    QuorumNotMet {
        /// Threshold `t` required.
        needed: usize,
        /// How many actually responded in time.
        got: usize,
    },

    /// The aggregated signature did not verify against the randomized key `rk`.
    /// This must fail loudly — a signature that does not verify is unusable on-chain.
    #[error("aggregate signature failed to verify against the randomized key rk = ak + [alpha]G")]
    VerificationFailed,

    /// The ceremony was refused by the vault policy gate (e.g. an inheritance
    /// release attempted while the dead-man's-switch has not tripped).
    #[error("ceremony not authorized: {0}")]
    Unauthorized(String),

    /// A protocol invariant was violated (malformed package, missing threshold…).
    #[error("protocol error: {0}")]
    Protocol(String),
}

/// Convenience result alias.
pub type Result<T> = std::result::Result<T, CoordinatorError>;
