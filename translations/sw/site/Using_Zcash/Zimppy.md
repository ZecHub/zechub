<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy** ni faragha-kwanza malipo miundombinu kwa ajili ya mawakala AI kutumia Zcash Mashine Malipo Itifaki (MPP)
- ** Kuweka mara moja** on-mnyororo (~ sekunde 75), kisha kufanya ** maombi ya papo hapo ukomo ** na hakuna mwingiliano kwa kila ombi blockchain
- Inasaidia ** kikamilifu ulinzi Zcash (Orchard) * malipo  mtumaji, mpokeaji, kiasi, na memo wote ni encrypted
- Kazi na ** TypeScript na Rust SDKs** kwa ushirikiano rahisi katika AI mabomba ya bomba na seva za API
- Perfect kwa ** LLM APIs, data masoko ya maeneo, MCP chombo seva**, na yoyote kesi matumizi malipo M2M

---

> **Zimppy** ni Mashine ya Malipo Protocol (MPP) njia malipo kwa Zcash kusaidia wote walinzi na uwazi wa malipo. amana mara moja juu-mnyororo, kisha kufanya maombi unlimited papo mtoaji bila mwingiliano per ombi mlolongo.

---

## Habari Zilizo Ndani ya Toleo Hili

1. [Zimppy.xyz ni nini?](#what-is-zimppyxyz)
2. [Kwa nini Malipo ya Kufichwa kwa Wakala wa AI?](#why-shielded-payments-for-ai-agents)
3. [Mashine Malipo Itifaki (MPP)](#machine-payment-protocol-mpp)
4. [Jinsi Zimppy Inavyofanya Kazi](#how-zimppy-works)
   - [Mikutano (Ilipendekezwa)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Malipo ya malipo](#charge)
5. [Matumizi ya kesi & Mifano](#use-cases--examples)
6. [Ufungaji](#installation)
7. [Kuweka Up Zimppy Wallet](#setting-up-the-zimppy-wallet)
8. [Kuunganisha Zimppy](#integrating-zimppy--typescript-sdk)
   - [Seva (Iliyolindwa)](#typescript-server--shielded)
   - [Seva (Uwazi)](#typescript-server--transparent)
   - [Mteja](#typescript-client)
9. [Kuunganisha Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Mteja](#rust-client)
10. [CLI Marejeleo](#cli-reference)
11. [Sifa Muhimu za Mfano wa Yesu](#key-features)
12. [Usanifu wa majengo](#architecture)
13. [Mifano & Demos](#examples--demos)

---

## Zimppy.xyz ni nini?

**Zimppy.xyz** ni faragha-kwanza malipo miundombinu iliyoundwa mahsusi kwa ajili ya mawakala AI na automatiska mashine hadi mashine (M2M) workflows. Inatekeleza ** Mashine Malipo Itifaki (MPP) ** kutumia ** Zcash ** kama sarafu yake msingi, kuwezesha wote shielded (kikamilifu binafsi) na modes uwazi wa kulipa.

Tofauti na mfumo wa malipo ya jadi blockchain, ambapo kila shughuli ni hadharani inayoonekana kwenye mnyororo, Zimppy imeundwa karibu usanifu kikao-msingi ambayo huondoa kwa ombi latency wakati kuhifadhi faragha cryptographic. Hii inafanya kipekee yanafaa kwa mawakala AI ambao wanahitaji kulipa APIs, data, kompyuta au zana za AI programmatically, bila kuvuja tabia metadata.

### Sifa za msingi

- ** Kuweka mara moja** kwenye mnyororo (~ sekunde 75 kwa uthibitisho wa Zcash)
- ** Unlimited maombi ya papo hapo** baada ya kikao kufungua, zero kwa kila ombi mlolongo mwingiliano
- ** Malipo ya kulindwa** encrypt mtumaji, mpokeaji, kiasi, na memo kutumia Zcash's Orchard itifaki
- ** Malipo ya uwazi** kutumia kwa changamoto T-anwani za kuzuia replay bila faragha kamili
- ** Spec-kupatana**, HMAC SHA256 changamoto, RFC 9457 makosa, `/.well-known/payment` ugunduzi

---

## Kwa nini Malipo ya Kufichwa kwa Wakala wa AI?

Kwa mawakala wa AI kushughulikia mtiririko nyeti kazi, utafiti kisheria, maswali ya matibabu, uchambuzi wa kifedha, ushindani akili kwa ** kila malipo ya umma ni metadata kuvuja**. Zimppy ni njia tu MPP malipo ambayo ni ** binafsi na default **.

### Kijitabu cha Kulinganisha Faragha

| Mali | Minyororo ya Umma (USDC, ETH) | Zimpy Iliyolindwa | Zimpy Uwazi |
|---|---|---|---|
| **Mtumaji** | Inaonekana | Imesimbwa kwa njia fiche | Inaonekana |
| **Mpokeaji** | Inaonekana | Imesimbwa kwa njia fiche | Kwa kila changamoto (haiwezi kuunganishwa) |
| **Kiasi** | Inaonekana | Imesimbwa kwa njia fiche | Inaonekana |
| **Kumbukumbu** | Inaonekana | Imesimbwa kwa njia fiche | N/A |
| **Ulinzi wa Kurudia** | Hakuna | Kufunga kumbukumbu | Anwani ya T kwa kila changamoto |
| **Mfumo wa Matumizi ya Huduma** | Inaweza kuunganishwa | Privat | Haiwezi kuunganishwa (anwani mpya) |

### Tatizo la Urefu wa Muda, Litatatuliwa na Vikao vya Mazungumzo

> * "Lakini Zcash ina 75 sekunde block mara".*

** vikao kutatua hili. * On-mnyororo kusubiri hutokea hasa mara moja katika amana. Kila ombi baadae ni papo hapo.

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

** Mashine Malipo Itifaki (MPP)** ni itifaki standardized kwamba itawezesha uhuru programu mawakala (AI mawakawa, bots, scripts) kugundua, kujadili na kutimiza mahitaji ya malipo kwa API upatikanaji wote bila uingiliaji wa binadamu.

### Jinsi MPP Integrates na APIs

MPP ifuatavyo HTTP **402 Malipo required** mtiririko:

1. **Agent maombi** rasilimali kutoka kulipwa API mwisho.
2. ** Seva anajibu** na `402 Payment Required` + changamoto iliyosainiwa (kiasi, mpokeaji, memo).
3. **Agent hulipa** kwa kutumia njia ya malipo sambamba (kwa mfano, Zimppy shielded Zcash).
4. **Agent reviews** ombi na `Authorization: Payment {txid}`.
5. ** Seva inathibitisha** malipo cryptographically (Orchard IVK decryption, kiasi + memo kuangalia).
6. ** Seva anajibu** na `200 OK` + a `Payment-Receipt` kichwa.

### Spec Utiifu

- **HMAC-SHA256** changamoto kusaini
- ** RFC 9457** structured makosa majibu
- **`/.well-known/payment`** mwisho kwa ajili ya kugundua njia moja kwa moja malipo
- ** Orchard IVK** (Incoming Viewing Key) kwa ajili ya upande wa seva malipo uthibitisho bila kufichua matumizi funguo

---

## Jinsi Zimppy Inavyofanya Kazi

### Mikutano (Ilipendekezwa)

Vikao ni msingi mwingiliano mfano. wakala amana usawa on-mnyororo mara moja, anapokea bearer ishara, na kuitumia kwa maombi yote ya baadaye katika zero latency.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

** Bora kwa ajili ya:** High-frequency API wito, LLM inference, kurudia data maswali.

---

### Streaming

Pay-kwa ishara ya yaliyomo metered mikononi juu ** Server - Kutumwa Matukio (SSE) **. server deducts kutoka usawa kikao kwa neno au alama streamed.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

** Bora kwa ajili ya:** LLM majibu Streaming, data katika muda halisi feeds, kulipa-kwa ishara AI zana.

---

### Malipo ya malipo

Moja ya ulinzi malipo kwa ombi. kamili HTTP 402 mtiririko ni kutekelezwa kwa wito. Yanafaa wakati maombi ni nadra au high-thamani.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

** Bora kwa ajili ya:** High thamani moja-off maombi, wito mara chache API, mwisho wa data premium.

---

## Matumizi ya kesi & Mifano

### 1. AI Agent (Mtumiaji wa akili)

A kisheria AI wakala maswali kulipwa kesi ya sheria database. Kutumia Zimppy kulindwa vikao, wala utambulisho wa kampuni ya sheria au maalum queries ni inayoonekana kwenye mnyororo - ulinzi mwanasheria-mteja upendeleo katika ngazi miundombinu.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Agent kwa Medical Uchunguzi Bomba

Wakala wa uchunguzi wa matibabu anauliza database nyingi za kliniki. Malipo ya kulindwa huhakikisha mifumo ya maswali ya mgonjwa haiwezi kuunganishwa kwa watoa huduma zote.

### 3. Uchambuzi wa Fedha Agent

algorithmic biashara wakala analipa kwa ajili ya muda halisi soko data APIs. malipo Uwazi kutumia safi T-anwani per changamoto, kuzuia matumizi muundo uwiano katika wauzaji data.

### 4. MCP Tool Server, kulipwa AI Tools

MCP (Model Context Protocol) server inaonyesha zana za AI zilizolipwa. Kila wito wa chombo husababisha malipo ya Zimppy, kuwezesha soko la uwezo wa AI uliopatikana kwa pesa.

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

## Kuweka Up Zimppy Wallet

Zimppy CLI hutoa interface kamili mkoba. amri zote zinapatikana kupitia `npx zimppy`.

### Hatua ya 1: Unda Pochi (Wallet)

```bash
npx zimppy wallet create
```

Inazalisha funguo za cryptographic na inaonyesha ** mbegu yako phrase. Hifadhi hii salama - haiwezi kurejeshwa ikiwa imepotea.

### Hatua ya 2: Chunguza Anwani Yako na Usawaziko Wako

```bash
npx zimppy wallet whoami
```

Displays your **Unified Address (UA)**, **T-address**, current balance, and active network.

```bash
npx zimppy wallet balance --all
```

Inaonyesha per-akaunti usawa kuvunjika katika akaunti zote ZIP-32.

### Hatua ya 3: Weka Pesa Katika Mkoba wako

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

### Hatua ya 5: Kufanya ombi la malipo moja kwa moja

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
- `mppx.charge()` kushughulikia nzima 402 changamoto / kuthibitisha maisha mzunguko
- `result.withReceipt()` huambatanisha risiti ya malipo kwa njia za ki-cryptographic kwenye jibu.

---

### TypeScript Server - Uwazi

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Kila changamoto inazalisha ** safi T-anwani, kufanya maombi ya malipo unlinkable katika vikao.

---

### TypeScript Mteja

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Mteja intercepts `402` majibu, kufungua kikao moja kwa moja, na retries ombi - wito code inahitaji hakuna malipo maalum mantiki.

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
- `WithReceipt` Wrap jibu na risiti ya malipo cryptographic.
- `ChargeConfig` inafafanua mantiki bei - inaweza kuwa na nguvu kulingana na maombi vigezo

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

`send_with_payment` huongeza yoyote HTTP mteja na moja kwa moja 402 utunzaji, usimamizi wa kikao, na Zcash malipo kutimiza.

---

## CLI Marejeleo

| Amri | Maelezo |
|---|---|
| `npx zimppy wallet create` | Tengeneza funguo na onyesha kifungu cha mbegu |
| `npx zimppy wallet whoami` | Onyesha anwani (UA + T-addr), salio, mtandao |
| `npx zimppy wallet balance --all` | Mchanganuo wa salio kwa kila akaunti |
| `npx zimppy wallet send <addr> <zat>` | Tuma ZEC iliyolindwa au inayoonekana wazi |
| `npx zimppy wallet transfer <from> <to> <zat>` | Uhamisho wa ndani wa akaunti tofauti |
| `npx zimppy wallet shield` | Hamisha fedha zinazoonekana wazi hadi Orchard (zimefunikwa) |
| `npx zimppy wallet use <name>` | Badilisha utambulisho wa pochi inayotumika |
| `npx zimppy request <url>` | Otomatiki 402 -> lipa -> ombi la kujaribu tena |

---

## Sifa Muhimu za Mfano wa Yesu

### Wakala-Native pochi

Zimppy pochi ni iliyoundwa kwa ajili ya matumizi programmatic na mawakala AI - si binadamu-kusimamiwa browser upanuzi. funguo zinasimamiwa kupitia CLI au SDKs, akaunti inaweza kuzungushwa kupitia **ZIP-32 derivation account**, na mkoba inasaidia kikamilifu automatiska malipo kati yake bila kibali cha mwanadamu kila shughuli.

### Multi-Agent Support (Msaada wa Wakala Mbalimbali)

Multiple agents can operate from the same wallet using **ZIP-32 account rotation** - each agent gets its own account with isolated balance tracking, cross-account transfer capability, and per-account balance reporting. This enables fleet management of many agents from a single wallet infrastructure.

### Usimamizi wa Fedha za Zcash (Orchard)

Shielded payments use Zcash's **Orchard protocol** - the latest and most secure shielded pool. The server verifies payments using an **Incoming Viewing Key (IVK)**, which can decrypt received notes without exposing the spending key. Replay attacks are prevented via **memo binding** - each challenge embeds a unique `zimppy:{challenge_id}` memo kwamba ni cryptographically kuthibitishwa.

### Vikao , Zero-Per-Request Latency (Hakuna wakati wa kusubiri kwa ombi)

Usanifu wa kikao decouples on-mnyororo uthibitisho kusubiri kutoka kwa kila ombi latency. Baada ya amana moja (~ sekunde 75), yote baadaye mtoa ishara maombi ni kutumika instantly na hakuna ushirikiano blockchain mpaka kikao karibu.

### Streaming , Pay-Per-Token (Kulipa kwa kila Token)

Asili ** SSE (Server-Sent Matukio) msaada inawezesha kulipa kwa ishara kipimo maudhui. Bora kwa LLM inference APIs ambapo pato urefu ni kutofautiana na bili lazima kutafakari matumizi halisi.

### Spec Utiifu

- ** HMAC-SHA256** imesainiwa changamoto kuzuia bandia
- ** RFC 9457** umeboreshwa kosa format kwa ajili ya kushughulikia makosa interoperable
- **`/.well-known/payment`** kwa ajili ya moja kwa moja njia malipo kugundua na wakala yoyote MPP-kufuata

---

## Usanifu wa majengo

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

**`zimppy-core`** - msingi cryptographic. Hushughulikia Orchard kumbuka decryption kutumia IVK server ya, memo parsing, replay ulinzi mantiki na changamoto uthibitisho. Imeandikwa katika kutu kwa ajili ya utendaji na usahihi.

**`zimppy-wallet`** - Asili Zcash mkoba powered by `zingolib`. Inasimamia funguo, akaunti, walinzi / usawa wa uwazi na kuwasilisha shughuli.

**`zimppy-rs`** - Rust SDK. Inatoa `ChargeMethod`, `SessionMethod`, na `PaymentProvider` traits, pamoja na Axum extractors (`MppCharge`, `WithReceipt`) kwa ajili ya ushirikiano wa seva ergonomic.

**`zimppy-napi`** - NAPI-RS bindings kwamba yatangaza Rust msingi kwa Node.js, kuwezesha TypeScript SDK kutumia injini hiyo cryptographic bila reimplementing Zcash primitives katika JavaScript.

**`zimppy-ts`** - TypeScript SDK. Wraps NAPI bindings na idiomatic async / kusubiri APIs kwa malipo, kikao, na SSE mtiririko wa mkondo.

**`zimppy-cli`** - amri-line mkoba na ombi chombo. Inasaidia auto kulipa (402 -> kulipa -> jaribu tena), usimamizi wa kikao, na shughuli zote mfuko wa fedha.

---

## Mifano & Demos

| Mfano | Maelezo |
|---|---|
| `examples/fortune-teller/` | Chaji, kipindi, na maonyesho ya utiririshaji - Seva ya kutu + mteja |
| `examples/llm-summarizer/` | Onyesho la utiririshaji la LLM la malipo kwa kila tokeni |
| `examples/mcp-server/` | Seva ya zana ya MCP yenye zana za akili bandia zinazolipishwa |
| `examples/ts-server/` | Utekelezaji wa marejeleo ya seva ya TypeScript MPP |

---

## Mambo Yaliyo Ndani - Muhtasari wa Sehemu za Kitabu hicho

| Kipengele | Maelezo |
|---|---|
| **Vipindi** | Amana mara moja, maombi ya mtoa huduma papo hapo, marejesho ya pesa yanapofungwa |
| **Inatiririshwa** | Maudhui yaliyopimwa kwa kila tokeni kupitia SSE |
| **Chaji** | Malipo yaliyolindwa au ya uwazi kwa kila ombi la HTTP (mtiririko wa 402) |
| **Malipo ya Uwazi** | Anwani za T zenye amri ya kuzuia marudio kwa kila changamoto + ngao |
| **Multi-Account** | ZIP-32 account rotation, cross-account transfers, per-account balances |
| **Pochi ya CLI** | Tuma, ngao, uhamisho, salio --all, whoami, lipa kiotomatiki |
| **SDK mbili** | Hati ya Aina na Kutu |
| **Inafuata Maalum** | Changamoto za HMAC-SHA256, makosa ya RFC 9457, `/.well-known/payment` ugunduzi |

---

*Kwa habari zaidi, tembelea tovuti ya www.europa.eu/communion_environment [zimppy.xyz](https://zimppy.xyz)*

---

## Kurasa Zinazohusiana

- [Mkoba](/using-zcash/wallets)  Zcash pochi kwamba msaada ulinzi shughuli
- [Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](/using-zcash/shielded-pools)  Jinsi Orchard kulinda shughuli kulinda data ya malipo
- [Usindikaji wa Malipo](/using-zcash/payment-processors)  Njia nyingine za kukubali malipo ya Zcash
- [Zcash Shielded Mali za fedha](/zcash-tech/zcash-shielded-assets)  ZSAs na siku zijazo za programu ya Zcash
- [Miradi ya Jumuiya](/zcash-community/community-projects)  Miradi zaidi ya mazingira Zcash
