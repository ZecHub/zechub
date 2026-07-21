//! Step 1 — **Construct** an unsigned, unproven v5 Orchard PCZT spending from the vault.
//!
//! Wraps `zcash_client_backend 0.21`'s two-call construction path against a synced
//! [`zcash_client_sqlite::WalletDb`]:
//!
//! ```text
//! propose_transfer(..) -> Proposal          (input selection + ZIP-317 fee/change)
//! create_pczt_from_proposal(..) -> pczt::Pczt   (fetches account.ufvk(); NO ask / USK needed)
//! ```
//!
//! `create_pczt_from_proposal` uses the account's **UFVK** (not a spending key) and pulls
//! note commitments / witnesses / anchor from the fully-synced wallet DB. Single-step
//! proposals only. Neither call touches `ask` — the Orchard circuit proves `rk = ak + [α]G`
//! from the public `ak`, and the only secret op (the spend-auth signature) is what FROST
//! produces later, out of band.
//!
//! ## Signature (verified against `zcash_client_backend-0.21.0/src/data_api/wallet.rs`)
//! ```ignore
//! pub fn propose_transfer<DbT, ParamsT, InputsT, ChangeT, CommitmentTreeErrT>(
//!     wallet_db: &mut DbT, params: &ParamsT,
//!     spend_from_account: <DbT as InputSource>::AccountId,
//!     input_selector: &InputsT, change_strategy: &ChangeT,
//!     request: zip321::TransactionRequest, confirmations_policy: ConfirmationsPolicy,
//! ) -> Result<Proposal<ChangeT::FeeRule, <DbT as InputSource>::NoteRef>, _>
//!
//! pub fn create_pczt_from_proposal<DbT, ParamsT, InputsErrT, FeeRuleT, ChangeErrT, N>(
//!     wallet_db: &mut DbT, params: &ParamsT,
//!     account_id: <DbT as WalletRead>::AccountId,
//!     ovk_policy: OvkPolicy, proposal: &Proposal<FeeRuleT, N>,
//! ) -> Result<pczt::Pczt, _> where DbT: WalletWrite + WalletCommitmentTrees, DbT::AccountId: serde::Serialize
//! ```
//! Note the deviations from PROTOCOL §3's shorthand: 0.21 `propose_transfer` takes an
//! `input_selector` + `change_strategy` + a `ConfirmationsPolicy` (NOT a raw
//! `min_confirmations`), and does not take a `fee_rule` directly (the fee lives in the
//! change strategy). `create_pczt_from_proposal`'s `InputsErrT`/`ChangeErrT` (and
//! `propose_transfer`'s `CommitmentTreeErrT`) only appear in the return error type, so
//! they must be turbofished — we use [`Infallible`], matching zcb's own test call.
//!
//! **Runtime-untested:** requires a synced `WalletDb` with the vault UFVK registered as a
//! spendable account and confirmed Orchard notes; returns `SyncRequired` otherwise.

use std::convert::Infallible;

use zcash_address::ZcashAddress;
use zcash_client_backend::{
    data_api::{
        wallet::{
            create_pczt_from_proposal, input_selection::GreedyInputSelector, propose_transfer,
            ConfirmationsPolicy,
        },
        InputSource, WalletCommitmentTrees, WalletRead, WalletWrite,
    },
    fees::{standard::SingleOutputChangeStrategy, DustOutputPolicy, StandardFeeRule},
    wallet::OvkPolicy,
};
use zcash_protocol::{consensus, value::Zatoshis, ShieldedProtocol};
use zip321::{Payment, TransactionRequest};

/// Construct an unsigned, unproven v5 Orchard PCZT from a synced wallet DB.
///
/// Generic over the concrete wallet-DB type (`WalletDb<Connection, N, CL, R>` in practice)
/// so this crate need not pin `rusqlite`/`rand` versions just to name it; the bounds below
/// are exactly what `propose_transfer` + `create_pczt_from_proposal` require.
///
/// * `wallet_db`     — fully-synced, writable wallet DB holding the vault account.
/// * `params`        — consensus parameters (`Network::TestNetwork` / `MainNetwork`).
/// * `account_id`    — the vault account (its UFVK is fetched internally).
/// * `request`       — ZIP-321 payment request (recipient UA + amount + optional memo).
/// * `confirmations_policy` — min-confirmation policy (e.g. `ConfirmationsPolicy::new_symmetrical_unchecked(10, ..)`).
pub fn construct_orchard_pczt<DbT, ParamsT>(
    wallet_db: &mut DbT,
    params: &ParamsT,
    account_id: <DbT as WalletRead>::AccountId,
    request: zip321::TransactionRequest,
    confirmations_policy: ConfirmationsPolicy,
) -> anyhow::Result<pczt::Pczt>
where
    ParamsT: consensus::Parameters + Clone,
    DbT: WalletRead
        + WalletWrite
        + WalletCommitmentTrees
        + InputSource<
            Error = <DbT as WalletRead>::Error,
            AccountId = <DbT as WalletRead>::AccountId,
        >,
    <DbT as InputSource>::NoteRef: Copy + Eq + Ord,
    <DbT as WalletRead>::AccountId: serde::Serialize + Copy,
{
    // Standard greedy input selection + single-output ZIP-317 change to the Orchard pool.
    let input_selector = GreedyInputSelector::<DbT>::new();
    let change_strategy = SingleOutputChangeStrategy::<DbT>::new(
        StandardFeeRule::Zip317,
        None,                      // change memo
        ShieldedProtocol::Orchard, // fallback change pool (Orchard-only vault)
        DustOutputPolicy::default(),
    );

    // `CommitmentTreeErrT` is a free phantom in the return error type → turbofish it.
    let proposal = propose_transfer::<_, _, _, _, Infallible>(
        wallet_db,
        params,
        account_id,
        &input_selector,
        &change_strategy,
        request,
        confirmations_policy,
    )
    .map_err(|e| anyhow::anyhow!("propose_transfer failed (input selection / fee / sync): {e:?}"))?;

    // `InputsErrT` / `ChangeErrT` are free phantoms too → Infallible (matches zcb's own test call).
    let pczt = create_pczt_from_proposal::<_, _, Infallible, _, Infallible, _>(
        wallet_db,
        params,
        account_id,
        OvkPolicy::Sender,
        &proposal,
    )
    .map_err(|_| anyhow::anyhow!("create_pczt_from_proposal failed (build / anchor / witness)"))?;

    Ok(pczt)
}

