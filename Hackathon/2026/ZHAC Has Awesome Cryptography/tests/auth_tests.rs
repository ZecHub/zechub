use zhac::auth::{AuthChallenge, AuthToken, NonceCache};
use zhac::keys::ZhacKeyPair;

fn make_keypair() -> (zhac::keys::ZhacPrivateKey, zhac::keys::ZhacPublicKey) {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    (kp.private_key, kp.public_key)
}

const VALID_HASH: &str = "0000000000000000000000000000000000000000000000000000000000000000";

// ── NonceCache ──────────────────────────────────────────────────────────────

#[test]
fn nonce_cache_new_is_empty() {
    let mut cache = NonceCache::new();
    let nonce = [0x42u8; 32];
    assert!(cache.check_and_insert(&nonce));
}

#[test]
fn nonce_cache_detects_replay() {
    let mut cache = NonceCache::new();
    let nonce = [0x42u8; 32];
    assert!(cache.check_and_insert(&nonce), "first use should be accepted");
    assert!(!cache.check_and_insert(&nonce), "second use should be rejected");
}

#[test]
fn nonce_cache_different_nonces_accepted() {
    let mut cache = NonceCache::new();
    let n1 = [1u8; 32];
    let n2 = [2u8; 32];
    assert!(cache.check_and_insert(&n1));
    assert!(cache.check_and_insert(&n2));
}

#[test]
fn nonce_cache_clear() {
    let mut cache = NonceCache::new();
    let nonce = [0x42u8; 32];
    cache.check_and_insert(&nonce);
    cache.clear();
    assert!(cache.check_and_insert(&nonce), "after clear, nonce should be accepted again");
}

// ── AuthChallenge ───────────────────────────────────────────────────────────

#[test]
fn challenge_create_mock() {
    let c = AuthChallenge::create_mock(1_000_000, VALID_HASH);
    assert_eq!(c.block_height, 1_000_000);
    assert_eq!(c.best_block_hash, VALID_HASH);
    assert!(c.timestamp > 0);
}

#[test]
fn challenge_nonces_are_unique() {
    let c1 = AuthChallenge::create_mock(100, VALID_HASH);
    let c2 = AuthChallenge::create_mock(100, VALID_HASH);
    assert_ne!(c1.nonce, c2.nonce);
}

#[test]
fn challenge_signing_bytes_deterministic() {
    let c1 = AuthChallenge::create_mock(123456, VALID_HASH);
    let c2 = AuthChallenge {
        nonce: c1.nonce,
        block_height: c1.block_height,
        best_block_hash: c1.best_block_hash.clone(),
        timestamp: c1.timestamp,
    };
    assert_eq!(c1.to_signing_bytes().unwrap(), c2.to_signing_bytes().unwrap());
}

#[test]
fn challenge_signing_bytes_format() {
    let c = AuthChallenge::create_mock(42, VALID_HASH);
    let bytes = c.to_signing_bytes().unwrap();
    assert_eq!(bytes.len(), 32 + 8 + 32 + 8);
}

#[test]
fn challenge_rejects_short_hash() {
    let c = AuthChallenge::create_mock(42, "deadbeef");
    assert!(c.to_signing_bytes().is_err());
}

#[test]
fn challenge_rejects_long_hash() {
    let c = AuthChallenge::create_mock(42, &"ab".repeat(33));
    assert!(c.to_signing_bytes().is_err());
}

