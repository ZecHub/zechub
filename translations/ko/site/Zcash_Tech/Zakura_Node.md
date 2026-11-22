<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zakura 노드

Zakura는 확장성을 고려해 구축된 Zcash용 무료 오픈 소스 풀 노드 구현체입니다. [Zebra](Zebra_Full_Node.md)에서 포크되었으며, **Valar Group**와 **Project Tachyon**의 협력을 통해 개발되었습니다. Zakura는 훨씬 빠른 동기화, 기본 블록 정리 기능, 레거시 `zcashd` 도구와의 호환성 계층을 제공합니다. 버전 1.0.0은 2026년 7월 15일에 출시되었습니다. 이후 빠르게 새 버전이 출시되었습니다. 1.7.0(2026년 10월 22일)은 메인넷에서 NU7를 활성화했으며, 1.8 시리즈는 11월에 이어 출시되었습니다.

---

## 요약

- Zakura은 **합의 호환 Zcash 풀 노드**로, Zebra에서 분기된 Zebra 및 zcashd의 대안입니다.
- 블록체인 동기화 속도는 Zebra보다 약 **5배 빠르며**, 스냅샷 부트스트랩은 **2분 이내**에 완료됩니다.
- **네이티브 블록 프루닝**을 사용하면 운영자는 훨씬 적은 디스크 공간으로 풀 노드를 실행할 수 있습니다(프루닝된 스냅샷은 약 11 GB, 전체 Zebra 노드는 300 GB).
- **zcashd RPC 호환 모드**를 사용하면 기존 지갑과 통합 기능을 수정 없이 이용할 수 있습니다.
- **실험적인 P2P 전송 계층**(기본적으로 비활성화)은 DoS 공격에 강한 가십 프로토콜을 사용해 블록 전파 시간을 500ms 미만으로 단축하는 것을 목표로 합니다.
- Zcash 네트워크 업그레이드인 **Ironwood(NU6.3)**과 호환됩니다. 이 업그레이드는 2026년 중반에 활성화되었습니다.
- **NU7**를 따릅니다. Zakura 1.7.0은 이를 메인넷에서 활성화하는 릴리스입니다. 각 릴리스는 배포 후 몇 주가 지나면 지원 종료 블록에서 실행을 중단하므로, 정기적으로 업그레이드할 계획을 세우세요(아래의 실행 전 확인 사항 참조).
- **Zakura Common**(v1.3.0, 2026년 8월)은 지갑이 비공개 거래를 구성하는 데 사용하는 암호화 연산을 Zakura의 벤치마크 기준으로 많은 경우 3초 이상에서 200ms 미만으로 단축합니다.
- **Sean Bowe**(Zcash 공동 창립자, Project Tachyon)와 **Dev Ojha**(Valar Group)가 이끌고 있습니다.

---

## Zakura란 무엇인가요?

Zakura는 대규모 운영 환경에 적합하도록 처음부터 설계된 Zcash 풀 노드입니다. Zebra와 합의 호환성을 공유하므로 동일한 Zcash 프로토콜 규칙에 따라 검증하고 작동하지만, Zakura는 Zcash 풀 노드를 더 쉽게 운영할 수 있도록 여러 중요한 엔지니어링 개선 사항을 도입했습니다.

이 프로젝트는 **Project Tachyon**(Zcash의 초기 암호화 엔지니어 중 한 명인 Sean Bowe가 이끔)과 **Valar Group**(Dev Ojha가 이끔)의 공동 작업입니다. 두 팀은 차세대 Zcash 프로토콜 개선에 중점을 두며, Zakura는 해당 작업의 참조 노드 역할을 합니다.

---

## 주요 기능

### 체인 동기화 속도 5배 향상

Zakura는 Zebra보다 블록체인 동기화 속도가 약 5배 빠릅니다. 따라서 노드를 신속히 설정하거나 가동 중단 후 복구해야 하는 운영자가 훨씬 실용적으로 사용할 수 있습니다.

### 스냅샷을 이용한 초기 설정

Zakura는 초기 동기화 시간을 크게 줄여 주는 사전 구축 체인 스냅샷을 제공합니다.

| Bootstrap 방식 | 시간 |
|-----------------|------|
| 아카이브 스냅샷 | ~37분 |
| 정리된 스냅샷 | **2분 이내** |
| Zebra (전체 동기화) | ~20시간 |

