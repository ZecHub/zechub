# Zinder 인덱서

Zinder는 Rust로 작성되어 Zcash Foundation가 배포하는 셀프 호스팅 Zcash 인덱서입니다. Zebra 또는 Zakura 풀 노드에서 체인을 한 번 읽어 일관된 뷰를 저장하고, 여러 지갑, 애플리케이션, 탐색기에 동시에 제공합니다. 기존 라이트 지갑은 lightwalletd 호환 어댑터를 통해 연결할 수 있습니다.

> **Zinder는 알파 버전입니다.** 자체 README에 따르면 네이티브 API, lightwalletd 호환 인터페이스, 저장소 레이아웃과 배포 토폴로지는 변경될 수 있으며, 태그가 지정된 릴리스도 안정성을 보장하지 않습니다. 정확한 버전을 고정하고 호환성을 깨뜨리는 업그레이드에 대비하세요.

## 요약

* **Zebra** 또는 **Zakura**가 체인을 검증합니다. **Zinder**는 노드가 가진 데이터를 인덱싱해 클라이언트에 제공합니다.
* 연결 방법은 2가지입니다. Zinder 자체 `WalletQuery` gRPC API와 lightwalletd의 `CompactTxStreamer` 프로토콜을 사용하는 별도의 어댑터입니다. 따라서 lightwalletd용으로 만들어진 지갑도 코드를 변경하지 않고 연결할 수 있습니다.
* 모든 읽기 작업은 하나의 체인 상태(“에폭”)에 고정되므로, 동기화 배치에 서로 경쟁하는 체인 팁 2개의 데이터가 섞이지 않습니다. 키와 거래정보 보호 스캔은 지갑에 남아 있습니다.
* 하나의 노드를 운영하는 한 운영자가 여러 소비자에게 데이터를 제공하는 환경에 적합합니다. 공개 엔드포인트는 자체 TLS, 인증, 요청 속도 제한 뒤에 두세요.
* 릴리스가 빠르게 이어지고 있으며(2026년 11월 10일부터 14일까지 0.7.0에서 0.12.0으로 업데이트), 여러 릴리스가 호환성을 깨뜨렸습니다. 업그레이드 전에 항상 변경 기록을 확인하세요.

## Zinder의 역할

라이트 지갑은 풀 노드와 직접 통신하지 않습니다. 라이트 지갑은 인덱서에 압축 블록, 트리 상태, 거래 데이터를 요청합니다([라이트월렛 노드](/zcash-tech/lightwallet-nodes) 참고). Zcash 생태계에는 이제 이러한 기능을 제공하는 인덱서가 여러 개 있습니다.

| 인덱서 | 언어 | 유지 관리자 | 연결 대상 | 참고 |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / Zcash 커뮤니티 | Zebra 또는 zcashd | 기존 라이트 지갑 서버 |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra 또는 zcashd | Z3 스택의 선택적 인덱서 프로필 |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | 내장 Zakura 노드 | [Zaino 대 Ztreamer 벤치마크](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) 참고 |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 또는 Zakura 1.8.6(아카이브 노드) | 알파 버전. 네이티브 API와 lightwalletd 어댑터, 선택적 탐색기 읽기 기능 제공 |

Zinder 문서에서는 어떤 경우에 이 인덱서를 선택하는 것이 적합한지 명확히 설명합니다. 체인에 대한 접근을 단일 지갑 프로세스보다 오래 유지하거나, 여러 독립 소비자에게 제공하거나, 특정 지갑의 코드와 분리해야 할 때 특히 유용합니다. 단일 지갑과 긴밀하게 결합된 경우에는 내장 인덱서가 더 간단할 수 있으며, 노드가 이미 보유한 데이터만 필요한 소비자는 Zebra의 RPC를 직접 사용할 수 있습니다.

## 구성 방식

Zinder는 작업을 각각 하나의 역할을 맡는 별도 프로세스로 나눕니다.

| 런타임 | 역할 |
|:--|:--|
| `zinder-ingest` | 정식 체인 저장소(RocksDB)에 기록하는 유일한 프로세스입니다. 노드를 따라가고, 재구성을 처리하며, 실시간 멤풀 상태를 유지합니다. |
| `zinder-projector` | 지갑 저장소에 기록하는 유일한 프로세스입니다. 지갑에 맞는 체인 뷰를 구축하고 업데이트합니다. |
| `zinder-query` | 네이티브 `WalletQuery` gRPC API를 제공합니다. |
| `zinder-compat-lightwalletd` | 동일한 데이터에 기반해 lightwalletd의 `CompactTxStreamer` API를 제공합니다. |

