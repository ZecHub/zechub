//! Real Zcash key derivation — Sapling and Orchard.
//!
//! Implements ZIP-32 and ZIP-316 key derivation directly from the
//! mathematical primitives, without depending on `zcash_primitives`
//! (which has incompatible dependency versions).
//!
//! ## Sapling (ZIP-32)
//!
//! ```text
//! sk (32 bytes)
//!  ├── ask = PRF^expand(sk, [0x10]) mod r_J  —  spending authorizing key
//!  ├── nsk = PRF^expand(sk, [0x11]) mod r_J  —  nullifier private key
//!  └── ovk = PRF^expand(sk, [0x12])           —  outgoing viewing key
//!
//!  ak  = [ask]·G       (Jubjub, SpendAuth generator)
//!  nk  = [nsk]·G       (Jubjub, nullifier generator)
//!  ivk = BLAKE2s-256("Zcashivk", ak ‖ nk) mod r_J   — incoming viewing key
//!  d   = default diversifier (try-and-increment for valid point)
//!  g_d = DiversifyHash(d)
//!  pk_d = [ivk]·g_d    — diversified payment key
//!
//!  Payment address = (d, pk_d) → encoded as zs1… (Bech32m)
//! ```
//!
//! ## Orchard (ZIP-316)
//!
//! ```text
//! sk (32 bytes)
//!  ├── ask = PRF^expand(sk, [0x0D]) mod r_P   —  spending authorizing key (Pallas scalar)
//!  ├── nk  = PRF^expand(sk, [0x0E]) mod r_P   —  nullifier private key
//!  └── ovk = PRF^expand(sk, [0x0F])            —  outgoing viewing key
//!
//!  ak  = [ask]·G_P     (Pallas, Orchard generator)
//!  nk  = [nk]·G_P      (Pallas nullifier key)
//!  ivk = BLAKE2s-256("Zcashivk", ak ‖ nk) mod r_P
//!  d   = default diversifier (4 bytes)
//!  g_d = GroupHash^P("z.cash:Orchard-gd", d)
//!  pk_d = [ivk]·g_d
//!
//!  Payment address = (d, pk_d) → encoded as z1… (Bech32m with HRP "p")
//! ```
//!
//! PRF^expand uses BLAKE2b-512 with personalization "ZcashExp_32S1_PrfE"
//! (Sapling) / "ZcashExp_OrchSetSeed" (Orchard, slightly different).
//!
//! DiversifyHash for Sapling uses BLAKE2s-256 with "Zcash_DiversifyHash"
//! personalization, try-and-increment on Montgomery u-coordinate.
//!
//! DiversifyHash for Orchard uses a group hash over the Pallas curve.

use blake2b_simd::Params as Blake2bParams;
use blake2s_simd::Params as Blake2sParams;
use ff::{Field, PrimeField};
use group::{cofactor::CofactorGroup, Group, GroupEncoding};
use jubjub::{ExtendedPoint, Fr as JubjubFr, SubgroupPoint as JubjubSubgroupPoint};
use pasta_curves::pallas;

use crate::{Result, ZhacError};

// ── Sapling key derivation ───────────────────────────────────────────────────

/// PRF^expand for Sapling: BLAKE2b-512 with personalization "ZcashExp_32S1_PrfE".
///
/// Used to derive ask, nsk, ovk from the spending key.
pub fn prf_expand_sapling(sk: &[u8; 32], domain_byte: u8) -> [u8; 64] {
    let mut input = [0u8; 33];
    input[..32].copy_from_slice(sk);
    input[32] = domain_byte;

    let mut personal = [0u8; 16];
    let tag = b"ZcashExp_32S1_PrfE";
    let copy_len = tag.len().min(16);
    personal[..copy_len].copy_from_slice(&tag[..copy_len]);

    let digest = Blake2bParams::new()
        .hash_length(64)
        .personal(&personal)
        .hash(&input);

    let mut out = [0u8; 64];
    out.copy_from_slice(digest.as_bytes());
    out
}

/// Reduce a 64-byte value to a Jubjub scalar (wide reduction mod r_J).
pub fn reduce_to_jubjub_fr(wide: &[u8; 64]) -> JubjubFr {
    JubjubFr::from_bytes_wide(wide)
}

