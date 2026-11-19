<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura 节点

Zakura 是一个免费、开源、专为大规模运行构建的 Zcash 全节点实现。它从 [Zebra](Zebra_Full_Node.md) 分叉而来，并由 **Valar Group** 与 **Project Tachyon** 合作开发。Zakura 提供显著更快的同步速度、原生区块裁剪，以及与旧版 `zcashd` 工具兼容的兼容层。1.0.0 版本于 2026 年 7 月 15 日发布。此后版本发布节奏很快：1.7.0 版本（2026 年 10 月 22 日）在主网上激活了 NU7，随后 1.8 系列于 11 月推出。

---

## TL;DR

- Zakura 是一个**与共识兼容的 Zcash 全节点**——可替代 Zebra 和 zcashd，并从 Zebra 分叉而来。
- Blockchain 同步速度约为 Zebra 的 **5×**；快照引导可在**不到 2 分钟**内完成。
- **原生区块裁剪**让运营者能以大幅减少的磁盘空间运行全节点（裁剪快照约 11 GB，而完整 Zebra 节点需 300 GB）。
- **zcashd RPC 兼容模式**让现有钱包和集成无需修改即可运行。
- **实验性 P2P 传输层**（默认禁用）旨在实现低于 500ms 的区块传播，并提供抗 DoS 的 gossip。
- 兼容 **Ironwood (NU6.3)**，即于 2026 年年中激活的 Zcash 网络升级。
- 遵循 **NU7**：Zakura 1.7.0 是在主网上激活该版本的发布版。每个版本还会在发布几周后于一个终止支持区块停止运行，因此请规划定期升级（见下文“运行前须知”）。
- **Zakura Common**（v1.3.0，2026 年 8 月）加快了钱包用于构建私密交易的密码学计算：根据 Zakura 的基准测试，在许多情况下从超过 3 秒缩短至不到 200 ms。
- 由 **Sean Bowe**（Zcash 联合创始人，Project Tachyon）和 **Dev Ojha**（Valar Group）领导。

---

## 什么是 Zakura？

Zakura 是一个从零开始设计的 Zcash 全节点，旨在实现可大规模投入生产使用。虽然它与 Zebra 具有共识兼容性——即验证并遵循相同的 Zcash 协议规则——但 Zakura 引入了重大工程改进，旨在降低运行 Zcash 全节点的门槛。

该项目是 **Project Tachyon**（由 Sean Bowe 领导，他是 Zcash 最初的密码学工程师之一）和 **Valar Group**（由 Dev Ojha 领导）的共同成果。他们共同专注于下一代 Zcash 协议改进，而 Zakura 则作为这项工作的参考节点。

---

## 主要功能

### 5× 更快的链 (chain) 同步

与 Zebra 相比，Zakura 的 blockchain 同步速度约快 5×。这使得需要快速启动节点或从停机中恢复的运营者能够更切实地使用它。

### 快照引导

Zakura 发布预构建的链快照，可显著缩短初始同步时间：

| Bootstrap 方法 | 时间 |
|-----------------|------|
| 归档快照 | 约 37 分钟 |
| 裁剪快照 | **不到 2 分钟** |
| Zebra（完整同步） | 约 20 小时 |

裁剪快照约为 **11 GB**，与从创世区块同步相比，节点引导速度快 **680×**。

### 原生区块裁剪

Zakura 支持可配置的区块裁剪，让节点运营者定义保留多少链历史。这使得在存储空间有限的硬件上运行全节点成为现实——适用于不需要完整历史链的验证者、开发者 (developer) 和基础设施提供商。

### zcashd RPC 兼容模式

Zakura 包含一种兼容模式，可复现旧版 `zcashd` JSON-RPC 接口。依赖 `zcashd` RPC 的现有钱包、交易所 (exchange) 和集成可以切换到 Zakura，无需更改代码。

### 实验性 P2P 传输层

Zakura 配备下一代点对点传输层，目前**默认禁用**。启用后，其目标包括：

- 在整个网络中实现低于 500ms 的最坏情况下区块传播
- 聚合内存池，以实现更高效的交易中继
- 采用抗 DoS 的 gossip 协议，提高网络韧性

该层代表了在 Project Tachyon 下开发的未来 Zcash 网络级改进预览。

### 兼容 Ironwood（NU6.3）

Zakura 与 Ironwood 网络升级（NU6.3）完全兼容，该升级于 2026 年年中在 Zcash 主网上激活。

### NU7

Zakura 1.7.0 于 2026 年 10 月 22 日发布，是在主网上激活 NU7 的版本（[发行说明](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)）。节点需要运行 1.7.0 或更高版本，才能在升级后跟上链。[NU7](NU7.md)介绍了此次升级的变更内容。

---

## Zakura Common：更快的钱包密码学

2026 年 8 月，Zakura 团队发布了 Zakura Common，这是一组经过加速的密码学库分叉版本，Zcash 钱包和节点依赖这些库。Zakura 在 1.3.0 版本中切换到新技术栈，而 Vizor Wallet 是首批集成它的钱包之一。

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

