# دليل الترحيل: من zcashd إلى Zebrad/Zallet

تم استبدال العقدة الكاملة التقليدية zcashd، التي كانت تحت صيانة *Electric Coin Company (ECC)* / *Zodl*، بـ Zebra وZallet. وصل zcashd إلى توقف نهاية الدعم في 18 يوليو 2026 ولم يعد يعمل.

- Zebra هو تطبيق حديث بلغة Rust لبروتوكول Zcash طوّرته Zcash Foundation
- Zallet هي محفظة خفيفة صُممت للتكامل بسلاسة مع عقد Zebra وطوّرتها Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![مخطط: انقسام zcashd إلى zebrad لمهام العقدة وZallet لمهام المحفظة](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

يرشدك هذا الدليل خلال الترحيل من **Zcashd** إلى **Zebrad** و**Zallet**، بما في ذلك الإعداد واستيراد المحفظة واستكشاف مشكلات الترحيل الشائعة وإصلاحها.

---

## توقف zcashd عن العمل في 18 يوليو 2026

**ما الذي يعنيه هذا**

- وصل zcashd إلى توقف نهاية الدعم في 18 يوليو 2026. ولن يتزامن مع أحدث كتلة في السلسلة مجددًا، ولا يمكنه إرسال الأموال أو تلقيها. هذا أمر منتهٍ وليس مخططًا له.
- انقسمت مهمتا zcashd الآن: **zebrad** هو العقدة الكاملة، و**Zallet** هي المحفظة.
- Zallet في مرحلة **beta**. قد تحدث تغييرات غير متوافقة بين الإصدارات، ولم تُنفذ بعض أساليب JSON-RPC الخاصة بـ zcashd بعد. تحقق من [مصفوفة حالة الأساليب](https://zcash.github.io/zallet/) قبل الاعتماد على استدعاء محدد.
- إذا كنت لا تزال تحتفظ بأموال **Sprout**، فاقرأ التحذير في الخطوة 6 أولًا. لا يدعم Zallet مجموعة Sprout، وكانت الطريقة المعتادة لنقل تلك الأموال تتطلب تشغيل zcashd.

**لماذا الترحيل — إلى جانب الإيقاف**

حتى مع تجاهل الإيقاف، توجد أسباب مقنعة للانتقال:
- الأمان والمتانة: تقلل سلامة الذاكرة في Rust والأدوات الحديثة من مخاطر الثغرات.
- الأداء والكفاءة: صُمم Zebrad للتوازي واستخدام الموارد بكفاءة أكبر والمزامنة الأسرع.
- البنية المعيارية: يوفر فصل منطق العقدة (Zebrad) عن واجهة المحفظة (Zallet) حدودًا أوضح ومسارات ترقية أفضل.
- التوافق المستقبلي مع النظام البيئي: ستستهدف الأدوات والتحسينات وبقية منظومة Zcash، بصورة متزايدة، Zebrad/Zallet.
- راحة البال: تجنب الوقوع في استخدام مكوّن متوقف ومهجور وغير مدعوم.

### الآن لنتعمق في دليل الترحيل

**1. انسخ كل شيء احتياطيًا**
* انسخ احتياطيًا ملف wallet.dat (أو أي ملف محفظة / مخزن مفاتيح آخر) من عقدة zcashd الخاصة بك.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* احفظ ملف zcash.conf وأي إعدادات مخصصة.
* صدّر نسخة من أي نصوص RPC برمجية أو أتمتة تستخدمها.
* تحقق من صحة نسخك الاحتياطية (مثلًا، حاول فتحها أو فحصها في بيئة أخرى).
* راجع أساليب JSON-RPC التي تعتمد عليها حاليًا.
* قارن ذلك بجدول التوافق المخطط له والمُدار على [موقع دعم Zcash](https://z.cash/support/zcashd-deprecation/) 
* استعد للتغييرات أو الأساليب المفقودة (فقد يحتاج بعضها إلى حلول بديلة أو تكييف).

**2. متطلبات النظام ومساحة القرص**
* مساحة القرص هي المتطلب الذي يستهين به الناس. تجاوزت سلسلة Zcash **270 GB** في أغسطس 2026، لذا خصص ما لا يقل عن **300 GB** من المساحة الحرة، على SSD إن أمكن.
* تأكد من أن جهازك يتمتع بشبكة مستقرة ووحدة معالجة مركزية وذاكرة RAM كافيتين.
* اتصال بالإنترنت 
* إذا كنت تخطط للترجمة البرمجية من المصدر، فتأكد من تثبيت Rust وCargo.

**3. تثبيت / إعداد Zebrad**
يمكنك إما تنزيل ملف ثنائي مُسبق البناء أو البناء من المصدر.
* تنشر Zcash Foundation الإصدارات والملفات الثنائية لـ Zebra. مثلًا، قد تستخدم نصًا برمجيًا للتثبيت أو تنزّل الملف الثنائي المناسب لنظام التشغيل لديك.

* لاحظ أنه في إصدارات Zebra الحديثة، [لم تعد نقطة نهاية RPC مفعّلة افتراضيًا في Docker.](https://zfnd.org/zebra-2-3-0-release/)

**الخيار أ: التثبيت عبر ملف ثنائي مُسبق البناء**  
على **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

يثبت هذا أحدث إصدار مستقر من zebrad.

**الخيار ب: البناء من المصدر**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

بعد البناء، انقل الملف الثنائي إلى مسارك:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![الترحيل 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. الإعداد والتشغيل**  
أنشئ إعدادًا افتراضيًا:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![الترحيل2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

حرّر **zebrad.toml** وفق تفضيلاتك (عنوان الاستماع، المنافذ، دليل الحالة، التخزين المؤقت).

**شغّل العقدة:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![صورة](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

ستبدأ العقدة بالمزامنة من كتلة التكوين — توقّع أن يستغرق ذلك عدة ساعات (أو أكثر) بحسب العتاد والشبكة.

**5. تثبيت / إعداد Zallet (المحفظة)**

صُممت Zallet لاستبدال جزء المحفظة من zcashd.

تحقق من صفحة GitHub / الإصدارات الخاصة بـ Zallet للحصول على الملفات الثنائية.

**أو ابنِ من المصدر:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![صورة](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* شغّل واجهة المستخدم الرسومية أو CLI (بحسب ما يوفره تثبيتك).
* اضبطها للاتصال بعقدة Zebrad المحلية لديك عبر نقطة نهاية RPC أو API.

**6. استيراد محفظة zcashd الخاصة بك إلى Zallet**

لا تحتاج إلى تشغيل zcashd لهذا الغرض. يقرأ Zallet ملف `wallet.dat` مباشرةً، وهذا مهم لأن zcashd لم يعد قابلًا للتشغيل.

> **احتفظ بـ `wallet.dat`.** يسجل الترحيل أي شيء لا يمكن تمثيله في محفظة Zallet بدلًا من استيراده، وعندئذٍ لا توجد مادة المفتاح تلك إلا في `wallet.dat`. لا تحذفه بعد الترحيل.

شغّل `zallet init-wallet-encryption` أولًا. يشفّر Zallet مادة المفتاح إلى هوية age، ويجب أن تكون تلك الهوية موجودة قبل استيراد أي مفاتيح.

ثم حوّل إعدادك ومحفظتك:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

لا يتوفر `migrate-zcashd-wallet` إلا في الإصدارات التي تتضمن ميزة `zcashd-import`، وتتطلب قراءة `wallet.dat` أداة `db_dump` من Berkeley DB 6.2، وهو الإصدار الذي استخدمه zcashd. إذا كان لديك أكثر من ملف محفظة واحد، فشغّل الأمر مرة واحدة لكل ملف وأضف `--allow-multiple-wallet-imports` في عمليات التشغيل اللاحقة؛ إذ يصبح كل منها مجموعة حسابات خاصة بها. لا تُنقل قيمتا `rpcuser` و`rpcpassword` لأن JSON-RPC الخاص بـ Zallet يستخدم مصادقة ملفات تعريف الارتباط افتراضيًا؛ أضف بيانات الاعتماد باستخدام `zallet add-rpc-user` إذا احتجت إليها.

**ما الذي يُنقل**

* البذور التذكيرية والمفاتيح المشتقة منها، مع إعادة بناء الحسابات لتتطابق مع محفظة zcashd
* مفاتيح إنفاق Sapling المستوردة بصورة مستقلة والمفاتيح الشفافة
* إدخالات المراقبة فقط الشفافة التي تتضمن مفتاحها العام أو نص الاسترداد
* تواريخ بدء الحسابات، لكي يبدأ فحص السلسلة عند الارتفاع الصحيح

**ما الذي لا يُنقل.** يُبلّغ عن هذه العناصر بعددها بدلًا من استيرادها:

* **مفاتيح الإنفاق وأموال Sprout.** لا يدعم Zallet مجموعة Sprout. كان المسار الموثق هو نقل أموال Sprout باستخدام zcashd قبل إيقافه، ولم يعد ذلك ممكنًا. إذا كان هذا يؤثر عليك، فاسأل في [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) أو [منتدى المجتمع](https://forum.zcashcommunity.com/) قبل القيام بأي شيء آخر.
* إدخالات دفتر العناوين
* إدخالات المراقبة فقط المخزنة من دون مفتاح عام أو نص استرداد، والإدخالات ذات المفاتيح العامة غير المضغوطة
* محافظ Regtest

**النسخ الاحتياطي بعد ذلك.** العبارة التذكيرية وحدها ليست نسخة احتياطية كاملة، لأن المفاتيح المستوردة لا توجد إلا في قاعدة بيانات المحفظة. احتفظ بنسخ آمنة من `wallet.db` وملف هوية تشفير age الذي يسميه خيار `keystore.encryption_identity` وعبارتك التذكيرية، واحتفظ بملف `wallet.dat` الأصلي. لاحظ أن `wallet.db` ليس مشفرًا بحد ذاته: فهو يحتفظ بسجل معاملاتك ومفاتيح العرض بصورة مكشوفة، لذا خزّن النسخة الاحتياطية في مكان آمن.

**إعادة فحص المحفظة والمزامنة**

* بمجرد استيراد المفاتيح، سيُشغّل Zallet إعادة فحص للسلسلة عبر Zebrad.
* امنح Zallet بعض الوقت لإعادة بناء رصيدك وسجل معاملاتك.

**7. تحقق من الأرصدة والمزامنة**

بمجرد الاستيراد، سيتصل Zallet بعقدة Zebrad الخاصة بك ويعيد فحص blockchain.
عند اكتمال المزامنة، يجب أن تظهر أرصدتك ومعاملاتك تمامًا كما كانت من قبل.

يمكنك التحقق من حالة مزامنة عقدتك عبر تشغيل:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![صورة](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

أو تحقق من السجلات.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![صورة](/content-images/r1HfVPF6gg-b6b76e9907.webp)
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
        <td className="px-6 py-4">لا يبدأ Zebrad</td>
        <td className="px-6 py-4">المنفذ مستخدم أو الإعداد غير صحيح</td>
        <td className="px-6 py-4">تحقق من **zebrad.toml** واستخدم منفذًا متاحًا</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">مزامنة بطيئة</td>
        <td className="px-6 py-4">ازدحام الشبكة</td>
        <td className="px-6 py-4">تأكد من استقرار الإنترنت، وأعد تشغيل Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">المحفظة تفتقد معاملات</td>
        <td className="px-6 py-4">استيراد مفاتيح جزئي</td>
        <td className="px-6 py-4">أعد استيراد المفاتيح أو أعد الفحص في Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">لا يستطيع Zallet الاتصال بالعقدة</td>
        <td className="px-6 py-4">العقدة لا تعمل أو أن نقطة النهاية خاطئة</td>
        <td className="px-6 py-4">شغّل Zebrad وتحقق من منفذ RPC الصحيح</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">يتعطل Zallet</td>
        <td className="px-6 py-4">إصدار قديم</td>
        <td className="px-6 py-4">حدّث إلى أحدث إصدار من GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. الخلاصة**

يمنحك الترحيل من zcashd إلى Zebrad وZallet تجربة Zcash أسرع وأكثر أمانًا وحداثة.
وبفضل الأمان القائم على Rust والتصميم المعياري والأدوات الأفضل، يضمن هذا الإعداد أن تظل عقدتك ومحفظتك جاهزتين للمستقبل مع استمرار تطور منظومة Zcash.

نصيحة: احتفظ بمفاتيح محفظتك دون اتصال بالإنترنت وأنشئ نسخًا احتياطية من بيانات Zallet بانتظام.
زر [zebra.zfnd.org](https://zebra.zfnd.org) للحصول على Zebra، و[كتاب Zallet](https://zcash.github.io/zallet/) أو [مستودع Zallet](https://github.com/zcash/zallet) للحصول على Zallet. يُعد فصل [الترحيل من zcashd](https://zcash.github.io/zallet/) من كتاب Zallet المرجع المعتمد للخطوة 6.
