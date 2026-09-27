<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

**Z3 Stack** — это пакетная платформа узлов Zcash Foundation: **Zebra** (полный узел) + **Zallet** (кошелёк полного узла), с дополнительным индексатором **Zaino**. Она предназначена для замены отдельного процесса `zcashd`, который объединял консенсус и кошелёк в одном бинарном файле и достиг конца жизненного цикла 18 июля 2026 года.

Эталонная реализация — проект Docker Compose по адресу [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

---

## Кратко

* Z3 — **не новый клиент консенсуса**. Это способ совместно запускать стек после `zcashd`: Zebra проверяет цепочку, Zallet хранит ключи и предоставляет RPC кошелька, а Zaino (опционально) использует протокол gRPC lightwalletd.
* `zcashd` объединял узел и кошелёк. Z3 **разделяет эти роли**. Биржи, майнинговые пулы и другие операторы кошельков полного узла переходят на эту комбинацию, а не только на Zebra.
* На одном хосте могут работать три изолированных проекта Compose: **mainnet**, **testnet** и **regtest**.
* Первоначальная синхронизация mainnet занимает примерно **24–72 часа** и требует около **300 ГБ**. Regtest запускается за секунды и является подходящим местом для изучения стека.
* Zallet встраивает библиотеки индексатора Zaino и взаимодействует с Zebra через JSON-RPC. Отдельный сервис Zaino нужен только если вам требуется совместимая с lightwalletd конечная точка для внешних кошельков.
* Zallet находится в стадии **бета-версии**. Критические изменения могут потребовать удаления и повторного создания кошелька. Не считайте это готовым ПО для хранения крупных сумм.

---

## Зачем существует Z3

На протяжении большей части существования Zcash, `zcashd` был одновременно эталонным полным узлом и единственным промышленным кошельком полного узла. Именно с этой архитектурой интегрировались биржи, пулы и кастодианы.

`zcashd` выведен из эксплуатации. Консенсус перешёл в [Zebra](/zcash-tech/zebra-full-node) (а теперь также в [Zakura](/zcash-tech/zakura-node)). Встроенный кошелёк переместился в [Zallet](https://github.com/zcash/zallet). Обслуживание лёгких кошельков переносится с [lightwalletd](/zcash-tech/lightwallet-nodes) на [Zaino](/zcash-tech/zaino).

Эти три компонента находятся в отдельных репозиториях, имеют отдельные циклы выпуска и отдельные конфигурации. Z3 — это связующее звено: закреплённые образы, проверки работоспособности, которые не дают кошельку запуститься до синхронизации узла, порты и тома для каждой сети, а также документированный путь для оператора.

Название является неформальным сокращением в экосистеме — Zebra, Zaino, Zallet — хотя файл Compose по умолчанию запускает только Zebra и Zallet. Zaino — это профиль Compose, а не обязательный третий процесс.

---

## Архитектура

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

| Компонент | Роль в Z3 | Обязателен? |
| --- | --- | --- |
| **Zebra** | Синхронизирует и проверяет цепочку, gossip, JSON-RPC, конечная точка проверки работоспособности | Да |
| **Zallet** | Кошелёк полного узла. Встраивает библиотеки Zaino. Подключается напрямую к JSON-RPC Zebra. **Не** вызывает отдельный контейнер Zaino | Да |
| **Zaino** | Отдельный индексатор. Совместимый с lightwalletd gRPC для внешних лёгких клиентов, а также прокси JSON-RPC для обозревателей и кранов | Нет — `--profile indexer` |

Z3 закрепляет версии образов в `docker-compose.yml`. При необходимости другого тега переопределите их с помощью `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` или `Z3_ZALLET_IMAGE`.

---

## Чем это отличается от zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Язык | C++ (форк Bitcoin) | Сервисы Rust, оркестрируемые Docker Compose |
| Модель процессов | Один бинарный файл: узел + кошелёк | Отдельные контейнеры узла и кошелька |
| Консенсус | Выведен из эксплуатации (EOL 18 июля 2026 года) | Zebra (или другой совместимый узел) |
| Кошелёк | Встроенный `wallet.dat` | Zallet, каталог данных, зашифрованный age |
| Лёгкие клиенты | Обычно отдельный lightwalletd | Опциональный профиль Zaino |
| Конфигурация | `zcash.conf` | Файлы для каждой сети в `config/<network>/` плюс файлы окружения Compose |
| Сети на одном хосте | Неудобные конфликты портов | Поддерживается напрямую: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Если у вас всё ещё есть кошелёк `zcashd`, используйте руководство по миграции ZecHub [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) и команду `migrate-zcashd-wallet` от Zallet вместо копирования `wallet.dat` в том Z3.

---

## Сети

Z3 состоит из трёх независимых проектов Compose. Они не используют общие порты или тома.

| Сеть | Имя проекта | Использование | Первая синхронизация | Реальные средства |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Рабочая среда | 24–72 часа | Да |
| **testnet** | `z3-testnet` | Тестирование в публичной тестовой сети | 2–12 часов | Нет (тестовые ZEC) |
| **regtest** | `z3-regtest` | Локальная практика: мгновенные блоки, без пиров | Секунды | Нет |

Новым операторам следует начать с **regtest**, проверить потоки RPC и кошелька, затем перейти на testnet или mainnet.

---

## Стандартные порты хоста

Все три сети рассчитаны на одновременную работу на одной машине. Приведённые ниже значения являются опубликованными значениями по умолчанию; каждое можно переопределить через соответствующую переменную окружения `Z3_*`. Каноническая матрица: [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Сервис | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| JSON-RPC Zebra | 8232 | 18232 | 29232 |
| P2P Zebra | 8233 | 18233 | (не опубликован) |
| Проверка работоспособности Zebra (`/ready`) | 8080 | 18080 | 28080 |
| gRPC Zaino (профиль индексатора) | 8137 | 18137 | 28137 |
| JSON-RPC Zaino (профиль индексатора) | 8237 | 18237 | 28237 |
| RPC Zallet | 28232 | 40232 | 50232 |

Внутри сети Compose сервисы разрешаются по именам (`zebra`, `zaino`, `zallet`).

---

## Данные и резервные копии

| Том | Что содержит | Создавать резервную копию? |
| --- | --- | --- |
| `z3-<network>-chain` | Состояние цепочки Zebra (~300 ГБ в mainnet) | Опционально — можно синхронизировать заново |
| `z3-<network>-zallet` | Зашифрованная база данных кошелька **и** идентификатор age, который её разблокирует | **Да — это единственный том, для которого необходимо создавать резервную копию** |
| `z3-<network>-zaino` | Состояние индексатора (только с профилем индексатора) | Опционально — можно перестроить |
| `z3-<network>-cookie` | Cookie RPC Zebra | Нет — создаётся заново |

Чтобы разместить состояние цепочки на другом диске перед первым запуском:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` останавливает стек и сохраняет тома. Добавление `-v` удаляет их и принудительно запускает полную повторную синхронизацию. Добавьте `--profile "*"`, чтобы сервисы, ограниченные профилем (индексатор, мониторинг), действительно были остановлены.

---

## Начало работы

Требования: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` требуется только для regtest.

### Regtest (самый быстрый способ увидеть стек)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Команды для тестирования приведены в [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Mainnet (двухэтапный запуск)

Zebra должен завершить синхронизацию, прежде чем Zallet станет полезен. Ранний запуск Zallet заставляет его перезапускаться в цикле, пока условие `/ready` не станет истинным.

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

Для testnet используется тот же процесс с `.env.testnet` и `./scripts/check-zebra-readiness.sh 18080`.

Изменения в `config/<network>/` остаются локальными и сохраняются после `git pull`.

### Опциональные профили

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Стандартные порты Grafana: 3000 (mainnet), 13000 (testnet), 23000 (regtest).

---

## Примечания для операторов

* **Закреплённые образы.** Z3 не переходит незаметно на `:latest`. Обновите закреплённую версию в проверенном изменении либо задайте `Z3_<SERVICE>_IMAGE`.
* **Контейнеры без root.** Возможности Linux удалены. Проверки работоспособности удерживают запуск кошелька до готовности Zebra. Политика перезапуска включена по умолчанию.
* **Журналы.** Z3 не закрепляет драйвер логирования. Установите ограничения размера в конфигурации демона Docker, иначе журналы будут бесконтрольно расти на круглосуточно работающем узле.
* **P2P.** Mainnet и testnet публикуют P2P-порт Zebra. За NAT задайте `ZEBRA_NETWORK__EXTERNAL_ADDR` как адрес, который должны набирать пиры. В regtest пиров нет.
* **Zaino на ARM.** Восходящий образ Zaino доступен только для `linux/amd64`. На Apple Silicon он работает через эмуляцию, если только вы не соберёте его из исходного кода. Zebra и Zallet поддерживают несколько архитектур.
* **Общие хосты.** По умолчанию ограничения CPU или памяти не заданы. Добавьте `deploy.resources.limits` в файл переопределения, если машина не выделена исключительно для узла.

Контрольный список для рабочей среды и FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Кому стоит запускать Z3

**Подходит**

* Биржам, кастодианам и майнинговым пулам, использовавшим `zcashd` как узел с кошельком
* Операторам, которым нужен поддерживаемый RPC кошелька полного узла с синхронизированным Zebra
* Разработчикам, которым нужны mainnet, testnet и regtest одновременно
* Всем, кто разворачивает частную совместимую с lightwalletd конечную точку через профиль Zaino

**Обычно это неподходящий инструмент**

* Конечным пользователям, которым нужно лишь отправлять и получать ZEC — используйте лёгкий кошелёк, такой как ZODL / Zashi, Zingo или YWallet
* Тем, кто хочет только проверять цепочку — запускайте только Zebra (или Zakura)
* Тем, кто хочет только обслуживать компактные блоки — запускайте Zebra + Zaino или Zebra + lightwalletd без Zallet

---

## Связанные страницы

* [Zebra Полный узел](/zcash-tech/zebra-full-node) — узел консенсуса, который использует Z3
* [Zaino](/zcash-tech/zaino) — опциональный профиль индексатора
* [Полные узлы](/zcash-tech/full-nodes) — Zebra, Zakura и выведенный из эксплуатации zcashd
* [Узлы lightwallet](/zcash-tech/lightwallet-nodes) — с чем взаимодействуют лёгкие клиенты
* [Zakura Узел](/zcash-tech/zakura-node) — альтернативный полный узел; сегодня Z3 его не поставляет
* [Руководство по миграции: zcashd в Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Ресурсы для разработчиков](/start-here/developer-resources)

---

## Ресурсы

* [Репозиторий Z3](https://github.com/ZcashFoundation/z3)
* [Контракт Z3 (порты, тома, имена проектов)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Книга Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Книга Zallet](https://zcash.github.io/zallet/)
* [ZcashФорум сообщества — обновления Z3](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — панель управления сообщества поверх официального стека Compose (ZecHub Hackathon)
