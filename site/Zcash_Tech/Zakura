<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura

## TL;DR

- Zakura is a new open-source Zcash full node implementation built for performance and scalability.
- It is a consensus-compatible fork of Zebra with support for the Ironwood (NU6.3) network upgrade.
- Zakura syncs the blockchain nearly **5× faster** than Zebra and supports fast bootstrap using snapshots.
- It includes a **zcashd compatibility mode**, allowing existing wallets and applications to continue working.
- Developed by **Valar Group** and **Project Tachyon**, Zakura is designed to power the next generation of Zcash infrastructure.

---

## What is Zakura?

**Zakura** is a modern Zcash full node implementation built to support the future growth of the network.

It is a fork of **Zebra**, the Rust-based Zcash node, and remains fully consensus-compatible with the Zcash protocol. Zakura already supports the **Ironwood (NU6.3)** network upgrade and is designed as the foundation for future protocol innovations developed by **Project Tachyon** and **Valar Group**.

Unlike previous node software, Zakura focuses heavily on high-performance synchronization, efficient storage, improved networking, and compatibility with existing infrastructure.

## Key features

### Faster blockchain synchronization

One of Zakura's biggest improvements is synchronization speed.

Typical benchmark results show:

| Node | Sync Time |
|------|-----------|
| Zebra | 20h 46m |
| Zakura (Block Sync) | 4h 20m |
| Zakura (Archive Snapshot) | 37m 9s |
| Zakura (Pruned Snapshot) | 1m 50s |

This allows operators to deploy new nodes dramatically faster than before.

### Snapshot bootstrapping

Instead of downloading every historical block from peers, Zakura publishes downloadable blockchain snapshots.

Benefits include:

- Faster initial setup
- Lower bandwidth usage
- Approximately **11 GB** storage for pruned snapshots
- Up to **680× faster** bootstrap compared to traditional P2P synchronization

### Native pruning

Zakura supports configurable blockchain pruning.

Operators can retain only recent blockchain data while safely participating in the network, significantly reducing disk requirements.

### zcashd compatibility

Many wallets, services, and integrations still expect the legacy **zcashd RPC interface**.

Zakura includes a compatibility mode that reproduces the zcashd API, making migration significantly easier without requiring applications to be rewritten.

### Experimental networking

Zakura includes an experimental next-generation peer-to-peer networking layer (currently disabled by default).

Long-term goals include:

- Sub-500 ms block propagation
- Better mempool synchronization
- Improved gossip protocol
- Stronger denial-of-service (DoS) resistance
- Networking designed for future high-throughput upgrades

---

## Why was Zakura created?

The long-term vision for Zcash is to support global-scale digital payments.

Current payment networks such as Visa and Mastercard process **tens of thousands of transactions per second**, far beyond what today's Zcash node software was designed to handle.

Project Tachyon and Valar Group are developing new cryptographic technologies—including recursive proofs and Private Information Retrieval (PIR)—that greatly reduce computational requirements.

However, faster cryptography alone is not enough.

The network also requires modern consensus software capable of handling significantly higher throughput.

Zakura is being developed to become that next-generation node implementation.

---

## Maintainers

### Sean Bowe

Sean Bowe is a Zcash cofounder and leads **Project Tachyon**.

He has worked on Zcash's zk-SNARK cryptography since the project began and has contributed to every major Zcash network upgrade.

### Dev Ojha

Dev Ojha is cofounder of Osmosis and leads **Valar Group**.

His team contributed much of the engineering and performance work behind Zakura's initial release, including storage, networking, and synchronization improvements.

---

## Who should use Zakura?

Zakura is well suited for:

- Node operators
- Wallet providers
- Exchanges
- Block explorers
- Infrastructure providers
- Developers building Zcash applications
- Anyone preparing for Ironwood and future network upgrades

Existing users of Zebra or zcashd can evaluate Zakura as a modern alternative while maintaining compatibility with the Zcash network.

---

## Resources

- Introducing Zakura: https://zakura.com/announcements/introducing-zakura/
- GitHub Repository: https://github.com/zakura-core/zakura
- Zebra Documentation: https://zebra.zfnd.org/
- Zcash Developer Resources: https://z.cash/technology/
- Zcash Protocol Specification: https://zips.z.cash/protocol/protocol.pdf

## Related pages

- [Zebra](/zcash-tech/zebra)
- [Ironwood Network Upgrade](/zcash-tech/ironwood)
- [Running a Zcash Node](/zcash-tech/running-a-node)
- [Zcash Basics](/start-here/what-is-zec-and-zcash)

---

*If you would like to add or suggest edits to this wiki page, please head to the [ZecHub GitHub repo](https://github.com/ZecHub/zechub) and submit a pull request.*
