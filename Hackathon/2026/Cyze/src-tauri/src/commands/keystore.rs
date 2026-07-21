use frost_client::cli::config::{CommunicationKey, Config};
use serde::Serialize;
use tauri::State;

use crate::error::{AppError, AppResult};
use crate::state::AppState;

#[derive(Serialize)]
pub struct KeystoreStatus {
    pub exists: bool,
    pub unlocked: bool,
    /// Whether a recovery code is configured for this keystore.
    pub recovery_enabled: bool,
}

/// Defer the idle auto-lock: called by the frontend on user activity. Cheap and
/// safe to call frequently (throttled on the frontend side).
#[tauri::command]
pub async fn record_activity(state: State<'_, AppState>) -> AppResult<()> {
    state.touch_activity();
    Ok(())
}

#[tauri::command]
pub async fn keystore_status(state: State<'_, AppState>) -> AppResult<KeystoreStatus> {
    let ks = state.keystore();
    Ok(KeystoreStatus {
        exists: ks.exists(),
        unlocked: state.unlocked.read().await.is_some(),
        recovery_enabled: ks.recovery_enabled(),
    })
}

/// Create a fresh keystore with a newly generated communication keypair
/// (the equivalent of `frost-client init`). Returns the one-time 12-word
/// recovery phrase the user must back up; it is never stored anywhere.
#[tauri::command]
pub async fn create_keystore(state: State<'_, AppState>, passphrase: String) -> AppResult<String> {
    let (privkey, pubkey) = frost_client::cipher::Cipher::generate_keypair()
        .map_err(|e| AppError::new("crypto", e.to_string()))?;
    let mut config = Config::default();
    config.communication_key = Some(CommunicationKey { privkey, pubkey });
    let toml = frost_app_core::config::serialize_config(&config)?;
    let (phrase, file) = state.keystore().create(toml.as_bytes(), &passphrase)?;
    *state.unlocked.write().await = Some(crate::state::UnlockedState { config, file });
    state.touch_activity();
    Ok(phrase.to_string())
}

/// Import an existing plaintext frost-client credentials.toml into a new
/// encrypted keystore. `path` defaults to the upstream location. Returns the
/// one-time recovery phrase the user must back up.
#[tauri::command]
pub async fn import_upstream_config(
    state: State<'_, AppState>,
    path: Option<String>,
    passphrase: String,
) -> AppResult<String> {
    let path = match path {
        Some(p) => std::path::PathBuf::from(p),
        None => dirs::config_local_dir()
            .ok_or_else(|| AppError::new("config", "no config dir on this platform"))?
            .join("frost")
            .join("credentials.toml"),
    };
    let toml_str = zeroize::Zeroizing::new(std::fs::read_to_string(&path).map_err(|e| {
        AppError::new("config", format!("cannot read {}: {e}", path.display()))
    })?);
    let config = frost_app_core::config::parse_config(&toml_str)?;
    let (phrase, file) = state.keystore().create(toml_str.as_bytes(), &passphrase)?;
    *state.unlocked.write().await = Some(crate::state::UnlockedState { config, file });
    state.touch_activity();
    Ok(phrase.to_string())
}

#[tauri::command]
pub async fn unlock_keystore(state: State<'_, AppState>, passphrase: String) -> AppResult<()> {
    let (file, plaintext) = state.keystore().unlock(&passphrase)?;
    let toml_str = std::str::from_utf8(&plaintext)
        .map_err(|e| AppError::new("malformed_keystore", e.to_string()))?;
    let config = frost_app_core::config::parse_config(toml_str)?;
    // If this was a legacy v1 keystore, persist the migrated v2 form now so it
    // gains the envelope format (a recovery code can then be added).
    if state.keystore().is_legacy() {
        let _ = state.keystore().save_file(&file, plaintext.as_slice());
    }
    *state.unlocked.write().await = Some(crate::state::UnlockedState { config, file });
    state.touch_activity();
    Ok(())
}

/// Forgotten-passphrase recovery: unlock with the 12-word recovery phrase and
/// set a new passphrase. The recovery code keeps working afterwards.
#[tauri::command]
pub async fn recover_keystore(
    state: State<'_, AppState>,
    recovery_phrase: String,
    new_passphrase: String,
) -> AppResult<()> {
    let phrase = frost_app_core::keystore::normalize_recovery_phrase(&recovery_phrase)?;
    let (mut file, plaintext) = state.keystore().unlock_with_recovery(&phrase)?;
    file.set_passphrase(&new_passphrase)?;
    state.keystore().save_file(&file, plaintext.as_slice())?;
    let toml_str = std::str::from_utf8(&plaintext)
        .map_err(|e| AppError::new("malformed_keystore", e.to_string()))?;
    let config = frost_app_core::config::parse_config(toml_str)?;
    *state.unlocked.write().await = Some(crate::state::UnlockedState { config, file });
    state.touch_activity();
    Ok(())
}

#[tauri::command]
pub async fn lock_keystore(state: State<'_, AppState>) -> AppResult<()> {
    // Cancel any running ceremonies; their key material must not outlive the lock.
    for (_, handle) in state.ceremonies.lock().await.drain() {
        handle.cancel.cancel();
    }
    *state.unlocked.write().await = None;
    Ok(())
}

#[tauri::command]
pub async fn change_passphrase(
    state: State<'_, AppState>,
    old_passphrase: String,
    new_passphrase: String,
) -> AppResult<()> {
    // Verify the old passphrase against the file, then re-wrap the passphrase
    // slot (the recovery slot is preserved by set_passphrase).
    let (mut file, plaintext) = state.keystore().unlock(&old_passphrase)?;
    file.set_passphrase(&new_passphrase)?;
    state.keystore().save_file(&file, plaintext.as_slice())?;
    if let Some(unlocked) = state.unlocked.write().await.as_mut() {
        unlocked.file = file;
    }
    Ok(())
}

#[derive(Serialize)]
pub struct Identity {
    /// Chosen display name, if set.
    pub username: Option<String>,
    /// Hex-encoded communication public key of the local user.
    pub pubkey: Option<String>,
}

/// The local user's identity: their display name and own communication pubkey,
/// used to label themselves in groups and signer lists.
#[tauri::command]
pub async fn get_identity(state: State<'_, AppState>) -> AppResult<Identity> {
    let username = state.load_settings().username;
    let pubkey = state
        .unlocked
        .read()
        .await
        .as_ref()
        .and_then(|u| u.config.communication_key.as_ref())
        .map(|k| hex::encode(&k.pubkey.0));
    Ok(Identity { username, pubkey })
}

/// Set (or change) the local user's display name.
#[tauri::command]
pub async fn set_username(state: State<'_, AppState>, username: String) -> AppResult<()> {
    let trimmed = username.trim();
    let mut settings = state.load_settings();
    settings.username = if trimmed.is_empty() {
        None
    } else {
        Some(trimmed.to_string())
    };
    state.save_settings(&settings)
}

/// Generate a recovery code for a keystore that doesn't have one yet (e.g. a
/// migrated legacy keystore). Returns the one-time phrase to back up.
#[tauri::command]
pub async fn generate_recovery_code(state: State<'_, AppState>) -> AppResult<String> {
    let mut guard = state.unlocked.write().await;
    let unlocked = guard.as_mut().ok_or_else(AppError::locked)?;
    let phrase = frost_app_core::keystore::generate_recovery_phrase()?;
    unlocked.file.set_recovery(&phrase)?;
    let toml = frost_app_core::config::serialize_config(&unlocked.config)?;
    state.keystore().save_file(&unlocked.file, toml.as_bytes())?;
    Ok(phrase.to_string())
}
