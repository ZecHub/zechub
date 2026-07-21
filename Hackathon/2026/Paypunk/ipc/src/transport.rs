use bytes::BytesMut;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::UnixStream;
use tracing::trace;

/// Error type for IPC transport operations.
#[derive(Debug, thiserror::Error)]
pub enum IpcError {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Connection closed")]
    ConnectionClosed,

    #[error("Handshake failed: {0}")]
    HandshakeFailed(String),
}

/// A Unix domain socket transport that handles framed reads and writes.
///
/// Encapsulates all direct `UnixStream` I/O so that `IpcSender` and
/// `IpcReceiver` never touch the socket directly. This makes it possible
/// to swap in a different transport (e.g. TCP, TLS) later without changing
/// the actor code.
pub struct UnixSocketTransport {
    stream: UnixStream,
    read_buf: BytesMut,
}

impl UnixSocketTransport {
    /// Connect to a Unix socket at `path`.
    pub async fn connect(path: &str) -> Result<Self, IpcError> {
        let stream = UnixStream::connect(path).await?;
        Ok(Self::from_stream(stream))
    }

    /// Wrap an already-connected `UnixStream`.
    pub fn from_stream(stream: UnixStream) -> Self {
        Self {
            stream,
            read_buf: BytesMut::with_capacity(4096),
        }
    }

    /// Read a length-prefixed frame: 4-byte LE length followed by payload.
    pub async fn read_frame(&mut self) -> Result<Vec<u8>, IpcError> {
        let mut len_buf = [0u8; 4];
        self.stream.read_exact(&mut len_buf).await?;
        let len = u32::from_le_bytes(len_buf) as usize;
        self.read_buf.resize(len, 0);
        self.stream.read_exact(&mut self.read_buf[..len]).await?;
        let data = self.read_buf[..len].to_vec();
        trace!(frame_len = len, "read frame");
        Ok(data)
    }

    /// Write a length-prefixed frame: 4-byte LE length followed by payload.
    pub async fn write_frame(&mut self, data: &[u8]) -> Result<(), IpcError> {
        let len = data.len() as u32;
        self.stream.write_all(&len.to_le_bytes()).await?;
        self.stream.write_all(data).await?;
        self.stream.flush().await?;
        trace!(frame_len = data.len(), "wrote frame");
        Ok(())
    }
}
