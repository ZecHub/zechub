//! ZHAC key derivation, diversifier hashing, and wallet-format types.
//!
//! Implements a Sapling-compatible key hierarchy with true DiversifyHash,
//! RedJubjub SpendAuth signing keys, and BLAKE2b-based key derivation.
//!
//! ```text
//!   sk (32 random bytes)
//!    ├── BLAKE2b("ZHAC-ask", sk) → ask     ── encryption scalar
//!    ├── BLAKE2b("ZHAC-nsk", sk) → nsk     ── nullifier scalar
//!    └── BLAKE2b("ZHAC-sign",sk) → sig_sk  ── RedJubjub signing scalar
//!
//!   ak = [ask]·G        nk = [nsk]·G
//!   ivk = BLAKE2b("ZHAC-ivk", ak ‖ nk)
//!
//!   d   = random 11-byte diversifier
//!   g_d = DiversifyHash(d)                   ── hash-derived base point + scalar mul
//!   pk_d = [ivk]·g_d
//!
//!   sig_vk = RedJubjub::SpendAuth::VerificationKey(sig_sk)
//! ```

use core::fmt;

use blake2b_simd::Params as Blake2bParams;
use blake2s_simd::Params as Blake2sParams;
use ff::{Field, PrimeField};
use group::{cofactor::CofactorGroup, Group, GroupEncoding};
use jubjub::{AffinePoint, ExtendedPoint, Fr, SubgroupPoint};
use rand::RngCore;
use zeroize::Zeroize;

use crate::encoding::{self, EncodingVariant};
use crate::{Result, ZhacError};

// ── Constants ──────────────────────────────────────────────────────────────

const ZHAC_PRF_ASK: &[u8] = b"ZHAC-ask";
const ZHAC_PRF_NSK: &[u8] = b"ZHAC-nsk";
const ZHAC_PRF_SIGN: &[u8] = b"ZHAC-sign";
const ZHAC_PRF_IVK: &[u8] = b"ZHAC-ivk";

const HRP_PUBLIC: &str = "zhac";
const HRP_SECRET: &str = "zhacsecret";
const HRP_VIEWING: &str = "zhacview";

pub const DIVERSIFIER_LEN: usize = 11;
pub const JUBJUB_COMPRESSED_LEN: usize = 32;
pub const SK_LEN: usize = 32;

const CIPHERTEXT_VERSION: u8 = 1;
const MULTI_CIPHERTEXT_VERSION: u8 = 2;
const SIGNATURE_VERSION: u8 = 1;

// ── BLAKE2b helper ─────────────────────────────────────────────────────────

pub fn hash_to_scalar(domain: &[u8], data: &[u8]) -> Fr {
    let mut personal = [0u8; 16];
    let copy_len = domain.len().min(16);
    personal[..copy_len].copy_from_slice(&domain[..copy_len]);
    let digest = Blake2bParams::new()
        .hash_length(64)
        .personal(&personal)
        .hash(data);
    let wide: [u8; 64] = digest.as_bytes().try_into().expect("64-byte digest");
    Fr::from_bytes_wide(&wide)
}

// ── True DiversifyHash (try-and-increment hash-to-curve) ────────────────────

/// Map an 11-byte diversifier to a prime-order Jubjub point.
///
/// Uses the Zcash specification's try-and-increment approach: hash
/// (diversifier ‖ counter) with BLAKE2s, interpret as an Edwards
/// v-coordinate, solve for u on the Jubjub curve equation, then clear
/// the cofactor. This produces points with unknown discrete log
/// relative to each other, preserving unlinkability across diversified
/// addresses.
pub fn diversify_hash(d: &[u8; DIVERSIFIER_LEN]) -> Result<SubgroupPoint> {
    use jubjub::Fq;

    for j in 0u8..=255 {
        let mut input = [0u8; DIVERSIFIER_LEN + 1];
        input[..DIVERSIFIER_LEN].copy_from_slice(d);
        input[DIVERSIFIER_LEN] = j;

        let digest = Blake2sParams::new()
            .hash_length(32)
            .personal(b"ZHAC_DvH")
            .hash(&input);

        let v = Fq::from_bytes(digest.as_bytes().try_into().expect("32-byte digest")).into_option();
        if v.is_none() {
            continue;
        }
        let v = v.unwrap();

        let v2 = v.square();
        let numerator = v2 - Fq::one();
        let denominator = Fq::one() + edwards_d() * v2;

        let Some(denom_inv) = denominator.invert().into_option() else {
            continue;
        };

        let u_sq = numerator * denom_inv;

        if let Some(u) = u_sq.sqrt().into_option() {
            let affine = AffinePoint::from_raw_unchecked(u, v);
            let ext: ExtendedPoint = affine.into();
            let sub = ext.clear_cofactor();
            if bool::from(!sub.is_identity()) {
                return Ok(sub);
            }
        }
    }
    Err(ZhacError::Crypto(
        "DiversifyHash: all 256 attempts failed".into(),
    ))
}

