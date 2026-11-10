# Zero to Zero Knowledge: Lelantus 协议

**系列：** Zero to Zero Knowledge

今天我们来看看 **Lelantus**！

该协议于 2019 年发布，建立在 Zerocoin 之上。它用于 **Firo** 货币（原名 Zcoin），以实现私密的链上交易。它在某些方面与 Zcash 相似，但在大多数方面存在明显差异。

![Lelantus intro](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Zcash 与 Firo 协议基础

- **Zcash** - 建立在 **Zerocash** 协议之上  
- **Firo（Zcoin）** - 建立在 **Zerocoin** 协议之上

![Zerocash vs Zerocoin comparison](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Firo 隐私协议的演进

与 Zcash 类似，Firo 使用屏蔽地址 [shielded addresses] 来实现匿名支付。

**时间线：**
- **Zerocoin** - 健全性遭到破坏
- **Sigma** - 固定面额系统
- **Lelantus 1.0** - 缺乏正确的安全性证明 [security proofs]

![Protocol evolution](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Sigma 协议的局限性

Zcoin/Firo 早期版本中使用的 Σ（Sigma）协议存在一个重大限制：用户只能铸造固定面额。

这导致匿名集更小，并为铸造和赎回操作之间的时序攻击打开了大门（此外还有"受污染找零"问题）。

![Sigma denominations](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Lelantus 如何改善隐私

**Lelantus** 通过允许从一个更大的单一集合中进行铸造，解决了固定面额问题。

主要优势：
- 消除固定面额匿名集
- 减少销毁/赎回之间的时序攻击
- 消除受污染找零问题

**限制**：集合大小目前上限为 **65,000 枚币**。

![Lelantus advantages](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## 币 commitment

**币 commitment [coin commitment]** 是一种双重盲化的 commitment，用于编码币序列号和币值。

它们的功能与 Zcash 中的 **note [Notes]** 类似。

币 commitment 会在币被创建时（通过 Mint 或 Spend 交易）发布并存储在账本上。

![Coin commitment diagram](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Basecoin < - > Zerocoin 模型

Lelantus 使用经典的 **basecoin < - > zerocoin** 模型。

**重要功能**：现在可以进行部分赎回，同时保持剩余部分和金额隐藏。

与 Zcash 一样，透明交易必须由用户明确选择。

![Lelantus flow](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## One-of-Many 证明

Lelantus 利用 **One-of-Many 证明 [Proofs]** 提取证明余额所需的输入值，而不会揭示输入来源——并且无需可信设置。

这些证明也用于 **Triptych**（在我们的 CryptoNote 讨论串中提及）。

![One-of-Many Proofs](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## 网络层隐私：Dandelion++

Firo 节点使用与 Zcash 的 Magicbean 相同的 Network Magic。

与 Monero 一样，Firo 实现了 **Dandelion++**，通过混淆交易广播者的 IP 地址来增强隐私。

**Dandelion++ 阶段：**
- **Stem 阶段** - 交易被转发给一个随机节点，而非所有对等节点
- **Fluff 阶段** - 随机启动，随后切换至常规 gossip 模式

这使得通过网络分析追踪交易来源变得困难得多。

![Dandelion++ explanation](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## 未来：Lelantus-Spark

**Lelantus-Spark**（计划于 2023 年稍后推出）使用 **ZIP-32 风格的派生**和多样化地址，引入了两个级别的自选可见性。

它还将增加对以下功能的支持：
- 多重签名
- 用户定义的机密资产

这些功能与 Zcash 屏蔽资产相对应。

![Lelantus-Spark announcement](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**原始讨论串作者：ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*本页面根据原始 Zero to Zero Knowledge 讨论串为 ZecHub wiki 编写。*
