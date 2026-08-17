<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood 将在 Zcash 主网上于区块 3,428,143 激活，预计时间约为 2026 年 7 月 28 日 UTC。

你将了解到：Ironwood 改变了什么、为什么隐藏资金中的漏洞很严重，以及 turnstile 如何让任何人都能确认没有 ZEC 被伪造出来。

Ironwood 是 Zcash 的一次[网络升级](../start-here/network-upgrades)，正式编号为 NU6.3，它引入了一个同名的新屏蔽池。 [屏蔽池](../using-zcash/shielded-pools) 是指这样一组资金：其金额和所有者通过[零知识密码学](../zcash-tech/zk-snarks)保持隐藏。Ironwood 的存在，是为了隔离并审计在现有 Orchard 屏蔽池中发现的一个可靠性漏洞，并为社区提供一种更强的方法来检查 ZEC 的总供应量是否真实可信。它的共识规则在 [ZIP 258](https://zips.z.cash/zip-0258) 中规定。

为什么这很重要。对于像比特币那样的透明货币，任何人都可以通过读取公开账本来检查是否有币被伪造。屏蔽资金会隐藏金额，因此你不能仅靠查看来验证。相反，必须由密码学本身来保证没有人能够秘密创造货币。Ironwood 之所以重要，是因为 Orchard 池中的这项保证被发现存在漏洞。这次升级填补了这个缺口，并让任何人都可以确认 ZEC 的总供应量依然真实可信。

刚接触 Zcash？先阅读[什么是 ZEC 和 Zcash](../start-here/what-is-zec-and-zcash)以及[屏蔽池](../using-zcash/shielded-pools)，然后再回到这里。

![Ironwood 价值迁移流程：价值离开 Orchard 池，经过 turnstile 检查点，并进入新的 Ironwood 池](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## 为什么需要 Ironwood

2026 年 5 月下旬，独立安全研究员 Taylor Hornby 在为[Shielded Labs](../zcash-organizations/shielded-labs)进行协议审计期间，负责任地披露了 Orchard 屏蔽池中的一个可靠性漏洞。当时 Orchard 是 Zcash 最新的屏蔽池，而该缺陷位于其零知识电路中一个椭圆曲线相关部分，该电路使用 [Halo](../zcash-tech/halo) 2 证明系统。

1. 可靠性漏洞意味着，用来证明交易有效的数学机制并不能完全保证其有效性。
2. 理论上，攻击者可能利用这一缺陷在 Orchard 池内部伪造无效价值，并花费实际上并不属于他们的资金，而且不会留下任何普通节点能够捕捉到的痕迹。
3. Zcash 的 turnstile 仍然限制了 Orchard 最多能够流出多少价值，因此总供应量不可能被膨胀，但该池自身的密码学已不再能够保证其中每一枚隐藏币都是真实的。

![漏洞说明：一笔交易放入 5 ZEC，但存在缺陷的证明在输出 7 ZEC 时仍然会通过，从而凭空创造出 2 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

上面的数字只是一个简化示意。真正的缺陷存在于电路数学中的一个特定部分，而不是字面意义上的币进出数量统计。这里要理解的重点只是：可靠性漏洞可能让价值在池内被创造出来而无法被发现。

重要的是，没有证据表明这个漏洞曾被利用，没有证据显示用户资金受到影响，也没有证据表明 ZEC 的总供应量发生了变化。它是在安全研究中被发现的，并且在已知损害发生之前就已修复。

## 应对措施

Zcash 社区分阶段推出修复，而不是一次性全部完成。

![Ironwood 响应时间线：Orchard 漏洞于 2026 年 5 月被发现，池子于 2026 年 6 月暂停，电路在 NU6.2 中被修复，而 Ironwood 于 2026 年 7 月 28 日左右激活](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. 2026 年 6 月上旬，一项临时措施禁用了 Orchard 池，以便为完整修复争取时间。
2. NU6.2 升级修正了 Orchard 电路本身，堵上了底层的可靠性漏洞。
3. NU6.3 升级，也就是 Ironwood，引入了一个全新的屏蔽池和一个公开检查点，使价值能够在完全审计下从旧的 Orchard 池迁移出去。

![NU6.2 中的修复：修正后的证明要求输入等于输出，因此合法的 5 ZEC 输出会通过，而试图输出 7 ZEC 的行为会被拒绝](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Ironwood 池的作用

NU6.2 已为所有新交易保障了 Orchard 电路的安全，但在旧规则下创建的价值仍然留在 Orchard 池中。Ironwood 为这些价值提供了一个干净的新去处，以及一种在迁移过程中进行审计的方法。

Ironwood 池是在 NU6.3 激活时创建的一个新屏蔽价值池。它构建于修正后的电路之上，并使用一种可量子恢复的 note 格式（这种设计使得如果[量子计算机](../zcash-tech/post-quantum-security)有朝一日攻破当今的密码学，资金仍可被恢复），其定义见 [ZIP 2005](https://zips.z.cash/zip-2005)。

1. 激活后，旧的 Orchard 池将变为仅可支出，因此不能再有新的价值进入其中。
2. 新进入屏蔽状态的价值将改为流入 Ironwood。
3. 屏蔽的 ZEC 仍然保有同样强大的隐私保障，隐藏发送方、接收方和金额。

## turnstile

Ironwood 中的核心概念是 turnstile，它是一个记账检查点，每一枚币在从旧的 Orchard 池迁移到 Ironwood 时都必须经过这里。

> 对隐藏资金来说，turnstile 的作用就像银行金库的玻璃门。你仍然看不到里面，但你可以精确统计有多少进入、多少流出。

1. 离开 Orchard 的资金在进入 Ironwood 之前，会先在一个公开验证点被计数。
2. 这使任何人都可以审计有多少 ZEC 完成迁移，从而增强对真实流通供应量的信心。
3. 如果此前的漏洞曾经制造出任何伪造的 ZEC，那么这种迁移记账就是它暴露出来的地方。

Turnstile 对 Zcash 来说并不新鲜。网络此前已经在 Sprout、Sapling 和 Orchard 池之间的边界使用过它，这样在不同池之间流动的价值就始终可审计，并且任何池都无法释放出超过其合法流入量的价值。

共识规则会将每个价值池（包括 Ironwood）都限制在网络的最大货币上限之内，因此池余额永远不可能变成负数。

## 用户需要做什么

钱包和节点软件会自动处理其中大部分事情，但实际上的变化很简单：随着时间推移，将屏蔽持仓从旧的 Orchard 池经由 turnstile 迁移到 Ironwood 池。请遵循你的钱包提供方的指导，并始终在激活区块之前更新到受支持的版本。

## 术语表

| 术语 | 通俗含义 |
|---|---|
| 屏蔽池 | 一组其金额和所有者通过零知识密码学隐藏起来的资金 |
| 可靠性漏洞 | 一种缺陷，它会让无效交易像有效交易一样通过证明检查 |
| Turnstile | 一个公开检查点，用于统计在不同池之间流动的价值，从而让供应量保持可审计 |
| 仅可支出 | 一个你可以从中支出、但不能再向其中加入新价值的池 |
| 网络升级（NU） | 对 Zcash 共识规则进行的一次协调变更，在设定的区块高度激活 |
| 可量子恢复的 note | 一种 note 格式，其设计目标是如果量子计算机有朝一日攻破当今密码学，资金仍可被恢复 |

## FAQ

我的 ZEC 受到影响了吗？没有。没有证据表明该漏洞曾被使用，没有对用户资金造成影响，总供应量也没有变化。

我需要做什么吗？请在激活区块之前，将你的钱包和节点软件更新到受支持的版本。你的钱包会在你花费资金时，随着时间推移将资金迁移到 Ironwood，因此没有什么需要手动赶紧完成的操作。请遵循你的钱包提供方的指导。

Zcash 还保持隐私吗？是的。Ironwood 保留了相同的屏蔽隐私特性，仍会隐藏发送方、接收方和金额。这次升级关注的是供应完整性，而不是隐私性。

这个漏洞曾被利用过吗？没有证据表明它被利用过。它是在安全研究中被发现的，被负责任地披露，并在已知损害发生之前得到了修复。

旧的 Orchard 池会怎样？它将变为仅可支出。不会再有新的价值进入其中，而现有价值会通过 turnstile 迁移到 Ironwood，在那里迁移过程会被公开审计。

## 测试你的理解

如果屏蔽池中的 ZEC 是隐藏的，那么任何人怎么能确认 Orchard 漏洞没有悄悄导致总供应量膨胀呢？

<details>
<summary>答案</summary>

通过 turnstile。每一枚离开旧 Orchard 池的币在进入 Ironwood 时，都会在一个公开检查点被计数。如果试图流出的价值多于合法流入的价值，账目就无法平衡，因此该漏洞可能创造出的任何伪造价值都会在这个关口暴露出来。
</details>

### 资源

[ZIP 258：NU6.3 网络升级的部署](https://zips.z.cash/zip-0258)

[ZIP 257：Orchard 临时漏洞缓解措施与 NU6.2 网络升级的部署](https://zips.z.cash/zip-0257)

[ZIP 2005：Ironwood 量子可恢复性](https://zips.z.cash/zip-2005)

[Ironwood：Zcash 的新屏蔽池](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### 另请参阅

[Zcash 网络升级](../start-here/network-upgrades)

[屏蔽池](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[后量子安全](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[什么是 ZEC 和 Zcash](../start-here/what-is-zec-and-zcash)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[NU6.2](../zcash-tech/nu6-2)
