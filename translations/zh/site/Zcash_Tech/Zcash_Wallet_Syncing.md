<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zcash 钱包同步

## TL;DR

* 由于受保护的 Zcash 交易会隐藏其细节，服务器无法像查询 Bitcoin 或 Ethereum 等透明币种那样直接查找钱包余额。
* 轻钱包会从专用服务器（lightwalletd）下载较小的“紧凑区块”，并使用私钥自行解密相关数据。
* 解密和处理这些区块需要时间，因此钱包会采用更快的同步方法，让你能更早使用资金。
* 值得关注的方法包括 Warp Sync（YWallet）、Spend-before-sync（Zcash Mobile Wallet SDK V2）、Blaze Sync（Zecwallet），以及提议中的 DAGSync。
* 这些方法通常以额外的内存或处理能力换取更快的同步速度。

## 核心说明

### Zcash 同步如何运作

Zcash 使用零知识证明来保护交易细节，避免未获授权的参与方查看。这种隐私性使轻钱包的同步更加困难，因为它们不会在本地存储完整 blockchain，而是依赖服务器提供必要信息。对于 Bitcoin 或 Ethereum，服务器可以为 blockchain 建立索引并快速返回账户数据。但对于 Zcash，服务器无法看到交易细节。那么，轻钱包如何在不自行下载和解密整个 blockchain 的情况下同步其余额和历史记录？

Zcash 通过结合多种方法解决这一问题。它有一个专用服务器 lightwalletd，可从全节点筛选数据，仅保留识别交易所需的内容。这些数据称为紧凑区块，体积远小于原始区块。轻钱包会先从 lightwalletd 服务器下载这些紧凑区块，再使用私钥对其解密。

即使只是解密和处理这些紧凑区块，也可能需要大量时间，尤其是在每个区块包含许多交易时。因此，钱包使用不同的方法来加快同步，并让你尽快使用资金。

## 可视化 / 类比

把 blockchain 想象成一个装满上锁盒子的大型收发室。对于透明币种，收发室管理员可以读取标签，立刻告诉你哪些盒子属于你。对于 Zcash，标签被隐藏了——因此你的钱包必须拿着密钥，悄悄自行检查盒子，找出能够打开的那些。下面的同步方法是更快检查这些盒子的不同策略。

## 深入探讨

### Warp Sync

Warp sync 是 YWallet 的一项功能，它跳过解密和处理每个紧凑区块的中间步骤，直接得到最终结果。

为此，它使用数学和密码学来计算最终结果，而无需经历每一个步骤。

Warp sync 每秒可处理数千个区块，远快于通常的同步方法。这意味着，即使账户中有数十万笔交易和收到的票据，YWallet 用户也能获得快速流畅的体验。

除了这种跳步技术外，YWallet 还可以同时处理多个区块，将负载分配到可用硬件上，使过程更加快速。

阅读更多：[Warp Sync](https://ywallet.app/warp/)

> 此处将 Warp sync 描述为一种同步技术。Ywallet 本身已不再维护，也不会针对 Ironwood 更新，因此如今不建议安装该钱包。

### Spend-before-sync

Spend-before-sync 是 Zcash Mobile Wallet SDK V2 的一项新功能，允许用户在打开钱包后立即使用资金，无需等待钱包完成完整同步。该功能加快了钱包可花费余额的发现，并改善了用户体验。

Spend-before-sync 通过使用一种以非线性顺序处理 lightwalletd 服务器区块的紧凑区块同步算法来实现。这意味着，钱包无需等待一个区块被完全处理后再继续，而是可以使用略多一些的内存和处理能力来扫描 blockchain 的不同部分。通常，它会扫描不同范围：在下载和处理较旧区块的同时查找较新的交易。如果发现近期未花费的票据，该票据会立即可用。

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Blaze sync 由 Zecwallet 团队开发，是一种面向轻钱包的同步算法：它从最高、最新的区块开始，向后扫描 blockchain。

这使钱包能够先找到已花费的票据，再找到已接收的票据，同时让此前未花费的票据无需等待完整同步过程结束即可使用。

此外，它还通过将同步的各组件彼此解耦——下载区块、执行试探性解密以及更新见证——并行处理它们，来使用 Out-of-Order Sync。这会占用更多内存和 CPU 资源，但可将同步速度提高 X5。

### DAGSync

DAGSync 是一种提议中的同步算法，旨在通过加快同步来改善 Zcash 受保护钱包的用户体验。

它使用[有向无环图（DAG）](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/)来表示 Zcash 钱包中票据、见证和无效器之间的依赖关系。

DAG 是一种由节点和边组成的数据结构，其中每条边都有一个方向，表示两个节点之间的关系。DAG 没有环，这意味着无法从一个节点出发，沿着边回到同一个节点。

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## 实际影响

有趣的是，所有这些机制都旨在回应 Zcash Security 在其关于[可扩展私密消息传递](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/)的文章中提出的问题，以及这些问题与私密支付系统之间的关系。其中一些甚至更进一步，从服务器下载所有 memo 数据，只有某个地址专属的数据除外；这以少量额外资源为代价提高了隐私性。

此外，Zcash Foundation 一直在研究其他替代方案以提升轻钱包性能。其中一个例子是[不经意消息检索（OMR）](https://zfnd.org/oblivious-message-retrieval/)，这是一种该基金会正在研究的构造，“旨在确定它是否能为近期影响 Zcash 钱包用户的性能问题提供潜在解决方案。”

## 常见错误

**假设 lightwalletd 服务器知道你的余额。** 服务器只提供紧凑区块；你的钱包会使用自己的密钥在本地解密并解释它们。

**过早停止同步。** 某些方法可在完整同步完成前让近期可花费资金可用，但较早的历史记录和票据可能仍在处理中。

**将 Zcash 同步直接与透明链同步比较。** 较慢的路径可能是保护隐私的代价，而非缺陷——钱包正在执行原本会由公开币种服务器通过公开读取你的账户来完成的工作。


## 相关页面

- [轻钱包节点](/zcash-tech/lightwallet-nodes) — 轻钱包所依赖的 lightwalletd 基础设施。
- [查看密钥](/zcash-tech/viewing-keys) — 钱包用于检测和解密自身票据的密钥。
- [Pepper Sync](/zcash-tech/pepper-sync) — 另一种 Zcash 钱包同步方法。
- [FROST](/zcash-tech/frost) — 用于受保护 ZEC 的分布式签名权限。
