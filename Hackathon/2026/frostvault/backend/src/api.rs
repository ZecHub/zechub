use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Json},
    routing::{get, post},
    Router,
};
use serde_json::json;
use tower_http::cors::{Any, CorsLayer};

use crate::ceremony::{self, Db};
use crate::models::{
    CreateVaultRequest, CreateVaultResponse, ReceiveRequest, RecoveryRequest, SendRequest,
    StartCeremonyResponse,
};

#[derive(Clone)]
pub struct AppState {
    pub db: Db,
}

pub fn router(state: AppState) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        .route("/health", get(health))
        .route("/vaults", get(list_vaults).post(create_vault))
        .route("/vaults/{id}", get(get_vault))
        .route("/vaults/{id}/send", post(send))
        .route("/vaults/{id}/receive", post(receive))
        .route("/vaults/{id}/recovery", post(recovery))
        .route("/vaults/{id}/transactions", get(list_transactions))
        .route("/ceremonies/{id}", get(get_ceremony))
        .layer(cors)
        .with_state(state)
}

type ApiResult<T> = Result<T, ApiError>;

struct ApiError(anyhow::Error);

impl IntoResponse for ApiError {
    fn into_response(self) -> axum::response::Response {
        tracing::warn!("request failed: {:?}", self.0);
        (StatusCode::BAD_REQUEST, Json(json!({ "error": self.0.to_string() }))).into_response()
    }
}

impl<E: Into<anyhow::Error>> From<E> for ApiError {
    fn from(e: E) -> Self {
        ApiError(e.into())
    }
}

async fn health() -> &'static str {
    "ok"
}

async fn create_vault(
    State(state): State<AppState>,
    Json(req): Json<CreateVaultRequest>,
) -> ApiResult<Json<CreateVaultResponse>> {
    let vault = ceremony::create_vault(state.db.clone(), req).await?;
    Ok(Json(CreateVaultResponse { vault }))
}

async fn list_vaults(State(state): State<AppState>) -> ApiResult<Json<serde_json::Value>> {
    let conn = state.db.lock().unwrap();
    let vaults = ceremony::list_vaults(&conn)?;
    Ok(Json(json!({ "vaults": vaults })))
}

async fn get_vault(State(state): State<AppState>, Path(id): Path<String>) -> ApiResult<Json<serde_json::Value>> {
    let conn = state.db.lock().unwrap();
    let vault = ceremony::get_vault_view(&conn, &id)?;
    Ok(Json(json!({ "vault": vault })))
}

async fn send(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(req): Json<SendRequest>,
) -> ApiResult<Json<StartCeremonyResponse>> {
    let signer_ids = match req.signer_participant_ids {
        Some(ids) => ids,
        None => default_signers(&state, &id)?,
    };

    let message = format!(
        "FrostVault send | vault={id} | amount={} | to={} | nonce={}",
        req.amount,
        req.recipient,
        uuid::Uuid::new_v4()
    );

    let ceremony_id = ceremony::start_signing_ceremony(
        state.db.clone(),
        id,
        "send",
        message,
        signer_ids,
        Some((req.amount, req.recipient)),
    )
    .await?;

    Ok(Json(StartCeremonyResponse { ceremony_id }))
}

async fn recovery(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(req): Json<RecoveryRequest>,
) -> ApiResult<Json<StartCeremonyResponse>> {
    let message = format!(
        "FrostVault recovery proof | vault={id} | signers={} | nonce={}",
        req.signer_participant_ids.len(),
        uuid::Uuid::new_v4()
    );

    let ceremony_id = ceremony::start_signing_ceremony(
        state.db.clone(),
        id,
        "recovery",
        message,
        req.signer_participant_ids,
        None,
    )
    .await?;

    Ok(Json(StartCeremonyResponse { ceremony_id }))
}

async fn receive(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(req): Json<ReceiveRequest>,
) -> ApiResult<Json<serde_json::Value>> {
    let conn = state.db.lock().unwrap();
    if !ceremony::vault_exists(&conn, &id)? {
        return Err(anyhow::anyhow!("vault not found").into());
    }
    let tx = ceremony::insert_receive_transaction(&conn, &id, &req.amount, &req.from)?;
    Ok(Json(json!({ "transaction": tx })))
}

async fn list_transactions(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> ApiResult<Json<serde_json::Value>> {
    let conn = state.db.lock().unwrap();
    let txs = ceremony::list_transactions(&conn, &id)?;
    Ok(Json(json!({ "transactions": txs })))
}

async fn get_ceremony(State(state): State<AppState>, Path(id): Path<String>) -> ApiResult<Json<serde_json::Value>> {
    let conn = state.db.lock().unwrap();
    let c = ceremony::get_ceremony_view(&conn, &id)?;
    Ok(Json(json!({ "ceremony": c })))
}

fn default_signers(state: &AppState, vault_id: &str) -> ApiResult<Vec<String>> {
    let conn = state.db.lock().unwrap();
    let vault = ceremony::get_vault_view(&conn, vault_id)?;
    Ok(vault
        .participants
        .iter()
        .filter(|p| p.has_key_share)
        .take(vault.threshold as usize)
        .map(|p| p.id.clone())
        .collect())
}
