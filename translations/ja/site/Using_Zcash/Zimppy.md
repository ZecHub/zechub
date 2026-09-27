<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** は、Zcash の Machine Payment Protocol（MPP）を使用する、AIエージェント向けのプライバシー優先決済インフラです
- オンチェーンで**一度だけ入金**（約75秒）すれば、その後はリクエストごとのブロックチェーン操作なしに**無制限の即時リクエスト**が可能です
- 完全にシールドされた Zcash（Orchard）決済をサポートし、送信者、受信者、金額、メモはすべて暗号化されます
- TypeScript および Rust SDK に対応しており、AIパイプラインやAPIサーバーへ簡単に統合できます
- **LLM API、データマーケットプレイス、MCPツールサーバー**、その他あらゆるM2M決済ユースケースに最適です

---

> **Zimppy** は、シールド決済と透明決済の両方に対応する、Zcash 向けの Machine Payment Protocol（MPP）決済方式です。オンチェーンで一度入金すれば、リクエストごとのチェーン操作なしに無制限の即時ベアラーリクエストを実行できます。

---

## 目次

1. [Zimppy.xyz とは？](#what-is-zimppyxyz)
2. [AIエージェントにシールド決済が必要な理由](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol（MPP）](#machine-payment-protocol-mpp)
4. [Zimppy の仕組み](#how-zimppy-works)
   - [セッション（推奨）](#sessions-recommended)
   - [ストリーミング](#streaming)
   - [チャージ](#charge)
5. [ユースケースと例](#use-cases--examples)
6. [インストール](#installation)
7. [Zimppy ウォレットのセットアップ](#setting-up-the-zimppy-wallet)
8. [Zimppy の統合](#integrating-zimppy--typescript-sdk)
   - [サーバー（シールド）](#typescript-server--shielded)
   - [サーバー（透明）](#typescript-server--transparent)
   - [クライアント](#typescript-client)
9. [Zimppy の統合 - Rust SDK](#integrating-zimppy--rust-sdk)
   - [サーバー（Axum）](#rust-server-axum)
   - [クライアント](#rust-client)
10. [CLI リファレンス](#cli-reference)
11. [主な機能](#key-features)
12. [アーキテクチャ](#architecture)
13. [サンプルとデモ](#examples--demos)

---

## Zimppy.xyz とは？

**Zimppy.xyz** は、AIエージェントおよび自動化されたマシン間（M2M）ワークフローのために特別設計された、プライバシー優先の決済インフラです。基盤通貨として **Zcash** を使用し、**Machine Payment Protocol（MPP）** を実装することで、シールド（完全プライベート）決済と透明決済の両方を実現します。

すべての取引がオンチェーンで公開される従来のブロックチェーン決済システムとは異なり、Zimppy は暗号学的プライバシーを保ちながらリクエストごとのレイテンシーを排除する、セッションベースのアーキテクチャを中心に設計されています。そのため、行動メタデータを漏らすことなく、API、データ、コンピューティング、AIツールの料金をプログラムから支払う必要があるAIエージェントに特に適しています。

### 主な特性

- オンチェーンで**一度だけ入金**（Zcash の承認には約75秒）
- セッション開始後は**無制限の即時リクエスト**。リクエストごとのチェーン操作はゼロ
- **シールド決済**では、Zcash の Orchard プロトコルにより送信者、受信者、金額、メモを暗号化
- **透明決済**では、完全なプライバシーを必要としない場合に、リプレイ防止のためチャレンジごとのTアドレスを使用
- **仕様準拠**：HMAC-SHA256 チャレンジ、RFC 9457 エラー、`/.well-known/payment` 検出

---

## AIエージェントにシールド決済が必要な理由

機密性の高いワークフロー、法務調査、医療クエリ、財務分析、競合情報を扱うAIエージェントにとって、**公開決済はすべてメタデータ漏洩につながります**。Zimppy は、**デフォルトでプライベート**な唯一のMPP決済方式です。

### プライバシー比較表

| 特性 | パブリックチェーン（USDC、ETH） | Zimppy シールド | Zimppy 透明 |
|---|---|---|---|
| **送信者** | 可視 | 暗号化 | 可視 |
| **受信者** | 可視 | 暗号化 | チャレンジごと（リンク不能） |
| **金額** | 可視 | 暗号化 | 可視 |
| **メモ** | 可視 | 暗号化 | 該当なし |
| **リプレイ防止** | なし | メモバインディング | チャレンジごとのTアドレス |
| **サービス利用パターン** | リンク可能 | プライベート | リンク不能（新しいアドレス） |

### セッションによるレイテンシー問題の解決

> *「しかし Zcash のブロック時間は75秒です。」*

**セッションがこれを解決します。** オンチェーンでの待機は、入金時に**一度だけ**発生します。その後のすべてのリクエストは即時です。

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**一度支払い、即時に呼び出し、おつりを受け取る。** リクエストごとのレイテンシーはゼロです。

---

## Machine Payment Protocol（MPP）

**Machine Payment Protocol（MPP）** は、自律的なソフトウェアエージェント（AIエージェント、ボット、スクリプト）が、人間の介入なしにAPIアクセスの決済要件を検出、交渉、履行できるようにする標準化プロトコルです。

### MPP と API の統合方法

MPP は HTTP の **402 Payment Required** フローに従います。

1. **エージェントがリクエスト**：有料APIエンドポイントからリソースを要求します。
2. **サーバーが応答**：`402 Payment Required` と署名済みチャレンジ（金額、受取人、メモ）を返します。
3. **エージェントが支払い**：互換性のある決済方式（例：Zimppy のシールド Zcash）を使用します。
4. **エージェントが再試行**：`Authorization: Payment {txid}` を付加してリクエストを再送します。
5. **サーバーが検証**：決済を暗号学的に検証します（Orchard IVK 復号、金額とメモの確認）。
6. **サーバーが応答**：`200 OK` と `Payment-Receipt` ヘッダーを返します。

### 仕様準拠

- **HMAC-SHA256** チャレンジ署名
- **RFC 9457** 構造化エラーレスポンス
- 決済方式の自動検出用 **`/.well-known/payment`** エンドポイント
- 支出鍵を公開せずにサーバー側で決済検証を行う **Orchard IVK**（Incoming Viewing Key）

---

## Zimppy の仕組み

### セッション（推奨）

セッションは主要な利用パターンです。エージェントはオンチェーンで一度残高を入金し、ベアラートークンを受け取って、その後のすべてのリクエストでレイテンシーゼロの決済を行います。

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**最適な用途：** 高頻度API呼び出し、LLM推論、繰り返し行うデータクエリ。

---

### ストリーミング

**Server-Sent Events（SSE）** を介して配信される、トークン単位課金のコンテンツです。サーバーはストリーミングする単語またはトークンごとにセッション残高から差し引きます。

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**最適な用途：** LLMのストリーミング応答、リアルタイムデータフィード、トークン単位課金AIツール。

---

### チャージ

リクエストごとに単一のシールド決済を実行します。完全な HTTP 402 フローが呼び出しごとに実行されます。リクエスト頻度が低い場合や高額な場合に適しています。

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**最適な用途：** 高額な単発リクエスト、低頻度のAPI呼び出し、プレミアムデータエンドポイント。

---

## ユースケースと例

### 1. AIエージェント

法務AIエージェントが、有料の判例データベースをクエリします。Zimppy のシールドセッションを使用すれば、法律事務所の身元も具体的なクエリ内容もオンチェーンに公開されず、インフラレベルで弁護士・依頼者間の秘匿特権を保護できます。

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 医療クエリパイプライン向けAIエージェント

医療診断エージェントが複数の臨床データベースをクエリします。シールド決済により、患者クエリのパターンがプロバイダー間でリンクされることを防ぎます。

### 3. 財務分析エージェント

アルゴリズム取引エージェントがリアルタイム市場データAPIに料金を支払います。透明決済ではチャレンジごとに新しいTアドレスを使用するため、データベンダー間での利用パターンの相関を防止します。

### 4. MCPツールサーバー、有料AIツール

MCP（Model Context Protocol）サーバーが有料AIツールを公開します。各ツール呼び出しで Zimppy チャージが発生し、収益化されたAI機能のマーケットプレイスを実現します。

### 5. LLM要約サービス、トークン単位課金

LLM要約サービスは、SSEストリーミング経由で出力トークンごとにエージェントへ課金し、残高を自動的に差し引き、未使用の前払い残高を返金します。

---

## インストール

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Rust

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Zimppy ウォレットのセットアップ

Zimppy CLI は完全なウォレットインターフェースを提供します。すべてのコマンドは `npx zimppy` から利用できます。

### ステップ1：ウォレットの作成

```bash
npx zimppy wallet create
```

暗号鍵を生成し、**シードフレーズ**を表示します。これは安全に保管してください。紛失した場合は復元できません。

### ステップ2：アドレスと残高の確認

```bash
npx zimppy wallet whoami
```

**Unified Address（UA）**、**Tアドレス**、現在の残高、アクティブなネットワークを表示します。

```bash
npx zimppy wallet balance --all
```

すべての ZIP-32 アカウントのアカウント別残高内訳を表示します。

### ステップ3：ウォレットへの入金

Zcash 対応の任意のウォレットまたは取引所から、Unified Address に ZEC を送信します。シールド入金は直接 Orchard アカウントに入ります。

### ステップ4：資金の送金とシールド化

```bash
# Send ZEC to any address (shielded or transparent)
npx zimppy wallet send <addr> 42000

# Move transparent funds into Orchard (shielded)
npx zimppy wallet shield

# Transfer between your own accounts
npx zimppy wallet transfer 0 1 50000

# Switch active wallet identity
npx zimppy wallet use work
```

### ステップ5：自動支払いリクエストの実行

```bash
npx zimppy request <url>
```

完全な 402 -> 支払い -> 再試行フローを自動的に処理します。セッションは透過的に開始・管理されます。

---

## Zimppy の統合 - TypeScript SDK

### TypeScript サーバー - シールド

```typescript
import { Mppx } from 'mppx/server'
import { zcash } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcash({ wallet: 'server' })],
  realm: 'my-api',
  secretKey: process.env.MPP_SECRET_KEY,
})

const result = await mppx.charge({
  amount: '42000',
  currency: 'zec',
})(request)

if (result.status === 402) return result.challenge

return result.withReceipt(Response.json({ data }))
```

**ポイント：**
- `zcash({ wallet: 'server' })` はサーバーのシールドウォレットを読み込みます
- `mppx.charge()` は完全な402チャレンジ／検証ライフサイクルを処理します
- `result.withReceipt()` は暗号学的な決済レシートをレスポンスに付加します

---

### TypeScript サーバー - 透明

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

各チャレンジで**新しいTアドレス**が生成されるため、決済リクエストはセッション間でリンク不能になります。

---

### TypeScript クライアント

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

クライアントは `402` レスポンスをインターセプトし、自動的にセッションを開始してリクエストを再試行します。呼び出し元のコードに決済固有のロジックは必要ありません。

---

## Zimppy の統合 - Rust SDK

### Rust サーバー（Axum）

```rust
use mpp::server::axum::*;
use zimppy_rs::ZcashChallenger;

struct Price;

impl ChargeConfig for Price {
    fn amount() -> &'static str { "42000" }
}

async fn handler(charge: MppCharge<Price>) -> WithReceipt<Json<Value>> {
    WithReceipt {
        receipt: charge.receipt,
        body: Json(data),
    }
}
```

**ポイント：**
- `MppCharge<Price>` は、ハンドラー実行前に決済を検証する Axum エクストラクターです
- `WithReceipt` は、暗号学的な決済レシートでレスポンスをラップします
- `ChargeConfig` は価格設定ロジックを定義します。リクエストパラメータに応じて動的に設定できます

---

### Rust クライアント

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` は、任意のHTTPクライアントを自動402処理、セッション管理、Zcash 決済履行の機能で拡張します。

---

## CLI リファレンス

| コマンド | 説明 |
|---|---|
| `npx zimppy wallet create` | 鍵を生成してシードフレーズを表示 |
| `npx zimppy wallet whoami` | アドレス（UA + Tアドレス）、残高、ネットワークを表示 |
| `npx zimppy wallet balance --all` | アカウント別残高内訳 |
| `npx zimppy wallet send <addr> <zat>` | シールドまたは透明の ZEC を送信 |
| `npx zimppy wallet transfer <from> <to> <zat>` | アカウント間の内部送金 |
| `npx zimppy wallet shield` | 透明資金を Orchard（シールド）へ移動 |
| `npx zimppy wallet use <name>` | アクティブなウォレットIDを切り替え |
| `npx zimppy request <url>` | 自動 402 -> 支払い -> リクエスト再試行 |

---

## 主な機能

### エージェントネイティブウォレット

Zimppy ウォレットは、人間が管理するブラウザー拡張機能ではなく、AIエージェントによるプログラム利用のために設計されています。鍵は CLI または SDK により管理され、アカウントは **ZIP-32 アカウント導出**を通じてローテーションでき、ウォレットは取引ごとの人間の承認なしに完全自動の決済フローをサポートします。

### マルチエージェント対応

複数のエージェントが **ZIP-32 アカウントローテーション**を使用して同じウォレットから操作できます。各エージェントには、分離された残高追跡、アカウント間送金機能、アカウント別残高レポートを備えた独自のアカウントが与えられます。これにより、単一のウォレットインフラから多数のエージェント群を管理できます。

### 完全シールド Zcash トランザクション（Orchard）

シールド決済は、最新かつ最も安全なシールドプールである Zcash の **Orchard プロトコル**を使用します。サーバーは、支出鍵を公開せずに受信ノートを復号できる **Incoming Viewing Key（IVK）** により決済を検証します。リプレイ攻撃は**メモバインディング**により防止されます。各チャレンジには暗号学的に検証される一意の `zimppy:{challenge_id}` メモが埋め込まれます。

### セッション、リクエストごとのレイテンシーゼロ

セッションアーキテクチャは、オンチェーン承認の待機時間をリクエストごとのレイテンシーから切り離します。一度の入金（約75秒）の後、すべてのベアラートークンリクエストは、セッション終了時までブロックチェーン操作なしに即時処理されます。

### ストリーミング、トークン単位課金

ネイティブの **SSE（Server-Sent Events）** 対応により、トークン単位課金コンテンツを実現します。出力長が可変であり、実際の消費量に応じた課金が求められるLLM推論APIに最適です。

### 仕様準拠

- **HMAC-SHA256** 署名済みチャレンジにより偽造を防止
- 相互運用可能なエラー処理のための **RFC 9457** 構造化エラー形式
- MPP準拠エージェントによる決済方式の自動検出のための **`/.well-known/payment`**

---

## アーキテクチャ

```
crates/
  zimppy-core/       Zcash verification engine (Orchard decryption, replay protection)
  zimppy-wallet/     Native Zcash wallet (zingolib)
  zimppy-rs/         Rust SDK (ChargeMethod, SessionMethod, PaymentProvider, axum extractors)
  zimppy-napi/       Node.js native bindings (NAPI-RS)

packages/
  zimppy-ts/         TypeScript SDK (charge, session, SSE)
  zimppy-cli/        CLI with auto-pay and session management
```

### コンポーネントの役割

**`zimppy-core`** - 暗号学的コア。サーバーのIVKを使用する Orchard ノート復号、メモ解析、リプレイ防止ロジック、チャレンジ検証を処理します。パフォーマンスと正確性のために Rust で記述されています。

**`zimppy-wallet`** - `zingolib` を基盤とするネイティブ Zcash ウォレットです。鍵、アカウント、シールド／透明残高、トランザクション送信を管理します。

**`zimppy-rs`** - Rust SDK。`ChargeMethod`、`SessionMethod`、`PaymentProvider` トレイトに加え、使いやすいサーバー統合のための Axum エクストラクター（`MppCharge`、`WithReceipt`）を提供します。

**`zimppy-napi`** - Rust コアを Node.js に公開する NAPI-RS バインディングです。これにより TypeScript SDK は、JavaScriptで Zcash プリミティブを再実装せずに同じ暗号エンジンを使用できます。

**`zimppy-ts`** - TypeScript SDK。NAPI バインディングをラップし、チャージ、セッション、SSEストリーミングフロー向けに慣用的な async/await API を提供します。

**`zimppy-cli`** - コマンドラインのウォレットおよびリクエストツールです。自動支払い（402 -> 支払い -> 再試行）、セッション管理、すべてのウォレット操作をサポートします。

---

## サンプルとデモ

| サンプル | 説明 |
|---|---|
| `examples/fortune-teller/` | チャージ、セッション、ストリーミングのデモ - Rust サーバー + クライアント |
| `examples/llm-summarizer/` | トークン単位課金 LLM ストリーミングデモ |
| `examples/mcp-server/` | 有料AIツールを備えた MCP ツールサーバー |
| `examples/ts-server/` | TypeScript MPP サーバーのリファレンス実装 |

---

## 含まれる機能 - 機能概要

| 機能 | 説明 |
|---|---|
| **セッション** | 一度入金、即時ベアラーリクエスト、終了時に返金 |
| **ストリーミング** | SSE経由のトークン単位課金コンテンツ |
| **チャージ** | HTTPリクエストごとのシールドまたは透明決済（402フロー） |
| **透明決済** | チャレンジごとのリプレイ防止機能を備えたTアドレス + shield コマンド |
| **マルチアカウント** | ZIP-32 アカウントローテーション、アカウント間送金、アカウント別残高 |
| **CLI ウォレット** | 送金、シールド、送金振替、balance --all、whoami、自動支払い |
| **デュアルSDK** | TypeScript と Rust |
| **仕様準拠** | HMAC-SHA256 チャレンジ、RFC 9457 エラー、`/.well-known/payment` 検出 |

---

*詳細は [zimppy.xyz](https://zimppy.xyz) をご覧ください*

---

## 関連ページ

- [ウォレット](/using-zcash/wallets) — シールドトランザクションをサポートする Zcash ウォレット
- [シールドプール](/using-zcash/shielded-pools) — Orchard シールドトランザクションが決済データを保護する仕組み
- [決済処理サービス](/using-zcash/payment-processors) — Zcash 決済を受け付けるその他の方法
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSA と Zcash のプログラマビリティの未来
- [コミュニティプロジェクト](/zcash-community/community-projects) — Zcash エコシステムのその他のプロジェクト
