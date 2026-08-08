---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# トランザクション

ZEC は支払いに広く使われているデジタル資産であり、強力なプライバシー機能を備えているため、友人への支払い、買い物、寄付など、さまざまな取引に適しています。プライバシーとセキュリティを最大限に高めるには、Zcash 内で異なる種類のトランザクションがどのように機能するかを理解することが不可欠です。

## TL;DR

- Zcash は 2 種類のトランザクションをサポートしています。詳細を非公開に保つ **shielded** と、公開記録される **transparent** です。
- shielded アドレスは `u` または `z` で始まります。transparent アドレスは `t` で始まり、Bitcoin アドレスによく似た挙動をします。
- どの支払いでも選ぶのはあなたです。プライバシーは、他人があなたのために決める設定ではなく、Zcash があなたに与える選択肢です。
- 取引所からの出金は、人々が最もプライバシーを失いやすい場面です。取引所が transparent 出金しかサポートしていない場合は、着金後に自分で資金を shield してください。
- 手数料は [ZIP 317](https://zips.z.cash/zip-0317) に従い、トランザクションのサイズに応じて増加します。古い固定手数料をまだ送信しているウォレットでは、トランザクションが遅延することがあります。

## Shielded Transactions

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

shielded トランザクションは、ZEC をあなたの shielded ウォレットに移動するときに発生します。あなたの shielded ウォレットアドレスは U または Z で始まります。shielded トランザクションを送信することで、あなた自身と取引相手は、他の P2P 支払いネットワークでは不可能なレベルのプライバシーを維持できます。shielded トランザクションの送信はとても簡単で、確認すべきことは 2 つだけです。1 つ目は、正しい種類のウォレットを使っていることです。正しい種類のウォレットを使っていることを確実にする最も簡単な方法は、[ウォレット](https://zechub.wiki/wallets) をダウンロードすることです。2 つ目の重要な点は、ZEC を shielded ウォレットに移すことです。取引所から ZEC を出金するときは、その取引所が shielded 出金と transparent 出金のどちらをサポートしているかを知っておく必要があります。shielded 出金をサポートしているなら、単純にあなたの shielded アドレスへ ZEC を出金できます。取引所が transparent 出金しかサポートしていない場合は、YWallet を使い、受け取った後に ZEC を autoshield する必要があります。資金の送受信に shielded トランザクションだけを使うことが、プライバシーを維持し、データ漏えいのリスクを減らす最善の方法です

## Transparent Transactions

transparent トランザクションも同様に機能しますが、プライバシー保護がないため、トランザクションの詳細がブロックチェーン上で公開されます。プライバシーを重視する場合、transparent トランザクションは避けるべきです。注: transparent ウォレットは、トランザクションの複雑さに比例した手数料を要求する ZIP-317 により問題が発生する場合があります。デフォルト手数料では拒否や遅延につながることがあり、手数料のカスタマイズが重要になります。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## シンプルなイメージ

transparent トランザクションは絵はがきです。郵便配達人はそれを配達しますが、途中でそれを扱う人なら誰でも、メッセージを読み、誰が送ったのか、誰が受け取るのかを見ることができます。

shielded トランザクションは封をした封筒です。郵便サービスは、実際の切手が貼られた本物の手紙がシステムを通過したことを依然として確認でき、誰もそれを偽造したり、同じ手紙を二度送ったりすることはできません。封筒の中身は、送信者と受信者の間だけに留まります。

重要なのは、Zcash では支払いごとにどちらを送るかを自分で決められることです。

## Transparent Transactions の手数料管理

ZIP-317 のガイダンス: 手数料構造はトランザクションの複雑さに応じて増加するため、標準の 0.00001 ZEC 手数料を超えた調整が必要です。
計算例: シンプルな 1 ノートのトランザクションでは 0.0001 ZEC の手数料が必要な場合があり、ノートが 1 つ増えるごとにおおよそ 0.00005 ZEC ずつ増加します。

ウォレットでの手数料編集

Trust Wallet: トランザクション作成中にギアアイコンをタップすると詳細設定にアクセスできます。トランザクション失敗を避けるため、Miner Tip Gwei と Max Fee Gwei の項目を慎重に調整してください。Trust Wallet が請求するのはネットワーク手数料のみです。
Coinomi Wallet: ネットワーク状況に基づいた 3 つの動的手数料オプション Low、Normal、High を提供しています。手動で調整する場合は、サポートされているコインで Custom を選択するか、右上隅の Change Fee を使用します。ユーザーはバイト単位またはキロバイト単位で手数料を設定でき、確認時間に影響します。迷う場合は動的オプションを使うことをおすすめします。

## よくある間違い

- **ZEC を扱うと記載されているウォレットなら、どれでもプライベートに送信できると思い込むこと。** マルチコインウォレットの中には、Zcash の transparent 側しかサポートしていないものがあります。プライバシー目的で使う前に、そのウォレットがどのプールをサポートしているか確認してください。[Wallets](https://zechub.wiki/using-zcash/wallets) ページには、各選択肢についてこれが記載されています。
- **transparent アドレスに出金し、そのまま資金を置いておくこと。** 出金自体が公開され、その後そのアドレスから行われるすべての移動も公開のままです。到着したら資金を shield してください。
- **プライバシーを、一度オンにすれば済むものとして扱うこと。** 各トランザクションはそれぞれ独立した選択です。今日 shielded で送信しても、先週行った transparent 支払いが取り消されるわけではありません。
- **1 つの transparent アドレスを何にでも使い回すこと。** transparent な活動は永久に可視であるため、1 つのアドレスを使い回すと、本来つながる理由のない支払い同士が徐々に関連付けられてしまいます。
- **古いデフォルト手数料で送信すること。** ZIP 317 を採用していないウォレットは、依然として古い固定手数料を送信することがあり、その結果トランザクションが未承認のまま滞留する可能性があります。

## 注記

ZEC を使う最も安全な方法は、shielded トランザクションのみを使用することです。一部のウォレットでは [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) の実装が進行中であり、これによりユーザーや取引所は transparent アドレスと shielded アドレスをまとめて扱えるようになります。

## リソース

[ZIPS](https://zips.z.cash/)

## 関連ページ

- [ウォレット](/using-zcash/wallets) — どのウォレットが shielded 送信をサポートし、どれが transparent のみなのか
- [Shielded Pools](/using-zcash/shielded-pools) — Sapling と Orchard。あなたの shielded 資金が存在するプール
- [メモ](/using-zcash/memos) — shielded トランザクションに添付できる暗号化メッセージ
- [Transparent Exchange Addresses](/using-zcash/transparent-exchange-addresses) — TEX アドレスと、取引所がそれを使う理由
- [Custodial Exchanges](/using-zcash/custodial-exchanges) — どの取引所が shielded 出金をサポートしているか

## ZEC から ZAT へのコンバーター
