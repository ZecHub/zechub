<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz ƒe agbalẽ

## TL;DR

- **Zimppy** nye adzamenyawo gbã ƒe fexexe ƒe ɖoɖo na AI dɔwɔlawo zãa Zcash ƒe Mɔ̃ Fexexe ƒe Ðoɖo (MPP) .
- **De ga zi ɖeka** le kɔsɔkɔsɔ dzi (~ sɛkɛnd 75), emegbe nàwɔ **seɖoƒemanɔsitɔ enumake biabia** kple biabia ɖesiaɖe blockchain kadodo aɖeke o
- Doa alɔ **Zcash (Orchard)** fexexe siwo wokpɔ ta na bliboe — ame si ɖoe ɖa, amesi xɔe, ga home, kple nuŋlɔɖiwo katã nye nya ɣaɣlawo
- Ewɔa dɔ kple **TypeScript kple Rust SDKs** hena ɖekawɔwɔ bɔbɔe ɖe AI pɔmpiwo kple API dɔdzikpɔlawo me
- De blibo na **LLM APIwo, nyatakakawo ƒe asiwo, MCP dɔwɔnu dɔwɔƒewo**, kple M2M fexexe zazã ƒe nɔnɔme ɖesiaɖe

---

> **Zimppy** nye Machine Payment Protocol (MPP) fexexe mɔnu na Zcash si doa alɔ fexexe si wokpɔ ta na kple esi le gaglãgbe siaa. De ga zi ɖeka le kɔsɔkɔsɔ me, emegbe nàwɔ seɖoƒemanɔsitɔ enumake bearer biabiawo kple biabia ɖesiaɖe ƒe kɔsɔkɔsɔ ƒe kadodo aɖeke o.

---

## Emenyawo ƒe Tabla

