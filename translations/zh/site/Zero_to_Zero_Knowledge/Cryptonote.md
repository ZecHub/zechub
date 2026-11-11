# Zero to Zero Knowledge：CryptoNote 协议

**系列：** Zero to Zero Knowledge

今天来一个有趣的话题！  
**CryptoNote** 协议提供强大的链上隐私 (on-chain privacy)。今天我们将了解其所有关键特性，以及多个知名隐私项目如何实现它。

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## 背景

最初的 CryptoNote 白皮书以 **"Nicolas van Saberhagen"** 这一化名发布。  

**Bytecoin** 是第一个实现该协议的加密货币。如今最知名的使用该协议的项目是 **Monero (XMR)**。它还被用于 TurtleCoin、Aeon 以及其他多个项目。

---

## CryptoNote 的核心特性

CryptoNote 协议提供 3 项主要特性：

1. 交易 (transactions) 的**不可追踪性和不可关联性**
2. **平等主义工作量证明 (Proof of Work)**（抗 ASIC） 
3. **动态发行**

---

## 1. 不可追踪性——环签名

不可追踪性主要通过**环签名 (Ring Signatures)** 实现。

发送交易时，您的真实公钥会与多个诱饵密钥（即"环"）混合——它们都包含相同数量的代币。这使得确定实际发送代币的人变得极其困难。

**环大小**会显著影响匿名集。更大的环能提供更好的隐私。

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**与 Zcash 的比较**：  
Zcash 的匿名集是给定屏蔽池中*曾经*进行过的交易总数（远大于典型的 CryptoNote 环大小）。

---

## Ring CT（保密交易）

**Ring CT** 模型极大地改善了基于 CryptoNote 的代币的隐私。

Ring CT 不仅隐藏发送者，还会**混淆发送者与接收者之间的交易金额**。

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

它使用：
- 椭圆曲线密码学
- Pedersen commitments
- 同态加密 (Homomorphic Encryption)

**证明 (Proofs)** 用于表明金额大于 0 且处于有效范围内，**而不会泄露实际数值**。

**隐身地址 (Stealth Addresses)** 还会为接收者添加一次性使用的地址。

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. 平等主义工作量证明（ePoW）

CryptoNote 通过抵抗 ASIC，旨在创建一个更公平的挖矿系统。

它使用 **CryptoNight** 算法（一种内存困难函数）。与 Bitcoin 的 SHA256 不同，CryptoNight 旨在缩小 CPU、GPU 与 ASIC 矿工之间的差距。

**CryptoNight 步骤：**
1. 使用伪随机数据初始化一大片内存区域（暂存区）
2. 对暂存区执行大量读写操作
3. 对整个暂存区进行哈希处理以生成最终值

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

（注：Monero 此后已从 CryptoNight 转向其他算法。）

---

## 3. 动态发行

与突然发生的减半事件（如 Bitcoin）不同，CryptoNote 使用**平滑递减的区块奖励**。

这会随着时间推移形成更加平滑的发行曲线。

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Zcash 关联：**  
Zcash 开发者曾讨论未来实施更平滑的发行曲线，可能通过"Zcash Posterity Fund"实现。

---

## 结论

CryptoNote 已被证明是一种强大且久经考验的链上隐私方案。它的许多创新已影响更广泛的隐私币生态系统。

一些研究人员认为，CryptoNote 的特性最终可能与无需信任的零知识屏蔽池相结合。

---

**原始帖子作者：ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*本页面根据原始 Zero to Zero Knowledge 帖子为 ZecHub wiki 编写。*
