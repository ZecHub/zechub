<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Project Tachyon

## TL;DR

- Tachyon 是对 Zcash 钱包查找和花费屏蔽资金方式的拟议重新设计，旨在让网络能够扩展至极大量的用户
- 如今，钱包必须尝试解密区块链中极大比例的数据，才能发现哪些付款属于自己；这正是屏蔽同步感觉缓慢的主要原因
- Tachyon 以**无感知同步**替代此方式，使钱包能够获取所需内容，而无需扫描全部数据，也不会向服务器透露自己想要哪些部分
- 它还将付款详情从区块链移至付款请求本身，这使协议更简单，但将责任转移给钱包
- 这是一项提案，最初发表于 2025 年 4 月。它**不是 NU7 的一部分**，也**尚未发布**，并且需要与 Sapling 升级同等规模的工程投入

<br/>

## 适合哪些读者

- 任何看过屏蔽钱包同步并想知道为何如此耗时的人
- 经常看到 Tachyon 与 NU7 和 Zcash 扩展并列提及的新手
- 想先理解理念、后了解密码学的读者

<br/>

## Tachyon 解决的问题

Zcash 隐藏付款对象。这正是其核心目的，也带来了一个棘手问题：如果没人能知道一笔付款属于谁，你自己的钱包又如何找到它？

在 Bitcoin 中，这很容易。地址是公开的，因此钱包可以询问服务器：“这个地址收到了什么？”并获得答案。Zcash 钱包不能问这个问题，因为提出这个问题会恰恰暴露屏蔽池本应隐藏的内容。

因此，Zcash 采用不同做法。发送方会加密付款详情，并将其置于交易本身中。随后，你的钱包会遍历链上的交易，并尝试逐一解密。几乎所有尝试都会失败；少数成功的就是你的付款。这被称为**试探解密**，它私密、准确，但速度缓慢。

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

问题在于工作量取决于什么。钱包所需付出的工作量由链的大小决定，而非你实际收到的付款数量。一个从未收到过任何付款的人，所做的工作几乎与每天收款的人一样多。随着 Zcash 的增长，这对所有人都会变得更糟。用该提案的话说，它“根本无法扩展”。

<br/>

## Tachyon 改变了什么

Tachyon 从根源上解决这一问题：不再将区块链用作付款秘密的传递渠道。

相反，你所需的详情会随付款请求本身通过带外方式传递。付款请求、URI 或二维码会携带过去加密进交易的信息。Sean Bowe 将其描述为首次在 Zcash 屏蔽协议中采用**带外付款**。

一旦链不再携带这些信息，你的钱包也就不再需要搜索它，试探解密问题随之消失。

不过，你的钱包仍需要知道当前链状态才能花费资金。这是该设计的另一半：**无感知同步**，即让钱包获取自己所需的特定内容，同时不向服务器透露其请求了哪些内容的方法。

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## 这对钱包用户意味着什么

- **同步不再随链增长。** 你的钱包用于追赶进度的时间将取决于你自己的活动，而不是 Zcash 的大小。
- **付款更像是把账单交给某人。** 付款请求携带收款人所需的内容，因此发送方与收款人之间的交换会比今天更加重要。
- **钱包承担更多责任。** 由于链不再保存付款详情的加密副本，丢失钱包数据会带来更大影响。备份和恢复不再是协议功能，而成为钱包软件必须妥善处理的事情。
- **一些熟悉的部分会迁移或消失。** Tachyon 将密钥多样化、查看密钥和付款地址移出核心协议，交由钱包层处理。这是提案中影响更为深远的部分之一，仍在进一步研究。

<br/>

## 面向技术读者的深入说明

