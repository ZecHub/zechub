---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Pepper Sync

## TL;DR

* Pepper Sync 是 Zingo! 2.0 中引入的同步引擎。Zingo! 2.0 是由 Zingo Labs 构建的开源 Zcash wallet。
* 它采用非线性同步，而不是按大型顺序区块扫描整条链，因此你的余额和交易会更早显示出来。
* 同步进度会持续保存。如果连接中断或应用关闭，同步会从停止的位置继续，而不是重新开始。
* 你可以在同步完成之前进行花费。
* Shielded 交易在整个过程中都会保持私密。

## 核心解释

Zingo 2.0 是 Zingo! wallet 的最新版本，这是一款为 Zcash 社区打造的轻量级开源 wallet。本次发布的亮点是 Pepper Sync，这是一项重大升级，彻底重新思考了 wallet 与 blockchain 的连接方式。

过去，同步过程常常显得非常缓慢、容易出错，而且资源消耗很高，有时还会迫使用户从头重新开始。Pepper Sync 改变了这一切。它让同步更快、更顺畅、更可靠，并且对设备的要求更低，同时完整保留了 shielded 交易的隐私性。

无论你是第一次体验 Zcash 的全新用户，还是管理多个 shielded wallet 的长期社区成员，Pepper Sync 都让整个体验变得更加实用和愉快。

### Pepper Sync 的核心特性

Pepper Sync 带来了多项改进：

- 同步更快 - 你的 wallet 几分钟内即可就绪，而不是几小时。
- 智能更新 - 数据以更小的区块处理，避免完整重扫。
- 抗中断能力强 - 如果连接中断，同步会从上次停止的位置继续。
- 轻量且高效 - 针对手机、笔记本和其他低性能设备进行了优化。
- 反馈更清晰 - 实时进度更新减少了困惑。
- 保护隐私 - Shielded 交易在整个过程中都保持私密。

### 相比以前有什么提升

旧版本的 Zingo 常因同步时间长、错误处理不清晰以及资源占用高而让用户感到沮丧。Pepper Sync 修复了这些常见问题：

| Feature            | Previous Zingo Versions                | Zingo 2.0 with Pepper Sync                   |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Sync Speed         | 更慢，尤其是在首次设置时               | 首次及后续同步都快得多                       |
| Error Handling     | 偶尔卡住，失败原因不清晰               | 稳定性提升，并具备自动恢复能力               |
| User Experience    | 对新手来说同步过程感觉“很不透明”       | 更透明，状态和更新信息更清晰                 |
| Device Performance | CPU/内存占用较高                       | 针对平稳的资源使用进行了优化                 |

简而言之：现在的同步更快、更可靠，也更容易理解。

## 可视化 / 类比

可以把旧式 wallet 同步想象成读一本很长的书：你必须从第一页开始大声朗读，直到全部读完之前，什么都不能说。若中途停下来，你就得从第一页重新开始。Pepper Sync 读的是同一本书，但它会夹上书签，先读那些与你相关的章节，并且允许你在还没读到最后一页之前就开始讨论这个故事。

书签才是关键。以前的每个版本都把中断的同步视为白费功夫；Pepper Sync 则把它视为一次暂停。

### 可视化指南

