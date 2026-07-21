//! WebSocket networking for multi-party FROST threshold operations.
//!
//! Provides a real coordinator server and participant client for:
//! - Trusted Dealer key distribution
//! - DKG (Distributed Key Generation) coordination
//! - FROST threshold signing rounds
//!
//! Enable with `cargo build --features net`.

use serde::{Deserialize, Serialize};

// ── Message types ──────────────────────────────────────────────────────────

/// Top-level message envelope.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", content = "payload")]
pub enum FrostMessage {
    // ── Session management ────────────────────────────────────────────────
    /// Join a session with a session secret for authentication.
    Join {
        participant_id: u16,
        session_secret: String,
    },
    /// Coordinator → Participant: session configuration
    Welcome {
        session_id: String,
        max_signers: u16,
        min_signers: u16,
        participant_ids: Vec<u16>,
    },
    /// Coordinator → All: session is starting
    Begin {
        phase: String,
    },

    // ── Trusted Dealer ────────────────────────────────────────────────────
    /// Coordinator → Participant: your secret share (bincode, hex)
    DealerShare {
        share_hex: String,
    },
    /// Coordinator → All: the public key package (bincode, hex)
    DealerPublicKey {
        pkp_hex: String,
    },
    /// Coordinator → Participant: your key package (bincode, hex)
    DealerKeyPackage {
        kp_hex: String,
    },

    // ── FROST Signing ─────────────────────────────────────────────────────
    /// Participant → Coordinator: initiate a signing session with a message
    /// and the public key package (both bincode-encoded, hex)
    SignStart {
        message_hex: String,
        pkp_hex: String,
    },
    /// Participant → Coordinator: round 1 commitments (bincode, hex)
    SignRound1Commitment {
        participant_id: u16,
        commitment_hex: String,
    },
    /// Coordinator → All: signing package + message (bincode, hex)
    SignRound2Package {
        signing_package_hex: String,
        message_hex: String,
    },
    /// Participant → Coordinator: signature share (bincode, hex)
    SignRound2Share {
        participant_id: u16,
        share_hex: String,
    },
    /// Coordinator → All: final threshold signature (bincode, hex)
    SignResult {
        signature_hex: String,
    },

    // ── General ───────────────────────────────────────────────────────────
    Error {
        message: String,
    },
    Ack {
        info: String,
    },
    Done,
}

/// Session configuration.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionConfig {
    pub max_signers: u16,
    pub min_signers: u16,
    pub session_id: String,
}

/// Session phase state machine.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SessionPhase {
    WaitingForJoin,
    TrustedDealer,
    SignRound1,
    SignRound2,
    Complete,
}

// ── WebSocket server ───────────────────────────────────────────────────────

#[cfg(feature = "net")]
pub mod server {
    use std::collections::{BTreeMap, HashMap};
    use std::sync::Arc;

    use futures_util::{SinkExt, StreamExt};
    use tokio::net::TcpListener;
    use tokio::sync::Mutex;
    use tokio_tungstenite::{accept_async, tungstenite::Message};

    use super::*;
    use crate::threshold as frost;

    type WsWrite = futures_util::stream::SplitSink<
        tokio_tungstenite::WebSocketStream<tokio::net::TcpStream>,
        tokio_tungstenite::tungstenite::Message,
    >;

    /// Shared coordinator state.
    pub struct Coordinator {
        pub config: SessionConfig,
        pub phase: SessionPhase,
        pub participants: HashMap<u16, WsWrite>,
        /// Session secret for participant authentication.
        pub session_secret: String,
        /// Accumulated round 1 signing commitments (hex-encoded bincode).
        pub sign_r1_commitments: BTreeMap<u16, String>,
        /// Accumulated signing shares (hex-encoded bincode).
        pub sign_r2_shares: BTreeMap<u16, String>,
        /// Trusted dealer shares (pre-generated).
        pub dealer_shares: BTreeMap<u16, String>,
        pub dealer_kps: BTreeMap<u16, String>,
        pub dealer_pkp: Option<String>,
        /// Message to sign (set by SignStart).
        pub sign_message: Option<Vec<u8>>,
        /// Public key package hex (set by SignStart).
        pub sign_pkp_hex: Option<String>,
        /// Cached signing package hex (built when all commitments arrive).
        pub sign_package_hex: Option<String>,
    }

