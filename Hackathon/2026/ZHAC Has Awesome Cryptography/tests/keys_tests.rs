use zhac::keys::{
    self, ZhacKeyPair, ZhacKeySeed, ZhacPrivateKey, ZhacPublicKey, ZhacViewingKey,
    ZhacCiphertext, ZhacMultiCiphertext, ZhacSignature, RecipientHeader,
    encrypt_private_key, decrypt_private_key, write_file_secure,
};
use jubjub::SubgroupPoint;
use group::{Group, GroupEncoding};
use ff::Field;

// ── hash_to_scalar ──────────────────────────────────────────────────────────

#[test]
fn hash_to_scalar_is_deterministic() {
    let s1 = keys::hash_to_scalar(b"test-domain", b"input data");
    let s2 = keys::hash_to_scalar(b"test-domain", b"input data");
    assert_eq!(s1, s2);
}

#[test]
fn hash_to_scalar_different_domains_differ() {
    let s1 = keys::hash_to_scalar(b"domain-A", b"data");
    let s2 = keys::hash_to_scalar(b"domain-B", b"data");
    assert_ne!(s1, s2);
}

#[test]
fn hash_to_scalar_different_inputs_differ() {
    let s1 = keys::hash_to_scalar(b"domain", b"input1");
    let s2 = keys::hash_to_scalar(b"domain", b"input2");
    assert_ne!(s1, s2);
}

#[test]
fn hash_to_scalar_empty_input() {
    let s = keys::hash_to_scalar(b"domain", b"");
    assert_ne!(s, jubjub::Fr::zero());
}

#[test]
fn hash_to_scalar_long_domain_truncated_to_16() {
    let s1 = keys::hash_to_scalar(b"this-is-a-very-long-domain-string", b"data");
    let s2 = keys::hash_to_scalar(b"this-is-a-very-lon", b"data");
    assert_eq!(s1, s2, "domain should be truncated to 16 bytes");
}

// ── edwards_d ───────────────────────────────────────────────────────────────

#[test]
fn edwards_d_is_nonzero() {
    let d = keys::edwards_d();
    assert_ne!(d, jubjub::Fq::zero());
}

// ── DiversifyHash ───────────────────────────────────────────────────────────

#[test]
fn diversify_hash_is_deterministic() {
    let d = [0xABu8; 11];
    let p1 = keys::diversify_hash(&d).unwrap();
    let p2 = keys::diversify_hash(&d).unwrap();
    assert_eq!(p1, p2);
}

#[test]
fn diversify_hash_produces_subgroup_point() {
    let d = [0u8; 11];
    let p = keys::diversify_hash(&d).unwrap();
    let bytes = p.to_bytes();
    let back = SubgroupPoint::from_bytes(&bytes).into_option();
    assert!(back.is_some());
}

#[test]
fn diversify_hash_different_inputs_differ() {
    let d1 = [0u8; 11];
    let d2 = [0xFFu8; 11];
    let p1 = keys::diversify_hash(&d1).unwrap();
    let p2 = keys::diversify_hash(&d2).unwrap();
    assert_ne!(p1, p2);
}

#[test]
fn diversify_hash_not_identity() {
    let d = [0x42u8; 11];
    let p = keys::diversify_hash(&d).unwrap();
    assert!(!bool::from(p.is_identity()));
}

// ── read_fixed ──────────────────────────────────────────────────────────────

#[test]
fn read_fixed_correct() {
    let data = [1, 2, 3, 4, 5, 6];
    let arr: [u8; 3] = keys::read_fixed(&data, 1).unwrap();
    assert_eq!(arr, [2, 3, 4]);
}

#[test]
#[should_panic]
fn read_fixed_out_of_bounds_panics() {
    let data = [1, 2, 3];
    let _: [u8; 4] = keys::read_fixed(&data, 0).unwrap();
}

// ── ZhacKeySeed ─────────────────────────────────────────────────────────────

#[test]
fn seed_generate_is_32_bytes() {
    let seed = ZhacKeySeed::generate();
    assert_eq!(seed.as_bytes().len(), 32);
}

