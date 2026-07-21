<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Halo


## 什么是 Halo？

Halo 是由 Electric Coin Co. 的 Sean Bowe 提出的一种无需信任、可递归的零知识证明（ZKP）。它消除了可信设置，并使 Zcash 区块链具备更强的可扩展性。Halo 是首个同时兼具高效性与递归性的零知识证明系统，被广泛认为是一项科学突破。

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**组成部分**

简洁多项式承诺方案：允许承诺者用一个短字符串对多项式进行承诺，验证者可以利用它来确认该已承诺多项式所声称的求值结果。

多项式交互式预言机证明：验证者要求证明者（算法）使用多项式承诺方案，在其选择的各个点上打开所有承诺，并检查它们之间的恒等关系是否成立。 


### 无需可信设置

zkSNARK 依赖公共参考字符串（CRS）作为证明和验证的公共参数。这个 CRS 必须由受信任的一方预先生成。直到最近，像 Aztec network 和 Zcash 所执行的复杂安全多方计算（MPC）仍是降低这一[可信设置仪式](https://zkproof.org/2021/06/30/setup-ceremonies/amp/)风险所必需的手段。

此前，Zcash 的 Sprout 和 Sapling 屏蔽池使用的是 BCTV14 和 Groth 16 zk 证明系统。虽然它们是安全的，但也存在局限性。它们不可扩展，因为与单一应用绑定；“有毒废料”（创世仪式期间生成的加密材料残留）可能会持续存在；并且用户仍需对该仪式是否可接受保留一定程度的信任（尽管极小）。

通过在椭圆曲线循环上反复将多个困难问题实例折叠在一起，使计算证明能够高效地对自身进行推理（嵌套摊销），从而消除了对可信设置的需求。这也意味着结构化参考字符串（仪式输出）是可升级的，从而支持智能合约等应用。

对于大规模零知识证明系统的安全性，Halo 为用户提供了两个重要保证。首先，它使用户能够证明，参与创世仪式的任何人都没有创建秘密后门来执行欺诈交易。其次，它允许用户证明该系统在经历更新和变更后，随着时间推移依然保持安全。

[Sean Bowe 在 Dystopia Labs 的讲解](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### 递归证明

递归证明组合允许单个证明为几乎无限数量的其他证明的正确性提供担保，从而压缩大量计算（以及信息）。这是实现可扩展性的关键组成部分，尤其因为它使我们能够对网络进行横向扩展，同时仍让部分参与者信任网络其余部分的完整性。

在 Halo 之前，实现递归证明组合需要巨大的计算开销和可信设置。其中一项主要发现是一种称为**嵌套摊销**的技术。这项技术允许基于内积论证的多项式承诺方案进行递归组合，在大幅提升性能的同时避免了可信设置。

在 [Halo 论文](https://eprint.iacr.org/2019/1021.pdf)中，我们完整描述了这种多项式承诺方案，并发现其中存在一种新的聚合技术。该技术允许对大量独立创建的证明进行验证，而速度几乎与验证单个证明一样快。仅这一点，就已经比 Zcash 早期使用的 zk-SNARKs 提供了更好的替代方案。


### Halo 2

Halo 2 是一个用 Rust 编写的高性能 zk-SNARK 实现，它消除了对可信设置的需求，同时为 Zcash 的可扩展性奠定了基础。 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

它包含了我们方法的一种泛化，称为**累积方案**。这一新的形式化揭示了我们的嵌套摊销技术究竟如何运作：通过将证明添加到一个称为**累加器**的对象中，而这些证明会对累加器的先前状态进行推理，我们只需检查累加器的当前状态，就可以通过归纳法验证此前所有证明都正确。

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



与此同时，许多其他团队也在发现比 Sonic（用于 Halo 1）更高效的新型 Polynomial IOP，例如 Marlin。 

这些新协议中最高效的是 PLONK，它在基于特定应用需求设计高效实现方面提供了极大的灵活性，并将证明者时间相比 Sonic 提升了 5 倍。

[PLONK 概览](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### 这对 Zcash 有何益处？

Orchard Shielded pool 已随 NU5 激活，是这一新证明系统在 Zcash 网络上的实现。它采用与 Sprout 和 Sapling 之间相同的 turnstile 设计，目标是逐步淘汰较旧的屏蔽池。这鼓励迁移到完全无需信任的证明系统，增强对货币基础健全性的信心，并整体降低 Zcash 的实现复杂度和攻击面。随着 2022 年中 NU5 的激活，递归证明的集成成为可能（尽管尚未完成）。此外，还顺带进行了多项隐私增强。引入 `'Actions'` 以取代输入/输出，有助于减少交易元数据的数量。 

可信设置通常难以协调，并带来系统性风险。每次重大协议升级都需要重复进行。消除它们，为安全实施新的协议升级带来了显著改进。 

递归证明组合具备压缩无限计算量、创建可审计分布式系统的潜力，使 Zcash 尤其在转向权益证明后具备很强的能力。这对于 Zcash Shielded Assets 等扩展，以及未来几年提升 Zcash 在全节点高负载使用场景下的 Layer 1 容量也同样有用。


## 更广泛生态中的 Halo 

Electric Coin Company 已与 Protocol Labs、Filecoin Foundation 以及 Ethereum Foundation 达成协议，共同探索 Halo 的研发工作，包括该技术如何用于各自的网络。该协议旨在为各生态系统以及 Web 3.0 提供更好的可扩展性、互操作性和隐私性。

此外，Halo 2 采用 [MIT 和 Apache 2.0 开源许可证](https://github.com/zcash/halo2#readme)，这意味着生态系统中的任何人都可以基于该证明系统进行构建。

### Filecoin

自部署以来，halo2 库已被 zkEVM 等项目采用，也有可能将 Halo 2 集成到 Filecoin Virtual Machine 的证明系统中。Filecoin 需要大量高成本的时空证明 / 复制证明。Halo2 将在压缩空间使用、提升网络扩展性方面发挥关键作用。

[Filecoin Foundation 与 Zooko 的视频](https://www.youtube.com/watch?v=t4XOdagc9xw)

此外，如果能够使用 ZEC 支付 Filecoin 存储费用，这将对 Filecoin 和 Zcash 生态都非常有利，从而使存储购买获得与 Zcash 屏蔽转账相同级别的隐私。这种支持还将带来在 Filecoin 存储中加密文件的能力，并为移动客户端增加支持，使其能够将媒体或文件**附加**到 Zcash 加密备注中。 

[ECC x Filecoin 博文](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

目前正在开发高效可验证延迟函数（VDF）的 Halo 2 证明实现。VDF 是一种具有许多潜在用途的密码学原语。 

它可以作为通用随机性的来源，包括用于智能合约应用，以及在 Ethereum 和其他协议中的权益证明领导者选举。

ECC、Filecoin Foundation、Protocol Labs 和 Ethereum Foundation 还将与[SupraNational](https://www.supranational.net/)合作，这是一家专注于硬件加速密码学的供应商，用于潜在的 GPU 和 ASIC 设计以及 VDF 的开发。

[Privacy and Scaling Exploration group](https://appliedzkp.org/) 也在研究 Halo 2 证明如何以不同方式提升 Ethereum 生态的隐私性和可扩展性。该小组隶属于 Ethereum foundation，广泛聚焦于零知识证明和密码学原语。 

## 其他使用 Halo 的项目

+ [Anoma，一种保护隐私的多链原子交换协议](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis，Cardano 上的 L2 zkRollup](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi，一条私有的 L1 zkEVM 区块链](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll，Ethereum 上的 L2 zkRollup](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**进一步学习**：

[zkp 与 halo 2 简介 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 with Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[技术讲解博客](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 社区展示 - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**文档**

[Halo 2 资源](https://github.com/adria0/awesome-halo2)

[Halo 2 文档](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)
