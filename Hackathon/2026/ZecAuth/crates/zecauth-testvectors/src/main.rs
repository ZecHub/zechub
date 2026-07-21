//! Cross-implementation test-vector generator + verifier for the ZecAuth RN SDK.
//!
//! Two modes:
//!   (default)        — print a JSON array of vectors on stdout
//!   `verify`         — read {pubkey, signature, message} JSON from stdin, print
//!                      `true`/`false` (lets JS-produced signatures be checked by Rust)
//!
//! Each generated vector pins:
//!   * the wallet `seed`, `network`, `account`, optional `domain`
//!   * `pubkey` from `zecauth-core` AND an independent recomputation (asserted equal)
//!   * derivation intermediates (`derived32`, `wide64`, `sk_le`) for debugging
//!   * a canonical message + a Rust-produced signature over it

use std::io::Read;

use ff::{FromUniformBytes, PrimeField};
use group::GroupEncoding;
use pasta_curves::pallas;
use rand::{RngCore, SeedableRng};
use rand_chacha::ChaCha20Rng;
use serde::{Deserialize, Serialize};
use zecauth_core::{AuthKeyPair, AuthPublicKey, AuthResponse, ChallengeMessage, Network};

/// Same constant as the RN SDK / reddsa.
const BASEPOINT_BYTES: [u8; 32] = [
    99, 201, 117, 184, 132, 114, 26, 141, 12, 161, 112, 123, 227, 12, 127, 12, 95, 68, 95, 62, 124,
    24, 141, 59, 6, 214, 241, 40, 179, 35, 85, 183,
];

#[derive(Serialize)]
struct Vector {
    label: String,
    seed_hex: String,
    network: String,
    account: u32,
    domain: Option<String>,
    pubkey: String,
    derived32: String,
    wide64: String,
    sk_le: String,
    message: String,
    signature: String,
}

#[derive(Deserialize)]
struct VerifyInput {
    pubkey: String,
    signature: String,
    message: String,
}

#[derive(Deserialize)]
struct VerifyResponseInput {
    pubkey: String,
    signature: String,
    message: String,
    domain: String,
    chain: String,
}

fn net(network: &str) -> Network {
    match network {
        "testnet" => Network::Testnet,
        _ => Network::Mainnet,
    }
}

fn coin_type(network: &str) -> u32 {
    if network == "testnet" {
        1
    } else {
        133
    }
}

/// Recompute derivation independently of `zecauth-core`, returning
/// (derived32, wide64, sk_le, pubkey_hex).
fn recompute(
    seed: &[u8],
    network: &str,
    account: u32,
    domain: Option<&str>,
) -> (String, String, String, String) {
    let context = match domain {
        Some(d) => format!("ZcashZecauthAuth:{d}"),
        None => "ZcashZecauthAuth".to_string(),
    };
    let path = [
        zip32::ChildIndex::hardened(616),
        zip32::ChildIndex::hardened(coin_type(network)),
        zip32::ChildIndex::hardened(account),
    ];
    let derived = zip32::arbitrary::SecretKey::from_path(context.as_bytes(), seed, &path);
    let derived32 = *derived.data();

    let mut rng = ChaCha20Rng::from_seed(derived32);
    let mut wide = [0u8; 64];
    rng.fill_bytes(&mut wide);

    let sk = pallas::Scalar::from_uniform_bytes(&wide);
    let sk_le: [u8; 32] = sk.to_repr().as_ref().try_into().unwrap();

    let basepoint = pallas::Point::from_bytes(&BASEPOINT_BYTES).unwrap();
    let vk = basepoint * sk;
    let vk_bytes: [u8; 32] = vk.to_bytes().as_ref().try_into().unwrap();

    (
        hex::encode(derived32),
        hex::encode(wide),
        hex::encode(sk_le),
        hex::encode(vk_bytes),
    )
}

fn keypair(seed: &[u8], network: &str, account: u32, domain: Option<&str>) -> AuthKeyPair {
    match domain {
        Some(d) => AuthKeyPair::from_seed_for_domain(seed, net(network), account, d).unwrap(),
        None => AuthKeyPair::from_seed(seed, net(network), account).unwrap(),
    }
}

