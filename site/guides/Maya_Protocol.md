# Maya Decentralised Exchange

## What is Maya Protocol?

Maya is a [decentralized exchange](https://nym.com/blog/what-is-dex) (DEX) system that enables trading of cryptocurrencies across different blockchains. You can, for example, swap Bitcoin (BTC) on the Bitcoin blockchain with Ethereum (ETH) on the Ethereum blockchain in an easy way, without holding the assets or involving any centralized authorities or Know Your Customer (KYC) procedures.

Maya Protocol was developed using the Cosmos Software Development Kit (Cosmos SDK) and operates on a Proof of Bond (PoB) consensus mechanism. The protocol is upheld by "Node Operators," who stake capital into the system and earn returns as a reward for their contribution and efforts. Essentially, nodes are computers running software that validates user swaps and oversees assets in designated addresses across different blockchains.

To complete a swap, the supported cryptocurrency must be received in one of Maya's addresses, sent by a user, and then an equivalent amount is sent from another of Maya's addresses on a different blockchain. This process is managed and approved by at least two-thirds of the nodes, particularly ensuring that the funds are properly received.

In this manner, users can send one type of token on one blockchain and receive a different type on another blockchain, all natively and without using wrapped tokens.

## What is Proof of Bond?

Proof of Bond (PoB) is a consensus mechanism where node operators must commit a bond (usually in the form of the network's native token) to participate in the network. This bond acts as a form of economic security, ensuring that nodes act honestly and maintain the network's integrity2. If a node tries to act maliciously or fails to perform its duties, its bond can be slashed, meaning a portion of it is taken away as a penalty.

In Maya Protocol, this mechanism helps to produce economic value from the staked resources of node operators, increasing capital efficiency. Similarly, in Thorchain, node operators bond RUNE (the native token) to secure the network and ensure cooperation among participants.

## Differences between Maya and THORChain

Maya is a fork of THORChain but loaded with a few new features and functionality that serves as a great alternative. The most important ones are

### Liquidity Nodes

Rather than following the Pure Bond Model, Maya is contemplating a shift to a Liquidity Nodes model. In this system, nodes are enabled to directly contribute liquidity, bonding it to the network. This approach means node operators face a significant risk: if they misuse funds, they incur losses, acting as a powerful deterrent. As a result, node operators use Liquidity Units from Liquidity Pools, which simultaneously provide liquidity and bolster network security.

### Impermanent Loss Protection

A system that protects liquidity providers from the temporary loss (LPs) they may experience when providing liquidity, due to the constant fluctuations in the prices of crypto assets.
ILP holds 10% of the $CACAO supply (10 million $CACAO) and is continuously replenished by 10% of the protocol fees. ILP becomes active 50 days after a liquidity deposit, with coverage capped at 100%.

The duration of ILP coverage depends on the performance of the ASSET and $CACAO. Full coverage is achieved after 150 days if ASSET performs better, and after 450 days if $CACAO performs better. ILP is both paid out and reset upon complete withdrawal but is not affected by partial withdrawals. For top-ups, ILP is reset but not paid out.

### A different allocation model

The Liquidity Auction was a 21-day event designed to distribute $CACAO tokens among participants. During the event, users deposited supported assets to a specific address. At the conclusion of the auction, 90% of the $CACAO tokens were allocated to participants in proportion to their liquidity contributions, while the remaining 10% was allocated to the ILP reserve. The participants became liquidity providers, with their deposited assets and $CACAO tokens placed into Maya's pools, enabling them to earn a share of the generated fees.

### A different way of handling reserves

At the genesis of Maya Protocol, the available CACAO reserves were only 10% of the total supply, compared to 44% for THORChain, and were primarily intended for Impermanent Loss Protection (ILP). Maya does not have block emissions; and if Protocol Owned Liquidity and Lending are implemented, they will feature a different design, as in THORChain, these aspects are closely integrated with the Reserves.

Still, despite its differences, Maya also serves as a complementary solution to THORChain, offering redundancy, extension and validation, and integrating new networks not existing in the current THORChain implementation.

Also, Maya's goal is to become a *backend* for other services to build upon, in hopes of seeing plenty of new *frontends*, or DEX services built upon Maya's infraestructure.

## Maya protocol wallet integration

Acting as a *backend*, Maya needs to be supported by different UI's and wallets to be used. 
Here's a list with some of the services already supporting Maya:

- [Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore
-  [El Dorado](https://www.eldorado.market/): XDEFI, Keystore
-  [CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap
-  [Asgardex](https://www.asgardex.com/): Keystore, Ledger
-  [DefiSpot](https://www.defispot.com/t): XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet, and Rabby.
-  [XDEFI](https://www.xdefi.io/): a multi-ecosystem self-custody wallet with support for 30+ native blockchains, and all EVM and Cosmos chains, including Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON, and more.
-  [KeepKey ](https://keepkey.com/): A hardware wallet for securely storing digital assets.
