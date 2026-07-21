# ZAP1 인증 프로토콜

ZAP1은 Zcash용 오픈소스 인증 프로토콜입니다. 이는 구조화된 라이프사이클 이벤트를 BLAKE2b 머클 트리에 기록하고, Orchard 가상 메모를 통해 트리의 루트를 체인 상에 앵커링합니다. 증명은 공개적으로 검증 가능하며, 이벤트 데이터는 비공개 상태로 유지됩니다.

## 작동 방식

운영자는 이벤트 유형(배포, 결제, 전송 등)을 등록하고 이를 ZAP1 인스턴스에 제출합니다. 각 이벤트는 도메인 분리된 BLAKE2b-256을 사용하여 리프 해시를 생성합니다. 리프들은 머클 트리에 누적됩니다. 임계치에 도달하면 트리 루트는 ZAP1:09 메모로 인코딩되어, 가상 거래를 통해 Zcash에 앵커링됩니다.

리프 해시를 소유한 누구라도 운영자 신뢰 없이 리프에서 루트까지의 전체 경로와 체인 상 앵커를 검증할 수 있습니다.

## 주요 특징

- **애플리케이션 무관**: 어떤 Zcash 운영자도 자신의 이벤트 유형과 개인화 문자열을 정의할 수 있음
- **개인정보 보호**: 이벤트 페이로드는 앵커링 전에 해시 처리됨. 체인 상에는 해시만 저장됨.
- **독립적 검증 가능**: 증명 패키지와 체인 접근만 필요함. 운영자 신뢰가 필요 없음
- **ZIP 302 호환성**: ZAP1은 인증 페이로드용 ZIP 302 partType으로 수렴 중

## 현재 존재하는 것들

- 참조 구현 (Rust, MIT 라이선스)
- 검증 SDK (crates.io, Rust + 83KB WASM)
- JavaScript SDK (npm)
- 보편적인 메모 디코더 (ZAP1, ZIP 302 TVLV, 텍스트, 이진 및 공백 메모 식별)
- 29개의 API 체크와 14개의 프로토콜 체크가 포함된 일관성 키트
- 다자간 앵커 방송을 위한 FROST 2-of-3 임계 서명 설계
- 검토 중인 ZIP 초안 PR #1243
- 2026년 3월 기준, 메인넷에 4개의 앵커와 14개 리프 존재

## 아키텍처

```
앱 --> ZAP1 API --> 머클 트리 --> Zcash 앵커
          |                                    |
       이벤트 유형                         가상 메모
    (DEPLOYMENT 등)                    (ZAP1:09:{root})
```

각 운영자는 자신의 키, 머클 트리 및 앵커를 사용하여 독립적인 ZAP1 인스턴스를 실행합니다. 운영자 간에는 공유 상태가 없습니다.

## 더 알아보기

- 소스 코드: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- 검증 SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- 메모 디코더: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- 프로토콜 명세서: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP 초안: [PR #1243](https://github.com/zcash/zips/pull/1243)
- 라이브 API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- 운영자 가이드: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
