## INTRODUCTION
A little while ago, we witnessed the launch of the Zcash Avalanche RedBridge, a decentralized bridge built to facilitate interoperability between the Zcash (ZEC) and Avalanche (AVAX) blockchain networks. The sole purpose of this bridge is to enable ZEC token holders to seamlessly transfer their assets to the Avalanche blockchain more efficiently, with low fees, while preserving the privacy rights of their ZEC.


Essentially, this means that Zcash is not solely dependent on NEAR intents for easy swaps; Avalanche is also changing the narrative. 

**More so,** 

Red.bridge was designed to follow Avalanche’s rules of empowering people to easily and freely digitize all the world's assets by providing privacy and selective disclosure features to the ecosystem for decentralized applications, allowing them to scale while protecting user data.

_Interestingly, RedBridge supports a wide spectrum of use cases, from decentralized finance (DeFi) to private transactions to liquidity sharing, and empowers ZEC holders with expanded accessibility to the Avalanche ecosystem._

## Key Features

* Privacy-built Interoperability: This feature allows Zcash users to transact on Avalanche applications without compromising privacy through DeFi, yield farming, and many more benefits. 

* Decentralized Oracle ZavaX: The ZavaX Oracle is a proof-of-concept subnet built by red·dev to connect Zcash and Avalanche blockchains. This oracle enables users to query Zcash block data through Avalanche nodes. 

* ZEBRA: A Zcash node written entirely in Rust. It can be used to join the Zcash peer-to-peer network, ensuring resilient validation and broadcasting of transactions.

# What’s new about Red.Bridge?
Since the debut of red.bridge, the team has been working tirelessly to ensure the project runs smoothly. I’m thrilled to write about some of the latest developments that have been done behind closed doors, and existing alphas to be on the lookout for in the coming months. 

Roadmap Image
![alt](https://ibb.co/fGq1Pbgq)

_**[Catch a glimpse of milestone 1-6 here, but let’s see what the team has been working on for a while now 
](https://github.com/ZecHub/zechub/blob/main/site/guides/Avalanche_RedBridge.md#milestone-3-march-31-2024)**_

* Deliverables: 
In Q1 2025, the team announced the launch of the [red·bridge demo website](https://redbridge-demo.red.dev/index.html), where anyone can try the user experience, give feedback, and suggest improvements. It also serves as an easy way to introduce non-technical people to the project.

* The team used Zebra for the final version of red·bridge. To test it, they upgraded two of the three nodes in their test blockchain, ZavaX Oracle, which runs on Avalanche’s Fuji testnet. The last node was upgraded successfully, now [Zavax Oracle](https://zavax-oracle.red.dev/) now runs on ZEBRA!

* In Q1 of 2025, the red.bridge website was coded to offer four views from red, Dark, Light, and Zebra as opposed to the initial version, which was red.

* Another point is that the team will activate the red·bridge L1 live on the Avalanche mainnet in December 2025. Initially, it will serve as an oracle for the Zcash blockchain and then, soon after, for Bitcoin as well. Wherein, each request will cost 0.001 AVAX in gas token. This build will enable any L1 or smart contract on Avalanche to inexpensively query data from Zcash and Bitcoin in a decentralized manner.

* In Q2, the team submitted a milestone ACP-77 (known as Avalanche9000) to the Avalanche Foundation to make the running of a red.bridge guardian earlier and more affordable for everyone. Initially, validators needed to stake around 2000 AVAX; however, with the Avalanche9000costs, validators only needed 1 AVAX (month). Additionally, this milestone also finalizes the plan to use ZF’s FROST implementation, which gives each Guardian a signing share for secure, distributed control of the bridge wallet.

* Come Q1 and Q2 of 2026, red.bridge would host its RBR token (formerly ZAX) airdrop for the Zcash and Avalanche community members. According to the founder of red.dev, they shall host an incentivized testnet where users will have a chance to earn RBR while helping to test out the bridge.


# How does Red.bridge Work?
![alt](https://ibb.co/5hfWkZPF)
First things first, simply connect a compatible Zcash wallet, then head over to the bridge interface. Input the amount of ZEC you'd like to bridge, then follow the bridge prompt to convert your ZEC into AVAX-compatible tokens. Once you've successfully moved your ZEC tokens to Avalanche, you can now connect your wallet to any DeFi application that supports AVAX assets - good luck! You can now kickstart yield farming activities, liquidity pools, or other services that suit your needs.
