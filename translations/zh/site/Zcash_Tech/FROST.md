<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## TL;DR

* FROST（灵活轮次优化的 Schnorr 门限签名）是一种门限签名和分布式密钥生成协议：多名签名者各自持有共同私钥的一份份额，且必须由达到门限数量的签名者协作才能生成一个签名。
* 由于结果是单个 Schnorr 签名，以这种方式完成的交易在网络上看起来与普通交易无异。
* 它只需极少的通信轮次，可以并行运行，并且能够识别和排除行为不当的参与者。
* 对于 Zcash 而言，这意味着 FROST 使多个地理位置分散的参与方能够控制屏蔽 ZEC 的支出权限——适用于托管、托管支付、非托管服务以及 Zcash 屏蔽资产（ZSA）。
* 它由 Chelsea Komlo（滑铁卢大学，Zcash Foundation）和 Ian Goldberg（滑铁卢大学）创建。

## 核心说明

### 什么是 Schnorr 签名？

Schnorr 数字签名是一组算法：（KeyGen、Sign、Verify）。

Schnorr 签名具有多项优势。其中一项关键优势是，当使用多个密钥对同一消息进行签名时，所得签名可以合并为单个签名。这可以显著减小多重签名支付及其他与多重签名相关交易的大小。

### 什么是 FROST？

**灵活轮次优化的 Schnorr 门限签名** -
*由 Chelsea Komlo（滑铁卢大学，Zcash Foundation）和 Ian Goldberg（滑铁卢大学）创建。*

FROST 是一种门限签名和分布式密钥生成协议，只需极少的通信轮次且可并行运行。FROST 协议是 Schnorr 签名方案的门限版本。

与单方环境中的签名不同，门限签名要求达到门限数量的签名者协作，每位签名者均持有共同私钥的一份份额。

