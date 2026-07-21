<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** bụ usoro ịkwụ ụgwọ nzuzo nke mbụ maka ndị ọrụ AI na-eji Zcash's Machine Payment Protocol (MPP)
- **Tinye otu ugboro** na-agbanye (~75 sekọnd), wee mee ** arịrịọ ozugbo ** na-enweghị mkparịta ụka blockchain kwa-arịọ
- Na-akwado **Zcash (Orchard) zuru ezu echedoro** ịkwụ ụgwọ  onye na-ezipụ, onye nnata, ego, na memo niile ezoro ezo
- Works with **TypeScript and Rust SDKs** for easy integration into AI pipelines and API servers
- Zuru oke maka ** LLM APIs, ahịa data, MCP ngwá ọrụ sava **, na ihe ọ bụla M2M ugwo ojiji ikpe

---

> **Zimppy** is the Machine Payment Protocol (MPP) payment method for Zcash supporting both shielded and transparent payments. Deposit once on-chain, then make unlimited instant bearer requests with no per-request chain interaction.

---

## Isiokwu Ndị Dị n'Ụlọ Nche A

1. [Gịnị bụ Zimppy.xyz?](#what-is-zimppyxyz)
2. [Gịnị Mere A Na-eji Echebe Ịkwụ Ụgwọ Maka Ndị Ọrụ AI?](#why-shielded-payments-for-ai-agents)
3. [Nkwekọrịta ịkwụ ụgwọ igwe (MPP) ]](#machine-payment-protocol-mpp)
4. [Otú Zimppy si arụ ọrụ](#how-zimppy-works)
   - [Ọmụmụ ihe (A tụrụ aro ya) ]](#sessions-recommended)
   - [Na-asọba](#streaming)
   - [Ụgwọ](#charge)
5. [Jiri Ọnọdụ & Ihe Nlereanya](#use-cases--examples)
6. [Ụlọ nrụnye](#installation)
7. [Ịtọlite obere akpa Zimppy](#setting-up-the-zimppy-wallet)
8. [Ijikọta Zimppy](#integrating-zimppy--typescript-sdk)
   - Ihe nkesa (A na-echebe)](#typescript-server--shielded)
   - [Ihe nkesa (Transparent)](#typescript-server--transparent)
   - [Onye ahịa](#typescript-client)
9. [Integrating Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Ihe nkesa (Axum) ]](#rust-server-axum)
   - [Onye ahịa](#rust-client)
10. [CLI Reference](#cli-reference)
11. [Ihe Ndị Dị Mkpa](#key-features)
12. [Ihe owuwu ụlọ](#architecture)
13. [Ihe Nlereanya & Ihe ngosi](#examples--demos)

---

## Gịnị bụ Zimppy.xyz?

**Zimppy.xyz** is a privacy-first payment infrastructure designed specifically for AI agents and automated machine-to-machine (M2M) workflows. It implements the **Machine Payment Protocol (MPP)** using **Zcash** as its underlying currency, enabling both shielded (fully private) and transparent payment modes.

Unlike traditional blockchain payment systems, where every transaction is publicly visible on-chain, Zimppy is engineered around a session-based architecture that eliminates per-request latency while preserving cryptographic privacy. This makes it uniquely suited for AI agents that need to pay for APIs, data, compute, or AI tools programmatically, without leaking behavioral metadata.

### Njirimara ndị bụ isi

- **Nkwụnye ego otu ugboro** na-agbụ (~75 sekọnd maka nkwenye Zcash)
- ** Arịrịọ ozugbo na-akparaghị ókè ** mgbe mmeghe nke nnọkọ, enweghị mmekọrịta agbụ maka arịrịọ
- ** Paymentkwụ ụgwọ echekwara ** zoo onye na-ezipụ, onye nnata, ego, na memo na-eji usoro Zcash's Orchard
- ** Paymentkwụ ụgwọ doro anya ** jiri adreesị T-maka nsogbu ọ bụla maka igbochi mmeghachi omume na-enweghị nzuzo zuru oke
- ** Nkọwapụta-nkwekọrịta **, HMAC-SHA256 nsogbu, RFC 9457 njehie, `/.well-known/payment` nchọpụta

---

## N'ihi Gịnị Ka A Na-eji Echebe Ịkwụ Ụgwọ Maka Ndị Ọrụ AI?

Maka ndị ọrụ AI na-ejikwa usoro ọrụ dị nro, nyocha iwu, ajụjụ gbasara ahụike, nyocha ego, ọgụgụ isi asọmpi maka ** ọ bụla ịkwụ ụgwọ ọha na eze bụ metadata leak **. Zimppy bụ naanị usoro MPP nke bụ ** nkeonwe site na ndabara **.

### Tebụl Nkọwapụta Nzuzo

◯ Ihe onwunwe ◯ Mgbasa Ozi Ọha (USDC, ETH) ◯ Zimppy Shielded ❖ Zimppy Transparent
|---|---|---|---|
** Onye na-ezipụ ** Ihe a na-ahụ anya. Encrypted. Visible.
** Onye na-anata ** Anya. Encrypted. Per-ihe ịma aka (unlinkable)
** Amount ** A na-ahụ ya anya. Encrypted. A na - ahụ ya anya
**Memo**: A na-ahụ anya. Encrypted: N/A.
** Ntughari Nchedo ** Ọ dịghị onye. Memo na-ejikọta. Per-mkpagbu T-address.
** Ụkpụrụ Ojiji Ọrụ ** Linkable  Private  Unlinkable (fresh addr)

### Nsogbu nke Oge Ịnọ n'Ọrụ, nke Oge Ije Ozi Doziri

> *"Ma Zcash nwere oge ngọngọ 75-nke abụọ".*

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

**Kwụọ otu ugwo, kpọọ ozugbo, weghachite mgbanwe ahụ.** Per-request latency bụ efu.

---

## Nkwekọrịta ịkwụ ụgwọ igwe (MPP)

**Machine Payment Protocol (MPP) ** bụ usoro iwu kwadoro nke na-enyere ndị ọrụ ngwanrọ aka (ndị ọrụ AI, bots, edemede) ịchọpụta, kparịta ụka, ma mezuo ihe ịkwụ ụgwọ maka ịnweta API niile na-enweghị enyemaka mmadụ.

### Olee otú MPP si ejikọta na API

MPP na-agbaso usoro HTTP **402 Ịkwụ Ụgwọ A Chọrọ **:

1. **Agent na-arịọ** ihe onwunwe site na njedebe API akwụ ụgwọ.
2. **Server na-azaghachi** na `402 Payment Required` + ihe akaebe e dere ede (ego, onye natara ya, memo).
3. **Agent na-akwụ ụgwọ** na-eji usoro ịkwụ ụgwọ dakọtara (dịka, Zimppy kpuchiri Zcash).
4. **Onye ọrụ ahụ na-enyocha** arịrịọ ahụ na `Authorization: Payment {txid}`.
5. **Server na-enyocha** ugwo ahụ na cryptographically (Orchard IVK decryption, ego + nyocha ncheta).
6. **Server na-azaghachi** na `200 OK` + a `Payment-Receipt` isi.

### Nkwekọrịta Spec

- **HMAC-SHA256** ịma aka ịbịanye aka
- **RFC 9457** nzaghachi njehie ahaziri
- **`/.well-known/payment`** njedebe maka nchọpụta usoro ịkwụ ụgwọ akpaka
- **Orchard IVK** (Incoming Viewing Key) maka nkesa-n'akụkụ ugwo nkwenye enweghị ekpughe mmefu igodo

---

## Otú Zimppy Si Arụ Ọrụ

### Ọmụmụ ihe (A na-atụ aro ya)

Sessions are the primary interaction pattern. The agent deposits a balance on-chain once, receives a bearer token, and uses it for all subsequent requests at zero latency.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Kachasị mma maka:** oku API dị elu, LLM inference, ajụjụ data ugboro ugboro.

---

### Ịgbasagharị

Pay-per-token metered content delivered over **Server-Sent Events (SSE)**. The server deducts from the session balance per word or token streamed.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Kachasị mma maka:** LLM nzaghachi na-aga n'ihu, nri data oge, ịkwụ ụgwọ-kwa-token AI ngwaọrụ.

---

### Ụgwọ

Otu ugwo a na-echebe kwa arịrịọ. A na-emezu usoro HTTP 402 zuru ezu kwa oku. Kwesịrị ekwesị mgbe arịrịọrọ dị obere ma ọ bụ uru dị elu.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Kachasị mma maka:** arịrịọ dị elu, oku API na-adịghị adịkarị, njedebe data kachasị mma.

---

## Jiri Ọnọdụ & Ihe Nlereanya

### 1. onye na-arụ ọrụ AI

A legal AI agent queries a paid case-law database. Using Zimppy shielded sessions, neither the law firm's identity nor the specific queries are visible on-chain - protecting attorney-client privilege at the infrastructure level.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Agent maka Medical Ajụjụ Pipeline

A medical diagnostic agent queries multiple clinical databases. Shielded payments ensure patient query patterns are not linkable across providers.

### 3. Onye na-ahụ maka nyocha ego

An algorithmic trading agent pays for real-time market data APIs. Transparent payments use fresh T-addresses per challenge, preventing usage pattern correlation across data vendors.

### 4. MCP Tool Server, Ngwá Ọrụ AI Na-akwụ ụgwọ

Ihe nkesa MCP (Model Context Protocol) na-ekpughe ngwaọrụ AI akwụ ụgwọ. Ngwaọrụ ọ bụla na-ebute ụgwọ Zimppy, na-eme ka ahịa nke ike AI monetized.

### 5. LLM Summarizer, Pay-Per-Token

An LLM summarization service charges agents per output token via SSE streaming, with automatic balance deduction and refund of unused prepaid balance.

---

## Ntinye

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Ọkụ

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Ịtọlite obere akpa Zimppy

Zimppy CLI na-enye interface akpa ego zuru ezu. Iwu niile dị site na `npx zimppy`.

### Nzọụkwụ 1: Mepụta obere akpa ego

```bash
npx zimppy wallet create
```

Na-emepụta igodo nzuzo ma na-egosipụta ** mkpụrụ okwu gị **. Chekwaa nke a n'enweghị nsogbu - enweghị ike iweghachite ya ma ọ bụrụ na furu efu.

### Nzọụkwụ nke Abụọ: Lelee Ebe Obibi Gị na Ego I Ji n"Ụlọ

```bash
npx zimppy wallet whoami
```

Na-egosi gị **Unified Address (UA) **, **T-address**, current balance, na netwọkụ nọ n'ọrụ.

```bash
npx zimppy wallet balance --all
```

Na-egosi mmebi nke nguzozi kwa akaụntụ n'ofe akaụntụ ZIP-32 niile.

### Nzọụkwụ nke atọ: Nweta ego n'akpa gị

Send ZEC to your Unified Address from any Zcash-compatible wallet or exchange. Shielded deposits go directly to your Orchard account.

### Nzọụkwụ 4: Ziga ma chebe ego

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

### Nzọụkwụ 5: Mee arịrịọ maka ịkwụ ụgwọ akpaaka

```bash
npx zimppy request <url>
```

Na-akpaghị aka na-ejikwa 402 zuru ezu -> ịkwụ ụgwọ -> retry flow. A na-emeghe nnọkọ ma jikwaa n'ụzọ doro anya.

---

## Ijikọta Zimppy - TypeScript SDK

### Ihe nkesa TypeScript - echedoro

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

**Isi ihe ndị dị mkpa:**
- `zcash({ wallet: 'server' })` na-ebute obere akpa nchekwa nke ihe nkesa
- `mppx.charge()` na-ejikwa ihe niile 402 ịma aka / nyochaa ndụ ndụ
- `result.withReceipt()` na-agbakwunye akwụkwọ akwụ ụgwọ crypto na nzaghachi

---

### Ihe nkesa TypeScript - Transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Ihe ịma aka ọ bụla na-ewepụta ** adreesị T ọhụrụ, na-eme ka arịrịọ ịkwụ ụgwọ enweghị ike ijikọ n'ofe nnọkọ.

---

### Onye ahịa TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Onye ahịa ahụ na-egbochi `402` nzaghachi, mepee nnọkọ na-akpaghị aka, ma gbalịa arịrịọ ahụ - koodu oku anaghị achọ usoro ịkwụ ụgwọ ọ bụla.

---

## Ijikọta Zimppy - Rust SDK

### Ihe nkesa Rust (Axum)

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

**Isi ihe ndị dị mkpa:**
- `MppCharge<Price>` bụ ihe Axum extractor na-enyocha ugwo tupu handler agba ọsọ
- `WithReceipt` na-ekpuchi nzaghachi ahụ na nnata ụgwọ crypto
- `ChargeConfig` akọwapụta pricing mgbagha - nwere ike ịbụ ike dabeere na arịrịọ parameters

---

### Onye ahịa Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` na-agbatị onye ahịa HTTP ọ bụla na njikwa 402, njikwa nnọkọ, na mmezu ịkwụ ụgwọ Zcash.

---

## CLI Ntughari

Iwu Nkọwa
|---|---|
| `npx zimppy wallet create` ◯ Mepụta igodo ma gosipụta mkpụrụ okwu.
| `npx zimppy wallet whoami` ◯ Gosi adreesị (UA + T-addr), nguzozi, netwọkụ
| `npx zimppy wallet balance --all` ◯ Nkọwa nke ego ole dị n'otu akaụntụ.
| `npx zimppy wallet send <addr> <zat>` ◯ Ziga ZEC na-ekpuchi ma ọ bụ na-enweghị ihe ọ bụla
| `npx zimppy wallet transfer <from> <to> <zat>` ◯ Nnyefe ego n'ime ụlọ ọrụ.
| `npx zimppy wallet shield` | Move transparent funds to Orchard (shielded) |
| `npx zimppy wallet use <name>` Gbanwee njirimara wallet na-arụ ọrụ.
| `npx zimppy request <url>` ◯ Auto 402 -> ịkwụ ụgwọ -> arịrịọ ịnwale ọzọ ◯

---

## Isi Ihe Ndị E Ji Mara Ya

### Wallets Ndị Ọrụ-Native

Zimppy wallets are designed for programmatic use by AI agents - not human-managed browser extensions. Keys are managed via the CLI or SDKs, accounts can be rotated via **ZIP-32 account derivation**, and the wallet supports fully automated payment flows without human approval per transaction.

### Nkwado Multi-Agent

Multiple agents can operate from the same wallet using **ZIP-32 account rotation** - each agent gets its own account with isolated balance tracking, cross-account transfer capability, and per-account balance reporting. This enables fleet management of many agents from a single wallet infrastructure.

### Azụmahịa Zcash Zuru Ezu (Orchard)

Shielded payments use Zcash's **Orchard protocol** - the latest and most secure shielded pool. The server verifies payments using an **Incoming Viewing Key (IVK)**, which can decrypt received notes without exposing the spending key. Replay attacks are prevented via **memo binding** - each challenge embeds a unique `zimppy:{challenge_id}` memo na-cryptographically kwupụtara.

### Oge , Zero-Per-Arịrịọ Latency

The session architecture decouples the on-chain confirmation wait from per-request latency. After a single deposit (~75 seconds), all subsequent bearer-token requests are served instantly with no blockchain interaction until session close.

### Na-aga n'ihu , Ịkwụ Ụgwọ-Per-Token

Native **SSE (Server-Sent Events) ** nkwado na-enyere ịkwụ ụgwọ-kwa-nkọwapụta ọdịnaya. Ezigbo maka LLM inference APIs ebe ogologo mmepụta bụ mgbanwe na ịgba ụgwọ kwesịrị igosipụta ezigbo oriri.

### Nkwekọrịta Spec

- **HMAC-SHA256** bịanyere aka na ya na-egbochi ịgha ụgha
- **RFC 9457** usoro njehie ahaziri maka njikwa njehie interoperable
- **`/.well-known/payment`** maka nchọpụta usoro ịkwụ ụgwọ na-akpaghị aka site na onye ọrụ ọ bụla na-agbaso MPP

---

## Ihe owuwu

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

### Ọrụ nke Akụkụ ahụ

**`zimppy-core`** - The cryptographic core. Handles Orchard note decryption using the server's IVK, memo parsing, replay protection logic, and challenge verification. Written in Rust for performance and correctness.

**`zimppy-wallet`** - A obodo Zcash wallet kwadoro site `zingolib`. Na-ejikwa igodo, akaụntụ, echekwa / uzo uzo, na ntinye azụmahịa.

**`zimppy-rs`** - Rust SDK. Na-enye `ChargeMethod`, `SessionMethod`, na `PaymentProvider` traits, gbakwunyere Axum extractors (`MppCharge`, `WithReceipt`) maka ijikọta ihe nkesa ergonomic.

**`zimppy-napi`** - NAPI-RS bindings that expose the Rust core to Node.js, enabling the TypeScript SDK to use the same cryptographic engine without reimplementing Zcash primitives in JavaScript.

**`zimppy-ts`** - TypeScript SDK. Na-ekpuchi njikọ NAPI na idiomatic async / await APIs maka ụgwọ, nnọkọ, na SSE iyi iyi.

**`zimppy-cli`** - Ngwaọrụ iwu-akara na arịrịọ. Na-akwado akpaaka-ịkwụ ụgwọ (402 -> ịkwụ ụgwọ -> gbalịa ọzọ), njikwa nnọkọ, na ọrụ akpa ego niile.

---

## Ihe Nlereanya & Ngosipụta

Ihe atụ. Nkọwa.
|---|---|
| `examples/fortune-teller/` ◯ Nchaji, nnọkọ, na nkwanye ngosi - Rust server + client ◯
| `examples/llm-summarizer/` ◯ Ngosipụta nke LLM na-akwụ ụgwọ site na akara ngosi.
| `examples/mcp-server/` MCP ngwá ọrụ nkesa na akwụ ụgwọ AI ngwaọrụ.
| `examples/ts-server/` Ntughari ntinye ihe nkesa MPP TypeScript.

---

## Ihe Ndị E Nwere na Ya - Nchịkọta nke Ihe Ndị Dị na Ya

Njirimara Nkọwa
|---|---|
** Oge** Deposit otu ugboro, ozugbo bearer arịrịọ, nkwụghachi na nso
**Streaming** Pay-per-token metered ọdịnaya n'elu SSE
 ** Charge **  Echebe ma ọ bụ na-akwụ ụgwọ n'ụzọ doro anya kwa arịrịọ HTTP (402 flow) 
♬ ** Transparent Payments ** ♬ T-adreesị na kwa-nsogbu replay mgbochi + ọta iwu
**Multi-Account**. ZIP-32 akaụntụ mgbanwe, cross-akaụntụ na-enyefe, kwa akaụntụ balances.
Ziga, mkpuchi, nyefee, nguzozi - niile, whoami, akpaaka-akwụ ụgwọ.
** Dual SDK ** TypeScript na Rust
**Spec-Compliant** HMAC-SHA256 nsogbu, RFC 9457 njehie, `/.well-known/payment` nchọpụta.

---

*Maka ozi ndị ọzọ, gaa na [zimppy.xyz](https://zimppy.xyz)*

---

## Peeji ndị metụtara ya

- [Akpa ego](/using-zcash/wallets)  Akpa ego Zcash nke na-akwado azụmahịa echekwara
- [Egwú Mmiri Ndị E Chebere](/using-zcash/shielded-pools)  Olee otú Orchard shielded azụmahịa chebe ugwo data
- [Nhazi ịkwụ ụgwọ](/using-zcash/payment-processors)  Ụzọ ndị ọzọ ị na-anabata ịkwụ ụgwọ Zcash
- [Zcash echebe akụ](/zcash-tech/zcash-shielded-assets)  ZSAs na ọdịnihu nke mmemme Zcash
- [Ihe Omume Obodo](/zcash-community/community-projects)  More Zcash ecosystem oru ngo
