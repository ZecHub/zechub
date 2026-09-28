# Ztreamer

Ztreamer is a Rust indexer that prepares Zcash blockchain data for light wallets. It runs a [Zakura node](/zcash-tech/zakura-node) inside the same process as its indexer and wallet server, so operators do not need a separate full-node daemon.

This page follows the [v0.1.0 README](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/README.md) and [release notes](https://github.com/distractedm1nd/ztreamer/releases/tag/v0.1.0), rather than the earlier launch announcement.

## What it does

The daemon, `ztreamerd`, synchronizes its embedded node, builds a compact-block index, and serves the `CompactTxStreamer` API used by light wallets. It also makes that service available over Zakura's v2 peer-to-peer protocol, enabling wallets that support this transport to request data from peers.

The v0.1.0 release added `GetMempoolTx`, transparent scanning support and TLS for gRPC. The README says all lightwallet-protocol methods are implemented, with these qualifications:

- `GetBlock` leaves out transparent data.
- `GetBlockRange` accepts transparent filters, but those requests do not use the index. The project does not recommend transparent scanning as a use case.
- `Ping` is disabled by default. The release reserves `--ping-very-insecure` for explicitly enabling it in tests.

The README also reports support for 24 of the 27 JSON-RPC requests available in Zaino's direct mode. The missing requests are `getblockdeltas`, `getspentinfo` and `gettxoutsetinfo`.

## How it compares

| Software | Connection to the chain | Wallet-facing service |
|:--|:--|:--|
| [Ztreamer](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/README.md) | Embeds a Zakura node in the indexer process | Lightwallet-protocol over gRPC and v2 peer-to-peer transport, with the qualifications above |
| [Zaino](https://github.com/zingolabs/zaino#readme) | Rust indexer using chain data from a Zebra validator | Lightwallet-compatible gRPC plus JSON-RPC for wallets, explorers and other clients |
| [lightwalletd](https://github.com/zcash/lightwalletd#readme) | Separate Go service that queries a full node over JSON-RPC; its current setup guide uses Zebra | The original compact-block service for light wallets |
| [Zinder](https://github.com/ZcashFoundation/zinder#readme) | Indexes data from Zebra, with separate ingest, projection and query services | Native `WalletQuery` and a separate `zinder-compat-lightwalletd` adapter for existing lightwallet-protocol clients |

Ztreamer's embedded node reduces the number of processes to manage. Zinder focuses on sharing a consistent view of chain data among several consumers; its README labels it alpha and distinguishes protocol compatibility from tested support for a particular wallet release. Check your wallet's requirements before changing its backend.

## How to run it

Install a current [Rust toolchain](https://www.rust-lang.org/tools/install) and the [Protocol Buffers compiler](https://protobuf.dev/installation/). The project's [build environment](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/flake.nix) also includes Git, CMake, pkg-config and Clang/libclang for native dependencies.

Install the documented release with its locked dependencies:

```bash
cargo install --git https://github.com/distractedm1nd/ztreamer --tag v0.1.0 --locked ztreamerd
```

Create `zakura.toml` in your working directory. This mainnet example uses a separate chain-state directory and archive storage, following the project's [configuration example](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/scripts/benchmark-zaino-rpc.sh):

```toml
[network]
network = "Mainnet"

[state]
cache_dir = "./zakura-state"
storage_mode = "archive"
```

Start the daemon from that directory:

```bash
ztreamerd --zakura-config zakura.toml
```

The [daemon defaults](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/bin/ztreamerd/src/main.rs) keep gRPC on `127.0.0.1:9067`, metrics on `127.0.0.1:9999`, and the compact index in `./ztreamer-index`. Allow space for both the node's chain state and the index. The gRPC server starts after the node approaches the chain tip and historical indexing finishes; the README's indexing benchmark is not a fresh blockchain download time.

For remote clients, configure gRPC TLS with your own PEM certificate chain and matching private key:

```bash
ztreamerd --zakura-config zakura.toml \
  --grpc-listen 0.0.0.0:9067 \
  --tls-cert /path/to/fullchain.pem \
  --tls-key /path/to/privkey.pem
```

Without these flags, gRPC is plaintext. Replace both certificate paths before running the command, and restart after certificate changes. These TLS options do not protect the metrics listener; keep it private or secure it through a reverse proxy.

## Related Pages

- [Zcash Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
- [Zaino](/zcash-tech/zaino)
- [Zakura Node](/zcash-tech/zakura-node)

**Last updated:** September 2026