/// Build a canonical challenge message with pinned (non-random) fields.
fn pinned_message(domain: &str, network: &str) -> String {
    let mut challenge = ChallengeMessage::new(
        domain,
        &format!("https://{domain}/dashboard"),
        net(network),
    )
    .with_statement("Access your dashboard");
    challenge.nonce = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6".to_string();
    challenge.issued_at = "2026-06-08T12:00:00Z".parse().unwrap();
    challenge.expiration_time = "2026-06-08T12:05:00Z".parse().unwrap();
    challenge.to_string()
}

fn make_vector(
    label: &str,
    seed: &[u8],
    network: &str,
    account: u32,
    domain: Option<&str>,
    message: String,
) -> Vector {
    let kp = keypair(seed, network, account, domain);
    let pubkey = kp.public_key().to_hex();

    let (derived32, wide64, sk_le, pubkey_indep) = recompute(seed, network, account, domain);
    assert_eq!(
        pubkey, pubkey_indep,
        "core and independent derivation disagree for {label}"
    );

    let sig = kp.sign(message.as_bytes());
    // sanity: Rust verifies its own signature
    assert!(kp.public_key().verify(message.as_bytes(), &sig).is_ok());

    Vector {
        label: label.to_string(),
        seed_hex: hex::encode(seed),
        network: network.to_string(),
        account,
        domain: domain.map(String::from),
        pubkey,
        derived32,
        wide64,
        sk_le,
        message,
        signature: hex::encode(sig),
    }
}

fn generate() {
    // A 32-byte incrementing seed (matches the core unit-test seed) and a 64-byte seed.
    let seed32: Vec<u8> = (0u8..32).collect();
    let seed64: Vec<u8> = (0u8..64).collect();

    let mut vectors = Vec::new();

    vectors.push(make_vector(
        "mainnet-acct0-global",
        &seed32,
        "mainnet",
        0,
        None,
        "hello zecauth".to_string(),
    ));
    vectors.push(make_vector(
        "mainnet-acct1-global",
        &seed32,
        "mainnet",
        1,
        None,
        "second account".to_string(),
    ));
    vectors.push(make_vector(
        "testnet-acct0-global",
        &seed32,
        "testnet",
        0,
        None,
        "testnet message".to_string(),
    ));
    vectors.push(make_vector(
        "mainnet-acct0-domain-myapp",
        &seed32,
        "mainnet",
        0,
        Some("myapp.com"),
        pinned_message("myapp.com", "mainnet"),
    ));
    vectors.push(make_vector(
        "mainnet-acct0-domain-localhost",
        &seed32,
        "mainnet",
        0,
        Some("localhost:3000"),
        pinned_message("localhost:3000", "mainnet"),
    ));
    vectors.push(make_vector(
        "seed64-mainnet-acct0-domain-shop",
        &seed64,
        "mainnet",
        0,
        Some("shop.example"),
        pinned_message("shop.example", "mainnet"),
    ));
    vectors.push(make_vector(
        "seed64-testnet-acct3-global",
        &seed64,
        "testnet",
        3,
        None,
        "account three on testnet".to_string(),
    ));

    println!("{}", serde_json::to_string_pretty(&vectors).unwrap());
}

fn verify() {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    let v: VerifyInput = serde_json::from_str(&input).expect("invalid verify input JSON");

    let ok = (|| -> bool {
        let pk = match AuthPublicKey::from_hex(&v.pubkey) {
            Ok(p) => p,
            Err(_) => return false,
        };
        let sig: [u8; 64] = match hex::decode(&v.signature).ok().and_then(|b| b.try_into().ok()) {
            Some(s) => s,
            None => return false,
        };
        pk.verify(v.message.as_bytes(), &sig).is_ok()
    })();

    println!("{ok}");
}

/// Full server-side verification: parse the signed message, check field validity,
/// expiry, domain/chain binding, and the signature — exactly what a dApp server does.
fn verify_response() {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    let v: VerifyResponseInput =
        serde_json::from_str(&input).expect("invalid verify-response input JSON");

    let ok = (|| -> bool {
        let response = match AuthResponse::from_json(
            &serde_json::json!({
                "pubkey": v.pubkey,
                "signature": v.signature,
                "message": v.message,
            })
            .to_string(),
        ) {
            Ok(r) => r,
            Err(_) => return false,
        };
        zecauth_core::verify_response(&response, &v.domain, &v.chain).is_ok()
    })();

    println!("{ok}");
}

fn main() {
    let mode = std::env::args().nth(1).unwrap_or_default();
    match mode.as_str() {
        "verify" => verify(),
        "verify-response" => verify_response(),
        _ => generate(),
    }
}
