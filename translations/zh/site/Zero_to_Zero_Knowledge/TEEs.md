# Zero to Zero Knowledge: 可信执行环境（Trusted Execution Environments，TEEs）

**系列：** Zero to Zero Knowledge

Zero to Zero Knowledge 带着新主题回归了！  
本周我们将探索 **可信执行环境（TEEs）**——它们如何应用于隐私币 [privacy coins] 和其他区块链应用。

![Trusted Execution Environments intro](/content-images/Fquj-h2WcAIgSnL-b80c8614cd.webp)

---

## TEEs 与 blockchain：互补特性

blockchain [Blockchains] 和 TEEs 具有高度互补的优势：

- **blockchain** 保证可用性、状态持久性，并允许公开验证整个状态——但其计算能力有限。  
- **TEEs** 可以私密地执行高强度计算任务——但缺乏原生状态持久性。

二者结合可创建强大的隐私保护系统。

---

## Secret Network：由 TEE 驱动的隐私

**Secret Network** 利用 TEE 技术（具体而言是 Intel SGX）对加密 [encrypted] 的输入、输出和状态执行计算。

每个验证者节点都运行 Intel SGX 芯片。共识和计算层被结合在一起：

- 交易在安全飞地内处理。  
- 数据仅在 **TEE 内部** 解密。

这不同于 Zcash，后者使用 **零知识证明 [zero-knowledge proofs]** 来保障隐私。在 Zcash 中，屏蔽交易会被广播并公开验证，不会向网络透露任何额外数据。Zcash 屏蔽资产遵循相同原则。

![Secret Network TEE diagram](/content-images/FqulPjNX0AEfjRp-c7085732a2.webp)

如需详细了解 TEEs 如何在 Secret Network 上实现，请阅读 @l_woetzel 撰写的这篇优秀文章：  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Secret Network 如何保护密钥和状态

- 网络的 **共识加密种子** 存储在每个验证者的 TEE 内。  
- 合约使用唯一且不可伪造的加密密钥。  
- Secret 合约运行在 Cosmos SDK 计算模块上，但支持加密的输入、输出和状态。

---

## 远程证明 [Remote Attestation]

**远程证明** 是证明飞地正在真实安全硬件环境中运行的过程。

它允许远程方验证：
- 正确的应用程序正在运行  
- 应用程序未被篡改  
- 它正在 Intel SGX 飞地内安全执行

![Remote Attestation explanation](/content-images/FqumRjoWwAAeT-M-6eff73af4d.webp)

飞地还包含无法从外部访问的私有签名和证明密钥。

![Enclave key protection](/content-images/Fqumv83XoAQq-MO-47c3ab77e0.webp)

---

## 数据密封 [Data Sealing]

由于飞地是无状态的，数据有时必须存储在不受信任的内存中。  

**数据密封** 使用从 CPU 派生的密钥在飞地内加密数据。加密区块 [block] 只能在**同一系统**上解除密封。

![Data Sealing diagram](/content-images/FqunBwyWYAA-TR3-933c2b0e6f.webp)

---

## Oasis Network

**Oasis Network** 也通过其机密 ParaTime（例如 Sapphire 和 Cipher）使用 TEEs。

加密数据会与智能合约一同进入 TEE。它会在离开飞地前被解密、处理并重新加密。

![Oasis Network TEE flow](/content-images/FqunJRDXwAMt4Ob-0e7969c7a8.webp)

---

## 权益证明 [Proof-of-Stake] 网络中的 TEEs

许多权益证明 blockchain（包括 Secret 和 Oasis）使用 **Tendermint** 作为其共识框架。

对于 PoS 验证者：
- 密钥必须得到安全管理，且绝不能以明文形式暴露。  
- 验证者必须保持在线（会受到停机惩罚）。  
- 对相互冲突的消息进行签名可能导致罚没。

**TEEs** 非常适合安全地生成和使用验证者密钥。

![Tendermint & PoS security](/content-images/Fqun0HEX0AAooxW-7f6163ae1e.webp)

---

## Zcash 与权益证明研究

Zcash 正在积极研究迁移至权益证明。

- 阅读研究内容：https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- 观看 Zcash Foundation 社区电话会议中的这段内容，了解不同的 PoS 设计及其隐私影响：
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**由 ZecHub（@ZecHub）发布的原始帖子**  
https://x.com/ZecHub/status/1633579659282587651

---

*本页面根据原始 Zero to Zero Knowledge 帖子为 ZecHub wiki 编写。*
