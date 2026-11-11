<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zcash 价值池 [Value Pools]

## TL;DR

- Zcash 目前有 **5 个价值池**：Sprout（旧版）、Sapling、Orchard（仅可支出）、Ironwood以及透明池。
- **Ironwood** 是当前主要的屏蔽 [shielded] pool，自 2026 年 7 月 28 日 NU6.3 升级以来已启用。
- **Orchard** 现为**仅可支出**：无法再有新价值进入，其中的现有资金会迁移至 Ironwood。
- **Sapling**（以 `zs` 开头的 z 地址）仍获广泛支持，并继续保护大量屏蔽的 ZEC。
- **透明**地址（t...）不提供交易隐私，运行方式与 Bitcoin 类似。
- **Sprout** 是一个已停止积极使用的旧版屏蔽 pool。
- 从 Orchard 到 Ironwood 的迁移正在**进行中**，并由 turnstile 公开审计。
- 为获得最强的隐私保障，用户应在可能的情况下继续优先使用**屏蔽到屏蔽（z → z）**交易。


<br/>

## 了解 Zcash 价值池

Zcash 将资金划分为称为价值池的不同记账系统。每个 pool 都有自己的密码学规则和隐私属性，同时协议会追踪它们之间流动的总价值。

如今，网络包含 5 个主要价值池：

- 透明池 — 公开且在链上完全可见。
- Sapling — 第一个被广泛采用的现代屏蔽 pool，仍在使用中。
- Orchard — 之前主要的屏蔽 pool，现仅可支出。
- Ironwood — 当前主要的屏蔽 pool，由 NU6.3 引入。
- Sprout — 于 2016 年随 Zcash 推出的原始屏蔽 pool。
  


随着 Zcash 的发展，可能会引入新的屏蔽 pool，以在保持与现有资金兼容的同时，改善安全性、隐私、易用性和可审计性。

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
图 1：显示截至 2025 年 10 月 29 日、Ironwood 启用前 3 个屏蔽 pool（Sprout、Sapling 和 Orchard）的图表

<br/>

## 屏蔽池


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Pool</h3>

Ironwood 是当前主要的屏蔽 pool。它于 2026 年 7 月 28 日在区块 3,428,143 处作为 NU6.3 网络升级的一部分启用，新屏蔽价值现存于此处。

它之所以存在，是因为 2026 年 5 月在 Orchard 的证明系统中发现了一个漏洞。没有证据表明它曾被利用，但该缺陷意味着仅凭证明无法证实屏蔽供应量的健全性。网络没有就地修补，而是使用经修正的电路创建了新的 pool，并通过一个公开统计每枚硬币的 turnstile 转移价值。该记账机制恢复了屏蔽供应量被完全支持的保障。

Ironwood 复用了 Orchard 的 Action 模型和 Halo 2 证明，因此日常行为相同。新增了两项内容：交易使用 v6 格式，并且 Ironwood note 在 [ZIP 2005](https://zips.z.cash/zip-2005) 下具备**量子可恢复性**，这意味着如果未来的量子计算机破解当今密码学，硬币的链上记录仍可恢复。这是一条恢复路径，而不是量子抗性，并且不适用于较早的 pool。

您不需要新地址。统一地址会捆绑多个接收方，钱包会为您选择正确的 pool。

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
图 2：显示截至 2025 年 10 月 29 日、Ironwood 启用前 Orchard pool 的图表

<br/>

Orchard 屏蔽池于 2022 年 5 月 31 日作为 NU5 网络升级的一部分启用。Orchard 引入了一种新的屏蔽协议，消除了可信设置 [trusted setup] 的需要，并成为统一地址（UA）使用的主要屏蔽 pool。

Orchard 通过减少交易元数据泄露，并引入基于 Action 而非传统屏蔽输入和输出的更灵活交易模型，显著改善了易用性、效率和隐私。

自 Ironwood 升级于 2026 年 7 月 28 日启用后，**Orchard 仅可支出**。新价值无法进入该 pool。已存于其中的资金仍可支出，并正通过 turnstile 迁移至 Ironwood。钱包会为您处理此事，但大多数钱包允许您在一定程度上控制迁移速度。每次从 Orchard 转出的金额都会显示在 blockchain 上，因此钱包如何拆分和安排迁移时间会影响隐私。

如果您持有 Orchard 资金，请参阅 [Ironwood](/zcash-tech/ironwood)，了解迁移在实践中的含义。

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
图 3：显示截至 2025 年 10 月 29 日、Ironwood 启用前 Sapling pool 的图表

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) 是对 Zcash 协议的一项升级，于 2018 年 10 月 28 日推出。它是对早期版本 Sprout 的重大改进，后者在隐私、效率和易用性方面存在一些限制。 

