use frost_app_core::ciphersuite::Suite;
use frost_app_core::dkg::{run_dkg, DkgParams};
use frost_client::api::PublicKey;
use serde::Deserialize;
use tauri::{AppHandle, Emitter, Manager};
use tokio::sync::mpsc;
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

use crate::error::{AppError, AppResult};
use crate::state::{AppState, CeremonyHandle};

#[derive(Deserialize)]
pub struct StartDkgArgs {
    /// "ed25519" | "redpallas"
    pub suite: Suite,
    pub description: String,
    pub threshold: u16,
    /// Hex comm pubkeys of the other participants (initiator only; empty to
    /// join an existing session).
    pub participants: Vec<String>,
    /// `host:port`; falls back to the saved server URL.
    pub server_url: Option<String>,
    /// Session to join (participants only).
    pub session_id: Option<Uuid>,
}

#[tauri::command]
pub async fn start_dkg<R: tauri::Runtime>(app: AppHandle<R>, args: StartDkgArgs) -> AppResult<Uuid> {
    let state = app.state::<AppState>();

    let server_url = match args.server_url {
        Some(url) => url,
        None => state
            .load_settings()
            .server_url
            .ok_or_else(|| AppError::new("config", "no server configured"))?,
    };
    let server_url = server_url
        .trim_start_matches("https://")
        .trim_end_matches('/')
        .to_string();
    let trust = crate::commands::server::trust_for(&state, &server_url).await;

    // Snapshot everything we need from the keystore before spawning.
    let (comm_privkey, comm_pubkey, known_pubkeys, mut participants) = state
        .with_config(|config| {
            let comm = config
                .communication_key
                .as_ref()
                .ok_or_else(|| AppError::new("config", "keystore has no communication key"))?;
            let mut known: Vec<PublicKey> =
                config.contact.values().map(|c| c.pubkey.clone()).collect();
            known.push(comm.pubkey.clone());
            let participants = args
                .participants
                .iter()
                .map(|s| {
                    Ok(PublicKey(hex::decode(s).map_err(|e| {
                        AppError::new("config", format!("bad participant pubkey: {e}"))
                    })?))
                })
                .collect::<AppResult<Vec<_>>>()?;
            Ok((
                comm.privkey.clone(),
                comm.pubkey.clone(),
                known,
                participants,
            ))
        })
        .await?;

    // The initiator includes themselves in the session.
    if !participants.is_empty() && !participants.contains(&comm_pubkey) {
        participants.push(comm_pubkey.clone());
    }

    let params = DkgParams {
        server_url,
        trust,
        comm_privkey,
        comm_pubkey,
        description: args.description,
        min_signers: args.threshold,
        participants,
        known_pubkeys,
        session_id: args.session_id,
    };

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
                "dkg:progress",
                serde_json::json!({ "ceremony_id": ceremony_id, "event": event }),
            );
        }
    });

    let task_app = app.clone();
    let suite = args.suite;
    tauri::async_runtime::spawn(async move {
        let result = run_dkg(suite, params, tx, cancel).await;
        let state = task_app.state::<AppState>();
        state.ceremonies.lock().await.remove(&ceremony_id);
        match result {
            Ok(output) => {
                let group_id = output.group_id.clone();
                let saved = state
                    .mutate_config(move |config| {
                        config.group.insert(output.group_id.clone(), output.group);
                        Ok(())
                    })
                    .await;
                match saved {
                    Ok(()) => {
                        let _ = task_app.emit(
                            "dkg:complete",
                            serde_json::json!({ "ceremony_id": ceremony_id, "group_id": group_id }),
                        );
                    }
                    Err(e) => {
                        let _ = task_app.emit(
                            "dkg:failed",
                            serde_json::json!({
                                "ceremony_id": ceremony_id,
                                "error": format!("DKG succeeded but saving the group failed: {}", e.message),
                            }),
                        );
                    }
                }
            }
            Err(e) => {
                let _ = task_app.emit(
                    "dkg:failed",
                    serde_json::json!({ "ceremony_id": ceremony_id, "error": e.to_string() }),
                );
            }
        }
    });

    Ok(ceremony_id)
}

#[tauri::command]
pub async fn cancel_ceremony<R: tauri::Runtime>(app: AppHandle<R>, ceremony_id: Uuid) -> AppResult<()> {
    let state = app.state::<AppState>();
    if let Some(handle) = state.ceremonies.lock().await.remove(&ceremony_id) {
        handle.cancel.cancel();
    }
    Ok(())
}
