use zhac::threshold as frost;
use std::collections::BTreeMap;

#[test]
fn trusted_dealer_2_of_3_sign_and_verify() {
    let out = frost::trusted_dealer_keygen(3, 2).unwrap();
    assert_eq!(out.secret_shares.len(), 3);

    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let id3 = frost::Identifier::try_from(3u16).unwrap();
    let kp1 = &out.key_packages[&id1];
    let kp3 = &out.key_packages[&id3];

    let r1_1 = frost::round1_commit(kp1).unwrap();
    let r1_3 = frost::round1_commit(kp3).unwrap();

    let mut commitments = BTreeMap::new();
    commitments.insert(id1, r1_1.commitments);
    commitments.insert(id3, r1_3.commitments);

    let msg = b"trusted dealer test";
    let sp = frost::build_signing_package(msg, &commitments);

    let share1 = frost::round2_sign(&sp, &r1_1.nonces, kp1).unwrap();
    let share3 = frost::round2_sign(&sp, &r1_3.nonces, kp3).unwrap();

    let mut shares = BTreeMap::new();
    shares.insert(id1, share1);
    shares.insert(id3, share3);

    let sig = frost::aggregate(&sp, &shares, &out.public_key_package).unwrap();
    frost::verify_threshold_signature(&sig, msg, out.public_key_package.verifying_key()).unwrap();
}

#[test]
fn trusted_dealer_2_of_2_sign_and_verify() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let id2 = frost::Identifier::try_from(2u16).unwrap();

    let r1_1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();
    let r1_2 = frost::round1_commit(&out.key_packages[&id2]).unwrap();

    let mut commitments = BTreeMap::new();
    commitments.insert(id1, r1_1.commitments);
    commitments.insert(id2, r1_2.commitments);

    let msg = b"2-of-2 test";
    let sp = frost::build_signing_package(msg, &commitments);

    let share1 = frost::round2_sign(&sp, &r1_1.nonces, &out.key_packages[&id1]).unwrap();
    let share2 = frost::round2_sign(&sp, &r1_2.nonces, &out.key_packages[&id2]).unwrap();

    let mut shares = BTreeMap::new();
    shares.insert(id1, share1);
    shares.insert(id2, share2);

    let sig = frost::aggregate(&sp, &shares, &out.public_key_package).unwrap();
    frost::verify_threshold_signature(&sig, msg, out.public_key_package.verifying_key()).unwrap();
}

#[test]
fn trusted_dealer_insufficient_shares_fails() {
    let out = frost::trusted_dealer_keygen(3, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let id2 = frost::Identifier::try_from(2u16).unwrap();

    let r1_1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();
    let r1_2 = frost::round1_commit(&out.key_packages[&id2]).unwrap();

    let mut commitments = BTreeMap::new();
    commitments.insert(id1, r1_1.commitments);
    commitments.insert(id2, r1_2.commitments);
    let sp = frost::build_signing_package(b"msg", &commitments);

    let share1 = frost::round2_sign(&sp, &r1_1.nonces, &out.key_packages[&id1]).unwrap();

    let mut shares = BTreeMap::new();
    shares.insert(id1, share1);

    assert!(frost::aggregate(&sp, &shares, &out.public_key_package).is_err());
}

#[test]
fn threshold_below_2_fails() {
    assert!(frost::trusted_dealer_keygen(3, 1).is_err());
}

#[test]
fn threshold_exceeding_total_fails() {
    assert!(frost::trusted_dealer_keygen(2, 3).is_err());
}

#[test]
fn threshold_verify_wrong_message_fails() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let id2 = frost::Identifier::try_from(2u16).unwrap();

    let r1_1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();
    let r1_2 = frost::round1_commit(&out.key_packages[&id2]).unwrap();

    let mut commitments = BTreeMap::new();
    commitments.insert(id1, r1_1.commitments);
    commitments.insert(id2, r1_2.commitments);

    let sp = frost::build_signing_package(b"real message", &commitments);

    let share1 = frost::round2_sign(&sp, &r1_1.nonces, &out.key_packages[&id1]).unwrap();
    let share2 = frost::round2_sign(&sp, &r1_2.nonces, &out.key_packages[&id2]).unwrap();

    let mut shares = BTreeMap::new();
    shares.insert(id1, share1);
    shares.insert(id2, share2);

    let sig = frost::aggregate(&sp, &shares, &out.public_key_package).unwrap();
    assert!(frost::verify_threshold_signature(&sig, b"wrong message", out.public_key_package.verifying_key()).is_err());
}

// ── Serialization ───────────────────────────────────────────────────────────

#[test]
fn serialization_key_package_roundtrip() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let kp = &out.key_packages[&id1];

    let dir = tempfile::tempdir().unwrap();
    let kp_path = dir.path().join("kp.bin");
    frost::save_key_package(kp, &kp_path).unwrap();
    let kp2 = frost::load_key_package(&kp_path).unwrap();
    // KeyPackage doesn't impl PartialEq, so just check it loads
    let _ = kp2;
}

#[test]
fn serialization_pubkey_pkg_roundtrip() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("pkp.bin");
    frost::save_pubkey_pkg(&out.public_key_package, &path).unwrap();
    let _pkp = frost::load_pubkey_pkg(&path).unwrap();
}

