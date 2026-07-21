use orchard::Address;
use zcash_address::unified;
use zcash_address::unified::Encoding;
use zcash_address::{ToAddress, ZcashAddress};
use zcash_protocol::consensus::NetworkType;

pub const ZCASH_COIN_TYPE: u32 = 133;

/// Extract the account index from a BIP44 derivation path.
/// Path format: "m/44'/133'/{account}'"
pub fn account_from_path(path: &str) -> Result<u32, String> {
    let account_str = path
        .rsplit('\'')
        .nth(1)
        .and_then(|s| s.split('/').last())
        .ok_or_else(|| format!("invalid derivation path: {path}"))?;
    account_str
        .parse()
        .map_err(|_| format!("invalid account index in path: {path}"))
}

/// Decode a raw Orchard address ([u8; 43]) to a human-readable unified address.
pub fn decode_orchard_recipient(raw: &[u8; 43], net: NetworkType) -> Option<String> {
    let orchard_addr = Address::from_raw_address_bytes(raw).into_option()?;
    let raw = orchard_addr.to_raw_address_bytes();
    let ua = unified::Address::try_from_items(vec![unified::Receiver::Orchard(raw)]).ok()?;
    let zaddr = ZcashAddress::from_unified(net, ua);
    Some(zaddr.encode())
}
