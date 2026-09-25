<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz (ì í ì ë ¤)

## TL;DR

- **Zimppy** jẹ́ ìlé-iṣẹ́ tí ó ń sanwó fún àwọn aṣojú AI nípa lílo Àlàkalẹ̀ Ìsanwó Ẹrọ (MPP) ti Zcash.
- ** Fi ẹyọ kan silẹ** lori-ṣini (~75 aaya), lẹhinna ṣe awọn ibeere lẹsẹkẹsẹ ti ko ni opin pẹlu laisi ibaraenisepo blockchain fun ibere kọọkan.
- Atilẹyin ** ni kikun idaabobo Zcash (Orchard)** awọn sisanwo  Oluranlowo, olugba, iye ati memo gbogbo wọn ti wa ni encrypted
- Ṣiṣẹ pẹlu ** TypeScript ati Rust SDKs** fun iṣọpọ ti o rọrun sinu awọn paipu AI ati awọn olupin API
- Ó dára fún àwọn API LLM, ọjà ìsọfúnni, àwọn ààrò ohun èlò MCP** àti gbogbo òwò lílo owó-sí-ọ̀fẹ́ (m2m)

---

> **Zimppy** jẹ́ ìlànà ìsanwó Machine Payment Protocol (MPP) fún Zcash tí ó ń ṣe àtìlẹyìn àwọn owó ìdánwò àti ti ìmọ̀lára. Fi ẹyọ kan sílẹ̀ lórí-ìpín, lẹ́yìn náà kó o wá fi àìmọye ìbéèrè sí ẹni tó ni wọn láìṣe ìpèsè kankan nípasẹ̀ ọ̀nà ìbálòpọ̀ orí-ìbéèrè.

---

## Àkópọ̀ Àwọn Ohun Tó Wà Nínú Ìwé Yìí