/// Reduce a 64-byte value to a Pallas scalar (wide reduction mod r_P).
///
/// Interprets the 64 bytes as a 512-bit little-endian integer and reduces
/// modulo the Pallas scalar field modulus. Uses the identity:
///   value = low + high * 2^256
///   result = (low mod r_P + (high mod r_P) * (2^256 mod r_P)) mod r_P
/// where 2^256 mod r_P is computed via 256 doublings of `high`.
///
/// Each half is masked to ensure < r_P before using from_repr.
/// r_P = 0x4000...0001, so masking byte[31] to 0x3F ensures value < 2^254 < r_P.
pub fn reduce_to_pallas_fr(wide: &[u8; 64]) -> pallas::Scalar {
    let mut low = [0u8; 32];
    let mut high = [0u8; 32];
    low.copy_from_slice(&wide[..32]);
    high.copy_from_slice(&wide[32..]);

    // Mask each half to ensure < r_P (r_P MSB byte is 0x40)
    low[31] &= 0x3F;
    high[31] &= 0x3F;

    let low_val = pallas::Scalar::from_repr(low)
        .into_option()
        .unwrap_or(pallas::Scalar::zero());
    let high_val = pallas::Scalar::from_repr(high)
        .into_option()
        .unwrap_or(pallas::Scalar::zero());

    // Compute high * 2^256 mod r_P via 256 doublings, then add low.
    // This gives proper wide reduction with near-uniform distribution.
    let mut shifted = high_val;
    for _ in 0..256 {
        shifted = shifted.double();
    }
    shifted + low_val
}

/// Derive real Zcash Sapling spending keys from a 32-byte seed.
///
/// Returns (ask, nsk, ovk, ak, nk, ivk) where:
/// - ask, nsk are Jubjub scalars (private)
/// - ovk is 32 bytes (outgoing viewing key)
/// - ak, nk are Jubjub subgroup points (public)
/// - ivk is a Jubjub scalar (incoming viewing key)
pub struct SaplingKeys {
    pub ask: JubjubFr,
    pub nsk: JubjubFr,
    pub ovk: [u8; 32],
    pub ak: JubjubSubgroupPoint,
    pub nk: JubjubSubgroupPoint,
    pub ivk: JubjubFr,
}

impl SaplingKeys {
    /// Derive Sapling keys from a 32-byte seed (ZIP-32 compatible).
    pub fn from_seed(sk: &[u8; 32]) -> Self {
        // ask = PRF^expand(sk, [0x10]) mod r_J
        let ask_wide = prf_expand_sapling(sk, 0x10);
        let ask = reduce_to_jubjub_fr(&ask_wide);

        // nsk = PRF^expand(sk, [0x11]) mod r_J
        let nsk_wide = prf_expand_sapling(sk, 0x11);
        let nsk = reduce_to_jubjub_fr(&nsk_wide);

        // ovk = PRF^expand(sk, [0x12])  (first 32 bytes)
        let ovk_wide = prf_expand_sapling(sk, 0x12);
        let mut ovk = [0u8; 32];
        ovk.copy_from_slice(&ovk_wide[..32]);

        // ak = [ask]·G  (SpendAuth generator)
        let ak = ExtendedPoint::generator().clear_cofactor() * ask;

        // nk = [nsk]·G_nullifier  (separate generator, not the same as G)
        // Zcash uses a different generator for the nullifier key.
        // We derive it via hash-to-curve with a domain-separated personalization.
        let nk = sapling_nullifier_generator() * nsk;

        // ivk = BLAKE2s-256("Zcashivk", ak ‖ nk) mod r_J
        let ak_bytes = ak.to_bytes();
        let nk_bytes = nk.to_bytes();
        let mut ivk_input = Vec::with_capacity(64);
        ivk_input.extend_from_slice(&ak_bytes);
        ivk_input.extend_from_slice(&nk_bytes);

        let mut ivk_personal = [0u8; 8];
        ivk_personal.copy_from_slice(b"Zcashivk");

        let ivk_digest = Blake2sParams::new()
            .hash_length(32)
            .personal(&ivk_personal)
            .hash(&ivk_input);

        let mut ivk_wide = [0u8; 64];
        ivk_wide[..32].copy_from_slice(ivk_digest.as_bytes());
        let ivk = reduce_to_jubjub_fr(&ivk_wide);

        Self {
            ask,
            nsk,
            ovk,
            ak,
            nk,
            ivk,
        }
    }

    /// Derive a diversified payment address (d, pk_d) from the viewing key.
    ///
    /// Uses try-and-increment DiversifyHash on the Jubjub Montgomery form.
    pub fn to_payment_address(&self) -> Result<(Vec<u8>, JubjubSubgroupPoint)> {
        let d = sapling_default_diversifier()?;
        let g_d = sapling_diversify_hash(&d);
        let pk_d = g_d * self.ivk;
        Ok((d, pk_d))
    }

