mod alerts;
mod jobs;
mod routes;

use std::net::SocketAddr;
use std::sync::Arc;

use anyhow::Result;
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;
use turnstile_core::ScanBackend;

use crate::jobs::Jobs;

pub struct AppState {
    pub backend: ScanBackend,
    pub jobs: Jobs,
}

#[tokio::main]
async fn main() -> Result<()> {
    let _ = dotenvy::dotenv();

    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "turnstile_scanner=info,tower_http=info".into()),
        )
        .init();

    let backend = ScanBackend::from_env();
    tracing::info!(indexer = backend.indexer_uri(), "scan backend ready");

    let ntfy_base =
        std::env::var("NTFY_BASE_URL").unwrap_or_else(|_| "https://ntfy.sh".to_string());
    alerts::spawn(backend.indexer_uri().to_string(), ntfy_base);

    let state = Arc::new(AppState {
        backend,
        jobs: Jobs::new(),
    });

    let app = routes::router(state)
        .layer(TraceLayer::new_for_http())
        .layer(CorsLayer::permissive());

    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(8080);
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let listener = tokio::net::TcpListener::bind(addr).await?;

    tracing::info!(%addr, "turnstile scanner listening");
    axum::serve(listener, app).await?;

    Ok(())
}
