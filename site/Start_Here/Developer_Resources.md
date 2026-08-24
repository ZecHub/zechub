<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Developer Resources

The resources you need to build on Zcash, grouped by what each one is for rather than listed in one pile.

The stack changed a great deal in 2026. zcashd, which ran the network for most of its history, reached its end of life on 18 July 2026 at block height 3417100, and every unmodified node shut down at that height and will refuse to restart. Guides written for zcashd are history now rather than a starting point, so this page is organised around what replaced it.

## The stack at a glance

| Layer | What to use | Start with |
|:--|:--|:--|
| Full node | Zebra or Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Full node wallet | Zallet, in beta | [The Zallet Book](https://zcash.github.io/zallet/) |
| Light wallet server | Zaino or lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Wallet libraries | The librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | Android and iOS SDKs | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Specification | Protocol spec and ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nodes

A node validates consensus and holds the chain. There are two actively developed implementations.

[Zebra](/zcash-tech/zebra-full-node) is the Zcash Foundation's node, written in Rust, and is the one most guides now assume. [The Zebra Book](https://zebra.zfnd.org/) covers installing and running it, and the [repository](https://github.com/ZcashFoundation/zebra) is where development happens.

[Zakura](/zcash-tech/zakura-node) is a newer node, described by its authors as a "consensus-compatible Zcash full node, built for scale", with faster sync, block pruning and a zcashd compatibility mode. It is led by Sean Bowe, a Zcash cofounder, and Dev Ojha. It is open source under Apache 2.0 at [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub has a [Full Nodes](/zcash-tech/full-nodes) page covering the trade-offs between them.

## The full node wallet

zcashd bundled a wallet with the node. That wallet is gone, and [Zallet](https://github.com/zcash/zallet) is the replacement. The Zallet Book describes it as "a full-node Zcash wallet written in Rust" being "built as a replacement for the zcashd wallet".

Read the security warning before depending on it. Zallet is in beta, "has not been fully reviewed", breaking changes "may occur at any time, requiring you to delete and recreate your Zallet wallet", and not every zcashd RPC method has been ported yet.

If you are moving an existing setup across, ZecHub has a [migration guide from zcashd to Zebra and Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) and a [Zallet quick reference](/using-zcash/zallet-quick-reference-guide).

## Light wallet servers

Most wallets do not run a node. They talk to a server that keeps the chain and hands back a compact view of it.

[lightwalletd](https://github.com/zcash/lightwalletd) is the original service, written in Go, described as "a backend service that provides a bandwidth-efficient interface to the Zcash blockchain". [Zaino](/zcash-tech/zaino) is the newer indexer, written in Rust, and reads from a full validator rather than carrying its own copy of the chain.

The [Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) documentation covers the protocol itself. The [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) page covers what these servers can and cannot see about a user, which is worth understanding before you pick one.

## Building a wallet

Most wallet work happens in the Rust crates under [librustzcash](https://github.com/zcash/librustzcash), which the mobile SDKs and several desktop wallets build on. Each crate is documented on [docs.rs](https://docs.rs).

| Crate | What it is for |
|:--|:--|
| zcash_client_backend | "APIs for creating shielded Zcash light clients", including sync and transaction construction |
| zcash_client_sqlite | "An SQLite-based Zcash light client", the storage layer for the above |
| zcash_keys | "Zcash key and address management" |
| zcash_primitives | "Rust implementations of the Zcash primitives" |
| zcash_protocol | "Zcash protocol network constants and value types" |
| orchard | "The Orchard shielded transaction protocol" |
| sapling-crypto | "Cryptographic library for Zcash Sapling" |
| pczt | "Tools for working with partially-created Zcash transactions", used for hardware and multi-device signing |
| zip321 | Payment request URIs, as specified in ZIP 321 |

For mobile, the [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) and the [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) wrap those libraries. The iOS repository was previously called ZcashLightClientKit, so older links and articles use that name.

## Specification and cryptography

The [protocol specification](https://zips.z.cash/protocol/protocol.pdf) is the authority on how Zcash works, including [address and key encodings](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs](https://zips.z.cash) are where changes are proposed and specified, and the index shows which are drafts and which are final. Consensus changes ship in network upgrades, and ZecHub tracks those on the [Network Upgrades](/start-here/network-upgrades) page.

For the cryptography underneath, read [The halo2 Book](https://zcash.github.io/halo2/index.html) and [The Orchard Book](https://zcash.github.io/orchard/), with the [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) and [orchard](https://docs.rs/orchard/latest/orchard/) crate docs alongside. [The FROST Book](https://frost.zfnd.org/) covers threshold signatures, and ZecHub has a [FROST](/zcash-tech/frost) page.

## Testnet

Testnet is a separate chain with valueless coins, called TAZ. Both Zebra and Zakura can run against it, and the [testnet guide](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) covers node configuration.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) is a working testnet block explorer, with a mainnet counterpart at [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Getting TAZ is the awkward part. Public faucets appear and disappear, and the ones linked from older documentation were not responding when this page was written. The reliable route is to ask in the Zcash R&D Discord, which is what the Zcash documentation itself suggests.

## General documentation

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) is still the broadest single source, covering protocol concepts, integration and mining. Read it with some care. It is versioned against zcashd, so parts of it describe a node that no longer runs, while the protocol and light client sections remain useful. [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) that lives there is worth reading before designing anything that touches user privacy.

If you are new to blockchains generally, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) is the usual recommendation for the shared fundamentals, and is free to read in full. It does not cover shielded transactions.

## Other tools developers have mentioned

[Arti](https://docs.rs/arti/latest/arti/) is the Rust implementation of Tor, used by zcash_client_backend to route wallet traffic. [Tailscale](https://github.com/tailscale/tailscale) comes up for connecting to a node you run yourself. [warp2](https://github.com/hhanh00/warp2) is a fast sync implementation by Hanh, though it has not been updated since 2023.

## Community and events

The [Zcash R&D Discord](https://discord.gg/6AK7keWFaK) is where protocol and wallet development is discussed, and the [Zcash Community Forum](https://forum.zcashcommunity.com/) carries longer proposals and support threads.

Recent hackathon results are a good picture of what people are building: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) and the [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Retired resources

Kept because older articles link to them, and because they are still the reference for how the retired node behaved. Do not start here.

[The Zcashd Book](https://zcash.github.io/zcash/) and the [zcashd RPC reference](https://zcash.github.io/rpc/) document software that reached [end of life](https://zcash.github.io/zcash/user/end-of-life.html) in July 2026. The [zcash/zcash](https://github.com/zcash/zcash) repository is archived.

If you have a resource to add, or you spot something here that has gone stale, open an issue or a pull request. Teams do not always have capacity to keep everything current, and flagging what you ran into helps direct the guides.

**Last updated:** August 2026
