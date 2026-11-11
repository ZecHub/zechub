<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Shielded_Labs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# <img src="/content-images/Shielded-labs-shield-white-2-27aef199ae.webp" alt="Shielded Labs logo" width="50"/> Shielded Labs

[Shielded Labs](https://shieldedlabs.net/) 是一家位于瑞士、独立且由捐款资助的 Zcash 支持组织。其使命是构建不可阻挡的私密货币，以赋能人类自由和自主主权，重点开展促进 Zcash 网络可持续性、安全性和扩容 [scalability] 的工作。

Shielded Labs 为 Zcash 生态系统增添了独立的工程能力。它不属于 Electric Coin Company、Zcash Foundation 或 Zcash Community Grants，并将自身描述为首个未从开发基金或区块奖励中获得直接或间接资金的 Zcash 生态系统组织。

## 使命与角色

Shielded Labs 专注于协议和基础设施工作，以使 Zcash 在长期内更具韧性。其公开材料强调：

- 人类自由和金融隐私 [privacy]
- 开发基金以外的独立资金
- 尊重 ZEC 持有者和持币者意见
- 用户自主性和自主主权
- 促进可持续性、安全性和扩容的技术创新
- 与其他 Zcash 贡献者合作

该组织通过直接工程开发、公开研究、基础设施支持和生态系统协调作出贡献。它还维护有关治理 [governance] 投票和持币者导向资金的公开资源，帮助 Zcash 社区成员了解何时以及如何参与治理信号。

## 当前项目

Shielded Labs 公开列出了多个活跃项目领域：

- [网络可持续性机制](https://shieldedlabs.net/nsm/) - 一组拟议变更，旨在支持 Zcash 的长期安全预算，同时保留 2100 万枚 ZEC 的供应上限。NSM 工作包括自愿 ZEC 销毁、发行平滑化，以及 ZIP 233、234 和 235 中描述的手续费 [fee] 销毁提案。
- [Crosslink](https://shieldedlabs.net/crosslink-faq/) - 一项拟议的混合共识 [consensus] 升级，将 Zcash 的工作量证明区块生产与权益证明最终性相结合，使 ZEC 持有者能够帮助保护网络，同时矿工 [miner] 继续生产区块 [block]。
- [动态手续费](https://shieldedlabs.net/fees/) - 随着网络演进，为更可预测、更友好且更具韧性的 Zcash 交易 [transaction] 手续费开展研究并提供工具。
- [Zero](https://shieldedlabs.net/zero/) - 一套获支持的开源 Zcash 基础设施软件，面向交易所 [exchange]、挖矿 [mining] 池、钱包 [wallet] 提供商及其他依赖 Zcash 基础设施的组织。
- [Ironwood](https://shieldedlabs.net/ironwood/) - 为应对 Zcash 伪造漏洞而创建的一项 Orchard 网络升级 [network upgrade] 和屏蔽池，旨在恢复对 Zcash 流通供应量可独立验证的健全性。
- [Epoch](https://shieldedlabs.net/epoch-future-proof-cryptography-for-zcash/) - 一项于 2026 年 10 月宣布的研究和工程项目，旨在为 Zcash 开发可投入生产、高保障的后量子密码学，并扩展对关键密码学组件的形式化验证。该项目的目标是在 2027 年底前实现可投入生产的实施方案，可作为未来网络升级的基础。它补充了 Project Tachyon 及整个生态系统中的其他后量子工作。

## Epoch 和密码学团队

2026 年 10 月，Shielded Labs 启动了 Epoch，这是一项专门工作，旨在使 Zcash 能够应对量子计算、AI 辅助攻击及其他高级威胁。该项目旨在替换易受量子攻击的密码学组件，并将形式化验证应用于协议的关键部分。

Epoch 由一个三人密码学团队领导：

- **Ulrich Haböck** – 首席密码学家（此前就职于 StarkWare；更早前就职于 Polygon Zero）。他是零知识 [zero-knowledge] 证明 [proof] 和后量子密码学专家；logUp 查找论证的作者，以及 Circle STARKs 论文的共同作者。
- **Luke Edwards** – 密码学工程师（此前担任 Aztec 密码学工程团队的技术负责人）。拥有亚利桑那大学应用数学博士学位。
- **Suyash Bagad** – 密码学工程师（此前就职于 Aztec，从事 Barretenberg 库和 PLONK 证明系统家族的工作）。拥有 IIT Bombay 的 BTech 和 MTech 学位；其研究生研究聚焦于保护隐私的储备证明。

第一阶段专注于调研现有研究，依据 Zcash 的安全性和性能要求评估候选构造，并提出具体的后量子方案。目标是在 2027 年底前实现可投入生产的实施方案。

## Ironwood 的贡献

2026 年，Shielded Labs 在生态系统应对 Orchard 伪造漏洞的过程中发挥了重要作用。该漏洞由 Shielded Labs 安全研究员 Taylor Hornby 发现，并披露给 Zcash Open Development Lab（ZODL）；后者与其他 Zcash 贡献者协调开展了紧急修复。

紧急修复后，社区仍需要一种方式来恢复对 Zcash 流通供应量的独立信心。Ironwood 通过使用修正后的 Orchard 电路创建新的屏蔽池，并封存原始的 Orchard pool，使资金只能通过 turnstile 离开，解决了这一问题。Shielded Labs 与 Project Tachyon、Valar Group、ZODL 及 Zcash Foundation 共同开展了 Ironwood 的设计、审查和生态系统准备工作。

这项工作展示了 Shielded Labs 在 Zcash 中的核心角色之一：在原始 Zcash 开发组织之外，增加独立的协议开发和安全能力。

## 治理工作

Shielded Labs 还为 Zcash 社区成员发布治理信息。其治理页面跟踪协议治理投票、ZCAP 参与、持币者导向资金以及受支持的投票钱包。这有助于持币者、Zcash 成员及更广泛的社区参与者更容易了解 ZCAP 的决策过程。

Zcash 不对协议变更使用自动链上 [on-chain] 治理。投票和社区意见是输入更广泛粗略共识流程的咨询信号。Shielded Labs 的治理工作有助于使这些信号更易获取、更易验证。

## 资源

- [Shielded Labs 网站](https://shieldedlabs.net/)
- [Shielded Labs 项目](https://shieldedlabs.net/projects/)
- [网络可持续性机制](https://shieldedlabs.net/nsm/)
- [Crosslink 常见问题](https://shieldedlabs.net/crosslink-faq/)
- [动态手续费](https://shieldedlabs.net/fees/)
- [Zero](https://shieldedlabs.net/zero/)
- [Ironwood](https://shieldedlabs.net/ironwood/)
- [Epoch：面向 Zcash 的面向未来密码学](https://shieldedlabs.net/epoch-future-proof-cryptography-for-zcash/)
- [团队](https://shieldedlabs.net/team/)
- [治理与投票](https://shieldedlabs.net/governance/)
- [Shielded Labs GitHub](https://github.com/ShieldedLabs)
