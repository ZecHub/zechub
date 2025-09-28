use crate::db::data_generated::fb::KeyPackT;
use crate::key2::split_key;
use anyhow::anyhow;
use base58check::ToBase58Check;
use bip39::{Language, Mnemonic, Seed};
use ripemd::{Digest, Ripemd160};
use secp256k1::{All, PublicKey, Secp256k1, SecretKey};
use sha2::Sha256;
use tiny_hderive::bip32::ExtendedPrivKey;
use zcash_client_backend::encoding::{
    encode_extended_spending_key, encode_payment_address, encode_transparent_address,
};
use zcash_primitives::consensus::{Network, Parameters};
use zcash_primitives::legacy::TransparentAddress;
use zcash_primitives::zip32::{ChildIndex, ExtendedSpendingKey};

pub fn derive_zip32(
    network: &Network,
    phrase: &str,
    account_index: u32,
    external: u32,
    address_index: Option<u32>,
) -> anyhow::Result<KeyPackT> {
    let (phrase, password) = split_key(phrase);
    let mnemonic = Mnemonic::from_phrase(&phrase, Language::English)?;
    let seed = Seed::new(&mnemonic, &password);
    let master = ExtendedSpendingKey::master(seed.as_bytes());
    let mut z_path = vec![
        ChildIndex::Hardened(32),
        ChildIndex::Hardened(network.coin_type()),
        ChildIndex::Hardened(account_index),
    ];
    if let Some(address_index) = address_index {
        z_path.push(ChildIndex::Hardened(address_index));
    }
    let extsk = ExtendedSpendingKey::from_path(&master, &z_path);
    let z_key = encode_extended_spending_key(network.hrp_sapling_extended_spending_key(), &extsk);
    let (_, pa) = extsk.default_address();
    let z_addr = encode_payment_address(network.hrp_sapling_payment_address(), &pa);

    let addr_index = address_index.unwrap_or(0);
    let t_path = format!(
        "m/44'/{}'/{}'/{}/{}",
        network.coin_type(),
        account_index,
        external,
        addr_index
    );
    let ext = ExtendedPrivKey::derive(seed.as_bytes(), &*t_path)
        .map_err(|_| anyhow!("Invalid derivation path"))?;
    let secret_key = SecretKey::from_slice(&ext.secret())?;
    let secp = Secp256k1::<All>::new();
    let pub_key = PublicKey::from_secret_key(&secp, &secret_key);
    let pub_key = pub_key.serialize();
    let pub_key = Ripemd160::digest(&Sha256::digest(&pub_key));
    let t_addr = TransparentAddress::PublicKey(pub_key.into());
    let t_addr = encode_transparent_address(
        &network.b58_pubkey_address_prefix(),
        &network.b58_script_address_prefix(),
        &t_addr,
    );
    let mut sk = secret_key.serialize_secret().to_vec();
    sk.push(0x01);
    let t_key = sk.to_base58check(0x80);

    Ok(KeyPackT {
        z_key: Some(z_key),
        z_addr: Some(z_addr),
        t_key: Some(t_key),
        t_addr: Some(t_addr),
    })
}
