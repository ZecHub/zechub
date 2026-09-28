<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редагувати сторінку"/>
</a>

# Zallet

Zallet — це повновузловий Zcash гаманець, написаний мовою Rust. Він замінює гаманець, який раніше був вбудований в `zcashd`. Після того як `zcashd` досяг зупинки End-of-Support 18 липня 2026 року на висоті блоку 3417100, обов’язки з консенсусу та гаманця було розділено: **Zebra** або **Zakura** перевіряють ланцюг, а **Zallet** зберігає ключі, сканує нотатки та надає JSON-RPC гаманця.

Zallet наразі перебуває у **бета-версії**. Він ще не пройшов повну перевірку. Несумісні зміни можуть вимагати видалення та повторного створення гаманця. Не вважайте його засобом зберігання великих сум ZEC у виробничому середовищі, не ознайомившись із попередженнями безпеки в [Книзі Zallet](https://zcash.github.io/zallet/).

---

## Коротко

- Zallet — це **повновузловий RPC-гаманець**, а не мобільний легкий гаманець і не вузол консенсусу.
- Він замінює частину гаманця в `zcashd`. Частина вузла — це [Zebra](Zebra_Full_Node.md) або [Zakura](Zakura_Node.md).
- Написаний мовою **Rust**, має подвійне ліцензування MIT / Apache-2.0 та підтримується в [zcash/zallet](https://github.com/zcash/zallet).
- Останній опублікований реліз станом на кінець серпня 2026 року: **v0.1.0-beta.3**.
- Отримує дані ланцюга через один із двох бекендів: **zebra-state** (прямий `ReadStateService` до локального `zebrad`) або **Zaino**.
- Надає підмножину **сумісного з zcashd JSON-RPC**. Деякі методи було змінено; деякі навмисно пропущено.
- Ключовий матеріал завжди зашифрований за допомогою **age**. Історія транзакцій, адреси та ключі перегляду зберігаються відкрито в `wallet.db`.
- Постачається з трьома бінарними файлами в одному підписаному архіві: `zallet` (запускач), `zallet-zebra` та `zallet-zaino`.
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

Zallet поділено на три робочі простори Cargo, щоб два бекенди ланцюга могли відстежувати різні графи залежностей.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Усі три бінарні файли відкривають **один і той самий** `wallet.db`. Запускач обирає бекенд під час виконання; для перемикання не потрібно перекомпілювати програму.

Типове розгортання:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet — це **повновузловий гаманець**: він очікує локальний вузол, що перевіряє дані. Це не легкий клієнт. Про легкі гаманці та сервери компактних блоків дивіться [Zaino](Zaino.md) і [Вузли Lightwallet](Lightwallet_Nodes.md).

Стек compose Zcash Foundation [Z3](https://github.com/ZcashFoundation/z3) запускає Zebra разом із Zallet, із необов’язковим окремим Zaino для зовнішніх легких клієнтів.

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

Копіювання `wallet.db` під час роботи Zallet не є безпечним резервним копіюванням. SQLite може записатися частково. Надавайте перевагу зупиненому процесу або дочекайтеся офіційної команди онлайн-резервного копіювання.

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

Офіційні способи встановлення (пакети Debian, Docker, бінарні файли релізів) наведено в [посібнику зі встановлення](https://zcash.github.io/zallet/guide/installation/index.html). Архіви релізів мають назву `zallet-<version>-<arch>.tar.gz` і містять усі три бінарні файли.

Мінімальний процес створення нового гаманця:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Укажіть для `[indexer]` локальну кінцеву точку JSON-RPC `zebrad`. Бекенд zebra також потребує `[indexer.read_state_service]` і `zebrad`, зібраного з функцією індексатора, щоб Zallet міг читати стан ланцюга безпосередньо.

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

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Що це | Повновузловий RPC-гаманець | Сервер гаманця з пріоритетом екранованих транзакцій | Гаманці для кінцевих користувачів | Вузол консенсусу | Індексатор / заміна lightwalletd |
| Замінює | Гаманець `zcashd` | Не є прямою заміною `zcashd` | Мобільні/настільні застосунки | Вузол `zcashd` | `lightwalletd` |
| Потребує локального вузла | Так | Так (за замовчуванням Zebra) | Ні (легкий клієнт) | Це і є вузол | Так |
| Сумісність із RPC zcashd | Спроєктовано як шлях сумісності | Лише невелика обрана підмножина | Н/Д | Часткова / режим сумісності Zakura | Інший API |
| Модель зберігання | Оператор зберігає ключі в `wallet.db` | Сервер, відновлюваний із seed | Ключі на пристрої користувача | Без гаманця | Без ключів |

Zallet та **zecd** можуть обидва працювати перед Zebra. Виберіть Zallet, якщо вам потрібна поверхня гаманця `z_*` і шлях міграції з `wallet.dat`. Виберіть zecd, якщо вам потрібен сервер із пріоритетом екранованих транзакцій, який прямо *не* є клоном `zcashd`.

Існує окремий споживчий продукт за адресою [zallet.io](https://www.zallet.io/), який повторно використовує назву. Цей застосунок не є цим проєктом.

---

## Пов’язані сторінки

- [Повні вузли](Full_Nodes.md) — Zebra, Zakura і виведений з експлуатації вузол `zcashd`
- [Повний вузол Zebra](Zebra_Full_Node.md) — вузол, із якого бекенд Zallet за замовчуванням читає дані
- [Вузол Zakura](Zakura_Node.md) — альтернативний вузол валідації
- [Zaino](Zaino.md) — бекенд індексатора та сервер легких клієнтів
- [ZECD](ZECD.md) — інша архітектура сервера гаманця на librustzcash
- [Синхронізація гаманця Zcash](Zcash_Wallet_Syncing.md) — як екрановані гаманці сканують ланцюг
- [Ключі перегляду](Viewing_Keys.md)

## Ресурси

- [Книга Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet на GitHub](https://github.com/zcash/zallet)
- [Релізи](https://github.com/zcash/zallet/releases)
- [Змінена семантика JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Посібник із міграції ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Посібник для Raspberry Pi ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (стек compose Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