/// Jubjub curve constant d = -(10240/10241).
/// Ideally this would be `const`, but Fq::invert() is not yet const-stable
/// in the current jubjub release. The value is cached after first call.
pub fn edwards_d() -> jubjub::Fq {
    -jubjub::Fq::from(10240u64) * jubjub::Fq::from(10241u64).invert().unwrap()
}

// ── Spending key seed ──────────────────────────────────────────────────────

#[derive(Clone, Zeroize)]
#[zeroize(drop)]
pub struct ZhacKeySeed {
    pub bytes: [u8; SK_LEN],
}

impl ZhacKeySeed {
    /// Generate a random 32-byte seed using the OS CSPRNG.
    pub fn generate() -> Self {
        let mut bytes = [0u8; SK_LEN];
        rand::rngs::OsRng.fill_bytes(&mut bytes);
        Self { bytes }
    }
    pub fn from_bytes(bytes: [u8; SK_LEN]) -> Self {
        Self { bytes }
    }
    pub fn as_bytes(&self) -> &[u8; SK_LEN] {
        &self.bytes
    }
    pub fn to_hex(&self) -> String {
        hex::encode(self.bytes)
    }
    pub fn from_hex(s: &str) -> Result<Self> {
        let bytes =
            hex::decode(s).map_err(|e| ZhacError::InvalidKey(format!("hex decode: {e}")))?;
        if bytes.len() != SK_LEN {
            return Err(ZhacError::InvalidKey(format!(
                "expected {SK_LEN} bytes, got {}",
                bytes.len()
            )));
        }
        let mut arr = [0u8; SK_LEN];
        arr.copy_from_slice(&bytes);
        Ok(Self { bytes: arr })
    }
}

impl fmt::Debug for ZhacKeySeed {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str("ZhacKeySeed(<redacted>)")
    }
}

// ── Public key ─────────────────────────────────────────────────────────────

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ZhacPublicKey {
    pub d: [u8; DIVERSIFIER_LEN],
    pub pk_d: SubgroupPoint,
    pub sig_vk: SubgroupPoint,
}

const PUBKEY_DATA_LEN: usize = DIVERSIFIER_LEN + JUBJUB_COMPRESSED_LEN * 2;

impl ZhacPublicKey {
    pub fn to_zhac_address(&self) -> String {
        let mut data = Vec::with_capacity(PUBKEY_DATA_LEN);
        data.extend_from_slice(&self.d);
        data.extend_from_slice(&self.pk_d.to_bytes());
        data.extend_from_slice(&self.sig_vk.to_bytes());
        encoding::encode(HRP_PUBLIC, &data, EncodingVariant::Bech32m)
            .expect("encoding: fixed-size key data always fits bech32 limits")
    }

    /// Compute the key fingerprint: BLAKE2b-160 of the public key data.
    pub fn fingerprint(&self) -> [u8; 20] {
        let mut data = Vec::with_capacity(PUBKEY_DATA_LEN);
        data.extend_from_slice(&self.d);
        data.extend_from_slice(&self.pk_d.to_bytes());
        data.extend_from_slice(&self.sig_vk.to_bytes());
        let digest = Blake2bParams::new().hash_length(20).hash(&data);
        let mut fp = [0u8; 20];
        fp.copy_from_slice(digest.as_bytes());
        fp
    }

