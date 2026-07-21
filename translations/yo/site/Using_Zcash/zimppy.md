<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz - Àwọn ojúewé wọ̀nyí jápọ̀ mọ́

## TL;DR

- **Zimppy** jẹ́ ìlé-iṣẹ́ ìsanwó tí ó ní ìpamọ́ lákọ̀ọ́kọ́ fún àwọn aṣojú AI tí ó ń lo Àlàkalẹ̀ Ìsanwó Ẹ̀rọ (MPP) ti Zcash
- ** Fi idogo kan silẹ** on-chain (~ 75 aaya), lẹhinna ṣe ** awọn ibeere lẹsẹkẹsẹ ti ko ni opin ** pẹlu ko si ibaraenisepo blockchain fun ibeere
- Atilẹyin awọn sisanwo Zcash (Orchard) ** ti o ni aabo ni kikun  Oluranlowo, olugba, iye, ati memo gbogbo wọn ti paroko
- Ṣiṣẹ pẹlu **TypeScript ati Rust SDKs** fun iṣọpọ ti o rọrun sinu awọn paipu AI ati awọn olupin API
- O tayọ fun awọn API LLM, awọn ọja data, awọn olupin irinṣẹ MCP, ati eyikeyi ọran lilo isanwo M2M

---

> **Zimppy** jẹ ọna isanwo Machine Payment Protocol (MPP) fun Zcash ti o ṣe atilẹyin fun awọn sisanwo ti o ni aabo ati ṣiṣan. Idogo lẹẹkan lori pq, lẹhinna ṣe awọn ibeere oluranlowo lẹsẹkẹsẹ ti ko ni opin pẹlu ko si ibaraenisepo pq fun ibeere.

---

## Àkópọ̀ Àwọn Ohun Tó Wà Nínú Ìwé Yìí

