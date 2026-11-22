<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP 与 ZK-SNARKS

## TL;DR

- **zk-SNARKs** = 零知识 [Zero-Knowledge] 简洁非交互式知识论证
- 它们让一方能够**证明自己知道某些事情**，而无需揭示信息本身
- Zcash 使用 zk-SNARKs 来证明一笔交易 [transaction] 有效（金额正确、输入未被花费），**同时不揭示发送方、接收方或金额**
- "简洁"意味着即使对于复杂陈述，证明 [proof] 也非常小巧且验证迅速
- Orchard pool 使用 Halo 2，这是一种 zk-SNARK 系统，**无需可信设置 [trusted setup]**

---

## 什么是证明？

证明是所有数学的基础。证明是你试图证明的一个断言或定理，以及用于宣告该定理已被证明的一系列推导。例如，三角形的所有内角之和为 180°，可由任何人（验证者）独立检验。

**证明** 

证明者 ---> 提出断言 ---> 验证者选择 ---> 接受/拒绝 

（证明者和验证者都是算法）

在计算机科学中，可高效验证的证明被称为 NP 证明。这些简短证明可在多项式时间内验证。其核心思想是："存在一个定理的解，并将其交给验证者检查。"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


在一种 NP 语言中，必须满足两个条件： 

完备性：真实断言将被验证者接受（使诚实证明者能够通过验证）。

可靠性：错误断言不存在证明（无论作弊证明者采取何种策略，他们都无法证明错误断言的正确性）。


### 交互式与概率性证明

**交互**：验证者并非仅仅读取证明，而是与证明者通过多轮消息来回交互。

**随机性**：验证者向证明者提出的请求经过随机化，证明者必须能够正确回答每一个请求。 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


结合交互和随机性，可以在概率多项式时间（PPT）内向盲验证者证明一个断言。 

交互式证明能否比 NP 证明高效验证更多内容？

NP 证明与 IP 证明：

|  陈述   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  是      |  是   |
|    CO-NP     |  否       |  是   |
|    #P        |  否       |  是   |
|    PSPACE    |  否       |  是   |


NP - 某个陈述存在解

CO-NP - 证明某个陈述不存在解

#P - 计算某个陈述存在多少个解

PSPACE  - 证明不同陈述的交替

### 什么是零知识？

验证者在一次交互后能够计算出的内容，与其在交互前可证明的内容完全相同。证明者与验证者之间的多轮交互，并未增加验证者的计算能力。

**模拟 Paradigm**

该实验贯穿密码学领域。它呈现"真实视图"与"模拟视图"。 

真实视图：证明者与验证者之间所有可能的交互历史（P,V）

模拟视图：验证者模拟证明者与验证者之间所有可能的交互 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

一个多项式时间区分器会尝试判定自己看到的是真实视图还是模拟视图，并反复请求两者的样本。

如果对于所有区分器算法/策略，即使在从真实或模拟视图接收多项式数量的样本后，其概率仍大于 1/2，则称这两种视图在计算上不可区分。 

**零知识知识论证**

如果存在一个模拟器（算法），使得对于每一个概率多项式时间验证者（当定理正确时），用于区分真实视图和模拟视图的概率分布在计算上不可区分，则交互式协议（P,V）是零知识的。 

当只有一个验证者时，交互式协议非常有用。例如，零知识"税务证明"应用中的税务审计员。

## 什么是 SNARK？

**简洁非交互式知识论证**

广义定义——用于证明一个陈述为真的简洁证明。该证明必须短小且验证迅速。在 SNARKS 中，证明者向验证者发送单条消息。验证者随后可以选择接受或拒绝。 

示例陈述："我知道一条消息（m），使得 SHA256(m)=0。"

在一个 zk-SNARK 中，证明不会揭示有关消息（m）的任何信息。

**多项式**：由包含常数（如 1、2、3）、变量（如 x、y、z）和变量指数（如 x²、y³）的项相加构成。 

示例："3x² + 8x + 17"

**算术电路**：一种用于计算多项式的模型。更一般地，它可被定义为有向无环图，其中图的每个节点都执行算术运算。该电路由加法门、乘法门和一些常数门组成。如同布尔电路在线路中传递比特，算术电路传递整数。


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

在此示例中，证明者希望让验证者相信他知道该算术电路的一个解。  

**Commitment**：为此，证明者会将与电路相关的所有值（私有和公开）放入一个 commitment。Commitment 通过使用输出不可逆的函数来隐藏其输入。

Sha256 是可用于 commitment 方案的一种哈希函数示例。

证明者对这些值作出 commitment 后，commitment 会被发送给验证者（确信他们无法揭示任何原始值）。随后，证明者能够向验证者展示自己知晓图中各节点的每一个值。 

**Fiat-Shamir 变换**

为了使协议成为*非交互式*，证明者使用密码学哈希函数代表验证者生成随机性（用于隐藏挑战）。这被称为随机预言机。证明者随后可以向验证者发送单条消息，验证者可以检查其是否正确。 

要构建可用于通用电路的 SNARK，需要两个要素：

函数 commitment 方案：允许 commitment 提交者通过一个短字符串对多项式作出 commitment，验证者可用其确认对已 commitment 多项式的所声明求值。

