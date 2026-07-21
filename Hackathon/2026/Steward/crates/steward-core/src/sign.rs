//! Re-randomized FROST two-round signing. **(P2)**
//!
//! Produces a RedPallas SpendAuth signature over an **externally supplied**
//! 32-byte sighash, re-randomized by an **externally supplied** ZIP-312
//! randomizer α. Both come from `zcash-sign` (see `docs/PROTOCOL.md` §3/§5): the
//! transaction builder already committed to `rk = ak + [α]G`, so α is never
//! freshly generated here — a different α would make the aggregate verify against
//! the wrong key.
//!
//! ### Why the *direct-randomizer* path
//! `frost-rerandomized` 3.0's headline API (`sign_with_randomizer_seed` /
//! `RandomizedParams::new_from_commitments`) derives α as `H(seed ‖ commitments)`,
//! i.e. the *protocol* picks α. That is wrong for us: α is dictated by the tx.
//! We therefore drive the direct-randomizer surface —
//! [`RandomizedParams::from_randomizer`] for aggregation and
//! `frost_rerandomized::sign` (the `#[deprecated]`, still-correct, α-by-value
//! round 2) for signing. This is the one deviation from the "modern" API and it
//! is deliberate. See the report notes.
//!
//! Flow: round 1 [`commit`] → coordinator [`signing_package`] → round 2
//! [`sign_share`] (per guardian) → coordinator [`aggregate`] → verify against
//! [`randomized_verifying_key`].

use std::collections::BTreeMap;

use rand::{CryptoRng, RngCore};

use crate::error::{Error, Result};
use crate::redpallas::{
    self,
    keys::{KeyPackage, PublicKeyPackage},
    rerandomized::{RandomizedParams, Randomizer},
    round1::{SigningCommitments, SigningNonces},
    round2::SignatureShare,
    Field, Identifier, PallasScalarField, Signature, SigningPackage, VerifyingKey,
};

/// Round 1 (per guardian): generate single-use signing nonces and public
/// commitments to them.
///
/// The [`SigningNonces`] are secret and MUST be used for **at most one**
/// signature (reuse leaks the signing share); the [`SigningCommitments`] are
/// sent to the coordinator.
pub fn commit<R: RngCore + CryptoRng>(
    key_package: &KeyPackage,
    rng: &mut R,
) -> (SigningNonces, SigningCommitments) {
    redpallas::round1::commit(key_package.signing_share(), rng)
}

/// Coordinator: assemble the [`SigningPackage`] from the guardians' round-1
/// commitments and the 32-byte `sighash` to be signed. The sighash is carried as
/// the package's message and hashed into every guardian's binding factor.
pub fn signing_package(
    commitments: BTreeMap<Identifier, SigningCommitments>,
    sighash: &[u8; 32],
) -> SigningPackage {
    SigningPackage::new(commitments, sighash)
}

/// Build the ZIP-312 randomizer α from its 32-byte **little-endian** encoding —
/// exactly the bytes `zcash-sign` prints on its `Randomizer #n:` line.
pub fn randomizer_from_le_bytes(bytes: &[u8; 32]) -> Result<Randomizer> {
    Randomizer::deserialize(bytes).map_err(|e| Error::Frost(format!("{e}")))
}

/// Round 2 (per guardian): produce this guardian's re-randomized signature share
/// over `sighash` under randomizer α.
///
/// `signing_package` must carry `sighash` as its message (checked). Internally
/// this randomizes the key package by `rsk_i = ask_i + α`, `rak_i = ak_i + [α]G`
/// and runs ordinary FROST round 2 against it.
pub fn sign_share(
    sighash: &[u8; 32],
    randomizer: &Randomizer,
    nonces: &SigningNonces,
    key_package: &KeyPackage,
    signing_package: &SigningPackage,
) -> Result<SignatureShare> {
    check_message(sighash, signing_package)?;
    // The α-by-value round 2. Deprecated upstream in favour of the seed-derived
    // API, but that derives its own α; we require the externally supplied one.
    #[allow(deprecated)]
    frost_rerandomized::sign(signing_package, nonces, key_package, *randomizer)
        .map_err(|e| Error::Frost(format!("{e}")))
}

