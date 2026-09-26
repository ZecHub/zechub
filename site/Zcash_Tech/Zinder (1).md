# Zinder: A Service-Oriented Indexer for Zcash

Blockchains store massive amounts of raw, unorganized data. Digging through millions of blocks every time an application or wallet needs specific information such as *"Which transactions belong to this wallet?"* is slow and resource-heavy.

An **indexer** solves this by continuously processing raw blockchain data and organizing it into a fast, searchable format so applications can query relevant information instantly.

**Zinder** is a self-hosted chain-data service designed specifically for Zcash. It indexes the blockchain once from a Zebra full node and exposes the organized data through query protocols, making it seamless for wallets and third-party applications to retrieve what they need.

Zcash already has indexers, the problem is these indexers frequently constrained product development because they were built around specific consumer protocols, most notably `lightwalletd` or tailored directly to legacy wallet SDKs like `zcashd`. Developers had the tools and capability to build new Zcash features, but instead of serving as a flexible foundation, the existing indexing infrastructure couldn't support their needs cleanly.

## Tight Coupling

The major issue was tight coupling. Coupling means an indexer's internal architecture is heavily dependent on the specific protocol or requirements of the application consuming its data.

When an indexer is built strictly around `lightwalletd`'s requirements, its internal assumptions become hardcoded to match. If a new application requires different data structures or query behaviors, the indexer's internal code must be altered or rewritten to accommodate it.

A consumer protocol should act as a simple **interface** to the indexer, not the blueprint that dictates how the indexer is built internally.

## How Zinder Addresses the Problem

Zinder reverses this relationship by separating the core indexing logic from consumer interfaces:

* It makes its own native query protocol called `WalletQuery`, which is the primary architectural interface of the system.
* It treats legacy protocols, like `lightwalletd` compatibility, as separate, pluggable modules rather than core dependencies.
* It decouples **chain ingestion**, **wallet projections**, and **query serving** so that one workload does not constrain or overload another.
* It indexes Zcash data once from a Zebra full node to maintain a consistent canonical view, serving multiple applications and wallets through independently deployable interfaces.


# WalletQuery Protocol

`WalletQuery` is not another blockchain or another indexer. It is the interface through which a wallet or application asks Zinder for the chain data it needs.

It gives clients a clear and predictable contract with the indexer through:

* Typed errors
* Capability discovery
* Resumable chain events
* Epoch-pinned reads

## 1. Epoch-Pinned Reads

Blockchain data is constantly changing, so different requests could otherwise see different versions of the chain.

`WalletQuery` solves this by tying reads to a specific **`ChainEpoch`**:

```text
Wallet → WalletQuery → Zinder
                     ↓
                ChainEpoch X
```

This ensures that related requests use the same consistent view of the chain, preventing the wallet from accidentally combining data from different chain states or competing tips.

## 2. Explicit Capability Discovery

`WalletQuery` allows a server to advertise exactly which features it supports through `ServerInfo`.

```text
Wallet → "What do you support?"
Zinder → "These are my capabilities."
Wallet → "I'll use those features."
```

This prevents clients from making assumptions based on the Zinder version and makes the client-server relationship more predictable.

## 3. Resumable Chain Events

`WalletQuery` can provide chain events that clients can resume from a known position.

Instead of rebuilding the chain state from scratch, a wallet can continue following changes from where it previously stopped.

# Zinder's Service-Oriented Architecture

Zinder is designed as a service-oriented indexer with its own protocol at the center. The chain is indexed once from a Zebra node, stored in a canonical representation, and then different services read from that shared indexed state.

The important architectural idea is that the **indexer is the center, not the wallet protocol**.

Zinder has separate components for ingestion, wallet projection, querying, and compatibility.

The canonical store is written by `zinder-ingest`, while `zinder-projector` builds the wallet-specific projection. `zinder-query` then serves the native `WalletQuery` protocol.

