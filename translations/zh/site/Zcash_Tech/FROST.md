<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>
# FROST


## TL;DR

* FROST（Flexible Round-Optimised Schnorr Threshold Signatures）是一种阈值签名和分布式密钥生成协议：多个签名者各自持有同一私钥的一份份额，且必须达到阈值数量的签名者协作，才能生成一个签名。
* 由于结果是一个单一的 Schnorr 签名，因此通过这种方式发起的交易在网络上看起来与普通交易无异。
* 它只需要最少轮次的通信，可以并行运行，并且能够识别并排除行为异常的参与者。
* 对于 Zcash 而言，这意味着 FROST 使多个地理位置分散的参与方能够共同控制受屏蔽 ZEC 的支出授权——这对托管、托管中介、非托管服务以及 Zcash Shielded Assets（ZSA）都很有用。
* 它由 Chelsea Komlo（University of Waterloo，Zcash Foundation）和 Ian Goldberg（University of Waterloo）创建。

## 核心解释

### 什么是 Schnorr 签名？

Schnorr 数字签名是一组算法：（KeyGen、Sign、Verify）。

Schnorr 签名有几个优点。其中一个关键优势是，当多个密钥用于签署同一条消息时，得到的签名可以合并为一个单一签名。这可以显著减少多重签名支付和其他与多签相关交易的体积。

### 什么是 FROST？

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*由 Chelsea Komlo（University of Waterloo，Zcash Foundation）和 Ian Goldberg（University of Waterloo）创建。*

FROST 是一种阈值签名和分布式密钥生成协议，只需要最少的通信轮次，并且可以并行运行。FROST 协议是 Schnorr 签名方案的阈值版本。

与单方场景中的签名不同，阈值签名需要达到阈值数量的签名者进行协作，每个签名者都持有同一私钥的一份份额。

