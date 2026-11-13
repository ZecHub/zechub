<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy 于区块（block）高度 1,046,400（2020 年 11 月 18 日 UTC）在 Zcash 主网上线。

你将了解到：在创始人奖励（founders reward）结束后，Zcash 如何继续为自身的开发提供资金，以及 Canopy 如何建立起后续升级至今仍沿用的资金分配方案。

Canopy 是 Zcash 的第五次网络升级（network upgrade），也被称为 Network Upgrade 4（NU4）。它通过 [ZIP 251](https://zips.z.cash/zip-0251) 部署，并于 2020 年 11 月 18 日（UTC）在主网区块 1,046,400 激活，与 Zcash 首次区块奖励减半（halving）发生在同一时刻。Canopy 主要是一次治理（governance）和货币层面的升级。它终结了最初的创始人奖励，并启动了新的 Zcash 开发基金（Development Fund），向 Electric Coin Company、Zcash Foundation 以及独立的拨款（grant）接收者支付资金。该基金背后的政策源自 2019 年一场漫长的社区治理过程。

为什么这很重要。Zcash 通过区块奖励为自身的开发提供资金，因为它背后没有公司支撑。为其早期阶段提供资金的创始人奖励原定在首次减半时结束。Canopy 就是替代方案：它将每个区块奖励中的固定份额划入开发基金，并规定了由谁接收。这一模式在后续升级中不断完善，直至 [NU6.1](../zcash-tech/nu6-1)。

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## 开发基金

Canopy 终结了最初的创始人奖励，并以 Zcash 开发基金取而代之。这一变更与 Zcash 的首次减半落在同一个区块上，当时区块奖励从 6.25 ZEC 降至 3.125 ZEC。因此，矿工（miner）在奖励减半的同一天，看到这笔更小的奖励中有一部分开始流向开发工作。

该基金设定运行四年，从 2020 年 11 月的首次减半持续到 2024 年的第二次减半。商定的政策被写成 [ZIP 1014](https://zips.z.cash/zip-1014)。实际转移资金的共识（consensus）机制是资金流（funding stream）机制：[ZIP 207](https://zips.z.cash/zip-0207) 引入了将部分区块补贴导向指定接收者的通用方法，而 [ZIP 214](https://zips.z.cash/zip-0214) 则为开发基金设定了具体规则和接收地址（address）。

## 资金如何分配

开发基金获得每个区块奖励的 20%。矿工保留其余 80%。随后这 20% 按照 ZIP 1014 再分为三份。

1. 35% 分配给 Bootstrap Project，即 Electric Coin Company 的母组织。
2. 25% 分配给 Zcash Foundation。
3. 40% 分配给重大资助（Major Grants），用于资助独立工作，由 Zcash Foundation 管理。重大资助后来成为 Zcash Community Grants（ZCG）。

如果以整个区块奖励而非仅以基金来衡量，这些份额分别为：Electric Coin Company 占 7%，Zcash Foundation 占 5%，重大资助占 8%。两种描述方式指的是相同的数字。

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Sprout pool 的变更

Canopy 还开始逐步淘汰最古老的屏蔽（shielded）池。Sprout 是 Zcash 的第一个屏蔽池，Canopy 通过 [ZIP 211](https://zips.z.cash/zip-0211) 开始将其逐步关闭。

从 Canopy 激活那一刻起，任何新的价值都无法再加入 Sprout pool。用技术术语来说，每个 JoinSplit 的 vpub_old 字段都必须为零。已存放在 Sprout 中的资金仍可提取，因此没有人会被锁定，但该 pool 从此只会缩小。这是最终弃用旧版 Sprout pool、转向更新的屏蔽池的第一步。

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## 技术附加内容

除资金方面的变更外，Canopy 还包含两项较小的技术性 ZIP。[ZIP 212](https://zips.z.cash/zip-0212) 改变了接收者推导 Sapling 临时密钥的方式，改为从 note 明文中推导。[ZIP 215](https://zips.z.cash/zip-0215) 明确写下了验证 Ed25519 签名（signature）的规则，使每个节点（node）对哪些签名有效达成完全一致。

## TL;DR

- Canopy（NU4）于主网区块 1,046,400（2020 年 11 月 18 日 UTC）激活——与 Zcash 首次减半为同一个区块，该次减半将区块奖励从 6.25 降至 3.125 ZEC。
- 它终结了创始人奖励，并创建了 Zcash 开发基金：在四年内获得每个区块奖励的 20%，直至 2024 年第二次减半（ZIP 1014 为政策；ZIP 207/214 为机制）。
- 基金的 20% 按如下比例分配：35% 给 Bootstrap（Electric Coin Company），25% 给 Zcash Foundation，40% 给重大资助——后来称为 Zcash Community Grants。
- 它关闭了 Sprout pool 的新价值流入（ZIP 211）：新的存入无法进入，但提取仍然有效。
- 另有两项技术性 ZIP 随之上线：ZIP 212（Sapling 临时密钥从 note 明文推导）和 ZIP 215（明确的 Ed25519 验证规则）。

## 核心解释

Zcash 通过区块奖励为自身开发提供资金，因为它背后没有任何公司。创始人奖励覆盖了早期阶段，并计划在首次减半时结束，因此必须在截止前准备好替代方案。Canopy 就是这个替代方案：ZIP 207 引入了通用的资金流机制，将部分区块补贴导向指定的接收地址，而 ZIP 214 为开发基金设定了具体规则和地址。如果以整个奖励而非仅以基金来衡量，份额为 ECC 7%、Zcash Foundation 5%、重大资助 8%——同样的数字，两种描述方式。

Canopy 还开始逐步淘汰 Sprout，即 Zcash 最古老的屏蔽池：自激活起，每个 JoinSplit 的 vpub_old 字段都必须为零，因此价值可以离开 Sprout，但永远无法再进入。

## 形象类比

Canopy 就像一家初创公司的创始人薪酬阶段结束、由一部章程接管的时刻：从那个区块开始，网络每铸造 1 美元，就有 20 美分被指定用于维护，并按 35/25/40 的比例分给三个部门。与此同时，旧仓库（Sprout）被封存，不再接收新的存储——任何人仍可取走自己的货物，但不再有新东西放进去。

## 深入探讨

资金流由共识强制执行，而非依赖信任：如果某个区块的 coinbase 没有按规定份额向指定接收者付款，节点就会拒绝该区块。Canopy 特意落在减半区块上，因此矿工看到奖励减半的同时，这笔更小奖励中的新份额也开始流向开发工作。ZIP 212 改变了 Sapling 临时密钥的推导方式（从 note 明文推导），ZIP 215 则写下了明确的 Ed25519 接受规则，使每个节点以完全相同的方式验证签名——这些小改动消除了整类共识歧义。

## 常见误区

- **认为 Canopy 就是减半本身。** 二者共用一个激活区块，但它们是不同的变更：ZIP 251（Canopy）与发行计划是两回事。
- **把 20% 理解为从矿工的新份额中扣除。** 矿工保留 80%；基金获得的是区块奖励的 20%。
- **以为 Sprout 中的资金被冻结或销毁。** 提取仍然可行——只是停止了新的存入。
- **把"基金的 35/25/40"和"奖励的 7/5/8"当作不同的分配方案。** 它们是以不同基数衡量的相同数字。
- **称 Canopy 为一次密码学升级。** 它主要涉及治理和货币政策；技术性 ZIP 只是次要调整。


## 术语表

| 术语 | 通俗解释 |
|---|---|
| Founders reward | 为 Zcash 早期开发提供资金的最初资助模式，计划在首次减半时结束 |
| Development Fund | Canopy 将每个区块奖励中 20% 划给开发工作的份额，持续至第二次减半 |
| Block reward (subsidy) | 每挖出一个区块时新创建并支付的 ZEC |
| Halving | 按计划将区块奖励削减一半的事件 |
| Funding stream | 将部分区块补贴导向指定接收地址的共识机制（ZIP 207） |
| Sprout pool | Zcash 最初的屏蔽池，Canopy 使其不再接受新的价值流入 |

## 常见问题

Canopy 会改变我的 ZEC 或我的隐私（privacy）吗？不会。Canopy 关注的是开发资金的来源方式，外加一些技术规则。你的余额和屏蔽交易（transaction）都不受影响。

Canopy 削减了区块奖励吗？Canopy 与 Zcash 的首次减半在同一个区块激活，该次减半将奖励从 6.25 ZEC 降至 3.125 ZEC。减半是 Zcash 货币政策的一部分。Canopy 的任务是决定如何使用这笔更小奖励中的一部分。

开发基金的用途是什么？它为构建 Zcash 的人们提供资金。资金流向 Electric Coin Company（通过 Bootstrap Project）、Zcash Foundation 以及支持独立工作的重大资助。

我还能使用 Sprout pool 中的资金吗？可以。你仍然可以提取已存放在 Sprout 中的资金。只是在 Canopy 之后无法再向其中加入新的价值。

开发基金是永久性的吗？不是。它设定运行四年，从 2020 年 11 月的首次减半持续到 2024 年的第二次减半，让社区有时间观察其运作效果，然后再重新审议。

Canopy 与 NU6 和 NU6.1 有什么关系？Canopy 建立了三方资金分配和资金流机制。后续的升级，包括 NU6 和 NU6.1，在此基础上重新审视并重塑了开发基金。

## 检验你的理解

Canopy 与 Zcash 首次减半恰好在同一个区块激活。为什么选择这个时机？如果没有 Canopy，开发资金会怎样？

<details>
<summary>答案</summary>

最初的创始人奖励计划在首次减半时结束。如果没有 Canopy，减半后更小的区块奖励将全部归矿工所有，协议层面将不再有任何开发资金。Canopy 恰好在那个区块用开发基金取代了创始人奖励，因此资金得以无缝延续。
</details>

### 资源

[ZIP 251：Canopy 网络升级的部署](https://zips.z.cash/zip-0251)

[ZIP 1014：为 ECC、ZF 和重大资助设立开发基金](https://zips.z.cash/zip-1014)

[ZIP 207：资金流](https://zips.z.cash/zip-0207)

[ZIP 214：Zcash 开发基金的共识规则](https://zips.z.cash/zip-0214)

[ZIP 211：禁止向 Sprout 链（chain）价值池加入新价值](https://zips.z.cash/zip-0211)

[Canopy 网络升级](https://z.cash/upgrade/canopy/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[开发基金](../start-here/development-fund)

[Zcash 货币政策](../start-here/zcash-monetary-policy)

[屏蔽池](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash 治理](../zcash-community/zcash-governance)

---

## 相关页面

- [Sprout](./Sprout.md) — Canopy 关闭新存入的 pool
- [Heartwood](./Heartwood.md) — 该系列中的上一次升级
- [NU5](./NU5.md) — 下一次升级，推出了 Orchard
- [NU6.1](./NU6_1.md) — 开发资金最近一次的完善


系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Heartwood](../zcash-tech/heartwood) · 下一篇：[NU5](../zcash-tech/nu5)
