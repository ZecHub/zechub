---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood 于区块 903,000（协调世界时 2020 年 7 月 16 日）在 Zcash 主网上线。

你将了解：Heartwood 如何让矿工将区块奖励直接领取到屏蔽地址，以及它如何让轻量客户端能够验证 Zcash 的工作量证明。

Heartwood 是 Zcash 的一次[网络升级](../start-here/network-upgrades)，即一次由共识规则硬分叉构成的升级，其部署方式定义于 [ZIP 250](https://zips.z.cash/zip-0250)。它捆绑了两项功能变更：[ZIP 213](https://zips.z.cash/zip-0213)（Shielded Coinbase）和 [ZIP 221](https://zips.z.cash/zip-0221)（FlyClient）。Heartwood 是 Zcash 的第四次重大网络升级，并由 [Electric Coin Company](../zcash-organizations/electric-coin-company) 与 [Zcash Foundation](../zcash-organizations/zcash-foundation) 共同支持。和每一次 Zcash 升级一样，它设定了一个新的共识分支 id，这是一种标签，可提供双向重放保护，因此按照新规则构建的交易无法在旧链上被重放，反之亦然。

Heartwood 在预先设定的区块高度（903,000）激活，而不是在固定的时钟时间激活，因此你在不同仪表板上看到的具体分钟数可能会略有不同。区块本身以及激活时刻是相同的。

这为什么重要。矿工每挖出一个区块，就会获得新铸造的 ZEC。Heartwood 之前，这笔收入必须进入一个透明地址，而透明地址是公开的。任何人都可以看到矿工赚了多少，以及这些币随后流向了哪里。Heartwood 让这笔奖励可以直接进入屏蔽地址，因此矿工的收入可以保持私密。它还让轻量钱包和其他链能够在不下载整条链的情况下验证 Zcash 的工作量证明。

## 屏蔽 coinbase

coinbase 交易是用于支付区块奖励的特殊交易。Heartwood 之前，它的输出必须是透明的，因此矿工新铸造的 ZEC 总是从一个公开地址开始其生命周期。Heartwood 修改了共识规则，因此用 ZIP 213 的原话来说，coinbase 交易可以包含 Sapling 输出。通俗地说，矿工现在可以直接将奖励领取到屏蔽的 Sapling 地址。透明的 coinbase 输出仍然受支持，因此这是一项新选择，而不是强制变更。

![在 Heartwood 之前，矿工的区块奖励必须发送到一个透明的公开地址。Heartwood 之后，coinbase 交易可以包含 Sapling 输出，因此奖励可以直接发送到屏蔽地址](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## 为什么先是 Sapling

屏蔽 coinbase 专门针对 Sapling 输出，这是有原因的。ZIP 213 解释说，Sapling 升级带来了架构变更和性能改进，使得直接在 coinbase 交易中屏蔽资金成为可行方案。最初的 Sprout 屏蔽池资源消耗太大，无法直接在 coinbase 中进行屏蔽。Sapling 更高效的证明系统和 note 格式让这件事变得切实可行。Sapling 本身曾扩展过旧规则——该规则原本禁止屏蔽 coinbase 输出——使其也覆盖到 Sapling 输出，而 Heartwood 则放宽了这条规则以允许它们。这很好地说明了 Zcash 的升级是如何相互构建的：一次升级中的底层机制，会成为下一次升级的基础。

## FlyClient

Heartwood 还改变了区块头所承诺的内容。此前名为 hashFinalSaplingRoot 的区块头字段被重新利用并重命名为 hashLightClientRoot。它现在承诺的是一个 Merkle Mountain Range（MMR）的根，这是一个基于先前区块的区块头数据和元数据（如时间戳、难度目标、Sapling 根、累计工作量和交易数量）构建的持续运行结构。这个承诺使轻量客户端或外部链能够使用一个很小的证明来验证 Zcash 的工作量证明，而该证明的大小只会随着链长度按对数方式增长。其好处是更好的轻量客户端钱包，以及更容易进行第三方和跨链集成，因为客户端不再需要下载每一个区块，才能信任这条链背后的工作量。

![FlyClient 流程：每个区块的区块头数据都会被承诺进一个 Merkle Mountain Range 根（hashLightClientRoot）中，这让轻量客户端能够使用一个小型、对数大小的证明来验证工作量证明](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Heartwood 的位置

Heartwood 是 Zcash 一系列升级中的一步，每次升级都会增加下一次升级所依赖的一部分能力。Overwinter 和 Sapling 于 2018 年推出，Blossom 于 2019 年推出，而 Heartwood 于 2020 年在区块 903,000 处激活。Canopy 随后于 2020 年晚些时候在区块 1,046,400 处激活。对 Heartwood 而言，Sapling 是这条链中的关键环节：它高效的屏蔽交易机制，是屏蔽 coinbase 成为可能的技术前提。

![Zcash 升级时间线：2018 年的 Overwinter 和 Sapling，2019 年的 Blossom，以及 2020 年的 Heartwood](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## 术语表

| 术语 | 通俗含义 |
|---|---|
| 网络升级（NU） | 对 Zcash 共识规则进行的协调性变更，在预设区块高度激活 |
| Coinbase 交易 | 每个区块中用于支付区块奖励的特殊交易 |
| 屏蔽的 Sapling 地址 | 由 Sapling 升级引入的一种私密 Zcash 地址类型 |
| 屏蔽 coinbase | Heartwood 引入的变更，使区块奖励可以支付到屏蔽的 Sapling 地址 |
| FlyClient | 一种让轻量客户端能够用小型证明验证工作量证明的方法 |
| Merkle Mountain Range (MMR) | 对过去区块进行持续汇总的一种结构，区块头会对其作出承诺 |
| 共识分支 id | 用于标识某笔交易遵循哪次升级规则的标签，用于重放保护 |

## 常见问题

Heartwood 会改变我的 ZEC 或我的隐私吗？不会。Heartwood 不会触及你现有的资金。它增加了一个新选项，让矿工可以将奖励领取到屏蔽地址，并改进了对轻量客户端的支持。你自己的余额和屏蔽交易都不会受到影响。

什么是屏蔽 coinbase？coinbase 是用于支付区块奖励的交易。Heartwood 让这笔奖励可以进入屏蔽的 Sapling 地址，而不是透明地址，因此矿工收入可以保持私密。

矿工现在必须以屏蔽方式接收奖励吗？不必。屏蔽 coinbase 是可选的。透明的 coinbase 输出仍然受支持，因此矿工可以二选一。

为什么屏蔽 coinbase 使用 Sapling，而不是更早的 Sprout 池？因为 Sapling 更高效的设计，使得直接在 coinbase 中进行屏蔽成为切实可行的方案。更早的 Sprout 池资源消耗过大，无法做到这一点。

轻量客户端发生了什么变化？区块头现在会通过 hashLightClientRoot 字段，对过去区块之上的一个 Merkle Mountain Range 作出承诺。这使轻量客户端和其他链能够使用小型、对数大小的证明来验证 Zcash 的工作量证明，而不必验证整条链。

## 测试你的理解

在 Heartwood 之前，为什么支付给矿工的区块奖励会公开显示出来？Heartwood 又改变了什么？

<details>
<summary>答案</summary>

coinbase 输出必须是透明的，因此矿工新铸造的奖励总是会进入一个任何人都可以查看的公开透明地址。Heartwood 修改了共识规则（ZIP 213），使 coinbase 交易可以包含 Sapling 输出，从而让矿工能够直接将奖励领取到屏蔽地址。
</details>

### 资源

[ZIP 250：Heartwood 网络升级的部署](https://zips.z.cash/zip-0250)

[ZIP 213：Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221：FlyClient - 共识层变更](https://zips.z.cash/zip-0221)

[Heartwood 网络升级](https://z.cash/upgrade/heartwood/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[屏蔽池](../using-zcash/shielded-pools)

[钱包](../using-zcash/wallets)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Blossom](../zcash-tech/blossom) · 下一篇：[Canopy](../zcash-tech/canopy)
