# دليل الترحيل: من zcashd إلى Zebrad/Zallet

يشهد نظام Zcash البيئي تطورًا مستمرًا. إذ يجري تدريجيًا استبدال عقدة Zcashd الكاملة التقليدية، التي تتولى صيانتها *Electric Coin Company (ECC)* / *Zodl*، بكلٍّ من Zebra و Zallet.

- Zebra هو تنفيذ حديث لبروتوكول Zcash بلغة Rust طورته Zcash Foundation
- Zallet هي محفظة خفيفة صُممت للتكامل بسلاسة مع عقد Zebra التي طورتها Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![صورة ChatGPTOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

يرشدك هذا الدليل خلال عملية الترحيل من **Zcashd** إلى **Zebrad** و **Zallet**، بما في ذلك الإعداد، واستيراد المحفظة، واستكشاف مشكلات الترحيل الشائعة وإصلاحها.

---

## أعلن مشروع Zcash رسميًا أن zcashd سيتم إيقافه في 2025.

**حالة الإيقاف وما الذي يعنيه ذلك**

- أعلن مشروع Zcash رسميًا أن zcashd سيتم إيقافه في 2025.
- يجري ترحيل العقد الكاملة إلى Zebrad، وهو تنفيذ بلغة Rust، بينما يُقصد بـ Zallet أن يخلف مكوّن المحفظة في zcashd. 
- واستجابةً لذلك، يتتبع مشروع Zebra مرحلة "إيقاف Zcashd" لضمان التوافق، وترحيل RPC، ودعم النظام البيئي.
- بالنسبة إلى العديد من أساليب RPC، سيهدف Zebrad/Zallet إلى أن يكونا بديلين مباشرين (من خلال محاكاة السلوك أو مطابقته). أما البعض الآخر فسيتغير أو قد لا يكون مدعومًا.

**لماذا الترحيل - إلى ما بعد الإيقاف**

حتى إذا وضعنا مسألة الإيقاف جانبًا، فهناك أسباب قوية للانتقال:
- الأمان والموثوقية: يخفف أمان الذاكرة في Rust وأدواتها الحديثة من مخاطر الثغرات الأمنية.
- الأداء والكفاءة: صُمم Zebrad للاستفادة من التوازي، واستخدام الموارد بكفاءة أعلى، ومزامنة أسرع.
- البنية المعيارية: يوفّر فصل منطق العقدة (Zebrad) عن واجهة المحفظة (Zallet) حدودًا أوضح ومسارات ترقية أفضل.
- التوافق المستقبلي مع النظام البيئي: ستستهدف الأدوات والتحسينات وبقية نظام Zcash البيئي بشكل متزايد Zebrad/Zallet.
- راحة البال: تجنب أن تجد نفسك عالقًا مع مكوّن متوقف وغير مدعوم.

### والآن دعنا نتعمق في دليل الترحيل

**1. انسخ كل شيء احتياطيًا**
* انسخ احتياطيًا ملف wallet.dat (أو أي ملف محفظة / مخزن مفاتيح آخر) من عقدة zcashd الخاصة بك.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* احفظ ملف zcash.conf وأي إعدادات مخصصة.
* صدّر نسخة من أي نصوص RPC برمجية أو عمليات أتمتة تستخدمها.
* تحقّق من صحة النسخ الاحتياطية (على سبيل المثال، في بيئة أخرى، حاول فتحها أو فحصها).
* راجع أساليب JSON-RPC التي تعتمد عليها حاليًا.
* قارن ذلك بجدول التوافق المخطط له والمُدار على [موقع دعم Zcash](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* استعد للتغييرات أو للأساليب غير المتوفرة (قد يحتاج بعضها إلى حلول بديلة أو تكييف).

**2. متطلبات النظام ومساحة القرص**
* تأكد من توفر مساحة قرص كافية (سلسلة Zcash كبيرة). على الأقل 10 GB من المساحة الحرة.
* تأكد من أن جهازك يتمتع بشبكة مستقرة، ووحدة CPU، وذاكرة RAM.
* اتصال بالإنترنت 
* إذا كنت تخطط للترجمة من الشيفرة المصدرية، فتأكد من تثبيت Rust و Cargo.

**3. تثبيت / إعداد Zebrad**
يمكنك إما تنزيل ملف ثنائي جاهز أو البناء من الشيفرة المصدرية.
* تنشر Zcash Foundation إصدارات وملفات ثنائية لـ Zebra. على سبيل المثال، قد تستخدم برنامج تثبيت نصيًا أو تنزّل الملف الثنائي المناسب لنظام التشغيل لديك.

* لاحظ أنه في الإصدارات الحديثة من Zebra، [لم تعد نقطة نهاية RPC مفعّلة افتراضيًا في Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**الخيار A: التثبيت عبر ملف ثنائي جاهز**  
على **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

يؤدي هذا إلى تثبيت أحدث إصدار مستقر من zebrad.

**الخيار B: البناء من الشيفرة المصدرية**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

بعد البناء، انقل الملف الثنائي إلى المسار الخاص بك:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![الترحيل 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. الإعداد والتشغيل**  
أنشئ إعدادًا افتراضيًا:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

عدّل **zebrad.toml** وفق تفضيلاتك (عنوان الاستماع، والمنافذ، ودليل الحالة، والتخزين المؤقت).

**ابدأ تشغيل العقدة:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![صورة](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

ستبدأ العقدة في المزامنة من كتلة التكوين genesis - توقّع أن يستغرق ذلك عدة ساعات (أو أكثر) حسب العتاد والشبكة.

**5. تثبيت / إعداد Zallet (المحفظة)**

صُممت Zallet لتحل محل جزء المحفظة في zcashd.

تحقق من صفحة GitHub / الإصدارات الخاصة بـ Zallet للحصول على الملفات الثنائية.

**أو ابنِها من الشيفرة المصدرية:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![صورة](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* شغّل واجهة GUI أو CLI (بحسب ما يوفره التثبيت لديك).
* اضبطها للاتصال بعقدة Zebrad المحلية عبر نقطة نهاية RPC أو API.

**6. استيراد محفظة zcashd الخاصة بك إلى Zallet**  
عبر تفريغ المفتاح الخاص

على zcashd، صدّر مفاتيحك الخاصة:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* في Zallet، اختر استيراد المفاتيح أو خيارًا مشابهًا.
* وجّهها إلى **zcashd_keys.txt**. 
* ينبغي أن تقوم Zallet بتحليل عناوين ZEC والمفاتيح المرتبطة بها واستيرادها.

**عبر عبارة الاسترداد** (إن كان ذلك ينطبق)

* إذا كانت محفظتك تدعم النسخ الاحتياطي عبر عبارة استرداد، فاستخدم الاستعادة من عبارة الاسترداد في Zallet.
* لا يعمل هذا إلا إذا كانت محفظة zcashd الخاصة بك مشتقة من عبارة استرداد (أو كانت لديك آلية تحويل لعبارة الاسترداد).

**إعادة فحص المحفظة والمزامنة**

* بمجرد استيراد المفاتيح، ستقوم Zallet بتشغيل إعادة فحص للسلسلة عبر Zebrad.
* امنح Zallet بعض الوقت لإعادة بناء رصيدك وسجل معاملاتك.

**7. التحقق من الأرصدة والمزامنة**

بمجرد اكتمال الاستيراد، ستتصل Zallet بعقدة Zebrad الخاصة بك وتعيد فحص سلسلة الكتل.
وعندما تكتمل المزامنة، يجب أن تظهر أرصدتك ومعاملاتك تمامًا كما كانت من قبل.

يمكنك التحقق من حالة مزامنة عقدتك عبر تشغيل:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![صورة](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

أو تحقّق من السجلات.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![صورة](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. استكشاف المشكلات وإصلاحها**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">المشكلة</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">السبب المحتمل</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">الحل</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad لا يبدأ التشغيل</td>
        <td className="px-6 py-4">المنفذ قيد الاستخدام أو الإعداد غير صحيح</td>
        <td className="px-6 py-4">تحقق من **zebrad.toml** واستخدم منفذًا متاحًا</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">مزامنة بطيئة</td>
        <td className="px-6 py-4">ازدحام في الشبكة</td>
        <td className="px-6 py-4">تأكد من استقرار الإنترنت، وأعد تشغيل Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">المحفظة تفتقد بعض المعاملات</td>
        <td className="px-6 py-4">استيراد جزئي للمفاتيح</td>
        <td className="px-6 py-4">أعد استيراد المفاتيح أو أعد الفحص في Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet لا يستطيع الاتصال بالعقدة</td>
        <td className="px-6 py-4">العقدة لا تعمل أو أن نقطة النهاية غير صحيحة</td>
        <td className="px-6 py-4">ابدأ تشغيل Zebrad وتحقق من منفذ RPC الصحيح</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet يتعطل</td>
        <td className="px-6 py-4">إصدار قديم</td>
        <td className="px-6 py-4">حدّث إلى أحدث إصدار من GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. الخلاصة**

يمنحك الترحيل من zcashd إلى Zebrad و Zallet تجربة Zcash أسرع وأكثر أمانًا وحداثة.
وبفضل الأمان المعتمد على Rust، والتصميم المعياري، والأدوات الأفضل، يضمن هذا الإعداد أن تظل عقدتك ومحفظتك جاهزتين للمستقبل مع استمرار تطور نظام Zcash البيئي.

نصيحة: احتفظ بمفاتيح محفظتك غير متصلة بالإنترنت، وخذ نسخًا احتياطية من بيانات Zallet بانتظام.
زُر [zebra.zfnd.org](https://zebra.zfnd.org) و [zallet.zfnd.org](https://zallet.zfnd.org) للحصول على التحديثات ودعم المجتمع.
