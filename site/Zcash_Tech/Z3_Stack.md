<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

The **Z3 Stack** is the Zcash Foundation’s packaged node platform: **Zebra** (full node) + **Zallet** (full-node wallet), with an optional **Zaino** indexer. It is the intended replacement for a standalone `zcashd` process, which bundled consensus and a wallet in one binary and reached end of life on 18 July 2026.

The reference implementation is the Docker Compose project at [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## TL;DR

* Z3 is **not a new consensus client**. It is how you run the post-`zcashd` stack together: Zebra validates the chain, Zallet holds keys and serves wallet RPC, and Zaino (optional) speaks the lightwalletd gRPC protocol.
* `zcashd` bundled node + wallet. Z3 **splits those roles**. Exchanges, mining pools, and other full-node wallet operators migrate to this combination rather than to Zebra alone.
* Three isolated Compose projects can run on one host: **mainnet**, **testnet**, and **regtest**.
* Mainnet first sync is on the order of **24–72 hours** and about **300 GB**. Regtest comes up in seconds and is the right place to learn the stack.
* Zallet embeds Zaino’s indexer libraries and talks to Zebra over JSON-RPC. The standalone Zaino service is only needed if you want a lightwalletd-compatible endpoint for external wallets.
* Zallet is in **beta**. Breaking changes can require deleting and recreating the wallet. Do not treat it as finished custody software for large sums.

---

## Why Z3 exists

For most of Zcash’s life, `zcashd` was both the reference full node and the only production full-node wallet. That design is what exchanges, pools, and custodians integrated against.

`zcashd` is retired. Consensus moved to [Zebra](/zcash-tech/zebra-full-node) (and now also [Zakura](/zcash-tech/zakura-node)). The embedded wallet moved to [Zallet](https://github.com/zcash/zallet). Light-wallet serving is moving from [lightwalletd](/zcash-tech/lightwallet-nodes) to [Zaino](/zcash-tech/zaino).

Those three pieces are separate repositories, separate release trains, and separate configs. Z3 is the glue: pinned images, health checks that keep the wallet down until the node is synced, per-network ports and volumes, and a documented operator path.

The name is informal ecosystem shorthand — Zebra, Zaino, Zallet — even though the default Compose file only starts Zebra and Zallet. Zaino is a Compose profile, not a required third process.

---

## Architecture

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Component | Role in Z3 | Required? |
| --- | --- | --- |
| **Zebra** | Syncs and validates the chain, gossip, JSON-RPC, health endpoint | Yes |
| **Zallet** | Full-node wallet. Embeds Zaino libraries. Connects straight to Zebra JSON-RPC. Does **not** call the standalone Zaino container | Yes |
| **Zaino** | Standalone indexer. lightwalletd-compatible gRPC for external light clients, plus a JSON-RPC proxy for explorers and faucets | No — `--profile indexer` |

Z3 pins image versions in `docker-compose.yml`. Override with `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE`, or `Z3_ZALLET_IMAGE` if you need a different tag.

---

## How this differs from zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Language | C++ (Bitcoin fork) | Rust services, orchestrated with Docker Compose |
| Process model | One binary: node + wallet | Separate node and wallet containers |
| Consensus | Retired (EOS 18 July 2026) | Zebra (or another compatible node) |
| Wallet | Built-in `wallet.dat` | Zallet, age-encrypted datadir |
| Light clients | Usually a separate lightwalletd | Optional Zaino profile |
| Config | `zcash.conf` | Per-network files under `config/<network>/` plus Compose env files |
| Networks on one host | Painful port clashes | First-class: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

If you still have a `zcashd` wallet, use ZecHub’s [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) and Zallet’s `migrate-zcashd-wallet` command rather than copying `wallet.dat` into the Z3 volume.

---

## Networks

Z3 is three independent Compose projects. They do not share ports or volumes.

| Network | Project name | Use it for | First sync | Real funds |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Production | 24–72 hours | Yes |
| **testnet** | `z3-testnet` | Staging on the public test network | 2–12 hours | No (test ZEC) |
| **regtest** | `z3-regtest` | Local practice: instant blocks, no peers | Seconds | No |

New operators should start on **regtest**, confirm RPC and wallet flows, then move to testnet or mainnet.

---

## Default host ports

All three networks are meant to coexist on one machine. Values below are the published defaults; every one is overridable via the matching `Z3_*` env var. The canonical matrix is [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Service | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (not published) |
| Zebra health (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (indexer profile) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (indexer profile) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Inside the Compose network, services resolve by name (`zebra`, `zaino`, `zallet`).

---

## Data and backups

| Volume | What it holds | Back it up? |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra chain state (~300 GB mainnet) | Optional — re-syncable |
| `z3-<network>-zallet` | Encrypted wallet database **and** the age identity that unlocks it | **Yes — this is the only volume that must be backed up** |
| `z3-<network>-zaino` | Indexer state (only with the indexer profile) | Optional — rebuildable |
| `z3-<network>-cookie` | Zebra RPC cookie | No — regenerated |

To put chain state on another disk before first start:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` stops the stack and keeps volumes. Adding `-v` deletes them and forces a full re-sync. Include `--profile "*"` so profile-gated services (indexer, monitoring) are actually torn down.

---

## Getting started

Prerequisites: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` is required only for regtest.

### Regtest (fastest way to see the stack)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

See [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) for test commands.

### Mainnet (two-phase boot)

Zebra must finish syncing before Zallet is useful. Starting Zallet early makes it restart-loop until `/ready` is true.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Testnet is the same flow with `.env.testnet` and `./scripts/check-zebra-readiness.sh 18080`.

Edits under `config/<network>/` stay local and survive `git pull`.

### Optional profiles

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Default Grafana ports are 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Operator notes

* **Pinned images.** Z3 does not silently float onto `:latest`. Bump a pin in a reviewed change, or set `Z3_<SERVICE>_IMAGE`.
* **Non-root containers.** Linux capabilities are dropped. Health checks hold the wallet back until Zebra is ready. Restart policy is on by default.
* **Logs.** Z3 does not pin a logging driver. Set size limits in the Docker daemon config or logs grow without bound on a 24/7 node.
* **P2P.** Mainnet and testnet publish Zebra’s P2P port. Behind NAT, set `ZEBRA_NETWORK__EXTERNAL_ADDR` to the address peers should dial. Regtest has no peers.
* **Zaino on ARM.** The upstream Zaino image is `linux/amd64` only. On Apple Silicon it runs under emulation unless you build from source. Zebra and Zallet are multi-arch.
* **Shared hosts.** No CPU or memory limits are set by default. Add `deploy.resources.limits` in an override file if the box is not dedicated to the node.

Production-shaped checklist and FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Who should run Z3

**Good fit**

* Exchanges, custodians, and mining pools that used `zcashd` as a node-plus-wallet
* Operators who want a supported full-node wallet RPC against a synced Zebra
* Developers who need mainnet, testnet, and regtest side by side
* Anyone standing up a private lightwalletd-compatible endpoint via the Zaino profile

**Usually the wrong tool**

* End users who only need to send and receive ZEC — use a light wallet such as ZODL / Zashi, Zingo, or YWallet
* People who only want to validate the chain — run Zebra (or Zakura) alone
* People who only want to serve compact blocks — run Zebra + Zaino, or Zebra + lightwalletd, without Zallet

---

## Related pages

* [Zebra Full Node](/zcash-tech/zebra-full-node) — consensus node Z3 wraps
* [Zaino](/zcash-tech/zaino) — optional indexer profile
* [Full Nodes](/zcash-tech/full-nodes) — Zebra, Zakura, and the retired zcashd
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — what light clients talk to
* [Zakura Node](/zcash-tech/zakura-node) — alternative full node; not what Z3 ships today
* [Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Developer Resources](/start-here/developer-resources)

---

## Resources

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 contract (ports, volumes, project names)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [The Zebra Book](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [The Zallet Book](https://zcash.github.io/zallet/)
* [Zcash Community Forum — Z3 updates](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — community control plane over the official Compose stack (ZecHub Hackathon)

