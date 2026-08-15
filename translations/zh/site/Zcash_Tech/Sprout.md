---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Sprout

> Zcash 于 2016 年 10 月 28 日上线，并启用了 Sprout 屏蔽池。

你将了解到的要点：Sprout 是 Zcash 的起点，这是私密且可验证的货币第一次在真实运行的 blockchain 上落地。

Sprout 是 Zcash 网络最初的发布版本，而不是后来的[网络升级](../start-here/network-upgrades)。它于 2016 年 10 月 28 日在创世区块时正式上线。Sprout 没有由某个编号的 ZIP 来定义：ZIP 流程是在之后的 Overwinter 才开始的，因此 Sprout 是由最初的 Zcash 协议规范以及其所基于的 Zerocash 构造来描述的。[Electric Coin Company](../zcash-organizations/electric-coin-company)（当时名为 Zerocoin Electric Coin Company）在 Zooko Wilcox 的带领下构建并发布了它。Sprout 引入了首个实用的 zk-SNARK 屏蔽交易以及最初的屏蔽池，因此人们可以在发送 ZEC 时隐藏发送方、接收方和金额，同时网络仍然能够检查余额是否相符。这个名字传达出一条年轻、正在萌芽的链，团队也预期它会继续成长。

为什么这很重要。在 Sprout 之前，所有公开 blockchain 都会把你的支付记录暴露出来：任何人都能看到谁向谁支付了多少。Sprout 是第一个真实运行、无需许可的网络，能够隐藏这些细节，同时仍然证明没有人作弊。这对普通的金融隐私至关重要，也就是你期望从现金或只有自己能查看的银行对账单中获得的那种隐私。它还证明了强大的链上隐私不仅停留在论文设计中，而是可以在实践中真正运行。使这一切成为可能的可信设置 Ceremony，也成为后来密码学工作的一个重要参照点；而 Sprout 所采用的缓慢且高度依赖内存的证明系统，也正是推动团队在两年后构建 Sapling 的直接原因。

## 第一个屏蔽池

Sprout 创建了两种地址。透明地址（t-address）像 Bitcoin 一样，细节会显示在公开账本上。屏蔽地址（z-address）则将资金发送到 Sprout 的[屏蔽池](../using-zcash/shielded-pools)中，在那里发送方、接收方和金额都会被隐藏。其关键技术是[zk-SNARKs](../zcash-tech/zk-snarks)，也就是零知识证明，它能让一笔交易在不泄露任何细节的前提下，证明其有效、没有双花且收支平衡。Sprout 是这项技术首次在真实运行的加密货币生产环境中落地。

