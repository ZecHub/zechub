<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Halo

## TL;DR

Halo 是由 Sean Bowe 在 Electric Coin Co 发现的无需信任、可递归的零知识证明（zero-knowledge proof，ZKP）系统。它消除了可信设置的需求，并使递归证明组合变得实用，这是 Zcash 当前扩容与安全路线图的基础。

- **它是什么：**一种 zk-SNARK 构造，具有高效递归能力且无需可信设置仪式。
- **它为何重要：**Zcash 的 Orchard 屏蔽池于 2022 年随 NU5 激活，并运行在 Halo 2 上——这项研究的生产实现。
- **关键特性：**设置仪式不会产生“有毒废料”，且证明可以证明实际上无限数量的其他证明。
- **许可：**Halo 2 根据 [MIT 和 Apache 2.0](https://github.com/zcash/halo2#readme) 以开源方式发布，因此生态系统中的任何人都可以基于它进行构建。

---

## 核心说明

Halo 是由 Sean Bowe 在 Electric Coin Co 发现的无需信任、可递归的零知识证明系统。它消除了可信设置，并使 Zcash blockchain 具备更强的扩容能力。Halo 是首个既高效又可递归的零知识证明系统——被广泛视为一项科学突破。

![halo](/content-images/_unavailable.svg "halo")

### 两个组成部分

- **简洁多项式 commitment 方案。**允许提交者使用一个短字符串对多项式进行 commitment，验证者可使用该字符串确认已提交多项式的声称求值。
- **多项式交互式预言机证明。**验证者使用多项式 commitment 方案，要求证明者（一个算法）在其选择的点打开所有 commitment，并检查它们之间的恒等式是否成立。

### 无需可信设置

某些 zk-SNARK 构造，例如 Groth16，需要可信设置来生成其公共参数，通常称为公共参考字符串（CRS）。CRS 会与证明者和验证者共享；它并不是必须销毁的秘密。此类设置产生的秘密中间材料（"有毒废料"）必须被丢弃。安全多方计算可以分散这份信任：只要至少一名参与者遵循协议并销毁其秘密贡献，该仪式就是安全的。请参阅 ECC 对 [公共参数和有毒废料的解释](https://zodl.com/snark-parameters/)。

Zcash 早期的 Sprout 和 Sapling 屏蔽池分别使用了可信设置证明系统（trusted-setup proving systems）BCTV14 和 Groth16。它们的公共参数（public parameters）仍可用于生成证明和验证。问题在于秘密设置材料是否被保留，这可能允许伪造证明；发布 CRS 本身是预期行为，并不会泄露该秘密材料。

Halo 将递归证明组合与基于内积论证的多项式 commitment 方案相结合。其公共参数不需要可信设置仪式或销毁秘密设置后门。[Halo 2 一书描述了这些公共群参数](https://zcash.github.io/halo2/background/pc-ipa.html#setup)。这不同于将由仪式生成的结构化参考字符串变为可升级。

移除这一设置要求，避免了 Halo 证明依赖于秘密仪式材料的销毁。这并不能证明较早的 Sprout 或 Sapling 仪式未被破坏，也不能保证之后所有协议变更都是安全的。递归证明 [Recursive proofs] 在证明系统假设下，证实其电路中编码的计算。正确的电路和实现仍然至关重要；ECC 的 [Halo 2 部署说明](https://zodl.com/technical-explainer-halo-on-zcash/)明确指出了新漏洞或设计缺陷的风险。

[Sean Bowe 在 Dystopia Labs 的说明](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## 可视化 / 类比

### 公证链

可以把普通的 zk-SNARK 想象成一份经公证的文件：一个印章，一次验证，完成。现在假设你需要证明一叠一万份文件都是真实的。没有递归时，验证者必须检查每一个印章。

Halo 将每一份已验证文件变为*下一份*文件上的一个印章，直到整叠文件被折叠为一份带有单个印章的文件。检查最后一份文件便足以信任整条链——关键在于，Halo 的公证人（证明系统）自行生成印章，且完全不需要外部机构来设置其印章。

### 为什么移除可信设置很重要

在较早的可信设置[trusted setup]系统中，公开的“印章”（CRS）来自一场仪式。参与者必须销毁他们秘密的中间材料，同时保持公开参数可用。Halo 避开了那场仪式及其秘密设置陷门。这并不能消除保护用户花费密钥[spending keys]的需求，也不能消除核查证明[proof]系统的假设与实现的需求。

---

## 深入探讨

### 递归证明

递归证明组合允许单个证明证明实际上无限数量的其他证明的正确性，从而压缩大量计算（及信息）。这是扩容的关键组成部分，因为它允许网络横向扩展，同时部分参与者仍可信任网络其余部分的完整性。

在 Halo 之前，实现递归证明组合需要巨大的计算成本和可信设置。其中一项主要发现是一种称为**嵌套摊销**的技术：它使用基于内积论证的多项式 commitment 方案进行递归组合，在避免可信设置的同时大幅提升性能。

[Halo 论文](https://eprint.iacr.org/2019/1021.pdf) 完整描述了这一多项式 commitment 方案，并发现其中存在一种新的聚合技术。该技术使大量独立创建的证明能够以接近验证单个证明的速度完成验证。即使单独来看，这已为 Zcash 中使用的早期 zk-SNARKs 提供了更好的替代方案。

### Halo 2

Halo 2 是以 Rust 编写的高性能 zk-SNARK 实现，它消除了可信设置的需求，同时为 Zcash 的扩容奠定基础。

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

它包含了被称为**累积方案**的方法泛化。这一形式化揭示了嵌套摊销实际如何运作：通过将证明添加到称为**累加器**的对象中，每个证明都会推理累加器的先前状态，因此只需检查累加器的当前状态，便可通过归纳法检查所有先前证明。

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

与此同时，许多其他团队正在发现比 Sonic（用于 Halo 1）更高效的多项式 IOP，例如 Marlin。这些协议中最高效的是 PLONK，它在根据应用特定需求设计高效实现时提供极大灵活性，并带来比 Sonic 快 5× 的证明者时间。

[PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ) 概览

### 更广泛生态系统中的 Halo

Electric Coin Company 与 Protocol Labs、Filecoin Foundation 以及 Ethereum Foundation 达成协议，探索 Halo 的研发，包括该技术可如何应用于各自网络。该协议旨在为各生态系统及 Web 3.0 提供更好的扩容性、互操作性和隐私。

此外，Halo 2 采用 [MIT 和 Apache 2.0 开源许可](https://github.com/zcash/halo2#readme)，这意味着生态系统中的任何人都可以使用该证明系统进行构建。

**Filecoin。**自部署以来，halo2 库已被 zkEVM 等项目采用，并且 Halo 2 有可能集成到 Filecoin Virtual Machine 的证明系统中。Filecoin 需要大量成本高昂的时空证明和复制证明；Halo 2 对于压缩空间使用量及更好地扩容网络至关重要。[Filecoin Foundation 与 Zooko 的视频](https://www.youtube.com/watch?v=t4XOdagc9xw)。如果 Filecoin 的存储支付可以使用 ZEC 进行，这也将使两个生态系统受益，为存储购买提供与 Zcash 屏蔽转账相同的隐私——包括在 Filecoin 存储中加密文件，并支持将媒体附加至 Zcash 加密备忘录的移动客户端。[ECC × Filecoin 博客文章](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum。**正在开发用于高效可验证延迟函数（VDF）的 Halo 2 证明。VDF 是一种具有许多潜在用例的加密原语，包括用于智能合约的通用随机性以及权益证明中的领导者选举。ECC、Filecoin Foundation、Protocol Labs 和 Ethereum Foundation 也正与 [SupraNational](https://www.supranational.net/) 合作；该供应商专注于硬件加速加密技术，以探索 VDF 的潜在 GPU 和 ASIC 开发。[Privacy and Scaling Explorations 小组](https://appliedzkp.org/) 正在研究 Halo 2 证明可如何进一步提升 Ethereum 的隐私和扩容能力。

### 使用 Halo 的其他项目

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) ——一种保护隐私的多链原子兑换协议
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) ——Cardano 上的 L2 zkRollup
- [DarkFi](https://dark.fi/book/arch/arch.html) ——私有 L1 zkEVM blockchain
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) ——Ethereum 上的 L2 zkRollup

---

## 实际影响

**对于 Zcash 本身**

- 随 NU5 激活的 Orchard 屏蔽池，是该新证明系统在 Zcash 网络上的实现。它由与 Sprout 和 Sapling 之间相同的 turnstile 设计保护，旨在逐步淘汰较早的屏蔽池。
- 在 NU5（2022 年年中）之后，递归证明集成成为可能，并随之带来多项隐私增强——最显著的是引入了取代输入/输出的“操作”，从而减少交易元数据量。
- 移除可信设置消除了原本必须为每次重大协议升级重复面对的系统性风险。

**对于持有者和运营者**

- 递归证明组合有望压缩无限量计算、创建可审计的分布式系统，并提升全节点运营者的 Layer 1 容量——这与 Zcash Shielded Assets 等扩展以及 Zcash 的长期设计相关。

---

## 常见误解

| 常见看法 | 实际情况 |
| --- | --- |
| "Halo 是 Zcash 正在等待的未来升级。" | 自 NU5（2022）起已在主网上线的 Orchard，已运行在 Halo 2 上。 |
| "无需可信设置意味着完全没有参数。" | Halo 仍使用公开参数 [public parameters]。它们不需要举行仪式，让参与者受信任地销毁秘密设置材料。 |
| "Halo 2 和 Halo 论文是同一件事。" | [论文](https://eprint.iacr.org/2019/1021.pdf) 描述了多项式 commitment 方案和嵌套摊销；Halo 2 是带有累积方案和 PLONKish 算术化的生产级 Rust 实现。 |
| "递归只对扩容区块验证有帮助。" | 递归也能压缩应用层计算——请参阅 Filecoin 的时空/复制证明以及 Ethereum 的 VDF 工作。 |

---

## 相关页面

- [zk-SNARKs](/zcash-tech/zk-snarks) ——Halo 所属的通用技术类别
- [Halo（研究论文）](https://eprint.iacr.org/2019/1021.pdf) ——原始发布文献
- [Ironwood](/zcash-tech/ironwood) 和 [The Turnstile](/zcash-tech/the-turnstile) ——屏蔽池如何迁移以及较早池如何退役
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) ——受益于递归证明的一项扩展
- [Zebra Full Node](/zcash-tech/zebra-full-node) ——验证链上证明的节点实现

## 延伸学习

- [ZKP 与 Halo 2 简介 ——Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 与 Daira 和 Str4d ——ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [技术说明博客](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 社区展示 ——Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**文档**

- [Halo 2 资源](https://github.com/mhchia/awesome-halo2)
- [Halo 2 文档](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
