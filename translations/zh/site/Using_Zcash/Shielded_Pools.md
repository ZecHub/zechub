<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 价值池

## TL;DR

- Zcash 目前有 **5 个价值池**：Sprout（旧版）、Sapling、Orchard（仅可支出）、Ironwood 和 Transparent。
- **Ironwood** 是当前的主要屏蔽池，自 2026 年 7 月 28 日 NU6.3 升级起上线。
- **Orchard** 现已变为 **仅可支出**：新的价值不能再进入其中，现有资金会迁移到 Ironwood。
- **Sapling**（以 `zs` 开头的 z 地址）仍被广泛支持，并继续保护着相当数量的屏蔽 ZEC。
- **Transparent** 地址（t...）不提供任何交易隐私，其运作方式与 Bitcoin 类似。
- **Sprout** 是一个旧版屏蔽池，已经退出活跃使用。
- Orchard 到 Ironwood 的迁移 **正在进行中**，并通过 turnstile 公开审计。
- 为了获得最强的隐私保障，用户应尽可能继续优先使用 **屏蔽到屏蔽（z → z）** 交易。


<br/>

## 理解 Zcash 价值池

Zcash 将资金划分到不同的记账系统中，这些系统被称为价值池。每个池都有各自的密码学规则和隐私属性，而协议会追踪它们之间流动的总价值。

如今，网络包含五个主要价值池：

- Transparent — 公开且在链上完全可见。
- Sapling — 第一个被广泛采用的现代屏蔽池，仍在使用中。
- Orchard — 之前的主要屏蔽池，现为仅可支出。
- Ironwood — 当前的主要屏蔽池，由 NU6.3 引入。
- Sprout — 随 Zcash 于 2016 年推出的最初屏蔽池。
  


随着 Zcash 的发展，未来可能会引入新的屏蔽池，以在保持与现有资金兼容的同时，提高安全性、隐私性、可用性和可审计性。

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
图 1：截至 2025 年 10 月显示当前 4 个池的图表

<br/>

## 屏蔽池


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood 池</h3>

Ironwood 是当前的主要屏蔽池。它于 2026 年 7 月 28 日在区块 3,428,143 激活，作为 NU6.3 网络升级的一部分，现在新的屏蔽价值都存放于此。

它之所以存在，是因为 2026 年 5 月在 Orchard 的证明系统中发现了一个漏洞。没有证据表明它曾被利用，但这一缺陷意味着仅凭这些证明，无法证明屏蔽供应是完备无误的。网络没有选择原地修补，而是创建了一个采用修正电路的新池，并通过一个公开统计每一枚币的 turnstile 来转移价值。正是这种记账方式恢复了“屏蔽供应有足额支撑”的保证。

Ironwood 复用了 Orchard 的 Action 模型和 Halo 2 证明，因此它在日常使用中的行为方式相同。新变化有两点：交易使用 v6 格式；并且根据 [ZIP 2005](https://zips.z.cash/zip-2005)，Ironwood note 具备 **quantum-recoverable** 特性，这意味着如果未来的量子计算机攻破了今天的密码学机制，币在链上的记录仍然可以被恢复。这是一种恢复路径，而不是量子抗性，并且不适用于较早的池。

你不需要新地址。Unified Address 会打包多个接收器，而钱包会为你选择正确的池。

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard 池</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
图 2：截至 2025 年 10 月显示 Orchard 池的图表

<br/>

Orchard 屏蔽池于 2022 年 5 月 31 日激活，作为 NU5 网络升级的一部分。Orchard 引入了一种新的屏蔽协议，消除了对可信设置的需求，并成为 Unified Address（UA）使用的主要屏蔽池。

Orchard 通过减少交易元数据泄露，并引入基于 Action 而非传统屏蔽输入与输出的更灵活交易模型，显著提升了可用性、效率和隐私性。

自 2026 年 7 月 28 日 Ironwood 升级激活以来，**Orchard 已变为仅可支出**。新的价值不能进入该池。已存放其中的资金仍可支出，并正通过 turnstile 迁移到 Ironwood。钱包会替你处理这一过程，不过大多数钱包会让你对迁移速度保有一定控制权。

如果你持有 Orchard 资金，请参阅 [Ironwood](/zcash-tech/ironwood) 了解这次迁移在实际中的含义。

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling 池</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
图 3：截至 2025 年 10 月显示 Sapling 池的图表

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) 是于 2018 年 10 月 28 日引入 Zcash 协议的一次升级。与更早的 Sprout 版本相比，这是一次重大改进，因为后者在隐私性、效率和可用性方面存在一些限制。 

