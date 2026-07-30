# 从 Zero 到 Zero Knowledge：哈希函数

**系列介绍**  
欢迎来到新系列：**Zero to Zero Knowledge**！  

在这个系列中，我们将学习构成隐私保护协议的各种技术基础知识。

---

## 第 1 部分：哈希函数

今天我们从**哈希函数**开始——这是区块链中使用的一项关键密码学组件。在本系列的后续内容中，我们会介绍一些依赖其性质的主题。

### 什么是哈希函数？

哈希函数接受任意长度的输入，并生成固定长度的输出。

- **待哈希的消息** = 输入  
- **所使用的算法** = 哈希函数  
- **得到的输出结果** = 哈希值  


![哈希函数示意图](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### 自己试试看！

让我们借助这个工具来获得直观理解！  
输入任意文本，生成固定长度的输出。观察在不同哈希算法下，输出会如何变化。

**立即体验：** https://cryptii.com/pipes/hash-function

---

### 密码学哈希函数的性质

密码学哈希函数必须具备以下**3 个性质**：

1. **单向性** - 逆向还原哈希函数应当在计算上不可行  
2. **抗碰撞性** - 两个不同的输入不能哈希到相同的输出  
3. **确定性** - 对于任意输入，哈希函数必须始终给出相同结果

---

### 常见哈希函数

哈希函数有若干类别。示例如下：

- 安全哈希算法（**SHA-3**）  
- 消息摘要算法 5（**MD5**）  
- **BLAKE2b** - 用于 Zcash 密钥派生

**Zooko 撰写的 BLAKE2 入门介绍**： https://www.zfnd.org/blog/blake2/

---

### 哈希函数的现实用途

#### 1. 完整性哈希（数据完整性校验）
数据完整性校验是“完整性哈希”的一个例子。它们用于为数据文件生成校验和，并向用户提供正确性保证。

![完整性哈希示例](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. 默克尔树（哈希树）
**哈希树**或**默克尔树**由分支和叶子节点组成，这些节点都标记有某个数据块的密码学哈希值。

![默克尔树示意图](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

默克尔树是**密码学承诺方案**的一个例子。树根 Root 可被视为一个承诺，而叶子节点则可被证明属于该原始承诺的一部分。

它们用于验证在 P2P 网络中存储或传输的数据，确保从对等节点接收到的数据未被篡改。

#### 3. Zcash 中的 Note Commitment Tree
在 Zcash 的 **Sapling** 和 **Orchard** 屏蔽池中，**Note Commitment Tree** 用于验证交易在共识规则下是有效的，同时完美隐藏发送者、接收者和消耗的金额。

#### 4. 签名哈希（比特币风格区块）
**SHA256** 是一种“签名哈希”的例子，用于强制保证比特币链上每个区块的不可变性。矿工在生成新区块时，会使用前一个区块的哈希 + 当前区块中所有交易的哈希（hashMerkleRoot）+ 时间戳 + 随机值 / 网络难度。

![SHA256 区块示意图](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash（Zcash 挖矿）
**Equihash** 是用于挖矿 Zcash 的哈希算法。它也被 Komodo 和 Horizen 等网络使用。

**Zcash 关于 Equihash 的原始博客文章**： https://electriccoin.co/blog/equihash/

---

### 延伸阅读

如果你想更深入理解不同类型的哈希函数及其相关用途，下面这个资源非常值得阅读：  
https://en.wikipedia.org/wiki/Hash_function

---

**ZecHub（@ZecHub）发布的线程**  
原始 X 线程： https://x.com/ZecHub/status/1621240109663227906  

---

*本页面根据 ZecHub wiki 的原始 Zero to Zero Knowledge 线程整理而成。*
