use zhac::zcash_wallet::{
    SaplingKeys, OrchardKeys,
    prf_expand_sapling, prf_expand_orchard,
    reduce_to_jubjub_fr, reduce_to_pallas_fr,
    sapling_diversify_hash, sapling_nullifier_generator, sapling_default_diversifier,
    orchard_group_hash, try_decrypt_sapling, DecryptedNote,
};
use ff::Field;
use group::{Group, GroupEncoding};

// ── prf_expand_sapling ──────────────────────────────────────────────────────

#[test]
fn prf_expand_sapling_is_deterministic() {
    let sk = [0x42u8; 32];
    let a = prf_expand_sapling(&sk, 0x10);
    let b = prf_expand_sapling(&sk, 0x10);
    assert_eq!(a, b);
}

#[test]
fn prf_expand_sapling_different_domain_bytes() {
    let sk = [0x42u8; 32];
    let a = prf_expand_sapling(&sk, 0x10);
    let b = prf_expand_sapling(&sk, 0x11);
    assert_ne!(a, b);
}

#[test]
fn prf_expand_sapling_different_seeds() {
    let a = prf_expand_sapling(&[0x42u8; 32], 0x10);
    let b = prf_expand_sapling(&[0x43u8; 32], 0x10);
    assert_ne!(a, b);
}

#[test]
fn prf_expand_sapling_produces_64_bytes() {
    let out = prf_expand_sapling(&[0u8; 32], 0x10);
    assert_eq!(out.len(), 64);
}

// ── reduce_to_jubjub_fr ─────────────────────────────────────────────────────

#[test]
fn reduce_to_jubjub_fr_deterministic() {
    let wide = [0xABu8; 64];
    let a = reduce_to_jubjub_fr(&wide);
    let b = reduce_to_jubjub_fr(&wide);
    assert_eq!(a, b);
}

#[test]
fn reduce_to_jubjub_fr_different_inputs() {
    let a = reduce_to_jubjub_fr(&[0u8; 64]);
    let b = reduce_to_jubjub_fr(&[1u8; 64]);
    assert_ne!(a, b);
}

#[test]
fn reduce_to_jubjub_fr_all_zeros() {
    let s = reduce_to_jubjub_fr(&[0u8; 64]);
    assert!(bool::from(s.is_zero()));
}

// ── reduce_to_pallas_fr ─────────────────────────────────────────────────────

#[test]
fn reduce_to_pallas_fr_deterministic() {
    let wide = [0xABu8; 64];
    let a = reduce_to_pallas_fr(&wide);
    let b = reduce_to_pallas_fr(&wide);
    assert_eq!(a, b);
}

#[test]
fn reduce_to_pallas_fr_different_inputs() {
    let a = reduce_to_pallas_fr(&[0u8; 64]);
    let b = reduce_to_pallas_fr(&[1u8; 64]);
    assert_ne!(a, b);
}

#[test]
fn reduce_to_pallas_fr_all_zeros() {
    let s = reduce_to_pallas_fr(&[0u8; 64]);
    assert!(bool::from(s.is_zero()));
}

// ── SaplingKeys ─────────────────────────────────────────────────────────────

#[test]
fn sapling_keys_derive_from_seed() {
    let seed = [0x42u8; 32];
    let keys = SaplingKeys::from_seed(&seed);
    assert!(!bool::from(keys.ak.is_identity()));
    assert!(!bool::from(keys.nk.is_identity()));
    assert!(!bool::from(keys.ivk.is_zero()));
    assert_eq!(keys.ovk.len(), 32);
}

#[test]
fn sapling_keys_deterministic() {
    let seed = [0x42u8; 32];
    let k1 = SaplingKeys::from_seed(&seed);
    let k2 = SaplingKeys::from_seed(&seed);
    assert_eq!(k1.ask, k2.ask);
    assert_eq!(k1.nsk, k2.nsk);
    assert_eq!(k1.ovk, k2.ovk);
    assert_eq!(k1.ak, k2.ak);
    assert_eq!(k1.ivk, k2.ivk);
}

#[test]
fn sapling_different_seeds_different_keys() {
    let k1 = SaplingKeys::from_seed(&[0x42u8; 32]);
    let k2 = SaplingKeys::from_seed(&[0x43u8; 32]);
    assert_ne!(k1.ask, k2.ask);
    assert_ne!(k1.ivk, k2.ivk);
}

