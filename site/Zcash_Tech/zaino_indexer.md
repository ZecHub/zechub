# Zaino Indexer

Zaino is an Indexer, developed in Rust by the Zingo team, that aims to replace lightwalletd and to push forward the zcashd deprecation project.

Zaino offers essential features for both light clients, such as wallets and applications that do not require the full blockchain history, and full clients or wallets. It also supports block explorers, granting access to both the finalized blockchain and the non-finalized best chain and mempool managed by a Zebra or Zcashd full validator.

## Why a new Indexer?

The main reason is getting ready for the future. Zcashd and lightwalletd were built in 2016 forked from bitcoind code, using C plus. The platform and code used to build both services is starting to get old, difficult to scalate, maintain and to build modern features on.

Rust is a modern, robust and secure language that allows Zcash to be prepared for future development, inviting new developers to build plenty of new functionality on and around the Zcash ecosystem.

Still, Zaino aims to be backwards compatible where possible, Providing APIs and interfaces that help to reduce friction in adoption and ensure that the broader Zcash ecosystem can benefit from Zainos enhancements without significant rewrites or learning curves.

Also, Zaino will allow to separate light client functionality from the full node, via RPC access and a complete client library, allowing developers to integrate Zaino and access chain data directly from their light client application, keeping the sensitive data from Zebra node insulated and secure.

## Some diagrams showing how Zaino works

### Zaino Internal Architecture
![Zaino Internal Architecture](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Zaino Live Service Architecture
![Zebra Live Service Architecture](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Zaino System Architecture
![Zaino System Architecture](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## Where Can I learn more?
You can read more about Zaino Indexer in the official [Zcash Community Forum thread](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) or in its official [Github page](https://github.com/zingolabs/zaino)
