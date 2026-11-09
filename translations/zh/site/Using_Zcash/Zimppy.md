<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zimppy.xyz

## 摘要

- **Zimppy** 是面向 AI 代理的、以隐私 [privacy] 为先的支付 [payment] 基础设施，使用 Zcash 的 Machine Payment Protocol (MPP)
- 在链上 [on-chain] **存入一次**（约 75 秒），随后可发起**无限次即时请求**，无需逐请求与 blockchain 交互
- 支持**完全屏蔽的 Zcash（Orchard）**支付——发送方、接收方、金额和备忘录 [memo] 均经过加密 [encryption]
- 可与 **TypeScript 和 Rust SDK** 配合使用，轻松集成到 AI 流水线和 API 服务器中
- 非常适合 **LLM API、数据市场、MCP 工具服务器**以及任何 M2M 支付用例 [use case]

---

> **Zimppy** 是适用于 Zcash 的 Machine Payment Protocol (MPP) 支付方式，同时支持屏蔽和透明 [transparent] 支付。在链上存入一次，随后可发起无限次即时持有者请求，无需逐请求进行链交互。

---

## 目录

1. [什么是 Zimppy.xyz？](#what-is-zimppyxyz)
2. [为何 AI 代理需要屏蔽支付？](#why-shielded-payments-for-ai-agents)
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
11. [主要功能](#key-features)
12. [架构](#architecture)
13. [示例与演示](#examples--demos)

---

## 什么是 Zimppy.xyz？

**Zimppy.xyz** 是专为 AI 代理和自动化机器对机器（M2M）工作流设计的、以隐私为先的支付基础设施。它使用 **Zcash** 作为底层货币，实现了 **Machine Payment Protocol (MPP)**，支持屏蔽（完全私密）和透明支付模式。

不同于每笔交易 [transaction] 都在链上公开可见的传统 blockchain 支付系统，Zimppy 围绕基于会话的架构构建，在保留密码学隐私的同时消除了逐请求延迟。这使它特别适合需要以编程方式支付 API、数据、计算资源或 AI 工具的 AI 代理，且不会泄露行为元数据。

### 核心特性

- 在链上**存入一次**（Zcash 确认约需 75 秒）
- 会话开启后可发起**无限次即时请求**，逐请求链交互为零
- **屏蔽支付**使用 Zcash 的 Orchard 协议加密发送方、接收方、金额和备忘录
- **透明支付**使用逐挑战 T 地址，以防止重放但不提供完整隐私
- **符合规范**，具备 HMAC-SHA256 挑战、RFC 9457 错误和 `/.well-known/payment` 发现机制

---

## 为何 AI 代理需要屏蔽支付？

对于处理敏感工作流、法律研究、医疗查询和金融分析的 AI 代理而言，**每一笔公开支付都是元数据泄露**。Zimppy 是唯一**默认私密**的 MPP 支付方式。

### 隐私对比表

| 属性 | 公开链（USDC、ETH） | Zimppy 屏蔽 | Zimppy 透明 |
|---|---|---|---|
| **发送方** | 可见 | 已加密 | 可见 |
| **接收方** | 可见 | 已加密 | 逐挑战（不可关联 [unlinkable]） |
| **金额** | 可见 | 已加密 | 可见 |
| **备忘录** | 可见 | 已加密 | 不适用 |
| **重放保护** | 无 | 备忘录绑定 | 逐挑战 T 地址 |
| **服务使用模式** | 可关联 | 私密 | 不可关联（新地址） |

### 会话解决延迟问题

> *“但 Zcash 的区块 [block] 时间为 75 秒。”*

**会话解决了这一问题。** 链上等待仅在存入时发生**一次**。之后的每次请求都是即时的。

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**支付一次，即时调用，并取回找零。** 逐请求延迟为零。

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** 是一种标准化协议，使自主软件代理（AI 代理、机器人、脚本）能够发现、协商并完成 API 访问的支付要求，且无需人工干预。

### MPP 如何与 API 集成

MPP 遵循 HTTP **402 Payment Required** 流程：

1. **代理请求**付费 API 端点的资源。
2. **服务器响应** `402 Payment Required` 加上一个已签名的挑战（金额、接收方、备忘录）。
3. **代理支付**，使用兼容的支付方式（例如 Zimppy 屏蔽 Zcash）。
4. **代理重试**请求，并附带 `Authorization: Payment {txid}`。
5. **服务器验证**支付的密码学有效性（Orchard IVK 解密、金额 + 备忘录检查）。
6. **服务器响应** `200 OK` 加上 `Payment-Receipt` 标头。

### 规范兼容性

- **HMAC-SHA256** 挑战签名
- **RFC 9457** 结构化错误响应
- 用于自动支付方式发现的 **`/.well-known/payment`** 端点
- **Orchard IVK**（Incoming Viewing Key），用于服务器端支付验证，无需暴露花费密钥 [spending key]

---

## Zimppy 的工作原理

### 会话（推荐）

会话是主要交互模式。代理在链上一次性存入余额，获得持有者 token [token]，并以零延迟将其用于所有后续请求。

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**最适合：**高频 API 调用、LLM 推理、重复数据查询。

---

### 流式传输

通过 **Server-Sent Events (SSE)** 提供按 token 计费的内容。服务器按流式传输的每个词或 token 从会话余额中扣除费用。

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**最适合：**LLM 流式响应、实时数据源、按 token 计费的 AI 工具。

---

### 收费

每次请求进行一次屏蔽支付。每次调用均执行完整的 HTTP 402 流程。适用于请求不频繁或价值较高的情况。

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**最适合：**高价值的一次性请求、不频繁的 API 调用、高级数据端点。

---

## 用例与示例

### 1. AI 代理

法律 AI 代理查询付费判例法数据库。使用 Zimppy 屏蔽会话后，律所身份和具体查询内容均不会在链上可见，从基础设施层面保护律师—客户保密特权。

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 用于医疗查询流水线的 AI 代理

医疗诊断代理查询多个临床数据库。屏蔽支付确保患者查询模式无法在不同提供商之间关联。

### 3. 金融分析代理

算法交易代理为实时市场数据 API 付费。透明支付针对每个挑战使用新的 T 地址，防止不同数据供应商之间的使用模式关联。

### 4. MCP 工具服务器、付费 AI 工具

MCP（Model Context Protocol）服务器提供付费 AI 工具。每次工具调用都会触发一次 Zimppy 收费，从而实现货币化 AI 能力市场。

### 5. LLM 摘要器、按 Token 计费

LLM 摘要服务通过 SSE 流式传输按每个输出 token 向代理收费，自动扣除余额并退还未使用的预付余额。

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

## 设置 Zimppy 钱包

Zimppy CLI 提供完整的钱包界面。所有命令均可通过 `npx zimppy` 使用。

### 第 1 步：创建钱包

```bash
npx zimppy wallet create
```

生成密码学密钥并显示你的**助记词 [seed phrase]**。请妥善保存——遗失后无法恢复。

### 第 2 步：查看你的地址和余额

```bash
npx zimppy wallet whoami
```

显示你的**统一地址（UA）**、**T 地址**、当前余额和活跃网络。

```bash
npx zimppy wallet balance --all
```

显示所有 ZIP-32 账户的逐账户余额明细。

### 第 3 步：为钱包注资

从任何兼容 Zcash 的钱包或交易所 [exchange] 向你的统一地址发送 ZEC。屏蔽存款将直接进入你的 Orchard 账户。

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
- `result.withReceipt()` 将密码学支付收据附加到响应中

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

每个挑战都会生成一个**新的 T 地址**，使不同会话间的支付请求不可关联。

---

### TypeScript 客户端

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

客户端拦截 `402` 响应，自动开启会话并重试请求——调用代码无需任何支付专用逻辑。

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
- `MppCharge<Price>` 是一个 Axum 提取器，在处理程序运行前验证支付
- `WithReceipt` 使用密码学支付收据包装响应
- `ChargeConfig` 定义定价逻辑——可基于请求参数动态调整

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

`send_with_payment` 为任何 HTTP 客户端扩展自动 402 处理、会话管理和 Zcash 支付履约能力。

---

## CLI 参考

| 命令 | 描述 |
|---|---|
| `npx zimppy wallet create` | 生成密钥并显示助记词 |
| `npx zimppy wallet whoami` | 显示地址（UA + T-地址）、余额、网络 |
| `npx zimppy wallet balance --all` | 逐账户余额明细 |
| `npx zimppy wallet send <addr> <zat>` | 发送屏蔽或透明 ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | 跨账户内部转账 |
| `npx zimppy wallet shield` | 将透明资金转入 Orchard（屏蔽） |
| `npx zimppy wallet use <name>` | 切换活跃钱包身份 |
| `npx zimppy request <url>` | 自动 402 -> 支付 -> 重试请求 |

---

## 主要功能

### 原生面向代理的钱包

Zimppy 钱包专为 AI 代理的编程使用而设计，而非人工管理的浏览器扩展。密钥通过 CLI 或 SDK 管理，账户可通过 **ZIP-32 账户派生**轮换，钱包支持完全自动化的支付流程，无需每笔交易进行人工批准。

### 多代理支持

多个代理可以使用同一个钱包，通过 **ZIP-32 账户轮换**运行——每个代理均拥有自己的账户、独立余额跟踪、跨账户转账能力和逐账户余额报告。这支持从单一钱包基础设施管理众多代理。

### 完全屏蔽的 Zcash 交易（Orchard）

屏蔽支付使用 Zcash 的 **Orchard 协议**，即由 NU5 引入的屏蔽 pool [pool]。服务器使用 **Incoming Viewing Key（IVK）**验证支付，它可解密收到的 note [note]，而无需暴露花费密钥。通过**备忘录绑定**防止重放攻击——每个挑战嵌入一个唯一的 `zimppy:{challenge_id}` 备忘录，并对其进行密码学验证。

### 会话，逐请求零延迟

会话架构将链上确认等待与逐请求延迟解耦。单次存入（约 75 秒）后，所有后续持有者 token 请求均可即时处理，在会话关闭前无需 blockchain 交互。

### 流式传输，按 Token 计费

原生 **SSE（Server-Sent Events）**支持可实现按 token 计费的内容。非常适合输出长度可变、计费应反映实际消耗的 LLM 推理 API。

### 规范兼容性

- **HMAC-SHA256** 签名挑战可防止伪造
- **RFC 9457** 结构化错误格式，可实现互操作的错误处理
- **`/.well-known/payment`**，用于任何兼容 MPP 的代理自动发现支付方式

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

**`zimppy-core`** - 密码学核心。使用服务器的 IVK 处理 Orchard note 解密、备忘录解析、重放保护逻辑和挑战验证。使用 Rust 编写，以确保性能和正确性。

**`zimppy-wallet`** - 由 `zingolib` 驱动的原生 Zcash 钱包。管理密钥、账户、屏蔽/透明余额和交易提交。

**`zimppy-rs`** - Rust SDK。提供 `ChargeMethod`、`SessionMethod` 和 `PaymentProvider` trait，以及用于简洁服务器集成的 Axum 提取器（`MppCharge`、`WithReceipt`）。

**`zimppy-napi`** - NAPI-RS 绑定，将 Rust 核心暴露给 Node.js，使 TypeScript SDK 能够使用同一密码学引擎，而无需在 JavaScript 中重新实现 Zcash 原语。

**`zimppy-ts`** - TypeScript SDK。使用符合惯例的 async/await API 包装 NAPI 绑定，用于收费、会话和 SSE 流式传输流程。

**`zimppy-cli`** - 命令行钱包和请求工具。支持自动支付（402 -> 支付 -> 重试）、会话管理及所有钱包操作。

---

## 示例与演示

| 示例 | 描述 |
|---|---|
| `examples/fortune-teller/` | 收费、会话和流式传输演示 - Rust 服务器 + 客户端 |
| `examples/llm-summarizer/` | 按 token 计费的 LLM 流式传输演示 |
| `examples/mcp-server/` | 带付费 AI 工具的 MCP 工具服务器 |
| `examples/ts-server/` | TypeScript MPP 服务器参考实现 |

---

## 包含内容 - 功能摘要

| 功能 | 描述 |
|---|---|
| **会话** | 存入一次、即时持有者请求、关闭时退款 |
| **流式传输** | 通过 SSE 提供按 token 计费的内容 |
| **收费** | 每个 HTTP 请求进行屏蔽或透明支付（402 流程） |
| **透明支付** | 使用逐挑战重放保护的 T 地址 + 屏蔽命令 |
| **多账户** | ZIP-32 账户轮换、跨账户转账、逐账户余额 |
| **CLI 钱包** | 发送、屏蔽、转账、余额 --all、whoami、自动支付 |
| **双 SDK** | TypeScript 和 Rust |
| **符合规范** | HMAC-SHA256 挑战、RFC 9457 错误、`/.well-known/payment` 发现机制 |

---

*欲了解更多信息，请访问 [zimppy.xyz](https://zimppy.xyz)*

---

## 相关页面

- [钱包](/using-zcash/wallets) — 支持屏蔽交易的 Zcash 钱包
- [屏蔽池](/using-zcash/shielded-pools) — Orchard 屏蔽交易如何保护支付数据
- [支付处理商](/using-zcash/payment-processors) — 接受 Zcash 支付的其他方式
- [Zcash 屏蔽资产](/zcash-tech/zcash-shielded-assets) — ZSA 与 Zcash 可编程性的未来
- [社区项目](/zcash-community/community-projects) — 更多 Zcash 生态系统项目
