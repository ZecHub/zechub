<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Overwinter

> Overwinter 于 Zcash 主网的第 347,500 个区块（2018 年 6 月 26 日 UTC）上线。

你将了解：Zcash 如何学会安全地更改自身规则，以及为什么这项基础工作使得从 Sapling 开始的每次后续升级成为可能。

Overwinter 是一次 Zcash [网络升级 network upgrade](../start-here/network-upgrades)，是网络上线后的首次升级。它由数项 Zcash 改进提案定义：[ZIP 200](https://zips.z.cash/zip-0200)、[ZIP 201](https://zips.z.cash/zip-0201)、[ZIP 202](https://zips.z.cash/zip-0202)、[ZIP 203](https://zips.z.cash/zip-0203) 和 [ZIP 143](https://zips.z.cash/zip-0143)。Overwinter 没有新增任何屏蔽 [shielded] 功能。相反，它强化了协议，以便未来升级能够安全发布。该升级由官方 Zcash 升级页面上的 [Electric Coin Company](../zcash-organizations/electric-coin-company) 记录。

这为何重要。更改一个正在运行的 blockchain [blockchain] 的规则很危险。如果操作失误，网络的两个版本可能产生分歧，或者原本面向一条链 [chain] 的交易 [transaction] 可能被复制到另一条链上。在 Overwinter 之前，Zcash 没有用于协调规则变更的标准且防重放的方式。Overwinter 解决了这一问题。它为 Zcash 提供了正式的升级流程，更重要的是提供了双向重放保护，因此在一套规则下有效的交易无法在另一套规则下被重放。这项基础工作使得 Sapling 及其后的每次升级都能顺利激活。

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](/content-images/overwinter-before-after-acf4f5d283.webp)

## 升级机制

Overwinter 引入了由 [ZIP 200](https://zips.z.cash/zip-0200) 定义的网络升级机制。现在每次升级都会定义两项内容：用于标识当前规则集的共识 [consensus] 分支 ID，以及新规则生效所在区块的激活高度。这让所有运行 Zcash 软件的人都能在切换前拥有明确的更新窗口。

Overwinter 本身在主网的第 347,500 个区块激活。

[ZIP 201](https://zips.z.cash/zip-0201) 规定了节点 [node] 在升级前后如何相互处理。激活前，节点会优先连接运行相同版本的对等节点。激活时，节点会断开与处于不同共识分支的对等节点的连接，使网络能够按照新规则清晰分离，而不会陷入混乱。

## 重放保护

重放是指有人将一条在某条链上有效的交易重新广播到另一条链上。Overwinter 通过由 [ZIP 143](https://zips.z.cash/zip-0143) 定义的新签名 [signature] 方案堵住了这一漏洞。当钱包 [wallet] 对交易签名时，签名现在会绑定当前链的共识分支 ID。为一个分支签名的交易在任何其他分支上都无效，无论方向如何。这就是双向重放保护的含义。

这与 [ZIP 202](https://zips.z.cash/zip-0202) 中新的版本 3 交易格式协同工作，该格式有时被称为 Overwintered 格式。它添加了 fOverwintered 标志和版本组 ID，清楚表明一笔交易属于哪套共识规则。附带的好处是，新的签名方案还提升了透明 [transparent] 交易的验证速度。

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](/content-images/overwinter-replay-flow-754ec8578a.webp)

## 交易到期

[ZIP 203](https://zips.z.cash/zip-0203) 增加了交易到期功能。交易现在可以设定一个到期区块高度。如果在该高度前尚未被挖矿 [mining]，节点会将其从内存池中移除；内存池是未经确认交易的等候区。在此之前，一笔交易可能长期处于未确认状态。到期意味着卡住的交易最终会自行清除，从而减少你的不确定性，并防止内存池被旧的、未挖出的交易填满。

## 所处位置

Overwinter 是 2016 年 10 月主网上线后 Zcash 的首次网络升级，并且刻意在 Sapling 之前发布。它的职责是基础设施，而不是功能。通过先部署升级机制和重放保护机制，它为每次后续升级（Sapling、Blossom、Heartwood、Canopy、NU5 以及之后的升级）提供了安全的激活路径。

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](/content-images/overwinter-timeline-689d9bcf20.webp)

## 术语表

| 术语 | 简明含义 |
|---|---|
| Network upgrade (NU) | 对 Zcash 共识规则的协调变更，在指定区块高度激活 |
| Consensus branch id | 标识当前共识规则集的简短标识符 |
| Activation height | 网络升级的新规则生效所在的区块 |
| Replay protection | 阻止在一条链上有效的交易被重新用于另一条链的规则 |
| Mempool | 已广播但尚未被挖入区块的交易 pool [pool] |
| Transaction expiry | 未挖出交易会在此到期区块高度之后被移除 |

## 常见问题

Overwinter 改变了我的 ZEC 或我的隐私 [privacy] 吗？没有。Overwinter 没有新增功能，也没有触及屏蔽交易。它是为未来安全升级铺设的基础设施。你的资金和隐私没有受到影响。

Overwinter 增加了 Sapling 或屏蔽地址 [address] 吗？没有。Overwinter 没有增加屏蔽功能。它为 Sapling 之后能够安全激活做好了准备。

什么是共识分支 ID？它是标识当前规则集的简短标签。交易在签名时会绑定它，这正是 Zcash 获得重放保护的原因。

为什么有些资料写 6 月 25 日，有些则写 6 月 26 日？Overwinter 于 2018 年 6 月 26 日 UTC 01:37 激活。那刚过 UTC 午夜，因此在许多西方时区，当地时间仍显示为 6 月 25 日。这是同一个区块，也是同一时刻。

交易到期有什么用？这意味着永远未被挖出的交易不会无限期滞留。在其到期高度之后，节点会将其移除，因此你不必再猜测一笔支付 [payment] 是否卡住。

我需要做什么吗？不需要。Overwinter 已于 2018 年激活。任何当前的 Zcash 钱包或节点都已遵循这些规则。

## 测试你的理解

Overwinter 没有新增屏蔽功能。那么，为什么它被认为是 Zcash 历史上最重要的升级之一？

<details>
<summary>答案</summary>

因为它构建了每次后续升级所依赖的机制。Overwinter 引入了网络升级机制和双向重放保护，为 Zcash 提供了更改其共识规则的标准且安全的方式。没有这项基础工作，Sapling 和其后的升级就无法顺利激活。
</details>

### 资源

[ZIP 200：网络升级机制](https://zips.z.cash/zip-0200)

[ZIP 201：Overwinter](https://zips.z.cash/zip-0201) 的网络对等节点管理

[ZIP 202：Overwinter](https://zips.z.cash/zip-0202) 的版本 3 交易格式

[ZIP 203：交易到期](https://zips.z.cash/zip-0203)

[ZIP 143：Overwinter](https://zips.z.cash/zip-0143) 的交易签名验证

[Overwinter 网络升级](https://z.cash/upgrade/overwinter/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[屏蔽池](../using-zcash/shielded-pools)

[全节点](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[什么是 ZEC 以及 Zcash](../start-here/what-is-zec-and-zcash)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Sprout](../zcash-tech/sprout) · 下一篇：[Sapling](../zcash-tech/sapling)
