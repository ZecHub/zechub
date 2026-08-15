---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom 于区块 653,600（协调世界时 2019 年 12 月 11 日）在 Zcash 主网上线。

你将了解：Blossom 如何在不改变网络随时间推移所产生 ZEC 总量的前提下，让 Zcash 区块到达速度大约提升一倍。

Blossom 是一次 Zcash [网络升级](../start-here/network-upgrades)。它通过 [ZIP 206](https://zips.z.cash/zip-0206) 部署，其主要共识变更定义于 [ZIP 208](https://zips.z.cash/zip-0208)。Blossom 是一次可扩展性升级：它将区块之间的目标时间从 150 秒缩短到 75 秒，因此区块到达频率大约翻倍。Electric Coin Company 领导并宣布了 Blossom。

这为什么重要？当你发送 ZEC 时，需要等待网络在某个区块中确认它。如果区块较慢，你就要等待更久。在 Blossom 之前，预期大约每 150 秒产生一个新区块。Blossom 将这一目标减半至 75 秒，因此确认来得更快，链也能在同样时间内承载更多交易。它做到这一点的同时，并没有创造更多 ZEC，也没有改变未来减半发生的时间安排。

## 更快的区块

Blossom 的核心变更很简单。Zcash 的目标区块间隔，也就是网络希望从一个区块到下一个区块之间经过的时间，从 150 秒降到了 75 秒（[ZIP 208](https://zips.z.cash/zip-0208)）。区块通过工作量证明产生，因此它们之间的实际间隔会波动，但网络现在的目标是大约每 75 秒一个区块，而不再是每 150 秒一个。

这带来两点结果：

1. 区块到达频率大约翻倍，因此这条链每单位时间大致可以承载双倍交易量。
2. 你的交易会更快获得第一次确认，因为你不必再等待那么久才会出现下一个区块。

![在 Blossom 之前，区块目标时间为 150 秒，确认更慢，吞吐量更低。Blossom 之后，目标时间变为 75 秒，确认更快，吞吐量大约翻倍](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## 保持发行稳定

更快的区块会带来一个问题。如果 Zcash 生成了两倍数量的区块，而每个区块仍支付相同奖励，那么网络生成 ZEC 的速度也会翻倍。Blossom 避免了这种情况。它将每个区块支付的奖励减半，并将区块奖励减半间隔从 840,000 个区块翻倍到 1,680,000 个区块（[ZIP 208](https://zips.z.cash/zip-0208)）。区块数量翻倍、每个区块支付减半，最终每单位时间产生的 ZEC 总量保持不变。总供应时间表以及未来减半的实际时间点都没有改变。

![Blossom 如何保持发行稳定：75 秒区块到达频率翻倍，每区块奖励减半，减半间隔翻倍，因此随时间推移的总发行量保持不变](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## 一次强制升级

Blossom 是一次双边共识变更，这意味着每个节点都必须升级才能继续跟随这条链（[ZIP 206](https://zips.z.cash/zip-0206)）。对于想要保持同步的节点运营者来说，这不是可选项。Blossom 在主网区块 653,600 激活，并拥有自己的共识分支 id，这个标记可让节点和交易确认自己遵循的是 Blossom 规则。这次升级采用了 Zcash 的标准网络升级机制（[ZIP 200](https://zips.z.cash/zip-0200)）。

## Blossom 的定位

Blossom 是 Zcash 的第三次网络升级。它承接 Overwinter 和 Sapling，早于 Heartwood 和 Canopy。与重新设计 Zcash 屏蔽式加密机制的 Sapling 不同，Blossom 关注的是规模与速度。它的主要任务是区块时间安排，而不是新增隐私功能。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| 目标区块间隔 | 网络希望从一个区块到下一个区块之间经过的时间 |
| 区块奖励 | 每个区块被挖出时新创建并支付的 ZEC |
| 减半间隔 | 每次区块奖励减半之间经过多少个区块 |
| 共识分支 id | 用于标记某个节点或交易正在遵循哪一套网络规则的标签 |
| 双边共识变更 | 每个节点都必须采用、才能继续留在网络中的规则变更 |
| 网络升级（NU） | 对 Zcash 共识规则进行的一次协调性变更，在设定的区块高度激活 |

## 常见问题

Blossom 会改变 ZEC 的总量，或改变减半发生的时间吗？不会。每区块奖励被减半，同时减半间隔被翻倍，因此每单位时间产生的 ZEC 数量，以及未来减半的时间安排，都保持不变。

Blossom 会改变我的 ZEC 或我的隐私吗？不会。Blossom 改变的是区块时间安排和奖励计算方式。它不会影响你的余额或你的屏蔽交易。

75 秒实际意味着什么？这是一个目标，不是保证。区块通过工作量证明产生，因此区块之间的实际间隔会波动。网络的目标是大约每 75 秒一个区块，而不是每 150 秒一个。

Blossom 激活时我需要做什么吗？如果你运行的是完整节点，你需要升级它，因为 Blossom 是强制性的。如果你使用的是 wallet，你需要使用支持新规则的版本。

为什么还要把区块奖励减半？因为现在区块到达速度是原来的两倍。将每区块奖励减半，可以防止网络以两倍速度生成 ZEC。

Blossom 是什么时候激活的？在主网区块 653,600，于协调世界时 2019 年 12 月 11 日激活。

## 测试你的理解

Blossom 让 Zcash 区块到达频率大约翻倍。为什么这没有让新 ZEC 的生成速度也翻倍？

<details>
<summary>答案</summary>

因为 Blossom 同时将每个区块支付的奖励减半，并把减半间隔从 840,000 个区块翻倍到 1,680,000 个区块。区块数量翻倍、每个区块支付减半，最终每单位时间的 ZEC 总量保持不变，因此按实际时间衡量的发行时间表并没有变化。
</details>

### 资源

[ZIP 208：更短的目标区块间隔](https://zips.z.cash/zip-0208)

[ZIP 206：Blossom 网络升级的部署](https://zips.z.cash/zip-0206)

[Blossom 网络升级](https://z.cash/upgrade/blossom/)

[Blossom 升级提升了速度、可扩展性和容量（Electric Coin Company）](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[Zcash 货币政策](../start-here/zcash-monetary-policy)

[什么是 ZEC 和 Zcash](../start-here/what-is-zec-and-zcash)

[完整节点](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Sapling](../zcash-tech/sapling) · 下一篇：[Heartwood](../zcash-tech/heartwood)