1. [Kí ni Zimppy.xyz?](#what-is-zimppyxyz)
2. [Kí ló dé tí wọ́n fi ń sanwó fún àwọn aṣojú AI?](#why-shielded-payments-for-ai-agents)
3. [Àdéhùn Ìsanwó Ẹ̀rọ (MPP) ]](#machine-payment-protocol-mpp)
4. [Bí Zimppy ṣe ń ṣiṣẹ́](#how-zimppy-works)
   - [Àwọn Ìpàdé (A Rọ̀nà fún)](#sessions-recommended)
   - [Ìṣàn](#streaming)
   - [Ìdájọ́](#charge)
5. [Láti lo Àpẹẹrẹ & Àpẹẹrẹ](#use-cases--examples)
6. [Ìmúgbòòrò](#installation)
7. [Bí wọ́n ṣe ń gbé àpò Zimppy kalẹ̀](#setting-up-the-zimppy-wallet)
8. [Ìkójọpọ Zimppy](#integrating-zimppy--typescript-sdk)
   - [Oríṣiṣẹ́ (Aṣọ́) ]](#typescript-server--shielded)
   - [Ojú-ìránṣẹ́ (Ọ̀nà tí ó ṣe kedere) ]](#typescript-server--transparent)
   - [Alejò](#typescript-client)
9. [Ìkójọpọ Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Ojú-iṣẹ (Axum)](#rust-server-axum)
   - [Alejò](#rust-client)
10. [Ìsọfúnni tó wà nínú CLI](#cli-reference)
11. [Àwọn Ànímọ́ Pàtàkì](#key-features)
12. [Àwòrán ilé](#architecture)
13. [Àwọn Àpẹẹrẹ & Àfihàn]](#examples--demos)

---

## Kí ni Zimppy.xyz?

**Zimppy.xyz** is a privacy-first payment infrastructure designed specifically for AI agents and automated machine-to-machine (M2M) workflows. It implements the **Machine Payment Protocol (MPP)** using **Zcash** as its underlying currency, enabling both shielded (fully private) and transparent payment modes.

Unlike traditional blockchain payment systems, where every transaction is publicly visible on-chain, Zimppy is engineered around a session-based architecture that eliminates per-request latency while preserving cryptographic privacy. This makes it uniquely suited for AI agents that need to pay for APIs, data, compute, or AI tools programmatically, without leaking behavioral metadata.

### Àwọn Ànímọ́ Pàtàkì

- ** Fi idogo kan silẹ** lori ẹwọn (~75 aaya fun ijẹrisi Zcash)
- **Awọn ibeere lẹsẹkẹsẹ ti ko ni opin** lẹhin ṣiṣi akoko, ifọwọsowọpọ pq-awọn ibeere pq
- ** Awọn sisanwo ti o ni aabo ** ṣe aṣiri oluranlowo, olugba, iye, ati akọsilẹ nipa lilo ilana Orchard ti Zcash
- **Ìsanwó tí ó ṣe kedere** máa ń lo àdírẹ́sì T fún ìpèníjà kan láti dènà àtúnyẹ̀wò láì ní ìpamọ́ pátápátá
- **Specification-Compliant**, HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` ìwárí

---

## Èé Ṣe Tí Wọ́n Fi Ń Dáàbò Bo Ìsanwó fún Àwọn Aṣojú AI?

Fun awọn aṣoju AI ti n ṣakoso awọn ṣiṣan iṣẹ ti o nira, iwadii ofin, awọn ibeere iṣoogun, itupalẹ owo, oye ifigagbaga fun ** gbogbo isanwo ilu jẹ itankale metadata **. Zimppy ni ọna isanwo MPP nikan ti o jẹ ** ikọkọ nipasẹ aiyipada **.

### Àkọsílẹ̀ Ìfiwéra Ìpamọ́

Àwọn ohun ìní. Àwọn ẹ̀rọ-ìpínlẹ̀ (USDC, ETH) Zimppy Shielded Zimppy Transparent
|---|---|---|---|
** Olùfúnni ní ìsọfúnni **: Ó hàn gbangba. Ó ti jẹ́ àdàkọ. Ó hàn kedere.
| **Receiver** | Visible | Encrypted | Per-challenge (unlinkable) |
** Amount** Wọ́n rí i. A ṣe àdàkọ rẹ̀.
**Memo**. visible. encrypted. N/A. ì ì ì í ë ¤.
** Ààbò Àtúnṣe ** Kò sí. Ìdìmú Memo. Adirẹsi T-ìpèníjà-kọ̀ọ̀kan
** Àpẹẹrẹ Ìlò Iṣẹ́**. A lè so ó pọ̀ mọ́ra. Àdáni. A kò lè so (fresh addr)

### Ìṣòro Àkókò Tí Wọ́n Fi Ń Ṣiṣẹ́ Lọ́wọ́, Àwọn Ìjíròrò Ló Yanjú Rẹ̀

> *"Ṣùgbọ́n Zcash ní ìgbà ìdìpọ̀ 75-ìṣẹ́jú".*

** Awọn akoko yanju eyi.** Idaduro on-chain ṣẹlẹ gangan ** lẹẹkan ** ni idogo. Gbogbo ibeere ti o tẹle jẹ lẹsẹkẹsẹ.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

** Sanwo lẹẹkan, pe lẹsẹkẹsẹ, gba iyipada pada.** Iwọn akoko fun ibeere jẹ odo.

---

## Àkọsílẹ̀ Ìsanwó Ẹ̀rọ (MPP)

The **Machine Payment Protocol (MPP)** is a standardized protocol that enables autonomous software agents (AI agents, bots, scripts) to discover, negotiate, and fulfill payment requirements for API access all without human intervention.

### Bawo ni MPP ṣe darapọ mọ awọn API

MPP tẹ̀lé ìtòlẹ́sẹẹsẹ HTTP **402 Payment Required**:

1. **Aṣoju beere** ohun elo kan lati opin API ti o sanwo.
2. ** Olùpèsè dáhùn** pẹ̀lú `402 Payment Required` + ìwé ìdánwò tí wọ́n fọwọ́ sí (iye owó, ẹni tó máa gbà á, àlàyé).
3. **Aṣoju n sanwo** nipa lilo ọna isanwo ti o ni ibamu (fun apẹẹrẹ, Zimppy ti a bo Zcash).
4. **Aṣoju tún ìbèèrè náà ṣe** pẹ̀lú `Authorization: Payment {txid}`.
5. ** Olùbánisọ̀rọ̀ ṣàyẹ̀wò** ìsanwó náà nípa lílo ẹ̀rọ-ìkọ̀ǹpútà (Orchard IVK decryption, amount + memo check).
6. ** Olùpèsè dáhùn** pẹ̀lú `200 OK` + a `Payment-Receipt` orí ìwé.

### Ìmúṣẹ Àkọsílẹ̀

- **HMAC-SHA256** ìforúkọsílẹ̀ ìpèníjà
- **RFC 9457** àwọn ìdáhùn àṣìṣe tí ó wà lákọsílẹ̀
- **`/.well-known/payment`** ìparí fún àwárí ọ̀nà ìsanwó tí a ṣe lóòtọ́
- **Orchard IVK** (Incoming Viewing Key) fún ìdánimọ ìsanwó lápá-ìpèsè láìfi àwọn kókó ìnáwó hàn

---

## Bí Zimppy Ṣe Ń Ṣiṣẹ́

### Àwọn Ìpàdé (Wọ́n gbà á níyànjú)

Awọn akoko jẹ awoṣe ibaraenisepo akọkọ. Aṣoju naa fi idogba kan silẹ lori pq lẹẹkan, gba aami ti o ni ẹri, ati lo o fun gbogbo awọn ibeere atẹle ni idaduro si odo.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

** Ti o dara julọ fun:** Awọn ipe API igbohunsafẹfẹ giga, inference LLM, awọn ibeere data lemọlemọfún.

---

### Ìsọfúnni tó ń jáde

Owo-fun-tokeni akoonu ti a fi pamọ ti a firanṣẹ lori ** Awọn iṣẹlẹ ti a ránṣẹ-Server (SSE) **. Olupese naa yọkuro lati inu iwontunwonsi akoko fun ọrọ tabi ami ṣiṣan.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Ti o dara julọ fun:** LLM awọn idahun ṣiṣan, awọn ifunni data akoko gidi, awọn irinṣẹ AI sanwo-fun-tokeni.

---

### Owó ìtanràn

Owo ti o ni idaabobo kan fun ibeere kan. Gbogbo HTTP 402 ṣiṣan ni a ṣe fun ipe kan. O dara nigbati awọn ibeere ba jẹ igbagbogbo tabi iye giga.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Ti o dara julọ fun:** Awọn ibeere ọkan-ni-ọkan ti o ga, awọn ipe API ti ko ṣe deede, awọn opin data data.

---

## Lo Awọn Ọran & Awọn apẹẹrẹ

### 1. Àjọ tó ń rí sí ìsọfúnni

Aṣoju AI ti ofin beere ibi ipamọ data ofin ti o sanwo. Lilo awọn akoko aabo Zimppy, boya idanimọ ile-iṣẹ ofin tabi awọn ibeere pato ko han lori pq - idaabobo ẹtọ agbẹjọro-onibara ni ipele amayederun.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Agba fun Medical Ibeere Pipeline

A medical diagnostic agent queries multiple clinical databases. Shielded payments ensure patient query patterns are not linkable across providers.

### 3. Ẹnìkan Tó Ń Ṣèwádìí Nípa Ìnáwó

An algorithmic trading agent pays for real-time market data APIs. Transparent payments use fresh T-addresses per challenge, preventing usage pattern correlation across data vendors.

### 4. MCP Tool Server, Paid AI Awọn irinṣẹ

An MCP (Model Context Protocol) server exposes paid AI tools. Each tool invocation triggers a Zimppy charge, enabling a marketplace of monetized AI capabilities.

### 5. LLM Summarizer, Pay-Per-Token (Ìdánwò owó-ní-àkọsílẹ̀)

Iṣẹ-iṣẹ akopọ LLM n gba awọn aṣoju fun ami iṣelọpọ nipasẹ ṣiṣan SSE, pẹlu iyokuro iwontunwonsi laifọwọyi ati agbapada ti iwontuna ti a ko lo tẹlẹ.

---

## Iṣẹ́-ṣiṣe

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Ìdàró

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Ṣiṣeto apamọwọ Zimppy

Awọn Zimppy CLI pese kan ni kikun apamọwọ ni wiwo. `npx zimppy`.

### Igbesẹ 1: Ṣẹda apamọwọ kan

```bash
npx zimppy wallet create
```

Generates cryptographic keys and displays your **seed phrase**. Store this securely - it cannot be recovered if lost.

### Ìgbésẹ̀ Kejì: Wá àdírẹ́sì àti owó tó ṣẹ́ kù

```bash
npx zimppy wallet whoami
```

Displays your **Unified Address (UA)**, **T-address**, current balance, and active network.

```bash
npx zimppy wallet balance --all
```

Ó ńfi àlàfo tó wà lórí ìkànnì kọ̀ọ̀kan hàn ní gbogbo ìkànì ZIP-32.

### Ìgbésẹ̀ Kẹta: Kọ́wọ́ Rẹ Tún Wọléètì Rẹ

Send ZEC to your Unified Address from any Zcash-compatible wallet or exchange. Shielded deposits go directly to your Orchard account.

### Ìgbésẹ̀ kẹrin: Fi owó ránṣẹ́ àti dídáàbò bò

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

### Ìgbésẹ̀ 5: Ṣẹ̀bẹ̀ fún Ìsanwó Àkọsílẹ̀

```bash
npx zimppy request <url>
```

Ó máa ń ṣe àtúnṣe 402 -> sanwó -> tún gbìyànjú.

---

## Ṣíṣepọ Zimppy - TypeScript SDK

### TypeScript Server - Ààbò

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

Àwọn kókó pàtàkì:
- `zcash({ wallet: 'server' })` ó máa ń fi àpò-ìpamọ́ tí ó wà ní ìhámọ́ náà sínú
- `mppx.charge()` ṣe àbójútó gbogbo 402 ìpèníjà/àyẹ̀wò ìgbésí ayé
- `result.withReceipt()` ó so ìwé ìdánilójú owó tí a fi kọ̀ǹpútà ṣe pẹ̀lú ìdáhùn náà

---

### Olùránṣẹ TypeScript - Òrìsà

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Ìdánwò kọ̀ọ̀kan máa ń dá adirẹsi T tuntun sílẹ̀, èyí tí kò ní jẹ́ kó ṣeé ṣe láti so àwọn ìbéèrè ìsanwó pọ̀ mọ́ àwọn ìjíròrò mìíràn.

---

### Olùgbéejáde TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Àwọn oníbàárà ń gbóhùn-ún `402` àwọn ìdáhùn, á ṣí ìtòlẹ́sẹẹsẹ kan nídìí ara rẹ̀, yóò sì tún gbìyànjú ìbéèrè náà wò - kòkódì tí ó ń pe kò nílò àlàyé pàtó fún ìsanwó.

---

## Ṣiṣẹpọ Zimppy - Rust SDK

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

Àwọn kókó pàtàkì:
- `MppCharge<Price>` jẹ ẹya Axum extractor ti o ṣayẹwo owo ṣaaju ki o to awọn oniṣẹ ṣiṣe
- `WithReceipt` ó fi ìwé ìdánilójú ìsanwó tí a fi kọ̀ǹpútà kọ sínú ìdáhùn náà
- `ChargeConfig` defines the pricing logic - can be dynamic based on request parameters

---

### Olùṣàmúlò Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` ó máa ń mú kí ààrò HTTP kan ní ìtọ́jú 402 tí ó wà níkọ̀ọ̀kan, ìṣàkóso ìtòlẹ́sẹẹsẹ, àti ìmúṣẹ ìsanwó Zcash.

---

## Àkọsílẹ̀ CLI

Àṣẹ Àpèjúwe
|---|---|
| `npx zimppy wallet create` Ṣẹda awọn bọtini ati ṣafihan gbolohun ọrọ irugbin.
| `npx zimppy wallet whoami` ☐ Àdírẹ́ẹ̀sì (UA + T-addr), àròpọ̀ owó, ẹ̀rọ
| `npx zimppy wallet balance --all` ìpín ìsókè owó tó wà nínú àkáǹtì kọ̀ọ̀kan
| `npx zimppy wallet send <addr> <zat>`  rán ZEC tí ó ní ààbò tàbí tí ó ṣe kedere
| `npx zimppy wallet transfer <from> <to> <zat>` Ètò ìyípadà ààtò ìsọfúnni ti inú ilé.
| `npx zimppy wallet shield`  Gbigbe awọn owo ti o ni imọlẹ si Orchard (ti a ṣe aabo).
| `npx zimppy wallet use <name>` Ṣíṣàtúnṣe ìdánimọ àpamọ́ alágbára.
| `npx zimppy request <url>`  Auto 402 -> sanwó -> ìbéèrè àtúnṣe.

---

## Àwọn Ànímọ́ Pàtàkì

### Àwọn Wàléètì Àṣojú-Ìbílẹ̀

Zimppy wallets are designed for programmatic use by AI agents - not human-managed browser extensions. Keys are managed via the CLI or SDKs, accounts can be rotated via **ZIP-32 account derivation**, and the wallet supports fully automated payment flows without human approval per transaction.

### Ìtìlẹyìn Ọ̀pọ̀lọpọ̀ Àṣojú

Awọn aṣoju pupọ le ṣiṣẹ lati inu apamọwọ kanna nipa lilo **ZIP-32 iyipo iroyin ** - olúkúlùkù aṣoju gba akọọlẹ tirẹ pẹlu titele iwontunwonsi ti o ya sọtọ, agbara gbigbe agbelebu-akọọlẹ, ati ijabọ iwontuna-akọkọ. Eyi jẹ ki iṣakoso ọkọ oju-omi ti ọpọlọpọ awọn aṣoju lati inu amayederun apamọwọ kan.

### Awọn Iṣowo Zcash ti o ni aabo ni kikun (Orchard)

Shielded payments use Zcash's **Orchard protocol** - the latest and most secure shielded pool. The server verifies payments using an **Incoming Viewing Key (IVK)**, which can decrypt received notes without exposing the spending key. Replay attacks are prevented via **memo binding** - each challenge embeds a unique `zimppy:{challenge_id}` Àkọsílẹ̀ tí wọ́n fi ẹ̀rọ ìpamọ́ ṣètẹ́wọ́gbà.

### Awọn akoko , Zero-Per-Request latency

Awọn akoko faaji decouples awọn on-chain ìmúdájú duro lati fun-beere idaduro. lẹhin kan nikan idogo (~ 75 aaya), gbogbo nigbamii ti o ni oluwa-token ibeere ti wa ni sin lẹsẹkẹsẹ pẹlu ko si blockchain ibaraenisepo titi akoko pa.

### Ìṣàn , Owó-Láti-Àkọsílẹ̀

Atilẹyin abinibi ** SSE (Awọn iṣẹlẹ ti a firanṣẹ olupin) ** jẹ ki o sanwo-nipasẹ-tokeni akoonu ti a ṣe iṣiro. O dara julọ fun LLM inference APIs nibiti gigun abajade jẹ iyipada ati isanwo yẹ ki o ṣe afihan agbara gangan.

### Ìmúṣẹ Àkọsílẹ̀

- **HMAC-SHA256** tí wọ́n fọwọ́ sí àwọn ìpèníjà láti dènà àdàkọ
- **RFC 9457** ìtòlẹ́sẹẹsẹ àṣìṣe tí ó wà fún ìmúṣiṣẹ́pọ̀ àṣìṣẹ́
- **`/.well-known/payment`** fun awari ọna isanwo laifọwọyi nipasẹ eyikeyi aṣoju ti o ni ibamu pẹlu MPP

---

## Àwòrán ilé

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

### Àwọn Ojúṣe Ẹ̀ka

**`zimppy-core`** - Awon ohun ti o wa ni cryptographic. O nlo idaabobo akọsilẹ Orchard nipa lilo IVK ti olupin, parsing memo, lojiji idaabọ atunwi, ati idanwo idanwo. Ti a kọ ni Rust fun iṣẹ ati deede.

**`zimppy-wallet`** - A abinibi Zcash apamọwọ agbara nipasẹ `zingolib`. Ṣakoso awọn bọtini, awọn iroyin, iboju-boju / awọn iwontunwonsi ṣiṣan, ati ifisilẹ iṣowo.

**`zimppy-rs`** - Awọn Rust SDK. pese `ChargeMethod`, `SessionMethod`, àti `PaymentProvider` àwọn ohun èlò tí wọ́n fi ń yọ àbùdá jáde (`MppCharge`, `WithReceipt`) fún ìkópọ̀ àwọn ohun èlò tí ó jẹ́ ergonomic.

**`zimppy-napi`** - Awọn asopọ NAPI-RS ti o ṣafihan ipilẹ Rust si Node.js, gbigba TypeScript SDK laaye lati lo ẹrọ itẹwe kanna laisi atunṣe awọn ipilẹṣẹ Zcash ni JavaScript.

**`zimppy-ts`** - The TypeScript SDK. Wraps NAPI bindings with idiomatic async/await APIs for charge, session, and SSE streaming flows.

**`zimppy-cli`** - Ọpa apamọwọ ati ohun elo ibeere laini aṣẹ. O ṣe atilẹyin isanwo-ara-ẹni (402 -> sanwo -> tun gbiyanju), iṣakoso akoko, ati gbogbo awọn iṣẹ apamọwọ.

---

## Àwọn Àpẹẹrẹ & Àfihàn

Àpẹẹrẹ Àpèjúwe
|---|---|
| `examples/fortune-teller/` ígba owó, ìtòlẹ́sẹẹsẹ, àti àwọn àfihàn tí ó ń jáde - Rust server + client
| `examples/llm-summarizer/` Àwòṣe ìgbóhùnsáfẹ́fẹ́ LLM tí wọ́n ń sanwó fún.
| `examples/mcp-server/` MCP tool server pẹlu awọn irinṣẹ AI ti o sanwo.
| `examples/ts-server/` íṣe ìtumọ̀ aṣàmúlò TypeScript MPP server

---

## Àwọn Ohun Tó Wà Nínú Ẹ̀

Àmì. Àpèjúwe.
|---|---|
**Sessions** Deposit once, instant bearer requests, refund on close. [Ìdánilójú ìsọ̀rí] Àkọsílẹ̀ nípa àwọn ìṣẹ̀lẹ̀ tó wáyé ní ilé-ìwòsàn náà
| **Streaming** | Pay-per-token metered content over SSE |
** Charge**. Owó tí a fi ààbò ṣe tàbí tí ó ṣe kedere lórí ìbéèrè HTTP (402 flow)
Àwọn adirẹsi-T pẹ̀lú ìdènà àtúnṣe-ní-ìdánwò + àṣẹ ààbò.
**Multi-Account**. ZIP-32 ìyípadà àkọọ́lẹ̀, ìyípòsòpò orí àkáǹtì, àlàfo fún àkáńtì.
| **CLI Wallet** | Send, shield, transfer, balance --all, whoami, auto-pay |
** Dual SDK ** TypeScript àti Rust
Ìṣòro HMAC-SHA256, àṣìṣe RFC 9457, `/.well-known/payment` ìwárí.

---

*Fún àlàyé síwájú sí i, ẹ lọ sí [zimppy.xyz](https://zimppy.xyz)*

---

## Àwọn ojúewé tó tan mọ́ ọn

- [Àwọn pọ́ọ̀sì](/using-zcash/wallets)  Awọn apamọwọ Zcash ti o ṣe atilẹyin awọn iṣowo ti o ni aabo
- [Àwọn Erékùṣù Tí Wọ́n Fi Ààbò Ṣe](/using-zcash/shielded-pools)  Bawo ni Orchard shielded awọn iṣowo ṣe daabobo data isanwo
- [Àwọn Ẹ̀rọ Ìsanwó](/using-zcash/payment-processors)  Àwọn ọ̀nà míràn láti gba owó Zcash
- [Awọn ohun-ini ti o ni aabo Zcash](/zcash-tech/zcash-shielded-assets)  ZSAs ati ọjọ iwaju ti iṣeto eto Zcash
- [Àwọn Iṣẹ́ Àjọṣe](/zcash-community/community-projects)  Awọn iṣẹ eto ilolupo Zcash diẹ sii
