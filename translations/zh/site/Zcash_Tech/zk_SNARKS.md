<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# ZKP 与 ZK-SNARKs

## TL;DR

- **ZK-SNARKs** = 零知识简洁非交互式知识论证
- 它们允许一方向另一方**证明自己知道某些信息**，而无需泄露信息本身
- Zcash 使用 ZK-SNARKs 来证明一笔交易是有效的（金额正确、输入未被花费），**同时不泄露发送方、接收方或金额**
- “Succinct（简洁）”表示即使面对复杂陈述，证明也很小且验证速度很快
- Orchard 池使用 Halo 2，这是一种**无需可信设置**的 ZK-SNARK 系统

---

## 什么是证明？

证明是所有数学的基础。证明是你试图证明的一个断言或定理，以及为宣告该定理已被证明而给出的一系列推导。例如，三角形内角和为 180°，任何人（验证者）都可以独立检查。

**证明** 

证明者 ---> 提出断言 ---> 验证者选择 ---> 接受/拒绝 

（证明者和验证者都是算法）

在计算机科学中，可高效验证的证明被称为 NP 证明。这类简短证明可以在多项式时间内完成验证。其核心思想大致是：“某个定理存在一个解，并将该解交给验证者检查”。


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


在一种 NP 语言中，必须满足两个条件： 

完备性：真实断言会被验证者接受（使诚实的证明者能够通过验证）

可靠性：错误断言不存在有效证明（对于任何作弊证明者策略，都无法证明错误断言是正确的）。


### 交互式与概率性证明

**交互性**：验证者不是只读取证明，而是在多个消息轮次中与证明者来回交互。

**随机性**：验证者向证明者发出的请求是随机的，而证明者必须能够对每个请求都正确作答。 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


将交互与随机性结合起来，就有可能在概率多项式时间（PPT）内向一个“盲”的验证者证明某个断言。 

交互式证明是否能高效验证比 NP 证明更多的内容？

NP 证明 vs IP 证明：

|  陈述   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  是      |  是   |
|    CO-NP     |  否       |  是   |
|    #P        |  否       |  是   |
|    PSPACE    |  否       |  是   |


NP - 某个陈述存在一个解

CO-NP - 证明某个陈述不存在解

#P - 统计某个陈述存在多少个解

PSPACE  - 证明不同陈述之间的交替关系

### 什么是零知识？

验证者在交互之后所能计算出的内容，与其在交互之前所能证明的内容是相同的。证明者与验证者之间经过多轮交互，并没有提升验证者的计算能力。

**模拟范式 (Simulation Paradigm)**

这个实验贯穿整个密码学。它展示了“真实视图”和“模拟视图”。 

真实视图：证明者与验证者（P,V）之间所有可能的交互历史

模拟视图：验证者模拟证明者与验证者之间所有可能的交互 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

一个多项式时间区分器会尝试判断自己看到的是真实视图还是模拟视图，并反复从二者中请求样本。

如果对于所有区分器算法/策略，即使在接收了来自真实或模拟视图的多项式数量样本之后，其判断成功概率也仅略高于 1/2，那么这两个视图就被称为“计算上不可区分”。 

**零知识知识论证**

如果存在一个模拟器（算法），使得对于每一个概率多项式时间验证者（在定理正确时），用于区分真实视图与模拟视图的概率分布在计算上不可区分，那么交互式协议（P,V）就是零知识的。 

当只存在单个验证者时，交互式协议非常有用。例如，在零知识“纳税证明”应用中，税务审计员就是这样一个验证者。

## 什么是 SNARK？

**简洁非交互式知识论证**

广义定义——一种用于证明某个陈述为真的简洁证明。该证明必须足够短，并且验证速度要快。在 SNARKs 中，只需从证明者向验证者发送一条消息。随后验证者可以选择接受或拒绝。 

示例陈述：“我知道一个消息 (m)，使得 SHA256(m)=0”

在 zk-SNARK 中，证明不会泄露关于消息 (m) 的任何信息。

**多项式**：由常数项（如 1、2、3）、变量（如 x、y、z）以及变量的幂（如 x²、y³）组成的项之和。 

示例：“3x² + 8x + 17”

**算术电路**：一种用于计算多项式的模型。更一般地说，它可以定义为一个有向无环图，在图中的每个节点执行一种算术运算。电路由加法门、乘法门以及一些常数门组成。就像布尔电路在线路中传输比特一样，算术电路在线路中传输整数。


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

在这个例子中，证明者希望让验证者相信他知道该算术电路的一个解。  

**承诺**：为此，证明者会将与电路相关的所有值（私有值和公开值）放入一个承诺中。承诺通过使用一种输出不可逆的函数来隐藏其输入。

Sha256 是可用于承诺方案的一种哈希函数示例。

在证明者对这些值做出承诺之后，承诺会被发送给验证者（验证者相信自己无法还原出任何原始值）。然后，证明者就能够向验证者展示自己知道图中各节点上的每一个值。 