#[test]
fn sapling_address_starts_with_zs1() {
    let keys = SaplingKeys::from_seed(&[0x42u8; 32]);
    let addr = keys.to_zcash_address().unwrap();
    assert!(addr.starts_with("zs1"), "Sapling address should start with zs1, got: {addr}");
}

#[test]
fn sapling_ivk_hex_is_64_chars() {
    let keys = SaplingKeys::from_seed(&[0x42u8; 32]);
    let hex = keys.ivk_hex();
    assert_eq!(hex.len(), 64);
}

#[test]
fn sapling_keys_all_zero_seed() {
    let keys = SaplingKeys::from_seed(&[0u8; 32]);
    // Even with zero seed, ask/nsk should be non-zero (BLAKE2b output)
    assert!(!bool::from(keys.ask.is_zero()) || !bool::from(keys.nsk.is_zero()));
}

// ── sapling_diversify_hash ──────────────────────────────────────────────────

#[test]
fn sapling_diversify_hash_deterministic() {
    let d = [0x42u8; 11];
    let p1 = sapling_diversify_hash(&d);
    let p2 = sapling_diversify_hash(&d);
    assert_eq!(p1, p2);
}

#[test]
fn sapling_diversify_hash_not_identity() {
    let d = [0u8; 11];
    let p = sapling_diversify_hash(&d);
    assert!(!bool::from(p.is_identity()));
}

#[test]
fn sapling_diversify_hash_different_d_differ() {
    let p1 = sapling_diversify_hash(&[0u8; 11]);
    let p2 = sapling_diversify_hash(&[0xFFu8; 11]);
    assert_ne!(p1, p2);
}

// ── sapling_nullifier_generator ─────────────────────────────────────────────

#[test]
fn sapling_nullifier_generator_not_identity() {
    let g = sapling_nullifier_generator();
    assert!(!bool::from(g.is_identity()));
}

#[test]
fn sapling_nullifier_generator_deterministic() {
    let g1 = sapling_nullifier_generator();
    let g2 = sapling_nullifier_generator();
    assert_eq!(g1, g2);
}

// ── sapling_default_diversifier ─────────────────────────────────────────────

#[test]
fn sapling_default_diversifier_returns_valid() {
    let d = sapling_default_diversifier().unwrap();
    assert_eq!(d.len(), 11);
    // Should produce a valid DiversifyHash
    let g = sapling_diversify_hash(&d);
    assert!(!bool::from(g.is_identity()));
}

// ── prf_expand_orchard ──────────────────────────────────────────────────────

#[test]
fn prf_expand_orchard_deterministic() {
    let sk = [0x42u8; 32];
    let a = prf_expand_orchard(&sk, 0x0D);
    let b = prf_expand_orchard(&sk, 0x0D);
    assert_eq!(a, b);
}

#[test]
fn prf_expand_orchard_different_domain_bytes() {
    let sk = [0x42u8; 32];
    let a = prf_expand_orchard(&sk, 0x0D);
    let b = prf_expand_orchard(&sk, 0x0E);
    assert_ne!(a, b);
}

#[test]
fn prf_expand_orchard_different_from_sapling() {
    let sk = [0x42u8; 32];
    let s = prf_expand_sapling(&sk, 0x10);
    let o = prf_expand_orchard(&sk, 0x0D);
    assert_ne!(s, o, "Sapling and Orchard PRFs should use different personalization");
}

// ── OrchardKeys ─────────────────────────────────────────────────────────────

#[test]
fn orchard_keys_derive_from_seed() {
    let seed = [0x42u8; 32];
    let keys = OrchardKeys::from_seed(&seed);
    assert!(!bool::from(keys.ak.is_identity()));
    assert!(!bool::from(keys.ivk.is_zero()));
    assert_eq!(keys.ovk.len(), 32);
}

#[test]
fn orchard_keys_deterministic() {
    let seed = [0x42u8; 32];
    let k1 = OrchardKeys::from_seed(&seed);
    let k2 = OrchardKeys::from_seed(&seed);
    assert_eq!(k1.ask, k2.ask);
    assert_eq!(k1.nk, k2.nk);
    assert_eq!(k1.ovk, k2.ovk);
}

