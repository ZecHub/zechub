<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ztreamer.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ztreamer

Ztreamer is a Zcash indexer and light wallet server written in Rust. Its distinguishing design choice is that the full node lives inside the same process: instead of talking to a separate node over RPC, Ztreamer embeds a [Zakura](/zcash-tech/zakura-node) node in-process and serves wallet clients directly from it.

The project is by distractedm1nd at [github.com/distractedm1nd/ztreamer](https://github.com/distractedm1nd/ztreamer). It was announced on 2 September 2026 (the [v0.0.1 release](https://github.com/distractedm1nd/ztreamer/releases/tag/v0.0.1)) and released v0.1.0 on 12 September 2026. Note that the launch announcement is already out of date — the v0.1.0 README changed several things it describes, so the README is the source of truth and everything below is drawn from it.

## TL;DR

* One daemon (`ztreamerd`) does everything: it runs an embedded Zakura full node, builds a local index, and serves the `lightwallet-protocol` gRPC API that light wallets speak.
* It also serves `CompactTxStreamer` over v2 p2p, which enables p2p light wallets — wallets that sync from peers rather than from a single server.
* All `lightwallet-protocol` methods are implemented, with two deliberate deviations: `GetBlock` excludes transparent data (current wallets do not request it), and `GetBlockRange` accepts transparent filters but does not serve them from the index, since transparent scanning is not a recommended use case.
* It is benchmark-driven: the author publishes a *historical indexing* benchmark — mainnet from genesis to serving in 92 seconds on the benchmark machine (M3 Ultra, 512 GiB RAM, warm cache). That is indexing speed, not a full network sync.

## What Ztreamer does

A light wallet needs a server that has already synced the chain and can hand it compact blocks, relay its transactions, and answer chain queries. (See [Zcash Lightwallet Nodes](/zcash-tech/lightwallet-nodes) for the full picture.)

Most light wallet servers are a separate process that follows a full node. Ztreamer collapses the two: the Zakura node runs embedded in the same Rust process as the indexer and the gRPC server. There is no second daemon to configure and no RPC connection between node and indexer to secure. It is one process, though the embedded Zakura node keeps its own chain state alongside the ~16 GiB index.

On top of the standard light wallet protocol, Ztreamer adds a `CompactTxStreamer` server over v2 p2p. In practice this enables p2p light wallets: wallets fetching compact blocks peer-to-peer rather than only from a central server operator.

## How it compares

| | lightwalletd | Zaino | Zinder | Ztreamer |
|:--|:--|:--|:--|:--|
| What | The original light wallet server | Rust indexer built to replace lightwalletd | Zcash Foundation service-oriented indexer | Rust indexer and light wallet server |
| Node relationship | Separate process; talks to zcashd, Zebra, or Zakura over JSON-RPC | Separate process; reads from Zebra | Separate services over its own RocksDB projections | Zakura node embedded in-process — no separate node to run |
| Light wallet protocol | Reference implementation | Compatible gRPC endpoint | Compatibility plane (`zinder-compat-lightwalletd` adapter) | All methods implemented, two documented deviations |
| Extra | — | JSON-RPC proxy for explorers and services | Ingest / projector / query split | `CompactTxStreamer` over v2 p2p for p2p light wallets |
| Maturity | Oldest; v0.5.4 (Aug 2026) | v0.10.0 (Sep 2026) | Alpha; 2026 | Newest; v0.1.0 (Sep 2026) |

One note on reading this table: Ztreamer documents its JSON-RPC coverage against Zaino's direct mode — it serves 24 of the 27 requests Zaino direct mode provides (`getblockdeltas`, `getspentinfo`, and `gettxoutsetinfo` are not yet implemented). That is a compatibility statement; check each project's own docs before deploying anything.

## How to run it

From the [project README](https://github.com/distractedm1nd/ztreamer) (v0.1.0):

Install Protocol Buffers, then install the daemon:

```console
cargo install --git https://github.com/distractedm1nd/ztreamer --tag v0.1.0 --locked ztreamerd
```

Run it with a Zakura config file:

```console
ztreamerd --zakura-config zakura.toml
```

The gRPC listener is plaintext by default. To serve it over TLS, pass a PEM certificate chain and matching private key together:

```console
ztreamerd --zakura-config zakura.toml \
  --grpc-listen 0.0.0.0:9067 \
  --tls-cert /etc/letsencrypt/live/ztreamer.example/fullchain.pem \
  --tls-key /etc/letsencrypt/live/ztreamer.example/privkey.pem
```

Two operational notes from the README: certificate changes require a restart, and the Prometheus metrics listener is not covered by the TLS options — keep it private or put it behind a reverse proxy.

## Benchmarks

The README publishes a historical indexing benchmark: mainnet from genesis to height 3,459,912 indexed in 92 seconds (37,848 blocks/second), a 16 GiB index, and 3.66 GiB peak memory — measured on an M3 Ultra with 512 GiB RAM and a warm cache. A `scripts/benchmark-serving.sh` script in the repo measures serving latencies and wallet sync against a running server; the repo's benchmark guide documents the workloads and method.

## Related Pages

- [Zcash Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — the servers light wallets talk to, and what they can see.
- [Zaino](/zcash-tech/zaino) — the Rust indexer Ztreamer measures its JSON-RPC coverage against.
- [Zakura Node](/zcash-tech/zakura-node) — the full node Ztreamer embeds.

**Last updated:** September 2026
