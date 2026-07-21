mod signer;

use base64::Engine;
use paypunk_pong::PongHandler;
use paypunk_types::KeypunkdResponse;
use serde::Serialize;
use signer::{SignerState, SignerStatus};
use std::sync::Mutex;
use tauri::{Manager, State};

struct AppState {
    signer: Mutex<SignerState>,
    last_response: Mutex<Option<Vec<u8>>>,
}

#[derive(Serialize)]
struct ProcessResult {
    mode: String,
    raw_artifact_b64: Option<String>,
    preview_signature_b64: Option<String>,
    derivation_path: Option<String>,
}

#[tauri::command]
fn get_encryption_key(state: State<AppState>) -> Result<[u8; 32], String> {
    let guard = state.signer.lock().map_err(|e| e.to_string())?;
    Ok(guard.server_public_key())
}

#[tauri::command]
fn generate_seed(
    state: State<AppState>,
    encrypted_password: Vec<u8>,
    ephemeral_public_key: [u8; 32],
) -> Result<Vec<u8>, String> {
    let mut guard = state.signer.lock().map_err(|e| e.to_string())?;
    guard.generate_seed(encrypted_password, ephemeral_public_key)
}

#[tauri::command]
fn restore_seed(
    state: State<AppState>,
    encrypted_mnemonic: Vec<u8>,
    encrypted_password: Vec<u8>,
    ephemeral_public_key: [u8; 32],
) -> Result<(), String> {
    let mut guard = state.signer.lock().map_err(|e| e.to_string())?;
    guard.restore_seed(encrypted_mnemonic, encrypted_password, ephemeral_public_key)
}

#[tauri::command]
fn get_signer_status(state: State<AppState>) -> Result<String, String> {
    let guard = state.signer.lock().map_err(|e| e.to_string())?;
    Ok(match guard.status() {
        SignerStatus::Idle => "idle".to_string(),
        SignerStatus::Previewing { .. } => "previewing".to_string(),
        SignerStatus::AwaitingRegistration { .. } => "awaiting_registration".to_string(),
        SignerStatus::Signing => "signing".to_string(),
        SignerStatus::Signed { .. } => "signed".to_string(),
        SignerStatus::Error(e) => format!("error: {e}"),
    })
}

#[tauri::command]
fn process_scanned_qr(
    state: State<AppState>,
    payload: Vec<u8>,
) -> Result<ProcessResult, String> {
    // Ping/pong test flow
    if payload == b"ping" {
        let handler = PongHandler;
        let response = handler.handle(&payload)?;

        *state.last_response.lock().map_err(|e| e.to_string())? = Some(response.clone());

        return Ok(ProcessResult {
            mode: "response".to_string(),
            raw_artifact_b64: None,
            preview_signature_b64: None,
            derivation_path: None,
        });
    }

    // Process the request (payload is postcard-serialized KeypunkdRequest)
    let mut guard = state.signer.lock().map_err(|e| e.to_string())?;
    let result = guard.handle_request(&payload);

    // If the signer is now awaiting registration, this is not an error —
    // it means the bridge sent a RegisterViewingKeys request and needs
    // the user to enter their password to complete registration.
    let is_registration = matches!(guard.status(), SignerStatus::AwaitingRegistration { .. });

    if !is_registration {
        if let Ok(KeypunkdResponse::Error { message }) =
            postcard::from_bytes(&result.response_bytes)
        {
            return Err(message);
        }
    }

    *state.last_response.lock().map_err(|e| e.to_string())? = Some(result.response_bytes);

    let mode = if is_registration {
        "register"
    } else {
        "preview"
    };

    Ok(ProcessResult {
        mode: mode.to_string(),
        raw_artifact_b64: result.raw_artifact.map(|v| {
            base64::engine::general_purpose::STANDARD.encode(&v)
        }),
        preview_signature_b64: result.preview_signature.map(|v| {
            base64::engine::general_purpose::STANDARD.encode(&v)
        }),
        derivation_path: result.derivation_path,
    })
}

#[tauri::command]
fn approve_and_sign(
    state: State<AppState>,
    encrypted_payload: Vec<u8>,
    ephemeral_public_key: [u8; 32],
    derivation_path: String,
) -> Result<Vec<u8>, String> {
    let mut guard = state.signer.lock().map_err(|e| e.to_string())?;
    let signed = guard.approve_and_sign(encrypted_payload, ephemeral_public_key, derivation_path)?;

    let response = paypunk_types::KeypunkdResponse::ArtifactAuthorized {
        signed_artifact: signed,
    };
    let postcard_bytes =
        postcard::to_allocvec(&response).map_err(|e| format!("serialize: {e}"))?;

    let mut frame = Vec::with_capacity(1 + postcard_bytes.len());
    frame.push(0x00);
    frame.extend_from_slice(&postcard_bytes);

    *state.last_response.lock().map_err(|e| e.to_string())? = Some(frame.clone());

    Ok(frame)
}

#[tauri::command]
fn delete_seed(state: State<AppState>) -> Result<(), String> {
    let mut guard = state.signer.lock().map_err(|e| e.to_string())?;
    guard.delete_seed()
}

#[tauri::command]
fn has_seed(state: State<AppState>) -> Result<bool, String> {
    let guard = state.signer.lock().map_err(|e| e.to_string())?;
    Ok(guard.has_seed())
}

#[tauri::command]
fn has_session_key(state: State<AppState>) -> Result<bool, String> {
    let guard = state.signer.lock().map_err(|e| e.to_string())?;
    Ok(guard.has_session_key())
}

#[tauri::command]
fn complete_registration(
    state: State<AppState>,
    password: String,
) -> Result<Vec<u8>, String> {
    let mut guard = state.signer.lock().map_err(|e| e.to_string())?;
    let response = guard.complete_registration(&password)?;

    let postcard_bytes =
        postcard::to_allocvec(&response).map_err(|e| format!("serialize: {e}"))?;

    let mut frame = Vec::with_capacity(1 + postcard_bytes.len());
    frame.push(0x00);
    frame.extend_from_slice(&postcard_bytes);

    *state.last_response.lock().map_err(|e| e.to_string())? = Some(frame.clone());

    Ok(frame)
}

#[tauri::command]
fn get_preview(state: State<AppState>) -> Result<serde_json::Value, String> {
    let guard = state.signer.lock().map_err(|e| e.to_string())?;
    match guard.status() {
        SignerStatus::Previewing { summary, .. } => {
            serde_json::to_value(summary).map_err(|e| format!("serialize: {e}"))
        }
        _ => Err("no preview available".to_string()),
    }
}

#[tauri::command]
fn get_response(state: State<AppState>) -> Result<Vec<u8>, String> {
    let resp = state
        .last_response
        .lock()
        .map_err(|e| e.to_string())?
        .clone();
    resp.ok_or_else(|| "no response available".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_barcode_scanner::init())
        .setup(|app| {
            let data_dir = app
                .path()
                .app_data_dir()
                .expect("failed to get app data dir");
            std::fs::create_dir_all(&data_dir).expect("failed to create app data dir");
            let signer = SignerState::create(data_dir);
            app.manage(AppState {
                signer: Mutex::new(signer),
                last_response: Mutex::new(None),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_encryption_key,
            generate_seed,
            restore_seed,
            delete_seed,
            get_signer_status,
            process_scanned_qr,
            approve_and_sign,
            has_seed,
            has_session_key,
            complete_registration,
            get_preview,
            get_response,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