#[test]
fn orchard_different_seeds_different_keys() {
    let k1 = OrchardKeys::from_seed(&[0x42u8; 32]);
    let k2 = OrchardKeys::from_seed(&[0x43u8; 32]);
    assert_ne!(k1.ask, k2.ask);
    assert_ne!(k1.ivk, k2.ivk);
}

#[test]
fn orchard_address_starts_with_expected_prefix() {
    let keys = OrchardKeys::from_seed(&[0x42u8; 32]);
    let addr = keys.to_zcash_address();
    // Orchard addresses use HRP "p" → starts with "p1"
    assert!(addr.is_ok());
    let addr = addr.unwrap();
    assert!(addr.starts_with("p1"), "Orchard address should start with p1, got: {addr}");
}

#[test]
fn orchard_ivk_hex_is_64_chars() {
    let keys = OrchardKeys::from_seed(&[0x42u8; 32]);
    let hex = keys.ivk_hex();
    assert_eq!(hex.len(), 64);
}

// ── orchard_group_hash ──────────────────────────────────────────────────────

#[test]
fn orchard_group_hash_not_identity() {
    let d = [0u8; 4];
    let p = orchard_group_hash(&d);
    assert!(!bool::from(p.is_identity()));
}

#[test]
fn orchard_group_hash_deterministic() {
    let d = [0x42u8; 4];
    let p1 = orchard_group_hash(&d);
    let p2 = orchard_group_hash(&d);
    assert_eq!(p1, p2);
}

#[test]
fn orchard_group_hash_different_d_differ() {
    let p1 = orchard_group_hash(&[0u8; 4]);
    let p2 = orchard_group_hash(&[0xFFu8; 4]);
    assert_ne!(p1, p2);
}

// ── try_decrypt_sapling ─────────────────────────────────────────────────────

#[test]
fn try_decrypt_sapling_invalid_epk_hex_returns_none() {
    let ivk = jubjub::Fr::one();
    assert!(try_decrypt_sapling(&ivk, "not-hex", "abc").is_none());
}

#[test]
fn try_decrypt_sapling_wrong_length_epk_returns_none() {
    let ivk = jubjub::Fr::one();
    assert!(try_decrypt_sapling(&ivk, "ab", "abc").is_none());
}

#[test]
fn try_decrypt_sapling_invalid_point_returns_none() {
    let ivk = jubjub::Fr::one();
    // 32 bytes of zeros is not a valid compressed point
    assert!(try_decrypt_sapling(&ivk, &"00".repeat(32), &"00".repeat(596)).is_none());
}

#[test]
fn try_decrypt_sapling_invalid_ciphertext_hex_returns_none() {
    let ivk = jubjub::Fr::one();
    let valid_epk = hex::encode(jubjub::SubgroupPoint::generator().to_bytes());
    assert!(try_decrypt_sapling(&ivk, &valid_epk, "not-hex").is_none());
}

// ── DecryptedNote ───────────────────────────────────────────────────────────

#[test]
fn decrypted_note_memo_text_strips_nulls() {
    let note = DecryptedNote {
        diversifier: [0u8; 11],
        value_zats: 100_000_000,
        value_zec: 1.0,
        rseed: [0u8; 32],
        memo: b"Hello\0\0\0".to_vec(),
    };
    assert_eq!(note.memo_text(), Some("Hello".into()));
}

#[test]
fn decrypted_note_memo_text_empty_memo() {
    let note = DecryptedNote {
        diversifier: [0u8; 11],
        value_zats: 0,
        value_zec: 0.0,
        rseed: [0u8; 32],
        memo: vec![],
    };
    assert!(note.memo_text().is_none());
}

#[test]
fn decrypted_note_memo_text_binary_memo() {
    let note = DecryptedNote {
        diversifier: [0u8; 11],
        value_zats: 0,
        value_zec: 0.0,
        rseed: [0u8; 32],
        memo: vec![0xFF, 0xFE, 0xFD],
    };
    assert!(note.memo_text().is_none(), "invalid UTF-8 should return None");
}

#[test]
fn decrypted_note_value_zec_conversion() {
    let note = DecryptedNote {
        diversifier: [0u8; 11],
        value_zats: 50_000_000,
        value_zec: 0.5,
        rseed: [0u8; 32],
        memo: vec![],
    };
    assert_eq!(note.value_zats, 50_000_000);
    assert!((note.value_zec - 0.5).abs() < 0.0001);
}
