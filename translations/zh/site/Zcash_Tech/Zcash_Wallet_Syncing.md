<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 钱包 [Wallet] 同步

## TL;DR

* 由于屏蔽 [shielded] Zcash 交易 [transactions] 会隐藏其详细信息，服务器无法像查询 Bitcoin 或 Ethereum 等透明 [transparent] 货币那样，直接查找钱包的余额。
* 轻钱包会从专用服务器（lightwalletd）下载小型"紧凑区块 [compact blocks]"，并使用自己的私钥自行解密相关数据。
* 解密和处理这些区块需要时间，因此钱包会使用更快的同步方法，让你能更早使用资金。
* 值得注意的方法包括：Warp Sync（YWallet）、先支付后同步 [Spend-before-sync]（Zcash Mobile Wallet SDK V2）、Blaze Sync（Zecwallet）以及提议中的 DAGSync。
* 这些方法通常以额外的内存或处理能力换取更快的同步速度。

## 核心说明 [Core Explanation]

### Zcash 同步的工作原理

Zcash 使用零知识 [zero-knowledge] 证明 [proofs] 来保护交易详细信息，使其不被未经授权的各方获取。这种隐私 [privacy] 使轻钱包的同步更加困难，因为它们不会在本地存储完整 blockchain，而是依赖服务器提供必要的信息。对于 Bitcoin 或 Ethereum，服务器可以索引 blockchain 并快速返回账户数据。但对于 Zcash，服务器无法看到交易详细信息。那么，轻钱包如何在不自行下载和解密整个 blockchain 的情况下同步其余额和历史记录？

Zcash 通过结合多种方法解决了这个问题。它设有专用服务器 lightwalletd，该服务器从全节点 [full node] 筛选数据，并仅保留识别交易所需的数据。这些数据称为紧凑区块，且比原始区块小得多。轻钱包首先从 lightwalletd 服务器下载这些紧凑区块，然后使用私钥解密它们。

即使只是解密和处理这些紧凑区块，也可能需要大量时间，尤其是在每个区块中包含许多交易时。因此，钱包会使用不同方法加快同步速度，让你能够尽快使用资金。

## 视觉化 / 类比

将 blockchain 想象成一间装满上锁箱子的巨大收发室。对于透明货币，收发室职员可以读取标签，并立刻告诉你哪些箱子属于你。对于 Zcash，标签被隐藏了——因此你的钱包必须带着密钥，悄悄自行检查箱子，以找出它能够打开的箱子。以下同步方法是更快检查这些箱子的不同策略。

## 深入探讨 [Deep Dive]

### Warp Sync

Warp sync 是 YWallet 的一项功能，它会跳过解密和处理每个紧凑区块的中间步骤，直接跳至最终结果。

为此，它使用数学和密码学，在不经历每一步的情况下计算最终结果。

Warp sync 每秒可以处理数千个区块，远快于通常的同步方法。这意味着即使账户中有数十万笔交易和收到的 note，YWallet 用户也能享受快速流畅的性能。

除了这种跳过步骤的技术外，YWallet 还可以同时处理多个区块，将负载分配到可用硬件上，使过程更快。

在 [Warp Sync](https://ywallet.app/warp/) 上阅读更多内容

> 此处将 Warp sync 描述为一种同步技术。Ywallet 本身已不再维护，也不会针对 Ironwood 更新，因此它不是如今应安装的钱包。

### 先支付后同步

先支付后同步是 Zcash Mobile Wallet SDK V2 中的一项新功能，允许用户在打开钱包后立即支付资金，无需等待完整的钱包同步。该功能可加快发现钱包可支付余额的速度，并改善用户体验。

先支付后同步通过使用紧凑区块同步算法来实现，该算法以非线性顺序处理来自 lightwalletd 服务器的区块。这意味着钱包无需等待一个区块完全处理后再继续，而是可以使用稍多的内存和处理能力来扫描 blockchain 的不同部分。通常，它会扫描不同范围，在下载和处理较旧区块的同时查找较新的交易。如果发现最近且未支付的 note，它将立即可用。

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Blaze sync 由 Zecwallet 团队开发，是一种适用于轻钱包的同步算法。它从最高、最新的区块开始，向后扫描 blockchain。

这使钱包能够先找到已支付的 note，再找到收到的 note，同时无需等待完整同步过程结束，即可提供之前未支付的 note。

此外，它通过将同步组件彼此解耦——下载区块、执行试探性解密以及更新见证——并行处理它们，来使用乱序同步 [Out-of-Order Sync]。这会占用更多内存和 CPU 资源，但可将同步速度提高 5 倍。

### DAGSync

DAGSync 是一种提议中的同步算法，旨在通过加快同步来改善 Zcash 屏蔽钱包的用户体验。

它使用 [有向无环图 Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) 来表示 Zcash 钱包中 note、见证和 nullifier 之间的依赖关系。

DAG 是一种由节点 [nodes] 和边组成的数据结构，其中每条边都有一个方向，用于表示两个节点之间的关系。DAG 没有环，这意味着无法从一个节点出发，沿着边返回同一节点。

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## 实际影响 [Practical Implications]

有趣的是，所有这些机制都旨在解决 Zcash Security 在其关于 [可扩展私密消息传递 Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) 的文章中提出的问题，以及它与私密支付系统之间的关系。有些机制甚至会进一步从服务器下载所有备忘录 [memo] 数据，但地址专属的数据除外，以少量额外资源为代价提升隐私。

此外，Zcash Foundation 一直在研究其他替代方案，以改善轻钱包的性能。[遗忘消息检索 Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/) 就是一个例子，基金会一直在研究这一构造，"以确定它是否能为近期影响 Zcash 钱包用户的性能问题提供潜在解决方案。"

## 常见错误 [Common Mistakes]

**假设 lightwalletd 服务器知道你的余额。** 服务器只会提供紧凑区块；你的钱包会使用自己的密钥在本地解密并解释它们。

**过早停止同步。** 有些方法会在完整同步完成前提供最近可支付的资金，但较早的历史记录和 note 可能仍在处理中。

**将 Zcash 同步直接与透明链同步进行比较。** 较慢的路径可能是保护隐私的代价，而非缺陷——钱包正在执行原本由公开货币服务器通过公开读取你的账户来完成的工作。


## 相关页面 [Related Pages]

- [轻钱包节点 Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — 轻钱包所依赖的 lightwalletd 基础设施。
- [Viewing Key](/zcash-tech/viewing-keys) — 钱包用来检测和解密自身 note 的密钥。
- [Pepper Sync](/zcash-tech/pepper-sync) — 另一种 Zcash 钱包同步方法。
- [FROST](/zcash-tech/frost) — 屏蔽 ZEC 的分布式签名授权。
