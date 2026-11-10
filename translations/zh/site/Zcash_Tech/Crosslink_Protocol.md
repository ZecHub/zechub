<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink 协议 [Protocol]

## TL;DR

* Crosslink 协议是为 Zcash 的混合工作量证明 [Proof-of-Work]/权益证明 [Proof-of-Stake] (PoW/PoS) 阶段提出的设计方案。它将 PoW 与拜占庭容错 [Byzantine Fault Tolerance] (BFT) 协议相结合，只要 PoW 或 PoS 其中之一仍然安全，即可确保终局性 [finality]。
* 混合 PoS 引入公证人，其根据已质押的 ZEC 验证区块——最初为静态指定，之后根据已质押的 ZEC 选举产生。
* Crosslink 旨在提供两种账本 [ledger]：用于回滚安全性的**终局账本 (LOG_fin)**，以及在其基础上最多延伸 *L* 个区块的**低延迟账本 (LOG_ba)**。
* 如果终局账本落后超过 *L* 个区块，将激活**安全模式**：PoW 继续运行，但经济活动暂停，直至问题得到解决。
* 随着时间推移，PoS 验证者将获得不断增加的奖励份额，从而减少 PoW 矿工的收益；该协议会逐步引入变更。
* 该协议由 Shielded Labs 开发，并制定了将 Crosslink 2* 整合到 Zcash 的 Zebra 客户端中的路线图。
* Crosslink 尚未在 Zcash 主网上启用。它运行于 Shielded Labs 的 Feature Net，这是一个任何人都可加入的测试网络。请参阅下方的"Crosslink 当前进展"。

## 核心说明

### 简介：Zcash 混合 PoS 与 Crosslink 协议

Crosslink 协议是 Zcash 演进过程中的里程碑式进展，使其迈向**混合权益证明 (PoS)** 与**工作量证明 (PoW)** 模型。传统 PoW 虽能可靠地保障网络安全，却因能源消耗以及工业化挖矿带来的中心化风险而受到批评。Crosslink 引入了一种混合系统，将经验证的 PoW 稳健性与 PoS 的效率和治理优势相结合。

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

这一转型符合 blockchain 创新的全球趋势，项目正转向环境可持续且去中心化的机制。Crosslinks 的双重共识模型确保 Zcash 在演进以应对当代挑战的同时，维持强大的密码学隐私保障。

混合权益证明 (PoS) 方法将传统工作量证明 (PoW) 与 PoS 相结合，旨在解决 51% 攻击等漏洞，同时维持去中心化并降低能源消耗。混合 PoS 引入根据已质押 ZEC 验证区块的公证人。该机制旨在提升链安全性和检查点验证能力，为纯 PoW 系统提供更稳健的替代方案。

### 为什么选择混合 PoS/PoW 作为首次测试？

* 它推动了向纯 PoS 迈进。
* 它支持并行的挖矿和质押用例，并促进生态系统交叉融合。
* 在 PoS 协议获得更高的验证者质押额和信任之前，它能缓解潜在的安全问题。
* Ethereum 已在生产环境中展示了这一总体方法。

### 什么是 Crosslink

Crosslink 协议是为 Zcash 的混合工作量证明/权益证明 (PoW/PoS) 阶段提出的设计方案。它将 PoW 与拜占庭容错 (BFT) 协议相结合，只要 PoW 或 PoS 其中之一仍然安全，即可确保终局性。该设计旨在通过纳入质押验证，同时维持矿工参与，来强化网络安全性和去中心化。该提案的一项关键功能称为 Crosslink 2，它通过统一 BFT 提议者和矿工来简化架构。这种精简方法可最大限度减少结构性变更，并允许使用"虚拟" BFT 层，从而更容易进行原型开发和部署，同时维持高安全标准。

