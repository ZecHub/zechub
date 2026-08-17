<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zakura Node

> 🇧🇷 [포르투갈어 버전](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura는 확장성을 위해 구축된 Zcash의 무료 오픈 소스 풀 노드 구현입니다. [Zebra](Zebra_Full_Node.md)에서 포크되었으며 **Valar Group**과 **Project Tachyon**의 협업을 통해 개발된 Zakura는 획기적으로 더 빠른 동기화, 네이티브 블록 프루닝, 그리고 레거시 `zcashd` 도구를 위한 호환성 계층을 제공합니다. 버전 1.0.0은 2026년 7월 15일에 출시되었습니다.

---

## 핵심 요약

- Zakura는 **합의 호환 Zcash 풀 노드**로, Zebra와 zcashd의 대안이며 Zebra에서 포크되었습니다.
- 블록체인 동기화는 Zebra보다 약 **5배 더 빠르며**, 스냅샷 부트스트래핑은 **2분 이내**에 완료됩니다.
- **네이티브 블록 프루닝**을 통해 운영자는 훨씬 적은 디스크 공간으로 풀 노드를 실행할 수 있습니다(프루닝된 스냅샷 약 11GB, 전체 Zebra 노드는 300GB).
- **zcashd RPC 호환 모드**를 통해 기존 지갑과 통합 도구를 수정 없이 사용할 수 있습니다.
- **실험적 P2P 전송 계층**(기본적으로 비활성화됨)은 DoS 저항형 가십과 함께 500ms 미만의 블록 전파를 목표로 합니다.
- 2026년 중반에 활성화된 Zcash 네트워크 업그레이드인 **Ironwood (NU6.3)** 와 호환됩니다.
- **Sean Bowe**(Zcash 공동 창립자, Project Tachyon)와 **Dev Ojha**(Valar Group)가 주도합니다.

---

## Zakura란 무엇인가요?

Zakura는 대규모 운영 환경에 적합하도록 처음부터 설계된 Zcash 풀 노드입니다. Zebra와 합의 호환성을 공유한다는 점에서 동일한 Zcash 프로토콜 규칙을 검증하고 따르지만, Zakura는 Zcash 풀 노드 운영 장벽을 낮추기 위한 중요한 엔지니어링 개선 사항을 도입했습니다.

이 프로젝트는 **Project Tachyon**(Zcash의 원래 암호공학 엔지니어 중 한 명인 Sean Bowe가 주도)과 **Valar Group**(Dev Ojha가 주도)의 공동 작업입니다. 이들은 차세대 Zcash 프로토콜 개선에 집중하고 있으며, Zakura는 그 작업을 위한 기준 노드 역할을 합니다.

---

## 주요 기능

### 5배 더 빠른 체인 동기화

Zakura는 Zebra와 비교해 블록체인 동기화 속도가 약 5배 더 빠릅니다. 따라서 빠르게 노드를 띄워야 하거나 다운타임에서 복구해야 하는 운영자에게 훨씬 더 실용적입니다.

### 스냅샷 부트스트래핑

Zakura는 초기 동기화 시간을 획기적으로 줄여주는 사전 구축 체인 스냅샷을 제공합니다:

| 부트스트랩 방식 | 시간 |
|-----------------|------|
| 아카이브 스냅샷 | 약 37분 |
| 프루닝된 스냅샷 | **2분 이내** |
| Zebra (전체 동기화) | 약 20시간 |

프루닝된 스냅샷은 약 **11GB**로, 제네시스부터 동기화하는 것과 비교해 **680배 더 빠른** 노드 부트스트랩을 가능하게 합니다.

### 네이티브 블록 프루닝

Zakura는 설정 가능한 블록 프루닝을 지원하여, 노드 운영자가 얼마나 많은 체인 기록을 보관할지 정의할 수 있습니다. 이 덕분에 저장 공간이 제한된 하드웨어에서도 풀 노드를 실용적으로 운영할 수 있으며, 전체 과거 체인이 필요하지 않은 검증자, 개발자, 인프라 제공자에게 유용합니다.

### zcashd RPC 호환 모드

Zakura에는 레거시 `zcashd` JSON-RPC 인터페이스를 재현하는 호환 모드가 포함되어 있습니다. `zcashd` RPC에 의존하는 기존 지갑, 거래소, 통합 시스템은 코드 변경 없이 Zakura로 전환할 수 있습니다.

### 실험적 P2P 전송 계층

Zakura는 차세대 피어 투 피어 전송 계층을 탑재하고 있으며, 현재는 **기본적으로 비활성화**되어 있습니다. 활성화하면 다음을 목표로 합니다:

- 네트워크 전반에서 최악의 경우에도 500ms 미만의 블록 전파
- 더 효율적인 트랜잭션 릴레이를 위한 멤풀 집계
- 네트워크 복원력을 높이기 위한 DoS 저항형 가십 프로토콜

이 계층은 Project Tachyon 아래에서 개발 중인 향후 Zcash 네트워크 수준 개선 사항의 미리보기라고 할 수 있습니다.

### Ironwood (NU6.3) 호환

Zakura는 2026년 중반 Zcash 메인넷에서 활성화된 Ironwood 네트워크 업그레이드(NU6.3)와 완전히 호환됩니다.

---

## Zakura는 다른 Zcash 노드와 어떤 관계가 있나요?

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 언어 | C++ (Bitcoin에서 포크) | Rust | Rust (Zebra에서 포크) |
| 상태 | 지원 중단 예정 | 활성 | 활성 (v1.0.0, 2026년 7월) |
| 동기화 속도 | 기준 | 약 1배 | 약 5배 더 빠름 |
| 블록 프루닝 | 아니요 | 아니요 | 예 |
| zcashd RPC 호환성 | 기본 지원 | 부분 지원 | 예 (호환 모드) |
| 스냅샷 부트스트랩 | 아니요 | 아니요 | 예 (<2분) |
| 실험적 P2P | 아니요 | 아니요 | 예 (선택 활성화) |

---

## 시작하기

다운로드 옵션, 스냅샷, 설정 문서는 다음에서 확인할 수 있습니다:

- **다운로드 및 설정 가이드:** [zakura.com/download](https://zakura.com/download/)
- **체인 스냅샷:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **소스 코드:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## 관련 페이지

- [Zebra 풀 노드](Zebra_Full_Node.md) — Zakura가 포크된 상위 Zcash 풀 노드
- [Zaino 인덱서](Zaino.md) — Zebra 및 Zakura와 호환되는 Rust 기반 인덱서
- [풀 노드](Full_Nodes.md) — Zcash 풀 노드 옵션 개요
- [라이트월렛 노드](Lightwallet_Nodes.md) — 경량 클라이언트 대안

## 리소스

- [Introducing Zakura — 발표](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura 웹사이트](https://zakura.com/)
- [X/Twitter의 Zakura](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