    /// Format the fingerprint as grouped hex (GPG-style).
    pub fn fingerprint_hex(&self) -> String {
        let fp = self.fingerprint();
        let hex = hex::encode(fp).to_uppercase();
        let groups: Vec<String> = (0..10).map(|i| hex[i * 4..i * 4 + 4].to_string()).collect();
        groups.join(" ")
    }

    /// Short key ID: last 8 hex chars of the fingerprint (4 bytes).
    pub fn key_id(&self) -> String {
        let fp = self.fingerprint();
        hex::encode(&fp[16..20]).to_uppercase()
    }

    pub fn from_zhac_address(s: &str) -> Result<Self> {
        let (hrp, data, _variant) = encoding::decode(s)?;
        if hrp != HRP_PUBLIC {
            return Err(ZhacError::Encoding(format!(
                "expected HRP '{HRP_PUBLIC}', got '{hrp}'"
            )));
        }
        if data.len() != PUBKEY_DATA_LEN {
            return Err(ZhacError::InvalidKey(format!(
                "expected {PUBKEY_DATA_LEN} bytes, got {}",
                data.len()
            )));
        }
        let d = read_fixed::<DIVERSIFIER_LEN>(&data, 0)?;
        let pk_d_bytes = read_fixed::<JUBJUB_COMPRESSED_LEN>(&data, DIVERSIFIER_LEN)?;
        let sig_vk_bytes =
            read_fixed::<JUBJUB_COMPRESSED_LEN>(&data, DIVERSIFIER_LEN + JUBJUB_COMPRESSED_LEN)?;
        let pk_d = SubgroupPoint::from_bytes(&pk_d_bytes)
            .into_option()
            .ok_or_else(|| ZhacError::InvalidKey("pk_d: invalid Jubjub subgroup point".into()))?;
        let sig_vk = SubgroupPoint::from_bytes(&sig_vk_bytes)
            .into_option()
            .ok_or_else(|| ZhacError::InvalidKey("sig_vk: invalid Jubjub subgroup point".into()))?;
        Ok(Self { d, pk_d, sig_vk })
    }
}

// ── Viewing key ────────────────────────────────────────────────────────────

#[derive(Clone, Debug)]
pub struct ZhacViewingKey {
    pub ivk: Fr,
    pub pk_d: SubgroupPoint,
    pub d: [u8; DIVERSIFIER_LEN],
}

impl ZhacViewingKey {
    pub fn to_zhac_viewing_key(&self) -> String {
        let mut data = Vec::with_capacity(32 + 32 + 11);
        data.extend_from_slice(&self.ivk.to_repr());
        data.extend_from_slice(&self.pk_d.to_bytes());
        data.extend_from_slice(&self.d);
        encoding::encode(HRP_VIEWING, &data, EncodingVariant::Bech32m)
            .expect("encoding: fixed-size key data always fits bech32 limits")
    }

    /// Parse a viewing key from a Bech32m `zhacview1…` string.
    pub fn from_zhac_viewing_key(s: &str) -> Result<Self> {
        let (hrp, data, _variant) = encoding::decode(s)?;
        if hrp != HRP_VIEWING {
            return Err(ZhacError::Encoding(format!(
                "expected HRP '{HRP_VIEWING}', got '{hrp}'"
            )));
        }
        if data.len() != 32 + 32 + DIVERSIFIER_LEN {
            return Err(ZhacError::InvalidKey(format!(
                "expected {} bytes, got {}",
                32 + 32 + DIVERSIFIER_LEN,
                data.len()
            )));
        }
        let ivk_repr = read_fixed::<32>(&data, 0)?;
        let pk_d_bytes = read_fixed::<JUBJUB_COMPRESSED_LEN>(&data, 32)?;
        let d = read_fixed::<DIVERSIFIER_LEN>(&data, 64)?;
        let ivk = Fr::from_repr(ivk_repr)
            .into_option()
            .ok_or_else(|| ZhacError::InvalidKey("ivk: invalid scalar".into()))?;
        let pk_d = SubgroupPoint::from_bytes(&pk_d_bytes)
            .into_option()
            .ok_or_else(|| ZhacError::InvalidKey("pk_d: invalid Jubjub subgroup point".into()))?;
        Ok(Self { ivk, pk_d, d })
    }
}