根据 Zakura 自己的基准测试：

| 操作 | 加速幅度 |
|--|--|
| 移动端上的证明 (proof) 生成 | 超过 14×（桌面端：超过 5×） |
| Sinsemilla 哈希 | 超过 21× |
| zk-SNARK 验证 | 4–8× |
| 试探性解密 | 超过 1.5× |

对用户而言，最明显的变化是等待时间。构建一笔私密交易过去会让钱包耗时超过 3 秒。借助 Zakura Common，在许多情况下可缩短至不到 200 ms。这是你的设备准备交易所花费的时间，而不是网络确认它所需的时间。


---

## Zakura 与其他 Zcash 节点的关系

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 语言 | C++（从 Bitcoin 分叉而来） | Rust | Rust（从 Zebra 分叉而来） |
| 状态 | 已弃用 | 正在使用 | 正在使用（v1.0.0，2026 年 7 月；v1.8.8，2026 年 11 月） |
| 同步速度 | 基准 | ~1× | 快约 ~5× |
| 区块修剪 | 否 | 否 | 是 |
| zcashd RPC 兼容性 | 原生 | 部分兼容 | 是（兼容模式） |
| 快照引导 | 否 | 否 | 是（不到 2 分钟） |
| 实验性 P2P | 否 | 否 | 是（选择启用） |

---

## 入门

下载选项、快照和配置文档可在以下位置获取：

- **下载与设置指南：** [zakura.com/download](https://zakura.com/download/)
- **链快照：** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **源代码：** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **发行说明：** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### 为轻钱包提供服务

Zakura 不是轻钱包服务器。它未实现 `CompactTxStreamer`，这是轻钱包（例如 Zodl，以前称为 Zashi）使用的 gRPC 协议，因此钱包无法直接连接到 `zakurad`。要为轻钱包提供服务，请在它前面运行以下其中一项：

- [Zaino](Zaino.md)（首选）
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer)，Zcash Labs 索引器和轻钱包服务器，它从 Zakura 全节点读取链数据，可以嵌入自身进程中运行，也可以连接远程节点，通过 JSON-RPC 进行通信

Zakura自己的索引器 gRPC（`[rpc]`部分中的`indexer_listen_addr`，默认关闭）是一个独立接口：为你自行运行的可信软件提供区块、内存池和链尖端流，而非轻钱包协议。仅允许在环回地址上使用明文，任何其他地址都需要双向 TLS（[配置参考](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)）。

### 运行前

1.8 版本说明中有几项内容容易让运维人员措手不及：

- **发布版本会过期。**每个 Zakura 发布版本都有支持期限结束时的区块高度，运行该版本的 Mainnet 节点会在该区块停止运行。1.8.x 发布版本的支持期限为“在 Mainnet 上支持至区块 3,643,309，约为 2026 年 12 月 3 日”，升级警告会提前约 3 天发出（[v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)）。请在该日期前检查最新发布版本；如果在脚本或部署模板中固定使用旧版本，请制定升级计划。
- **自 1.8.0 起要求使用 x86-64 CPU。**发布版二进制文件和 Docker 镜像使用 BMI2/ADX 指令，这意味着需要 Intel Broadwell、AMD Zen 或更新的处理器。在较旧的 CPU 上，`zakurad` 会在启动时退出，并显示指出缺少哪些扩展指令的错误。使用 `--features portable` 从源代码构建，即可在这些机器上运行（[v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)）。
- **旧版生成配置与原生 P2P。**`zakurad generate` 过去会写入 `peer_memory_budget_bytes = 8589934592`（8 GiB）。自 1.8.3 起，该设置可支持的原生 P2P 连接数约减少一半；4 GiB 或更低的值将导致运行原生 P2P 的节点无法启动。请将 `[network.zakura] peer_memory_budget_bytes` 提高到至少 15 GiB，或删除该行以使用新的 15 GiB 默认值（[v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)）。
- **状态工具已移入 `zakurad`。**自 1.8.3 起，不再随附独立的 `zakura-prune-state` 和 `zakura-rollback-state` 二进制文件，包括 Docker 中也不再提供。请改用 `zakurad prune-state` 和 `zakurad rollback-state`。它们接受相同的参数，但会加载 `zakura.toml`，因此请传入 `--cache-dir` 以指定特定的状态目录。

---

## 相关页面

- [Zebra 全节点](Zebra_Full_Node.md) —— Zakura 分叉自的上游 Zcash 全节点
- [Zaino 索引器](Zaino.md) —— 一个基于 Rust 的索引器，兼容 Zebra 和 Zakura
- [全节点](Full_Nodes.md) —— Zcash 全节点选项概览
- [轻钱包节点](Lightwallet_Nodes.md) —— 轻量客户端替代方案

## 资源

- [介绍 Zakura —— 公告](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura 网站](https://zakura.com/)
- [Zakura 在 X/Twitter](https://x.com/ZakuraZcash) 上
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Common 公告](https://zakura.com/announcements/zakura-common/)
