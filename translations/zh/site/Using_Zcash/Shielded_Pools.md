<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zcash 价值池

## TL;DR

- Zcash 目前有 **4 个价值池**：Sprout（旧版）、Sapling、Orchard 和 Transparent。
- **Orchard** 是当前的主要屏蔽池，由 Unified Address（u1...）使用。
- **Sapling**（以 `zs` 开头的 z-address）仍被广泛支持，并继续保护着相当数量的屏蔽 ZEC。
- **Transparent** 地址（t...）不提供任何交易隐私，其运作方式与 Bitcoin 类似。
- **Sprout** 是一个旧版屏蔽池，已停止活跃使用。
- 一个名为 **Ironwood** 的未来屏蔽池提案，旨在在保留隐私的同时，增强对屏蔽 ZEC 供应完整性的信心。
- 为获得最强的隐私保障，用户应尽可能继续优先使用 **shielded-to-shielded (z → z)** 交易。


<br/>

## 理解 Zcash 价值池

Zcash 将资金划分到不同的会计系统中，这些系统被称为价值池。每个池都有各自的密码学规则和隐私属性，而协议会跟踪它们之间流动的总价值。

目前，网络中有四个主要价值池：

- Transparent — 公开且在链上完全可见。
- Sapling — 第一个被广泛采用的现代屏蔽池。
- Orchard — 当前的主要屏蔽池，随 Unified Address 一同引入。
- Sprout — Zcash 于 2016 年推出的原始屏蔽池。
  


随着 Zcash 的演进，未来可能会引入新的屏蔽池，以在保持与现有资金兼容的同时，提升安全性、隐私性、可用性和可审计性。

<br/>

