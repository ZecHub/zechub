#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="替代文本" width="50"/> ZingoLabs

[官方网站](https://zingolabs.org/) - [Github](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs 是一个由富有远见者组成的团队，致力于提升人类体验。我们相信技术应当造福人类，而我们通过共识性互动得以蓬勃发展。我们正在识别使这一切成为可能的模式。

Zingo Lab Cyan 作为一个 Shielded DAO 运作。我们将资金存储在一个金库中，每位成员都拥有一个 view key。当成员投票支持某项提案时，资金就会从金库中支出。

## 项目

### Zingo! Wallet ([Github](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet 是一款功能完整、注重易用性的 Zcash 钱包，同时也包含一些面向高级用户的进阶功能。它支持 transparent、Sapling 和 Orchard 资金池，带有用于重复付款的地址簿，并提供多种语言版本。它是首个支持 Orchard 并实现 NU5 格式的钱包。

Zingo! 的一个主要功能，是它能够使用 Memo 字段为你的交易提供有价值的洞察。

Zingo! 可用于移动设备和 PC。你可以在[这里](https://zingolabs.org/)找到所有下载链接。

### Zingolib ([Github](https://github.com/zingolabs/zingolib))
一个 API 和测试应用，用于向应用程序公开 zcash 功能。Zingolib 既为 zingo-mobile 提供库，也内置了一个名为 Zingo-cli 的 CLI 应用程序，用于通过 lightwalletd 与 zcashd 交互，它是一个命令行 lightwalletd 代理客户端。

### Zaino Indexer ([Github](https://github.com/zingolabs/zaino))
Zaino 是由 Zingo 团队使用 Rust 开发的一个 Indexer，目标是替代 lightwalletd 并推动 zcashd 弃用项目向前发展。

Zaino 为轻客户端（如钱包和不需要完整区块链历史的应用程序）以及全客户端或钱包提供关键功能。它还支持区块浏览器，可访问由 Zebra 或 Zcashd 全验证节点管理的已最终确认区块链，以及未最终确认的最佳链和内存池。

###  ZLN (zcash-local-net) ([Github](https://github.com/zingolabs/zcash-local-net))
一组用于启动和管理 Zcash 进程的实用工具。这被用于以下开发中的集成测试：
- 轻客户端
- indexer
- 验证节点

其目标是为核心节点（验证节点）（如 zcash 和 zebra）、indexer（如 lightwallet 和 zaino），以及至少作为轻客户端钱包的 zingo-cli，提供一个高度可适配且稳健的测试环境。

该仓库旨在比较不同验证节点（如 Zcashd 和 Zebrad）以及 indexer（如 Lightwalletd 和 Zaino）的功能，以便在 Zcashd 弃用过程中促进迁移。

除了提供用于启动、缓存和加载 Zcash 链数据（适用于 mainnet、testnet 和 regtest）的工具外，zcash-zocal-net 还包含一系列测试，用于比较 Lightwalletd 和 Zaino 在所有 Lightwallet RPC 服务上的能力。这些测试可以直接从 Zaino 执行（参见 [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)])，以评估由 Zaino 托管的 Lightwallet RPC 服务。
