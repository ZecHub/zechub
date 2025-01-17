#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="Alt Text" width="50"/> ZingoLabs

🌐 [Official Website](https://zingolabs.org/) | 💼 [Github](https://github.com/zingolabs) | 🐦 [X/Twitter](https://x.com/ZingoLabs) | 📷 [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs is a team of visionaries dedicated to enhancing the human experience. We believe that technology should benefit humanity and that we thrive through consensual interactions. We are identifying the patterns that make this possible.

Zingo Lab Cyan operates as a Shielded DAO. We store our funds in a treasury where every member has a view key. Funds are spent from the treasury when members vote in favor of a proposal.

## Projects

### Zingo! Wallet ([Github](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet is a fully featured Zcash wallet designed for user friendliness, although it includes some advanced features for more advanced users. It supports transparent, Sappling and Orchard pools, has an address book for recurrent payments and is available in various languages. It was the first wallet to support Orchard and to implement NU5 formats.

One of the main features of Zingo! is its ability to use the Memo field to offer valuable insights about your transactions.

Zingo! is available for mobile devices and PC's. You'll find all downloads [here](https://zingolabs.org/)

### Zingolib ([Github](https://github.com/zingolabs/zingolib))
An API and test-app that exposes zcash functionality for app consumption. Zingolib provides both a library for zingo-mobile, as well as an included cli application to interact with zcashd via lightwalletd called Zingo-cli, a command line lightwalletd-proxy client.

### Zaino Indexer ([Github](https://github.com/zingolabs/zaino))
Zaino is an Indexer developed in Rust by the Zingo team, that aims to replace lightwalletd and to push forward the zcashd deprecation project.

Zaino offers essential features for both 'light' clients, such as wallets and applications that do not require the full blockchain history, and 'full' clients or wallets. It also supports block explorers, granting access to both the finalized blockchain and the non-finalized best chain and mempool managed by a Zebra or Zcashd full validator.

###  ZLN (zcash-local-net) ([Github](https://github.com/zingolabs/zcash-local-net))
A set of utilities that launch and manage Zcash processes. This is used for integration testing in the development of:
- lightclients
- indexers
- validators

Its goal is to offer a highly adaptable and sturdy testing environment for core nodes (validators) such as zcash and zebra, indexers like lightwallet and zaino, minimally, zingo-cli as a light client wallet.

This repository is designed to compare the functionality of various validators (like Zcashd and Zebrad) and indexers (such as Lightwalletd and Zaino) to facilitate the migration during the Zcashd deprecation process.

In addition to providing tools to start, cache, and load Zcash chain data (for mainnet, testnet, and regtest), zcash-zocal-net includes a series of tests to compare the capabilities of Lightwalletd and Zaino across all Lightwallet RPC services. These tests can be executed directly from Zaino (see docs/testing.md]) to assess the Lightwallet RPC services hosted in Zaino.

