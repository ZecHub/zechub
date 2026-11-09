# FROST 与 Viewing Keys：Zcash/Dash 互操作性研究简报

*为 ZecHub 编写 · 修订于 2026 年 9 月 27 日 · 所有主张均附有内联来源*

## 执行摘要

ZecHub 在将屏蔽 [shielded] DASH 添加为 wiki 捐赠选项后提出了这个问题：Zcash 风格的 viewing key，或 FROST 阈值签名，能否迁移至 Dash？

研究重新界定了这个问题。Viewing key 并非一个悬而未决的问题——Dash 已将 [Zcash Orchard 屏蔽池 shielded pool](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) 部署到其 Evolution 链中，而 Orchard 的密钥层级结构本身就包含 viewing key。Dash 自己的 [路线图](https://www.dash.org/roadmap/) 将其定位为用于审计师披露和旅行规则合规。前半部分已经部署，而非假设。

**FROST 才是实际缺口所在。** Dash 已通过 [长期存续主节点委员会](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html) 运行 BLS 阈值签名，但它们服务于网络层面的共识 [consensus]——ChainLocks 和 InstantSend。[ZIP 312](https://zips.z.cash/zip-0312) 的目标不同：它面向由少数个人密钥持有者共同持有的单个屏蔽账户，实现阈值花费授权。这两者不可互换。并且，由于 ZIP 312 仍为 **草案 [Draft]**，两条链上均不存在可移植的参考实现，因此无论由哪一方构建，这都将是新颖工作。

---

## 时间线：为何此刻的比较不同寻常

2026 年年中，两项屏蔽池事件在数周内相继发生。

**Zcash 已迁离 Orchard。** 研究员 Taylor Hornby 披露了 Orchard 中的一个电路漏洞，可被利用以不可检测地增发供应量。Zcash 通过于 **2026 年 7 月 28 日** 激活 **Ironwood（NU6.3）** 作出响应，引入带有 turnstile 迁移机制的新屏蔽池。

**Dash 已迁入 Orchard。** Dash 于 [2026 年 2 月 19 日](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) 宣布该计划——*"我们预计很快便能推出屏蔽转账，当然这仍取决于安全审计和进一步的代码审查。"* Dash 的 [路线图](https://www.dash.org/roadmap/) 记载，屏蔽余额于 2026 年 7 月随 Dash Platform **v4.0** 完成；Dash 于 **2026 年 8 月 4 日** 发布 [*"屏蔽交易已在 Dash Evolution 主网上线"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)。

> **关于顺序的说明。** 部分报道将 Dash 的主网激活时间定为 2026 年 7 月 17 日，这将使其早于 Ironwood。该日期似乎源于对公告的新闻报道，而非激活本身。根据 Dash 自己的来源，该功能于 7 月完成，并于 8 月 4 日宣布上线——晚于 Ironwood。两条链在数周内交汇；确切顺序取决于所计入的里程碑，本简报不主张其中任一种。

关键是，Dash 并未继承该漏洞。其公告明确指出：*"我们实施的 Orchard 版本不存在已知的增发漏洞。此前版本包含一个漏洞，可被利用以不可检测地增发 Zcash 的供应量。"*

因此，Dash 目前运行的是一种已修补分叉的密码学，而 Zcash 本身已在基础层迁离该密码学；与此同时，Zcash 的下一代 pool（Ironwood）和下一代花费授权方案（FROST）分别刚刚上线和仍处于草案阶段。

---

## Viewing key：已部署，而非研究缺口

Dash 的屏蔽池是 [Orchard](https://zips.z.cash/zip-0224)，建立在无需可信设置 [trusted setup] 的 Halo 2 zk-SNARKs 之上。Orchard 的密钥层级结构一直将完整 viewing key 和传入 viewing key 作为其设计的一部分，而非附加功能——因此该能力随代码一同到来，而不是两条链必须协商的移植成果。

Dash 的路线图直接阐明了其意图：

> *"与面临交易所下架和监管阻力的强制隐私系统不同，屏蔽余额通过查看密钥支持选择性披露 [selective disclosure]——使用户和企业能够在需要时与审计师共享交易详情，或遵守旅行规则要求，同时不影响日常使用中的隐私。"*

有两项观察值得记录：

**Dash 围绕比 Zcash 自身工具所达到的程度更具体的生产用例 [use case] 来定位 viewing key。** Zcash 的支付披露工具长期以来在各钱包中基本仍属实验性和自愿采用。Dash 则将查看密钥作为具有明确命名用例的合规功能推出；根据其自身公告，该链还提供约 1 秒的确定性结算和约 20 秒的钱包同步。

**未决事项是兼容性漂移，而非能力。** 随着两条链独立演进，Dash 的 viewing key 实现是否会继续与 Zcash 的 Orchard viewing key 格式保持线路兼容，值得跟踪。这是一个监测问题，而非研究项目。

---

## 密钥派生：Zcash 与 Dash 对比

本节直接回答审阅者的问题。简短答案是，*屏蔽* 密钥树几乎完全相同，因为代码是共享的——有意义的差异在于每条链如何在其钱包密钥空间中**植根**该树，以及该空间中还容纳了什么。

### Zcash

Zcash 使用 [ZIP 32，*屏蔽分层确定性钱包 [Shielded Hierarchical Deterministic Wallets]*](https://zips.z.cash/zip-0032)，其状态为 **最终版 [Final]**。ZIP 32 不将屏蔽密钥置于单一 BIP 32 树中，而是为每个屏蔽池赋予自己的主密钥和自己的路径：

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

根据 BIP 43，`purpose` 固定为 `32'`（0x80000020）；`coin_type` 遵循 SLIP 44，所有测试网共享索引 `1`。

在一个 Orchard 账户中，层级结构严格单向——每一层都可以派生其下方的一切，而不能派生其上方的任何内容：

| 密钥 | 可以做什么 | 派生 |
|---|---|---|
| Spending key | 花费 note | `ask`、`nk`、`rivk` |
| Spend authorizing key (`ask`) | 授权花费 | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | 查看传入**和**传出支付 | IVK、OVK |
| Incoming Viewing Key | 仅查看传入支付 | 多样化地址 |
| Outgoing Viewing Key | 恢复传出支付详情 | — |
| Diversified address | 接收 | — |

相对于 Sapling，Orchard 对此作出了简化：根据 [Orchard Book](https://zcash.github.io/orchard/design/keys.html)，nullifier 私钥 `nsk` 已被移除，`nk` 已成为一个域元素而非曲线点，并且 `ovk` 现在由完整 viewing key 派生，而非单独持有。

在此之上是 [ZIP 316，*统一地址和统一 Viewing Key [Unified Addresses and Unified Viewing Keys]*](https://zips.z.cash/zip-0316)——修订版 0 为活跃状态，修订版 1 已撤回，修订版 2 为草案——它将各 pool 的密钥捆绑为一个**统一 Full Viewing Key**（"组合多个 Full Viewing Key……项目"）和一个**统一 Incoming Viewing Key**。钱包开发者必须遵守的区别是：UFVK 会揭示传入和传出活动，而 UIVK 仅揭示传入活动。

### Dash

Dash 将一切植根于传统的 BIP 32 树中，使用 SLIP 44 币种类型 `5'`，并添加了自身的两项派生扩展。

[DIP-0009，*功能派生路径 [Feature Derivation Paths]*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)，插入了一个**功能 [feature]** 层级，以按币种特定功能划分密钥空间：

```
m / purpose' / coin_type' / feature' / *
```

其中，`purpose` 固定为 `9'`（0x80000009），`coin_type` 固定为 `5'`（0x80000005）。该 DIP 所陈述的动机是隔离——*"可能需要将混合资金保留在与未混合资金隔离的路径中。"*

[DIP-0014，*使用 256 位无符号整数的扩展密钥派生 [Extended Key Derivation using 256-bit Unsigned Integers]*](https://github.com/dashpay/dips/blob/master/dip-0014.md)，更进一步，突破 BIP 32 的 31 位索引限制，使路径组件可以携带完整的 256 位值。这允许使用如下基于身份派生的路径：

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

其中最后两个组件是用户身份哈希。Zcash 没有类似机制：ZIP 32 没有从另一方身份派生密钥路径的概念。

### 两者实际的不同之处

**屏蔽子树相同。** Dash 的屏蔽密钥是 Orchard 密钥，因为 Dash 的屏蔽池是 Orchard。在两者之间迁移的钱包开发者，使用的是同一套从花费密钥到 viewing key 的结构。

**植根方式不同。** Zcash 使用用途 `32'`，将每个屏蔽池隔离在各自的主密钥之下。Dash 则使用用途 `9'`，将屏蔽功能挂接在一棵统一树上，与其他所有功能并列。Zcash 按密码学 pool 分隔；Dash 按产品功能分隔。

**Dash 的密钥空间包含 Zcash 所没有的内容：一个独立的 BLS 域。** 用于 LLMQ 的主节点运营者密钥、投票密钥和委员会密钥都是 BLS 密钥，而非 Schnorr 系列密钥，并且完全位于上述 BIP 32 树之外。这正是 Dash 现有阈值签名所在之处——也正是它无法与 Orchard 花费授权组合的原因，如下一节所述。

**身份关联派生仅存在于 Dash。** DIP-0014 的 256 位路径旨在从身份之间的关系派生密钥。这是一个 Dash Platform 概念，没有对应的 Zcash 等价物，也是两种派生方案有意而非偶然分歧的最明确案例。

*参见图 1，了解两种植根方案如何汇聚至共享的 Orchard 子树。*

---

## FROST：真正开放的问题

Dash 拥有成熟的 **基于 BLS 的 LLMQ**（长期存续主节点委员会）阈值签名系统，用于 ChainLocks、InstantSend 和 Dash Platform 验证者共识。

[ZIP 312，*用于花费授权多重签名的 FROST*](https://zips.z.cash/zip-0312)，状态为 **草案 [Draft]**，做的是另一件事。它对已由 Sapling 和 Orchard 定义的、基于 Schnorr 的花费授权签名——分别为 **RedJubjub** 和 **RedPallas**——进行阈值化，以便按 ZIP 自己的表述，使 *"共同托管一个钱包的用户和第三方服务，或管理共享资金的一群人"* 能在花费前要求 2-of-3 等阈值批准。它被归类为一个**钱包 [Wallet]** ZIP：它生成与现有花费授权兼容的签名，而不改变共识。它保留了协调者角色，ZIP 明确拒绝将其移除，并讨论了可信经销商密钥生成和分布式密钥生成。

重要的区别，以及这些方案无法互为替代的原因：

| | Dash BLS / LLMQ | Zcash FROST（ZIP 312） |
|---|---|---|
| 签名方案 | BLS | Schnorr——RedJubjub / RedPallas |
| 谁签名 | 一个由主节点组成的委员会 | 一小组个人密钥持有者 |
| 授权什么 | 一个网络事实：区块锁、交易锁 | 来自一个屏蔽账户的一笔花费 |
| 层级 | 共识 | 钱包 |
| 密钥空间 | 独立 BLS 域 | Orchard/Sapling 花费授权密钥 |
| 状态 | 已部署 | 草案，无参考实现 |

Dash 拥有 BLS 阈值签名，**并不**意味着它拥有或需要 FROST。但这确实意味着，Dash 的工程师在内部已熟悉阈值签名、分布式密钥生成和委员会协调——若他们选择构建此功能，这些都是可实际转移的经验。

*参见图 2，了解每种方案实际签署的内容。*

### 初步来看，在 Dash 的 Orchard 分叉上实现 FROST 所需的内容

1. **在 RedPallas 上进行 FROST DKG 和签名仪式**，即 Orchard 的花费授权方案——Pallas 曲线上的一种 Schnorr 变体。这与 Dash 面向 LLMQ 的现有 BLS DKG 独立，且不可化约为后者。
2. **支持对单个屏蔽账户进行多方签名的钱包和 UX**，这与主节点委员会工具的交互模式不同，并需要一个协调者等价物。
3. **就层级作出决定。** 最可能仅在钱包层面实现，因为 ZIP 312 被界定为基于现有原语的钱包方案，而非共识变更——但这需要针对 Dash 的 Orchard 分叉进行确认，而不能从 Zcash 的范围界定中假定。

---

## 建议

**Viewing key——记录，而非研究。** 该能力已在两条链上部署。一则简短的 wiki 说明，记录 Dash 的屏蔽池包含查看密钥，并链接至 Dash 的路线图，可以避免 ZecHub 的受众误以为它仍是假设性的。随着两条链演进，跟踪线路格式兼容性。

**FROST——真正的机会，但受上游阻塞。** 它取决于 ZIP 312 达到具有参考实现的阶段，或 Dash 选择并行构建。ZecHub 无法直接推动它。

**价值最高的下一步是对话，而非更多案头研究。** 能够构建此功能的人是可联系到的。Shielded Labs 正在推动 ZIP 312；围绕 Orchard 集成的“借鉴自 Zcash”表述，Dash 的工程团队已作出积极回应。将两者联系起来的跨社区讨论串，比又一轮阅读能带来更多发现；本简报已达到公共来源所能解决问题的极限。

---

## 图示

**图 1——密钥派生植根：Zcash ZIP 32 与 Dash DIP-0009/0014，汇聚至共享的 Orchard 子树。**
`assets/Zcash_Dash_Key_Derivation.svg`

**图 2——每种阈值方案实际签署的内容：主节点委员会证明一个网络事实，对比密钥持有者群组授权一笔屏蔽花费。**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## 来源

**Zcash——协议**
- [ZIP 32：屏蔽分层确定性钱包 Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)——状态为最终版
- [ZIP 224：Orchard 屏蔽协议 Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312：用于花费授权多重签名的 FROST](https://zips.z.cash/zip-0312)——状态为草案
- [ZIP 316：统一地址和统一 Viewing Key Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [Orchard Book——密钥和地址](https://zcash.github.io/orchard/design/keys.html)
- [Zcash 协议规范](https://zips.z.cash/protocol/protocol.pdf)——密钥组件，§5.6.4

**Dash——协议和公告**
- [屏蔽交易已在 Dash Evolution 主网上线](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)——2026 年 8 月 4 日
- [Dash 正在将屏蔽交易添加到 Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/)——2026 年 2 月 19 日
- [Dash 路线图](https://www.dash.org/roadmap/)——屏蔽余额，2026 年 7 月完成，Platform v4.0；更新于 2026 年 9 月 12 日
- [DIP-0009：功能派生路径 Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014：使用 256 位无符号整数的扩展密钥派生 Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Core 文档——主节点委员会（LLMQ）](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips 仓库](https://github.com/dashpay/dips)

**同期报道**
- [Dash 在隐私升级中推出 Zcash 的 Orchard 技术](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/)——Cryptopolitan
- [Dash 将 Zcash Orchard 隐私引入 Evolution 链，用于屏蔽交易](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions)——HackerNoon

*来源核查于 2026 年 9 月 27 日。Dash Platform 和 ZIP 312 都在持续发展；在重新发布前，应再次核实图示和状态。*
