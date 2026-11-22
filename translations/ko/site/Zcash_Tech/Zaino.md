<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zaino 인덱서

## 요약

* **Zebra**는 Zcash 체인을 검증합니다.
* **Zaino**는 Zebra의 체인 데이터를 인덱싱하고 클라이언트용 API를 제공합니다.
* **Zallet**는 Z3 스택의 지갑 구성 요소입니다. 기본 Z3 설정에서는 Zallet가 Zebra에 직접 연결되므로 독립 실행형 Zaino 서비스가 필요하지 않습니다.
* 운영자가 lightwalletd 호환 gRPC 엔드포인트, JSON-RPC 프록시 또는 라이트 지갑, 블록 탐색기, 파우셋 및 유사한 서비스를 위한 인프라가 필요할 때 독립 실행형 Zaino 서비스가 유용합니다.
* Zaino는 현재 운영 중인 인프라입니다. 하지만 운영 환경에서 실행하기 전에 공식 Zaino와 Z3 문서에서 최신 배포 정보를 확인해야 합니다.

## 핵심 설명

Zaino는 Zcash 블록체인을 위한 Rust 인덱서입니다. Zebra 풀 노드에서 체인 데이터를 읽습니다. Zebra가 모든 클라이언트용 인덱스를 담당하지 않아도 되도록 지갑, 블록 탐색기, 파우셋 및 기타 서비스에 필요한 데이터를 제공합니다.

### Zaino의 역할

Zaino는 Zebra와 클라이언트 소프트웨어 사이에 위치합니다. Zebra는 합의 노드로, Zcash 블록체인을 다운로드하고 검증하며 이를 따라갑니다. Zaino는 Zebra를 체인 데이터의 출처로 사용한 다음, 클라이언트 애플리케이션이 효율적으로 조회할 수 있도록 인덱싱된 데이터를 준비합니다.

이러한 역할 분담으로 각 구성 요소의 역할이 명확해집니다.

| 구성 요소 | 역할 |
|:--|:--|
| Zebra | 풀 노드 및 검증자 |
| Zaino | 인덱서 및 클라이언트용 API 서비스 |
| Zallet | 지갑 서비스 |
| lightwalletd | Zaino가 대체하거나 보완하도록 설계된 구형 라이트 지갑 서버 |

Zaino는 라이트 클라이언트, 풀 클라이언트 또는 지갑, 블록 탐색기에 필요한 기능을 제공합니다. 확정된 체인, 아직 확정되지 않은 최선의 체인, 그리고 Zebra가 보유한 멤풀 데이터에 액세스할 수 있습니다.

### 현재 Zcash Stack에서의 역할

현재 Z3 스택은 Zebra, Zallet, 선택 사항인 Zaino를 중심으로 구성됩니다.

기본 Z3 배포에서는 Zebra와 Zallet가 함께 실행됩니다. Zallet는 Zebra에 직접 연결되므로 로컬 지갑 스택만 실행하는 운영자는 독립 실행형 Zaino 서비스를 시작하지 않아도 됩니다.

운영자가 외부 클라이언트에 서비스를 제공하려는 경우 Zaino를 추가합니다. Z3에서는 `indexer` Compose 프로필을 통해 실행되며 다음을 제공합니다.

* 라이트 지갑 클라이언트용 lightwalletd 호환 gRPC 엔드포인트
* 블록 탐색기, 파우셋 및 서비스 백엔드용 JSON-RPC 프록시
* Zebra의 체인 상태와 분리된 인덱서 데이터베이스

따라서 Zaino는 지갑 백엔드, 공용 인프라 운영자, 블록 탐색기, 파우셋 및 인덱싱된 Zcash 체인 데이터가 필요한 서비스를 테스트하는 개발자에게 특히 유용합니다.

### Zaino와 lightwalletd

lightwalletd는 기존 라이트 지갑 서버입니다. Zaino는 이 역할을 위한 Rust 기반의 후속 방식입니다. 가능한 경우 호환 API를 제공하여 지갑과 서비스가 한 번에 전면 재작성하지 않고도 이전할 수 있도록 하는 것이 목표입니다.

그렇다고 모든 lightwalletd 배포가 이미 Zaino로 이전했다는 뜻은 아닙니다. 운영자는 Zaino를 현재의 Zebra 기반 스택의 일부로 간주하고, 실행할 항목을 선택하기 전에 최신 프로젝트 문서, 릴리스 및 서비스 대시보드를 확인해야 합니다.

## 시각적 설명 / 비유

Zcash 블록체인을 원장 페이지가 가득한 거대한 기록 보관소라고 생각해 보세요.

