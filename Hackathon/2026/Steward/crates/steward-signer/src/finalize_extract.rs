//! Steps 4 & 5 — **Finalize** spends and **Extract** the broadcastable transaction.
//!
//! `zcash-sign` returns a signed but not-yet-finalized PCZT. We:
//! 1. finalize the Orchard spends (`SpendFinalizer`), then
//! 2. create the binding signature and extract the `zcash_primitives::transaction::Transaction`
//!    (`TransactionExtractor`).
//!
//! ## API (verified against `pczt-0.5.0/src/roles/{spend_finalizer,tx_extractor}/mod.rs`)
//! ```ignore
//! SpendFinalizer::new(pczt: Pczt) -> SpendFinalizer
//! SpendFinalizer::finalize_spends(self) -> Result<Pczt, Error>
//!
//! TransactionExtractor::new(pczt: Pczt) -> TransactionExtractor
//! TransactionExtractor::with_orchard(self, &orchard::circuit::VerifyingKey) -> Self
//! TransactionExtractor::with_sapling(self, &SpendVerifyingKey, &OutputVerifyingKey) -> Self
//! TransactionExtractor::extract(self) -> Result<Transaction, Error>
//! ```
//!
//! **Deviation from PROTOCOL §3:** the doc quotes `.with_sapling(&svk,&ovk)`. That is the
//! Sapling branch; the Steward vault is **Orchard-only**, so we supply the Orchard verifying
//! key via `.with_orchard(&VerifyingKey::build())`. (If omitted, the extractor regenerates a
//! VK on the fly — providing it just avoids that cost.)
//!
//! **Runtime-untested:** `extract()` requires the PCZT to carry a valid Orchard proof and all
//! spend-auth signatures applied; it recomputes the shielded sighash and rejects on mismatch.

use orchard::circuit::{OrchardCircuitVersion, VerifyingKey};
use pczt::{
    roles::{spend_finalizer::SpendFinalizer, tx_extractor::TransactionExtractor},
    Pczt,
};
use zcash_primitives::transaction::Transaction;

/// Finalize Orchard spends, then extract the final [`Transaction`], building a fresh
/// Orchard [`VerifyingKey`].
pub fn finalize_extract(signed: Pczt) -> anyhow::Result<Transaction> {
    // FixedPostNu6_2 — the NU6.2 verifying key matching the FixedPostNu6_2 proof produced by
    // `prove`. (`VerifyingKey::build()` already defaults to it in orchard 0.14; explicit here.)
    let vk = VerifyingKey::build_for_version(OrchardCircuitVersion::FixedPostNu6_2);
    finalize_extract_with_key(signed, &vk)
}

/// Finalize + extract using a caller-owned Orchard [`VerifyingKey`] (reuse across many txs).
pub fn finalize_extract_with_key(signed: Pczt, vk: &VerifyingKey) -> anyhow::Result<Transaction> {
    let finalized = SpendFinalizer::new(signed)
        .finalize_spends()
        .map_err(|e| anyhow::anyhow!("PCZT spend finalization failed: {e:?}"))?;

    let tx = TransactionExtractor::new(finalized)
        .with_orchard(vk)
        .extract()
        .map_err(|e| anyhow::anyhow!("PCZT transaction extraction failed: {e:?}"))?;

    Ok(tx)
}

/// Serialize an extracted [`Transaction`] to the raw wire bytes accepted by
/// `CompactTxStreamer::SendTransaction` / `sendrawtransaction`.
pub fn serialize_transaction(tx: &Transaction) -> anyhow::Result<Vec<u8>> {
    let mut raw = Vec::new();
    tx.write(&mut raw)
        .map_err(|e| anyhow::anyhow!("serializing transaction: {e}"))?;
    Ok(raw)
}
