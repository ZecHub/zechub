# 索引器基准测试：Zaino 与 Ztreamer

Zaino 和 Ztreamer 是两个提供 lightwallet gRPC 协议服务的索引器，该 API 供 Zcash 轻钱包用于同步。本页总结了对两者进行的独立且可复现的比较：它们是否返回相同的结果、构建索引所需的时间，以及为钱包提供服务的速度。

## 摘要

* 两个索引器都返回正确的链上数据。每个能够与 Zebra 核对的响应均一致，因此钱包可以使用其中任意一个。
* 发现的差异属于约定和边缘情况：错误代码、一个哈希的字节序、重复地址的计数方式，以及少数 JSON-RPC 响应格式。
* 在相同 CPU 上，Ztreamer 构建索引的速度约快 6 倍。Zaino 在构建期间将请求转发给 Zebra，因此 6 秒后即可开始响应。
* 在所有测量场景中，Ztreamer 的服务速度都更快：完整钱包下载时，每秒处理的区块数多 13–17 倍。
* Zaino 的大部分延迟来自一个缺失的 socket 设置（`TCP_NODELAY`），它为许多请求增加了约 40 毫秒延迟。这只需一行修复。

## 比较对象

| 构建版本 | 后端节点 | 原因 |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2（`direct` 后端） | 最新稳定版 Zaino 发布版本 |
| Zaino 0.9.0 | Zebra 6.4.2（`direct` 后端） | Ztreamer 自行发布的比较中测量的版本 |
| Ztreamer v0.1.0 | 内嵌 Zakura 节点 | 最新 Ztreamer 标签 |
| Ztreamer master | 内嵌 Zakura 1.5.1 | Ztreamer 的安装说明所构建的版本 |

两者采用不同的设计：

* **Zaino** 作为独立进程运行在 [Zebra](Zebra_Full_Node.md) 全节点旁，读取 Zebra 的状态，并维护自己的索引。它是 [Z3 技术栈](Z3_Stack.md)中的索引器。参见 [Zaino](Zaino.md)。
* **Ztreamer** 在同一进程中嵌入一个 [Zakura](Zakura_Node.md) 节点（Zebra 的分叉），并维护紧凑区块索引。

## 测量方法

* **所有对象使用相同数据。** 每个构建均从同一个 Zcash Foundation 测试网快照开始，冻结于高度 4,382,897，因此它们索引的是完全相同的链。
* **任何人都可复现。** 一切均在免费的 GitHub 托管运行器上执行：fork 该仓库并运行一个工作流即可。
* **每个构建运行三次**，每次均从空索引开始。服务器和负载生成器运行在不同的 CPU 核心上。
* **兼容性：** 比较了全部 20 个 lightwallet 协议 gRPC 方法（274 个测试用例），在各构建之间逐字节比对，并与 Zebra 的 JSON-RPC 进行核对。还检查了 Zaino 提供的 28 个 JSON-RPC 方法。
* **性能：** 构建索引所需的时间和资源、各请求延迟、区块范围吞吐量、1 至 128 个并发客户端，以及从 Sapling 激活到链尖的完整钱包下载。

## 结果

### 索引构建

三次运行的中位数：

| 构建版本 | 索引完成 | 首次响应 | 磁盘上的索引大小 |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 秒 | 6 秒 | 22.06 GiB |
| Zaino 0.9.0 | 1,211 秒 | 6 秒 | 22.06 GiB |
| Ztreamer v0.1.0 | 216 秒 | 210 秒 | 1.44 GiB |
| Ztreamer master | 159 秒 | 158 秒 | 1.44 GiB |

Zaino 几乎立即可用，因为它会在构建期间将请求转发给 Zebra。Ztreamer 在索引完成前不会提供任何服务。在相同 CPU 型号上，Zaino 0.10.1 所需时间是 Ztreamer v0.1.0 的 6–6.5 倍，CPU 时间则为其 7.5–8 倍（包含 Zebra）。

### 服务性能

三次运行的中位数，除特别注明外均以每秒区块数计：

| 场景 | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| 1,000 个区块的区块范围 | 11,414 | 179,486 |
| 完整钱包下载（280,000 → 链尖） | 11,124 | 189,041 |
| 1,000 个区块的区块范围，128 个客户端 | 110,093 | 229,527 |
| 单个区块，128 个客户端（请求/秒） | 6,843 | 11,044 |

使用 128 个客户端时，差距缩小到约 2 倍，因为两台服务器均限制为两个 CPU 核心。

### 40 毫秒下限

在 Zaino 上，十二个 RPC 中有六个的中位延迟约为 40 毫秒，并且每个 RPC 的第 99 百分位数均在约 41 毫秒。原因在于 Zaino 配置其 gRPC 监听器的方式：`TCP_NODELAY` socket 选项从未启用，因此操作系统会延迟小型响应长达 40 毫秒。

在不修改 Zaino 二进制文件的情况下从外部启用该选项后，此下限被消除。例如，`GetTreeState` 从 40.3 毫秒降至 0.75 毫秒（Ztreamer：0.63 毫秒）。批量区块流传输没有变化，因此上述吞吐量差距是真实存在的。

### 兼容性差异

* **Zaino 0.9.0** 默认在 `GetBlock` 中包含透明数据，而协议规定默认值应仅包含屏蔽数据。此问题已在 0.10.1 中修复。
* **`GetSubtreeRoots`：** 两个索引器中 `completingBlockHash` 字段使用相反的字节序。当前钱包不会读取该字段。
* **错误代码：** Zaino 对错误输入返回 `INTERNAL`；Ztreamer 返回 `INVALID_ARGUMENT` 或 `NOT_FOUND`。
* `GetTaddressBalanceStream` 中的**重复地址**会被计数两次，Ztreamer master 除外。
* **JSON-RPC：** Zaino 的 `getrawtransaction` 在详细程度为 0 时返回对象而非十六进制字符串，这与 Zebra 和 zcashd 不同。

## 局限性

* **仅测试网。** 测试网区块比主网区块更小，因此绝对时间和大小并非主网数据。比较是在相同输入下进行的相对比较。
* **共享 CI 机器**使用多种 CPU 型号。完整报告针对主要指标提供了相同 CPU 下的比较。
* **未测量：** 重组、跟随实时链尖、内存池负载和 TLS。

## 了解更多

* 完整报告：[zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* 基准测试仓库：[github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* 原始数据：[results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino：[github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer：[ztreamer.sh](https://ztreamer.sh)