实施计划包括一份路线图，其中估算了将 Crosslink 2* 整合到 Zcash 的 Zebra 客户端所需的工程成本。此分阶段部署重点在于平衡利益相关者激励、减少干扰，并与 Zcash 在扩容、可用性和去中心化方面的目标保持一致。人们对该协议稳健安全特性的信心日益增强，进一步巩固了其作为 Zcash 演进关键一步的潜力。通过解决能源效率问题并增强共识机制，Crosslink 为不断演变的 blockchain 挑战提供了前瞻性解决方案。有关更多详情，请参阅 [GitHub 存储库](https://github.com/ShieldedLabs/zebra-crosslink) 和 [Zcash 社区论坛](https://forum.zcashcommunity.com)。

### Crosslink 的宗旨与目标

Crosslink 协议旨在实现对 Zcash 未来至关重要的若干战略目标：

1. **去中心化**：
   * 通过纳入 PoS，Zcash 减少了对专用 PoW 硬件 (ASIC) 的依赖，这类硬件常常使挖矿算力集中于少数大型运营商手中。
   * PoS 允许更广泛的社区参与，持币者可质押其资产来保障网络安全，从而确保更为分散的共识。
   * 通过引入质押验证，该协议确保经济参与者在共识中发挥积极作用，减少仅依赖挖矿的情况。
2. **增强治理**：
   * 持币者通过质押获得投票权，使其能够影响有关网络升级、资金分配和生态系统优先事项的决策。这一民主机制使协议演进与社区利益保持一致。
3. **能源效率**：
   * 部分转向 PoS 可显著降低能源需求，使 Zcash 与全球可持续发展倡议保持一致。与计算密集型的 PoW 相比，PoS 天生资源消耗更低。混合系统旨在维持高安全性的同时，比仅使用 PoW 的系统降低能耗。
4. **经济安全与可持续性**：
   * 结合 PoW 和 PoS 可使网络参与者的经济激励多样化，确保稳健安全，而不过度依赖单一机制。
   * 质押还为参与者引入了可预测的奖励模型，为长期投资者创造了有吸引力的价值主张。
5. **提升安全性**：Crosslink 旨在通过将 PoS 与 PoW 相结合，增强网络抵御链重组攻击的韧性。

## 视觉化 / 类比

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

设想一家包裹服务针对同一次配送签发两份不同文件。第一份是追踪扫描：它很快出现，告诉你包裹最可能所在的位置，并且偶尔会被修正。第二份是已签署的配送收据：它稍后才会出现，但一旦存在，便无人会对此提出异议。

低延迟账本就是追踪扫描，终局账本则是已签署的收据。两者都描述同一条事件链；区别在于它们出现的速度以及其确定性的强度。

安全模式就像当签署收据停止到达而扫描记录持续累积时，配送中心所采取的做法。包裹仍会在建筑内流转——但办公室会停止仅凭扫描记录进行付款，直到签名补齐为止。

## 深入探讨

### Crosslink 的安全与性能目标

Crosslink 协议旨在为 Zcash 提供两种账本：**终局账本 (LOG_fin)** 和**低延迟账本 (LOG_ba)**。终局账本在对拜占庭容错 (BFT) 或 blockchain (BC) 协议作出合理假设的前提下，确保回滚安全性。它被设计为即使在网络分区期间也能保持活跃和安全，其延迟仅略高于当前 Zcash blockchain 在相同区块确认数下的两倍。

低延迟账本在终局账本基础上最多延伸 *L* 个区块。它仅在 blockchain 协议的保障下确保回滚安全性，并维持不逊于现有 Zcash 模型的延迟和安全性。在精简的 Crosslink 2* 设计中，低延迟账本通过充当 PoW 链来简化开发和采用。

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### 有界可用性与安全模式

Crosslink 纳入了**安全模式**，以应对低延迟账本大幅领先终局账本所带来的风险。这可以防止不一致情况，例如账户状态失衡，或服务提供商临时解决方案中未经验证的安全缺口。如果终局账本落后超过常数 *L* 个区块，便会激活安全模式。在此状态下，blockchain 会继续进行 PoW 操作（确保基本安全性），但经济活动将暂停，直至问题得到解决。该机制旨在从重大攻击等异常情况中恢复，同时支持基于治理的回滚政策。

### 技术细节与部署

Crosslink 协议正由 Shielded Labs 与 ZODL 等关键生态系统合作伙伴协作积极开发和部署。该协议的实施包括：

* 为 PoS 参与者建立安全的质押机制。
* 修改奖励结构，以平衡矿工与质押者之间的激励。
* 在转型期间确保向后兼容性和无缝的用户体验。
* 公证人系统：该协议纳入对区块进行签署的公证人。最初使用静态公证人，随后过渡到根据已质押 ZEC 选举公证人的动态系统。
* 激活逻辑：引入 Crosslink 需要修改 Zcash 共识规则，包括定义质押分配流程以及更新网络协议规则以支持混合共识。
* 分阶段部署：该协议将分阶段推出，以确保网络稳定性和社区适应。初始阶段侧重于技术实施，随后纳入用于选择公证人的治理机制。

早期原型及其文档位于 [zebra-crosslink 存储库，托管于 GitHub](https://github.com/ShieldedLabs/zebra-crosslink)，以及 [The zebra-crosslink Book](https://shieldedlabs.github.io/zebra-crosslink/)。当前工作将在下一节中说明。

### Crosslink 当前进展

Crosslink 仍是一项提案。Shielded Labs 的 [Crosslink 常见问题](https://shieldedlabs.net/crosslink-faq/) 表示，在它能够在主网上激活之前，"需要经过标准的 Zcash 治理流程"。

目前存在的是**Feature Net**：这是由 Shielded Labs 运行的测试网络，拥有自己的测试币 cTAZ，任何人都可以挖矿、质押并运行 finalizer。[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) 于 2026 年 10 月 1 日发布，起初为纯工作量证明，并分阶段启用 Crosslink：从区块 20,736 开始质押，在区块 34,560 确定首批 finalizer 名单，并从区块 36,288 开始实现 BFT 终局性（[来源](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)）。

本页中的两项内容自撰写以来已有变化：

* **此处称为公证人的角色，在 Shielded Labs 的软件和发行说明中被称为 finalizer。** 质押者将代币委托给 finalizer，拥有最多质押额的 finalizer 会投票使区块终局化。
* **代码已迁移。** 上述 zebra-crosslink 存储库最后一次更新于 2026 年 4 月。Feature Net 的发行版本来自 [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases)，其设计记录于 [Crosslink 一书](https://shieldedlabs.github.io/crosslink_book/)中。

如要亲自尝试，请遵循 [Crosslink Feature Net](/guides/crosslink-feature-net) 指南。如要在不运行任何内容的情况下观察网络，请在 Crosslink[ZecHub 工具](https://zechub.wiki/tools?tool=crosslink)中打开该标签页。

## 实际影响

### 对 PoW 矿工收入的影响

Crosslink 在为逐步转型做准备的同时，承认 PoW 矿工在 Zcash 早期发展中发挥的基础性作用：

* **区块奖励减少**：
  * 随着时间推移，PoS 验证者将获得不断增加的奖励份额，从而减少 PoW 矿工的收益。这种重新分配反映了 PoW 在混合模型中日渐缩小的作用。
* **公平转型**：
  * 该协议会逐步引入变更，确保矿工有充足时间适应，或在 Zcash 生态系统中探索新角色，例如转向质押或为其他网络服务作出贡献。
* **缓解中心化风险**：
  * PoS 质押池旨在防止权力集中，为较小参与者提供平等参与的机会。这种包容性方法对抗了当前基于 ASIC 挖矿中出现的集中化现象。
* 随着部分区块奖励被重新分配给 PoS 验证者，PoW 矿工的收入将减少。这种重新分配确保了平衡的激励体系，为保障网络安全的矿工和质押者提供奖励。
* 计划采取渐进式转型，以缓解对矿工的经济影响，同时促进利益相关者参与。

这种双重共识机制强化了 Zcash 对隐私、可持续性和去中心化的承诺，使其在 blockchain 领域成为具有前瞻性的领导者。

## 常见误区

**将 Crosslink 理解为已生效的共识规则**。本页描述的是一项带有分阶段部署计划的提案设计。引入它需要修改 Zcash 共识规则，而这正是路线图和 Zebra 整合工作的目的。

**认为 PoS 取代挖矿**。Crosslink 是混合设计：PoW 区块生产会与质押验证并行持续进行。即使在安全模式中，blockchain 也会继续进行 PoW 操作，而经济活动则暂停。

**将"终局性"视为更快确认**。终局账本被设计为在相同区块确认数下，其延迟略高于当前 Zcash blockchain 的两倍。它增加的是回滚安全性，而不是速度——低延迟账本才是快速视图。

**混淆两种账本**。LOG_ba 不是独立的链：它在终局账本基础上最多延伸 *L* 个区块，并且在 Crosslink 2* 设计中充当 PoW 链。

## 相关页面

- [Crosslink Feature Net](/guides/crosslink-feature-net) — 安装 Feature Net 桌面应用，向 finalizer 质押并查看你的位置。
- [Zebra 全节点](/zcash-tech/zebra-full-node) — 计划将 Crosslink 2* 整合到其中的客户端。
- [全节点](/zcash-tech/full-nodes) — 在任何混合共识变更之前，节点如今如何验证共识规则。
- [网络升级](/start-here/network-upgrades) — 共识规则变更如何到达 Zcash 网络。
- [Zcash 货币政策](/start-here/zcash-monetary-policy) — Crosslink 将重新分配的区块奖励结构。

## 附加资源

- 社区讨论：[Crosslink：激励型 Feature Net，发布于 Zcash 社区论坛](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- 官方更新：[Crosslink，位于 Shielded Labs](https://shieldedlabs.net/crosslink/)，以及 [Feature Net 发行版本](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- 设计参考：[Crosslink 一书](https://shieldedlabs.github.io/crosslink_book/)

  参考资料：

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