部分升级包括提升屏蔽地址的性能、改进 viewing key 以使用户能够查看传入和传出的交易而不暴露用户私钥，以及为硬件钱包在交易签名期间提供独立的零知识密钥。 

与 Sprout 系列所需的较长时间相比，Zcash Sapling 使用户能够在短短数秒内完成私密交易。 

交易屏蔽增强了隐私，使第三方无法关联交易并确定正在转移的 ZEC 数量。Sapling 还通过降低生成私密交易的计算需求来改善易用性，使其更易于用户使用。

Sapling 钱包地址以 "zs" 开头，这可在所有受支持的 Zcash 屏蔽钱包（Zkool、Zingo Wallet、Nighthawk 等）中观察到，它们内置了 Sapling 地址。Zcash Sapling 在交易隐私和效率方面代表着技术上的重大进展，使 Zcash 成为重视隐私和安全用户实用且有效的加密货币。

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
图 4：显示截至 2025 年 10 月 29 日、Ironwood 启用前 Sprout pool 的图表

Sprout 是首个推出的开放、无需许可的零知识隐私协议。它于 2016 年 10 月 28 日推出。

Sprout 地址以其始终为 "zc" 的前两个字母识别。它被命名为 "Sprout"，主要是为了强调该软件是一个年轻、萌芽中的 blockchain，具有巨大的成长潜力并且开放开发。 

Sprout 曾被用作 [Zcash 慢启动挖矿](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) 的早期工具，这带来了 ZEC 的分配以及矿工的区块奖励。 

随着 Zcash 生态系统不断扩展、屏蔽交易数量增加，人们发现 Zcash Sprout 系列在用户隐私、交易扩容和处理方面变得受限且效率较低。这促成了网络修改和 Sapling 升级。 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">透明 Pool</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
图 5：显示截至 2025 年 10 月 29 日、Ironwood 启用前透明 pool 的图表

<br/>

Zcash 透明 pool 未屏蔽且不具隐私性。Zcash 上的透明钱包地址以字母 "t" 开头，使用此类地址进行交易的隐私性非常低。

Zcash 中的透明交易与 Bitcoin 交易相似，支持多重签名交易并使用标准公开地址。

Zcash 透明地址主要由中心化交易所使用，以确保用户之间发送和接收 ZEC 时具备高度透明度和网络确认。

还需注意的是，虽然 Zcash 屏蔽地址在交易期间提供很高的隐私性，但处理交易也需要更多计算资源。因此，一些用户可能会使用透明地址进行不需要同等隐私程度的交易。

<br/>

## Pool 转移推荐做法

在 Zcash 网络上进行交易时，如需考虑高水平隐私，建议您遵循以下做法；

在 Zcash blockchain 上，发生在 "z 到 z" 钱包之间的交易大多是屏蔽的，有时因其产生的高水平隐私而被称为私密交易。这通常是在需要隐私时发送和接收 $ZEC 的最佳且最推荐方式。 

---

