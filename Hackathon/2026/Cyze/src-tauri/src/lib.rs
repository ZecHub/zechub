pub mod commands;
pub mod error;
pub mod sidecar;
pub mod state;
pub mod tunnel;

use state::AppState;
use tauri::{Emitter, Manager};

/// Poll interval for the idle auto-lock monitor.
const AUTO_LOCK_POLL: std::time::Duration = std::time::Duration::from_secs(20);
/// Default idle timeout (minutes) when the user has not configured one.
const DEFAULT_AUTO_LOCK_MINUTES: u64 = 10;

/// Background task: locks the keystore after the configured idle period, zeroing
/// the in-memory key material and cancelling any running ceremonies. A value of
/// `Some(0)` for `auto_lock_minutes` disables the timeout.
async fn run_auto_lock_monitor<R: tauri::Runtime>(app: tauri::AppHandle<R>) {
    loop {
        tokio::time::sleep(AUTO_LOCK_POLL).await;
        let Some(state) = app.try_state::<AppState>() else {
            return;
        };
        let minutes = state
            .load_settings()
            .auto_lock_minutes
            .unwrap_or(DEFAULT_AUTO_LOCK_MINUTES);
        if minutes == 0 {
            continue; // auto-lock disabled
        }
        // Only act while unlocked and actually idle past the threshold.
        if state.unlocked.read().await.is_none() {
            continue;
        }
        if state.idle_millis() < (minutes as i64) * 60_000 {
            continue;
        }
        for (_, handle) in state.ceremonies.lock().await.drain() {
            handle.cancel.cancel();
        }
        *state.unlocked.write().await = None;
        let _ = app.emit("keystore:auto-locked", minutes);
    }
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(AppState::new())
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(run_auto_lock_monitor(handle));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::keystore::keystore_status,
            commands::keystore::record_activity,
            commands::keystore::create_keystore,
            commands::keystore::import_upstream_config,
            commands::keystore::unlock_keystore,
            commands::keystore::recover_keystore,
            commands::keystore::lock_keystore,
            commands::keystore::change_passphrase,
            commands::keystore::generate_recovery_code,
            commands::keystore::get_identity,
            commands::keystore::set_username,
            commands::contacts::list_contacts,
            commands::contacts::add_contact,
            commands::contacts::remove_contact,
            commands::contacts::set_contact_alias,
            commands::contacts::export_my_contact,
            commands::groups::list_groups,
            commands::groups::group_orchard_keys,
            commands::groups::remove_group,
            commands::groups::rename_group,
            commands::wallet::get_wallet_config,
            commands::wallet::set_wallet_config,
            commands::wallet::lightwalletd_info,
            commands::wallet::wallet_group_status,
            commands::wallet::wallet_init_account,
            commands::wallet::wallet_sync,
            commands::wallet::wallet_cancel_sync,
            commands::wallet::wallet_sync_progress,
            commands::wallet::wallet_history,
            commands::wallet::wallet_notes,
            commands::wallet::wallet_receive_address,
            commands::wallet::wallet_new_receive_address,
            commands::wallet::wallet_prepare_send,
            commands::wallet::wallet_send,
            commands::wallet::wallet_rebroadcast,
            commands::server::get_settings,
            commands::server::set_server_url,
            commands::server::set_session_config,
            commands::server::set_session_role,
            commands::server::test_server_connection,
            commands::server::trust_server_cert,
            commands::server::cert_fingerprint_of,
            commands::server::start_sidecar,
            commands::server::stop_sidecar,
            commands::server::sidecar_status,
            commands::server::export_sidecar_cert,
            commands::server::start_tunnel,
            commands::server::stop_tunnel,
            commands::server::tunnel_status,
            commands::dkg::start_dkg,
            commands::dkg::cancel_ceremony,
            commands::signing::create_signing_session,
            commands::signing::join_signing_session,
            commands::signing::respond_to_signing,
            commands::signing::list_pending_sessions,
        ])
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|app_handle, event| {
            // Make sure the frostd child does not outlive the app.
            if let tauri::RunEvent::Exit = event {
                if let Some(state) = app_handle.try_state::<AppState>() {
                    if let Ok(mut guard) = state.sidecar.try_lock() {
                        if let Some(handle) = guard.take() {
                            let _ = handle.child.kill();
                        }
                    }
                    if let Ok(mut guard) = state.tunnel.try_lock() {
                        if let Some(handle) = guard.take() {
                            let _ = handle.child.kill();
                        }
                    }
                }
            }
        });
}
