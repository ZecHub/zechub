use alloy_primitives::{keccak256, Address};
use k256::elliptic_curve::sec1::ToEncodedPoint;
use std::str::FromStr;

#[derive(Debug, thiserror::Error)]
pub enum DeriveError {
    #[error("BIP32 derivation failed: {0}")]
    Bip32(#[from] bip32::Error),
    #[error("Invalid account: {0}")]
    InvalidAccount(u32),
    #[error("Invalid path: {0}")]
    InvalidPath(String),
    #[error("Invalid public key bytes")]
    InvalidPublicKey,
}

/// Derive an Ethereum address from a BIP39 seed at the given account and
/// address index (BIP44: m/44'/60'/{account}'/0/{index}).
pub fn derive_address(seed: &[u8; 64], account: u32, index: u32) -> Result<Address, DeriveError> {
    let path = format!("m/44'/60'/{account}'/0/{index}");
    let parsed = bip32::DerivationPath::from_str(&path)
        .map_err(|e| DeriveError::InvalidPath(e.to_string()))?;
    let key =
        bip32::ExtendedPrivateKey::<k256::ecdsa::SigningKey>::derive_from_path(*seed, &parsed)?;
    let ext_pubkey = key.public_key();
    let inner = ext_pubkey.public_key();
    let point = inner.to_encoded_point(false);
    let hash = keccak256(&point.as_bytes()[1..]);
    Ok(Address::from_slice(&hash[12..]))
}

/// Derive an Ethereum address using the default account (0) and the given
/// address index.
pub fn derive_address_at_index(seed: &[u8; 64], index: u32) -> Result<Address, DeriveError> {
    derive_address(seed, 0, index)
}

/// Derive an Ethereum address from serialized public key bytes.
/// Accepts uncompressed (65 bytes, starts with 0x04) or compressed (33 bytes)
/// SEC1-encoded public keys.
pub fn derive_from_pubkey(pubkey_bytes: &[u8]) -> Result<Address, DeriveError> {
    let point = k256::PublicKey::from_sec1_bytes(pubkey_bytes)
        .map_err(|_| DeriveError::InvalidPublicKey)?;
    let encoded = point.to_encoded_point(false);
    let hash = keccak256(&encoded.as_bytes()[1..]);
    Ok(Address::from_slice(&hash[12..]))
}

/// Validate that a string is a well-formed Ethereum address.
///
/// Accepts `0x`-prefixed 40-character hex addresses, optionally with
/// mixed-case EIP-55 checksum encoding.
pub fn validate_address(address: &str) -> bool {
    address.parse::<Address>().is_ok()
}

#[cfg(test)]
mod tests {
    use super::*;
    use bip39::Mnemonic;

    const MNEMONIC: &str = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

    fn seed_from_mnemonic() -> [u8; 64] {
        let mnemonic: Mnemonic = MNEMONIC.parse().unwrap();
        mnemonic.to_seed("")
    }

    #[test]
    fn test_derive_ethereum_address() {
        let seed = seed_from_mnemonic();
        let address = derive_address(&seed, 0, 0).unwrap();
        assert_eq!(
            address.to_string(),
            "0x9858EfFD232B4033E47d90003D41EC34EcaEda94",
            "got {address}"
        );
    }

    #[test]
    fn test_derive_different_indexes() {
        let seed = seed_from_mnemonic();
        let a0 = derive_address(&seed, 0, 0).unwrap();
        let a1 = derive_address(&seed, 0, 1).unwrap();
        assert_ne!(a0, a1, "addresses at different indexes must differ");
    }

    #[test]
    fn test_derive_is_deterministic() {
        let seed = seed_from_mnemonic();
        let a = derive_address(&seed, 0, 0).unwrap();
        let b = derive_address(&seed, 0, 0).unwrap();
        assert_eq!(a, b, "derivation must be deterministic");
    }

    #[test]
    fn test_derive_from_pubkey_roundtrip() {
        let seed = seed_from_mnemonic();
        let address = derive_address(&seed, 0, 0).unwrap();

        let path = bip32::DerivationPath::from_str("m/44'/60'/0'/0/0").unwrap();
        let key =
            bip32::ExtendedPrivateKey::<k256::ecdsa::SigningKey>::derive_from_path(seed, &path)
                .unwrap();
        let ext_pubkey = key.public_key();
        let inner = ext_pubkey.public_key();
        let point = inner.to_encoded_point(false);
        let recovered = derive_from_pubkey(point.as_bytes()).unwrap();
        assert_eq!(address, recovered);
    }

    #[test]
    fn test_validate_address() {
        assert!(validate_address(
            "0x9858effd232b4033e47d90003d41ec34ecaeda94"
        ));
        assert!(validate_address(
            "0x9858EfFd232B4033e47d90003D41eC34ecAeda94"
        ));
        assert!(!validate_address("invalid"));
        assert!(!validate_address("0xzzzz"));
    }

    #[test]
    fn test_anvil_test_mnemonic() {
        let mnemonic: Mnemonic = bip39::Mnemonic::parse_in(
            bip39::Language::English,
            "test test test test test test test test test test test junk",
        )
        .unwrap();
        let seed_bytes = mnemonic.to_seed_normalized("");
        let mut seed = [0u8; 64];
        seed.copy_from_slice(&seed_bytes);
        let address = derive_address(&seed, 0, 0).unwrap();
        assert_eq!(
            address.to_string(),
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "got {address}"
        );
    }

    #[test]
    fn test_anvil_bulk_derivation() {
        let mnemonic: Mnemonic = bip39::Mnemonic::parse_in(
            bip39::Language::English,
            "test test test test test test test test test test test junk",
        )
        .unwrap();
        let seed_bytes = mnemonic.to_seed_normalized("");
        let mut seed = [0u8; 64];
        seed.copy_from_slice(&seed_bytes);

        // Anvil/Hardhat default accounts: m/44'/60'/0'/0/{index}
        let expected = [
            (0, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"),
            (1, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"),
            (2, "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"),
            (3, "0x90F79bf6EB2c4f870365E785982E1f101E93b906"),
        ];

        for (index, expected_addr) in expected {
            let address = derive_address(&seed, 0, index).unwrap();
            assert_eq!(address.to_string(), expected_addr, "index {index} mismatch");
        }
    }
}
