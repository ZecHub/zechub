<p align="center">
  <img src="paypunk.png" alt="Paypunk logo" width="100" />
</p>

<h1 align="center">Paypunk Project</h1>

<p align="center">
  <em>This is experimental software and should not be used with real funds</em>
</p>

<p align="center">
  <a href="https://github.com/blockhackersio/paypunk/actions/workflows/ci.yml"><img src="https://github.com/blockhackersio/paypunk/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://www.gnu.org/licenses/agpl-3.0"><img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg" alt="License: AGPL-3.0" /></a>
  <a href="https://www.rust-lang.org/"><img src="https://img.shields.io/badge/rust-stable-orange.svg" alt="Rust" /></a>
  <img src="https://img.shields.io/badge/status-alpha-yellow.svg" alt="Status" />
</p>

## The Goal

Privacy is under threat. The tools people use to transact privately are fragmented, hard to integrate, and locked behind walled gardens. Every privacy coin has its own wallet, its own architecture, its own signing model — and none of them talk to each other.

Paypunk is building toward a different future: **one wallet framework, every privacy protocol, fully extensible.**

Imagine a wallet where:

- Your **Zcash, Monero, Ethereum, Railgun, Bitcoin** live side by side, managed from a single interface
- The same backend powers a **terminal UI, a desktop app, a mobile app, and an agent SDK** — because the architecture is frontend-agnostic from day one
- Your keys never touch an internet-connected device - due to architecture **air-gapped signing via QR codes** is a first-class flow
- **Agents** can transact on your behalf via a scriptable CLI and IPC API, with human approval for sensitive operations
- **Swapping** between ZEC and ETH happens in-wallet, routed through decentralized protocols, without surrendering custody
- Host your wallet on the server approve on your phone
- New privacy protocols — **Aleo, Aztec, Railgun** — plug in by implementing a couple of traits, not by forking the wallet
- As new decentralized cross chain swap mechanisms come up they are integrated (eg near-intents / thorchain etc.)

The architecture is functional. The trait system works. Zcash and Ethereum are proven. The foundation is solid. What's missing is the work to harden it, polish it, and extend it to the protocols that matter.

### We need help

This is an ambitious project and it's early. If any of this resonates, there's meaningful work for you here:

- **Rust developers** — implement new chain protocols, harden existing ones, improve the IPC layer
- **Security researchers** — review the threat model, audit the crypto, find the gaps before they're exploited
- **Tauri/frontend developers** — build the desktop and mobile UIs that will replace the throwaway TUI
- **Zcash protocol experts** — help with Sapling/transparent support, ZSAs, and PCZT edge cases
- **Privacy advocates** — help shape the product, test the flows, and make sure the UX serves real people

