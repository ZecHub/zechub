<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>

# Zcash URI-запросы платежей

## Кратко

* URI-запрос платежа — это ссылка, начинающаяся с `zcash:` и содержащая сведения о платеже: адрес, сумму и необязательное примечание.
* Ею можно поделиться в виде QR-кода или кликабельной ссылки, чтобы ваш кошелёк сам заполнил данные платежа. Вам остаётся проверить детали и подтвердить его.
* [ZIP 321](https://zips.z.cash/zip-0321) определяет формат. Он основан на BIP 21 Bitcoin.
* Один запрос может оплатить нескольких получателей в одной транзакции.
* ZecHub размещает платёжный виджет и генератор, поэтому магазин может добавить кнопку оплаты Zcash, не составляя URI вручную.

## Основное объяснение

URI-запрос платежа — это ссылка `zcash:`, определённая в [ZIP 321](https://zips.z.cash/zip-0321). Совместимые кошельки считывают из ссылки или QR-кода адрес, сумму и необязательное примечание, а затем предварительно заполняют транзакцию. Никаких дополнительных аккаунтов или посредников-обработчиков.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Открыть платёжный виджет
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Создать платёжный запрос
  </a>
</div>

Демонстрация виджета — это интерактивное модальное окно ZIP-321: QR-код, копирование адреса/URI, короткая ссылка и «Открыть в кошельке». На странице инструментов расположен генератор, если сначала нужно задать собственные адрес и сумму.

### Структура

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Поле | Обязательно | Примечания |
| --- | --- | --- |
| address | да | Предпочтительно использовать Unified Address (`u1` / `utest1`) |
| amount | нет | Десятичное число ZEC с `.` в качестве разделителя и не более чем 8 знаками после запятой (`0.5`, а не `0,5`) |
| memo | нет | Только для shielded-адресов. Байты UTF-8 примечания (не более 512), закодированные base64url без заполнения `=`: `Thanks!` превращается в `VGhhbmtzIQ`, а не в обычный текст |
| label | нет | Читаемое человеком имя, отображаемое некоторыми кошельками. Кодируйте пробелы и зарезервированные символы в процентах (`Coffee%20shop`); `+` — это буквальный плюс, а не пробел |

Полные правила: [ZIP 321](https://zips.z.cash/zip-0321).

### Варианты использования

- Оформление заказа: предварительно заполнить цену и примечание к заказу, чтобы клиенту оставалось только подтвердить платёж в кошельке
- Счета: поделиться одной ссылкой или QR-кодом
- Пожертвования: встроить виджет на сайт
- P2P: отправить ссылку `zcash:` в чате

### Встраивание на сайт

Укажите в этом скрипте собственный shielded-адрес. Размещённая версия находится на ZecHub:

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

Обязательно: `data-address`, `data-amount`, `data-target`.

Сначала попробуйте размещённую кнопку: [Открыть платёжный виджет](/zcash-payment-uri).

### Видео

Как создавать Payment Requests с помощью Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Как создавать Payment Requests с помощью Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Добавление виджета пожертвований Zcash на ваш сайт:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Добавление виджета пожертвований Zcash на ваш сайт"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Визуализация / аналогия

Представьте форму банковского перевода с полями для номера счёта, суммы и примечания о назначении платежа. Заполнять её вручную долго, а одна неверная цифра отправит деньги не туда.

URI-запрос платежа — это форма, заполненная магазином. QR-код — её фотография. Камера вашего телефона считывает изображение, кошелёк переносит все поля на свои места, а вы проверяете числа и подписываете транзакцию.

Ссылка на веб-странице выполняет ту же задачу. Нажатие на неё передаёт заполненную форму вашему кошельку.

## Подробнее

### Реальный пример

Вот пример из ZIP 321, составленный для testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Он запрашивает 1 ZEC для одного shielded-адреса Sapling. Примечание декодируется как «This is a simple memo.». Сообщение «Thank you for your purchase» — это текст, который кошелёк показывает на экране.

### Правила, которые проверяет кошелёк

Формат суммы строгий. `amount=0.5` и `amount=50` допустимы. `amount=50,000.00`, `amount=.5` и `amount=0.123456789` недопустимы: единственным десятичным разделителем является точка, и после неё может быть не более 8 цифр. Сумма не может превышать 21 000 000 ZEC.

В необработанном URI примечание закодировано в base64url и после декодирования может содержать до 512 байт. Примечание, прикреплённое к transparent-адресу, делает весь запрос недействительным, поскольку transparent-адреса не поддерживают примечания. Адреса Sprout вообще не допускаются, а запрос, не соответствующий грамматике ZIP 321, должен быть отклонён.

Помимо полей в таблице выше существуют ещё два. `message` — описание платежа, которое кошелёк отображает пользователю. `req-asset` зарезервировано для Custom Assets, определённых в ZIP 227.

### Одновременная оплата нескольким людям

К каждому дополнительному платежу добавляется индексный номер в названиях его параметров, например `address.1`, `amount.1` и `memo.1`. Кошелёк создаёт одну транзакцию, оплачивающую всех получателей из списка. Это удобно для оформления заказа с разделением платежа или для группы пожертвований, отправляемых вместе.

### Откуда появился формат

У Bitcoin есть два более старых стандарта платёжных запросов: BIP 21 — простая ссылка для одного получателя, и BIP 70 — более тяжёлый протокол для сложных платежей. ZIP 321 выбирает промежуточный путь: формат ссылок с местом для нескольких получателей. Обсуждение началось в 2018 году в репозитории Zcash ZIPs, где номер 321 был выбран как отсылка к BIP 21, а сам ZIP был создан в августе 2020 года.

## Связанные страницы

- [Примечания](/using-zcash/memos): для чего нужно поле примечания в платёжном запросе.
- [Платёжные процессоры](/using-zcash/payment-processors): сервисы, обрабатывающие платежи для магазинов.
- [Кошельки](/using-zcash/wallets): используйте фильтр Payment Request, чтобы найти кошельки, которые считывают эти ссылки.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): Custom Assets, на которые ссылается `req-asset`.
- [Что такое TEX-адреса Zcash?](/using-zcash/transparent-exchange-addresses): ещё одно правило адресов, которое ваш кошелёк считывает перед оплатой.

**Последнее обновление:** октябрь 2026
