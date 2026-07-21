# الأسئلة الشائعة

قائمة بأكثر الأسئلة شيوعًا حول Zcash. لاستكشاف مشكلات عميل Zcash وإصلاحها، يُرجى الاطلاع على [دليل استكشاف الأخطاء الرسمي](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### تنقّل سريع
[ما هو Zcash؟](#what-is-zcash) | [كيفية الحصول على Zcash؟](#acquire) | [ما الفرق بينه وبين العملات المشفرة الأخرى؟](#difference) | [كيف تُدار حوكمة البروتوكول؟](#governance) | [أين معاملتي؟](#transaction) | [هل Zcash خاص فعلًا؟](#privacy) | [مفاهيم خاطئة شائعة](#misconceptions)

---

## ما هو Zcash؟

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash هو عملة رقمية تتميز بمعاملات سريعة وسرية ورسوم منخفضة. الخصوصية هي الميزة الأساسية في Zcash. وكان رائدًا في استخدام إثباتات المعرفة الصفرية لتشفير جميع المعاملات.  

تتوفر عدة محافظ لمدفوعات فورية وآمنة وخاصة عبر الهاتف المحمول: [المحافظ المحمولة](https://z.cash/wallets/)
</div>

## كيف يمكنني الحصول على Zcash؟

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
يمكنك شراء ZEC من [منصات التداول](https://z.cash/exchanges) الخاصة بالعملات المشفرة.  
كما يمكنك أيضًا شراء Zcash من نظير إلى نظير أو الحصول عليه عبر التعدين.
</div>

## ما الفرق بين Zcash والعملات المشفرة الأخرى؟

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
يتميز Zcash بخصوصية أعلى جوهريًا من Bitcoin أو Ethereum. فهو يوفر أوقات كتل سريعة (75 ثانية)، ورسومًا منخفضة، وترقيات منتظمة.  

يمكن للمستخدمين الاختيار بين المعاملات **الشفافة** أو **المحمية**. لمزيد من المعلومات، راجع [منظومة محمية](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## كيف تُدار حوكمة بروتوكول Zcash؟

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
تُدار حوكمة البروتوكول من خلال عملية **Zcash Improvement Proposal (ZIP)**. يمكن لأي شخص تقديم مسودة ZIP. تناقَش المسودات من قبل المجتمع وتُقبل أو تُرفض من قِبل محرري ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

تُدوَّن القرارات في المواصفات ويُصادَق عليها على السلسلة عندما تعتمدها الشبكة.
</div>

## أين معاملتي؟

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
اقرأ أولًا [دليلنا إلى مستكشفات الكتل](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). ثم تحقّق من [Zcash Block Explorer](https://zcashblockexplorer.com).  

تنتهي صلاحية المعاملات بعد نحو 25 دقيقة (20 كتلة)، وتُعاد الأموال تلقائيًا.  

**الأسباب الشائعة لعدم ظهور المعاملة:**
- فقدان الاتصال
- رسوم المعاملة منخفضة جدًا
- ازدحام الشبكة
- عدد كبير جدًا من المدخلات الشفافة (الحجم كبير جدًا)

**نصائح للنجاح:**
- استخدم اتصالًا مستقرًا
- ادفع الرسوم القياسية (أو أعلى للأولوية)
- انتظر ثم أعد المحاولة لاحقًا
- استخدم عددًا أقل من المدخلات للحفاظ على صغر حجم المعاملة
</div>

## هل Zcash خاص فعلًا؟

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**نعم.** يقوم Zcash بتشفير بيانات المُرسِل والمبلغ والمستلم للمعاملات المحمية.  

لا يقوم Zcash **بما يلي**:
- تشفير المعاملات متعددة التوقيع (تكامل FROST قيد الانتظار)
- الحماية من الارتباطات مع المعاملات الشفافة
- إخفاء عناوين IP

للمزيد من القراءة: [منظومة محمية](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## بعض المفاهيم الخاطئة الشائعة

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">مفهوم خاطئ</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">الإجابة الصحيحة</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">هل Zcash عملة مركزية؟</td>
        <td className="py-5 px-6 text-foreground">لا. تمنع اتفاقية العلامة التجارية Zcash Foundation أو ECC من التصرف خلافًا لإجماع المجتمع. وقد ثبت أن الحوكمة لامركزية (راجع [تقرير Messari](https://messari.io/report/decentralizing-zcash)). كما تتيح استطلاعات المجتمع وZecHub وZcash Foundation A/V Club مشاركة واسعة.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">هل يحتوي Zcash على باب خلفي؟</td>
        <td className="py-5 px-6 text-foreground">لا. لا يحتوي Zcash ولا أي برنامج تشفير قمنا ببنائه على باب خلفي، ولن يحتوي عليه أبدًا.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">هل تتحكم شركة ما في Zcash؟</td>
        <td className="py-5 px-6 text-foreground">هذا غير صحيح. رغم أننا نتعاون مع شركات في مجال البحث، فإن Zcash يظل ملتزمًا باللامركزية. تعمل عدة منظمات مستقلة ذاتيًا معًا من أجل الحفظ الذاتي وحقوق الخصوصية.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">تتمتع Zcash بخصوصية محدودة مقارنة بعملات الخصوصية الأخرى</td>
        <td className="py-5 px-6 text-foreground">لا. تعتمد الخصوصية على نمط Monero/Grin على الطعوم (ويمكن التغلب عليها). يقوم Zcash بتشفير جميع بيانات المعاملات المحمية بحيث تكون كل معاملة في المجمّع غير قابلة للتمييز عن غيرها. راجع [ليست خاصة بما يكفي؟](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

**آخر تحديث:** March 2026  
**هل تريد المساهمة؟** [عدّل هذه الصفحة على GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
