<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra Full Node

## TL;DR

- Zebra (`zebrad`) is the Zcash full node written in Rust and maintained by the Zcash Foundation.
- It validates blocks and transactions, keeps the chain state, and talks to other nodes over the peer-to-peer network.
- Zebra and zcashd implemented the same protocol and could interoperate. Since the zcashd retirement, Zebra carries the consensus role.
- Two ways to run it: the `zfnd/zebra` Docker image, or a build from source.
- Recommended hardware is 4 CPU cores, 16 GB RAM, and 300 GB of disk. The minimum is 2 cores and 4 GB RAM, with the same 300 GB of disk.

## Core Explanation

Zebra is the first Zcash node written entirely in Rust. It sits on the Zcash peer-to-peer network, where it validates and broadcasts transactions and keeps the blockchain state. Having a second independent implementation leaves the network infrastructure less dependent on any single codebase.

### Zebra and zcashd

The original Zcash node, zcashd, was developed by the Electric Coin Company from Bitcoin's codebase. Zebra was written from scratch in Rust, a memory-safe language, with a focus on security and efficiency.

Both implementations follow the same protocol, so they could communicate and interoperate. zcashd reached its End-of-Support halt on 18 July 2026 and no longer starts, which leaves Zebra and Zakura as the node implementations in use. See [Full Nodes](/zcash-tech/full-nodes) for the wider picture.

## Running Zebra

You can run Zebra using the Docker image, or you can build it manually. Please see the System Requirements section.

### Docker Usage

To run the latest release and synchronize it to the tip, execute the following command:

```

docker run zfnd/zebra:latest

```

For full instructions, refer to the [Docker documentation](https://zebra.zfnd.org/user/docker.html).

### Building Zebra

Building Zebra requires Rust, libclang, and a C++ compiler.

- Ensure you have the latest stable Rust version installed, as Zebra is exclusively tested with it.
- Necessary build dependencies include:
  - libclang (also known as libclang-dev or llvm-dev)
  - clang or another C++ compiler (such as g++ for all platforms or Xcode for macOS)
  - protoc (Protocol Buffers compiler) with the *--experimental_allow_proto3_optional* flag, introduced in Protocol Buffers v3.12.0 (released on May 16, 2020).

### Install and Start

On x86_64 or aarch64 Linux with glibc 2.34 or newer (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), you can skip the build dependencies and install a signed pre-built binary:

```
cargo binstall zebrad
```

The same binaries are attached to every GitHub release as `zebrad-<version>-<target>.tar.gz`, each with a SHA-256 checksum, a Sigstore build-provenance attestation and a Cosign signature. On older platforms, use the Docker image or build from source.

To build from source, get the code and build the release binary:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Start the node with:

```
target/release/zebrad start
```

Installation guide: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Optional Configurations & Features

### Initializing Configuration File

  - Generate a configuration file using the command:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - The generated *zebrad.toml* will be placed in the default preferences directory of Linux. For alternative OS default locations, refer to the documentation.

### Configuring Progress Bars

  - Configure *tracing.progress_bar* in your *zebrad.toml* to display key metrics in the terminal using progress bars. Note: A known issue exists where progress bar estimates can become exceedingly large.

### Configuring Mining

  - Zebra can be configured for mining by specifying a *MINER_ADDRESS* and port mapping in Docker. Further details can be found in the [Mining support documentation](https://zebra.zfnd.org/user/mining-docker.html).

### Custom Build Features

  - Extend Zebra's functionality with additional Cargo features such as Prometheus metrics, Sentry monitoring, experimental Elasticsearch support, and more.

  - Combine multiple features by listing them as parameters of the `--features` flag during installation.

  - Some debugging and monitoring features are disabled in release builds to optimize performance. For the full list of experimental and developer features, consult the [API documentation](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## System Requirements and Network Configuration

### Recommended Requirements

- CPU: 4 CPU cores
- RAM: 16 GB
- Disk Space: 300 GB available disk space for compiling binaries and storing cached chain state
- Network: 100 Mbps network connection with a minimum of 300 GB uploads and downloads per month

### Minimum Requirements

- CPU: 2 CPU cores
- RAM: 4 GB
- Disk Space: 300 GB of available disk space

Zebra's test suite may take over an hour to complete depending on your machine specifications. Slower systems can compile and run Zebra. The precise performance boundaries have not been established through testing.

### Disk Requirements

- Zebra uses approximately 300 GB for cached Mainnet data and 10 GB for cached Testnet data. Expect disk usage to increase over time.
- The database is cleaned up periodically, and also on shutdown or restart. Changes are committed using database transactions. Incomplete changes caused by forced termination or a panic are rolled back the next time Zebra starts.

### Network Requirements and Ports

- Zebra uses the following TCP ports for inbound and outbound connections:
  - 8233 for Mainnet
  - 18233 for Testnet
- Configuring Zebra with a specific listen_addr advertises this address for inbound connections. Outbound connections are required for synchronization; inbound connections are optional.
- Access to Zcash DNS seeders is necessary via the OS DNS resolver (typically port 53).
- Zebra can make outbound connections on any port. zcashd prefers peers on default ports to avoid being used for DDoS attacks on other networks.

### Typical Mainnet Network Usage

- Initial Sync: a 300 GB download is required for the initial synchronization, and this figure is expected to grow.
- Ongoing Updates: daily uploads and downloads ranging from 10 MB to 10 GB, depending on user transaction sizes and peer requests.
- Zebra starts an initial sync on every internal database version change, which can mean a full chain download during version upgrades.
- Peers with a round-trip latency of 2 seconds or less are preferred. If latency exceeds this threshold, open a ticket in the Zebra repository.

## Common Mistakes

- Sizing the disk for today. Cached Mainnet state already sits near 300 GB and keeps growing.
- Expecting wallet RPCs from `zebrad`. Keys and balances live in [Zallet](https://github.com/zcash/zallet), a separate program.
- Running `zebrad` alone and expecting light wallets to connect. That path needs an indexer, either lightwalletd or [Zaino](/zcash-tech/zaino).
- Treating an unexpected resync as a fault. A database version change triggers one by design.

## Related Pages

- [Full Nodes](/zcash-tech/full-nodes) - what a full node does and which implementations exist
- [Zakura Node](/zcash-tech/zakura-node) - a node forked from Zebra with faster sync and pruning
- [Zaino](/zcash-tech/zaino) - the Rust indexer that serves light wallets
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - the servers light wallets query
- [Zcash Mining Guide](/using-zcash/zcash-mining-guide) - mining against your own node

## Further Learning

- [The Zebra Book](https://zebra.zfnd.org)
- [Zebra on GitHub](https://github.com/ZcashFoundation/zebra/)
- [System Requirements](https://zebra.zfnd.org/user/requirements.html)
