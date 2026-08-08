---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 用于 Shielded ZEC 的 FROST 与门限托管

> 关于 FROST 协议的完整密码学细节，请参阅 [FROST 技术页面](FROST.md)。

FROST 门限托管在 Zcash 社区讨论中不断被提起——它是 ZecHub Hackathon 2026 上最热门的赛道——但这个概念并不总是会用通俗语言来解释。本页将介绍它的含义、你在什么情况下真正需要它、它的权衡取舍，以及目前有哪些工具支持它。

---

## TL;DR

- **FROST** 允许一组密钥持有者共同控制一个 shielded Zcash 地址，而无需任何单个人持有完整私钥。
- **t-of-n** 门限的意思是：需要 t 个人共同签名才能花费；任意 t-1 人或更少的人都无法单独转移资金。
- 交易看起来和任何普通的 shielded 交易一样——链上不会留下任何能表明使用了门限签名的痕迹。
- 这与 transparent multisig 有本质区别（后者在链上是公开的，而且 Zcash 很早就已支持）——FROST 在 shielded 池内部运行。
- 它适用于 DAO、交易所、托管服务、共同储蓄和团队金库——凡是无法接受单点密钥失效的场景都适合。

---

## 用通俗的话说，什么是 FROST？

想象一下，三个商业合伙人各自持有一把密钥的一部分。要从他们共享的钱包中花费资金，三人中任意两人必须同意并共同签名。生成出来的交易与普通个人转账完全一样——观察者无法从区块链看出其中涉及了多个人。

FROST（**Flexible Round-Optimized Schnorr Threshold Signatures**）就是让这件事能够在 shielded Zcash 中实现的密码学协议。它由 Chelsea Komlo（University of Waterloo / Zcash Foundation）和 Ian Goldberg 创建。

其关键特性包括：

- **门限**：只需要 t-of-n 签名者参与即可（例如 2-of-3、3-of-5）
- **Shielded**：在 Orchard 隐私池内运行——金额、发送方和接收方都保持私密
- **不可区分**：最终签名看起来和任何其他 Zcash shielded 交易一样
- **非托管**：没有任何单一方会持有完整密钥——协调者也不例外

---

## 你应该在什么情况下使用门限托管？

当 **丢失一把密钥或失去一个人，不应该意味着资金就此丢失** 时，门限托管就很有意义。

| 场景 | 为什么门限托管有帮助 |
|-----------|----------------------------|
| **DAO 或团队金库** | 没有任何单一管理员可以单方面转走资金；需要达成共识 |
| **交易所或托管方** | 将密钥风险分散到不同的安全区域或员工之间 |
| **个人冷存储（配合可信任的家人）** | 你 + 两位家人组成 2-of-3——即使去世或失去访问权限，资金也不会丢失 |
| **托管中介** | 买方、卖方和仲裁方各持有一份分片；当其中两方同意时即可释放资金 |
| **高价值资助发放** | 类似 ZCG：付款前需要多个彼此独立的签名者批准 |
| **开发者密钥管理** | 防止内部威胁——没有任何单个工程师可以掏空协议资金池 |

对于你单独控制的个人钱包、小额资金，或是额外协调开销超过风险降低收益的场景，你很可能 **并不** 需要门限托管。

---

## 它与 transparent multisig 有什么不同？

Zcash 很早就支持 transparent multisig——从一个 t-address 花费时需要多个密钥。但 transparent multisig 带来了显著的隐私成本：**multisig 结构、所有公钥以及所有签名者在区块链上都是可见的**。

FROST 通过在 shielded 池内部运行来解决这个问题：

| | Transparent multisig | FROST 门限（shielded） |
|--|---------------------|--------------------------|
| 池 | Transparent（公开） | Orchard（shielded） |
| 链上可见签名者 | 是——所有公钥都会暴露 | 否——与单签名者花费不可区分 |
| 金额可见 | 是 | 否 |
| 需要协调 | 链上脚本 | 链下一轮通信 |
| 隐私性 | 无 | 完整的 shielded 隐私 |

---

## 权衡与限制

FROST 很强大，但在使用之前，你应该了解它也伴随着真实的权衡：

### 协调开销
签名者必须同时在线（或接近同时在线）才能完成一轮签名。如果你的 t 个签名者分布在不同的时区，或网络连接不稳定，那么花费资金就需要协调，这与单人钱包不同。

### 如果法定人数不可用，就无法签名
如果足够多的密钥持有者不可用（生病、旅行、无响应），资金将暂时无法花费。请谨慎选择你的门限和分片数量——2-of-3 比 2-of-2 更有韧性。