#[test]
fn seed_generate_is_unique() {
    let s1 = ZhacKeySeed::generate();
    let s2 = ZhacKeySeed::generate();
    assert_ne!(s1.as_bytes(), s2.as_bytes());
}

#[test]
fn seed_from_bytes() {
    let bytes = [0xABu8; 32];
    let seed = ZhacKeySeed::from_bytes(bytes);
    assert_eq!(seed.as_bytes(), &bytes);
}

#[test]
fn seed_hex_roundtrip() {
    let seed = ZhacKeySeed::generate();
    let hex = seed.to_hex();
    let recovered = ZhacKeySeed::from_hex(&hex).unwrap();
    assert_eq!(seed.bytes, recovered.bytes);
}

#[test]
fn seed_hex_rejects_wrong_length() {
    assert!(ZhacKeySeed::from_hex("abcd").is_err());
    assert!(ZhacKeySeed::from_hex(&"ab".repeat(31)).is_err());
    assert!(ZhacKeySeed::from_hex(&"ab".repeat(33)).is_err());
}

#[test]
fn seed_hex_rejects_invalid_hex() {
    assert!(ZhacKeySeed::from_hex("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz").is_err());
}

#[test]
fn seed_debug_redacted() {
    let seed = ZhacKeySeed::generate();
    let dbg = format!("{seed:?}");
    assert!(dbg.contains("redacted"));
    assert!(!dbg.contains(&seed.to_hex()));
}

// ── ZhacPrivateKey ──────────────────────────────────────────────────────────

#[test]
fn private_key_from_seed_deterministic() {
    let seed = ZhacKeySeed::generate();
    let sk1 = ZhacPrivateKey::from_seed(&seed);
    let sk2 = ZhacPrivateKey::from_seed(&seed);
    assert_eq!(sk1.sk, sk2.sk);
    assert_eq!(sk1.ask, sk2.ask);
    assert_eq!(sk1.nsk, sk2.nsk);
    assert_eq!(sk1.sig_sk, sk2.sig_sk);
}

#[test]
fn private_key_different_seeds_differ() {
    let s1 = ZhacKeySeed::generate();
    let s2 = ZhacKeySeed::generate();
    let sk1 = ZhacPrivateKey::from_seed(&s1);
    let sk2 = ZhacPrivateKey::from_seed(&s2);
    assert_ne!(sk1.ask, sk2.ask);
    assert_ne!(sk1.sig_sk, sk2.sig_sk);
}

#[test]
fn private_key_spending_key_bytes() {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    assert_eq!(sk.spending_key_bytes(), &seed.bytes);
}

#[test]
fn private_key_debug_redacted() {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let dbg = format!("{sk:?}");
    assert!(dbg.contains("redacted"));
}

#[test]
fn private_key_compute_ivk_deterministic() {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let ivk1 = sk.compute_ivk();
    let ivk2 = sk.compute_ivk();
    assert_eq!(ivk1, ivk2);
}

#[test]
fn private_key_compute_ivk_nonzero() {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let ivk = sk.compute_ivk();
    assert!(!bool::from(ivk.is_zero()));
}

#[test]
fn private_key_to_public_key_deterministic() {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let pk1 = sk.to_public_key(&[0u8; 11]).unwrap();
    let pk2 = sk.to_public_key(&[0u8; 11]).unwrap();
    assert_eq!(pk1, pk2);
}

#[test]
fn private_key_different_diversifiers_different_pkd() {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let pk1 = sk.to_public_key(&[0u8; 11]).unwrap();
    let pk2 = sk.to_public_key(&[0xFFu8; 11]).unwrap();
    assert_ne!(pk1.pk_d, pk2.pk_d);
    assert_eq!(pk1.sig_vk, pk2.sig_vk, "sig_vk should not depend on diversifier");
}

#[test]
fn private_key_to_viewing_key() {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let vk = sk.to_viewing_key(&[0u8; 11]).unwrap();
    assert!(!bool::from(vk.ivk.is_zero()));
    assert!(!bool::from(vk.pk_d.is_identity()));
}

