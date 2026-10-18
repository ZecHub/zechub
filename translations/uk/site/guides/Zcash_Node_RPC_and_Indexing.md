<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Практичний посібник: RPC вузла Zcash та індексування блокчейну

Ця сторінка — збірник рецептів для взаємодії з запущеним повним вузлом Zcash через JSON-RPC і підключення індексатора, який можуть запитувати легкі гаманці та оглядачі. Це **не** другий посібник зі встановлення.

Щоб дізнатися, як запустити стек після `zcashd` (Zebra + Zallet, необов’язковий Zaino, порти, томи, двофазне завантаження), скористайтеся сторінкою [Z3 Stack](/zcash-tech/z3-stack) та [репозиторієм Z3](https://github.com/ZcashFoundation/z3). Довідкову інформацію про консенсусний вузол дивіться на сторінках [Повні вузли](/zcash-tech/full-nodes) та [повний вузол Zebra](/zcash-tech/zebra-full-node).

`zcashd` припинив підтримку 18 липня 2026 року. Нова робота операторів має бути спрямована на Zebra (або [Zakura](/zcash-tech/zakura-node)) разом із гаманцем/індексатором, а не на `zcashd`.

---

## Коротко

* **JSON-RPC** — це спосіб, яким оператори та гаманці запитують у вузла вершину ланцюга, піри й (у процесі гаманця) баланси. У Z3 Zebra надає RPC вузла; Zallet надає RPC гаманця.
* **Regtest** — правильне місце для вивчення викликів. rpc-router Z3 на `http://127.0.0.1:8181` приймає `zebra` / `zebra` і пересилає методи вузла до Zebra, а методи гаманця — до Zallet.
* **Mainnet і testnet** використовують автентифікацію cookie на Zebra. Не копіюйте ім’я користувача/пароль regtest на публічний вузол.
* **Індексування** — окреме завдання від валідації. Zebra виконує валідацію. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) надає gRPC, сумісний з lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) — це індексатор на основі Zakura; Z3 його не постачає.
* JSON-RPC Zaino і необов’язковий gRPC індексатора Zebra призначені для loopback або довіреної мережі. Не відкривайте їх без автентифікації в публічному інтернеті.

---

## Який процес відповідає на який виклик

| Ви хочете | Звертатися до | Порт хоста Z3 mainnet | Примітки |
| --- | --- | --- | --- |
| Вершина ланцюга, піри, `getblockchaininfo` | JSON-RPC Zebra | 8232 | Автентифікація cookie |
| Баланс гаманця, адреси, надсилання | RPC Zallet | 28232 | Окремий процес; бета-програмне забезпечення |
| Компактні блоки для легких гаманців | gRPC Zaino | 8137 | Лише з `--profile indexer`; відкритий текст h2c |
| Проксі JSON-RPC для оглядача / крана | JSON-RPC Zaino | 8237 | Лише довірена мережа |
| Практикувати все вищезазначене без синхронізації | rpc-router Z3 regtest | 8181 | Ім’я користувача `zebra` / пароль `zebra` |

