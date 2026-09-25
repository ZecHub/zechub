<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz (Nke a bụ ihe dị mkpa)

## TL;DR

- **Zimppy** bụ ihe nkesa ịkwụ ụgwọ nke nzuzo-mbụ maka ndị ọrụ AI na-eji Zcash's Machine Payment Protocol (MPP) eme ihe.
- **Tinye otu ugboro** na-agbanye (~75 sekọnd), wee mee ka ** arịrịọ ozugbo a na - akparaghị ókè ** enweghị mmekọrịta ọ bụla maka blockchain.
- Na-akwado ** zuru ezu na-echebe Zcash (Orchard)** ịkwụ ụgwọ  onye zitere, nnata, ego, na memo niile ezoro ezo
- Na-arụ ọrụ na ** TypeScript and Rust SDKs** maka ntinye dị mfe n'ime pipelines AI na sava API
- Zuru oke maka ** LLM APIs, ahịa data, sava ngwá ọrụ MCP** na ihe ọ bụla eji eme ihe iji ụgwọ M2M.

---

> **Zimppy** bụ usoro ịkwụ ụgwọ Machine Payment Protocol (MPP) maka Zcash na-akwado ma ego echekwara yana nke doro anya. Debe otu oge n'elu, wee mee arịrịọ ndị nwere ngwa ngwa ozugbo enweghị mmekọrịta ọ bụla site na ntinye akwụkwọ.

---

## Isiokwu Ndị Dị na Ya

