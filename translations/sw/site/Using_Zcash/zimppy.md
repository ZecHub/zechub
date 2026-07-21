<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** ni faragha-kwanza malipo miundombinu kwa ajili ya mawakala AI kutumia Zcash ya Mashine Malipo Itifaki (MPP)
- ** Weka mara moja ** kwenye mnyororo (~ sekunde 75), kisha fanya ** maombi ya papo hapo yasiyo na kikomo ** bila mwingiliano wa blockchain kwa kila ombi
- Inasaidia ** kikamilifu ulinzi Zcash (Orchard) ** malipo  mtumaji, mpokeaji, kiasi, na memo wote ni encrypted
- Kazi na ** TypeScript na Rust SDKs ** kwa ajili ya ushirikiano rahisi katika bomba AI na seva API
- Perfect kwa ** LLM APIs, data masoko, MCP chombo servers **, na yoyote kesi ya matumizi ya malipo M2M

---

> **Zimppy** is the Machine Payment Protocol (MPP) payment method for Zcash supporting both shielded and transparent payments. Deposit once on-chain, then make unlimited instant bearer requests with no per-request chain interaction.

---

## Habari Zilizo Ndani

1. [Zimppy.xyz ni nini?](#what-is-zimppyxyz)
2. [Kwa nini Shielded Malipo kwa AI Mawakala?](#why-shielded-payments-for-ai-agents)
3. [Mashine Malipo Itifaki (MPP)](#machine-payment-protocol-mpp)
4. [Jinsi Zimppy Kazi](#how-zimppy-works)
   - [Kipindi (Kipendekezwa)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Madai](#charge)
5. [Tumia Kesi & Mifano](#use-cases--examples)
6. [Installation](#installation)
7. [Kuanzisha Zimppy Wallet](#setting-up-the-zimppy-wallet)
8. [Kuunganisha Zimppy](#integrating-zimppy--typescript-sdk)
   - [Seva (Shielded)](#typescript-server--shielded)
   - [Seva (Transparent)](#typescript-server--transparent)
   - [Mteja](#typescript-client)
9. [Integrating Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Seva (Axum)](#rust-server-axum)
   - [Mteja](#rust-client)
10. [CLI Rejea](#cli-reference)
11. [Vipengele Vikuu](#key-features)
12. [Ujenzi](#architecture)
13. [Mifano & Demos](#examples--demos)

---

## Zimppy.xyz ni nini?

**Zimppy.xyz** ni faragha-kwanza malipo miundombinu iliyoundwa mahsusi kwa ajili ya mawakala AI na automatiska mashine-kwa-mashine (M2M) workflows. Inatekeleza ** Mashine Malipo Itifaki (MPP) ** kutumia ** Zcash ** kama sarafu yake ya msingi, kuwezesha wote shielded (kikamilifu binafsi) na modes uwazi malipo.

Unlike traditional blockchain payment systems, where every transaction is publicly visible on-chain, Zimppy is engineered around a session-based architecture that eliminates per-request latency while preserving cryptographic privacy. This makes it uniquely suited for AI agents that need to pay for APIs, data, compute, or AI tools programmatically, without leaking behavioral metadata.

### Mali ya msingi

- ** Weka mara moja** kwenye mnyororo (~ sekunde 75 kwa uthibitisho wa Zcash)
- ** Unlimited maombi ya papo hapo ** baada ya kikao kufungua, sifuri kwa kila ombi mlolongo mwingiliano
- ** Malipo ya kulindwa ** encrypt mtumaji, mpokeaji, kiasi, na memo kutumia Zcash ya Orchard itifaki
- ** Malipo ya uwazi ** kutumia kwa changamoto T-anwani kwa ajili ya kuzuia replay bila faragha kamili
- ** Spec-kupatana **, HMAC-SHA256 changamoto, RFC 9457 makosa, `/.well-known/payment` ugunduzi

---

## Kwa nini Malipo yaliyofichwa kwa Wakala wa AI?

For AI agents handling sensitive workflows, legal research, medical queries, financial analysis, competitive intelligence for **every public payment is a metadata leak**. Zimppy is the only MPP payment method that is **private by default**.

### Privacy Comparison Table (Jalada la Kulinganisha Faragha)

Mali. Minyororo ya Umma (USDC, ETH) Zimppy Shielded Zimppy Transparent
|---|---|---|---|
** Mtumaji **: Inaonekana. Imefichwa. Inaonekana
** Receiver ** inayoonekana. Encrypted. Per-changamoto (unlinkable)
** Kiasi** Inaonekana. Imefichwa. Inaonekana
** Memo**. inayoonekana. encrypted. N/A.
Hakuna. Memo binding. Per-changamoto T-anwani.
** Service Usage Pattern**. Linkable. Private. Unlinkable (fresh addr)

### Tatizo la Muda Mrefu, Litatatuliwa na Vikao

> * "Lakini Zcash ina 75 sekunde block mara". *

** vikao kutatua hili.** On-mnyororo kusubiri hutokea hasa ** mara moja ** katika amana. Kila ombi baadae ni papo hapo.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

** Kulipa mara moja, wito instantly, kupata nyuma mabadiliko.** Per-maombi latency ni sifuri.

---

## Mashine Malipo Itifaki (MPP)

** Mashine Malipo Itifaki (MPP) ** ni itifaki standardized kwamba itawezesha uhuru programu mawakala (AI mawakawa, bots, scripts) kugundua, kujadili, na kutimiza mahitaji ya malipo kwa API upatikanaji wote bila uingiliaji wa binadamu.

### Jinsi MPP Integrates na APIs

MPP ifuatavyo HTTP **402 Malipo required** mtiririko:

1. **Agent maombi ** rasilimali kutoka kulipwa API mwisho.
2. ** Seva anajibu ** na `402 Payment Required` + changamoto iliyosainiwa (kiasi, mpokeaji, memo).
3. **Agent hulipa** kwa kutumia njia ya malipo sambamba (kwa mfano, Zimppy shielded Zcash).
4. **Agent reviews ** ombi na `Authorization: Payment {txid}`.
5. ** Server kuthibitisha ** malipo cryptographically (Orchard IVK decryption, kiasi + memo kuangalia).
6. ** Seva anajibu ** na `200 OK` + a `Payment-Receipt` kichwa.

### Spec Utii

- **HMAC-SHA256** changamoto kusaini
- ** RFC 9457** structured makosa majibu
- **`/.well-known/payment`** mwisho kwa ajili ya kugundua njia ya malipo ya moja kwa moja
- **Orchard IVK** (Incoming Viewing Key) kwa ajili ya upande wa seva malipo ya uthibitisho bila kufichua funguo za matumizi

---

## Jinsi Zimppy Inavyofanya Kazi

### Mikutano (Ilipendekezwa)

Vikao ni msingi mwingiliano muundo. wakala amana usawa on-mnyororo mara moja, anapokea bearer ishara, na kuitumia kwa maombi yote ya baadaye katika zero latency.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

** Bora kwa ajili ya:** High-frequency API wito, LLM inference, kurudia data maswali.

---

### Mtiririko

Pay-per-token metered maudhui mikononi juu ya **Server-Sent Matukio (SSE) **. server deducts kutoka usawa kikao kwa neno au ishara streamed.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

** Bora kwa ajili ya: ** LLM majibu ya mkondo, data ya wakati halisi feeds, kulipa-kwa-token zana AI.

---

### Malipo

Moja shielded malipo kwa ombi. kamili HTTP 402 mtiririko ni kutekelezwa kwa wito. Yanafaa wakati maombi ni nadra au high-thamani.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

** Bora kwa ajili ya: ** high-thamani moja-off maombi, wito mara chache API, mwisho wa data premium.

---

## Tumia Kesi & Mifano

### 1. AI Wakala

A kisheria AI wakala maswali kulipwa kesi ya sheria database. Kutumia Zimppy kulindwa vikao, wala utambulisho wa kampuni ya sheria wala maswali maalum ni inayoonekana kwenye mnyororo - kulinda attorney-mteja upendeleo katika ngazi ya miundombinu.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Wakala kwa matibabu Query Bomba

Wakala wa utambuzi wa matibabu anauliza database nyingi za kliniki. Malipo yaliyohifadhiwa yanahakikisha mifumo ya maswali ya mgonjwa haiwezi kuunganishwa kwa watoa huduma.

### 3. Uchambuzi wa Fedha Agent

algorithmic biashara wakala analipa kwa ajili ya muda halisi soko data APIs. malipo Uwazi kutumia safi T-anwani kwa kila changamoto, kuzuia matumizi muundo uwiano katika wauzaji data.

### 4. MCP Tool Server, kulipwa AI Tools

MCP (Model Context Protocol) server inaonyesha zana za AI zilizolipwa. Kila wito wa zana husababisha malipo ya Zimppy, kuwezesha soko la uwezo wa AI uliopatikana.

### 5. LLM Summarizer, Kulipa-Per-Token

An LLM summarization service charges agents per output token via SSE streaming, with automatic balance deduction and refund of unused prepaid balance.

---

## Ufungaji

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Kutu

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Kuanzisha Zimppy Wallet

Zimppy CLI hutoa interface kamili mkoba. amri zote zinapatikana kupitia `npx zimppy`.

### Hatua ya 1: Kuunda Wallet

```bash
npx zimppy wallet create
```

Inazalisha funguo cryptographic na maonyesho yako ** mbegu maneno **. Hifadhi hii salama - haiwezi kurejeshwa kama waliopotea.

### Hatua ya 2: Chunguza Anwani Yako na Usawaziko Wako

```bash
npx zimppy wallet whoami
```

Displays your **Unified Address (UA)**, **T-address**, current balance, and active network.

```bash
npx zimppy wallet balance --all
```

Inaonyesha per-akaunti usawa kuvunjika katika akaunti zote ZIP-32.

### Hatua ya 3: Weka Pesa Katika Mkoba Wako

Send ZEC to your Unified Address from any Zcash-compatible wallet or exchange. Shielded deposits go directly to your Orchard account.

### Hatua ya 4: Tuma na Kulinda Fedha

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

### Hatua ya 5: Kufanya ombi la Auto-Pay

```bash
npx zimppy request <url>
```

Moja kwa moja hushughulikia kamili 402 -> kulipa -> jaribu tena mtiririko. vikao ni kufunguliwa na kusimamiwa uwazi.

---

## Kuunganisha Zimppy - TypeScript SDK

### Seva ya TypeScript - Imehifadhiwa

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

** Mambo muhimu:**
- `zcash({ wallet: 'server' })` mzigo wallet server ya ulinzi
- `mppx.charge()` kushughulikia nzima 402 changamoto / kuthibitisha lifecycle
- `result.withReceipt()` huambatanisha risiti ya malipo ya kificho kwa jibu

---

### Seva ya TypeScript - Uwazi

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Kila changamoto inazalisha ** safi T-anwani **, na kufanya maombi ya malipo unlinkable katika vikao.

---

### Mteja wa TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

mteja intercepts `402` majibu, kufungua kikao moja kwa moja, na retries ombi - wito code inahitaji hakuna malipo maalum mantiki.

---

## Kuunganisha Zimppy - Rust SDK

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

** Mambo muhimu:**
- `MppCharge<Price>` ni Axum extractor kwamba kuthibitisha malipo kabla ya kukimbia handler
- `WithReceipt` hufunga jibu na risiti ya malipo ya cryptographic
- `ChargeConfig` hufafanua mantiki ya bei - inaweza kuwa na nguvu kulingana na vigezo vya ombi

---

### Rust Mteja

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` kupanua yoyote HTTP mteja na moja kwa moja 402 utunzaji, usimamizi wa kikao, na Zcash malipo kutimiza.

---

## CLI Marejeo

Amri Maelezo
|---|---|
| `npx zimppy wallet create` Kuzalisha funguo na kuonyesha mstari wa mbegu.
| `npx zimppy wallet whoami` Kuonyesha anwani (UA + T-addr), usawa, mtandao.
| `npx zimppy wallet balance --all` Kuvunjika kwa usawa wa kila akaunti.
| `npx zimppy wallet send <addr> <zat>` Tuma ZEC iliyohifadhiwa au ya uwazi.
| `npx zimppy wallet transfer <from> <to> <zat>` Kuhamisha ndani ya akaunti.
| `npx zimppy wallet shield` Kuhamisha fedha uwazi kwa Orchard (kuhifadhiwa).
| `npx zimppy wallet use <name>` Kubadilisha kitambulisho cha mkoba hai.
| `npx zimppy request <url>` ◯ Auto 402 -> kulipa -> ombi la kujaribu tena.

---

## Sifa Muhimu

### Wakala-Native Wallets

Zimppy pochi ni iliyoundwa kwa ajili ya matumizi ya programu na mawakala wa AI - si binadamu-kusimamiwa browser upanuzi. funguo ni kusimamiwa kupitia CLI au SDKs, akaunti inaweza kuzungushwa kupitia **ZIP-32 akaunti derivation**, na mkoba inasaidia kikamilifu automatiska malipo ya mtiririko bila kibali binadamu kwa kila shughuli.

### Multi-Agent Msaada

Multiple agents can operate from the same wallet using **ZIP-32 account rotation** - each agent gets its own account with isolated balance tracking, cross-account transfer capability, and per-account balance reporting. This enables fleet management of many agents from a single wallet infrastructure.

### Shughuli za Zcash Zilizolindwa Kikamilifu (Orchard)

Malipo Shielded kutumia Zcash ya **Orchard itifaki ** - karibuni na salama zaidi kulindwa pool. server kuthibitisha malipo kwa kutumia **Incoming Viewing Key (IVK) **, ambayo inaweza decrypt noti kupokea bila kufichua ufunguo wa matumizi. mashambulizi replay ni kuzuiwa kupitia **memo binding** - kila changamoto kuingiza kipekee `zimppy:{challenge_id}` memo kwamba ni cryptographically kuthibitishwa.

### Vikao , Zero-Per-Request Latency

Usanifu wa kikao decouples on-mnyororo uthibitisho kusubiri kutoka kwa kila ombi latency. Baada ya amana moja (~ sekunde 75), maombi yote ya baadaye bearer-token ni kutumika mara moja na hakuna mwingiliano blockchain mpaka kikao karibu.

### Streaming , Pay-Per-Token

Asili ** SSE (Server-Sent Matukio) ** msaada itawezesha kulipa-kwa ishara kipimo maudhui. Bora kwa LLM inference APIs ambapo pato urefu ni kutofautiana na bili lazima kutafakari matumizi halisi.

### Spec Utii

- ** HMAC-SHA256** imesainiwa changamoto kuzuia bandia
- ** RFC 9457** umeboreshwa kosa muundo kwa ajili ya kushughulikia makosa interoperable
- **`/.well-known/payment`** kwa ajili ya kugundua njia ya malipo ya moja kwa moja na wakala yoyote MPP-kufuata

---

## Usanifu

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

### Majukumu ya Sehemu

**`zimppy-core`** - msingi cryptographic. Hushughulikia Orchard kumbuka decryption kutumia IVK server ya, memo parsing, replay ulinzi mantiki, na changamoto uthibitisho. Imeandikwa katika kutu kwa ajili ya utendaji na usahihi.

**`zimppy-wallet`** - Asili Zcash mkoba powered by `zingolib`. Inasimamia funguo, akaunti, walinzi / usawa wa uwazi, na kuwasilisha shughuli.

**`zimppy-rs`** - Rust SDK. Inatoa `ChargeMethod`, `SessionMethod`, na `PaymentProvider` traits, pamoja na Axum extractors (`MppCharge`, `WithReceipt`) kwa ajili ya ushirikiano wa seva ergonomic.

**`zimppy-napi`** - NAPI-RS bindings kwamba yatangaza Rust msingi kwa Node.js, kuwezesha TypeScript SDK kutumia injini hiyo cryptographic bila reimplementing Zcash primitives katika JavaScript.

**`zimppy-ts`** - TypeScript SDK. Wraps NAPI bindings na idiomatic async / kusubiri APIs kwa malipo, kikao, na SSE mtiririko wa mkondo.

**`zimppy-cli`** - amri-line mkoba na ombi chombo. Inasaidia auto-kulipa (402 -> kulipa -> jaribu tena), usimamizi wa kikao, na shughuli zote mkoba.

---

## Mifano & Demos

Mfano Maelezo
|---|---|
| `examples/fortune-teller/`  malipo, kikao, na Streaming demos - Rust server + mteja
| `examples/llm-summarizer/` Pay-kwa-tokeni LLM Streaming demo.
| `examples/mcp-server/` MCP chombo server na zana kulipwa AI.
| `examples/ts-server/` Mpango wa kumbukumbu ya seva ya TypeScript MPP.

---

## Ni Nini Kinachohusika - Muhtasari wa Sehemu Zinazohusika

Sehemu ya maelezo.
|---|---|
Kuweka mara moja, maombi ya mtoaji wa papo hapo, kurudishiwa kwa karibu.
** Streaming **. Pay-kwa-token kipimo maudhui juu ya SSE.
**Charge**. Shielded au uwazi malipo kwa HTTP ombi (402 mtiririko)
** Malipo ya Uwazi ** T-anwani na kwa changamoto kuzuia replay + ngao amri
| **Multi-Account** | ZIP-32 account rotation, cross-account transfers, per-account balances |
Tuma, kulinda, kuhamisha, usawa - wote, whoami, malipo ya moja kwa moja.
** Dual SDK ** TypeScript na kutu.
HMAC-SHA256 changamoto, RFC 9457 makosa, `/.well-known/payment` ugunduzi.

---

*Kwa habari zaidi, tembelea [zimppy.xyz](https://zimppy.xyz)*

---

## Kurasa Zinazohusiana

- [Mifuko ya fedha](/using-zcash/wallets)  Zcash pochi kwamba msaada ulinzi shughuli
- [Vidimbwi vya Kuhifadhiwa](/using-zcash/shielded-pools)  Jinsi Orchard kulinda shughuli kulinda data ya malipo
- [Mipangilio ya Malipo](/using-zcash/payment-processors)  Njia nyingine za kukubali malipo ya Zcash
- [Zcash Shielded Mali](/zcash-tech/zcash-shielded-assets)  ZSAs na baadaye ya programu ya Zcash
- [Miradi ya Jumuiya](/zcash-community/community-projects)  Miradi zaidi ya mazingira ya Zcash