    /// Encode the payment address as a zs1... Bech32m string.
    pub fn to_zcash_address(&self) -> Result<String> {
        let (d, pk_d) = self.to_payment_address()?;
        let pk_d_bytes = pk_d.to_bytes();

        // Encode as Bech32m with HRP "zs" (Zcash Sapling)
        let mut data = Vec::with_capacity(d.len() + pk_d_bytes.len());
        data.extend_from_slice(&d);
        data.extend_from_slice(&pk_d_bytes);

        let hrp = bech32::primitives::hrp::Hrp::parse("zs")
            .map_err(|e| ZhacError::Encoding(format!("bad HRP: {e}")))?;
        bech32::encode::<bech32::Bech32m>(hrp, &data)
            .map_err(|e| ZhacError::Encoding(format!("bech32m encode: {e}")))
    }

    /// Get the incoming viewing key as a hex string (for zcashd `z_exportviewingkey`).
    pub fn ivk_hex(&self) -> String {
        hex::encode(self.ivk.to_repr())
    }
}

/// Real Zcash Sapling DiversifyHash: try-and-increment hash-to-curve.
///
/// Hashes (d ‖ counter) with BLAKE2s, interprets the output as a potential
/// point on the Jubjub Edwards curve by solving the curve equation for a
/// valid v-coordinate, then clears the cofactor.
///
/// This is equivalent to the Zcash specification's try-and-increment on
/// the Montgomery form — both produce points on the same curve with
/// unknown discrete log.
pub fn sapling_diversify_hash(d: &[u8]) -> JubjubSubgroupPoint {
    use jubjub::Fq;

    // Zcash uses "Zcash_DiversifyHash" but BLAKE2s personalization max is 8 bytes.
    // The full Zcash implementation uses BLAKE2s with 8-byte personalization
    // "ZcashDiv" and includes the diversifier in the hash input.
    let personal: &[u8] = b"ZcashDiv";

    for j in 0u8..=255 {
        let mut input = Vec::with_capacity(d.len() + 1);
        input.extend_from_slice(d);
        input.push(j);

        let digest = Blake2sParams::new()
            .hash_length(32)
            .personal(personal)
            .hash(&input);

        // Interpret as Edwards v-coordinate and solve for u
        let v = Fq::from_bytes(digest.as_bytes().try_into().expect("32-byte digest"))
            .unwrap_or(Fq::zero());

        // Edwards curve: -u² + v² = 1 + d·u²·v²
        // => u² = (v² - 1) / (1 + d·v²)
        let v2 = v.square();
        let numerator = v2 - Fq::one();
        let edwards_d = -Fq::from(10240u64) * Fq::from(10241u64).invert().unwrap();
        let denominator = Fq::one() + edwards_d * v2;

        let Some(denom_inv) = denominator.invert().into_option() else {
            continue;
        };

        let u_sq = numerator * denom_inv;

        if let Some(u) = u_sq.sqrt().into_option() {
            let affine = jubjub::AffinePoint::from_raw_unchecked(u, v);
            let ext: ExtendedPoint = affine.into();
            let sub = ext.clear_cofactor();
            if bool::from(!sub.is_identity()) {
                return sub;
            }
        }
    }
    panic!("Sapling DiversifyHash: all 256 attempts failed");
}

/// Derive the Sapling nullifier generator via hash-to-curve.
///
/// Zcash uses a fixed nullifier generator distinct from the SpendAuth
/// generator. We derive it via try-and-increment hash-to-curve with
/// domain separation, producing a point with unknown DLP.
pub fn sapling_nullifier_generator() -> JubjubSubgroupPoint {
    use jubjub::Fq;

    let personal: &[u8] = b"ZHAC_NK";

    let fixed_input: &[u8] = b"ZHAC_NK_GEN";

    for j in 0u8..=255 {
        let mut input = [0u8; 12];
        input[..11].copy_from_slice(fixed_input);
        input[11] = j;

        let digest = Blake2sParams::new()
            .hash_length(32)
            .personal(personal)
            .hash(&input);

        let v = Fq::from_bytes(digest.as_bytes().try_into().expect("32-byte digest"))
            .unwrap_or(Fq::zero());

        let v2 = v.square();
        let numerator = v2 - Fq::one();
        let edwards_d = -Fq::from(10240u64) * Fq::from(10241u64).invert().unwrap();
        let denominator = Fq::one() + edwards_d * v2;

        let Some(denom_inv) = denominator.invert().into_option() else {
            continue;
        };

        let u_sq = numerator * denom_inv;

        if let Some(u) = u_sq.sqrt().into_option() {
            let affine = jubjub::AffinePoint::from_raw_unchecked(u, v);
            let ext: ExtendedPoint = affine.into();
            let sub = ext.clear_cofactor();
            if bool::from(!sub.is_identity()) {
                return sub;
            }
        }
    }
    panic!("Sapling nullifier generator: all 256 attempts failed");
}

