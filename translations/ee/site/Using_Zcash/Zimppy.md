<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz (Adzesiwo ƒe ŋkɔwo)

## TL;DR

- Zimppy nye nuxexlẽ ƒe mɔnu si le agbe me koŋ na AI dɔwɔlawo to Zcash's Machine Payment Protocol (MPP) dzi.
- ** Deposit once** on-chain (~75 seconds), then make ** unlimited instant requests** with no per-request blockchain interaction * Ðe ga zi ɖeka le kɔsiɖa dzi, eye nàna ame sia ame nabia nu enumake*
- Xexea me katã ƒe nufialawo kple ame siwo le wo dome la lɔ̃na be yewoazã Zcash (Orchard) tsɔ axe fewo. Woɖea dzesi na amewo to nyatakaka si woŋlɔ ɖi dzi, eye wokpɔa ga home si woaxe ɖe dɔwɔla aɖe ŋu hã dzea sii bɔbɔe.
- Ewɔa dɔ kple TypeScript kpakple Rust SDKs hena ɖekawɔwɔ bɔbɔe le AI pipelines kple API serverwo me.
- Edea blibo na LLM APIwo, Data Marketplaces kple MCP dɔwɔnu ƒe servers** kpakple m2m fexexenu ɖesiaɖe zazã.

---

> **Zimppy** nye Machine Payment Protocol (MPP) fexeɖoɖo si le Zcash me, eye wòkpena ɖe ga siwo woxea mɔ na kple esiwo dzi wokpɔna la siaa ŋu. Deposit once on-chain, then make unlimited instant bearer requests with no per-request chain interaction.

---

## Eƒe Akpawo

