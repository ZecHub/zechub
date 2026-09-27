<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## الخلاصة

- **Zimppy** هي بنية تحتية للمدفوعات تضع الخصوصية أولًا لوكلاء الذكاء الاصطناعي، باستخدام Machine Payment Protocol (MPP) الخاص بـ Zcash
- **أودِع مرة واحدة** على السلسلة (~75 ثانية)، ثم نفّذ **عددًا غير محدود من الطلبات الفورية** دون أي تفاعل مع blockchain لكل طلب
- تدعم مدفوعات **Zcash المحمية بالكامل (Orchard)** — يُشفَّر المرسل والمستلم والمبلغ والمذكرة جميعًا
- تعمل مع حِزم SDK لـ **TypeScript وRust** لتكامل سهل ضمن مسارات الذكاء الاصطناعي وخوادم API
- مثالية لـ **واجهات API الخاصة بـ LLM، وأسواق البيانات، وخوادم أدوات MCP**، وأي حالة استخدام لمدفوعات M2M

---

> **Zimppy** هي طريقة الدفع عبر Machine Payment Protocol (MPP) لـ Zcash، وتدعم المدفوعات المحمية والشفافة معًا. أودِع مرة واحدة على السلسلة، ثم نفّذ عددًا غير محدود من طلبات الحامل الفورية دون تفاعل مع السلسلة لكل طلب.

---

## جدول المحتويات

