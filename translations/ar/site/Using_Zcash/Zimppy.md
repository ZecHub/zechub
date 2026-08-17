<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# Zimppy.xyz

## الخلاصة

- **Zimppy** هي بنية تحتية للمدفوعات تركّز على الخصوصية أولًا لوكلاء الذكاء الاصطناعي باستخدام Machine Payment Protocol (MPP) الخاصة بـ Zcash
- **أودِع مرة واحدة** على السلسلة (~75 ثانية)، ثم نفّذ **عددًا غير محدود من الطلبات الفورية** دون أي تفاعل مع البلوكشين لكل طلب
- تدعم مدفوعات **Zcash المحمية بالكامل (Orchard)** — حيث يكون المُرسل، والمُستلِم، والمبلغ، والمذكرة كلها مشفّرة
- تعمل مع **حِزم SDK لكل من TypeScript وRust** لسهولة الدمج في مسارات عمل الذكاء الاصطناعي وخوادم API
- مثالية لـ **واجهات LLM API، وأسواق البيانات، وخوادم أدوات MCP**، وأي حالة استخدام لمدفوعات M2M

---

> **Zimppy** هي طريقة الدفع Machine Payment Protocol (MPP) لـ Zcash وتدعم كلًا من المدفوعات المحمية والشفافة. أودِع مرة واحدة على السلسلة، ثم نفّذ عددًا غير محدود من الطلبات الفورية لحامل الرمز دون أي تفاعل مع السلسلة لكل طلب.

---

## جدول المحتويات

