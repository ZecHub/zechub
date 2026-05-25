use libp2p::{core::ConnectedPoint, swarm::ConnectionId, PeerId};
use std::{collections::HashMap, num::NonZero};
use tokio::sync::mpsc::{UnboundedReceiver, UnboundedSender};

/// A peer connection including the connection id, endpoint and number of
/// connections established.
#[derive(Debug)]
pub struct PeerConnection {
    conn_id: ConnectionId,
    endpoint: ConnectedPoint,
    num_established: NonZero<u32>,
}

impl PeerConnection {
    pub fn new(
        conn_id: ConnectionId,
        endpoint: ConnectedPoint,
        num_established: NonZero<u32>,
    ) -> Self {
        Self {
            conn_id,
            endpoint,
            num_established,
        }
    }
}

/// Commands representing updates to the address book.
pub enum AddressBookUpdate {
    NewPeerConnection((PeerId, PeerConnection)),
    PeerConnectionClosed(PeerId),
}

/// Notifications the address book will send to the DHT.
pub enum AddressBookNotification {
    InitialPeer(PeerId),
}

/// An address book containing peer connections from successful dials in the DHT. The address book
/// maintains two channels with the DHT for updating and alerting the DHT of necessary notifications.
pub struct AddressBook {
    peer_connections: HashMap<PeerId, PeerConnection>,
    update_rx: UnboundedReceiver<AddressBookUpdate>,
    notification_tx: UnboundedSender<AddressBookNotification>,
}

impl AddressBook {
    pub fn new(
        update_rx: UnboundedReceiver<AddressBookUpdate>,
        notification_tx: UnboundedSender<AddressBookNotification>,
    ) -> Self {
        Self {
            peer_connections: HashMap::new(),
            update_rx,
            notification_tx,
        }
    }

    pub async fn on(&mut self) {
        while let Some(update) = self.update_rx.recv().await {
            match update {
                AddressBookUpdate::NewPeerConnection((peer_id, peer_connection)) => {
                    if self.peer_connections.is_empty() {
                        if self.notification_tx
                            .send(AddressBookNotification::InitialPeer(peer_id)).is_err() {
                                tracing::error!("Failed to send address book notification for initial peer.")
                            }
                    }

                    self.peer_connections
                        .entry(peer_id)
                        .or_insert(peer_connection);
                }
                AddressBookUpdate::PeerConnectionClosed(peer_id) => {
                    self.peer_connections.remove(&peer_id).unwrap();
                }
            }
        }
    }
}
