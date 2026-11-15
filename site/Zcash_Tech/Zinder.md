# Zinder Indexer

Zinder is a self-hosted Zcash indexer written in Rust and published by the Zcash Foundation. It reads the chain once from a Zebra or Zakura full node, stores one consistent view of it, and serves that view to several wallets, applications and explorers at the same time. Existing light wallets can reach it through a lightwalletd-compatible adapter.

> **Zinder is alpha.** Its own README says the native API, the lightwalletd compatibility surface, storage layouts and deployment topology will change, and that a tagged release is not a stability promise. Pin exact versions and expect breaking upgrades.

## TL;DR

* **Zebra** or **Zakura** validates the chain. **Zinder** indexes what the node has and serves it to clients.
* Two ways in: Zinder's own `WalletQuery` gRPC API, and a separate adapter that speaks lightwalletd's `CompactTxStreamer` protocol, so wallets built for lightwalletd can point at it without code changes.
* Every read is pinned to one chain state (an "epoch"), so a sync batch never mixes data from two competing chain tips. Keys and shielded scanning stay in the wallet.
* It is built for one operator running one node and serving many consumers. Public endpoints go behind your own TLS, authentication and rate limits.
* Releases come fast (0.7.0 to 0.12.0 between November 10 and 14, 2026) and several of them were breaking. Read the changelog before every upgrade.

## Where Zinder fits

Light wallets never talk to a full node directly. They ask an indexer for compact blocks, tree states and transaction data (see [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)). The Zcash ecosystem now has several indexers that can do this:

| Indexer | Language | Maintainer | Talks to | Notes |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / Zcash community | Zebra or zcashd | The original light wallet server |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra or zcashd | Optional indexer profile in the Z3 stack |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Embedded Zakura node | See the [Zaino vs Ztreamer benchmark](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 or Zakura 1.8.6 (archive node) | Alpha. Native API plus a lightwalletd adapter and optional explorer reads |

Zinder's documentation is direct about when it is the right choice: it is strongest when chain access should outlive one wallet process, serve several independent consumers, or stay separate from any one wallet's code. For a single tightly coupled wallet an embedded indexer can be simpler, and a consumer that only needs data the node already owns can use Zebra's RPC directly.

## How it is built

Zinder splits the work into separate processes, each with one job:

| Runtime | Role |
|:--|:--|
| `zinder-ingest` | The only writer to the canonical chain store (RocksDB). Follows the node, handles reorgs, keeps live mempool state |
| `zinder-projector` | The only writer to the wallet store. Builds and follows the wallet-shaped view of the chain |
| `zinder-query` | Serves the native `WalletQuery` gRPC API |
| `zinder-compat-lightwalletd` | Serves lightwalletd's `CompactTxStreamer` API on top of the same data |

An optional explorer plane (`zinder-explorer` with `ExplorerQuery`) serves block summaries, transaction details, mempool views and search, and an optional adapter serves the CipherScan explorer's REST and WebSocket API. Neither is part of the release images.

Every runtime exposes `/healthz`, `/readyz` and `/metrics`. The readers only report ready once their copies of the chain store and wallet store point at exactly the same chain state.

## Ways to connect

* **Existing light wallets** keep their lightwalletd integration and point it at `zinder-compat-lightwalletd`. Zinder's docs separate protocol compatibility from support: a named wallet counts as supported only after its current release passes end-to-end certification. Release 0.10.0 fixed the `GetLightdInfo` protocol version field so that Zingo can sync.
* **Native clients** call `zinder-query` for pinned reads, compact blocks, chain and mempool event streams, and broadcast results with typed rejection reasons.
* **Rust applications** use the `zinder-client` crate, a remote-first SDK that connects to `zinder-query` without linking the storage stack.
* **Explorers and backends** combine the wallet reads with the optional `ExplorerQuery` plane.

## Running it

The upstream quickstart starts a node with the [Z3 stack](/zcash-tech/z3-stack) and then Zinder with Docker Compose from the Zinder checkout:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Env files for Mainnet and for a Zakura node (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) sit beside it. Since 0.11.0 the Compose file no longer assumes Z3: the env file must name the node's network, cookie volume and RPC address.

Default host ports (Testnet adds 10000):

| Service | Mainnet | Testnet |
|:--|:--|:--|
| Native `WalletQuery` gRPC | 9102 | 19102 |
| lightwalletd-compatible gRPC | 9067 | 19067 |
| Readiness: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Both wallet ports bind to loopback. Check them with:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Other ways to deploy:

* **Release images** on `ghcr.io/zcashfoundation/`: the four runtimes, plus `zinder-wallet-serving` (ingest, projector and native query in one container for hosts that can attach one volume to one container; no lightwalletd adapter) and `zinder-canonical-runtime` (ingest only).
* **Linux binaries** for x86-64 (needs an x86-64-v3 CPU) and AArch64, with glibc 2.34 or newer. Debian 12 is the certified baseline. Each release ships an SBOM and signed SLSA provenance.

### What the node must provide

* An **archive node**. Since 0.11.0, `zinder-ingest` refuses to start against a pruned node.
* Zebra **7.0.0** or Zakura **1.8.6**. These are the two node versions the release lanes certify.
* For the `zinder-wallet-serving` image, the node's **indexer gRPC endpoint** (`ZINDER_NODE__INDEXER_GRPC_ADDR`, Zebra's `indexer_listen_addr`, port 8155 on Mainnet). A Zakura indexer on a non-loopback address requires mutual TLS, which Zinder supports since 0.11.0.

