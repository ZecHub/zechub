//! Zcash light-wallet commands: lightwalletd config + connectivity. Network and
//! endpoint are user-configurable; mainnet is the default, with testnet a click
//! away in settings.

use frost_app_core::ciphersuite::Suite;
use frost_app_core::signing::{run_coordinator, CoordinatorParams};
use frost_app_core::wallet::{self, LightwalletdInfo, WalletNetwork, WalletStatus};
use frost_client::api::PublicKey;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter, Manager, State};
use tokio::sync::mpsc;
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

use crate::error::{AppError, AppResult};
use crate::state::{AppState, CeremonyHandle};

fn network_from_str(s: &str) -> WalletNetwork {
    match s {
        "main" => WalletNetwork::Main,
        _ => WalletNetwork::Test,
    }
}

#[derive(Serialize)]
pub struct WalletConfig {
    /// "test" or "main".
    pub network: String,
    pub lightwalletd_url: String,
}

/// Resolve the effective wallet config, filling in the network's default
/// lightwalletd endpoint when none is saved.
fn resolve_config(state: &AppState) -> WalletConfig {
    let s = state.load_settings();
    // Mainnet is the default: it is where the wallet is actually used, and the
    // mainnet guardrails (badge, confirmation modal, address checks) make the
    // active network unmissable. Testnet remains one click away in settings.
    let network = s.wallet_network.clone().unwrap_or_else(|| "main".into());
    let net = network_from_str(&network);
    let lightwalletd_url = s
        .lightwalletd_url
        .clone()
        .filter(|u| !u.trim().is_empty())
        .unwrap_or_else(|| net.default_lightwalletd().to_string());
    WalletConfig {
        network,
        lightwalletd_url,
    }
}

#[tauri::command]
pub async fn get_wallet_config(state: State<'_, AppState>) -> AppResult<WalletConfig> {
    Ok(resolve_config(&state))
}

/// Save the wallet network and endpoint. An empty URL clears the override,
/// reverting to the network's default endpoint.
#[tauri::command]
pub async fn set_wallet_config(
    state: State<'_, AppState>,
    network: String,
    lightwalletd_url: String,
) -> AppResult<WalletConfig> {
    let mut settings = state.load_settings();
    settings.wallet_network = Some(if network == "main" { "main" } else { "test" }.to_string());
    let url = lightwalletd_url.trim();
    // Refuse to persist a plaintext (non-loopback http://) endpoint so wallet
    // traffic is never silently downgraded off TLS.
    if !url.is_empty() {
        wallet::validate_endpoint_security(url)?;
    }
    settings.lightwalletd_url = (!url.is_empty()).then(|| url.to_string());
    state.save_settings(&settings)?;
    Ok(resolve_config(&state))
}

/// Probe a lightwalletd endpoint and return its chain info (connectivity test).
/// Uses the configured endpoint when `url` is omitted.
#[tauri::command]
pub async fn lightwalletd_info(
    state: State<'_, AppState>,
    url: Option<String>,
) -> AppResult<LightwalletdInfo> {
    let url = url
        .filter(|u| !u.trim().is_empty())
        .unwrap_or_else(|| resolve_config(&state).lightwalletd_url);
    let mut info = wallet::lightwalletd_info(&url).await?;
    // Compute the consensus branch id this build would use at the node's height
    // and flag a mismatch (e.g. after a network upgrade like Ironwood the node
    // expects a branch id this build doesn't yet know), so the UI can warn
    // before a whole signing ceremony is spent on a tx the node will reject.
    let network = network_from_str(&resolve_config(&state).network);
    let wallet_branch = wallet::branch_id_for_height(network, info.block_height);
    info.branch_supported = Some(!info.consensus_branch_id.is_empty()
        && info.consensus_branch_id == wallet_branch);
    info.wallet_branch_id = Some(wallet_branch);
    Ok(info)
}