정리된 스냅샷은 약 **11 GB**이며, 제네시스 블록부터 동기화하는 것보다 노드 초기 설정이 **680배 빠릅니다**.

### 기본 블록 정리

Zakura는 설정 가능한 블록 정리 기능을 지원하므로, 노드 운영자가 보관할 체인 기록의 양을 지정할 수 있습니다. 따라서 저장 공간이 제한된 하드웨어에서도 풀 노드를 실용적으로 실행할 수 있습니다. 전체 체인 기록이 필요하지 않은 검증자, 개발자, 인프라 제공자에게 유용합니다.

### zcashd RPC 호환 모드

Zakura에는 레거시 `zcashd` JSON-RPC 인터페이스를 재현하는 호환 모드가 포함되어 있습니다. `zcashd` RPC에 의존하는 기존 지갑, 거래소, 통합 기능은 코드를 변경하지 않고 Zakura로 전환할 수 있습니다.

### 실험적 P2P 전송 계층

Zakura에는 차세대 피어 투 피어 전송 계층이 포함되어 있으며, 현재 **기본적으로 비활성화되어 있습니다**. 활성화하면 다음을 목표로 합니다.

- 네트워크 전체에서 최악의 경우에도 블록 전파 시간을 500ms 미만으로 유지
- 더 효율적인 거래 중계를 위한 멤풀 통합
- 네트워크 복원력을 높이는 서비스 거부 공격 방어형 가십 프로토콜

이 계층은 Project Tachyon에서 개발 중인 향후 Zcash 네트워크 수준 개선 사항의 미리보기입니다.

### Ironwood (NU6.3) 호환

Zakura는 2026년 중반 Zcash 메인넷에서 활성화된 Ironwood 네트워크 업그레이드(NU6.3)와 완전히 호환됩니다.

### NU7