1. [ما هو Zimppy.xyz؟](#what-is-zimppyxyz)
2. [لماذا المدفوعات المحمية لوكلاء الذكاء الاصطناعي؟](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [كيف يعمل Zimppy](#how-zimppy-works)
   - [الجلسات (موصى بها)](#sessions-recommended)
   - [البث](#streaming)
   - [الرسوم](#charge)
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
12. [البنية المعمارية](#architecture)
13. [الأمثلة والعروض التوضيحية](#examples--demos)

---

## ما هو Zimppy.xyz؟

**Zimppy.xyz** هي بنية تحتية للمدفوعات تركّز على الخصوصية أولًا، ومصممة خصيصًا لوكلاء الذكاء الاصطناعي ولسير العمل الآلي من آلة إلى آلة (M2M). وهي تطبّق **Machine Payment Protocol (MPP)** باستخدام **Zcash** كعملة أساسية، مما يتيح وضعي الدفع المحمي (الخاص بالكامل) والشفاف.

على عكس أنظمة الدفع التقليدية المعتمدة على البلوكشين، حيث تكون كل معاملة مرئية علنًا على السلسلة، تم تصميم Zimppy حول بنية قائمة على الجلسات تُلغي زمن التأخير لكل طلب مع الحفاظ على الخصوصية التشفيرية. وهذا ما يجعلها مناسبة بشكل فريد لوكلاء الذكاء الاصطناعي الذين يحتاجون إلى الدفع مقابل واجهات API أو البيانات أو القدرة الحاسوبية أو أدوات الذكاء الاصطناعي برمجيًا، من دون تسريب البيانات الوصفية السلوكية.

### الخصائص الأساسية

- **إيداع مرة واحدة** على السلسلة (~75 ثانية لتأكيد Zcash)
- **طلبات فورية غير محدودة** بعد فتح الجلسة، دون أي تفاعل مع السلسلة لكل طلب
- **المدفوعات المحمية** تُشفّر المُرسل، والمُستلِم، والمبلغ، والمذكرة باستخدام بروتوكول Orchard الخاص بـ Zcash
- **المدفوعات الشفافة** تستخدم عناوين T لكل تحدٍّ لمنع إعادة التشغيل دون خصوصية كاملة
- **متوافقة مع المواصفات**، تحديات HMAC-SHA256، أخطاء RFC 9457، واكتشاف `/.well-known/payment`

---

## لماذا المدفوعات المحمية لوكلاء الذكاء الاصطناعي؟

بالنسبة لوكلاء الذكاء الاصطناعي الذين يتعاملون مع سير عمل حساس، أو أبحاث قانونية، أو استفسارات طبية، أو تحليلات مالية، أو استخبارات تنافسية، فإن **كل دفعة عامة هي تسرّب للبيانات الوصفية**. Zimppy هي طريقة الدفع الوحيدة ضمن MPP التي تكون **خاصة افتراضيًا**.

### جدول مقارنة الخصوصية

| الخاصية | السلاسل العامة (USDC, ETH) | Zimppy المحمي | Zimppy الشفاف |
|---|---|---|---|
| **المُرسل** | مرئي | مشفّر | مرئي |
| **المُستلِم** | مرئي | مشفّر | لكل تحدٍّ (غير قابل للربط) |
| **المبلغ** | مرئي | مشفّر | مرئي |
| **المذكرة** | مرئية | مشفّرة | غير متاح |
| **الحماية من إعادة التشغيل** | لا يوجد | ربط بالمذكرة | عنوان T لكل تحدٍّ |
| **نمط استخدام الخدمة** | قابل للربط | خاص | غير قابل للربط (عنوان جديد) |

### مشكلة زمن التأخير، وتحلّها الجلسات

> *"لكن Zcash لديها أزمنة كتل تبلغ 75 ثانية."*

**الجلسات تحل هذه المشكلة.** الانتظار على السلسلة يحدث **مرة واحدة فقط** عند الإيداع. وكل طلب لاحق يكون فوريًا.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**ادفع مرة واحدة، واستدعِ فورًا، واستعد الباقي.** زمن التأخير لكل طلب يساوي صفرًا.

---

## Machine Payment Protocol (MPP)

إن **Machine Payment Protocol (MPP)** هو بروتوكول موحّد يتيح لوكلاء البرمجيات المستقلين (وكلاء الذكاء الاصطناعي، والروبوتات، والسكريبتات) اكتشاف متطلبات الدفع والتفاوض عليها وتنفيذها للوصول إلى واجهات API، وكل ذلك من دون تدخل بشري.

### كيف يندمج MPP مع واجهات API

يتبع MPP تدفق HTTP **402 Payment Required**:

1. **يطلب الوكيل** موردًا من نقطة نهاية API مدفوعة.
2. **يرد الخادم** بـ `402 Payment Required` + تحدٍّ موقّع (المبلغ، المستلم، المذكرة).
3. **يدفع الوكيل** باستخدام طريقة دفع متوافقة (مثل Zimppy shielded Zcash).
4. **يعيد الوكيل المحاولة** مع `Authorization: Payment {txid}`.
5. **يتحقق الخادم** من الدفع تشفيريًا (فك تشفير Orchard IVK، والتحقق من المبلغ + المذكرة).
6. **يرد الخادم** بـ `200 OK` + ترويسة `Payment-Receipt`.
### الامتثال للمواصفات

- توقيع التحدي باستخدام **HMAC-SHA256**
- استجابات أخطاء منظَّمة وفق **RFC 9457**
- نقطة النهاية **`/.well-known/payment`** لاكتشاف طريقة الدفع تلقائيًا
- **Orchard IVK** ‏(**Incoming Viewing Key**) للتحقق من الدفع على جانب الخادم دون كشف مفاتيح الإنفاق

---

## كيف يعمل Zimppy

### الجلسات (موصى بها)

الجلسات هي نمط التفاعل الأساسي. يودِع الوكيل رصيدًا على السلسلة مرة واحدة، ويتلقى bearer token، ويستخدمه في جميع الطلبات اللاحقة بزمن وصول صفري.

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

محتوى محسوب الدفع لكل token يُسلَّم عبر **الأحداث المرسلة من الخادم (SSE)**. يخصم الخادم من رصيد الجلسة مقابل كل كلمة أو token يتم بثه.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**الأفضل لـ:** استجابات LLM المتدفقة، وتدفّقات البيانات اللحظية، وأدوات الذكاء الاصطناعي بنظام الدفع لكل token.

---

### Charge

دفعة محمية واحدة لكل طلب. يُنفَّذ تدفّق HTTP 402 الكامل لكل استدعاء. مناسب عندما تكون الطلبات غير متكررة أو عالية القيمة.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**الأفضل لـ:** الطلبات العالية القيمة لمرة واحدة، واستدعاءات API غير المتكررة، ونقاط نهاية البيانات المتميزة.

---

## حالات الاستخدام والأمثلة

### 1. وكيل ذكاء اصطناعي

يستعلم وكيل ذكاء اصطناعي قانوني من قاعدة بيانات مدفوعة للأحكام القضائية. باستخدام جلسات Zimppy المحمية، لا تكون هوية مكتب المحاماة ولا الاستعلامات المحددة مرئية على السلسلة، مما يحمي امتياز السرية بين المحامي والموكل على مستوى البنية التحتية.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. وكيل ذكاء اصطناعي لخط أنابيب الاستعلامات الطبية

يستعلم وكيل تشخيص طبي من عدة قواعد بيانات سريرية. تضمن المدفوعات المحمية عدم إمكانية ربط أنماط استعلامات المرضى عبر مزودين مختلفين.

### 3. وكيل التحليل المالي

يدفع وكيل تداول خوارزمي مقابل واجهات API لبيانات السوق في الوقت الفعلي. تستخدم المدفوعات الشفافة عناوين T جديدة لكل challenge، مما يمنع ربط أنماط الاستخدام بين موردي البيانات.

### 4. خادم أدوات MCP، أدوات ذكاء اصطناعي مدفوعة

يكشف خادم MCP ‏(Model Context Protocol) عن أدوات ذكاء اصطناعي مدفوعة. يؤدي كل استدعاء أداة إلى تنفيذ charge عبر Zimppy، مما يتيح سوقًا لقدرات الذكاء الاصطناعي المُربَحة.

### 5. أداة تلخيص LLM، الدفع لكل token

تفرض خدمة تلخيص LLM رسومًا على الوكلاء مقابل كل token ناتج عبر بث SSE، مع خصم تلقائي من الرصيد واسترداد الرصيد المدفوع مقدمًا غير المستخدم.

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

يوفر CLI الخاص بـ Zimppy واجهة محفظة كاملة. جميع الأوامر متاحة عبر `npx zimppy`.

### الخطوة 1 : إنشاء محفظة

```bash
npx zimppy wallet create
```

يولِّد مفاتيح تشفيرية ويعرض **عبارة الاسترداد** الخاصة بك. خزّنها بأمان، إذ لا يمكن استعادتها إذا فُقدت.

### الخطوة 2 : التحقق من عنوانك ورصيدك

```bash
npx zimppy wallet whoami
```

يعرض **Unified Address (UA)** و**T-address** والرصيد الحالي والشبكة النشطة.

```bash
npx zimppy wallet balance --all
```

يعرض تفصيلًا للرصيد لكل حساب عبر جميع حسابات ZIP-32.

### الخطوة 3 : تمويل محفظتك

أرسل ZEC إلى Unified Address الخاص بك من أي محفظة أو منصة تداول متوافقة مع Zcash. تذهب الإيداعات المحمية مباشرة إلى حساب Orchard الخاص بك.

### الخطوة 4 : إرسال الأموال وتحويلها إلى حماية

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

يتعامل تلقائيًا مع تدفق 402 -> pay -> retry الكامل. يتم فتح الجلسات وإدارتها بشفافية.

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

**النقاط الأساسية:**
- `zcash({ wallet: 'server' })` يحمّل المحفظة المحمية الخاصة بالخادم
- `mppx.charge()` يتعامل مع دورة حياة التحدي/التحقق الكاملة لـ 402
- `result.withReceipt()` يرفق إيصال الدفع التشفيري بالاستجابة

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

ينشئ كل تحدٍّ **عنوان T جديدًا**، مما يجعل طلبات الدفع غير قابلة للربط عبر الجلسات.

---

### عميل TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

يعترض العميل استجابات `402`، ويفتح جلسة تلقائيًا، ثم يعيد محاولة الطلب - ولا يتطلب الكود المستدعي أي منطق خاص بالدفع.

---

## دمج Zimppy - حزمة Rust SDK

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

**النقاط الأساسية:**
- `MppCharge<Price>` هو مستخرج Axum يتحقق من الدفع قبل تشغيل المعالج
- `WithReceipt` يغلّف الاستجابة بإيصال دفع مشفّر
- يعرّف `ChargeConfig` منطق التسعير - ويمكن أن يكون ديناميكيًا بناءً على معلمات الطلب

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

يوسّع `send_with_payment` أي عميل HTTP ليتعامل تلقائيًا مع `402`، وإدارة الجلسات، وتنفيذ مدفوعات Zcash.

---

## مرجع CLI

| الأمر | الوصف |
|---|---|
| `npx zimppy wallet create` | إنشاء المفاتيح وعرض عبارة الاسترداد |
| `npx zimppy wallet whoami` | عرض العنوان (UA + T-addr)، والرصيد، والشبكة |
| `npx zimppy wallet balance --all` | تفصيل الرصيد لكل حساب |
| `npx zimppy wallet send <addr> <zat>` | إرسال ZEC محمي أو شفاف |
| `npx zimppy wallet transfer <from> <to> <zat>` | تحويل داخلي بين الحسابات |
| `npx zimppy wallet shield` | نقل الأموال الشفافة إلى Orchard (محمي) |
| `npx zimppy wallet use <name>` | تبديل هوية المحفظة النشطة |
| `npx zimppy request <url>` | تلقائيًا 402 -> دفع -> إعادة محاولة الطلب |

---

## الميزات الرئيسية

### محافظ أصلية للوكلاء

صُممت محافظ Zimppy للاستخدام البرمجي بواسطة وكلاء الذكاء الاصطناعي - وليس كإضافات متصفح يديرها البشر. تُدار المفاتيح عبر CLI أو حِزم SDK، ويمكن تدوير الحسابات عبر **اشتقاق حسابات ZIP-32**، كما تدعم المحفظة تدفقات دفع مؤتمتة بالكامل من دون موافقة بشرية على كل معاملة.

### دعم تعدد الوكلاء

يمكن لوكلاء متعددين العمل من المحفظة نفسها باستخدام **تدوير حسابات ZIP-32** - إذ يحصل كل وكيل على حسابه الخاص مع تتبع معزول للأرصدة، وإمكانية التحويل بين الحسابات، وتقارير رصيد لكل حساب. يتيح ذلك إدارة أسطول من الوكلاء العديدين انطلاقًا من بنية تحتية واحدة للمحفظة.

### معاملات Zcash محمية بالكامل (Orchard)

تستخدم المدفوعات المحمية **بروتوكول Orchard** الخاص بـ Zcash - وهو أحدث تجمع محمي وأكثره أمانًا. يتحقق الخادم من المدفوعات باستخدام **Incoming Viewing Key (IVK)**، الذي يمكنه فك تشفير الملاحظات المستلمة من دون كشف مفتاح الإنفاق. وتُمنع هجمات إعادة التشغيل عبر **ربط المذكرة** - إذ يضمّن كل تحدٍّ مذكرة فريدة `zimppy:{challenge_id}` يتم التحقق منها تشفيريًا.

### الجلسات، من دون زمن تأخير لكل طلب

تفصل بنية الجلسات انتظار التأكيد على السلسلة عن زمن التأخير الخاص بكل طلب. بعد إيداع واحد (~75 ثانية)، تُخدم جميع طلبات bearer-token اللاحقة فورًا من دون أي تفاعل مع البلوكتشين حتى إغلاق الجلسة.

### البث، الدفع لكل رمز

يتيح الدعم الأصلي لـ **SSE (Server-Sent Events)** محتوى مقاسًا وفق نموذج الدفع لكل رمز. وهو مثالي لواجهات برمجة تطبيقات استدلال LLM حيث يكون طول المخرجات متغيرًا ويجب أن يعكس الفوترة الاستهلاك الفعلي.

### الامتثال للمواصفات

- تمنع تحديات **HMAC-SHA256** الموقعة التزوير
- تنسيق الأخطاء المنظّم **RFC 9457** لمعالجة أخطاء قابلة للتشغيل البيني
- **`/.well-known/payment`** لاكتشاف طريقة الدفع تلقائيًا بواسطة أي وكيل متوافق مع MPP

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

### مسؤوليات المكوّنات

**`zimppy-core`** - النواة التشفيرية. تتعامل مع فك تشفير ملاحظات Orchard باستخدام IVK الخاص بالخادم، وتحليل المذكرات، ومنطق الحماية من إعادة التشغيل، والتحقق من التحديات. مكتوبة بلغة Rust من أجل الأداء والصحة.

**`zimppy-wallet`** - محفظة Zcash أصلية تعمل بواسطة `zingolib`. تدير المفاتيح، والحسابات، والأرصدة المحمية/الشفافة، وإرسال المعاملات.

**`zimppy-rs`** - حزمة Rust SDK. توفّر السمات `ChargeMethod` و`SessionMethod` و`PaymentProvider`، بالإضافة إلى مستخرجات Axum (`MppCharge` و`WithReceipt`) لدمج مريح في الخادم.

**`zimppy-napi`** - روابط NAPI-RS تكشف نواة Rust إلى Node.js، مما يتيح لحزمة TypeScript SDK استخدام المحرك التشفيري نفسه من دون إعادة تنفيذ بدائيات Zcash في JavaScript.

**`zimppy-ts`** - حزمة TypeScript SDK. تلتف حول روابط NAPI بواجهات async/await اصطلاحية لتدفقات الشحن، والجلسات، وبث SSE.

**`zimppy-cli`** - أداة المحفظة والطلبات عبر سطر الأوامر. تدعم الدفع التلقائي (402 -> دفع -> إعادة المحاولة)، وإدارة الجلسات، وجميع عمليات المحفظة.

---
## أمثلة وعروض توضيحية

| المثال | الوصف |
|---|---|
| `examples/fortune-teller/` | عروض توضيحية للرسوم والجلسات والبث - خادم Rust + عميل |
| `examples/llm-summarizer/` | عرض توضيحي لبث LLM مع الدفع لكل رمز |
| `examples/mcp-server/` | خادم أدوات MCP مع أدوات ذكاء اصطناعي مدفوعة |
| `examples/ts-server/` | تنفيذ مرجعي لخادم MPP بلغة TypeScript |

---

## ما يتضمنه - ملخص الميزات

| الميزة | الوصف |
|---|---|
| **الجلسات** | إيداع مرة واحدة، طلبات bearer فورية، واسترداد عند الإغلاق |
| **البث** | محتوى محسوب لكل رمز عبر SSE |
| **الرسوم** | دفع محمي أو شفاف لكل طلب HTTP (تدفق 402) |
| **المدفوعات الشفافة** | عناوين T مع منع إعادة التشغيل لكل تحدٍّ + أمر shield |
| **متعدد الحسابات** | تدوير حسابات ZIP-32، وتحويلات بين الحسابات، وأرصدة لكل حساب |
| **محفظة CLI** | إرسال، shield، transfer، balance --all، whoami، auto-pay |
| **حزمة SDK مزدوجة** | TypeScript و Rust |
| **متوافق مع المواصفات** | تحديات HMAC-SHA256، وأخطاء RFC 9457، واكتشاف `/.well-known/payment` |

---

*لمزيد من المعلومات، زر [zimppy.xyz](https://zimppy.xyz)*

---

## صفحات ذات صلة

- [المحافظ](/using-zcash/wallets) — محافظ Zcash التي تدعم المعاملات المحمية
- [المجمّعات المحمية](/using-zcash/shielded-pools) — كيف تحمي معاملات Orchard المحمية بيانات الدفع
- [معالجات الدفع](/using-zcash/payment-processors) — طرق أخرى لقبول مدفوعات Zcash
- [أصول Zcash المحمية](/zcash-tech/zcash-shielded-assets) — ZSAs ومستقبل قابلية برمجة Zcash
- [مشاريع المجتمع](/zcash-community/community-projects) — المزيد من مشاريع منظومة Zcash
