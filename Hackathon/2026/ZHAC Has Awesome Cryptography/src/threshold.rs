//! FROST threshold signatures (RFC 9591) over RedJubjub.
//!
//! Implements t-of-n threshold signing with the
//! FROST(Jubjub, BLAKE2b-512) ciphersuite.
//!
//! ## Key Generation
//!
//! **Trusted Dealer** — one party generates the secret, splits it, and
//! distributes shares.  Simple to set up but the dealer knows the full key.
//!
//! ## Signing (two-round)
//!
//! **Round 1** — each participant: `commit(signing_share)` → (nonces, commitments)
//! **Round 2** — coordinator broadcasts signing package; each participant:
//!   `sign(package, nonces, key_package)` → signature share
//! **Aggregate** — coordinator: `aggregate(package, shares, pubkey_pkg)` → signature

use std::collections::BTreeMap;
use std::fs;
use std::path::Path;

use rand::rngs::OsRng;

use reddsa::frost::redjubjub::JubjubBlake2b512;
type J = JubjubBlake2b512;

use frost_core as frost;

use crate::{Result, ZhacError};

// ── Type aliases ──────────────────────────────────────────────────────────

pub type Identifier = frost::Identifier<J>;
pub type SecretShare = frost::keys::SecretShare<J>;
pub type KeyPackage = frost::keys::KeyPackage<J>;
pub type PublicKeyPackage = frost::keys::PublicKeyPackage<J>;
pub type SigningNonces = frost::round1::SigningNonces<J>;
pub type SigningCommitments = frost::round1::SigningCommitments<J>;
pub type SigningPackage = frost::SigningPackage<J>;
pub type SignatureShare = frost::round2::SignatureShare<J>;
pub type ThresholdSignature = frost_core::Signature<J>;
pub type IdentifierList<'a> = frost::keys::IdentifierList<'a, J>;

// ── Trusted Dealer Key Generation ─────────────────────────────────────────

/// Output of trusted-dealer key generation.
pub struct TrustedDealerOutput {
    pub secret_shares: BTreeMap<Identifier, SecretShare>,
    pub key_packages: BTreeMap<Identifier, KeyPackage>,
    pub public_key_package: PublicKeyPackage,
}

/// Run trusted-dealer key generation: one party generates a secret and
/// splits it into `n` shares with threshold `t` (t-of-n).
///
/// Each [`SecretShare`] must be sent to its participant over an
/// authenticated, confidential channel.  The [`PublicKeyPackage`] is
/// shared with everyone.
pub fn trusted_dealer_keygen(max_signers: u16, min_signers: u16) -> Result<TrustedDealerOutput> {
    if min_signers < 2 {
        return Err(ZhacError::Crypto("threshold must be at least 2".into()));
    }
    if min_signers > max_signers {
        return Err(ZhacError::Crypto("threshold cannot exceed total".into()));
    }

    let id_vec: Vec<Identifier> = (1..=max_signers)
        .map(|i| Identifier::try_from(i).map_err(|e| ZhacError::Crypto(format!("id: {e}"))))
        .collect::<Result<Vec<_>>>()?;
    let identifiers = IdentifierList::Custom(&id_vec);

    let (shares, pubkey_pkg) = frost::keys::generate_with_dealer::<J, _>(
        max_signers,
        min_signers,
        identifiers,
        &mut OsRng,
    )
    .map_err(|e| ZhacError::Crypto(format!("trusted dealer: {e}")))?;

    let key_packages: BTreeMap<Identifier, KeyPackage> = shares
        .iter()
        .map(|(id, share)| {
            let kp = KeyPackage::try_from(share.clone())
                .map_err(|e| ZhacError::Crypto(format!("key package: {e}")))?;
            Ok((*id, kp))
        })
        .collect::<Result<_>>()?;

    Ok(TrustedDealerOutput {
        secret_shares: shares,
        key_packages,
        public_key_package: pubkey_pkg,
    })
}

// ── Round 1: Nonce generation ─────────────────────────────────────────────

pub struct Round1Output {
    pub nonces: SigningNonces,
    pub commitments: SigningCommitments,
}

