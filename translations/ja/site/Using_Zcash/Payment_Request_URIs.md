<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Zcash支払いリクエストURI

## 動的QRコードの概要

URIはユニバーサルリソース識別子（Universal Resource Identifier）の略です。これは、Zcashウォレット内で取引に関する情報を事前に埋め込むためのQRコードとして機能します。このフォーマットを認識するウォレットでは、ウェブページ上のリンクをクリックしたり、QRコードをスキャンすることで取引を作成できます。例えばオンラインカフェを運営している場合、顧客はZcashウォレットでこれらのQRコードをスキャンし、事前に設定された価格と注文番号で購入が可能です。

## 支払いリクエストのユースケース

- オンラインショッピング。チェックアウト時の支払いリクエストは、顧客がオンライン購入中に発行します。
- ホテルおよび宿泊予約。さまざまな予約プラットフォームでは、ホテル予約のために支払いリクエストURLを活用しています。
- オンライン請求書の支払い。公共事業会社は、支払いリクエストURLを使用して顧客が請求書を簡単に支払えるようにします。
- イベントチケット購入。国境を超えたイベント主催者は、このメカニズムを使ってチケット購入をより簡単に行えます。
- P2P支払い。個人はメッセージアプリ経由で家族や友人に支払いリクエストを簡単に送信でき、メッセージ内に埋め込まれた支払いリンクを使用します。

## 詳細

[ZIP 321](https://zips.z.cash/zip-0321)では、独自のカスタム支払いURIを作成する方法が定義されています。

Zcashで支払いリクエストを生成する方法:

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

### コード例

ウェブサイトにZcash寄付ウィジェットを追加する方法:

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
