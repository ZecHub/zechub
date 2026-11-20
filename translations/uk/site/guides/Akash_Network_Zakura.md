# Як запустити Zakura у мережі Akash

Покрокова інструкція для повного вузла **Zakura** Zcash із шаблоном [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura — сумісний із консенсусом вузол Zcash (відгалужений від Zebra), який швидше синхронізується, підтримує вбудоване скорочення історії та початкове завантаження зі знімка. У шаблоні закріплено **`zakuracore/zakura:1.8.1`** (за дайджестом; не використовуйте `:latest` чи `1.1.1`).

### Що ви отримуєте

- Mainnet P2P: контейнер **8233**, доступний ззовні (див. зіставлення портів нижче)
- Постійний стан зі скороченою історією (64 GiB за замовчуванням) із початковим завантаженням зі знімка Valar під час першого запуску
- Prometheus **9999** і перевірка стану **8080** (внутрішні, без публічного URI)
- JSON-RPC **8232** для розміщеного поруч **lightwalletd**; LWD слухає порт контейнера **9067**, доступний ззовні

Прапорці функцій у SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. Автентифікація через cookie вимкнена, коли ввімкнено lightwalletd, оскільки lightwalletd не може читати файли cookie.

### Який сайт використовувати (оплата)

SDL однаковий. Два вебінтерфейси Akash відрізняються **способом оплати**.

| Сайт | Оплата | Гаманець |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Звичайна оплата через вебсайт (картка / фіатні способи оплати, які пропонує Console) | Обліковий запис Console |
| [air.akash.network](https://air.akash.network) | Нативні платежі в мережі Akash (AKT / ACT) | **Keplr** |

Використовуйте **Air**, якщо хочете платити Keplr ончейн. Використовуйте **Console**, якщо хочете скористатися звичайним вебпроцесом оплати. Не очікуйте нативного розрахунку Keplr у Console.

### Розгортання

**Оплата через вебсайт (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Нативні платежі Akash через Keplr (Air)**

[Відкрити цей шаблон в Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Відкрийте відповідне посилання вище (Console або Air).
2. В Air під’єднайте **Keplr** і переконайтеся, що маєте AKT/ACT для депозиту й оренди. У Console завершіть вебоплату, запропоновану інтерфейсом.
3. Завантажте `zcash-zakura/deploy.yaml`, якщо його ще не заповнено.
4. Внесіть депозит, прийміть пропозицію, дочекайтеся оренди.
5. У журналах спершу має відображатися завантаження знімка (під час першого запуску), а потім `zakurad start`.
6. Відкрийте **Оренда → URI**. Використовуйте призначений провайдером хост:порт, а не 8233 чи 9067 на публічній IP-адресі.

### Як Akash публікує порти

Порти SDL `port` / `as` (8233, 9067, 8232) — це **порти контейнера**. Zakura і далі слухає порт 8233; lightwalletd — порт 9067; RPC на порті 8232 призначений для допоміжного сервісу LWD (`zakura:8232`).

Це **не** порти публічної IP-адреси провайдера.

**За замовчуванням (цей шаблон):** виділеної IP-адреси немає. Кожен TCP-порт `global: true` зі зовнішнім доступом зіставляється з **випадковим портом високого діапазону** на спільному хості провайдера. Console/Air показують їх як URI оренди, наприклад:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Вузли-піри підключаються до URI **8233** (`provider.example:31482`). Компактні гаманці використовують URI **9067** (TLS вимкнено, якщо ви самостійно не налаштуєте завершення TLS). Установіть `ZAKURA_NETWORK__EXTERNAL_ADDR` на зіставлений URI P2P, а не на `:8233`.

**Внутрішні** порти (RPC `8232`, метрики `9999`, перевірка стану `8080`) доступні лише в мережі розгортання. Публічного URI немає.

**Виділені IP-адреси** (`endpoints` / `kind: ip`) оплачуються додатково й у цей шаблон **не входять**. Вони дають змогу закріпити публічну IP-адресу, а іноді й порт `as`. Додавайте це лише за потреби у стабільному `host:8233`.

### Архівний вузол чи вузол зі скороченою історією

За замовчуванням використовується **режим зі скороченою історією** (знімок ~11 GiB, диск 64 GiB). Для повної історії встановіть `SNAPSHOT_KIND=archive`, збільште диск до 350 GiB або більше та встановіть `ZAKURA_STATE__STORAGE_MODE=archive`.

### Пов’язані матеріали

- [Zebra на Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (повна історія, без знімка)
- [Thus Spoke Zakura на Akash](/guides/thus-spoke-zakura-akash) — панель Regtest і застосунок (v0.4.1)
- Zakura вихідний код: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Знімки: [zakura.com/snapshots/](https://zakura.com/snapshots/)
