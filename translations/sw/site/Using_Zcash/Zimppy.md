<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Zimppy.xyz

## Kwa Ufupi

- **Zimppy** ni miundombinu ya malipo [payment] inayotanguliza faragha [privacy] kwa mawakala wa AI inayotumia Itifaki ya Malipo ya Mashine ya Zcash (MPP)
- **Weka amana mara moja** on-chain (~sekunde 75), kisha fanya **maombi ya papo hapo yasiyo na kikomo** bila mwingiliano wa blockchain kwa kila ombi
- Inasaidia malipo ya **Zcash ya faragha kikamilifu (Orchard)** — mtumaji, mpokeaji, kiasi, na ujumbe [memo] vyote vimesimbwa fiche
- Hufanya kazi na SDK za **TypeScript na Rust** kwa ujumuishaji rahisi katika mifumo ya AI na seva za API
- Ni bora kwa **API za LLM, masoko ya data, seva za vifaa vya MCP**, na matumizi yoyote ya malipo ya M2M

---

> **Zimppy** ni mbinu ya malipo ya Itifaki ya Malipo ya Mashine (MPP) kwa Zcash inayosaidia malipo ya faragha na ya uwazi. Weka amana mara moja on-chain, kisha fanya maombi ya papo hapo yasiyo na kikomo ya bearer bila mwingiliano wa mnyororo kwa kila ombi.

---

## Yaliyomo

