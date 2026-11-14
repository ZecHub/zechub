<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 于 Zcash 主网的区块 2,726,400（2024 年 11 月 23 日 UTC）上线。

您将了解到：Zcash 如何在减半 [halving] 后持续为自身开发提供资金，为什么它留出了一笔当时尚不知如何使用的储备金，以及它如何使 ZEC 的总供应量变得完全可预测。

NU6 是一次 Zcash [网络升级](../start-here/network-upgrades)，由 [ZIP 253](https://zips.z.cash/zip-0253) 部署，于 2024 年 11 月在主网区块 2,726,400 激活。这是一次货币政策和 [开发资金](../start-here/development-fund)升级：它在 2024 年 11 月减半后继续将一部分区块补贴用于开发，建立了供未来由社区决定用途的协议内储备金，并收紧了新 ZEC 的计量方式。NU6 得到了 Electric Coin Company 和 Zcash Foundation 的认可。

这很重要。Zcash 的 [开发基金](../zcash-tech/canopy) 原计划在其历史上第二次减半，即 2024 年 11 月前后结束。NU6 延续了这笔资金，但没有将每一枚币都交给固定接收方，而是在协议内预留了一部分，使社区可以稍后决定如何使用。它还填补了一个不易察觉的会计缺口，因此 ZEC 最终将存在的总量现在可以被精确预测。

## 简要总结（TL;DR）

- NU6 于区块 2,726,400（2024 年 11 月 23 日 UTC）在主网激活，由 ZIP 253 部署。
- 它在 2024 年 11 月减半后继续将区块补贴的 20% 用于开发：8% 给 Zcash Community Grants（ZCG），12% 进入新的延期开发基金锁箱（Deferred Dev Fund Lockbox）（ZIP 2001）。
- 该锁箱是协议内的储备，没有指定支出方。NU6 有意将治理（governance）问题留待解决，之后由 NU6.1（2025）给出了答案。
- ZIP 236 现在要求每笔 coinbase 交易（transaction）都必须精确平衡，因此矿工（miner）不会再少领奖励而意外销毁 ZEC。未来的总供应量因此可以被精确预测。
- 余额、隐私（privacy）和交易规则均未改变：NU6 是一次针对资金和记账的升级。

## 直观类比

把 NU6 想象成一个家庭：它一直向建设者支付固定的津贴，并且知道发薪日即将按计划结束。NU6 没有停止支付，而是将这笔津贴一分为二：一部分继续拨给社区拨款委员会，另一部分存入一个家庭保险箱，而这个保险箱的密码至今尚未公布。保险箱会把这笔钱一直留存，直到这个家庭日后就开启它的规则达成一致——这一协议就是 NU6.1。

## NU6 改变了什么

NU6 在 2024 年 11 月减半后继续将区块补贴的 20% 用于开发资金，这项规则定义于 [ZIP 1015](https://zips.z.cash/zip-1015)。它将这 20% 分为两部分。

1. 区块补贴的 8% 流向 Zcash Community Grants（ZCG），用于资助由社区开展并服务于社区的工作。
2. 12% 进入一个新的协议内锁箱，为未来由社区决定的用途而保留。

其余区块补贴以及交易手续费流向保障网络安全的矿工。NU6 还更新了现有的资金流和开发基金规则（ZIP 207 和 ZIP 214），以适应这一新结构。

![NU6 development-fund split: 20 percent of the block subsidy goes to development, with 8 percent to Zcash Community Grants and 12 percent into the Deferred Dev Fund Lockbox](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## 延期锁箱

这 12% 的份额是 NU6 中的新理念。该价值不会支付给某个接收地址，而是直接存入一个名为 Deferred Dev Fund Lockbox 的协议内 pool，其定义于 [ZIP 2001](https://zips.z.cash/zip-2001)。

1. 锁箱是一种新的资金流类型（DEFERRED_POOL），区块奖励价值进入协议本身，而非个人或组织。
2. 网络将其作为独立的链价值 pool 余额进行跟踪，就像跟踪屏蔽池 [shielded pools] 的余额一样。
3. NU6 有意创建了锁箱，但保留了一个棘手问题：谁控制这些资金，以及如何释放它们？

这一问题后来由 [NU6.1](../zcash-tech/nu6-1) 回答，其确立了治理：它将 8% 的区块补贴资金流延续至 Zcash Community Grants，并将 12% 的资金流导入由持币人控制、以锁箱为种子资金的基金。

## 平衡账目

NU6 还填补了新 ZEC 产生方式中的一个会计缺口，其定义于 [ZIP 236](https://zips.z.cash/zip-0236)。Coinbase 交易是支付每个区块中新 ZEC 和手续费的特殊交易。

1. 在 NU6 之前，coinbase 交易只需不多领其应得金额。矿工可以少领完整补贴，从而悄然销毁那些 ZEC。
2. 在 NU6 之后，coinbase 交易必须精确平衡：总输出价值必须等于矿工补贴加手续费，不多不少。
3. 由于矿工不再能够少领并意外销毁 ZEC，ZEC 最终将存在的总量现在可以被精确预测。

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## 资金机制如何演变

NU6 是 Zcash 如何为自身支付费用这一更长故事中的一个章节。

1. Canopy（2020 年）结束了最初的创始人奖励，并创建了 [开发基金](../start-here/development-fund)。
2. NU6（2024 年 11 月）在第二次减半后重组了该资金机制，并设立了 Deferred Dev Fund Lockbox，将一部分发行量预留用于未来由社区决定的拨款。
3. NU6.1（2025 年）回答了 NU6 留下的问题，即谁控制预留资金；它将区块补贴的 8% 延续至 Zcash Community Grants，并将 12% 导入由持币人控制、以锁箱为种子资金的基金。

![How Zcash funding evolved: Canopy created the development fund, NU6 set up the lockbox, and NU6.1 set the rules for who controls it](/content-images/nu6-funding-timeline-2427db58c0.webp)

## 常见错误

- **误以为 NU6 改变了货币政策。** 发行计划和减半（halving）时间均未改变；NU6 改变的是谁获得一部分补贴，而不是新发行多少 ZEC。
- **把锁箱（lockbox）与基金会钱包（wallet）混为一谈。** 递延开发基金锁箱（Deferred Dev Fund Lockbox）是由共识（consensus）追踪的链（chain）上价值池，而不是任何人都可以从中花费的地址（address）。
- **以为 NU6.1 和 NU6 是同一次升级。** NU6 设立了这笔储备金；NU6.1 决定了由谁控制它：8% 归 ZCG，12% 归一个由代币持有者控制的基金。
- **认为精确余额规则（ZIP 236）会改变用户的代币。** 它约束的是 coinbase 交易（transaction），即每个区块（block）的发行支付（payment），而不是现有余额或普通交易。
- **以为 20% 的开发份额是新设的。** 20% 的开发资金自 Canopy 起就已存在；NU6 将其延续到减半之后，并拆分为 8% ZCG / 12% 锁箱。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Block subsidy | 每挖出一个区块时创建的新 ZEC |
| Coinbase transaction | 支付一个区块补贴和手续费的特殊交易 |
| Deferred Dev Fund Lockbox | 一种协议内储备金，为未来由社区决定的用途保留一部分发行量 |
| Zcash Community Grants (ZCG) | 一个为 Zcash 社区开展并服务于社区的工作提供资金的委员会 |
| Consensus branch id | 节点用于识别某个区块遵循哪次升级规则的标识符 |
| Network upgrade (NU) | 对 Zcash 共识规则进行的协调变更，在指定区块高度激活 |

## 常见问题

NU6 会改变我的 ZEC 或我的隐私吗？不会。NU6 关乎开发资金的筹集方式和发行量的计量方式，而非您的交易或隐私。您的资金和屏蔽交易不受影响。

资金来自哪里？来自区块补贴，即随着区块被挖出而发行的新 ZEC。其中 20% 被导向开发，而不是全部流向矿工。

锁箱有什么用途？它在协议内预留了一部分发行量，使社区可以稍后决定如何使用。NU6 留出了这笔储备金，而 NU6.1 制定了谁控制它的规则。

精确平衡规则会改变我的币吗？不会。它只要求每个区块的 coinbase 交易精确支付其应得金额。它影响的是新发行量的会计核算，而非现有余额。

从技术上讲，什么定义了 NU6？NU6 由 ZIP 253 部署，该规范设定其在主网区块 2,726,400 的激活时间及其共识分支 ID。共识变更本身来自 ZIP 236、ZIP 1015 和 ZIP 2001，并更新了 ZIP 207 和 ZIP 214 以适应新结构。

NU6 与 NU6.1 有何不同？NU6 重组了资金机制并创建了锁箱。NU6.1 决定了谁控制锁箱资金以及如何分配预留份额。

## 测试您的理解

NU6 设立了 Deferred Dev Fund Lockbox，但没有说明谁控制它。为什么一次升级会创建一笔储备金，并有意将其治理留待以后决定？

<details>
<summary>答案</summary>

创建这笔储备金确定了一部分发行量将被保留在协议内，而非支付给固定接收方。决定谁控制这些资金以及如何释放它们，是一个更棘手的治理问题。NU6 有意保留了这一问题，而 NU6.1 给出了答案：区块补贴的 8% 继续流向 Zcash Community Grants，12% 则流向由持币人控制、以锁箱为种子资金的基金。
</details>

### 资源

[ZIP 253：部署 NU6 网络升级](https://zips.z.cash/zip-0253)

[ZIP 236：区块应当精确平衡](https://zips.z.cash/zip-0236)

[ZIP 1015：非直接开发资金的区块补贴分配](https://zips.z.cash/zip-1015)

[ZIP 2001：锁箱资金流](https://zips.z.cash/zip-2001)

[网络升级 6（NU6）](https://z.cash/upgrade/nu6/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[开发基金](../start-here/development-fund)

[Zcash 货币政策](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[什么是 ZEC 以及 Zcash](../start-here/what-is-zec-and-zcash)

---

## 相关页面

| 页面 | 相关原因 |
|---|---|
| [Canopy](./Canopy.md) | 创建了开发基金，该基金后由 NU6 重组 |
| [NU6.1](./NU6_1.md) | 决定了由谁控制锁箱资金 |
| [NU6.2](./NU6_2.md) | 同一系列中的 Orchard 紧急修复升级 |
| [开发基金 (Development Fund)](../start-here/development-fund) | 20% 份额背后的资金历史 |

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[NU5](../zcash-tech/nu5) · 下一篇：[NU6.1](../zcash-tech/nu6-1)