Every issue is tracked at **[github.com/blockhackersio/paypunk/issues](https://github.com/blockhackersio/paypunk/issues)** — architecture improvements, security hardening, new chain integrations, and UI work are all written up and ready to be picked up.

Read the [architecture docs](ARCHITECTURE.md), the [contributing guide](CONTRIBUTING.md), and the [add-a-protocol guide](ADD_PROTOCOL.md). Pick an issue. Open a PR.

Privacy shouldn't be hard. Let's build the tools that make it easy.

---

> **Warning:** This project is a work in progress. The architecture is designed for extensibility, but only simple transfers (send/receive) are currently supported. Several features — DB encryption, interactive password prompts, environment-variable passphrase input — are planned but not yet implemented. Expect breaking changes.

## What is Paypunk?

Paypunk began as an entry for the Zcash Hackathon — an opportunity to build the privacy wallet I'd been wanting to make for years. But the goal was never just a wallet. It's an **extensible framework for building privacy-preserving crypto wallets**, designed so that adding new chains (Monero, Bitcoin, and beyond) is a lighter lift than starting from scratch.

Two architectural decisions drive everything else:

- **Signing/wallet separation** — Keys live in a separate process (`keypunkd`) or on an entirely air-gapped device (the mobile signer app). The wallet daemon never holds key material. This makes offline signing, hardware wallets, and multi-signature flows natural extensions rather than bolted-on features.
- **Multi-token by design** — Chain-specific logic is isolated behind `Protocol` and `SignerProtocol` traits. Zcash and Ethereum are the first two implementations; adding a new chain means implementing those traits, not rearchitecting the wallet.

The IPC layer (Unix sockets + tactix actors) means frontends can be built in any technology — the current TUI is a throwaway first draft. The same backend serves a CLI for scripting, a TUI for interactive use, a web bridge for QR-based signing, and future desktop/mobile apps. The transport is designed to be swappable — the `UnixSocketTransport` encapsulates all I/O behind a framed read/write interface, so a TCP or TLS transport could be added for remote/web deployment without changing the actor code. Sensitive payloads (passwords, mnemonics) are end-to-end encrypted at the application layer using X25519 + AES-256-GCM before being sent over IPC, and every message is authenticated with a per-message Blake2b MAC derived from an X25519 key exchange.

Think of this not as "a Zcash wallet with a TUI and an offline signer" but as a **scriptable, privacy-first wallet framework** ready to extend to whatever protocols matter next.

## Architecture

Layered, multi-process design:

- **`types`** — Chain-agnostic domain types (`Address`, `Amount`, `Balance`, `Transfer`, `Intent`, `Protocol`/`SignerProtocol` traits, etc.). No chain-specific logic.
- **`config`** — TOML-based configuration with environment variable overrides (socket paths, data directory, RPC endpoints, network selection).
- **`api`** — Chain-agnostic library. Dispatches to the appropriate chain backend by `ProtocolId` (Zcash, Ethereum). Hides IPC and actor details from consumers.
- **`paypunkd`** — App daemon (library crate, launched via `paypunk paypunkd`). Hosts the `Paypunkd` actor, usecases, service orchestration, chain backend injection.
- **`keypunkd`** — Key daemon (library crate, launched via `paypunk keypunkd`). Hosts the `Keypunkd` actor. Seed generation, signing, proving. Designed to run as a separate system user (deployment concern, not enforced by code).
- **`ipc`** — Tactix actor sender for interprocess communication. Transport-agnostic framing (currently Unix sockets; TCP/TLS swappable). Per-message X25519 + Blake2b MAC authentication. Sensitive payloads encrypted at the application layer (X25519 + AES-256-GCM). Carries opaque byte payloads; serialization (postcard) is done by callers.
- **`protocols/{zcash,ethereum}`** — Chain-specific implementations of the `Protocol` and `SignerProtocol` traits from `paypunk-types`.
- **`cli`** — Command-line interface binary (`paypunk`). Uses `api` for scripting and automation. Also launches daemons and the TUI.
- **`tui`** — Terminal-based interactive UI (ratatui). Library crate consumed by the CLI, also builds as a standalone binary.
- **`bridge`** — WebSocket/HTTP relay between a local IPC client and a browser, for air-gapped QR-based signing.
- **`signer`** — Tauri v2 mobile app for offline air-gapped signing (separate build, excluded from workspace).
- **`ping`/`pong`** — Diagnostic IPC round-trip test pair.

### Process Model

Three processes with a strict security boundary:

- **paypunk** — CLI/TUI binary. Connects to paypunkd via the `api` library. Never touches key material directly.
- **paypunkd** — Manages addresses, chain sync, balance tracking, and transfer construction. Delegates signing to keypunkd. Never holds key material.
- **keypunkd** — Holds decrypted keys in protected memory. Accepts sign/prove requests from any process that completes the X25519 IPC handshake, never exposes raw key material.

## Privacy

- Zcash Orchard shielded pool and Ethereum support
- Seed encrypted at rest with Argon2id-derived key (AES-256-GCM)
- Wallet state database is currently plaintext (`paypunkd.db`); encryption at rest is planned

## Installation

### From GitHub

```bash
cargo install --locked --git https://github.com/blockhackersio/paypunk
```

### From source

```bash
git clone https://github.com/blockhackersio/paypunk.git
cd paypunk
cargo install --locked --path cli
```

The `paypunk` binary is installed to `~/.cargo/bin/paypunk`.

## Getting started

The `paypunk` binary auto-launches both daemons and the TUI when run with no subcommand. Individual subcommands are also available:

```bash
paypunk                                # auto-launch keypunkd + paypunkd + TUI
paypunk keypunkd                       # launch key daemon only
paypunk paypunkd                       # launch app daemon only
paypunk tui                            # launch TUI only (daemons must be running)
paypunk generate-seed -p <password>    # CLI: generate a new wallet
paypunk get-balance --protocol zcash   # CLI: check balance
```

### Running the TUI

The simplest way — auto-launches both daemons and opens the TUI:

```bash
paypunk
```

To run the TUI against already-running daemons (e.g. daemons started separately or on another machine):

```bash
paypunk tui
```

The TUI can also connect to an offline signer instead of a local keypunkd:

```bash
paypunk tui --signer
```

Keybindings within the TUI:

| Key | Action |
|-----|--------|
| `?` | Help overlay (context-sensitive) |
| `Enter` | Select / confirm |
| `Esc` | Back / cancel |
| `q` | Quit |
| `s` | Send |
| `o` | Receive |
| `a` | Add account |
| `r` | Refresh |
| `c` | Copy to clipboard |

### Networks

Paypunk supports Zcash `regtest`, `testnet`, and `mainnet`. The network is selected via the `--zcash-network` flag or the `PAYPUNK_ZCASH_NETWORK` env var. Each network uses its own data directory and default lightwalletd endpoint:

| Network | Lightwalletd default | Data directory |
|---------|---------------------|-----------------|
| `regtest` | `http://127.0.0.1:9067` (local) | `~/.local/share/paypunk/regtest/` |
| `testnet` | `https://testnet.zec.rocks:443` | `~/.local/share/paypunk/testnet/` |
| `mainnet` | `https://zec.rocks:443` | `~/.local/share/paypunk/mainnet/` |

#### Regtest (local development)

Requires a local `zcashd` + `lightwalletd` running on port 9067. See [`support/zcash/README.md`](../../support/zcash/README.md) for a Docker-based regtest setup.

```bash
# Start the regtest stack
cd support/zcash && make up

# Run paypunk against regtest (default)
paypunk --zcash-network regtest

# Or via env var
PAYPUNK_ZCASH_NETWORK=regtest paypunk
```

To fund your wallet in regtest, mine blocks and shield coinbase to your wallet's address:

```bash
cd support/zcash
make fund UA=<your-orchard-ua>
```

#### Mainnet

Connects to a public lightwalletd endpoint by default. Use a custom endpoint for better privacy or reliability:

```bash
# Using the default public endpoint (https://zec.rocks:443)
paypunk --zcash-network mainnet

# Using a custom lightwalletd
paypunk --zcash-network mainnet --lightwalletd-host https://my-lwd.example.com:443

# Or via env vars
PAYPUNK_ZCASH_NETWORK=mainnet PAYPUNK_LIGHTWALLETD_HOST=https://my-lwd.example.com:443 paypunk
```

##### Birthday block

When restoring a mainnet wallet that has prior activity, provide a **birthday block height** so the initial sync starts from that block instead of scanning from genesis (or auto-fetching the chain tip, which skips historical blocks entirely):

```bash
paypunk restore-seed -m "word1 ... word12" -p <password> --zcash-network mainnet --birthday-height 1234567
```

If omitted on mainnet, the wallet auto-fetches the current chain tip as the birthday — fine for fresh wallets, but existing funds below that height will not be detected. The stored birthday is consulted by `create_account`, `register_signer`, and `bulk_derive_accounts` before falling back to the tip. The background sync loop also falls back to the minimum account birthday when the wallet DB has no scanned blocks yet, so historical scanning will eventually occur even if the initial `SyncNewAccount` is missed.

When using the devenv `setup` script with a `.mnemonic` file (mainnet mode), pass the birthday block as the first argument:

```bash
devenv shell -- run setup 1234567
```

The script will warn and prompt you if a mainnet wallet is restored without a birthday block.

#### Ethereum

Ethereum uses an RPC URL (JSON-RPC over HTTP). The default points to a local node (`http://127.0.0.1:8545`); override it for mainnet or testnet:

```bash
# Local anvil/hardhat node (see support/ethereum/README.md)
paypunk --ethereum-rpc-url http://127.0.0.1:8545

# Mainnet (via your own node or provider)
PAYPUNK_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/<key> paypunk

# Sepolia testnet
PAYPUNK_ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/<key> paypunk
```

#### Configuration file

All defaults can be overridden in `~/.config/paypunk/config.toml`. Generate a template with:

```bash
paypunk  # creates the config file on first run if it doesn't exist
```

See [`config/src/lib.rs`](../../config/src/lib.rs) for all available fields and env var overrides.

### Offline signer

Paypunk supports air-gapped signing via two mechanisms: a **QR bridge** (desktop-to-mobile) and a **Tauri mobile app**.

#### QR bridge (desktop)

In offline signer mode, paypunk spawns a WebSocket/HTTP bridge instead of keypunkd. The bridge relays signing requests to a browser (or the mobile signer app) via QR codes, keeping key material on the air-gapped device.

```bash
# Run the TUI in signer mode — spawns bridge + paypunkd, then launches TUI
paypunk --signer

# Or via env var / config
PAYPUNK_OFFLINE_SIGNER=true paypunk

# Or set it in config.toml:
# offline_signer = true
```

To run the bridge manually (e.g. on a separate machine):

```bash
# Start the bridge on a custom port and socket
paypunk bridge --port 12345 --socket-path /tmp/keypunkd.sock

# Then start paypunkd pointing at the bridge socket
paypunk paypunkd --keypunkd-socket /tmp/keypunkd.sock

# Then launch the TUI
paypunk tui --signer
```

The bridge serves an HTML page at `http://0.0.0.0:12345/` and a WebSocket endpoint at `ws://0.0.0.0:12345/ws`. Open the page in a browser on the signing device to scan/display QR codes.

#### Mobile signer app (Tauri v2)

The `signer/` directory contains a Tauri v2 mobile app for Android that handles QR-based signing on a phone. It wraps the same `Keypunk` signing logic as keypunkd but runs entirely on-device — keys never leave the phone.

See [`signer/README.md`](../../signer/README.md) for build and installation instructions.

**Signing flow:**

1. Wallet (desktop) constructs a transaction and encodes it as QR codes
2. User scans the QR with the signer app (or the bridge web page)
3. Signer app previews the transaction (recipient, amount, fee)
4. User approves — signer signs with the on-device seed
5. Signed artifact is displayed as QR codes
6. User scans the result back into the wallet, which broadcasts it

## Roadmap

1. **DB encryption from signer password entropy** — encrypt `paypunkd.db` at rest using key material derived from the signer password, with separate compartmentalization from seed encryption
2. **Tauri Desktop UI** — replace the throwaway TUI with a proper desktop application using the same IPC backend
3. **Tauri Mobile UI** — full mobile wallet experience (the signer app is the first step; a full mobile wallet follows)
4. **Transparent / Sapling addresses** — extend Zcash support beyond Orchard to include Sapling and transparent pools
5. **Zcash / Ethereum hardening** — production-grade error handling, edge cases, replay protection, and test coverage for existing chains
6. **Cross-chain asset swaps** — near-intent-level swaps between assets (e.g. ZEC ↔ ETH) using the `Intent` enum pattern
7. **ZSAs** — Zcash Shielded Assets support
8. **Further privacy token integrations** — Monero, Railgun, Aleo, Aztec tokens, and other privacy-preserving protocols
