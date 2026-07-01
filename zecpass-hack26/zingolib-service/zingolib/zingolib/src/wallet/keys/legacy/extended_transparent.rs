//! BIP32 key derivation primitives
use std::io;
use zcash_protocol::consensus::NetworkConstants;

use crate::config::ClientConfig;
use ring::hmac::{self, Context, Key};
use secp256k1::{Error, PublicKey, Secp256k1, SecretKey, SignOnly};
use std::sync::LazyLock;
use zcash_encoding::Vector;

use crate::wallet::traits::ReadableWriteable;

static SECP256K1_SIGN_ONLY: LazyLock<Secp256k1<SignOnly>> = LazyLock::new(Secp256k1::signing_only);
//static SECP256K1_VERIFY_ONLY: LazyLock<Secp256k1<VerifyOnly>> = LazyLock::new(|| Secp256k1::verification_only());
/// Random entropy, part of extended key.
type ChainCode = Vec<u8>;

const HARDENED_KEY_START_INDEX: u32 = 2_147_483_648; // 2 ** 31

/// `KeyIndex` indicates the key type and index of a child key.
#[derive(Debug, Copy, Clone, Eq, PartialEq)]
pub enum KeyIndex {
    /// Normal key, index range is from 0 to 2 ** 31 - 1
    Normal(u32),
    /// Hardened key, index range is from 2 ** 31 to 2 ** 32 - 1
    Hardened(u32),
}

impl KeyIndex {
    /// Check index range.
    #[must_use]
    pub fn is_valid(self) -> bool {
        match self {
            KeyIndex::Normal(i) => i < HARDENED_KEY_START_INDEX,
            KeyIndex::Hardened(i) => i >= HARDENED_KEY_START_INDEX,
        }
    }

    /// Generate Hardened `KeyIndex` from normalize index value.
    pub fn hardened_from_normalize_index(i: u32) -> Result<KeyIndex, Error> {
        if i < HARDENED_KEY_START_INDEX {
            Ok(KeyIndex::Hardened(HARDENED_KEY_START_INDEX + i))
        } else {
            Ok(KeyIndex::Hardened(i))
        }
    }

    /// Generate `KeyIndex` from raw index value.
    #[must_use]
    pub fn from_index(i: u32) -> Self {
        if i < HARDENED_KEY_START_INDEX {
            KeyIndex::Normal(i)
        } else {
            KeyIndex::Hardened(i)
        }
    }
}

impl From<u32> for KeyIndex {
    fn from(index: u32) -> Self {
        KeyIndex::from_index(index)
    }
}

/// `ExtendedPrivKey` is used for child key derivation.
/// See [secp256k1 crate documentation](https://docs.rs/secp256k1) for `SecretKey` signatures usage.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ExtendedPrivKey {
    /// TODO: Add Doc Comment Here!
    pub private_key: SecretKey,
    /// TODO: Add Doc Comment Here!
    pub chain_code: ChainCode,
}

// Uses type inference from return to get 32 byte chunk size
// the argument MUST be 32 bytes or this is unsafe
fn get_32_byte_key_chunk_and_cc(signature: ring::hmac::Tag) -> ([u8; 32], Vec<u8>) {
    let (k, cc) = signature
        .as_ref()
        .split_first_chunk()
        .expect("signature.len >= 32");
    (*k, cc.to_vec())
}
impl ExtendedPrivKey {
    /// Generate an `ExtendedPrivKey` from seed
    pub fn with_seed(seed: &[u8]) -> Result<ExtendedPrivKey, Error> {
        let signature = {
            let signing_key = Key::new(hmac::HMAC_SHA512, b"Bitcoin seed");
            let mut h = Context::with_key(&signing_key);
            h.update(seed);
            h.sign()
        };
        let (key, chain_code) = get_32_byte_key_chunk_and_cc(signature);
        let private_key = SecretKey::from_byte_array(key)?;
        Ok(ExtendedPrivKey {
            private_key,
            chain_code,
        })
    }

