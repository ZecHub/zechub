
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="https://i.ibb.co/0VfMFB5/image-2023-11-18-160742427.png" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

Zcash Shielded Assets (ZSA) are a proposed improvement to the the Zcash protocol that would enable the creation, transfer, and burn of custom assets on the Zcash chain.

If you are familiar with the [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token standard on the Ethereum blockchain, ZSAs are to Zcash as ERC-20 tokens are to Ethereum.

Zcash Shielded Assets would enable the creation of custom tokens on the Zcash blockchain, thereby allowing tokens other than [ZEC](https://wiki.zechub.xyz/using-zec-privately) to benefit from the anonymity and privacy of shielded transactions on the Zcash blockchain.

A major potential use of ZSAs would be for the issuing of stablecoins on the Zcash protocol. Stablecoins are cryptocurrencies that peg their value to a fiat currency, such as the US Dollar or Euro. Currently, some of the most widely circulated stablecoins are ERC-20 tokens such as [USDC](https://www.circle.com/en/usdc) and [Dai](https://docs.makerdao.com/).

Another potential use of ZSAs would be for the issuing of governance tokens. For example, Zechub (the publisher of this wiki) is a Decentralized Autonomous Organization (DAO) and could create and issue to its members a ZSA for the purpose of voting on proposals and governance decisions.

ZSAs are being developed by [QEDIT](https://qed-it.com/), under a major grant from the [Zcash Foundation](https://wiki.zechub.xyz/zcash-foundation) in collaboration with the [Electric Coin Company](https://wiki.zechub.xyz/electric-coin-company). As this project is still being actively developed, updates are posted on [this thread](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) of the Zcash forum. The [ZSA grant application](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) by QEDIT is available from the Zcash Foundation grants website.

> As a reference, QEDITs original forum post about their proposal can be found [here](https://forum.zcashcommunity.com/t/a-proposal-for-shielded-assets-zsa-uda-for-defi-on-zcash/40520).

___

<a href="">
    <img src="https://i.ibb.co/6Zq0ry6/image-2023-11-18-160923363.png" alt="" width="600" height="170"/>
</a>

___

## Grant Milestones

Below is the list of grant milestones status as of April 28th, 2023

| Milestone  | Feature | Status |
| -------- | --------- | --------- |
| 1 | Transfer Functionality ZIP        | ✅ - Paid - 2/18/22      |
| 2 | Issuance Mechanism ZIP        | ✅ - Paid - 5/18/22      |
| 3 | Issuance Mechanism Implementation        | ✅ - Paid - 10/24/22      |
| 4 | Fees Structure ZIP       | ✅      |
| 5 | Transfer Protocol Implementation PR        | ✅      |
| 6 | Transfer Circuit Implementation PR        | ❌     |
| 7 | ZSA Protocol Specification        | ✅ |
| 8 |  Fees Structure Implementation PR        | ❌    |
| 9 | Node Wallet State Implementation on Zcashd        | ❌      |
| 10 | Strengthening Protocol Security and Efficiency       | ✅  |
| 11 | Preparing Protocol for Integration and Deployment       | ✅    |

NOTE: <br /> ✅ -> Completed <br /> ❌ -> Not completed <br /> TBD -> To be determined


## The ZSA Proposal

The ZSA proposal for Shielded Assets (ZSA/UDA) was presented by the [QEDIT](https://qed-it.com/) team to build generic shielded assets on the Zcash blockchain. These are usually referred to as User Defined Assets (UDA) or as Zcash Shielded Assets (ZSA).

With this proposal, the team at [QEDIT](https://qed-it.com/) plans to bring DeFi to the Zcash ecosystem, and at the same time enable the use of the best privacy technology within the existing DeFi ecosystem with regards to a pool survey, where the team asked, and the community answered: [generic shielded assets (ZSA/UDA) are the most requested feature at the moment](https://twitter.com/BenarrochDaniel/status/1428327864034791429)

This proposals are technically adherant to the [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) specification and are defined in ZIP 226 & ZIP 227.

1. [ZIP 226](https://qed-it.github.io/zips/zip-0226): Transfer and Burn of Zcash Shielded Assets
2. [ZIP 227](https://qed-it.github.io/zips/zip-0227): Issuance of Zcash Shielded Assets
