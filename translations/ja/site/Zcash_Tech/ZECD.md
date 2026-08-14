---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# ZECD — Shielded-First ウォレットサーバー

> 🇧🇷 [ポルトガル語版](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD は Zcash 向けの shielded-first ウォレットサーバーで、[librustzcash](https://github.com/zcash/librustzcash) 上に構築され、Bitcoin Core の JSON-RPC 方言を通じて利用できます。開発者や決済インテグレーターに、Zcash とやり取りするための使い慣れた Bitcoin 互換 API を提供しつつ、Orchard（最もプライベートなプール）をデフォルトにしています。[zec.rocks](https://zec.rocks) によって開発された ZECD は、モダンでクラウドネイティブなデプロイメントにおいて `zcashd` のウォレット機能を置き換えるよう設計されています。

**現在のバージョン:** 0.5.0-rc3（2026年7月13日）— Ironwood（NU6.3）をサポート。`cargo install zecd` でインストールするか、公式 Docker イメージを利用できます。

---

## 要点

- ZECD は **ウォレットデーモン（サーバー）** であり、フルノードではありません。鍵管理、スキャン、証明生成、RPC を扱いますが、Zcash の P2P プロトコルは話しません。
- **Bitcoin Core の JSON-RPC 方言** を話します。メソッド名、フィールド構造、認証、エラーコードが同じで、多くの Bitcoin RPC クライアントはそのまま Zcash で動作します。
- **Orchard（shielded）アドレスがデフォルト** です。transparent（t-address）および Sapling のサポートは、ウォレットごとに明示的なオプトインが必要です。
- **セルフホストされた [Zebra](Zebra_Full_Node.md) フルノード** にローカル JSON-RPC 経由で接続します。lightwalletd は不要です。
- **設計上ステートレス** です。ウォレット全体をシードフレーズだけで復元できるため、データディレクトリは使い捨てにできます。
- **zcashd の完全な置き換えではありません**。Zcash RPC メソッドの一部のみを実装しており、プライバシーと安全性のために意図的な設計差異があります。
- 手数料は **ZIP-317** に従います（決定論的な手数料計算）。ユーザー指定の手数料は拒否されます。
- 使い慣れた Bitcoin RPC インターフェースを通じて **shielded メモ（ZIP-302）** をサポートします。

---

## ZECD はどんな問題を解決するのか？

`zcashd` は Zcash の元祖ノード兼ウォレットで、2016 年に Bitcoin の C++ コードベースからフォークされました。時間が経つにつれ、これが摩擦を生みました。コードは保守が難しく、ウォレットはノードと密結合しており、transparent アドレスは shielded アドレスと並んで第一級の選択肢として提示されます。

ZECD はウォレットの責務をコンセンサスから分離します。これは、アプリケーションと Zebra フルノードの間に位置する**専用ウォレットレイヤー**であり、以下を提供します。

- librustzcash 上に構築された、クリーンでモダンな Rust 実装（Zashi と Zodl を支えるのと同じライブラリ）
- デフォルトでプライバシー重視の設計（別途設定しない限り Orchard アドレス）
- Zcash 専用ツールを学ぶ必要をなくす Bitcoin 互換 RPC インターフェース
- コンテナ化およびクラウドデプロイメントに適した、ステートレスでシード復元可能なアーキテクチャ

---

## アーキテクチャ

ZECD は 3 層モデルで動作します。

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD は Zebra と**ローカル JSON-RPC のみ**を通じて通信します。P2P ネットワーキングも、サードパーティのインデクサーも、lightwalletd も使いません。Zebra への接続は意図的にローカル専用です。ZECD は、帯域外で保護されたトンネル（たとえば WireGuard や SSH）向けに明示的に設定されていない限り、グローバルに到達可能なホストへ認証情報を送ることを拒否します。

---

## 主な機能

### Shielded-First、デフォルトで Orchard

ZECD は、デフォルトのアドレスタイプとして Orchard Unified Address を使用します。Sapling および transparent（t-address）プールは、ウォレットごとに明示的な設定が必要です。この設計により、古い Zcash ツールでよくあるプライバシー上の落とし穴である、誤って transparent 送金してしまうリスクを減らします。

プライバシーポリシーは、呼び出しごと、またはグローバルに `[spend] privacy_policy` で設定できます。

| ポリシー | 動作 |
|--------|----------|
| `AllowRevealedRecipients`（デフォルト） | transparent な受取人への送金を許可。チェーン上で金額と受取人が公開される |
| `AllowRevealedAmounts` | クロスプール送金（Sapling↔Orchard）を許可するが、transparent な受取人は拒否 |
| `FullPrivacy` | 1 つのプール内での完全 shielded 送金のみ許可。transparent な受取人とクロスプールを拒否 |
| `AllowFullyTransparent` | transparent UTXO を原資とする t→t 送金も許可 |

### Bitcoin Core RPC 互換性

ZECD は以下にわたって Bitcoin Core の JSON-RPC 方言を実装しています。

- メソッド名（例: `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`）
- レスポンス内のフィールド名と型
- JSON-RPC 1.0 のエンベロープ構造
- Basic 認証、`rpcauth` エントリ、cookie ファイル認証
- エラーコードと HTTP ステータスマッピング（エラーボディ付き HTTP 500、401 セマンティクス）

つまり、既存の多くの Bitcoin 決済ライブラリ、取引所インテグレーション、監視ツールは、コード変更をほとんど、あるいはまったく行わずに ZECD 経由で Zcash とやり取りできます。

適合性テストスイート（140 以上のチェック）は、すべての PR で稼働中の regtest デーモンに対して実行されており、公開 testnet でも検証されています。

### Shielded メモ（ZIP-302）

ZECD は、標準的な Bitcoin ツールにはない Zcash の shielded メモ機能を、使い慣れた Bitcoin RPC インターフェースを通じて公開します。

- `sendtoaddress` は、追加の末尾パラメータとして任意の 16 進メモを受け付けます（最大 512 バイト。transparent な受取人には拒否）
- `listtransactions` と `gettransaction` のトランザクション履歴エントリには、出力がメモを持つ場合に `memo`（16 進）および `memoStr`（デコード済みテキスト）フィールドが含まれます
- shielded な受取人へのゼロ金額送信は、メモ専用ユースケース向けにサポートされます（`z_sendmany` の “memo-only-send” パターン）

これにより ZECD は、支払いと並行してプライベートなオンチェーンメッセージングを必要とするアプリケーションに適しています。

### 設計上ステートレス

ZECD は、**シードだけの復元で再構築できないオフチェーン状態を一切保持しません**。ウォレットデータベース（`data.sqlite`）はシードフレーズから完全に導出可能であり、shielded 資金は無条件に復元され、transparent 資金は設定されたギャップリミットまで復元されます。

シードからウォレットを復元するには:

```sh
zecd init --restore --birthday <block-height>
```

これにより、データディレクトリは**使い捨て**にできます。永続ボリュームのないコンテナを毎回シードから再構築して起動しても、重要なものは何も失われません。オペレーターは自分が配布したアドレスを追跡する責任があります。ZECD がアドレスを記憶するのは、それらがオンチェーンで資金を受け取った後だけです。

ラベル機能は意図的に存在しません。ラベルはオンチェーン上に情報源がなく、シードから再構築できないため、ZECD は単純にそれをサポートしません。ラベル関連メソッドを呼び出すと、`method-not-found` エラー（`-32601`）が返ります。

### lightwalletd への依存なし

ZECD は、コンパクトブロック、ツリー状態、mempool の可視性を Zebra の JSON-RPC から直接導出します。運用・保守すべき lightwalletd は存在せず、セルフホスト環境の運用複雑性を下げます。

### クラウドネイティブおよびコンテナ化されたデプロイメント

ZECD のステートレスアーキテクチャは Docker および Kubernetes 環境向けに設計されています。

- 完全な Docker Compose スタック（`zebra → zecd`）をリポジトリで提供
- ポート `9233` 上のヘルスエンドポイント。設定可能な readiness probe（`synced` または `connected`）
- ログ集約パイプライン向けの構造化 JSON ロギングオプション
- ZIP-317 の決定論的手数料 — 手数料オラクルや手動手数料設定は不要
- `bootstrap_from_keys`（デフォルトで有効）: `keys.toml` の横に空のデータディレクトリがあると、起動時にウォレットを自動再構築 — 1 つの Secret をマウントし、空の PVC で起動するだけでデプロイ可能

---

## カストディモデル

ZECD は、デプロイメントやセキュリティ要件に応じた 3 つの鍵カストディモデルをサポートします。

### 1. 非暗号化（デフォルト — 自動アンロック）

`keys.toml` 内のシードニーモニックは、**age identity file**（`identity.txt`）にラップされます。デフォルトの `auto_unlock = true` では、起動時にシードがメモリへ復号されるため、送金は無人で行え、`walletpassphrase` 呼び出しも不要です。

最適な用途: 自動決済プロセッサ、取引所のホットウォレット、開発環境。

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Mainnet では `identity.txt` をデータディレクトリの**外部**に保存してください。両方のファイルを読める者は誰でも支出権限を持ちます。

### 2. 暗号化済み（パスフレーズ保護）

ニーモニックは identity file ではなくパスフレーズ（age scrypt）でラップされます。ウォレットはロック状態で起動し、`walletpassphrase "<pass>" <timeout>` が指定時間だけアンロックし、タイムアウトで自動的に再ロックされます。これは Bitcoin Core の暗号化ウォレットの挙動と一致します。

最適な用途: 無人の支出権限が不要なホットウォレット、対話的なオペレーター運用。

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Watch-Only（UFVK — 支出鍵なし）

別のウォレットからエクスポートした Unified Full Viewing Key（UFVK）で初期化します。受信、スキャン、残高報告はできますが、トランザクションに署名することはできません。署名用ウォレットとは分離した監視、請求、監査ノードに最適です。

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## バックアップと復旧

資金は**ニーモニックだけ**で復旧できます。それ以外はすべてキャッシュです。

| 成果物 | 場所 | 保護するもの | バックアップ必要? |
|----------|----------|-----------------|----------|
| **24 語のニーモニック** | `zecd init` 時に一度だけ表示 | 資金そのもの — 紛失 = 永久損失 | **はい — オフラインで（紙/HSM）** |
| `keys.toml` | `<wallet dir>/keys.toml` | 暗号化されたシード + birthday + network | **はい — Secret として** |
| `identity.txt` | `[keys] age_identity` | `keys.toml` を復号（支出権限） | **はい — `keys.toml` とは別に** |
| Birthday height | `keys.toml` 内 | 復元を高速化（最初の tx より前ならどの高さでも可） | ニーモニックと一緒に記録 |
| `data.sqlite` | `<wallet dir>/data.sqlite` | ウォレットキャッシュ — 復元時にシードから再構築 | いいえ — 使い捨て可 |
| `blocks/` | `<wallet dir>/blocks/` | コンパクトブロックキャッシュ | いいえ — 配布しないこと。大きくなりうる |
| `.cookie` | `<datadir>/.cookie` | 一時的な RPC cookie | いいえ — 起動時に再生成 |

> **データディレクトリはホストローカルでなければなりません。** ZECD の単一インスタンスロック（`<datadir>/.lock`）は OS の advisory lock であり、ホストをまたぎません。データディレクトリを複数マシンで読み書き共有してはいけません（NFS、Kubernetes の `ReadWriteMany` など）— 2 つの ZECD インスタンスがウォレット DB を破損させます。Kubernetes では `ReadWriteOnce` ボリュームを使用してください。

---

## RPC メソッドのセーフリスト

認証情報漏えいが壊滅的になりうるデプロイメント向けに、ZECD は RPC インターフェースを選択したメソッド群に制限することをサポートしています。

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

リストにないメソッドはすべて `-32601`（HTTP 404）を返します。これは、存在しないメソッドと区別がつかないため、厳格に制限されたサーバーは何を無効化したかを一切漏らしません。受信専用の請求サーバーは、侵害されたクライアントからの被害範囲を最小化するために `sendtoaddress`、`sendmany`、`stop` を無効化できます。

---

## Bitcoin Core RPC との主な違い

Bitcoin または zcashd ツールから移行する開発者は、以下の意図的な相違点を把握しておくべきです。

| 動作 | Bitcoin Core | ZECD |
|----------|-------------|------|
| アドレス形式 | `1...` / `bc1...` | `u1...`（Orchard Unified Address）— 文字列解析ベースのクライアントでは Bitcoin アドレスとして解釈不可 |
| ラベル | 完全なラベルストア | 未実装 — `setlabel`、`listlabels` などは `-32601` を返す |
| 手数料 | ユーザー設定可能; 手数料市場 | ZIP-317 の決定論的手数料のみ。`settxfee`、`fee_rate`、`subtractfeefromamount` は `-8` で拒否 |
| メモ | 未サポート | `sendtoaddress` は 16 進メモを受け付ける。履歴には `memo` + `memoStr` フィールドあり |
| 支出可能になるまでの承認数 | 1 | 3（自分のおつり）/ 10（第三者）— `trusted_confirmations` / `untrusted_confirmations` で設定可能 |
| reorg 時の `listsinceblock` | フォーク地点まで巻き戻る | カーソルが reorg で消えた場合は `-5`（Block not found）を返す — パラメータなし呼び出しで再ベースライン化 |
| `sendmany` の重複受取人 | エラー | ZECD が見る前に JSON パーサーが重複を畳み込む（最後の値が有効）— 同じアドレスを 2 回列挙しないこと |
| 初期同期中の残高 | ブロックするかウォームアップ | 部分残高を返す — 自動化は `GET /readyz` によって制御（完全同期かつ拡張バックログ解消まで 503 を返す） |
| `getbalance` の `minconf 0` | 0-conf 残高 | 1 として扱われる — shielded ノートは未採掘状態では決して支出可能にならない |

---

## クイックスタート

**前提条件:** `rpc.listen_addr = 127.0.0.1:18234`（testnet）でローカル動作している Zebra。

crates.io からインストール（0.4.3+）:

```sh
cargo install zecd
```

またはソースからビルド:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. testnet ウォレットを初期化（24 語のニーモニックとアカウントを生成）
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. デーモンを起動（バックグラウンドで同期し、ポート 18232 で JSON-RPC を提供）
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**curl で操作:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Python で操作（Bitcoin RPC ライブラリを使用）:**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # u1... Orchard Unified Address を返す
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# shielded メモ付きで送信
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**シードから復元:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# プロンプトが表示されたら 24 語のニーモニックを貼り付け
```

---

## デフォルトポート

| Network | ZECD RPC | Zebra RPC（バックエンド） | Health |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| 役割 | フルノード + ウォレット | インデクサー（lightwalletd を置き換える） | ウォレットサーバーのみ |
| 言語 | C++ | Rust | Rust |
| 状態 | 非推奨 | アクティブ | アクティブ（v0.5.0-rc3, 2026年7月） |
| デフォルトプール | Transparent | N/A | Orchard（shielded） |
| RPC 方言 | zcashd 固有 | gRPC（lightwalletd） | Bitcoin Core JSON-RPC |
| フルノード必要 | はい（自身） | Zebra または zcashd | Zebra |
| ステートレス復元 | いいえ | N/A | はい（シードのみ） |
| Shielded メモ | はい（`z_sendmany`） | N/A | はい（Bitcoin RPC インターフェース） |
| Watch-only（UFVK） | はい | はい | はい |
| クラウドネイティブ | いいえ | 部分的 | はい |
| インストール | ビルド/バイナリ | ビルド | `cargo install zecd` |

---

## 関連ページ

- [Zebra フルノード](Zebra_Full_Node.md) — ZECD が接続するフルノード
- [Zaino インデクサー](Zaino.md) — 別のインデクサー方式（lightwalletd を置き換える）
- [Zakura ノード](Zakura_Node.md) — 別のフルノード実装（Zebra のフォーク）
- [Viewing Keys](Viewing_Keys.md) — ZECD がアカウントの Viewing Key を使ってチェーンをスキャンする方法
- [ウォレット](/using-zcash/wallets) — ウォレットエコシステムの概要

## リソース

- [ZECD GitHub（zecrocks/zecd）](https://github.com/zecrocks/zecd)
- [ZECD 運用ランブック](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — 中核となる Zcash 暗号ライブラリ](https://github.com/zcash/librustzcash)
- [ZIP-317: 比例送金手数料メカニズム](https://zips.z.cash/zip-0317)
- [ZIP-302: Shielded メモ](https://zips.z.cash/zip-0302)
- [Zodl ウォレット（librustzcash 互換）](https://github.com/zodl-inc/zodl-ios)
