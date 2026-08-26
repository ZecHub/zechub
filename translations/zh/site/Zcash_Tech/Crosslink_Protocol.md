<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Protocol

## TL;DR

* Crosslink 协议是为 Zcash 的混合工作量证明/权益证明（PoW/PoS）阶段提出的一种设计。它将 PoW 与拜占庭容错（BFT）协议集成，只要 PoW 或 PoS 其中之一仍然安全，就能实现有保障的终局性。
* 混合 PoS 引入了公证人，他们基于质押的 ZEC 来验证区块——最初为静态，之后将根据质押的 ZEC 进行选举。
* Crosslink 旨在提供两套账本：用于防止回滚的**已终局账本（LOG_fin）**，以及在其基础上最多只延伸 *L* 个区块的**低延迟账本（LOG_ba）**。
* 如果已终局账本落后超过 *L* 个区块，就会启动**安全模式**：PoW 继续运行，但经济活动会暂停，直到问题解决。
* 随着时间推移，PoS 验证者将获得越来越多的奖励份额，从而减少 PoW 矿工的收入；该协议会逐步引入这些变化。
* 该协议正由 Shielded Labs 开发，并规划将 Crosslink 2* 集成到 Zcash 的 Zebra 客户端中。

## 核心解释

### 引言：Zcash 混合 PoS 与 Crosslink 协议

Crosslink 协议是 Zcash 演进过程中的一个里程碑式发展，推动其迈向**混合权益证明（PoS）**与**工作量证明（PoW）**模型。传统 PoW 虽然在保障网络安全方面可靠，但因能耗高以及与工业化挖矿相关的中心化风险而受到批评。Crosslink 引入了一种混合系统，将久经验证的 PoW 鲁棒性与 PoS 的效率和治理优势结合起来。

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

这一转型符合 blockchain 创新的全球趋势，即各个项目正在转向更具环境可持续性和去中心化的机制。Crosslink 的双重共识模型确保 Zcash 在保持其强大密码学隐私保障的同时，也能演进以应对当代挑战。

混合权益证明（PoS）方法将传统工作量证明（PoW）与 PoS 相结合，旨在解决诸如 51% 攻击之类的脆弱性，同时维持去中心化并降低能耗。混合 PoS 引入了基于质押 ZEC 验证区块的公证人。该机制旨在提升链安全性和检查点验证能力，为纯 PoW 系统提供更强健的替代方案。

### 为什么将混合 PoS/PoW 作为第一次测试？

* 它能推动向纯 PoS 迈进。
* 它支持并行的挖矿与质押用例，以及生态交叉融合。
* 在 PoS 协议拥有更高的验证者质押和更强信心之前，它可以缓解该协议可能存在的安全问题。
* 这一总体方法已被 Ethereum 在线上生产环境中验证。

### 什么是 Crosslink

Crosslink 协议是为 Zcash 的混合工作量证明/权益证明（PoW/PoS）阶段提出的一种设计。它将 PoW 与拜占庭容错（BFT）协议集成，只要 PoW 或 PoS 其中之一仍然安全，就能实现有保障的终局性。该设计旨在通过引入基于质押的验证，同时保持矿工参与，来增强网络安全性与去中心化。该提案中的一个关键特性称为 Crosslink 2，它通过统一 BFT 提议者与矿工来简化架构。这种精简方法最大限度减少了结构性变更，并允许使用一个“dummy”BFT 层，从而更容易进行原型设计和部署，同时保持高安全标准。

