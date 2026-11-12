# Zcash JS 개발자 가이드

**zcash.js**(`@zcashlabs/zcash.js`)는 Zcash Labs가 2026년 10월 26일에 출시한 실험적 TypeScript/JavaScript SDK입니다. 개발자는 이를 통해 Node.js 및 브라우저에서 Zcash 네트워크와 상호작용하는 지갑, 라이트 클라이언트, 대시보드 및 애플리케이션을 구축할 수 있습니다.

> **상태**: 실험적(v0.1.1). 영구 Node 지갑에는 현재 Linux + `flock`가 필요합니다. 라이브 브라우저에서의 완전한 송금/수금 및 과거 지갑 데이터베이스 마이그레이션은 아직 완전히 검증되지 않았습니다. 프로덕션 환경에서 사용하기 전에 항상 공식 문서를 확인하세요.

## SDK가 제공하는 기능

- `createPublicClient` — 상태 비저장 JSON-RPC 쿼리 및 트랜잭션 관찰
- `createLightClient` — 라이트월렛 쿼리 및 스트림(Node에서는 네이티브 gRPC, 브라우저에서는 gRPC-Web)
- `createWalletClient` — 로컬 계정, 스캔, 제안, 서명, 제출 및 기록된 결제 복구
- 정확한 `bigint` 금액, 네트워크 검증, 보기 키/주소 도구 및 PCZT 유틸리티
- 기본 지갑 엔진, 워커 및 로컬 Sapling 증명 에셋 포함(별도의 Rust 설치 불필요)

## 설치

**Node.js 22.23.4**(패키지에 고정된 버전)를 사용하세요.

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- ESM과 함께 TypeScript를 사용하는 것을 권장합니다(`package.json`의 `"type": "module"`).
- 브라우저 애플리케이션은 최신 ESM 번들러를 통해 작동합니다. 번들러는 지연 로드 WASM, 워커 및 증명 에셋을 출력하며, 이들은 애플리케이션과 함께 배포해야 합니다.

## 첫 체인 쿼리(지갑 없음)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- `network` 옵션을 생략하면 기본값은 메인넷입니다(일치하는 엔드포인트 제공).
- 순수 JSON-RPC 사용을 위한 `createPublicClient`도 제공됩니다.

## 지갑 열기

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### 스토리지 옵션

| 환경             | 스토리지 옵션                                      |
|-----------------|-----------------------------------------------------|
| Node(영구)       | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| 브라우저         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| 일회용           | `{ kind: 'memory' }`                                |

**중요 기본값**(v0.1.1 기준):

- 기본적으로 지출 및 거스름돈은 Ironwood 전용입니다
- 수수료 규칙: ZIP-317
- 확인 수: 신뢰됨 3 / 신뢰되지 않음 3
- 결제를 제안하기 전에 항상 `wallet.sync()`를 호출하세요

## 고수준 지갑 워크플로

1. 니모닉 계정을 생성하거나 가져오고 서명자를 연결합니다
2. `wallet.sync()`를 호출합니다
3. 수신 주소를 요청합니다(Unified / Ironwood 권장)
4. 제안을 생성 → 검토 → `wallet.send()` 호출
5. 확인을 감시하거나 재시작 후 복구를 위해 기록된 작업을 사용합니다

애플리케이션은 니모닉 바이트를 소유합니다. 더 이상 필요하지 않으면 메모리에서 지우세요. 모든 수신자, 금액, 수수료, 풀 및 만료를 보여 주는 명확한 승인 UI를 항상 제공하세요.

완전히 작동하는 예제는 공식 [Wallet 둘러보기](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)를 참조하세요.

## 플랫폼 참고 사항 및 현재 제한 사항

| 기능                   | Node                              | 브라우저                          |
|-----------------------|-----------------------------------|----------------------------------|
| 패키지                 | Node 22.23.4 + ESM                | 최신 ESM 번들러 + WebAssembly |
| 라이트 쿼리            | 네이티브 gRPC                     | gRPC-Web + CORS                  |
| 영구 스토리지          | Linux + `flock` 전용              | OPFS(보안 컨텍스트)            |
| 일회용 스토리지        | 메모리                            | 메모리                           |

추가 제한 사항:

- 영구 Node 스토리지는 현재 Linux 전용입니다
- 관리형 비밀 금고, 원격 증명 서비스 또는 하드웨어 서명자 통합은 아직 없습니다
- 스토리지는 **저장 시 암호화됨**으로 명시되어 있지 않습니다
- 동일한 지갑 스토리지를 여러 프로세스나 브라우저 탭에서 동시에 열지 마세요
- 항상 `await wallet.close()`로 지갑을 정상적으로 닫으세요

## 다음 단계

- 공식 설치 및 첫 요청: [설치](https://zcashlabs.github.io/zcashjs/api/installation.html)
- 지갑 열기 및 구성: [지갑 열기](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- 전체 워크플로: [지갑 둘러보기](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API 참조: [API 참조](https://zcashlabs.github.io/zcashjs/api/reference.html)
- 플랫폼 제한: [Node 및 브라우저 설정](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## 공식 리소스

- 개발자 책: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub 저장소: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm 패키지: `@zcashlabs/zcash.js`


---

*이 가이드는 `@zcashlabs/zcash.js@0.1.1`(2026년 10월)를 기반으로 합니다. SDK는 활발히 개발 중이므로 최신 API 및 제한 사항은 항상 공식 문서를 우선하세요.*