2026년 10월 22일에 출시된 Zakura 1.7.0은 메인넷에서 NU7를 활성화하는 버전입니다([릴리스 노트](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). 업그레이드 후에도 체인을 따라가려면 노드에 1.7.0 이상 버전이 필요합니다. [NU7](NU7.md)에서 업그레이드로 변경되는 사항을 확인할 수 있습니다.

---

## Zakura Common: 지갑 암호화 속도 향상

2026년 8월, Zakura 팀은 Zakura Common을 출시했습니다. 이는 Zcash 지갑과 노드가 사용하는 암호화 라이브러리를 가속화한 포크 모음입니다. Zakura는 버전 1.3.0에서 새 스택으로 전환했으며, Vizor Wallet은 이를 통합한 초기 지갑 중 하나입니다.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Zakura의 자체 벤치마크에 따르면 다음과 같습니다.

| 작업 | 속도 향상 |
|--|--|
| 모바일에서 증명 생성 | 14배 이상(데스크톱: 5배 이상) |
| Sinsemilla 해싱 | 21배 이상 |
| zk-SNARK 검증 | 4~8배 |
| 시험 복호화 | 1.5배 이상 |

사용자가 가장 체감할 수 있는 변화는 대기 시간입니다. 비공개 거래를 생성하는 데 지갑에서 3초 넘게 걸리곤 했습니다. Zakura Common을 사용하면 많은 경우 200ms 미만으로 줄어듭니다. 이는 네트워크에서 거래를 확인하는 데 걸리는 시간이 아니라, 기기에서 거래를 준비하는 데 걸리는 시간입니다.


---

## Zakura와 다른 Zcash 노드의 관계

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 언어 | C++ (Bitcoin에서 포크) | Rust | Rust (Zebra에서 포크) |
| 상태 | 지원 중단 | 활성 | 활성 (v1.0.0, 2026년 7월; v1.8.8, 2026년 11월) |
| 동기화 속도 | 기준 | ~1배 | ~5배 빠름 |
| 블록 정리 | 아니요 | 아니요 | 예 |
| zcashd RPC 호환성 | 기본 제공 | 부분 지원 | 예 (호환 모드) |
| 스냅샷 초기 설정 | 아니요 | 아니요 | 예 (2분 미만) |
| 실험적 P2P | 아니요 | 아니요 | 예 (선택적 활성화) |

---

## 시작하기

다운로드 옵션, 스냅샷, 설정 문서는 다음에서 확인할 수 있습니다.

- **다운로드 및 설정 안내:** [zakura.com/download](https://zakura.com/download/)
- **체인 스냅샷:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **소스 코드:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **릴리스 노트:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### 라이트 지갑 지원

Zakura는 라이트 지갑 서버가 아닙니다. 라이트 지갑이 사용하는 gRPC 프로토콜인 `CompactTxStreamer`를 구현하지 않으므로, Zashi(이전 명칭 Zodl) 같은 지갑은 `zakurad`에 직접 연결할 수 없습니다. 라이트 지갑을 지원하려면 다음 중 하나를 앞단에서 실행하십시오.

- [Zaino](Zaino.md) (권장)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer)의 인덱서 및 라이트 지갑 서버 Zcash Labs. 이 서버는 임베디드 방식으로 자체 프로세스에 포함하거나 JSON-RPC를 통해 원격으로 연결한 Zakura 노드에서 체인을 읽습니다.

Zakura 자체 인덱서의 gRPC(기본적으로 비활성화되어 있는 `[rpc]` 섹션의 `indexer_listen_addr`)는 별도의 인터페이스입니다. 직접 운영하는 신뢰할 수 있는 소프트웨어를 위한 블록, 멤풀, 체인 끝 스트림이지 라이트 지갑 프로토콜이 아닙니다. 루프백 주소에서만 평문을 허용하며, 그 외의 주소에는 상호 TLS가 필요합니다([설정 참조](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### 실행 전 유의 사항

1.8 릴리스 노트에서 운영자가 놓치기 쉬운 몇 가지 사항을 소개합니다.

- **릴리스에는 만료일이 있습니다.** 모든 Zakura 릴리스에는 지원 종료 높이가 있으며, 해당 버전을 실행하는 메인넷 노드는 그 블록에서 작동을 멈춥니다. 1.8.x 릴리스는 “2026년 12월 3일경, 블록 3,643,309까지 메인넷에서 지원”되며, 약 3일 전부터 업그레이드 경고가 표시됩니다([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). 해당 날짜 전에 최신 릴리스를 확인하고, 업그레이드 계획 없이 스크립트나 배포 템플릿에서 이전 버전을 고정하지 마십시오.
- **1.8.0부터 x86-64 CPU가 필요합니다.** 릴리스 바이너리와 Docker 이미지는 BMI2/ADX 명령어를 사용하므로 Intel Broadwell, AMD Zen 이상이 필요합니다. 구형 CPU에서는 `zakurad`가 시작 중에 종료되며, 누락된 확장 기능을 표시하는 오류가 나타납니다. 이러한 컴퓨터에서 실행하려면 `--features portable`로 소스 코드에서 빌드하십시오([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **이전 버전에서 생성한 설정과 기본 P2P 관련 사항.** `zakurad generate`는 이전에 `peer_memory_budget_bytes = 8589934592`(8 GiB)를 기록했습니다. 1.8.3부터 이 설정으로 기본 P2P 연결 수가 약 절반으로 줄며, 4 GiB 이하면 기본 P2P를 실행하는 노드가 시작되지 않습니다. `[network.zakura] peer_memory_budget_bytes`를 최소 15 GiB로 높이거나 해당 줄을 삭제해 새 기본값인 15 GiB를 사용하십시오([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **상태 도구가 `zakurad`에 포함되었습니다.** 1.8.3부터 독립 실행형 `zakura-prune-state` 및 `zakura-rollback-state` 바이너리는 Docker를 포함해 더 이상 배포되지 않습니다. 대신 `zakurad prune-state`와 `zakurad rollback-state`를 사용하십시오. 같은 인수를 사용하지만 `zakura.toml`를 불러오므로, 특정 상태 디렉터리를 지정하려면 `--cache-dir`를 전달하십시오.

---

## 관련 페이지

- [Zebra 풀 노드](Zebra_Full_Node.md) — Zakura가 포크한 상위 Zcash 풀 노드
- [Zaino 인덱서](Zaino.md) — Rust 기반 인덱서로, Zebra 및 Zakura와 호환됩니다.
- [풀 노드](Full_Nodes.md) — Zcash 풀 노드 옵션 개요
- [라이트월렛 노드](Lightwallet_Nodes.md) — 경량 클라이언트 대안

## 자료

- [Zakura 소개 — 발표](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura 웹사이트](https://zakura.com/)
- [Zakura X/Twitter](https://x.com/ZakuraZcash)에서
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Common 발표](https://zakura.com/announcements/zakura-common/)
