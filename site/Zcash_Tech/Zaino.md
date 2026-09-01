# Zaino Indexer

Zaino is a Rust indexer for the Zcash blockchain. It reads chain data from a Zebra full node and serves the data that wallets, explorers, faucets, and other services need without making Zebra itself responsible for every client-facing index.

## TL;DR

* **Zebra** validates the Zcash chain.
* **Zaino** indexes Zebra's chain data and exposes client-facing APIs.
* **Zallet** is the wallet component in the Z3 stack. In the default Z3 setup, Zallet talks to Zebra directly and does not require the standalone Zaino service.
* The standalone Zaino service is useful when operators need a lightwalletd-compatible gRPC endpoint, a JSON-RPC proxy, or infrastructure for light wallets, explorers, faucets, and similar services.
* Zaino is active infrastructure, but operators should check the official Zaino and Z3 documentation for current deployment details before running it in production.

## What Zaino Does

Zaino sits between Zebra and client software. Zebra is the consensus node: it downloads, verifies, and follows the Zcash blockchain. Zaino uses Zebra as its source of chain data, then prepares indexed views that client applications can query efficiently.

This separation keeps the roles clear:

| Component | Role |
|:--|:--|
| Zebra | Full node and validator |
| Zaino | Indexer and client-facing API service |
| Zallet | Wallet service |
| lightwalletd | Older light wallet server that Zaino is designed to replace or complement |

Zaino provides functionality for light clients, full clients or wallets, and block explorers. It gives access to the finalized chain, the non-finalized best chain, and mempool data held by Zebra.

## How It Fits in the Current Zcash Stack

The current Z3 stack is built around Zebra, Zallet, and optional Zaino.

In the default Z3 deployment, Zebra and Zallet run together. Zallet reaches Zebra directly, so an operator running only a local wallet stack does not need to start the standalone Zaino service.

Zaino is added when the operator wants to serve external clients. In Z3, it runs behind the `indexer` Compose profile and adds:

* a lightwalletd-compatible gRPC endpoint for light wallet clients
* a JSON-RPC proxy for explorers, faucets, and service backends
* an indexer database separate from Zebra's chain state

This makes Zaino especially relevant for wallet backends, public infrastructure operators, explorers, faucets, and developers testing services that need indexed Zcash chain data.

## Zaino and lightwalletd

lightwalletd is the original light wallet server. Zaino is the Rust-based successor path for this role. Its goal is to provide compatible APIs where possible so wallets and services can migrate without being fully rewritten at once.

That does not mean every lightwalletd deployment has already moved to Zaino. Operators should treat Zaino as part of the current Zebra-based stack and check the latest project documentation, releases, and service dashboards before choosing what to run.

## Operator Notes

The easiest authoritative deployment path is the Z3 repository. Z3 includes Zaino as an optional service:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Run the normal Z3 setup first and wait for Zebra to sync before starting dependent services on mainnet or testnet.

Zaino exposes two kinds of network service. The gRPC service is the lightwallet-facing API. The JSON-RPC service is intended for loopback or trusted private networks unless an external layer provides protection. Do not expose an unauthenticated or unencrypted JSON-RPC endpoint to the public internet.

## Some diagrams showing how Zaino works

### Zaino Internal Architecture

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Zaino Live Service Architecture

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Zaino System Architecture

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Common Mistakes

**Treating Zaino as a full node.** Zaino is not the validator. Zebra validates the chain; Zaino indexes data from Zebra.

**Assuming every Z3 deployment needs standalone Zaino.** Zallet can reach Zebra directly in the default Z3 stack. Start Zaino when you need the standalone indexer service for external clients.

**Presenting planned features as already deployed.** Zaino is actively developed, so check the current release notes and docs before describing a feature as available.

**Exposing JSON-RPC carelessly.** Zaino's JSON-RPC interface is for loopback or trusted private networks unless protected by another layer.

## Where can I learn more?

* [Zaino GitHub repository](https://github.com/zingolabs/zaino)
* [Zaino releases](https://github.com/zingolabs/zaino/releases)
* [Zaino generated documentation](https://zingolabs.github.io/zaino/)
* [Z3 deployment repository](https://github.com/ZcashFoundation/z3)
* [Zebra documentation](https://zebra.zfnd.org/)
* [Zaino grant and project discussion](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Last updated:** August 2026