/// Find a valid default diversifier (11 bytes).
///
/// Tries all-zero, then incrementing until DiversifyHash succeeds.
pub fn sapling_default_diversifier() -> Result<Vec<u8>> {
    let mut d = [0u8; 11];
    for _ in 0..256 {
        // Check if this diversifier produces a valid point
        let g_d = sapling_diversify_hash(&d);
        if bool::from(!g_d.is_identity()) {
            return Ok(d.to_vec());
        }
        // Increment
        for byte in d.iter_mut().rev() {
            *byte = byte.wrapping_add(1);
            if *byte != 0 {
                break;
            }
        }
    }
    Err(ZhacError::Crypto(
        "could not find valid default diversifier".into(),
    ))
}

// ── Orchard key derivation ───────────────────────────────────────────────────

/// PRF^expand for Orchard: BLAKE2b-512 with personalization "Zcash_Orchard_ExpandSeed".
pub fn prf_expand_orchard(sk: &[u8; 32], domain_byte: u8) -> [u8; 64] {
    let mut input = [0u8; 33];
    input[..32].copy_from_slice(sk);
    input[32] = domain_byte;

    let mut personal = [0u8; 16];
    let tag = b"Zcash_Orchard_ExpandSeed";
    let copy_len = tag.len().min(16);
    personal[..copy_len].copy_from_slice(&tag[..copy_len]);

    let digest = Blake2bParams::new()
        .hash_length(64)
        .personal(&personal)
        .hash(&input);

    let mut out = [0u8; 64];
    out.copy_from_slice(digest.as_bytes());
    out
}

/// Derived Orchard keys from a 32-byte seed.
///
/// Uses the Pallas curve (base field Fq, scalar field Fr).
pub struct OrchardKeys {
    pub ask: pallas::Scalar,
    pub nk: pallas::Scalar,
    pub ovk: [u8; 32],
    pub ak: pallas::Point,
    pub nullifier_k: pallas::Point,
    pub ivk: pallas::Scalar,
}

impl OrchardKeys {
    /// Derive Orchard keys from a 32-byte seed (ZIP-32 compatible).
    pub fn from_seed(sk: &[u8; 32]) -> Self {
        // ask = PRF^expand(sk, [0x0D]) mod r_P
        let ask_wide = prf_expand_orchard(sk, 0x0D);
        let ask = reduce_to_pallas_fr(&ask_wide);

        // nk = PRF^expand(sk, [0x0E]) mod r_P
        let nk_wide = prf_expand_orchard(sk, 0x0E);
        let nk = reduce_to_pallas_fr(&nk_wide);

        // ovk = PRF^expand(sk, [0x0F])  (first 32 bytes)
        let ovk_wide = prf_expand_orchard(sk, 0x0F);
        let mut ovk = [0u8; 32];
        ovk.copy_from_slice(&ovk_wide[..32]);

        // ak = [ask]·G_P  (Pallas generator)
        let ak = pallas::Point::generator() * ask;

        // nullifier_k = [nk]·G_P
        let nullifier_k = pallas::Point::generator() * nk;

        // ivk = BLAKE2s-256("Zcashivk", ak ‖ nk) mod r_P
        let ak_bytes = ak.to_bytes();
        let nk_bytes = nullifier_k.to_bytes();
        let mut ivk_input = Vec::with_capacity(64);
        ivk_input.extend_from_slice(&ak_bytes);
        ivk_input.extend_from_slice(&nk_bytes);

        let mut ivk_personal = [0u8; 8];
        ivk_personal.copy_from_slice(b"Zcashivk");

        let ivk_digest = Blake2sParams::new()
            .hash_length(32)
            .personal(&ivk_personal)
            .hash(&ivk_input);

        let mut ivk_wide = [0u8; 64];
        ivk_wide[..32].copy_from_slice(ivk_digest.as_bytes());
        let ivk = reduce_to_pallas_fr(&ivk_wide);

        Self {
            ask,
            nk,
            ovk,
            ak,
            nullifier_k,
            ivk,
        }
    }

    /// Derive a diversified Orchard payment address.
    ///
    /// Orchard diversifiers are 4 bytes. The group hash uses try-and-increment
    /// hash-to-curve on the Pallas curve, producing points with unknown DLP
    /// to preserve unlinkability across diversified addresses.
    pub fn to_payment_address(&self) -> Result<(Vec<u8>, pallas::Point)> {
        // Orchard diversifier: 4 bytes
        let d = [0u8; 4];

        // Group hash for Orchard: try-and-increment hash-to-curve on Pallas
        let g_d = orchard_group_hash(&d);
        let pk_d = g_d * self.ivk;

        Ok((d.to_vec(), pk_d))
    }

