<a href="https://github.com/zechub/zechub/edit/main/site/guides/ShapeShift_Zcash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# ShapeShift 与 Zcash：隐私优先的去中心化交易

---

## 简介

隐私和自托管是加密货币的基础原则，但许多用户仍然依赖需要身份验证并托管用户资金的中心化交易所。ShapeShift 与 Zcash 的集成，将一个完全去中心化的交易平台与最先进的隐私保护型加密货币之一结合起来，使用户能够在不牺牲隐私或资产控制权的情况下交易 ZEC。

本文将解释 ShapeShift 是什么、Zcash 如何运作、你如何在 ShapeShift 上兑换 ZEC，以及这一合作为何对私密化、去中心化金融的未来至关重要。

---

## 什么是 ShapeShift？

[ShapeShift](https://shapeshift.com/) 是一个去中心化、开源的加密货币平台，允许用户在多个区块链之间交易、追踪和管理数字资产，而无需创建账户、提交身份证明文件，或将资金托管给第三方。

### 简史

ShapeShift 最初由 Erik Voorhees 于 2014 年创立，是一家总部位于瑞士的中心化加密货币交易所。该平台因其简洁的界面而迅速走红，用户无需创建账户即可将一种加密货币兑换为另一种。

2021 年，ShapeShift 经历了彻底转型。公司解散了企业结构，转型为由 **FOX token** 持有者治理的 **Decentralized Autonomous Organization (DAO)**。作为这一转型的一部分，约 3.4 亿枚 FOX tokens 空投给了超过 100 万用户，成为加密历史上规模最大的空投之一。从那时起，平台所有重大决策都通过社区治理提案和投票做出。

### 主要特点

- **非托管**：用户直接从自己的钱包进行交易。ShapeShift 从不持有你的资金。
- **无需 KYC**：无需身份验证、无需创建账户，也不收集个人数据。
- **多链支持**：可访问 15+ 条区块链上的 10,000 多种资产，包括 Bitcoin、Ethereum、Cosmos 和 Zcash。
- **DEX 聚合**：ShapeShift 通过 THORChain、0x 等去中心化协议路由交易，以寻找最优汇率。
- **跨链兑换**：可在不同区块链之间原生兑换资产，无需使用封装代币或中心化桥接。
- **完全开源**：整个平台（包括移动应用）均为开源，除区块链数据外没有专有后端。

---

## Zcash 如何运作

[Zcash](https://z.cash/) (ZEC) 是一种建立在强大密码学基础之上的加密货币，赋予用户进行私密交易的能力。Zcash 于 2016 年推出，是 Bitcoin 的一个分叉，在保留 Bitcoin 2100 万枚固定供应量和工作量证明共识机制的同时，加入了先进的隐私技术。

### 屏蔽交易与零知识证明

Zcash 的核心创新在于使用 **零知识证明**（具体来说，是一种称为 **zk-SNARKs** 的形式）。这类密码学证明允许一方向另一方证明某个陈述为真，而无需披露除该陈述真实性之外的任何信息。

在实际应用中，这意味着 Zcash 交易可以完全**屏蔽**：发送方地址、接收方地址和交易金额都会在区块链上被加密。网络仍然可以验证交易有效性（无双重支付、余额正确），而无需看到这些细节。

### 交易类型

Zcash 支持两种地址类型：

- **透明地址**（t-addresses）：其工作方式类似 Bitcoin 地址，交易细节在区块链上公开可见。
- **屏蔽地址**（z-addresses）：使用零知识证明来保护交易细节隐私。

用户可以在透明地址和屏蔽地址之间发送 ZEC。为了获得最大隐私性，从一个屏蔽地址发送到另一个屏蔽地址的交易不会公开泄露任何信息。

### Unified Addresses

像 [Zashi](https://electriccoin.co/zashi/) 这样的现代 Zcash 钱包使用 **Unified Addresses**，将透明接收器和屏蔽接收器组合到一个地址中。这简化了用户体验，同时默认采用可用的最高隐私级别。

### 为什么隐私很重要

金融隐私并不意味着掩盖不当行为。它保护个人免受监控、企业数据攫取和定向攻击。正如你不会希望自己的银行账户余额对公众可见一样，加密货币交易也应享有同等程度的保密性。Zcash 从设计上就提供了这一点。

---

## 如何在 ShapeShift 上兑换 ZEC

ShapeShift 平台允许用户通过完全去中心化的流程获取和交易 ZEC。具体如下。

### 第 1 步：访问 ShapeShift

在你的网页浏览器中打开 [app.shapeshift.com](https://app.shapeshift.com/)，或下载 ShapeShift 移动应用。无需创建账户或进行身份验证。

### 第 2 步：连接你的钱包

连接一个兼容的自托管钱包。ShapeShift 支持多种钱包，包括：

- **KeepKey**（硬件钱包）
- **MetaMask**
- **XDEFI / Ctrl Wallet**
- **Keplr**（适用于基于 Cosmos 的资产）
- **兼容 WalletConnect 的钱包**

由于你要兑换到或从 ZEC 兑换，请确保你已准备好一个兼容 Zcash 的钱包（例如 Zashi）来接收资金。

### 第 3 步：选择你的兑换交易对

使用兑换界面选择你想卖出的资产（例如 BTC、ETH 或 ERC-20 token），并将 ZEC 设为目标资产。ShapeShift 的界面采用简洁的、类似 Uniswap 的布局，并针对桌面端和移动端进行了优化。

### 第 4 步：输入金额并查看详情

输入你希望兑换的金额。ShapeShift 将通过最佳可用的去中心化协议（例如用于跨链兑换的 THORChain）来路由交易，并显示预估汇率、手续费和输出金额。

### 第 5 步：确认并执行

查看交易详情并确认。兑换将通过去中心化协议在链上执行。你的 ZEC 将发送到你指定的地址。任何中介都不会持有你的资金。

### 第 6 步：屏蔽你的 ZEC

当你的 ZEC 到账后，使用你的 Zcash 钱包中的 **shield** 功能（可在 Zashi 等钱包中使用）将资金转入屏蔽池。这样可以确保你的余额和后续交易保持完全私密。

### 支持的跨链交易对

ShapeShift 支持 ZEC 在多个区块链生态之间兑换，包括：

- **Bitcoin** (BTC) &lt;-&gt; ZEC
- **Ethereum** (ETH) &lt;-&gt; ZEC
- **Arbitrum** 资产 &lt;-&gt; ZEC
- **Cosmos** 生态 token &lt;-&gt; ZEC

---

## 为什么这一集成很重要

### 在 DeFi 中重新夺回隐私

大多数去中心化交易所都将隐私视为次要考虑。例如，基于 Ethereum 的 DEX 上的交易是完全透明的：任何人都可以追踪你的钱包历史、token 余额和交易模式。ShapeShift-Zcash 集成通过一个去中心化、无需 KYC 的平台提供对屏蔽 ZEC 的访问，挑战了这种常态。

正如 ShapeShift 增长与社区工作流负责人 Houston Morgan 所说：*"Privacy shouldn't be scary, but trading ZEC on centralized exchanges often is. Their very structure and legal risk kill true privacy."*

### 从下架到默认支持

这段历史使这次集成更具意义。2020 年，当 ShapeShift 还是一家中心化公司时，它在监管压力下**下架了隐私币**，其中包括 Zcash。转型为 DAO 结构后，ShapeShift 摆脱了这些限制。如今，作为一个由社区治理的协议，ShapeShift 不仅重新上线了 Zcash，还将其作为自身隐私战略的核心组成部分。

随着 **ShapeShift v4.0** 于 2025 年 12 月发布，Zcash 成为该平台**主要的隐私保护型支付与路由资产**。隐私如今被定位为默认功能，而非可选附加项，ZEC 已直接集成到 ShapeShift 的钱包和路由堆栈中。

### Zcash Community Grants 支持

[Zcash Community Grants](https://zcashcommunitygrants.org/) 项目拨款 **$50,000**，以支持 ShapeShift 为集成 Zcash 所进行的技术基础设施建设和市场推广工作。这笔资金帮助 ShapeShift 团队与 **Liquify** 合作。Liquify 是一家支持 90+ 条区块链的 Web3 基础设施提供商，负责提供远程过程调用（RPC）端点，以实现更快执行和更高的网络可靠性。

### 推动去中心化金融发展

这一集成表明，隐私和去中心化可以在 DeFi 中协同运作。用户可以：

- **跨链兑换**资产，无需中心化中介
- **在整个过程中保持对资金的完全自托管**
- **在无需 KYC 或数据收集的情况下访问屏蔽 ZEC**
- **通过 FOX token 参与治理**，共同塑造平台未来

随着全球监管环境日趋收紧，尤其是欧盟等地区正在探索对隐私保护技术的限制，像 ShapeShift 这样的平台为金融隐私提供了重要的替代性基础设施。

---

## 总结

| 功能 | 详情 |
|---|---|
| **平台** | ShapeShift DAO（去中心化、开源） |
| **治理** | FOX token 持有者 |
| **Zcash 支持** | 完整的 ZEC 交易，支持屏蔽交易 |
| **是否需要 KYC** | 否 |
| **托管方式** | 非托管（用户自行保管私钥） |
| **跨链兑换** | BTC、ETH、Arbitrum、Cosmos 等 |
| **基础设施** | 由 Liquify 提供支持（90+ 条区块链 RPC 支持） |
| **Zcash Community Grants 资助** | $50,000，用于技术和市场支持 |

ShapeShift 与 Zcash 的集成代表了去中心化金融隐私向前迈出的重要一步。通过将 ShapeShift 的非托管、多链交易基础设施与 Zcash 的零知识证明技术结合，用户得以接触真正私密、无需许可的加密货币交易。对于任何重视金融隐私和自主权的人来说，这一集成为使用 ZEC 提供了一条实用、易用且无需妥协的路径。

---

### 资源

[ShapeShift 平台](https://shapeshift.com/)

[Zcash 官方网站](https://z.cash/)

[Zashi 钱包（由 Electric Coin Co. 推出）](https://electriccoin.co/zashi/)

[ShapeShift DAO 治理（FOX Token）](https://shapeshift.com/fox-token)

[Zcash Community Grants](https://zcashcommunitygrants.org/)

[ShapeShift 集成 Zcash 以增强链上隐私（crypto.news）](https://crypto.news/shapeshift-integrates-zcash-to-enable-true-onchain-privacy/)

[ShapeShift 发布 v4.0，重新将隐私与自托管置于 DeFi 核心（Invezz）](https://invezz.com/news/2025/12/18/shapeshift-unveils-version-4-0-re-centering-privacy-and-self-custody-in-defi/)

[ShapeShift 推出对屏蔽 Zcash 交易的支持，实现真正隐私（CoinTelegraph）](https://cointelegraph.com/news/shapeshift-rolls-out-support-for-shielded-zcash-transactions-for-true-privacy)
