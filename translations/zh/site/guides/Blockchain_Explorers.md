<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 区块链浏览器

## 简介

在传统商业世界中，每笔交易都包含一张作为购买证明的收据。同样，在 blockchain 世界中，用户每完成一笔交易，都会收到一份以交易 ID 形式呈现的数字收据。大多数钱包都会为你提供这一信息。区块链浏览器只是让人们能够直观查看 blockchain 上已发生事件的工具。它们接收交易 ID、地址或区块哈希作为输入，并以可视化方式展示发生了什么。

## 示例
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash（公开）: [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://mainnet.zcashexplorer.app/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash（私密）: [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://mainnet.zcashexplorer.app/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### 请注意，使用 Zcash 时，第二笔交易的所有重要细节都被隐藏了；这很重要，并且在数字世界中具有深远影响。


## 区块链地图

现在我们有了这串作为数字收据的长字符，接下来该怎么办？这时我们会使用 [区块链浏览器](https://nym.com/blog/using-blockchain-privately)，也就是地图，来帮助我们理解 blockchain 上发生的事情。请注意，上方每条链都有自己的 [区块链浏览器](https://nym.com/blog/using-blockchain-privately)版本。重要的是要理解，所有这些 blockchain 项目都是开源软件的例子。也就是说，任何人都可以贡献代码，或按自己的喜好 fork 代码。基于这一理解，每个项目都会专注于不同领域，并定制区块链浏览器以适应该项目的需求。

### 区块
交易会被放入*区块 [blocks]*中。当一个区块被挖矿/验证时，该区块内的每笔交易都会得到确认，并创建一个区块哈希。任何创建出的哈希都可以输入区块浏览器。你可能见过 CEX 在释放你的资金前需要若干次*确认 [confirmations]*；这正是它们用来确保你的交易已充分最终确定的指标。blockchain 如何决定哪些交易会进入下一个区块？这是一个复杂的研究课题，但大多数现代链使用*手续费 [fees]*的理念来决定谁能排到队伍前面。手续费越高，你排到队首的可能性就越大。

### 地址

一种直观了解 [区块链浏览器](https://nym.com/blog/using-blockchain-privately) 的有趣方式，是输入任意一笔随机交易的地址。然后你可以回溯时间，查看资金来自哪里！每笔交易都有输入地址和输出地址。掌握这一信息后，人们可以轻易地从任何已花费的交易向前和向后追溯。对于喜欢解谜的人来说，这相当于一个巨大的数字金融谜题，也可用于实现透明度。使用区块链浏览器不仅更容易直观查看，它*还突显了*交易隐私的必要性。除非你使用屏蔽 Zcash，否则你可以对*任何*透明 blockchain 执行此操作：BTC、ETH、ATOM、DOGE、VTC 等等……。对于希望安全使用 blockchain 并迈向纯数字未来的任何人来说，这一点至关重要。

### 金额

与上文的地址类似，公开 blockchain 上的任何交易都会公开展示金额。这包括任何交易的输入地址和输出地址上的金额。其中一个例外是当你选择使用屏蔽 Zcash 时——此时所有金额都会被隐藏。对于因*公平贸易 [fair trade]*而必然需要隐私的小企业主来说，这是一项巨大优势！

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### 浏览器在 Zcash 上能看到和不能看到的内容

#### 简而言之
- 透明（`t`）地址在浏览器上完全可见，就像 Bitcoin 一样
- 完全屏蔽（z 到 z）交易会隐藏金额、地址和备忘录
- 即使是完全屏蔽交易，手续费仍然可见
- 屏蔽（将 `t` 转入屏蔽）和解除屏蔽（从屏蔽转回 `t`）部分可见，因为其中一侧是透明的
- 只有资金留在屏蔽池内，隐私才能得到保障

Zcash 有不止一种地址类型，浏览器对待它们的方式也截然不同。

以 `t` 开头的透明地址与 Bitcoin 类似。浏览器会显示发送方、接收方、金额，以及资金来源的追溯路径。

屏蔽地址是私密的一面。位于 Sapling 或 Orchard [屏蔽池](https://zechub.wiki/using-zcash/shielded-pools#content) 中的资金受到零知识证明保护。查询一笔完全屏蔽交易时，浏览器无法显示金额、地址或备忘录。它只能确认一笔有效交易已发生并被记录在区块中。这就是本页顶部附近展示的隐藏私密示例。

即使对于完全屏蔽交易，仍有一个细节可见：手续费。Zcash 共识规则要求透明手续费必须明确列出，因此浏览器始终可以显示它，即使金额被掩盖也是如此。因此，建议使用标准钱包手续费，以免你的交易因支付异常金额而显得突出。

浏览器也能看到资金何时在透明和屏蔽两侧之间流动。将 `t` 资金转入一个 pool 是屏蔽，将其转回则是解除屏蔽。由于其中一侧是透明的，这些跨越操作部分可见。只有完全私密的 z 到 z 活动，即从不触及 `t` 地址的活动，才能隐藏除手续费以外的所有内容。

要点是：隐私取决于资金留在屏蔽池内。一旦资金触及 `t` 地址，其历史的该部分就会像 Bitcoin 一样公开。若要向你选择的人证明自己的屏蔽活动，例如会计师，请分享 viewing key，而不是将其公开。请参阅 [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) 页面。


### Zcash 区块浏览器列表

- [Zcash 区块浏览器](https://mainnet.zcashexplorer.app/)

- [3xpl](https://3xpl.com/zcash)

- [ShieldedScan](https://shieldedscan.xyz)

- [ZecBlock](https://zecblock.com/)

- [SoChain](https://sochain.com/zec)（[测试网](https://sochain.com/zectest)）



### 视觉指南

以下是 4 个不同区块链浏览器的优秀示例：

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash 区块浏览器](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