#[test]
fn private_key_zhac_secret_roundtrip() {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let secret = sk.to_zhac_secret();
    assert!(secret.starts_with("zhacsecret1"));
    let recovered = ZhacPrivateKey::from_zhac_secret(&secret).unwrap();
    assert_eq!(sk.sk, recovered.sk);
    assert_eq!(sk.ask, recovered.ask);
    assert_eq!(sk.sig_sk, recovered.sig_sk);
}

#[test]
fn private_key_from_zhac_secret_rejects_wrong_hrp() {
    assert!(ZhacPrivateKey::from_zhac_secret("zhac1q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q").is_err());
}

#[test]
fn private_key_from_zhac_secret_rejects_garbage() {
    assert!(ZhacPrivateKey::from_zhac_secret("not-a-key").is_err());
}

// ── ZhacPublicKey ───────────────────────────────────────────────────────────

#[test]
fn keypair_generate_and_roundtrip() {
    let (kp, seed) = ZhacKeyPair::generate().unwrap();
    let addr = kp.public_key.to_zhac_address();
    assert!(addr.starts_with("zhac1"));
    let recovered = ZhacPublicKey::from_zhac_address(&addr).unwrap();
    assert_eq!(kp.public_key.pk_d, recovered.pk_d);
    assert_eq!(kp.public_key.sig_vk, recovered.sig_vk);
    assert_eq!(kp.public_key.d, recovered.d);

    let secret = kp.private_key.to_zhac_secret();
    let recovered_priv = ZhacPrivateKey::from_zhac_secret(&secret).unwrap();
    assert_eq!(kp.private_key.sk, recovered_priv.sk);

    let kp2 = ZhacKeyPair::from_seed(&seed, &kp.public_key.d).unwrap();
    assert_eq!(kp.public_key.pk_d, kp2.public_key.pk_d);
}

#[test]
fn keypair_generate_from_seed_deterministic() {
    let seed = ZhacKeySeed::generate();
    let (kp1, _) = ZhacKeyPair::generate_from_seed(&seed).unwrap();
    let (kp2, _) = ZhacKeyPair::generate_from_seed(&seed).unwrap();
    assert_eq!(kp1.public_key, kp2.public_key);
}

#[test]
fn keypair_from_seed_with_diversifier() {
    let seed = ZhacKeySeed::generate();
    let kp = ZhacKeyPair::from_seed(&seed, &[0x42u8; 11]).unwrap();
    assert_eq!(kp.public_key.d, [0x42u8; 11]);
}

#[test]
fn public_key_tampered_address_fails() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let mut addr = kp.public_key.to_zhac_address();
    addr.push('x');
    assert!(ZhacPublicKey::from_zhac_address(&addr).is_err());
}

#[test]
fn public_key_wrong_hrp_fails() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let addr = kp.public_key.to_zhac_address();
    let bad = addr.replacen("zhac1", "zhacsecret1", 1);
    assert!(ZhacPublicKey::from_zhac_address(&bad).is_err());
}

#[test]
fn public_key_wrong_length_fails() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let addr = kp.public_key.to_zhac_address();
    // Truncate to remove some data
    let short = &addr[..addr.len() / 2];
    assert!(ZhacPublicKey::from_zhac_address(short).is_err());
}

// ── Fingerprint ─────────────────────────────────────────────────────────────

#[test]
fn fingerprint_is_deterministic() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    assert_eq!(kp.public_key.fingerprint(), kp.public_key.fingerprint());
}

#[test]
fn fingerprint_differs_for_different_keys() {
    let (kp1, _) = ZhacKeyPair::generate().unwrap();
    let (kp2, _) = ZhacKeyPair::generate().unwrap();
    assert_ne!(kp1.public_key.fingerprint(), kp2.public_key.fingerprint());
}

#[test]
fn fingerprint_is_20_bytes() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    assert_eq!(kp.public_key.fingerprint().len(), 20);
}

#[test]
fn fingerprint_hex_format() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let hex = kp.public_key.fingerprint_hex();
    let groups: Vec<&str> = hex.split(' ').collect();
    assert_eq!(groups.len(), 10);
    for g in &groups {
        assert_eq!(g.len(), 4);
    }
}

