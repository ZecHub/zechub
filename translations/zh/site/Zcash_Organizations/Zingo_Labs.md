#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[官方网站](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs 是一支致力于改善人类体验的远见者团队。我们相信技术应当造福人类，并且我们通过合意互动蓬勃发展。我们正在识别使这一切成为可能的模式。

Zingo Lab Cyan 作为一个屏蔽 DAO [Shielded DAO] 运作。我们将资金存放在一个金库 [treasury] 中，每位成员都拥有一个 viewing key。成员投票赞成某项提案时，资金便会从金库中支出。

## 项目

### Zingo! 钱包 [Wallet] ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo 钱包是一款功能齐全的 Zcash 钱包，专为用户友好性而设计，同时也包含面向高级用户的一些进阶功能。它支持透明 [transparent]、Sapling 和 Ironwood pool，具有用于重复支付的地址簿 [address book]，并提供多种语言版本。它是首个支持 Orchard 并实现 NU5 格式的钱包。

Zingo! 的主要功能之一是能够使用备忘录 [Memo] 字段，为您的交易 [transactions] 提供有价值的洞察。

Zingo! 可用于移动设备和 PC。您可以在 [这里](https://zingolabs.org/) 找到所有下载内容

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
一个供应用使用的 API 和测试应用，公开 zcash 功能。Zingolib 既为 zingo-mobile 提供库，也包含一个名为 zingo-cli 的 cli 应用，这是一个与链 [chain] 索引器通信的命令行轻钱包，例如 [Zaino](/zcash-tech/zaino)。

### Zaino 索引器 [Indexer] ([GitHub](https://github.com/zingolabs/zaino))
Zaino 是由 Zingo 团队开发的、用于 Zcash blockchain 的 Rust 索引器。它是 [Z3 堆栈](/zcash-tech/z3-stack)中的索引器：它从 [Zebra](/zcash-tech/zebra-full-node) 验证器索引链数据，并服务于钱包、浏览器及其他客户端。它是 lightwalletd 的后续方案。

Zaino 为轻客户端 [light clients]（如不需要完整 blockchain 历史记录的钱包和应用）以及全客户端 [full clients] 或钱包提供基本功能。它还支持区块链浏览器 [block explorers]，可访问已最终确定的 blockchain，以及由 Zebra 全验证器管理的尚未最终确定的最佳链和内存池 [mempool]。

`zcashd` 于 2026 年 7 月 18 日在区块 [block] 3,417,100 达到支持终止停止状态，并且不支持 Ironwood (NU6.3)。Zaino 读取一个 Zebra 验证器。

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

一组用于启动和管理 Zcash 进程的工具 [utilities]。它用于以下项目开发中的集成测试：
- 轻客户端
- 索引器
- 验证器

其目标是为核心节点 [core nodes]（验证器），如 Zebra；索引器，如 Zaino；以及轻客户端钱包，如 zingo-cli，提供高度适应性强且稳健的测试环境。

它启动的默认堆栈是 Zebrad、zainod 和 zcash-devtool。旧版 `zcashd` 和 lightwalletd 进程位于一个不受支持的 `legacy-stack` 功能之后，并计划移除。

除了提供用于启动、缓存和加载 Zcash 链数据（适用于主网、测试网和 regtest）的工具外，zcash-local-net 还从 Zaino 的测试套件中用于评估托管在 Zaino 中的 Lightwallet RPC 服务（请参阅 [Zaino 测试文档](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)）。
