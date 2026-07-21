use zhac::encoding::{self, EncodingVariant};

#[test]
fn bech32m_roundtrip() {
    let enc = encode("zhac", b"hello", EncodingVariant::Bech32m).unwrap();
    let (hrp, decoded, _var) = decode(&enc).unwrap();
    assert_eq!(hrp, "zhac");
    assert_eq!(decoded, b"hello");
}

#[test]
fn bech32m_empty_data() {
    let enc = encode("zhac", b"", EncodingVariant::Bech32m).unwrap();
    let (hrp, decoded, _) = decode(&enc).unwrap();
    assert_eq!(hrp, "zhac");
    assert!(decoded.is_empty());
}

#[test]
fn bech32m_large_data() {
    let data = vec![0xABu8; 100];
    let enc = encode("zhac", &data, EncodingVariant::Bech32m).unwrap();
    let (_, decoded, _) = decode(&enc).unwrap();
    assert_eq!(decoded, data);
}

#[test]
fn invalid_fails() {
    let mut bad = encode("zhac", b"x", EncodingVariant::Bech32m).unwrap();
    bad.push('x');
    assert!(decode(&bad).is_err());
}

#[test]
fn empty_string_fails() {
    assert!(decode("").is_err());
}

#[test]
fn wrong_hrp_in_decode() {
    let enc = encode("zhac", b"data", EncodingVariant::Bech32m).unwrap();
    let (hrp, _, _) = decode(&enc).unwrap();
    assert_eq!(hrp, "zhac");
    let enc2 = encode("other", b"data", EncodingVariant::Bech32m).unwrap();
    let (hrp2, _, _) = decode(&enc2).unwrap();
    assert_ne!(hrp, hrp2);
}

#[test]
fn encode_returns_none_for_invalid_hrp() {
    assert!(encode("", b"data", EncodingVariant::Bech32m).is_none());
}

fn encode(hrp: &str, data: &[u8], v: EncodingVariant) -> Option<String> {
    encoding::encode(hrp, data, v)
}

fn decode(s: &str) -> zhac::Result<(String, Vec<u8>, EncodingVariant)> {
    encoding::decode(s)
}
