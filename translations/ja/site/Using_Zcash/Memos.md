<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# メモ

#### 暗号化されたメモの送信

Z2Z（シールド済みからシールド済み）取引を送るときに、取引にメモ（メッセージ）を含めることができます。このメモはさまざまな用途に使用できます。

#### 取引の署名

メモは主に支払いの署名に使われます。シールド済み取引ではデータが暗号化されるため、誰が自分にZECを送ったのか、そのZECが何の目的で使われたのかを見ることはできません。ユーザーはこのメモフィールドを使って、自分の名前や偽名を記入して、相手に取引が自分から行われたことを知らせることができます。また、取引の内容についても説明することもできます。

#### メッセージの送信

暗号化されたメモのもう一つの用途は、z-addrを持つ人にメッセージを送ることです。このメッセージは、友人への[リマインダー](https://twitter.com/iansagstette/status/1542142468505870336)や、できるだけ秘密にしたい[機密的なメッセージ](https://twitter.com/InsideZcash/status/1545800146352578560)など、何でも送ることができます。

#### ブロックチェーン上のラブレター

Zcashブロックチェーンの最初のブロックの一つに、ある人がパートナーへのラブレターを送ったことがあります。誰かがそのパートナーからZcashメモを通してファイルを受け取ったことに気づきました。このファイルは、彼女と遠く離れた恋人が一緒に参加することを話していた海外での特別なイベントのチケットでした。このメモはラブレターだったのです。

#### 高度な機能

> **歴史的資料。このデモは記載どおりには動作しません。**
>
> 以下のデモは zcashd を使用しており、付属の[受信スクリプト](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh)は `zcash-cli` を通じてメモを読み取ります。zcashd は2026年7月18日に自動的なサポート終了停止に達したため、このスクリプトは稼働中のノードに到達できず、移植もされていません。
>
> コマンドラインからのシールド済みメモの読み取りは Zallet で引き続き可能です。`zallet rpc z_listunspent` は、受信した各シールド済みノートを、スクリプトが読み取るのと同じ `memoStr` フィールド付きで返します。コマンドについては [Zallet クイックリファレンスガイド](/using-zcash/zallet-quick-reference-guide)を、ノードを zcashd から移行する方法については [Zebra と Zallet への移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)を参照してください。Zallet はまだベータ版です。
>
> このセクションは Magic-Wormhole デモの歴史的記録として残されています。

Magic-Wormhole CLIとzcashdを使ってZcashシールド済みメモを使用して、1台のコンピュータから別のコンピュータにファイルを安全に送信する方法です：

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Zcashを使用した暗号化ファイル転送 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

#### リソース

[暗号化されたメモフィールド](https://electriccoin.co/blog/encrypted-memo-field/)
