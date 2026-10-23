<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# メモ

## TL;DR

* メモは、シールドアドレスへ送る支払いに添付できる短いメモです。暗号化されているため、ブロックチェーンを監視する人は読むことができません。
* メモ欄には最大512バイトのテキストを格納できます。
* メモは、誰が支払いを送ったか、何のための支払いかを伝えたり、プライベートメッセージを送ったりするために使われます。
* トランスペアレントアドレスへの支払いにはメモを付けられません。
* [支払いリクエストリンク](/using-zcash/payment-request-uris)ではメモをあらかじめ入力できるため、店舗は各注文にタグを付けられます。

## 基本解説

### 暗号化メモの送信

Z2Z（シールド間）トランザクションを送信する際、トランザクションにメモ（メッセージ）を含めることができます。このメモは、いくつかの異なる用途に使用できます。

### トランザクションへの署名

メモは主に支払いへの署名に使われます。シールドトランザクションではデータが暗号化されるため、誰があなたにZECを送ったのか、またZECが何のためのものだったのかを見ることはできません。ユーザーはメモ欄に自分の名前または仮名を署名し、取引相手にトランザクションの送信者を知らせることができます。また、トランザクションの目的を説明することもできます。

### メッセージの送信

暗号化メモのもう一つの用途は、z-addrを持つ相手にメッセージを送ることです。これらのメッセージは、[友人へのリマインダー](https://twitter.com/iansagstette/status/1542142468505870336)から、[可能な限りプライベートに保つ必要がある機密メッセージ](https://twitter.com/InsideZcash/status/1545800146352578560)まで、どのような内容でも構いません。

### ブロックチェーン上のラブレター

Zcashブロックチェーンの初期ブロックの一つで、パートナーにラブレターを送った人がいました。ある人は、パートナーがZcashメモを通じてファイルを送っていたことを発見しました。このファイルは、彼女と遠距離の恋人が一緒に参加しようと話していた海外の特別なイベントのチケットでした。そのメモはラブレターだったのです。

## 視覚化 / たとえ

シールド支払いを、中にお金が入った封筒だと考えてください。メモは、お金と一緒に封筒へ折り込まれた手紙です。

ブロックチェーンは郵便局です。封筒を運び、届いたことを記録しますが、決して開封しません。封筒を開ける人が手紙を読みます。トランスペアレントな支払いははがきなので、手紙を折り込む封筒はありません。

## 詳細解説

### メモに収められる内容

メモ欄は常にちょうど512バイトです。短いテキストメモは暗号化前にゼロバイトで埋められるため、オンチェーンではすべてのメモが同じサイズに見えます。

ほとんどのメモはプレーンなUTF-8テキストです。[ZIP 302](https://zips.z.cash/zip-0302)では、先頭が`0xF5`以上の1バイトで始まるメモも、別種のデータ用に予約されています。また、`0xF6`の後にゼロが続くメモは「メモなし」を意味します。

トランザクション内の各シールド出力にはそれぞれ固有のメモが含まれるため、複数の人に支払う一つのトランザクションでは、各人に異なるメモを添えることができます。

### 上級

> **歴史的資料。このデモは記載どおりには現在動作しません。**
>
> 以下のデモではzcashdを使用しており、その[受信スクリプト](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh)は`zcash-cli`を通じてメモを読み取ります。zcashdは2026年7月18日に自動的なサポート終了を迎えたため、そのスクリプトは稼働中のノードに接続できず、移植もされていません。
>
> コマンドラインからシールドメモを読むことは、Zalletでは引き続き可能です。`zallet rpc z_listunspent`は、スクリプトが読むものと同じ`memoStr`フィールドを含む、受信した各シールドノートを返します。コマンドについては[Zallet クイックリファレンスガイド](/using-zcash/zallet-quick-reference-guide)を、ノードをzcashdから移行するには[ZebraおよびZallet](/guides/migration-guide-zcashd-to-zebrad-zallet)への移行ガイドを参照してください。Zalletは現在もベータ版です。
>
> このセクションは、Magic-Wormholeデモの歴史的記録として残されています。

Zcash Shielded MemosをMagic-Wormhole CLIおよびzcashdとともに使用し、あるコンピューターから別のコンピューターへファイルを安全に送信する方法を紹介します！

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="デモ：Zcashを使った暗号化ファイル転送 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 関連ページ

- [支払いリクエストURI](/using-zcash/payment-request-uris)：`zcash:`リンクまたはQRコードにメモを入れます。
- [トランザクション](/using-zcash/transactions)：シールドおよびトランスペアレントのトランザクション種別。
- [シールドプール](/using-zcash/shielded-pools)：メモを持つシールドノートが存在する場所。
- [ウォレット](/using-zcash/wallets)：シールドメモフィルターを使用して、メモに対応するウォレットを探します。
- [Zallet クイックリファレンスガイド](/using-zcash/zallet-quick-reference-guide)：コマンドラインから受信メモを読み取ります。
- [Zcash クリエイター向けツール](/using-zcash/creators-and-tips)：チップとともにメッセージを送るチップツール。

### リソース

[暗号化メモ欄](https://electriccoin.co/blog/encrypted-memo-field/)

**最終更新：** 2026年10月
