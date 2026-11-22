# Zcash JS 개발자 가이드

**zcash.js** (`@zcashlabs/zcash.js`)는 Zcash Labs가 2026년 10월 26일에 출시한 실험 단계의 TypeScript/JavaScript 소프트웨어 개발 키트(SDK)입니다. 개발자는 이를 사용해 Node.js와 브라우저에서 Zcash 네트워크와 상호 작용하는 지갑, 라이트 클라이언트, 대시보드, 애플리케이션을 만들 수 있습니다.

> **상태**: 실험 단계(v0.1.1). 지속적으로 사용할 수 있는 노드 지갑에는 현재 Linux + `flock`가 필요합니다. 실제 브라우저에서 완전한 송수신을 수행하는 기능과 기존 지갑 데이터베이스를 마이그레이션하는 기능은 아직 완전히 검증되지 않았습니다. 프로덕션 환경에서 사용하기 전에 항상 공식 문서를 확인하세요.

## SDK에서 제공하는 기능

- `createPublicClient` — 상태를 유지하지 않는 JSON-RPC 쿼리 및 거래 관찰
- `createLightClient` — 라이트월렛 쿼리 및 스트림(노드에서는 네이티브 gRPC, 브라우저에서는 gRPC-Web)
- `createWalletClient` — 로컬 계정, 스캔, 제안, 서명, 제출 및 기록된 결제 복구
- 정확한 `bigint` 금액, 네트워크 검증, 뷰잉 키/주소 도구 및 PCZT 유틸리티
- 기본 지갑 엔진, 작업자 및 로컬 Sapling 증명 자산을 번들로 제공(별도의 Rust 설치 불필요)

## 설치

**Node.js 22.23.4**를 사용하세요(패키지에서 고정한 버전).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- ESM과 함께 TypeScript를 사용하는 것이 좋습니다(`package.json`에서 `"type": "module"`).
- 브라우저 애플리케이션은 최신 ESM 번들러를 통해 사용할 수 있습니다. 번들러는 지연 로드되는 WASM, 작업자 및 증명 자산을 생성하며, 이를 애플리케이션과 함께 배포해야 합니다.

## 첫 체인 쿼리(지갑 없이 사용)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- `network` 옵션을 생략하면 메인넷이 기본값으로 사용됩니다(이에 맞는 엔드포인트를 지정하세요).
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

### 저장소 옵션

| 환경     | 저장소 옵션                                      |
|-----------------|-----------------------------------------------------|
| 노드(지속 저장)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| 브라우저         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| 임시 사용        | `{ kind: 'memory' }`                                |

**중요한 기본값**(v0.1.1 기준):

- 기본적으로 송금 및 거스름 주소는 Ironwood 전용입니다
- 수수료 규칙: ZIP-317
- 확인 횟수: 신뢰할 수 있는 경우 3회 / 신뢰할 수 없는 경우 3회
- 결제를 제안하기 전에 항상 `wallet.sync()`을 호출하세요

## 지갑의 전체 작업 흐름

1. 니모닉 계정을 생성하거나 가져온 다음 서명자를 연결합니다
2. `wallet.sync()`을 호출합니다
3. 수신 주소를 요청합니다(통합 주소 / Ironwood 권장)
4. 제안 생성 → 검토 → `wallet.send()` 호출
5. 확인을 기다리거나, 재시작 후 복구하려면 기록된 작업을 사용합니다

애플리케이션은 니모닉 바이트를 관리합니다. 더 이상 필요하지 않으면 메모리에서 삭제하세요. 모든 수신자, 금액, 수수료, 풀 및 만료 시각을 표시하는 명확한 승인 UI를 항상 제공하세요.

완전한 작동 예제는 공식 [지갑 안내서](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)를 참조하세요.

## 플랫폼 참고 사항 및 현재 제한 사항

| 기능            | 노드                              | 브라우저                          |
|-----------------------|-----------------------------------|----------------------------------|
| 패키지               | Node 22.23.4 + ESM                | 최신 ESM 번들러 + WebAssembly |
| 라이트 쿼리         | 네이티브 gRPC                       | gRPC-Web + CORS                  |
| 지속 저장소       | Linux + `flock`만              | OPFS(보안 컨텍스트)            |
| 임시 저장소    | 메모리                            | 메모리                           |

추가 제한 사항:

- 노드의 지속 저장소는 현재 Linux만 지원합니다
- 관리형 비밀 금고, 원격 증명 서비스 또는 하드웨어 서명자 연동은 아직 지원하지 않습니다
- 저장 데이터는 저장 상태에서 암호화된다고 **보장하지 않습니다**
- 여러 프로세스나 브라우저 탭에서 동일한 지갑 저장소를 동시에 열지 마세요
- 항상 `await wallet.close()`를 사용해 지갑을 정상적으로 닫으세요

## 다음 단계

- 공식 설치 및 첫 요청: [설치](https://zcashlabs.github.io/zcashjs/api/installation.html)
- 지갑 열기 및 설정: [지갑 열기](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- 전체 작업 흐름: [지갑 안내서](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API 참조: [API 참조](https://zcashlabs.github.io/zcashjs/api/reference.html)
- 플랫폼 제한 사항: [노드 및 브라우저 설정](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## 공식 자료

- 개발자 문서: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub 저장소: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm 패키지: `@zcashlabs/zcash.js`


---

*이 가이드는 `@zcashlabs/zcash.js@0.1.1`(2026년 10월)을 기준으로 작성되었습니다. SDK는 활발히 개발 중이므로 최신 API 및 제한 사항은 항상 공식 문서를 확인하세요.*
