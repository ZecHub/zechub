<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# Zcash URI запитів на оплату

URI запиту на оплату — це посилання `zcash:`, визначене [ZIP 321](https://zips.z.cash/zip-0321). Сумісні гаманці зчитують із посилання або QR адресу, суму та необов’язкове повідомлення й попередньо заповнюють транзакцію. Жодних додаткових облікових записів чи посередників.

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

Демонстрація віджета — це активне модальне вікно ZIP-321: QR, копіювання адреси/URI, коротке посилання та відкриття в гаманці. Сторінка інструментів містить генератор, якщо ви спершу хочете вказати власну адресу та суму.

## Будова

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Поле | Обов’язкове | Примітки |
| --- | --- | --- |
| address | так | Надавайте перевагу Unified Address (`u1` / `utest1`) |
| amount | ні | Десяткове значення ZEC |
| memo | ні | Лише для захищених переказів |
| label | ні | Зрозуміла людині назва, яку показують деякі гаманці |

Повні правила: [ZIP 321](https://zips.z.cash/zip-0321).

## Випадки використання

- **Оплата** — попередньо заповніть ціну та повідомлення замовлення, щоб клієнту залишилося лише підтвердити операцію у своєму гаманці
- **Рахунки** — поділіться одним посиланням або QR
- **Пожертви** — вбудуйте віджет на сайт
- **P2P** — надішліть посилання `zcash:` у чаті

## Вбудовування на сайт

Спрямуйте цей скрипт на власну захищену адресу. Розміщена копія доступна на ZecHub:

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

Потрібні: `data-address`, `data-amount`, `data-target`.

Спочатку спробуйте розміщену кнопку: [Відкрити віджет оплати](/zcash-payment-uri).

## Відео

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