/// Compute the maximum sendable amount to `recipient`: the full spendable balance minus the
/// **exact** ZIP-317 fee, so an inheritance release/sweep empties the vault and leaves **zero
/// change**. This drives the amount for [`construct_orchard_pczt`] when sweeping.
///
/// It iterates `propose_transfer` (cheap — input selection + fee only, no Halo2 proving) to
/// converge on the fee: ZIP-317 charges `5000 · max(2, actions)` zat, so a proposal only
/// succeeds when the requested amount leaves room for the fee. Starting at the 2-grace-action
/// minimum, on a successful proposal `fee_required ≤ our guess` (selected inputs ≤ balance), so
/// we re-target the amount at that exact fee → zero change; on an insufficient-funds error the
/// action count needs a higher fee, so we bump one marginal action and retry.
pub fn max_sendable<DbT, ParamsT>(
    wallet_db: &mut DbT,
    params: &ParamsT,
    account_id: <DbT as WalletRead>::AccountId,
    recipient: ZcashAddress,
    confirmations_policy: ConfirmationsPolicy,
) -> anyhow::Result<Zatoshis>
where
    ParamsT: consensus::Parameters + Clone,
    DbT: WalletRead
        + WalletWrite
        + WalletCommitmentTrees
        + InputSource<
            Error = <DbT as WalletRead>::Error,
            AccountId = <DbT as WalletRead>::AccountId,
        >,
    <DbT as InputSource>::NoteRef: Copy + Eq + Ord,
    <DbT as WalletRead>::AccountId: serde::Serialize + Copy,
{
    let spendable: u64 = wallet_db
        .get_wallet_summary(confirmations_policy)
        .map_err(|e| anyhow::anyhow!("get_wallet_summary failed: {e:?}"))?
        .ok_or_else(|| anyhow::anyhow!("wallet not synced — run `sync` before a release"))?
        .account_balances()
        .get(&account_id)
        .map(|b| u64::from(b.spendable_value()))
        .unwrap_or(0);
    if spendable == 0 {
        anyhow::bail!("vault has no spendable balance to release");
    }

    let input_selector = GreedyInputSelector::<DbT>::new();
    let change_strategy = SingleOutputChangeStrategy::<DbT>::new(
        StandardFeeRule::Zip317,
        None,
        ShieldedProtocol::Orchard,
        DustOutputPolicy::default(),
    );

    let mut fee: u64 = 10_000; // 5000 · 2 grace actions (ZIP-317 minimum)
    for _ in 0..12 {
        let amount_zat = spendable.checked_sub(fee).ok_or_else(|| {
            anyhow::anyhow!("balance {spendable} zat cannot cover the ZIP-317 fee {fee} zat")
        })?;
        let amount = Zatoshis::from_u64(amount_zat).map_err(|e| anyhow::anyhow!("amount: {e:?}"))?;
        let request =
            TransactionRequest::new(vec![Payment::without_memo(recipient.clone(), amount)])
                .map_err(|e| anyhow::anyhow!("building zip321 request: {e:?}"))?;
        match propose_transfer::<_, _, _, _, Infallible>(
            wallet_db,
            params,
            account_id,
            &input_selector,
            &change_strategy,
            request,
            confirmations_policy,
        ) {
            Ok(proposal) => {
                let required = u64::from(proposal.steps().first().balance().fee_required());
                let exact = spendable.checked_sub(required).ok_or_else(|| {
                    anyhow::anyhow!("balance {spendable} zat cannot cover fee {required} zat")
                })?;
                return Zatoshis::from_u64(exact).map_err(|e| anyhow::anyhow!("amount: {e:?}"));
            }
            // Insufficient for the fee at this action count → try one more marginal action.
            Err(_) => fee = fee.saturating_add(5_000),
        }
    }
    anyhow::bail!("could not converge on a release amount (last fee {fee} zat, balance {spendable} zat)")
}
