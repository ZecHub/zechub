use frost_app_core::transport::{FrostdClient, ServerTrust};
use serde::Serialize;
use tauri::{AppHandle, Manager, State};

use crate::error::AppResult;
use crate::sidecar::{self, SidecarStatus};
use crate::state::{AppState, Settings};
use crate::tunnel::{self, TunnelStatus};

#[tauri::command]
pub async fn get_settings(state: State<'_, AppState>) -> AppResult<Settings> {
    Ok(state.load_settings())
}

#[tauri::command]
pub async fn set_server_url(state: State<'_, AppState>, url: String) -> AppResult<()> {
    let mut settings = state.load_settings();
    settings.server_url = Some(url);
    state.save_settings(&settings)
}

/// Save the first-run/session configuration: the active role and, for a
/// coordinator, how the server is exposed. Marks the session as configured so
/// the first-run prompt is not shown again.
#[tauri::command]
pub async fn set_session_config(
    state: State<'_, AppState>,
    role: String,
    exposure: Option<String>,
) -> AppResult<()> {
    let mut settings = state.load_settings();
    settings.session_role = Some(role);
    settings.coordinator_exposure = exposure.or(settings.coordinator_exposure);
    settings.session_configured = Some(true);
    state.save_settings(&settings)
}

/// Switch the active session profile (coordinator/participant) from the sidebar
/// toggle, persisting the choice without altering the saved coordinator/
/// participant details.
#[tauri::command]
pub async fn set_session_role(state: State<'_, AppState>, role: String) -> AppResult<()> {
    let mut settings = state.load_settings();
    settings.session_role = Some(role);
    state.save_settings(&settings)
}

/// Determine trust for a given server URL: pinned certs for the embedded
/// sidecar and any TOFU-imported external certs, system roots otherwise.
pub async fn trust_for(state: &AppState, url: &str) -> ServerTrust {
    let normalized = url
        .trim_start_matches("https://")
        .trim_end_matches('/')
        .to_string();
    if normalized.starts_with("127.0.0.1") || normalized.starts_with("localhost") {
        if let Some(handle) = state.sidecar.lock().await.as_ref() {
            return ServerTrust::PinnedCertificate(handle.cert_pem.clone().into_bytes());
        }
    }
    let settings = state.load_settings();
    if let Some(pem) = settings.trusted_certs.get(&normalized) {
        return ServerTrust::PinnedCertificate(pem.clone().into_bytes());
    }
    ServerTrust::SystemRoots
}

/// Build a FrostdClient for a `host:port` server using stored trust.
pub async fn client_for(state: &AppState, url: &str) -> AppResult<FrostdClient> {
    let host_port = url.trim_start_matches("https://").trim_end_matches('/');
    let trust = trust_for(state, host_port).await;
    Ok(FrostdClient::new(format!("https://{host_port}"), &trust)?)
}

#[derive(Serialize)]
pub struct ConnectionTestResult {
    pub ok: bool,
    pub error: Option<String>,
    /// The server actually reached (host:port, or a tunnel hostname).
    pub server: String,
    /// How its certificate was trusted: "pinned" (self-signed, imported) or
    /// "public" (a real CA — what a Cloudflare tunnel presents).
    pub tls: String,
    /// Round-trip time of the challenge request, in milliseconds.
    pub latency_ms: Option<u64>,
}

/// Probe a server by fetching an auth challenge from it. Reports *how* it was
/// reached (endpoint, certificate trust, latency) so a participant handed a URL
/// can confirm they connected to the server they expected before joining a
/// ceremony — and gets an actionable reason when they didn't.
#[tauri::command]
pub async fn test_server_connection(
    state: State<'_, AppState>,
    url: String,
) -> AppResult<ConnectionTestResult> {
    let host_port = url
        .trim_start_matches("https://")
        .trim_end_matches('/')
        .to_string();
    let tls = match trust_for(&state, &host_port).await {
        ServerTrust::PinnedCertificate(_) => "pinned",
        ServerTrust::SystemRoots => "public",
    }
    .to_string();

    let client = client_for(&state, &url).await?;
    let started = std::time::Instant::now();
    match client.challenge().await {
        Ok(_) => Ok(ConnectionTestResult {
            ok: true,
            error: None,
            server: host_port,
            tls,
            latency_ms: Some(started.elapsed().as_millis() as u64),
        }),
        Err(e) => Ok(ConnectionTestResult {
            ok: false,
            error: Some(e.to_string()),
            server: host_port,
            tls,
            latency_ms: None,
        }),
    }
}

