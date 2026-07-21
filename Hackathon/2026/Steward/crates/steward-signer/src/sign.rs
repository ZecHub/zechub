//! Step 3 — **Sign** the proven v5 PCZT **inline**, sourcing each Orchard spend-auth
//! signature from FROST (via the coordinator).
//!
//! The pre-NU6.2 flow shelled out to an external `zcash-sign` binary; that binary is built
//! on the obsolete Orchard circuit and is unusable on NU6.2 mainnet. This module replaces it
//! with the `pczt 0.7` **Signer** roles, so signing happens entirely in-process:
//!
//! 1. `pczt::roles::signer::Signer::new(pczt)` computes the ZIP-244 v5 **shielded sighash**
//!    (internally: `pczt.into_effects()` → `TransactionData` → `TxIdDigester` →
//!    `v5_signature_hash(&txdata, &SignableInput::Shielded, &txid_parts)`). We read it back with
//!    [`Signer::shielded_sighash`] — this is the FROST signing message, identical for every
//!    shielded spend and identical to what the `TransactionExtractor` later recomputes.
//! 2. `pczt::roles::low_level_signer::Signer::sign_orchard_with` hands us the **parsed** Orchard
//!    bundle (`orchard::pczt::Bundle`). For each action we read its spend-auth randomizer α
//!    (`action.spend().alpha()` → `pallas::Scalar`) and its 32-byte LE encoding (`α.to_repr()`).
//! 3. For each non-dummy action we invoke the caller's closure with `(sighash, α, idx)` — the
//!    **seam to `steward-core`**: it runs one re-randomized FROST round under α and returns the
//!    aggregated 64-byte `R‖z` RedPallas SpendAuth signature.
//! 4. We wrap those 64 bytes as `redpallas::Signature<SpendAuth>` and apply them with
//!    [`orchard::pczt::Action::apply_signature`], which re-verifies `rk.verify(sighash, sig)`
//!    (i.e. `rk = ak + [α]G`) before accepting — so a wrong α or sighash is rejected here, not
//!    silently broadcast.
//!
//! α is passed to FROST **unchanged** (`rk = ak + [α]G`); the closure must not regenerate it.

use anyhow::{anyhow, Result};
use ff::PrimeField;
use orchard::primitives::redpallas::{self, SpendAuth};
use orchard::value::NoteValue;
use pczt::roles::{low_level_signer::Signer as LowLevelSigner, signer::Signer};
use pczt::Pczt;

/// Sign every Orchard spend in a proven PCZT inline, sourcing each 64-byte spend-auth
/// signature from `make_signature`, and return the signed PCZT.
///
/// `make_signature(sighash, alpha, idx) -> [u8; 64]` is the FROST seam (see module docs):
/// given the shared shielded sighash and this action's randomizer α, it returns the aggregated
/// RedPallas `R‖z` signature already verified against `rk = ak + [α]G`.
pub fn sign_pczt<F>(proven: &Pczt, mut make_signature: F) -> Result<Pczt>
where
    F: FnMut([u8; 32], [u8; 32], usize) -> [u8; 64],
{
    // (1) The v5 shielded sighash — the FROST signing message, shared by all shielded spends.
    // Signer::new performs `into_effects()` + TxIdDigester + v5_signature_hash(Shielded) for us.
    let shielded_sighash = Signer::new(proven.clone())
        .map_err(|e| anyhow!("pczt Signer::new (deriving shielded sighash) failed: {e:?}"))?
        .shielded_sighash();

    // (2..4) Apply a FROST signature to every Orchard action via the parsed orchard bundle,
    // which is the only place α (pallas::Scalar) is publicly reachable.
    let signed = LowLevelSigner::new(proven.clone())
        .sign_orchard_with(|_pczt, bundle, _tx_modifiable| {
            for (idx, action) in bundle.actions_mut().iter_mut().enumerate() {
                // Only REAL spends (non-zero note value) carry the vault's note and need our
                // external FROST signature. Orchard pads the bundle with DUMMY spends (value 0)
                // under their own throwaway keys — already signed by the PCZT constructor. FROST-
                // signing a dummy would produce a sig that fails against the dummy's own rk (it is
                // NOT the vault's ak), which is exactly the `InvalidExternalSignature` we must
                // avoid. This value-based real/dummy split matches the original zcash-sign.
                match action.spend().value() {
                    Some(v) if *v != NoteValue::default() => {}
                    _ => continue, // dummy padding (value 0) or no value → already signed; skip
                }

                // α = this real spend's re-randomizer; passed to FROST unchanged (rk = ak + [α]G).
                let alpha: [u8; 32] = match action.spend().alpha() {
                    Some(a) => a.to_repr(), // canonical 32-byte little-endian pallas::Scalar
                    None => continue,
                };

                // FROST seam: steward-core aggregates the 64-byte RedPallas sig under (sighash, α).
                let sig64 = make_signature(shielded_sighash, alpha, idx);
                let sig = redpallas::Signature::<SpendAuth>::from(sig64);

                // apply_signature re-verifies rk.verify(sighash, sig) (rk = ak + [α]G).
                action
                    .apply_signature(shielded_sighash, sig)
                    .map_err(|e| anyhow!("applying FROST spend-auth signature to action #{idx}: {e:?}"))?;
            }
            Ok::<(), anyhow::Error>(())
        })?
        .finish();

    Ok(signed)
}
