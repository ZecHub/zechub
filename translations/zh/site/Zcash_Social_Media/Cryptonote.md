# 从零到零知识：CryptoNote 协议

**系列：** 从零到零知识

今天这个很有意思！  
**CryptoNote** 协议实现了强大的链上隐私。今天我们来了解它的所有关键特性，以及它如何被多个知名隐私项目所采用。

![CryptoNote 介绍](https://pbs.twimg.com/media/FrXr5P8WIAAvx36.jpg)

---

## 背景

最初的 CryptoNote 白皮书以化名 **“Nicolas van Saberhagen”** 发布。  

**Bytecoin** 是第一个实现该协议的加密货币。如今最知名的采用该协议的项目是 **Monero (XMR)**。它也被用于 TurtleCoin、Aeon 以及其他一些项目。

---

## CryptoNote 的核心特性

CryptoNote 协议提供三大主要特性：

1. 交易的**不可追踪性与不可关联性**
2. **平权工作量证明**（抗 ASIC）
3. **动态发行**

---

## 1. 不可追踪性 - 环签名

不可追踪性主要通过 **Ring Signatures** 来实现。

当你发送一笔交易时，你的真实公钥会与多个诱饵密钥（即“环”）混合在一起——这些密钥都包含相同数量的币。这使得判断究竟是谁发送了这些币变得极其困难。

**环大小** 会显著影响匿名集。环越大，隐私性越强。

![Ring Signatures 说明](https://pbs.twimg.com/media/FrXteGHXgAANE0F.png)

**与 Zcash 对比：**  
Zcash 的匿名集是某个给定屏蔽池中*历史上所有*发生过的交易总数（远大于 CryptoNote 典型的环大小）。

---

## Ring CT（机密交易）

**Ring CT** 模型大幅提升了基于 CryptoNote 的币种的隐私性。

Ring CT 不仅隐藏发送者，还会**混淆发送者与接收者之间的交易金额**。

![Ring CT 示意图](https://pbs.twimg.com/media/FrXuivgWYAAze7B.png)

它使用了：
- 椭圆曲线密码学
- Pedersen Commitments
- 同态加密

**证明** 被用来表明金额大于 0 且处于有效范围内，**同时不泄露实际数值**。

**Stealth Addresses** 还会为接收者提供一次性使用地址。

![Stealth Addresses + Proofs](https://pbs.twimg.com/media/FrXut5aWAAMhuRb.jpg)

---

## 2. 平权工作量证明（ePoW）

CryptoNote 旨在通过抗 ASIC 的设计，创建一个更公平的挖矿系统。

它使用 **CryptoNight** 算法（一种内存密集型函数）。不同于 Bitcoin 的 SHA256，CryptoNight 的设计目标是缩小 CPU、GPU 和 ASIC 矿工之间的差距。

**CryptoNight 步骤：**
1. 用伪随机数据初始化一大片内存区域（scratchpad）
2. 对 scratchpad 执行大量读写操作
3. 对整个 scratchpad 进行哈希以生成最终值

![CryptoNight 挖矿](https://pbs.twimg.com/media/FrXvNs3XsAA37LG.jpg)

（注：Monero 此后已经从 CryptoNight 转向其他算法。）

---

## 3. 动态发行

CryptoNote 不采用像 Bitcoin 那样突发式的减半事件，而是使用**平滑递减的区块奖励**。

这使得随着时间推移，发行曲线更加平滑。

![动态发行曲线](https://pbs.twimg.com/media/FrXv8wpXoAEjUxW.png)

**与 Zcash 的关联：**  
Zcash 开发者曾讨论未来实现更平滑的发行曲线，可能通过 “Zcash Posterity Fund” 来完成。

---

## 结论

CryptoNote 已被证明是一种强大且久经考验的链上隐私方案。它的许多创新影响了更广泛的隐私币生态系统。

一些研究人员认为，CryptoNote 的特性最终可能会与无需信任的零知识屏蔽池结合起来。

---

**原始线程作者：ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*本页面由原始“从零到零知识”线程整理编写，用于 ZecHub wiki。*
