<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash URI запитів на оплату

## Коротко

* URI запиту на оплату — це посилання, яке починається з `zcash:` і містить деталі платежу: адресу, суму та необов’язкове повідомлення.
* Поширений як QR-код або клікабельне посилання, він дає вашому гаманцю змогу заповнити платіж за вас. Ви перевіряєте деталі та підтверджуєте.
* [ZIP 321](https://zips.z.cash/zip-0321) визначає формат. Він походить від BIP 21 Bitcoin.
* Один запит може оплатити кількох одержувачів в одній транзакції.
* ZecHub містить віджет оплати й генератор, тож магазин може додати кнопку оплати Zcash без ручного написання URI.

## Основне пояснення

URI запиту на оплату — це посилання `zcash:`, визначене [ZIP 321](https://zips.z.cash/zip-0321). Сумісні гаманці зчитують адресу, суму й необов’язкове повідомлення з посилання або QR-коду та попередньо заповнюють транзакцію. Жодних додаткових облікових записів чи посередника-обробника.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Відкрити віджет оплати
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Створити запит на оплату
  </a>
</div>

Демонстраційний віджет — це інтерактивне модальне вікно ZIP-321: QR-код, копіювання адреси/URI, коротке посилання та «Відкрити в гаманці». Сторінка інструментів містить генератор, якщо ви хочете спершу встановити власні адресу й суму.

### Будова

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Поле | Обов’язкове | Примітки |
| --- | --- | --- |
| address | так | Надавайте перевагу Unified Address (`u1` / `utest1`) |
| amount | ні | Десяткове число ZEC з `.` як роздільником і не більш ніж 8 знаками після коми (`0.5`, а не `0,5`) |
| memo | ні | Лише для shielded-адрес. Байти UTF-8 повідомлення (не більш ніж 512), закодовані base64url без заповнення `=`: `Thanks!` перетворюється на `VGhhbmtzIQ`, а не на звичайний текст |
| label | ні | Зрозуміла людині назва, яку показують деякі гаманці. Кодуйте пробіли й зарезервовані символи у відсотковому форматі (`Coffee%20shop`); `+` — це буквальний плюс, а не пробіл |

Повні правила: [ZIP 321](https://zips.z.cash/zip-0321).

### Варіанти використання

- Оформлення покупки: попередньо заповніть ціну та повідомлення із замовленням, щоб клієнту залишилося лише підтвердити дію в гаманці
- Рахунки: поділіться одним посиланням або QR-кодом
- Пожертви: вбудуйте віджет на сайт
- P2P: надішліть посилання `zcash:` у чаті

### Вбудовування на сайт

Укажіть у цьому скрипті власну shielded-адресу. Розміщена копія доступна на ZecHub:

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

Обов’язкові параметри: `data-address`, `data-amount`, `data-target`.

Спершу спробуйте розміщену кнопку: [Відкрити віджет оплати](/zcash-payment-uri).

### Відео

Як створювати запити на оплату за допомогою Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Як створювати запити на оплату за допомогою Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Додавання віджета пожертв Zcash на ваш вебсайт:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Додавання віджета пожертв Zcash на ваш вебсайт"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Візуалізація / аналогія

Уявіть форму банківського переказу з полями для номера рахунку, суми та примітки про призначення платежу. Заповнювати її вручну повільно, а одна помилкова цифра надішле гроші не туди.

URI запиту на оплату — це та сама форма, уже заповнена магазином. QR-код — це фотографія форми. Камера вашого телефона зчитує фото, гаманець переносить кожне поле на місце, а ви перевіряєте числа й підписуєте транзакцію.

Посилання на вебсторінці виконує те саме завдання. Натиснувши його, ви передаєте заповнену форму своєму гаманцю.

## Докладніше

### Реальний приклад

Ось приклад із ZIP 321, написаний для testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Він запитує 1 ZEC на одну shielded-адресу Sapling. Повідомлення декодується як «This is a simple memo.». Текст «Thank you for your purchase» гаманець показує на екрані.

### Правила, які перевіряє гаманець

Формат суми суворий. `amount=0.5` і `amount=50` дійсні. `amount=50,000.00`, `amount=.5` та `amount=0.123456789` недійсні: крапка — єдиний десятковий роздільник, і після неї може бути не більш ніж 8 цифр. Жодна сума не може перевищувати 21 000 000 ZEC.

У необробленому URI повідомлення закодоване в base64url і після декодування може містити до 512 байтів. Повідомлення, додане до transparent-адреси, робить весь запит недійсним, оскільки transparent-адреси не можуть містити повідомлення. Адреси Sprout узагалі не дозволені, а запит, що не відповідає граматиці ZIP 321, має бути відхилений.

Окрім полів у таблиці вище, існують ще два поля. `message` — це опис платежу для показу гаманцем. `req-asset` зарезервовано для Custom Assets, визначених у ZIP 227.

### Оплата кільком людям одночасно

До назв параметрів кожного додаткового платежу додається індексний номер, наприклад `address.1`, `amount.1` і `memo.1`. Гаманець створює одну транзакцію, що платить кожному зі списку. Це корисно для оформлення покупки з розподілом платежу або для групи пожертв, надісланих разом.

### Звідки походить формат

Bitcoin має два старіші стандарти запитів на оплату: BIP 21, просте посилання для одного одержувача, і BIP 70, складніший протокол для комплексних платежів. ZIP 321 обирає середній шлях — формат посилання з місцем для кількох одержувачів. Обговорення почалося у 2018 році в репозиторії Zcash ZIPs, де номер 321 було обрано як відсилання до BIP 21, а сам ZIP було створено в серпні 2020 року.

## Пов’язані сторінки

- [Повідомлення](/using-zcash/memos): для чого призначене поле повідомлення в запиті на оплату.
- [Платіжні процесори](/using-zcash/payment-processors): сервіси, що обробляють платежі для магазинів.
- [Гаманці](/using-zcash/wallets): використовуйте фільтр Payment Request, щоб знайти гаманці, які читають ці посилання.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): Custom Assets, на які посилається `req-asset`.
- [Що таке адреси Zcash TEX?](/using-zcash/transparent-exchange-addresses): ще одне правило щодо адрес, яке ваш гаманець зчитує перед оплатою.

**Останнє оновлення:** жовтень 2026
