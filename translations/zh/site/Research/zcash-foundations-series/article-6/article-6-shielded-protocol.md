# 端到端的 Shielded Protocol
##### 来自 [Annkkitaaa](https://github.com/Annkkitaaa) 的原创研究

![替代文本](image-27.png)

### 将每个部分组装成一笔私密的 Zcash 交易

> **系列：** *Zcash from First Principles*。**第 6 篇文章：The Shielded Protocol**（终章）
> **读者对象：** 已阅读第 0 到第 5 篇文章的新手。这里是一切相互连接的地方。
> **你将获得：** 对一笔 shielded Zcash 交易完整且正确的心智模型，系列中的每个概念都会各归其位，第 0 篇文章中留下的每一个闭环也都会闭合。

我们在[第 0 篇文章](article-0-shielded-transaction.md)中，从一个悖论和一个关于公共公告板上密封信封的故事开始。随后，我们用了五篇文章构建各个部件：有限域、椭圆曲线、承诺、Merkle 树，以及零知识证明。现在，我们把它们组装起来，看看一笔真实的私密支付如何从头到尾运作。

---

## 1. 为什么你应该关心这个？

单独来看，你学过的每个部分都很巧妙。但 Zcash 的*魔力*在于它们如何彼此咬合。单靠一个 nullifier 并不能提供隐私。单靠一个 commitment 并不能防止伪造。单靠一个 proof 也证明不了任何有用的东西。正是这种**组装**，把五个组件变成了既私密又可信的货币。

这篇文章讲的就是这种组装。到最后，句子 *“网络验证一笔它看不见的交易”* 对你来说将不再像悖论，而会像你已经理解的各个部件所自然导出的明显结果。

---

## 2. 角色表，重新组装

下面这一页汇总了整个系列，把第 0 篇文章中的故事元素映射到真实机制上。

| 第 0 篇文章中的故事元素 | 真实组件 | 构建基础 |
|---|---|---|
| 信封里的钱 | **Note**（金额、接收者、随机性） | 编码为域元素（第 1 篇） |
| 密封且不透明的信封 | **Note commitment** | Pedersen / Sinsemilla commitment（第 2、3 篇） |
| 公共公告板 | **Note commitment tree**（anchor = 它的根） | 增量式 Merkle 树（第 4 篇） |
| 虚空令牌 | **Nullifier** | note + 私钥的 ZK-friendly 哈希（第 2、3 篇） |
| “流入的钱等于流出的钱” | **Value commitments + balance check** | 同态 Pedersen commitments（第 2、3 篇） |
| 幕后的魔法 | **Zero-knowledge proof** | 基于算术电路的 zk-SNARK（第 5 篇） |
| “只有你能读你的信封” | **Encrypted note + viewing keys** | 加密 + 密钥层级（本文） |

---

## 3. 密钥从何而来

用户能做的一切，都源自一个单一秘密：**spending key**，并通过一个单向层级派生出来（每个箭头都是不可逆派生，这要归功于第 2 和第 3 篇文章中的 trapdoor）：

![替代文本](image-32.png)

这里有两点值得注意，它们都来自前文的结论：

- 这种拆分让你可以分发一个 **viewing key**（比如给审计员），让对方看到你的交易，**同时不授予**花费权限。隐私是可选择披露的，而不是非黑即白。
- 每一次派生都是**单向的**：持有 viewing key 永远不能让任何人反推出 spending key，这正是第 2 篇文章中椭圆曲线 trapdoor 在发挥作用。

---

## 4. 花费一个 note：四项声明

要私密地花费一个 note，你必须在**不暴露该 note、其金额、其位置或你的身份**的前提下，同时向网络证明四件事。每一项声明都由你已经了解的某个组件来满足。

![替代文本](image-31.png)

proof **不会**泄露任何底层事实（是哪一个 note、是谁的密钥、金额是多少）。它只揭示 *这四项声明全部成立*。这就是 shielded Zcash 的全部技巧，用一张图就能说明白。

---

## 5. 金额平衡技巧（我们一直留到最后的关键回报）

在第 2 和第 3 篇文章中，我们提到过 Pedersen commitments 可以**相加**：对 `v_1` 的 commitment 加上对 `v_2` 的 commitment，等于对 `v_1 + v_2` 的一个 commitment。现在终于到了它发挥作用的地方。

每个输入和输出 note 都携带一个 **value commitment**：一个 Pedersen commitment `v.G + r.H`，它隐藏了其金额 `v`。由于这些 commitment 可以相加，网络就可以计算：

```
(sum of input value commitments) − (sum of output value commitments)
```

