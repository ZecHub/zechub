<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 零知识与基于诱饵的系统对比

“加密货币会将你所有的支出活动暴露给公众，因为它就像把你的银行账户变成了 Twitter，这个问题非常严重，必须通过采用链上隐私来解决。”——Ian Miers 于 [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9)。

某些加密项目因其以隐私为核心的方法而获得广泛认可。Zcash 以使用 Zero Knowledge Proofs（ZK）来保护交易金额和地址而闻名。Monero 则因其采用基于诱饵的发送方混淆机制，并结合其他加密方案来实现区块链上的用户隐私而脱颖而出。


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## 理解 ZK 证明与基于诱饵的系统

零知识证明是一种密码学系统，它允许一方向另一方（验证者）证明某个陈述是有效的，而*无需透露该陈述本身的任何底层信息*。在 Zcash 的语境中，ZK 证明用于验证交易的有效性，而不会披露诸如发送方、接收方或交易金额等交易细节。

**这确保了用户隐私得到保留，因为交易在保持机密的同时仍然可以被验证。这项技术旨在确保 Zcash 网络上金融交易的机密性。**

在基于诱饵的系统中，例如 [RingCT](https://twitter.com/ZecHub/status/1636473585781948416)，多笔交易会被组合在一起，从而使追踪资金的真实来源和去向变得具有挑战性或十分困难。该算法会在交易中引入诱饵输入和输出，同时还会对用作输入的地址进行加密，并使用范围证明来验证转移的金额是可花费的。

这种方法会混淆交易轨迹。诱饵输入的使用使得任何分析区块链的人都难以识别真实的发送方、接收方或交易金额。

**重要说明**：这种链上隐私保护交易的方法仍然会向所有用户交易显式暴露（加密后的）输入。诸如网络中不同用户之间的*交易流向*之类的元数据仍然可以被收集。如果攻击者主动参与生成网络中的交易，就能有效地去匿名化其他用户的诱饵输入。


## ZK 相较于基于诱饵系统的优势

Zcash 和 Monero 都是以隐私为重点的加密货币，但它们实现隐私的方式不同。

以下是 Zcash 的零知识证明（ZK）相较于 Monero 诱饵系统的一些优势：

1) **选择性披露**：借助 Zcash 的 ZK 功能集，用户可以选择向特定方披露交易细节 [阅读 ECC 关于选择性披露的博客](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)。在 Zcash 中，屏蔽交易的加密内容允许个人有选择地披露某一笔特定转账的数据。此外，还可以提供 Viewing Key，以披露与某个特定屏蔽地址相关的所有交易。此功能可在不损害整个网络整体隐私的前提下，实现监管合规和可审计性。

虽然 Monero 的诱饵算法（环签名）有助于提供隐私，但它并不像 Zcash 那样提供*选择性*披露。


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **可选可见性**：Zcash 允许用户在透明（非隐私）交易和屏蔽（隐私）交易之间进行选择。这意味着 Zcash 为用户提供了灵活性：他们既可以像 [Zcash 官网](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/) 所解释的那样，将自己的财务信息保持私密（屏蔽），也可以像大多数其他区块链那样使其透明并公开可见。这种可选择加入的隐私机制带来了更大的灵活性以及与业务/组织相关的使用场景，因为某些交易可能为了接受公众审查而需要较少隐私，而另一些交易则受益于更强的隐私保护。


3) **匿名集**：[匿名集](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) 是指零知识屏蔽池中*曾经*发生过的所有交易。这一规模明显大于大多数其他用于实现交易不可关联性的链上技术。注意：这仅适用于同一屏蔽池内的交易。

诱饵的使用确实会扩大匿名集。然而，这种方法完全依赖于网络中*真实*用户的数量。

4) **无需可信设置**：Zcash 的 Sprout 和 Sapling 设置使用了一种称为“可信设置仪式”的多方计算。近期的 NU5 升级不再需要对零知识电路设置完整性的信任。[阅读 ECC 关于 NU5 的博客](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/)。

5) **数据隐私**：Zcash 屏蔽池中使用的 [zk-SNARK technology](https://wiki.zechub.xyz/zcash-technology) 可为用户带来显著增强的安全性。链上元数据泄露的减少意味着用户能够免受潜在黑客或压迫性国家机构等对手的威胁。

Monero 的诱饵选择算法曾多次被发现存在漏洞。根据 [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero) 的报道，这些漏洞有可能暴露用户的支出行为。


总而言之，真正最重要的是减少或消除用户信息与数据的泄露，正如 Zooko 在 [Orchid (priv8) AMA 直播问答](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 中所解释的那样。


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***参考链接***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
