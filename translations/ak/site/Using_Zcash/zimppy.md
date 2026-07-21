<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz na ɔkyerɛwee

## TL;DR

- **Zimppy** yɛ kokoamsɛm-di kan tua nhyehyɛe ma AI adwumayɛfo a wɔde Zcash Machine Payment Protocol (MPP) di dwuma .
- **Deposit pɛnkoro** on-chain (~75 seconds), afei yɛ **a anohyeto nni mu ntɛm ara abisade** a adesrɛ biara blockchain nkitahodi biara nni mu
- Ɛboa **Zcash (Orchard)** sikatua a wɔabɔ ho ban koraa — nea ɔde kɔmaa, nea ogye, sika, ne memo nyinaa yɛ encrypted
- Ɛne **TypeScript ne Rust SDKs** yɛ adwuma ma ɛyɛ mmerɛw sɛ wɔde bɛka AI pipelines ne API servers ho
- Ɛyɛ pɛpɛɛpɛ ma **LLM APIs, data gua so, MCP adwinnade servers**, ne M2M sikatua dwumadie asɛm biara

---

> **Zimppy** yɛ Machine Payment Protocol (MPP) sikatua kwan ma Zcash a ɛboa sikatua a wɔabɔ ho ban ne nea ɛda adi pefee nyinaa. Fa sika to hɔ pɛnkoro wɔ nkɔnsɔnkɔnsɔn so, afei yɛ adesrɛ a anohyeto nni mu ntɛm ara bearer a enni adesrɛ biara nkɔnsɔnkɔnsɔn nkitahodi.

---

## Nsɛm a Wɔahyehyɛ

