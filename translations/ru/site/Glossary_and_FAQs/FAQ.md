# Часто задаваемые вопросы

Список самых распространённых вопросов о Zcash. Для устранения неполадок клиента Zcash, пожалуйста, см. [официальное руководство по устранению неполадок](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Быстрая навигация
[Что такое Zcash?](#what-is-zcash) | [Как приобрести Zcash?](#acquire) | [Чем отличается от других криптовалют?](#difference) | [Управление протоколом?](#governance) | [Где моя транзакция?](#transaction) | [Действительно ли Zcash приватен?](#privacy) | [Распространённые заблуждения](#misconceptions)

---

## Что такое Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash — это цифровая валюта с быстрыми, конфиденциальными транзакциями и низкими комиссиями. Приватность — центральная особенность Zcash. Она первой внедрила использование доказательств с нулевым разглашением для шифрования всех транзакций.  

Для мгновенных, мобильных, безопасных и приватных платежей доступны несколько кошельков: [Мобильные кошельки](https://z.cash/wallets/)
</div>

## Как я могу приобрести Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Вы можете купить ZEC на криптовалютных [биржах](https://z.cash/exchanges).  
Вы также можете приобрести Zcash напрямую у других пользователей или получить его с помощью майнинга.
</div>

## В чём разница между Zcash и другими криптовалютами?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash по своей сути более приватен, чем Bitcoin или Ethereum. Он предлагает быстрое время блока (75 секунд), низкие комиссии и регулярные обновления.  

Пользователи могут выбирать между **прозрачными** и **экранированными** транзакциями. Подробнее см. [Экранированная экосистема](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## Как управляется протокол Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Протокол управляется через процесс **Zcash Improvement Proposal (ZIP)**. Любой может подать черновик ZIP. Черновики обсуждаются сообществом и принимаются или отклоняются редакторами ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Решения записываются в спецификацию и утверждаются в блокчейне, когда сеть их принимает.
</div>

## Где моя транзакция?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Сначала прочитайте [наше руководство по обозревателям блоков](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). Затем проверьте [обозреватель блоков Zcash](https://zcashblockexplorer.com).  

Срок действия транзакций истекает примерно через 25 минут (20 блоков), и средства возвращаются автоматически.  

**Распространённые причины, по которым транзакция может не отображаться:**
- Потеря соединения
- Слишком низкая комиссия за транзакцию
- Перегрузка сети
- Слишком много прозрачных входов (слишком большой размер)

**Советы для успешной отправки:**
- Используйте стабильное соединение
- Оплачивайте стандартную комиссию (или выше для приоритета)
- Подождите и повторите попытку позже
- Используйте меньше входов, чтобы транзакция оставалась небольшой
</div>

## Действительно ли Zcash приватен?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Да.** Zcash шифрует данные отправителя, сумму и данные получателя для экранированных транзакций.  

Zcash **не**:
- Шифрует мультиподписные транзакции (интеграция FROST ожидается)
- Защищает от корреляций с прозрачными транзакциями
- Скрывает IP-адреса

Дополнительное чтение: [Экранированная экосистема](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## Несколько распространённых заблуждений

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Заблуждение</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Правильный ответ</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Является ли Zcash централизованной монетой?</td>
        <td className="py-5 px-6 text-foreground">Нет. Соглашение о товарном знаке не позволяет Zcash Foundation или ECC действовать вопреки консенсусу сообщества. Управление доказуемо децентрализовано (см. [отчёт Messari](https://messari.io/report/decentralizing-zcash)). Опросы сообщества, ZecHub и A/V Club от Zcash Foundation обеспечивают широкое участие.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Есть ли у Zcash бэкдор?</td>
        <td className="py-5 px-6 text-foreground">Нет. Ни Zcash, ни какое-либо криптографическое программное обеспечение, которое мы создали, не содержит бэкдор и никогда не будет содержать.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Контролируется ли Zcash корпорацией?</td>
        <td className="py-5 px-6 text-foreground">Неверно. Хотя мы сотрудничаем с компаниями в области исследований, Zcash остаётся привержен децентрализации. Несколько автономных организаций совместно работают ради самостоятельного хранения средств и прав на приватность.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">У Zcash ограниченная приватность по сравнению с другими privacy coin</td>
        <td className="py-5 px-6 text-foreground">Нет. Приватность в стиле Monero/Grin опирается на приманки (которые можно обойти). Zcash шифрует все данные экранированных транзакций, поэтому каждая транзакция в пуле неотличима от других. См. [Недостаточно приватно?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

**Последнее обновление:** март 2026  
**Хотите внести вклад?** [Отредактировать эту страницу на GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
