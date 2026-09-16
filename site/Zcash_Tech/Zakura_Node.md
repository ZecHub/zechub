<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node

> 🇧🇷 [Versão em Português](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura is a free, open-source full node implementation for Zcash, built for scale. Forked from [Zebra](Zebra_Full_Node.md) and developed through a collaboration between **Valar Group** and **Project Tachyon**, Zakura delivers dramatically faster synchronization, native block pruning, and a compatibility layer for legacy `zcashd` tooling. Version 1.0.0 was released on July 15, 2026.

---

## TL;DR

- Zakura is a **consensus-compatible Zcash full node** — an alternative to Zebra and zcashd, forked from Zebra.
- Blockchain sync is approximately **5× faster than Zebra**; snapshot bootstrapping completes in **under 2 minutes**.
- **Native block pruning** allows operators to run a full node with dramatically less disk space (~11 GB pruned snapshot vs. 300 GB for a full Zebra node).
- A **zcashd RPC compatibility mode** lets existing wallets and integrations work without modification.
- An **experimental P2P transport layer** (disabled by default) targets sub-500ms block propagation with DoS-resistant gossip.
- Compatible with **Ironwood (NU6.3)**, the Zcash network upgrade activated in mid-2026.
- Led by **Sean Bowe** (Zcash cofounder, Project Tachyon) and **Dev Ojha** (Valar Group).

---

## What is Zakura?

Zakura is a Zcash full node designed from the ground up to be production-ready at scale. While it shares consensus compatibility with Zebra — meaning it validates and follows the same Zcash protocol rules — Zakura introduces significant engineering improvements aimed at lowering the barrier to running a Zcash full node.

The project is a joint effort between **Project Tachyon** (led by Sean Bowe, one of Zcash's original cryptographic engineers) and **Valar Group** (led by Dev Ojha). Together they focus on next-generation Zcash protocol improvements, and Zakura serves as the reference node for that work.

---

## Key Features

### 5× Faster Chain Synchronization

Zakura achieves approximately 5× faster blockchain synchronization compared to Zebra. This makes it significantly more practical for operators who need to spin up a node quickly or recover from downtime.

### Snapshot Bootstrapping

Zakura publishes pre-built chain snapshots that dramatically reduce initial sync time:

| Bootstrap Method | Time |
|-----------------|------|
| Archive snapshot | ~37 minutes |
| Pruned snapshot | **Under 2 minutes** |
| Zebra (full sync) | ~20 hours |

Pruned snapshots are approximately **11 GB**, enabling a **680× faster** node bootstrap compared to syncing from genesis.

### Native Block Pruning

Zakura supports configurable block pruning, allowing node operators to define how much chain history to retain. This makes it practical to run a full node on hardware with limited storage — useful for validators, developers, and infrastructure providers who do not need the full historical chain.

### zcashd RPC Compatibility Mode

Zakura includes a compatibility mode that reproduces the legacy `zcashd` JSON-RPC interface. Existing wallets, exchanges, and integrations that rely on `zcashd` RPCs can switch to Zakura without requiring code changes.

### Experimental P2P Transport Layer

Zakura ships with a next-generation peer-to-peer transport layer, currently **disabled by default**. When enabled, it targets:

- Sub-500ms worst-case block propagation across the network
- Mempool aggregation for more efficient transaction relay
- DoS-resistant gossip protocol to improve network resilience

This layer represents a preview of future Zcash network-level improvements being developed under Project Tachyon.

### Ironwood (NU6.3) Compatible

Zakura is fully compatible with the Ironwood network upgrade (NU6.3), activated on the Zcash mainnet in mid-2026.

---

## How Zakura Relates to Other Zcash Nodes

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Language | C++ (forked from Bitcoin) | Rust | Rust (forked from Zebra) |
| Status | Deprecated | Active | Active (v1.0.0, Jul 2026) |
| Sync speed | Baseline | ~1× | ~5× faster |
| Block pruning | No | No | Yes |
| zcashd RPC compat | Native | Partial | Yes (compat mode) |
| Snapshot bootstrap | No | No | Yes (<2 min) |
| Experimental P2P | No | No | Yes (opt-in) |

---

## Getting Started

Download options, snapshots, and configuration documentation are available at:

- **Download & setup guide:** [zakura.com/download](https://zakura.com/download/)
- **Chain snapshots:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Source code:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Related Pages

- [Zebra Full Node](Zebra_Full_Node.md) — the upstream Zcash full node Zakura was forked from
- [Zaino Indexer](Zaino.md) — a Rust-based indexer compatible with Zebra and Zakura
- [Full Nodes](Full_Nodes.md) — overview of Zcash full node options
- [Lightwallet Nodes](Lightwallet_Nodes.md) — lightweight client alternatives

## Resources

- [Introducing Zakura — announcement](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura Website](https://zakura.com/)
- [Zakura on X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://web.archive.org/web/20260825/https://zodl.com//blog/)