![透明交易会暴露发送方、接收方和金额，而 Sprout 屏蔽交易会隐藏这三者，同时仍然可验证](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Ceremony

Sprout 中的 zk-SNARKs 需要一组公共参数，而安全生成这些参数需要一次性的初始化过程，这就是 Ceremony。六位位于不同且相距遥远地点的参与者各自生成了一部分秘密，被称为 toxic waste。如果有人将所有这些部分重新拼合起来，他们就可能凭空伪造出 ZEC。这个设计把风险转化为一条简单规则：只要至少有一位参与者销毁了自己的那一部分，完整的秘密就永远无法被重建，因此伪造就不可能发生。已公开身份的参与者包括 Zooko Wilcox、Andrew Miller、Peter Van Valkenburgh、Peter Todd，以及 NCC Group 的 Derek Hinch。还有一位参与者选择保持匿名。

![Ceremony：六位参与者生成私密碎片，然后销毁 toxic waste，最终只留下公开的 Sprout 参数](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## 起源

Sprout 是之后所有变更所建立的基线。当网络升级机制随着 Overwinter 一起到来时，它将原始规则标记为共识分支 id 0，这只是表示尚未应用任何升级。此后的一切（Overwinter、Sapling、Blossom、Heartwood、Canopy、NU5、NU6，以及后续版本）都建立在由 Sprout 启动的这条链之上。该发布于 2016 年 8 月宣布，创世时间定于 10 月 28 日；Ceremony 在此前几周进行；而创世区块中硬编码的时间戳显示为 2016 年 10 月 28 日 07:56 UTC。

![从 2016 年 8 月的发布公告，到参数 Ceremony，再到 2016 年 10 月 28 日的 Sprout 上线时间线](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## 术语表

| 术语 | 通俗含义 |
|---|---|
| zk-SNARK | 一种零知识证明，可在不泄露发送方、接收方或金额的情况下证明交易有效 |
| Shielded pool | Zcash 的私密部分，金额和参与方都会被隐藏。Sprout 池是第一个 |
| z-address and t-address | z-address 是屏蔽地址，可保护细节隐私。t-address 是透明地址，会在公开账本上显示细节 |
| The Ceremony | 2016 年进行的多方初始化过程，用于生成 Sprout 的公共参数，随后销毁 toxic waste |
| Toxic waste | Ceremony 产生的秘密密钥片段，必须被销毁，这样 ZEC 才无法被伪造 |
| Consensus branch id 0 | Sprout 规则的标签，表示任何网络升级之前的基线 |

## 常见问题

Sprout 会改变我今天的 ZEC 或我的隐私吗？不会。Sprout 是历史，是开启这条承载你 ZEC 的链的最初发布。你今天的币和隐私取决于你现在使用的钱包和屏蔽池，而不是你需要为 Sprout 做任何事。

为什么 Sprout 没有 ZIP 编号？ZIP 流程是在之后的 Overwinter 升级中才开始的。Sprout 是最初的发布版本，由 Zcash 协议规范以及其所基于的 Zerocash 构造来描述。ZIP 200 只是事后提到 Sprout，把它称为共识分支 id 0，也就是任何升级之前的基线。

我当时需要信任 Ceremony 中的六个人吗？这个设置的设计使你只需要其中一人诚实即可。每个人都持有一部分秘密，只要哪怕只有一位参与者销毁了自己的那一部分，完整秘密就永远无法被重建，也就没有人能伪造 ZEC。其中五位参与者已公开身份，另一位保持匿名。

Sprout 池是我现在钱包使用的那个池吗？很可能不是。Sprout 是第一个屏蔽池，但后续升级如 Sapling 引入了更快的屏蔽设计，如今大多数钱包使用的是更新的池。Sprout 仍然重要，因为正是它证明了私密且可验证的交易可以在真实运行的网络上实现。

Sprout 与 Bitcoin 的不同之处是什么？Bitcoin 会把每一笔支付记录放在公开账本上，金额和地址都可见。Sprout 增加了屏蔽交易，能够隐藏发送方、接收方和金额，同时仍让网络确认交易有效。它也保留了透明地址，因此这两种模式都存在于同一条链上。

## 测试你的理解

Sprout 常被称为具有激活高度的一次网络升级。为什么这种说法并不完全准确？

<details>
<summary>答案</summary>

Sprout 是 Zcash 的最初发布，而不是后来的升级。它自 2016 年 10 月 28 日创世区块（区块 0）起就已生效，因此并不存在某个可指向的激活高度。网络升级机制是在之后才出现的，并将 Sprout 的规则标记为共识分支 id 0，也就是任何升级之前的基线。
</details>

### 资源

[ZIP 200：网络升级机制](https://zips.z.cash/zip-0200)

[Zcash 网络升级](https://z.cash/upgrade/)

[Electric Coin Company：Zcash Sprout 发布](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company：Ceremony 的设计](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### 另请参阅

[屏蔽池](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Zcash 网络升级](../start-here/network-upgrades)

[什么是 ZEC 和 Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

系列：[网络升级索引](../start-here/network-upgrades) · 下一篇：[Overwinter](../zcash-tech/overwinter)
