# turnstile

## TL;DR

- turnstile 是一项公开的记账规则，用于跟踪进入和离开每个屏蔽池 [shielded pool] 的价值数量
- 它让任何人都能验证一个 pool 支出的价值绝不会超过存入的价值，即使其中的交易是私密的
- 它保护 ZEC 供应量免受隐藏 bug 的影响，因为伪造的币无法在不破坏计数的情况下离开 pool
- pool 内的支付保持私密。在 pool 之间转移 ZEC 的交易会显示其转移的金额
- turnstile 是 Orchard 到 Ironwood 的迁移能够证明屏蔽供应量可靠的原因

<br/>

## 适用对象

- 希望了解 Zcash 如何保持其私密供应量可信的任何人
- 正在关注 Orchard 到 Ironwood 迁移，并想知道它如何证明供应量真实的用户
- 好奇私密货币系统如何仍可接受审计的新手

<br/>

## 挑战

屏蔽 Zcash 会隐藏金额、发送方和接收方。这种隐私正是其意义所在。但它带来了一个棘手的问题：如果没有人能看到屏蔽 pool 内部，任何人如何知道 ZEC 的总量是正确的？如何审计你看不见的货币？

如果某个 bug 曾允许有人在屏蔽 pool 内伪造币，那么这种伪造会被同样保护诚实用户的隐私所隐藏。没有保障措施，这种不确定性会削弱人们对整个供应量的信心。turnstile 就是解决这一问题的保障措施。

<br/>

## turnstile 是什么

把每个屏蔽 pool 想象成一个只有单一计数门口的房间。每当价值从外部进入 pool，或离开 pool 前往其他地方时，它都会经过该门口并被公开计入总数。房间内的交易保持私密，但门口的累计总额对所有人可见。

规则很简单：一个 pool 绝不能让流出的价值超过流入的价值。节点会拒绝任何会使 pool 余额低于零的区块。人们始终知道一个 pool 内被认为存在的金额，因为它就是流入总额减去流出总额。这个公开计数就是 turnstile。

<br/>

## 工作原理

Zcash 在其历史中有多个屏蔽池，例如 Sprout、Sapling 和 Orchard。价值会在透明链 [transparent chain] 与这些 pool 之间流动，有时也会在 pool 之间流动。turnstile 会监控这些流动：

1. 当 ZEC 转入屏蔽 pool 时，该金额会加入该 pool 的公开余额
2. 当 ZEC 从 pool 转出时，该金额会被扣除
3. 网络会拒绝任何使 pool 余额变为负数的区块，这意味着离开的价值超过了曾经进入的价值
4. 每笔交易只显示其流入或流出一个 pool 的净流量，即其价值余额。对于单个 pool 内的支付，这仅是手续费 [fee]

网络会以这种方式跟踪每个价值 pool 的余额，包括 Sprout、Sapling、Orchard、新的 Ironwood pool，以及透明和 lockbox 余额。因此，即使一个 pool 的确切内容被隐藏，能够流出的最大金额也受到流入金额的限制。没有隐藏的通胀能够逃入流通中。

<br/>

## 如何检查价值余额

门口的计数之所以可信，是因为每笔交易都被要求证明其转移的金额真实，即使金额本身保持隐藏。每笔屏蔽交易都会发布一个诚实的数字：它流入或流出 pool 的净价值，称为其价值余额。正的价值余额意味着资金从 pool 流向透明侧，负的价值余额意味着资金流入。私密细节仍被封存，但这个单一的净数值是公开的，也是 turnstile 累加的内容。

巧妙之处在于，交易如何在不揭示背后私密金额的情况下证明这个公开数字是诚实的。机制因 pool 而异，而这正是 turnstile 的实际机制。

