# ZechoStream

A decentralized, privacy-preserving audio streaming platform built for the ZecHub hackathon.

## Prerequisites
- Web client: https://github.com/elijahhampton/gtn-client
- Zebra - Zcash Full Node Implementation in Rust
- LightwalletD - Backend service that provides a bandwidth-efficient interface to the Zcash blockchain

## Configuration

### Environment Variables

Copy the example environment file and configure it for your setup: **(A .env file is already provided in /gtn-relay with preconfigured values)**

```bash
cp .env.example .env
```

#### Required Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `ZCASH_RPC_URL` | Zcash node RPC endpoint | `http://127.0.0.1:8232` |
| `LIGHT_WALLETD_ENDPOINT` | LightwalletD service endpoint | `http://127.0.0.1:9067` |
| `DISCOVERY_MODE` | Enable peer discovery | `true` |
| `DHT_LISTEN_ADDRESS` | DHT network listen address | `/ip4/127.0.0.1/tcp` |
| `DHT_LISTEN_PORT` | DHT network port | `9000` |
| `AUDIO_BIND_ADDRESS` | Audio service bind address | `127.0.0.1` |
| `AUDIO_BIND_PORT` | Audio service port | `8081` |
| `DISCOVERY_BIND_ADDRESS` | Discovery API bind address | `127.0.0.1` |
| `DISCOVERY_BIND_PORT` | Discovery API port | `8080` |
| `DEVELOPMENT_MODE` | Enable development features | `true` |

**Note:** Ensure your Zcash node and LightwalletD service are running before starting the application.

## Build and Run Instructions

## Build

```bash
cargo build
```

## Run

```bash
cd gtn-relay
../target/debug/gtn-relay --setup-fee-rate 0.0002 --renewal-fee-rate 0.0002 start
```

## ZecHub Hackathon

This project was developed for the ZecHub hackathon to showcase innovative use cases for Zcash in decentralized applications. It demonstrates how Zcash's privacy features can enable anonymous content monetization while maintaining technical simplicity.


## Architecture
You can find an architecture diagram in the main directory, i.e. "architecture.png".

## What It Does

ZechoStream allows anonymous broadcasters to stream live audio content and monetize it through Zcash micropayments. Broadcasters and listeners pay small amounts of ZEC to access streams in real-time.

## Key Features
- Anonymous broadcasting
- Decentralized relay network with no central servers
- Real-time audio streaming via WebSockets
- Zcash micropayments for access control and broadcasting payments

## Architecture

The system consists of three main components:

1. **Relay Nodes** (Rust) - Independent relay nodes that handle audio streaming and anonymous proxy services
2. **Web Client** (React) - Browser-based interface for stream discovery and audio playback
3. **Zcash Infrastructure** - Zebra full node and lightwalletd for interfacing with the blockchain

## How It Works

1. Broadcaster reserves relay node through relays Discovery API.
2. Broadcaster sends a payment to the relay node with the correct "RESERVE" JSON payload.
3. Broadcaster joins the stream using the transaction id as a path parameter with the relay's stream endpoint.
4. Listeners can join the stream using the same path.
5. If the stream expires the broadcaster or listener can send a "RENEW" JSON payload in a transaction to a relay.

## Transaction Payloads

### Reserve a Relay
Send a Zcash transaction to the relay with this JSON payload in the memo field:

```json
{
  "type": "RESERVE",
  "session_pk": "<your_session_public_key>"
}
```

### Renew a Stream
Send a Zcash transaction to the relay with this JSON payload in the memo field:

```json
{
  "type": "RENEW",
  "session_pk": "<your_session_public_key>",
  "stream_id": "<your_stream_id - the transaction id of the tx containing the RESERVE payload>"
}
```

## Technology Stack

- **Language**: Rust with Tokio async runtime
- **Networking**: Axum, libp2p, WebSockets
- **Blockchain**: Zcash RPC integration, lightwalletd integration
- **Frontend**: React web client