1. [Kí ni Zimppy.xyz?](#what-is-zimppyxyz)
2. [Kí nìdí tí a fi ń ṣe ìsanwó ààbò fún àwọn aṣojú AI?](#why-shielded-payments-for-ai-agents)
3. [Àkọsílẹ̀ Ìsanwó Ẹrọ (MPP)](#machine-payment-protocol-mpp)
4. [Bí Zimppy Ṣe Ń Ṣiṣẹ́](#how-zimppy-works)
   - [Àwọn Ìpàdé (A Gbà Á Láyè)](#sessions-recommended)
   - [Ìṣàn-ánáàrin](#streaming)
   - [Owó ìtanràn](#charge)
5. [Lo Awọn Ọran & Àpẹẹrẹ](#use-cases--examples)
6. [Ìmúṣẹ ìtòlẹ́sẹẹsẹ náà](#installation)
7. [Ṣiṣeto Iwe-owo Zimppy naa](#setting-up-the-zimppy-wallet)
8. [Ṣíṣàtúnṣe Zimppy](#integrating-zimppy--typescript-sdk)
   - [Olùpèsè (Aṣọ́)](#typescript-server--shielded)
   - [Olùpèsè (Oríṣàn)](#typescript-server--transparent)
   - [Olùgbéejáde](#typescript-client)
9. [Ṣíṣàtúnṣe Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Olùpèsè (Axum)](#rust-server-axum)
   - [Olùgbéejáde](#rust-client)
10. [Àkọlé CLI](#cli-reference)
11. [Àwọn Ànímọ́ Pàtàkì Rẹ̀](#key-features)
12. [Ìṣẹ̀dá ilé-ìkọ́lé](#architecture)
13. [Àpẹẹrẹ & Awọn Demo](#examples--demos)

---

## Kí ni Zimppy.xyz?

Zimppy.xyz jẹ́ ìlé-iṣẹ̀ tí a ṣe fún ààbò àti owó ìdánwò, èyí ti a dá sílẹ̀ ní pàtó fun àwọn aṣojú AI ati iṣẹ́ ìṣiṣẹ́ alágbèéká (M2M). Ó ń lo ìlànà Ìsanwó Ẹrọ (MPP) ** nípa lílo Zcash** gẹ́gẹ́ bí owó rẹ̀ tó wà lábẹ́lẹ̀, ó sì gba kí wọ́n máa sanwó lọ́nà dídákẹ́tọ̀ọ́ (títìmọ́ pátápátá), àti ọ̀nà ìdájọ́ òkùnrùn.

Ko dabi awọn ọna isanwo blockchain ibile, nibiti gbogbo iṣowo ti han gbangba lori pqp, Zimppy jẹ onimọ-ẹrọ ni ayika faaji orisun akoko kan eyiti o yọkuro idaduro fun ibeere lakoko mimu aṣiri crypto. Eyi ṣe pataki julọ fun awọn oluranlowo AI ti o nilo lati sanwo fun API, data, iṣiro tabi awọn irinṣẹ AI programmatically, laisi didasilẹ metadata ihuwasi .

### Àwọn Ànímọ́ Pàtàkì

- ** Fi idogo kan** sori-agbegbe (~75 aaya fun idaniloju Zcash)
- **Awọn ibeere lẹsẹkẹsẹ ti ko ni opin** lẹhin ṣiṣi akoko, ifọwọsowọpọ pq-awọn ibeere asopọ odo kan
- **Isanwo ti a fi pamọ** ṣe àdàkọ oluranlowo, olugba, iye owo ati akọsilẹ nipa lilo ilana Orchard Zcash's
- **Isanwo ti o ni imọlẹ** lo awọn adirẹsi T-ni idahun fun idena atunṣe laisi asiri kikun
- **Spec-compliant**,  HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` ìwárí

---

## Kí nìdí tí a fi ń ṣe ìsanwó ààbò fún àwọn aṣojú AI?

Fun awọn aṣoju AI ti n ṣakoso ṣiṣan iṣẹ ifura, iwadii ofin, ibeere iṣoogun, itupalẹ owo, oye ifigagbaga fun ** gbogbo isanwo ilu jẹ itankale metadata**. Zimppy nikan ni ọna sisan MPP eyiti o jẹ ** ikọkọ nipasẹ aiyipada **.

### Àkọsílẹ̀ Ìfiwéra Ìpamọ́-ẹni

| Ohun ìní | Àwọn ẹ̀wọ̀n gbogbogbòò (USDC, ETH) | A fi ààbò bo Zimpy | Zippy Transparent |
|---|---|---|---|
| **Oluranṣẹ** | A le ri | Ti fi àkọpamọ́ | A le ri |
| **Olùgbà** | A le ri | Ti fi àkọpamọ́ | Ìpèníjà kọ̀ọ̀kan (a kò lè so pọ̀ mọ́ra) |
| **Iye** | A le ri | Ti fi àkọpamọ́ | A le ri |
| **Ìrántí** | A le ri | Ti fi àkọpamọ́ | N/A |
| **Ààbò Àtúnṣe** | None | Ìsopọ̀mọ́ àkọsílẹ̀ | Àdírẹ́sì T fún ìpèníjà kọ̀ọ̀kan |
| **Àpẹẹrẹ Lilo Iṣẹ** | A le sopọ̀ mọ́ | Ikọkọ | A kò le sopọ̀ mọ́ (àdírẹ́sì tuntun) |

### Ìṣòro Àìlèfòye-wí, Tí Àwọn Iṣẹ́ Tó Ń Ṣẹ̀ Láàárín Èèyàn Máa Ń Yanjú

> "Ṣùgbọ́n Zcash ní ìgbà ìdìpọ̀ 75-ìkejì".*

** Awọn akoko yanju eyi.** Idaduro on-chain ṣẹlẹ gangan ni ẹẹkan** lori idogo. Gbogbo ibeere ti o tẹle jẹ lẹsẹkẹsẹ.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

** Sanwo lẹẹkan, pe lẹsẹkẹsẹ, gba pada iyipada.** Iwọn akoko fun ibeere jẹ odo.

---

## Àkọsílẹ̀ Ìsanwó Ẹrọ (MPP)

Àdéhùn Ìsanwó Ẹ̀rọ (MPP) jẹ́ ìlànà tí ó wà nípò-ìṣedégbé èyí tó ń fún àwọn aṣojú sọfitiwia aládàáṣe láyè láti ṣàwárí, jíròrò àti mú ìnájà sí pàṣípààrọ̀ owó fún ààyè API láìní ìrànlọ́wọ́ ènìyàn.

### Bawo ni MPP ṣe ṣajọpọ pẹlu awọn API

MPP tẹlé ìtòlẹ́sẹẹsẹ HTTP **402 Payment Required**:

1. **Aṣoju beere** ohun elo kan lati opin API ti o sanwo.
2. ** Olùpèsè dáhùn** pẹ̀lú: `402 Payment Required` + ìwé ìdánwò tí wọ́n fọwọ́ sí (iye owó, ẹni tó máa gbà á àti àkọsílẹ̀).
3. **Aṣoju sanwo** nipa lilo ọna isanwo ti o ni ibamu (fun apẹẹrẹ, Zimppy shielded Zcash).
4. **Aṣoju tún ìbèèrè náà ṣe** pẹ̀lú: `Authorization: Payment {txid}`.
5. ** Olùgbàṣe ṣayẹwo** ìsanwó náà nípasẹ̀ ẹ́rọ-ìfiwéra (àtúnkọ Orchard IVK, iye + àyẹwò àkọsílẹ).
6. ** Olùpèsè dáhùn** pẹ̀lú: `200 OK` + a `Payment-Receipt` orí.

### Ìmúṣẹ Àkọsílẹ̀-Àkànṣe

- **HMAC-SHA256** ìforúkọsílẹ̀ ìpèníjà
- **RFC 9457** àwọn ìdáhùn àṣìṣe tí ó wà ní ìsopọ̀
- **`/.well-known/payment`** ìparí fún àwárí ọ̀nà ìṣúná owó tí ó ṣe àfọwọ́kọ.
- **Orchard IVK** (Incoming Viewing Key) fún ìmúdájú owó-ìsanwó lápá ààrò láìfi àwọn kókó ọ̀nà ìṣúnná owó hàn.

---

## Bí Zimppy Ṣe Ń Ṣiṣẹ́

### Àwọn Ìpàdé (A Gbà Á Láyè)

Awọn akoko jẹ awoṣe ibaraenisepo akọkọ. Aṣoju naa fi idogo kan silẹ lori-agbegbe lẹẹkan, gba ami ti o ni ẹri, ati lo fun gbogbo awọn ibeere atẹle pẹlu alafowo zero .

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

** Ti o dara julọ fun:** Awọn ipe API igbohunsafẹfẹ giga, inference LLM, awọn ibeere data ti a tunṣe.

---

### Ìṣàn-ánáàrin

Àkójọ ìsọfúnni tí a fi owó san fún ọ̀kọ̀ọ̀kan ti wọ́n ń gbé jáde lórí àwọn Ìṣẹ̀lẹ̀ Tí Olùránṣẹ́ Fi ránṣẹ́ (SSE) **. Ẹrọ-ìpèsè náà máa n yọ iye tó wà nínú ìpàdé kúrò ní òṣùwọ̀n ọrọ tàbí àmì kan tí ó gba ààyè láti tẹ ẹ lọ́rùn.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

** Ti o dara julọ fun:** LLM awọn idahun ṣiṣan, awọn ifunni data akoko gidi, sanwo-per-token AI irinṣẹ.

---

### Owó ìtanràn

Owo ti o ni aabo kan fun ibeere. Gbogbo HTTP 402 ṣiṣan jẹ ṣiṣe nipasẹ ipe kọọkan. Dara nigbati awọn ibeere ba wa diẹ tabi iye giga.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

** Ti o dara julọ fun:** Awọn ibeere ọkan-ni iye giga, awọn ipe API ti ko ṣe deedee, opin data ipari.

---

## Lo Awọn Ọran & Àpẹẹrẹ

### 1. Ẹ̀dá oníṣe AI

Aṣoju AI ti ofin beere ibi ipamọ data idajọ kan. Lilo awọn akoko aabo Zimppy, boya idanimọ ile-iṣẹ aṣofin tabi awọn ibeere pato ko han lori pq - daabobo ẹtọ agbẹjọro-onibara ni ipele amayederun.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Agba fun Medical Ibeere Pipeline

A medical diagnostic agent queries multiple clinical databases. Shielded payments ensure patient query patterns are not linkable across providers.

### 3. Olùṣirò Ìwádìí Nípa Owó-Ilé

Aṣoju iṣowo algorithmic sanwo fun awọn API data ọja akoko gidi. Awọn sisanwo ṣiṣi lo T-adiresi tuntun fun ipenija, idilọwọ ibajọpọ awoṣe lilo kọja awọn olupese data.

### 4. MCP Tool Server, Paid AI Awọn irinṣẹ

Olùgbéejáde MCP (Model Context Protocol) máa ń fi àwọn irinṣẹ́ AI tí wọ́n sanwó síta. Gbogbo ohun èlò tó bá lo óo mú kí owó Zimppy gba, èyí á sì jẹ ki ọjà kan ti agbára AI ṣe àtúnṣe rẹ̀ láti lè rí owó gbà.

### 5. LLM Summarizer, Pay-Per-Token (ìdánwò owó fún ẹyọ kan)

Iṣẹ-iṣẹ akopọ LLM gba awọn aṣoju fun ami iṣelọpọ nipasẹ ṣiṣan SSE, pẹlu iyokuro iwontunwonsi laifọwọyi ati agbapada ti o ko lo iye to san tẹlẹ.

---

## Ìmúṣẹ ìtòlẹ́sẹẹsẹ náà

### Node.js / TypeScript (ì í ì ë ¤)

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Ìdàrọ́

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Ṣiṣeto Iwe-owo Zimppy naa

Zimppy CLI n pese wiwo apamọwọ kikun. Gbogbo awọn aṣẹ wa nipasẹ: `npx zimppy`.

### Ìgbésẹ̀ 1: Ṣídá Àpamọ́ kan

```bash
npx zimppy wallet create
```

Ó ń mú kókó ìdìkọ̀sílẹ̀ jáde, ó sì fi àlàfo rẹ hàn. Fi èyí pamọ́ ní ibi tí kò léwu - a ò lè rí i padà bí o bá sọnù.

### Ìgbésẹ̀ 2: Ṣayẹwo Adirẹsi Rẹ àti Owó Tó Wà Nílẹ̀ Ẹ

```bash
npx zimppy wallet whoami
```

Displays your **Unified Address (UA)**, **T-address**, current balance, and active network.

```bash
npx zimppy wallet balance --all
```

Ó fi àlàfo ìsókè-sílẹ̀ fún gbogbo àkọọ́ ZIP-32 hàn.

### Ìgbésè 3: Fi Owó Sínú Àpò Ẹ̀rọ Rẹ sílò

Send ZEC to your Unified Address from any Zcash-compatible wallet or exchange. Shielded deposits go directly to your Orchard account.

### Ìgbésẹ̀ 4: Fi owó ránṣẹ́ àti dídáàbò bò ó .

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

### Igbesẹ 5: Ṣiṣe Ohun elo Owo-Ohun-iṣẹ Kankan

```bash
npx zimppy request <url>
```

Yíṣe àdáṣiṣẹ́ 402 -> sanwó -> tún gbìyànjú ìtòlẹ̀sẹẹsẹ náà. Àwọn ìgbòkègbodò ni a ṣí tí wọn sì ń ṣakoso ní ọ̀nà àìríranjú-ọkàn.

---

## Ṣíṣàtúnṣe Zimppy - Ẹ̀rọ-ìmọ́ ìsọfúnni (SDK) TypeScript

### Olùránisẹ̀rọ TypeScript - Aṣọ́ra

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

** Àwọn kókó pàtàkì:**
- `zcash({ wallet: 'server' })` ó ń fi àpò-ìpamọ́ tí a ṣe fún àwọn olùgbàlà kún un.
- `mppx.charge()` ṣe àbójútó gbogbo 402 ìpèníjà/ìwádìí ìgbé ayé.
- `result.withReceipt()` ó so ìwé ìdánimọ̀ owó ìdìbò sí ìdáhùn náà.

---

### Olùránṣẹ TypeScript - Òrìsàjúwòrán-ìmọ̀lẹ́yẹ

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Ìdánwò kọ̀ọ̀kan máa ń mú àdírésì T tuntun jáde, èyí tí yóò jẹ́ kí àwọn ìbéèrè fún ìsanwó kò lè so pọ̀ mọ́ gbogbo ìgbà tó bá wà.

---

### Àgbàlá TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Àwọn oníbàárà ń gba ìsọfúnni lọ́wọ́ àwọn èèyàn. `402` àwọn ìdáhùn, ṣí ìtòlẹ́sẹẹsẹ kan nídìí ara rẹ̀, kí ó sì tún gbìyànjú ìbéèrè náà - kòkódì tí ń pè ò nílò àlàyé pàtó fún owó-sanwó.

---

## Ṣíṣàtúnṣe Zimppy - Rust SDK

### Olùpèsè Rust (Axum)

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

** Àwọn kókó pàtàkì:**
- `MppCharge<Price>` jẹ ohun ti Axum extractor eyi ti o ṣayẹwo owo ṣaaju ki awọn oniṣowo ṣiṣe
- `WithReceipt` ó fi àkájọ owó ìdánimọ̀ dídáhùn náà sínú èsì ìsanwó tí a kọ ní èdè kíríkítọ́òfín.
- `ChargeConfig` ṣe àlàyé àwọn ìlànà tí ó wà fún ìsúnniṣe owó - le jẹ́ ti ìṣesí-agbára tó dá lórí àwọn paramítà ìbéèrè.

---

### Olùgbéejáde Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` ó ń mú kí ààrò HTTP èyíkéyìí ní ìtọ́jú 402 tí a ṣe lóòtọ, ìṣàkóso ìgbésẹ̀ àti ìmúṣẹ owó Zcash.

---

## Àkọlé CLI

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

## Àwọn Ànímọ́ Pàtàkì Rẹ̀

### Àwọn Wàléètì Àṣojú-Ìbílẹ̀

Zimppy wallets are designed for programmatic use by AI agents - not human-managed browser extensions. Keys are managed via the CLI or SDKs, accounts can be rotated via **ZIP-32 account derivation**, and the wallet supports fully automated payment flows without human approval per transaction.

### Atilẹyin Awọn aṣoju pupọ-Awọn Ẹrọ

Awọn aṣoju pupọ le ṣiṣẹ lati inu apamọwọ kanna nipa lilo **ZIP-32 iyipada iroyin** - olúkúlùkù alaṣẹ gba akọọlẹ tirẹ pẹlu titele iwontunwonsi ti o ya sọtọ, agbara gbigbe-iṣowo agbelebu ati ijabọ iwontuna fun gbogbo iwe. Eyi n jẹ ki iṣakoso ọkọ oju omi ọpọlọpọ awọn onisegun lati ipilẹ apo kan ṣoṣo .

### Awọn Iṣowo Zcash ti o ni aabo Patapata (Orchard)

Shielded payments use Zcash's **Orchard protocol** - the latest and most secure shielded pool. The server verifies payments using an **Incoming Viewing Key (IVK)**, which can decrypt received notes without exposing the spending key. Replay attacks are prevented via **memo binding** - each challenge embeds a unique `zimppy:{challenge_id}` Àkọsílẹ̀ tí a fi ìtumọ̀ àdììtú ṣètẹ́wọ̀n.

### Awọn akoko , Zero-Per-Request latency

Awọn akoko faaji decouples awọn lori-ori ijẹrisi duro lati fun ibeere idaduro. lẹhin kan nikan ohun (~ 75 aaya), gbogbo nigbamii ti o ni oluwa-token ìbéèrè wa ni sin lẹsẹkẹsẹ pẹlu ko si blockchain ibaraenisọrọ titi igba pipade.

### Ìṣàn , Owó-Láti-Àmì Àpamọ́

Atilẹyin abinibi ** SSE (Awọn iṣẹlẹ ti a firanṣẹ olupin)** jẹ ki o sanwo-fun akoonu to ṣe iwọn. O dara julọ fun awọn API inference LLM nibiti ipari abajade wa ni iyipada ati isanwo yẹ ki o ṣafihan agbara gangan.

### Ìmúṣẹ Àkọsílẹ̀-Àkànṣe

- **HMAC-SHA256** ìforúkọsílẹ̀ àwọn ìpèníjà dídènà èké ṣíṣe
- **RFC 9457** ìmúdàgba àṣìṣe tí a ṣe fún lílo àwọn àṣìṣẹ́ tó ṣeé bá lò pọ̀.
- **`/.well-known/payment`** fun awari ọna isanwo laifọwọyi nipasẹ eyikeyi aṣoju ti o ni ibamu pẹlu MPP.

---

## Ìṣẹ̀dá ilé-ìkọ́lé

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

### Àwọn Ìkáwọ́ṣe Ẹ̀ka-ìpínlẹ̀

**`zimppy-core`** - Awon ohun ti o wa ni cryptographic. O nlo awọn apoti Orchard decryption nipa lilo IVK olupin, parsing memo, atunṣe idaabobo loji ati idanwo ipenija. Ti a kọ sinu Rust fun iṣẹ ṣiṣe ati deedee.

**`zimppy-wallet`** - A abinibi Zcash apamọwọ agbara nipasẹ `zingolib`. Ń ṣakoso àwọn kókó, àkọọ́lẹ̀, àlàfo tí a fi ojú pa/tí ó ṣe kedere àti ìmúṣẹ ìṣòwò.

**`zimppy-rs`** - The Rust SDK. Provides `ChargeMethod`, `SessionMethod`, àti `PaymentProvider` àwọn ohun èlò tó ń mú èròjà jáde láti ara ẹran, àti àwọn ohun ìmúra tí Axum fi ṣe é (`MppCharge`, `WithReceipt`) fún ìkórajọ àwọn ohun èlò tí ó jẹ́ ti erogónómì.

**`zimppy-napi`** - NAPI-RS ìlépa tí ó fi Rust kókó hàn fún Node.js, tó jẹ́ kí TypeScript SDK lo ẹ̀rọ ìgbàkòwé kan náà láìlo àwọn àlàfo Zcash nínú JavaScript.

**`zimppy-ts`** - The TypeScript SDK. Wraps NAPI ìsopọ pẹlu idiomatic async/await APIs fun idiyele, akoko, ati SSE ṣiṣan sisanwọle.

**`zimppy-cli`** - Ẹrọ àpò-ìpèsè àti ọ̀nà ìbèèrè. Ó ń ṣe atilẹyin fún owó sanwó (402 -> sanwó -> tún gbìyànjú), ìṣàkóso ìgbà, ati gbogbo iṣẹ́ àpò náà.

---

## Àpẹẹrẹ & Awọn Demo

| Àpẹẹrẹ | Àpèjúwe |
|---|---|
| `examples/fortune-teller/` | Àwọn àfihàn gbígbà agbára, ìgbà, àti ìṣàfihàn ìṣàn - Olùpèsè Rust + oníbàárà |
| `examples/llm-summarizer/` | Àfihàn ìṣàfihàn ìṣàn LLM fún owó-fún-àmì-ìsanwó |
| `examples/mcp-server/` | Ẹ̀rọ olupin MCP pẹlu awọn irinṣẹ AI ti a sanwo |
| `examples/ts-server/` | Ìmúṣe ìtọ́kasí olupin TypeScript MPP |

---

## Ohun Tó Wà Nínú Ìwé Náà - Àkópọ̀ Àwọn Apá Rẹ̀

| Ẹ̀yà ara | Àpèjúwe |
|---|---|
| **Àwọn Àkókò** | Idogo lẹẹkan, awọn ibeere fun onigbese lẹsẹkẹsẹ, agbapada ni pipade |
| **Ṣíṣànwọle** | Akoonu ti a wọn fun isanwo-fun-ami lori SSE |
| **Gbigba agbara** | Isanwo ti a daabobo tabi ti o han gbangba fun ibeere HTTP (402 flow) |
| **Awọn isanwo ti o han gbangba** | Àwọn àdírẹ́sì T pẹ̀lú ìdènà àtúnṣe fún ìpèníjà kọ̀ọ̀kan + àṣẹ ààbò |
| **Àkọọ́lẹ̀ Onírúurú** | Ìyípo àkọọ́lẹ̀ ZIP-32, àwọn ìgbesẹ̀ àkọọ́lẹ̀-àgbékalẹ̀, àwọn ìwọ̀n àkọọ́lẹ̀-àgbéka .. |
| **Àpò CLI** | Firanṣẹ, daabobo, gbe, iwọntunwọnsi --gbogbo, whoami, sanwo laifọwọyi |
| **SDK Meji** | TypeScript ati ipata |
| **Ó bá ìlànà pàtó mu** | Àwọn ìpèníjà HMAC-SHA256, àwọn àṣìṣe RFC 9457, `/.well-known/payment` àwárí |

---

*Fún àlàyé síwájú sí i, lọ wo: [ì í 'ì ¤í ¬ë¥1⁄4 ë§¤ê° .](https://zimppy.xyz)*

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Àwọn àpamọ́ owó](/using-zcash/wallets)  Awọn apamọwọ Zcash ti o ṣe atilẹyin awọn iṣowo aabo
- [Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](/using-zcash/shielded-pools)  Bí àwọn ìnáwó tí Orchard fi ààbò bo ṣe ń dáàbò bò àwọn data owó-ìsanwọlé.
- [Àwọn Ẹ̀rọ Ìsanwó](/using-zcash/payment-processors)  Àwọn ọ̀nà míràn láti gbà owó Zcash
- [Awọn ohun-ini ti a fi aabo Zcash pamọ](/zcash-tech/zcash-shielded-assets)  ZSAs ati ọjọ iwaju ti eto iṣeto Zcash
- [Àwọn Ìpèsè Àjọṣe](/zcash-community/community-projects)  Àwọn iṣẹ́ àdáni Zcash púpọ̀ sí i
