use anyhow::Context;
use bip39::Mnemonic;
use orchard::{
    keys::{FullViewingKey, IncomingViewingKey},
    Address,
};
use tracing::info;
use zcash_address::{
    unified::{self, Encoding},
    ToAddress, ZcashAddress,
};
use zcash_keys::{
    address::UnifiedAddress,
    keys::{ReceiverRequirement, ReceiverRequirements, UnifiedFullViewingKey, UnifiedSpendingKey},
};
use zcash_primitives::{
    consensus::{MainNetwork, NetworkType, TestNetwork},
    zip32::AccountId,
};

#[derive(Debug)]
pub struct Wallet {
    mnemonic: Mnemonic,
    network: TestNetwork,
    usk: UnifiedSpendingKey,
    ufvk: UnifiedFullViewingKey,
    orchard_fvk: FullViewingKey,
    unified_addr: UnifiedAddress,
    payment_addr: String
}

impl Default for Wallet {
    fn default() -> Self {
        Self::new()
    }
}

impl Wallet {
    /// Generates a mnemonic and creates a wallet
    pub fn new() -> Self {
        info!("Creating new wallet..");
        let mnemonic = Mnemonic::generate(24).unwrap();

        let word_vec: Vec<String> = mnemonic.words().map(|w| w.to_string()).collect();
        info!("Mnemonic created: {}", word_vec.join(", "));

        let seed = mnemonic.to_seed("");

        let usk = UnifiedSpendingKey::from_seed(&TestNetwork, &seed, AccountId::ZERO).unwrap();
        let ufvk = usk.to_unified_full_viewing_key();
        let orchard_fvk = ufvk.orchard().unwrap().clone();

        let reqs = ReceiverRequirements::new(
            ReceiverRequirement::Require,
            ReceiverRequirement::Require,
            ReceiverRequirement::Omit,
        )
        .unwrap();

        let (unified_addr, _) = ufvk
            .default_address(zcash_keys::keys::UnifiedAddressRequest::Custom(reqs))
            .unwrap();

        let mut receivers: Vec<unified::Receiver> = vec![];
        if let Some(oaddr) = unified_addr.orchard() {
            receivers.push(unified::Receiver::Orchard(oaddr.to_raw_address_bytes()));
        }

        for (typecode, data) in unified_addr.unknown() {
            receivers.push(unified::Receiver::Unknown {
                typecode: *typecode,
                data: data.clone(),
            });
        }

        let unified_parsed = unified::Address::try_from_items(receivers)
            .context("Expected unified address to be created from receivers")
            .unwrap();

        let zaddr = ZcashAddress::from_unified(NetworkType::Main, unified_parsed);
        let addr = zaddr.encode();

        info!("Wallet created with unified address {:?}", addr);

        Self {
            mnemonic,
            network: TestNetwork,
            usk,
            ufvk,
            orchard_fvk,
            unified_addr,
            payment_addr: addr
        }
    }

    /// Creates a wallet from an existing mnemonic
    pub fn from_mnemonic(words: String) -> Self {
        info!("Creating new wallet from mnemonic: {}", words);
        let mnemonic = Mnemonic::parse(words).unwrap();
        let seed = mnemonic.to_seed("");

        let usk = UnifiedSpendingKey::from_seed(&TestNetwork, &seed, AccountId::ZERO).unwrap();
        let ufvk = usk.to_unified_full_viewing_key();
        let orchard_fvk = ufvk.orchard().unwrap().clone();

        let reqs = ReceiverRequirements::new(
            ReceiverRequirement::Require,
            ReceiverRequirement::Require,
            ReceiverRequirement::Omit,
        )
        .unwrap();
        let (unified_addr, _) = ufvk
            .default_address(zcash_keys::keys::UnifiedAddressRequest::Custom(reqs))
            .unwrap();

        let mut receivers: Vec<unified::Receiver> = vec![];
        if let Some(oaddr) = unified_addr.orchard() {
            receivers.push(unified::Receiver::Orchard(oaddr.to_raw_address_bytes()));
        }

        for (typecode, data) in unified_addr.unknown() {
            receivers.push(unified::Receiver::Unknown {
                typecode: *typecode,
                data: data.clone(),
            });
        }

        let unified_parsed = unified::Address::try_from_items(receivers)
            .context("Expected new unified address from receivers")
            .unwrap();

        let zaddr = ZcashAddress::from_unified(NetworkType::Test, unified_parsed);
        let addr = zaddr.encode();

        info!("Generated wallet with unified address {:?}", addr);

        Self {
            mnemonic,
            network: TestNetwork,
            usk,
            ufvk,
            orchard_fvk,
            unified_addr,
            payment_addr: addr
        }
    }

    /// Returns the orchard incoming viewing key
    pub fn orchard_ivk(&self) -> IncomingViewingKey {
        self.orchard_fvk.to_ivk(orchard::keys::Scope::External)
    }

    /// Returns the orchard address for the zcash wallet
    pub fn z_addr_orchard(&self) -> &String {
        &self.payment_addr
    }
}