// ── Private key ────────────────────────────────────────────────────────────

#[derive(Clone)]
pub struct ZhacPrivateKey {
    pub sk: [u8; SK_LEN],
    pub ask: Fr,
    pub nsk: Fr,
    pub sig_sk: Fr,
}

impl Drop for ZhacPrivateKey {
    fn drop(&mut self) {
        self.sk.zeroize();
        self.ask = Fr::ZERO;
        self.nsk = Fr::ZERO;
        self.sig_sk = Fr::ZERO;
    }
}

impl ZhacPrivateKey {
    pub fn from_seed(seed: &ZhacKeySeed) -> Self {
        let ask = hash_to_scalar(ZHAC_PRF_ASK, &seed.bytes);
        let nsk = hash_to_scalar(ZHAC_PRF_NSK, &seed.bytes);
        let sig_sk = hash_to_scalar(ZHAC_PRF_SIGN, &seed.bytes);
        Self {
            sk: seed.bytes,
            ask,
            nsk,
            sig_sk,
        }
    }
    pub fn spending_key_bytes(&self) -> &[u8; SK_LEN] {
        &self.sk
    }
    pub(crate) fn signing_scalar(&self) -> &Fr {
        &self.sig_sk
    }

    pub fn compute_ivk(&self) -> Fr {
        let ak = (ExtendedPoint::generator() * self.ask).to_bytes();
        let nk = (ExtendedPoint::generator() * self.nsk).to_bytes();
        let mut preimage = Vec::with_capacity(ak.len() + nk.len());
        preimage.extend_from_slice(&ak);
        preimage.extend_from_slice(&nk);
        hash_to_scalar(ZHAC_PRF_IVK, &preimage)
    }

    pub fn to_public_key(&self, diversifier: &[u8; DIVERSIFIER_LEN]) -> Result<ZhacPublicKey> {
        let ivk = self.compute_ivk();
        let g_d = diversify_hash(diversifier)?;
        let pk_d = g_d * ivk;

        let sig_vk = {
            let sk = redjubjub::SigningKey::<redjubjub::SpendAuth>::try_from(self.sig_sk.to_repr())
                .map_err(|e| ZhacError::InvalidKey(format!("invalid signing scalar: {e}")))?;
            let vk_bytes: [u8; 32] =
                redjubjub::VerificationKey::<redjubjub::SpendAuth>::from(&sk).into();
            SubgroupPoint::from_bytes(&vk_bytes)
                .into_option()
                .ok_or_else(|| ZhacError::InvalidKey("vk bytes from RedJubjub invalid".into()))?
        };
        Ok(ZhacPublicKey {
            d: *diversifier,
            pk_d,
            sig_vk,
        })
    }

    pub fn to_random_public_key(&self, rng: &mut impl RngCore) -> Result<ZhacPublicKey> {
        let mut d = [0u8; DIVERSIFIER_LEN];
        rng.fill_bytes(&mut d);
        self.to_public_key(&d)
    }

    pub fn to_viewing_key(&self, diversifier: &[u8; DIVERSIFIER_LEN]) -> Result<ZhacViewingKey> {
        let ivk = self.compute_ivk();
        let g_d = diversify_hash(diversifier)?;
        let pk_d = g_d * ivk;
        Ok(ZhacViewingKey {
            ivk,
            pk_d,
            d: *diversifier,
        })
    }

    pub fn to_zhac_secret(&self) -> String {
        let mut data = Vec::with_capacity(SK_LEN);
        data.extend_from_slice(&self.sk);
        encoding::encode(HRP_SECRET, &data, EncodingVariant::Bech32m)
            .expect("encoding: fixed-size key data always fits bech32 limits")
    }

    pub fn from_zhac_secret(s: &str) -> Result<Self> {
        let (hrp, data, _variant) = encoding::decode(s)?;
        if hrp != HRP_SECRET {
            return Err(ZhacError::Encoding(format!(
                "expected HRP '{HRP_SECRET}', got '{hrp}'"
            )));
        }
        if data.len() != SK_LEN {
            return Err(ZhacError::InvalidKey(format!(
                "expected {SK_LEN} bytes, got {}",
                data.len()
            )));
        }
        let sk = read_fixed::<SK_LEN>(&data, 0)?;
        let seed = ZhacKeySeed::from_bytes(sk);
        Ok(Self::from_seed(&seed))
    }
}

