<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 支付请求 URI

## TL;DR

* 支付请求 URI 是一种以 `zcash:` 开头的链接，包含支付详情：地址、金额以及可选的备注。
* 它可作为二维码或可点击链接分享，让你的钱包自动填入支付信息。你只需核对详情并批准。
* [ZIP 321](https://zips.z.cash/zip-0321) 定义了该格式。它源自 Bitcoin 的 BIP 21。
* 一项请求可在单笔交易中向多位收款人付款。
* ZecHub 提供支付小组件和生成器，因此商家无需手动编写 URI 即可添加 Zcash 支付按钮。

## 核心说明

支付请求 URI 是由 [ZIP 321](https://zips.z.cash/zip-0321) 定义的一种 `zcash:` 链接。兼容的钱包会从链接或二维码中读取地址、金额和可选备注，并预填一笔交易。无需额外账户，也无需中间处理商。

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    打开支付小组件
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    创建支付请求
  </a>
</div>

该小组件演示是一个实时 ZIP-321 模态窗口：二维码、复制地址/URI、短链接以及在钱包中打开。如果你想先设置自己的地址和金额，则可使用工具页面上的生成器。

### 组成部分

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| address | 是 | 建议使用 Unified Address（`u1` / `utest1`） |
| amount | 否 | 十进制 ZEC，以 `.` 作为分隔符，且最多保留 8 位小数（`0.5`，而非 `0,5`） |
| memo | 否 | 仅限屏蔽地址。备注的 UTF-8 字节（最多 512 字节）使用 base64url 编码且不带 `=` 填充：`Thanks!` 会变为 `VGhhbmtzIQ`，而非纯文本 |
| label | 否 | 部分钱包显示的人类可读名称。请对空格和保留字符进行百分号编码（`Coffee%20shop`）；`+` 是字面意义上的加号，而不是空格 |

完整规则：[ZIP 321](https://zips.z.cash/zip-0321)。

### 使用场景

- 结账：预填价格和订单备注，让客户只需在钱包中确认
- 发票：分享一个链接或二维码
- 捐赠：在网站中嵌入小组件
- P2P：在聊天中发送 `zcash:` 链接

### 嵌入网站

将此脚本指向你自己的屏蔽地址。托管版本位于 ZecHub：

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

必需项：`data-address`、`data-amount`、`data-target`。

先试用托管按钮：[打开支付小组件](/zcash-payment-uri)。

### 视频

如何使用 Zcash 创建支付请求：

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="如何使用 Zcash 创建支付请求"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

将 Zcash 捐赠小组件添加到你的网站：

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="将 Zcash 捐赠小组件添加到你的网站"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 直观理解 / 类比

可以把它想象成一份银行转账表单，其中包含账户号码、金额以及说明付款用途的备注。手动填写既慢，错写一个数字就可能把钱转到错误的地方。

支付请求 URI 就是由商家填好的这份表单。二维码则是这份表单的照片。你的手机摄像头读取照片，钱包会将每个字段复制到相应位置，然后你核对数字并签名。

网页上的链接也能完成同样的工作。点击它即可将填好的表单交给你的钱包。

## 深入了解

### 真实示例

以下是 ZIP 321 中一个为测试网编写的示例：

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

它请求向一个屏蔽的 Sapling 地址支付 1 ZEC。备注解码后为“这是一条简单的备注。”消息“感谢您的购买”是钱包在屏幕上显示的文本。

### 钱包会检查的规则

金额格式必须严格遵守。`amount=0.5` 和 `amount=50` 有效。`amount=50,000.00`、`amount=.5` 和 `amount=0.123456789` 无效：句点是唯一的小数分隔符，且其后最多只能有 8 位数字。金额不得超过 21,000,000 ZEC。

在原始 URI 中，备注采用 base64url 编码，解码后最多可容纳 512 字节。若将备注附加到透明地址，整个请求将无效，因为透明地址不能携带备注。Sprout 地址完全不允许使用，且不遵循 ZIP 321 语法的请求必须被拒绝。

除上述表格外，还有另外两个字段。`message` 是供钱包显示的支付说明。`req-asset` 保留给 Custom Assets，其定义见 ZIP 227。

### 一次向多人付款

每笔额外付款都会在其参数名称中添加索引号，例如 `address.1`、`amount.1` 和 `memo.1`。钱包会构建一笔交易，向列表中的每个人付款。这对于拆分付款的结账流程，或一起发送的一组捐赠非常有用。

### 该格式的由来

Bitcoin 有两项较早的支付请求标准：BIP 21 是面向单个收款人的简单链接，BIP 70 则是用于复杂支付的较重协议。ZIP 321 采取了中间路线：一种可容纳多位收款人的链接格式。相关讨论于 2018 年在 Zcash ZIPs 仓库中开始，其中选择 321 这一编号以呼应 BIP 21，而 ZIP 本身则于 2020 年 8 月创建。

## 相关页面

- [备注](/using-zcash/memos)：支付请求中的备注字段用途。
- [支付处理商](/using-zcash/payment-processors)：为商家处理支付的服务。
- [钱包](/using-zcash/wallets)：使用支付请求筛选器查找可读取这些链接的钱包。
- [Zcash 屏蔽资产](/zcash-tech/zcash-shielded-assets)：`req-asset` 所指的 Custom Assets。
- [什么是 Zcash TEX 地址？](/using-zcash/transparent-exchange-addresses)：钱包付款前会读取的另一项地址规则。

**最后更新：**2026 年 10 月
