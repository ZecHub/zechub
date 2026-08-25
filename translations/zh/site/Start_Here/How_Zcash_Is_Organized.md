# Zcash 是如何组织的

## TL;DR

- Zcash 不是由一家公司构建的，而是由许多彼此独立的组织共同构建，每个组织负责工作中的不同部分
- 在其历史的大部分时间里，由两个组织主导开发：Electric Coin Company 和 Zcash Foundation
- 2026 年 1 月，在一次治理争议后，整个 Electric Coin Company 团队辞职，生态系统随后重组为数个独立团队
- 如今，协议、节点软件、wallet、研究、扩容和资金支持分别由不同的团体负责
- 没有任何单一组织控制 Zcash；该网络是开源且无需许可的，并且在每一次变动中都始终正常运行

<br/>

## 这篇内容适合谁

- 想了解究竟是谁在构建和维护 Zcash 的新手
- 对生态系统中众多组织名称感到困惑的任何人
- 正在决定与谁合作或将提案提交给哪里的贡献者

<br/>

## 为什么这很重要

理解这一结构会让其他一切都更容易理解。它会告诉你是谁在维护你所依赖的代码、该向谁申请 grant，以及谁对你关心的那部分网络负责。它也揭示了 Zcash 一个低调的优势：由于工作分散在多个独立团体之间，没有任何单点故障能够控制或拖慢这个项目。

本页是一张地图。对于本 wiki 中已经有完整页面的每个组织，你会看到一段简短说明和一个延伸阅读链接，而不是重复那里已经写过的内容。

<br/>

## 它过去是如何运作的

在 Zcash 历史的大部分时间里，由两个组织引领方向。

Electric Coin Company 于 2016 年推出 Zcash，并雇用了核心开发团队中的很大一部分成员。它由 Bootstrap 监督，后者是一个为支持 Zcash 而设立的非营利董事会。Zcash Foundation 则作为独立的非营利组织与其并行运作，专注于协议的管理以及构建一个独立节点。两者的资金大多来自区块奖励中预留用于开发的一部分。

这种双支柱结构维持了很多年，但它依赖于这笔共享资金，也依赖于这两个组织保持一致。随着最初的开发资金模式不断演变，且其长期未来变得不那么确定，如何为持续工作提供资金的问题变得越来越紧迫。这个资金问题构成了随后许多变化的背景，也是为什么一些团队如今会募集外部资本，而另一些则依赖 grants 的部分原因。

<br/>

## 2026 年的重组

2026 年 1 月，这一结构发生了剧烈变化。1 月 7 日，Electric Coin Company 首席执行官 Josh Swihart 在 X 上宣布整个公司团队已经辞职。

Bootstrap 是一个于 2020 年成立的非营利组织，用于治理 Electric Coin Company；后者当时已成为其全资子公司。公司团队与该董事会之间的分歧是随着时间逐步累积的，涉及多个问题，包括组织的发展方向、开发应如何获得资金支持，以及 Zashi wallet 的未来。团队希望将该 wallet 转移到一家私人公司中，以便募集外部资本。Swihart 将这次离职描述为“constructive discharge”，这是一个法律术语，意指工作条件被严重改变到事实上迫使员工辞职；他还表示，董事会中的多数成员已经偏离了 Zcash 的使命。

为了公平起见，另一方的说法也很重要。Bootstrap 将这场冲突界定为治理问题以及非营利组织法律合规问题。Zcash 的创始人 Zooko Wilcox 公开为争议中被点名的董事会成员辩护，称自己与他们共事多年，并认为他们都是高度正直的人，同时也明确表示自己并未在这场分歧本身上选边站队。

有两点并无争议。没有任何一方指控存在刑事行为，因此这是一场公司与治理层面的分歧，而不是法律案件。并且 Zcash 网络本身没有受到影响；在整个过程中，它始终保持开源、无需许可、安全且完全正常运行，这一点是 Swihart 和 Wilcox 都向用户强调过的。

随后发生的是重组，而不是崩溃。原公司的团队在 2026 年稍后成立了 ZODL；另外，三名前 Bootstrap 董事会成员成立了 Sovright。开发工作最终在多个独立团队之间呈现出更加分布式的形态。

这里提到的声明均由 Josh Swihart（@jswihart）和 Zooko Wilcox（@zooko）于 2026 年 1 月 7 日在 X 上公开发布，原始帖子可在那里完整阅读。

<br/>

## 现在是谁在构建 Zcash

如今的工作分散在多个独立组织之间，每个组织都负责清晰划分的一部分。

### 来自 2026 年分裂的两个组织

