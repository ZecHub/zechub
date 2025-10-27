use axum::{extract::{State}, response::IntoResponse};

use crate::service::{audio::APIState, stream::upgrade::handle_socket};
use axum::{
    extract::WebSocketUpgrade
};

use axum::extract::Path;

/// Handles the HTTP upgrade to the WS connection for a broadcaster i.e. the /stream endpoint.
pub(crate) async fn broadcaster_handler(
    ws: WebSocketUpgrade,
    Path(stream_id): Path<String>,
    State(state): State<APIState>,
) -> impl IntoResponse {
    tracing::info!("Broadcaster connecting to {}", stream_id);
    ws.on_upgrade(move |socket| handle_socket(socket, stream_id, true, state))
}

/// Handles the HTTP upgrade to the WS connection for a listener i.e., the /listen endpoint.
pub(crate) async fn listener_handler(
    ws: WebSocketUpgrade,
    Path(stream_id): Path<String>,
    State(state): State<APIState>,
) -> impl IntoResponse {
    tracing::info!("Listener connecting to {}", stream_id);
    ws.on_upgrade(move |socket| handle_socket(socket, stream_id, false, state))
}
