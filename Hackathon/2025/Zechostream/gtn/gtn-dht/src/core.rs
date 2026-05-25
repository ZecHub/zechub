use std::{
    collections::HashMap,
    fmt,
    fs::File,
    io::{BufRead, BufReader},
    str::FromStr,
};

use crate::node::{AddressBook, AddressBookNotification, AddressBookUpdate, PeerConnection};
use gtn_common::{
    AudioSetupCommand, PaymentDHTMessage, RelayEndpoints, RelayNodeStatus, RelayReservation,
    ReservationAck, StreamData,
};
use libp2p::{
    core::transport::ListenerId,
    futures::StreamExt,
    identity::Keypair,
    kad::{store::MemoryStore as KadMemoryStore, Behaviour as KadBehaviour, RecordKey},
    multiaddr::Protocol,
    noise,
    swarm::dial_opts::DialOpts,
    yamux, Multiaddr, PeerId, Swarm, SwarmBuilder,
};
use serde::{Deserialize, Serialize};
use tokio::sync::mpsc::{UnboundedReceiver, UnboundedSender};
use tracing::{error, info, instrument, trace};

use std::time::Duration as StdDuration;
use tokio::time::Instant;

/// The DHT node config.
#[derive(Clone)]
pub struct Config {
    pub listen_address: String,
    pub listen_port: String,
    pub keypair: Keypair,
}

/// Various request that can be received and processed by the DHT node.
#[derive(Debug)]
pub enum DHTQueryRequest {
    RelaysAvailableReq(tokio::sync::oneshot::Sender<DHTQueryResponse>),
    RelayReservationReq(
        RelayReservation,
        tokio::sync::oneshot::Sender<DHTQueryResponse>,
    ),
}

/// Various responses that can be sent and processed by the DHT node.
#[derive(Debug, Serialize, Deserialize)]
pub enum DHTQueryResponse {
    RelaysAvailableResponse(Vec<RelayNodeStatus>),
    RelayReservationResponse(ReservationAck),
}

pub struct Node {
    payment_address: String,
    _peer_id: PeerId,
    address_book_update_tx: UnboundedSender<AddressBookUpdate>,
    address_book_notif_rx: UnboundedReceiver<AddressBookNotification>,
    _address_book: AddressBook,
    listen_id: Option<ListenerId>,
    _config: Config,
    swarm: Swarm<KadBehaviour<KadMemoryStore>>,
    discovery_request_rx: tokio::sync::mpsc::UnboundedReceiver<DHTQueryRequest>,
    confirmed_setups: HashMap<String, StreamData>,
    pending_reservation: HashMap<String, RelayReservation>,
    last_status_update: Instant,
    discovered_relays: HashMap<String, RelayNodeStatus>,
    service_key: RecordKey,
    zclient_rx: UnboundedReceiver<PaymentDHTMessage>,
    zclient_tx: UnboundedSender<PaymentDHTMessage>,
    audio_tx: UnboundedSender<AudioSetupCommand>,
}

impl fmt::Debug for Node {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Node")
            .field("_peer_id", &self._peer_id)
            .field("listen_id", &self.listen_id)
            .field("_config", &"<Config>")
            .field("address_book_update_tx", &"<UnboundedSender>")
            .field("address_book_notif_rx", &"<UnboundedReceiver>")
            .field("_address_book", &"<AddressBook>")
            .field("swarm", &"<Swarm>")
            .finish()
    }
}

impl Node {
    pub fn new(
        config: Config,
        payment_address: String,
        discovery_request_rx: tokio::sync::mpsc::UnboundedReceiver<DHTQueryRequest>,
        zclient_rx: UnboundedReceiver<PaymentDHTMessage>,
        zclient_tx: UnboundedSender<PaymentDHTMessage>,
        audio_tx: UnboundedSender<AudioSetupCommand>,
    ) -> Self {
        let swarm = SwarmBuilder::with_existing_identity(config.keypair.clone())
            .with_tokio()
            .with_tcp(
                Default::default(),
                noise::Config::new,
                yamux::Config::default,
            )
            .unwrap()
            .with_behaviour(|keypair| {
                let peer_id = keypair.public().to_peer_id();
                let store = KadMemoryStore::new(peer_id);

                KadBehaviour::new(peer_id, store)
            })
            .unwrap()
            .with_swarm_config(|config| {
                config.with_idle_connection_timeout(std::time::Duration::from_secs(120))
            })
            .build();

        let (address_book_tx, address_book_rx) = tokio::sync::mpsc::unbounded_channel();
        let (address_book_notif_tx, address_book_notif_rx) = tokio::sync::mpsc::unbounded_channel();

        Self {
            payment_address,
            _peer_id: config.keypair.public().to_peer_id(),
            address_book_update_tx: address_book_tx,
            address_book_notif_rx,
            _address_book: AddressBook::new(address_book_rx, address_book_notif_tx),
            swarm,
            _config: config,
            listen_id: None,
            discovery_request_rx,
            confirmed_setups: HashMap::new(),
            pending_reservation: HashMap::new(),
            last_status_update: Instant::now(),
            discovered_relays: HashMap::new(),
            service_key: RecordKey::new(&"gtn-relay-service".to_string()),
            zclient_rx,
            zclient_tx,
            audio_tx,
        }
    }

