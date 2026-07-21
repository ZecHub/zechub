mod api;
mod ceremony;
mod db;
mod frost;
mod models;

use std::sync::{Arc, Mutex};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();

    let db_path = std::env::var("FROSTVAULT_DB").unwrap_or_else(|_| "frostvault.db".to_string());
    let conn = db::open(&db_path)?;
    let state = api::AppState {
        db: Arc::new(Mutex::new(conn)),
    };

    let app = api::router(state);

    let addr = std::env::var("FROSTVAULT_ADDR").unwrap_or_else(|_| "0.0.0.0:8080".to_string());
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    tracing::info!("frostvault-backend listening on {addr}");
    axum::serve(listener, app).await?;

    Ok(())
}
