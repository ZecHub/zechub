//! Structured errors for the `zcash-sign` subprocess driver.
//!
//! Most public functions return [`anyhow::Result`] (the pipeline is glue around
//! foreign crates whose error types are large and generic). The driver in
//! [`crate::sign`] uses this typed enum for the handful of protocol-shape failures
//! we can meaningfully distinguish and test against.

use thiserror::Error;

/// Errors emitted while driving `zcash-sign sign` over its stdout/stdin protocol.
#[derive(Debug, Error)]
pub enum SignDriverError {
    /// `zcash-sign` prompted for a signature (or emitted a randomizer) before it
    /// printed the `SIGHASH:` line we need as the FROST signing message.
    #[error("zcash-sign requested action #{0} before emitting SIGHASH")]
    PromptBeforeSighash(usize),

    /// `zcash-sign` prompted for a signature on an action index for which it never
    /// printed a `Randomizer #<idx>:` line (α is mandatory for re-randomized FROST).
    #[error("zcash-sign requested a signature for action #{0} with no randomizer α")]
    MissingRandomizer(usize),

    /// A `SIGHASH:` / `Randomizer #n:` hex payload was not the expected 32 bytes.
    #[error("expected 32-byte hex on `{context}` line, got {got} bytes")]
    BadHexLen { context: &'static str, got: usize },

    /// A line matched a known prefix but its body did not parse (bad index, bad hex).
    #[error("could not parse `{0}` line from zcash-sign")]
    Malformed(String),

    /// The child process exited before/without producing the signed PCZT output file.
    #[error("zcash-sign exited unsuccessfully: {0}")]
    ChildFailed(String),
}
