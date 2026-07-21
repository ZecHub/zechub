use aes_gcm::aead::{Aead, OsRng};
use aes_gcm::{AeadCore, Aes256Gcm, Key, KeyInit, Nonce};
use argon2::Argon2;
use bip39::{Language, Mnemonic};
use rand::RngCore;

#[derive(Debug, thiserror::Error)]
pub enum KeyError {
    #[error("Encryption error: {0}")]
    Crypto(String),
}

const SALT_LEN: usize = 16;
const NONCE_LEN: usize = 12;
const KEY_LEN: usize = 32;

/// Generate a 12-word BIP39 mnemonic and derive the 512-bit seed.
pub fn generate_seed() -> ([u8; 64], String) {
    let mnemonic = Mnemonic::generate_in(Language::English, 12)
        .expect("12-word mnemonic generation is infallible");
    let seed = mnemonic.to_seed_normalized("");
    let mut bytes = [0u8; 64];
    bytes.copy_from_slice(&seed);
    (bytes, mnemonic.to_string())
}

/// Derive a 256-bit encryption key from password using Argon2id.
fn derive_key(password: &str, salt: &[u8]) -> [u8; KEY_LEN] {
    let mut key = [0u8; KEY_LEN];
    Argon2::default()
        .hash_password_into(password.as_bytes(), salt, &mut key)
        .expect("Argon2id key derivation should not fail with valid parameters");
    key
}

/// Encrypt a 64-byte seed with a password using Argon2id + AES-256-GCM.
///
/// Returns a blob: [salt (16 bytes)] [nonce (12 bytes)] [ciphertext].
pub fn encrypt_seed(seed: &[u8; 64], password: &str) -> Result<Vec<u8>, KeyError> {
    let mut salt = [0u8; SALT_LEN];
    OsRng.fill_bytes(&mut salt);

    let derived_key = derive_key(password, &salt);
    let key = Key::<Aes256Gcm>::from_slice(&derived_key);
    let cipher = Aes256Gcm::new(key);
    let nonce_bytes = Aes256Gcm::generate_nonce(&mut OsRng);
    let nonce = Nonce::from_slice(nonce_bytes.as_slice());

    let ciphertext = cipher
        .encrypt(nonce, seed.as_ref())
        .map_err(|e| KeyError::Crypto(e.to_string()))?;

    let mut blob = Vec::with_capacity(SALT_LEN + NONCE_LEN + ciphertext.len());
    blob.extend_from_slice(&salt);
    blob.extend_from_slice(nonce.as_slice());
    blob.extend_from_slice(&ciphertext);
    Ok(blob)
}

/// Decrypt a 64-byte seed blob that was encrypted with `encrypt_seed`.
///
/// Expects blob: [salt (16 bytes)] [nonce (12 bytes)] [ciphertext].
pub fn decrypt_seed(blob: &[u8], password: &str) -> Result<[u8; 64], KeyError> {
    if blob.len() < SALT_LEN + NONCE_LEN {
        return Err(KeyError::Crypto("blob too short".into()));
    }
    let salt = &blob[..SALT_LEN];
    let nonce = &blob[SALT_LEN..SALT_LEN + NONCE_LEN];
    let ciphertext = &blob[SALT_LEN + NONCE_LEN..];

    let derived_key = derive_key(password, salt);
    let key = Key::<Aes256Gcm>::from_slice(&derived_key);
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(nonce);

    let plaintext = cipher
        .decrypt(nonce, ciphertext)
        .map_err(|e| KeyError::Crypto(e.to_string()))?;

    let mut seed = [0u8; 64];
    seed.copy_from_slice(&plaintext);
    Ok(seed)
}
/// Encrypt a mnemonic string with a password using Argon2id + AES-256-GCM.
///
/// Returns a blob: [salt (16 bytes)] [nonce (12 bytes)] [ciphertext].
pub fn encrypt_mnemonic(mnemonic: &str, password: &str) -> Result<Vec<u8>, KeyError> {
    let mut salt = [0u8; SALT_LEN];
    OsRng.fill_bytes(&mut salt);

    let derived_key = derive_key(password, &salt);
    let key = Key::<Aes256Gcm>::from_slice(&derived_key);
    let cipher = Aes256Gcm::new(key);
    let nonce_bytes = Aes256Gcm::generate_nonce(&mut OsRng);
    let nonce = Nonce::from_slice(nonce_bytes.as_slice());

    let ciphertext = cipher
        .encrypt(nonce, mnemonic.as_bytes())
        .map_err(|e| KeyError::Crypto(e.to_string()))?;

    let mut blob = Vec::with_capacity(SALT_LEN + NONCE_LEN + ciphertext.len());
    blob.extend_from_slice(&salt);
    blob.extend_from_slice(nonce.as_slice());
    blob.extend_from_slice(&ciphertext);
    Ok(blob)
}

