//! Optional Cloudflare quick-tunnel manager.
//!
//! Spawns `cloudflared tunnel --url https://localhost:<port> --no-tls-verify`
//! and parses the assigned `*.trycloudflare.com` URL from its output. This
//! gives external participants a public HTTPS endpoint that reaches the
//! embedded frostd through NAT with no router configuration. Cloudflare's
//! edge terminates TLS with a publicly trusted certificate, so participants
//! connect with system roots and skip the self-signed-cert trust step
//! entirely.
//!
//! `cloudflared` is bundled as a Tauri sidecar (like frostd) and spawned
//! through the shell plugin, so users don't need to install it separately or
//! have it on PATH.

use serde::Serialize;
use tauri::{AppHandle, Emitter, Manager};
use tauri_plugin_shell::process::{CommandChild, CommandEvent};
use tauri_plugin_shell::ShellExt;
use tokio::sync::oneshot;

use crate::error::{AppError, AppResult};
use crate::state::AppState;

pub struct TunnelHandle {
    pub child: CommandChild,
    pub public_url: String,
    pub port: u16,
}

#[derive(Serialize, Clone)]
pub struct TunnelStatus {
    pub running: bool,
    pub public_url: Option<String>,
    pub port: Option<u16>,
}

/// Extract a `https://<sub>.trycloudflare.com` URL from a log line, if present.
fn parse_tunnel_url(line: &str) -> Option<String> {
    let start = line.find("https://")?;
    let rest = &line[start..];
    // The URL ends at the first whitespace or box-drawing/punctuation char.
    let end = rest
        .find(|c: char| c.is_whitespace() || c == '|' || c == '"')
        .unwrap_or(rest.len());
    let url = rest[..end].trim_end_matches(['/', '.']).to_string();
    if url.ends_with(".trycloudflare.com") {
        Some(url)
    } else {
        None
    }
}

pub async fn start(app: &AppHandle, port: u16) -> AppResult<TunnelStatus> {
    let state = app.state::<AppState>();
    if state.tunnel.lock().await.is_some() {
        return Err(AppError::new("tunnel", "a tunnel is already running"));
    }

    // Warn loudly that opening the tunnel exposes the embedded server to the
    // public internet.
    let _ = app.emit(
        "tunnel:log",
        "⚠ Opening a public tunnel: the embedded frostd server will be reachable \
         from the internet via *.trycloudflare.com until you stop the tunnel."
            .to_string(),
    );

    let command = app
        .shell()
        .sidecar("cloudflared")
        .map_err(|e| {
            AppError::new(
                "tunnel",
                format!("bundled cloudflared binary not found: {e}"),
            )
        })?
        .args([
            "tunnel",
            "--url",
            &format!("https://localhost:{port}"),
            "--no-tls-verify",
        ]);

    let (mut rx, child) = command.spawn().map_err(|e| {
        AppError::new("tunnel", format!("could not start cloudflared: {e}"))
    })?;

    // Single task drains cloudflared's output: forward each line to the
    // frontend, capture the public URL on the first line that carries it, and
    // notify the UI when the process exits.
    let (url_tx, url_rx) = oneshot::channel::<String>();
    let app_handle = app.clone();
    tauri::async_runtime::spawn(async move {
        let mut url_tx = Some(url_tx);
        while let Some(event) = rx.recv().await {
            match event {
                CommandEvent::Stdout(line) | CommandEvent::Stderr(line) => {
                    let line = String::from_utf8_lossy(&line).to_string();
                    if let Some(url) = parse_tunnel_url(&line) {
                        if let Some(tx) = url_tx.take() {
                            let _ = tx.send(url);
                        }
                    }
                    let _ = app_handle.emit("tunnel:log", line);
                }
                CommandEvent::Terminated(_) => {
                    if let Some(st) = app_handle.try_state::<AppState>() {
                        *st.tunnel.lock().await = None;
                    }
                    let _ = app_handle.emit("tunnel:exited", ());
                    break;
                }
                _ => {}
            }
        }
    });

    // Wait (bounded) for cloudflared to report the assigned URL.
    let public_url = match tokio::time::timeout(std::time::Duration::from_secs(30), url_rx).await {
        Ok(Ok(url)) => url,
        _ => {
            let _ = child.kill();
            return Err(AppError::new(
                "tunnel",
                "cloudflared did not report a public URL within 30 seconds",
            ));
        }
    };

    let _ = app.emit("tunnel:ready", public_url.clone());

    *state.tunnel.lock().await = Some(TunnelHandle {
        child,
        public_url: public_url.clone(),
        port,
    });

    Ok(TunnelStatus {
        running: true,
        public_url: Some(public_url),
        port: Some(port),
    })
}

pub async fn stop(state: &AppState) -> AppResult<()> {
    let mut guard = state.tunnel.lock().await;
    if let Some(handle) = guard.take() {
        let _ = handle.child.kill();
    }
    Ok(())
}

pub async fn status(state: &AppState) -> TunnelStatus {
    match state.tunnel.lock().await.as_ref() {
        Some(h) => TunnelStatus {
            running: true,
            public_url: Some(h.public_url.clone()),
            port: Some(h.port),
        },
        None => TunnelStatus {
            running: false,
            public_url: None,
            port: None,
        },
    }
}
