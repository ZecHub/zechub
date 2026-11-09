<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Ironwood

> Ironwood 于 2026 年 7 月 28 日 UTC 在 Zcash 主网上的区块 3,428,143 激活，并自此持续运行。

您将了解：Ironwood 带来了哪些变化、为何隐藏资金中的漏洞十分严重，以及 turnstile 如何让任何人确认没有伪造 ZEC。

Ironwood 是一项 Zcash [网络升级](../start-here/network-upgrades)，正式名称为 NU6.3，它引入了一个同名的新屏蔽池。[屏蔽池](../using-zcash/shielded-pools) 是指其金额和所有者均通过 [零知识密码学](../zcash-tech/zk-snarks) 保持隐藏的一组资金。Ironwood 的存在是为了控制和审计在现有 Orchard 屏蔽池中发现的健全性漏洞，并为社区提供一种更强的方式来核查 ZEC 的总供应量是否真实。其共识规则在 [ZIP 258](https://zips.z.cash/zip-0258) 中规定。

为什么这很重要。对于像 Bitcoin 这样的透明资金，任何人都可以通过查看公开账本确认没有伪造货币。屏蔽资金隐藏了金额，因此您无法仅凭查看得知。相反，密码学本身必须保证无人能秘密创造资金。Ironwood 很重要，因为在 Orchard pool 的这一保证中发现了一个漏洞。该升级弥合了这一缺口，并让任何人都能确认 ZEC 的总供应量仍然真实。

刚接触 Zcash？请先阅读 [什么是 ZEC 以及 Zcash](../start-here/what-is-zec-and-zcash) 和 [屏蔽池](../using-zcash/shielded-pools)，然后再回到这里。

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## 为什么需要 Ironwood

2026 年 5 月下旬，独立安全研究员 Taylor Hornby 在为 [Shielded Labs](../zcash-organizations/shielded-labs) 进行协议审计期间，负责任地披露了 Orchard 屏蔽池中的一个健全性漏洞。Orchard 当时是 Zcash 最新的屏蔽池，该缺陷位于其零知识电路的椭圆曲线部分，该部分使用 [Halo](../zcash-tech/halo) 2 证明系统。

1. 健全性漏洞意味着用来证明交易有效的数学机制并不能完全保证其有效性。
2. 理论上，攻击者本可能利用该缺陷在 Orchard pool 内伪造无效价值，并花费实际上不属于他们的资金，且不会留下普通节点能够发现的痕迹。
3. Zcash 的 turnstile 仍限制了能够离开 Orchard 的价值总量，因此总供应量无法被增发，但该 pool 自身的密码学不再保证其中每一枚隐藏货币都是真实的。

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

上述数字是一个简化示意。真正的缺陷出在电路数学的一个特定部分，而不是进出货币数量的字面计数。这里唯一需要理解的是，健全性漏洞可能允许价值在 pool 内被创造而不被发现。

重要的是，没有证据表明该漏洞曾被利用，没有证据表明用户资金受到影响，也没有证据表明 ZEC 的总供应量发生变化。它是在安全研究中被发现，并在已知损害发生前修复的。

## 应对措施

Zcash 社区分阶段发布修复措施，而非一次性全部完成。

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. 2026 年 6 月上旬，在准备完整修复方案期间，一项临时措施禁用了 Orchard pool。
2. NU6.2 升级修正了 Orchard 电路本身，消除了根本性的健全性漏洞。
3. NU6.3 升级，即 Ironwood，引入了一个全新的屏蔽池和一个公开检查点，使价值能够在全面审计下从旧的 Orchard pool 转出。

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Ironwood pool 的作用

NU6.2 为所有新交易保障了 Orchard 电路，但在旧规则下创造的价值仍留在 Orchard pool 中。Ironwood 为该价值提供了一个干净的去向，以及在其迁移时审计它的方法。

Ironwood pool 是由 NU6.3 在区块 3,428,143 创建的屏蔽价值 pool。它基于修正后的电路构建，并使用量子可恢复 note 格式（一种允许在 [量子计算机](../zcash-tech/post-quantum-security) 将来破解当前密码学时恢复资金的设计），定义于 [ZIP 2005](https://zips.z.cash/zip-2005)。

1. 激活后，旧的 Orchard pool 将变为仅可花费，因此不再允许新价值进入。
2. 新屏蔽的价值将改为流入 Ironwood。
3. 在 Ironwood 内，屏蔽 ZEC 保留了隐藏发送方、接收方和金额的隐私。将 ZEC 从 Orchard 转入 Ironwood 会显示转移的金额。

## turnstile

Ironwood 的关键理念是 turnstile，这是一项会计检查点：每一枚货币从旧的 Orchard pool 转入 Ironwood 时都必须经过它。

> turnstile 对隐藏资金的作用，就像玻璃门对银行金库的作用。您仍然看不到里面，但可以精确计算进入和流出的数量。

1. 离开 Orchard 的资金会在进入 Ironwood 前于一个公开验证点被计数。
2. 这让任何人都能审计有多少 ZEC 被迁移，从而增强对真实流通供应量的信心。
3. 如果先前漏洞曾创造出任何伪造的 ZEC，这种迁移记账便是其显现之处。

turnstile 对 Zcash 并非新事物。网络此前已在 Sprout、Sapling 和 Orchard pool 之间的边界使用它们，以便在 pool 间转移的价值保持可审计，并确保没有任何 pool 能释放超过其合法进入量的价值。

共识规则将每个价值 pool（包括 Ironwood）限制在网络的最大货币限额之内，因此 pool 余额永远不会为负。

## 用户需要做什么

钱包和节点软件会自动处理其中大部分事项，但实际的变化很简单：随着时间推移，将屏蔽持仓从旧的 Orchard pool 经由 turnstile 转入 Ironwood pool。每次转移都会在 blockchain 上显示其金额，因此遵循 [ZIP 318](https://zips.z.cash/zip-0318) 的钱包会将其拆分为标准金额，并随时间发送。请遵循您的钱包提供商的指引，并确保软件使用受支持的版本。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Shielded pool | 其金额和所有者由零知识密码学隐藏的一组资金 |
| Soundness bug | 让无效交易如同有效交易一样通过证明检查的缺陷 |
| Turnstile | 对 pool 间转移价值进行计数的公开检查点，以确保供应量可审计 |
| Spend-only | 您可以从中花费、但不能添加新价值的 pool |
| Network upgrade (NU) | 对 Zcash 共识规则进行的协调变更，在设定的区块高度激活 |
| Quantum-recoverable note | 一种 note 格式，旨在让资金能够在量子计算机将来破解当前密码学时被恢复 |

## 常见问题

我的 ZEC 受到影响了吗？没有。没有证据表明该漏洞曾被使用，也没有对用户资金造成影响，且总供应量没有变化。

我需要做什么吗？请让您的钱包和节点软件保持在受支持的版本上。花费 Orchard 资金会将其转入 Ironwood，且跨越的金额是公开的。一些钱包提供迁移功能，会随时间发送标准金额，因此您的余额更难被关联。请遵循您的钱包提供商的指引。

Zcash 仍然私密吗？是。Ironwood 内的支付会隐藏发送方、接收方和金额，如同 Orchard 支付一样。pool 间转移的金额，例如从 Orchard 到 Ironwood，则是公开的。此次升级关乎供应量完整性。

该漏洞曾被利用吗？没有证据表明曾被利用。它是在安全研究中被发现、被负责任地披露，并在已知损害发生前修复的。

旧的 Orchard pool 会怎样？它将变为仅可花费。新价值无法进入，其中的现有价值会经由 turnstile 转入 Ironwood，迁移过程会受到公开审计。

## 测试您的理解

如果屏蔽池内的 ZEC 是隐藏的，任何人如何确认 Orchard 漏洞没有秘密增发总供应量？

<details>
<summary>答案</summary>

通过 turnstile。离开旧 Orchard pool 的每一枚货币在进入 Ironwood 时都会于公开检查点被计数。如果试图离开的价值多于合法进入的价值，账目便无法平衡，因此该漏洞可能创造的任何伪造价值都会在这个关口暴露。
</details>

### 资源

[ZIP 258：部署 NU6.3 网络升级](https://zips.z.cash/zip-0258)

[ZIP 257：部署 Orchard 临时漏洞缓解措施和 NU6.2 网络升级](https://zips.z.cash/zip-0257)

[ZIP 2005：Ironwood 量子可恢复性](https://zips.z.cash/zip-2005)

[ZIP 229：版本 6 交易格式](https://zips.z.cash/zip-0229)

[ZIP 318：从 Orchard 到 Ironwood 的迁移](https://zips.z.cash/zip-0318)

[Ironwood：为 Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/) 提供的新屏蔽池

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[屏蔽池](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[后量子安全](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[什么是 ZEC 以及 Zcash](../start-here/what-is-zec-and-zcash)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[NU6.2](../zcash-tech/nu6-2)
