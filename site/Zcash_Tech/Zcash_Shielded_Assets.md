[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md)
[![](https://i.ibb.co/0VfMFB5/image-2023-11-18-160742427.png)](https://github.com/ZecHub/zechub/blob/main/site/Zcash_Tech)

# Zcash Shielded Assets

## TL;DR

Zcash Shielded Assets (ZSA) are a proposed protocol extension that would let assets **other than ZEC** — stablecoins, governance tokens, or any custom asset — live inside Zcash's shielded pool, with the sender, the recipient, and the amount kept private.

- **What it is:** ERC-20-style custom assets, but shielded by default.
- **Who is building it:** [QEDIT](https://qed-it.com/), under a grant from the Zcash Foundation, in collaboration with the Electric Coin Company.
- **How it is specified:** [ZIP 226](https://zips.z.cash/zip-0226) (transfer and burn) together with [ZIP 227](https://zips.z.cash/zip-0227) (issuance).
- **Status:** not live on mainnet. The ZSA protocol is scheduled for deployment in Network Upgrade 7 (NU7).
- **Fees:** always paid in ZEC, regardless of the asset being moved.

---

## Core Explanation

Zcash Shielded Assets (ZSA) are a proposed improvement to the Zcash protocol that would enable the creation, transfer, and burn of custom assets on the Zcash chain.

If you are familiar with the [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token standard on the Ethereum blockchain, ZSAs are to Zcash as ERC-20 tokens are to Ethereum.

Zcash Shielded Assets would enable the creation of custom tokens on the Zcash blockchain, thereby allowing tokens other than [ZEC](/guides/using-zec-privately) to benefit from the anonymity and privacy of shielded transactions on the Zcash blockchain.

A major potential use of ZSAs would be to issue stablecoins on the Zcash protocol. Stablecoins are cryptocurrencies that peg their value to a fiat currency, such as the US Dollar or Euro. Currently, some of the most widely circulated stablecoins are ERC-20 tokens such as [USDC](https://www.circle.com/en/usdc) and [Dai](https://docs.makerdao.com/).

Another potential use of ZSAs would be for the issuing of governance tokens. For example, Zechub (the publisher of this wiki) is a Decentralized Autonomous Organization (DAO) and could create and issue to its members a ZSA for voting on proposals and governance decisions.

ZSAs are being developed by [QEDIT](https://qed-it.com/), under a major grant from the [Zcash Foundation](/zcash-organizations/zcash-foundation) in collaboration with the [Electric Coin Company](/zcash-organizations/electric-coin-company). As this project is still being actively developed, updates are posted on [this thread](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) of the Zcash forum. The [ZSA grant application](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) by QEDIT is available from the Zcash Foundation grants website.

---

## Visual / Analogy

### The sealed envelope

Picture a Zcash shielded transaction as a plain, sealed envelope dropped into a public mailbox. Anyone can see that an envelope was posted. Nobody can see who sent it, who collects it, or what is inside — and every envelope looks identical to every other one.

Today, an envelope on the Zcash network can only carry one thing: ZEC.

ZSA does not change the envelope. It changes **what is allowed inside it**. After ZSA, the same sealed envelope could carry a stablecoin, a DAO governance token, or a company loyalty point — and from the outside it would still look exactly like every other envelope on the network.

One detail is worth holding on to: **the postage is always paid in ZEC**, no matter what is inside the envelope.

### What an outside observer can see

| An observer can see... | ERC-20 on Ethereum | ZSA on Zcash |
| --- | --- | --- |
| Who sent it | Public | Shielded |
| Who received it | Public | Shielded |
| How much was moved | Public | Shielded |
| Individual balances | Public | Shielded |
| Total supply of the asset | Public | **Public — deliberately** |
| Currency the fee is paid in | ETH | ZEC |

### Why the supply row is not a bug

The bottom two rows of the table are where ZSA gets interesting.

ZIP 227 deliberately keeps **issuance transparent**, so that the circulating supply of every asset can be tracked on-chain. Individual holdings and individual payments stay private; the total number of tokens in existence does not.

For a stablecoin issuer, that combination is the point rather than a compromise. Reserves can be audited against a publicly verifiable supply, while the people actually using the token keep their balances and payments to themselves.

### One asset, one identity

Every asset gets a unique **Asset Identifier**, derived from the issuer's issuance key together with a text description of the asset. Two different issuers cannot produce the same identifier, and minting or changing an asset requires cryptographic authorization from its issuer. In envelope terms: anyone can post an envelope, but only the mint that owns a given asset can print more of it.

---

## Deep Dive

### ZSA Demo on Zebra

[![Video Thumbnail](https://i.ytimg.com/vi/1MZMGC9ViyA/hqdefault.jpg?)](https://youtu.be/1MZMGC9ViyA)

**Run the demo for yourself!**

Clone the zcash-tx-tool repository: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Improvement Proposals (ZIPs)

[ZIP 226](https://zips.z.cash/zip-0226): Transfer and Burn of Zcash Shielded Assets
[ZIP 227](https://zips.z.cash/zip-0227): Issuance of Zcash Shielded Assets
[ZIP 230](https://zips.z.cash/zip-0230): Version 6 Transaction Format

> **Note on ZIP 230:** ZIP 230 has since been withdrawn and will not be deployed. Transaction version 6 is now defined by [ZIP 229](https://zips.z.cash/zip-0229). See the notice at the top of the [ZIP 230](https://zips.z.cash/zip-0230) page.

ZIP 226 defines the OrchardZSA protocol — an extension of the Orchard protocol that carries the transfer and burn of custom assets. ZIP 227 defines how those assets are created in the first place, and must only be implemented alongside ZIP 226.

### ZSA Grant Proposal

The ZSA proposal for Shielded Assets (ZSA/UDA) was presented by the [QEDIT](https://qed-it.com/) team to build generic shielded assets on the Zcash blockchain. These are usually referred to as User Defined Assets (UDA) or as Zcash Shielded Assets (ZSA).

With this proposal, the team at [QEDIT](https://qed-it.com/) plans to bring DeFi to the Zcash ecosystem and, at the same time, enable the use of the best privacy technology within the existing DeFi ecosystem. In a poll survey, the team asked, and the community answered that [generic shielded assets (ZSA/UDA) are the most requested feature at the moment](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

These proposals are technically adherent to the [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) specification and are defined in ZIP 226 & ZIP 227.

- [ZIP 226](https://zips.z.cash/zip-0226): Transfer and Burn of Zcash Shielded Assets
- [ZIP 227](https://zips.z.cash/zip-0227): Issuance of Zcash Shielded Assets
- [ZIP 230](https://zips.z.cash/zip-0230): Version 6 Transaction Format

---

## Practical Implications

**If you hold or use ZEC**

- ZSAs are defined as an extension of Orchard ("OrchardZSA"), so they would share the shielded machinery ZEC already uses. Your wallet will need explicit ZSA support before it can hold or send them.
- You will always need some ZEC on hand. Fees for issuing and transferring a ZSA are paid in ZEC, not in the asset itself.
- Nothing about your existing ZEC transactions changes.

**If you are a potential issuer — a stablecoin, a DAO, a company**

- Issuing an asset requires cryptographic authorization tied to an issuance key, so only you can mint or change the attributes of your own asset.
- Your asset's circulating supply is publicly auditable while your users' balances and transfers are not. For a regulated issuer, this is usually the exact combination required.
- A single issuance transaction can create more than one asset at once.

**For the ecosystem**

- Because every ZSA fee is denominated in ZEC, activity in any future asset issued on Zcash creates demand for ZEC itself.

---

## Common Mistakes

| Common belief | What is actually the case |
| --- | --- |
| "ZSAs are live on Zcash today." | They are not. ZSA is scheduled for deployment in Network Upgrade 7 (NU7) and is still under review and testing. |
| "ZSA brings smart contracts to Zcash." | ZSA specifies the issuance, transfer and burn of assets. It is not a general-purpose programmable contract layer. |
| "You can pay ZSA fees in the ZSA token itself." | Fees are paid in ZEC. |
| "If it is shielded, the token supply must be secret too." | ZIP 227 makes issuance transparent on purpose, so the supply of each asset can be tracked publicly. Balances and transfers stay private; the supply does not. |
| "ZIP 230 is the current version 6 transaction format." | ZIP 230 has been withdrawn. Version 6 is now defined by ZIP 229. |

---

## Related Pages

- [Halo](/zcash-tech/halo) — the proving system behind Orchard, the protocol ZSA extends
- [Zk-SNARKs](/zcash-tech/zk-snarks) — the zero-knowledge proofs that let a shielded transfer be verified without being revealed
- [Shielded Pools](/using-zcash/shielded-pools) — where ZSAs would live alongside ZEC
- [Transactions](/using-zcash/transactions) — how a Zcash transaction is put together
- [Zebra Full Node](/zcash-tech/zebra-full-node) — the node implementation used in the ZSA demo above
