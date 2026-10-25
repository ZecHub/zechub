<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimpy.xyz

## TL;DR

- **Zimpy** ni miundombinu ya malipo ya faragha kwa mawakala wa akili bandia wanaotumia Itifaki ya Malipo ya Mashine Zcash's (MPP)
- **Weka pesa mara moja** kwenye mnyororo (~sekunde 75), kisha fanya **maombi ya papo hapo yasiyo na kikomo** bila mwingiliano wa blockchain kwa kila ombi
- Inasaidia malipo ya **Zcash (Orchard)** yaliyolindwa kikamilifu — mtumaji, mpokeaji, kiasi, na memo zote zimesimbwa kwa njia fiche
- Inafanya kazi na **TypeScript na Rust SDK** kwa urahisi wa kuunganishwa katika mabomba ya akili bandia na seva za API
- Inafaa kwa ajili ya **API za LLM, masoko ya data, seva za zana za MCP**, na matumizi yoyote ya malipo ya M2M

---

> **Zimpy** ni njia ya malipo ya Itifaki ya Malipo ya Mashine (MPP) kwa Zcash inayounga mkono malipo yaliyolindwa na yaliyo wazi. Weka pesa mara tu unapoingia kwenye mnyororo, kisha fanya maombi ya papo hapo bila kikomo bila mwingiliano wa mnyororo kwa kila ombi.

---

## Orodha ya Yaliyomo