impl fmt::Debug for ZhacPrivateKey {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str("ZhacPrivateKey(<redacted>)")
    }
}

// ── Convenience key-pair ───────────────────────────────────────────────────

pub struct ZhacKeyPair {
    pub private_key: ZhacPrivateKey,
    pub public_key: ZhacPublicKey,
}

impl ZhacKeyPair {
    pub fn generate() -> Result<(Self, ZhacKeySeed)> {
        let seed = ZhacKeySeed::generate();
        let private_key = ZhacPrivateKey::from_seed(&seed);
        let public_key = private_key.to_random_public_key(&mut rand::rngs::OsRng)?;
        Ok((
            Self {
                private_key,
                public_key,
            },
            seed,
        ))
    }

    /// Generate a key-pair from a specific seed (for import-seed).
    /// Uses a random diversifier derived from the seed itself.
    pub fn generate_from_seed(seed: &ZhacKeySeed) -> Result<(Self, ZhacKeySeed)> {
        let private_key = ZhacPrivateKey::from_seed(seed);
        let div_hash = Blake2bParams::new()
            .hash_length(11)
            .personal(b"ZHAC_DvD")
            .hash(seed.as_bytes());
        let mut d = [0u8; DIVERSIFIER_LEN];
        d.copy_from_slice(div_hash.as_bytes());
        let public_key = private_key.to_public_key(&d)?;
        Ok((
            Self {
                private_key,
                public_key,
            },
            ZhacKeySeed::from_bytes(seed.bytes),
        ))
    }

    pub fn from_seed(seed: &ZhacKeySeed, diversifier: &[u8; DIVERSIFIER_LEN]) -> Result<Self> {
        let private_key = ZhacPrivateKey::from_seed(seed);
        let public_key = private_key.to_public_key(diversifier)?;
        Ok(Self {
            private_key,
            public_key,
        })
    }
}

// ── Ciphertext type ────────────────────────────────────────────────────────

#[derive(Clone, Debug)]
pub struct ZhacCiphertext {
    pub d: [u8; DIVERSIFIER_LEN],
    pub ephemeral_key: [u8; JUBJUB_COMPRESSED_LEN],
    pub nonce: [u8; 12],
    pub data: Vec<u8>,
}

impl ZhacCiphertext {
    pub fn to_bytes(&self) -> Vec<u8> {
        let mut out = Vec::with_capacity(1 + 11 + 32 + 12 + self.data.len());
        out.push(CIPHERTEXT_VERSION);
        out.extend_from_slice(&self.d);
        out.extend_from_slice(&self.ephemeral_key);
        out.extend_from_slice(&self.nonce);
        out.extend_from_slice(&self.data);
        out
    }
    pub fn from_bytes(bytes: &[u8]) -> Result<Self> {
        if bytes.len() < 56 {
            return Err(ZhacError::Format("ciphertext too short".into()));
        }
        if bytes[0] != CIPHERTEXT_VERSION {
            return Err(ZhacError::Format(format!(
                "unsupported ciphertext version {}",
                bytes[0]
            )));
        }
        let d = read_fixed::<11>(bytes, 1)?;
        let ephemeral_key = read_fixed::<32>(bytes, 12)?;
        let nonce = read_fixed::<12>(bytes, 44)?;
        let data = bytes[56..].to_vec();
        Ok(Self {
            d,
            ephemeral_key,
            nonce,
            data,
        })
    }
}

// ── Multi-recipient ciphertext type ─────────────────────────────────────────

/// Per-recipient header: DEK encrypted via DH-KA for one recipient.
#[derive(Clone, Debug)]
pub struct RecipientHeader {
    pub d: [u8; DIVERSIFIER_LEN],
    pub ephemeral_key: [u8; JUBJUB_COMPRESSED_LEN],
    pub nonce: [u8; 12],
    pub encrypted_dek: [u8; 48], // 32-byte DEK + 16-byte Poly1305 tag
}

