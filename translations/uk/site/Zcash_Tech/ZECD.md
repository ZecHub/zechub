---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD — сервер гаманця з пріоритетом shielded

> 🇧🇷 [Версія португальською](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD — це сервер гаманця для Zcash з пріоритетом shielded, побудований на [librustzcash](https://github.com/zcash/librustzcash) і доступний через діалект JSON-RPC від Bitcoin Core. Він надає розробникам та інтеграторам платіжних рішень звичний, сумісний із Bitcoin API для взаємодії із Zcash — водночас роблячи Orchard (найбільш приватний пул) типовим варіантом. Розроблений [zec.rocks](https://zec.rocks), ZECD призначений для заміни функціональності гаманця `zcashd` у сучасних хмарних розгортаннях.

**Поточна версія:** 0.5.0-rc3 (13 липня 2026) — з підтримкою Ironwood (NU6.3). Встановлення через `cargo install zecd` або використовуйте офіційний Docker-образ.

---

## Коротко

- ZECD — це **демон гаманця (сервер)**, а не повний вузол. Він обробляє ключі, сканування, proving і RPC, не використовуючи P2P-протокол Zcash.
- Він використовує **діалект JSON-RPC від Bitcoin Core**: ті самі назви методів, форми полів, автентифікація та коди помилок — багато Bitcoin RPC-клієнтів працюють із Zcash одразу.
- **Orchard-адреси (shielded) є типовими**; підтримка transparent (t-address) і Sapling вимагає явного ввімкнення для кожного гаманця.
- Він підключається до **самостійно розміщеного повного вузла [Zebra](Zebra_Full_Node.md)** через локальний JSON-RPC — `lightwalletd` не потрібен.
- **Статeless за задумом**: увесь гаманець можна відновити лише з seed-фрази, тому каталог даних можна вважати витратним.
- **Не є повною заміною zcashd**: реалізує лише частину RPC-методів Zcash, із навмисними відмінностями в дизайні заради приватності та безпеки.
- Комісії відповідають **ZIP-317** (детермінований розрахунок комісії); комісії, задані користувачем, відхиляються.
- Підтримує **shielded memo (ZIP-302)** через звичний інтерфейс Bitcoin RPC.

---

## Яку проблему вирішує ZECD?

`zcashd` був оригінальним вузлом і гаманцем Zcash в одному — форком кодової бази Bitcoin на C++ у 2016 році. З часом це створило труднощі: код складно підтримувати, гаманець тісно пов’язаний із вузлом, а transparent-адреси подаються як повноцінний варіант поряд із shielded-адресами.

ZECD відокремлює відповідальність гаманця від консенсусу. Це **спеціалізований рівень гаманця**, який розташовується між застосунками та повним вузлом Zebra і надає:

- Чисту, сучасну реалізацію на Rust, побудовану на librustzcash (тій самій бібліотеці, що лежить в основі Zashi та Zodl)
- Дизайн із приватністю за замовчуванням (Orchard-адреси, якщо не налаштовано інакше)
- Сумісний із Bitcoin RPC інтерфейс, що усуває потребу вивчати специфічні для Zcash інструменти
- Stateless-архітектуру з відновленням із seed, придатну для контейнеризованих і хмарних розгортань

---

## Архітектура

ZECD працює у трирівневій моделі:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD взаємодіє із Zebra **виключно через локальний JSON-RPC** — без peer-to-peer мережі, без сторонніх індексаторів, без `lightwalletd`. Підключення до Zebra навмисно обмежене локальним доступом: ZECD відмовиться надсилати облікові дані на глобально маршрутизований хост, якщо це явно не налаштовано для захищеного позасмугового тунелю (наприклад, WireGuard або SSH).

---

## Ключові можливості

### Shielded-first, Orchard за замовчуванням

ZECD використовує Unified Address Orchard як типовий тип адреси. Пули Sapling і transparent (t-address) вимагають явної конфігурації для кожного гаманця. Такий підхід знижує ризик випадкових transparent-відправлень — поширеної пастки для приватності у старіших інструментах Zcash.

Політику приватності можна налаштовувати для кожного виклику або глобально в `[spend] privacy_policy`:

| Політика | Поведінка |
|--------|----------|
| `AllowRevealedRecipients` (типово) | Дозволяє відправлення transparent-одержувачам; розкриває суму й одержувача в блокчейні |
| `AllowRevealedAmounts` | Дозволяє міжпулові відправлення (Sapling↔Orchard), але відхиляє transparent-одержувачів |
| `FullPrivacy` | Лише повністю shielded-відправлення в межах одного пулу; відхиляє transparent-одержувачів і міжпулові перекази |
| `AllowFullyTransparent` | Також дозволяє відправлення t→t, профінансовані з transparent UTXO |

### Сумісність із Bitcoin Core RPC

ZECD реалізує діалект JSON-RPC від Bitcoin Core із відповідністю в таких аспектах:

- Назви методів (наприклад, `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Назви полів і типи у відповідях
- Структура JSON-RPC 1.0 envelope
- Basic auth, записи `rpcauth` і автентифікація через cookie-файл
- Коди помилок і відповідність HTTP-статусів (HTTP 500 з тілом помилки, семантика 401)

Це означає, що багато наявних бібліотек для Bitcoin-платежів, інтеграцій бірж і інструментів моніторингу можуть взаємодіяти із Zcash через ZECD з мінімальними змінами коду або взагалі без них.

Набір тестів на відповідність (140+ перевірок) запускається для кожного PR проти live regtest-демона, а також був перевірений у публічному testnet.

### Shielded memo (ZIP-302)

ZECD надає функцію shielded memo в Zcash через звичний інтерфейс Bitcoin RPC — те, чого немає у стандартному інструментарії Bitcoin:

- `sendtoaddress` приймає необов’язкове hex memo як додатковий кінцевий параметр (до 512 байт; для transparent-одержувачів відхиляється)
- Записи історії транзакцій із `listtransactions` і `gettransaction` містять поля `memo` (hex) і `memoStr` (декодований текст), коли вихід його має
- Підтримуються відправлення з нульовою сумою на shielded-одержувача для сценаріїв використання лише memo (патерн `z_sendmany` "memo-only-send")

Це робить ZECD придатним для застосунків, яким потрібні приватні повідомлення в блокчейні разом із платежами.

### Stateless за задумом

ZECD зберігає **жодного off-chain стану, який не можна було б відбудувати відновленням лише із seed**. База даних гаманця (`data.sqlite`) повністю виводиться із seed-фрази — shielded-кошти відновлюються безумовно; transparent-кошти відновлюються в межах налаштованого gap limit.

Щоб відновити гаманець із seed:

```sh
zecd init --restore --birthday <block-height>
```

Це робить каталог даних **витратним**: контейнер без постійного тому, який відбудовується із seed при кожному запуску, не втрачає нічого критичного. Оператори самі відповідають за відстеження адрес, які вони видають — ZECD запам’ятовує адреси лише після того, як вони отримали кошти в блокчейні.

Мітки навмисно відсутні. Оскільки мітки не мають джерела в блокчейні й не можуть бути відновлені із seed, ZECD просто їх не підтримує. Виклик методів міток повертає помилку `method-not-found` (`-32601`).

### Без залежності від lightwalletd

ZECD отримує compact blocks, стан дерев і видимість mempool безпосередньо з JSON-RPC Zebra. Немає `lightwalletd`, який потрібно запускати чи підтримувати — це зменшує операційну складність для self-hosted розгортань.

### Хмарні та контейнеризовані розгортання

Stateless-архітектура ZECD спроєктована для середовищ Docker і Kubernetes:

- Повний стек Docker Compose (`zebra → zecd`) доступний у репозиторії
- Health endpoint на порту `9233` з налаштовуваними readiness probe (`synced` або `connected`)
- Опція структурованого JSON-логування для конвеєрів агрегації логів
- Детерміновані комісії ZIP-317 — без oracle комісій і без ручного налаштування комісій
- `bootstrap_from_keys` (увімкнено за замовчуванням): порожній каталог даних поруч із `keys.toml` автоматично відбудовує гаманець під час запуску — розгортання через монтування одного Secret і запуск із порожнім PVC

---

## Моделі зберігання ключів

ZECD підтримує три моделі зберігання ключів, придатні для різних вимог до розгортання та безпеки:

### 1. Без шифрування (типово — авто-розблокування)

Seed-мнемоніка в `keys.toml` загортається в **age identity file** (`identity.txt`). За типового `auto_unlock = true` seed розшифровується в пам’ять під час запуску, тому відправлення виконуються без нагляду і виклик `walletpassphrase` не потрібен.

Найкраще для: автоматизованих платіжних процесорів, гарячих гаманців бірж, середовищ розробки.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Зберігайте `identity.txt` **поза** каталогом даних у mainnet — будь-хто, хто прочитає обидва файли, матиме право витрачати кошти.

### 2. Зашифрований (захищений парольною фразою)

Мнемоніка загортається парольною фразою (age scrypt), а не identity file. Гаманець запускається заблокованим; `walletpassphrase "<pass>" <timeout>` розблоковує його на вказаний час і автоматично знову блокує після завершення тайм-ауту — так само, як зашифрований гаманець у Bitcoin Core.

Найкраще для: гарячих гаманців, де не потрібне безнаглядне право витрачання; інтерактивних операторських сценаріїв.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Лише для перегляду (UFVK — без ключа витрачання)

Ініціалізується Unified Full Viewing Key (UFVK), експортованим з іншого гаманця. Може отримувати, сканувати й повідомляти баланси — але не може підписувати транзакції. Ідеально для моніторингу, виставлення рахунків або аудиторських вузлів, відокремлених від гаманця підписання.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Резервне копіювання та відновлення

Кошти можна відновити **лише з мнемоніки**. Усе інше — це кеш.

| Артефакт | Розташування | Що захищає | Резервувати? |
|----------|----------|-----------------|----------|
| **24-слівна мнемоніка** | Показується один раз під час `zecd init` | Кошти — втрата = безповоротна втрата | **Так — офлайн (папір/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Зашифрований seed + birthday + мережа | **Так — як Secret** |
| `identity.txt` | `[keys] age_identity` | Розшифровує `keys.toml` (право витрачання) | **Так — окремо від `keys.toml`** |
| Висота birthday | Усередині `keys.toml` | Робить відновлення швидким (будь-яка висота до першої tx) | Запишіть разом із мнемонікою |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Кеш гаманця — відбудовується із seed при відновленні | Ні — витратний |
| `blocks/` | `<wallet dir>/blocks/` | Кеш compact blocks | Ні — ніколи не переносити; може сильно зрости |
| `.cookie` | `<datadir>/.cookie` | Тимчасовий RPC-cookie | Ні — створюється заново під час запуску |

> **Каталог даних має бути локальним для хоста.** Одноекземплярне блокування ZECD (`<datadir>/.lock`) — це advisory lock рівня ОС, воно не поширюється між хостами. Ніколи не діліть каталог даних із доступом на читання-запис між машинами (NFS, Kubernetes `ReadWriteMany`) — два екземпляри ZECD пошкодять БД гаманця. У Kubernetes використовуйте томи `ReadWriteOnce`.

---

## Safelist RPC-методів

Для розгортань, де витік облікових даних був би катастрофічним, ZECD підтримує обмеження RPC-поверхні до вибраної підмножини методів:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Будь-який метод, якого немає у списку, повертає `-32601` (HTTP 404) — невідрізнимо від методу, якого взагалі не існує, тож жорстко обмежений сервер нічого не розкриває про те, що саме він вимкнув. Інвойсер лише для отримання може вимкнути `sendtoaddress`, `sendmany` і `stop`, щоб мінімізувати радіус ураження від скомпрометованого клієнта.

---

## Ключові відмінності від Bitcoin Core RPC

Розробникам, які переходять з Bitcoin або інструментів zcashd, слід знати про такі навмисні відмінності:

| Поведінка | Bitcoin Core | ZECD |
|----------|-------------|------|
| Формат адреси | `1...` / `bc1...` | `u1...` (Unified Address Orchard) — не розпізнається як адреса Bitcoin клієнтами, що парсять рядок |
| Мітки | Повноцінне сховище міток | Не реалізовано — `setlabel`, `listlabels` тощо повертають `-32601` |
| Комісії | Задаються користувачем; ринок комісій | Лише детерміновані ZIP-317; `settxfee`, `fee_rate`, `subtractfeefromamount` відхиляються з `-8` |
| Memo | Не підтримуються | `sendtoaddress` приймає hex memo; історія має поля `memo` + `memoStr` |
| Підтвердження для витрачання | 1 | 3 (власна решта) / 10 (сторонні) — налаштовується через `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` при reorg | Відкочується до форку | Повертає `-5` (Block not found), якщо курсор був видалений reorg-ом — виконайте повторне базове встановлення викликом без параметрів |
| Повторні одержувачі в `sendmany` | Помилка | JSON-парсер згортає дублікати (останній перемагає) ще до того, як їх бачить ZECD — не вказуйте ту саму адресу двічі |
| Баланс під час початкової синхронізації | Блокує або warm-up | Повертає частковий баланс — автоматизацію слід прив’язувати до `GET /readyz` (повертає 503 до повної синхронізації та очищення backlog покращень) |
| `minconf 0` у `getbalance` | Баланс без підтверджень | Обробляється як 1 — shielded note ніколи не можна витратити, доки її не включено в блок |

---

## Швидкий старт

**Передумови:** Zebra запущений локально з `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Встановлення з crates.io (0.4.3+):

```sh
cargo install zecd
```

Або зібрати з джерельного коду:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Взаємодія через curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Взаємодія через Python (використовуючи бібліотеку Bitcoin RPC):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Відновлення із seed:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Типові порти

| Мережа | ZECD RPC | Zebra RPC (бекенд) | Health |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| Роль | Повний вузол + гаманець | Індексатор (замінює lightwalletd) | Лише сервер гаманця |
| Мова | C++ | Rust | Rust |
| Статус | Застарілий | Активний | Активний (v0.5.0-rc3, липень 2026) |
| Типовий пул | Transparent | N/A | Orchard (shielded) |
| RPC-діалект | Специфічний для zcashd | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Потрібен повний вузол | Так (власний) | Zebra або zcashd | Zebra |
| Stateless-відновлення | Ні | N/A | Так (лише seed) |
| Shielded memo | Так (`z_sendmany`) | N/A | Так (поверхня Bitcoin RPC) |
| Лише для перегляду (UFVK) | Так | Так | Так |
| Хмарна готовність | Ні | Частково | Так |
| Встановлення | Збірка/бінарник | Збірка | `cargo install zecd` |

---

## Пов’язані сторінки

- [Повний вузол Zebra](Zebra_Full_Node.md) — повний вузол, до якого підключається ZECD
- [Індексатор Zaino](Zaino.md) — альтернативний підхід до індексації (замінює lightwalletd)
- [Вузол Zakura](Zakura_Node.md) — ще одна реалізація повного вузла (форк Zebra)
- [Viewing Keys](Viewing_Keys.md) — як ZECD сканує ланцюг за допомогою account viewing keys
- [Гаманці](/using-zcash/wallets) — огляд екосистеми гаманців

## Ресурси

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Операційний runbook ZECD](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — основна криптографічна бібліотека Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: механізм пропорційної комісії за переказ](https://zips.z.cash/zip-0317)
- [ZIP-302: Shielded memo](https://zips.z.cash/zip-0302)
- [Гаманець Zodl (сумісний із librustzcash)](https://github.com/zodl-inc/zodl-ios)
