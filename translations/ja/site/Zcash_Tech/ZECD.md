<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# zecd — シールドされたものを優先するウォレットサーバー

zecd は、Zcash 向けのシールドされたものを優先するウォレット（wallet）サーバーであり、[librustzcash](https://github.com/zcash/librustzcash) 上に構築され、Bitcoin Core の JSON-RPC 方言を通じて公開されています。開発者（developer）や支払い（payment）統合担当者に、Zcash とやり取りするための使い慣れた Bitcoin 互換 API を提供すると同時に、Orchard（最もプライバシー（privacy）性の高いプール（pool））をデフォルトにしています。[zec.rocks](https://zec.rocks) によって開発された zecd は、現代的なクラウドネイティブ環境で `zcashd` のウォレット機能を置き換えるよう設計されています。

**現行バージョン：** 0.5.0-rc3（2026年7月13日）— Ironwood（NU6.3）をサポートしています。`cargo install zecd` 経由でインストールするか、公式の Docker イメージを使用してください。

---

## 要約

- zecd は **ウォレットデーモン（サーバー）** であり、フルノード（full node）ではありません。Zcash P2P プロトコルを使用せずに、キー、スキャン、証明、RPC を処理します。
- **Bitcoin Core の JSON-RPC 方言**を使用します。メソッド名、フィールド形式、認証、エラーコードは同じであり、多くの Bitcoin RPC クライアントはそのまま Zcash で利用できます。
- **Orchard（シールドされた）アドレスがデフォルト**です。公開型（transparent、t-address）および Sapling のサポートには、ウォレットごとに明示的なオプトインが必要です。
- ローカル JSON-RPC を介して、自身でホストする **[Zebra](Zebra_Full_Node.md) フルノード**に接続します。lightwalletd は不要です。
- **設計上ステートレスです**。ウォレット全体をシードフレーズ（seed phrase）のみから復元できるため、データディレクトリは使い捨てにできます。
- **zcashd のドロップイン代替ではありません**。Zcash RPC メソッドの一部のみを実装しており、プライバシーと安全性のために意図的な設計上の違いがあります。
- 手数料（fee）は **ZIP-317** に従います（決定論的な手数料計算）。ユーザー指定の手数料は拒否されます。
- 使い慣れた Bitcoin RPC インターフェースを通じて、**シールドされたメモ（memo、ZIP-302）**をサポートします。

---

## zecd はどのような問題を解決しますか？

`zcashd` は、Zcash の元来のノード（node）とウォレットを統合したものであり、2016年に Bitcoin の C++ コードベースからフォークされました。時間の経過とともに、これは摩擦を生みました。コードの保守が難しく、ウォレットはノードと密接に結び付いており、公開型アドレスはシールドされたアドレスと並んで第一級の選択肢として提示されます。

zecd は、ウォレットの責務をコンセンサス（consensus）から分離します。これはアプリケーションと Zebra フルノードの間に位置する**専用ウォレットレイヤー**であり、以下を提供します。

- librustzcash 上に構築された、クリーンで現代的な Rust 実装（Zodl と Zingo を支えるものと同じライブラリ）
- デフォルトでプライバシーを保護する設計（別途設定しない限り Orchard アドレス）
- Zcash 固有のツールを学ぶ必要をなくす Bitcoin 互換 RPC インターフェース
- コンテナ化およびクラウド環境に適した、ステートレスでシードから復元可能なアーキテクチャ

---

## アーキテクチャ

zecd は、3層モデルで動作します。

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       zecd
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

zecd は、ローカル JSON-RPC **のみを通じて** Zebra と通信します。ピアツーピアネットワーク、サードパーティーのインデクサー、lightwalletd は使用しません。Zebra 接続は意図的にローカル専用です。zecd は、帯域外で保護されたトンネル（例：WireGuard または SSH）用に明示的に設定されない限り、グローバルにルーティング可能なホストへ認証情報を送ることを拒否します。

---

## 主な機能

### シールドされたものを優先し、デフォルトで Orchard

zecd は、Orchard Unified Address をデフォルトのアドレスタイプとして使用します。Sapling と公開型（t-address）プールには、ウォレットごとの明示的な設定が必要です。この設計は、古い Zcash ツールでよくあるプライバシー上の落とし穴である、意図しない公開型送信のリスクを減らします。

プライバシーポリシーは、呼び出しごと、または `[spend] privacy_policy` でグローバルに設定できます。

| ポリシー | 動作 |
|--------|----------|
| `AllowRevealedRecipients`（デフォルト） | 公開型の受取人への送信を許可します。金額と受取人はオンチェーン（on-chain）で公開されます |
| `AllowRevealedAmounts` | クロスプール送信（Sapling↔Orchard）を許可しますが、公開型の受取人は拒否します |
| `FullPrivacy` | 1つのプール内で完全にシールドされた送信のみを許可します。公開型の受取人とクロスプール送信を拒否します |
| `AllowFullyTransparent` | 公開型 UTXO から資金供給される t→t 送信も許可します |

### Bitcoin Core RPC 互換性

zecd は、以下に準拠する Bitcoin Core の JSON-RPC 方言を実装しています。

- メソッド名（例：`getblockchaininfo`、`getbalance`、`getnewaddress`、`listtransactions`、`sendtoaddress`、`sendmany`）
- レスポンス内のフィールド名と型
- JSON-RPC 1.0 のエンベロープ構造
- Basic 認証、`rpcauth` エントリー、および Cookie ファイル認証
- エラーコードおよび HTTP ステータスマッピング（エラー本文を伴う HTTP 500、401 のセマンティクス）

これは、既存の Bitcoin 支払いライブラリ、取引所統合、監視ツールの多くが、ほとんど、またはまったくコードを変更せずに zecd 経由で Zcash とやり取りできることを意味します。

準拠スイート（140以上のチェック）は、ライブの regtest デーモンに対してすべての PR で実行され、公開テストネットでも検証されています。

### シールドされたメモ（ZIP-302）

zecd は、標準的な Bitcoin ツールでは利用できない Zcash のシールドされたメモ機能を、使い慣れた Bitcoin RPC インターフェースを通じて公開します。

- `sendtoaddress` は、追加の末尾パラメーターとして任意の16進数メモを受け付けます（最大512バイト。公開型の受取人では拒否されます）
- `listtransactions` および `gettransaction` のトランザクション履歴エントリーには、出力にメモが含まれる場合、`memo`（16進数）および `memoStr`（復号済みテキスト）フィールドが含まれます
- シールドされた受取人への金額ゼロの送信は、メモ専用のユースケース（`z_sendmany` の「メモ専用送信」パターン）でサポートされています

これにより、zecd は、支払いと並行してプライベートなオンチェーンメッセージングを必要とするアプリケーションに適しています。

### 設計上ステートレス

zecd は、**シードのみの復元で再構築できないオフチェーン状態を一切永続化しません**。ウォレットデータベース（`data.sqlite`）は完全にシードフレーズから導出可能です。シールドされた資金は無条件に復元され、公開型の資金は設定済みのギャップ制限まで復元されます。

シードからウォレットを復元するには、以下を行います。

```sh
zecd init --restore --birthday <block-height>
```

これにより、データディレクトリは**使い捨て**になります。永続ボリュームのないコンテナでも、起動ごとにシードから再構築すれば、重要なものは何も失われません。運用者は配布したアドレスを追跡する責任があります。zecd は、アドレスがオンチェーンで資金を受け取った後にのみ記憶します。

ラベルは意図的に存在しません。ラベルにはオンチェーンのソースがなく、シードから再構築できないため、zecd は単にラベルをサポートしません。ラベルメソッドを呼び出すと、`method-not-found` エラー（`-32601`）が返されます。

### lightwalletd への依存なし

zecd は、コンパクトブロック、ツリー状態、メモリプールの可視性を Zebra の JSON-RPC から直接導出します。運用や保守が必要な lightwalletd は存在しないため、自身でホストするデプロイの運用上の複雑さを軽減します。

### クラウドネイティブおよびコンテナ化されたデプロイ

zecd のステートレスなアーキテクチャは、Docker および Kubernetes 環境向けに設計されています。

- リポジトリで完全な Docker Compose スタック（`zebra → zecd`）を利用可能です
- ポート `9233` のヘルスエンドポイントと、設定可能なレディネスプローブ（`synced` または `connected`）
- ログ集約パイプライン向けの構造化 JSON ログオプション
- ZIP-317 の決定論的手数料。手数料オラクルや手動の手数料設定は不要です
- `bootstrap_from_keys`（デフォルトで有効）：`keys.toml` の隣にある空のデータディレクトリは、起動時にウォレットを自動再構築します。1つの Secret をマウントし、空の PVC で起動するだけでデプロイできます

---

## カストディモデル

zecd は、異なるデプロイおよびセキュリティ要件に適した3つのキー管理モデルをサポートします。

### 1. 非暗号化（デフォルト — 自動アンロック）

`keys.toml` 内のシードニーモニックは、**age identity ファイル**（`identity.txt`）にラップされます。デフォルトの `auto_unlock = true` では、起動時にシードがメモリ内へ復号されるため、送信は無人で実行でき、`walletpassphrase` 呼び出しは不要です。

最適な用途：自動決済処理システム、取引所のホットウォレット、開発環境。

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> メインネットでは、`identity.txt` をデータディレクトリの**外部**に保管してください。両方のファイルを読み取れる者は誰でも使用権限を持ちます。

### 2. 暗号化（パスフレーズ保護）

ニーモニックは identity ファイルではなく、パスフレーズ（age scrypt）でラップされます。ウォレットはロック状態で起動し、`walletpassphrase "<pass>" <timeout>` が指定時間にわたってアンロックした後、タイムアウト時に自動で再ロックします。これは Bitcoin Core の暗号化ウォレットの動作と一致します。

最適な用途：無人の使用権限を必要としないホットウォレット、対話的な運用者ワークフロー。

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. ウォッチオンリー（UFVK — 使用キーなし）

別のウォレットからエクスポートされた Unified Full Viewing Key（UFVK）で初期化されます。受信、スキャン、残高報告は可能ですが、トランザクションに署名することはできません。署名用ウォレットと分離した監視、請求書発行、監査ノードに最適です。

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## バックアップと復旧

資金は**ニーモニックのみ**から復元できます。それ以外はすべてキャッシュです。

| 成果物 | 場所 | 保護対象 | バックアップするか？ |
|----------|----------|-----------------|----------|
| **24語のニーモニック** | `zecd init` で1回だけ表示 | 資金。紛失 = 永久的な喪失 | **はい — オフライン（紙/HSM）** |
| `keys.toml` | `<wallet dir>/keys.toml` | 暗号化されたシード + バースデー + ネットワーク | **はい — Secret として** |
| `identity.txt` | `[keys] age_identity` | `keys.toml` を復号します（使用権限） | **はい — `keys.toml` とは別に** |
| バースデー高 | `keys.toml` 内 | 復元を高速化します（最初のトランザクションより前の任意の高） | ニーモニックと共に記録 |
| `data.sqlite` | `<wallet dir>/data.sqlite` | ウォレットキャッシュ。復元時にシードから再構築 | いいえ — 使い捨て |
| `blocks/` | `<wallet dir>/blocks/` | コンパクトブロックキャッシュ | いいえ — 配布しないでください。大きくなる可能性があります |
| `.cookie` | `<datadir>/.cookie` | 一時的な RPC Cookie | いいえ — 起動時に再生成 |

> **データディレクトリはホストローカルでなければなりません。** zecd の単一インスタンスロック（`<datadir>/.lock`）は OS の勧告的ロックであり、ホスト間にはまたがりません。マシン間でデータディレクトリを読み書き共有しないでください（NFS、Kubernetes `ReadWriteMany`）。2つの zecd インスタンスによりウォレット DB が破損します。Kubernetes では `ReadWriteOnce` ボリュームを使用してください。

---

## RPC メソッド許可リスト

認証情報の漏洩が壊滅的な影響をもたらすデプロイでは、zecd は RPC インターフェースを選択したメソッドのサブセットに制限できます。

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

リストにないメソッドは `-32601`（HTTP 404）を返します。これは存在しないメソッドと区別できないため、ロックダウンされたサーバーは無効化した機能について何も開示しません。受信専用の請求書発行システムでは、侵害されたクライアントによる影響範囲を最小化するために、`sendtoaddress`、`sendmany`、`stop` を無効化できます。

---

## Bitcoin Core RPC との主な違い

Bitcoin または zcashd ツールから移行する開発者は、以下の意図的な相違点を認識しておく必要があります。

| 動作 | Bitcoin Core | zecd |
|----------|-------------|------|
| アドレス形式 | `1...` / `bc1...` | `u1...`（Orchard Unified Address）— 文字列解析を行うクライアントでは Bitcoin アドレスとして解析できません |
| ラベル | 完全なラベルストア | 未実装 — `setlabel`、`listlabels` などは `-32601` を返します |
| 手数料 | ユーザー設定可能、手数料市場 | ZIP-317 の決定論的方式のみ。`settxfee`、`fee_rate`、`subtractfeefromamount` は `-8` で拒否されます |
| メモ | 非対応 | `sendtoaddress` は16進数メモを受け付けます。履歴には `memo` + `memoStr` フィールドがあります |
| 使用可能になるまでの承認数 | 1 | 3（自身のお釣り）/ 10（第三者）— `trusted_confirmations` / `untrusted_confirmations` で設定可能 |
| 再編成時の `listsinceblock` | フォーク地点まで巻き戻す | カーソルが再編成で除去された場合は `-5`（ブロックが見つかりません）を返します。パラメーターなしの呼び出しでベースラインを再設定してください |
| `sendmany` 内の重複した受取人 | エラー | JSON パーサーが zecd に渡す前に重複を統合します（最後の値が優先）。同じアドレスを2回列挙しないでください |
| 初期同期中の残高 | ブロックまたはウォームアップ | 部分的な残高を提供します。`GET /readyz` で自動化を制御してください（完全同期され、拡張バックログが処理されるまで 503 を返します） |
| `getbalance` における `minconf 0` | 0承認残高 | 1として提供されます。シールドされたノートは未採掘状態では決して使用できません |

---

## クイックスタート

**前提条件：** Zebra が `rpc.listen_addr = 127.0.0.1:18234`（テストネット）でローカル実行されていること。

crates.io（0.4.3以降）からインストールします。

```sh
cargo install zecd
```

または、ソースからビルドします。

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**curl で操作する場合：**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Python で操作する場合（Bitcoin RPC ライブラリを使用）：**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**シードから復元する場合：**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## デフォルトポート

| ネットワーク | zecd RPC | Zebra RPC（バックエンド） | ヘルス |
|---------|----------|---------------------|--------|
| メインネット | 8232 | 8234 | 9233 |
| テストネット | 18232 | 18234 | 9233 |

---

## zecd vs. zcashd vs. Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| 役割 | フルノード + ウォレット | インデクサー（lightwalletd を置き換え） | ウォレットサーバーのみ |
| 言語 | C++ | Rust | Rust |
| 状態 | 非推奨 | アクティブ | アクティブ（v0.5.0-rc3、2026年7月） |
| デフォルトプール | 公開型 | N/A | Orchard（シールドされた） |
| RPC 方言 | zcashd 固有 | gRPC（lightwalletd） | Bitcoin Core JSON-RPC |
| フルノードが必要 | はい（自身） | Zebra または zcashd | Zebra |
| ステートレスな復元 | いいえ | N/A | はい（シードのみ） |
| シールドされたメモ | はい（`z_sendmany`） | N/A | はい（Bitcoin RPC インターフェース） |
| ウォッチオンリー（UFVK） | はい | はい | はい |
| クラウドネイティブ | いいえ | 部分的 | はい |
| インストール | ビルド/バイナリ | ビルド | `cargo install zecd` |

---

## 関連ページ

- [Zebra フルノード](Zebra_Full_Node.md) — zecd が接続するフルノード
- [Zaino インデクサー](Zaino.md) — 代替のインデクサーアプローチ（lightwalletd を置き換え）
- [Zakura ノード](Zakura_Node.md) — 別のフルノード実装（Zebra のフォーク）
- [ビューイングキー](Viewing_Keys.md) — zecd がアカウントビューイングキーを使用してチェーンをスキャンする方法
- [ウォレット](/using-zcash/wallets) — ウォレットエコシステムの概要

## リソース

- [zecd GitHub（zecrocks/zecd）](https://github.com/zecrocks/zecd)
- [zecd 運用ランブック](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — 中核となる Zcash 暗号技術ライブラリ](https://github.com/zcash/librustzcash)
- [ZIP-317：比例転送手数料メカニズム](https://zips.z.cash/zip-0317)
- [ZIP-302：シールドされたメモ](https://zips.z.cash/zip-0302)
- [Zodl ウォレット（librustzcash 互換）](https://github.com/zodl-inc/zodl-ios)
