<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash 于 2016 年 10 月 28 日推出，并启用了 Sprout 屏蔽池 [shielded pool]。

> **警告：** NU7 一旦激活，将使仍在 Sprout pool 中的 ZEC 无法花费（主网激活高度为 3,543,405，目标日期为 2026 年 11 月 5 日；参见 [ZIP 259](https://zips.z.cash/zip-0259)）。如果您持有 Sprout 资金，请阅读 [恢复资金](../using-zcash/recovering-funds)，并先迁移这些资金。

您将了解：Sprout 是 Zcash 的起点，也是私密、可验证的货币首次运行于活跃 blockchain 上的地方。

Sprout 是 Zcash 网络的最初发布，而不是后来的 [网络升级 network upgrade](../start-here/network-upgrades)。它于 2016 年 10 月 28 日在创世区块 [block] 时上线。没有编号的 ZIP 定义 Sprout：ZIP 流程在 Overwinter 之后才开始，因此 Sprout 由最初的 Zcash 协议规范及其所基于的 Zerocash 构造描述。由 Zooko Wilcox 领导的 [Electric Coin Company](../zcash-organizations/electric-coin-company)（当时是 Zerocoin Electric Coin Company）构建并发布了它。Sprout 引入了首批实用的 zk-SNARK 屏蔽交易 [transaction] 以及最初的屏蔽池，因此人们能够发送 ZEC，而发送方、接收方和金额均保持隐藏，同时网络仍会检查余额是否相加一致。这个名称象征着一条年轻、萌芽中的链 [chain]，团队预计它会不断成长。

这为何重要。在 Sprout 之前，每条公开 blockchain 都会展示您的支付 [payment]：任何人都能看到谁向谁支付了多少。Sprout 是首个活跃的、无需许可 [permissionless] 的网络，能够隐藏这些细节，同时仍能证明无人作弊。这对于普通的金融隐私 [privacy] 至关重要，也就是您期待从现金或他人无法读取的银行对账单中获得的那种隐私。它还证明了强大的链上 [on-chain] 隐私能够在实践中发挥作用，而不只是纸面设计。使之成为可能的可信设置 [trusted setup] Ceremony 成为了后续密码学工作的参考点，而 Sprout 所采用的缓慢、内存密集型证明 [proof] 系统，正是促使团队在两年后构建 Sapling 的原因。

## 首个屏蔽池

Sprout 创建了两类地址 [address]。透明 [transparent] 地址（t-address）与 Bitcoin 类似，其细节在公开账本上可见。屏蔽地址（z-address）将资金发送至 Sprout [屏蔽池](../using-zcash/shielded-pools)，其中发送方、接收方和金额均保持隐藏。关键在于 [zk-SNARKs](../zcash-tech/zk-snarks)，即零知识 [zero-knowledge] 证明：它们使一笔交易能够证明自身有效、没有双重花费且余额相加一致，而无需披露任何细节。Sprout 是这项技术首次在活跃加密货币的生产环境中运行。

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## Ceremony

zk-SNARKs 中的 Sprout 需要一组公开参数，而安全生成这些参数需要一次名为 Ceremony 的一次性设置。位于不同遥远地点的 6 名参与者各自生成了一份秘密材料，称为 toxic waste。如果有人重新组装了所有材料，他们就能凭空伪造 ZEC。该设计将这一风险转化为一条简单规则：只要至少有一名参与者销毁了自己的材料，完整秘密就永远无法重建，因此伪造便不可能发生。公开具名的参与者包括 Zooko Wilcox、Andrew Miller、Peter Van Valkenburgh、Peter Todd 以及 NCC Group 的 Derek Hinch。一名参与者选择保持匿名。

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## 起源

Sprout 是所有后续变更所依赖的基准。当网络升级机制随着 Overwinter 到来时，它将最初规则标记为共识 [consensus] 分支 id 0，这仅表示尚未应用任何升级。此后的所有内容（Overwinter、Sapling、Blossom、Heartwood、Canopy、NU5、NU6 及后续内容）都建立在由 Sprout 开启的链上。该发布于 2016 年 8 月宣布，并计划于 10 月 28 日创建创世区块；Ceremony 在此前数周进行，而创世区块的硬编码时间戳为 2016 年 10 月 28 日 07:56 UTC。

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## 术语表

| 术语 | 通俗含义 |
|---|---|
| zk-SNARK | 一种零知识证明，可证明交易有效，而无需披露发送方、接收方或金额 |
| Shielded pool | Zcash 中隐藏金额和参与方的私密部分。Sprout pool 是第一个 |
| z-address and t-address | z-address 是屏蔽的，并保持细节私密。t-address 是透明的，并在公开账本上显示细节 |
| The Ceremony | 2016 年的多方设置，生成了 Sprout 的公开参数，随后丢弃 toxic waste |
| Toxic waste | Ceremony 中的秘密密钥材料，必须销毁，以防 ZEC 被伪造 |
| Consensus branch id 0 | Sprout 规则的标签，表示任何网络升级之前的基准 |

## 常见问题

Sprout 会改变我如今的 ZEC 或隐私吗？不会。Sprout 是历史，是开启您的 ZEC 所在链的发布。您如今的币和隐私取决于您现在使用的钱包 [wallet] 和屏蔽池，而不是您需要针对 Sprout 采取的任何行动。

为什么 Sprout 没有 ZIP 编号？ZIP 流程是在 Overwinter 升级后才开始的。Sprout 是最初发布，由 Zcash 协议规范及其所基于的 Zerocash 构造描述。ZIP 200 只是事后将 Sprout 称为共识分支 id 0，即任何升级之前的基准。

我需要信任 Ceremony 中的 6 个人吗？该设置的构建方式使您只需其中 1 人诚实即可。每个人都持有一份秘密材料，只要任意一名参与者销毁自己的材料，完整秘密就永远无法重建，任何人也无法伪造 ZEC。5 名参与者已被公开具名，另 1 名保持匿名。

Sprout pool 是我的钱包现在使用的那个吗？可能不是。Sprout 是第一个屏蔽池，但后续升级如 Sapling 引入了更快的屏蔽设计，而大多数钱包如今使用较新的池。Sprout 仍然重要，因为它证明了私密、可验证的交易能够在活跃网络上运行。

Sprout 与 Bitcoin 有何不同？Bitcoin 将每笔支付置于公开账本上，金额和地址均可见。Sprout 增加了屏蔽交易，在仍让网络确认交易有效的同时隐藏发送方、接收方和金额。它也保留了透明地址，因此两种模式都存在于同一条链上。

## 测试您的理解

Sprout 常被称为具有激活高度的网络升级。为什么这并不完全正确？

<details>
<summary>答案</summary>

Sprout 是 Zcash 的最初发布，而不是后来的升级。它自 2016 年 10 月 28 日的创世区块（区块 0）起便已激活，因此没有可指向的激活高度。网络升级机制后来才出现，并将 Sprout 的规则标记为共识分支 id 0，即任何升级之前的基准。
</details>

### 资源

[ZIP 200：网络升级机制](https://zips.z.cash/zip-0200)

[Zcash 网络升级](https://z.cash/upgrade/)

[Electric Coin Company：Zcash Sprout 发布](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company：Ceremony 的设计](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### 另请参阅

[屏蔽池](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Zcash 网络升级](../start-here/network-upgrades)

[什么是 ZEC 和 Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

系列：[网络升级索引](../start-here/network-upgrades) · 下一篇：[Overwinter](../zcash-tech/overwinter)
