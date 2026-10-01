<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 支払いリクエストURI

支払いリクエストURIは、`zcash:` によって定義された [ZIP 321](https://zips.z.cash/zip-0321) リンクです。対応ウォレットはリンクまたはQRからアドレス、金額、任意のメモを読み取り、取引内容を事前入力します。追加のアカウントも、仲介する決済処理業者も必要ありません。

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    支払いウィジェットを開く
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    支払いリクエストを作成する
  </a>
</div>

ウィジェットのデモはライブのZIP-321モーダルです。QR、アドレス／URIのコピー、短縮リンク、ウォレットで開く機能を備えています。まず自分でアドレスと金額を設定したい場合は、ツールページのジェネレーターを使用してください。

## 構成

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| フィールド | 必須 | 注記 |
| --- | --- | --- |
| address | はい | Unified Address（`u1` / `utest1`）を推奨 |
| amount | いいえ | 十進数のZEC |
| memo | いいえ | シールドされた送金のみ |
| label | いいえ | 一部のウォレットで表示される人間が読める名前 |

完全なルール: [ZIP 321](https://zips.z.cash/zip-0321)。

## 使用例

- **チェックアウト** — 顧客がウォレットで確認するだけで済むよう、価格と注文メモを事前入力
- **請求書** — 1つのリンクまたはQRを共有
- **寄付** — サイトにウィジェットを埋め込む
- **P2P** — チャットで`zcash:`リンクを送信

## サイトへの埋め込み

このスクリプトを自分のシールドされたアドレスに指定してください。ホスト版のコピーはZecHubにあります。

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

必要: `data-address`、`data-amount`、`data-target`。

まずホスト版ボタンを試してください: [支払いウィジェットを開く](/zcash-payment-uri)。

## 動画

Zcashで支払いリクエストを作成する方法:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Zcashで支払いリクエストを作成する方法"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

ウェブサイトにZcash寄付ウィジェットを追加する:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="ウェブサイトにZcash寄付ウィジェットを追加する"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
