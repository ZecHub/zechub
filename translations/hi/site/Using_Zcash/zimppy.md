<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## संक्षेप में

- **Zimppy** AI agents के लिए Zcash के Machine Payment Protocol (MPP) का उपयोग करने वाला privacy-first payment infrastructure है
- ऑन-चेन एक बार **डिपॉजिट करें** (~75 सेकंड), फिर प्रति-रिक्वेस्ट blockchain interaction के बिना **असीमित instant requests** करें
- **पूरी तरह shielded Zcash (Orchard)** payments का समर्थन करता है — sender, receiver, amount, और memo सभी encrypted होते हैं
- AI pipelines और API servers में आसान integration के लिए **TypeScript और Rust SDKs** के साथ काम करता है
- **LLM APIs, data marketplaces, MCP tool servers**, और किसी भी M2M payment use case के लिए उपयुक्त

---

> **Zimppy** Zcash के लिए Machine Payment Protocol (MPP) payment method है, जो shielded और transparent दोनों प्रकार के payments का समर्थन करता है। ऑन-चेन एक बार डिपॉजिट करें, फिर प्रति-रिक्वेस्ट chain interaction के बिना असीमित instant bearer requests करें।

---

## विषय-सूची

1. [Zimppy.xyz क्या है?](#what-is-zimppyxyz)
2. [AI Agents के लिए Shielded Payments क्यों?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy कैसे काम करता है](#how-zimppy-works)
   - [Sessions (अनुशंसित)](#sessions-recommended)
   - [Streaming](#streaming)
   - [Charge](#charge)
5. [उपयोग के मामले और उदाहरण](#use-cases--examples)
6. [इंस्टॉलेशन](#installation)
7. [Zimppy Wallet सेट करना](#setting-up-the-zimppy-wallet)
8. [Zimppy को Integrate करना](#integrating-zimppy--typescript-sdk)
   - [Server (Shielded)](#typescript-server--shielded)
   - [Server (Transparent)](#typescript-server--transparent)
   - [Client](#typescript-client)
9. [Zimppy को Integrate करना - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Server (Axum)](#rust-server-axum)
   - [Client](#rust-client)
10. [CLI संदर्भ](#cli-reference)
11. [मुख्य विशेषताएँ](#key-features)
12. [आर्किटेक्चर](#architecture)
13. [उदाहरण और डेमो](#examples--demos)

---

## Zimppy.xyz क्या है?

**Zimppy.xyz** एक privacy-first payment infrastructure है, जिसे विशेष रूप से AI agents और automated machine-to-machine (M2M) workflows के लिए डिज़ाइन किया गया है। यह **Machine Payment Protocol (MPP)** को **Zcash** को आधारभूत currency के रूप में उपयोग करते हुए लागू करता है, जिससे shielded (पूरी तरह private) और transparent दोनों payment modes संभव होते हैं।

पारंपरिक blockchain payment systems से अलग, जहाँ हर transaction सार्वजनिक रूप से on-chain दिखाई देता है, Zimppy को session-based architecture के आसपास बनाया गया है, जो cryptographic privacy बनाए रखते हुए per-request latency को समाप्त करता है। इससे यह उन AI agents के लिए विशेष रूप से उपयुक्त बनता है जिन्हें APIs, data, compute, या AI tools के लिए programmatically भुगतान करना होता है, बिना behavioral metadata उजागर किए।

### मुख्य गुण

- ऑन-चेन **एक बार डिपॉजिट करें** (~75 सेकंड Zcash confirmation के लिए)
- session खुलने के बाद **असीमित instant requests**, प्रति-रिक्वेस्ट शून्य chain interaction
- **Shielded payments** Zcash के Orchard protocol का उपयोग करके sender, receiver, amount, और memo को encrypt करते हैं
- **Transparent payments** पूर्ण privacy के बिना replay prevention के लिए per-challenge T-addresses का उपयोग करते हैं
- **Spec-compliant**, HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` discovery

---

## AI Agents के लिए Shielded Payments क्यों?

संवेदनशील workflows, कानूनी शोध, medical queries, financial analysis, competitive intelligence संभालने वाले AI agents के लिए **हर सार्वजनिक payment metadata leak होता है**। Zimppy एकमात्र MPP payment method है जो **default रूप से private** है।

### Privacy तुलना तालिका

| Property | Public Chains (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Sender** | Visible | Encrypted | Visible |
| **Receiver** | Visible | Encrypted | Per-challenge (unlinkable) |
| **Amount** | Visible | Encrypted | Visible |
| **Memo** | Visible | Encrypted | N/A |
| **Replay Protection** | None | Memo binding | Per-challenge T-address |
| **Service Usage Pattern** | Linkable | Private | Unlinkable (fresh addr) |

### Latency की समस्या, Sessions द्वारा हल

> *"लेकिन Zcash में 75-सेकंड block times हैं।"*

**Sessions इसका समाधान हैं।** ऑन-चेन प्रतीक्षा केवल डिपॉजिट के समय **एक बार** होती है। उसके बाद की हर request instant होती है।

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**एक बार भुगतान करें, तुरंत call करें, और बची हुई राशि वापस पाएँ।** Per-request latency शून्य है।

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** एक standardized protocol है जो autonomous software agents (AI agents, bots, scripts) को API access के लिए payment requirements को खोजने, negotiate करने, और पूरा करने की सुविधा देता है — वह भी पूरी तरह बिना मानवीय हस्तक्षेप के।

### MPP APIs के साथ कैसे integrate होता है

MPP HTTP **402 Payment Required** flow का पालन करता है:

1. **Agent** किसी paid API endpoint से resource की request करता है।
2. **Server** `402 Payment Required` + signed challenge (amount, recipient, memo) के साथ response देता है।
3. **Agent** compatible payment method (जैसे, Zimppy shielded Zcash) का उपयोग करके भुगतान करता है।
4. **Agent** `Authorization: Payment {txid}` के साथ request दोबारा भेजता है।
5. **Server** cryptographically payment को verify करता है (Orchard IVK decryption, amount + memo check)।
6. **Server** `200 OK` + `Payment-Receipt` header के साथ response देता है।

### Spec Compliance

- **HMAC-SHA256** challenge signing
- **RFC 9457** structured error responses
- automatic payment method discovery के लिए **`/.well-known/payment`** endpoint
- spending keys उजागर किए बिना server-side payment verification के लिए **Orchard IVK** (Incoming Viewing Key)

---

## Zimppy कैसे काम करता है

### Sessions (अनुशंसित)

Sessions मुख्य interaction pattern हैं। Agent एक बार ऑन-चेन balance deposit करता है, bearer token प्राप्त करता है, और उसे बाद की सभी requests के लिए शून्य latency के साथ उपयोग करता है।

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**इनके लिए सबसे अच्छा:** High-frequency API calls, LLM inference, repeated data queries.

---

### Streaming

**Server-Sent Events (SSE)** के माध्यम से दिया जाने वाला pay-per-token metered content। Server stream किए गए प्रत्येक word या token के अनुसार session balance से कटौती करता है।

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**इनके लिए सबसे अच्छा:** LLM streaming responses, real-time data feeds, pay-per-token AI tools.

---

### Charge

प्रति request एक single shielded payment। पूर्ण HTTP 402 flow प्रत्येक call पर execute होता है। यह तब उपयुक्त है जब requests कम हों या high-value हों।

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**इनके लिए सबसे अच्छा:** High-value one-off requests, infrequent API calls, premium data endpoints.

---

## उपयोग के मामले और उदाहरण

### 1. AI Agent

एक legal AI agent paid case-law database को query करता है। Zimppy shielded sessions का उपयोग करने पर न तो law firm की पहचान और न ही specific queries on-chain दिखाई देती हैं — इससे infrastructure स्तर पर attorney-client privilege सुरक्षित रहता है।

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. Medical Query Pipeline के लिए AI Agent

एक medical diagnostic agent कई clinical databases को query करता है। Shielded payments सुनिश्चित करते हैं कि patient query patterns अलग-अलग providers के बीच linkable न हों।

### 3. Financial Analysis Agent

एक algorithmic trading agent real-time market data APIs के लिए भुगतान करता है। Transparent payments प्रत्येक challenge के लिए fresh T-addresses का उपयोग करते हैं, जिससे अलग-अलग data vendors के बीच usage pattern correlation रोका जाता है।

### 4. MCP Tool Server, Paid AI Tools

एक MCP (Model Context Protocol) server paid AI tools उपलब्ध कराता है। प्रत्येक tool invocation एक Zimppy charge trigger करता है, जिससे monetized AI capabilities का marketplace संभव होता है।

### 5. LLM Summarizer, Pay-Per-Token

एक LLM summarization service SSE streaming के माध्यम से agents से प्रति output token शुल्क लेती है, जिसमें automatic balance deduction और unused prepaid balance की refund शामिल होती है।

---

## इंस्टॉलेशन

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

## Zimppy Wallet सेट करना

Zimppy CLI एक पूर्ण wallet interface प्रदान करता है। सभी commands `npx zimppy` के माध्यम से उपलब्ध हैं।

### चरण 1 : Wallet बनाएँ

```bash
npx zimppy wallet create
```

यह cryptographic keys generate करता है और आपकी **seed phrase** दिखाता है। इसे सुरक्षित रूप से संग्रहित करें - यदि यह खो जाए तो इसे पुनर्प्राप्त नहीं किया जा सकता।

### चरण 2 : अपना Address और Balance जाँचें

```bash
npx zimppy wallet whoami
```

यह आपका **Unified Address (UA)**, **T-address**, current balance, और active network दिखाता है।

```bash
npx zimppy wallet balance --all
```

यह सभी ZIP-32 accounts में per-account balance breakdown दिखाता है।

### चरण 3 : अपने Wallet में फंड जोड़ें

किसी भी Zcash-compatible wallet या exchange से अपने Unified Address पर ZEC भेजें। Shielded deposits सीधे आपके Orchard account में जाते हैं।

### चरण 4 : Funds भेजें और Shield करें

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

### चरण 5 : Auto-Pay Request करें

```bash
npx zimppy request <url>
```

यह पूरे 402 -> pay -> retry flow को अपने-आप संभालता है। Sessions पारदर्शी रूप से खोले और manage किए जाते हैं।

---

## Zimppy को Integrate करना - TypeScript SDK

### TypeScript Server - Shielded

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

**मुख्य बिंदु:**
- `zcash({ wallet: 'server' })` server का shielded wallet लोड करता है
- `mppx.charge()` पूरे 402 challenge/verify lifecycle को संभालता है
- `result.withReceipt()` response में cryptographic payment receipt जोड़ता है

---

### TypeScript Server - Transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

हर challenge एक **fresh T-address** generate करता है, जिससे sessions के बीच payment requests unlinkable हो जाती हैं।

---

### TypeScript Client

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Client `402` responses को intercept करता है, session अपने-आप खोलता है, और request फिर से भेजता है - calling code को payment-specific logic की आवश्यकता नहीं होती।

---

## Zimppy को Integrate करना - Rust SDK

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

**मुख्य बिंदु:**
- `MppCharge<Price>` एक Axum extractor है जो handler चलने से पहले payment verify करता है
- `WithReceipt` response को cryptographic payment receipt के साथ wrap करता है
- `ChargeConfig` pricing logic को परिभाषित करता है - यह request parameters के आधार पर dynamic हो सकता है

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

`send_with_payment` किसी भी HTTP client को automatic 402 handling, session management, और Zcash payment fulfillment के साथ विस्तारित करता है।

---

## CLI संदर्भ

| Command | Description |
|---|---|
| `npx zimppy wallet create` | Keys generate करें और seed phrase दिखाएँ |
| `npx zimppy wallet whoami` | Address (UA + T-addr), balance, network दिखाएँ |
| `npx zimppy wallet balance --all` | Per-account balance breakdown |
| `npx zimppy wallet send <addr> <zat>` | Shielded या transparent ZEC भेजें |
| `npx zimppy wallet transfer <from> <to> <zat>` | Accounts के बीच internal transfer |
| `npx zimppy wallet shield` | Transparent funds को Orchard (shielded) में ले जाएँ |
| `npx zimppy wallet use <name>` | Active wallet identity बदलें |
| `npx zimppy request <url>` | Auto 402 -> pay -> retry request |

---

## मुख्य विशेषताएँ

### Agent-Native Wallets

Zimppy wallets AI agents द्वारा programmatic उपयोग के लिए डिज़ाइन किए गए हैं - मानव-प्रबंधित browser extensions के लिए नहीं। Keys CLI या SDKs के माध्यम से manage की जाती हैं, accounts को **ZIP-32 account derivation** के जरिए rotate किया जा सकता है, और wallet प्रत्येक transaction पर human approval के बिना fully automated payment flows का समर्थन करता है।

### Multi-Agent Support

कई agents एक ही wallet से **ZIP-32 account rotation** का उपयोग करके काम कर सकते हैं - प्रत्येक agent को अपना अलग account मिलता है, जिसमें isolated balance tracking, cross-account transfer capability, और per-account balance reporting होती है। इससे एक ही wallet infrastructure से अनेक agents का fleet management संभव होता है।

### पूरी तरह Shielded Zcash Transactions (Orchard)

Shielded payments Zcash के **Orchard protocol** का उपयोग करते हैं - यह नवीनतम और सबसे सुरक्षित shielded pool है। Server payments को **Incoming Viewing Key (IVK)** का उपयोग करके verify करता है, जो spending key को उजागर किए बिना प्राप्त notes को decrypt कर सकता है। Replay attacks को **memo binding** के माध्यम से रोका जाता है - हर challenge में एक unique `zimppy:{challenge_id}` memo embedded होता है, जिसे cryptographically verify किया जाता है।

### Sessions , Zero Per-Request Latency

Session architecture on-chain confirmation wait को per-request latency से अलग कर देती है। एक single deposit (~75 सेकंड) के बाद, session close होने तक bearer-token के साथ की गई सभी subsequent requests बिना blockchain interaction के तुरंत serve की जाती हैं।

### Streaming , Pay-Per-Token

Native **SSE (Server-Sent Events)** support pay-per-token metered content को सक्षम बनाता है। यह LLM inference APIs के लिए आदर्श है, जहाँ output length variable होती है और billing वास्तविक consumption को दर्शानी चाहिए।

### Spec Compliance

- **HMAC-SHA256** signed challenges forgery को रोकते हैं
- **RFC 9457** structured error format interoperable error handling के लिए
- किसी भी MPP-compliant agent द्वारा automatic payment method discovery के लिए **`/.well-known/payment`**

---

## आर्किटेक्चर

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

### Components की ज़िम्मेदारियाँ

**`zimppy-core`** - cryptographic core। यह server के IVK का उपयोग करके Orchard note decryption, memo parsing, replay protection logic, और challenge verification को संभालता है। Performance और correctness के लिए Rust में लिखा गया है।

**`zimppy-wallet`** - `zingolib` द्वारा संचालित एक native Zcash wallet। यह keys, accounts, shielded/transparent balances, और transaction submission को manage करता है।

**`zimppy-rs`** - Rust SDK। यह `ChargeMethod`, `SessionMethod`, और `PaymentProvider` traits प्रदान करता है, साथ ही ergonomic server integration के लिए Axum extractors (`MppCharge`, `WithReceipt`) भी देता है।

**`zimppy-napi`** - NAPI-RS bindings जो Rust core को Node.js में expose करती हैं, जिससे TypeScript SDK JavaScript में Zcash primitives को दोबारा implement किए बिना वही cryptographic engine उपयोग कर सके।

**`zimppy-ts`** - TypeScript SDK। यह NAPI bindings को charge, session, और SSE streaming flows के लिए idiomatic async/await APIs के साथ wrap करता है।

**`zimppy-cli`** - command-line wallet और request tool। यह auto-pay (402 -> pay -> retry), session management, और सभी wallet operations का समर्थन करता है।

---

## उदाहरण और डेमो

| Example | Description |
|---|---|
| `examples/fortune-teller/` | Charge, session, और streaming demos - Rust server + client |
| `examples/llm-summarizer/` | Pay-per-token LLM streaming demo |
| `examples/mcp-server/` | Paid AI tools के साथ MCP tool server |
| `examples/ts-server/` | TypeScript MPP server reference implementation |

---

## इसमें क्या शामिल है - फीचर सारांश

| Feature | Description |
|---|---|
| **Sessions** | एक बार deposit, instant bearer requests, close पर refund |
| **Streaming** | SSE पर pay-per-token metered content |
| **Charge** | प्रति HTTP request shielded या transparent payment (402 flow) |
| **Transparent Payments** | Per-challenge replay prevention + shield command के साथ T-addresses |
| **Multi-Account** | ZIP-32 account rotation, cross-account transfers, per-account balances |
| **CLI Wallet** | Send, shield, transfer, balance --all, whoami, auto-pay |
| **Dual SDK** | TypeScript और Rust |
| **Spec-Compliant** | HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` discovery |

---

*अधिक जानकारी के लिए, [zimppy.xyz](https://zimppy.xyz) पर जाएँ*

---

## संबंधित पृष्ठ

- [Wallets](/using-zcash/wallets) — Shielded transactions को support करने वाले Zcash wallets
- [Shielded Pools](/using-zcash/shielded-pools) — Orchard shielded transactions payment data की सुरक्षा कैसे करते हैं
- [Payment Processors](/using-zcash/payment-processors) — Zcash payments स्वीकार करने के अन्य तरीके
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs और Zcash programmability का भविष्य
- [Community Projects](/zcash-community/community-projects) — Zcash ecosystem के और प्रोजेक्ट्स
