<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimpy.xyz

## TL;DR

- **Zimppy** jẹ́ ètò ìsanwó àkọ́kọ́ fún àwọn aṣojú AI nípa lílo Ìlànà Ìsanwó Ẹ̀rọ Zcash's (MPP)
- **Fi owo pamọ lẹẹkan** lori pq (~ awọn aaya 75), lẹhinna ṣe **awọn ibeere lẹsẹkẹsẹ ailopin** laisi ibaraenisepo blockchain fun ibeere kọọkan
- Ṣe atilẹyin fun awọn sisanwo Zcash (Orchard)** ti a daabobo patapata — oluranṣẹ, olugba, iye, ati akọsilẹ ni a fi pamọ
- Nṣiṣẹ pẹlu **TypeScript ati Rust SDKs** fun isọpọ irọrun sinu awọn opo gigun ti AI ati awọn olupin API
- Ó dára fún **LLM APIs, ọjà dátà, àwọn olupin irinṣẹ́ MCP**, àti èyíkéyìí ọ̀ràn lílo ìsanwó M2M

---

> **Zimppy** ni ọ̀nà ìsanwó Ẹ̀rọ Ìsanwó (MPP) fún Zcash tí ó ń ṣe àtìlẹ́yìn fún àwọn ìsanwó tí a dáàbò bò àti èyí tí ó ṣe kedere. Fi owó pamọ́ nígbà tí o bá wà lórí ẹ̀wọ̀n, lẹ́yìn náà ṣe àwọn ìbéèrè onígbèsè lẹ́sẹ̀kẹsẹ̀ láìlópin láìsí ìbáṣepọ̀ ẹ̀wọ̀n kọ̀ọ̀kan.

---

## Atọka akoonu