/// Resolve the wallet context for a RedPallas group: (network, lightwalletd
/// URL, derived UFVK string).
async fn group_wallet_ctx(
    state: &AppState,
    group_id: &str,
) -> AppResult<(WalletNetwork, String, String)> {
    let ciphersuite = state
        .with_config(|config| {
            config
                .group
                .get(group_id)
                .map(|g| g.ciphersuite.clone())
                .ok_or_else(|| AppError::new("config", "group not found"))
        })
        .await?;
    if !ciphersuite.contains("Pallas") {
        return Err(AppError::new(
            "config",
            "the wallet is only available for RedPallas (Zcash) groups",
        ));
    }
    let cfg = resolve_config(state);
    let network = WalletNetwork::from_str(&cfg.network);
    // The group id is the hex of its verifying key (the Orchard ak).
    let ufvk = frost_app_core::zcash::derive_orchard_keys_hex(group_id, network.network_type())?.ufvk;
    Ok((network, cfg.lightwalletd_url, ufvk))
}

/// Wallet balance + sync status for a group (reads the local db; no network).
#[tauri::command]
pub async fn wallet_group_status(
    state: State<'_, AppState>,
    group_id: String,
) -> AppResult<WalletStatus> {
    let (network, _url, ufvk) = group_wallet_ctx(&state, &group_id).await?;
    let db_key = state.wallet_db_key(&group_id).await?;
    Ok(wallet::group_status(
        &state.data_dir,
        &group_id,
        network,
        &ufvk,
        db_key.as_ref(),
    )?)
}

/// Import the group's UFVK as a view-only account. Idempotent. Touches the
/// network. Returns the first block the wallet will scan (0 if already imported).
///
/// `birthday_height` selects that first block. When omitted, a birthday recorded
/// from a previous import is reused — this is what lets a rebuilt wallet
/// database recover its funds instead of starting at the chain tip — and
/// otherwise the account starts at the tip, correct for a brand-new group.
#[tauri::command]
pub async fn wallet_init_account(
    state: State<'_, AppState>,
    group_id: String,
    birthday_height: Option<u64>,
) -> AppResult<u64> {
    let (network, url, ufvk) = group_wallet_ctx(&state, &group_id).await?;
    let db_key = state.wallet_db_key(&group_id).await?;

    let recorded = state
        .load_settings()
        .wallet_birthdays
        .get(&group_id)
        .copied();
    let requested = birthday_height.or(recorded);

    let scan_from = wallet::init_group_account(
        &state.data_dir,
        &group_id,
        network,
        &ufvk,
        &url,
        db_key.as_ref(),
        requested,
    )
    .await?;

    // Remember where this wallet starts, so a later rebuild of the (deleted)
    // wallet database scans from here again rather than from the chain tip.
    // `scan_from == 0` means the account already existed; nothing was imported.
    if scan_from > 0 && recorded != Some(scan_from) {
        let mut settings = state.load_settings();
        settings.wallet_birthdays.insert(group_id, scan_from);
        state.save_settings(&settings)?;
    }
    Ok(scan_from)
}

/// Scan progress as `[fully_scanned_height, chain_tip_height]`, read without the
/// wallet's write lock so it can be polled *while* `wallet_sync` is running.
/// `wallet_sync` blocks for the whole catch-up, so this is the only way to see a
/// long sync advance rather than appear frozen.
#[tauri::command]
pub async fn wallet_sync_progress(
    state: State<'_, AppState>,
    group_id: String,
) -> AppResult<(u64, u64)> {
    let (network, _url, _ufvk) = group_wallet_ctx(&state, &group_id).await?;
    let db_key = state.wallet_db_key(&group_id).await?;
    Ok(wallet::sync_progress(
        &state.data_dir,
        &group_id,
        network,
        db_key.as_ref(),
    )?)
}

/// Sync the group's wallet from lightwalletd, then return the updated status.
/// Long-running. Touches the network. Cancellable via [`wallet_cancel_sync`].
#[tauri::command]
pub async fn wallet_sync(state: State<'_, AppState>, group_id: String) -> AppResult<WalletStatus> {
    let (network, url, ufvk) = group_wallet_ctx(&state, &group_id).await?;
    let db_key = state.wallet_db_key(&group_id).await?;

    // Register a fresh cancellation token for this group, tripping (and replacing)
    // any prior one so at most one sync per group is ever live. "Sync Now" cancels
    // the previous run before this one starts, avoiding two writers on one db.
    let cancel = tokio_util::sync::CancellationToken::new();
    {
        let mut cancels = state.sync_cancels.lock().await;
        if let Some(prev) = cancels.insert(group_id.clone(), cancel.clone()) {
            prev.cancel();
        }
    }

    let result = wallet::sync_group(
        &state.data_dir, &group_id, network, &url, db_key.as_ref(), &cancel,
    )
    .await;

    // Tidy the registry. If our token was cancelled, either a newer sync replaced
    // us (its token is now the registry entry — leave it) or a cancel request did
    // (the next sync's insert will clear it) — either way, don't touch the map. If
    // we finished uncancelled, no newer sync can have started (that would have
    // cancelled us), so the entry is ours to remove.
    if !cancel.is_cancelled() {
        state.sync_cancels.lock().await.remove(&group_id);
    }

    result?;
    Ok(wallet::group_status(
        &state.data_dir,
        &group_id,
        network,
        &ufvk,
        db_key.as_ref(),
    )?)
}