### Mainnet sizing

From the wallet-serving runbook:

* At least **8 GB of memory**. Measured peaks: ingest about 2.6 GiB, projector about 2.7 GiB while building, query up to about 1.4 GiB.
* Keep about **130 GB free** on the volume when the Mainnet wallet store is built.
* One measured Mainnet build from genesis took about **four hours** for the chain store (staging near 310 GB) and **more than two hours** for the wallet store. The shipped construction deadlines fit Testnet only: raise them to at least 24 h and 12 h for Mainnet, or the build restarts and never finishes.

## Release notes worth knowing

| Version | Date | What changed for operators |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Default reorg window raised to 1000 blocks, the depth at which Zebra 7 and Zakura finalize blocks. Irreversible: older releases can't open the raised stores |
| 0.9.0 | 2026-11-12 | New `zinder-wallet-serving` and `zinder-canonical-runtime` images |
| 0.10.0 | 2026-11-13 | **First release that decodes NU7 blocks.** 0.9.0 and earlier stop at the first NU7 block. Native protocol revision 8: upgrade ingest and query together, and native clients with them |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 certified next to Zebra 7.0.0; mutual TLS to the node's indexer; pruned nodes refused. 0.11.0 shipped only as crates, so deploy 0.11.1 |
| 0.12.0 | 2026-11-14 | Readiness and shutdown fixes; explorer replay faster and pauses when the disk runs low |

## Common Mistakes

**Treating it as production software.** The project calls itself alpha. A green local Compose deployment is, in its own words, "not by itself production certification".

**Pointing it at a pruned node.** Ingest exits at startup. Use an archive Zebra or Zakura node.

**Exposing the gRPC ports directly.** Both wallet ports bind to loopback for a reason. Put TLS, authentication, rate limits and quotas in a proxy you control before you open them to the internet.

**Upgrading one runtime at a time.** Several releases change the native protocol revision or the store format. Upgrade the Zinder services together, and update native clients in the same cut-over.

**Assuming a wallet is supported because the protocol is.** The lightwalletd adapter speaks the protocol, but Zinder only claims support for a named wallet after that wallet's current release has been certified end to end.

## Related pages

* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — what a light wallet server does and what it can see
* [Zaino](/zcash-tech/zaino) — Zingo Labs' Rust indexer
* [Indexer Benchmark: Zaino vs Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3 Stack](/zcash-tech/z3-stack) — Zebra + Zallet, the node setup the Zinder quickstart uses
* [Zebra Full Node](/zcash-tech/zebra-full-node) and [Zakura Node](/zcash-tech/zakura-node) — the two nodes Zinder certifies

## Where can I learn more?

* [Zinder GitHub repository](https://github.com/ZcashFoundation/zinder)
* [Zinder releases](https://github.com/ZcashFoundation/zinder/releases) and [changelog](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [What Zinder is and is not](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [Deploying on a VM](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) and [wallet-serving image](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md) runbooks

**Last updated:** November 2026
