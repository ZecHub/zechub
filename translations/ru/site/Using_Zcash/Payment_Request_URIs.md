<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>

# Zcash URI платёжных запросов

URI платёжного запроса — это ссылка `zcash:`, определённая в [ZIP 321](https://zips.z.cash/zip-0321). Совместимые кошельки считывают из ссылки или QR адрес, сумму и необязательное сообщение и предварительно заполняют транзакцию. Никаких дополнительных учётных записей и никаких посредников.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Открыть виджет оплаты
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Создать платёжный запрос
  </a>
</div>

Демонстрация виджета — это интерактивное модальное окно ZIP-321: QR, копирование адреса/URI, короткая ссылка и «Открыть в кошельке». На странице инструментов находится генератор, если вы сначала хотите указать собственные адрес и сумму.

## Структура

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Поле | Обязательно | Примечания |
| --- | --- | --- |
| address | да | Предпочтительно использовать Unified Address (`u1` / `utest1`) |
| amount | нет | Десятичное значение ZEC |
| memo | нет | Только для защищённых переводов |
| label | нет | Понятное человеку имя, отображаемое некоторыми кошельками |

Полные правила: [ZIP 321](https://zips.z.cash/zip-0321).

## Сценарии использования

- **Оформление заказа** — предварительно заполните цену и сообщение с номером заказа, чтобы клиенту осталось лишь подтвердить платёж в своём кошельке
- **Счета** — поделитесь одной ссылкой или QR
- **Пожертвования** — встроите виджет на сайт
- **P2P** — отправьте ссылку `zcash:` в чате

## Встраивание на сайт

Укажите в этом скрипте свой защищённый адрес. Размещённая копия находится на ZecHub:

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

Обязательные параметры: `data-address`, `data-amount`, `data-target`.

Сначала попробуйте размещённую кнопку: [Открыть виджет оплаты](/zcash-payment-uri).

## Видео

Как создавать платёжные запросы с помощью Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Как создавать платёжные запросы с помощью Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Добавление виджета пожертвований Zcash на ваш веб-сайт:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Добавление виджета пожертвований Zcash на ваш веб-сайт"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
