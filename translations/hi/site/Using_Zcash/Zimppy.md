<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## संक्षेप में

- **Zimppy** AI एजेंटों के लिए Zcash के Machine Payment Protocol (MPP) का उपयोग करने वाला गोपनीयता-प्रथम भुगतान इंफ्रास्ट्रक्चर है
- ऑन-चेन एक बार **डिपॉज़िट करें** (~75 सेकंड), फिर प्रति-अनुरोध blockchain इंटरैक्शन के बिना **असीमित त्वरित अनुरोध** करें
- **पूर्णतः शील्डेड Zcash (Orchard)** भुगतानों का समर्थन करता है — प्रेषक, प्राप्तकर्ता, राशि और मेमो, सभी एन्क्रिप्टेड होते हैं
- AI पाइपलाइनों और API सर्वरों में आसान एकीकरण के लिए **TypeScript और Rust SDKs** के साथ कार्य करता है
- **LLM APIs, डेटा मार्केटप्लेस, MCP टूल सर्वर**, और किसी भी M2M भुगतान उपयोग-केस के लिए उपयुक्त

---

> **Zimppy** Zcash के लिए Machine Payment Protocol (MPP) की भुगतान विधि है, जो शील्डेड और पारदर्शी, दोनों भुगतानों का समर्थन करती है। ऑन-चेन एक बार डिपॉज़िट करें, फिर प्रति-अनुरोध चेन इंटरैक्शन के बिना असीमित त्वरित bearer अनुरोध करें।

---

## विषय-सूची

