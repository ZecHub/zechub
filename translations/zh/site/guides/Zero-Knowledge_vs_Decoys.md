<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 零知识 vs 基于诱饵的系统

"加密货币会将你的所有消费活动暴露给公众，因为它就像是通往你银行账户的Twitter，而这是一个必须通过采用链上隐私来解决的重大问题。" - Ian Miers 于 [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9)。

某些加密项目因其以隐私为核心的方法而获得认可。Zcash 因采用零知识证明（Zero Knowledge Proofs，ZK）来保护交易金额和地址而闻名。Monero 则因使用基于诱饵的发送方混淆方式，并结合其他加密方案来实现 blockchain 上的用户隐私而脱颖而出。


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## 理解 ZK 证明与基于诱饵的系统

零知识证明是加密系统，使一方（证明者）能够向另一方（验证者）证明某项陈述的有效性，而不透露*该陈述本身的任何底层信息*。在 Zcash 的语境中，ZK 证明用于验证一笔交易的有效性，而不披露发送方、接收方或交易金额等交易细节。 

**这确保了用户隐私得到保留，因为交易在保持机密的同时仍可得到验证。这项技术旨在确保 Zcash 网络上金融交易的机密性。**

在诸如 [RingCT](https://twitter.com/ZecHub/status/1636473585781948416) 的基于诱饵系统中，多笔交易被组合在一起，使追踪资金的真实来源和去向变得具有挑战性或困难。该算法会在交易中引入诱饵输入和输出，还会对用作输入的地址进行加密，并使用范围证明来验证转移金额可被花费。 

这种方法混淆了交易轨迹。诱饵输入的使用使得任何分析 blockchain 的人都难以识别真实发送方、接收方或交易金额。 

**重要提示**：这种保留链上隐私的交易方法仍会向所有用户交易明确暴露（加密的）输入。仍可收集网络中不同用户之间的*交易流向*等元数据。若攻击者积极参与在网络上生成交易，实际上会使其他用户的诱饵输入失去匿名性。 


## ZK 相较于基于诱饵系统的优势

Zcash 和 Monero 都是以隐私为重点的加密货币，但它们以不同方式实现隐私。 

以下是 Zcash 的零知识证明（ZK）相较于 Monero 的诱饵系统的一些优势：

1) **选择性披露（Selective Disclosure）**：借助 Zcash 的 ZK 功能集，用户可以选择向特定方披露交易细节 [阅读 ECC 关于选择性披露的博客](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)。在 Zcash 中，屏蔽交易的加密内容允许个人选择性披露某一笔转账的数据。此外，还可以提供 viewing key，以披露与特定屏蔽地址相关的所有交易。此功能可在不损害网络整体隐私的前提下，实现监管合规和可审计性。 

虽然 Monero 的诱饵算法（环签名）有助于提供隐私，但它无法以相同方式提供*选择性*披露。


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **可选可见性**：Zcash 允许用户在透明（非私密）交易和屏蔽（私密）交易之间进行选择。这意味着 Zcash 为用户提供了灵活性：他们可以选择将财务信息保持私密（屏蔽），也可以如同大多数其他 blockchain 一样使其透明并公开可用，正如 [Zcash 官方网站](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/)所解释的那样。这种选择加入式隐私为更灵活且与企业/组织相关的用例提供了可能性，因为有些交易可能需要较少隐私以接受公众审查，而另一些交易则受益于增强的隐私。


3) **匿名集**：零知识屏蔽池的 [匿名集](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) 包含*曾经*发生过的所有交易。这比大多数其他用于实现交易不可关联性的链上技术大得多。注意：这仅适用于同一屏蔽池内的交易。

诱饵的使用确实会扩大匿名集。然而，这种方法完全依赖于网络中*真实*用户的数量。 

4) **无需可信设置**：Zcash 的 Sprout 和 Sapling 设置采用了称为"可信设置仪式"的多方计算。最近的 NU5 升级不要求信任零知识电路设置的完整性。[阅读 ECC 关于 NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/) 的博客。

5) **数据隐私**：[zk-SNARK 技术](https://zechub.wiki/zcash-tech/zk-snarks) 在 Zcash 的屏蔽池中使用，为用户带来了显著增强的安全性。链上元数据泄漏的减少意味着用户可免受潜在黑客或压迫性国家机构等对手的侵害。 

Monero 的诱饵选择算法曾发现多起漏洞。根据 [CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero) 的报告，这些漏洞可能会暴露用户的花费。 


总而言之，最重要的是减少或消除用户信息和数据的泄漏，正如 Zooko 在 [Orchid (priv8) AMA 直播会议](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9)中所解释的那样。 


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***参考链接***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://web.archive.org/web/20240327000137/https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
