<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 于 2022 年 5 月 31 日（UTC）在 Zcash 主网区块高度 1,687,104 处上线。

你将了解到：NU5 如何为 Zcash 带来一个无需可信设置（trusted setup）的全新屏蔽（shielded）pool，以及一种可跨多个 pool 使用的单一地址（address）类型。

NU5（Network Upgrade 5）是第六次 Zcash [网络升级（network upgrade）](../start-here/network-upgrades)，通过 [ZIP 252](https://zips.z.cash/zip-0252) 部署。它是一次重大的密码学升级，引入了基于 Halo 2 证明（proof）系统的 Orchard 屏蔽支付（payment）协议，同时引入了统一地址以及新的第 5 版交易（transaction）格式。NU5 随 Electric Coin Company 的 zcashd v5.0.0 版本发布。

为什么这很重要。一个屏蔽池的可信程度，取决于创建它的设置过程。Zcash 最早的两个屏蔽池 Sprout 和 Sapling，都需要一次性的可信设置仪式来生成其秘密参数。如果这些参数曾被保留而非销毁，就可能有人在无人察觉的情况下凭空印出伪造的 ZEC。NU5 的 Orchard pool 采用 Halo 2 证明系统，无需此类仪式，从而消除了这一顾虑。

## 可信设置

Orchard 是 NU5 引入的屏蔽协议，定义于 [ZIP 224](https://zips.z.cash/zip-0224)。它基于 Halo 2 证明系统构建，该系统在 Pallas 和 Vesta 曲线循环上采用一种名为 PLONKish 算术化（PLONKish arithmetization）的技术。其实际好处很简单：Halo 2 不需要可信设置，也不需要结构化参考串（structured reference string），因此不存在任何可能被滥用的秘密参数。

Sprout 和 Sapling 都依赖可信设置。一群人通过举行仪式来构建每个 pool 的参数，所有人都必须相信其中至少有一人销毁了自己持有的那部分秘密。Orchard 消除了这一假设。NU5 之后旧的 pool 依然存在，因此"无需设置"的保证适用于你在 Orchard pool 中持有的资金。

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## NU5 带来了哪些变化

NU5 包含多项共识（consensus）变更，全部在区块（block）1,687,104 处同时激活。

1. 它新增了 Orchard 屏蔽池（ZIP 224），即上文所述的基于 Halo 2 的协议。
2. 它新增了第 5 版交易格式（ZIP 225），这是一种重新组织的结构，为透明（transparent）、Sapling 以及新的 Orchard 数据分别设置了独立区域。Sprout 字段被移除，而旧的第 4 版格式在激活后仍然有效。
3. 它引入了统一地址和统一 viewing key（ZIP 316），详见下一节。
4. 它采用了交易标识符不可延展性（ZIP 244），这是一种计算交易 id 的新方式，将交易所执行的操作与授权该交易的证明和签名（signature）区分开来。
5. 它采用了规范的 Jubjub 点编码（ZIP 216），以消除非标准编码，并收紧有效交易的判定规则。
6. 它启用了第 5 版交易在点对点网络中的中继（ZIP 239）。

NU5 还更新了若干现有 ZIP（32、203、209、212、213、221 和 401），使其兼容新的 Orchard pool。

## 统一地址

在 NU5 之前，每个 pool 都有各自的地址类型，发送方必须知道你想要哪一种。[ZIP 316](https://zips.z.cash/zip-0316) 中定义的统一地址改变了这一点。单个统一地址可以捆绑多个 pool 的接收器，发送方的钱包（wallet）只需从中选择它所支持的最佳接收器即可。

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

统一 viewing key 在查看方面的作用方式相同。它们提供对该地址所涵盖的各个 pool 的只读可见性。更多信息请参阅 [Viewing Keys](../zcash-tech/viewing-keys) 页面。

## NU5 的定位

NU5 继 Zcash 之前的各次升级之后推出：Overwinter、Sapling、Blossom、Heartwood 和 Canopy。它于 2022 年 5 月 31 日在主网激活。之所以选择 Orchard 的曲线循环，是因为它支持递归，这为后续的扩容（scaling）工作奠定了基础。NU5 是 NU6 和 NU6.x 系列升级的直接前身，这些升级建立在 Orchard pool 之上，并在之后对其进行了修补。

## 要点速览

- NU5 于 2022 年 5 月 31 日（UTC）在主网区块 1,687,104 处激活——这是 Zcash 自 Sapling 以来最大的一次密码学升级，通过 ZIP 252 部署。
- 它推出了 Orchard 屏蔽池，这是首个基于 Halo 2 构建的 Zcash pool——一个完全不需要可信设置的证明系统。
- 它推出了统一地址和统一 viewing key（ZIP 316）：一个地址字符串即可捆绑多个 pool 的接收器。
- 它将交易迁移至第 5 版格式（ZIP 225），并使交易 id 具备不可延展性（ZIP 244）。
- Orchard 运行在 Pallas/Vesta 曲线循环上，支持递归证明——为后续的扩容工作和 NU6.x 系列奠定了基础。

## 核心解释

可信设置问题：Sprout（2016）和 Sapling（2018）各自都需要一次性仪式来生成秘密参数，其安全性依赖于至少一名参与者销毁了自己的那一份。如果每位参与者都偷偷保留了副本，伪造 ZEC 就有可能发生。Orchard 彻底消除了这一假设：Halo 2 不使用可信设置，也不使用结构化参考串，因此不存在任何可能被滥用的秘密。

NU5 包含多项同时激活的共识变更：Orchard pool（ZIP 224）、第 5 版交易格式（ZIP 225）、统一地址（ZIP 316）、交易 id 不可延展性（ZIP 244）、规范的 Jubjub 点编码（ZIP 216），以及 v5 交易的点对点中继（ZIP 239）。它还更新了 ZIP 32、203、209、212、213、221 和 401，以兼容新的 pool。

## 形象类比

旧的 pool 就像保险箱，其密码是在一次性的集体仪式中生成的——你只能相信每位参与者都已销毁了自己手中的那份密码。Orchard 则是一只每次使用时都会自我验证的保险箱：没有仪式，没有主密钥，也就不存在任何可能被私藏的东西。统一地址就像一张列出了所有入口的名片——透明、Sapling、Orchard——访客可以选择自己真正能打开的那扇门。

## 深入解析

Halo 2 在 Pallas 和 Vesta 曲线循环上采用 PLONKish 算术化——这两条曲线彼此互补，正是这一点实现了递归：用证明来验证其他证明。这种递归是 Zcash 后续扩容工作的基础。v5 交易结构将透明、Sapling 和 Orchard 区域分开，并去除了 Sprout 字段；旧的第 4 版格式在激活后仍然有效。ZIP 244 根据交易所执行的操作来重新计算交易 id，而不是根据授权它的证明和签名，从而堵住了延展性攻击途径。

## 常见误区

- **认为 NU5 消除了所有 pool 的可信设置。** 只有 Orchard 无需仪式；Sapling 的参数依然存在，因此"无需设置"的保证仅适用于在 Orchard 中持有的资金。
- **以为旧地址或旧钱包已无法使用。** NU5 只是增加了选项；各 pool 专属的地址类型和 v4 交易格式依然有效。
- **混淆 Orchard 与 Halo 2。** Orchard 是屏蔽协议/pool；Halo 2 是它所运行的证明系统。
- **把统一地址当作唯一的地址类型。** 它是一种额外的格式，当你的钱包支持时即可采用。
- **认为 NU5 改变了发行量或现有的隐私。** 它新增了一个 pool 和若干格式；现有的 ZEC 及其隐私（privacy）均未受影响。


## 术语表

| 术语 | 通俗解释 |
|---|---|
| Network upgrade (NU) | 对 Zcash 共识规则的一次协调变更，在指定的区块高度激活 |
| Orchard | NU5 引入的屏蔽池，基于 Halo 2 证明系统构建 |
| Halo 2 | Orchard 背后的证明系统，无需可信设置 |
| Trusted setup | 一种生成 pool 秘密参数的一次性仪式，必须信任参与者会将参数销毁 |
| Unified Address | 可捆绑多个 pool 接收器的单一地址（ZIP 316） |
| Consensus branch id | 标识某笔交易所属规则集的标识符 |

## 常见问题

NU5 会改变我的 ZEC 或我的隐私吗？不会。NU5 新增了一个屏蔽池和一种新的地址格式。你现有的 ZEC 不受影响，隐私也不会降低。将资金转入 Orchard，即可使用一个无需可信设置的 pool。

什么是 Orchard？Orchard 是由 NU5 引入的 Zcash 屏蔽协议。它运行在 Halo 2 证明系统上，因此无需可信设置仪式。

我需要做什么吗？不需要。受支持的钱包会为你处理 NU5 相关事宜。你可以继续使用旧地址，也可以在钱包提供统一地址时开始使用它。

什么是统一地址？一个可以包含多个 pool 接收器的单一地址。发送方的钱包会选择它所支持的 pool，因此你无需为每种类型分别提供不同的地址。

NU5 会消除我旧资金的可信设置吗？不会追溯生效。Orchard 无需可信设置，但 NU5 之后 Sapling pool 的早期参数依然存在。"无需设置"的保证适用于在 Orchard pool 中持有的资金。

旧的交易格式还能用吗？能。NU5 新增了第 5 版格式，而旧的第 4 版格式在激活后仍然有效。

## 检验你的理解

Sprout 和 Sapling 都需要可信设置仪式。NU5 的 Orchard pool 在这方面带来了什么改变？为什么这很重要？

<details>
<summary>答案</summary>

Orchard 基于 Halo 2 证明系统构建，无需可信设置，也无需结构化参考串。这消除了残留的秘密参数被用来伪造 ZEC 的风险。这一保证适用于在 Orchard pool 中持有的资金。NU5 之后，旧的 Sapling 参数依然存在。
</details>

### 资源

[ZIP 252：NU5 网络升级的部署](https://zips.z.cash/zip-0252)

[ZIP 224：Orchard 屏蔽协议](https://zips.z.cash/zip-0224)

[ZIP 225：第 5 版交易格式](https://zips.z.cash/zip-0225)

[ZIP 316：统一地址与统一 Viewing Key](https://zips.z.cash/zip-0316)

[网络升级 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company：zcashd 5.0.0 版本发布](https://electriccoin.co/blog/new-release-5-0-0/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[屏蔽池](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## 相关页面

- [Halo](./Halo.md) —— Orchard 背后无需可信设置的证明系统
- [统一地址](./Unified_Addresses.md) —— 深入解析 ZIP 316 寻址
- [Sapling](./Sapling.md) —— 上一个屏蔽池，仍与其仪式绑定
- [NU6](./NU6.md) —— 下一次升级，基于 Orchard pool 构建
- [zk_SNARKS](./zk_SNARKS.md) —— 底层的零知识（zero-knowledge）技术


系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Canopy](../zcash-tech/canopy) · 下一篇：[NU6](../zcash-tech/nu6)
