<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Zakuraノード（Node）

Zakuraは、Zcash向けに構築された、スケールに対応する無料のオープンソースのフルノード実装です。[Zebra](Zebra_Full_Node.md)からフォークされ、**Valar Group**と**Project Tachyon**の協力によって開発されました。Zakuraは、同期の大幅な高速化、ネイティブなブロック削除、従来の`zcashd`ツールとの互換レイヤーを提供します。バージョン1.0.0は2026年7月15日にリリースされました。その後もリリースは迅速に続き、1.7.0（2026年10月22日）ではMainnetでNU7が有効になり、11月には1.8シリーズが続きました。

---

## 要約

- Zakuraは**コンセンサス互換のZcashフルノード**で、Zebraやzcashdに代わるものとしてZebraからフォークされました。
- ブロックチェーンの同期はZebraより約**5倍高速**で、スナップショットからのブートストラップは**2分未満**で完了します。
- **ネイティブのブロックプルーニング**により、運用者は大幅に少ないディスク容量でフルノードを実行できます（プルーニング済みスナップショットは約11 GB、完全なZebraノードは300 GB）。
- **zcashd RPC互換モード**により、既存のウォレットやインテグレーションを変更せずに利用できます。
- **実験的なP2Pトランスポート層**（デフォルトでは無効）は、DoS耐性のあるゴシップ通信による500 ms未満のブロック伝播を目指しています。
- 2026年半ばに有効化されたZcashネットワークアップグレードである**Ironwood（NU6.3）**と互換性があります。
- **NU7**に従っています。Zakura 1.7.0は、Mainnetでこれを有効化するリリースです。各リリースは公開から数週間後にサポート終了ブロックで停止するため、定期的にアップグレードする計画を立ててください（下記の「実行する前に」を参照）。
- **Zakura Common**（v1.3.0、2026年8月）は、ウォレットがプライベートトランザクションを構築する際に使う暗号処理を高速化します。Zakuraのベンチマークによると、多くの場合、3秒超から200 ms未満になります。
- **Zcashの共同創業者でProject Tachyonを率いるSean Bowe**と、**Dev Ojha**（Valar Group）が主導しています。

---

## Zakuraとは？

Zakuraは、最初から大規模な本番運用に対応できるよう設計された、Zcashフルノードです。Zebraとコンセンサス互換性を共有しているため、同じZcashプロトコルのルールを検証して従います。一方で、ZakuraはZcashフルノードの運用をより容易にするため、大幅な技術的改善を導入しています。

このプロジェクトは、**プロジェクトTachyon**（Zcashの初期の暗号技術エンジニアの1人であるSean Boweが率います）と**Valar Group**（Dev Ojhaが率います）の共同の取り組みです。両者は次世代のZcashプロトコルの改善に取り組んでおり、Zakuraがその作業の参照ノードを担っています。

---

## 主な機能

### チェーン同期が5倍高速

Zakuraは、Zebraと比べてブロックチェーンの同期が約5倍高速です。ノードをすばやく立ち上げたり、停止後に復旧させたりする必要がある運用者にとって、実用性が大きく向上します。

### スナップショットからの起動

Zakuraは、初回同期にかかる時間を大幅に短縮する、事前構築済みのチェーンスナップショットを公開しています。

| Bootstrap方式 | 時間 |
|-----------------|------|
| アーカイブスナップショット | 約37分 |
| 削除済みスナップショット | **2分未満** |
| Zebra（完全同期） | 約20時間 |

削除済みスナップショットは約**11 GB**で、ジェネシスから同期する場合と比べて、ノードの起動を**680倍高速化**できます。

### ネイティブなブロック削除

Zakuraは、保持するチェーン履歴の量をノード運用者が設定できる、ブロック削除機能に対応しています。これにより、ストレージ容量の限られたハードウェアでもフルノードを実用的に運用できます。完全な履歴を必要としないバリデーター、開発者、インフラ事業者に便利です。

### zcashd RPC互換モード

Zakuraには、従来の`zcashd` JSON-RPCインターフェースを再現する互換モードが含まれています。`zcashd` RPCに依存する既存のウォレット、取引所、統合機能は、コードを変更せずにZakuraへ切り替えられます。

### 実験的なP2Pトランスポートレイヤー

Zakuraには次世代のピアツーピアトランスポートレイヤーが搭載されていますが、現在は**デフォルトで無効**です。有効にすると、次の機能を目指します。

- ネットワーク全体で最悪の場合でも500 ms未満のブロック伝播
- トランザクション中継を効率化するメンプール集約
- ネットワークの耐障害性を高める、DoS耐性のあるゴシッププロトコル

このレイヤーは、Project Tachyonのもとで開発中の、将来的なZcashネットワークレベルの改善を先行して紹介するものです。

### Ironwood（NU6.3）への対応

Zakuraは、2026年半ばにZcashのメインネットで有効化されたIronwoodネットワークアップグレード（NU6.3）に完全対応しています。

### NU7

2026年10月22日にリリースされたZakura 1.7.0は、MainnetでNU7を有効にするリリースです（[リリースノート](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)）。アップグレード後もチェーンを追跡するには、ノードのバージョンが1.7.0以降である必要があります。[NU7](NU7.md)では、このアップグレードによる変更点を説明しています。

---

## Zakura Common：ウォレットの暗号処理を高速化

