use std::path::Path;

use blake2::digest::consts::U32;
use blake2::Digest;
use rand::RngCore;
use tactix::{Actor, Addr, Handler, Sender};
use tokio::net::{UnixListener, UnixStream};
use tracing::{debug, error, info, trace, warn};

use crate::messages::{
    IpcMessage, MAC_LEN, MSG_APPLICATION, MSG_GET_PUBLIC_KEY, MSG_PUBLIC_KEY, MSG_REGISTER_CLIENT,
    MSG_REGISTER_CLIENT_ACK,
};
use crate::transport::{IpcError, UnixSocketTransport};

// ---------------------------------------------------------------------------
// Keypair generation (X25519)
// ---------------------------------------------------------------------------

fn generate_keypair() -> ([u8; 32], [u8; 32]) {
    let mut secret = [0u8; 32];
    rand::thread_rng().fill_bytes(&mut secret);
    secret[0] &= 248;
    secret[31] &= 127;
    secret[31] |= 64;
    let public = x25519_dalek::x25519(secret, x25519_dalek::X25519_BASEPOINT_BYTES);
    (secret, public)
}

fn compute_mac(key: &[u8; 32], message: &[u8]) -> [u8; 32] {
    let mut hasher = blake2::Blake2b::<U32>::new();
    hasher.update(key);
    hasher.update(message);
    let result = hasher.finalize();
    let mut mac = [0u8; 32];
    mac.copy_from_slice(&result);
    mac
}

// ---------------------------------------------------------------------------
// Per-connection auth state
// ---------------------------------------------------------------------------

struct ConnectionAuth {
    hmac_key: Option<[u8; 32]>,
    registered: bool,
    client_public_key: Option<[u8; 32]>,
}

impl ConnectionAuth {
    fn new() -> Self {
        Self {
            hmac_key: None,
            registered: false,
            client_public_key: None,
        }
    }
}

// ---------------------------------------------------------------------------
// Server — listens on a Unix socket and dispatches requests
// ---------------------------------------------------------------------------

pub struct IpcReceiver {
    listener: UnixListener,
    secret: [u8; 32],
    public: [u8; 32],
}

impl IpcReceiver {
    /// Create a server with an existing listener and keypair.
    /// Used when the caller wants to control the keypair (e.g., share
    /// keypunkd's KeyStore keypair so the handshake key matches the
    /// encryption key).
    pub fn new(listener: UnixListener, secret: [u8; 32], public: [u8; 32]) -> Self {
        Self {
            listener,
            secret,
            public,
        }
    }

    pub async fn bind(path: impl AsRef<Path>) -> Result<Self, IpcError> {
        let path = path.as_ref();
        if path.exists() {
            std::fs::remove_file(path)?;
        }
        let listener = UnixListener::bind(path)?;
        let (secret, public) = generate_keypair();
        Ok(Self {
            listener,
            secret,
            public,
        })
    }

    /// Clean up any existing socket at `path`, bind a new `UnixListener`,
    /// and create an `IpcReceiver` with the given keypair.
    ///
    /// This is a convenience wrapper around `UnixListener::bind` +
    /// `IpcReceiver::new`, used by daemon binaries that already have a
    /// keypair (e.g. keypunkd sharing its encryption keypair with IPC).
    pub async fn bind_with(
        path: impl AsRef<Path>,
        secret: [u8; 32],
        public: [u8; 32],
    ) -> Result<Self, IpcError> {
        let path = path.as_ref();
        if path.exists() {
            std::fs::remove_file(path)?;
        }
        let listener = UnixListener::bind(path)?;
        Ok(Self {
            listener,
            secret,
            public,
        })
    }

    pub fn public_key(&self) -> [u8; 32] {
        self.public
    }

    /// Accept incoming connections. Each connection runs the handshake,
    /// then reads authenticated application messages and dispatches them
    /// to the handler actor.
    pub async fn serve<H>(&self, handler: Addr<H>) -> Result<(), IpcError>
    where
        H: Actor + Handler<IpcMessage>,
    {
        loop {
            let (stream, peer_addr) = self.listener.accept().await?;
            info!(peer = ?peer_addr, "accepted connection");
            let handler = handler.clone();
            let secret = self.secret;
            let public = self.public;
            tokio::spawn(async move {
                if let Err(e) = handle_connection(stream, handler, secret, public).await {
                    warn!(error = %e, "connection handler error");
                }
            });
        }
    }
}

