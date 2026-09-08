# Zcash Library

A comprehensive glossary of key terms, concepts, and resources related to Zcash.

### Quick Navigation
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Term | Definition |
|------|-----------|
| Actions | Instead of creating several individual proofs for each Spend and Output, Orchard protocol merges them into a single Action. |
| Addresses | Zcash has Shielded (Z/zaddr) and Transparent (T/taddr) addresses. Unified addresses (UA) are phasing in to replace Z and T following the NU5 upgrade. |
| Arborist Call | A bi-weekly call covering Zcash protocol and research development updates. Hosted on the Zcash Community Forum and Discord. [Meeting Notes](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Forum Announcements](https://forum.zcashcommunity.com) |
| Auto-shielding | Enables users (more specifically their wallets) to automatically move funds from a transparent address to the latest shielded ZEC pool. |

## B

| Term | Definition |
|------|-----------|
| Benchmarking | Miners are able to submit metrics on the efficiency of various hardware used to mine Zcash. [View here](https://zcashbenchmarks.info) |
| Block | A Block is a record in the Zcash blockchain that contains a set of transactions sent on the network. Roughly every 75 seconds, on average, a new block is appended to the blockchain. |
| Block Explorer | An online tool to view all transactions, past and current, on the blockchain. [Zcash Block Explorer](https://zcashexplorer.app/) |
| Blogs | [ZODL Blog (formerly Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation Blog](https://zfnd.org/blog/) / [ZecHub Blog](https://zechub.wiki/zechub-dao) |
| Blossom | The 3rd Major Network Upgrade for Zcash. [More Info](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Term | Definition |
|------|-----------|
| Canopy | The 5th Major Network Upgrade for Zcash. [More Info](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Allows a committer to commit to a polynomial with a short string that can be used by a verifier to confirm claimed evaluations of the committed polynomial. Useful for reducing communication costs in the Zcash protocol. |
| Community | [The Official Zcash Community Forum](https://forum.zcashcommunity.com) / [Zcash Community Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | A proposed hybrid consensus design that keeps proof-of-work block production and adds a proof-of-stake finality layer on top, so blocks gain stronger finality without abandoning mining. It grew out of Trailing Finality Layer research and is being built by Shielded Labs, still in testnet development as of 2026. |
| CrossPay | A feature in the Zodl wallet that lets you spend shielded ZEC while the recipient is paid in the asset and chain they prefer, routed through NEAR Intents rather than a centralized exchange. |
| Cypherpunk Zero | A Creative Universe and collaborative effort between ECC, illustrator Stranger Wolf, Mighty Jaxx and select ecosystem partners. [Cypherpunk Zero Site](https://halo.electriccoin.co/?utm_source=ECC&utm_medium=Website&utm_campaign=None) / [Opensea Collection](https://opensea.io/collection/cypherpunk-zero) |

## D

| Term | Definition |
|------|-----------|
| DeFi | Projects integrating ZEC with DeFi: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [Near Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [ThorSwap](https://app.thorswap.finance/) |
| Deshielding | Refers to a transaction being sent from a zaddr (shielded address) to a taddr (transparent address). The origin of the transaction is not visible however the funds enter a publicly visible value pool. |
| Developer Resources | [Developer Resources](https://www.zcashcommunity.com/developers/) |
| Documentation | [Official Docs](https://zcash.readthedocs.io/en/latest/) |

## E

| Term | Definition |
|------|-----------|
| ECC | The Electric Coin Company, the team that launched the Zcash protocol, previously known as the Zcash Company. Its entire engineering team resigned in January 2026 following a governance dispute with the Bootstrap board, and went on to form ZODL. |
| ECDSA | Elliptic Curve Digital Signature Algorithm is a cryptographically secure digital signature scheme. The ECDSA sign/verify algorithm relies on elliptic curve point multiplication. |
| Education | Learning oriented videos explaining Zcash [here](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | An additional field for transactions sent to shielded addresses that is visible to the recipient of a payment. The encrypted memo is visible only to the sender and recipient. |
| Equihash | The memory-oriented proof-of-work mining algorithm that is used on Zcash. |
| Events | The calendar of Zcash-related events can be viewed on [Luma](https://luma.com/zcash) and [Zcash Foundation](https://zfnd.org/zf-events/) |
| Exchanges | [List of Exchanges supporting Zcash](https://z.cash/exchanges/) |

## F

| Term | Definition |
|------|-----------|
| Fiat-Shamir | A technique for taking an interactive proof of knowledge and creating a digital signature based on it. This way, some fact (e.g. knowledge of a secret) can be publicly proven without revealing underlying information. |
| Formal Verification | Proving mathematically that a system behaves exactly as specified, rather than relying on testing alone. The Ironwood Action circuit was verified this way by contributors from zkSecurity and ZODL using the Lean theorem prover, to demonstrate the absence of soundness bugs. |
| Founders Reward | The Founder reward represents 20 percent of the total block reward and it is deducted from every block's value and transparently distributed to drive protocol development and growth. |
| Free2z | A tool for anonymous content and private donations powered by Zcash. [Free2z](https://free2z.com) |
| FROST | Flexible Round-Optimized Schnorr Threshold signature scheme. [Research Paper](https://eprint.iacr.org/2020/852) |

## G

| Term | Definition |
|------|-----------|
| Governance | Decisions from the ZIP process are written into the Zcash specification, as well as the software that runs the network. The changes are ratified on-chain when the majority of the network adopts the upgrade and does not break consensus. [Full Protocol History](https://zfnd.org/protocol-governance/) |

## H

| Term | Definition |
|------|-----------|
| Halo | Enables circuit upgrades without the need for trusted setups, making the Zcash shielded protocol more agile for future improvements and extensions. [Technical Explainer](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | Hierarchical deterministic wallets generate a series of key pairs from one seed, providing convenience and manageability as well as high-level security. |
| Heartwood | The 4th Major Network Upgrade of Zcash. [More Info](https://z.cash/upgrade/heartwood/) |

## I

| Term | Definition |
|------|-----------|
| Index | CoinDesk's ZCX Index represents a real-time, USD-equivalent spot rate for Zcash. [Price Index](https://www.coindesk.com/indices/zcx/) |
| Integrations | You can accept Zcash payments through a number of 3rd party providers. [Payment Processors](https://z.cash/zcash-for-business/) |
| Interactive Proof System | An abstract machine that models computation as the exchange of messages between two parties: a Prover and a Verifier. |
| Investment | A number of Financial options are available for institutional investors or family offices who want to gain exposure to Zcash. [Full list](https://z.cash/investors/) |
| Ironwood | The network upgrade (NU6.3) that activated on mainnet on 28 July 2026 at block 3,428,143. It introduced a new shielded pool, also called Ironwood, and made the Orchard pool spend-only so existing value migrates across the turnstile. [More info](/zcash-tech/ironwood) |

## J

| Term | Definition |
|------|-----------|
| JubJub | An elliptic curve designed to be efficiently implementable in zk-SNARK circuits. |

## K

| Term | Definition |
|------|-----------|
| Keystone Wallet | An air-gapped hardware wallet with native Zcash (Orchard shielded) support, compatible with ZODL for cold signing. [Keystone](https://keyst.one) |

## L

| Term | Definition |
|------|-----------|
| Layer-1 | Refers to a base network and its underlying infrastructure. Layer-1 blockchains can validate and finalize transactions without the need for another network. Zcash is an L1 blockchain. |
| librustzcash | A Rust workspace containing all crates and dependencies for working with Zcash. [repo](https://github.com/zcash/librustzcash) |
| Lightwalletd | A stateless server that serves light clients with blockchain information. [Lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Term | Definition |
|------|-----------|
| Metrics | Network metrics are available [here](https://tokenterminal.com/explorer/projects/zcash/metrics/all) |
| Metadata | Data that is generated alongside a user's Zcash transaction. This can include block height, transaction version or expiry height etc. |
| Mobile SDK | A lightweight SDK that connects Android to Zcash, allowing third-party Android apps to send and receive shielded transactions. [Github](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | The process where for each block, nodes in the Zcash network compete by doing complex mathematical calculations to find a solution based on a self-adjusting difficulty. [Guide](https://z.cash/mining-zcash/) |
| Multisignature | An address which requires multiple private key signatures in order to spend funds. Currently, multisig functionality is only supported by transparent addresses. |

## N

| Term | Definition |
|------|-----------|
| Network Sustainability Mechanism (NSM) | A proposal from Shielded Labs to burn a share of transaction fees so the protocol's long-term security budget does not rest entirely on issuance. Specified in ZIP 234, under review in 2026. |
| Nighthawk | A Mobile wallet for Zcash. [Website](https://nighthawkwallet.com) |
| Noir Wallet | A Zcash browser extension wallet supported by Zcash Community Grants, built to connect shielded ZEC directly to browser applications instead of relying on QR codes and manual transfers. [zknoir.com](https://www.zknoir.com/) |
| NU5 | The 6th Major Network Upgrade for Zcash, introducing the Orchard shielded pool and Unified Addresses. [More Info](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | The 7th Major Network Upgrade for Zcash, adjusting the block subsidy to fund the Zcash Community Grants program and Shielded Labs. Activated in late 2024. [More Info](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | The next major network upgrade after Ironwood. Candidate features include Project Tachyon's scaling work, Zcash Shielded Assets, and the Network Sustainability Mechanism. |

## O

| Term | Definition |
|------|-----------|
| Oblivious Synchronization | A method under development in Project Tachyon that lets a wallet request the data it needs from an untrusted server without revealing which notes it is asking about. The server never learns your nullifiers, because the protocol makes them evolve in an unlinkable way. [Write-up](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard Shielded Pool | The third shielded pool for Zcash and represents the continued evolution of our zk-SNARK technology stack. [Full details](https://electriccoin.co/blog/explaining-halo-2/) |
| Overwinter | The 1st Network Upgrade for Zcash. [More Info](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Term | Definition |
|------|-----------|
| Payments | It is possible to use Zcash for everyday purchases through a number of different payment providers. [Payment Apps](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | A primitive where data travels alongside a proof of its own correctness, so combining data also combines the proofs. Project Tachyon rebuilds the shielded protocol around PCD, letting each wallet carry a recursive proof that its own balance is correct instead of rescanning the chain. The Zcash implementation is [Ragu](https://github.com/tachyon-zcash/ragu), which follows Halo and needs no trusted setup. |
| Peer-to-Peer Network | P2P networks are based on the concept of decentralization. The foundational architecture of blockchain technology. |
| PIR (Private Information Retrieval) | Techniques that let you fetch a record from a server without the server learning which record you asked for. Under active research for Zcash as a way for light wallets to retrieve what they need without leaking what they are looking for. |
| Podcast | [Radiolab (Zcash Ceremony)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Term | Definition |
|------|-----------|
| QR Code | A machine-readable code used to encode Zcash addresses for easy scanning. Unified Addresses (UAs) are typically shared via QR codes in modern Zcash wallets. |
| Quantum Recoverability | A property of Ironwood notes, specified in [ZIP 2005](https://zips.z.cash/zip-2005), that keeps a coin's on-chain record recoverable if a future quantum computer breaks the cryptography protecting it today. It is a recovery path rather than quantum resistance, and it applies to Ironwood notes, not to existing Sprout, Sapling or Orchard funds. |

## R

| Term | Definition |
|------|-----------|
| Recovery Phrase | A sequence of 12 or 24 letters and numbers used to back up and restore a wallet. In Zcash, this phrase regenerates spending and viewing keys, making it critical for fund recovery and security. |

## S

| Term | Definition |
|------|-----------|
| Sapling | A major network upgrade that introduced significant efficiency improvements for shielded transactions and paved the way for mobile adoption. Activated at block 419200. |
| Selective Disclosure | Allows the owner of a shielded address to selectively share viewing keys or payment disclosures with third parties while keeping data private from everyone else. |
| Shielded Address | Also called zaddr. Starts with z. Hides sender, receiver, amount, and memo using zk-SNARKs. |
| Shielded Labs | An independent organization working on Zcash protocol economics and consensus. Currently leads Crosslink and the Network Sustainability Mechanism. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | A transaction exclusively between shielded addresses. Fully private on the blockchain. |
| Sol/s | Solutions per second - measures Equihash mining performance. |
| Spending Key | The private key that allows spending from a shielded address (also lets you view balance and history). |
| Sprout | The original shielded protocol version of Zcash (launched 2016). |

## T

| Term | Definition |
|------|-----------|
| Tachyon | Zcash's scaling programme, targeted at NU7. It moves wallets away from scanning every block toward proof-carrying wallet state, oblivious synchronization and prunable node state, aiming for shielded throughput in the thousands of transactions per second. [Project site](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash (valueless test currency). |
| Testnet | A separate blockchain for testing upgrades and features before mainnet. |
| Trailing Finality Layer (TFL) | Research into adding a finality layer behind Zcash's proof-of-work chain so recent blocks can be finalized without replacing mining. Crosslink is the design that came out of it. |
| Transaction | A payment between users, submitted to the network and eventually confirmed in a block. |
| Transaction Expiry | Transactions expire after approximately 25 minutes (20 blocks) if unconfirmed; funds return automatically. |
| Transaction Fee | Default fee is 0.0001 ZEC. Higher fees get priority; very low fees may cause delays or expiry. |
| Transparent Address | Also called taddr. Starts with t. Fully public (like Bitcoin). |
| Transparent Transaction | A transaction exclusively between transparent addresses - everything is publicly visible. |
| Turnstile | The accounting rule that tracks how much value enters and leaves each shielded pool, so no pool can release more than went into it. Used at every pool transition in Zcash's history, and currently guarding the migration from Orchard into Ironwood. [More info](/zcash-tech/the-turnstile) |

## U

| Term | Definition |
|------|-----------|
| Unified Address | Modern address format (introduced in NU5) that works for both transparent and shielded payments in one string. |
| Upgrade Activation | The specific block height where a network upgrade (e.g. NU5, NU6) automatically activates. |

## V

| Term | Definition |
|------|-----------|
| Viewing Key | A private key that lets you view the balance and transaction history of a shielded address without being able to spend the funds. |

## W

| Term | Definition |
|------|-----------|
| Wallet | Software or hardware that stores private keys and lets you send/receive ZEC. Active wallets include ZODL (iOS/Android), Zingo! (mobile/desktop), Nighthawk (Android), Zkool (mobile/desktop), Zallet (upcoming), and Keystone (hardware). For a full list, see [Zcash Ecosystem Wallets](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | The first JavaScript SDK for Zcash, built by ChainSafe for browser environments. It underpins the Zcash Shielded Wallet snap that brought shielded ZEC to MetaMask. |

## X

| Term | Definition |
|------|-----------|
| XZC | An older ticker symbol for Zcash used on some legacy exchanges. The official ticker is ZEC. |

## Y

| Term | Definition |
|------|-----------|
| YWallet | A privacy-focused Zcash wallet supporting Orchard, Sapling and transparent addresses, known for fast sync. No longer maintained: its developer has confirmed it will not be updated for Ironwood, so it can no longer follow the network. Zkool, by the same developer, is the maintained successor. |

## Z

| Term | Definition |
|------|-----------|
| Zcash | Privacy-focused cryptocurrency using zk-SNARKs. Bridges transparent (Bitcoin-style) and fully shielded payments. |
| Zcash Foundation | Independent non-profit that supports the Zcash ecosystem, funds development, and promotes privacy. |
| Zcash Network | Peer-to-peer network of nodes that validates transactions and maintains the blockchain. |
| ZEC | The official currency code for Zcash (some exchanges still show XZC). |
| Zerocash | The academic protocol (2014) that Zcash is based on. |
| Zaino | The next-generation Zcash indexer replacing lightwalletd, built by the Zcash Foundation. Enables light clients to sync faster and more privately. Part of the Zcash Z3 infrastructure upgrade. |
| Zakura | A Zcash full node implementation released in July 2026, built as a fork of Zebra by Valar Group and Project Tachyon. It targets throughput and sync speed, with snapshot bootstrapping and a stated goal of card-network scale, around 50,000 transactions per second. [zakura.com](https://zakura.com) |
| Zallet | The wallet component that took over zcashd's wallet functions when it was retired, built on Zaino as part of the Zcash Z3 infrastructure work. |
| Zebra | The Zcash Foundation's Rust-based full node implementation (alternative to zcashd). Production-ready and actively maintained. [GitHub](https://github.com/ZcashFoundation/zebra) |
| zcashd | The original Zcash full node, forked from Bitcoin Core. Retired in July 2026 after a long deprecation, with its roles split between Zebra for consensus and Zallet for wallet functions. |
| ZIP | Zcash Improvement Proposal - the community governance process used to propose and ratify protocol changes. [ZIP Repository](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab. The independent organization founded in early 2026 by Josh Swihart and the former Electric Coin Company engineering team after they resigned over a governance dispute with Bootstrap. It raised over $25 million in seed funding in March 2026 and maintains the Zodl wallet, which was renamed from Zashi in February 2026. [zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — the cryptography powering Zcash shielded transactions. Allows proving a statement (e.g., valid spend) without revealing any secret information. |
| ZSA (Zcash Shielded Assets) | User-issued tokens that inherit Zcash's shielded privacy, letting assets other than ZEC move privately on the network. Specified in [ZIP 226](https://zips.z.cash/zip-0226) and a candidate feature for NU7. |

---

**Last updated:** July 2026
**Want to contribute?** [Edit this page on GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
