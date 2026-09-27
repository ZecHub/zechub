# Zaino 인덱서

Zaino는 Zcash 블록체인을 위한 Rust 인덱서입니다. Zebra 풀 노드에서 체인 데이터를 읽고, Zebra 자체가 모든 클라이언트용 인덱스를 담당하지 않아도 지갑, 탐색기, 수도꼭지 및 기타 서비스에 필요한 데이터를 제공합니다.

## 요약

* **Zebra**는 Zcash 체인을 검증합니다.
* **Zaino**는 Zebra의 체인 데이터를 인덱싱하고 클라이언트용 API를 제공합니다.
* **Zallet**는 Z3 스택의 지갑 구성 요소입니다. 기본 Z3 설정에서 Zallet는 Zebra와 직접 통신하며 독립형 Zaino 서비스를 필요로 하지 않습니다.
* 독립형 Zaino 서비스는 운영자가 lightwalletd 호환 gRPC 엔드포인트, JSON-RPC 프록시 또는 라이트 지갑, 탐색기, 수도꼭지 및 유사 서비스를 위한 인프라가 필요할 때 유용합니다.
* Zaino는 활성 인프라이지만, 운영자는 프로덕션 환경에서 실행하기 전에 최신 배포 세부 정보를 위해 공식 Zaino 및 Z3 문서를 확인해야 합니다.

## Zaino의 기능

Zaino는 Zebra와 클라이언트 소프트웨어 사이에 위치합니다. Zebra는 합의 노드로, Zcash 블록체인을 다운로드하고 검증하며 추적합니다. Zaino는 체인 데이터의 소스로 Zebra를 사용한 다음, 클라이언트 애플리케이션이 효율적으로 질의할 수 있는 인덱싱된 뷰를 준비합니다.

이러한 분리는 각 역할을 명확하게 유지합니다:

| 구성 요소 | 역할 |
|:--|:--|
| Zebra | 풀 노드 및 검증자 |
| Zaino | 인덱서 및 클라이언트용 API 서비스 |
| Zallet | 지갑 서비스 |
| lightwalletd | Zaino가 대체하거나 보완하도록 설계된 이전 라이트 지갑 서버 |

Zaino는 라이트 클라이언트, 풀 클라이언트 또는 지갑, 그리고 블록 탐색기를 위한 기능을 제공합니다. 최종 확정 체인, 최종 확정되지 않은 최선 체인, 그리고 Zebra가 보유한 메모리 풀 데이터에 접근할 수 있게 합니다.

## 현재 Zcash 스택에서의 위치

현재 Z3 스택은 Zebra, Zallet 및 선택 사항인 Zaino를 중심으로 구성됩니다.

기본 Z3 배포에서는 Zebra와 Zallet가 함께 실행됩니다. Zallet는 Zebra에 직접 연결되므로, 로컬 지갑 스택만 실행하는 운영자는 독립형 Zaino 서비스를 시작할 필요가 없습니다.

운영자가 외부 클라이언트에 서비스를 제공하려는 경우 Zaino가 추가됩니다. Z3에서는 `indexer` Compose 프로필 뒤에서 실행되며 다음을 추가합니다:

* 라이트 지갑 클라이언트를 위한 lightwalletd 호환 gRPC 엔드포인트
* 탐색기, 수도꼭지 및 서비스 백엔드를 위한 JSON-RPC 프록시
* Zebra의 체인 상태와 분리된 인덱서 데이터베이스

따라서 Zaino는 지갑 백엔드, 공개 인프라 운영자, 탐색기, 수도꼭지 및 인덱싱된 Zcash 체인 데이터가 필요한 서비스를 테스트하는 개발자에게 특히 관련성이 높습니다.

## Zaino 및 lightwalletd

lightwalletd는 원래의 라이트 지갑 서버입니다. Zaino는 이 역할을 위한 Rust 기반 후속 경로입니다. 가능한 경우 호환 API를 제공하여 지갑과 서비스가 한 번에 완전히 다시 작성하지 않고도 마이그레이션할 수 있도록 하는 것이 목표입니다.

그렇다고 모든 lightwalletd 배포가 이미 Zaino로 이전했다는 의미는 아닙니다. 운영자는 Zaino를 현재 Zebra 기반 스택의 일부로 간주하고, 무엇을 실행할지 결정하기 전에 최신 프로젝트 문서, 릴리스 및 서비스 대시보드를 확인해야 합니다.

## 운영자 참고 사항

가장 쉬운 공식 배포 경로는 Z3 저장소입니다. Z3에는 선택적 서비스로 Zaino가 포함되어 있습니다:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

메인넷 또는 테스트넷에서 종속 서비스를 시작하기 전에 일반적인 Z3 설정을 먼저 실행하고 Zebra가 동기화될 때까지 기다리십시오.

Zaino는 두 종류의 네트워크 서비스를 제공합니다. gRPC 서비스는 라이트 지갑용 API입니다. JSON-RPC 서비스는 외부 계층이 보호 기능을 제공하지 않는 한 루프백 또는 신뢰할 수 있는 사설 네트워크용입니다. 인증되지 않았거나 암호화되지 않은 JSON-RPC 엔드포인트를 공용 인터넷에 노출하지 마십시오.

## Zaino의 작동 방식을 보여 주는 몇 가지 다이어그램

### Zaino 내부 아키텍처

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Zaino 라이브 서비스 아키텍처

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Zaino 시스템 아키텍처

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## 흔한 실수

**Zaino를 풀 노드로 취급하는 것.** Zaino는 검증자가 아닙니다. Zebra가 체인을 검증하며, Zaino는 Zebra의 데이터를 인덱싱합니다.

**모든 Z3 배포에 독립형 Zaino가 필요하다고 가정하는 것.** 기본 Z3 스택에서 Zallet는 Zebra에 직접 연결할 수 있습니다. 외부 클라이언트를 위한 독립형 인덱서 서비스가 필요할 때 Zaino를 시작하십시오.

**계획된 기능을 이미 배포된 것처럼 제시하는 것.** Zaino는 활발히 개발되고 있으므로, 기능을 사용 가능하다고 설명하기 전에 현재 릴리스 노트와 문서를 확인하십시오.

**JSON-RPC를 부주의하게 노출하는 것.** Zaino의 JSON-RPC 인터페이스는 다른 계층으로 보호되지 않는 한 루프백 또는 신뢰할 수 있는 사설 네트워크용입니다.

## 어디에서 더 알아볼 수 있나요?

* [Zaino GitHub 저장소](https://github.com/zingolabs/zaino)
* [Zaino 릴리스](https://github.com/zingolabs/zaino/releases)
* [Zaino 생성된 문서](https://zingolabs.github.io/zaino/)
* [Z3 배포 저장소](https://github.com/ZcashFoundation/z3)
* [Zebra 문서](https://zebra.zfnd.org/)
* [Zaino 지원금 및 프로젝트 논의](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**마지막 업데이트:** 2026년 8월