/// Multi-recipient ciphertext: one payload encrypted with a random DEK,
/// plus per-recipient headers each containing the DEK encrypted via DH-KA.
///
/// Format: `version(1) | num_recipients(1) | [header...] | nonce(12) | payload`
#[derive(Clone, Debug)]
pub struct ZhacMultiCiphertext {
    pub headers: Vec<RecipientHeader>,
    pub nonce: [u8; 12],
    pub data: Vec<u8>,
}

const HEADER_LEN: usize = DIVERSIFIER_LEN + JUBJUB_COMPRESSED_LEN + 12 + 48;

impl ZhacMultiCiphertext {
    pub fn to_bytes(&self) -> Vec<u8> {
        let mut out =
            Vec::with_capacity(2 + self.headers.len() * HEADER_LEN + 12 + self.data.len());
        out.push(MULTI_CIPHERTEXT_VERSION);
        out.push(self.headers.len() as u8);
        for h in &self.headers {
            out.extend_from_slice(&h.d);
            out.extend_from_slice(&h.ephemeral_key);
            out.extend_from_slice(&h.nonce);
            out.extend_from_slice(&h.encrypted_dek);
        }
        out.extend_from_slice(&self.nonce);
        out.extend_from_slice(&self.data);
        out
    }

    pub fn from_bytes(bytes: &[u8]) -> Result<Self> {
        if bytes.len() < 2 {
            return Err(ZhacError::Format("multi-ciphertext too short".into()));
        }
        if bytes[0] != MULTI_CIPHERTEXT_VERSION {
            return Err(ZhacError::Format(format!(
                "unsupported multi-ciphertext version {}",
                bytes[0]
            )));
        }
        let num = bytes[1] as usize;
        let needed = 2 + num * HEADER_LEN + 12;
        if bytes.len() < needed {
            return Err(ZhacError::Format(format!(
                "multi-ciphertext too short: need {needed}, got {}",
                bytes.len()
            )));
        }
        let mut off = 2;
        let mut headers = Vec::with_capacity(num);
        for _ in 0..num {
            let d = read_fixed::<DIVERSIFIER_LEN>(bytes, off)?;
            off += DIVERSIFIER_LEN;
            let ephemeral_key = read_fixed::<JUBJUB_COMPRESSED_LEN>(bytes, off)?;
            off += JUBJUB_COMPRESSED_LEN;
            let nonce = read_fixed::<12>(bytes, off)?;
            off += 12;
            let encrypted_dek = read_fixed::<48>(bytes, off)?;
            off += 48;
            headers.push(RecipientHeader {
                d,
                ephemeral_key,
                nonce,
                encrypted_dek,
            });
        }
        let nonce = read_fixed::<12>(bytes, off)?;
        off += 12;
        let data = bytes[off..].to_vec();
        Ok(Self {
            headers,
            nonce,
            data,
        })
    }
}

// ── Signature type ─────────────────────────────────────────────────────────

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ZhacSignature {
    pub r_bytes: [u8; 32],
    pub s_bytes: [u8; 32],
}

impl ZhacSignature {
    pub fn to_bytes(&self) -> Vec<u8> {
        let mut out = Vec::with_capacity(1 + 64);
        out.push(SIGNATURE_VERSION);
        out.extend_from_slice(&self.r_bytes);
        out.extend_from_slice(&self.s_bytes);
        out
    }
    pub fn from_bytes(bytes: &[u8]) -> Result<Self> {
        if bytes.len() != 65 {
            return Err(ZhacError::Signature(
                "signature must be exactly 65 bytes".into(),
            ));
        }
        if bytes[0] != SIGNATURE_VERSION {
            return Err(ZhacError::Signature(format!(
                "unsupported signature version {}",
                bytes[0]
            )));
        }
        let r_bytes = read_fixed::<32>(bytes, 1)?;
        let s_bytes = read_fixed::<32>(bytes, 33)?;
        Ok(Self { r_bytes, s_bytes })
    }
}

// ── Internal helpers ───────────────────────────────────────────────────────

