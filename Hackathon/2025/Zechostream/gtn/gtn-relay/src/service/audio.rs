use std::{collections::HashMap, sync::Arc};

use anyhow::Context;
use axum::{routing::get, serve, Router};

use crate::service::{
    stream::{broadcaster_handler, listener_handler},
    Event, NotificationType,
};
use gtn_common::{AudioSetupCommand, ExpiryState, PaymentPackage, StreamData};
use tokio::{
    net::TcpListener,
    sync::{mpsc::UnboundedReceiver, RwLock},
};
use tracing::instrument;

use crate::service::StreamHandler;

/// Broadcast service configuration
pub(crate) struct Config {
    pub bind_address: String,
}

#[derive(Clone)]
pub(crate) struct APIState {
    bind_address: String,
    pub handler: Arc<RwLock<StreamHandler>>,
}

impl APIState {
    pub fn bind_address(&self) -> String {
        self.bind_address.clone()
    }
}

/// The broadcast service handles setup and teardown of streams including broadcaster
/// permissions.
///
/// At this time broadcasters and listeners join the stream by accessing an endpoint with the stream id
/// from /broadcast or /listen. In the future both parties will need to complete the connection upgrade
/// and the broadcaster will need to authenticate to the session using the session_sk that corresponds to the
/// session_pk that was sent in the reservation payment memo.
pub(crate) struct BroadcastService {
    config: Config,
    stream_details: HashMap<String, StreamData>,
    dht_to_audio_rx: UnboundedReceiver<AudioSetupCommand>,
    to_payment_client_channel: tokio::sync::mpsc::UnboundedSender<AudioSetupCommand>,
    stream_payment_address: String,
}

impl BroadcastService {
    /// Creates a new audio service.
    pub fn new(
        config: Config,
        dht_to_audio_rx: UnboundedReceiver<AudioSetupCommand>,
        to_payment_client_channel: tokio::sync::mpsc::UnboundedSender<AudioSetupCommand>,
        payment_address: String,
    ) -> Self {
        Self {
            config,
            stream_details: HashMap::new(),
            dht_to_audio_rx,
            to_payment_client_channel,
            stream_payment_address: payment_address,
        }
    }

    /// Starts the broadcast service including serving the websocket API and message
    /// handling from the DHT.
    pub async fn start_service(&mut self, payment_package: PaymentPackage) {
        tracing::info!(
            "Starting broadcast service on {}",
            format!("{}", self.config.bind_address)
        );

        let stream_handler = Arc::new(RwLock::new(StreamHandler::new(payment_package.clone())));

        let state = APIState {
            bind_address: self.config.bind_address.clone(),
            handler: stream_handler.clone(),
        };

        let router = Router::new()
            .route("/v1/stream/{stream_id}", get(broadcaster_handler))
            .route("/v1/listen/{stream_id}", get(listener_handler))
            .with_state(state);

        let tcp_listener = TcpListener::bind(&self.config.bind_address).await.unwrap();

        // concurrently serve the broadcast service while periodically checking for
        // stream setup messages from the DHT
        tokio::select! {
            _ = serve(tcp_listener, router) => {
                tracing::warn!("HTTP server ended for broadcast service.");
            },
            _ = async {

                    while let Some(cmd) = self.dht_to_audio_rx.recv().await {
                        if let AudioSetupCommand::NewStreamSetup { id, session_pk } = cmd {
                              let payment_address = self.stream_payment_address.clone();
                            tracing::info!("Setting up stream with id {} for session_pk {}", id, session_pk);
                            // Upon receiving a new stream setup notification from the DHT this is our chance to setup
                            // authentication for the stream and task pre-stream task based on the stream id `id` and the broadcasters
                            // public key `session_pk`

                            // During a new stream setup the initial expiry is only 5 minutes. This
                            // is enough time for the broadcaster to test the endpoint and decide
                            // whether to continue or not. In any case the relay keeps the setup
                            // fee if the broadcaster decides not to continue and the broadcaster's
                            // loss is negligible if the relayer decides not to continue with the
                            // stream.

                            let expires_at = tokio::time::Instant::now()
                               // .checked_add(tokio::time::Duration::from_secs(300))
                               .checked_add(tokio::time::Duration::from_secs(60))
                                .unwrap();
                            let expires_at_log: chrono::DateTime<chrono::Local> = (std::time::SystemTime::now() + expires_at.elapsed()).into();
                            tracing::info!("Stream {} set to expire at {:?}", id, expires_at_log);

                            let expiry_state = ExpiryState::new(id.clone(), session_pk.clone(), expires_at);

                            stream_handler.write().await.update_expiry_for(id.clone(), expiry_state);

                            // Spawn a renewal task for this specific stream
                            let renewal_handler = stream_handler.clone();
                            let payment_channel = self.to_payment_client_channel.clone();
                            let stream_id = id.clone();
                            let broadcaster_pk = session_pk;

                            let pp = payment_package.clone();
                            tokio::spawn(async move {
                                Self::handle_stream_expiry_renewal(
                                    renewal_handler,
                                    payment_channel,
                                    stream_id,
                                    broadcaster_pk,
                                    expires_at,
                                    pp,
                                    payment_address.clone(),
                                ).await;
                            });
                        }
                    }
            } => {   },
                            // todo: add a cleanup task for expired streams that didn't get renewed and haven't received
                // notification from the payment client

                // The expiry cleanup in this block provides failover such that if the payment client goes down the stream
                // will automatically expire after a default period of time.
        }
    }

