---
published: 2024-01-12 
---

<a href="https://github.com/zechub/zechub/edit/main/site/Research/ZK_Shielded_Asset_Platforms.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 零知识资产平台



**[Firn Protocol](https://web.archive.org/web/20240616051603/https://app.firn.cash/)**：Firn 是首个基于账户模型的零知识隐私[privacy]平台，并为基于 Ethereum 的链引入可插拔、灵活的隐私。利用零知识证明[zero-knowledge proofs]，Firn 为 Ethereum 和基于 Ethereum 的 L2 用户提供安全、高效的资金隐私。**它如何运作？**
要使用 Firn，请将 ETH 存入该协议。拥有 Firn 余额后，您可以将资金私密地转给其他 Firn 用户，或与其他协议互动，例如 Uniswap。您还可以将资金私密地提回网络。Firn 对所有 ETH 提款收取 0.79% 的小额手续费[fee]。这些手续费按比例分配给 Firn Token 持有者 - [白皮书](https://web.archive.org/web/20250617111826/https://firn.cash/whitepaper.pdf) 


**[RAILGUN](https://railgun.org/)：** 作为第 1 层智能合约[smart contract]，RAILGUN 是依托 Ethereum、Polygon、Binance Smart Chain 和 Arbitrum 而存在的私密转账和 DeFi 基础设施。
设置您的非托管[custodial] RAILGUN Wallet，将任意 ERC-20 代币[token]屏蔽[shielded]至您选择的 0zk 地址[address]。屏蔽后，代币、余额和交易[transaction]都会被加密[encryption] - [白皮书](https://docs.railgun.org/wiki) 


**[StarkEX](https://starkware.co/starkex/)：** 一个已在 Ethereum 主网上线的第 2 层扩容[scaling]引擎。交易在链下批量处理并发送至 StarEX 服务。StarEX 验证交易并更新相关余额；它会基于交易的有效性生成 STARK 证明。链上验证器智能合约接收并验证 STARK 证明 - [白皮书](https://docs.starkware.co/starkex-v4/)


**[Manta Network](https://www.manta.network/)：** 面向 Web 3、DeFi 等领域的链上[on-chain]隐私。作为最快的 ZK L1 链，Manta Atlantic 通过合规的链上隐私和身份功能，为 web3 带来可编程隐私。$MANTA 的固定供应量为 1,000,000,000，没有通胀计划。$MANTA 代币将在赎回后自动销毁 - [白皮书](https://docs.manta.network/) 

**[Boltz](https://web.archive.org/web/20260820131421/https://boltz.exchange/)：** Boltz 是一个第 2 层解决方案。Boltz 是一个以隐私优先、非托管的 bitcoin 交易所[exchange]，旨在桥接[bridge] Bitcoin 的不同层，例如 liquid 和 lightning network。借助 Boltz，用户可以在各层之间无缝兑换[swap]其 bitcoin。Boltz 兑换是非托管的，这意味着用户在整个兑换流程中始终可以完全掌控自己的 bitcoin [白皮书](https://web.archive.org/web/20230525142208/https://docs.boltz.exchange/en/latest/) 


**[ShadeProtocol](https://shadeprotocol.io/)**：Shade Protocol 是构建在 Secret Network 上、由互相关联的隐私保护 DeFi 应用组成的第 2 层阵列。这些关键应用包括稳定币、治理[governance]、bond、质押[staking]衍生品、保险、合成资产、借贷、DEX 等 - [白皮书]

**[PantherProtocol](https://www.pantherprotocol.io/)**：一个零知识跨协议层，用于保护您的链上数据并实现合规的 DeFi 访问。**它如何运作？** 将您的资产存入 Panther，以使用名为 zAssets 的 1:1 抵押屏蔽资产。将多种资产类型存储在 Panther Pools 中，同时利用零知识证明保护您的链上数据。许多第 1 层和第 2 层 blockchain 都提出了不同的价值、理念和机制，Panther 创建了可私密连接它们的基础设施，而不是期待其中一个接管一切。- [白皮书](https://docs.pantherprotocol.io/) 


**[Sienna Network](https://web.archive.org/web/20260725175130/https://sienna.network/)：** Sienna.network 是一个以隐私优先、去中心化[decentralized]的开源前端，您可以在其中与 Secret Network 链上的兑换和借贷合约互动。通过提供秘密代币供他人借入来赚取收益，或提供抵押品借入代币。即将上线的市场包括 sBTC、sETH、sSCRT、sXMR、sLUNA、sUST、sUSDT、sUSDC 等。Sienna Network（第 2 层协议）已开发完成。SiennaLend 是首个私密借贷协议，可在维护您隐私的同时，为多个 blockchain 生态系统提供私密借贷。它无需许可[permissionless]，无需注册，对存款没有限制，没有可冻结您账户的中心化方，并由 Sienna 治理代币管理 - **资产兑换**：是 - [白皮书](https://web.archive.org/web/20251208112713/https://sienna.network/whitepaper/) - ![Sienna Logo](/content-images/1-51y4R6V7JALmXtG_ZAsdcw-76d7d91c7a.webp)
***



**[Light Shield](https://web.archive.org/web/20250823165939/https://shield.lightprotocol.com/)：** Light 是一个开源的第 2 层 zkLayer，可实现私密程序执行，专为 Solana 打造。Light Protocol 允许对链上状态进行加密。只有用户可以解密其私密状态；因此，他们实际上"拥有"该状态。私密状态可以由单个用户拥有，也可以由共享解密密钥的一组用户拥有。
例如，考虑在 Solana 上挂牌 NFT；其公开状态（例如价格）对所有人可见，包括其正在出售这一事实。但报价和交易应保持私密 - **资产兑换**：是 - [白皮书](https://web.archive.org/web/20250823165939/https://shield.lightprotocol.com/) - ![Light Shield Logo](/content-images/1-C4Pe23afCwS05seCeZWBLA-d85910d03f.webp)
***

**[Conceal Network](https://conceal.network/wiki/doku.php)：** Conceal Network 的建立旨在让个人能够以匿名和去中心化的方式彼此沟通并进行金融互动。借助 Conceal，交易无法在发送方与接收方之间关联。此外，Conceal 使用环签名[signature]和一次性地址，实现真正匿名的支付[payment] - **资产兑换**：是 - [白皮书](https://conceal.network/wiki/doku.php) - ![Conceal.png](/content-images/media_articles_01-ecae30ec1a.webp)
***

**[Namada](https://namada.net/testnets)：** 简而言之：Namada 是一个面向跨链资产无关隐私的权益证明第 1 层。Namada 通过 IBC 原生与快速终局性链互操作，并通过无需信任的双向桥与 Ethereum 互操作。为实现隐私，Namada 部署了多资产屏蔽池[pool]（MASP）电路的升级版本，使所有资产（同质化和非同质化）可以共享一个共同的屏蔽集合——这样，转移 CryptoKitty 与转移 ETH、DAI、ATOM、OSMO、NAM（Namada 的原生资产）或 Namada 上的任何其他资产无法区分。**资产兑换**：是 - [白皮书](https://docs.namada.net/) - ![Namada.png](/content-images/y4D30_VO_400x400-312a479be4.webp)
***


 **[FairySwap](https://web.archive.org/web/20240810094007/https://fairyswap.finance:443/)：** FairySwap 是一个第 1 层下一代、社区驱动的隐私 DEX，致力于实现无需许可和去中心化。通过利用 Findora 内置的零知识证明技术，隐私 DEX 和像 FairySwap 这样的 Dapp 让用户能够选择希望在公开 blockchain 上显示哪些信息，以及希望屏蔽哪些信息。他们希望不可见的信息仍可通过零知识证明公开验证，而无需透露任何细节 - **资产兑换**：是 - [白皮书](https://fairy-swap.gitbook.io/fairyswap-v2/) - ![FairySwap Logo](/content-images/_unavailable.svg)
***

**[ZKsync](https://zksync.io/)：** ZKsync 是 Ethereum 上的第 2 层扩容解决方案，提供低 gas 和快速交易，同时不牺牲安全性。人们可以随时将资产提取至第 1 层。要访问完整的 ZKsync 生态系统并受益于低成本、即时交易，您首先需要一个 [钱包[wallet]，例如 Argent](https://argent.link/zksync)。没有钱包，您无法接入该网络，因为无法通过像 Coinbase 或 Binance 这样的交易所访问 ZKsync。钱包让您能够轻松买入、卖出和存储加密资产，并体验令人兴奋的 DeFi、NFT 等世界 - **资产兑换**：是 - [白皮书](https://docs.zksync.io/) - ![ZKsync.png](/content-images/63edde073465de1ef6bf89d3_zkSync-20Testne-3a4e9e2324.webp)
***

**[Penumbra](https://penumbra.zone/blog/valetudo-testnet/)：** Penumbra 是 Cosmos 生态系统中的完全屏蔽第 1 层网络。它是一个屏蔽的跨链网络，允许任何人在不向全世界公开个人信息的情况下，安全地交易、质押、兑换或做市。作为完全屏蔽的 blockchain，Penumbra 将所有数值记录在一个可记录任何类型资产的单一屏蔽池中。Penumbra 默认提供隐私，不存在透明交易或透明价值池 - **资产兑换**：是 - ![Penumbra.png](/content-images/CrNB0cKl_400x400-3bdcf7cfb9.webp)
***


**[Ironfish Network](https://ironfish.network/)：** Ironfish 对每笔交易加密，使您的敏感资产信息免受公众查看。借助只读 viewing key，您可以保持合规并掌控一切。Iron Fish 是一个去中心化的第 1 层 blockchain，基于工作量证明（PoW）、抗审查且可公开访问。它旨在为每笔交易提供强大的隐私保障 - **资产兑换**：是 - [白皮书](https://ironfish.network/learn/whitepaper) - ![Ironfish.png](/content-images/kxDDjheA_400x400-2aca14fa6f.webp)
***


**[zkBob](https://zkbob.com/)：** 使用 zkBob 智能合约钱包保护您的隐私。使用 zkBob，您的钱包内容以及支出和接收的金额将完全私密。使用 zkBob 私密地发送或接收薪资、支付、捐款等，同时具备内置合规功能。它还允许使用零知识证明技术进行私密 P2P 转账，以保护接收者并匿名化金额 - **资产兑换**：是 - ![zkBob.png](/content-images/aalptltf_400x400-0fa94999b5.webp) - [白皮书](https://docs.zkbob.com/zkbob-overview/basic-concepts)
***

**[Firo](https://firo.org/)：** Firo，前称 Zcoin，是一个服务于加密货币隐私和挖矿[mining]的第 1 层隐私 blockchain。借助 Lelantus 和 Lelantus Spark，Firo 在加密货币隐私领域处于前沿，提供无需信任的链上隐私和高匿名集。Dandelion++ 技术还提供网络层隐私。借助 Lelantus 和 Lelantus Spark，Firo 在加密货币隐私领域处于前沿，提供无需信任的链上隐私和高匿名集。Dandelion++ 技术还提供网络层隐私 - **资产兑换**：是 - ![Firo.png](/content-images/22083410-abd57747d1.webp)
***

**[PIVX](https://pivx.org/)：** PIVX 在其网络中使用第 2 层，部署主节点以协助参与治理。PIVX 是一种开源、去中心化的点对点货币，具有先进的用户数据保护功能、社区治理机制、权益证明共识算法和多用途主节点。借助 PIVX，用户将无缝体验具备 SHIELD 用户数据保护的全球数字现金自由。完全掌控您的数字资产，成为自己的银行 - **资产兑换**：是 -[白皮书](https://pivx.org/whitepaper) - ![PIVX.png](/content-images/1169-c01a9208a4.webp)
***

**[BEAM](https://beam.mw/)：** BEAM 是顶尖的 Mimblewimble L1 隐私 blockchain，可完全隐藏交易。下载 BEAM Wallet，获得终极机密 DeFi 体验 - **资产兑换**：是 - [白皮书](https://beam.mw/en/docs) - ![BEAM.png](/content-images/diZpv5uB_400x400-80e644b1cf.webp)
***

**[Oxen](https://oxen.io/)：** Oxen（前称 LOKI）是一个肩负使命的隐私技术项目。它是一种具有即时交易功能的私密加密货币。一个庞大而强大的 PoS 网络。一个安全的消息传递平台。该应用正在从第 1 层 Oxen 链迁移至 EVM 兼容链，Oxen 币将成为 Session Token：一种将在第 2 层链上运行、并与大多数 Web3 应用兼容的新 ERC-20 代币 - **资产兑换**：是 - [白皮书](https://docs.oxen.io/) - ![Oxen.png](/content-images/GJAsdyzF_400x400-bb04eed625.webp)
***

**[Particl](https://particl.io/coin)：** Particl 是一个第 1 层解决方案，旨在让个人能够私密地发送和接收资金，没有限制，也没有中间人。它简单、快速且安全。它就像现金，只不过是数字化的！保护您的财务隐私。使用 PART，您可以选择进行公开交易，或进行完全不可追踪的私密交易。选择权在您手中；无论您的需求为何，总有适合您的解决方案 - **资产兑换**：是 - [白皮书](https://raw.githubusercontent.com/particl/whitepaper/master/Particl%20Whitepaper%20Draft%20v0.3.pdf) - ![Particl.png](/content-images/WJ070Lrr_400x400-7b7a6ee533.webp)
***

**[Zano](https://zano.org/)：** Zano 是一个第 1 层解决方案，也是一个开源加密货币和生态系统，具备企业级隐私、安全性和扩容能力，可作为机密资产和去中心化应用（dApps）的坚实基础。您的隐私至关重要。选择 Zano，这一优先考虑机密性和安全性的领先 blockchain 平台。Zano 网络成员之间的交易通过环签名和隐身地址变得不可追踪。此外，交易数据在 blockchain 上的存储方式仅允许获得交易授权的各方访问，且任何私密数据都不会公开发布。所有 Zano 交易的机密性被硬编码进核心。通过隐藏所有发送和接收地址，我们为每位 Zano 用户最大化了隐私级别 - **资产兑换**：是 - [白皮书](https://docs.zano.org/) - ![Zano.png](/content-images/FrSPUjYWIAMMWGJ-404fe8a085.webp)
***



**[Dark.fi](https://dark.fi/)：** DarkFi 是一个基于零知识、多方计算和同态加密的匿名 L1。匿名权益证明确保验证者被隐藏。DarkFi 提供了一个反脆弱环境，用于创建和运行匿名应用 - **资产兑换**：是 - [白皮书](https://darkfi.org/whitepaper) - ![DarkFi.png](/content-images/0-auQOzkLMfYdoXlRy-b10ed91da5.webp)
***


**[Secret Network](https://scrt.network/)：** Secret Network 是使用 Cosmos SDK 构建的第 1 层 blockchain，也是更广泛互联的 Cosmos 宇宙（IBC）的一部分。Secret Network 是首个采用隐私保护智能合约的主网 blockchain，于 2020 年推出。这使得构建去中心化且无需许可、同时保持私密的应用成为可能 - **资产兑换**：是 - [白皮书](https://docs.scrt.network/) -
![Secret.png](/content-images/_unavailable.svg)
***



**[Viction（原名 TomoChain）](https://viction.xyz/ecosystem)：** VIC（原名 TOMO）是一个第 1 层公共 blockchain。TomoChain 是在 TomoChain 上开发的隐私协议，旨在创建安全且不可追踪的交易 -**资产兑换**：是- [白皮书](https://docs.viction.xyz/whitepaper-and-research) - ![TomoChain.png](/content-images/tomochain-7598abfbb7.webp)
***