在原始的 Sprout pool 中，每笔交易使用一个 JoinSplit。JoinSplit 花费两个隐藏的 note [note] 并创建两个新的 note，它带有两个公开字段：vpub_old，即从透明侧进入屏蔽 pool 的价值；以及 vpub_new，即从 pool 返回透明侧的价值。每个 JoinSplit 都必须自行平衡，其零知识证明 [zero-knowledge proof] 保证隐藏输入和隐藏输出能够正确相加。Sprout 的 pool 余额就是整条链上所有 vpub_old 减去所有 vpub_new 的累计总额。这也是 Sprout 稍后成为有用示例的原因：由于 vpub_old 是价值进入该 pool 的唯一方式，一条将其关闭的规则便可永久封闭该 pool。

在 Sapling、Orchard 和 Ironwood 中，余额通过更智能的方式证明，即使用绑定签名 [binding signature]。与其让每次转移单独平衡，整笔交易会使用价值 commitment [value commitment] 对每个隐藏金额作出 commitment。价值 commitment 是一个数字的密封信封，由同态 Pedersen commitment 构建，具有一项特殊属性：无需打开信封即可对其进行加减。网络会将所有输入 commitment 相加，减去所有输出 commitment，并将结果与交易声明的单一净数值，即其 valueBalance 字段进行比较。只有隐藏金额确实与该公开 valueBalance 匹配的交易，才能对组合 commitment 生成有效的绑定签名。如果有人试图转移比其声明更多的价值，这些 commitment 将无法相加，绑定签名将无法验证，交易会被拒绝。Ironwood 使用相同的 Orchard 协议，因此其工作方式相同。

这也是跨 pool 转移能够被安全检查的原因。当资金从一个屏蔽 pool 转移到另一个屏蔽 pool 时，例如从 Orchard 转入 Ironwood，交易无法将金额从记账中隐藏起来。每个 pool 都有自己的价值余额，必须由其自身的证明满足：Orchard 一侧必须通过其绑定签名显示匹配的流出，而 Ironwood 一侧必须通过其自身的签名显示对应的流入。离开一个 pool 的价值和进入另一个 pool 的价值均被独立证明，因此跨 pool 转移实际上是在一笔交易中发生的两次 turnstile 穿越，一次流出、一次流入，二者都会被公开计入总数，即使底层金额保持私密。

因此，turnstile 并非信任。每笔交易都会在数学上证明其自身的净效应，网络会按 pool 汇总这些经证明的净效应，而一项共识 [consensus] 规则（ZIP 209）会拒绝任何会使 pool 余额变为负数的区块。交易层面的证明，链层面的执行。

<br/>

## 为何重要

turnstile 同时为 Zcash 提供三项保障。

首先，它将风险隔离。一个 pool 中的密码学 bug 被限制在该 pool 内，因为 turnstile 阻止伪造价值跨入更广泛的供应量。

其次，它让社区能够回溯验证供应量。如果后来发现 bug，turnstile 记录会显示离开一个 pool 的价值是否曾超过进入它的价值。干净的记录是没有伪造被利用的有力证据。

第三，它在完成这一切的同时保持 pool 内支付的私密性。每笔交易只发布其流入或流出一个 pool 的净流量，而对于单个 pool 内的支付，这仅是手续费。从 Orchard 到 Ironwood 等 pool 间转移会显示跨越的金额。可审计性与隐私可以共存，这并不常见，也是 Zcash 的一项低调优势。

<br/>

## turnstile 的实际应用

turnstile 并不新鲜，它曾在 Zcash 历史上的关键时刻发挥作用。

当 Zcash 从原始 Sprout pool 转向较新的 Sapling pool 时，turnstile 守护了这一过渡。Sprout pool 后来被限制不得接收新的流入，这鼓励用户迁移，同时 turnstile 保持记账诚实。多年后，从未有价值不当地离开 Sprout 这一事实，证明其早期密码学从未被成功利用。