#[test]
fn serialization_secret_share_roundtrip() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("share.bin");
    frost::save_secret_share(&out.secret_shares[&id1], &path).unwrap();
    let _ss = frost::load_secret_share(&path).unwrap();
}

#[test]
fn serialization_nonces_roundtrip() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let r1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();

    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("nonces.bin");
    frost::save_nonces(&r1.nonces, &path).unwrap();
    let _n = frost::load_nonces(&path).unwrap();
}

#[test]
fn serialization_commitments_roundtrip() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let r1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();

    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("comm.bin");
    frost::save_commitments(&r1.commitments, &path).unwrap();
    let _c = frost::load_commitments(&path).unwrap();
}

#[test]
fn serialization_signing_package_roundtrip() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let id2 = frost::Identifier::try_from(2u16).unwrap();
    let r1_1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();
    let r1_2 = frost::round1_commit(&out.key_packages[&id2]).unwrap();
    let mut c = BTreeMap::new();
    c.insert(id1, r1_1.commitments);
    c.insert(id2, r1_2.commitments);
    let sp = frost::build_signing_package(b"msg", &c);

    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("sp.bin");
    frost::save_signing_package(&sp, &path).unwrap();
    let _sp2 = frost::load_signing_package(&path).unwrap();
}

#[test]
fn serialization_share_roundtrip() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let id2 = frost::Identifier::try_from(2u16).unwrap();
    let r1_1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();
    let r1_2 = frost::round1_commit(&out.key_packages[&id2]).unwrap();
    let mut c = BTreeMap::new();
    c.insert(id1, r1_1.commitments);
    c.insert(id2, r1_2.commitments);
    let sp = frost::build_signing_package(b"msg", &c);
    let share = frost::round2_sign(&sp, &r1_1.nonces, &out.key_packages[&id1]).unwrap();

    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("share.bin");
    frost::save_share(&share, &path).unwrap();
    let _s = frost::load_share(&path).unwrap();
}

#[test]
fn serialization_threshold_sig_roundtrip() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let id2 = frost::Identifier::try_from(2u16).unwrap();
    let r1_1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();
    let r1_2 = frost::round1_commit(&out.key_packages[&id2]).unwrap();
    let mut c = BTreeMap::new();
    c.insert(id1, r1_1.commitments);
    c.insert(id2, r1_2.commitments);
    let sp = frost::build_signing_package(b"msg", &c);
    let s1 = frost::round2_sign(&sp, &r1_1.nonces, &out.key_packages[&id1]).unwrap();
    let s2 = frost::round2_sign(&sp, &r1_2.nonces, &out.key_packages[&id2]).unwrap();
    let mut shares = BTreeMap::new();
    shares.insert(id1, s1);
    shares.insert(id2, s2);
    let sig = frost::aggregate(&sp, &shares, &out.public_key_package).unwrap();

    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("sig.bin");
    frost::save_threshold_sig(&sig, &path).unwrap();
    let sig2 = frost::load_threshold_sig(&path).unwrap();
    frost::verify_threshold_signature(&sig2, b"msg", out.public_key_package.verifying_key()).unwrap();
}

#[test]
fn load_shares_dir_works() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let id2 = frost::Identifier::try_from(2u16).unwrap();
    let r1_1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();
    let r1_2 = frost::round1_commit(&out.key_packages[&id2]).unwrap();
    let mut c = BTreeMap::new();
    c.insert(id1, r1_1.commitments);
    c.insert(id2, r1_2.commitments);
    let sp = frost::build_signing_package(b"msg", &c);
    let s1 = frost::round2_sign(&sp, &r1_1.nonces, &out.key_packages[&id1]).unwrap();
    let s2 = frost::round2_sign(&sp, &r1_2.nonces, &out.key_packages[&id2]).unwrap();

    let dir = tempfile::tempdir().unwrap();
    frost::save_share(&s1, &dir.path().join("1.share")).unwrap();
    frost::save_share(&s2, &dir.path().join("2.share")).unwrap();

    let loaded = frost::load_shares_dir(dir.path()).unwrap();
    assert_eq!(loaded.len(), 2);
    assert!(loaded.contains_key(&id1));
    assert!(loaded.contains_key(&id2));
}

#[test]
fn load_commitments_dir_works() {
    let out = frost::trusted_dealer_keygen(2, 2).unwrap();
    let id1 = frost::Identifier::try_from(1u16).unwrap();
    let id2 = frost::Identifier::try_from(2u16).unwrap();
    let r1_1 = frost::round1_commit(&out.key_packages[&id1]).unwrap();
    let r1_2 = frost::round1_commit(&out.key_packages[&id2]).unwrap();

    let dir = tempfile::tempdir().unwrap();
    frost::save_commitments(&r1_1.commitments, &dir.path().join("1.bin")).unwrap();
    frost::save_commitments(&r1_2.commitments, &dir.path().join("2.bin")).unwrap();

    let loaded = frost::load_commitments_dir(dir.path()).unwrap();
    assert_eq!(loaded.len(), 2);
}
