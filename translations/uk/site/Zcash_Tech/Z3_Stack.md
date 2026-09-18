<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# Z3 Stack

**Z3 Stack** — це пакетована платформа вузлів Zcash Foundation: **Zebra** (повний вузол) + **Zallet** (гаманець повного вузла), з необов’язковим індексатором **Zaino**. Вона призначена для заміни окремого процесу `zcashd`, який поєднував консенсус і гаманець в одному бінарному файлі та досяг кінця життєвого циклу 18 липня 2026 року.

Еталонною реалізацією є проєкт Docker Compose за адресою [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## Коротко

* Z3 — **не новий клієнт консенсусу**. Це спосіб запускати стек після `zcashd` разом: Zebra перевіряє ланцюг, Zallet зберігає ключі та надає RPC гаманця, а Zaino (необов’язково) підтримує протокол gRPC lightwalletd.
* `zcashd` поєднував вузол і гаманець. Z3 **розділяє ці ролі**. Біржі, майнінгові пули та інші оператори гаманців повних вузлів мігрують на цю комбінацію, а не лише на Zebra.
* На одному хості можуть працювати три ізольовані проєкти Compose: **mainnet**, **testnet** і **regtest**.
* Перша синхронізація mainnet займає приблизно **24–72 години** та потребує близько **300 GB**. Regtest запускається за секунди й є правильним місцем для ознайомлення зі стеком.
* Zallet вбудовує бібліотеки індексатора Zaino та взаємодіє з Zebra через JSON-RPC. Окремий сервіс Zaino потрібен лише тоді, коли вам потрібна сумісна з lightwalletd кінцева точка для зовнішніх гаманців.
* Zallet перебуває у **бета-версії**. Несумісні зміни можуть вимагати видалення та повторного створення гаманця. Не вважайте це готовим програмним забезпеченням для зберігання великих сум.

---

## Чому існує Z3

Протягом більшої частини існування Zcash, `zcashd` був одночасно еталонним повним вузлом і єдиним виробничим гаманцем повного вузла. Саме з такою архітектурою інтегрувалися біржі, пули та кастодіани.

`zcashd` виведено з експлуатації. Консенсус перенесено до [Zebra](/zcash-tech/zebra-full-node) (а тепер також до [Zakura](/zcash-tech/zakura-node)). Вбудований гаманець перенесено до [Zallet](https://github.com/zcash/zallet). Обслуговування легких гаманців переноситься з [lightwalletd](/zcash-tech/lightwallet-nodes) до [Zaino](/zcash-tech/zaino).

Ці три частини є окремими репозиторіями, мають окремі цикли випуску та окремі конфігурації. Z3 — це зв’язувальна ланка: закріплені образи, перевірки працездатності, які не дають гаманцю стартувати до синхронізації вузла, порти й томи для кожної мережі та задокументований шлях для оператора.

Назва є неформальним скороченням в екосистемі — Zebra, Zaino, Zallet — хоча типовий файл Compose запускає лише Zebra і Zallet. Zaino є профілем Compose, а не обов’язковим третім процесом.

---

## Архітектура

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Компонент | Роль у Z3 | Обов’язковий? |
| --- | --- | --- |
| **Zebra** | Синхронізує та перевіряє ланцюг, gossip, JSON-RPC, кінцева точка працездатності | Так |
| **Zallet** | Гаманець повного вузла. Вбудовує бібліотеки Zaino. Підключається безпосередньо до JSON-RPC Zebra. **Не** викликає окремий контейнер Zaino | Так |
| **Zaino** | Окремий індексатор. Сумісний з lightwalletd gRPC для зовнішніх легких клієнтів, а також проксі JSON-RPC для оглядачів і кранів | Ні — `--profile indexer` |

Z3 закріплює версії образів у `docker-compose.yml`. Перевизначте їх за допомогою `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` або `Z3_ZALLET_IMAGE`, якщо вам потрібен інший тег.

---

## Чим це відрізняється від zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Мова | C++ (форк Bitcoin) | Сервіси Rust, оркестровані Docker Compose |
| Модель процесів | Один бінарний файл: вузол + гаманець | Окремі контейнери вузла та гаманця |
| Консенсус | Виведено з експлуатації (EOS 18 липня 2026 року) | Zebra (або інший сумісний вузол) |
| Гаманець | Вбудований `wallet.dat` | Zallet, каталог даних із шифруванням age |
| Легкі клієнти | Зазвичай окремий lightwalletd | Необов’язковий профіль Zaino |
| Конфігурація | `zcash.conf` | Файли для кожної мережі в `config/<network>/` плюс файли середовища Compose |
| Мережі на одному хості | Проблемні конфлікти портів | Повноцінна підтримка: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Якщо у вас досі є гаманець `zcashd`, скористайтеся ZecHub [посібником з міграції](/guides/migration-guide-zcashd-to-zebrad-zallet) та командою Zallet `migrate-zcashd-wallet` замість копіювання `wallet.dat` до тому Z3.

---

## Мережі

Z3 — це три незалежні проєкти Compose. Вони не використовують спільні порти чи томи.

| Мережа | Назва проєкту | Використання | Перша синхронізація | Реальні кошти |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Виробниче використання | 24–72 години | Так |
| **testnet** | `z3-testnet` | Тестування в публічній тестовій мережі | 2–12 годин | Ні (тестові ZEC) |
| **regtest** | `z3-regtest` | Локальна практика: миттєві блоки, без пірів | Секунди | Ні |

Новим операторам слід почати з **regtest**, перевірити RPC і робочі процеси гаманця, а потім перейти до testnet або mainnet.

---

## Типові порти хоста

Усі три мережі призначені для одночасної роботи на одній машині. Значення нижче є опублікованими типовими значеннями; кожне з них можна перевизначити через відповідну змінну середовища `Z3_*`. Канонічна матриця: [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Сервіс | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC Zebra | 8232 | 18232 | 29232 |
| P2P Zebra | 8233 | 18233 | (не опубліковано) |
| Перевірка працездатності Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC Zaino (профіль індексатора) | 8137 | 18137 | 28137 |
| JSON-RPC Zaino (профіль індексатора) | 8237 | 18237 | 28237 |
| RPC Zallet | 28232 | 40232 | 50232 |

Усередині мережі Compose сервіси визначаються за іменем (`zebra`, `zaino`, `zallet`).

---

## Дані та резервні копії

| Том | Що він містить | Створювати резервну копію? |
| --- | --- | --- |
| `z3-<network>-chain` | Стан ланцюга Zebra (~300 GB у mainnet) | Необов’язково — можна повторно синхронізувати |
| `z3-<network>-zallet` | Зашифрована база даних гаманця **та** ідентифікатор age, що її розблоковує | **Так — це єдиний том, резервну копію якого обов’язково слід створити** |
| `z3-<network>-zaino` | Стан індексатора (лише з профілем індексатора) | Необов’язково — можна перебудувати |
| `z3-<network>-cookie` | RPC cookie Zebra | Ні — генерується повторно |

Щоб розмістити стан ланцюга на іншому диску перед першим запуском:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` зупиняє стек і зберігає томи. Додавання `-v` видаляє їх і примушує до повної повторної синхронізації. Додайте `--profile "*"`, щоб сервіси, керовані профілем (індексатор, моніторинг), справді було зупинено.

---

## Початок роботи

Передумови: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` потрібен лише для regtest.

### Regtest (найшвидший спосіб побачити стек)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Дивіться [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) для тестових команд.

### Mainnet (двофазний запуск)

Zebra має завершити синхронізацію, перш ніж Zallet стане корисним. Ранній запуск Zallet призводить до циклічних перезапусків, доки `/ready` не стане істинним.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Для testnet використовується той самий процес із `.env.testnet` та `./scripts/check-zebra-readiness.sh 18080`.

Зміни в `config/<network>/` залишаються локальними та зберігаються після `git pull`.

### Необов’язкові профілі

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Типові порти Grafana: 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Примітки для оператора

* **Закріплені образи.** Z3 не переходить непомітно на `:latest`. Оновіть закріплену версію в перевіреній зміні або встановіть `Z3_<SERVICE>_IMAGE`.
* **Контейнери без root.** Можливості Linux скинуто. Перевірки працездатності не запускають гаманець, доки Zebra не буде готовий. Політика перезапуску ввімкнена типово.
* **Журнали.** Z3 не закріплює драйвер журналювання. Встановіть обмеження розміру в конфігурації демона Docker, інакше журнали безмежно зростатимуть на вузлі, що працює 24/7.
* **P2P.** Mainnet і testnet публікують P2P-порт Zebra. За NAT установіть `ZEBRA_NETWORK__EXTERNAL_ADDR` на адресу, яку мають набирати піри. Regtest не має пірів.
* **Zaino на ARM.** Вихідний образ Zaino доступний лише для `linux/amd64`. На Apple Silicon він працює в емуляції, якщо не зібрати його з вихідного коду. Zebra і Zallet є мультиархітектурними.
* **Спільні хости.** Типово обмеження CPU або пам’яті не встановлені. Додайте `deploy.resources.limits` до файлу перевизначення, якщо машина не призначена винятково для вузла.

Контрольний список для виробничого середовища та FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Кому варто запускати Z3

**Добре підходить**

* Біржам, кастодіанам і майнінговим пулам, які використовували `zcashd` як вузол із гаманцем
* Операторам, яким потрібен підтримуваний RPC гаманця повного вузла із синхронізованим Zebra
* Розробникам, яким потрібні mainnet, testnet і regtest поруч
* Будь-кому, хто розгортає приватну сумісну з lightwalletd кінцеву точку через профіль Zaino

**Зазвичай це неправильний інструмент**

* Кінцевим користувачам, яким потрібно лише надсилати й отримувати ZEC — скористайтеся легким гаманцем, таким як ZODL / Zashi, Zingo або YWallet
* Тим, хто хоче лише перевіряти ланцюг — запускайте окремо Zebra (або Zakura)
* Тим, хто хоче лише обслуговувати компактні блоки — запускайте Zebra + Zaino або Zebra + lightwalletd без Zallet

---

## Пов’язані сторінки

* [Zebra Повний вузол](/zcash-tech/zebra-full-node) — вузол консенсусу, який охоплює Z3
* [Zaino](/zcash-tech/zaino) — необов’язковий профіль індексатора
* [Повні вузли](/zcash-tech/full-nodes) — Zebra, Zakura та виведений з експлуатації zcashd
* [Вузли lightwallet](/zcash-tech/lightwallet-nodes) — з чим взаємодіють легкі клієнти
* [Zakura Вузол](/zcash-tech/zakura-node) — альтернативний повний вузол; Z3 не постачає його сьогодні
* [Посібник з міграції: zcashd до Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Ресурси для розробників](/start-here/developer-resources)

---

## Ресурси

* [Репозиторій Z3](https://github.com/ZcashFoundation/z3)
* [Контракт Z3 (порти, томи, назви проєктів)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Книга Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Книга Zallet](https://zcash.github.io/zallet/)
* [ZcashФорум спільноти — оновлення Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Запускач Z3](https://github.com/Jubrilabdulazeez/z3-launcher) — контрольна площина спільноти над офіційним стеком Compose (ZecHub Hackathon)
