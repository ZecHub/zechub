//! Encryption and decryption using Zcash-style ephemeral Diffie-Hellman
//! key agreement over Jubjub, with ChaCha20Poly1305 AEAD.
//!
//! ## Protocol
//!
//! **Encrypt (sender holds recipient's `(d, pk_d)`):**
//! 1. Reconstruct `g_d = diversify_hash(d)`.
//! 2. Generate ephemeral scalar `esk ← random Fr`.
//! 3. Compute `epk = [esk]·g_d`.
//! 4. Compute shared secret `ss = [esk]·pk_d`.
//! 5. `key = HKDF-SHA256(ikm = ss_bytes, salt = "",
//!       info = "ZHAC-v1-encrypt" ‖ epk_bytes ‖ pk_d_bytes)`.
//! 6. `nonce ← random 12 bytes`.
//! 7. `ciphertext = ChaCha20Poly1305.seal(key, nonce, plaintext)`.
//! 8. Return `(d, epk_bytes, nonce, ciphertext)`.
//!
//! **Decrypt (recipient holds private key with `ivk`):**
//! 1. Parse `(d, epk, nonce, ciphertext)`.
//! 2. Reconstruct `pk_d = [ivk]·diversify_hash(d)`.
//! 3. Compute shared secret `ss = [ivk]·epk`.
//! 4. Same KDF as above (with reconstructed pk_d) to recover `key`.
//! 5. `plaintext = ChaCha20Poly1305.open(key, nonce, ciphertext)`.
//!
//! **Multi-recipient encryption:**
//! 1. Generate a random 32-byte DEK (data encryption key).
//! 2. Encrypt the payload with the DEK: `payload = ChaCha20Poly1305.seal(DEK, nonce, plaintext)`.
//! 3. For each recipient, perform DH-KA to derive a KEK, then encrypt the DEK:
//!    `header = (d, epk, kek_nonce, ChaCha20Poly1305.seal(KEK, kek_nonce, DEK))`.
//! 4. To decrypt, the recipient unwraps their header to recover the DEK,
//!    then decrypts the payload.

use chacha20poly1305::aead::{Aead, KeyInit, OsRng};
use chacha20poly1305::ChaCha20Poly1305;
use group::GroupEncoding;
use hkdf::Hkdf;
use jubjub::{Fr, SubgroupPoint};
use rand::RngCore;
use sha2::Sha256;
use zeroize::Zeroize;

use crate::keys::{
    self, RecipientHeader, ZhacCiphertext, ZhacMultiCiphertext, ZhacPrivateKey, ZhacPublicKey,
    ZhacViewingKey,
};
use crate::{Result, ZhacError};

const KDF_INFO_PREFIX: &[u8] = b"ZHAC-v1-encrypt";
const KEK_INFO_PREFIX: &[u8] = b"ZHAC-v1-kek";

/// Encrypt `plaintext` for the given recipient public key.
///
/// ```
/// use zhac::keys::{ZhacKeySeed, ZhacPrivateKey};
/// use zhac::encrypt;
///
/// let seed = ZhacKeySeed::generate();
/// let sk = ZhacPrivateKey::from_seed(&seed);
/// let pk = sk.to_public_key(&[0x42u8; 11]).unwrap();
/// let ct = encrypt::encrypt(b"hello", &pk).unwrap();
/// let pt = encrypt::decrypt(&ct, &sk).unwrap();
/// assert_eq!(pt, b"hello");
/// ```
pub fn encrypt(plaintext: &[u8], recipient: &ZhacPublicKey) -> Result<ZhacCiphertext> {
    let g_d = keys::diversify_hash(&recipient.d)?;

    let esk = random_fr();
    let epk = g_d * esk;
    let ss = recipient.pk_d * esk;

    let epk_bytes = epk.to_bytes();
    let key = derive_key(&ss, &epk_bytes, &recipient.pk_d, KDF_INFO_PREFIX)?;

    let mut nonce = [0u8; 12];
    OsRng.fill_bytes(&mut nonce);

    let cipher = ChaCha20Poly1305::new_from_slice(&key)
        .map_err(|e| ZhacError::Crypto(format!("invalid key: {e}")))?;
    let ct = cipher
        .encrypt((&nonce).into(), plaintext)
        .map_err(|e| ZhacError::Crypto(format!("encryption failed: {e}")))?;

    Ok(ZhacCiphertext {
        d: recipient.d,
        ephemeral_key: epk_bytes,
        nonce,
        data: ct,
    })
}

