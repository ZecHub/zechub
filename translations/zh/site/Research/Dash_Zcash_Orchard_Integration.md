---
published: 2026-04-14
---

<a href="https://github.com/zechub/zechub/edit/main/site/Research/Dash_Zcash_Orchard_Integration.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Dash 集成 Zcash Orchard



## 引言

2026 年 2 月，Dash 网络宣布将 Zcash 的 Orchard 屏蔽池集成到 Dash Evolution 链中。这标志着加密货币领域最重要的跨链隐私合作之一，因为 Dash 采用了 Zcash 最前沿的零知识密码学，以补充其现有基于 CoinJoin 的隐私模型。此次集成验证了 Zcash 作为隐私技术领导者的地位，并开启了跨链隐私协作的新篇章。

本文将解释 Orchard 协议是什么、Dash 如何实现它、这对两个生态系统为何重要，以及这对更广泛的隐私币格局释放了什么信号。


## 什么是 Zcash Orchard 协议？

Orchard 是 Zcash 最先进的屏蔽池，于 2022 年年中随 Network Upgrade 5（NU5）激活。它代表了 Electric Coin Company (ECC) 和 Zcash 社区多年密码学研究的集大成者。

### 核心技术：Halo 2

Orchard 构建于 **Halo 2** 证明系统之上，这是一个用 Rust 编写的高性能 zk-SNARK 实现。Halo 2 带来了两项重大突破：

- **无需可信设置**：早期的 Zcash 屏蔽池（Sprout 和 Sapling）依赖多方计算仪式来生成密码学参数。如果这些仪式中的秘密随机性（“toxic waste”）没有被妥善销毁，理论上可能被用来伪造屏蔽代币。Halo 2 通过一种称为 **nested amortization** 的技术彻底消除了这一要求，该技术在椭圆曲线循环上将多个困难问题实例折叠在一起，使计算证明能够对其自身进行推理。

- **递归证明组合**：单个证明可以为几乎无限多个其他证明的正确性提供证明，将大量计算压缩成紧凑且可验证的形式。这对可扩展性和未来升级至关重要。

### Orchard 隐私如何运作

在传统区块链交易中，发送方、接收方和金额都会在链上可见。而在 Orchard 屏蔽交易中，零知识证明以数学方式保证：

- 交易有效（输入等于输出，不会凭空创造代币）
- 发送方拥有足够资金
- 未发生双花

所有这些都在**不泄露**谁发送了资金、谁接收了资金以及转账金额的情况下完成验证。正如 Dash 首席技术官 Samuel Westrich 所说，与其通过混币来模糊交易轨迹，零知识证明确保“从一开始就不存在轨迹”。

### Actions 取代输入和输出

Orchard 引入了 **Actions** 的概念，用来取代传统的输入/输出模型。每个 Action 将一次支出和一次输出打包在一起，从而减少泄露的交易元数据量。这使观察者更难对屏蔽交易进行流量分析或启发式攻击。


## 什么是 Dash Evolution 链？

要理解这次集成，首先需要理解 Dash 的架构。

### 双链架构

Dash 采用双链系统运行：

- **Dash Core（Layer 1）**：原始的工作量证明区块链，由矿工和 masternode 保护。这是原生 DASH 代币所在之处，也是 CoinJoin 隐私混币运行的地方。

- **Dash Evolution（平台层）**：与 Core 并行构建的第二条链，支持智能合约功能、去中心化应用和身份管理。Evolution 使用一种名为 **Tenderdash** 的修改版 Tendermint 共识机制，并由同时保护两条链的 Evolution Masternodes 进行验证。

Orchard 集成正是在 Evolution 链上进行的。这一设计选择使 Dash 能够在不修改已被验证可靠的 Core 链的前提下，引入先进的密码学隐私功能。


## 集成是如何运作的

### 技术架构

Dash 分叉了 Zcash 开源的 Orchard Rust crate，并将其适配到 Evolution 链。该集成遵循一种 **protected credit pool** 结构：

1. **锁定**：用户在 Dash Core 上锁定其 DASH 资产
2. **铸造**：锚定的 “Credits” 代币在 Evolution 链上被铸造
3. **转移**：Credits 可使用 Orchard 的零知识证明进行匿名转移，发送方、接收方和金额都被完全屏蔽
4. **销毁**：代币在 Evolution 上被销毁，以赎回 Core 上对应的 DASH 资产

这一模型类似于 Core 与 Evolution 两条链之间的双向锚定，但 Evolution 侧的交易具备完整的零知识隐私。

### 分阶段推出

此次集成计划分两个阶段进行：

**第一阶段（2026 年 3 月，待网络安全审计完成）：**
- 在 Evolution 链上部署 Orchard 屏蔽池
- 支持各方之间 Dash Credits 的基础屏蔽转账
- 在主网上线前完成独立安全审计

**第二阶段（后续升级）：**
- 将 Orchard 的隐私功能扩展到 Evolution 上发行的 **tokenized real-world assets (RWAs)**
- 为平台上的 DeFi 和智能合约交互启用隐私保护操作
- 将零知识屏蔽能力扩展到任何代币类型，而不仅仅是原生货币

### 移动端同步

零知识隐私系统在可用性上的一个历史性难题，是移动设备上的同步速度较慢。Dash 团队表示，Evolution 的架构可能实现**更快的屏蔽数据移动端同步**，这将为日常用户带来有意义的改进。这项工作目前仍在验证中。


## 为什么这很重要：CoinJoin 与 Orchard

### Dash 现有的隐私方式：CoinJoin

Dash 传统上通过 **CoinJoin** 提供隐私，这是一种非托管的混币机制。CoinJoin 的工作方式，是将多位用户的交易输入和输出合并到一笔交易中，使观察者难以（但并非不可能）追踪哪些输入对应哪些输出。