当您将 ZEC 从 "Z 地址" 发送到 "T 地址" 时，这意味着一种去屏蔽交易。在这种交易中，隐私水平并不总是很高，因为将 ZEC 发送至透明地址会导致部分信息在 blockchain 上可见。当需要高隐私时，通常不建议进行去屏蔽交易。 

---

将 ZEC 从透明地址（T 地址）转移到 Z 地址，称为屏蔽。在这种交易中，与 z-z 交易相比，隐私水平并不总是很高，但在需要隐私时仍建议使用。 

---

在 Zcash 网络上，将 ZEC 从一个透明地址（T 地址）发送到另一个透明地址（T 地址）（T-T 交易）与 Bitcoin 交易非常相似，因此 Zcash 上的 T-T 交易始终被称为公开交易，因为发送方和接收方的交易详情都会向公众可见，这使此类交易的隐私水平非常低。 

大多数加密货币中心化交易所在 Zcash blockchain 上进行交易时使用透明地址（"T 地址），但这种类型的交易（T-T）不具有任何隐私属性。

<br/>

## Orchard 至 Ironwood 的迁移

迁移正在进行中。Orchard 已对新存款关闭，仍存于其中的价值正逐笔交易迁移至 Ironwood。您可以在 [ironwood.live](https://ironwood.live/) 查看总额。

这对您意味着什么取决于资金所在位置：

1. **新的屏蔽活动**会自动进入 Ironwood。无需操作。
2. **现有 Orchard 资金**需要迁移。维护中的钱包会为您处理，通常会分阶段完成而非一次性完成。
3. **Sapling 不受影响**，并且仍可接收资金。只有 Orchard 被关闭。
4. **Turnstile 会统计所有内容**在 pool 之间的转移，这证明途中没有凭空创造硬币。

> **有一项值得了解的隐私注意事项。** Turnstile 会公布在 pool 之间转移的*金额*及区块高度。发送方和接收方一如既往地保持隐藏，但独特的金额可能与您关联。这就是为什么钱包会使用标准面额分阶段迁移，而不是将您的余额作为一笔容易识别的大额转移。让您的钱包自行控制节奏，并考虑使用 Tor 或 VPN，以免您的 IP 与所转移金额关联。

请参阅 [Ironwood](/zcash-tech/ironwood) 了解升级本身，并参阅 [The Turnstile](/zcash-tech/the-turnstile) 了解记账机制的运作方式。

<br/>

## 应避免的常见错误

- **从 t 地址发送至 t 地址** — 完全公开，没有隐私。请始终先屏蔽资金。
- **以为 Orchard 仍可接收资金** — 自 2026 年 7 月 28 日起它仅可支出。价值可以转出，但不能有新价值转入
- **混淆 Sapling 和统一地址** — Sapling 地址以 `zs` 开头。统一地址以 `u1` 开头并捆绑多个接收方，因此您的支付进入哪个 pool 取决于该地址包含哪些接收方
- **将资金留在 Sprout pool 中** — Sprout 已弃用多年；请将这些资金转出
- **期待迁移完全不可见** — 即使发送方和接收方不可见，穿过 turnstile 的金额仍是公开的
- **假设 t → z（屏蔽）完全私密** — 屏蔽行为本身在链上可见；内容则不可见

---

## 相关页面

- [Ironwood](/zcash-tech/ironwood) — 创建当前 pool 的升级
- [The Turnstile](/zcash-tech/the-turnstile) — 如何审计在 pool 之间转移的价值
- [钱包](/using-zcash/wallets) — 哪些钱包仍在维护且已准备好支持 Ironwood
- [交易](/using-zcash/transactions) — 如何发送屏蔽交易
- [购买 ZEC](/using-zcash/buying-zec) — 在 pool 中使用 ZEC 前获取它
- [zk-SNARKs](/zcash-tech/zk-snarks) — 屏蔽 pool 的密码学基础
- [什么是 ZEC 和 Zcash](/start-here/what-is-zec-and-zcash) — 关于 Zcash 隐私的背景