pub fn round1_commit(key_package: &KeyPackage) -> Result<Round1Output> {
    let (nonces, commitments) =
        frost::round1::commit::<J, _>(key_package.signing_share(), &mut OsRng);
    Ok(Round1Output {
        nonces,
        commitments,
    })
}

// ── Round 2: Signature share ──────────────────────────────────────────────

pub fn round2_sign(
    signing_package: &SigningPackage,
    nonces: &SigningNonces,
    key_package: &KeyPackage,
) -> Result<SignatureShare> {
    frost::round2::sign(signing_package, nonces, key_package)
        .map_err(|e| ZhacError::Crypto(format!("round2 sign: {e}")))
}

// ── Coordinator ───────────────────────────────────────────────────────────

pub fn build_signing_package(
    message: &[u8],
    commitments: &BTreeMap<Identifier, SigningCommitments>,
) -> SigningPackage {
    frost::SigningPackage::new(commitments.clone(), message)
}

pub fn aggregate(
    signing_package: &SigningPackage,
    signature_shares: &BTreeMap<Identifier, SignatureShare>,
    public_key_package: &PublicKeyPackage,
) -> Result<ThresholdSignature> {
    frost::aggregate(signing_package, signature_shares, public_key_package)
        .map_err(|e| ZhacError::Crypto(format!("aggregate: {e}")))
}

pub fn verify_threshold_signature(
    signature: &ThresholdSignature,
    message: &[u8],
    verifying_key: &frost::VerifyingKey<J>,
) -> Result<()> {
    verifying_key
        .verify(message, signature)
        .map_err(|e| ZhacError::Crypto(format!("threshold verify: {e}")))
}

// ── Serialization ─────────────────────────────────────────────────────────

macro_rules! serde_roundtrip {
    ($save:ident, $load:ident, $ty:ty) => {
        pub fn $save(data: &$ty, path: &Path) -> Result<()> {
            let bytes = bincode::serialize(data)
                .map_err(|e| ZhacError::Crypto(format!("serialize: {e}")))?;
            fs::write(path, &bytes)?;
            Ok(())
        }
        pub fn $load(path: &Path) -> Result<$ty> {
            let bytes = fs::read(path)?;
            bincode::deserialize(&bytes).map_err(|e| ZhacError::Crypto(format!("deserialize: {e}")))
        }
    };
}

serde_roundtrip!(save_secret_share, load_secret_share, SecretShare);
serde_roundtrip!(save_key_package, load_key_package, KeyPackage);
serde_roundtrip!(save_pubkey_pkg, load_pubkey_pkg, PublicKeyPackage);
serde_roundtrip!(save_nonces, load_nonces, SigningNonces);
serde_roundtrip!(save_commitments, load_commitments, SigningCommitments);
serde_roundtrip!(save_signing_package, load_signing_package, SigningPackage);
serde_roundtrip!(save_share, load_share, SignatureShare);
serde_roundtrip!(save_threshold_sig, load_threshold_sig, ThresholdSignature);

pub fn load_shares_dir(dir: &Path) -> Result<BTreeMap<Identifier, SignatureShare>> {
    let mut shares = BTreeMap::new();
    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        let path = entry.path();
        if path.extension().is_some_and(|e| e == "share") {
            let share: SignatureShare = load_share(&path)?;
            if let Some(stem) = path.file_stem() {
                if let Ok(id_num) = stem.to_string_lossy().parse::<u16>() {
                    if let Ok(id) = Identifier::try_from(id_num) {
                        shares.insert(id, share);
                    }
                }
            }
        }
    }
    Ok(shares)
}

pub fn load_commitments_dir(dir: &Path) -> Result<BTreeMap<Identifier, SigningCommitments>> {
    let mut map = BTreeMap::new();
    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        let path = entry.path();
        if path.extension().is_some_and(|e| e == "bin") {
            let c: SigningCommitments = load_commitments(&path)?;
            if let Some(stem) = path.file_stem() {
                if let Ok(id_num) = stem.to_string_lossy().parse::<u16>() {
                    if let Ok(id) = Identifier::try_from(id_num) {
                        map.insert(id, c);
                    }
                }
            }
        }
    }
    Ok(map)
}

// ── Tests ─────────────────────────────────────────────────────────────────
