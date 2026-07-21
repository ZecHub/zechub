//! Step 2 — **Prove**: attach the Halo2 Orchard proof to the PCZT.
//!
//! Proving happens BEFORE `zcash-sign` (canonical order). It needs only the public Orchard
//! [`ProvingKey`] — no `ask`: the circuit proves `rk = ak + [α]G` from the public `ak`
//! embedded in the FVK. The one secret operation (the spend-auth signature over the sighash)
//! is produced later by FROST.
//!
//! ## API (verified against `pczt-0.5.0/src/roles/prover/{mod,orchard}.rs`)
//! ```ignore
//! Prover::new(pczt: Pczt) -> Prover
//! Prover::create_orchard_proof(self, pk: &orchard::circuit::ProvingKey) -> Result<Self, OrchardError>
//! Prover::finish(self) -> Pczt
//! ```
//!
//! **Runtime cost:** `ProvingKey::build()` and proof generation are heavy (Halo2). Build the
//! key once and reuse it if proving many PCZTs — see [`prove_with_key`].

use orchard::circuit::{OrchardCircuitVersion, ProvingKey};
use pczt::{roles::prover::Prover, Pczt};

/// Prove the Orchard bundle, building a fresh [`ProvingKey`] (expensive — see [`prove_with_key`]).
///
/// The key is built for [`OrchardCircuitVersion::FixedPostNu6_2`] — the NU6.2 circuit that fixes
/// GHSA-2x4w-pxqw-58v9 and that mainnet requires. (`ProvingKey::build()` already defaults to this
/// in orchard 0.14; we name it explicitly so the NU6.2 intent is unmistakable.)
pub fn prove(pczt: Pczt) -> anyhow::Result<Pczt> {
    let pk = ProvingKey::build_for_version(OrchardCircuitVersion::FixedPostNu6_2);
    prove_with_key(pczt, &pk)
}

/// Prove the Orchard bundle using a caller-owned [`ProvingKey`] (reuse across many PCZTs).
pub fn prove_with_key(pczt: Pczt, pk: &ProvingKey) -> anyhow::Result<Pczt> {
    let proven = Prover::new(pczt)
        .create_orchard_proof(pk)
        .map_err(|e| anyhow::anyhow!("orchard proof generation failed: {e:?}"))?
        .finish();
    Ok(proven)
}
