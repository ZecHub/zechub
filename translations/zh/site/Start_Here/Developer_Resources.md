<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 开发者资源

你在 Zcash 上进行构建所需的资源，按各自用途分组，而不是杂乱地堆在一起列出。

这一技术栈在 2026 年发生了很大变化。`zcashd` 在其历史的大部分时间里都负责运行网络，但它已于 2026 年 7 月 18 日在区块高度 3417100 到达生命周期终点，此后所有未修改的节点都会在该高度关闭，并拒绝重新启动。为 `zcashd` 编写的指南如今更像是历史资料，而不再是入门起点，因此本页围绕取代它的内容进行组织。

## 技术栈概览

| 层级 | 使用什么 | 从这里开始 |
|:--|:--|:--|
| 全节点 | Zebra 或 Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| 全节点钱包 | Zallet，测试版 | [The Zallet Book](https://zcash.github.io/zallet/) |
| 轻钱包服务器 | Zaino 或 lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| 钱包库 | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| 移动端 | Android 和 iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 规范 | 协议规范和 ZIP | [zips.z.cash](https://zips.z.cash) |

## 节点

节点负责验证共识并保存链数据。目前有两个仍在积极开发的实现。

[Zebra](/zcash-tech/zebra-full-node) 是 Zcash Foundation 的节点实现，使用 Rust 编写，也是现在大多数指南默认使用的实现。[The Zebra Book](https://zebra.zfnd.org/) 介绍了如何安装和运行它，而[代码仓库](https://github.com/ZcashFoundation/zebra)则是开发进行的地方。

[Zakura](/zcash-tech/zakura-node) 是较新的节点，其作者将其描述为“一个与共识兼容的 Zcash 全节点，为扩展性而构建”，具备更快的同步、区块裁剪以及 `zcashd` 兼容模式。它由 Zcash 联合创始人 Sean Bowe 和 Dev Ojha 领导开发。它以 Apache 2.0 开源，代码位于 [zakura-core/zakura](https://github.com/zakura-core/zakura)。

ZecHub 有一个[全节点](/zcash-tech/full-nodes)页面，介绍了它们之间的权衡取舍。

## 全节点钱包

`zcashd` 曾将钱包与节点打包在一起。这个钱包已经退出，[Zallet](https://github.com/zcash/zallet) 是它的替代品。The Zallet Book 将其描述为“一个用 Rust 编写的全节点 Zcash 钱包”，并且“正被构建为 `zcashd` 钱包的替代品”。

在依赖它之前，请先阅读安全警告。Zallet 目前处于 beta 阶段，“尚未经过完整审查”，随时“可能发生破坏性变更，要求你删除并重新创建你的 Zallet 钱包”，而且并非所有 `zcashd` RPC 方法都已经移植完成。

如果你正在迁移现有配置，ZecHub 提供了[从 zcashd 迁移到 Zebra 和 Zallet 的指南](/guides/migration-guide-zcashd-to-zebrad-zallet)以及一个[Zallet 快速参考](/using-zcash/zallet-quick-reference-guide)。

## 轻钱包服务器

大多数钱包并不运行节点。它们会连接到一个保存链数据并返回其压缩视图的服务器。

[lightwalletd](https://github.com/zcash/lightwalletd) 是最初的服务，使用 Go 编写，被描述为“一个为 Zcash 区块链提供带宽高效接口的后端服务”。[Zaino](/zcash-tech/zaino) 是较新的索引器，使用 Rust 编写，它从完整验证器读取数据，而不是自己保存一份链副本。

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) 文档介绍了协议本身。[Lightwallet Nodes](/zcash-tech/lightwallet-nodes) 页面介绍了这些服务器对于用户信息能看到什么、看不到什么，在你选择其一之前，这一点值得先理解清楚。

## 构建钱包

大多数钱包开发工作都发生在 [librustzcash](https://github.com/zcash/librustzcash) 下的 Rust crates 中，移动端 SDK 和若干桌面钱包都构建于其上。每个 crate 都在 [docs.rs](https://docs.rs) 上有文档。

| Crate | 用途 |
|:--|:--|
| zcash_client_backend | “用于创建受屏蔽 Zcash 轻客户端的 API”，包括同步和交易构建 |
| zcash_client_sqlite | “一个基于 SQLite 的 Zcash 轻客户端”，是上述组件的存储层 |
| zcash_keys | “Zcash 密钥和地址管理” |
| zcash_primitives | “Zcash 基础构件的 Rust 实现” |
| zcash_protocol | “Zcash 协议网络常量和值类型” |
| orchard | “Orchard 受屏蔽交易协议” |
| sapling-crypto | “用于 Zcash Sapling 的密码学库” |
| pczt | “处理部分创建的 Zcash 交易的工具”，用于硬件和多设备签名 |
| zip321 | 支付请求 URI，按 ZIP 321 规范定义 |

在移动端，[Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) 和 [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) 对这些库进行了封装。iOS 仓库此前名为 ZcashLightClientKit，因此较早的链接和文章会使用这个名字。

## 规范与密码学

[协议规范](https://zips.z.cash/protocol/protocol.pdf) 是关于 Zcash 如何运作的权威说明，其中包括[地址和密钥编码](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)。

[ZIP](https://zips.z.cash) 是提议和定义变更的地方，索引页会显示哪些仍是草案，哪些已经定稿。共识变更会通过网络升级发布，ZecHub 在[网络升级](/start-here/network-upgrades)页面追踪这些内容。

关于底层密码学，可以阅读 [The halo2 Book](https://zcash.github.io/halo2/index.html) 和 [The Orchard Book](https://zcash.github.io/orchard/)，并配合阅读 [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) 与 [orchard](https://docs.rs/orchard/latest/orchard/) crate 文档。[The FROST Book](https://frost.zfnd.org/) 介绍了门限签名，ZecHub 也有一个 [FROST](/zcash-tech/frost) 页面。

## 测试网

测试网是一条独立的链，使用没有价值的代币，称为 TAZ。Zebra 和 Zakura 都可以在其上运行，[测试网指南](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)介绍了节点配置。

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) 是一个可用的测试网区块浏览器，与之对应的主网版本位于 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)。

获取 TAZ 才是麻烦的部分。公共水龙头时有时无，而本页撰写时，旧文档中链接的那些都没有响应。最可靠的方式是在 Zcash R&D Discord 中询问，这也是 Zcash 官方文档本身所建议的方法。

## 通用文档

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) 仍然是覆盖面最广的单一资料来源，内容包括协议概念、集成和挖矿。不过阅读时需要留意。它是按 `zcashd` 版本维护的，因此其中某些部分描述的是一个已经无法运行的节点，而协议和轻客户端部分仍然有用。那里收录的 [Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) 在你设计任何涉及用户隐私的内容之前都值得一读。

如果你对 blockchain 整体还是新手，[Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) 是关于共通基础知识的常见推荐，而且可以免费完整阅读。它不涉及受屏蔽交易。

## 开发者提到的其他工具

[Arti](https://docs.rs/arti/latest/arti/) 是 Tor 的 Rust 实现，`zcash_client_backend` 使用它来路由钱包流量。[Tailscale](https://github.com/tailscale/tailscale) 常被用于连接到你自己运行的节点。[warp2](https://github.com/hhanh00/warp2) 是 Hanh 开发的一个快速同步实现，不过自 2023 年以来尚未更新。

## 社区与活动

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) 是讨论协议和钱包开发的地方，而 [Zcash Community Forum](https://forum.zcashcommunity.com/) 则承载更长篇的提案和支持讨论串。

近期黑客松结果很好地展示了大家在构建什么：[ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)、[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) 以及 [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)。

## 已退役资源

之所以保留这些资源，是因为较早的文章仍然链接到它们，也因为它们仍是了解已退役节点行为方式的参考资料。不要从这里开始。

[The Zcashd Book](https://zcash.github.io/zcash/) 和 [zcashd RPC reference](https://zcash.github.io/rpc/) 记录的是已于 2026 年 7 月到达[生命周期终点](https://zcash.github.io/zcash/user/end-of-life.html)的软件。[zcash/zcash](https://github.com/zcash/zcash) 仓库已归档。

如果你有资源想补充，或发现这里有内容已经过时，请提交 issue 或 pull request。各团队并不总有能力让所有内容都保持最新，而指出你遇到的问题有助于引导这些指南的更新方向。

**最后更新：** 2026 年 8 月