/// Cancel the in-flight sync for a group, if any. The current `wallet_sync`
/// returns promptly with a "cancelled" error, freeing the wallet for a fresh
/// sync. Safe to call when nothing is syncing (a no-op).
#[tauri::command]
pub async fn wallet_cancel_sync(state: State<'_, AppState>, group_id: String) -> AppResult<()> {
    if let Some(token) = state.sync_cancels.lock().await.get(&group_id) {
        token.cancel();
    }
    Ok(())
}

/// On-chain transaction history for a group wallet: received funds and sent
/// transactions from the local wallet db, newest confirmed first.
#[tauri::command]
pub async fn wallet_history(
    state: State<'_, AppState>,
    group_id: String,
) -> AppResult<Vec<wallet::TxRecord>> {
    // Validate that `group_id` is a known RedPallas group before it is used as a
    // filesystem path component (see wallet_paths). This mirrors the guard every
    // other wallet command applies and prevents path traversal via the group id.
    let (network, _url, _ufvk) = group_wallet_ctx(&state, &group_id).await?;
    let db_key = state.wallet_db_key(&group_id).await?;
    Ok(wallet::wallet_history(&state.data_dir, &group_id, network, db_key.as_ref())?)
}

/// The unspent Orchard notes that make up the group's balance (for the "Review
/// Notes" view). Each note is one spend authorization / FROST signing round.
#[tauri::command]
pub async fn wallet_notes(
    state: State<'_, AppState>,
    group_id: String,
) -> AppResult<Vec<wallet::NoteRecord>> {
    let (network, _url, _ufvk) = group_wallet_ctx(&state, &group_id).await?;
    let db_key = state.wallet_db_key(&group_id).await?;
    Ok(wallet::wallet_notes(&state.data_dir, &group_id, network, db_key.as_ref())?)
}

/// A rotating receive address plus the diversifier index it was derived at.
#[derive(Serialize)]
pub struct ReceiveAddress {
    pub address: String,
    pub index: u32,
}

/// Resolve the diversifier index to hand out for a group, rotating past the
/// current one when the wallet has received new notes since it was issued (#3),
/// then derive and return the corresponding Orchard receive address. When
/// `force_new` is set, always advance to a fresh index.
async fn resolve_receive_address(
    state: &AppState,
    group_id: &str,
    force_new: bool,
) -> AppResult<ReceiveAddress> {
    let (network, _url, _ufvk) = group_wallet_ctx(state, group_id).await?;
    let db_key = state.wallet_db_key(group_id).await?;
    let current_notes =
        wallet::count_orchard_received_notes(&state.data_dir, group_id, network, db_key.as_ref())?;

    let mut settings = state.load_settings();
    let entry = settings.receive_state.entry(group_id.to_string()).or_default();
    // Rotate when explicitly asked, or when the address may have been used
    // (received-note count grew since it was issued).
    if force_new || current_notes > entry.baseline_notes {
        entry.index = entry.index.saturating_add(1);
        entry.baseline_notes = current_notes;
    }
    let index = entry.index;
    state.save_settings(&settings)?;

    let address =
        frost_app_core::zcash::derive_orchard_address_at(group_id, network.network_type(), index)?;
    Ok(ReceiveAddress { address, index })
}

/// The group's current rotating receive address. Advances automatically if the
/// previous address has plausibly been paid since it was issued.
#[tauri::command]
pub async fn wallet_receive_address(
    state: State<'_, AppState>,
    group_id: String,
) -> AppResult<ReceiveAddress> {
    resolve_receive_address(&state, &group_id, false).await
}

