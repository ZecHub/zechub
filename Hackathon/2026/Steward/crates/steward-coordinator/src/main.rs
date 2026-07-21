//! Steward coordinator — HTTP server binary.
//!
//! Serves the axum control plane + relay hub from [`steward_coordinator::http`] so
//! the owner console (and remote guardians) can talk to it over the network:
//!
//! - `POST /demo/vault` — seed a demo vault (trusted-dealer split; short cadence).
//! - `POST /vault` — create a vault from an externally-produced public package.
//! - `GET  /vault/:id` — vault status at `now` (state, trip time, heir, balance stub).
//! - `POST /vault/:id/heartbeat` — record proof-of-life (advance the deadline).
//! - `POST /vault/:id/session` — propose + run an authorized signing ceremony.
//! - `POST /session/:id/{send,recv}` — the guardian relay plane.
//!
//! The full FROST ceremony and dead-man's-switch policy gate are exercised by the
//! crate's tests (`orchestration.rs`, `http_ceremony.rs`); this binary just stands the
//! server up against the real wall clock.
//!
//! ## Bind port
//! `--port <N>`, else the `STEWARD_PORT` env var, else **8080**. Binds `127.0.0.1`.

use std::sync::Arc;

use steward_coordinator::{persist, router, AppState, SystemClock};

/// Resolve the bind port: `--port <N>` › `STEWARD_PORT` › `8080`.
fn resolve_port() -> u16 {
    let args: Vec<String> = std::env::args().collect();
    if let Some(i) = args.iter().position(|a| a == "--port") {
        if let Some(port) = args.get(i + 1).and_then(|s| s.parse::<u16>().ok()) {
            return port;
        }
    }
    std::env::var("STEWARD_PORT")
        .ok()
        .and_then(|s| s.parse::<u16>().ok())
        .unwrap_or(8080)
}

#[tokio::main]
async fn main() {
    let port = resolve_port();

    // Persist vault state to disk so a restart never orphans a vault. The store holds
    // PUBLIC config only (see `persist`) — secret shares are never written.
    let data_dir = persist::data_dir_from_env();
    let state = match AppState::with_persistence(Arc::new(SystemClock), &data_dir) {
        Ok(s) => s,
        Err(e) => {
            eprintln!(
                "Steward coordinator: could not open the vault store at {}: {e}",
                data_dir.display()
            );
            eprintln!("  set STEWARD_DATA_DIR to a writable dir, or move a corrupt store aside.");
            std::process::exit(1);
        }
    };
    // Tell `/vault/:id/spend` our real bind URL so the signer's FROST callback reaches us.
    let state = state.with_self_base_url(format!("http://127.0.0.1:{port}"));

    let addr = format!("127.0.0.1:{port}");
    let listener = match tokio::net::TcpListener::bind(&addr).await {
        Ok(l) => l,
        Err(e) if e.kind() == std::io::ErrorKind::AddrInUse => {
            eprintln!("Steward coordinator: port {port} is already in use.");
            eprintln!("  Another coordinator is probably still running. Either:");
            eprintln!("    • stop it:            pkill -f target/debug/steward-coordinator");
            eprintln!("    • or use another port: cargo run -p steward-coordinator -- --port 8081");
            eprintln!("      (then set STEWARD_COORDINATOR for the console's Vite proxy)");
            std::process::exit(1);
        }
        Err(e) => {
            eprintln!("Steward coordinator: failed to bind {addr}: {e}");
            std::process::exit(1);
        }
    };
    let bound = listener.local_addr().expect("resolve local addr");

    println!("Steward coordinator listening on http://{bound}");
    println!("  seed a demo vault:  POST /demo/vault");
    println!("  vault status:       GET  /vault/:id");
    println!("  proof-of-life:      POST /vault/:id/heartbeat");
    println!("  release ceremony:   POST /vault/:id/session");
    println!(
        "  vault store:        {}/{} (PUBLIC config only)",
        data_dir.display(),
        persist::STORE_FILE
    );
    // The one honesty note: secret shares are never written to disk. A restart keeps a
    // vault's public config + heartbeat, but a *demo* vault must be re-seeded to auto-sign
    // in-process again; a real-guardian relay ceremony is unaffected (real vaults hold no
    // shares on the coordinator).
    println!(
        "  note: secret shares are NEVER persisted — after a restart a demo vault cannot \
         auto-sign in-process, but its config + heartbeat survive and a real-guardian relay \
         ceremony still works."
    );

    axum::serve(listener, router(state))
        .await
        .expect("server error");
}
