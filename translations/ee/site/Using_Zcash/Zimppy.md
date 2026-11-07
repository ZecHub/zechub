<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## Nyawo ƒe ƒometɔ

- **Zimppy** nye ɣaɣla [privacy]-tsɔtsɔ fexexe ƒe nutoɖoɖo na AI agents siwo zã Zcash ƒe Machine Payment Protocol (MPP)
- Ɖo ga ɖe eme zi ɖeka ɖoɖonu dzi (~75 seconds), eye nàwɔ **biabia madzi aɖeke tɔ** enumake, ɖoɖonu ƒe dɔwɔwɔ aɖeke manɔ biabia sia biabia me o
- Ede asi ɖe **ɣaɣla [shielded] Zcash (Orchard)** fexexewo ŋu blibo — nelawo, xɔla, gaƒe, kple nya kpui [memo] katã woɣla wo
- Ewɔ dɔ kple **TypeScript kple Rust SDKs** be wòaɖe ɖe AI pipelines kple API servers me bɔbɔe
- Eƒo na **LLM APIs, data marketplaces, MCP tool servers**, kple M2M fexexe ƒe zã nyawo [use case] bubuwo katã

---

> **Zimppy** nye Machine Payment Protocol (MPP) ƒe fexexe ƒe mɔnu na Zcash, si ɖe asi ɖe ɣaɣla kple nuwo ƒe ʋuʋuɖi [transparent] fexexewo ŋu. Ɖo ga ɖe eme zi ɖeka ɖoɖonu dzi, eye nàwɔ bearer biabiabia madzi aɖeke tɔ enumake, ɖoɖonu ƒe dɔwɔwɔ aɖeke manɔ biabia sia biabia me o.

---

## Agbalẽ ƒe Nusiwo Le Eme

