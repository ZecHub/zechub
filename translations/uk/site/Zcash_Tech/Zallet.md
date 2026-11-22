<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# Zallet

Zallet — це повновузловий Zcash гаманець, написаний мовою Rust. Він замінює гаманець, який раніше був вбудований в `zcashd`. Після того як `zcashd` досяг зупинки End-of-Support 18 липня 2026 року на висоті блоку 3417100, обов’язки з консенсусу та гаманця було розділено: **Zebra** або **Zakura** перевіряють ланцюг, а **Zallet** зберігає ключі, сканує нотатки та надає JSON-RPC гаманця.

Zallet наразі перебуває у **бета-версії**. Він ще не пройшов повну перевірку. Несумісні зміни можуть вимагати видалення та повторного створення гаманця. Не вважайте його засобом зберігання великих сум ZEC у виробничому середовищі, не ознайомившись із попередженнями безпеки в [Книзі Zallet](https://zcash.github.io/zallet/).

---

## Коротко

- Zallet — це **RPC-гаманець для повного вузла**, а не мобільний легкий гаманець і не вузол консенсусу.
- Він замінює частину гаманця в `zcashd`. Частина вузла — це [Zebra](Zebra_Full_Node.md) або [Zakura](Zakura_Node.md).
- Написаний мовою **Rust**, має подвійне ліцензування MIT / Apache-2.0 та підтримується в [zcash/zallet](https://github.com/zcash/zallet).
- Останній опублікований реліз: **v0.1.0-beta.4** (2 листопада 2026 року). Він базується на [NU7](NU7.md) і потребує `zebrad` **версії 7.0.0 або новішої**.
- Читає дані ланцюга через один бекенд — **zebra**: `ReadStateService` до каталогу стану `zebrad` на тому самому хості, а також JSON-RPC від Zebra. Бекенд Zaino було вилучено у версії v0.1.0-beta.4.
- Надає підмножину **JSON-RPC, сумісну з zcashd**. Деякі методи було змінено, а деякі навмисно пропущено.
- Ключовий матеріал завжди зашифрований за допомогою **age**. Історія транзакцій, адреси та ключі перегляду зберігаються відкрито в `wallet.db`.
- Постачається з двома бінарними файлами в одному підписаному архіві: `zallet` (запускач) і `zallet-zebra`. **Лише Linux** для синхронізації гаманця: на macOS та Windows поки що не працює жоден бекенд ланцюга.
- `zallet backup` (нова функція у beta.4) створює узгоджений знімок запущеного або зупиненого гаманця.
- Офіційна документація: [Книга Zallet](https://zcash.github.io/zallet/).

---

## Чому існує Zallet

`zcashd` поєднував вузол консенсусу, похідний від Bitcoin Core, і гаманець в одному процесі. Ця конструкція більше не використовується.

| Роль | Старий стек | Поточний стек |
|------|-----------|---------------|
| Консенсус / P2P | `zcashd` | Zebra (`zebrad`) або Zakura |
| Гаманець / ключі / баланси | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Індексатор легких клієнтів | `lightwalletd` | Zaino або `lightwalletd` |

Винесення гаманця з вузла означає:

- Програмне забезпечення вузла можна замінювати (Zebra проти Zakura) без перенесення ключів.
- Сканування гаманця та повноваження на витрачання розміщуються в процесі, який можна окремо захистити.
- Семантика RPC може розвиватися в напрямку 32 облікових записів ZIP, Unified Addresses і PCZT, замість того щоб залишатися прив’язаною до особливостей `zcashd`.

Zallet — це гаманець, призначений для операторів, які раніше використовували `zcashd` як гарячий гаманець, бекенд біржі, кран або гаманець для виплат від майнінгу.

---

## Стан

Zallet перебуває у **бета-версії**.

На практиці це означає:

- Несумісні зміни можуть з’явитися в будь-якій бета-версії. Можливо, доведеться видалити каталог даних і почати заново.
- Не кожен RPC гаманця `zcashd` було перенесено.
- Семантика деяких перенесених методів відрізняється від `zcashd`. Інтеграції мають прочитати [сторінку зміненої семантики](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Крейтам ще бракує завершеності, і вони не пройшли повну перевірку.
- Zallet **не** є бібліотекою Rust. Жодних гарантій немає, якщо ви залежите від нього як від бібліотеки.

Відгуки надсилайте до [проблем GitHub](https://github.com/zcash/zallet/issues/new) або в канал `#wallet-dev` на [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

Пізнішу стабільну фазу заплановано після того, як буде реалізовано передбачену поверхню RPC. Тоді від викликачів очікуватиметься перехід на методи Zallet, зокрема з урахуванням задокументованих семантичних відмінностей.

---

## Архітектура

Zallet поділено на робочі простори Cargo, щоб кожен бекенд ланцюга міг відстежувати власний граф залежностей. Починаючи з v0.1.0-beta.4 постачається лише бекенд zebra.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Обидва бінарні файли відкривають той самий `wallet.db`. До версії v0.1.0-beta.3 також був бекенд `zallet-zaino`. Якщо у вашому `zallet.toml` зазначено `backend = "zaino"`, змініть це на `backend = "zebra"`. Базу даних гаманця не потрібно переносити, а стару теку `zaino` у каталозі даних можна видалити.

Бекенд zebra читає безпосередньо базу даних стану `zebrad`, тому йому потрібен `zebrad`, зібраний із функцією `indexer`, а його каталог стану має бути **на тому самому хості**. Для Zallet в одному контейнері, що взаємодіє мережею з `zebrad` в іншому, підтримуваного налаштування немає, доки не з’явиться бекенд, що працює лише через мережу ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Типове розгортання:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet — це **повновузловий гаманець**: він очікує локальний вузол, що перевіряє дані. Це не легкий клієнт. Про легкі гаманці та сервери компактних блоків дивіться [Zaino](Zaino.md) і [Вузли Lightwallet](Lightwallet_Nodes.md).

Zcash Foundation [Z3](https://github.com/ZcashFoundation/z3) запускає стек Compose, що поєднує Zebra і Zallet; для зовнішніх легких клієнтів можна додатково запустити окремий Zaino. Закріплені образи передують NU7 і бета-версії 4 Zallet: перш ніж використовувати цей стек, перегляньте [стек Z3](Z3_Stack.md).

---

## Облікові записи, адреси та ключі

Zallet побудовано навколо 32 облікових записів ZIP, а не одного неявного облікового запису `zcashd`.

- Гаманець може містити **кілька мнемонік BIP 39**. Кожна мнемоніка є незалежним коренем витрачання, ідентифікованим **відбитком seed** (`zip32seedfp1…`).
- **Облікові записи** виводяться із seed за допомогою індексу облікового запису ZIP 32. В одному екземплярі Zallet вони також мають локальний **UUID**. Портативним ідентифікатором облікового запису є `(seedfp, account index)`.
- Адреси — це **Unified Addresses ZIP 316**, створені за допомогою `z_getaddressforaccount`. Один обліковий запис може мати багато диверсифікованих адрес; екрановані отримувачі не пов’язуються в ланцюгу.
- Імпортовані ключі витрачання (`z_importkey`) та адреси лише для перегляду (`z_importaddress`) стають UUID-обліковими записами, які не охоплює жодна мнемоніка.
- Ключі перегляду можна експортувати та імпортувати (`z_exportviewingkey`, `z_importviewingkey`), зокрема уніфіковані повні ключі перегляду та вхідні ключі перегляду.

`getnewaddress` не реалізовано. Використовуйте `z_getnewaccount` та `z_getaddressforaccount`.

Якщо `keystore.require_backup` увімкнено (перенесена форма `zcashd` `walletrequirebackup`), Zallet відмовляється виводити нові повноваження на витрачання з мнемоніки, резервне копіювання якої не було підтверджено.

---

## Шифрування та резервні копії

Ключовий матеріал **завжди** зашифрований. Немає незашифрованого режиму й RPC `encryptwallet` — цей метод `zcashd` ніколи не підтримувався повністю.

- Налаштування створює ідентичність **age**, шлях за замовчуванням — `{datadir}/encryption-identity.txt`.
- Мнемоніки та імпортовані ключі витрачання зберігаються як шифротексти age у `wallet.db`.
- Решта бази даних **не** зашифрована. Історію, адреси та ключі перегляду можна прочитати, якщо хтось отримає файл.
- Ідентичність можна захистити парольною фразою (`generate-encryption-identity -p`). Розблокуйте її за допомогою RPC `walletpassphrase`; заблокуйте за допомогою `walletlock`.
- Втрата файлу ідентичності або його парольної фрази робить ключі витрачання невідновлюваними. Створіть резервну копію ідентичності, кожної мнемоніки та (окремо, у зашифрованому вигляді) будь-якої копії `wallet.db`, яку ви зберігаєте.

Копіювати `wallet.db` вручну, поки працює Zallet, — небезпечний спосіб створення резервної копії: SQLite може пошкодити дані. Починаючи з v0.1.0-beta.4, використовуйте команду [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md):

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Він записує узгоджений із транзакціями знімок гаманця, що працює або зупинений, із перевіркою цілісності. У вказаному каталозі він називає файл `zallet-wallet-backup-<UTC time>.db` і ніколи не перезаписує наявний файл. Якщо постійні записи в гаманець (наприклад, під час початкової синхронізації) щоразу перезапускають копіювання, через десять хвилин він голосно припиняє спроби: повторіть пізніше або спершу зупиніть гаманець. Резервна копія **не** містить файл ідентифікації age. Зробіть його резервну копію один раз і зберігайте окремо від резервних копій бази даних, оскільки будь-хто, хто матиме обидва файли, зможе розшифрувати ключі.

---

## JSON-RPC

Zallet реалізує підмножину RPC гаманця `zcashd` через HTTP із базовою автентифікацією. Прив’язуйте до loopback. Віддалене використання має відбуватися через зашифрований тунель. `rpc.allow_insecure_remote_bind` існує й є небезпечним.

Помітні відмінності від `zcashd`:

- Поля балансу в `getwalletinfo` порожні. Використовуйте `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Комісії відповідають **ZIP 317**. `settxfee` немає.
- Побудова витрат переходить на **PCZT** (частково створені транзакції Zcash, ZIP 374). RPC PCZT з’явилися в серії бета-версій.
- Глобальне **блокування синхронізації** блокує RPC балансу та витрат, поки гаманець наздоганяє ланцюг або відновлюється після реорганізації (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

До навмисно пропущених методів належать `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` та `encryptwallet`. Замінники наведено в [Книзі Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Початок роботи

Офіційні способи встановлення (пакети Debian, Docker, бінарні файли релізів) наведено в [посібнику зі встановлення](https://zcash.github.io/zallet/guide/installation/index.html). Архіви релізів мають назву `zallet-v<version>-linux-<amd64|arm64>.tar.gz` та містять `zallet` і `zallet-zebra`. Образи Docker публікуються як `zodlinc/zallet`.

Мінімальний процес створення нового гаманця:

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

Спрямуйте `[indexer]` на локальну кінцеву точку JSON-RPC `zebrad` за допомогою `validator_address`. Це обов’язковий параметр, і за замовчуванням він не вказує на localhost. Для бекенду zebra також потрібен `[indexer.read_state_service]` і версія `zebrad` 7.0.0 або новіша, зібрана з функцією `indexer`; каталог стану цього вузла має бути на тому самому хості, щоб Zallet міг читати стан ланцюга безпосередньо. `indexer.db_path` налаштовував лише вилучений бекенд Zaino; тепер цей параметр ігнорується з попередженням.

Відтворювані образи можна зібрати за допомогою [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, сховище образів containerd, GNU Make).

---

## Міграція з zcashd

Зберігайте старий каталог даних `zcashd`, доки не підтвердите баланси та не перевірите відновлення.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` доступний лише у збірках із функцією `zcashd-import`. Для читання `wallet.dat` потрібен `db_dump` із **Berkeley DB 6.2**, версії, яку використовував `zcashd`.

Покрокові примітки для операторів: [Посібник із міграції: zcashd до Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Як Zallet пов’язаний з іншим програмним забезпеченням

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Що це | RPC-гаманець із повним вузлом | Сервер гаманця з пріоритетом на екранування | Гаманці для кінцевих користувачів | Вузол консенсусу | Індексатор / заміна lightwalletd |
| Замінює | гаманець `zcashd` | Не є прямою заміною клону `zcashd` | Мобільні/настільні застосунки | Вузол `zcashd` | `lightwalletd` |
| Потребує локального вузла | Так | Так (Zebra за замовчуванням) | Ні (легкий клієнт) | Це і є вузол | Так |
| Сумісність із RPC zcashd | Розроблений як шлях забезпечення сумісності | Лише невелика вибрана підмножина | Н/З | Часткова / режим сумісності Zakura | Інший API |
| Модель зберігання коштів | Оператор зберігає ключі в `wallet.db` | Сервер із відновленням за сід-фразою | Ключі на пристрої користувача | Гаманця немає | Ключів немає |

Zallet та **zecd** можуть обидва працювати перед Zebra. Виберіть Zallet, якщо вам потрібна поверхня гаманця `z_*` і шлях міграції з `wallet.dat`. Виберіть zecd, якщо вам потрібен сервер із пріоритетом екранованих транзакцій, який прямо *не* є клоном `zcashd`.

Існує окремий споживчий продукт за адресою [zallet.io](https://www.zallet.io/), який повторно використовує назву. Цей застосунок не є цим проєктом.

---

## Пов’язані сторінки

- [Повні вузли](Full_Nodes.md) — Zebra, Zakura і застарілий вузол `zcashd`
- [Zebra Повний вузол](Zebra_Full_Node.md) — стандартний бекенд вузла Zallet
- [Zakura Вузол](Zakura_Node.md) — альтернативний вузол для валідації
- [Zaino](Zaino.md) — індексатор і сервер для легких клієнтів (від beta.4 більше не є бекендом Zallet)
- [Стек Z3](Z3_Stack.md) — стек compose на основі Zebra + Zallet
- [zecd](ZECD.md) — інша архітектура сервера гаманців на librustzcash
- [Zcash Синхронізація гаманців](Zcash_Wallet_Syncing.md) — як гаманці із захищеним режимом сканують ланцюг
- [Ключі перегляду](Viewing_Keys.md)

## Ресурси

- [Книга Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet на GitHub](https://github.com/zcash/zallet)
- [Релізи](https://github.com/zcash/zallet/releases) · [список змін v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [Змінена семантика JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub посібник із міграції](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub посібник для Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet стек compose)](https://github.com/ZcashFoundation/z3)
- [Zcash дослідження й розробки Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
