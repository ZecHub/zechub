<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 区块浏览器在 Zcash 上能看到什么

## TL;DR

- 在 Bitcoin 上，区块浏览器会显示一切：发送方、接收方和金额。
- 在 Zcash 上，这只适用于透明（t-address）活动。
- 浏览器可以看到资金进入和离开 shielded pool，但看不到其内部发生了什么。
- 完全屏蔽（z 到 z）的交易不会暴露发送方、接收方或金额。
- 任何公开的“shield rate”数据都只是下限，因为完全私密的活动从外部是不可见的。

---

## 两种地址类型

Zcash 有两种地址。

**透明地址**以 `t` 开头，工作方式类似 Bitcoin 地址。余额和支付记录都是公开的。

**屏蔽地址**以 `z` 开头，并受零知识证明保护。网络可以在不暴露发送方、接收方或金额的情况下，确认一笔屏蔽支付是有效的。

由于有这两种类型，价值可以通过四种方式流动：透明到透明（t 到 t）、透明到屏蔽（t 到 z，称为 shielding）、屏蔽到透明（z 到 t，称为 deshielding），以及屏蔽到屏蔽（z 到 z，完全私密）。

## 浏览器能看到什么

像 [Blockchair](https://blockchair.com/zcash) 这样的公共浏览器可以清楚读取：

- 任何完全透明（t 到 t）的支付，从头到尾。
- 进入 shielded pool 的资金（透明侧以及金额）。
- 离开 shielded pool 的资金（透明侧以及金额）。
- 每个 shielded pool 中持有的 ZEC 总量；这些信息是公开的，这样网络才能证明没有凭空创造出任何代币。

简而言之，shielded pool 的边界是可见的。你可以看到价值流入和流出。

## 浏览器看不到什么

公共浏览器无法读取：

- 完全屏蔽（z 到 z）的交易。发送方、接收方和金额都会被隐藏。
- 任何屏蔽支付背后的发送方或接收方。
- 单个屏蔽地址的余额。
- 资金一旦进入池中后发生了什么。

如果你查询原始数据，屏蔽发送方和接收方字段会返回为空。浏览器并不是出于自身选择而隐藏这些内容。因为这些信息从来就没有以可读形式出现在公共链上。相关信息是加密的，只有拥有正确 Viewing Key 的人才能读取。

## 为什么这很重要

**你的隐私来自密码学，而不是来自对某家公司的信任。** 即使数据提供商想要查看屏蔽交易内部，也做不到。

**公开的 shield-rate 数据会低估隐私使用情况。** 研究人员只能测量跨越公共边界的活动，因此真实的私密活动量至少和他们报告的一样多，而且通常更多。

**更大的 shielded pool 能保护每个人。** 使用屏蔽地址的人越多，任何一笔私密支付所隐藏于其中的人群就越大。使用屏蔽地址不仅有助于保护你自己，也有助于保护池中的其他所有人。

## 付诸实践

- 使用默认采用屏蔽地址的钱包，例如 [Zodl](https://zodl.com) 或 [Ywallet](https://ywallet.app/)。
- 当你在透明地址收到 ZEC 时，在花费之前先将其转入屏蔽地址。
- 在可能的情况下，向屏蔽地址付款。每一笔透明支付都是完全公开的；而屏蔽支付则不是。

## 资源

- [Zcash：隐私与安全建议](https://z.cash/support/security/privacy-security-recommendations/)
- [屏蔽生态系统（Electric Coin Company）](https://electriccoin.co/blog/shielded-ecosystem/)
- [Zcash 技术如何运作](https://z.cash/technology/)
- [Blockchair Zcash 浏览器](https://blockchair.com/zcash)

## 相关页面

- [Zcash 基础知识](/start-here/what-is-zec-and-zcash)
- [钱包](/using-zcash/wallets)
- [Shielded pools](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*如果你想为这个 wiki 页面添加内容或提出修改建议，请前往 [ZecHub GitHub 仓库](https://github.com/ZecHub/zechub) 并提交一个 pull request。*
