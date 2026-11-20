<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# معرّفات URI لطلبات الدفع في Zcash

## باختصار

* معرّف URI لطلب الدفع (payment request URI) هو رابط يبدأ بـ `zcash:` ويحمل تفاصيل عملية الدفع (payment): العنوان (address)، والمبلغ، ومذكرة (memo) اختيارية.
* عند مشاركته كرمز QR أو كرابط قابل للنقر، يتيح لمحفظتك (wallet) ملء بيانات الدفع نيابةً عنك. أنت تراجع التفاصيل وتوافق عليها.
* يحدد [ZIP 321](https://zips.z.cash/zip-0321) هذا التنسيق. وقد نشأ عن BIP 21 الخاص بـ Bitcoin.
* يمكن لطلب واحد أن يدفع لعدة مستلمين في معاملة (transaction) واحدة.
* يستضيف ZecHub أداة دفع مدمجة ومولّدًا، بحيث يستطيع المتجر إضافة زر دفع بـ Zcash دون كتابة معرّف URI يدويًا.

## الشرح الأساسي

معرّف URI لطلب الدفع هو رابط `zcash:` يحدده [ZIP 321](https://zips.z.cash/zip-0321). تقرأ المحافظ المتوافقة العنوان والمبلغ والمذكرة الاختيارية من الرابط أو رمز QR وتملأ المعاملة مسبقًا. لا حسابات إضافية، ولا وسيط معالجة في المنتصف.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    افتح أداة الدفع
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    أنشئ طلب دفع
  </a>
</div>

العرض التوضيحي للأداة هو نافذة ZIP-321 حية: رمز QR، ونسخ العنوان/معرّف URI، ورابط مختصر، وزر «افتح في المحفظة». أما صفحة الأدوات (tools) فهي المولّد إذا أردت تحديد عنوانك ومبلغك أولًا.

### البنية

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| الحقل | مطلوب | تفاصيل |
| --- | --- | --- |
| address | نعم | يُفضَّل استخدام عنوان موحّد (Unified Address) (`u1` / `utest1`) |
| amount | لا | قيمة ZEC عشرية مع `.` كفاصل وبحد أقصى 8 خانات عشرية (`0.5`، وليس `0,5`) |
| memo | لا | للعناوين المحمية (shielded) فقط. بايتات UTF-8 الخاصة بالمذكرة (512 بايت كحد أقصى)، مُرمَّزة بـ base64url دون حشو `=`: يصبح `Thanks!` هو `VGhhbmtzIQ`، وليس النص العادي |
| label | لا | اسم مقروء للبشر تعرضه بعض المحافظ. استخدم الترميز المئوي للمسافات والأحرف المحجوزة (`Coffee%20shop`)؛ وعلامة `+` تعني علامة زائد حرفية، وليست مسافة |

القواعد الكاملة: [ZIP 321](https://zips.z.cash/zip-0321).

### حالات الاستخدام

- الدفع عند الشراء: املأ السعر ومذكرة الطلب مسبقًا بحيث لا يحتاج العميل إلا إلى التأكيد في محفظته
- الفواتير: شارك رابطًا واحدًا أو رمز QR
- التبرعات: أدمج الأداة في موقع
- من نظير إلى نظير (P2P): أرسل رابط `zcash:` في محادثة

### الدمج في موقع

وجّه هذا السكربت إلى عنوانك المحمي الخاص. توجد نسخة مستضافة على ZecHub:

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

جرّب الزر المستضاف أولًا: [افتح أداة الدفع](/zcash-payment-uri).

### مقاطع الفيديو

كيفية إنشاء طلبات الدفع باستخدام Zcash:

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

إضافة أداة تبرعات بـ Zcash إلى موقعك الإلكتروني:

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

## تشبيه بصري

تخيّل نموذج تحويل مصرفي فيه خانات لرقم الحساب والمبلغ وبيان يوضح الغرض من الدفع. ملؤه يدويًا بطيء، ورقم واحد خاطئ يرسل المال إلى المكان الخطأ.

معرّف URI لطلب الدفع هو ذلك النموذج بعد أن يملأه المتجر. ورمز QR هو صورة لهذا النموذج. تقرأ كاميرا هاتفك الصورة، وتنسخ المحفظة كل خانة إلى مكانها، ثم تتحقق أنت من الأرقام وتوقّع.

الرابط في صفحة ويب يؤدي المهمة نفسها. النقر عليه يسلّم النموذج المملوء إلى محفظتك.

## نظرة معمّقة

### مثال حقيقي

إليك مثالًا من ZIP 321، مكتوبًا لشبكة الاختبار (testnet):

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

يطلب هذا المثال 1 ZEC إلى عنوان Sapling محمي واحد. تُفكّ المذكرة إلى «This is a simple memo.». أما الرسالة «Thank you for your purchase» فهي النص الذي تعرضه المحفظة على الشاشة.

### القواعد التي تتحقق منها المحفظة

تنسيق المبلغ صارم. القيمتان `amount=0.5` و`amount=50` صالحتان. أما `amount=50,000.00` و`amount=.5` و`amount=0.123456789` فغير صالحة: النقطة هي الفاصل العشري الوحيد، ولا يمكن أن يتجاوز عدد الخانات بعدها 8. ولا يمكن لأي مبلغ أن يتجاوز 21,000,000 ZEC.

في معرّف URI الخام، تُرمَّز المذكرة بـ base64url، ويمكن أن تحتوي على ما يصل إلى 512 بايت بعد فك ترميزها. إرفاق مذكرة بعنوان شفاف (transparent) يجعل الطلب بأكمله غير صالح، لأن العناوين الشفافة لا يمكنها حمل مذكرات. عناوين Sprout غير مسموح بها إطلاقًا، ويجب رفض أي طلب لا يتبع قواعد ZIP 321.

يوجد حقلان إضافيان غير المذكورين في الجدول أعلاه. `message` هو وصف للدفع لتعرضه المحفظة. و`req-asset` محجوز للأصول المخصصة (Custom Assets)، كما هو محدد في ZIP 227.

### الدفع لعدة أشخاص في آن واحد

تحصل كل عملية دفع إضافية على رقم فهرس يُضاف إلى أسماء معاملاتها، مثل `address.1` و`amount.1` و`memo.1`. تبني المحفظة معاملة واحدة تدفع لكل من في القائمة. وهذا مفيد عند الدفع في متجر يقسّم المبلغ، أو لمجموعة تبرعات تُرسل معًا.

### من أين جاء هذا التنسيق

لدى Bitcoin معياران أقدم لطلبات الدفع: BIP 21، وهو رابط بسيط لمستلم واحد، وBIP 70، وهو بروتوكول أثقل للمدفوعات المعقدة. يسلك ZIP 321 طريقًا وسطًا، فهو تنسيق رابط يتسع لعدة مستلمين. بدأ النقاش في عام 2018 في مستودع ZIPs الخاص بـ Zcash، حيث اختير الرقم 321 ليحاكي BIP 21، وأُنشئ ZIP نفسه في أغسطس 2020.

## صفحات ذات صلة

- [المذكرات](/using-zcash/memos): الغرض من حقل المذكرة في طلب الدفع.
- [معالجات الدفع](/using-zcash/payment-processors): خدمات تتولى المدفوعات نيابةً عن المتاجر.
- [المحافظ](/using-zcash/wallets): استخدم مرشّح «طلب الدفع» للعثور على المحافظ التي تقرأ هذه الروابط.
- [الأصول المحمية في Zcash](/zcash-tech/zcash-shielded-assets): الأصول المخصصة التي يشير إليها `req-asset`.
- [ما هي عناوين TEX في Zcash؟](/using-zcash/transparent-exchange-addresses): قاعدة أخرى للعناوين تقرؤها محفظتك قبل أن تدفع.

**آخر تحديث:** أكتوبر 2026
