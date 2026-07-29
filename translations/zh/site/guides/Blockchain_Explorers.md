<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 区块链浏览器

## 简介

在传统商业世界中，每笔交易都会附带一张收据，作为购买凭证。类似地，在区块链世界中，用户每完成一笔交易，都会收到一张数字收据，也就是交易 id。大多数钱包都会为你提供这个信息。区块链浏览器本质上只是一些工具，用来把区块链上已经发生的事情可视化展示出来。它们接收的输入包括：交易 id、地址或区块哈希，并以可视化方式输出实际发生了什么。

## 示例
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash（公开）: [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash（私密）: [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### 注意看 Zcash，第二笔交易将所有重要细节都隐藏了，这一点非常重要，并且在数字世界中具有深远影响。


## 区块链地图

我们拿到这样一串长字符作为数字收据之后，接下来怎么办？这时就要用到[区块链浏览器](https://nym.com/blog/using-blockchain-privately)——也可以把它理解为地图——来帮助我们理解区块链上发生了什么。注意，上面每条链都有各自版本的[区块链浏览器](https://nym.com/blog/using-blockchain-privately)。理解一点很重要：这些区块链项目都是开源软件的例子。也就是说，任何人都可以参与贡献，或者按自己的需求 fork 代码。在此前提下，每个项目都会专注于不同方向，并对区块链浏览器进行定制，以满足该项目自身的需求。

### 区块

交易会被放入*区块*中。当一个区块被挖出/验证后，该区块内的每笔交易都会得到确认，同时生成一个区块哈希。任何生成的哈希都可以输入到区块浏览器中。你可能见过 CEX 在放行你的资金前需要一定数量的*确认数*，这就是他们用来确保你的交易已经
足够最终确认的指标。区块链是如何决定哪些交易会进入下一个区块的？这是一个复杂的研究话题，但大多数现代链都会使用*手续费*这一机制来决定谁排在前面。手续费越高，你排到队列前端的概率就越大。

### 地址

学习[区块链浏览器](https://nym.com/blog/using-blockchain-privately)有一个很有趣的可视化方法：输入任意一笔随机交易的地址。然后你就可以沿时间向后追踪，查看这些资金最初来自哪里！每笔交易都有输入地址和输出地址。有了这些信息，只要某笔交易已经被花费，人们就可以很方便地从该交易向前或向后追踪。对于喜欢解谜的人来说，这相当于一个巨大的数字金融拼图，也可以用于透明度用途。使用区块链浏览器不仅能让这一切更容易被可视化，它*也突显了*交易隐私的必要性。除非你使用的是屏蔽版 Zcash，否则你可以对*任何*透明区块链这样做：BTC、ETH、ATOM、DOGE、VTC 等等…… 这一点对于任何希望在日益走向纯数字未来中安全使用区块链的人来说都至关重要。

### 金额

与上面的地址类似，公链上的任何交易，其金额也是完全公开展示的。这包括任何一笔交易中输入地址和输出地址上的金额。唯一的例外之一是当你选择使用 Shielded Zcash 时——这时所有金额都会被隐藏。对于那些因为*公平交易*而必须保护隐私的小企业主来说，这是一个巨大的优势！

![金额](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### 浏览器在 Zcash 上能看到什么，不能看到什么

#### TL;DR
- Transparent（`t`）地址在浏览器中完全可见，就像 Bitcoin 一样
- 完全屏蔽的（z 到 z）交易会隐藏金额、地址和 memo
- 手续费依然可见，即使是在完全屏蔽的交易中也是如此
- Shielding（把 `t` 转入 shielded）和 deshielding（从 shielded 转回 `t`）是部分可见的，因为其中一侧是透明的
- 只有当资金始终停留在 shielded pools 中时，隐私性才能得到保障

Zcash 不止有一种地址类型，浏览器对待它们的方式也完全不同。

以 `t` 开头的 Transparent 地址工作方式和 Bitcoin 类似。浏览器会显示发送方、接收方、金额，以及资金来源的追踪路径。

Shielded 地址是私密的一侧。位于 Sapling 或 Orchard [shielded pools](https://zechub.wiki/using-zcash/shielded-pools#content) 中的资金由零知识证明保护。查找一笔完全屏蔽的交易时，浏览器无法显示金额、地址或 memo。它只能确认一笔有效交易确实发生过，并被记录进了某个区块。这就是本页顶部附近展示的那个隐藏的私密示例。

有一个细节即使在完全屏蔽的交易中也仍然可见：手续费。Zcash 共识规则要求透明手续费必须被明确声明，因此浏览器始终可以显示它，即使交易金额本身被遮蔽也是如此。因此，良好的做法是使用钱包的标准手续费，这样你的交易就不会因为支付了异常金额而显得突出。

当资金在透明侧和屏蔽侧之间穿梭时，浏览器也能看到。把 `t` 资金移入池中称为 shielding，把它们再移出来称为 deshielding。由于其中一侧是透明的，这些跨越行为会部分可见。只有完全私密的 z 到 z 活动，也就是从未接触 `t` 地址的那类交易，才能把除手续费之外的一切都隐藏起来。

结论是：隐私取决于资金是否始终停留在 shielded pools 中。一旦资金接触到 `t` 地址，其对应那段历史就会像 Bitcoin 一样公开。如果你想向特定对象证明自己的屏蔽交易活动，比如会计，请分享 viewing key，而不是将其公开。参见[Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content)页面。


### 可视化指南

下面是四个不同区块链浏览器的优秀示例：

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash 区块浏览器](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![Bitcoin 浏览器](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ETH 浏览器](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![Zcash 浏览器](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![Cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)
