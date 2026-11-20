# Zinder 인덱서

Zinder는 Rust로 작성되어 Zcash Foundation가 공개한 자체 호스팅 Zcash 인덱서입니다. Zebra 또는 Zakura 전체 노드에서 체인을 한 번 읽고, 일관된 체인 상태를 저장한 뒤 여러 지갑, 애플리케이션, 탐색기에 동시에 제공합니다. 기존 경량 지갑은 lightwalletd 호환 어댑터를 통해 연결할 수 있습니다.

> **Zinder는 알파 버전입니다.** 자체 README에 따르면 네이티브 API, lightwalletd 호환 인터페이스, 저장소 레이아웃과 배포 구성이 변경될 수 있으며, 태그가 지정된 릴리스도 안정성을 보장하지 않습니다. 정확한 버전을 고정하고 호환성이 깨지는 업그레이드가 있을 수 있다고 예상하세요.

## 한눈에 보기

* 체인을 검증하는 것은 **Zebra** 또는 **Zakura**입니다. **Zinder**는 노드가 가진 데이터를 인덱싱해 클라이언트에 제공합니다.
* 두 가지 연결 방식이 있습니다. Zinder 자체 `WalletQuery` gRPC API와, lightwalletd의 `CompactTxStreamer` 프로토콜을 사용하는 별도 어댑터입니다. 따라서 lightwalletd용으로 만들어진 지갑은 코드를 변경하지 않고 연결할 수 있습니다.
* 모든 읽기 작업은 하나의 체인 상태(“에포크”)에 고정되므로, 동기화 배치에서 서로 경쟁하는 두 체인 팁의 데이터가 섞이지 않습니다. 키와 차폐 주소 스캔은 지갑에서 처리합니다.
* 한 운영자가 노드 하나를 실행해 여러 사용처에 제공하는 환경을 위해 설계되었습니다. 공개 엔드포인트는 직접 TLS, 인증, 속도 제한을 적용해 보호하세요.
* 릴리스가 빠르게 나옵니다(2026년 11월 10일부터 14일까지 0.7.0에서 0.12.0으로 변경). 이 중 여러 버전은 호환성을 깨뜨렸습니다. 업그레이드할 때마다 변경 로그를 읽으세요.

## Zinder의 역할

경량 지갑은 전체 노드와 직접 통신하지 않습니다. 인덱서에 압축 블록, 트리 상태, 거래 데이터를 요청합니다([경량 지갑 노드](/zcash-tech/lightwallet-nodes) 참고). Zcash 생태계에는 이제 이 기능을 제공하는 인덱서가 여럿 있습니다.

| 인덱서 | 언어 | 유지 관리자 | 연결 대상 | 참고 |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / Zcash 커뮤니티 | Zebra 또는 zcashd | 최초의 경량 지갑 서버 |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra 또는 zcashd | Z3 스택에서 선택적으로 사용할 수 있는 인덱서 프로필 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | 내장형 Zakura 노드 | [Zaino 대 Ztreamer 벤치마크](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) 참고 |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 또는 Zakura 1.8.6(아카이브 노드) | 알파 버전. 네이티브 API, lightwalletd 어댑터, 선택적 탐색기 조회 기능 제공 |

Zinder 문서는 어떤 경우에 적합한 선택인지 명확히 설명합니다. 체인 접근이 단일 지갑 프로세스에 종속되지 않아야 하거나, 여러 독립적인 사용처에 제공되어야 하거나, 특정 지갑 코드와 분리되어야 할 때 가장 적합합니다. 하나의 지갑과 긴밀히 결합된 환경에서는 내장형 인덱서가 더 간단할 수 있고, 노드가 이미 보유한 데이터만 필요한 사용처라면 Zebra의 RPC를 직접 사용할 수 있습니다.

## 구성 방식

Zinder는 작업을 여러 프로세스로 나누며, 각 프로세스에는 하나의 역할만 있습니다.

| 실행 구성 요소 | 역할 |
|:--|:--|
| `zinder-ingest` | 정규 체인 저장소(RocksDB)에 쓰는 유일한 구성 요소입니다. 노드를 따라가고, 체인 재구성을 처리하며, 실시간 메모리풀 상태를 유지합니다 |
| `zinder-projector` | 지갑 저장소에 쓰는 유일한 구성 요소입니다. 지갑에 맞춘 체인 뷰를 만들고 따라갑니다 |
| `zinder-query` | 네이티브 `WalletQuery` gRPC API를 제공합니다 |
| `zinder-compat-lightwalletd` | 같은 데이터를 바탕으로 lightwalletd의 `CompactTxStreamer` API를 제공합니다 |