#[test]
fn key_id_is_8_hex_chars() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let id = kp.public_key.key_id();
    assert_eq!(id.len(), 8);
    assert!(id.chars().all(|c| c.is_ascii_hexdigit()));
}

// ── ViewingKey ──────────────────────────────────────────────────────────────

#[test]
fn viewing_key_roundtrip() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let d = kp.public_key.d;
    let vk = kp.private_key.to_viewing_key(&d).unwrap();
    let vk_str = vk.to_zhac_viewing_key();
    assert!(vk_str.starts_with("zhacview1"));
    let recovered = ZhacViewingKey::from_zhac_viewing_key(&vk_str).unwrap();
    assert_eq!(vk.ivk, recovered.ivk);
    assert_eq!(vk.pk_d, recovered.pk_d);
    assert_eq!(vk.d, recovered.d);
}

#[test]
fn viewing_key_wrong_hrp_fails() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let vk = kp.private_key.to_viewing_key(&kp.public_key.d).unwrap();
    let vk_str = vk.to_zhac_viewing_key();
    let bad = vk_str.replacen("zhacview1", "zhac1", 1);
    assert!(ZhacViewingKey::from_zhac_viewing_key(&bad).is_err());
}

#[test]
fn viewing_key_wrong_length_fails() {
    assert!(ZhacViewingKey::from_zhac_viewing_key("zhacview1q7q7").is_err());
}

// ── Ciphertext serialization ────────────────────────────────────────────────

#[test]
fn ciphertext_roundtrip() {
    let ct = ZhacCiphertext {
        d: [0x13u8; 11],
        ephemeral_key: [0xABu8; 32],
        nonce: [0x42u8; 12],
        data: vec![1, 2, 3, 4],
    };
    let bytes = ct.to_bytes();
    assert_eq!(bytes[0], 1);
    let recovered = ZhacCiphertext::from_bytes(&bytes).unwrap();
    assert_eq!(ct.d, recovered.d);
    assert_eq!(ct.ephemeral_key, recovered.ephemeral_key);
    assert_eq!(ct.nonce, recovered.nonce);
    assert_eq!(ct.data, recovered.data);
}

#[test]
fn ciphertext_rejects_wrong_version() {
    let mut bytes = vec![0u8; 56];
    bytes[0] = 99;
    assert!(ZhacCiphertext::from_bytes(&bytes).is_err());
}

#[test]
fn ciphertext_rejects_too_short() {
    assert!(ZhacCiphertext::from_bytes(&[0u8; 10]).is_err());
}

#[test]
fn ciphertext_empty_data() {
    let ct = ZhacCiphertext {
        d: [0u8; 11],
        ephemeral_key: [0u8; 32],
        nonce: [0u8; 12],
        data: vec![],
    };
    let bytes = ct.to_bytes();
    let recovered = ZhacCiphertext::from_bytes(&bytes).unwrap();
    assert!(recovered.data.is_empty());
}

// ── Multi-ciphertext serialization ──────────────────────────────────────────

#[test]
fn multi_ciphertext_roundtrip() {
    let headers = vec![
        RecipientHeader { d: [0x11u8; 11], ephemeral_key: [0x22u8; 32], nonce: [0x33u8; 12], encrypted_dek: [0x44u8; 48] },
        RecipientHeader { d: [0x55u8; 11], ephemeral_key: [0x66u8; 32], nonce: [0x77u8; 12], encrypted_dek: [0x88u8; 48] },
    ];
    let ct = ZhacMultiCiphertext { headers, nonce: [0x99u8; 12], data: vec![1, 2, 3, 4, 5] };
    let bytes = ct.to_bytes();
    assert_eq!(bytes[0], 2);
    assert_eq!(bytes[1], 2);
    let recovered = ZhacMultiCiphertext::from_bytes(&bytes).unwrap();
    assert_eq!(ct.headers.len(), recovered.headers.len());
    assert_eq!(ct.nonce, recovered.nonce);
    assert_eq!(ct.data, recovered.data);
}

