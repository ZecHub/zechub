//! Step 4 — **Build PCZT**: `propose_transfer` + `create_pczt_from_proposal` against the synced
//! WalletDb, then attach the Halo2 Orchard proof — yielding a proven (but unsigned) v5 PCZT ready
//! for `zcash-sign`.
//!
//! Requires a confirmed spendable Orchard note in the vault account (i.e. run `sync` after the
//! faucet funding confirms). With no confirmed note this fails at `propose_transfer` with an
//! insufficient-funds / sync-required error — which is the expected blocker until funding lands.

use std::num::NonZeroU32;
use std::path::Path;

use anyhow::{anyhow, Context, Result};
use pczt::Pczt;
use zcash_address::ZcashAddress;
use zcash_client_backend::data_api::{wallet::ConfirmationsPolicy, WalletRead};
use zcash_protocol::{consensus::Network, value::Zatoshis};
use zip321::{Payment, TransactionRequest};

use zcash_keys::keys::UnifiedFullViewingKey;

use crate::{
    construct::{construct_orchard_pczt, max_sendable},
    prove::prove,
    sync::{open_wallet_db, vault_data_dir},
};

/// Build + prove a v5 Orchard PCZT spending `amount_zat` from the vault to `to`.
///
/// * `data_dir` — the same `--data-dir` used by `sync` (holds the synced WalletDb).
/// * `ufvk` — the vault's viewing key; selects the per-vault WalletDb `sync` wrote to.
/// * `to` — recipient Unified/Sapling address string.
/// * `min_confirmations` — confirmations required on the input note (clamped to ≥ 1).
pub fn build_and_prove(
    params: Network,
    data_dir: &Path,
    ufvk: &UnifiedFullViewingKey,
    to: &str,
    amount_zat: u64,
    min_confirmations: u32,
) -> Result<Pczt> {
    build_inner(params, data_dir, ufvk, to, Some(amount_zat), min_confirmations)
}

/// Build + prove a **sweep**: send the vault's *entire* spendable balance (minus the ZIP-317
/// fee) to `to`, leaving zero change. This backs the inheritance release — the whole vault
/// passes to the heir. Same viewing-key-only construction as [`build_and_prove`]; only the
/// amount differs (computed by [`max_sendable`]).
pub fn build_and_prove_sweep(
    params: Network,
    data_dir: &Path,
    ufvk: &UnifiedFullViewingKey,
    to: &str,
    min_confirmations: u32,
) -> Result<Pczt> {
    build_inner(params, data_dir, ufvk, to, None, min_confirmations)
}

/// Shared build path. `amount_zat = None` means sweep the whole spendable balance to `to`.
fn build_inner(
    params: Network,
    data_dir: &Path,
    ufvk: &UnifiedFullViewingKey,
    to: &str,
    amount_zat: Option<u64>,
    min_confirmations: u32,
) -> Result<Pczt> {
    let vault_dir = vault_data_dir(data_dir, params, ufvk);
    let mut db = open_wallet_db(&vault_dir, params)?;

    let account_id = db
        .get_account_ids()
        .map_err(|e| anyhow!("reading accounts: {e}"))?
        .into_iter()
        .next()
        .ok_or_else(|| {
            anyhow!(
                "no account in WalletDb at {} — run `sync` first",
                vault_dir.display()
            )
        })?;

    let recipient: ZcashAddress = to
        .parse()
        .map_err(|e| anyhow!("parsing recipient address {to}: {e}"))?;

    let policy = ConfirmationsPolicy::new_symmetrical(
        NonZeroU32::new(min_confirmations.max(1)).unwrap(),
        true,
    );

    // Fixed amount, or the full spendable balance minus the exact fee (sweep → zero change).
    let amount = match amount_zat {
        Some(a) => Zatoshis::from_u64(a).map_err(|e| anyhow!("invalid amount: {e:?}"))?,
        None => max_sendable(&mut db, &params, account_id, recipient.clone(), policy)
            .context("computing the release sweep amount")?,
    };
    let request = TransactionRequest::new(vec![Payment::without_memo(recipient, amount)])
        .map_err(|e| anyhow!("building zip321 request: {e:?}"))?;

    let unproven = construct_orchard_pczt(&mut db, &params, account_id, request, policy)
        .context("construct PCZT (propose_transfer + create_pczt_from_proposal)")?;

    // Attach the Halo2 Orchard proof (public ProvingKey; no ask). Heavy but one-shot.
    let proven = prove(unproven).context("prove PCZT (Halo2 Orchard)")?;
    Ok(proven)
}