#[test]
fn challenge_rejects_invalid_hex_hash() {
    let c = AuthChallenge::create_mock(42, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    assert!(c.to_signing_bytes().is_err());
}

#[test]
fn challenge_signing_bytes_content() {
    let c = AuthChallenge::create_mock(42, &"ab".repeat(32));
    let bytes = c.to_signing_bytes().unwrap();
    assert_eq!(&bytes[..32], &c.nonce);
    assert_eq!(&bytes[32..40], &42u64.to_le_bytes());
    let hash_bytes = hex::decode("ab".repeat(32)).unwrap();
    assert_eq!(&bytes[40..72], &hash_bytes[..]);
    assert_eq!(&bytes[72..80], &c.timestamp.to_le_bytes());
}

// ── AuthToken ───────────────────────────────────────────────────────────────

#[test]
fn token_create_and_verify_signature() {
    let (sk, _pk) = make_keypair();
    let challenge = AuthChallenge::create_mock(1_000_000, VALID_HASH);
    let token = AuthToken::create(challenge, &sk).unwrap();
    assert!(token.verify_signature_only().unwrap());
}

#[test]
fn token_wrong_key_fails() {
    let (sk1, _) = make_keypair();
    let (_, pk2) = make_keypair();
    let challenge = AuthChallenge::create_mock(1_000_000, VALID_HASH);
    let token = AuthToken::create_with_pubkey(challenge, &sk1, &pk2).unwrap();
    assert!(!token.verify_signature_only().unwrap());
}

#[test]
fn token_tampered_challenge_fails() {
    let (sk, pk) = make_keypair();
    let challenge = AuthChallenge::create_mock(1_000_000, VALID_HASH);
    let mut token = AuthToken::create_with_pubkey(challenge, &sk, &pk).unwrap();
    token.challenge.block_height = 999_999;
    assert!(!token.verify_signature_only().unwrap());
}

#[test]
fn token_tampered_timestamp_fails() {
    let (sk, pk) = make_keypair();
    let challenge = AuthChallenge::create_mock(1_000_000, VALID_HASH);
    let mut token = AuthToken::create_with_pubkey(challenge, &sk, &pk).unwrap();
    token.challenge.timestamp += 1;
    assert!(!token.verify_signature_only().unwrap());
}

#[test]
fn token_tampered_nonce_fails() {
    let (sk, pk) = make_keypair();
    let challenge = AuthChallenge::create_mock(1_000_000, VALID_HASH);
    let mut token = AuthToken::create_with_pubkey(challenge, &sk, &pk).unwrap();
    token.challenge.nonce[0] ^= 1;
    assert!(!token.verify_signature_only().unwrap());
}

#[test]
fn token_json_roundtrip() {
    let (sk, pk) = make_keypair();
    let challenge = AuthChallenge::create_mock(2_000_000, VALID_HASH);
    let token = AuthToken::create_with_pubkey(challenge, &sk, &pk).unwrap();
    let json = token.to_json().unwrap();
    let recovered = AuthToken::from_json(&json).unwrap();
    assert!(recovered.verify_signature_only().unwrap());
}

#[test]
fn token_from_json_malformed_fails() {
    assert!(AuthToken::from_json("not json").is_err());
    assert!(AuthToken::from_json("{}").is_err());
}

#[test]
fn token_create_with_pubkey_uses_specified_pubkey() {
    let (sk, _) = make_keypair();
    let (_, pk) = make_keypair();
    let challenge = AuthChallenge::create_mock(100, VALID_HASH);
    let token = AuthToken::create_with_pubkey(challenge, &sk, &pk).unwrap();
    assert_eq!(token.public_key, pk.to_zhac_address());
}

#[test]
fn token_signature_is_65_bytes() {
    let (sk, pk) = make_keypair();
    let challenge = AuthChallenge::create_mock(100, VALID_HASH);
    let token = AuthToken::create_with_pubkey(challenge, &sk, &pk).unwrap();
    assert_eq!(token.signature.len(), 65);
}

#[test]
fn token_expired_timestamp_still_verifies_signature_only() {
    let (sk, pk) = make_keypair();
    let mut challenge = AuthChallenge::create_mock(100, VALID_HASH);
    challenge.timestamp = 1;
    let token = AuthToken::create_with_pubkey(challenge, &sk, &pk).unwrap();
    assert!(token.verify_signature_only().unwrap(), "signature-only doesn't check timestamp");
}