/// Trust a PEM certificate for an external server (TOFU import). The
/// frontend shows the fingerprint for confirmation before calling this.
#[tauri::command]
pub async fn trust_server_cert(
    state: State<'_, AppState>,
    url: String,
    cert_pem: String,
) -> AppResult<String> {
    let fingerprint = frost_app_core::tls::cert_fingerprint(&cert_pem)?;
    let mut settings = state.load_settings();
    let key = url
        .trim_start_matches("https://")
        .trim_end_matches('/')
        .to_string();
    settings.trusted_certs.insert(key, cert_pem);
    state.save_settings(&settings)?;
    Ok(fingerprint)
}

#[tauri::command]
pub async fn cert_fingerprint_of(cert_pem: String) -> AppResult<String> {
    Ok(frost_app_core::tls::cert_fingerprint(&cert_pem)?)
}

#[tauri::command]
pub async fn start_sidecar(
    app: AppHandle,
    port: Option<u16>,
    bind_lan: Option<bool>,
) -> AppResult<SidecarStatus> {
    let state = app.state::<AppState>();
    let settings = state.load_settings();
    let port = port.or(settings.sidecar_port).unwrap_or(2744);
    // Explicit arg wins; otherwise fall back to the saved preference; default
    // to loopback-only (false) so the LAN is never exposed without opt-in.
    let bind_lan = bind_lan.or(settings.sidecar_bind_lan).unwrap_or(false);
    let status = sidecar::start(&app, port, bind_lan).await?;
    let mut settings = state.load_settings();
    settings.sidecar_port = Some(port);
    settings.sidecar_bind_lan = Some(bind_lan);
    state.save_settings(&settings)?;
    Ok(status)
}

#[tauri::command]
pub async fn stop_sidecar(state: State<'_, AppState>) -> AppResult<()> {
    // The tunnel points at the embedded server; stopping the server makes it
    // dead weight, so tear it down too.
    let _ = tunnel::stop(&state).await;
    sidecar::stop(&state).await
}

/// Start a Cloudflare quick tunnel in front of the running embedded server,
/// returning the public `https://*.trycloudflare.com` URL participants can use.
#[tauri::command]
pub async fn start_tunnel(app: AppHandle) -> AppResult<TunnelStatus> {
    let state = app.state::<AppState>();
    let port = {
        let guard = state.sidecar.lock().await;
        match guard.as_ref() {
            Some(handle) => handle.port,
            None => {
                return Err(crate::error::AppError::new(
                    "tunnel",
                    "start the embedded server before opening a tunnel",
                ))
            }
        }
    };
    tunnel::start(&app, port).await
}

#[tauri::command]
pub async fn stop_tunnel(state: State<'_, AppState>) -> AppResult<()> {
    tunnel::stop(&state).await
}

#[tauri::command]
pub async fn tunnel_status(state: State<'_, AppState>) -> AppResult<TunnelStatus> {
    Ok(tunnel::status(&state).await)
}

#[tauri::command]
pub async fn sidecar_status(state: State<'_, AppState>) -> AppResult<SidecarStatus> {
    sidecar::status(&state).await
}

/// Export the sidecar's certificate PEM so LAN participants can trust it.
#[tauri::command]
pub async fn export_sidecar_cert(state: State<'_, AppState>) -> AppResult<String> {
    let (cert_pem, _, _) = sidecar::ensure_certs(&state)?;
    Ok(cert_pem)
}