如果交易是平衡的（没有凭空创造或销毁货币），那么 `v` 部分会被精确抵消，只留下一个对**零金额**的 commitment，并由剩余的随机性进行盲化。发送者通过生成一个称为 **binding signature** 的小型签名，来证明自己知道这份剩余随机性。只有当金额确实平衡时，才可能生成有效的 binding signature，**而整个过程中没有暴露任何一个金额。**

> 这是整个系列中最清晰地说明我们*为什么*需要基于曲线、具备同态性的 commitments 的例子。“流入的钱等于流出的钱”这一规则，是通过**把密封信封相加**并检查结果是否密封为零来执行的。

---

## 6. 一笔完整交易：端到端观察

现在我们来组装 Alice 向 Bob 付款的过程。我们将使用 Sapling 清晰的“支出侧 / 输出侧”结构作为教学模型。

**一笔 shielded 交易会打包两类描述：**

| Spend description（消费一个 note） | Output description（创建一个 note） |
|---|---|
| 输入的 value commitment | 输出的 value commitment |
| 它所针对证明的 **anchor**（树根） | 新的 **note commitment**（一个新叶子） |
| 被花费 note 的 **nullifier** | 用于加密的 **ephemeral key** |
| 一个重新随机化的公钥 + spend authorization signature | **encrypted note**（发给接收者的密文） |
| 证明这四项声明的 **zk-SNARK** | 证明该输出格式正确的 **zk-SNARK** |

此外，还有一个针对整个打包内容的 **binding signature**，用于强制金额平衡（第 5 节）。

![替代文本](image-30.png)

观察隐私是如何实现的：网络检查了 anchor，检查了 nullifier 尚未被使用，验证了 proof，也验证了余额。它接受了一笔有效支付，**却没有得知金额、地址，也不知道究竟花费了哪个 note。** 与此同时，被花费 note 的 **nullifier**（它的死亡）和 Bob 新的 **commitment**（他的 note 的诞生）分别位于两个不同的公共结构中，二者之间没有可见连接，这正是第 0 篇文章中被切断的那条联系。

---

## 7. 闭合第 0 篇文章中的每一个闭环

第 0 篇文章有意留下了一些问题。现在它们都闭合了。

| 第 0 篇文章中开启的闭环 | 由什么闭合 |
|---|---|
| 密封但不可伪造的信封如何成为可能？ | Commitments：随机性带来隐藏性，碰撞抗性 / 曲线 trapdoor 带来绑定性（第 3 篇） |
| 密钥和秘密配方从哪里来？ | 域运算与椭圆曲线标量乘法（第 1、2 篇） |
| “公告板”到底是什么？ | 一棵由 note commitments 组成的增量式 Merkle 树；其根就是 anchor（第 4 篇） |
| 为什么虚空令牌不能和它的信封关联起来？ | nullifier 是一种带密钥哈希，并且存放在与 commitments 分离的集合中（第 2、3、4 篇） |
| 如何在不透露任何信息的情况下证明有效性？ | 对编码全部四项声明的算术电路运行 zk-SNARK（第 5 篇） |
| 接收者如何知道自己收到了付款？ | note 会加密到其地址；他们使用 viewing key 进行试探解密（本文） |
| “流入的钱 = 流出的钱”如何被私密地强制执行？ | 同态 value commitments + binding signature（第 5 节） |

第一页上的那个悖论——*验证你看不见的东西*——现在已经被彻底消解。网络验证的是**关于隐藏数据的声明**，而从不是数据本身。

---

## 8. 用一句话说清 Sapling 和 Orchard 的区别

我们采用 Sapling 的结构进行讲解，因为它的拆分最清晰。当前设计 **Orchard** 是对这些思想的完善，而不是替代：

| | **Sapling** | **Orchard** |
|---|---|---|
| 交易单元 | 分离的 **Spend** 和 **Output** 描述 | 统一的 **Actions**（每个都执行一次 spend + 一次 output） |
| 证明系统 | **Groth16**（trusted setup） | **Halo 2**（无需 trusted setup） |
| 曲线 | BLS12-381 + Jubjub | Pallas / Vesta（Pasta） |
| Commitment 哈希 | Pedersen | Sinsemilla |

本文中的每个概念都可以直接迁移过去；Orchard 主要是把 spend 和 output 打包到一起，并换用了一个无需仪式的证明系统。五大支柱并没有改变。

---

## 9. 一个诚实的免责声明

这是本系列中最完整的图景，但它依然只是一个模型。我们压缩了 note 的精确域编码、精确的密钥派生公式、spend keys 的重新随机化、diversified addresses、memo fields、手续费处理、value commitments 与 note commitments 的完整细节区别，以及每一种签名的精确作用。我们还只展示了一种规范流程；真实交易可以同时包含多个 spends 和 outputs，也可能混合 transparent 与 shielded 部分。权威来源是 Zcash Protocol Specification。你现在掌握的是正确的整体形状；而规范则补上每一个精确尺寸。