**Fiat-Shamir 变换**

为了让协议变成*非交互式*，证明者使用密码学哈希函数代替验证者生成随机性（用于隐藏挑战）。这被称为随机预言机。随后证明者可以向验证者发送一条消息，由验证者检查其是否正确。 

要构造一个可用于通用电路的 SNARK，需要两个要素：

函数型承诺方案：允许承诺者用一个短字符串对一个多项式做出承诺，验证者可以利用该字符串来确认该已承诺多项式的求值声明。

多项式交互式预言机：验证者要求证明者（算法）在其选择的不同点上打开所有承诺，使用多项式承诺方案，并检查它们之间的恒等关系是否成立。

**设置**

设置过程通过总结电路并输出公共参数来帮助验证者。 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**预处理设置的类型**：

按电路进行的可信设置 - 每个电路只运行一次。它专属于某个电路，并且其中的秘密随机性（Common Reference String）必须保密并销毁。 

如果这种方法中的设置被破坏，不诚实的证明者就可以证明错误的陈述。 

可信但通用的设置 - 只需运行一次可信设置，之后就可以确定性地对多个电路进行预处理。 

透明设置（无可信设置）- 预处理算法完全不使用任何秘密随机性。 


**SNARK 证明构造的类型**：

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ)：需要可信设置，但证明非常短，且可快速验证。

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK)：通用可信设置。

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o)：无需可信设置，但生成的证明会稍长，或者证明者运行时间可能更久。 

当需要多个验证者时，SNARKS 非常有用，例如像 Zcash 这样的区块链，或像 [Aztec](https://docs.aztec.network) 这样的 zk-Rollup，这样多个验证节点就不必围绕每个证明进行多轮交互。 

## zk-SNARK's 在 Zcash 中是如何实现的？

总体而言，零知识证明是一种工具，用来在不泄露任何信息的前提下强制协议参与者保持诚实行为。 

Zcash 是一条支持私密交易的公有区块链。zk-SNARK's 用于证明一笔私密交易在网络共识规则下是有效的，同时不泄露该交易的任何其他细节。 

[视频讲解](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - 在这场讲座中，Ariel Gabizon 介绍了 Zcash Note Commitment Tree、Blind Polynomial Evaluation 和 Homomorphically Hidden Challenges，以及它们如何在网络中实现。 

阅读 [Halo2 book](https://zcash.github.io/halo2/index.html) 了解更多信息。

## 其他零知识应用 

zk-SNARKS 在各种不同应用中都提供了若干优势。下面来看一些例子。

**可扩展性**：这是通过“外包计算”实现的。L1 链在验证链下服务的工作时，并不严格要求必须使用零知识。在 zk-EVM 上，交易也不一定是私密的。

基于证明的 Rollup（zk-Rollup）服务的优势在于，它可以处理数百/数千笔交易的批次，而 L1 只需验证一个简洁证明，就能确认所有交易都已被正确处理，从而将网络交易吞吐量提升 100 倍或 1000 倍。

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**互操作性**：这在 zk-Bridge 中通过在源链上“锁定”资产，并向目标链证明这些资产已被锁定（共识证明）来实现。

**合规性**：像 [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) 这样的项目，能够证明一笔私密交易符合当地银行法规，同时不泄露交易细节。 

**对抗虚假信息**：在区块链和加密货币之外也有不少例子，例如，对新闻与媒体机构处理过的图像生成证明，使观众能够独立验证图像来源以及对其执行过的所有操作。https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


延伸学习： 

[Zero-Knowledge 参考书目 - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[与 Hanh Huynh Huu 一起了解 zkSNARK's](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash：Halo 2 与无可信设置的 SNARKs - Sean Bowe 于 Dystopia labs 的演讲](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[与 Avi Wigderson 一起了解零知识证明 - Numberphile](https://youtu.be/5ovdoxnfFVc)

[交互式零知识证明 - Chainlink 文章](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[第 1 讲：ZKP 简介与历史 - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[算术电路的简单解释 - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[可扩展性很无聊，隐私已死：ZK-Proofs 到底有什么用？](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## 相关页面

- [Shielded Pools](/using-zcash/shielded-pools) — ZK-SNARKs 如何用于 Zcash 的价值池
- [Halo](/zcash-tech/halo) — Zcash 的 ZK-SNARK 系统，可消除可信设置
- [Zcash 中的后量子安全](/zcash-tech/post-quantum-security) - 未来量子风险如何关联到 Zcash 密码学
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — 基于 ZK-SNARK 技术构建的 ZSAs
- [什么是 ZEC 和 Zcash](/start-here/what-is-zec-and-zcash) — Zcash 及其隐私模型简介
- [作为核心原则的隐私](/privacy/privacy-as-a-core-principle) — 为什么金融隐私很重要