/// Decrypt a mnemonic blob that was encrypted with `encrypt_mnemonic`.
///
/// Expects blob: [salt (16 bytes)] [nonce (12 bytes)] [ciphertext].
pub fn decrypt_mnemonic(blob: &[u8], password: &str) -> Result<String, KeyError> {
    if blob.len() < SALT_LEN + NONCE_LEN {
        return Err(KeyError::Crypto("blob too short".into()));
    }
    let salt = &blob[..SALT_LEN];
    let nonce = &blob[SALT_LEN..SALT_LEN + NONCE_LEN];
    let ciphertext = &blob[SALT_LEN + NONCE_LEN..];

    let derived_key = derive_key(password, salt);
    let key = Key::<Aes256Gcm>::from_slice(&derived_key);
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(nonce);

    let plaintext = cipher
        .decrypt(nonce, ciphertext)
        .map_err(|e| KeyError::Crypto(e.to_string()))?;

    String::from_utf8(plaintext).map_err(|e| KeyError::Crypto(e.to_string()))
}

pub mod tests {
    pub use super::*;

    #[test]
    pub fn test_generate_seed_returns_64_bytes_and_mnemonic() {
        let (seed, mnemonic) = generate_seed();
        assert_eq!(seed.len(), 64);
        assert!(!mnemonic.is_empty());
        assert_eq!(mnemonic.split_whitespace().count(), 12);
    }

    #[test]
    pub fn test_encrypt_decrypt_seed_roundtrip() {
        let (seed, _) = generate_seed();
        let password = "my-wallet-password";

        let encrypted = encrypt_seed(&seed, password).unwrap();
        let decrypted = decrypt_seed(&encrypted, password).unwrap();

        assert_eq!(decrypted, seed);
    }

    #[test]
    pub fn test_decrypt_seed_wrong_password_fails() {
        let (seed, _) = generate_seed();
        let encrypted = encrypt_seed(&seed, "correct-password").unwrap();

        let result = decrypt_seed(&encrypted, "wrong-password");
        assert!(result.is_err());
    }

    #[test]
    pub fn test_decrypt_seed_invalid_blob_fails() {
        let result = decrypt_seed(&[0u8; 5], "password");
        assert!(result.is_err());
    }

    #[test]
    pub fn test_encrypt_decrypt_roundtrip() {
        let (seed, _) = generate_seed();
        let password = "test-password-123";

        let encrypted = encrypt_seed(&seed, password).unwrap();

        assert!(encrypted.len() > SALT_LEN + NONCE_LEN);

        let salt = &encrypted[..SALT_LEN];
        let nonce = &encrypted[SALT_LEN..SALT_LEN + NONCE_LEN];
        let ciphertext = &encrypted[SALT_LEN + NONCE_LEN..];

        let derived_key = derive_key(password, salt);
        let key = Key::<Aes256Gcm>::from_slice(&derived_key);
        let cipher = Aes256Gcm::new(key);
        let nonce = Nonce::from_slice(nonce);

        let decrypted = cipher
            .decrypt(nonce, ciphertext)
            .expect("should decrypt successfully");

        assert_eq!(decrypted.as_slice(), &seed[..]);
    }

    #[test]
    pub fn test_encrypt_decrypt_mnemonic_roundtrip() {
        let mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
        let password = "wallet-password";

        let encrypted = encrypt_mnemonic(mnemonic, password).unwrap();
        let decrypted = decrypt_mnemonic(&encrypted, password).unwrap();

        assert_eq!(decrypted, mnemonic);
    }

    #[test]
    pub fn test_decrypt_mnemonic_wrong_password_fails() {
        let mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
        let encrypted = encrypt_mnemonic(mnemonic, "correct-password").unwrap();

        let result = decrypt_mnemonic(&encrypted, "wrong-password");
        assert!(result.is_err());
    }

    #[test]
    pub fn test_decrypt_mnemonic_invalid_blob_fails() {
        let result = decrypt_mnemonic(&[0u8; 5], "password");
        assert!(result.is_err());
    }
}
