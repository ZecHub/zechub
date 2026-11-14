<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# URIهای درخواست پرداخت Zcash

## خلاصه

* URI درخواست پرداخت لینکی است که با `zcash:` شروع می‌شود و جزئیات یک پرداخت را در خود دارد: آدرس، مبلغ و یک یادداشت اختیاری.
* این لینک به‌صورت کد QR یا لینک قابل‌کلیک به اشتراک گذاشته می‌شود و به کیف‌پول شما اجازه می‌دهد پرداخت را برای شما پر کند. شما جزئیات را بررسی و تأیید می‌کنید.
* [ZIP 321](https://zips.z.cash/zip-0321) این قالب را تعریف می‌کند. این استاندارد از BIP 21 در Bitcoin الهام گرفته است.
* یک درخواست می‌تواند در یک تراکنش واحد به چند گیرنده پرداخت کند.
* ZecHub یک ویجت پرداخت و یک سازنده را میزبانی می‌کند، تا یک فروشگاه بتواند بدون نوشتن دستی URI، یک دکمهٔ پرداخت Zcash اضافه کند.

## توضیح اصلی

URI درخواست پرداخت یک لینک `zcash:` است که توسط [ZIP 321](https://zips.z.cash/zip-0321) تعریف شده است. کیف‌پول‌های سازگار، آدرس، مبلغ و یادداشت اختیاری را از لینک یا QR می‌خوانند و یک تراکنش را از پیش پر می‌کنند. بدون حساب کاربری اضافه و بدون پردازشگری در میانه.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    باز کردن ویجت پرداخت
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    ساخت درخواست پرداخت
  </a>
</div>

نسخهٔ نمایشی ویجت یک پنجرهٔ ZIP-321 زنده است: QR، کپی آدرس/URI، لینک کوتاه و گزینهٔ «باز کردن در کیف‌پول». صفحهٔ ابزارها همان سازنده است، اگر بخواهید ابتدا آدرس و مبلغ خودتان را تنظیم کنید.

### ساختار

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| فیلد | الزامی | توضیحات |
| --- | --- | --- |
| address | بله | ترجیحاً از یک Unified Address استفاده کنید (`u1` / `utest1`) |
| amount | خیر | ZEC اعشاری با `.` به‌عنوان جداکننده و حداکثر 8 رقم اعشار (`0.5`، نه `0,5`) |
| memo | خیر | فقط برای آدرس‌های محافظت‌شده. بایت‌های UTF-8 یادداشت (حداکثر 512)، با کدگذاری base64url و بدون padding `=`: `Thanks!` به `VGhhbmtzIQ` تبدیل می‌شود، نه متن ساده |
| label | خیر | نامی خوانا برای انسان که برخی کیف‌پول‌ها نمایش می‌دهند. فاصله‌ها و نویسه‌های رزروشده را percent-encode کنید (`Coffee%20shop`)؛ یک `+` به معنای علامت جمع واقعی است، نه فاصله |

قوانین کامل: [ZIP 321](https://zips.z.cash/zip-0321).

### کاربردها

- پرداخت نهایی خرید: قیمت و یک یادداشت سفارش را از پیش پر کنید تا مشتری فقط در کیف‌پول خود تأیید کند
- فاکتورها: یک لینک یا QR را به اشتراک بگذارید
- کمک‌های مالی: ویجت را در یک سایت جاسازی کنید
- P2P: یک لینک `zcash:` را در چت ارسال کنید

### جاسازی در یک سایت

این اسکریپت را به آدرس محافظت‌شدهٔ خودتان متصل کنید. نسخهٔ میزبانی‌شده در ZecHub قرار دارد:

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

الزامی: `data-address`، `data-amount`، `data-target`.

ابتدا دکمهٔ میزبانی‌شده را امتحان کنید: [باز کردن ویجت پرداخت](/zcash-payment-uri).

### ویدیوها

نحوهٔ ساخت درخواست‌های پرداخت با Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

افزودن ویجت کمک مالی Zcash به وب‌سایت شما:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## تصویر / تشبیه

یک فرم انتقال بانکی را در نظر بگیرید که فیلدهایی برای شمارهٔ حساب، مبلغ و یک note دارد که می‌گوید پرداخت بابت چیست. پر کردن دستی آن کند است و یک رقم اشتباه، پول را به جای اشتباهی می‌فرستد.

URI درخواست پرداخت همان فرم است که فروشگاه آن را پر کرده است. کد QR عکسی از آن فرم است. دوربین گوشی شما عکس را می‌خواند، کیف‌پول هر فیلد را در جای خود کپی می‌کند و شما اعداد را بررسی و امضا می‌کنید.

یک لینک در صفحهٔ وب نیز همین کار را انجام می‌دهد. کلیک روی آن، فرم پرشده را به کیف‌پول شما تحویل می‌دهد.

## بررسی عمیق

### یک مثال واقعی

در اینجا مثالی از ZIP 321 آمده است که برای testnet نوشته شده است:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

این درخواست 1 ZEC را برای یک آدرس محافظت‌شدهٔ Sapling درخواست می‌کند. یادداشت پس از رمزگشایی به «This is a simple memo.» تبدیل می‌شود. پیام «Thank you for your purchase» متنی است که کیف‌پول روی صفحه نمایش می‌دهد.

### قوانینی که کیف‌پول بررسی می‌کند

قالب مبلغ سخت‌گیرانه است. `amount=0.5` و `amount=50` معتبر هستند. `amount=50,000.00`، `amount=.5` و `amount=0.123456789` نامعتبر هستند: نقطه تنها جداکنندهٔ اعشار است و پس از آن حداکثر 8 رقم می‌تواند بیاید. هیچ مبلغی نمی‌تواند از 21,000,000 ZEC بیشتر باشد.

در URI خام، یادداشت با base64url کدگذاری می‌شود و پس از رمزگشایی می‌تواند تا 512 بایت را در خود جای دهد. یادداشتی که به یک آدرس شفاف پیوست شود کل درخواست را نامعتبر می‌کند، زیرا آدرس‌های شفاف نمی‌توانند یادداشت داشته باشند. آدرس‌های Sprout به‌هیچ‌وجه مجاز نیستند و درخواستی که از دستور زبان ZIP 321 پیروی نکند باید رد شود.

دو فیلد دیگر نیز فراتر از جدول بالا وجود دارد. `message` توضیحی دربارهٔ پرداخت است که کیف‌پول نمایش می‌دهد. `req-asset` برای Custom Assets رزرو شده است، همان‌طور که در ZIP 227 تعریف شده است.

### پرداخت به چند نفر به‌طور هم‌زمان

به نام پارامترهای هر پرداخت اضافی یک شمارهٔ اندیس افزوده می‌شود، برای مثال `address.1`، `amount.1` و `memo.1`. کیف‌پول یک تراکنش می‌سازد که به همهٔ افراد فهرست پرداخت می‌کند. این قابلیت برای پرداخت نهایی خریدی که پرداخت را تقسیم می‌کند، یا برای مجموعه‌ای از کمک‌های مالی که با هم ارسال می‌شوند مفید است.

### این قالب از کجا آمده است

Bitcoin دو استاندارد قدیمی‌تر برای درخواست‌های پرداخت دارد: BIP 21، یک لینک ساده برای یک گیرنده، و BIP 70، یک پروتکل سنگین‌تر برای پرداخت‌های پیچیده. ZIP 321 راهی میانه را در پیش می‌گیرد، یعنی یک قالب لینک با امکان چند گیرنده. این بحث در سال 2018 در مخزن ZIPهای Zcash آغاز شد، جایی که عدد 321 برای یادآوری BIP 21 انتخاب شد، و خود ZIP در اوت 2020 ایجاد شد.

## صفحات مرتبط

- [یادداشت‌ها](/using-zcash/memos): فیلد یادداشت در یک درخواست پرداخت برای چیست.
- [پردازشگرهای پرداخت](/using-zcash/payment-processors): سرویس‌هایی که پرداخت‌ها را برای فروشگاه‌ها مدیریت می‌کنند.
- [کیف‌پول‌ها](/using-zcash/wallets): از فیلتر Payment Request استفاده کنید تا کیف‌پول‌هایی را بیابید که این لینک‌ها را می‌خوانند.
- [دارایی‌های محافظت‌شدهٔ Zcash](/zcash-tech/zcash-shielded-assets): همان Custom Assets که `req-asset` به آن‌ها اشاره می‌کند.
- [آدرس‌های TEX در Zcash چیستند؟](/using-zcash/transparent-exchange-addresses): یک قانون دیگر دربارهٔ آدرس که کیف‌پول شما پیش از پرداخت بررسی می‌کند.

**آخرین به‌روزرسانی:** اکتبر 2026
