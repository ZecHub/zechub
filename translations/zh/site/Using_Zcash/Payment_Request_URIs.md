<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 支付 [Payment] 请求 URI

## TL;DR

* 支付请求 URI 是一个以 `zcash:` 开头的链接，包含支付的详细信息：地址 [address]、金额以及可选的备忘录 [memo]。
* 以二维码或可点击链接的形式分享后，它能让你的钱包 [wallet] 自动填写支付信息。你只需核对详情并批准。
* [ZIP 321](https://zips.z.cash/zip-0321) 定义了该格式。它源自 Bitcoin 的 BIP 21。
* 一项请求可在单笔交易 [transaction] 中向多位收款人付款。
* ZecHub 提供了支付小部件和生成器，因此商店无需手动编写 URI，即可添加 Zcash 支付按钮。

## 核心说明

支付请求 URI 是由 `zcash:`[ZIP 321](https://zips.z.cash/zip-0321) 定义的链接。兼容的钱包会从链接或二维码中读取地址、金额和可选备忘录，并预先填充一笔交易。无需额外账户，也无需中间处理方。

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    打开支付小部件
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    创建支付请求
  </a>
</div>

该小部件演示是一个实时的 ZIP-321 模态窗口：二维码、复制地址/URI、短链接以及在钱包中打开。如果你想先设置自己的地址和金额，可使用工具页面中的生成器。

### 组成部分

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| address | 是 | 推荐使用 Unified Address（`u1` / `utest1`） |
| amount | 否 | 使用 ZEC 小数，以 `.` 作为分隔符，最多保留 8 位小数（`0.5`，而非 `0,5`） |
| memo | 否 | 仅限屏蔽 [shielded] 地址。备忘录的 UTF-8 字节（最多 512 个）采用 base64url 编码，不带 `=` 填充：`Thanks!` 会变为 `VGhhbmtzIQ`，而非纯文本 |
| label | 否 | 部分钱包显示的人类可读名称。对空格和保留字符进行百分号编码（`Coffee%20shop`）；`+` 是字面量加号，而非空格 |

完整规则：[ZIP 321](https://zips.z.cash/zip-0321)。

### 用例 [Use cases]

- 结账：预先填入价格和订单备忘录，客户只需在钱包中确认
- 发票：分享一个链接或二维码
- 捐赠：在网站中嵌入小部件
- P2P：在聊天中发送 `zcash:` 链接

### 在网站中嵌入

将此脚本指向你自己的屏蔽地址。托管副本位于 ZecHub：

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

必填项：`data-address`、`data-amount`、`data-target`。

先试用托管按钮：[打开支付小部件](/zcash-payment-uri)。

### 视频

如何使用 Zcash 创建支付请求：

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

向你的网站添加 Zcash 捐赠小部件：

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 视觉化 / 类比

想象一张银行转账表单，其中包含账户号码、金额以及说明支付用途的 note。手动填写既慢，一个错误数字还会让资金转到错误的地方。

支付请求 URI 就是由商店填好的那张表单。二维码是这张表单的照片。你的手机摄像头读取照片，钱包将每个字段复制到相应位置，而你核对数字并签名。

网页上的链接也能完成同样的工作。点击它即可将填好的表单交给你的钱包。

## 深入了解

### 真实示例

以下是 ZIP 321 中针对 testnet 编写的示例：

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

它请求向一个屏蔽 Sapling 地址支付 1 ZEC。备忘录解码后为 "This is a simple memo."。消息 "Thank you for your purchase" 是钱包在屏幕上显示的文本。

### 钱包检查的规则

金额格式很严格。`amount=0.5` 和 `amount=50` 有效。`amount=50,000.00`、`amount=.5` 和 `amount=0.123456789` 无效：句点是唯一的小数分隔符，且其后最多只能有 8 位数字。金额不得超过 21,000,000 ZEC。

在原始 URI 中，备忘录采用 base64url 编码，解码后最多可容纳 512 字节。为透明 [transparent] 地址附加备忘录会使整个请求无效，因为透明地址不能携带备忘录。Sprout 地址完全不被允许，且不符合 ZIP 321 语法的请求必须被拒绝。

除上表外，还有另外两个字段。`message` 是供钱包显示的支付说明。`req-asset` 为 Custom Assets 保留，如 ZIP 227 所定义。

### 一次向多人支付

每笔额外支付都会在参数名称中加入索引号，例如 `address.1`、`amount.1` 和 `memo.1`。钱包会创建一笔交易，向列表中的所有人付款。这对于拆分支付的结账流程，或一同发送的一组捐赠很有用。

### 该格式的由来

Bitcoin 有两项较早的支付请求标准：BIP 21 是面向单个收款人的简单链接，BIP 70 则是用于复杂支付的较重协议。ZIP 321 采取了中间路线：一种可容纳多位收款人的链接格式。讨论始于 2018 年的 Zcash ZIPs 存储库，其中选择数字 321 以呼应 BIP 21，而 ZIP 本身于 2020 年 8 月创建。

## 相关页面

- [备忘录](/using-zcash/memos)：支付请求中备忘录字段的用途。
- [支付处理商](/using-zcash/payment-processors)：为商店处理支付的服务。
- [钱包](/using-zcash/wallets)：使用 Payment Request 筛选器查找可读取这些链接的钱包。
- [Zcash 屏蔽资产](/zcash-tech/zcash-shielded-assets)：`req-asset` 所指的 Custom Assets。
- [什么是 Zcash TEX 地址？](/using-zcash/transparent-exchange-addresses)：你的钱包在支付前读取的另一项地址规则。

**最后更新：**2026 年 10 月