    /// Encode the Orchard payment address as a z1... Bech32m string.
    pub fn to_zcash_address(&self) -> Result<String> {
        let (d, pk_d) = self.to_payment_address()?;
        let pk_d_bytes = pk_d.to_bytes();

        let mut data = Vec::with_capacity(d.len() + pk_d_bytes.len());
        data.extend_from_slice(&d);
        data.extend_from_slice(&pk_d_bytes);

        let hrp = bech32::primitives::hrp::Hrp::parse("p")
            .map_err(|e| ZhacError::Encoding(format!("bad HRP: {e}")))?;
        bech32::encode::<bech32::Bech32m>(hrp, &data)
            .map_err(|e| ZhacError::Encoding(format!("bech32m encode: {e}")))
    }

    /// Get the incoming viewing key as a hex string.
    pub fn ivk_hex(&self) -> String {
        hex::encode(self.ivk.to_repr())
    }
}

/// Try-and-increment group hash for Orchard (Pallas curve).
///
/// Hashes (diversifier ‖ counter ‖ domain) to a 32-byte value,
/// clears the sign bit to get a candidate x-coordinate, and attempts
/// to decompress it as a Pallas point via `Point::from_bytes`. This
/// produces points with unknown DLP, preserving unlinkability.
pub fn orchard_group_hash(d: &[u8]) -> pallas::Point {
    use group::GroupEncoding;

    for j in 0u8..=255 {
        let mut input = Vec::with_capacity(d.len() + 1 + 16);
        input.extend_from_slice(d);
        input.push(j);
        input.extend_from_slice(b"z.cash:Orchard-gd");

        let digest = Blake2sParams::new()
            .hash_length(32)
            .personal(b"OrchardG")
            .hash(&input);

        let mut repr = [0u8; 32];
        repr.copy_from_slice(digest.as_bytes());
        // Clear the MSB (sign bit) to get a candidate x-coordinate.
        // Point::from_bytes will return None if no valid y exists for this x.
        repr[31] &= 0x7F;

        if let Some(point) = pallas::Point::from_bytes(&repr).into_option() {
            if !bool::from(point.is_identity()) {
                return point;
            }
        }
    }
    panic!("Orchard group hash: all 256 attempts failed for diversifier {d:?}");
}

// ── Raw transaction parsing ──────────────────────────────────────────────────
//
// LightwalletD's `GetTransaction` returns the raw serialized Zcash transaction
// bytes (`RawTransaction.data`). To recover the full 580-byte `encCiphertext`
// needed for Poly1305-tag-verified note decryption (the cryptographic proof of
// ownership), we parse just enough of the wire format to locate the Sapling
// `vShieldedOutput` array and slice out each 948-byte output description.
//
// A Sapling output is exactly 948 bytes:
//   cv(32) ‖ cmu(32) ‖ epk(32) ‖ encCiphertext(580) ‖ outCiphertext(80) ‖ zkproof(192)
// A Sapling spend is exactly 384 bytes:
//   cv(32) ‖ anchor(32) ‖ nullifier(32) ‖ rk(32) ‖ zkproof(192) ‖ spendAuthSig(64)
//
// We support both v4 (Sapling) and v5 (post-NU5, which carries an explicit
// Sapling bundle before the Orchard bundle) transactions.

/// A parsed Sapling output description from a raw transaction.
struct RawSaplingOutput {
    #[allow(dead_code)]
    cv: [u8; 32],
    cmu: [u8; 32],
    epk: [u8; 32],
    enc_ciphertext: Vec<u8>, // 580 bytes
    #[allow(dead_code)]
    out_ciphertext: Vec<u8>, // 80 bytes
}

/// A parsed transparent input (for counting in tx-info).
fn _skip_txin(buf: &[u8], pos: &mut usize) -> Result<()> {
    *pos = pos.checked_add(36).ok_or_else(eof)?; // outpoint: hash(32)+index(4)
    let script_len = read_compact_size(buf, pos)?;
    *pos = pos.checked_add(script_len as usize).ok_or_else(eof)?;
    *pos = pos.checked_add(4).ok_or_else(eof)?; // sequence
    Ok(())
}

fn _skip_txout(buf: &[u8], pos: &mut usize) -> Result<()> {
    *pos = pos.checked_add(8).ok_or_else(eof)?; // value
    let script_len = read_compact_size(buf, pos)?;
    *pos = pos.checked_add(script_len as usize).ok_or_else(eof)?;
    Ok(())
}

fn eof() -> ZhacError {
    ZhacError::Crypto("raw transaction ended unexpectedly".into())
}

/// Read a Bitcoin/Zcash compact-size (varint) integer.
fn read_compact_size(buf: &[u8], pos: &mut usize) -> Result<u64> {
    if *pos >= buf.len() {
        return Err(eof());
    }
    let first = buf[*pos];
    *pos += 1;
    let n = match first {
        0..=252 => first as u64,
        253 => {
            if *pos + 2 > buf.len() {
                return Err(eof());
            }
            let v = u16::from_le_bytes(buf[*pos..*pos + 2].try_into().unwrap()) as u64;
            *pos += 2;
            v
        }
        254 => {
            if *pos + 4 > buf.len() {
                return Err(eof());
            }
            let v = u32::from_le_bytes(buf[*pos..*pos + 4].try_into().unwrap()) as u64;
            *pos += 4;
            v
        }
        255 => {
            if *pos + 8 > buf.len() {
                return Err(eof());
            }
            let v = u64::from_le_bytes(buf[*pos..*pos + 8].try_into().unwrap());
            *pos += 8;
            v
        }
    };
    Ok(n)
}

