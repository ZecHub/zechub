<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 什么是 Zcash TEX 地址？

## TL;DR

* TEX 地址是以不同格式写成的透明 Zcash 地址。它以 `tex1` 开头，并在 [ZIP 320](https://zips.z.cash/zip-0320) 中定义。
* 它只告诉你的钱包一件事：仅使用透明资金向此地址付款。
* 如果你的余额处于屏蔽状态，兼容的钱包会为你执行两个步骤：先将金额转至一个临时透明地址，再发送至 TEX 地址。
* 2023 年，Binance 向 Zcash 社区寻求一种拒绝屏蔽存款并将其退回的方法。TEX 地址就是答案，而 Binance 是 ZecHub [托管交易所](/using-zcash/custodial-exchanges) 列表中接受 TEX 存款的交易所。
* 发送端的支持也在增加：Coinbase 允许其用户向 TEX 地址发送 ZEC，钱包工具包也一直在增加对 ZIP 320 的支持。
* 向 TEX 地址付款会像任何透明付款一样在区块链上公开。你的其余屏蔽余额则保持私密。

## 核心说明

Zcash TEX 地址是一种特殊的收款地址。TEX 代表“Transparent Exchange（透明交易所）”。它是单个 p2pkh 透明地址的 Bech32m 重新编码。TEX 地址以 `tex1` 开头，与 Unified Addresses 是不同的类型。

TEX 地址会告诉兼容钱包进行一笔仅透明（T -> T）交易。

其逻辑如下：当兼容钱包检测到 TEX 地址时，会将其解码以获取其中包含的透明接收方。随后，钱包会将交易所需资金从屏蔽池发送到一个独立、由用户控制的临时透明地址（Z -> T）。然后，它会将这些资金发送至 TEX 地址解码得到的透明接收方（T -> T）。

TEX 地址的技术提案概述于 Zcash [ZIP 320](https://zips.z.cash/zip-0320)，其中定义了一种专门用于从透明地址接收资金的地址类型。

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### TEX 地址的使用范围有多广？

采用程度仍然有限，但已不再局限于单一交易所。值得区分两种不同角色：

* **签发 TEX 存款地址。** Binance 是我们 [托管交易所](/using-zcash/custodial-exchanges) 列表中为存款提供 TEX 地址的交易所，因此资金会从透明来源到账（[ZIP 320，背景](https://zips.z.cash/zip-0320#background)）。除非其他交易所需要知道付款来自哪个地址，否则 ZIP 320 并不期望它们签发 TEX 地址。
* **向 TEX 地址发送资金。** 这一端的增长更为明显。2024 年 10 月，Coinbase 宣布 Coinbase.com 用户可以向 TEX 地址发送 Zcash（[Coinbase Assets 公告](https://x.com/CoinbaseAssets/status/1844428577921507416)）。钱包工具包也一直在增加对 ZIP 320 的支持：KeepKey 在固件 7.15 中增加了对 TEX 交易的签名功能（[keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)），而 XChainJS `zcash-js` 库则在拒绝有效的 `tex1` 收款方后得到了修补（下文详述）。

因此，TEX 地址尚未普及到所有地方，但读者不应再认为 Binance 是它们唯一出现的地方。

### 何时需要 TEX 地址

#### 当你使用不支持直接向透明地址发送资金的钱包，向透明地址发送资金时，你需要 TEX 地址。

某些钱包不允许直接向透明地址发送资金，而收款方可能不提供对应的 TEX 地址。因此，有时可能需要将透明地址转换为 TEX 地址。可以通过运行 [zip-320](https://zips.z.cash/zip-0320#reference-implementation) 中概述的参考实现来手动完成。

#### 当你向要求资金必须来自透明来源的中心化交易所发送资金时，你需要 TEX 地址。

[Binance](https://www.binance.com/) 是 TEX 地址存在的原因。2023 年 11 月，它告知 Zcash 社区，除非存在一种拒绝来自屏蔽地址的存款并将其退还给存款人的方法，否则 ZEC 可能会被下架（[ZIP 320，背景](https://zips.z.cash/zip-0320#background)）。除非其他交易所需要知道付款来自哪个地址，否则 ZIP 320 并不期望它们签发 TEX 地址。Binance 是我们 [托管交易所](/using-zcash/custodial-exchanges) 列表中接受 TEX 地址存款的交易所。
TEX 地址会告知兼容钱包，发送至该地址的所有资金都必须是透明的，并排除向该地址发送任何屏蔽价值。
如果像 Binance 这样的交易所拒绝收到的价值，它具备将该价值退回其来源地址的必要手段。这也有助于像 Binance 这样的实体遵守政府或其他主管机构施加的法律法规。

### 哪些钱包支持 TEX 地址？

你可以在我们的 [钱包](/using-zcash/wallets) 页面查看最新列表。使用 TEX Address 筛选器。

## 图示 / 类比

将你的屏蔽余额想象成家中上锁保险箱里的钱。外人无法看到里面有多少。

像 Binance 这样的交易所在柜台上挂着一块牌子：仅接受装在透明信封中的付款，这样收银员能看到钱从哪里来，并能在需要时将其退回。TEX 地址就是那块牌子。

当你的钱包看到这块牌子时，它会从保险箱中取出相应金额，将其放入写有你回邮地址的透明信封中（临时透明地址），然后把信封送到柜台。保险箱仍然锁着，没人会知道里面还有什么。

## 深入了解

### TEX 地址的构建方式

以 `t1` 开头的普通透明地址包含一个 20 字节的密钥哈希，并以 Base58Check 编写。TEX 地址包含相同的 20 字节，以 Bech32m 重新编码，前缀为 `tex`（测试网上为 `textest`）。将一种转换为另一种只需几行代码，ZIP 320 在其参考实现中展示了这一点。

这种简单设计是 Binance 提出的要求：转换必须仅借助交易所前端代码中的 Base58Check 和 Bech32m 库运行。ZIP 320 的早期草案将这一构想构建进 Unified Addresses，但该版本因此被弃用。

TEX 地址借用了 Unified Address 格式的 Bech32m 编码，但几乎未保留其结构。如果你刚接触 Bech32m 以及 Zcash 地址的验证方式，[Unified Addresses](/using-zcash/unified-addresses) 页面在 [ZIP 316](https://zips.z.cash/zip-0316) 下介绍了基础知识。TEX 地址与 Unified Address 在四个具体方面不同：

| | Unified Address（ZIP 316） | TEX 地址（ZIP 320） |
|---|---|---|
| 包含内容 | 多个接收方捆绑在一起 | 单个 P2PKH 透明接收方 |
| 人类可读前缀（HRP） | `u`（主网） | `tex`（测试网上为 `textest`） |
| F4Jumble 混淆 | 是 | 否 |
| 每个接收方的类型代码 | 是 | 否 |

简而言之，TEX 地址是最朴素的 Bech32m 封装：一个透明密钥哈希、一个 `tex` 前缀，以及别无其他。

### 钱包和集成方的处理规则

这是实现一直出错的部分，因此值得明确说明。检测到 TEX 地址时，钱包或集成方**不得直接从屏蔽池向 TEX 目标地址支出。** ZIP 320 要求 TEX 付款的每一笔输入都必须是透明的，因此付款分为两步构建：

1. **解除屏蔽。** 将金额从屏蔽池转移至钱包拥有的、由用户控制的全新临时透明地址（Z -> T）。
2. **透明地址向透明地址发送。** 将该临时输出支出至 TEX 地址内已解码的 P2PKH 接收方（T -> T）。

以下几条规则使此过程安全，均来自 ZIP 320：

* 临时地址应从你的助记词派生，以便交易所退回资金时，你的钱包仍能找到并支出这些资金。
* 每次都应使用全新的临时地址，使不同付款之间无法相互关联。
* 第二笔交易应只花费透明输入，从而使交易所看到一笔清晰的透明地址至透明地址存款。

转换和两步流程在 [ZIP 320 参考实现](https://zips.z.cash/zip-0320#reference-implementation) 中展示。错误实现这一点是一个真实且近期的问题：2026 年 10 月，XChainJS `zcash-js` 库因其验证器仅接受 Base58Check `t1` 格式，拒绝了有效的 `tex1` 收款方，并报出“Invalid 'to' address”错误；这导致向发布 `tex1` 地址的服务进行的 ZEC 存款失败（[issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)）。该问题已通过让验证器接受 ZIP 320 编码得到修复（[PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)）。

### TEX 发送会透露什么

TEX 付款属于透明付款，因此是公开的，但值得准确说明观察者能看到和不能看到的内容。

链上**可见**的内容：

* 临时透明地址，因为它既作为解除屏蔽步骤的输出出现，也作为最终发送的输入出现。
* 两笔金额：Z -> T 步骤中离开屏蔽池的价值，以及 T -> T 步骤中交付的价值。
* 交易所的透明接收方，即编码在 TEX 地址中的 P2PKH 地址。

仍然**隐藏**的内容：

* 你的其余屏蔽余额，以及哪些具体屏蔽票据为该付款提供资金。解除屏蔽步骤揭示的是*某些*价值离开了资金池并转至临时地址，而不是其在资金池内部的来源。

因此，观察者可以将临时地址与交易所付款关联起来（同一笔资金，透明地址至透明地址），并能看到它由一次屏蔽提款补充资金。他们无法将其与你的其他屏蔽资金或活动联系起来。链上实际上没有任何内容将该付款标记为“TEX”发送：正如 ZIP 320 所述，向 TEX 地址付款与向匹配的 `t1` 地址付款无法区分，因为共识规则没有变化，整个规则存在于钱包中。

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### 区块链显示什么

TEX 规则存在于钱包中。节点不会检查它，因此共识规则保持不变。在链上，向 TEX 地址付款看起来与向匹配的 `t1` 地址付款相同。与任何透明交易一样，金额、临时地址和交易所地址都是公开的。

## 相关页面

- [统一地址](/using-zcash/unified-addresses)：ZIP 316 中的 `u1` 地址格式，以及 TEX 地址沿用的 Bech32m 基础知识。
- [托管型交易所](/using-zcash/custodial-exchanges)：哪些交易所接受哪些地址类型，包括 Binance 的 TEX 充值。
- [钱包](/using-zcash/wallets)：使用 TEX 地址筛选器查找能够向 TEX 地址付款的钱包。
- [屏蔽资金池](/using-zcash/shielded-pools)：在 TEX 付款将其中一部分转出之前，你的私密余额所在的位置。
- [谁能看到你的 Zcash 付款](/start-here/who-can-see-your-zcash-payment)：资金离开屏蔽资金池后，哪些信息会变得可见。
- [区块浏览器能看到什么](/zcash-tech/what-a-block-explorer-can-see)：透明付款如何显示在链上。
- [Zcash 付款请求 URI](/using-zcash/payment-request-uris)：另一种用于预填付款的钱包标准。

**最后更新：**2026 年 10 月