### 密钥生成仪式
设置 FROST 需要进行一次分布式密钥生成（DKG）仪式，所有 n 个参与者都必须同时在线。这是一次性事件，但必须谨慎完成——如果参与者在 DKG 期间被攻破，安全性就会受到破坏。

### 工具生态仍在成熟中
用于 shielded Zcash 的 FROST 还相对较新。IETF 标准（draft-irtf-cfrg-frost）已经比较成熟，但钱包集成仍然有限。与标准的单密钥钱包相比，你应该预期仍会有一些粗糙之处。

### 恢复复杂性
丢失一个分片并不是世界末日（这正是门限的意义所在），但恢复方案必须提前记录清楚。谁来持有备份？如果两个分片同时丢失，会发生什么？

---

## 谁在 Zcash 上构建 FROST？

### Zcash Foundation — frost.zfnd.org
Zcash Foundation 已经发布了一个可用的 FROST 实现和一个演示网站。这是用于测试和开发的参考实现。

### YWallet FROST Demo
YWallet（一个高性能 Zcash 钱包）已经有了早期的 FROST 演示集成。请参阅 [YWallet FROST Demo 指南](/guides/Ywallet_FROST_Demo) 获取分步说明。

### ZecHub Hackathon 2026 — FROST 赛道项目

FROST 赛道是 ZecHub Hackathon 2026 中竞争最激烈的赛道。值得关注的项目包括：

- **ZecVault** — 在主网上完成结算的 2-of-3 shielded 托管（FROST 门限）
- **Steward** — 面向 shielded Zcash 的门限托管，并聚焦恢复体验的 UX

### Coinbase
Coinbase 为其门限签名系统（用于 Bitcoin）构建了一个生产级 FROST 实现，并做出了一些修改，去除了预处理阶段，并将聚合者角色分配给所有参与者。他们的经验从生产规模上验证了 FROST 安全模型。

---

## 一次签名会话如何运作（简化版）

1. **设置（一次性）：** 所有 n 个参与者运行一次分布式密钥生成（DKG）仪式。每个人都会得到一个私有分片；随后导出一个共享公钥。没有任何一方知道完整私钥。

2. **协调签名者：** 当需要花费资金时，一名协调者（可以是签名者之一）从愿意签名的 t 个参与者那里收集承诺。

3. **第 1 轮：** 每个参与签名者生成一个 nonce 并广播一个承诺（公开且不敏感）。

4. **第 2 轮：** 每个参与签名者使用自己的私有分片计算部分签名，并将其广播出去。

5. **聚合：** 协调者将这 t 个部分签名组合成一个最终的 Schnorr 签名——在链上与单方签名不可区分。

6. **广播：** 交易像平常一样广播到 Zcash 网络。

如果任何签名者发送了错误的部分签名，协议会识别出该签名者并中止（该签名者会被排除在未来会话之外）。协调发生在链下——区块链只能看到最终交易。

---

## 如何选择你的门限参数

| 设置 | 韧性 | 风险 |
|-------|-----------|------|
| 1-of-1 | 没有韧性——单点失效 | 密钥丢失 = 永久丢失 |
| 2-of-2 | 必须两位签名者都在——没有容错能力 | 缺少一人 = 资金冻结 |
| 2-of-3 | 可以丢失或暂时不可用一个分片 | 安全裕度低于 3-of-5 |
| 3-of-5 | 可以丢失两个分片；安全性强 | 协调开销更高 |
| 3-of-7 | 机构级；可容忍两次故障 | 协调成本高 |

对大多数团队而言，一个实用的起点是：**2-of-3**（韧性强，协调成本低）或 **3-of-5**（机构级，更高安全性）。

---

## 相关页面

- [FROST — 技术深度解析](FROST.md) — 协议的密码学细节（DKG、签名轮次、安全性证明）
- [YWallet FROST Demo 指南](/guides/Ywallet_FROST_Demo) — 分步实操演示
- [FROST Demo (frostdemo)](/guides/frostdemo) — Zcash Foundation 演示教程
- [Viewing Keys](Viewing_Keys.md) — 对 shielded 地址的只读访问（可与门限托管互补）
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md) — FROST 也是 ZSA 发行的关键基础设施

## 资源

- [FROST 研究论文（Komlo 与 Goldberg，2020）](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST 标准草案（draft-irtf-cfrg-frost）](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST 实现](https://frost.zfnd.org)
- [Chelsea Komlo — 什么是门限签名？（Zcon3）](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — 门限数字签名](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — 鲁棒异步 Schnorr 门限签名（Blockstream）](https://eprint.iacr.org/2022/550.pdf)
