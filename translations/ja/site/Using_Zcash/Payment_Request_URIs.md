<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 支払いリクエストURI（Payment Request URI）

## 要約

* 支払いリクエストURIは、`zcash:` で始まり、支払いの詳細（アドレス、金額、任意のメモ）を含むリンクです。
* QRコードまたはクリック可能なリンクとして共有すると、ウォレットが支払い内容を自動入力します。詳細を確認して承認してください。
* [ZIP 321](https://zips.z.cash/zip-0321) はその形式を定義しています。BitcoinのBIP 21を基に発展しました。
* 1つのリクエストで、1件のトランザクション内に複数の受取人へ支払いできます。
* ZecHub は支払いウィジェットとジェネレーターを提供しているため、店舗はURIを手作業で記述せずに Zcash の支払いボタンを追加できます。

## 基本説明

支払いリクエストURIは、[ZIP 321](https://zips.z.cash/zip-0321) で定義された `zcash:` リンクです。対応ウォレットはリンクまたはQRからアドレス、金額、任意のメモを読み取り、トランザクションを事前入力します。追加アカウントも、仲介する決済処理業者も必要ありません。

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Open payment widget
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Build a payment request
  </a>
</div>

ウィジェットのデモは、QR、アドレス/URIのコピー、短縮リンク、ウォレットで開く機能を備えたライブの ZIP-321 モーダルです。ツールページでは、まず独自のアドレスと金額を設定したい場合にジェネレーターを利用できます。

### 構成

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| フィールド | 必須 | 注記 |
| --- | --- | --- |
| address | はい | 統合アドレス（Unified Address）（`u1` / `utest1`）を推奨します |
| amount | いいえ | 区切り文字に `.` を使用し、小数点以下は最大8桁までの10進 ZEC です（`0.5` は可、`0,5` は不可） |
| memo | いいえ | シールドされたアドレスのみです。メモのUTF-8バイト列（最大512バイト）は、`=` パディングなしでbase64urlエンコードされます。`Thanks!` はプレーンテキストではなく `VGhhbmtzIQ` になります |
| label | いいえ | 一部のウォレットに表示される人間が読みやすい名称です。スペースと予約文字はパーセントエンコードします（`Coffee%20shop`）。`+` はスペースではなくリテラルのプラス記号です |

完全なルール：[ZIP 321](https://zips.z.cash/zip-0321)。

### ユースケース

- チェックアウト：価格と注文メモを事前入力し、顧客はウォレットで確認するだけにします
- 請求書：1つのリンクまたはQRを共有します
- 寄付：サイトにウィジェットを埋め込みます
- P2P：チャットで `zcash:` リンクを送信します

### サイトへの埋め込み

このスクリプトを独自のシールドされたアドレスに指定してください。ホスト版は ZecHub にあります。

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

必須項目：`data-address`、`data-amount`、`data-target`。

まずホストされたボタンを試してください：[支払いウィジェットを開く](/zcash-payment-uri)。

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

## 視覚的説明 / たとえ

銀行振込用紙に、口座番号、金額、支払いの目的を示すノートを書く場面を考えてみてください。手作業で記入するのは時間がかかり、数字を1つ間違えると資金を誤った場所へ送ってしまいます。

支払いリクエストURIは、店舗側が記入済みのその用紙です。QRコードはその用紙の写真です。スマートフォンのカメラが写真を読み取り、ウォレットがすべての項目を所定の場所にコピーし、あなたが数字を確認して署名します。

ウェブページ上のリンクも同じ役割を果たします。クリックすると、記入済みの用紙がウォレットに渡されます。

## 詳細

### 実例

以下は、テストネット向けに記述された ZIP 321 の例です。

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

これは1 ZEC を1つのシールドされた Sapling アドレスへ支払うよう求めています。メモは「This is a simple memo.」にデコードされます。「Thank you for your purchase」というメッセージは、ウォレットが画面に表示するテキストです。

### ウォレットが確認するルール

金額の形式は厳格です。`amount=0.5` と `amount=50` は有効です。`amount=50,000.00`、`amount=.5`、`amount=0.123456789` は無効です。小数点にはピリオドのみを使用でき、その後には最大8桁までしか指定できません。金額は21,000,000 ZEC を超えることはできません。

生のURIでは、メモはbase64urlでエンコードされ、デコード後は最大512バイトまで保持できます。公開型アドレスにメモを付加すると、公開型アドレスではメモを保持できないため、リクエスト全体が無効になります。Sprout アドレスは一切許可されず、ZIP 321の文法に従わないリクエストは拒否しなければなりません。

上記の表以外に、さらに2つのフィールドがあります。`message` は、ウォレットが表示する支払いの説明です。`req-asset` は、ZIP 227で定義されたCustom Assets用に予約されています。

### 複数の人に一度に支払う

追加の各支払いには、たとえば `address.1`、`amount.1`、`memo.1` のように、パラメータ名へインデックス番号を追加します。ウォレットはリストにいる全員へ支払う1件のトランザクションを作成します。これは支払いを分割するチェックアウトや、まとめて送付する寄付グループに便利です。

### この形式の由来

Bitcoinには、支払いリクエスト向けの古い標準が2つあります。1人の受取人向けのシンプルなリンクであるBIP 21と、複雑な支払い向けのより重量級なプロトコルであるBIP 70です。ZIP 321はその中間を取っており、複数の受取人に対応する余地を持つリンク形式です。議論は2018年に Zcash ZIPsリポジトリで始まり、BIP 21に呼応する番号として321が選ばれ、ZIP 自体は2020年8月に作成されました。

## 関連ページ

- [メモ](/using-zcash/memos)：支払いリクエストのメモフィールドの目的です。
- [決済処理業者](/using-zcash/payment-processors)：店舗向けの支払いを処理するサービスです。
- [ウォレット](/using-zcash/wallets)：支払いリクエストフィルターを使用して、これらのリンクを読み取るウォレットを見つけてください。
- [Zcash シールドされたアセット](/zcash-tech/zcash-shielded-assets)：`req-asset` が参照するCustom Assetsです。
- [Zcash TEXアドレスとは？](/using-zcash/transparent-exchange-addresses)：ウォレットが支払い前に読み取る、もう1つのアドレスに関するルールです。

**最終更新：** 2026年10月
