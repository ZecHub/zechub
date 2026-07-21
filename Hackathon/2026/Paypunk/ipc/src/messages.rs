use tactix::Message;

/// Universal IPC message — raw bytes over the wire.
/// The sender and receiver each handle their own serialization.
/// `sender_public_key` is populated by the receiver with the
/// client's X25519 public key from the IPC handshake. It is
/// `None` for in-process (direct) messages.
#[derive(Message)]
#[response(Result<Vec<u8>, String>)]
pub struct IpcMessage {
    pub payload: Vec<u8>,
    pub sender_public_key: Option<[u8; 32]>,
}

impl IpcMessage {
    pub fn new(payload: Vec<u8>) -> Self {
        Self {
            payload,
            sender_public_key: None,
        }
    }
}

// ---------------------------------------------------------------------------
// Wire protocol — first byte of every frame payload identifies the type
// ---------------------------------------------------------------------------

/// Handshake: client requests server's public key. No additional payload.
pub const MSG_GET_PUBLIC_KEY: u8 = 0x00;

/// Handshake: server responds with its 32-byte X25519 public key.
/// Payload: [32 bytes public key]
pub const MSG_PUBLIC_KEY: u8 = 0x01;

/// Handshake: client registers its 32-byte X25519 public key.
/// Payload: [32 bytes public key]
pub const MSG_REGISTER_CLIENT: u8 = 0x02;

/// Handshake: server acknowledges client registration.
/// No additional payload.
pub const MSG_REGISTER_CLIENT_ACK: u8 = 0x03;

/// Application message — postcard-serialized payload with 32-byte MAC tag.
/// Payload: [postcard bytes] [32 bytes MAC]
pub const MSG_APPLICATION: u8 = 0x04;

/// Size of the Blake2b MAC tag in bytes.
pub const MAC_LEN: usize = 32;