선택 사항인 탐색기 영역(`zinder-explorer`와 `ExplorerQuery`)은 블록 요약, 거래 세부 정보, 메모리풀 뷰와 검색 기능을 제공합니다. 또 다른 선택 사항인 어댑터는 CipherScan 탐색기의 REST 및 WebSocket API를 제공합니다. 둘 다 릴리스 이미지에 포함되지 않습니다.

각 실행 구성 요소는 `/healthz`, `/readyz`, `/metrics`을 제공합니다. 읽기 전용 구성 요소는 자체 체인 저장소와 지갑 저장소가 정확히 같은 체인 상태를 가리킬 때만 준비 완료 상태를 보고합니다.

## 연결 방법

* **기존 경량 지갑**은 기존 lightwalletd 통합을 유지하면서 `zinder-compat-lightwalletd`를 가리키도록 설정합니다. Zinder 문서는 프로토콜 호환성과 지원 여부를 구분합니다. 특정 지갑을 지원한다고 하려면 현재 릴리스가 종단 간 인증을 통과해야 합니다. 릴리스 0.10.0에서 `GetLightdInfo` 프로토콜 버전 필드가 수정되어 Zingo가 동기화할 수 있게 되었습니다.
* **네이티브 클라이언트**는 고정된 상태에 대한 조회, 압축 블록, 체인 및 메모리풀 이벤트 스트림, 그리고 유형이 지정된 거부 사유가 포함된 브로드캐스트 결과를 위해 `zinder-query`를 호출합니다.
* **Rust 애플리케이션**은 원격 연결을 우선하는 SDK인 `zinder-client` 크레이트를 사용해 저장소 스택을 연결하지 않고도 `zinder-query`에 연결합니다.
* **탐색기와 백엔드**는 지갑 조회 기능을 선택 사항인 `ExplorerQuery` 영역과 함께 사용합니다.

## 실행하기

업스트림 빠른 시작에서는 먼저 [Z3 스택](/zcash-tech/z3-stack)으로 노드를 시작한 다음, Zinder 체크아웃에서 Docker Compose를 사용해 Zinder를 실행합니다.

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Mainnet용 및 Zakura 노드용 환경 파일(`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`)은 그 옆에 있습니다. 0.11.0부터 Compose 파일은 Z3를 전제로 하지 않습니다. 환경 파일에 노드의 네트워크, 쿠키 볼륨, RPC 주소를 지정해야 합니다.

기본 호스트 포트(Testnet은 10000을 더합니다):

| 서비스 | Mainnet | Testnet |
|:--|:--|:--|
| 네이티브 `WalletQuery` gRPC | 9102 | 19102 |
| lightwalletd 호환 gRPC | 9067 | 19067 |
| 준비 상태: 수집 / 프로젝터 / 쿼리 / 호환 계층 | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

두 지갑 포트 모두 루프백 주소에 바인딩됩니다. 다음 명령으로 확인하세요.

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

그 밖의 배포 방법:

* `ghcr.io/zcashfoundation/`의 **릴리스 이미지**: 네 가지 실행 구성 요소에 더해 `zinder-wallet-serving`(하나의 볼륨을 하나의 컨테이너에 연결할 수 있는 호스트를 위한 수집, 프로젝터, 네이티브 쿼리 통합 컨테이너. lightwalletd 어댑터는 포함되지 않음)와 `zinder-canonical-runtime`(수집 전용)가 있습니다.
* x86-64(x86-64-v3 CPU 필요) 및 AArch64용 **Linux 바이너리**. glibc 2.34 이상이 필요합니다. Debian 12가 인증된 기준 환경입니다. 각 릴리스에는 SBOM와 서명된 SLSA 출처 증명이 포함됩니다.

### 노드가 제공해야 하는 것

* **아카이브 노드**여야 합니다. 0.11.0부터 `zinder-ingest`는 가지치기된 노드를 대상으로 시작하지 않습니다.
* Zebra **7.0.0** 또는 Zakura **1.8.6**을 사용해야 합니다. 릴리스별 배포 경로에서 인증하는 노드 버전은 이 두 가지입니다.
* `zinder-wallet-serving` 이미지에는 노드의 **인덱서 gRPC 엔드포인트**가 필요합니다(`ZINDER_NODE__INDEXER_GRPC_ADDR`, Zebra의 `indexer_listen_addr`, Mainnet에서는 8155 포트). 루프백이 아닌 주소의 Zakura 인덱서에는 상호 TLS가 필요하며, Zinder는 0.11.0부터 이를 지원합니다.

### Mainnet 용량 산정

지갑 제공 실행 안내서 기준:

* **메모리 8GB 이상**이 필요합니다. 측정된 최대 사용량은 수집 프로세스 약 2.6GiB, 빌드 중 프로젝터 약 2.7GiB, 쿼리 프로세스 최대 약 1.4GiB입니다.
* Mainnet 지갑 저장소를 만들 때 볼륨에 **여유 공간 약 130GB**를 확보하세요.
* 제네시스부터 Mainnet을 빌드한 측정 사례에서는 체인 저장소에 **약 4시간**(스테이징 공간 약 310GB), 지갑 저장소에 **2시간 이상**이 걸렸습니다. 제공된 빌드 제한 시간은 Testnet에만 맞춰져 있습니다. Mainnet에서는 각각 24시간과 12시간 이상으로 늘리세요. 그렇지 않으면 빌드가 재시작되어 끝나지 않습니다.

## 알아둘 만한 릴리스 노트

| 버전 | 날짜 | 운영자에게 중요한 변경 사항 |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | 기본 체인 재구성 범위를 1000블록으로 늘렸습니다. Zebra 7과 Zakura가 블록을 확정하는 깊이입니다. 되돌릴 수 없습니다. 이전 릴리스는 범위가 늘어난 저장소를 열 수 없습니다 |
| 0.9.0 | 2026-11-12 | 새 `zinder-wallet-serving` 및 `zinder-canonical-runtime` 이미지 |
| 0.10.0 | 2026-11-13 | **NU7 블록을 디코딩하는 첫 릴리스입니다.** 0.9.0 및 이전 버전은 첫 NU7 블록에서 멈춥니다. 네이티브 프로토콜 개정판 8이 적용되었습니다. 수집과 쿼리를 함께 업그레이드하고 네이티브 클라이언트도 함께 업그레이드하세요 |
| 0.11.1 | 2026-11-14 | Zakura 1.8.6을 Zebra 7.0.0과 함께 인증했습니다. 노드 인덱서에 대한 상호 TLS를 지원하고 가지치기된 노드는 거부합니다. 0.11.0은 크레이트로만 배포되었으므로 0.11.1을 배포하세요 |
| 0.12.0 | 2026-11-14 | 준비 상태 및 종료 관련 수정. 탐색기 재생이 빨라졌으며 디스크 여유 공간이 줄면 일시 중지됩니다 |

## 흔한 실수

**프로덕션 소프트웨어로 간주하기.** 프로젝트는 스스로를 알파 버전이라고 부릅니다. 프로젝트 표현에 따르면 로컬 Compose 배포가 정상 작동해도 “그 자체만으로 프로덕션 인증을 받은 것은 아닙니다”.

**가지치기된 노드를 연결하기.** 수집 프로세스가 시작 단계에서 종료됩니다. 아카이브 Zebra 또는 Zakura 노드를 사용하세요.

**gRPC 포트를 직접 공개하기.** 두 지갑 포트가 루프백 주소에 바인딩되는 데에는 이유가 있습니다. 인터넷에 공개하기 전에 직접 관리하는 프록시에 TLS, 인증, 속도 제한, 할당량을 적용하세요.

**실행 구성 요소를 하나씩 업그레이드하기.** 여러 릴리스에서 네이티브 프로토콜 개정판이나 저장소 형식이 변경됩니다. Zinder 서비스를 함께 업그레이드하고, 같은 전환 시점에 네이티브 클라이언트도 업데이트하세요.

**프로토콜이 지원되면 지갑도 지원된다고 가정하기.** lightwalletd 어댑터는 프로토콜을 처리하지만, Zinder는 특정 지갑의 현재 릴리스가 종단 간 인증을 통과한 뒤에만 해당 지갑을 지원한다고 밝힙니다.

## 관련 페이지

* [경량 지갑 노드](/zcash-tech/lightwallet-nodes) — 경량 지갑 서버의 역할과 볼 수 있는 데이터
* [Zaino](/zcash-tech/zaino) — Zingo Labs의 Rust 인덱서
* [인덱서 벤치마크: Zaino 대 Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3 스택](/zcash-tech/z3-stack) — Zebra + Zallet. Zinder 빠른 시작에서 사용하는 노드 구성
* [Zebra 전체 노드](/zcash-tech/zebra-full-node) 및 [Zakura 노드](/zcash-tech/zakura-node) — Zinder에서 인증하는 두 노드

## 더 알아보려면

* [Zinder GitHub 저장소](https://github.com/ZcashFoundation/zinder)
* [Zinder 릴리스](https://github.com/ZcashFoundation/zinder/releases) 및 [변경 로그](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Zinder의 의미와 범위](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [VM에 배포하기](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) 및 [지갑 제공 이미지](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md) 실행 안내서

**마지막 업데이트:** 2026년 11월
