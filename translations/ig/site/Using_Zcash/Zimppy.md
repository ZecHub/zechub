<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** bụ akụrụngwa ịkwụ ụgwọ nzuzo nke mbụ maka ndị ọrụ AI na-eji Zcash's Machine Payment Protocol (MPP)
- **Nyefee ego otu ugboro** n'ime agbụ ígwè (~ sekọnd 75), wee mee **arịrịọ ozugbo na-akparaghị ókè** na-enweghị mmekọrịta blockchain ọ bụla
- Na-akwado ịkwụ ụgwọ Zcash (Orchard)** nke echekwara nke ọma — onye zitere ya, onye nnata ya, ego ole na ole, na ihe ndetu niile ezochiri ezochi
- Na-arụ ọrụ na **TypeScript na Rust SDKs** maka njikọta dị mfe na pipelines AI na sava API
- Zuru oke maka **LLM APIs, ahịa data, sava ngwaọrụ MCP**, na ikpe ojiji ịkwụ ụgwọ M2M ọ bụla

---

> **Zimppy** bụ ụzọ ịkwụ ụgwọ nke Usoro Ịkwụ Ụgwọ Igwe (MPP) maka Zcash nke na-akwado ma ịkwụ ụgwọ echekwara ma nke doro anya. Tinye ego ozugbo ị banyere na agbụ ígwè, wee mee arịrịọ ndị na-ebuga ngwa ngwa na-enweghị njedebe na-enweghị mmekọrịta agbụ ígwè ọ bụla.

---

## Tebulu ọdịnaya

