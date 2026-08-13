<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** 是一个面向 AI 代理、以隐私为先的支付基础设施，使用 Zcash 的 Machine Payment Protocol (MPP)
- 在链上**充值一次**（约 75 秒），随后即可发起**无限次即时请求**，每次请求都无需与区块链交互
- 支持**完全屏蔽的 Zcash (Orchard)** 支付——发送方、接收方、金额和 memo 全部加密
- 提供**TypeScript 和 Rust SDK**，可轻松集成到 AI 流水线和 API 服务器中
- 非常适合**LLM API、数据市场、MCP 工具服务器**以及任何 M2M 支付场景

---

> **Zimppy** 是 Zcash 的 Machine Payment Protocol (MPP) 支付方式，同时支持屏蔽支付和透明支付。只需在链上充值一次，之后即可发起无限次即时 bearer 请求，无需为每次请求进行链上交互。

---

## 目录

1. [什么是 Zimppy.xyz？](#what-is-zimppyxyz)
2. [为什么 AI 代理需要屏蔽支付？](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy 的工作原理](#how-zimppy-works)
   - [会话（推荐）](#sessions-recommended)
   - [流式传输](#streaming)
   - [收费](#charge)
5. [用例与示例](#use-cases--examples)
6. [安装](#installation)
7. [设置 Zimppy 钱包](#setting-up-the-zimppy-wallet)
8. [集成 Zimppy](#integrating-zimppy--typescript-sdk)
   - [服务器（屏蔽）](#typescript-server--shielded)
   - [服务器（透明）](#typescript-server--transparent)
   - [客户端](#typescript-client)
9. [集成 Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [服务器（Axum）](#rust-server-axum)
   - [客户端](#rust-client)
10. [CLI 参考](#cli-reference)
11. [核心特性](#key-features)
12. [架构](#architecture)
13. [示例与演示](#examples--demos)

---

## 什么是 Zimppy.xyz？

**Zimppy.xyz** 是一个以隐私为先的支付基础设施，专为 AI 代理和自动化机器对机器（M2M）工作流设计。它使用 **Zcash** 作为底层货币，实现了 **Machine Payment Protocol (MPP)**，支持屏蔽（完全私密）和透明两种支付模式。

不同于传统区块链支付系统中每笔交易都会在链上公开可见，Zimppy 围绕基于会话的架构进行设计，在保留密码学隐私的同时消除了逐次请求的延迟。这使它特别适合需要以编程方式为 API、数据、算力或 AI 工具付费的 AI 代理，同时不会泄露行为元数据。

### 核心属性

- 在链上**充值一次**（Zcash 确认约需 75 秒）
- 会话开启后即可进行**无限次即时请求**，每次请求零链上交互
- **屏蔽支付**使用 Zcash 的 Orchard 协议加密发送方、接收方、金额和 memo
- **透明支付**使用按 challenge 生成的 T-address，以防重放，但不提供完全隐私
- **符合规范**，支持 HMAC-SHA256 challenges、RFC 9457 错误以及 `/.well-known/payment` 发现机制

---

## 为什么 AI 代理需要屏蔽支付？

对于处理敏感工作流、法律研究、医疗查询、金融分析、竞争情报的 AI 代理而言，**每一笔公开支付都会泄露元数据**。Zimppy 是唯一一种**默认私密**的 MPP 支付方式。

### 隐私对比表

| 属性 | 公有链（USDC、ETH） | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **发送方** | 可见 | 已加密 | 可见 |
| **接收方** | 可见 | 已加密 | 按 challenge 区分（不可关联） |
| **金额** | 可见 | 已加密 | 可见 |
| **Memo** | 可见 | 已加密 | 不适用 |
| **重放保护** | 无 | Memo 绑定 | 按 challenge 生成的 T-address |
| **服务使用模式** | 可关联 | 私密 | 不可关联（新地址） |

### 延迟问题：由会话解决

> *“但 Zcash 的出块时间有 75 秒。”*

**会话解决了这个问题。** 链上等待只会在充值时发生**一次**。之后每一次请求都是即时的。

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**支付一次，即时调用，找零退回。** 每次请求的延迟为零。

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** 是一种标准化协议，使自治软件代理（AI 代理、机器人、脚本）能够在无人干预的情况下，自动发现、协商并完成 API 访问所需的支付。

### MPP 如何与 API 集成

MPP 遵循 HTTP **402 Payment Required** 流程：

1. **代理请求**付费 API 端点上的资源。
2. **服务器响应** `402 Payment Required` + 一个已签名的 challenge（金额、收款人、memo）。
3. **代理支付**，使用兼容的支付方式（例如 Zimppy 的屏蔽 Zcash 支付）。
4. **代理重试**请求，并附带 `Authorization: Payment {txid}`。
5. **服务器验证**支付的密码学有效性（Orchard IVK 解密、金额 + memo 检查）。
6. **服务器响应** `200 OK` + 一个 `Payment-Receipt` 头。
### 规范兼容性

- **HMAC-SHA256** 挑战签名
- **RFC 9457** 结构化错误响应
- 用于自动发现支付方式的 **`/.well-known/payment`** 端点
- 用于服务端支付验证且不暴露支出密钥的 **Orchard IVK**（Incoming Viewing Key）

---

## Zimppy 的工作方式

### 会话（推荐）

会话是主要的交互模式。Agent 在链上一次性存入余额，获得一个 bearer token，并以零延迟将其用于之后的所有请求。

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**最适合：** 高频 API 调用、LLM 推理、重复性数据查询。

---

### 流式传输

按 token 计费的内容通过 **Server-Sent Events (SSE)** 传输。服务器会按流式传输的每个单词或 token 从会话余额中扣费。

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**最适合：** LLM 流式响应、实时数据流、按 token 计费的 AI 工具。

---

### Charge

每次请求对应一笔独立的屏蔽支付。每次调用都会执行完整的 HTTP 402 流程。适用于低频或高价值请求。

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**最适合：** 高价值一次性请求、低频 API 调用、高级数据端点。

---

## 使用场景与示例

### 1. AI Agent

一个法律 AI Agent 查询付费判例数据库。使用 Zimppy 屏蔽会话后，律师事务所的身份以及具体查询内容都不会在链上可见，从而在基础设施层面保护律师—客户保密特权。

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 用于医疗查询流程的 AI Agent

一个医疗诊断 Agent 查询多个临床数据库。屏蔽支付可确保患者查询模式无法在不同提供方之间被关联。

### 3. 金融分析 Agent

一个算法交易 Agent 为实时市场数据 API 付费。透明支付为每次挑战使用新的 T-address，从而防止在不同数据供应商之间关联使用模式。

### 4. MCP 工具服务器，付费 AI 工具

一个 MCP（Model Context Protocol）服务器提供付费 AI 工具。每次工具调用都会触发一次 Zimppy charge，从而支持一个 AI 能力变现市场。

### 5. LLM 摘要器，按 Token 付费

一个 LLM 摘要服务通过 SSE 流式传输按输出 token 向 Agent 收费，并自动扣除余额、退还未使用的预付余额。

---

## 安装

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

## 设置 Zimppy Wallet

Zimppy CLI 提供完整的钱包界面。所有命令都可通过 `npx zimppy` 使用。

### 第 1 步：创建钱包

```bash
npx zimppy wallet create
```

生成加密密钥并显示你的**助记词**。请妥善保管——一旦丢失将无法恢复。

### 第 2 步：检查你的地址和余额

```bash
npx zimppy wallet whoami
```

显示你的 **Unified Address (UA)**、**T-address**、当前余额和当前活跃网络。

```bash
npx zimppy wallet balance --all
```

显示所有 ZIP-32 账户的逐账户余额明细。

### 第 3 步：为你的钱包注资

从任何兼容 Zcash 的钱包或交易所向你的 Unified Address 发送 ZEC。屏蔽存款会直接进入你的 Orchard 账户。

### 第 4 步：发送并屏蔽资金

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

### 第 5 步：发起自动支付请求

```bash
npx zimppy request <url>
```

自动处理完整的 402 -> pay -> retry 流程。会话会被透明地创建和管理。

---

## 集成 Zimppy - TypeScript SDK

### TypeScript 服务器 - 屏蔽模式

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

**要点：**
- `zcash({ wallet: 'server' })` 会加载服务器的屏蔽钱包
- `mppx.charge()` 处理完整的 402 challenge/verify 生命周期
- `result.withReceipt()` 会将加密支付收据附加到响应中

---
### TypeScript 服务器 - 透明地址

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

每个挑战都会生成一个**全新的 T-address**，使支付请求在不同会话之间无法关联。

---

### TypeScript 客户端

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

客户端会拦截 `402` 响应，自动开启会话，并重试请求——调用方代码无需任何与支付相关的专用逻辑。

---

## 集成 Zimppy - Rust SDK

### Rust 服务器（Axum）

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

**要点：**
- `MppCharge<Price>` 是一个 Axum 提取器，会在处理器运行前验证支付
- `WithReceipt` 会用加密支付收据封装响应
- `ChargeConfig` 定义定价逻辑——也可以根据请求参数动态定价

---

### Rust 客户端

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` 为任意 HTTP 客户端扩展了自动处理 402、会话管理和 Zcash 支付履约能力。

---

## CLI 参考

| 命令 | 说明 |
|---|---|
| `npx zimppy wallet create` | 生成密钥并显示助记词 |
| `npx zimppy wallet whoami` | 显示地址（UA + T-addr）、余额、网络 |
| `npx zimppy wallet balance --all` | 按账户细分显示余额 |
| `npx zimppy wallet send <addr> <zat>` | 发送屏蔽或透明 ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | 跨账户内部转账 |
| `npx zimppy wallet shield` | 将透明资金转入 Orchard（屏蔽） |
| `npx zimppy wallet use <name>` | 切换当前使用的钱包身份 |
| `npx zimppy request <url>` | 自动执行 402 -> 支付 -> 重试请求 |

---

## 核心特性

### 面向 Agent 的原生钱包

Zimppy 钱包专为 AI agent 的程序化使用而设计——而不是供人类管理的浏览器扩展。密钥通过 CLI 或 SDK 管理，账户可通过 **ZIP-32 account derivation** 轮换，钱包支持完全自动化的支付流程，无需每笔交易都经过人工批准。

### 多 Agent 支持

多个 agent 可以通过 **ZIP-32 account rotation** 使用同一个钱包——每个 agent 都有自己的账户，具备独立的余额跟踪、跨账户转账能力以及按账户划分的余额报告。这使得通过单一钱包基础设施管理大量 agent 成为可能。

### 完全屏蔽的 Zcash 交易（Orchard）

屏蔽支付使用 Zcash 的 **Orchard protocol**——最新且最安全的屏蔽池。服务器使用 **Incoming Viewing Key (IVK)** 验证支付，该密钥可解密收到的 note 而无需暴露支出密钥。重放攻击通过 **memo binding** 防止——每个挑战都会嵌入唯一的 `zimppy:{challenge_id}` memo，并进行加密验证。

### 会话机制，单请求零延迟

会话架构将链上确认等待与单请求延迟解耦。一次充值后（约 75 秒），直到会话关闭前，后续所有 bearer-token 请求都可即时响应，无需再与区块链交互。

### 流式处理，按 Token 付费

原生支持 **SSE (Server-Sent Events)**，可实现按 token 计量付费的内容流。非常适用于输出长度可变、且计费应反映实际消耗的 LLM 推理 API。

### 规范兼容

- 使用 **HMAC-SHA256** 签名的挑战可防止伪造
- 使用 **RFC 9457** 结构化错误格式，实现可互操作的错误处理
- 提供 **`/.well-known/payment`**，供任何兼容 MPP 的 agent 自动发现支付方式

---

## 架构

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

### 组件职责

**`zimppy-core`** - 加密核心。负责使用服务器的 IVK 进行 Orchard note 解密、memo 解析、重放保护逻辑和挑战验证。使用 Rust 编写，以确保性能和正确性。

**`zimppy-wallet`** - 基于 `zingolib` 的原生 Zcash 钱包。负责管理密钥、账户、屏蔽/透明余额以及交易提交。

**`zimppy-rs`** - Rust SDK。提供 `ChargeMethod`、`SessionMethod` 和 `PaymentProvider` trait，以及用于便捷服务器集成的 Axum 提取器（`MppCharge`、`WithReceipt`）。

**`zimppy-napi`** - NAPI-RS 绑定，将 Rust 核心暴露给 Node.js，使 TypeScript SDK 能够使用同一套加密引擎，而无需在 JavaScript 中重新实现 Zcash 原语。

**`zimppy-ts`** - TypeScript SDK。使用符合习惯的 async/await API 对 NAPI 绑定进行封装，用于 charge、session 和 SSE 流式处理流程。

**`zimppy-cli`** - 命令行钱包和请求工具。支持自动支付（402 -> 支付 -> 重试）、会话管理以及所有钱包操作。

---
## 示例与演示

| 示例 | 描述 |
|---|---|
| `examples/fortune-teller/` | 计费、会话和流式传输演示 - Rust 服务器 + 客户端 |
| `examples/llm-summarizer/` | 按 token 付费的 LLM 流式演示 |
| `examples/mcp-server/` | 带付费 AI 工具的 MCP 工具服务器 |
| `examples/ts-server/` | TypeScript MPP 服务器参考实现 |

---

## 包含内容 - 功能概览

| 功能 | 描述 |
|---|---|
| **Sessions** | 一次充值，即时 bearer 请求，关闭时退款 |
| **Streaming** | 通过 SSE 按 token 计费的流式内容 |
| **Charge** | 每个 HTTP 请求进行屏蔽或透明支付（402 流程） |
| **Transparent Payments** | T 地址，带每次质询的重放防护 + shield 命令 |
| **Multi-Account** | ZIP-32 账户轮换、跨账户转账、每账户余额 |
| **CLI Wallet** | 发送、shield、transfer、balance --all、whoami、auto-pay |
| **Dual SDK** | TypeScript 和 Rust |
| **Spec-Compliant** | HMAC-SHA256 质询、RFC 9457 错误、`/.well-known/payment` 发现 |

---

*更多信息，请访问 [zimppy.xyz](https://zimppy.xyz)*

---

## 相关页面

- [钱包](/using-zcash/wallets) — 支持屏蔽交易的 Zcash 钱包
- [屏蔽资金池](/using-zcash/shielded-pools) — Orchard 屏蔽交易如何保护支付数据
- [支付处理器](/using-zcash/payment-processors) — 接受 Zcash 支付的其他方式
- [Zcash 屏蔽资产](/zcash-tech/zcash-shielded-assets) — ZSA 以及 Zcash 可编程性的未来
- [社区项目](/zcash-community/community-projects) — 更多 Zcash 生态项目
