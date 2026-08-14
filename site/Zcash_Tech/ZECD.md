<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD — Shielded-First Wallet Server

> 🇧🇷 [Versão em Português](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD is a shielded-first wallet server for Zcash, built on [librustzcash](https://github.com/zcash/librustzcash) and exposed through Bitcoin Core's JSON-RPC dialect. It gives developers and payment integrators a familiar, Bitcoin-compatible API for interacting with Zcash — while making Orchard (the most private pool) the default. Developed by [zec.rocks](https://zec.rocks), ZECD is designed to replace `zcashd`'s wallet functionality in modern, cloud-native deployments.

**Current version:** 0.5.0-rc3 (July 13, 2026) — with Ironwood (NU6.3) support. Install via `cargo install zecd` or use the official Docker image.

---

## TL;DR

- ZECD is a **wallet daemon (server)** — not a full node. It handles keys, scanning, proving, and RPC without speaking the Zcash P2P protocol.
- It speaks **Bitcoin Core's JSON-RPC dialect**: same method names, field shapes, auth, and error codes — many Bitcoin RPC clients work with Zcash out of the box.
- **Orchard (shielded) addresses are the default**; transparent (t-address) and Sapling support require explicit opt-in per wallet.
- It connects to a **self-hosted [Zebra](Zebra_Full_Node.md) full node** via local JSON-RPC — no lightwalletd needed.
- **Stateless by design**: the entire wallet is recoverable from the seed phrase alone, making the data directory disposable.
- **Not a drop-in for zcashd**: implements only a subset of Zcash RPC methods, with intentional design differences for privacy and safety.
- Fees follow **ZIP-317** (deterministic fee calculation); user-specified fees are rejected.
- Supports **shielded memos (ZIP-302)** through the familiar Bitcoin RPC surface.

---

## What Problem Does ZECD Solve?

`zcashd` was Zcash's original node and wallet combined — forked from Bitcoin's C++ codebase in 2016. Over time, this created friction: the code is difficult to maintain, the wallet is tightly coupled to the node, and transparent addresses are presented as first-class options alongside shielded ones.

ZECD separates wallet responsibility from consensus. It is a **dedicated wallet layer** that sits between applications and a Zebra full node, providing:

- A clean, modern Rust implementation built on librustzcash (the same library powering Zodl and Zingo)
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

Privacy policy is configurable per call or globally in `[spend] privacy_policy`:

| Policy | Behavior |
|--------|----------|
| `AllowRevealedRecipients` (default) | Permits sends to transparent recipients; reveals amount and recipient on-chain |
| `AllowRevealedAmounts` | Permits cross-pool sends (Sapling↔Orchard) but rejects transparent recipients |
| `FullPrivacy` | Only fully-shielded sends within one pool; rejects transparent recipients and cross-pool |
| `AllowFullyTransparent` | Also permits t→t sends funded from transparent UTXOs |

### Bitcoin Core RPC Compatibility

ZECD implements Bitcoin Core's JSON-RPC dialect with conformance across:

- Method names (e.g. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Field names and types in responses
- JSON-RPC 1.0 envelope structure
- Basic auth, `rpcauth` entries, and cookie file authentication
- Error codes and HTTP status mapping (HTTP 500 with error body, 401 semantics)

This means many existing Bitcoin payment libraries, exchange integrations, and monitoring tools can interact with Zcash via ZECD with little or no code changes.

The conformance suite (140+ checks) runs on every PR against a live regtest daemon and was also validated against the public testnet.

### Shielded Memos (ZIP-302)

ZECD exposes Zcash's shielded memo feature through the familiar Bitcoin RPC surface — something unavailable in standard Bitcoin tooling:

- `sendtoaddress` accepts an optional hex memo as an extra trailing parameter (up to 512 bytes; rejected for transparent recipients)
- Transaction history entries from `listtransactions` and `gettransaction` include `memo` (hex) and `memoStr` (decoded text) fields when an output carries one
- Zero-amount sends to a shielded recipient are supported for memo-only use cases (the `z_sendmany` "memo-only-send" pattern)

This makes ZECD suitable for applications that need private, on-chain messaging alongside payments.

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
- Health endpoint on port `9233` with configurable readiness probes (`synced` or `connected`)
- Structured JSON logging option for log aggregation pipelines
- ZIP-317 deterministic fees — no fee oracle or manual fee configuration
- `bootstrap_from_keys` (default on): an empty data directory next to `keys.toml` auto-rebuilds the wallet at startup — deploy by mounting one Secret and starting with an empty PVC

---

## Custody Models

ZECD supports three key-custody models, suited for different deployment and security requirements:

### 1. Unencrypted (Default — Auto-Unlock)

The seed mnemonic in `keys.toml` is wrapped to an **age identity file** (`identity.txt`). With the default `auto_unlock = true`, the seed is decrypted into memory at startup so sends are unattended and no `walletpassphrase` call is needed.

Best for: automated payment processors, exchange hot wallets, developer environments.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Store `identity.txt` **outside** the data directory on mainnet — anyone who reads both files has spend authority.

### 2. Encrypted (Passphrase-Protected)

The mnemonic is wrapped with a passphrase (age scrypt) instead of an identity file. The wallet starts locked; `walletpassphrase "<pass>" <timeout>` unlocks it for the given duration and auto-relocks at timeout — matching Bitcoin Core's encrypted wallet behavior.

Best for: hot wallets where unattended spend authority is not required; interactive operator workflows.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Watch-Only (UFVK — No Spend Key)

Initialized with a Unified Full Viewing Key (UFVK) exported from another wallet. Can receive, scan, and report balances — but cannot sign transactions. Ideal for monitoring, invoicing, or audit nodes separate from the signing wallet.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup and Recovery

Funds are recoverable from **the mnemonic alone**. Everything else is a cache.

| Artifact | Location | What it protects | Back up? |
|----------|----------|-----------------|----------|
| **24-word mnemonic** | Shown once at `zecd init` | The funds — loss = permanent loss | **Yes — offline (paper/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Encrypted seed + birthday + network | **Yes — as a Secret** |
| `identity.txt` | `[keys] age_identity` | Decrypts `keys.toml` (spend authority) | **Yes — separately from `keys.toml`** |
| Birthday height | Inside `keys.toml` | Makes restore fast (any height before first tx) | Record with mnemonic |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Wallet cache — rebuilt from seed on restore | No — disposable |
| `blocks/` | `<wallet dir>/blocks/` | Compact block cache | No — never ship; can grow large |
| `.cookie` | `<datadir>/.cookie` | Ephemeral RPC cookie | No — regenerated at startup |

> **The data directory must be host-local.** ZECD's single-instance lock (`<datadir>/.lock`) is an OS advisory lock — it does not span hosts. Never share a data directory read-write across machines (NFS, Kubernetes `ReadWriteMany`) — two ZECD instances would corrupt the wallet DB. Use `ReadWriteOnce` volumes in Kubernetes.

---

## RPC Method Safelist

For deployments where a credential leak would be catastrophic, ZECD supports restricting the RPC surface to a chosen subset of methods:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Any method not on the list returns `-32601` (HTTP 404) — indistinguishable from a method that doesn't exist, so a locked-down server discloses nothing about what it disabled. A receive-only invoicer can disable `sendtoaddress`, `sendmany`, and `stop` to minimize blast radius from a compromised client.

---

## Key Differences from Bitcoin Core RPC

Developers migrating from Bitcoin or zcashd tooling should be aware of these intentional divergences:

| Behavior | Bitcoin Core | ZECD |
|----------|-------------|------|
| Address format | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — not parseable as a Bitcoin address by string-parsing clients |
| Labels | Full label store | Not implemented — `setlabel`, `listlabels`, etc. return `-32601` |
| Fees | User-settable; fee market | ZIP-317 deterministic only; `settxfee`, `fee_rate`, `subtractfeefromamount` rejected with `-8` |
| Memos | Not supported | `sendtoaddress` accepts hex memo; history has `memo` + `memoStr` fields |
| Confirmations to spend | 1 | 3 (own change) / 10 (third-party) — configurable via `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` on reorg | Walks back to fork | Returns `-5` (Block not found) if cursor is reorged away — re-baseline with parameterless call |
| Duplicate recipients in `sendmany` | Error | JSON parser collapses duplicates (last wins) before ZECD sees them — don't list the same address twice |
| Balance during initial sync | Blocks or warm-up | Serves partial balance — gate automation on `GET /readyz` (returns 503 until fully synced and enhancement backlog is drained) |
| `minconf 0` in `getbalance` | 0-conf balance | Served as 1 — a shielded note is never spendable unmined |

---

## Quick Start

**Prerequisites:** Zebra running locally with `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Install from crates.io (0.4.3+):

```sh
cargo install zecd
```

Or build from source:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
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
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Restore from seed:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
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
| Status | Deprecated | Active | Active (v0.5.0-rc3, Jul 2026) |
| Default pool | Transparent | N/A | Orchard (shielded) |
| RPC dialect | zcashd-specific | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Requires full node | Yes (self) | Zebra or zcashd | Zebra |
| Stateless recovery | No | N/A | Yes (seed-only) |
| Shielded memos | Yes (`z_sendmany`) | N/A | Yes (Bitcoin RPC surface) |
| Watch-only (UFVK) | Yes | Yes | Yes |
| Cloud-native | No | Partial | Yes |
| Install | Build/binary | Build | `cargo install zecd` |

---

## Related Pages

- [Zebra Full Node](Zebra_Full_Node.md) — the full node ZECD connects to
- [Zaino Indexer](Zaino.md) — alternative indexer approach (replaces lightwalletd)
- [Zakura Node](Zakura_Node.md) — another full node implementation (fork of Zebra)
- [Viewing Keys](Viewing_Keys.md) — how ZECD scans the chain using account viewing keys
- [Wallets](/using-zcash/wallets) — wallet ecosystem overview

## Resources

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [ZECD Operations Runbook](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — core Zcash cryptography library](https://github.com/zcash/librustzcash)
- [ZIP-317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
- [ZIP-302: Shielded Memos](https://zips.z.cash/zip-0302)
- [Zodl wallet (librustzcash-compatible)](https://github.com/zodl-inc/zodl-ios)
