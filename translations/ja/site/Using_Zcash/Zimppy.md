<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Zimppy.xyz

## 要約

- **Zimppy** は、Zcash のMachine Payment Protocol（MPP）を使用する、AIエージェント向けのプライバシー優先（privacy-first）支払いインフラストラクチャです
- オンチェーンで**1回入金**（約75秒）すれば、リクエストごとのブロックチェーン操作なしで**無制限の即時リクエスト**を実行できます
- 完全にシールドされた Zcash（Orchard）支払いをサポートします。送信者、受信者、金額、メモはすべて暗号化されます
- AIパイプラインおよびAPIサーバーへ容易に統合できる、TypeScript と Rust のSDKに対応しています
- **LLM API、データマーケットプレイス、MCPツールサーバー**、およびあらゆるM2M支払いユースケースに最適です

---

> **Zimppy** は、シールドされた支払いと公開型支払いの両方をサポートする、Zcash 向けMachine Payment Protocol（MPP）の支払い方式です。オンチェーンで1回入金すれば、リクエストごとのチェーン操作なしで無制限の即時ベアラーリクエストを実行できます。

---

## 目次

1. [Zimppy.xyzとは？](#what-is-zimppyxyz)
2. [AIエージェントにシールドされた支払いが必要な理由](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol（MPP）](#machine-payment-protocol-mpp)
4. [Zimppyの仕組み](#how-zimppy-works)
   - [セッション（推奨）](#sessions-recommended)
   - [ストリーミング](#streaming)
   - [チャージ](#charge)
5. [ユースケースと例](#use-cases--examples)
6. [インストール](#installation)
7. [Zimppyウォレットのセットアップ](#setting-up-the-zimppy-wallet)
8. [Zimppyの統合](#integrating-zimppy--typescript-sdk)
   - [サーバー（シールド型）](#typescript-server--shielded)
   - [サーバー（公開型）](#typescript-server--transparent)
   - [クライアント](#typescript-client)
9. [Zimppyの統合 - Rust SDK](#integrating-zimppy--rust-sdk)
   - [サーバー（Axum）](#rust-server-axum)
   - [クライアント](#rust-client)
10. [CLIリファレンス](#cli-reference)
11. [主要機能](#key-features)
12. [アーキテクチャ](#architecture)
13. [例とデモ](#examples--demos)

---

## Zimppy.xyzとは？

**Zimppy.xyz** は、AIエージェントおよび自動化されたマシン間（M2M）ワークフロー向けに特別設計された、プライバシー優先の支払いインフラストラクチャです。基盤通貨として **Zcash** を使用して**Machine Payment Protocol（MPP）**を実装し、シールド型（完全プライベート）および公開型の支払いモードの両方を可能にします。

すべてのトランザクション（transaction）がオンチェーンで公開される従来のブロックチェーン支払いシステムとは異なり、Zimppyは暗号学的プライバシーを維持しながらリクエストごとのレイテンシーをなくす、セッションベースのアーキテクチャを中心に設計されています。これにより、行動メタデータを漏らすことなく、API、データ、コンピューティング、AIツールの料金をプログラムから支払う必要があるAIエージェントに特に適しています。

### 主な特性

- オンチェーンで**1回入金**（Zcash の確認に約75秒）
- セッション開始後は**無制限の即時リクエスト**、リクエストごとのチェーン操作はゼロ
- **シールドされた支払い**では、Zcash の Orchard プロトコルを使用して送信者、受信者、金額、メモを暗号化します
- **公開型支払い**では、完全なプライバシーなしでリプレイ防止のためチャレンジごとのTアドレスを使用します
- **仕様準拠**、HMAC-SHA256チャレンジ、RFC 9457エラー、`/.well-known/payment` 検出

---

## AIエージェントにシールドされた支払いが必要な理由

機密性の高いワークフロー、法務調査、医療クエリ、財務分析、競合情報を扱うAIエージェントにとって、**すべての公開支払いはメタデータ漏えいです**。Zimppyは、**デフォルトでプライベート**な唯一のMPP支払い方式です。

### プライバシー比較表

| 特性 | 公開チェーン（USDC、ETH） | Zimppyシールド型 | Zimppy公開型 |
|---|---|---|---|
| **送信者** | 可視 | 暗号化済み | 可視 |
| **受信者** | 可視 | 暗号化済み | チャレンジごと（関連付け不能） |
| **金額** | 可視 | 暗号化済み | 可視 |
| **メモ** | 可視 | 暗号化済み | 該当なし |
| **リプレイ防止** | なし | メモバインディング | チャレンジごとのTアドレス |
| **サービス利用パターン** | 関連付け可能 | プライベート | 関連付け不能（新規アドレス） |

### セッションによるレイテンシー問題の解決

> *「しかし、Zcash のブロック時間は75秒です。」*

**セッションがこれを解決します。** オンチェーンでの待機は、入金時に**1回だけ**発生します。その後のすべてのリクエストは即時です。

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**1回支払い、即時に呼び出し、おつりを受け取る。** リクエストごとのレイテンシーはゼロです。

---

## Machine Payment Protocol（MPP）

**Machine Payment Protocol（MPP）**は、自律型ソフトウェアエージェント（AIエージェント、ボット、スクリプト）が、人の介入なしにAPIアクセスに必要な支払い要件を検出、交渉、履行できるようにする標準化プロトコルです。

### MPPとAPIの統合方法

MPPはHTTPの**402 Payment Required**フローに従います。

1. **エージェントがリクエストします**：有料APIエンドポイントからリソースを要求します。
2. **サーバーが応答します**：`402 Payment Required` と署名済みチャレンジ（金額、受信者、メモ）を返します。
3. **エージェントが支払います**：互換性のある支払い方式（例：Zimppyのシールドされた Zcash）を使用します。
4. **エージェントが再試行します**：`Authorization: Payment {txid}` を付けてリクエストを再送します。
5. **サーバーが検証します**：支払いを暗号学的に検証します（Orchard IVKの復号、金額とメモの確認）。
6. **サーバーが応答します**：`200 OK` と `Payment-Receipt` ヘッダーを返します。

### 仕様準拠

- **HMAC-SHA256**チャレンジ署名
- **RFC 9457**構造化エラー応答
- 支払い方式を自動検出するための**`/.well-known/payment`**エンドポイント
- 支出鍵を公開せずにサーバー側で支払いを検証するための**Orchard IVK**（Incoming Viewing Key）

---

## Zimppyの仕組み

### セッション（推奨）

セッションは主要な対話パターンです。エージェントはオンチェーンで1回残高を入金し、ベアラートークンを受け取り、その後のすべてのリクエストにレイテンシーゼロで使用します。

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**最適な用途：** 高頻度のAPI呼び出し、LLM推論、反復的なデータクエリ。

---

### ストリーミング

**Server-Sent Events（SSE）**を介して提供される、トークンごとに従量課金されるコンテンツです。サーバーは、ストリーミングされた単語またはトークンごとにセッション残高から差し引きます。

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**最適な用途：** LLMストリーミング応答、リアルタイムデータフィード、トークンごとに課金するAIツール。

---

### チャージ

リクエストごとに1回のシールドされた支払いを行います。呼び出しごとに完全なHTTP 402フローが実行されます。リクエストが低頻度または高額な場合に適しています。

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

法務AIエージェントが有料の判例データベースにクエリを実行します。Zimppyのシールドされたセッションを使用すると、法律事務所の身元も具体的なクエリもオンチェーンで可視化されず、インフラストラクチャレベルで弁護士・依頼者間の秘匿特権を保護します。

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 医療クエリパイプライン向けAIエージェント

医療診断エージェントが複数の臨床データベースにクエリを実行します。シールドされた支払いにより、患者のクエリパターンがプロバイダー間で関連付けられることを防ぎます。

### 3. 財務分析エージェント

アルゴリズム取引エージェントがリアルタイム市場データAPIに料金を支払います。公開型支払いではチャレンジごとに新しいTアドレスを使用するため、データベンダー間での利用パターンの相関を防止します。

### 4. MCPツールサーバー、有料AIツール

MCP（Model Context Protocol）サーバーが有料AIツールを公開します。各ツール呼び出しでZimppyチャージが発生し、収益化されたAI機能のマーケットプレイスを実現します。

### 5. LLM要約ツール、トークンごとの支払い

LLM要約サービスは、SSEストリーミングを通じて出力トークンごとにエージェントへ課金し、未使用の前払い残高を自動的に差し引き・返金します。

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

## Zimppyウォレットのセットアップ

Zimppy CLIは完全なウォレット（wallet）インターフェースを提供します。すべてのコマンドは `npx zimppy` から利用できます。

### ステップ1：ウォレットを作成する

```bash
npx zimppy wallet create
```

暗号鍵を生成し、**シードフレーズ（seed phrase）**を表示します。安全に保管してください。紛失した場合は復元できません。

### ステップ2：アドレスと残高を確認する

```bash
npx zimppy wallet whoami
```

**統合アドレス（UA）**、**Tアドレス**、現在の残高、アクティブなネットワークを表示します。

```bash
npx zimppy wallet balance --all
```

すべての ZIP-32アカウントのアカウント別残高内訳を表示します。

### ステップ3：ウォレットに資金を入れる

任意の Zcash 対応ウォレットまたは取引所から、統合アドレスへ ZEC を送信します。シールドされた入金は、Orchard アカウントへ直接送られます。

### ステップ4：資金を送信してシールドする

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

### ステップ5：自動支払いリクエストを行う

```bash
npx zimppy request <url>
```

402 -> 支払い -> 再試行の完全なフローを自動的に処理します。セッションは透過的に開設・管理されます。

---

## Zimppyの統合 - TypeScript SDK

### TypeScript サーバー - シールド型

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

**主なポイント：**
- `zcash({ wallet: 'server' })` はサーバーのシールドされたウォレットを読み込みます
- `mppx.charge()` は402チャレンジ／検証ライフサイクル全体を処理します
- `result.withReceipt()` は暗号学的支払いレシートを応答に付加します

---

### TypeScript サーバー - 公開型

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

各チャレンジで**新しいTアドレス**が生成されるため、セッション間で支払いリクエストを関連付け不能にします。

---

### TypeScript クライアント

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

クライアントは `402` 応答をインターセプトし、セッションを自動で開設してリクエストを再試行します。呼び出しコードには支払い固有のロジックは不要です。

---

## Zimppyの統合 - Rust SDK

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

**主なポイント：**
- `MppCharge<Price>` はハンドラー実行前に支払いを検証するAxumエクストラクターです
- `WithReceipt` は暗号学的支払いレシートで応答をラップします
- `ChargeConfig` は料金ロジックを定義します。リクエストパラメーターに基づく動的な設定も可能です

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

`send_with_payment` は、任意のHTTPクライアントを自動402処理、セッション管理、Zcash 支払い履行で拡張します。

---

## CLIリファレンス

| コマンド | 説明 |
|---|---|
| `npx zimppy wallet create` | 鍵を生成してシードフレーズを表示 |
| `npx zimppy wallet whoami` | アドレス（UA + Tアドレス）、残高、ネットワークを表示 |
| `npx zimppy wallet balance --all` | アカウント別残高内訳 |
| `npx zimppy wallet send <addr> <zat>` | シールド型または公開型の ZEC を送信 |
| `npx zimppy wallet transfer <from> <to> <zat>` | アカウント間の内部送金 |
| `npx zimppy wallet shield` | 公開型資金を Orchard（シールド型）へ移動 |
| `npx zimppy wallet use <name>` | アクティブなウォレットIDを切り替え |
| `npx zimppy request <url>` | 402 -> 支払い -> 再試行リクエストを自動実行 |

---

## 主要機能

### エージェントネイティブなウォレット

Zimppyウォレットは、人間が管理するブラウザー拡張機能ではなく、AIエージェントによるプログラム用途向けに設計されています。鍵はCLIまたはSDKで管理され、アカウントは**ZIP-32アカウント派生**を通じてローテーションでき、ウォレットはトランザクションごとの人による承認なしに完全自動化された支払いフローをサポートします。

### マルチエージェント対応

複数のエージェントは、**ZIP-32アカウントローテーション**を使用して同じウォレットから操作できます。各エージェントには、分離された残高追跡、アカウント間送金機能、アカウント別残高レポートを備えた独自のアカウントが与えられます。これにより、単一のウォレットインフラストラクチャから多数のエージェントをフリート管理できます。

### 完全にシールドされた Zcash トランザクション（Orchard）

シールドされた支払いは、NU5 で導入されたシールドされたプール（pool）である、Zcash の**Orchardプロトコル**を使用します。サーバーは、支出鍵を公開せずに受信したノート（note）を復号できる**Incoming Viewing Key（IVK）**を使用して支払いを検証します。リプレイ攻撃は**メモバインディング**によって防止されます。各チャレンジには、暗号学的に検証される一意の `zimppy:{challenge_id}` メモが埋め込まれます。

### セッション、リクエストごとのレイテンシーゼロ

セッションアーキテクチャは、オンチェーン確認の待機時間をリクエストごとのレイテンシーから分離します。1回の入金（約75秒）の後、セッション終了まで、以降のすべてのベアラートークンリクエストはブロックチェーン操作なしで即時に処理されます。

### ストリーミング、トークンごとの支払い

ネイティブの**SSE（Server-Sent Events）**サポートにより、トークンごとに従量課金されるコンテンツを提供できます。出力長が可変で、請求額が実際の消費量を反映すべきLLM推論APIに最適です。

### 仕様準拠

- **HMAC-SHA256**署名済みチャレンジが改ざんを防止します
- 相互運用可能なエラー処理のための**RFC 9457**構造化エラー形式
- MPP準拠エージェントによる支払い方式の自動検出のための**`/.well-known/payment`**

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

### コンポーネントの責務

**`zimppy-core`** - 暗号学的コアです。サーバーのIVKを使用した Orchard ノート復号、メモ解析、リプレイ防止ロジック、チャレンジ検証を処理します。性能と正確性のために Rust で記述されています。

**`zimppy-wallet`** - `zingolib` を基盤とするネイティブ Zcash ウォレットです。鍵、アカウント、シールド型／公開型残高、トランザクション送信を管理します。

**`zimppy-rs`** - Rust SDKです。`ChargeMethod`、`SessionMethod`、`PaymentProvider` トレイトに加え、人間工学的なサーバー統合のためのAxumエクストラクター（`MppCharge`、`WithReceipt`）を提供します。

**`zimppy-napi`** - Rust コアを Node.js に公開するNAPI-RSバインディングです。これにより、TypeScript SDKは JavaScript で Zcash プリミティブを再実装せずに、同じ暗号エンジンを使用できます。

**`zimppy-ts`** - TypeScript SDKです。NAPIバインディングを、チャージ、セッション、SSEストリーミングフロー向けの慣用的なasync/await APIでラップします。

**`zimppy-cli`** - コマンドラインのウォレットおよびリクエストツールです。自動支払い（402 -> 支払い -> 再試行）、セッション管理、すべてのウォレット操作に対応します。

---

## 例とデモ

| 例 | 説明 |
|---|---|
| `examples/fortune-teller/` | チャージ、セッション、ストリーミングのデモ - Rust サーバー + クライアント |
| `examples/llm-summarizer/` | トークンごとに課金するLLMストリーミングデモ |
| `examples/mcp-server/` | 有料AIツールを備えたMCPツールサーバー |
| `examples/ts-server/` | TypeScript MPPサーバーのリファレンス実装 |

---

## 含まれる機能 - 機能概要

| 機能 | 説明 |
|---|---|
| **セッション** | 1回入金、即時ベアラーリクエスト、終了時に返金 |
| **ストリーミング** | SSE経由のトークンごとに従量課金されるコンテンツ |
| **チャージ** | HTTPリクエストごとのシールド型または公開型支払い（402フロー） |
| **公開型支払い** | チャレンジごとのリプレイ防止機能とシールドコマンドを備えたTアドレス |
| **マルチアカウント** | ZIP-32アカウントローテーション、アカウント間送金、アカウント別残高 |
| **CLIウォレット** | 送信、シールド、送金、balance --all、whoami、自動支払い |
| **デュアルSDK** | TypeScript と Rust |
| **仕様準拠** | HMAC-SHA256チャレンジ、RFC 9457エラー、`/.well-known/payment` 検出 |

---

*詳細については、[zimppy.xyz](https://zimppy.xyz) をご覧ください*

---

## 関連ページ

- [ウォレット](/using-zcash/wallets) — シールドされたトランザクションをサポートする Zcash ウォレット
- [シールドされたプール](/using-zcash/shielded-pools) — Orchard のシールドされたトランザクションが支払いデータを保護する仕組み
- [決済処理サービス](/using-zcash/payment-processors) — Zcash 支払いを受け付けるその他の方法
- [Zcash シールドされた資産](/zcash-tech/zcash-shielded-assets) — ZSAと Zcash プログラマビリティの未来
- [コミュニティプロジェクト](/zcash-community/community-projects) — さらに多くの Zcash エコシステムプロジェクト
