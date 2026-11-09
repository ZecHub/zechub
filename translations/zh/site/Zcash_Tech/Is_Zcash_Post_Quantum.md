<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 是后量子的吗？

## 简短回答

不，还不是。

自 Ironwood 网络升级以来，Zcash 对于存放在 Ironwood pool 中的资金已具备**量子可恢复性（quantum-recoverable）**。这是实质性的一步，但这并不等同于后量子安全。其背后的规范 ZIP 2005 直接说明了这一点：该变更"本身并不能使协议免受量子对手的攻击"。它为 Ironwood 资金做好准备，以便在当前密码学被停用后，可通过未来的恢复协议（Recovery Protocol）转移这些资金。

本页区分 Zcash 当前保护的内容、Ironwood 改变的内容、仍然暴露的内容，以及尚仅为提案的内容。接近文末的 [状态表](#status-table) 显示每个部分的当前状态及最后核查时间。

<br/>

## 本页适合谁

- 任何看到"量子可恢复"便将其理解为"抗量子"的人
- 正在决定是否将资金转入 Ironwood 的持有者
- 需要有来源依据的答复以供他人参考的作者和版主

如需了解量子计算本身的背景，请从 [Zcash 中的后量子安全（Post-Quantum Security）](/zcash-tech/post-quantum-security) 开始。

<br/>

## 为什么这个问题容易令人困惑

"后量子"常被当作单一属性使用。但对于 Zcash，它至少涉及 4 个彼此独立的问题，而答案各不相同：

1. **隐私（Privacy）。** 量子攻击者能否看到谁向谁支付了多少？
2. **花费（Spending）。** 量子攻击者能否花费不属于他们的币？
3. **通胀（Inflation）。** 量子攻击者能否凭空创造 ZEC？
4. **恢复（Recovery）。** 如果必须停用当前密码学，诚实用户是否仍能取回其资金？

Ironwood 只改变了第 4 个问题的答案，而且仅针对 Ironwood pool 中的 note。

这一切背后的威胁是：攻击者能够计算 Zcash 所使用椭圆曲线上的离散对数。运行 Shor 算法的足够大型量子计算机将是实现这一能力的一种途径。ZIP 2005 指出，求得**单个**离散对数便足以造成任意通胀或盗取资金。

<br/>

## Zcash 当前保护什么

此表描述当前运行中的协议面对能够破解离散对数的攻击者时的状况。它适用于所有屏蔽池（shielded pools），包括 Ironwood，因为 Ironwood 使用与 Orchard 相同的 Orchard 电路、Halo 2 证明和 RedPallas 签名。

| 属性 | 当前面对量子攻击者 | Ironwood 改变了什么 |
|---|---|---|
| 隐私 | 若攻击者不知道你的屏蔽地址（shielded address），则仍可保持隐私。证明和重新随机化的签名不会额外泄露任何信息。若攻击者知道该地址，他们便可解密发送至该地址的 note，包括从链上保存下来的旧 note。 | 没有改变。ZIP 2005："对于任何 pool，隐私方面的情况没有变化。" |
| 花费 | 不受保护。攻击者可以伪造证明或花费签名，并从任意屏蔽池中盗取资金，即便是他们从未见过的地址。 | 暂无变化。保护仅会在未来切换至恢复协议后才会到来。 |
| 通胀 | 不受保护。攻击者可以伪造看似有效的证明，并在任意屏蔽池内创造 ZEC，可能无人察觉。唯一限制是 [turnstile](/zcash-tech/the-turnstile)：任何 pool 都不能支付超过其记录余额的金额。 | 暂无变化。Ironwood note 现在以量子攻击者应无法伪造的方式 commitment 于其全部内容，这正是未来恢复协议为保持供应量健全所需的条件。 |
| 恢复 | Sprout、Sapling 和 Orchard note 没有恢复路径。一旦其协议被停用，其中剩余的任何资金都将无法访问。 | 原则上每个 Ironwood note 都可恢复。没有任何 Sapling 或 Orchard note 可恢复。 |

透明 ZEC 是另一种情况。一旦公钥已知，其 ECDSA 签名便可被伪造。对于普通透明地址，这会在你首次从该地址花费时发生；当交易在内存池中等待确认时，也存在一个短暂窗口。ZIP 2005 不会改变其中任何一点。

<br/>

## Ironwood 改变了什么

Ironwood 是 NU6.3 网络升级。它于 2026 年 7 月 28 日在 Mainnet 的区块 3,428,143 激活。其主要目标是修复 Orchard 健全性漏洞后的供应完整性（请参阅 [Ironwood](/zcash-tech/ironwood) 页面），ZIP 2005 中的量子可恢复性也作为其一部分上线。

- **新的 note 格式。** 每个 Ironwood 输出 note 都使用量子可恢复格式（note 明文前导字节为 `0x03`）。note 的随机性现在从其全部字段派生，因此该 note 通过哈希而非仅通过椭圆曲线数学与其内容绑定。
- **仅适用于 Ironwood note 的恢复路径。** ZIP 326 明确指出，每个 Ironwood note 都可恢复，而没有任何 Orchard note 可恢复。钱包设置无法改变这一点。
- **Orchard 不再接收新增价值。** Coinbase 奖励不再能进入 Orchard，并且 Orchard 不再能向不同的 Orchard 地址发送，因此新增屏蔽价值将进入 Ironwood。
- **建议钱包迁移全部资金。** ZIP 2005 表示，钱包应在实际可行时尽快将其控制的全部资金，包括透明、Sprout 和 Sapling 资金，转入 Ironwood note，并在新资金到达时持续这样做。

Ironwood 未改变的内容包括：当前用于花费和生成证明的密码学、note 加密，以及透明 ZEC 的任何方面。

<br/>

## 仍然存在的限制

**存在暴露窗口。** 从 Ironwood 激活到旧协议被停用期间，量子攻击者仍可能在每个屏蔽池中盗窃、制造通胀或阻止资金使用。ZIP 2005 将此称为"关键暴露期（critical exposure period）"，并警告称，在该期间发生的攻击仍可能损害持有者日后的恢复能力。因此，它指出 Zcash 必须在量子攻击变得可行**之前**停用 Orchard、Sapling 和 Sprout。

**除 Sprout 外，停用尚无日期。** 没有任何 ZIP 安排停用 Orchard 或 Sapling。Sprout 则不同：[ZIP 259](https://zips.z.cash/zip-0259) 将 ZIP 2003 列为 NU7 部署的变更之一，因此一旦 NU7 激活，版本 4 交易将失效，且留在 Sprout pool 中的任何 ZEC 都将无法花费。Mainnet 激活设定为区块 3,543,405，目标日期为 2026 年 11 月 5 日（[ZIP 259](https://zips.z.cash/zip-0259)、[论坛公告](https://forum.zcashcommunity.com/t/nu7-timeline/57655)）。关于 Sapling 仅可提取的讨论于 2026 年 4 月在论坛上开始。

**恢复协议尚未完成。** ZIP 2005 仅概述了它，并表示细节"可能会变更"。其中没有任何内容已部署。

**现在收集，日后解密。** Ironwood、Orchard、Sapling 和 Sprout 的 note 密文都公开在链上。若某人也知道接收地址，他们可以今天保存这些密文，并在日后解密。你公开或交给他人的每个地址都是该风险的一部分。ZIP 2005 表示，未来转账的"其他协议变更正在考虑中"。

**透明资金不在覆盖范围内。** 已从中花费过或被重复使用的地址会暴露其公钥。某些透明地址的可恢复性目前还只是一种想法（ZIP 2007，见下文）。

**FROST 设置有额外注意事项。** 使用 FROST 时，每位参与者都持有量子花费密钥（`qsk`），持有该密钥的量子攻击者可能能够盗窃资金。ZIP 2005 建议，一旦存在支持阈值机制的完全后量子协议，便将 FROST 资金迁移至该协议。

<br/>

## 提案与研究

以下均未上线。

- **恢复协议。** 在切换后实际让 Ironwood 资金得以花费的机制。已在 ZIP 2005 中概述，但尚未指定。
- **ZIP 2007：某些透明地址的可恢复性。** 这仅是保留的 ZIP 编号，并在 [zips#1302](https://github.com/zcash/zips/issues/1302) 中讨论。其理念是：从未披露公钥的 P2PKH 和 P2SH 输出可能可恢复，但保证弱于 Ironwood。
- **已知地址的后量子隐私。** 自 2022 年起在 [zips#1133](https://github.com/zcash/zips/issues/1133) 中保持开放；该议题指出，Zcash 在地址保密时"原本就意图具备后量子隐私"，并探讨如何将此扩展到已知地址，例如使用像 Kyber（现为 ML-KEM）这样的后量子密钥封装方案。2026 年 6 月，[zips#1307](https://github.com/zcash/zips/issues/1307) 提议采用 ZIP 来记录当前的隐私属性及可能的修复方案。
- **Tachyon 项目。** 一项拟议的扩容升级。其网站称，它会通过将支付传递移至链下并使用后量子密钥交换，附带实现"完整的后量子隐私"。其携带证明的数据库 Ragu 被描述为"仍在建设中"。参见 [Tachyon 项目](/zcash-tech/project-tachyon)。
- **完全后量子的 Zcash。** 同时采用后量子证明、签名和 commitments。该工作在 [zips#1134](https://github.com/zcash/zips/issues/1134) 中跟踪，自 2016 年起处于开放状态。尚无规范或时间表。

<br/>

## 状态表

最后核查时间为 2026 年 9 月 13 日，但 Sprout 行更新于 2026 年 10 月 9 日。ZIP 的标题状态与其网络状态是不同概念：尽管其规则自 2026 年 7 月起已在 Mainnet 上强制执行，ZIP 2005 的标题中仍标记为"Proposed"。

| 项目 | ZIP 状态 | 网络状态 | 日期 | 来源 |
|---|---|---|---|---|
| 具有量子可恢复 note 的 Ironwood pool（NU6.3） | ZIP 2005 Proposed，ZIP 229 和 ZIP 258 Draft | **已在 Mainnet 激活** | 2026 年 7 月 28 日，区块 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005)、[ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard 不再接收新增价值 | ZIP 2006 Reserved，规则见 ZIP 258 | **已在 Mainnet 激活** | 2026 年 7 月 28 日 | [ZIP 258](https://zips.z.cash/zip-0258) |
| 钱包将资金迁入 Ironwood | ZIP 2005、ZIP 318 和 ZIP 326（Draft）中的指引 | 已建议，取决于你的钱包 | 自 2026 年 7 月 28 日起 | [ZIP 318](https://zips.z.cash/zip-0318)、[ZIP 326](https://zips.z.cash/zip-0326) |
| 恢复协议 | 仅在 ZIP 2005 内概述 | **未实施** | 无日期 | [ZIP 2005](https://zips.z.cash/zip-2005) |
| 停用 Orchard 和 Sapling | 无 ZIP | **未安排** | Sapling 讨论始于 2026 年 4 月 | [论坛](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| 禁止 Sprout 花费（ZIP 2003） | Proposed，根据 ZIP 259（Proposed）由 NU7 部署 | **未激活** | Mainnet 高度 3,543,405，目标为 2026 年 11 月 5 日 | [ZIP 2003](https://zips.z.cash/zip-2003)、[ZIP 259](https://zips.z.cash/zip-0259) |
| 透明可恢复性（ZIP 2007） | Reserved | **提案** | ZIP 于 2025 年 7 月 5 日保留，讨论于 2026 年 6 月 17 日开启 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| 已知地址的后量子隐私 | 开放议题，无 ZIP | **研究** | #1133 于 2022 年 8 月 18 日开启，#1307 于 2026 年 6 月 23 日开启 | [zips#1133](https://github.com/zcash/zips/issues/1133)、[zips#1307](https://github.com/zcash/zips/issues/1307) |
| Tachyon 项目 | 无 ZIP | **提案**，开发中 | 首次发布于 2025 年 4 月 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| 完全后量子协议 | 开放议题，无 ZIP | **未来工作** | #1134 于 2016 年 3 月 28 日开启 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

在 Zcash Foundation 的 NU7 情绪民调（2026 年 2 月）中，量子可恢复性获得了 ZCAP 90.5% 的支持和持币者 94.6% 的支持，Tachyon 获得了近乎普遍的支持。这些是情绪民调，而不是有关纳入 NU7 内容的决定。

<br/>

## 你现在可以做什么

- **将资金迁入 Ironwood。** Sapling 和 Orchard note 永远不可恢复。在 pool 之间转移价值会在链上显示金额，因此 ZIP 318 建议钱包将余额拆分为固定金额并随时间逐步转移。让钱包执行此操作，而不是一次性转移全部资金。
- **不要公开不需要公开的屏蔽地址。** 面对未来量子攻击者的隐私取决于他们不知道你的地址。统一地址生成成本很低，因此请为每个付款方提供一个新的地址。ZIP 229 因此建议轮换地址。
- **不要重复使用透明地址。** 一旦你从其中花费，其公钥便会永久留在链上。
- **妥善保管助记词（seed phrase）。** 按照所概述的恢复协议，恢复花费必须证明你知道自己的花费密钥，而普通钱包从助记词派生该密钥。
- **忽略"Zcash 抗量子"的说法。** 它目前还不是，编写规范的人也明确如此说明。

<br/>

## 常见误解

- **"Ironwood 是后量子的。"** 不。它运行相同的 Orchard 密码学，且 ZIP 2005 表示该功能"并不会使 Orchard 协议免受量子攻击"。
- **"量子可恢复意味着如今已安全抵御量子计算机。"** 不。它意味着只要未来切换及时发生，Ironwood 资金便可在切换后恢复。
- **"屏蔽 Zcash 已经具备后量子隐私。"** 只有攻击者不知道你的地址时才是如此。已知地址在每个 pool 中都会暴露。
- **"Tachyon 已经加入后量子隐私。"** Tachyon 是一项提案。其中没有任何内容已上线。
- **"量子计算机会破解 Zcash 的每一部分。"** 已知量子攻击只会削弱哈希函数，而非将其破解。量子可恢复性正依赖于这一差异。

<br/>

## 相关页面

- [Zcash 中的后量子安全](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [turnstile](/zcash-tech/the-turnstile)
- [Tachyon 项目](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [屏蔽池](/using-zcash/shielded-pools)

<br/>

## 来源

- [ZIP 2005：Ironwood量子可恢复性](https://zips.z.cash/zip-2005)
- [ZIP 229：版本 6 交易格式](https://zips.z.cash/zip-0229)
- [ZIP 258：部署 NU6.3 网络升级](https://zips.z.cash/zip-0258)
- [ZIP 318：从 Orchard 到 Ironwood 的迁移](https://zips.z.cash/zip-0318)
- [ZIP 326：NU6.3 对钱包的影响](https://zips.z.cash/zip-0326)
- [ZIP 2003：禁止版本 4 交易](https://zips.z.cash/zip-2003)
- [ZIP 209：禁止负屏蔽链价值 pool 余额](https://zips.z.cash/zip-0209)
- [zips#1302：透明协议子集的量子可恢复性](https://github.com/zcash/zips/issues/1302)
- [zips#1133：Zcash 的后量子隐私](https://github.com/zcash/zips/issues/1133)
- [zips#1307：Zcash 面对量子及可破解离散对数对手时的隐私](https://github.com/zcash/zips/issues/1307)
- [zips#1134：完全后量子的 Zcash](https://github.com/zcash/zips/issues/1134)
- [Tachyon 项目路线图](https://tachyon.z.cash/roadmap/)
- [NU7 民调结果：我们听到了什么，以及接下来怎么走](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [ZecBlock 上的区块 3,428,143](https://zecblock.com/block/3428143)
- [论坛请求：Zcash 是后量子的吗？](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