1. [Kí ni Zimpy.xyz?](#what-is-zimppyxyz)
2. [Kí nìdí tí a fi ń san owó ààbò fún àwọn aṣojú AI?](#why-shielded-payments-for-ai-agents)
3. [Ìlànà Ìsanwó Ẹ̀rọ (MPP)](#machine-payment-protocol-mpp)
4. [Báwo ni Zimpy ṣe ń ṣiṣẹ́](#how-zimppy-works)
   - [Àwọn ìpàdé (A ṣeduro rẹ̀)](#sessions-recommended)
   - [Ṣíṣíṣanwọle](#streaming)
   - [Owo idiyele](#charge)
5. [Àwọn Ọ̀ràn Lílo & Àwọn Àpẹẹrẹ](#use-cases--examples)
6. [Fifi sori ẹrọ](#installation)
7. [Ṣíṣeto Àpò Ìpamọ́ Zippy](#setting-up-the-zimppy-wallet)
8. [Ṣíṣe àfikún Zimpy](#integrating-zimppy--typescript-sdk)
   - [Olùpèsè (Ti a fi ààbò pamọ́)](#typescript-server--shielded)
   - [Olùpèsè (Aláìlábòsí)](#typescript-server--transparent)
   - [Onibara](#typescript-client)
9. [Ṣíṣe àfikún Zimpy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Olùpèsè (Axum)](#rust-server-axum)
   - [Onibara](#rust-client)
10. [Ìtọ́kasí CLI](#cli-reference)
11. [Àwọn Ohun Pàtàkì](#key-features)
12. [Àwọn ilé](#architecture)
13. [Àwọn àpẹẹrẹ àti àwọn àfihàn](#examples--demos)

---

## Kí ni Zimpy.xyz?

**Zimppy.xyz** jẹ́ ètò ìsanwó ìpamọ́ àkọ́kọ́ tí a ṣe pàtó fún àwọn aṣojú AI àti àwọn iṣẹ́-ṣíṣe ẹ̀rọ-sí-ẹ̀rọ aládàáṣe (M2M). Ó ń lo **Ẹ̀rọ Ìsanwó Ìnáwó (MPP)** nípa lílo **Zcash** gẹ́gẹ́ bí owó ìpìlẹ̀ rẹ̀, tí ó ń mú kí àwọn ọ̀nà ìsanwó tí a dáàbò bò (àdáni pátápátá) àti àwọn ọ̀nà ìsanwó tí ó ṣe kedere ṣeé lò.

Láìdàbí àwọn ètò ìsanwó blockchain ìbílẹ̀, níbi tí gbogbo ìṣòwò ti hàn gbangba lórí ẹ̀rọ, a ṣe àgbékalẹ̀ Zimppy ní àyíká ìṣètò tí ó dá lórí ìgbà kan tí ó mú kí ìdádúró fún ìbéèrè kúrò nígbàtí ó ń pa ìpamọ́ ìkọ̀kọ̀ mọ́. Èyí mú kí ó jẹ́ ohun tí ó yẹ fún àwọn aṣojú AI tí wọ́n nílò láti sanwó fún àwọn API, data, computing, tàbí AI ní ìlànà ètò, láìsí ìjáde metadata ìwà.

### Àwọn Ohun Ànímọ́ Pàtàkì

- **Fi owo pamọ lẹẹkan** lori ẹ̀wọ̀n (~ awọn aaya 75 fun ijẹrisi Zcash)
- **Awọn ibeere lẹsẹkẹsẹ ailopin** lẹhin ṣiṣi akoko, o kere si ibaraenisepo pq fun ibeere kọọkan
- **Awọn isanwo ti a fi pamọ** Oluranṣẹ, olugba, iye, ati akọsilẹ nfi koodu pamọ nipa lilo ilana Orchard Zcash's
- **Awọn isanwo ti o han gbangba** lo awọn adirẹsi T fun ipenija kọọkan fun idena atunkọ laisi ikọkọ kikun
- **Ìbámu pẹ̀lú ìlànà pàtó**, àwọn ìpèníjà HMAC-SHA256, àwọn àṣìṣe RFC 9457, `/.well-known/payment` àwárí

---

## Kí nìdí tí a fi ń san owó ààbò fún àwọn aṣojú AI?

Fún àwọn aṣojú AI tí wọ́n ń ṣe iṣẹ́ tó ṣe pàtàkì, ìwádìí òfin, ìbéèrè ìṣègùn, ìwádìí ìṣúná owó, ìmọ̀ ìdíje fún **gbogbo ìsanwó gbogbogbòò jẹ́ ìjìnnà metadata**. Zimpy ni ọ̀nà ìsanwó MPP kan ṣoṣo tí ó jẹ́ **ìkọ̀kọ̀ nípasẹ̀ àìyípadà**.

### Tabili Ifiwera Asiri

| Ohun ìní | Àwọn ẹ̀wọ̀n gbogbogbòò (USDC, ETH) | A fi ààbò bo Zimpy | Zippy Transparent |
|---|---|---|---|
| **Oluranṣẹ** | A le ri | Ti fi àkọpamọ́ | A le ri |
| **Olùgbà** | A le ri | Ti fi àkọpamọ́ | Ìpèníjà kọ̀ọ̀kan (a kò lè so pọ̀ mọ́ra) |
| **Iye** | A le ri | Ti fi àkọpamọ́ | A le ri |
| **Ìrántí** | A le ri | Ti fi àkọpamọ́ | N/A |
| **Ààbò Àtúnṣe** | Kò sí | Ìsopọ̀mọ́ àkọsílẹ̀ | Àdírẹ́sì T fún ìpèníjà kọ̀ọ̀kan |
| **Àpẹẹrẹ Lilo Iṣẹ** | A le sopọ̀ mọ́ | Ikọkọ | A kò le sopọ̀ mọ́ (àdírẹ́sì tuntun) |

### Iṣoro Latency, Ti a Yanju nipasẹ Awọn Sessions

> *"Ṣùgbọ́n Zcash ní àkókò ìdènà ìṣẹ́jú-àáyá 75."*

**Àwọn ìpàdé yanjú èyí.** Ìdúró lórí ẹ̀wọ̀n náà máa ń ṣẹlẹ̀ ní **lẹ́ẹ̀kan** nígbà tí a bá fi owó pamọ́. Gbogbo ìbéèrè tó tẹ̀lé e máa ń wáyé lẹ́sẹ̀kẹsẹ̀.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Sanwo lẹẹkan, pe lẹsẹkẹsẹ, gba iyipada pada.** Akoko idaduro fun ibeere kọọkan jẹ odo.

---

## Ìlànà Ìsanwó Ẹ̀rọ (MPP)

Ìlànà Ìsanwó Ẹ̀rọ **(MPP)** jẹ́ ìlànà tí a gbé kalẹ̀ tí ó ń jẹ́ kí àwọn aṣojú sọ́fítíwè aládàáni (àwọn aṣojú AI, àwọn bot, àwọn ìwé àkọsílẹ̀) ṣàwárí, ṣe àdéhùn, àti mú àwọn ohun tí a béèrè fún ìsanwó ṣẹ fún wíwọlé API láìsí ìdásí ènìyàn.

### Báwo ni MPP ṣe ń ṣepọ pẹ̀lú àwọn API

MPP tẹ̀lé ìṣàn HTTP **402 Ìsanwó tí a béèrè**:

1. **Aṣojú béèrè fún** ohun èlò láti ibi ìparí API tí a sanwó fún.
2. **Server dáhùn** pẹ̀lú `402 Payment Required` + ìpèníjà tí a fọwọ́ sí (iye owó, olùgbà, àkọsílẹ̀).
3. **Aṣojú sanwó** nípa lílo ọ̀nà ìsanwó tó báramu (fún àpẹẹrẹ, Zcash).
4. **Aṣojú tún gbìyànjú** ìbéèrè náà pẹ̀lú `Authorization: Payment {txid}`.
5. **Server ń fìdí ìsanwó náà múlẹ̀** nípa ìkọ̀kọ̀ (Orchard IVK, iye + àyẹ̀wò àkọsílẹ̀).
6. **Server dáhùn** pẹ̀lú `200 OK` + a `Payment-Receipt` akọsori.

### Ìbámu Pàtàkì

- **Ìfọwọ́sí ìpèníjà HMAC-SHA256**
- **RFC 9457** Àwọn ìdáhùn àṣìṣe tí a ṣètò
- **`/.well-known/payment`** opin aaye fun wiwa ọna isanwo laifọwọyi
- **Orchard IVK** (Incoming Viewing Key) fún ìjẹ́rìísí ìsanwó ẹ̀gbẹ́ olupin láìsí ìṣípayá àwọn kọ́kọ́rọ́ ìnáwó

---

## Báwo ni Zimpy ṣe ń ṣiṣẹ́

### Àwọn ìpàdé (A ṣeduro rẹ̀)

Àwọn ìpàdé ni ìlànà ìbáṣepọ̀ àkọ́kọ́. Aṣojú náà máa ń fi ìwọ́ntúnwọ̀nsí sílẹ̀ lórí ẹ̀wọ̀n lẹ́ẹ̀kan, ó máa ń gba àmì onígbèsè kan, ó sì máa ń lò ó fún gbogbo ìbéèrè tó tẹ̀lé e láìsí ìdádúró.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**O dara julọ fun:** Awọn ipe API igbohunsafẹfẹ giga, awọn itọkasi LLM, awọn ibeere data ti a tunṣe.

---

### Ṣíṣíṣanwọle

Akoonu ti a fi iwọn san-fun-ami ti a fi jiṣẹ lori **Awọn iṣẹlẹ ti a fi ranṣẹ si olupin (SSE)**. Olupin naa yọ kuro ninu iwọntunwọnsi igba fun ọrọ kan tabi ami ti a fi ranṣẹ sita.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**O dara julọ fun:** Awọn idahun sisanwọle LLM, awọn ifunni data akoko gidi, awọn irinṣẹ AI sanwo-fun-token.

---

### Owo idiyele

Ìsanwó kan ṣoṣo tí a dáàbò bo fún ìbéèrè kọ̀ọ̀kan. Ìṣàn HTTP 402 ni a ṣe fún ìpè kọ̀ọ̀kan. Ó yẹ nígbà tí ìbéèrè kò bá wọ́pọ̀ tàbí tí ó níye lórí púpọ̀.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**O dara julọ fun:** Awọn ibeere ti o ni iye owo pupọ, awọn ipe API ti ko wọpọ, awọn opin data Ere.

---

## Àwọn Ọ̀ràn Lílo & Àwọn Àpẹẹrẹ

### 1. Aṣojú AI

Aṣojú AI òfin kan máa ń béèrè ibi ìpamọ́ ẹjọ́ tí a sanwó fún. Nípa lílo àwọn ìpàdé tí a dáàbò bo Zimpy, ìdámọ̀ ilé-iṣẹ́ òfin tàbí àwọn ìbéèrè pàtó kò hàn lórí ẹ̀wọ̀n - wọ́n ń dáàbò bo àǹfààní agbẹjọ́rò-oníbàárà ní ìpele ètò ìṣiṣẹ́.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Aṣojú AI fún Pípìlì Ìbéèrè Ìṣègùn

Aṣojú ìwádìí ìṣègùn kan máa ń béèrè ọ̀pọ̀lọpọ̀ ibi ìpamọ́ ìṣègùn. Àwọn ìsanwó tí a dáàbò bo máa ń rí i dájú pé àwọn ìlànà ìbéèrè aláìsàn kò lè so pọ̀ mọ́ àwọn olùpèsè.

### 3. Aṣojú Ìṣàyẹ̀wò Owó

Aṣojú ìṣòwò algoridimu kan máa ń sanwó fún API data ọjà ní àkókò gidi. Àwọn ìsanwó tí ó hàn gbangba máa ń lo àwọn àdírẹ́sì T tuntun fún ìpèníjà kọ̀ọ̀kan, èyí tí ó ń dènà ìbáṣepọ̀ ìlànà lílo láàárín àwọn olùtajà data.

### 4. Ẹ̀rọ MCP Tool Server, Àwọn Irinṣẹ́ AI Tí A Ti Sanwó

Ẹ̀rọ ìṣiṣẹ́ MCP (Model Context Protocol) kan ń fi àwọn irinṣẹ́ AI tí a sanwó hàn. Gbogbo ìpè irinṣẹ́ ló ń fa owó Zimpy, èyí sì ń jẹ́ kí ọjà ní agbára AI tí a ń sanwó fún.

### 5. Àkótán LLM, Ìsanwó-Pẹ̀lú Àmì-àmì

Iṣẹ́ àkópọ̀ LLM kan gba owó lọ́wọ́ àwọn aṣojú fún àmì ìjáde kọ̀ọ̀kan nípasẹ̀ ìṣàn omi SSE, pẹ̀lú ìdínkù ìwọ̀n ara ẹni àti àtúnpadà owó ìṣúra tí a kò tí ì lò.

---

## Fifi sori ẹrọ

### Node.js / IruScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Ipata

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Ṣíṣeto Àpò Ìpamọ́ Zippy

Zimpy CLI n pese wiwo apamọwọ kikun. Gbogbo awọn aṣẹ wa nipasẹ `npx zimppy`.

### Igbesẹ 1: Ṣẹda Apamọwọ kan

```bash
npx zimppy wallet create
```

Ó ń ṣe àwọn kọ́kọ́rọ́ ìkọ̀kọ̀, ó sì ń fi gbólóhùn **irúgbìn** rẹ hàn. Tọ́jú èyí dáadáa - a kò le rí i gbà tí a bá sọnù.

### Igbesẹ 2: Ṣayẹwo Adirẹsi ati Iwontunwonsi Rẹ

```bash
npx zimppy wallet whoami
```

Ó ń fi **Unified Address (UA)**, **Àdírẹ́sì T**, ìwọ̀n ìdúró lọ́wọ́lọ́wọ́, àti nẹ́tíwọ́ọ̀kì tí ń ṣiṣẹ́ hàn.

```bash
npx zimppy wallet balance --all
```

Ó ń fi ìṣàfihàn ìwọ́ntúnwọ̀nsí àkọọ́lẹ̀ kọ̀ọ̀kan hàn ní gbogbo àkọọ́lẹ̀ ZIP-32.

### Igbesẹ 3: Ṣe inawo fun Apamọwọ Rẹ

Fi ZEC ranṣẹ si Unified Address rẹ lati eyikeyi apamọwọ tabi paṣipaarọ Zcash-compatible. Awọn idogo ti a fi pamọ yoo lọ taara si akọọlẹ Orchard rẹ.

### Igbesẹ 4: Fifiranṣẹ ati Idaabobo Awọn Owo

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

### Igbesẹ 5: Ṣe ìbéèrè fun isanwo laifọwọyi

```bash
npx zimppy request <url>
```

A máa ń lo gbogbo ìṣàn 402 -> ìsanwó -> àtúngbìyànjú láìfọwọ́sí. A máa ń ṣí àwọn ìpàdé náà, a sì máa ń ṣàkóso wọn lọ́nà tó ṣe kedere.

---

## Ṣíṣe àfikún Zimpy - TypeScript SDK

### Ẹ̀rọ Ìpamọ́ TypeScript - A dáàbò bò

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

**Awọn koko pataki:**
- `zcash({ wallet: 'server' })` ń kó àpò ìpamọ́ olupin náà sínú
- `mppx.charge()` Ó ń ṣe gbogbo ìpèníjà 402/ìṣàyẹ̀wò ìgbésí ayé rẹ̀
- `result.withReceipt()` so ìwé ẹ̀rí ìsanwó ìkọ̀kọ̀ mọ́ ìdáhùn náà

---

### Ẹ̀rọ Ìṣiṣẹ́ TypeScript - Àfihàn

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Ìpèníjà kọ̀ọ̀kan ń mú àdírẹ́sì T-àdírẹ́sì tuntun wá**, èyí tí ó ń mú kí àwọn ìbéèrè ìsanwó má ṣe so pọ̀ mọ́ ara wọn ní gbogbo ìgbà.

---

### Onibara TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Onibara naa dawọle `402` awọn idahun, ṣii ipade kan laifọwọsi, ati tun gbiyanju ibeere naa - koodu ipe ko nilo ero kan pato fun isanwo.

---

## Ṣíṣe àfikún Zimpy - Rust SDK

### Olùpèsè ipata (Axum)

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

**Awọn koko pataki:**
- `MppCharge<Price>` jẹ́ ẹ̀rọ ìyọkúrò Axum tí ó ń fìdí ìsanwó múlẹ̀ kí olùtọ́jú náà tó bẹ̀rẹ̀ iṣẹ́
- `WithReceipt` fi ìwé ẹ̀rí ìsanwó ìkọ̀kọ̀ wé ìdáhùn náà
- `ChargeConfig` ṣalaye ọgbọn idiyele - o le jẹ agbara da lori awọn ipilẹ ibeere

---

### Onibara ipata

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` Ó ń fa gbogbo àwọn oníbàárà HTTP mọ́ra pẹ̀lú ìtọ́jú 402 aládàáṣe, ìṣàkóso ìgbìmọ̀, àti ìmúṣẹ ìsanwó Zcash.

---

## Ìtọ́kasí CLI

| Àṣẹ | Àpèjúwe |
|---|---|
| `npx zimppy wallet create` | Ṣe awọn bọtini ati ṣafihan gbolohun irugbin |
| `npx zimppy wallet whoami` | Fi àdírẹ́sì (UA + T-addr) hàn, ìwọ̀nba, nẹ́tíwọ́ọ̀kì |
| `npx zimppy wallet balance --all` | Ìpínyà ìwọ́ntúnwọ̀nsí fún àkọọ́lẹ̀ kọ̀ọ̀kan |
| `npx zimppy wallet send <addr> <zat>` | Fi ZEC tí a fi ààbò tàbí tí ó hàn gbangba ránṣẹ́ |
| `npx zimppy wallet transfer <from> <to> <zat>` | Gbigbe ti inu-akọọlu-akọọlu |
| `npx zimppy wallet shield` | Gbe owo ti o han gbangba lọ si Orchard (ti a fi aabo pamọ) |
| `npx zimppy wallet use <name>` | Yi idanimọ apamọwọ ti nṣiṣe lọwọ pada |
| `npx zimppy request <url>` | Aládàáni 402 -> sanwo -> ìbéèrè tún gbìyànjú |

---

## Àwọn Ohun Pàtàkì

### Àwọn Àpò Aṣojú-Ìbílẹ̀

Àwọn àpò owó Zimpy ni a ṣe fún lílo ètò nípasẹ̀ àwọn aṣojú AI - kìí ṣe àwọn àfikún ẹ̀rọ aṣàwárí tí ènìyàn ń ṣàkóso. A ń ṣàkóso àwọn kọ́kọ́rọ́ nípasẹ̀ CLI tàbí SDKs, a lè yí àwọn àkọọ́lẹ̀ padà nípasẹ̀ **ZIP-32 àkọọ́lẹ̀**, àti àpò owó náà ń ṣètìlẹ́yìn fún ṣíṣàn ìsanwó aládàáṣe pátápátá láìsí ìfọwọ́sowọ́pọ̀ ènìyàn fún ìṣòwò kọ̀ọ̀kan.

### Atilẹyin Aṣoju Pupọ

Ọ̀pọ̀lọpọ̀ àwọn aṣojú lè ṣiṣẹ́ láti inú àpò kan náà nípa lílo **ZIP-32 àkọọ́lẹ̀ ìyípadà** - aṣojú kọ̀ọ̀kan ní àkọọ́lẹ̀ tirẹ̀ pẹ̀lú ìtọ́pinpin ìwọ́ntúnwọ́nsí pàtó, agbára gbigbe àkọọ́lẹ̀ ìlọ́po méjì, àti ìròyìn ìwọ́ntúnwọ́nsí fún àkọọ́lẹ̀ kọ̀ọ̀kan. Èyí mú kí ìṣàkóso ọkọ̀ ojú omi ti ọ̀pọ̀lọpọ̀ àwọn aṣojú láti inú ètò àpò kan ṣoṣo.

### Awọn iṣowo Zcash ti a daabobo patapata (Orchard)

Àwọn ìsanwó tí a dáàbò bo lo ìlànà **Orchard** Zcash's, adágún ààbò tí NU5. Ẹ̀rọ ìpèsè náà ń fi **Incoming Viewing Key (IVK)** ṣe àyẹ̀wò ìsanwó, èyí tí ó lè mú kí àwọn àkọsílẹ̀ tí a gbà kúrò láìsí pé ó ṣí kọ́kọ́rọ́ ìnáwó payá. A ń dènà àwọn ìkọlù àtúnṣe nípasẹ̀ **ìdè àkọsílẹ̀** - ìpèníjà kọ̀ọ̀kan ní àrà ọ̀tọ̀ kan nínú `zimppy:{challenge_id}` àkọsílẹ̀ tí a fi ìkọ̀kọ̀ ṣe àyẹ̀wò rẹ̀.

### Àwọn ìpàdé, Àìsí ìfaradà fún ìbéèrè kọ̀ọ̀kan

Ìgbékalẹ̀ ìgbìmọ̀ náà mú kí ìdúró ìjẹ́rìí lórí ẹ̀wọ̀n kúrò láti àkókò ìdúró fún ìbéèrè kọ̀ọ̀kan. Lẹ́yìn ìdókòwò kan (~ 75 àáyá), gbogbo ìbéèrè àwọn olùgbé-àmì tí ó tẹ̀lé e ni a ó fi ránṣẹ́ lẹ́sẹ̀kẹsẹ̀ láìsí ìbáṣepọ̀ blockchain títí tí ìgbìmọ̀ náà yóò fi parí.

### Ṣíṣíṣanwọle, Sanwo-Fun-Àmì

Àtìlẹ́yìn fún àwọn ohun tí a fi ń sanwó fún àmì ìsanwó** jẹ́ kí a lè rí àwọn ohun tí a fi ń sanwó fún àmì ìsanwó. Ó dára fún àwọn API ìfòyemọ̀ LLM níbi tí gígùn ìjáde bá yàtọ̀ síra àti pé ìsanwó gbọ́dọ̀ ṣàfihàn lílo gidi.

### Ìbámu Pàtàkì

- **HMAC-SHA256** Àwọn ìpèníjà tí a fọwọ́ sí ni ó ń dènà ìbàjẹ́
- **RFC 9457** Ìlànà àṣìṣe tí a ṣètò fún mímú àṣìṣe tí a lè ṣe pọ̀
- **`/.well-known/payment`** fún àwárí ọ̀nà ìsanwó láìfọwọ́sí láti ọ̀dọ̀ aṣojú èyíkéyìí tó bá MPP mu

---

## Àwọn ilé

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

### Awọn Ojuse Apakan

**`zimppy-core`** - Apá ìkọ̀kọ̀. Ó ń ṣe àgbékalẹ̀ àkọsílẹ̀ Orchard nípa lílo IVK ti olupin, ìtúpalẹ̀ àkọsílẹ̀, ìlànà ààbò àtúnyẹ̀wò, àti ìjẹ́rìí ìpèníjà. A kọ ọ́ ní Rust fún iṣẹ́ àti ìtọ́sọ́nà.

**`zimppy-wallet`** - Àpò Zcash ìbílẹ̀ kan tí a fi agbára ṣe láti ọwọ́ `zingolib`. Ó ń ṣàkóso àwọn kọ́kọ́rọ́, àkọọ́lẹ̀, àwọn ìwọ̀n tí a dáàbò bò/tí a ṣe kedere, àti ìfiránṣẹ́ ìṣòwò.

**`zimppy-rs`** - Rust SDK. N pese `ChargeMethod`, `SessionMethod`, àti `PaymentProvider` awọn abuda, pẹlu awọn olutọpa Axum (`MppCharge`, `WithReceipt`) fún ìṣọ̀kan olupin ergonomic.

**`zimppy-napi`** - Àwọn ìsopọ̀ NAPI-RS tí ó fi ààlà Rust hàn sí Node.js, èyí tí ó mú kí TypeScript SDK lè lo ẹ̀rọ ìkọ̀wé kan náà láìsí àtúnṣe àwọn ìpìlẹ̀ Zcash nínú JavaScript.

**`zimppy-ts`** - TypeScript SDK. Ó ń fi àwọn ìsopọ̀ NAPI wéra pẹ̀lú àwọn API async/await onípele fún ìṣàn owó, ìṣàn àkókò, àti ìṣàn owó SSE.

**`zimppy-cli`** - Apamọwọ aṣẹ ati ohun elo ibeere. Ṣe atilẹyin fun isanwo-laifọwọyi (402 -> sanwo -> tun gbiyanju), iṣakoso igba, ati gbogbo awọn iṣẹ apamọwọ.

---

## Àwọn àpẹẹrẹ àti àwọn àfihàn

| Àpẹẹrẹ | Àpèjúwe |
|---|---|
| `examples/fortune-teller/` | Àwọn àfihàn gbígbà agbára, ìgbà, àti ìṣàfihàn ìṣàn - Olùpèsè Rust + oníbàárà |
| `examples/llm-summarizer/` | Àfihàn ìṣàfihàn ìṣàn LLM fún owó-fún-àmì-ìsanwó |
| `examples/mcp-server/` | Ẹ̀rọ olupin MCP pẹlu awọn irinṣẹ AI ti a sanwo |
| `examples/ts-server/` | Ìmúṣe ìtọ́kasí olupin TypeScript MPP |

---

## Ohun ti o wa ninu - Akopọ Awọn ẹya ara ẹrọ

| Ẹ̀yà ara | Àpèjúwe |
|---|---|
| **Àwọn Àkókò** | Idogo lẹẹkan, awọn ibeere fun onigbese lẹsẹkẹsẹ, agbapada ni pipade |
| **Ṣíṣànwọle** | Akoonu ti a wọn fun isanwo-fun-ami lori SSE |
| **Gbigba agbara** | Isanwo ti a daabobo tabi ti o han gbangba fun ibeere HTTP (402 flow) |
| **Awọn isanwo ti o han gbangba** | Àwọn àdírẹ́sì T pẹ̀lú ìdènà àtúnṣe fún ìpèníjà kọ̀ọ̀kan + àṣẹ ààbò |
| **Àkọọ́lẹ̀ Onírúurú** | Ìyípo àkọọ́lẹ̀ ZIP-32, àwọn ìgbesẹ̀ àkọọ́lẹ̀-àgbékalẹ̀, àwọn ìwọ̀n àkọọ́lẹ̀-àgbéka .. |
| **Àpò CLI** | Firanṣẹ, daabobo, gbe, iwọntunwọnsi --gbogbo, whoami, sanwo laifọwọyi |
| **SDK Meji** | Iru-kikọ ati ipata |
| **Ó bá ìlànà pàtó mu** | Àwọn ìpèníjà HMAC-SHA256, àwọn àṣìṣe RFC 9457, `/.well-known/payment` àwárí |

---

*Fun alaye siwaju sii, ṣabẹwo [zimpy.xyz](https://zimppy.xyz)*

---

## Àwọn ojú ìwé tó jọra

- [Àwọn Àpò Ìpamọ́](/using-zcash/wallets) — Àwọn àpò Zcash tí ó ń ṣe àtìlẹ́yìn fún àwọn ìṣòwò tí a dáàbò bò
- [Àwọn Adágún Tí A Dáàbò Bo](/using-zcash/shielded-pools) — Báwo ni Orchard ṣe dáàbò bo àwọn ìṣòwò láti dáàbò bo ìwífún ìsanwó
- [Àwọn Olùṣètò Ìsanwó](/using-zcash/payment-processors) — Awọn ọna miiran lati gba awọn sisanwo Zcash
- [Àwọn Ohun Ìní tí a fi ààbò Zcash ṣe](/zcash-tech/zcash-shielded-assets) — ZSAs àti ọjọ́ iwájú ti ètò Zcash
- [Àwọn Iṣẹ́ Àwùjọ](/zcash-community/community-projects) — Awọn iṣẹ akanṣe ilolupo Zcash diẹ sii
