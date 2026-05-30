# Viewing Keys

## TL;DR

A viewing key is a cryptographic key derived from a Zcash shielded address that allows its holder to view transactions sent to or from that address without the ability to spend funds. Viewing keys enable selective disclosure: an exchange, auditor, or compliance officer can verify shielded activity while the spending key remains on secure hardware. Incoming viewing keys for Sprout shielded addresses were added in zcashd 1.0.14, and Full Viewing Keys in the modern sense were introduced in the Sapling network upgrade. Security properties are documented in [ZIP 310](https://zips.z.cash/zip-0310). Unified Viewing Keys, which bundle viewing keys for Transparent, Sapling, and Orchard pools into one string, are standardized in [ZIP 316](https://zips.z.cash/zip-0316).

## Core Explanation

Shielded addresses enable users to transact while revealing as little information as possible on the Zcash blockchain. What happens when you need to disclose sensitive information around a shielded Zcash transaction to a specific party? Every shielded address includes a viewing key. Viewing keys for Sprout shielded addresses were added to zcashd in version 1.0.14; the Full Viewing Key (FVK) was introduced with the Sapling network upgrade, and its security properties are documented in ZIP 310. Viewing keys are a crucial part of Zcash, as they enable users to disclose transaction information selectively.

### Why use a viewing key?

Why would a user ever want to do this? From Electric Coin Co.'s blog on the matter:

- An exchange wants to detect when a customer deposits ZEC to a shielded address, while keeping the spend authority keys on secure hardware. The exchange could generate an incoming viewing key and load it onto an Internet-connected detection node, while the spending key remains on the more secure system.

- A custodian needs to provide visibility of their Zcash holdings to auditors. The custodian may generate a full-viewing key for each of their shielded addresses and share it with their auditor. The auditor will be able to verify the balances for those addresses and review past transaction activity to and from them.

- An exchange may need to conduct due diligence checks on a customer who makes deposits from a shielded address. The exchange could request the customer’s viewing key for their shielded address and use it to review the customer’s shielded transaction activity as part of these enhanced due diligence procedures.

## Deep Dive

### Security properties

[ZIP 310](https://zips.z.cash/zip-0310) documents what a holder of a Sapling Full Viewing Key learns about a wallet, and with what level of guarantee. Some information is cryptographically guaranteed by the protocol (for example, whether a given address belongs to the FVK, or the nullifiers of received notes), some is unverified (for example, memo field contents, which can be forged by the sender), and some is undefined (for example, whether an output is change or a payment to a third party).

Key points from the security analysis:

- A Sapling FVK reveals the nullifiers of received notes, so the holder can detect when those notes are later spent. This is a difference from Sprout viewing keys, where nullifier visibility was not provided.
- Computed balances from an FVK are guaranteed to be a lower bound on the actual balance. Out-of-band transactions that do not follow the standard protocol may not be detected, which can cause the displayed balance to be lower than the true balance, but never higher.
- Holding multiple FVKs allows correlation across the corresponding wallets: a party with FVKs for several wallets can detect when those wallets pay each other, and can identify common recipients across them.

## Practical Implications

### How to find your viewing key

zcashd

* List all known addresses using ./zcash-cli listaddresses
* Then issue the following command for either UA’s or Sapling shielded addresses:

./zcash-cli z_exportviewingkey "<zaddr>"

#### Ywallet

In the top-right corner, select “Backup”, authenticate your phone, then copy the viewing key displayed.

How to use your viewing key

#### zcashd (deprecated in 2025)

Use the following with any Sprout or Sapling vkey:

./zcash-cli z_importviewingkey "vkey" whenkeyisnew 30000

Per the official zcashd RPC help, importing Unified viewing keys is not yet supported via z_importviewingkey. The command accepts Sprout and Sapling viewing keys exported by z_exportviewingkey.

Note: zcashd is being deprecated in 2025 and is being replaced by `zebrad` (full node) and Zallet (wallet). See [Migration Guide: zcashd to zebrad and Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet) for the latest workflow. Equivalent commands in the new stack may differ.

Ywallet

In the top right corner, select “Account”, click on “+” in the bottom right corner to add and import your viewing key to add your ‘read-only’ account.

[![](https://camo.githubusercontent.com/a0fcc8a38d5c61f99c36fc9305e0ef5021658bf5c4ed2b8c64c269cb196de25f/68747470733a2f2f692e6962622e636f2f4330623030324e2f696d6167652d323032342d30312d31332d3137353535343637362e706e67)](https://github.com/ZecHub/zechub/blob/main/site/Zcash_Tech)

zcashblockexplorer.com

Point your browser to [zcashblockexplorer.com/vk](https://zcashblockexplorer.com/vk) and wait for the results. Note: this result is now on the zcashblockexplorer node, and thus you’re trusting this info with the owners of zcashblockexplorer.com.

## Common Mistakes

* Sharing a viewing key gives the recipient read access that the protocol cannot revoke. Past and future activity for the associated address remains visible to them; the only way to restore privacy is to stop using that address.
* A Full Viewing Key cannot authorize spends and cannot be used to reconstruct the spending key. The “Full” refers to seeing both incoming and outgoing activity, not to full control of funds.
* Balance computed from a viewing-key scan is a lower bound, not an exact figure. [ZIP 310](https://zips.z.cash/zip-0310) guarantees that the displayed balance will not exceed the actual balance, but out-of-band payments that do not follow the standard protocol may cause it to be lower.

### Resources

It is recommended to use viewing keys on an as-needed basis. The resources below cover background, security properties, and use cases:

* [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
* [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
* [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
* [ZIP 310](https://zips.z.cash/zip-0310)

Related Pages

* [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools)
* [Unified Addresses](https://zechub.wiki/using-zcash/shielded-pools)
* [Sapling](https://zechub.wiki/using-zcash/shielded-pools)
* [Orchard](https://zechub.wiki/using-zcash/shielded-pools)
* [Halo](https://zechub.wiki/zcash-tech/halo)