其中一些升级包括：提升屏蔽地址的性能；改进 Viewing Key，使用户能够查看传入和传出的交易而无需暴露用户私钥；以及为硬件钱包在交易签名期间提供独立的零知识密钥。 

与 Sprout 系列中所需的更长时间相比，Zcash Sapling 让用户只需几秒钟即可完成私密交易。 

交易屏蔽增强了隐私，使第三方无法关联交易，也无法确定所转移的 ZEC 数量。Sapling 还通过降低生成私密交易所需的计算资源，提高了可用性，让更多用户能够使用它。

Sapling 钱包地址以 “zs” 开头，这一点可以在所有受支持的 Zcash 屏蔽钱包（YWallet、Zingo Wallet、Nighthawk 等）中看到，它们都内置了 Sapling 地址。就交易隐私和效率而言，Zcash Sapling 代表了一项重要的技术进展，使 Zcash 对重视隐私与安全的用户来说成为一种实用而高效的加密货币。

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout 池</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
图 4：截至 2025 年 10 月显示 Sprout 池的图表

Sprout 是首个推出的开放、无需许可的零知识隐私协议。它于 2016 年 10 月 28 日发布。

Sprout 地址可通过其前两个字母识别，即始终为 “zc”。之所以命名为 “Sprout”，主要是为了强调该软件当时还很年轻，是一个初露锋芒、具有巨大成长潜力并向开发开放的 blockchain。 

Sprout 曾被用作 [Zcash 慢启动挖矿](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) 的早期工具，这推动了 ZEC 的分发以及矿工区块奖励的发放。 

随着 Zcash 生态系统持续扩展、屏蔽交易数量不断增加，人们发现 Zcash Sprout 系列在用户隐私、交易可扩展性和处理能力方面逐渐显得受限且效率较低。这促成了网络修改以及 Sapling 升级。 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent 池</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
图 5：截至 2025 年 10 月显示 Transparent 池的图表

<br/>

Zcash 的 Transparent 池是未屏蔽且非隐私的。Zcash 上的 Transparent 钱包地址以字母 “t” 开头，使用这种地址类型进行交易时隐私性非常低。

Zcash 中的 Transparent 交易与 Bitcoin 交易类似，支持多重签名交易，并使用标准的公开地址。

Zcash 的 Transparent 地址多被中心化交易所使用，以确保用户之间发送和接收 ZEC 时具有较高透明度以及网络确认能力。

还需要注意的是，虽然 Zcash 屏蔽地址在交易过程中提供了很高的隐私性，但它们也需要更多计算资源来处理交易。因此，一些用户可能会在不需要同等隐私级别的场景中使用 Transparent 地址进行交易。

<br/>

## 池间转账推荐实践

在 Zcash 网络上交易时，如果你希望获得较高程度的隐私，建议遵循以下做法；

发生在 Zcash blockchain 上 “z 到 z” 钱包之间的交易大多是屏蔽的，有时也被称为私密交易，因为其提供了很高程度的隐私。这通常是在需要隐私时发送和接收 $ZEC 的最佳、也是最推荐的方式。 

---

当你将 ZEC 从 “Z-address” 发送到 “T-address” 时，这本质上表示一种去屏蔽交易。在这种交易中，隐私级别并不总是很高，因为由于将 ZEC 发送到 Transparent 地址的影响，一些信息会在 blockchain 上可见。当需要高隐私时，通常不推荐去屏蔽交易。 

