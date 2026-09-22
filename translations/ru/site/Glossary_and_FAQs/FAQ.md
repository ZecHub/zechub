# Часто задаваемые вопросы

Список наиболее распространённых вопросов о Zcash. Для устранения неполадок с клиентом Zcash, пожалуйста, ознакомьтесь с [официальным руководством по устранению неполадок](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Быстрая навигация

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Что такое Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Как приобрести Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Чем отличается от других криптовалют?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Управление протоколом?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Где моя транзакция?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Действительно ли Zcash конфиденциален?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Распространённые заблуждения</a>
</div>

---

## Что такое Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash — это цифровая валюта с быстрыми, конфиденциальными транзакциями и низкими комиссиями. Конфиденциальность — ключевая особенность Zcash. Она первой применила доказательства с нулевым разглашением для шифрования всех транзакций.

Для мгновенных, мобильных, безопасных и конфиденциальных платежей доступно несколько кошельков: [Кошельки](/using-zcash/wallets)

</div>

## Как приобрести Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Вы можете купить ZEC на [кастодиальных биржах](/using-zcash/custodial-exchanges), [DEX](/dex) или [централизованных платформах для обмена](/using-zcash/centralizedswaps).

Вы также можете приобрести Zcash напрямую у других пользователей или получить его с помощью майнинга.

</div>

## Чем Zcash отличается от других криптовалют?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash принципиально более конфиденциален, чем Bitcoin или Ethereum. Он предлагает быстрое время формирования блоков (75 секунд), низкие комиссии и регулярные обновления.

Пользователи могут выбирать между **прозрачными** и **защищёнными** транзакциями. Подробнее см. [Защищённая экосистема](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Как управляется протокол Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Протокол управляется в рамках процесса **предложений по улучшению Zcash (ZIP)**. Любой может представить черновик ZIP. Черновики обсуждаются сообществом и принимаются или отклоняются редакторами ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Решения вносятся в спецификацию и утверждаются в блокчейне, когда сеть их принимает.

</div>

## Где моя транзакция?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Сначала прочтите [наше руководство по обозревателям блокчейна](/guides/blockchain-explorers). Затем проверьте обозреватель блокчейна [Zcash](https://zcashblockexplorer.com).

Срок действия транзакций истекает примерно через 25 минут (20 блоков), после чего средства возвращаются автоматически.

**Распространённые причины, по которым транзакция может не отображаться:**

- Потеря соединения
- Слишком низкая комиссия за транзакцию
- Перегрузка сети
- Слишком много прозрачных входов (слишком большой размер)

**Советы для успешной отправки:**

- Используйте стабильное соединение
- Уплачивайте стандартную комиссию (или более высокую для приоритетной обработки)
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

Дополнительная информация: [Защищённая экосистема](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

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
      <td className="py-4 px-5 text-foreground">Нет. Соглашение о товарном знаке не позволяет Zcash Foundation или ECC действовать вопреки консенсусу сообщества. Децентрализованность управления доказана (см. [отчёт Messari](https://messari.io/report/decentralizing-zcash)). Опросы сообщества, ZecHub и A/V Club Zcash Foundation обеспечивают широкое участие.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Есть ли у Zcash бэкдор?</td>
      <td className="py-4 px-5 text-foreground">Нет. Ни Zcash, ни какое-либо созданное нами криптографическое программное обеспечение не содержит бэкдора и никогда не будет содержать.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Контролируется ли Zcash корпорацией?</td>
      <td className="py-4 px-5 text-foreground">Неверно. Хотя мы сотрудничаем с компаниями в области исследований, Zcash остаётся привержен децентрализации. Несколько автономных организаций вместе работают над самоопекой и правами на конфиденциальность.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">У Zcash ограниченная конфиденциальность по сравнению с другими конфиденциальными монетами</td>
      <td className="py-4 px-5 text-foreground">Нет. Конфиденциальность в стиле Monero/Grin основана на приманках (которые можно обойти). Zcash шифрует все данные защищённых транзакций, поэтому каждая транзакция в пуле неотличима от других. См. [Недостаточно конфиденциально?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Последнее обновление:** март 2026  
**Хотите внести вклад?** [Отредактируйте эту страницу на GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
