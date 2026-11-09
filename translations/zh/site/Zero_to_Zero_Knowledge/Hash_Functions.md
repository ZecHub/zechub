# Zero to Zero Knowledge：哈希函数 [Hash Functions]

**系列介绍**  
欢迎来到新系列：**Zero to Zero Knowledge**！  

在本系列中，我们将学习构成隐私保护协议的广泛技术的基础知识。

---

## 第 1 部分：哈希函数

今天我们从**哈希函数**开始——这是 blockchain 中使用的密码学关键组成部分。在本系列后续内容中，我们将介绍一些依赖其特性的主题。

### 什么是哈希函数？

哈希函数接受任意长度的输入，并生成固定长度的输出。

- **待哈希的消息** = 输入  
- **所使用的算法** = 哈希函数  
- **生成的输出** = 哈希值  


![Hash Function diagram](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### 亲自试试看！

让我们使用这个工具获得实践理解！  
输入任意文本以生成固定长度的输出。观察输出如何随不同哈希算法而变化。

**试试看：** https://cryptii.com/pipes/hash-function

---

### 密码学哈希函数的特性

密码学哈希函数必须具备以下 **3 项特性**：

1. **单向性** - 逆转哈希函数应当在计算上不可行  
2. **抗碰撞性** - 两个不同输入不得哈希为相同输出  
3. **确定性** - 对于任何输入，哈希函数必须始终给出相同结果

---

### 常见哈希函数

哈希函数有多种类别。以下是一些示例：

- 安全哈希算法（**SHA-3**）  
- 消息摘要算法 5（**MD5**）  
- **BLAKE2b** - 用于 Zcash 密钥派生

**BLAKE2 简介**：https://www.blake2.net

---

### 哈希函数的实际应用

#### 1. 完整性哈希（数据完整性检查）
数据完整性检查是"完整性哈希"的一个示例。它们用于为数据文件生成校验和，并向用户提供正确性保证。

![Integrity Hashing example](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Merkle 树（哈希树）
**哈希树**或 **Merkle 树**由分支和叶节点 [leaf nodes] 构成，后者标记有数据区块的密码学哈希值。

![Merkle Tree diagram](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Merkle 树是**密码学 commitment 方案**的一个示例。树根被视为一个 commitment，而叶节点被证明是原始 commitment 的一部分。

它们验证存储在或通过 P2P 网络传输的数据，确保从对等节点接收的数据未被篡改。

#### 3. Zcash 中的 Note Commitment 树
在 Zcash **Sapling** 和 **Orchard** 屏蔽池中，**Note Commitment 树**用于验证交易在共识下有效，同时完全隐藏发送方、接收方和所花费的金额。

#### 4. 签名哈希 [Signature Hash]（Bitcoin 风格区块）
**SHA256** 是"签名哈希"的一个示例，用于确保 Bitcoin 链中每个区块的不可变性。矿工使用前一区块的哈希值 + 当前区块中所有交易的哈希值（hashMerkleRoot）+ 时间戳 + 随机值 / 新区块的网络难度。

![SHA256 block diagram](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash（Zcash 挖矿 [Mining]）
**Equihash** 是用于挖矿 Zcash 的哈希算法。它也被 Komodo 和 Horizen 等网络使用。

**Equihash：基于广义生日问题的非对称工作量证明**（Biryukov 和 Khovratovich）：https://eprint.iacr.org/2015/946

---

### 延伸阅读

为了更深入地理解不同类型的哈希函数及其相关用途，以下是出色的资源：  
https://en.wikipedia.org/wiki/Hash_function

---

**由 ZecHub（@ZecHub）发布的帖子**  
原始 X 帖子：https://x.com/ZecHub/status/1621240109663227906  

---

*本页面根据原始 Zero to Zero Knowledge 帖子为 ZecHub wiki 编写。*