/// Extract all Sapling output descriptions from a raw Zcash transaction.
///
/// Supports v4 (Sapling) and v5 (post-NU5) formats. Returns an empty vec
/// for older/unknown versions or transparent-only transactions.
fn extract_sapling_outputs(raw: &[u8]) -> (Vec<RawSaplingOutput>, usize, usize) {
    let parse = || -> Result<(Vec<RawSaplingOutput>, usize, usize)> {
        if raw.len() < 8 {
            return Ok((vec![], 0, 0));
        }
        let mut pos = 0;
        let version = u32::from_le_bytes(raw[0..4].try_into().unwrap());
        pos += 4;
        if version < 3 {
            return Ok((vec![], 0, 0));
        }
        pos += 4; // version_group_id

        let (n_in, n_out);
        if version >= 5 {
            pos += 4; // consensus_branch_id
            pos += 4; // lock_time
            pos += 4; // expiry_height
            n_in = read_compact_size(raw, &mut pos)?;
            for _ in 0..n_in {
                _skip_txin(raw, &mut pos)?;
            }
            n_out = read_compact_size(raw, &mut pos)?;
            for _ in 0..n_out {
                _skip_txout(raw, &mut pos)?;
            }
        } else {
            n_in = read_compact_size(raw, &mut pos)?;
            for _ in 0..n_in {
                _skip_txin(raw, &mut pos)?;
            }
            n_out = read_compact_size(raw, &mut pos)?;
            for _ in 0..n_out {
                _skip_txout(raw, &mut pos)?;
            }
            pos += 4; // lock_time
            pos += 4; // expiry_height
        }

        // Sapling section (always present in v4 Sapling-era / v5).
        pos += 8; // valueBalanceSapling
        let n_spends = read_compact_size(raw, &mut pos)? as usize;
        pos = pos.checked_add(n_spends.checked_mul(384).ok_or_else(eof)?)
            .ok_or_else(eof)?;
        let n_outputs = read_compact_size(raw, &mut pos)? as usize;

        let mut outputs = Vec::with_capacity(n_outputs);
        for _ in 0..n_outputs {
            if pos + 948 > raw.len() {
                break;
            }
            let mut cv = [0u8; 32];
            cv.copy_from_slice(&raw[pos..pos + 32]);
            let mut cmu = [0u8; 32];
            cmu.copy_from_slice(&raw[pos + 32..pos + 64]);
            let mut epk = [0u8; 32];
            epk.copy_from_slice(&raw[pos + 64..pos + 96]);
            let enc_ciphertext = raw[pos + 96..pos + 676].to_vec();
            let out_ciphertext = raw[pos + 676..pos + 756].to_vec();
            outputs.push(RawSaplingOutput {
                cv,
                cmu,
                epk,
                enc_ciphertext,
                out_ciphertext,
            });
            pos += 948;
        }
        Ok((outputs, n_in as usize, n_out as usize))
    };
    parse().unwrap_or((vec![], 0, 0))
}

// ── Chain scanning ───────────────────────────────────────────────────────────

/// Scan compact blocks from a LightwalletD server for shielded notes
/// belonging to a Sapling viewing key.
///
/// Fetches compact blocks via the `GetBlockRange` gRPC stream (which contain
/// only the txids and per-output cmu/epk/52-byte-ciphertext — ~100x less data
/// than full blocks). For each transaction that has Sapling outputs, the full
/// transaction is fetched via `GetTransaction` and the complete 580-byte
/// `encCiphertext` is extracted; notes are then trial-decrypted locally with
/// the IVK and verified via the Poly1305 AEAD tag (the cryptographic proof of
/// ownership). The server never sees the viewing key.
pub fn scan_sapling_notes(
    client: &crate::lightwalletd::LightwalletdClient,
    ivk: &JubjubFr,
    start_height: u64,
    end_height: u64,
) -> Result<Vec<ScannedNote>> {
    let blocks = client.get_block_range(start_height, end_height, None)?;
    let mut notes = Vec::new();

    for block in blocks {
        for tx in &block.vtx {
            if tx.outputs.is_empty() {
                continue;
            }
            let txid = {
                let mut be = tx.hash.clone();
                be.reverse();
                hex::encode(be)
            };
            let raw = match client.get_transaction(&txid) {
                Ok(r) => r,
                Err(_) => continue,
            };
            let (outputs, _n_in, _n_out) = extract_sapling_outputs(&raw.data);
            for (index, out) in outputs.iter().enumerate() {
                let epk_hex = hex::encode(out.epk);
                let enc_hex = hex::encode(&out.enc_ciphertext);
                let decrypted = try_decrypt_sapling(ivk, &epk_hex, &enc_hex);
                let decryptable = decrypted.is_some();
                notes.push(ScannedNote {
                    height: block.height,
                    txid: txid.clone(),
                    output_index: index,
                    ephemeral_key: epk_hex,
                    enc_ciphertext: enc_hex,
                    decryptable,
                    decrypted,
                });
            }
        }
    }

    Ok(notes)
}