/// Force a brand-new receive address for the group (manual rotation).
#[tauri::command]
pub async fn wallet_new_receive_address(
    state: State<'_, AppState>,
    group_id: String,
) -> AppResult<ReceiveAddress> {
    resolve_receive_address(&state, &group_id, true).await
}

/// Build (but do not sign or broadcast) an Orchard transfer, returning the
/// draft PCZT and the sighash the group must FROST-sign. Moves no funds.
#[tauri::command]
pub async fn wallet_prepare_send(
    state: State<'_, AppState>,
    group_id: String,
    recipient: String,
    amount_zatoshis: u64,
    memo: Option<String>,
) -> AppResult<wallet::DraftTransaction> {
    let (network, url, _ufvk) = group_wallet_ctx(&state, &group_id).await?;
    let db_key = state.wallet_db_key(&group_id).await?;
    Ok(wallet::prepare_send(
        &state.data_dir,
        &group_id,
        network,
        &recipient,
        amount_zatoshis,
        memo,
        &url,
        db_key.as_ref(),
    )
    .await?)
}

#[derive(Deserialize)]
pub struct WalletSendArgs {
    pub group_id: String,
    pub recipient: String,
    pub amount_zatoshis: u64,
    /// Hex comm pubkeys of the group members who will sign (>= threshold).
    pub signers: Vec<String>,
    /// Optional memo to attach to the recipient's shielded output.
    pub memo: Option<String>,
}

