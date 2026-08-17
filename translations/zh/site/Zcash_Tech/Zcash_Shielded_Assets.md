<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash 屏蔽资产

## TL;DR

Zcash 屏蔽资产（ZSA）是一项提议中的协议扩展，它将允许 **除 ZEC 之外** 的资产——稳定币、治理代币或任何自定义资产——存在于 Zcash 的屏蔽池中，同时对发送者、接收者和金额进行隐私保护。

- **它是什么：** 类似 ERC-20 风格的自定义资产，但默认是屏蔽的。
- **谁在构建它：** [QEDIT](https://qed-it.com/)，在 Zcash Foundation 的资助下，与 Electric Coin Company 合作开发。
- **它如何被规范：** [ZIP 226](https://zips.z.cash/zip-0226)（转账与销毁）与 [ZIP 227](https://zips.z.cash/zip-0227)（发行）共同构成。
- **状态：** 尚未在主网上线。ZSA 协议计划在 Network Upgrade 7（NU7）中部署。
- **费用：** 始终以 ZEC 支付，无论转移的是哪种资产。

---

## 核心说明

Zcash 屏蔽资产（ZSA）是对 Zcash 协议的一项提议改进，将使用户能够在 Zcash 链上创建、转移和销毁自定义资产。

如果你熟悉 Ethereum blockchain 上的 [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) 代币标准，那么 ZSA 对于 Zcash 的意义，就如同 ERC-20 代币对于 Ethereum 一样。

Zcash 屏蔽资产将支持在 Zcash blockchain 上创建自定义代币，从而使 [ZEC](/guides/using-zec-privately) 之外的代币也能受益于 Zcash blockchain 上屏蔽交易所提供的匿名性和隐私性。

ZSA 的一个重要潜在用途，是在 Zcash 协议上发行稳定币。稳定币是一类将其价值锚定到法定货币（如美元或欧元）的加密货币。目前，一些流通最广的稳定币是 ERC-20 代币，例如 [USDC](https://www.circle.com/en/usdc) 和 [Dai](https://docs.makerdao.com/)。

ZSA 的另一个潜在用途，是发行治理代币。例如，Zechub（本 wiki 的发布者）是一个去中心化自治组织（DAO），它可以创建并向其成员发行一种 ZSA，用于对提案和治理决策进行投票。

ZSA 由 [QEDIT](https://qed-it.com/) 开发，在 [Zcash Foundation](/zcash-organizations/zcash-foundation) 的一项重大资助下，与 [Electric Coin Company](/zcash-organizations/electric-coin-company) 合作推进。由于该项目仍在积极开发中，更新内容会发布在 Zcash 论坛上的[这个帖子](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153)中。QEDIT 提交的 [ZSA 资助申请](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/)可在 Zcash Foundation 的资助网站上查看。

---

## 可视化 / 类比

### 密封信封

可以把一笔 Zcash 屏蔽交易想象成一个普通的密封信封，被投进一个公开的邮箱。任何人都能看到有一个信封被寄出了。但没有人能看到是谁寄出的、谁会收到它，或里面装了什么——而且每个信封看起来都和其他所有信封完全一样。

如今，Zcash 网络上的一个信封只能装一种东西：ZEC。

ZSA 不会改变这个信封。它改变的是 **信封里允许装什么**。在 ZSA 之后，同样的密封信封可以装稳定币、DAO 治理代币，或者公司的忠诚积分——而从外面看，它仍然与网络上的其他所有信封完全一样。

有一个细节值得牢记：**邮资始终用 ZEC 支付**，无论信封里装的是什么。

### 外部观察者能看到什么

| 观察者可以看到…… | Ethereum 上的 ERC-20 | Zcash 上的 ZSA |
| --- | --- | --- |
| 谁发送了它 | 公开 | 屏蔽 |
| 谁接收了它 | 公开 | 屏蔽 |
| 转移了多少 | 公开 | 屏蔽 |
| 各个账户余额 | 公开 | 屏蔽 |
| 资产的总供应量 | 公开 | **公开——这是有意设计的** |
| 手续费用什么货币支付 | ETH | ZEC |

### 为什么供应量这一行不是 bug

表格的最后两行，正是 ZSA 变得有趣的地方。

ZIP 227 有意保持 **发行透明**，这样每种资产的流通供应量都可以在链上被追踪。个人持有量和个人支付保持私密；但现存代币总数并不保密。

对于稳定币发行方来说，这种组合恰恰是重点，而不是妥协。储备金可以对照一个可公开验证的供应量进行审计，而实际使用该代币的人则可以保有自己的余额和支付隐私。

### 一种资产，一个身份

每种资产都会获得一个唯一的 **Asset Identifier**，它由发行者的发行密钥和该资产的文本描述共同派生而来。两个不同的发行者不可能生成相同的标识符，而铸造或更改资产则需要来自其发行者的密码学授权。用信封来比喻：任何人都可以寄出一个信封，但只有拥有某种资产的铸币方才能印制更多这种资产。

---

## 深入解析

### Zebra 上的 ZSA 演示

[![视频缩略图](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**亲自运行这个演示吧！**

克隆 zcash-tx-tool 仓库：<https://github.com/QED-it/zcash_tx_tool>

### Zcash 改进提案（ZIPs）

- [ZIP 226](https://zips.z.cash/zip-0226)：Zcash 屏蔽资产的转账与销毁
- [ZIP 227](https://zips.z.cash/zip-0227)：Zcash 屏蔽资产的发行
- [ZIP 230](https://zips.z.cash/zip-0230)：版本 6 交易格式

> **关于 ZIP 230 的说明：** ZIP 230 此后已被撤回，不会被部署。交易版本 6 现由 [ZIP 229](https://zips.z.cash/zip-0229) 定义。请参见 [ZIP 230](https://zips.z.cash/zip-0230) 页面顶部的通知。

ZIP 226 定义了 OrchardZSA 协议——这是 Orchard 协议的一个扩展，用于承载自定义资产的转账和销毁。ZIP 227 则定义了这些资产最初是如何被创建的，并且只能与 ZIP 226 一同实现。

### ZSA 资助提案

屏蔽资产（ZSA/UDA）的 ZSA 提案由 [QEDIT](https://qed-it.com/) 团队提出，旨在 Zcash blockchain 上构建通用的屏蔽资产。这些资产通常被称为用户定义资产（UDA）或 Zcash 屏蔽资产（ZSA）。

通过这项提案，[QEDIT](https://qed-it.com/) 团队计划将 DeFi 带入 Zcash 生态，同时也让现有 DeFi 生态能够使用最优秀的隐私技术。在一项投票调查中，该团队提出问题，而社区的回答是：[通用屏蔽资产（ZSA/UDA）是当前最受期待的功能](https://twitter.com/BenarrochDaniel/status/1428327864034791429)。

这些提案在技术上遵循 [Zcash 改进提案（ZIP）](https://zips.z.cash/zip-0000) 规范，并定义于 ZIP 226 和 ZIP 227 中。

1. [ZIP 226](https://zips.z.cash/zip-0226)：Zcash 屏蔽资产的转账与销毁
2. [ZIP 227](https://zips.z.cash/zip-0227)：Zcash 屏蔽资产的发行

---

## 实际影响

**如果你持有或使用 ZEC**

- ZSA 被定义为 Orchard 的扩展（“OrchardZSA”），因此它们将共享 ZEC 已经使用的屏蔽机制。你的 wallet 需要明确支持 ZSA，才能持有或发送它们。
- 你始终需要手头保留一些 ZEC。发行和转移 ZSA 的手续费以 ZEC 支付，而不是用资产本身支付。
- 你现有的 ZEC 交易不会发生任何变化。

**如果你是潜在发行方——稳定币、DAO、公司**

- 发行一种资产需要与发行密钥绑定的密码学授权，因此只有你才能铸造或更改你自己资产的属性。
- 你的资产流通供应量可以被公开审计，而你的用户余额和转账则不会。对于受监管的发行方来说，这通常正是所需要的组合。
- 单笔发行交易可以一次创建多种资产。

**对整个生态而言**

- 因为每一笔 ZSA 手续费都以 ZEC 计价，所以未来在 Zcash 上发行的任何资产所产生的活动，都会为 ZEC 本身创造需求。

---

## 常见误解

| 常见说法 | 实际情况 |
| --- | --- |
| “ZSA 今天已经在 Zcash 上线了。” | 并没有。ZSA 计划在 Network Upgrade 7（NU7）中部署，目前仍在审查和测试中。 |
| “ZSA 会把智能合约带到 Zcash。” | ZSA 规定的是资产的发行、转移和销毁。它不是一个通用可编程合约层。 |
| “你可以用 ZSA 代币本身支付 ZSA 手续费。” | 手续费以 ZEC 支付。 |
| “如果它是屏蔽的，那代币供应量也一定是保密的。” | ZIP 227 出于设计目的让发行保持透明，因此每种资产的供应量都可以被公开追踪。余额和转账保持私密；供应量则不会。 |
| “ZIP 230 是当前的版本 6 交易格式。” | ZIP 230 已被撤回。版本 6 现由 ZIP 229 定义。 |

---

## 相关页面

- [Halo](/zcash-tech/halo) —— Orchard 背后的证明系统，也是 ZSA 所扩展的协议
- [Zk-SNARKs](/zcash-tech/zk-snarks) —— 零知识证明，使得屏蔽转账可以在不被公开的情况下得到验证
- [屏蔽池](/using-zcash/shielded-pools) —— ZSA 将与 ZEC 一同存在的地方
- [交易](/using-zcash/transactions) —— 一笔 Zcash 交易是如何构成的
- [Zebra 全节点](/zcash-tech/zebra-full-node) —— 上述 ZSA 演示中使用的节点实现
