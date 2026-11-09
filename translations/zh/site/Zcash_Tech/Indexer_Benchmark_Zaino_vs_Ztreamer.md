# 索引器 [Indexer] 基准测试：Zaino vs Ztreamer

Zaino 和 Ztreamer 是两个为 lightwallet gRPC 协议提供服务的索引器，该协议是 Zcash 轻钱包 [light wallet] 用于同步的 API。本页总结了对两者进行的独立、可复现比较：它们是否返回相同答案、构建索引需要多久，以及为钱包提供服务的速度。

## 摘要

* 两个索引器都返回正确的链数据。每个能够与 Zebra 核对的响应均相符，因此钱包可使用其中任一索引器。
* 发现的差异属于约定和边缘情况：错误代码、一个哈希 [hash] 的字节序、重复地址的计数方式，以及少量 JSON-RPC 响应结构。
* Ztreamer 在相同 CPU 上构建索引的速度约快 6×。Zaino 在构建期间将请求转发给 Zebra，因此 6 秒后便可开始响应。
* Ztreamer 在所有测量场景中提供服务的速度都更快：完整钱包下载的每秒区块数高出 13–17×。
* Zaino 的大部分延迟来自一个缺失的套接字 [socket] 设置（`TCP_NODELAY`），它为许多请求增加约 40 ms。这是一个单行修复。

## 比较内容

| 构建版本 | 后端节点 | 原因 |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2（`direct` 后端） | 最新稳定版 Zaino 发布版本 |
| Zaino 0.9.0 | Zebra 6.4.2（`direct` 后端） | Ztreamer 自行发布的比较中测量的版本 |
| Ztreamer v0.1.0 | 嵌入式 Zakura 节点 | 最新 Ztreamer 标签 |
| Ztreamer master | 嵌入式 Zakura 1.5.1 | Ztreamer 的安装说明所构建的版本 |

两者采用不同设计：

* **Zaino** 作为独立进程运行在 [Zebra](Zebra_Full_Node.md) 全节点旁，读取 Zebra 的状态，并维护自身的索引。它是 [Z3 栈](Z3_Stack.md)中的索引器。参见 [Zaino](Zaino.md)。
* **Ztreamer** 在同一进程中嵌入一个 [Zakura](Zakura_Node.md) 节点（Zebra 的一个分叉 [fork]），并维护一个紧凑区块 [compact block] 索引。

## 测量方法

* **所有人使用相同数据。** 每个构建版本均从同一个 Zcash Foundation 测试网 [testnet] 快照开始，该快照冻结于高度 4,382,897，因此它们索引的链完全相同。
* **任何人都可以复现。** 所有内容均运行在免费的 GitHub 托管运行器上：分叉该仓库并运行一个工作流 [workflow]。
* **每个构建版本运行 3 次**，每次均从空索引开始。服务器和负载生成器运行在不同的 CPU 核心上。
* **兼容性：**全部 20 个 lightwallet-protocol gRPC 方法（274 个测试用例）均在各构建版本之间逐字节比较，并与 Zebra 的 JSON-RPC 核对。还检查了 Zaino 提供的 28 个 JSON-RPC 方法。
* **性能：**构建索引所需时间和资源、每个请求的延迟、区块范围吞吐量、1 至 128 个并发客户端，以及从 Sapling 激活到链尖 [tip] 的完整钱包下载。

## 结果

### 索引构建

3 次运行的中位数：

| 构建版本 | 索引完成 | 首次响应 | 磁盘上的索引大小 |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino 几乎立即可用，因为它在构建期间将请求转发给 Zebra。Ztreamer 在索引完成前不提供任何服务。在相同 CPU 型号上，Zaino 0.10.1 所需时间是 Ztreamer v0.1.0 的 6–6.5×，CPU 时间使用量则为 7.5–8×（包括 Zebra）。

### 提供服务

3 次运行的中位数，除非另有说明，单位为每秒区块数：

| 场景 | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| 1,000 个区块的区块范围 | 11,414 | 179,486 |
| 完整钱包下载（280,000 → 链尖） | 11,124 | 189,041 |
| 1,000 个区块的区块范围，128 个客户端 | 110,093 | 229,527 |
| 单个区块，128 个客户端（请求/s） | 6,843 | 11,044 |

在 128 个客户端下，差距缩小至约 2×，因为两个服务器均被限制为两个 CPU 核心。

### 40 ms 下限

在 Zaino 上，12 个 RPC 中有 6 个的中位延迟约为 40 ms，且每个 RPC 的第 99 百分位数约为 41 ms。原因在于 Zaino 设置其 gRPC 监听器的方式：`TCP_NODELAY` 套接字选项从未启用，因此操作系统会将小型响应延迟最多 40 ms。

在不更改 Zaino 二进制文件的情况下从外部启用该选项后，下限被消除。例如，`GetTreeState` 从 40.3 ms 降至 0.75 ms（Ztreamer：0.63 ms）。批量区块流传输没有变化，因此上述吞吐量差距是真实的。

### 兼容性差异

* **Zaino 0.9.0** 默认在 `GetBlock` 中包含透明数据，而协议规定默认值应仅为屏蔽数据。这已在 0.10.1 中修复。
* **`GetSubtreeRoots`：**`completingBlockHash` 字段在两个索引器上使用相反的字节序。当前钱包不会读取此字段。
* **错误代码：**Zaino 对错误输入返回 `INTERNAL`；Ztreamer 返回 `INVALID_ARGUMENT` 或 `NOT_FOUND`。
* `GetTaddressBalanceStream` 中的**重复地址**会被计数两次，Ztreamer master 除外。
* **JSON-RPC：**Zaino 的 `getrawtransaction` 在详细程度为 0 时返回对象而非十六进制字符串，这与 Zebra 和 zcashd 不同。

## 局限性

* **仅测试网。** 测试网区块比主网 [mainnet] 的区块更小，因此绝对时间和大小并非主网数据。该比较是在相同输入下进行的相对比较。
* **共享 CI 机器**使用多种 CPU 型号。完整报告为标题数据提供了相同 CPU 的比较。
* **未测量：**重组 [reorg]、跟随实时链尖、内存池 [mempool] 负载和 TLS。

## 了解更多

* 完整报告：[zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* 基准测试仓库：[github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* 原始数据：[results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino：[github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer：[ztreamer.sh](https://ztreamer.sh)
