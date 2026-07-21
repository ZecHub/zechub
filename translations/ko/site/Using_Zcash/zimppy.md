<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy**는 Zcash의 Machine Payment Protocol (MPP)을 사용하는 AI 에이전트를 위한 프라이버시 우선 결제 인프라입니다
- 온체인에서 **한 번만 예치**하면(~75초), 요청마다 블록체인 상호작용 없이 **무제한 즉시 요청**을 보낼 수 있습니다
- **완전한 실드형 Zcash (Orchard)** 결제를 지원합니다 — 발신자, 수신자, 금액, 메모가 모두 암호화됩니다
- AI 파이프라인과 API 서버에 쉽게 통합할 수 있도록 **TypeScript 및 Rust SDK**를 제공합니다
- **LLM API, 데이터 마켓플레이스, MCP 도구 서버** 및 모든 M2M 결제 사용 사례에 이상적입니다

---

> **Zimppy**는 실드형 결제와 투명 결제를 모두 지원하는 Zcash용 Machine Payment Protocol (MPP) 결제 방식입니다. 온체인에서 한 번 예치한 뒤, 요청마다 체인 상호작용 없이 무제한의 즉시 bearer 요청을 보낼 수 있습니다.

---

## 목차

1. [Zimppy.xyz란 무엇인가요?](#what-is-zimppyxyz)
2. [왜 AI 에이전트에 실드형 결제가 필요한가요?](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy 작동 방식](#how-zimppy-works)
   - [세션 (권장)](#sessions-recommended)
   - [스트리밍](#streaming)
   - [청구](#charge)
5. [사용 사례 및 예시](#use-cases--examples)
6. [설치](#installation)
7. [Zimppy 지갑 설정하기](#setting-up-the-zimppy-wallet)
8. [Zimppy 통합하기](#integrating-zimppy--typescript-sdk)
   - [서버 (실드형)](#typescript-server--shielded)
   - [서버 (투명)](#typescript-server--transparent)
   - [클라이언트](#typescript-client)
9. [Zimppy 통합 - Rust SDK](#integrating-zimppy--rust-sdk)
   - [서버 (Axum)](#rust-server-axum)
   - [클라이언트](#rust-client)
10. [CLI 참조](#cli-reference)
11. [주요 기능](#key-features)
12. [아키텍처](#architecture)
13. [예제 및 데모](#examples--demos)

---

## Zimppy.xyz란 무엇인가요?

**Zimppy.xyz**는 AI 에이전트와 자동화된 머신 간(M2M) 워크플로를 위해 특별히 설계된 프라이버시 우선 결제 인프라입니다. **Zcash**를 기본 통화로 사용하는 **Machine Payment Protocol (MPP)**를 구현하여, 실드형(완전 비공개) 및 투명 결제 모드를 모두 지원합니다.

모든 거래가 온체인에 공개적으로 드러나는 기존 블록체인 결제 시스템과 달리, Zimppy는 요청별 지연을 제거하면서도 암호학적 프라이버시를 유지하는 세션 기반 아키텍처를 중심으로 설계되었습니다. 따라서 API, 데이터, 컴퓨팅 자원 또는 AI 도구에 대해 행동 메타데이터를 노출하지 않고도 프로그래밍 방식으로 비용을 지불해야 하는 AI 에이전트에 특히 적합합니다.

### 핵심 속성

- 온체인에서 **한 번만 예치** (~75초의 Zcash 확인 시간)
- 세션 개설 후 **무제한 즉시 요청**, 요청별 체인 상호작용 없음
- **실드형 결제**는 Zcash의 Orchard 프로토콜을 사용해 발신자, 수신자, 금액, 메모를 암호화합니다
- **투명 결제**는 완전한 프라이버시 없이도 재전송 공격 방지를 위해 챌린지별 T-address를 사용합니다
- **사양 준수**, HMAC-SHA256 챌린지, RFC 9457 오류, `/.well-known/payment` 탐색 지원

---

## 왜 AI 에이전트에 실드형 결제가 필요한가요?

민감한 워크플로, 법률 조사, 의료 질의, 금융 분석, 경쟁 정보 분석을 처리하는 AI 에이전트에게 **모든 공개 결제는 메타데이터 유출**입니다. Zimppy는 기본적으로 프라이버시를 제공하는 유일한 MPP 결제 방식입니다.

### 프라이버시 비교 표

| Property | Public Chains (USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **발신자** | 공개됨 | 암호화됨 | 공개됨 |
| **수신자** | 공개됨 | 암호화됨 | 챌린지별 (연결 불가) |
| **금액** | 공개됨 | 암호화됨 | 공개됨 |
| **메모** | 공개됨 | 암호화됨 | 해당 없음 |
| **재전송 공격 방지** | 없음 | 메모 바인딩 | 챌린지별 T-address |
| **서비스 사용 패턴** | 연결 가능 | 비공개 | 연결 불가 (새 주소) |

### 세션이 해결하는 지연 문제

> *"하지만 Zcash는 블록 시간이 75초잖아요."*

**세션이 이 문제를 해결합니다.** 온체인 대기는 예치 시 **단 한 번만** 발생합니다. 그 이후의 모든 요청은 즉시 처리됩니다.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**한 번 지불하고, 즉시 호출하고, 남은 잔액은 돌려받으세요.** 요청당 지연 시간은 0입니다.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)**는 자율 소프트웨어 에이전트(AI 에이전트, 봇, 스크립트)가 사람의 개입 없이 API 접근을 위한 결제 요구 사항을 발견하고, 협상하고, 이행할 수 있도록 해주는 표준화된 프로토콜입니다.

### MPP가 API와 통합되는 방식

MPP는 HTTP **402 Payment Required** 흐름을 따릅니다:

1. **에이전트가 요청**을 유료 API 엔드포인트의 리소스에 보냅니다.
2. **서버가 응답**으로 `402 Payment Required`와 서명된 챌린지(금액, 수신자, 메모)를 반환합니다.
3. **에이전트가 결제**를 수행합니다(예: Zimppy 실드형 Zcash).
4. **에이전트가 재시도** 요청을 `Authorization: Payment {txid}`와 함께 보냅니다.
5. **서버가 검증**을 수행합니다(Orchard IVK 복호화, 금액 + 메모 확인).
6. **서버가 응답**으로 `200 OK`와 `Payment-Receipt` 헤더를 반환합니다.

### 사양 준수

- **HMAC-SHA256** 챌린지 서명
- **RFC 9457** 구조화된 오류 응답
- 자동 결제 방식 탐색을 위한 **`/.well-known/payment`** 엔드포인트
- 지출 키를 노출하지 않고 서버 측 결제 검증을 가능하게 하는 **Orchard IVK** (Incoming Viewing Key)

---

## Zimppy 작동 방식

### 세션 (권장)

세션은 기본 상호작용 패턴입니다. 에이전트는 온체인에서 한 번 잔액을 예치하고, bearer 토큰을 받은 뒤, 이후 모든 요청에 대해 지연 없이 이를 사용합니다.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**가장 적합한 경우:** 고빈도 API 호출, LLM 추론, 반복적인 데이터 질의.

---

### 스트리밍

**Server-Sent Events (SSE)**를 통해 전달되는 토큰당 과금형 콘텐츠입니다. 서버는 스트리밍되는 단어 또는 토큰마다 세션 잔액에서 차감합니다.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**가장 적합한 경우:** LLM 스트리밍 응답, 실시간 데이터 피드, 토큰당 과금 AI 도구.

---

### 청구

요청마다 하나의 실드형 결제를 수행합니다. 전체 HTTP 402 흐름이 호출마다 실행됩니다. 요청 빈도가 낮거나 고가치인 경우에 적합합니다.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**가장 적합한 경우:** 고가치 일회성 요청, 드문 API 호출, 프리미엄 데이터 엔드포인트.

---

## 사용 사례 및 예시

### 1. AI 에이전트

한 법률 AI 에이전트가 유료 판례 데이터베이스를 조회합니다. Zimppy 실드형 세션을 사용하면 로펌의 신원도, 구체적인 질의 내용도 온체인에 드러나지 않아 인프라 수준에서 변호사-의뢰인 비밀이 보호됩니다.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 의료 질의 파이프라인용 AI 에이전트

의료 진단 에이전트가 여러 임상 데이터베이스를 조회합니다. 실드형 결제를 사용하면 환자 질의 패턴이 제공업체 간에 연결되지 않도록 할 수 있습니다.

### 3. 금융 분석 에이전트

알고리즘 트레이딩 에이전트가 실시간 시장 데이터 API에 비용을 지불합니다. 투명 결제는 챌린지마다 새로운 T-address를 사용해 데이터 공급업체 간 사용 패턴 상관관계를 방지합니다.

### 4. MCP 도구 서버, 유료 AI 도구

MCP (Model Context Protocol) 서버가 유료 AI 도구를 제공합니다. 각 도구 호출은 Zimppy 청구를 발생시켜 수익화된 AI 기능 마켓플레이스를 가능하게 합니다.

### 5. LLM 요약기, 토큰당 과금

LLM 요약 서비스는 SSE 스트리밍을 통해 출력 토큰당 에이전트에게 과금하며, 사용되지 않은 선불 잔액은 자동으로 차감 후 환불됩니다.

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

## Zimppy 지갑 설정하기

Zimppy CLI는 완전한 지갑 인터페이스를 제공합니다. 모든 명령은 `npx zimppy`를 통해 사용할 수 있습니다.

### 1단계 : 지갑 만들기

```bash
npx zimppy wallet create
```

암호학적 키를 생성하고 **시드 문구**를 표시합니다. 분실 시 복구할 수 없으므로 안전하게 보관하세요.

### 2단계 : 주소와 잔액 확인하기

```bash
npx zimppy wallet whoami
```

**Unified Address (UA)**, **T-address**, 현재 잔액, 활성 네트워크를 표시합니다.

```bash
npx zimppy wallet balance --all
```

모든 ZIP-32 계정에 대한 계정별 잔액 내역을 보여줍니다.

### 3단계 : 지갑에 자금 넣기

Zcash 호환 지갑 또는 거래소에서 자신의 Unified Address로 ZEC를 보내세요. 실드형 예치는 Orchard 계정으로 직접 들어갑니다.

### 4단계 : 자금 보내기 및 실드 처리

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

### 5단계 : 자동 결제 요청 보내기

```bash
npx zimppy request <url>
```

전체 402 -> pay -> retry 흐름을 자동으로 처리합니다. 세션은 투명하게 개설되고 관리됩니다.

---

## Zimppy 통합하기 - TypeScript SDK

### TypeScript 서버 - 실드형

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

**핵심 포인트:**
- `zcash({ wallet: 'server' })`는 서버의 실드형 지갑을 로드합니다
- `mppx.charge()`는 전체 402 챌린지/검증 수명주기를 처리합니다
- `result.withReceipt()`는 응답에 암호학적 결제 영수증을 첨부합니다

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

각 챌린지는 **새로운 T-address**를 생성하므로 세션 간 결제 요청을 연결할 수 없게 됩니다.

---

### TypeScript 클라이언트

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

클라이언트는 `402` 응답을 가로채고, 자동으로 세션을 개설한 뒤, 요청을 재시도합니다 - 호출하는 코드에는 결제 관련 로직이 필요하지 않습니다.

---

## Zimppy 통합하기 - Rust SDK

### Rust 서버 (Axum)

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

**핵심 포인트:**
- `MppCharge<Price>`는 핸들러가 실행되기 전에 결제를 검증하는 Axum extractor입니다
- `WithReceipt`는 응답을 암호학적 결제 영수증과 함께 감쌉니다
- `ChargeConfig`는 가격 로직을 정의하며, 요청 매개변수에 따라 동적으로 설정할 수 있습니다

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

`send_with_payment`는 모든 HTTP 클라이언트에 자동 402 처리, 세션 관리, Zcash 결제 수행 기능을 추가합니다.

---

## CLI 참조

| Command | Description |
|---|---|
| `npx zimppy wallet create` | 키를 생성하고 시드 문구를 표시 |
| `npx zimppy wallet whoami` | 주소(UA + T-addr), 잔액, 네트워크 표시 |
| `npx zimppy wallet balance --all` | 계정별 잔액 내역 |
| `npx zimppy wallet send <addr> <zat>` | 실드형 또는 투명 ZEC 전송 |
| `npx zimppy wallet transfer <from> <to> <zat>` | 계정 간 내부 전송 |
| `npx zimppy wallet shield` | 투명 자금을 Orchard(실드형)로 이동 |
| `npx zimppy wallet use <name>` | 활성 지갑 신원 전환 |
| `npx zimppy request <url>` | 자동 402 -> pay -> retry 요청 |

---

## 주요 기능

### 에이전트 네이티브 지갑

Zimppy 지갑은 사람이 관리하는 브라우저 확장 프로그램이 아니라 AI 에이전트의 프로그래밍 사용을 위해 설계되었습니다. 키는 CLI 또는 SDK를 통해 관리되며, 계정은 **ZIP-32 account derivation**을 통해 순환할 수 있고, 지갑은 거래마다 사람의 승인을 필요로 하지 않는 완전 자동화 결제 흐름을 지원합니다.

### 멀티 에이전트 지원

여러 에이전트가 같은 지갑에서 **ZIP-32 account rotation**을 사용해 동작할 수 있습니다 - 각 에이전트는 격리된 잔액 추적, 계정 간 전송 기능, 계정별 잔액 보고를 갖춘 자체 계정을 가집니다. 이를 통해 단일 지갑 인프라에서 다수의 에이전트 플릿을 관리할 수 있습니다.

### 완전한 실드형 Zcash 거래 (Orchard)

실드형 결제는 Zcash의 **Orchard 프로토콜**을 사용합니다 - 가장 최신이며 가장 안전한 실드형 풀입니다. 서버는 **Incoming Viewing Key (IVK)**를 사용해 결제를 검증하며, 이를 통해 지출 키를 노출하지 않고도 수신된 노트를 복호화할 수 있습니다. 재전송 공격은 **memo binding**으로 방지됩니다 - 각 챌린지에는 암호학적으로 검증되는 고유한 `zimppy:{challenge_id}` 메모가 포함됩니다.

### 세션 , 요청별 지연 시간 0

세션 아키텍처는 온체인 확인 대기 시간을 요청별 지연 시간과 분리합니다. 한 번 예치하면(~75초), 세션 종료 시까지 그 이후의 모든 bearer 토큰 요청은 블록체인 상호작용 없이 즉시 처리됩니다.

### 스트리밍 , 토큰당 과금

네이티브 **SSE (Server-Sent Events)** 지원을 통해 토큰당 계량 과금 콘텐츠를 제공합니다. 출력 길이가 가변적이고 실제 사용량을 기준으로 과금해야 하는 LLM 추론 API에 이상적입니다.

### 사양 준수

- **HMAC-SHA256** 서명 챌린지는 위조를 방지합니다
- 상호운용 가능한 오류 처리를 위한 **RFC 9457** 구조화 오류 형식
- 모든 MPP 호환 에이전트가 자동으로 결제 방식을 발견할 수 있도록 하는 **`/.well-known/payment`**

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

**`zimppy-core`** - 암호학적 핵심입니다. 서버의 IVK를 사용한 Orchard 노트 복호화, 메모 파싱, 재전송 공격 방지 로직, 챌린지 검증을 처리합니다. 성능과 정확성을 위해 Rust로 작성되었습니다.

**`zimppy-wallet`** - `zingolib` 기반의 네이티브 Zcash 지갑입니다. 키, 계정, 실드형/투명 잔액, 거래 제출을 관리합니다.

**`zimppy-rs`** - Rust SDK입니다. `ChargeMethod`, `SessionMethod`, `PaymentProvider` 트레이트와 함께, 서버 통합을 편리하게 해주는 Axum extractor (`MppCharge`, `WithReceipt`)를 제공합니다.

**`zimppy-napi`** - Rust 코어를 Node.js에 노출하는 NAPI-RS 바인딩입니다. 이를 통해 TypeScript SDK는 JavaScript에서 Zcash 기본 요소를 재구현하지 않고도 동일한 암호학 엔진을 사용할 수 있습니다.

**`zimppy-ts`** - TypeScript SDK입니다. NAPI 바인딩을 charge, session, SSE 스트리밍 흐름을 위한 관용적인 async/await API로 감쌉니다.

**`zimppy-cli`** - 명령줄 지갑 및 요청 도구입니다. 자동 결제(402 -> pay -> retry), 세션 관리, 모든 지갑 작업을 지원합니다.

---

## 예제 및 데모

| Example | Description |
|---|---|
| `examples/fortune-teller/` | Charge, session, 스트리밍 데모 - Rust 서버 + 클라이언트 |
| `examples/llm-summarizer/` | 토큰당 과금 LLM 스트리밍 데모 |
| `examples/mcp-server/` | 유료 AI 도구가 포함된 MCP 도구 서버 |
| `examples/ts-server/` | TypeScript MPP 서버 참조 구현 |

---

## 포함된 기능 - 기능 요약

| Feature | Description |
|---|---|
| **세션** | 한 번 예치, 즉시 bearer 요청, 종료 시 환불 |
| **스트리밍** | SSE를 통한 토큰당 계량 과금 콘텐츠 |
| **청구** | HTTP 요청당 실드형 또는 투명 결제 (402 흐름) |
| **투명 결제** | 챌린지별 재전송 방지 기능이 있는 T-address + shield 명령 |
| **멀티 계정** | ZIP-32 account rotation, 계정 간 전송, 계정별 잔액 |
| **CLI 지갑** | send, shield, transfer, balance --all, whoami, auto-pay |
| **듀얼 SDK** | TypeScript 및 Rust |
| **사양 준수** | HMAC-SHA256 챌린지, RFC 9457 오류, `/.well-known/payment` 탐색 |

---

*더 자세한 정보는 [zimppy.xyz](https://zimppy.xyz)에서 확인하세요*

---

## 관련 페이지

- [지갑](/using-zcash/wallets) — 실드형 거래를 지원하는 Zcash 지갑
- [실드형 풀](/using-zcash/shielded-pools) — Orchard 실드형 거래가 결제 데이터를 보호하는 방식
- [결제 처리자](/using-zcash/payment-processors) — Zcash 결제를 수락하는 다른 방법
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs와 Zcash 프로그래밍 가능성의 미래
- [커뮤니티 프로젝트](/zcash-community/community-projects) — 더 많은 Zcash 생태계 프로젝트
