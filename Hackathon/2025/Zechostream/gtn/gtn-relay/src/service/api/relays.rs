use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::{debug_handler, Json};
use gtn_common::{RelayEndpoints, RelayNodeStatus, RelayReservation};
use gtn_dht::DHTQueryResponse;
use tracing::{info, instrument};

use crate::service::api::util::{new_req_log, new_res_log};
use crate::service::discovery::APIState;

/// GET /relays/relays
/// Lists all known relay nodes in the network
/// Query parameters: region, min_capacity, online_only
/// Returns: Relay metadata, capacity, performance metrics
/// Use case: Network topology visualization, relay selection
#[debug_handler]
pub async fn relays(State(state): State<APIState>) -> impl IntoResponse {
    new_req_log("/relays".to_string());

    let req_sender = state.dht_request_sender();
    let (relay_available_response_sender, relay_available_response_receiver) =
        tokio::sync::oneshot::channel::<DHTQueryResponse>();

    if let Err(_) = req_sender
        .send(gtn_dht::DHTQueryRequest::RelaysAvailableReq(
            relay_available_response_sender,
        )) {
            tracing::error!("Failed to send request available relays to DHT.");
        }

    let res = relay_available_response_receiver.await.unwrap();

    let mut relays = match res {
        DHTQueryResponse::RelaysAvailableResponse(items) => items,
        _ => {
            tracing::error!("Matched invalid request response from DHT.");
            Vec::new()
        }
    };

    // Gather the relay node status for this relay and concat it with with the
    // respond from the DHT
    let this_status = RelayNodeStatus {
        peer_id: state.peer_id().to_string(),
        payment_address: state.payment_address(),
        endpoints: RelayEndpoints {
            discovery: state.bind_address(),
            stream: state.stream_bind_address(),
        },
    };

    relays.push(this_status);

    new_res_log("/relays".to_string(), format!("{:?}", relays));
    Json(relays)
}

/// POST /relays/reserve
/// Reserves a relay by the peer_id. The response is returned in form of an acknowledgement
/// representing if the reserve request was successful or not.
#[instrument]
pub async fn reserve(
    State(state): State<APIState>,
    Json(reservation_req): Json<RelayReservation>,
) -> impl IntoResponse {
    new_req_log("relays/reserve".to_string());

    let req_sender = state.dht_request_sender();
    let (relay_response_sender, relay_response_receiver) =
        tokio::sync::oneshot::channel::<DHTQueryResponse>();

    if let Err(_) = req_sender
        .send(gtn_dht::DHTQueryRequest::RelayReservationReq(
            reservation_req,
            relay_response_sender,
        )) {
            tracing::error!("Failed to send request for relay reservation to DHT.");
        }

    let res = relay_response_receiver.await.unwrap();

    let success = match res {
        DHTQueryResponse::RelayReservationResponse(ack) => ack,
        _ => {
            info!("Matched invalid reequest respond from DHT");
            false
        }
    };

    new_res_log("/relays/reserve".to_string(), format!("{:?}", success));

    StatusCode::OK
}
