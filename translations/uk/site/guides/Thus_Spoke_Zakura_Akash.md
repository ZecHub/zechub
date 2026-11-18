# Так мовив Zakura на Akash (Regtest)

Запустіть стек **Thus Spoke Zakura v0.4.1** на Akash: Zakura Regtest, lightwalletd і **панель керування / HTTP API** гаманця. Тестові монети не мають цінності. Не надсилайте сюди ZEC Mainnet.

Шаблон: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Вихідний проєкт: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) тег **v0.4.1**

### Зображення

| Служба | Зображення |
| --- | --- |
| Панель керування + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (вбудовано в launcher версії 0.4.1) |

### Самостійне початкове налаштування

Під час першого запуску контейнер `app` запускає `ths-server init` у своєму постійному томі, а потім `ths-server serve`. Служба Serve повторює спроби, доки не запрацюють JSON-RPC Zakura і lightwalletd. Вам не потрібно запускати `ths` на провайдері; SDL є середовищем виконання.

### Як Akash публікує порти

Порти SDL `port` / `as` — це порти **контейнера**. Застосунок прослуховує порт **8080** (`THS_LISTEN`); lightwalletd — порт **9067**; Zakura — RPC на порту **18232** і P2P на порту **18233**. Усередині розгортання служби вже використовують ці порти (`http://zakura:18232`, `http://lightwalletd:9067`).

Це **не** порти на публічній IP-адресі провайдера.

**За замовчуванням (цей шаблон):** виділеної IP-адреси немає.

| Служба | Порт прослуховування контейнера | SDL `as` | Як це відображається в оренді |
| --- | --- | --- | --- |
| `app` (панель керування + HTTP API) | 8080 | 80 (HTTP) | Ім’я хоста для вхідного трафіку, зазвичай на портах 80/443 — **відкрийте цей URI у браузері** |
| `lightwalletd` | 9067 | 9067 (TCP, глобальний) | `host:&lt;random-high-port&gt;` |
| `zakura` RPC | 18232 | 18232 (TCP, глобальний) | `host:&lt;random-high-port&gt;` |
| `zakura` P2P | 18233 | 18233 (TCP, глобальний) | `host:&lt;random-high-port&gt;` |

Коли оренда буде готова, джерело актуальної інформації — **Leases → URIs**. Відкрийте URI **`app`** для панелі керування (той самий інтерфейс, який `ths` відкриває локально). Для компактних клієнтів використовуйте URI **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). Не вводьте `:8080`, `:80` або `:9067` для IP-адреси провайдера, якщо порти не стали публічними завдяки оренді з виділеною IP-адресою.

**Виділені IP-адреси** (`endpoints` / `kind: ip`) — це додаткова платна послуга, якої **немає** в цьому шаблоні. Вони можуть закріпити публічну IP-адресу, а іноді й порт `as`. Не вмикайте їх, якщо вони вам не потрібні.

### Який сайт використовувати (оплата)

SDL однаковий. Два вебінтерфейси Akash відрізняються **способом оплати**.

| Сайт | Оплата | Гаманець |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Звичайне оформлення оплати у вебінтерфейсі (картка / фіатні способи, які пропонує Console) | Обліковий запис Console |
| [air.akash.network](https://air.akash.network) | Оплата в нативному блокчейні Akash (AKT / ACT) | **Keplr** |

Використовуйте **Air**, якщо хочете платити Keplr в блокчейні. Використовуйте **Console**, якщо хочете звичайний процес оплати через вебінтерфейс.

### Розгортання

**Оплата через вебінтерфейс (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Оплата в нативному блокчейні Akash за допомогою Keplr (Air)**

[Відкрити цей шаблон в Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Створіть розгортання на основі шаблону, прийміть пропозицію, дочекайтеся, поки в журналах `app` буде видно, що `ths-server serve` продовжує працювати, а потім відкрийте URI **`app`** для панелі керування.

### Див. також

- [Zakura на Akash](/guides/akash-network-zakura) — вузол-валідатор Mainnet/Testnet
- [Zebra на Akash](/guides/akash-network-zebra)
- Книга: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
