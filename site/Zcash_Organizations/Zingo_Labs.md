#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Official Website](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs is a team of visionaries dedicated to enhancing the human experience. We believe that technology should benefit humanity and that we thrive through consensual interactions. We are identifying the patterns that make this possible.

Zingo Lab Cyan operates as a Shielded DAO. We store our funds in a treasury where every member has a view key. Funds are spent from the treasury when members vote in favor of a proposal.

## Projects

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet is a fully featured Zcash wallet designed for user friendliness, although it includes some advanced features for more advanced users. It supports transparent, Sapling and Ironwood pools, has an address book for recurrent payments and is available in various languages. It was the first wallet to support Orchard and to implement NU5 formats.

One of the main features of Zingo! is its ability to use the Memo field to offer valuable insights about your transactions.

Zingo! is available for mobile devices and PCs. You will find all downloads [here](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
An API and test-app that exposes zcash functionality for app consumption. Zingolib provides both a library for zingo-mobile, as well as an included cli application called zingo-cli, a command-line light wallet that talks to a chain indexer such as [Zaino](/zcash-tech/zaino).

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino is a Rust indexer for the Zcash blockchain, developed by the Zingo team. It is the indexer in the [Z3 stack](/zcash-tech/z3-stack): it indexes chain data from a [Zebra](/zcash-tech/zebra-full-node) validator and serves wallets, explorers, and other clients. It is the successor path to lightwalletd.

Zaino offers essential features for both light clients, such as wallets and applications that do not require the full blockchain history, and full clients or wallets. It also supports block explorers, granting access to both the finalized blockchain and the non-finalized best chain and mempool managed by a Zebra full validator.

`zcashd` reached its End-of-Support halt on 18 July 2026 at block 3,417,100 and does not support Ironwood (NU6.3). Zaino reads a Zebra validator.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

A set of utilities that launch and manage Zcash processes. This is used for integration testing in the development of:
- lightclients
- indexers
- validators

Its goal is to offer a highly adaptable and sturdy testing environment for core nodes (validators) such as Zebra, indexers like Zaino, and light client wallets such as zingo-cli.

The default stack it launches is Zebrad, Zainod, and zcash-devtool. The legacy `zcashd` and lightwalletd processes sit behind an unsupported `legacy-stack` feature and are scheduled for removal.

In addition to providing tools to start, cache, and load Zcash chain data (for mainnet, testnet, and regtest), zcash-local-net is used from Zaino's test suite to assess the Lightwallet RPC services hosted in Zaino (see [Zaino testing docs](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