[什么是门限签名？Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

因此，在门限环境中生成签名会因签名者之间的网络轮次而产生额外开销；当秘密份额存储在网络受限设备上，或协调通过不可靠网络进行时，成本会很高。

通过采用一种可防御伪造攻击、且同样适用于其他方案的新颖技术，可减少签名操作期间的网络开销。

FROST 通过允许无限数量的签名操作安全地并行执行（并发），改进了门限签名协议。

它既可以作为 2 轮协议使用，签名者总共发送和接收 2 条消息；也可以作为带有预处理阶段的优化单轮签名协议使用。

FROST 的效率提升部分来自于允许协议在存在行为不当参与者时中止，随后识别该参与者并将其排除在未来操作之外。

安全性证明表明，假设离散对数问题难以解决，且对手控制的参与者数量少于门限，FROST 能够抵御选择消息攻击；相关证明见 [此处](https://eprint.iacr.org/2020/852.pdf#page=16)。

### FROST 如何运作？

FROST 协议包含两个重要组成部分：

首先，n 名参与者运行分布式密钥生成（DKG）协议，以生成共同验证密钥。结束时，每位参与者都会获得一份私密密钥份额和一份公开验证密钥份额。

随后，任意 t-out-of-n 名参与者均可运行门限签名协议，共同生成有效的 Schnorr 签名。

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## 可视化 / 类比

可以把 FROST 想象成一个只有多名获授权持钥人同时转动钥匙才能打开的保险箱——但并非每位持钥人都必须参与；只需达到指定数量即可（例如，5 人中的任意 3 人）。保险箱打开后，外部观察者无法判断哪些持钥人到场，甚至无法判断是否有多于一人参与。同样，一个群组可以共同授权一笔 Zcash 交易，而网络只会看到一个看似普通的签名。

## 深入探讨

**分布式密钥生成（DKG）**

此阶段的目标是生成长期秘密密钥份额和联合验证密钥。该阶段由 n 名参与者运行。

FROST 将自己的密钥生成阶段建立在 Pedersen 的 DKG（GJKR03）之上，该方案同时使用 Shamir 秘密共享和 Feldman 可验证秘密共享方案作为子程序。此外，每位参与者必须通过向其他参与者发送零知识证明，来证明其知晓自身秘密；该证明本身就是一个 Schnorr 签名。当 t ≥ n/2 时，这一额外步骤可防御流氓密钥攻击。

在 DKG 协议结束时，将生成联合验证密钥 vk。每位参与者 Pᵢ 持有一个值（i, skᵢ），即其长期秘密份额，以及一个验证密钥份额 vkᵢ = skᵢ *G。其他参与者使用参与者 Pᵢ 的验证密钥份额 vkᵢ 来验证 Pᵢ 在签名阶段的签名份额是否正确，而外部方则使用验证密钥 vk 来验证群组发出的签名。

**门限签名**

此阶段建立在已知技术之上，这些技术采用加法秘密共享和份额转换，以非交互方式为每个签名生成随机数。它还利用绑定技术，在不限制并发性的情况下避免已知的伪造攻击。

在预处理阶段，每位参与者准备固定数量的椭圆曲线（EC）点对供后续使用。该阶段会跨多个门限签名阶段运行一次。

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

签名第 1 轮：每位参与者 Pᵢ 首先生成单个私有随机数对（dᵢ, eᵢ）及相应的 EC 点对（Dᵢ, Eᵢ），然后将该点对广播给所有其他参与者。每位参与者存储这些 EC 点对供后续使用。签名第 2 和第 3 轮是真正执行操作的环节，其中 t-out-of-n 名参与者协作创建有效的 Schnorr 签名。

签名第 2 轮：参与者共同创建有效的 Schnorr 签名。本轮背后的核心技术是 t-out-of-t 加法秘密共享。

此步骤可防止伪造攻击，因为攻击者无法跨不同签名操作组合签名份额，也无法置换签名者集合或每位签名者公布的点。

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

计算出挑战值 c 后，每位参与者均可使用一次性随机数和长期秘密份额计算响应值 zᵢ；这些份额是群组长期密钥的 t-out-of-n（次数为 t-1）Shamir 秘密份额。签名第 2 轮结束时，每位参与者将 zᵢ 广播给其他参与者。

[阅读完整论文](https://eprint.iacr.org/2020/852.pdf)

### FROST 在更广泛生态系统中的应用

**FROST 在 [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost) 中**

为提高 Coinbase 门限签名系统的效率，他们开发了一个版本的 FROST。该 Coinbase 实现相较原始 FROST 草案做出了少量修改。

他们选择不使用签名聚合器角色。相反，每位参与者都是签名聚合器。这种设计更加安全：协议中的所有参与者都会验证其他人的计算，从而实现更高水平的安全性并降低风险。为加快实现速度，也移除了一次性预处理阶段，改为使用第 3 个签名轮次。

---

**由 Blockstream 开发的 [ROAST](https://eprint.iacr.org/2022/550.pdf)**

有人提议将 FROST 的一项特定应用改进用于 Bitcoin 的 [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/)。

“ROAST 是围绕 FROST 等门限签名方案的简单封装。它保证诚实签名者的法定人数，例如 Liquid 功能节点，即使在网络连接具有任意高延迟且存在干扰性签名者的情况下，也始终能够获得有效签名。”

---

**FROST 在 IETF 中**

互联网工程任务组成立于 1986 年，是互联网首屈一指的标准制定组织。IETF 制定的自愿性标准常被互联网用户、网络运营商和设备供应商采用，帮助塑造互联网的发展轨迹。

FROST 第 11 版（双轮变体）已 [提交至 IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/)。这是朝着将 FROST 作为新门限签名方案标准进行完整评估的重要一步，以便未来数年在整个互联网、硬件设备及其他服务中使用。


## 实际影响

绝对如此。将 FROST 引入 Zcash 后，可使地理位置分散的多方控制屏蔽 ZEC 的支出权限。使用该签名方案广播的交易将与网络上的其他交易无法区分，从而保持对支付追踪的强大抵抗力，并限制可供分析的 blockchain 数据量。

实际上，这使得能够在网络上构建广泛的新应用，从托管支付提供商到其他非托管服务。

FROST 还将成为安全发行和管理 Zcash 屏蔽资产（ZSA）的重要组成部分，使开发组织及 ZEC 托管方（如交易所）能够更安全地管理支出权限，同时也向 Zcash 用户提供此功能。

## 常见错误

**将 FROST 与传统链上多重签名混淆**。传统多重签名可能会在链上暴露多名签名者或多个签名。FROST 会生成单个聚合的 Schnorr 签名，因此一笔交易与单签名交易无法区分。

**认为少于门限的人数也能签名**。只有达到门限数量（t-out-of-n）的参与者共同操作，才能生成有效签名；任何更小的群组都无法做到。

**认为 FROST 能隐藏所有链下信息**。FROST 保护链上签名，但签名者之间的协调仍在链下进行，并需要自身的隐私和安全控制。


## 相关页面

- [Halo](/zcash-tech/halo) — 用于 Zcash 的 Orchard 屏蔽池的无需信任递归证明系统。
- [Viewing Keys](/zcash-tech/viewing-keys) — 用于屏蔽交易的选择性披露。
- [Zcash 屏蔽资产](/zcash-tech/zcash-shielded-assets) — FROST 有助于管理支出/发行权限的领域。
- [Zcash 钱包同步](/zcash-tech/zcash-wallet-syncing) — Zcash 隐私基础设施的另一核心部分。


## 进一步学习

[Coinbase 文章 - 门限签名](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir 秘密共享 - 说明与示例](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[关于 Schnorr 数字签名的短视频](https://youtu.be/r9hJiDrtukI?t=19)

___
___
