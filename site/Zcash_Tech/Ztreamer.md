# Ztreamer

Ztreamer is a Rust indexer that serves Zcash blockchain data to light wallets. It runs a [Zakura node](/zcash-tech/zakura-node), an indexer and a wallet server in one process, called `ztreamerd`. You don't need to run a separate full node alongside it.

This guide covers [v0.1.0](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/README.md).

## What it does

Ztreamer syncs its node, builds an index of compact blocks, then serves the `CompactTxStreamer` API that light wallets use. Wallets can connect over gRPC. Those that support Zakura's v2 peer-to-peer protocol can also request this data from peers.

The [v0.1.0 release](https://github.com/distractedm1nd/ztreamer/releases/tag/v0.1.0) added `GetMempoolTx`, transparent scanning support and TLS for gRPC. The README lists all lightwallet-protocol methods as implemented, but there are a few limits:

- `GetBlock` leaves out transparent data.
- `GetBlockRange` accepts transparent filters, but those requests don't use the index. The project doesn't recommend using it for transparent scanning.
- `Ping` is off by default. The `--ping-very-insecure` flag enables it for testing.

The README reports support for 24 of the 27 JSON-RPC requests available in Zaino's direct mode. It doesn't yet support `getblockdeltas`, `getspentinfo` or `gettxoutsetinfo`.

## How it compares

| Software | Where it gets chain data | What it serves |
|:--|:--|:--|
| [Ztreamer](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/README.md) | A Zakura node running inside the same process | Lightwallet-protocol over gRPC and Zakura v2 peer-to-peer connections |
| [Zaino](https://github.com/zingolabs/zaino#readme) | A Zebra validator | Lightwallet-compatible gRPC and JSON-RPC for wallets, explorers and other clients |
| [lightwalletd](https://github.com/zcash/lightwalletd#readme) | A separate full node over JSON-RPC; its setup guide uses Zebra | The original Go service for sending compact blocks to light wallets |
| [Zinder](https://github.com/ZcashFoundation/zinder#readme) | Zebra, with separate services to ingest, prepare and query the data | Native `WalletQuery` plus a `zinder-compat-lightwalletd` adapter for lightwallet-protocol clients |

Ztreamer keeps the node and indexer together, giving you fewer processes to manage. Zinder separates those jobs so several wallets or applications can share a consistent view of the chain. Zinder is still alpha, and protocol compatibility doesn't guarantee support for every wallet release.

## How to run it

You'll need a current [Rust toolchain](https://www.rust-lang.org/tools/install) and the [Protocol Buffers compiler](https://protobuf.dev/installation/). The project's [build environment](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/flake.nix) also uses Git, CMake, pkg-config and Clang/libclang.

Install v0.1.0 with the dependency versions recorded for that release:

```bash
cargo install --git https://github.com/distractedm1nd/ztreamer --tag v0.1.0 --locked ztreamerd
```

Create a file named `zakura.toml` in your working directory. This example selects mainnet and stores the chain data in `./zakura-state`, using the archive setting from the project's [configuration example](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/scripts/benchmark-zaino-rpc.sh):

```toml
[network]
network = "Mainnet"

[state]
cache_dir = "./zakura-state"
storage_mode = "archive"
```

Start Ztreamer from the same directory:

```bash
ztreamerd --zakura-config zakura.toml
```

By [default](https://github.com/distractedm1nd/ztreamer/blob/v0.1.0/bin/ztreamerd/src/main.rs), gRPC listens on `127.0.0.1:9067`, metrics on `127.0.0.1:9999`, and the compact index is saved in `./ztreamer-index`. You'll need disk space for both the chain data and this index. The gRPC server starts once the node is close to the chain tip and historical indexing has finished.

To serve remote wallets over TLS, provide a PEM certificate chain and its matching private key:

```bash
ztreamerd --zakura-config zakura.toml \
  --grpc-listen 0.0.0.0:9067 \
  --tls-cert /path/to/fullchain.pem \
  --tls-key /path/to/privkey.pem
```

Replace both paths with your certificate and key files. Without these flags, gRPC is unencrypted. Restart Ztreamer when you change the certificate. The TLS settings apply only to gRPC, so keep metrics private or protect them with a reverse proxy.

## Related Pages

- [Zcash Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
- [Zaino](/zcash-tech/zaino)
- [Zakura Node](/zcash-tech/zakura-node)

**Last updated:** September 2026
