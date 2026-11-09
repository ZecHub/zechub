<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 开发者资源

构建 Zcash 所需的资源，按用途分类，而非堆在一个列表中。

2026 年技术栈发生了重大变化。zcashd 在 Zcash 历史上运行了大部分时间，于 2026 年 7 月 18 日在区块高度 3417100 达到生命周期终点，所有未修改的节点在该高度关闭并拒绝重新启动。为 zcashd 编写的指南现在是历史而非起点，因此本页面围绕替代方案组织。

## 技术栈概览

| 层级 | 使用工具 | 入门资源 |
|:--|:--|:--|
| 全节点 | Zebra 或 Zakura | [The Zebra Book](https://zebra.zfnd.org/)、[zakura.com](https://zakura.com/) |
| 全节点钱包 | Zallet（测试版） | [The Zallet Book](https://zcash.github.io/zallet/) |
| 轻钱包服务器 | Zaino 或 lightwalletd | [Zaino](https://github.com/zingolabs/zaino)、[lightwalletd](https://github.com/zcash/lightwalletd) |
| 钱包库 | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| 移动端 | Android 和 iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk)、[iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| 规范 | 协议规范和 ZIP | [zips.z.cash](https://zips.z.cash) |

## 节点

节点验证共识并保存链数据。目前有两个正在积极开发的实现。

[Zebra](/zcash-tech/zebra-full-node) 是 Zcash Foundation 的节点，用 Rust 编写，是大多数指南现在假设使用的节点。[The Zebra Book](https://zebra.zfnd.org/) 涵盖了安装和运行，[代码仓库](https://github.com/ZcashFoundation/zebra)是开发进行的地方。

[Zakura](/zcash-tech/zakura-node) 是一个较新的节点，其作者将其描述为"共识兼容的 Zcash 全节点，为规模化而构建"，具有更快的同步、区块修剪和 zcashd 兼容模式。它由 Zcash 联合创始人 Sean Bowe 和 Dev Ojha 领导。它在 Apache 2.0 许可证下开源，位于 [zakura-core/zakura](https://github.com/zakura-core/zakura)。

ZecHub 有一个[全节点](/zcash-tech/full-nodes)页面，涵盖了两者之间的权衡。

## 全节点钱包

zcashd 将钱包与节点捆绑在一起。该钱包已不复存在，[Zallet](https://github.com/zcash/zallet) 是其替代品。The Zallet Book 将其描述为"用 Rust 编写的全节点 Zcash 钱包"，正被"构建为 zcashd 钱包的替代品"。

在依赖它之前请阅读安全警告。Zallet 处于测试阶段，"尚未经过全面审查"，"可能随时发生"重大变更，"需要您删除并重新创建 Zallet 钱包"，而且并非所有 zcashd RPC 方法都已移植。

如果您要迁移现有配置，ZecHub 提供了[从 zcashd 迁移到 Zebra 和 Zallet 的指南](/guides/migration-guide-zcashd-to-zebrad-zallet)和 [Zallet 快速参考](/using-zcash/zallet-quick-reference-guide)。

## 轻钱包服务器

大多数钱包不运行节点，而是与保存链数据并返回紧凑视图的服务器通信。

[lightwalletd](https://github.com/zcash/lightwalletd) 是原始服务，用 Go 编写，被描述为"为 Zcash 区块链提供带宽高效接口的后端服务"。[Zaino](/zcash-tech/zaino) 是较新的索引器，用 Rust 编写，从完整验证器读取数据，而非携带自己的链副本。

[轻客户端协议](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html)文档涵盖了协议本身。[轻钱包节点](/zcash-tech/lightwallet-nodes)页面涵盖了这些服务器能看到和不能看到的用户信息，在选择之前值得了解。

## 构建钱包

大多数钱包工作在 [librustzcash](https://github.com/zcash/librustzcash) 下的 Rust crates 中进行，移动端 SDK 和几个桌面钱包都基于此构建。每个 crate 都在 [docs.rs](https://docs.rs) 上有文档。

| Crate | 用途 |
|:--|:--|
| zcash_client_backend | "用于创建隐蔽 Zcash 轻客户端的 API"，包括同步和交易构建 |
| zcash_client_sqlite | "基于 SQLite 的 Zcash 轻客户端"，上述的存储层 |
| zcash_keys | "Zcash 密钥和地址管理" |
| zcash_primitives | "Zcash 原语的 Rust 实现" |
| zcash_protocol | "Zcash 协议网络常量和值类型" |
| orchard | "Orchard 隐蔽交易协议" |
| sapling-crypto | "Zcash Sapling 密码学库" |
| pczt | "用于处理部分创建的 Zcash 交易的工具"，用于硬件和多设备签名 |
| zip321 | 支付请求 URI，如 ZIP 321 中所规定 |

对于移动端，[Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) 和 [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) 封装了这些库。iOS 仓库之前名为 ZcashLightClientKit，因此较旧的链接和文章使用该名称。

## 规范和密码学

[协议规范](https://zips.z.cash/protocol/protocol.pdf)是关于 Zcash 如何工作的权威文献，包括[地址和密钥编码](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys)。

[ZIP](https://zips.z.cash) 是提出和规定变更的地方，索引显示哪些是草案、哪些是最终版本。共识变更通过网络升级发布，ZecHub 在[网络升级](/start-here/network-upgrades)页面上跟踪这些。

对于底层密码学，请阅读 [The halo2 Book](https://zcash.github.io/halo2/index.html) 和 [The Orchard Book](https://zcash.github.io/orchard/)，以及 [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) 和 [orchard](https://docs.rs/orchard/latest/orchard/) crate 文档。[The FROST Book](https://frost.zfnd.org/) 涵盖了门限签名，ZecHub 有一个 [FROST](/zcash-tech/frost) 页面。

## 测试网

测试网是一条使用无价值代币（称为 TAZ）的独立链。Zebra 和 Zakura 都可以在其上运行，[测试网指南](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html)涵盖了节点配置。

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) 是一个可用的测试网区块浏览器，主网对应版本在 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)。

获取 TAZ 是比较棘手的部分，因为旧文档中链接的水龙头已停止响应。[zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) 是一个社区运营的水龙头，运行"自己的节点、钱包和矿工"，支付"隐蔽 z2z 小额发放"，并使用"浏览器工作量证明而非验证码供应商"来限制请求。它在 MIT 许可证下开源。如果不可用，请在 Zcash R&D Discord 中询问，这也是 Zcash 文档本身建议的做法。

## 通用文档

[Zcash 文档](https://zcash.readthedocs.io/en/latest/)仍然是最广泛的单一来源，涵盖协议概念、集成和挖矿。请谨慎阅读。它是针对 zcashd 版本化的，因此其中部分描述的是不再运行的节点，而协议和轻客户端部分仍然有用。其中的 [Zcash 钱包应用威胁模型](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html)在设计任何涉及用户隐私的东西之前值得阅读。

如果您是区块链新手，[Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) 是共享基础知识的通常推荐，可以免费完整阅读。它不涵盖隐蔽交易。

## 开发者提到的其他工具

[Arti](https://docs.rs/arti/latest/arti/) 是 Tor 的 Rust 实现，被 zcash_client_backend 用于路由钱包流量。[Tailscale](https://github.com/tailscale/tailscale) 用于连接您自己运行的节点。[warp2](https://github.com/hhanh00/warp2) 是 Hanh 的快速同步实现，但自 2023 年以来未更新。

## 社区和活动

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) 是讨论协议和钱包开发的地方，[Zcash Community Forum](https://forum.zcashcommunity.com/) 承载较长的提案和支持帖子。

近期的黑客松结果是人们正在构建什么的好参考：[ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489)、[ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) 和 [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)。

## 已退役资源

保留这些是因为较旧的文章链接到它们，以及它们仍然是已退役节点行为的参考。不要从这里开始。

[The zcashd Book](https://zcash.github.io/zcash/) 和 [zcashd RPC 参考](https://zcash.github.io/rpc/)记录了在 2026 年 7 月达到[生命周期终点](https://zcash.github.io/zcash/user/end-of-life.html)的软件。[zcash/zcash](https://github.com/zcash/zcash) 仓库已归档。

如果您有资源要添加，或发现这里有过时的内容，请提交 issue 或 pull request。团队并不总是有能力保持所有内容最新，标记您遇到的问题有助于引导指南的更新。

**最后更新：** 2026 年 8 月
