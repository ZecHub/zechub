<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Overwinter

> Overwinterは、Zcashのメインネットでブロック347,500（2018年6月26日 UTC）に稼働開始しました。

ここで得られること：Zcashが自身のルールを安全に変更する方法を学んだ経緯と、その基盤によってSaplingから始まる以後のすべてのアップグレードが可能になった理由です。

Overwinterは、ネットワーク開始後初となるZcash[ネットワークアップグレード（network upgrade）](../start-here/network-upgrades)です。これは複数のZcash改善提案によって定義されています：[ZIP 200](https://zips.z.cash/zip-0200)、[ZIP 201](https://zips.z.cash/zip-0201)、[ZIP 202](https://zips.z.cash/zip-0202)、[ZIP 203](https://zips.z.cash/zip-0203)、および[ZIP 143](https://zips.z.cash/zip-0143)です。Overwinterは新しいシールドされた機能を追加しませんでした。代わりに、将来のアップグレードを安全に実施できるようプロトコルを強化しました。このアップグレードは、公式のZcashアップグレードページにある[Electric Coin Company](../zcash-organizations/electric-coin-company)で文書化されています。

これが重要である理由です。稼働中のブロックチェーンのルールを変更することは危険です。誤ると、ネットワークの2つのバージョンで認識が一致しなくなったり、あるチェーン向けのトランザクションが別のチェーンで複製されたりする可能性があります。Overwinter以前、Zcashにはルール変更を調整するための標準的でリプレイ安全な方法がありませんでした。Overwinterがこれを解決しました。これによりZcashにはアップグレードの正式なプロセスが与えられ、同様に重要なこととして、双方向リプレイ保護も提供されました。そのため、あるルールセットで有効なトランザクションを別のルールセットでリプレイすることはできません。この基盤により、Saplingとその後のすべてのアップグレードを円滑に有効化できるようになりました。

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](/content-images/overwinter-before-after-acf4f5d283.webp)

## アップグレードの仕組み

