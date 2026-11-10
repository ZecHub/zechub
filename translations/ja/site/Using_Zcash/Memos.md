<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# メモ（Memos）

## 要約

* メモは、シールドされたアドレスへ送る支払いに添付する短いノートです。暗号化されているため、ブロックチェーンを監視する人は読むことができません。
* メモ欄には最大512バイトのテキストを入れられます。
* 支払いを送った人や目的を伝えたり、非公開メッセージを送ったりするためにメモが使われます。
* 公開型アドレスへの支払いにはメモを添付できません。
* [支払いリクエストリンク](/using-zcash/payment-request-uris)では、ショップが各注文にタグを付けられるよう、メモを自動入力できます。

## 基本的な説明

### 暗号化されたメモの送信

Z2Z（シールドされたアドレス間）トランザクションを送信する際、トランザクションにメモ（メッセージ）を含めることができます。このメモは複数の用途に使用できます。

### トランザクションへの署名

メモは主に支払いへの署名に使用されます。シールドされたトランザクションではデータが暗号化されるため、誰がZECを送ったのか、またZECが何のためのものだったのかを確認できません。ユーザーはメモ欄に自身の名前または仮名を署名し、相手にトランザクションの送信者を知らせることができます。また、トランザクションの目的を説明することもできます。

### メッセージの送信

暗号化されたメモのもう1つのユースケースは、z-addrを持つ相手へメッセージを送ることです。これらのメッセージは、[友人へのリマインダー](https://twitter.com/iansagstette/status/1542142468505870336)から、[可能な限り非公開にしておく必要がある機密メッセージ](https://twitter.com/InsideZcash/status/1545800146352578560)まで、どのような内容でも構いません。

### ブロックチェーン上のラブレター

Zcashブロックチェーンの最初期のブロックの1つで、パートナーにラブレターを送った人がいました。ある人は、パートナーがZcashメモを通じてファイルを送っていたことを発見しました。このファイルは、彼女と遠距離恋愛中の恋人が一緒に参加したいと話していた、海外の特別なイベントのチケットでした。そのメモはラブレターでした。

## 視覚的な説明 / たとえ

シールドされた支払いは、お金が入った封筒だと考えてください。メモはお金と一緒に折りたたんで入れるノートです。

ブロックチェーンは郵便局です。封筒を運び、到着したことを記録しますが、決して開封しません。封筒を開けた人がノートを読みます。公開型の支払いははがきのため、ノートを折りたたんで入れる封筒はありません。

## 詳細

### メモに収められる内容

メモ欄は常にちょうど512バイトです。より短いテキストメモは暗号化前にゼロバイトで埋められるため、すべてのメモはオンチェーンで同じサイズに見えます。

ほとんどのメモはプレーンなUTF-8テキストです。[ZIP 302](https://zips.z.cash/zip-0302)では、`0xF5`以上のバイトで始まるメモを別種のデータ用に予約しており、`0xF6`に続いてゼロが並ぶメモは「メモなし」を意味します。

トランザクション内の各シールドされた出力にはそれぞれ独自のメモが含まれるため、複数の人に支払う1つのトランザクションに、各受取人向けの異なるノートを含めることができます。

### 上級者向け

> **履歴情報。このデモは記載どおりには現在実行できません。**
>
> 以下のデモではzcashdを使用しており、その[受信スクリプト](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh)は`zcash-cli`を通じてメモを読み取ります。zcashdは2026年7月18日に自動サポート終了となったため、このスクリプトは稼働中のノードに接続できず、移植もされていません。
>
> コマンドラインからシールドされたメモを読む機能は、Zalletでは現在も動作します。`zallet rpc z_listunspent`は、スクリプトが読み取るのと同じ`memoStr`フィールドを含め、受信した各シールドされたノートを返します。コマンドについては[Zalletクイックリファレンスガイド](/using-zcash/zallet-quick-reference-guide)を、ノードをzcashdから移行する方法については[ZebraおよびZallet](/guides/migration-guide-zcashd-to-zebrad-zallet)への移行ガイドを参照してください。Zalletは現在もベータ版です。
>
> このセクションは、Magic-Wormholeデモの履歴記録として残されています。

Zcashシールドされたメモを、Magic-Wormhole CLIおよびzcashdとともに使用して、あるコンピューターから別のコンピューターへファイルを安全に送信する方法を紹介します。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="デモ：Zcashを使用した暗号化ファイル転送 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 関連ページ

- [支払いリクエストURI](/using-zcash/payment-request-uris): `zcash:`リンクまたはQRコードにメモを入れます。
- [トランザクション](/using-zcash/transactions): シールドされたトランザクションと公開型トランザクションの種類です。
- [シールドされたプール](/using-zcash/shielded-pools): メモを保持するシールドされたノートが存在する場所です。
- [ウォレット](/using-zcash/wallets): メモをサポートするウォレットを見つけるには、シールドされたメモフィルターを使用します。
- [Zalletクイックリファレンスガイド](/using-zcash/zallet-quick-reference-guide): コマンドラインから受信したメモを読み取ります。
- [Zcashクリエイター向けツール](/using-zcash/creators-and-tips): チップとともにメッセージを送るチップツールです。

### リソース

[暗号化されたメモ欄](https://electriccoin.co/blog/encrypted-memo-field/)

**最終更新:** 2026年10月
