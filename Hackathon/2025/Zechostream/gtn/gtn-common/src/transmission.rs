use libp2p::PeerId;
use serde::{Deserialize, Serialize};

/// An available relay that is a part of the DHT.
#[derive(Debug, Serialize, Deserialize)]
pub struct AvailableRelay {
    peer_id: PeerId,
    z_addr: String,
}

// A reservation for a relay
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RelayReservation {
    pub session_pk: String,
}

pub struct ReservationPackage {
    session_pk: String,
    block_height: u32,
}

#[derive(Debug, Clone)]
pub struct PaymentPackage {
    pub setup_fee_rate: rust_decimal::Decimal,
    pub renewal_fee_rate: rust_decimal::Decimal,
    pub renewal_interval_ms: u32,
}

// Represents an acknowledgement for a relay reservation.
pub type ReservationAck = bool;