---

## 10. 总结

- 一笔 shielded 交易将五个组件全部联锁起来：一个 **note**（金额）、它在 **note commitment tree** 中的 **commitment**、用于防止双花的 **nullifier**、用于平衡的 **value commitments**，以及把这一切绑定在一起的 **zk-SNARK**。
- 一次花费会**同时证明四项声明**：该 note 确实存在、你有权花费、它的 nullifier 是正确的，并且金额平衡，而且这一切都在**零知识**下完成，不会泄露任何底层事实。
- **金额平衡**是通过**对同态 commitments 求和**并检查它们是否密封为零来强制执行的，这依赖 **binding signature**，且不会披露任何金额。
- 用户的能力都源于一个 **spending key**，并通过一个**单向层级**向下流动，从而实现 **viewing keys**：它们可以揭示信息，但不会授予花费权限。
- 网络所验证的是**关于隐藏数据的声明**，从而消解了第 0 篇文章中“验证与隐私”之间的悖论。那里开启的每一个闭环，现在都已闭合。
- **Orchard** 是对 **Sapling** 的完善（统一 Actions、无需 trusted setup 的 Halo 2、Pasta 曲线、Sinsemilla），但并未改变五大支柱。

---

## 术语表

| 术语 | 通俗含义 |
|---|---|
| **Spending key** | 用户所有密钥派生出的唯一根秘密 |
| **Viewing key** | 允许持有人查看你的交易，但不能让其花费 |
| **Spend description** | 交易中消费一个 note 的部分（nullifier、anchor、proof） |
| **Output description** | 交易中创建一个 note 的部分（commitment、ciphertext、proof） |
| **Action (Orchard)** | 将一次 spend 和一次 output 统一在一起的单元 |
| **Value commitment** | 对某个金额的同态 Pedersen commitment |
| **Binding signature** | 证明金额平衡且不泄露金额的签名 |
| **Anchor** | spend 用来证明成员关系所针对的树根 |
| **Trial decryption** | 接收者测试新 commitments，以找出哪些 note 是发给自己的 |

---

## 常见问题

**网络真的看不到金额，也看不到是谁付给谁吗？**
是的。它只验证 proof、nullifier 的新鲜性、anchor，以及 binding signature。所有私密数值都保持隐藏。

**是什么阻止我把同一个 note 花两次？**
是 nullifier。花费时会公布它；网络会拒绝任何已经存在于 nullifier 集合中的 nullifier。同一个 note 总会生成同一个 nullifier。

**如果金额被隐藏了，怎么还能检查平衡？**
Value commitments 具有同态可加性；一笔平衡交易中的 commitments 会抵消成一个对零的 commitment，而 binding signature 会证明这一点。

**我能向审计员证明我的交易，同时又不放弃控制权吗？**
可以。把 viewing key 交给对方即可。它会揭示你的 shielded 活动，但由于单向密钥层级的存在，它无法授权花费。

**既然 Orchard 已经存在，Sapling 现在是不是过时了？**
二者都曾经在网络上存在；Orchard 是当前设计。它们共享同一套概念，所以理解其中一个，就能理解另一个。

---

### 测试一下你的直觉

有个朋友说：“既然 proof 会隐藏金额，那小偷完全可以声称自己的输出比输入更值钱，然后凭空印出免费资金。”请用第 5 节的内容，用两句话解释为什么这行不通。*(答案如下。)*

<details><summary>答案</summary>

金额虽然被隐藏了，但每一个金额都被封装在一个同态 value commitment 中，而网络会把所有输入 commitments 相加，再减去所有输出 commitments；如果隐藏金额不平衡，结果就不会密封为零，**也就不可能生成有效的 binding signature。** 小偷可以隐藏*具体多少*，但无法让不平衡的金额通过余额检查，因此不可能凭空印钱；即使什么都不公开，算术本身依然会把作弊行为抓出来。
</details>

---

### 系列完结

你现在已经从一个单一悖论，走到了完整的私密支付：

![替代文本](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


从这里开始，自然的下一段旅程会更深入：Groth16 与 Halo 2 的内部工作原理、trusted-setup 仪式、Sapling 和 Orchard 电路的详细结构、密钥派生与 diversified addresses，以及协议在各次网络升级中的演进。但现在，基础已经建立起来了，而以上每一个主题也都有了可以附着的正确位置。

*属于* Zcash from First Principles *系列的一部分，由 [ZecHub](https://zechub.org) 发布。采用 CC BY-SA 4.0 许可。*
