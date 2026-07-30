# 从 Zero 到 Zero Knowledge：Lelantus Protocol

**系列：** Zero to Zero Knowledge

今天我们来看看 **Lelantus**！

该协议于 2019 年发布，建立在 Zerocoin 之上。它被用于 **Firo** 货币（前身为 Zcoin），以实现链上隐私交易。它在某些方面与 Zcash 相似，但在大多数方面又有明显不同。

![Lelantus 介绍](https://pbs.twimg.com/media/Fsk18DgXsAEc0Ob.jpg)

---

## Zcash 与 Firo 的协议基础

- **Zcash** - 建立在 **Zerocash** 协议之上  
- **Firo (Zcoin)** - 建立在 **Zerocoin** 协议之上

![Zerocash 与 Zerocoin 对比](https://pbs.twimg.com/media/Fsk2Fk7WcAA81ty.png)

---

## Firo 隐私协议的演进

与 Zcash 类似，Firo 使用屏蔽地址来实现匿名支付。

**时间线：**
- **Zerocoin** - 健全性被破坏
- **Sigma** - 固定面额系统
- **Lelantus 1.0** - 缺乏正确的安全性证明

![协议演进](https://pbs.twimg.com/media/Fsk2NdaWAAAKVgH.png)

---

## Sigma Protocol 的局限性

早期版本 Zcoin/Firo 使用的 Σ（Sigma）协议有一个主要局限：用户只能铸造固定面额。

这会导致匿名集更小，并为铸造与赎回操作之间的时序攻击打开大门（以及“受污染找零”问题）。

![Sigma 面额](https://pbs.twimg.com/media/Fsk2fxfWcAMUBDo.png)

---

## Lelantus 如何提升隐私性

**Lelantus** 通过允许从一个更大的单一集合中进行铸造，解决了固定面额问题。

主要优势：
- 消除固定面额匿名集
- 减少 burn/redeem 之间的时序攻击
- 消除受污染找零问题

**局限性**：集合大小目前上限为 **65,000 coins**。

![Lelantus 优势](https://pbs.twimg.com/media/Fsk2wK3X0AA6MEe.png)

---

## Coin Commitments

**coin commitment** 是一种双重致盲承诺，用于编码 coin serial number 和 coin value。

它们的功能与 Zcash 中的 **Notes** 类似。

当 coin 被创建时（通过 Mint 或 Spend 交易），coin commitment 会被发布并存储到账本中。

![Coin commitment 示意图](https://pbs.twimg.com/media/Fsk3AWNX0AIHya8.png)

---

## Basecoin < - > Zerocoin 模型

Lelantus 使用经典的 **basecoin < - > zerocoin** 模型。

**重要特性**：现在可以进行部分赎回，同时保持剩余部分和金额隐藏。

与 Zcash 一样，透明交易必须由用户显式选择。

![Lelantus 流程](https://pbs.twimg.com/media/Fsk3HrjXgAMgqmX.png)

---

## One-of-Many Proofs

Lelantus 使用 **One-of-Many Proofs** 来提取证明余额所需的输入值，而无需暴露输入来源，也不需要 trusted setup。

这些证明也被用于 **Triptych**（我们在 CryptoNote 主题帖中提到过）。

![One-of-Many Proofs](https://pbs.twimg.com/media/Fsk3Z0nWIAAPD4k.jpg)

---

## 网络层隐私：Dandelion++

Firo 节点使用与 Zcash 的 Magicbean 相同的 Network Magic。

与 Monero 类似，Firo 实现了 **Dandelion++**，通过混淆交易广播者的 IP 地址来增加隐私性。

**Dandelion++ 阶段：**
- **Stem phase** - 交易不会广播给所有对等节点，而是中继给一个随机节点
- **Fluff phase** - 随机启动，然后切换到正常的 gossip 模式

这使得通过网络分析追踪交易来源变得更加困难。

![Dandelion++ 说明](https://pbs.twimg.com/media/Fsk4A8VWcAU84MR.png)

---

## 未来：Lelantus-Spark

**Lelantus-Spark**（计划于 2023 年稍后推出）通过 **ZIP-32 style derivation** 和 diversified addresses 引入两个级别的可选可见性。

它还将增加对以下功能的支持：
- 多重签名
- 用户定义的机密资产

这些功能与 Zcash Shielded Assets 相对应。

![Lelantus-Spark 公告](https://pbs.twimg.com/media/Fsk4jXeXsAACQ3h.jpg)

---

**原始主题帖由 ZecHub (@ZecHub) 发布**  
https://x.com/ZecHub/status/1641902859800150017

---

*本页面根据 ZecHub wiki 的原始 Zero to Zero Knowledge 主题帖整理而成。*
