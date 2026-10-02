<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 是否具备后量子安全性？

## 简短回答

不，尚未具备。

自 Ironwood 升级以来，Zcash 对于存放在 Ironwood 池中的资金具备**量子可恢复性**。这是实质性的一步，但并不等同于具备后量子安全性。其背后的规范 ZIP 2005 直接说明：这一变更“本身并不能使协议免受量子对手的攻击”。它为 Ironwood 资金做好准备，使其能在当前密码学被停用后，通过未来的恢复协议迁移。

本页将区分 Zcash 当前保护的内容、Ironwood 改变的内容、仍然暴露的风险，以及仅处于提案阶段的内容。接近末尾的 [状态表](#status-table) 显示各项内容目前的状态，以及上次核查时间。

<br/>

## 适合哪些读者

- 曾见过“量子可恢复”并将其理解为“量子防护”的任何人
- 正在决定是否将资金转入 Ironwood 的持有人
- 需要有来源依据的答案以供他人参考的撰稿人和版主

有关量子计算本身的背景知识，请从 [Zcash 中的后量子安全性](/zcash-tech/post-quantum-security) 开始。

<br/>

## 为什么这个问题容易令人困惑

“后量子”常被当作单一属性使用。但对 Zcash 而言，它至少涉及四个不同的问题，答案也各不相同：

1. **隐私。** 量子攻击者能否看到谁向谁付款，以及金额是多少？
2. **花费。** 量子攻击者能否花费不属于他们的币？
3. **通胀。** 量子攻击者能否凭空创造 ZEC？
4. **恢复。** 如果必须停用当前密码学，诚实用户还能取回其资金吗？

Ironwood 仅改变第四个问题的答案，而且仅适用于 Ironwood 池中的票据。

这一切背后的威胁，是攻击者能够计算 Zcash 所使用椭圆曲线上的离散对数。运行 Shor 算法的足够大型量子计算机是实现这一点的一种方式。ZIP 2005 指出，只要找到**一个**离散对数，就足以造成任意通胀或盗取资金。

<br/>

## Zcash 当前提供的保护

此表描述当前运行中的协议在面对能够破解离散对数的攻击者时的情况。它适用于所有屏蔽池，包括 Ironwood，因为 Ironwood 使用与 Orchard 相同的 Orchard 电路、Halo 2 证明及 RedPallas 签名。

| 属性 | 当前面对量子攻击者时 | Ironwood 改变了什么 |
|---|---|---|
| 隐私 | 若攻击者不知道你的屏蔽地址，则隐私仍然成立。证明和重随机化签名不会额外泄露任何信息。若攻击者知道该地址，他们就能解密发送至该地址的票据，包括从链上保存的旧票据。 | 没有变化。ZIP 2005：“任何池在隐私方面的情况均未改变。” |
| 花费 | 不受保护。攻击者可伪造证明或花费签名，并从任何屏蔽池盗取资金，即使是他们从未见过的地址也不例外。 | 尚无变化。只有未来切换至恢复协议后，保护才会到来。 |
| 通胀 | 不受保护。攻击者可伪造看似有效的证明，并在任一屏蔽池内创建 ZEC，且可能无人察觉。唯一限制是 [闸门](/zcash-tech/the-turnstile)：任何池的支付额都不能超过其记录余额。 | 尚无变化。Ironwood 票据如今以量子攻击者应无法伪造的方式承诺其全部内容；这是未来恢复协议维持供应量健全性所需的条件。 |
| 恢复 | Sprout、Sapling 和 Orchard 票据没有恢复路径。一旦其协议被停用，任何留在其中的资金都将无法访问。 | 原则上，每一份 Ironwood 票据均可恢复。任何 Sapling 或 Orchard 票据均不可恢复。 |

透明 ZEC 属于另一种情况。一旦公钥已知，其 ECDSA 签名便可被伪造。对于普通透明地址，这会在你首次从该地址花费时发生；此外，交易在内存池中等待确认时也有一个短暂窗口。ZIP 2005 并未改变其中任何一点。

<br/>

## Ironwood 改变了什么

Ironwood 是 NU6.3 网络升级。它于 2026 年 7 月 28 日在主网区块 3,428,143 激活。其主要目的，是在 Orchard 健全性漏洞之后确保供应量完整性（参见 [Ironwood](/zcash-tech/ironwood) 页面）；ZIP 2005 的量子可恢复性也作为其一部分上线。

- **新的票据格式。** 每份 Ironwood 输出票据均使用量子可恢复格式（票据明文前导字节为 `0x03`）。票据的随机性现在从其所有字段派生，因此票据通过哈希而非仅靠椭圆曲线数学与其内容绑定。
- **仅适用于 Ironwood 票据的恢复路径。** ZIP 326 明确指出，每份 Ironwood 票据均可恢复，而没有任何 Orchard 票据可恢复。钱包设置无法改变这一点。
- **Orchard 不再接收新增价值。** Coinbase 奖励不能再流向 Orchard，且 Orchard 不能再发送至另一个 Orchard 地址，因此新增的屏蔽价值将进入 Ironwood。
- **钱包被要求迁移所有资金。** ZIP 2005 表示，钱包应在实际可行时尽快将其控制的全部资金，包括透明、Sprout 和 Sapling 资金，迁移至 Ironwood 票据；并在接收新资金时持续这样做。

Ironwood 未改变的内容包括：如今用于花费和生成证明的密码学、票据加密，以及与透明 ZEC 有关的一切。

<br/>

## 仍然存在的限制

**存在风险暴露窗口。** 从 Ironwood 激活到旧协议被停用期间，量子攻击者仍可能在每个屏蔽池中盗取、增发或阻断资金。ZIP 2005 将此称为“关键暴露期”，并警告在此期间的攻击仍可能损害持有人日后的恢复能力。因此，该规范指出，Zcash 必须在量子攻击变得可行**之前**停用 Orchard、Sapling 和 Sprout。

**停用没有日期。** 没有任何 ZIP 为停用 Orchard 或 Sapling 排定时间。作为 Draft 和 ZIP 候选方案的 NU7 2003，将通过禁止版本 4 交易来禁用 Sprout 花费。关于仅允许提取的 Sapling 讨论于 2026 年 4 月在论坛开始。

**恢复协议尚未完成。** ZIP 2005 仅概述了它，并表示细节“可能变更”。其任何部分均未部署。

**现在收集，日后解密。** Ironwood、Orchard、Sapling 和 Sprout 的票据密文均公开在链上。只要同时知道接收地址，任何人都可在今天保存它们并在未来解密。你公开或交给他人的每个地址都是此风险的一部分。ZIP 2005 表示，未来转账的“其他协议变更正在考虑中”。

**透明资金不在覆盖范围内。** 已经发生花费或被重复使用的地址，其公钥已暴露。部分透明地址的可恢复性目前仅是一个想法（ZIP 2007，见下文）。

**FROST 设置有额外注意事项。** 使用 FROST 时，每名参与者都持有量子花费密钥（`qsk`）；持有该密钥的量子攻击者可能能够盗取资金。ZIP 2005 建议，一旦具备阈值支持的完全后量子协议出现，就将 FROST 资金迁移至其中。

<br/>

## 提案与研究

以下均未上线。

- **恢复协议。** 该机制可使 Ironwood 资金在切换后真正得以花费。它在 ZIP 2005 中有所概述，但未被具体规定。
- **ZIP 2007：部分透明地址的可恢复性。** 仅有一个保留的 ZIP 编号，以及在 [zips#1302](https://github.com/zcash/zips/issues/1302) 中的讨论。其想法是，从未披露公钥的 P2PKH 和 P2SH 输出或可恢复，但其保障弱于 Ironwood。
- **已知地址的后量子隐私。** 自 2022 年起在 [zips#1133](https://github.com/zcash/zips/issues/1133) 中开放；该议题指出，在地址保持秘密时，Zcash“本就旨在具备后量子隐私”，并探讨如何将其扩展至已知地址，例如采用 Kyber（现为 ML-KEM）这类后量子密钥封装机制。2026 年 6 月，[zips#1307](https://github.com/zcash/zips/issues/1307) 提议以 ZIP 记录当前隐私属性及可能的修复方案。
- **Tachyon 项目。** 一项拟议的扩容升级。其网站表示，通过将付款交付移至链下并使用后量子密钥交换，它将作为副作用获得“完整的后量子隐私”。其证明携带数据库 Ragu 被描述为“仍在建设中”。参见 [Tachyon 项目](/zcash-tech/project-tachyon)。
- **完全后量子 Zcash。** 将后量子证明、签名和承诺结合在一起。自 2016 年起在 [zips#1134](https://github.com/zcash/zips/issues/1134) 中追踪。目前没有规范或时间表。

<br/>

## 状态表

最后核查于 2026 年 9 月 13 日。ZIP 的标题状态与其网络状态是不同的：ZIP 2005 的标题中仍写着“Proposed”，尽管其规则自 2026 年 7 月起已在主网上执行。

| 项目 | ZIP 状态 | 网络状态 | 日期 | 来源 |
|---|---|---|---|---|
| 具有量子可恢复票据的 Ironwood 池（NU6.3） | ZIP 2005 Proposed，ZIP 229 和 ZIP 258 Draft | **已在主网激活** | 2026 年 7 月 28 日，区块 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005)，[ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard 不再接收新增价值 | ZIP 2006 Reserved，规则位于 ZIP 258 | **已在主网激活** | 2026 年 7 月 28 日 | [ZIP 258](https://zips.z.cash/zip-0258) |
| 钱包将资金迁移至 Ironwood | ZIP 2005、ZIP 318 和 ZIP 326（Draft）中的指南 | 建议执行，取决于你的钱包 | 自 2026 年 7 月 28 日起 | [ZIP 318](https://zips.z.cash/zip-0318)，[ZIP 326](https://zips.z.cash/zip-0326) |
| 恢复协议 | 仅在 ZIP 2005 中概述 | **未实施** | 无日期 | [ZIP 2005](https://zips.z.cash/zip-2005) |
| 停用 Orchard 和 Sapling | 没有 ZIP | **未排期** | Sapling 讨论始于 2026 年 4 月 | [论坛](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| 禁用 Sprout 花费（ZIP 2003） | Draft，NU7 候选方案 | **未激活** | 无日期 | [ZIP 2003](https://zips.z.cash/zip-2003) |
| 透明可恢复性（ZIP 2007） | Reserved | **提案** | ZIP 于 2025 年 7 月 5 日保留，讨论于 2026 年 6 月 17 日开启 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| 已知地址的后量子隐私 | 开放议题，没有 ZIP | **研究** | #1133 于 2022 年 8 月 18 日开启，#1307 于 2026 年 6 月 23 日开启 | [zips#1133](https://github.com/zcash/zips/issues/1133)，[zips#1307](https://github.com/zcash/zips/issues/1307) |
| Tachyon 项目 | 没有 ZIP | **提案**，开发中 | 首次发布于 2025 年 4 月 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| 完全后量子协议 | 开放议题，没有 ZIP | **未来工作** | #1134 于 2016 年 3 月 28 日开启 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

在 Zcash Foundation 的 NU7 情绪民调（2026 年 2 月）中，量子可恢复性获得 ZCAP 的 90.5% 支持，以及持币者的 94.6% 支持；Tachyon 则获得近乎普遍的支持。这些是情绪民调，并非有关纳入 NU7 内容的决定。

<br/>

## 你现在可以做什么

- **将资金迁移至 Ironwood。** Sapling 和 Orchard 票据将永远不可恢复。池之间转移价值会在链上显示金额，因此 ZIP 318 让钱包将余额拆分为固定金额，并分时转移。让钱包执行此操作，而不是一次性转移全部资金。
- **不要公开不需要公开的屏蔽地址。** 面对未来量子攻击者的隐私取决于他们不知道你的地址。统一地址生成成本很低，因此请为每个付款人提供一个新地址。ZIP 229 因此建议轮换地址。
- **不要重复使用透明地址。** 一旦从其中一个地址花费，其公钥就会永久留在链上。
- **妥善保管助记词。** 在所概述的恢复协议中，恢复花费必须证明你知道自己的花费密钥，而普通钱包从助记词派生该密钥。
- **忽略“Zcash 已具备量子防护”之类的说法。** 它目前还不具备，规范编写者也明确如此表示。

<br/>

## 常见误解

- **“Ironwood 是后量子安全的。”** 不。它运行着相同的 Orchard 密码学，且 ZIP 2005 表示该功能“不会使 Orchard 协议免受量子攻击”。
- **“量子可恢复意味着如今已能抵御量子计算机。”** 不。它意味着只要未来切换及时发生，Ironwood 资金便可在切换后恢复。
- **“屏蔽 Zcash 已具备后量子隐私。”** 仅当攻击者不知道你的地址时如此。已知地址在每个池中都会暴露。
- **“Tachyon 已经加入后量子隐私。”** Tachyon 是一项提案。其中没有任何内容已上线。
- **“量子计算机会破解 Zcash 的每个部分。”** 已知量子攻击仅会削弱哈希函数，而不会将其破解。量子可恢复性正是依赖于这一差异。

<br/>

## 相关页面

- [Zcash 中的后量子安全性](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [闸门](/zcash-tech/the-turnstile)
- [Tachyon 项目](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [屏蔽池](/using-zcash/shielded-pools)

<br/>

## 来源

- [ZIP 2005：Ironwood 量子可恢复性](https://zips.z.cash/zip-2005)
- [ZIP 229：版本 6 交易格式](https://zips.z.cash/zip-0229)
- [ZIP 258：NU6.3 网络升级的部署](https://zips.z.cash/zip-0258)
- [ZIP 318：从 Orchard 到 Ironwood 的迁移](https://zips.z.cash/zip-0318)
- [ZIP 326：NU6.3 对钱包的影响](https://zips.z.cash/zip-0326)
- [ZIP 2003：禁止版本 4 交易](https://zips.z.cash/zip-2003)
- [ZIP 209：禁止负的屏蔽链价值池余额](https://zips.z.cash/zip-0209)
- [zips#1302：透明协议子集的量子可恢复性](https://github.com/zcash/zips/issues/1302)
- [zips#1133：Zcash 的后量子隐私](https://github.com/zcash/zips/issues/1133)
- [zips#1307：Zcash 面对量子及可破解离散对数对手时的隐私](https://github.com/zcash/zips/issues/1307)
- [zips#1134：完全后量子 Zcash](https://github.com/zcash/zips/issues/1134)
- [Tachyon 项目路线图](https://tachyon.z.cash/roadmap/)
- [NU7 民调结果：我们听到了什么，以及下一步去向](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Blockchair 上的区块 3,428,143](https://blockchair.com/zcash/block/3428143)
- [论坛请求：Zcash 是否具备后量子安全性？](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
