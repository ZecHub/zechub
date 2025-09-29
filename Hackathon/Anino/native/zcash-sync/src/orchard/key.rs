use crate::key2::split_key;
use bip39::{Language, Mnemonic, Seed};
use orchard::keys::{FullViewingKey, Scope, SpendingKey};
use orchard::Address;

pub struct OrchardKeyBytes {
    pub sk: Option<[u8; 32]>,
    pub fvk: [u8; 96],
}

impl OrchardKeyBytes {
    pub fn get_address(&self, index: usize) -> Address {
        let fvk = FullViewingKey::from_bytes(&self.fvk).unwrap();
        let address = fvk.address_at(index, Scope::External);
        address
    }
}

pub fn derive_orchard_keys(coin_type: u32, seed: &str, account_index: u32) -> OrchardKeyBytes {
    let (phrase, password) = split_key(seed);
    let mnemonic = Mnemonic::from_phrase(&phrase, Language::English).unwrap();
    let seed = Seed::new(&mnemonic, &password);
    let sk = SpendingKey::from_zip32_seed(seed.as_bytes(), coin_type, account_index).unwrap();
    let fvk = FullViewingKey::from(&sk);
    OrchardKeyBytes {
        sk: Some(sk.to_bytes().clone()),
        fvk: fvk.to_bytes(),
    }
}
