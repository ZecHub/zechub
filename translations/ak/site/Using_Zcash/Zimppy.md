<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz: Ɔyɛ a, yɛ ma wo bi!

## TL;DR

- Zimppy yɛ sika a wɔde di dwuma wɔ amanne ho kwan so ma AI adwumayɛfo de Zcash's Machine Payment Protocol (MPP) di dwuma.
- ** Deposit once** on-chain (~75 seconds), then make ** unlimited instant requests** with no per-request blockchain interaction
- Ɔboa ma wɔde Zcash (Orchard) a wɔabɔ ho ban no nyinaa tua ka.  Nea ɔsomaa, nea ɔgye, ne sika dodow, ɛne nkae krataa no nyinaa yɛ ntasodeɛ
- YƐdi dwuma ne TypeScript na Rust SDKs ma yεn nhyehyεε a εmu da hɔ wɔ AI pipelines ne API servers mu no.
- Perfect for **LLM APIs, data marketplaces, MCP tool servers**, and any M2M payment use case.

---

> **Zimppy** is the Machine Payment Protocol (MPP) payment method for Zcash supporting both shielded and transparent payments. Deposit once on-chain, then make unlimited instant bearer requests with no per-request chain interaction.

---

## Nsɛm a Ɛwɔ Mu

1. [Dɛn ne Zimppy.xyz?](#what-is-zimppyxyz)
2. [Dɛn nti na wɔde AI adwumayɛfo tua sika a wɔabɔ ho ban?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP) dwumadie a wɔfa so yɛ sika ho adwuma.](#machine-payment-protocol-mpp)
4. [Sɛnea Zimppy Yɛ Adwuma No](#how-zimppy-works)
   - [Adesua (Ahyɛ ho nkuran)](#sessions-recommended)
   - [Nkrataa a wɔde redi dwuma](#streaming)
   - [Kabea a wɔtwe no](#charge)
5. [Fa Nsɛm a Ɛfa Nkɔsoɔ ne Nhwɛsodeɛ di dwuma](#use-cases--examples)
6. [Nhyehyɛeɛ a wɔde sii hɔ](#installation)
7. [Zimppy Akwanhosan no Siesiee](#setting-up-the-zimppy-wallet)
8. [Zimppy a wɔde di dwuma no bi ne sɛ:](#integrating-zimppy--typescript-sdk)
   - [Servers (Ɛwɔ banbɔ)](#typescript-server--shielded)
   - [Ɔsomfoɔ (Transparent)](#typescript-server--transparent)
   - [Ɔsomfoɔ no](#typescript-client)
9. [Zimppy - Rust SDK a wɔhyehyɛ no mu di dwuma](#integrating-zimppy--rust-sdk)
   - [Ɔsomfoɔ (Axum)](#rust-server-axum)
   - [Ɔsomfoɔ no](#rust-client)
10. [CLI Nkyerԑkyerԑmu](#cli-reference)
11. [Nneɛma Titiriw a Ɛwɔ Mu](#key-features)
12. [Abɔdeyɛ mu adansiɛ](#architecture)
13. [Nhwɛsoɔ & Demos](#examples--demos)

---

## Dɛn ne Zimppy.xyz?

Zimppy.xyz yɛ nhyehyeɛ a wɔde di dwuma ma ankorankoro na wɔasiesie no sɛ AI agyinatufoɔ ne mfiri-kɔ-mfidie (M2M) adwuma akwan mu, ɔde Machine Payment Protocol (MPP) to dwa de Zcash reyɛ n'ahanhosan sika, ɛma kwan ma wotua ka wɔ ɔkwan pa so.

Sɛ wonte sɛ traditional blockchain payment systems a, transaction biara wɔ hɔ ma obiara na ɔhwɛ so no, Zimppy yɛ adwuma fa session-based architecture a ɛyi per request latency firi mu bere a ɛma cryptographic privacy. Eyi nti ɛyɛ soronko koraa maa AI agents a ehia wɔn sɛ wotua API, data, compute anaa AI tools programmatically, without leaking behavioral metadata ho ka.

### Nkyerεkyerεmu atitiriw no

- ** Deposit once** on-chain (~75 seconds for Zcash confirmation) - Wode wo sika hyɛ mu pɛnkoro wɔ chain no so.
- **Asrɛde a ɛnni ano biara** wɔ bere a wobue session no akyi, nnipakan-srɛde baako ho nsɛdi
- **Shielded payments** de Zcash Orchard protocol di dwuma ma obi a ɔde ne sika, nea ɔgye no, ne memo nyinaa yɛ kodenmodeɛ
- **Transparent payments** fa per-challenge T address di dwuma de siw replay kwan a enni ahobanbɔ mu koraa.
- **Spec-compliant**, HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` nhwehwɛyɛ

---

## Dɛn nti na wɔde AI adwumayɛfo tua sika a wɔabɔ ho ban?

Wͻ AI agyinatufoɔ a wͻyɛ adwuma wɔ dwumadie ahodoɔ mu no, mmara ho nhwehwɛmu, ayaresa nsusuyε, sikasɛm mu nhwehwԑmu ne akansi nyansahu biara yɛ metadata ahobanbɔ. Zimppy nkutoo ne MPP akatua kwan a εwɔ hɔ ma kokoamfo bere nyinaa.

### Ahintasɛm a wɔsesa no ho mpapahwekwa

| Agyapadeɛ | Ɔmanfo Nkɔnsɔnkɔnsɔn (USDC, ETH) | Zimppy a Ɔbɔ ne ho ban | Zimppy Transparent a ɛyɛ nea ɛda adi |
|---|---|---|---|
| **Ɔdemafo** | Nea wotumi hu | Wɔayɛ no encrypted | Nea wotumi hu |
| **Ogyefo** | Nea wotumi hu | Wɔayɛ no encrypted | Per-challenge (wɔntumi nka ho) |
| **Sika** | Nea wotumi hu | Wɔayɛ no encrypted | Nea wotumi hu |
| **Nkaeɛbɔ** | Nea wotumi hu | Wɔayɛ no encrypted | N/A |
| **Replay Ahobammɔ** | Ɛnyɛ ebiara | Memo a wɔkyekyere | Per-asɛnnennen T-address |
| **Ɔsom a Wɔde Di Dwuma Nhwɛso** | Nea wotumi de bata ho | Kokoa mu | Ɛntumi nka ho (adr foforo) |

### Ɔhaw a Ɛwɔ Akokoɔduro Ho, Agyinapɛn Ahorow Siesiee No

> Nanso Zcash wɔ mprɛ 75-second block times. "

Sessions siesie eyi. On-chain twɛn no ba pɛpɛɛpɛ bere a wɔde sika hyɛ ase, na adesrɛ biara a edi hɔ yɛ mprempren ara pɛ.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**tua ka prɛko, frɛ ntɛm ara, gye sika a aka no.** Ɛho hia sɛ wohwehwɛ mu bere biara.

---

## Machine Payment Protocol (MPP) dwumadie a wɔfa so yɛ sika ho adwuma.

Machine Payment Protocol (MPP) yɛ nhyehyɛɛ a ɛma tumi ma software agencies sɛ wɔn ara wɔhunu, di nkɔmmɔ na wodi ka ho dwuma. Ɛba API so aa obiara ntumi mfa ne nsa nka mu no nyinaa akyi.

### Sεnea MPP di dwuma ne API ahorow no

MPP di HTTP **402 Akatua a Wɔhwehwɛ** no so:

1. "Agent" srɛ kwan fi API awieɛ bea a wɔtua ka.
2. ** Sewa no de mmuaeɛ a ɛne** `402 Payment Required` + a signed challenge (amount, recipient, memo).
3. Agyefo no tua sika a ɔde di dwuma wɔ akwan foforo so (te sɛ, Zcash a wɔde Zimppy ayɛ ho ban).
4. *Agya no san di* asԑmmisa yi ho dwuma bio. `Authorization: Payment {txid}`.
5. Server no di nhyehyeɛ a wɔde yɛ adwuma so (Orchard IVK decryption, sika + memo check).
6. ** Sewa no de mmuaeɛ a ɛne** `200 OK` + a `Payment-Receipt` ti a ɛwɔ hɔ.

### Nkyerεkyerεmu a w'adi so.

- **HMAC-SHA256** anobaabae a wɔde hyɛ ase
- **RFC 9457** structured error responses (Ɔkwan a wɔfa so di mfomso ho nsunsuansoɔ)
- **`/.well-known/payment`** awieɛ bea a wɔ di dwuma ma wɔn ankasa nya ɔkwan a wɔde tua ka no ho nimdeɛ
- **Orchard IVK** (Incoming Viewing Key) ma servers-side payment verification a ɛnkyerɛ sika no ano nsesaeԑ ntwerԑtohɔ.

---

## Sɛnea Zimppy Yɛ Adwuma No

### Adesua (Ahyɛ ho nkuran)

Sɛ obi yɛ adwuma a, ɔtumi de ne sika no to gua wɔ chain mu ma ɔde kɔma nea ɔwɔ so na afei wɔde di dwuma bere biara.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Eye ma:** API nsrataa a emu yɛ den, LLM inference, data mu nsɛmmisa ahorow.

---

### Nkrataa a wɔde redi dwuma

Pay-per-token metered content a wɔde ma wɔ **Server-Sent Events (SSE)** so. Server no twe fi session balance ho asɛm biara anaa tokens bi a w'atwe agu mu.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Eye ma:** LLM asesa mmuae, bere-mu data feeds, AI nnwinnade a wɔtua ka biara.

---

### Kabea a wɔtwe no

Agyede baako a wɔayi no ho ban biara. HTTP 402 mu adwuma nyinaa yɛ pɛ sɛ obi frɛ bi, na saa bere yi so ɛyɛ papa ma wɔn a wɔyɛ nsrɛsrɛ akɛseɛ anaa nketenkete.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Eye ma:** Abɔde a ɛkorɔn, adesrɛde baako pɛ, API nsrahwɛ kakraa bi, premium data awiei nkontaabu.

---

## Fa Nsɛm a Ɛfa Nkɔsoɔ ne Nhwɛsodeɛ di dwuma

### 1. AI Agents:

Legal AI agent hwehwɛ a tua no case-law database. Zimppy shielded sessions, neɛ mmara adwumakuo no din anaa nsɛm pɔtee bi ntumi nhunu wɔ chain - bɔ attorney-client ahofadi ho ban wɔ mfitiase level so.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI Agent ma Aduruyɛ mu Nsɛm a Wobisa ho Nkɔmmɔ.

Ayaresa mu nhwehwɛmufoɔ hwehwɛ ayaresabea nkrataa a ɛwɔ hɔ no pii. Akatua a wɔagye ato so ma ayarefo nsɛmmisa ho kwan ntumi nhyia mma ɔhwɛfoɔ biara nni hɔ.

### 3. Dwumadibea a Ɛhwɛ Sika Ho Nsɛm So

Algorithmic trading agent tua real-time market data API. Transparent payments fa T address foforɔ di dwuma wɔ ɔhaw biara mu, na ɛmma kwan mma sɛ wɔde saa ade no bɛtoto nneɛma a wɔn de ma ho.

### 4. MCP Tool Server, Paid AI Tools (Animal Intelligence) - Abɔde a wɔde di dwuma.

MCP (Model Context Protocol) server no de AI dwumadie a wɔtua ho ka kyerɛ. Akode biara bɔ Zimppy bo, na ɛma obi nya sika fi mu ma ne nsa aka nneɛma bi a wɔde yɛ adwuma wɔ hɔ.

### 5. LLM Summarizer, Pay-Per-Token

LLM summarization service no tua agencies ka biara a wɔde ba ho sika wɔ SSE streaming so, na wonya ɛka a woetwa ne nea wontua ansa.

---

## Nhyehyɛeɛ a wɔde sii hɔ

### Node.js / TypeScript: Nkrataa ahodoɔ a etwa sɛ yɛhyehyɛ wɔ kasa no mu

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Ɔhaw a efi nnompe mu

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Zimppy Akwanhosan no Siesiee

Zimppy CLI no de krataafa a ɛwowɔ sika nkotoku nyinaa ma. Akwankyerɛ biara wɔ hɔ denam: `npx zimppy`.

### Anammɔn 1: Bɔ kahyire bi a wo bɛtumi de adi dwuma wɔ ayoba so:

```bash
npx zimppy wallet create
```

Wode ahwehwɛde a wode bɛkyerɛ sɛ wo nsa aka biribi no adi dwuma. Fa sie yiye - wontumi nnya bio bere a ayera.

### Anammɔn 2: Hwɛ wo address ne sika a aka no

```bash
npx zimppy wallet whoami
```

W'akyerɛ wo Unified Address (UA) **, T-address** no ne nea aka wͻ so nyinaa.

```bash
npx zimppy wallet balance --all
```

Shows a per-account balance breakdown across all ZIP-32 accounts.

### Adesuade 3: Fa sika no to wo boapem so

Fa ZEC to wo Unified Address firi wallet anaa exchange biara a ɛne Zcash di nsɛ mu. Deposit aa w'ayi no kɔ tẽẽ wɔ wo Orchard account hɔ.

### Adesuade 4: Fa sika kɔ na fa sie wo ho .

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

### Akwantu 5: Yɛ Auto-Pay ho Abisaeɛ

```bash
npx zimppy request <url>
```

Otumi di 402 -> pay -> retry flow nyinaa so. Wobue session na w'adi no dwuma wɔ ɔkwan a aniwa nhu mu.

---

## Zimppy - TypeScript SDK a wɔhyehyɛ mu no di dwuma

### TypeScript Server - Wɔbɔ ho ban

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

**Nsɛm titiriw:**
- `zcash({ wallet: 'server' })` hyɛ server no abɔ wɔn ho ban wallet mu
- `mppx.charge()` Ɔgye 402 nsoroma/sɔhwɛ no nyinaa so wɔ asetena mu.
- `result.withReceipt()` de adansedie nkrataa a w'atwe ato mu no ka ho bi ma mmuae no.

---

### TypeScript Server - Nkyerεmu-mfasoɔ

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Ɔhaw biara ma wonya T-address foforo, na ɛma wɔtumi di nkontabuo ho dwuma.

---

### TypeScript Odwumfoɔ

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Ɔpanyin no refa nsɛm a ɔretie no mu. `402` mmuae, buee nhyiamu no mu ntra so na sane bɔ nsrɛ - frɛ code no enhia payment-specific logic.

---

## Zimppy - Rust SDK a wɔhyehyɛ no mu di dwuma

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

**Nsɛm titiriw:**
- `MppCharge<Price>` yε Axum extractor a εbͻ nsusudeԑ ansa na nea ɔhwε so no atu kwan
- `WithReceipt` de nkrataa a wɔde di dwuma wɔ kɔmputa so no to mmuae ho krataa mu.
- `ChargeConfig` Deɛ ɛma ne sɛ, ɔtumi yɛ nsakrae wɔ n'ahwehwɛ mu.

---

### Rust Odwumfoɔ

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` de HTTP client biara a' ɔfa 402 ne session management, na Zcash payment fulfillment.

---

## CLI Nkyerԑkyerԑmu

| Hyɛ | Nkyerɛmu |
|---|---|
| `npx zimppy wallet create` | Generate keys na kyerɛ aba kasasin |
| `npx zimppy wallet whoami` | Kyerɛ address (UA + T-addr), kari pɛ, ntam nkitahodi |
| `npx zimppy wallet balance --all` | Akontaabu biara mu sika a aka a wɔkyekyɛ |
| `npx zimppy wallet send <addr> <zat>` | Send ZEC a wɔabɔ ho ban anaasɛ ɛda adi pefee |
| `npx zimppy wallet transfer <from> <to> <zat>` | Cross-account mu a wɔde kɔ baabi foforo |
| `npx zimppy wallet shield` | Fa sika a ɛda adi pefee kɔ Orchard (wɔabɔ ho ban) |
| `npx zimppy wallet use <name>` | Sesa sika kotoku a ɛyɛ adwuma |
| `npx zimppy request <url>` | Auto 402 -> tua -> san sɔ mmɔden sɛ wobɛbisa |

---

## Nneɛma Titiriw a Ɛwɔ Mu

### Agent-Native Wallets (Ɔwɛmfoɔ a Ɔfiri Asaase no so Akorabea)

Zimppy wallets no yɛ programmatic de ma AI agents - ɛnyɛ browsers a nipa di so. Key no wɔ CLI anaa SDKs, account ahorow betumi asesa denam **ZIP-32 account derivation** so na wallet no boa pɛsɛmenkomenya akwan mu ka ho a nnipa nhyehyeɛ biara nni hɔ mma wɔn kwan sɛ wɔde bɛyɛ adwuma.

### Nnipa bebree mmoa a w'ɔwɔ hɔ no

Multiple agents can operate from the same wallet using **ZIP-32 account rotation** - each agent gets its own account with isolated balance tracking, cross-account transfer capability, and per-account balance reporting. This enables fleet management of many agents from a single wallet infrastructure.

### Zcash dwumadie a wɔabɔ ho ban koraa (Orchard)

Shielded payments use Zcash's **Orchard protocol** - the latest and most secure shielded pool. The server verifies payments using an **Incoming Viewing Key (IVK)**, which can decrypt received notes without exposing the spending key. Replay attacks are prevented via **memo binding** - each challenge embeds a unique `zimppy:{challenge_id}` no memo that's cryptographically verified.

### Adesua , Nsa-kekae a wɔhwehwɛ no biara ho nkyɛm bere zero

Sɛ obi di dwuma a, ɔremmɔ so ntwɛn ansa na ne nsa aka biribi. Ɛba saa no, wɔdi dwuma ntɛmntɛm bere biara a wɔde to gua (bɛgye sɛ bɛyɛ anibu 75), nanso wɔnnwenee blockchain ho kɔsi sɛ wɔbɛwie adwuma no awie koraa.

### Streaming , Pay-Per-Token

Native **SSE (Server-Sent Events)** boa ma pay-per-token metered content. Ɛfata sɛ LLM inference API a output tenten yɛ nsesaeɛ na ne ka no ɛsɛ sɛ ɛda dwuma ankasa adi so.

### Nkyerεkyerεmu a w'adi so.

- **HMAC-SHA256** nsa a wɔhyɛe no bɔ mmɔden sɛ wɔbɛsi nkontompo ano kwan.
- **RFC 9457** structured error format ma interoperable mfomso di dwuma
- **`/.well-known/payment`** ma akwan a wɔfa so tua sika no na obi di dwuma sɛ ɔhwɛfoɔ a odi MPP mmara so.

---

## Abɔdeyɛ mu adansiɛ

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

### Ɔfese a wɔhyehyɛ no ho asɛyɛde ahorow

**`zimppy-core`** - The cryptographic core. Handles Orchard note decryption using the server's IVK, memo parsing, replay protection logic, and challenge verification. Written in Rust for performance and correctness. Emu biara wɔ ne nkyerɛwee mu a ɛyɛ den na ɛtumi yɛ adwuma yie paa.

**`zimppy-wallet`- A Zcash sika nkotoku a wɔde di dwuma ma no. `zingolib`. Di nkwan, asuo, akontae a wɔayi no asi hɔ/a emu da hɔ ne nsesaeɛ ho dwuma.

**`zimppy-rs`- Rust SDK no de ma. `ChargeMethod`, `SessionMethod`, ne ho adi no ni. `PaymentProvider` traits, plus Axum extractors (`MppCharge`, `WithReceipt`) for ergonomic server integration. (Email: info@gmail.com) *o no

**`zimppy-napi`NAPI-RS bindings a ɛma Rust core no nya Node.js, na ɛboa TypeScript SDK ma wɔde same cryptographic engine di dwuma bere a wɔnsan mfa Zcash primitives nyɛ adwuma wɔ JavaScript mu bio.

**`zimppy-ts`TypeScript SDK. Ɛfa NAPI bindings ne idiomatic async/await APIs ma charge, session, ɛne SSE streaming flow no.

**`zimppy-cli`** - Akwankyerɛ-nkrataafa krataa ne ade a wobisa. Ɛboa ototoɔ (402 -> tua --> bɔ mmɔden), dwumadi no, ɛne akwan nyinaa so akatua nkrataafa dwumadie.

---

## Nhwɛsoɔ & Demos

| Nhwɛsoɔ | Nkyerɛmu |
|---|---|
| `examples/fortune-teller/` | Charge, session, ne streaming demos - Rust server + client |
| `examples/llm-summarizer/` | LLM streaming demo a wotua ho ka |
| `examples/mcp-server/` | MCP adwinnade server a AI nnwinnade a wotua ho ka |
| `examples/ts-server/` | TypeScript MPP server nkyerɛkyerɛmu dwumadie |

---

## Nea Ɛka Ho - Nsɛm a Wɔahyehyɛ no Ntɛm

| Su | Nkyerɛmu |
|---|---|
| **Nhyiam ahorow** | Deposit pɛnkoro, instant bearer adesrɛ, refund wɔ close |
| **Abɔnten so** | Pay-per-token metered nsɛm a ɛwɔ SSE so |
| **Kwaadu** | Akatua a wɔabɔ ho ban anaasɛ ɛda adi pefee wɔ HTTP abisade biara mu (402 flow) |
| **Akatua a ɛda adi pefee** | T-addresses a ɛwɔ per-asɛnnennen replay siw ano + kyɛm ahyɛde |
| **Akontaabuo pii** | ZIP-32 akontaabu mu nsakrae, akontaabu a wɔde kɔ amannɔne, akontaabu biara mu sika a aka |
| **CLI Sikakorabea** | Send, kyɛm, transfer, balance --ne nyinaa, whoami, auto-pay |
| **SDK abien** | TypeScript ne Rust na ɛyɛ adwuma |
| **Spec-A ɛne ne ho hyia** | HMAC-SHA256 nsɛnnennen, RFC 9457 mfomso, `/.well-known/payment` ade a wɔahu |

---

*Sɛ wopɛ nsɛm pii a, kɔ: [zimppy.xyz](https://zimppy.xyz)*

---

## Nkrataafa a Ɛwɔ Ho Nsɛm

- [Adaka no mu nkotoku](/using-zcash/wallets)  Zcash wallets a ɛboa ma wotwa nneɛma so wɔ ɔkwan bi mu no.
- [Nsuo a Ɛwɔ Ahintaw So](/using-zcash/shielded-pools)  Sεnea Orchard nntua a w'ayi no ano bɔ wo ho ban firi kaade mu data ho
- [Akatua ho adwumayɛfoɔ](/using-zcash/payment-processors)  Akwan foforɔ a wobɛtumi afa so agye Zcash ka no atom.
- [Zcash Akorafoɔ a wɔhwɛ wɔn so no](/zcash-tech/zcash-shielded-assets) — ZSAs and the future of Zcash programmability
- [Amanamanmufoɔ Nhyehyɛeɛ](/zcash-community/community-projects)  Zcash ne ewiemu dwumadie ahodoɔ bebree a wobɛtumi ayɛ wɔ hɔ.
