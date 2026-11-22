<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zimppy.xyz

## 한눈에 보기

- **Zimppy**는 Zcash의 Machine Payment Protocol(MPP)을 사용하는 프라이버시 우선 결제 인프라입니다.
- 온체인에서 **한 번 입금**한 다음(NU7 이후 블록당 약 25초), 요청마다 블록체인과 상호작용할 필요 없이 **무제한으로 즉시 요청**할 수 있습니다.
- **완전한 거래정보 보호 Zcash(Orchard)** 결제를 지원합니다. 송신자, 수신자, 금액, 메모가 모두 암호화됩니다.
- **TypeScript 및 Rust SDK**를 사용해 AI 파이프라인과 API 서버에 쉽게 통합할 수 있습니다.
- **LLM API, 데이터 마켓플레이스, MCP 도구 서버** 등 M2M 결제 사용 사례에 적합합니다.

---

> **Zimppy**는 Zcash을 지원하는 Machine Payment Protocol(MPP) 결제 수단으로, 거래정보 보호 결제와 투명 결제를 모두 지원합니다. 온체인에서 한 번 입금한 다음, 요청마다 체인과 상호작용할 필요 없이 무제한으로 즉시 무기명 요청을 수행할 수 있습니다.

---

## 목차

1. [Zimppy.xyz란 무엇인가요?](#what-is-zimppyxyz)
2. [AI 에이전트에 거래정보 보호 결제가 필요한 이유](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol(MPP)](#machine-payment-protocol-mpp)
4. [Zimppy 작동 방식](#how-zimppy-works)
   - [세션(권장)](#sessions-recommended)
   - [스트리밍](#streaming)
   - [단건 결제](#charge)
5. [사용 사례 및 예시](#use-cases--examples)
6. [설치](#installation)
7. [Zimppy 지갑 설정](#setting-up-the-zimppy-wallet)
8. [Zimppy 통합](#integrating-zimppy--typescript-sdk)
   - [서버(거래정보 보호)](#typescript-server--shielded)
   - [서버(투명)](#typescript-server--transparent)
   - [클라이언트](#typescript-client)
9. [Zimppy 통합 - Rust SDK](#integrating-zimppy--rust-sdk)
   - [서버(Axum)](#rust-server-axum)
   - [클라이언트](#rust-client)
10. [CLI 참조](#cli-reference)
11. [주요 기능](#key-features)
12. [아키텍처](#architecture)
13. [예시 및 데모](#examples--demos)

---

## Zimppy.xyz란 무엇인가요?

**Zimppy.xyz**는 AI 에이전트와 자동화된 기계 간(M2M) 워크플로를 위해 특별히 설계된 프라이버시 우선 결제 인프라입니다. **Zcash**를 기반 통화로 사용해 **Machine Payment Protocol(MPP)**을 구현하며, 거래정보 보호(완전한 프라이버시) 결제와 투명 결제 방식을 모두 지원합니다.

모든 거래가 온체인에 공개되는 기존 블록체인 결제 시스템과 달리, Zimppy는 요청마다 발생하는 지연을 없애면서 암호학적 프라이버시를 유지하는 세션 기반 아키텍처를 중심으로 설계되었습니다. 따라서 행동 메타데이터를 노출하지 않고 프로그래밍 방식으로 API, 데이터, 컴퓨팅 또는 AI 도구에 비용을 지불해야 하는 AI 에이전트에 특히 적합합니다.

### 핵심 특성

- 온체인에서 **한 번 입금**합니다(NU7 이후 Zcash 블록당 약 25초, 이전에는 75초).
- 세션을 연 후 **무제한으로 즉시 요청**할 수 있으며, 요청마다 체인과 상호작용할 필요가 없습니다.
- **거래정보 보호 결제**는 Zcash의 Orchard 프로토콜을 사용해 송신자, 수신자, 금액, 메모를 암호화합니다.
- **투명 결제**는 완전한 프라이버시 없이 재전송을 방지하기 위해 각 챌린지마다 T 주소를 사용합니다.
- **사양 준수**: HMAC-SHA256 챌린지, RFC 9457 오류, `/.well-known/payment` 검색을 지원합니다.

---

## AI 에이전트에 거래정보 보호 결제가 필요한 이유

민감한 업무, 법률 조사, 의료 질의, 금융 분석, 경쟁 정보 수집을 수행하는 AI 에이전트의 경우 **모든 공개 결제는 메타데이터 유출**입니다. Zimppy는 기본적으로 프라이버시를 보호하는 유일한 MPP 결제 수단입니다.

### 프라이버시 비교표

| 속성 | 공개 체인(USDC, ETH) | Zimppy 거래정보 보호 | Zimppy 투명 |
|---|---|---|---|
| **송신자** | 공개 | 암호화 | 공개 |
| **수신자** | 공개 | 암호화 | 챌린지별(연결 불가능) |
| **금액** | 공개 | 암호화 | 공개 |
| **메모** | 공개 | 암호화 | 해당 없음 |
| **재전송 방지** | 없음 | 메모 바인딩 | 챌린지별 T 주소 |
| **서비스 사용 패턴** | 연결 가능 | 비공개 | 연결 불가능(새 주소) |

### 세션으로 해결하는 지연 문제

> *“하지만 Zcash 블록은 여전히 25초가 걸립니다(NU7 이전에는 75초).”*

**세션으로 해결할 수 있습니다.** 온체인 대기는 입금할 때 **한 번만** 발생합니다. 이후의 모든 요청은 즉시 처리됩니다.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~25s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**한 번 결제하고, 즉시 호출한 다음, 잔액을 돌려받으세요.** 요청별 지연 시간은 0입니다.

---

## Machine Payment Protocol(MPP)

**Machine Payment Protocol(MPP)**은 자율 소프트웨어 에이전트(AI 에이전트, 봇, 스크립트)가 사람의 개입 없이 API 접근에 필요한 결제 조건을 검색하고 협상하며 이행할 수 있도록 하는 표준 프로토콜입니다.

### MPP와 API 통합 방식

MPP는 HTTP **402 Payment Required** 흐름을 따릅니다.

1. **에이전트가** 유료 API 엔드포인트에 리소스를 요청합니다.
2. **서버가** `402 Payment Required`와 서명된 챌린지(금액, 수신자, 메모)를 반환합니다.
3. **에이전트가** 호환되는 결제 수단(예: Zimppy 거래정보 보호 Zcash)을 사용해 결제합니다.
4. **에이전트가** `Authorization: Payment {txid}`와 함께 요청을 다시 보냅니다.
5. **서버가** 결제를 암호학적으로 검증합니다(Orchard IVK 복호화, 금액 및 메모 확인).
6. **서버가** `200 OK`와 `Payment-Receipt` 헤더를 반환합니다.

### 사양 준수

- **HMAC-SHA256** 챌린지 서명
- **RFC 9457** 구조화된 오류 응답
- 결제 수단을 자동으로 검색하기 위한 **`/.well-known/payment`** 엔드포인트
- spending key를 노출하지 않고 서버 측에서 결제를 검증하는 **Orchard IVK**(Incoming Viewing Key)

---

## Zimppy 작동 방식

### 세션(권장)

세션은 기본 상호작용 방식입니다. 에이전트는 온체인에서 한 번 잔액을 입금하고 무기명 토큰을 받은 뒤, 이후 모든 요청에 지연 없이 해당 토큰을 사용합니다.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**적합한 용도:** 빈번한 API 호출, LLM 추론, 반복적인 데이터 조회.

---

### 스트리밍

**Server-Sent Events(SSE)**를 통해 전달되는 토큰당 과금 콘텐츠입니다. 서버는 스트리밍되는 단어나 토큰마다 세션 잔액에서 금액을 차감합니다.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**적합한 용도:** LLM 스트리밍 응답, 실시간 데이터 피드, 토큰당 과금 AI 도구.

---

### 단건 결제

요청마다 한 번씩 거래정보 보호 결제를 수행합니다. 각 호출마다 전체 HTTP 402 흐름을 실행합니다. 요청 빈도가 낮거나 금액이 큰 경우에 적합합니다.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**적합한 용도:** 고액의 일회성 요청, 드문 API 호출, 프리미엄 데이터 엔드포인트.

---

## 사용 사례 및 예시

### 1. AI 에이전트

법률 AI 에이전트가 유료 판례 데이터베이스를 조회합니다. Zimppy 거래정보 보호 세션을 사용하면 로펌의 신원과 구체적인 질의 모두 온체인에 드러나지 않아 인프라 수준에서 변호사와 의뢰인 간의 비밀을 보호합니다.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 의료 질의 파이프라인용 AI 에이전트

의료 진단 에이전트가 여러 임상 데이터베이스를 조회합니다. 거래정보 보호 결제를 사용하면 의료기관 간에 환자의 질의 패턴이 연결되지 않습니다.

### 3. 금융 분석 에이전트

알고리즘 트레이딩 에이전트가 실시간 시장 데이터 API에 비용을 지불합니다. 투명 결제는 각 챌린지마다 새로운 T 주소를 사용해 여러 데이터 공급업체에서의 사용 패턴이 서로 연관되는 것을 방지합니다.

### 4. 유료 AI 도구를 제공하는 MCP 도구 서버

MCP(Model Context Protocol) 서버가 유료 AI 도구를 제공합니다. 각 도구 호출은 Zimppy 결제를 실행해 수익화된 AI 기능의 마켓플레이스를 구현합니다.

### 5. 토큰당 과금 요약 LLM

LLM 요약 서비스가 SSE 스트리밍을 통해 출력 토큰마다 에이전트에 요금을 부과하고, 잔액을 자동으로 차감하며 사용하지 않은 선결제 잔액을 환불합니다.

---

## 설치

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

## Zimppy 지갑 설정

Zimppy CLI는 완전한 지갑 인터페이스를 제공합니다. 모든 명령은 `npx zimppy`을 통해 사용할 수 있습니다.

### 1단계 : 지갑 만들기

```bash
npx zimppy wallet create
```

암호화 키를 생성하고 **seed phrase**를 표시합니다. 안전한 곳에 보관하세요. 분실하면 복구할 수 없습니다.

### 2단계 : 주소와 잔액 확인하기

```bash
npx zimppy wallet whoami
```

**통합 주소(UA)**, **T 주소**, 현재 잔액, 활성 네트워크를 표시합니다.

```bash
npx zimppy wallet balance --all
```

모든 ZIP-32 계정의 계정별 잔액 내역을 표시합니다.

### 3단계 : 지갑에 자금 넣기

모든 Zcash 호환 지갑 또는 거래소에서 통합 주소로 ZEC를 보내세요. 거래정보 보호 입금은 Orchard 계정으로 바로 들어갑니다.

### 4단계 : 자금 보내기 및 거래정보 보호하기

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

### 5단계 : 자동 결제 요청하기

```bash
npx zimppy request <url>
```

402 -> 결제 -> 재시도 흐름 전체를 자동으로 처리합니다. 세션은 투명하게 열리고 관리됩니다.

---

## Zimppy 통합 - TypeScript SDK

### TypeScript 서버 - 거래정보 보호

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

**주요 사항:**
- `zcash({ wallet: 'server' })`이 서버의 거래정보 보호 지갑을 불러옵니다.
- `mppx.charge()`가 전체 402 챌린지 및 검증 과정을 처리합니다.
- `result.withReceipt()`가 암호학적 결제 영수증을 응답에 첨부합니다.

---

### TypeScript 서버 - 투명

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

각 챌린지는 **새 T 주소**를 생성하므로 세션 간 결제 요청을 서로 연결할 수 없습니다.

---

### TypeScript 클라이언트

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

클라이언트는 `402` 응답을 가로채 세션을 자동으로 열고 요청을 다시 보냅니다. 호출 코드에 결제 전용 로직을 추가할 필요가 없습니다.

---

## Zimppy 통합 - Rust SDK

### Rust 서버(Axum)

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

**주요 사항:**
- `MppCharge<Price>`는 핸들러가 실행되기 전에 결제를 검증하는 Axum 추출기입니다.
- `WithReceipt`는 암호학적 결제 영수증으로 응답을 감쌉니다.
- `ChargeConfig`는 가격 책정 로직을 정의하며, 요청 매개변수에 따라 동적으로 설정할 수 있습니다.

---

### Rust 클라이언트

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc);

let resp = client
    .get("https://api.example.com/resource")
    .send_with_payment(&provider)
    .await?;
```

`send_with_payment`는 모든 HTTP 클라이언트에 자동 402 처리, 세션 관리, Zcash 결제 이행 기능을 추가합니다.

---

## CLI 참조

| 명령 | 설명 |
|---|---|
| `npx zimppy wallet create` | 키 생성 및 seed phrase 표시 |
| `npx zimppy wallet whoami` | 주소(UA + T 주소), 잔액, 네트워크 표시 |
| `npx zimppy wallet balance --all` | 계정별 잔액 내역 |
| `npx zimppy wallet send <addr> <zat>` | 거래정보 보호 또는 투명 ZEC 보내기 |
| `npx zimppy wallet transfer <from> <to> <zat>` | 계정 간 내부 이체 |
| `npx zimppy wallet shield` | 투명 자금을 Orchard(거래정보 보호)로 이동 |
| `npx zimppy wallet use <name>` | 활성 지갑 ID 전환 |
| `npx zimppy request <url>` | 402 -> 결제 -> 요청 재시도 자동 처리 |

---

## 주요 기능

### 에이전트 중심 지갑

Zimppy 지갑은 사람이 관리하는 브라우저 확장 프로그램이 아니라 AI 에이전트가 프로그래밍 방식으로 사용하도록 설계되었습니다. 키는 CLI 또는 SDK를 통해 관리하며, **ZIP-32 계정 파생**으로 계정을 교체할 수 있습니다. 또한 거래마다 사람이 승인하지 않아도 완전히 자동화된 결제 흐름을 지원합니다.

### 멀티 에이전트 지원

여러 에이전트가 **ZIP-32 계정 교체**를 통해 동일한 지갑을 사용할 수 있습니다. 각 에이전트는 잔액이 분리된 자체 계정, 계정 간 이체 기능, 계정별 잔액 보고 기능을 갖습니다. 이를 통해 하나의 지갑 인프라에서 여러 에이전트를 통합 관리할 수 있습니다.

### 완전한 거래정보 보호 Zcash 거래(Orchard)

거래정보 보호 결제는 NU5에서 도입된 거래정보 보호 구역인 Zcash의 **Orchard 프로토콜**을 사용합니다. 서버는 **Incoming Viewing Key(IVK)**를 사용해 결제를 검증합니다. 이를 통해 spending key를 노출하지 않고 수신한 노트를 복호화할 수 있습니다. 각 챌린지에 고유한 `zimppy:{challenge_id}` 메모를 포함하고 암호학적으로 검증하는 **메모 바인딩**을 통해 재전송 공격을 방지합니다.

### 세션, 요청별 지연 시간 없음

세션 아키텍처는 온체인 확인 대기 시간과 요청별 지연 시간을 분리합니다. 한 번 입금한 뒤(NU7 이후 약 25초), 세션을 종료할 때까지 블록체인과 상호작용하지 않고 이후의 모든 무기명 토큰 요청을 즉시 처리합니다.

### 스트리밍, 토큰당 과금

네이티브 **SSE(Server-Sent Events)** 지원으로 토큰당 과금 콘텐츠를 제공합니다. 출력 길이가 변동하고 실제 사용량에 따라 요금을 부과해야 하는 LLM 추론 API에 적합합니다.

### 사양 준수

- **HMAC-SHA256** 서명 챌린지로 위조를 방지합니다.
- 상호 운용 가능한 오류 처리를 위해 **RFC 9457** 구조화 오류 형식을 사용합니다.
- 모든 MPP 호환 에이전트가 결제 수단을 자동으로 검색할 수 있도록 **`/.well-known/payment`**를 지원합니다.

---

## 아키텍처

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

### 구성 요소별 역할

**`zimppy-core`** - 암호화 핵심 구성 요소입니다. 서버의 IVK를 사용한 Orchard 노트 복호화, 메모 파싱, 재전송 방지 로직, 챌린지 검증을 처리합니다. 성능과 정확성을 위해 Rust로 작성되었습니다.

**`zimppy-wallet`** - `zingolib`으로 구동되는 네이티브 Zcash 지갑입니다. 키, 계정, 거래정보 보호 및 투명 잔액, 거래 제출을 관리합니다.

**`zimppy-rs`** - Rust SDK입니다. `ChargeMethod`, `SessionMethod`, `PaymentProvider` 트레이트와 서버 통합을 간편하게 하는 Axum 추출기(`MppCharge`, `WithReceipt`)를 제공합니다.

**`zimppy-napi`** - Rust 핵심을 Node.js에 노출하는 NAPI-RS 바인딩입니다. 이를 통해 TypeScript SDK는 JavaScript에서 Zcash 기본 요소를 재구현하지 않고 동일한 암호화 엔진을 사용할 수 있습니다.

**`zimppy-ts`** - TypeScript SDK입니다. NAPI 바인딩을 감싸 단건 결제, 세션, SSE 스트리밍 흐름에 관용적인 async/await API를 제공합니다.

**`zimppy-cli`** - 명령줄 지갑 및 요청 도구입니다. 자동 결제(402 -> 결제 -> 재시도), 세션 관리, 모든 지갑 작업을 지원합니다.

---

## 예시 및 데모

| 예시 | 설명 |
|---|---|
| `examples/fortune-teller/` | 단건 결제, 세션, 스트리밍 데모 - Rust 서버 + 클라이언트 |
| `examples/llm-summarizer/` | 토큰당 과금 LLM 스트리밍 데모 |
| `examples/mcp-server/` | 유료 AI 도구를 제공하는 MCP 도구 서버 |
| `examples/ts-server/` | TypeScript MPP 서버 참조 구현 |

---

## 포함된 기능 요약

| 기능 | 설명 |
|---|---|
| **세션** | 한 번 입금, 즉시 무기명 요청, 종료 시 환불 |
| **스트리밍** | SSE를 통한 토큰당 과금 콘텐츠 |
| **단건 결제** | HTTP 요청마다 거래정보 보호 또는 투명 결제(402 흐름) |
| **투명 결제** | 챌린지별 재전송 방지 및 shield 명령을 지원하는 T 주소 |
| **멀티 계정** | ZIP-32 계정 교체, 계정 간 이체, 계정별 잔액 |
| **CLI 지갑** | 보내기, 거래정보 보호, 이체, balance --all, whoami, 자동 결제 |
| **듀얼 SDK** | TypeScript 및 Rust |
| **사양 준수** | HMAC-SHA256 챌린지, RFC 9457 오류, `/.well-known/payment` 검색 |

---

*자세한 내용은 [zimppy.xyz](https://zimppy.xyz)에서 확인하세요.*

---

## 관련 페이지

- [지갑](/using-zcash/wallets) — 거래정보 보호 거래를 지원하는 Zcash 지갑
- [거래정보 보호 구역](/using-zcash/shielded-pools) — Orchard 거래정보 보호 거래가 결제 정보를 보호하는 방식
- [결제 지원 서비스](/using-zcash/payment-processors) — Zcash 결제를 수락하는 다른 방법
- [Zcash 거래정보 보호 자산](/zcash-tech/zcash-shielded-assets) — ZSA와 Zcash 프로그래밍 기능의 미래
- [커뮤니티 프로젝트](/zcash-community/community-projects) — 더 많은 Zcash 생태계 프로젝트
