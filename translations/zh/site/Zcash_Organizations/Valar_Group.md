<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Valar Group

[访问网站](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## 使命宣言

Valar Group 是一家独立工程组织，专注于扩展 Zcash、加强持币人治理，并提升该协议的隐私性、性能与长期韧性。

其工作聚焦于协议层基础设施：私密代币持有人投票、高性能全节点软件、钱包同步技术，以及让屏蔽 Zcash 能够在更大规模下更易使用的网络升级。

该组织旨在为 ZEC 持有人提供私密表达偏好的方式，为节点运营者提供更快、更强大的软件，并为钱包提供既能保护用户隐私、又能降低参与网络成本的工具。

## 背景

Valar Group 由 Dev Ojha（ValarDragon）领导；他是 Osmosis 的联合创始人，也是推出 Cosmos 的团队成员。过去十年间，他一直从事 zk-SNARKs、BFT 共识及生产级 DeFi 系统相关工作。

在 2026 年核心开发重组后，生态系统转向独立的协议团队，Valar Group 在 Zcash 中的公开工作变得突出。Valar Group 与 Project Tachyon、Shielded Labs、ZODL 和 Zcash Foundation 一同成为构建下一代 Zcash 基础设施的组织之一。

其工作中反复出现的主题是，Zcash 的隐私属性应延伸至支付以外。如果持有人被要求就发行量、区块时间或网络升级范围投票，他们应能使用屏蔽余额进行投票，而无需暴露身份、余额或个人投票选择。这一要求促使 Valar Group 设计并推出了一条专门的持币人投票链。

同样的扩展和密码学背景也塑造了其节点与同步工作。更快的区块、更轻量的钱包同步以及更强大的全节点，被视为让私密货币能够达到支付网络规模使用、而非仅作为价值储存工具的先决条件。

## 愿景

Valar Group 的公开资料和项目工作表明，其目标是打造一个能够：

- 支持私密、可审计的持币人投票，并将其作为可重复进行的治理流程。
- 在不牺牲屏蔽隐私的前提下扩展工作量证明支付。
- 通过 PIR、修剪和更快的区块传播，减少钱包和节点瓶颈。
- 通过推出独立的全节点技术栈，提高实现多样性。
- 为后量子准备和经过形式化审查的协议升级作出贡献。

该组织作为独立贡献者开展工作，并非协议所有者。协议变更仍需通过 ZIP、实现、审查和社区信号传递。Valar Group 的职责是设计、实现、运营并开源让这些流程得以实际运行的系统。

## 战略领域

Valar Group 的工作聚集于四个领域。

### 私密持币人治理

Zcash 不使用自动化的链上协议控制。持币人投票是建议性信号，会融入更广泛的粗略共识流程。Valar Group 构建了代币持有人投票链，使这些信号能够从屏蔽余额中收集，而不会暴露投票者身份或个人投票规模。

当前设计采用：

- 一条专用的 Cosmos SDK 应用链来协调投票轮次。
- 针对可花费 Ironwood 票据的快照证明。
- 投票金额的同态加密。
- 用于空值器非成员证明的私密信息检索。
- 协调者多签和分布式选举机构。

目标是以一个可复用、经审计、可集成至钱包的系统取代早期的代币持有人投票流程，其他组织可运行该系统并独立计票。

### 节点软件与网络扩展

Valar Group 与 Project Tachyon 合作开发 Zakura，这是基于 Zebra 代码库构建的 Zcash 全节点。Zakura 被定位为面向需要更快初始同步、修剪、快照引导，以及为原 `zcashd` 用户提供兼容路径的运营者的高性能节点。

相关扩展工作包括：

- 更快的目标区块时间，包括在 NU7 测试网上进行的 25 秒区块实验。
- 改进的点对点区块传播。
- 旨在让 Zcash 在屏蔽活动增长时仍保持可用的全节点功能。

### 钱包与同步基础设施

屏蔽钱包历来必须扫描大量链上数据。Valar Group 开发 PIR 系统，使钱包能够获取所需证明，而无需下载完整的空值器集合，也不会泄露它们关注的是哪些票据。

这项工作既出现在投票技术栈中，也出现在更广泛的钱包同步研究中。该组织还贡献了钱包端可靠性工作，包括多服务器交易提交和服务器选择改进，这些改进已用于 ZODL 的移动端技术栈。

### 协议升级与生态系统协调

在 Orchard 电路漏洞发生后，Valar Group 是公开承诺支持 Ironwood 应对方案的组织之一。Ironwood 引入了新的屏蔽池，通过闸门封存原有 Orchard 池，并恢复了独立验证流通供应量的途径。Valar Group 与 Project Tachyon、Shielded Labs、ZODL 和 Zcash Foundation 合作，参与架构设计、共识规则实现和生态系统协调。

该组织还参与 NU7 范围界定、测试网运营和 ZIP 编辑。Dev Ojha 被列为 ZIP 编辑者。

## 当前计划

### 代币持有人投票链 / Shielded Vote

Shielded Vote 是 Valar Group 面向 Zcash 的私密治理协议。持有人可使用屏蔽余额投票，而不披露个人金额或将投票与身份关联。

关键特性包括：

- 仅需一次在线会话即可投票，而非持续数日的提交/揭示流程。
- 与 Keystone 兼容的快照签名，可将投票权委托给热密钥，而不会让资金面临风险。
- 使用同态 ElGamal 对投票金额进行加密。
- PIR 查询，使空值器不会在快照证明期间泄露。
- 投票拆分与延迟中继提交，以减少时间关联。
- 可公开审计的计票结果。

2026 年 8 月，Valar Group 和 Project Tachyon 使用该技术栈进行了 NU7 持币人投票。资格要求是在主网区块高度 3,459,350 时于 Ironwood 中持有可花费的屏蔽 ZEC。投票于 2026 年 8 月 25 日至 9 月 14 日进行，参与门槛为 1,000,000 ZEC，达到该门槛后结果才被视为具有代表性。问题涵盖 NSM 发行平滑、重新发行时机、Sprout/v4 弃用、25 秒区块时间以及 NU7 的范围/准备情况。

默认链协调采用 2-of-5 多签，由 Project Tachyon、Valar Group、Zcash Foundation、ZODL 和 Shielded Labs 共同组成。另一组验证者持有每轮的解密密钥份额。任何单一验证者都无法恢复个人投票；生成最终计票结果需要达到验证者门限。

公开的运营者和审计者入口包括：

- [投票链设置](https://setup.valargroup.org)
- [计票审计器](https://tally.valargroup.org)
- [协调者 UI](https://svote.valargroup.org/)
- [PIR 服务器设置](https://setup-pir.valargroup.org)
- [Shielded Vote 文档](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura 是由 Valar Group 与 Project Tachyon 合作开发的 Zcash 全节点。它源自 Zebra，并增加了更快同步、原生修剪、快照引导、`zcashd` 兼容路径和实验性的高性能 P2P 工作。

Zcash Foundation 公开欢迎该项目，指出 Zebra 采用宽松许可证发布，以便独立团队能够分叉并改进它，同时多位 Zakura 贡献者此前已向 Zebra 上游作出贡献。

### 私密信息检索

Valar Group 为两个相关问题维护 PIR 服务和库：

- 在不泄露票据空值器的前提下，证明某票据在快照高度时尚未花费。
- 减少钱包为了同步或投票而必须获取的数据。

这是 Shielded Vote 的核心依赖，也是改善私密钱包 UX 的基础模块。

### Ironwood 与 NU7 工程

Valar Group 是 2026 年 6 月联合承诺支持 Ironwood 的一员，并为新池相关的共识规则实现和客户端工作作出贡献。它还运营了 NU7 测试网基础设施，包括加入脚本和托管在 `nu7.valargroup.dev` 下的公共节点。

### 开源协议库

`valargroup` GitHub 组织将投票和节点技术栈发布为公开仓库，包括：

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — 用于私密链上投票的应用专用链
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — 客户端屏蔽投票库、证明、存储和 FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — Halo2 委托和投票电路
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — 用于空值器非成员证明的 PIR
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — 钱包服务发现配置
- [`zebra`](https://github.com/valargroup/zebra) — Valar Group 的 Zebra/Zakura 开发分叉

## 团队

Valar Group 由 **Dev Ojha**（ValarDragon）领导。与 Zakura 相关的公开团队页面列出了以下与 Valar 有关联的工程师：

- **Dev Ojha** — 维护者；领导 Valar Group。重点领域包括代币持有人投票、后量子工作、Zakura 和 PIR。
- **Roman Akhtariev** — 首席工程师。曾任 Osmosis 首席工程师；工作包括 PIR 钱包同步、代币持有人投票和 Zakura 同步性能。
- **Evan Forbes** — 首席工程师。曾任 Celestia 共识负责人及创始工程师；工作包括更快区块时间的准备工作和 QUIC P2P 技术栈。
- **Adam Tucker** — 首席工程师。曾任 Osmosis 工程师；工作包括与 Roman Akhtariev 共同开展的代币持有人投票、钱包可靠性，以及跨技术栈的 Ironwood 集成。

Zakura 本身由 Sean Bowe 领导的 Project Tachyon 共同维护。两个组织密切合作，但彼此独立。

## 组织结构

Valar Group 作为独立工程组织运作。它不属于 Zcash Foundation、ZODL、Shielded Labs 或 Zcash Community Grants。

在投票链设计中，Valar Group 是五个协调组织之一。该角色是投票系统的一个参数，而非宣称对 Zcash 治理拥有排他性控制权。其他团队可以运行验证者、建立替代投票链，或使用公开工具审计已发布的计票结果。

有关法律实体类型、董事会构成和内部治理的更多信息，尚未像较早的 Zcash 组织那样以同等详细程度发布。

## 资金

2026 年中期的公开论坛声明称，Valar Group 和 Project Tachyon 通过私人捐赠获得资金。不同于 ZODL 已披露的风险投资轮次或 Shielded Labs 的公开捐赠公告，Valar Group 尚未发布详细的捐赠者名单或资助时间表。

这种资金模式使团队独立于历史上的开发基金 / 区块奖励路径，但也意味着公众对预算规模和资金来源的可见性较低。

## 在 Zcash 生态系统中的角色

Valar Group 是围绕 Zcash 2026 年开发格局形成的独立协议组织之一。在这一格局中：

- **Zcash Foundation** 持续负责社区管理和 Zebra。
- **ZODL** 专注于 ECC 分拆后的钱包产品和协议延续。
- **Shielded Labs** 专注于可持续性、安全性和共识研究。
- **Project Tachyon** 专注于递归、形式化验证和长期可扩展性。
- **Valar Group** 专注于私密持币人投票、节点性能、PIR，以及在生产环境中运营这些系统所需的工程工作。

其独特贡献在于使屏蔽治理能够实际运行。NU7 投票是该技术栈的首次重大应用：持有人证明 Ironwood 余额，Zodl 和 Vizor 等钱包可以集成该流程，且任何人都能审计计票结果，而无需得知某位持有人如何投票。

同一团队的节点和同步工作旨在支持这一图景的另一半。如果钱包无法同步、节点无法跟上，或升级无法快速实现，私密投票的价值就会降低。Valar Group 将治理、节点软件和钱包基础设施视为同一个问题：让私密 Zcash 能够大规模使用，同时不将运营权力集中于单一组织。

## 资源

- [Valar Group 网站](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Shielded Vote 文档](https://valargroup.gitbook.io/shielded-vote-docs)
- [投票链设置](https://setup.valargroup.org)
- [计票审计器](https://tally.valargroup.org)
- [协调者 UI](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura 关于页面 / 团队](https://zakura.com/about/)
- [NU7 持币人投票论坛帖子](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [持币人投票链论坛帖子](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
