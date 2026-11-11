<a href="https://github.com/zechub/zechub/edit/main/site/guides/ShapeShift_Zcash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ShapeShift 与 Zcash：隐私优先的去中心化交易

---

## 简介

隐私 [privacy] 和自托管是加密货币的基本原则，但许多用户仍依赖要求身份验证并持有用户资金的中心化交易所 [exchange]。ShapeShift 与 Zcash 的集成结合了一个完全去中心化的交易所平台与最先进的隐私保护加密货币之一，让用户能够交易 ZEC，而无需牺牲隐私或对其资产的控制权。

本文将解释 ShapeShift 是什么、Zcash 如何运作、如何在 ShapeShift 上兑换 [swap] ZEC，以及这一合作为何对私密去中心化金融的未来至关重要。

---

## 什么是 ShapeShift？

[ShapeShift](https://shapeshift.com/) 是一个去中心化、开源的加密货币平台，允许用户在多个区块链上交易、追踪和管理数字资产，而无需创建账户、提交身份证明文件或交出其资金的托管权。

### 简史

ShapeShift 最初由 Erik Voorhees 于 2014 年在瑞士创立，是一家中心化加密货币交易所。该平台凭借简洁的界面迅速受到欢迎，用户无需创建账户即可将一种加密货币兑换为另一种。

2021 年，ShapeShift 经历了一场彻底转型。该公司解散了企业架构，转变为由 **FOX 代币 [token]** 持有者治理的 **去中心化自治组织（DAO）**。作为此次转型的一部分，约 3.4 亿枚 FOX 代币空投给了超过 100 万名用户，使其成为加密货币历史上规模最大的空投之一。自此以后，有关该平台的所有重大决策均通过社区治理 [governance] 提案和投票作出。

### 主要特点

- **非托管**：用户直接通过自己的钱包 [wallet] 进行交易。ShapeShift 从不持有您的资金。
- **无需 KYC**：无需身份验证、无需创建账户，也不收集个人数据。
- **多链支持**：可访问 15+ 条区块链上的超过 10,000 种资产，包括 Bitcoin、Ethereum、Cosmos 和 Zcash。
- **DEX 聚合**：ShapeShift 通过 THORChain、0x 等去中心化协议路由交易，以寻找最优汇率。
- **跨链兑换**：无需使用封装代币或中心化桥 [bridge]，即可在不同区块链之间原生兑换资产。
- **完全开源**：整个平​​台（包括移动应用）均为开源，除 blockchain 数据外没有专有后端。

---

## Zcash 如何运作

[Zcash](https://z.cash/)（ZEC）是一种建立在强大密码学基础上的加密货币，使用户能够进行私密交易。Zcash 于 2016 年推出，是 Bitcoin 的一个分叉版本，在保留 Bitcoin 固定 2,100 万枚供应量和工作量证明共识 [consensus] 的同时，增加了先进的隐私技术。

### 屏蔽交易与零知识证明

Zcash 的核心创新在于使用 **零知识证明 [zero-knowledge proof]**（具体而言，是一种称为 **zk-SNARKs** 的形式）。这些密码学证明允许一方在不透露除陈述本身有效性以外任何信息的情况下，向另一方证明某项陈述为真。

在实践中，这意味着 Zcash 交易可以完全**屏蔽 [shielded]**：发送方地址 [address]、接收方地址和交易金额均在 blockchain 上加密 [encryption]。网络仍可验证交易有效（不存在双重支付、余额正确），而无需看到这些细节。

### 交易类型

Zcash 支持两种类型的地址：

- **透明地址 [transparent]**（t 地址）：其运作方式类似于 Bitcoin 地址，交易详情在 blockchain 上公开可见。
- **屏蔽地址**（z 地址）：使用零知识证明来保持交易详情私密。

用户可以在透明地址和屏蔽地址之间发送 ZEC。为实现最大隐私，从一个屏蔽地址发送到另一个屏蔽地址的交易不会公开透露任何信息。

### 统一地址

现代 Zcash 钱包，例如 [Zodl](https://zodl.com)，使用**统一地址**，将透明和屏蔽接收方合并为单一地址。这在默认提供最高可用隐私级别的同时，简化了用户体验。

### 隐私为何重要

金融隐私并非为了隐藏不当行为。它保护个人免受监控、企业数据收集和定向攻击。正如您不希望自己的银行账户余额向公众公开一样，加密货币交易也应享有同等程度的保密性。Zcash 通过设计实现了这一点。

---

## 如何在 ShapeShift 上兑换 ZEC

ShapeShift 平台允许用户通过完全去中心化的流程获取和交易 ZEC。具体运作如下。

### 第 1 步：访问 ShapeShift

在您的网页浏览器中前往 [app.shapeshift.com](https://app.shapeshift.com/)，或下载 ShapeShift 移动应用。无需创建账户或进行身份验证。

### 第 2 步：连接您的钱包

连接一个兼容的自托管钱包。ShapeShift 支持多种钱包，包括：

- **KeepKey**（硬件钱包）
- **MetaMask**
- **XDEFI / Ctrl Wallet**
- **Keplr**（适用于基于 Cosmos 的资产）
- **兼容 WalletConnect 的钱包**

由于您将兑换为或兑换出 ZEC，请确保已准备好兼容 Zcash 的钱包（例如 Zodl）来接收您的资金。

### 第 3 步：选择您的兑换交易对

使用兑换界面选择您想要交易出的资产（例如 BTC、ETH 或 ERC-20 代币），并将 ZEC 设为目标资产。ShapeShift 的界面采用简洁的 Uniswap 风格布局，为桌面端和移动端进行了优化。

### 第 4 步：输入金额并审核

输入您希望兑换的金额。ShapeShift 将通过可用的最佳去中心化协议（例如用于跨链兑换的 THORChain）路由交易，并显示预估汇率、手续费 [fee] 和输出金额。

### 第 5 步：确认并执行

审核交易详情并确认。兑换通过去中心化协议在链上 [on-chain] 执行。您的 ZEC 将发送至您指定的地址。没有任何中介会持有您的资金。

### 第 6 步：屏蔽您的 ZEC

当您的 ZEC 到账后，使用 Zcash 钱包的**屏蔽**功能（可在 Zodl 等钱包中使用）将资金转入屏蔽 pool。这可确保您的余额和未来交易保持完全私密。

### 支持的跨链交易对

ShapeShift 支持跨多个区块链生态系统的 ZEC 兑换，包括：

- **Bitcoin**（BTC）&lt;-&gt; ZEC
- **Ethereum**（ETH）&lt;-&gt; ZEC
- **Arbitrum** 资产 &lt;-&gt; ZEC
- **Cosmos** 生态系统代币 &lt;-&gt; ZEC

---

## 此集成为何重要

### 在 DeFi 中重获隐私

大多数去中心化交易所将隐私视为事后考虑。例如，基于 Ethereum 的 DEX 上的交易完全透明：任何人都可以追踪您的钱包历史、代币余额和交易模式。ShapeShift-Zcash 集成通过一个去中心化、无需 KYC 的平台提供对屏蔽 ZEC 的访问，挑战了这一惯例。

正如 ShapeShift 的增长和社区工作流负责人 Houston Morgan 所说：*"隐私不应该令人恐惧，但在中心化交易所交易 ZEC 往往令人恐惧。它们的结构和法律风险扼杀了真正的隐私。"*

### 从下架到默认选项

这段历史使此次集成更加重要。2020 年，当 ShapeShift 仍是一家中心化公司时，它在监管压力下**下架了隐私币**，其中包括 Zcash。转型为 DAO 架构使 ShapeShift 摆脱了这些限制。如今，作为一个由社区治理的协议，ShapeShift 不仅重新上线了 Zcash，还使其成为其隐私战略的核心部分。

随着 **ShapeShift v4.0** 于 2025 年 12 月发布，Zcash 成为该平台的**主要隐私保护支付 [payment] 和路由资产**。隐私现已成为默认功能，而非可选附加功能，ZEC 被直接集成到 ShapeShift 的钱包和路由堆栈中。

### Zcash Community Grants 支持

[Zcash Community Grants](https://zcashcommunitygrants.org/) 项目拨出 **$50,000**，以支持 ShapeShift 为 Zcash 集成开展的技术基础设施和营销工作。这笔资金帮助 ShapeShift 团队与 **Liquify** 合作；Liquify 是一家支持 90+ 条区块链的 Web3 基础设施提供商，负责处理远程过程调用（RPC）端点，以实现更快执行和更高网络可靠性。

### 推进去中心化金融

此次集成表明，隐私和去中心化可以在 DeFi 中协同运作。用户可以：

- **兑换**跨链资产，而无需中心化中介
- 在整个过程中**保持对其资金的完全自托管**
- 无需 KYC 或数据收集即可**访问屏蔽 ZEC**
- 通过 FOX 代币**参与治理**，塑造平台未来

随着全球监管环境收紧，例如欧盟等地区正在探索对隐私保护技术的限制，ShapeShift 等平台为金融隐私提供了重要的替代基础设施。

---

## 总结

| 功能 | 详情 |
|---|---|
| **平台** | ShapeShift DAO（去中心化、开源） |
| **治理** | FOX 代币持有者 |
| **Zcash 支持** | 完整的 ZEC 交易，支持屏蔽交易 |
| **需要 KYC** | 否 |
| **托管** | 非托管（用户保留自己的密钥） |
| **跨链兑换** | BTC、ETH、Arbitrum、Cosmos 等 |
| **基础设施** | 由 Liquify 提供支持（90+ blockchain RPC 支持） |
| **Zcash Community Grants 资金支持** | 用于技术和营销支持的 $50,000 |

ShapeShift 与 Zcash 的集成代表了去中心化金融中隐私的重要进展。通过将 ShapeShift 的非托管、多链交易基础设施与 Zcash 的零知识证明技术相结合，用户能够使用真正私密、无需许可 [permissionless] 的加密货币交易。对于重视金融隐私和自主权的任何人而言，此集成提供了一条实用、易用的路径，可在不作妥协的情况下使用 ZEC。

---

### 资源

[ShapeShift 平台](https://shapeshift.com/)

[Zcash 官方网站](https://z.cash/)

[Zodl 钱包](https://zodl.com)

[ShapeShift DAO 治理（FOX 代币）](https://web.archive.org/web/20210126180411/https://shapeshift.com/fox-token)

[Zcash Community Grants](https://zcashcommunitygrants.org/)

[ShapeShift 集成 Zcash 以增强链上隐私（crypto.news）](https://crypto.news/shapeshift-integrates-zcash-to-enable-true-onchain-privacy/)

[ShapeShift 发布 v4.0，在 DeFi 中重新聚焦隐私和自托管（Invezz）](https://invezz.com/news/2025/12/18/shapeshift-unveils-version-4-0-re-centering-privacy-and-self-custody-in-defi/)

[ShapeShift 推出对屏蔽 Zcash 交易的支持（Cointelegraph）](https://cointelegraph.com/news/shapeshift-rolls-out-support-for-shielded-zcash-transactions-for-true-privacy)
