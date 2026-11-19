# Zinder 索引器

Zinder 是由 Zcash Foundation 发布、使用 Rust 编写的自托管 Zcash 索引器。它从 Zebra 或 Zakura 全节点读取一次链数据，存储一份一致的链视图，并同时向多个钱包、应用和区块浏览器提供该视图。现有轻钱包可以通过兼容 lightwalletd 的适配器访问它。

> **Zinder 目前处于 alpha 阶段。** 项目自己的 README 指出，原生 API、lightwalletd 兼容接口、存储布局和部署拓扑都可能发生变化，带标签的版本也不代表稳定性承诺。请锁定确切版本，并做好升级可能带来不兼容变更的准备。

## 简要说明

* **Zebra** 或 **Zakura** 负责验证链。**Zinder** 为节点已有的数据建立索引，并向客户端提供这些数据。
* 有两种接入方式：Zinder 自带的 `WalletQuery` gRPC API，以及一个单独的适配器，它使用 lightwalletd 的 `CompactTxStreamer` 协议，因此为 lightwalletd 构建的钱包无需修改代码即可连接到它。
* 每次读取都绑定到同一个链状态（即一个“纪元”），因此一次同步批次不会混合来自两个竞争链尖端的数据。密钥和屏蔽扫描仍由钱包负责。
* 它面向这样的场景：一个运营者运行一个节点，同时为多个使用方提供服务。公开端点应置于你自己的 TLS、身份验证和速率限制之后。
* 版本发布很快（2026 年 11 月 10 日至 14 日期间从 0.7.0 升至 0.12.0），其中多个版本带有不兼容变更。每次升级前都要阅读变更日志。

## Zinder 的定位

轻钱包不会直接与全节点通信，而是向索引器请求精简区块、树状态和交易数据（参见 [轻钱包节点](/zcash-tech/lightwallet-nodes)）。Zcash 生态系统现在有多个索引器可以完成这项工作：

