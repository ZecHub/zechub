<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 什么是 Zcash TEX 地址 [TEX Addresses]？

## TL;DR

* TEX 地址是一种以不同格式编写的透明 [transparent] Zcash 地址。它以 `tex1` 开头，并定义于 [ZIP 320](https://zips.z.cash/zip-0320)。
* 它会向你的钱包 [wallet] 传达一件事：仅使用透明资金支付此地址。
* 如果你的余额是屏蔽 [shielded] 的，兼容钱包会为你执行两个步骤。它会先将金额转移到一个临时透明地址，然后发送至 TEX 地址。
* 2023 年，Binance 向 Zcash 社区寻求一种拒绝屏蔽存款并将其退回的方法。TEX 地址就是答案，而 Binance 是 ZecHub [托管交易所](/using-zcash/custodial-exchanges) 列表中接受 TEX 存款的交易所 [exchange]。
* 发送端的支持也在增加：Coinbase 允许其用户向 TEX 地址发送 ZEC，钱包工具包也一直在添加对 ZIP 320 的支持。
* 向 TEX 地址的支付 [payment] 会像任何透明支付一样公开显示在 blockchain 上。你的其余屏蔽余额仍保持私密。

## 核心说明

Zcash TEX 地址是一种特殊类型的接收地址。TEX 代表“透明交易所 [Transparent Exchange]”。它是单个 p2pkh 透明地址的 Bech32m 重新编码。TEX 地址以 `tex1` 开头，且与统一地址 [Unified Addresses] 属于不同类型。

TEX 地址会告知兼容钱包执行一笔仅透明（T -> T）交易 [transaction]。 

其逻辑如下：当兼容钱包检测到 TEX 地址时，它会将其解码以获取其中包含的透明接收方。然后，钱包会将该笔 tx 所需资金从屏蔽 pool 转移至一个单独的、由用户控制的临时透明地址（Z -> T）。随后，它会将这些资金发送至 TEX 地址解码出的透明接收方（T -> T）。  

TEX 地址的技术提案载于 Zcash [ZIP 320](https://zips.z.cash/zip-0320)，它定义了一种专门用于接收来自透明地址资金的地址类型。

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### TEX 地址的使用范围有多广？

采用程度仍然有限，但已不再局限于单一交易所。以下两种不同角色值得区分：

* **签发 TEX 存款地址。** Binance 是我们 [托管交易所](/using-zcash/custodial-exchanges) 列表中为存款提供 TEX 地址的交易所，以便资金从透明来源到达（[ZIP 320，背景](https://zips.z.cash/zip-0320#background)）。ZIP 320 并不预期其他交易所会签发 TEX 地址，除非它们需要知道一笔支付来自哪个地址。
* **发送至 TEX 地址。** 这是增长较多的一端。2024 年 10 月，Coinbase 宣布 Coinbase.com 用户可以向 TEX 地址发送 Zcash（[Coinbase Assets 公告](https://x.com/CoinbaseAssets/status/1844428577921507416)）。钱包工具包也一直在添加对 ZIP 320 的支持：KeepKey 在固件 7.15 中新增了 TEX 交易签名功能（[keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)），而 XChainJS `zcash-js` 库在拒绝有效的 `tex1` 接收方后也已修复（详见下文）。

因此，TEX 地址并非普遍适用，但读者不应再假定 Binance 是唯一出现它们的地方。

### 我何时需要 TEX 地址

#### 当使用不支持直接向透明地址发送资金的钱包向透明地址转账时，你需要 TEX 地址。

某些钱包不允许直接发送至透明地址，而接收方可能不会提供等效的 TEX 地址。因此，有时可能需要将透明地址转换为 TEX 地址。这可以通过运行 [zip-320](https://zips.z.cash/zip-0320#reference-implementation) 中概述的参考实现手动完成。

#### 当向要求资金必须来自透明来源的中心化交易所发送资金时，你需要 TEX 地址。

[Binance](https://www.binance.com/) 是 TEX 地址存在的原因。2023 年 11 月，它告知 Zcash 社区，除非有办法拒绝来自屏蔽地址的存款并将其退回存款人，否则 ZEC 可能会被下架（[ZIP 320，背景](https://zips.z.cash/zip-0320#background)）。ZIP 320 并不预期其他交易所会签发 TEX 地址，除非它们需要知道一笔支付来自哪个地址。Binance 是我们 [托管交易所](/using-zcash/custodial-exchanges) 列表中接受 TEX 地址存款的交易所。
TEX 地址会告知兼容钱包，发送至该地址的所有资金都必须是透明的，并排除将任何屏蔽价值发送至该地址。
如果像 Binance 这样的交易所拒绝收到的价值，它具备将该价值退回其来源地址所需的手段。这也有助于像 Binance 这样的实体遵守政府或其他主管机构施加的法律和法规。

### 哪些钱包支持 TEX 地址？

你可以在我们的 [钱包](/using-zcash/wallets) 页面查看最新列表。请使用 TEX 地址筛选器。

## 视觉化说明 / 类比

将你的屏蔽余额想象成家中一个上锁保险箱里的钱。外面的人无法看到里面有多少。

像 Binance 这样的交易所会在柜台上放一块牌子：“仅接受装在透明信封中的支付，这样收银员能看到钱来自哪里，并在需要时将其退回。”TEX 地址就是这块牌子。

当你的钱包看到这块牌子时，它会从保险箱中取出金额，将其装入一个带有你的回寄地址的透明信封中（即临时透明地址），然后把信封带到柜台。保险箱仍然锁着，没人会知道里面还有什么。

## 深入探讨

### TEX 地址的构建方式

以 `t1` 开头的普通透明地址包含一个 20 字节密钥哈希，并以 Base58Check 编写。TEX 地址包含相同的 20 字节，使用带有 `tex` 前缀的 Bech32m 重新编码（在测试网 [testnet] 上为 `textest`）。将二者互相转换只需几行代码，ZIP 320 在其参考实现中对此作了展示。

这个简单设计是 Binance 的要求：转换必须能够仅使用交易所前端代码中的 Base58Check 和 Bech32m 库运行。ZIP 320 的早期草案将该理念构建于统一地址中，而该版本因此被放弃。

TEX 地址借用了统一地址格式的 Bech32m 编码，但几乎没有保留其结构。如果你刚开始了解 Bech32m 以及 Zcash 地址如何验证，[统一地址](/using-zcash/unified-addresses) 页面在 [ZIP 316](https://zips.z.cash/zip-0316) 中介绍了基础知识。TEX 地址与统一地址有 4 项具体差异：

| | 统一地址（ZIP 316） | TEX 地址（ZIP 320） |
|---|---|---|
| 包含内容 | 捆绑在一起的多个接收方 | 单个 P2PKH 透明接收方 |
| 人类可读前缀（HRP） | `u`（主网 [mainnet]） | `tex`（测试网上为 `textest`） |
| F4Jumble 混淆 | 是 | 否 |
| 每个接收方的类型代码 | 是 | 否 |

简而言之，TEX 地址是最朴素的 Bech32m 封装：一个透明密钥哈希、一个 `tex` 前缀，别无其他。

### 钱包和集成方的处理规则

这是实现一直出错的部分，因此值得明确说明。检测到 TEX 地址时，钱包或集成方**不得直接从屏蔽 pool 向 TEX 目标地址花费资金。**ZIP 320 要求 TEX 支付的每个输入都必须是透明的，因此支付需分两步构建：

1. **解除屏蔽。** 将金额从屏蔽 pool 转移到由钱包拥有的、全新且由用户控制的临时透明地址（Z -> T）。
2. **透明至透明发送。** 将该临时输出花费至 TEX 地址内解码出的 P2PKH 接收方（T -> T）。

以下几条规则均来自 ZIP 320，可确保此过程安全：

* 临时地址应从你的助记词派生，以便交易所退回资金时，你的钱包仍能找到并花费这些资金。
* 每次都应使用全新的临时地址，以免不同支付彼此关联。
* 第二笔交易应仅花费透明输入，以便交易所看到一笔清晰的透明至透明存款。

转换及两步流程展示于 [ZIP 320 参考实现](https://zips.z.cash/zip-0320#reference-implementation) 中。错误实现确实是一个近期问题：2026 年 10 月，XChainJS `zcash-js` 库因其验证器仅接受 Base58Check `t1` 格式，而拒绝了有效的 `tex1` 接收方，并报出“Invalid 'to' address”错误；这导致 ZEC 无法向发布 `tex1` 地址的服务存款（[issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)）。该问题已通过让验证器接受 ZIP 320 编码而修复（[PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)）。

### TEX 发送会披露什么

TEX 支付是一笔透明支付，因此是公开的，但值得准确说明观察者能看到和不能看到什么。

链上 [on-chain] **可见**的内容：

* 临时透明地址，因为它既出现在解除屏蔽步骤的输出中，也出现在最终发送的输入中。
* 两笔金额：Z -> T 步骤中离开屏蔽 pool 的价值，以及 T -> T 步骤中交付的价值。
* 交易所的透明接收方，即编码在 TEX 地址中的 P2PKH 地址。

仍然**隐藏**的内容：

* 你的其余屏蔽余额，以及具体哪些屏蔽 note 为该支付提供了资金。解除屏蔽步骤会显示*某些*价值从 pool 转移至临时地址，但不会显示其在 pool 内部来自哪里。

因此，观察者可以将临时地址与交易所支付关联起来（相同资金，透明至透明），并且可以看到它是通过一次屏蔽提款补充的。他们无法将其与你的其他屏蔽资金或活动关联。链上实际上没有任何内容将该支付标记为“TEX”发送：正如 ZIP 320 所述，向 TEX 地址的支付与向匹配的 `t1` 地址的支付无法区分，因为共识 [consensus] 规则未变，且整个规则存在于钱包中。

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### blockchain 显示什么

TEX 规则存在于钱包中。节点不会检查它，因此共识规则保持不变。在链上，向 TEX 地址的支付与向匹配的 `t1` 地址的支付看起来相同。与任何透明交易一样，金额、临时地址和交易所地址都是公开的。

## 相关页面

- [统一地址](/using-zcash/unified-addresses)：`u1` 316 下的 ZIP 地址格式，以及 TEX 地址复用的 Bech32m 基础知识。
- [托管交易所](/using-zcash/custodial-exchanges)：哪些交易所接受哪些地址类型，包括 Binance 的 TEX 存款。
- [钱包](/using-zcash/wallets)：使用 TEX 地址筛选器查找可向 TEX 地址支付的钱包。
- [屏蔽池](/using-zcash/shielded-pools)：在 TEX 支付将部分资金移出之前，你的私密余额所在的位置。
- [谁能看到你的 Zcash 支付](/start-here/who-can-see-your-zcash-payment)：资金离开屏蔽 pool 后哪些内容会变得可见。
- [区块链浏览器能看到什么](/zcash-tech/what-a-block-explorer-can-see)：透明支付如何显示在链上。
- [Zcash 支付请求 URI](/using-zcash/payment-request-uris)：另一项用于预填支付的钱包标准。

**最后更新：**2026 年 10 月
