use crate::coinconfig::CoinConfig;
use anyhow::anyhow;
use bech32::{FromBase32, ToBase32};
use bip39::{Language, Mnemonic, Seed};
use zcash_client_backend::address::RecipientAddress;
use zcash_client_backend::encoding::{
    decode_extended_full_viewing_key, decode_extended_spending_key, decode_transparent_address,
    encode_extended_full_viewing_key, encode_extended_spending_key, encode_payment_address,
    encode_transparent_address,
};
use zcash_client_backend::keys::UnifiedFullViewingKey;
use zcash_primitives::consensus::{Network, Parameters};
use zcash_primitives::legacy::TransparentAddress;
use zcash_primitives::zip32::{ChildIndex, ExtendedFullViewingKey, ExtendedSpendingKey};

pub fn split_key(key: &str) -> (String, String) {
    let words: Vec<_> = key.split_whitespace().collect();
    let len = words.len();
    let (phrase, password) = if len % 3 == 1 {
        // extra word
        let phrase = words[0..len - 1].join(" ");
        let password = words[len - 1].to_string();
        (phrase, password)
    } else {
        (key.to_string(), String::new())
    };
    (phrase, password)
}

pub fn decode_key(
    coin: u8,
    key: &str,
    index: u32,
) -> anyhow::Result<(
    Option<String>,
    Option<String>,
    String,
    String,
    Option<orchard::keys::FullViewingKey>,
)> {
    let c = CoinConfig::get(coin);
    let network = c.chain.network();
    let (phrase, password) = split_key(key);
    let res = if let Ok(mnemonic) = Mnemonic::from_phrase(&phrase, Language::English) {
        let (sk, ivk, pa) = derive_secret_key(network, &mnemonic, &password, index)?;
        Ok((Some(key.to_string()), Some(sk), ivk, pa, None))
    } else if let Ok(sk) =
        decode_extended_spending_key(network.hrp_sapling_extended_spending_key(), key)
    {
        let (ivk, pa) = derive_viewing_key(network, &sk)?;
        Ok((None, Some(key.to_string()), ivk, pa, None))
    } else if let Ok(fvk) =
        decode_extended_full_viewing_key(network.hrp_sapling_extended_full_viewing_key(), key)
    {
        let pa = derive_address(network, &fvk)?;
        Ok((None, None, key.to_string(), pa, None))
    } else if let Ok(ufvk) = UnifiedFullViewingKey::decode(network, key) {
        let sapling_dfvk = ufvk
            .sapling()
            .ok_or(anyhow!("UFVK must contain a sapling key"))?;
        let sapling_efvk =
            ExtendedFullViewingKey::from_diversifiable_full_viewing_key(&sapling_dfvk);
        let key = encode_extended_full_viewing_key(
            network.hrp_sapling_extended_full_viewing_key(),
            &sapling_efvk,
        );
        let pa = derive_address(network, &sapling_efvk)?;
        let orchard_key = ufvk.orchard().cloned();
        Ok((None, None, key, pa, orchard_key))
    } else {
        Err(anyhow::anyhow!("Not a valid key"))
    };
    res
}

#[allow(dead_code)] // Used by C FFI
pub fn is_valid_seed(coin: u8, key: &str) -> bool {
    let c = CoinConfig::get(coin);
    let (phrase, _password) = split_key(key);
    if Mnemonic::from_phrase(&phrase, Language::English).is_ok() {
        return true;
    }
    false
}

#[allow(dead_code)] // Used by C FFI
pub fn is_valid_key(coin: u8, key: &str) -> i8 {
    let c = CoinConfig::get(coin);
    let network = c.chain.network();
    let (phrase, _password) = split_key(key);
    if Mnemonic::from_phrase(&phrase, Language::English).is_ok() {
        return 0;
    }
    if decode_extended_spending_key(network.hrp_sapling_extended_spending_key(), key).is_ok() {
        return 1;
    }
    if decode_extended_full_viewing_key(network.hrp_sapling_extended_full_viewing_key(), key)
        .is_ok()
    {
        return 2;
    }
    if UnifiedFullViewingKey::decode(network, key).is_ok() {
        return 3;
    }
    // TODO: Accept UA viewing key
    -1
}

pub fn decode_address(coin: u8, address: &str) -> Option<RecipientAddress> {
    let c = CoinConfig::get(coin);
    let network = c.chain.network();
    RecipientAddress::decode(network, address)
}

fn derive_secret_key(
    network: &Network,
    mnemonic: &Mnemonic,
    password: &str,
    index: u32,
) -> anyhow::Result<(String, String, String)> {
    let seed = Seed::new(mnemonic, password);
    let master = ExtendedSpendingKey::master(seed.as_bytes());
    let path = [
        ChildIndex::Hardened(32),
        ChildIndex::Hardened(network.coin_type()),
        ChildIndex::Hardened(index),
    ];
    let extsk = ExtendedSpendingKey::from_path(&master, &path);
    let sk = encode_extended_spending_key(network.hrp_sapling_extended_spending_key(), &extsk);

    let (fvk, pa) = derive_viewing_key(network, &extsk)?;
    Ok((sk, fvk, pa))
}

fn derive_viewing_key(
    network: &Network,
    extsk: &ExtendedSpendingKey,
) -> anyhow::Result<(String, String)> {
    let fvk = extsk.to_extended_full_viewing_key();
    let pa = derive_address(network, &fvk)?;
    let fvk =
        encode_extended_full_viewing_key(network.hrp_sapling_extended_full_viewing_key(), &fvk);
    Ok((fvk, pa))
}

fn derive_address(network: &Network, fvk: &ExtendedFullViewingKey) -> anyhow::Result<String> {
    let (_, payment_address) = fvk.default_address();
    let address = encode_payment_address(network.hrp_sapling_payment_address(), &payment_address);
    Ok(address)
}

#[allow(dead_code)]
pub fn convert_t2_address(
    network: &Network,
    address: &str,
    prefix: &str,
    from: bool,
) -> anyhow::Result<String> {
    let converted_address = if from {
        let (p, b, _v) = bech32::decode(address)?;
        if p != prefix {
            anyhow::bail!("Invalid prefix");
        }
        let pkh = Vec::<u8>::from_base32(&b)?;
        let taddr = TransparentAddress::PublicKey(pkh.try_into().unwrap());
        encode_transparent_address(
            &network.b58_pubkey_address_prefix(),
            &network.b58_script_address_prefix(),
            &taddr,
        )
    } else {
        let taddr = decode_transparent_address(
            &network.b58_pubkey_address_prefix(),
            &network.b58_script_address_prefix(),
            address,
        )?
        .ok_or(anyhow::anyhow!("Not a transparent address"))?;
        let TransparentAddress::PublicKey(pkh) = taddr else {
            anyhow::bail!("Not a public key hash address");
        };
        bech32::encode(prefix, pkh.to_base32(), bech32::Variant::Bech32m)?
    };
    Ok(converted_address)
}