Overwinterは、[ZIP 200](https://zips.z.cash/zip-0200)で定義されたネットワークアップグレード機構を導入しました。現在、すべてのアップグレードでは2つの事項を定義します。すなわち、現在のルールセットを識別するコンセンサスブランチIDと、新しいルールが有効になるブロックである有効化高です。これにより、Zcashソフトウェアを実行しているすべての人は、切り替え前に明確な更新期間を得られます。

Overwinter自体は、メインネットのブロック347,500で有効化されました。

[ZIP 201](https://zips.z.cash/zip-0201)は、アップグレード前後にノードが互いをどのように扱うかを定めています。有効化前、ノードは同じバージョンを実行しているピアへの接続を優先します。有効化時、ノードは異なるコンセンサスブランチにあるピアとの接続を切断します。これにより、ネットワークは混乱するのではなく、新しいルールに沿って明確に分かれます。

## リプレイ保護

リプレイとは、誰かがあるチェーンで有効だったトランザクションを別のチェーンで再ブロードキャストすることです。Overwinterは、[ZIP 143](https://zips.z.cash/zip-0143)で定義された新しい署名方式によって、この可能性をなくします。ウォレット（Wallet）がトランザクションに署名するとき、その署名は現在のチェーンのコンセンサスブランチIDにコミットするようになりました。あるブランチ用に署名されたトランザクションは、逆方向も含め、他のどのブランチでも有効ではありません。これが双方向リプレイ保護の意味です。

これは、[ZIP 202](https://zips.z.cash/zip-0202)による新しいバージョン3トランザクション形式（Overwintered形式とも呼ばれます）と連携します。これは、トランザクションがどのコンセンサスルールセットに属するかを明確にするfOverwinteredフラグとバージョングループIDを追加します。副次的な利点として、新しい署名方式は公開型トランザクションの検証速度も改善しました。

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](/content-images/overwinter-replay-flow-754ec8578a.webp)

## トランザクションの有効期限

[ZIP 203](https://zips.z.cash/zip-0203)はトランザクションの有効期限を追加しました。トランザクションは有効期限となるブロック高を設定できるようになりました。その高までにマイニングされなかった場合、ノードは未確認トランザクションの待機場所であるメンプールから削除します。これ以前は、トランザクションが長期間未確認のまま留まる可能性がありました。有効期限により、滞留したトランザクションは最終的に自動的に解消されます。これにより、利用者の不確実性が減り、メンプールが古い未マイニングのトランザクションで埋まることも防げます。

## 位置づけ

Overwinterは、2016年10月のメインネット開始後、Zcashにおける最初のネットワークアップグレードであり、Saplingに先立って意図的に実施されました。その役割は機能ではなくインフラストラクチャでした。まずアップグレード機構とリプレイ保護の仕組みを導入することで、以後のすべてのアップグレード（Sapling、Blossom、Heartwood、Canopy、NU5、およびその後のもの）に安全な有効化経路を与えました。

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](/content-images/overwinter-timeline-689d9bcf20.webp)

## 用語集

| 用語 | 平易な意味 |
|---|---|
| Network upgrade (NU) | Zcashのコンセンサスルールに対する協調的な変更で、指定されたブロック高で有効化されます |
| Consensus branch id | 現在のコンセンサスルールセットを識別する短いIDです |
| Activation height | ネットワークアップグレードの新しいルールが有効になるブロックです |
| Replay protection | あるチェーンで有効なトランザクションが別のチェーンで再利用されることを防ぐルールです |
| Mempool | ブロードキャスト済みであるものの、まだブロックにマイニングされていないトランザクションのプールです |
| Transaction expiry | 未マイニングのトランザクションが削除される、有効期限となるブロック高です |

## よくある質問

Overwinterは私のZECやプライバシーを変更しましたか？ いいえ。Overwinterは新機能を追加せず、シールドされたトランザクションにも触れていません。これは将来の安全なアップグレードのための基盤でした。あなたの資金とプライバシーには影響がありませんでした。

OverwinterはSaplingやシールドされたアドレスを追加しましたか？ いいえ。Overwinterはシールドされた機能を追加していません。後にSaplingを安全に有効化できるよう、基盤を整えました。

コンセンサスブランチIDとは何ですか？ これは現在のルールセットを識別する短いラベルです。トランザクションは署名時にこれにコミットするため、Zcashにリプレイ保護がもたらされます。

なぜ6月25日とする情報源と6月26日とする情報源があるのですか？ Overwinterは2018年6月26日01:37 UTCに有効化されました。これはUTCでは真夜中を過ぎた直後であるため、多くの西側の時間帯では現地時刻がまだ6月25日でした。同じブロックであり、同じ瞬間です。

トランザクションの有効期限は何のためにありますか？ これは、決してマイニングされないトランザクションが永久に残らないことを意味します。有効期限高の後、ノードはそれを削除するため、滞留した支払いについて推測し続ける必要がありません。

何かする必要はありますか？ いいえ。Overwinterは2018年に有効化されました。現在のZcashウォレットまたはノードは、すでにこれらのルールに従っています。

## 理解度を確認しましょう

Overwinterは新しいシールドされた機能を追加しませんでした。それでも、なぜZcashの歴史において最も重要なアップグレードの1つと考えられているのでしょうか？

<details>
<summary>回答</summary>

これは、以後のすべてのアップグレードが依存する仕組みを構築したためです。Overwinterはネットワークアップグレード機構と双方向リプレイ保護を導入し、Zcashにコンセンサスルールを変更するための標準的で安全な方法を与えました。この基盤がなければ、Saplingとその後のアップグレードを円滑に有効化することはできませんでした。
</details>

### リソース

[ZIP 200：ネットワークアップグレード機構](https://zips.z.cash/zip-0200)

[ZIP 201：Overwinter](https://zips.z.cash/zip-0201)のためのネットワークピア管理

[ZIP 202：Overwinter](https://zips.z.cash/zip-0202)のためのバージョン3トランザクション形式

[ZIP 203：トランザクションの有効期限](https://zips.z.cash/zip-0203)

[ZIP 143：Overwinter](https://zips.z.cash/zip-0143)のためのトランザクション署名検証

[Overwinterネットワークアップグレード](https://z.cash/upgrade/overwinter/)

### 関連項目

[Zcashネットワークアップグレード](../start-here/network-upgrades)

[シールドされたプール](../using-zcash/shielded-pools)

[フルノード](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[ZECとは何か、およびZcash](../start-here/what-is-zec-and-zcash)

---

シリーズ：[ネットワークアップグレード索引](../start-here/network-upgrades) · 前：[Sprout](../zcash-tech/sprout) · 次：[Sapling](../zcash-tech/sapling)
