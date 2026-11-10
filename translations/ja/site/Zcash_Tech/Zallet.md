<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zalletは、Rustで記述されたフルノード（full-node）のZcashウォレット（wallet）です。これは以前`zcashd`に組み込まれていたウォレットの後継です。`zcashd`が2026年7月18日、ブロック（block）高3417100でサポート終了の停止に達した後、コンセンサス（consensus）とウォレットの役割は分離されました。**Zebra**または**Zakura**がチェーン（chain）を検証し、**Zallet**が鍵を保持してノート（note）をスキャンし、ウォレットJSON-RPCを公開します。

Zalletは現在**ベータ**版です。完全なレビューはまだ実施されていません。破壊的変更により、ウォレットを削除して再作成する必要が生じる場合があります。[The Zallet Book](https://zcash.github.io/zallet/)のセキュリティ警告を読まずに、多額のZECを本番環境でカストディとして扱わないでください。

---

## 要約

- Zalletは**フルノードRPCウォレット**であり、モバイルのライトクライアント（light client）ウォレットでもコンセンサスノード（node）でもありません。
- これは`zcashd`のウォレット部分を置き換えます。ノード部分は[Zebra](Zebra_Full_Node.md)または[Zakura](Zakura_Node.md)です。
- **Rust**で記述され、MIT / Apache-2.0のデュアルライセンスであり、[zcash/zallet](https://github.com/zcash/zallet)で保守されています。
- 2026年8月下旬時点の最新公開リリースは、**v0.1.0-beta.3**です。
- 2種類のバックエンドのいずれかを通じてチェーンデータと通信します。**zebra-state**（ローカル`zebrad`に対する直接`ReadStateService`）または**Zaino**です。
- **zcashd互換のJSON-RPC**サブセットを公開します。一部のメソッドは変更され、一部は意図的に省かれています。
- 鍵素材は常に**age**で暗号化（encryption）されます。トランザクション（transaction）履歴、アドレス（address）、ビューイングキー（viewing key）は`wallet.db`内に平文で保存されます。
- 1つの署名済みアーカイブに、`zallet`（ランチャー）、`zallet-zebra`、`zallet-zaino`の3つのバイナリが含まれます。
- 公式ドキュメント：[The Zallet Book](https://zcash.github.io/zallet/)。

---

## Zalletが存在する理由

`zcashd`は、Bitcoin Core由来のコンセンサスノードとウォレットを1つのプロセスにまとめていました。この設計は廃止されました。

| 役割 | 旧スタック | 現行スタック |
|------|-----------|---------------|
| コンセンサス / P2P | `zcashd` | Zebra（`zebrad`）またはZakura |
| ウォレット / 鍵 / 残高 | `zcashd` `wallet.dat` | **Zallet**（`wallet.db`） |
| ライトクライアントのインデクサー | `lightwalletd` | Zainoまたは`lightwalletd` |

ウォレットをノードから分離することには、次の意味があります。

- 鍵を移動せずにノードソフトウェアを入れ替えられます（Zebra対Zakura）。
- ウォレットのスキャンと支出権限を、個別にロックダウンできるプロセスに置けます。
- RPCのセマンティクスを、ZIP 32アカウント、統合アドレス、PCZTへと進化させられ、`zcashd`固有の挙動に固定されません。

Zalletは、以前`zcashd`をホットウォレット、取引所バックエンド、フォーセット（faucet）、またはマイニング（mining）報酬用ウォレットとして運用していた事業者向けのウォレットです。

---

## ステータス

Zalletは**ベータ**版です。

実際には、これは次を意味します。

- どのベータ版にも破壊的変更が加わる可能性があります。データディレクトリを削除してやり直す必要が生じる場合があります。
- すべての`zcashd`ウォレットRPCが移植されているわけではありません。
- 移植済みメソッドの一部は`zcashd`とはセマンティクスが異なります。統合では[altered-semantics page](https://zcash.github.io/zallet/zcashd/json_rpc.html)を読む必要があります。
- クレートは開発中であり、完全なレビューはまだ実施されていません。
- Zalletは**Rustライブラリではありません**。ライブラリとして依存する場合、保証はありません。

フィードバックは、[GitHub issues](https://github.com/zcash/zallet/issues/new)、または[Zcash R&D Discord](https://discord.gg/xpzPR53xtU)上の`#wallet-dev`チャンネルへ送ってください。

想定されるRPC表面が整った後、後の安定フェーズが計画されています。その時点で呼び出し側は、文書化されたセマンティクスの差異を含め、Zalletのメソッドへ移行することが期待されます。

---

## アーキテクチャ

Zalletは、2つのチェーンバックエンドが異なる依存関係グラフを追跡できるよう、3つのCargoワークスペースに分かれています。

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

3つのバイナリはいずれも**同じ**`wallet.db`を開きます。ランチャーは実行時にバックエンドを選択するため、切り替えのために再コンパイルする必要はありません。

典型的なデプロイメント：

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zalletは**フルノードウォレット**です。ローカルの検証ノードを必要とします。ライトクライアントではありません。ライトウォレットおよびコンパクトブロックサーバーについては、[Zaino](Zaino.md)と[Lightwallet Nodes](Lightwallet_Nodes.md)を参照してください。

Zcash Foundationの[Z3](https://github.com/ZcashFoundation/z3) composeスタックは、ZebraとZalletを一緒に実行し、外部ライトクライアント向けにオプションでスタンドアロンのZainoを実行します。

---

## アカウント、アドレス、鍵

Zalletは、`zcashd`の単一の暗黙的アカウントではなく、ZIP 32アカウントを中心に構築されています。

- 1つのウォレットは**複数のBIP 39ニーモニック**を保持できます。各ニーモニックは独立した支出ルートであり、**シードフィンガープリント**（`zip32seedfp1…`）によって識別されます。
- **アカウント**は、ZIP 32アカウントインデックスを用いてシードから導出されます。1つのZalletインスタンス内では、ローカルの**UUID**も持ちます。アカウントのポータブルな識別子は`(seedfp, account index)`です。
- アドレスは、`z_getaddressforaccount`で生成される**ZIP 316統合アドレス**です。1つのアカウントは多数の多様化アドレスを持つことができ、シールドされた（shielded）受信者はオンチェーン（on-chain）ではリンクできません。
- インポートされた支出鍵（spending key）（`z_importkey`）とウォッチ専用アドレス（`z_importaddress`）は、ニーモニックがカバーしないUUIDアカウントになります。
- 統合フルビューイングキーおよび受信ビューイングキーを含め、ビューイングキーをエクスポートおよびインポートできます（`z_exportviewingkey`、`z_importviewingkey`）。

`getnewaddress`は実装されていません。`z_getnewaccount`および`z_getaddressforaccount`を使用してください。

`keystore.require_backup`がオンの場合（`zcashd`の`walletrequirebackup`を移行した形式）、Zalletは、バックアップが確認されていないニーモニックから新しい支出権限を導出することを拒否します。

---

## 暗号化とバックアップ

鍵素材は**常に**暗号化されます。暗号化なしのモードはなく、`encryptwallet` RPCもありません。その`zcashd`メソッドは完全にはサポートされていませんでした。

- セットアップにより、デフォルトパス`{datadir}/encryption-identity.txt`の**age**アイデンティティが作成されます。
- ニーモニックとインポートした支出鍵は、`wallet.db`にage暗号文として保存されます。
- データベースの残りは**暗号化されません**。誰かがファイルを取得すると、履歴、アドレス、ビューイングキーを読めます。
- アイデンティティはパスフレーズでラップできます（`generate-encryption-identity -p`）。`walletpassphrase` RPCでロック解除し、`walletlock`でロックしてください。
- アイデンティティファイルまたはそのパスフレーズを失うと、支出鍵は復元できなくなります。アイデンティティ、すべてのニーモニック、および保持する`wallet.db`のコピーを（別途暗号化して）バックアップしてください。

Zalletの実行中に`wallet.db`をコピーしても、安全なバックアップにはなりません。SQLiteの書き込みが破損する可能性があります。プロセスを停止するか、公式のオンラインバックアップコマンドを待つことを推奨します。

---

## JSON-RPC

Zalletは、Basic認証付きHTTP経由で`zcashd`ウォレットRPCのサブセットを実装します。ループバックにバインドしてください。リモート利用は暗号化トンネル経由にしてください。`rpc.allow_insecure_remote_bind`は存在しますが、安全ではありません。

`zcashd`との主な違い：

- `getwalletinfo`の残高フィールドは空です。`z_getbalances`、`z_getbalanceforaccount`、`z_gettotalbalance`を使用してください。
- 手数料は**ZIP 317**に従います。`settxfee`はありません。
- 支出の構築は**PCZT**（部分的に作成されたZcashトランザクション、ZIP 374）へ移行中です。PCZT RPCはベータ系列で導入されました。
- グローバルな**同期ロック**により、ウォレットが追いついている間、または再編成から回復している間は、残高および支出RPCがブロックされます（`ClientInInitialDownload` / `ForbiddenBySafeMode`）。

意図的に省かれたメソッドには、`createrawtransaction`、`fundrawtransaction`、`getnewaddress`、`getrawchangeaddress`、`keypoolrefill`、`importwallet`、`encryptwallet`があります。代替手段は[Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)に記載されています。

---

## はじめに

公式のインストール手順（Debianパッケージ、Docker、リリースバイナリ）は、[installation guide](https://zcash.github.io/zallet/guide/installation/index.html)にあります。リリースアーカイブは`zallet-<version>-<arch>.tar.gz`という名前で、3つのバイナリすべてを含みます。

最小限の新規ウォレット作成フロー：

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

`[indexer]`をローカルの`zebrad` JSON-RPCエンドポイントに向けてください。zebraバックエンドには`[indexer.read_state_service]`と、Zalletがチェーン状態を直接読めるようインデクサー機能を有効にしてビルドした`zebrad`も必要です。

再現可能なイメージは、[StageX](https://codeberg.org/stagex/stagex/)を使用してビルドできます（Docker 25以降、containerdイメージストア、GNU Make）。

---

## zcashdからの移行

残高を確認し、復元テストが完了するまで、旧`zcashd`データディレクトリを保持してください。

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet`は、`zcashd-import`機能を有効にしたビルドにのみ含まれます。`wallet.dat`を読み取るには、`zcashd`が使用していたバージョンである**Berkeley DB 6.2**の`db_dump`が必要です。

事業者向けの手順詳細：[Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)。

---

## Zalletと他のソフトウェアの関係

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| 種別 | フルノードRPCウォレット | シールド優先のウォレットサーバー | エンドユーザー向けウォレット | コンセンサスノード | インデクサー / lightwalletdの後継 |
| 置き換えるもの | `zcashd`ウォレット | 代替可能な`zcashd`クローンではない | モバイル/デスクトップアプリ | `zcashd`ノード | `lightwalletd` |
| ローカルノードが必要か | はい | はい（デフォルトではZebra） | いいえ（ライトクライアント） | それ自体がノードです | はい |
| zcashd RPC互換性 | 互換性のための経路として設計 | 選定された小規模なサブセットのみ | 該当なし | 部分的 / Zakura互換モード | 異なるAPI |
| カストディモデル | 事業者が`wallet.db`内で鍵を保有 | シード復元可能なサーバー | ユーザーデバイス上の鍵 | ウォレットなし | 鍵なし |

Zalletと**zecd**はいずれもZebraの前段に配置できます。`z_*`ウォレット表面と`wallet.dat`からの移行経路が必要な場合はZalletを選んでください。明確に`zcashd`クローンではないシールド優先サーバーが必要な場合はzecdを選んでください。

[zallet.io](https://www.zallet.io/)には、同じ名前を再利用した別の消費者向け製品があります。そのアプリはこのプロジェクトではありません。

---

## 関連ページ

- [Full Nodes](Full_Nodes.md) — Zebra、Zakura、および廃止された`zcashd`ノード
- [Zebra Full Node](Zebra_Full_Node.md) — ノードZalletのデフォルトバックエンドが読み取るもの
- [Zakura Node](Zakura_Node.md) — 代替の検証ノード
- [Zaino](Zaino.md) — インデクサーバックエンドおよびライトクライアントサーバー
- [zecd](ZECD.md) — librustzcash上に構築された別のウォレットサーバー設計
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md) — シールドされたウォレットがチェーンをスキャンする仕組み
- [Viewing Keys](Viewing_Keys.md)

## リソース

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet on GitHub](https://github.com/zcash/zallet)
- [Releases](https://github.com/zcash/zallet/releases)
- [JSON-RPC altered semantics](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi guide（Zebra + Zallet）](/guides/raspberry-pi-4-full-node)
- [Z3（Zebra + Zallet composeスタック）](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
