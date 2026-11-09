<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Canopy

> Canopy 于 Zcash 主网在区块 1,046,400（2020 年 11 月 18 日 UTC）上线。

你将了解：在创始人奖励（founders reward）结束后，Zcash 如何继续为自身开发提供资金，以及 Canopy 如何确立了后续升级仍在沿用的资金分配方案。

Canopy 是 Zcash 的第五次网络升级（network upgrade），也称为网络升级 4（NU4）。它由 [ZIP 251](https://zips.z.cash/zip-0251) 部署，并于 2020 年 11 月 18 日（UTC）在主网区块 1,046,400 激活；同一时刻也是 Zcash 首次区块奖励减半（halving）。Canopy 主要是一次治理（governance）和货币升级。它结束了原始创始人奖励，并启动新的 Zcash 开发基金（Development Fund），向 Electric Coin Company、Zcash Foundation 以及独立拨款接受者支付资金。该基金背后的政策源自 2019 年一项长期的社区治理流程。

这为何重要。Zcash 通过区块奖励为自身开发提供资金，因为它背后没有公司。用于支付其早期发展费用的创始人奖励原定于首次减半时结束。Canopy 是替代方案：它将每笔区块奖励中的固定份额分配至开发基金，并规定接收方。该模式在后续升级中不断完善，直至 [NU6.1](../zcash-tech/nu6-1)。

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## 开发基金

Canopy 结束了原始创始人奖励，并以 Zcash 开发基金取而代之。这项变更发生在 Zcash 首次减半的同一区块，当时区块奖励从 6.25 ZEC 降至 3.125 ZEC。因此，矿工（miner）在同一天看到其奖励减半，而这笔较小奖励中的新份额也开始流向开发。

该基金设定运行 4 年，从 2020 年 11 月的首次减半持续至 2024 年的第二次减半。商定的政策被写入 [ZIP 1014](https://zips.z.cash/zip-1014)。实际转移资金的共识（consensus）机制是资金流机制：[ZIP 207](https://zips.z.cash/zip-0207) 引入了将部分区块补贴定向分配给指定接收方的通用方法，而 [ZIP 214](https://zips.z.cash/zip-0214) 则为开发基金规定了具体规则和接收地址。

## 资金如何分配

开发基金取得每笔区块奖励的 20%。矿工保留其余 80%。随后，这 20% 按照 ZIP 1014 分为 3 份。

1. 35% 分配给 Bootstrap 项目，即 Electric Coin Company 的母组织。
2. 25% 分配给 Zcash Foundation。
3. 40% 分配给主要拨款（Major Grants），用于资助独立工作，并由 Zcash Foundation 管理。主要拨款后来成为 Zcash Community Grants（ZCG）。

若以整个区块奖励而非仅基金计算，这些份额分别为 Electric Coin Company 的 7%、Zcash Foundation 的 5%，以及主要拨款的 8%。两种描述方式的数值相同。

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Sprout pool 的变更

Canopy 也开始逐步淘汰最早的屏蔽（shielded）pool。Sprout 是 Zcash 的第一个屏蔽池，而 Canopy 通过 [ZIP 211](https://zips.z.cash/zip-0211) 开始逐步停用它。

自 Canopy 激活起，不能再向 Sprout pool 添加新价值。从技术角度说，每个 JoinSplit 的 vpub_old 字段必须为零。已经位于 Sprout 中的资金仍可提取，因此不会有人被锁在外面，但该 pool 从此只能缩小。这是最终弃用旧版 Sprout pool、转而使用较新屏蔽池的第一步。

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## 技术补充

除资金变更外，Canopy 还包含 2 项较小的技术 ZIP。[ZIP 212](https://zips.z.cash/zip-0212) 更改了接收方派生 Sapling 临时密钥的方式，改为从 note 明文派生。[ZIP 215](https://zips.z.cash/zip-0215) 制定了验证 Ed25519 签名（signature）的明确规则，因此每个节点（node）都能对哪些签名有效达成一致。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Founders reward | 为早期 Zcash 开发提供资金的原始模式，原定于首次减半时结束 |
| Development Fund | Canopy 分配给开发的每笔区块奖励中的 20% 份额，运行至第二次减半 |
| Block reward (subsidy) | 每当挖出一个区块时新创建并发放的 ZEC |
| Halving | 区块奖励减半的预定事件 |
| Funding stream | 将部分区块补贴定向分配至指定接收地址的共识机制（ZIP 207） |
| Sprout pool | Zcash 最初的屏蔽池，Canopy 已停止接受新价值进入其中 |

## 常见问题

Canopy 会改变我的 ZEC 或我的隐私吗？不会。Canopy 涉及开发资金的提供方式以及少量技术规则。你的余额和屏蔽交易不受影响。

Canopy 是否削减了区块奖励？Canopy 在与 Zcash 首次减半相同的区块激活，后者将奖励从 6.25 ZEC 降至 3.125 ZEC。减半是 Zcash 货币政策的一部分。Canopy 的职责是决定如何使用这笔较小奖励中的一部分。

开发基金的用途是什么？它为构建 Zcash 的人员提供资金。资金将流向 Electric Coin Company（通过 Bootstrap 项目）、Zcash Foundation 以及支持独立工作的主要拨款。

我还能使用 Sprout pool 中的资金吗？可以。你仍可提取已在 Sprout 中的资金。只是在 Canopy 之后，你不能再向其中添加新价值。

开发基金是永久的吗？不是。它设定运行 4 年，从 2020 年 11 月首次减半至 2024 年第二次减半，让社区有时间在重新审议前了解它的运作方式。

Canopy 与 NU6 和 NU6.1 有何关系？Canopy 确立了三方资金分配方案和资金流机制。包括 NU6 和 NU6.1 在内的后续升级，重新审议并重塑了建立在这一基础之上的开发基金。

## 测试你的理解

Canopy 恰好在与 Zcash 首次减半相同的区块激活。为何选择这一时机？若没有 Canopy，开发资金会怎样？

<details>
<summary>答案</summary>

原始创始人奖励原定于首次减半时结束。若没有 Canopy，减半后较小的全部区块奖励都会流向矿工，开发将不再获得协议层面的资金。Canopy 在该确切区块以开发基金取代了创始人奖励，因此资金提供没有中断。
</details>

### 资源

[ZIP 251：部署 Canopy 网络升级](https://zips.z.cash/zip-0251)

[ZIP 1014：为 ECC、ZF 和主要拨款设立开发基金](https://zips.z.cash/zip-1014)

[ZIP 207：资金流](https://zips.z.cash/zip-0207)

[ZIP 214：Zcash 开发基金的共识规则](https://zips.z.cash/zip-0214)

[ZIP 211：禁止向 Sprout 链价值池添加新价值](https://zips.z.cash/zip-0211)

[Canopy 网络升级](https://z.cash/upgrade/canopy/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[开发基金](../start-here/development-fund)

[Zcash 货币政策](../start-here/zcash-monetary-policy)

[屏蔽池](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash 治理](../zcash-community/zcash-governance)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Heartwood](../zcash-tech/heartwood) · 下一篇：[NU5](../zcash-tech/nu5)
