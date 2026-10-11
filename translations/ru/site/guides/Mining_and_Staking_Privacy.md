<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Конфиденциальность майнинга и стейкинга

Ваша выплата майнеру и ваш финализатор — не одно и то же. Цепочка никогда не связывает их. Это полезно, и эту возможность легко упустить.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Майнер</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Прозрачная выплата</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase выплачивает на адрес Zcash. История t-адреса является публичной.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Финализатор</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Ключ zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Ключ ed25519. Он подписывает голоса. Это не адрес Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Облигация</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Защищённая ставка</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Находится в пуле стейкинга. Указывает целевого финализатора.</p>
  </div>
</div>

## Важный порядок

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Майнинг</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Экранирование</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Облигация</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Пропустите экранирование — и приватного шага не будет. Облигация не стирает прозрачную coinbase-транзакцию.</p>
</div>

## Что является публичным

| Сущность | Публичная? | Почему |
|---|---|---|
| t-адрес майнера и история coinbase | Да | Обычные прозрачные выходы |
| Ключ финализатора и zfinv1 | Да, после появления в реестре | Это необходимо для проверки голосов |
| Сила голоса и банк вознаграждений | Да | Публикуются для ключа финализатора |
| Какой прозрачный адрес профинансировал облигацию | Нет, после экранирования | Облигация расходует защищённые notes |
| Связь между вашим майнером и финализатором | Не в цепочке | Протокол нигде её не записывает |

## Ставка себе или другому участнику

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Облигация для собственного финализатора</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Самый простой вариант. Вы сохраняете роль оператора и облигацию. Наблюдатель всё равно не сможет доказать только по данным цепочки, что t-адрес и zfinv1 принадлежат одному человеку.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Облигация для другого участника</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Сила голоса отображается под их ключом. Они получают 10% комиссии активного финализатора. Вы сохраняете 90%, которые начисляются на облигацию. Именно этот подход разрушает очевидное предположение.</p>
  </div>
</div>

Группа может майнить на отдельных адресах выплат, экранировать средства и распределять облигации между участниками. Поэтому утверждать, что «этот майнер — этот финализатор», становится гораздо сложнее. Это не скрывает, кто является финализаторами, и не скрывает майнинг.

## Чего это не делает

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Не скрывается</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Кто является финализаторами</li>
    <li>Какой силой голоса обладает каждый из них</li>
    <li>Ваша прозрачная история майнинга</li>
    <li>Связь, созданная вами вне цепочки: один IP, один шаблон выплат, один оператор</li>
  </ul>
</div>

Целевой zfinv1 находится внутри действия стейкинга. Конфиденциальность здесь касается источника средств, а не сокрытия ключа назначения.

## Кратко

Майните. Экранируйте. Затем создавайте облигацию. Адрес майнера и ключ финализатора остаются несвязанными, пока вы сами их не свяжете.
