# FROST 与 Viewing Keys：Zcash/Dash 互操作性研究简报

*为 ZecHub 编写 · 修订于 2026 年 9 月 27 日 · 所有主张均附有内嵌来源*

## 执行摘要

在将屏蔽 DASH 添加为 wiki 捐款选项后，ZecHub 提出了这个问题：Zcash 风格的 viewing keys，或 FROST 阈值签名，能否适用于 Dash？

研究重新界定了这个问题。Viewing keys 并非一个悬而未决的问题——Dash 已将 [Zcash Orchard 屏蔽资金池](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)部署到其 Evolution 链中，而 Orchard 的密钥层级结构天生就包含 viewing keys。Dash 自己的 [路线图](https://www.dash.org/roadmap/)将其定位为用于审计披露和 Travel Rule 合规。这一部分已经部署，并非假设。

**FROST 才是真正存在缺口的地方。** Dash 已通过 [长期存续主节点仲裁组](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)运行 BLS 阈值签名，但这些签名服务于网络层共识——ChainLocks 和 InstantSend。[ZIP 312](https://zips.z.cash/zip-0312) 针对的是另一件事：由少数个人密钥持有者共同控制的单个屏蔽账户的阈值支出授权。两者不可互换。而且，由于 ZIP 312 仍为**草案**，两条链上都没有可移植的参考实现，因此无论由哪一方构建，这都会是新颖的工作。

---

## 时间线：为何此刻的比较不同寻常

2026 年年中，两起屏蔽资金池事件在彼此数周内发生。

**Zcash 脱离了 Orchard。** 研究人员 Taylor Hornby 披露了 Orchard 中的一个电路漏洞，该漏洞可能被利用以无法察觉的方式增发供应量。Zcash 通过在 **2026 年 7 月 28 日**激活 **Ironwood（NU6.3）**作出回应，引入了一个带有 turnstile 迁移机制的新屏蔽资金池。

**Dash 转而采用 Orchard。** Dash 于 [2026 年 2 月 19 日](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/)宣布该计划——*"我们预计很快能够推出屏蔽转账，当然仍需通过安全审计和进一步的代码审查。"* Dash 的 [路线图](https://www.dash.org/roadmap/)记录，屏蔽余额已于 **2026 年 7 月**随 Dash Platform **v4.0** 完成；Dash 则在 **2026 年 8 月 4 日**发布 [*"屏蔽交易已在 Dash Evolution 主网上线"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)。

> **关于时间顺序的说明。** 一些报道将 Dash 主网激活置于 2026 年 7 月 17 日，这将使其早于 Ironwood。该日期似乎源于对公告的新闻报道，而非激活本身。按照 Dash 自己的来源，该功能于 7 月完成，并于 8 月 4 日宣布上线——晚于 Ironwood。两条链在数周内交汇；确切顺序取决于计入哪个里程碑，本简报不主张其中任一种说法。

关键是，Dash 并未继承该漏洞。其公告明确表示：*"我们实现的 Orchard 版本不存在已知的增发漏洞。先前版本包含一个漏洞，可能被利用以无法察觉地增发 Zcash 的供应量。"*

因此，Dash 目前运行的是一项加密技术的已修补分叉版本，而 Zcash 本身已在基础层放弃该技术；与此同时，Zcash 的下一代资金池（Ironwood）刚刚上线，下一代支出授权方案（FROST）仍处于草案阶段。

---

## Viewing keys：已部署，而非研究缺口

Dash 的屏蔽资金池是 [Orchard](https://zips.z.cash/zip-0224)，构建于无需可信设置的 Halo 2 zk-SNARKs之上。Orchard 的密钥层级结构始终将 Full Viewing Keys 和 Incoming Viewing Keys 作为设计的一部分，而非附加功能——因此该能力随代码一同到来，并非任一链需要协商移植的内容。

Dash 的路线图直接说明了意图：

> *"与面临交易所下架和监管阻力的强制隐私系统不同，Shielded Balances 通过 view keys 支持选择性披露——让用户和企业在需要时可与审计人员共享交易详情，或遵守 Travel Rule 要求，同时不损害日常使用中的隐私。"*

有两点值得记录：

**Dash 正围绕比 Zcash 自身工具所达到的程度更具体的生产用途定位 viewing keys。** Zcash 的支付披露工具在各钱包中基本仍处于实验性和自愿采用状态。Dash 则将 view keys 作为带有明确使用案例的合规功能推出；根据其自身公告，该链还提供约一秒的确定性结算和约二十秒的钱包同步。

**待解决事项是兼容性漂移，而非能力。** 随着两条链各自独立演进，Dash 的 viewing-key 实现是否仍与 Zcash 的 Orchard viewing-key 格式保持线缆兼容，值得跟踪。这是一个监测问题，而非研究项目。

---

## 密钥派生：Zcash 与 Dash 的比较

本节直接回答审阅者的问题。简短的回答是：由于代码共享，*屏蔽*密钥树几乎完全相同——有意义的差异在于，每条链如何在其钱包密钥空间中**植根**该树，以及该空间中还包含什么。

### Zcash

Zcash 使用 [ZIP 32，*屏蔽分层确定性钱包*](https://zips.z.cash/zip-0032)，其状态为**最终版**。ZIP 32 并不将屏蔽密钥置于单一 BIP 32 树内，而是为每个屏蔽资金池赋予各自的主密钥和路径：

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

根据 BIP 43，`purpose` 固定为 `32'`（0x80000020）；`coin_type` 则遵循 SLIP 44，所有测试网共用索引 `1`。

在一个 Orchard 账户内，层级严格单向——每一层均可派生其下的所有内容，但不能派生其上的任何内容：

| 密钥 | 可执行操作 | 派生 |
|---|---|---|
| 支出密钥 | 支出票据 | `ask`、`nk`、`rivk` |
| 支出授权密钥（`ask`） | 授权支出 | — |
| Full Viewing Key（`ak`、`nk`、`rivk`） | 查看转入**及**转出付款 | IVK、OVK |
| Incoming Viewing Key | 仅查看转入付款 | 多样化地址 |
| 转出 Viewing Key | 恢复转出付款详情 | — |
| 多样化地址 | 接收 | — |

相对于 Sapling，Orchard 对此作出了简化：根据 [Orchard Book](https://zcash.github.io/orchard/design/keys.html)，nullifier 私钥 `nsk` 被移除，`nk` 成为了域元素而非曲线点，且 `ovk` 现在从完整 viewing key 派生，而非单独持有。

其上层是 [ZIP 316，*Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316)——修订版 0 为有效，修订版 1 已撤回，修订版 2 为草案——它将每个资金池的密钥捆绑为一个**Unified Full Viewing Key**（“组合多个 Full Viewing Key……项目”）和一个**Unified Incoming Viewing Key**。钱包开发者必须注意这一差别：UFVK 会披露转入和转出活动，而 UIVK 仅披露转入活动。

### Dash

Dash 将所有内容根植于传统 BIP 32 树中，SLIP 44 币种类型为 `5'`，并添加了自己的两种派生扩展。

[DIP-0009，*功能派生路径*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)，插入一个**功能**层级，按币种特定功能划分密钥空间：

```
m / purpose' / coin_type' / feature' / *
```

其中，根据 BIP 43，`purpose` 固定为 `9'`（0x80000009），`coin_type` 为 `5'`（0x80000005）。该 DIP 所述的动机是隔离——*"可能希望将混合资金保留在与非混合资金隔离的路径中。"*

[DIP-0014，*使用 256 位无符号整数的扩展密钥派生*](https://github.com/dashpay/dips/blob/master/dip-0014.md)，更进一步地突破了 BIP 32 的 31 位索引限制，使路径组件可以承载完整的 256 位值。这允许使用身份派生的路径，例如：

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

其中最后两个组件是用户身份哈希。Zcash 没有对应概念：ZIP 32 不存在从另一方身份派生密钥路径的概念。

### 两者实际的差异所在

**屏蔽子树相同。** Dash 的屏蔽密钥是 Orchard 密钥，因为 Dash 的屏蔽资金池是 Orchard。在两者之间切换的钱包开发者，面对的是相同的从支出密钥到 viewing key 的结构。

**根植方式不同。** Zcash 以用途 `32'` 将每个屏蔽资金池隔离在其自身的主密钥下。Dash 则以用途 `9'` 将屏蔽功能挂在一棵统一树上，与所有其他功能并列。Zcash 按加密资金池分隔；Dash 按产品功能分隔。

**Dash 的密钥空间包含 Zcash 所没有的内容：独立的 BLS 域。** 用于 LLMQs 的主节点运营者密钥、投票密钥和仲裁组密钥均为 BLS 密钥，而非 Schnorr 系列密钥，并且完全位于上述 BIP 32 树之外。这正是 Dash 现有阈值签名所在之处——也正是它无法与 Orchard 支出授权组合的原因，如下一节所述。

**身份关联派生仅存在于 Dash。** DIP-0014 的 256 位路径用于从身份之间的关系派生密钥。这是 Dash Platform 的概念，没有 Zcash 对等机制，也是两种派生方案有意分化而非偶然分化的最明确例子。

*参见图 1，了解两种根植方案如何汇聚到共享的 Orchard 子树。*

---

## FROST：真正开放的问题

Dash 拥有成熟的 **基于 BLS 的 LLMQs**（长期存续主节点仲裁组）阈值签名系统，用于 ChainLocks、InstantSend 以及 Dash Platform 验证者共识。

[ZIP 312，*用于支出授权多重签名的 FROST*](https://zips.z.cash/zip-0312)，状态为**草案**，所做的是另一件事。它将已由 Sapling 和 Orchard 分别定义的、基于 Schnorr 的支出授权签名——**RedJubjub** 和 **RedPallas**——进行阈值化；因此，按照 ZIP 自身的表述，*"共同托管钱包的用户和第三方服务，或管理共享资金的一组人员"*，可以要求例如 3 取 2 的阈值批准后才能支出。它被归类为一个**钱包** ZIP：它生成与现有支出授权兼容的签名，而不改变共识。它保留了协调者角色，ZIP 明确拒绝移除该角色，并讨论了可信经销商密钥生成和分布式密钥生成。

重要的区别，以及它们不能互为替代品的原因：

| | Dash BLS / LLMQ | Zcash FROST（ZIP 312） |
|---|---|---|
| 签名方案 | BLS | Schnorr — RedJubjub / RedPallas |
| 签名者 | 一个主节点仲裁组 | 一小组个人密钥持有者 |
| 授权内容 | 一项网络事实：区块锁定、交易锁定 | 一个屏蔽账户的一笔支出 |
| 层级 | 共识 | 钱包 |
| 密钥空间 | 独立的 BLS 域 | Orchard/Sapling 支出授权密钥 |
| 状态 | 已部署 | 草案，无参考实现 |

Dash 拥有 BLS 阈值签名并**不**意味着它已有或需要 FROST。但这确实意味着 Dash 的工程师具备阈值签名、分布式密钥生成和仲裁组协调的内部经验——如果他们选择构建这一方案，这些经验确实可以迁移。

*参见图 2，了解每种方案实际签署的内容。*

### 初步看来，在 Dash 的 Orchard 分叉上实现 FROST 所需的条件

1. **在 RedPallas 上进行 FROST DKG 和签名仪式**，即 Orchard 的支出授权方案——Pallas 曲线上的 Schnorr 变体。这与 Dash 现有用于 LLMQs 的 BLS DKG 相互独立，且无法归约为后者。
2. **为单个屏蔽账户的多方签名提供钱包和 UX 支持**，这与主节点仲裁组工具的交互模式不同，并需要等同于协调者的角色。
3. **决定所在层级。** 最可能仅处于钱包层，因为 ZIP 312 被限定为基于现有原语的钱包方案，而非共识变更——但这一点需要针对 Dash 的 Orchard 分叉具体确认，不能从 Zcash 的范围界定中想当然推断。

---

## 建议

**Viewing keys——记录，无需研究。** 两条链均已部署该能力。一则简短的 wiki 说明，记录 Dash 的屏蔽资金池包含 view keys 并链接至 Dash 路线图，可避免 ZecHub 的受众以为它仍是假设。随着两条链演进，跟踪线缆格式兼容性。

**FROST——真实机会，但受上游阻碍。** 它取决于 ZIP 312 形成参考实现，或 Dash 选择并行构建。ZecHub 无法直接推动它。

**最有价值的下一步是交流，而不是更多案头研究。** 潜在的构建者可以接触到。Shielded Labs 正在推动 ZIP 312；Dash 的工程团队也已围绕 Zcash 集成，对“借鉴自 Orchard”的表述作出积极回应。一条连接两个社区的讨论串将比再读一轮资料揭示更多信息；而本简报已达到公开来源能够解决的问题边界。

---

## 图示

**图 1 —— 密钥派生的根植方式：Zcash ZIP 32 和 Dash DIP-0009/0014，汇聚到共享的 Orchard 子树。**
`assets/Zcash_Dash_Key_Derivation.svg`

**图 2 —— 每种阈值方案实际签署的内容：主节点仲裁组对网络事实作证，相对于密钥持有者群体授权一笔屏蔽支出。**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## 来源

**Zcash —— 协议**

- [ZIP 32：屏蔽分层确定性钱包](https://zips.z.cash/zip-0032) —— 状态：最终版
- [ZIP 224：Orchard 屏蔽协议](https://zips.z.cash/zip-0224)
- [ZIP 312：用于支出授权多重签名的 FROST](https://zips.z.cash/zip-0312) —— 状态：草案
- [ZIP 316：Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [Orchard Book —— 密钥和地址](https://zcash.github.io/orchard/design/keys.html)
- [Zcash 协议规范](https://zips.z.cash/protocol/protocol.pdf) —— 密钥组件，§5.6.4

**Dash —— 协议与公告**

- [屏蔽交易已在 Dash Evolution 主网上线](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) —— 2026 年 8 月 4 日
- [Dash 正在向 Evolution 添加屏蔽交易](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) —— 2026 年 2 月 19 日
- [Dash 路线图](https://www.dash.org/roadmap/) —— 屏蔽余额，2026 年 7 月完成，Platform v4.0；更新于 2026 年 9 月 12 日
- [DIP-0009：功能派生路径](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014：使用 256 位无符号整数的扩展密钥派生](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Core 文档 —— 主节点仲裁组（LLMQ）](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips 仓库](https://github.com/dashpay/dips)

**同期报道**

- [Dash 在隐私升级中推出 Zcash 的 Orchard 技术](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) —— Cryptopolitan
- [Dash 为 Evolution 链引入 Zcash Orchard 隐私，以实现屏蔽交易](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) —— HackerNoon

*来源核查于 2026 年 9 月 27 日。Dash Platform 和 ZIP 312 都在持续演进；重新发布前应再次核实图示和状态。*
