use orchard::keys::{FullViewingKey, Scope, SpendingKey};
use zcash_address::unified::{self, Encoding};
use zcash_address::{ToAddress, ZcashAddress};
use zcash_protocol::consensus::NetworkType;

#[derive(Debug, thiserror::Error)]
pub enum DeriveError {
    #[error("ZIP 32 derivation failed: {0}")]
    Zip32(orchard::zip32::Error),
    #[error("Invalid account: {0}")]
    InvalidAccount(u32),
    #[error("Unified address encoding failed")]
    Encoding,
    #[error("Invalid view key bytes")]
    InvalidViewKey,
}

/// Derive a unified Zcash address from a BIP39 seed at the given account and
/// diversifier index, using the specified network type.
///
/// Uses Orchard (preferred pool) for the unified address.
pub fn derive_address(
    seed: &[u8; 64],
    account: u32,
    index: u32,
    net: NetworkType,
) -> Result<String, DeriveError> {
    let account_id =
        zip32::AccountId::try_from(account).map_err(|_| DeriveError::InvalidAccount(account))?;
    let sk = SpendingKey::from_zip32_seed(seed, 133, account_id).map_err(DeriveError::Zip32)?;
    let fvk = FullViewingKey::from(&sk);
    address_from_fvk(&fvk, index, net)
}

/// Derive a unified address using the default account (0) and the given
/// diversifier index.
pub fn derive_address_at_index(
    seed: &[u8; 64],
    index: u32,
    net: NetworkType,
) -> Result<String, DeriveError> {
    derive_address(seed, 0, index, net)
}

/// Derive a unified address from serialized FullViewingKey bytes and a
/// diversifier index. No seed or private key material needed.
pub fn derive_from_fvk(
    fvk_bytes: &[u8],
    index: u32,
    net: NetworkType,
) -> Result<String, DeriveError> {
    let bytes: [u8; 96] = fvk_bytes
        .try_into()
        .map_err(|_| DeriveError::InvalidViewKey)?;
    let fvk = FullViewingKey::from_bytes(&bytes).ok_or(DeriveError::InvalidViewKey)?;
    address_from_fvk(&fvk, index, net)
}

fn address_from_fvk(
    fvk: &FullViewingKey,
    index: u32,
    net: NetworkType,
) -> Result<String, DeriveError> {
    let address = fvk.address_at(index, Scope::External);
    let raw = address.to_raw_address_bytes();

    let ua = unified::Address::try_from_items(vec![unified::Receiver::Orchard(raw)])
        .map_err(|_| DeriveError::Encoding)?;
    let zaddr = ZcashAddress::from_unified(net, ua);
    Ok(zaddr.encode())
}

#[cfg(test)]
pub mod tests {
    use super::*;

    fn test_seed() -> [u8; 64] {
        let mut seed = [0u8; 64];
        let mnemonic = bip39::Mnemonic::parse_in(
            bip39::Language::English,
            "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about",
        )
        .expect("valid mnemonic");
        let seed_bytes = mnemonic.to_seed_normalized("");
        seed.copy_from_slice(&seed_bytes);
        seed
    }

    #[test]
    fn test_derive_orchard_address() {
        let seed = test_seed();
        let addr =
            derive_address_at_index(&seed, 0, NetworkType::Main).expect("should derive address");
        assert!(addr.starts_with("u1"), "got: {addr}");
        assert!(addr.len() > 50, "got: {addr}");
    }

    #[test]
    fn test_derive_different_indexes() {
        let seed = test_seed();
        let addr0 = derive_address_at_index(&seed, 0, NetworkType::Main).expect("index 0");
        let addr1 = derive_address_at_index(&seed, 1, NetworkType::Main).expect("index 1");
        assert_ne!(
            addr0, addr1,
            "different indexes should give different addresses"
        );
    }

    #[test]
    fn test_derive_is_deterministic() {
        let seed = test_seed();
        let a = derive_address_at_index(&seed, 0, NetworkType::Main).expect("first");
        let b = derive_address_at_index(&seed, 0, NetworkType::Main).expect("second");
        assert_eq!(a, b, "same seed + index should give same address");
    }
}
