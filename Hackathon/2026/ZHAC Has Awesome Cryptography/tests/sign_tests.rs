use zhac::sign;
use zhac::keys::{ZhacKeySeed, ZhacPrivateKey};

fn make_keypair() -> (ZhacPrivateKey, zhac::keys::ZhacPublicKey) {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let pk = sk.to_public_key(&[0xABu8; 11]).unwrap();
    (sk, pk)
}

#[test]
fn sign_verify_roundtrip() {
    let (sk, pk) = make_keypair();
    let msg = b"ZHAC signed message -- verify me";
    let sig = sign::sign(msg, &sk).unwrap();
    sign::verify(msg, &sig, &pk).unwrap();
}

#[test]
fn sign_empty_message() {
    let (sk, pk) = make_keypair();
    let sig = sign::sign(b"", &sk).unwrap();
    sign::verify(b"", &sig, &pk).unwrap();
}

#[test]
fn sign_large_message() {
    let (sk, pk) = make_keypair();
    let msg = vec![0x42u8; 100_000];
    let sig = sign::sign(&msg, &sk).unwrap();
    sign::verify(&msg, &sig, &pk).unwrap();
}

#[test]
fn wrong_message_fails() {
    let (sk, pk) = make_keypair();
    let sig = sign::sign(b"original message", &sk).unwrap();
    assert!(sign::verify(b"tampered message", &sig, &pk).is_err());
}

#[test]
fn wrong_key_fails() {
    let (sk_a, pk_a) = make_keypair();
    let (_, pk_b) = make_keypair();
    let sig = sign::sign(b"msg", &sk_a).unwrap();
    assert!(sign::verify(b"msg", &sig, &pk_a).is_ok());
    assert!(sign::verify(b"msg", &sig, &pk_b).is_err());
}

#[test]
fn signature_serialisation_roundtrip() {
    let (sk, pk) = make_keypair();
    let sig = sign::sign(b"msg", &sk).unwrap();
    let bytes = sig.to_bytes();
    assert_eq!(bytes[0], 1);
    let recovered = zhac::keys::ZhacSignature::from_bytes(&bytes).unwrap();
    assert_eq!(sig, recovered);
    sign::verify(b"msg", &recovered, &pk).unwrap();
}

#[test]
fn signatures_are_unique() {
    let (sk, _) = make_keypair();
    let sig1 = sign::sign(b"same message", &sk).unwrap();
    let sig2 = sign::sign(b"same message", &sk).unwrap();
    assert_ne!(sig1.r_bytes, sig2.r_bytes, "randomized nonces should produce different signatures");
}

#[test]
fn signature_version_byte() {
    let (sk, _) = make_keypair();
    let sig = sign::sign(b"msg", &sk).unwrap();
    let bytes = sig.to_bytes();
    assert_eq!(bytes.len(), 65);
    assert_eq!(bytes[0], 1);
}
