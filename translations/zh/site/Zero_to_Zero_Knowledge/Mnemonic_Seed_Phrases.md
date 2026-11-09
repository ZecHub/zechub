# Zero to Zero Knowledge：助记词 [Mnemonic Seed Phrases]

**系列：** Zero to Zero Knowledge

助记词支撑着加密货币最重要的方面之一——**自托管 [self-custody]**。  
今天我们将了解助记词如何生成并在钱包中使用。

---

## 什么是助记词？

恢复短语 [Recovery Phrases] 由 **BIP-39** 规范定义，这是如今最常用的恢复短语类型。

恢复短语的创建始于生成**随机性 [randomness]**。熵 [entropy] 越多，安全性越高。对于大多数用户而言，**128 位**熵被认为已经足够。

![Seed phrase concept](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

根据初始熵的长度，恢复短语将由 **12 至 24 个单词**组成。

---

## 分步说明：12 词助记词如何生成

### 1. 生成熵
我们首先生成 **128 位**熵。

### 2. 添加校验和 [Checksum]
我们使用 **SHA256** 对熵进行哈希。该哈希值的前几位将成为校验和。  
这为我们的熵提供了唯一的指纹。

![Entropy + Checksum diagram](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. 拆分为 11 位块
总共 132 位（128 位熵 + 4 位校验和）被拆分为每个 11 位的块。

### 4. 映射到词表 [Wordlist]
每个 11 位序列都会被转换为十进制数字（0-2047）。  
BIP-39 词表恰好包含 **2048 个单词**（英语、西班牙语、中文等）。

这些数字用于在词表中找到对应的单词。

![Word mapping example](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**结果：** 我们现在拥有了一条安全、可供人类阅读的 12 词恢复短语！

---

## 从恢复短语 -> 种子 [Seed] -> 支付地址 [Payment Addresses]

钱包可以使用恢复短语生成密钥，以创建支付地址和不同的钱包账户。

所生成的密钥是**确定性的 [deterministic]**——相同的输入始终产生相同的输出。

### 种子生成
钱包种子通过**密钥派生函数 [Key Derivation Function (KDF)]**从助记词派生而来：

- 在 **Bitcoin** 中：PBKDF2  
- 在 **Zcash** 中：Blake2b-256/512

这会生成一个 **64 字节（512 位）**种子。

![Seed to master keys](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### 主密钥 [Master Keys]
种子被拆分为两个 32 字节序列：
- **主花费密钥 [Master Spending Key]**
- **主链代码 [Master Chain Code]**

这些密钥用于**分层确定性 [Hierarchical Deterministic (HD)] 钱包**中的子密钥派生。

---

## Zcash 特有功能（ZIP-32）

在 Zcash 中，可以在不危及主种子的情况下，为子树独立委托**查看权限 [viewing authority]**或**花费权限 [spending authority]**。

**ZIP-32** 定义了适配 Zcash 隐私功能的分层确定性密钥生成标准。

我们从**扩展花费密钥 [Expanded Spending Key]**派生出：
- Full Viewing Key
- Incoming Viewing Key
- 一组支付地址

不同的派生机制会生成适合提供给发送者、可跨屏蔽池使用的外部地址（Sapling 和 Orchard）。

![Zcash key derivation hierarchy](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcash 还支持用于自动屏蔽等钱包操作的**内部地址 [internal addresses]**。

---

## 资源

- [ZIP-32：屏蔽分层确定性钱包](https://zips.z.cash/zip-0032)  
- [Zcash 协议规范（NU5）](https://zips.z.cash/protocol/protocol.pdf)  
- [默认屏蔽钱包概览](https://zechub.wiki)

---

**由 ZecHub（@ZecHub）发布的原始帖子**  
https://x.com/ZecHub/status/1624125037945946145

---

*本页面根据 Zero to Zero Knowledge 的原始帖子为 ZecHub wiki 编写。*
