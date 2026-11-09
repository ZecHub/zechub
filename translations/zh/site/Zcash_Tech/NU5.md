<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 于 Zcash 主网的区块 1,687,104（2022 年 5 月 31 日 UTC）上线。

你将了解：NU5 如何为 Zcash 提供一个无需可信设置 [trusted setup] 的新屏蔽 [shielded] pool，以及一种可跨 pool 使用的统一地址。

NU5（网络升级 5）是第六次 Zcash [网络升级](../start-here/network-upgrades)，由 [ZIP 252](https://zips.z.cash/zip-0252) 部署。这是一次重大的密码学升级。它引入了 Orchard 屏蔽支付 [payment] 协议，该协议建立在 Halo 2 证明 [proof] 系统之上，并引入了统一地址和新版版本 5 交易 [transaction] 格式。NU5 随 Electric Coin Company 的 zcashd v5.0.0 版本发布。

这为何重要。屏蔽 pool 的可信度取决于创建它的设置。Zcash 的前两个屏蔽 pool，即 Sprout 和 Sapling，均需要一次性的可信设置仪式来生成其秘密参数。如果这些参数曾被保留而非销毁，某人便可能在无人察觉的情况下铸造假冒的 ZEC。NU5 的 Orchard pool 通过使用无需此类仪式的 Halo 2 证明系统，消除了这一担忧。

## 可信设置

Orchard 是由 NU5 引入的屏蔽协议，定义于 [ZIP 224](https://zips.z.cash/zip-0224)。它建立在 Halo 2 证明系统之上，该系统在 Pallas 和 Vesta 曲线循环中采用了一种称为 PLONKish 算术化的技术。实际收益很简单：Halo 2 不需要可信设置，也不需要结构化参考字符串，因此不存在可能被滥用的秘密参数。

Sprout 和 Sapling 都依赖可信设置。一群人通过仪式创建每个 pool 的参数，并且所有人都必须相信其中至少一人销毁了自己持有的秘密部分。Orchard 消除了这一假设。较早的 pool 在 NU5 后依然存在，因此无需设置的保证适用于你持有在 Orchard pool 中的资金。

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## NU5 改变了什么

NU5 将多项共识 [consensus] 变更打包在一起，全部于区块 1,687,104 同时激活。

1. 它添加了 Orchard 屏蔽池（ZIP 224），即上文所述基于 Halo 2 的协议。
2. 它添加了版本 5 交易格式（ZIP 225），这是一种重新组织的布局，为透明 [transparent]、Sapling 和新的 Orchard 数据设置了独立区域。Sprout 字段被移除，较早的版本 4 格式在激活后仍然有效。
3. 它引入了统一地址和统一 viewing key（ZIP 316），下一节将对此说明。
4. 它采用了交易标识符不可延展性（ZIP 244），这是一种计算交易 id 的新方式，将交易的行为与授权它的证明和签名 [signature] 分离。
5. 它采用了规范的 Jubjub 点编码（ZIP 216），以移除非标准编码，并收紧何为有效交易的规则。
6. 它启用了版本 5 交易在点对点网络中的转发（ZIP 239）。

NU5 还更新了若干现有 ZIP（32、203、209、212、213、221 和 401），使其能够涵盖新的 Orchard pool。

## 统一地址

在 NU5 之前，每个 pool 都有自己的地址 [address] 类型，发送方必须知道你想使用哪一种。统一地址定义于 [ZIP 316](https://zips.z.cash/zip-0316)，改变了这一点。单个统一地址可以捆绑多个 pool 的接收器，因此发送方的钱包 [wallet] 只需选择其支持的最佳接收器。

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

统一 viewing key 在查看方面的工作方式相同。它们可对一个地址涵盖的各个 pool 提供只读可见性。有关更多信息，请参阅 [Viewing Keys](../zcash-tech/viewing-keys) 页面。

## NU5 的位置

NU5 紧随 Zcash 先前的升级之后：Overwinter、Sapling、Blossom、Heartwood 和 Canopy。它于 2022 年 5 月 31 日在主网上激活。选择 Orchard 的曲线循环，是因为它支持递归，这是后续扩容 [scaling] 工作的基础。NU5 是 NU6 和 NU6.x 升级系列的直接前身；该系列建立在 Orchard pool 之上，随后又对其进行了修补。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Network upgrade (NU) | 对 Zcash 共识规则进行的协调变更，在指定区块高度激活 |
| Orchard | 由 NU5 引入、建立在 Halo 2 证明系统之上的屏蔽池 |
| Halo 2 | Orchard 背后的证明系统，无需可信设置 |
| Trusted setup | 创建 pool 秘密参数的一次性仪式，必须信任参与者会销毁这些参数 |
| Unified Address | 可捆绑多个 pool 接收器的单一地址（ZIP 316） |
| Consensus branch id | 标识一笔交易所属规则集的标识符 |

## 常见问题

NU5 会改变我的 ZEC 或我的隐私吗？不会。NU5 添加了一个新的屏蔽 pool 和一种新的地址格式。你现有的 ZEC 不受影响，你的隐私也不会降低。将资金转入 Orchard 可让你使用一个无需可信设置的 pool。

什么是 Orchard？Orchard 是由 NU5 引入的 Zcash 屏蔽协议。它运行于 Halo 2 证明系统之上，因此不需要可信设置仪式。

我必须做什么吗？不必。受支持的钱包会为你处理 NU5。你可以继续使用较早的地址，也可以在钱包提供时开始使用统一地址。

什么是统一地址？它是一个可容纳多个 pool 接收器的单一地址。发送方的钱包会选择其支持的 pool，因此你不必为每种类型提供不同的地址。

NU5 是否从我较早的资金中移除了可信设置？不会追溯移除。Orchard 不需要可信设置，但 Sapling pool 的较早参数在 NU5 后仍然存在。无需设置的保证适用于持有在 Orchard pool 中的资金。

旧交易格式是否停止工作？没有。NU5 添加了版本 5 格式，较早的版本 4 格式在激活后仍然有效。

## 测试你的理解

Sprout 和 Sapling 都需要可信设置仪式。NU5 的 Orchard pool 对此作出了什么改变，为什么这很重要？

<details>
<summary>答案</summary>

Orchard 建立在 Halo 2 证明系统之上，该系统不需要可信设置，也不需要结构化参考字符串。这消除了剩余秘密参数可能被用于伪造 ZEC 的风险。该保证适用于持有在 Orchard pool 中的资金。较早的 Sapling 参数在 NU5 后仍然存在。
</details>

### 资源

[ZIP 252：部署 NU5 网络升级](https://zips.z.cash/zip-0252)

[ZIP 224：Orchard 屏蔽协议](https://zips.z.cash/zip-0224)

[ZIP 225：版本 5 交易格式](https://zips.z.cash/zip-0225)

[ZIP 316：统一地址和统一 Viewing Keys](https://zips.z.cash/zip-0316)

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

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Canopy](../zcash-tech/canopy) · 下一篇：[NU6](../zcash-tech/nu6)