pub fn read_fixed<const N: usize>(bytes: &[u8], offset: usize) -> Result<[u8; N]> {
    if offset + N > bytes.len() {
        return Err(ZhacError::Format(format!(
            "buffer too short: need {} bytes at offset {}, have {}",
            N,
            offset,
            bytes.len()
        )));
    }
    let mut arr = [0u8; N];
    arr.copy_from_slice(&bytes[offset..offset + N]);
    Ok(arr)
}

/// Write a file with restrictive permissions (0600 on Unix).
///
/// Ensures private keys, seeds, and nonce files are not world-readable.
pub fn write_file_secure(path: &std::path::Path, data: &[u8]) -> Result<()> {
    #[cfg(unix)]
    {
        use std::fs::OpenOptions;
        use std::io::Write;
        use std::os::unix::fs::OpenOptionsExt;
        let mut file = OpenOptions::new()
            .write(true)
            .create(true)
            .truncate(true)
            .mode(0o600)
            .open(path)?;
        file.write_all(data)?;
        Ok(())
    }
    #[cfg(not(unix))]
    {
        std::fs::write(path, data)?;
        Ok(())
    }
}

// ── Passphrase-based key encryption at rest ─────────────────────────────────

const KEY_ENC_INFO: &[u8] = b"ZHAC-v1-key-encryption";
const KEY_ENC_VERSION: u8 = 2;

/// Encrypt a private key string (Bech32m `zhacsecret1…`) with a passphrase.
///
/// Derives a 256-bit key from the passphrase via Argon2id (memory-hard
/// KDF) with a random 16-byte salt, then encrypts with ChaCha20Poly1305.
/// Returns a hex-encoded `v2:salt:nonce:ciphertext` blob suitable for
/// PEM-style storage.
pub fn encrypt_private_key(priv_key_str: &str, passphrase: &str) -> Result<String> {
    use chacha20poly1305::aead::{Aead, KeyInit, OsRng};
    use chacha20poly1305::ChaCha20Poly1305;

    let mut salt = [0u8; 16];
    OsRng.fill_bytes(&mut salt);

    let argon2_key = argon2id_derive(passphrase, &salt)?;

    let mut nonce = [0u8; 12];
    OsRng.fill_bytes(&mut nonce);

    let cipher = ChaCha20Poly1305::new_from_slice(&argon2_key)
        .map_err(|e| ZhacError::Crypto(format!("cipher: {e}")))?;
    let ct = cipher
        .encrypt((&nonce).into(), priv_key_str.as_bytes())
        .map_err(|e| ZhacError::Crypto(format!("encrypt: {e}")))?;

    Ok(format!(
        "v{}:{}:{}:{}",
        KEY_ENC_VERSION,
        hex::encode(salt),
        hex::encode(nonce),
        hex::encode(&ct)
    ))
}

/// Decrypt a passphrase-encrypted private key blob.
///
/// Supports both v2 (Argon2id) and v1 (HKDF, legacy) formats.
/// Returns the Bech32m `zhacsecret1…` string.  Fails if the passphrase
/// is wrong (ChaCha20Poly1305 authentication tag mismatch).
pub fn decrypt_private_key(encrypted: &str, passphrase: &str) -> Result<String> {
    let trimmed = encrypted.trim();

    // Check for version prefix
    if let Some(rest) = trimmed.strip_prefix("v2:") {
        return decrypt_private_key_v2(rest, passphrase);
    }

    // Legacy v1 format (no version prefix): salt:nonce:ciphertext with raw HKDF
    decrypt_private_key_v1(trimmed, passphrase)
}

