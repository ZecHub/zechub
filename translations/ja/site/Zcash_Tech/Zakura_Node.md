<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Zakura Node

> 🇧🇷 [ポルトガル語版](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura は、スケーラビリティを重視して構築された、Zcash 向けの無料かつオープンソースのフルノード実装です。[Zebra](Zebra_Full_Node.md) からフォークされ、**Valar Group** と **Project Tachyon** の協業によって開発された Zakura は、劇的に高速な同期、ネイティブなブロック・プルーニング、そして従来の `zcashd` ツール向けの互換レイヤーを提供します。バージョン 1.0.0 は 2026 年 7 月 15 日にリリースされました。

---

## TL;DR

- Zakura は **コンセンサス互換の Zcash フルノード** であり、Zebra および zcashd の代替となる、Zebra からフォークされた実装です。
- ブロックチェーン同期は Zebra より約 **5 倍高速** で、スナップショットによるブートストラップは **2 分未満** で完了します。
- **ネイティブなブロック・プルーニング** により、オペレーターは大幅に少ないディスク容量でフルノードを運用できます（プルーニング済みスナップショットは約 11 GB、完全な Zebra ノードは 300 GB）。
- **zcashd RPC 互換モード** により、既存のウォレットや統合は変更なしで動作します。
- **実験的な P2P トランスポート層**（デフォルトでは無効）は、DoS 耐性のあるゴシップにより 500ms 未満のブロック伝播を目指しています。
- 2026 年半ばに有効化された Zcash のネットワークアップグレードである **Ironwood (NU6.3)** に対応しています。
- **Sean Bowe**（Zcash 共同創設者、Project Tachyon）と **Dev Ojha**（Valar Group）が主導しています。

---

## Zakura とは？

Zakura は、大規模な本番運用を前提としてゼロから設計された Zcash フルノードです。Zebra とコンセンサス互換性を共有しており、つまり同じ Zcash プロトコルルールを検証し追従しますが、Zakura は Zcash フルノードの運用障壁を下げることを目的とした重要なエンジニアリング上の改善を導入しています。

このプロジェクトは、**Project Tachyon**（Zcash の初期暗号技術エンジニアの一人である Sean Bowe が率いる）と **Valar Group**（Dev Ojha が率いる）の共同取り組みです。両者は次世代の Zcash プロトコル改善に注力しており、Zakura はその作業のためのリファレンスノードとして機能します。

---

## 主な機能

### 5 倍高速なチェーン同期

Zakura は、Zebra と比較して約 5 倍高速なブロックチェーン同期を実現します。これにより、ノードを迅速に立ち上げる必要があるオペレーターや、ダウンタイムから復旧する必要があるオペレーターにとって、はるかに実用的になります。

### スナップショット・ブートストラップ

Zakura は、初期同期時間を大幅に短縮する事前構築済みのチェーン・スナップショットを公開しています。

| ブートストラップ方法 | 所要時間 |
|-----------------|------|
| アーカイブ・スナップショット | 約 37 分 |
| プルーニング済みスナップショット | **2 分未満** |
| Zebra（フル同期） | 約 20 時間 |

プルーニング済みスナップショットは約 **11 GB** であり、genesis から同期する場合と比べて **680 倍高速** なノードのブートストラップを可能にします。

### ネイティブなブロック・プルーニング

Zakura は設定可能なブロック・プルーニングをサポートしており、ノードオペレーターは保持するチェーン履歴の量を定義できます。これにより、ストレージが限られたハードウェア上でもフルノードの運用が実用的になります。完全な過去チェーンを必要としないバリデーター、開発者、インフラ提供者にとって有用です。

### zcashd RPC 互換モード

Zakura には、従来の `zcashd` JSON-RPC インターフェースを再現する互換モードが含まれています。`zcashd` RPC に依存する既存のウォレット、取引所、統合は、コード変更なしで Zakura に切り替えることができます。

### 実験的な P2P トランスポート層

Zakura には次世代のピアツーピア・トランスポート層が搭載されていますが、現在は **デフォルトで無効** になっています。有効化すると、以下を目指します。

- ネットワーク全体で最悪ケースでも 500ms 未満のブロック伝播
- より効率的なトランザクション中継のためのメモリプール集約
- ネットワークの耐障害性を高める DoS 耐性のあるゴシップ・プロトコル

この層は、Project Tachyon のもとで開発されている将来の Zcash ネットワークレベル改善のプレビューを示すものです。

### Ironwood (NU6.3) 対応

Zakura は、2026 年半ばに Zcash メインネットで有効化された Ironwood ネットワークアップグレード（NU6.3）に完全対応しています。

---

## Zakura と他の Zcash ノードの関係

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 言語 | C++（Bitcoin からフォーク） | Rust | Rust（Zebra からフォーク） |
| 状態 | 非推奨 | アクティブ | アクティブ（v1.0.0、2026 年 7 月） |
| 同期速度 | 基準 | 約 1× | 約 5× 高速 |
| ブロック・プルーニング | なし | なし | あり |
| zcashd RPC 互換 | ネイティブ | 部分的 | あり（互換モード） |
| スナップショット・ブートストラップ | なし | なし | あり（2 分未満） |
| 実験的 P2P | なし | なし | あり（オプトイン） |

---

## はじめに

ダウンロード方法、スナップショット、設定ドキュメントは以下で利用できます。

- **ダウンロードとセットアップガイド:** [zakura.com/download](https://zakura.com/download/)
- **チェーン・スナップショット:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **ソースコード:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## 関連ページ

- [Zebra フルノード](Zebra_Full_Node.md) — Zakura がフォーク元とした上流の Zcash フルノード
- [Zaino Indexer](Zaino.md) — Zebra および Zakura と互換性のある Rust ベースのインデクサー
- [フルノード](Full_Nodes.md) — Zcash フルノードの選択肢の概要
- [Lightwallet ノード](Lightwallet_Nodes.md) — 軽量クライアントの代替手段

## リソース

- [Introducing Zakura — 発表](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura ウェブサイト](https://zakura.com/)
- [X/Twitter の Zakura](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
