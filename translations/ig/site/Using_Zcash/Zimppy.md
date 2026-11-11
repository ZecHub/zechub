<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## Na nkenke

- **Zimppy** bụ akụrụngwa Kwụọ ụhwọ [payment] nke Nzuzo [privacy] na-ebute ụzọ maka ndị nnọchi AI na-eji Zcash's Machine Payment Protocol (MPP)
- **Tinye ego otu ugboro** on-chain (~75 sekọnd), emesia mee **arịrịọ ozugbo na-enweghị oke** na-enweghị mmekọrịta blockchain kwa arịrịọ
- Ọ na-akwado Azụmahia [transaction] Zcash (Orchard) **nke e chebere echebe [shielded] kpamkpam** — onye zitere, onye nata, ego, na memo ka ezobere ederede
- Ọ na-arụ ọrụ na **TypeScript na Rust SDKs** maka itinye ya n'ụzọ dị mfe n'ime pipeline AI na sava API
- Ọ dabara nke ọma maka **LLM APIs, ebe ahịa data, sava ngwá ọrụ MCP**, na Ojiji [use case] Kwụọ ụhwọ M2M ọ bụla

---

> **Zimppy** bụ usoro Kwụọ ụhwọ Machine Payment Protocol (MPP) maka Zcash nke na-akwado ma ịkwụ ụgwọ nke e chebere echebe ma nke Oha [transparent]. Tinye ego otu ugboro on-chain, emesia mee arịrịọ bearer ozugbo na-enweghị oke na-enweghị mmekọrịta chain [chain] kwa arịrịọ.

---

## Tebụl nke Ọdịnaya

