<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## संक्षेप में (TL;DR)

- **Zimppy** AI एजेंट (AI agents) के लिए गोपनीयता (privacy) को प्राथमिकता देने वाला भुगतान (payment) इंफ्रास्ट्रक्चर है, जो Zcash के मशीन पेमेंट प्रोटोकॉल (MPP) का उपयोग करता है
- ऑन-चेन (on-chain) **एक बार डिपॉज़िट करें** (~75 सेकंड), फिर प्रति अनुरोध किसी ब्लॉकचेन (blockchain) इंटरैक्शन के बिना **असीमित तत्काल अनुरोध** करें
- **पूरी तरह शील्डेड (shielded) Zcash (Orchard)** भुगतान का समर्थन — प्रेषक, प्राप्तकर्ता, राशि और मेमो (memo), सभी एन्क्रिप्टेड रहते हैं
- AI पाइपलाइन और API सर्वर में आसान इंटीग्रेशन के लिए **TypeScript और Rust SDK** के साथ काम करता है
- **LLM API, डेटा मार्केटप्लेस, MCP टूल सर्वर** और किसी भी M2M भुगतान के उपयोग के मामले (use case) के लिए उपयुक्त

---

> **Zimppy** Zcash के लिए मशीन पेमेंट प्रोटोकॉल (MPP) की भुगतान विधि है, जो शील्डेड और ट्रांसपेरेंट (transparent) दोनों तरह के भुगतान का समर्थन करती है। ऑन-चेन एक बार डिपॉज़िट करें, फिर प्रति अनुरोध किसी चेन (chain) इंटरैक्शन के बिना असीमित तत्काल बेयरर अनुरोध करें।

---

## विषय-सूची