Then, if an existing wallet expects `lightwalletd`, Zinder doesn't redesign itself around `lightwalletd`. Instead, it adds a separate compatibility layer.

The `zinder-compat-lightwalletd` service translates the `lightwalletd` `CompactTxStreamer` protocol onto Zinder's native serving layer.

That is the architectural distinction the forum post is emphasizing: **lightwalletd support is a module of Zinder, rather than the foundation Zinder is built around.**

# Zinder vs. Traditional lightwalletd Architecture

This approach that Zinder takes is different from that of the Traditional `lightwalletd` whose architecture is primarily designed around serving light wallets, with the `CompactTxStreamer` protocol acting as the main interface between the blockchain backend and wallets.

This means the backend is largely shaped around what the `lightwalletd` protocol requires.

Rather than making the entire indexer depend on `lightwalletd`, Zinder treats `lightwalletd` support as a separate compatibility layer that translates between the two protocols.

In this way, traditional lightwalletd architecture is more consumer-protocol-driven, while Zinder is indexer-driven and protocol-independent, allowing different applications to consume the same underlying indexed data without forcing the indexer's internal architecture to conform to one protocol.

# How Zinder Improves Developer Experience

## 1. A Clear Native Protocol

* Developers can use `WalletQuery` instead of having to build directly around the internal behavior of an indexer.
* This gives applications a stable interface for retrieving Zcash data.

## 2. Consistent Chain State

* With epoch-pinned reads, developers can request data from a specific `ChainEpoch`.
* This reduces the risk of receiving inconsistent data when the blockchain is changing.

## 3. Explicit Capabilities

* Through `ServerInfo`, developers can ask a Zinder server what it actually supports.
* They don't have to guess based on the server version or attempt unsupported operations.

## 4. Better Error Handling

* `WalletQuery` provides typed errors and stable reason codes.
* Instead of interpreting vague errors, applications can programmatically determine what went wrong and respond appropriately.

## 5. Resumable Synchronization

* Developers can build wallets and applications that resume from a known point in the chain rather than repeatedly reconstructing their state.
* This makes synchronization more reliable, especially after interruptions.

## 6. Protocol Independence

* Developers aren't forced to design their application around `lightwalletd`'s assumptions.
* Zinder's architecture separates the underlying indexed data from the protocol used to consume it.

# How Zinder Can Improve Wallet/User Experience

## 1. More Reliable Synchronization

Epoch-pinned reads help the wallet work from a consistent view of the blockchain. This can reduce situations where different parts of a wallet's synchronization process see conflicting chain states.

## 2. Faster and Smoother Recovery

Resumable chain events allow a wallet to continue synchronization from where it stopped instead of rebuilding its state from scratch after an interruption.

## 3. Fewer Unexpected Failures

Typed errors and stable reason codes allow wallet developers to handle different failure conditions properly.

This can translate into clearer error messages and more graceful recovery for users.

## 4. Better Compatibility Across Servers

Capability discovery lets a wallet determine what a particular Zinder server supports before attempting to use a feature.

This can prevent unnecessary failures caused by unsupported functionality.

## 5. More Responsive Wallet Applications

Because Zinder separates the canonical chain data from wallet-specific projections, wallet queries can be served from data structures designed specifically for wallet needs rather than repeatedly processing raw blockchain data.

# INSTALLATION AND SET UP OF ZINDER

# Step 1: Set Up Zebra

The first component you need is **Zebra**, the Zcash full node.

Zebra connects to the Zcash network and maintains the blockchain. Zinder does not replace Zebra; instead, Zinder uses Zebra as its source of blockchain data.

The relationship is:

```text
Zcash network → Zebra → Zinder
```

For this setup, the testnet Zebra environment can be started using the Z3 platform stack:

```bash
Z3_NETWORK=testnet docker compose up -d
```

This gives Zinder a Zcash node from which it can obtain the blockchain data.

