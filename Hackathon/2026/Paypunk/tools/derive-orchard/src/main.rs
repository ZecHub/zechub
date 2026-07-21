use std::env;

use bech32::encode;
use bech32::hrp::Hrp;
use orchard::keys::{FullViewingKey, Scope, SpendingKey};
use zcash_address::unified::{self, Encoding};
use zcash_protocol::consensus::NetworkType;

const DEFAULT_MNEMONIC: &str = "test test test test test test test test test test test junk";
const DEFAULT_COIN_TYPE: u32 = 133;

fn main() {
    let mnemonic = env::var("MNEMONIC").unwrap_or_else(|_| DEFAULT_MNEMONIC.to_string());
    let mnemonic =
        bip39::Mnemonic::parse_in(bip39::Language::English, &mnemonic).expect("valid mnemonic");
    let seed = mnemonic.to_seed_normalized("");

    let account: u32 = env::var("ACCOUNT")
        .unwrap_or_else(|_| "0".into())
        .parse()
        .expect("valid account number");
    let index: u32 = env::var("INDEX")
        .unwrap_or_else(|_| "0".into())
        .parse()
        .expect("valid diversifier index");
    let coin_type: u32 = env::var("COIN_TYPE")
        .unwrap_or_else(|_| DEFAULT_COIN_TYPE.to_string())
        .parse()
        .expect("valid coin type");

    let account_id = zip32::AccountId::try_from(account).expect("valid account");
    let sk = SpendingKey::from_zip32_seed(&seed, coin_type, account_id).expect("ZIP-32 derivation");
    let fvk = FullViewingKey::from(&sk);

    // Orchard UA at the given diversifier index (regtest encoding)
    let address = fvk.address_at(index, Scope::External);
    let raw = address.to_raw_address_bytes();
    let ua =
        unified::Address::try_from_items(vec![unified::Receiver::Orchard(raw)]).expect("valid UA");
    let ua_str = ua.encode(&NetworkType::Regtest);

    // Raw Orchard spending key (32 bytes)
    let sk_bytes = sk.to_bytes();

    // Bech32-encoded Orchard spending key for reference
    let sk_hrp =
        env::var("ORCHARD_SK_HRP").unwrap_or_else(|_| "secret-orchard-regtest".to_string());
    let hrp = Hrp::parse(&sk_hrp).expect("valid bech32 HRP");
    let sk_bech32 = encode::<bech32::Bech32>(hrp, &sk_bytes[..]).expect("bech32 encoding");

    // Also output raw hex for reference
    let sk_hex = hex::encode(sk_bytes);

    // Output JSON
    let output = serde_json::json!({
        "ua": ua_str,
        "orchard_spending_key": sk_bech32,
        "orchard_spending_key_hex": sk_hex,
        "account": account,
        "index": index,
        "coin_type": coin_type,
    });
    println!(
        "{}",
        serde_json::to_string_pretty(&output).expect("valid JSON")
    );
}
