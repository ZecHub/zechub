<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Valar Group

[访问网站](https://valargroup.dev/)

<img width="200" height="200" alt="254678133" src="/content-images/0dc8c697-bcad-492a-b024-89b502d27af4-4c0d4552c2.webp" />


## 使命宣言

Valar Group 是一家独立工程组织，专注于扩容 [scaling] Zcash、强化持币者治理 [governance]，以及改善协议的隐私 [privacy]、性能和长期韧性。

其工作聚焦于协议级基础设施：私密代币 [token] 持有者投票、高性能全节点 [full node] 软件、钱包 [wallet] 同步技术，以及让屏蔽 [shielded] Zcash 能在更大规模下更易使用的网络升级 [network upgrade]。

该组织旨在让 ZEC 持有者能够私密地表达偏好，为节点 [node] 运营者提供更快且功能更强的软件，并为钱包提供在降低参与网络成本的同时保护用户隐私的工具 [tools]。

## 背景

Valar Group 由 Dev Ojha (ValarDragon) 领导，他是 Osmosis 的联合创始人，也是推出 Cosmos 的团队成员。在过去十年中，他曾参与 zk-SNARKs、BFT 共识 [consensus] 和生产级 DeFi 系统的工作。

在核心开发于 2026 年重组后，生态系统转向独立协议团队，该组织在 Zcash 的公开工作随之受到关注。Valar Group 与 Project Tachyon、Shielded Labs、ZODL 和 Zcash Foundation 一起，成为构建下一代 Zcash 基础设施的组织之一。

其工作中反复出现的主题是，Zcash 的隐私属性应当超越支付 [payment]。如果持有者被要求就发行量、区块 [block] 时间或网络升级范围进行投票，他们应当能够从屏蔽余额中投票，而无需暴露身份、余额或个人选票。这一要求促使 Valar Group 设计并推出了一条专用的持币者投票链 [chain]。

同样的扩容和密码学背景也塑造了其节点和同步工作。更快的区块、更轻量的钱包同步以及功能更强的全节点，被视为实现可在支付网络规模上使用、而非仅作为价值储存的私密货币的先决条件。

## 愿景

Valar Group 的公开材料和项目工作表明，其目标是打造一个能够：

- 支持私密、可审计的持币者投票，并使其成为可重复的治理流程的 Zcash 网络。
- 在不牺牲屏蔽隐私的前提下扩容工作量证明支付。
- 通过 PIR、修剪和更快的区块传播，减少钱包和节点瓶颈。
- 通过推出独立的全节点技术栈，提高实现多样性。
- 为后量子准备工作和经正式审查的协议升级作出贡献。

该组织作为独立贡献者开展工作，而非协议所有者。协议变更仍须经过 ZIP、实现、审查和社区信号传达。Valar Group 的角色是设计、实现、运营并开源使这些流程得以实践的系统。

## 战略领域

Valar Group 的工作集中于四个领域。

### 私密持币者治理

Zcash 不使用自动化链上 [on-chain] 协议控制。持币者投票是为更广泛的粗略共识流程提供参考的信号。Valar Group 构建了 Tokenholder Voting Chain，以便从屏蔽余额中收集这些信号，而不暴露投票者身份或个人投票规模。

当前设计采用：

- 一条专用的 Cosmos SDK 应用链，用于协调投票轮次。
- 针对可花费 Ironwood note 的快照证明 [proof]。
- 对投票金额进行同态加密 [encryption]。
- 用于 nullifier 非成员证明的私密信息检索。
- 协调者多重签名和分布式选举机构。

目标是以一个可复用、经审计、可集成钱包的系统取代早期代币持有者投票流程，供其他组织运营并独立计票。

### 节点软件与网络扩容

Valar Group 与 Project Tachyon 合作开发 Zakura，这是一个基于 Zebra 代码库构建的 Zcash 全节点。Zakura 被定位为面向需要更快初始同步、修剪、快照引导以及为原 `zcashd` 用户提供兼容路径的运营者的高性能节点。

相关扩容工作包括：

- 更快的目标区块时间，包括在 NU7 测试网上进行的 25 秒区块实验。
- 改进的点对点区块传播。
- 旨在随着 Zcash 屏蔽活动增长而保持其可用性的全节点功能。

### 钱包与同步基础设施

屏蔽钱包历来必须扫描大量链数据。Valar Group 开发 PIR 系统，使钱包能够获取所需证明，而无需下载完整的 nullifier 集合或暴露其关注的 note。

这项工作既体现在投票技术栈中，也体现在更广泛的钱包同步研究中。该组织还贡献了钱包侧可靠性工作，包括用于 ZODL 移动端技术栈的多服务器交易提交和服务器选择改进。

### 协议升级与生态系统协调

在 Orchard 电路漏洞发生后，Valar Group 是公开承诺响应 Ironwood 的组织之一。Ironwood 引入了新的屏蔽池 [pool]，通过 turnstile 封闭了原始 Orchard pool，并恢复了独立验证流通供应量的途径。Valar Group 与 Project Tachyon、Shielded Labs、ZODL 和 Zcash Foundation 在架构、共识规则实现和生态系统协调方面开展合作。

该组织还参与 NU7 范围界定、测试网运营和 ZIP 编辑。Dev Ojha 被列为 ZIP 编辑。

## 当前计划

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote 是 Valar Group 面向 Zcash 的私密治理协议。持有者使用屏蔽余额投票，而无需暴露个人金额或将选票与身份关联。

主要特性包括：

- 只需一次在线会话即可投票，而非多日的 commit/reveal 流程。
- 一种与 Keystone 兼容的快照签名 [signature]，可将投票权委托给热密钥，同时不使资金面临风险。
- 使用同态 ElGamal 加密投票金额。
- PIR 查询，以免在快照证明期间泄露 nullifier。
- 选票拆分和延迟中继提交，以减少时间关联。
- 可公开审计的计票结果。

2026 年 8 月，Valar Group 和 Project Tachyon 使用该技术栈进行了 NU7 持币者投票。资格要求是在主网高度 3,459,350 时，于 Ironwood 中拥有可花费的屏蔽 ZEC。投票从 2026 年 8 月 25 日持续至 9 月 14 日，参与门槛为 1,000,000 ZEC，结果才会被视为具有代表性。问题涵盖 NSM 发行平滑、再发行时机、Sprout/v4 弃用、25 秒区块时间，以及 NU7 范围/准备情况。

默认链协调由 Project Tachyon、Valar Group、Zcash Foundation、ZODL 和 Shielded Labs 组成的 5 取 2 多重签名机制负责。另一组验证者持有每轮解密密钥份额。任何单个验证者都无法恢复个人选票；必须达到验证者阈值才能生成最终计票结果。

面向公众的运营者和审计者界面包括：

- [投票链设置](https://setup.valargroup.org)
- [计票审计器](https://tally.valargroup.org)
- [协调者 UI](https://svote.valargroup.org/)
- [PIR 服务器设置](https://setup-pir.valargroup.org)
- [Shielded Vote 文档](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura 是由 Valar Group 和 Project Tachyon 合作开发的 Zcash 全节点。它源自 Zebra，并增加了更快的同步、原生修剪、快照引导、`zcashd` 兼容路径以及实验性的高性能 P2P 工作。

Zcash Foundation 公开欢迎该项目，指出 Zebra 以宽松许可证发布，使独立团队可以分叉并改进它，而且已有数名 Zakura 贡献者向 Zebra 上游贡献代码。

### 私密信息检索

Valar Group 为两个相关问题维护 PIR 服务和库：

- 在不暴露其 nullifier 的情况下，证明某个 note 在快照高度时尚未花费。
- 减少钱包为同步或投票必须获取的数据。

这是 Shielded Vote 的核心依赖，也是实现更快私密钱包 UX 的构建模块。

### Ironwood 和 NU7 工程工作

Valar Group 参与了 2026 年 6 月对 Ironwood 的联合承诺，并为新 pool 周边的共识规则实现和客户端工作作出了贡献。它还运营了 NU7 测试网基础设施，包括加入脚本和托管于 `nu7.valargroup.dev` 下的公共节点。

### 开源协议库

`valargroup` 的 GitHub 组织将投票和节点技术栈发布为公共仓库，包括：

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — 用于私密链上投票的应用专用链
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — 客户端屏蔽投票库、证明、存储和 FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — Halo2 委托和投票电路
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — 用于 nullifier 非成员证明的 PIR
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — 钱包服务发现配置
- [`zebra`](https://github.com/valargroup/zebra) — Valar Group 的 Zebra/Zakura 开发分叉

## 团队

Valar Group 由 **Dev Ojha** (ValarDragon) 领导。与 Zakura 相关的公开团队页面列出了以下 Valar 关联工程师：

- **Dev Ojha** — 维护者；领导 Valar Group。重点领域包括代币持有者投票、后量子工作、Zakura 和 PIR。
- **Roman Akhtariev** — 首席工程师。此前担任 Osmosis 首席工程师；工作包括 PIR 钱包同步、代币持有者投票和 Zakura 同步性能。
- **Evan Forbes** — 首席工程师。曾任 Celestia 共识负责人和创始工程师；工作包括更快区块时间准备和 QUIC P2P 技术栈。
- **Adam Tucker** — 首席工程师。曾任 Osmosis 工程师；工作包括与 Roman Akhtariev 共同进行的代币持有者投票、钱包可靠性以及跨技术栈的 Ironwood 集成。

Zakura 本身与由 Sean Bowe 领导的 Project Tachyon 共同维护。这两个组织密切合作，但仍彼此独立。

## 组织结构

Valar Group 作为独立工程组织运营。它不属于 Zcash Foundation、ZODL、Shielded Labs 或 Zcash Community Grants。

在投票链设计中，Valar Group 是五个协调组织之一。该角色是投票系统的一个参数，而非对 Zcash 治理拥有排他性控制权的主张。其他团队可以运行验证者、建立替代投票链，或通过公共工具审计已发布的计票结果。

关于法律实体类型、董事会构成和内部治理的补充信息，尚未像较早的 Zcash 组织那样详细公开。

## 资金

2026 年中期的公开论坛声明称，Valar Group 和 Project Tachyon 通过私人捐款获得资金。与 ZODL 已披露的风险投资轮次或 Shielded Labs 的公开捐款公告不同，Valar Group 尚未发布详细的捐赠者名单或拨款 [grant] 时间表。

这种资金模式使团队独立于历史上的 Development Fund / 区块奖励路径，但也意味着公众对预算规模和资金来源的可见性较低。

## 在 Zcash 生态系统中的角色

Valar Group 是围绕 Zcash 2026 年开发格局形成的独立协议组织之一。在这一格局中：

- **Zcash Foundation** 持续进行社区管理和 Zebra。
- **ZODL** 专注于 ECC 分拆后的钱包产品和协议延续。
- **Shielded Labs** 专注于可持续性、安全性和共识研究。
- **Project Tachyon** 专注于递归、形式化验证和长期可扩展性。
- **Valar Group** 专注于私密持币者投票、节点性能、PIR，以及在生产环境中运营这些系统所需的工程工作。

其独特贡献在于使屏蔽治理能够实际运行。NU7 投票是该技术栈的首次重大应用：持有者证明 Ironwood 余额，ZODL 和 Vizor 等钱包可以集成该流程，任何人都可以审计计票结果，而无需得知特定持有者如何投票。

同一团队的节点和同步工作旨在支持这一图景的另一半。如果钱包无法同步、节点无法跟上，或升级无法迅速实现，私密投票的用处就会降低。Valar Group 将治理、节点软件和钱包基础设施视为一个问题：让私密 Zcash 能够大规模使用，同时不将运营权力集中于单一组织。

## 资源

- [Valar Group 网站](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Shielded Vote 文档](https://valargroup.gitbook.io/shielded-vote-docs)
- [投票链设置](https://setup.valargroup.org)
- [计票审计器](https://tally.valargroup.org)
- [协调者 UI](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura 关于 / 团队](https://zakura.com/about/)
- [NU7 持币者投票论坛帖子](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Coinholder Voting Chain 论坛帖子](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
