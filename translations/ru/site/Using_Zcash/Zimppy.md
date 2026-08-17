<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Редактировать страницу"/>
</a>

# Zimppy.xyz

## Кратко

- **Zimppy** — это ориентированная на приватность платёжная инфраструктура для AI-агентов, использующая Machine Payment Protocol (MPP) от Zcash
- **Один раз внесите депозит** в ончейне (~75 секунд), а затем выполняйте **неограниченное количество мгновенных запросов** без взаимодействия с блокчейном для каждого отдельного запроса
- Поддерживаются **полностью экранированные платежи Zcash (Orchard)** — отправитель, получатель, сумма и memo полностью зашифрованы
- Работает с **SDK для TypeScript и Rust** для простой интеграции в AI-конвейеры и API-серверы
- Идеально подходит для **LLM API, маркетплейсов данных, MCP tool servers** и любых сценариев M2M-платежей

---

> **Zimppy** — это платёжный метод Machine Payment Protocol (MPP) для Zcash, поддерживающий как экранированные, так и прозрачные платежи. Один раз внесите депозит в ончейне, а затем выполняйте неограниченное количество мгновенных bearer-запросов без взаимодействия с блокчейном для каждого отдельного запроса.

---

## Содержание

1. [Что такое Zimppy.xyz?](#what-is-zimppyxyz)
2. [Зачем AI-агентам экранированные платежи?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Как работает Zimppy](#how-zimppy-works)
   - [Сессии (рекомендуется)](#sessions-recommended)
   - [Потоковая передача](#streaming)
   - [Оплата](#charge)
5. [Сценарии использования и примеры](#use-cases--examples)
6. [Установка](#installation)
7. [Настройка кошелька Zimppy](#setting-up-the-zimppy-wallet)
8. [Интеграция Zimppy](#integrating-zimppy--typescript-sdk)
   - [Сервер (экранированный)](#typescript-server--shielded)
   - [Сервер (прозрачный)](#typescript-server--transparent)
   - [Клиент](#typescript-client)
9. [Интеграция Zimppy — Rust SDK](#integrating-zimppy--rust-sdk)
   - [Сервер (Axum)](#rust-server-axum)
   - [Клиент](#rust-client)
10. [Справочник CLI](#cli-reference)
11. [Ключевые возможности](#key-features)
12. [Архитектура](#architecture)
13. [Примеры и демо](#examples--demos)

---

## Что такое Zimppy.xyz?

**Zimppy.xyz** — это ориентированная на приватность платёжная инфраструктура, разработанная специально для AI-агентов и автоматизированных workflow machine-to-machine (M2M). Она реализует **Machine Payment Protocol (MPP)** с использованием **Zcash** в качестве базовой валюты, обеспечивая как экранированный (полностью приватный), так и прозрачный режимы оплаты.

В отличие от традиционных блокчейн-платёжных систем, где каждая транзакция публично видна в ончейне, Zimppy построен на архитектуре на основе сессий, которая устраняет задержку на каждый запрос, сохраняя при этом криптографическую приватность. Это делает его особенно подходящим для AI-агентов, которым нужно программно оплачивать API, данные, вычисления или AI-инструменты без утечки поведенческих метаданных.

### Основные свойства

- **Один раз внесите депозит** в ончейне (~75 секунд на подтверждение Zcash)
- **Неограниченное количество мгновенных запросов** после открытия сессии, нулевое взаимодействие с блокчейном для каждого отдельного запроса
- **Экранированные платежи** шифруют отправителя, получателя, сумму и memo с использованием протокола Orchard от Zcash
- **Прозрачные платежи** используют отдельные T-address для каждого challenge для защиты от повторного воспроизведения без полной приватности
- **Соответствие спецификации**, HMAC-SHA256 challenge, ошибки RFC 9457, обнаружение через `/.well-known/payment`

---

## Зачем AI-агентам экранированные платежи?

Для AI-агентов, работающих с чувствительными workflow, юридическими исследованиями, медицинскими запросами, финансовым анализом, конкурентной разведкой, **каждый публичный платёж — это утечка метаданных**. Zimppy — единственный платёжный метод MPP, который обеспечивает **приватность по умолчанию**.

### Таблица сравнения приватности

| Свойство | Публичные сети (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **Отправитель** | Видим | Зашифрован | Видим |
| **Получатель** | Видим | Зашифрован | Для каждого challenge отдельно (не связывается) |
| **Сумма** | Видима | Зашифрована | Видима |
| **Memo** | Видимо | Зашифровано | Н/Д |
| **Защита от повторного воспроизведения** | Отсутствует | Привязка memo | T-address для каждого challenge |
| **Паттерн использования сервиса** | Связывается | Приватный | Не связывается (свежий addr) |

### Проблема задержки, решаемая сессиями

> *"Но у Zcash время блока — 75 секунд."*

**Сессии решают это.** Ожидание ончейн-подтверждения происходит ровно **один раз** — при внесении депозита. Каждый последующий запрос выполняется мгновенно.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**Заплатите один раз, вызывайте мгновенно, получите сдачу обратно.** Задержка на отдельный запрос равна нулю.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)** — это стандартизированный протокол, который позволяет автономным программным агентам (AI-агентам, ботам, скриптам) обнаруживать, согласовывать и выполнять платёжные требования для доступа к API — полностью без участия человека.

### Как MPP интегрируется с API

MPP следует HTTP-потоку **402 Payment Required**:

1. **Агент запрашивает** ресурс у платного API endpoint.
2. **Сервер отвечает** `402 Payment Required` + подписанный challenge (сумма, получатель, memo).
3. **Агент платит** с использованием совместимого платёжного метода (например, Zimppy shielded Zcash).
4. **Агент повторяет** запрос с `Authorization: Payment {txid}`.
5. **Сервер проверяет** платёж криптографически (дешифрование Orchard IVK, проверка суммы и memo).
6. **Сервер отвечает** `200 OK` + заголовок `Payment-Receipt`.

### Соответствие спецификации

- Подписание challenge с помощью **HMAC-SHA256**
- Структурированные ответы об ошибках по **RFC 9457**
- Endpoint **`/.well-known/payment`** для автоматического обнаружения поддерживаемых способов оплаты
- **Orchard IVK** (Incoming Viewing Key) для серверной проверки платежей без раскрытия spending keys

---

## Как работает Zimppy

### Сессии (рекомендуется)

Сессии — основной шаблон взаимодействия. Агент один раз вносит баланс в ончейне, получает bearer token и использует его для всех последующих запросов с нулевой задержкой.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**Лучше всего подходит для:** частых вызовов API, LLM inference, повторяющихся запросов данных.

---

### Потоковая передача

Контент с тарификацией за токен доставляется через **Server-Sent Events (SSE)**. Сервер списывает средства с баланса сессии за каждое переданное слово или токен.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**Лучше всего подходит для:** потоковых ответов LLM, потоков данных в реальном времени, AI-инструментов с оплатой за токен.

---

### Оплата

Один экранированный платёж на каждый запрос. Полный HTTP-поток 402 выполняется для каждого вызова. Подходит, когда запросы редки или имеют высокую ценность.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**Лучше всего подходит для:** разовых высокоценных запросов, редких вызовов API, премиальных endpoint с данными.

---

## Сценарии использования и примеры

### 1. AI-агент

Юридический AI-агент делает запросы к платной базе судебной практики. Используя экранированные сессии Zimppy, ни личность юридической фирмы, ни конкретные запросы не видны в ончейне, что защищает адвокатскую тайну на уровне инфраструктуры.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. AI-агент для конвейера медицинских запросов

Медицинский диагностический агент запрашивает данные из нескольких клинических баз. Экранированные платежи гарантируют, что шаблоны запросов пациентов нельзя связать между провайдерами.

### 3. Агент финансового анализа

Агент алгоритмической торговли платит за API рыночных данных в реальном времени. Прозрачные платежи используют свежие T-address для каждого challenge, предотвращая корреляцию паттернов использования у разных поставщиков данных.

### 4. MCP Tool Server, платные AI-инструменты

MCP (Model Context Protocol) server предоставляет платные AI-инструменты. Каждый вызов инструмента инициирует оплату через Zimppy, что позволяет создать рынок монетизируемых AI-возможностей.

### 5. LLM-суммаризатор, оплата за токен

Сервис суммаризации на базе LLM взимает с агентов плату за каждый выходной токен через SSE-стриминг, с автоматическим списанием баланса и возвратом неиспользованной предоплаты.

---

## Установка

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

## Настройка кошелька Zimppy

CLI Zimppy предоставляет полноценный интерфейс кошелька. Все команды доступны через `npx zimppy`.

### Шаг 1: Создайте кошелёк

```bash
npx zimppy wallet create
```

Генерирует криптографические ключи и показывает вашу **seed phrase**. Храните её в безопасном месте — при потере восстановить её невозможно.

### Шаг 2: Проверьте адрес и баланс

```bash
npx zimppy wallet whoami
```

Показывает ваш **Unified Address (UA)**, **T-address**, текущий баланс и активную сеть.

```bash
npx zimppy wallet balance --all
```

Показывает разбивку баланса по всем аккаунтам ZIP-32.

### Шаг 3: Пополните кошелёк

Отправьте ZEC на ваш Unified Address из любого совместимого с Zcash кошелька или с биржи. Экранированные депозиты поступают напрямую в ваш аккаунт Orchard.

### Шаг 4: Отправка и экранирование средств

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

### Шаг 5: Выполните запрос с автооплатой

```bash
npx zimppy request <url>
```

Автоматически выполняет полный поток 402 -> pay -> retry. Сессии открываются и управляются прозрачно.

---

## Интеграция Zimppy — TypeScript SDK

### Сервер TypeScript — экранированный

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

**Ключевые моменты:**
- `zcash({ wallet: 'server' })` загружает экранированный серверный кошелёк
- `mppx.charge()` обрабатывает полный жизненный цикл challenge/verify для 402
- `result.withReceipt()` прикрепляет к ответу криптографическую платёжную квитанцию

---

### Сервер TypeScript — прозрачный

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

Для каждого challenge создаётся **свежий T-address**, благодаря чему платёжные запросы нельзя связать между сессиями.

---

### Клиент TypeScript

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

Клиент перехватывает ответы `402`, автоматически открывает сессию и повторяет запрос — вызывающему коду не требуется никакой платёжной логики.

---

## Интеграция Zimppy — Rust SDK

### Rust Server (Axum)

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

**Ключевые моменты:**
- `MppCharge<Price>` — это extractor для Axum, который проверяет платёж до выполнения handler
- `WithReceipt` оборачивает ответ криптографической платёжной квитанцией
- `ChargeConfig` определяет логику ценообразования — она может быть динамической в зависимости от параметров запроса

---

### Rust Client

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment` расширяет любой HTTP-клиент автоматической обработкой 402, управлением сессиями и выполнением платежей в Zcash.

---

## Справочник CLI

| Command | Description |
|---|---|
| `npx zimppy wallet create` | Сгенерировать ключи и показать seed phrase |
| `npx zimppy wallet whoami` | Показать адрес (UA + T-addr), баланс, сеть |
| `npx zimppy wallet balance --all` | Разбивка баланса по аккаунтам |
| `npx zimppy wallet send <addr> <zat>` | Отправить экранированные или прозрачные ZEC |
| `npx zimppy wallet transfer <from> <to> <zat>` | Внутренний перевод между аккаунтами |
| `npx zimppy wallet shield` | Переместить прозрачные средства в Orchard (экранированно) |
| `npx zimppy wallet use <name>` | Переключить активную identity кошелька |
| `npx zimppy request <url>` | Автоматический запрос 402 -> pay -> retry |

---

## Ключевые возможности

### Кошельки, нативные для агентов

Кошельки Zimppy предназначены для программного использования AI-агентами, а не как браузерные расширения под управлением человека. Ключи управляются через CLI или SDK, аккаунты могут ротироваться через **ZIP-32 account derivation**, а кошелёк поддерживает полностью автоматизированные платёжные потоки без необходимости ручного подтверждения каждой транзакции.

### Поддержка нескольких агентов

Несколько агентов могут работать из одного и того же кошелька с использованием **ZIP-32 account rotation** — каждый агент получает собственный аккаунт с изолированным учётом баланса, возможностью межаккаунтных переводов и отчётностью по балансу для каждого аккаунта. Это позволяет управлять целым флотом агентов на базе единой кошелечной инфраструктуры.

### Полностью экранированные транзакции Zcash (Orchard)

Экранированные платежи используют **Orchard protocol** от Zcash — самый новый и самый безопасный экранированный пул. Сервер проверяет платежи с помощью **Incoming Viewing Key (IVK)**, который может расшифровывать полученные notes без раскрытия spending key. Атаки повторного воспроизведения предотвращаются с помощью **memo binding** — каждый challenge встраивает уникальное memo `zimppy:{challenge_id}`, которое криптографически проверяется.

### Сессии, нулевая задержка на каждый запрос

Архитектура сессий отделяет ожидание ончейн-подтверждения от задержки на отдельный запрос. После одного депозита (~75 секунд) все последующие запросы с bearer token обрабатываются мгновенно без взаимодействия с блокчейном до закрытия сессии.

### Потоковая передача, оплата за токен

Нативная поддержка **SSE (Server-Sent Events)** позволяет тарифицировать контент по токенам. Идеально подходит для API LLM inference, где длина ответа переменна и тарификация должна отражать фактическое потребление.

### Соответствие спецификации

- Challenge, подписанные с помощью **HMAC-SHA256**, предотвращают подделку
- Структурированный формат ошибок **RFC 9457** для совместимой обработки ошибок
- **`/.well-known/payment`** для автоматического обнаружения способа оплаты любым агентом, совместимым с MPP

---

## Архитектура

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

### Обязанности компонентов

**`zimppy-core`** — криптографическое ядро. Обрабатывает дешифрование Orchard notes с использованием серверного IVK, разбор memo, логику защиты от повторного воспроизведения и проверку challenge. Написан на Rust для производительности и корректности.

**`zimppy-wallet`** — нативный кошелёк Zcash на базе `zingolib`. Управляет ключами, аккаунтами, экранированными/прозрачными балансами и отправкой транзакций.

**`zimppy-rs`** — Rust SDK. Предоставляет трейты `ChargeMethod`, `SessionMethod` и `PaymentProvider`, а также extractors для Axum (`MppCharge`, `WithReceipt`) для удобной серверной интеграции.

**`zimppy-napi`** — биндинги NAPI-RS, которые предоставляют доступ к Rust-ядру из Node.js, позволяя TypeScript SDK использовать тот же криптографический движок без повторной реализации примитивов Zcash на JavaScript.

**`zimppy-ts`** — TypeScript SDK. Оборачивает биндинги NAPI в идиоматичные async/await API для потоков charge, session и SSE-streaming.

**`zimppy-cli`** — инструмент командной строки для кошелька и запросов. Поддерживает автооплату (402 -> pay -> retry), управление сессиями и все операции кошелька.

---

## Примеры и демо

| Example | Description |
|---|---|
| `examples/fortune-teller/` | Демо charge, session и streaming — Rust server + client |
| `examples/llm-summarizer/` | Демо LLM-стриминга с оплатой за токен |
| `examples/mcp-server/` | MCP tool server с платными AI-инструментами |
| `examples/ts-server/` | Эталонная реализация MPP server на TypeScript |

---

## Что включено — сводка возможностей

| Feature | Description |
|---|---|
| **Sessions** | Один депозит, мгновенные bearer-запросы, возврат средств при закрытии |
| **Streaming** | Контент с тарификацией за токен через SSE |
| **Charge** | Экранированный или прозрачный платёж на каждый HTTP-запрос (поток 402) |
| **Transparent Payments** | T-address с защитой от повторного воспроизведения для каждого challenge + команда shield |
| **Multi-Account** | Ротация аккаунтов ZIP-32, межаккаунтные переводы, балансы по аккаунтам |
| **CLI Wallet** | Отправка, shield, transfer, balance --all, whoami, auto-pay |
| **Dual SDK** | TypeScript и Rust |
| **Spec-Compliant** | Challenge HMAC-SHA256, ошибки RFC 9457, обнаружение через `/.well-known/payment` |

---

*Для получения дополнительной информации посетите [zimppy.xyz](https://zimppy.xyz)*

---

## Связанные страницы

- [Кошельки](/using-zcash/wallets) — кошельки Zcash, поддерживающие экранированные транзакции
- [Экранированные пулы](/using-zcash/shielded-pools) — как экранированные транзакции Orchard защищают платёжные данные
- [Платёжные процессоры](/using-zcash/payment-processors) — другие способы принимать платежи в Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSA и будущее программируемости Zcash
- [Проекты сообщества](/zcash-community/community-projects) — другие проекты экосистемы Zcash
