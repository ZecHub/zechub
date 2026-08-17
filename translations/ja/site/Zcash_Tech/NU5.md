<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# NU5

> NU5 はブロック 1,687,104（2022年5月31日 UTC）で Zcash メインネット上で有効化されました。

ここで学べること: NU5 によって、トラステッドセットアップを必要としない新しいシールドプールが Zcash に追加され、さらにプールをまたいで使える単一のアドレスタイプが導入された仕組みを理解できます。

NU5（Network Upgrade 5）は、[ZIP 252](https://zips.z.cash/zip-0252) によって展開された、6回目の Zcash の[ネットワークアップグレード](../start-here/network-upgrades)です。これは大規模な暗号技術アップグレードでした。Halo 2 証明システム上に構築された Orchard シールド決済プロトコルに加え、Unified Address と新しいバージョン 5 トランザクション形式が導入されました。NU5 は Electric Coin Company の zcashd v5.0.0 リリースで提供されました。

これが重要な理由。シールドプールの信頼性は、それを作成したセットアップの信頼性に左右されます。Zcash の最初の 2 つのシールドプールである Sprout と Sapling は、それぞれ秘密パラメータを生成するために一度限りのトラステッドセットアップセレモニーを必要としていました。もしそのパラメータが破棄されずに保持されていた場合、誰にも気づかれずに偽造 ZEC を発行できた可能性がありました。NU5 の Orchard プールは、そのようなセレモニーを必要としない Halo 2 証明システムを使うことで、この懸念を解消します。

## トラステッドセットアップ

Orchard は、[ZIP 224](https://zips.z.cash/zip-0224) で定義された Zcash 最新のシールドプロトコルです。これは Halo 2 証明システム上に構築されており、Pallas と Vesta の曲線サイクル上で PLONKish arithmetization と呼ばれる技法を使用します。実用上の利点はシンプルです。Halo 2 はトラステッドセットアップも structured reference string も必要としないため、将来的に悪用されうる秘密パラメータが存在しません。

Sprout と Sapling はどちらもトラステッドセットアップに依存していました。各プールのパラメータを構築するために複数人がセレモニーを実行し、そのうち少なくとも 1 人が自分の秘密の断片を確実に破棄したと皆が信頼する必要がありました。Orchard はこの前提を取り除きます。NU5 後も古いプールは残るため、セットアップ不要という保証が適用されるのは Orchard プール内に保有している資金です。

![NU5 以前は、Sprout と Sapling はトラステッドセットアップセレモニーを必要としていました。NU5 以後、Orchard プールは Halo 2 システムを使用し、トラステッドセットアップを必要としません](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## NU5 で変わったこと

NU5 は複数のコンセンサス変更をまとめたもので、すべてブロック 1,687,104 で同時に有効化されました。

1. 上で説明した Halo 2 ベースのプロトコルである Orchard シールドプール（ZIP 224）を追加しました。
2. バージョン 5 トランザクション形式（ZIP 225）を追加しました。これは transparent、Sapling、新しい Orchard のデータ用に領域を分離した再構成レイアウトです。Sprout のフィールドは削除され、一方で古いバージョン 4 形式は有効化後も引き続き有効でした。
3. Unified Address と Unified Viewing Key（ZIP 316）を導入しました。これは次のセクションで扱います。
4. トランザクション識別子の非可鍛性（ZIP 244）を採用しました。これはトランザクションが何をするかと、それを認可する証明や署名を分離してトランザクション ID を計算する新しい方法です。
5. 標準外エンコーディングを排除し、有効なトランザクションとみなされる条件をより厳密にするため、canonical Jubjub point encodings（ZIP 216）を採用しました。
6. ピアツーピアネットワーク全体でバージョン 5 トランザクションのリレーを有効にしました（ZIP 239）。

NU5 はまた、既存の複数の ZIP（32、203、209、212、213、221、401）を更新し、新しい Orchard プールを考慮するようにしました。

## Unified Address

NU5 以前は、各プールごとに独自のアドレスタイプがあり、送信者は受け取り側がどの種類を望むかを知っている必要がありました。[ZIP 316](https://zips.z.cash/zip-0316) で定義された Unified Address は、これを変えます。1 つの Unified Address は複数のプール向け受信先をまとめて持つことができるため、送信者側のウォレットは自分が対応している中で最適なものを選ぶだけで済みます。

![Unified Address は複数のプール向け受信先をまとめます: transparent 受信先、Sapling 受信先、そして新しい Orchard 受信先](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Unified Viewing Key も、閲覧のために同じ考え方で機能します。これにより、そのアドレスがカバーする複数のプールにわたって読み取り専用の可視性が得られます。詳しくは、[Viewing Keys](../zcash-tech/viewing-keys) のページを参照してください。

## NU5 の位置づけ

NU5 は、Zcash のそれ以前のアップグレードである Overwinter、Sapling、Blossom、Heartwood、Canopy に続くものです。2022年5月31日にメインネットで有効化されました。Orchard の曲線サイクルは再帰をサポートするため選ばれており、これは後のスケーリング作業の基礎になります。NU5 は、Orchard プールを土台とし、その後に修正を加えた NU6 および NU6.x 系アップグレードの直接の前身です。

## 用語集

| 用語 | 平易な意味 |
|---|---|
| Network upgrade (NU) | 一定のブロック高で有効化される、Zcash のコンセンサスルールに対する協調的な変更 |
| Orchard | NU5 が導入したシールドプールで、Halo 2 証明システム上に構築されているもの |
| Halo 2 | Orchard の背後にある、トラステッドセットアップを必要としない証明システム |
| Trusted setup | プールの秘密パラメータを生成する一度限りのセレモニーで、それらが破棄されたと信頼されなければならないもの |
| Unified address | 複数のプール向け受信先をまとめられる単一のアドレス（ZIP 316） |
| Consensus branch id | トランザクションがどのルールセットに属するかを示す識別子 |

## FAQ

NU5 は私の ZEC やプライバシーを変えますか？ いいえ。NU5 は新しいシールドプールと新しいアドレス形式を追加しました。既存の ZEC には影響がなく、プライバシーが低下することもありません。資金を Orchard に移すことで、トラステッドセットアップを必要としないプールを利用できます。

Orchard とは何ですか？ Orchard は NU5 で導入された Zcash のシールドプロトコルです。Halo 2 証明システム上で動作するため、トラステッドセットアップセレモニーを必要としません。

何かする必要はありますか？ いいえ。対応ウォレットが NU5 を処理してくれます。古いアドレスをそのまま使い続けることもでき、ウォレットが対応した時点で Unified Address を使い始めることもできます。

Unified Address とは何ですか？ 複数のプール向け受信先を持てる単一のアドレスです。送信者側のウォレットが対応するプールを選ぶため、種類ごとに別々のアドレスを渡す必要がありません。

NU5 は古い資金からトラステッドセットアップを取り除きますか？ 遡っては取り除きません。Orchard にはトラステッドセットアップが不要ですが、Sapling プールの以前のパラメータは NU5 後も存在します。セットアップ不要という保証が適用されるのは Orchard プールに保有されている資金です。

古いトランザクション形式は使えなくなりましたか？ いいえ。NU5 はバージョン 5 形式を追加しましたが、古いバージョン 4 形式も有効化後に引き続き有効でした。

## 理解度チェック

Sprout と Sapling はどちらもトラステッドセットアップセレモニーを必要としていました。NU5 の Orchard プールはそれをどのように変え、なぜそれが重要なのでしょうか？

<details>
<summary>答え</summary>

Orchard は Halo 2 証明システム上に構築されており、トラステッドセットアップも structured reference string も必要としません。これにより、残存した秘密パラメータが偽造 ZEC の作成に使われるリスクがなくなります。この保証が適用されるのは Orchard プールに保有されている資金です。古い Sapling のパラメータは NU5 後も引き続き存在します。
</details>

### リソース

[ZIP 252: NU5 Network Upgrade の展開](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)

[ZIP 225: バージョン 5 トランザクション形式](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Address と Unified Viewing Key](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 リリース](https://electriccoin.co/blog/new-release-5-0-0/)

### 関連項目

[Zcash ネットワークアップグレード](../start-here/network-upgrades)

[シールドプール](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

シリーズ: [Network Upgrades 一覧](../start-here/network-upgrades) · 前: [Canopy](../zcash-tech/canopy) · 次: [NU6](../zcash-tech/nu6)