![img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
图 1：截至 2025 年 10 月当前 4 个池的示意图

<br/>

## 屏蔽池


1. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard 池</h3>


![img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
图 2：截至 2025 年 10 月 Orchard 池的示意图

<br/>

Orchard 屏蔽池于 2022 年 5 月 31 日作为 NU5 网络升级的一部分启用。Orchard 引入了一种新的屏蔽协议，消除了对可信设置的需求，并成为 Unified Address（UA）使用的主要屏蔽池。

Orchard 通过减少交易元数据泄露，并引入一种基于 Actions 而非传统屏蔽输入和输出的更灵活交易模型，显著提升了可用性、效率和隐私性。

如今，Orchard 仍然是 Zcash 的主要屏蔽池。不过，社区正在评估未来迁移到一个名为 Ironwood 的新屏蔽池，该池将在保留 Zcash 隐私保障的同时，为屏蔽 ZEC 供应的完整性提供额外保证。

[Zcash 屏蔽钱包](/site/Using_Zcash/Wallets) 现已支持 Orchard。 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling 池</h3>


![img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
图 3：截至 2025 年 10 月 Sapling 池的示意图

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) 是 Zcash 协议的一次升级，于 2018 年 10 月 28 日推出。它相较于更早的 Sprout 版本是一次重大改进，后者在隐私性、效率和可用性方面存在一些限制。 

其中一些升级包括：提升屏蔽地址的性能、改进 Viewing Key 以便用户在不暴露私钥的情况下查看流入和流出交易，以及为硬件钱包在交易签名时提供独立的零知识密钥。 

与 Sprout 系列相比，Zcash Sapling 使用户只需几秒钟即可完成隐私交易，而不再需要更长时间。 

交易屏蔽增强了隐私性，使第三方无法关联交易，也无法确定转移的 ZEC 数量。Sapling 还通过降低生成隐私交易所需的计算资源，提高了可用性，使更多用户能够使用。

Sapling 钱包地址以 “zs” 开头，这一点可以在所有支持的 Zcash 屏蔽钱包中看到（如 YWallet、Zingo Wallet、Nighthawk 等），它们都内置了 Sapling 地址。就交易隐私和效率而言，Zcash Sapling 是一项重要的技术进展，使 Zcash 成为重视隐私与安全用户的实用且高效的加密货币。

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout 池</h3>


![img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
图 4：截至 2025 年 10 月 Sprout 池的示意图

Sprout 是首个推出的开放、无需许可的零知识隐私协议。它于 2016 年 10 月 28 日发布。

Sprout 地址可以通过前两个字母识别，始终为 “zc”。之所以命名为 “Sprout”，主要是为了强调该软件当时还很年轻，就像一条刚刚萌芽、具有巨大成长潜力并向开发开放的区块链。 

Sprout 曾被用作 [Zcash 慢启动挖矿](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) 的早期工具，用于实现 ZEC 分发以及矿工区块奖励。 

随着 Zcash 生态持续扩展、屏蔽交易数量不断增加，人们发现 Zcash Sprout 系列在用户隐私、交易可扩展性和处理效率方面逐渐显得受限且效率较低。这促成了网络的调整以及 Sapling 升级。 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent 池</h3>
<br/>

![img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
图 5：截至 2025 年 10 月 Transparent 池的示意图

<br/>

Zcash Transparent 池是非屏蔽且无隐私的。Zcash 上的 Transparent 钱包地址以字母 “t” 开头，使用这种地址类型进行交易时隐私性很低。

Zcash 中的 Transparent 交易与 Bitcoin 交易类似，支持多重签名交易，并使用标准公开地址。

Zcash Transparent 地址主要被中心化交易所使用，以确保用户之间发送和接收 ZEC 时具有较高透明度和网络确认性。

还需要注意的是，尽管 Zcash 屏蔽地址在交易时能提供较高隐私，但处理这类交易也需要更多计算资源。因此，一些用户可能会在不需要同等隐私级别时，采用 Transparent 地址进行交易。

<br/>

## 池间转账推荐做法

如果你在 Zcash 网络上进行交易时希望获得较高隐私，建议遵循以下做法；

在 Zcash 区块链上，“z to z” 钱包之间发生的交易大多是屏蔽的，有时也被称为隐私交易，因为其产生的隐私级别很高。当需要隐私时，这通常是发送和接收 $ZEC 最佳且最推荐的方式。 

---

当你把 ZEC 从 “Z-address” 发送到 “T-address” 时，这通常表示一种去屏蔽交易。在这种交易中，由于 ZEC 被发送到 Transparent Address，部分信息会在区块链上可见，因此隐私级别并不总是很高。当需要高隐私时，去屏蔽交易通常并不推荐。 

---

将 ZEC 从 Transparent Address（T-address）转到 Z-address，通常称为屏蔽。在这种交易中，其隐私水平虽然通常不如 z-z 交易高，但在需要隐私时也仍然是推荐的。 

---

在 Zcash 网络上，将 ZEC 从一个 Transparent Address（T-address）发送到另一个 Transparent Address（T-address）（即 T-T 交易），与 Bitcoin 交易非常相似。这也是为什么 Zcash 上的 T-T 交易总被称为公开交易，因为发送方和接收方的交易细节都会对公众可见，从而使这种交易的隐私水平非常低。 

大多数中心化加密货币交易所在 Zcash 区块链上交易时都会使用 Transparent Address（“T-address”），但这种交易类型（T-T）不具备任何隐私属性。

<br/>

## 未来：Ironwood 池

Zcash 社区目前正在评估一个名为 Ironwood 的拟议屏蔽池。

Ironwood 旨在应对 Orchard 证明系统中最近发现并已修复的一个漏洞。尽管没有证据表明该漏洞曾被利用，但 Ironwood 将通过支持从 Orchard 受控迁移到一个新建的屏蔽池，提供额外的一层保障。

其目标不是取代 Zcash 隐私，而是增强人们对屏蔽 ZEC 供应完整性的信心。

## 根据该提案：

1. 新的屏蔽活动将逐步迁移到 Ironwood。
2. 现有 Orchard 资金可以私密迁移。
3. 公开 turnstile 记账将为所有屏蔽资金仍然得到完全支撑提供更强证据。
4. 用户将继续保有他们对 Zcash 所期待的相同隐私保护。

<br/>
如果通过未来的网络升级激活，Ironwood 将成为 Zcash 屏蔽生态系统的下一代，同时保持与现有屏蔽资金的兼容性。

<br/>

## 需要避免的常见错误

- **从 t-address 发送到 t-address** — 完全公开，没有隐私。应始终先将资金屏蔽。
- **混淆 Sapling 和 Orchard 地址** — Sapling 地址以 `zs` 开头，Orchard/Unified 地址以 `u1` 开头
- **把资金留在 Sprout 池中** — Sprout 已弃用；请将资金迁移到 Orchard
- **认为 t → z（屏蔽）是完全私密的** — 屏蔽这一行为本身在链上是可见的；内容则不可见

---

## 相关页面

- [钱包](/using-zcash/wallets) — 哪些钱包支持 Orchard 和 Sapling 池
- [交易](/using-zcash/transactions) — 如何发送屏蔽交易
- [购买 ZEC](/using-zcash/buying-zec) — 在池中使用之前获取 ZEC
- [ZK-SNARKs](/zcash-tech/zk-snarks) — 屏蔽池的密码学基础
- [什么是 ZEC 和 Zcash](/start-here/what-is-zec-and-zcash) — 关于 Zcash 隐私的背景知识
