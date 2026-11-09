# Zcash 术语库

一份涵盖与 Zcash 相关的关键术语、概念和资源的综合词汇表。这是用于查找发布说明、论坛讨论串或钱包更新日志中术语的统一术语库。

### 快速导航
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| 术语 | 定义 |
|------|-----------|
| Actions | 与其为每笔花费和输出分别创建多个证明，Orchard 协议会将它们合并为一个操作。 |
| Addresses | Zcash 拥有屏蔽（zaddr）和透明（taddr）地址。统一地址（UA）捆绑了多种接收者类型，因此发送钱包可以选择双方均支持的最佳类型。详见 [ZIP 316](https://zips.z.cash/zip-0316)。[统一地址](/zcash-tech/unified-addresses) |
| Arborist Call | 每两周一次的会议，涵盖 Zcash 协议及研究开发更新。会议托管于 Zcash 社区论坛和 Discord。[会议记录](https://github.com/ZcashCommunityGrants/arboretum-notes) / [论坛公告](https://forum.zcashcommunity.com) |
| Auto-shielding | 使用户（更准确地说是其钱包）能够自动将资金从透明地址转移至最新的屏蔽 ZEC pool。 |

## B

| 术语 | 定义 |
|------|-----------|
| Benchmarking | 矿工能够提交有关用于挖掘 Zcash 的各种硬件效率的指标。[在此查看](https://zcashbenchmarks.info) |
| Block | 区块是 Zcash blockchain 中的一条记录，包含一组在网络上发送的交易。平均约每 75 秒，一个新区块会被追加到 blockchain。 |
| Block Explorer | 用于查看 blockchain 上所有过往和当前交易的在线工具。[Zcash 区块链浏览器](https://zcashexplorer.app/) |
| Blogs | [ZODL 博客（原为 Electric Coin Co）](https://zodl.com/blog/) / [Zcash Foundation 博客](https://zfnd.org/blog/) / [ZecHub 新闻简报](https://zechub.substack.com/) |
| Blossom | Zcash 的第 3 次重大网络升级。[更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| 术语 | 定义 |
|------|-----------|
| Canopy | Zcash 的第 5 次重大网络升级。[更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | 允许提交者使用一个短字符串对多项式进行 commitment，验证者可用它确认所提交多项式的声称求值。可用于降低 Zcash 协议中的通信成本。 |
| Community | [官方 Zcash 社区论坛](https://forum.zcashcommunity.com) / [Zcash 社区 Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash 研发 Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | 一种提议的混合共识设计，将在 Zcash 现有工作量证明的基础上并行运行权益证明。Shielded Labs 主导这项工作，并在 `zebra-crosslink` 仓库中维护原型。Crosslink 目前不属于 Zcash。[Crosslink 协议](/zcash-tech/crosslink-protocol) |
| CrossPay | ZODL 钱包中的一项功能，使你可以花费屏蔽 ZEC，同时接收者以其偏好的资产和链获得支付，该过程通过 NEAR Intents 路由，而非通过中心化交易所。 |
| Cypherpunk Zero | ECC、插画师 Stranger Wolf、Mighty Jaxx 和精选生态系统合作伙伴之间的创意宇宙及协作项目。[Cypherpunk Zero 社交媒体](https://x.com/cypherpunkZero) / [OpenSea 系列](https://opensea.io/collection/cypherpunk-zero) |

## D

| 术语 | 定义 |
|------|-----------|
| DeFi | 将 ZEC 与 DeFi 整合的项目：[Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | 指从 zaddr（屏蔽地址）向 taddr（透明地址）发送的交易。交易来源不可见，但资金会进入一个公开可见的价值 pool。 |
| Developer Resources | [开发者资源](https://www.zcashcommunity.com/developers/) |
| Documentation | [官方文档](https://zcash.readthedocs.io/en/latest/) |

## E

| 术语 | 定义 |
|------|-----------|
| ECC | Electric Coin Company，即启动 Zcash 协议的团队，原名为 Zcash Company。其整个工程团队于 2026 年 1 月在与 Bootstrap 董事会发生治理争议后辞职，随后成立了 ZODL。 |
| ECDSA | 椭圆曲线数字签名算法是一种密码学安全的数字签名方案。ECDSA 签名/验证算法依赖于椭圆曲线点乘。 |
| Education | 讲解 Zcash 的学习导向视频可在 [此处](https://www.zcashcommunity.com/zcash-education/) 查看。 |
| Encrypted Memos | 发送至屏蔽地址的交易中的附加字段，支付接收者可见。加密备忘录仅对发送者和接收者可见。 |
| Equihash | 用于 Zcash 的面向内存的工作量证明挖矿算法。 |
| Events | 与 Zcash 相关的活动日历可在 [Luma](https://luma.com/zcash) 和 [Zcash Foundation](https://zfnd.org/zf-events/) 上查看。 |
| Exchanges | [支持 Zcash 的交易所列表](https://z.cash/exchanges/) |

## F

| 术语 | 定义 |
|------|-----------|
| Fiat-Shamir | 一种将知识交互式证明转换为基于该证明的数字签名的技术。借此，某项事实（例如对某个秘密的知悉）可以被公开证明，而无需披露底层信息。 |
| Formal Verification | 通过数学方式证明系统行为与规范完全一致，而非仅依赖测试。Ironwood Action 电路由 zkSecurity 和 ZODL 的贡献者使用 Lean 定理证明器以这种方式验证，以证明不存在可靠性漏洞。 |
| Founders Reward | 创始人奖励占区块总奖励的 20%，从每个区块的价值中扣除，并以透明方式分配，以推动协议开发和增长。 |
| Free2Z | 由 Zcash 驱动的匿名内容和私密捐款工具。[Free2Z](https://free2z.com) |
| FROST | 灵活、轮次优化的 Schnorr 门限签名方案。[研究论文](https://eprint.iacr.org/2020/852) |

## G

| 术语 | 定义 |
|------|-----------|
| Governance | ZIP 流程作出的决定会被写入 Zcash 规范，以及运行网络的软件中。当网络中多数部分采用升级且未破坏共识时，这些变更便会在链上得到批准。[完整协议历史](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| 术语 | 定义 |
|------|-----------|
| Halo | 无需可信设置即可实现电路升级，使 Zcash 屏蔽协议更灵活地适应未来的改进和扩展。[技术说明](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | 分层确定性钱包从一个种子生成一系列密钥对，兼具便利性、可管理性和高等级安全性。 |
| Heartwood | Zcash 的第 4 次重大网络升级。[更多信息](https://z.cash/upgrade/heartwood/) |

## I

| 术语 | 定义 |
|------|-----------|
| Index | CoinDesk 的 ZCX 指数代表 Zcash 的实时美元等值现货汇率。[价格指数](https://www.coindesk.com/indices/zcx/) |
| Integrations | 你可以通过多个第三方服务商接受 Zcash 支付。[支付处理商](https://z.cash/zcash-for-business/) |
| Interactive Proof System | 一种抽象机器，将计算建模为证明者和验证者两方之间的信息交换。 |
| Investment | 希望获得 Zcash 敞口的机构投资者或家族办公室可选择多种金融方案。[完整列表](https://z.cash/investors/) |
| Ironwood | 网络升级 NU6.3，自 2026 年 7 月 28 日起在主网上线，始于区块 3,428,143。Ironwood 引入了基于已修正 Orchard 电路的新屏蔽 pool，并封存原始 Orchard pool，使任何人都能核查流通供应量是否真实。其共识规则详见 [ZIP 258](https://zips.z.cash/zip-0258)。[Ironwood](/zcash-tech/ironwood) |

## J

| 术语 | 定义 |
|------|-----------|
| JubJub | 一种专为在 zk-SNARK 电路中高效实现而设计的椭圆曲线。 |

## K

| 术语 | 定义 |
|------|-----------|
| Keystone Wallet | 一款隔离网络的硬件钱包，原生支持 Zcash（Orchard 屏蔽），并兼容 ZODL 进行冷签名。[Keystone](https://keyst.one) |

## L

| 术语 | 定义 |
|------|-----------|
| Layer-1 | 指基础网络及其底层基础设施。第 1 层 blockchain 无需其他网络即可验证并最终确认交易。Zcash 是一个 L1 blockchain。 |
| librustzcash | 一个 Rust 工作区，包含用于处理 Zcash 的所有 crate 和依赖项。[仓库](https://github.com/zcash/librustzcash) |
| lightwalletd | 一个无状态服务器，向轻客户端提供 blockchain 信息。[lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| 术语 | 定义 |
|------|-----------|
| Metrics | 网络指标可在 [此处](https://tokenterminal.com/explorer/projects/zcash/metrics/all) 查看。 |
| Metadata | 与用户 Zcash 交易一同生成的数据。这可能包括区块高度、交易版本或到期高度等。 |
| Mobile SDK | 一个连接 Android 与 Zcash 的轻量级 SDK，使第三方 Android 应用能够发送和接收屏蔽交易。[GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | 对于每个区块，Zcash 网络中的节点通过进行复杂的数学计算来竞争，以找出基于自适应难度的解的过程。[指南](https://z.cash/mining-zcash/) |
| Multisignature | 一种需要多个私钥签名才能花费资金的地址。目前，多签功能仅受透明地址支持。 |

## N

| 术语 | 定义 |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Shielded Labs 提出的一项提案，旨在销毁部分交易手续费，使协议的长期安全预算不完全依赖于发行。详见 ZIP 234，目前正于 2026 年审议。 |
| Nighthawk | 一款面向 Zcash 的移动钱包。[网站](https://nighthawkwallet.com) |
| Noir Wallet | 由 Zcash Community Grants 支持的 Zcash 浏览器扩展钱包，旨在将屏蔽 ZEC 直接连接至浏览器应用，而不是依赖二维码和手动转账。[zknoir.com](https://www.zknoir.com/) |
| NU5 | Zcash 的第 6 次重大网络升级，引入了 Orchard 屏蔽 pool 和统一地址。[更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcash 的第 7 次重大网络升级，调整区块补贴以资助 Zcash Community Grants 项目及延期开发基金锁箱。于 2024 年末激活。[更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwood 之后的网络升级，目标于 2026 年 11 月 5 日在主网上线。根据 [ZIP 259](https://zips.z.cash/zip-0259)，它带来 25 秒区块（ZIP 218）、带手续费循环利用的网络可持续性机制（ZIP 235 和 237），以及版本 4 交易的终止，这将使 Sprout 资金无法花费（ZIP 2003）。它未增加新的交易格式；Tachyon 和 Zcash Shielded Assets 并不属于此次升级。 |

## O

| 术语 | 定义 |
|------|-----------|
| Oblivious Synchronization | Project Tachyon 正在开发的一种方法，使钱包能够向不受信任的服务器请求所需数据，而不透露其查询的是哪些 note。服务器永远不会获知你的 nullifier，因为协议使其以不可关联的方式演变。[说明文档](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | 在 NU5 中引入的屏蔽 pool。发现可靠性漏洞后，Ironwood 将其封存，因此你无法再在 Orchard 内发送或接收。资金只能通过 turnstile 离开。[屏蔽池](/using-zcash/shielded-pools) |
| Overwinter | Zcash 的第 1 次网络升级。[更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| 术语 | 定义 |
|------|-----------|
| Payments | 可以通过多种不同的支付服务商使用 Zcash 进行日常购买。[支付应用](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | 一种原语，其中数据携带自身正确性的证明，因此组合数据也会组合证明。Project Tachyon 围绕 PCD 重建屏蔽协议，使每个钱包都能携带递归证明来验证自身余额正确，而无需重新扫描链。Zcash 的实现是 [Ragu](https://github.com/tachyon-zcash/ragu)，它遵循 Halo，且不需要可信设置。 |
| Peer-to-Peer Network | P2P 网络基于去中心化的概念，是 blockchain 技术的基础架构。 |
| PIR (Private Information Retrieval) | 使你能够从服务器获取记录而服务器不会得知你请求哪条记录的技术。正在为 Zcash 积极研究，作为让轻钱包获取所需内容而不泄露其查询目标的方式。 |
| Podcast | [Radiolab（Zcash Ceremony）](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| 术语 | 定义 |
|------|-----------|
| QR Code | 一种机器可读代码，用于编码 Zcash 地址，以便轻松扫描。现代 Zcash 钱包通常通过二维码分享统一地址（UA）。 |
| Quantum Recoverability | Ironwood note 的一种属性，规定于 [ZIP 2005](https://zips.z.cash/zip-2005)，如果未来的量子计算机破解了如今保护 coin 的密码学，它可使 coin 的链上记录得以恢复。这是一条恢复路径，而非量子抗性，并且它适用于 Ironwood note，不适用于现有的 Sprout、Sapling 或 Orchard 资金。 |

## R

| 术语 | 定义 |
|------|-----------|
| Recovery Phrase | 由 12 或 24 个字母和数字组成的序列，用于备份和恢复钱包。在 Zcash 中，此短语会重新生成花费密钥和 viewing key，因此对资金恢复和安全至关重要。 |

## S

| 术语 | 定义 |
|------|-----------|
| Sapling | 一项重大网络升级，引入了屏蔽交易的显著效率改进，并为移动端采用铺平了道路。于区块 419200 激活。 |
| Selective Disclosure | 允许屏蔽地址的所有者选择性地与第三方分享 viewing key 或支付披露信息，同时对其他所有人保持数据私密。 |
| Shielded Address | 也称为 zaddr。以 z 开头。使用 zk-SNARKs 隐藏发送方、接收方、金额和备忘录。 |
| Shielded Labs | 一个独立组织，致力于 Zcash 协议经济学和共识。目前主导 Crosslink 以及网络可持续性机制。[GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | 仅在屏蔽地址之间进行的交易。在 blockchain 上完全私密。 |
| Sol/s | 每秒解决方案数 - 衡量 Equihash 挖矿性能。 |
| Spending Key | 可用于从屏蔽地址花费资金的私钥（也可让你查看余额和历史记录）。 |
| Sprout | Zcash 最初的屏蔽协议版本（于 2016 年推出）。 |

## T

| 术语 | 定义 |
|------|-----------|
| Tachyon | Zcash 的扩容计划。它不是 NU7 的一部分（[ZIP 259](https://zips.z.cash/zip-0259)），且没有激活日期。它让钱包不再扫描每个区块，转向携带证明的钱包状态、无感同步和可修剪的节点状态，目标是实现每秒数千笔屏蔽交易的吞吐量。[项目网站](https://tachyon.z.cash/overview/) |
| TAZ | 测试网 Zcash（无价值测试货币）。 |
| Testnet | 一个独立的 blockchain，用于在主网之前测试升级和功能。 |
| Trailing Finality Layer (TFL) | 研究如何在 Zcash 的工作量证明链之后添加最终性层，使近期区块无需取代挖矿即可被最终确认。Crosslink 是由此产生的设计。 |
| Transaction | 用户之间的一次支付，提交至网络并最终在一个区块中得到确认。 |
| Transaction Expiry | 如果交易未经确认，将在约 25 分钟（20 个区块）后过期；资金会自动退回。 |
| Transaction Fee | 默认手续费为 0.0001 ZEC。较高手续费可获得优先处理；极低手续费可能导致延迟或过期。 |
| Transparent Address | 也称为 taddr。以 t 开头。完全公开（类似 Bitcoin）。 |
| Transparent Transaction | 仅在透明地址之间进行的交易 - 所有内容均公开可见。 |
| Turnstile | 用于追踪进入和离开每个屏蔽池的价值量的记账规则，因此任何 pool 都不能释放超过其流入量的价值。它用于 Zcash 历史中的每次 pool 转换，目前正守护从 Orchard 迁移至 Ironwood 的过程。[更多信息](/zcash-tech/the-turnstile) |

## U

| 术语 | 定义 |
|------|-----------|
| Unified Address | 现代地址格式（在 NU5 中引入），可在一个字符串中同时用于透明和屏蔽支付。 |
| Upgrade Activation | 网络升级（例如 NU5、NU6）自动激活时的具体区块高度。 |

## V

| 术语 | 定义 |
|------|-----------|
| Viewing Key | 一种私钥，可让你查看屏蔽地址的余额和交易历史，但不能花费其中的资金。 |

## W

| 术语 | 定义 |
|------|-----------|
| Wallet | 用于存储私钥并让你发送/接收 ZEC 的软件或硬件。活跃的钱包包括 ZODL（iOS/Android）、Zingo!（移动端/桌面端）、Nighthawk（Android）、Zkool（移动端/桌面端）、Zallet（即将推出）和 Keystone（硬件）。如需完整列表，请参阅 [Zcash 生态系统钱包](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | 首个面向 Zcash 的 JavaScript SDK，由 ChainSafe 为浏览器环境构建。它支撑了 Zcash Shielded Wallet snap，将屏蔽 ZEC 引入 MetaMask。 |

## X

| 术语 | 定义 |
|------|-----------|
| XZC | 某些旧版交易所使用的 Zcash 旧 ticker 符号。官方 ticker 为 ZEC。 |

## Y

| 术语 | 定义 |
|------|-----------|
| YWallet | 一款注重隐私的 Zcash 钱包，支持 Orchard、Sapling 和透明地址，以快速同步著称。已不再维护：其开发者已确认不会为 Ironwood 更新它，因此它无法再跟随网络。由同一开发者推出的 Zkool 是仍在维护的继任者。 |

## Z

| 术语 | 定义 |
|------|-----------|
| Zcash | 使用 zk-SNARKs 的注重隐私的加密货币。连接透明（Bitcoin 风格）支付与完全屏蔽支付。 |
| Zcash Foundation | 支持 Zcash 生态系统、为开发提供拨款并推广隐私的独立非营利组织。 |
| Zcash Network | 用于验证交易并维护 blockchain 的点对点节点网络。 |
| ZEC | Zcash 的官方货币代码（部分交易所仍显示 XZC）。 |
| Z3 stack | 共同取代 zcashd 的三个程序：用于节点的 Zebra、用于索引的 Zaino、用于钱包的 Zallet。[Z3 stack](/zcash-tech/z3-stack) |
| Zerocash | Zcash 所基于的学术协议（2014 年）。 |
| Zaino | 一个以 Rust 编写、由 Zingo Labs 开发的索引器，可从 Zebra 节点提供钱包数据。它接管了 zcashd 过去为轻钱包执行的索引工作。[Zaino](/zcash-tech/zaino) |
| Zakura | 一个为扩容而构建的独立 Zcash 全节点，由 Sean Bowe 和 Dev Ojha 领导。它同步更快，可原生修剪区块，并能在其上运行 zcashd，以支持仍依赖它的软件。[Zakura 节点](/zcash-tech/zakura-node) |
| Zallet | 用于取代 zcashd 钱包的钱包。请迁移现有的 `wallet.dat`，而不是重新开始。[Zallet](/zcash-tech/zallet) 以及 [Zallet 快速参考](/using-zcash/zallet-quick-reference-guide) |
| Zebra | 用于取代 zcashd 的全节点，由 Zcash Foundation 维护。如果你需要验证节点，请运行它。[Zebra 全节点](/zcash-tech/zebra-full-node) |
| zcashd | 最初的 Zcash 全节点和钱包，现已退役。版本 6.20.0 于 2026 年 7 月 18 日在区块 3417100 自行关闭，并且从未支持 NU6.3。请改为运行 Z3 stack 或 Zakura。[迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash 改进提案 - 用于提议和批准协议变更的社区治理流程。[ZIP 存储库](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab。该独立组织于 2026 年初由 Josh Swihart 和前 Electric Coin Company 工程团队创立，此前他们因与 Bootstrap 的治理争议而辞职。它于 2026 年 3 月筹集超过 $25 million 的种子资金，并维护 ZODL 钱包；该钱包于 2026 年 2 月由 Zashi 更名而来。[zodl.com](https://zodl.com) |
| zk-SNARKs | 零知识简洁非交互式知识论证 - 为 Zcash 屏蔽交易提供支持的密码学。允许在不泄露任何秘密信息的情况下证明一项陈述（例如，有效花费）。 |
| ZSA (Zcash Shielded Assets) | 用户发行的代币，继承 Zcash 的屏蔽隐私，使 ZEC 以外的资产能够在网络上私密流转。规定于 [ZIP 226](https://zips.z.cash/zip-0226)。它不是 NU7 的一部分（[ZIP 259](https://zips.z.cash/zip-0259)），且没有激活日期。 |

---

**最后更新：** 2026 年 10 月
**想要贡献？** [在 GitHub 上编辑此页面](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