    impl Coordinator {
        pub fn new(config: SessionConfig) -> Self {
            Self {
                config,
                phase: SessionPhase::WaitingForJoin,
                participants: HashMap::new(),
                session_secret: String::new(),
                sign_r1_commitments: BTreeMap::new(),
                sign_r2_shares: BTreeMap::new(),
                dealer_shares: BTreeMap::new(),
                dealer_kps: BTreeMap::new(),
                dealer_pkp: None,
                sign_message: None,
                sign_pkp_hex: None,
                sign_package_hex: None,
            }
        }

        /// Create a coordinator with a session secret for authentication.
        pub fn new_with_secret(config: SessionConfig, session_secret: String) -> Self {
            let mut c = Self::new(config);
            c.session_secret = session_secret;
            c
        }

        /// Check if all expected participants have joined.
        fn all_joined(&self) -> bool {
            self.participants.len() as u16 >= self.config.max_signers
        }

        /// Check if all signing round 1 commitments received.
        fn all_sign_r1(&self) -> bool {
            self.sign_r1_commitments.len() as u16 >= self.config.min_signers
        }

        /// Check if enough signing shares received.
        fn all_sign_r2(&self) -> bool {
            self.sign_r2_shares.len() as u16 >= self.config.min_signers
        }

        /// Build the signing package from collected commitments and broadcast it.
        async fn build_and_broadcast_signing_package(
            &mut self,
        ) -> Result<(), Box<dyn std::error::Error>> {
            let message = self.sign_message.clone().ok_or("no sign message set")?;

            // Deserialize commitments from hex/bincode
            let mut commitments = BTreeMap::new();
            for (id_num, hex_str) in &self.sign_r1_commitments {
                let bytes = hex::decode(hex_str)?;
                let c: frost::SigningCommitments = bincode::deserialize(&bytes)?;
                let id =
                    frost::Identifier::try_from(*id_num).map_err(|e| format!("identifier: {e}"))?;
                commitments.insert(id, c);
            }

            // Build signing package
            let sp = frost::build_signing_package(&message, &commitments);
            let sp_bytes = bincode::serialize(&sp)?;
            let sp_hex = hex::encode(&sp_bytes);
            self.sign_package_hex = Some(sp_hex.clone());

            let message_hex = hex::encode(&message);
            broadcast(
                self,
                &FrostMessage::SignRound2Package {
                    signing_package_hex: sp_hex,
                    message_hex,
                },
            )
            .await?;
            self.phase = SessionPhase::SignRound2;
            Ok(())
        }

        /// Aggregate collected signature shares and broadcast the result.
        async fn aggregate_and_broadcast(&mut self) -> Result<(), Box<dyn std::error::Error>> {
            let pkp_hex = self
                .sign_pkp_hex
                .clone()
                .ok_or("no public key package set")?;
            let sp_hex = self
                .sign_package_hex
                .clone()
                .ok_or("no signing package built")?;

            // Deserialize signing package
            let sp_bytes = hex::decode(&sp_hex)?;
            let sp: frost::SigningPackage = bincode::deserialize(&sp_bytes)?;

            // Deserialize public key package
            let pkp_bytes = hex::decode(&pkp_hex)?;
            let pkp: frost::PublicKeyPackage = bincode::deserialize(&pkp_bytes)?;

            // Deserialize signature shares
            let mut shares = BTreeMap::new();
            for (id_num, hex_str) in &self.sign_r2_shares {
                let bytes = hex::decode(hex_str)?;
                let s: frost::SignatureShare = bincode::deserialize(&bytes)?;
                let id =
                    frost::Identifier::try_from(*id_num).map_err(|e| format!("identifier: {e}"))?;
                shares.insert(id, s);
            }

            // Aggregate
            let sig =
                frost::aggregate(&sp, &shares, &pkp).map_err(|e| format!("aggregate: {e}"))?;
            let sig_bytes = bincode::serialize(&sig)?;
            let sig_hex = hex::encode(&sig_bytes);

            broadcast(
                self,
                &FrostMessage::SignResult {
                    signature_hex: sig_hex,
                },
            )
            .await?;
            self.phase = SessionPhase::Complete;
            Ok(())
        }
    }

