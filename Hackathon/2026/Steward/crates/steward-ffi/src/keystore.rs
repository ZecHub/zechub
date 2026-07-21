//! The guardian keystore — encrypted-at-rest share storage (§4.2 of the spec).
//!
//! A guardian's `SecretShare` is sealed under a passphrase with
//! `Argon2id(passphrase)` → **XChaCha20-Poly1305**, exactly as
//! [`steward-guardian-wasm`] does: **same crates, same parameters, same
//! self-describing blob layout (`v = 1`)** — so a blob sealed on the web opens on
//! mobile and vice-versa. A wrong passphrase and a tampered blob fail identically
//! ([`StewardError::BadPassphrase`]), by design.
//!
//! [`steward-guardian-wasm`]: https://docs.rs/steward-guardian-wasm

use argon2::{Algorithm, Argon2, Params, Version};
use chacha20poly1305::aead::Aead;
use chacha20poly1305::{Key, KeyInit, XChaCha20Poly1305, XNonce};
use rand::rngs::OsRng;
use rand::RngCore;
use serde::{Deserialize, Serialize};
use zeroize::Zeroize;

use steward_core::redpallas::keys::{KeyPackage, SecretShare};

use crate::error::StewardError;
use crate::guardian::GuardianCore;

/// Sealed-blob format version. Matches `steward-guardian-wasm` (cross-compatible).
const BLOB_VERSION: u8 = 1;
/// Argon2id memory cost, KiB (19 MiB — argon2 crate / OWASP default).
const ARGON2_M_COST: u32 = 19_456;
/// Argon2id time cost (iterations).
const ARGON2_T_COST: u32 = 2;
/// Argon2id parallelism.
const ARGON2_P_COST: u32 = 1;
/// Derived key length (XChaCha20-Poly1305 key size).
const KEY_LEN: usize = 32;
/// Argon2id salt length, bytes.
const SALT_LEN: usize = 16;
/// XChaCha20-Poly1305 nonce length, bytes.
const XNONCE_LEN: usize = 24;

/// The sealed keystore blob. Self-describing (carries KDF params + salt + nonce) so
/// [`open_guardian`](crate::open_guardian) needs only the blob and the passphrase.
/// Serialized as a JSON string; all binary fields are hex. Byte-compatible with the
/// browser guardian's `SealedBlob`.
#[derive(Serialize, Deserialize)]
struct SealedBlob {
    /// Format version (== [`BLOB_VERSION`]).
    v: u8,
    /// KDF identifier (always `"argon2id"`).
    kdf: String,
    /// Argon2id memory cost (KiB).
    m_cost: u32,
    /// Argon2id time cost.
    t_cost: u32,
    /// Argon2id parallelism.
    p_cost: u32,
    /// Argon2id salt, hex.
    salt: String,
    /// XChaCha20-Poly1305 nonce (24 bytes), hex.
    nonce: String,
    /// Ciphertext ‖ Poly1305 tag, hex.
    ct: String,
}

/// Fill `buf` with CSPRNG bytes (the OS RNG on host + mobile).
fn fill_random(buf: &mut [u8]) {
    OsRng.fill_bytes(buf);
}

/// Derive a 32-byte key from `passphrase` with Argon2id and the given params.
fn derive_key(
    passphrase: &str,
    salt: &[u8],
    m_cost: u32,
    t_cost: u32,
    p_cost: u32,
) -> Result<[u8; KEY_LEN], StewardError> {
    let params = Params::new(m_cost, t_cost, p_cost, Some(KEY_LEN))
        .map_err(|e| StewardError::Kdf { msg: format!("bad argon2 params: {e}") })?;
    let argon = Argon2::new(Algorithm::Argon2id, Version::V0x13, params);
    let mut key = [0u8; KEY_LEN];
    argon
        .hash_password_into(passphrase.as_bytes(), salt, &mut key)
        .map_err(|e| StewardError::Kdf { msg: e.to_string() })?;
    Ok(key)
}

