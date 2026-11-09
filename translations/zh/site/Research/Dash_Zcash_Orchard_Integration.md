---
published: 2026-04-14
---

<a href="https://github.com/zechub/zechub/edit/main/site/Research/Dash_Zcash_Orchard_Integration.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dash 对 Zcash Orchard 的集成



## 简介

2026 年 2 月，Dash 网络宣布将 Zcash 的 Orchard 屏蔽 pool [shielded pool] 集成至 Dash Evolution 链。这标志着加密货币领域最重要的跨链 [cross-chain] 隐私 [privacy] 合作之一，因为 Dash 采用了 Zcash 的前沿零知识 [zero-knowledge] 密码学，以补充其现有的基于 CoinJoin 的隐私模型。这项集成验证了 Zcash 作为隐私技术领导者的地位，并为跨链隐私合作开启了新篇章。

本文将解释 Orchard 协议是什么、Dash 如何实施该协议、它为何对两个生态系统都很重要，以及它对更广泛的隐私币格局意味着什么。


## 什么是 Zcash Orchard 协议？

Orchard 是 Zcash 最先进的屏蔽 pool，于 2022 年年中随网络升级 [Network Upgrade] 5（NU5）启用。它代表了 Electric Coin Company（ECC）和 Zcash 社区多年密码学研究的结晶。

### 核心技术：Halo 2

Orchard 构建于 **Halo 2** 证明 [proof] 系统之上，这是一个以 Rust 编写的高性能 zk-SNARK 实现。Halo 2 带来了两项重大突破：

- **无需可信设置 [Trusted Setup]**：早期的 Zcash 屏蔽池（Sprout 和 Sapling）依赖多方计算仪式来生成密码学参数。如果这些仪式产生的秘密随机性（"有毒废料"）未被妥善销毁，理论上可能被用于创建伪造的屏蔽代币。Halo 2 通过一种称为**嵌套摊销**的技术彻底消除了这一要求，该技术将椭圆曲线周期上的多个难题实例折叠在一起，使计算证明能够对自身进行推理。

- **递归证明组合**：单个证明可以证实实际上无限多个其他证明的正确性，将大量计算压缩为紧凑且可验证的形式。这对可扩容性和未来升级至关重要。

### Orchard 隐私如何运作

在传统 blockchain 交易中，发送方、接收方和金额均在链上 [on-chain] 可见。在 Orchard 屏蔽交易中，零知识证明从数学上保证：

- 交易有效（输入等于输出，且不会凭空创建代币）
- 发送方拥有充足资金
- 未发生双重支付

这一切均可在**不披露**谁发送资金、谁接收资金或转移金额的情况下完成验证。正如 Dash CTO Samuel Westrich 所言，零知识证明并非通过混币来模糊交易轨迹，而是确保"一开始就没有轨迹"。

### Actions 取代输入和输出

Orchard 引入了 **Actions** 概念，以取代传统的输入/输出模型。每个 Action 将一次支出和一次输出捆绑在一起，从而减少泄露的交易元数据量。这使观察者更难对屏蔽交易执行流量分析或启发式攻击。


## 什么是 Dash Evolution 链？

要理解这项集成，了解 Dash 的架构十分重要。

### 双链架构

Dash 运行一个双链系统：

- **Dash Core（第 1 层）**：原始的工作量证明 blockchain，由矿工 [miners] 和主节点保护。这是原生 DASH 代币所在之处，也是 CoinJoin 隐私混币运行之处。

- **Dash Evolution（平台层）**：与 Core 并行构建的一条次级链，支持智能合约 [smart contract] 功能、去中心化 [decentralized] 应用程序和身份管理。Evolution 使用一种名为 **Tenderdash** 的改良 Tendermint 共识 [consensus] 机制，并由同时保护两条链的 Evolution 主节点进行验证。

Evolution 链是 Orchard 集成发生之处。这一设计选择使 Dash 能够在不修改已经验证的 Core 链的前提下引入先进的密码学隐私。


## 集成如何运作

### 技术架构

Dash 分叉了 Zcash 的开源 Orchard Rust crate，并将其改造用于 Evolution 链。该集成采用**受保护的信用 pool**结构：

1. **锁定**：用户在 Dash Core 上锁定其 DASH 资产
2. **铸造**：锚定的 "Credits" 代币在 Evolution 链上铸造
3. **转移**：Credits 可使用 Orchard 的零知识证明匿名转移，发送方、接收方和金额均完全屏蔽
4. **销毁**：代币在 Evolution 上销毁，以赎回 Core 上的底层 DASH 资产

该模型类似于 Core 与 Evolution 链之间的双向锚定，但 Evolution 一侧的交易拥有完整的零知识隐私。

### 分阶段推出

该集成计划分两个阶段进行：

**第 1 阶段（2026 年 3 月，等待网络安全审计）：**
- 在 Evolution 链上部署 Orchard 屏蔽池
- 支持各方之间 Dash Credits 的基本屏蔽转移
- 在主网激活前完成独立安全审计

**第 2 阶段（后续升级）：**
- 将 Orchard 的隐私功能扩展至 Evolution 上发行的**代币化现实世界资产（RWA）**
- 为平台上的 DeFi 和智能合约交互启用保护隐私的操作
- 将零知识屏蔽扩展至任何代币类型，而不仅是原生货币

### 移动端同步

零知识隐私系统历来面临的一项可用性挑战是移动设备上的同步速度较慢。Dash 团队表示，Evolution 的架构可能实现**更快的屏蔽数据移动端同步**，这将为日常用户带来有意义的改进。这项工作目前正在验证中。


## 这为何重要：CoinJoin 与 Orchard

### Dash 现有的隐私：CoinJoin

