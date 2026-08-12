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
| ECC | Electric Coin Company，即 Zcash 协议背后的团队，此前名为 Zcash Company。 |
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
| Nighthawk | 一款用于 Zcash 的移动钱包。 [网站](https://nighthawkwallet.com) |
| NU5 | Zcash 的第 6 次重大网络升级，引入了 Orchard shielded pool 和 Unified Addresses。 [更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcash 的第 7 次重大网络升级，调整了区块补贴，用于资助 Zcash Community Grants 项目和 Shielded Labs。于 2024 年底激活。 [更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | 即将到来的 Zcash 第 8 次重大网络升级。社区情绪调查已于 2026 年通过 ZODL 开放。预计将包含进一步的受保护池改进和治理更新。 [论坛讨论](https://forum.zcashcommunity.com/t/nu7-sentiment-polling-questions-for-community-review-coinholder-voting-via-zodl/55713) |

## O

| 术语 | 定义 |
|------|-----------|
| Orchard Shielded Pool | Zcash 的第三个受保护池，代表了我们 zk-SNARK 技术栈的持续演进。 [完整详情](https://electriccoin.co/blog/explaining-halo-2/) |
| Overwinter | Zcash 的第 1 次网络升级。 [更多信息](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| 术语 | 定义 |
|------|-----------|
| Payments | 可以通过多种不同的支付提供商在日常购买中使用 Zcash。 [支付应用](https://z.cash/pay-with-zcash/) |
| Peer-to-Peer Network | P2P 网络基于去中心化理念，是 blockchain 技术的基础架构。 |
| Podcast | [Radiolab（Zcash 仪式）](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| 术语 | 定义 |
|------|-----------|
| QR Code | 一种机器可读代码，用于编码 Zcash 地址，便于扫描。Unified Addresses（UA）通常会在现代 Zcash 钱包中通过二维码分享。 |

## R

| 术语 | 定义 |
|------|-----------|
| Recovery Phrase | 一组由 12 或 24 个字母和数字组成的序列，用于备份和恢复钱包。在 Zcash 中，这个短语会重新生成 spending key 和 viewing key，因此对资金恢复和安全至关重要。 |

## S

| 术语 | 定义 |
|------|-----------|
| Sapling | 一次重大网络升级，为受保护交易带来了显著的效率提升，并为移动端采用铺平了道路。于区块 419200 激活。 |
| Selective Disclosure | 允许受保护地址的所有者有选择地向第三方共享 viewing key 或付款披露，同时对其他所有人保持数据私密。 |
| Shielded Address | 也称为 zaddr。以 z 开头。使用 zk-SNARKs 隐藏发送方、接收方、金额和 memo。 |
| Shielded Transaction | 仅在受保护地址之间发生的交易。在 blockchain 上完全私密。 |
| Sol/s | 每秒解数（Solutions per second）——衡量 Equihash 挖矿性能。 |
| Spending Key | 允许从受保护地址花费资金的私钥（也可让你查看余额和历史记录）。 |
| Sprout | Zcash 最初的受保护协议版本（于 2016 年推出）。 |

## T

| 术语 | 定义 |
|------|-----------|
| TAZ | Testnet Zcash（无价值的测试货币）。 |
| Testnet | 一个独立的 blockchain，用于在主网之前测试升级和功能。 |
| Transaction | 用户之间的一笔支付，被提交到网络中，并最终在某个区块中得到确认。 |
| Transaction Expiry | 如果交易未被确认，会在大约 25 分钟（20 个区块）后过期；资金会自动退回。 |
| Transaction Fee | 默认手续费为 0.0001 ZEC。更高手续费会获得优先处理；过低的手续费可能导致延迟或过期。 |
| Transparent Address | 也称为 taddr。以 t 开头。完全公开（类似 Bitcoin）。 |
| Transparent Transaction | 仅在透明地址之间发生的交易——所有内容都公开可见。 |

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

## X

| 术语 | 定义 |
|------|-----------|
| XZC | Zcash 较早使用的 ticker symbol，一些旧交易所仍在使用。官方 ticker 是 ZEC。 |

## Y

| 术语 | 定义 |
|------|-----------|
| YWallet | 一款高性能、注重隐私的 Zcash 钱包，支持 Orchard、Sapling 和透明地址。以同步速度快而闻名。提供 iOS 和 Android 版本。 [YWallet](https://ywallet.app) |

## Z

| 术语 | 定义 |
|------|-----------|
| Zcash | 以隐私为核心的加密货币，使用 zk-SNARKs。连接透明支付（Bitcoin 风格）与完全受保护支付。 |
| Zcash Foundation | 支持 Zcash 生态系统、资助开发并推动隐私保护的独立非营利组织。 |
| Zcash Network | 由节点组成的点对点网络，用于验证交易并维护 blockchain。 |
| ZEC | Zcash 的官方货币代码（部分交易所仍显示 XZC）。 |
| Zerocash | Zcash 所基于的学术协议（2014）。 |
| Zaino | 下一代 Zcash 索引器，用于替代 lightwalletd，由 Zcash Foundation 构建。它使轻客户端能够以更快且更私密的方式同步。属于 Zcash Z3 基础设施升级的一部分。 |
| Zallet | 由 Electric Coin Co / ZODL 团队打造的即将推出的官方 Zcash 钱包，构建于 Zaino 之上。截至 2026 年，Zallet Alpha 正在积极开发中。 [论坛](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965) |
| Zebra | Zcash Foundation 基于 Rust 的全节点实现（zcashd 的替代方案）。已可用于生产环境，并在持续积极维护。 [GitHub](https://github.com/ZcashFoundation/zebra) |
| ZIP | Zcash Improvement Proposal——社区用于提议和确认协议变更的治理流程。 [ZIP 仓库](https://github.com/zcash/zips) |
| ZODL | Electric Coin Company 消费者产品的新品牌名称，包括 ZODL 钱包应用（此前称为 ECC Wallet）以及用于 Coinholder 投票的 ZODL 治理平台。 [zodl.com](https://zodl.com) |
| zk-SNARKs | 零知识简洁非交互式知识论证——为 Zcash 受保护交易提供支持的密码学技术。它允许在不泄露任何秘密信息的情况下证明某个陈述（例如有效花费）。 |

---

**最后更新：** 2026 年 7 月
**想要参与贡献？** [在 GitHub 上编辑此页面](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
