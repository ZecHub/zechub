<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## خلاصه

- **Zimppy** یک زیرساخت پرداخت با اولویت حریم خصوصی برای عامل‌های هوش مصنوعی است که از Machine Payment Protocol (MPP) متعلق به Zcash استفاده می‌کند
- **یک بار** به‌صورت on-chain **واریز کنید** (از زمان NU7 حدود 25 ثانیه برای هر بلوک)، سپس **درخواست‌های فوری نامحدود** انجام دهید، بدون هیچ تعامل با بلاک‌چین برای هر درخواست
- از پرداخت‌های **کاملاً محافظت‌شده Zcash (Orchard)** پشتیبانی می‌کند؛ فرستنده، گیرنده، مبلغ و یادداشت همگی رمزنگاری می‌شوند
- با **SDKهای TypeScript و Rust** کار می‌کند تا یکپارچه‌سازی آن در پایپ‌لاین‌های هوش مصنوعی و سرورهای API آسان باشد
- گزینه‌ای عالی برای **APIهای LLM، بازارهای داده، سرورهای ابزار MCP** و هر کاربرد پرداخت M2M

---

> **Zimppy** روش پرداخت Machine Payment Protocol (MPP) برای Zcash است که از پرداخت‌های محافظت‌شده و شفاف پشتیبانی می‌کند. یک بار به‌صورت on-chain واریز کنید، سپس درخواست‌های bearer فوری و نامحدود انجام دهید، بدون هیچ تعامل با زنجیره برای هر درخواست.

---

## فهرست مطالب

