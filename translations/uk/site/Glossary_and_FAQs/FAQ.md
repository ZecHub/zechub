# Часті запитання

Список найпоширеніших запитань про Zcash. Щоб усунути несправності клієнта Zcash, перегляньте [офіційний посібник з усунення несправностей](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Швидка навігація

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Що таке Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Як я можу придбати Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Відмінність від інших криптовалют?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Управління протоколом?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Де моя транзакція?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Чи справді Zcash приватний?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Поширені хибні уявлення</a>
</div>

---

## Що таке Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash — це цифрова валюта зі швидкими конфіденційними транзакціями та низькими комісіями. Приватність є центральною особливістю Zcash. Вона першою почала використовувати докази з нульовим розголошенням для шифрування всіх транзакцій.

Для миттєвих, мобільних, безпечних і приватних платежів доступні кілька гаманців: [Гаманці](/using-zcash/wallets)

</div>

## Як я можу придбати Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ви можете купити ZEC на [кастодіальних біржах](/using-zcash/custodial-exchanges), [DEX](/dex) або [централізованих платформах обміну](/using-zcash/centralizedswaps).

Ви також можете придбати Zcash безпосередньо в іншої людини або отримати його шляхом майнінгу.

</div>

## Чим Zcash відрізняється від інших криптовалют?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash принципово приватніший за Bitcoin або Ethereum. Він пропонує швидкий час створення блоків (75 секунд), низькі комісії та регулярні оновлення.

Користувачі можуть обирати між **прозорими** та **захищеними** транзакціями. Докладніше дивіться в [Захищеній екосистемі](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Як управляється протокол Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Протокол управляється через процес **пропозицій щодо вдосконалення Zcash (ZIP)**. Будь-хто може подати чернетку ZIP. Чернетки обговорюються спільнотою та приймаються або відхиляються редакторами ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Рішення вносяться до специфікації та ратифікуються в блокчейні, коли мережа їх ухвалює.

</div>

## Де моя транзакція?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Спершу прочитайте [наш посібник з оглядачів блокчейну](/guides/blockchain-explorers). Потім перевірте [Zcashоглядач блокчейну](https://zcashblockexplorer.com).

Термін дії транзакцій спливає приблизно через 25 хвилин (20 блоків), а кошти повертаються автоматично.

**Поширені причини, через які транзакція може не відображатися:**

- Втрата з’єднання
- Надто низька комісія за транзакцію
- Перевантаження мережі
- Надто багато прозорих входів (завеликий розмір)

**Поради для успішного проведення транзакції:**

- Використовуйте стабільне з’єднання
- Сплачуйте стандартну комісію (або вищу для пріоритетної обробки)
- Зачекайте та повторіть спробу пізніше
- Використовуйте менше входів, щоб транзакція залишалася невеликою

</div>

## Чи справді Zcash приватний?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Так.** Zcash шифрує дані відправника, суму й дані одержувача для захищених транзакцій.

Zcash **не**:

- Шифрує транзакції з мультипідписом (очікується інтеграція FROST)
- Захищає від кореляцій із прозорими транзакціями
- Приховує IP-адреси

Додатково: [Захищена екосистема](https://electriccoin.co/blog/shielded-ecosystem)

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
      <td className="py-4 px-5 text-foreground">Ні. Угода про торговельну марку забороняє Zcash Foundation або ECC діяти всупереч консенсусу спільноти. Управління є доведено децентралізованим (див. [звіт Messari](https://messari.io/report/decentralizing-zcash)). Опитування спільноти, ZecHub та A/V Club Zcash Foundation забезпечують широку участь.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Чи має Zcash бекдор?</td>
      <td className="py-4 px-5 text-foreground">Ні. Ані Zcash, ані будь-яке створене нами криптографічне програмне забезпечення не містить бекдорів і ніколи не міститиме.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Чи контролюється Zcash корпорацією?</td>
      <td className="py-4 px-5 text-foreground">Неправильно. Хоча ми співпрацюємо з компаніями у дослідженнях, Zcash зберігає відданість децентралізації. Кілька автономних організацій разом працюють заради самостійного зберігання коштів і прав на приватність.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash має обмежену приватність порівняно з іншими приватними монетами</td>
      <td className="py-4 px-5 text-foreground">Ні. Приватність у стилі Monero/Grin покладається на приманки (які можна нейтралізувати). Zcash шифрує всі дані захищених транзакцій, тому кожна транзакція в пулі є невідрізненною від інших. Дивіться [Недостатньо приватно?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Останнє оновлення:** березень 2026
**Хочете долучитися?** [Редагуйте цю сторінку на GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