1. [Zimppy.xyz क्या है?](#what-is-zimppyxyz)
2. [AI एजेंट के लिए शील्डेड भुगतान क्यों?](#why-shielded-payments-for-ai-agents)
3. [मशीन पेमेंट प्रोटोकॉल (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy कैसे काम करता है](#how-zimppy-works)
   - [सेशन (अनुशंसित)](#sessions-recommended)
   - [स्ट्रीमिंग](#streaming)
   - [चार्ज](#charge)
5. [उपयोग के मामले और उदाहरण](#use-cases--examples)
6. [इंस्टॉलेशन](#installation)
7. [Zimppy वॉलेट का सेटअप](#setting-up-the-zimppy-wallet)
8. [Zimppy का इंटीग्रेशन](#integrating-zimppy--typescript-sdk)
   - [सर्वर (शील्डेड)](#typescript-server--shielded)
   - [सर्वर (ट्रांसपेरेंट)](#typescript-server--transparent)
   - [क्लाइंट](#typescript-client)
9. [Zimppy का इंटीग्रेशन - Rust SDK](#integrating-zimppy--rust-sdk)
   - [सर्वर (Axum)](#rust-server-axum)
   - [क्लाइंट](#rust-client)
10. [CLI संदर्भ](#cli-reference)
11. [मुख्य विशेषताएँ](#key-features)
12. [आर्किटेक्चर](#architecture)
13. [उदाहरण और डेमो](#examples--demos)

---

## Zimppy.xyz क्या है?

**Zimppy.xyz** गोपनीयता को प्राथमिकता देने वाला भुगतान इंफ्रास्ट्रक्चर है, जिसे विशेष रूप से AI एजेंट और स्वचालित मशीन-टू-मशीन (M2M) वर्कफ़्लो के लिए डिज़ाइन किया गया है। यह **Zcash** को अपनी आधारभूत मुद्रा के रूप में उपयोग करते हुए **मशीन पेमेंट प्रोटोकॉल (MPP)** को लागू करता है, जिससे शील्डेड (पूरी तरह निजी) और ट्रांसपेरेंट, दोनों भुगतान मोड संभव होते हैं।

पारंपरिक ब्लॉकचेन भुगतान प्रणालियों में हर लेनदेन (transaction) ऑन-चेन सार्वजनिक रूप से दिखाई देता है, जबकि Zimppy एक सेशन-आधारित आर्किटेक्चर पर बनाया गया है, जो क्रिप्टोग्राफ़िक गोपनीयता बनाए रखते हुए प्रति अनुरोध की लेटेंसी को समाप्त करता है। इसी कारण यह उन AI एजेंट के लिए विशेष रूप से उपयुक्त है, जिन्हें व्यवहार संबंधी मेटाडेटा लीक किए बिना API, डेटा, कंप्यूट या AI उपकरण (tools) के लिए प्रोग्रामेटिक रूप से भुगतान करना होता है।

### मुख्य गुण

- ऑन-चेन **एक बार डिपॉज़िट** (Zcash पुष्टि के लिए ~75 सेकंड)
- सेशन खुलने के बाद **असीमित तत्काल अनुरोध**, प्रति अनुरोध शून्य चेन इंटरैक्शन
- **शील्डेड भुगतान** Zcash के Orchard प्रोटोकॉल का उपयोग करके प्रेषक, प्राप्तकर्ता, राशि और मेमो को एन्क्रिप्ट करते हैं
- **ट्रांसपेरेंट भुगतान** पूर्ण गोपनीयता के बिना, रीप्ले रोकने के लिए प्रति-चैलेंज T-एड्रेस (address) का उपयोग करते हैं
- **स्पेसिफ़िकेशन-अनुरूप**: HMAC-SHA256 चैलेंज, RFC 9457 त्रुटियाँ, `/.well-known/payment` डिस्कवरी

---

## AI एजेंट के लिए शील्डेड भुगतान क्यों?

संवेदनशील वर्कफ़्लो, जैसे कानूनी शोध, चिकित्सा प्रश्न, वित्तीय विश्लेषण और प्रतिस्पर्धी इंटेलिजेंस, को संभालने वाले AI एजेंट के लिए **हर सार्वजनिक भुगतान एक मेटाडेटा लीक है**। Zimppy एकमात्र MPP भुगतान विधि है जो **डिफ़ॉल्ट रूप से निजी** है।

### गोपनीयता तुलना तालिका

| गुण | सार्वजनिक चेन (USDC, ETH) | Zimppy शील्डेड | Zimppy ट्रांसपेरेंट |
|---|---|---|---|
| **प्रेषक** | दिखाई देता है | एन्क्रिप्टेड | दिखाई देता है |
| **प्राप्तकर्ता** | दिखाई देता है | एन्क्रिप्टेड | प्रति-चैलेंज (अनलिंकेबल) |
| **राशि** | दिखाई देती है | एन्क्रिप्टेड | दिखाई देती है |
| **मेमो** | दिखाई देता है | एन्क्रिप्टेड | लागू नहीं |
| **रीप्ले सुरक्षा** | कोई नहीं | मेमो बाइंडिंग | प्रति-चैलेंज T-एड्रेस |
| **सेवा उपयोग पैटर्न** | लिंक करने योग्य | निजी | अनलिंकेबल (unlinkable) (नया एड्रेस) |

### लेटेंसी की समस्या, सेशन द्वारा हल

> *“लेकिन Zcash में ब्लॉक (block) टाइम 75 सेकंड का होता है।”*

**सेशन इसे हल करते हैं।** ऑन-चेन प्रतीक्षा डिपॉज़िट के समय ठीक **एक बार** होती है। उसके बाद का हर अनुरोध तत्काल होता है।

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**एक बार भुगतान करें, तुरंत कॉल करें, बची हुई राशि वापस पाएँ।** प्रति अनुरोध लेटेंसी शून्य है।

---

## मशीन पेमेंट प्रोटोकॉल (MPP)

**मशीन पेमेंट प्रोटोकॉल (MPP)** एक मानकीकृत प्रोटोकॉल है, जो स्वायत्त सॉफ़्टवेयर एजेंट (AI एजेंट, बॉट, स्क्रिप्ट) को मानवीय हस्तक्षेप के बिना API एक्सेस के लिए भुगतान आवश्यकताओं को खोजने, तय करने और पूरा करने में सक्षम बनाता है।

### MPP API के साथ कैसे इंटीग्रेट होता है

MPP HTTP **402 Payment Required** फ़्लो का पालन करता है:

1. **एजेंट** किसी सशुल्क API एंडपॉइंट से संसाधन का **अनुरोध करता है**।
2. **सर्वर** `402 Payment Required` + एक हस्ताक्षरित चैलेंज (राशि, प्राप्तकर्ता, मेमो) के साथ **जवाब देता है**।
3. **एजेंट** किसी संगत भुगतान विधि (जैसे Zimppy शील्डेड Zcash) का उपयोग करके **भुगतान करता है**।
4. **एजेंट** `Authorization: Payment {txid}` के साथ अनुरोध **दोबारा भेजता है**।
5. **सर्वर** भुगतान को क्रिप्टोग्राफ़िक रूप से **सत्यापित करता है** (Orchard IVK डिक्रिप्शन, राशि + मेमो जाँच)।
6. **सर्वर** `200 OK` + एक `Payment-Receipt` हेडर के साथ **जवाब देता है**।

### स्पेसिफ़िकेशन अनुपालन

- **HMAC-SHA256** चैलेंज साइनिंग
- **RFC 9457** संरचित त्रुटि प्रतिक्रियाएँ
- स्वचालित भुगतान विधि डिस्कवरी के लिए **`/.well-known/payment`** एंडपॉइंट
- स्पेंडिंग की (spending key) उजागर किए बिना सर्वर-साइड भुगतान सत्यापन के लिए **Orchard IVK** (Incoming Viewing Key)

---

## Zimppy कैसे काम करता है

### सेशन (अनुशंसित)

सेशन मुख्य इंटरैक्शन पैटर्न हैं। एजेंट एक बार ऑन-चेन बैलेंस डिपॉज़िट करता है, एक बेयरर टोकन (token) प्राप्त करता है, और उसके बाद के सभी अनुरोधों के लिए शून्य लेटेंसी पर उसका उपयोग करता है।

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**सबसे उपयुक्त:** उच्च-आवृत्ति API कॉल, LLM इन्फ़रेंस, बार-बार होने वाली डेटा क्वेरी।

---

### स्ट्रीमिंग

**Server-Sent Events (SSE)** के माध्यम से दी जाने वाली, प्रति-टोकन भुगतान वाली मीटर्ड सामग्री। सर्वर स्ट्रीम किए गए प्रत्येक शब्द या टोकन के अनुसार सेशन बैलेंस से राशि काटता है।

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**सबसे उपयुक्त:** LLM स्ट्रीमिंग प्रतिक्रियाएँ, रियल-टाइम डेटा फ़ीड, प्रति-टोकन भुगतान वाले AI उपकरण।

---

### चार्ज

प्रति अनुरोध एक शील्डेड भुगतान। हर कॉल पर पूरा HTTP 402 फ़्लो चलता है। यह तब उपयुक्त है जब अनुरोध कभी-कभार होते हों या उच्च मूल्य के हों।

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**सबसे उपयुक्त:** उच्च मूल्य वाले एकल अनुरोध, कभी-कभार होने वाली API कॉल, प्रीमियम डेटा एंडपॉइंट।

---

## उपयोग के मामले और उदाहरण

### 1. AI एजेंट

एक कानूनी AI एजेंट किसी सशुल्क केस-लॉ डेटाबेस से क्वेरी करता है। Zimppy शील्डेड सेशन का उपयोग करने पर न तो लॉ फ़र्म की पहचान और न ही विशिष्ट क्वेरी ऑन-चेन दिखाई देती हैं - जिससे इंफ्रास्ट्रक्चर स्तर पर ही वकील-मुवक्किल विशेषाधिकार सुरक्षित रहता है।

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. मेडिकल क्वेरी पाइपलाइन के लिए AI एजेंट

एक चिकित्सा निदान एजेंट कई क्लिनिकल डेटाबेस से क्वेरी करता है। शील्डेड भुगतान यह सुनिश्चित करते हैं कि मरीज़ों की क्वेरी के पैटर्न को अलग-अलग प्रदाताओं के बीच लिंक न किया जा सके।

### 3. वित्तीय विश्लेषण एजेंट

एक एल्गोरिथमिक ट्रेडिंग एजेंट रियल-टाइम मार्केट डेटा API के लिए भुगतान करता है। ट्रांसपेरेंट भुगतान प्रति चैलेंज नए T-एड्रेस का उपयोग करते हैं, जिससे अलग-अलग डेटा विक्रेताओं के बीच उपयोग पैटर्न का सहसंबंध रोका जाता है।

### 4. MCP टूल सर्वर, सशुल्क AI उपकरण

एक MCP (Model Context Protocol) सर्वर सशुल्क AI उपकरण उपलब्ध कराता है। प्रत्येक उपकरण का उपयोग एक Zimppy चार्ज ट्रिगर करता है, जिससे मुद्रीकृत AI क्षमताओं का एक मार्केटप्लेस संभव होता है।

### 5. LLM सारांशकर्ता, प्रति-टोकन भुगतान

एक LLM सारांश सेवा SSE स्ट्रीमिंग के माध्यम से एजेंट से प्रति आउटपुट टोकन शुल्क लेती है, जिसमें बैलेंस स्वचालित रूप से कटता है और अप्रयुक्त प्रीपेड बैलेंस वापस किया जाता है।

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

## Zimppy वॉलेट का सेटअप

Zimppy CLI एक पूर्ण वॉलेट (wallet) इंटरफ़ेस प्रदान करता है। सभी कमांड `npx zimppy` के माध्यम से उपलब्ध हैं।

### चरण 1 : वॉलेट बनाएँ

```bash
npx zimppy wallet create
```

यह क्रिप्टोग्राफ़िक की जनरेट करता है और आपका **सीड फ्रेज़ (seed phrase)** दिखाता है। इसे सुरक्षित रूप से संग्रहीत करें - खो जाने पर इसे पुनर्प्राप्त नहीं किया जा सकता।

### चरण 2 : अपना एड्रेस और बैलेंस जाँचें

```bash
npx zimppy wallet whoami
```

आपका **यूनिफ़ाइड एड्रेस (Unified Address, UA)**, **T-एड्रेस**, वर्तमान बैलेंस और सक्रिय नेटवर्क दिखाता है।

```bash
npx zimppy wallet balance --all
```

सभी ZIP-32 खातों में प्रति-खाता बैलेंस का विवरण दिखाता है।

### चरण 3 : अपने वॉलेट में फ़ंड डालें

किसी भी Zcash-संगत वॉलेट या एक्सचेंज (exchange) से अपने यूनिफ़ाइड एड्रेस पर ZEC भेजें। शील्डेड डिपॉज़िट सीधे आपके Orchard खाते में जाते हैं।

### चरण 4 : फ़ंड भेजें और शील्ड करें

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

### चरण 5 : ऑटो-पे अनुरोध करें

```bash
npx zimppy request <url>
```

यह पूरे 402 -> भुगतान -> पुनः प्रयास फ़्लो को स्वचालित रूप से संभालता है। सेशन पारदर्शी रूप से खोले और प्रबंधित किए जाते हैं।

---

## Zimppy का इंटीग्रेशन - TypeScript SDK

### TypeScript सर्वर - शील्डेड

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
- `zcash({ wallet: 'server' })` सर्वर का शील्डेड वॉलेट लोड करता है
- `mppx.charge()` पूरे 402 चैलेंज/सत्यापन जीवनचक्र को संभालता है
- `result.withReceipt()` प्रतिक्रिया के साथ क्रिप्टोग्राफ़िक भुगतान रसीद जोड़ता है

---

### TypeScript सर्वर - ट्रांसपेरेंट

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

हर चैलेंज एक **नया T-एड्रेस** जनरेट करता है, जिससे भुगतान अनुरोध अलग-अलग सेशन के बीच अनलिंकेबल रहते हैं।

---

### TypeScript क्लाइंट

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

क्लाइंट `402` प्रतिक्रियाओं को इंटरसेप्ट करता है, स्वचालित रूप से एक सेशन खोलता है और अनुरोध दोबारा भेजता है - कॉल करने वाले कोड को किसी भुगतान-विशिष्ट लॉजिक की आवश्यकता नहीं होती।

---

## Zimppy का इंटीग्रेशन - Rust SDK

### Rust सर्वर (Axum)

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
- `MppCharge<Price>` एक Axum एक्सट्रैक्टर है, जो हैंडलर चलने से पहले भुगतान सत्यापित करता है
- `WithReceipt` प्रतिक्रिया को क्रिप्टोग्राफ़िक भुगतान रसीद के साथ रैप करता है
- `ChargeConfig` मूल्य निर्धारण लॉजिक तय करता है - यह अनुरोध पैरामीटर के आधार पर डायनेमिक हो सकता है

---

### Rust क्लाइंट

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` किसी भी HTTP क्लाइंट को स्वचालित 402 हैंडलिंग, सेशन प्रबंधन और Zcash भुगतान पूर्ति के साथ विस्तारित करता है।

---

## CLI संदर्भ

| कमांड | विवरण |
|---|---|
| `npx zimppy wallet create` | की जनरेट करें और सीड फ्रेज़ दिखाएँ |
| `npx zimppy wallet whoami` | एड्रेस (UA + T-एड्रेस), बैलेंस, नेटवर्क दिखाएँ |
| `npx zimppy wallet balance --all` | प्रति-खाता बैलेंस विवरण |
| `npx zimppy wallet send <addr> <zat>` | शील्डेड या ट्रांसपेरेंट ZEC भेजें |
| `npx zimppy wallet transfer <from> <to> <zat>` | खातों के बीच आंतरिक ट्रांसफ़र |
| `npx zimppy wallet shield` | ट्रांसपेरेंट फ़ंड को Orchard (शील्डेड) में ले जाएँ |
| `npx zimppy wallet use <name>` | सक्रिय वॉलेट पहचान बदलें |
| `npx zimppy request <url>` | स्वचालित 402 -> भुगतान -> पुनः प्रयास अनुरोध |

---

## मुख्य विशेषताएँ

### एजेंट-नेटिव वॉलेट

Zimppy वॉलेट AI एजेंट द्वारा प्रोग्रामेटिक उपयोग के लिए डिज़ाइन किए गए हैं - ये मनुष्यों द्वारा प्रबंधित ब्राउज़र एक्सटेंशन नहीं हैं। की CLI या SDK के माध्यम से प्रबंधित की जाती हैं, खातों को **ZIP-32 खाता डेरिवेशन** के माध्यम से रोटेट किया जा सकता है, और वॉलेट प्रति लेनदेन मानवीय स्वीकृति के बिना पूरी तरह स्वचालित भुगतान फ़्लो का समर्थन करता है।

### मल्टी-एजेंट समर्थन

**ZIP-32 खाता रोटेशन** का उपयोग करके कई एजेंट एक ही वॉलेट से काम कर सकते हैं - प्रत्येक एजेंट को अलग बैलेंस ट्रैकिंग, क्रॉस-अकाउंट ट्रांसफ़र क्षमता और प्रति-खाता बैलेंस रिपोर्टिंग के साथ अपना खाता मिलता है। इससे एक ही वॉलेट इंफ्रास्ट्रक्चर से कई एजेंट के बेड़े का प्रबंधन संभव होता है।

### पूरी तरह शील्डेड Zcash लेनदेन (Orchard)

शील्डेड भुगतान Zcash के **Orchard प्रोटोकॉल** का उपयोग करते हैं, जो NU5 द्वारा शुरू किया गया शील्डेड पूल (pool) है। सर्वर **Incoming Viewing Key (IVK)** का उपयोग करके भुगतान सत्यापित करता है, जो स्पेंडिंग की उजागर किए बिना प्राप्त नोट (notes) को डिक्रिप्ट कर सकता है। रीप्ले हमलों को **मेमो बाइंडिंग** के माध्यम से रोका जाता है - प्रत्येक चैलेंज में एक अद्वितीय `zimppy:{challenge_id}` मेमो शामिल होता है, जिसे क्रिप्टोग्राफ़िक रूप से सत्यापित किया जाता है।

### सेशन, प्रति अनुरोध शून्य लेटेंसी

सेशन आर्किटेक्चर ऑन-चेन पुष्टि की प्रतीक्षा को प्रति-अनुरोध लेटेंसी से अलग कर देता है। एक बार डिपॉज़िट (~75 सेकंड) के बाद, सेशन बंद होने तक बाद के सभी बेयरर-टोकन अनुरोध बिना किसी ब्लॉकचेन इंटरैक्शन के तुरंत पूरे किए जाते हैं।

### स्ट्रीमिंग, प्रति-टोकन भुगतान

नेटिव **SSE (Server-Sent Events)** समर्थन प्रति-टोकन भुगतान वाली मीटर्ड सामग्री को संभव बनाता है। यह उन LLM इन्फ़रेंस API के लिए आदर्श है, जहाँ आउटपुट की लंबाई बदलती रहती है और बिलिंग वास्तविक खपत के अनुसार होनी चाहिए।

### स्पेसिफ़िकेशन अनुपालन

- **HMAC-SHA256** हस्ताक्षरित चैलेंज जालसाज़ी को रोकते हैं
- इंटरऑपरेबल त्रुटि हैंडलिंग के लिए **RFC 9457** संरचित त्रुटि फ़ॉर्मेट
- किसी भी MPP-अनुरूप एजेंट द्वारा स्वचालित भुगतान विधि डिस्कवरी के लिए **`/.well-known/payment`**

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

### घटकों की ज़िम्मेदारियाँ

**`zimppy-core`** - क्रिप्टोग्राफ़िक कोर। यह सर्वर के IVK का उपयोग करके Orchard नोट डिक्रिप्शन, मेमो पार्सिंग, रीप्ले सुरक्षा लॉजिक और चैलेंज सत्यापन को संभालता है। प्रदर्शन और सटीकता के लिए इसे Rust में लिखा गया है।

**`zimppy-wallet`** - `zingolib` द्वारा संचालित एक नेटिव Zcash वॉलेट। यह की, खाते, शील्डेड/ट्रांसपेरेंट बैलेंस और लेनदेन सबमिशन का प्रबंधन करता है।

**`zimppy-rs`** - Rust SDK। यह `ChargeMethod`, `SessionMethod` और `PaymentProvider` ट्रेट के साथ-साथ सुविधाजनक सर्वर इंटीग्रेशन के लिए Axum एक्सट्रैक्टर (`MppCharge`, `WithReceipt`) प्रदान करता है।

**`zimppy-napi`** - NAPI-RS बाइंडिंग, जो Rust कोर को Node.js के लिए उपलब्ध कराती हैं, जिससे TypeScript SDK JavaScript में Zcash प्रिमिटिव को दोबारा लागू किए बिना उसी क्रिप्टोग्राफ़िक इंजन का उपयोग कर पाता है।

**`zimppy-ts`** - TypeScript SDK। यह चार्ज, सेशन और SSE स्ट्रीमिंग फ़्लो के लिए NAPI बाइंडिंग को स्वाभाविक async/await API के साथ रैप करता है।

**`zimppy-cli`** - कमांड-लाइन वॉलेट और अनुरोध उपकरण। यह ऑटो-पे (402 -> भुगतान -> पुनः प्रयास), सेशन प्रबंधन और सभी वॉलेट संचालन का समर्थन करता है।

---

## उदाहरण और डेमो

| उदाहरण | विवरण |
|---|---|
| `examples/fortune-teller/` | चार्ज, सेशन और स्ट्रीमिंग डेमो - Rust सर्वर + क्लाइंट |
| `examples/llm-summarizer/` | प्रति-टोकन भुगतान वाला LLM स्ट्रीमिंग डेमो |
| `examples/mcp-server/` | सशुल्क AI उपकरण वाला MCP टूल सर्वर |
| `examples/ts-server/` | TypeScript MPP सर्वर का संदर्भ कार्यान्वयन |

---

## क्या शामिल है - विशेषताओं का सारांश

| विशेषता | विवरण |
|---|---|
| **सेशन** | एक बार डिपॉज़िट, तत्काल बेयरर अनुरोध, बंद करने पर रिफ़ंड |
| **स्ट्रीमिंग** | SSE पर प्रति-टोकन भुगतान वाली मीटर्ड सामग्री |
| **चार्ज** | प्रति HTTP अनुरोध शील्डेड या ट्रांसपेरेंट भुगतान (402 फ़्लो) |
| **ट्रांसपेरेंट भुगतान** | प्रति-चैलेंज रीप्ले रोकथाम + shield कमांड के साथ T-एड्रेस |
| **मल्टी-अकाउंट** | ZIP-32 खाता रोटेशन, क्रॉस-अकाउंट ट्रांसफ़र, प्रति-खाता बैलेंस |
| **CLI वॉलेट** | Send, shield, transfer, balance --all, whoami, auto-pay |
| **डुअल SDK** | TypeScript और Rust |
| **स्पेसिफ़िकेशन-अनुरूप** | HMAC-SHA256 चैलेंज, RFC 9457 त्रुटियाँ, `/.well-known/payment` डिस्कवरी |

---

*अधिक जानकारी के लिए [zimppy.xyz](https://zimppy.xyz) पर जाएँ*

---

## संबंधित पेज

- [वॉलेट](/using-zcash/wallets) — शील्डेड लेनदेन का समर्थन करने वाले Zcash वॉलेट
- [शील्डेड पूल](/using-zcash/shielded-pools) — Orchard शील्डेड लेनदेन भुगतान डेटा की सुरक्षा कैसे करते हैं
- [पेमेंट प्रोसेसर](/using-zcash/payment-processors) — Zcash भुगतान स्वीकार करने के अन्य तरीके
- [Zcash शील्डेड एसेट](/zcash-tech/zcash-shielded-assets) — ZSA और Zcash प्रोग्रामेबिलिटी का भविष्य
- [कम्युनिटी प्रोजेक्ट](/zcash-community/community-projects) — Zcash इकोसिस्टम के और प्रोजेक्ट
