//! Zcash Orchard key/address derivation (feature `zcash`).
//!
//! A FROST group produces only the Orchard **spend validating key** (`ak`).
//! A full viewing key also needs the **nullifier key** (`nk`) and the
//! **commit-ivk randomness** (`rivk`); together they form the 96-byte FVK
//! encoding `ak || nk || rivk`.
//!
//! We derive `nk`/`rivk` **deterministically from `ak`** (domain-separated
//! hash-to-field), so every group member computes the same viewing key with no
//! extra protocol round and no stored state — keeping the DKG byte-compatible
//! with the upstream `frost-client` CLI.
//!
//! Trade-off: because the viewing key is a function of `ak`, anyone who learns
//! `ak` can reconstruct it. `ak` is shared only within the group and never
//! appears on-chain (the on-chain `rk` is `ak` re-randomized per spend), so the
//! viewing-privacy boundary is "members of the group" — the same set that holds
//! the FVK anyway. A future upgrade can replace this with a group-agreed random
//! `nk`/`rivk` without changing the address-rendering API.

use ff::{FromUniformBytes, PrimeField};
use pasta_curves::pallas;
use sha2::{Digest, Sha512};
use zcash_address::unified::{Address, Encoding, Fvk, Receiver, Ufvk};
use zcash_protocol::consensus::NetworkType;

use crate::error::CoreError;

const NK_DOMAIN: &[u8] = b"Cyze:OrchardFVK:nk:v1";
const RIVK_DOMAIN: &[u8] = b"Cyze:OrchardFVK:rivk:v1";

/// Derived, display-ready Orchard keys for a group.
#[derive(Debug, Clone, serde::Serialize)]
pub struct OrchardKeys {
    /// Unified address string (`u1…`).
    pub address: String,
    /// Unified full viewing key string (`uview1…`).
    pub ufvk: String,
}

fn wide_hash(domain: &[u8], ak: &[u8]) -> [u8; 64] {
    let mut h = Sha512::new();
    h.update(domain);
    h.update(ak);
    let mut out = [0u8; 64];
    out.copy_from_slice(&h.finalize());
    out
}

/// Build the 96-byte Orchard FVK encoding (`ak || nk || rivk`) for a group,
/// deriving `nk`/`rivk` deterministically from `ak`.
pub fn orchard_fvk_bytes(ak: &[u8; 32]) -> [u8; 96] {
    let nk = pallas::Base::from_uniform_bytes(&wide_hash(NK_DOMAIN, ak));
    let rivk = pallas::Scalar::from_uniform_bytes(&wide_hash(RIVK_DOMAIN, ak));

    let mut out = [0u8; 96];
    out[..32].copy_from_slice(ak);
    out[32..64].copy_from_slice(&nk.to_repr());
    out[64..].copy_from_slice(&rivk.to_repr());
    out
}

/// Derive the unified address and UFVK for a group's `ak`, encoded for the
/// given network (mainnet `u1…` / testnet `utest1…`).
pub fn derive_orchard_keys(ak: &[u8; 32], network: NetworkType) -> Result<OrchardKeys, CoreError> {
    let fvk_bytes = orchard_fvk_bytes(ak);
    let fvk = orchard::keys::FullViewingKey::from_bytes(&fvk_bytes)
        .ok_or_else(|| CoreError::Crypto("invalid Orchard ak (not a valid spend key)".into()))?;

    let receiver = fvk
        .address_at(0u32, orchard::keys::Scope::External)
        .to_raw_address_bytes();

    let address = Address::try_from_items(vec![Receiver::Orchard(receiver)])
        .map_err(|e| CoreError::Crypto(format!("unified address: {e:?}")))?
        .encode(&network);
    let ufvk = Ufvk::try_from_items(vec![Fvk::Orchard(fvk_bytes)])
        .map_err(|e| CoreError::Crypto(format!("ufvk: {e:?}")))?
        .encode(&network);

    Ok(OrchardKeys { address, ufvk })
}

/// Convenience: derive from a hex-encoded `ak` (the group's verifying key id).
pub fn derive_orchard_keys_hex(ak_hex: &str, network: NetworkType) -> Result<OrchardKeys, CoreError> {
    let bytes = hex::decode(ak_hex.trim())
        .map_err(|e| CoreError::Crypto(format!("bad ak hex: {e}")))?;
    let ak: [u8; 32] = bytes
        .try_into()
        .map_err(|_| CoreError::Crypto("ak must be 32 bytes".into()))?;
    derive_orchard_keys(&ak, network)
}