实施计划包含一份路线图，并估算了将 Crosslink 2* 集成到 Zcash 的 Zebra 客户端中的工程成本。该分阶段部署重点在于平衡各利益相关方的激励、减少扰动，并与 Zcash 在可扩展性、可用性和去中心化方面的目标保持一致。随着人们对该协议强大安全属性的信心不断增强，它作为 Zcash 演进关键一步的潜力也进一步得到巩固。通过解决能效问题并增强共识机制，Crosslink 为不断演化的 blockchain 挑战提供了一种面向未来的解决方案。更多细节请参阅 [GitHub repository](https://github.com/ShieldedLabs/crosslink-deployment) 和 [Zcash Community Forum](https://forum.zcashcommunity.com)。

### Crosslink 的目标与宗旨

Crosslink 协议旨在实现若干对 Zcash 未来至关重要的战略目标：

1. **去中心化**：
   * 通过引入 PoS，Zcash 减少了对专用 PoW 硬件（ASIC）的依赖，而这类硬件往往会使挖矿权力集中在少数大型运营者手中。
   * PoS 允许更广泛的社区参与，持币者可通过质押其资产来保护网络，从而确保更分布式的共识。
   * 通过引入基于质押的验证，该协议确保经济参与者在共识中发挥积极作用，减少仅依赖挖矿的情况。
2. **增强治理**：
   * 持币者通过质押获得投票权，从而能够影响有关网络升级、资金分配和生态系统优先事项的决策。这种民主机制使协议的演进与社区利益保持一致。
3. **能源效率**：
   * 部分转向 PoS 会显著降低能源需求，使 Zcash 与全球可持续发展倡议保持一致。与计算密集型的 PoW 相比，PoS 天然消耗更少资源。混合系统旨在与纯 PoW 系统相比降低能耗，同时维持高安全性。
4. **经济安全与可持续性**：
   * 结合 PoW 和 PoS 可使网络参与者的经济激励多样化，从而在不过度依赖单一机制的情况下确保强健的安全性。
   * 质押还为参与者引入了可预测的奖励模型，为长期投资者创造了有吸引力的价值主张。
5. **更高的安全性**：Crosslink 旨在通过将 PoS 与 PoW 结合，提高网络抵御链重组攻击的韧性。

## 可视化 / 类比

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

可以把它想象成一家包裹服务公司为同一次投递出具两种不同的凭证。第一种是追踪扫描：它很快出现，告诉你包裹最可能所在的位置，并且偶尔会被修正。第二种是签收回执：它来得更晚，但一旦存在，就不会有人质疑它。

低延迟账本就像追踪扫描，而已终局账本就像签收回执。二者描述的是同一串事件链；它们的区别在于出现得有多快，以及其结论有多稳固。

安全模式就像当签收回执停止到达、而扫描记录却持续堆积时，分拣中心所采取的措施。包裹仍然在仓库中流转，但办公室会停止仅凭扫描记录进行付款，直到签名回执跟上为止。

## 深入解析

### Crosslink 的安全与性能目标

Crosslink 协议旨在为 Zcash 提供两种类型的账本：**已终局账本（LOG_fin）**和**低延迟账本（LOG_ba）**。在对拜占庭容错（BFT）或 blockchain（BC）协议作出合理假设的前提下，已终局账本可确保回滚安全。它被设计为即使在网络分区的情况下也能保持活性和安全性，其延迟仅比当前 Zcash blockchain 在等效区块确认条件下略高于两倍。

低延迟账本在已终局账本基础上最多延伸 *L* 个区块。它仅依赖 blockchain 协议即可确保回滚安全，并保持不逊于现有 Zcash 模型的延迟和安全性。在精简版的 Crosslink 2* 设计中，低延迟账本通过作为 PoW 链运行，简化了开发与采用过程。

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### 有界可用性与安全模式

Crosslink 引入了**安全模式**，以应对低延迟账本远远领先于已终局账本所带来的风险。这可以防止出现不一致情况，例如账户状态失衡，或服务提供商临时解决方案中未经验证的安全缺口。如果已终局账本落后超过常数 *L* 个区块，就会激活安全模式。在这种状态下，blockchain 继续进行 PoW 操作（确保基础安全），但经济活动会暂停，直到问题得到解决。该机制旨在从重大攻击等异常条件中恢复，同时支持基于治理的回滚策略。

### 技术细节与部署

Crosslink 协议目前正由 Shielded Labs 与 Zodl 等关键生态合作伙伴积极开发和部署。该协议的实施包括：

* 为 PoS 参与者建立安全的质押机制。
* 修改奖励结构，以平衡矿工与质押者之间的激励。
* 确保在过渡期间的向后兼容性以及无缝的用户体验。
* 公证人系统：该协议引入了对区块进行签署确认的公证人。最初使用静态公证人，之后过渡到基于质押 ZEC 选举公证人的动态系统。
* 激活逻辑：引入 Crosslink 需要修改 Zcash 共识规则，包括定义质押分配流程，以及更新网络协议规则以支持混合共识。
* 分阶段部署：该协议将分阶段推出，以确保网络稳定性和社区适应。初始阶段聚焦于技术实现，随后整合用于选择公证人的治理机制。

你可以通过 [Crosslink Deployment Repository on GitHub](https://github.com/ShieldedLabs/crosslink-deployment) 查看技术细节并跟踪其进展。

## 实际影响

### 对 PoW 矿工收入的影响

Crosslink 在为逐步转型做准备的同时，也承认 PoW 矿工在 Zcash 早期发展中的基础性作用：

* **区块奖励减少**：
  * 随着时间推移，PoS 验证者将获得越来越多的奖励份额，从而减少 PoW 矿工的收入。这种重新分配反映了 PoW 在混合模型中角色的减弱。
* **公平过渡**：
  * 该协议会逐步引入变化，确保矿工有足够时间适应，或探索 Zcash 生态系统中的新角色，例如转向质押或参与其他网络服务。
* **缓解中心化风险**：
  * PoS 质押池的设计旨在防止权力集中，让较小参与者也有机会在平等基础上参与。这种包容性方法可对抗当前基于 ASIC 的挖矿所表现出的集中趋势。
* 随着部分区块奖励被重新分配给 PoS 验证者，PoW 矿工的收入将会下降。这种再分配确保了平衡的激励体系，使矿工和质押者都能因保障网络安全而获得回报。
* 计划中的渐进式转型旨在减轻对矿工的经济影响，同时促进利益相关者参与。

这种双重共识机制强化了 Zcash 对隐私、可持续性和去中心化的承诺，使其在 blockchain 领域中占据面向未来的领导者地位。

## 常见错误

**把 Crosslink 视为已启用的共识规则**。本页描述的是一个带有分阶段部署计划的提议设计。要引入它，需要修改 Zcash 共识规则，这也正是路线图和 Zebra 集成工作所针对的内容。

**以为 PoS 会取代挖矿**。Crosslink 是一种混合设计：PoW 区块生产会与基于质押的验证并行继续。即使在安全模式下，blockchain 也会继续进行 PoW 操作，只是经济活动会暂停。

**把“终局性”当作更快确认**。已终局账本的设计目标，是在等效区块确认条件下，其延迟略高于当前 Zcash blockchain 的两倍。它增加的是回滚安全性，而不是速度；快速视图是低延迟账本。

**混淆两套账本**。LOG_ba 不是一条独立的链：它是在已终局账本基础上最多延伸 *L* 个区块，而在 Crosslink 2* 设计中，它作为一条 PoW 链运行。

## 相关页面

- [Zebra 全节点](/zcash-tech/zebra-full-node) — 计划集成 Crosslink 2* 的客户端。
- [全节点](/zcash-tech/full-nodes) — 在任何混合共识变更之前，如今各节点如何验证共识规则。
- [网络升级](/start-here/network-upgrades) — 共识规则变更如何进入 Zcash 网络。
- [Zcash 货币政策](/start-here/zcash-monetary-policy) — Crosslink 将会重新分配的区块奖励结构。

## 其他资源

- 社区见解：[Zcash Community Forum - Crosslink Discussions](https://forum.zcashcommunity.com)
- 官方更新：[Electric Coin Company Blog](https://electriccoin.co)
- 可持续性重点：[Why Hybrid PoS Matters for Zcash](https://forum.zcashcommunity.com)

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
