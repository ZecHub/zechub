<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zalletは、Rustで記述されたフルノード（full-node）のZcashウォレット（wallet）です。これは以前`zcashd`に組み込まれていたウォレットの後継です。`zcashd`が2026年7月18日、ブロック（block）高3417100でサポート終了の停止に達した後、コンセンサス（consensus）とウォレットの役割は分離されました。**Zebra**または**Zakura**がチェーン（chain）を検証し、**Zallet**が鍵を保持してノート（note）をスキャンし、ウォレットJSON-RPCを公開します。

Zalletは現在**ベータ**版です。完全なレビューはまだ実施されていません。破壊的変更により、ウォレットを削除して再作成する必要が生じる場合があります。[The Zallet Book](https://zcash.github.io/zallet/)のセキュリティ警告を読まずに、多額のZECを本番環境でカストディとして扱わないでください。

---

## 要約

- Zalletは**フルノードRPCウォレット**であり、モバイルのライトウォレットでもコンセンサスノードでもありません。
- これは`zcashd`のウォレット部分を置き換えます。ノード部分は[Zebra](Zebra_Full_Node.md)または[Zakura](Zakura_Node.md)です。
- **Rust**で記述され、MIT / Apache-2.0のデュアルライセンスで、[zcash/zallet](https://github.com/zcash/zallet)で保守されています。
- 最新公開リリースは**v0.1.0-beta.4**（2026年11月2日）です。[NU7](NU7.md)に従い、`zebrad` **7.0.0以降**が必要です。
- 1つのバックエンドである**zebra**を通じてチェーンデータを読み取ります。同じホスト上にある`zebrad`のステートディレクトリに対する`ReadStateService`と、ZebraのJSON-RPCを使用します。Zainoバックエンドはv0.1.0-beta.4で削除されました。
- **zcashd互換のJSON-RPC**サブセットを公開します。一部のメソッドは変更され、一部は意図的に省かれています。
- 鍵素材は常に**age**で暗号化されます。トランザクション履歴、アドレス、ビューイングキーは`wallet.db`内に平文で保存されます。
- 1つの署名済みアーカイブに、`zallet`（ランチャー）と`zallet-zebra`の2つのバイナリが含まれます。ウォレットの同期に対応するのは**Linuxのみ**です。macOSとWindowsではチェーンバックエンドは動作しません。
- `zallet backup`（beta.4で追加）は、稼働中または停止中のウォレットの整合性のあるスナップショットを作成します。
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

ZalletはCargoワークスペースに分かれており、各チェーンバックエンドが独自の依存関係グラフを追跡できます。v0.1.0-beta.4以降はzebraバックエンドのみが同梱されています。

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

2つのバイナリはいずれも同じ`wallet.db`を開きます。v0.1.0-beta.3までは、`zallet-zaino`バックエンドもありました。`zallet.toml`に`backend = "zaino"`と書かれている場合は、`backend = "zebra"`に変更してください。ウォレットのデータベースを移行する必要はありません。また、データディレクトリにある古い`zaino`フォルダーは削除できます。

zebraバックエンドは`zebrad`の状態データベースを直接読み取るため、`indexer`機能を有効にしてビルドした`zebrad`とその状態ディレクトリが**同じホスト上**にある必要があります。ネットワーク経由で、あるコンテナ内のZalletが別のコンテナ内の`zebrad`と通信する構成は、ネットワーク専用バックエンドが導入されるまでサポートされません（[zallet#900](https://github.com/zcash/zallet/pull/900)）。

典型的なデプロイメント：

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zalletは**フルノードウォレット**です。ローカルの検証ノードを必要とします。ライトクライアントではありません。ライトウォレットおよびコンパクトブロックサーバーについては、[Zaino](Zaino.md)と[Lightwallet Nodes](Lightwallet_Nodes.md)を参照してください。

Zcash Foundationの[Z3](https://github.com/ZcashFoundation/z3)コンポーズスタックは、ZebraとZalletを組み合わせて実行し、外部のライトクライアント向けにZainoを単独で実行することもできます。固定されたイメージはNU7およびZallet beta.4より前のものです。使用前に[Z3 Stack](Z3_Stack.md)を確認してください。

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

Zalletの実行中に`wallet.db`を手動でコピーするのは、安全なバックアップ方法ではありません。SQLiteが破損する可能性があります。v0.1.0-beta.4以降は、[`backup`コマンド](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md)を使用してください。

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

実行中または停止中のウォレットについて、トランザクションと整合し、整合性を検証したスナップショットを書き出します。指定されたディレクトリ内に`zallet-wallet-backup-<UTC time>.db`という名前のファイルを作成し、既存のファイルを上書きすることはありません。ウォレットへの書き込みが絶えず続き（たとえば初回同期中）、コピーが何度もやり直される場合は、10分後にエラーを明示して中止します。その場合は後で再試行するか、先にウォレットを停止してください。このバックアップにはageのIDファイルは**含まれません**。そのファイルは1度バックアップし、データベースのバックアップとは別に保管してください。両方を持つ人は鍵を復号できます。

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

公式のインストール方法（Debianパッケージ、Docker、リリースバイナリ）は、[インストールガイド](https://zcash.github.io/zallet/guide/installation/index.html)に記載されています。リリースアーカイブの名前は`zallet-v<version>-linux-<amd64|arm64>.tar.gz`で、`zallet`と`zallet-zebra`が含まれています。Dockerイメージは`zodlinc/zallet`として公開されています。

最小限の新規ウォレット作成フロー：

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

`[indexer]`を`validator_address`でローカルの`zebrad` JSON-RPCエンドポイントに向けてください。これは必須で、デフォルトでlocalhostにはなりません。zebraバックエンドには`[indexer.read_state_service]`と、`indexer`機能を有効にしてビルドされたバージョン7.0.0以降の`zebrad`も必要です。その状態ディレクトリは同じホスト上にある必要があり、Zalletがチェーンの状態を直接読み取れるようにします。`indexer.db_path`は削除されたZainoバックエンドのみを設定していました。現在は警告とともに無視されます。

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

| | Zallet | zecd | ZODL（Zashi） / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| 概要 | フルノードRPCウォレット | シールドを優先したウォレットサーバー | エンドユーザー向けウォレット | コンセンサスノード | インデクサー / lightwalletdの代替 |
| 置き換えるもの | `zcashd`ウォレット | そのまま置き換え可能な`zcashd`クローンではありません | モバイル／デスクトップアプリ | `zcashd`ノード | `lightwalletd` |
| ローカルノードが必要か | はい | はい（デフォルトではZebra） | いいえ（ライトクライアント） | ノードそのものです | はい |
| zcashdRPCとの互換性 | 互換性を確保する経路として設計されています | 選択された一部のみ | 該当なし | 部分的／Zakura互換モード | APIが異なります |
| カストディのモデル | オペレーターが`wallet.db`で鍵を保持します | シードから復元可能なサーバー | ユーザーデバイス上の鍵 | ウォレットなし | 鍵なし |

Zalletと**zecd**はいずれもZebraの前段に配置できます。`z_*`ウォレット表面と`wallet.dat`からの移行経路が必要な場合はZalletを選んでください。明確に`zcashd`クローンではないシールド優先サーバーが必要な場合はzecdを選んでください。

[zallet.io](https://www.zallet.io/)には、同じ名前を再利用した別の消費者向け製品があります。そのアプリはこのプロジェクトではありません。

---

## 関連ページ

- [フルノード](Full_Nodes.md) — Zebra、Zakura、および廃止された`zcashd`ノード
- [Zebraフルノード](Zebra_Full_Node.md) — ノードZalletのデフォルトのバックエンドが読み取るもの
- [Zakuraノード](Zakura_Node.md) — 代替の検証ノード
- [Zaino](Zaino.md) — インデクサー兼ライトクライアントサーバー（beta.4以降、Zalletバックエンドではありません）
- [Z3 Stack](Z3_Stack.md) — Zebra + Zalletのコンポーズスタック
- [zecd](ZECD.md) — librustzcash上の別のウォレットサーバー設計
- [Zcashウォレットの同期](Zcash_Wallet_Syncing.md) — シールドされたウォレットがチェーンをスキャンする仕組み
- [ビューイングキー](Viewing_Keys.md)

## リソース

- [Zalletブック](https://zcash.github.io/zallet/)
- [zcash/zallet の GitHub](https://github.com/zcash/zallet)
- [リリース](https://github.com/zcash/zallet/releases) · [v0.1.0-beta.4 の変更履歴](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [JSON-RPC のセマンティクス変更](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHubRaspberry Pi ガイド（Zebra + Zallet）](/guides/raspberry-pi-4-full-node)
- [Z3（Zebra + ZalletCompose スタック）](https://github.com/ZcashFoundation/z3)
- [ZcashR&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
