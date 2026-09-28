# Ztreamer

Ztreamer is a Rust indexer that serves Zcash blockchain data to light wallets. It runs a [Zakura node](/zcash-tech/zakura-node), an indexer and a wallet server in one process, called `ztreamerd`. You don't need a separate full-node daemon alongside it.

A light wallet asks for compact blocks instead of downloading the whole blockchain. Ztreamer prepares and serves those blocks, answers chain queries and relays transactions. Your wallet still keeps its keys and does the work of finding and spending your shielded funds. The [Lightwallet Nodes guide](/zcash-tech/lightwallet-nodes) explains that division of work and what a server can learn from your connection.

> This guide covers [v0.1.0](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/README.md), released on 12 September 2026. The commands below are pinned to that release.

[How it compares](#how-it-compares) · [Protocol support](#protocol-support) · [Setup](#how-to-run-it) · [Troubleshooting](#if-something-goes-wrong)

## How it works

When you start Ztreamer, its embedded Zakura node catches up with the network. Ztreamer then builds a local index of compact blocks and starts serving wallets. The node continues following the chain while the indexer keeps the wallet data current.

Wallets can use the `CompactTxStreamer` API over gRPC. Ztreamer also serves this API over Zakura's v2 peer-to-peer protocol. A wallet needs to support that transport to use it; changing a server address alone doesn't add peer-to-peer support to an existing wallet.

Running the node and indexer together means fewer processes to configure. It still requires the storage and initial sync of a full node, plus space for Ztreamer's own index.

## How it compares

| Software | Where it gets chain data | What it serves |
|:--|:--|:--|
| [Ztreamer](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/README.md) | A Zakura node inside the same process | Lightwallet-protocol over gRPC and Zakura v2 peer-to-peer connections |
| [Zaino](https://github.com/zingolabs/zaino#readme) | A Zebra validator | Lightwallet-compatible gRPC and JSON-RPC for wallets, explorers and other clients |
| [lightwalletd](https://github.com/zcash/lightwalletd#readme) | A separate full node over JSON-RPC; its setup guide uses Zebra | The original Go service for sending compact blocks to light wallets |
| [Zinder](https://github.com/ZcashFoundation/zinder#readme) | Zebra, with separate services to ingest, prepare and query data | Native WalletQuery plus a lightwalletd compatibility adapter |

Ztreamer keeps the node and indexer in one program. Zaino and lightwalletd work alongside a separate validator. Zinder divides indexing and serving among several services so multiple wallets or applications can share a consistent view of the chain.

Zinder is still alpha. Its documentation distinguishes protocol compatibility from tested support for a particular wallet release. Check the APIs your wallet needs before choosing a backend.

## Protocol support

The [v0.1.0 release](https://github.com/distractedm1nd/ztreamer/releases/tag/v0.1.0) added `GetMempoolTx`, transparent scanning support and TLS for gRPC. The README lists all lightwallet-protocol methods as implemented, with a few limits:

- `GetBlock` leaves out transparent data.
- `GetBlockRange` accepts transparent filters, but those requests don't use the index. The project doesn't recommend using it for transparent scanning.
- `Ping` is off by default. The `--ping-very-insecure` flag enables it for testing.

The README reports support for 24 of the 27 JSON-RPC requests available in Zaino's direct mode. It doesn't yet support `getblockdeltas`, `getspentinfo` or `gettxoutsetinfo`. The release also limits active block-range streams to 16 to improve completion times under heavy load.

## How to run it

### 1. Install the build tools and daemon

You'll need a current [Rust toolchain](https://www.rust-lang.org/tools/install) and the [Protocol Buffers compiler](https://protobuf.dev/installation/). The project's [build environment](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/flake.nix) also uses Git, CMake, pkg-config and Clang/libclang. The v0.1.0 release provides source archives, with no prebuilt binaries attached.

Check that Cargo and the Protocol Buffers compiler are available:

```bash
cargo --version
protoc --version
```

Install v0.1.0 with the dependency versions recorded for that release:

```bash
cargo install --git https://github.com/distractedm1nd/ztreamer \
  --tag v0.1.0 --locked ztreamerd
```

### 2. Create a mainnet configuration

Create a file named `zakura.toml` in your working directory. This example selects mainnet and stores chain data in `./zakura-state`, using the archive setting from the project's [configuration example](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/scripts/benchmark-zaino-rpc.sh):

```toml
[network]
network = "Mainnet"

[state]
cache_dir = "./zakura-state"
storage_mode = "archive"
```

Use a directory with room for the chain data and compact index. These are separate stores. Relative paths are resolved from the directory where you start the command, so use the same working directory on later runs or choose absolute paths.

### 3. Start the service

```bash
ztreamerd --zakura-config zakura.toml
```

The [daemon defaults](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/bin/ztreamerd/src/main.rs) are:

| Setting | Default | Purpose |
|:--|:--|:--|
| gRPC listener | `127.0.0.1:9067` | Wallet connections on this machine |
| Metrics listener | `127.0.0.1:9999` | Prometheus monitoring on this machine |
| Compact index | `./ztreamer-index` | Ztreamer's indexed wallet data |

On the first run, allow time for the node to sync and the historical index to build. The logs report `waiting for Zakura to sync near the chain tip`, then `syncing historical compact index`. The message `serving CompactTxStreamer gRPC` tells you the wallet listener has started. These messages and the startup order come from the tagged daemon source.

Keep the process running while wallets use it. To stop it from the terminal, press Ctrl+C and let it finish shutting down. The [shutdown handler](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/bin/ztreamerd/src/lifecycle.rs) also handles SIGTERM and waits for cleanup.

### 4. Use TLS for remote wallets

The default gRPC listener is local and unencrypted. To accept remote connections over TLS, provide a PEM certificate chain and its matching private key:

```bash
ztreamerd --zakura-config zakura.toml \
  --grpc-listen 0.0.0.0:9067 \
  --tls-cert /path/to/fullchain.pem \
  --tls-key /path/to/privkey.pem
```

Replace both paths with your own files. Use a hostname covered by the certificate when configuring a wallet. `0.0.0.0` is the server's bind address, not an address to enter in a wallet.

Both TLS flags are required together. Restart Ztreamer after replacing a certificate. These settings only protect gRPC; keep metrics private or protect them through a reverse proxy. TLS encrypts the connection, but it doesn't hide a client's IP address from the server.

## If something goes wrong

| Symptom | What to check |
|:--|:--|
| The build cannot find `protoc` | Install the Protocol Buffers compiler and confirm `protoc --version` works in the same terminal. |
| The configuration cannot be loaded | Check the path passed to `--zakura-config` and the TOML syntax. The named file must exist. |
| A wallet cannot connect yet | Check whether the node is still syncing or the historical index is still building. The gRPC listener starts afterward. |
| Another machine cannot connect | The default listener accepts local connections only. Check the bind address, firewall and TLS hostname before changing wallet settings. |
| TLS fails at startup | Supply both flags, check that both files are readable, and use a certificate chain with its matching private key. |

Run `ztreamerd --help` to see the available flags, including `--index-dir` and `--metrics-listen` if the defaults don't suit your setup.

## Reading the benchmark numbers

The README reports a 92-second historical index build through mainnet height 3,459,912, with a 16 GiB index and 3.66 GiB peak physical memory. That run used an M3 Ultra with 512 GiB RAM and a warm cache. It measures indexing existing chain data, not downloading and validating the blockchain from scratch. Those figures are measurements from that run, not minimum hardware requirements.

The [serving benchmark guide](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/benchmarks/README.md) explains how to measure RPC latency, concurrent requests and compact-block downloads against a running server. Its wallet-sync workload measures block downloads, not the wallet's decryption, scanning or storage work.

## Further reading

- [Ztreamer README](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/README.md) and [v0.1.0 release notes](https://github.com/distractedm1nd/ztreamer/releases/tag/v0.1.0)
- [Zcash Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
- [Zaino](/zcash-tech/zaino)
- [Zakura Node](/zcash-tech/zakura-node)

**Last updated:** September 2026
