<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZGo 支付处理器 [Payment Processor]：无需托管即可接受 Zcash

ZGo 是一款面向 Zcash 的非托管支付处理器。客户使用自己的钱包 [wallet] 以 ZEC 支付，ZGo 会监控 Zcash blockchain 以确认交易 [transaction]，资金则通过屏蔽 [shielded] 转账直接进入商家的钱包。ZGo 从不在中间持有资金。

本指南说明支付流程的工作方式、如何设置账户，以及如何将 ZGo 与 Xero 和 WooCommerce 集成。它还涵盖了导致大多数首次设置出现问题的两项错误。

## 本页内容

1. [为何使用 ZGo](#why-use-zgo)
2. [ZGo 的工作方式](#how-zgo-works)
3. [设置账户](#setting-up-an-account)
4. [通过 Xero 使用 ZGo](#zgo-with-xero)
5. [通过 WooCommerce 使用 ZGo](#zgo-with-woocommerce)
6. [功能](#features)
7. [常见错误](#common-mistakes)
8. [结论](#conclusion)
9. [资源](#resources)

## 为何使用 ZGo

大多数加密货币支付处理器都是托管的。资金会先进入处理器的账户，之后再转发给商家，这意味着第三方会暂时控制资金，并且可以冻结、延迟或报告相关资金信息。

ZGo 采取相反的方法。支付会通过 Zcash 屏蔽交易，从客户的钱包直接转入商家的钱包。处理器仅生成发票并监控 blockchain 以确认交易。不存在中间余额、提款流程，也不存在能拖延结算的第三方。

对于商家而言，这意味着三项实际优势：完全托管收到的 ZEC、默认提供屏蔽交易隐私 [privacy]，以及无需依赖中心化服务提供商持续在线或保持偿付能力。

## ZGo 的工作方式

无论 ZGo 是单独使用、通过 Xero 使用，还是通过 WooCommerce 使用，支付流程都相同：

1. 商家在 ZGo 中生成支付请求，该请求会显示为二维码，其中包含金额、发票 ID 和 Zcash 收款地址 [address]。
2. 客户使用 Zcash 钱包扫描二维码（WordPress 插件支持 Orchard、Sapling 和透明 [transparent] 地址类型），然后批准支付。
3. 该交易作为从客户钱包到商家钱包的屏蔽转账，被广播到 Zcash 网络。
4. ZGo 会监控 Zcash blockchain 以确认交易。
5. 在获得 5 个确认后，ZGo 会将支付标记为最终状态，并通知所有已连接的集成（Xero、WooCommerce 或 webhook）。

5 个确认的阈值是关键数字。更早的状态均表示支付正在进行，而不是已收到支付。订单履行、库存更新以及商家端的任何不可逆操作都应等待第 5 步完成。

ZGo 可在桌面或移动设备上的任何现代浏览器中运行，双方均无需安装。客户需要一个 Zcash 钱包；商家需要一个 Zcash 钱包和一个 ZGo 账户。

<img width="672" height="378" alt="ZGo 支付请求和 blockchain 监控概览" src="/content-images/de50885b-b068-4157-bbda-0981ca23efc8-a00a274776.webp" />

## 设置账户

若要创建 ZGo 账户，需要一个持有少量 ZEC 的 Zcash 钱包。少量的 ZEC 余额用于支付账户初始化交易的链上 [on-chain] 手续费 [fee]。任何主流 Zcash 钱包均可用于此目的；请参阅 [ZecHub 钱包](https://zechub.wiki/wallets) 了解当前可选项。

基本设置如下：

1. 在浏览器中打开 [zgo.cash](https://zgo.cash/)。
2. 使用由商家控制的 Zcash 钱包创建账户。该钱包必须持有密钥。交易所 [exchange] 充值地址无法使用（请参阅 [常见错误](#common-mistakes)）。
3. 通过发送小额初始化交易验证钱包。
4. 配置收款地址。通过此账户处理的所有支付都会进入该钱包。

账户激活后，同一商家可以将 ZGo 用于一次性支付（例如快闪活动中的单个二维码），或通过 Xero 或 WooCommerce 将其接入永久设置。

## 通过 Xero 使用 ZGo

[Xero](https://www.xero.com/) 是许多中小型企业使用的云会计平台。ZGo–Xero 集成使商家能够在 Xero 中开具发票，让客户以 ZEC 支付，并在交易确认后让 Xero 自动将发票标记为已支付。

其工作方式如下：

1. 商家照常在 Xero 中创建发票。
2. ZGo 会为发票附加 Zcash 支付选项。
3. 客户通过自己的钱包以 ZEC 支付。
4. ZGo 会监控 [Zcash blockchain](https://z.cash/) 以确认交易。
5. 在获得 5 个确认后，ZGo 会将支付报告回 Xero，后者将发票标记为已结算。

ZEC 会进入商家的钱包，而不是进入任何由 ZGo 或 Xero 控制的账户。Xero 中的会计记录会自动与链上结算保持同步。

首次设置时，请遵循专门的操作指南：[Xero 集成配置](https://hedgedoc.vergara.tech/s/4iXC67fmb)。

## 通过 WooCommerce 使用 ZGo

对于运行在 [WooCommerce](https://woocommerce.com/) 和 [WordPress](https://wordpress.org/) 上的在线商店，ZGo 提供专用插件。该插件会在结账时将 Zcash 添加为支付方式，并在支付确认后自动处理订单状态。

<img width="672" height="378" alt="ZGo WooCommerce 插件结账和订单流程" src="/content-images/55a791bb-1947-4f55-b5b9-55083be8ed49-2bc8d2571e.webp" />

WooCommerce 商店中的端到端流程：

1. 客户进入结账页面，并选择 Zcash 作为支付方式。
2. 插件生成支付请求，并在结账页面显示二维码。
3. 客户通过自己的钱包支付。
4. 交易会广播到 Zcash 网络，ZGo 随即开始监控该交易。
5. 在获得 5 个确认后，ZGo 会向插件报告支付已最终确认。
6. 插件将 WooCommerce 订单标记为已支付，并更新订单数据库。

只有在第 6 步完成后，订单才会被视为已支付。较早状态（已广播、初始确认）可以向客户显示为“已收到支付，等待确认”，但库存、订单履行及任何下游自动化都应等待最终状态。

该插件还会在 WordPress 内安装管理仪表板 [dashboard]，商家可在其中监控订单和收到的 ZEC 支付，并同时查看常规 WooCommerce 订单视图。插件支持所有当前 Zcash 地址类型：Orchard、Sapling 和透明地址。使用任何兼容钱包付款的客户都可以完成交易。

## 功能

**非托管。** 支付通过屏蔽交易从客户钱包直接转入商家钱包。ZGo 从不在中间持有资金，商家始终保有完全控制权。

**灵活部署。** ZGo 可用于快闪市集中的一个下午、永久性销售点设置，或通过 Xero 或 WooCommerce 集成作为在线商店的后端。

**基于浏览器。** 客户端和商家端都无需安装。ZGo 可在桌面或移动设备上的任何现代浏览器中运行。

**钱包兼容性。** 主流 Zcash 钱包，包括支持 Orchard、Sapling 和透明地址类型的钱包，都可以支付 ZGo 发票，客户侧无需额外配置。

**集成。** 与 Xero（会计）和 WooCommerce（电子商务）的直接集成可开箱即用地覆盖最常见的两种商家工作流程。

## 常见错误

**在获得 5 个确认前将订单视为已支付。** 已广播的交易不等于已确认的支付。该交易仍可能无法确认或被替换。只有在获得 5 个确认后，ZGo 才会将支付报告为最终状态，且仅在此后才应将下游订单标记为已支付。如果商家配置库存或订单履行在广播事件发生时触发，欺诈或失败的支付将造成实际损失。

**将 ZGo 指向交易所充值地址。** 它看起来像一个 Zcash 地址，但交易所充值地址由交易所控制，而非商家。交易所持有密钥，这意味着交易所持有资金，这违背了使用非托管处理器的初衷。在 ZGo 中配置的钱包地址必须属于一个商家直接控制其助记词 [seed phrase] 的钱包。

**将 ZGo 当作钱包。** ZGo 是支付处理器，而非钱包。它不存储密钥、不持有余额，也不允许商家使用资金。商家需要一个由其控制的独立 Zcash 钱包，以接收 ZGo 路由的资金。

## 结论

ZGo 让商家能够接受 Zcash 支付，同时无需放弃托管权、无需依赖中介，也无需在公共链上暴露交易详情。两种集成（Xero 和 WooCommerce）覆盖了最常见的商家工作流程；对于其他所有场景，ZGo 都可以通过任何浏览器单独使用。

设置路径很简单：获取一个 Zcash 钱包，在 [zgo.cash](https://zgo.cash/) 创建账户，然后直接开始生成支付请求或安装相关集成。

## 资源

- [ZGo 官方网站](https://zgo.cash/)
- [Xero 集成配置操作指南](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) 和 [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Zcash 项目主页](https://z.cash/)
- [ZecHub 钱包](https://zechub.wiki/wallets)，兼容 Zcash 钱包列表
- [ZecHub 支付处理器概览](https://zechub.wiki/payment-processors)，了解 ZGo 在其他 Zcash 支付选项中的定位
- [BTCPayServer Zcash 插件](https://zechub.wiki/guides/btcpayserver-zcash-plugin)，相关的 ZecHub 指南，适用于自托管替代方案