2026年8月、ZakuraチームはZakura Commonをリリースしました。これは、Zcashのウォレットやノードが利用する暗号ライブラリを高速化したフォーク群です。Zakuraはバージョン1.3.0で新しいスタックに切り替え、Vizor Walletはこれを統合した最初期のウォレットの1つです。

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Zakura独自のベンチマークによると、次のような結果が出ています。

| 処理 | 高速化率 |
|--|--|
| モバイルでのProof生成 | 14倍超（デスクトップでは5倍超） |
| Sinsemillaハッシュ処理 | 21倍超 |
| zk-SNARKの検証 | 4～8倍 |
| 試行復号 | 1.5倍超 |

ユーザーが最も実感しやすい変化は、待ち時間です。以前は、プライベートなトランザクションを構築するのにウォレットで3秒以上かかることがありました。Zakura Commonを使うと、多くの場合200 ms未満で完了します。これはデバイスがトランザクションの準備にかける時間であり、ネットワークが承認に要する時間ではありません。


---

## Zakuraと他のZcashノードとの関係

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 言語 | C++（Bitcoinからフォーク） | Rust | Rust（Zebraからフォーク） |
| 状態 | 非推奨 | 稼働中 | 稼働中（v1.0.0は2026年7月、v1.8.8は2026年11月） |
| 同期速度 | 基準 | 約1倍 | 約5倍高速 |
| ブロック削除 | いいえ | いいえ | はい |
| zcashd RPC互換性 | 標準対応 | 部分対応 | はい（互換モード） |
| スナップショットからの起動 | いいえ | いいえ | はい（2分未満） |
| 実験的なP2P | いいえ | いいえ | はい（オプトイン） |

---

## はじめに

ダウンロード方法、スナップショット、設定に関するドキュメントは、次の場所で確認できます。

- **ダウンロードとセットアップガイド：** [zakura.com/download](https://zakura.com/download/)
- **チェーンスナップショット：** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **ソースコード：** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **リリースノート：** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### ライトウォレットへのサービス提供

Zakuraはライトウォレット向けのサーバーではありません。ライトウォレットが使うgRPCプロトコルの`CompactTxStreamer`を実装していないため、Zashi（旧Zodl）などのウォレットは`zakurad`に直接接続できません。ライトウォレットにサービスを提供するには、その前段で次のいずれかを実行してください。

- [Zaino](Zaino.md)（推奨）
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer)：Zcash Labsのインデクサー兼ライトウォレットサーバーです。Zakuraノードからチェーンを読み込みます。自身のプロセスに組み込むか、JSON-RPC経由でリモートノードに接続できます。

Zakura独自のインデクサーgRPC（デフォルトでは無効の`[rpc]`セクションにある`indexer_listen_addr`）は別のインターフェースです。これは、自分で実行する信頼済みソフトウェア向けのブロック、メンプール、チェーン先端のストリームであり、ライトウォレット用のプロトコルではありません。平文通信はループバックでのみ許可され、それ以外のアドレスでは相互TLSが必要です（[設定リファレンス](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)）。

### 実行する前に

1.8リリースノートに記載されている、運用時に見落としやすい点を紹介します。

- **リリースには有効期限があります。** すべてのZakuraリリースにはサポート終了ブロック高が設定されており、そのリリースで稼働しているMainnetノードは該当ブロックで停止します。1.8.xリリースは「ブロック3,643,309までMainnetでサポートされます。日付は2026年12月3日ごろです」とされ、約3日前からアップグレード警告が表示されます（[v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)）。その日付より前に最新リリースを確認してください。また、更新計画なしに古いバージョンをスクリプトやデプロイ用テンプレートで固定しないでください。
- **1.8.0以降はx86-64 CPUが必要です。** リリースバイナリとDockerイメージはBMI2/ADX命令を使用するため、Intel Broadwell、AMD Zen以降のCPUが必要です。古いCPUでは、`zakurad`は不足している拡張命令を示すエラーとともに起動時に終了します。そのようなマシンで実行するには、`--features portable`を使ってソースからビルドしてください（[v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)）。
- **古い生成済み設定とネイティブP2P。** `zakurad generate`は以前、`peer_memory_budget_bytes = 8589934592`（8 GiB）を書き込んでいました。1.8.3以降、この設定ではネイティブP2P接続数がおよそ半分になります。また、4 GiB以下ではネイティブP2Pを実行するノードが起動しません。`[network.zakura] peer_memory_budget_bytes`を少なくとも15 GiBに引き上げるか、行を削除して新しいデフォルト値の15 GiBを使用してください（[v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)）。
- **状態ツールが`zakurad`に移動しました。** 1.8.3以降、単体の`zakura-prune-state`および`zakura-rollback-state`バイナリは、Dockerを含め、配布されなくなりました。代わりに`zakurad prune-state`と`zakurad rollback-state`を使ってください。引数は同じですが、`zakura.toml`を読み込むため、特定の状態ディレクトリを指定するには`--cache-dir`を渡してください。

---

## 関連ページ

- [Zebraフルノード](Zebra_Full_Node.md) — フォーク元となった上流のZcashフルノードZakuraです。
- [Zainoインデクサー](Zaino.md) — ZebraおよびZakuraに対応する、Rustベースのインデクサーです。
- [フルノード](Full_Nodes.md) — Zcashのフルノードの選択肢を紹介します。
- [ライトウォレットノード](Lightwallet_Nodes.md) — 軽量クライアントの選択肢を紹介します。

## リソース

- [Zakuraの紹介 — 発表](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakuraウェブサイト](https://zakura.com/)
- [Zakura、X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Commonの発表](https://zakura.com/announcements/zakura-common/)
