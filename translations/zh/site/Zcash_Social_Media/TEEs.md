# 从零到零知识：可信执行环境（TEEs）

**系列：** Zero to Zero Knowledge

Zero to Zero Knowledge 带着一个新主题回来了！  
本周我们来探索 **可信执行环境（TEEs）** —— 它们如何用于隐私币和其他区块链应用。

![可信执行环境介绍](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEEs 与区块链：互补的属性

区块链与 TEEs 的优势非常互补：

- **区块链** 保证可用性、状态持久化，并允许对整个状态进行公开验证——但其计算能力有限。  
- **TEEs** 可以私密地执行高强度计算任务——但缺乏原生的状态持久化能力。

二者结合可以构建强大的隐私保护系统。

---

## Secret Network：由 TEE 驱动的隐私

**Secret Network** 利用 TEE 技术（具体来说是 Intel SGX）对加密输入、输出和状态执行计算。

每个验证者节点都运行 Intel SGX 芯片。其共识层与计算层是结合在一起的：

- 交易在安全 enclave 内处理。  
- 数据只会在 **TEE 内部** 被解密。

这与 Zcash 不同，后者使用 **零知识证明** 来实现隐私。在 Zcash 中，屏蔽交易会被广播并公开验证，而不会向网络透露额外数据。Zcash Shielded Assets 也遵循同样的原则。

![Secret Network TEE 图示](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

如需详细了解 TEEs 在 Secret Network 中是如何实现的，请阅读 @l_woetzel 的这篇精彩文章：  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Secret Network 如何保护密钥和状态

- 网络的 **共识加密种子** 存储在每个验证者的 TEE 内。  
- 合约使用独特且不可伪造的加密密钥。  
- Secret 合约运行在 Cosmos SDK 计算模块上，但支持加密输入/输出和状态。

---

## 远程认证

**远程认证（Remote Attestation）** 是证明某个 enclave 正在真实的安全硬件环境中运行的过程。

它允许远程一方验证：
- 正在运行的是正确的应用程序  
- 应用程序未被篡改  
- 它正在 Intel SGX enclave 内安全执行

![远程认证说明](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

enclave 还包含私有签名密钥和认证密钥，这些密钥无法从外部访问。

![enclave 密钥保护](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## 数据封装

由于 enclave 是无状态的，数据有时必须存储在外部的不受信任内存中。  

**数据封装（Data Sealing）** 会在 enclave 内使用由 CPU 派生的密钥对数据进行加密。该加密数据块只能在 **同一系统** 上解封。

![数据封装图示](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** 也通过其机密 ParaTime（例如 Sapphire 和 Cipher）使用 TEEs。

加密数据会与智能合约一起进入 TEE。在离开 enclave 之前，数据会被解密、处理，然后重新加密。

![Oasis Network TEE 流程](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## Proof-of-Stake 网络中的 TEEs

许多 Proof-of-Stake 区块链（包括 Secret 和 Oasis）都使用 **Tendermint** 作为其共识框架。

对于 PoS 验证者而言：
- 密钥必须被安全管理，且绝不能以明文形式暴露。  
- 验证者必须保持在线（停机会受到惩罚）。  
- 对冲突消息进行签名可能会导致罚没。

**TEEs** 非常适合安全地生成和使用验证者密钥。

![Tendermint 与 PoS 安全性](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash 与 Proof-of-Stake 研究

Zcash 正在积极研究迁移到 Proof-of-Stake。

- 阅读研究内容：https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- 观看这段来自 Zcash Foundation Community Call 的片段，其中解释了不同的 PoS 设计及其隐私影响：
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS 设计"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**原始线程作者：ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*本页面由原始的 Zero to Zero Knowledge 线程整理编写，供 ZecHub wiki 使用。*
