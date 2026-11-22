# ZAP1 증명 프로토콜

ZAP1은 Zcash를 위한 오픈 소스 증명 프로토콜입니다. 구조화된 생애 주기 이벤트를 BLAKE2b Merkle 트리에 기록하고, Orchard 거래정보 보호 메모를 통해 트리의 루트를 온체인에 고정합니다. 증명은 누구나 공개적으로 검증할 수 있습니다. 이벤트 데이터는 비공개로 유지됩니다.

## 작동 방식

운영자는 이벤트 유형(배포, 결제, 전송 등)을 등록하고 ZAP1 인스턴스에 제출합니다. 각 이벤트는 도메인 분리된 BLAKE2b-256을 사용해 리프 해시를 생성합니다. 리프는 Merkle 트리에 누적됩니다. 임계값에 도달하면 트리 루트를 ZAP1:09 메모로 인코딩하고, 거래정보 보호 거래를 통해 Zcash에 고정합니다.

리프 해시가 있는 사람은 누구나 운영자를 신뢰하지 않고도 리프에서 루트, 온체인 고정 지점까지의 전체 경로를 검증할 수 있습니다.

## 주요 속성

- **애플리케이션에 구애받지 않음**: 모든 Zcash 운영자가 자체 이벤트 유형과 개인화 문자열을 정의할 수 있습니다.
- **프라이버시 보호**: 고정하기 전에 이벤트 페이로드를 해시합니다. 온체인에는 해시만 기록됩니다.
- **독립적인 검증 가능**: 검증에는 증명 번들과 체인 접근 권한만 필요합니다. 운영자를 신뢰할 필요가 없습니다.
- **ZIP 302 호환**: ZAP1은 증명 페이로드용 ZIP 302 partType을 향해 발전하고 있습니다.

## 구현 현황

- 참조 구현(Rust, MIT 라이선스)
- crates.io의 검증 SDK(Rust + 83KB WASM)
- JavaScript SDK(npm)
- 범용 메모 디코더(ZAP1, ZIP 302 TVLV, 텍스트, 바이너리, 빈 메모 식별)
- API 검사 29개와 프로토콜 검사 14개가 포함된 적합성 테스트 키트
- 다자간 고정 브로드캐스팅을 위한 FROST 2-of-3 임계값 서명 설계
- 검토 중인 ZIP 초안 PR #1243
- 2026년 3월 기준 메인넷 고정 4건, 리프 14개

## 아키텍처

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

각 운영자는 자체 키, Merkle 트리, 고정 지점을 사용해 자체 ZAP1 인스턴스를 실행합니다. 운영자 간에 공유 상태는 없습니다.

## 자세히 알아보기

- 소스 코드: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- 검증 SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- 메모 디코더: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- 프로토콜 사양: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP 초안: [PR #1243](https://github.com/zcash/zips/pull/1243)
- 실시간 API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- 운영자 안내서: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
