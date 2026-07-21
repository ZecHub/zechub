# Часті запитання

Список найпоширеніших запитань про Zcash. Для усунення несправностей клієнта Zcash, будь ласка, перегляньте [офіційний посібник з усунення несправностей](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Швидка навігація
[Що таке Zcash?](#what-is-zcash) | [Як отримати Zcash?](#acquire) | [Відмінність від інших криптовалют?](#difference) | [Керування протоколом?](#governance) | [Де моя транзакція?](#transaction) | [Чи справді Zcash приватний?](#privacy) | [Поширені хибні уявлення](#misconceptions)

---

## Що таке Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash — це цифрова валюта зі швидкими, конфіденційними транзакціями та низькими комісіями. Приватність є центральною особливістю Zcash. Вона стала піонером у використанні доказів з нульовим розголошенням для шифрування всіх транзакцій.  

Для миттєвих, мобільних, безпечних і приватних платежів доступні кілька гаманців: [Мобільні гаманці](https://z.cash/wallets/)
</div>

## Як я можу отримати Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Ви можете купити ZEC на криптовалютних [біржах](https://z.cash/exchanges).  
Ви також можете придбати Zcash напряму в інших людей або отримати його шляхом майнінгу.
</div>

## У чому різниця між Zcash та іншими криптовалютами?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash за своєю суттю є більш приватним, ніж Bitcoin або Ethereum. Він пропонує швидкий час створення блоків (75 секунд), низькі комісії та регулярні оновлення.  

Користувачі можуть обирати між **прозорими** або **захищеними** транзакціями. Для додаткової інформації дивіться [Захищена екосистема](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## Як керується протокол Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Протоколом керує процес **Zcash Improvement Proposal (ZIP)**. Будь-хто може подати чернетку ZIP. Чернетки обговорюються спільнотою та приймаються або відхиляються редакторами ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Рішення вносяться до специфікації та ратифікуються ончейн, коли мережа їх ухвалює.
</div>

## Де моя транзакція?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Спочатку прочитайте [наш посібник з блокчейн-експлорерів](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). Потім перевірте [Zcash Block Explorer](https://zcashblockexplorer.com).  

Транзакції стають недійсними приблизно через 25 хвилин (20 блоків), а кошти автоматично повертаються.  

**Поширені причини, через які транзакція може не з’явитися:**
- Втрата з’єднання
- Занадто низька комісія за транзакцію
- Перевантаження мережі
- Забагато прозорих входів (занадто великий розмір)

**Поради для успішного виконання:**
- Використовуйте стабільне з’єднання
- Сплачуйте стандартну комісію (або вищу для пріоритету)
- Зачекайте та спробуйте пізніше
- Використовуйте менше входів, щоб транзакція залишалася малою
</div>

## Чи справді Zcash приватний?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Так.** Zcash шифрує дані відправника, суму та дані отримувача для захищених транзакцій.  

Zcash **не**:
- Шифрує мультипідписні транзакції (інтеграція FROST очікується)
- Захищає від кореляцій із прозорими транзакціями
- Приховує IP-адреси

Додаткове читання: [Захищена екосистема](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## Кілька поширених хибних уявлень

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Хибне уявлення</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Правильна відповідь</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Чи є Zcash централізованою монетою?</td>
        <td className="py-5 px-6 text-foreground">Ні. Угода про торговельну марку не дозволяє Zcash Foundation або ECC діяти всупереч консенсусу спільноти. Керування доведено є децентралізованим (див. [звіт Messari](https://messari.io/report/decentralizing-zcash)). Опитування спільноти, ZecHub і A/V Club від Zcash Foundation забезпечують широку участь.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Чи має Zcash бекдор?</td>
        <td className="py-5 px-6 text-foreground">Ні. Ані Zcash, ані будь-яке криптографічне програмне забезпечення, яке ми створили, не містить бекдору і ніколи не міститиме.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Чи контролюється Zcash корпорацією?</td>
        <td className="py-5 px-6 text-foreground">Ні. Хоча ми співпрацюємо з компаніями у сфері досліджень, Zcash залишається відданим децентралізації. Кілька автономних організацій працюють разом задля самостійного зберігання коштів і права на приватність.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash має обмежену приватність порівняно з іншими приватними монетами</td>
        <td className="py-5 px-6 text-foreground">Ні. Приватність у стилі Monero/Grin покладається на приманки (які можна обійти). Zcash шифрує всі дані захищених транзакцій, тому кожна транзакція в пулі є невідрізненною. Див. [Недостатньо приватно?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

**Останнє оновлення:** березень 2026  
**Хочете долучитися?** [Редагуйте цю сторінку на GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
