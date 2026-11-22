# Zcash Avalanche RedBridge

Zcash Avalanche RedBridge 是一座去中心化桥 [decentralized bridge]，可实现 Zcash（ZEC）与 Avalanche（AVAX）blockchain 之间的互操作性。该桥旨在将 ZEC 无缝转移至 Avalanche blockchain，利用 Avalanche 的高吞吐量、低手续费 [fees] 和环保共识 [consensus] 机制，同时保留 Zcash 以隐私 [privacy] 为中心的特性。

RedBridge 支持广泛的用例 [use cases]，包括跨链 [cross-chain] 去中心化金融（DeFi）、私密交易 [transactions] 和流动性共享，为 Zcash 持有者提供扩展后的 Avalanche 生态系统访问能力。该桥通过一组去中心化节点 [nodes] 和一个名为 **ZavaX** 的预言机 [oracle] 运行，确保 Zcash 与 Avalanche 之间可靠的数据传输和价格验证。

### 主要特性

隐私保护互操作性：允许 Zcash 用户在 Avalanche 上使用 DeFi 应用程序时保持隐私。
去中心化预言机 ZavaX：集成预言机系统以确保准确的 ZEC/AVAX 价格数据，实现无需信任的跨链操作。
可扩展且环保：采用 Avalanche 的共识模型，以最小的环境影响提供高速交易。
支持 DeFi 和 DApps：Zcash 持有者如今可以参与 Avalanche 上的各类 DeFi 平台，而不会损害隐私。

### 技术组件

**去中心化 ZavaX Oracle**
描述：ZavaX Oracle 对该桥至关重要，可提供跨链价格数据源并实现无需信任的 ZEC 至 AVAX 转换。
[预言机链接](https://zavax-oracle.red.dev)

**跨链桥合约**
描述：支持 Zcash Avalanche 桥的智能合约 [smart contract] 架构，处理 ZEC 的存入、转换和提取。

**隐私层集成**
描述：确保 Zcash 的隐私特性在整个桥接过程中得以保留，从而实现私密跨链交易。

## 交付成果与文档

**Avalanche 上的 Zcash Elastic Subnet Bridge**：[拨款提案](https://forum.zcashcommunity.com/t/zcash-elastic-subnet-bridge-on-avalanche/44220)
以下是为 Zcash Avalanche RedBridge 项目完成的主要交付成果和技术资源：

交付成果 1.1：初步 PoC，支持通过 CLI 从测试网 Avalanche 子网查询测试网 Zcash 交易，已发布于 GitHub，并在 Avalanche 测试网上部署了一个单节点子网。https://github.com/red-dev-inc/redbridge-oracle

交付成果 2.1：[架构](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)


### 里程碑 3：2024 年 3 月 31 日

交付成果 3.1 已完成，展示了我们关于在 ZavaX 桥中采用 FROST 而非 BLS 进行阈值签名 [signatures] 的分析。这一转变利用了来自 Zcash Foundation 的经审计库，并有助于实现更好的集成和安全性。https://github.com/ZcashFoundation/frost

交付成果 3.2：已完成 GUI 的 UX 和 UI 设计，详细说明了我们针对 ZavaX Oracle 子网的安全增强措施，并获得渗透测试结果支持。有关更多详情，包括服务器配置和测试结果，请参阅 [安全评估](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/deployment-notes.md)
[审计报告](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/pen-testing-report-2024-09.md)
此外，团队已从 ZavaX 更名为 redbridge，并将我们的质押 [staking] 代币 [token] 从 ZAX 更改为 RBR。

### 里程碑 4：2024 年 4 月 30 日
交付成果 4.1：已完全功能化部署至 Zcash 和 Avalanche 测试网，配备一个 3 验证者子网，并支持 CLI

### 里程碑 5：2024 年 5 月 31 日
交付成果 5.1：GUI：将桥集成至 Core 或 Webapp

里程碑 6：2024 年 6 月 30 日
交付成果 6.1：成功通过软件审计
交付成果 6.2：将经审计的源代码发布至公开的 GitHub 仓库

查看 [GitHub 仓库](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)
  
如需更多技术细节，建议用户查阅RedBridge项目的仓库和文档，以[探索](https://github.com/red-dev-inc/red-bridge)集成细节、测试框架和安全协议。


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* 交付成果： 
在 2025 年第一季度，团队宣布推出 [red·bridge 演示网站](https://redbridge-demo.red.dev/index.html)，任何人都可以在此体验用户体验、提供反馈并提出改进建议。它也是向非技术人员介绍该项目的一种便捷方式。

* 团队将 Zebra 用于 red·bridge 的最终版本。为测试该版本，他们升级了测试 blockchain ZavaX Oracle 中的三个节点中的两个，该 blockchain 运行在 Avalanche 的 Fuji 测试网上。最后一个节点也已成功升级，现在 [ZavaX Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/) 已在 Zebra 上运行！

* 在 2025 年第一季度，red.bridge 网站经过编码，可提供红色、Dark、Light 和 Zebra 四种视图，而初始版本仅为红色。

* 另一点是，团队将在 2025 年 12 月于 Avalanche 主网上线 red·bridge L1。最初，它将作为 Zcash blockchain 的预言机，随后也将很快服务于 Bitcoin。其中，每次请求将消耗 0.001 AVAX 作为 gas 代币。此构建将使 Avalanche 上的任何 L1 或智能合约能够以低成本、去中心化的方式查询 Zcash 和 Bitcoin 的数据。

* 在第二季度，团队向 Avalanche Foundation 提交了一项里程碑 ACP-77（称为 Avalanche9000），以便让每个人都能更早且更经济地运行 red.bridge 守护者。最初，验证者需要质押约 2000 AVAX；然而，采用 Avalanche9000 后，验证者每月仅需 1 AVAX。此外，该里程碑还最终确定了使用 ZF 的 FROST 实现的计划，该实现为每位 Guardian 提供一个签名份额，以实现对桥钱包的安全、分布式控制。

* 到 2026 年第一季度和第二季度，red.bridge 将为 Zcash 和 Avalanche 社区成员举办其 RBR 代币（原 ZAX）空投。据 red.dev 创始人称，他们将举办一个激励性测试网，用户将有机会在帮助测试该桥的同时赚取 RBR。
