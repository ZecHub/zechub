# الأسئلة الشائعة

قائمة بالأسئلة الأكثر شيوعًا حول Zcash. لاستكشاف أخطاء عميل Zcash وإصلاحها، يُرجى الاطلاع على [دليل استكشاف الأخطاء وإصلاحها الرسمي](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### تنقّل سريع

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">ما هو Zcash؟</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">كيف يمكنني الحصول على Zcash؟</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">ما الفرق عن العملات المشفرة الأخرى؟</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">حوكمة البروتوكول؟</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">أين معاملتي؟</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">هل Zcash خاص حقًا؟</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">مفاهيم خاطئة شائعة</a>
</div>

---

## ما هو Zcash؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash عملة رقمية تتميز بمعاملات سريعة وسرية ورسوم منخفضة. الخصوصية هي الميزة الأساسية لـ Zcash. وكان رائدًا في استخدام براهين المعرفة الصفرية لتشفير جميع المعاملات.

تتوفر عدة محافظ لمدفوعات فورية وآمنة وخاصة عبر الهاتف المحمول: [المحافظ](/using-zcash/wallets)

</div>

## كيف يمكنني الحصول على Zcash؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

يمكنك شراء ZEC من [المنصات الحاضنة للأصول](/using-zcash/custodial-exchanges)، أو [منصات DEX](/dex)، أو [منصات المبادلة المركزية](/using-zcash/centralizedswaps).

يمكنك أيضًا شراء Zcash من نظير إلى نظير أو الحصول عليه عبر التعدين.

</div>

## ما الفرق بين Zcash والعملات المشفرة الأخرى؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash أكثر خصوصيةً بصورة جوهرية من Bitcoin أو Ethereum. ويوفر أوقات كتل سريعة (75 ثانية)، ورسومًا منخفضة، وترقيات منتظمة.

يمكن للمستخدمين الاختيار بين معاملات **شفافة** أو **محميّة**. لمزيد من المعلومات، راجع [نظام بيئي محمي](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## كيف تُدار بروتوكول Zcash؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

يُدار البروتوكول من خلال عملية **اقتراح تحسين Zcash (ZIP)**. يمكن لأي شخص تقديم مسودة ZIP. يناقش المجتمع المسودات، ثم يقبلها أو يرفضها محررو ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

تُدوَّن القرارات في المواصفات ويجري إقرارها على السلسلة عندما تعتمدها الشبكة.

</div>

## أين معاملتي؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

اقرأ أولًا [دليلنا لمستكشفات الكتل](/guides/blockchain-explorers). ثم تحقّق من [Zcashمستكشف الكتل](https://zcashblockexplorer.com).

تنتهي صلاحية المعاملات بعد نحو 25 دقيقة (20 كتلة)، وتُعاد الأموال تلقائيًا.

**الأسباب الشائعة لعدم ظهور معاملة:**

- فقدان الاتصال
- رسوم المعاملة منخفضة جدًا
- ازدحام الشبكة
- عدد كبير جدًا من المدخلات الشفافة (حجم كبير جدًا)

**نصائح للنجاح:**

- استخدم اتصالًا مستقرًا
- ادفع الرسوم القياسية (أو أعلى للأولوية)
- انتظر ثم أعد المحاولة لاحقًا
- استخدم مدخلات أقل للحفاظ على صغر حجم المعاملة

</div>

## هل Zcash خاص حقًا؟

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**نعم.** يشفّر Zcash بيانات المرسل والمبلغ والمستلم للمعاملات المحميّة.

Zcash **لا** يقوم بما يلي:

- تشفير المعاملات متعددة التوقيع (تكامل FROST قيد الانتظار)
- الحماية من الارتباطات بالمعاملات الشفافة
- إخفاء عناوين IP

للقراءة الإضافية: [نظام بيئي محمي](https://electriccoin.co/blog/shielded-ecosystem)

</div>

## بعض المفاهيم الخاطئة الشائعة

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">المفهوم الخاطئ</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">الإجابة الصحيحة</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">هل Zcash عملة مركزية؟</td>
      <td className="py-4 px-5 text-foreground">لا. تمنع اتفاقية العلامة التجارية Zcash Foundation أو ECC من التصرف خلافًا لإجماع المجتمع. ثبت أن الحوكمة لامركزية (راجع [تقرير Messari](https://messari.io/report/decentralizing-zcash)). تتيح استطلاعات المجتمع وZecHub وA/V Club التابع لـ Zcash Foundation جميعها مشاركة واسعة.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">هل لدى Zcash باب خلفي؟</td>
      <td className="py-4 px-5 text-foreground">لا. لا يحتوي Zcash ولا أي برنامج تشفير أنشأناه على باب خلفي، ولن يحتوي عليه أبدًا.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">هل تتحكم شركة في Zcash؟</td>
      <td className="py-4 px-5 text-foreground">غير صحيح. رغم أننا نتعاون مع شركات في الأبحاث، يظل Zcash ملتزمًا باللامركزية. تعمل عدة منظمات مستقلة معًا من أجل الحفظ الذاتي وحقوق الخصوصية.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">لدى Zcash خصوصية محدودة مقارنةً بعملات الخصوصية الأخرى</td>
      <td className="py-4 px-5 text-foreground">لا. تعتمد الخصوصية بأسلوب Monero/Grin على الطعوم (التي يمكن التغلب عليها). يشفّر Zcash جميع بيانات المعاملات المحميّة، لذا لا يمكن تمييز كل معاملة في المجمّع عن غيرها. راجع [أليست خاصة بما يكفي؟](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**آخر تحديث:** مارس 2026
**هل ترغب في المساهمة؟** [حرّر هذه الصفحة على GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
