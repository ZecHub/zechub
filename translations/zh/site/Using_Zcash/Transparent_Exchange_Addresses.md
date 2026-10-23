<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 什么是 Zcash TEX 地址？

## TL;DR

* TEX 地址是以不同格式书写的透明 Zcash 地址。它以 `tex1` 开头，并在 [ZIP 320](https://zips.z.cash/zip-0320) 中定义。
* 它只向你的钱包传达一件事：只能使用透明资金向此地址付款。
* 如果你的余额处于屏蔽状态，兼容钱包会为你完成两个步骤。它先将该金额转移至一个临时透明地址，然后发送至 TEX 地址。
* 2023 年，Binance 向 Zcash 社区寻求一种拒绝屏蔽存款并将其退回的方法。TEX 地址就是答案，而 Binance 是 ZecHub [托管交易所](/using-zcash/custodial-exchanges) 列表中接受 TEX 存款的交易所。
* 向 TEX 地址付款会像任何透明付款一样公开记录在区块链上。你其余的屏蔽余额仍然保持私密。

## 核心说明

Zcash TEX 地址是一种特殊的收款地址。TEX 代表“Transparent Exchange”。它是单个 p2pkh 透明地址的 Bech32m 重新编码。TEX 地址以 `tex1` 开头，并且与 Unified Addresses 属于不同类型。

TEX 地址会指示兼容钱包进行一笔仅透明（T -> T）交易。 

逻辑如下：当兼容钱包检测到 TEX 地址时，它会将其解码，以获取其中包含的透明接收器。然后，钱包会将交易所需资金从屏蔽池发送到一个独立、由用户控制的临时透明地址（Z -> T）。随后，它会将这些资金发送至 TEX 地址解码出的透明接收器（T -> T）。  

TEX 地址的技术提案见于 Zcash [ZIP 320](https://zips.z.cash/zip-0320)，其中定义了一种专门用于从透明地址接收资金的地址类型。

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

TEX 地址目前尚未被广泛采用。Zcash 用户最终可能需要使用它们。

### 我何时需要 TEX 地址

#### 当你使用不支持直接向透明地址发送资金的钱包向透明地址转账时，你需要 TEX 地址。

某些钱包不允许直接向透明地址发送资金，而收款人可能未提供对应的 TEX 地址。因此，有时可能需要将透明地址转换为 TEX 地址。可以通过运行 [zip-320](https://zips.z.cash/zip-0320#reference-implementation) 中概述的参考实现来手动完成此操作。

#### 当你向要求资金必须来自透明来源的中心化交易所转账时，你需要 TEX 地址。

[Binance](https://www.binance.com/) 是 TEX 地址存在的原因。2023 年 11 月，它告知 Zcash 社区，除非能以某种方式拒绝来自屏蔽地址的存款并将其退还给存款人，否则 ZEC 可能会被下架（[ZIP 320，背景](https://zips.z.cash/zip-0320#background)）。ZIP 320 并不预计其他交易所会签发 TEX 地址，除非它们需要知道付款来自哪个地址。Binance 是我们 [托管交易所](/using-zcash/custodial-exchanges) 列表中接受 TEX 地址存款的交易所。
TEX 地址会通知兼容钱包，发送至该地址的所有资金必须是透明的，并排除将任何屏蔽价值发送至该地址。
如果像 Binance 这样的交易所拒绝所发送的价值，它具备将该价值退回其来源地址的必要手段。这也有助于像 Binance 这样的实体遵守政府或其他机构施加的法律法规。

### 哪些钱包支持 TEX 地址？

你可以在我们的 [钱包](/using-zcash/wallets) 页面查看最新列表。使用 TEX Address 筛选器。

## 视觉化说明／类比

把你的屏蔽余额想象成家中上锁保险箱里的钱。外人无法看到里面有多少。

像 Binance 这样的交易所在柜台上放着一块牌子：只接受装在透明信封中的付款，这样收银员就能看到钱来自哪里，并在需要时将其退回。TEX 地址就是那块牌子。

当你的钱包看到这块牌子时，它会从保险箱中取出相应金额，将其装入写有你回邮地址的透明信封中（即临时透明地址），然后把信封送到柜台。保险箱仍然锁着，没人会知道里面还有什么。

## 深入了解

### TEX 地址如何构建

以 `t1` 开头的普通透明地址包含一个 20 字节密钥哈希，并以 Base58Check 格式写入。TEX 地址包含相同的 20 个字节，使用前缀 `tex`（测试网上为 `textest`）以 Bech32m 重新编码。两者之间的转换只需几行代码，ZIP 320 在其参考实现中展示了这一点。

这种简单设计是 Binance 的要求：转换必须仅使用交易所前端代码中的 Base58Check 和 Bech32m 库运行。ZIP 320 的早期草案将这一构想纳入 Unified Addresses，但该版本因此被放弃。

### 从屏蔽余额向 TEX 地址付款

ZIP 320 要求兼容钱包在此构建两笔交易。第一笔将资金从你的屏蔽余额转移至一个新的临时透明地址。第二笔则从该地址将资金发送至 TEX 地址。

如果交易所拒绝存款，它会将资金退回临时地址。你的钱包必须能够找到并花费这些资金，因此 ZIP 320 要求钱包从你的助记词派生临时地址。它还要求钱包每次使用一个新的临时地址，以便不同付款无法相互关联。

### 区块链显示什么

TEX 规则存在于钱包中。节点不会检查它，因此共识规则保持不变。在链上，向 TEX 地址付款与向匹配的 `t1` 地址付款看起来完全相同。与任何透明交易一样，金额、临时地址和交易所地址均为公开信息。

## 相关页面

- [托管交易所](/using-zcash/custodial-exchanges)：哪些交易所接受哪些地址类型，包括 Binance 的 TEX 存款。
- [钱包](/using-zcash/wallets)：使用 TEX Address 筛选器查找可向 TEX 地址付款的钱包。
- [屏蔽池](/using-zcash/shielded-pools)：在 TEX 付款将部分资金转出之前，你的私密余额所在之处。
- [谁能看到你的 Zcash 付款](/start-here/who-can-see-your-zcash-payment)：资金离开屏蔽池后会有哪些信息变得可见。
- [区块浏览器能看到什么](/zcash-tech/what-a-block-explorer-can-see)：透明付款如何在链上显示。
- [Zcash 付款请求 URI](/using-zcash/payment-request-uris)：另一种用于预填付款的钱包标准。

**最后更新：**2026 年 10 月
