<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# ZGo Payment Processor：在不托管资金的情况下接受 Zcash

ZGo 是一个面向 Zcash 的非托管支付处理器。客户从自己的钱包使用 ZEC 付款，ZGo 监控 Zcash 区块链上的这笔交易，资金则通过一笔屏蔽转账直接到达商家的钱包。ZGo 在整个过程中不会代为持有资金。

本指南将说明支付流程如何运作、如何设置账户，以及如何将 ZGo 与 Xero 和 WooCommerce 集成。还会介绍两个最常导致首次设置出问题的错误。

## 本页内容

1. [为什么使用 ZGo](#why-use-zgo)
2. [ZGo 如何运作](#how-zgo-works)
3. [设置账户](#setting-up-an-account)
4. [ZGo 与 Xero](#zgo-with-xero)
5. [ZGo 与 WooCommerce](#zgo-with-woocommerce)
6. [功能特性](#features)
7. [常见错误](#common-mistakes)
8. [结论](#conclusion)
9. [资源](#resources)

## 为什么使用 ZGo

大多数加密货币支付处理器都是托管式的。资金会先进入处理器的账户，再在之后转给商家，这意味着第三方会暂时控制这笔钱，并且可以冻结、延迟或上报相关信息。

ZGo 采取了相反的方式。付款通过一笔 Zcash 屏蔽交易，直接从客户的钱包进入商家的钱包。处理器只负责生成发票并在区块链上监控确认情况。没有中间余额、没有提现流程，也没有任何第三方可以阻碍结算。

对商家而言，这意味着三点实际好处：完全掌控收到的 ZEC、默认享有屏蔽交易隐私，以及不必依赖某个中心化服务商持续在线或保持偿付能力。

## ZGo 如何运作

无论是单独使用 ZGo，还是通过 Xero 或 WooCommerce 使用，支付流程都是一样的：

1. 商家在 ZGo 中生成一个付款请求，系统会渲染为一个二维码，其中包含金额、发票 ID 和一个 Zcash 收款地址。
2. 客户使用 Zcash 钱包扫描该二维码（WordPress 插件支持 Orchard、Sapling 和 Transparent 三种地址类型），并批准付款。
3. 交易会作为一笔屏蔽转账广播到 Zcash 网络，从客户的钱包发送到商家的钱包。
4. ZGo 监控 Zcash 区块链上的这笔交易。
5. 在获得五次确认后，ZGo 会将付款标记为最终完成，并通知所有已连接的集成端（Xero、WooCommerce 或 webhook）。

五次确认这个阈值是关键数字。在此之前，付款都只是进行中，而不是已到账。订单履行、库存更新以及商家侧任何不可逆的操作，都应等待到第 5 步完成后再执行。

ZGo 可在桌面端或移动端的任何现代浏览器中运行，双方都无需安装。客户需要一个 Zcash 钱包；商家则需要一个 Zcash 钱包和一个 ZGo 账户。

<img width="672" height="378" alt="ZGo 付款请求与区块链监控概览" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## 设置账户

要创建 ZGo 账户，需要一个内有少量 ZEC 的 Zcash 钱包。这少量 ZEC 用于支付账户初始化交易的链上手续费。任何主流 Zcash 钱包都可以满足这一要求；当前可选项请参见 [ZecHub 钱包](https://zechub.wiki/wallets)。

基本设置如下：

1. 在浏览器中打开 [zgo.cash](https://zgo.cash/)。
2. 使用由商家自己控制的 Zcash 钱包创建账户。这个钱包必须持有密钥。交易所充值地址无法使用（见[常见错误](#common-mistakes)）。
3. 发送一笔小额初始化交易以验证钱包。
4. 配置收款地址。通过该账户处理的所有付款都会进入这个钱包。

账户启用后，同一商家既可以将 ZGo 用于一次性收款（例如快闪活动上的单个二维码），也可以通过 Xero 或 WooCommerce 接入长期使用场景。

## ZGo 与 Xero

[Xero](https://www.xero.com/) 是许多中小企业使用的云会计平台。ZGo–Xero 集成允许商家在 Xero 中开具发票，让客户使用 ZEC 付款，并在交易确认后由 Xero 自动将该发票标记为已支付。

其工作方式如下：

1. 商家像往常一样在 Xero 中创建发票。
2. ZGo 为该发票附加一个 Zcash 支付选项。
3. 客户通过自己的钱包使用 ZEC 付款。
4. ZGo 监控这笔交易在 [Zcash 区块链](https://z.cash/) 上的状态。
5. 在获得五次确认后，ZGo 将付款结果回传给 Xero，后者会将发票标记为已结清。

ZEC 会进入商家的钱包，而不是任何由 ZGo 或 Xero 控制的账户。Xero 中的会计记录会与链上结算自动保持同步。

首次设置时，请按照专门的操作指南进行： [Xero 集成配置](https://hedgedoc.vergara.tech/s/4iXC67fmb)。

## ZGo 与 WooCommerce

对于运行在 [WooCommerce](https://woocommerce.com/) 和 [WordPress](https://wordpress.org/) 上的网店，ZGo 提供了专用插件。该插件会在结账时加入 Zcash 作为支付方式，并在付款确认后自动处理订单状态。

<img width="672" height="378" alt="ZGo WooCommerce 插件结账与订单流程" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

WooCommerce 商店中的端到端流程如下：

1. 客户进入结账页面，并选择 Zcash 作为支付方式。
2. 插件生成付款请求，并在结账页面显示二维码。
3. 客户从自己的钱包付款。
4. 交易广播到 Zcash 网络，ZGo 开始监控该交易。
5. 在获得五次确认后，ZGo 将付款最终完成的状态报告给插件。
6. 插件将 WooCommerce 订单标记为已支付，并更新订单数据库。

只有在第 6 步完成后，订单才算真正支付完成。更早的状态（例如已广播、初次确认）可以向客户显示为“已收到付款，等待确认”，但库存处理、履约以及任何后续自动化，都应等待最终状态。

该插件还会在 WordPress 内安装一个管理仪表板，商家可以在普通 WooCommerce 订单视图之外，同时监控订单和收到的 ZEC 付款。插件支持当前所有 Zcash 地址类型：Orchard、Sapling 和 Transparent。使用任何兼容钱包付款的客户都可以完成交易。

## 功能特性

**非托管。** 付款通过屏蔽交易直接从客户的钱包进入商家的钱包。ZGo 在中间不会持有资金，商家始终保有完全控制权。

**部署灵活。** ZGo 可以用于快闪市集的一下午临时收款，也可以用于长期的销售点支付场景，或者通过 Xero / WooCommerce 集成作为在线商店的后端。

**基于浏览器。** 客户端和商家端都无需安装。ZGo 可在桌面端或移动端的任何现代浏览器中运行。

**钱包兼容性。** 主流 Zcash 钱包，包括支持 Orchard、Sapling 和 Transparent 地址类型的钱包，都可以在客户侧无需额外配置的情况下支付 ZGo 发票。

**集成能力。** 与 Xero（会计）和 WooCommerce（电子商务）的直接集成，开箱即用地覆盖了最常见的两类商家工作流。

## 常见错误

**在五次确认前就把订单当作已支付。** 已广播的交易不等于已确认的付款。该交易仍可能无法确认，或被替换。只有在获得五次确认后，ZGo 才会将付款报告为最终完成，也只有这时，后续系统才应将订单标记为已支付。如果商家将库存处理或履约配置为在广播事件上触发，那么欺诈付款或失败付款就会造成真实损失。

**将 ZGo 指向交易所充值地址。** 它看起来像一个 Zcash 地址，但交易所充值地址由交易所控制，而不是由商家控制。密钥由交易所持有，也就意味着资金由交易所持有，这违背了使用非托管处理器的初衷。在 ZGo 中配置的钱包地址，必须属于一个由商家直接控制助记词的钱包。

**把 ZGo 当作钱包。** ZGo 是支付处理器，不是钱包。它不会存储密钥、持有余额，也不允许商家支配资金。要接收由 ZGo 路由而来的资金，仍然需要一个由商家自行控制的独立 Zcash 钱包。

## 结论

ZGo 让商家能够在不放弃资金控制权、不依赖中介、也不在公开链上暴露交易细节的前提下接受 Zcash 付款。两项集成（Xero 和 WooCommerce）覆盖了最常见的商家工作流；对于其他场景，ZGo 也可以直接作为独立工具，通过任何浏览器使用。

在设置方面，路径很短：先准备一个 Zcash 钱包，在 [zgo.cash](https://zgo.cash/) 创建账户，然后直接开始生成付款请求，或安装相应的集成。

## 资源

- [ZGo 官方网站](https://zgo.cash/)
- [Xero 集成配置操作指南](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) 和 [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Zcash 项目主页](https://z.cash/)
- [ZecHub 钱包](https://zechub.wiki/wallets)，兼容的 Zcash 钱包列表
- [ZecHub 支付处理器概览](https://zechub.wiki/payment-processors)，了解 ZGo 在其他 Zcash 支付选项中的定位
- [BTCPayServer Zcash Plugin](https://zechub.wiki/guides/btcpayserver-zcash-plugin)，有关自托管替代方案的相关 ZecHub 指南
