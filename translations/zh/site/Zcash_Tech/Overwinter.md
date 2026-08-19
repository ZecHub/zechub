<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Overwinter

> Overwinter 于 2018 年 6 月 26 日 UTC 在区块 347,500 于 Zcash 主网上线。

你将了解到：Zcash 如何学会安全地变更自身规则，以及为什么这项基础工作让此后的每一次升级——从 Sapling 开始——都成为可能。

Overwinter 是一次 Zcash [网络升级](../start-here/network-upgrades)，也是该网络上线后的第一次升级。它由多份 Zcash Improvement Proposal 定义：[ZIP 200](https://zips.z.cash/zip-0200)、[ZIP 201](https://zips.z.cash/zip-0201)、[ZIP 202](https://zips.z.cash/zip-0202)、[ZIP 203](https://zips.z.cash/zip-0203) 和 [ZIP 143](https://zips.z.cash/zip-0143)。Overwinter 没有加入任何新的 shielded 功能。相反，它加固了协议，使未来的升级能够安全发布。此次升级由 [Electric Coin Company](../zcash-organizations/electric-coin-company) 在 Zcash 官方升级页面中进行了说明。

这为什么重要。改变一条正在运行中的 blockchain 的规则是有风险的。如果处理错误，网络的两个版本可能会产生分歧，或者原本只打算用于一条链上的交易会被复制到另一条链上。在 Overwinter 之前，Zcash 没有一种标准化、具备重放安全性的方式来协调规则变更。Overwinter 解决了这个问题。它为 Zcash 提供了正式的升级流程，而且同样重要的是，它带来了双向重放保护，因此在一套规则下有效的交易，无法在另一套规则下被重放。正是这项基础工作，才让 Sapling 以及之后的每一次升级都能够顺利激活。

![Overwinter 前后对比：此前没有标准升级路径，也没有重放保护。此后有了网络升级机制、双向重放保护以及安全的未来升级](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## 升级机制

Overwinter 引入了网络升级机制（Network Upgrade Mechanism），定义见 [ZIP 200](https://zips.z.cash/zip-0200)。现在每一次升级都会定义两件事：一个用于标识当前规则集的共识分支 id，以及一个激活高度，也就是新规则开始生效的区块。这让所有运行 Zcash 软件的人都能在切换发生前，有一个明确的更新窗口。

Overwinter 本身是在主网区块 347,500 激活的。

[ZIP 201](https://zips.z.cash/zip-0201) 规定了升级前后节点之间如何相互对待。在激活之前，节点会优先连接运行相同版本的对等节点。到了激活时刻，节点会断开与处于不同共识分支的对等节点的连接，从而让网络按照新规则清晰分离，而不是陷入混乱。

## 重放保护

重放，是指有人把原本在一条链上有效的交易，重新广播到另一条链上。Overwinter 通过新的签名方案关闭了这扇门，该方案定义在 [ZIP 143](https://zips.z.cash/zip-0143) 中。当 wallet 对一笔交易进行签名时，签名现在会绑定当前链的共识分支 id。为某一分支签名的交易，在任何其他分支上都不再有效，而且两个方向都如此。这就是双向重放保护的含义。

这一机制与 [ZIP 202](https://zips.z.cash/zip-0202) 中新的 version 3 交易格式协同工作，这种格式有时也被称为 Overwintered 格式。它加入了 `fOverwintered` 标志和 version group id，用来明确一笔交易属于哪一套共识规则。作为附带收益，这种新的签名方案也提升了透明交易的验证速度。

![重放保护如何工作：wallet 对交易签名时会绑定当前共识分支 id，因此该交易无法在任何其他分支上被重放](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## 交易过期

[ZIP 203](https://zips.z.cash/zip-0203) 增加了交易过期机制。现在，交易可以设置一个过期区块高度。如果到那个高度还没有被打包，节点就会将其从 mempool（未确认交易的等待室）中移除。在此之前，一笔交易可能会长时间处于未确认状态。过期机制意味着，一笔卡住的交易最终会自行清除，这既减少了你的不确定性，也避免 mempool 被那些陈旧、未被打包的交易填满。

## 它所处的位置

Overwinter 是 2016 年 10 月主网上线后，Zcash 的第一次网络升级，而且它是刻意先于 Sapling 发布的。它的任务是基础设施，而不是功能特性。通过先安装升级机制和重放保护这套“机械装置”，它为之后的每一次升级（Sapling、Blossom、Heartwood、Canopy、NU5，以及后续升级）都提供了一条安全的激活路径。

![时间线：从 2016 年 10 月的 Sprout 上线，到 2016 至 2018 年间缺乏升级框架的阶段，再到 2018 年 6 月的 Overwinter](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## 术语表

| 术语 | 通俗含义 |
|---|---|
| 网络升级（NU） | 对 Zcash 共识规则进行协调一致的变更，并在指定区块高度激活 |
| 共识分支 id | 用于标识当前这套共识规则的简短标识符 |
| 激活高度 | 网络升级的新规则开始生效的区块 |
| 重放保护 | 阻止一笔在某条链上有效的交易被拿到另一条链上复用的规则 |
| Mempool | 已广播但尚未被打包进区块的交易池 |
| 交易过期 | 一个过期区块高度，超过之后，未被打包的交易将被丢弃 |

## 常见问题

Overwinter 改变了我的 ZEC 或我的隐私吗？没有。Overwinter 没有加入任何新功能，也没有触及 shielded 交易。它只是为未来的安全升级铺设底层管线。你的资金和隐私都没有受到影响。

Overwinter 加入了 Sapling 或 shielded 地址吗？没有。Overwinter 没有加入任何 shielded 功能。它只是为 Sapling 之后能够安全激活做好了准备。

什么是共识分支 id？它是一个用于标识当前规则集的简短标签。交易在签名时会绑定它，这正是 Zcash 获得重放保护的原因。

为什么有些资料写 6 月 25 日，而另一些写 6 月 26 日？Overwinter 于 2018 年 6 月 26 日 01:37 UTC 激活。这个时间点刚过 UTC 午夜，因此在许多西方时区中，当地时间仍然是 6 月 25 日。其实是同一个区块、同一个时刻。

交易过期有什么用？它意味着一笔始终没有被打包的交易不会永远挂在那里。超过其过期高度后，节点会将其丢弃，因此你不用一直猜测一笔卡住的支付到底发生了什么。

我需要做什么吗？不需要。Overwinter 在 2018 年就已激活。现在任何现行的 Zcash wallet 或节点都已经遵循这些规则。

## 测试你的理解

Overwinter 没有加入任何新的 shielded 功能。那为什么它仍被认为是 Zcash 历史上最重要的升级之一？

<details>
<summary>答案</summary>

因为它构建了之后每一次升级都依赖的那套机制。Overwinter 引入了网络升级机制和双向重放保护，为 Zcash 提供了一种标准化且安全的方式来变更其共识规则。没有这项基础工作，Sapling 以及其后的升级就不可能顺利激活。
</details>

### 资源

[ZIP 200：网络升级机制](https://zips.z.cash/zip-0200)

[ZIP 201：Overwinter 的网络对等节点管理](https://zips.z.cash/zip-0201)

[ZIP 202：Overwinter 的 Version 3 交易格式](https://zips.z.cash/zip-0202)

[ZIP 203：交易过期](https://zips.z.cash/zip-0203)

[ZIP 143：Overwinter 的交易签名验证](https://zips.z.cash/zip-0143)

[Overwinter 网络升级](https://z.cash/upgrade/overwinter/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[Shielded 池](../using-zcash/shielded-pools)

[全节点](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[什么是 ZEC 和 Zcash](../start-here/what-is-zec-and-zcash)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Sprout](../zcash-tech/sprout) · 下一篇：[Sapling](../zcash-tech/sapling)
