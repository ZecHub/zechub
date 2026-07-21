use serde::Serialize;
use wasm_bindgen::prelude::wasm_bindgen;
use zcash_address::unified::{Container, Encoding, Fvk, Ufvk};
use zcash_protocol::consensus::NetworkType as Network;

#[derive(Serialize, PartialEq, Debug)]
#[serde(rename_all = "camelCase", tag = "kind")]
pub enum Inspection {
    SpendingKey,
    NotUnified,
    Malformed {
        detail: String,
    },
    WrongNetwork {
        network: String,
    },
    Valid {
        orchard: bool,
        sapling: bool,
        transparent: bool,
    },
}

const SPENDING_KEY_PREFIXES: &[&str] = &[
    "secret-extended-key",
    "zxviews",
    "uskmain",
    "usktest",
    "uskregtest",
];

pub fn inspect(raw: &str) -> Inspection {
    let key = raw.trim().to_lowercase();

    if SPENDING_KEY_PREFIXES
        .iter()
        .any(|prefix| key.starts_with(prefix))
    {
        return Inspection::SpendingKey;
    }

    if !key.starts_with("uview") {
        return Inspection::NotUnified;
    }

    match Ufvk::decode(&key) {
        Ok((Network::Main, ufvk)) => {
            let items = ufvk.items();
            Inspection::Valid {
                orchard: items.iter().any(|i| matches!(i, Fvk::Orchard(_))),
                sapling: items.iter().any(|i| matches!(i, Fvk::Sapling(_))),
                transparent: items.iter().any(|i| matches!(i, Fvk::P2pkh(_))),
            }
        }
        Ok((network, _)) => Inspection::WrongNetwork {
            network: match network {
                Network::Test => "testnet".into(),
                Network::Regtest => "regtest".into(),
                Network::Main => unreachable!(),
            },
        },
        Err(e) => Inspection::Malformed {
            detail: e.to_string(),
        },
    }
}

#[wasm_bindgen]
pub fn inspect_key(raw: &str) -> String {
    serde_json::to_string(&inspect(raw)).unwrap_or_else(|_| r#"{"kind":"malformed"}"#.into())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn encode(items: Vec<Fvk>, network: Network) -> String {
        Ufvk::try_from_items(items).unwrap().encode(&network)
    }

    #[test]
    fn a_full_mainnet_key_reports_every_pool_it_carries() {
        let key = encode(
            vec![
                Fvk::Orchard([7u8; 96]),
                Fvk::Sapling([9u8; 128]),
                Fvk::P2pkh([3u8; 65]),
            ],
            Network::Main,
        );
        assert_eq!(
            inspect(&key),
            Inspection::Valid {
                orchard: true,
                sapling: true,
                transparent: true
            }
        );
    }

    #[test]
    fn an_orchard_blind_key_is_reported_before_any_scan_happens() {
        let key = encode(vec![Fvk::Sapling([9u8; 128])], Network::Main);
        assert_eq!(
            inspect(&key),
            Inspection::Valid {
                orchard: false,
                sapling: true,
                transparent: false
            }
        );
    }

    #[test]
    fn a_single_flipped_character_is_caught_cryptographically() {
        let mut key = encode(vec![Fvk::Orchard([7u8; 96])], Network::Main);
        let flip = key.pop().map(|c| if c == 'q' { 'p' } else { 'q' }).unwrap();
        key.push(flip);
        assert!(matches!(inspect(&key), Inspection::Malformed { .. }));
    }

    #[test]
    fn a_testnet_key_is_named_not_just_rejected() {
        let key = encode(vec![Fvk::Orchard([7u8; 96])], Network::Test);
        assert_eq!(
            inspect(&key),
            Inspection::WrongNetwork {
                network: "testnet".into()
            }
        );
    }

    #[test]
    fn spending_keys_never_reach_the_parser() {
        assert_eq!(inspect("uskmain1abc"), Inspection::SpendingKey);
        assert_eq!(
            inspect("SECRET-EXTENDED-KEY-MAIN1ABC"),
            Inspection::SpendingKey
        );
        assert_eq!(inspect("zxviews1abc"), Inspection::SpendingKey);
    }

    #[test]
    fn garbage_is_not_unified() {
        assert_eq!(inspect("hello"), Inspection::NotUnified);
        assert_eq!(
            inspect("t1LHXjoWpjhYk1r1b7DT3E3h64pdg8hA8Ha"),
            Inspection::NotUnified
        );
    }

    #[test]
    fn wasm_boundary_emits_json() {
        let key = encode(vec![Fvk::Orchard([7u8; 96])], Network::Main);
        let json = inspect_key(&key);
        assert!(json.contains(r#""kind":"valid""#));
        assert!(json.contains(r#""orchard":true"#));
    }
}
