<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# الخصوصية في التعدين والتخزين

العائد الذي تحصل عليه بصفتك مُعدّنًا (miner) والمُنهي (finalizer) الخاص بك ليسا الشيء نفسه. لا تربط السلسلة (chain) بينهما أبدًا.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">المُعدّن</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">دفعة شفافة (transparent)</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">يدفع Coinbase إلى عنوان (address) Zcash. سجل t-address علني.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">المُنهي</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">مفتاح zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">مفتاح ed25519. يوقّع الأصوات. وهو ليس عنوان Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">سند الضمان (bond)</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">حصة محمية (shielded)</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">يوجد في مجمّع (pool) التخزين. ويحدد مُنهيًا مستهدفًا.</p>
  </div>
</div>

## الترتيب المهم

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 عدّن</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 احمِ</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 سند الضمان</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">إذا تخطّيت الحماية فلن تحدث الخطوة الخاصة أبدًا. سند الضمان لا يمحو مخرجات coinbase الشفافة.</p>
</div>

## ما هو علني

| الشيء | علني؟ | السبب |
|---|---|---|
| عنوان t-address للمعدّن وسجل coinbase | نعم | مخرجات شفافة عادية |
| مفتاح المُنهي وzfinv1 | نعم، بمجرد إدراجه في القائمة | يجب أن يكون كذلك للتحقق من الأصوات |
| قوة التصويت وبنك المكافآت | نعم | تُنشر مقابل مفتاح المُنهي كي يمكن تدقيق توزيع الحصص |
| أي عنوان شفاف موّل سند الضمان | لا، بعد الحماية | سند الضمان ينفق notes محمية |
| الصلة بين المعدّن الخاص بك والمُنهي الخاص بك | ليست على السلسلة (on-chain) | لا شيء في البروتوكول يسجّلها |

يُكشف عن المبالغ المخزّنة عمدًا. يتطلب التصميم أن يكون إجمالي المبالغ المخزّنة وتوزيعها على المُنهين قابلين للتحقق علنًا. ويحدّ التكميم (قوى العدد 10) ونوافذ التخزين الثابتة من مقدار المعلومات التي تتسرب عن التوقيت أو الأنماط الفردية، مع الاستمرار في إتاحة ذلك التدقيق. تبقى أرصدة Orchard غير المخزّنة خاصة؛ والتخزين هو الإفصاح المقصود.

## خزّن لنفسك، أو لشخص آخر

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">سند ضمان للمُنهي الخاص بك</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">الخيار الأبسط. تحتفظ بدور المشغّل وبسند الضمان. ومع ذلك لا يستطيع المراقب أن يثبت من بيانات السلسلة وحدها أن t-address وzfinv1 يعودان إلى الشخص نفسه.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">سند ضمان لعضو آخر</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">تظهر قوة التصويت تحت مفتاحه. ويحصل على عمولة المُنهي النشط البالغة 10%. وتحتفظ أنت بنسبة 90% التي تتراكم على سند الضمان. وهذا يُبطل التخمين البديهي بأن المعدّن الذي يتلقى الدفعة الشفافة هو الشخص نفسه الذي يشغّل المُنهي.</p>
  </div>
</div>

يمكن لمجموعة أن تعدّن على عناوين دفع منفصلة، ثم تحمي العملات، وتوزّع سندات الضمان بين أعضائها. وهذا يجعل ادعاء «هذا المعدّن هو هذا المُنهي» أصعب بكثير انطلاقًا من بيانات السلسلة. لكنه لا يخفي هوية المُنهين، ولا يخفي التعدين.

## ما لا يفعله هذا

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">غير مخفي</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>هوية المُنهين</li>
    <li>مقدار قوة التصويت لدى كل منهم</li>
    <li>سجل التعدين الشفاف الخاص بك</li>
    <li>صلة تنشئها أنت خارج السلسلة: عنوان IP واحد، نمط دفع واحد، مشغّل واحد</li>
  </ul>
</div>

يوجد zfinv1 المستهدف داخل إجراء التخزين. تتعلق الخصوصية هنا بمصدر الأموال، لا بإخفاء المفتاح الوجهة.

## النسخة المختصرة

عدّن. احمِ. ثم أنشئ سند الضمان. يبقى عنوان المعدّن ومفتاح المُنهي غير مرتبطين ما لم تربطهما أنت بنفسك.