1. [Zimppy.xyz ni nini?](#what-is-zimppyxyz)
2. [Kwa nini malipo ya faragha kwa mawakala wa AI?](#why-shielded-payments-for-ai-agents)
3. [Itifaki ya Malipo ya Mashine (MPP)](#machine-payment-protocol-mpp)
4. [Jinsi Zimppy inavyofanya kazi](#how-zimppy-works)
   - [Vipindi (Vinapendekezwa)](#sessions-recommended)
   - [Utiririshaji](#streaming)
   - [Tozo](#charge)
5. [Matumizi na mifano](#use-cases--examples)
6. [Usakinishaji](#installation)
7. [Kusanidi pochi ya Zimppy](#setting-up-the-zimppy-wallet)
8. [Kuunganisha Zimppy](#integrating-zimppy--typescript-sdk)
   - [Seva (ya faragha)](#typescript-server--shielded)
   - [Seva (ya uwazi)](#typescript-server--transparent)
   - [Mteja](#typescript-client)
9. [Kuunganisha Zimppy - SDK ya Rust](#integrating-zimppy--rust-sdk)
   - [Seva (Axum)](#rust-server-axum)
   - [Mteja](#rust-client)
10. [Marejeleo ya CLI](#cli-reference)
11. [Vipengele muhimu](#key-features)
12. [Usanifu](#architecture)
13. [Mifano na maonyesho](#examples--demos)

---

## Zimppy.xyz ni nini?

**Zimppy.xyz** ni miundombinu ya malipo inayotanguliza faragha iliyoundwa mahsusi kwa mawakala wa AI na mitiririko ya kazi ya kiotomatiki ya mashine-kwa-mashine (M2M). Inatekeleza **Itifaki ya Malipo ya Mashine (MPP)** kwa kutumia **Zcash** kama sarafu yake msingi, ikiruhusu hali za malipo ya faragha (ya kibinafsi kikamilifu) na ya uwazi.

Tofauti na mifumo ya jadi ya malipo ya blockchain, ambapo kila muamala [transaction] huonekana hadharani on-chain, Zimppy imeundwa kwa msingi wa usanifu unaotegemea vipindi ambao huondoa ucheleweshaji wa kila ombi huku ikihifadhi faragha ya kriptografia. Hali hii huifanya ifae kipekee mawakala wa AI wanaohitaji kulipia API, data, uwezo wa kompyuta, au vifaa vya AI kwa programu, bila kufichua metadata ya kitabia.

### Sifa za Msingi

- **Weka amana mara moja** on-chain (~sekunde 75 kwa uthibitisho [confirmation] wa Zcash)
- **Maombi ya papo hapo yasiyo na kikomo** baada ya kufungua kipindi, bila mwingiliano wa mnyororo kwa kila ombi
- **Malipo ya faragha** husimba fiche mtumaji, mpokeaji, kiasi, na ujumbe kwa kutumia itifaki ya Zcash ya Orchard
- **Malipo ya uwazi** hutumia anwani za T kwa kila changamoto ili kuzuia kurudiwa bila faragha kamili
- **Yanayofuata vipimo**, changamoto za HMAC-SHA256, hitilafu za RFC 9457, ugunduzi wa `/.well-known/payment`

---

## Kwa nini malipo ya faragha kwa mawakala wa AI?

Kwa mawakala wa AI wanaoshughulikia mitiririko nyeti ya kazi, utafiti wa kisheria, maswali ya kitabibu, uchambuzi wa kifedha, na ujasusi wa ushindani, **kila malipo ya umma ni uvujaji wa metadata**. Zimppy ndiyo mbinu pekee ya malipo ya MPP ambayo ni **ya kibinafsi kwa chaguo-msingi**.

### Jedwali la Ulinganisho wa Faragha

| Sifa | Minyororo ya Umma (USDC, ETH) | Zimppy ya Faragha | Zimppy ya Uwazi |
|---|---|---|---|
| **Mtumaji** | Anaonekana | Amesimbwa fiche | Anaonekana |
| **Mpokeaji** | Anaonekana | Amesimbwa fiche | Kwa kila changamoto (asiyeweza kuhusishwa) |
| **Kiasi** | Kinaonekana | Kimesimbwa fiche | Kinaonekana |
| **Ujumbe** | Unaonekana | Umesimbwa fiche | Haitumiki |
| **Ulinzi dhidi ya kurudiwa** | Hakuna | Ufungaji wa ujumbe | Anwani ya T kwa kila changamoto |
| **Muundo wa matumizi ya huduma** | Unaweza kuhusishwa | Binafsi | Hauwezi kuhusishwa (anwani mpya) |

### Tatizo la Ucheleweshaji, Linalotatuliwa na Vipindi

> *“Lakini Zcash ina muda wa block wa sekunde 75.”*

**Vipindi hutatua hili.** Kusubiri on-chain hutokea **mara moja tu** wakati wa kuweka amana. Kila ombi linalofuata ni la papo hapo.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Lipa mara moja, piga simu papo hapo, pata baki lako.** Ucheleweshaji kwa kila ombi ni sifuri.

---

## Itifaki ya Malipo ya Mashine (MPP)

**Itifaki ya Malipo ya Mashine (MPP)** ni itifaki sanifu inayowezesha mawakala wa programu wanaojiendesha (mawakala wa AI, boti, hati) kugundua, kujadiliana, na kutimiza mahitaji ya malipo kwa ufikiaji wa API bila uingiliaji wa binadamu.

### Jinsi MPP Inavyounganishwa na API

MPP hufuata mtiririko wa HTTP **402 Payment Required**:

1. **Wakala huomba** rasilimali kutoka kwenye endpoint ya API inayolipiwa.
2. **Seva hujibu** kwa `402 Payment Required` + changamoto iliyotiwa sahihi (kiasi, mpokeaji, ujumbe).
3. **Wakala hulipa** kwa kutumia mbinu ya malipo inayooana (kwa mfano, Zcash ya faragha ya Zimppy).
4. **Wakala hujaribu tena** ombi kwa `Authorization: Payment {txid}`.
5. **Seva huthibitisha** malipo kwa njia ya kriptografia (usimbuaji wa IVK wa Orchard, ukaguzi wa kiasi + ujumbe).
6. **Seva hujibu** kwa `200 OK` + kichwa cha `Payment-Receipt`.

### Uzingatiaji wa Vipimo

- Utiaji sahihi wa changamoto wa **HMAC-SHA256**
- Majibu ya hitilafu yaliyo na muundo wa **RFC 9457**
- Endpoint ya **`/.well-known/payment`** kwa ugunduzi wa kiotomatiki wa mbinu ya malipo
- **IVK ya Orchard** (Incoming Viewing Key) kwa uthibitishaji wa malipo upande wa seva bila kufichua funguo za kutumia pesa

---

## Jinsi Zimppy Inavyofanya Kazi

### Vipindi (Vinapendekezwa)

Vipindi ni muundo mkuu wa mwingiliano. Wakala huweka salio on-chain mara moja, hupokea tokeni ya bearer, na huitumia kwa maombi yote yanayofuata bila ucheleweshaji.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Inafaa zaidi kwa:** Miito ya API yenye marudio mengi, inferensi ya LLM, maswali ya data yanayorudiwa.

---

### Utiririshaji

Maudhui yenye kipimo cha malipo-kwa-tokeni yanayowasilishwa kupitia **Server-Sent Events (SSE)**. Seva hupunguza salio la kipindi kwa kila neno au tokeni inayotiririshwa.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Inafaa zaidi kwa:** Majibu ya utiririshaji ya LLM, milisho ya data ya wakati halisi, vifaa vya AI vya malipo-kwa-tokeni.

---

### Tozo

Malipo moja ya faragha kwa kila ombi. Mtiririko kamili wa HTTP 402 hutekelezwa kwa kila mwito. Unafaa wakati maombi hayafanywi mara kwa mara au yana thamani kubwa.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Inafaa zaidi kwa:** Maombi ya mara moja ya thamani kubwa, miito ya API isiyo ya mara kwa mara, endpoint za data za malipo ya juu.

---

## Matumizi na Mifano

### 1. Wakala wa AI

Wakala wa AI wa kisheria huuliza hifadhidata inayolipiwa ya sheria za kesi. Kwa kutumia vipindi vya faragha vya Zimppy, wala utambulisho wa kampuni ya sheria wala maswali mahususi hayaonekani on-chain — hivyo kulinda siri ya mawasiliano ya wakili na mteja katika kiwango cha miundombinu.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Wakala wa AI kwa Mfumo wa Maswali ya Kitabibu

Wakala wa uchunguzi wa kitabibu huuliza hifadhidata nyingi za kitabibu. Malipo ya faragha huhakikisha kuwa miundo ya maswali ya wagonjwa haiwezi kuhusishwa kati ya watoa huduma.

### 3. Wakala wa Uchambuzi wa Kifedha

Wakala wa biashara wa kialgorithimu hulipia API za data ya soko ya wakati halisi. Malipo ya uwazi hutumia anwani mpya za T kwa kila changamoto, yakizuia uhusishaji wa miundo ya matumizi kati ya wauzaji wa data.

### 4. Seva ya Kifaa cha MCP, Vifaa vya AI Vinavyolipiwa

Seva ya MCP (Model Context Protocol) hutoa vifaa vya AI vinavyolipiwa. Kila utekelezaji wa kifaa husababisha tozo ya Zimppy, ikiruhusu soko la uwezo wa AI unaolipishwa.

### 5. Kifupishaji cha LLM, Malipo kwa Kila Tokeni

Huduma ya ufupishaji ya LLM hutoza mawakala kwa kila tokeni ya matokeo kupitia utiririshaji wa SSE, ikiwa na upunguzaji wa salio kiotomatiki na urejeshaji wa salio la malipo ya awali ambalo halijatumika.

---

## Usakinishaji

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

## Kusanidi Pochi ya Zimppy

CLI ya Zimppy hutoa kiolesura kamili cha pochi. Amri zote zinapatikana kupitia `npx zimppy`.

### Hatua ya 1 : Unda Pochi

```bash
npx zimppy wallet create
```

Hutengeneza funguo za kriptografia na kuonyesha **maneno yako ya kurejesha pochi [seed phrase]**. Yahifadhi kwa usalama — hayawezi kurejeshwa yakipotea.

### Hatua ya 2 : Angalia Anwani na Salio Lako

```bash
npx zimppy wallet whoami
```

Huonyesha **Anwani Yako Iliyounganishwa (UA)**, **anwani ya T**, salio la sasa, na mtandao unaotumika.

```bash
npx zimppy wallet balance --all
```

Huonyesha mgawanyo wa salio kwa kila akaunti katika akaunti zote za ZIP-32.

### Hatua ya 3 : Weka Fedha Kwenye Pochi Yako

Tuma ZEC kwenye Anwani Yako Iliyounganishwa kutoka pochi au soko la kubadilishana sarafu linalooana na Zcash. Amana za faragha huenda moja kwa moja kwenye akaunti yako ya Orchard.

### Hatua ya 4 : Tuma na Hamisha Fedha kwenye Faragha

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

### Hatua ya 5 : Fanya Ombi la Kulipa Kiotomatiki

```bash
npx zimppy request <url>
```

Hushughulikia kiotomatiki mtiririko kamili wa 402 -> lipa -> jaribu tena. Vipindi hufunguliwa na kusimamiwa kwa uwazi.

---

## Kuunganisha Zimppy - SDK ya TypeScript

### Seva ya TypeScript - ya Faragha

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

**Hoja muhimu:**
- `zcash({ wallet: 'server' })` hupakia pochi ya faragha ya seva
- `mppx.charge()` hushughulikia mzunguko kamili wa changamoto/uthibitishaji wa 402
- `result.withReceipt()` huambatisha risiti ya malipo ya kriptografia kwenye jibu

---

### Seva ya TypeScript - ya Uwazi

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Kila changamoto hutengeneza **anwani mpya ya T**, ikifanya maombi ya malipo yasiyoweza kuhusishwa kati ya vipindi.

---

### Mteja wa TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Mteja hunasa majibu ya `402`, hufungua kipindi kiotomatiki, na hujaribu tena ombi — msimbo unaoita hauhitaji mantiki mahususi ya malipo.

---

## Kuunganisha Zimppy - SDK ya Rust

### Seva ya Rust (Axum)

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

**Hoja muhimu:**
- `MppCharge<Price>` ni kitoa data cha Axum kinachothibitisha malipo kabla ya handler kutekelezwa
- `WithReceipt` hufunika jibu kwa risiti ya malipo ya kriptografia
- `ChargeConfig` hufafanua mantiki ya bei — inaweza kubadilika kulingana na vigezo vya ombi

---

### Mteja wa Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` hupanua mteja wowote wa HTTP kwa ushughulikiaji wa kiotomatiki wa 402, usimamizi wa vipindi, na utimizaji wa malipo wa Zcash.

---

## Marejeleo ya CLI

| Amri | Maelezo |
|---|---|
| `npx zimppy wallet create` | Tengeneza funguo na uonyeshe maneno ya kurejesha pochi |
| `npx zimppy wallet whoami` | Onyesha anwani (UA + anwani ya T), salio, mtandao |
| `npx zimppy wallet balance --all` | Mgawanyo wa salio kwa kila akaunti |
| `npx zimppy wallet send <addr> <zat>` | Tuma ZEC ya faragha au ya uwazi |
| `npx zimppy wallet transfer <from> <to> <zat>` | Uhamisho wa ndani kati ya akaunti |
| `npx zimppy wallet shield` | Hamisha fedha za uwazi hadi Orchard (ya faragha) |
| `npx zimppy wallet use <name>` | Badilisha utambulisho wa pochi unaotumika |
| `npx zimppy request <url>` | Ombi la kiotomatiki la 402 -> lipa -> jaribu tena |

---

## Vipengele Muhimu

### Pochi Asilia za Mawakala

Pochi za Zimppy zimeundwa kwa matumizi ya kiprogramu ya mawakala wa AI — si viendelezi vya kivinjari vinavyosimamiwa na binadamu. Funguo husimamiwa kupitia CLI au SDK, akaunti zinaweza kuzungushwa kupitia utengenezaji wa akaunti wa **ZIP-32**, na pochi inasaidia mitiririko ya malipo ya kiotomatiki kikamilifu bila idhini ya binadamu kwa kila muamala.

### Usaidizi wa Mawakala Wengi

Mawakili wengi wanaweza kufanya kazi kutoka kwenye pochi moja kwa kutumia mzunguko wa akaunti wa **ZIP-32** — kila wakala hupata akaunti yake yenye ufuatiliaji wa salio uliotengwa, uwezo wa kuhamisha kati ya akaunti, na utoaji wa taarifa za salio kwa kila akaunti. Hii huwezesha usimamizi wa kundi la mawakala wengi kutoka miundombinu moja ya pochi.

### Miamala ya Zcash ya Faragha Kikamilifu (Orchard)

Malipo ya faragha hutumia **itifaki ya Orchard** ya Zcash, bwawa la faragha lililoanzishwa na NU5. Seva huthibitisha malipo kwa kutumia **Incoming Viewing Key (IVK)**, ambayo inaweza kusimbua madokezo yaliyopokelewa bila kufichua ufunguo wa kutumia pesa. Mashambulizi ya kurudiwa huzuiwa kupitia **ufungaji wa ujumbe** — kila changamoto hujumuisha ujumbe wa kipekee wa `zimppy:{challenge_id}` unaothibitishwa kwa njia ya kriptografia.

### Vipindi, Bila Ucheleweshaji kwa Kila Ombi

Usanifu wa vipindi hutenganisha kusubiri uthibitisho wa on-chain na ucheleweshaji kwa kila ombi. Baada ya amana moja (~sekunde 75), maombi yote yanayofuata ya tokeni ya bearer hutolewa papo hapo bila mwingiliano wa blockchain hadi kipindi kifungwe.

### Utiririshaji, Malipo kwa Kila Tokeni

Usaidizi asilia wa **SSE (Server-Sent Events)** huwezesha maudhui yenye kipimo cha malipo-kwa-tokeni. Ni bora kwa API za inferensi za LLM ambapo urefu wa matokeo hubadilika na utozaji unapaswa kuonyesha matumizi halisi.

### Uzingatiaji wa Vipimo

- Changamoto zilizotiwa sahihi za **HMAC-SHA256** huzuia ughushi
- Muundo wa hitilafu wa **RFC 9457** kwa ushughulikiaji wa hitilafu unaoweza kuingiliana
- **`/.well-known/payment`** kwa ugunduzi wa kiotomatiki wa mbinu ya malipo na wakala wowote unaofuata MPP

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

### Majukumu ya Vipengele

**`zimppy-core`** - Kiini cha kriptografia. Hushughulikia usimbuaji wa madokezo wa Orchard kwa kutumia IVK ya seva, uchanganuzi wa ujumbe, mantiki ya ulinzi dhidi ya kurudiwa, na uthibitishaji wa changamoto. Kimeandikwa kwa Rust kwa utendaji na usahihi.

**`zimppy-wallet`** - Pochi asilia ya Zcash inayotumia `zingolib`. Husimamia funguo, akaunti, masalio ya faragha/uwazi, na uwasilishaji wa miamala.

**`zimppy-rs`** - SDK ya Rust. Hutoa traits za `ChargeMethod`, `SessionMethod`, na `PaymentProvider`, pamoja na vitoa data vya Axum (`MppCharge`, `WithReceipt`) kwa ujumuishaji rahisi wa seva.

**`zimppy-napi`** - Bindings za NAPI-RS zinazofichua kiini cha Rust kwa Node.js, zikiwezesha SDK ya TypeScript kutumia injini hiyo hiyo ya kriptografia bila kutekeleza tena primitivi za Zcash katika JavaScript.

**`zimppy-ts`** - SDK ya TypeScript. Hufunika bindings za NAPI kwa API za async/await za kiasili kwa mitiririko ya tozo, kipindi, na utiririshaji wa SSE.

**`zimppy-cli`** - Pochi ya mstari wa amri na kifaa cha maombi. Husaidia kulipa kiotomatiki (402 -> lipa -> jaribu tena), usimamizi wa vipindi, na shughuli zote za pochi.

---

## Mifano na Maonyesho

| Mfano | Maelezo |
|---|---|
| `examples/fortune-teller/` | Maonyesho ya tozo, kipindi, na utiririshaji - seva ya Rust + mteja |
| `examples/llm-summarizer/` | Onyesho la utiririshaji wa LLM wa malipo-kwa-tokeni |
| `examples/mcp-server/` | Seva ya kifaa cha MCP yenye vifaa vya AI vinavyolipiwa |
| `examples/ts-server/` | Utekelezaji wa marejeleo wa seva ya MPP ya TypeScript |

---

## Vilivyojumuishwa - Muhtasari wa Vipengele

| Kipengele | Maelezo |
|---|---|
| **Vipindi** | Weka amana mara moja, maombi ya papo hapo ya bearer, urejeshaji fedha wakati wa kufunga |
| **Utiririshaji** | Maudhui yenye kipimo cha malipo-kwa-tokeni kupitia SSE |
| **Tozo** | Malipo ya faragha au ya uwazi kwa kila ombi la HTTP (mtiririko wa 402) |
| **Malipo ya Uwazi** | Anwani za T zenye ulinzi dhidi ya kurudiwa kwa kila changamoto + amri ya shield |
| **Akaunti Nyingi** | Mzunguko wa akaunti wa ZIP-32, uhamisho kati ya akaunti, masalio kwa kila akaunti |
| **Pochi ya CLI** | Tuma, shield, hamisha, balance --all, whoami, lipa kiotomatiki |
| **SDK Mbili** | TypeScript na Rust |
| **Inayofuata Vipimo** | Changamoto za HMAC-SHA256, hitilafu za RFC 9457, ugunduzi wa `/.well-known/payment` |

---

*Kwa maelezo zaidi, tembelea [zimppy.xyz](https://zimppy.xyz)*

---

## Kurasa Zinazohusiana

- [Pochi](/using-zcash/wallets) — Zcash pochi zinazosaidia miamala ya faragha
- [Mabwawa ya Faragha](/using-zcash/shielded-pools) — Jinsi miamala ya faragha ya Orchard inavyolinda data ya malipo
- [Wachakataji wa Malipo](/using-zcash/payment-processors) — Njia nyingine za kukubali malipo ya Zcash
- [Mali za Faragha za Zcash](/zcash-tech/zcash-shielded-assets) — ZSA na mustakabali wa uwezo wa kupangiliwa wa Zcash
- [Miradi ya Jamii](/zcash-community/community-projects) — Miradi zaidi ya mfumo ikolojia wa Zcash