1. [Zimppy.xyz nye nu ka?](#what-is-zimppyxyz)
2. [Nu ka ta ɣaɣla Fexexewo na AI Agents?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Ale si Zimppy Wɔa Dɔe](#how-zimppy-works)
   - [Kpekpeɣeyiɣiwo (Ewɔ be nàtia)](#sessions-recommended)
   - [Tsi tsiɖeɖe](#streaming)
   - [Xexexee](#charge)
5. [Zã Nyawo & Medeɖeɖewo](#use-cases--examples)
6. [Aɖoɖo](#installation)
7. [Zimppy Gakotoku ƒe Ɖoɖo](#setting-up-the-zimppy-wallet)
8. [Zimppy ƒe Ɖekpekpeɖeɖe](#integrating-zimppy--typescript-sdk)
   - [Server (Ɣaɣla)](#typescript-server--shielded)
   - [Server (Nuwo ƒe Ʋuʋuɖi)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Zimppy ƒe Ɖekpekpeɖeɖe - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [CLI ƒe Nudzodzro](#cli-reference)
11. [Nɔnɔme Veviwo](#key-features)
12. [Nutoɖoɖo](#architecture)
13. [Medeɖeɖewo & Demo-wo](#examples--demos)

---

## Zimppy.xyz Nye Nu Ka?

**Zimppy.xyz** nye ɣaɣla-tsɔtsɔ fexexe ƒe nutoɖoɖo si woɖo ɖe AI agents kple machine-to-machine (M2M) dɔwɔwɔ siwo wɔa dɔ ɖokuiwo me tɔxɛ. Etsɔ **Machine Payment Protocol (MPP)** wɔ dɔ, eye **Zcash** nye eƒe ga si wotsɔ wɔa dɔ, eyata wòte ŋu wɔ ɣaɣla (ŋutɔŋutɔ) kple nuwo ƒe ʋuʋuɖi fexexe ƒe mɔnuwo siaa.

Tɔvɔ na blockchain [gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu] ƒe fexexe ƒe nutoɖoɖo mamɛwo, afi si gaɖoɖo [transaction] sia sia doa go kplee ɖoɖonu dzi, woɖo Zimppy ƒe nutoɖoɖo ɖe kpekpeɣeyiɣi ƒe ɖoɖo dzi be wòatsi biabia sia biabia ƒe megbe megbe, eye wòakpɔ ɣaɣlaŋlɔŋlɔ ƒe ɣaɣla ɖe asi. Esia na wòƒo ŋutɔ na AI agents si hiã be woaxe ga na APIs, data, compute, alo AI dɔwɔnuwo le ɖoɖo me, ne woɖe wɔnɔɖeɖe ƒe metadata afia o.

### Nɔnɔme Gãwo

- **Ɖo ga ɖe eme zi ɖeka** ɖoɖonu dzi (~75 seconds na Zcash ƒe kpekpeɖeŋu)
- **Biabiabia madzi aɖeke tɔ enumake** kpekpeɣeyiɣi ƒe dzoɖo megbe, ɖoɖonu ƒe dɔwɔwɔ aɖeke mele biabia sia biabia me o
- **Ɣaɣla fexexewo** ɣla nela, xɔla, gaƒe, kple nya kpui kple Zcash ƒe Orchard protocol
- **Nuwo ƒe ʋuʋuɖi fexexewo** zã T-addresses siwo le challenge sia sia ƒe ta be woaxe mɔ na replay o, ke ɣaɣla blibo mele o
- **Spec-compliant**, HMAC-SHA256 challenges, RFC 9457 ƒe vodada-wo, `/.well-known/payment` ƒe didi

---

## Nu Ka Ta Ɣaɣla Fexexewo Na AI Agents?

Na AI agents siwo kpɔa dɔwɔwɔ veviwo dzi, le agbalẽ ƒe didi, atike ƒe biabiawo, ga ƒe numekpɔkpɔ, alo amedzro ƒe nyagblɔɖi me la, **fexexe si doa go le amewo katã ƒe ŋkume nye metadata ƒe ɖeɖe**. Zimppy koe nye MPP fexexe ƒe mɔnu si nye **ɣaɣla le gɔmedzedze me**.

### Ɣaɣla ƒe Sɔsɔ̃ ƒe Kplɔ̃

| Nɔnɔme | Ɖoɖonuwo siwo doa go le amewo katã ƒe ŋkume (USDC, ETH) | Zimppy Ɣaɣla | Zimppy Nuwo ƒe Ʋuʋuɖi |
|---|---|---|---|
| **Nela** | Wokpɔe | Woɣlae | Wokpɔe |
| **Xɔla** | Wokpɔe | Woɣlae | Challenge sia sia tɔ (kadodo manɔ anyi [unlinkable]) |
| **Gaƒe** | Wokpɔe | Woɣlae | Wokpɔe |
| **Nya kpui** | Wokpɔe | Woɣlae | Meli o |
| **Replay ƒe Mɔxɔxɔ** | Meli o | Nya kpui ƒe kadodo | Challenge sia sia ƒe T-address |
| **Subɔsubɔ ƒe Zãɖoɖo** | Wote ŋu akadoe | Ɣaɣla | Kadodo manɔ anyi (gaɖoƒe ƒe dzesi yeye) |

### Megbe Megbe ƒe Kuxi, Kpekpeɣeyiɣiwo Ɖe Eŋu

> *"Ke Zcash ƒe gaɖoɖowo ƒuƒoƒe ƒe ɣeyiɣi nye seconds 75."*

**Kpekpeɣeyiɣiwo ɖe esia ŋu.** Ɖoɖonu dzi ƒe lala va eme zi **ɖeka pɛ** le gaɖoɖo me. Biabia si va megbe la wɔnɛ enumake.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Xe ga zi ɖeka, yɔe enumake, eye nàxɔ tɔxɛ si susɔ.** Biabia sia biabia ƒe megbe megbe nye zero.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** nye protocol si wotsɔ ɖo ɖe nudzɔdzɔ ƒe mɔnu dzi be software agents siwo wɔa dɔ ɖokuiwo me (AI agents, bots, scripts) nàte ŋu adzro, aɖo nu, eye wòawɔ fexexe ƒe hiãhiãwo na API ƒe mɔxɔxɔ, amegbetɔ ƒe dɔwɔwɔ aɖeke manɔ eme o.

### Ale Si MPP Ɖekpena Kple APIs

MPP dze HTTP **402 Payment Required** ƒe mɔ dzi:

1. **Agent bia** nu tso API endpoint si woxe ga ɖo la gbɔ.
2. **Server ɖo eŋu** kple `402 Payment Required` kple challenge si wode asi ɖo (gaƒe, xɔla, nya kpui).
3. **Agent xe ga** kple fexexe ƒe mɔnu si sɔ (kp. Zimppy ɣaɣla Zcash).
4. **Agent gbugbɔ bia** biabia la kple `Authorization: Payment {txid}`.
5. **Server kpɔa fexexe la ƒe nyateƒe** kple ɣaɣlaŋlɔŋlɔ (Orchard IVK ƒe ɣeɣe, gaƒe + nya kpui ƒe kpɔkpɔ).
6. **Server ɖo eŋu** kple `200 OK` kple `Payment-Receipt` ƒe header.

### Spec Ƒe Dzedze

- **HMAC-SHA256** challenge ƒe asidede
- **RFC 9457** ƒe vodada ƒe ɖoɖo si wɔa dɔ ɖe mɔ ɖeka nu
- **`/.well-known/payment`** endpoint na fexexe ƒe mɔnu ƒe didi si wɔa dɔ ɖokuiwo me
- **Orchard IVK** (Incoming Viewing Key) na server-side fexexe ƒe kpɔkpɔ, eye gazazãsafuiwo mago o

---

## Ale Si Zimppy Wɔa Dɔe

### Kpekpeɣeyiɣiwo (Ewɔ Be Nàtia)

Kpekpeɣeyiɣiwoe nye mɔnu gã si wotsɔa wɔa dɔ. Agent ɖoa balance ɖe eme zi ɖeka ɖoɖonu dzi, exɔa bearer token, eye wòzãe na biabia siwo va megbe katã kple megbe megbe zero.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Eƒo na:** API ƒe yɔyɔ sɔgbɔ, LLM inference, data ƒe biabia siwo gbugbɔna.

---

### Tsi Tsiɖeɖe

Nusi woƒe akɔnta le token sia token nu si wotsɔa **Server-Sent Events (SSE)** doa go. Server la ɖea ga le kpekpeɣeyiɣi ƒe balance me na nya alo token sia sia si wodo.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Eƒo na:** LLM ƒe ɖoɖo si dzea yi, data ƒe nyawo siwo va le ɣeyiɣi me, AI dɔwɔnu siwo ƒe akɔnta le token sia token nu.

---

### Xexexee

Ɣaɣla fexexe ɖeka na biabia sia sia. Wotsɔa HTTP 402 ƒe mɔ blibo wɔa dɔ le yɔyɔ sia sia me. Eƒo ne biabiabiawo menoa va sɔgbɔ o alo woxea ga gã ɖo.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Eƒo na:** Biabia ɖeka si xɔ asi gã, API ƒe yɔyɔ siwo menoa va sɔgbɔ o, data ƒe endpoint siwo ƒe asi gã.

---

## Zã Nyawo & Medeɖeɖewo

### 1. AI Agent

AI agent si le se ƒe dɔ wɔm bia nya le case-law database si woxe ga ɖo la me. Kple Zimppy ɣaɣla kpekpeɣeyiɣiwo, mekpɔa seƒe ƒe amenyenye alo biabia si woɖe to la le ɖoɖonu dzi o — esia kpɔa seŋkɔna kple eƒe kliente ƒe ɣaɣla dzi le nutoɖoɖo ƒe ipele.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Agent Na Atike Ƒe Biabia ƒe Pipeline

Atike ƒe diagnostic agent bia nya le clinical databases geɖe me. Ɣaɣla fexexewo na be wòanɔ te ŋu akado dɔléla ƒe biabia ƒe nɔnɔmewo le providers dome o.

### 3. Ga Ƒe Numekpɔkpɔ Agent

Algorithmic trading agent xe ga na market data APIs siwo va le ɣeyiɣi me. Nuwo ƒe ʋuʋuɖi fexexewo zã T-addresses yeye na challenge sia sia, eye esia xea mɔ na zãɖoɖo ƒe kadodo le data vendors dome.

### 4. MCP Tool Server, AI Dɔwɔnu Siwo Woxe Ga Ɖo

MCP (Model Context Protocol) server ɖe AI dɔwɔnu siwo woxe ga ɖo fia. Dɔwɔnu ƒe yɔyɔ sia sia dzea Zimppy xexexee dzi, eye ena AI ƒe ŋutete siwo wòte ŋu axɔ ga ɖo ƒe asima nadzɔ.

### 5. LLM Nya Ƒe Ƒometɔ, Xe Ga Le Token Sia Token Nu

LLM ƒe nya ƒometɔ subɔsubɔ xea ga na agents le output token sia token nu to SSE tsi tsiɖeɖe me, kple balance ƒe ɖeɖe si wɔa dɔ ɖokuiwo me kple ga si woxe ɖo do ŋgɔ ke wometsɔ zã o ƒe gbugbɔxɔxɔ.

---

## Aɖoɖo

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

## Zimppy Gakotoku Ƒe Ɖoɖo

Zimppy CLI tsɔ gakotoku ƒe interface blibo va. Dede siawo katã le `npx zimppy` me.

### Afɔ 1 : Wɔ Gakotoku

```bash
npx zimppy wallet create
```

Ewɔa ɣaɣlaŋlɔŋlɔ ƒe safuiwo, eye wòfia wò **gadzraɖoɖi nya [seed phrase]**. Dzra esia ɖo nyuie — ne ebu la, mate ŋu agbugbɔ axɔe o.

### Afɔ 2 : Kpɔ Wò Gaɖoƒe Ƒe Dzesi Kple Balance

```bash
npx zimppy wallet whoami
```

Efia wò **Unified Address (UA)**, **T-address**, balance si le esi, kple network si le dɔ wɔm.

```bash
npx zimppy wallet balance --all
```

Efia balance ƒe mama le akɔnta sia akɔnta me le ZIP-32 accounts katã dzi.

### Afɔ 3 : Tsɔ Ga Na Wò Gakotoku

Ɖo ZEC ɖe wò Unified Address dzi tso gakotoku alo gatrɔƒe si sɔ kple Zcash aɖeke gbɔ. Ɣaɣla gaɖoɖowo dzea ɖe wò Orchard account me tẽ.

### Afɔ 4 : Do Ga Eye Nàtsɔe Aɣla

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

### Afɔ 5 : Wɔ Auto-Pay Ƒe Biabia

```bash
npx zimppy request <url>
```

Ewɔa 402 -> xe ga -> gbugbɔ bia ƒe mɔ blibo wɔa dɔ ɖokuiwo me. Wɔa kpekpeɣeyiɣiwo dzoe eye wòkpɔa dzi wo le ɣaɣla me.

---

## Zimppy Ƒe Ɖekpekpeɖeɖe - TypeScript SDK

### TypeScript Server - Ɣaɣla

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
- `zcash({ wallet: 'server' })` loa server ƒe ɣaɣla gakotoku
- `mppx.charge()` kpɔa 402 challenge/verification ƒe agbe blibo dzi
- `result.withReceipt()` kpena fexexe ƒe kpekpeɖeŋu si wotsɔ ɣaɣlaŋlɔŋlɔ wɔ ɖe ɖoɖo la ŋu

---

### TypeScript Server - Nuwo Ƒe Ʋuʋuɖi

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Challenge sia sia wɔa **T-address yeye**, eye esia na fexexe ƒe biabiabiawo nɔ kadodo manɔ anyi le kpekpeɣeyiɣiwo dome.

---

### TypeScript Client

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Client la lée ɖe `402` ƒe ɖoɖowo me, edzoa kpekpeɣeyiɣi ɖokuiwo me, eye wògbugbɔ bia biabia la — code si yɔe la mehiã fexexe ƒe logic aɖeke o.

---

## Zimppy Ƒe Ɖekpekpeɖeɖe - Rust SDK

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

**Nya veviwo:**
- `MppCharge<Price>` nye Axum extractor si kpɔa fexexe ƒe nyateƒe hafi handler la nadze dɔ wɔwɔ gɔme
- `WithReceipt` ɖea fexexe ƒe kpekpeɖeŋu si wotsɔ ɣaɣlaŋlɔŋlɔ wɔ ƒu ɖe ɖoɖo la ŋu
- `ChargeConfig` dea asi ɖe asiƒe ƒe logic — ate ŋu atrɔ le biabia ƒe parameters nu

---

### Rust Client

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` ɖea 402 ƒe kpɔkpɔ si wɔa dɔ ɖokuiwo me, kpekpeɣeyiɣi ƒe dzikpɔkpɔ, kple Zcash ƒe fexexe ƒe wɔwɔ blibo ɖe HTTP client aɖeke ŋu.

---

## CLI Ƒe Nudzodzro

| Dede | Gɔmesese |
|---|---|
| `npx zimppy wallet create` | Wɔ safuiwo eye nàfia gadzraɖoɖi nya |
| `npx zimppy wallet whoami` | Fia gaɖoƒe ƒe dzesi (UA + T-addr), balance, network |
| `npx zimppy wallet balance --all` | Balance ƒe mama le akɔnta sia akɔnta me |
| `npx zimppy wallet send <addr> <zat>` | Do ɣaɣla alo nuwo ƒe ʋuʋuɖi ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | Le akɔnta me ƒe transfer le accounts dome |
| `npx zimppy wallet shield` | Tsɔ nuwo ƒe ʋuʋuɖi ga yi Orchard (ɣaɣla) me |
| `npx zimppy wallet use <name>` | Trɔ gakotoku ƒe amenyenye si le dɔ wɔm |
| `npx zimppy request <url>` | Wɔ 402 -> xe ga -> gbugbɔ bia ƒe biabia ɖokuiwo me |

---

## Nɔnɔme Veviwo

### Gakotokuwo Si Woɖo Na Agents

Woɖo Zimppy gakotokuwo ɖe AI agents ƒe ɖoɖo me — menye browser extensions siwo amegbetɔwo kpɔa dzi o. Wokpɔa safuiwo dzi to CLI alo SDKs me, ate ŋu atrɔ accounts to **ZIP-32 account derivation** me, eye gakotoku la tše fexexe ƒe mɔnu siwo wɔa dɔ ɖokuiwo me blibo, amegbetɔ ƒe ɖoɖo manɔ gaɖoɖo sia sia me o.

### Agents Geɖe ƒe Dzedze

Agents geɖe ate ŋu awɔ dɔ le gakotoku ɖeka me to **ZIP-32 account rotation** me — agent sia sia xɔa eƒe account tɔe kple balance ƒe dzikpɔkpɔ si to ɖe eya ko ŋu, transfer ƒe ŋutete le accounts dome, kple balance ƒe nyagblɔɖi le account sia sia me. Esia na wòte ŋu akpɔ agents geɖe ƒe fleet dzi tso gakotoku ƒe nutoɖoɖo ɖeka me.

### Ɣaɣla Blibo Zcash Gaɖoɖowo (Orchard)

Ɣaɣla fexexewo zã Zcash ƒe **Orchard protocol**, ɣaɣla gaƒuƒoƒo [pool] si NU5 va kplɔe. Server la kpɔa fexexewo ƒe nyateƒe kple **Incoming Viewing Key (IVK)**, si ate ŋu aɣe didienuwo [note] siwo woxɔ me ne gazazãsafui la mago o. Replay ƒe attack-wo mate ŋu ava eme o to **nya kpui ƒe kadodo** me — challenge sia sia tsɔa `zimppy:{challenge_id}` nya kpui si wɔ ɣaɣlaŋlɔŋlɔ ƒe kpɔkpɔ va.

### Kpekpeɣeyiɣiwo, Megbe Megbe Aɖeke Menɔ Biabia Sia Biabia Me O

Kpekpeɣeyiɣi ƒe nutoɖoɖo ma ɖoɖonu dzi ƒe kpekpeɖeŋu ƒe lala kple biabia sia biabia ƒe megbe megbe ke o. Le gaɖoɖo ɖeka (~75 seconds) megbe la, bearer-token biabiabia siwo va megbe katã ava enumake, blockchain ƒe dɔwɔwɔ aɖeke manɔ eme vaseɖe kpekpeɣeyiɣi ƒe nuwuwu.

### Tsi Tsiɖeɖe, Xe Ga Le Token Sia Token Nu

**SSE (Server-Sent Events)** ƒe dzedze le eme le dzɔdzɔ me na nusi woƒe akɔnta le token sia token nu. Eƒo ŋutɔ na LLM inference APIs afi si output ƒe didime trɔna, eye wòle be fexexe nadze zãzã si va eme vavã nu.

### Spec Ƒe Dzedze

- **HMAC-SHA256** challenges si wode asi ɖo xea mɔ na ŋkɔdzidzɔ
- **RFC 9457** ƒe vodada ƒe ɖoɖo na vodada ƒe dzikpɔkpɔ si wɔa dɔ ɖe mɔ ɖeka nu
- **`/.well-known/payment`** na fexexe ƒe mɔnu ƒe didi si wɔa dɔ ɖokuiwo me le MPP-compliant agent aɖeke gbɔ

---

## Nutoɖoɖo

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

### Akpa Sia Akpa Ƒe Dɔwɔwɔ

**`zimppy-core`** - Ɣaɣlaŋlɔŋlɔ ƒe core. Ewɔa Orchard didienu ƒe ɣeɣe kple server ƒe IVK, nya kpui ƒe mama, replay ƒe mɔxɔxɔ ƒe logic, kple challenge ƒe kpɔkpɔ. Woŋlɔe le Rust me na dɔwɔwɔ kple nyateƒe.

**`zimppy-wallet`** - Zcash ƒe gakotoku si wɔa dɔ le dzɔdzɔ me, eye `zingolib` naa ŋusẽe. Ekpɔa safuiwo, accounts, ɣaɣla/nuwo ƒe ʋuʋuɖi balances, kple gaɖoɖo ƒe ɖoɖo dzi.

**`zimppy-rs`** - Rust SDK. Ena `ChargeMethod`, `SessionMethod`, kple `PaymentProvider` traits, kple Axum extractors (`MppCharge`, `WithReceipt`) na server ƒe ɖekpekpeɖeɖe bɔbɔe.

**`zimppy-napi`** - NAPI-RS bindings si ɖea Rust core fia Node.js, eye esia na TypeScript SDK nàzã ɣaɣlaŋlɔŋlɔ ƒe engine ma ke, ne wòmagbugbɔ aŋlɔ Zcash primitives le JavaScript me o.

**`zimppy-ts`** - TypeScript SDK. Etsɔ NAPI bindings ƒua kple async/await APIs si sɔ na charge, session, kple SSE tsi tsiɖeɖe ƒe mɔnuwo.

**`zimppy-cli`** - Gakotoku kple biabia ƒe dɔwɔnu si wotsɔa command-line zã. Ede asi ɖe auto-pay (402 -> xe ga -> gbugbɔ bia), kpekpeɣeyiɣi ƒe dzikpɔkpɔ, kple gakotoku ƒe dɔwɔwɔwo katã ŋu.

---

## Medeɖeɖewo & Demo-wo

| Medeɖeɖe | Gɔmesese |
|---|---|
| `examples/fortune-teller/` | Charge, session, kple streaming demos - Rust server + client |
| `examples/llm-summarizer/` | LLM tsi tsiɖeɖe ƒe demo si xea ga le token sia token nu |
| `examples/mcp-server/` | MCP tool server kple AI dɔwɔnu siwo woxe ga ɖo |
| `examples/ts-server/` | TypeScript MPP server ƒe reference implementation |

---

## Nusiwo Le Eme - Nɔnɔme Ƒe Ƒometɔ

| Nɔnɔme | Gɔmesese |
|---|---|
| **Kpekpeɣeyiɣiwo** | Ɖo ga ɖe eme zi ɖeka, bearer biabiabia enumake, ga gbugbɔxɔxɔ le nuwuwu |
| **Tsi Tsiɖeɖe** | Nusi woƒe akɔnta le token sia token nu to SSE me |
| **Xexexee** | Ɣaɣla alo nuwo ƒe ʋuʋuɖi fexexe na HTTP biabia sia sia (402 ƒe mɔ) |
| **Nuwo Ƒe Ʋuʋuɖi Fexexewo** | T-addresses kple replay ƒe mɔxɔxɔ le challenge sia sia me + shield command |
| **Accounts Geɖe** | ZIP-32 account rotation, transfers le accounts dome, balances le account sia sia me |
| **CLI Gakotoku** | Do ga, shield, transfer, balance --all, whoami, auto-pay |
| **SDK Evea** | TypeScript kple Rust |
| **Spec-Compliant** | HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` ƒe didi |

---

*Na nyawo geɖe, yi [zimppy.xyz](https://zimppy.xyz)*

---

## Axa Siwo Kplɔe ɖo

- [Gakotokuwo](/using-zcash/wallets) — Zcash gakotokuwo siwo ɖe asi ɖe ɣaɣla gaɖoɖowo ŋu
- [Ɣaɣla Gaƒuƒoƒowo](/using-zcash/shielded-pools) — Ale si Orchard ɣaɣla gaɖoɖowo kpɔa fexexe ƒe data dzi
- [Fexexe Ƒe Ɖekpɔlawo](/using-zcash/payment-processors) — Mɔnu bubuwo siwo woate ŋu atsɔ axɔ Zcash fexexewo
- [Zcash Ɣaɣla Assets](/zcash-tech/zcash-shielded-assets) — ZSAs kple Zcash programmability ƒe etsɔme
- [Hame Ƒe Dɔwɔwɔwo](/zcash-community/community-projects) — Zcash ecosystem ƒe dɔwɔwɔ geɖe
