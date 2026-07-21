### Crosslink 协议

#### **引言：Zcash 混合 PoS 与 Crosslink 协议**

Crosslink 协议是 Zcash 演进中的一项里程碑式发展，正推动其迈向 **Hybrid Proof-of-Stake (PoS)** 与 **Proof-of-Work (PoW)** 模式。传统 PoW 虽然在保障网络安全方面可靠，但因其能耗以及与工业化挖矿相关的中心化风险而受到批评。Crosslink 引入了一种混合系统，将 PoW 久经验证的稳健性与 PoS 在效率和治理方面的优势结合起来。

![image](https://github.com/user-attachments/assets/a2ffb19d-e570-4723-b669-a66e14fc6b71)

这一转型符合区块链创新的全球趋势，即各项目正转向环境可持续且更加去中心化的机制。Crosslinks 的双重共识模型确保 Zcash 在保持其强大密码学隐私保障的同时，也能不断演进以应对当代挑战。

这种混合 Proof-of-Stake (PoS) 方案结合了传统 Proof-of-Work (PoW) 与 PoS，旨在解决如 51% 攻击等脆弱性，同时保持去中心化并降低能耗。混合 PoS 引入公证人，他们根据质押的 ZEC 来验证区块。该机制旨在提升链安全性和检查点验证能力，为纯 PoW 系统提供更稳健的替代方案​。

为什么将混合 PoS/PoW 作为首次测试？
它推动了向纯 PoS 的进展
它支持并发的挖矿与质押用例以及生态交叉。
在 PoS 协议拥有更大验证者质押规模和更高信心之前，它可缓解潜在的安全问题。
这一总体方法已由 Ethereum 在生产环境中证明可行

---


### CROSSLINK
Crosslink 协议是为 Zcash 混合 Proof-of-Work/Proof-of-Stake (PoW/PoS) 阶段提出的一种设计。它将 PoW 与 Byzantine Fault Tolerance (BFT) 协议相结合，只要 PoW 或 PoS 中任一方仍然安全，就能实现有保障的终局性。该设计旨在通过引入质押验证来增强网络安全性和去中心化，同时保持矿工参与。提案中的一个关键特性被称为 Crosslink 2，它通过统一 BFT 提议者与矿工来简化架构。这种精简方法将结构性变更降到最低，并允许使用“dummy”BFT 层，从而更易于原型设计和部署，同时保持高安全标准。

其实施计划包括一份路线图，其中估算了将 Crosslink 2* 集成到 Zcash 的 Zebra 客户端中的工程成本。该分阶段部署重点在于平衡利益相关者激励、减少干扰，并与 Zcash 在可扩展性、可用性和去中心化方面的目标保持一致。随着人们对该协议稳健安全属性的信心不断增强，它作为 Zcash 演进关键一步的潜力也进一步巩固。通过解决能源效率问题并增强共识机制，Crosslink 为不断演变的区块链挑战提供了一个面向未来的解决方案。更多详情请参阅 [GitHub 仓库](https://github.com/ShieldedLabs/crosslink-deployment) 和 [Zcash 社区论坛](https://forum.zcashcommunity.com)。

![image](https://github.com/user-attachments/assets/b34afda4-fe33-448f-b0dd-279fd6cef1f5)


#### **Crosslink 的目标与宗旨**

Crosslink 协议旨在实现若干对 Zcash 未来至关重要的战略目标：

1. **去中心化**：
   - 通过引入 PoS，Zcash 降低了对专用 PoW 硬件（ASIC）的依赖，而 ASIC 往往会将算力集中到少数大型运营者手中。
   - PoS 允许更广泛的社区参与，持币者可通过质押其资产来保护网络，从而确保更分散的共识。
   - 通过引入质押验证，该协议确保经济参与者在共识中发挥积极作用，减少仅依赖挖矿的情况。

2. **增强治理**：
   - 持币者通过质押获得投票权，从而能够影响网络升级、资金分配和生态优先事项等决策。这种民主机制使协议的演进与社区利益保持一致。

3. **能源效率**：
   - 部分转向 PoS 可显著降低能源需求，使 Zcash 与全球可持续发展倡议保持一致。与计算密集型的 PoW 相比，PoS 天生资源消耗更低。混合系统旨在在保持高安全性的同时，相较纯 PoW 系统降低能源使用​

4. **经济安全与可持续性**：
   - 结合 PoW 与 PoS 可使网络参与者的经济激励多样化，确保稳健的安全性，而不必过度依赖单一机制。
   - 质押还为参与者引入了可预测的奖励模型，对长期投资者具有吸引力。
 
5. 提升安全性：Crosslink 旨在通过在 PoW 之外整合 PoS，增强网络抵御链重组攻击的韧性。


### Crosslink 的安全与性能目标

Crosslink 协议旨在为 Zcash 提供两种账本：**finalized ledger (LOG_fin)** 和 **lower-latency ledger (LOG_ba)**。最终确定账本在对 Byzantine Fault Tolerance (BFT) 或 blockchain (BC) 协议作出合理假设的前提下，确保回滚安全。其设计目标是在网络分区情况下仍保持活性与安全性，并且在同等区块确认条件下，其延迟仅略高于当前 Zcash 区块链的两倍。

低延迟账本最多只比最终确定账本多延伸 *L* 个区块。它仅依赖区块链协议即可确保回滚安全，并保持不逊于现有 Zcash 模型的延迟与安全性。在精简版 Crosslink 2* 设计中，低延迟账本通过作为一条 PoW 链运行，简化了开发与采用过程。

![image](https://github.com/user-attachments/assets/fd039664-4852-4fb0-8c88-0615f1ed116e)


### 有界可用性与安全模式

Crosslink 引入了 **Safety Mode**，用于应对低延迟账本远远领先于最终确定账本时所带来的风险。这可以防止诸如账户状态不平衡，或服务提供商临时解决方案中存在未经验证的安全缺口等不一致问题。如果最终确定账本落后超过常数 *L* 个区块，就会激活 Safety Mode。在此状态下，区块链继续执行 PoW 操作（以确保基础安全性），但经济活动会暂停，直到问题得到解决。该机制旨在从重大攻击等异常情况中恢复，同时支持基于治理的回滚策略。


---

#### **对 PoW 矿工收入的影响**

Crosslink 在为逐步转型做准备的同时，也认可 PoW 矿工在 Zcash 早期发展中的基础性作用：

- **区块奖励减少**：
   - 随着时间推移，PoS 验证者将获得越来越大的奖励份额，从而减少 PoW 矿工的收入。这种再分配反映了 PoW 在混合模型中作用的减弱。
   
- **公平过渡**：
   - 该协议将逐步引入变更，确保矿工有足够时间适应，或探索自己在 Zcash 生态中的新角色，例如转向质押或参与其他网络服务。

- **缓解中心化风险**：
   - PoS 质押池的设计旨在防止权力集中，为较小参与者提供平等参与的机会。这种包容性方法可对冲当前基于 ASIC 挖矿所呈现的集中化现象。

- 由于部分区块奖励被重新分配给 PoS 验证者，PoW 矿工的收入将会减少。这种再分配确保了平衡的激励体系，使矿工和质押者都能因保障网络安全而获得奖励。
- 计划中的渐进式过渡旨在减轻对矿工的经济影响，同时促进利益相关者参与​

---

#### **技术细节与部署**

Crosslink 协议目前正由 Shielded Labs 与包括 Zodl 在内的关键生态合作伙伴积极开发和部署。该协议的实现包括：
- 为 PoS 参与者建立安全的质押机制。
- 修改奖励结构，以平衡矿工与质押者之间的激励。
- 确保向后兼容性，并在过渡期间提供无缝的用户体验。
- 公证人系统：该协议引入了对区块进行签署确认的公证人。初期将使用静态公证人，随后过渡到基于质押 ZEC 选举公证人的动态系统。​
- 激活逻辑：引入 Crosslink 需要修改 Zcash 共识规则，包括定义质押分配流程以及更新网络协议规则以支持混合共识​
- 分阶段部署：该协议将分阶段推出，以确保网络稳定性和社区适应。初始阶段侧重技术实现，随后再集成用于选择公证人的治理机制​。

你可以通过 [GitHub 上的 Crosslink Deployment Repository](https://github.com/ShieldedLabs/crosslink-deployment) 探索技术细节并跟踪其进展。

---

#### **附加资源**
- 社区见解：[Zcash 社区论坛 - Crosslink 讨论](https://forum.zcashcommunity.com)
- 官方更新：[Electric Coin Company 博客](https://electriccoin.co)
- 可持续性重点：[为什么混合 PoS 对 Zcash 很重要](https://forum.zcashcommunity.com)

  参考： 

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

这种双重共识机制强化了 Zcash 对隐私、可持续性和去中心化的承诺，使其在区块链领域占据面向未来的领先地位。
