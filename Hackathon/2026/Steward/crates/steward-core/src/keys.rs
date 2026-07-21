//! Vault key setup. **(P2)**
//!
//! At vault creation the owner acts as **trusted dealer**: they hold the real
//! Orchard spend-authorizing key `ask` (a RedPallas SpendAuth scalar) and split
//! it into `t`-of-`n` guardian shares with verifiable Shamir secret sharing,
//! then discard the monolithic `ask`. The FROST group verifying key equals the
//! Orchard spend-validating key `ak`, which RedPallas/Orchard requires to have an
//! even Y coordinate (see [`EvenY`]).
//!
//! This module owns *only* the split. Deriving the UFVK / receiving address from
//! the full viewing key is `steward-signer`'s job (it needs `orchard` /
//! `zcash_keys`). See `docs/PROTOCOL.md` §1.

use std::collections::BTreeMap;

use rand::{CryptoRng, RngCore};

use crate::error::{Error, Result};
use crate::redpallas::keys::{EvenY, IdentifierList, KeyPackage, PublicKeyPackage, SecretShare};
use crate::redpallas::{Identifier, SigningKey};

/// The RedPallas ZIP-312 FROST ciphersuite (`FROST(Pallas, BLAKE2b-512)`),
/// re-exported so downstream code has one canonical name for `C`.
pub use crate::redpallas::PallasBlake2b512 as Ciphersuite;

/// The result of splitting the vault `ask` into guardian shares.
pub struct VaultShares {
    /// One secret share per guardian, keyed by FROST [`Identifier`]. Each is a
    /// secret to be delivered to exactly one guardian and then destroyed here.
    pub shares: BTreeMap<Identifier, SecretShare>,
    /// Public group data: the group verifying key (== Orchard `ak`) plus every
    /// guardian's verifying share and the recorded threshold `t`. Safe to publish.
    pub public_key_package: PublicKeyPackage,
}

impl VaultShares {
    /// Rebuild one guardian's [`KeyPackage`] (its signing keypair for the FROST
    /// rounds) from its stored [`SecretShare`], validating the share along the way.
    pub fn key_package(&self, id: &Identifier) -> Result<KeyPackage> {
        let share = self
            .shares
            .get(id)
            .ok_or_else(|| Error::Config(format!("no share for identifier {id:?}")))?;
        KeyPackage::try_from(share.clone()).map_err(|e| Error::Frost(format!("{e}")))
    }

    /// Rebuild every guardian's [`KeyPackage`], keyed by identifier. Convenience
    /// for the signing / recovery modules and their tests.
    pub fn key_packages(&self) -> Result<BTreeMap<Identifier, KeyPackage>> {
        self.shares
            .iter()
            .map(|(id, share)| {
                KeyPackage::try_from(share.clone())
                    .map(|kp| (*id, kp))
                    .map_err(|e| Error::Frost(format!("{e}")))
            })
            .collect()
    }
}

/// Split the vault spend-authorizing key `ask` into `t`-of-`n` guardian shares
/// (trusted-dealer form).
///
/// `n` = total guardians (`max_signers`), `t` = threshold (`min_signers`). Note
/// the argument order mirrors FROST's `split`: max (`n`) first, then min (`t`).
///
/// The split output is always routed through [`EvenY`] so the group verifying key
/// (== Orchard `ak`) is guaranteed to have an even Y coordinate. `into_even_y` is
/// linear (it negates every component together), so it preserves both the group
/// key and each share's validity. `frost_core::keys::split` already applies this
/// via `post_generate`; we re-assert it so a non-canonical import can never slip
/// an odd-Y group key through into signing.
pub fn split_authority<R: RngCore + CryptoRng>(
    ask: &SigningKey,
    n: u16,
    t: u16,
    rng: &mut R,
) -> Result<VaultShares> {
    if t == 0 || t > n {
        return Err(Error::Config(format!(
            "invalid threshold: need 1 <= t <= n, got t={t}, n={n}"
        )));
    }

    let (shares, public_key_package) =
        crate::redpallas::keys::split(ask, n, t, IdentifierList::Default, rng)
            .map_err(|e| Error::Frost(format!("{e}")))?;

    // Guarantee even-Y on the group key, keeping every share aligned with the
    // (possibly negated) group key by passing the same `is_even`.
    let is_even = public_key_package.has_even_y();
    let public_key_package = public_key_package.into_even_y(Some(is_even));
    let shares = shares
        .into_iter()
        .map(|(id, share)| (id, share.into_even_y(Some(is_even))))
        .collect();

    Ok(VaultShares { shares, public_key_package })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::redpallas::VerifyingKey;
    use rand::rngs::OsRng;

    #[test]
    fn split_2_of_3_is_even_y_and_reconstructs() {
        let mut rng = OsRng;
        let ask = SigningKey::new(&mut rng);

        let vault = split_authority(&ask, 3, 2, &mut rng).expect("split should succeed");

        // n=3 shares, and the recorded threshold survives into the group package.
        assert_eq!(vault.shares.len(), 3);
        // RedPallas invariant: the group verifying key (Orchard `ak`) has even Y.
        assert!(vault.public_key_package.has_even_y());
        assert_eq!(
            vault.public_key_package.verifying_key().serialize().unwrap()[31] & 0x80,
            0
        );

        // Reconstructing the group secret from ANY t=2 shares must yield the same
        // group key as the published package — and the same across different pairs.
        let kps = vault.key_packages().unwrap();
        let ids: Vec<Identifier> = kps.keys().copied().collect();

        let pair_a = [kps[&ids[0]].clone(), kps[&ids[1]].clone()];
        let pair_b = [kps[&ids[0]].clone(), kps[&ids[2]].clone()];

        let sk_a = crate::redpallas::frost::keys::reconstruct(&pair_a).unwrap();
        let sk_b = crate::redpallas::frost::keys::reconstruct(&pair_b).unwrap();

        let vk_a = VerifyingKey::from(&sk_a).serialize().unwrap();
        let vk_b = VerifyingKey::from(&sk_b).serialize().unwrap();
        let group = vault.public_key_package.verifying_key().serialize().unwrap();

        assert_eq!(vk_a, group, "reconstructed key must equal the group key");
        assert_eq!(vk_a, vk_b, "every t-subset must reconstruct the same key");
    }

    #[test]
    fn rejects_bad_threshold() {
        let mut rng = OsRng;
        let ask = SigningKey::new(&mut rng);
        assert!(split_authority(&ask, 3, 0, &mut rng).is_err());
        assert!(split_authority(&ask, 2, 3, &mut rng).is_err());
    }
}
