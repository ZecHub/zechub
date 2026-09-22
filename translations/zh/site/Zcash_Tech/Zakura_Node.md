<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura 节点

> 🇧🇷 [葡萄牙语版本](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura 是一个面向规模化构建的、适用于 Zcash 的免费开源全节点实现。从 [Zebra](Zebra_Full_Node.md) 分叉而来，并由 **Valar Group** 与 **Project Tachyon** 合作开发，Zakura 提供了显著更快的同步速度、原生区块修剪，以及面向旧版 `zcashd` 工具的兼容层。1.0.0 版本于 2026 年 7 月 15 日发布。

---

## 简而言之

- Zakura 是一个**与共识兼容的 Zcash 全节点**——作为 Zebra 和 zcashd 的替代方案，从 Zebra 分叉而来。
- 区块链同步速度约为 Zebra 的 **5 倍**；通过快照引导可在**不到 2 分钟**内完成。
- **原生区块修剪**使运营者能以显著更少的磁盘空间运行全节点（修剪后快照约 11 GB，而完整 Zebra 节点需 300 GB）。
- **zcashd RPC 兼容模式**让现有钱包和集成无需修改即可运行。
- **实验性 P2P 传输层**（默认禁用）旨在实现低于 500 毫秒的区块传播，并提供抗 DoS 的 gossip。
- 兼容 **Ironwood (NU6.3)**，即于 2026 年中期激活的 Zcash 网络升级。
- **Zakura Common**（v1.3.0，2026 年 8 月）加速了钱包用于构建私密交易的密码学：根据 Zakura 的基准测试，在许多情况下从超过 3 秒缩短至不到 200 毫秒。
- 由 **Sean Bowe**（Zcash 联合创始人、Project Tachyon）和 **Dev Ojha**（Valar Group）领导。

---

## 什么是 Zakura？

Zakura 是一个 Zcash 全节点，从零开始设计，旨在实现可规模化部署的生产就绪能力。虽然它与 Zebra 保持共识兼容——即验证并遵循相同的 Zcash 协议规则——Zakura 引入了重大工程改进，旨在降低运行 Zcash 全节点的门槛。

该项目由 **Project Tachyon**（由 Sean Bowe 领导，他是 Zcash 最初的密码学工程师之一）与 **Valar Group**（由 Dev Ojha 领导）共同推进。他们共同专注于下一代 Zcash 协议改进，而 Zakura 则是这项工作的参考节点。

---

## 主要特性

### 快 5 倍的链同步

与 Zebra 相比，Zakura 实现了约 5 倍更快的区块链同步。这使得需要快速启动节点或从停机中恢复的运营者能够更轻松地使用它。

### 快照引导

Zakura 发布预构建的链快照，大幅缩短初始同步时间：

| 引导方式 | 时间 |
|-----------------|------|
| 归档快照 | 约 37 分钟 |
| 修剪后快照 | **不到 2 分钟** |
| Zebra（完整同步） | 约 20 小时 |

修剪后快照约为 **11 GB**，与从创世区块开始同步相比，可实现**快 680 倍**的节点引导。

### 原生区块修剪

Zakura 支持可配置的区块修剪，让节点运营者能够定义保留多少链历史。因此，在存储空间有限的硬件上运行全节点也变得切实可行——适合不需要完整历史链的验证者、开发者和基础设施提供商。

### zcashd RPC 兼容模式

Zakura 包含一种兼容模式，可复现旧版 `zcashd` JSON-RPC 接口。依赖 `zcashd` RPC 的现有钱包、交易所和集成可以切换到 Zakura，而无需修改代码。

### 实验性 P2P 传输层

Zakura 搭载下一代点对点传输层，目前**默认禁用**。启用后，其目标包括：

- 网络范围内最坏情况下低于 500 毫秒的区块传播
- 聚合内存池，以实现更高效的交易转发
- 抗 DoS 的 gossip 协议，以提高网络韧性

该层展示了在 Project Tachyon 下开发的未来 Zcash 网络层改进。

### 兼容 Ironwood (NU6.3)

Zakura 完全兼容 Ironwood 网络升级（NU6.3），该升级于 2026 年中期在 Zcash 主网上激活。

---

## Zakura Common：更快的钱包密码学

2026 年 8 月，Zakura 团队发布了 Zakura Common，这是一组经过加速分叉的密码学库，Zcash 钱包和节点均依赖这些库。Zakura 在 1.3.0 版本中切换至该新技术栈，而 Vizor Wallet 是最早集成它的钱包之一。

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

根据 Zakura 自身的基准测试：

| 操作 | 加速幅度 |
|--|--|
| 移动端证明生成 | 超过 14 倍（桌面端：超过 5 倍） |
| Sinsemilla 哈希 | 超过 21 倍 |
| zk-SNARK 验证 | 4–8 倍 |
| 试探性解密 | 超过 1.5 倍 |

对用户而言，最明显的变化是等待时间。过去构建一笔私密交易需要钱包花费超过三秒。使用 Zakura Common 后，许多情况下可缩短至不到 200 毫秒。这是你的设备准备交易所花费的时间，而不是网络确认交易所需的时间。


---

## Zakura 与其他 Zcash 节点的关系

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 语言 | C++（从 Bitcoin 分叉） | Rust | Rust（从 Zebra 分叉） |
| 状态 | 已弃用 | 活跃 | 活跃（v1.0.0，2026 年 7 月） |
| 同步速度 | 基准 | 约 1× | 约快 5× |
| 区块修剪 | 否 | 否 | 是 |
| zcashd RPC 兼容性 | 原生 | 部分 | 是（兼容模式） |
| 快照引导 | 否 | 否 | 是（少于 2 分钟） |
| 实验性 P2P | 否 | 否 | 是（可选启用） |

---

## 快速开始

下载选项、快照和配置文档请见：

- **下载与设置指南：** [zakura.com/download](https://zakura.com/download/)
- **链快照：** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **源代码：** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## 相关页面

- [Zebra 全节点](Zebra_Full_Node.md) —— Zcash 全节点，Zakura 从其分叉而来
- [Zaino 索引器](Zaino.md) —— 一个与 Zebra 和 Zakura 兼容的 Rust 索引器
- [全节点](Full_Nodes.md) —— Zcash 全节点选项概览
- [轻钱包节点](Lightwallet_Nodes.md) —— 轻量级客户端替代方案

## 资源

- [介绍 Zakura —— 公告](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura 网站](https://zakura.com/)
- [Zakura 在 X/Twitter 上](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Common 公告](https://zakura.com/announcements/zakura-common/)
