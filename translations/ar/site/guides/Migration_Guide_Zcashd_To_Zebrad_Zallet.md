# دليل الترحيل: من zcashd إلى Zebrad/Zallet

استُبدلت العقدة الكاملة (full node) التقليدية لـ zcashd، التي تصونها *Electric Coin Company (ECC)* / *Zodl*، بـ Zebra و Zallet. بلغ zcashd توقّف نهاية الدعم في 18 يوليو 2026 ولم يعد يعمل.

- Zebra هو تنفيذ حديث بلغة Rust لبروتوكول Zcash طوّرته Zcash Foundation
- Zallet هي محفظة (wallet) خفيفة مصمّمة للتواصل بسلاسة مع عقد (node) Zebra، طوّرتها Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![مخطط: انقسام zcashd إلى zebrad لمهام العقدة وZallet لمهام المحفظة](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

يرشدك هذا الدليل خلال الترحيل من **zcashd** إلى **Zebrad** و **Zallet**، بما في ذلك الإعداد واستيراد المحفظة واستكشاف مشكلات الترحيل الشائعة وإصلاحها.

---

## توقّف zcashd عن العمل في 18 يوليو 2026

**ماذا يعني ذلك**

- بلغ zcashd توقّف نهاية الدعم في 18 يوليو 2026. لن يتزامن مع رأس السلسلة (chain) مجددًا، ولا يمكنه إرسال الأموال أو استلامها. هذا أمر قد انتهى بالفعل، وليس مجرد خطة.
- انقسمت مهمتا zcashd الآن: **zebrad** هو العقدة الكاملة، و **Zallet** هو المحفظة.
- Zallet في مرحلة **تجريبية (beta)**. قد تحدث تغييرات جذرية بين الإصدارات، وبعض أساليب JSON-RPC الخاصة بـ zcashd لم تُنفَّذ بعد. تحقّق من [مصفوفة حالة الأساليب](https://zcash.github.io/zallet/) قبل أن تعتمد على استدعاء معيّن.
- إذا كنت لا تزال تحتفظ بأموال في **Sprout**، فاقرأ التحذير في الخطوة 6 أولًا. لا يدعم Zallet المجمّع (pool) Sprout، وكانت الطريقة المعتادة لنقل تلك الأموال تتطلب تشغيل zcashd.

**لماذا الترحيل - ما هو أبعد من الإيقاف**

حتى بغض النظر عن الإيقاف، ثمة أسباب مقنعة للانتقال:
- الأمان والمتانة: يقلّل أمان الذاكرة في Rust والأدوات (tools) الحديثة من مخاطر الثغرات.
- الأداء والكفاءة: صُمّم Zebrad للمعالجة المتوازية، واستخدام أكثر كفاءة للموارد، ومزامنة أسرع.
- بنية معيارية: يوفّر فصل منطق العقدة (Zebrad) عن واجهة المحفظة (Zallet) حدودًا أوضح ومسارات ترقية أفضل.
- التوافق مع النظام البيئي المستقبلي: ستستهدف الأدوات والتحسينات وبقية النظام البيئي لـ Zcash بشكل متزايد Zebrad/Zallet.
- راحة البال: تجنّب أن تبقى عالقًا في تشغيل مكوّن متوقف وغير مدعوم.

### لنبدأ الآن بدليل الترحيل

**1. انسخ كل شيء احتياطيًا**
* انسخ احتياطيًا ملف wallet.dat (أو أي ملف محفظة آخر / مخزن مفاتيح) من عقدة zcashd الخاصة بك.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* احفظ ملف zcash.conf وأي إعدادات مخصّصة.
* صدّر نسخة من أي نصوص RPC برمجية أو أتمتة تستخدمها.
* تحقّق من صلاحية نسخك الاحتياطية (مثلًا في بيئة أخرى، حاول فتحها أو فحصها).
* راجع أساليب JSON-RPC التي تعتمد عليها حاليًا.
* قارن ذلك بجدول التوافق المخطط الذي يُحدَّث على [موقع دعم Zcash](https://z.cash/support/zcashd-deprecation/) 
* استعد للتغييرات أو الأساليب المفقودة (قد يحتاج بعضها إلى حل بديل أو تكييف).

**2. متطلبات النظام ومساحة القرص**
* مساحة القرص هي المتطلب الذي يستهين به الناس. تجاوزت سلسلة Zcash حجم **270 GB** في أغسطس 2026، لذا خصّص ما لا يقل عن **300 GB** من المساحة الحرة، على SSD إن أمكنك.
* تأكّد من أن جهازك يتمتع بشبكة ومعالج وذاكرة RAM مستقرة.
* اتصال بالإنترنت 
* إذا كنت تخطط للتجميع من المصدر، فاحرص على تثبيت Rust و Cargo.

**3. تثبيت / إعداد Zebrad**
يمكنك إما تنزيل ملف ثنائي مُعدّ مسبقًا أو البناء من المصدر.
* تنشر Zcash Foundation الإصدارات والملفات الثنائية لـ Zebra. على سبيل المثال، يمكنك استخدام نص تثبيت برمجي أو تنزيل الملف الثنائي المناسب لنظام تشغيلك.

* لاحظ أنه في إصدارات Zebra الحديثة، [لم تعد نقطة نهاية RPC مفعّلة افتراضيًا في Docker.](https://zfnd.org/zebra-2-3-0-release/)

**الخيار A: التثبيت عبر ملف ثنائي مُعدّ مسبقًا**  
على **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

يثبّت هذا أحدث إصدار مستقر من zebrad.

**الخيار B: البناء من المصدر**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

بعد البناء، انقل الملف الثنائي إلى مسارك:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![الترحيل 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. الإعداد والتشغيل**  
أنشئ ملف إعداد افتراضيًا:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

عدّل **zebrad.toml** وفق تفضيلاتك (عنوان (address) الاستماع، والمنافذ، ودليل الحالة، والتخزين المؤقت).

**شغّل العقدة:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

ستبدأ العقدة المزامنة من كتلة التكوين (genesis) - توقّع عدة ساعات (أو أكثر) حسب العتاد والشبكة.

**5. تثبيت / إعداد Zallet (المحفظة)**

صُمّم Zallet ليحلّ محل جزء المحفظة في zcashd.

تحقّق من صفحة Zallet GitHub / الإصدارات للحصول على الملفات الثنائية.

**أو ابنِه من المصدر:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* شغّل الواجهة الرسومية GUI أو واجهة سطر الأوامر CLI (حسب ما يوفّره تثبيتك).
* اضبطه للاتصال بعقدة Zebrad المحلية عبر RPC أو نقطة نهاية API.

**6. استيراد محفظة zcashd إلى Zallet**

لا تحتاج إلى تشغيل zcashd لهذه الخطوة. يقرأ Zallet ملف `wallet.dat` مباشرة، وهذا مهم لأنه لم يعد بالإمكان تشغيل zcashd.

> **احتفظ بـ `wallet.dat`.** يُبلغ الترحيل عن أي شيء لا يستطيع تمثيله في محفظة Zallet بدلًا من استيراده، وتبقى مادة المفاتيح تلك موجودة فقط في `wallet.dat`. لا تحذفه بعد الترحيل.

شغّل `zallet init-wallet-encryption` أولًا. يستخدم Zallet التشفير (encryption) لحماية مادة المفاتيح بهوية age، ويجب أن تكون تلك الهوية موجودة قبل استيراد أي مفاتيح.

ثم حوّل ملف الإعداد ومحفظتك:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

لا يتوفر `migrate-zcashd-wallet` إلا في الإصدارات المبنية مع ميزة `zcashd-import`، وتتطلب قراءة `wallet.dat` الأداة المساعدة `db_dump` من Berkeley DB 6.2، وهو الإصدار الذي استخدمه zcashd. إذا كان لديك أكثر من ملف محفظة، فشغّل الأمر مرة لكل ملف وأضف `--allow-multiple-wallet-imports` في التشغيلات اللاحقة؛ يصبح كل ملف مجموعة حسابات مستقلة. لا يُنقل `rpcuser` و `rpcpassword` الخاصان بك، لأن JSON-RPC في Zallet يستخدم المصادقة عبر ملفات تعريف الارتباط (cookie) افتراضيًا؛ أضف بيانات الاعتماد باستخدام `zallet add-rpc-user` إذا احتجت إليها.

**ما يُنقل**

* بذور الاسترداد (mnemonic seeds) والمفاتيح المشتقة منها، مع إعادة بناء الحسابات لتطابق محفظة zcashd
* مفاتيح الإنفاق (spending key) المستقلة المستوردة الخاصة بـ Sapling والمفاتيح الشفافة (transparent)
* إدخالات المراقبة فقط الشفافة التي تتضمن مفتاحها العام أو نص الاسترداد (redeem script)
* تواريخ ميلاد الحسابات، بحيث يبدأ مسح السلسلة عند الارتفاع الصحيح

**ما لا يُنقل.** يُبلَّغ عن هذه العناصر مع أعدادها بدلًا من استيرادها:

* **مفاتيح الإنفاق والأموال الخاصة بـ Sprout.** لا يدعم Zallet المجمّع Sprout. كان المسار الموثّق هو نقل أموال Sprout باستخدام zcashd قبل إيقافه، ولم يعد ذلك ممكنًا. إذا كان هذا يؤثّر عليك، فاسأل في [قناة Zcash R&D على Discord](https://discord.gg/xpzPR53xtU) أو في [منتدى المجتمع](https://forum.zcashcommunity.com/) قبل القيام بأي شيء آخر.
* إدخالات دفتر العناوين (address)
* إدخالات المراقبة فقط المخزّنة دون مفتاح عام أو نص استرداد، والإدخالات ذات المفاتيح العامة غير المضغوطة
* محافظ Regtest

**النسخ الاحتياطي بعد ذلك.** لا تُعدّ عبارة الاسترداد وحدها نسخة احتياطية كاملة، لأن المفاتيح المستوردة موجودة فقط في قاعدة بيانات المحفظة. احتفظ بنسخ آمنة من `wallet.db`، ومن ملف هوية تشفير age المحدّد في الخيار `keystore.encryption_identity`، ومن عبارة الاسترداد الخاصة بك، واحتفظ بملف `wallet.dat` الأصلي. لاحظ أن `wallet.db` نفسه غير مشفّر: فهو يحتوي على سجل معاملاتك (transaction) ومفاتيح العرض (viewing key) بنص واضح، لذا خزّن النسخة الاحتياطية في مكان آمن.

**إعادة مسح المحفظة والمزامنة**

* بمجرد استيراد المفاتيح، سيبدأ Zallet إعادة مسح السلسلة عبر Zebrad.
* امنح Zallet بعض الوقت لإعادة بناء رصيدك وسجل معاملاتك.

**7. التحقق من الأرصدة والمزامنة**

بعد الاستيراد، سيتصل Zallet بعقدة Zebrad الخاصة بك ويعيد مسح سلسلة الكتل (blockchain).
عند اكتمال المزامنة، يُفترض أن تظهر أرصدتك ومعاملاتك تمامًا كما كانت من قبل.

يمكنك التحقق من حالة مزامنة عقدتك بتشغيل:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

أو تحقّق من السجلات.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. استكشاف الأخطاء وإصلاحها**

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
        <td className="px-6 py-4">المنفذ قيد الاستخدام أو إعداد خاطئ</td>
        <td className="px-6 py-4">تحقّق من **zebrad.toml** واستخدم منفذًا حرًا</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">مزامنة بطيئة</td>
        <td className="px-6 py-4">ازدحام الشبكة</td>
        <td className="px-6 py-4">تأكّد من استقرار الإنترنت، وأعد تشغيل Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">معاملات مفقودة في المحفظة</td>
        <td className="px-6 py-4">استيراد جزئي للمفاتيح</td>
        <td className="px-6 py-4">أعد استيراد المفاتيح أو أعد المسح في Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet لا يستطيع الاتصال بالعقدة</td>
        <td className="px-6 py-4">العقدة لا تعمل أو نقطة النهاية خاطئة</td>
        <td className="px-6 py-4">شغّل Zebrad وتحقّق من صحة منفذ RPC</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet يتعطّل</td>
        <td className="px-6 py-4">إصدار قديم</td>
        <td className="px-6 py-4">حدّث إلى أحدث إصدار من GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. الخلاصة**

يمنحك الترحيل من zcashd إلى Zebrad و Zallet تجربة Zcash أسرع وأكثر أمانًا وحداثة.
بفضل الأمان القائم على Rust، والتصميم المعياري، والأدوات الأفضل، يضمن هذا الإعداد بقاء عقدتك ومحفظتك جاهزتين للمستقبل مع استمرار تطوّر النظام البيئي لـ Zcash.

نصيحة: احتفظ بمفاتيح محفظتك دون اتصال بالإنترنت، وانسخ بيانات Zallet احتياطيًا بانتظام.
زر [zebra.zfnd.org](https://zebra.zfnd.org) للاطلاع على Zebra، و [كتاب Zallet](https://zcash.github.io/zallet/) أو [مستودع Zallet](https://github.com/zcash/zallet) للاطلاع على Zallet. يُعدّ فصل [الترحيل من zcashd](https://zcash.github.io/zallet/) في كتاب Zallet المرجع المعتمد للخطوة 6.