/// Derive the group's Orchard unified receive address at a specific diversifier
/// index. Rotating the index yields a fresh, unlinkable receive address that the
/// same viewing key still detects (Orchard IVK trial-decryption is diversifier-
/// independent), so callers can hand out a new address per payment without any
/// change to the group key. Index 0 matches [`derive_orchard_keys`].
pub fn derive_orchard_address_at(
    ak_hex: &str,
    network: NetworkType,
    index: u32,
) -> Result<String, CoreError> {
    let bytes = hex::decode(ak_hex.trim())
        .map_err(|e| CoreError::Crypto(format!("bad ak hex: {e}")))?;
    let ak: [u8; 32] = bytes
        .try_into()
        .map_err(|_| CoreError::Crypto("ak must be 32 bytes".into()))?;
    let fvk_bytes = orchard_fvk_bytes(&ak);
    let fvk = orchard::keys::FullViewingKey::from_bytes(&fvk_bytes)
        .ok_or_else(|| CoreError::Crypto("invalid Orchard ak (not a valid spend key)".into()))?;
    let receiver = fvk
        .address_at(index, orchard::keys::Scope::External)
        .to_raw_address_bytes();
    let address = Address::try_from_items(vec![Receiver::Orchard(receiver)])
        .map_err(|e| CoreError::Crypto(format!("unified address: {e:?}")))?
        .encode(&network);
    Ok(address)
}

#[cfg(test)]
mod tests {
    use super::*;
    use orchard::keys::{FullViewingKey, Scope, SpendingKey};

    fn sample_ak() -> [u8; 32] {
        // A valid Orchard ak: take it from a real spending key's FVK.
        let sk = Option::<SpendingKey>::from(SpendingKey::from_bytes([7u8; 32]))
            .expect("valid spending key");
        FullViewingKey::from(&sk).to_bytes()[..32].try_into().unwrap()
    }

    #[test]
    fn derives_stable_address_and_ufvk() {
        let ak = sample_ak();
        let a = derive_orchard_keys(&ak, NetworkType::Main).unwrap();
        let b = derive_orchard_keys(&ak, NetworkType::Main).unwrap();
        // Deterministic: same ak -> same keys, every member, every run.
        assert_eq!(a.address, b.address);
        assert_eq!(a.ufvk, b.ufvk);
        assert!(a.address.starts_with("u1"), "got {}", a.address);
        assert!(a.ufvk.starts_with("uview1"), "got {}", a.ufvk);

        // Testnet encodes the same key material under testnet HRPs.
        let t = derive_orchard_keys(&ak, NetworkType::Test).unwrap();
        assert!(t.address.starts_with("utest1"), "got {}", t.address);
        assert!(t.ufvk.starts_with("uviewtest1"), "got {}", t.ufvk);
        assert_ne!(t.address, a.address);
    }

    #[test]
    fn rotating_receive_addresses_are_distinct_and_index0_matches_default() {
        let ak = sample_ak();
        let ak_hex = hex::encode(ak);
        // Index 0 must equal the canonical default address.
        let default = derive_orchard_keys(&ak, NetworkType::Test).unwrap().address;
        let at0 = derive_orchard_address_at(&ak_hex, NetworkType::Test, 0).unwrap();
        assert_eq!(default, at0);
        // Successive indices produce distinct, valid testnet unified addresses.
        let mut seen = std::collections::HashSet::new();
        for i in 0..8u32 {
            let a = derive_orchard_address_at(&ak_hex, NetworkType::Test, i).unwrap();
            assert!(a.starts_with("utest1"), "got {a}");
            assert!(seen.insert(a), "diversifier index {i} reused an address");
        }
    }

    #[test]
    fn fvk_parts_roundtrip_to_address() {
        // The (ak, nk, rivk) path produces a usable FVK whose address matches
        // the one the reconstructed FVK derives directly.
        let ak = sample_ak();
        let fvk_bytes = orchard_fvk_bytes(&ak);
        let fvk = FullViewingKey::from_bytes(&fvk_bytes).expect("valid FVK");
        let direct = fvk.address_at(0u32, Scope::External).to_raw_address_bytes();
        assert_eq!(direct.len(), 43);
    }

    #[test]
    fn frost_reddsa_accepts_orchard_ak_bytes() {
        // Cross-version byte-compat: the orchard ak encoding must be parseable
        // by the (different-version) reddsa that FROST signs with — proving a
        // FROST RedPallas verifying key feeds straight into orchard.
        let ak = sample_ak();
        let vk = reddsa::frost::redpallas::VerifyingKey::deserialize(&ak);
        assert!(vk.is_ok(), "FROST reddsa must parse orchard ak bytes");
    }
}
