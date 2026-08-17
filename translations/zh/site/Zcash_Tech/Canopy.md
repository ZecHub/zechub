<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Canopy

> Canopy 于 2020 年 11 月 18 日（UTC）在 Zcash 主网上的区块 1,046,400 正式激活。

你将了解：在创始人奖励结束后，Zcash 如何继续为自身开发提供资金，以及 Canopy 如何建立起后来升级仍在沿用的资金分配框架。

Canopy 是 Zcash 的第五次网络升级，也称为 Network Upgrade 4（NU4）。它由 [ZIP 251](https://zips.z.cash/zip-0251) 部署，并于 2020 年 11 月 18 日（UTC）在主网区块 1,046,400 激活，恰好与 Zcash 首次区块奖励减半同时发生。Canopy 主要是一项治理和货币政策升级。它结束了最初的创始人奖励，并启动了新的 Zcash Development Fund，用于向 Electric Coin Company、Zcash Foundation 以及独立资助获得者提供资金。该基金背后的政策源自 2019 年一场长期的社区治理过程。

这为什么重要。Zcash 通过区块奖励为自身开发提供资金，因为它背后没有公司支持。为其早期发展提供资金的创始人奖励原定在第一次减半时结束。Canopy 就是它的替代方案：它将每笔区块奖励中的固定份额导入 Development Fund，并规定由谁接收这些资金。这个模式后来又在后续升级中不断完善，一直到 [NU6.1](../zcash-tech/nu6-1)。

![在 Canopy 之前，创始人奖励为开发提供资金，并计划在第一次减半时结束。Canopy 之后，Development Fund 提取每笔区块奖励的 20%，并持续到 2024 年第二次减半](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## Development Fund

Canopy 结束了最初的创始人奖励，并以 Zcash Development Fund 取而代之。这一变化发生在 Zcash 首次减半的同一个区块，当时区块奖励从 6.25 ZEC 降至 3.125 ZEC。因此，矿工在同一天看到自己的奖励减半，同时这笔更小奖励中的一个新份额开始流向开发。

该基金设定运行四年，从 2020 年 11 月这次首次减半开始，到 2024 年第二次减半结束。相关共识政策写入了 [ZIP 1014](https://zips.z.cash/zip-1014)。而真正负责把资金转移出去的共识机制，是 funding stream 机制：[ZIP 207](https://zips.z.cash/zip-0207) 引入了将部分区块补贴定向给指定接收方的一般方法，[ZIP 214](https://zips.z.cash/zip-0214) 则设定了 Development Fund 的具体规则和接收地址。

## 资金如何分配

Development Fund 提取每笔区块奖励的 20%。矿工保留其余 80%。这 20% 再按照 ZIP 1014 分成三部分。

1. 35% 分配给 Bootstrap Project，也就是 Electric Coin Company 的母组织。
2. 25% 分配给 Zcash Foundation。
3. 40% 分配给 Major Grants，用于资助独立工作，并由 Zcash Foundation 管理。Major Grants 后来更名为 Zcash Community Grants（ZCG）。

如果按整个区块奖励而不仅仅是基金本身来计算，那么这些份额分别相当于：Electric Coin Company 占 7%，Zcash Foundation 占 5%，Major Grants 占 8%。这两种表述说的是同一组数字。

![Development Fund 占每笔区块奖励的 20%，其中 35% 分给 Bootstrap 和 Electric Coin Company，25% 分给 Zcash Foundation，40% 分给 Major Grants](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Sprout 资金池的变化

Canopy 还开始让最早的屏蔽资金池逐步退出。Sprout 是 Zcash 的第一个屏蔽资金池，Canopy 通过 [ZIP 211](https://zips.z.cash/zip-0211) 开始逐步将其淘汰。

从 Canopy 激活那一刻起，任何新价值都不能再加入 Sprout 资金池。用技术术语来说，就是每个 JoinSplit 的 `vpub_old` 字段都必须为零。已经在 Sprout 中的资金仍然可以提取，因此不会有人因此失去访问权，但从现在起这个资金池只能继续缩小。这是最终弃用旧版 Sprout 资金池、转而使用更新屏蔽资金池的第一步。

![在 Canopy 之前，价值既可以进入也可以离开 Sprout 资金池。Canopy 之后，不再允许新价值进入，但仍然允许提取](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## 技术补充内容

除了资金方面的变更外，Canopy 还包含两个较小的技术类 ZIP。[ZIP 212](https://zips.z.cash/zip-0212) 修改了接收方派生 Sapling 临时秘密的方式，改为从 note 明文派生。[ZIP 215](https://zips.z.cash/zip-0215) 明确写下了验证 Ed25519 签名的规则，从而确保每个节点都能对哪些签名算作有效达成完全一致。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Founders reward | 最初的资金模式，用于支付 Zcash 早期开发费用，原定在第一次减半时结束 |
| Development Fund | Canopy 导向开发用途的每笔区块奖励中 20% 的份额，持续到第二次减半 |
| Block reward (subsidy) | 每开采出一个区块时新创建并发放的 ZEC |
| Halving | 区块奖励按计划减半的事件 |
| Funding stream | 将部分区块补贴定向给指定接收地址的共识机制（ZIP 207） |
| Sprout pool | Zcash 最初的屏蔽资金池，Canopy 之后不再接受新的价值流入 |

## 常见问题

Canopy 会改变我的 ZEC 或隐私吗？不会。Canopy 关注的是开发资金如何筹集，以及一些技术规则。你的余额和屏蔽交易都不会受到影响。

Canopy 削减了区块奖励吗？Canopy 与 Zcash 的第一次减半在同一个区块激活，后者将奖励从 6.25 ZEC 降至 3.125 ZEC。减半属于 Zcash 货币政策的一部分。Canopy 的任务是决定这笔缩小后奖励中的一部分该如何使用。

Development Fund 是做什么的？它为建设 Zcash 的人提供资金。资金流向 Electric Coin Company（通过 Bootstrap Project）、Zcash Foundation，以及支持独立工作的 Major Grants。

我还能使用 Sprout 资金池中的资金吗？可以。你仍然可以提取已经在 Sprout 中的资金。只是从 Canopy 之后，你不能再向其中添加新的价值。

Development Fund 是永久的吗？不是。它被设定运行四年，从 2020 年 11 月的第一次减半开始，到 2024 年第二次减半结束，让社区有时间观察其运作方式，然后再决定是否调整。

Canopy 与 NU6 和 NU6.1 有什么关系？Canopy 建立了三方资金分配方案以及 funding stream 机制。后续升级，包括 NU6 和 NU6.1，都在这一基础上重新审视并重塑了 Development Fund。

## 测试你的理解

Canopy 与 Zcash 第一次减半在完全相同的区块激活。为什么会选择这个时机？如果没有 Canopy，开发资金会发生什么？

<details>
<summary>答案</summary>

最初的创始人奖励原定在第一次减半时结束。如果没有 Canopy，减半后更少的全部区块奖励都会流向矿工，从而不再有协议层面的开发资金。Canopy 在那个精确的区块用 Development Fund 取代了创始人奖励，因此资金支持得以无缝延续。
</details>

### 资源

[ZIP 251：Canopy 网络升级的部署](https://zips.z.cash/zip-0251)

[ZIP 1014：为 ECC、ZF 和 Major Grants 设立 Dev Fund](https://zips.z.cash/zip-1014)

[ZIP 207：Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214：Zcash Development Fund 的共识规则](https://zips.z.cash/zip-0214)

[ZIP 211：禁止向 Sprout Chain Value Pool 添加新价值](https://zips.z.cash/zip-0211)

[Canopy 网络升级](https://z.cash/upgrade/canopy/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Zcash 货币政策](../start-here/zcash-monetary-policy)

[屏蔽资金池](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash 治理](../zcash-community/zcash-governance)

---

系列：[Network Upgrades 索引](../start-here/network-upgrades) · 上一篇：[Heartwood](../zcash-tech/heartwood) · 下一篇：[NU5](../zcash-tech/nu5)
