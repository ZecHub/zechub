use frost_app_core::ciphersuite::Suite;
use frost_app_core::signing::{
    run_coordinator, run_participant, CoordinatorParams, ParticipantParams,
};
use frost_client::api::{self, PublicKey};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter, Manager, State};
use tokio::sync::{mpsc, oneshot};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

use crate::error::{AppError, AppResult};
use crate::state::{AppState, CeremonyHandle};

/// Resolve a group from the keystore plus the server/trust to use for it.
pub(crate) async fn group_context(
    state: &AppState,
    group_id: &str,
    server_override: Option<String>,
) -> AppResult<(frost_client::cli::config::Group, String)> {
    let group = state
        .with_config(|config| {
            config
                .group
                .get(group_id)
                .cloned()
                .ok_or_else(|| AppError::new("config", "group not found"))
        })
        .await?;
    // If the local sidecar is running and no explicit per-group URL was set,
    // connect to it directly instead of routing through the Cloudflare tunnel
    // URL that may be saved in settings for external participants to use.
    let local_sidecar_url = {
        let guard = state.sidecar.lock().await;
        guard.as_ref().map(|h| format!("127.0.0.1:{}", h.port))
    };
    // The group records the server it was created on. That is the right default
    // for a *stable* address, but a Cloudflare quick tunnel is ephemeral: its
    // hostname is regenerated whenever the coordinator restarts the tunnel, so a
    // stored one is dead the moment that happens. Left ahead of the current
    // setting it would silently pin the group to a permanently-unresolvable host
    // — you could still *see* a session (the inbox polls the configured server)
    // but never join it. So a stored ephemeral URL yields to the live setting,
    // and is only used as a last resort when nothing else is configured.
    let (stable_group_url, ephemeral_group_url) = match group.server_url.clone() {
        Some(u) if frost_app_core::neterr::is_ephemeral_server(&u) => (None, Some(u)),
        other => (other, None),
    };
    let server_url = server_override
        .or(stable_group_url)
        .or(local_sidecar_url)
        .or_else(|| state.load_settings().server_url)
        .or(ephemeral_group_url)
        .ok_or_else(|| AppError::new("config", "no server configured for this group"))?;
    let server_url = server_url
        .trim_start_matches("https://")
        .trim_end_matches('/')
        .to_string();
    Ok((group, server_url))
}

#[derive(Deserialize)]
pub struct CreateSigningSessionArgs {
    pub group_id: String,
    /// Hex-encoded message to sign.
    pub message_hex: String,
    /// Hex comm pubkeys of the signers (must be group participants).
    pub signers: Vec<String>,
    pub server_url: Option<String>,
}

#[tauri::command]
pub async fn create_signing_session<R: tauri::Runtime>(
    app: AppHandle<R>,
    args: CreateSigningSessionArgs,
) -> AppResult<Uuid> {
    let state = app.state::<AppState>();
    let (group, server_url) = group_context(&state, &args.group_id, args.server_url).await?;
    let suite = Suite::from_id(&group.ciphersuite).map_err(AppError::from)?;
    let trust = crate::commands::server::trust_for(&state, &server_url).await;

    let message = hex::decode(args.message_hex.trim())
        .map_err(|e| AppError::new("config", format!("message must be hex: {e}")))?;
    if message.is_empty() {
        return Err(AppError::new("config", "message is empty"));
    }

    // Map selected signer pubkeys to their group identifiers.
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

    let params = CoordinatorParams {
        server_url,
        trust,
        comm_privkey,
        comm_pubkey,
        public_key_package: group.public_key_package.clone(),
        message,
        signers,
        // The local user's own share, used only if they are among the signers
        // so the coordinator can contribute its commitment/share locally.
        self_key_package: group.key_package.clone(),
        // Standalone signing generates a fresh randomizer; the Orchard
        // transaction flow (phase 5) supplies the spend's α here instead.
        randomizer: None,
        // Standalone signing has no wallet transaction context to show.
        send_context: Vec::new(),
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
                "signing:progress",
                serde_json::json!({ "ceremony_id": ceremony_id, "event": event }),
            );
        }
    });

    let task_app = app.clone();
    tauri::async_runtime::spawn(async move {
        // 35-minute timeout: gives signers ample time to approve while keeping
        // the session from hanging indefinitely when someone goes offline.
        const TIMEOUT: std::time::Duration = std::time::Duration::from_secs(35 * 60);
        let result = match tokio::time::timeout(TIMEOUT, run_coordinator(suite, params, tx, cancel)).await {
            Ok(r) => r,
            Err(_) => Err(frost_app_core::CoreError::Ceremony(
                "Signing session timed out after 35 minutes. \
                 Start a new session when all participants are available."
                .to_string(),
            )),
        };
        let state = task_app.state::<AppState>();
        state.ceremonies.lock().await.remove(&ceremony_id);
        match result {
            Ok(output) => {
                let _ = task_app.emit(
                    "signing:complete",
                    serde_json::json!({
                        "ceremony_id": ceremony_id,
                        "signature_hex": hex::encode(&output.signature),
                    }),
                );
            }
            Err(e) => {
                let _ = task_app.emit(
                    "signing:failed",
                    serde_json::json!({ "ceremony_id": ceremony_id, "error": e.to_string() }),
                );
            }
        }
    });

    Ok(ceremony_id)
}

