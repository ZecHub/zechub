use frost_app_core::CoreError;
use serde::Serialize;

/// Error type returned by all Tauri commands. Serialized as
/// `{ code, message }` so the frontend can branch on `code`.
#[derive(Debug, Serialize)]
pub struct AppError {
    pub code: &'static str,
    pub message: String,
}

impl AppError {
    pub fn new(code: &'static str, message: impl Into<String>) -> Self {
        Self {
            code,
            message: message.into(),
        }
    }

    pub fn locked() -> Self {
        Self::new("locked", "keystore is locked")
    }
}

impl From<CoreError> for AppError {
    fn from(e: CoreError) -> Self {
        let code = match &e {
            CoreError::KeystoreNotFound => "keystore_not_found",
            CoreError::KeystoreExists => "keystore_exists",
            CoreError::InvalidPassphrase => "invalid_passphrase",
            CoreError::MalformedKeystore(_) => "malformed_keystore",
            CoreError::UnsupportedKeystoreVersion(_) => "unsupported_version",
            CoreError::Config(_) => "config",
            CoreError::Server(_) => "server",
            CoreError::Connection(_) => "connection",
            CoreError::Ceremony(_) => "ceremony",
            CoreError::Cancelled => "cancelled",
            CoreError::Crypto(_) => "crypto",
            CoreError::Tls(_) => "tls",
            CoreError::Io(_) => "io",
        };
        Self::new(code, e.to_string())
    }
}

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        Self::new("io", e.to_string())
    }
}

pub type AppResult<T> = Result<T, AppError>;