多项式交互式预言机：验证者要求证明者（算法）使用多项式 commitment 方案，在其选择的各个点打开所有 commitment，并检查它们之间的恒等关系是否成立。

**设置**

设置程序通过概括电路并输出公共参数来帮助验证者。 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**预处理设置的类型**：

每个电路的可信设置 - 为每个电路分别运行。生成的公共参考字符串（CRS）包含证明者和验证者使用的公共参数。必须保密并销毁的是秘密的中间设置材料（"有毒废料"），而不是 CRS。ECC的[公共参数解释](https://zodl.com/snark-parameters/)区分了两者。

如果所需的秘密可信设置材料被保留或恢复，不诚实的证明者可能能够生成错误陈述的证明。在 MPC 仪式中，安全性可能取决于至少一名参与者遵循协议并销毁其秘密贡献。

可信但通用 [universal] 的设置 - 一次可信设置 [trusted setup] 会生成参数，可在所支持的大小范围内用于为多个电路派生证明和验证密钥。这仍带有秘密销毁假设；通用并不意味着透明 [transparent]。

透明设置 [Transparent setup]（无可信设置 [no trusted setup]） - 公共参数可以在无需秘密设置后门的情况下生成，而该后门原本需要有人受信任地将其销毁。这并不意味着证明过程不使用随机性，也不意味着该系统没有公共参数。[Halo 2 书籍](https://zcash.github.io/halo2/background/pc-ipa.html#setup)给出了公共群参数的示例。


**SNARK 证明构造的类型**：

[Groth16](https://eprint.iacr.org/2016/260)：需要可信设置，但其证明非常短且可快速验证。

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[PLONK](https://eprint.iacr.org/2019/953)：通用可信设置。

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o)：无需可信设置，但会产生稍长的证明，或证明者运行所需时间可能更长。 

当需要多个验证者时，SNARKS 非常有用，例如像 Zcash 这样的 blockchain，或像 [Aztec](https://docs.aztec.network) 这样的 zk-Rollup，这样多个验证节点就无需针对每个证明进行多轮交互。 

## zk-SNARK 如何在 Zcash 中实现？

通常，零知识证明是一种用于在不揭示任何信息的情况下，确保协议中诚实行为的工具。 

Zcash 是一个支持私密交易的公共 blockchain。zk-SNARK 用于证明私密交易在网络共识 [consensus] 规则内有效，而不揭示有关该交易的任何其他细节。 

[视频讲解](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - 在本讲座中，Ariel Gabizon 介绍了 Zcash Note Commitment Tree、盲多项式求值和同态隐藏挑战，以及它们如何在网络中实现。 

阅读 [Halo2 书籍](https://zcash.github.io/halo2/index.html) 以了解更多信息。

## 其他零知识应用 

zk-SNARKs 在各种不同应用中提供多项优势。让我们看看一些示例。

**可扩展性**：这通过"外包计算"实现。L1 链无需严格依赖零知识即可验证链下服务的工作。在 zk-EVM 上，交易不一定是私密的。

基于证明的 Rollup（zk-Rollup）服务的优势在于，它可处理数百或数千笔交易的批次，而 L1 能够验证所有交易均被正确处理的简洁证明，从而将网络交易吞吐量扩容 [scaling] 至 100 或 1000 倍。

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**互操作性**：这通过 zk-桥 [bridge] 实现，即在源链上"锁定"资产，并向目标链证明资产已被锁定（共识证明）。

**合规性**：诸如 [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) 的项目能够证明私密交易符合当地银行法律，同时不揭示交易详情。 

**打击虚假信息**：在 blockchain 和加密货币之外的多个示例中，新闻和媒体机构可对处理过的图像使用证明生成，使观看者能够独立验证图像来源及其上执行的所有操作。https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


进一步学习： 

[零知识书目 - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[与 Hanh Huynh Huu 一起了解 zkSNARK](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash：Halo 2 与无需可信设置的 SNARK - Sean Bowe 在 Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Avi Wigderson 讲解零知识证明 - Numberphile](https://youtu.be/5ovdoxnfFVc)

[交互式零知识证明 - Chainlink 文章](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[第 1 讲：ZKP 的介绍与历史 - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[算术电路的简单解释 - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[可扩展性很无聊，隐私已死：ZK 证明究竟有什么用？](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## 相关页面

- [屏蔽池](/using-zcash/shielded-pools) — zk-SNARKs 如何用于 Zcash 价值池
- [Halo](/zcash-tech/halo) — Zcash 的 zk-SNARK 系统，消除了可信设置
- [Zcash 中的后量子安全性](/zcash-tech/post-quantum-security) - 未来量子风险如何与 Zcash 密码学相关
- [Zcash 屏蔽资产](/zcash-tech/zcash-shielded-assets) — 构建于 zk-SNARK 技术之上的 ZSA
- [什么是 ZEC 和 Zcash](/start-here/what-is-zec-and-zcash) — Zcash 及其隐私模型介绍
- [谁能看到你的 Zcash 付款？](/start-here/who-can-see-your-zcash-payment) — 哪些内容保持公开，以及屏蔽隐藏了什么