#[derive(Deserialize)]
pub struct JoinSigningSessionArgs {
    pub group_id: String,
    pub session_id: Uuid,
    pub server_url: Option<String>,
}

#[tauri::command]
pub async fn join_signing_session<R: tauri::Runtime>(
    app: AppHandle<R>,
    args: JoinSigningSessionArgs,
) -> AppResult<Uuid> {
    let state = app.state::<AppState>();
    let (group, server_url) = group_context(&state, &args.group_id, args.server_url).await?;
    let suite = Suite::from_id(&group.ciphersuite).map_err(AppError::from)?;
    let trust = crate::commands::server::trust_for(&state, &server_url).await;

    let (comm_privkey, comm_pubkey) = state
        .with_config(|config| {
            let comm = config
                .communication_key
                .as_ref()
                .ok_or_else(|| AppError::new("config", "keystore has no communication key"))?;
            Ok((comm.privkey.clone(), comm.pubkey.clone()))
        })
        .await?;

    let params = ParticipantParams {
        server_url,
        trust,
        comm_privkey,
        comm_pubkey,
        key_package: group.key_package.clone(),
        session_id: args.session_id,
        group_pubkeys: group.participant.values().map(|p| p.pubkey.clone()).collect(),
    };

    let ceremony_id = Uuid::new_v4();
    let cancel = CancellationToken::new();
    let (approve_tx, approve_rx) = oneshot::channel();
    state.ceremonies.lock().await.insert(
        ceremony_id,
        CeremonyHandle {
            cancel: cancel.clone(),
            approval: Some(approve_tx),
        },
    );

    let (tx, mut rx) = mpsc::channel(64);
    let event_app = app.clone();
    tauri::async_runtime::spawn(async move {
        while let Some(event) = rx.recv().await {
            let _ = event_app.emit(
                "signing:progress",
                serde_json::json!({ "ceremony_id": ceremony_id, "event": event }),
            );
        }
    });

    let task_app = app.clone();
    tauri::async_runtime::spawn(async move {
        let result = run_participant(suite, params, approve_rx, tx, cancel).await;
        let state = task_app.state::<AppState>();
        state.ceremonies.lock().await.remove(&ceremony_id);
        match result {
            Ok(()) => {
                let _ = task_app.emit(
                    "signing:complete",
                    serde_json::json!({ "ceremony_id": ceremony_id, "signature_hex": null }),
                );
            }
            Err(e) => {
                let _ = task_app.emit(
                    "signing:failed",
                    serde_json::json!({ "ceremony_id": ceremony_id, "error": e.to_string() }),
                );
            }
        }
    });

    Ok(ceremony_id)
}

