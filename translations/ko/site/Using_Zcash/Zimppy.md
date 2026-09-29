<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy**는 Zcash의 Machine Payment Protocol (MPP)을 사용하는 AI 에이전트용 프라이버시 우선 결제 인프라입니다
- 온체인에서 **한 번만 예치**하고(~75초), 요청별 블록체인 상호작용 없이 **무제한 즉시 요청**을 수행할 수 있습니다
- 완전한 **shielded Zcash (Orchard)** 결제를 지원합니다 — 발신자, 수신자, 금액, 메모가 모두 암호화됩니다
- AI 파이프라인 및 API 서버에 쉽게 통합할 수 있도록 **TypeScript 및 Rust SDK**를 제공합니다
- **LLM API, 데이터 마켓플레이스, MCP 도구 서버** 및 모든 M2M 결제 사용 사례에 적합합니다

---

> **Zimppy**는 shielded 및 transparent 결제를 모두 지원하는 Zcash용 Machine Payment Protocol (MPP) 결제 수단입니다. 온체인에서 한 번 예치한 후, 요청별 체인 상호작용 없이 무제한 즉시 bearer 요청을 수행할 수 있습니다.

---

## 목차

1. [Zimppy.xyz란 무엇인가요?](#what-is-zimppyxyz)
2. [AI 에이전트에 shielded 결제가 필요한 이유](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy 작동 방식](#how-zimppy-works)
   - [세션(권장)](#sessions-recommended)
   - [스트리밍](#streaming)
   - [청구](#charge)
5. [사용 사례 및 예시](#use-cases--examples)
6. [설치](#installation)
7. [Zimppy 지갑 설정](#setting-up-the-zimppy-wallet)
8. [Zimppy 통합](#integrating-zimppy--typescript-sdk)
   - [서버 (Shielded)](#typescript-server--shielded)
   - [서버 (Transparent)](#typescript-server--transparent)
   - [클라이언트](#typescript-client)
9. [Zimppy 통합 - Rust SDK](#integrating-zimppy--rust-sdk)
   - [서버 (Axum)](#rust-server-axum)
   - [클라이언트](#rust-client)
10. [CLI 참조](#cli-reference)
11. [주요 기능](#key-features)
12. [아키텍처](#architecture)
13. [예시 및 데모](#examples--demos)

---

## Zimppy.xyz란 무엇인가요?

**Zimppy.xyz**는 AI 에이전트와 자동화된 머신 투 머신(M2M) 워크플로를 위해 특별히 설계된 프라이버시 우선 결제 인프라입니다. 기본 통화로 **Zcash**를 사용하여 **Machine Payment Protocol (MPP)**을 구현하며, shielded(완전 비공개) 및 transparent 결제 모드를 모두 지원합니다.

모든 거래가 온체인에 공개적으로 표시되는 기존 블록체인 결제 시스템과 달리, Zimppy는 암호학적 프라이버시를 유지하면서 요청별 지연 시간을 제거하는 세션 기반 아키텍처를 중심으로 설계되었습니다. 따라서 행동 메타데이터를 노출하지 않고 API, 데이터, 컴퓨팅 또는 AI 도구 비용을 프로그래밍 방식으로 결제해야 하는 AI 에이전트에 특히 적합합니다.

### 핵심 특성

- 온체인에서 **한 번만 예치**(Zcash 확인에 약 75초)
- 세션 개설 후 **무제한 즉시 요청**, 요청별 체인 상호작용 없음
- **Shielded 결제**는 Zcash의 Orchard 프로토콜을 사용하여 발신자, 수신자, 금액 및 메모를 암호화합니다
- **Transparent 결제**는 완전한 프라이버시 없이 재생 공격을 방지하기 위해 챌린지별 T-address를 사용합니다
- **사양 준수**, HMAC-SHA256 챌린지, RFC 9457 오류, `/.well-known/payment` 검색

---

## AI 에이전트에 Shielded 결제가 필요한 이유

민감한 워크플로, 법률 조사, 의료 질의, 금융 분석, 경쟁 정보 분석을 처리하는 AI 에이전트의 경우 **모든 공개 결제는 메타데이터 유출**입니다. Zimppy는 **기본적으로 비공개**인 유일한 MPP 결제 수단입니다.

### 프라이버시 비교 표

| 특성 | 공개 체인(USDC, ETH) | Zimppy Shielded | Zimppy Transparent |
|---|---|---|---|
| **발신자** | 공개 | 암호화됨 | 공개 |
| **수신자** | 공개 | 암호화됨 | 챌린지별(연결 불가) |
| **금액** | 공개 | 암호화됨 | 공개 |
| **메모** | 공개 | 암호화됨 | 해당 없음 |
| **재생 공격 방지** | 없음 | 메모 바인딩 | 챌린지별 T-address |
| **서비스 이용 패턴** | 연결 가능 | 비공개 | 연결 불가(새 주소) |

### 세션으로 해결한 지연 시간 문제

> *"하지만 Zcash의 블록 시간은 75초입니다."*

**세션이 이를 해결합니다.** 온체인 대기는 예치 시 정확히 **한 번만** 발생합니다. 이후의 모든 요청은 즉시 처리됩니다.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**한 번 결제하고, 즉시 호출하며, 거스름돈을 돌려받으세요.** 요청별 지연 시간은 0입니다.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)**은 자율 소프트웨어 에이전트(AI 에이전트, 봇, 스크립트)가 사람의 개입 없이 API 접근에 필요한 결제 요건을 검색, 협상 및 이행할 수 있게 하는 표준화된 프로토콜입니다.

### MPP가 API와 통합되는 방식

MPP는 HTTP **402 Payment Required** 흐름을 따릅니다.

1. **에이전트가 요청합니다**: 유료 API 엔드포인트의 리소스를 요청합니다.
2. **서버가 응답합니다**: `402 Payment Required`와 서명된 챌린지(금액, 수신자, 메모)를 반환합니다.
3. **에이전트가 결제합니다**: 호환되는 결제 수단(예: Zimppy shielded Zcash)을 사용합니다.
4. **에이전트가 재시도합니다**: `Authorization: Payment {txid}`와 함께 요청을 다시 보냅니다.
5. **서버가 검증합니다**: 결제를 암호학적으로 검증합니다(Orchard IVK 복호화, 금액 및 메모 확인).
6. **서버가 응답합니다**: `200 OK`와 `Payment-Receipt` 헤더를 반환합니다.

### 사양 준수

- **HMAC-SHA256** 챌린지 서명
- **RFC 9457** 구조화된 오류 응답
- 자동 결제 수단 검색을 위한 **`/.well-known/payment`** 엔드포인트
- 지출 키를 노출하지 않고 서버 측 결제를 검증하기 위한 **Orchard IVK** (Incoming Viewing Key)

---

## Zimppy 작동 방식

### 세션(권장)

세션은 주요 상호작용 방식입니다. 에이전트는 온체인에 잔액을 한 번 예치하고 bearer 토큰을 받은 뒤, 이후 모든 요청에 지연 시간 없이 이를 사용합니다.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**적합한 용도:** 고빈도 API 호출, LLM 추론, 반복적인 데이터 질의.

---

### 스트리밍

**Server-Sent Events (SSE)**를 통해 제공되는 토큰당 과금 콘텐츠입니다. 서버는 스트리밍되는 단어 또는 토큰별로 세션 잔액을 차감합니다.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**적합한 용도:** LLM 스트리밍 응답, 실시간 데이터 피드, 토큰당 과금 AI 도구.

---

### 청구

요청당 단일 shielded 결제입니다. 전체 HTTP 402 흐름이 호출마다 실행됩니다. 요청이 드물거나 고가치인 경우에 적합합니다.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**적합한 용도:** 고가치 일회성 요청, 드문 API 호출, 프리미엄 데이터 엔드포인트.

---

## 사용 사례 및 예시

### 1. AI 에이전트

법률 AI 에이전트가 유료 판례 데이터베이스를 조회합니다. Zimppy shielded 세션을 사용하면 로펌의 신원이나 구체적인 질의가 온체인에 노출되지 않아 인프라 수준에서 변호사-의뢰인 특권을 보호합니다.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 의료 질의 파이프라인용 AI 에이전트

의료 진단 에이전트가 여러 임상 데이터베이스를 조회합니다. Shielded 결제는 환자 질의 패턴이 제공업체 간에 연결되지 않도록 보장합니다.

### 3. 금융 분석 에이전트

알고리즘 트레이딩 에이전트가 실시간 시장 데이터 API 비용을 결제합니다. Transparent 결제는 챌린지마다 새로운 T-address를 사용하여 데이터 공급업체 간 이용 패턴의 상관관계를 방지합니다.

### 4. MCP 도구 서버, 유료 AI 도구

MCP(Model Context Protocol) 서버가 유료 AI 도구를 제공합니다. 각 도구 호출은 Zimppy 청구를 유발하여 수익화된 AI 기능의 마켓플레이스를 지원합니다.

### 5. LLM 요약기, 토큰당 결제

LLM 요약 서비스가 SSE 스트리밍을 통해 출력 토큰당 에이전트에 과금하며, 자동 잔액 차감과 사용하지 않은 선불 잔액 환불을 제공합니다.

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

Zimppy CLI는 완전한 지갑 인터페이스를 제공합니다. 모든 명령은 `npx zimppy`를 통해 사용할 수 있습니다.

### 1단계 : 지갑 만들기

```bash
npx zimppy wallet create
```

암호학적 키를 생성하고 **시드 문구**를 표시합니다. 분실하면 복구할 수 없으므로 안전하게 보관하세요.

### 2단계 : 주소 및 잔액 확인

```bash
npx zimppy wallet whoami
```

**Unified Address (UA)**, **T-address**, 현재 잔액 및 활성 네트워크를 표시합니다.

```bash
npx zimppy wallet balance --all
```

모든 ZIP-32 계정의 계정별 잔액 내역을 표시합니다.

### 3단계 : 지갑에 자금 충전

Zcash 호환 지갑 또는 거래소에서 Unified Address로 ZEC를 전송하세요. Shielded 예치는 Orchard 계정으로 직접 전송됩니다.

### 4단계 : 자금 전송 및 Shield

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

### 5단계 : 자동 결제 요청 수행

```bash
npx zimppy request <url>
```

전체 402 -> pay -> retry 흐름을 자동으로 처리합니다. 세션은 투명하게 열리고 관리됩니다.

---

## Zimppy 통합 - TypeScript SDK

### TypeScript 서버 - Shielded

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

**핵심 사항:**
- `zcash({ wallet: 'server' })`는 서버의 shielded 지갑을 불러옵니다
- `mppx.charge()`는 전체 402 챌린지/검증 수명 주기를 처리합니다
- `result.withReceipt()`는 응답에 암호학적 결제 영수증을 첨부합니다

---

### TypeScript 서버 - Transparent

```typescript
import { Mppx } from 'mppx/server'
import { zcashTransparent } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcashTransparent({ wallet: 'server' })],
  // per-challenge T-address generated automatically (replay-safe)
})
```

각 챌린지는 **새로운 T-address**를 생성하므로, 세션 간 결제 요청을 연결할 수 없습니다.

---

### TypeScript 클라이언트

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

클라이언트는 `402` 응답을 가로채 세션을 자동으로 열고 요청을 재시도합니다. 호출 코드에는 결제 전용 로직이 필요하지 않습니다.

---

## Zimppy 통합 - Rust SDK

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

**핵심 사항:**
- `MppCharge<Price>`는 핸들러가 실행되기 전에 결제를 검증하는 Axum 추출기입니다
- `WithReceipt`는 암호학적 결제 영수증으로 응답을 감쌉니다
- `ChargeConfig`는 가격 책정 로직을 정의하며, 요청 매개변수를 기준으로 동적일 수 있습니다

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

`send_with_payment`는 자동 402 처리, 세션 관리 및 Zcash 결제 이행 기능으로 모든 HTTP 클라이언트를 확장합니다.

---

## CLI 참조

| 명령 | 설명 |
|---|---|
| `npx zimppy wallet create` | 키 생성 및 시드 문구 표시 |
| `npx zimppy wallet whoami` | 주소(UA + T-addr), 잔액, 네트워크 표시 |
| `npx zimppy wallet balance --all` | 계정별 잔액 내역 |
| `npx zimppy wallet send <addr> <zat>` | Shielded 또는 transparent ZEC 전송 |
| `npx zimppy wallet transfer <from> <to> <zat>` | 계정 간 내부 전송 |
| `npx zimppy wallet shield` | Transparent 자금을 Orchard로 이동(shielded) |
| `npx zimppy wallet use <name>` | 활성 지갑 ID 전환 |
| `npx zimppy request <url>` | 요청 자동 402 -> pay -> retry |

---

## 주요 기능

### 에이전트 네이티브 지갑

Zimppy 지갑은 사람이 관리하는 브라우저 확장이 아닌 AI 에이전트의 프로그래밍 방식 사용을 위해 설계되었습니다. 키는 CLI 또는 SDK를 통해 관리되고, 계정은 **ZIP-32 account derivation**으로 순환할 수 있으며, 지갑은 거래마다 사람의 승인 없이 완전 자동화된 결제 흐름을 지원합니다.

### 멀티 에이전트 지원

여러 에이전트가 **ZIP-32 account rotation**을 사용해 동일한 지갑에서 작동할 수 있습니다. 각 에이전트는 분리된 잔액 추적, 계정 간 전송 기능 및 계정별 잔액 보고를 갖춘 자체 계정을 받습니다. 이를 통해 단일 지갑 인프라에서 다수의 에이전트 플릿을 관리할 수 있습니다.

### 완전한 Shielded Zcash 거래 (Orchard)

Shielded 결제는 최신의 가장 안전한 shielded 풀인 Zcash의 **Orchard protocol**을 사용합니다. 서버는 지출 키를 노출하지 않고 수신한 노트를 복호화할 수 있는 **Incoming Viewing Key (IVK)**를 사용하여 결제를 검증합니다. 재생 공격은 **memo binding**으로 방지됩니다. 각 챌린지는 암호학적으로 검증되는 고유한 `zimppy:{challenge_id}` 메모를 포함합니다.

### 세션 , 요청별 지연 시간 0

세션 아키텍처는 온체인 확인 대기와 요청별 지연 시간을 분리합니다. 한 번의 예치(~75초) 후에는 세션 종료 전까지 블록체인 상호작용 없이 이후의 모든 bearer 토큰 요청이 즉시 처리됩니다.

### 스트리밍 , 토큰당 결제

네이티브 **SSE (Server-Sent Events)** 지원은 토큰당 과금 콘텐츠를 가능하게 합니다. 출력 길이가 가변적이고 과금이 실제 사용량을 반영해야 하는 LLM 추론 API에 이상적입니다.

### 사양 준수

- **HMAC-SHA256** 서명 챌린지는 위조를 방지합니다
- 상호운용 가능한 오류 처리를 위한 **RFC 9457** 구조화된 오류 형식
- MPP 호환 에이전트의 자동 결제 수단 검색을 위한 **`/.well-known/payment`**

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

### 컴포넌트별 책임

**`zimppy-core`** - 암호학적 코어입니다. 서버 IVK를 사용한 Orchard 노트 복호화, 메모 파싱, 재생 공격 방지 로직 및 챌린지 검증을 처리합니다. 성능과 정확성을 위해 Rust로 작성되었습니다.

**`zimppy-wallet`** - `zingolib` 기반의 네이티브 Zcash 지갑입니다. 키, 계정, shielded/transparent 잔액 및 거래 제출을 관리합니다.

**`zimppy-rs`** - Rust SDK입니다. 인체공학적인 서버 통합을 위해 `ChargeMethod`, `SessionMethod`, `PaymentProvider` 트레이트와 Axum 추출기(`MppCharge`, `WithReceipt`)를 제공합니다.

**`zimppy-napi`** - Rust 코어를 Node.js에 노출하는 NAPI-RS 바인딩으로, TypeScript SDK가 JavaScript에서 Zcash 프리미티브를 다시 구현하지 않고도 동일한 암호학 엔진을 사용할 수 있게 합니다.

**`zimppy-ts`** - TypeScript SDK입니다. 청구, 세션 및 SSE 스트리밍 흐름을 위한 관용적인 async/await API로 NAPI 바인딩을 감쌉니다.

**`zimppy-cli`** - 명령줄 지갑 및 요청 도구입니다. 자동 결제(402 -> pay -> retry), 세션 관리 및 모든 지갑 작업을 지원합니다.

---

## 예시 및 데모

| 예시 | 설명 |
|---|---|
| `examples/fortune-teller/` | 청구, 세션 및 스트리밍 데모 - Rust 서버 + 클라이언트 |
| `examples/llm-summarizer/` | 토큰당 결제 LLM 스트리밍 데모 |
| `examples/mcp-server/` | 유료 AI 도구를 갖춘 MCP 도구 서버 |
| `examples/ts-server/` | TypeScript MPP 서버 참조 구현 |

---

## 포함 기능 - 기능 요약

| 기능 | 설명 |
|---|---|
| **세션** | 한 번 예치, 즉시 bearer 요청, 종료 시 환불 |
| **스트리밍** | SSE를 통한 토큰당 과금 콘텐츠 |
| **청구** | HTTP 요청당 shielded 또는 transparent 결제(402 흐름) |
| **Transparent 결제** | 챌린지별 재생 공격 방지 기능을 갖춘 T-address 및 shield 명령 |
| **다중 계정** | ZIP-32 계정 순환, 계정 간 전송, 계정별 잔액 |
| **CLI 지갑** | 전송, shield, transfer, balance --all, whoami, 자동 결제 |
| **이중 SDK** | TypeScript 및 Rust |
| **사양 준수** | HMAC-SHA256 챌린지, RFC 9457 오류, `/.well-known/payment` 검색 |

---

*자세한 내용은 [zimppy.xyz](https://zimppy.xyz)를 방문하세요*

---

## 관련 페이지

- [지갑](/using-zcash/wallets) — Shielded 거래를 지원하는 Zcash 지갑
- [Shielded 풀](/using-zcash/shielded-pools) — Orchard shielded 거래가 결제 데이터를 보호하는 방식
- [결제 처리업체](/using-zcash/payment-processors) — Zcash 결제를 수락하는 다른 방법
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSA와 Zcash 프로그래밍 가능성의 미래
- [커뮤니티 프로젝트](/zcash-community/community-projects) — 더 많은 Zcash 생태계 프로젝트
