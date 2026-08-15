---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 于区块 1,687,104（协调世界时 2022 年 5 月 31 日）在 Zcash 主网上线。

你将了解到：NU5 如何为 Zcash 带来一个无需可信设置的新屏蔽池，以及一种可跨池使用的单一地址类型。

NU5（网络升级 5）是 Zcash 的第六次[网络升级](../start-here/network-upgrades)，由 [ZIP 252](https://zips.z.cash/zip-0252) 部署。这是一次重大的密码学升级。它引入了 Orchard 屏蔽支付协议，该协议建立在 Halo 2 证明系统之上，同时还带来了 Unified Address 和新的版本 5 交易格式。NU5 随 Electric Coin Company 发布的 zcashd v5.0.0 一同推出。

为什么这很重要。一个屏蔽池是否值得信任，取决于创建它的设置是否可靠。Zcash 的前两个屏蔽池 Sprout 和 Sapling，都各自需要一次性的可信设置仪式来生成其秘密参数。如果这些参数曾被保留而不是销毁，某人就可能在无人察觉的情况下伪造 ZEC。NU5 的 Orchard 池通过使用 Halo 2 证明系统消除了这一顾虑，因为它不需要这种仪式。

## 可信设置

Orchard 是 Zcash 最新的屏蔽协议，定义于 [ZIP 224](https://zips.z.cash/zip-0224)。它建立在 Halo 2 证明系统之上，该系统在 Pallas 和 Vesta 曲线循环上采用了一种称为 PLONKish 算术化的技术。实际上的好处很简单：Halo 2 不需要可信设置，也不需要结构化参考字符串，因此不存在任何可能被滥用的秘密参数。

Sprout 和 Sapling 都依赖可信设置。一组人通过仪式为每个池生成参数，而所有人都必须相信他们之中至少有一人销毁了自己持有的那部分秘密。Orchard 移除了这一假设。较旧的池在 NU5 之后仍然存在，因此“无需设置”的保证仅适用于你持有在 Orchard 池中的资金。

![在 NU5 之前，Sprout 和 Sapling 需要可信设置仪式。NU5 之后，Orchard 池使用 Halo 2 系统，不再需要可信设置](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## NU5 改变了什么

NU5 打包了多项共识变更，并在区块 1,687,104 一同激活。

1. 它添加了 Orchard 屏蔽池（ZIP 224），即上文所述基于 Halo 2 的协议。
2. 它添加了版本 5 交易格式（ZIP 225），这是一种重新组织后的布局，分别为透明、Sapling 和新的 Orchard 数据设置了独立区域。Sprout 字段被移除，而较旧的版本 4 格式在激活后仍然有效。
3. 它引入了 Unified Address 和统一 Viewing Key（ZIP 316），下一节将进行介绍。
4. 它采用了交易标识符不可延展性（ZIP 244），这是一种新的交易 id 计算方式，将交易执行的内容与授权它的证明和签名分离开来。
5. 它采用了规范化的 Jubjub 点编码（ZIP 216），以移除非标准编码，并更严格地界定什么才算有效交易。
6. 它启用了版本 5 交易在点对点网络中的中继（ZIP 239）。

NU5 还更新了若干现有的 ZIP（32、203、209、212、213、221 和 401），以使其将新的 Orchard 池纳入考虑。

## Unified Address

在 NU5 之前，每个池都有自己的地址类型，发送方必须知道你想要哪一种。定义于 [ZIP 316](https://zips.z.cash/zip-0316) 的 Unified Address 改变了这一点。一个 Unified Address 可以打包多个池的接收器，因此发送方的钱包只需选择它所支持的最佳接收器即可。

![一个 Unified Address 可打包多个池的接收器：透明接收器、Sapling 接收器以及新的 Orchard 接收器](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

统一 Viewing Key 在查看方面也是同样的工作方式。它为一个地址所覆盖的各个池提供只读可见性。欲了解更多内容，请参阅[Viewing Keys](../zcash-tech/viewing-keys)页面。

## NU5 的位置

NU5 紧随 Zcash 早期的升级之后：Overwinter、Sapling、Blossom、Heartwood 和 Canopy。它于 2022 年 5 月 31 日在主网上激活。之所以选择 Orchard 的曲线循环，是因为它支持递归，这为后续的扩容工作奠定了基础。NU5 是后续 NU6 和 NU6.x 升级系列的直接前身，后者基于 Orchard 池继续构建，并在之后对其进行了修补。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| 网络升级（NU） | 对 Zcash 共识规则进行的一次协调变更，在设定的区块高度激活 |
| Orchard | NU5 引入的屏蔽池，建立在 Halo 2 证明系统之上 |
| Halo 2 | Orchard 背后的证明系统，不需要可信设置 |
| 可信设置 | 一次性仪式，用于生成池的秘密参数，并且必须被信任会将其销毁 |
| Unified Address | 一种可打包多个池接收器的单一地址（ZIP 316） |
| 共识分支 id | 用于标识一笔交易属于哪一套规则的标识符 |

## 常见问题

NU5 会改变我的 ZEC 或我的隐私吗？不会。NU5 添加了一个新的屏蔽池和一种新的地址格式。你现有的 ZEC 不受影响，你的隐私也不会降低。将资金转入 Orchard，会让你使用一个无需可信设置的池。

什么是 Orchard？Orchard 是 Zcash 在 NU5 中引入的屏蔽协议。它运行在 Halo 2 证明系统之上，因此不需要可信设置仪式。

我需要做什么吗？不需要。受支持的钱包会为你处理 NU5。你可以继续使用旧地址，也可以在钱包提供 Unified Address 后开始使用它们。

什么是 Unified Address？它是一种可容纳多个池接收器的单一地址。发送方的钱包会选择它所支持的池，因此你不必为每种类型分别提供不同地址。

NU5 是否移除了我旧资金中的可信设置？不能追溯移除。Orchard 不需要可信设置，但 Sapling 池较早生成的参数在 NU5 之后仍然存在。无需设置的保证适用于存放在 Orchard 池中的资金。

旧交易格式是否停止工作了？没有。NU5 添加了版本 5 格式，而较旧的版本 4 格式在激活后仍然有效。

## 测试你的理解

Sprout 和 Sapling 都需要可信设置仪式。NU5 的 Orchard 池在这方面改变了什么，这为什么重要？

<details>
<summary>答案</summary>

Orchard 建立在 Halo 2 证明系统之上，而该系统不需要可信设置，也不需要结构化参考字符串。这消除了残留秘密参数被用于伪造 ZEC 的风险。这个保证适用于存放在 Orchard 池中的资金。较旧的 Sapling 参数在 NU5 之后仍然存在。
</details>

### 资源

[ZIP 252：NU5 网络升级的部署](https://zips.z.cash/zip-0252)

[ZIP 224：Orchard 屏蔽协议](https://zips.z.cash/zip-0224)

[ZIP 225：版本 5 交易格式](https://zips.z.cash/zip-0225)

[ZIP 316：Unified Address 与统一 Viewing Key](https://zips.z.cash/zip-0316)

[网络升级 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company：zcashd 5.0.0 发布](https://electriccoin.co/blog/new-release-5-0-0/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[屏蔽池](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Canopy](../zcash-tech/canopy) · 下一篇：[NU6](../zcash-tech/nu6)