pub fn decrypt_private_key_v2(rest: &str, passphrase: &str) -> Result<String> {
    use chacha20poly1305::aead::{Aead, KeyInit};
    use chacha20poly1305::ChaCha20Poly1305;

    let parts: Vec<&str> = rest.split(':').collect();
    if parts.len() != 3 {
        return Err(ZhacError::InvalidKey(
            "encrypted key must have salt:nonce:ciphertext".into(),
        ));
    }
    let salt =
        hex::decode(parts[0]).map_err(|e| ZhacError::InvalidKey(format!("salt hex: {e}")))?;
    let nonce =
        hex::decode(parts[1]).map_err(|e| ZhacError::InvalidKey(format!("nonce hex: {e}")))?;
    let ct =
        hex::decode(parts[2]).map_err(|e| ZhacError::InvalidKey(format!("ciphertext hex: {e}")))?;

    if salt.len() != 16 {
        return Err(ZhacError::InvalidKey("salt must be 16 bytes".into()));
    }
    if nonce.len() != 12 {
        return Err(ZhacError::InvalidKey("nonce must be 12 bytes".into()));
    }

    let mut salt_arr = [0u8; 16];
    salt_arr.copy_from_slice(&salt);

    let key = argon2id_derive(passphrase, &salt_arr)?;

    let cipher = ChaCha20Poly1305::new_from_slice(&key)
        .map_err(|e| ZhacError::Crypto(format!("cipher: {e}")))?;
    let nonce_arr: [u8; 12] = nonce
        .as_slice()
        .try_into()
        .map_err(|_| ZhacError::InvalidKey("nonce must be 12 bytes".into()))?;
    let pt = cipher
        .decrypt((&nonce_arr).into(), ct.as_ref())
        .map_err(|_| ZhacError::Crypto("decryption failed (wrong passphrase?)".into()))?;

    String::from_utf8(pt)
        .map_err(|e| ZhacError::InvalidKey(format!("decrypted key is not valid UTF-8: {e}")))
}

pub fn decrypt_private_key_v1(encrypted: &str, passphrase: &str) -> Result<String> {
    use chacha20poly1305::aead::{Aead, KeyInit};
    use chacha20poly1305::ChaCha20Poly1305;
    use hkdf::Hkdf;
    use sha2::Sha256;

    let parts: Vec<&str> = encrypted.split(':').collect();
    if parts.len() != 3 {
        return Err(ZhacError::InvalidKey(
            "encrypted key must have salt:nonce:ciphertext".into(),
        ));
    }
    let salt =
        hex::decode(parts[0]).map_err(|e| ZhacError::InvalidKey(format!("salt hex: {e}")))?;
    let nonce =
        hex::decode(parts[1]).map_err(|e| ZhacError::InvalidKey(format!("nonce hex: {e}")))?;
    let ct =
        hex::decode(parts[2]).map_err(|e| ZhacError::InvalidKey(format!("ciphertext hex: {e}")))?;

    if salt.len() != 16 {
        return Err(ZhacError::InvalidKey("salt must be 16 bytes".into()));
    }
    if nonce.len() != 12 {
        return Err(ZhacError::InvalidKey("nonce must be 12 bytes".into()));
    }

    let hk = Hkdf::<Sha256>::new(Some(&salt), passphrase.as_bytes());
    let mut key = [0u8; 32];
    hk.expand(KEY_ENC_INFO, &mut key)
        .map_err(|e| ZhacError::Crypto(format!("HKDF: {e}")))?;

    let cipher = ChaCha20Poly1305::new_from_slice(&key)
        .map_err(|e| ZhacError::Crypto(format!("cipher: {e}")))?;
    let nonce_arr: [u8; 12] = nonce
        .as_slice()
        .try_into()
        .map_err(|_| ZhacError::InvalidKey("nonce must be 12 bytes".into()))?;
    let pt = cipher
        .decrypt((&nonce_arr).into(), ct.as_ref())
        .map_err(|_| ZhacError::Crypto("decryption failed (wrong passphrase?)".into()))?;

    String::from_utf8(pt)
        .map_err(|e| ZhacError::InvalidKey(format!("decrypted key is not valid UTF-8: {e}")))
}

/// Derive a 256-bit key from a passphrase using Argon2id (memory-hard KDF).
pub fn argon2id_derive(passphrase: &str, salt: &[u8; 16]) -> Result<[u8; 32]> {
    use argon2::{Algorithm, Argon2, Params, Version};

    let params = Params::new(65536, 3, 4, Some(32))
        .map_err(|e| ZhacError::Crypto(format!("Argon2 params: {e}")))?;
    let argon2 = Argon2::new(Algorithm::Argon2id, Version::V0x13, params);
    let mut key = [0u8; 32];
    argon2
        .hash_password_into(passphrase.as_bytes(), salt, &mut key)
        .map_err(|e| ZhacError::Crypto(format!("Argon2id: {e}")))?;
    Ok(key)
}
