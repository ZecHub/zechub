use aes_gcm::aead::{Aead, OsRng};
use aes_gcm::{Aes256Gcm, Key, KeyInit, Nonce};
use blake2::digest::consts::U32;
use blake2::Digest;
use rand::RngCore;
use zeroize::{Zeroize, Zeroizing};

#[derive(Debug, thiserror::Error)]
pub enum CryptoError {
    #[error("decryption failed: {0}")]
    Decryption(String),
    #[error("invalid encrypted blob")]
    InvalidBlob,
}

const NONCE_LEN: usize = 12;

// ---------------------------------------------------------------------------
// Shared: derive AES-256 key from an X25519 shared secret via Blake2b
// ---------------------------------------------------------------------------

fn derive_aes_key(shared_secret: &[u8; 32]) -> Key<Aes256Gcm> {
    let mut hasher = blake2::Blake2b::<U32>::new();
    hasher.update(shared_secret.as_slice());
    let result = hasher.finalize();
    *Key::<Aes256Gcm>::from_slice(&result)
}

fn utf8_decode(bytes: Vec<u8>) -> Result<String, CryptoError> {
    String::from_utf8(bytes).map_err(|_| CryptoError::Decryption("invalid utf-8".into()))
}

fn encrypt(key: &Key<Aes256Gcm>, plaintext: &[u8]) -> Vec<u8> {
    let mut nonce_bytes = [0u8; NONCE_LEN];
    OsRng.fill_bytes(&mut nonce_bytes);
    let nonce = Nonce::from_slice(&nonce_bytes);
    let cipher = Aes256Gcm::new(key);
    let ciphertext = cipher.encrypt(nonce, plaintext).expect("AES-GCM encrypt");
    let mut blob = Vec::with_capacity(NONCE_LEN + ciphertext.len());
    blob.extend_from_slice(&nonce_bytes);
    blob.extend_from_slice(&ciphertext);
    blob
}

fn decrypt(key: &Key<Aes256Gcm>, blob: &[u8]) -> Result<Vec<u8>, CryptoError> {
    if blob.len() < NONCE_LEN {
        return Err(CryptoError::InvalidBlob);
    }
    let (nonce_bytes, ciphertext) = blob.split_at(NONCE_LEN);
    let nonce = Nonce::from_slice(nonce_bytes);
    let cipher = Aes256Gcm::new(key);
    cipher
        .decrypt(nonce, ciphertext)
        .map_err(|e| CryptoError::Decryption(e.to_string()))
}

/// Generate a random X25519 keypair. Returns (secret_scalar, public_key).
fn generate_keypair() -> (Zeroizing<[u8; 32]>, [u8; 32]) {
    let mut secret = Zeroizing::new([0u8; 32]);
    OsRng.fill_bytes(&mut *secret);
    // Clamp per RFC 7748
    secret[0] &= 248;
    secret[31] &= 127;
    secret[31] |= 64;
    let public = x25519_dalek::x25519(*secret, x25519_dalek::X25519_BASEPOINT_BYTES);
    (secret, public)
}

// ---------------------------------------------------------------------------
// Keypair — X25519 keypair for encrypted IPC exchange
// ---------------------------------------------------------------------------

pub struct Keypair {
    secret: Zeroizing<[u8; 32]>,
    public: [u8; 32],
}

impl Keypair {
    pub fn new() -> Self {
        let (secret, public) = generate_keypair();
        Self { secret, public }
    }

    pub fn public_key(&self) -> [u8; 32] {
        self.public
    }

    pub fn keypair(&self) -> ([u8; 32], [u8; 32]) {
        (*self.secret, self.public)
    }

    fn shared_aes_key(&self, peer_pk: &[u8; 32]) -> Key<Aes256Gcm> {
        let shared = Zeroizing::new(x25519_dalek::x25519(*self.secret, *peer_pk));
        derive_aes_key(&shared)
    }

    /// Encrypt a secret message to a peer.
    pub fn encrypt<T>(&self, secret_message: Zeroizing<T>, peer_pk: &[u8; 32]) -> Vec<u8>
    where
        T: Zeroize + AsRef<[u8]>,
    {
        let key = self.shared_aes_key(peer_pk);
        encrypt(&key, (*secret_message).as_ref())
    }

    /// Decrypt a message from a peer into a string.
    pub fn decrypt(
        &self,
        encrypted: &[u8],
        peer_pk: &[u8; 32],
    ) -> Result<Zeroizing<String>, CryptoError> {
        let key = self.shared_aes_key(peer_pk);
        let plaintext = decrypt(&key, encrypted)?;
        let s = utf8_decode(plaintext)?;
        Ok(Zeroizing::new(s))
    }

    /// Encrypt arbitrary bytes to a peer (non-string payload).
    pub fn encrypt_bytes(&self, payload: &[u8], peer_pk: &[u8; 32]) -> Vec<u8> {
        let key = self.shared_aes_key(peer_pk);
        encrypt(&key, payload)
    }

    /// Decrypt arbitrary bytes from a peer (non-string payload).
    pub fn decrypt_bytes(
        &self,
        encrypted: &[u8],
        peer_pk: &[u8; 32],
    ) -> Result<Vec<u8>, CryptoError> {
        let key = self.shared_aes_key(peer_pk);
        decrypt(&key, encrypted)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_password_roundtrip() {
        let server = Keypair::new();
        let client = Keypair::new();

        let password = Zeroizing::new("my-secret-password".to_string());
        let encrypted = client.encrypt(password.clone(), &server.public_key());
        let decrypted = server.decrypt(&encrypted, &client.public_key()).unwrap();

        assert_eq!(*decrypted, *password);
    }

    #[test]
    fn test_mnemonic_roundtrip() {
        let server = Keypair::new();
        let client = Keypair::new();

        let mnemonic = Zeroizing::new("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about".to_string());
        let encrypted = server.encrypt(mnemonic.clone(), &client.public_key());
        let decrypted = client.decrypt(&encrypted, &server.public_key()).unwrap();

        assert_eq!(*decrypted, *mnemonic);
    }

    #[test]
    fn test_wrong_key_fails() {
        let server = Keypair::new();
        let other_server = Keypair::new();
        let client = Keypair::new();

        let password = Zeroizing::new("secret".to_string());
        let encrypted = client.encrypt(password, &server.public_key());

        let result = other_server.decrypt(&encrypted, &client.public_key());
        assert!(result.is_err());
    }

    #[test]
    fn test_invalid_blob_fails() {
        let server = Keypair::new();
        let result = server.decrypt(&[1, 2, 3], &[0u8; 32]);
        assert!(result.is_err());
    }

    #[test]
    fn test_server_reuses_key() {
        let server = Keypair::new();
        let client1 = Keypair::new();
        let client2 = Keypair::new();

        let enc1 = client1.encrypt(Zeroizing::new("pw1".to_string()), &server.public_key());
        let enc2 = client2.encrypt(Zeroizing::new("pw2".to_string()), &server.public_key());

        assert_eq!(
            *server.decrypt(&enc1, &client1.public_key()).unwrap(),
            *Zeroizing::new("pw1".to_string())
        );
        assert_eq!(
            *server.decrypt(&enc2, &client2.public_key()).unwrap(),
            *Zeroizing::new("pw2".to_string())
        );
    }
}
