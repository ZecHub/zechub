# Часті запитання

Список найпоширеніших запитань про Zcash. Для усунення несправностей клієнта Zcash дивіться [офіційний посібник з усунення несправностей](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Швидка навігація

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Що таке Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Як я можу придбати Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Відмінність від інших криптовалют?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Управління протоколом?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Де моя транзакція?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Чи справді Zcash приватний?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Поширені хибні уявлення</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd перестав працювати?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Перенести мій гаманець до Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Що таке Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Який повний вузол?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Знайти термін?</a>
</div>

---

## Що таке Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash — це цифрова валюта зі швидкими, конфіденційними транзакціями та низькими комісіями. Приватність є головною властивістю Zcash. Він першим почав використовувати докази з нульовим розголошенням для шифрування всіх транзакцій.

Для миттєвих, мобільних, безпечних і приватних платежів доступні кілька гаманців: [Гаманці](/using-zcash/wallets)

</div>

## Як я можу придбати Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ви можете купити ZEC на [кастодіальних біржах](/using-zcash/custodial-exchanges), [DEX](/using-zcash/dex) або [централізованих платформах обміну](/using-zcash/centralized-swaps).

Ви також можете придбати Zcash безпосередньо в інших користувачів або отримати його шляхом майнінгу.

</div>

## Чим Zcash відрізняється від інших криптовалют?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash принципово приватніший за Bitcoin або Ethereum. Він пропонує швидкий час створення блоків (75 секунд), низькі комісії та регулярні оновлення.

Користувачі можуть обирати між **прозорими** та **захищеними** транзакціями. Докладніше дивіться в матеріалі [Захищена екосистема](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Як управляється протокол Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Протокол управляється через процес **пропозицій щодо вдосконалення Zcash (ZIP)**. Будь-хто може подати чернетку ZIP. Чернетки обговорює спільнота, а редактори ZIP їх приймають або відхиляють:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Рішення вносяться до специфікації та ратифікуються в блокчейні, коли мережа їх приймає.

</div>

## Де моя транзакція?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Спершу прочитайте [наш посібник із блокчейн-оглядачів](/guides/blockchain-explorers). Потім перевірте [Zcashоглядач блоків](https://mainnet.zcashexplorer.app).

Термін дії транзакцій спливає приблизно через 25 хвилин (20 блоків), а кошти повертаються автоматично.

**Поширені причини, через які транзакція може не з’явитися:**

- Втрата з’єднання
- Надто низька комісія за транзакцію
- Перевантаження мережі
- Забагато прозорих входів (завеликий розмір)

**Поради для успіху:**

- Використовуйте стабільне з’єднання
- Сплачуйте стандартну комісію (або вищу для пріоритетності)
- Зачекайте та повторіть спробу пізніше
- Використовуйте менше входів, щоб транзакція залишалася малою

</div>

## Чи справді Zcash приватний?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Так.** Zcash шифрує дані відправника, суму та дані одержувача для захищених транзакцій.

Zcash **не**:

- Шифрує транзакції з кількома підписами (інтеграція FROST очікується)
- Захищає від кореляцій із прозорими транзакціями
- Приховує IP-адреси

Додатково: [Захищена екосистема](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd перестав працювати, що мені тепер запускати?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd виведено з експлуатації. Версія 6.20.0 завершила роботу на блоці 3417100 18 липня 2026 року й ніколи не підтримувала Ironwood (NU6.3), тож немає пізнішої версії, до якої можна оновитися.

Натомість запускайте стек Z3. Три програми розділяють роботу, яку zcashd раніше виконував самостійно:

- **[Zebra](/zcash-tech/zebra-full-node)** перевіряє ланцюг
- **[Zaino](/zcash-tech/zaino)** індексує його та надає дані гаманцям
- **[Zallet](/zcash-tech/zallet)** зберігає ваші кошти

[Zakura](/zcash-tech/zakura-node) — альтернативний повний вузол. Він також запускає zcashd поверх себе, що допомагає, якщо інше програмне забезпечення все ще очікує старий інтерфейс.

Почніть із [посібника з міграції](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Як перенести мій гаманець zcashd до Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet мігрує наявний `wallet.dat`, тож ви зберігаєте свої кошти та адреси.

Спочатку створіть резервну копію `wallet.dat`, а потім дотримуйтесь [посібника з міграції](/guides/migration-guide-zcashd-to-zebrad-zallet). Зберігайте цю резервну копію, доки не підтвердите свій баланс у Zallet.

[Zalletкороткий довідник](/using-zcash/zallet-quick-reference-guide) охоплює повсякденні команди після переходу.

</div>

## Що таке Ironwood, і чи потрібно мені щось робити?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood — це оновлення мережі NU6.3, активне в основній мережі з блоку 3,428,143 від 28 липня 2026 року. Воно додає захищений пул, побудований на виправленій схемі, і закриває старий пул [Orchard](/using-zcash/shielded-pools), щоб кожен міг перевірити, що жоден ZEC не був підроблений.

**Якщо ви маєте захищені кошти, їх може знадобитися перемістити.** Вартість залишає Orchard лише через [турнікет](/zcash-tech/the-turnstile), а гаманці виконують переміщення в різний час і по-різному. Перш ніж переміщувати щось вручну, запитайте свого постачальника гаманця.

Прочитайте [Ironwood](/zcash-tech/ironwood), щоб дізнатися, що змінилося і чому.

</div>

## Який повний вузол мені запускати?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** — пряма заміна zcashd і вузол, на який розрахований посібник з міграції. Оберіть його, якщо не маєте причини чинити інакше.

**[Zakura](/zcash-tech/zakura-node)** — друга реалізація, орієнтована на масштабування, із швидшою синхронізацією та вбудованим обрізанням блоків. Оберіть її, якщо вам це потрібно або якщо ви залежите від програмного забезпечення, яке все ще взаємодіє з zcashd.

Обидва перевіряють той самий ланцюг, тож це операційний вибір, а не вибір щодо консенсусу.

</div>

## Де знайти значення терміна з примітки до випуску?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Дивіться [ZcashБібліотеку](/glossary-and-faqs/zcash-library). Вона охоплює програмне забезпечення вузла й гаманця, захищені пули та номери ZIP, які трапляються найчастіше.

</div>

## Кілька поширених хибних уявлень

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Хибне уявлення</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Правильна відповідь</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Чи є Zcash централізованою монетою?</td>
      <td className="py-4 px-5 text-foreground">Ні. Угода про торговельну марку перешкоджає Zcash Foundation або ECC діяти всупереч консенсусу спільноти. Управління має доведену децентралізацію (дивіться [звіт Messari](https://messari.io/report/decentralizing-zcash)). Опитування спільноти, ZecHub і A/V Club Zcash Foundation забезпечують широку участь.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Чи має Zcash бекдор?</td>
      <td className="py-4 px-5 text-foreground">Ні. Ані Zcash, ані будь-яке криптографічне програмне забезпечення, яке ми створили, не містить бекдору й ніколи не міститиме.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Чи контролює Zcash корпорація?</td>
      <td className="py-4 px-5 text-foreground">Неправильно. Хоча ми співпрацюємо з компаніями у сфері досліджень, Zcash зберігає відданість децентралізації. Кілька автономних організацій спільно працюють заради самостійного зберігання коштів і права на приватність.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash має обмежену приватність порівняно з іншими приватними монетами</td>
      <td className="py-4 px-5 text-foreground">Ні. Приватність у стилі Monero/Grin спирається на приманки (які можна подолати). Zcash шифрує всі дані захищених транзакцій, тому кожна транзакція в пулі є нерозрізнюваною. Дивіться [Недостатньо приватно?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Останнє оновлення:** жовтень 2026 року
**Хочете зробити внесок?** [Редагуйте цю сторінку на GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