1. [Nukae nye Zimppy.xyz?](#what-is-zimppyxyz)
2. [Nukatae Woɣla Ame Siwo Wɔa Amegbetɔmenunya Ƒe Dɔwɔƒewo ƒe Fetu?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP) Dzadzraɖowɔƒe ƒe Fewo Gbɔkpɔdɔdzikpɔƒea](#machine-payment-protocol-mpp)
4. [Alesi Zimppy Wɔa Dɔe](#how-zimppy-works)
   - [Kpekpewo (Aɖaŋuɖoɖo)](#sessions-recommended)
   - [Gbeɖoɖoɖi](#streaming)
   - [Fetu si woxɔna ɖe eta](#charge)
5. [Zã Nuteƒekpɔkpɔwo Kple Kpɔɖeŋuwo](#use-cases--examples)
6. [Ðoɖowɔƒewo](#installation)
7. [Zimppy Akpataa Ðoɖo](#setting-up-the-zimppy-wallet)
8. [Zimppy ƒe Ŋutilãdɔwɔwɔ](#integrating-zimppy--typescript-sdk)
   - [Subɔvi (Kpɔm)](#typescript-server--shielded)
   - [Server (Kpɔɖonu)](#typescript-server--transparent)
   - [Ame si le xɔme](#typescript-client)
9. [Zimppy - Rust SDK ƒe ƒokpliwɔwɔ](#integrating-zimppy--rust-sdk)
   - [Subɔvi (Axum)](#rust-server-axum)
   - [Ame si le xɔme](#rust-client)
10. [CLI Ŋkɔwo](#cli-reference)
11. [Eƒe Nɔnɔme Veviwo](#key-features)
12. [Xɔtutuwo](#architecture)
13. [Kpɔɖeŋuwo Kple Numedzodzrowo](#examples--demos)

---

## Nukae nye Zimppy.xyz?

Zimppy.xyz nye nuxexlẽ ƒe ɖoɖo si le agbe me koŋ eye wowɔe ɖe AI dɔlawo kple mɔ̃-to-mɔ̃ (M2M) dɔwɔwɔ ŋu tẽe la dzi. Ewɔa Mɔ̃wo Ƒe Fetuɖoɖo Ŋuti Ðoɖoɖi (MPP) ŋudɔ tsɔna zãa Zcash abe ga si wotsɔ wɔa eƒe dɔwɔŋutɔe ene, esia wɔnɛ be wote ŋu kpɔa teƒe na wo ɖokui nyuie hewɔa mɔnu siwo nana wokpɔa nuwo gbɔ bɔbɔe hã.

To vovo na blockchain ƒe fexeɖoɖo si me wokpɔa nu sia nu le ame dome la, Zimppy ya to ɖoɖowɔɖi aɖe dzi eye wòɖea didi ɖewoɖewoe ɖa. Esia wɔe be ele etɔxɛ ŋutɔ hena AI dɔwɔlawo siwo hiã APIwo, nyatakakawo, kɔmpiuta alo AI dɔwɔnu aɖewo zazã atsɔ axe fea wo ɖokui ŋu dɔe evɔ womana amewo nanya woƒe nuwɔna ŋuti metadata o.

### Eƒe Nɔnɔme Veviwo

- **Deposit once** on-chain (~75 seconds for Zcash confirmation) (Ðe ga ɖe nu zi ɖeka le kɔsiɖa me)
- **Aƒeme didi siwo me seɖoƒe meli na o** le kpekpea ƒe gɔmedzedze megbe, nuwɔwɔ aduadu aɖeke mele biabia ɖesiaɖe ŋu o.
- **Gbagbadzedzewo** tsɔa Zcash ƒe Orchard ɖoɖowɔɖi ɖea ame si ɖo ga ɖe wo me, amesi xɔe kple eƒe homea dzi kpɔtɔna le adzame.
- **Tagbanɔamedziwo ƒe fexexlẽ** zãa T-adrɛs siwo le te ɖe kuxi ɖesiaɖe dzi tsɔ xea mɔ na wo me toto ake evɔ womena ame aɖeke ŋuti nyatakaka o.
- **Spec-me nuwɔwɔ**, HMAC SHA256 ƒe kuxiwo, RFC 9457 vodadawo, `/.well-known/payment` nu yeyewo kpɔkpɔ gɔme

---

## Nukatae Woɣla Ame Siwo Wɔa Amegbetɔmenunya Ƒe Dɔwɔƒewo ƒe Fetu?

Le AI dɔwɔla siwo wɔa nu le dɔwɔɖoɖowo, senyawo me numekukuwo, atikewɔwɔ ŋuti nyawo biabia, gaŋutidɔdrɔ̃ kple hoʋiʋli ƒe nyagbɔgblɔ ŋu la, "xexea me nudzɔdzɔ ɖe sia ɖe nyea metadata si woɖea ɖa". Zimppy koe nye MPP-fetu ɖoɖo ɖeka kolia si dzi wotona ƒoa asi ɖo be enye ameɖokui tɔ.

### Ame Ŋuti Nyawo Gbɔ Kpɔkpɔ Ƒe Afɔɖeɖe ƒe Kpɔdzesi

| Nunᴐamesi | Dutoƒo Kɔsɔkɔsɔwo (USDC, ETH) | Zimppy ƒe Akpoxɔnu | Zimppy Transparent si me woɖea nu le |
|---|---|---|---|
| **Ame si ɖoe ɖa** | Nukpɔkpɔ | Wotsɔ nya ɣaɣlawo ŋlɔe | Nukpɔkpɔ |
| **Amexɔla** | Nukpɔkpɔ | Wotsɔ nya ɣaɣlawo ŋlɔe | Kuxi ɖesiaɖe (si womate ŋu aƒo ka na o) |
| **Home** | Nukpɔkpɔ | Wotsɔ nya ɣaɣlawo ŋlɔe | Nukpɔkpɔ |
| **Ŋkuɖodzinya** | Nukpɔkpɔ | Wotsɔ nya ɣaɣlawo ŋlɔe | N/A |
| **Gbugbɔgaƒoƒo Takpɔkpɔ** | None | Memo ƒe babla | T-adrɛs si nye kuxi ɖesiaɖe |
| **Subɔsubɔdɔ Zazã ƒe Kpɔɖeŋu** | Woate ŋu atsɔ kadodo aɖo wo nɔewo gbɔ | Ame ŋutᴐ ƒe | Womate ŋu aƒo ka na ame o (adr yeye) |

### Woɖe Nuwo Gbɔ Kpɔkpɔ ƒe Kuxia Ða To Ŋkuléle Ðe Eŋu Me

> Gake Zcash ƒe ɣeyiɣi didi nyea sekɛnd 75". *

** Sessionwo kpɔa nya sia gbɔ.** Ne ame aɖe ɖo ga ɖe gadzraɖoƒe la, ɖeko wòalala ɣeawokatãɣi. Biabia siwo va le emegbe katã nyea nu si wowɔna enumake.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Xe ga zi ɖeka, yɔ enumake eye nàxɔ gaku la.** Ga ƒe didime le dɔbiagbalẽa dzi nye 0.

---

## Machine Payment Protocol (MPP) Dzadzraɖowɔƒe ƒe Fewo Gbɔkpɔdɔdzikpɔƒea

Machine Payment Protocol (MPP) nye ɖoɖo si dzi wotrɔ asi le be wòana mɔ̃ɖaŋunu siwo wɔa dɔ tso wo ɖokui ŋu la (AI dɔwɔlawo, bɔtwo kple nuŋlɔtiwo) nate ŋu akpɔ nu adze sii ahawɔ ɖeka kpli ame bubuwo eye woaxe fe ɖe API ƒe mɔnu sia zazã ta. Ame aɖeke menɔa eme o.

### Alesi MPP wɔa dɔ le APIwo me

MPP zɔna le HTTP **402 Payment Required** ƒe ɖoɖo nu:

1. **Agent biaa** nu tso API ƒe nuwuwu si woxe fe na la gbɔ.
2. **Subɔla ɖo eŋu** kple: `402 Payment Required` + agbalẽ si dzi woŋlɔ nu ɖo (xexea, amesi woxɔe na, nyatakaka).
3. **Agent la xea fe** to mɔnu si sɔ dzi (le kpɔɖeŋu me, Zimppy ƒe Zcash si ŋu wotrɔ asi le).
4. **Agent la gbugbɔ biaa nya sia le ame si gbɔ wòbiae be wòaɖo ye ŋu. `Authorization: Payment {txid}`.
5. **Subɔla la léa ga si woxe ɖe asi me to asitelefon dzi (Orchard IVK ƒe nya ɣaɣlawo, agbɔsɔsɔ kple nyatakakawo).
6. **Subɔla ɖo eŋu** kple: `200 OK` + a `Payment-Receipt` ta. - Kpɔ etenuŋɔŋlɔa ɖa.

### Numeɖeɖewo Dzi Wɔwɔ

- **HMAC-SHA256** nyaŋuɖoɖo ƒe asiɖeɖe ɖe ame ŋu
- **RFC 9457** vodada ƒe ŋuɖoɖowo le ɖoɖo nu.
- **`/.well-known/payment`** nuƒleƒe si wotsɔna kpɔa mɔ̃ siwo dzi woato awɔ fewo la le eɖokui si.
- **Orchard IVK** (Incoming Viewing Key) na server-side payment verification si me woana gaƒlelawo ƒe safuiwo nado o.

---

## Alesi Zimppy Wɔa Dɔe

### Kpekpewo (Aɖaŋuɖoɖo)

Session nye nuwɔwɔ kple ame ƒe ɖoɖo gbãtɔ. Ame si wɔa dɔ sia dea ga home aɖe asi na wo zi ɖeka, eye ne exɔ eƒe akpa dzi la, edoae ɖe esi me wòna nyatakakawo le ɣeyiɣi kpui aɖe megbe ko hafi va zãnɛ tsɔ ɖoa nyawo ɖa.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Eyo na:** High-frequency API calls, LLM inference, repeated data queries.

---

### Gbeɖoɖoɖi

Pay-per-token metered content delivered over **Server-Sent Events (SSE)**. Server la ɖea nu le session balance dzi ɖe nya alo tokens si woɖona ta.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Nɔnɔme nyui na:** LLM ƒe nyaŋuɖoɖowo, ɣeyiɣi ŋutɔŋutɔ me nyatakaka siwo woɖena ɖe ame dzi, kple nuwɔwɔ si de blibo ŋuti dɔwɔnu siwo wotsɔna xea fe le ga ta.

---

### Fetu si woxɔna ɖe eta

Axe ɖeka si dzi woxɔna ɖo le biabia ɖesiaɖe ta. HTTP 402 ƒe ɖoɖo blibo la katã yia edzi ɖe yɔyɔ sia ŋu zi ɖeka. Edea ame ne ebiabiawo mebɔ o alo woƒe asixɔxɔ sɔ gbɔ ŋutɔ.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Eyo na:** Nu siwo hiã vevie, nu ɖekaɖekawo wɔwɔ, API ƒe yɔyɔ si mebɔ o, kple nyatakaka vevi bubuwo.

---

## Zã Nuteƒekpɔkpɔwo Kple Kpɔɖeŋuwo

### 1. Ŋutete si Le Ame Si

Aɖaŋuwɔla si zãa numekugbalẽwo la bia nya tso ʋɔnudrɔ̃nya siwo ŋu wowɔ ɖoɖo ɖo le se nu me. Ne Zimppy ƒe dɔwɔƒe na wo ŋuti nyatakakawo va dze go ko la, womate ŋu akpɔ ame alo dɔdzikpɔlawo o - esia kpɔa senyawo kple nyawo dzi nyuie le mɔɖaŋunuwo dome.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Dɔwɔƒe si kpɔa atikewo ƒe nyawo gbɔ le Internet dzi.

Atikeŋutinunyala siwo kpɔa dɔlélewo gbɔ la wɔa numekuku le atikewɔƒe geɖewo. Fetu si woxe ɖe dɔdala ŋu nana be womate ŋu atsɔ dɔnɔ ƒe biabia ade asi na dɔwɔha bubu aɖeke o.

### 3. Ganyawo Ŋuti Numekulawo ƒe Dɔwɔƒe

Eʋevi si wɔa dɔ le mɔ̃ dzi la xea fe ɖe asitsatsa ŋuti nyatakakawo ƒe API siwo li ɣeyiɣi ŋutɔŋutɔ me. Fetu yeyewoe wozãna tsɔ kpɔa ga, eye esia wɔnɛ be ame aɖeke megatea ŋu zãa eƒe ŋkɔawo abe ale si woazãe ene o.

### 4. MCP Tool Server, Woxe fe ɖe AI dɔwɔnuwo ŋu.

MCP (Model Context Protocol) server aɖe ɖea AI dɔwɔnu siwo woxe fe na la fiana. Wo dometɔ ɖesiaɖe ƒe ŋkɔyɔna naa Zimppy xɔa ga, si wɔnɛ be wote ŋu kpɔa dɔwɔƒe aɖewo le afisi wokpɔa woƒe ŋutetewo dzi wɔa dɔe.

### 5. LLM Summarizer, Pay-Per-Token (Fetu Ðe Dzesi Ta)

LLM ƒe nuƒo kpuiwo ɖoɖo dɔwɔlawo xɔa fe ɖe woƒe dɔwɔna me nudzɔdzɔwo dzi to SSE-dɔwɔƒe si le mɔ zɔm la dzi, eye woɖea ga siwo susɔ na dɔa wɔwɔ ɖa kple esiwo womezã o.

---

## Ðoɖowɔƒewo

### Node.js / TypeScript (Nɔvi . js kple Aƒegbalẽ)

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Dzatawo ƒe dzoxɔxɔ

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Zimppy Akpataa Ðoɖo

Zimppy CLI naa gaɖabawo ƒe nuƒomɔ blibo. Woate ŋu awɔ ɖoɖo ɖe wo katã ŋu to: `npx zimppy`.

### Afɔɖeɖe 1lia: Wɔ Gaƒoɖonu (Wallet) aɖe

```bash
npx zimppy wallet create
```

Enaa nya ɣaɣla siwo dzi nàŋlɔ nu ɖo eye wòɖea ame si nèdi be yeaɖe la fia. Dzra esia ɖo nyuie - ne ebu ko la, womagate ŋu agaxɔe o.

### Afɔɖeɖe 2: Dzro wò adrɛs kple ga si susɔ la me.

```bash
npx zimppy wallet whoami
```

Eɖea wò **Unified Address (UA)**, **T-address**, fifia ƒe ga si susɔ kple kadodo nyui me.

```bash
npx zimppy wallet balance --all
```

Efia ga si le ame sia ame ƒe asitsatsa me ɖe eƒe ZIP-32 ŋuti.

### Afɔɖeɖe 3: Na Ga Wò Gaku la Me .

Send ZEC to your Unified Address from any Zcash-compatible wallet or exchange. Shielded deposits go directly to your Orchard account.

### Afɔɖeɖe 4: Ðoɖo Gadzraɖoƒewo Kple Wobe Woazu Ame Siwo Dzi Wòato

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

### Afɔɖeɖe 5: Bia Be Woana Fetu Wò Ðokuiwòe

```bash
npx zimppy request <url>
```

Ewɔa 402 -> fewo -> gbugbɔdidi ƒe ɖoɖo blibo la dzi le eɖokui si. Woʋua kpekpeawo eye wowɔa wo ŋu dɔ nyuie.

---

## Zimppy - TypeScript SDK ƒe ƒokpliwɔwɔ

### TypeScript Server - Eʋeviwo

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

** Nya Vevi Siwo Le Eme:**
- `zcash({ wallet: 'server' })` la, ekɔa nu ɖe server ƒe gaɖivɔ si dzi woxɔa asi le ŋu.
- `mppx.charge()` Ewɔa 402 ƒe gbetɔame/dzidede agbe me katã dzi.
- `result.withReceipt()` tsɔa ga si wotsɔ nya ɣaɣla ŋlɔ la kpea ŋuɖoɖoa.

---

### TypeScript Server - Eʋegbewo

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Kuxi ɖesiaɖe naa "T-adres yeye" aɖe nɔa anyi, si wɔnɛ be womate ŋu atsɔ gabiawo ade kadodo me kple dɔwɔna bubuwo o.

---

### TypeScript Client (Akpavi)

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Ame si le nyaa sem la xlẽa nu siwo wòase. `402` Eʋua nyatakakawo, ʋuna nu le eɖokui si eye wògadzea agbagba ake - mehiã be ame aɖe naxe fe ɖe dɔdzikpɔƒea ƒe ŋkɔ ta hafi wòaxɔ eƒe numegbe o.

---

## Zimppy - Rust SDK ƒe ƒokpliwɔwɔ

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

** Nya Vevi Siwo Le Eme:**
- `MppCharge<Price>` enye Axum ƒe nugbugbɔŋlɔla si léa gaxe ɖe asi hafi xea mɔ na ame la be wòate ŋu awɔ dɔ sia.
- `WithReceipt` tsɔ nyaŋuɖoɖo la bla kple ga si woxe ɖe mɔ̃ dzi ƒe kpeɖodzinu.
- `ChargeConfig` eɖe asi le nuxexlẽ ƒe mɔ̃ ŋu - ateŋu anɔ te ɖe didiwo dzi.

---

### Rust Client la ƒe akpa si le eme:

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` enana HTTP client ɖesiaɖe wɔa 402 ƒe dɔwɔwɔ, ɖoɖowo dzi kpɔkpɔ kple Zcash-xefewɔ.

---

## CLI Ŋkɔwo

| Gbeɖeɖe | Nuɖᴐɖᴐ |
|---|---|
| `npx zimppy wallet create` | Wɔ safuiwo eye nàɖe nuku ƒe nyagbe afia |
| `npx zimppy wallet whoami` | Fia adrɛs (UA + T-addr), dadasɔ, network |
| `npx zimppy wallet balance --all` | Ga si susɔ ɖe gakɔnta ɖesiaɖe me ƒe mama |
| `npx zimppy wallet send <addr> <zat>` | Ðo ZEC si ŋu akpoxɔnu le alo esi me kɔ la ɖa |
| `npx zimppy wallet transfer <from> <to> <zat>` | Cross-account ememe ƒe asitɔtrɔ |
| `npx zimppy wallet shield` | Tsɔ ga siwo me kɔ la yi Orchard (si wotsɔ akpoxɔnu wɔe) |
| `npx zimppy wallet use <name>` | Trɔ gakotoku si le dɔ wɔm ƒe dzesidenu |
| `npx zimppy request <url>` | Auto 402 -> fe -> gbugbɔ te biabia |

---

## Eƒe Nɔnɔme Veviwo

### Agent-Native Wallets (Gadzraɖoƒe si Wozãna)

Zimppy wallets are designed for programmatic use by AI agents - not human-managed browser extensions. Keys are managed via the CLI or SDKs, accounts can be rotated via **ZIP-32 account derivation**, and the wallet supports fully automated payment flows without human approval per transaction.

### Kpekpeɖeŋu si Tso Ame Vovovowo Gbɔ

Ame geɖe ate ŋu awɔ dɔ tso gaɖaka ɖeka dzi to ZIP-32 ƒe asitelefonwo zazã me - ame sia ame kpɔ eƒe ŋutɔ tɔ kple akɔnta siwo le wo nɔewo gbɔ, nuxexlẽme si nyea akɔntabubu ɖe akpa ɖesiaɖe ta. Esia naa be woate ŋu akpɔ dɔwɔƒe geɖewo dzi tsoa gakpɔkpo ɖeka aɖe ko me.

### Zcash Dɔwɔɖui Siwo Woɣla Blibo (Orchard)

Wozãa Zcash ƒe Orchard protocol tsɔ kpɔa ga siwo woxe la ta. Eʋevi sia zãna Incoming Viewing Key (IVK) si ate ŋu aɖe agbalẽawo me eye womagblẽ nu le esiwo wotsɔ xe fewo o, be wòana ame nakpɔ woƒe numegbe kple nyatakakawo dzi ase ɖo. Wodzudzɔa nya ɖe amewo to mememabla alo mɔnu bubu aɖewo zazã dzi - wobua akɔntabubu ɖekaɖeka na agba ɖesiaɖe `zimppy:{challenge_id}` Edzena le nyatakaka si me nya ɣaɣlawo dze le.

### Session , Zero Per-Request Latency (Nuŋɔŋlɔwo ƒe Kpomevi Aɖeke Mele Wo Ŋu O)

Session architecture la ɖea on-chain confirmation wait (dzesi si le adzame) ɖa tso per-request latency gbɔ. Ne ame aɖe da ga ɖe edzi zi ɖeka ko vɔ (sekɛnd 75), woɖoa eƒe nu siwo katã wòbia be woaɖo eŋu na ye enumake eye womegadea asi blockchain me o va se ɖe esime sesia wu enu.

### Streaming , Pay-Per-Token (Fia Ðe Token Ðeka Dzi)

Native **SSE (Server-Sent Events)** support enables pay-per-token metered content. Ideal for LLM inference APIs where output length is variable and billing should reflect actual consumption. Edzena nyuie na LLM dedukɔ API siwo ƒe didime le tɔtrɔm eye fexexlẽa wòle be wòade nu eme ŋutɔŋutɔ la ŋu.

### Numeɖeɖewo Dzi Wɔwɔ

- **HMAC-SHA256** kpeɖeŋutɔ siwo dzi woŋlɔ ɖo be woatsri aʋatsoɖeɖe
- **RFC 9457** vodada ƒe ɖoɖowɔɖi si me woazã nuŋɔŋlɔwo le atsɔ awɔ dɔ kple ame bubuwo.
- **`/.well-known/payment`** na mɔ si dzi wotona xea fe le ame sia ame ƒe asitelefon me to MPP-nuwɔwɔ ɖe ɖoɖo nu la ŋu.

---

## Xɔtutuwo

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

### Dɔwɔƒe ƒe Agbanɔamedziwo

**`zimppy-core`** - Numeɖeɖe ƒe nu me. Ewɔa Orchard note decryption to server's IVK, memo parsing, replay protection logic kple challenge verification dzii. Woŋlɔe ɖe Rust be wòadze dɔwɔwɔ nyuie eye eƒe nyawo nanye nyateƒe.

**`zimppy-wallet`** - Zcash gaɖaba si dzi wotu eƒe dɔwɔɖoɖowo ɖo la le dɔ wɔm kple: `zingolib`Edzraa safuiwo, ga siwo le asitelefon dzi kple esiwo me woazã kɔmpiuta ɖo la ƒe dɔwɔna.

**`zimppy-rs`** - Rust SDK la. Enaa nu siwo hiã le asitelefon dzi kple esiwo me woazã kɔmpiutawo ɖo `ChargeMethod`, `SessionMethod`, kple `PaymentProvider` (Xum) ƒe nu siwo woɖea tso eme la me.`MppCharge`, `WithReceipt`) be woawɔ dɔ le asitelefon dzi.

**`zimppy-napi`** - NAPI-RS ƒe nubabla siwo na Rust me nyawo va le Node.js, si wɔe be TypeScript SDK la zãa cryptographic engine ma ke evɔ womagatsɔ Zcash primitives ake o.

**`zimppy-ts`** - TypeScript SDK. Etsɔ NAPI ƒe nubablawo kple async/await API siwo me nyawo to le agba, session, kple SSE streaming flows ŋu la ƒo xlãe.

**`zimppy-cli`** - Kɔmand-line wallet kple request tool. Ekpena ɖe auto-pay (402 -> pay -> retry), session management, kple wallet operations katã ŋu.

---

## Kpɔɖeŋuwo Kple Numedzodzrowo

| Kpɔɖeŋu | Nuɖᴐɖᴐ |
|---|---|
| `examples/fortune-teller/` | Fexexe, ɣeyiɣi, kple sisi ƒe wɔwɔfiawo - Rust server + client |
| `examples/llm-summarizer/` | Fexexe ɖe dzesi ɖesiaɖe LLM streaming demo |
| `examples/mcp-server/` | MCP dɔwɔnu ƒe dɔwɔƒe si me AI dɔwɔnu siwo woxea fe na le |
| `examples/ts-server/` | TypeScript MPP dɔdzikpɔla ƒe nufiame ƒe dɔwɔwɔ |

---

## Nu Siwo Le Eme - Eƒe Akpa Veviwo Ƒe Ŋutinya Kpuie

| Ŋutinu | Nuɖᴐɖᴐ |
|---|---|
| **Kpekpewo** | Deposit zi ɖeka, enumake bearer biabia, refund le nuwuwu |
| **Streaming** ƒe ʋuʋu** | Fexexe ɖe dzesi ɖesiaɖe ƒe mita me nyawo to SSE dzi |
| **Febubu** | Fexexe si wokpɔ ta na alo si me kɔ le HTTP biabia ɖesiaɖe me (402 ƒe sisi) |
| **Fexexe si Woxena le Gaglãgbe** | T-adrɛswo kple kuxi ɖesiaɖe gbugbɔgaƒoƒo mɔxexe + akpoxɔnu sedede |
| **Akɔntabubu Geɖe** | ZIP-32 gakɔnta ƒe tɔtrɔ, gakɔnta ƒe asitɔtrɔ le gakɔnta dome, ga si susɔ ɖe gakɔnta ɖesiaɖe me |
| **CLI ƒe Gakotoku** | Ðo ɖa, akpoxɔnu, tsɔtsɔ yi teƒe bubu, dadasɔ --wo katã, whoami, auto-pay |
| **SDK eve** | TypeScript kple Rust |
| **Spec-Sewɔtakpekpea** | HMAC-SHA256 ƒe kuxiwo, RFC 9457 ƒe vodadawo, `/.well-known/payment` nusi ŋu woke ɖo |

---

*Ne èdi nyatakaka bubuwo la, yi afii: [zimppy.xyz (dzidzimevi)](https://zimppy.xyz)*

---

## Axawo Siwo Do Ka Kple Wo Nɔewo

- [Gaɖakawo](/using-zcash/wallets)  Zcash ga si le asitelefon dzi siwo doa asi ɖe nuxexlẽ ŋu.
- [Ta Siwo Woɣla Ðe Aʋawɔnu Nu](/using-zcash/shielded-pools)  Alesi Orchard ƒe dɔwɔɖoɖowo kpɔa ga ŋuti nyatakaka ta
- [Fetuwo Wɔlawo](/using-zcash/payment-processors)  Mɔ bubu siwo dzi nàto axɔ Zcash-xexlẽfewo
- [Zcash-Dɔ Siwo Woɣla Ðe Ame Ŋu](/zcash-tech/zcash-shielded-assets)  ZSA kple etsɔme si me woazã Zcash le ɖoɖowɔɖi nu
- [Dukɔ Ƒoƒuawo ƒe Dɔwɔnawo](/zcash-community/community-projects)  Zcash ecosystem ƒe dɔ bubuwo wɔwɔ
