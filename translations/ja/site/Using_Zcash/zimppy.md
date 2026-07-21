<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Zimppy.xyz

## 要点

- **Zimppy** は、Zcash の Machine Payment Protocol (MPP) を使用した、AI エージェント向けのプライバシー第一の決済インフラです
- オンチェーンで一度だけ**デポジット**すれば（約75秒）、その後はリクエストごとにブロックチェーンとのやり取りを行うことなく、**無制限の即時リクエスト**が可能です
- **完全にシールド化された Zcash (Orchard)** 決済をサポートしており、送信者、受信者、金額、メモはすべて暗号化されます
- **TypeScript と Rust の SDK** に対応しており、AI パイプラインや API サーバーへ簡単に統合できます
- **LLM API、データマーケットプレイス、MCP ツールサーバー**、およびあらゆる M2M 決済ユースケースに最適です

---

> **Zimppy** は、シールド型および透明型の両方の支払いをサポートする、Zcash 向けの Machine Payment Protocol (MPP) 決済方式です。オンチェーンで一度だけデポジットすれば、リクエストごとにチェーンとのやり取りを行うことなく、無制限の即時ベアラーリクエストを実行できます。

---

## 目次

1. [Zimppy.xyz とは？](#what-is-zimppyxyz)
2. [AI エージェントにとってシールド決済が重要な理由](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy の仕組み](#how-zimppy-works)
   - [セッション（推奨）](#sessions-recommended)
   - [ストリーミング](#streaming)
   - [Charge](#charge)
5. [ユースケースと例](#use-cases--examples)
6. [インストール](#installation)
7. [Zimppy ウォレットの設定](#setting-up-the-zimppy-wallet)
8. [Zimppy の統合](#integrating-zimppy--typescript-sdk)
   - [サーバー（シールド）](#typescript-server--shielded)
   - [サーバー（透明型）](#typescript-server--transparent)
   - [クライアント](#typescript-client)
9. [Zimppy - Rust SDK の統合](#integrating-zimppy--rust-sdk)
   - [サーバー（Axum）](#rust-server-axum)
   - [クライアント](#rust-client)
10. [CLI リファレンス](#cli-reference)
11. [主な機能](#key-features)
12. [アーキテクチャ](#architecture)
13. [例とデモ](#examples--demos)

---

## Zimppy.xyz とは？

**Zimppy.xyz** は、AI エージェントおよび自動化されたマシン・ツー・マシン（M2M）ワークフロー向けに特化して設計された、プライバシー第一の決済インフラです。基盤通貨として **Zcash** を用いた **Machine Payment Protocol (MPP)** を実装しており、シールド型（完全プライベート）と透明型の両方の支払いモードを可能にします。

あらゆる取引がオンチェーン上で公開される従来型のブロックチェーン決済システムとは異なり、Zimppy は、暗号学的なプライバシーを維持しながら、リクエストごとの遅延を排除するセッションベースのアーキテクチャを中心に設計されています。そのため、API、データ、計算資源、AI ツールに対して、行動メタデータを漏らすことなくプログラム的に支払いを行う必要がある AI エージェントに特に適しています。

### コア特性

- オンチェーンで一度だけ**デポジット**（Zcash の承認に約75秒）
- セッション開始後は**無制限の即時リクエスト**、リクエストごとのチェーン操作はゼロ
- **シールド決済**では、Zcash の Orchard プロトコルにより送信者、受信者、金額、メモを暗号化
- **透明型決済**では、完全なプライバシーはないものの、リプレイ防止のためにチャレンジごとの T-address を使用
- **仕様準拠**、HMAC-SHA256 チャレンジ、RFC 9457 エラー、`/.well-known/payment` ディスカバリー

---

## AI エージェントにとってシールド決済が重要な理由

機密性の高いワークフロー、法務調査、医療問い合わせ、金融分析、競合調査を扱う AI エージェントにとって、**公開決済はすべてメタデータ漏えいです**。Zimppy は、デフォルトで**プライベート**な唯一の MPP 決済方式です。

### プライバシー比較表

| Property | Public Chains (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Sender** | Visible | Encrypted | Visible |
| **Receiver** | Visible | Encrypted | Per-challenge (unlinkable) |
| **Amount** | Visible | Encrypted | Visible |
| **Memo** | Visible | Encrypted | N/A |
| **Replay Protection** | None | Memo binding | Per-challenge T-address |
| **Service Usage Pattern** | Linkable | Private | Unlinkable (fresh addr) |

### 遅延の問題をセッションで解決

> *「でも Zcash のブロック時間は75秒ですよね。」*

**セッションがこれを解決します。** オンチェーンでの待機は、デポジット時に**一度だけ**発生します。その後のすべてのリクエストは即時です。

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**一度支払って、即時に呼び出し、差額を受け取る。** リクエストごとの遅延はゼロです。

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** は、自律的なソフトウェアエージェント（AI エージェント、ボット、スクリプト）が、人の介入なしに API アクセスに必要な支払い条件を発見し、交渉し、満たすことを可能にする標準化されたプロトコルです。

### MPP が API と統合される仕組み

MPP は HTTP の **402 Payment Required** フローに従います。

1. **エージェントが**有料 API エンドポイントのリソースをリクエストします。
2. **サーバーが** `402 Payment Required` と署名付きチャレンジ（金額、受取人、メモ）を返します。
3. **エージェントが**互換性のある支払い方式（例: Zimppy のシールド型 Zcash）で支払います。
4. **エージェントが** `Authorization: Payment {txid}` を付けてリクエストを再試行します。
5. **サーバーが**支払いを暗号学的に検証します（Orchard IVK 復号、金額とメモの確認）。
6. **サーバーが** `200 OK` と `Payment-Receipt` ヘッダーを返します。

### 仕様準拠

- **HMAC-SHA256** によるチャレンジ署名
- **RFC 9457** 構造化エラーレスポンス
- 支払い方式を自動検出するための **`/.well-known/payment`** エンドポイント
- 支出鍵を公開せずにサーバー側で支払い検証を行うための **Orchard IVK**（Incoming Viewing Key）

---

## Zimppy の仕組み

### セッション（推奨）

セッションは主要な利用パターンです。エージェントはオンチェーンで一度だけ残高をデポジットし、ベアラートークンを受け取り、その後のすべてのリクエストを遅延ゼロで実行します。

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**最適な用途:** 高頻度 API 呼び出し、LLM 推論、繰り返しのデータクエリ。

---

### ストリーミング

**Server-Sent Events (SSE)** を介して配信される従量課金型コンテンツです。サーバーは、ストリーミングされた単語またはトークンごとにセッション残高から差し引きます。

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**最適な用途:** LLM のストリーミング応答、リアルタイムデータフィード、トークン単位課金の AI ツール。

---

### Charge

リクエストごとに単一のシールド決済を行います。呼び出しごとに完全な HTTP 402 フローが実行されます。リクエスト頻度が低い場合や高額な場合に適しています。

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**最適な用途:** 高額な単発リクエスト、低頻度 API 呼び出し、プレミアムデータエンドポイント。

---

## ユースケースと例

### 1. AI エージェント

ある法務 AI エージェントが、有料の判例データベースを照会します。Zimppy のシールドセッションを使用すれば、法律事務所の身元も、具体的な検索内容もオンチェーン上に可視化されず、インフラレベルで弁護士・依頼者間秘匿特権を保護できます。

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 医療問い合わせパイプライン向け AI エージェント

医療診断エージェントが複数の臨床データベースを照会します。シールド決済により、患者の問い合わせパターンが複数プロバイダー間で結び付けられることを防ぎます。

### 3. 金融分析エージェント

アルゴリズム取引エージェントがリアルタイム市場データ API に対して支払いを行います。透明型決済では、チャレンジごとに新しい T-address を使うため、データベンダー間で利用パターンが相関付けられるのを防げます。

### 4. MCP ツールサーバー、有料 AI ツール

MCP（Model Context Protocol）サーバーが有料の AI ツールを公開します。各ツール呼び出しで Zimppy の Charge が発生し、収益化された AI 機能のマーケットプレイスを実現します。

### 5. LLM 要約ツール、トークン単位課金

LLM 要約サービスは、SSE ストリーミングを通じて出力トークンごとにエージェントへ課金し、自動的に残高を差し引き、未使用の前払い残高を返金します。

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

## Zimppy ウォレットの設定

Zimppy CLI は完全なウォレットインターフェースを提供します。すべてのコマンドは `npx zimppy` から利用できます。

### ステップ 1 : ウォレットを作成する

```bash
npx zimppy wallet create
```

暗号鍵が生成され、**シードフレーズ**が表示されます。これは安全に保管してください。紛失した場合、復元できません。

### ステップ 2 : アドレスと残高を確認する

```bash
npx zimppy wallet whoami
```

**Unified Address (UA)**、**T-address**、現在の残高、アクティブなネットワークが表示されます。

```bash
npx zimppy wallet balance --all
```

すべての ZIP-32 アカウントにわたる、アカウントごとの残高内訳を表示します。

### ステップ 3 : ウォレットに資金を入れる

任意の Zcash 対応ウォレットまたは取引所から、あなたの Unified Address に ZEC を送金します。シールドされた入金は、直接あなたの Orchard アカウントに入ります。

### ステップ 4 : 送金して資金をシールド化する

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

### ステップ 5 : 自動支払いリクエストを行う

```bash
npx zimppy request <url>
```

完全な 402 -> pay -> retry フローを自動的に処理します。セッションの開始と管理も透過的に行われます。

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

**ポイント:**
- `zcash({ wallet: 'server' })` はサーバーのシールドウォレットを読み込みます
- `mppx.charge()` は完全な 402 チャレンジ/検証ライフサイクルを処理します
- `result.withReceipt()` は暗号学的な支払いレシートをレスポンスに付加します

---

### TypeScript サーバー - 透明型

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

各チャレンジごとに**新しい T-address** が生成されるため、セッション間で支払いリクエストを結び付けることができません。

---

### TypeScript クライアント

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

クライアントは `402` レスポンスをインターセプトし、自動的にセッションを開始してリクエストを再試行します。呼び出し側のコードに支払い固有のロジックは不要です。

---

## Zimppy の統合 - Rust SDK

### Rust サーバー (Axum)

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

**ポイント:**
- `MppCharge<Price>` は、ハンドラー実行前に支払いを検証する Axum extractor です
- `WithReceipt` は、暗号学的な支払いレシートを付けてレスポンスをラップします
- `ChargeConfig` は価格設定ロジックを定義します。リクエストパラメータに応じて動的にすることも可能です

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

`send_with_payment` は、任意の HTTP クライアントを、自動 402 処理、セッション管理、Zcash 決済実行に対応させて拡張します。

---

## CLI リファレンス

| Command | Description |
|---|---|
| `npx zimppy wallet create` | 鍵を生成し、シードフレーズを表示 |
| `npx zimppy wallet whoami` | アドレス（UA + T-addr）、残高、ネットワークを表示 |
| `npx zimppy wallet balance --all` | アカウントごとの残高内訳 |
| `npx zimppy wallet send <addr> <zat>` | シールド型または透明型の ZEC を送信 |
| `npx zimppy wallet transfer <from> <to> <zat>` | アカウント間の内部送金 |
| `npx zimppy wallet shield` | 透明型資金を Orchard（シールド）へ移動 |
| `npx zimppy wallet use <name>` | アクティブなウォレット ID を切り替え |
| `npx zimppy request <url>` | 402 -> pay -> retry リクエストを自動実行 |

---

## 主な機能

### エージェントネイティブなウォレット

Zimppy ウォレットは、人が管理するブラウザ拡張ではなく、AI エージェントによるプログラム的利用のために設計されています。鍵は CLI または SDK で管理され、アカウントは **ZIP-32 account derivation** によってローテーション可能で、ウォレットは取引ごとの人間の承認なしに完全自動の支払いフローをサポートします。

### マルチエージェント対応

複数のエージェントが、**ZIP-32 account rotation** を使って同じウォレットから動作できます。各エージェントは独自のアカウントを持ち、残高追跡の分離、アカウント間送金、アカウントごとの残高レポートが可能です。これにより、単一のウォレット基盤から多数のエージェントをフリート管理できます。

### 完全シールド型 Zcash トランザクション（Orchard）

シールド決済は、Zcash の **Orchard protocol** を使用します。これは最新かつ最も安全なシールドプールです。サーバーは **Incoming Viewing Key (IVK)** を使用して支払いを検証し、支出鍵を公開することなく受信ノートを復号できます。リプレイ攻撃は **memo binding** によって防止されます。各チャレンジには、一意の `zimppy:{challenge_id}` メモが埋め込まれ、暗号学的に検証されます。

### セッション , リクエストごとの遅延ゼロ

セッションアーキテクチャにより、オンチェーン承認待ちとリクエストごとの遅延が切り離されます。一度デポジットすれば（約75秒）、その後のすべてのベアラートークンリクエストは、セッション終了までブロックチェーンとのやり取りなしで即時に処理されます。

### ストリーミング , トークン単位課金

ネイティブな **SSE (Server-Sent Events)** サポートにより、トークン単位の従量課金コンテンツが可能になります。出力量が可変で、実際の消費量に応じて請求すべき LLM 推論 API に最適です。

### 仕様準拠

- **HMAC-SHA256** 署名付きチャレンジにより偽造を防止
- **RFC 9457** 構造化エラーフォーマットにより相互運用可能なエラー処理を実現
- 任意の MPP 準拠エージェントによる自動支払い方式検出のための **`/.well-known/payment`**

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

### 各コンポーネントの責務

**`zimppy-core`** - 暗号学的コアです。サーバーの IVK を使った Orchard ノート復号、メモ解析、リプレイ防止ロジック、チャレンジ検証を処理します。性能と正確性のため Rust で書かれています。

**`zimppy-wallet`** - `zingolib` を基盤とするネイティブ Zcash ウォレットです。鍵、アカウント、シールド型/透明型残高、トランザクション送信を管理します。

**`zimppy-rs`** - Rust SDK です。`ChargeMethod`、`SessionMethod`、`PaymentProvider` トレイトに加え、サーバーへの統合を容易にする Axum extractor（`MppCharge`、`WithReceipt`）を提供します。

**`zimppy-napi`** - Rust コアを Node.js に公開する NAPI-RS バインディングです。これにより、TypeScript SDK は JavaScript で Zcash プリミティブを再実装することなく、同じ暗号エンジンを利用できます。

**`zimppy-ts`** - TypeScript SDK です。NAPI バインディングを、charge、session、SSE ストリーミングフロー向けの、慣用的な async/await API でラップします。

**`zimppy-cli`** - コマンドラインのウォレット兼リクエストツールです。自動支払い（402 -> pay -> retry）、セッション管理、すべてのウォレット操作をサポートします。

---

## 例とデモ

| Example | Description |
|---|---|
| `examples/fortune-teller/` | Charge、session、streaming のデモ - Rust サーバー + クライアント |
| `examples/llm-summarizer/` | トークン単位課金の LLM ストリーミングデモ |
| `examples/mcp-server/` | 有料 AI ツールを備えた MCP ツールサーバー |
| `examples/ts-server/` | TypeScript MPP サーバーのリファレンス実装 |

---

## 含まれる機能 - 機能概要

| Feature | Description |
|---|---|
| **Sessions** | 一度デポジットし、即時ベアラーリクエスト、終了時に返金 |
| **Streaming** | SSE 上のトークン単位従量課金コンテンツ |
| **Charge** | HTTP リクエストごとのシールド型または透明型決済（402 フロー） |
| **Transparent Payments** | チャレンジごとのリプレイ防止付き T-address + shield コマンド |
| **Multi-Account** | ZIP-32 account rotation、アカウント間送金、アカウントごとの残高 |
| **CLI Wallet** | send、shield、transfer、balance --all、whoami、自動支払い |
| **Dual SDK** | TypeScript と Rust |
| **Spec-Compliant** | HMAC-SHA256 チャレンジ、RFC 9457 エラー、`/.well-known/payment` ディスカバリー |

---

*詳細は [zimppy.xyz](https://zimppy.xyz) をご覧ください*

---

## 関連ページ

- [ウォレット](/using-zcash/wallets) — シールドトランザクションをサポートする Zcash ウォレット
- [シールドプール](/using-zcash/shielded-pools) — Orchard のシールドトランザクションが決済データをどのように保護するか
- [決済プロセッサ](/using-zcash/payment-processors) — Zcash 決済を受け入れるその他の方法
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs と Zcash プログラマビリティの未来
- [コミュニティプロジェクト](/zcash-community/community-projects) — Zcash エコシステムのその他のプロジェクト