| 索引器 | 语言 | 维护者 | 通信对象 | 说明 |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / Zcash 社区 | Zebra 或 zcashd | 最初的轻钱包服务器 |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra 或 zcashd | Z3 技术栈中的可选索引器配置 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | 内嵌 Zakura 节点 | 参见 [Zaino 与 Ztreamer 的基准测试](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 或 Zakura 1.8.6（归档节点） | Alpha 阶段。原生 API、lightwalletd 适配器以及可选的区块浏览器读取功能 |

Zinder 的文档明确说明了何时适合选择它：当链访问需要独立于某个钱包进程长期运行、服务多个互不相关的使用方，或与某个钱包的代码分离时，它最有优势。对于单个紧密耦合的钱包，内嵌索引器可能更简单；如果使用方只需要节点已有的数据，则可以直接使用 Zebra 的 RPC。

## 构建方式

Zinder 将工作拆分为多个独立进程，每个进程负责一项任务：

| 运行时 | 作用 |
|:--|:--|
| `zinder-ingest` | 唯一可以写入规范链存储（RocksDB）的进程。跟随节点、处理链重组并维护实时内存池状态 |
| `zinder-projector` | 唯一可以写入钱包存储的进程。构建并跟随面向钱包的链视图 |
| `zinder-query` | 提供原生 `WalletQuery` gRPC API |
| `zinder-compat-lightwalletd` | 在相同数据之上提供 lightwalletd 的 `CompactTxStreamer` API |

可选的区块浏览器层（`zinder-explorer` 与 `ExplorerQuery`）提供区块摘要、交易详情、内存池视图和搜索功能；另有一个可选适配器提供 CipherScan 区块浏览器的 REST 和 WebSocket API。这两者都不包含在发布镜像中。

每个运行时都提供 `/healthz`、`/readyz` 和 `/metrics`。只有当读取进程各自的链存储和钱包存储都指向完全相同的链状态时，它们才会报告就绪。

## 接入方式

* **现有轻钱包**保留其 lightwalletd 集成，并将其指向 `zinder-compat-lightwalletd`。Zinder 的文档区分了协议兼容性和支持状态：只有某个钱包的当前版本通过端到端认证后，该钱包才会被列为受支持。0.10.0 版本修复了 `GetLightdInfo` 协议的版本字段，因此 Zingo 可以同步。
* **原生客户端**调用 `zinder-query` 来执行绑定状态的读取、获取精简区块、接收链和内存池事件流，以及查看带类型化拒绝原因的广播结果。
* **Rust 应用**使用 `zinder-client` crate。这是一个优先面向远程连接的 SDK，可连接到 `zinder-query`，无需链接存储技术栈。
* **区块浏览器和后端**将钱包读取功能与可选的 `ExplorerQuery` 层结合使用。

## 运行方式

上游快速入门指南会先使用 [Z3 技术栈](/zcash-tech/z3-stack) 启动节点，然后从 Zinder 检出目录中使用 Docker Compose Zinder：

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Mainnet 和 Zakura 节点（`deploy/.env.zakura-mainnet`、`deploy/.env.zakura-testnet`）的环境文件位于其旁边。从 0.11.0 起，Compose 文件不再默认使用 Z3：环境文件必须指定节点的网络、cookie 卷和 RPC 地址。

默认主机端口（Testnet 端口增加 10000）：

| 服务 | Mainnet | Testnet |
|:--|:--|:--|
| 原生 `WalletQuery` gRPC | 9102 | 19102 |
| 兼容 lightwalletd 的 gRPC | 9067 | 19067 |
| 就绪状态：摄取 / 投影 / 查询 / 兼容接口 | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

两个钱包端口都绑定到回环地址。使用以下命令检查：

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

其他部署方式：

* `ghcr.io/zcashfoundation/` 上的**发布镜像**：四个运行时，以及 `zinder-wallet-serving`（将摄取、投影和原生查询放在一个容器中，适用于能将一个卷挂载到一个容器的主机；不包含 lightwalletd 适配器）和 `zinder-canonical-runtime`（仅摄取）。
* **Linux 二进制文件**：适用于 x86-64（需要 x86-64-v3 CPU）和 AArch64，要求 glibc 2.34 或更高版本。Debian 12 是通过认证的基线环境。每个版本都会提供 SBOM 和经过签名的 SLSA 来源证明。

### 节点必须提供的条件

* 使用**归档节点**。从 0.11.0 起，`zinder-ingest` 拒绝在修剪节点上启动。
* 使用 Zebra **7.0.0** 或 Zakura **1.8.6**。这两个节点版本通过了发布通道认证。
* 使用 `zinder-wallet-serving` 镜像时，节点必须提供**索引器 gRPC 端点**（`ZINDER_NODE__INDEXER_GRPC_ADDR`、Zebra 的 `indexer_listen_addr`，Mainnet 端口为 8155）。Zakura 索引器使用非回环地址时需要双向 TLS，Zinder 从 0.11.0 起支持此功能。

### Mainnet 资源配置

钱包服务运行手册建议：

* 至少 **8 GB 内存**。实测峰值：摄取约 2.6 GiB，构建期间投影约 2.7 GiB，查询最高约 1.4 GiB。
* 构建 Mainnet 钱包存储时，卷上至少保留约 **130 GB 可用空间**。
* 一次从创世区块开始构建 Mainnet 的实测结果是：链存储耗时约 **4 小时**（暂存数据接近 310 GB），钱包存储耗时**超过 2 小时**。随附的构建超时设置只适用于 Testnet：Mainnet 应将其分别提高到至少 24 小时和 12 小时，否则构建会重新开始，始终无法完成。

## 值得了解的版本说明

| 版本 | 日期 | 对运营者的变更 |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | 默认重组窗口提高到 1000 个区块，这是 Zebra 7 和 Zakura 完成区块的深度。此变更不可逆：旧版本无法打开升级后的存储 |
| 0.9.0 | 2026-11-12 | 新增 `zinder-wallet-serving` 和 `zinder-canonical-runtime` 镜像 |
| 0.10.0 | 2026-11-13 | **首个能够解码 NU7 区块的版本。** 0.9.0 及更早版本会在遇到第一个 NU7 区块时停止。原生协议修订版为 8：必须同时升级摄取和查询运行时，并一同升级原生客户端 |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6 与 Zebra 7.0.0 一同通过认证；支持与节点索引器进行双向 TLS；拒绝修剪节点。0.11.0 只以 crate 形式发布，因此请部署 0.11.1 |
| 0.12.0 | 2026-11-14 | 修复就绪状态和关闭流程；加快区块浏览器数据重放，并在磁盘空间不足时暂停 |

## 常见错误

**把它当作生产软件。** 项目称自己仍处于 alpha 阶段。用项目自己的话说，本地 Compose 部署成功“本身并不代表通过生产认证”。

**将它连接到修剪节点。** 摄取进程会在启动时退出。请使用归档 Zebra 或 Zakura 节点。

**直接公开 gRPC 端口。** 两个钱包端口绑定到回环地址是有原因的。对互联网开放端口之前，先在你控制的代理中配置 TLS、身份验证、速率限制和配额。

**一次只升级一个运行时。** 多个版本会更改原生协议修订版或存储格式。应同时升级所有 Zinder 服务，并在同一轮切换中更新原生客户端。

**因为协议受支持，就认定钱包也受支持。** lightwalletd 适配器支持该协议，但 Zinder 只有在某个钱包的当前版本通过端到端认证后，才会声称支持该钱包。

## 相关页面

* [轻钱包节点](/zcash-tech/lightwallet-nodes) — 了解轻钱包服务器的作用及其可以看到的数据
* [Zaino](/zcash-tech/zaino) — Zingo Labs 的 Rust 索引器
* [索引器基准测试：Zaino 与 Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3 技术栈](/zcash-tech/z3-stack) — Zebra + Zallet，Zinder 快速入门指南使用的节点配置
* [Zebra 全节点](/zcash-tech/zebra-full-node) 和 [Zakura 节点](/zcash-tech/zakura-node) — Zinder 认证的两个节点

## 我可以在哪里了解更多？

* [Zinder GitHub 仓库](https://github.com/ZcashFoundation/zinder)
* [Zinder 版本发布](https://github.com/ZcashFoundation/zinder/releases) 和 [变更日志](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [什么是 Zinder，什么不是](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [在虚拟机上部署](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) 和 [钱包服务镜像](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md)运行手册

**最后更新：** 2026 年 11 月