CoinJoin 存在一些局限：

- **可选加入**：用户必须在 Dash Core 钱包中手动启用混币
- **是混淆，不是加密**：交易轨迹依然存在于链上，只是更难追踪
- **容易受到分析**：在拥有足够资源和数据的情况下，链上分析公司已经展示出对某些 CoinJoin 交易进行去匿名化的能力
- **匿名集有限**：所提供的隐私程度取决于同时参与混币的其他用户数量

### Orchard 的质变式提升

Orchard 代表了一种根本不同的隐私路径：

- **密码学保证**：隐私由数学强制保障，而不是依赖群体行为
- **没有轨迹**：由于发送方、接收方和金额从不以明文写入链上，因此不存在可供分析的交易轨迹
- **更大的屏蔽集合**：所有 Orchard 交易共享同一个屏蔽池，从而扩大匿名集
- **无需可信设置**：Halo 2 证明系统消除了任何残余的信任假设

此次集成并不会取代 Dash Core 上的 CoinJoin。相反，Orchard 在 Evolution 链上提供了一层**互补的密码学层**，让 Dash 用户可以在 CoinJoin 的轻量混币和零知识证明的数学隐私之间进行选择。


## 这对 Zcash 意味着什么

Dash 的集成对 Zcash 生态系统具有重要意义。

### 对 Zcash 技术的验证

当另一个主要加密货币项目采用 Zcash 的密码学技术栈时，这本身就是对该技术成熟度、安全性和设计质量的外部验证。Dash Core Group 首席技术官 Samuel Westrich 指出：

> “自 2014 年第一批论文出现以来，我个人一直对 ZK 证明技术及其在区块链中的用途很感兴趣。多年来，我们一直在关注 Zcash。随着最新版本的 Orchard crate 发布，我们认为现在是一个适合研究将这项技术加入我们较新的 Evolution 链的时机。”

他还补充说，“Orchard 是开源且成熟的；集成它比预期更容易。”

### 生态系统扩展

Orchard crate 采用 MIT 和 Apache 2.0 开源许可证发布。每当其他项目进行集成，都会扩大 Zcash 密码学原语的用户基础，增加熟悉该代码库的开发者数量，并可能带来反哺上游的改进，从而使 Zcash 自身受益。

### 跨链认可

Dash 加入使用 Halo 2 和 Orchard 的项目行列，使 Zcash 与 Filecoin、Ethereum 以及多个已采用或探索 Halo 2 技术的 zkRollup 解决方案并列。这个不断扩大的生态系统强化了围绕 Zcash 隐私研究的网络效应。

### Zcash 作为隐私标准

此次集成使 Zcash 的技术成为正在出现的**区块链隐私行业标准**，就像 TLS 成为 Web 加密标准一样。当竞争项目选择采用 Zcash 的工具，而不是自行构建时，这表明其底层科学具有很高的质量和可靠性。


## 对隐私加密货币的更广泛影响

### 隐私叙事

此次集成发生在加密货币行业对隐私技术兴趣高涨的时期。2026 年初，隐私币涨幅超过 80%，其驱动因素是人们对金融监控的认知不断提高，以及对交易隐私价值的重视。

### 监管背景

此次集成也发生在隐私代币面临监管压力的背景之下。2026 年 1 月，迪拜金融服务管理局（DFSA）禁止受监管的加密交易所向新用户出售包括 ZEC 和 XMR 在内的隐私代币。虽然该禁令并不阻止公民持有这些代币，但它凸显了用户隐私与监管合规之间的张力。

像 Dash-Orchard 这样的跨链隐私集成，可能会影响监管机构对隐私技术的看法。隐私功能可以作为模块化组件被任何区块链采用，这一事实表明，与其禁止特定代币，不如直接面对底层技术，或许会更有效。

### 未来合作伙伴关系

Dash 的这次集成为其他区块链项目树立了先例。如果 Orchard 能够成功部署在具有不同共识机制和架构的链上，就证明了 Zcash 的隐私技术确实具备可移植性。这可能会鼓励整个生态系统进一步采用，包括：

- 寻求隐私功能的 Layer-2 网络
- 希望屏蔽用户交易数据的 DeFi 协议
- 需要机密转账的现实世界资产平台
- 需要兼顾监管合规与隐私的企业区块链


## 结论

将 Zcash 的 Orchard 协议集成到 Dash 的 Evolution 链中，是跨链隐私协作的一个里程碑。对 Dash 而言，这意味着从 CoinJoin 的混淆模型跃升到 Orchard 的密码学隐私保证。对 Zcash 而言，这证明围绕 Halo 2 和 Orchard 屏蔽池多年来的研究，已经产出了足够稳健且成熟、可供其他大型项目采用的技术。

更重要的是，这次集成表明，加密货币中的隐私并不是项目之间的零和竞争。开源隐私技术会因更广泛的采用、更广泛的审查以及共享开发而受益。随着 Zcash 的 Orchard 在区块链生态系统中不断传播，整个行业都将更接近这样一个未来：金融隐私将成为默认选项，而不是例外。


## 延伸阅读

- [Halo 2 文档](https://zcash.github.io/halo2/)
- [Zcash Orchard Crate（GitHub）](https://github.com/zcash/orchard)
- [Halo 2 GitHub 仓库](https://github.com/zcash/halo2)
- [Dash Evolution 平台文档](https://docs.dash.org/en/stable/)
- [Cointelegraph：Dash 集成 Zcash 隐私池](https://cointelegraph.com/news/dash-integrates-z-cash-orchard-privacy)
- [HackerNoon：Dash 将 Zcash Orchard 隐私引入 Evolution 链](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions)
