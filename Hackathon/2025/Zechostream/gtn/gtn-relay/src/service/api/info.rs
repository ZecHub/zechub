use axum::{extract::{State}, response::IntoResponse, Json};

use crate::service::discovery::APIState;

/// Returns information about the API, i.e. the bind address.
pub async fn info(State(api_state): State<APIState>) -> impl IntoResponse {
    Json(api_state.bind_address())
}