1. [Gịnị bụ Zimppy.xyz?](#what-is-zimppyxyz)
2. [Gịnị Mere E Ji Achọ Ịkwụ Ụgwọ E Chebere Echebe Maka Ndị Nnọchi AI?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Otu Zimppy Si Arụ Ọrụ](#how-zimppy-works)
   - [Sessions (Akwadoro)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Charge](#charge)
5. [Ojiji na Ihe Nlereanya](#use-cases--examples)
6. [Ntinye](#installation)
7. [Ịtọlite e-akpa ego Zimppy](#setting-up-the-zimppy-wallet)
8. [Ijikọta Zimppy](#integrating-zimppy--typescript-sdk)
   - [Sava (Nke e chebere echebe)](#typescript-server--shielded)
   - [Sava (Oha)](#typescript-server--transparent)
   - [Klayentị](#typescript-client)
9. [Ijikọta Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Sava (Axum)](#rust-server-axum)
   - [Klayentị](#rust-client)
10. [Ntụaka CLI](#cli-reference)
11. [Njirimara Ndị Dị Mkpa](#key-features)
12. [Ọdịdị](#architecture)
13. [Ihe Nlereanya na Demos](#examples--demos)

---

## Gịnị bụ Zimppy.xyz?

**Zimppy.xyz** bụ akụrụngwa Kwụọ ụhwọ nke Nzuzo na-ebute ụzọ, e mere ya kpọmkwem maka ndị nnọchi AI na usoro ọrụ igwe-na-igwe (M2M) akpaghị aka. Ọ na-emejuputa **Machine Payment Protocol (MPP)** na-eji **Zcash** dịka ego ndabere ya, na-eme ka ọnọdụ ịkwụ ụgwọ nke e chebere echebe na nke Oha kwe omume.

N'adịghị ka usoro Kwụọ ụhgwọ blockchain ọdịnala, ebe Azụmahia ọ bụla na-ahụ ọha na on-chain, e wuru Zimppy gburugburu nhazi dabere na session nke na-ewepụ igbu oge kwa arịrịọ ma na-echekwa Nzuzo kriptografik. Nke a na-eme ka ọ dabara nke ọma maka ndị nnọchi AI chọrọ ịkwụ maka APIs, data, mgbako, ma ọ bụ ngwá ọrụ AI n'usoro mmemme, na-enweghị ikpughe metadata omume.

### Njirimara Ndị Bụ Isi

- **Tinye ego otu ugboro** on-chain (~75 sekọnd maka nkwenye Zcash)
- **Arịrịọ ozugbo na-enweghị oke** mgbe emepere session, enweghị mmekọrịta chain kwa arịrịọ
- **Ịkwụ ụgwọ nke e chebere echebe** na-ezobe onye zitere, onye nata, ego, na memo site na Zcash's protocol Orchard
- **Ịkwụ ụgwọ Oha** na-eji T-addresses kwa challenge iji gbochie replay na-enweghị Nzuzo zuru oke
- **Nke kwekọrọ na nkọwapụta**, challenges HMAC-SHA256, njehie RFC 9457, nchọpụta `/.well-known/payment`

---

## Gịnị Mere E Ji Achọ Ịkwụ Ụgwọ E Chebere Echebe Maka Ndị Nnọchi AI?

Maka ndị nnọchi AI na-ahụ maka usoro ọrụ dị nro, nchọpụta iwu, ajụjụ ahụike, nyocha ego, ọgụgụ isi asọmpi, **ịkwụ ụgwọ ọha ọ bụla bụ mpụta metadata**. Zimppy bụ naanị usoro Kwụọ ụhgwọ MPP nke bụ **nke onwe na ndabara**.

### Tebụl Ntụnyere Nzuzo

| Njirimara | Chains Ọha (USDC, ETH) | Zimppy Nke e chebere echebe | Zimppy Oha |
|---|---|---|---|
| **Onye zitere** | A na-ahụ ya | Ezobere ederede | A na-ahụ ya |
| **Onye nata** | A na-ahụ ya | Ezobere ederede | Kwa-challenge (Ihe na-apughi ijikọ ọnụ [unlinkable]) |
| **Ego** | A na-ahụ ya | Ezobere ederede | A na-ahụ ya |
| **Memo** | A na-ahụ ya | Ezobere ederede | N/A |
| **Nchedo Replay** | Enweghị | Njikọ memo | T-address kwa-challenge |
| **Ụkpụrụ Ojiji Ọrụ** | Enwere ike ijikọ | Nke onwe | Ihe na-apughi ijikọ ọnụ (addr ọhụrụ) |

### Nsogbu Igbu Oge, Sessions Edozila Ya

> *"Mana Zcash nwere oge block nke sekọnd 75."*

**Sessions na-edozi nke a.** Ichere on-chain na-eme **otu ugboro** kpọmkwem mgbe a na-etinye ego. Arịrịọ ọ bụla sochirinụ na-adị ozugbo.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Kwụọ otu ugboro, kpọọ ozugbo, nata ego mgbanwe azụ.** Igbu oge kwa arịrịọ bụ efu.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** bụ protocol ahaziri ahazi nke na-enyere ndị nnọchi sọftụwia kwụụrụ onwe ha (ndị nnọchi AI, bots, scripts) aka ịchọpụta, kparịta, ma mezuo ihe a chọrọ maka ịkwụ ụgwọ maka ịnweta API n'enweghị enyemaka mmadụ.

### Otu MPP Si Ejikọta na APIs

MPP na-agbaso usoro HTTP **402 Payment Required**:

1. **Onye nnọchi na-arịọ** akụrụngwa site na endpoint API akwụ ụgwọ.
2. **Sava na-aza** na `402 Payment Required` + challenge e debere aka (ego, onye nata, memo).
3. **Onye nnọchi na-akwụ** site na usoro Kwụọ ụhgwọ kwekọrọ (dịka ọmụmaatụ, Zcash nke e chebere echebe Zimppy).
4. **Onye nnọchi na-anwale ọzọ** arịrịọ ahụ na `Authorization: Payment {txid}`.
5. **Sava na-enyocha** Kwụọ ụhgwọ ahụ na kriptografik (nbupu IVK Orchard, nyocha ego + memo).
6. **Sava na-aza** na `200 OK` + header `Payment-Receipt`.

### Ikwekọ na Nkọwapụta

- Ịbịanye aka challenge **HMAC-SHA256**
- Nzaghachi njehie ahaziri ahazi **RFC 9457**
- Endpoint **`/.well-known/payment`** maka nchọpụta akpaghị aka nke usoro Kwụọ ụhgwọ
- **Orchard IVK** (Incoming Viewing Key) maka nkwenye Kwụọ ụhgwọ n'akụkụ sava na-ekpugheghị Igodo ego [spending key]

---

## Otu Zimppy Si Arụ Ọrụ

### Sessions (Akwadoro)

Sessions bụ ụkpụrụ mmekọrịta bụ isi. Onye nnọchi na-etinye nha ego on-chain otu ugboro, nata token bearer, ma jiri ya maka arịrịọ niile sochirinụ n'enweghị igbu oge.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Kasị mma maka:** Oku API na-adị ọtụtụ ugboro, inference LLM, arịrịọ data a na-eme ugboro ugboro.

---

### Streaming

Ọdịnaya a na-atụ kwa-token e zipụrụ site na **Server-Sent Events (SSE)**. Sava na-ewepụ ego site na nha ego session maka okwu ma ọ bụ token ọ bụla e zipụrụ.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Kasị mma maka:** Nzaghachi streaming LLM, feeds data ozugbo, ngwá ọrụ AI na-akwụ kwa-token.

---

### Charge

Otu Kwụọ ụhgwọ nke e chebere echebe kwa arịrịọ. A na-eme usoro HTTP 402 zuru oke kwa oku. Ọ dabara mgbe arịrịọ anaghị adịkarị ma ọ bụ bara nnukwu uru.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Kasị mma maka:** Arịrịọ otu-ugboro bara nnukwu uru, oku API anaghị adịkarị, endpoints data premium.

---

## Ojiji na Ihe Nlereanya

### 1. Onye Nnọchi AI

Onye nnọchi AI iwu na-ajụ database iwu ikpe akwụ ụgwọ. N'iji sessions Zimppy nke e chebere echebe, a naghị ahụ ma njirimara ụlọ ọrụ iwu ma ọ bụ ajụjụ ndị kpọmkwem on-chain - na-echekwa ihe nzuzo dị n'etiti ọkàiwu na onye ahịa n'ọkwa akụrụngwa.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Onye Nnọchi AI Maka Pipeline Ajụjụ Ahụike

Onye nnọchi nchọpụta ọrịa na-ajụ ọtụtụ databases ụlọọgwụ. Ịkwụ ụgwọ nke e chebere echebe na-eme ka enweghi ike ijikọ ụkpụrụ ajụjụ onye ọrịa n'etiti ndị na-eweta ọrụ.

### 3. Onye Nnọchi Nyocha Ego

Onye nnọchi azụmaahịa algorithmic na-akwụ maka APIs data ahịa ozugbo. Ịkwụ ụgwọ Oha na-eji T-addresses ọhụrụ kwa challenge, na-egbochi njikọta ụkpụrụ ojiji n'etiti ndị na-ere data.

### 4. Sava Ngwá Ọrụ MCP, Ngwá Ọrụ AI Akwụ Ụgwọ

Sava MCP (Model Context Protocol) na-ekpughe ngwá ọrụ AI akwụ ụgwọ. Ọkpụkpọ ngwá ọrụ ọ bụla na-ebute charge Zimppy, na-eme ka ebe ahịa nke ikike AI enwere ego kwe omume.

### 5. Onye Nchịkọta LLM, Kwụọ Kwa-Token

Ọrụ nchịkọta LLM na-ana ndị nnọchi ego kwa token mmepụta site na SSE streaming, na-enwe mwepụ nha ego akpaghị aka na nkwụghachi nke nha ego akwụgoro tupu oge ejighi.

---

## Ntinye

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

## Ịtọlite e-akpa ego Zimppy

CLI Zimppy na-enye interface e-akpa ego zuru oke. Iwu niile dị site na `npx zimppy`.

### Nzọụkwụ 1 : Mepụta e-akpa ego

```bash
npx zimppy wallet create
```

Ọ na-emepụta igodo kriptografik ma gosipụta **Mkpuru mgbake [seed phrase]** gị. Chekwaa nke a nke ọma - enweghị ike iweghachite ya ma ọ bụrụ na ọ furu efu.

### Nzọụkwụ 2 : Lelee Adreesị akpa ego na Nha Ego Gị

```bash
npx zimppy wallet whoami
```

Ọ na-egosipụta **Unified Address (UA)** gị, **T-address**, nha ego ugbu a, na netwọk na-arụ ọrụ.

```bash
npx zimppy wallet balance --all
```

Ọ na-egosi nkewa nha ego kwa-account n'ofe accounts ZIP-32 niile.

### Nzọụkwụ 3 : Tinye Ego n'e-akpa ego Gị

Ziga ZEC na Unified Address gị site na e-akpa ego ma ọ bụ exchange [exchange] ọ bụla dakọtara na Zcash. Ego etinyere nke e chebere echebe na-aga ozugbo na account Orchard gị.

### Nzọụkwụ 4 : Ziga ma Chebe Ego

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

### Nzọụkwụ 5 : Mee Arịrịọ Nkwụ-Otu-Aka

```bash
npx zimppy request <url>
```

Ọ na-ahụ maka usoro 402 -> kwụọ -> nwalee ọzọ zuru oke n'onwe ya. A na-emeghe ma na-ejikwa sessions n'ụzọ Oha.

---

## Ijikọta Zimppy - TypeScript SDK

### Sava TypeScript - Nke e chebere echebe

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

**Isi ihe:**
- `zcash({ wallet: 'server' })` na-ebunye e-akpa ego nke e chebere echebe nke sava
- `mppx.charge()` na-ahụ maka ndụ challenge/nyocha 402 zuru oke
- `result.withReceipt()` na-agbakwunye nnata Kwụọ ụhgwọ kriptografik na nzaghachi

---

### Sava TypeScript - Oha

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Challenge ọ bụla na-emepụta **T-address ọhụrụ**, na-eme ka arịrịọ Kwụọ ụhgwọ ghara ijikọta n'etiti sessions.

---

### Klayentị TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Klayentị ahụ na-egbochi nzaghachi `402`, mepee session n'onwe ya, ma nwalee arịrịọ ahụ ọzọ - koodu na-akpọ ya anaghị achọ mgbagha Kwụọ ụhgwọ pụrụ iche.

---

## Ijikọta Zimppy - Rust SDK

### Sava Rust (Axum)

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

**Isi ihe:**
- `MppCharge<Price>` bụ Axum extractor nke na-enyocha Kwụọ ụhgwọ tupu handler arụ ọrụ
- `WithReceipt` na-ekpuchi nzaghachi ahụ na nnata Kwụọ ụhgwọ kriptografik
- `ChargeConfig` na-akọwa mgbagha ọnụahịa - ọ nwere ike ịdị mgbanwe dabere na parampatọ arịrịọ

---

### Klayentị Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` na-agbatị klayentị HTTP ọ bụla site na njikwa 402 akpaghị aka, njikwa session, na mmezu Kwụọ ụhgwọ Zcash.

---

## Ntụaka CLI

| Iwu | Nkọwa |
|---|---|
| `npx zimppy wallet create` | Mepụta igodo ma gosipụta Mkpuru mgbake |
| `npx zimppy wallet whoami` | Gosi Adreesị akpa ego (UA + T-addr), nha ego, netwọk |
| `npx zimppy wallet balance --all` | Nkewa nha ego kwa-account |
| `npx zimppy wallet send <addr> <zat>` | Ziga ZEC nke e chebere echebe ma ọ bụ Oha |
| `npx zimppy wallet transfer <from> <to> <zat>` | Mbufe ime n'etiti accounts |
| `npx zimppy wallet shield` | Bugharịa ego Oha gaa Orchard (nke e chebere echebe) |
| `npx zimppy wallet use <name>` | Gbanwee njirimara e-akpa ego na-arụ ọrụ |
| `npx zimppy request <url>` | Arịrịọ kwụọ 402 -> kwụọ -> nwalee ọzọ n'onwe ya |

---

## Njirimara Ndị Dị Mkpa

### e-akpa ego Ndị E Mere Maka Ndị Nnọchi

A haziri e-akpa ego Zimppy maka ojiji mmemme nke ndị nnọchi AI - ọ bụghị extensions nchọgharị nke mmadụ na-achịkwa. A na-ejikwa igodo site na CLI ma ọ bụ SDKs, enwere ike ịtụgharị accounts site na derivation account **ZIP-32**, e-akpa ego ahụ na-akwado usoro Kwụọ ụhgwọ akpaghị aka kpamkpam na-enweghị nkwado mmadụ kwa Azụmahia.

### Nkwado Ọtụtụ Ndị Nnọchi

Ọtụtụ ndị nnọchi nwere ike isi n'otu e-akpa ego rụọ ọrụ na-eji ntụgharị account **ZIP-32** - onye nnọchi ọ bụla na-enweta account nke ya nke nwere nleba nha ego kewapụrụ, ikike mbufe n'etiti accounts, na mkpesa nha ego kwa-account. Nke a na-eme ka njikwa nnukwu ìgwè nke ọtụtụ ndị nnọchi site n'otu akụrụngwa e-akpa ego kwe omume.

### Azụmahia Zcash Nke e chebere echebe Kpamkpam (Orchard)

Ịkwụ ụgwọ nke e chebere echebe na-eji protocol **Orchard** nke Zcash, pool nke e chebere echebe nke NU5 webatara. Sava na-enyocha ịkwụ ụgwọ site na **Incoming Viewing Key (IVK)**, nke nwere ike ịkọwa note enwetara na-ekpugheghị Igodo ego. A na-egbochi mwakpo replay site na **njikọ memo** - challenge ọ bụla na-etinye memo `zimppy:{challenge_id}` pụrụ iche nke a na-enyocha na kriptografik.

### Sessions , Enweghị Igbu Oge Kwa-Arịrịọ

Nhazi session na-ekewa ichere nkwenye on-chain na igbu oge kwa arịrịọ. Mgbe otu ntinye ego (~75 sekọnd), arịrịọ bearer-token niile sochirinụ na-enweta ọrụ ozugbo na-enweghị mmekọrịta blockchain ruo mgbe session mechiri.

### Streaming , Kwụọ Kwa-Token

Nkwado **SSE (Server-Sent Events)** nke ala na-enyere ọdịnaya a na-atụ kwa-token aka. Ọ dị mma maka APIs inference LLM ebe ogologo mmepụta na-agbanwe agbanwe na ịgba ụgwọ kwesịrị igosipụta ojiji n'ezie.

### Ikwekọ na Nkọwapụta

- Challenges e ji **HMAC-SHA256** bịanye aka na-egbochi aghụghọ
- Usoro njehie ahaziri ahazi **RFC 9457** maka njikwa njehie kwekọrọ n'etiti usoro
- **`/.well-known/payment`** maka nchọpụta akpaghị aka nke usoro Kwụọ ụhgwọ site n'aka onye nnọchi ọ bụla kwekọrọ na MPP

---

## Ọdịdị

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

### Ọrụ Akụkụ Dị Iche Iche

**`zimppy-core`** - Isi kriptografik. Ọ na-ahụ maka nbupu note Orchard site na IVK sava, ịtụgharị memo, mgbagha nchedo replay, na nkwenye challenge. Edere ya na Rust maka arụmọrụ na izi ezi.

**`zimppy-wallet`** - e-akpa ego Zcash nke ala nke `zingolib` na-enye ike. Ọ na-ejikwa igodo, accounts, nha ego nke e chebere echebe/Oha, na ntinye Azụmahia.

**`zimppy-rs`** - SDK Rust. Ọ na-enye traits `ChargeMethod`, `SessionMethod`, na `PaymentProvider`, tinyere Axum extractors (`MppCharge`, `WithReceipt`) maka ijikọta sava n'ụzọ dị mfe.

**`zimppy-napi`** - NAPI-RS bindings nke na-ekpughe isi Rust na Node.js, na-eme ka SDK TypeScript jiri otu igwe kriptografik ahụ na-emejuputaghị primitives Zcash na JavaScript ọzọ.

**`zimppy-ts`** - SDK TypeScript. Ọ na-ekpuchi NAPI bindings site na APIs async/await dabara n'asụsụ maka charge, session, na usoro SSE streaming.

**`zimppy-cli`** - e-akpa ego command-line na ngwá ọrụ arịrịọ. Ọ na-akwado auto-pay (402 -> kwụọ -> nwalee ọzọ), njikwa session, na ọrụ e-akpa ego niile.

---

## Ihe Nlereanya na Demos

| Ihe Nlereanya | Nkọwa |
|---|---|
| `examples/fortune-teller/` | Charge, session, na streaming demos - sava Rust + klayentị |
| `examples/llm-summarizer/` | Demo streaming LLM na-akwụ kwa-token |
| `examples/mcp-server/` | Sava ngwá ọrụ MCP nwere ngwá ọrụ AI akwụ ụgwọ |
| `examples/ts-server/` | Mmejuputa ntụaka sava MPP TypeScript |

---

## Ihe Agụnyere - Nchịkọta Njirimara

| Njirimara | Nkọwa |
|---|---|
| **Sessions** | Tinye ego otu ugboro, arịrịọ bearer ozugbo, nkwụghachi mgbe emechiri |
| **Streaming** | Ọdịnaya a na-atụ kwa-token n'elu SSE |
| **Charge** | Kwụọ ụhgwọ nke e chebere echebe ma ọ bụ Oha kwa arịrịọ HTTP (usoro 402) |
| **Ịkwụ Ụgwọ Oha** | T-addresses nwere nchedo replay kwa-challenge + iwu shield |
| **Ọtụtụ-Account** | Ntughari account ZIP-32, mbufe n'etiti accounts, nha ego kwa-account |
| **e-akpa ego CLI** | Ziga, chebe, bufee, balance --all, whoami, auto-pay |
| **SDK Abụọ** | TypeScript na Rust |
| **Nke Kwekọrọ na Nkọwapụta** | Challenges HMAC-SHA256, njehie RFC 9457, nchọpụta `/.well-known/payment` |

---

*Iji nweta ozi ndị ọzọ, gaa na [zimppy.xyz](https://zimppy.xyz)*

---

## Peeji Ndị Metụtara

- [e-akpa ego](/using-zcash/wallets) — Zcash e-akpa ego na-akwado Azụmahia nke e chebere echebe
- [Pools Nke e chebere echebe](/using-zcash/shielded-pools) — Otu Azụmahia nke e chebere echebe Orchard si echekwa data Kwụọ ụhgwọ
- [Ndị Na-ahazi Ịkwụ Ụgwọ](/using-zcash/payment-processors) — Ụzọ ndị ọzọ isi anabata ịkwụ ụgwọ Zcash
- [Zcash Akụ Nke e chebere echebe](/zcash-tech/zcash-shielded-assets) — ZSAs na ọdịnihu programmability Zcash
- [Ọrụ Obodo](/zcash-community/community-projects) — Ọtụtụ ọrụ gburugburu ebe obibi Zcash
