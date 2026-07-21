# Bridge — Air-Gapped Signing Relay

> **Warning:** This is a work in progress. The bridge binds to all interfaces with no TLS and no WebSocket authentication. Only use it on trusted networks. Only simple transfer signing is supported.

The bridge is a WebSocket/HTTP relay between a local IPC client (paypunkd) and a browser or mobile signer app. It enables air-gapped QR-based signing: the wallet constructs transactions on an online machine, the bridge relays them via QR codes to an offline device for signing, and the signed result is scanned back.

## Architecture

```
paypunkd                Bridge                         Browser / Mobile Signer
   │                      │                                    │
   │ Unix socket          │ HTTP + WebSocket                   │ Camera + QR
   │ (X25519 + MAC)       │                                    │
   ├─────────────────────>│                                    │
   │  KeypunkdRequest     │ WS binary frame                    │
   │  (postcard)          ├───────────────────────────────────>│
   │                      │                                    │ display animated QR
   │                      │                                    │ signer scans QR
   │                      │                                    │ signer signs offline
   │                      │                                    │ signer displays response QR
   │                      │                                    │ bridge scans response QR
   │                      │<───────────────────────────────────┤
   │  KeypunkdResponse    │ WS binary frame                    │
   │  (postcard)          │                                    │
   │<─────────────────────┤                                    │
```

The bridge is a **transparent relay** — it never inspects or serializes `KeypunkdRequest`/`KeypunkdResponse` payloads. It only handles IPC framing + MAC verification on the socket side and raw binary WebSocket frames on the browser side.

## Launching

### Auto-spawn (signer mode)

```bash
paypunk --signer          # spawns bridge + paypunkd, then launches TUI
```

### Manual

```bash
# Start the bridge
paypunk bridge --port 12345 --socket-path /tmp/keypunkd.sock

# Start paypunkd pointing at the bridge socket
paypunk paypunkd --keypunkd-socket /tmp/keypunkd.sock

# Launch TUI
paypunk tui --signer
```

### Configuration

```rust
pub struct BridgeConfig {
    pub port: u16,          // default: 12345
    pub socket_path: String, // default: /tmp/keypunkd.sock (CLI) or /tmp/paypunk-bridge.sock (config)
}
```

## HTTP routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Serves `index.html` — the WebSocket + animated QR page |
| `GET` | `/ws` | WebSocket upgrade endpoint |

The server binds to `0.0.0.0:{port}` (all interfaces). The page uses `ws://` (no TLS).

## WebSocket protocol

- **Transport:** binary WebSocket frames only (no text, no JSON)
- **No authentication:** any WS client that connects becomes "the browser"
- **Single session:** only one browser connection is tracked at a time; new connections silently replace old ones
- **Single in-flight request:** one request at a time; a second request while the first is awaiting a response cancels the first

### Bridge → Browser

The raw `msg_payload` from the IPC `MSG_APPLICATION` message (MAC stripped). This is a postcard-serialized `KeypunkdRequest`.

### Browser → Bridge

Response bytes sent as a binary WS frame. Convention: `[0x00][postcard KeypunkdResponse]` for success, `[0x01][UTF-8 error message]` for failure.

## IPC handshake (socket side)

The bridge acts as an IPC server on a Unix domain socket. The handshake uses the same protocol as keypunkd:

| Step | Message | Direction | Payload |
|------|---------|-----------|---------|
| 1 | `MSG_GET_PUBLIC_KEY` (0x00) | Client → Bridge | none |
| 2 | `MSG_PUBLIC_KEY` (0x01) | Bridge → Client | 32-byte X25519 public key |
| 3 | `MSG_REGISTER_CLIENT` (0x02) | Client → Bridge | 32-byte client public key |
| 4 | `MSG_REGISTER_CLIENT_ACK` (0x03) | Bridge → Client | none |

Both sides derive: `shared = X25519(my_secret, their_public)`, then `hmac_key = Blake2b256(shared || "paypunk-ipc-hmac")`.

