<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Zakura ノード（Node）

Zakura は、スケール対応を目的として構築された Zcash 向けの無料かつオープンソースのフルノード（full node）実装です。[Zebra](Zebra_Full_Node.md) からフォークされ、**Valar Group** と Project Tachyon の協力により開発された Zakura は、大幅に高速な同期、ネイティブのブロック（block）プルーニング、従来の `zcashd` ツール向け互換レイヤーを提供します。バージョン 1.0.0 は 2026年7月15日にリリースされました。

---

## 要約

- Zakura は、**コンセンサス（consensus）互換の Zcash フルノード**です。Zebra および zcashd の代替であり、Zebra からフォークされています。
- ブロックチェーン（blockchain）の同期は Zebra より約 **5倍高速**であり、スナップショットによるブートストラップは **2分未満**で完了します。
- **ネイティブのブロックプルーニング**により、運用者は大幅に少ないディスク容量でフルノードを実行できます（プルーニング済みスナップショットは約 11 GB、完全な Zebra ノードでは 300 GB）。
- **zcashd RPC 互換モード**により、既存のウォレット（wallet）および統合機能を変更なしで使用できます。
- **実験的な P2P トランスポートレイヤー**（デフォルトでは無効）は、DoS 耐性のあるゴシップにより 500 ms 未満のブロック伝播を目標としています。
- 2026年半ばに有効化された Zcash ネットワークアップグレード（network upgrade）である **Ironwood（NU6.3）**と互換性があります。
- **Zakura Common**（v1.3.0、2026年8月）は、ウォレットがプライベートトランザクションを構築する際に使用する暗号技術を高速化します。Zakura のベンチマークによると、多くの場合で 3秒超から 200 ms 未満へ短縮されます。
- **Sean Bowe**（Zcash の共同創設者、Project Tachyon）と **Dev Ojha**（Valar Group）が主導しています。

---

## Zakura とは何ですか？

Zakura は、大規模な本番運用に対応できるようゼロから設計された Zcash フルノードです。Zebra とコンセンサス互換性を共有しており、同じ Zcash プロトコルルールを検証して従うことを意味しますが、Zakura は Zcash フルノードの運用障壁を下げることを目的とした重要なエンジニアリング改善を導入しています。

このプロジェクトは、**Project Tachyon**（Zcash の初期暗号技術エンジニアの 1人である Sean Bowe が主導）と、**Valar Group**（Dev Ojha が主導）による共同事業です。両者は次世代の Zcash プロトコル改善に注力しており、Zakura はその作業のリファレンスノードとして機能します。

---

## 主な機能

### 5倍高速なチェーン（chain）同期

Zakura は、Zebra と比較して約 5倍高速なブロックチェーン同期を実現します。これにより、迅速にノードを立ち上げる必要がある運用者や、停止後に復旧する運用者にとって、実用性が大幅に向上します。

### スナップショットによるブートストラップ

Zakura は、初期同期時間を大幅に短縮する事前構築済みチェーンスナップショットを公開しています。

| Bootstrap 方法 | 時間 |
|-----------------|------|
| アーカイブスナップショット | 約 37分 |
| プルーニング済みスナップショット | **2分未満** |
| Zebra（完全同期） | 約 20時間 |

プルーニング済みスナップショットは約 **11 GB** であり、ジェネシスから同期する場合と比較して **680倍高速**なノードブートストラップを可能にします。

### ネイティブのブロックプルーニング

Zakura は設定可能なブロックプルーニングをサポートしており、ノード運用者は保持するチェーン履歴の量を定義できます。これにより、ストレージが限られたハードウェアでもフルノードを実用的に運用できます。完全な履歴チェーンを必要としないバリデーター、developer、インフラストラクチャプロバイダーに役立ちます。

### zcashd RPC 互換モード

Zakura には、従来の `zcashd` JSON-RPC インターフェースを再現する互換モードが含まれています。`zcashd` RPC に依存する既存のウォレット、取引所（exchange）、統合機能は、コード変更を必要とせずに Zakura へ切り替えられます。

### 実験的な P2P トランスポートレイヤー

Zakura には、次世代のピアツーピアトランスポートレイヤーが搭載されており、現在は**デフォルトで無効**です。有効にすると、次を目標とします。

- ネットワーク全体での最悪ケースのブロック伝播を 500 ms 未満にすること
- より効率的なトランザクションリレーのためのメンプール集約
- ネットワークの耐障害性を向上させる DoS 耐性のあるゴシッププロトコル

このレイヤーは、Project Tachyon のもとで開発されている将来の Zcash ネットワークレベル改善のプレビューを示しています。

### Ironwood（NU6.3）互換

Zakura は、2026年半ばに Zcash メインネットで有効化された Ironwood ネットワークアップグレード（NU6.3）と完全に互換性があります。

---

## Zakura Common：高速なウォレット暗号技術

2026年8月、Zakura チームは、Zcash のウォレットとノードが依存する暗号技術ライブラリの高速化フォーク群である Zakura Common をリリースしました。Zakura はバージョン 1.3.0 で新しいスタックに切り替え、Vizor Wallet はこれを統合した最初のウォレットの 1つです。

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Zakura 独自のベンチマークによると、次のとおりです。

| 操作 | 高速化 |
|--|--|
| モバイルでのプルーフ生成 | 14倍超（デスクトップ：5倍超） |
| Sinsemilla ハッシュ | 21倍超 |
| zk-SNARK 検証 | 4～8倍 |
| 試行復号 | 1.5倍超 |

ユーザーにとって最も目に見える変化は待ち時間です。以前はプライベートトランザクションの構築に、ウォレットで 3秒超を要していました。Zakura Common では、多くの場合で 200 ms 未満になります。これはネットワークがトランザクションを確認する時間ではなく、デバイスがトランザクションを準備する時間です。


---

## Zakura と他の Zcash ノードの関係

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 言語 | C++（Bitcoin からフォーク） | Rust | Rust（Zebra からフォーク） |
| ステータス | 非推奨 | アクティブ | アクティブ（v1.0.0、2026年7月） |
| 同期速度 | ベースライン | 約 1× | 約 5×高速 |
| ブロックプルーニング | いいえ | いいえ | はい |
| zcashd RPC 互換性 | ネイティブ | 部分的 | はい（互換モード） |
| スナップショットブートストラップ | いいえ | いいえ | はい（2分未満） |
| 実験的 P2P | いいえ | いいえ | はい（オプトイン） |

---

## はじめに

ダウンロードオプション、スナップショット、設定ドキュメントは以下で利用できます。

- **ダウンロードとセットアップガイド：** [zakura.com/download](https://zakura.com/download/)
- **チェーンスナップショット：** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **ソースコード：** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## 関連ページ

- [Zebra フルノード](Zebra_Full_Node.md) — Zakura がフォーク元となった上流の Zcash フルノード
- [Zaino インデクサー](Zaino.md) — Zebra および Zakura と互換性のある、Rust ベースのインデクサー
- [フルノード](Full_Nodes.md) — Zcash フルノードの選択肢の概要
- [ライトウォレットノード](Lightwallet_Nodes.md) — 軽量クライアントの代替手段

## リソース

- [Zakura の紹介 — 発表](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura ウェブサイト](https://zakura.com/)
- [X/Twitter 上の Zakura](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Common の発表](https://zakura.com/announcements/zakura-common/)
