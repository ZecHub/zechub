# Zcash 在选择性披露 [selective disclosure] 方面走了多远，以及还缺什么

*本文镜像自 [Proof Street](https://www.proofstreet.xyz/)，一家涵盖隐私保护计算的独立出版物：ZK、FHE、MPC、TEE 和去中心化身份。原文于 2026 年 9 月 7 日以 ["Zcash 在选择性披露方面走了多远，以及还缺什么"](https://www.proofstreet.xyz/how-far-zcash-has-come-on-selective-disclosure-and-whats-left/) 为题发布。经作者许可，作为 [Zcash Community Grant #339](https://forum.zcashcommunity.com/t/grant-application-zcash-in-the-privacy-stack-339/56456) 的一部分进行镜像。作者：Stephen Webber。*

---

*在 Zcash 中，viewing key 允许账户持有人向其选择的一方披露屏蔽 [shielded] 交易 [transaction] 历史。这些密钥已上线且由用户控制。开发者和政策倡导者仍在努力让它们服务于可能使用它们的合规工作流程。*

---

8 月 17 日，Zcash Community Grants 委员会开会审议一项名为 Shielded Compliance Bridge 的提案。Deborah Olaboye 是一名开源贡献者，其工作包括 Ethereum 的 execution-specs 代码库；她构建了一个概念验证，能够摄取统一完整 viewing key、根据测试网索引器扫描紧凑区块 [block]，并在 Zcash 备忘录 [memo] 字段中携带"合规参考"，将一笔屏蔽转账关联至链下 Travel Rule 记录。她申请拨款 [grant] 以完成该项目，但委员会予以拒绝。

[理由](https://forum.zcashcommunity.com/t/zcash-community-grants-meeting-minutes-8-17-2026/57119)是，合规集成由将使用它们的特定交易所 [exchange] 或机构决定，目前没有可据以构建的通用标准，而且在没有合作伙伴提出工具需求的情况下，采用的可能性很低。同一会议还以类似理由拒绝了其他提案，其中包括一台"可编程选择性披露"虚拟机，以及包含美国法律议题地图的隐私 [privacy] 与信任架构框架。

当然，这些决定并不意味着没有人想要这些功能。结合这一年其余时间来看，恰恰相反。Binance 在 2024 年提出了协议层面的请求，并在当年就拥有了 ZIP。Gemini 自 2020 年以来一直在监管监督下运行屏蔽提款。该生态系统于 6 月成立了华盛顿政策组织，并于 8 月成立了机构集成机构。实际上，委员会所说的是，这项需求尚未被写成任何人都能据此构建的要求。

## 系统如何运作

一个屏蔽 Zcash 地址 [address] 由花费密钥 [spending key] 控制。从中派生出的 viewing key 可以读取交易数据，但无法转移资金。完整 viewing key 可以查看账户的收款和付款交易，接收 viewing key 只能查看收到的资金，而发送 viewing key 则让发送方重建其发送的内容。自 [ZIP 316](https://zips.z.cash/zip-0316) 起，这些密钥被打包为统一 viewing key，一个完整、一个接收，且仅限于一个账户；账户是钱包 [wallet] 密钥树中位于 [ZIP 32](https://zips.z.cash/zip-0032) 下的一个位置。统一完整 viewing key 打包了账户使用的每个屏蔽池 [pool] 的各 pool 组件，并且还包含账户的透明 [transparent] 扩展公钥，因此共享一个此类密钥也会暴露透明链 [chain] 以及屏蔽历史。

从这个意义上说，viewing key 具有追溯性。它会解密账户自创建之时起的全部历史；一旦共享，除非将资金转移至新账户，否则无法撤回。不存在按单笔交易划分的 viewing key，也不存在有时间限制的 viewing key。Josh Swihart 是 ZODL 的首席执行官；该公司由协议前 ECC 工程团队于今年成立。他证实了这一点，同时提到按单笔交易披露支付"尚未在任何地方实现"。

zcashd 是最初的参考节点 [node]，它提供了两种 RPC 方法，即 `z_getpaymentdisclosure` 和 `z_validatepaymentdisclosure`，允许发送方向第三方证明单笔支付 [payment]。[RPC 文档](https://zcash.github.io/rpc/z_getpaymentdisclosure.html)将其标记为实验性功能，除非运营者设置 experimental-features 标志，否则默认禁用，并正在实现一项"进行中的 Payment Disclosure ZIP"。该 ZIP，[303](https://zips.z.cash/zip-0303)，现已标记为撤回；其继任者 [ZIP 311](https://zips.z.cash/zip-0311) 仍为草案，尚未附带实现。这些方法仅涵盖 Sprout pool，即 2016 年最初的屏蔽池，且从未扩展至 Sapling 或 Orchard，也就是说，从未扩展至承载所有现代屏蔽交易的 pool。zcashd 本身已于 2026 年 7 月 18 日 [达到生命周期终点](https://zcash.github.io/zcash/user/end-of-life.html)，这是在 Ironwood 升级前按计划停止运行。Zebra（Zcash Foundation 的共识 [consensus] 节点）和继任钱包 Zallet 都未 [列出](https://github.com/zcash/zallet/releases) 披露方法。对于重要的 pool，按单笔交易披露仍然只是一项设计意图。

这一意图仍然存在，但比 7 月看起来更遥远。[ZIP 231](https://zips.z.cash/zip-0231)（备忘录捆绑）是将为其腾出空间的草案：Swihart 将备忘录捆绑描述为最终经认证回复地址的基础，而该地址可作为支付证明 [proof]；其依赖草案 [经认证回复地址](https://zips.z.cash/draft-ecc-authenticated-reply-addrs) 则需要大于当前备忘录字段容量的证明。备忘录捆绑是一项交易格式变更，协调 [NU7 coinholder 投票](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) 的五个组织于 8 月同意，格式变更不属于 NU7 范围，而属于之后的升级范围。投票本身从 8 月 25 日持续至 9 月 14 日，将发行、手续费 [fee] 政策、区块间隔和 Sprout 弃用交由持有人决定；披露并不在选票上。较早的路径 ZIP 311 不需要共识变更，但仍是没有实现、也没有 Orchard 覆盖范围的草案。

因此，当前上线的是以账户为范围的 viewing key，即完整或仅接收型、可追溯、不可撤销，且由账户持有人主动共享；而交易层面的披露仍在路线图上。

## 理解披露

无论在 Zcash 还是其他地方，披露机制都可从以下维度定位：披露什么（范围）。向谁披露（被授予方）。授权何时生效及可追溯多远（时机）。是否可撤销（可撤销性）。以及由谁发起，是数据主体还是主管机构（发起方式）。

合规制度是对这些维度提出的要求，而架构则是对此的立场。Zcash 的 viewing key 在设计上具有广泛范围、由持有人选择被授予方、完全可追溯、不可撤销、由用户发起的特点。要求层面上，如交易所和监管方的实际应用，往往限定于一种关系或一段期间，授予指定机构或其分析服务商，自开户起持续有效，在关系终止时可撤销，并由机构作为服务条件发起。

这两种情况都被称为选择性披露。在凭证领域，选择性披露意味着从已签名凭证中呈现一部分属性而不披露其余属性，这正是 [SD-JWT](https://datatracker.ietf.org/doc/rfc9901/)、ISO mdoc 和 BBS+ 签名 [signature] 所构建的能力。披露单位是属性，时点是呈现时，持有人为每次交互作出决定。

在屏蔽支付领域，这个短语意味着向选定一方披露交易数据，其中单位是账户历史，时点则是交出密钥的任何时候。

## 要求层面提出了什么

Swihart 表示，工程团队收到过的唯一协议层面合规请求来自 Binance；该机构于 2024 年 1 月要求为存款提供透明来源保证。团队的回应是 [ZIP 320](https://zips.z.cash/zip-0320)（仅透明来源地址），而 ZIP 文本确实记录了"按 Binance 的要求"的来源。TEX 地址是一种临时透明直通地址，保证交易所从透明来源接收资金。它为交易所提供返还路径，却不向其提供发送方历史。协议为交易所作出的这项唯一调整，恰好披露了交易所要求的内容，且没有更多。

Swihart 认为，自 Sapling 升级以来，交易所没有技术理由不支持屏蔽交易，因为证明生成很快，交易所客户在开户时已经完成身份识别，并且对于需要的情况已有强化尽职调查。依此观点，技术机制与合规工作流程之间的差距并不是真正缺少某种原语，而实际上是缺少一次对话。

Divij Pandya 正在推动这场对话的另一端。他是 Zcash 的 Pretty Good Policy 执行董事；该华盛顿政策组织于 6 月成立，是早期由 ECC 主导的一项倡议的延续。他表示，其组织的项目是让 viewing key 披露在合规官可引用的文件中被认可为可接受的合规机制。据他所知，尚无监管机构将 viewing key 作为一种工具进行接触。PGPZ 的范围自然是获得认可，而不是为构建者提供指导。在具备权威的一方就该工具作出裁定之前，工具无法依据要求被指定，因此获得认可属于上游步骤。该组织的备案由 Paul Brigner 以 PGPZ 创始人及 ZODL 首席政策与监管官的身份签署，因此政策和工程工作不仅共享一个论点，也共享一名负责人。

一份于 7 月 21 日提交给众议院 FinCEN 监督小组委员会的记录声明称，Zcash 具有"选择性披露能力，允许用户通过使用 viewing key 自愿与审计人员、税务机关或合规官分享交易详情"，并提及用于证明特定事实的、"与选择性 viewing key 配对"的零知识 [zero-knowledge] 证明。向 FinCEN 案卷提交的评论信 [FINCEN-2026-0101-0050](https://www.regulations.gov/comment/FINCEN-2026-0101-0050)，据 Pandya 所述，主张 viewing key 和选择性披露应被接受为合规机制。他们向监管方提出的开放问题是粒度问题：以账户为范围、披露全部历史，是否足以构成"有针对性的交易信息"，还是答案要等到 ZIP 231。

在此问题解决之前，合规团队面临着一项由匿名论坛发帖者 strahncryptography 在 Olaboye 提案讨论中 [描述](https://forum.zcashcommunity.com/t/grant-application-shielded-compliance-bridge/56862) 的约束：他们严格遵循规则，若没有监管机构或律师事务所的证明，就不会采用未经认可的路径，无论密码学多么可靠。任何将参考信息附加到交易的披露设计，只能证明最后一跳，而最后一跳可能就是存款人本人。viewing key 也有同样的限制。它揭示账户持有人的交易，而非对手方资金的来源；后者才是制裁筛查所询问的问题。

只要要求是由数据主体证明所发生之事，viewing key 就能满足门槛，例如存款人选择说明的存款来源、自愿审计、税务申报，或证明某笔特定支付已经完成。这些是用户发起、可追溯的一次性披露。若要求是自开户起持续监测、对账户持有人无法控制的对手方进行制裁筛查、限定于一段期间或一种关系，或在离场时撤销，则它们无法满足门槛。

Gemini 自 [2020 年 9 月](https://www.gemini.com/blog/gemini-adds-support-for-shielded-zcash-transactions) 起便接受向屏蔽地址提款，当时一名发言人将此归功于与监管机构的持续对话；该交易所于 2025 年 11 月将此扩展至 Orchard pool，并于 2026 年 7 月激活两天后扩展至 Ironwood 之后的 pool。它接受从屏蔽地址发送至透明托管的存款。Kraken 的 [提款地址列表](https://support.kraken.com/articles/360001474826-supported-address-formats-for-cryptocurrency-withdrawal) 仅支持透明 ZEC 地址，Coinbase 同样仅支持透明地址，而 Binance 要求使用 TEX。尚无任何大型受监管交易所提供屏蔽托管、屏蔽存款地址，或可接收客户 viewing key 的工作流程。

数据摄取正在下一层构建。在 [本年 9 月审议中](https://forum.zcashcommunity.com/t/call-for-proposals-coinholder-directed-retroactive-grants-program-q3/56885) 的 coinholder 指导型追溯拨款轮次提案中，包括 ZecBooks：一款导入仅查看密钥、对 note 分类，并为会计师导出限定行范围的数据包而不授予钱包持续访问权限的 Mac 记账工具；ZecLedger：一款围绕统一完整 viewing key 构建、已针对主网钱包测试的只读成本基础与对账工具；以及 seer-sync：一个链同步引擎，它接收 viewing key，使支付处理方或会计系统能在不持有花费密钥的情况下观察屏蔽活动。它们都不是交易所工作流程，也都没有获得监管机构关注。每一个都是同一问题面向会计师的一半，由一两个人在没有合作伙伴提出需求的情况下构建；而 ZecBooks 的限定导出是在最常首先需要的界面上运行的选择性披露：屏蔽用户与为其记账的人之间。

## 类别，而不是币种

Zcash 的构建者正在处理每种隐私架构共有的问题。

在 Zama 的机密 EVM 设计中，访问控制列表决定哪些地址可以请求解密密文，而由密钥管理运营者组成的阈值网络会应请求执行解密。这将被授予方这一轴从用户交出的密钥转变为合约记录的权限，并使发起方式可编程，因为合约可以将授予审计师解密权作为使用条件。它并没有使披露在合规官所指的意义上可撤销，因为已经解密的密文仍然是已解密状态；同时，它以运营者诚实作为信任基础，替代了用户对自身密钥的托管。资产级审计师密钥，例如 Solana 的机密转账扩展和 Avalanche 的加密 ERC 设计中的密钥，会在代币 [token] 层面固定被授予方，因为发行方或指定审计师可以读取该资产的余额和转账。

Inco 已发布 [框架](https://www.inco.org/blog/programmable-view-access)，用于区分预定义查看与可编程查看访问：前者在交易时将访问固定于密钥材料中，后者则将查看权作为合约状态，可在之后授予、限定范围并撤回。

## 为什么如此困难

是什么将 viewing key 与合规工作流程区分开来？

viewing key 披露账户持有人自己的历史。制裁筛查和持续监测则询问对手方，即每笔交易另一方资金的来源；而这恰恰是屏蔽 pool 存在的目的：隐去此类信息。至今尚未有人展示一种设计，能够在不使用透明账本或可信第三方的情况下回答对手方问题。

如果备忘录捆绑在 NU7 之后的升级中落地，且回复地址草案随后跟进，那么 PGPZ 备案中的"有针对性的交易信息"将成为字面事实。这至少还要经过两次升级，而监管答案将按照监管机构的时间线到来。

从朝着这一目标构建的人数可以轻易看出需求。缺少的是关于保护隐私的披露的固定要求。Zcash 是这个生态系统中公开协商该决定的地方：工程师、倡导者、构建者、一家交易所和一个拨款委员会似乎都同意目的地，却在争论步骤的顺序。它也正由独立开发者推进，他们没有等待要求被写出来，便从会计层开始工作。

---

*披露：本文获得了 [Zcash Community Grant](https://forum.zcashcommunity.com/t/grant-application-zcash-in-the-privacy-stack-339/56456) 支持。ZCG 在发布前未审阅或批准本文。*

---

**相关页面：** [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys) · [机密性比较](https://zechub.wiki/research/confidentiality-compared)
