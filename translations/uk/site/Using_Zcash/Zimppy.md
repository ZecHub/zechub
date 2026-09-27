<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## Коротко

- **Zimppy** — платіжна інфраструктура, орієнтована на конфіденційність, для AI-агентів, що використовує Machine Payment Protocol (MPP) від Zcash
- **Поповніть баланс один раз** ончейн (~75 секунд), а потім виконуйте **необмежену кількість миттєвих запитів** без взаємодії з блокчейном для кожного запиту
- Підтримує **повністю екрановані платежі Zcash (Orchard)** — відправник, одержувач, сума та примітка зашифровані
- Працює з **TypeScript та Rust SDK** для простої інтеграції в AI-пайплайни та API-сервери
- Ідеально підходить для **LLM API, маркетплейсів даних, серверів інструментів MCP** і будь-яких сценаріїв M2M-платежів

---

> **Zimppy** — це метод оплати Machine Payment Protocol (MPP) для Zcash, що підтримує як екрановані, так і прозорі платежі. Поповніть баланс один раз ончейн, а потім виконуйте необмежену кількість миттєвих запитів на пред'явника без взаємодії з ланцюгом для кожного запиту.

---

## Зміст

1. [Що таке Zimppy.xyz?](#what-is-zimppyxyz)
2. [Навіщо AI-агентам екрановані платежі?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Як працює Zimppy](#how-zimppy-works)
   - [Сесії (рекомендовано)](#sessions-recommended)
   - [Потокова передача](#streaming)
   - [Стягнення](#charge)
5. [Сценарії використання та приклади](#use-cases--examples)
6. [Встановлення](#installation)
7. [Налаштування гаманця Zimppy](#setting-up-the-zimppy-wallet)
8. [Інтеграція Zimppy](#integrating-zimppy--typescript-sdk)
   - [Сервер (екранований)](#typescript-server--shielded)
   - [Сервер (прозорий)](#typescript-server--transparent)
   - [Клієнт](#typescript-client)
9. [Інтеграція Zimppy - Rust SDK](#integrating-zimppy--rust-sdk)
   - [Сервер (Axum)](#rust-server-axum)
   - [Клієнт](#rust-client)
10. [Довідник CLI](#cli-reference)
11. [Ключові можливості](#key-features)
12. [Архітектура](#architecture)
13. [Приклади та демо](#examples--demos)

---

## Що таке Zimppy.xyz?

**Zimppy.xyz** — це платіжна інфраструктура, орієнтована на конфіденційність, створена спеціально для AI-агентів та автоматизованих міжмашинних (M2M) робочих процесів. Вона реалізує **Machine Payment Protocol (MPP)**, використовуючи **Zcash** як базову валюту, і підтримує як екранований (повністю приватний), так і прозорий режими платежів.

На відміну від традиційних блокчейн-платіжних систем, де кожна транзакція публічно відображається ончейн, Zimppy побудований на сесійній архітектурі, яка усуває затримку для кожного запиту, зберігаючи криптографічну конфіденційність. Це робить його особливо придатним для AI-агентів, яким потрібно програмно оплачувати API, дані, обчислення або AI-інструменти без розкриття поведінкових метаданих.

### Основні властивості

- **Поповнення один раз** ончейн (~75 секунд для підтвердження Zcash)
- **Необмежена кількість миттєвих запитів** після відкриття сесії, нульова взаємодія з ланцюгом для кожного запиту
- **Екрановані платежі** шифрують відправника, одержувача, суму та примітку за допомогою протоколу Orchard від Zcash
- **Прозорі платежі** використовують окремі T-адреси для кожного виклику з метою запобігання повторному відтворенню без повної конфіденційності
- **Відповідає специфікації**, виклики HMAC-SHA256, помилки RFC 9457, виявлення `/.well-known/payment`

---

## Навіщо AI-агентам екрановані платежі?

Для AI-агентів, що обробляють чутливі робочі процеси, юридичні дослідження, медичні запити, фінансовий аналіз і конкурентну розвідку, **кожен публічний платіж є витоком метаданих**. Zimppy — єдиний метод оплати MPP, який є **приватним за замовчуванням**.

### Порівняльна таблиця конфіденційності

| Властивість | Публічні ланцюги (USDC, ETH) | Екранований Zimppy | Прозорий Zimppy |
|---|---|---|---|
| **Відправник** | Видимий | Зашифрований | Видимий |
| **Одержувач** | Видимий | Зашифрований | Для кожного виклику (без зв'язку) |
| **Сума** | Видима | Зашифрована | Видима |
| **Примітка** | Видима | Зашифрована | Н/Д |
| **Захист від повторного відтворення** | Відсутній | Прив'язування примітки | T-адреса для кожного виклику |
| **Шаблон використання сервісу** | Можна пов'язати | Приватний | Неможливо пов'язати (нова адреса) |

### Проблема затримки, вирішена сесіями

> *"Але Zcash має 75-секундний час блоку."*

**Сесії вирішують це.** Очікування ончейн відбувається рівно **один раз** під час поповнення. Кожен наступний запит є миттєвим.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Сплатіть один раз, звертайтеся миттєво, отримуйте решту назад.** Затримка для кожного запиту дорівнює нулю.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** — це стандартизований протокол, який дає змогу автономним програмним агентам (AI-агентам, ботам, скриптам) виявляти, узгоджувати та виконувати платіжні вимоги для доступу до API без будь-якого втручання людини.

### Як MPP інтегрується з API

MPP дотримується потоку HTTP **402 Payment Required**:

1. **Агент запитує** ресурс у платній кінцевій точці API.
2. **Сервер відповідає** `402 Payment Required` + підписаний виклик (сума, одержувач, примітка).
3. **Агент сплачує** за допомогою сумісного методу оплати (наприклад, екранований Zcash через Zimppy).
4. **Агент повторює** запит з `Authorization: Payment {txid}`.
5. **Сервер перевіряє** платіж криптографічно (дешифрування Orchard IVK, перевірка суми + примітки).
6. **Сервер відповідає** `200 OK` + заголовок `Payment-Receipt`.

### Відповідність специфікації

- Підписування викликів **HMAC-SHA256**
- Структуровані відповіді про помилки **RFC 9457**
- Кінцева точка **`/.well-known/payment`** для автоматичного виявлення способу оплати
- **Orchard IVK** (Incoming Viewing Key) для серверної перевірки платежів без розкриття ключів витрачання

---

## Як працює Zimppy

### Сесії (рекомендовано)

Сесії — це основний шаблон взаємодії. Агент один раз поповнює баланс ончейн, отримує токен на пред'явника й використовує його для всіх наступних запитів із нульовою затримкою.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Найкраще підходить для:** високочастотних викликів API, LLM-інференсу, повторюваних запитів даних.

---

### Потокова передача

Контент із тарифікацією за токен, що передається через **Server-Sent Events (SSE)**. Сервер списує кошти з балансу сесії за кожне передане слово або токен.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Найкраще підходить для:** потокових відповідей LLM, потоків даних у реальному часі, AI-інструментів з оплатою за токен.

---

### Стягнення

Один екранований платіж для кожного запиту. Повний потік HTTP 402 виконується для кожного виклику. Підходить, коли запити нечасті або мають високу вартість.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Найкраще підходить для:** разових запитів високої вартості, нечастих викликів API, кінцевих точок преміальних даних.

---

## Сценарії використання та приклади

### 1. AI-агент

Юридичний AI-агент виконує запити до платної бази даних судової практики. Завдяки екранованим сесіям Zimppy ані особа юридичної фірми, ані конкретні запити не видно ончейн — це захищає адвокатську таємницю на рівні інфраструктури.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI-агент для конвеєра медичних запитів

Агент медичної діагностики виконує запити до кількох клінічних баз даних. Екрановані платежі гарантують, що шаблони запитів пацієнтів неможливо пов'язати між різними постачальниками.

### 3. Агент фінансового аналізу

Агент алгоритмічної торгівлі платить за API ринкових даних у реальному часі. Прозорі платежі використовують нові T-адреси для кожного виклику, запобігаючи кореляції шаблонів використання між постачальниками даних.

### 4. Сервер інструментів MCP, платні AI-інструменти

Сервер MCP (Model Context Protocol) надає платні AI-інструменти. Кожен виклик інструмента запускає стягнення через Zimppy, створюючи маркетплейс монетизованих AI-можливостей.

### 5. LLM-сумаризатор, оплата за токен

Сервіс сумаризації LLM стягує з агентів плату за кожен вихідний токен через потокову передачу SSE, з автоматичним списанням балансу та поверненням невикористаного передплаченого залишку.

---

## Встановлення

### Node.js / TypeScript

```bash
npm install zimppy          # CLI + wallet
npm install zimppy-ts       # TypeScript SDK
```

### Rust

```toml
[dependencies]
zimppy-core = "0.5"         # Rust verification engine
zimppy-rs = "0.5"           # Rust SDK (charge, session, axum)
```

---

## Налаштування гаманця Zimppy

CLI Zimppy надає повноцінний інтерфейс гаманця. Усі команди доступні через `npx zimppy`.

### Крок 1 : Створіть гаманець

```bash
npx zimppy wallet create
```

Генерує криптографічні ключі та відображає вашу **seed phrase**. Зберігайте її надійно — її неможливо відновити в разі втрати.

### Крок 2 : Перевірте адресу та баланс

```bash
npx zimppy wallet whoami
```

Відображає вашу **Unified Address (UA)**, **T-адресу**, поточний баланс і активну мережу.

```bash
npx zimppy wallet balance --all
```

Показує розподіл балансу за обліковими записами для всіх облікових записів ZIP-32.

### Крок 3 : Поповніть гаманець

Надішліть ZEC на свою Unified Address з будь-якого сумісного з Zcash гаманця або біржі. Екрановані поповнення надходять безпосередньо на ваш обліковий запис Orchard.

### Крок 4 : Надсилайте та екрануйте кошти

```bash
# Send ZEC to any address (shielded or transparent)
npx zimppy wallet send <addr> 42000

# Move transparent funds into Orchard (shielded)
npx zimppy wallet shield

# Transfer between your own accounts
npx zimppy wallet transfer 0 1 50000

# Switch active wallet identity
npx zimppy wallet use work
```

### Крок 5 : Виконайте запит з автоматичною оплатою

```bash
npx zimppy request <url>
```

Автоматично обробляє повний потік 402 -> оплата -> повторення. Сесії відкриваються та керуються прозоро.

---

## Інтеграція Zimppy - TypeScript SDK

### Сервер TypeScript - екранований

```typescript
import { Mppx } from 'mppx/server'
import { zcash } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcash({ wallet: 'server' })],
  realm: 'my-api',
  secretKey: process.env.MPP_SECRET_KEY,
})

const result = await mppx.charge({
  amount: '42000',
  currency: 'zec',
})(request)

if (result.status === 402) return result.challenge

return result.withReceipt(Response.json({ data }))
```

**Ключові моменти:**
- `zcash({ wallet: 'server' })` завантажує екранований гаманець сервера
- `mppx.charge()` обробляє повний життєвий цикл виклику/перевірки 402
- `result.withReceipt()` додає криптографічну квитанцію про платіж до відповіді

---

### Сервер TypeScript - прозорий

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Кожен виклик генерує **нову T-адресу**, що унеможливлює пов'язування платіжних запитів між сесіями.

---

### Клієнт TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Клієнт перехоплює відповіді `402`, автоматично відкриває сесію та повторює запит — код виклику не потребує платіжної логіки.

---

## Інтеграція Zimppy - Rust SDK

### Сервер Rust (Axum)

```rust
use mpp::server::axum::*;
use zimppy_rs::ZcashChallenger;

struct Price;

impl ChargeConfig for Price {
    fn amount() -> &'static str { "42000" }
}

async fn handler(charge: MppCharge<Price>) -> WithReceipt<Json<Value>> {
    WithReceipt {
        receipt: charge.receipt,
        body: Json(data),
    }
}
```

**Ключові моменти:**
- `MppCharge<Price>` — це екстрактор Axum, який перевіряє платіж до запуску обробника
- `WithReceipt` обгортає відповідь криптографічною квитанцією про платіж
- `ChargeConfig` визначає логіку ціноутворення — вона може бути динамічною на основі параметрів запиту

---

### Клієнт Rust

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` розширює будь-який HTTP-клієнт автоматичною обробкою 402, керуванням сесіями та виконанням платежів Zcash.

---

## Довідник CLI

| Команда | Опис |
|---|---|
| `npx zimppy wallet create` | Генерувати ключі та відобразити seed phrase |
| `npx zimppy wallet whoami` | Показати адресу (UA + T-адреса), баланс, мережу |
| `npx zimppy wallet balance --all` | Розподіл балансу за обліковими записами |
| `npx zimppy wallet send <addr> <zat>` | Надіслати екранований або прозорий ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | Внутрішній переказ між обліковими записами |
| `npx zimppy wallet shield` | Перемістити прозорі кошти до Orchard (екрановані) |
| `npx zimppy wallet use <name>` | Змінити активну ідентичність гаманця |
| `npx zimppy request <url>` | Автоматично виконати запит 402 -> оплата -> повторення |

---

## Ключові можливості

### Гаманці, орієнтовані на агентів

Гаманці Zimppy створені для програмного використання AI-агентами, а не для розширень браузера, якими керують люди. Ключами керують через CLI або SDK, облікові записи можна ротувати за допомогою **ZIP-32 account derivation**, а гаманець підтримує повністю автоматизовані платіжні потоки без схвалення людиною кожної транзакції.

### Підтримка кількох агентів

Кілька агентів можуть працювати з одного гаманця, використовуючи **ZIP-32 account rotation** — кожен агент отримує власний обліковий запис з ізольованим відстеженням балансу, можливістю переказів між обліковими записами та звітністю про баланс для кожного облікового запису. Це дає змогу керувати великою кількістю агентів з єдиної інфраструктури гаманця.

### Повністю екрановані транзакції Zcash (Orchard)

Екрановані платежі використовують **Orchard protocol** від Zcash — найновіший і найбезпечніший екранований пул. Сервер перевіряє платежі за допомогою **Incoming Viewing Key (IVK)**, який може дешифрувати отримані нотатки, не розкриваючи ключ витрачання. Атакам повторного відтворення запобігає **memo binding** — кожен виклик містить унікальну примітку `zimppy:{challenge_id}`, яка криптографічно перевіряється.

### Сесії , нульова затримка для кожного запиту

Сесійна архітектура відокремлює очікування ончейн-підтвердження від затримки для кожного запиту. Після одного поповнення (~75 секунд) усі наступні запити з токеном на пред'явника обслуговуються миттєво без взаємодії з блокчейном до закриття сесії.

### Потокова передача , оплата за токен

Нативна підтримка **SSE (Server-Sent Events)** дає змогу передавати контент із тарифікацією за токен. Ідеально для API LLM-інференсу, де довжина відповіді змінюється, а рахунок має відображати фактичне споживання.

### Відповідність специфікації

- Підписані виклики **HMAC-SHA256** запобігають підробці
- Структурований формат помилок **RFC 9457** для сумісної обробки помилок
- **`/.well-known/payment`** для автоматичного виявлення способу оплати будь-яким MPP-сумісним агентом

---

## Архітектура

```
crates/
  zimppy-core/       Zcash verification engine (Orchard decryption, replay protection)
  zimppy-wallet/     Native Zcash wallet (zingolib)
  zimppy-rs/         Rust SDK (ChargeMethod, SessionMethod, PaymentProvider, axum extractors)
  zimppy-napi/       Node.js native bindings (NAPI-RS)

packages/
  zimppy-ts/         TypeScript SDK (charge, session, SSE)
  zimppy-cli/        CLI with auto-pay and session management
```

### Відповідальність компонентів

**`zimppy-core`** — криптографічне ядро. Обробляє дешифрування нотаток Orchard за допомогою IVK сервера, розбір приміток, логіку захисту від повторного відтворення та перевірку викликів. Написано на Rust для продуктивності та коректності.

**`zimppy-wallet`** — нативний гаманець Zcash на базі `zingolib`. Керує ключами, обліковими записами, екранованими/прозорими балансами та надсиланням транзакцій.

**`zimppy-rs`** — Rust SDK. Надає трейти `ChargeMethod`, `SessionMethod` і `PaymentProvider`, а також екстрактори Axum (`MppCharge`, `WithReceipt`) для зручної інтеграції із сервером.

**`zimppy-napi`** — прив'язки NAPI-RS, що надають доступ до ядра Rust з Node.js, даючи змогу TypeScript SDK використовувати той самий криптографічний рушій без повторної реалізації примітивів Zcash у JavaScript.

**`zimppy-ts`** — TypeScript SDK. Обгортає прив'язки NAPI ідіоматичними async/await API для потоків стягнення, сесій та потокової передачі SSE.

**`zimppy-cli`** — гаманець командного рядка та інструмент запитів. Підтримує автоматичну оплату (402 -> оплата -> повторення), керування сесіями та всі операції гаманця.

---

## Приклади та демо

| Приклад | Опис |
|---|---|
| `examples/fortune-teller/` | Демо стягнення, сесій і потокової передачі — сервер + клієнт Rust |
| `examples/llm-summarizer/` | Демо потокової передачі LLM з оплатою за токен |
| `examples/mcp-server/` | Сервер інструментів MCP з платними AI-інструментами |
| `examples/ts-server/` | Еталонна реалізація сервера MPP на TypeScript |

---

## Що включено - підсумок можливостей

| Можливість | Опис |
|---|---|
| **Сесії** | Одноразове поповнення, миттєві запити на пред'явника, повернення коштів при закритті |
| **Потокова передача** | Контент із тарифікацією за токен через SSE |
| **Стягнення** | Екранований або прозорий платіж для кожного HTTP-запиту (потік 402) |
| **Прозорі платежі** | T-адреси із захистом від повторного відтворення для кожного виклику + команда shield |
| **Кілька облікових записів** | Ротація облікових записів ZIP-32, перекази між обліковими записами, баланси для кожного облікового запису |
| **CLI-гаманець** | Надсилання, екранування, переказ, balance --all, whoami, автоматична оплата |
| **Подвійний SDK** | TypeScript і Rust |
| **Відповідає специфікації** | Виклики HMAC-SHA256, помилки RFC 9457, виявлення `/.well-known/payment` |

---

*Щоб дізнатися більше, відвідайте [zimppy.xyz](https://zimppy.xyz)*

---

## Пов'язані сторінки

- [Гаманці](/using-zcash/wallets) — гаманці Zcash, що підтримують екрановані транзакції
- [Екрановані пули](/using-zcash/shielded-pools) — як екрановані транзакції Orchard захищають платіжні дані
- [Платіжні процесори](/using-zcash/payment-processors) — інші способи приймати платежі Zcash
- [Екрановані активи Zcash](/zcash-tech/zcash-shielded-assets) — ZSAs і майбутнє програмованості Zcash
- [Проєкти спільноти](/zcash-community/community-projects) — більше проєктів екосистеми Zcash
