//! Guardian social-recovery. **(P8)**
//!
//! [`repair_lost_share`] runs the Repairable Threshold Scheme (RTS,
//! [eprint 2017/1155](https://eprint.iacr.org/2017/1155)) so that any `t`
//! guardians ("helpers") can regenerate a **lost** guardian's share **without**
//! reconstructing `ask` or moving funds. The group verifying key (== Orchard
//! `ak`) is unchanged, so the vault address / UFVK stay valid and the recovered
//! share signs interoperably with the surviving ones. See `docs/PROTOCOL.md` §6.
//!
//! Protocol (all values are per-participant and carried over guardian channels):
//! 1. each helper `i` runs [`repair_share_part1`], producing one `Delta` addressed
//!    to every helper (including itself);
//! 2. each helper `j` sums the deltas addressed to it into a `Sigma`
//!    ([`repair_share_part2`]);
//! 3. the recovering participant rebuilds its [`KeyPackage`] from all sigmas
//!    ([`repair_share_part3`]).
//!
//! This driver plays all three roles locally; a networked coordinator would split
//! the steps across the guardians and only exchange `Delta`/`Sigma` blobs.

use std::collections::BTreeMap;

use rand::{CryptoRng, RngCore};

use crate::error::{Error, Result};
use crate::redpallas::keys::repairable::{
    repair_share_part1, repair_share_part2, repair_share_part3, Delta, Sigma,
};
use crate::redpallas::keys::{KeyPackage, PublicKeyPackage};
use crate::redpallas::{Identifier, PallasBlake2b512};

/// Repair the share of the guardian `lost` using the `helper_key_packages`
/// (which must be at least `t` guardians and must **not** include `lost`).
///
/// Returns the recovered [`KeyPackage`] for `lost`: its signing share is
/// bit-for-bit the original, so it is a drop-in replacement.
pub fn repair_lost_share<R: RngCore + CryptoRng>(
    helper_key_packages: &BTreeMap<Identifier, KeyPackage>,
    public_key_package: &PublicKeyPackage,
    lost: Identifier,
    rng: &mut R,
) -> Result<KeyPackage> {
    if helper_key_packages.contains_key(&lost) {
        return Err(Error::Config(
            "the lost participant must not be among the helpers".into(),
        ));
    }
    let helpers: Vec<Identifier> = helper_key_packages.keys().copied().collect();

    // Part 1: every helper `i` computes a delta for every helper, keyed by the
    // recipient's identifier. `part1[i][j]` is the delta helper `i` sends to `j`.
    let mut part1: BTreeMap<Identifier, BTreeMap<Identifier, Delta>> = BTreeMap::new();
    for (id, kp) in helper_key_packages {
        // The reddsa wrapper's `C` type parameter is not constrained by its
        // (already-monomorphized) arguments, so pin it explicitly.
        let deltas = repair_share_part1::<PallasBlake2b512, _>(&helpers, kp, rng, lost)
            .map_err(|e| Error::Frost(format!("{e}")))?;
        part1.insert(*id, deltas);
    }

    // Part 2: every helper `j` sums the deltas addressed to it into a sigma.
    let mut sigmas: Vec<Sigma> = Vec::with_capacity(helpers.len());
    for j in &helpers {
        let deltas_for_j: Vec<Delta> = helpers
            .iter()
            .map(|i| {
                part1
                    .get(i)
                    .and_then(|m| m.get(j))
                    .copied()
                    .ok_or_else(|| Error::Frost(format!("missing delta from {i:?} to {j:?}")))
            })
            .collect::<Result<_>>()?;
        sigmas.push(repair_share_part2(&deltas_for_j));
    }

    // Part 3: the recovering participant reconstructs its KeyPackage. This errors
    // if `public_key_package.min_signers()` is None (pre-3.0 packages); ours is
    // always Some since it comes from `keys::split_authority`.
    repair_share_part3(&sigmas, lost, public_key_package).map_err(|e| Error::Frost(format!("{e}")))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::keys::split_authority;
    use crate::redpallas::SigningKey;
    use rand::rngs::OsRng;

    #[test]
    fn repair_recovers_the_original_share() {
        let mut rng = OsRng;
        let ask = SigningKey::new(&mut rng);
        let vault = split_authority(&ask, 3, 2, &mut rng).unwrap();
        let all = vault.key_packages().unwrap();

        let ids: Vec<Identifier> = all.keys().copied().collect();
        let lost = ids[2];

        // Helpers = the surviving t=2 guardians.
        let mut helpers = BTreeMap::new();
        helpers.insert(ids[0], all[&ids[0]].clone());
        helpers.insert(ids[1], all[&ids[1]].clone());

        let recovered =
            repair_lost_share(&helpers, &vault.public_key_package, lost, &mut rng).unwrap();

        // The repaired signing share equals the original, byte-for-byte.
        assert_eq!(recovered.identifier(), &lost);
        assert!(
            recovered.signing_share() == all[&lost].signing_share(),
            "recovered share must equal the original lost share"
        );
        // Group key is preserved by RTS.
        assert_eq!(
            recovered.verifying_key().serialize().unwrap(),
            vault.public_key_package.verifying_key().serialize().unwrap()
        );
    }

    #[test]
    fn rejects_helper_that_is_the_lost_participant() {
        let mut rng = OsRng;
        let ask = SigningKey::new(&mut rng);
        let vault = split_authority(&ask, 3, 2, &mut rng).unwrap();
        let all = vault.key_packages().unwrap();
        let ids: Vec<Identifier> = all.keys().copied().collect();

        let mut helpers = BTreeMap::new();
        helpers.insert(ids[0], all[&ids[0]].clone());
        helpers.insert(ids[1], all[&ids[1]].clone());
        // Ask to repair ids[0], who is also a helper → rejected.
        assert!(repair_lost_share(&helpers, &vault.public_key_package, ids[0], &mut rng).is_err());
    }
}
