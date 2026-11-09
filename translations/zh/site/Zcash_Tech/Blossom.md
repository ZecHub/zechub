<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom 于 Zcash 主网区块 653,600（2019 年 12 月 11 日 UTC）上线。

你将了解：Blossom 如何让 Zcash 区块 [block] 的到达速度提高约一倍，同时不改变网络随时间推移创建的 ZEC 数量。

Blossom 是一次 Zcash [网络升级 network upgrade](../start-here/network-upgrades)。它通过 [ZIP 206](https://zips.z.cash/zip-0206) 部署，其主要共识 [consensus] 变更在 [ZIP 208](https://zips.z.cash/zip-0208) 中定义。Blossom 是一次扩容 [scaling] 升级：它将区块之间的目标时间从 150 秒缩短至 75 秒，因此区块到达频率约提高一倍。Electric Coin Company 主导并宣布了 Blossom。

这为何重要。当你发送 ZEC 时，你需要等待网络在一个区块中确认它。如果区块较慢，你等待的时间就更长。在 Blossom 之前，预计每约 150 秒会产生一个新区块。Blossom 将该目标减半至 75 秒，因此确认会更快到来，链 [chain] 也能在相同时间内承载更多交易 [transaction]。它在不创建更多 ZEC 或改变未来减半 [halving] 时间安排的情况下实现了这一点。

## 更快的区块

Blossom 的核心变更很简单。Zcash 的目标区块间隔，即网络希望一个区块与下一个区块之间的时间，从 150 秒降至 75 秒（[ZIP 208](https://zips.z.cash/zip-0208)）。区块通过工作量证明 [proof of work] 产生，因此它们之间的实际间隔会有所变化，但网络现在的目标是约每 75 秒产生一个区块，而非每 150 秒。

由此带来两点：

1. 区块到达频率约提高一倍，因此链每单位时间大致可以承载双倍的交易。
2. 你的交易会更快获得首次确认，因为你不必等待下一个区块那么久。

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## 保持发行量稳定

更快的区块带来了一个问题。如果 Zcash 产生了双倍数量的区块，而每个区块仍支付相同的奖励，网络创建 ZEC 的速度就会提高一倍。Blossom 避免了这一点。它将每个区块支付的奖励减半，并将区块奖励的减半间隔从 840,000 个区块加倍至 1,680,000 个区块（[ZIP 208](https://zips.z.cash/zip-0208)）。双倍数量的区块，每个支付一半奖励，意味着每单位时间创建的 ZEC 数量保持不变。总供应量计划以及按现实时间衡量的未来减半时间均未改变。

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](/content-images/blossom-emission-balance-f2443e29ab.webp)

## 强制升级

Blossom 是一项双边共识变更，这意味着每个节点 [node] 都必须升级才能继续跟随该链（[ZIP 206](https://zips.z.cash/zip-0206)）。对于希望保持同步的节点运营者而言，这不是可选项。Blossom 在主网区块 653,600 激活，并带有自己的共识分支 ID，这是一种让节点和交易确认其遵循 Blossom 规则的标签。该升级采用了 Zcash 的标准网络升级机制（[ZIP 200](https://zips.z.cash/zip-0200)）。

## Blossom 的定位

Blossom 是 Zcash 的第三次网络升级。它继 Overwinter 和 Sapling 之后，并在 Heartwood 和 Canopy 之前。与重构 Zcash 屏蔽 [shielded] 密码学的 Sapling 不同，Blossom 专注于规模和速度。其主要任务是区块时间安排，而不是新增隐私 [privacy] 功能。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Block target spacing | 网络希望一个区块与下一个区块之间的时间 |
| Block reward | 每个区块被挖出时新创建并支付的 ZEC |
| Halving interval | 每次区块奖励减半之间经过的区块数量 |
| Consensus branch id | 标记节点或交易正在遵循哪一套网络规则的标签 |
| Bilateral consensus change | 每个节点都必须采纳才能留在网络上的规则变更 |
| Network upgrade (NU) | 对 Zcash 共识规则的协调变更，在设定的区块高度激活 |

## 常见问题

Blossom 会改变 ZEC 的总量或减半发生的时间吗？不会。每区块奖励减半的同时，减半间隔加倍，因此每单位时间创建的 ZEC 数量以及未来减半的时间保持不变。

Blossom 会改变我的 ZEC 或我的隐私吗？不会。Blossom 改变了区块时间安排和奖励计算方式。它并未触及你的余额或你的屏蔽交易。

75 秒实际上意味着什么？这是一个目标，而非保证。区块通过工作量证明产生，因此区块之间的实际间隔会有所变化。网络的目标是约每 75 秒产生一个区块，而非每 150 秒。

Blossom 激活时我必须做什么吗？如果你运行全节点 [full node]，则需要升级它，因为 Blossom 是强制性的。如果你使用钱包 [wallet]，则需要一个支持新规则的版本。

为什么要将区块奖励减半？因为区块现在到达速度提高了一倍。将每区块奖励减半可防止网络以双倍速度创建 ZEC。

Blossom 何时激活？在 2019 年 12 月 11 日 UTC 的主网区块 653,600 激活。

## 测试你的理解

Blossom 让 Zcash 区块的到达频率约提高一倍。为什么这没有使新 ZEC 的创建速率翻倍？

<details>
<summary>答案</summary>

因为 Blossom 还将每区块支付的奖励减半，并将减半间隔从 840,000 个区块加倍至 1,680,000 个区块。双倍数量的区块，每个支付一半奖励，每单位时间累积的 ZEC 数量保持不变，因此按现实时间衡量的发行计划没有改变。
</details>

### 资源

[ZIP 208：更短的区块目标间隔](https://zips.z.cash/zip-0208)

[ZIP 206：部署 Blossom 网络升级](https://zips.z.cash/zip-0206)

[Blossom 网络升级](https://z.cash/upgrade/blossom/)

[Blossom 升级提升速度、扩容能力和容量（Electric Coin Company）](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[Zcash 货币政策](../start-here/zcash-monetary-policy)

[什么是 ZEC 和 Zcash](../start-here/what-is-zec-and-zcash)

[全节点](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Sapling](../zcash-tech/sapling) · 下一篇：[Heartwood](../zcash-tech/heartwood)