Application messages (`MSG_APPLICATION`, 0x04): `[postcard payload][32-byte Blake2b256(hmac_key || payload)]`. The bridge verifies the MAC, strips it, and forwards the payload to the browser.

Transport framing: 4-byte little-endian length prefix + payload.

## QR transport

The bridge web page uses **BC-UR animated QR codes** (fountain-coded fragments) for air-gapped transfer:

- **Display:** `UREncoder` with `MAX_FRAGMENT_LEN=200`, rendered at 8 fps via `QRCode.toCanvas` with `errorCorrectionLevel: 'L'`
- **Scan:** `getUserMedia({ facingMode: 'environment' })` + `jsQR` for decoding + `URDecoder` for fragment reassembly
- **Libraries:** `@ngraveio/bc-ur`, `qrcode`, `jsqr`, `buffer` (polyfill)

Camera access requires a secure context (HTTPS or localhost). Loading the page from a LAN IP over plain HTTP will block camera access in modern browsers.

## Application payload format

The payloads inside the WS frames are postcard-serialized types from `paypunk-types`:

- **Request:** `KeypunkdRequest` — variants include `PreviewArtifact`, `AuthorizeArtifact`, `ExportViewingKey`, `RegisterViewingKeys`, `VerifySignerSession`, etc.
- **Response:** `KeypunkdResponse` — variants include `ArtifactPreview`, `ArtifactAuthorized`, `ViewingKey`, `ViewingKeysRegistered`, `SessionVerified`, `Error`, etc.

See `types/src/lib.rs` for the full enum definitions.

## Writing a custom signer client

### Option A: WebSocket client (replace the browser)

Connect to the bridge's WebSocket and handle signing requests programmatically:

```javascript
const ws = new WebSocket('ws://127.0.0.1:12345/ws');
ws.binaryType = 'arraybuffer';

ws.onmessage = (event) => {
    const bytes = new Uint8Array(event.data);
    // bytes is a postcard-serialized KeypunkdRequest
    // Deserialize, handle, build KeypunkdResponse
    const response = new Uint8Array([0x00, /* postcard KeypunkdResponse */]);
    ws.send(response);
};
```

Or in Rust using a WebSocket client library:

```rust
// Connect to ws://127.0.0.1:12345/ws
// Receive binary frames → postcard::from_bytes::<KeypunkdRequest>(&frame)
// Build KeypunkdResponse → [0x00, postcard::to_allocvec(&resp)?]
// Send as binary WS frame
```

### Option B: IPC client (replace paypunkd's connection)

Use the `paypunk-ipc` crate to connect directly to the bridge's Unix socket:

```rust
use paypunk_ipc::{IpcMessage, IpcSender};
use paypunk_types::{KeypunkdRequest, KeypunkdResponse};

let addr = IpcSender::connect("/tmp/paypunk-bridge.sock").await?;
let payload = postcard::to_allocvec(&request)?;
let response: Vec<u8> = addr.ask(IpcMessage::new(payload)).await?;
// response[0] == 0x00 → success, postcard::from_bytes::<KeypunkdResponse>(&response[1..])
// response[0] == 0x01 → error, UTF-8 string
```

`IpcSender::connect` handles the full X25519 handshake + MAC key derivation automatically.

## Security considerations

- **Binds to `0.0.0.0`** — the bridge is reachable from the network, not just localhost. Use only on trusted networks.
- **No TLS / no WSS** — all traffic is plaintext. Sensitive fields (passwords, mnemonics) are encrypted at the application layer before reaching the bridge.
- **No WebSocket authentication** — any WS client can receive signing requests and inject responses. A malicious actor on the network could forge signing responses.
- **No client identity verification on IPC** — any process that can reach the socket path can complete the handshake. Access control is via filesystem permissions.
- **Single-browser, last-writer-wins** — no session tokens, no multiplexing, no concurrency control.

See [SECURITY.md](SECURITY.md) for the full threat model.

## See also

- [SECURITY.md](SECURITY.md) — threat model and security boundaries
- [signer/README.md](../../signer/README.md) — Tauri v2 mobile signer app
- [ADR-001](../../adr/001-ipc-auth-model.md) — IPC authentication design
