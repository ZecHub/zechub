<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 开发者资源

构建 Zcash 所需的资源，按各自用途分类，而非堆放在同一处。

该技术栈在 2026 年发生了巨大变化。曾在其大部分历史中运行网络的 zcashd，于 2026 年 7 月 18 日在区块高度 3417100 达到生命周期终点；所有未经修改的节点都会在该高度关闭，并拒绝重新启动。为 zcashd 编写的指南如今已成为历史，而不再是起点，因此本页面围绕其替代方案进行组织。

## 技术栈一览

| 层级 | 使用什么 | 从这里开始 |
|:--|:--|:--|
| 全节点 | Zebra 或 Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| 全节点钱包 | Zallet，测试版 | [The Zallet Book](https://zcash.github.io/zallet/) |
| 轻钱包服务器 | Zaino 或 lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| 钱包库 | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| 移动端 | Android 和 iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 规范 | 协议规范和 ZIPs | [zips.z.cash](https://zips.z.cash) |

## 节点

节点验证共识并保存区块链。目前有两种正在积极开发的实现。

[Zebra](/zcash-tech/zebra-full-node) 是 Zcash Foundation 的节点，以 Rust 编写，也是如今大多数指南所默认使用的节点。[The Zebra Book](https://zebra.zfnd.org/) 涵盖其安装和运行方式，而[代码仓库](https://github.com/ZcashFoundation/zebra)则是开发进行的地方。

[Zakura](/zcash-tech/zakura-node) 是一个较新的节点，其作者将其描述为“为扩展性而构建的、与共识兼容的 Zcash 全节点”，具备更快的同步速度、区块裁剪以及 zcashd 兼容模式。它由 Zcash 联合创始人 Sean Bowe 和 Dev Ojha 领导。在 [zakura-core/zakura](https://github.com/zakura-core/zakura) 上以 Apache 2.0 许可证开源。

ZecHub 有一个介绍两者取舍的[全节点](/zcash-tech/full-nodes)页面。

## 全节点钱包

zcashd 将钱包与节点捆绑在一起。该钱包已经消失，[Zallet](https://github.com/zcash/zallet) 是其替代品。The Zallet Book 将其描述为“以 Rust 编写的全节点 Zcash 钱包”，并称其“旨在作为 zcashd 钱包的替代品”。

在依赖它之前，请阅读安全警告。Zallet 目前处于测试版，“尚未经过完整审查”；破坏性变更“可能随时发生，要求你删除并重新创建 Zallet 钱包”；并且尚非所有 zcashd RPC 方法都已移植。

如果你正在迁移现有设置，ZecHub 提供了[从 zcashd 迁移到 Zebra 和 Zallet 的指南](/guides/migration-guide-zcashd-to-zebrad-zallet)，以及一份 [Zallet 快速参考](/using-zcash/zallet-quick-reference-guide)。

## 轻钱包服务器

大多数钱包不会运行节点。它们与保存区块链并返回其紧凑视图的服务器通信。

[lightwalletd](https://github.com/zcash/lightwalletd) 是原始服务，以 Go 编写，被描述为“提供通往 Zcash 区块链的带宽高效接口的后端服务”。[Zaino](/zcash-tech/zaino) 是较新的索引器，以 Rust 编写，从完整验证器读取数据，而不是自行保存一份区块链副本。

[轻客户端协议](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html)文档涵盖协议本身。[轻钱包节点](/zcash-tech/lightwallet-nodes)页面说明这些服务器能够和不能够看到用户的哪些信息；在选择之前，值得理解这些内容。

## 构建钱包

大多数钱包开发工作都在 [librustzcash](https://github.com/zcash/librustzcash) 下的 Rust crates 中进行，移动端 SDK 和若干桌面钱包都构建在其之上。每个 crate 都在 [docs.rs](https://docs.rs) 上有文档。

| Crate | 用途 |
|:--|:--|
| zcash_client_backend | “用于创建受保护 Zcash 轻客户端的 API”，包括同步和交易构建 |
| zcash_client_sqlite | “基于 SQLite 的 Zcash 轻客户端”，即上述内容的存储层 |
| zcash_keys | “Zcash 密钥和地址管理” |
| zcash_primitives | “Zcash 原语的 Rust 实现” |
| zcash_protocol | “Zcash 协议网络常量和数值类型” |
| orchard | “Orchard 受保护交易协议” |
| sapling-crypto | “用于 Zcash Sapling 的密码学库” |
| pczt | “用于处理部分创建的 Zcash 交易的工具”，用于硬件和多设备签名 |
| zip321 | 支付请求 URI，如 ZIP 321 所规定 |

对于移动端，[Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) 和 [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) 封装了这些库。iOS 代码仓库此前名为 ZcashLightClientKit，因此较旧的链接和文章会使用该名称。

## 规范与密码学

[协议规范](https://zips.z.cash/protocol/protocol.pdf)是关于 Zcash 工作方式的权威资料，包括[地址和密钥编码](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)。

[ZIPs](https://zips.z.cash) 是提出和规定变更的地方，索引显示哪些仍为草案、哪些已经定稿。共识变更通过网络升级发布，ZecHub 在[网络升级](/start-here/network-upgrades)页面跟踪这些变更。

如需了解底层密码学，请阅读 [The halo2 Book](https://zcash.github.io/halo2/index.html) 和 [The Orchard Book](https://zcash.github.io/orchard/)，并配合 [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) 和 [orchard](https://docs.rs/orchard/latest/orchard/) crate 文档。[The FROST Book](https://frost.zfnd.org/) 涵盖门限签名，ZecHub 也有一个 [FROST](/zcash-tech/frost) 页面。

## 测试网

测试网是一条使用无价值代币的独立区块链，代币称为 TAZ。Zebra 和 Zakura 都可以在其上运行，[测试网指南](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)涵盖节点配置。

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) 是一个可用的测试网区块浏览器，其主网对应站点为 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)。

获得 TAZ 是较棘手的部分。公共水龙头时有时无，而本文写作时，旧文档中链接的水龙头均未响应。可靠的途径是在 Zcash R&D Discord 中询问，这也是 Zcash 文档本身所建议的做法。

## 通用文档

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) 仍是最全面的单一来源，涵盖协议概念、集成和挖矿。阅读时需谨慎。它是针对 zcashd 进行版本管理的，因此其中部分内容描述了一个已不再运行的节点，但协议和轻客户端部分仍然有用。其中的 [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) 值得在设计任何涉及用户隐私的内容之前阅读。

如果你刚开始了解区块链，[Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) 是通常推荐的共享基础知识资料，可免费完整阅读。它不涵盖受保护交易。

## 开发者提及的其他工具

[Arti](https://docs.rs/arti/latest/arti/) 是 Tor 的 Rust 实现，供 zcash_client_backend 用于路由钱包流量。[Tailscale](https://github.com/tailscale/tailscale) 常被用于连接到你自行运行的节点。[warp2](https://github.com/hhanh00/warp2) 是 Hanh 开发的快速同步实现，但自 2023 年以来未再更新。

## 社区与活动

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) 是讨论协议和钱包开发的地方，而 [Zcash Community Forum](https://forum.zcashcommunity.com/) 则承载更长篇的提案和支持讨论串。

近期黑客松成果很好地展现了人们正在构建的内容：[ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)、[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283)以及 [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)。

## 已退役资源

保留这些资源是因为较旧的文章链接到它们，也因为它们仍是了解已退役节点行为方式的参考资料。请不要从这里开始。

[The Zcashd Book](https://zcash.github.io/zcash/) 和 [zcashd RPC 参考](https://zcash.github.io/rpc/) 记录的软件已于 2026 年 7 月[达到生命周期终点](https://zcash.github.io/zcash/user/end-of-life.html)。[zcash/zcash](https://github.com/zcash/zcash) 代码仓库已归档。

如果你有想添加的资源，或发现这里有过时内容，请提交 issue 或 pull request。团队并不总有能力让所有内容保持最新，而标记出你遇到的内容有助于指引指南的更新方向。

**最后更新：** 2026 年 8 月