// ---------------------------------------------------------------------------
// Per-connection handler
// ---------------------------------------------------------------------------

async fn handle_connection<H>(
    stream: UnixStream,
    handler: Addr<H>,
    secret: [u8; 32],
    public: [u8; 32],
) -> Result<(), IpcError>
where
    H: Actor + Handler<IpcMessage>,
{
    let peer_addr = stream.peer_addr().ok();
    let mut transport = UnixSocketTransport::from_stream(stream);
    let mut auth = ConnectionAuth::new();

    debug!(peer = ?peer_addr, "starting IPC connection");

    loop {
        let frame = match transport.read_frame().await {
            Ok(frame) => frame,
            Err(IpcError::Io(e)) if e.kind() == std::io::ErrorKind::UnexpectedEof => {
                debug!(peer = ?peer_addr, "client disconnected");
                return Ok(());
            }
            Err(e) => {
                error!(peer = ?peer_addr, error = %e, "frame read error");
                return Err(e);
            }
        };
        if frame.is_empty() {
            debug!(peer = ?peer_addr, "empty frame, closing connection");
            return Ok(());
        }

        let msg_type = frame[0];
        let payload = &frame[1..];

        match msg_type {
            MSG_GET_PUBLIC_KEY => {
                trace!(peer = ?peer_addr, "handshake: GetPublicKey");
                let mut response = vec![MSG_PUBLIC_KEY];
                response.extend_from_slice(&public);
                transport.write_frame(&response).await?;
                debug!(peer = ?peer_addr, "handshake: sent public key");
            }

            MSG_REGISTER_CLIENT => {
                if payload.len() != 32 {
                    warn!(peer = ?peer_addr, "handshake: invalid client public key length");
                    return Ok(());
                }
                let mut client_pk = [0u8; 32];
                client_pk.copy_from_slice(payload);
                let shared = x25519_dalek::x25519(secret, client_pk);
                let hmac_key = compute_mac(&shared, b"paypunk-ipc-hmac");
                auth.hmac_key = Some(hmac_key);
                auth.registered = true;
                auth.client_public_key = Some(client_pk);
                transport.write_frame(&[MSG_REGISTER_CLIENT_ACK]).await?;
                debug!(peer = ?peer_addr, "handshake: client registered");
            }

            MSG_APPLICATION => {
                if !auth.registered {
                    warn!(peer = ?peer_addr, "application message before registration");
                    return Ok(());
                }
                if payload.len() < MAC_LEN {
                    warn!(peer = ?peer_addr, "malformed application message (too short)");
                    return Ok(());
                }
                let (msg_payload, msg_mac) = payload.split_at(payload.len() - MAC_LEN);
                let hmac_key = auth.hmac_key.as_ref().unwrap();
                let expected_mac = compute_mac(hmac_key, msg_payload);
                if msg_mac != expected_mac {
                    warn!(peer = ?peer_addr, "MAC mismatch, dropping connection");
                    return Ok(());
                }

                debug!(peer = ?peer_addr, payload_len = msg_payload.len(), "dispatching application message");

                let response = handler
                    .ask(IpcMessage {
                        payload: msg_payload.to_vec(),
                        sender_public_key: auth.client_public_key,
                    })
                    .await;

                match response {
                    Ok(bytes) => {
                        trace!(peer = ?peer_addr, response_len = bytes.len(), "handler succeeded");
                        let mut frame = Vec::with_capacity(1 + bytes.len());
                        frame.push(0u8);
                        frame.extend_from_slice(&bytes);
                        transport.write_frame(&frame).await?;
                    }
                    Err(e) => {
                        warn!(peer = ?peer_addr, error = %e, "handler returned error");
                        let err_bytes = e.into_bytes();
                        let mut frame = Vec::with_capacity(1 + err_bytes.len());
                        frame.push(1u8);
                        frame.extend_from_slice(&err_bytes);
                        transport.write_frame(&frame).await?;
                    }
                }
            }

            _ => {
                warn!(peer = ?peer_addr, msg_type, "unknown message type");
                return Ok(());
            }
        }
    }
}