同样的设计如今守护着从 Orchard 到 Ironwood 的迁移。2026 年，在 Orchard 证明系统中发现并修复了一个可靠性 bug。没有证据表明它曾被利用，但由于屏蔽活动是私密的，确定性不可能实现。应对方式是封闭旧的 Orchard pool，并让所有人通过 turnstile 将资金迁移至 Ironwood，这是一个采用已修正协议的新 pool。强制资金通过 turnstile 意味着任何假设存在的伪造币都无法跟随离开，而一旦迁移完成，任何人都能确认屏蔽供应量可靠。

<br/>

## 单向 pool 弃用

turnstile 使得能够安全地、仅在一个方向上弃用旧 pool，而不会破坏供应量保证。诀窍是关闭入口，同时保持出口开放。

Sprout 是最清晰的例子。为了弃用它，ZIP 211 添加了一项单一共识规则：自其激活高度起，每个 JoinSplit 的 vpub_old 字段必须为零。由于 vpub_old 是价值进入 Sprout 的唯一方式，将其强制设为零意味着再也没有新价值能够进入，同时价值仍可流向透明侧或继续流向 Sapling。该 pool 变成了单向的。它只能排空，永远不能填充。turnstile 会始终持续计数，因此随着资金离开，余额可以下降但永远不能上升，也永远不能变为负数。

Orchard 到 Ironwood 的迁移采用了相同思路。在 NU6.3 升级中，Orchard pool 被关闭，不再接收新的流入，钱包被引导将 Orchard 资金穿过 turnstile 转入新的 Ironwood pool。Orchard 成为一个只能排空的单向 pool。由于每次流出都是必须被证明的 turnstile 穿越，任何留在 Orchard 中假设存在的伪造价值都无法悄悄跟随诚实资金离开。它被困在一个只能排空且门口受到监控的 pool 中。随着时间推移，这会推动旧 pool 接近清空，并让任何人确认流出的价值从未超过诚实流入的价值。

这正是 turnstile 超越简单记账的重要深层原因。它是让 Zcash 能够弃用屏蔽 pool 的机制，无论是为了像 Sprout 那样降低复杂性，还是为了像 Orchard 那样从已发现的 bug 中恢复，同时保持关于供应量的连续、公开、可证明的保障。

<br/>

## 常见误解

- turnstile 不会揭示谁向谁发送了什么。它确实会显示任何在 pool 之间转移 ZEC 的交易金额
- 它不会按姓名抓住伪造者。它限制能够离开 pool 的数量，而这正是保护供应量的方式
- 它不是为 Ironwood 提出的新发明。它守护了 Zcash 历史中每一次主要的屏蔽 pool 过渡
- 公开的 pool 总额不会削弱 pool 内支付的隐私。在 pool 之间转移 ZEC 会显示转移金额，这就是 ZIP 318 要求钱包随着时间以标准金额迁移的原因

<br/>

## 资源

1. [ZIP 209：禁止超出范围的链价值 pool 余额](https://zips.z.cash/zip-0209) - turnstile 背后的共识规则
2. [ZIP 211：禁用向 Sprout 链价值 pool 添加新价值](https://zips.z.cash/zip-0211) - Sprout pool 如何被关闭以禁止新的存入
3. [ZIP 258：NU6.3](https://zips.z.cash/zip-0258) - 引入 Ironwood pool 并引导价值穿过 turnstile 的升级
4. [针对伪造的 turnstile 执行](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - 来自 Electric Coin Company 的原始说明
5. [Zcash 协议规范](https://zips.z.cash/protocol/protocol.pdf) - 有关完整细节，请参阅余额和绑定签名部分
6. [价值 Pools，Zebra 书籍](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - 节点如何跟踪每个 pool 的价值余额

<br/>

## 相关页面

- [屏蔽池](https://zechub.wiki/using-zcash/shielded-pools) - Zcash 屏蔽交易如何保持细节私密
- [Halo](https://zechub.wiki/zcash-tech/halo) - Orchard pool 背后的证明系统
- [网络升级](https://zechub.wiki/start-here/network-upgrades) - Zcash 如何激活诸如新屏蔽池之类的变更