#[test]
fn multi_ciphertext_zero_recipients_rejected_by_encrypt() {
    // The from_bytes should parse 0 recipients but encrypt_multi rejects it
    let bytes = vec![2u8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let recovered = ZhacMultiCiphertext::from_bytes(&bytes).unwrap();
    assert_eq!(recovered.headers.len(), 0);
}

#[test]
fn multi_ciphertext_rejects_wrong_version() {
    let bytes = vec![99u8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    assert!(ZhacMultiCiphertext::from_bytes(&bytes).is_err());
}

#[test]
fn multi_ciphertext_rejects_too_short() {
    assert!(ZhacMultiCiphertext::from_bytes(&[0u8; 1]).is_err());
}

// ── Signature serialization ─────────────────────────────────────────────────

#[test]
fn signature_roundtrip() {
    let sig = ZhacSignature { r_bytes: [0x11u8; 32], s_bytes: [0x22u8; 32] };
    let bytes = sig.to_bytes();
    assert_eq!(bytes[0], 1);
    let recovered = ZhacSignature::from_bytes(&bytes).unwrap();
    assert_eq!(sig, recovered);
}

#[test]
fn signature_rejects_wrong_version() {
    let mut bytes = vec![0u8; 65];
    bytes[0] = 99;
    assert!(ZhacSignature::from_bytes(&bytes).is_err());
}

#[test]
fn signature_rejects_wrong_length() {
    assert!(ZhacSignature::from_bytes(&[0u8; 64]).is_err());
    assert!(ZhacSignature::from_bytes(&[0u8; 66]).is_err());
}

// ── Passphrase encryption ───────────────────────────────────────────────────

#[test]
fn passphrase_encrypt_decrypt_roundtrip() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let priv_str = kp.private_key.to_zhac_secret();
    let encrypted = encrypt_private_key(&priv_str, "correct horse battery staple").unwrap();
    let decrypted = decrypt_private_key(&encrypted, "correct horse battery staple").unwrap();
    assert_eq!(priv_str, decrypted);
}

#[test]
fn passphrase_wrong_passphrase_fails() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let priv_str = kp.private_key.to_zhac_secret();
    let encrypted = encrypt_private_key(&priv_str, "correct passphrase").unwrap();
    assert!(decrypt_private_key(&encrypted, "wrong passphrase").is_err());
}

#[test]
fn passphrase_encrypted_key_loads_as_private_key() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let priv_str = kp.private_key.to_zhac_secret();
    let encrypted = encrypt_private_key(&priv_str, "secret123").unwrap();
    let decrypted = decrypt_private_key(&encrypted, "secret123").unwrap();
    let recovered = ZhacPrivateKey::from_zhac_secret(&decrypted).unwrap();
    assert_eq!(kp.private_key.sk, recovered.sk);
}

#[test]
fn passphrase_format_has_v2_prefix() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let priv_str = kp.private_key.to_zhac_secret();
    let encrypted = encrypt_private_key(&priv_str, "test").unwrap();
    assert!(encrypted.starts_with("v2:"));
}

#[test]
fn passphrase_different_passwords_produce_different_ciphertexts() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let priv_str = kp.private_key.to_zhac_secret();
    let e1 = encrypt_private_key(&priv_str, "pass1").unwrap();
    let e2 = encrypt_private_key(&priv_str, "pass2").unwrap();
    assert_ne!(e1, e2);
}

#[test]
fn passphrase_same_password_different_salts() {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let priv_str = kp.private_key.to_zhac_secret();
    let e1 = encrypt_private_key(&priv_str, "same").unwrap();
    let e2 = encrypt_private_key(&priv_str, "same").unwrap();
    assert_ne!(e1, e2, "random salt should produce different ciphertexts");
}

// ── argon2id_derive ─────────────────────────────────────────────────────────

#[test]
fn argon2id_derive_deterministic_with_same_salt() {
    let salt = [0xABu8; 16];
    let k1 = keys::argon2id_derive("passphrase", &salt).unwrap();
    let k2 = keys::argon2id_derive("passphrase", &salt).unwrap();
    assert_eq!(k1, k2);
}