---

# Step 2: Obtain the Zinder Source

Clone the Zinder repository and enter it:

```bash
git clone https://github.com/ZcashFoundation/zinder.git
cd zinder
```

Zinder is written in **Rust**, and the repository provides both Docker-based deployment and Linux release bundles.

For a first setup, the Docker/Compose method is the simpler approach.

---

# Step 3: Start the Zinder Services

Once Zebra is running, start Zinder using its testnet configuration:

```bash
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

This starts the wallet-serving Zinder topology.

The important thing is that Zinder is **not one giant process**. It separates its responsibilities into independent services.

Those services are:

1. `zinder-ingest`
2. `zinder-projector`
3. `zinder-query`
4. `zinder-compat-lightwalletd`

---

# Step 4: `zinder-ingest` Builds the Canonical Chain

The first important Zinder process is **`zinder-ingest`**.

It connects to Zebra and imports the blockchain into Zinder's canonical storage.

Its responsibilities include:

* Constructing the initial chain
* Following new blocks
* Handling chain reorganizations
* Maintaining the canonical event stream
* Maintaining live mempool state

Most importantly, **`zinder-ingest` is the only process that writes the canonical chain state**.

You can think of it as:

> **Zebra gives Zinder the blockchain; `zinder-ingest` turns that blockchain into Zinder's authoritative indexed chain.**

You wait for ingestion to catch up before treating the service as ready.

```bash
curl -fsS http://127.0.0.1:19105/readyz
```

A successful readiness response means the canonical writer has reached the required state, including canonical catch-up and the mempool snapshot.

---

# Step 5: `zinder-projector` Creates the Wallet Data

Next, **`zinder-projector`** takes the canonical chain information and creates the wallet-specific projection.

### Why is this necessary?

The raw blockchain is not organized in the most convenient form for a wallet.

A wallet wants to efficiently answer questions such as:

> **Which transactions belong to this wallet?**

> **What outputs are relevant to this wallet?**

> **What is the wallet's transaction history?**

The projector builds the data required to answer these kinds of wallet queries efficiently.

Importantly, **`zinder-projector` is the only process that writes the wallet projection**.

So there are now two distinct stages:

```text
zinder-ingest
      ↓
Canonical blockchain data
      ↓
zinder-projector
      ↓
Wallet-oriented data
```

The projector also has a readiness endpoint:

```bash
curl -fsS http://127.0.0.1:19110/readyz
```

It does not become ready simply because it has started; it needs to reach the appropriate authenticated chain fence from the ingest side.

---

# Step 6: Start `zinder-query`

Now you have the indexed chain and the wallet projection.

The next component is **`zinder-query`**.

This is the service that exposes Zinder's **native `WalletQuery` protocol**.

Applications do **not** directly open Zinder's RocksDB files. Instead, they communicate with `zinder-query` through the WalletQuery API.

Conceptually:

```text
Application
     ↓
WalletQuery
     ↓
zinder-query
     ↓
Zinder's indexed data
```

The native query service is a read service; it does not write the canonical or wallet stores.

You can test the native API with:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 \
  zinder.v1.wallet.WalletQuery/ServerInfo
```

`ServerInfo` tells the client what capabilities that particular Zinder deployment actually provides.

Clients are expected to use those advertised capability strings rather than guessing capabilities from the Zinder version.

---

# Step 7: Optionally Enable the `lightwalletd` Compatibility Service

This step is particularly important if you want to connect **existing Zcash wallets or applications that already use `lightwalletd`**.

Zinder provides a separate service called:

```text
zinder-compat-lightwalletd
```

It speaks the existing `lightwalletd` **`CompactTxStreamer`** protocol and translates those requests into Zinder's serving layer.

So an existing wallet can continue doing:

```text
Wallet
   ↓
CompactTxStreamer
   ↓
zinder-compat-lightwalletd
   ↓
Zinder
```

