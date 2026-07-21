//! RedJubjub Schnorr signatures — Zcash SpendAuth domain (§5.4.6).
//!
//! Uses the `redjubjub` crate directly for both signing and verification.
//!
//! ## Key derivation
//!
//! The RedJubjub signing key is derived from the ZHAC spending key:
//!   `sig_sk = BLAKE2b("ZHAC-sign", sk)`
//!
//! This scalar is converted to a [`redjubjub::SigningKey`] via canonical
//! little-endian byte representation.  The verification key is stored as
//! a Jubjub [`SubgroupPoint`] in [`ZhacPublicKey`].

use ff::PrimeField;
use group::GroupEncoding;
use redjubjub::{Signature, SigningKey, SpendAuth, VerificationKey};

use crate::keys::{ZhacPrivateKey, ZhacPublicKey, ZhacSignature};
use crate::{Result, ZhacError};

/// Sign `message` with the given private key using RedJubjub (SpendAuth).
///
/// ```
/// use zhac::keys::{ZhacKeySeed, ZhacPrivateKey};
/// use zhac::sign;
///
/// let seed = ZhacKeySeed::generate();
/// let sk = ZhacPrivateKey::from_seed(&seed);
/// let pk = sk.to_public_key(&[0u8; 11]).unwrap();
/// let sig = sign::sign(b"message", &sk).unwrap();
/// sign::verify(b"message", &sig, &pk).unwrap();
/// ```
pub fn sign(message: &[u8], private_key: &ZhacPrivateKey) -> Result<ZhacSignature> {
    let sig_sk = *private_key.signing_scalar();
    let sig_sk_bytes = sig_sk.to_repr();

    let sk = SigningKey::<SpendAuth>::try_from(sig_sk_bytes)
        .map_err(|e| ZhacError::Crypto(format!("invalid signing key: {e}")))?;

    // RedJubjub uses randomized nonces (matching Zcash's SpendAuth design).
    let redjub_sig = sk.sign(rand::rngs::OsRng, message);

    // Convert to [u8; 64] and split into ZhacSignature.
    let raw: [u8; 64] = redjub_sig.into();
    let mut r_bytes = [0u8; 32];
    let mut s_bytes = [0u8; 32];
    r_bytes.copy_from_slice(&raw[..32]);
    s_bytes.copy_from_slice(&raw[32..]);

    Ok(ZhacSignature { r_bytes, s_bytes })
}

/// Verify a [`ZhacSignature`] against a message and public key using RedJubjub.
pub fn verify(message: &[u8], signature: &ZhacSignature, public_key: &ZhacPublicKey) -> Result<()> {
    // Reconstruct the RedJubjub verification key.
    let vk_bytes: [u8; 32] = public_key.sig_vk.to_bytes();
    let vk = VerificationKey::<SpendAuth>::try_from(vk_bytes)
        .map_err(|e| ZhacError::Crypto(format!("invalid verification key: {e}")))?;

    // Reconstruct the RedJubjub signature.
    let mut raw = [0u8; 64];
    raw[..32].copy_from_slice(&signature.r_bytes);
    raw[32..].copy_from_slice(&signature.s_bytes);
    let redjub_sig = Signature::<SpendAuth>::from(raw);

    vk.verify(message, &redjub_sig)
        .map_err(|e| ZhacError::Crypto(format!("signature verification: {e}")))
}

// ── Tests ──────────────────────────────────────────────────────────────────
