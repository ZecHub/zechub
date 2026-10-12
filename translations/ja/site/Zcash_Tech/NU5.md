<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# NU5

> NU5 は、ブロック1,687,104（2022年5月31日 UTC）でZcashのメインネットに導入されました。

学べること：NU5が、トラステッドセットアップを必要としない新しいシールドプールと、プールをまたいで利用できる単一のアドレスタイプをZcashにもたらした方法。

NU5（Network Upgrade 5）は、[ZIP 252](https://zips.z.cash/zip-0252)によって導入された、6番目のZcash[ネットワークアップグレード](../start-here/network-upgrades)です。これは主要な暗号技術アップグレードです。Halo 2証明システム上に構築されたOrchardシールド決済プロトコルと、統合アドレスおよび新しいバージョン5トランザクション形式が導入されました。NU5は、Electric Coin Companyのzcashd v5.0.0リリースで提供されました。

これが重要な理由。シールドプールの信頼性は、それを作成したセットアップの信頼性に左右されます。Zcashの最初の2つのシールドプールであるSproutとSaplingは、それぞれ秘密パラメータを生成するために一度限りのトラステッドセットアップセレモニーを必要としました。これらのパラメータが破棄されずに保持されていた場合、誰にも気付かれることなく偽造ZECを発行できた可能性があります。NU5のOrchardプールは、そのようなセレモニーを必要としないHalo 2証明システムを使用することで、この懸念を解消します。

## トラステッドセットアップ

Orchardは、NU5によって導入され、[ZIP 224](https://zips.z.cash/zip-0224)で定義されたシールドプロトコルです。これは、PallasおよびVesta曲線サイクル上でPLONKish算術化と呼ばれる技術を用いるHalo 2証明システムに基づいています。実用上の利点は明快です。Halo 2はトラステッドセットアップも構造化参照文字列も必要としないため、悪用され得る秘密パラメータが存在しません。

SproutとSaplingはどちらもトラステッドセットアップに依存していました。人々のグループが各プールのパラメータを作成するセレモニーを実施し、そのうち少なくとも1人が自分の秘密の断片を破棄したことを全員が信頼する必要がありました。Orchardはこの前提を取り除きます。NU5後も古いプールは存在するため、セットアップ不要の保証はOrchardプールで保有する資金に適用されます。

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## NU5が変更したこと

NU5は複数のコンセンサス変更をまとめたもので、すべてブロック1,687,104で同時に有効化されました。

1. 上述のHalo 2ベースのプロトコルである、Orchardシールドプール（ZIP 224）を追加しました。
2. バージョン5トランザクション形式（ZIP 225）を追加しました。これは、透明、Sapling、新しいOrchardデータ用に個別の領域を持つ再構成されたレイアウトです。Sproutフィールドは削除され、古いバージョン4形式は有効化後も有効なままでした。
3. 次節で扱うUnified Addressesと統合ビューイングキー（ZIP 316）を導入しました。
4. トランザクション識別子の非可鍛性（ZIP 244）を採用しました。これは、トランザクションが行うことと、それを認可する証明および署名を分離する、新しいトランザクションID計算方法です。
5. 非標準エンコーディングを排除し、有効なトランザクションと見なされるものの規則を厳格化するため、正規Jubjub点エンコーディング（ZIP 216）を採用しました。
6. ピアツーピアネットワーク全体でバージョン5トランザクションの中継を有効にしました（ZIP 239）。

NU5はまた、新しいOrchardプールを考慮するよう、既存の多数のZIP（32、203、209、212、213、221、401）を更新しました。

## Unified Addresses

NU5以前は、各プールに独自のアドレスタイプがあり、送信者はあなたが望む種類を知る必要がありました。[ZIP 316](https://zips.z.cash/zip-0316)で定義されたUnified Addressesは、これを変更します。単一のUnified Addressは複数のプールの受信者をまとめられるため、送信者のウォレットは対応している最適なものを選ぶだけです。

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

統合ビューイングキーも、閲覧について同じように機能します。アドレスが対象とするプール全体に対する読み取り専用の可視性を提供します。詳細は、[Viewing Keys](../zcash-tech/viewing-keys)ページをご覧ください。

## NU5の位置付け

NU5は、Zcashのそれ以前のアップグレード、Overwinter、Sapling、Blossom、Heartwood、Canopyに続くものです。2022年5月31日にメインネットで有効化されました。Orchardの曲線サイクルは、後のスケーリング作業の基盤となる再帰をサポートするため選択されました。NU5は、Orchardプールを基盤とし、後にそれを修正したNU6およびNU6.x系アップグレードの直接の前身です。

## 用語集

| 用語 | 平易な意味 |
|---|---|
| Network upgrade (NU) | 設定されたブロック高で有効化される、Zcashのコンセンサスルールに対する協調的な変更 |
| Orchard | NU5が導入した、Halo 2証明システム上に構築されたシールドプール |
| Halo 2 | トラステッドセットアップを必要としない、Orchardの背後にある証明システム |
| Trusted setup | プールの秘密パラメータを作成する一度限りのセレモニーであり、その破棄を信頼する必要があるもの |
| Unified Address | 複数のプールの受信者をまとめられる単一のアドレス（ZIP 316） |
| Consensus branch id | トランザクションがどのルールセットに属するかを示す識別子 |

## FAQ

NU5は私のZECやプライバシーを変更しますか？ いいえ。NU5は新しいシールドプールと新しいアドレス形式を追加しました。既存のZECには影響がなく、プライバシーが低下することもありません。資金をOrchardへ移すことで、トラステッドセットアップを必要としないプールを利用できます。

Orchardとは何ですか？ Orchardは、NU5によって導入されたZcashのシールドプロトコルです。Halo 2証明システム上で動作するため、トラステッドセットアップセレモニーを必要としません。

何かする必要がありますか？ いいえ。対応ウォレットがNU5を処理します。引き続き古いアドレスを使用でき、ウォレットが対応すればUnified Addressesを使い始めることもできます。

統合アドレスとは何ですか？ 複数のプールの受信者を保持できる単一のアドレスです。送信者のウォレットが対応するプールを選ぶため、種類ごとに異なるアドレスを配布する必要はありません。

NU5は古い資金からトラステッドセットアップを取り除きますか？ 遡及的には取り除きません。Orchardはトラステッドセットアップを必要としませんが、Saplingプールの以前のパラメータはNU5後も存在します。セットアップ不要の保証は、Orchardプールで保有する資金に適用されます。

古いトランザクション形式は機能しなくなりましたか？ いいえ。NU5はバージョン5形式を追加し、古いバージョン4形式は有効化後も有効なままでした。

## 理解度を確認する

SproutとSaplingはどちらもトラステッドセットアップセレモニーを必要としていました。NU5のOrchardプールはそれをどのように変え、なぜ重要なのでしょうか？

<details>
<summary>回答</summary>

Orchardは、トラステッドセットアップも構造化参照文字列も必要としないHalo 2証明システム上に構築されています。これにより、残存する秘密パラメータがZECの偽造に使われる可能性を排除します。この保証はOrchardプールで保有する資金に適用されます。古いSaplingパラメータはNU5後も存在します。
</details>

### リソース

[ZIP 252：NU5 Network Upgradeの導入](https://zips.z.cash/zip-0252)

[ZIP 224：Orchardシールドプロトコル](https://zips.z.cash/zip-0224)

[ZIP 225：バージョン5トランザクション形式](https://zips.z.cash/zip-0225)

[ZIP 316：Unified AddressesとUnified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company：zcashd 5.0.0リリース](https://electriccoin.co/blog/new-release-5-0-0/)

### 関連項目

[Zcashネットワークアップグレード](../start-here/network-upgrades)

[シールドプール](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

シリーズ：[ネットワークアップグレード索引](../start-here/network-upgrades) · 前：[Canopy](../zcash-tech/canopy) · 次：[NU6](../zcash-tech/nu6)