선택적 탐색기 계층(`zinder-explorer`와 `ExplorerQuery`)은 블록 요약, 거래 세부 정보, 멤풀 뷰, 검색 기능을 제공합니다. 선택적 어댑터는 CipherScan 탐색기의 REST 및 WebSocket API를 제공합니다. 두 기능 모두 릴리스 이미지에 포함되지 않습니다.

각 런타임은 `/healthz`, `/readyz`, `/metrics`을 노출합니다. 읽기 프로세스는 체인 저장소와 지갑 저장소의 복제본이 정확히 같은 체인 상태를 가리킬 때만 준비 완료로 보고합니다.

## 연결 방법

* **기존 라이트 지갑**은 기존 lightwalletd 통합 기능을 유지하면서 `zinder-compat-lightwalletd`를 가리키도록 설정합니다. Zinder 문서에서는 프로토콜 호환성과 지원 여부를 구분합니다. 특정 지갑이 지원되는 것으로 간주되려면 현재 릴리스가 종단 간 인증을 통과해야 합니다. 0.10.0 릴리스에서는 `GetLightdInfo` 프로토콜 버전 필드를 수정하여 Zingo가 동기화할 수 있게 했습니다.
* **네이티브 클라이언트**는 `zinder-query`를 호출해 특정 상태에 고정된 읽기, 압축 블록, 체인 및 멤풀 이벤트 스트림, 유형이 지정된 거부 사유가 포함된 브로드캐스트 결과를 이용합니다.
* **Rust 애플리케이션**은 저장소 스택을 연결하지 않고 `zinder-query`에 연결하는 원격 우선 SDK인 `zinder-client` 크레이트를 사용합니다.
* **탐색기와 백엔드**는 지갑 읽기 기능과 선택적 `ExplorerQuery` 계층을 함께 사용합니다.

## 실행 방법

업스트림 빠른 시작 안내에서는 [Z3 스택](/zcash-tech/z3-stack)으로 노드를 실행한 다음 Zinder 체크아웃에서 Docker Compose를 사용해 Zinder를 실행합니다.

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

메인넷용 환경 파일과 Zakura 노드용 환경 파일(`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`)은 해당 파일 옆에 있습니다. 0.11.0부터 Compose 파일은 Z3를 기본 전제로 하지 않습니다. 환경 파일에 노드의 네트워크, 쿠키 볼륨, RPC 주소를 지정해야 합니다.

기본 호스트 포트(테스트넷은 10000을 더합니다):

| 서비스 | 메인넷 | 테스트넷 |
|:--|:--|:--|
| 네이티브 `WalletQuery` gRPC | 9102 | 19102 |
| lightwalletd 호환 gRPC | 9067 | 19067 |
| 준비 상태: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

두 지갑 포트 모두 루프백에 바인딩됩니다. 다음 명령으로 확인하세요.

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

다른 배포 방법:

* `ghcr.io/zcashfoundation/`의 **릴리스 이미지**: 4개 런타임과 `zinder-wallet-serving`(하나의 볼륨을 컨테이너 하나에 연결할 수 있는 호스트를 위한 ingest, projector, 네이티브 query 통합 컨테이너이며 lightwalletd 어댑터는 포함하지 않음), `zinder-canonical-runtime`(ingest만 포함).
* x86-64(x86-64-v3 CPU 필요) 및 AArch64용 **Linux 바이너리**. glibc 2.34 이상이 필요합니다. Debian 12가 인증된 기준 환경입니다. 각 릴리스에는 SBOM와 서명된 SLSA 출처 정보가 포함됩니다.

### 노드 요구 사항

* **아카이브 노드**여야 합니다. 0.11.0부터 `zinder-ingest`는 프루닝된 노드에 연결하면 시작을 거부합니다.
* Zebra **7.0.0** 또는 Zakura **1.8.6**이어야 합니다. 릴리스 배포 경로에서 인증하는 노드 버전은 이 2가지입니다.
* `zinder-wallet-serving` 이미지에는 노드의 **인덱서 gRPC 엔드포인트**가 필요합니다(`ZINDER_NODE__INDEXER_GRPC_ADDR`, Zebra의 `indexer_listen_addr`, 메인넷 포트 8155). 루프백이 아닌 주소의 Zakura 인덱서에는 상호 TLS가 필요하며, Zinder는 0.11.0부터 이를 지원합니다.

### 메인넷 용량 산정

지갑 서비스 운영 안내서에 따르면:

* **메모리는 최소 8 GB**가 필요합니다. 측정된 최대 사용량은 ingest 약 2.6 GiB, 구축 중인 projector 약 2.7 GiB, query 최대 약 1.4 GiB입니다.
* 메인넷 지갑 저장소 구축 시 볼륨에 **약 130 GB의 여유 공간**을 확보하세요.
* 제네시스부터 메인넷을 구축하는 데 걸린 측정 시간은 체인 저장소에 **약 4시간**(스테이징 공간 약 310 GB), 지갑 저장소에 **2시간 이상**이었습니다. 제공된 구축 제한 시간은 테스트넷에만 맞춰져 있습니다. 메인넷에서는 각각 최소 24시간과 12시간으로 늘리세요. 그렇지 않으면 구축이 재시작되어 완료되지 않습니다.

## 알아둘 만한 릴리스 노트

| 버전 | 날짜 | 운영자에게 중요한 변경 사항 |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | 기본 재구성 범위를 1,000블록으로 늘렸습니다. 이 깊이에서 Zebra 7과 Zakura가 블록을 확정합니다. 되돌릴 수 없습니다. 이전 릴리스는 늘어난 저장소를 열 수 없습니다. |
| 0.9.0 | 2026-11-12 | 새로운 `zinder-wallet-serving` 및 `zinder-canonical-runtime` 이미지 |
| 0.10.0 | 2026-11-13 | **NU7 블록을 디코딩하는 첫 릴리스입니다.** 0.9.0 이하 버전은 첫 NU7 블록에서 처리를 중단합니다. 네이티브 프로토콜 개정판 8: ingest와 query를 함께 업그레이드하고, 네이티브 클라이언트도 함께 업그레이드하세요. |
| 0.11.1 | 2026-11-14 | Zebra 7.0.0과 함께 Zakura 1.8.6 인증, 노드 인덱서에 대한 상호 TLS, 프루닝된 노드 거부 기능을 추가했습니다. 0.11.0은 크레이트로만 배포되었으므로 0.11.1을 배포하세요. |
| 0.12.0 | 2026-11-14 | 준비 상태 및 종료 관련 수정, 탐색기 재처리 속도 향상 및 디스크 공간 부족 시 일시 중지 |

## 흔히 하는 실수

**프로덕션 소프트웨어로 취급하는 것.** 이 프로젝트는 스스로를 알파 버전이라고 부릅니다. 프로젝트 자체의 표현대로라면 로컬 Compose 배포가 정상 작동하더라도 “그 자체만으로 프로덕션 인증을 의미하지는 않습니다”.

**프루닝된 노드를 지정하는 것.** ingest가 시작 단계에서 종료됩니다. 아카이브 Zebra 노드 또는 Zakura 노드를 사용하세요.

**gRPC 포트를 직접 공개하는 것.** 두 지갑 포트가 루프백에 바인딩되는 데는 이유가 있습니다. 인터넷에 공개하기 전에 직접 관리하는 프록시에서 TLS, 인증, 요청 속도 제한, 할당량을 설정하세요.

**런타임을 하나씩 따로 업그레이드하는 것.** 여러 릴리스에서 네이티브 프로토콜 개정판이나 저장소 형식이 변경됩니다. Zinder 서비스를 함께 업그레이드하고, 전환 시점에 네이티브 클라이언트도 업데이트하세요.

**프로토콜이 지원되므로 지갑도 지원된다고 가정하는 것.** lightwalletd 어댑터는 프로토콜을 지원하지만, Zinder는 특정 지갑의 현재 릴리스가 종단 간 인증을 통과한 뒤에만 해당 지갑을 지원한다고 명시합니다.

## 관련 페이지

* [라이트월렛 노드](/zcash-tech/lightwallet-nodes) — 라이트 지갑 서버의 역할과 서버가 볼 수 있는 정보
* [Zaino](/zcash-tech/zaino) — Zingo Labs의 Rust 인덱서
* [인덱서 벤치마크: Zaino 대 Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3 스택](/zcash-tech/z3-stack) — Zebra + Zallet, Zinder 빠른 시작 안내에서 사용하는 노드 설정
* [Zebra 풀 노드](/zcash-tech/zebra-full-node) 및 [Zakura 노드](/zcash-tech/zakura-node) — Zinder가 인증하는 2가지 노드

## 더 알아보려면

* [Zinder GitHub 저장소](https://github.com/ZcashFoundation/zinder)
* [Zinder 릴리스](https://github.com/ZcashFoundation/zinder/releases) 및 [변경 기록](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Zinder란 무엇이며 무엇이 아닌가](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [VM에 배포하기](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) 및 [지갑 서비스 이미지](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md) 운영 안내서

**마지막 업데이트:** 2026년 11월