    /// Run the coordinator server.
    pub async fn run(
        bind_addr: &str,
        config: SessionConfig,
        session_secret: String,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let listener = TcpListener::bind(bind_addr).await?;
        let coord = Arc::new(Mutex::new(Coordinator::new_with_secret(
            config,
            session_secret,
        )));

        eprintln!("[coordinator] listening on {bind_addr}");

        while let Ok((stream, addr)) = listener.accept().await {
            let coord = coord.clone();
            tokio::spawn(async move {
                if let Err(e) = handle_client(stream, coord, addr.to_string()).await {
                    eprintln!("[{addr}] error: {e}");
                }
            });
        }

        Ok(())
    }

    async fn handle_client(
        stream: tokio::net::TcpStream,
        coord: Arc<Mutex<Coordinator>>,
        addr: String,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let ws = accept_async(stream).await?;
        let (write, mut read) = ws.split();

        let mut participant_id: Option<u16> = None;
        let mut write_opt: Option<WsWrite> = Some(write);

        while let Some(msg) = read.next().await {
            let msg = msg?;
            if let Message::Text(text) = msg {
                let fm: FrostMessage = serde_json::from_str(&text)?;

                match fm {
                    FrostMessage::Join {
                        participant_id: pid,
                        session_secret,
                    } => {
                        let mut c = coord.lock().await;
                        
                        // Validate session secret
                        if !c.session_secret.is_empty() && session_secret != c.session_secret {
                            drop(c);
                            if let Some(w) = write_opt.as_mut() {
                                send_msg(
                                    w,
                                    &FrostMessage::Error {
                                        message: "authentication failed: invalid session secret"
                                            .into(),
                                    },
                                )
                                .await?;
                            }
                            return Ok(()); // disconnect
                        }

                        // Reject duplicate participant IDs
                        if c.participants.contains_key(&pid) {
                            drop(c);
                            if let Some(w) = write_opt.as_mut() {
                                send_msg(
                                    w,
                                    &FrostMessage::Error {
                                        message: format!(
                                            "participant {pid} already joined — duplicate IDs not allowed"
                                        ),
                                    },
                                )
                                .await?;
                            }
                            return Ok(()); // disconnect
                        }

                        participant_id = Some(pid);
                        if let Some(w) = write_opt.take() {
                            c.participants.insert(pid, w);
                        }
                        let welcome = FrostMessage::Welcome {
                            session_id: c.config.session_id.clone(),
                            max_signers: c.config.max_signers,
                            min_signers: c.config.min_signers,
                            participant_ids: c.participants.keys().copied().collect(),
                        };
                        drop(c);
                        let mut c = coord.lock().await;
                        if let Some(w) = c.participants.get_mut(&pid) {
                            send_msg(w, &welcome).await?;
                        }
                        eprintln!(
                            "[{addr}] participant {pid} joined ({}/{})",
                            c.participants.len(),
                            c.config.max_signers
                        );

                        if c.all_joined() {
                            c.phase = SessionPhase::TrustedDealer;
                            if !c.dealer_shares.is_empty() {
                                let shares = c.dealer_shares.clone();
                                let kps = c.dealer_kps.clone();
                                let pkp = c.dealer_pkp.clone();

                                for (id, w) in c.participants.iter_mut() {
                                    if let Some(share) = shares.get(id) {
                                        send_msg(
                                            w,
                                            &FrostMessage::DealerShare {
                                                share_hex: share.clone(),
                                            },
                                        )
                                        .await?;
                                    }
                                    if let Some(kp) = kps.get(id) {
                                        send_msg(
                                            w,
                                            &FrostMessage::DealerKeyPackage { kp_hex: kp.clone() },
                                        )
                                        .await?;
                                    }
                                }
                                if let Some(pkp) = pkp {
                                    broadcast(
                                        &mut c,
                                        &FrostMessage::DealerPublicKey { pkp_hex: pkp },
                                    )
                                    .await?;
                                }
                                broadcast(&mut c, &FrostMessage::Done).await?;
                                c.phase = SessionPhase::Complete;
                            } else {
                                broadcast(
                                    &mut c,
                                    &FrostMessage::Begin {
                                        phase: "trusted_dealer".into(),
                                    },
                                )
                                .await?;
                            }
                        }
                    }

                    FrostMessage::SignStart {
                        message_hex,
                        pkp_hex,
                    } => {
                        let mut c = coord.lock().await;
                        c.sign_message = Some(hex::decode(&message_hex)?);
                        c.sign_pkp_hex = Some(pkp_hex);
                        c.sign_r1_commitments.clear();
                        c.sign_r2_shares.clear();
                        c.sign_package_hex = None;
                        c.phase = SessionPhase::SignRound1;
                        eprintln!("[{addr}] signing session started");
                        broadcast(
                            &mut c,
                            &FrostMessage::Begin {
                                phase: "sign_round1".into(),
                            },
                        )
                        .await?;
                    }

                    FrostMessage::SignRound1Commitment {
                        participant_id: pid,
                        commitment_hex,
                    } => {
                        let mut c = coord.lock().await;
                        c.sign_r1_commitments.insert(pid, commitment_hex);
                        eprintln!(
                            "[sign] r1 commitment from {pid} ({}/{})",
                            c.sign_r1_commitments.len(),
                            c.config.min_signers
                        );
                        if c.all_sign_r1() {
                            c.build_and_broadcast_signing_package().await?;
                            eprintln!("[sign] signing package broadcast to all");
                        }
                    }

                    FrostMessage::SignRound2Share {
                        participant_id: pid,
                        share_hex,
                    } => {
                        let mut c = coord.lock().await;
                        c.sign_r2_shares.insert(pid, share_hex);
                        eprintln!(
                            "[sign] r2 share from {pid} ({}/{})",
                            c.sign_r2_shares.len(),
                            c.config.min_signers
                        );
                        if c.all_sign_r2() {
                            c.aggregate_and_broadcast().await?;
                            eprintln!("[sign] threshold signature aggregated and broadcast");
                        }
                    }

                    _ => {
                        let mut c = coord.lock().await;
                        if let Some(w) = c.participants.get_mut(&participant_id.unwrap_or(0)) {
                            send_msg(
                                w,
                                &FrostMessage::Error {
                                    message: "unexpected message".into(),
                                },
                            )
                            .await?;
                        }
                    }
                }
            }
        }

        Ok(())
    }

