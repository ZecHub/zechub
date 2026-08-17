# Zcash 资料库

与 Zcash 相关的关键术语、概念和资源的综合词汇表。

### 快速导航
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| 术语 | 定义 |
|------|-----------|
| Actions | Orchard 协议不会为每一笔 Spend 和 Output 分别创建多个独立证明，而是将它们合并为一个单独的 Action。 |
| Addresses | Zcash 有 Shielded（Z/zaddr）和 Transparent（T/taddr）地址。随着 NU5 升级的推进，Unified addresses（UA）正逐步取代 Z 和 T。 |
| Arborist Call | 每两周一次的电话会议，涵盖 Zcash 协议与研究开发更新。托管于 Zcash Community Forum 和 Discord。 [会议记录](https://github.com/ZcashCommunityGrants/arboretum-notes) / [论坛公告](https://forum.zcashcommunity.com) |
| Auto-shielding | 让用户（更准确地说是他们的钱包）能够自动将资金从透明地址转移到最新的受保护 ZEC 池中。 |

## B

| 术语 | 定义 |
|------|-----------|
| Benchmarking | 矿工可以提交用于挖掘 Zcash 的各类硬件效率指标。 [在此查看](https://zcashbenchmarks.info) |
| Block | 区块是 Zcash blockchain 中的一条记录，包含一组在网络上发送的交易。平均大约每 75 秒，就会有一个新区块被附加到 blockchain 上。 |
| Block Explorer | 用于查看 blockchain 上所有过去和当前交易的在线工具。 [Zcash 区块浏览器](https://zcashexplorer.app/) |
| Blogs | [ZODL 博客（原 Electric Coin Co）](https://zodl.com/blog/) / [Zcash Foundation 博客](https://zfnd.org/blog/) / [ZecHub 博客](https://zechub.wiki/zechub-dao) |
| Blossom | Zcash 的第 3 次重大网络升级。 [更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| 术语 | 定义 |
|------|-----------|
| Canopy | Zcash 的第 5 次重大网络升级。 [更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | 允许承诺者用一个短字符串对某个多项式作出承诺，验证者可借此确认该已承诺多项式所声称的求值结果。这对于降低 Zcash 协议中的通信成本很有帮助。 |
| Community | [Zcash 官方社区论坛](https://forum.zcashcommunity.com) / [Zcash 社区 Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | 一种提出中的混合共识设计，保留工作量证明的区块生产机制，并在其上增加一层权益证明终局性层，从而在不放弃挖矿的情况下，让区块获得更强的终局性。它源自 Trailing Finality Layer 研究，由 Shielded Labs 开发，截至 2026 年仍处于 testnet 开发阶段。 |
| CrossPay | ZODL 钱包中的一项功能，可让你花费受屏蔽的 ZEC，同时收款人则以其偏好的资产和链收到付款；该过程通过 NEAR Intents 路由，而非通过中心化交易所。 |
| Cypherpunk Zero | 由 ECC、插画师 Stranger Wolf、Mighty Jaxx 以及部分生态合作伙伴共同打造的创意宇宙与协作项目。 [Cypherpunk Zero 网站](https://halo.electriccoin.co/?utm_source=ECC&utm_medium=Website&utm_campaign=None) / [Opensea 收藏集](https://opensea.io/collection/cypherpunk-zero) |

## D

| 术语 | 定义 |
|------|-----------|
| DeFi | 将 ZEC 集成到 DeFi 中的项目： [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [Near Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [ThorSwap](https://app.thorswap.finance/) |
| Deshielding | 指一笔交易从 zaddr（受保护地址）发送到 taddr（透明地址）。交易来源不可见，但资金会进入一个公开可见的价值池。 |
| Developer Resources | [开发者资源](https://www.zcashcommunity.com/developers/) |
| Documentation | [官方文档](https://zcash.readthedocs.io/en/latest/) |

## E

| 术语 | 定义 |
|------|-----------|
| ECC | Electric Coin Company，即推出 Zcash 协议的团队，此前名为 Zcash Company。其整个工程团队在 2026 年 1 月因与 Bootstrap 董事会的治理争议而集体辞职，随后成立了 ZODL。 |
| ECDSA | 椭圆曲线数字签名算法是一种密码学上安全的数字签名方案。ECDSA 的签名/验证算法依赖于椭圆曲线点乘。 |
| Education | 讲解 Zcash 的学习向视频可在[这里](https://www.zcashcommunity.com/zcash-education/)查看 |
| Encrypted Memos | 发送到受保护地址的交易中附带的一个额外字段，付款接收者可以看到。加密 memo 仅对发送方和接收方可见。 |
| Equihash | Zcash 所使用的、偏重内存的工作量证明挖矿算法。 |
| Events | Zcash 相关活动日历可在 [Luma](https://luma.com/zcash) 和 [Zcash Foundation](https://zfnd.org/zf-events/) 查看 |
| Exchanges | [支持 Zcash 的交易所列表](https://z.cash/exchanges/) |

## F

| 术语 | 定义 |
|------|-----------|
| Fiat-Shamir | 一种将交互式知识证明转换为基于其上的数字签名的技术。通过这种方式，可以在不泄露底层信息的前提下，公开证明某个事实（例如知晓某个秘密）。 |
| Formal Verification | 通过数学方式证明一个系统的行为与规范完全一致，而不是仅仅依赖测试。zkSecurity 和 ZODL 的贡献者使用 Lean 定理证明器，以这种方式验证了 Ironwood Action 电路，以证明其不存在可靠性漏洞。 |
| Founders Reward | Founders Reward 占区块总奖励的 20%，从每个区块的价值中扣除，并以透明方式分配，用于推动协议开发与成长。 |
| Free2Z | 由 Zcash 驱动的匿名内容与私密捐赠工具。 [Free2Z](https://free2z.com) |
| FROST | 灵活的轮次优化 Schnorr 门限签名方案。 [研究论文](https://eprint.iacr.org/2020/852) |

## G

| 术语 | 定义 |
|------|-----------|
| Governance | ZIP 流程产生的决策会写入 Zcash 规范以及运行该网络的软件中。当网络中的大多数采用该升级且不破坏共识时，这些变更会在链上获得确认。 [完整协议历史](https://zfnd.org/protocol-governance/) |

## H

| 术语 | 定义 |
|------|-----------|
| Halo | 无需 trusted setup 即可实现电路升级，使 Zcash 的受保护协议在未来改进和扩展方面更加灵活。 [技术解读](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | 分层确定性钱包可由一个 seed 生成一系列密钥对，在提供便利性和可管理性的同时，也具备较高等级的安全性。 |
| Heartwood | Zcash 的第 4 次重大网络升级。 [更多信息](https://z.cash/upgrade/heartwood/) |

## I

| 术语 | 定义 |
|------|-----------|
| Index | CoinDesk 的 ZCX Index 代表 Zcash 的实时美元等值现货价格。 [价格指数](https://www.coindesk.com/indices/zcx/) |
| Integrations | 你可以通过多个第三方提供商接受 Zcash 支付。 [支付处理商](https://z.cash/zcash-for-business/) |
| Interactive Proof System | 一种抽象机器模型，将计算建模为双方——证明者与验证者——之间的信息交换。 |
| Investment | 希望获得 Zcash 敞口的机构投资者或家族办公室可以使用多种金融工具。 [完整列表](https://z.cash/investors/) |
| Ironwood | 于 2026 年 7 月 28 日在主网上区块 3,428,143 激活的网络升级（NU6.3）。它引入了一个新的 shielded pool，也称为 Ironwood，并使 Orchard pool 变为仅可支出，以便现有价值穿过 turnstile 迁移。 [更多信息](/zcash-tech/ironwood) |

## J

| 术语 | 定义 |
|------|-----------|
| JubJub | 一种椭圆曲线，专为在 zk-SNARK 电路中高效实现而设计。 |

## K

| 术语 | 定义 |
|------|-----------|
| Keystone Wallet | 一款隔离网络的硬件钱包，原生支持 Zcash（Orchard shielded），并可与 ZODL 配合进行冷签名。 [Keystone](https://keyst.one) |

## L

| 术语 | 定义 |
|------|-----------|
| Layer-1 | 指基础网络及其底层基础设施。Layer-1 blockchain 无需依赖其他网络即可验证并最终确认交易。Zcash 是一条 L1 blockchain。 |
| librustzcash | 一个 Rust workspace，包含用于处理 Zcash 的所有 crates 和依赖项。 [仓库](https://github.com/zcash/librustzcash) |
| Lightwalletd | 一种无状态服务器，向轻客户端提供 blockchain 信息。 [Lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| 术语 | 定义 |
|------|-----------|
| Metrics | 网络指标可在[这里](https://tokenterminal.com/explorer/projects/zcash/metrics/all)查看 |
| Metadata | 与用户的 Zcash 交易一同生成的数据。这可能包括区块高度、交易版本或过期高度等。 |
| Mobile SDK | 一个轻量级 SDK，可将 Android 连接到 Zcash，使第三方 Android 应用能够发送和接收受保护交易。 [Github](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | 在该过程中，对于每个区块，Zcash 网络中的节点会基于自动调整的难度进行复杂数学计算竞争，以找到解。 [指南](https://z.cash/mining-zcash/) |
| Multisignature | 一种地址，需要多个私钥签名才能花费其中资金。目前，多签功能仅支持透明地址。 |

## N

| 术语 | 定义 |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Shielded Labs 提出的一项提案，旨在销毁一部分交易手续费，使协议的长期安全预算不必完全依赖发行。该提案在 ZIP 234 中有详细说明，并于 2026 年审议中。 |
| Nighthawk | 一款用于 Zcash 的移动钱包。 [网站](https://nighthawkwallet.com) |
| Noir Wallet | 一款由 Zcash Community Grants 支持的 Zcash 浏览器扩展钱包，旨在将 shielded ZEC 直接连接到浏览器应用，而不是依赖二维码和手动转账。 [zknoir.com](https://www.zknoir.com/) |
| NU5 | Zcash 的第 6 次重大网络升级，引入了 Orchard shielded pool 和 Unified Addresses。 [更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcash 的第 7 次重大网络升级，调整了区块补贴，用于资助 Zcash Community Grants 项目和 Shielded Labs。于 2024 年底激活。 [更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwood 之后的下一次重大网络升级。候选功能包括 Project Tachyon 的扩容工作、Zcash Shielded Assets 以及 Network Sustainability Mechanism。 |

## O

| 术语 | 定义 |
|------|-----------|
| Oblivious Synchronization | Project Tachyon 中正在开发的一种方法，使 wallet 能够在不泄露其正在查询哪些 notes 的情况下，从不受信任的服务器请求其所需的数据。服务器永远不会获知你的 nullifiers，因为该协议会使它们以不可关联的方式演化。[说明文档](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard Shielded Pool | Zcash 的第三个受保护池，代表了我们 ZK-SNARKs 技术栈的持续演进。[完整详情](https://electriccoin.co/blog/explaining-halo-2/) |
| Overwinter | Zcash 的第 1 次网络升级。[更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| 术语 | 定义 |
|------|-----------|
| Payments | 可以通过多种不同的支付提供商在日常购买中使用 Zcash。 [支付应用](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | 这是一种原语，其中数据会伴随其自身正确性的证明一起传递，因此组合数据时也会同时组合这些证明。Project Tachyon 围绕 PCD 重建了屏蔽协议，使每个 wallet 都能携带一个关于其自身余额正确性的递归证明，而不必重新扫描整条链。Zcash 的实现是 [Ragu](https://github.com/tachyon-zcash/ragu)，它遵循 Halo，且不需要可信设置。 |
| Peer-to-Peer Network | P2P 网络基于去中心化理念，是 blockchain 技术的基础架构。 |
| PIR (Private Information Retrieval) | 这类技术让你可以从服务器获取一条记录，而服务器无法得知你请求的是哪一条记录。它正作为 Zcash 的一种活跃研究方向，用于让轻钱包在检索所需内容时，不会泄露自己在查找什么。 |
| Podcast | [Radiolab（Zcash 仪式）](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| 术语 | 定义 |
|------|-----------|
| QR Code | 一种机器可读代码，用于编码 Zcash 地址，便于扫描。Unified Addresses（UA）通常会在现代 Zcash 钱包中通过二维码分享。 |
| Quantum Recoverability | [ZIP 2005](https://zips.z.cash/zip-2005) 中规定的 Ironwood notes 的一种属性：如果未来的量子计算机攻破了当今用于保护它的密码学，该属性仍可使某枚币的链上记录保持可恢复。它是一种恢复路径，而不是抗量子能力，并且适用于 Ironwood notes，不适用于现有的 Sprout、Sapling 或 Orchard 资金。 |

## R

| 术语 | 定义 |
|------|-----------|
| Recovery Phrase | 一组由 12 或 24 个字母和数字组成的序列，用于备份和恢复钱包。在 Zcash 中，这个短语会重新生成 spending key 和 viewing key，因此对资金恢复和安全至关重要。 |

## S

| 术语 | 定义 |
|------|-----------|
| Sapling | 一次重大网络升级，为受保护交易带来了显著的效率提升，并为移动端采用铺平了道路。于区块 419200 激活。 |
| Selective Disclosure | 允许受保护地址的所有者有选择地向第三方共享 viewing keys 或付款披露，同时对其他所有人保持数据私密。 |
| Shielded Address | 也称为 zaddr。以 z 开头。使用 zk-SNARKs 隐藏发送方、接收方、金额和 memo。 |
| Shielded Labs | 一个独立组织，致力于 Zcash 协议经济学和共识相关工作。目前主导 Crosslink 和 Network Sustainability Mechanism。[GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | 仅在受保护地址之间发生的交易。在 blockchain 上完全私密。 |
| Sol/s | 每秒解数（Solutions per second）——衡量 Equihash 挖矿性能。 |
| Spending Key | 允许从受保护地址花费资金的私钥（也可让你查看余额和历史记录）。 |
| Sprout | Zcash 最初的受保护协议版本（于 2016 年推出）。 |

## T

| 术语 | 定义 |
|------|-----------|
| Tachyon | Zcash 的扩容计划，目标指向 NU7。它让钱包从扫描每一个区块，转向采用带证明的钱包状态、oblivious synchronization 和可裁剪的节点状态，目标是将屏蔽交易吞吐量提升到每秒数千笔交易。[项目网站](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash（无价值的测试货币）。 |
| Testnet | 一个独立的 blockchain，用于在主网之前测试升级和功能。 |
| Trailing Finality Layer (TFL) | 关于在 Zcash 的工作量证明链之后增加一个终局性层的研究，从而无需替代挖矿就能让最近的区块获得最终确定性。Crosslink 就是由这项研究产生的设计方案。 |
| Transaction | 用户之间的一笔支付，被提交到网络中，并最终在某个区块中得到确认。 |
| Transaction Expiry | 如果交易未被确认，会在大约 25 分钟（20 个区块）后过期；资金会自动退回。 |
| Transaction Fee | 默认手续费为 0.0001 ZEC。更高手续费会获得优先处理；过低的手续费可能导致延迟或过期。 |
| Transparent Address | 也称为 taddr。以 t 开头。完全公开（类似 Bitcoin）。 |
| Transparent Transaction | 仅在透明地址之间发生的交易——所有内容都公开可见。 |
| Turnstile | 一项会追踪每个屏蔽池流入和流出价值的记账规则，因此任何池都不能释放出超过其流入的价值。它用于 Zcash 历史上的每一次池转换，目前正保障从 Orchard 迁移到 Ironwood 的过程。[更多信息](/zcash-tech/the-turnstile) |

## U

| 术语 | 定义 |
|------|-----------|
| Unified Address | 现代地址格式（在 NU5 中引入），可在同一个字符串中同时用于透明和受保护支付。 |
| Upgrade Activation | 网络升级（例如 NU5、NU6）自动激活的具体区块高度。 |

## V

| 术语 | 定义 |
|------|-----------|
| Viewing Key | 一种私钥，可让你查看受保护地址的余额和交易历史，而不能花费其中的资金。 |

## W

| 术语 | 定义 |
|------|-----------|
| Wallet | 用于存储私钥并让你发送/接收 ZEC 的软件或硬件。当前活跃的钱包包括 ZODL（iOS/Android）、Zingo!（移动端/桌面端）、Nighthawk（Android）、YWallet、Zallet（即将推出）和 Keystone（硬件）。完整列表见 [Zcash 生态钱包](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | 首个面向 Zcash 的 JavaScript SDK，由 ChainSafe 为浏览器环境构建。它是将 shielded ZEC 引入 MetaMask 的 Zcash Shielded Wallet snap 的底层基础。 |

## X

| 术语 | 定义 |
|------|-----------|
| XZC | Zcash 较早使用的 ticker symbol，一些旧交易所仍在使用。官方 ticker 是 ZEC。 |

## Y

| 术语 | 定义 |
|------|-----------|
| YWallet | 一款注重隐私的 Zcash 钱包，支持 Orchard、Sapling 和透明地址，并以同步速度快而闻名。现已不再维护：其开发者已确认不会为 Ironwood 进行更新，因此它已无法继续跟随网络。由同一开发者开发的 Zkool 是目前仍在维护的后继产品。 |

## Z

| 术语 | 定义 |
|------|-----------|
| Zcash | 以隐私为核心的加密货币，使用 zk-SNARKs。连接透明支付（Bitcoin 风格）与完全受保护支付。 |
| Zcash Foundation | 支持 Zcash 生态系统、资助开发并推动隐私保护的独立非营利组织。 |
| Zcash Network | 由节点组成的点对点网络，用于验证交易并维护 blockchain。 |
| ZEC | Zcash 的官方货币代码（部分交易所仍显示 XZC）。 |
| Zerocash | Zcash 所基于的学术协议（2014）。 |
| Zaino | 下一代 Zcash 索引器，用于替代 lightwalletd，由 Zcash Foundation 构建。它使轻客户端能够以更快且更私密的方式同步。属于 Zcash Z3 基础设施升级的一部分。 |
| Zakura | 于 2026 年 7 月发布的 Zcash 全节点实现，由 Valar Group 和 Project Tachyon 基于 Zebra 的分叉版本构建。它以吞吐量和同步速度为目标，具备快照引导功能，并明确以卡网络级别的规模为目标，约每秒 50,000 笔交易。 [zakura.com](https://zakura.com) |
| Zallet | 在 zcashd 退役后接管其钱包功能的钱包组件，基于 Zaino 构建，属于 Zcash Z3 基础设施工作的一部分。 |
| Zebra | Zcash Foundation 基于 Rust 的全节点实现（zcashd 的替代方案）。已可用于生产环境，并在持续积极维护。 [GitHub](https://github.com/ZcashFoundation/zebra) |
| zcashd | 最初的 Zcash 全节点，分叉自 Bitcoin Core。经过长期弃用后于 2026 年 7 月退役，其职责拆分为由 Zebra 负责共识、由 Zallet 负责钱包功能。 |
| ZIP | Zcash Improvement Proposal——社区用于提议和确认协议变更的治理流程。 [ZIP 仓库](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab。该独立组织由 Josh Swihart 与前 Electric Coin Company 工程团队于 2026 年初创立，他们因与 Bootstrap 的治理争议辞职后成立了该组织。其在 2026 年 3 月筹集了超过 2500 万美元的种子轮融资，并维护 Zodl 钱包；该钱包于 2026 年 2 月由 Zashi 更名而来。 [zodl.com](https://zodl.com) |
| zk-SNARKs | 零知识简洁非交互式知识论证——为 Zcash 受保护交易提供支持的密码学技术。它允许在不泄露任何秘密信息的情况下证明某个陈述（例如有效花费）。 |
| ZSA (Zcash Shielded Assets) | 用户发行的代币，继承了 Zcash 的受保护隐私特性，使 ZEC 以外的资产也能在网络上私密流转。规范定义见 [ZIP 226](https://zips.z.cash/zip-0226)，并且是 NU7 的候选功能之一。 |

---

**最后更新：** 2026 年 7 月
**想要参与贡献？** [在 GitHub 上编辑此页面](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
