<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# طلبات الدفع عبر URI في Zcash

URI لطلب الدفع هو رابط `zcash:` محدد بواسطة [ZIP 321](https://zips.z.cash/zip-0321). تقرأ المحافظ المتوافقة العنوان والمبلغ والمذكرة الاختيارية من الرابط أو رمز QR وتملأ المعاملة مسبقًا. لا حسابات إضافية ولا معالج وسيط.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    فتح أداة الدفع
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    إنشاء طلب دفع
  </a>
</div>

العرض التوضيحي للأداة هو نافذة ZIP-321 مباشرة: رمز QR، ونسخ العنوان/URI، ورابط قصير، وخيار الفتح في المحفظة. صفحة الأدوات هي المُولِّد إذا أردت تعيين عنوانك ومبلغك أولًا.

## البنية

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| الحقل | مطلوب | ملاحظات |
| --- | --- | --- |
| address | نعم | يُفضّل استخدام Unified Address (`u1` / `utest1`) |
| amount | لا | ZEC عشري |
| memo | لا | للتحويلات المحمية فقط |
| label | لا | اسم قابل للقراءة البشرية تعرضه بعض المحافظ |

القواعد الكاملة: [ZIP 321](https://zips.z.cash/zip-0321).

## حالات الاستخدام

- **إتمام الشراء** — املأ السعر ومذكرة الطلب مسبقًا لكي يؤكد العميل فقط في محفظته
- **الفواتير** — شارك رابطًا واحدًا أو رمز QR
- **التبرعات** — ضمّن الأداة في موقع
- **P2P** — أرسل رابط `zcash:` في الدردشة

## التضمين في موقع

وجّه هذا السكربت إلى عنوانك المحمي. النسخة المستضافة موجودة على ZecHub:

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

المطلوب: `data-address`، `data-amount`، `data-target`.

جرّب الزر المستضاف أولًا: [فتح أداة الدفع](/zcash-payment-uri).

## الفيديوهات

كيفية إنشاء طلبات الدفع باستخدام Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="كيفية إنشاء طلبات الدفع باستخدام Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

إضافة أداة تبرعات Zcash إلى موقعك الإلكتروني:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="إضافة أداة تبرعات Zcash إلى موقعك الإلكتروني"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
