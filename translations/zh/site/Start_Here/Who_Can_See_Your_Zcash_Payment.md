<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 谁能看到你的 Zcash 支付 [payment]？

## TL;DR

- Zcash 提供 **两种地址 [address]**：透明 [transparent]（`t`）和屏蔽 [shielded]（`z` 或 `u`）。
- 公众能看到多少，取决于你的支付在这两种地址之间如何流动。
- 只有 **屏蔽到屏蔽** 的支付会隐藏发送方、接收方和金额。
- 屏蔽地址并非一把密钥。它是一小组密钥，你可以授予他人 **只读访问权限，而无需交出花费能力**。
- 一旦分享 viewing key，便 **无法收回**。

---

## 首先要理解的一件事

在大多数 blockchain [blockchain] 上，没有可作的选择。你发送的一切都会永久公开给任何查看者。

Zcash 则为你提供了选择。这个选择会作出两次：**一次是在你选择发送到哪个地址时，另一次是在你决定谁能获得读取你历史记录的密钥时。**

下图涵盖了两者。

![Zcash key types and what a block explorer can see for each of the four transaction paths](/content-images/who-can-see-your-zcash-payment-04d41ac960.webp)

---

## 选择一：地址类型

每笔 Zcash 支付都在两个地址之间流动，而每个地址都可能是透明或屏蔽。这会产生四种路径，每种泄露的信息量各不相同。

其中的规律比看起来简单：**任何接触透明地址的内容都会公开。** 全程留在屏蔽池 [shielded pool] 内的支付，除了手续费 [fee] 外不会透露任何信息。

这在你从交易所 [exchange] 提现时尤其重要。许多交易所只会发送到透明地址，因此该提现是公开的。资金到账后、花费之前，请自行将其屏蔽。

如需深入了解浏览器究竟会读取哪些信息，请参阅 [区块浏览器能看到什么](/zcash-tech/what-a-block-explorer-can-see)。

---

## 选择二：谁获得密钥

无法解除的隐私 [privacy] 并不实用。有时你需要向会计师、审计师或税务机关证明某些事情。Zcash 可以处理这一需求，而无需你放弃控制权。

**花费密钥 [spending key]。** 它能查看一切并转移资金。这就是资金本身。它应由你保管，绝不应以任何理由与任何人分享。

**Full Viewing Key。** 只读。它显示收入和支出活动及余额，但无法花费哪怕一个 zatoshi。这是你提供给审计师或会计师的密钥。

**Incoming Viewing Key。** 范围更窄：它只显示到账的支付。交易所或商家可以运行它来确认你的存款已到账，而花费密钥则保存在从不接触互联网的硬件上。

顺序很重要。应提供能够完成任务的最窄范围密钥，而非你恰好拥有的权限最广的密钥。

---

## 初学者容易忽略的部分

**Viewing key 无法撤销。** 没有“撤销分享”按钮。一旦有人拥有它，他们就能在该地址存在期间读取该地址的信息。如果需要切断访问权限，请将资金转移到新地址。

**即使是完全屏蔽的支付，手续费也是公开的。** 金额被隐藏；手续费不会。

**公开即永久。** 链 [chain] 今天展示的任何内容，二十年后依然会展示。支付发送后再决定将其屏蔽，是无法做到的。

---

## 付诸实践

- 使用默认进行屏蔽的钱包 [wallet]，例如 [ZODL](https://zodl.com) 或 [Zingo!](https://www.zingolabs.org/)。
- 资金从交易所到账后、花费之前，立即将其屏蔽。
- 只要接收方支持，就向屏蔽地址支付。
- 在分享 viewing key 前，询问哪一种密钥是能够回答所提问题的最小范围密钥。

---

## 资源

- [viewing key 说明（Electric Coin Company）](https://electriccoin.co/blog/explaining-viewing-keys/)
- [选择性披露 [selective disclosure] 与 viewing key（Electric Coin Company）](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310：Viewing key](https://zips.z.cash/zip-0310)
- [Zcash 技术如何运作](https://z.cash/technology/)

## 相关页面

- [Zcash 基础知识](/start-here/what-is-zec-and-zcash)
- [Zcash 新用户指南](/start-here/new-user-guide)
- [区块浏览器能看到什么](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing key](/zcash-tech/viewing-keys)
- [交易 transactions](/using-zcash/transactions)

---

*如果你想为此 wiki 页面补充内容或建议修改，请前往 [ZecHub GitHub 仓库](https://github.com/ZecHub/zechub) 并提交 pull request。*
