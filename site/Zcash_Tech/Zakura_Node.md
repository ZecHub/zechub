<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node

<p align="center">
<img width="569" height="169" alt="image" src="https://github.com/user-attachments/assets/9877ef5b-15ab-4978-9872-b323973bb634" />
</p>

## TL;DR

* **Next-Gen Rust Client:** Zakura is a high-performance, free, and open-source Zcash full node built on the codebase of the Zcash Foundation's Zebra. 
* **Scalability Focused:** Designed in a partnership between Valar Group and Project Tachyon to prepare the consensus engine for transaction capacities exceeding 50,000 TPS.
* **Day-One Mainnet Support:** Fully consensus-compatible with the Ironwood (NU6.3) upgrade.
* **Massive Sync Speedups:** Drastically reduces Initial Block Download (IBD) times, completing a full sync in ~4 hours and 20 minutes (nearly 5x faster than Zebra).
* **Ultra-Fast Bootstrapping:** Supports instant snapshot-based initialization, allowing a fully pruned node to be up and running in 1 minute and 50 seconds.
* **Legacy Compatibility:** Features a robust RPC emulator mimicking legacy `zcashd` interfaces to allow exchanges, miners, and wallets to migrate without code rewrites.

---


## Core Explanation

## What is Zakura ?
Zakura is a next-generation, high-performance, fully consensus-compatible Zcash full node client. Officially launched in July 2026, Zakura was built to address Zcash's scaling needs and provide critical infrastructure client diversity for the network.  

Zakura is forked from the Zebra codebase. It is designed from the ground up for extreme scale, targeting a future where Zcash is capable of processing tens of thousands of transactions per second (TPS).

Compared to existing Zcash node software, Zakura introduces several major architectural and performance improvements:  

 - Speed: Initial blockchain sync is roughly 5× faster than Zebra, completing a full sync in approximately 4 hours and 20 minutes.  
 - Storage Efficiency (Pruning): Includes native, configurable block pruning to drastically reduce disk space requirements.  
 - Ultra-Fast Bootstrap: The maintainers publish pruned snapshots (~11 GB) that allow operators to bootstrap a new node up to 680× faster than standard peer-to-peer network syncing (getting a node up and running in under two minutes).  
 - `zcashd` Compatibility Mode: To support node operators migrating away from the deprecated `zcashd` client, Zakura provides a seamless RPC compatibility layer.  
 - Experimental P2P Transport: Features an experimental, low-latency network transport layer aiming for sub-500ms block propagation speeds across the network.  

The introduction of Zakura establishes vital client diversity for Zcash. Running independent implementations (Zebra and Zakura) alongside one another minimizes the risk of single-client consensus bugs disrupting the network.


### The Need for Client Diversity

In blockchain networks, consensus rules are only as trustworthy as the software enforcing them. If every node on a network runs identical code, a single bug can silently take down or split the entire network. When multiple independent teams write separate implementations of the same protocol spec, each one acts as a check on the others: if two independently-built nodes agree on the chain state, that agreement is much stronger evidence the protocol rules are being followed correctly than one implementation agreeing with itself. 

This is precisely the argument the Zcash Foundation made in its public response to Zakura's launch: Zebra was released under permissive licenses specifically so it could be forked, and ZF explicitly welcomed Zakura as evidence of a healthier, more resilient Zcash ecosystem.

<img width="1280" height="440" alt="image" src="https://github.com/user-attachments/assets/e9265d08-c980-497a-83e6-ed617349d36e" />


With the legacy C++ client (`zcashd`) reaching its official end-of-life with the **Ironwood (NU6.3)** network upgrade, Zebra (`zebrad`) became the primary reference node. Zakura introduces critical client diversity by offering a parallel, production-ready Rust client developed independently by Sean Bowe's Project Tachyon and Dev Ojha's Valar Group. If one client encounters a runtime error on a minor edge case, the other continues processing blocks, preserving network liveness.


### Building for the Scale Era

Traditional blockchain node software operates at a throughput floor (e.g., Zcash historically utilizes ~28 KB/s of block data). To reach capacities matching global payment rails (50,000+ TPS), the Zcash consensus engine must be capable of processing up to 100 MB/s of block data. Zakura's performance optimizations are explicitly designed to lay the foundation for these sub-second, highly throughput-dense protocol layers.

---

## Visual / Analogy

Think of the blockchain ledger as an enormous historical archive. 
* **Standard Syncing** requires hiring a clerk who reads every single page from Year 1 to today, verifying every signature manually. This is highly secure but can take a full day.
* **Pruned Snapshot Bootstrapping** is like arriving at the archive and being handed a pre-verified, sealed summary containing only the valid, unspent assets. Instead of waiting hours, you verify the seals in under two minutes and immediately open the doors for business.

It's dramatically faster, but it rests on a different kind of trust: the integrity of the notary (snapshot publisher) and the checks performed on their work, rather than independently re-deriving everything from the original source documents.

<p align="center">
<img width="680" height="860" alt="image" src="https://github.com/user-attachments/assets/d3a43518-4648-4a6a-a9ff-28f51b9bd6b6" />
</p>


## Deep Dive

### 1. Comparative Sync Performance
Official testing of the v1.0.0 release showcases a massive leap in processing efficiency compared to legacy architectures:

<div align="center">
  