- 详细流程 - 展示完整流程。 ![详细流程](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- 简化流程 - 面向日常用户的快速视图。 ![简化流程](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## 深入解析

### Pepper Sync 的工作方式（简化视图）

Pepper Sync 不会以庞大而笨重的区块重新扫描 blockchain，而是以小而易于管理的步骤运行，并在过程中始终保存你的位置。

1. 连接 - Wallet 与网络建立连接。
2. 获取区块 - 数据以增量方式下载。
3. 验证 - 交易会被验证。
4. 处理 Shielded Notes - 始终保持隐私。
5. 更新余额 - Wallet 安全地刷新余额。
6. 保存进度 - 无缝停止和恢复。
7. 完成 - Wallet 已准备好进行交易。

## 实际意义

### 谁能从 Pepper Sync 中受益？

- 新用户 - 可以快速设置 wallet，而不会因延迟而受挫。
- 日常用户 - 可靠的同步让 shielded 支付适用于日常使用。
- 开发者与测试者 - 更短的同步时间意味着更快的测试周期。
- 移动设备与轻量设备 - 即使在资源受限的硬件上，Zingo 现在也能高效运行。

### 为什么这对 Zcash 很重要

Zcash 围绕 shielded 交易构建，这是 cryptocurrency 中最强大的隐私工具之一。但隐私只有在可访问时才真正有用。

Pepper Sync 通过以下方式提供帮助：

- 降低入门门槛 - 新用户可以快速开始使用。
- 支持日常可用性 - Shielded 地址变得更容易被信任。
- 鼓励生态增长 - 更好的 wallet 体验会带来更多采用、应用和服务。

通过改善 wallet 体验，Pepper Sync 加强了整个 Zcash 生态系统。

### 开始使用：通过 Zingo 2.0 完成上手

1. 下载 Wallet - 从[Zingo GitHub 发布页面](https://github.com/zingolabs/zingolib)获取正确版本
2. 设置你的 Wallet - 创建一个新的，或从现有助记词恢复。[Zingo 2.0 with Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. 让 Pepper Sync 运行 - 在 wallet 更新时观察进度指示器。[Pepper Sync Run](https://x.com/ZingoLabs/status/1961871338441724191)
4. 开始使用 Zcash - 同步完成后即可发送和接收 shielded ZEC。
5. 不必担心中断 - 如果应用关闭或连接中断，Pepper Sync 会自动恢复。

## 常见错误

**把 Pepper Sync 当作独立 wallet 来看待**。Pepper Sync 是 Zingo! wallet 内部的同步引擎，不是单独的应用程序。你安装的是 Zingo；Pepper Sync 是在其底层运行的部分。

**认为更快的同步意味着更弱的隐私**。速度提升来自区块数据的获取、排序和缓存方式，而不是通过暴露更多信息实现的。Shielded 交易在整个过程中始终保持私密。

**认为必须在完全同步后才能花费**。在同步完成之前即可花费，是 Pepper Sync 最核心的特性之一，因此你无需等 wallet 到达链尖端再使用。

## FAQ - 常见问题

**问：每次打开 wallet 都必须重新扫描吗？**

答：不用。Pepper Sync 会保存进度，因此你只需从上次的位置继续更新。

**问：如果我的网络断开了会怎样？**

答：同步会暂停，之后无需重启即可继续。

**问：同步过程中我的隐私安全吗？**

答：安全。Shielded 交易会始终保持完全私密。

**问：第一次同步需要多久？**

答：通常是几分钟而不是几小时，具体取决于你的设备和网络连接。

**问：在同步完成之前我可以使用 wallet 吗？**

答：可以。Pepper Sync 支持在同步完成之前进行花费，因此你无需等待 wallet 到达链尖端。

## 结论

有了 Zingo 2.0 Pepper Sync，同步不再是 shielded wallet 最大的痛点。现在它快速、稳定且用户友好，既降低了新手的门槛，也让日常使用变得更加实用。

对用户来说，这意味着更少等待和更多隐私。对开发者来说，这意味着更强的构建基础。对 Zcash 生态系统来说，这是让 shielded 交易对所有人都可用的又一步前进。

Zingo 2.0 with Pepper Sync 不仅仅是一次升级；它是私密且可用的 crypto 体验的一次飞跃。

## 相关页面

- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — wallet 同步在整个 Zcash 生态系统中的工作方式。
- [Lightwallet 节点](/zcash-tech/lightwallet-nodes) — 像 Zingo 这样的 light wallet 所依赖的基础设施。
- [Zaino](/zcash-tech/zaino) — 由 Zingo 团队开发的索引器。
- [Wallets](/wallets) — Zcash wallets 及其功能的完整目录。

## 进一步学习

- [Zingo! GitHub 仓库](https://github.com/zingolabs/zingolib)
- [Zcash 社区论坛](https://forum.zcashcommunity.com/)
- 官方公告 - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