    async fn send_msg(
        write: &mut WsWrite,
        msg: &FrostMessage,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let json = serde_json::to_string(msg)?;
        write.send(Message::Text(json)).await?;
        Ok(())
    }

    async fn broadcast(
        coord: &mut Coordinator,
        msg: &FrostMessage,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let json = serde_json::to_string(msg)?;
        for w in coord.participants.values_mut() {
            w.send(Message::Text(json.clone())).await?;
        }
        Ok(())
    }
}

// ── WebSocket client ───────────────────────────────────────────────────────

#[cfg(feature = "net")]
pub mod client {
    use futures_util::{SinkExt, StreamExt};
    use tokio_tungstenite::{connect_async, tungstenite::Message};

    use super::*;

    /// Connect as a participant and handle messages via callbacks.
    pub async fn run(
        coordinator_url: &str,
        participant_id: u16,
        session_secret: &str,
        mut on_message: impl FnMut(FrostMessage) -> Option<FrostMessage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let (ws, _) = connect_async(coordinator_url).await?;
        let (mut write, mut read) = ws.split();

        let join = FrostMessage::Join {
            participant_id,
            session_secret: session_secret.to_string(),
        };
        write
            .send(Message::Text(serde_json::to_string(&join)?))
            .await?;

        while let Some(msg) = read.next().await {
            let msg = msg?;
            if let Message::Text(text) = msg {
                let fm: FrostMessage = serde_json::from_str(&text)?;
                if matches!(fm, FrostMessage::Done) {
                    break;
                }
                if let Some(response) = on_message(fm) {
                    write
                        .send(Message::Text(serde_json::to_string(&response)?))
                        .await?;
                }
            }
        }

        Ok(())
    }
}

// ── JSON helpers ───────────────────────────────────────────────────────────

impl FrostMessage {
    pub fn to_json(&self) -> Result<String, serde_json::Error> {
        serde_json::to_string(self)
    }
    pub fn from_json(json: &str) -> Result<Self, serde_json::Error> {
        serde_json::from_str(json)
    }
}