/// Coordinator: aggregate the guardians' shares into the final RedPallas
/// signature, re-randomized by α.
///
/// The result verifies against [`randomized_verifying_key`] (== Orchard
/// `rk = ak + [α]G`), **not** the un-randomized group key.
pub fn aggregate(
    sighash: &[u8; 32],
    randomizer: &Randomizer,
    signing_package: &SigningPackage,
    shares: &BTreeMap<Identifier, SignatureShare>,
    public_key_package: &PublicKeyPackage,
) -> Result<Signature> {
    check_message(sighash, signing_package)?;
    let params = RandomizedParams::from_randomizer(public_key_package.verifying_key(), *randomizer);
    frost_rerandomized::aggregate(signing_package, shares, public_key_package, &params)
        .map_err(|e| Error::Frost(format!("{e}")))
}

/// The randomized group verifying key `rk = ak + [α]G` for randomizer α. The
/// aggregate signature from [`aggregate`] verifies against this via
/// [`VerifyingKey::verify`].
pub fn randomized_verifying_key(
    randomizer: &Randomizer,
    public_key_package: &PublicKeyPackage,
) -> VerifyingKey {
    let params = RandomizedParams::from_randomizer(public_key_package.verifying_key(), *randomizer);
    *params.randomized_verifying_key()
}

/// Generate a uniformly random randomizer.
///
/// **For tests and local simulation only.** In production α is fixed by the
/// transaction builder and arrives via [`randomizer_from_le_bytes`]; generating a
/// fresh one would not match `rk` and the signature would be unusable on-chain.
pub fn random_randomizer<R: RngCore + CryptoRng>(rng: &mut R) -> Randomizer {
    Randomizer::from_scalar(PallasScalarField::random(rng))
}

/// Guard that the coordinator's signing package actually commits to `sighash`.
fn check_message(sighash: &[u8; 32], signing_package: &SigningPackage) -> Result<()> {
    if signing_package.message()[..] != sighash[..] {
        return Err(Error::Config(
            "signing package message does not match the supplied sighash".into(),
        ));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::keys::split_authority;
    use crate::redpallas::SigningKey;
    use rand::{rngs::OsRng, RngCore};

    #[test]
    fn rerandomized_2_of_3_signs_and_verifies() {
        let mut rng = OsRng;
        let ask = SigningKey::new(&mut rng);
        let vault = split_authority(&ask, 3, 2, &mut rng).unwrap();
        let key_packages = vault.key_packages().unwrap();

        // External inputs in production; random here.
        let mut sighash = [0u8; 32];
        rng.fill_bytes(&mut sighash);
        let randomizer = random_randomizer(&mut rng);

        // Any t=2 of the n=3 guardians sign.
        let signers: Vec<Identifier> = key_packages.keys().copied().take(2).collect();

        // --- Round 1 ---
        let mut nonces = BTreeMap::new();
        let mut commitments = BTreeMap::new();
        for id in &signers {
            let (n, c) = commit(&key_packages[id], &mut rng);
            nonces.insert(*id, n);
            commitments.insert(*id, c);
        }

        // Coordinator assembles the signing package over the sighash.
        let pkg = signing_package(commitments, &sighash);

        // --- Round 2 ---
        let mut shares = BTreeMap::new();
        for id in &signers {
            let share =
                sign_share(&sighash, &randomizer, &nonces[id], &key_packages[id], &pkg).unwrap();
            shares.insert(*id, share);
        }

        // --- Aggregate + verify against rk ---
        let sig = aggregate(&sighash, &randomizer, &pkg, &shares, &vault.public_key_package).unwrap();
        let rk = randomized_verifying_key(&randomizer, &vault.public_key_package);
        rk.verify(&sighash, &sig)
            .expect("aggregate signature must verify against the randomized key rk");

        // Sanity: it must NOT verify against the un-randomized group key.
        assert!(vault
            .public_key_package
            .verifying_key()
            .verify(&sighash, &sig)
            .is_err());
    }

    #[test]
    fn randomizer_le_roundtrips() {
        let mut rng = OsRng;
        let r = random_randomizer(&mut rng);
        let bytes = r.serialize();
        let arr: [u8; 32] = bytes.try_into().unwrap();
        let r2 = randomizer_from_le_bytes(&arr).unwrap();
        assert!(r == r2);
    }
}
