<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 支払いリクエストURI

## 要点

* 支払いリクエストURIは、`zcash:` で始まり、支払いの詳細（アドレス、金額、任意のメモ）を含むリンクです。
* QRコードまたはクリック可能なリンクとして共有され、ウォレットが支払い内容を自動入力します。詳細を確認して承認してください。
* [ZIP 321](https://zips.z.cash/zip-0321) が形式を定義しています。BitcoinのBIP 21をもとに発展しました。
* 1つのリクエストで、単一のトランザクションにより複数の受取人へ支払えます。
* ZecHub には支払いウィジェットと生成ツールがあり、ショップはURIを手作業で書かずに Zcash 支払いボタンを追加できます。

## 基本解説

支払いリクエストURIは、[ZIP 321](https://zips.z.cash/zip-0321) で定義された `zcash:` リンクです。対応ウォレットはリンクまたはQRからアドレス、金額、任意のメモを読み取り、トランザクションを事前入力します。追加のアカウントも、仲介する決済事業者も必要ありません。

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

ウィジェットのデモは、QR、アドレス／URIのコピー、短縮リンク、ウォレットで開く機能を備えたライブの ZIP-321 モーダルです。まず自分のアドレスと金額を設定したい場合は、ツールページの生成ツールを利用してください。

### 構成要素

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| 項目 | 必須 | 備考 |
| --- | --- | --- |
| address | はい | Unified Address（`u1` / `utest1`）を推奨 |
| amount | いいえ | 区切り文字に `.` を使用し、小数点以下は最大8桁の10進 ZEC（`0.5` は可、`0,5` は不可） |
| memo | いいえ | シールドアドレスのみ。メモのUTF-8バイト列（最大512バイト）を、`=` パディングなしでbase64urlエンコードします。`Thanks!` はプレーンテキストではなく `VGhhbmtzIQ` になります |
| label | いいえ | 一部のウォレットに表示される人間が読める名前。空白および予約文字（`Coffee%20shop`）はパーセントエンコードします。`+` は空白ではなく、リテラルのプラス記号です |

完全なルール：[ZIP 321](https://zips.z.cash/zip-0321)。

### ユースケース

- チェックアウト：価格と注文メモを事前入力し、顧客はウォレットで確認するだけにする
- 請求書：1つのリンクまたはQRを共有する
- 寄付：サイトにウィジェットを埋め込む
- P2P：チャットで `zcash:` リンクを送る

### サイトへの埋め込み

このスクリプトを自分のシールドアドレスに向けてください。ホスト版は ZecHub にあります。

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

必要項目：`data-address`、`data-amount`、`data-target`。

まずホスト版ボタンを試してください：[支払いウィジェットを開く](/zcash-payment-uri)。

### 動画

Zcash で支払いリクエストを作成する方法：

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

ウェブサイトに Zcash 寄付ウィジェットを追加する：

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

## 視覚的な説明／たとえ

銀行振込フォームを想像してください。口座番号、金額、支払い目的を示すメモの欄があります。手入力は時間がかかり、数字を1桁でも間違えると、お金が誤った場所へ送られてしまいます。

支払いリクエストURIは、ショップが記入済みのそのフォームです。QRコードはそのフォームの写真です。スマートフォンのカメラが写真を読み取り、ウォレットがすべての項目を入力し、あなたが数字を確認して署名します。

ウェブページ上のリンクも同じ役割を果たします。クリックすると、記入済みのフォームがウォレットに渡されます。

## 詳細解説

### 実例

以下は、testnet向けに作成された ZIP 321 の例です。

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

1つのシールド Sapling アドレスに1 ZEC を支払うリクエストです。メモは「This is a simple memo.」にデコードされます。「Thank you for your purchase」というメッセージは、ウォレットが画面に表示するテキストです。

### ウォレットが確認するルール

金額の形式は厳格です。`amount=0.5` と `amount=50` は有効です。`amount=50,000.00`、`amount=.5`、`amount=0.123456789` は無効です。小数点の区切り文字はピリオドだけであり、その後に続けられる数字は最大8桁です。金額は21,000,000 ZEC を超えることはできません。

生のURIでは、メモはbase64urlでエンコードされ、デコード後のサイズは最大512バイトです。透明アドレスにはメモを添付できないため、透明アドレスにメモを付けるとリクエスト全体が無効になります。Sprout アドレスは一切許可されず、ZIP 321の文法に従わないリクエストは拒否する必要があります。

上の表に加えて、さらに2つのフィールドがあります。`message` はウォレットが表示する支払いの説明です。`req-asset` は、ZIP 227で定義されるCustom Assets用に予約されています。

### 複数人へまとめて支払う

追加する各支払いには、パラメータ名にインデックス番号が加わります。たとえば、`address.1`、`amount.1`、`memo.1` です。ウォレットは、リスト内の全員に支払う1つのトランザクションを作成します。これは支払いを分割するチェックアウトや、まとめて送る寄付グループに便利です。

### この形式の由来

Bitcoinには、支払いリクエストに関する古い標準が2つあります。1人の受取人向けの簡単なリンクであるBIP 21と、複雑な支払い向けのより重いプロトコルであるBIP 70です。ZIP 321はその中間を取り、複数の受取人に対応する余地を持つリンク形式です。議論は2018年に Zcash ZIPsリポジトリで始まり、BIP 21に呼応するよう321という番号が選ばれ、ZIP 自体は2020年8月に作成されました。

## 関連ページ

- [メモ](/using-zcash/memos)：支払いリクエスト内のメモ欄の目的。
- [決済事業者](/using-zcash/payment-processors)：ショップ向けに支払いを処理するサービス。
- [ウォレット](/using-zcash/wallets)：Payment Requestフィルターを使うと、これらのリンクを読み取れるウォレットを探せます。
- [Zcash シールド資産](/zcash-tech/zcash-shielded-assets)：`req-asset` が参照するCustom Assets。
- [Zcash TEXアドレスとは？](/using-zcash/transparent-exchange-addresses)：支払い前にウォレットが確認する、もう1つのアドレスルール。

**最終更新：** 2026年10月