/// Decrypt a [`ZhacCiphertext`] using the recipient's private key.
pub fn decrypt(ciphertext: &ZhacCiphertext, private_key: &ZhacPrivateKey) -> Result<Vec<u8>> {
    let epk = SubgroupPoint::from_bytes(&ciphertext.ephemeral_key)
        .into_option()
        .ok_or_else(|| ZhacError::Crypto("invalid ephemeral public key".into()))?;

    let ivk = private_key.compute_ivk();
    let ss = epk * ivk;
    let g_d = keys::diversify_hash(&ciphertext.d)?;
    let pk_d = g_d * ivk;

    let key = derive_key(&ss, &ciphertext.ephemeral_key, &pk_d, KDF_INFO_PREFIX)?;

    let cipher = ChaCha20Poly1305::new_from_slice(&key)
        .map_err(|e| ZhacError::Crypto(format!("invalid key: {e}")))?;
    let plaintext = cipher
        .decrypt((&ciphertext.nonce).into(), ciphertext.data.as_ref())
        .map_err(|e| ZhacError::Crypto(format!("decryption failed: {e}")))?;

    Ok(plaintext)
}

/// Decrypt a [`ZhacCiphertext`] using a viewing key (no signing capability needed).
///
/// This allows a party with only the incoming viewing key to decrypt
/// messages without access to the spending key, matching Zcash Sapling's
/// viewing key semantics.
pub fn decrypt_with_viewing_key(
    ciphertext: &ZhacCiphertext,
    viewing_key: &ZhacViewingKey,
) -> Result<Vec<u8>> {
    let epk = SubgroupPoint::from_bytes(&ciphertext.ephemeral_key)
        .into_option()
        .ok_or_else(|| ZhacError::Crypto("invalid ephemeral public key".into()))?;

    let ivk = viewing_key.ivk;
    let ss = epk * ivk;
    let g_d = keys::diversify_hash(&ciphertext.d)?;
    let pk_d = g_d * ivk;

    let key = derive_key(&ss, &ciphertext.ephemeral_key, &pk_d, KDF_INFO_PREFIX)?;

    let cipher = ChaCha20Poly1305::new_from_slice(&key)
        .map_err(|e| ZhacError::Crypto(format!("invalid key: {e}")))?;
    let plaintext = cipher
        .decrypt((&ciphertext.nonce).into(), ciphertext.data.as_ref())
        .map_err(|e| ZhacError::Crypto(format!("decryption failed: {e}")))?;

    Ok(plaintext)
}

// ── Multi-recipient encryption ──────────────────────────────────────────────

/// Encrypt `plaintext` for multiple recipients.
///
/// Generates a random DEK, encrypts the payload with it, then wraps the DEK
/// for each recipient using DH-KA over Jubjub.  Any single recipient can
/// decrypt using their private key or viewing key.
pub fn encrypt_multi(plaintext: &[u8], recipients: &[ZhacPublicKey]) -> Result<ZhacMultiCiphertext> {
    if recipients.is_empty() {
        return Err(ZhacError::Crypto("no recipients specified".into()));
    }
    if recipients.len() > 255 {
        return Err(ZhacError::Crypto("too many recipients (max 255)".into()));
    }

    // 1. Generate random DEK
    let mut dek = [0u8; 32];
    OsRng.fill_bytes(&mut dek);

    // 2. Encrypt payload with DEK
    let mut payload_nonce = [0u8; 12];
    OsRng.fill_bytes(&mut payload_nonce);

    let payload_cipher = ChaCha20Poly1305::new_from_slice(&dek)
        .map_err(|e| ZhacError::Crypto(format!("invalid DEK: {e}")))?;
    let payload_ct = payload_cipher
        .encrypt((&payload_nonce).into(), plaintext)
        .map_err(|e| ZhacError::Crypto(format!("payload encryption failed: {e}")))?;

    // 3. Wrap DEK for each recipient
    let mut headers = Vec::with_capacity(recipients.len());
    for recipient in recipients {
        let g_d = keys::diversify_hash(&recipient.d)?;
        let esk = random_fr();
        let epk = g_d * esk;
        let ss = recipient.pk_d * esk;
        let epk_bytes = epk.to_bytes();

        // Derive KEK from DH-KA
        let kek = derive_key(&ss, &epk_bytes, &recipient.pk_d, KEK_INFO_PREFIX)?;

        // Encrypt DEK with KEK
        let mut kek_nonce = [0u8; 12];
        OsRng.fill_bytes(&mut kek_nonce);

        let kek_cipher = ChaCha20Poly1305::new_from_slice(&kek)
            .map_err(|e| ZhacError::Crypto(format!("invalid KEK: {e}")))?;
        let encrypted_dek = kek_cipher
            .encrypt((&kek_nonce).into(), dek.as_ref())
            .map_err(|e| ZhacError::Crypto(format!("DEK encryption failed: {e}")))?;

        let mut ed = [0u8; 48];
        ed.copy_from_slice(&encrypted_dek);

        headers.push(RecipientHeader {
            d: recipient.d,
            ephemeral_key: epk_bytes,
            nonce: kek_nonce,
            encrypted_dek: ed,
        });
    }

    // Zeroize DEK after use (Finding 20)
    dek.zeroize();

    Ok(ZhacMultiCiphertext {
        headers,
        nonce: payload_nonce,
        data: payload_ct,
    })
}

