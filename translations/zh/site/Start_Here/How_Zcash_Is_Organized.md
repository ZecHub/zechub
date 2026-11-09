# Zcash 的组织架构

## TL;DR

- Zcash 并非由一家公司建立，而是由多个独立组织共同构建，每个组织负责不同部分的工作
- 在其大部分历史中，Electric Coin Company 和 Zcash Foundation 两个组织主导开发
- 2026 年 1 月，整个 Electric Coin Company 团队在一场治理 [governance] 争议后辞职，生态系统随之重组为多个独立团队
- 如今，协议、节点软件、钱包、研究、扩容 [scaling] 和资金支持分别由不同团体负责
- 没有任何单一组织控制 Zcash；网络是开源且无需许可 [permissionless] 的，并在每一次变化期间都持续正常运行

<br/>

## 本页适合谁

- 希望了解究竟是谁构建并维护 Zcash 的新用户
- 对生态系统中众多组织名称感到困惑的任何人
- 正在决定与谁合作或将提案发送给何方的贡献者

<br/>

## 为什么这很重要

理解这一架构会让其他一切变得更容易。它能告诉你谁维护你所依赖的代码、应向谁申请拨款 [grant]，以及谁负责你所关注的网络部分。它还揭示了 Zcash 的一项低调优势：由于工作分布在独立团体之间，任何单一故障点都无法控制或阻滞该项目。

本页是一张地图。对于本维基中已有完整页面的每个组织，你会看到简短说明和进一步阅读的链接，而不是重复其中已有的内容。

<br/>

## 过去的运作方式

在 Zcash 历史的大部分时间里，两个组织发挥了领导作用。

Electric Coin Company 于 2016 年推出了 Zcash，并雇用了核心开发团队的大部分成员。它由 Bootstrap 监督，这是一个为支持 Zcash 而创建的非营利董事会。Zcash Foundation 则作为独立非营利组织与其并行运作，专注于协议的管理以及构建独立节点。两者的资金大多来自为开发预留的一部分区块奖励。

这种双支柱架构维持了多年，但它依赖于共同的资金来源以及两个组织保持一致。随着最初的开发资金机制演变，其长期前景愈发不确定，如何为持续工作支付费用的问题变得更加紧迫。这个资金问题是此后许多变化的背景，也是如今一些团队筹集外部资本、而另一些团队依赖拨款的部分原因。

<br/>

## 2026 年重组

2026 年 1 月，架构发生了重大变化。1 月 7 日，Electric Coin Company 首席执行官 Josh Swihart 在 X 上宣布，整个公司团队均已辞职。

Bootstrap 是于 2020 年成立、用于管理 Electric Coin Company 的非营利组织；后者后来成为其全资子公司。公司团队与该董事会之间的分歧逐渐累积，涉及多个问题，包括组织方向、开发应如何获得资金，以及 Zashi 钱包的未来；团队希望将该钱包转入一家私营公司以筹集外部资本。Swihart 将离职描述为"推定解雇"，这是一个法律术语，意指工作条件被严重改变，以致辞职实际上是被迫的；他还称董事会多数成员已偏离 Zcash 的使命。

为求公平，另一方的说法同样重要。Bootstrap 将冲突定义为治理和非营利法律合规问题。Zcash 的创始人 Zooko Wilcox 公开为争议中被点名的董事会成员辩护，称他与他们共事多年，并认为他们是具有高度诚信的人；同时明确表示，他并未在该分歧本身中站队。

有两点不存在争议。没有任何一方指称存在犯罪行为，因此这是一场公司和治理分歧，而非法律案件。并且，Zcash 网络本身未受影响；它始终保持开源、无需许可、安全且完全正常运行，这是 Swihart 和 Wilcox 都向用户强调的一点。

随之而来的是重组，而非崩溃。原公司团队在 2026 年稍后成立了 ZODL；另外，3 名前 Bootstrap 董事会成员成立了 Sovright。开发工作逐步形成了跨越多个独立团队、更为分布式的格局。

此处所述声明由 Josh Swihart (@jswihart) 和 Zooko Wilcox (@zooko) 于 2026 年 1 月 7 日在 X 上公开发布，原始帖文可在那里完整阅读。

<br/>

## 如今谁在构建 Zcash

如今的工作由独立组织分担，每个组织负责明确的一部分。

### 2026 年分拆形成的两个组织