1. [Zimppy.xyz क्या है?](#what-is-zimppyxyz)
2. [AI एजेंटों के लिए शील्डेड भुगतान क्यों?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy कैसे कार्य करता है](#how-zimppy-works)
   - [सेशन (अनुशंसित)](#sessions-recommended)
   - [स्ट्रीमिंग](#streaming)
   - [चार्ज](#charge)
5. [उपयोग के मामले और उदाहरण](#use-cases--examples)
6. [इंस्टॉलेशन](#installation)
7. [Zimppy Wallet सेट अप करना](#setting-up-the-zimppy-wallet)
8. [Zimppy का एकीकरण](#integrating-zimppy--typescript-sdk)
   - [सर्वर (शील्डेड)](#typescript-server--shielded)
   - [सर्वर (पारदर्शी)](#typescript-server--transparent)
   - [क्लाइंट](#typescript-client)
9. [Zimppy का एकीकरण - Rust SDK](#integrating-zimppy--rust-sdk)
   - [सर्वर (Axum)](#rust-server-axum)
   - [क्लाइंट](#rust-client)
10. [CLI संदर्भ](#cli-reference)
11. [मुख्य विशेषताएँ](#key-features)
12. [आर्किटेक्चर](#architecture)
13. [उदाहरण और डेमो](#examples--demos)

---

## Zimppy.xyz क्या है?

**Zimppy.xyz** AI एजेंटों और स्वचालित मशीन-से-मशीन (M2M) वर्कफ़्लो के लिए विशेष रूप से डिज़ाइन किया गया गोपनीयता-प्रथम भुगतान इंफ्रास्ट्रक्चर है। यह **Zcash** को अपनी अंतर्निहित मुद्रा के रूप में उपयोग करके **Machine Payment Protocol (MPP)** लागू करता है, जिससे शील्डेड (पूर्णतः निजी) और पारदर्शी, दोनों भुगतान मोड सक्षम होते हैं।

पारंपरिक blockchain भुगतान प्रणालियों के विपरीत, जहाँ हर लेनदेन ऑन-चेन सार्वजनिक रूप से दिखाई देता है, Zimppy को सेशन-आधारित आर्किटेक्चर के इर्द-गिर्द बनाया गया है, जो क्रिप्टोग्राफ़िक गोपनीयता बनाए रखते हुए प्रति-अनुरोध विलंबता समाप्त करता है। इससे यह उन AI एजेंटों के लिए विशिष्ट रूप से उपयुक्त है जिन्हें व्यवहारिक मेटाडेटा उजागर किए बिना, प्रोग्रामेटिक रूप से APIs, डेटा, कंप्यूट या AI टूल्स के लिए भुगतान करना होता है।

### मुख्य गुण

- ऑन-चेन **एक बार डिपॉज़िट करें** (Zcash पुष्टि के लिए ~75 सेकंड)
- सेशन खोलने के बाद **असीमित त्वरित अनुरोध**, प्रति-अनुरोध चेन इंटरैक्शन शून्य
- **शील्डेड भुगतान** Zcash के Orchard प्रोटोकॉल का उपयोग करके प्रेषक, प्राप्तकर्ता, राशि और मेमो को एन्क्रिप्ट करते हैं
- **पारदर्शी भुगतान** पूर्ण गोपनीयता के बिना रीप्ले रोकथाम के लिए प्रति-चैलेंज T-addresses का उपयोग करते हैं
- **स्पेसिफिकेशन-अनुपालक**,  HMAC-SHA256 चैलेंज, RFC 9457 त्रुटियाँ, `/.well-known/payment` डिस्कवरी

---

## AI एजेंटों के लिए शील्डेड भुगतान क्यों?

संवेदनशील वर्कफ़्लो, कानूनी शोध, चिकित्सीय प्रश्नों, वित्तीय विश्लेषण और प्रतिस्पर्धी इंटेलिजेंस को संभालने वाले AI एजेंटों के लिए **हर सार्वजनिक भुगतान एक मेटाडेटा लीक है**। Zimppy एकमात्र MPP भुगतान विधि है जो **डिफ़ॉल्ट रूप से निजी** है।

### गोपनीयता तुलना तालिका

| गुण | सार्वजनिक चेन्स (USDC, ETH) | Zimppy शील्डेड | Zimppy पारदर्शी |
|---|---|---|---|
| **प्रेषक** | दृश्यमान | एन्क्रिप्टेड | दृश्यमान |
| **प्राप्तकर्ता** | दृश्यमान | एन्क्रिप्टेड | प्रति-चैलेंज (अलिंक योग्य) |
| **राशि** | दृश्यमान | एन्क्रिप्टेड | दृश्यमान |
| **मेमो** | दृश्यमान | एन्क्रिप्टेड | लागू नहीं |
| **रीप्ले सुरक्षा** | कोई नहीं | मेमो बाइंडिंग | प्रति-चैलेंज T-address |
| **सेवा उपयोग पैटर्न** | लिंक योग्य | निजी | अलिंक योग्य (नया addr) |

### विलंबता समस्या, सेशन द्वारा हल

> *"लेकिन Zcash में 75-सेकंड का ब्लॉक समय है।"*

**सेशन इसे हल करते हैं।** ऑन-चेन प्रतीक्षा डिपॉज़िट के समय केवल **एक बार** होती है। इसके बाद का हर अनुरोध त्वरित होता है।

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**एक बार भुगतान करें, तुरंत कॉल करें, बाकी राशि वापस पाएँ।** प्रति-अनुरोध विलंबता शून्य है।

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** एक मानकीकृत प्रोटोकॉल है जो स्वायत्त सॉफ़्टवेयर एजेंटों (AI एजेंटों, बॉट्स, स्क्रिप्ट्स) को मानवीय हस्तक्षेप के बिना API एक्सेस के लिए भुगतान आवश्यकताओं को खोजने, समझौता करने और पूरा करने में सक्षम बनाता है।

### MPP APIs के साथ कैसे एकीकृत होता है

MPP HTTP **402 Payment Required** प्रवाह का अनुसरण करता है:

1. **एजेंट अनुरोध करता है** सशुल्क API एंडपॉइंट से किसी संसाधन का।
2. **सर्वर प्रतिक्रिया देता है** `402 Payment Required` + एक हस्ताक्षरित चैलेंज (राशि, प्राप्तकर्ता, मेमो) के साथ।
3. **एजेंट भुगतान करता है** संगत भुगतान विधि (जैसे Zimppy शील्डेड Zcash) का उपयोग करके।
4. **एजेंट पुनः प्रयास करता है** `Authorization: Payment {txid}` के साथ अनुरोध का।
5. **सर्वर सत्यापित करता है** भुगतान को क्रिप्टोग्राफ़िक रूप से (Orchard IVK डिक्रिप्शन, राशि + मेमो जाँच)।
6. **सर्वर प्रतिक्रिया देता है** `200 OK` + एक `Payment-Receipt` हेडर के साथ।

### स्पेसिफिकेशन अनुपालन

- **HMAC-SHA256** चैलेंज हस्ताक्षर
- **RFC 9457** संरचित त्रुटि प्रतिक्रियाएँ
- स्वचालित भुगतान विधि डिस्कवरी के लिए **`/.well-known/payment`** एंडपॉइंट
- खर्च करने वाली कुंजियाँ उजागर किए बिना सर्वर-साइड भुगतान सत्यापन के लिए **Orchard IVK** (Incoming Viewing Key)

---

## Zimppy कैसे कार्य करता है

### सेशन (अनुशंसित)

सेशन प्राथमिक इंटरैक्शन पैटर्न हैं। एजेंट एक बार ऑन-चेन बैलेंस डिपॉज़िट करता है, एक bearer टोकन प्राप्त करता है और शून्य विलंबता के साथ सभी आगामी अनुरोधों के लिए उसका उपयोग करता है।

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**इनके लिए सर्वोत्तम:** उच्च-आवृत्ति API कॉल्स, LLM इन्फ़रेंस, बार-बार डेटा प्रश्न।

---

### स्ट्रीमिंग

**Server-Sent Events (SSE)** के माध्यम से वितरित प्रति-टोकन मीटर्ड सामग्री। सर्वर स्ट्रीम किए गए प्रत्येक शब्द या टोकन के लिए सेशन बैलेंस से कटौती करता है।

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**इनके लिए सर्वोत्तम:** LLM स्ट्रीमिंग प्रतिक्रियाएँ, रियल-टाइम डेटा फ़ीड्स, प्रति-टोकन AI टूल्स।

---

### चार्ज

प्रति अनुरोध एक एकल शील्डेड भुगतान। प्रत्येक कॉल के लिए पूरा HTTP 402 प्रवाह निष्पादित किया जाता है। जब अनुरोध कम या उच्च-मूल्य वाले हों, तब उपयुक्त है।

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**इनके लिए सर्वोत्तम:** उच्च-मूल्य एकमुश्त अनुरोध, कम API कॉल्स, प्रीमियम डेटा एंडपॉइंट्स।

---

## उपयोग के मामले और उदाहरण

### 1. AI एजेंट

एक कानूनी AI एजेंट सशुल्क केस-लॉ डेटाबेस से प्रश्न करता है। Zimppy शील्डेड सेशन का उपयोग करने पर न तो विधि फर्म की पहचान और न ही विशिष्ट प्रश्न ऑन-चेन दिखाई देते हैं — इससे इंफ्रास्ट्रक्चर स्तर पर वकील-ग्राहक विशेषाधिकार की सुरक्षा होती है।

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. चिकित्सीय प्रश्न पाइपलाइन के लिए AI एजेंट

एक चिकित्सीय निदान एजेंट अनेक क्लिनिकल डेटाबेस से प्रश्न करता है। शील्डेड भुगतान सुनिश्चित करते हैं कि रोगी प्रश्न पैटर्न प्रदाताओं के बीच लिंक योग्य न हों।

### 3. वित्तीय विश्लेषण एजेंट

एक एल्गोरिद्मिक ट्रेडिंग एजेंट रियल-टाइम बाज़ार डेटा APIs के लिए भुगतान करता है। पारदर्शी भुगतान प्रत्येक चैलेंज के लिए नए T-addresses का उपयोग करते हैं, जिससे डेटा विक्रेताओं के बीच उपयोग पैटर्न सहसंबंध रोका जाता है।

### 4. MCP टूल सर्वर, सशुल्क AI टूल्स

एक MCP (Model Context Protocol) सर्वर सशुल्क AI टूल्स उपलब्ध कराता है। प्रत्येक टूल इनवोकेशन एक Zimppy चार्ज ट्रिगर करता है, जिससे मुद्रीकृत AI क्षमताओं का एक मार्केटप्लेस सक्षम होता है।

### 5. LLM सारांशकर्ता, प्रति-टोकन भुगतान

एक LLM सारांश सेवा SSE स्ट्रीमिंग के माध्यम से एजेंटों से प्रति आउटपुट टोकन शुल्क लेती है, जिसमें स्वचालित बैलेंस कटौती और अप्रयुक्त प्रीपेड बैलेंस का रिफंड होता है।

---

## इंस्टॉलेशन

### नोड.js / TypeScript

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

## Zimppy Wallet सेट अप करना

Zimppy CLI एक पूर्ण wallet इंटरफ़ेस प्रदान करता है। सभी कमांड `npx zimppy` के माध्यम से उपलब्ध हैं।

### चरण 1 : Wallet बनाएँ

```bash
npx zimppy wallet create
```

क्रिप्टोग्राफ़िक कुंजियाँ जनरेट करता है और आपका **seed phrase** प्रदर्शित करता है। इसे सुरक्षित रूप से रखें — खो जाने पर इसे पुनर्प्राप्त नहीं किया जा सकता।

### चरण 2 : अपना पता और बैलेंस जाँचें

```bash
npx zimppy wallet whoami
```

आपका **Unified Address (UA)**, **T-address**, वर्तमान बैलेंस और सक्रिय नेटवर्क प्रदर्शित करता है।

```bash
npx zimppy wallet balance --all
```

सभी ZIP-32 खातों में प्रति-खाता बैलेंस का विवरण दिखाता है।

### चरण 3 : अपने Wallet में धन जमा करें

किसी भी Zcash-संगत wallet या एक्सचेंज से अपने Unified Address पर ZEC भेजें। शील्डेड डिपॉज़िट सीधे आपके Orchard खाते में जाते हैं।

### चरण 4 : धन भेजें और शील्ड करें

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

### चरण 5 : Auto-Pay अनुरोध करें

```bash
npx zimppy request <url>
```

पूर्ण 402 -> pay -> retry प्रवाह को स्वचालित रूप से संभालता है। सेशन पारदर्शी रूप से खोले और प्रबंधित किए जाते हैं।

---

## Zimppy का एकीकरण - TypeScript SDK

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
- `zcash({ wallet: 'server' })` सर्वर का शील्डेड wallet लोड करता है
- `mppx.charge()` पूर्ण 402 चैलेंज/सत्यापन जीवनचक्र संभालता है
- `result.withReceipt()` प्रतिक्रिया के साथ क्रिप्टोग्राफ़िक भुगतान रसीद संलग्न करता है

---

### TypeScript सर्वर - पारदर्शी

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

प्रत्येक चैलेंज एक **नया T-address** जनरेट करता है, जिससे भुगतान अनुरोध सेशनों के बीच अलिंक योग्य बनते हैं।

---

### TypeScript क्लाइंट

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

क्लाइंट `402` प्रतिक्रियाओं को इंटरसेप्ट करता है, स्वचालित रूप से सेशन खोलता है और अनुरोध का पुनः प्रयास करता है — कॉलिंग कोड को किसी भुगतान-विशिष्ट लॉजिक की आवश्यकता नहीं होती।

---

## Zimppy का एकीकरण - Rust SDK

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
- `MppCharge<Price>` एक Axum एक्सट्रैक्टर है जो हैंडलर चलने से पहले भुगतान सत्यापित करता है
- `WithReceipt` प्रतिक्रिया को क्रिप्टोग्राफ़िक भुगतान रसीद के साथ रैप करता है
- `ChargeConfig` मूल्य-निर्धारण लॉजिक परिभाषित करता है — अनुरोध पैरामीटरों के आधार पर डायनेमिक हो सकता है

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

`send_with_payment` स्वचालित 402 हैंडलिंग, सेशन प्रबंधन और Zcash भुगतान पूर्णता के साथ किसी भी HTTP क्लाइंट का विस्तार करता है।

---

## CLI संदर्भ

| कमांड | विवरण |
|---|---|
| `npx zimppy wallet create` | कुंजियाँ जनरेट करें और seed phrase प्रदर्शित करें |
| `npx zimppy wallet whoami` | पता (UA + T-addr), बैलेंस, नेटवर्क दिखाएँ |
| `npx zimppy wallet balance --all` | प्रति-खाता बैलेंस विवरण |
| `npx zimppy wallet send <addr> <zat>` | शील्डेड या पारदर्शी ZEC भेजें |
| `npx zimppy wallet transfer <from> <to> <zat>` | खातों के बीच आंतरिक स्थानांतरण |
| `npx zimppy wallet shield` | पारदर्शी धन को Orchard (शील्डेड) में स्थानांतरित करें |
| `npx zimppy wallet use <name>` | सक्रिय wallet पहचान बदलें |
| `npx zimppy request <url>` | स्वचालित 402 -> pay -> retry अनुरोध |

---

## मुख्य विशेषताएँ

### एजेंट-नेटिव Wallets

Zimppy wallets मानव-प्रबंधित ब्राउज़र एक्सटेंशनों के लिए नहीं, बल्कि AI एजेंटों द्वारा प्रोग्रामेटिक उपयोग के लिए डिज़ाइन किए गए हैं। कुंजियाँ CLI या SDKs के माध्यम से प्रबंधित होती हैं, खाते **ZIP-32 account derivation** के माध्यम से रोटेट किए जा सकते हैं, और wallet प्रति लेनदेन मानवीय स्वीकृति के बिना पूर्णतः स्वचालित भुगतान प्रवाहों का समर्थन करता है।

### मल्टी-एजेंट समर्थन

कई एजेंट **ZIP-32 account rotation** का उपयोग करके एक ही wallet से कार्य कर सकते हैं — प्रत्येक एजेंट को अलग बैलेंस ट्रैकिंग, अंतर-खाता स्थानांतरण क्षमता और प्रति-खाता बैलेंस रिपोर्टिंग वाला अपना खाता मिलता है। इससे एकल wallet इंफ्रास्ट्रक्चर से अनेक एजेंटों का फ्लीट प्रबंधन संभव होता है।

### पूर्णतः शील्डेड Zcash लेनदेन (Orchard)

शील्डेड भुगतान Zcash के **Orchard protocol** का उपयोग करते हैं — नवीनतम और सबसे सुरक्षित शील्डेड पूल। सर्वर एक **Incoming Viewing Key (IVK)** का उपयोग करके भुगतानों का सत्यापन करता है, जो खर्च करने वाली कुंजी उजागर किए बिना प्राप्त नोट्स को डिक्रिप्ट कर सकती है। रीप्ले हमले **memo binding** द्वारा रोके जाते हैं — प्रत्येक चैलेंज एक विशिष्ट `zimppy:{challenge_id}` मेमो एम्बेड करता है जिसका क्रिप्टोग्राफ़िक रूप से सत्यापन किया जाता है।

### सेशन , शून्य प्रति-अनुरोध विलंबता

सेशन आर्किटेक्चर ऑन-चेन पुष्टि प्रतीक्षा को प्रति-अनुरोध विलंबता से अलग करता है। एकल डिपॉज़िट (~75 सेकंड) के बाद, सेशन बंद होने तक आगामी सभी bearer-टोकन अनुरोध बिना किसी blockchain इंटरैक्शन के तुरंत पूरे किए जाते हैं।

### स्ट्रीमिंग , प्रति-टोकन भुगतान

मूल **SSE (Server-Sent Events)** समर्थन प्रति-टोकन मीटर्ड सामग्री सक्षम करता है। उन LLM इन्फ़रेंस APIs के लिए आदर्श है जहाँ आउटपुट लंबाई परिवर्तनशील होती है और बिलिंग वास्तविक खपत दर्शानी चाहिए।

### स्पेसिफिकेशन अनुपालन

- **HMAC-SHA256** हस्ताक्षरित चैलेंज जालसाजी रोकते हैं
- इंटरऑपरेबल त्रुटि हैंडलिंग के लिए **RFC 9457** संरचित त्रुटि प्रारूप
- किसी भी MPP-अनुपालक एजेंट द्वारा स्वचालित भुगतान विधि डिस्कवरी के लिए **`/.well-known/payment`**

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

### कंपोनेंट जिम्मेदारियाँ

**`zimppy-core`** - क्रिप्टोग्राफ़िक कोर। सर्वर के IVK का उपयोग करके Orchard नोट डिक्रिप्शन, मेमो पार्सिंग, रीप्ले सुरक्षा लॉजिक और चैलेंज सत्यापन संभालता है। प्रदर्शन और शुद्धता के लिए Rust में लिखा गया है।

**`zimppy-wallet`** - `zingolib` द्वारा संचालित एक मूल Zcash wallet। कुंजियाँ, खाते, शील्डेड/पारदर्शी बैलेंस और लेनदेन सबमिशन प्रबंधित करता है।

**`zimppy-rs`** - Rust SDK। एर्गोनोमिक सर्वर एकीकरण के लिए `ChargeMethod`, `SessionMethod`, और `PaymentProvider` traits, साथ ही Axum एक्सट्रैक्टर्स (`MppCharge`, `WithReceipt`) प्रदान करता है।

**`zimppy-napi`** - NAPI-RS बाइंडिंग्स जो Rust कोर को नोड.js के लिए एक्सपोज़ करती हैं, जिससे TypeScript SDK JavaScript में Zcash प्रिमिटिव्स को फिर से लागू किए बिना उसी क्रिप्टोग्राफ़िक इंजन का उपयोग कर सकता है।

**`zimppy-ts`** - TypeScript SDK। चार्ज, सेशन और SSE स्ट्रीमिंग प्रवाहों के लिए NAPI बाइंडिंग्स को मुहावरेदार async/await APIs के साथ रैप करता है।

**`zimppy-cli`** - कमांड-लाइन wallet और अनुरोध टूल। auto-pay (402 -> pay -> retry), सेशन प्रबंधन और सभी wallet संचालन का समर्थन करता है।

---

## उदाहरण और डेमो

| उदाहरण | विवरण |
|---|---|
| `examples/fortune-teller/` | चार्ज, सेशन और स्ट्रीमिंग डेमो - Rust सर्वर + क्लाइंट |
| `examples/llm-summarizer/` | प्रति-टोकन LLM स्ट्रीमिंग डेमो |
| `examples/mcp-server/` | सशुल्क AI टूल्स वाला MCP टूल सर्वर |
| `examples/ts-server/` | TypeScript MPP सर्वर संदर्भ कार्यान्वयन |

---

## क्या शामिल है - फ़ीचर सारांश

| फ़ीचर | विवरण |
|---|---|
| **सेशन** | एक बार डिपॉज़िट, त्वरित bearer अनुरोध, बंद करने पर रिफंड |
| **स्ट्रीमिंग** | SSE पर प्रति-टोकन मीटर्ड सामग्री |
| **चार्ज** | प्रत्येक HTTP अनुरोध पर शील्डेड या पारदर्शी भुगतान (402 प्रवाह) |
| **पारदर्शी भुगतान** | प्रति-चैलेंज रीप्ले रोकथाम + shield कमांड के साथ T-addresses |
| **मल्टी-खाता** | ZIP-32 खाता रोटेशन, अंतर-खाता स्थानांतरण, प्रति-खाता बैलेंस |
| **CLI Wallet** | भेजें, shield करें, स्थानांतरण, balance --all, whoami, auto-pay |
| **डुअल SDK** | TypeScript और Rust |
| **स्पेसिफिकेशन-अनुपालक** | HMAC-SHA256 चैलेंज, RFC 9457 त्रुटियाँ, `/.well-known/payment` डिस्कवरी |

---

*अधिक जानकारी के लिए, [zimppy.xyz](https://zimppy.xyz) पर जाएँ*

---

## संबंधित पृष्ठ

- [Wallets](/using-zcash/wallets) — शील्डेड लेनदेन समर्थित करने वाले Zcash wallets
- [शील्डेड पूल](/using-zcash/shielded-pools) — Orchard शील्डेड लेनदेन भुगतान डेटा की सुरक्षा कैसे करते हैं
- [भुगतान प्रोसेसर](/using-zcash/payment-processors) — Zcash भुगतान स्वीकार करने के अन्य तरीके
- [Zcash शील्डेड एसेट्स](/zcash-tech/zcash-shielded-assets) — ZSAs और Zcash प्रोग्रामेबिलिटी का भविष्य
- [सामुदायिक परियोजनाएँ](/zcash-community/community-projects) — अधिक Zcash इकोसिस्टम परियोजनाएँ
