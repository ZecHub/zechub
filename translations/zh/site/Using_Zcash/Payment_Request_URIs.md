<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 支付请求 URI

支付请求 URI 是由 `zcash:`[ZIP 321](https://zips.z.cash/zip-0321) 定义的链接。兼容的钱包会从链接或二维码中读取地址、金额和可选备注，并预填一笔交易。无需额外账户，也没有中间处理商。

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

该小组件演示是一个实时的 ZIP-321 弹窗：二维码、复制地址/URI、短链接和在钱包中打开。如果你想先设置自己的地址和金额，工具页面提供生成器。

## 构成

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| address | 是 | 建议使用 Unified Address（`u1` / `utest1`） |
| amount | 否 | 十进制 ZEC |
| memo | 否 | 仅限屏蔽转账 |
| label | 否 | 某些钱包会显示的人类可读名称 |

完整规则：[ZIP 321](https://zips.z.cash/zip-0321)。

## 使用场景

- **结账** — 预填价格和订单备注，让客户只需在钱包中确认
- **发票** — 分享一个链接或二维码
- **捐赠** — 在网站上嵌入该小组件
- **P2P** — 在聊天中发送 `zcash:` 链接

## 在网站上嵌入

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

先试试托管按钮：[打开支付小组件](/zcash-payment-uri)。

## 视频

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

将 Zcash 捐赠小组件添加到你的网站：

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