Zebra는 기록 보관 담당자입니다. 새 페이지를 받을 때마다 규칙에 맞는지 확인하고 적절한 곳에 보관합니다.

Zaino는 기록 보관소 앞에 있는 안내 데스크입니다. Zebra가 보관한 내용을 읽고 빠르게 조회할 수 있도록 목록을 만들며 방문자의 질문에 신속히 답합니다. 라이트 지갑, 블록 탐색기, 파우셋은 “이 블록에는 무엇이 있나요?” 또는 “멤풀에서 대기 중인 거래는 무엇인가요?”와 같은 질문을 하러 안내 데스크를 찾습니다. 안내 데스크는 어떤 페이지가 진짜인지 판단하지 않습니다. 그 일은 기록 보관 담당자의 몫입니다.

기본 Z3 설정에서 Zallet는 같은 건물에서 작동하며 기록 보관 담당자에게 바로 갑니다. 안내 데스크를 이용할 필요가 없습니다.

### Zaino의 작동 방식을 보여주는 다이어그램

#### Zaino 내부 아키텍처

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Zaino 라이브 서비스 아키텍처

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Zaino 시스템 아키텍처

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## 자세히 알아보기

### 운영자 참고 사항

가장 간편하고 공식적인 배포 방법은 Z3 저장소를 이용하는 것입니다. Z3에는 선택적 서비스로 Zaino가 포함되어 있습니다.

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

일반적인 Z3 설정을 먼저 실행하고, 메인넷이나 테스트넷에서 종속 서비스를 시작하기 전에 Zebra의 동기화가 완료될 때까지 기다리세요.

Zaino는 두 종류의 네트워크 서비스를 제공합니다. gRPC 서비스는 라이트 지갑용 API입니다. JSON-RPC 서비스는 외부 계층에서 보호 기능을 제공하지 않는 한 루프백 또는 신뢰할 수 있는 사설 네트워크에서 사용하도록 설계되었습니다. 인증이나 암호화가 적용되지 않은 JSON-RPC 엔드포인트를 공용 인터넷에 노출하지 마세요.

## 흔히 하는 실수

**Zaino를 풀 노드로 취급하기.** Zaino는 검증자가 아닙니다. Zebra는 체인을 검증하고, Zaino는 Zebra의 데이터를 인덱싱합니다.

**모든 Z3 배포에 독립 실행형 Zaino가 필요하다고 가정하기.** 기본 Z3 스택에서는 Zallet가 Zebra에 직접 연결될 수 있습니다. 외부 클라이언트용 독립 실행형 인덱서 서비스가 필요한 경우 Zaino를 시작하세요.

**계획 중인 기능을 이미 배포된 기능으로 소개하기.** Zaino는 활발히 개발되고 있으므로 기능을 사용할 수 있다고 설명하기 전에 최신 릴리스 노트와 문서를 확인하세요.

**JSON-RPC를 부주의하게 노출하기.** Zaino의 JSON-RPC 인터페이스는 다른 계층에서 보호하지 않는 한 루프백 또는 신뢰할 수 있는 사설 네트워크에서 사용해야 합니다.

## 관련 페이지

- [라이트 지갑 노드](/zcash-tech/lightwallet-nodes): 라이트 지갑이 연결하는 서버인 lightwalletd와 Zaino, 그리고 서버 간 전환 방법.
- [Zinder](/zcash-tech/zinder): Zcash Foundation의 또 다른 Rust 인덱서(알파)
- [Zebra 풀 노드](/zcash-tech/zebra-full-node): Zaino가 체인 데이터를 읽어오는 노드.
- [Zallet](/zcash-tech/zallet): Z3 스택의 풀 노드 지갑.
- [Z3 스택](/zcash-tech/z3-stack): Zebra, Zallet 및 선택 사항인 Zaino 인덱서를 함께 패키징한 스택.
- [인덱서 벤치마크: Zaino 대 Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): 두 라이트 지갑 인덱서를 재현 가능하게 비교합니다.
- [풀 노드](/zcash-tech/full-nodes): Zcash 풀 노드 소프트웨어에 대한 개요.
- [Zcash 지갑 동기화](/zcash-tech/zcash-wallet-syncing): 거래정보 보호 지갑에 동기화 과정이 필요한 이유.

### 자료

* [Zaino GitHub 저장소](https://github.com/zingolabs/zaino)
* [Zaino 릴리스](https://github.com/zingolabs/zaino/releases)
* [Zaino 생성된 문서](https://zingolabs.github.io/zaino/)
* [Z3 배포 저장소](https://github.com/ZcashFoundation/z3)
* [Zebra 문서](https://zebra.zfnd.org/)
* [Zaino 개발 지원금 및 프로젝트 논의](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**최종 업데이트:** 2026년 11월
