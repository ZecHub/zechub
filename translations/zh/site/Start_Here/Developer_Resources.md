<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 开发者资源

构建 Zcash 所需的资源，按各自用途分类，而非堆列在一起。

该技术栈在 2026 年发生了很大变化。曾在其大部分历史中运行网络的 zcashd，于 2026 年 7 月 18 日在区块高度 3417100 达到生命周期终点，所有未经修改的节点都在该高度关闭，并将拒绝重新启动。为 zcashd 编写的指南如今已成为历史，而非起点，因此本页围绕替代它的方案组织。

## 技术栈概览

| 层级 | 使用什么 | 从这里开始 |
|:--|:--|:--|
| 全节点 | Zebra 或 Zakura | [Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| 全节点钱包 | Zallet，处于测试阶段 | [Zallet Book](https://zcash.github.io/zallet/) |
| 轻钱包服务器 | Zaino 或 lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| 钱包库 | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| 移动端 | Android 和 iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 规范 | 协议规范和 ZIPs | [zips.z.cash](https://zips.z.cash) |

## 节点

节点验证共识并保存区块链。目前有两个正在积极开发的实现。

[Zebra](/zcash-tech/zebra-full-node) 是 Zcash Foundation 的节点，以 Rust 编写，也是如今大多数指南所默认使用的节点。[Zebra Book](https://zebra.zfnd.org/) 介绍如何安装和运行它，而[代码仓库](https://github.com/ZcashFoundation/zebra)则是开发进行的地方。

[Zakura](/zcash-tech/zakura-node) 是一个较新的节点，其作者将其描述为“为扩展性而构建、与共识兼容的 Zcash 全节点”，具备更快的同步、区块裁剪以及 zcashd 兼容模式。它由 Zcash 联合创始人 Sean Bowe 和 Dev Ojha 领导。其以 Apache 2.0 许可证开源，代码位于 [zakura-core/zakura](https://github.com/zakura-core/zakura)。

ZecHub 有一个[全节点](/zcash-tech/full-nodes)页面，介绍它们之间的权衡取舍。

## 全节点钱包

zcashd 将钱包与节点捆绑在一起。该钱包已经退出，而 [Zallet](https://github.com/zcash/zallet) 是其替代方案。Zallet Book 将其描述为“以 Rust 编写的 Zcash 全节点钱包”，正在“作为 zcashd 钱包的替代方案构建”。

在依赖它之前，请阅读安全警告。Zallet 仍处于测试阶段，“尚未经过全面审查”，破坏性变更“可能随时发生，要求你删除并重新创建你的 Zallet 钱包”，且并非所有 zcashd RPC 方法都已完成迁移。

如果你正在迁移现有设置，ZecHub 提供了[从 zcashd 迁移到 Zebra 和 Zallet 的指南](/guides/migration-guide-zcashd-to-zebrad-zallet)以及 [Zallet 快速参考](/using-zcash/zallet-quick-reference-guide)。

## 轻钱包服务器

大多数钱包不会运行节点。它们与一台保存区块链并返回其紧凑视图的服务器通信。

[lightwalletd](https://github.com/zcash/lightwalletd) 是原始服务，以 Go 编写，被描述为“提供通向 Zcash 区块链的带宽高效接口的后端服务”。[Zaino](/zcash-tech/zaino) 是较新的索引器，以 Rust 编写，从完整验证器读取数据，而不是自行保存区块链副本。

[轻客户端协议](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html)文档介绍协议本身。[轻钱包节点](/zcash-tech/lightwallet-nodes)页面介绍这些服务器能够和不能够看到的用户信息；在选择之前，理解这一点很重要。

## 构建钱包

大多数钱包开发工作都在 [librustzcash](https://github.com/zcash/librustzcash) 下的 Rust crates 中完成，移动端 SDK 和数个桌面钱包都基于它构建。每个 crate 都在 [docs.rs](https://docs.rs) 上有文档。

| Crate | 用途 |
|:--|:--|
| zcash_client_backend | “用于创建屏蔽 Zcash 轻客户端的 API”，包括同步和交易构建 |
| zcash_client_sqlite | “基于 SQLite 的 Zcash 轻客户端”，即上述组件的存储层 |
| zcash_keys | “Zcash 密钥和地址管理” |
| zcash_primitives | “Zcash 原语的 Rust 实现” |
| zcash_protocol | “Zcash 协议网络常量和数值类型” |
| orchard | “Orchard 屏蔽交易协议” |
| sapling-crypto | “用于 Zcash Sapling 的密码学库” |
| pczt | “用于处理部分创建的 Zcash 交易的工具”，用于硬件和多设备签名 |
| zip321 | 由 ZIP 321 指定的付款请求 URI |

对于移动端，[Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) 和 [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk)封装了这些库。iOS 代码仓库此前名为 ZcashLightClientKit，因此较旧的链接和文章会使用这个名称。

## 规范与密码学

[协议规范](https://zips.z.cash/protocol/protocol.pdf)是关于 Zcash 工作方式的权威资料，包括[地址和密钥编码](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)。

[ZIPs](https://zips.z.cash) 是提出和规定变更的地方，其索引会显示哪些是草案、哪些已最终确定。共识变更会在网络升级中发布，ZecHub 在[网络升级](/start-here/network-upgrades)页面追踪这些变更。

若要了解底层密码学，请阅读 [halo2 Book](https://zcash.github.io/halo2/index.html) 和 [Orchard Book](https://zcash.github.io/orchard/)，并结合 [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) 和 [orchard](https://docs.rs/orchard/latest/orchard/) crate 文档。[FROST Book](https://frost.zfnd.org/)介绍门限签名，ZecHub 也有一个 [FROST](/zcash-tech/frost) 页面。

## 测试网

测试网是一条使用无价值代币 TAZ 的独立区块链。Zebra 和 Zakura 都可以针对它运行，[测试网指南](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)介绍节点配置。

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) 是可用的测试网区块浏览器，其主网对应版本为 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)。

获取 TAZ 是棘手的部分。公共水龙头会出现又消失，且本页撰写时，旧文档中链接的水龙头均未响应。可靠的途径是在 Zcash R&D Discord 中询问，这也是 Zcash 文档本身建议的方法。

## 通用文档

[Zcash 文档](https://zcash.readthedocs.io/en/latest/)仍然是最全面的单一来源，涵盖协议概念、集成和挖矿。阅读时请稍加留意。它以 zcashd 为版本依据，因此部分内容描述的是一个已不再运行的节点；不过协议和轻客户端部分仍然有用。其中的 [Zcash 钱包应用威胁模型](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html)值得在设计任何涉及用户隐私的内容之前阅读。

如果你对区块链整体而言还不熟悉，通常推荐阅读 [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)，以了解共同的基础知识，而且可以免费完整阅读。它不涵盖屏蔽交易。

## 开发者提及的其他工具

[Arti](https://docs.rs/arti/latest/arti/) 是 Tor 的 Rust 实现，供 zcash_client_backend 用于路由钱包流量。[Tailscale](https://github.com/tailscale/tailscale)常被用于连接到你自己运行的节点。[warp2](https://github.com/hhanh00/warp2) 是 Hanh 开发的快速同步实现，不过自 2023 年以来一直没有更新。

## 社区与活动

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK)是讨论协议和钱包开发的地方，而 [Zcash Community Forum](https://forum.zcashcommunity.com/)则承载篇幅较长的提案和支持讨论串。

近期黑客松的成果能够很好地反映人们正在构建什么：[ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)、[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283)以及 [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)。

## 已弃用资源

因较旧文章仍链接至这些资源，也因它们仍是了解已弃用节点行为方式的参考资料，所以予以保留。不要从这里开始。

[Zcashd Book](https://zcash.github.io/zcash/) 和 [zcashd RPC 参考](https://zcash.github.io/rpc/)记录的软件已于 2026 年 7 月达到[生命周期终点](https://zcash.github.io/zcash/user/end-of-life.html)。[zcash/zcash](https://github.com/zcash/zcash)代码仓库已归档。

如果你有资源可补充，或发现此处有内容已经过时，请提交 issue 或 pull request。团队并不总有能力让所有内容保持最新，指出你遇到的问题有助于指引指南的更新方向。

**最后更新：**2026 年 8 月
