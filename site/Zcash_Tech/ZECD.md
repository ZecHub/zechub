<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD — Shielded-First Wallet Server

> 🇧🇷 [Versão em Português](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD is a shielded-first wallet server for Zcash, built on [librustzcash](https://github.com/zcash/librustzcash) and exposed through Bitcoin Core's JSON-RPC dialect. It gives developers and payment integrators a familiar, Bitcoin-compatible API for interacting with Zcash — while making Orchard (the most private pool) the default. Developed by [zec.rocks](https://zec.rocks), ZECD is designed to replace `zcashd`'s wallet functionality in modern, cloud-native deployments.

---

## TL;DR

- ZECD is a **wallet daemon (server)** — not a full node. It handles keys, scanning, proving, and RPC without speaking the Zcash P2P protocol.
- It speaks **Bitcoin Core's JSON-RPC dialect**: same method names, field shapes, auth, and error codes — many Bitcoin RPC clients work with Zcash out of the box.
- **Orchard (shielded) addresses are the default**; transparent (t-address) and Sapling support require explicit opt-in per wallet.
- It connects to a **self-hosted [Zebra](Zebra_Full_Node.md) full node** via local JSON-RPC — no lightwalletd needed.
- **Stateless by design**: the entire wallet is recoverable from the seed phrase alone, making the data directory disposable.
- **Not a drop-in for zcashd**: implements only a subset of Zcash RPC methods, with intentional design differences for privacy and safety.
- Fees follow **ZIP-317** (deterministic fee calculation); user-specified fees are rejected.

---

## What Problem Does ZECD Solve?

`zcashd` was Zcash's original node and wallet combined — forked from Bitcoin's C++ codebase in 2016. Over time, this created friction: the code is difficult to maintain, the wallet is tightly coupled to the node, and transparent addresses are presented as first-class options alongside shielded ones.

ZECD separates wallet responsibility from consensus. It is a **dedicated wallet layer** that sits between applications and a Zebra full node, providing:

- A clean, modern Rust implementation built on librustzcash (the same library powering Zashi and Zodl)
- Privacy-by-default design (Orchard addresses unless otherwise configured)
- A Bitcoin-compatible RPC interface that removes the need to learn Zcash-specific tooling
- Stateless, seed-recoverable architecture suited to containerized and cloud deployments

---

## Architecture

ZECD operates in a three-tier model:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD communicates with Zebra **exclusively through local JSON-RPC** — no peer-to-peer networking, no third-party indexers, no lightwalletd. The Zebra connection is deliberately local-only: ZECD will refuse to send credentials to a globally-routable host unless explicitly configured for an out-of-band secured tunnel (e.g. WireGuard or SSH).

---

## Key Features

### Shielded-First, Orchard by Default

ZECD uses Orchard Unified Addresses as the default address type. Sapling and transparent (t-address) pools require explicit configuration per wallet. This design reduces the risk of accidental transparent sends — a common privacy pitfall in older Zcash tooling.

Privacy policy is configurable:

| Policy | Behavior |
|--------|----------|
| `AllowRevealedRecipients` (default) | Permits sends to transparent recipients |
| `FullPrivacy` | Only single shielded-pool sends; no transparent recipients, no cross-pool |
| `AllowFullyTransparent` | Also permits t→t sends funded from transparent UTXOs |

### Bitcoin Core RPC Compatibility

ZECD implements Bitcoin Core's JSON-RPC dialect with conformance across:

- Method names (e.g. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`)
- Field names and types in responses
- JSON-RPC 1.0 envelope structure
- Basic auth and cookie file authentication
- Error codes and HTTP status mapping

This means many existing Bitcoin payment libraries, exchange integrations, and monitoring tools can interact with Zcash via ZECD with little or no code changes.

> **Note:** ZECD is intentionally **not** backwards-compatible with `zcashd`. It implements only a subset of the `z_*` methods, and label-related methods (`setlabel`, `listlabels`, etc.) are not implemented by design (see *Stateless by Design* below).

### Stateless by Design

ZECD persists **no off-chain state that a seed-only restore couldn't rebuild**. The wallet database (`data.sqlite`) is entirely derivable from the seed phrase — shielded funds are recovered unconditionally; transparent funds are recovered up to the configured gap limit.

To restore a wallet from seed:

```sh
zecd init --restore --birthday <block-height>
```

This makes the data directory **disposable**: a container with no persistent volume, rebuilt from the seed on each start, loses nothing critical. Operators are responsible for tracking addresses they hand out — ZECD only remembers addresses once they have received funds on-chain.

Labels are intentionally absent. Because labels have no on-chain source and cannot be reconstructed from seed, ZECD simply does not support them. Calling label methods returns a `method-not-found` error (`-32601`).

### No lightwalletd Dependency

ZECD derives compact blocks, tree state, and mempool visibility directly from Zebra's JSON-RPC. There is no lightwalletd to operate or maintain — reducing operational complexity for self-hosted deployments.

### Cloud-Native and Containerized Deployments

ZECD's stateless architecture is designed for Docker and Kubernetes environments:

- Full Docker Compose stack (`zebra → zecd`) available in the repository
- Health endpoint on port `9233` with configurable readiness probes (`synced` or `alive`)
- Structured JSON logging option for log aggregation pipelines
- ZIP-317 deterministic fees — no fee oracle or manual fee configuration

### Seed Compatibility with Other librustzcash Wallets

ZECD is compatible with other librustzcash-powered wallets, including [Zodl](https://github.com/zodl-inc/zodl-ios) (iOS/Android). If something goes wrong with a ZECD deployment, the seed phrase can be entered into any other librustzcash wallet to access funds. The reverse migration (from `zcashd`) is supported only by sending on-chain to a new ZECD address.

---

## Quick Start

ZECD is not yet published on crates.io; build from source or use the Docker stack.

**Prerequisites:** a locally running Zebra full node with `rpc.listen_addr = 127.0.0.1:18234` (testnet).

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
cargo run --release -- --datadir ./data --testnet \
    init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
cargo run --release -- --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Interact via curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Interact via Python (using a Bitcoin RPC library):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress("invoice-1")  # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))
```

---

## Default Ports

| Network | ZECD RPC | Zebra RPC (backend) | Health |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| Role | Full node + wallet | Indexer (replaces lightwalletd) | Wallet server only |
| Language | C++ | Rust | Rust |
| Status | Deprecated | Active | Active |
| Default pool | Transparent | N/A | Orchard (shielded) |
| RPC dialect | zcashd-specific | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Requires full node | Yes (self) | Zebra or zcashd | Zebra |
| Stateless recovery | No | N/A | Yes (seed-only) |
| Cloud-native | No | Partial | Yes |

---

## Related Pages

- [Zebra Full Node](Zebra_Full_Node.md) — the full node ZECD connects to
- [Zaino Indexer](Zaino.md) — alternative indexer approach (replaces lightwalletd)
- [Zakura Node](Zakura_Node.md) — another full node implementation (fork of Zebra)
- [Viewing Keys](Viewing_Keys.md) — how ZECD scans the chain using account viewing keys
- [Wallets](/using-zcash/wallets) — wallet ecosystem overview

## Resources

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [zec.rocks](https://zec.rocks)
- [librustzcash — core Zcash cryptography library](https://github.com/zcash/librustzcash)
- [Zodl wallet (librustzcash-compatible)](https://github.com/zodl-inc/zodl-ios)
- [ZIP-317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
