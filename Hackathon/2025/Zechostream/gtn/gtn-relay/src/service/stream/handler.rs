use std::collections::HashMap;

use axum::extract::ws::Message;
use bincode::{Decode, Encode};
use gtn_common::{ExpiryState, PaymentPackage};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use tokio::sync::mpsc;

/// Represents a type of notification that can be sent to a client communicating to the relay.
#[derive(Clone, Serialize, Deserialize, Encode, Decode)]
pub(crate) enum NotificationType {
    ExpiryWarning { warning: String },
    ClearExpiryWarning
}

/// Events sent over the socket between clients and relays.
#[derive(Clone, Serialize, Deserialize, Encode, Decode)]
#[serde(tag = "type")]
pub(crate) enum Event {
    // Announces and a broadcaster to the stream. Currently
    // support is limited to one broadcaster.
    BroadcasterAnnounce {
        stream_id: String,
        broadcaster_uuid: String,
    },
    // Chunk based audio data sent by the broadcaster encoded into chunks.
    Data {
        stream_id: String,
        broadcaster_uuid: String,
        chunk: String,
    },
    /// Notification sent to the client for a specific [NotificationType].
    Notification {
        stream_id: String,
        broadcaster_pk: String,
        notification_type: NotificationType,
    },
    // Event to finalize the audio stream. Upon receiving `Finalize` all listeners are
    // disconnected.
    Finalize {
        stream_id: String,
    },
}

/// Represents a connection coming from a client to this relay over the broadcasting
/// ws.
#[derive(Clone, Debug)]
pub(crate) struct Connection {
    pub sender: mpsc::UnboundedSender<Message>,
    pub is_broadcaster: bool,
    pub stream_id: String,
}

#[derive(Clone, Debug)]
pub(crate) struct StreamHandler {
    // Map of connection_id -> Connection info
    pub(crate) connections: HashMap<Uuid, Connection>,
    // Map of stream id -> expiry time
    pub(crate) expiry_state: HashMap<String, ExpiryState>,
    // Payment details and renewal information for this relay
    pub(crate) payment_package: PaymentPackage,
    // Map of stream_id -> message sender channels to the client
    pub(crate) broadcast_channels: HashMap<String, tokio::sync::mpsc::UnboundedSender<Message>>
}

impl StreamHandler {
    pub fn new(payment_package: PaymentPackage) -> Self {
        Self {
            connections: HashMap::new(),
            expiry_state: HashMap::new(),
            payment_package,
            broadcast_channels: HashMap::new()
        }
    }
    pub fn expiry_state_entry(&self, stream_id: &String) -> Option<&ExpiryState> {
        self.expiry_state.get(stream_id)
    }

    pub fn expiry_state(&self) -> &HashMap<String, ExpiryState> {
        &self.expiry_state
    }

    pub fn payment_package(&self) -> &PaymentPackage {
        &self.payment_package
    }

    pub fn update_expiry_for(&mut self, stream_id: String, expiry_state: ExpiryState) {
        self.expiry_state.insert(stream_id, expiry_state);
    }

    pub fn remove_expiry(&mut self, stream_id: &String) {
        self.expiry_state.remove(stream_id);
    }
}
