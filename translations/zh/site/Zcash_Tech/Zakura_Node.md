<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zakura 节点

> 🇧🇷 [葡萄牙语版本](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura 是一个面向大规模运行、免费且开源的 Zcash 全节点实现。它从 [Zebra](Zebra_Full_Node.md) 分叉而来，由 **Valar Group** 与 **Project Tachyon** 合作开发。Zakura 提供了显著更快的同步速度、原生区块裁剪，以及对旧版 `zcashd` 工具链的兼容层。1.0.0 版本于 2026 年 7 月 15 日发布。

---

## TL;DR

- Zakura 是一个与共识兼容的 **Zcash 全节点** —— 作为 Zebra 和 zcashd 的替代方案，它从 Zebra 分叉而来。
- 区块链同步速度约为 **Zebra 的 5 倍**；通过快照进行引导可在 **2 分钟以内** 完成。
- **原生区块裁剪** 让运营者可以用大幅更少的磁盘空间运行全节点（裁剪快照约 11 GB，而完整的 Zebra 节点约为 300 GB）。
- **zcashd RPC 兼容模式** 使现有钱包和集成无需修改即可工作。
- 一个**实验性的 P2P 传输层**（默认禁用）以低于 500ms 的区块传播和具备抗 DoS 能力的 gossip 为目标。
- 兼容 **Ironwood (NU6.3)**，这是 Zcash 在 2026 年中期激活的网络升级。
- 由 **Sean Bowe**（Zcash 联合创始人，Project Tachyon）和 **Dev Ojha**（Valar Group）领导。

---

## Zakura 是什么？

Zakura 是一个从底层开始为生产级大规模部署而设计的 Zcash 全节点。尽管它与 Zebra 共享共识兼容性——这意味着它会验证并遵循相同的 Zcash 协议规则——但 Zakura 引入了重要的工程改进，旨在降低运行 Zcash 全节点的门槛。

该项目由 **Project Tachyon**（由 Sean Bowe 领导，他是 Zcash 最早的密码学工程师之一）和 **Valar Group**（由 Dev Ojha 领导）共同推进。双方专注于下一代 Zcash 协议改进，而 Zakura 则作为这项工作的参考节点。

---

## 关键特性

### 5 倍更快的链同步

与 Zebra 相比，Zakura 的区块链同步速度大约快 5 倍。这使得对于需要快速启动节点或从停机中恢复的运营者来说，它更具实用性。

### 快照引导

Zakura 发布了预构建的链快照，可大幅减少初始同步时间：

| 引导方式 | 时间 |
|-----------------|------|
| 归档快照 | ~37 分钟 |
| 裁剪快照 | **2 分钟以内** |
| Zebra（完整同步） | ~20 小时 |

裁剪快照大小约为 **11 GB**，与从创世区块开始同步相比，可实现 **680 倍更快**的节点引导速度。

### 原生区块裁剪

Zakura 支持可配置的区块裁剪，允许节点运营者定义要保留多少链历史。这使得在存储空间有限的硬件上运行全节点变得切实可行——对于不需要完整历史链数据的验证者、开发者和基础设施提供方尤其有用。

### zcashd RPC 兼容模式

Zakura 包含一种兼容模式，可复现旧版 `zcashd` JSON-RPC 接口。依赖 `zcashd` RPC 的现有钱包、交易所和集成可以切换到 Zakura，而无需修改代码。

### 实验性 P2P 传输层

Zakura 搭载了下一代点对点传输层，目前**默认禁用**。启用后，其目标包括：

- 在整个网络中实现低于 500ms 的最坏情况区块传播
- 通过 mempool 聚合提高交易中继效率
- 具备抗 DoS 能力的 gossip 协议，以提升网络韧性

这一层代表了 Project Tachyon 正在开发的未来 Zcash 网络级改进的预览。

### 兼容 Ironwood (NU6.3)

Zakura 与 Ironwood 网络升级（NU6.3）完全兼容，该升级于 2026 年中期在 Zcash 主网上激活。

---

## Zakura 与其他 Zcash 节点的关系

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 语言 | C++（从 Bitcoin 分叉） | Rust | Rust（从 Zebra 分叉） |
| 状态 | 已弃用 | 活跃 | 活跃（v1.0.0，2026 年 7 月） |
| 同步速度 | 基准 | ~1× | ~快 5× |
| 区块裁剪 | 否 | 否 | 是 |
| zcashd RPC 兼容 | 原生 | 部分 | 是（兼容模式） |
| 快照引导 | 否 | 否 | 是（<2 分钟） |
| 实验性 P2P | 否 | 否 | 是（可选启用） |

---

## 入门

下载方式、快照和配置文档可在以下位置获取：

- **下载与设置指南：** [zakura.com/download](https://zakura.com/download/)
- **链快照：** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **源代码：** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## 相关页面

- [Zebra 全节点](Zebra_Full_Node.md) —— Zakura 所分叉自的上游 Zcash 全节点
- [Zaino 索引器](Zaino.md) —— 一个与 Zebra 和 Zakura 兼容、基于 Rust 的索引器
- [全节点](Full_Nodes.md) —— Zcash 全节点选项概览
- [Lightwallet 节点](Lightwallet_Nodes.md) —— 轻量客户端替代方案

## 资源

- [Introducing Zakura — 公告](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura 网站](https://zakura.com/)
- [Zakura 的 X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
