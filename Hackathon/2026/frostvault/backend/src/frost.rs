//! Real FROST threshold cryptography over Zcash's RedPallas ciphersuite
//! (`reddsa::frost::redpallas`), the same scheme used for Orchard spend
//! authorization signatures.
//!
//! Distributed key generation (DKG) means no party -- including this
//! backend -- ever computes or holds the reassembled group private key.
//! Each participant's [`frost::keys::KeyPackage`] is a distinct secret
//! share derived via verifiable secret sharing; the group public key is
//! derived from commitments, not by combining shares.
//!
//! Disclosed simplification: because this is a single-operator hackathon
//! demo with no separate participant devices, every participant's DKG and
//! signing computation runs inside this one process and the resulting
//! `KeyPackage`s are persisted server-side. In a real deployment each
//! participant would generate and keep their own `KeyPackage` on their own
//! device, and a coordinator would never see it. That's a simplification of
//! *where* the real math runs, not a simulation of the math itself.

use std::collections::BTreeMap;

use anyhow::{ensure, Context, Result};
use rand::rngs::OsRng;
use reddsa::frost::redpallas as frost;

pub type Identifier = frost::Identifier;
pub type KeyPackage = frost::keys::KeyPackage;
pub type PublicKeyPackage = frost::keys::PublicKeyPackage;
pub type Signature = frost::Signature;
pub type VerifyingKey = frost::VerifyingKey;

pub struct DkgOutput {
    pub public_key_package: PublicKeyPackage,
    pub key_packages: BTreeMap<Identifier, KeyPackage>,
}

/// Runs the real 3-part FROST DKG protocol (frost-core `keys::dkg::part1/2/3`)
/// for `max_signers` participants with a `min_signers` threshold. No trusted
/// dealer is involved.
pub fn run_dkg(max_signers: u16, min_signers: u16) -> Result<DkgOutput> {
    ensure!(min_signers >= 2, "threshold must be at least 2");
    ensure!(max_signers >= min_signers, "total participants must be >= threshold");

    let mut rng = OsRng;

    // Round 1: each participant generates a secret package + a package to broadcast.
    let mut round1_secret_packages: BTreeMap<Identifier, frost::keys::dkg::round1::SecretPackage> =
        BTreeMap::new();
    let mut received_round1_packages: BTreeMap<
        Identifier,
        BTreeMap<Identifier, frost::keys::dkg::round1::Package>,
    > = BTreeMap::new();

    for idx in 1..=max_signers {
        let id: Identifier = idx.try_into().context("invalid identifier")?;
        let (secret_package, package) = frost::keys::dkg::part1(id, max_signers, min_signers, &mut rng)
            .context("DKG part1 failed")?;
        round1_secret_packages.insert(id, secret_package);

        for other_idx in 1..=max_signers {
            if other_idx == idx {
                continue;
            }
            let other_id: Identifier = other_idx.try_into().context("invalid identifier")?;
            received_round1_packages
                .entry(other_id)
                .or_default()
                .insert(id, package.clone());
        }
    }

    // Round 2: each participant processes what they received, produces
    // per-recipient packages.
    let mut round2_secret_packages: BTreeMap<Identifier, frost::keys::dkg::round2::SecretPackage> =
        BTreeMap::new();
    let mut received_round2_packages: BTreeMap<
        Identifier,
        BTreeMap<Identifier, frost::keys::dkg::round2::Package>,
    > = BTreeMap::new();

    for idx in 1..=max_signers {
        let id: Identifier = idx.try_into().context("invalid identifier")?;
        let secret_package = round1_secret_packages
            .remove(&id)
            .context("missing round1 secret package")?;
        let round1_packages = received_round1_packages
            .get(&id)
            .context("missing round1 packages")?;

        let (secret_package2, round2_packages) = frost::keys::dkg::part2(secret_package, round1_packages)
            .context("DKG part2 failed")?;
        round2_secret_packages.insert(id, secret_package2);

        for (recipient, package) in round2_packages {
            received_round2_packages
                .entry(recipient)
                .or_default()
                .insert(id, package);
        }
    }

    // Round 3 (final): each participant finalizes their long-lived KeyPackage.
    let mut key_packages = BTreeMap::new();
    let mut public_key_package: Option<PublicKeyPackage> = None;

    for idx in 1..=max_signers {
        let id: Identifier = idx.try_into().context("invalid identifier")?;
        let secret_package2 = round2_secret_packages
            .get(&id)
            .context("missing round2 secret package")?;
        let round1_packages = received_round1_packages
            .get(&id)
            .context("missing round1 packages")?;
        let round2_packages = received_round2_packages
            .get(&id)
            .context("missing round2 packages")?;

        let (key_package, pubkey_package) = frost::keys::dkg::part3(secret_package2, round1_packages, round2_packages)
            .context("DKG part3 failed")?;

        key_packages.insert(id, key_package);
        public_key_package = Some(pubkey_package);
    }

    Ok(DkgOutput {
        public_key_package: public_key_package.context("DKG produced no participants")?,
        key_packages,
    })
}

pub struct SigningOutput {
    pub signature: Signature,
    /// The rerandomized verifying key this specific signature must be checked
    /// against (rerandomization means each signature has its own randomized
    /// verifying key, derived fresh from round-1 commitments).
    pub randomized_verifying_key: VerifyingKey,
}

