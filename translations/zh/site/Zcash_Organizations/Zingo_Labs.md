#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[官方网站](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs 是一支致力于提升人类体验的远见者团队。我们相信，技术应当造福人类，而我们通过双方同意的互动蓬勃发展。我们正在识别使这一切成为可能的模式。

Zingo Lab Cyan 作为一个 Shielded DAO 运作。我们将资金存放在金库中，每位成员都拥有查看密钥。当成员投票支持某项提案时，资金便会从金库中支出。

## 项目

### Zingo! 钱包 ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo 钱包是一款功能齐全的 Zcash 钱包，旨在提供良好的用户体验，同时也包含一些面向高级用户的进阶功能。它支持透明、Sapling 和 Ironwood 资金池，拥有用于重复付款的地址簿，并提供多种语言版本。它是首个支持 Orchard 并实现 NU5 格式的钱包。

Zingo! 的主要功能之一是能够使用 Memo 字段，为你的交易提供有价值的洞见。

Zingo! 可用于移动设备和 PC。你可以在[这里](https://zingolabs.org/)找到所有下载内容

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
一个向应用程序提供 Zcash 功能的 API 和测试应用。Zingolib 同时提供 zingo-mobile 库，以及一个名为 zingo-cli 的内置 cli 应用程序；它是一款命令行轻钱包，可与诸如 [Zaino](/zcash-tech/zaino) 的链索引器通信。

### Zaino 索引器 ([GitHub](https://github.com/zingolabs/zaino))
Zaino 是由 Zingo 团队开发的、面向 Zcash 区块链的 Rust 索引器。它是 [Z3 stack](/zcash-tech/z3-stack) 中的索引器：它从 [Zebra](/zcash-tech/zebra-full-node) 验证器索引链上数据，并为钱包、浏览器和其他客户端提供服务。它是 lightwalletd 的继任路径。

Zaino 为轻客户端（如不需要完整区块链历史的钱包和应用程序）以及完整客户端或钱包提供必要功能。它还支持区块浏览器，可访问已最终确认的区块链，以及由 Zebra 完整验证器管理的未最终确认的最佳链和内存池。

`zcashd` 于 2026 年 7 月 18 日在区块 3,417,100 达到其停止支持节点，并且不支持 Ironwood (NU6.3)。Zaino 读取 Zebra 验证器。

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

一组用于启动和管理 Zcash 进程的实用工具。这用于以下项目开发中的集成测试：
- 轻客户端
- 索引器
- 验证器

其目标是为核心节点（验证器）提供一个高度适应性强且稳健的测试环境，例如 Zebra；为索引器提供测试环境，例如 Zaino；以及为轻客户端钱包提供测试环境，例如 zingo-cli。

其启动的默认堆栈为 Zebrad、zainod 和 zcash-devtool。旧版 `zcashd` 和 lightwalletd 进程位于不受支持的 `legacy-stack` 功能之后，并计划移除。

除提供用于启动、缓存和加载 Zcash 链数据（适用于主网、测试网和 regtest）的工具外，zcash-local-net 还在 Zaino 的测试套件中用于评估托管于 Zaino 的 Lightwallet RPC 服务（参见 [Zaino 测试文档](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)）。