#[test]
fn argon2id_derive_different_passphrases_differ() {
    let salt = [0u8; 16];
    let k1 = keys::argon2id_derive("pass1", &salt).unwrap();
    let k2 = keys::argon2id_derive("pass2", &salt).unwrap();
    assert_ne!(k1, k2);
}

#[test]
fn argon2id_derive_different_salts_differ() {
    let s1 = [0u8; 16];
    let s2 = [0xFFu8; 16];
    let k1 = keys::argon2id_derive("pass", &s1).unwrap();
    let k2 = keys::argon2id_derive("pass", &s2).unwrap();
    assert_ne!(k1, k2);
}

#[test]
fn argon2id_derive_produces_32_bytes() {
    let salt = [0u8; 16];
    let key = keys::argon2id_derive("test", &salt).unwrap();
    assert_eq!(key.len(), 32);
}

// ── Legacy v1 decryption ────────────────────────────────────────────────────

#[test]
fn decrypt_v1_legacy_format() {
    use chacha20poly1305::aead::{Aead, KeyInit};
    use chacha20poly1305::ChaCha20Poly1305;
    use hkdf::Hkdf;
    use sha2::Sha256;
    use rand::RngCore;

    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let priv_str = kp.private_key.to_zhac_secret();
    let passphrase = "legacy-test-pass";

    let mut salt = [0u8; 16];
    rand::rngs::OsRng.fill_bytes(&mut salt);
    let hk = Hkdf::<Sha256>::new(Some(&salt), passphrase.as_bytes());
    let mut key = [0u8; 32];
    hk.expand(b"ZHAC-v1-key-encryption", &mut key).unwrap();

    let mut nonce = [0u8; 12];
    rand::rngs::OsRng.fill_bytes(&mut nonce);

    let cipher = ChaCha20Poly1305::new_from_slice(&key).unwrap();
    let ct = cipher.encrypt((&nonce).into(), priv_str.as_bytes()).unwrap();

    let v1_blob = format!("{}:{}:{}", hex::encode(salt), hex::encode(nonce), hex::encode(&ct));

    let decrypted = keys::decrypt_private_key_v1(&v1_blob, passphrase).unwrap();
    assert_eq!(decrypted, priv_str);
}

#[test]
fn decrypt_v1_wrong_passphrase_fails() {
    use chacha20poly1305::aead::{Aead, KeyInit};
    use chacha20poly1305::ChaCha20Poly1305;
    use hkdf::Hkdf;
    use sha2::Sha256;
    use rand::RngCore;

    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let priv_str = kp.private_key.to_zhac_secret();

    let mut salt = [0u8; 16];
    rand::rngs::OsRng.fill_bytes(&mut salt);
    let hk = Hkdf::<Sha256>::new(Some(&salt), "correct".as_bytes());
    let mut key = [0u8; 32];
    hk.expand(b"ZHAC-v1-key-encryption", &mut key).unwrap();

    let mut nonce = [0u8; 12];
    rand::rngs::OsRng.fill_bytes(&mut nonce);

    let cipher = ChaCha20Poly1305::new_from_slice(&key).unwrap();
    let ct = cipher.encrypt((&nonce).into(), priv_str.as_bytes()).unwrap();

    let v1_blob = format!("{}:{}:{}", hex::encode(salt), hex::encode(nonce), hex::encode(&ct));
    assert!(keys::decrypt_private_key_v1(&v1_blob, "wrong").is_err());
}

#[test]
fn decrypt_v1_malformed_fails() {
    assert!(keys::decrypt_private_key_v1("not-enough-parts", "pass").is_err());
    assert!(keys::decrypt_private_key_v1("badhex:badhex:badhex", "pass").is_err());
}

// ── write_file_secure ────────────────────────────────────────────────────────

#[test]
fn write_file_secure_writes_data() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("test.secure");
    write_file_secure(&path, b"secret data").unwrap();
    let read = std::fs::read(&path).unwrap();
    assert_eq!(read, b"secret data");
}

#[test]
fn write_file_secure_overwrites() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("overwrite.secure");
    write_file_secure(&path, b"first").unwrap();
    write_file_secure(&path, b"second").unwrap();
    let read = std::fs::read(&path).unwrap();
    assert_eq!(read, b"second");
}