1. ZODL，即 Zcash Open Development Lab，由前 Electric Coin Company 团队成立，并由 Josh Swihart 领导。它从外部投资者那里筹集了超过 2500 万美元，从事核心协议开发，包括驱动 Zcash 最新屏蔽交易的 Halo 2 证明系统，以及 ZODL wallet，这是一款默认启用屏蔽功能的移动 wallet，前身名为 Zashi。参见 [ZODL](https://zechub.wiki/zcash-organizations/zodl)。
2. Sovright 是由三名前 Bootstrap 董事会成员成立的非营利组织。它专注于为生态系统提供工具和支持，并构建了 Argos，这是一款帮助早期用户找回困在一款老旧且无人维护 wallet 中资金的工具。参见 [Sovright](https://zechub.wiki/zcash-organizations/sovright)。

### 协议管理、研究和节点软件

3. Zcash Foundation 维护 Zebra，这个 Rust 节点将在较旧的 zcashd 客户端退役后成为网络的主要节点。它还负责管理 Zcash 的 GitHub 组织、z.cash 网站，以及 X 上的 Zcash 主账号，并与 ZecHub 合作帮助管理其中一些资产。参见 [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)。
4. Shielded Labs 是一家独立、依靠捐赠资助的瑞士非营利组织。它专注于研究和长期可持续性，包括为未来开发提供资金的网络可持续机制，以及将 proof of stake finality 引入 Zcash 的 Crosslink 工作；它还资助了在 2026 年发现 Orchard 池漏洞的安全审计。参见 [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)。
5. Electric Coin Company 仍然是历史的一部分，因为它是 2016 年创建并推出 Zcash 的组织。参见 [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)。

### 扩容与密码学

6. Project Tachyon 是由密码学家 Sean Bowe 领导的一项扩容工作。它提出了一种让 wallet 与 blockchain 同步的新方式，称为 oblivious synchronization；这种方式会缩小交易体积，并作为副作用推动 Zcash 朝着后量子隐私迈进。其工作记录见 [tachyon.z.cash](https://tachyon.z.cash/)。
7. Valar Group 是一家密码学研究与工程实验室，致力于为大规模私密、后量子的数字现金开发 Zcash 协议。它在扩容和量子相关工作上与 Project Tachyon 密切合作。更多内容见 [valargroup.dev](https://valargroup.dev/)。

### 区域与社区组织

8. Obscura Labs 是一家在尼日利亚注册的独立组织，专注于非洲和新兴市场，构建基础设施和采用路径。参见 [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs)。

### 教育

9. ZecHub 是一个面向 Zcash 的去中心化教育中心。社区成员通过教程、wiki 文档、播客和每周简报协作创建、验证并推广内容，帮助人们理解生态系统并学习如何参与。你现在正在阅读的这个 wiki 就是 ZecHub 的一部分，而 Zcash Foundation 也与其合作，帮助管理一些社区资源。

### 资金支持

10. Zcash Community Grants 使用区块奖励中的一部分为独立贡献者和社区项目提供资金，从而让核心组织之外的许多团队也能开展工作。参见 [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)。
11. Financial Privacy Foundation 支持 Zcash 生态系统和社区项目。参见 [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)。

所有这些组织都维护开源代码库，因此任何人都可以阅读、审查并在其基础上继续构建它们的工作。而且，组织并不能代表全部情况。许多重要贡献来自个人以及通过 grants 资助的签约公司，而不仅仅是核心组织本身。除此之外，还有 wallet 团队、区域社区、独立开发者，以及持有并支持 ZEC 但并不构建协议的投资者。上面的列表是骨架，而不是完整全貌。

<br/>

## 新手该从哪里开始

哪个组织对你最重要，取决于你想做什么。

1. 如果你想使用 Zcash，你需要一个 wallet，因此 ZODL 及其 wallet 是很自然的起点。
2. 如果你想运行一个节点，或理解网络软件，应当关注 Zcash Foundation 及其 Zebra 节点。
3. 如果你想为项目提供资金或参与有偿工作，应当关注 Zcash Community Grants。
4. 如果你想跟进研究和协议的未来，应当关注 Shielded Labs、Project Tachyon 和 Valar Group。

<br/>

## 继续学习

这个 wiki 的存在就是为了帮助你继续深入，所以最好的下一步就是继续读下去。以下是一些适合新手继续阅读的好主题：

- [什么是 ZEC 和 Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash) 了解网络和币的基础知识
- [新用户指南](https://zechub.wiki/start-here/new-user-guide) 首次了解如何使用 Zcash
- [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) 了解 Zcash 如何保持交易私密
- [转门机制](https://zechub.wiki/zcash-tech/the-turnstile) 了解币的供应量如何保持可验证
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) 了解网络正在迁移到的屏蔽池
- [网络升级](https://zechub.wiki/start-here/network-upgrades) 了解 Zcash 如何随着时间变化
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) 了解隐私背后的密码学

每个页面都会继续链接到更多内容，因此你可以顺着线索一直深入下去。

<br/>

## 常见误解

- Zcash 不属于也不受任何单一公司控制，没有任何一个组织能够单独更改或停止该网络
- 2026 年的争议并未影响网络、资金或隐私；这是一场组织层面的分歧，而协议在整个过程中都正常运行
- Electric Coin Company 团队的离开并不意味着 Zcash 的终结，工作只是转移到了新的独立组织
- 拥有许多组织是一种优势，而不是弱点；这消除了单点故障，并让项目保持韧性
- 持有或推广 ZEC 并不等同于构建 Zcash；投资者和布道者是社区的一部分，但他们与开发协议的团队并不相同

<br/>

## 相关页面

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - 由前 Electric Coin Company 团队成立的开发实验室
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - 由前 Bootstrap 董事会成员成立的非营利组织
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - 协议与 Zebra 节点的管理者
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - 研究与协议可持续性
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - 于 2016 年推出 Zcash 的公司
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - 面向非洲和新兴市场的基础设施与采用
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - 为独立贡献者提供资金支持
