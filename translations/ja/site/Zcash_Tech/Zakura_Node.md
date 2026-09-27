<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura ノード

> 🇧🇷 [ポルトガル語版](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakuraは、スケーラビリティを考慮して構築された、Zcash向けの無料のオープンソース・フルノード実装です。[Zebra](Zebra_Full_Node.md)からフォークされ、**Valar Group**と**Project Tachyon**の共同開発によって作られたZakuraは、劇的に高速な同期、ネイティブのブロック・プルーニング、旧来の`zcashd`ツールとの互換レイヤーを提供します。バージョン1.0.0は2026年7月15日にリリースされました。

---

## 要約

- Zakuraは、**コンセンサス互換のZcashフルノード**です。Zebraおよびzcashdの代替であり、Zebraからフォークされています。
- ブロックチェーン同期はZebraより約**5倍高速**で、スナップショットによるブートストラップは**2分未満**で完了します。
- **ネイティブのブロック・プルーニング**により、運用者は大幅に少ないディスク容量でフルノードを稼働できます（プルーニング済みスナップショットは約11 GB、完全なZebraノードは300 GB）。
- **zcashd RPC互換モード**により、既存のウォレットと統合は変更なしで利用できます。
- **実験的なP2Pトランスポートレイヤー**（デフォルトでは無効）は、DoS耐性のあるゴシップを用いて500 ms未満のブロック伝播を目標としています。
- 2026年半ばに有効化されたZcashネットワークアップグレードである**Ironwood（NU6.3）**と互換性があります。
- **Zakura Common**（v1.3.0、2026年8月）は、ウォレットがプライベートトランザクションを構築する際に使う暗号処理を高速化します。Zakuraのベンチマークによれば、多くの場合で3秒超から200 ms未満になります。
- **Sean Bowe**（Zcash共同創設者、Project Tachyon）と**Dev Ojha**（Valar Group）が主導しています。

---

## Zakuraとは？

Zakuraは、大規模な本番環境での利用を前提にゼロから設計されたZcashフルノードです。Zebraとコンセンサス互換性を共有しており、同じZcashプロトコルルールを検証・追従します。一方でZakuraは、Zcashフルノードを運用するための障壁を下げることを目的とした、重要なエンジニアリング上の改善を導入しています。

このプロジェクトは、**Project Tachyon**（Zcashの初期の暗号エンジニアの一人であるSean Boweが主導）と**Valar Group**（Dev Ojhaが主導）の共同取り組みです。両者は次世代のZcashプロトコル改善に注力しており、Zakuraはその作業のリファレンスノードとして機能します。

---

## 主な機能

### 5倍高速なチェーン同期

Zakuraは、Zebraと比較して約5倍高速なブロックチェーン同期を実現します。これにより、ノードを迅速に立ち上げる必要がある運用者や、停止状態から復旧する運用者にとって、実用性が大幅に向上します。

### スナップショット・ブートストラップ

Zakuraは、初期同期時間を大幅に短縮する事前構築済みチェーンスナップショットを公開しています。

| ブートストラップ方法 | 時間 |
|-----------------|------|
| アーカイブ・スナップショット | 約37分 |
| プルーニング済みスナップショット | **2分未満** |
| Zebra（完全同期） | 約20時間 |

プルーニング済みスナップショットは約**11 GB**であり、ジェネシスから同期する場合と比べて**680倍高速な**ノードブートストラップを可能にします。

### ネイティブのブロック・プルーニング

Zakuraは設定可能なブロック・プルーニングをサポートしており、ノード運用者は保持するチェーン履歴の量を定義できます。これにより、ストレージが限られたハードウェアでもフルノードを実用的に運用できます。これは完全な過去のチェーンを必要としないバリデーター、開発者、インフラ提供者に役立ちます。

### zcashd RPC互換モード

Zakuraには、旧来の`zcashd` JSON-RPCインターフェースを再現する互換モードが含まれています。`zcashd` RPCに依存する既存のウォレット、取引所、統合は、コード変更なしでZakuraへ切り替えられます。

### 実験的なP2Pトランスポートレイヤー

Zakuraには、現在**デフォルトでは無効**になっている次世代のピアツーピア・トランスポートレイヤーが搭載されています。有効にすると、以下を目標とします。

- ネットワーク全体での最悪ケースのブロック伝播を500 ms未満にする
- より効率的なトランザクション中継のためのメンプール集約
- ネットワークの耐障害性を向上させるDoS耐性のあるゴシッププロトコル

このレイヤーは、Project Tachyonのもとで開発中の将来的なZcashネットワークレベル改善のプレビューを表しています。

### Ironwood（NU6.3）対応

Zakuraは、2026年半ばにZcashメインネットで有効化されたIronwoodネットワークアップグレード（NU6.3）に完全対応しています。

---

## Zakura Common：より高速なウォレット暗号処理

2026年8月、Zakuraチームは、Zcashウォレットおよびノードが依存する暗号ライブラリを高速化したフォーク群であるZakura Commonをリリースしました。Zakuraはバージョン1.3.0で新しいスタックに切り替え、Vizor Walletはこれを統合した最初期のウォレットの一つです。

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Zakura独自のベンチマークによると、

| 操作 | 高速化 |
|--|--|
| モバイルでの証明生成 | 14倍超（デスクトップ：5倍超） |
| Sinsemillaハッシュ | 21倍超 |
| zk-SNARK検証 | 4～8倍 |
| 試行復号 | 1.5倍超 |

ユーザーにとって最も目に見える変化は待ち時間です。プライベートトランザクションの構築には、以前はウォレットで3秒以上かかっていました。Zakura Commonでは、多くの場合200 ms未満で完了します。これはネットワークがトランザクションを確認するまでの時間ではなく、デバイスがトランザクションを準備するために費やす時間です。


---

## Zakuraと他のZcashノードの関係

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 言語 | C++（Bitcoinからフォーク） | Rust | Rust（Zebraからフォーク） |
| ステータス | 非推奨 | 稼働中 | 稼働中（v1.0.0、2026年7月） |
| 同期速度 | 基準 | 約1倍 | 約5倍高速 |
| ブロック・プルーニング | いいえ | いいえ | はい |
| zcashd RPC互換性 | ネイティブ | 部分的 | はい（互換モード） |
| スナップショット・ブートストラップ | いいえ | いいえ | はい（2分未満） |
| 実験的P2P | いいえ | いいえ | はい（オプトイン） |

---

## はじめに

ダウンロードオプション、スナップショット、設定ドキュメントは以下で利用できます。

- **ダウンロード＆セットアップガイド：** [zakura.com/download](https://zakura.com/download/)
- **チェーンスナップショット：** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **ソースコード：** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## 関連ページ

- [Zebra フルノード](Zebra_Full_Node.md) — Zakuraがフォーク元とした上流のZcashフルノード
- [Zaino インデクサー](Zaino.md) — ZebraおよびZakuraと互換性のあるRustベースのインデクサー
- [フルノード](Full_Nodes.md) — Zcashフルノードの選択肢の概要
- [ライトウォレットノード](Lightwallet_Nodes.md) — 軽量クライアントの代替手段

## リソース

- [Zakuraの紹介 — 発表](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura ウェブサイト](https://zakura.com/)
- [X/Twitter上のZakura](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Commonの発表](https://zakura.com/announcements/zakura-common/)