[什么是阈值签名？Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

因此，在阈值场景中生成签名会因签名者之间的网络通信轮次而产生额外开销，这在秘密份额存储于网络受限设备上，或协调发生在不可靠网络上时，会带来较高成本。

通过采用一种新的技术来防御伪造攻击，并且该技术也适用于其他方案，签名操作期间的网络开销得以降低。

FROST 改进了阈值签名协议，允许在安全前提下并行执行无限数量的签名操作（并发）。

它既可以作为一个 2 轮协议使用，即签名者总共发送和接收 2 条消息；也可以作为一种优化后的单轮签名协议使用，并配合一个预处理阶段。

FROST 实现效率提升的部分原因在于：当存在行为异常的参与者时，协议可以中止，并识别该参与者，将其排除在后续操作之外。

关于 FROST 在离散对数问题难解、且攻击者控制的参与者少于阈值这一假设下能够抵御选择消息攻击的安全性证明，可参见[这里](https://eprint.iacr.org/2020/852.pdf#page=16)。

### FROST 是如何工作的？

FROST 协议包含两个重要组成部分：

首先，n 个参与者运行一个分布式密钥生成（DKG）协议，以生成一个公共验证密钥。结束时，每个参与者都会获得一个私密的秘密密钥份额和一个公开的验证密钥份额。

之后，任意 t-out-of-n 个参与者都可以运行一个阈值签名协议，协作生成一个有效的 Schnorr 签名。

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## 可视化 / 类比

可以把 FROST 想象成一个保险箱：只有多位被授权的持钥人一起转动钥匙时才能打开——但并不要求所有持钥人都到场，只需达到一个固定数量即可（例如 5 人中的任意 3 人）。一旦保险箱被打开，外部观察者无法知道究竟是哪些持钥人到场，甚至无法判断是否有不止一人参与。同样地，一组参与者可以共同授权一笔 Zcash 交易，而网络所看到的只是一个看起来普通的单一签名。

## 深入解析

**分布式密钥生成（DKG）**

这一阶段的目标是生成长期有效的秘密密钥份额和一个联合验证密钥。该阶段由 n 个参与者运行。

FROST 在 Pedersen 的 DKG（GJKR03）基础上构建了自己的密钥生成阶段，该方案同时使用 Shamir 的秘密共享和 Feldman 的可验证秘密共享方案作为子程序。此外，每个参与者还必须通过向其他参与者发送一个零知识证明来证明自己知晓其秘密，而该证明本身就是一个 Schnorr 签名。当 t ≥ n/2 时，这一额外步骤可防止 rogue-key 攻击。

在 DKG 协议结束时，会生成一个联合验证密钥 vk。每个参与者 Pᵢ 持有一个值 (i, skᵢ)，即其长期秘密份额，以及一个验证密钥份额 vkᵢ = skᵢ *G。参与者 Pᵢ 的验证密钥份额 vkᵢ 会被其他参与者用于在签名阶段验证 Pᵢ 签名份额的正确性，而验证密钥 vk 则供外部各方用来验证该群组发出的签名。

**阈值签名**

这一阶段建立在已知技术之上，这些技术使用加法秘密共享和份额转换，以非交互方式为每个签名生成随机 nonce。它还利用绑定技术来避免已知的伪造攻击，同时不限制并发性。

在预处理阶段，每个参与者为后续使用准备固定数量的椭圆曲线（EC）点对。该阶段只需运行一次，即可服务于多个阈值签名阶段。

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

签名第 1 轮：每个参与者 Pᵢ 首先生成一个私有 nonce 对 (dᵢ, eᵢ) 及其对应的 EC 点对 (Dᵢ, Eᵢ)，然后将这对点广播给所有其他参与者。每个参与者都会存储这些 EC 点对，以供后续使用。签名第 2 轮和第 3 轮才是 t-out-of-n 个参与者协作创建有效 Schnorr 签名的实际操作阶段。

签名第 2 轮：参与者协作创建一个有效的 Schnorr 签名。这一轮背后的核心技术是 t-out-of-t 加法秘密共享。

这一步可以防止伪造攻击，因为攻击者无法跨不同的签名操作组合签名份额，也无法置换签名者集合或每个签名者已发布的点。

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

在计算出挑战值 c 后，每个参与者都可以利用一次性 nonce 和长期秘密份额来计算响应 zᵢ，而这些长期秘密份额是该群组长期密钥的 t-out-of-n（次数为 t-1）Shamir 秘密份额。在签名第 2 轮结束时，每个参与者都会将 zᵢ 广播给其他参与者。

[阅读完整论文](https://eprint.iacr.org/2020/852.pdf)

### FROST 在更广泛生态中的应用

**[Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost) 中的 FROST**

为了提升 Coinbase 阈值签名系统的效率，他们开发了一个 FROST 版本。这个 Coinbase 实现相较于原始 FROST 草案做了一些小幅修改。

他们选择不使用签名聚合者这一角色。相反，每个参与者都是签名聚合者。这样的设计更加安全：协议中的所有参与者都会验证其他人的计算，从而实现更高等级的安全性并降低风险。一次性的预处理阶段也被移除，以加快实现速度，取而代之的是增加第三轮签名。

---

**Blockstream 提出的 [ROAST](https://eprint.iacr.org/2022/550.pdf)**

有人提出了一种针对特定应用场景、基于 FROST 的改进方案，用于 [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) 上的 Bitcoin。

“ROAST 是对 FROST 这类阈值签名方案的一个简单封装。它保证诚实签名者组成的法定人数（例如 Liquid 的 functionaries）即使在存在干扰性签名者、且网络连接延迟可以任意高的情况下，也始终能够获得一个有效签名。”

---

**IETF 中的 FROST**

Internet Engineering Task Force 成立于 1986 年，是互联网领域首屈一指的标准制定组织。IETF 制定的自愿性标准通常会被互联网用户、网络运营商和设备供应商采纳，从而帮助塑造互联网的发展方向。

FROST 第 11 版（双轮变体）已[提交至 IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/)。这是朝着将 FROST 作为一种新的阈值签名方案标准、供未来数年在整个互联网、硬件设备以及其他服务中使用而进行全面评估的重要一步。


## 实际意义

毫无疑问，是的。FROST 被引入 Zcash 后，将使多个地理位置分散的参与方能够共同控制受屏蔽 ZEC 的支出授权。使用这种签名方案广播的交易将无法与网络上的其他交易区分开来，从而保持对支付追踪的强大抵抗能力，并限制可供分析的区块链数据量。

在实际中，这使得在网络上构建广泛的新应用成为可能，从托管中介服务提供商到其他非托管服务皆是如此。

FROST 还将成为 Zcash Shielded Assets（ZSA）安全发行与管理中的关键组成部分，使开发组织和持有 ZEC 的托管方（如交易所）能够更安全地管理支出授权，同时也将这一能力提供给 Zcash 用户。

## 常见错误

**将 FROST 与传统的链上多签混为一谈**。传统多签可能会在链上暴露多个签名者或多个签名。FROST 生成的是一个聚合后的单一 Schnorr 签名，因此一笔交易与单签交易无法区分。

**误以为少于阈值数量的人也能签名**。只有达到阈值数量的参与者（t-out-of-n）共同参与时，才能生成有效签名；更小的群体无法做到。

**误以为 FROST 会隐藏所有链下信息**。FROST 保护的是链上签名，但签名者之间的协调仍然发生在链下，并且仍需要相应的隐私和安全控制。


## 相关页面

- [Halo](/zcash-tech/halo) — 用于 Zcash Orchard 资金池的无信任递归证明系统。
- [Viewing Keys](/zcash-tech/viewing-keys) — 受屏蔽交易的选择性披露机制。
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — FROST 在其中帮助管理支出/发行授权。
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — Zcash 隐私基础设施的另一项核心组成部分。


## 延伸学习

[Coinbase 文章 - 阈值签名](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - 解释与示例](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[关于 Schnorr 数字签名的短视频](https://youtu.be/r9hJiDrtukI?t=19)

___
___
