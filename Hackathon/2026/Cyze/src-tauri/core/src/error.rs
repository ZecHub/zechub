use thiserror::Error;

/// Errors produced by the core crate.
///
/// Boxed dyn errors from frost-client are flattened to strings since they
/// are neither `Send` nor serializable, and ceremonies run in spawned tasks.
#[derive(Debug, Error)]
pub enum CoreError {
    #[error("keystore not found")]
    KeystoreNotFound,
    #[error("keystore already exists")]
    KeystoreExists,
    #[error("invalid passphrase")]
    InvalidPassphrase,
    #[error("keystore file is corrupt or not a keystore: {0}")]
    MalformedKeystore(String),
    #[error("unsupported keystore version {0}")]
    UnsupportedKeystoreVersion(u8),
    #[error("config error: {0}")]
    Config(String),
    #[error("server error: {0}")]
    Server(String),
    #[error("connection error: {0}")]
    Connection(String),
    #[error("ceremony failed: {0}")]
    Ceremony(String),
    #[error("ceremony was cancelled")]
    Cancelled,
    #[error("crypto error: {0}")]
    Crypto(String),
    #[error("TLS error: {0}")]
    Tls(String),
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),
}

impl From<toml::de::Error> for CoreError {
    fn from(e: toml::de::Error) -> Self {
        CoreError::Config(e.to_string())
    }
}

impl From<toml::ser::Error> for CoreError {
    fn from(e: toml::ser::Error) -> Self {
        CoreError::Config(e.to_string())
    }
}

impl From<Box<dyn std::error::Error>> for CoreError {
    fn from(e: Box<dyn std::error::Error>) -> Self {
        CoreError::Ceremony(e.to_string())
    }
}
