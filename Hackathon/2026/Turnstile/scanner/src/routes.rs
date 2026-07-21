use std::sync::Arc;

use axum::Json;
use axum::Router;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use serde::Serialize;
use turnstile_core::scan::validate;
use turnstile_core::tip::chain_tip_with_fallback;
use turnstile_core::{ChainStatus, ScanError, ScanRequest};

use crate::AppState;
use crate::jobs::JobState;

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/health", get(health))
        .route("/status", get(status))
        .route("/scan", post(start_scan))
        .route("/scan/{id}", get(scan_status))
        .with_state(state)
}

#[derive(Serialize)]
struct Health {
    status: &'static str,
    indexer: String,
}

async fn health(State(state): State<Arc<AppState>>) -> Json<Health> {
    Json(Health {
        status: "ok",
        indexer: state.backend.indexer_uri().to_string(),
    })
}

async fn status(State(state): State<Arc<AppState>>) -> Result<Json<ChainStatus>, ScanFailure> {
    let (height, indexer) = chain_tip_with_fallback(state.backend.endpoints()).await?;
    tracing::debug!(%indexer, height, "chain tip read");

    Ok(Json(ChainStatus::from_height(height)))
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Accepted {
    job_id: String,
}

async fn start_scan(
    State(state): State<Arc<AppState>>,
    Json(request): Json<ScanRequest>,
) -> Result<(StatusCode, Json<Accepted>), ScanFailure> {
    validate(&request)?;

    let backend = Arc::clone(&state);
    let job_id = state
        .jobs
        .spawn(request, move |request| async move {
            backend.backend.scan(&request).await
        })
        .await;

    Ok((StatusCode::ACCEPTED, Json(Accepted { job_id })))
}

async fn scan_status(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<Json<JobState>, ScanFailure> {
    state
        .jobs
        .get(&id)
        .await
        .map(Json)
        .ok_or(ScanFailure(ScanError::UnknownJob))
}

struct ScanFailure(ScanError);

impl From<ScanError> for ScanFailure {
    fn from(error: ScanError) -> Self {
        Self(error)
    }
}

#[derive(Serialize)]
struct ErrorBody {
    error: String,
}

impl IntoResponse for ScanFailure {
    fn into_response(self) -> Response {
        let status = match self.0 {
            ScanError::InvalidViewingKey
            | ScanError::SpendingKeySupplied
            | ScanError::BirthdayAboveTip(_) => StatusCode::BAD_REQUEST,
            ScanError::UnknownJob => StatusCode::NOT_FOUND,
            ScanError::NetworkUnavailable
            | ScanError::EphemeralStorageUnavailable
            | ScanError::BackendUnavailable => StatusCode::SERVICE_UNAVAILABLE,
        };

        tracing::warn!(status = %status, error = %self.0, "request failed");

        (
            status,
            Json(ErrorBody {
                error: self.0.to_string(),
            }),
        )
            .into_response()
    }
}