    /// TODO: Add Doc Comment Here!
    #[must_use]
    pub fn get_ext_taddr_from_bip39seed(
        config: &ClientConfig,
        bip39_seed: &[u8],
        position: u32,
    ) -> Self {
        assert_eq!(bip39_seed.len(), 64);

        let ext_t_key = ExtendedPrivKey::with_seed(bip39_seed).unwrap();
        ext_t_key
            .derive_private_key(KeyIndex::hardened_from_normalize_index(44).unwrap())
            .unwrap()
            .derive_private_key(
                KeyIndex::hardened_from_normalize_index(config.chain_type().coin_type()).unwrap(),
            )
            .unwrap()
            .derive_private_key(KeyIndex::hardened_from_normalize_index(position).unwrap())
            .unwrap()
            .derive_private_key(KeyIndex::Normal(0))
            .unwrap()
    }

    fn sign_hardened_key(&self, index: u32) -> ring::hmac::Tag {
        let signing_key = Key::new(hmac::HMAC_SHA512, &self.chain_code);
        let mut h = Context::with_key(&signing_key);
        h.update(&[0x00]);
        h.update(&self.private_key[..]);
        h.update(&index.to_be_bytes());
        h.sign()
    }

    fn sign_normal_key(&self, index: u32) -> ring::hmac::Tag {
        let signing_key = Key::new(hmac::HMAC_SHA512, &self.chain_code);
        let mut h = Context::with_key(&signing_key);
        let public_key = PublicKey::from_secret_key(&SECP256K1_SIGN_ONLY, &self.private_key);
        h.update(&public_key.serialize());
        h.update(&index.to_be_bytes());
        h.sign()
    }

    /// Derive a child key from `ExtendedPrivKey`.
    pub fn derive_private_key(&self, key_index: KeyIndex) -> Result<ExtendedPrivKey, Error> {
        if !key_index.is_valid() {
            return Err(Error::InvalidTweak);
        }
        let signature = match key_index {
            KeyIndex::Hardened(index) => self.sign_hardened_key(index),
            KeyIndex::Normal(index) => self.sign_normal_key(index),
        };
        let (key, chain_code) = get_32_byte_key_chunk_and_cc(signature);
        let private_key = SecretKey::from_byte_array(key)?;
        let tweak = secp256k1::Scalar::from(self.private_key);
        let tweaked_private_key = private_key.add_tweak(&tweak)?;
        Ok(ExtendedPrivKey {
            private_key: tweaked_private_key,
            chain_code,
        })
    }
}

impl ReadableWriteable for SecretKey {
    const VERSION: u8 = 0; // not applicable
    fn read<R: std::io::Read>(mut reader: R, (): ()) -> std::io::Result<Self> {
        let mut secret_key_bytes = [0; 32];
        reader.read_exact(&mut secret_key_bytes)?;
        SecretKey::from_byte_array(secret_key_bytes)
            .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e.to_string()))
    }

    fn write<W: std::io::Write>(&self, mut _writer: W, _input: ()) -> std::io::Result<()> {
        unimplemented!()
    }
}

impl ReadableWriteable for ExtendedPrivKey {
    const VERSION: u8 = 1;

    fn read<R: std::io::Read>(mut reader: R, (): ()) -> std::io::Result<Self> {
        Self::get_version(&mut reader)?;
        let private_key = SecretKey::read(&mut reader, ())?;
        let chain_code = Vector::read(&mut reader, byteorder::ReadBytesExt::read_u8)?;
        Ok(Self {
            private_key,
            chain_code,
        })
    }

    fn write<W: std::io::Write>(&self, mut _writer: W, _input: ()) -> std::io::Result<()> {
        unimplemented!()
    }
}

/// `ExtendedPubKey` is used for child pub key derivation in watch-only mode
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ExtendedPubKey {
    /// TODO: Add Doc Comment Here!
    pub public_key: PublicKey,
    /// TODO: Add Doc Comment Here!
    pub chain_code: ChainCode,
}

impl ExtendedPubKey {
    fn sign_normal_key(&self, index: u32) -> ring::hmac::Tag {
        let signing_key = Key::new(hmac::HMAC_SHA512, &self.chain_code);
        let mut h = Context::with_key(&signing_key);
        h.update(&self.public_key.serialize());
        h.update(&index.to_be_bytes());
        h.sign()
    }