/// Decrypt a [`ZhacMultiCiphertext`] using the recipient's private key.
///
/// Tries each header until one matches the recipient's diversifier.
pub fn decrypt_multi(
    ciphertext: &ZhacMultiCiphertext,
    private_key: &ZhacPrivateKey,
) -> Result<Vec<u8>> {
    let ivk = private_key.compute_ivk();

    for header in &ciphertext.headers {
        // Reconstruct the recipient's pk_d for this diversifier
        let g_d = keys::diversify_hash(&header.d)?;
        let pk_d = g_d * ivk;

        let epk = SubgroupPoint::from_bytes(&header.ephemeral_key)
            .into_option()
            .ok_or_else(|| ZhacError::Crypto("invalid ephemeral public key".into()))?;

        let ss = epk * ivk;
        let kek = derive_key(&ss, &header.ephemeral_key, &pk_d, KEK_INFO_PREFIX)?;

        let kek_cipher = ChaCha20Poly1305::new_from_slice(&kek)
            .map_err(|e| ZhacError::Crypto(format!("invalid KEK: {e}")))?;

        if let Ok(dek_bytes) =
            kek_cipher.decrypt((&header.nonce).into(), header.encrypted_dek.as_ref())
        {
            let mut dek = [0u8; 32];
            dek.copy_from_slice(&dek_bytes);

            let payload_cipher = ChaCha20Poly1305::new_from_slice(&dek)
                .map_err(|e| ZhacError::Crypto(format!("invalid DEK: {e}")))?;
            dek.zeroize();
            let plaintext = payload_cipher
                .decrypt((&ciphertext.nonce).into(), ciphertext.data.as_ref())
                .map_err(|e| ZhacError::Crypto(format!("payload decryption failed: {e}")))?;
            return Ok(plaintext);
        }
    }

    Err(ZhacError::Crypto(
        "none of the headers match this private key".into(),
    ))
}

/// Decrypt a [`ZhacMultiCiphertext`] using a viewing key.
pub fn decrypt_multi_with_viewing_key(
    ciphertext: &ZhacMultiCiphertext,
    viewing_key: &ZhacViewingKey,
) -> Result<Vec<u8>> {
    let ivk = viewing_key.ivk;

    for header in &ciphertext.headers {
        let g_d = keys::diversify_hash(&header.d)?;
        let pk_d = g_d * ivk;

        let epk = SubgroupPoint::from_bytes(&header.ephemeral_key)
            .into_option()
            .ok_or_else(|| ZhacError::Crypto("invalid ephemeral public key".into()))?;

        let ss = epk * ivk;
        let kek = derive_key(&ss, &header.ephemeral_key, &pk_d, KEK_INFO_PREFIX)?;

        let kek_cipher = ChaCha20Poly1305::new_from_slice(&kek)
            .map_err(|e| ZhacError::Crypto(format!("invalid KEK: {e}")))?;

        if let Ok(dek_bytes) =
            kek_cipher.decrypt((&header.nonce).into(), header.encrypted_dek.as_ref())
        {
            let mut dek = [0u8; 32];
            dek.copy_from_slice(&dek_bytes);

            let payload_cipher = ChaCha20Poly1305::new_from_slice(&dek)
                .map_err(|e| ZhacError::Crypto(format!("invalid DEK: {e}")))?;
            dek.zeroize();
            let plaintext = payload_cipher
                .decrypt((&ciphertext.nonce).into(), ciphertext.data.as_ref())
                .map_err(|e| ZhacError::Crypto(format!("payload decryption failed: {e}")))?;
            return Ok(plaintext);
        }
    }

    Err(ZhacError::Crypto(
        "none of the headers match this viewing key".into(),
    ))
}

// ── Helpers ────────────────────────────────────────────────────────────────

pub fn random_fr() -> Fr {
    let mut wide = [0u8; 64];
    OsRng.fill_bytes(&mut wide);
    Fr::from_bytes_wide(&wide)
}

/// Derive a symmetric key from a DH-KA shared secret.
///
/// `info_prefix` provides domain separation between the direct encryption
/// key and the KEK used for multi-recipient DEK wrapping.
pub fn derive_key(
    ss: &SubgroupPoint,
    epk_bytes: &[u8; 32],
    pk_d: &SubgroupPoint,
    info_prefix: &[u8],
) -> Result<[u8; 32]> {
    let ss_bytes = ss.to_bytes();
    let pk_d_bytes = pk_d.to_bytes();
    let hk = Hkdf::<Sha256>::new(None, &ss_bytes);
    let mut info = Vec::with_capacity(info_prefix.len() + 32 + 32);
    info.extend_from_slice(info_prefix);
    info.extend_from_slice(epk_bytes);
    info.extend_from_slice(&pk_d_bytes);
    let mut okm = [0u8; 32];
    hk.expand(&info, &mut okm)
        .map_err(|e| ZhacError::Crypto(format!("HKDF expand: {e}")))?;
    Ok(okm)
}

// ── Tests ──────────────────────────────────────────────────────────────────
