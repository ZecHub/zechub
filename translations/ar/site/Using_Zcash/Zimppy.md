<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تحرير الصفحة"/>
</a>

# Zimppy.xyz

## خلاصة سريعة

- **Zimppy** بنية تحتية للدفع تضع الخصوصية أولًا، مصممة لوكلاء الذكاء الاصطناعي باستخدام بروتوكول الدفع الآلي (MPP) الخاص بـ Zcash
- **أودِع مرة واحدة** على السلسلة (~25 ثانية لكل كتلة منذ NU7)، ثم أجرِ **طلبات فورية غير محدودة** من دون أي تفاعل مع سلسلة الكتل لكل طلب
- يدعم مدفوعات **Zcash (Orchard) محمية بالكامل** — إذ تُشفّر هوية المرسل والمستلم والمبلغ والمذكرة
- يعمل مع حزم تطوير البرمجيات **TypeScript وRust** لسهولة الدمج في مسارات عمل الذكاء الاصطناعي وخوادم API
- مثالي لواجهات LLM البرمجية، وأسواق البيانات، وخوادم أدوات MCP، وأي حالة استخدام للدفع بين الآلات (M2M)

---

> **Zimppy** وسيلة الدفع عبر بروتوكول الدفع الآلي (MPP) لـ Zcash، وتدعم المدفوعات المحمية والشفافة. أودِع مرة واحدة على السلسلة، ثم أجرِ طلبات فورية غير محدودة لحامل الرمز من دون تفاعل مع السلسلة لكل طلب.

---

## جدول المحتويات