| Sync Type / Initialization Method | Zebra Node Time | Zakura Node Time | Speed Multiplier |
| :--- | :---: | :---: | :---: |
| **P2P Network Initial Sync** | 20 hours, 46 minutes | **4 hours, 20 minutes** | **~5x Faster** |
| **Archive Snapshot Load** | *N/A* | **37 minutes, 9 seconds** | **~33x Faster** |
| **Pruned Snapshot Load** | *N/A* | **1 minute, 50 seconds** | **~680x Faster** |

</div>


<p align="center">
<img width="700" height="400" alt="image" src="https://github.com/user-attachments/assets/79495774-95c5-4147-8f09-8e4fae80aef1" />
</p>


These performance multipliers are achieved via localized state database indexing, parallel signature verification pipelines, and minimized disk input/output overhead. Additionally, the node is engineered to perform block executions rapidly under worst-case transaction spam (referred to as "sandblast" attacks).


### 2. State Pruning and Snapshots
To limit disk wear and space requirements, Zakura features native state pruning:
* **Configurable Pruned State:** Rather than storing massive histories of spent transactions, nodes can automatically prune spent notes and unneeded transaction data, maintaining a slim database profile.
* **Snapshot Bootstrapping:** Verified, pre-pruned snapshots (~11 GB in size) are cryptographically validated against head-state headers, removing the need to synchronize blocks sequentially from the genesis block over public P2P networks.

#### Pruned-snapshot bootstrapping works roughly like this:

- Download a signed snapshot archive from Zakura's snapshots page.
- Verify the archive's cryptographic signature, and cross-check its claimed chain position against an independently-verifiable header chain.
- Load the resulting pruned state directly into the node's storage engine (RocksDB) instead of deriving it block-by-block.

This is meaningfully faster than a traditional sync  where a node downloads every block, trial-decrypts every shielded output against its own keys and independently re-derives consensus state all the way from genesis.


### 3. Emulated Legacy RPC Server
To smooth the transition away from `zcashd`, Zakura incorporates an RPC translation layer. Key details include:
* **Seamless API Surface:** The emulator exposes standard legacy JSON-RPC endpoints, ensuring third-party services (like miners, block explorers, and exchange balance engines) do not need to modify their existing backend script integrations.
* **Safe State Architecture:** Unlike `zcashd`, the RPC layer doesn't suffer from historic thread locking, allowing high-frequency read queries without degrading block validation performance.


### 4. Experimental Low-Latency P2P Transport Layer (V2)
Currently shipped as an opt-in feature, the experimental V2 peer-to-peer layer aims to redefine block propagation dynamics:
* **Sub-500ms Propagation:** Employs advanced gossip protocol routing to distribute validated blocks across global validator sets almost instantly.
* **Mempool Clustering:** Aggregates transactions with extreme efficiency, laying the required pipeline for Project Tachyon's high-speed state transitions.
* **DoS Shielding:** Features strict denial-of-service mitigation policies, automatically identifying and dropping peers distributing invalid state proposals.

---

## Put It Into Practice

Because Zakura is a Zebra fork, its manual build and Docker workflows closely mirror Zebra's own.

### Run via Docker

```docker run -d \
  --name zakura \
  -p 8233:8233 \
  -v zakurad-cache:/home/zakura/.cache/zakura \
  zakura/zakura:latest
```
### Build & Install Manually via Cargo (Rust)

#### 1. Install Rust's toolchain if you don't already have it
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
#### 2. Install build dependencies (Debian/Ubuntu example)
```
sudo apt-get install -y clang libclang-dev build-essential
```
#### 3. Install Zakura from source
```
cargo install --git https://github.com/zakura-core/zakura --locked zakurad
```
#### 4. Start the node
```
zakurad start
```

## Common Mistakes

Assuming snapshots are trust-based. When importing a pruned snapshot, some operators worry they are bypassing consensus rules. In reality, Zakura validates the snapshot's state cryptographically against the network's consensus header chain, ensuring zero trust is sacrificed.

Running the RPC layer without local loopback bindings. Exposing the compatibility RPC port publicly (binding to 0.0.0.0 instead of 127.0.0.1) without strict firewall rules can leak system metadata. Always keep RPC ports bound to local loopbacks unless protected by an authenticated proxy.

Using Zakura to store legacy C++ zcashd wallet keys directly. While Zakura emulates legacy RPC interfaces for querying balance and transaction outputs, it does not manage vulnerable legacy wallet files. Always use modern, key-derivation compliant software (such as Zodl or YWallet) to handle keys safely.

## Resources

- [Zakura Official Home & Book](https://zakura.com)
- [Zakura Core GitHub Repository](https://github.com/zakura-core/zakura)
- [Official Launch Announcement: Introducing Zakura](https://zakura.com/announcements/introducing-zakura/)
- [Zebra, Zakura, and the Road through NU6.3](https://forum.zcashcommunity.com/t/zebra-zakura-and-the-road-through-nu6-3/56703) — Zcash Community Forum announcement and discussion.

## Related Pages

- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — the lightwalletd infrastructure that light wallets rely on.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — understanding trial decryption and lightwalletd dynamics.
- [What a Block Explorer Can See](/zcash-tech/what-a-block-explorer-can-see) — analyzing on-chain transparency and metadata exposure.
- [Halo](/zcash-tech/halo) — the trustless recursive proof system driving the network.
