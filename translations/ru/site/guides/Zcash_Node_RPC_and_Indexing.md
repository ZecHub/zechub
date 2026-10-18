<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>

# Практическое руководство: RPC узла Zcash и индексирование блокчейна

Эта страница представляет собой практическое руководство по взаимодействию с работающим полным узлом Zcash через JSON-RPC и подключению индексатора, к которому могут обращаться лёгкие кошельки и обозреватели. Это **не** второе руководство по установке.

О том, как запустить стек после `zcashd` (Zebra + Zallet, необязательный Zaino, порты, тома, двухэтапная загрузка), см. страницу [Z3 Stack](/zcash-tech/z3-stack) и [репозиторий Z3](https://github.com/ZcashFoundation/z3). Сведения об узлах консенсуса см. в разделах [Полные узлы](/zcash-tech/full-nodes) и [полный узел Zebra](/zcash-tech/zebra-full-node).

`zcashd` прекратил поддержку 18 июля 2026 года. Новая работа операторов должна быть ориентирована на Zebra (или [Zakura](/zcash-tech/zakura-node)) вместе с кошельком/индексатором, а не на `zcashd`.

---

## Кратко

* **JSON-RPC** — это способ, которым операторы и кошельки запрашивают у узла информацию о вершине цепочки, пирах и (в процессе кошелька) балансах. В Z3 Zebra обслуживает RPC узла; Zallet обслуживает RPC кошелька.
* **Regtest** — подходящее место для изучения вызовов. rpc-router Z3 на `http://127.0.0.1:8181` принимает `zebra` / `zebra` и перенаправляет методы узла в Zebra, а методы кошелька — в Zallet.
* **Mainnet и testnet** используют аутентификацию по cookie в Zebra. Не копируйте имя пользователя/пароль regtest на публичный узел.
* **Индексирование** — отдельная от валидации задача. Zebra выполняет валидацию. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) предоставляет gRPC, совместимый с lightwalletd. [Ztreamer](https://github.com/distractedm1nd/ztreamer) — это индексатор на базе Zakura; он не входит в поставку Z3.
* JSON-RPC Zaino и необязательный индексаторский gRPC Zebra предназначены для loopback или доверенной сети. Не публикуйте их без аутентификации в публичном интернете.

---

## Какой процесс отвечает на какой вызов

| Вам нужно | Обращаться к | Порт хоста Z3 mainnet | Примечания |
| --- | --- | --- | --- |
| Вершина цепочки, пиры, `getblockchaininfo` | JSON-RPC Zebra | 8232 | Аутентификация по cookie |
| Баланс кошелька, адреса, отправка | RPC Zallet | 28232 | Отдельный процесс; бета-версия ПО |
| Компактные блоки для лёгких кошельков | gRPC Zaino | 8137 | Только с `--profile indexer`; незашифрованный h2c |
| Прокси JSON-RPC для обозревателя / крана | JSON-RPC Zaino | 8237 | Только доверенная сеть |
| Практиковать всё вышеперечисленное без синхронизации | rpc-router Z3 regtest | 8181 | Имя пользователя `zebra` / пароль `zebra` |

Матрица портов и имена проектов Compose: [Z3 Stack](/zcash-tech/z3-stack) и [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Сначала попрактикуйтесь в regtest

Из рабочей копии Z3, после `./scripts/regtest-init.sh` и `docker compose --env-file .env.regtest up -d`:

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

Исправный результат `getblockchaininfo` включает `"blocks"` и карту `"upgrades"`. Если curl зависает, роутер не запущен; если вы получаете `401`, вы обращаетесь напрямую к Zebra вместо роутера (прямой Zebra в regtest находится на `29232` и по-прежнему ожидает учётные данные роутера, если вы их не изменили).

Полный процесс работы с regtest, включая майнинг блоков активации: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## JSON-RPC mainnet / testnet (аутентификация по cookie)

В mainnet и testnet Zallet и необязательный сервис Zaino используют **общий том cookie**. Этот cookie создаётся заново при загрузке; он не предназначен для резервного копирования.

**Не** публикуйте JSON-RPC Zebra в публичном интернете. Вызывайте его из сети Compose (`zebra:8232`) или с хоста только в случае привязки к loopback.

Типичные проверки оператора после того, как Zebra находится в состоянии `/ready`:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` — это RPC для майнинга. Пулам, которые всё ещё ожидали единый процесс `zcashd`, нужны Zebra (или Zakura) для шаблонов, а также любой используемый ими кошелёк для coinbase. См. [майнинговые пулы Zcash](/using-zcash/zcash-mining-pools) и [руководство по миграции](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Подключение индексатора

Валидация и индексирование — разные задачи.

### Zaino (поставляется с Z3)

Zaino читает Zebra и предоставляет gRPC API, совместимый с lightwalletd, а также прокси JSON-RPC. Zallet **не** требует отдельного контейнера Zaino; он встраивает библиотеки Zaino и взаимодействует с Zebra через JSON-RPC. Запускайте отдельный Zaino, если вам нужны внешние лёгкие кошельки, обозреватели или краны:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Дождитесь синхронизации Zebra, прежде чем направлять клиентов к Zaino. Массовый индексатор в режиме догоняющей синхронизации с высокой параллельностью получения данных может замедлить верификатор Zebra; держите `fetch_concurrency` на уровне нескольких единиц, пока индексатор не завершит синхронизацию.

gRPC regtest (незашифрованный; порт `28137`):

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

gRPC Zaino использует незашифрованный h2c во всех сетях. Завершайте TLS на обратном прокси, если подключаться будет что-либо за пределами хоста. Подробнее: [Zaino](/zcash-tech/zaino) и [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Другие индексаторы (не Z3)

* **lightwalletd** — старый сервер компактных блоков. Всё ещё развёрнут в реальных системах; Zaino — путь-преемник для этой роли.
* **Ztreamer** — индексатор на базе Zakura и реализация `CompactTxStreamer`. Это не сервис Z3. См. [репозиторий Ztreamer](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — необязательный слушатель gRPC *внутри* Zebra. Z3 не требует его и не публикует его на хосте.

---

## Распространённые ошибки

**Вызов методов кошелька в Zebra.** `getwalletinfo` и RPC отправки относятся к Zallet (или другому кошельку), а не к узлу консенсуса.

**Запуск Zallet до того, как Zebra станет `/ready`.** Zallet будет перезапускаться в цикле. Используйте `scripts/check-zebra-readiness.sh` в mainnet/testnet.

**Копирование `zebra`/`zebra` regtest в mainnet.** Аутентификация по cookie является стандартом mainnet/testnet не без причины.

**Считать Zaino полным узлом.** Zebra (или Zakura) выполняет валидацию. Zaino выполняет индексирование.

**Публичное раскрытие JSON-RPC Zaino или gRPC индексатора Zebra.** Эти конечные точки предназначены для loopback или доверенной частной сети.

**Предполагать, что каждый лёгкий кошелёк уже поддерживает Zaino.** Сверяйте текущий релиз кошелька с протоколом, который он действительно реализует.

---

## Связанные страницы

* [Z3 Stack](/zcash-tech/z3-stack) — установка, порты, тома, двухэтапная загрузка
* [Zaino](/zcash-tech/zaino) — роль индексатора и заметки для операторов
* [Полные узлы](/zcash-tech/full-nodes)
* [полный узел Zebra](/zcash-tech/zebra-full-node)
* [Узлы Lightwallet](/zcash-tech/lightwallet-nodes)
* [Руководство по миграции: с zcashd на Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib и руководство Zaino](/guides/zingolib-and-zaino-tutorial)

## Ресурсы

* [репозиторий Z3](https://github.com/ZcashFoundation/z3)
* [Практическое руководство Z3 regtest (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Часто задаваемые вопросы Z3](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Книга Zallet](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Последнее обновление:** сентябрь 2026
