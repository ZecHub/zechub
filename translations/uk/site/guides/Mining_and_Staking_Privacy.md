<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# Конфіденційність майнінгу та стейкінгу

Ваша виплата майнеру й ваш фіналізатор — не одне й те саме. Ланцюг ніколи не пов’язує їх. Це корисно, і це легко змарнувати.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Майнер</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Прозора виплата</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase виплачує на адресу Zcash. Історія t-адреси є публічною.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Фіналізатор</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Ключ zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Ключ ed25519. Він підписує голоси. Це не адреса Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Облігація</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Екранований стейк</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Зберігається в пулі стейкінгу. Вказує цільового фіналізатора.</p>
  </div>
</div>

## Порядок, який має значення

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Майніть</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Екрануйте</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Внесіть облігацію</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Пропустіть екранування — і приватний крок ніколи не відбудеться. Облігація не стирає прозору coinbase-транзакцію.</p>
</div>

## Що є публічним

| Річ | Публічно? | Чому |
|---|---|---|
| t-адреса майнера та історія coinbase | Так | Звичайні прозорі виходи |
| Ключ фіналізатора та zfinv1 | Так, щойно він у списку | Це необхідно для перевірки голосів |
| Сила голосу та банк винагород | Так | Опубліковані для ключа фіналізатора |
| Яка прозора адреса профінансувала облігацію | Ні, після екранування | Облігація витрачає екрановані ноти |
| Зв’язок від вашого майнера до вашого фіналізатора | Не в ланцюгу | Протокол нічого про це не записує |

## Стейк для себе або для когось іншого

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Облігація для власного фіналізатора</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Найпростіший варіант. Ви зберігаєте роль оператора й облігацію. Спостерігач усе одно не може довести лише за даними ланцюга, що t-адреса та zfinv1 належать одній людині.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Облігація для іншого учасника</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Сила голосу відображається під його ключем. Він отримує 10% комісії активного фіналізатора. Ви зберігаєте 90%, що накопичуються на облігації. Саме цей шаблон руйнує очевидне припущення.</p>
  </div>
</div>

Група може майнити на окремі адреси виплат, екранувати кошти й розподіляти облігації між учасниками. Це значно ускладнює твердження «цей майнер — цей фіналізатор». Це не приховує, хто є фіналізаторами, і не приховує майнінг.

## Чого це не робить

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Не приховано</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Хто є фіналізаторами</li>
    <li>Яку силу голосу має кожен із них</li>
    <li>Ваша прозора історія майнінгу</li>
    <li>Зв’язок, який ви створюєте поза ланцюгом: одна IP-адреса, один шаблон виплат, один оператор</li>
  </ul>
</div>

Цільовий zfinv1 міститься в дії стейкінгу. Конфіденційність тут стосується джерела коштів, а не приховування ключа призначення.

## Коротко

Майніть. Екрануйте. Потім внесіть облігацію. Адреса майнера й ключ фіналізатора залишаються непов’язаними, доки ви самі не з’єднаєте їх.
