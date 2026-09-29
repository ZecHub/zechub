<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 区块链浏览器

## 简介

在传统商业世界中，每笔交易都包含一张购买凭证收据。同样，在区块链世界中，用户每完成一笔交易，都会获得一张以交易 ID 形式呈现的数字收据。大多数钱包都会为你提供这一信息。区块链浏览器就是让人们能够直观查看区块链上已发生事项的工具。它们接收交易 ID、地址或区块哈希作为输入，并直观地展示发生了什么。

## 示例
<div>

- Bitcoin：[c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum：[0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos：[D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash（公开）：[8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash（私密）：[19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### 请注意，Zcash 的第二笔交易隐藏了所有重要细节；这非常重要，并且在数字世界中具有深远影响。


## 区块链地图

现在我们有了这串长字符作为数字收据，接下来呢？这时我们会使用[区块链浏览器](https://nym.com/blog/using-blockchain-privately)，或称地图，来帮助我们理解区块链上发生了什么。请注意，上述每条链都有自己的[区块链浏览器](https://nym.com/blog/using-blockchain-privately)。重要的是要理解，所有这些区块链项目都是开源软件的例子。也就是说，任何人都可以贡献代码，或按照自己的喜好 fork 代码。基于这一理解，每个项目都会专注于不同领域，并定制区块链浏览器以满足该项目的需求。

### 区块
交易会被放入*区块*中。当一个区块被挖出/验证时，该区块内的每笔交易都会得到确认，并创建一个区块哈希。任何创建出的哈希都可以输入区块浏览器。你可能见过 CEX 在释放你的资金前需要一定数量的*确认*；这就是它们用于确保你的交易已充分最终确认的指标。区块链如何决定哪些交易会进入下一个区块？这是一个复杂的研究课题，但大多数现代链使用*费用*这一概念来决定谁能排到队伍前面。费用越高，你越有可能排到队列前方。

### 地址

直观学习[区块链浏览器](https://nym.com/blog/using-blockchain-privately)的一个有趣方法，是输入任意随机交易的地址。然后你可以沿时间回溯，看看资金源自哪里！每笔交易都有输入地址和输出地址。掌握了这些信息后，人们可以轻松地从任何已花费的交易向前或向后追踪。对于喜欢解谜的人来说，这相当于一个巨大的数字金融谜题，也可用于提升透明度。使用区块链浏览器不仅让这一过程更容易直观理解，*还凸显了*交易隐私的必要性。除非你使用的是隐私保护的 Zcash，否则你可以对*任何*透明区块链进行这样的追踪：BTC、ETH、ATOM、DOGE、VTC 等……。对于希望安全使用区块链并迈向纯数字未来的任何人来说，这一点至关重要。

### 金额

与上文的地址类似，公链上的任何交易都会将金额完全公开展示。这包括任何交易的输入地址和输出地址上的金额。其中一个例外是你选择使用 Shielded Zcash 时——此时所有金额都会被隐藏。对于因*公平交易*而必然需要隐私的小企业主来说，这是一项巨大优势！

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### 浏览器在 Zcash 上能看见与不能看见的内容

#### 简而言之
- 透明（`t`）地址在浏览器中完全可见，就像 Bitcoin 一样
- 完全屏蔽的（z 到 z）交易会隐藏金额、地址和备注
- 即使是完全屏蔽的交易，费用仍然可见
- 屏蔽（将 `t` 转入屏蔽池）和解除屏蔽（从屏蔽池转回 `t`）部分可见，因为其中一侧是透明的
- 只有资金始终留在屏蔽池中，隐私才能得到保障

Zcash 不止一种地址类型，而浏览器对待它们的方式截然不同。

以 `t` 开头的透明地址和 Bitcoin 的运作方式相同。浏览器会显示发送方、接收方、金额，以及资金来源的追踪路径。

屏蔽地址则是私密的一面。Sapling 或 Orchard [屏蔽池](https://zechub.wiki/using-zcash/shielded-pools#content)中的资金受到零知识证明的保护。查询一笔完全屏蔽的交易时，浏览器无法显示金额、地址或备注。它只能确认一笔有效交易发生并被记录在区块中。这就是本页顶部附近展示的隐藏私密示例。

即使对于完全屏蔽的交易，仍有一个细节可见：费用。Zcash 共识规则要求透明费用必须明确列出，因此浏览器始终可以显示它，即使金额被隐藏也是如此。因此，最好使用标准钱包费用，以免你的交易因支付了异常金额而显得突出。

浏览器也可以看到资金何时在透明和屏蔽两侧之间转移。将 `t` 资金转入池中称为屏蔽，将它们转回称为解除屏蔽。由于其中一侧是透明的，这些跨越部分可见。只有完全私密的 z 到 z 活动——从不接触 `t` 地址——才能隐藏除费用外的一切信息。

要点是：隐私取决于资金是否留在屏蔽池内。一旦资金接触 `t` 地址，其历史的那一部分就和 Bitcoin 一样公开。若要向你选择的人（例如会计师）证明自己的屏蔽活动，请分享 viewing key，而不是将其公开。请参阅[Viewing Key](https://zechub.wiki/zcash-tech/viewing-keys#content)页面。


### Zcash 区块浏览器列表

- [Zcash 区块浏览器](https://mainnet.zcashexplorer.app/)

- [Blockchair](https://blockchair.com)

- [3xpl](https://3xpl.com/zcash)

- [Bitquery](https://explorer.bitquery.io/zcash)


### 图示指南

以下是四个不同区块链浏览器的优秀示例：

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash 区块浏览器](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
