---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 已于协调世界时 2024 年 11 月 23 日在 Zcash 主网的区块 2,726,400 正式上线。

你将了解到：Zcash 如何在一次减半之后继续为自身开发提供资金，为什么它会预留一笔当时还不知道该如何使用的储备，以及它如何让 ZEC 的总供应量变得完全可预测。

NU6 是一次 Zcash [网络升级](../start-here/network-upgrades)，由 [ZIP 253](https://zips.z.cash/zip-0253) 部署，并于 2024 年 11 月在主网区块 2,726,400 激活。这是一次货币政策与[开发资金](../start-here/development-fund)升级：它让区块补贴中的一部分在 2024 年 11 月减半之后继续流向开发资金，在协议内建立了一项供社区未来决定用途的储备，并收紧了新发行 ZEC 的计量方式。NU6 得到了 Electric Coin Company 和 Zcash Foundation 的共同支持。

这为什么重要。Zcash 的[开发基金](../zcash-tech/canopy)原定于 2024 年 11 月减半前后结束，这也是其历史上的第二次减半。NU6 让这项资金得以延续，但它并没有把每一枚币都直接交给固定接收方，而是在协议内部预留了一部分，让社区之后再决定如何使用。此外，它还弥补了一个不太显眼的记账漏洞，因此未来 ZEC 的总量如今可以被精确预测。

## NU6 改变了什么

NU6 延续了一个规则：在 2024 年 11 月减半之后，仍将区块补贴的 20% 用于开发资金；这一规则定义于 [ZIP 1015](https://zips.z.cash/zip-1015)。这 20% 被分成了两部分。

1. 区块补贴的 8% 流向 Zcash Community Grants (ZCG)，用于资助由社区发起并服务社区的工作。
2. 12% 进入一个新的协议内锁箱，留待未来由社区决定用途。

区块补贴的其余部分以及交易手续费则归保护网络安全的矿工所有。NU6 还更新了现有的 funding-stream 和 dev-fund 规则（ZIP 207 和 ZIP 214），以适配这一新结构。

![NU6 development-fund split: 20 percent of the block subsidy goes to development, with 8 percent to Zcash Community Grants and 12 percent into the Deferred Dev Fund Lockbox](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## 延迟锁箱

这 12% 的份额是 NU6 中的新想法。它不是支付到某个接收地址，而是直接存入协议内一个名为 Deferred Dev Fund Lockbox 的资金池，该机制定义于 [ZIP 2001](https://zips.z.cash/zip-2001)。

1. 锁箱是一种新的 funding-stream 类型（DEFERRED_POOL），区块奖励价值流入协议本身，而不是流向个人或组织。
2. 网络会将其作为独立的链上价值池余额进行跟踪，就像跟踪 shielded 资金池余额那样。
3. NU6 有意创建了这个锁箱，但将一个棘手的问题留待以后解决：谁来控制这些资金，以及它们如何被释放？

这个问题后来由 [NU6.1](../zcash-tech/nu6-1) 回答，它确立了治理方式：继续将区块补贴中的 8% 流向 Zcash Community Grants，并将 12% 流向一个由持币者控制、且以该锁箱为初始资金来源的基金。

## 平衡账目

NU6 还修补了新发行 ZEC 的记账漏洞，该变更定义于 [ZIP 236](https://zips.z.cash/zip-0236)。Coinbase 交易是用于发放每个区块中新生成的 ZEC 和手续费的特殊交易。

1. 在 NU6 之前，coinbase 交易只要求不能领取超过其应得的金额。矿工可以少领于完整补贴的数额，这会悄悄地销毁那部分 ZEC。
2. 在 NU6 之后，coinbase 交易必须严格平衡：总输出价值必须恰好等于矿工补贴加手续费，不能多也不能少。
3. 由于矿工不能再少领并意外销毁 ZEC，因此未来 ZEC 的总量如今可以被精确预测。

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## 资金机制如何演变

NU6 是 Zcash 如何为自身运转买单这一更长故事中的一个篇章。

1. Canopy（2020）结束了最初的 founders reward，并建立了[开发基金](../start-here/development-fund)。
2. NU6（2024 年 11 月）在第二次减半之后重组了这项资金机制，并设立了 Deferred Dev Fund Lockbox，为未来由社区决定的资助预留了一部分发行量。
3. NU6.1（2025）回答了 NU6 留下的问题——谁控制这些预留资金——方法是继续将区块补贴中的 8% 分配给 Zcash Community Grants，并将 12% 导向一个由持币者控制、且由锁箱提供初始资金的基金。

![How Zcash funding evolved: Canopy created the development fund, NU6 set up the lockbox, and NU6.1 set the rules for who controls it](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Block subsidy | 每挖出一个区块时新生成的 ZEC |
| Coinbase transaction | 用于发放区块补贴和手续费的特殊交易 |
| Deferred Dev Fund Lockbox | 一项协议内储备，用于保留一部分发行量，供未来由社区决定用途 |
| Zcash Community Grants (ZCG) | 一个资助由 Zcash 社区发起并服务社区工作的委员会 |
| Consensus branch id | 节点用来判断某个区块遵循哪次升级规则的标识符 |
| Network upgrade (NU) | 对 Zcash 共识规则进行的一次协调变更，在设定的区块高度激活 |

## 常见问题

NU6 会改变我的 ZEC 或我的隐私吗？不会。NU6 关乎的是开发资金的筹措方式以及发行量的计量方式，而不是你的交易或隐私。你的资金和 shielded 交易不受影响。

资金从哪里来？来自区块补贴，也就是随着区块被挖出而新发行的 ZEC。其中 20% 被导向开发，而不是全部给矿工。

锁箱的用途是什么？它在协议内部预留了一部分发行量，让社区之后决定如何使用。NU6 先把这项储备留出来，而 NU6.1 则制定了谁来控制它的规则。

精确平衡规则会改变我的币吗？不会。它只是要求每个区块的 coinbase 交易必须精确支付其应支付的金额。它影响的是新发行量的记账，而不是现有余额。

从技术上看，什么定义了 NU6？NU6 由 ZIP 253 部署，它设定了主网在区块 2,726,400 的激活以及其 consensus branch id。实际的共识变更来自 ZIP 236、ZIP 1015 和 ZIP 2001，而 ZIP 207 和 ZIP 214 则经过更新以适配这些变更。

NU6 和 NU6.1 有什么不同？NU6 重组了资金机制并创建了锁箱。NU6.1 则决定了谁控制锁箱中的资金，以及这部分预留份额如何分配。

## 测试你的理解

NU6 设立了 Deferred Dev Fund Lockbox，但并没有说明由谁来控制它。为什么一次升级会创建一项储备，却故意把它的治理留到以后再定？

<details>
<summary>答案</summary>

创建这项储备，意味着一部分发行量会被锁定在协议内部，而不是支付给固定接收方。至于谁来控制这些资金，以及它们如何被释放，则是一个更复杂的治理问题。NU6 有意将这个问题留待后续解决，而 NU6.1 给出了答案：区块补贴中的 8% 继续流向 Zcash Community Grants，12% 则流向一个由持币者控制、并由该锁箱提供初始资金的基金。
</details>

### 资源

[ZIP 253：NU6 网络升级的部署](https://zips.z.cash/zip-0253)

[ZIP 236：区块应当精确平衡](https://zips.z.cash/zip-0236)

[ZIP 1015：用于非直接开发资金的区块补贴分配](https://zips.z.cash/zip-1015)

[ZIP 2001：Lockbox Funding Streams](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[开发基金](../start-here/development-fund)

[Zcash 货币政策](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[什么是 ZEC 和 Zcash](../start-here/what-is-zec-and-zcash)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[NU5](../zcash-tech/nu5) · 下一篇：[NU6.1](../zcash-tech/nu6-1)
