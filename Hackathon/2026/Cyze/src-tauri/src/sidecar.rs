//! Lifecycle management for the embedded frostd sidecar.

use std::path::PathBuf;

use frost_app_core::tls;
use serde::Serialize;
use tauri::{AppHandle, Emitter, Manager};
use tauri_plugin_shell::process::{CommandChild, CommandEvent};
use tauri_plugin_shell::ShellExt;

use crate::error::{AppError, AppResult};
use crate::state::AppState;

pub struct SidecarHandle {
    pub child: CommandChild,
    pub port: u16,
    pub cert_pem: String,
    /// Whether the server was bound to the LAN (`0.0.0.0`) rather than loopback.
    pub bind_lan: bool,
}

#[derive(Serialize, Clone)]
pub struct SidecarStatus {
    pub running: bool,
    pub port: Option<u16>,
    pub url: Option<String>,
    pub cert_fingerprint: Option<String>,
    /// Hosts/IPs covered by the certificate (for sharing with LAN peers).
    pub lan_addresses: Vec<String>,
}

fn cert_paths(state: &AppState) -> (PathBuf, PathBuf) {
    let dir = state.data_dir.join("sidecar");
    (dir.join("cert.pem"), dir.join("key.pem"))
}

/// Best-effort enumeration of non-loopback IPv4 addresses, so the generated
/// certificate covers LAN connections. Parses `ip -4 addr` output to avoid
/// an extra crate dependency.
fn lan_ips() -> Vec<String> {
    let Ok(output) = std::process::Command::new("ip")
        .args(["-4", "-o", "addr", "show", "scope", "global"])
        .output()
    else {
        return vec![];
    };
    String::from_utf8_lossy(&output.stdout)
        .lines()
        .filter_map(|line| {
            line.split_whitespace()
                .nth(3)
                .and_then(|cidr| cidr.split('/').next())
                .map(str::to_string)
        })
        .collect()
}

/// Load the sidecar cert pair, generating it on first use.
pub fn ensure_certs(state: &AppState) -> AppResult<(String, PathBuf, PathBuf)> {
    let (cert_path, key_path) = cert_paths(state);
    if cert_path.exists() && key_path.exists() {
        let cert_pem = std::fs::read_to_string(&cert_path)?;
        return Ok((cert_pem, cert_path, key_path));
    }
    let cert = tls::generate_self_signed(&lan_ips())?;
    tls::write_cert_files(&cert, &cert_path, &key_path)?;
    Ok((cert.cert_pem, cert_path, key_path))
}

pub async fn start(app: &AppHandle, port: u16, bind_lan: bool) -> AppResult<SidecarStatus> {
    let state = app.state::<AppState>();
    let mut guard = state.sidecar.lock().await;
    if guard.is_some() {
        return Err(AppError::new("server", "sidecar is already running"));
    }

    let (cert_pem, cert_path, key_path) = ensure_certs(&state)?;

    // Bind loopback by default; only expose to the LAN when the user opts in.
    let bind_ip = if bind_lan { "0.0.0.0" } else { "127.0.0.1" };
    let command = app
        .shell()
        .sidecar("frostd")
        .map_err(|e| AppError::new("server", format!("sidecar binary not found: {e}")))?
        .args([
            "--ip",
            bind_ip,
            "--port",
            &port.to_string(),
            "--tls-cert",
            &cert_path.to_string_lossy(),
            "--tls-key",
            &key_path.to_string_lossy(),
        ]);

    let (mut rx, child) = command
        .spawn()
        .map_err(|e| AppError::new("server", format!("failed to spawn frostd: {e}")))?;

    // Forward stdout/stderr lines and exit notification to the frontend.
    let app_handle = app.clone();
    tauri::async_runtime::spawn(async move {
        while let Some(event) = rx.recv().await {
            match event {
                CommandEvent::Stdout(line) | CommandEvent::Stderr(line) => {
                    let _ = app_handle
                        .emit("sidecar:log", String::from_utf8_lossy(&line).to_string());
                }
                CommandEvent::Terminated(payload) => {
                    let _ = app_handle.emit("sidecar:exited", payload.code);
                    if let Some(state) = app_handle.try_state::<AppState>() {
                        *state.sidecar.lock().await = None;
                    }
                }
                _ => {}
            }
        }
    });

    *guard = Some(SidecarHandle {
        child,
        port,
        cert_pem: cert_pem.clone(),
        bind_lan,
    });
    drop(guard);

    // Health check: wait until /challenge answers over TLS (pinned to our cert).
    let client = frost_app_core::transport::FrostdClient::new(
        format!("https://127.0.0.1:{port}"),
        &frost_app_core::transport::ServerTrust::PinnedCertificate(cert_pem.clone().into_bytes()),
    )?;
    let mut healthy = false;
    for _ in 0..20 {
        if client.challenge().await.is_ok() {
            healthy = true;
            break;
        }
        tokio::time::sleep(std::time::Duration::from_millis(250)).await;
    }
    if !healthy {
        // Roll back: kill the child we just started.
        if let Some(handle) = state.sidecar.lock().await.take() {
            let _ = handle.child.kill();
        }
        return Err(AppError::new(
            "server",
            "frostd did not become healthy within 5 seconds",
        ));
    }

    status(&state).await
}

pub async fn stop(state: &AppState) -> AppResult<()> {
    let mut guard = state.sidecar.lock().await;
    if let Some(handle) = guard.take() {
        handle
            .child
            .kill()
            .map_err(|e| AppError::new("server", format!("failed to stop frostd: {e}")))?;
    }
    Ok(())
}

pub async fn status(state: &AppState) -> AppResult<SidecarStatus> {
    let guard = state.sidecar.lock().await;
    match guard.as_ref() {
        Some(handle) => Ok(SidecarStatus {
            running: true,
            port: Some(handle.port),
            url: Some(format!("https://127.0.0.1:{}", handle.port)),
            cert_fingerprint: Some(tls::cert_fingerprint(&handle.cert_pem)?),
            // Only advertise LAN addresses when actually bound to the LAN;
            // a loopback-only server is not reachable at those addresses.
            lan_addresses: if handle.bind_lan { lan_ips() } else { vec![] },
        }),
        None => Ok(SidecarStatus {
            running: false,
            port: None,
            url: None,
            cert_fingerprint: None,
            lan_addresses: vec![],
        }),
    }
}