    /// Handles the expiry and renewal cycle for a specific stream
    #[instrument(skip(stream_handler, payment_channel, initial_expires_at, payment_package))]
    async fn handle_stream_expiry_renewal(
        stream_handler: Arc<RwLock<StreamHandler>>,
        payment_channel: tokio::sync::mpsc::UnboundedSender<AudioSetupCommand>,
        stream_id: String,
        broadcaster_pk: String,
        initial_expires_at: tokio::time::Instant,
        payment_package: PaymentPackage,
        stream_payment_address: String,
    ) {
        let mut current_expires_at = initial_expires_at;

        loop {
            // Wait until close to expiry (30 seconds before)
            let renewal_time = current_expires_at
                .checked_sub(tokio::time::Duration::from_secs(30))
                .unwrap_or(current_expires_at);

            tokio::time::sleep_until(renewal_time).await;

            // Check if stream still exists
            let stream_exists = {
                let handler = stream_handler.read().await;
                handler.expiry_state().contains_key(&stream_id)
            };

            if !stream_exists {
                tracing::info!(
                    "Stream {} no longer exists, stopping renewal task",
                    stream_id
                );
                break;
            }

            // Notify the stream it could potentially expire soon
            {
                if let Some(channel) = stream_handler
                    .read()
                    .await
                    .broadcast_channels
                    .get(&stream_id)
                {
                    tracing::info!(
                        "Notifying client of potential expiry for stream {}",
                        stream_id
                    );

                    if let Err(_) = channel.send(axum::extract::ws::Message::Text(
                        serde_json::to_string(&Event::Notification
                            {
                                stream_id: stream_id.clone(),
                                broadcaster_pk: broadcaster_pk.clone(),
                                notification_type:
                                    NotificationType::ExpiryWarning {
                                        warning: format!("This stream is approaching the expiry time and will expire in ~10 minutes. Pay the renewal fee of {} to {} to continue.", payment_package.renewal_fee_rate, stream_payment_address),
                                    },
                                }).unwrap_or("".to_string()).into())) {
                                    tracing::error!("Failed to send client notification of stream expiry.")
                                }
                }
            }

            // Notify the payment client of an expected stream renewal
            let (renewal_tx, renewal_rx) = tokio::sync::oneshot::channel::<AudioSetupCommand>();
            if let Err(e) = payment_channel.send(AudioSetupCommand::ExpectedRenewal {
                id: stream_id.clone(),
                session_pk: broadcaster_pk.clone(),
                sender: renewal_tx,
            }) {
                tracing::error!(
                    "Failed to send renewal request for stream {}: {}",
                    stream_id,
                    e
                );
                break;
            }

            // At this point the thread will block until a message is received from the payment
            // client
            // todo: implement mechanism to timeout while waiting for payment client to avoid indefinite
            // stream access after expiry
            let renewal_response = renewal_rx.await;

            match renewal_response {
                Ok(AudioSetupCommand::ContinueStream { id }) if id == stream_id => {
                    let renewal_time = stream_handler
                        .read()
                        .await
                        .payment_package()
                        .renewal_interval_ms;

                    let new_expires_at = tokio::time::Instant::now()
                        .checked_add(tokio::time::Duration::from_secs(
                            (renewal_time * 1000).into(),
                        ))
                        .context("Expected renewal_time to be validated pre stream creation").unwrap();

                    let new_expiry_state =
                        ExpiryState::new(stream_id.clone(), broadcaster_pk.clone(), new_expires_at);

                    {
                        let mut handler = stream_handler.write().await;
                        handler.update_expiry_for(stream_id.clone(), new_expiry_state);
                    }

                    let expires_at_log: chrono::DateTime<chrono::Local> = (std::time::SystemTime::now() + new_expires_at.elapsed()).into();
                    current_expires_at = new_expires_at;
                    tracing::info!(
                        "Extended expiry for stream {} until {:?}",
                        stream_id,
                        expires_at_log
                    );

                    // Notify the client the stream has been renewed
                    if let Some(channel) = stream_handler
                        .read()
                        .await
                        .broadcast_channels
                        .get(&stream_id)
                    {
                        if let Err(_) = channel
                            .send(axum::extract::ws::Message::Text(
                                serde_json::to_string(&Event::Notification {
                                    stream_id: stream_id.clone(),
                                    broadcaster_pk: broadcaster_pk.clone(),
                                    notification_type: NotificationType::ClearExpiryWarning,
                                })
                                .unwrap()
                                .into(),
                            )) {
                                tracing::error!("Failed to send notification event to stream {}", stream_id);
                            }
                    }
                }
                Ok(AudioSetupCommand::AbortStream { id }) if id == stream_id => {
                    {
                        let mut handler = stream_handler.write().await;
                        handler.remove_expiry(&stream_id);

                        // todo: Remove stream from live streams for this relay

                        tracing::info!("Stream {} aborted", stream_id);
                    }
                    break;
                }
                _ => {
                    tracing::warn!("Unexpected renewal response for stream {}", stream_id);
                    break;
                }
            }
        }
    }
}
