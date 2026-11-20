<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet — это кошелёк Zcash для полного узла, написанный на Rust. Он заменяет кошелёк, который раньше был встроен в `zcashd`. После того как `zcashd` достиг остановки End-of-Support 18 июля 2026 года на высоте блока 3417100, обязанности консенсуса и кошелька были разделены: **Zebra** или **Zakura** проверяют цепочку, а **Zallet** хранит ключи, сканирует ноты и предоставляет JSON-RPC кошелька.

Zallet сейчас находится в **бета-версии**. Он не прошёл полный аудит. Несовместимые изменения могут потребовать удаления и повторного создания кошелька. Не считайте его решением для промышленного хранения крупных сумм ZEC, не ознакомившись с предупреждениями по безопасности в [Книге Zallet](https://zcash.github.io/zallet/).

---

## Кратко

- Zallet — это **RPC-кошелёк для полного узла**, а не мобильный лёгкий кошелёк и не узел консенсуса.
- Он заменяет часть кошелька в `zcashd`. Часть узла — это [Zebra](Zebra_Full_Node.md) или [Zakura](Zakura_Node.md).
- Написан на **Rust**, имеет двойную лицензию MIT / Apache-2.0 и поддерживается в [zcash/zallet](https://github.com/zcash/zallet).
- Последний опубликованный релиз: **v0.1.0-beta.4** (2 ноября 2026 года). Он следует за [NU7](NU7.md) и требует `zebrad` версии **7.0.0 или более поздней**.
- Читает данные цепочки через один бэкенд — **zebra**: `ReadStateService` к каталогу состояния `zebrad` на том же узле, а также JSON-RPC от Zebra. Бэкенд Zaino удалён в версии v0.1.0-beta.4.
- Предоставляет подмножество **zcashd-совместимого JSON-RPC**. Некоторые методы изменены, а некоторые намеренно исключены.
- Ключевой материал всегда зашифрован с помощью **age**. История транзакций, адреса и ключи просмотра хранятся открыто в `wallet.db`.
- Поставляется с двумя бинарными файлами в одном подписанном архиве: `zallet` (запускатор) и `zallet-zebra`. **Только Linux** подходит для синхронизации кошелька: на macOS и Windows пока не работает бэкенд цепочки.
- `zallet backup` (новинка beta.4) создаёт согласованный снимок работающего или остановленного кошелька.
- Официальная документация: [Книга Zallet](https://zcash.github.io/zallet/).

---

## Почему существует Zallet

`zcashd` объединял узел консенсуса, производный от Bitcoin Core, и кошелёк в одном процессе. Этот подход больше не используется.

| Роль | Старый стек | Текущий стек |
|------|-----------|---------------|
| Консенсус / P2P | `zcashd` | Zebra (`zebrad`) или Zakura |
| Кошелёк / ключи / балансы | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Индексатор лёгких клиентов | `lightwalletd` | Zaino или `lightwalletd` |

Выделение кошелька из узла означает следующее:

- Программное обеспечение узла можно менять (Zebra или Zakura), не перемещая ключи.
- Сканирование кошелька и полномочия на расходование находятся в процессе, который можно отдельно защитить.
- Семантика RPC может развиваться в сторону 32 аккаунтов ZIP, Unified Addresses и PCZT, вместо сохранения особенностей `zcashd`.

Zallet — это кошелёк для операторов, которые ранее использовали `zcashd` как горячий кошелёк, бэкенд биржи, кран или кошелёк для выплат от майнинга.

---

## Статус

Zallet находится в **бета-версии**.

На практике это означает:

- Несовместимые изменения могут появиться в любой бета-версии. Возможно, потребуется удалить каталог данных и начать заново.
- Перенесены не все RPC кошелька `zcashd`.
- Семантика некоторых перенесённых методов отличается от `zcashd`. Интеграциям следует ознакомиться со страницей [изменённой семантики](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Крейтам всё ещё ведётся разработка, и они не прошли полный аудит.
- Zallet **не является** библиотекой Rust. При использовании его как библиотеки никаких гарантий нет.

Отзывы направляйте в [issues GitHub](https://github.com/zcash/zallet/issues/new) или канал `#wallet-dev` в [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

Позднее запланирована стабильная фаза, когда будет реализован предусмотренный набор RPC. Тогда от вызывающих сторон будет ожидаться переход на методы Zallet, включая задокументированные семантические различия.

---

## Архитектура

Zallet разделён между рабочими пространствами Cargo, чтобы каждый бэкенд цепочки мог отслеживать собственный граф зависимостей. Начиная с v0.1.0-beta.4 поставляется только бэкенд zebra.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Оба бинарных файла открывают тот же `wallet.db`. До v0.1.0-beta.3 также существовал бэкенд `zallet-zaino`. Если в вашем `zallet.toml` указано `backend = "zaino"`, замените это на `backend = "zebra"`. Перенос базы данных кошелька не требуется, а старую папку `zaino` в каталоге данных можно удалить.

Бэкенд zebra напрямую читает базу данных состояния `zebrad`, поэтому ему нужен `zebrad`, собранный с функцией `indexer`, и его каталог состояния **на том же узле**. Для Zallet в одном контейнере, обращающегося по сети к `zebrad` в другом контейнере, поддерживаемой конфигурации нет, пока не появится бэкенд, работающий только по сети ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Типичное развёртывание:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet — это **кошелёк полного узла**: ему нужен локальный проверяющий узел. Это не лёгкий клиент. Лёгкие кошельки и серверы компактных блоков см. в [Zaino](Zaino.md) и [Узлах Lightwallet](Lightwallet_Nodes.md).

Стек Compose [Z3](https://github.com/ZcashFoundation/z3) от Zcash Foundation запускает вместе Zebra + Zallet; для внешних облегчённых клиентов можно отдельно запустить Zaino. Используемые в нём образы закреплены до выхода NU7 и бета-версии 4 Zallet: перед использованием ознакомьтесь с [Z3 Stack](Z3_Stack.md).

---

## Аккаунты, адреса и ключи

Zallet построен вокруг 32 аккаунтов ZIP, а не единственного неявного аккаунта `zcashd`.

- Кошелёк может содержать **несколько мнемонических фраз BIP 39**. Каждая мнемоническая фраза — независимый корень расходования, идентифицируемый **отпечатком seed** (`zip32seedfp1…`).
- **Аккаунты** выводятся из seed с индексом аккаунта ZIP 32. Внутри одного экземпляра Zallet у них также есть локальный **UUID**. Переносимая идентичность аккаунта — `(seedfp, account index)`.
- Адреса — это **Unified Addresses ZIP 316**, создаваемые с помощью `z_getaddressforaccount`. Один аккаунт может иметь множество диверсифицированных адресов; экранированные получатели не связываются в блокчейне.
- Импортированные ключи расходования (`z_importkey`) и адреса только для наблюдения (`z_importaddress`) становятся UUID-аккаунтами, не покрываемыми ни одной мнемонической фразой.
- Ключи просмотра можно экспортировать и импортировать (`z_exportviewingkey`, `z_importviewingkey`), включая унифицированные полные ключи просмотра и входящие ключи просмотра.

`getnewaddress` не реализован. Используйте `z_getnewaccount` и `z_getaddressforaccount`.

Если включён `keystore.require_backup` (перенесённая форма `zcashd` из `walletrequirebackup`), Zallet отказывается выводить новые полномочия на расходование из мнемонической фразы, резервная копия которой не была подтверждена.

---

## Шифрование и резервные копии

Ключевой материал **всегда** зашифрован. Незашифрованного режима и RPC `encryptwallet` не существует — этот метод `zcashd` никогда не поддерживался полностью.

- При настройке создаётся идентификатор **age**, путь по умолчанию — `{datadir}/encryption-identity.txt`.
- Мнемонические фразы и импортированные ключи расходования хранятся как шифротексты age в `wallet.db`.
- Остальная часть базы данных **не** зашифрована. История, адреса и ключи просмотра доступны для чтения тому, кто получит файл.
- Идентификатор можно защитить парольной фразой (`generate-encryption-identity -p`). Разблокируйте его через RPC `walletpassphrase`; заблокируйте через `walletlock`.
- Потеря файла идентификатора или его парольной фразы делает ключи расходования невосстановимыми. Создайте резервную копию идентификатора, каждой мнемонической фразы и отдельно — в зашифрованном виде — любой сохраняемой вами копии `wallet.db`.

Ручное копирование `wallet.db` во время работы Zallet — небезопасный способ резервного копирования: SQLite может повредить файл. Начиная с v0.1.0-beta.4, используйте команду [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md):

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Создаёт согласованный по транзакциям снимок работающего или остановленного кошелька с проверкой целостности. В указанном каталоге файл получает имя `zallet-wallet-backup-<UTC time>.db`; существующие файлы никогда не перезаписываются. Если постоянная запись в кошелёк (например, во время первоначальной синхронизации) мешает копированию и каждый раз запускает его заново, через десять минут операция завершится с ошибкой. Повторите попытку позже или сначала остановите кошелёк. Резервная копия **не включает** файл идентификатора age. Сохраните его отдельную копию отдельно от резервных копий базы данных: тот, у кого есть оба файла, сможет расшифровать ключи.

---

## JSON-RPC

Zallet реализует подмножество RPC кошелька `zcashd` по HTTP с Basic auth. Привязывайте к loopback. Для удалённого использования следует применять зашифрованный туннель. `rpc.allow_insecure_remote_bind` существует и небезопасен.

Заметные отличия от `zcashd`:

- Поля баланса в `getwalletinfo` пусты. Используйте `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Комиссии следуют **ZIP 317**. `settxfee` отсутствует.
- Формирование трат переходит на **PCZT** (частично созданные транзакции Zcash, ZIP 374). RPC PCZT появились в серии бета-версий.
- Глобальная **блокировка синхронизации** блокирует RPC баланса и трат, пока кошелёк догоняет цепочку или восстанавливается после реорганизации (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

К намеренно исключённым методам относятся `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` и `encryptwallet`. Замены перечислены в [Книге Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Начало работы

Официальные способы установки (пакеты Debian, Docker, готовые двоичные файлы выпуска) описаны в [руководстве по установке](https://zcash.github.io/zallet/guide/installation/index.html). Архивы выпусков называются `zallet-v<version>-linux-<amd64|arm64>.tar.gz` и содержат `zallet` и `zallet-zebra`. Образы Docker публикуются как `zodlinc/zallet`.

Минимальный процесс создания нового кошелька:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Укажите для `[indexer]` локальную конечную точку JSON-RPC `zebrad` с помощью `validator_address`. Это обязательный параметр, по умолчанию адрес localhost не используется. Для бэкенда zebra также требуются `[indexer.read_state_service]` и `zebrad` версии 7.0.0 или новее, собранный с функцией `indexer`; его каталог состояния должен находиться на том же хосте, чтобы Zallet мог напрямую читать состояние цепочки. В `indexer.db_path` настраивался только удалённый бэкенд Zaino: теперь эта настройка игнорируется с предупреждением.

Воспроизводимые образы можно собрать с помощью [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, хранилище образов containerd, GNU Make).

---

## Миграция с zcashd

Сохраняйте старый каталог данных `zcashd`, пока не подтвердите балансы и не протестируете восстановление.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` доступен только в сборках с функцией `zcashd-import`. Для чтения `wallet.dat` требуется `db_dump` из **Berkeley DB 6.2** — версии, которую использовал `zcashd`.

Пошаговые заметки для операторов: [Руководство по миграции: с zcashd на Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Как Zallet соотносится с другим ПО

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Что это | Кошелёк с RPC полного узла | Сервер кошелька с приоритетом экранирования | Кошельки конечных пользователей | Узел консенсуса | Индексатор / замена lightwalletd |
| Заменяет | Кошелёк `zcashd` | Не является прямой заменой клону `zcashd` | Мобильные и настольные приложения | Узел `zcashd` | `lightwalletd` |
| Требуется локальный узел | Да | Да (Zebra по умолчанию) | Нет (лёгкий клиент) | Это и есть узел | Да |
| Совместимость с RPC zcashd | Предназначен для совместимого пути | Только небольшое выбранное подмножество | Н/Д | Частичная / режим совместимости Zakura | Другой API |
| Модель хранения ключей | Оператор хранит ключи в `wallet.db` | Сервер с восстановлением по seed-фразе | Ключи на устройстве пользователя | Кошелька нет | Ключей нет |

Zallet и **zecd** оба могут работать перед Zebra. Выбирайте Zallet, если вам нужен интерфейс кошелька `z_*` и путь миграции с `wallet.dat`. Выбирайте zecd, если хотите сервер с приоритетом экранирования, который явно *не является* клоном `zcashd`.

Существует отдельный потребительский продукт по адресу [zallet.io](https://www.zallet.io/), использующий это же название. Это приложение не относится к данному проекту.

---

## Связанные страницы

- [Полные узлы](Full_Nodes.md) — Zebra, Zakura и снятый с поддержки узел `zcashd`
- [Zebra Полный узел](Zebra_Full_Node.md) — серверная часть по умолчанию, которую использует узел Zallet
- [Zakura Узел](Zakura_Node.md) — альтернативный проверяющий узел
- [Zaino](Zaino.md) — индексатор и сервер для лёгких клиентов (с beta.4 больше не является серверной частью Zallet)
- [Стек Z3](Z3_Stack.md) — стек Zebra + Zallet
- [zecd](ZECD.md) — ещё один вариант сервера кошелька на librustzcash
- [Zcash Синхронизация кошельков](Zcash_Wallet_Syncing.md) — как кошельки с экранированными адресами сканируют блокчейн
- [Ключи просмотра](Viewing_Keys.md)

## Ресурсы

- [Книга Zallet ](https://zcash.github.io/zallet/)
- [zcash/zallet на GitHub](https://github.com/zcash/zallet)
- [Релизы](https://github.com/zcash/zallet/releases) · [список изменений v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [Изменённая семантика JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub руководство по миграции](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub руководство по Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet стек compose)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