1. [Dɛn ne Zimppy.xyz?](#what-is-zimppyxyz)
2. [Dɛn nti na Sikatua a Wɔabɔ ho Ban Ma AI Agents?](#why-shielded-payments-for-ai-agents)
3. [Mfiri a Wɔde Tua Ka Ho Nhyehyɛe (MPP) .](#machine-payment-protocol-mpp)
4. [Sɛnea Zimppy Yɛ Adwuma](#how-zimppy-works)
   - [Nhyiam ahorow (Wɔkamfo kyerɛ) .](#sessions-recommended)
   - [Streaming a ɛrekɔ so](#streaming)
   - [Kwaadu](#charge)
5. [Fa Nsɛm & Nhwɛsode Di Dwuma](#use-cases--examples)
6. [Nsɛm a wɔde hyɛ mu](#installation)
7. [Wɔresiesie Zimppy Sikakorabea no](#setting-up-the-zimppy-wallet)
8. [Wɔreka Zimppy abom](#integrating-zimppy--typescript-sdk)
   - [Server (Wɔabɔ ho ban) .](#typescript-server--shielded)
   - [Server (Ɛyɛ nea ɛda adi pefee) .](#typescript-server--transparent)
   - [Dwumadiwura](#typescript-client)
9. [Wɔreka Zimppy - Rust SDK abom](#integrating-zimppy--rust-sdk)
   - [Server (Axum) .](#rust-server-axum)
   - [Dwumadiwura](#rust-client)
10. [CLI Nhwehwɛmu](#cli-reference)
11. [Nneɛma Titiriw](#key-features)
12. [Dan nhyehyɛeɛ](#architecture)
13. [Nhwɛso & Demos](#examples--demos)

---

## Dɛn ne Zimppy.xyz?

**Zimppy.xyz** yɛ kokoamsɛm-di kan tua nhyehyɛe a wɔayɛ ama AI adwumayɛfo ne mfiri-kɔ-mfiri (M2M) adwumayɛ nhyehyɛe titiriw. Ɛde **Machine Payment Protocol (MPP)** no di dwuma de **Zcash** di dwuma sɛ ne sika a ɛhyɛ ase, na ɛma sikatua akwan a wɔabɔ ho ban (kokoam koraa) ne nea ɛda adi pefee nyinaa tumi tua.

Nea ɛnte sɛ atetesɛm blockchain sikatua nhyehyɛe ahorow, baabi a wotumi hu asɛm biara wɔ baguam wɔ nkɔnsɔnkɔnsɔn so no, wɔayɛ Zimppy atwa nhyehyɛe a egyina nhyiam so a eyi abisade biara a ɛkyɛ fi hɔ bere a ɛkora cryptographic kokoamsɛm so. Wei ma ɛfata soronko ma AI adwumayɛfoɔ a ɛhia sɛ wɔtua API, data, kɔmputa, anaa AI nnwinnadeɛ ho ka wɔ nhyehyɛeɛ kwan so, a wɔmfa suban ho metadata nkɔ.

### Agyapade Titiriw

- **Deposit pɛnkoro** on-chain (~75 sikani ma Zcash si so dua)
- **Asrɛde a anohyeto nni mu ntɛm ara** bere a wɔabue nhyiam no akyi no, zero per-abisade nkɔnsɔnkɔnsɔn nkitahodi
- **Shielded payments** encrypt nea ɔde kɔma, nea ogye, sika, ne memo denam Zcash Orchard protocol so
- **Transparent payments** de per-challenge T-addresses di dwuma ma replay prevention a enni kokoamsɛm a edi mũ
- **Spec-compliant**, HMAC-SHA256 nsɛnnennen, RFC 9457 mfomso, . `/.well-known/payment` ade a wɔahu

---

## Dɛn Nti na Sikatua a Wɔabɔ ho Ban Ma AI Agents?

Wɔ AI adwumayɛfoɔ a wɔdi adwumayɛ nhyehyɛeɛ a ɛyɛ nkateɛ ho dwuma, mmara mu nhwehwɛmu, aduruyɛ mu nsɛmmisa, sikasɛm mu nhwehwɛmu, akansiɛ ho nyansa ma **ɔmanfoɔ akatua biara yɛ metadata leak**. Zimppy ne MPP sikatua kwan nko ara a ɛyɛ **private by default**.

### Kokoam Nsɛm a Wɔde Toto Ho Table

| Agyapadeɛ | Ɔmanfoɔ Nkɔnsɔnkɔnsɔn (USDC, ETH) | Zimppy a Wɔabɔ no Kwan | Zimppy Transparent a Ɛyɛ Fɛ |
|---|---|---|---|
| **Ɔsomafoɔ** | Wotumi hu | Encrypted a wɔde ahyɛ mu | Wotumi hu |
| **Ogyefo** | Wotumi hu | Encrypted a wɔde ahyɛ mu | Per-challenge (wɔntumi nka ho) |
| **Nneɛma dodow** | Wotumi hu | Encrypted a wɔde ahyɛ mu | Wotumi hu |
| **Nsɛm a wɔka kyerɛ** | Wotumi hu | Encrypted a wɔde ahyɛ mu | N/A |
| **Replay Ahobanbɔ** | Obiara nni hɔ | Memo a wɔde kyekyere | Per-asɛnnennen T-address |
| **Ɔsom a Wɔde Di Dwuma Nhwɛso** | Linkable | Ankorankoro | Ɛntumi nkɔ nkitahodi (addr foforo) |

### Latency Ɔhaw no, a Wɔde Nhyiam Ahorow Asiesie

> *"Nanso Zcash wɔ 75-second block mmere."*

**Sessions solve this.** On-chain wait no si pɛpɛɛpɛ **pɛnkoro** wɔ deposit mu. Adesrɛ biara a edi hɔ no yɛ ntɛm ara.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Tua pɛnkoro, frɛ ntɛm ara, san nya nsakrae no.** Per-request latency yɛ zero.

---

## Mfiri a Wɔde Tua Ka Ho Nhyehyɛe (MPP) .

**Machine Payment Protocol (MPP)** yɛ nhyehyeɛ a wɔahyɛ da ayɛ a ɛma software agents a wɔdi wɔn ho (AI agents, bots, scripts) tumi hunu, di nkitaho, na wɔdi sikatua ahwehwɛdeɛ a ɛfa API kwan so nyinaa ho dwuma a nnipa mfa wɔn ho nnye mu.

### Sɛnea MPP ne API ahorow no Bom

MPP di HTTP **402 Katua a Wɔhwehwɛ** nsuo no akyi:

1. **Agent bisa** ade bi a efi API awiei a wotua ho ka.
2. **Server bua** ne `402 Payment Required` + asɛnnennen a wɔde wɔn nsa ahyɛ ase (sika dodow, nea ogye, memo).
3. **Agent tua** denam ɔkwan a ɛfata a wɔfa so tua ka (e.g., Zimppy shielded Zcash) so.
4. **Agent san sɔ** abisade no ne `Authorization: Payment {txid}`.
5. **Server di** sikatua no ho adanse wɔ cryptographic kwan so (Orchard IVK decryption, sika + memo check).
6. **Server bua** ne `200 OK` + a `Payment-Receipt` atiri.

### Spec Mmara a Wɔde Di Dwuma

- **HMAC-SHA256** asɛnnennen a wɔde wɔn nsa hyɛ ase
- **RFC 9457** nhyehyɛe mfomso mmuae
- **`/.well-known/payment`** endpoint ma automatic sikatua kwan a wobehu
- **Orchard IVK** (Incoming Viewing Key) ma server-side akatua ho adansedi a enni sika a wɔsɛe no safoa adi

---

## Sɛnea Zimppy Yɛ Adwuma

### Nhyiam ahorow (Wɔkamfo kyerɛ) .

Nhyiam ahorow ne nkitahodi nhyehyɛe titiriw. Ɔnanmusifo no de sika a aka no to nkɔnsɔnkɔnsɔn so pɛnkoro, onya bearer token, na ɔde di dwuma ma abisade ahorow a edi hɔ nyinaa wɔ zero latency mu.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Nea eye sen biara ma:** API frɛ a ɛkɔ soro, LLM nsusuwii, data a wɔbisa no mpɛn pii.

---

### Streaming a wɔde di dwuma

Tua-per-token mita nsɛm a wɔde fa **Server-Sent Events (SSE)** so. Server no twe fi session balance no mu wɔ asɛmfua anaa token biara a wɔde akɔ no mu.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Nea eye sen biara ma:** LLM streaming mmuae, bere ankasa mu data feeds, pay-per-token AI nnwinnade.

---

### Kwaadu

Katua biako a wɔabɔ ho ban wɔ adesrɛ biara mu. HTTP 402 flow no nyinaa yɛ adwuma wɔ frɛ biara mu. Ɛfata bere a abisade ntaa mma anaasɛ ne bo yɛ den no.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Nea eye sen biara ma:** Abisade a ɛsom bo pɛnkoro, API frɛ a ɛntaa nsi, premium data awiei.

---

## Fa Nsɛm & Nhwɛsode Di Dwuma

### 1. AI Agent

Mmara kwan so AI dwumayɛni bi bisa asɛm ho mmara ho database a wotua ho ka. Sɛ yɛde Zimppy shielded sessions di dwuma a, mmara adwumayɛbea no nipasu anaa nsɛmmisa pɔtee no nni hɔ a wohu wɔ nkɔnsɔnkɔnsɔn mu - ɛbɔ mmaranimfo-afɛfo hokwan ho ban wɔ infrastructure level.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Agent ma Aduruyɛ Ho Nsɛmmisa Pipeline

Aduruyɛ mu ɔyaresafo bi bisabisa ayaresabea ahorow pii ho nsɛm. Sikatua a wɔabɔ ho ban hwɛ hu sɛ ayarefo abisade nhyehyɛe no ntumi nkɔ so wɔ wɔn a wɔde ma no nyinaa mu.

### 3. Sikasɛm mu Nhwehwɛmu Ho Ɔnanmusifo

Algorithm aguadi agent tua bere ankasa mu gua so data API ahorow ho ka. Katua a ɛda adi pefee de T-address foforo di dwuma wɔ asɛnnennen biara mu, na esiw dwumadie nhyehyɛeɛ abusuabɔ a ɛwɔ data adetɔnfoɔ nyinaa mu ano.

### 4. MCP Nnwinnade Server, AI Nnwinnade a wotua ho ka

MCP (Model Context Protocol) server bi da AI nnwinnade a wotua ho ka adi. Adwinnade biara a wɔde frɛ no kanyan Zimppy ka, na ɛma gua a wɔde sika ayɛ AI tumi ahorow tumi yɛ adwuma.

### 5. LLM Nsɛm a Wɔaboaboa Ano, Akatua-Bara-Token

LLM summarization service bi gye agents ka wɔ output token biara ho denam SSE streaming so, a wɔtew sika a aka no ara kwa na wɔsan de sika a wɔatua dedaw a wɔmfa nni dwuma no ba.

---

## Installation a wɔde hyɛ mu

### Node.js / Nsɛm a Wɔakyerɛw

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

## Zimppy Wallet no a Wobɛhyehyɛ

Zimppy CLI no ma sika kotokuo ntam nkitahodi a edi mũ. Ahyɛdeɛ nyinaa wɔ hɔ denam `npx zimppy`.

### Anamɔn 1 : Yɛ Sikakorabea

```bash
npx zimppy wallet create
```

Yɛ cryptographic keys na ɛkyerɛ wo **aba kasasin**. Fa yei sie yie - se ayera a, wontumi nnye bio.

### Anamɔn 2 : Hwɛ Wo Address ne Wo Kari pɛ

```bash
npx zimppy wallet whoami
```

Kyerɛ wo **Unified Address (UA)**, **T-address**, mprempren kari pɛ, ne ntwamutam a ɛyɛ adwuma.

```bash
npx zimppy wallet balance --all
```

Kyerɛ akontaabu biara mu sika a wɔkyekyɛ wɔ ZIP-32 akontaabu nyinaa mu.

### Anamɔn 3 : Fa sika ma Wo Sikakorabea

Fa ZEC kɔ wo Unified Address no so fi sika kotoku anaa nsakrae biara a ɛne Zcash hyia mu. Sika a wɔde asie a wɔabɔ ho ban no kɔ wo Orchard akontaabu mu tẽẽ.

### Anamɔn 4 : Send na Shield Sika

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

### Anamɔn 5 : Yɛ Auto-Pay Request

```bash
npx zimppy request <url>
```

Ɔno ara di 402 -> tua -> san bɔ mmɔden sɛ ɛbɛsen no nyinaa ho dwuma. Wobue nhyiam ahorow no na wɔhwɛ so wɔ ɔkwan a ɛda adi pefee so.

---

## Zimppy a wɔde bɛka abom - TypeScript SDK

### TypeScript Server - Wɔabɔ ho ban

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

**Nsɛntitiriw:**
- `zcash({ wallet: 'server' })` de server no sika kotoku a wɔabɔ ho ban no gu mu
- `mppx.charge()` di 402 challenge/verify asetena mu nyinaa ho dwuma
- `result.withReceipt()` de cryptographic sikatua krataa no bata mmuae no ho

---

### TypeScript Server - Ɛyɛ nea ɛda adi pefee

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Asɛnnennen biara ma wonya **T-address foforo**, na ɛma sikatua abisade ahorow no ntumi nkɔ nkitahodi wɔ nhyiam ahorow no nyinaa mu.

---

### TypeScript Adetɔfoɔ

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Client no twa ne ho hyia `402` mmuae, bue nhyiamu bi ankasa, na ɔsan sɔ abisadeɛ no hwɛ - frɛ koodu no nhia nteaseɛ pɔtee biara a ɛfa sikatua ho.

---

## Zimppy - Rust SDK a wɔde bɛka abom

### Rust Server (Axum) a ɛwɔ hɔ no.

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

**Nsɛntitiriw:**
- `MppCharge<Price>` yɛ Axum extractor a ɛhwɛ sɛ wɔatua ansa na handler no atu mmirika
- `WithReceipt` de cryptographic sikatua krataa kyekyere mmuae no ho
- `ChargeConfig` kyerɛkyerɛ boɔ nteaseɛ mu - betumi ayɛ nnam a egyina abisadeɛ parameters so

---

### Rust Adetɔfoɔ

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` trɛw HTTP afɛfo biara mu denam 402 a wɔde di dwuma ɔtopae, nhyiam sohwɛ, ne Zcash sikatua mmamu so.

---

## CLI Nhwehwɛmu

| Ahyɛdeɛ | Nkyerɛkyerɛmu |
|---|---|
| `npx zimppy wallet create` | Generate keys na kyerɛ aba kasasin |
| `npx zimppy wallet whoami` | Kyerɛ address (UA + T-addr), kari pɛ, ntam |
| `npx zimppy wallet balance --all` | Akontaabu biara mu sika a wɔde asie no mu mpaapaemu |
| `npx zimppy wallet send <addr> <zat>` | Send shielded anaa transparent ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | Cross-account mu a wɔde kɔ baabi foforo |
| `npx zimppy wallet shield` | Fa sika a ɛda adi pefee kɔ Orchard (shielded) |
| `npx zimppy wallet use <name>` | Sesa active sika kotokuo identity |
| `npx zimppy request <url>` | Auto 402 -> tua -> san sɔ mmɔden sɛ wobɛbisa |

---

## Nneɛma Titiriw a Ɛwɔ Hɔ

### Agent-Native Sikakorabea

Wɔayɛ Zimppy sika kotokuo sɛ AI adwumayɛfoɔ de di dwuma wɔ nhyehyɛeɛ mu - ɛnyɛ browser ntrɛmu a nnipa hwɛ so. Wɔnam CLI anaa SDKs so na ɛhwɛ safoa so, wobetumi de **ZIP-32 akonta a wonya fi mu** so dannan akontaabu, na sika kotoku no boa sikatua a ɛyɛ adwuma koraa a nnipa nnye ho kwan wɔ asɛm biara mu.

### Multi-Agent Mmoa a Wɔde Ma

Agentfoɔ dodoɔ betumi ayɛ adwuma afiri sika kotokuo korɔ no ara mu denam **ZIP-32 akonta rotation** so - agent biara nya n’ankasa akonta a ɛwɔ balance tracking a atew ne ho, cross-account transfer tumi, ne account biara mu balance reporting. Eyi ma wotumi di ananmusifo pii po so ahyɛn so fi sika kotoku nhyehyɛe biako mu.

### Zcash Nkitahodi a Wɔabɔ ho Ban koraa (Orchard) .

Shielded payments de Zcash **Orchard protocol** - a ɛyɛ foforo na ahobammɔ wom sen biara shielded pool di dwuma. Server no de **Incoming Viewing Key (IVK)** a ɛtumi decrypt nsɛm a wɔagye no mu a ɛmma sika a wɔsɛe no safoa no nkyerɛ sɛ sikatua no yɛ nokware. Wɔnam **memo binding** so siw replay ntua ano - asɛnnennen biara de soronko bi hyɛ mu `zimppy:{challenge_id}` memo a wɔde cryptographic ayɛ nokware.

### Nhyiam , Zero Per-Abisade Latency

Session architecture no decouples on-chain confirmation wait no fi per-request latency no mu. Afei deposit biako (~75 seconds), wɔde bearer-token abisade a edi hɔ nyinaa som ntɛm ara a blockchain nkitahodi biara nni hɔ kosi sɛ nhyiam no bɛba awiei.

### Streaming , Akatua a Wɔde Tua Token Biara

Native **SSE (Server-Sent Events)** mmoa ma wotumi tua token biara metered content. Ɛyɛ papa ma LLM inference APIs a output tenten yɛ nsakraeɛ na ɛsɛ sɛ billing kyerɛ ankasa consumption.

### Spec Mmara a Wɔde Di Dwuma

- **HMAC-SHA256** nsɛnnennen a wɔde wɔn nsa ahyɛ ase no siw atoro kwan
- **RFC 9457** mfomsoɔ nhyehyeɛ a wɔahyehyɛ ama mfomsoɔ ho dwumadie a ɛyɛ adwuma bom
- **`/.well-known/payment`** ama ɔkwan a wɔfa so tua sika a ɛyɛ adwuma ankasa a ɔnanmusifo biara a ɔne MPP hyia no behu

---

## Dan nhyehyɛeɛ

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

### Component Asɛyɛde ahorow

**`zimppy-core`** - a ɛyɛ cryptographic core no. Di Orchard note decryption ho dwuma denam server no IVK, memo parsing, replay ahobammɔ ntease, ne asɛnnennen ho adansedi so. Wɔakyerɛw no Rust mu ama adwumayɛ ne nea ɛteɛ.

**`zimppy-wallet`** - A native Zcash sika kotoku a ahoɔden ne `zingolib`. Ɔhwɛ safe, akontaabu, sika a wɔabɔ ho ban/a ɛda adi pefee, ne asɛm a wɔde kɔma so.

**`zimppy-rs`** - Na ɛyɛ Rust SDK no. Ɔde ma `ChargeMethod`, `SessionMethod`, ne `PaymentProvider` su ahorow, ne nnuru a wɔde yi Axum (`MppCharge`, `WithReceipt`) ma ergonomic server nkabom.

**`zimppy-napi`** - NAPI-RS bindings a ɛda Rust core no adi kɔ Node.js so, ɛma TypeScript SDK tumi de cryptographic engine koro no ara di dwuma a ɛnsan mfa Zcash primitives nni dwuma wɔ JavaScript mu.

**`zimppy-ts`** - Ɔkwan a wɔfa so yɛ TypeScript SDK. Ɔde idiomatic async/await APIs kyekyere NAPI bindings ma charge, session, ne SSE streaming flows.

**`zimppy-cli`** - Ahyɛdeɛ-kwan sika kotokuo ne abisadeɛ adwinnadeɛ. Ɛboa auto-pay (402 -> tua -> san bɔ mmɔden), nhyiamu sohwɛ, ne sika kotoku dwumadie nyinaa.

---

## Nhwɛsode & Demos

| Nhwɛso | Nkyerɛkyerɛmu |
|---|---|
| `examples/fortune-teller/` | Charge, session, ne streaming demos - Rust server + client |
| `examples/llm-summarizer/` | Tua-biara-token LLM streaming demo |
| `examples/mcp-server/` | MCP adwinnade server a AI nnwinnade a wotua ho ka |
| `examples/ts-server/` | TypeScript MPP server nkyerɛkyerɛmu dwumadie |

---

## Nea Ɛka Ho - Feature Summary

| Feature a ɛwɔ | Nkyerɛkyerɛmu |
|---|---|
| **Nhyiamu ahorow** | Deposit pɛnkoro, instant bearer abisade, refund wɔ close |
| **Nsuo a wɔde fa nsuo mu** | Pay-per-token metered nsɛm a ɛwɔ SSE so |
| **Ka a wɔbɔ** | Sikatua a wɔabɔ ho ban anaasɛ ɛda adi pefee wɔ HTTP abisade biara mu (402 flow) |
| **Atua a Wɔde Tua Ka a Ɛda Hɔ** | T-addresses a ɛwɔ per-challenge replay prevention + kyɛm ahyɛde |
| **Akontaabuo pii** | ZIP-32 akontaabu mu nsakrae, akontaabu a wɔde kɔ amannɔne, akontaabu biara mu sika a aka |
| **CLI Sikakorabea** | Send, kyɛm, transfer, balance --ne nyinaa, whoami, auto-pay |
| **SDK abien** | TypeScript ne Rust |
| **Spec-A ɛne ne ho hyia** | HMAC-SHA256 nsɛnnennen, RFC 9457 mfomso, . `/.well-known/payment` nea wɔahu |

---

*Sɛ wopɛ nsɛm pii a, kɔ [zimppy.xyz](https://zimppy.xyz)*

---

## Nkratafa a Ɛfa Ho

- [Wɔde sika kotoku](/using-zcash/wallets) — Zcash sika kotoku a ɛboa nnwuma a wɔabɔ ho ban
- [Atare a Wɔabɔ Ho Ban](/using-zcash/shielded-pools) — Sɛnea Orchard shielded transactions bɔ sikatua data ho ban
- [Nnwuma a Wɔde Tua Ka](/using-zcash/payment-processors) — Akwan foforo a wobɛfa so agye Zcash sikatua
- [Zcash Shielded Agyapadeɛ](/zcash-tech/zcash-shielded-assets) — ZSAs ne daakye a ɛbɛba wɔ Zcash nhyehyɛe mu
- [Mpɔtam hɔ Nnwuma](/zcash-community/community-projects) — Zcash abɔde a nkwa wom ho nnwuma pii
