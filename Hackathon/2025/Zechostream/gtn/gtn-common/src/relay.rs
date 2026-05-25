use serde::{Deserialize, Serialize};

/// Relay nodes status including endpoints it supports, peer_id and
/// last updated
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RelayNodeStatus {
    pub peer_id: String,
    pub payment_address: String,
    pub endpoints: RelayEndpoints,
}

// Endpoints a relay node supports
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RelayEndpoints {
    pub discovery: String,
    pub stream: String,
}
