<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zalletは、Rustで書かれたフルノードZcashウォレットです。以前は`zcashd`に組み込まれていたウォレットの後継です。`zcashd`が2026年7月18日、ブロック高3417100でサポート終了に達した後、コンセンサスとウォレットの役割は分離されました。**Zebra**または**Zakura**がチェーンを検証し、Zalletが鍵を保持してノートをスキャンし、ウォレットJSON-RPCを公開します。

Zalletは現在**ベータ版**です。完全なレビューはまだ行われていません。破壊的変更により、ウォレットの削除と再作成が必要になる場合があります。[The Zallet Book](https://zcash.github.io/zallet/)のセキュリティ警告を読まずに、多額のZECの本番カストディとして扱わないでください。

---

## TL;DR

- Zalletは**フルノードRPCウォレット**であり、モバイルのライトウォレットでもコンセンサスノードでもありません。
- `zcashd`のウォレット部分を置き換えます。ノード部分は[Zebra](Zebra_Full_Node.md)または[Zakura](Zakura_Node.md)です。
- **Rust**で書かれ、MIT / Apache-2.0のデュアルライセンスで、[zcash/zallet](https://github.com/zcash/zallet)で保守されています。
- 2026年8月下旬時点で公開されている最新リリースは、**v0.1.0-beta.3**です。
- 2種類のバックエンドのいずれかを介してチェーンデータと通信します。**zebra-state**（ローカルの`zebrad`に対する直接`ReadStateService`）または**Zaino**です。
- **zcashd互換JSON-RPC**のサブセットを公開します。一部のメソッドは変更され、一部は意図的に省かれています。
- 鍵素材は常に**age**で暗号化されます。トランザクション履歴、アドレス、Viewing Keyは`wallet.db`に平文で格納されます。
- 署名済みアーカイブ1つに、`zallet`（ランチャー）、`zallet-zebra`、`zallet-zaino`の3つのバイナリが含まれます。
- 公式ドキュメント：[The Zallet Book](https://zcash.github.io/zallet/)。

---

## Zalletが存在する理由

`zcashd`は、Bitcoin Core由来のコンセンサスノードとウォレットを1つのプロセスにまとめていました。この設計は廃止されました。

| 役割 | 旧スタック | 現行スタック |
|------|-----------|---------------|
| コンセンサス / P2P | `zcashd` | Zebra（`zebrad`）またはZakura |
| ウォレット / 鍵 / 残高 | `zcashd` `wallet.dat` | **Zallet**（`wallet.db`） |
| ライトクライアント・インデクサー | `lightwalletd` | Zainoまたは`lightwalletd` |

ウォレットをノードから分離することにより、次が可能になります。

- 鍵を移動せずにノードソフトウェア（Zebra対Zakura）を切り替えられます。
- ウォレットのスキャンと支出権限を、個別にロックダウンできるプロセスに配置できます。
- RPCのセマンティクスを、`zcashd`固有の挙動に固定したままにせず、ZIP 32アカウント、Unified Address、PCZTへと進化させられます。

Zalletは、以前`zcashd`をホットウォレット、取引所バックエンド、フォーセット、またはマイニング報酬ウォレットとして運用していたオペレーター向けのウォレットです。

---

## ステータス

Zalletは**ベータ版**です。

実際には、これは以下を意味します。

- どのベータ版にも破壊的変更が入る可能性があります。データディレクトリを削除してやり直す必要がある場合があります。
- すべての`zcashd`ウォレットRPCが移植されているわけではありません。
- 移植済みメソッドの一部は、`zcashd`とはセマンティクスが異なります。統合する場合は、[altered-semantics page](https://zcash.github.io/zallet/zcashd/json_rpc.html)を読む必要があります。
- クレートは開発中であり、完全なレビューはまだ行われていません。
- ZalletはRustライブラリ**ではありません**。ライブラリとして依存する場合の保証はありません。

フィードバックは[GitHub issues](https://github.com/zcash/zallet/issues/new)、または[Zcash R&D Discord](https://discord.gg/xpzPR53xtU)の`#wallet-dev`チャンネルへ送ってください。

想定されるRPCの範囲が整えば、その後に安定フェーズが計画されています。その際、呼び出し元には、文書化されたセマンティクスの違いを含むZalletのメソッドへの移行が求められます。

---

## アーキテクチャ

Zalletは3つのCargoワークスペースに分割されており、2つのチェーンバックエンドが異なる依存関係グラフを追跡できるようになっています。

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

3つのバイナリはいずれも**同じ**`wallet.db`を開きます。ランチャーが実行時にバックエンドを選択するため、切り替えのために再コンパイルする必要はありません。

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

Zalletは**フルノードウォレット**です。ローカルの検証ノードを必要とします。ライトクライアントではありません。ライトウォレットおよびコンパクトブロックサーバーについては、[Zaino](Zaino.md)および[Lightwallet Nodes](Lightwallet_Nodes.md)を参照してください。

Zcash Foundationの[Z3](https://github.com/ZcashFoundation/z3)コンポーズスタックでは、ZebraとZalletをまとめて実行し、外部ライトクライアント向けに任意でスタンドアロンのZainoを実行できます。

---

## アカウント、アドレス、鍵

Zalletは、`zcashd`の単一の暗黙的アカウントではなく、ZIP 32アカウントを中心に構築されています。

- ウォレットは**複数のBIP 39ニーモニック**を保持できます。各ニーモニックは独立した支出ルートであり、**シードフィンガープリント**（`zip32seedfp1…`）によって識別されます。
- **アカウント**は、シードからZIP 32アカウントインデックスを使って導出されます。1つのZalletインスタンス内ではローカルの**UUID**も持ちます。アカウントのポータブルな識別子は`(seedfp, account index)`です。
- アドレスは、`z_getaddressforaccount`で生成される**ZIP 316 Unified Address**です。1つのアカウントは多数の多様化アドレスを持つことができ、シールドされた受信者はオンチェーンでリンクできません。
- インポートした支出鍵（`z_importkey`）と監視専用アドレス（`z_importaddress`）は、ニーモニックでカバーされないUUIDアカウントになります。
- Viewing Keyはエクスポートおよびインポートできます（`z_exportviewingkey`、`z_importviewingkey`）。これには統合フルViewing Keyと受信Viewing Keyが含まれます。

`getnewaddress`は実装されていません。`z_getnewaccount`および`z_getaddressforaccount`を使用してください。

`keystore.require_backup`（`zcashd`の`walletrequirebackup`を移行した形式）が有効な場合、Zalletはバックアップが確認されていないニーモニックから新しい支出権限を導出することを拒否します。

---

## 暗号化とバックアップ

鍵素材は**常に**暗号化されます。非暗号化モードも`encryptwallet` RPCもありません。これは`zcashd`のメソッドで、完全にはサポートされていませんでした。

- セットアップ時に**age**アイデンティティが作成され、デフォルトパスは`{datadir}/encryption-identity.txt`です。
- ニーモニックとインポートした支出鍵は、`wallet.db`内にage暗号文として保存されます。
- データベースの残りは**暗号化されません**。誰かがファイルを取得すると、履歴、アドレス、Viewing Keyを読めます。
- アイデンティティはパスフレーズでラップできます（`generate-encryption-identity -p`）。`walletpassphrase` RPCでロック解除し、`walletlock`でロックします。
- アイデンティティファイルまたはそのパスフレーズを失うと、支出鍵は復元不能になります。アイデンティティ、すべてのニーモニック、および保持する`wallet.db`コピーを（別途暗号化して）バックアップしてください。

Zalletの実行中に`wallet.db`をコピーしても、安全なバックアップにはなりません。SQLiteは不整合な状態になる可能性があります。プロセスを停止してから行うか、公式のオンラインバックアップコマンドを待ってください。

---

## JSON-RPC

Zalletは、Basic認証を使用してHTTP経由で`zcashd`ウォレットRPCのサブセットを実装します。ループバックにバインドしてください。リモート利用は暗号化トンネル経由にする必要があります。`rpc.allow_insecure_remote_bind`は存在しますが、安全ではありません。

`zcashd`との主な違い：

- `getwalletinfo`上の残高フィールドは空です。`z_getbalances`、`z_getbalanceforaccount`、`z_gettotalbalance`を使用してください。
- 手数料は**ZIP 317**に従います。`settxfee`はありません。
- 支出の構築は、**PCZT**（部分的に作成されたZcashトランザクション、ZIP 374）へ移行中です。PCZT RPCはベータシリーズで導入されました。
- ウォレットが同期中または再編成から回復中は、グローバルな**同期ロック**が残高RPCおよび支出RPCをブロックします（`ClientInInitialDownload` / `ForbiddenBySafeMode`）。

意図的に省かれたメソッドには、`createrawtransaction`、`fundrawtransaction`、`getnewaddress`、`getrawchangeaddress`、`keypoolrefill`、`importwallet`、`encryptwallet`があります。代替手段は[Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)に記載されています。

---

## はじめに

公式のインストール方法（Debianパッケージ、Docker、リリースバイナリ）は、[installation guide](https://zcash.github.io/zallet/guide/installation/index.html)にあります。リリースアーカイブの名前は`zallet-<version>-<arch>.tar.gz`で、3つすべてのバイナリを含みます。

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

`[indexer]`をローカルの`zebrad` JSON-RPCエンドポイントに向けてください。zebraバックエンドでは、Zalletがチェーン状態を直接読み取れるよう、`[indexer.read_state_service]`とインデクサー機能を有効にしてビルドした`zebrad`も必要です。

再現可能なイメージは、[StageX](https://codeberg.org/stagex/stagex/)（Docker 25以降、containerdイメージストア、GNU Make）でビルドできます。

---

## zcashdからの移行

残高を確認し、復元テストを完了するまで、古い`zcashd`データディレクトリを保持してください。

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet`は、`zcashd-import`機能を有効にしたビルドでのみ利用できます。`wallet.dat`の読み取りには、`zcashd`が使用していたバージョンである**Berkeley DB 6.2**の`db_dump`が必要です。

オペレーター向けの手順メモ：[Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)。

---

## Zalletと他のソフトウェアの関係

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| 概要 | フルノードRPCウォレット | シールド優先のウォレットサーバー | エンドユーザー向けウォレット | コンセンサスノード | インデクサー / lightwalletdの後継 |
| 置き換えるもの | `zcashd`ウォレット | そのまま置き換えられる`zcashd`クローンではない | モバイル/デスクトップアプリ | `zcashd`ノード | `lightwalletd` |
| ローカルノードが必要 | はい | はい（デフォルトではZebra） | いいえ（ライトクライアント） | それ自体がノード | はい |
| zcashd RPC互換性 | 互換性のための経路として設計 | 厳選した小さなサブセットのみ | N/A | 部分的 / Zakura互換モード | 異なるAPI |
| カストディモデル | オペレーターが`wallet.db`内で鍵を保持 | シードから復元可能なサーバー | ユーザーデバイスの鍵 | ウォレットなし | 鍵なし |

Zalletと**zecd**は、どちらもZebraの前段に配置できます。`z_*`ウォレットの機能範囲と`wallet.dat`からの移行経路が必要ならZalletを選んでください。シールド優先で、`zcashd`クローンでは**ない**ことが明示されたサーバーが必要ならzecdを選んでください。

[zallet.io](https://www.zallet.io/)には、同じ名前を再利用した別の消費者向け製品があります。そのアプリはこのプロジェクトではありません。

---

## 関連ページ

- [Full Nodes](Full_Nodes.md) — Zebra、Zakura、および廃止された`zcashd`ノード
- [Zebra Full Node](Zebra_Full_Node.md) — ノードZalletのデフォルトバックエンドが読み取るもの
- [Zakura Node](Zakura_Node.md) — 代替の検証ノード
- [Zaino](Zaino.md) — インデクサーバックエンドおよびライトクライアントサーバー
- [ZECD](ZECD.md) — librustzcash上の別のウォレットサーバー設計
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md) — シールドウォレットがチェーンをスキャンする仕組み
- [Viewing Keys](Viewing_Keys.md)

## リソース

- [The Zallet Book](https://zcash.github.io/zallet/)
- [GitHub上のzcash/zallet](https://github.com/zcash/zallet)
- [リリース](https://github.com/zcash/zallet/releases)
- [JSON-RPCの変更されたセマンティクス](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Piガイド（Zebra + Zallet）](/guides/raspberry-pi-4-full-node)
- [Z3（Zebra + Zalletコンポーズスタック）](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
