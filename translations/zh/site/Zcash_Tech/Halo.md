<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Halo

## 摘要

Halo 是由 Sean Bowe 在 Electric Coin Co 发现的无需信任、递归式零知识证明（ZKP）系统。它无需可信设置，并使递归证明组合变得实用，这正是 Zcash 当前可扩展性和安全性路线图的基础。

- **它是什么：**一种具备高效递归能力且无需可信设置仪式的 zk-SNARK 构造。
- **为何重要：**Zcash 的 Orchard 屏蔽资金池于 2022 年随 NU5 激活，运行于 Halo 2——这项研究的生产级实现。
- **关键特性：**没有设置仪式产生的“有毒废料”，且证明可为几乎无限数量的其他证明提供认证。
- **许可：**Halo 2 依据 [MIT 和 Apache 2.0](https://github.com/zcash/halo2#readme) 开源，因此生态系统中的任何人都能基于它进行构建。

---

## 核心说明

Halo 是由 Sean Bowe 在 Electric Coin Co 发现的无需信任、递归式零知识证明系统。它消除了可信设置，并让 Zcash blockchain 具备更强的可扩展性。Halo 是首个同时高效且具备递归性的零知识证明系统——被广泛视为一项科学突破。

![halo](/content-images/_unavailable.svg "halo")

### 两个组成部分

- **简洁多项式承诺方案。**允许承诺者使用一段短字符串对多项式作出承诺，验证者可用其确认对已承诺多项式求值的声明。
- **多项式交互式预言机证明。**验证者要求证明者（一个算法）使用多项式承诺方案，在其选择的点打开所有承诺，并检查它们之间的等式是否成立。

### 无需可信设置

zk-SNARKs 依赖共同参考字符串（CRS）作为证明和验证的公共参数。该 CRS 必须由可信方预先生成。直到最近，如由 Aztec 网络和 Zcash 所执行的复杂安全多方计算（MPC），仍是降低此次 [可信设置仪式](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) 所涉风险的必要手段。

Zcash 早期的 Sprout 和 Sapling 屏蔽资金池采用了 BCTV14 和 Groth16 zk-proving 系统。尽管它们是安全的，但存在局限性：它们与单一应用绑定，因而无法扩展；“有毒废料”（创世仪式期间生成的加密材料残留）可能持续存在；并且人们需要对仪式是否可接受抱有某种程度的信任（尽管这一程度极小）。

Halo 通过在椭圆曲线循环中反复将多个难题实例折叠在一起，消除了可信设置，使计算证明能够高效地对自身进行推理（嵌套摊销）。一个副作用是，结构化参考字符串（仪式的输出）变得可升级，从而支持智能合约等应用。

Halo 为用户提供了关于大规模零知识证明系统安全性的两项重要保证。首先，它使用户能够证明，参与创世仪式的任何人都没有创建用于执行欺诈交易的秘密后门。其次，它允许用户证明，即使系统经历更新和变化，其长期以来仍保持安全。

[Sean Bowe 在 Dystopia Labs 的讲解](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## 可视化 / 类比

### 公证链

把普通的 zk-SNARK 想象成一份经过公证的文件：一个印章，一次验证，就完成了。现在假设你需要证明一叠一万份文件都是真实的。没有递归，验证者就必须检查每一个印章。

Halo 将每份已验证文件变成*下一份*文件上的印章，直到整叠文件坍缩为只有一个印章的单一文件。检查最后一份文件就足以信任整条链——关键在于，Halo 的公证人（证明系统）自行生成印章，无需外部权威为其设置印鉴。

### 为什么移除可信设置很重要

在旧系统中，“印鉴”（CRS）来自一场仪式。参与者必须销毁中间材料，每个人都必须相信他们确实这样做了。Halo 的印鉴完全由数学产生：没有任何东西需要销毁，没有任何东西会泄露，也没有需要信任的仪式。

---

## 深入探讨

### 递归证明

递归证明组合使单个证明能够证明几乎无限数量的其他证明的正确性，从而压缩大量计算（和信息）。这是实现可扩展性的关键组成部分，因为它允许网络横向扩展，同时局部参与者仍可信任网络其余部分的完整性。

在 Halo 之前，实现递归证明组合需要巨大的计算成本和可信设置。其中一项主要发现是一种称为**嵌套摊销**的技术：使用基于内积论证的多项式承诺方案进行递归组合，在避免可信设置的同时大幅提升性能。

[Halo 论文](https://eprint.iacr.org/2019/1021.pdf) 完整描述了这种多项式承诺方案，并发现其中存在一种新的聚合技术。该技术让大量独立创建的证明能够以几乎与验证单个证明同样快的速度被验证。仅凭这一点，它就已为 Zcash 中使用的早期 zk-SNARKs 提供了更好的替代方案。

### Halo 2

Halo 2 是以 Rust 编写的高性能 zk-SNARK 实现，它消除了可信设置的需求，并为 Zcash 的可扩展性奠定基础。

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

它包含一种称为**累积方案**的方法泛化。这一形式化揭示了嵌套摊销实际如何运作：通过将证明添加到称为**累加器**的对象中，其中每个证明都对累加器的前一状态进行推理，只需检查累加器的当前状态，即可通过归纳法检查所有先前证明。

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

与此同时，许多其他团队正在发现比 Sonic（用于 Halo 1）更高效的多项式 IOP，例如 Marlin。其中最高效的协议是 PLONK，它在基于应用特定需求设计高效实现时提供了极大的灵活性，并且其证明者时间比 Sonic 提升 5 倍。

[PLONK 概览](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### 更广泛生态系统中的 Halo

Electric Coin Company 与 Protocol Labs、Filecoin Foundation 及 Ethereum Foundation 达成协议，探索 Halo 研发工作，包括该技术如何在各自网络中使用。该协议旨在为各生态系统及 Web 3.0 提供更好的可扩展性、互操作性和隐私性。

此外，Halo 2 采用 [MIT 和 Apache 2.0 开源许可证](https://github.com/zcash/halo2#readme)，这意味着生态系统中的任何人都可以使用该证明系统进行构建。

**Filecoin。**自部署以来，halo2 库已被 zkEVM 等项目采用，并且 Halo 2 有望集成至 Filecoin Virtual Machine 的证明系统中。Filecoin 需要大量成本高昂的时空证明和复制证明；Halo 2 对于压缩空间占用并更好地扩展网络至关重要。[Filecoin Foundation 与 Zooko 的视频](https://www.youtube.com/watch?v=t4XOdagc9xw)。如果 Filecoin 的存储付款可以使用 ZEC 完成，也将使两个生态系统受益，并为存储购买提供与 Zcash 屏蔽转账相同的隐私性——包括在 Filecoin 存储中加密文件，以及支持将媒体附加到 Zcash 加密备注的移动客户端。[ECC × Filecoin 博客文章](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum。**正在开发用于高效可验证延迟函数（VDF）的 Halo 2 证明。VDF 是一种具有众多潜在用途的加密原语，包括为智能合约提供通用随机性，以及用于权益证明中的领导者选举。ECC、Filecoin Foundation、Protocol Labs 和 Ethereum Foundation 还正与 [SupraNational](https://www.supranational.net/) 合作；该供应商专注于硬件加速加密技术，以探索 VDF 的潜在 GPU 和 ASIC 开发。[Privacy and Scaling Explorations group](https://appliedzkp.org/) 正在研究 Halo 2 证明可如何进一步提升 Ethereum 的隐私性和可扩展性。

### 使用 Halo 的其他项目

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) ——注重隐私的多链原子交换协议
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) ——Cardano 上的 L2 zkRollup
- [Darkfi](https://dark.fi/book/arch/arch.html) ——私有 L1 zkEVM blockchain
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) ——Ethereum 上的 L2 zkRollup

---

## 实际影响

**对 Zcash 本身而言**

- 随 NU5 激活的 Orchard 屏蔽资金池，是这一新证明系统在 Zcash 网络上的实现。它由 Sprout 与 Sapling 之间使用的同一旋转门设计保护，目标是逐步淘汰旧的屏蔽资金池。
- 在 NU5（2022 年年中）之后，递归证明集成成为可能，并随之带来数项隐私增强——最值得注意的是引入了取代输入/输出的“Actions”，从而减少交易元数据量。
- 移除可信设置消除了原本必须在每次重大协议升级时重复面对的系统性风险。

**对持有者和运营者而言**

- 递归证明组合有望压缩无限量的计算、创建可审计的分布式系统，并提升全节点运营者的 Layer 1 容量——这与 Zcash Shielded Assets 等扩展及 Zcash 的长期设计相关。

---

## 常见误解

| 常见看法 | 实际情况 |
| --- | --- |
| “Halo 是 Zcash 正在等待的未来升级。” | 自 NU5（2022 年）起在主网运行的 Orchard，已经运行在 Halo 2 上。 |
| “无需可信设置意味着完全不需要参数。” | Halo 仍使用结构化参数；不同之处在于，它们不含有毒废料，并且可以在无需参与者信任的仪式下生成和升级。 |
| “Halo 2 和 Halo 论文是同一件事。” | [论文](https://eprint.iacr.org/2019/1021.pdf) 描述了多项式承诺方案和嵌套摊销；Halo 2 是生产级 Rust 实现，具有累积方案和 PLONKish 算术化。 |
| “递归只对扩展区块验证有帮助。” | 递归还可压缩应用层计算——参见 Filecoin 的时空证明/复制证明以及 Ethereum 的 VDF 工作。 |

---

## 相关页面

- [zk-SNARKs](/zcash-tech/zk-snarks) ——Halo 所属的通用技术类别
- [Halo（研究论文）](https://eprint.iacr.org/2019/1021.pdf) ——原始发表文献
- [Ironwood](/zcash-tech/ironwood) 和 [The Turnstile](/zcash-tech/the-turnstile) ——屏蔽资金池如何迁移，同时淘汰旧资金池
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) ——受益于递归证明的一项扩展
- [Zebra Full Node](/zcash-tech/zebra-full-node) ——在链上验证证明的节点实现

## 延伸学习

- [ZKP 和 Halo 2 入门——Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 与 Daira 和 Str4d ——ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [技术讲解博客](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 社区展示——Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**文档**

- [Halo 2 资源](https://github.com/mhchia/awesome-halo2)
- [Halo 2 文档](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