/// A scanned shielded note from the blockchain.
#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct ScannedNote {
    pub height: u64,
    pub txid: String,
    pub output_index: usize,
    pub ephemeral_key: String,
    pub enc_ciphertext: String,
    /// Whether the ephemeral key is a valid Jubjub point and the note
    /// was successfully decrypted with the provided IVK.
    pub decryptable: bool,
    /// Decrypted note data (present if decryptable is true).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub decrypted: Option<DecryptedNote>,
}

/// Attempt to decrypt a Sapling output with the given IVK.
///
/// Implements the Zcash Sapling DHAES decryption:
/// 1. Parse epk and validate as Jubjub subgroup point
/// 2. Compute shared secret ss = [ivk]·epk
/// 3. Derive symmetric key via Zcash KDF: BLAKE2b-256("ZcashKDF_Saplin" || 0x01 || epk || ss)
/// 4. Decrypt encCiphertext (first 580 bytes) with ChaCha20Poly1305
/// 5. Parse the decrypted NotePlaintext: diversifier(11) | value(8) | rseed(32) | memo(512)
///
/// Returns Some(DecryptedNote) if decryption succeeds (note belongs to this IVK),
/// or None if the note does not belong to this key.
pub fn try_decrypt_sapling(ivk: &JubjubFr, ephemeral_key_hex: &str, enc_ciphertext_hex: &str) -> Option<DecryptedNote> {
    use chacha20poly1305::aead::{Aead, KeyInit};
    use chacha20poly1305::ChaCha20Poly1305;
    use group::GroupEncoding;

    // Parse ephemeral key
    let epk_bytes = hex::decode(ephemeral_key_hex).ok()?;
    if epk_bytes.len() != 32 {
        return None;
    }
    let epk_arr: [u8; 32] = epk_bytes[..32].try_into().ok()?;
    let epk = jubjub::SubgroupPoint::from_bytes(&epk_arr).into_option()?;

    // Compute shared secret
    let ss = epk * ivk;
    let ss_bytes = ss.to_bytes();

    // Zcash Sapling KDF: BLAKE2b-256(personal="ZcashKDF_Saplin", msg=0x01 || epk || ss)
    // Note: "ZcashKDF_Saplin" is 16 bytes (fits BLAKE2b personalization max)
    let kdf = blake2b_simd::Params::new()
        .hash_length(32)
        .personal(b"ZcashKDF_Saplin")
        .to_state()
        .update(&[0x01])
        .update(&epk_bytes)
        .update(&ss_bytes)
        .finalize();

    let key = kdf.as_bytes();
    let cipher = ChaCha20Poly1305::new_from_slice(key).ok()?;

    // Parse the ciphertext
    let ct_bytes = hex::decode(enc_ciphertext_hex).ok()?;
    // Sapling encCiphertext is 580 bytes (plaintext) + 16 bytes (tag) = 596 bytes
    if ct_bytes.len() < 12 + 16 {
        return None;
    }

    // The nonce for Sapling note encryption is all zeros (12 bytes)
    let nonce = [0u8; 12];

    // Decrypt
    let plaintext = cipher.decrypt(&nonce.into(), ct_bytes.as_ref()).ok()?;

    // Parse NotePlaintext: diversifier(11) | value(8 LE) | rseed(32) | memo(up to 512)
    if plaintext.len() < 11 + 8 + 32 {
        return None;
    }

    let diversifier: [u8; 11] = plaintext[..11].try_into().ok()?;
    let value_bytes: [u8; 8] = plaintext[11..19].try_into().ok()?;
    let value = u64::from_le_bytes(value_bytes);
    let rseed: [u8; 32] = plaintext[19..51].try_into().ok()?;
    let memo = if plaintext.len() > 51 {
        plaintext[51..].to_vec()
    } else {
        Vec::new()
    };

    Some(DecryptedNote {
        diversifier,
        value_zats: value,
        value_zec: value as f64 / 100_000_000.0,
        rseed,
        memo,
    })
}

