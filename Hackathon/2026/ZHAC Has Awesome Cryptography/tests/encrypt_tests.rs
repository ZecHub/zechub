use zhac::encrypt;
use zhac::keys::{ZhacKeySeed, ZhacPrivateKey};
use ff::Field;
use group::GroupEncoding;

fn make_keypair() -> (ZhacPrivateKey, zhac::keys::ZhacPublicKey) {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let pk = sk.to_public_key(&[0x42u8; 11]).unwrap();
    (sk, pk)
}

// ── random_fr ───────────────────────────────────────────────────────────────

#[test]
fn random_fr_is_unique() {
    let a = encrypt::random_fr();
    let b = encrypt::random_fr();
    assert_ne!(a, b);
}

#[test]
fn random_fr_nonzero() {
    let a = encrypt::random_fr();
    assert!(!bool::from(a.is_zero()));
}

// ── encrypt / decrypt ───────────────────────────────────────────────────────

#[test]
fn encrypt_decrypt_roundtrip() {
    let (sk, pk) = make_keypair();
    let plaintext = b"Attack at dawn -- ZHAC confidential";
    let ct = encrypt::encrypt(plaintext, &pk).unwrap();
    let decrypted = encrypt::decrypt(&ct, &sk).unwrap();
    assert_eq!(plaintext, decrypted.as_slice());
}

#[test]
fn encrypt_empty_plaintext() {
    let (sk, pk) = make_keypair();
    let ct = encrypt::encrypt(b"", &pk).unwrap();
    let decrypted = encrypt::decrypt(&ct, &sk).unwrap();
    assert!(decrypted.is_empty());
}

#[test]
fn encrypt_large_plaintext() {
    let (sk, pk) = make_keypair();
    let plaintext = vec![0xABu8; 100_000];
    let ct = encrypt::encrypt(&plaintext, &pk).unwrap();
    let decrypted = encrypt::decrypt(&ct, &sk).unwrap();
    assert_eq!(plaintext, decrypted);
}

#[test]
fn wrong_recipient_fails() {
    let (_, pk_a) = make_keypair();
    let seed_b = ZhacKeySeed::generate();
    let priv_b = ZhacPrivateKey::from_seed(&seed_b);
    let ct = encrypt::encrypt(b"secret", &pk_a).unwrap();
    assert!(encrypt::decrypt(&ct, &priv_b).is_err());
}

#[test]
fn tampered_ciphertext_fails() {
    let (sk, pk) = make_keypair();
    let mut ct = encrypt::encrypt(b"tamper me", &pk).unwrap();
    ct.data[0] ^= 1;
    assert!(encrypt::decrypt(&ct, &sk).is_err());
}

#[test]
fn tampered_ephemeral_key_fails() {
    let (sk, pk) = make_keypair();
    let mut ct = encrypt::encrypt(b"test", &pk).unwrap();
    ct.ephemeral_key[0] ^= 0xFF;
    assert!(encrypt::decrypt(&ct, &sk).is_err());
}

#[test]
fn tampered_nonce_fails() {
    let (sk, pk) = make_keypair();
    let mut ct = encrypt::encrypt(b"test", &pk).unwrap();
    ct.nonce[0] ^= 1;
    assert!(encrypt::decrypt(&ct, &sk).is_err());
}

#[test]
fn diversifier_in_ciphertext() {
    let (_sk, pk) = make_keypair();
    let ct = encrypt::encrypt(b"test", &pk).unwrap();
    assert_eq!(ct.d, pk.d);
}

#[test]
fn ciphertext_ephemeral_key_is_valid() {
    let (_, pk) = make_keypair();
    let ct = encrypt::encrypt(b"test", &pk).unwrap();
    let epk = jubjub::SubgroupPoint::from_bytes(&ct.ephemeral_key);
    assert!(epk.into_option().is_some());
}

// ── viewing key decryption ──────────────────────────────────────────────────

#[test]
fn viewing_key_decrypts() {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let pk = sk.to_public_key(&[0x42u8; 11]).unwrap();
    let vk = sk.to_viewing_key(&pk.d).unwrap();
    let plaintext = b"viewing key test";
    let ct = encrypt::encrypt(plaintext, &pk).unwrap();
    let decrypted = encrypt::decrypt_with_viewing_key(&ct, &vk).unwrap();
    assert_eq!(plaintext, decrypted.as_slice());
}

#[test]
fn viewing_key_wrong_key_fails() {
    let seed_a = ZhacKeySeed::generate();
    let seed_b = ZhacKeySeed::generate();
    let priv_a = ZhacPrivateKey::from_seed(&seed_a);
    let priv_b = ZhacPrivateKey::from_seed(&seed_b);
    let pub_a = priv_a.to_public_key(&[1u8; 11]).unwrap();
    let pub_b = priv_b.to_public_key(&[2u8; 11]).unwrap();
    let vk_b = priv_b.to_viewing_key(&pub_b.d).unwrap();
    let ct = encrypt::encrypt(b"secret", &pub_a).unwrap();
    assert!(encrypt::decrypt_with_viewing_key(&ct, &vk_b).is_err());
}

// ── multi-recipient ─────────────────────────────────────────────────────────

