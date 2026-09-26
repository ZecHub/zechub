<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 开发者资源

构建 Zcash 所需的资源，按各自用途分类，而不是全部堆在一起列出。

技术栈在 2026 年发生了巨大变化。承担网络运行职责长达其历史大部分时间的 zcashd，于 2026 年 7 月 18 日在区块高度 3417100 结束生命周期；所有未经修改的节点都会在该高度关闭并拒绝重新启动。为 zcashd 编写的指南如今是历史记录，而不再是起点，因此本页面围绕替代它的技术进行组织。

## 技术栈概览

| 层级 | 使用什么 | 从这里开始 |
|:--|:--|:--|
| 完整节点 | Zebra 或 Zakura | [The Zebra Book](https://zebra.zfnd.org/)、[zakura.com](https://zakura.com/) |
| 完整节点钱包 | Zallet，处于测试版 | [The Zallet Book](https://zcash.github.io/zallet/) |
| 轻钱包服务器 | Zaino 或 lightwalletd | [Zaino](https://github.com/zingolabs/zaino)、[lightwalletd](https://github.com/zcash/lightwalletd) |
| 钱包库 | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| 移动端 | Android 和 iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk)、[iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 规范 | 协议规范和 ZIP | [zips.z.cash](https://zips.z.cash) |

## 节点

节点验证共识并保存区块链。目前有两种正在积极开发的实现。

[Zebra](/zcash-tech/zebra-full-node) 是 Zcash Foundation 的节点，以 Rust 编写，也是目前大多数指南所默认采用的实现。[The Zebra Book](https://zebra.zfnd.org/) 介绍了如何安装和运行它，而开发工作则在[代码仓库](https://github.com/ZcashFoundation/zebra)中进行。

[Zakura](/zcash-tech/zakura-node) 是一个较新的节点，其作者将它描述为“为扩展性而构建、兼容共识的 Zcash 完整节点”，具备更快的同步、区块裁剪和 zcashd 兼容模式。它由 Zcash 联合创始人 Sean Bowe 和 Dev Ojha 领导，在 [zakura-core/zakura](https://github.com/zakura-core/zakura) 以 Apache 2.0 协议开源。

ZecHub 的[完整节点](/zcash-tech/full-nodes)页面介绍了它们之间的权衡。

## 完整节点钱包

zcashd 将钱包与节点捆绑在一起。该钱包已不复存在，而 [Zallet](https://github.com/zcash/zallet) 是其替代方案。The Zallet Book 将其描述为“以 Rust 编写的完整节点 Zcash 钱包”，并称其“旨在替代 zcashd 钱包”。

在依赖它之前，请阅读安全警告。Zallet 仍处于测试版，“尚未经过完整审查”；破坏性变更“可能随时发生，要求你删除并重新创建你的 Zallet 钱包”；并且并非所有 zcashd RPC 方法都已移植。

如果你正在迁移现有配置，ZecHub 提供了[从 zcashd 迁移到 Zebra 和 Zallet 的指南](/guides/migration-guide-zcashd-to-zebrad-zallet)以及 [Zallet 快速参考](/using-zcash/zallet-quick-reference-guide)。

## 轻钱包服务器

大多数钱包不会运行节点。它们会与一台保存区块链并返回其紧凑视图的服务器通信。

[lightwalletd](https://github.com/zcash/lightwalletd) 是原始服务，以 Go 编写，被描述为“提供通往 Zcash 区块链的带宽高效接口的后端服务”。[Zaino](/zcash-tech/zaino) 是较新的索引器，以 Rust 编写；它从完整验证器读取数据，而不是自行保存一份区块链副本。

[轻客户端协议](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html)文档介绍了协议本身。[轻钱包节点](/zcash-tech/lightwallet-nodes)页面介绍了这些服务器能够和不能够了解用户的哪些信息，在选择之前值得先理解这一点。

## 构建钱包

大多数钱包开发工作都在 [librustzcash](https://github.com/zcash/librustzcash) 下的 Rust crates 中进行，移动端 SDK 和若干桌面钱包均构建于这些库之上。每个 crate 都在 [docs.rs](https://docs.rs) 上有文档。

| Crate | 用途 |
|:--|:--|
| zcash_client_backend | “用于创建屏蔽式 Zcash 轻客户端的 API”，包括同步和交易构建 |
| zcash_client_sqlite | “基于 SQLite 的 Zcash 轻客户端”，即上述内容的存储层 |
| zcash_keys | “Zcash 密钥和地址管理” |
| zcash_primitives | “Zcash 基础原语的 Rust 实现” |
| zcash_protocol | “Zcash 协议网络常量和值类型” |
| orchard | “Orchard 屏蔽式交易协议” |
| sapling-crypto | “用于 Zcash Sapling 的密码学库” |
| pczt | “用于处理部分创建的 Zcash 交易的工具”，用于硬件和多设备签名 |
| zip321 | 由 ZIP 321 指定的支付请求 URI |

在移动端，[Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) 和 [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) 对这些库进行了封装。iOS 代码仓库此前名为 ZcashLightClientKit，因此较旧的链接和文章会使用这个名称。

## 规范与密码学

[协议规范](https://zips.z.cash/protocol/protocol.pdf)是关于 Zcash 工作原理的权威资料，包括[地址和密钥编码](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)。

[ZIP](https://zips.z.cash) 是提出和规定变更的地方，其索引展示了哪些是草案、哪些已定稿。共识变更通过网络升级发布，ZecHub 在[网络升级](/start-here/network-upgrades)页面跟踪这些变更。

关于底层密码学，请阅读 [The halo2 Book](https://zcash.github.io/halo2/index.html) 和 [The Orchard Book](https://zcash.github.io/orchard/)，并结合 [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) 和 [orchard](https://docs.rs/orchard/latest/orchard/) crate 文档阅读。[The FROST Book](https://frost.zfnd.org/) 介绍阈值签名，ZecHub 也有一个 [FROST](/zcash-tech/frost) 页面。

## 测试网

测试网是一条拥有无价值代币、名为 TAZ 的独立区块链。Zebra 和 Zakura 都可以针对它运行，[测试网指南](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)介绍了节点配置。

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) 是一个可用的测试网区块浏览器，其主网对应版本位于 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)。

获取 TAZ 是较为棘手的部分，因为旧文档中链接的水龙头已停止响应。[zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) 是一个由社区运营的水龙头，运行“自己的节点、钱包和矿工”，发放“屏蔽的 z2z 小额滴灌”，并通过“浏览器工作量证明而非验证码供应商”来限制领取。它以 MIT 许可证开源。如果该水龙头不可用，请在 Zcash R&D Discord 中询问，这也是 Zcash 文档本身所建议的方式。

## 通用文档

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) 仍然是覆盖范围最广的单一资料来源，涵盖协议概念、集成和挖矿。阅读时需要留意：它是按 zcashd 进行版本管理的，因此其中部分内容描述的是一个已不再运行的节点；不过协议和轻客户端部分仍然有用。其中的 [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) 值得在设计任何涉及用户隐私的内容前阅读。

如果你刚接触区块链，[Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) 是通常推荐用来学习共同基础知识的资料，并且可免费完整阅读。它不涵盖屏蔽式交易。

## 开发者提到过的其他工具

[Arti](https://docs.rs/arti/latest/arti/) 是 Tor 的 Rust 实现，供 zcash_client_backend 用于路由钱包流量。[Tailscale](https://github.com/tailscale/tailscale) 常用于连接到你自行运行的节点。[warp2](https://github.com/hhanh00/warp2) 是 Hanh 开发的快速同步实现，不过自 2023 年起便未再更新。

## 社区与活动

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) 是讨论协议和钱包开发的地方，而 [Zcash Community Forum](https://forum.zcashcommunity.com/) 则承载篇幅更长的提案和支持讨论串。

近期黑客松成果能很好地反映人们正在构建什么：[ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)、[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) 和 [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)。

## 已弃用资源

之所以保留，是因为旧文章链接到了它们，也因为它们仍是了解已弃用节点行为方式的参考资料。请不要从这里开始。

[The Zcashd Book](https://zcash.github.io/zcash/) 和 [zcashd RPC 参考](https://zcash.github.io/rpc/) 记录的软件已于 2026 年 7 月[结束生命周期](https://zcash.github.io/zcash/user/end-of-life.html)。[zcash/zcash](https://github.com/zcash/zcash) 代码仓库已归档。

如果你有想补充的资源，或发现这里有内容已经过时，请提交 issue 或 pull request。团队未必总有能力让所有内容保持最新，而标记出你遇到的问题有助于引导指南的完善。

**最后更新：**2026 年 8 月
