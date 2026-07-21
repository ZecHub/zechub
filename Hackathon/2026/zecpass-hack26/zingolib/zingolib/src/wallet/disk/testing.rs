//! functionality for testing the save and load functions of `LightWallet`.
//! do not compile testutils feature for production.

use bip0039::Mnemonic;
use zcash_keys::keys::{Era, UnifiedSpendingKey};

use crate::wallet::keys::unified::UnifiedKeyStore;

use super::LightWallet;

/// example wallets
/// including from different versions of the software.
pub mod examples;

/// tests
#[cfg(test)]
pub mod tests;

// test helper functions

/// asserts that a fresh capability generated with the seed matches the extant capability, which also can export the seed
pub async fn assert_wallet_capability_matches_seed(
    wallet: &LightWallet,
    expected_seed_phrase: String,
) {
    let actual_seed_phrase = wallet.mnemonic_phrase().unwrap();
    assert_eq!(expected_seed_phrase, actual_seed_phrase);

    let expected_mnemonic =
        Mnemonic::<bip0039::English>::from_phrase(expected_seed_phrase).unwrap();

    let expected_keys = crate::wallet::keys::unified::UnifiedKeyStore::new_from_mnemonic(
        wallet.chain_type,
        &expected_mnemonic,
        zip32::AccountId::ZERO,
    )
    .unwrap();

    // Compare USK
    let UnifiedKeyStore::Spend(usk) = &wallet
        .unified_key_store
        .get(&zip32::AccountId::ZERO)
        .unwrap()
    else {
        panic!("Expected Unified Spending Key");
    };
    assert_eq!(
        usk.to_bytes(Era::Orchard),
        UnifiedSpendingKey::try_from(&expected_keys)
            .unwrap()
            .to_bytes(Era::Orchard)
    );
}

/// basically does what it says on the tin
pub async fn assert_wallet_capability_contains_n_triple_pool_receivers(
    wallet: &LightWallet,
    expected_num_addresses: usize,
) {
    assert_eq!(wallet.unified_addresses.len(), expected_num_addresses);
    for addr in wallet.unified_addresses.values() {
        assert!(addr.orchard().is_some());
        assert!(addr.sapling().is_some());
        assert!(addr.transparent().is_some());
    }
}
