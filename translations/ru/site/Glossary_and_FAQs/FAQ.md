# Часто задаваемые вопросы

Список наиболее распространённых вопросов о Zcash. Для устранения неполадок клиента Zcash, пожалуйста, ознакомьтесь с [официальным руководством по устранению неполадок](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Быстрая навигация

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Что такое Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Как получить Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Чем отличается от других криптовалют?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Управление протоколом?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Где моя транзакция?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Действительно ли Zcash конфиденциален?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Распространённые заблуждения</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd перестал работать?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Перенести мой кошелёк в Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Что такое Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Какой полный узел?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Найти термин?</a>
</div>

---

## Что такое Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash — это цифровая валюта с быстрыми, конфиденциальными транзакциями и низкими комиссиями. Конфиденциальность — ключевая особенность Zcash. Она стала пионером в использовании доказательств с нулевым разглашением для шифрования всех транзакций.

Для мгновенных, мобильных, безопасных и конфиденциальных платежей доступно несколько кошельков: [Кошельки](/using-zcash/wallets)

</div>

## Как получить Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Вы можете купить ZEC на [кастодиальных биржах](/using-zcash/custodial-exchanges), [DEX](/using-zcash/dex) или [централизованных платформах обмена](/using-zcash/centralized-swaps).

Вы также можете приобрести Zcash напрямую у других пользователей или получить её путём майнинга.

</div>

## В чём разница между Zcash и другими криптовалютами?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash принципиально более конфиденциален, чем Bitcoin или Ethereum. Он предлагает быстрое время блока (75 секунд), низкие комиссии и регулярные обновления.

Пользователи могут выбирать между **прозрачными** и **защищёнными** транзакциями. Подробнее см. [Защищённая экосистема](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Как управляется протокол Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Протокол управляется посредством процесса **предложений по улучшению Zcash (ZIP)**. Любой может представить проект ZIP. Проекты обсуждаются сообществом и принимаются или отклоняются редакторами ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Решения вносятся в спецификацию и утверждаются в цепочке блоков, когда сеть их принимает.

</div>

## Где моя транзакция?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Сначала прочитайте [наше руководство по обозревателям блоков](/guides/blockchain-explorers). Затем проверьте обозреватель блоков [Zcash](https://mainnet.zcashexplorer.app).

Срок действия транзакций истекает примерно через 25 минут (20 блоков), а средства возвращаются автоматически.

**Распространённые причины, по которым транзакция может не отображаться:**

- Потеря соединения
- Слишком низкая комиссия за транзакцию
- Перегрузка сети
- Слишком много прозрачных входов (слишком большой размер)

**Советы для успешного проведения транзакции:**

- Используйте стабильное соединение
- Оплачивайте стандартную комиссию (или более высокую для приоритета)
- Подождите и повторите попытку позже
- Используйте меньше входов, чтобы транзакция оставалась небольшой

</div>

## Действительно ли Zcash конфиденциален?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Да.** Zcash шифрует данные отправителя, сумму и данные получателя в защищённых транзакциях.

Zcash **не**:

- Шифрует мультиподписные транзакции (ожидается интеграция FROST)
- Защищает от корреляций с прозрачными транзакциями
- Скрывает IP-адреса

Дополнительные материалы: [Защищённая экосистема](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd перестал работать — что запускать теперь?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd выведен из эксплуатации. Версия 6.20.0 самостоятельно остановилась на блоке 3417100 18 июля 2026 года и никогда не поддерживала Ironwood (NU6.3), поэтому более новой версии для обновления нет.

Вместо этого используйте стек Z3. Три программы разделяют работу, которую раньше zcashd выполнял в одиночку:

- **[Zebra](/zcash-tech/zebra-full-node)** проверяет цепочку
- **[Zaino](/zcash-tech/zaino)** индексирует её и предоставляет данные кошелькам
- **[Zallet](/zcash-tech/zallet)** хранит ваши средства

[Zakura](/zcash-tech/zakura-node) — альтернативный полный узел. Он также запускает zcashd поверх себя, что помогает, если другое программное обеспечение по-прежнему ожидает старый интерфейс.

Начните с [руководства по миграции](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Как перенести мой кошелёк zcashd в Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet переносит существующий `wallet.dat`, поэтому вы сохраняете свои средства и адреса.

Сначала создайте резервную копию `wallet.dat`, затем следуйте [руководству по миграции](/guides/migration-guide-zcashd-to-zebrad-zallet). Храните эту резервную копию, пока не подтвердите свой баланс в Zallet.

[Zalletкраткая справка](/using-zcash/zallet-quick-reference-guide) охватывает повседневные команды после переноса.

</div>

## Что такое Ironwood и нужно ли мне что-либо делать?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood — это обновление сети NU6.3, работающее в основной сети с блока 3 428 143 от 28 июля 2026 года. Оно добавляет защищённый пул, основанный на исправленной схеме, и закрывает старый пул [Orchard](/using-zcash/shielded-pools), чтобы любой мог убедиться, что ни один ZEC не был подделан.

**Если у вас есть защищённые средства, их может потребоваться переместить.** Стоимость покидает Orchard только через [турникет](/zcash-tech/the-turnstile), а кошельки выполняют перемещение в разное время и разными способами. Прежде чем перемещать что-либо вручную, обратитесь к поставщику вашего кошелька.

Прочитайте [Ironwood](/zcash-tech/ironwood), чтобы узнать, что изменилось и почему.

</div>

## Какой полный узел следует запускать?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** — прямая замена zcashd и узел, который предполагает руководство по миграции. Выбирайте его, если у вас нет причин поступить иначе.

**[Zakura](/zcash-tech/zakura-node)** — вторая реализация, ориентированная на масштабирование, с более быстрой синхронизацией и нативным удалением старых блоков. Выбирайте её, если вам это необходимо или если вы зависите от программного обеспечения, которое всё ещё взаимодействует с zcashd.

Оба проверяют одну и ту же цепочку, поэтому это операционный выбор, а не выбор консенсуса.

</div>

## Где найти термин из примечания к выпуску?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

См. [ZcashБиблиотеку](/glossary-and-faqs/zcash-library). В ней рассматриваются программное обеспечение узла и кошелька, защищённые пулы и номера ZIP, которые встречаются чаще всего.

</div>

## Несколько распространённых заблуждений

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Заблуждение</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Правильный ответ</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Является ли Zcash централизованной монетой?</td>
      <td className="py-4 px-5 text-foreground">Нет. Соглашение о товарном знаке не позволяет Zcash Foundation или ECC действовать вопреки консенсусу сообщества. Децентрализация управления доказана (см. [отчёт Messari](https://messari.io/report/decentralizing-zcash)). Опросы сообщества, ZecHub и A/V Club Zcash Foundation обеспечивают широкое участие.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Есть ли в Zcash бэкдор?</td>
      <td className="py-4 px-5 text-foreground">Нет. Ни Zcash, ни какое-либо созданное нами криптографическое программное обеспечение не содержит и никогда не будет содержать бэкдор.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Контролируется ли Zcash корпорацией?</td>
      <td className="py-4 px-5 text-foreground">Неверно. Хотя мы сотрудничаем с компаниями в исследованиях, Zcash сохраняет приверженность децентрализации. Несколько автономных организаций совместно работают над самостоятельным хранением и правами на конфиденциальность.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Конфиденциальность Zcash ограничена по сравнению с другими приватными монетами</td>
      <td className="py-4 px-5 text-foreground">Нет. Конфиденциальность в стиле Monero/Grin опирается на приманки (которые можно обойти). Zcash шифрует все данные защищённых транзакций, поэтому каждая транзакция в пуле неотличима от других. См. [Недостаточно конфиденциально?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Последнее обновление:** октябрь 2026 года
**Хотите внести вклад?** [Отредактируйте эту страницу на GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
