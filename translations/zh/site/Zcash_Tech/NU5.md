<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# NU5

> NU5 于 Zcash 主网上的区块 1,687,104（2022 年 5 月 31 日 UTC）启用。

你将了解：NU5 如何为 Zcash 带来了一个无需可信设置的新屏蔽池，以及一种可跨池使用的统一地址类型。

NU5（网络升级 5）是第六次 Zcash [网络升级](../start-here/network-upgrades)，由 [ZIP 252](https://zips.z.cash/zip-0252) 部署。这是一次重大的密码学升级。它引入了 Orchard 屏蔽支付协议，该协议基于 Halo 2 证明系统构建，同时还引入了统一地址和新的第 5 版交易格式。NU5 随 Electric Coin Company 的 zcashd v5.0.0 版本一同发布。

这为何重要。屏蔽池的可信度取决于创建它的设置。Zcash 最初的两个屏蔽池 Sprout 和 Sapling，都需要一次性的可信设置仪式来生成其秘密参数。如果这些参数曾被保留而非销毁，就有人可能在无人察觉的情况下凭空制造假冒的 ZEC。NU5 的 Orchard 池通过使用无需此类仪式的 Halo 2 证明系统，消除了这一顾虑。

## 可信设置

Orchard 是由 NU5 引入的屏蔽协议，定义于 [ZIP 224](https://zips.z.cash/zip-0224)。它基于 Halo 2 证明系统，该系统在 Pallas 和 Vesta 曲线循环上采用一种称为 PLONKish 算术化的技术。实际收益很简单：Halo 2 不需要可信设置，也不需要结构化参考字符串，因此不存在可能被滥用的秘密参数。

Sprout 和 Sapling 都依赖可信设置。一群人举行仪式来生成每个池的参数，而且所有人都必须相信其中至少一人销毁了自己所持的那部分秘密。Orchard 消除了这一假设。较早的池在 NU5 之后仍然存在，因此无需设置的保证适用于你持有在 Orchard 池中的资金。

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## NU5 改变了什么

NU5 捆绑了多项共识变更，全部在区块 1,687,104 同时启用。

1. 它增加了 Orchard 屏蔽池（ZIP 224），即上文所述基于 Halo 2 的协议。
2. 它增加了第 5 版交易格式（ZIP 225），这是一种重新组织的布局，为透明数据、Sapling 数据和新的 Orchard 数据分别设置独立区域。Sprout 字段被移除，而较早的第 4 版格式在启用后仍然有效。
3. 它引入了统一地址和统一查看密钥（ZIP 316），将在下一节介绍。
4. 它采用了交易标识符不可延展性（ZIP 244），这是一种计算交易 id 的新方式，将交易的行为与授权该交易的证明和签名分离。
5. 它采用规范的 Jubjub 点编码（ZIP 216），以移除非标准编码，并收紧何为有效交易的规则。
6. 它启用了第 5 版交易在点对点网络中的中继（ZIP 239）。

NU5 还更新了若干现有 ZIP（32、203、209、212、213、221 和 401），使其涵盖新的 Orchard 池。

## 统一地址

在 NU5 之前，每个池都有自己的地址类型，发送方必须知道你想要哪一种。统一地址定义于 [ZIP 316](https://zips.z.cash/zip-0316)，改变了这一点。一个统一地址可以捆绑多个池的接收器，因此发送方的钱包只需选择它所支持的最佳接收器。

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

统一查看密钥在查看方面的工作方式相同。它们可对一个地址所覆盖的各池提供只读可见性。欲了解更多信息，请参阅 [查看密钥](../zcash-tech/viewing-keys) 页面。

## NU5 所处的位置

NU5 紧随 Zcash 先前的升级：Overwinter、Sapling、Blossom、Heartwood 和 Canopy。它于 2022 年 5 月 31 日在主网上启用。选择 Orchard 的曲线循环是因为它支持递归，这为后续扩容工作奠定了基础。NU5 是 NU6 和 NU6.x 升级系列的直接前身；这些升级建立在 Orchard 池之上，并在后来对其进行了修补。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Network upgrade (NU) | 对 Zcash 共识规则进行的协调性变更，在指定区块高度启用 |
| Orchard | 由 NU5 引入、基于 Halo 2 证明系统构建的屏蔽池 |
| Halo 2 | 支撑 Orchard 且无需可信设置的证明系统 |
| Trusted setup | 一次性仪式，用于生成池的秘密参数，并且必须信任参与者会将其销毁 |
| Unified Address | 可捆绑多个池接收器的单一地址（ZIP 316） |
| Consensus branch id | 标记交易属于哪一套规则的标识符 |

## 常见问题

NU5 会改变我的 ZEC 或隐私吗？不会。NU5 增加了一个新的屏蔽池和一种新的地址格式。你现有的 ZEC 不受影响，隐私也不会降低。将资金转入 Orchard 可让你使用一个无需可信设置的池。

什么是 Orchard？Orchard 是 Zcash 由 NU5 引入的屏蔽协议。它运行在 Halo 2 证明系统上，因此不需要可信设置仪式。

我必须做些什么吗？不用。受支持的钱包会为你处理 NU5。你可以继续使用旧地址，并可在钱包提供时开始使用统一地址。

什么是统一地址？它是一个可容纳多个池接收器的单一地址。发送方的钱包会选择其支持的池，因此你不必为每种类型提供不同的地址。

NU5 会从我较早的资金中移除可信设置吗？不会追溯移除。Orchard 无需可信设置，但 Sapling 池较早的参数在 NU5 后仍然存在。无需设置的保证适用于持有在 Orchard 池中的资金。

旧交易格式停止工作了吗？没有。NU5 增加了第 5 版格式，而较早的第 4 版格式在启用后仍然有效。

## 测试你的理解

Sprout 和 Sapling 都需要可信设置仪式。NU5 的 Orchard 池对此改变了什么，为什么这很重要？

<details>
<summary>答案</summary>

Orchard 基于 Halo 2 证明系统构建，该系统无需可信设置，也无需结构化参考字符串。这消除了遗留秘密参数可能被用于假冒 ZEC 的风险。这项保证适用于持有在 Orchard 池中的资金。较早的 Sapling 参数在 NU5 后仍然存在。
</details>

### 资源

[ZIP 252：部署 NU5 网络升级](https://zips.z.cash/zip-0252)

[ZIP 224：Orchard 屏蔽协议](https://zips.z.cash/zip-0224)

[ZIP 225：第 5 版交易格式](https://zips.z.cash/zip-0225)

[ZIP 316：统一地址和统一查看密钥](https://zips.z.cash/zip-0316)

[网络升级 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company：zcashd 5.0.0 版本](https://electriccoin.co/blog/new-release-5-0-0/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[屏蔽池](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[查看密钥](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Canopy](../zcash-tech/canopy) · 下一篇：[NU6](../zcash-tech/nu6)