Dash 传统上通过 **CoinJoin** 提供隐私，这是一种非托管 [non-custodial] 混币机制。CoinJoin 通过将多个用户的交易输入和输出合并为一笔交易来运作，使观察者难以（但并非不可能）追踪哪些输入对应哪些输出。

CoinJoin 存在局限性：

- **主动启用**：用户必须在 Dash Core 钱包中手动启用混币
- **混淆，而非加密 [encryption]**：交易轨迹仍然存在于链上；只是更难追踪
- **易受分析影响**：拥有充足资源和数据时，链分析公司已证明能够对部分 CoinJoin 交易去匿名化
- **匿名集有限**：所提供的隐私取决于同时进行混币的其他用户数量

### Orchard 的质的进步

Orchard 代表了一种与隐私根本不同的方法：

- **密码学保证**：隐私由数学而非群体行为强制保障
- **没有轨迹**：由于发送方、接收方和金额从不以明文写入链，因此不存在可供分析的交易轨迹
- **更大的屏蔽集**：所有 Orchard 交易共享一个共同的屏蔽 pool，从而扩大匿名集
- **无需可信设置**：Halo 2 证明系统消除了任何残余的信任假设

该集成不会取代 Dash Core 上的 CoinJoin。相反，Orchard 在 Evolution 链上提供了**互补的密码学层**，让 Dash 用户可在 CoinJoin 的轻量混币与零知识证明的数学隐私之间选择。


## 这对 Zcash 意味着什么

Dash 集成对 Zcash 生态系统具有重大影响。

### 对 Zcash 技术的验证

当另一个大型加密货币项目采用 Zcash 的密码学技术栈时，这构成了对该技术成熟度、安全性和设计质量的外部验证。Dash Core Group 的 CTO Samuel Westrich 指出：

> "自 2014 年首批论文发布以来，我个人一直对 ZK 证明技术及其在 blockchain 中的应用感兴趣。多年来，我们一直关注 Zcash。随着 Orchard crate 的最新版本发布，我们认为现在是研究将该技术加入较新的 Evolution 链的好时机。"

他补充道："Orchard 是开源且成熟的；集成它比预期更容易。"

### 生态系统扩展

Orchard crate 根据 MIT 和 Apache 2.0 开源许可证发布。每当另一个项目完成集成，都会扩大 Zcash 密码学原语的用户基础，增加熟悉代码库的开发者数量，并可能带来能让 Zcash 自身受益的上游改进。

### 跨链认可

Dash 加入采用 Halo 2 和 Orchard 的项目行列，使 Zcash 与 Filecoin、Ethereum 以及多个已采用或探索 Halo 2 技术的 zkRollup 解决方案并列。这个不断发展的生态系统强化了围绕 Zcash 隐私研究的网络效应。

### Zcash 作为隐私标准

该集成将 Zcash 的技术定位为新兴的**blockchain 隐私行业标准**，正如 TLS 成为网络加密标准一样。当竞争项目选择采用 Zcash 的工具，而非自行构建时，这说明了底层科学的质量和可靠性。


## 对隐私加密货币的更广泛影响

### 隐私叙事

此次集成正值加密货币行业对隐私技术兴趣升温之际。2026 年初，受人们对金融监控和交易隐私价值日益认知的推动，隐私币涨幅超过 80%。

### 监管背景

该集成也发生在隐私代币面临监管压力的背景下。2026 年 1 月，迪拜金融服务管理局（DFSA）禁止受监管的加密货币交易所向新用户出售包括 ZEC 和 XMR 在内的隐私代币。虽然该禁令并不阻止公民持有这些代币，但它突显了用户隐私与监管合规之间的紧张关系。

像 Dash-Orchard 这样的跨链隐私集成可能影响监管机构看待隐私技术的方式。隐私功能可以作为模块化组件被任何 blockchain 采用这一事实表明，禁止特定代币可能不如与底层技术互动有效。

### 未来合作伙伴关系

Dash 集成为其他 blockchain 项目树立了先例。如果 Orchard 能够成功部署在具有不同共识机制和架构的链上，这表明 Zcash 的隐私技术确实具有可移植性。这可能鼓励生态系统内进一步采用，包括：

- 寻求隐私功能的第 2 层网络
- 希望屏蔽用户交易数据的 DeFi 协议
- 需要保密转移的现实世界资产平台
- 需要符合监管要求的隐私功能的企业 blockchain


## 结论

将 Zcash 的 Orchard 协议集成至 Dash 的 Evolution 链，代表了跨链隐私合作的一个里程碑。对于 Dash 而言，这意味着从 CoinJoin 的混淆模型质变式跃升至 Orchard 的密码学隐私保证。对于 Zcash 而言，这确认了对 Halo 2 和 Orchard 屏蔽 pool 多年的研究，已经产生足够强大和成熟、可供其他大型项目采用的技术。

最重要的是，这项集成表明，加密货币隐私并不是项目之间的零和竞争。开源隐私技术受益于更广泛的采用、更广泛的审查和共享开发。随着 Zcash 的 Orchard 在 blockchain 生态系统中传播，整个领域将更接近这样一个未来：金融隐私成为默认选项，而非例外。


## 延伸阅读

- [Halo 2 文档](https://zcash.github.io/halo2/)
- [Zcash Orchard Crate（GitHub）](https://github.com/zcash/orchard)
- [Halo 2 GitHub 代码库](https://github.com/zcash/halo2)
- [Dash Evolution 平台文档](https://docs.dash.org/en/stable/)
- [Cointelegraph：Dash 集成 Zcash 隐私池](https://cointelegraph.com/news/dash-integrates-z-cash-orchard-privacy)
- [HackerNoon：Dash 为 Evolution 链带来 Zcash Orchard 隐私](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions)