/// Resolve the approval gate for a participant ceremony.
#[tauri::command]
pub async fn respond_to_signing(
    state: State<'_, AppState>,
    ceremony_id: Uuid,
    approve: bool,
) -> AppResult<()> {
    let mut ceremonies = state.ceremonies.lock().await;
    let handle = ceremonies
        .get_mut(&ceremony_id)
        .ok_or_else(|| AppError::new("ceremony", "ceremony not found"))?;
    let approval = handle
        .approval
        .take()
        .ok_or_else(|| AppError::new("ceremony", "ceremony is not awaiting approval"))?;
    approval
        .send(approve)
        .map_err(|_| AppError::new("ceremony", "ceremony is no longer running"))?;
    Ok(())
}

#[derive(Serialize)]
pub struct PendingSession {
    pub session_id: Uuid,
    /// Contact name of the coordinator if known.
    pub coordinator: Option<String>,
    pub coordinator_pubkey: String,
    /// Group IDs in the keystore whose participants include the coordinator.
    pub matching_groups: Vec<String>,
}

/// One-shot poll of the configured server for sessions involving us.
/// The frontend inbox calls this periodically while unlocked.
#[tauri::command]
pub async fn list_pending_sessions(
    state: State<'_, AppState>,
    server_url: Option<String>,
) -> AppResult<Vec<PendingSession>> {
    let server_url = server_url
        .or_else(|| state.load_settings().server_url)
        .ok_or_else(|| AppError::new("config", "no server configured"))?;
    let server_url = server_url
        .trim_start_matches("https://")
        .trim_end_matches('/')
        .to_string();

    let (comm_privkey, comm_pubkey, contacts, groups) = state
        .with_config(|config| {
            let comm = config
                .communication_key
                .as_ref()
                .ok_or_else(|| AppError::new("config", "keystore has no communication key"))?;
            let contacts: Vec<(String, Vec<u8>)> = config
                .contact
                .values()
                .map(|c| (c.name.clone(), c.pubkey.0.clone()))
                .collect();
            let groups: Vec<(String, Vec<Vec<u8>>)> = config
                .group
                .iter()
                .map(|(id, g)| {
                    (
                        id.clone(),
                        g.participant.values().map(|p| p.pubkey.0.clone()).collect(),
                    )
                })
                .collect();
            Ok((comm.privkey.clone(), comm.pubkey.clone(), contacts, groups))
        })
        .await?;

    let trust = crate::commands::server::trust_for(&state, &server_url).await;
    let mut client =
        frost_app_core::transport::FrostdClient::new(format!("https://{server_url}"), &trust)?;
    client.login(&comm_privkey, &comm_pubkey).await?;

    let mut pending = Vec::new();
    for session_id in client.list_sessions().await?.session_ids {
        let info = client
            .get_session_info(&api::GetSessionInfoArgs { session_id })
            .await?;
        // Skip sessions we coordinate ourselves.
        if info.coordinator_pubkey == comm_pubkey {
            continue;
        }
        let coordinator = contacts
            .iter()
            .find(|(_, pk)| *pk == info.coordinator_pubkey.0)
            .map(|(name, _)| name.clone());
        // Which of our groups is this session for? frostd is group-agnostic — a
        // session carries no group id — so the *signer set* is what identifies it.
        // Matching on the coordinator alone lights the session up under every
        // group that merely shares that coordinator, which is the common case
        // (same people, several groups). Require instead that every pubkey in the
        // session is a member of the group: a threshold subset of group A is not
        // a subset of group B unless B contains all of them.
        let session_pubkeys: Vec<&Vec<u8>> = info.pubkeys.iter().map(|p| &p.0).collect();
        let matching_groups = groups
            .iter()
            .filter(|(_, members)| {
                members.contains(&info.coordinator_pubkey.0)
                    && session_pubkeys.iter().all(|pk| members.contains(pk))
            })
            .map(|(id, _)| id.clone())
            .collect();
        pending.push(PendingSession {
            session_id,
            coordinator,
            coordinator_pubkey: hex::encode(&info.coordinator_pubkey.0),
            matching_groups,
        });
    }
    let _ = client.logout().await;
    Ok(pending)
}
