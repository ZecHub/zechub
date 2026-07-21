use thiserror::Error;

#[derive(Debug, Error)]
pub enum ZecAuthError {
    #[error("key derivation failed: {0}")]
    KeyDerivation(String),

    #[error("invalid public key bytes")]
    InvalidPublicKey,

    #[error("invalid signature bytes: expected 64 bytes, got {0}")]
    InvalidSignature(usize),

    #[error("signature verification failed")]
    VerificationFailed,

    #[error("challenge validation failed: {0}")]
    InvalidChallenge(String),

    #[error("challenge has expired")]
    ChallengeExpired,

    #[error("failed to parse challenge message: {0}")]
    ParseError(String),
}
