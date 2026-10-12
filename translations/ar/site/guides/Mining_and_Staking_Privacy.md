<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# خصوصية التعدين والتخزين

دفعة عائدات التعدين والمُصادِق النهائي ليسا الشيء نفسه. لا تربط السلسلة بينهما مطلقًا. هذا مفيد، ومن السهل إهداره.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">المُعدِّن</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">دفعة شفافة</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">تدفع Coinbase إلى عنوان Zcash. سجل عناوين t علني.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">المُصادِق النهائي</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">مفتاح zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">مفتاح ed25519. يوقّع الأصوات. ليس عنوان Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">السند</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">حصة محمية</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">توجد في مجمع التخزين. تحدد مُصادِقًا نهائيًا مستهدفًا.</p>
  </div>
</div>

## الترتيب المهم

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 التعدين</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 الحماية</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 السند</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">تخطَّ الحماية ولن تحدث الخطوة الخاصة مطلقًا. لا يمحو السند مكافأة coinbase شفافة.</p>
</div>

## ما هو علني

| الشيء | علني؟ | السبب |
|---|---|---|
| عنوان t الخاص بالمُعدِّن وسجل coinbase | نعم | مخرجات شفافة عادية |
| مفتاح المُصادِق النهائي وzfinv1 | نعم، بمجرد ظهوره في القائمة | يجب أن يكون كذلك للتحقق من الأصوات |
| قوة التصويت وبنك المكافآت | نعم | منشوران مقابل مفتاح المُصادِق النهائي |
| أي عنوان شفاف موّل سندًا | لا، بعد الحماية | ينفق السند ملاحظات محمية |
| الرابط بين المُعدِّن والمُصادِق النهائي | ليس على السلسلة | لا يكتب البروتوكول شيئًا يربطهما |

## التخزين لنفسك أو لشخص آخر

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">اربط السند بمُصادِقك النهائي</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">الأبسط. تحتفظ بدور المشغّل والسند. لا يزال المراقب غير قادر على إثبات أن عنوان t وzfinv1 يعودان للشخص نفسه من بيانات السلسلة وحدها.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">اربط السند بعضو آخر</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">تظهر قوة التصويت تحت مفتاحهم. يكسبون عمولة المُصادِق النهائي النشط البالغة 10%. تحتفظ أنت بنسبة 90% المتراكمة على السند. هذا هو النمط الذي يفشل التخمين البديهي.</p>
  </div>
</div>

يمكن لمجموعة أن تعدّن على عناوين دفع منفصلة، ثم تحمي الأموال وتربط السندات عبر الأعضاء. وهذا يجعل الادعاء بأن «هذا المُعدِّن هو هذا المُصادِق النهائي» أصعب بكثير. لكنه لا يخفي هوية المُصادِقين النهائيين، ولا يخفي التعدين.

## ما لا يفعله هذا

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">غير مخفي</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>هوية المُصادِقين النهائيين</li>
    <li>مقدار قوة التصويت لدى كل منهم</li>
    <li>سجل التعدين الشفاف الخاص بك</li>
    <li>رابط تنشئه خارج السلسلة: عنوان IP واحد، نمط دفع واحد، مشغّل واحد</li>
  </ul>
</div>

يوجد zfinv1 المستهدف داخل إجراء التخزين. تتعلق الخصوصية هنا بمصدر الأموال، لا بإخفاء مفتاح الوجهة.

## النسخة المختصرة

عدّن. احمِ الأموال. ثم اربط السند. يظل عنوان المُعدِّن ومفتاح المُصادِق النهائي غير مرتبطين ما لم تربطهما بنفسك.
