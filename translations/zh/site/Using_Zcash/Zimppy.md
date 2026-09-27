<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** 是面向 AI 智能体、以隐私为先的支付基础设施，采用 Zcash 的机器支付协议（MPP）
- **一次存款**上链（约 75 秒），随后可进行**无限次即时请求**，每次请求均无需与区块链交互
- 支持**完全屏蔽的 Zcash (Orchard)** 支付——发送方、接收方、金额和备注均经过加密
- 通过 **TypeScript 和 Rust SDK** 实现与 AI 流水线及 API 服务器的轻松集成
- 非常适合 **LLM API、数据市场、MCP 工具服务器**以及任何 M2M 支付场景

---

> **Zimppy** 是面向 Zcash 的机器支付协议（MPP）支付方式，同时支持屏蔽和透明支付。一次存款上链，随后即可进行无限次即时持票人请求，每次请求无需与链交互。

---

## 目录

1. [什么是 Zimppy.xyz？](#what-is-zimppyxyz)
2. [为什么 AI 智能体需要屏蔽支付？](#why-shielded-payments-for-ai-agents)
3. [机器支付协议（MPP）](#machine-payment-protocol-mpp)
4. [Zimppy 的工作方式](#how-zimppy-works)
   - [会话（推荐）](#sessions-recommended)
   - [流式传输](#streaming)
   - [单次收费](#charge)
5. [使用场景与示例](#use-cases--examples)
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
11. [主要功能](#key-features)
12. [架构](#architecture)
13. [示例与演示](#examples--demos)

---

## 什么是 Zimppy.xyz？

**Zimppy.xyz** 是专为 AI 智能体和自动化机器对机器（M2M）工作流设计的、以隐私为先的支付基础设施。它以 **Zcash** 作为底层货币，实现了**机器支付协议（MPP）**，支持屏蔽（完全私密）和透明两种支付模式。

与每笔交易都会在链上公开可见的传统区块链支付系统不同，Zimppy 围绕基于会话的架构构建，在保留密码学隐私的同时消除了每次请求的延迟。这使其尤其适合需要以编程方式为 API、数据、算力或 AI 工具付款，同时不泄露行为元数据的 AI 智能体。

### 核心特性

- **一次存款**上链（等待 Zcash 确认约 75 秒）
- 开启会话后可进行**无限次即时请求**，每次请求零链上交互
- **屏蔽支付**通过 Zcash 的 Orchard 协议加密发送方、接收方、金额和备注
- **透明支付**为每个挑战使用独立 T 地址，在不提供完整隐私的情况下防止重放
- **符合规范**，采用 HMAC-SHA256 挑战、RFC 9457 错误和 `/.well-known/payment` 发现机制

---

## 为什么 AI 智能体需要屏蔽支付？

对于处理敏感工作流、法律研究、医疗查询、金融分析和竞争情报的 AI 智能体而言，**每一笔公开支付都会泄露元数据**。Zimppy 是唯一**默认私密**的 MPP 支付方式。

### 隐私对比表

| 属性 | 公共链（USDC、ETH） | Zimppy 屏蔽支付 | Zimppy 透明支付 |
|---|---|---|---|
| **发送方** | 可见 | 已加密 | 可见 |
| **接收方** | 可见 | 已加密 | 每次挑战独立（不可关联） |
| **金额** | 可见 | 已加密 | 可见 |
| **备注** | 可见 | 已加密 | 不适用 |
| **重放保护** | 无 | 备注绑定 | 每次挑战独立 T 地址 |
| **服务使用模式** | 可关联 | 私密 | 不可关联（新地址） |

### 会话解决延迟问题

> *“但 Zcash 的区块时间是 75 秒。”*

**会话解决了这个问题。** 链上等待仅在存款时发生**一次**。后续每次请求都是即时的。

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**支付一次，即时调用，返还余额。** 每次请求的延迟为零。

---

## 机器支付协议（MPP）

**机器支付协议（MPP）**是一种标准化协议，使自主软件智能体（AI 智能体、机器人、脚本）能够发现、协商并完成 API 访问的支付要求，整个过程无需人工干预。

### MPP 如何与 API 集成

MPP 遵循 HTTP **402 Payment Required** 流程：

1. **智能体请求**付费 API 端点中的资源。
2. **服务器响应** `402 Payment Required` + 已签名挑战（金额、接收方、备注）。
3. **智能体支付**，使用兼容的支付方式（例如 Zimppy 屏蔽 Zcash）。
4. **智能体重试**请求，并附带 `Authorization: Payment {txid}`。
5. **服务器验证**支付的密码学有效性（Orchard IVK 解密、金额 + 备注检查）。
6. **服务器响应** `200 OK` + `Payment-Receipt` 标头。

### 规范合规性

- **HMAC-SHA256** 挑战签名
- **RFC 9457** 结构化错误响应
- 用于自动发现支付方式的 **`/.well-known/payment`** 端点
- **Orchard IVK**（Incoming Viewing Key）用于服务器端支付验证，无需暴露消费密钥

---

## Zimppy 的工作方式

### 会话（推荐）

会话是主要交互模式。智能体只需一次将余额存入链上，即可获得持票人令牌，并以零延迟用于后续所有请求。

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**最适合：** 高频 API 调用、LLM 推理、重复数据查询。

---

### 流式传输

通过 **Server-Sent Events (SSE)** 提供按 token 计费的内容。服务器会按每个流式传输的词或 token 从会话余额中扣款。

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**最适合：** LLM 流式响应、实时数据源、按 token 计费的 AI 工具。

---

### 单次收费

每次请求进行一笔屏蔽支付。每次调用均执行完整的 HTTP 402 流程。适用于请求不频繁或价值较高的情况。

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**最适合：** 高价值的一次性请求、不频繁 API 调用、高级数据端点。

---

## 使用场景与示例

### 1. AI 智能体

法律 AI 智能体查询付费判例数据库。借助 Zimppy 屏蔽会话，律所身份和具体查询内容均不会在链上可见，从基础设施层面保护律师—客户保密特权。

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 医疗查询流水线 AI 智能体

医疗诊断智能体查询多个临床数据库。屏蔽支付确保患者查询模式无法在不同提供商之间被关联。

### 3. 金融分析智能体

算法交易智能体为实时市场数据 API 付款。透明支付为每次挑战使用新的 T 地址，防止不同数据供应商之间关联使用模式。

### 4. MCP 工具服务器、付费 AI 工具

MCP（Model Context Protocol）服务器提供付费 AI 工具。每次工具调用都会触发 Zimppy 收费，从而支持由 AI 能力构成的变现市场。

### 5. LLM 摘要器，按 Token 付费

LLM 摘要服务通过 SSE 流式传输按每个输出 token 向智能体收费，并自动扣除余额及退还未使用的预付余额。

---

## 安装

### 节点.js / TypeScript

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

## 设置 Zimppy 钱包

Zimppy CLI 提供完整的钱包界面。所有命令均可通过 `npx zimppy` 使用。

### 第 1 步：创建钱包

```bash
npx zimppy wallet create
```

生成密码学密钥并显示您的**助记词**。请安全保存——丢失后无法恢复。

### 第 2 步：查看地址和余额

```bash
npx zimppy wallet whoami
```

显示您的 **Unified Address (UA)**、**T 地址**、当前余额和活动网络。

```bash
npx zimppy wallet balance --all
```

显示所有 ZIP-32 账户的逐账户余额明细。

### 第 3 步：向钱包充值

通过任何兼容 Zcash 的钱包或交易所，向您的 Unified Address 发送 ZEC。屏蔽存款会直接进入您的 Orchard 账户。

### 第 4 步：发送和屏蔽资金

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

自动处理完整的 402 -> 支付 -> 重试流程。会话将以透明方式开启和管理。

---

## 集成 Zimppy - TypeScript SDK

### TypeScript 服务器 - 屏蔽

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
- `zcash({ wallet: 'server' })` 加载服务器的屏蔽钱包
- `mppx.charge()` 处理完整的 402 挑战/验证生命周期
- `result.withReceipt()` 将密码学支付收据附加至响应

---

### TypeScript 服务器 - 透明

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

每个挑战都会生成一个**新的 T 地址**，使支付请求无法在不同会话之间被关联。

---

### TypeScript 客户端

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

客户端会拦截 `402` 响应，自动开启会话并重试请求——调用代码无需任何支付专用逻辑。

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
- `MppCharge<Price>` 是一个 Axum 提取器，会在处理程序运行前验证付款
- `WithReceipt` 使用密码学支付收据包装响应
- `ChargeConfig` 定义定价逻辑——可根据请求参数动态确定

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

`send_with_payment` 可为任何 HTTP 客户端扩展自动 402 处理、会话管理和 Zcash 支付完成能力。

---

## CLI 参考

| 命令 | 描述 |
|---|---|
| `npx zimppy wallet create` | 生成密钥并显示助记词 |
| `npx zimppy wallet whoami` | 显示地址（UA + T 地址）、余额和网络 |
| `npx zimppy wallet balance --all` | 逐账户余额明细 |
| `npx zimppy wallet send <addr> <zat>` | 发送屏蔽或透明 ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | 跨账户内部转账 |
| `npx zimppy wallet shield` | 将透明资金转入 Orchard（屏蔽） |
| `npx zimppy wallet use <name>` | 切换活动钱包身份 |
| `npx zimppy request <url>` | 自动执行 402 -> 支付 -> 重试请求 |

---

## 主要功能

### 原生智能体钱包

Zimppy 钱包专为 AI 智能体的编程式使用而设计，而非供人类管理的浏览器扩展。密钥通过 CLI 或 SDK 管理，账户可通过 **ZIP-32 账户派生**轮换，钱包支持全自动支付流程，无需人工逐笔批准交易。

### 多智能体支持

多个智能体可通过 **ZIP-32 账户轮换**使用同一个钱包——每个智能体获得自己的账户，拥有独立余额跟踪、跨账户转账能力和逐账户余额报告。这使得在单一钱包基础设施上管理大批智能体成为可能。

### 完全屏蔽的 Zcash 交易（Orchard）

屏蔽支付采用 Zcash 的 **Orchard 协议**——最新且最安全的屏蔽资金池。服务器使用 **Incoming Viewing Key (IVK)** 验证付款，该密钥可解密收到的票据而无需暴露消费密钥。通过**备注绑定**防止重放攻击——每个挑战嵌入唯一的 `zimppy:{challenge_id}` 备注，并进行密码学验证。

### 会话，零单次请求延迟

会话架构将链上确认等待与单次请求延迟解耦。单次存款后（约 75 秒），所有后续持票人令牌请求都会即时处理，直至会话关闭前均无需区块链交互。

### 流式传输，按 Token 付费

原生支持 **SSE (Server-Sent Events)**，可实现按 token 计费的内容。非常适合输出长度可变且计费应反映实际消耗的 LLM 推理 API。

### 规范合规性

- **HMAC-SHA256** 签名挑战防止伪造
- 用于可互操作错误处理的 **RFC 9457** 结构化错误格式
- 通过 **`/.well-known/payment`** 实现任意符合 MPP 的智能体自动发现支付方式

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

**`zimppy-core`** - 密码学核心。使用服务器的 IVK 处理 Orchard 票据解密、备注解析、重放保护逻辑和挑战验证。使用 Rust 编写，以确保性能和正确性。

**`zimppy-wallet`** - 基于 `zingolib` 的原生 Zcash 钱包。管理密钥、账户、屏蔽/透明余额和交易提交。

**`zimppy-rs`** - Rust SDK。提供 `ChargeMethod`、`SessionMethod` 和 `PaymentProvider` trait，以及用于符合人体工程学的服务器集成的 Axum 提取器（`MppCharge`、`WithReceipt`）。

**`zimppy-napi`** - 将 Rust 核心暴露给 节点.js 的 NAPI-RS 绑定，使 TypeScript SDK 能够使用相同的密码学引擎，而无需在 JavaScript 中重新实现 Zcash 原语。

**`zimppy-ts`** - TypeScript SDK。以符合习惯的 async/await API 包装 NAPI 绑定，用于单次收费、会话和 SSE 流式传输流程。

**`zimppy-cli`** - 命令行钱包和请求工具。支持自动支付（402 -> 支付 -> 重试）、会话管理和所有钱包操作。

---

## 示例与演示

| 示例 | 描述 |
|---|---|
| `examples/fortune-teller/` | 单次收费、会话和流式传输演示 - Rust 服务器 + 客户端 |
| `examples/llm-summarizer/` | 按 token 付费的 LLM 流式传输演示 |
| `examples/mcp-server/` | 带付费 AI 工具的 MCP 工具服务器 |
| `examples/ts-server/` | TypeScript MPP 服务器参考实现 |

---

## 包含内容 - 功能摘要

| 功能 | 描述 |
|---|---|
| **会话** | 一次存款，即时持票人请求，关闭时退款 |
| **流式传输** | 通过 SSE 提供按 token 计费的内容 |
| **单次收费** | 每个 HTTP 请求进行屏蔽或透明支付（402 流程） |
| **透明支付** | T 地址配合每次挑战重放保护 + shield 命令 |
| **多账户** | ZIP-32 账户轮换、跨账户转账、逐账户余额 |
| **CLI 钱包** | 发送、屏蔽、转账、balance --all、whoami、自动支付 |
| **双 SDK** | TypeScript 和 Rust |
| **符合规范** | HMAC-SHA256 挑战、RFC 9457 错误、`/.well-known/payment` 发现机制 |

---

*欲了解更多信息，请访问 [zimppy.xyz](https://zimppy.xyz)*

---

## 相关页面

- [钱包](/using-zcash/wallets) — 支持屏蔽交易的 Zcash 钱包
- [屏蔽资金池](/using-zcash/shielded-pools) — Orchard 屏蔽交易如何保护支付数据
- [支付处理商](/using-zcash/payment-processors) — 接受 Zcash 支付的其他方式
- [Zcash 屏蔽资产](/zcash-tech/zcash-shielded-assets) — ZSA 与 Zcash 可编程性的未来
- [社区项目](/zcash-community/community-projects) — 更多 Zcash 生态系统项目