#[test]
fn multi_encrypt_decrypt_roundtrip() {
    let (sk_a, pk_a) = make_keypair();
    let (sk_b, pk_b) = make_keypair();
    let plaintext = b"multi-recipient secret";
    let ct = encrypt::encrypt_multi(plaintext, &[pk_a, pk_b]).unwrap();
    assert_eq!(ct.headers.len(), 2);
    let dec_a = encrypt::decrypt_multi(&ct, &sk_a).unwrap();
    assert_eq!(plaintext, dec_a.as_slice());
    let dec_b = encrypt::decrypt_multi(&ct, &sk_b).unwrap();
    assert_eq!(plaintext, dec_b.as_slice());
}

#[test]
fn multi_encrypt_wrong_recipient_fails() {
    let (_sk_a, pk_a) = make_keypair();
    let seed_c = ZhacKeySeed::generate();
    let sk_c = ZhacPrivateKey::from_seed(&seed_c);
    let ct = encrypt::encrypt_multi(b"secret", &[pk_a]).unwrap();
    assert!(encrypt::decrypt_multi(&ct, &sk_c).is_err());
}

#[test]
fn multi_encrypt_empty_recipients_fails() {
    assert!(encrypt::encrypt_multi(b"test", &[]).is_err());
}

#[test]
fn multi_encrypt_too_many_recipients_fails() {
    let (_, pk) = make_keypair();
    let pks = vec![pk; 256];
    assert!(encrypt::encrypt_multi(b"test", &pks).is_err());
}

#[test]
fn multi_encrypt_single_recipient() {
    let (sk, pk) = make_keypair();
    let plaintext = b"single via multi";
    let ct = encrypt::encrypt_multi(plaintext, &[pk]).unwrap();
    assert_eq!(ct.headers.len(), 1);
    let dec = encrypt::decrypt_multi(&ct, &sk).unwrap();
    assert_eq!(plaintext, dec.as_slice());
}

#[test]
fn multi_encrypt_viewing_key_decrypts() {
    let seed_a = ZhacKeySeed::generate();
    let sk_a = ZhacPrivateKey::from_seed(&seed_a);
    let pk_a = sk_a.to_public_key(&[1u8; 11]).unwrap();
    let (_, pk_b) = make_keypair();
    let vk_a = sk_a.to_viewing_key(&pk_a.d).unwrap();
    let plaintext = b"multi viewing key test";
    let ct = encrypt::encrypt_multi(plaintext, &[pk_a, pk_b]).unwrap();
    let dec = encrypt::decrypt_multi_with_viewing_key(&ct, &vk_a).unwrap();
    assert_eq!(plaintext, dec.as_slice());
}

#[test]
fn multi_encrypt_serialization_roundtrip() {
    let (sk_a, pk_a) = make_keypair();
    let (_sk_b, pk_b) = make_keypair();
    let plaintext = b"serialization test";
    let ct = encrypt::encrypt_multi(plaintext, &[pk_a, pk_b]).unwrap();
    let bytes = ct.to_bytes();
    let recovered = zhac::keys::ZhacMultiCiphertext::from_bytes(&bytes).unwrap();
    let dec_a = encrypt::decrypt_multi(&recovered, &sk_a).unwrap();
    assert_eq!(plaintext, dec_a.as_slice());
}

#[test]
fn multi_encrypt_empty_plaintext() {
    let (sk, pk) = make_keypair();
    let ct = encrypt::encrypt_multi(b"", &[pk]).unwrap();
    let dec = encrypt::decrypt_multi(&ct, &sk).unwrap();
    assert!(dec.is_empty());
}

#[test]
fn multi_encrypt_each_recipient_has_independent_ephemeral_key() {
    let (_, pk_a) = make_keypair();
    let (_, pk_b) = make_keypair();
    let ct = encrypt::encrypt_multi(b"test", &[pk_a, pk_b]).unwrap();
    assert_ne!(ct.headers[0].ephemeral_key, ct.headers[1].ephemeral_key);
}

#[test]
fn multi_encrypt_each_recipient_has_independent_nonce() {
    let (_, pk_a) = make_keypair();
    let (_, pk_b) = make_keypair();
    let ct = encrypt::encrypt_multi(b"test", &[pk_a, pk_b]).unwrap();
    assert_ne!(ct.headers[0].nonce, ct.headers[1].nonce);
}

// ── derive_key ──────────────────────────────────────────────────────────────

#[test]
fn derive_key_different_info_prefixes_differ() {
    let (_, pk) = make_keypair();
    let ss = pk.pk_d; // Use any point as a stand-in for shared secret
    let epk_bytes = [0u8; 32];
    let k1 = encrypt::derive_key(&ss, &epk_bytes, &pk.pk_d, b"ZHAC-v1-encrypt").unwrap();
    let k2 = encrypt::derive_key(&ss, &epk_bytes, &pk.pk_d, b"ZHAC-v1-kek").unwrap();
    assert_ne!(k1, k2);
}

#[test]
fn derive_key_deterministic() {
    let (_, pk) = make_keypair();
    let ss = pk.pk_d;
    let epk_bytes = [0xABu8; 32];
    let k1 = encrypt::derive_key(&ss, &epk_bytes, &pk.pk_d, b"prefix").unwrap();
    let k2 = encrypt::derive_key(&ss, &epk_bytes, &pk.pk_d, b"prefix").unwrap();
    assert_eq!(k1, k2);
}