1. [Zimppy.xyz چیست؟](#what-is-zimppyxyz)
2. [چرا پرداخت‌های محافظت‌شده برای عامل‌های هوش مصنوعی؟](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy چگونه کار می‌کند](#how-zimppy-works)
   - [نشست‌ها (توصیه‌شده)](#sessions-recommended)
   - [استریمینگ](#streaming)
   - [شارژ](#charge)
5. [کاربردها و نمونه‌ها](#use-cases--examples)
6. [نصب](#installation)
7. [راه‌اندازی کیف‌پول Zimppy](#setting-up-the-zimppy-wallet)
8. [یکپارچه‌سازی Zimppy](#integrating-zimppy--typescript-sdk)
   - [سرور (محافظت‌شده)](#typescript-server--shielded)
   - [سرور (شفاف)](#typescript-server--transparent)
   - [کلاینت](#typescript-client)
9. [یکپارچه‌سازی Zimppy - SDK Rust](#integrating-zimppy--rust-sdk)
   - [سرور (Axum)](#rust-server-axum)
   - [کلاینت](#rust-client)
10. [مرجع CLI](#cli-reference)
11. [ویژگی‌های کلیدی](#key-features)
12. [معماری](#architecture)
13. [نمونه‌ها و دموها](#examples--demos)

---

## Zimppy.xyz چیست؟

**Zimppy.xyz** یک زیرساخت پرداخت با اولویت حریم خصوصی است که به‌طور ویژه برای عامل‌های هوش مصنوعی و گردش‌کارهای خودکار ماشین به ماشین (M2M) طراحی شده است. این زیرساخت **Machine Payment Protocol (MPP)** را با استفاده از **Zcash** به‌عنوان ارز پایه پیاده‌سازی می‌کند و هر دو حالت پرداخت محافظت‌شده (کاملاً خصوصی) و شفاف را ممکن می‌سازد.

برخلاف سیستم‌های پرداخت بلاک‌چینی سنتی که در آن‌ها هر تراکنش به‌صورت عمومی و on-chain قابل مشاهده است، Zimppy بر پایه یک معماری مبتنی بر نشست ساخته شده است که تأخیر هر درخواست را حذف می‌کند و در عین حال حریم خصوصی رمزنگاری‌شده را حفظ می‌کند. این ویژگی آن را به‌طور منحصربه‌فردی برای عامل‌های هوش مصنوعی مناسب می‌سازد که باید به‌صورت برنامه‌نویسی‌شده هزینه APIها، داده، توان محاسباتی یا ابزارهای هوش مصنوعی را بپردازند، بدون آنکه فراداده‌های رفتاری‌شان افشا شود.

### ویژگی‌های اصلی

- **یک بار** به‌صورت on-chain **واریز کنید** (از زمان NU7 حدود 25 ثانیه برای هر بلوک Zcash؛ پیش از آن 75 ثانیه)
- **درخواست‌های فوری نامحدود** پس از باز شدن نشست، بدون هیچ تعامل با زنجیره برای هر درخواست
- **پرداخت‌های محافظت‌شده** فرستنده، گیرنده، مبلغ و یادداشت را با استفاده از پروتکل Orchard در Zcash رمزنگاری می‌کنند
- **پرداخت‌های شفاف** برای جلوگیری از حملات تکرار، از T-addressهای مختص هر چالش استفاده می‌کنند، بدون حریم خصوصی کامل
- **سازگار با مشخصات**: چالش‌های HMAC-SHA256، خطاهای RFC 9457، کشف از طریق `/.well-known/payment`

---

## چرا پرداخت‌های محافظت‌شده برای عامل‌های هوش مصنوعی؟

برای عامل‌های هوش مصنوعی که گردش‌کارهای حساس مانند پژوهش حقوقی، پرسش‌های پزشکی، تحلیل مالی و هوش رقابتی را انجام می‌دهند، **هر پرداخت عمومی یک نشت فراداده است**. Zimppy تنها روش پرداخت MPP است که **به‌طور پیش‌فرض خصوصی** است.

### جدول مقایسه حریم خصوصی

| ویژگی | زنجیره‌های عمومی (USDC، ETH) | Zimppy محافظت‌شده | Zimppy شفاف |
|---|---|---|---|
| **فرستنده** | قابل مشاهده | رمزنگاری‌شده | قابل مشاهده |
| **گیرنده** | قابل مشاهده | رمزنگاری‌شده | مختص هر چالش (غیرقابل‌پیوند) |
| **مبلغ** | قابل مشاهده | رمزنگاری‌شده | قابل مشاهده |
| **یادداشت** | قابل مشاهده | رمزنگاری‌شده | ندارد |
| **محافظت در برابر تکرار** | ندارد | پیوند با یادداشت | T-address مختص هر چالش |
| **الگوی استفاده از سرویس** | قابل‌پیوند | خصوصی | غیرقابل‌پیوند (آدرس تازه) |

### مشکل تأخیر، حل‌شده با نشست‌ها

> *«اما بلوک‌های Zcash همچنان 25 ثانیه طول می‌کشند (پیش از NU7، 75 ثانیه).»*

**نشست‌ها این مشکل را حل می‌کنند.** انتظار on-chain دقیقاً **یک بار** و در زمان واریز رخ می‌دهد. هر درخواست بعدی فوری است.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~25s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**یک بار پرداخت کنید، فوراً فراخوانی کنید و باقی‌مانده را پس بگیرید.** تأخیر هر درخواست صفر است.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** یک پروتکل استاندارد است که به عامل‌های نرم‌افزاری خودمختار (عامل‌های هوش مصنوعی، ربات‌ها، اسکریپت‌ها) امکان می‌دهد الزامات پرداخت برای دسترسی به API را کشف، مذاکره و برآورده کنند، همه بدون دخالت انسان.

### نحوه یکپارچه‌شدن MPP با APIها

MPP از جریان HTTP **402 Payment Required** پیروی می‌کند:

1. **عامل** یک منبع را از یک endpoint پولی API **درخواست می‌کند**.
2. **سرور** با `402 Payment Required` به‌همراه یک چالش امضاشده (مبلغ، گیرنده، یادداشت) **پاسخ می‌دهد**.
3. **عامل** با یک روش پرداخت سازگار (برای مثال Zcash محافظت‌شده Zimppy) **پرداخت می‌کند**.
4. **عامل** درخواست را با `Authorization: Payment {txid}` **دوباره ارسال می‌کند**.
5. **سرور** پرداخت را به‌صورت رمزنگاری‌شده **تأیید می‌کند** (رمزگشایی IVK Orchard، بررسی مبلغ و یادداشت).
6. **سرور** با `200 OK` به‌همراه یک هدر `Payment-Receipt` **پاسخ می‌دهد**.

### سازگاری با مشخصات

- امضای چالش با **HMAC-SHA256**
- پاسخ‌های خطای ساختاریافته **RFC 9457**
- endpoint **`/.well-known/payment`** برای کشف خودکار روش پرداخت
- **IVK Orchard** (Incoming Viewing Key) برای تأیید پرداخت در سمت سرور بدون افشای کلیدهای خرج‌کننده

---

## Zimppy چگونه کار می‌کند

### نشست‌ها (توصیه‌شده)

نشست‌ها الگوی اصلی تعامل هستند. عامل یک بار موجودی را به‌صورت on-chain واریز می‌کند، یک توکن bearer دریافت می‌کند و از آن برای همه درخواست‌های بعدی با تأخیر صفر استفاده می‌کند.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**مناسب برای:** فراخوانی‌های پرتکرار API، استنتاج LLM، پرسش‌های تکراری داده.

---

### استریمینگ

محتوای اندازه‌گیری‌شده با پرداخت به ازای هر توکن که از طریق **Server-Sent Events (SSE)** تحویل داده می‌شود. سرور به ازای هر کلمه یا توکن استریم‌شده از موجودی نشست کسر می‌کند.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**مناسب برای:** پاسخ‌های استریمی LLM، فیدهای داده بلادرنگ، ابزارهای هوش مصنوعی با پرداخت به ازای هر توکن.

---

### شارژ

یک پرداخت محافظت‌شده واحد برای هر درخواست. جریان کامل HTTP 402 برای هر فراخوانی اجرا می‌شود. زمانی مناسب است که درخواست‌ها کم‌تکرار یا پرارزش باشند.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**مناسب برای:** درخواست‌های یک‌باره پرارزش، فراخوانی‌های کم‌تکرار API، endpointهای داده ممتاز.

---

## کاربردها و نمونه‌ها

### 1. عامل هوش مصنوعی

یک عامل هوش مصنوعی حقوقی از یک پایگاه داده پولی رویه قضایی پرس‌وجو می‌کند. با استفاده از نشست‌های محافظت‌شده Zimppy، نه هویت دفتر حقوقی و نه پرس‌وجوهای مشخص آن به‌صورت on-chain قابل مشاهده نیستند و این امر از امتیاز محرمانگی وکیل و موکل در سطح زیرساخت محافظت می‌کند.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. عامل هوش مصنوعی برای پایپ‌لاین پرسش‌های پزشکی

یک عامل تشخیص پزشکی از چندین پایگاه داده بالینی پرس‌وجو می‌کند. پرداخت‌های محافظت‌شده تضمین می‌کنند که الگوهای پرس‌وجوی بیماران میان ارائه‌دهندگان مختلف قابل‌پیوند نباشند.

### 3. عامل تحلیل مالی

یک عامل معاملات الگوریتمی هزینه APIهای داده بلادرنگ بازار را می‌پردازد. پرداخت‌های شفاف برای هر چالش از T-addressهای تازه استفاده می‌کنند و از همبستگی الگوی استفاده میان فروشندگان داده جلوگیری می‌کنند.

### 4. سرور ابزار MCP، ابزارهای پولی هوش مصنوعی

یک سرور MCP (Model Context Protocol) ابزارهای پولی هوش مصنوعی را ارائه می‌دهد. هر فراخوانی ابزار یک شارژ Zimppy را فعال می‌کند و بازاری از قابلیت‌های درآمدزای هوش مصنوعی را ممکن می‌سازد.

### 5. خلاصه‌ساز LLM، پرداخت به ازای هر توکن

یک سرویس خلاصه‌سازی LLM از طریق استریمینگ SSE به ازای هر توکن خروجی از عامل‌ها هزینه دریافت می‌کند و کسر خودکار موجودی و بازپرداخت موجودی پیش‌پرداخت استفاده‌نشده را انجام می‌دهد.

---

## نصب

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

## راه‌اندازی کیف‌پول Zimppy

CLI مربوط به Zimppy یک رابط کامل کیف‌پول فراهم می‌کند. همه دستورها از طریق `npx zimppy` در دسترس هستند.

### گام 1: ایجاد کیف‌پول

```bash
npx zimppy wallet create
```

کلیدهای رمزنگاری را تولید می‌کند و **عبارت بازیابی** شما را نمایش می‌دهد. آن را به‌طور امن نگهداری کنید؛ در صورت گم شدن قابل بازیابی نیست.

### گام 2: بررسی آدرس و موجودی

```bash
npx zimppy wallet whoami
```

**Unified Address (UA)**، **T-address**، موجودی فعلی و شبکه فعال شما را نمایش می‌دهد.

```bash
npx zimppy wallet balance --all
```

تفکیک موجودی هر حساب را در تمام حساب‌های ZIP-32 نشان می‌دهد.

### گام 3: شارژ کیف‌پول

ZEC را از هر کیف‌پول یا صرافی سازگار با Zcash به Unified Address خود ارسال کنید. واریزهای محافظت‌شده مستقیماً به حساب Orchard شما می‌روند.

### گام 4: ارسال و محافظت از وجوه

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

### گام 5: انجام یک درخواست با پرداخت خودکار

```bash
npx zimppy request <url>
```

جریان کامل 402 -> پرداخت -> تلاش مجدد را به‌طور خودکار مدیریت می‌کند. نشست‌ها به‌صورت نامحسوس باز و مدیریت می‌شوند.

---

## یکپارچه‌سازی Zimppy - SDK TypeScript

### سرور TypeScript - محافظت‌شده

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

**نکات کلیدی:**
- `zcash({ wallet: 'server' })` کیف‌پول محافظت‌شده سرور را بارگذاری می‌کند
- `mppx.charge()` چرخه کامل چالش/تأیید 402 را مدیریت می‌کند
- `result.withReceipt()` رسید رمزنگاری‌شده پرداخت را به پاسخ پیوست می‌کند

---

### سرور TypeScript - شفاف

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

هر چالش یک **T-address تازه** تولید می‌کند و درخواست‌های پرداخت را میان نشست‌ها غیرقابل‌پیوند می‌سازد.

---

### کلاینت TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

کلاینت پاسخ‌های `402` را رهگیری می‌کند، به‌طور خودکار یک نشست باز می‌کند و درخواست را دوباره ارسال می‌کند؛ کد فراخواننده به هیچ منطق مختص پرداخت نیاز ندارد.

---

## یکپارچه‌سازی Zimppy - SDK Rust

### سرور Rust (Axum)

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

**نکات کلیدی:**
- `MppCharge<Price>` یک extractor برای Axum است که پیش از اجرای handler پرداخت را تأیید می‌کند
- `WithReceipt` پاسخ را با یک رسید رمزنگاری‌شده پرداخت همراه می‌کند
- `ChargeConfig` منطق قیمت‌گذاری را تعریف می‌کند و می‌تواند بر اساس پارامترهای درخواست پویا باشد

---

### کلاینت Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` هر کلاینت HTTP را با مدیریت خودکار 402، مدیریت نشست و انجام پرداخت Zcash گسترش می‌دهد.

---

## مرجع CLI

| دستور | توضیح |
|---|---|
| `npx zimppy wallet create` | تولید کلیدها و نمایش عبارت بازیابی |
| `npx zimppy wallet whoami` | نمایش آدرس (UA + T-addr)، موجودی، شبکه |
| `npx zimppy wallet balance --all` | تفکیک موجودی هر حساب |
| `npx zimppy wallet send <addr> <zat>` | ارسال ZEC محافظت‌شده یا شفاف |
| `npx zimppy wallet transfer <from> <to> <zat>` | انتقال داخلی میان حساب‌ها |
| `npx zimppy wallet shield` | انتقال وجوه شفاف به Orchard (محافظت‌شده) |
| `npx zimppy wallet use <name>` | تغییر هویت فعال کیف‌پول |
| `npx zimppy request <url>` | درخواست خودکار 402 -> پرداخت -> تلاش مجدد |

---

## ویژگی‌های کلیدی

### کیف‌پول‌های بومی عامل‌ها

کیف‌پول‌های Zimppy برای استفاده برنامه‌نویسی‌شده توسط عامل‌های هوش مصنوعی طراحی شده‌اند، نه افزونه‌های مرورگری که انسان مدیریت می‌کند. کلیدها از طریق CLI یا SDKها مدیریت می‌شوند، حساب‌ها را می‌توان از طریق **اشتقاق حساب ZIP-32** چرخش داد و کیف‌پول از جریان‌های پرداخت کاملاً خودکار، بدون نیاز به تأیید انسانی برای هر تراکنش، پشتیبانی می‌کند.

### پشتیبانی از چند عامل

چندین عامل می‌توانند با استفاده از **چرخش حساب ZIP-32** از یک کیف‌پول واحد کار کنند؛ هر عامل حساب خود را با ردیابی موجودی جداگانه، قابلیت انتقال میان حساب‌ها و گزارش موجودی هر حساب دریافت می‌کند. این امر مدیریت ناوگانی از عامل‌های متعدد را از یک زیرساخت کیف‌پول واحد ممکن می‌سازد.

### تراکنش‌های کاملاً محافظت‌شده Zcash (Orchard)

پرداخت‌های محافظت‌شده از **پروتکل Orchard** در Zcash استفاده می‌کنند؛ استخر محافظت‌شده‌ای که با NU5 معرفی شد. سرور پرداخت‌ها را با استفاده از یک **Incoming Viewing Key (IVK)** تأیید می‌کند که می‌تواند noteهای دریافتی را بدون افشای کلید خرج‌کننده رمزگشایی کند. از حملات تکرار از طریق **پیوند با یادداشت** جلوگیری می‌شود؛ هر چالش یک یادداشت `zimppy:{challenge_id}` منحصربه‌فرد را در خود جای می‌دهد که به‌صورت رمزنگاری‌شده تأیید می‌شود.

### نشست‌ها، تأخیر صفر برای هر درخواست

معماری نشست، انتظار برای تأیید on-chain را از تأخیر هر درخواست جدا می‌کند. پس از یک واریز واحد (از زمان NU7 حدود 25 ثانیه)، همه درخواست‌های بعدی با توکن bearer بلافاصله و بدون هیچ تعامل با بلاک‌چین تا زمان بسته شدن نشست پاسخ داده می‌شوند.

### استریمینگ، پرداخت به ازای هر توکن

پشتیبانی بومی از **SSE (Server-Sent Events)** محتوای اندازه‌گیری‌شده با پرداخت به ازای هر توکن را ممکن می‌سازد. این ویژگی برای APIهای استنتاج LLM که طول خروجی در آن‌ها متغیر است و صورت‌حساب باید مصرف واقعی را منعکس کند، ایده‌آل است.

### سازگاری با مشخصات

- چالش‌های امضاشده با **HMAC-SHA256** از جعل جلوگیری می‌کنند
- قالب خطای ساختاریافته **RFC 9457** برای مدیریت خطای قابل تعامل
- **`/.well-known/payment`** برای کشف خودکار روش پرداخت توسط هر عامل سازگار با MPP

---

## معماری

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

### مسئولیت‌های اجزا

**`zimppy-core`** - هسته رمزنگاری. رمزگشایی noteهای Orchard با استفاده از IVK سرور، تجزیه یادداشت، منطق محافظت در برابر تکرار و تأیید چالش را انجام می‌دهد. برای کارایی و صحت به زبان Rust نوشته شده است.

**`zimppy-wallet`** - یک کیف‌پول بومی Zcash که با `zingolib` کار می‌کند. کلیدها، حساب‌ها، موجودی‌های محافظت‌شده/شفاف و ارسال تراکنش را مدیریت می‌کند.

**`zimppy-rs`** - SDK Rust. Traitهای `ChargeMethod`، `SessionMethod` و `PaymentProvider` را به‌همراه extractorهای Axum (`MppCharge`، `WithReceipt`) برای یکپارچه‌سازی راحت با سرور فراهم می‌کند.

**`zimppy-napi`** - Bindingهای NAPI-RS که هسته Rust را در اختیار Node.js قرار می‌دهند و به SDK TypeScript امکان می‌دهند از همان موتور رمزنگاری استفاده کند، بدون آنکه primitiveهای Zcash دوباره در JavaScript پیاده‌سازی شوند.

**`zimppy-ts`** - SDK TypeScript. Bindingهای NAPI را با APIهای async/await متداول برای جریان‌های شارژ، نشست و استریمینگ SSE پوشش می‌دهد.

**`zimppy-cli`** - کیف‌پول خط فرمان و ابزار ارسال درخواست. از پرداخت خودکار (402 -> پرداخت -> تلاش مجدد)، مدیریت نشست و همه عملیات کیف‌پول پشتیبانی می‌کند.

---

## نمونه‌ها و دموها

| نمونه | توضیح |
|---|---|
| `examples/fortune-teller/` | دموهای شارژ، نشست و استریمینگ - سرور و کلاینت Rust |
| `examples/llm-summarizer/` | دموی استریمینگ LLM با پرداخت به ازای هر توکن |
| `examples/mcp-server/` | سرور ابزار MCP با ابزارهای پولی هوش مصنوعی |
| `examples/ts-server/` | پیاده‌سازی مرجع سرور MPP به زبان TypeScript |

---

## چه چیزهایی گنجانده شده است - خلاصه ویژگی‌ها

| ویژگی | توضیح |
|---|---|
| **نشست‌ها** | یک بار واریز، درخواست‌های bearer فوری، بازپرداخت هنگام بستن |
| **استریمینگ** | محتوای اندازه‌گیری‌شده با پرداخت به ازای هر توکن از طریق SSE |
| **شارژ** | پرداخت محافظت‌شده یا شفاف برای هر درخواست HTTP (جریان 402) |
| **پرداخت‌های شفاف** | T-addressها با جلوگیری از تکرار مختص هر چالش + دستور shield |
| **چندحسابی** | چرخش حساب ZIP-32، انتقال میان حساب‌ها، موجودی هر حساب |
| **کیف‌پول CLI** | Send، shield، transfer، balance --all، whoami، پرداخت خودکار |
| **SDK دوگانه** | TypeScript و Rust |
| **سازگار با مشخصات** | چالش‌های HMAC-SHA256، خطاهای RFC 9457، کشف از طریق `/.well-known/payment` |

---

*برای اطلاعات بیشتر، از [zimppy.xyz](https://zimppy.xyz) دیدن کنید*

---

## صفحات مرتبط

- [کیف‌پول‌ها](/using-zcash/wallets) — کیف‌پول‌های Zcash که از تراکنش‌های محافظت‌شده پشتیبانی می‌کنند
- [استخرهای محافظت‌شده](/using-zcash/shielded-pools) — تراکنش‌های محافظت‌شده Orchard چگونه از داده‌های پرداخت محافظت می‌کنند
- [پردازشگرهای پرداخت](/using-zcash/payment-processors) — روش‌های دیگر برای پذیرش پرداخت‌های Zcash
- [دارایی‌های محافظت‌شده Zcash](/zcash-tech/zcash-shielded-assets) — ZSAها و آینده برنامه‌پذیری Zcash
- [پروژه‌های کامیونیتی](/zcash-community/community-projects) — پروژه‌های بیشتر از اکوسیستم Zcash