/// Runs a real 2-round rerandomized FROST signing ceremony (matching Zcash's
/// Orchard spend-authorization scheme) over `message`, using exactly the
/// participants in `signer_ids` (which must number >= the group's threshold).
pub fn run_signing_ceremony(
    message: &[u8],
    key_packages: &BTreeMap<Identifier, KeyPackage>,
    signer_ids: &[Identifier],
    public_key_package: &PublicKeyPackage,
) -> Result<SigningOutput> {
    let mut rng = OsRng;

    // Round 1: nonce + commitment per signer.
    let mut nonces_map = BTreeMap::new();
    let mut commitments_map = BTreeMap::new();
    for id in signer_ids {
        let key_package = key_packages.get(id).context("unknown signer identifier")?;
        let (nonces, commitments) = frost::round1::commit(key_package.signing_share(), &mut rng);
        nonces_map.insert(*id, nonces);
        commitments_map.insert(*id, commitments);
    }

    let signing_package = frost::SigningPackage::new(commitments_map, message);

    // Derive the rerandomizer from round-1 commitments, per the Zcash spec.
    let (randomizer_params, randomizer_seed) = frost::rerandomized::RandomizedParams::new_from_commitments(
        public_key_package.verifying_key(),
        signing_package.signing_commitments(),
        &mut rng,
    )
    .context("failed to derive randomizer params")?;

    // Round 2: each signer produces a rerandomized signature share.
    let mut signature_shares = BTreeMap::new();
    for id in signer_ids {
        let key_package = key_packages.get(id).context("unknown signer identifier")?;
        let nonces = nonces_map.get(id).context("missing nonces for signer")?;
        let share = frost::rerandomized::sign_with_randomizer_seed(
            &signing_package,
            nonces,
            key_package,
            &randomizer_seed,
        )
        .context("round2 signing failed")?;
        signature_shares.insert(*id, share);
    }

    // Aggregation: verifies each share and combines into the final signature.
    let signature = frost::rerandomized::aggregate(
        &signing_package,
        &signature_shares,
        public_key_package,
        &randomizer_params,
    )
    .context("signature aggregation failed")?;

    let randomized_verifying_key = *randomizer_params.randomized_verifying_key();

    ensure!(
        randomized_verifying_key.verify(message, &signature).is_ok(),
        "aggregated signature failed self-verification"
    );

    Ok(SigningOutput {
        signature,
        randomized_verifying_key,
    })
}

/// Independently verifies a signature against the (rerandomized) verifying
/// key it was produced against. Exposed separately so the API layer can
/// re-verify on demand rather than only trusting the signing ceremony's own
/// internal check.
pub fn verify_signature(message: &[u8], signature: &Signature, verifying_key: &VerifyingKey) -> bool {
    verifying_key.verify(message, signature).is_ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn dkg_then_sign_then_verify_end_to_end() {
        let max_signers = 5;
        let min_signers = 3;

        let dkg = run_dkg(max_signers, min_signers).expect("DKG should succeed");
        assert_eq!(dkg.key_packages.len(), max_signers as usize);

        // No party should ever have a "full private key" -- there isn't one
        // to reconstruct; we only assert every share is distinct.
        let shares: Vec<_> = dkg
            .key_packages
            .values()
            .map(|kp| kp.signing_share().serialize())
            .collect();
        for i in 0..shares.len() {
            for j in (i + 1)..shares.len() {
                assert_ne!(shares[i], shares[j], "participant shares must be distinct");
            }
        }

        // Any threshold-many (here: 3 of 5) participants can sign.
        let signer_ids: Vec<Identifier> = dkg
            .key_packages
            .keys()
            .take(min_signers as usize)
            .cloned()
            .collect();

        let message = b"FrostVault: send 1.5 ZEC to alice.zcash";
        let signing = run_signing_ceremony(message, &dkg.key_packages, &signer_ids, &dkg.public_key_package)
            .expect("signing ceremony should succeed");

        assert!(verify_signature(message, &signing.signature, &signing.randomized_verifying_key));

        // Tampered message must fail verification.
        assert!(!verify_signature(
            b"FrostVault: send 999 ZEC to attacker.zcash",
            &signing.signature,
            &signing.randomized_verifying_key
        ));
    }

    #[test]
    fn recovery_demo_different_threshold_subset_still_verifies() {
        let max_signers = 5;
        let min_signers = 3;
        let dkg = run_dkg(max_signers, min_signers).expect("DKG should succeed");

        // Simulate losing participant 1's device: sign with participants 2,3,4 instead.
        let signer_ids: Vec<Identifier> = dkg
            .key_packages
            .keys()
            .filter(|id| **id != 1u16.try_into().unwrap())
            .take(min_signers as usize)
            .cloned()
            .collect();
        assert_eq!(signer_ids.len(), min_signers as usize);

        let message = b"FrostVault recovery: vault still operable without participant 1";
        let signing = run_signing_ceremony(message, &dkg.key_packages, &signer_ids, &dkg.public_key_package)
            .expect("recovery signing ceremony should succeed");

        assert!(verify_signature(message, &signing.signature, &signing.randomized_verifying_key));
    }
}