    fn create_relay_status(&self) -> RelayNodeStatus {
        RelayNodeStatus {
            peer_id: self._peer_id.to_string(),
            payment_address: self.payment_address.clone(),
            endpoints: RelayEndpoints {
                discovery: format!("wss://{}:8080", self._config.listen_address),
                stream: format!("wss://{}:8081", self._config.listen_address),
            },
        }
    }

    fn announce_as_relay(&mut self) {
        match self
            .swarm
            .behaviour_mut()
            .start_providing(self.service_key.clone())
        {
            Ok(query_id) => {
                info!("Providing relay service, query_id: {:?}", query_id);
            }
            Err(e) => {
                error!("Failed to start providing relay service: {:?}", e);
            }
        }
    }

    fn discover_relay_providers(&mut self) {
        // Query for providers of the relay service
        let query_id = self
            .swarm
            .behaviour_mut()
            .get_providers(self.service_key.clone());
        info!("Querying for relay providers, query_id: {:?}", query_id);
    }

    fn store_relay_status(&mut self) {
        // Store detailed relay status as a DHT record
        let status = self.create_relay_status();
        let status_key = RecordKey::new(&format!("gtn-relay-status-{}", self._peer_id));
        let record = libp2p::kad::Record::new(status_key, serde_json::to_vec(&status).unwrap());

        match self
            .swarm
            .behaviour_mut()
            .put_record(record, libp2p::kad::Quorum::One)
        {
            Ok(query_id) => {
                info!("Stored relay status record, query_id: {:?}", query_id);
            }
            Err(e) => {
                error!("Failed to store relay status: {:?}", e);
            }
        }
    }

    pub async fn listen(&mut self) {
        info!(
            "Attempting to listen on {}",
            format!(
                "{}/{}",
                self._config.listen_address, self._config.listen_port
            )
        );

        let listen_addr: Multiaddr = format!(
            "{}/{}",
            self._config.listen_address, self._config.listen_port
        )
        .parse()
        .expect("Failed to parse DHT listen address");

        let listen_id = self.swarm.listen_on(listen_addr.clone()).unwrap();
        info!("Node listening on {}", listen_addr);
        info!("Full multiaddress: {}/p2p/{}", listen_addr, self._peer_id);

        for addr in self.swarm.listeners() {
            println!("Listening on {}", addr);
        }

        self.listen_id = Some(listen_id);
    }

    #[instrument(skip(self))]
    pub async fn start_service(&mut self) {
        self.listen().await;

        // Parse the bootnode file to bootstrap the swarm with initial peer connections
        let file_metadata = std::fs::metadata("./src/bootstrap_peers.txt").unwrap();

        if file_metadata.len() != 0 {
            let bootnode_file = File::open("./src/bootstrap_peers.txt").unwrap();
            let reader = BufReader::new(bootnode_file);
            for line in reader.lines() {
                let bootnode = line.unwrap().parse::<Multiaddr>().unwrap();
                let peer_id = bootnode
                    .iter()
                    .find_map(|p| {
                        if let Protocol::P2p(mh) = p {
                            Some(PeerId::from_multihash(mh.into()).unwrap())
                        } else {
                            None
                        }
                    })
                    .unwrap();

                let dial_addr: Multiaddr = bootnode
                    .iter()
                    .filter(|p| !matches!(p, Protocol::P2p(_)))
                    .collect();

                info!(
                    "Dialing bootstrap node on address {}/p2p/{}",
                    dial_addr.to_string(),
                    peer_id.to_string()
                );
                self.swarm
                    .dial(
                        DialOpts::peer_id(PeerId::from_str(&peer_id.to_string()).unwrap())
                            .condition(
                                libp2p::swarm::dial_opts::PeerCondition::DisconnectedAndNotDialing,
                            )
                            .addresses(vec![dial_addr])
                            .build(),
                    )
                    .unwrap();
            }
        }

        self.on().await;
    }

