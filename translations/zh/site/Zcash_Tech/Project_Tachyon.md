<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 项目 Tachyon

## 简要说明

- Tachyon 是对 Zcash 钱包查找和使用屏蔽 [shielded] 资金方式的拟议重新设计，旨在让网络能够增长至极大规模的用户数量
- 如今，钱包必须尝试解密 blockchain 的很大一部分，才能发现哪些支付 [payment] 属于自己；这正是屏蔽同步感觉缓慢的主要原因
- Tachyon 以**无感同步 [oblivious synchronization]**取代这一方式，使钱包能够获取所需内容，而无需扫描一切，也不会向服务器透露它需要哪些部分
- 它还将支付详情从 blockchain 移入支付请求本身，这使协议更简单，但也将责任转移给钱包
- 这是一项于 2025 年 4 月首次发布的提案。它**不是 NU7 的一部分**，也**尚未发布**；它需要与 Sapling 升级规模相当的工程投入

<br/>

## 这适合谁

- 曾看着屏蔽钱包同步，并想知道它为何耗时如此之久的任何人
- 经常看到 Tachyon 与 NU7 及 Zcash 扩容 [scaling] 一同被提及的新手
- 希望先理解概念、再了解密码学的读者

<br/>

## Tachyon 解决的问题

Zcash 隐藏支付的接收对象。这正是其核心目的，但也带来一个棘手的问题：如果没有人能知道一笔支付属于谁，你自己的钱包如何找到它？

在 Bitcoin 中，这很容易。地址 [address] 是公开的，因此钱包可以向服务器询问："此地址收到了什么？"并得到答案。Zcash 钱包无法提出这个问题，因为提出它就会暴露屏蔽 pool 旨在隐藏的内容。

因此，Zcash 采用不同方式。发送方会加密 [encryption] 支付详情，并将其放入交易 [transaction] 本身。随后，你的钱包会逐笔处理链 [chain] 上的交易，并尝试解密每一笔。几乎所有尝试都会失败。少数成功的就是你的支付。这被称为**试探解密 [trial decryption]**，它兼具隐私、正确性与缓慢的特点。

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

问题在于这项工作所依赖的因素。你钱包付出的工作量取决于链的大小，而非你实际收到的支付数量。一个从未收到过任何支付的人，所做的工作几乎和每天收到支付的人一样多。随着 Zcash 增长，这对所有人都会变得更糟。正如提案所言，它"根本无法扩容"。

<br/>

## Tachyon 带来的改变

Tachyon 从根源上解决这个问题：它不再将 blockchain 用作支付秘密的传递渠道。

相反，你所需的详情会随支付请求本身以带外方式传递。支付请求、URI 或二维码会携带过去加密在交易中的信息。Sean Bowe 将此描述为首次在 Zcash 屏蔽协议中采用**带外支付 [out-of-band payments]**。

一旦链不再携带这些信息，你的钱包便不再需要搜索它，试探解密问题也随之消失。

不过，你的钱包仍需了解当前链状态才能使用资金。这是设计的另一半，即**无感同步**：一种让钱包获取所需特定内容、同时不向服务器透露它请求了哪些内容的方法。

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## 它对钱包用户意味着什么

- **同步不再随链增长。** 你的钱包追赶最新状态所花的时间将取决于你自己的活动，而非 Zcash 的规模。
- **支付会更像递交账单。** 支付请求携带接收方所需内容，因此发送方和接收方之间的交换会比现在更重要。
- **钱包承担更多责任。** 由于链不再保存支付详情的加密副本，丢失钱包数据的影响会更大。备份和恢复将从协议功能转变为钱包软件必须妥善处理的事项。
- **一些熟悉的组成部分会移动或消失。** Tachyon 将密钥多样化、viewing key 和支付地址移出核心协议，交由钱包层处理。这是该提案影响更深远的部分之一，仍在进一步研究中。

<br/>

## 面向技术读者的深入说明

