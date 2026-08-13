<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## Коротко

- **Zimppy** — це платіжна інфраструктура з пріоритетом приватності для AI-агентів, що використовує Machine Payment Protocol (MPP) від Zcash
- **Поповніть один раз** ончейн (~75 секунд), а потім робіть **необмежену кількість миттєвих запитів** без взаємодії з блокчейном для кожного запиту
- Підтримує **повністю shielded платежі Zcash (Orchard)** — відправник, отримувач, сума та memo повністю зашифровані
- Працює з **SDK для TypeScript і Rust** для легкої інтеграції в AI-конвеєри та API-сервери
- Ідеально підходить для **LLM API, маркетплейсів даних, MCP tool servers** та будь-яких випадків M2M-платежів

---

> **Zimppy** — це платіжний метод Machine Payment Protocol (MPP) для Zcash, що підтримує як shielded, так і transparent платежі. Поповніть один раз ончейн, а потім робіть необмежену кількість миттєвих bearer-запитів без взаємодії з мережею для кожного окремого запиту.

---

## Зміст

1. [Що таке Zimppy.xyz?](#what-is-zimppyxyz)
2. [Навіщо shielded платежі для AI-агентів?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Як працює Zimppy](#how-zimppy-works)
   - [Сесії (рекомендовано)](#sessions-recommended)
   - [Стримінг](#streaming)
   - [Оплата](#charge)
5. [Випадки використання та приклади](#use-cases--examples)
6. [Встановлення](#installation)
7. [Налаштування гаманця Zimppy](#setting-up-the-zimppy-wallet)
8. [Інтеграція Zimppy](#integrating-zimppy--typescript-sdk)
   - [Сервер (Shielded)](#typescript-server--shielded)
   - [Сервер (Transparent)](#typescript-server--transparent)
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

**Zimppy.xyz** — це платіжна інфраструктура з пріоритетом приватності, розроблена спеціально для AI-агентів і автоматизованих machine-to-machine (M2M) процесів. Вона реалізує **Machine Payment Protocol (MPP)** з використанням **Zcash** як базової валюти, забезпечуючи як shielded (повністю приватний), так і transparent режим оплати.

На відміну від традиційних блокчейн-платіжних систем, де кожна транзакція публічно видима ончейн, Zimppy побудовано навколо архітектури на основі сесій, яка усуває затримку для кожного запиту, зберігаючи криптографічну приватність. Це робить її особливо придатною для AI-агентів, яким потрібно програмно оплачувати API, дані, обчислення або AI-інструменти, не розкриваючи поведінкові метадані.

### Основні властивості

- **Одноразове поповнення** ончейн (~75 секунд для підтвердження Zcash)
- **Необмежена кількість миттєвих запитів** після відкриття сесії, без взаємодії з блокчейном для кожного запиту
- **Shielded платежі** шифрують відправника, отримувача, суму та memo за допомогою протоколу Orchard від Zcash
- **Transparent платежі** використовують T-адреси для кожного challenge для захисту від повторного відтворення без повної приватності
- **Відповідність специфікації**, HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` discovery

---

## Навіщо shielded платежі для AI-агентів?

Для AI-агентів, які працюють із чутливими процесами, юридичними дослідженнями, медичними запитами, фінансовим аналізом, конкурентною аналітикою, **кожен публічний платіж є витоком метаданих**. Zimppy — єдиний платіжний метод MPP, який є **приватним за замовчуванням**.

### Таблиця порівняння приватності

| Property | Public Chains (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Sender** | Visible | Encrypted | Visible |
| **Receiver** | Visible | Encrypted | Per-challenge (unlinkable) |
| **Amount** | Visible | Encrypted | Visible |
| **Memo** | Visible | Encrypted | N/A |
| **Replay Protection** | None | Memo binding | Per-challenge T-address |
| **Service Usage Pattern** | Linkable | Private | Unlinkable (fresh addr) |

### Проблема затримки, яку вирішують сесії

> *"Але в Zcash час блоку — 75 секунд."*

**Сесії вирішують це.** Очікування ончейн відбувається рівно **один раз** — під час поповнення. Кожен наступний запит є миттєвим.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Заплатіть один раз, викликайте миттєво, отримайте решту назад.** Затримка для кожного запиту дорівнює нулю.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** — це стандартизований протокол, який дозволяє автономним програмним агентам (AI-агентам, ботам, скриптам) знаходити, узгоджувати та виконувати платіжні вимоги для доступу до API — і все це без участі людини.

### Як MPP інтегрується з API

MPP використовує HTTP-потік **402 Payment Required**:

1. **Агент запитує** ресурс у платному API endpoint.
2. **Сервер відповідає** `402 Payment Required` + підписаним challenge (сума, отримувач, memo).
3. **Агент платить** сумісним платіжним методом (наприклад, Zimppy shielded Zcash).
4. **Агент повторює** запит із `Authorization: Payment {txid}`.
5. **Сервер перевіряє** платіж криптографічно (Orchard IVK decryption, перевірка суми + memo).
6. **Сервер відповідає** `200 OK` + заголовком `Payment-Receipt`.

### Відповідність специфікації

- **HMAC-SHA256** підписування challenges
- **RFC 9457** структуровані відповіді про помилки
- **`/.well-known/payment`** endpoint для автоматичного виявлення платіжного методу
- **Orchard IVK** (Incoming Viewing Key) для перевірки платежів на стороні сервера без розкриття ключів витрачання

---

## Як працює Zimppy

### Сесії (рекомендовано)

Сесії — це основний шаблон взаємодії. Агент один раз поповнює баланс ончейн, отримує bearer-токен і використовує його для всіх наступних запитів без затримки.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Найкраще для:** частих API-викликів, LLM inference, повторюваних запитів до даних.

---

### Стримінг

Контент із тарифікацією за токен, що передається через **Server-Sent Events (SSE)**. Сервер списує кошти з балансу сесії за кожне слово або токен у потоці.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Найкраще для:** потокових відповідей LLM, потоків даних у реальному часі, AI-інструментів із оплатою за токен.

---

### Оплата

Один shielded платіж на кожен запит. Повний HTTP 402 flow виконується для кожного виклику. Підходить, коли запити нечасті або мають високу цінність.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Найкраще для:** разових запитів високої вартості, нечастих API-викликів, преміальних data endpoints.

---

## Випадки використання та приклади

### 1. AI-агент

Юридичний AI-агент звертається до платної бази судової практики. Використовуючи shielded сесії Zimppy, ані особа юридичної фірми, ані конкретні запити не видно ончейн, що захищає адвокатську таємницю на рівні інфраструктури.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI-агент для конвеєра медичних запитів

Медичний діагностичний агент звертається до кількох клінічних баз даних. Shielded платежі гарантують, що шаблони запитів пацієнтів не можуть бути пов’язані між провайдерами.

### 3. Агент фінансового аналізу

Агент для алгоритмічної торгівлі платить за API ринкових даних у реальному часі. Transparent платежі використовують нові T-адреси для кожного challenge, запобігаючи кореляції шаблонів використання між постачальниками даних.

### 4. MCP Tool Server, платні AI-інструменти

MCP (Model Context Protocol) сервер надає платні AI-інструменти. Кожен виклик інструмента запускає оплату через Zimppy, створюючи маркетплейс монетизованих AI-можливостей.

### 5. LLM Summarizer, оплата за токен

Сервіс узагальнення LLM стягує оплату з агентів за кожен вихідний токен через SSE-стримінг, з автоматичним списанням балансу та поверненням невикористаного передплаченого залишку.

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

Генерує криптографічні ключі та показує вашу **seed phrase**. Зберігайте її надійно — у разі втрати її неможливо відновити.

### Крок 2 : Перевірте свою адресу та баланс

```bash
npx zimppy wallet whoami
```

Показує вашу **Unified Address (UA)**, **T-address**, поточний баланс і активну мережу.

```bash
npx zimppy wallet balance --all
```

Показує деталізацію балансу для кожного акаунта в усіх ZIP-32 акаунтах.

### Крок 3 : Поповніть свій гаманець

Надішліть ZEC на свою Unified Address з будь-якого сумісного з Zcash гаманця або біржі. Shielded депозити надходять безпосередньо до вашого акаунта Orchard.

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

### Крок 5 : Зробіть запит з Auto-Pay

```bash
npx zimppy request <url>
```

Автоматично обробляє повний потік 402 -> pay -> retry. Сесії відкриваються та керуються прозоро.

---

## Інтеграція Zimppy - TypeScript SDK

### TypeScript сервер - Shielded

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
- `zcash({ wallet: 'server' })` завантажує shielded гаманець сервера
- `mppx.charge()` обробляє повний життєвий цикл 402 challenge/verify
- `result.withReceipt()` додає до відповіді криптографічний платіжний receipt

---

### TypeScript сервер - Transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Для кожного challenge генерується **нова T-address**, що робить платіжні запити непов’язуваними між сесіями.

---

### TypeScript клієнт

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Клієнт перехоплює відповіді `402`, автоматично відкриває сесію та повторює запит — код, що викликає, не потребує жодної логіки, пов’язаної з оплатою.

---

## Інтеграція Zimppy - Rust SDK

### Rust сервер (Axum)

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
- `MppCharge<Price>` — це Axum extractor, який перевіряє оплату до запуску handler
- `WithReceipt` обгортає відповідь криптографічним платіжним receipt
- `ChargeConfig` визначає логіку ціноутворення — вона може бути динамічною залежно від параметрів запиту

---

### Rust клієнт

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

| Command | Description |
|---|---|
| `npx zimppy wallet create` | Згенерувати ключі та показати seed phrase |
| `npx zimppy wallet whoami` | Показати адресу (UA + T-addr), баланс, мережу |
| `npx zimppy wallet balance --all` | Деталізація балансу по акаунтах |
| `npx zimppy wallet send <addr> <zat>` | Надіслати shielded або transparent ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | Внутрішній переказ між акаунтами |
| `npx zimppy wallet shield` | Перемістити transparent кошти в Orchard (shielded) |
| `npx zimppy wallet use <name>` | Перемкнути активну ідентичність гаманця |
| `npx zimppy request <url>` | Автоматичний запит 402 -> pay -> retry |

---

## Ключові можливості

### Гаманці, створені для агентів

Гаманці Zimppy розроблені для програмного використання AI-агентами, а не як браузерні розширення з ручним керуванням. Ключами керують через CLI або SDK, акаунти можна ротувати через **ZIP-32 account derivation**, а гаманець підтримує повністю автоматизовані платіжні потоки без людського схвалення кожної транзакції.

### Підтримка багатьох агентів

Кілька агентів можуть працювати з одного гаманця, використовуючи **ZIP-32 account rotation** — кожен агент отримує власний акаунт з ізольованим обліком балансу, можливістю міжакаунтних переказів і звітністю балансу по кожному акаунту. Це дає змогу керувати великою кількістю агентів з єдиної гаманцевої інфраструктури.

### Повністю shielded транзакції Zcash (Orchard)

Shielded платежі використовують **протокол Orchard** від Zcash — найновіший і найбезпечніший shielded pool. Сервер перевіряє платежі за допомогою **Incoming Viewing Key (IVK)**, який може розшифровувати отримані note без розкриття ключа витрачання. Атакам повторного відтворення запобігає **memo binding** — кожен challenge містить унікальне `zimppy:{challenge_id}` memo, яке перевіряється криптографічно.

### Сесії , нульова затримка для кожного запиту

Сесійна архітектура розділяє очікування ончейн-підтвердження і затримку для кожного запиту. Після одного поповнення (~75 секунд) усі наступні bearer-token запити обслуговуються миттєво без взаємодії з блокчейном до закриття сесії.

### Стримінг , оплата за токен

Нативна підтримка **SSE (Server-Sent Events)** дає змогу тарифікувати контент за токен. Ідеально для API LLM inference, де довжина відповіді змінна, а виставлення рахунку має відображати фактичне споживання.

### Відповідність специфікації

- **HMAC-SHA256** signed challenges запобігають підробці
- **RFC 9457** структурований формат помилок для сумісної обробки помилок
- **`/.well-known/payment`** для автоматичного виявлення платіжного методу будь-яким агентом, сумісним із MPP

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

**`zimppy-core`** — криптографічне ядро. Обробляє розшифрування note Orchard за допомогою IVK сервера, парсинг memo, логіку захисту від повторного відтворення та перевірку challenge. Написано на Rust для продуктивності та коректності.

**`zimppy-wallet`** — нативний гаманець Zcash на базі `zingolib`. Керує ключами, акаунтами, shielded/transparent балансами та відправкою транзакцій.

**`zimppy-rs`** — Rust SDK. Надає traits `ChargeMethod`, `SessionMethod` і `PaymentProvider`, а також Axum extractors (`MppCharge`, `WithReceipt`) для зручної інтеграції із сервером.

**`zimppy-napi`** — bindings NAPI-RS, що відкривають Rust-ядро для Node.js, дозволяючи TypeScript SDK використовувати той самий криптографічний engine без повторної реалізації примітивів Zcash на JavaScript.

**`zimppy-ts`** — TypeScript SDK. Обгортає NAPI bindings у зручні async/await API для charge, session та потоків SSE.

**`zimppy-cli`** — гаманець і request tool для командного рядка. Підтримує auto-pay (402 -> pay -> retry), керування сесіями та всі гаманцеві операції.

---

## Приклади та демо

| Example | Description |
|---|---|
| `examples/fortune-teller/` | Демо charge, session і streaming - Rust сервер + клієнт |
| `examples/llm-summarizer/` | Демо LLM streaming з оплатою за токен |
| `examples/mcp-server/` | MCP tool server із платними AI-інструментами |
| `examples/ts-server/` | Еталонна реалізація TypeScript MPP сервера |

---

## Що включено - Підсумок можливостей

| Feature | Description |
|---|---|
| **Sessions** | Одне поповнення, миттєві bearer-запити, повернення залишку при закритті |
| **Streaming** | Контент із тарифікацією за токен через SSE |
| **Charge** | Shielded або transparent платіж для кожного HTTP-запиту (402 flow) |
| **Transparent Payments** | T-addresses із захистом від повторного відтворення для кожного challenge + команда shield |
| **Multi-Account** | ZIP-32 account rotation, міжакаунтні перекази, баланси по акаунтах |
| **CLI Wallet** | Надсилання, shield, transfer, balance --all, whoami, auto-pay |
| **Dual SDK** | TypeScript і Rust |
| **Spec-Compliant** | HMAC-SHA256 challenges, RFC 9457 errors, `/.well-known/payment` discovery |

---

*Для отримання додаткової інформації відвідайте [zimppy.xyz](https://zimppy.xyz)*

---

## Пов’язані сторінки

- [Гаманці](/using-zcash/wallets) — Гаманці Zcash, які підтримують shielded транзакції
- [Shielded Pools](/using-zcash/shielded-pools) — Як shielded транзакції Orchard захищають платіжні дані
- [Платіжні процесори](/using-zcash/payment-processors) — Інші способи приймати платежі в Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSA та майбутнє програмованості Zcash
- [Проєкти спільноти](/zcash-community/community-projects) — Більше проєктів екосистеми Zcash