---

将 ZEC 从 Transparent 地址（T-address）转入 Z-address，通常被称为屏蔽（Shielding）。与 z-z 交易相比，这类交易的隐私级别并不总是同样高，但在需要隐私时，它仍然是推荐做法。 

---

在 Zcash 网络上，将 ZEC 从一个 Transparent 地址（T-address）发送到另一个 Transparent 地址（T-address）（即 T-T 交易）与 Bitcoin 交易非常相似，这也是为什么 Zcash 上的 T-T 交易总被称为公开交易，因为发送方和接收方的交易详情都会对公众可见，从而使这类交易的隐私级别非常低。 

大多数加密货币中心化交易所在 Zcash blockchain 上进行交易时都会使用 Transparent 地址（“T-address”），但这种交易类型（T-T）不具备任何私密属性。

<br/>

## Orchard 到 Ironwood 的迁移

迁移正在进行中。Orchard 已对新的存入关闭，而仍停留在其中的价值正一笔交易一笔交易地转移到 Ironwood。你可以在 [ironwood.live](https://ironwood.live/) 查看总量变化。

这对你的意义取决于你的资金所在位置：

1. **新的屏蔽活动** 会自动进入 Ironwood。无需操作。
2. **现有的 Orchard 资金** 需要迁移。受维护的钱包会替你处理，通常会分阶段进行，而不是一次性全部完成。
3. **Sapling 不受影响**，仍然可以接收资金。只有 Orchard 被封闭。
4. **turnstile 会统计** 在池之间穿过的一切价值，这正是证明途中没有凭空创造任何币的机制。

> **有一个值得了解的隐私注意事项。** turnstile 会公开跨池转移的*金额*以及对应的区块高度。发送者和接收者仍像往常一样保持隐藏，但一个具有辨识度的金额可能会被追溯到你。这就是为什么钱包会使用标准面额分阶段迁移，而不是一次性移动你全部余额形成一个明显可识别的大额。让你的钱包按自己的节奏处理，并考虑使用 Tor 或 VPN，这样你的 IP 就不会与你转移的金额关联起来。

关于升级本身，请参阅 [Ironwood](/zcash-tech/ironwood)；关于这种记账方式如何运作，请参阅 [The Turnstile](/zcash-tech/the-turnstile)。

<br/>

## 应避免的常见错误

- **从 t-address 发送到 t-address** — 完全公开，没有隐私。始终先将资金屏蔽。
- **以为 Orchard 仍然接受资金** — 自 2026 年 7 月 28 日起它已变为仅可支出。价值可以转出，但不能再转入新的价值
- **混淆 Sapling 地址和 Unified 地址** — Sapling 地址以 `zs` 开头。Unified 地址以 `u1` 开头，并打包多个接收器，因此你的付款最终进入哪个池取决于该地址包含哪些接收器
- **把资金留在 Sprout 池中** — Sprout 多年前就已被弃用；请将这些资金转出
- **以为迁移会完全不可见** — 穿过 turnstile 的金额是公开的，即使发送者和接收者不是
- **以为 t → z（屏蔽）是完全私密的** — 屏蔽这一行为本身在链上可见；不可见的是其内容

---

## 相关页面

- [Ironwood](/zcash-tech/ironwood) — 创建当前池的升级
- [The Turnstile](/zcash-tech/the-turnstile) — 池间价值转移如何被审计
- [钱包](/using-zcash/wallets) — 哪些钱包仍在维护并已支持 Ironwood
- [交易](/using-zcash/transactions) — 如何发送屏蔽交易
- [购买 ZEC](/using-zcash/buying-zec) — 在价值池中使用前获取 ZEC
- [ZK-SNARKs](/zcash-tech/zk-snarks) — 屏蔽池的密码学基础
- [什么是 ZEC 和 Zcash](/start-here/what-is-zec-and-zcash) — 关于 Zcash 隐私的背景知识