rather than having to be rewritten to understand `WalletQuery`.

This is explicitly described as a separate compatibility service rather than making `lightwalletd` the basis of Zinder's internal architecture.

You can test it with:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19067 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

---

# Step 8: Check All Four Services

At this point, the four components should have reached their appropriate readiness states.

For the testnet setup described:

```bash
curl -fsS http://127.0.0.1:19105/readyz  # ingest
curl -fsS http://127.0.0.1:19110/readyz  # projector
curl -fsS http://127.0.0.1:19106/readyz  # native query
curl -fsS http://127.0.0.1:19107/readyz  # compatibility
```

The important thing is that **"the process is running" is not the same as "the service is ready."**

Zinder uses readiness/fence checks to make sure the canonical data and wallet projection correspond to a consistent chain state before serving wallet data.

---

# How Applications Connect to Zinder

There are two main methods.

## Method 1: A New Application Uses `WalletQuery`

If you are developing a new application, you can use Zinder's native **`WalletQuery`** protocol.

The application connects remotely to `zinder-query`.

For Rust applications, Zinder provides the **`zinder-client` SDK**, which is deliberately remote-first. This means the application communicates with Zinder over the network instead of embedding Zinder's RocksDB storage system inside the application.

The connection therefore looks like:

```text
Your application
       ↓
zinder-client
       ↓
WalletQuery / gRPC
       ↓
zinder-query
       ↓
Zinder
```

This is useful because the developer doesn't have to understand or directly interact with:

* RocksDB
* Canonical storage
* Wallet projection storage
* Chain ingestion
* Reorganization handling

The application simply works with the interface exposed by WalletQuery.

---

## Method 2: An Existing `lightwalletd` Application Connects Through the Compatibility Layer

If an application already knows how to communicate with `lightwalletd`, you don't have to rewrite it.

Instead, point it toward:

```text
zinder-compat-lightwalletd
```

The application continues speaking:

```text
CompactTxStreamer
```

while the compatibility service handles the translation into Zinder's native serving system.

So:

```text
Existing wallet / app
        ↓
CompactTxStreamer
        ↓
zinder-compat-lightwalletd
        ↓
Zinder
```

This is one of the major practical advantages of the architecture:

> **Existing lightwalletd clients can have a compatibility path while new applications can use Zinder's native protocol.**

---

# What About Explorers and Other Applications?

Zinder also has an optional **`ExplorerQuery`** plane.

This is intended for applications such as:

* Block explorers
* Dashboards
* Analytics applications
* Other services that need explorer-style data

The repository describes `ExplorerQuery` as providing things such as:

* Block summaries
* Transaction details
* Mempool views
* Search-oriented data

So Zinder can serve different types of consumers without forcing all of them through one protocol.

```text
                         Zinder
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
     WalletQuery     lightwalletd      ExplorerQuery
          │          Compatibility          │
          ▼                │                ▼
    New Wallets       Existing Apps    Explorers /
    & Apps            & Wallets        Dashboards
```

This demonstrates the central architectural principle of Zinder: **the blockchain is indexed once, while different applications can consume the resulting indexed data through interfaces suited to their specific needs.**


# Why Zinder Matters

Zinder represents a shift from traditional, single-consumer indexers such as `lightwalletd` toward a more flexible and modular approach to Zcash infrastructure.

By placing canonical chain data and the `WalletQuery` protocol at the center of its architecture, Zinder separates **data ingestion**, **wallet projections**, and **query services**, allowing the same foundation to support:

* Wallets
* Block explorers
* Custom applications

while maintaining compatibility with existing systems.

Features such as:

* **Epoch-pinned reads**
* **Capability discovery**
* **Typed errors**
* **Resumable chain events**

provide developers with more consistent and reliable access to Zcash data.

Overall, Zinder provides a more adaptable foundation for building Zcash applications and infrastructure, with greater **interoperability** and **resilience**.