/// Build, FROST-sign, and (next phase) broadcast an Orchard transfer. Builds the
/// PCZT, then drives the existing coordinator ceremony over the transaction
/// sighash using each spend's α as the re-randomizer; on completion, applies the
/// group signature to the PCZT. Emits `send:progress` / `send:complete` /
/// `send:failed`. Returns the ceremony id.
#[tauri::command]
pub async fn wallet_send<R: tauri::Runtime>(
    app: AppHandle<R>,
    args: WalletSendArgs,
) -> AppResult<Uuid> {
    let state = app.state::<AppState>();
    let (network, url, _ufvk) = group_wallet_ctx(&state, &args.group_id).await?;
    let db_key = state.wallet_db_key(&args.group_id).await?;

    // 1. Build the unsigned transaction (refreshes the chain tip so the expiry
    //    is anchored to the live tip).
    let draft = wallet::prepare_send(
        &state.data_dir,
        &args.group_id,
        network,
        &args.recipient,
        args.amount_zatoshis,
        args.memo,
        &url,
        db_key.as_ref(),
    )
    .await?;
    if draft.spends.is_empty() {
        return Err(AppError::new(
            "wallet",
            "the transaction has no Orchard spends to sign",
        ));
    }
    let message = hex::decode(draft.sighash_hex.trim())
        .map_err(|e| AppError::new("wallet", format!("sighash: {e}")))?;
    // Each Orchard spend is re-randomized with its own α, so each needs its own
    // re-randomized FROST signature over the (shared) sighash.
    let spends = draft
        .spends
        .iter()
        .map(|s| {
            let alpha = hex::decode(s.alpha_hex.trim())
                .map_err(|e| AppError::new("wallet", format!("alpha: {e}")))?;
            Ok((s.index, alpha))
        })
        .collect::<AppResult<Vec<(usize, Vec<u8>)>>>()?;

    // 2. Shared coordinator inputs (everything but the per-spend randomizer).
    let (group, server_url) =
        crate::commands::signing::group_context(&state, &args.group_id, None).await?;
    let suite = Suite::from_id(&group.ciphersuite).map_err(AppError::from)?;
    let trust = crate::commands::server::trust_for(&state, &server_url).await;
    let signers = args
        .signers
        .iter()
        .map(|hex_pubkey| {
            let pubkey = PublicKey(
                hex::decode(hex_pubkey)
                    .map_err(|e| AppError::new("config", format!("bad signer pubkey: {e}")))?,
            );
            let participant = group
                .participant
                .values()
                .find(|p| p.pubkey == pubkey)
                .ok_or_else(|| AppError::new("config", "signer is not a group participant"))?;
            Ok((pubkey, participant.identifier.clone()))
        })
        .collect::<AppResult<Vec<_>>>()?;
    let (comm_privkey, comm_pubkey) = state
        .with_config(|config| {
            let comm = config
                .communication_key
                .as_ref()
                .ok_or_else(|| AppError::new("config", "keystore has no communication key"))?;
            Ok((comm.privkey.clone(), comm.pubkey.clone()))
        })
        .await?;
    let public_key_package = group.public_key_package.clone();
    let self_key_package = group.key_package.clone();

    // 3. Spawn: one re-randomized ceremony per spend, then apply every signature
    //    to the PCZT and prove + broadcast.
    let ceremony_id = Uuid::new_v4();
    let cancel = CancellationToken::new();
    state.ceremonies.lock().await.insert(
        ceremony_id,
        CeremonyHandle {
            cancel: cancel.clone(),
            approval: None,
        },
    );

    let (tx, mut rx) = mpsc::channel(64);
    let event_app = app.clone();
    tauri::async_runtime::spawn(async move {
        while let Some(event) = rx.recv().await {
            let _ = event_app.emit(
                "send:progress",
                serde_json::json!({ "ceremony_id": ceremony_id, "event": event }),
            );
        }
    });

    let task_app = app.clone();
    let pczt_hex = draft.pczt_hex.clone();
    let sighash_hex = draft.sighash_hex.clone();
    let group_id = args.group_id.clone();
    // Transaction context fields sent to co-signers (C-1). For a multi-note
    // spend each note is signed in its own FROST session; every one carries the
    // same `plan_id` (the ceremony id) and the shared `tx_sighash` so a
    // participant can confirm the separate requests all belong to this one
    // transaction (#2). Built per-note below so `spend_index` can differ.
    let ctx_recipient = draft.recipient.clone();
    let ctx_amount = draft.amount_zatoshis;
    let ctx_fee = draft.fee_zatoshis;
    let ctx_memo = draft.memo.clone();
    let ctx_is_unshield = draft.is_unshield;
    let ctx_network = if matches!(network, WalletNetwork::Main) { "main" } else { "test" }.to_string();
    let plan_id = ceremony_id.to_string();
    tauri::async_runtime::spawn(async move {
        let fail = |error: String| {
            let _ = task_app.emit(
                "send:failed",
                serde_json::json!({ "ceremony_id": ceremony_id, "error": error }),
            );
        };

        // Budget the entire signing phase to 35 minutes. This is intentionally
        // tighter than the Zcash tx expiry window (~40 blocks ≈ 40 min on
        // testnet, 50 min on mainnet) so the user receives a clear timeout
        // message instead of a cryptic "transaction expired" error at broadcast.
        // Multi-spend transactions use this same total budget across all spends.
        const SIGNING_TIMEOUT: std::time::Duration = std::time::Duration::from_secs(35 * 60);

        let signing_result: Result<Vec<(usize, String)>, String> = {
            let total = spends.len();

            // Sign each note in its own re-randomized FROST session, one note at
            // a time. Each note is a distinct frostd session that every signer
            // must approve; running them sequentially means only one session is
            // live at a time, so the coordinator's shown session id always points
            // at the note currently being signed and external (e.g. CLI) signers
            // approve them in turn instead of having to find N simultaneous
            // sessions. Every session carries the same plan_id + tx_sighash so a
            // signer can confirm they all belong to this one transaction (#2).
            // Atomic: the first note to fail/reject returns Err before any
            // broadcast, so a partially-signed transaction is never produced.
            let signing_fut = async {
                let mut signatures: Vec<(usize, String)> = Vec::with_capacity(total);
                for (i, (index, alpha)) in spends.into_iter().enumerate() {
                    // Tell the UI which note is being signed; each is a separate
                    // approval in signers' inboxes.
                    let _ = task_app.emit(
                        "send:progress",
                        serde_json::json!({
                            "ceremony_id": ceremony_id,
                            "event": { "phase": "signing_spend", "spend": i + 1, "total": total },
                        }),
                    );
                    let send_context = serde_json::to_vec(&frost_app_core::events::SigningContext {
                        recipient: ctx_recipient.clone(),
                        amount_zatoshis: ctx_amount,
                        fee_zatoshis: ctx_fee,
                        memo: ctx_memo.clone(),
                        is_unshield: ctx_is_unshield,
                        network: ctx_network.clone(),
                        plan_id: plan_id.clone(),
                        spend_index: (i as u32) + 1,
                        spend_total: total as u32,
                        tx_sighash: sighash_hex.clone(),
                    })
                    .unwrap_or_default();
                    let params = CoordinatorParams {
                        server_url: server_url.clone(),
                        trust: trust.clone(),
                        comm_privkey: comm_privkey.clone(),
                        comm_pubkey: comm_pubkey.clone(),
                        public_key_package: public_key_package.clone(),
                        message: message.clone(),
                        signers: signers.clone(),
                        self_key_package: self_key_package.clone(),
                        randomizer: Some(alpha), // this note's α
                        send_context,
                    };
                    match run_coordinator(suite, params, tx.clone(), cancel.clone()).await {
                        Ok(output) => signatures.push((index, hex::encode(&output.signature))),
                        Err(e) => return Err(e.to_string()), // abort remaining notes
                    }
                }
                Ok(signatures)
            };
            match tokio::time::timeout(SIGNING_TIMEOUT, signing_fut).await {
                Ok(result) => result,
                Err(_elapsed) => {
                    cancel.cancel();
                    Err(
                        "Signing timed out after 35 minutes. \
                         The transaction has expired — start a new transaction \
                         when all signers are available."
                        .to_string(),
                    )
                }
            }
        };

        drop(tx); // close the progress channel so the forwarding task ends
        task_app
            .state::<AppState>()
            .ceremonies
            .lock()
            .await
            .remove(&ceremony_id);

        let signatures = match signing_result {
            Ok(sigs) => sigs,
            Err(e) => return fail(e),
        };

        let signed_pczt_hex =
            match wallet::apply_orchard_signatures(&pczt_hex, &sighash_hex, signatures) {
                Ok(hex) => hex,
                Err(e) => return fail(e.to_string()),
            };
        // Persist the fully-signed transaction before attempting broadcast. The
        // ceremony is the expensive, un-repeatable part; if broadcast fails
        // (endpoint down, transient network) the signed tx can be re-broadcast
        // via wallet_rebroadcast without gathering signatures again.
        let data_dir = task_app.state::<AppState>().data_dir.clone();
        let ceremony_str = ceremony_id.to_string();
        let _ = wallet::save_pending_tx(&data_dir, &group_id, network, &ceremony_str, &signed_pczt_hex);

        // Prove + broadcast. Surfaced as its own phase since the proof build is
        // the slow part (several seconds).
        let _ = task_app.emit(
            "send:progress",
            serde_json::json!({
                "ceremony_id": ceremony_id,
                "event": { "phase": "proving" },
            }),
        );
        // Re-read the endpoint at broadcast time so a mid-ceremony settings
        // change (or the earlier captured URL going stale) does not send to the
        // wrong node.
        let broadcast_url = group_wallet_ctx(&task_app.state::<AppState>(), &group_id)
            .await
            .map(|(_, u, _)| u)
            .unwrap_or(url);
        match wallet::broadcast_signed(&signed_pczt_hex, network, &broadcast_url).await {
            Ok(txid) => {
                wallet::clear_pending_tx(&data_dir, &group_id, network, &ceremony_str);
                let _ = task_app.emit(
                    "send:complete",
                    serde_json::json!({
                        "ceremony_id": ceremony_id,
                        "txid": txid,
                        "signed_pczt_hex": signed_pczt_hex,
                    }),
                );
            }
            Err(e) => {
                // Leave the pending record in place and tell the UI it can retry.
                let _ = task_app.emit(
                    "send:failed",
                    serde_json::json!({
                        "ceremony_id": ceremony_id,
                        "error": e.to_string(),
                        "retryable": true,
                    }),
                );
            }
        }
    });

    Ok(ceremony_id)
}

/// Re-broadcast a previously-signed transaction whose first broadcast failed,
/// without re-running the FROST ceremony. Reads the signed PCZT persisted by
/// `wallet_send`, proves + broadcasts it against the current endpoint, and
/// clears the pending record on success. Returns the broadcast txid.
#[tauri::command]
pub async fn wallet_rebroadcast(
    state: State<'_, AppState>,
    group_id: String,
    ceremony_id: String,
) -> AppResult<String> {
    let (network, url, _ufvk) = group_wallet_ctx(&state, &group_id).await?;
    let signed_pczt_hex = wallet::load_pending_tx(&state.data_dir, &group_id, network, &ceremony_id)?;
    let txid = wallet::broadcast_signed(&signed_pczt_hex, network, &url).await?;
    wallet::clear_pending_tx(&state.data_dir, &group_id, network, &ceremony_id);
    Ok(txid)
}
