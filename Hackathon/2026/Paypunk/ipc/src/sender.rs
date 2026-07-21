use blake2::digest::consts::U32;
use blake2::Digest;
use rand::RngCore;
use tactix::{Actor, Addr, Ctx, Handler};
use tracing::{debug, error, info, trace, warn};

use crate::messages::{
    IpcMessage, MAC_LEN, MSG_APPLICATION, MSG_GET_PUBLIC_KEY, MSG_PUBLIC_KEY, MSG_REGISTER_CLIENT,
    MSG_REGISTER_CLIENT_ACK,
};
use crate::transport::{IpcError, UnixSocketTransport};

// ---------------------------------------------------------------------------
// Helpers
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
// IpcSender — wraps a transport as a tactix actor
// ---------------------------------------------------------------------------

pub struct IpcSender {
    transport: UnixSocketTransport,
    hmac_key: [u8; 32],
}

impl IpcSender {
    /// Connect to a Unix socket at `path`, perform the authenticated
    /// handshake, and return a running actor address.
    ///
    /// The handshake is transparent to the caller:
    /// 1. Generate an ephemeral X25519 keypair for this connection
    /// 2. Request the server's public key
    /// 3. Register our public key with the server
    /// 4. Derive a shared HMAC key for message authentication
    pub async fn connect(path: &str) -> Result<Addr<Self>, IpcError> {
        info!(path, "connecting to IPC server");

        let mut transport = UnixSocketTransport::connect(path).await?;

        // Generate our keypair
        let (client_secret, client_public) = generate_keypair();

        // Step 1: Send GetPublicKey
        debug!("handshake: sending GetPublicKey");
        transport.write_frame(&[MSG_GET_PUBLIC_KEY]).await?;

        // Step 2: Receive server's public key
        let frame = transport.read_frame().await?;
        if frame.len() != 33 || frame[0] != MSG_PUBLIC_KEY {
            return Err(IpcError::HandshakeFailed(
                "unexpected response to GetPublicKey".into(),
            ));
        }
        let mut server_public = [0u8; 32];
        server_public.copy_from_slice(&frame[1..33]);
        debug!("handshake: received server public key");

        // Step 3: Send RegisterClient with our public key
        let mut reg = vec![MSG_REGISTER_CLIENT];
        reg.extend_from_slice(&client_public);
        transport.write_frame(&reg).await?;

        // Step 4: Wait for registration ack
        let ack = transport.read_frame().await?;
        if ack.len() != 1 || ack[0] != MSG_REGISTER_CLIENT_ACK {
            return Err(IpcError::HandshakeFailed(
                "client registration rejected".into(),
            ));
        }
        debug!("handshake: client registered successfully");

        // Derive shared HMAC key
        let shared = x25519_dalek::x25519(client_secret, server_public);
        let hmac_key = compute_mac(&shared, b"paypunk-ipc-hmac");

        let actor = Self {
            transport,
            hmac_key,
        };

        info!(path, "IPC connection established");
        Ok(actor.start())
    }
}

impl Actor for IpcSender {}

impl Handler<IpcMessage> for IpcSender {
    async fn handle(&mut self, msg: IpcMessage, _ctx: &Ctx<Self>) -> Result<Vec<u8>, String> {
        trace!(payload_len = msg.payload.len(), "sending IPC message");

        // Build application frame: type byte + payload + MAC
        let mac = compute_mac(&self.hmac_key, &msg.payload);
        let mut frame = Vec::with_capacity(1 + msg.payload.len() + MAC_LEN);
        frame.push(MSG_APPLICATION);
        frame.extend_from_slice(&msg.payload);
        frame.extend_from_slice(&mac);

        self.transport.write_frame(&frame).await.map_err(|e| {
            error!(error = %e, "failed to write IPC frame");
            e.to_string()
        })?;

        let raw = self.transport.read_frame().await.map_err(|e| {
            error!(error = %e, "failed to read IPC response");
            e.to_string()
        })?;

        if raw.is_empty() {
            error!("empty IPC response");
            return Err("empty response".into());
        }
        match raw[0] {
            0 => {
                trace!(response_len = raw[1..].len(), "IPC response OK");
                Ok(raw[1..].to_vec())
            }
            1 => {
                let msg = String::from_utf8_lossy(&raw[1..]).to_string();
                warn!(error = %msg, "IPC remote error");
                Err(msg)
            }
            _ => {
                warn!(status = raw[0], "invalid IPC response status");
                Err("invalid response status".into())
            }
        }
    }
}