Матриця портів і назви проєктів Compose: [Z3 Stack](/zcash-tech/z3-stack) та [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Спершу попрактикуйтеся на regtest

З checkout Z3, після `./scripts/regtest-init.sh` і `docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Справний результат `getblockchaininfo` містить `"blocks"` і мапу `"upgrades"`. Якщо curl зависає, router не запущений; якщо ви отримуєте `401`, ви звертаєтеся безпосередньо до Zebra замість router (прямий Zebra у regtest — це `29232` і він усе ще очікує облікові дані router, якщо ви їх не змінили).

Повний робочий процес regtest, включно з видобуванням блоків активації: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC mainnet / testnet (автентифікація cookie)

У mainnet і testnet Zallet та необов’язкова служба Zaino читають **спільний том cookie**. Цей cookie повторно генерується під час завантаження; він не є ціллю для резервного копіювання.

**Не** публікуйте JSON-RPC Zebra у публічному інтернеті. Викликайте його з мережі Compose (`zebra:8232`) або лише з хоста, якщо ви прив’язали його до loopback.

Типові перевірки оператора після того, як Zebra має статус `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` — це RPC для майнінгу. Пулам, які все ще очікували єдиний процес `zcashd`, потрібен Zebra (або Zakura) для шаблонів, а також гаманець, який вони використовують для coinbase. Дивіться [ZcashМайнінгові пули](/using-zcash/zcash-mining-pools) та [посібник із міграції](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Підключення індексатора

Валідація та індексування — різні завдання.

### Zaino (що постачає Z3)

Zaino читає Zebra і надає API gRPC, сумісний із lightwalletd, а також проксі JSON-RPC. Zallet **не** потребує окремого контейнера Zaino; він вбудовує бібліотеки Zaino і взаємодіє з Zebra через JSON-RPC. Запускайте окремий Zaino, коли потрібні зовнішні легкі гаманці, оглядачі або крани:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Зачекайте, доки Zebra синхронізується, перш ніж спрямовувати клієнти до Zaino. Масовий індексатор у режимі надолуження з високою паралельністю отримання може уповільнити верифікатор Zebra; тримайте `fetch_concurrency` на рівні кількох одиниць, доки індексатор не надолужить.

gRPC regtest (відкритий текст; порт `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

gRPC Zaino використовує відкритий текст h2c у всіх мережах. Завершуйте TLS на зворотному проксі, якщо підключатиметься щось поза хостом. Деталі: [Zaino](/zcash-tech/zaino) та [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Інші індексатори (не Z3)

* **lightwalletd** — старіший сервер компактних блоків. Досі розгорнутий у реальному середовищі; Zaino є наступним шляхом для цієї ролі.
* **Ztreamer** — індексатор на основі Zakura та реалізація `CompactTxStreamer`. Це не служба Z3. Дивіться [Ztreamerрепозиторій](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — необов’язковий слухач gRPC *всередині* Zebra. Z3 його не вимагає й не публікує на хості.

---

## Поширені помилки

**Виклик методів гаманця на Zebra.** `getwalletinfo` і RPC надсилання належать Zallet (або іншому гаманцю), а не консенсусному вузлу.

**Запуск Zallet до того, як Zebra стане `/ready`.** Zallet увійде в цикл перезапуску. Використовуйте `scripts/check-zebra-readiness.sh` у mainnet/testnet.

**Копіювання `zebra`/`zebra` regtest у mainnet.** Автентифікація cookie є типовою для mainnet/testnet не без причини.

**Сприйняття Zaino як повного вузла.** Zebra (або Zakura) виконує валідацію. Zaino виконує індексування.

**Публічне відкриття JSON-RPC Zaino або gRPC індексатора Zebra.** Ці кінцеві точки призначені для loopback або довіреної приватної мережі.

**Припущення, що кожен легкий гаманець уже підтримує Zaino.** Перевірте поточний випуск гаманця щодо протоколу, який він фактично реалізує.

---

## Пов’язані сторінки

* [Z3 Stack](/zcash-tech/z3-stack) — встановлення, порти, томи, двофазне завантаження
* [Zaino](/zcash-tech/zaino) — роль індексатора та примітки для операторів
* [Повні вузли](/zcash-tech/full-nodes)
* [повний вузол Zebra](/zcash-tech/zebra-full-node)
* [Вузли легких гаманців](/zcash-tech/lightwallet-nodes)
* [Посібник із міграції: zcashd до Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib та посібник Zaino](/guides/zingolib-and-zaino-tutorial)

## Ресурси

* [репозиторій Z3](https://github.com/ZcashFoundation/z3)
* [збірник рецептів Z3 regtest (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [поширені запитання Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [книга Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Останнє оновлення:** вересень 2026
