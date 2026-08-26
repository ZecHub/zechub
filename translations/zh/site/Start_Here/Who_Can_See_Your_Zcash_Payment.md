<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 谁能看到你的 Zcash 支付？

## TL;DR

- Zcash 提供**两种地址**：透明地址（`t`）和屏蔽地址（`z` 或 `u`）。
- 公众能看到多少信息，取决于你的支付是在什么类型的地址之间转移。
- 只有**屏蔽地址到屏蔽地址**的支付，才能隐藏发送方、接收方和金额。
- 屏蔽地址并不是单一的一把密钥。它是一小组密钥，你可以在**不交出花费权限的情况下提供只读访问**。
- 一旦你分享了 viewing key，**就无法收回**。

---

## 首先要理解的一件事

在大多数 blockchain 上，你没有选择。你发送的所有内容都会永久公开给任何查看的人。

而 Zcash 给了你选择。这个选择会做两次：**一次是在你选择要发送到哪个地址时，另一次是在你决定把哪把密钥交给谁读取你的历史记录时。**

下图同时涵盖了这两个方面。

![Zcash 密钥类型以及区块浏览器在四种交易路径中各能看到什么](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## 选择一：使用哪种地址

每一笔 Zcash 支付都在两个地址之间移动，而这两个地址都可以是透明的或屏蔽的。因此一共有四种路径，每种路径泄露的信息量都不同。

这个规律比看起来更简单：**凡是接触到透明地址的内容都会变成公开信息。** 一笔始终完全停留在屏蔽池中的支付，除了手续费之外不会泄露任何信息。

这一点在你从交易所提现吗尤为重要。许多交易所只会发送到透明地址，因此提现是公开的。资金到账后，在你花费之前，先自行将其转入屏蔽地址。

如果你想更深入了解浏览器究竟能读取什么，请参阅[区块浏览器能看到什么](/zcash-tech/what-a-block-explorer-can-see)。

---

## 选择二：把密钥给谁

一种你永远无法解除的隐私并不实用。有时你需要向会计、审计人员或税务机关证明某些事情。Zcash 允许你做到这一点，而无需放弃控制权。

**Spending key。** 能看到一切，也能移动资金。这就是钱本身。它应始终由你持有，任何情况下都不要与任何人分享。

**Full viewing key。** 只读。可以显示流入和流出的活动以及余额，但不能花费哪怕一个 zatoshi。这是你交给审计人员或会计的东西。

**Incoming viewing key。** 范围更窄：它只能显示流入的支付。交易所或商家可以运行它来确认你的充值是否到账，而 spending key 则保留在从不接触互联网的硬件上。

顺序很重要。要给出的是能完成任务的最窄权限密钥，而不是你手头恰好有的权限最大那把。

---

## 初学者容易忽略的部分

**viewing key 无法被撤销。** 没有“取消共享”按钮。一旦别人拿到了它，他们就可以在该地址存在的整个期间读取它。如果你需要切断访问权限，就必须把资金转移到一个新地址。

**即使是完全屏蔽的支付，手续费也是公开的。** 金额是隐藏的；手续费不是。

**公开信息是永久的。** 今天链上显示的任何内容，二十年后依然会显示。你无法在发送之后再决定把那笔支付“改成屏蔽”。

---

## 付诸实践

- 使用默认启用屏蔽的 wallet，例如 [Zodl](https://zodl.com) 或 [Ywallet](https://ywallet.app/)。
- 资金从交易所到账后，在花费之前尽快先转入屏蔽地址。
- 当收款方支持屏蔽地址时，尽量支付到屏蔽地址。
- 在分享 viewing key 之前，先问清楚：哪一种密钥才是足以回答当前问题的最小权限密钥。

---

## 资源

- [viewing key 说明（Electric Coin Company）](https://electriccoin.co/blog/explaining-viewing-keys/)
- [选择性披露与 viewing key（Electric Coin Company）](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310：Viewing keys](https://zips.z.cash/zip-0310)
- [Zcash 技术如何运作](https://z.cash/technology/)

## 相关页面

- [Zcash 基础知识](/start-here/what-is-zec-and-zcash)
- [Zcash 新用户指南](/start-here/new-user-guide)
- [区块浏览器能看到什么](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing keys](/zcash-tech/viewing-keys)
- [交易](/using-zcash/transactions)

---

*如果你想为这个 wiki 页面添加内容或提出修改建议，请前往 [ZecHub GitHub 仓库](https://github.com/ZecHub/zechub) 并提交 pull request。*
