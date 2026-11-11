<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash上的区块浏览器可以看到什么

## 摘要

- 在 Bitcoin 上，区块浏览器会显示一切：发送方、接收方和金额。
- 在 Zcash 上，这仅适用于透明 (transparent)（t 地址）活动。
- 浏览器可以看到资金进入和离开屏蔽 (shielded) pool，但无法看到其中发生的事情。
- 完全屏蔽（z 至 z）交易 (transaction) 不会泄露发送方、接收方或金额。
- 任何公开的"屏蔽率"数据都是下限，因为完全私密的活动从外部无法看到。

---

## 两种地址类型

Zcash有两种地址 (address)。

**透明地址**以 `t` 开头，其运作方式与 Bitcoin 地址类似。余额和支付 (payment) 都是公开的。

**屏蔽地址**以 `z` 开头，并受零知识 (zero-knowledge) 证明 (proof) 保护。网络可以确认一笔屏蔽支付有效，而不会泄露发送方、接收方或金额。

由于存在两种类型，价值可以通过四种方式流动：透明至透明（t 至 t）、透明至屏蔽（t 至 z，称为屏蔽）、屏蔽至透明（z 至 t，称为解除屏蔽），以及屏蔽至屏蔽（z 至 z，完全私密）。

## 浏览器可以看到什么

像 [ZecBlock](https://zecblock.com/) 这样的公共浏览器可以清晰读取：

- 任何完全透明（t 至 t）的支付，从头到尾。
- 进入屏蔽 pool 的资金（透明一侧和金额）。
- 离开屏蔽 pool 的资金（透明一侧和金额）。
- 每个屏蔽池中持有的 ZEC 总额；该信息是公开的，以便网络证明没有凭空创建币。

简而言之，屏蔽 pool 的边缘是可见的。你可以看到价值流入和流出。

## 浏览器无法看到什么

公共浏览器无法读取：

- 完全屏蔽（z 至 z）交易。发送方、接收方和金额都会保持隐藏。
- 任何屏蔽支付背后的发送方或接收方。
- 单个屏蔽地址的余额。
- 资金进入 pool 后发生的事情。

查询原始数据时，屏蔽发送方和接收方字段会返回空值。浏览器并非有意隐藏这些信息。它们从未以可读取的形式出现在公共链 (chain) 上。信息经过加密 (encryption)，只有拥有正确 viewing key 的人才能读取。

## 为什么这很重要

**你的隐私 (privacy) 来自密码学，而非对公司的信任。** 即使数据提供商想要查看，也无法窥探屏蔽交易的内部。

**公开的屏蔽率数据低估了隐私。** 研究人员只能衡量穿越公开边界的部分，因此真实的私密活动量至少与他们报告的一样多，通常更多。

**更大的屏蔽 pool 会保护所有人。** 使用屏蔽地址的人越多，任何一笔私密支付所隐藏其中的人群就越大。使用屏蔽地址有助于保护你和 pool 中的其他所有人。

## 付诸实践

- 使用默认采用屏蔽地址的钱包 (wallet)，例如 [ZODL](https://zodl.com) 或 [Zingo!](https://www.zingolabs.org/)。
- 当你在透明地址收到 ZEC 时，请在花费前将其转入屏蔽地址。
- 尽可能向屏蔽地址支付。每一笔透明支付都是完全公开的；屏蔽支付则不是。

## 资源

- [Zcash：隐私和安全建议](https://z.cash/support/security/privacy-security-recommendations/)
- [屏蔽生态系统（Electric Coin Company）](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)
- [Zcash技术如何运作](https://z.cash/technology/)
- [ZecBlock](https://zecblock.com/)

## 相关页面

- [Zcash基础知识](/start-here/what-is-zec-and-zcash)
- [钱包](/using-zcash/wallets)
- [屏蔽池](/using-zcash/shielded-pools)
- [zk-SNARKs](/zcash-tech/zk-snarks)

---

*如果你想为此 Wiki 页面补充内容或提出编辑建议，请前往 [ZecHub GitHub repo](https://github.com/ZecHub/zechub) 并提交拉取请求。*
