<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zimppy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zimppy.xyz

## TL;DR

- **Zimppy**는 Zcash의 Machine Payment Protocol (MPP)을 사용하는 AI 에이전트용 프라이버시 우선 결제 인프라입니다
- 온체인에 **한 번만 입금**하면(약 75초), 이후 **무제한 즉시 요청**이 가능하며 요청마다 블록체인과 상호작용할 필요가 없습니다
- **완전 실드드 Zcash (Orchard)** 결제를 지원합니다. 보내는 사람, 받는 사람, 금액, 메모가 모두 암호화됩니다
- **TypeScript와 Rust SDK**를 제공해 AI 파이프라인과 API 서버에 쉽게 통합할 수 있습니다
- **LLM API, 데이터 마켓플레이스, MCP 툴 서버** 등 모든 M2M 결제 용도에 적합합니다

---

> **Zimppy**는 실드드 및 투명 결제를 모두 지원하는 Zcash용 Machine Payment Protocol (MPP) 결제 수단입니다. 온체인에 한 번 입금하면, 이후 요청마다 체인과 상호작용하지 않는 무제한 즉시 bearer 요청이 가능합니다.

---

## 목차

1. [Zimppy.xyz란?](#what-is-zimppyxyz)
2. [AI 에이전트에 실드드 결제가 필요한 이유](#why-shielded-payments-for-ai-agents)
3. [Machine Payment Protocol (MPP)](#machine-payment-protocol-mpp)
4. [Zimppy 작동 방식](#how-zimppy-works)
   - [세션 (권장)](#sessions-recommended)
   - [스트리밍](#streaming)
   - [Charge](#charge)
5. [활용 사례와 예제](#use-cases--examples)
6. [설치](#installation)
7. [Zimppy 지갑 설정](#setting-up-the-zimppy-wallet)
8. [Zimppy 통합 - TypeScript SDK](#integrating-zimppy--typescript-sdk)
   - [서버 (Shielded)](#typescript-server--shielded)
   - [서버 (Transparent)](#typescript-server--transparent)
   - [클라이언트](#typescript-client)
9. [Zimppy 통합 - Rust SDK](#integrating-zimppy--rust-sdk)
   - [서버 (Axum)](#rust-server-axum)
   - [클라이언트](#rust-client)
10. [CLI 레퍼런스](#cli-reference)
11. [주요 기능](#key-features)
12. [아키텍처](#architecture)
13. [예제와 데모](#examples--demos)

---

## Zimppy.xyz란?

**Zimppy.xyz**는 AI 에이전트와 자동화된 머신 간(M2M) 워크플로우를 위해 특별히 설계된 프라이버시 우선 결제 인프라입니다. **Zcash**를 기반 통화로 사용하는 **Machine Payment Protocol (MPP)**을 구현하며, 실드드(완전 비공개)와 투명 결제 모드를 모두 지원합니다.

모든 거래가 온체인에 공개되는 전통적인 블록체인 결제 시스템과 달리, Zimppy는 요청당 지연 시간을 없애면서 암호학적 프라이버시를 유지하는 세션 기반 아키텍처를 중심으로 설계되었습니다. 덕분에 API, 데이터, 연산, AI 도구를 프로그래매틱하게 결제하면서 행동 메타데이터를 새지 않아야 하는 AI 에이전트에 독보적으로 적합합니다.

### 핵심 속성

- 온체인에 **한 번만 입금**(Zcash 컨펌 약 75초)
- 세션 개설 후 **무제한 즉시 요청**, 요청당 체인 상호작용 제로
- **실드드 결제**는 Zcash의 Orchard 프로토콜로 보내는 사람, 받는 사람, 금액, 메모를 암호화합니다
- **투명 결제**는 챌린지당 T-address를 사용해 완전한 프라이버시 없이도 재생(replay) 방지를 제공합니다
- **명세 준수**, HMAC-SHA256 챌린지, RFC 9457 오류, `/.well-known/payment` 디스커버리

---

## AI 에이전트에 실드드 결제가 필요한 이유?

법률 리서치, 의료 질의, 금융 분석, 경쟁 정보 등 민감한 워크플로우를 다루는 AI 에이전트에게 **모든 공개 결제는 메타데이터 유출**입니다. Zimppy는 **기본적으로 비공개인** 유일한 MPP 결제 수단입니다.

### 프라이버시 비교표

| 속성 | 공개 체인 (USDC, ETH) | Zimppy 실드드 | Zimppy 투명 |
|---|---|---|---|
| **보내는 사람** | 공개 | 암호화 | 공개 |
| **받는 사람** | 공개 | 암호화 | 챌린지별 (연결 불가) |
| **금액** | 공개 | 암호화 | 공개 |
| **메모** | 공개 | 암호화 | 해당 없음 |
| **재생 방지** | 없음 | 메모 바인딩 | 챌린지별 T-address |
| **서비스 사용 패턴** | 연결 가능 | 비공개 | 연결 불가 (새 주소) |

### 세션으로 해결한 지연 시간 문제

> *"하지만 Zcash는 블록 시간이 75초잖아요."*

**세션이 이를 해결합니다.** 온체인 대기는 입금 시 **딱 한 번**만 발생합니다. 이후 모든 요청은 즉시 처리됩니다.

```
Agent  ->  deposit 100,000 zat           (one on-chain tx, ~75s)
Agent  ->  open session                  (bearer token issued)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
Agent  ->  request -> response           (0ms - no chain interaction)
           ... hundreds of requests ...
Agent  ->  close session                 (refund unused balance)
```

**한 번 결제하고, 즉시 호출하고, 잔액은 돌려받으세요.** 요청당 지연 시간은 제로입니다.

---

## Machine Payment Protocol (MPP)

**Machine Payment Protocol (MPP)**은 자율 소프트웨어 에이전트(AI 에이전트, 봇, 스크립트)가 사람의 개입 없이 API 접근에 필요한 결제 요건을 발견하고, 협상하고, 이행할 수 있게 하는 표준화된 프로토콜입니다.

### MPP가 API와 통합되는 방식

MPP는 HTTP **402 Payment Required** 흐름을 따릅니다:

1. **에이전트가** 유료 API 엔드포인트에 리소스를 요청합니다.
2. **서버가** `402 Payment Required`와 서명된 챌린지(금액, 수신자, 메모)로 응답합니다.
3. **에이전트가** 호환되는 결제 수단(예: Zimppy 실드드 Zcash)으로 결제합니다.
4. **에이전트가** `Authorization: Payment {txid}`와 함께 요청을 재시도합니다.
5. **서버가** 결제를 암호학적으로 검증합니다(Orchard IVK 복호화, 금액 + 메모 확인).
6. **서버가** `200 OK`와 `Payment-Receipt` 헤더로 응답합니다.

### 명세 준수

- **HMAC-SHA256** 챌린지 서명
- **RFC 9457** 구조화된 오류 응답
- **`/.well-known/payment`** 자동 결제 수단 디스커버리 엔드포인트
- **Orchard IVK** (Incoming Viewing Key)로 지출 키 노출 없이 서버 측 결제 검증

---

## Zimppy 작동 방식

### 세션 (권장)

세션은 기본 상호작용 패턴입니다. 에이전트가 온체인에 잔액을 한 번 입금하고, bearer 토큰을 받아, 이후 모든 요청을 지연 시간 제로로 사용합니다.

```
Agent  ->  deposit 100,000 zat           (on-chain, ~75s one-time)
Agent  ->  open session                  (bearer token issued)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  GET /api/query + bearer       (instant, balance deducted)
Agent  ->  close session                 (refund unused balance on-chain)
```

**적합한 용도:** 고빈도 API 호출, LLM 추론, 반복 데이터 쿼리.

---

### 스트리밍

**Server-Sent Events (SSE)**를 통해 전달되는 토큰당 과금 콘텐츠입니다. 서버가 스트리밍되는 단어나 토큰 단위로 세션 잔액에서 차감합니다.

```
Agent  ->  open session with deposit
Agent  ->  GET /api/stream (SSE)
Server ->  stream word by word, deducting per token
Agent  ->  close session, refund remaining
```

**적합한 용도:** LLM 스트리밍 응답, 실시간 데이터 피드, 토큰당 과금 AI 도구.

---

### Charge

요청당 한 번의 실드드 결제입니다. 호출마다 전체 HTTP 402 흐름이 실행됩니다. 요청이 드물거나 고액일 때 적합합니다.

```
Agent  ->  GET /api/resource
Server ->  402 + challenge (amount, recipient, memo)
Agent  ->  shielded ZEC with memo "zimppy:{challenge_id}"
Agent  ->  GET /api/resource + Authorization: Payment {txid}
Server ->  decrypt with Orchard IVK, verify amount + memo
Server ->  200 OK + Payment-Receipt
```

**적합한 용도:** 고액 일회성 요청, 드문 API 호출, 프리미엄 데이터 엔드포인트.

---

## 활용 사례와 예제

### 1. AI 에이전트

법률 AI 에이전트가 유료 판례 데이터베이스를 조회합니다. Zimppy 실드드 세션을 사용하면 로펌의 신원도, 구체적인 질의 내용도 온체인에 보이지 않아 인프라 수준에서 변호사-의뢰인 특권을 보호합니다.

```
Agent opens session (100,000 zat deposit)
-> GET /api/cases?q=patent+infringement+2024     (instant)
-> GET /api/cases?q=prior+art+semiconductor      (instant)
-> GET /api/document/US11234567B2                (instant)
Session closed, unused balance refunded
```

### 2. 의료 질의 파이프라인용 AI 에이전트

의료 진단 에이전트가 여러 임상 데이터베이스를 조회합니다. 실드드 결제로 환자 질의 패턴이 제공자 간에 연결되지 않도록 합니다.

### 3. 금융 분석 에이전트

알고리즘 트레이딩 에이전트가 실시간 시장 데이터 API를 결제합니다. 투명 결제는 챌린지마다 새로운 T-address를 사용해 데이터 공급업체 간 사용 패턴 상관관계를 방지합니다.

### 4. MCP 툴 서버, 유료 AI 도구

MCP (Model Context Protocol) 서버가 유료 AI 도구를 제공합니다. 각 도구 호출이 Zimppy charge를 트리거해 수익화된 AI 기능의 마켓플레이스를 가능하게 합니다.

### 5. LLM 요약기, 토큰당 과금

LLM 요약 서비스가 SSE 스트리밍으로 출력 토큰당 에이전트에게 과금하며, 잔액 자동 차감과 미사용 선불 잔액 환불을 지원합니다.

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

Zimppy CLI는 완전한 지갑 인터페이스를 제공합니다. 모든 명령은 `npx zimppy`로 사용할 수 있습니다.

### 1단계: 지갑 만들기

```bash
npx zimppy wallet create
```

암호화 키를 생성하고 **시드 문구**를 표시합니다. 안전하게 보관하세요. 분실하면 복구할 수 없습니다.

### 2단계: 주소와 잔액 확인

```bash
npx zimppy wallet whoami
```

**Unified Address (UA)**, **T-address**, 현재 잔액, 활성 네트워크를 표시합니다.

```bash
npx zimppy wallet balance --all
```

모든 ZIP-32 계정의 계정별 잔액 내역을 보여줍니다.

### 3단계: 지갑에 자금 넣기

Zcash 호환 지갑이나 거래소에서 Unified Address로 ZEC를 보내세요. 실드드 입금은 Orchard 계정으로 바로 들어갑니다.

### 4단계: 자금 보내기와 실드하기

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

### 5단계: 자동 결제 요청하기

```bash
npx zimppy request <url>
```

전체 402 -> 결제 -> 재시도 흐름을 자동으로 처리합니다. 세션은 투명하게 개설되고 관리됩니다.

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

**핵심 포인트:**
- `zcash({ wallet: 'server' })`는 서버의 실드드 지갑을 불러옵니다
- `mppx.charge()`는 전체 402 챌린지/검증 생명주기를 처리합니다
- `result.withReceipt()`는 암호학적 결제 영수증을 응답에 첨부합니다

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

각 챌린지가 **새로운 T-address**를 생성해 세션 간 결제 요청을 연결할 수 없게 합니다.

---

### TypeScript 클라이언트

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({ methods: [zcash({ wallet: 'default' })] })

// Session opened automatically; 402 is handled transparently
const res = await mppx.fetch('https://api.example.com/resource')
```

클라이언트가 `402` 응답을 가로채 세션을 자동으로 열고 요청을 재시도하므로, 호출하는 코드에 결제 관련 로직이 필요 없습니다.

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

**핵심 포인트:**
- `MppCharge<Price>`는 핸들러 실행 전에 결제를 검증하는 Axum extractor입니다
- `WithReceipt`는 응답을 암호학적 결제 영수증으로 감쌉니다
- `ChargeConfig`는 가격 로직을 정의하며, 요청 파라미터에 따라 동적으로 만들 수 있습니다

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

`send_with_payment`는 모든 HTTP 클라이언트에 자동 402 처리, 세션 관리, Zcash 결제 이행을 확장합니다.

---

## CLI 레퍼런스

| 명령 | 설명 |
|---|---|
| `npx zimppy wallet create` | 키 생성 및 시드 문구 표시 |
| `npx zimppy wallet whoami` | 주소 (UA + T-addr), 잔액, 네트워크 표시 |
| `npx zimppy wallet balance --all` | 계정별 잔액 내역 |
| `npx zimppy wallet send <addr> <zat>` | 실드드 또는 투명 ZEC 전송 |
| `npx zimppy wallet transfer <from> <to> <zat>` | 계정 간 내부 이체 |
| `npx zimppy wallet shield` | 투명 자금을 Orchard로 이동 (실드) |
| `npx zimppy wallet use <name>` | 활성 지갑 식별자 전환 |
| `npx zimppy request <url>` | 자동 402 -> 결제 -> 재시도 요청 |

---

## 주요 기능

### 에이전트 네이티브 지갑

Zimppy 지갑은 사람이 관리하는 브라우저 확장이 아니라, AI 에이전트의 프로그래매틱한 사용을 위해 설계되었습니다. 키는 CLI 또는 SDK로 관리되며, **ZIP-32 계정 도출**로 계정을 교체할 수 있고, 거래마다 사람의 승인 없이 완전 자동화된 결제 흐름을 지원합니다.

### 멀티 에이전트 지원

**ZIP-32 계정 교체**를 사용해 여러 에이전트가 같은 지갑에서 작동할 수 있습니다. 각 에이전트는 격리된 잔액 추적, 계정 간 이체 기능, 계정별 잔액 보고를 갖는 자체 계정을 받습니다. 하나의 지갑 인프라로 다수 에이전트의 플릿 관리가 가능합니다.

### 완전 실드드 Zcash 거래 (Orchard)

실드드 결제는 최신의 가장 안전한 실드드 풀인 Zcash의 **Orchard 프로토콜**을 사용합니다. 서버는 **Incoming Viewing Key (IVK)**로 결제를 검증하며, 이 키는 지출 키를 노출하지 않고 수신된 노트를 복호화할 수 있습니다. 재생 공격은 **메모 바인딩**으로 방지됩니다. 각 챌린지가 고유한 `zimppy:{challenge_id}` 메모를 내장하고 이를 암호학적으로 검증합니다.

### 세션, 요청당 지연 시간 제로

세션 아키텍처는 온체인 컨펌 대기와 요청당 지연 시간을 분리합니다. 한 번의 입금(약 75초) 후, 모든 bearer 토큰 요청은 세션 종료 시까지 블록체인 상호작용 없이 즉시 처리됩니다.

### 스트리밍, 토큰당 과금

네이티브 **SSE (Server-Sent Events)** 지원으로 토큰당 과금 콘텐츠가 가능합니다. 출력 길이가 가변적이고 실제 소비량에 따라 과금해야 하는 LLM 추론 API에 이상적입니다.

### 명세 준수

- **HMAC-SHA256** 서명 챌린지로 위조 방지
- **RFC 9457** 구조화된 오류 형식으로 상호운용 가능한 오류 처리
- **`/.well-known/payment`**로 모든 MPP 호환 에이전트의 자동 결제 수단 디스커버리

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

### 구성 요소 역할

**`zimppy-core`** - 암호학적 코어입니다. 서버의 IVK를 이용한 Orchard 노트 복호화, 메모 파싱, 재생 방지 로직, 챌린지 검증을 처리합니다. 성능과 정확성을 위해 Rust로 작성되었습니다.

**`zimppy-wallet`** - `zingolib` 기반의 네이티브 Zcash 지갑입니다. 키, 계정, 실드드/투명 잔액, 거래 제출을 관리합니다.

**`zimppy-rs`** - Rust SDK입니다. `ChargeMethod`, `SessionMethod`, `PaymentProvider` 트레이트와 인체공학적 서버 통합을 위한 Axum extractor(`MppCharge`, `WithReceipt`)를 제공합니다.

**`zimppy-napi`** - Rust 코어를 Node.js에 노출하는 NAPI-RS 바인딩으로, TypeScript SDK가 JavaScript로 Zcash 프리미티브를 재구현하지 않고도 같은 암호 엔진을 사용할 수 있게 합니다.

**`zimppy-ts`** - TypeScript SDK입니다. charge, session, SSE 스트리밍 흐름을 위한 관용적인 async/await API로 NAPI 바인딩을 감쌉니다.

**`zimppy-cli`** - 명령줄 지갑 및 요청 도구입니다. 자동 결제(402 -> 결제 -> 재시도), 세션 관리, 모든 지갑 작업을 지원합니다.

---

## 예제와 데모

| 예제 | 설명 |
|---|---|
| `examples/fortune-teller/` | Charge, session, streaming 데모 - Rust 서버 + 클라이언트 |
| `examples/llm-summarizer/` | 토큰당 과금 LLM 스트리밍 데모 |
| `examples/mcp-server/` | 유료 AI 도구를 갖춘 MCP 툴 서버 |
| `examples/ts-server/` | TypeScript MPP 서버 레퍼런스 구현 |

---

## 포함된 기능 요약

| 기능 | 설명 |
|---|---|
| **Sessions** | 한 번 입금, 즉시 bearer 요청, 종료 시 환불 |
| **Streaming** | SSE 기반 토큰당 과금 콘텐츠 |
| **Charge** | HTTP 요청당 실드드 또는 투명 결제 (402 흐름) |
| **투명 결제** | 챌린지별 재생 방지 T-address + shield 명령 |
| **멀티 계정** | ZIP-32 계정 교체, 계정 간 이체, 계정별 잔액 |
| **CLI 지갑** | Send, shield, transfer, balance --all, whoami, 자동 결제 |
| **듀얼 SDK** | TypeScript 및 Rust |
| **명세 준수** | HMAC-SHA256 챌린지, RFC 9457 오류, `/.well-known/payment` 디스커버리 |

---

*더 많은 정보는 [zimppy.xyz](https://zimppy.xyz)를 방문하세요*

---

## 관련 페이지

- [Wallets](/using-zcash/wallets) — 실드드 거래를 지원하는 Zcash 지갑
- [Shielded Pools](/using-zcash/shielded-pools) — Orchard 실드드 거래가 결제 데이터를 보호하는 방식
- [Payment Processors](/using-zcash/payment-processors) — Zcash 결제를 받는 다른 방법들
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSA와 Zcash 프로그래머빌리티의 미래
- [Community Projects](/zcash-community/community-projects) — 더 많은 Zcash 생태계 프로젝트
