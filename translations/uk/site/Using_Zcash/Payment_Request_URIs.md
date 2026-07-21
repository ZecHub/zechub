<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# URI запиту платежу Zcash

## Огляд динамічних QR-кодів

URI означає Universal Resource Identifier. Це QR-коди, які слугують для попереднього заповнення інформації про транзакцію в гаманці Zcash. Гаманці, які розпізнають цей формат, можуть формувати транзакції або натисканням на посилання на вебсторінках, або шляхом сканування QR-кодів. Скажімо, у вас є онлайн-кав’ярня — ваші клієнти можуть здійснювати покупки, скануючи ці QR-коди своїм гаманцем Zcash із попередньо заповненими ціною та номером замовлення.

## Випадки використання платіжних запитів 


- Онлайн-шопінг.                    Платіжні запити під час оформлення замовлення ініціюються клієнтами під час онлайн-покупок.
- Бронювання готелів і житла.   Різні платформи бронювання використовують URL платіжних запитів для резервування готелів.
- Онлайн-оплата рахунків.               Комунальні компанії використовують URL платіжних запитів, щоб дати клієнтам змогу безперешкодно оплачувати рахунки. 
- Купівля квитків на події.             Організатори подій у різних країнах використовують цей механізм, щоб полегшити придбання квитків.
- P2P-платежі.                       Люди можуть легко надсилати платіжні запити родині та друзям через застосунки для обміну повідомленнями, вбудовуючи платіжні посилання в повідомлення.


## Деталі

[ZIP 321](https://zips.z.cash/zip-0321) визначає, як створити власний кастомний платіжний URI. 

Як створювати платіжні запити за допомогою Zcash: 

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

    
### Приклад коду

Додавання віджета пожертв Zcash на ваш вебсайт: 

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