1. [ما Zimppy.xyz؟](#what-is-zimppyxyz)
2. [لماذا المدفوعات المحمية لوكلاء الذكاء الاصطناعي؟](#why-shielded-payments-for-ai-agents)
3. [بروتوكول الدفع الآلي (MPP)](#machine-payment-protocol-mpp)
4. [كيف يعمل Zimppy](#how-zimppy-works)
   - [الجلسات (موصى بها)](#sessions-recommended)
   - [البث](#streaming)
   - [الدفع](#charge)
5. [حالات الاستخدام والأمثلة](#use-cases--examples)
6. [التثبيت](#installation)
7. [إعداد محفظة Zimppy](#setting-up-the-zimppy-wallet)
8. [دمج Zimppy](#integrating-zimppy--typescript-sdk)
   - [الخادم (محمي)](#typescript-server--shielded)
   - [الخادم (شفاف)](#typescript-server--transparent)
   - [العميل](#typescript-client)
9. [دمج Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [الخادم (Axum)](#rust-server-axum)
   - [العميل](#rust-client)
10. [مرجع CLI](#cli-reference)
11. [الميزات الرئيسية](#key-features)
12. [البنية](#architecture)
13. [أمثلة وعروض توضيحية](#examples--demos)

---

## ما Zimppy.xyz؟

**Zimppy.xyz** بنية تحتية للدفع تضع الخصوصية أولًا، ومصممة خصيصًا لوكلاء الذكاء الاصطناعي ومسارات العمل الآلية بين الآلات (M2M). وهي تطبق **بروتوكول الدفع الآلي (MPP)** باستخدام **Zcash** عملةً أساسية، ما يتيح أوضاع الدفع المحمي (الخاص بالكامل) والشفاف.

على خلاف أنظمة الدفع التقليدية المعتمدة على سلسلة الكتل، حيث تكون كل معاملة ظاهرة علنًا على السلسلة، صُمم Zimppy حول بنية قائمة على الجلسات تزيل زمن الانتظار لكل طلب مع الحفاظ على الخصوصية التشفيرية. وهذا يجعله مناسبًا على نحو فريد لوكلاء الذكاء الاصطناعي الذين يحتاجون برمجيًا إلى الدفع مقابل واجهات API أو البيانات أو القدرة الحاسوبية أو أدوات الذكاء الاصطناعي، من دون تسريب بيانات وصفية عن سلوكهم.

### الخصائص الأساسية

- **أودِع مرة واحدة** على السلسلة (~25 ثانية لكتلة Zcash منذ NU7؛ وكانت المدة 75 ثانية من قبل)
- **طلبات فورية غير محدودة** بعد فتح الجلسة، ومن دون أي تفاعل مع السلسلة لكل طلب
- **المدفوعات المحمية** تشفّر المرسل والمستلم والمبلغ والمذكرة باستخدام بروتوكول Orchard الخاص بـ Zcash
- تستخدم **المدفوعات الشفافة** عناوين T جديدة لكل تحدٍ لمنع إعادة التشغيل من دون خصوصية كاملة
- **متوافق مع المواصفات**: تحديات HMAC-SHA256، وأخطاء RFC 9457، واكتشاف `/.well-known/payment`

---

## لماذا المدفوعات المحمية لوكلاء الذكاء الاصطناعي؟

بالنسبة إلى وكلاء الذكاء الاصطناعي الذين يتعاملون مع مسارات عمل حساسة، مثل الأبحاث القانونية والاستفسارات الطبية والتحليلات المالية ومعلومات المنافسين، فإن **كل دفعة علنية تسرّب بيانات وصفية**. وZimppy هو وسيلة الدفع الوحيدة عبر MPP التي توفر **الخصوصية افتراضيًا**.

### جدول مقارنة الخصوصية

| الخاصية | السلاسل العامة (USDC، ETH) | مدفوعات Zimppy المحمية | مدفوعات Zimppy الشفافة |
|---|---|---|---|
| **المرسل** | ظاهر | مشفّر | ظاهر |
| **المستلم** | ظاهر | مشفّر | لكل تحدٍ (غير قابل للربط) |
| **المبلغ** | ظاهر | مشفّر | ظاهر |
| **المذكرة** | ظاهرة | مشفّرة | لا ينطبق |
| **الحماية من إعادة التشغيل** | لا توجد | ربط المذكرة | عنوان T لكل تحدٍ |
| **نمط استخدام الخدمة** | قابل للربط | خاص | غير قابل للربط (عنوان جديد) |

### حل مشكلة زمن الانتظار باستخدام الجلسات

> *«لكن كتل Zcash ما زالت تستغرق 25 ثانية (75 ثانية قبل NU7).»*

**الجلسات تحل هذه المشكلة.** يحدث الانتظار على السلسلة **مرة واحدة فقط** عند الإيداع. وكل طلب لاحق فوري.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~25s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**ادفع مرة، واستدعِ الخدمة فورًا، واسترد الباقي.** زمن الانتظار لكل طلب يساوي صفرًا.

---

## بروتوكول الدفع الآلي (MPP)

**بروتوكول الدفع الآلي (MPP)** بروتوكول معياري يتيح لوكلاء البرمجيات المستقلين (وكلاء الذكاء الاصطناعي والروبوتات والبرامج النصية) اكتشاف متطلبات الدفع للوصول إلى واجهات API والتفاوض بشأنها واستيفاءها، كل ذلك من دون تدخل بشري.

### كيف يندمج MPP مع واجهات API

يتبع MPP تدفق HTTP **402 Payment Required**:

1. **يطلب الوكيل** موردًا من نقطة نهاية لواجهة API مدفوعة.
2. **يرد الخادم** بـ `402 Payment Required` وتحدٍّ موقّع (المبلغ والمستلم والمذكرة).
3. **يدفع الوكيل** باستخدام وسيلة دفع متوافقة (مثل Zcash المحمية من Zimppy).
4. **يعيد الوكيل المحاولة** مع الطلب مرفقًا به `Authorization: Payment {txid}`.
5. **يتحقق الخادم** من الدفع تشفيريًا (فك تشفير IVK الخاص بـ Orchard، والتحقق من المبلغ والمذكرة).
6. **يرد الخادم** بـ `200 OK` مع ترويسة `Payment-Receipt`.

### التوافق مع المواصفات

- توقيع التحديات باستخدام **HMAC-SHA256**
- استجابات أخطاء منظّمة وفق **RFC 9457**
- نقطة النهاية **`/.well-known/payment`** لاكتشاف وسائل الدفع تلقائيًا
- **Orchard IVK** (Incoming Viewing Key) للتحقق من الدفع على الخادم من دون كشف مفاتيح الإنفاق

---

## كيف يعمل Zimppy

### الجلسات (موصى بها)

الجلسات هي نمط التفاعل الأساسي. يودع الوكيل رصيدًا على السلسلة مرة واحدة، ويتلقى رمز حامل، ويستخدمه لكل الطلبات اللاحقة بزمن انتظار معدوم.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**الأفضل لـ:** استدعاءات API عالية التكرار، واستدلال LLM، واستعلامات البيانات المتكررة.

---

### البث

محتوى يُقدّم عبر **Server-Sent Events (SSE)** ويُحاسب عليه بحسب كل رمز. يخصم الخادم من رصيد الجلسة مقابل كل كلمة أو رمز يتم بثه.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**الأفضل لـ:** استجابات البث من LLM، وموجزات البيانات الآنية، وأدوات الذكاء الاصطناعي التي تحاسب بحسب الرمز.

---

### الدفع

دفعة محمية واحدة لكل طلب. يُنفّذ تدفق HTTP 402 كاملًا لكل استدعاء. يناسب الطلبات المتباعدة أو عالية القيمة.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**الأفضل لـ:** الطلبات المنفردة عالية القيمة، واستدعاءات API غير المتكررة، ونقاط نهاية البيانات المميزة.

---

## حالات الاستخدام والأمثلة

### 1. وكيل ذكاء اصطناعي

يستعلم وكيل ذكاء اصطناعي قانوني من قاعدة بيانات مدفوعة لأحكام المحاكم. وباستخدام جلسات Zimppy المحمية، لا تظهر على السلسلة هوية مكتب المحاماة ولا الاستعلامات المحددة، ما يحمي سرية العلاقة بين المحامي وموكله على مستوى البنية التحتية.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. وكيل ذكاء اصطناعي لمسار عمل الاستفسارات الطبية

يستعلم وكيل تشخيص طبي من قواعد بيانات سريرية متعددة. وتضمن المدفوعات المحمية عدم إمكانية ربط أنماط استفسارات المرضى عبر مقدمي الخدمات.

### 3. وكيل للتحليل المالي

يدفع وكيل تداول خوارزمي مقابل واجهات API لبيانات السوق الآنية. وتستخدم المدفوعات الشفافة عناوين T جديدة لكل تحدٍ، ما يمنع ربط أنماط الاستخدام عبر موردي البيانات.

### 4. خادم أدوات MCP، وأدوات ذكاء اصطناعي مدفوعة

يتيح خادم MCP (بروتوكول سياق النموذج) أدوات ذكاء اصطناعي مدفوعة. ويؤدي كل استدعاء لأداة إلى دفعة عبر Zimppy، ما يتيح إنشاء سوق لقدرات الذكاء الاصطناعي المدفوعة.

### 5. ملخّص LLM، الدفع بحسب الرمز

تفرض خدمة تلخيص LLM رسومًا على الوكلاء بحسب كل رمز ناتج عبر البث باستخدام SSE، مع خصم الرصيد تلقائيًا ورد الرصيد المدفوع مقدمًا غير المستخدم.

---

## التثبيت

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

## إعداد محفظة Zimppy

توفر واجهة Zimppy CLI إمكانات محفظة كاملة. تتوفر جميع الأوامر عبر `npx zimppy`.

### الخطوة 1 : إنشاء محفظة

```bash
npx zimppy wallet create
```

ينشئ مفاتيح تشفير ويعرض **عبارة الاسترداد**. خزّنها في مكان آمن، إذ لا يمكن استعادتها إذا فُقدت.

### الخطوة 2 : التحقق من العنوان والرصيد

```bash
npx zimppy wallet whoami
```

يعرض **العنوان الموحّد (UA)** و**عنوان T** والرصيد الحالي والشبكة النشطة.

```bash
npx zimppy wallet balance --all
```

يعرض تفاصيل الرصيد لكل حساب عبر جميع حسابات ZIP-32.

### الخطوة 3 : تمويل المحفظة

أرسل ZEC إلى عنوانك الموحّد من أي محفظة أو منصة تداول متوافقة مع Zcash. تذهب الإيداعات المحمية مباشرةً إلى حسابك Orchard.

### الخطوة 4 : إرسال الأموال وحمايتها

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

### الخطوة 5 : إجراء طلب دفع تلقائي

```bash
npx zimppy request <url>
```

يتولى تلقائيًا تدفق 402 -> الدفع -> إعادة المحاولة كاملًا. وتُفتح الجلسات وتُدار بسلاسة.

---

## دمج Zimppy - TypeScript SDK

### TypeScript الخادم - محمي

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

**النقاط الرئيسية:**
- يحمّل `zcash({ wallet: 'server' })` محفظة الخادم المحمية
- يتولى `mppx.charge()` دورة حياة التحدي والتحقق الكاملة لـ 402
- يرفق `result.withReceipt()` إيصال الدفع التشفيري بالاستجابة

---

### TypeScript الخادم - شفاف

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

ينشئ كل تحدٍ **عنوان T جديدًا**، ما يجعل طلبات الدفع غير قابلة للربط عبر الجلسات.

---

### TypeScript العميل

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

يعترض العميل استجابات `402`، ويفتح جلسة تلقائيًا، ثم يعيد الطلب؛ ولا يتطلب الكود المستدعي أي منطق خاص بالدفع.

---

## دمج Zimppy - Rust SDK

### Rust الخادم (Axum)

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

**النقاط الرئيسية:**
- `MppCharge<Price>` مستخرج Axum يتحقق من الدفع قبل تشغيل معالج الطلب
- يغلّف `WithReceipt` الاستجابة بإيصال دفع تشفيري
- يحدد `ChargeConfig` منطق التسعير، ويمكن أن يكون ديناميكيًا وفقًا لمعاملات الطلب

---

### Rust العميل

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

يوسّع `send_with_payment` أي عميل HTTP بإضافة معالجة 402 تلقائية وإدارة الجلسات واستيفاء الدفع باستخدام Zcash.

---

## مرجع CLI

| الأمر | الوصف |
|---|---|
| `npx zimppy wallet create` | إنشاء المفاتيح وعرض عبارة الاسترداد |
| `npx zimppy wallet whoami` | عرض العنوان (UA + عنوان T) والرصيد والشبكة |
| `npx zimppy wallet balance --all` | تفاصيل الرصيد لكل حساب |
| `npx zimppy wallet send <addr> <zat>` | إرسال ZEC محمي أو شفاف |
| `npx zimppy wallet transfer <from> <to> <zat>` | تحويل داخلي بين الحسابات |
| `npx zimppy wallet shield` | نقل الأموال الشفافة إلى Orchard (محمي) |
| `npx zimppy wallet use <name>` | تبديل هوية المحفظة النشطة |
| `npx zimppy request <url>` | تنفيذ طلب 402 -> الدفع -> إعادة المحاولة تلقائيًا |

---

## الميزات الرئيسية

### محافظ مصممة للوكلاء

صُممت محافظ Zimppy للاستخدام البرمجي من وكلاء الذكاء الاصطناعي، لا لإضافات المتصفح التي يديرها البشر. تُدار المفاتيح عبر CLI أو حزم تطوير البرمجيات، ويمكن تدوير الحسابات عبر **اشتقاق حسابات ZIP-32**، وتدعم المحفظة تدفقات دفع مؤتمتة بالكامل من دون موافقة بشرية على كل معاملة.

### دعم وكلاء متعددين

يمكن لوكلاء متعددين العمل من المحفظة نفسها باستخدام **تدوير حسابات ZIP-32**؛ إذ يحصل كل وكيل على حساب خاص به مع تتبع مستقل للرصيد، وإمكانية التحويل بين الحسابات، وإعداد تقارير الرصيد لكل حساب. وهذا يتيح إدارة أسطول من الوكلاء عبر بنية محفظة واحدة.

### معاملات Zcash محمية بالكامل (Orchard)

تستخدم المدفوعات المحمية بروتوكول **Orchard** الخاص بـ Zcash، وهو مجمّع المدفوعات المحمية الذي قدّمه NU5. ويتحقق الخادم من المدفوعات باستخدام **Incoming Viewing Key (IVK)**، الذي يمكنه فك تشفير الـ notes المستلمة من دون كشف مفتاح الإنفاق. وتُمنع هجمات إعادة التشغيل عبر **ربط المذكرة**؛ إذ يتضمن كل تحدٍ مذكرة `zimppy:{challenge_id}` فريدة يجري التحقق منها تشفيريًا.

### الجلسات، زمن انتظار معدوم لكل طلب

تفصل بنية الجلسات انتظار تأكيد المعاملة على السلسلة عن زمن الانتظار لكل طلب. بعد إيداع واحد (~25 ثانية منذ NU7)، تُخدم جميع الطلبات اللاحقة باستخدام رمز حامل فورًا، من دون أي تفاعل مع سلسلة الكتل حتى إغلاق الجلسة.

### البث، الدفع بحسب الرمز

يتيح دعم **SSE (Server-Sent Events)** الأصلي تقديم محتوى محسوب بحسب كل رمز. وهو مثالي لواجهات API لاستدلال LLM، حيث يختلف طول الناتج ويجب أن تعكس الفوترة الاستهلاك الفعلي.

### التوافق مع المواصفات

- تمنع التحديات الموقعة باستخدام **HMAC-SHA256** تزويرها
- تنسيق أخطاء منظّم وفق **RFC 9457** للتعامل البيني مع الأخطاء
- **`/.well-known/payment`** لاكتشاف وسائل الدفع تلقائيًا من أي وكيل متوافق مع MPP

---

## البنية

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

### مسؤوليات المكوّنات

**`zimppy-core`** - النواة التشفيرية. تتولى فك تشفير notes Orchard باستخدام IVK الخاص بالخادم، وتحليل المذكرة، ومنطق الحماية من إعادة التشغيل، والتحقق من التحديات. كُتبت بلغة Rust لتحقيق الأداء والصحة.

**`zimppy-wallet`** - محفظة Zcash أصلية مدعومة بـ `zingolib`. تدير المفاتيح والحسابات والأرصدة المحمية والشفافة وإرسال المعاملات.

**`zimppy-rs`** - حزمة تطوير البرمجيات Rust. توفر السمات `ChargeMethod` و`SessionMethod` و`PaymentProvider`، بالإضافة إلى مستخرجات Axum (`MppCharge` و`WithReceipt`) لتسهيل دمجها في الخوادم.

**`zimppy-napi`** - روابط NAPI-RS التي تتيح الوصول إلى نواة Rust من Node.js، ما يمكّن حزمة تطوير البرمجيات TypeScript من استخدام المحرك التشفيري نفسه من دون إعادة تنفيذ بدائيات Zcash في JavaScript.

**`zimppy-ts`** - حزمة تطوير البرمجيات TypeScript. تغلّف روابط NAPI بواجهات برمجية اصطلاحية تستخدم async/await لتدفقات الدفع والجلسات والبث عبر SSE.

**`zimppy-cli`** - محفظة وأداة طلبات تعمل عبر سطر الأوامر. تدعم الدفع التلقائي (402 -> الدفع -> إعادة المحاولة) وإدارة الجلسات وجميع عمليات المحفظة.

---

## أمثلة وعروض توضيحية

| المثال | الوصف |
|---|---|
| `examples/fortune-teller/` | عروض توضيحية للدفع والجلسات والبث - خادم وعميل Rust |
| `examples/llm-summarizer/` | عرض توضيحي لبث LLM مع الدفع بحسب الرمز |
| `examples/mcp-server/` | خادم أدوات MCP يضم أدوات ذكاء اصطناعي مدفوعة |
| `examples/ts-server/` | تطبيق مرجعي لخادم MPP من TypeScript |

---

## ما الذي يتضمنه - ملخص الميزات

| الميزة | الوصف |
|---|---|
| **الجلسات** | إيداع مرة واحدة، وطلبات فورية برمز حامل، واسترداد الرصيد عند الإغلاق |
| **البث** | محتوى محسوب بحسب الرمز عبر SSE |
| **الدفع** | دفعة محمية أو شفافة لكل طلب HTTP (تدفق 402) |
| **المدفوعات الشفافة** | عناوين T مع الحماية من إعادة التشغيل لكل تحدٍ + أمر الحماية |
| **تعدد الحسابات** | تدوير حسابات ZIP-32، والتحويلات بين الحسابات، وأرصدة لكل حساب |
| **محفظة CLI** | إرسال، حماية، تحويل، عرض الرصيد --all، whoami، والدفع التلقائي |
| **حزمتا تطوير برمجيات** | TypeScript وRust |
| **متوافق مع المواصفات** | تحديات HMAC-SHA256، وأخطاء RFC 9457، واكتشاف `/.well-known/payment` |

---

*لمزيد من المعلومات، تفضل بزيارة [zimppy.xyz](https://zimppy.xyz)*

---

## صفحات ذات صلة

- [المحافظ](/using-zcash/wallets) — محافظ Zcash التي تدعم المعاملات المحمية
- [مجمّعات المدفوعات المحمية](/using-zcash/shielded-pools) — كيف تحمي معاملات Orchard المحمية بيانات الدفع
- [معالجات الدفع](/using-zcash/payment-processors) — طرق أخرى لقبول مدفوعات Zcash
- [Zcash الأصول المحمية](/zcash-tech/zcash-shielded-assets) — ZSAs ومستقبل قابلية برمجة Zcash
- [مشاريع المجتمع](/zcash-community/community-projects) — مزيد من مشاريع منظومة Zcash