    /// Derive a child key from `ExtendedPubKey`.
    pub fn derive_public_key(&self, key_index: KeyIndex) -> Result<ExtendedPubKey, Error> {
        if !key_index.is_valid() {
            return Err(Error::InvalidTweak);
        }
        let signature = match key_index {
            KeyIndex::Hardened(_) => return Err(Error::InvalidTweak),
            KeyIndex::Normal(index) => self.sign_normal_key(index),
        };
        let (key, chain_code) = get_32_byte_key_chunk_and_cc(signature);
        let new_sk = SecretKey::from_byte_array(key)?;
        let new_pk = PublicKey::from_secret_key(&Secp256k1::new(), &new_sk);
        Ok(Self {
            public_key: new_pk.combine(&self.public_key)?,
            chain_code,
        })
    }
}

impl ReadableWriteable for PublicKey {
    const VERSION: u8 = 0; // not applicable
    fn read<R: std::io::Read>(mut reader: R, (): ()) -> std::io::Result<Self> {
        let mut public_key_bytes = [0; 33];
        reader.read_exact(&mut public_key_bytes)?;
        PublicKey::from_slice(&public_key_bytes)
            .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e.to_string()))
    }

    fn write<W: std::io::Write>(&self, mut _writer: W, _input: ()) -> std::io::Result<()> {
        unimplemented!()
    }
}

impl ReadableWriteable for ExtendedPubKey {
    const VERSION: u8 = 1;

    fn read<R: std::io::Read>(mut reader: R, _input: ()) -> std::io::Result<Self> {
        Self::get_version(&mut reader)?;
        let public_key = PublicKey::read(&mut reader, ())?;
        let chain_code = Vector::read(&mut reader, byteorder::ReadBytesExt::read_u8)?;
        Ok(Self {
            public_key,
            chain_code,
        })
    }

    fn write<W: std::io::Write>(&self, mut _writer: W, _input: ()) -> std::io::Result<()> {
        unimplemented!()
    }
}

impl From<&ExtendedPrivKey> for ExtendedPubKey {
    fn from(sk: &ExtendedPrivKey) -> Self {
        let secp = Secp256k1::new();
        ExtendedPubKey {
            public_key: PublicKey::from_secret_key(&secp, &sk.private_key),
            chain_code: sk.chain_code.clone(),
        }
    }
}

#[test]
fn test_commutativity_of_key_derivation_mechanisms() {
    // sk ---> sk_i
    //  |       |
    //  v       v
    // pk ---> pk_i

    // initial key derivation material
    let i = KeyIndex::from_index(42);
    let sk = ExtendedPrivKey::with_seed(&[0xcd; 64]).unwrap();

    // sk -> sk_i -> pk_i derivation
    let sk_i = sk.derive_private_key(i).unwrap();
    let pk_i = ExtendedPubKey::from(&sk_i);

    // sk -> pk -> pk_i derivation
    let pk = ExtendedPubKey::from(&sk);
    let pk_i_ = pk.derive_public_key(i).unwrap();

    assert_eq!(pk_i, pk_i_);
}

#[test]
fn test_sign_and_verify_with_derived_key() {
    // Show standard sign/verify algoritms work
    let secp = Secp256k1::new();

    // derive a child key pair
    // 0xcd = 11001101: alternating bit pattern used as deterministic test seed
    let sk = ExtendedPrivKey::with_seed(&[0xcd; 64]).unwrap();
    let sk_i = sk
        .derive_private_key(KeyIndex::hardened_from_normalize_index(44).unwrap())
        .unwrap()
        .derive_private_key(KeyIndex::Normal(0))
        .unwrap();
    let pk_i = ExtendedPubKey::from(&sk_i);

    // sign a message: "Hello World" zero-padded to 32 bytes
    let mut digest = [0u8; 32];
    digest[..11].copy_from_slice(b"Hello World");
    let msg = secp256k1::Message::from_digest(digest);
    let sig = secp.sign_ecdsa(msg, &sk_i.private_key);

    // verify succeeds with the correct public key
    assert!(secp.verify_ecdsa(msg, &sig, &pk_i.public_key).is_ok());

    // verify fails with a different key
    // 0xef = 11101111: distinct bit pattern to produce an unrelated key pair
    let other_sk = ExtendedPrivKey::with_seed(&[0xef; 64]).unwrap();
    let other_pk = ExtendedPubKey::from(&other_sk);
    assert!(secp.verify_ecdsa(msg, &sig, &other_pk.public_key).is_err());
}
