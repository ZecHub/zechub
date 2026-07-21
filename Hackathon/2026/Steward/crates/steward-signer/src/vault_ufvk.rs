//! Vault UFVK derivation from the FROST group verifying key (`ak`).
//!
//! Mirrors `zcash-sign generate`: given the 32-byte FROST group key `ak` (the Orchard
//! spend-**validating** key, produced by `steward-core`), build a scannable Orchard-only
//! vault UFVK + receiving UA. `nk`/`rivk` are filled from a throwaway Orchard `SpendingKey`
//! (they carry no signing power); the vault's spend authority is the FROST-shared `ask`,
//! which never appears here.
//!
//! > `steward-core`'s real-owner path (`FullViewingKey::from(&owner_sk)`, PROTOCOL §1) yields a
//! > *consistent* `ak,nk,rivk` and is preferred for setup. This function is the `ak`-only fast
//! > path — useful when all we have is the group key hex (e.g. re-deriving the scanner UFVK).
//!
//! ## API (verified against the `conradoplg/orchard@4d001c5` fork + `zcash_keys 0.12`)
//! ```ignore
//! SpendValidatingKey::from_bytes(&[u8]) -> Option<Self>          // pub under `unstable-frost`
//! FullViewingKey::from_sk_ak(&SpendingKey, SpendValidatingKey) -> FullViewingKey  // `unstable-frost`
//! UnifiedFullViewingKey::from_orchard_fvk(FullViewingKey) -> Result<_, DerivationError>  // `unstable-frost`
//! UnifiedFullViewingKey::encode(&params) -> String
//! UnifiedFullViewingKey::default_address(UnifiedAddressRequest) -> Result<(UnifiedAddress, _), _>
//! ```
//! (Note: `from_orchard_fvk` DOES exist in `zcash_keys 0.12` behind `unstable-frost`, contra
//! PROTOCOL §0's "0.14 only" note; `UnifiedFullViewingKey::new` is `test-dependencies`-gated.)
//!
//! Compiles and is self-contained (no synced DB); the `ak → UFVK/UA` derivation is runnable.

use anyhow::{Context, Result};
use orchard::keys::{FullViewingKey, SpendValidatingKey, SpendingKey};
use zcash_keys::keys::{UnifiedAddressRequest, UnifiedFullViewingKey};
use zcash_protocol::consensus::Parameters;

/// The derived, scannable vault identity.
#[derive(Clone, Debug)]
pub struct VaultUfvk {
    /// Bech32m-encoded Unified Full Viewing Key (`uview1…`) — feed to Zaino / `zcash_client_backend`.
    pub ufvk: String,
    /// Default Orchard receiving Unified Address (`u1…`) for the vault.
    pub receiving_ua: String,
}

/// Derive the Orchard-only vault UFVK + receiving UA from the FROST group key `ak`.
///
/// * `params` — consensus parameters (`Network::MainNetwork` / `TestNetwork`).
/// * `ak_bytes` — 32-byte `I2LEOSP_256(ak)` group verifying key from `steward-core`.
pub fn vault_ufvk<P: Parameters>(params: &P, ak_bytes: &[u8; 32]) -> Result<VaultUfvk> {
    // Validate the group key is a canonical Orchard spend-validating key up front (from_bytes
    // below re-checks it, but this gives a precise error).
    let _ak = SpendValidatingKey::from_bytes(ak_bytes)
        .context("invalid ak: not a canonical Orchard spend-validating key (even-Y, non-identity)")?;

    // Throwaway spending key purely to supply nk/rivk viewing material (no signing power).
    // Derived DETERMINISTICALLY from `ak` so that `derive-vault`, `fund`, and `sync` — run as
    // separate CLI invocations — always agree on the same UFVK/UA for a given group key. (nk/rivk
    // carry no spend authority; only address stability matters for the ak-only scanner path.)
    //
    // orchard 0.14 dropped `FullViewingKey::from_sk_ak`; instead we take the throwaway FVK's raw
    // 96-byte encoding (ak‖nk‖rivk) and splice the REAL group `ak` over its first 32 bytes, then
    // re-parse. `from_bytes` re-validates ak and derives the ivk, so a structurally bad key fails.
    let sk = spending_key_from_ak(ak_bytes);
    let mut fvk_bytes = FullViewingKey::from(&sk).to_bytes();
    fvk_bytes[0..32].copy_from_slice(ak_bytes);
    let fvk = FullViewingKey::from_bytes(&fvk_bytes)
        .context("building Orchard FVK from (real ak, filler nk/rivk): non-canonical ak or ⊥ ivk")?;

    let ufvk = UnifiedFullViewingKey::from_orchard_fvk(fvk)
        .map_err(|e| anyhow::anyhow!("building Orchard-only UFVK: {e:?}"))?;

    let ufvk_str = ufvk.encode(params);

    let (ua, _div_index) = ufvk
        .default_address(UnifiedAddressRequest::AllAvailableKeys)
        .map_err(|e| anyhow::anyhow!("deriving default vault UA: {e:?}"))?;
    let ua_str = ua.encode(params);

    Ok(VaultUfvk {
        ufvk: ufvk_str,
        receiving_ua: ua_str,
    })
}

/// Deterministically derive a valid Orchard [`SpendingKey`] from the group `ak`.
///
/// Domain-separates `ak` with a fixed tag and rejection-samples the rare invalid encoding by
/// bumping a trailing counter. Same `ak` in ⇒ same `sk` (hence same nk/rivk ⇒ same UFVK/UA) out.
/// This `sk` NEVER signs — it only supplies viewing-key filler (`nk`/`rivk`).
fn spending_key_from_ak(ak_bytes: &[u8; 32]) -> SpendingKey {
    // Cheap, dep-free deterministic mixing: a fixed tag XORed into ak, plus a 1-byte counter.
    const TAG: [u8; 32] = *b"steward-vault-nk-rivk-filler-v1!";
    for counter in 0u16..=u16::MAX {
        let mut bytes = [0u8; 32];
        for i in 0..32 {
            bytes[i] = ak_bytes[i] ^ TAG[i];
        }
        // Fold the counter into the last two bytes so successive attempts differ.
        bytes[30] ^= (counter & 0xff) as u8;
        bytes[31] ^= (counter >> 8) as u8;
        if let Some(sk) = Option::<SpendingKey>::from(SpendingKey::from_bytes(bytes)) {
            return sk;
        }
    }
    unreachable!("a valid Orchard SpendingKey exists within 65536 deterministic candidates")
}
