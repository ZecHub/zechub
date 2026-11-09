<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash 屏蔽资产 [Shielded Assets]

## 简要说明

Zcash 屏蔽资产 (ZSA) 是一项拟议的协议扩展，可让**ZEC 以外的**资产——稳定币、治理代币或任何自定义资产——存在于 Zcash 的屏蔽池中，同时让发送方、接收方和金额保持私密。

- **它是什么：** 类似 ERC-20 的自定义资产，但默认受到屏蔽。
- **谁在构建它：** [QEDIT](https://qed-it.com/)，获得 Zcash Foundation 的拨款，并与 Electric Coin Company 合作。
- **如何规定：** [ZIP 226](https://zips.z.cash/zip-0226)（转移和销毁）以及 [ZIP 227](https://zips.z.cash/zip-0227)（发行）。
- **状态：** 尚未在主网上线，也不属于网络升级 7（NU7）。[ZIP 259](https://zips.z.cash/zip-0259) 列出了 NU7 部署的全部内容，其中不包括 ZIP 226 或 ZIP 227，且尚未设定任何 ZSA 激活日期。
- **手续费：** 无论转移何种资产，始终以 ZEC 支付。

---

## 核心说明

Zcash 屏蔽资产 (ZSA) 是对 Zcash 协议的一项拟议改进，可在 Zcash 链上创建、转移和销毁自定义资产。

如果您熟悉 Ethereum blockchain 上的 [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) 代币标准，那么 ZSA 对于 Zcash 的意义，就如同 ERC-20 代币对于 Ethereum。

Zcash 屏蔽资产可在 Zcash blockchain 上创建自定义代币，从而使 [ZEC](/guides/using-zec-privately) 以外的代币也能受益于 Zcash blockchain 上屏蔽交易的匿名性和隐私。

ZSA 的一个主要潜在用途是在 Zcash 协议上发行稳定币。稳定币是将其价值锚定于法定货币（如美元或欧元）的加密货币。目前，流通最广的一些稳定币是 ERC-20 代币，例如 [USDC](https://www.circle.com/en/usdc) 和 [Dai](https://docs.makerdao.com/)。

ZSA 的另一项潜在用途是发行治理代币。例如，ZecHub（本 wiki 的发布者）是一个去中心化自治组织 (DAO)，可以创建 ZSA 并向其成员发行，用于就提案和治理决策进行投票。

ZSA 由 [QEDIT](https://qed-it.com/) 开发，获得 [Zcash Foundation](/zcash-organizations/zcash-foundation) 的大额拨款，并与 [Electric Coin Company](/zcash-organizations/electric-coin-company) 合作。由于该项目仍在积极开发中，更新发布在 [此讨论帖](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) 的 Zcash 论坛上。QEDIT 提交的 [ZSA 拨款申请](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) 可从 Zcash Foundation 拨款网站获取。

---

## 视觉化类比

### 密封信封

设想一笔 Zcash 屏蔽交易就像投入公共邮箱的朴素密封信封。任何人都能看到有一个信封被寄出。没有人能看到是谁寄出、谁收取或里面有什么——而且每个信封看起来都与其他信封完全相同。

如今，Zcash 网络上的信封只能装载一种东西：ZEC。

ZSA 不会改变信封。它改变的是**信封内允许装载的内容**。有了 ZSA 后，同一个密封信封可以装载稳定币、DAO 治理代币或公司的忠诚度积分——从外部看，它仍会与网络上的所有其他信封完全相同。

有一个细节值得牢记：**无论信封内装了什么，邮资始终以 ZEC 支付**。

### 外部观察者能看到什么

| 观察者能看到…… | Ethereum 上的 ERC-20 | Zcash 上的 ZSA |
| --- | --- | --- |
| 谁发送了它 | 公开 | 屏蔽 |
| 谁接收了它 | 公开 | 屏蔽 |
| 转移了多少 | 公开 | 屏蔽 |
| 个人余额 | 公开 | 屏蔽 |
| 资产总供应量 | 公开 | **公开——有意如此** |
| 支付手续费的货币 | ETH | ZEC |

### 为什么供应量这一行不是漏洞

表格底部两行正是 ZSA 引人注目的地方。

ZIP 227 有意保持**发行透明**，以便每种资产的流通供应量都可以在链上追踪。个人持有量和个人支付保持私密；现存代币总数则不保持私密。

对于稳定币发行方而言，这种组合正是重点，而非妥协。储备可根据可公开验证的供应量接受审计，而实际使用该代币的人则可自行保有其余额和支付的隐私。

### 一种资产，一个身份

每种资产都会获得一个唯一的**资产标识符**，它由发行方的发行密钥和资产的文本描述共同派生。两个不同的发行方无法生成相同的标识符，且铸造资产或更改资产都需要发行方的加密授权。用信封来比喻：任何人都能寄出信封，但只有拥有某项资产的铸币厂能够印制更多该资产。

---

## 深入了解

### Zebra 上的 ZSA 演示

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**亲自运行演示！**

克隆 zcash-tx-tool 仓库：[https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Zcash 改进提案 (ZIP)

- [ZIP 226](https://zips.z.cash/zip-0226)：Zcash 屏蔽资产的转移和销毁
- [ZIP 227](https://zips.z.cash/zip-0227)：Zcash 屏蔽资产的发行
- [ZIP 230](https://zips.z.cash/zip-0230)：版本 6 交易格式

> **关于 ZIP 230 的说明：** ZIP 230 此后已被撤回，且不会部署。交易版本 6 现由 [ZIP 229](https://zips.z.cash/zip-0229) 定义。请参阅 [ZIP 230](https://zips.z.cash/zip-0230) 页面顶部的通知。

ZIP 226 定义了 OrchardZSA 协议——Orchard 协议的一个扩展，用于承载自定义资产的转移和销毁。ZIP 227 定义了这些资产最初的创建方式，并且只能与 ZIP 226 一起实施。

### ZSA 拨款提案

屏蔽资产 (ZSA/UDA) 的 ZSA 提案由 [QEDIT](https://qed-it.com/) 团队提出，旨在 Zcash blockchain 上构建通用屏蔽资产。这些资产通常称为用户定义资产 (UDA) 或 Zcash 屏蔽资产 (ZSA)。

通过这项提案，[QEDIT](https://qed-it.com/) 的团队计划将 DeFi 引入 Zcash 生态系统，同时使现有 DeFi 生态系统能够使用最佳的隐私技术。在一项投票调查中，该团队提问，社区回答说 [通用屏蔽资产 (ZSA/UDA) 是目前最受请求的功能](https://twitter.com/BenarrochDaniel/status/1428327864034791429)。

这些提案在技术上遵循 [Zcash 改进提案 (ZIP)](https://zips.z.cash/zip-0000) 规范，并在 ZIP 226 和 ZIP 227 中定义。

1. [ZIP 226](https://zips.z.cash/zip-0226)：Zcash 屏蔽资产的转移和销毁
2. [ZIP 227](https://zips.z.cash/zip-0227)：Zcash 屏蔽资产的发行

---

## 实际影响

**如果您持有或使用 ZEC**

- ZSA 被定义为 Orchard（"OrchardZSA"）的扩展，因此会共享 ZEC 已使用的屏蔽机制。您的钱包需要明确支持 ZSA，才能持有或发送它们。
- 您始终需要持有一些 ZEC。发行和转移 ZSA 的手续费以 ZEC 支付，而不是以该资产本身支付。
- 您现有的 ZEC 交易不会发生任何变化。

**如果您是潜在发行方——稳定币、DAO 或公司**

- 发行资产需要与发行密钥关联的加密授权，因此只有您能够铸造或更改您自身资产的属性。
- 您资产的流通供应量可公开审计，而用户的余额和转移则不可公开审计。对于受监管的发行方而言，这通常正是所需的组合。
- 一笔发行交易可以同时创建多种资产。

**对于生态系统**

- 由于每笔 ZSA 手续费都以 ZEC 计价，未来在 Zcash 上发行的任何资产活动都会为 ZEC 本身创造需求。

---

## 常见误解

| 常见看法 | 实际情况 |
| --- | --- |
| "ZSA 今天已在 Zcash 上线。" | 并非如此。ZSA 不属于网络升级 7（NU7），该升级由 [ZIP 259](https://zips.z.cash/zip-0259) 定义且不包括 ZIP 226 或 ZIP 227，并且仍在审查和测试中。 |
| "ZSA 将智能合约带到 Zcash。" | ZSA 规定了资产的发行、转移和销毁。它不是通用的可编程合约层。 |
| "您可以用 ZSA 代币本身支付 ZSA 手续费。" | 手续费以 ZEC 支付。 |
| "如果它受到屏蔽，代币供应量也一定是秘密。" | ZIP 227 有意使发行透明，因此可以公开追踪每种资产的供应量。余额和转移保持私密；供应量则不保持私密。 |
| "ZIP 230 是当前的版本 6 交易格式。" | ZIP 230 已被撤回。版本 6 现由 ZIP 229 定义。 |

---

## 相关页面

- [Halo](/zcash-tech/halo) —— Orchard 背后的证明系统，ZSA 扩展的协议
- [zk-SNARKs](/zcash-tech/zk-snarks) —— 使屏蔽转移能够在不披露的情况下得到验证的零知识证明
- [屏蔽池](/using-zcash/shielded-pools) —— ZSA 将与 ZEC 一同存在的地方
- [交易](/using-zcash/transactions) —— Zcash 交易的构成方式
- [Zebra 全节点](/zcash-tech/zebra-full-node) —— 上述 ZSA 演示中使用的节点实现
