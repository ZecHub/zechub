use crate::service::api::{info, relays, reserve};
use axum::{
    routing::{get, post},
    serve, Router,
};
use gtn_dht::DHTQueryRequest;
use libp2p::PeerId;
use tokio::net::TcpListener;
use tower_http::cors::{Any, CorsLayer};
use tracing::instrument;

/// The Discovery HTTP API configuration
pub(crate) struct Config {
    pub peer_id: PeerId,
    pub payment_address: String,
    pub bind_address: String,
    pub stream_bind_address: String,
}

/// The Discovery HTTP API
pub(crate) struct Discovery {
    config: Config,
}

/// API State for the Discovery API
#[derive(Clone, Debug)]
pub(crate) struct APIState {
    peer_id: PeerId,
    payment_address: String,
    bind_address: String,
    stream_bind_address: String,
    dht_request_sender: tokio::sync::mpsc::UnboundedSender<DHTQueryRequest>,
}

impl APIState {
    pub fn peer_id(&self) -> PeerId {
        self.peer_id
    }

    pub fn payment_address(&self) -> String {
        self.payment_address.clone()
    }

    pub fn bind_address(&self) -> String {
        self.bind_address.clone()
    }

    pub fn stream_bind_address(&self) -> String {
        self.stream_bind_address.clone()
    }

    pub fn dht_request_sender(&self) -> &tokio::sync::mpsc::UnboundedSender<DHTQueryRequest> {
        &self.dht_request_sender
    }
}

impl Discovery {
    /// Creates a new discovery api service.
    pub fn new(config: Config) -> Self {
        Self { config }
    }

    /// Starts the discovery api service.
    #[instrument(skip(self, dht_request_sender))]
    pub async fn start_service(
        &self,
        dht_request_sender: tokio::sync::mpsc::UnboundedSender<DHTQueryRequest>,
    ) {
        let state = APIState {
            peer_id: self.config.peer_id,
            payment_address: self.config.payment_address.clone(),
            dht_request_sender,
            stream_bind_address: self.config.stream_bind_address.clone(),
            bind_address: self.config.bind_address.clone(),
        };
        let router = self.init_router(state);

        tracing::info!(
            "Starting discovery API on {}",
            format!("{}:8080", self.config.bind_address)
        );

        let tcp_listener = TcpListener::bind(&self.config.bind_address).await.unwrap();

        serve(tcp_listener, router).await.unwrap();
    }

    /// Initializes and sets up the router.
    fn init_router(&self, state: APIState) -> Router {
        let cors = CorsLayer::new()
            .allow_origin(Any)
            .allow_methods([
                http::Method::GET,
                http::Method::POST,
                http::Method::PUT,
                http::Method::DELETE,
                http::Method::OPTIONS,
            ])
            .allow_headers(Any)
            .max_age(std::time::Duration::from_secs(3600));

        Router::new()
            .route("/v1/info", get(info))
            .route("/v1/relays", get(relays))
            .route("/v1/relays/reserve", post(reserve))
            .with_state(state)
            .layer(cors)
    }
}
