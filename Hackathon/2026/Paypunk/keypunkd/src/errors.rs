use crate::key;

#[derive(Debug, thiserror::Error)]
pub enum GenerateError {
    #[error("{0}")]
    Crypto(#[from] crate::crypto::CryptoError),
    #[error("{0}")]
    Key(#[from] key::KeyError),
    #[error("{0}")]
    Store(#[from] crate::seed_store::SeedStoreError),
}

#[derive(Debug, thiserror::Error)]
pub enum RestoreError {
    #[error("{0}")]
    Crypto(#[from] crate::crypto::CryptoError),
    #[error("{0}")]
    Key(#[from] key::KeyError),
    #[error("{0}")]
    Store(#[from] crate::seed_store::SeedStoreError),
    #[error("invalid mnemonic: {0}")]
    InvalidMnemonic(String),
}
