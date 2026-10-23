<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash عناوين URI لطلبات الدفع

## الخلاصة

* عنوان URI لطلب الدفع هو رابط يبدأ بـ `zcash:` ويحمل تفاصيل الدفعة: العنوان، والمبلغ، ومذكرة اختيارية.
* عند مشاركته كرمز QR أو رابط قابل للنقر، يتيح لمحفظتك تعبئة بيانات الدفع نيابةً عنك. تتحقق من التفاصيل ثم توافق.
* يحدد [ZIP 321](https://zips.z.cash/zip-0321) التنسيق. وقد نشأ من BIP 21 الخاص بـ Bitcoin.
* يمكن لطلب واحد أن يدفع لعدة مستلمين ضمن معاملة واحدة.
* يستضيف ZecHub أداة دفع ومُولِّدًا، كي يتمكن المتجر من إضافة زر دفع Zcash دون كتابة URI يدويًا.

## الشرح الأساسي

عنوان URI لطلب الدفع هو رابط `zcash:` يحدده [ZIP 321](https://zips.z.cash/zip-0321). تقرأ المحافظ المتوافقة العنوان والمبلغ والمذكرة الاختيارية من الرابط أو رمز QR، وتملأ معاملة مسبقًا. لا حسابات إضافية ولا معالج وسيط.

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

العرض التوضيحي للأداة هو نافذة ZIP-321 مباشرة: رمز QR، ونسخ العنوان/URI، ورابط قصير، وفتح في المحفظة. صفحة الأدوات هي المُولِّد إذا أردت تحديد عنوانك ومبلغك أولًا.

### البنية

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| الحقل | مطلوب | ملاحظات |
| --- | --- | --- |
| address | نعم | يُفضَّل Unified Address (`u1` / `utest1`) |
| amount | لا | قيمة عشرية بـ ZEC مع استخدام `.` كفاصل، وبحد أقصى 8 منازل عشرية (`0.5`، وليس `0,5`) |
| memo | لا | للعناوين المحمية فقط. بايتات UTF-8 للمذكرة (بحد أقصى 512)، مشفّرة بـ base64url من دون حشو `=`: تصبح `Thanks!` هي `VGhhbmtzIQ`، وليست النص العادي |
| label | لا | اسم مقروء بشريًا تعرضه بعض المحافظ. شفّر المسافات والمحارف المحجوزة بترميز النسبة المئوية (`Coffee%20shop`)؛ أما `+` فهو علامة زائد حرفية، وليس مسافة |

القواعد الكاملة: [ZIP 321](https://zips.z.cash/zip-0321).

### حالات الاستخدام

- إتمام الشراء: املأ السعر ومذكرة الطلب مسبقًا كي يؤكد العميل فقط في محفظته
- الفواتير: شارك رابطًا واحدًا أو رمز QR
- التبرعات: ضمّن الأداة في موقع
- P2P: أرسل رابط `zcash:` في الدردشة

### التضمين في موقع

وجّه هذا السكربت إلى عنوانك المحمي. توجد النسخة المستضافة على ZecHub:

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

### الفيديوهات

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

إضافة أداة تبرعات Zcash إلى موقعك:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="إضافة أداة تبرعات Zcash إلى موقعك"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## تصور / تشبيه

تخيل نموذج تحويل مصرفي يحتوي حقولًا لرقم الحساب والمبلغ وملاحظة توضّح الغرض من الدفعة. تعبئته يدويًا بطيئة، ورقم واحد خاطئ يرسل المال إلى المكان الخطأ.

عنوان URI لطلب الدفع هو ذلك النموذج بعد أن يملؤه المتجر. رمز QR هو صورة للنموذج. تقرأ كاميرا هاتفك الصورة، وتنسخ المحفظة كل حقل إلى موضعه، ثم تتحقق من الأرقام وتوقّع.

الرابط في صفحة ويب يؤدي المهمة نفسها. النقر عليه يسلّم النموذج المعبأ إلى محفظتك.

## تفاصيل معمقة

### مثال حقيقي

إليك مثالًا من ZIP 321، مكتوبًا لشبكة الاختبار:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

يطلب 1 ZEC إلى عنوان Sapling محمي واحد. تُفك شيفرة المذكرة إلى "This is a simple memo." والرسالة "Thank you for your purchase" هي النص الذي تعرضه المحفظة على الشاشة.

### القواعد التي تتحقق منها المحفظة

تنسيق المبلغ صارم. `amount=0.5` و`amount=50` صالحان. أما `amount=50,000.00` و`amount=.5` و`amount=0.123456789` فغير صالحة: النقطة هي الفاصل العشري الوحيد، ولا يمكن أن يوجد أكثر من 8 أرقام بعدها. لا يمكن أن يتجاوز أي مبلغ 21,000,000 ZEC.

في URI الخام، تُشفّر المذكرة بـ base64url، ويمكن أن تحتوي على ما يصل إلى 512 بايت بعد فك التشفير. تجعل المذكرة المرفقة بعنوان شفاف الطلب بأكمله غير صالح، لأن العناوين الشفافة لا يمكنها حمل المذكرات. لا يُسمح بعناوين Sprout إطلاقًا، ويجب رفض أي طلب لا يتبع قواعد ZIP 321.

يوجد حقلان إضافيان بخلاف الجدول أعلاه. `message` هو وصف للدفعة تعرضه المحفظة. أما `req-asset` فهو محجوز للأصول المخصصة، كما هو محدد في ZIP 227.

### الدفع لعدة أشخاص دفعة واحدة

تحصل كل دفعة إضافية على رقم فهرس يُضاف إلى أسماء معلماتها، مثل `address.1` و`amount.1` و`memo.1`. تبني المحفظة معاملة واحدة تدفع للجميع في القائمة. وهذا مفيد عند إتمام شراء يقسم دفعة، أو لمجموعة تبرعات تُرسل معًا.

### مصدر التنسيق

لدى Bitcoin معياران أقدم لطلبات الدفع: BIP 21، وهو رابط بسيط لمستلم واحد، وBIP 70، وهو بروتوكول أثقل للدفعات المعقدة. يسلك ZIP 321 مسارًا وسطًا، وهو تنسيق رابط يتسع لعدة مستلمين. بدأ النقاش في عام 2018 في مستودع ZIPs الخاص بـ Zcash، حيث اختير الرقم 321 لمحاكاة BIP 21، وأنشئ ZIP نفسه في أغسطس 2020.

## صفحات ذات صلة

- [المذكرات](/using-zcash/memos): الغرض من حقل المذكرة في طلب الدفع.
- [معالجو المدفوعات](/using-zcash/payment-processors): خدمات تتولى معالجة المدفوعات للمتاجر.
- [المحافظ](/using-zcash/wallets): استخدم مرشح طلبات الدفع للعثور على المحافظ التي تقرأ هذه الروابط.
- [Zcash الأصول المحمية](/zcash-tech/zcash-shielded-assets): الأصول المخصصة التي يشير إليها `req-asset`.
- [ما هي عناوين TEX الخاصة بـ Zcash؟](/using-zcash/transparent-exchange-addresses): قاعدة أخرى للعناوين تقرؤها محفظتك قبل الدفع.

**آخر تحديث:** أكتوبر 2026
