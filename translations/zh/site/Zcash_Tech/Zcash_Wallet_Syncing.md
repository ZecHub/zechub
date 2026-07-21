<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zcash 钱包同步

## TL;DR

* 由于受屏蔽的 Zcash 交易会隐藏其细节，服务器无法像处理 Bitcoin 或 Ethereum 这类透明币那样，直接查询钱包余额。
* 轻钱包会从专用服务器（lightwalletd）下载小型的“compact blocks”，并使用自己的私钥自行解密相关数据。
* 解密和处理这些区块需要时间，因此钱包会采用更快的同步方法，让你能更早使用资金。
* 代表性方案包括：Warp Sync（YWallet）、Spend-before-sync（Zcash Mobile Wallet SDK V2）、Blaze Sync（Zecwallet）以及提议中的 DAGSync。
* 这些方法通常是以额外的内存或处理能力为代价，换取更快的同步速度。

## 核心解释

### Zcash 同步是如何工作的

Zcash 使用零知识证明来保护交易细节，不让未授权方查看。这种隐私特性让轻钱包的同步变得更困难，因为它们不会在本地存储完整区块链，而是依赖服务器提供所需信息。对于 Bitcoin 或 Ethereum，服务器可以索引区块链并快速返回账户数据。但对于 Zcash，服务器无法看到交易细节。那么，轻钱包如何在不自行下载并解密整条区块链的情况下，同步其余额和历史记录呢？

Zcash 通过结合多种方法解决了这个问题。它有一个专用服务器 lightwalletd，会从全节点中过滤数据，只保留识别交易所需的内容。这些数据称为 compact blocks，体积比原始区块小得多。轻钱包会先从 lightwalletd 服务器下载这些 compact blocks，然后使用自己的私钥进行解密。

即使只是解密和处理这些 compact blocks，也可能花费相当长的时间，尤其是在每个区块中交易很多的情况下。因此，钱包会采用不同的方法来加速同步，让你能尽快使用资金。

## 可视化 / 类比

可以把区块链想象成一个装满上锁箱子的巨大收发室。对于透明币，收发室管理员可以读取标签，并立刻告诉你哪些箱子是你的。而在 Zcash 中，标签被隐藏了——所以你的钱包必须拿着自己的钥匙，悄悄逐个检查箱子，找出哪些是自己能打开的。下面的同步方法，就是用来更快检查这些箱子的不同策略。

## 深入解析

### Warp Sync

Warp sync 是 YWallet 的一项功能，它会跳过逐个解密和处理每个 compact block 的中间步骤，直接到达最终结果。

为此，它使用数学和密码学方法，在不经过每一步的情况下计算出最终结果。

Warp sync 每秒可处理数千个区块，比常规同步方法快得多。这意味着，即使账户中有数十万笔交易和收到的 notes，YWallet 用户仍然可以获得快速流畅的体验。

除了这种跳步技术之外，YWallet 还可以同时处理多个区块，将负载分配到你可用的硬件上，从而进一步加快处理速度。

阅读更多：[Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync

Spend-before-sync 是 Zcash Mobile Wallet SDK V2 中的一项新功能，它允许用户在打开钱包后立即花费资金，而无需等待钱包完成全部同步。此功能加快了对钱包可花费余额的发现速度，并改善了用户体验。

Spend-before-sync 的工作方式是使用一种 compact-blocks 同步算法，以非线性顺序处理来自 lightwalletd 服务器的区块。这意味着，钱包不必等一个区块被完全处理后再继续下一个，而是可以多使用一点内存和处理能力，扫描区块链的不同部分。通常，它会扫描不同的范围，在下载和处理旧区块的同时寻找较新的交易。如果发现最近且未花费的 note，它会立即将其提供使用。

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Blaze sync 由 Zecwallet 团队开发，是一种面向轻钱包的同步算法。它会从区块链末端开始反向扫描，也就是从最新、区块高度最高的区块开始，向后回溯。

这样一来，钱包可以先找到已花费的 notes，再找到收到的 notes，同时无需等待完整同步过程结束，就能让先前未花费的 notes 可用。

除此之外，它还通过将同步的各个组成部分彼此解耦来实现 Out-of-Order Sync——包括下载区块、执行试探性解密以及更新 witnesses——并对这些步骤进行并行处理。这会占用更多内存和 CPU 资源，但可将同步速度提高 5 倍。

### DAGSync

DAGSync 是一种提议中的同步算法，旨在通过加快同步速度来改善 Zcash 受屏蔽钱包的用户体验。

它使用一个[有向无环图（DAG）](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/)来表示 Zcash 钱包中 notes、witnesses 和 nullifiers 之间的依赖关系。

DAG 是一种由节点和边组成的数据结构，其中每条边都有方向，用于表示两个节点之间的关系。DAG 不存在环，这意味着你无法从某个节点出发，沿着边再回到同一个节点。

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## 实际影响

有意思的是，所有这些机制都旨在回应 Zcash Security 在其关于[可扩展的私人消息传递](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/)的文章中提出的问题，以及它与私人支付系统之间的关系。其中有些方案甚至更进一步，会从服务器下载所有 memo 数据，除了某个地址独有的数据之外，从而以少量额外资源为代价提高隐私性。

此外，Zcash Foundation 也一直在研究其他方案，以提升轻钱包的性能。[Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/) 就是一个例子。基金会一直在研究这一构造，“以确定它是否能为近期影响 Zcash 钱包用户的性能问题提供潜在解决方案”。

## 常见错误

**认为 lightwalletd 服务器知道你的余额。** 服务器只会传送 compact blocks；你的钱包会使用自己的密钥在本地对其进行解密和解释。

**过早停止同步。** 有些方法会在完整同步结束前，让最近可花费的资金先可用，但较早的历史记录和 notes 可能仍在处理中。

**将 Zcash 同步直接与透明链同步进行比较。** 较慢的流程可能是保护隐私所付出的代价，而不是缺陷——钱包正在执行本应由公链服务器通过公开读取你的账户来完成的工作。


## 相关页面

- [Lightwallet 节点](/zcash-tech/lightwallet-nodes) — 轻钱包所依赖的 lightwalletd 基础设施。
- [Viewing Key](/zcash-tech/viewing-keys) — 钱包用来识别并解密自身 notes 的密钥。
- [Pepper Sync](/zcash-tech/pepper-sync) — Zcash 钱包同步的另一种方法。
- [FROST](/zcash-tech/frost) — 用于受屏蔽 ZEC 的分布式签名授权。
