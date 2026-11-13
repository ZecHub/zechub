<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Heartwood

> Heartwood 于 Zcash 主网的区块 903,000（2020 年 7 月 16 日 UTC）上线。

你将了解：Heartwood 如何让矿工直接将区块奖励领取至屏蔽地址，以及它如何让轻量级客户端能够验证 Zcash 的工作量证明 [proof-of-work]。

Heartwood 是一次 Zcash [网络升级 network upgrade](../start-here/network-upgrades)，即一次共识规则硬分叉，其部署由 [ZIP 250](https://zips.z.cash/zip-0250) 定义。它包含两项功能变更：[ZIP 213](https://zips.z.cash/zip-0213)（屏蔽 Coinbase）以及 [ZIP 221](https://zips.z.cash/zip-0221)（FlyClient）。Heartwood 是 Zcash 的第四次重大网络升级，并获得了 [Electric Coin Company](../zcash-organizations/electric-coin-company) 和 [Zcash Foundation](../zcash-organizations/zcash-foundation) 的共同支持。与每次 Zcash 升级一样，它设定了一个新的共识分支 ID，即一个提供双向重放保护的标签，因此依据新规则构建的交易无法在旧链上重放，反之亦然。

Heartwood 在设定的区块高度（903,000）激活，而非固定时钟时间，因此你在仪表板 [dashboard] 上看到的确切分钟数可能因地点而略有不同。区块和时刻是相同的。

这为何重要。矿工每挖出一个区块都会获得新铸造的 ZEC。在 Heartwood 之前，这笔收入必须进入一个公开的透明地址。任何人都可以查看矿工赚取了多少以及这些币随后流向何处。Heartwood 让该奖励能够直接进入屏蔽地址，因此矿工的收入可以保持私密。它还使轻量级钱包和其他链能够在无需下载整条链的情况下验证 Zcash 的工作量证明。

## 屏蔽 coinbase

coinbase 交易是发放区块奖励的特殊交易。在 Heartwood 之前，其输出必须是透明的，因此矿工新铸造的 ZEC 总是从一个公开地址开始。Heartwood 修改了共识规则，因此按照 ZIP 213 的说法，coinbase 交易可以包含 Sapling 输出。简单来说，矿工现在可以直接将奖励领取至屏蔽 Sapling 地址。透明 coinbase 输出仍然受到支持，因此这是一项新选择，而不是强制变更。

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## 为什么先使用 Sapling

屏蔽 coinbase 专门针对 Sapling 输出，这是有原因的。ZIP 213 说明，Sapling 升级带来了架构变更和性能改进，使得在 coinbase 交易中直接屏蔽资金变得可行。原始的 Sprout 屏蔽 pool 资源消耗过高，无法直接在 coinbase 中进行屏蔽。Sapling 更高效的证明系统和 note 格式使其变得实用。Sapling 本身曾扩展禁止屏蔽 coinbase 输出的旧规则，使该规则也涵盖 Sapling 输出，而 Heartwood 放宽了该规则以允许它们。这很好地说明了 Zcash 升级如何彼此构建：一次升级的基础设施会成为下一次升级的基础。

## FlyClient

Heartwood 还改变了区块头所 commitment 的内容。此前名为 hashFinalSaplingRoot 的区块头字段被重新用于并更名为 hashLightClientRoot。它现在 commitment 于 Merkle Mountain Range（MMR）的根，该结构是基于先前区块的区块头数据和元数据构建的持续结构，例如时间戳、难度目标、Sapling 根、累计工作量和交易数量。该 commitment 让轻客户端或外部链能够使用一个大小仅随链长度对数增长的小型证明来验证 Zcash 的工作量证明。其好处是更好的轻客户端钱包，以及更容易的第三方和跨链集成，因为客户端不再需要下载每个区块来信任该链背后的工作量。

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Heartwood 的位置

Heartwood 是一系列 Zcash 升级中的一步，每次升级都增加下一次升级所依赖的组成部分。Overwinter 和 Sapling 于 2018 年推出，Blossom 于 2019 年推出，Heartwood 于 2020 年在区块 903,000 推出。Canopy 随后于 2020 年晚些时候在区块 1,046,400 推出。Sapling 是这条链中与 Heartwood 相关的关键环节：其高效的屏蔽交易机制是使屏蔽 coinbase 成为可能的技术前提。

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## 太长不看（TL;DR）

- Heartwood 于主网区块 903,000（2020 年 7 月 16 日 UTC）激活，由 ZIP 250 部署，并采用新的共识分支 ID（consensus branch id）以实现双向重放保护。
- ZIP 213（屏蔽 Coinbase）：Coinbase 交易可以包含 Sapling 输出，因此矿工可以将区块奖励直接接收到屏蔽地址中。
- ZIP 221（FlyClient）：区块头中的 hashLightClientRoot 现在 commitment 一个 Merkle Mountain Range，使轻客户端能够使用仅呈对数增长的证明来验证工作量证明。
- 透明 coinbase 输出仍然完全受支持——屏蔽 coinbase 是一个新选项，而非强制要求。
- 激活以区块高度为准，而非时钟时间，因此不同仪表板和时区显示的确切分钟会有所不同。

## 核心解释

在 Heartwood 之前，矿工新铸造的 ZEC 必须首先进入透明地址，因此任何人都可以监视矿工的收入并追踪其去向。ZIP 213 放宽了共识规则，使 coinbase 交易可以支付 Sapling 输出，从而让矿工的收入从诞生的第一刻起就保持隐私。它专门针对 Sapling，因为 Sapling 的高效证明使得在 coinbase 中进行屏蔽变得切实可行；而 Sprout 繁重的证明在那里并不可行。

ZIP 221 将区块头字段 hashFinalSaplingRoot 重新用作 hashLightClientRoot。它现在对基于先前区块的区块头数据构建的 Merkle Mountain Range 作出 commitment，这些数据包括时间戳、难度目标、Sapling 根、累计工作量和交易数量。这样，轻客户端（light client）或另一条链只需一个很小的证明即可验证 Zcash 的工作量证明（proof-of-work），而无需下载每一个区块。

## 形象类比

以前：每位矿工（miner）的收入都张贴在公共告示板上，任何人都能看到金额和资金流向。现在：收入可以装在密封的信封里送达。而且现在每个新区块（block）都带有一枚小巧的火漆印，概括了它之前的每一个区块，因此陌生人只需看一眼，就能确认整条链（chain）上的工作，而不必逐页阅读。

## 深入探讨

这项规则变更有其历史渊源：Sapling 曾将最初对屏蔽 coinbase 的禁令扩展到 Sapling 输出，而 Heartwood 解除了这一限制，允许此类输出。这是一个很好的例子，说明一次升级的底层机制如何成为下一次升级的基础。MMR commitment 在轻量级钱包和跨链 (cross-chain) 集成中发挥了作用，因为以前验证 Zcash 的工作量需要下载完整的链。激活时新增的共识 (consensus) 分支 ID 提供了双向重放保护：按新规则构建的交易无法在旧链上重放，反之亦然。

## 常见错误

- **误以为屏蔽 coinbase 已成为强制要求。** 透明 coinbase 输出仍然有效；由矿工 (miner) 自行选择。
- **以为 Sprout 可以接收屏蔽 coinbase。** 只允许 Sapling 输出——Sprout 的证明 (proof) 生成过于消耗资源。
- **认为 FlyClient 让全节点 (full node) 不再必要。** 它服务于轻客户端 (light client) 和跨链 (cross-chain) 验证者；全节点仍然是网络的基础。
- **寻找固定的激活时钟时间。** 激活被定义在区块 (block) 903,000，因此实际激活的具体分钟会有所不同。
- **把 hashLightClientRoot 与旧的 hashFinalSaplingRoot 混淆。** 这是同一个字段，只是被改作他用并重新命名。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Network upgrade (NU) | 对 Zcash 共识规则的协调变更，在设定区块高度激活 |
| Coinbase transaction | 每个区块中发放区块奖励的特殊交易 |
| Shielded Sapling address | 由 Sapling 升级引入的私密 Zcash 地址类型 |
| Shielded coinbase | 让区块奖励可以支付至屏蔽 Sapling 地址的 Heartwood 变更 |
| FlyClient | 一种让轻客户端使用小型证明验证工作量证明的方法 |
| Merkle Mountain Range (MMR) | 区块头所 commitment 的过去区块持续摘要 |
| Consensus branch id | 标识交易遵循哪次升级规则、用于重放保护的标签 |

## 常见问题

Heartwood 会改变我的 ZEC 或隐私吗？不会。Heartwood 没有触及你现有的资金。它增加了矿工将奖励领取至屏蔽地址的选项，并改善了对轻客户端的支持。你自己的余额和屏蔽交易不受影响。

什么是屏蔽 coinbase？coinbase 是支付区块奖励的交易。Heartwood 让该奖励可以进入屏蔽 Sapling 地址而非透明地址，因此矿工收入可以保持私密。

矿工现在必须以屏蔽方式领取奖励吗？不必。屏蔽 coinbase 是可选的。透明 coinbase 输出仍然受到支持，因此矿工可以任选其一。

为什么屏蔽 coinbase 使用 Sapling 而不是较旧的 Sprout pool？因为 Sapling 更高效的设计使直接在 coinbase 中进行屏蔽变得实用。较早的 Sprout pool 资源消耗过高，无法做到这一点。

轻客户端发生了什么变化？区块头现在通过 hashLightClientRoot 字段 commitment 于包含过去区块的 Merkle Mountain Range。这让轻客户端和其他链能够使用小型、对数大小的证明来验证 Zcash 的工作量证明，而不是使用整条链。

## 测试你的理解

在 Heartwood 之前，为什么支付给矿工的区块奖励会公开显示，而 Heartwood 又改变了什么？

<details>
<summary>答案</summary>

Coinbase 输出必须是透明的，因此矿工新铸造的奖励总会进入任何人都可查看的公开透明地址。Heartwood 修改了共识规则（ZIP 213），使 coinbase 交易可以包含 Sapling 输出，让矿工能够直接将奖励领取至屏蔽地址。
</details>

### 资源

[ZIP 250：Heartwood 网络升级的部署](https://zips.z.cash/zip-0250)

[ZIP 213：屏蔽 Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221：FlyClient - 共识层变更](https://zips.z.cash/zip-0221)

[Heartwood 网络升级](https://z.cash/upgrade/heartwood/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[屏蔽池](../using-zcash/shielded-pools)

[钱包](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## 相关页面

- [Sapling](./Sapling.md) — 让屏蔽 coinbase 成为可能的高效机制
- [Canopy](./Canopy.md) — 该系列中的下一次升级
- [全节点 (Full Nodes)](./Full_Nodes.md) — 完整验证仍然提供的功能
- [区块浏览器能看到什么](./What_a_Block_Explorer_Can_See.md) — 透明 coinbase 与屏蔽 coinbase 各自暴露哪些信息

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Blossom](../zcash-tech/blossom) · 下一篇：[Canopy](../zcash-tech/canopy)