    #[instrument(skip(self))]
    pub async fn on(&mut self) {
        tracing::debug!("Monitoring for swarm events..");
        loop {
            tokio::select! {
                                Some(ev) = self.swarm.next() => {
                                    match ev {
                                        libp2p::swarm::SwarmEvent::ConnectionClosed{peer_id,connection_id,endpoint:_,num_established:_,cause:_}=>{info!("Peer connection closed for peer {} for connection id {}",peer_id.clone(),connection_id.clone());self.address_book_update_tx.send(AddressBookUpdate::PeerConnectionClosed(peer_id)).unwrap();}
                                                            libp2p::swarm::SwarmEvent::ConnectionEstablished{peer_id,connection_id,endpoint,num_established,concurrent_dial_errors:_,established_in:_,}=> {
                                                                let pc = PeerConnection::new(connection_id,endpoint,num_established);
                                                                info!("Connection established: {:?}",pc);
                                                                self.address_book_update_tx.send(AddressBookUpdate::NewPeerConnection((peer_id,pc))).unwrap();
                                                            }
                                                            libp2p::swarm::SwarmEvent::IncomingConnection{connection_id,local_addr,send_back_addr}=>{info!("Incoming connection [Connection id: {}, Local addr: {}, send_back_addr: {}]",connection_id,local_addr,send_back_addr);}
                                                            libp2p::swarm::SwarmEvent::IncomingConnectionError{connection_id,local_addr,send_back_addr,error}=>{info!("Incoming connection error[connection id: {}, local addr: {}, send_back_addr: {}, error: {:?}]",connection_id,local_addr,send_back_addr,error);}
                                                            libp2p::swarm::SwarmEvent::OutgoingConnectionError{connection_id,peer_id:_,error}=>{/*tracing::error!("Outgoing connection error from connection id {}. Error: {:?}",connection_id,error);*/}
                                                            libp2p::swarm::SwarmEvent::ListenerError{listener_id,error}=>{info!("Listener error: {:?} on id {}",listener_id,error);}
                                                            libp2p::swarm::SwarmEvent::ListenerClosed{listener_id,addresses,reason}=>{
                                                                info!("Listener id {} closed for addresses {:?}: {:?}",listener_id,addresses,reason);
                                                                let listen_addr = "/ip4/0.0.0.0/tcp/9000".parse().expect("Failed to parse DHT listen address");
                                                                self.swarm.listen_on(listen_addr).unwrap();
                                                            }
                                                            libp2p::swarm::SwarmEvent::ExpiredListenAddr{listener_id,address} => {
                                                                trace!("Expired listener on id: {} from address {}",listener_id,address);
                                                                let listen_addr = "/ip4/0.0.0.0/tcp/9000".parse().expect("Failed to parse DHT listen address");
                                                                self.swarm.listen_on(listen_addr).unwrap();
                                                            }
                                        libp2p::swarm::SwarmEvent::Behaviour(ref kad_event)=> {
                                            match kad_event {
                                                libp2p::kad::Event::InboundRequest { request: _ } => trace!("Unhandled SwarmEvent variant: {:?}", kad_event),
                                                libp2p::kad::Event::OutboundQueryProgressed { id: _, result, stats: _, step: _ } => {
                                                    match result {
                                                        libp2p::kad::QueryResult::GetProviders(Ok(providers_result)) => {
                                                            match providers_result {
                                                                libp2p::kad::GetProvidersOk::FoundProviders { providers, .. } => {
                                                                    info!("Found {} relay providers", providers.len());
                                                                    // Query each provider for their detailed status
                                                                    for provider_id in providers {
                                                                        if *provider_id != self._peer_id {
                                                                            let status_key = RecordKey::new(&format!("gtn-relay-status-{}", provider_id));
                                                                            self.swarm.behaviour_mut().get_record(status_key);
                                                                        }
                                                                    }
                                                                },
                                                                libp2p::kad::GetProvidersOk::FinishedWithNoAdditionalRecord { .. } => {
                                                                    info!("Finished provider discovery");
                                                                }
                                                            }
                                                        },
                                                        libp2p::kad::QueryResult::GetRecord(Ok(record_result)) => {
                                                            if let libp2p::kad::GetRecordOk::FoundRecord(peer_record) = record_result {
                                                                if let Ok(relay_status) = serde_json::from_slice::<RelayNodeStatus>(&peer_record.record.value) {
                                                                        self.discovered_relays.insert(relay_status.peer_id.clone(), relay_status);
                                                                     info!("Discovered relay: {:?}", peer_record.record.key);
                                                                }
                                                            }
                                                        },
                                                        _ => trace!("Other query result: {:?}", result),
                                                    }
                                                }
                                                libp2p::kad::Event::RoutingUpdated { peer: _, is_new_peer: _, addresses: _, bucket_range: _, old_peer: _ } => trace!("Unhandled SwarmEvent variant: {:?}",kad_event),
                                                libp2p::kad::Event::UnroutablePeer { peer: _ } => trace!("Unhandled SwarmEvent variant: {:?}",kad_event),
                                                libp2p::kad::Event::RoutablePeer { peer: _, address: _ } => trace!("Unhandled SwarmEvent variant: {:?}",kad_event),
                                                libp2p::kad::Event::PendingRoutablePeer { peer: _, address: _ } => trace!("Unhandled SwarmEvent variant: {:?}",kad_event),
                                                libp2p::kad::Event::ModeChanged { new_mode: _ } => trace!("Unhandled SwarmEvent variant: {:?}",kad_event),
                                            }
                                        }
                                        libp2p::swarm::SwarmEvent::NewListenAddr{listener_id: _,address}=>info!("NewListenerAddr {}",address),
                                        libp2p::swarm::SwarmEvent::Dialing{peer_id: _,connection_id: _}=>{info!("Dialing peer");}
                                        libp2p::swarm::SwarmEvent::NewExternalAddrCandidate{address: _}=>trace!("Unhandled SwarmEvent variant: {:?}", "new external address candidate"),
                                        libp2p::swarm::SwarmEvent::ExternalAddrConfirmed{address: _}=>trace!("Unhandled SwarmEvent variant: {:?}","external addr confirmed"),
                                        libp2p::swarm::SwarmEvent::ExternalAddrExpired{address: _}=>trace!("Unhandled SwarmEvent variant: {:?}","external addr confirmed"),
                    libp2p::swarm::SwarmEvent::NewExternalAddrOfPeer{peer_id: _,address: _}=>trace!("Unhandled SwarmEvent variant: {:?}","new external addr of peer"),
                    _ => {}
                                                        }
                                },
                                Some(update) = self.address_book_notif_rx.recv() => {
                                    match update {
                                        AddressBookNotification::InitialPeer(peer_id) => {
                                             info!("Successfully connected to initial peer {}", peer_id);
                                             self.swarm.behaviour_mut().bootstrap().unwrap();
            // Register this node as a relay provider and discover others
            self.announce_as_relay();
            self.store_relay_status();
            self.discover_relay_providers();
                                        }
                                    }
                                },
                                Some(update) = self.discovery_request_rx.recv() => {
                                    match update {
                                        DHTQueryRequest::RelaysAvailableReq(sender) => {
                                                let available_relays: Vec<RelayNodeStatus> = self.discovered_relays.values().cloned().collect();

                                                let response = DHTQueryResponse::RelaysAvailableResponse(available_relays.clone());
                                                let _ = sender.send(response);
                                        }
                                        DHTQueryRequest::RelayReservationReq(relay_reservation, sender) => {
                                               self.pending_reservation.insert(relay_reservation.session_pk.clone(), relay_reservation.clone());

                                               let _ = sender.send(DHTQueryResponse::RelayReservationResponse(true));
                                               let _ = self.zclient_tx.send(PaymentDHTMessage::NewReservation { reservation: relay_reservation });

                                        }
                                    }
                                },
                                Some(update) = self.zclient_rx.recv() => {
                                    if let PaymentDHTMessage::PaymentConfirmed { session_pk, setup_details_tx_id } = update {
                                        self.pending_reservation.remove(&session_pk);

                                        match self.audio_tx.send(AudioSetupCommand::NewStreamSetup { id: setup_details_tx_id, session_pk: session_pk.clone() }) {
                                            Ok(()) => tracing::info!("Successfully sent setup command to broadcasting service for session_pk {}", session_pk),
                                            Err(e) => tracing::error!("Failed to send setup command to broadcasting service for pk {}: {:?}", session_pk, e)
                                        }
                                    }
                                }
                                _ = tokio::time::sleep(StdDuration::from_secs(300)) => {
                                    if self.last_status_update.elapsed() >= StdDuration::from_secs(300) {
                                        self.store_relay_status();
                                        self.last_status_update = Instant::now();
                                    }
                                }
                            }
        }
    }
}
