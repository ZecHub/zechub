# [Zimppy.xyz Wiki Page](https://zimppy.xyz/)


> **Zimppy** is the Machine Payment Protocol (MPP) payment method for Zcash supporting both shielded and transparent payments. Deposit once on-chain, then make unlimited instant bearer requests with no per-request chain interaction.

---

## Table of Contents

1. [What is Zimppy.xyz?](#what-is-zimppyxyz)
2. [Why Shielded Payments for AI Agents?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [How Zimppy Works](#how-zimppy-works)
   - [Sessions (Recommended)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Charge](#charge)
5. [Use Cases & Examples](#use-cases--examples)
6. [Installation](#installation)
7. [Setting Up the Zimppy Wallet](#setting-up-the-zimppy-wallet)
8. [Integrating Zimppy](#integrating-zimppy--typescript-sdk)
   - [Server (Shielded)](#typescript-server--shielded)
   - [Server (Transparent)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Integrating Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [CLI Reference](#cli-reference)
11. [Key Features](#key-features)
12. [Architecture](#architecture)
13. [Examples & Demos](#examples--demos)

---

## What is Zimppy.xyz?

**Zimppy.xyz** is a privacy-first payment infrastructure designed specifically for AI agents and automated machine-to-machine (M2M) workflows. It implements the **Machine Payment Protocol (MPP)** using **Zcash** as its underlying currency, enabling both shielded (fully private) and transparent payment modes.

Unlike traditional blockchain payment systems, where every transaction is publicly visible on-chain, Zimppy is engineered around a session-based architecture that eliminates per-request latency while preserving cryptographic privacy. This makes it uniquely suited for AI agents that need to pay for APIs, data, compute, or AI tools programmatically, without leaking behavioral metadata.

### Core Properties

- **Deposit once** on-chain (~75 seconds for Zcash confirmation)
- **Unlimited instant requests** after session opening, zero per-request chain interaction
- **Shielded payments** encrypt sender, receiver, amount, and memo using Zcash's Orchard protocol
- **Transparent payments** use per-challenge T-addresses for replay prevention without full privacy
- **Spec-compliant**,  HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` discovery

---

## Why Shielded Payments for AI Agents?

For AI agents handling sensitive workflows, legal research, medical queries, financial analysis, competitive intelligence for **every public payment is a metadata leak**. Zimppy is the only MPP payment method that is **private by default**.

### Privacy Comparison Table

| Property | Public Chains (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Sender** | Visible | Encrypted | Visible |
| **Receiver** | Visible | Encrypted | Per-challenge (unlinkable) |
| **Amount** | Visible | Encrypted | Visible |
| **Memo** | Visible | Encrypted | N/A |
| **Replay Protection** | None | Memo binding | Per-challenge T-address |
| **Service Usage Pattern** | Linkable | Private | Unlinkable (fresh addr) |

### The Latency Problem, Solved by Sessions

> *"But Zcash has 75-second block times."*

**Sessions solve this.** The on-chain wait happens exactly **once** at deposit. Every subsequent request is instant.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Pay once, call instantly, get back the change.** Per-request latency is zero.

---

## Machine Payment Protocol (MPP)

The **Machine Payment Protocol (MPP)** is a standardized protocol that enables autonomous software agents (AI agents, bots, scripts) to discover, negotiate, and fulfill payment requirements for API access all without human intervention.

### How MPP Integrates with APIs

MPP follows the HTTP **402 Payment Required** flow:

1. **Agent requests** a resource from a paid API endpoint.
2. **Server responds** with `402 Payment Required` + a signed challenge (amount, recipient, memo).
3. **Agent pays** using a compatible payment method (e.g., Zimppy shielded Zcash).
4. **Agent retries** the request with `Authorization: Payment {txid}`.
5. **Server verifies** the payment cryptographically (Orchard IVK decryption, amount + memo check).
6. **Server responds** with `200 OK` + a `Payment-Receipt` header.

### Spec Compliance

- **HMAC-SHA256** challenge signing
- **RFC 9457** structured error responses
- **`/.well-known/payment`** endpoint for automatic payment method discovery
- **Orchard IVK** (Incoming Viewing Key) for server-side payment verification without exposing spending keys

---

## How Zimppy Works

### Sessions (Recommended)

Sessions are the primary interaction pattern. The agent deposits a balance on-chain once, receives a bearer token, and uses it for all subsequent requests at zero latency.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Best for:** High-frequency API calls, LLM inference, repeated data queries.

---

### Streaming

Pay-per-token metered content delivered over **Server-Sent Events (SSE)**. The server deducts from the session balance per word or token streamed.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Best for:** LLM streaming responses, real-time data feeds, pay-per-token AI tools.

---

### Charge

A single shielded payment per request. The full HTTP 402 flow is executed per call. Suitable when requests are infrequent or high-value.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Best for:** High-value one-off requests, infrequent API calls, premium data endpoints.

---

## Use Cases & Examples

### 1. AI Agent

A legal AI agent queries a paid case-law database. Using Zimppy shielded sessions, neither the law firm's identity nor the specific queries are visible on-chain - protecting attorney-client privilege at the infrastructure level.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Agent for Medical Query Pipeline

A medical diagnostic agent queries multiple clinical databases. Shielded payments ensure patient query patterns are not linkable across providers.

### 3. Financial Analysis Agent

An algorithmic trading agent pays for real-time market data APIs. Transparent payments use fresh T-addresses per challenge, preventing usage pattern correlation across data vendors.

### 4. MCP Tool Server, Paid AI Tools

An MCP (Model Context Protocol) server exposes paid AI tools. Each tool invocation triggers a Zimppy charge, enabling a marketplace of monetized AI capabilities.

### 5. LLM Summarizer, Pay-Per-Token

An LLM summarization service charges agents per output token via SSE streaming, with automatic balance deduction and refund of unused prepaid balance.

---

## Installation

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

## Setting Up the Zimppy Wallet

The Zimppy CLI provides a full wallet interface. All commands are available via `npx zimppy`.

### Step 1 : Create a Wallet

```bash
npx zimppy wallet create
```

Generates cryptographic keys and displays your **seed phrase**. Store this securely - it cannot be recovered if lost.

### Step 2 : Check Your Address and Balance

```bash
npx zimppy wallet whoami
```

Displays your **Unified Address (UA)**, **T-address**, current balance, and active network.

```bash
npx zimppy wallet balance --all
```

Shows a per-account balance breakdown across all ZIP-32 accounts.

### Step 3 : Fund Your Wallet

Send ZEC to your Unified Address from any Zcash-compatible wallet or exchange. Shielded deposits go directly to your Orchard account.

### Step 4 : Send and Shield Funds

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

### Step 5 : Make an Auto-Pay Request

```bash
npx zimppy request <url>
```

Automatically handles the full 402 -> pay -> retry flow. Sessions are opened and managed transparently.

---

## Integrating Zimppy - TypeScript SDK

### TypeScript Server - Shielded

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

**Key points:**
- `zcash({ wallet: 'server' })` loads the server's shielded wallet
- `mppx.charge()` handles the full 402 challenge/verify lifecycle
- `result.withReceipt()` attaches the cryptographic payment receipt to the response

---

### TypeScript Server - Transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Each challenge generates a **fresh T-address**, making payment requests unlinkable across sessions.

---

### TypeScript Client

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

The client intercepts `402` responses, opens a session automatically, and retries the request - the calling code requires no payment-specific logic.

---

## Integrating Zimppy - Rust SDK

### Rust Server (Axum)

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

**Key points:**
- `MppCharge<Price>` is an Axum extractor that verifies payment before the handler runs
- `WithReceipt` wraps the response with a cryptographic payment receipt
- `ChargeConfig` defines the pricing logic - can be dynamic based on request parameters

---

### Rust Client

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` extends any HTTP client with automatic 402 handling, session management, and Zcash payment fulfillment.

---

## CLI Reference

| Command | Description |
|---|---|
| `npx zimppy wallet create` | Generate keys and display seed phrase |
| `npx zimppy wallet whoami` | Show address (UA + T-addr), balance, network |
| `npx zimppy wallet balance --all` | Per-account balance breakdown |
| `npx zimppy wallet send <addr> <zat>` | Send shielded or transparent ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | Cross-account internal transfer |
| `npx zimppy wallet shield` | Move transparent funds to Orchard (shielded) |
| `npx zimppy wallet use <name>` | Switch active wallet identity |
| `npx zimppy request <url>` | Auto 402 -> pay -> retry request |

---

## Key Features

### Agent-Native Wallets

Zimppy wallets are designed for programmatic use by AI agents - not human-managed browser extensions. Keys are managed via the CLI or SDKs, accounts can be rotated via **ZIP-32 account derivation**, and the wallet supports fully automated payment flows without human approval per transaction.

### Multi-Agent Support

Multiple agents can operate from the same wallet using **ZIP-32 account rotation** - each agent gets its own account with isolated balance tracking, cross-account transfer capability, and per-account balance reporting. This enables fleet management of many agents from a single wallet infrastructure.

### Fully Shielded Zcash Transactions (Orchard)

Shielded payments use Zcash's **Orchard protocol** - the latest and most secure shielded pool. The server verifies payments using an **Incoming Viewing Key (IVK)**, which can decrypt received notes without exposing the spending key. Replay attacks are prevented via **memo binding** - each challenge embeds a unique `zimppy:{challenge_id}` memo that is cryptographically verified.

### Sessions , Zero Per-Request Latency

The session architecture decouples the on-chain confirmation wait from per-request latency. After a single deposit (~75 seconds), all subsequent bearer-token requests are served instantly with no blockchain interaction until session close.

### Streaming , Pay-Per-Token

Native **SSE (Server-Sent Events)** support enables pay-per-token metered content. Ideal for LLM inference APIs where output length is variable and billing should reflect actual consumption.

### Spec Compliance

- **HMAC-SHA256** signed challenges prevent forgery
- **RFC 9457** structured error format for interoperable error handling
- **`/.well-known/payment`** for automatic payment method discovery by any MPP-compliant agent

---

## Architecture

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

### Component Responsibilities

**`zimppy-core`** - The cryptographic core. Handles Orchard note decryption using the server's IVK, memo parsing, replay protection logic, and challenge verification. Written in Rust for performance and correctness.

**`zimppy-wallet`** - A native Zcash wallet powered by `zingolib`. Manages keys, accounts, shielded/transparent balances, and transaction submission.

**`zimppy-rs`** - The Rust SDK. Provides `ChargeMethod`, `SessionMethod`, and `PaymentProvider` traits, plus Axum extractors (`MppCharge`, `WithReceipt`) for ergonomic server integration.

**`zimppy-napi`** - NAPI-RS bindings that expose the Rust core to Node.js, enabling the TypeScript SDK to use the same cryptographic engine without reimplementing Zcash primitives in JavaScript.

**`zimppy-ts`** - The TypeScript SDK. Wraps NAPI bindings with idiomatic async/await APIs for charge, session, and SSE streaming flows.

**`zimppy-cli`** - The command-line wallet and request tool. Supports auto-pay (402 -> pay -> retry), session management, and all wallet operations.

---

## Examples & Demos

| Example | Description |
|---|---|
| `examples/fortune-teller/` | Charge, session, and streaming demos - Rust server + client |
| `examples/llm-summarizer/` | Pay-per-token LLM streaming demo |
| `examples/mcp-server/` | MCP tool server with paid AI tools |
| `examples/ts-server/` | TypeScript MPP server reference implementation |

---

## What's Included - Feature Summary

| Feature | Description |
|---|---|
| **Sessions** | Deposit once, instant bearer requests, refund on close |
| **Streaming** | Pay-per-token metered content over SSE |
| **Charge** | Shielded or transparent payment per HTTP request (402 flow) |
| **Transparent Payments** | T-addresses with per-challenge replay prevention + shield command |
| **Multi-Account** | ZIP-32 account rotation, cross-account transfers, per-account balances |
| **CLI Wallet** | Send, shield, transfer, balance --all, whoami, auto-pay |
| **Dual SDK** | TypeScript and Rust |
| **Spec-Compliant** | HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` discovery |

---

*For more information, visit [zimppy.xyz](https://zimppy.xyz)*