1. ZODL，即 Zcash Open Development Lab，由原 Electric Coin Company 团队组建，并由 Josh Swihart 领导。它从外部投资者处筹集了超过 2500 万美元，负责核心协议开发，包括为 Zcash 最新屏蔽 [shielded] 交易提供支持的 Halo 2 证明 [proof] 系统，以及 ZODL 钱包；后者是一款默认屏蔽的移动钱包，原名为 Zashi。参见 [ZODL](https://zechub.wiki/zcash-organizations/zodl)。
2. Sovright 是由 3 名前 Bootstrap 董事会成员成立的非营利组织。它专注于生态系统的工具 [tools] 与支持，并构建了 Argos；这是一项帮助早期用户找回滞留在旧版、无人维护钱包中的资金的工具。参见 [Sovright](https://zechub.wiki/zcash-organizations/sovright)。

### 协议管理、研究和节点软件

3. Zcash Foundation 维护 Zebra，即 Rust 节点；随着较旧的 zcashd 客户端退役，它将成为网络的主要节点。它还管理 Zcash GitHub 组织、z.cash 网站和 X 上的主要 Zcash 账户，并与 ZecHub 合作，协助管理其中部分资产。参见 [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)。
4. Shielded Labs 是一家总部位于瑞士、由捐赠资助的独立非营利组织。它专注于研究和长期可持续性，包括为未来开发提供资金的网络可持续性机制、为 Zcash 加入权益证明终局性的 Crosslink 工作；它还资助了发现 2026 年 Orchard pool 漏洞的安全审计。参见 [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)。
5. Electric Coin Company 仍是历史的一部分，作为于 2016 年创建并推出 Zcash 的组织。参见 [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)。

### 扩容和密码学

6. 项目 Tachyon 是由密码学家 Sean Bowe 领导的一项扩容工作。它提出了一种让钱包与 blockchain 同步的新方式，称为"无感同步"，它可缩小交易，并作为附带效果，使 Zcash 向后量子隐私迈进。其工作记录于 [tachyon.z.cash](https://tachyon.z.cash/)。
7. Valar Group 是一家密码学研究与工程实验室，致力于开发用于大规模私密、后量子数字现金的 Zcash 协议。它与项目 Tachyon 就扩容和量子工作密切合作。其工作详情见 [valargroup.dev](https://valargroup.dev/)。

### 区域和社区组织

8. Obscura Labs 是一家在尼日利亚注册的独立组织，聚焦非洲和新兴市场，构建基础设施和采用路径。参见 [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs)。

### 教育

9. ZecHub 是面向 Zcash 的去中心化教育中心。社区成员共同创建、验证并推广内容，通过教程、维基文档、播客和每周新闻简报 [newsletter]，帮助人们理解生态系统并学习如何参与。你现在阅读的维基是 ZecHub 的一部分，而 Zcash Foundation 与其合作，协助管理部分社区资源。

### 资金支持

10. Zcash Community Grants 从一部分区块奖励中为独立贡献者和社区项目提供资金，使工作分散至核心组织之外的众多团队。参见 [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)。
11. Financial Privacy Foundation 支持 Zcash 生态系统和社区项目。参见 [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)。

所有这些组织都维护开源代码库，因此任何人都可以阅读、检查并在其工作基础上继续构建。组织并非全部故事。许多重要贡献来自个人，以及通过拨款获得资助的承包公司，而不只是来自核心组织。此外，还有钱包团队、区域社区、独立开发者和持有并支持 ZEC、但不构建协议的投资者。上述列表是骨干，而非全貌。

<br/>

## 新用户从哪里开始

哪个组织与你相关，取决于你想做什么。

1. 若要使用 Zcash，你需要一个钱包，因此 ZODL 及其钱包是自然的起点。
2. 若要运行节点或了解网络软件，请关注 Zcash Foundation 及其 Zebra 节点。
3. 若要资助项目或参与有偿工作，请关注 Zcash Community Grants。
4. 若要关注研究及协议的未来，请关注 Shielded Labs、项目 Tachyon 和 Valar Group。

<br/>

## 继续学习

本维基旨在帮助你深入了解，因此最好的下一步是继续阅读。以下是适合新用户继续了解的几个主题：

- [什么是 ZEC 以及 Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash)，了解网络和该币种的基础知识
- [新用户指南](https://zechub.wiki/start-here/new-user-guide)，首次了解如何使用 Zcash
- [屏蔽池](https://zechub.wiki/using-zcash/shielded-pools)，了解 Zcash 如何保持交易私密
- [turnstile](https://zechub.wiki/zcash-tech/the-turnstile)，了解币种供应量如何保持可验证
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood)，了解网络正在迁移至的屏蔽 pool
- [网络升级](https://zechub.wiki/start-here/network-upgrades)，了解 Zcash 如何随时间变化
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks)，了解隐私背后的密码学

每个页面都链接到更多内容，因此你可以随心所欲地继续探索。

<br/>

## 常见误解

- Zcash 不归任何单一公司所有或控制；没有任何一个组织能够自行改变或停止该网络
- 2026 年的争议没有影响网络、资金或隐私；它是一场组织分歧，协议始终正常运行
- 离开 Electric Coin Company 的团队并没有终结 Zcash；工作转移到了新的独立组织
- 拥有许多组织是一种优势，而非弱点；它消除了单一故障点，并使项目保持韧性
- 持有或推广 ZEC 并不等同于构建 Zcash；投资者和倡导者是社区的一部分，但与开发协议的团队不同

<br/>

## 相关页面

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - 由原 Electric Coin Company 团队成立的开发实验室
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - 由前 Bootstrap 董事会成员成立的非营利组织
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - 协议及 Zebra 节点的管理者
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - 研究和协议可持续性
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - 于 2016 年推出 Zcash 的公司
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - 覆盖非洲和新兴市场的基础设施与采用
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - 为独立贡献者提供资金
