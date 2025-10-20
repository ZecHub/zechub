use serde::{Deserialize, Serialize};

use crate::RelayReservation;

#[derive(Serialize, Deserialize, Clone)]
pub enum PaymentDHTMessage {
    NewReservation {
        reservation: RelayReservation,
    },
    PaymentConfirmed {
        session_pk: String,
        setup_details_tx_id: String,
    },
}