1. [Nukae nye Zimppy.xyz?](#what-is-zimppyxyz)
2. [Nukatae Woxea Fe Siwo Wokpɔna Na AI Dɔwɔlawo?](#why-shielded-payments-for-ai-agents)
3. [Mɔ̃wo ƒe Fexexe Ŋuti Ðoɖo (MPP) .](#machine-payment-protocol-mpp)
4. [Alesi Zimppy Wɔa Dɔe](#how-zimppy-works)
   - [Kpekpewo (Wokafui) .](#sessions-recommended)
   - [Ele ʋuʋum](#streaming)
   - [Febubu](#charge)
5. [Zã Nyawo & Kpɔɖeŋuwo](#use-cases--examples)
6. [Eɖoɖo ɖe dɔa me](#installation)
7. [Zimppy Gakotokua Ðoɖo Ðe Ðoɖo Nu](#setting-up-the-zimppy-wallet)
8. [Zimppy ƒe ɖekawɔwɔ](#integrating-zimppy--typescript-sdk)
   - [Server (Wokpɔ ta na) .](#typescript-server--shielded)
   - [Server (Nu si me kɔ) .](#typescript-server--transparent)
   - [Asisi](#typescript-client)
9. [Zimppy - Rust SDK ƒe ƒoƒo ɖekae](#integrating-zimppy--rust-sdk)
   - [Dɔwɔƒe (Axum) .](#rust-server-axum)
   - [Asisi](#rust-client)
10. [CLI ƒe Nyatakaka](#cli-reference)
11. [Nɔnɔme Veviwo](#key-features)
12. [Xɔtata](#architecture)
13. [Kpɔɖeŋuwo & Demos](#examples--demos)

---

## Nukae nye Zimppy.xyz?

**Zimppy.xyz** nye adzamenyawo gbã fexexe ƒe ɖoɖo si wowɔ koŋ na AI dɔwɔlawo kple automated machine-to-machine (M2M) dɔwɔwɔ ƒe ɖoɖowo. Ewɔa **Mɔ̃ ƒe Fexexe ƒe Ðoɖo (MPP)** ŋudɔ tsɔ zãa **Zcash** abe eƒe ga si le ete ene, si wɔnɛ be woate ŋu awɔ fexexe ƒe mɔnu siwo wokpɔ ta na (siwo nye ame ŋutɔ tɔ bliboe) kple esiwo le gaglãgbe siaa.

To vovo na blockchain fexexe ƒe ɖoɖo xoxowo, afisi asitsatsa ɖesiaɖe dzena le dutoƒo le kɔsɔkɔsɔ me la, wowɔ Zimppy wòƒo xlã xɔtuɖoɖo si wotu ɖe ɣeyiɣi dzi si ɖea biabia ɖesiaɖe ƒe ɣeyiɣi didi ɖa esime wòléa nya ɣaɣlawo ƒe adzamenyawo ta. Esia na wòsɔ etɔxɛ na AI dɔwɔla siwo hiã be woaxe fe ɖe APIwo, nyatakakawo, akɔntabubu, alo AI dɔwɔnuwo ta le ɖoɖowɔɖi nu, evɔ womaɖe nuwɔna ŋuti nyatakaka siwo do go o.

### Nɔnɔme Veviwo

- **De ga zi ɖeka** le kɔsɔkɔsɔ dzi (~ sɛkɛnd 75 na Zcash ƒe kpeɖodzi)
- **Seɖoƒemanɔsitɔ enumake biabia** le ɣeyiɣia ƒe ʋuʋu megbe, zero ɖesiaɖe-biabia kɔsɔkɔsɔ ƒe kadodo
- **Fexexe siwo wokpɔ ta na** tsɔ nya ɣaɣlawo ɣla ame si ɖoe ɖa, amesi xɔe, ga home, kple nuŋlɔɖi to Zcash ƒe Orchard ɖoɖowɔɖi zazã me
- **Fexexe si me kɔ** zã T-adrɛs siwo le kuxi ɖesiaɖe me hena mɔxexe ɖe enu gbugbɔgaƒoƒo nu adzamenyawo blibo manɔmee
- **Spec-wɔ ɖeka**, HMAC-SHA256 ƒe kuxiwo, RFC 9457 ƒe vodadawo, `/.well-known/payment` nusi ŋu woke ɖo

---

## Nukatae Woxea Fe Siwo Wokpɔna Na AI Dɔwɔlawo?

Le AI dɔwɔla siwo kpɔa dɔwɔwɔ ƒe ɖoɖo veviwo gbɔ, senyawo ŋuti numekuku, atikewɔwɔ ŋuti nyabiasewo, ganyawo me dzodzro, hoʋiʋli ƒe nunya na **dukɔa ƒe fexexe ɖesiaɖe nye metadata leak**. Zimppy nye MPP fexexemɔnu ɖeka kolia si nye **ame ŋutɔ tɔ le gɔmedzedzea me**.

### Ameŋunyatakakawo Tsɔtsɔ Sɔ Kple Wo Nɔewo ƒe Tabla

| Nuwo ƒe nunɔamesiwo | Dutoƒo Kɔsɔkɔsɔwo (USDC, ETH) | Zimppy ƒe Akpoxɔnu | Zimppy Transparent |
|---|---|---|---|
| **Dɔdɔla** | Nukpɔkpɔ | Wotsɔ nya ɣaɣlawo ŋlɔe | Nukpɔkpɔ |
| **Amexɔla** | Nukpɔkpɔ | Wotsɔ nya ɣaɣlawo ŋlɔe | Kuxi ɖesiaɖe (si womate ŋu aƒo ka na o) |
| **Agbɔsɔsɔme** | Nukpɔkpɔ | Wotsɔ nya ɣaɣlawo ŋlɔe | Nukpɔkpɔ |
| **Ŋkuɖodzinya** | Nukpɔkpɔ | Wotsɔ nya ɣaɣlawo ŋlɔe | N/A |
| **Gbugbɔgaƒoƒo Takpɔkpɔ** | Ðeke meli o | Memo ƒe babla | Per-kuxi T-adrɛs |
| **Subɔsubɔdɔ Zazã ƒe Kpɔɖeŋu** | Kadodo kple kadodo | Ame ŋutɔ tɔ | Womate ŋu aƒo ka na o (adr yeye) |

### Latency Kuxia, si Wokpɔ To Sessions dzi

> *"Gake Zcash ƒe sɛkɛnd 75 ƒe block ɣeyiɣiwo le esi."*

**Sessions solve this.** Lala le kɔsɔkɔsɔ dzi dzɔna **zi ɖeka** pɛpɛpɛ le gadede asi me. Nubiabia ɖesiaɖe si kplɔe ɖo la nyea enumake.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Xe zi ɖeka, yɔ enumake, gbugbɔ tɔtrɔa.** Per-request latency is zero.

---

## Mɔ̃ ƒe Fexexe ƒe Ðoɖowɔɖi (MPP) .

**Mɔ̃ ƒe Fexexe ƒe Ðoɖo (MPP)** nye ɖoɖo si wowɔ ɖe ɖoɖo nu si na be kɔmpiutadziɖoɖowo ƒe dɔwɔla siwo le wo ɖokui si (AI dɔwɔlawo, bots, scripts) te ŋu kea ɖe fexexe ƒe nudidiwo ŋu, wɔa ɖoɖo ɖe wo ŋu, eye wowɔa wo dzi na API ƒe gege ɖe eme katã amegbetɔ ƒe nudede eme manɔmee.

### Alesi MPP Wɔ Ðeka Kple APIwoe

MPP zɔna ɖe HTTP **402 Fexexe si Hiã** ƒe sisi dzi:

1. **Agent bia** dɔwɔnu aɖe tso API ƒe nuwuƒe si woxe fe na.
2. **Server ɖoa eŋu** kple `402 Payment Required` + gbetɔame si wode asi ete (ga home, amesi xɔe, nuŋlɔɖi).
3. **Agent xea fe** to fexexemɔnu si sɔ zazã me (e.g., Zimppy shielded Zcash).
4. **Agent gadze agbagba** biabia la kple `Authorization: Payment {txid}`.
5. **Server ɖoa kpe** fexexea dzi to nya ɣaɣlawo me (Orchard IVK decryption, ga home + memo check).
6. **Server ɖoa eŋu** kple `200 OK` + a `Payment-Receipt` tanya ƒe tanya.

### Spec ƒe Sedziwɔwɔ

- **HMAC-SHA256** gbetɔame ƒe asidede agbalẽ te
- **RFC 9457** ɖoɖowɔɖi ƒe vodada ƒe ŋuɖoɖowo
- **`/.well-known/payment`** nuwuƒe na fexexemɔnu si ŋu woke ɖo le eɖokui si
- **Orchard IVK** (Incoming Viewing Key) na server-side fexexe ƒe kpeɖodzi evɔ womaɖe gazazã ƒe safuiwo ɖe go o

---

## Alesi Zimppy Wɔa Dɔe

### Kpekpewo (Wokafui) .

Sessions ye nye nuwɔwɔ aduadu ƒe ɖoɖo vevitɔ. Dɔwɔla la tsɔa ga si susɔ la dea kɔsɔkɔsɔ me zi ɖeka, xɔa bearer token, eye wòzãnɛ na biabia siwo katã kplɔe ɖo le zero latency me.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Enyo wu na:** API yɔyɔ siwo ƒe ɣeyiɣi deŋgɔ, LLM nutsotso, nyatakakawo biabia enuenu.

---

### Streaming ƒe ʋuʋu

Fexexe ɖe dzesi ɖesiaɖe ƒe mita me nyawo tsɔtsɔ yi to **Server-Sent Events (SSE)** dzi. Server la ɖea ga si susɔ tso session balance me le nya alo token ɖesiaɖe si woɖe ɖe go me.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Enyo wu na:** LLM ƒe sisi ƒe ŋuɖoɖowo, ɣeyiɣi ŋutɔŋutɔ me nyatakakawo ƒe nuɖuɖu, fexexe ɖe dzesi ɖesiaɖe ƒe AI dɔwɔnuwo.

---

### Febubu

Fexexe ɖeka si wokpɔ ta na le biabia ɖesiaɖe me. Wowɔa HTTP 402 ƒe sisi bliboa le yɔyɔ ɖesiaɖe me. Esɔ ne nubiabiawo mebɔ o alo ne asixɔxɔ gã aɖe le wo ŋu.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Enyo wu na:** Asixɔxɔ gã zi ɖeka ƒe biabiawo, API yɔyɔ siwo mebɔ o, premium data ƒe nuwuƒewo.

---

## Zã Nyawo & Kpɔɖeŋuwo

### 1. AI ƒe Dɔwɔla

AI dɔwɔla aɖe si le se nu biaa nya tso nyadɔdrɔ̃ ŋuti nyatakakadzraɖoƒe si woxea fe na. Zimppy shielded sessions zazã me la, senyawo gbɔ kpɔƒea ƒe amenyenye alo nyabiase tɔxɛawo medzena le kɔsɔkɔsɔ me o - si kpɔa senyala-asisi ƒe mɔnukpɔkpɔ ta le xɔtuɖaŋu ƒe ɖoɖo nu.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Dɔwɔla na Atikewɔwɔ Nyabiase Tɔdzisasrã

Atikewɔlawo ƒe dɔlélenutsiŋutete biaa nya tso atikewɔƒewo ƒe nyatakakadzraɖoƒe geɖe ŋu. Fexexe si wokpɔ ta na kpɔa egbɔ be dɔnɔwo ƒe biabia ƒe ɖoɖowo mewɔ ɖeka kple dɔwɔƒe siwo naa kpekpeɖeŋu o.

### 3. Ganyawo Ŋuti Numekuku Dɔwɔƒe

Algorithm asitsadɔdzikpɔla xea fe ɖe ɣeyiɣi ŋutɔŋutɔ me asitsanyatakaka APIwo ta. Fexexe si me kɔ zãa T-adrɛs yeyewo le kuxi ɖesiaɖe me, si xea mɔ na zazã ƒe ɖoɖo ƒe kadodo le nyatakakadzralawo dome.

### 4. MCP Dɔwɔnu Dɔwɔƒe, Fetu AI Dɔwɔnuwo

MCP (Model Context Protocol) dɔdzikpɔla ɖea AI dɔwɔnu siwo woxea fe na la ɖe go. Dɔwɔnu ɖesiaɖe yɔyɔ ʋãa Zimppy ƒe fexexe, si wɔnɛ be asitsaƒe si me AI ŋutete siwo wowɔ ga le la te ŋu dzɔna.

### 5. LLM Kpuie, Fexexe Ðe Dzesi Ðeka Me

LLM ƒe nuƒoƒoƒu ƒe dɔwɔƒe aɖe xɔa fe na dɔwɔlawo le nusi wowɔ ƒe dzesi ɖesiaɖe ta to SSE ƒe ʋuʋu dzi, eye woɖea ga si susɔ le wo ɖokui si eye wogbugbɔa ga si susɔ si womexe do ŋgɔ o la ana.

---

## Eɖoɖo ɖe dɔa me

### Node.js / Ŋɔŋlɔdzesi

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Gbeɖuɖɔ

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Zimppy Gakotokua Ðoɖo Ðe Ðoɖo Nu

Zimppy CLI naa gakotoku ƒe ŋgɔdonya blibo. Sededewo katã li to... `npx zimppy`.

### Afɔɖeɖe 1 : Wɔ Gakotoku

```bash
npx zimppy wallet create
```

Ewɔa cryptographic keys eye wòɖea wò **seed phrase** fiana. Dzra esia ɖo nyuie - womate ŋu axɔe ne ebu o.

### Afɔɖeɖe 2 : Kpɔ Wò Adrɛs Kple Wò Dadaɖeanyi ɖa

```bash
npx zimppy wallet whoami
```

Displays your **Unified Address (UA)**, **T-address**, current balance, and active network.

```bash
npx zimppy wallet balance --all
```

Fia ga si susɔ ɖe gakɔnta ɖesiaɖe me ƒe mama le ZIP-32 gakɔntawo katã me.

### Afɔɖeɖe 3 : Gadzɔdzɔ na Wò Gakotoku

Send ZEC to your Unified Address from any Zcash-compatible wallet or exchange. Shielded deposits go directly to your Orchard account.

### Afɔɖeɖe 4 : Ðo Gawo ɖa eye Woakpɔ Wo Ta

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

### Afɔɖeɖe 5 : Wɔ Auto-Pay Biabia

```bash
npx zimppy request <url>
```

Ekpɔa 402 -> fetu -> gbugbɔgadze agbagba ƒe sisi bliboa gbɔ le eɖokui si. Woʋua kpekpeawo eye wokpɔa wo dzi le gaglãgbe.

---

## Zimppy ƒe ƒoƒo ɖekae - TypeScript SDK

### TypeScript Server - Wokpɔ ame ta

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

**Nya veviwo:**
- `zcash({ wallet: 'server' })` tsɔa server la ƒe gakotoku si ŋu wokpɔa akpoxɔnu le la dea eme
- `mppx.charge()` kpɔa 402 challenge/verify lifecycle bliboa gbɔ
- `result.withReceipt()` tsɔa nya ɣaɣlawo ƒe fexexe ƒe agbalẽvi la kpena ɖe ŋuɖoɖoa ŋu

---

### TypeScript Server - Nusi me kɔ

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Kuxi ɖesiaɖe wɔa **T-adrɛs yeye**, si wɔnɛ be fexexe ƒe biabiawo mete ŋu doa ka kple wo nɔewo le ɣeyiɣiawo katã me o.

---

### TypeScript ƒe Asitsaha

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Asisi la xea mɔ na wo `402` ŋuɖoɖowo, ʋua ɣeyiɣi aɖe le eɖokui si, eye wògatea biabia la kpɔ ake - yɔyɔ ƒe kɔpi la mehiã susu aɖeke si ku ɖe fexexe ŋu o.

---

## Zimppy - Rust SDK ƒe ƒoƒo ɖekae

### Rust Server (Axum) ƒe Dɔwɔƒe .

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

**Nya veviwo:**
- `MppCharge<Price>` nye Axum extractor si ɖoa kpe fexexe dzi hafi handler la ƒua du
- `WithReceipt` tsɔa fexexe ƒe agbalẽvi si woŋlɔ ɖe nya ɣaɣlawo me xatsa ŋuɖoɖoa
- `ChargeConfig` ɖe asixɔxɔ ƒe susu gɔme - ateŋu anye nusi trɔna le biabia ƒe nɔnɔmewo nu

---

### Rust ƒe Asitsaha

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` keke HTTP asitsaha ɖesiaɖe ɖe enu kple 402 ƒe dɔwɔwɔ le eɖokui si, ɣeyiɣi dzikpɔkpɔ, kple Zcash fexexe ƒe emevava.

---

## CLI ƒe Nufiame

| Sedede | Numeɖeɖe |
|---|---|
| `npx zimppy wallet create` | Wɔ safuiwo eye nàɖe nuku ƒe nyagbe |
| `npx zimppy wallet whoami` | Fia adrɛs (UA + T-addr), dadasɔ, network |
| `npx zimppy wallet balance --all` | Akɔnta ɖesiaɖe ƒe ga si susɔ ƒe mama |
| `npx zimppy wallet send <addr> <zat>` | Ðo akpoxɔnu alo esi me kɔ ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | Cross-account ememe ƒe asitɔtrɔ |
| `npx zimppy wallet shield` | Tsɔ ga siwo me kɔ la yi Orchard (shielded) |
| `npx zimppy wallet use <name>` | Trɔ gakotoku ƒe dzesidenu si le dɔ wɔm |
| `npx zimppy request <url>` | Auto 402 -> fe -> gbugbɔ te biabia |

---

## Nu Vevi Siwo Le Eme

### Agent-Native Gakotokuwo

Wotrɔ asi le Zimppy gakotokuwo ŋu na ɖoɖowɔɖi ƒe zazã na AI dɔwɔlawo - menye web-kpɔkplɔ ƒe kekeɖenudɔwɔwɔ siwo amegbetɔ kpɔna o. Wokpɔa safuiwo dzi to CLI alo SDKwo dzi, woateŋu atrɔ akɔntabubuwo to **ZIP-32 akɔnta ƒe dzɔtsoƒe** dzi, eye gakotokua doa alɔ fexexe ƒe sisi siwo wowɔna le wo ɖokui si bliboe amegbetɔ ƒe mɔɖeɖe manɔmee le asitsatsa ɖesiaɖe me.

### Dɔwɔla Geɖewo ƒe Kpekpeɖeŋu

Dɔwɔla geɖewo ateŋu awɔ dɔ tso gakotoku ɖeka me to **ZIP-32 akɔnta ƒe tɔtrɔ** zazã me - dɔwɔla ɖesiaɖe xɔa eya ŋutɔ ƒe akɔnta kple ga si susɔ ɖe vovo, ga si susɔ ɖe gaxɔgbalẽviwo dome ƒe ŋutete, kple akɔntabubu ɖesiaɖe ƒe ga si susɔ ŋuti nyatakaka. Esia wɔnɛ be woate ŋu akpɔ dɔwɔla geɖe ƒe ʋuwo dzi tso gakotoku ƒe xɔtuɖoɖo ɖeka me.

### Fully Shielded Zcash Transactions (Orchard)

Fexexe siwo wokpɔ ta na zãa Zcash ƒe **Orchard protocol** - si nye ta si wokpɔ ta na yeyetɔ eye wòle dedie wu. Server la zãa **Incoming Viewing Key (IVK)** tsɔ ɖoa ​​kpe fexexe dzi, si ate ŋu aɖe nuŋlɔɖi siwo woxɔ la gɔme evɔ maɖe gazazã ƒe safuia ɖe go o. Woxea mɔ na gbugbɔgaƒoƒo ƒe amedzidzedzewo to **memo binding** dzi - kuxi ɖesiaɖe tsɔa etɔxɛ aɖe dea eme `zimppy:{challenge_id}` memo si ŋu wotsɔ nya ɣaɣlawo ɖo kpee.

### Sessions , Zero Le Biabia Ðeka Me ƒe Ɣeyiɣi Ðeka

Session ƒe xɔtuɖaŋu ɖea kɔsɔkɔsɔ dzi kpeɖodzi lala tso biabia ɖesiaɖe ƒe ɣeyiɣi didi gbɔ. Le ga ɖeka dede (~ sɛkɛnd 75) megbe la, wowɔa bearer-token biabia siwo katã kplɔe ɖo enumake kple blockchain ƒe kadodo aɖeke o vaseɖe esime ɣeyiɣia nawu enu.

### Streaming , Fexexe Ðe Dzesi Ðeka Me

Native **SSE (Server-Sent Events)** ƒe kpekpeɖeŋu na be woate ŋu axe fe ɖe dzesi ɖesiaɖe ƒe mita me nyawo. Enyo ŋutɔ na LLM nutsotso API siwo me emetsonu ƒe didime trɔna eye ele be fexexe naɖe nuzazã ŋutɔŋutɔ afia.

### Spec ƒe Sedziwɔwɔ

- **HMAC-SHA256** ƒe gbetɔame siwo wode asi ete xea mɔ na aʋatsokaka
- **RFC 9457** vodada ƒe ɖoɖo si woɖo na vodadawo gbɔ kpɔkpɔ si woate ŋu awɔ dɔ aduadu
- **`/.well-known/payment`** na fexexemɔnu si ŋu woke ɖo le eɖokui si to dɔwɔla ɖesiaɖe si wɔ ɖeka kple MPP dzi

---

## Xɔtata

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

### Akpawo ƒe Agbanɔamedziwo

**`zimppy-core`** - Nya ɣaɣlawo ƒe nu vevitɔ. Ekpɔa Orchard note decryption gbɔ to server ƒe IVK, memo parsing, replay protection logic, kple challenge verification zazã me. Woŋlɔe ɖe Rust me hena dɔwɔwɔ kple dzɔdzɔenyenye.

**`zimppy-wallet`** - Zcash gakotoku si nye dukɔa me tɔ si ŋu ŋusẽ le `zingolib`. Ekpɔa safuiwo, gakɔntawo, ga si susɔ siwo wokpɔ ta na/siwo me kɔ, kple asitsatsa ƒe ɖoɖo ɖe amewo dzi.

**`zimppy-rs`** - Rust SDK la ƒe ƒuƒoƒo. Enaa ame `ChargeMethod`, `SessionMethod`, kple `PaymentProvider` nɔnɔmewo, tsɔ kpe ɖe Axum extractors (`MppCharge`, `WithReceipt`) na ergonomic server ƒe ɖekawɔwɔ.

**`zimppy-napi`** - NAPI-RS ƒe kadodo siwo ɖea Rust ƒe nu vevi ɖe Node.js, si naa TypeScript SDK te ŋu zãa nya ɣaɣlawo ƒe mɔ̃ ma ke evɔ megawɔa Zcash gbãtɔwo ŋudɔ le JavaScript me o.

**`zimppy-ts`** - Nuŋɔŋlɔ ƒe SDK la. Xatsa NAPI bindings kple idiomatic async/await APIs na charge, session, kple SSE streaming flows.

**`zimppy-cli`** - Sedede-fli ƒe gakotoku kple biabia dɔwɔnu. Doa alɔ auto-pay (402 -> fe -> gbugbɔ dze agbagba), ɣeyiɣi dzikpɔkpɔ, kple gakotoku ƒe dɔwɔwɔwo katã.

---

## Kpɔɖeŋuwo & Demos

| Kpɔɖeŋu | Numeɖeɖe |
|---|---|
| `examples/fortune-teller/` | Fexexe, ɣeyiɣi, kple sisi ƒe wɔwɔfiawo - Rust server + client |
| `examples/llm-summarizer/` | Fetu-ɖe-dzesi LLM streaming demo |
| `examples/mcp-server/` | MCP dɔwɔnu ƒe dɔdzikpɔla kple AI dɔwɔnu siwo woxea fe na |
| `examples/ts-server/` | TypeScript MPP dɔdzikpɔla ƒe nufiame ƒe dɔwɔwɔ |

---

## Nusiwo Le Eme - Feature Summary

| Feature | Numeɖeɖe |
|---|---|
| **Kpekpewo** | Deposit zi ɖeka, enumake bearer biabia, refund le close |
| **Streaming** | Fexexe ɖe dzesi ɖesiaɖe ƒe mita me nyawo dzi to SSE |
| **Fɔxexe** | Fexexe si wokpɔ ta na alo si me kɔ le HTTP biabia ɖesiaɖe me (402 ƒe sisi) |
| **Fexexe si Woxena le Gaglãgbe** | T-adrɛswo kple kuxi ɖesiaɖe gbugbɔgaƒoƒo mɔxexe + akpoxɔnu sedede |
| **Akɔntabubu Geɖe** | ZIP-32 akɔnta ƒe tɔtrɔ, gakɔnta ƒe asitɔtrɔ le gakɔnta dome, gakɔnta ɖesiaɖe ƒe ga si susɔ |
| **CLI Gakotoku** | Ðo ɖa, akpoxɔnu, tsɔtsɔ yi teƒe bubu, dadasɔ --wo katã, whoami, auto-pay |
| **SDK eve ** | TypeScript kple Rust |
| **Spec-Sedziwɔwɔ** | HMAC-SHA256 ƒe kuxiwo, RFC 9457 ƒe vodadawo, . `/.well-known/payment` nusi ŋu woke ɖo |

---

*Ne èdi nyatakaka bubuwo la, yi [zimppy.xyz](https://zimppy.xyz)*

---

## Axa Siwo Do Ƒome Kplii

- [Gakotokuwo](/using-zcash/wallets) — Zcash gakotoku siwo doa alɔ asitsatsa siwo wokpɔ ta na
- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools) — Alesi Orchard ƒe asitsatsa siwo wokpɔ ta na kpɔa fexexe ŋuti nyatakakawo tae
- [Fexexe Ŋuti Dɔwɔlawo](/using-zcash/payment-processors) — Mɔ bubu siwo dzi woato axɔ Zcash ƒe fexexe
- [Zcash ƒe Nunɔamesi Siwo Wokpɔna](/zcash-tech/zcash-shielded-assets) — ZSAwo kple Zcash ƒe ɖoɖowɔɖi ƒe etsɔme
- [Nutoa me Dɔwɔnawo](/zcash-community/community-projects) — Zcash ƒe lãwo ƒe agbenɔnɔ ŋuti dɔ geɖe wu