1. [Zimppy.xyz ni nini?](#what-is-zimppyxyz)
2. [Kwa Nini Malipo Yaliyolindwa kwa Mawakala wa AI?](#why-shielded-payments-for-ai-agents)
3. [Itifaki ya Malipo ya Mashine (MPP)](#machine-payment-protocol-mpp)
4. [Jinsi Zimpy Inavyofanya Kazi](#how-zimppy-works)
   - [Vipindi (Vinapendekezwa)](#sessions-recommended)
   - [Kutiririsha](#streaming)
   - [Chaji](#charge)
5. [Mifano na Kesi za Matumizi](#use-cases--examples)
6. [Usakinishaji](#installation)
7. [Kuweka Pochi ya Zimpy](#setting-up-the-zimppy-wallet)
8. [Kuunganisha Zimppy](#integrating-zimppy--typescript-sdk)
   - [Seva (Imehifadhiwa)](#typescript-server--shielded)
   - [Seva (Uwazi)](#typescript-server--transparent)
   - [Mteja](#typescript-client)
9. [Kuunganisha Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Mhudumu (Axum)](#rust-server-axum)
   - [Mteja](#rust-client)
10. [Marejeleo ya CLI](#cli-reference)
11. [Vipengele Muhimu](#key-features)
12. [Usanifu](#architecture)
13. [Mifano na Maonyesho](#examples--demos)

---

## Zimppy.xyz ni nini?

**Zimpy.xyz** ni miundombinu ya malipo ya faragha iliyoundwa mahsusi kwa mawakala wa akili bandia na mtiririko wa kazi otomatiki wa mashine-kwa-mashine (M2M). Inatekeleza **Itifaki ya Malipo ya Mashine (MPP)** kwa kutumia **Zcash** kama sarafu yake ya msingi, ikiwezesha njia za malipo zilizolindwa (za faragha kikamilifu) na za uwazi.

Tofauti na mifumo ya malipo ya blockchain ya kitamaduni, ambapo kila muamala unaonekana hadharani kwenye mnyororo, Zimppy imeundwa kulingana na usanifu unaotegemea kipindi ambao huondoa ucheleweshaji wa kila ombi huku ikihifadhi faragha ya kriptografia. Hii inafanya iwe inafaa kwa mawakala wa AI wanaohitaji kulipia API, data, hesabu, au zana za AI kiprogramu, bila kuvuja metadata ya kitabia.

### Sifa Kuu

- **Weka pesa mara moja** kwenye mnyororo (~sekunde 75 kwa uthibitisho wa Zcash)
- **Maombi ya papo hapo yasiyo na kikomo** baada ya ufunguzi wa kipindi, mwingiliano sifuri wa mnyororo kwa kila ombi
- **Malipo yaliyolindwa** fiche mtumaji, mpokeaji, kiasi, na memo kwa kutumia itifaki Zcash's Orchard
- **Malipo ya uwazi** tumia anwani za T kwa kila changamoto kwa ajili ya kuzuia marudio bila faragha kamili
- **Inatii Maalum**, Changamoto za HMAC-SHA256, Makosa ya RFC 9457, `/.well-known/payment` ugunduzi

---

## Kwa Nini Malipo Yaliyolindwa kwa Mawakala wa AI?

Kwa mawakala wa akili bandia wanaoshughulikia mtiririko nyeti wa kazi, utafiti wa kisheria, maswali ya kimatibabu, uchambuzi wa kifedha, akili ya ushindani kwa **kila malipo ya umma ni uvujaji wa metadata**. Zimppy ndiyo njia pekee ya malipo ya MPP ambayo ni **ya faragha kwa chaguo-msingi**.

### Jedwali la Ulinganisho wa Faragha

| Mali | Minyororo ya Umma (USDC, ETH) | Zimpy Iliyolindwa | Zimpy Uwazi |
|---|---|---|---|
| **Mtumaji** | Inaonekana | Imesimbwa kwa njia fiche | Inaonekana |
| **Mpokeaji** | Inaonekana | Imesimbwa kwa njia fiche | Kwa kila changamoto (haiwezi kuunganishwa) |
| **Kiasi** | Inaonekana | Imesimbwa kwa njia fiche | Inaonekana |
| **Kumbukumbu** | Inaonekana | Imesimbwa kwa njia fiche | N/A |
| **Ulinzi wa Kurudia** | Hakuna | Kufunga kumbukumbu | Anwani ya T kwa kila changamoto |
| **Mfumo wa Matumizi ya Huduma** | Inaweza kuunganishwa | Privat | Haiwezi kuunganishwa (anwani mpya) |

### Tatizo la Kuchelewa, Linalotatuliwa na Vikao

> *"Lakini Zcash ina muda wa sekunde 75 wa kuzuia."*

**Vipindi hutatua hili.** Kusubiri kwa mnyororo hutokea mara moja tu wakati wa kuweka pesa. Kila ombi linalofuata ni la papo hapo.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Lipa mara moja, piga simu mara moja, rudisha chenji.** Muda wa kuchelewa kwa kila ombi ni sifuri.

---

## Itifaki ya Malipo ya Mashine (MPP)

**Itifaki ya Malipo ya Mashine (MPP)** ni itifaki sanifu inayowawezesha mawakala wa programu huru (mawakala wa AI, roboti, hati) kugundua, kujadili, na kutimiza mahitaji ya malipo kwa ufikiaji wa API bila kuingilia kati kwa mwanadamu.

### Jinsi MPP Inavyounganishwa na API

MPP inafuata mtiririko wa HTTP **402 Payment Required**:

1. **Wakala anaomba** rasilimali kutoka kwa sehemu ya mwisho ya API inayolipishwa.
2. **Seva hujibu** na `402 Payment Required` + changamoto iliyosainiwa (kiasi, mpokeaji, memo).
3. **Wakala hulipa** kwa kutumia njia ya malipo inayolingana (km, Zimppy shielded Zcash).
4. **Wakala anajaribu tena** ombi hilo na `Authorization: Payment {txid}`.
5. **Seva inathibitisha** malipo kwa njia ya usimbaji fiche (Orchard IVK, kiasi + ukaguzi wa memo).
6. **Seva hujibu** na `200 OK` + a `Payment-Receipt` kichwa cha habari.

### Uzingatiaji Maalum

- **HMAC-SHA256** kusaini shindano
- **RFC 9457** majibu ya hitilafu zilizopangwa
- **`/.well-known/payment`** sehemu ya mwisho ya ugunduzi wa njia ya malipo kiotomatiki
- **Orchard IVK** (Incoming Viewing Key) kwa ajili ya uthibitishaji wa malipo upande wa seva bila kufichua funguo za matumizi

---

## Jinsi Zimpy Inavyofanya Kazi

### Vipindi (Vinapendekezwa)

Vipindi ndio muundo mkuu wa mwingiliano. Wakala huweka salio kwenye mnyororo mara moja, hupokea tokeni ya mtoa huduma, na huitumia kwa maombi yote yanayofuata bila kuchelewa kwa sifuri.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Inafaa zaidi kwa:** Simu za API zenye masafa ya juu, hitimisho la LLM, maswali ya data yanayorudiwa.

---

### Kutiririsha

Maudhui yaliyopimwa kwa kila tokeni yanayowasilishwa kupitia **Matukio Yaliyotumwa na Seva (SSE)**. Seva huondoa kutoka kwa salio la kipindi kwa kila neno au tokeni inayotiririshwa.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Inafaa zaidi kwa:** Majibu ya utiririshaji wa LLM, mipasho ya data ya wakati halisi, zana za akili bandia za kulipia kwa kila tokeni.

---

### Chaji

Malipo moja yaliyolindwa kwa kila ombi. Mtiririko kamili wa HTTP 402 unatekelezwa kwa kila simu. Inafaa wakati maombi hayafanyiki mara kwa mara au yenye thamani kubwa.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Inafaa kwa:** Maombi ya mara moja yenye thamani kubwa, simu za API zisizo za mara kwa mara, sehemu za mwisho za data ya malipo.

---

## Mifano na Kesi za Matumizi

### 1. Wakala wa AI

Wakala wa kisheria wa akili bandia (AI) huuliza hifadhidata ya kesi inayolipiwa. Kwa kutumia vipindi vya Zimppy vilivyolindwa, utambulisho wa kampuni ya sheria wala maswali mahususi hayaonekani kwenye mnyororo - kulinda haki za wakili-mteja katika ngazi ya miundombinu.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Wakala wa AI wa Bomba la Maswali ya Kimatibabu

Wakala wa uchunguzi wa kimatibabu huuliza hifadhidata nyingi za kimatibabu. Malipo yaliyolindwa huhakikisha kuwa mifumo ya maswali ya mgonjwa haihusiani na watoa huduma wengine.

### 3. Wakala wa Uchambuzi wa Fedha

Wakala wa biashara wa algoriti hulipa API za data ya soko la wakati halisi. Malipo ya uwazi hutumia anwani mpya za T kwa kila changamoto, kuzuia uhusiano wa muundo wa matumizi kati ya wachuuzi wa data.

### 4. Seva ya Zana ya MCP, Zana za AI Zinazolipishwa

Seva ya MCP (Itifaki ya Muktadha wa Mfano) hufichua zana za AI zinazolipishwa. Kila ombi la zana husababisha malipo ya Zimppy, na kuwezesha soko la uwezo wa AI unaopata pesa.

### 5. Muhtasari wa LLM, Lipa kwa Tokeni

Huduma ya muhtasari wa LLM inatoza mawakala kila tokeni ya matokeo kupitia utiririshaji wa SSE, pamoja na makato ya salio kiotomatiki na kurejeshewa pesa za salio la kulipia kabla ambalo halijatumika.

---

## Usakinishaji

### Node.js / Hati ya Aina

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

## Kuweka Pochi ya Zimpy

Zimppy CLI hutoa kiolesura kamili cha pochi. Amri zote zinapatikana kupitia `npx zimppy`.

### Hatua ya 1: Unda Pochi

```bash
npx zimppy wallet create
```

Huzalisha funguo za kriptografia na kuonyesha **kifunguo chako cha mbegu**. Hifadhi hii kwa usalama - haiwezi kupatikana ikiwa itapotea.

### Hatua ya 2: Angalia Anwani Yako na Salio Lako

```bash
npx zimppy wallet whoami
```

Huonyesha **Unified Address (UA)**, **Anwani ya T**, salio la sasa, na mtandao unaotumika.

```bash
npx zimppy wallet balance --all
```

Inaonyesha uchanganuzi wa salio la kila akaunti katika akaunti zote ZIP-32.

### Hatua ya 3: Kufadhili Pochi Yako

Tuma ZEC kwa Unified Address kutoka kwa pochi au ubadilishaji wowote Zcash-compatible. Amana zilizolindwa huenda moja kwa moja kwenye akaunti yako Orchard.

### Hatua ya 4: Tuma na Ulinde Fedha

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

### Hatua ya 5: Omba Malipo Kiotomatiki

```bash
npx zimppy request <url>
```

Hushughulikia kiotomatiki mtiririko kamili wa 402 -> malipo -> jaribu tena. Vipindi hufunguliwa na kusimamiwa kwa uwazi.

---

## Kuunganisha Zimppy - TypeScript SDK

### Seva ya TypeScript - Iliyolindwa

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

**Mambo muhimu:**
- `zcash({ wallet: 'server' })` hupakia pochi iliyolindwa ya seva
- `mppx.charge()` hushughulikia changamoto kamili ya 402/mzunguko wa maisha wa kuthibitisha
- `result.withReceipt()` huambatanisha risiti ya malipo ya kriptografia kwenye jibu

---

### Seva ya TypeScript - Uwazi

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Kila changamoto hutoa **anwani mpya ya T**, na kufanya maombi ya malipo yasiweze kuunganishwa katika vipindi vyote.

---

### Mteja wa TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Mteja anaingilia `402` majibu, hufungua kipindi kiotomatiki, na kujaribu tena ombi - msimbo wa kupiga simu hauhitaji mantiki maalum ya malipo.

---

## Kuunganisha Zimppy - Rust SDK

### Seva ya Kutu (Axum)

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

**Mambo muhimu:**
- `MppCharge<Price>` ni kichungi cha Axum kinachothibitisha malipo kabla ya mhudumu kuanza
- `WithReceipt` hufunga jibu kwa risiti ya malipo ya kriptografia
- `ChargeConfig` hufafanua mantiki ya bei - inaweza kuwa na nguvu kulingana na vigezo vya ombi

---

### Mteja wa Kutu

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` Hupanua mteja yeyote wa HTTP kwa kushughulikia kiotomatiki 402, usimamizi wa vipindi, na utimilifu wa malipo Zcash.

---

## Marejeleo ya CLI

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

## Vipengele Muhimu

### Pochi za Asili za Wakala

Pochi za Zimpy zimeundwa kwa ajili ya matumizi ya kiprogramu na mawakala wa akili bandia (AI) - si viendelezi vya kivinjari vinavyosimamiwa na binadamu. Funguo zinasimamiwa kupitia CLI au SDK, akaunti zinaweza kuzungushwa kupitia **ZIP-32 derivation**, na pochi inasaidia mtiririko wa malipo otomatiki bila idhini ya binadamu kwa kila muamala.

### Usaidizi wa Mawakala Wengi

Mawakala wengi wanaweza kufanya kazi kutoka kwa pochi moja kwa kutumia **ZIP-32** - kila wakala hupata akaunti yake yenye ufuatiliaji wa salio uliotengwa, uwezo wa kuhamisha akaunti mtambuka, na kuripoti salio kwa kila akaunti. Hii inawezesha usimamizi wa meli wa mawakala wengi kutoka kwa miundombinu ya pochi moja.

### Miamala Zcash Iliyolindwa Kikamilifu (Orchard)

Malipo yaliyolindwa hutumia itifaki Zcash's **Orchard**, kundi lililolindwa lililoanzishwa na NU5. Seva huthibitisha malipo kwa kutumia **Incoming Viewing Key (IVK)**, ambao unaweza kusimbua noti zilizopokelewa bila kufichua ufunguo wa matumizi. Mashambulizi ya kucheza tena yanazuiwa kupitia **kuunganisha memo** - kila changamoto huingiza kipengele cha kipekee `zimppy:{challenge_id}` memo ambayo imethibitishwa kwa njia ya usimbaji fiche.

### Vipindi, Muda wa Kuchelewa kwa Kila Ombi

Usanifu wa kipindi hutenganisha kusubiri kwa uthibitisho kwenye mnyororo kutoka kwa ucheleweshaji wa kila ombi. Baada ya amana moja (~sekunde 75), maombi yote yanayofuata ya tokeni ya mtoa huduma huhudumiwa mara moja bila mwingiliano wa blockchain hadi kipindi kitakapofungwa.

### Kutiririsha, Lipa kwa Tokeni

Usaidizi wa Native **SSE (Seva-Sent Events)** huwezesha maudhui yaliyopimwa kwa kila tokeni. Inafaa kwa API za makadirio ya LLM ambapo urefu wa matokeo hutofautiana na bili inapaswa kuakisi matumizi halisi.

### Uzingatiaji Maalum

- **HMAC-SHA256** changamoto zilizosainiwa kuzuia kughushi
- **RFC 9457** muundo wa hitilafu kwa ajili ya kushughulikia hitilafu zinazoweza kuendeshwa kwa pamoja
- **`/.well-known/payment`** kwa ugunduzi wa njia ya malipo kiotomatiki na wakala yeyote anayetii MPP

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

### Majukumu ya Kipengele

**`zimppy-core`** - Kiini cha usimbaji fiche. Hushughulikia usimbaji fiche wa noti Orchard kwa kutumia IVK ya seva, uchanganuzi wa kumbukumbu, mantiki ya ulinzi wa marudio, na uthibitishaji wa changamoto. Imeandikwa kwa Rust kwa utendaji na usahihi.

**`zimppy-wallet`** - Pochi ya asili Zcash inayoendeshwa na `zingolib`Husimamia funguo, akaunti, salio lililolindwa/wazi, na uwasilishaji wa miamala.

**`zimppy-rs`** - Rust SDK. Hutoa `ChargeMethod`, `SessionMethod`na `PaymentProvider` sifa, pamoja na uchimbaji wa Axum (`MppCharge`, `WithReceipt`) kwa ajili ya ujumuishaji wa seva zenye ergonomic.

**`zimppy-napi`** - Vifungo vya NAPI-RS vinavyoweka kiini cha Rust kwenye Node.js, kuwezesha TypeScript SDK kutumia injini ile ile ya usimbaji bila kutekeleza tena viambishi awali vya Zcash katika JavaScript.

**`zimppy-ts`** - TypeScript SDK. Hufunga vifungo vya NAPI kwa kutumia API za async/await za idiomatic kwa ajili ya kuchaji, kipindi, na mtiririko wa utiririshaji wa SSE.

**`zimppy-cli`** - Pochi ya mstari wa amri na zana ya ombi. Inasaidia kulipa kiotomatiki (402 -> kulipa -> kujaribu tena), usimamizi wa kipindi, na shughuli zote za pochi.

---

## Mifano na Maonyesho

| Mfano | Maelezo |
|---|---|
| `examples/fortune-teller/` | Chaji, kipindi, na maonyesho ya utiririshaji - Seva ya kutu + mteja |
| `examples/llm-summarizer/` | Onyesho la utiririshaji la LLM la malipo kwa kila tokeni |
| `examples/mcp-server/` | Seva ya zana ya MCP yenye zana za akili bandia zinazolipishwa |
| `examples/ts-server/` | Utekelezaji wa marejeleo ya seva ya TypeScript MPP |

---

## Yaliyojumuishwa - Muhtasari wa Vipengele

| Kipengele | Maelezo |
|---|---|
| **Vipindi** | Amana mara moja, maombi ya mtoa huduma papo hapo, marejesho ya pesa yanapofungwa |
| **Inatiririsha** | Maudhui yaliyopimwa kwa kila tokeni kupitia SSE |
| **Chaji** | Malipo yaliyolindwa au ya uwazi kwa kila ombi la HTTP (mtiririko wa 402) |
| **Malipo ya Uwazi** | Anwani za T zenye amri ya kuzuia marudio kwa kila changamoto + ngao |
| **Akaunti Nyingi** | Mzunguko wa akaunti ya ZIP-32, uhamisho wa akaunti mtambuka, salio kwa kila akaunti |
| **Pochi ya CLI** | Tuma, ngao, uhamisho, salio --all, whoami, lipa kiotomatiki |
| **SDK mbili** | Hati ya Aina na Kutu |
| **Inafuata Maalum** | Changamoto za HMAC-SHA256, makosa ya RFC 9457, `/.well-known/payment` ugunduzi |

---

*Kwa maelezo zaidi, tembelea [zimpy.xyz](https://zimppy.xyz)*

---

## Kurasa Zinazohusiana

- [Pochi](/using-zcash/wallets) — Pochi Zcash zinazounga mkono miamala iliyolindwa
- [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools) — Jinsi miamala iliyolindwa na Orchard inavyolinda data ya malipo
- [Wachakataji wa Malipo](/using-zcash/payment-processors) — Njia zingine za kukubali malipo Zcash
- [Mali Zilizolindwa za Zcash](/zcash-tech/zcash-shielded-assets) — ZSA na mustakabali wa upangaji programu wa Zcash
- [Miradi ya Jamii](/zcash-community/community-projects) — Miradi zaidi ya mfumo ikolojia Zcash
