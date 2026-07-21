<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# URI-запросы платежей Zcash

## Обзор динамических QR-кодов

URI означает Universal Resource Identifier. Это QR-коды, которые служат для предварительного заполнения информации о транзакции в кошельке Zcash. Кошельки, распознающие этот формат, могут создавать транзакции либо по нажатию на ссылки на веб-страницах, либо при сканировании QR-кодов. Допустим, у вас есть онлайн-кофейня: ваши клиенты могут совершать покупки, сканируя эти QR-коды своим кошельком Zcash с заранее заполненными ценой и номером заказа.

## Варианты использования запросов платежей


- Онлайн-покупки.                    Запросы платежей при оформлении заказа инициируются клиентами во время онлайн-покупок.
- Бронирование отелей и размещения.   Различные платформы бронирования используют URL-запросы платежей для бронирования отелей.
- Онлайн-оплата счетов.               Коммунальные компании используют URL-запросы платежей, чтобы клиенты могли беспрепятственно оплачивать свои счета. 
- Покупка билетов на мероприятия.             Организаторы мероприятий в разных странах используют этот механизм, чтобы упростить покупку билетов.
- P2P-платежи.                       Частные лица могут легко отправлять запросы платежей родственникам и друзьям через приложения для обмена сообщениями, где ссылки на оплату встроены в сообщения.


## Подробности

[ZIP 321](https://zips.z.cash/zip-0321) определяет, как создать собственный пользовательский платежный URI. 

Как создавать запросы платежей с помощью Zcash: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

    
### Пример кода

Добавление виджета для пожертвований в Zcash на ваш сайт: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