1. [ما هو Zimppy.xyz؟](#what-is-zimppyxyz)
2. [لماذا المدفوعات المحمية لوكلاء الذكاء الاصطناعي؟](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [كيف يعمل Zimppy](#how-zimppy-works)
   - [الجلسات (موصى بها)](#sessions-recommended)
   - [البث](#streaming)
   - [التحصيل](#charge)
5. [حالات الاستخدام والأمثلة](#use-cases--examples)
6. [التثبيت](#installation)
7. [إعداد محفظة Zimppy](#setting-up-the-zimppy-wallet)
8. [دمج Zimppy](#integrating-zimppy--typescript-sdk)
   - [الخادم (محمي)](#typescript-server--shielded)
   - [الخادم (شفاف)](#typescript-server--transparent)
   - [العميل](#typescript-client)
9. [دمج Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [خادم Rust (Axum)](#rust-server-axum)
   - [عميل Rust](#rust-client)
10. [مرجع CLI](#cli-reference)
11. [الميزات الرئيسية](#key-features)
12. [البنية المعمارية](#architecture)
13. [الأمثلة والعروض التوضيحية](#examples--demos)

---

## ما هو Zimppy.xyz؟

**Zimppy.xyz** هي بنية تحتية للمدفوعات تضع الخصوصية أولًا، صُممت خصيصًا لوكلاء الذكاء الاصطناعي وسير العمل المؤتمت بين الآلات (M2M). وهي تطبّق **Machine Payment Protocol (MPP)** باستخدام **Zcash** عملةً أساسية لها، ما يتيح أنماط دفع محمية (خاصة بالكامل) وشفافة.

بخلاف أنظمة الدفع التقليدية القائمة على blockchain، حيث تظهر كل معاملة علنًا على السلسلة، صُممت Zimppy حول بنية معمارية قائمة على الجلسات تلغي زمن الاستجابة لكل طلب مع الحفاظ على الخصوصية التشفيرية. وهذا يجعلها مناسبة على نحو فريد لوكلاء الذكاء الاصطناعي الذين يحتاجون إلى الدفع برمجيًا مقابل واجهات API أو البيانات أو الحوسبة أو أدوات الذكاء الاصطناعي، من دون كشف البيانات الوصفية السلوكية.

### الخصائص الأساسية

- **أودِع مرة واحدة** على السلسلة (~75 ثانية لتأكيد Zcash)
- **طلبات فورية غير محدودة** بعد فتح الجلسة، دون أي تفاعل مع السلسلة لكل طلب
- **المدفوعات المحمية** تشفّر المرسل والمستلم والمبلغ والمذكرة باستخدام بروتوكول Orchard الخاص بـ Zcash
- **المدفوعات الشفافة** تستخدم عناوين T لكل تحدٍّ لمنع إعادة التشغيل دون خصوصية كاملة
- **متوافقة مع المواصفات**، تحديات HMAC-SHA256، وأخطاء RFC 9457، واكتشاف `/.well-known/payment`

---

## لماذا المدفوعات المحمية لوكلاء الذكاء الاصطناعي؟

بالنسبة إلى وكلاء الذكاء الاصطناعي الذين يتعاملون مع سير عمل حساس، أو أبحاث قانونية، أو استعلامات طبية، أو تحليل مالي، أو استخبارات تنافسية، فإن **كل دفعة علنية تُعد تسرّبًا للبيانات الوصفية**. Zimppy هي طريقة الدفع الوحيدة عبر MPP التي تكون **خاصة افتراضيًا**.

### جدول مقارنة الخصوصية

| الخاصية | السلاسل العامة (USDC، ETH) | Zimppy المحمي | Zimppy الشفاف |
|---|---|---|---|
| **المرسل** | مرئي | مشفّر | مرئي |
| **المستلم** | مرئي | مشفّر | لكل تحدٍّ (غير قابل للربط) |
| **المبلغ** | مرئي | مشفّر | مرئي |
| **المذكرة** | مرئية | مشفّرة | غير متاح |
| **الحماية من إعادة التشغيل** | لا توجد | ربط المذكرة | عنوان T لكل تحدٍّ |
| **نمط استخدام الخدمة** | قابل للربط | خاص | غير قابل للربط (عنوان جديد) |

### مشكلة زمن الاستجابة، حلّتها الجلسات

> *"لكن لدى Zcash أزمنة كتل تبلغ 75 ثانية."*

**الجلسات تحل هذا الأمر.** يحدث انتظار السلسلة **مرة واحدة فقط** عند الإيداع. وكل طلب لاحق فوري.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**ادفع مرة واحدة، واستدعِ فورًا، واستردّ الباقي.** زمن الاستجابة لكل طلب يساوي صفرًا.

---

## Machine Payment Protocol (MPP)

إن **Machine Payment Protocol (MPP)** بروتوكول موحّد يتيح لوكلاء البرمجيات المستقلين (وكلاء الذكاء الاصطناعي، والبوتات، والبرامج النصية) اكتشاف متطلبات الدفع والتفاوض عليها والوفاء بها للوصول إلى API، وكل ذلك من دون تدخل بشري.

### كيفية تكامل MPP مع واجهات API

يتبع MPP تدفق HTTP **402 Payment Required**:

1. **يطلب الوكيل** موردًا من نقطة نهاية API مدفوعة.
2. **يستجيب الخادم** بـ `402 Payment Required` مع تحدٍّ موقّع (المبلغ، والمستلم، والمذكرة).
3. **يدفع الوكيل** باستخدام طريقة دفع متوافقة (مثل Zcash المحمي عبر Zimppy).
4. **يعيد الوكيل المحاولة** مع `Authorization: Payment {txid}`.
5. **يتحقق الخادم** من الدفع تشفيريًا (فك تشفير Orchard IVK، والتحقق من المبلغ والمذكرة).
6. **يستجيب الخادم** بـ `200 OK` مع ترويسة `Payment-Receipt`.

### التوافق مع المواصفات

- توقيع التحديات باستخدام **HMAC-SHA256**
- استجابات أخطاء منظمة وفق **RFC 9457**
- نقطة نهاية **`/.well-known/payment`** لاكتشاف طريقة الدفع تلقائيًا
- **Orchard IVK** (Incoming Viewing Key) للتحقق من الدفع من جانب الخادم دون كشف مفاتيح الإنفاق

---

## كيف يعمل Zimppy

### الجلسات (موصى بها)

الجلسات هي نمط التفاعل الأساسي. يودع الوكيل رصيدًا على السلسلة مرة واحدة، ويتلقى رمز حامل، ويستخدمه لجميع الطلبات اللاحقة بزمن استجابة صفري.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**الأفضل لـ:** استدعاءات API عالية التردد، واستدلال LLM، واستعلامات البيانات المتكررة.

---

### البث

محتوى محسوب لكل رمز يُسلَّم عبر **Server-Sent Events (SSE)**. يخصم الخادم من رصيد الجلسة لكل كلمة أو رمز يتم بثه.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**الأفضل لـ:** استجابات بث LLM، وتغذيات البيانات الفورية، وأدوات الذكاء الاصطناعي المحسوبة لكل رمز.

---

### التحصيل

دفعة محمية واحدة لكل طلب. يُنفّذ تدفق HTTP 402 الكامل لكل استدعاء. وهو مناسب عندما تكون الطلبات غير متكررة أو عالية القيمة.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**الأفضل لـ:** الطلبات المفردة عالية القيمة، واستدعاءات API غير المتكررة، ونقاط نهاية البيانات المميزة.

---

## حالات الاستخدام والأمثلة

### 1. وكيل ذكاء اصطناعي

يستعلم وكيل ذكاء اصطناعي قانوني عن قاعدة بيانات مدفوعة للأحكام القضائية. وباستخدام جلسات Zimppy المحمية، لا تظهر هوية مكتب المحاماة ولا الاستعلامات المحددة على السلسلة، مما يحمي امتياز المحامي والموكل على مستوى البنية التحتية.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. وكيل ذكاء اصطناعي لمسار الاستعلامات الطبية

يستعلم وكيل تشخيص طبي عن عدة قواعد بيانات سريرية. تضمن المدفوعات المحمية عدم إمكانية ربط أنماط استعلامات المرضى عبر المزوّدين.

### 3. وكيل التحليل المالي

يدفع وكيل تداول خوارزمي مقابل واجهات API لبيانات السوق الفورية. تستخدم المدفوعات الشفافة عناوين T جديدة لكل تحدٍّ، ما يمنع ارتباط نمط الاستخدام عبر مورّدي البيانات.

### 4. خادم أدوات MCP وأدوات الذكاء الاصطناعي المدفوعة

يكشف خادم MCP (Model Context Protocol) عن أدوات ذكاء اصطناعي مدفوعة. يؤدي كل استدعاء لأداة إلى تحصيل عبر Zimppy، ما يتيح سوقًا لقدرات الذكاء الاصطناعي المدرة للدخل.

### 5. مُلخِّص LLM، الدفع لكل رمز

تفرض خدمة تلخيص LLM رسومًا على الوكلاء لكل رمز مُخرَج عبر بث SSE، مع خصم تلقائي من الرصيد واسترداد الرصيد المدفوع مقدمًا غير المستخدم.

---

## التثبيت

### عقدة.js / TypeScript

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

يوفر CLI الخاص بـ Zimppy واجهة محفظة متكاملة. جميع الأوامر متاحة عبر `npx zimppy`.

### الخطوة 1 : إنشاء محفظة

```bash
npx zimppy wallet create
```

يولّد مفاتيح تشفيرية ويعرض **عبارة الاسترداد** الخاصة بك. خزّنها بأمان، إذ لا يمكن استعادتها إذا فُقدت.

### الخطوة 2 : التحقق من عنوانك ورصيدك

```bash
npx zimppy wallet whoami
```

يعرض **Unified Address (UA)** و**عنوان T** والرصيد الحالي والشبكة النشطة.

```bash
npx zimppy wallet balance --all
```

يعرض تفصيل الرصيد لكل حساب عبر جميع حسابات ZIP-32.

### الخطوة 3 : تمويل محفظتك

أرسل ZEC إلى Unified Address الخاص بك من أي محفظة أو منصة تداول متوافقة مع Zcash. تذهب الإيداعات المحمية مباشرة إلى حساب Orchard الخاص بك.

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

### الخطوة 5 : تنفيذ طلب دفع تلقائي

```bash
npx zimppy request <url>
```

يتعامل تلقائيًا مع تدفق 402 -> الدفع -> إعادة المحاولة بالكامل. تُفتح الجلسات وتُدار بشفافية.

---

## دمج Zimppy - TypeScript SDK

### خادم TypeScript - محمي

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
- `zcash({ wallet: 'server' })` يحمّل محفظة الخادم المحمية
- يتعامل `mppx.charge()` مع دورة حياة التحدي/التحقق الكاملة لـ 402
- يرفق `result.withReceipt()` إيصال الدفع التشفيري بالاستجابة

---

### خادم TypeScript - شفاف

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

يولّد كل تحدٍّ **عنوان T جديدًا**، ما يجعل طلبات الدفع غير قابلة للربط عبر الجلسات.

---

### عميل TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

يعترض العميل استجابات `402`، ويفتح جلسة تلقائيًا، ويعيد محاولة الطلب، ولا يتطلب الكود المستدعي أي منطق خاص بالدفع.

---

## دمج Zimppy - Rust SDK

### خادم Rust (Axum)

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
- `MppCharge<Price>` هو مستخرج Axum يتحقق من الدفع قبل تشغيل المعالج
- يغلّف `WithReceipt` الاستجابة بإيصال دفع تشفيري
- يعرّف `ChargeConfig` منطق التسعير، ويمكن أن يكون ديناميكيًا بناءً على معاملات الطلب

---

### عميل Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

يوسّع `send_with_payment` أي عميل HTTP بمعالجة تلقائية لـ 402 وإدارة الجلسات وإتمام مدفوعات Zcash.

---

## مرجع CLI

| الأمر | الوصف |
|---|---|
| `npx zimppy wallet create` | توليد المفاتيح وعرض عبارة الاسترداد |
| `npx zimppy wallet whoami` | عرض العنوان (UA + عنوان T)، والرصيد، والشبكة |
| `npx zimppy wallet balance --all` | تفصيل الرصيد لكل حساب |
| `npx zimppy wallet send <addr> <zat>` | إرسال ZEC محمي أو شفاف |
| `npx zimppy wallet transfer <from> <to> <zat>` | تحويل داخلي بين الحسابات |
| `npx zimppy wallet shield` | نقل الأموال الشفافة إلى Orchard (محمي) |
| `npx zimppy wallet use <name>` | تبديل هوية المحفظة النشطة |
| `npx zimppy request <url>` | طلب تلقائي 402 -> الدفع -> إعادة المحاولة |

---

## الميزات الرئيسية

### محافظ أصلية للوكلاء

صُممت محافظ Zimppy للاستخدام البرمجي من قِبل وكلاء الذكاء الاصطناعي، لا لامتدادات المتصفح التي يديرها البشر. تُدار المفاتيح عبر CLI أو حِزم SDK، ويمكن تدوير الحسابات عبر **اشتقاق حسابات ZIP-32**، وتدعم المحفظة تدفقات دفع مؤتمتة بالكامل دون موافقة بشرية على كل معاملة.

### دعم الوكلاء المتعددين

يمكن لوكلاء متعددين العمل من المحفظة نفسها باستخدام **تدوير حسابات ZIP-32**، إذ يحصل كل وكيل على حسابه الخاص مع تتبع معزول للرصيد، وإمكانية التحويل بين الحسابات، وإعداد تقارير للرصيد لكل حساب. يتيح ذلك إدارة أسطول من وكلاء عديدين من بنية تحتية واحدة للمحفظة.

### معاملات Zcash المحمية بالكامل (Orchard)

تستخدم المدفوعات المحمية **بروتوكول Orchard** الخاص بـ Zcash، وهو أحدث وأشد مجمع محمي أمانًا. يتحقق الخادم من المدفوعات باستخدام **Incoming Viewing Key (IVK)**، الذي يستطيع فك تشفير الملاحظات المستلمة دون كشف مفتاح الإنفاق. ويُمنع هجوم إعادة التشغيل عبر **ربط المذكرة**، حيث يضمّن كل تحدٍّ مذكرة فريدة `zimppy:{challenge_id}` يجري التحقق منها تشفيريًا.

### الجلسات، زمن استجابة صفري لكل طلب

تفصل بنية الجلسات انتظار تأكيد السلسلة عن زمن الاستجابة لكل طلب. بعد إيداع واحد (~75 ثانية)، تُخدَم كل طلبات رمز الحامل اللاحقة فورًا دون تفاعل مع blockchain حتى إغلاق الجلسة.

### البث، الدفع لكل رمز

يتيح الدعم الأصلي لـ **SSE (Server-Sent Events)** محتوى محسوبًا لكل رمز. وهو مثالي لواجهات API الخاصة باستدلال LLM، حيث يكون طول المخرجات متغيرًا وينبغي أن تعكس الفوترة الاستهلاك الفعلي.

### التوافق مع المواصفات

- تمنع تحديات **HMAC-SHA256** الموقعة التزوير
- تنسيق أخطاء منظم وفق **RFC 9457** لمعالجة أخطاء قابلة للتشغيل البيني
- **`/.well-known/payment`** لاكتشاف طريقة الدفع تلقائيًا من قبل أي وكيل متوافق مع MPP

---

## البنية المعمارية

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

### مسؤوليات المكونات

**`zimppy-core`** - النواة التشفيرية. تتعامل مع فك تشفير ملاحظات Orchard باستخدام IVK الخاص بالخادم، وتحليل المذكرات، ومنطق الحماية من إعادة التشغيل، والتحقق من التحديات. مكتوبة بلغة Rust للأداء والصحة.

**`zimppy-wallet`** - محفظة Zcash أصلية مدعومة بـ `zingolib`. تدير المفاتيح والحسابات والأرصدة المحمية/الشفافة وإرسال المعاملات.

**`zimppy-rs`** - حزمة Rust SDK. توفر سمات `ChargeMethod` و`SessionMethod` و`PaymentProvider`، إضافة إلى مستخرجات Axum (`MppCharge` و`WithReceipt`) لدمج سهل في الخادم.

**`zimppy-napi`** - ارتباطات NAPI-RS تكشف نواة Rust إلى عقدة.js، ما يتيح لحزمة TypeScript SDK استخدام المحرك التشفيري نفسه دون إعادة تطبيق بدائيات Zcash بلغة JavaScript.

**`zimppy-ts`** - حزمة TypeScript SDK. تغلّف ارتباطات NAPI بواجهات API اصطلاحية تعتمد async/await لتدفقات التحصيل والجلسات والبث عبر SSE.

**`zimppy-cli`** - أداة المحفظة والطلبات عبر سطر الأوامر. تدعم الدفع التلقائي (402 -> الدفع -> إعادة المحاولة) وإدارة الجلسات وجميع عمليات المحفظة.

---

## الأمثلة والعروض التوضيحية

| المثال | الوصف |
|---|---|
| `examples/fortune-teller/` | عروض توضيحية للتحصيل والجلسات والبث — خادم وعميل Rust |
| `examples/llm-summarizer/` | عرض توضيحي لبث LLM مع الدفع لكل رمز |
| `examples/mcp-server/` | خادم أدوات MCP مزود بأدوات ذكاء اصطناعي مدفوعة |
| `examples/ts-server/` | تطبيق مرجعي لخادم TypeScript MPP |

---

## ما يتضمنه - ملخص الميزات

| الميزة | الوصف |
|---|---|
| **الجلسات** | أودِع مرة واحدة، وطلبات حامل فورية، واسترداد عند الإغلاق |
| **البث** | محتوى محسوب لكل رمز عبر SSE |
| **التحصيل** | دفع محمي أو شفاف لكل طلب HTTP (تدفق 402) |
| **المدفوعات الشفافة** | عناوين T مع منع إعادة التشغيل لكل تحدٍّ + أمر الحماية |
| **الحسابات المتعددة** | تدوير حسابات ZIP-32، وتحويلات بين الحسابات، وأرصدة لكل حساب |
| **محفظة CLI** | إرسال، وحماية، وتحويل، وbalance --all، وwhoami، ودفع تلقائي |
| **حزمتا SDK** | TypeScript وRust |
| **متوافقة مع المواصفات** | تحديات HMAC-SHA256، وأخطاء RFC 9457، واكتشاف `/.well-known/payment` |

---

*لمزيد من المعلومات، زر [zimppy.xyz](https://zimppy.xyz)*

---

## صفحات ذات صلة

- [المحافظ](/using-zcash/wallets) — محافظ Zcash التي تدعم المعاملات المحمية
- [المجمعات المحمية](/using-zcash/shielded-pools) — كيف تحمي معاملات Orchard المحمية بيانات الدفع
- [معالجات الدفع](/using-zcash/payment-processors) — طرق أخرى لقبول مدفوعات Zcash
- [الأصول المحمية لـ Zcash](/zcash-tech/zcash-shielded-assets) — ZSAs ومستقبل قابلية البرمجة في Zcash
- [مشاريع المجتمع](/zcash-community/community-projects) — المزيد من مشاريع منظومة Zcash