1. [Gịnị bụ Zimppy.xyz?](#what-is-zimppyxyz)
2. [Gịnị Mere A Na-eji Akwụ Ndị Ọrụ AI Ụgwọ?](#why-shielded-payments-for-ai-agents)
3. [Usoro nkwụnye ego nke igwe (MPP)](#machine-payment-protocol-mpp)
4. [Otú Zimppy Si Arụ Ọrụ](#how-zimppy-works)
   - [Oge ọmụmụ ihe (A na-atụ aro ya)](#sessions-recommended)
   - [Ịgbasagharị](#streaming)
   - [Ụgwọ a na-akwụ ya](#charge)
5. [Jiri Ọnọdụ & Ihe Nlereanya](#use-cases--examples)
6. [Ịwụnye ya](#installation)
7. [Ịtọlite obere akpa Zimppy](#setting-up-the-zimppy-wallet)
8. [Ịgụnye Zimppy](#integrating-zimppy--typescript-sdk)
   - [Ihe nkesa (A na-echebe)](#typescript-server--shielded)
   - [Ihe nkesa (Transparent)](#typescript-server--transparent)
   - [Onye ahịa.](#typescript-client)
9. [Ijikọta Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Ihe nkesa (Axum)](#rust-server-axum)
   - [Onye ahịa.](#rust-client)
10. [CLI Reference Ihe na-eme ka a mata ihe.](#cli-reference)
11. [Ihe Ndị Bụ́ Isi E Ji Mara Ya](#key-features)
12. [Ihe owuwu ụlọ](#architecture)
13. [Ihe Nlereanya & Ngosipụta](#examples--demos)

---

## Gịnị bụ Zimppy.xyz?

**Zimppy.xyz** bụ ihe nkesa ịkwụ ụgwọ nke nzuzo-mbụ emere maka ndị ọrụ AI na igwe akpaghị aka (M2M) arụ ọrụ ọfụma, Ọ mejuputara Usoro Mgbapụta Machine Payment Protocol (MPP) site n'iji Zcash dị ka ego ya, na -enye ohere ma ụzọ mkpuchi (nkeonwe zuru oke) yana usoro ịkwụ ụgwọ doro anya.

Unlike traditional blockchain payment systems, where every transaction is publicly visible on-chain, Zimppy is engineered around a session-based architecture that eliminates per-request latency while preserving cryptographic privacy. This makes it uniquely suited for AI agents that need to pay for APIs, data, compute, or AI tools programmatically, without leaking behavioral metadata.

### Njirimara ndị bụ isi

- ** Nkwụnye ego otu ugboro** na-agbanye (~75 sekọnd maka nkwenye Zcash)
- ** Arịrịọ ozugbo na-akparaghị ókè** mgbe mmeghe nke nnọkọ, enweghị mmekọrịta agbụ maka arịrịọ ọ bụla.
- ** Paymentkwụ ụgwọ echekwara** na-ezipụ onye zitere, nnata, ego, yana memo site na iji usoro Zcash's Orchard protocol
- ** Paymentkwụ ụgwọ doro anya** jiri adreesị T-kwa ihe ịma aka maka igbochi mmeghachi omume na enweghị nzuzo zuru oke
- ** Nkọwapụta-nkwekọrịta**, HMAC-SHA256 nsogbu, RFC 9457 njehie, `/.well-known/payment` nchọpụta

---

## Gịnị Mere A Na-eji Akwụ Ndị Ọrụ AI Ụgwọ?

Maka ndị ọrụ AI na-arụ ọrụ dị nro, nyocha iwu, ajụjụ gbasara ahụike, nchịkọta ego, ọgụgụ isi asọmpi maka ** ọ bụla ịkwụ ụgwọ ọha bụ metadata leak. Zimppy bụ naanị usoro ịkwụ ụgwọ MPP nke bụ ** onwe ya site na ndabara *.

### Nkọwapụta Nzuzo nke Onwe Onye

| Akụ na ụba | Ụlọọrụ Ọha (USDC, ETH) | Zimpy echebere | Zippy Transparent |
|---|---|---|---|
| **Onye zitere** | A na-ahụ anya | Ezoro ezo | A na-ahụ anya |
| **Onye nnata** | A na-ahụ anya | Ezoro ezo | Kwa ihe ịma aka (enweghị njikọ) |
| **Ego** | A na-ahụ anya | Ezoro ezo | A na-ahụ anya |
| **Ndetu** | A na-ahụ anya | Ezoro ezo | N/A |
| **Nchedo ọzọ** | None | Njikọ Memo | Adreesị T nke onye ọ bụla nwere nsogbu |
| **Ụkpụrụ Ojiji Ọrụ** | Njikọ nwere ike | Nkeonwe | Enweghị ike ijikọ (addr ọhụrụ) |

### Nsogbu Oge Ọgwụgwọ, nke E Ji Usoro Ịmụ Ihe Dozie

> *"Ma Zcash nwere oge ngọngọ 75-nke abụọ".*

** Oge na-edozi nke a. * Ichere n'elu agbụ ahụ bụ kpọmkwem otu ugboro mgbe nkwụnye ego. arịrịọ ọ bụla ọzọ ga - eme ozugbo.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Kwụọ otu ugwo, kpọọ ozugbo ma nwetaghachi ego.** Oge a na-achọ ka e mee ihe bụ efu.

---

## Usoro nkwụnye ego nke igwe (MPP)

Usoro nkwekọrịta ịkwụ ụgwọ igwe (MPP) bụ usoro iwu kwadoro nke na-enyere ndị ọrụ ngwanrọ aka onwe ha (ndị ọrụ AI, bots, edemede) ịchọpụta, kparịta ụka ma mezuo ihe achọrọ maka ịnweta API niile n'enweghị enyemaka mmadụ.

### Olee otú MPP si ejikọta na API

MPP na-agbaso usoro HTTP **402 Ịkwụ Ụgwọ A Chọrọ**:

1. **Agent rịọrọ** ihe onwunwe site na njedebe API akwụ ụgwọ.
2. ** Server na-aza** ya bụ: `402 Payment Required` + ihe akaebe e dere ede (ego, onye natara ya, memo).
3. **Onye na-akwụ ụgwọ** jiri usoro ịkwụ ụgwọ dakọtara (dịka, Zimppy kpuchiri Zcash).
4. **Onye ọrụ ahụ na-enyocha** arịrịọ a. `Authorization: Payment {txid}`.
5. ** Server na-enyocha** ugwo ahụ site n'iji cryptographic (Orchard IVK decryption, ego + nyocha ncheta).
6. ** Server na-aza** ya bụ: `200 OK` + a `Payment-Receipt` isi.

### Nkwekọrịta Spec

- **HMAC-SHA256** ịma aka na ịbịanye aka
- **RFC 9457** nzaghachi njehie ahaziri iche
- **`/.well-known/payment`** njedebe maka nchọpụta usoro ịkwụ ụgwọ akpaka.
- **Orchard IVK** (Incoming Viewing Key) maka nkesa-n'akụkụ ugwo nyochaa enweghị ekpughe mmefu igodo

---

## Otú Zimppy Si Arụ Ọrụ

### Oge ọmụmụ ihe (A na-atụ aro ya)

Oge nnọkọ bụ usoro mmekọrịta mbụ. Onye ọrụ ahụ na-etinye nguzozi n'elu agbụ otu oge, nata akara ngosi onye nwe ya ma jiri ya maka arịrịọ niile ọzọ na enweghị nkwụsị.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Kachasị mma maka:** Oku API dị elu, LLM inference, ugboro data gbara ajụjụ.

---

### Ịgbasagharị

A na-akwụ ụgwọ maka akara ngosi nke a napụtara site n'aka ** Ihe omume Server-Sent (SSE) **. Onye nkesa ahụ wepụrụ ihe dị iche iche site na nnọkọ oge ọ bụla ma ọ bụ okwu egosipụtara.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Kachasị mma maka:** LLM na-agbasa nzaghachi, nri data oge, ịkwụ ụgwọ ego AI.

---

### Ụgwọ a na-akwụ ya

A na-akwụ ụgwọ otu mkpuchi maka arịrịọ. Ọkpụkpọ HTTP 402 zuru ezu ka a na-eme site n'oku ọ bụla. Kwesịrị ekwesị mgbe arịrịọrọ dị obere ma ọ bụ uru bara ụba.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Kachasị mma maka:** Arịrịọ dị elu, oku API na-adịghị adịkarị, njedebe data kachasị.

---

## Jiri Ọnọdụ & Ihe Nlereanya

### 1. onye na-ahụ maka ihe ọmụma.

Onye ọrụ iwu nke AI na-ajụ ajụjụ gbasara nchekwa data ikpe akwụ ụgwọ. Iji oge echedoro Zimppy, enweghị njirimara ụlọ ọrụ ọka iwu ma ọ bụ nyocha ndị akọwapụtara anya n'elu - ichedo ikike onye ọka iwu na onye ahịa ya na ọkwa akụrụngwa.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Agent maka Medical Ajụjụ Pipeline

A medical diagnostic agent queries multiple clinical databases. Shielded payments ensure patient query patterns are not linkable across providers.

### 3. Onye na-ahụ maka nyocha ego.

An algorithmic trading agent pays for real-time market data APIs. Transparent payments use fresh T-addresses per challenge, preventing usage pattern correlation across data vendors.

### 4. MCP Ngwá Ọrụ Server, Kwụ ụgwọ AI Ngwaọrụ

Ihe nkesa MCP (Model Context Protocol) na-ekpughe ngwaọrụ AI akwụ ụgwọ. Ngwaọrụ ọ bụla a na - akpọpụta ihe Zimppy, nke na - eme ka ahịa nwee ike ịnweta ego nwere ikike AI.

### 5. LLM Summarizer, Ịkwụ Ụgwọ-Per-Token

Ọrụ nchịkọta LLM na-akwụ ndị ọrụ ụgwọ maka akara ngosi ọpụpụ site na SSE, yana mwepu nkwụnye ego akpaka na nloghachi nke nguzozi akwụghị ụgwọ.

---

## Ịwụnye ya

### Node.js / TypeScript (Nke a bụ ihe dị na ya)

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Igwe na-agbaze agbaze

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Ịtọlite obere akpa Zimppy

Zimppy CLI na-enye interface akpa ego zuru ezu. Iwu niile dị site na `npx zimppy`.

### Nzọụkwụ 1 . Mepụta obere akpa ego:

```bash
npx zimppy wallet create
```

Na-emepụta igodo nzuzo ma na egosiputa ** mkpụrụ okwu gị. Chekwaa nke a n'ụzọ dị nchebe - enweghị ike iweghachite ya ma ọ bụrụ na furu efu.

### Nzọụkwụ nke Abụọ: Lelee Ebe I Bi na Ihe Ndị Dị n'Aka Gị .

```bash
npx zimppy wallet whoami
```

Na-egosiputa **Unified Address (UA) gị, T-address, na netwọkụ dị ugbu a.

```bash
npx zimppy wallet balance --all
```

Na-egosi nkwụsị nke akaụntụ na ihe ndekọ ZIP-32.

### Nzọụkwụ 3: Kwụnye Ego n'akpa Gị

Send ZEC to your Unified Address from any Zcash-compatible wallet or exchange. Shielded deposits go directly to your Orchard account.

### Nzọụkwụ 4: Ziga na Nchekwa ego .

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

### Nzọụkwụ 5: Mee arịrịọ maka ịkwụ ụgwọ akpaaka .

```bash
npx zimppy request <url>
```

Na-akpaghị aka na-ejikwa 402 zuru ezu -> ịkwụ ụgwọ -> retry flow. A ga-emepe nnọkọ ma jikwaa n'ụzọ doro anya.

---

## Ịgwakọta Zimppy - TypeScript SDK

### Ihe nkesa TypeScript - echedoro ya

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
- `zcash({ wallet: 'server' })` na-ebute obere akpa nchekwa nke ihe nkesa ahụ.
- `mppx.charge()` na-ejikwa ihe niile 402 ịma aka / nyochaa ndụ okirikiri.
- `result.withReceipt()` na-etinye akwụkwọ akwụ ụgwọ crypto maka nzaghachi ahụ.

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

Ihe ịma aka ọ bụla na-emepụta ** adreesị T ọhụrụ, nke mere ka arịrịọ ịkwụ ụgwọ ghara inwe ike ịgafe oge.

---

### Ụdị edemede Client

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Onye ahịa ahụ na-egbochi ya. `402` azịza, mepee nnọkọ na-akpaghị aka ma gbalịa arịrịọ ahụ - koodu oku anaghị achọ usoro ịkwụ ụgwọ ọ bụla.

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
- `WithReceipt` na-ekpuchi nzaghachi ahụ site n'ịkwụ ụgwọ ego akwụmụgwọ crypto.
- `ChargeConfig` na-akọwapụta usoro ọnụahịa - nwere ike ịdị egwu dabere na ihe ndị dị mkpa.

---

### Rust Client (Onye ahịa)

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` na-agbatị onye ahịa HTTP ọ bụla site n'iji akpaaka 402, njikwa nnọkọ, yana mmezu ịkwụ ụgwọ Zcash.

---

## CLI Reference Ihe na-eme ka a mata ihe bụ́ nsogbu.

| Iwu | Nkọwa |
|---|---|
| `npx zimppy wallet create` | Mepụta igodo ma gosipụta mkpụrụ okwu |
| `npx zimppy wallet whoami` | Gosi adreesị (UA + T-addr), nguzozi, netwọk |
| `npx zimppy wallet balance --all` | Nchịkọta nguzozi nke akaụntụ ọ bụla |
| `npx zimppy wallet send <addr> <zat>` | Zipu ZEC nke e chebere ma ọ bụ nke doro anya |
| `npx zimppy wallet transfer <from> <to> <zat>` | Mbufe dị n'ime akaụntụ gafere |
| `npx zimppy wallet shield` | Bufee ego doro anya na Orchard (echekwara) |
| `npx zimppy wallet use <name>` | Gbanwee njirimara obere akpa ego na-arụ ọrụ |
| `npx zimppy request <url>` | Akpaaka 402 -> kwụọ ụgwọ -> arịrịọ ọzọ |

---

## Ihe Ndị Bụ́ Isi E Ji Mara Ya

### Ndị na-ahụ maka ndị ọrụ - Native Wallets

Zimppy wallets are designed for programmatic use by AI agents - not human-managed browser extensions. Keys are managed via the CLI or SDKs, accounts can be rotated via **ZIP-32 account derivation**, and the wallet supports fully automated payment flows without human approval per transaction.

### Nkwado Multi-Agent

Multiple agents can operate from the same wallet using **ZIP-32 account rotation** - each agent gets its own account with isolated balance tracking, cross-account transfer capability, and per-account balance reporting. This enables fleet management of many agents from a single wallet infrastructure.

### Zcash Transactions Fully Shielded (Orchard) Nke a bụ otu n'ime ndị na-eme ihe maka ego

Shielded payments use Zcash's **Orchard protocol** - the latest and most secure shielded pool. The server verifies payments using an **Incoming Viewing Key (IVK)**, which can decrypt received notes without exposing the spending key. Replay attacks are prevented via **memo binding** - each challenge embeds a unique `zimppy:{challenge_id}` memo nke a na-enyocha ya site n'iji cryptographic.

### Oge , Zero-Per-Request Latency (Nke a bụ oge ọ bụla na arịrịọ)

The session architecture decouples the on-chain confirmation wait from per-request latency. After a single deposit (~75 seconds), all subsequent bearer-token requests are served instantly with no blockchain interaction until session close.

### Ịgba ọsọ , ịkwụ ụgwọ-kwa-token .

Native ** SSE (Server-Sent Events) nkwado na - enyere aka ịkwụ ụgwọ kwa akara ngosi. Ezigbo maka LLM inference APIs ebe ogologo mmepụta bụ mgbanwe ma ịgba akwụkwọ kwesịrị igosipụta ezigbo oriri.

### Nkwekọrịta Spec

- **HMAC-SHA256** bịanyere aka na ya bụ ihe ịma aka gbochie ịgha ụgha.
- **RFC 9457** usoro njehie ahaziri maka njikwa mmejọ interoperable.
- **`/.well-known/payment`** maka nchọpụta usoro ịkwụ ụgwọ na-akpaghị aka site n'aka onye ọrụ ọ bụla nke kwekọrọ MPP.

---

## Ihe owuwu ụlọ

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

**`zimppy-wallet`** - A obodo Zcash wallet kwadoro site na `zingolib`. Na-ejikwa igodo, akaụntụ, echekwara / uzo nguzozi na ntinye azụmahịa.

**`zimppy-rs`** - The Rust SDK. Na-enye ndị a: `ChargeMethod`, `SessionMethod`, na `PaymentProvider` ihe ndị ọzọ, tinyere Axum extractors (`MppCharge`, `WithReceipt`) maka ijikọta ihe nkesa ergonomic.

**`zimppy-napi`** - NAPI-RS na ejikọta nke gosipụtara isi Rust ka Node.js, na-enyere TypeScript SDK aka iji otu engine cryptographic ahụ n'ebughị ụzọ tinye Zcash primitives na JavaScript .

**`zimppy-ts`** - TypeScript SDK. Na-ekpuchi njikọ NAPI na idiomatic async / await APIs maka ụgwọ, nnọkọ, na SSE iyi mmiri.

**`zimppy-cli`** - Ngwaọrụ iwu-akara na arịrịọ. Na akwado akpaaka (402 -> ịkwụ ụgwọ -> gbalịa), njikwa nnọkọ, yana ọrụ obere akpa niile.

---

## Ihe Nlereanya & Ngosipụta

| Ihe atụ | Nkọwa |
|---|---|
| `examples/fortune-teller/` | Ngosipụta ụgwọ, nnọkọ, na nkwanye ugwu - Sava Rust + onye ahịa |
| `examples/llm-summarizer/` | Ngosipụta nkwanye ugwu LLM nke na-akwụ ụgwọ kwa akara ngosi |
| `examples/mcp-server/` | Ihe nkesa ngwaọrụ MCP nwere ngwaọrụ AI akwụ ụgwọ |
| `examples/ts-server/` | Mmejuputa ntụaka ihe nkesa TypeScript MPP |

---

## Ihe Ndị E Nwere na Ya - Nchịkọta nke Isiokwu Ndị Dị́ na ya

| atụmatụ | Nkọwa |
|---|---|
| **Oge Nzukọ** | Itinye ego otu ugboro, arịrịọ onye na-ebuga ngwa ngwa, nkwụghachi mgbe emechara |
| **Na-agagharị** | Ọdịnaya a na-akwụ ụgwọ kwa akara n'elu SSE |
| **Chaji** | Ịkwụ ụgwọ echekwara ma ọ bụ nke doro anya dịka arịrịọ HTTP si dị (usoro 402) |
| **Ịkwụ Ụgwọ Na-enweghị Ntugharị** | Adreesị T nwere mgbochi replay kwa-ihe ịma aka + iwu nchekwa |
| **Akaụntụ dị iche iche** | Mgbanwe akaụntụ ZIP-32, nnyefe akaụntụ n'ofe, nguzozi akaụntụ kwa akaụntụ |
| **Akpa CLI** | Zipu, chebe, nyefe, nguzozi ---niile, whoami, ịkwụ ụgwọ akpaaka |
| **SDK abụọ** | TypeScript na nchara |
| **Dabere na Nkọwapụta** | Ihe ịma aka HMAC-SHA256, njehie RFC 9457, `/.well-known/payment` nchọpụta |

---

*Maka ozi ndị ọzọ, gaa na ebe a: [zimppy.xyz (n'asụsụ Igbo)](https://zimppy.xyz)*

---

## Peeji ndị metụtara ya

- [Akpa ego](/using-zcash/wallets)  Zcash wallets na-akwado azụmahịa echekwara.
- [Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](/using-zcash/shielded-pools)  Olee otú Orchard echekwara azụmahịa chebe ugwo data
- [Ndị na-arụ ọrụ ịkwụ ụgwọ](/using-zcash/payment-processors)  Ụzọ ndị ọzọ ị ga-esi naara Zcash ụgwọ.
- [Akụ Zcash Echebe](/zcash-tech/zcash-shielded-assets)  ZSAs na ọdịnihu nke mmemme Zcash
- [Ihe Omume Ndị E Nwere n'Ọgbakọ](/zcash-community/community-projects)  Ihe oru ngo nke Zcash ecosystem