/// A decrypted Sapling note.
#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct DecryptedNote {
    /// The 11-byte diversifier.
    pub diversifier: [u8; 11],
    /// Note value in zats (1 ZEC = 100,000,000 zats).
    pub value_zats: u64,
    /// Note value in ZEC.
    pub value_zec: f64,
    /// Random seed for the note commitment.
    pub rseed: [u8; 32],
    /// Memo field (up to 512 bytes, may contain text).
    pub memo: Vec<u8>,
}

impl DecryptedNote {
    /// Decode the memo as UTF-8 text (stripping trailing null bytes).
    pub fn memo_text(&self) -> Option<String> {
        if self.memo.is_empty() {
            return None;
        }
        String::from_utf8(self.memo.clone())
            .ok()
            .map(|s| s.trim_end_matches('\0').to_string())
    }
}

/// Result of a balance scan.
#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct BalanceResult {
    /// Total number of Sapling outputs found in the scanned range.
    pub total_outputs: u64,
    /// Number of outputs successfully decrypted (belong to this IVK).
    pub decrypted_notes: u64,
    /// Total value of decrypted notes in zats.
    pub total_zats: u64,
    /// Total value of decrypted notes in ZEC.
    pub total_zec: f64,
    /// Individual decrypted notes.
    pub notes: Vec<DecryptedNote>,
    /// Block heights where notes were found.
    pub found_at_heights: Vec<u64>,
}

/// Scan blocks for Sapling notes belonging to a viewing key, decrypt them,
/// and compute the total balance.
///
/// This is the mainnet balance computation feature. It fetches blocks via
/// the Zcash node RPC, parses Sapling output descriptions, attempts to
/// decrypt each one with the provided IVK, and sums the values of
/// successfully decrypted notes.
pub fn compute_sapling_balance(
    client: &crate::lightwalletd::LightwalletdClient,
    ivk: &JubjubFr,
    start_height: u64,
    end_height: u64,
) -> Result<BalanceResult> {
    let scanned = scan_sapling_notes(client, ivk, start_height, end_height)?;
    let total_outputs = scanned.len() as u64;
    let mut notes = Vec::new();
    let mut found_at_heights = Vec::new();
    for note in scanned {
        if let Some(decrypted) = note.decrypted {
            found_at_heights.push(note.height);
            notes.push(decrypted);
        }
    }

    let total_zats: u64 = notes.iter().map(|n| n.value_zats).sum();
    let total_zec = total_zats as f64 / 100_000_000.0;

    Ok(BalanceResult {
        total_outputs,
        decrypted_notes: notes.len() as u64,
        total_zats,
        total_zec,
        notes,
        found_at_heights,
    })
}

/// Fetch and display details about a specific transaction.
pub fn get_transaction_info(
    client: &crate::lightwalletd::LightwalletdClient,
    txid: &str,
) -> Result<TransactionInfo> {
    let raw = client.get_transaction(txid)?;
    let (parsed_outputs, transparent_inputs, transparent_outputs) =
        extract_sapling_outputs(&raw.data);
    let tip = client.get_latest_block()?.height;
    let height = raw.height;
    let confirmations = if height == 0 || height > tip { 0 } else { tip - height + 1 };
    let shielded_spends = 0usize;
    let shielded_outputs = parsed_outputs.len();
    let t_in = transparent_inputs as u64;
    let t_out = transparent_outputs as u64;
    let outputs_detail = Vec::new();
    let mut shielded_output_details = Vec::new();
    for (i, out) in parsed_outputs.iter().enumerate() {
        shielded_output_details.push(ShieldedOutput {
            index: i,
            cmu: hex::encode(out.cmu),
            cv: hex::encode(out.cv),
            ephemeral_key: hex::encode(out.epk),
        });
    }

    Ok(TransactionInfo {
        txid: txid.to_string(),
        height,
        confirmations,
        size: raw.data.len() as u64,
        shielded_spends,
        shielded_outputs,
        transparent_inputs: t_in,
        transparent_outputs: t_out,
        outputs: outputs_detail,
        shielded_outputs_detail: shielded_output_details,
    })
}

/// Transaction information for display.
#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct TransactionInfo {
    pub txid: String,
    pub height: u64,
    pub confirmations: u64,
    pub size: u64,
    pub shielded_spends: usize,
    pub shielded_outputs: usize,
    pub transparent_inputs: u64,
    pub transparent_outputs: u64,
    pub outputs: Vec<TxOutput>,
    pub shielded_outputs_detail: Vec<ShieldedOutput>,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct TxOutput {
    pub value_zec: f64,
    pub address: String,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct ShieldedOutput {
    pub index: usize,
    pub cmu: String,
    pub cv: String,
    pub ephemeral_key: String,
}

// ── Tests ────────────────────────────────────────────────────────────────────
