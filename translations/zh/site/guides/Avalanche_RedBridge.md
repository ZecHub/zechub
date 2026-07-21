# Zcash Avalanche RedBridge

Zcash Avalanche RedBridge 是一座去中心化桥，能够实现 Zcash (ZEC) 与 Avalanche (AVAX) 区块链之间的互操作性。该桥旨在促进 ZEC 无缝转移到 Avalanche 区块链上，在保留 Zcash 以隐私为核心的特性的同时，利用 Avalanche 的高吞吐量、低费用和环保型共识机制。

RedBridge 支持广泛的用例，包括跨链去中心化金融（DeFi）、私密交易和流动性共享，使 Zcash 持有者能够更广泛地接入 Avalanche 生态系统。该桥通过一组去中心化节点和一个名为 **ZavaX** 的预言机来运行，以确保 Zcash 与 Avalanche 之间可靠的数据传输和价格验证。

### 关键特性

隐私保护型互操作性：允许 Zcash 用户在 Avalanche 上使用 DeFi 应用时保持隐私。
去中心化预言机 ZavaX：集成预言机系统以确保准确的 ZEC/AVAX 价格数据，从而实现无需信任的跨链操作。
可扩展且环保：采用 Avalanche 的共识模型，以最小的环境影响提供高速交易。
支持 DeFi 和 DApps：Zcash 持有者现在可以在不牺牲隐私的情况下参与 Avalanche 上的各种 DeFi 平台。

### 技术组件

**去中心化 ZavaX 预言机**
说明：ZavaX 预言机是这座桥的关键组成部分，提供跨链价格预言，并实现无需信任的 ZEC 到 AVAX 转换。
[预言机链接](https://zavax-oracle.red.dev)

**跨链桥合约**
说明：支持 Zcash Avalanche 桥的智能合约架构，负责处理 ZEC 的存款、转换和提款。

**隐私层集成**
说明：确保 Zcash 的隐私特性在整个桥接过程中得到保留，从而实现私密的跨链交易。

## 交付成果与文档

**Avalanche 上的 Zcash 弹性子网桥**：[资助提案](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
以下是 Zcash Avalanche RedBridge 项目已完成的关键交付成果和技术资源：

交付成果 1.1：初步 PoC，支持通过 CLI 从 Avalanche 测试网子网查询 Zcash 测试网交易，已发布在 Github 上，并在 Avalanche 测试网上部署了一个单节点子网。https://github.com/red-dev-inc/zavax-oracle

交付成果 2.1：[架构](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### 里程碑 3：2024 年 3 月 31 日

交付成果 3.1 已完成，展示了我们关于在 ZavaX bridge 中采用 FROST 取代 BLS 作为门限签名方案的分析。这一转变利用了来自 Zcash Foundation 的已审计库，并促进了更好的集成与安全性。https://github.com/ZcashFoundation/frost

交付成果 3.2 GUI 的 UX 和 UI 设计已完成，详细说明了我们对 ZavaX Oracle 子网的安全增强，并附有渗透测试结果。更多详情，包括服务器配置和测试结果，请参阅[安全评估](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[审计报告](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
此外，团队将品牌从 ZavaX 更名为 redbridge，并将质押代币从 ZAX 更改为 RBR。

### 里程碑 4：2024 年 4 月 30 日
交付成果 4.1 完成对 Zcash 和 Avalanche 测试网的完整功能部署，具有 3 个验证者子网，并支持 CLI

### 里程碑 5：2024 年 5 月 31 日
交付成果 5.1 GUI：将桥集成到 Core 或 Webapp 中

里程碑 6：2024 年 6 月 30 日
交付成果 6.1 成功通过软件审计
交付成果 6.2 将已审计的源代码发布到公共 Github 仓库

查看 [Github 仓库](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
如需更多技术细节，建议用户查看 RedBridge 项目的仓库和文档，以[了解](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)集成细节、测试框架和安全协议。


![img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* 交付成果：
2025 年第一季度，团队宣布推出 [red·bridge 演示网站](https://redbridge-demo.red.dev/index.html)，任何人都可以在那里体验用户界面、提供反馈并提出改进建议。它也是向非技术人士介绍该项目的一种简便方式。

* 团队在 red·bridge 的最终版本中使用了 Zebra。为进行测试，他们升级了测试区块链 ZavaX Oracle 中三个节点里的两个，该链运行在 Avalanche 的 Fuji 测试网上。最后一个节点也已成功升级，现在 [Zavax Oracle](https://zavax-oracle.red.dev/) 已经运行在 ZEBRA 上！

* 在 2025 年第一季度，red.bridge 网站被编码为提供四种视图：red、Dark、Light 和 Zebra，而最初版本只有 red。

* 另一点是，团队将于 2025 年 12 月在 Avalanche 主网上激活 red·bridge L1。最初，它将作为 Zcash 区块链的预言机，随后很快也将服务于 Bitcoin。其中，每次请求将花费 0.001 AVAX 作为 gas token。此构建将使 Avalanche 上的任何 L1 或智能合约都能够以去中心化的方式低成本查询来自 Zcash 和 Bitcoin 的数据。

* 在第二季度，团队向 Avalanche Foundation 提交了一个里程碑 ACP-77（称为 Avalanche9000），以使 red.bridge guardian 的运行更早实现并且对所有人来说更实惠。最初，验证者需要质押大约 2000 AVAX；然而，借助 Avalanche9000costs，验证者只需 1 AVAX（每月）。此外，这一里程碑还最终确定了使用 ZF 的 FROST 实现的计划，该实现为每个 Guardian 提供一个签名份额，以实现对桥钱包的安全分布式控制。

* 到 2026 年第一季度和第二季度，red.bridge 将为 Zcash 和 Avalanche 社区成员举办其 RBR 代币（前称 ZAX）空投。根据 red.dev 创始人的说法，他们将举办一个激励型测试网，用户在帮助测试这座桥的同时，将有机会赚取 RBR。