Tachyon 被描述为对 Orchard 协议的反向兼容变更。它既可作为对现有 Orchard pool 的升级部署，也可作为通过 [turnstile](https://zechub.wiki/zcash-tech/the-turnstile) 到达的独立屏蔽池，后者与 Zcash 为 Ironwood 所使用的机制相同。该选择影响部署，而不影响设计。

它保留了 Orchard 的若干内容：RedPallas 密钥重随机化、同态价值 commitment 和绑定签名 [signature]，以及允许设备委托生成证明 [proof] 而不交出使用授权的分区密钥结构。

扩容工作依赖于**携带证明的数据 [proof-carrying data]**，这是一种数据随自身正确性证明一同传递的技术，因此将其与其他携带证明的数据结合时，会产生继承并扩展这些证明的结果。这使大量已验证工作能够被压缩为小巧且可快速检查的内容。Halo 由 Zcash 背后的团队发现，使携带证明的数据足够实用，从而能够据此构建。

第三条主线是**屏蔽交易聚合 [shielded transaction aggregates]**，它改变了屏蔽状态变更的传达方式，并对签名的运作方式产生连锁影响。

<br/>

## 工作进展

Tachyon 是一项**提案，而非已发布功能**。它于 2025 年 4 月发布，2025 年 5 月的后续文章探讨了共识 [consensus] 层面的影响。它曾被列为 NU7 的候选方案，即 Ironwood 之后的下一次升级；但 2026 年 9 月 17 日确定的 NU7 范围并不包括它：[ZIP 259](https://zips.z.cash/zip-0259) 列出了 NU7 所部署的内容，而 [论坛公告](https://forum.zcashcommunity.com/t/nu7-timeline/57655) 表示其中没有新增交易格式。Tachyon 尚未设定激活日期。

作者自己的表述是，这是一项可执行的计划，而非推测性研究；但它需要与 Sapling 相当的工程投入，并且有些更困难的问题被有意留待以后解决。

相关工作已初现端倪。[Zakura](https://zechub.wiki/zcash-tech/zakura-node) 是一个于 2026 年 7 月发布的全节点 [full node]，由项目 Tachyon 和 Valar Group 共同开发，并预览了其中一些网络层面的变更。[私有信息检索](https://zechub.wiki/zcash-tech/private-information-retrieval) 研究则从另一个角度针对同一同步扫描瓶颈。

<br/>

## 常见误解

- **Tachyon 尚未上线。** 目前没有钱包使用它，也没有任何升级激活它。
- **Tachyon 与 Ironwood 并不相同。** Ironwood 于 2026 年 7 月激活，涉及 Orchard pool 和 turnstile。Tachyon 是一项独立且较晚提出的扩容提案。
- **Tachyon 并非降低隐私。** 目标是在消除扩容成本的同时保持账本不可区分性，而不是以隐私换取速度。
- **zk-SNARK 验证从来不是瓶颈。** 提案明确指出，缓慢的部分是钱包如何发现和协调状态，而非检查证明的成本。
- **Tachyon 不属于 NU7。** 它曾被列为候选方案，但 2026 年 9 月确定的范围涵盖 25 秒区块 [block]、手续费 [fee] 回收以及版本 4 交易的终止，且没有新增交易格式（[ZIP 259](https://zips.z.cash/zip-0259)）。

<br/>

## 术语表

| 术语 | 含义 |
|---|---|
| Trial decryption | 逐笔尝试解密交易，以找出发送给你的交易 |
| In-band secret distribution | 如今 Zcash 所做的那样，将支付秘密放入 blockchain 上的交易中 |
| Out-of-band payment | 直接在发送方和接收方之间传递支付详情，而非通过链传递 |
| Oblivious synchronization | 获取钱包所需的链数据，而不透露请求了哪些数据 |
| Proof-carrying data (PCD) | 随自身正确性证明一同传递的数据，因此证明可以被组合和压缩 |
| Shielded transaction aggregate | Tachyon 将屏蔽状态变更打包的方式，改变它们的传达和签名方式 |
| ledger indistinguishability | 屏蔽交易无法彼此区分的属性 |

<br/>

## 常见问题

**这会让我的钱包同步更快吗？** 这正是目标。同步时间将取决于你自己的活动，而不是链的规模。目前尚未发布任何内容，因此还没有可引用的实测数据。

**我现在需要做什么吗？** 不需要。Tachyon 是一项提案。若被采用，它将通过网络升级 [network upgrade] 并按惯常通知方式推出。

**移除 viewing key 是否意味着失去共享读取权限的能力？** 该提案将这项能力移出核心协议，交由钱包层处理。它在实践中会是什么样子，仍是开放问题之一。

**如果 Tachyon 发布，我的资金会有风险吗？** 部署将使用 Orchard 升级或 turnstile；两者都旨在让价值在公开记账规则下流动。Ironwood 页面说明了 turnstile 的运作方式。

<br/>

## 相关页面

- [私有信息检索](https://zechub.wiki/zcash-tech/private-information-retrieval) - 针对相同钱包扫描瓶颈的另一种方法
- [Zakura 节点](https://zechub.wiki/zcash-tech/zakura-node) - 一个部分源自 Tachyon 工程投入的节点
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - 于 2026 年 7 月激活、且常被与 Tachyon 混淆的升级
- [The Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - 若 Tachyon 作为自己的 pool 部署时可使用的机制
- [后量子安全](https://zechub.wiki/zcash-tech/post-quantum-security) - Tachyon 在长期协议工作中的位置
- [Zcash 的组织方式](https://zechub.wiki/start-here/how-zcash-is-organized) - 谁在开展这项工作，以及生态系统如何协作

<br/>

## 资源

- [Tachyon：通过无感同步扩容 Zcash](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe，2025 年 4 月 2 日，原始提案
- [远距离 Tachyaction](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe，2025 年 5 月 15 日，面向协议开发者撰写的共识与协议影响说明
- [Sean Bowe 的博客](https://seanbowe.com/blog/) - Tachyon 系列的发布地点
- [tachyon.z.cash](https://tachyon.z.cash/) - 项目网站