/// Seal a guardian's [`SecretShare`] (as its JSON) under `passphrase`.
///
/// Validates the JSON is a real `SecretShare` (a garbage share fails **here**, not
/// at signing time), then `Argon2id(passphrase)` → XChaCha20-Poly1305 seals it.
/// Returns the self-describing [`SealedBlob`] JSON string.
pub(crate) fn seal_share_core(
    secret_share_json: &str,
    passphrase: &str,
) -> Result<String, StewardError> {
    let share: SecretShare = serde_json::from_str(secret_share_json)?;
    let mut plaintext = serde_json::to_vec(&share)?;

    let mut salt = [0u8; SALT_LEN];
    fill_random(&mut salt);
    let mut nonce = [0u8; XNONCE_LEN];
    fill_random(&mut nonce);

    let mut key = derive_key(passphrase, &salt, ARGON2_M_COST, ARGON2_T_COST, ARGON2_P_COST)?;
    let cipher = XChaCha20Poly1305::new(Key::from_slice(&key));
    let ct = cipher
        .encrypt(XNonce::from_slice(&nonce), plaintext.as_ref())
        .map_err(|_| StewardError::Kdf { msg: "AEAD seal failed".into() })?;

    key.zeroize();
    plaintext.zeroize();

    let blob = SealedBlob {
        v: BLOB_VERSION,
        kdf: "argon2id".to_string(),
        m_cost: ARGON2_M_COST,
        t_cost: ARGON2_T_COST,
        p_cost: ARGON2_P_COST,
        salt: hex::encode(salt),
        nonce: hex::encode(nonce),
        ct: hex::encode(ct),
    };
    Ok(serde_json::to_string(&blob)?)
}

/// Open a [`SealedBlob`] with `passphrase` and rebuild the guardian's
/// [`KeyPackage`] into a live [`GuardianCore`]. A wrong passphrase (or a tampered
/// blob) fails as [`StewardError::BadPassphrase`].
pub(crate) fn open_guardian_core(
    sealed_blob: &str,
    passphrase: &str,
) -> Result<GuardianCore, StewardError> {
    let blob: SealedBlob = serde_json::from_str(sealed_blob)?;
    if blob.v != BLOB_VERSION {
        return Err(StewardError::Format { msg: format!("unsupported blob version {}", blob.v) });
    }
    if blob.kdf != "argon2id" {
        return Err(StewardError::Format { msg: format!("unsupported kdf {}", blob.kdf) });
    }
    let salt = hex::decode(&blob.salt)?;
    let nonce = hex::decode(&blob.nonce)?;
    let ct = hex::decode(&blob.ct)?;
    if nonce.len() != XNONCE_LEN {
        return Err(StewardError::Format {
            msg: format!("nonce must be {XNONCE_LEN} bytes, got {}", nonce.len()),
        });
    }
    if salt.len() < 8 {
        return Err(StewardError::Format { msg: "salt too short".into() });
    }

    let mut key = derive_key(passphrase, &salt, blob.m_cost, blob.t_cost, blob.p_cost)?;
    let cipher = XChaCha20Poly1305::new(Key::from_slice(&key));
    let mut plaintext = cipher
        .decrypt(XNonce::from_slice(&nonce), ct.as_ref())
        .map_err(|_| StewardError::BadPassphrase)?;
    key.zeroize();

    let share: SecretShare = serde_json::from_slice(&plaintext)?;
    plaintext.zeroize();

    let key_package =
        KeyPackage::try_from(share).map_err(|e| StewardError::Frost { msg: e.to_string() })?;
    Ok(GuardianCore::new(key_package))
}

/// Seal a guardian's secret share for encrypted-at-rest storage.
///
/// `secret_share_json` is the JSON of a [`steward_core`] `SecretShare` — exactly the
/// `GuardianShare.secret_share_json` the vault dealer produced in
/// [`split_authority`](crate::split_authority). Returns a self-describing sealed-blob
/// JSON string; store it wherever the platform keeps app data (Keychain / Keystore /
/// files). A malformed share is rejected here.
#[uniffi::export]
pub fn seal_share(secret_share_json: String, passphrase: String) -> Result<String, StewardError> {
    seal_share_core(&secret_share_json, &passphrase)
}