Tachyon 被描述为对 Orchard 协议的反向兼容变更。它可以作为现有 Orchard 池的升级部署，也可以作为通过 [turnstile](https://zechub.wiki/zcash-tech/the-turnstile) 接入的独立屏蔽池部署；后者与 Zcash 用于 Ironwood 的机制相同。该选择影响部署方式，而不影响设计本身。

它保留了 Orchard 的若干内容：RedPallas 密钥重新随机化、同态价值承诺和绑定签名，以及允许设备委托生成证明而不交出花费权限的分区密钥结构。

扩展工作依赖于**携带证明的数据**，这是一种让数据附带其自身正确性证明的技术，因此将其与其他携带证明的数据结合后，会产生继承并扩展这些证明的结果。这使大量已验证工作能够被压缩为小巧且可快速检查的内容。由 Zcash 背后的团队发现的 Halo，使携带证明的数据变得足够实用，从而能够据此构建。

第三条主线是**屏蔽交易聚合体**，它改变了屏蔽状态变更的传递方式，并对签名机制产生连锁影响。

<br/>

## 工作进展

Tachyon 是一项**提案，而非已发布的功能**。它发表于 2025 年 4 月，2025 年 5 月的一篇后续文章探讨了共识层面的影响。它曾被列为 NU7 的候选项目——即 Ironwood 之后的下一次升级——但于 2026 年 9 月 17 日确定的 NU7 范围并不包含它：[ZIP 259](https://zips.z.cash/zip-0259) 列出了 NU7 部署的内容，而 [论坛公告](https://forum.zcashcommunity.com/t/nu7-timeline/57655) 表示其中没有新的交易格式。尚未为 Tachyon 设定激活日期。

作者自身的表述是，这是一项可执行的计划，而非推测性研究；但它需要与 Sapling 相当的工程投入，并且有些更困难的问题被有意留待以后处理。

相关工作已经可见。[Zakura](https://zechub.wiki/zcash-tech/zakura-node) 是一个于 2026 年 7 月发布的全节点，由 Project Tachyon 和 Valar Group 联合开发，并预览了其中一些网络层面的变更。[Private information retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) 研究则从不同角度解决相同的扫描瓶颈。

<br/>

## 常见误解

- **Tachyon 尚未上线。** 目前没有钱包在使用它，也没有任何升级激活了它。
- **Tachyon 与 Ironwood 不同。** Ironwood 于 2026 年 7 月激活，处理的是 Orchard 池和 turnstile。Tachyon 是一项独立且更晚提出的扩展提案。
- **Tachyon 并不降低隐私性。** 目标是在消除扩展成本的同时维持账本不可区分性，而不是以隐私换取速度。
- **zk-SNARK 验证从来不是瓶颈。** 提案明确指出，缓慢之处在于钱包如何发现和协调状态，而不是检查证明的成本。
- **Tachyon 不在 NU7 中。** 它曾被列为候选项目，但 2026 年 9 月确定的范围涵盖 25 秒区块、费用回收和版本 4 交易的终止，没有新的交易格式（[ZIP 259](https://zips.z.cash/zip-0259)）。

<br/>

## 术语表

| 术语 | 含义 |
|---|---|
| Trial decryption | 逐一尝试解密交易，以找出发送给你的交易 |
| In-band secret distribution | 将付款秘密放入区块链上的交易内部，如今 Zcash 所采用的方式 |
| Out-of-band payment | 在发送方和收款人之间直接传递付款详情，而非通过链传递 |
| Oblivious synchronization | 获取钱包所需的链数据，而不透露请求了哪些数据 |
| Proof-carrying data (PCD) | 附带自身正确性证明的数据，因此证明可以被合并和压缩 |
| Shielded transaction aggregate | Tachyon 打包屏蔽状态变更的方式，改变了它们的传递和签名方式 |
| ledger indistinguishability | 无法区分不同屏蔽交易彼此的属性 |

<br/>

## 常见问题

**这会让我的钱包同步更快吗？** 这正是目标。同步时间将取决于你自己的活动，而非链的大小。目前尚未发布任何内容，因此还没有可引用的测量数据。

**我现在需要做什么吗？** 不需要。Tachyon 是一项提案。如果被采纳，它将通过网络升级发布，并提供通常的通知。

**移除查看密钥是否意味着失去共享读取权限的能力？** 该提案将此能力从核心协议移至钱包层。其实际实现方式仍是尚待解决的问题之一。

**如果 Tachyon 发布，我的资金会有风险吗？** 部署将采用 Orchard 升级或 turnstile，两者均旨在使价值在公开记账规则下流转。Ironwood 页面解释了 turnstile 的工作方式。

<br/>

## 相关页面

- [Private Information Retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) - 针对同一钱包扫描瓶颈的另一种方法
- [Zakura 节点](https://zechub.wiki/zcash-tech/zakura-node) - 一个部分源自 Tachyon 工程投入构建的节点
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - 于 2026 年 7 月激活、常被与 Tachyon 混淆的升级
- [The Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - 若 Tachyon 作为独立池部署时可采用的机制
- [Post-Quantum Security](https://zechub.wiki/zcash-tech/post-quantum-security) - Tachyon 在长期协议工作中的位置
- [How Zcash Is Organized](https://zechub.wiki/start-here/how-zcash-is-organized) - 谁在开展这项工作，以及生态系统如何协作

<br/>

## 资源

- [Tachyon：使用无感知同步扩展 Zcash](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe，2025 年 4 月 2 日，原始提案
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe，2025 年 5 月 15 日，面向协议开发者撰写的共识与协议影响说明
- [Sean Bowe 的博客](https://seanbowe.com/blog/) - Tachyon 系列发布之处
- [tachyon.z.cash](https://tachyon.z.cash/) - 项目网站
