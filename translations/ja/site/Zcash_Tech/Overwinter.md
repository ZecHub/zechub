<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Overwinter

> Overwinter はブロック 347,500（2018年6月26日 UTC）で Zcash メインネットに実装されました。

この記事でわかること: Zcash がどのように自らのルールを安全に変更する方法を学んだのか、そしてその土台が Sapling をはじめとするその後のすべてのアップグレードを可能にした理由。

Overwinter は Zcash の[ネットワークアップグレード](../start-here/network-upgrades)であり、ネットワーク公開後最初のものです。これは複数の Zcash Improvement Proposals によって定義されています: [ZIP 200](https://zips.z.cash/zip-0200)、[ZIP 201](https://zips.z.cash/zip-0201)、[ZIP 202](https://zips.z.cash/zip-0202)、[ZIP 203](https://zips.z.cash/zip-0203)、そして [ZIP 143](https://zips.z.cash/zip-0143)。Overwinter は新しい shielded 機能を追加しませんでした。その代わり、将来のアップグレードを安全に実施できるようプロトコルを強化しました。このアップグレードは、公式の Zcash アップグレードページにて [Electric Coin Company](../zcash-organizations/electric-coin-company) によって文書化されています。

なぜこれが重要なのか。稼働中のブロックチェーンのルールを変更することは危険です。失敗すれば、ネットワークの2つのバージョンが食い違ったり、あるチェーン向けのトランザクションが別のチェーンで再利用されたりする可能性があります。Overwinter より前の Zcash には、ルール変更を調整するための標準化されたリプレイ安全な方法がありませんでした。Overwinter はそれを解決しました。Zcash に正式なアップグレード手順を与え、さらに重要なこととして双方向のリプレイ保護を導入しました。これにより、あるルール集合のもとで有効なトランザクションは、別のルール集合のもとでは再利用できなくなりました。この土台こそが、Sapling と、その後のすべてのアップグレードをクリーンに有効化することを可能にしたのです。

![Overwinter 前後の比較: 以前は標準的なアップグレード手段もリプレイ保護もなかった。以後は、双方向リプレイ保護と安全な将来のアップグレードを備えたネットワークアップグレード機構が導入された](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## アップグレード機構

Overwinter は、[ZIP 200](https://zips.z.cash/zip-0200) で定義された Network Upgrade Mechanism を導入しました。現在ではすべてのアップグレードが2つの要素を定義します。現在のルール集合に名前を付ける consensus branch id と、新しいルールが有効になるブロックである activation height です。これにより、Zcash ソフトウェアを実行しているすべての人にとって、切り替え前に更新するための明確な猶予期間が与えられます。

Overwinter 自体は、メインネットのブロック 347,500 で有効化されました。

[ZIP 201](https://zips.z.cash/zip-0201) は、アップグレード前後でノード同士がどのように相手を扱うかを定めています。有効化前は、ノードは同じバージョンを実行しているピアへの接続を優先します。有効化時には、ノードは異なる consensus branch にいるピアとの接続を切断するため、ネットワークは混乱することなく新しいルールに沿ってきれいに分岐します。

## リプレイ保護

リプレイとは、誰かがあるチェーンで有効だったトランザクションを別のチェーンで再送信することです。Overwinter は [ZIP 143](https://zips.z.cash/zip-0143) で定義された新しい署名方式によって、その抜け道を塞ぎます。ウォレットがトランザクションに署名するとき、その署名は現在のチェーンの consensus branch id にコミットするようになりました。ある branch 向けに署名されたトランザクションは、どちらの方向であっても他の branch では単純に無効です。これが双方向リプレイ保護の意味です。

これは [ZIP 202](https://zips.z.cash/zip-0202) の新しいバージョン3トランザクション形式と連動して機能します。この形式は Overwintered format と呼ばれることもあります。ここでは fOverwintered フラグと version group id が追加され、トランザクションがどの consensus ルール集合に属するのかが明確になります。副次的な利点として、この新しい署名方式は transparent トランザクションの検証速度も改善しました。

![リプレイ保護の仕組み: ウォレットは現在の consensus branch id にコミットするトランザクションに署名するため、そのトランザクションは他のどの branch でもリプレイできない](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## トランザクション有効期限

[ZIP 203](https://zips.z.cash/zip-0203) はトランザクション有効期限を追加しました。トランザクションは有効期限となるブロック高を設定できるようになりました。その高さまでに採掘されなければ、ノードは未確認トランザクションの待機場所である mempool からそれを削除します。これ以前は、トランザクションが長時間未確認のまま残ることがありました。有効期限によって、詰まったトランザクションはいずれ自然に消えるため、利用者の不確実性が減り、古くて未採掘のトランザクションで mempool が埋まるのも防げます。

## どこに位置づけられるのか

Overwinter は、2016年10月のメインネット公開後に行われた最初の Zcash ネットワークアップグレードであり、意図的に Sapling に先行して実装されました。その役割は機能追加ではなく、インフラ整備でした。まずアップグレード機構とリプレイ保護の仕組みを導入することで、その後のあらゆるアップグレード（Sapling、Blossom、Heartwood、Canopy、NU5、そしてそれ以降）に安全な有効化の経路を与えたのです。

![2016年10月の Sprout 公開から、アップグレードの枠組みが存在しなかった 2016年から2018年の期間を経て、2018年6月の Overwinter に至るタイムライン](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## 用語集

| 用語 | わかりやすい意味 |
|---|---|
| Network upgrade (NU) | Zcash のコンセンサスルールに対する調整された変更で、設定されたブロック高で有効化されるもの |
| Consensus branch id | 現在のコンセンサスルール集合に名前を付ける短い識別子 |
| Activation height | ネットワークアップグレードの新しいルールが有効になるブロック |
| Replay protection | あるチェーンで有効なトランザクションが別のチェーンで再利用されるのを防ぐルール |
| Mempool | ブロードキャスト済みだがまだブロックに採掘されていないトランザクションの集まり |
| Transaction expiry | 未採掘のトランザクションが削除される期限のブロック高 |

## FAQ

Overwinter は私の ZEC やプライバシーを変えたのですか？ いいえ。Overwinter は新機能を追加しておらず、shielded トランザクションにも手を加えていません。これは将来のアップグレードを安全に行うための配管のような基盤でした。あなたの資金やプライバシーには影響ありませんでした。

Overwinter は Sapling や shielded アドレスを追加したのですか？ いいえ。Overwinter は shielded 機能を追加していません。後に Sapling を安全に有効化できるよう、土台を整えただけです。

consensus branch id とは何ですか？ これは現在のルール集合に名前を付ける短いラベルです。トランザクションは署名時にこれにコミットし、それが Zcash にリプレイ保護を与えています。

なぜ 6月25日 と書く資料もあれば 6月26日 と書く資料もあるのですか？ Overwinter は 2018年6月26日 01:37 UTC に有効化されました。これは UTC では深夜直後なので、多くの西側のタイムゾーンでは現地時刻がまだ 6月25日 だったからです。同じブロックであり、同じ瞬間のことです。

トランザクション有効期限は何の役に立つのですか？ これは、いつまでも採掘されないトランザクションが永遠に残り続けないことを意味します。有効期限のブロック高を過ぎると、ノードがそれを削除するため、詰まった支払いについて延々と推測し続ける必要がなくなります。

何かする必要はありますか？ いいえ。Overwinter は 2018年に有効化されました。現在の Zcash ウォレットやノードは、どれもすでにこれらのルールに従っています。

## 理解度チェック

Overwinter は新しい shielded 機能を何も追加しませんでした。では、なぜ Zcash の歴史の中で最も重要なアップグレードのひとつと考えられているのでしょうか？

<details>
<summary>答え</summary>

なぜなら、以後のすべてのアップグレードが依存する仕組みを構築したからです。Overwinter は Network Upgrade Mechanism と双方向リプレイ保護を導入し、Zcash にそのコンセンサスルールを変更するための標準的で安全な方法を与えました。この土台がなければ、Sapling やそれ以降のアップグレードはクリーンに有効化できなかったでしょう。
</details>

### リソース

[ZIP 200: Network Upgrade Mechanism](https://zips.z.cash/zip-0200)

[ZIP 201: Overwinter のためのネットワークピア管理](https://zips.z.cash/zip-0201)

[ZIP 202: Overwinter のためのバージョン3トランザクション形式](https://zips.z.cash/zip-0202)

[ZIP 203: トランザクション有効期限](https://zips.z.cash/zip-0203)

[ZIP 143: Overwinter のためのトランザクション署名検証](https://zips.z.cash/zip-0143)

[Overwinter ネットワークアップグレード](https://z.cash/upgrade/overwinter/)

### あわせて読む

[Zcash ネットワークアップグレード](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[フルノード](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[ZEC と Zcash とは何か](../start-here/what-is-zec-and-zcash)

---

シリーズ: [ネットワークアップグレード一覧](../start-here/network-upgrades) · 前: [Sprout](../zcash-tech/sprout) · 次: [Sapling](../zcash-tech/sapling)