1. [Gịnị bụ Zimpy.xyz?](#what-is-zimppyxyz)
2. [Gịnị kpatara e ji akwụ ụgwọ nchekwa maka ndị nnọchi anya AI?](#why-shielded-payments-for-ai-agents)
3. [Usoro Ịkwụ Ụgwọ Igwe (MPP)](#machine-payment-protocol-mpp)
4. [Otu Zippy si arụ ọrụ](#how-zimppy-works)
   - [Oge (Akwadoro)](#sessions-recommended)
   - [Ịgbagharị](#streaming)
   - [Ụgwọ](#charge)
5. [Ojiji na ihe atụ](#use-cases--examples)
6. [Nwụnye](#installation)
7. [Ịtọlite obere akpa Zippy](#setting-up-the-zimppy-wallet)
8. [Ịtinye Zimpy](#integrating-zimppy--typescript-sdk)
   - [Sava (Echebere)](#typescript-server--shielded)
   - [Sava (Ihe na-egosi ihe)](#typescript-server--transparent)
   - [Onye ahịa](#typescript-client)
9. [Ịtinye Zimpy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Sava (Axum)](#rust-server-axum)
   - [Onye ahịa](#rust-client)
10. [Ntụaka CLI](#cli-reference)
11. [Isi Atụmatụ](#key-features)
12. [Nhazi ụlọ](#architecture)
13. [Ihe atụ na ngosipụta](#examples--demos)

---

## Gịnị bụ Zimpy.xyz?

**Zimppy.xyz** bụ akụrụngwa ịkwụ ụgwọ nzuzo nke e mere kpọmkwem maka ndị nnọchi anya AI na usoro ọrụ igwe-na-igwe (M2M) akpaaka. Ọ na-etinye Usoro Ịkwụ Ụgwọ Ngwa Ngwa (MPP)** n'ọrụ site na iji **Zcash** dị ka ego ya dị n'okpuru, na-eme ka ụzọ ịkwụ ụgwọ echekwara (nkeonwe zuru oke) na nke doro anya dị mfe.

N'adịghị ka usoro ịkwụ ụgwọ blockchain ọdịnala, ebe azụmahịa ọ bụla na-apụta ìhè n'ihu ọha na usoro, a na-ahazi Zimppy gburugburu usoro nhazi nke na-ewepụ oge nkwụsịtụ kwa arịrịọ ebe ọ na-echekwa nzuzo nzuzo. Nke a na-eme ka ọ dabara nke ọma maka ndị nnọchi anya AI nke chọrọ ịkwụ ụgwọ maka ngwa API, data, kọmputa, ma ọ bụ ngwaọrụ AI n'usoro mmemme, na-enweghị metadata omume na-apụta ìhè.

### Njirimara Isi

- **Nye ego otu ugboro** n'usoro (~ sekọnd 75 maka nkwenye Zcash)
- **Arịrịọ ozugbo na-akparaghị ókè** mgbe emepechara nnọkọ, enweghị mmekọrịta n'etiti arịrịọ ọ bụla
- **Ịkwụ ụgwọ echekwara** Onye zitere, onye nnata, ego, na ihe ndetu zoro ezo site na iji usoro Zcash's Orchard
- **Ịkwụ ụgwọ doro anya** jiri adreesị T maka ihe ịma aka ọ bụla iji gbochie mmegharị ọzọ na-enweghị nzuzo zuru oke
- **Nkwenye zuru oke**, ihe ịma aka HMAC-SHA256, njehie RFC 9457, `/.well-known/payment` nchọpụta

---

## Gịnị kpatara e ji akwụ ụgwọ nchekwa maka ndị nnọchi anya AI?

Maka ndị ọrụ AI na-ahụ maka usoro ọrụ dị nro, nyocha iwu, ajụjụ ahụike, nyocha ego, ọgụgụ isi asọmpi maka **ụgwọ ọha ọ bụla bụ ntapu metadata**. Zimpy bụ naanị ụzọ ịkwụ ụgwọ MPP nke bụ **onwe na ndabara**.

### Tebụl Ntụnyere Nzuzo

| Akụ na ụba | Ụlọọrụ Ọha (USDC, ETH) | Zimpy echebere | Zippy Transparent |
|---|---|---|---|
| **Onye zitere** | A na-ahụ anya | Ezoro ezo | A na-ahụ anya |
| **Onye nnata** | A na-ahụ anya | Ezoro ezo | Kwa ihe ịma aka (enweghị njikọ) |
| **Ego** | A na-ahụ anya | Ezoro ezo | A na-ahụ anya |
| **Ndetu** | A na-ahụ anya | Ezoro ezo | N/A |
| **Nchedo ọzọ** | Ọ dịghị | Njikọ Memo | Adreesị T nke onye ọ bụla nwere nsogbu |
| **Ụkpụrụ Ojiji Ọrụ** | Njikọ nwere ike | Nkeonwe | Enweghị ike ijikọ (addr ọhụrụ) |

### Nsogbu Latency, nke Sessions Doziri

> *"Mana Zcash nwere oge mkpọchi sekọnd 75."*

**Nnọkọ na-edozi nke a.** Nchere n'usoro na-eme kpọmkwem **otu ugboro** mgbe egosiri ya. Arịrịọ ọ bụla na-esote na-abịa ozugbo.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Kwụọ ụgwọ otu ugboro, kpọọ oku ozugbo, weghachite mgbanwe ahụ.** Oge nkwụsị nke arịrịọ ọ bụla bụ efu.

---

## Usoro Ịkwụ Ụgwọ Igwe (MPP)

Usoro Ịkwụ Ụgwọ Ngwaọrụ **(MPP)** bụ usoro a na-ahazi nke na-enye ndị ọrụ ngwanrọ onwe ha (ndị nnọchi anya AI, bot, scripts) ohere ịchọpụta, kparịta ụka, ma mezuo ihe achọrọ maka ịnweta API na-enweghị enyemaka mmadụ.

### Otu MPP si ejikọta ya na API

MPP na-agbaso usoro HTTP **402 Ịkwụ Ụgwọ Achọrọ**:

1. **Onye nnọchi anya na-arịọ** ihe enyemaka sitere na njedebe API akwụ ụgwọ.
2. **Sava na-aza** na `402 Payment Required` + ihe ịma aka edebanyere aha (ego, onye nnata, ndetu).
3. **Onye nnọchi anya na-akwụ ụgwọ** site na iji ụzọ ịkwụ ụgwọ dakọtara (dịka ọmụmaatụ, Zcash).
4. **Onye nnọchi anya na-anwale ọzọ** arịrịọ ahụ na `Authorization: Payment {txid}`.
5. **Sava na-enyocha** ịkwụ ụgwọ ahụ n'ụzọ nzuzo (Orchard IVK, ego + nlele memo).
6. **Sava na-aza** na `200 OK` + a `Payment-Receipt` isi okwu.

### Nrubeisi Pụrụ Iche

- **Mbinye aka na ihe ịma aka nke HMAC-SHA256**
- **RFC 9457** Nzaghachi njehie ahaziri ahazi
- **`/.well-known/payment`** njedebe maka nchọpụta usoro ịkwụ ụgwọ akpaka
- **Orchard IVK** (Incoming Viewing Key) maka nkwenye ịkwụ ụgwọ n'akụkụ sava na-ekpugheghị igodo mmefu

---

## Otu Zippy si arụ ọrụ

### Oge (Akwadoro)

Oge bụ usoro mmekọrịta bụ isi. Onye nnọchi anya ahụ na-etinye nguzozi n'elu agbụ otu ugboro, na-anata ihe nrịbama onye na-ebu ibu, ma jiri ya mee ihe maka arịrịọ niile na-esote na enweghị oge.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Kachasị mma maka:** Oku API ugboro ugboro, nyocha LLM, ajụjụ data ugboro ugboro.

---

### Ịgbagharị

Ọdịnaya a na-akwụ ụgwọ kwa akara ngosi nke e zigara n'elu **Ihe omume ndị e zigara sava (SSE)**. Ihe nkesa ahụ na-ewepụ nguzozi nnọkọ kwa okwu ma ọ bụ akara ngosi e tinyere na mgbasa ozi.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Kachasị mma maka:** Nzaghachi nkwanye ugwu LLM, nri data n'oge, ngwaọrụ AI ịkwụ ụgwọ kwa akara.

---

### Ụgwọ

Otu ụgwọ a na-echebe otu arịrịọ. A na-eme usoro HTTP 402 zuru oke kwa oku. Ọ dabara adaba mgbe arịrịọ anaghị adịte aka ma ọ bụ dị oke ọnụ ahịa.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Kachasị mma maka:** Arịrịọ dị oke ọnụ ahịa otu ugboro, oku API na-adịghị adịkarị, njedebe data dị elu.

---

## Ojiji na ihe atụ

### 1. Onye nnọchi anya AI

Onye ọrụ iwu na-enyocha nchekwa data ikpe-iwu akwụ ụgwọ. Site na iji nnọkọ Zimpy echebe, njirimara ụlọ ọrụ iwu ma ọ bụ ajụjụ ndị a kapịrị ọnụ adịghị apụta ìhè n'usoro - na-echebe ikike onye ọka iwu na onye ahịa n'ọkwa akụrụngwa.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Onye nnọchi anya AI maka Pipeline Ajụjụ Ahụike

Onye na-ahụ maka nchọpụta ọrịa na-ajụ ajụjụ gbasara ọtụtụ ebe nchekwa data ahụike. Ụgwọ ndị a na-echekwa echekwa na-eme ka usoro ajụjụ onye ọrịa ghara ịdị n'etiti ndị na-enye ọrụ.

### 3. Onye Ọrụ Nyocha Ego

Onye na-ere ahịa algọridim na-akwụ ụgwọ maka API data ahịa n'oge. Ịkwụ ụgwọ doro anya na-eji adreesị T ọhụrụ maka nsogbu ọ bụla, na-egbochi njikọ ụkpụrụ ojiji n'etiti ndị na-ere data.

### 4. Ihe nkesa Ngwaọrụ MCP, Ngwaọrụ AI Akwụ ụgwọ

Ihe nkesa MCP (Model Context Protocol) na-ekpughe ngwaọrụ AI akwụ ụgwọ. Ngwa ọrụ ọ bụla na-akpalite ụgwọ Zimpy, na-eme ka ahịa nwee ike AI ego.

### 5. Nchịkọta LLM, Ụgwọ-Kwa-Token

Ọrụ nchịkọta LLM na-ana ndị nnọchi anya ụgwọ maka ihe ngosi mmepụta ọ bụla site na nkwanye SSE, yana mwepụ nguzozi akpaka na nkwụghachi nke nguzozi akwụgoro ejibeghị.

---

## Nwụnye

### Node.js / ỤdịAkwụkwọ

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Nchara

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Ịtọlite obere akpa Zippy

Zimpy CLI na-enye njikọ akpa ego zuru oke. Iwu niile dị site na `npx zimppy`.

### Nzọụkwụ nke 1: Mepụta obere akpa

```bash
npx zimppy wallet create
```

Na-emepụta igodo nzuzo ma na-egosi mkpụrụ okwu **mkpụrụ** gị. Debe nke a n'enweghị nsogbu - agaghị enweta ya ma ọ bụrụ na o furu efu.

### Nzọụkwụ nke Abụọ: Lelee Adreesị na Nguzozi Gị

```bash
npx zimppy wallet whoami
```

Na-egosi **Unified Address (UA)**, **Adreesị T**, nguzozi ugbu a, na netwọk na-arụ ọrụ.

```bash
npx zimppy wallet balance --all
```

Na-egosi nhazi ego nke akaụntụ ọ bụla n'ime akaụntụ ZIP-32 niile.

### Nzọụkwụ nke 3: Tinye ego na obere akpa gị

Ziga ZEC na Unified Address gị site na obere akpa ma ọ bụ mgbanwe ọ bụla Zcash-compatible. Ego echekwara na-aga ozugbo na akaụntụ Orchard gị.

### Nzọụkwụ nke 4: Zipu ma chekwaa ego

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

### Nzọụkwụ nke 5: Mee Arịrịọ Ịkwụ Ụgwọ Akpaaka

```bash
npx zimppy request <url>
```

Na-ejikwa usoro 402 zuru oke na akpaghị aka -> ịkwụ ụgwọ -> nwaa ọzọ. A na-emepe ma jikwaa nnọkọ ahụ nke ọma.

---

## Ịjikọta Zimpy - TypeScript SDK

### Sava Ụdị-Akwụkwọ - Ekpuchiri

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

**Isi ihe dị mkpa:**
- `zcash({ wallet: 'server' })` na-ebu obere akpa nchekwa nke sava ahụ
- `mppx.charge()` na-ejikwa usoro ndụ zuru oke nke ihe ịma aka 402/nyochaa
- `result.withReceipt()` na-ejikọ nnata ịkwụ ụgwọ cryptographic na nzaghachi ahụ

---

### Sava TypeScript - Transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Ihe ịma aka ọ bụla na-emepụta **adreesị T ọhụrụ**, na-eme ka arịrịọ ịkwụ ụgwọ ghara ijikọ n'oge nnọkọ niile.

---

### Onye Ahịa TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Onye ahịa ahụ na-ejide `402` nzaghachi, mepee nnọkọ na akpaghị aka, ma nwaa ọzọ arịrịọ ahụ - koodu oku ahụ achọghị usoro ịkwụ ụgwọ kpọmkwem.

---

## Ịtinye Zimpy - Rust SDK

### Ihe nkesa nchara (Axum)

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

**Isi ihe dị mkpa:**
- `MppCharge<Price>` bụ ihe na-ewepụta ihe na Axum nke na-enyocha ụgwọ tupu onye njikwa ahụ agbaa ọsọ
- `WithReceipt` jiri akwụkwọ nnata ịkwụ ụgwọ nzuzo kechie azịza ya
- `ChargeConfig` na-akọwa usoro ọnụahịa - ọ nwere ike ịdị ike dabere na paramita arịrịọ

---

### Onye ahịa nchara

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` na-agbatị onye ahịa HTTP ọ bụla na njikwa 402 akpaka, njikwa nnọkọ, na mmezu ụgwọ Zcash.

---

## Ntụaka CLI

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

## Isi Atụmatụ

### Obere akpa ndị nnọchi anya-ndị obodo

E mere obere akpa Zimpy maka iji mmemme site n'aka ndị ọrụ AI - ọ bụghị ndọtị ihe nchọgharị nke mmadụ ji achịkwa. A na-ejikwa igodo site na CLI ma ọ bụ SDKs, enwere ike ịtụgharị akaụntụ site na **ZIP-32 derivation**, obere akpa ahụ na-akwado usoro ịkwụ ụgwọ akpaaka zuru oke na-enweghị nkwenye mmadụ kwa azụmahịa.

### Nkwado Ndị Nnọchiteanya Ọtụtụ

Ọtụtụ ndị nnọchi anya nwere ike ịrụ ọrụ site n'otu obere akpa ego site na iji **ZIP-32 mgbanwe akaụntụ** - onye nnọchi anya ọ bụla na-enweta akaụntụ nke ya site na inyocha nguzozi dị iche iche, ikike mbufe akaụntụ, na akụkọ nguzozi akaụntụ ọ bụla. Nke a na-enye ohere ijikwa ọtụtụ ndị nnọchi anya site na otu akụrụngwa obere akpa.

### Azụmahịa Zcash Ekpuchiri nke Ọma (Orchard)

Ịkwụ ụgwọ nchekwa na-eji usoro **Orchard** Zcash's, ọdọ mmiri nchekwa nke NU5. Sava ahụ na-enyocha ịkwụ ụgwọ site na iji **Incoming Viewing Key (IVK)**, nke nwere ike ikpughe ndetu enwetara na-ekpugheghị igodo mmefu. A na-egbochi mwakpo ọzọ site na **njikọ memo** - ihe ịma aka ọ bụla nwere otu pụrụ iche `zimppy:{challenge_id}` ihe edeturu nke e gosipụtara n'ụzọ nzuzo.

### Oge Nnọkọ, Enweghị Oge Nkwụsị Kwa Arịrịọ

Usoro nhazi nke nnọkọ ahụ na-eme ka nchere nkwenye dị n'usoro ghara ịdị irè site na oge ọ bụla a rịọrọ. Mgbe otu ego gwụchara (~ sekọnd 75), a na-enye arịrịọ niile na-ebuga ihe akaebe ozugbo na-enweghị mmekọrịta blockchain ruo mgbe nnọkọ ahụ ga-emechi.

### Ngụgharị, Ụgwọ-Kwa-Token

Nkwado nke Native **SSE (Ihe Omume E zigara na Sava)** na-enye ohere ka ọdịnaya a na-akwụ ụgwọ kwa akara nha. Ọ dị mma maka API nnwale LLM ebe ogologo mmepụta na-agbanwe agbanwe na ụgwọ ọrụ kwesịrị igosipụta oriri n'ezie.

### Nrubeisi Pụrụ Iche

- **HMAC-SHA256** Ihe ịma aka ndị a bịanyere aka na ha na-egbochi adịgboroja
- **RFC 9457** Usoro njehie ahaziri maka njikwa njehie na-arụkọ ọrụ
- **`/.well-known/payment`** maka nchọpụta usoro ịkwụ ụgwọ akpaka site n'aka onye nnọchi anya ọ bụla na-agbaso iwu MPP

---

## Nhazi ụlọ

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

### Ọrụ Akụkụ

**`zimppy-core`** - Isi ihe dị na nzuzo. Na-ejikwa nkọwapụta ihe ndetu Orchard site na iji IVK nke sava, nyocha memo, usoro nchekwa replay, na nkwenye ihe ịma aka. E dere ya na Rust maka arụmọrụ na izi ezi.

**`zimppy-wallet`** - Akpa Zcash nke obodo nke na-arụ ọrụ site na `zingolib`Na-ejikwa igodo, akaụntụ, nguzozi echekwara/edoghị anya, yana nnyefe azụmahịa.

**`zimppy-rs`** - Rust SDK. Na-enye `ChargeMethod`, `SessionMethod`, na `PaymentProvider` àgwà, gbakwunyere Axum extractors (`MppCharge`, `WithReceipt`) maka njikọta sava ergonomic.

**`zimppy-napi`** - njikọ NAPI-RS nke na-ekpughe isi Rust na Node.js, na-eme ka TypeScript SDK nwee ike iji otu injin cryptographic ahụ na-enweghị itinyeghachi ihe mbụ Zcash na JavaScript.

**`zimppy-ts`** - TypeScript SDK. Na-eji API async/echere kechie njikọ NAPI maka chajị, nnọkọ, na usoro mgbasa ozi SSE.

**`zimppy-cli`** - Ngwa obere akpa iwu na ngwa arịrịọ. Na-akwado ịkwụ ụgwọ akpaaka (402 -> ịkwụ ụgwọ -> nwaa ọzọ), njikwa nnọkọ, na ọrụ obere akpa niile.

---

## Ihe atụ na ngosipụta

| Ihe atụ | Nkọwa |
|---|---|
| `examples/fortune-teller/` | Ngosipụta ụgwọ, nnọkọ, na nkwanye ugwu - Sava Rust + onye ahịa |
| `examples/llm-summarizer/` | Ngosipụta nkwanye ugwu LLM nke na-akwụ ụgwọ kwa akara ngosi |
| `examples/mcp-server/` | Ihe nkesa ngwaọrụ MCP nwere ngwaọrụ AI akwụ ụgwọ |
| `examples/ts-server/` | Mmejuputa ntụaka ihe nkesa TypeScript MPP |

---

## Ihe dị n'ime ya - Nchịkọta Atụmatụ

| atụmatụ | Nkọwa |
|---|---|
| **Oge Nzukọ** | Itinye ego otu ugboro, arịrịọ onye na-ebuga ngwa ngwa, nkwụghachi mgbe emechara |
| **Na-agagharị** | Ọdịnaya a na-akwụ ụgwọ kwa akara n'elu SSE |
| **Chaji** | Ịkwụ ụgwọ echekwara ma ọ bụ nke doro anya dịka arịrịọ HTTP si dị (usoro 402) |
| **Ịkwụ Ụgwọ doro anya** | Adreesị T nwere mgbochi replay kwa-ihe ịma aka + iwu nchekwa |
| **Akaụntụ dị iche iche** | Mgbanwe akaụntụ ZIP-32, nnyefe akaụntụ n'ofe, nguzozi akaụntụ kwa akaụntụ |
| **Akpa CLI** | Zipu, chebe, nyefe, nguzozi ---niile, whoami, ịkwụ ụgwọ akpaaka |
| **SDK abụọ** | Ụdị edemede na nchara |
| **Dabere na Nkọwapụta** | Ihe ịma aka HMAC-SHA256, njehie RFC 9457, `/.well-known/payment` nchọpụta |

---

*Maka ozi ndị ọzọ, gaa na [zimpy.xyz](https://zimppy.xyz)*

---

## Peeji ndị metụtara ya

- [Obere akpa](/using-zcash/wallets) — Akpa Zcash nke na-akwado azụmahịa echekwara
- [Ọdọ Mmiri E Kpuchiri Ekpuchi](/using-zcash/shielded-pools) — Otu Orchard si echebe azụmahịa site n'ichebe data ịkwụ ụgwọ
- [Ndị Nhazi Ịkwụ Ụgwọ](/using-zcash/payment-processors) — Ụzọ ndị ọzọ isi nabata ịkwụ ụgwọ Zcash
- [Akụ Zcash Chebere](/zcash-tech/zcash-shielded-assets) — ZSAs na ọdịnihu nke mmemme Zcash
- [Ọrụ Obodo](/zcash-community/community-projects) — Ọrụ gburugburu ebe obibi Zcash ndị ọzọ
