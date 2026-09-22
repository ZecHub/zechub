<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zakura 노드

> 🇧🇷 [포르투갈어 버전](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura는 확장성을 위해 구축된 Zcash용 무료 오픈 소스 풀 노드 구현체입니다. [Zebra](Zebra_Full_Node.md)에서 포크되었으며 **Valar Group**과 **Project Tachyon**의 협업을 통해 개발된 Zakura는 획기적으로 더 빠른 동기화, 네이티브 블록 프루닝, 그리고 레거시 `zcashd` 도구를 위한 호환성 계층을 제공합니다. 버전 1.0.0은 2026년 7월 15일에 출시되었습니다.

---

## 요약

- Zakura는 **합의 호환 Zcash 풀 노드**입니다. 즉, Zebra에서 포크된 Zebra 및 zcashd의 대안입니다.
- 블록체인 동기화는 Zebra보다 약 **5배 빠르며**, 스냅샷 부트스트래핑은 **2분 이내**에 완료됩니다.
- **네이티브 블록 프루닝**을 통해 운영자는 훨씬 적은 디스크 공간으로 풀 노드를 실행할 수 있습니다(프루닝 스냅샷 약 11GB, 전체 Zebra 노드는 300GB).
- **zcashd RPC 호환 모드**를 사용하면 기존 지갑과 통합 기능을 수정 없이 사용할 수 있습니다.
- 기본적으로 비활성화된 **실험적 P2P 전송 계층**은 DoS 방어형 가십을 통해 500ms 미만의 블록 전파를 목표로 합니다.
- 2026년 중반에 활성화된 Zcash 네트워크 업그레이드인 **Ironwood (NU6.3)**와 호환됩니다.
- **Zakura Common**(v1.3.0, 2026년 8월)은 지갑이 프라이빗 트랜잭션을 구축하는 데 사용하는 암호화를 가속합니다. Zakura의 벤치마크에 따르면, 많은 경우 3초 이상에서 200ms 미만으로 단축됩니다.
- **Sean Bowe**(Zcash 공동 창립자, Project Tachyon)와 **Dev Ojha**(Valar Group)가 이끌고 있습니다.

---

## Zakura란 무엇인가요?

Zakura는 대규모 환경에서 즉시 운영 가능하도록 처음부터 설계된 Zcash 풀 노드입니다. Zebra와 합의 호환성을 공유하므로 동일한 Zcash 프로토콜 규칙을 검증하고 따르지만, Zakura는 Zcash 풀 노드 운영의 진입 장벽을 낮추기 위한 상당한 엔지니어링 개선을 도입합니다.

이 프로젝트는 **Project Tachyon**(Zcash의 초기 암호학 엔지니어 중 한 명인 Sean Bowe가 이끔)과 **Valar Group**(Dev Ojha가 이끔)의 공동 작업입니다. 이들은 차세대 Zcash 프로토콜 개선에 집중하며, Zakura는 해당 작업의 참조 노드 역할을 합니다.

---

## 주요 기능

### 5배 더 빠른 체인 동기화

Zakura는 Zebra와 비교해 약 5배 더 빠른 블록체인 동기화를 달성합니다. 따라서 신속하게 노드를 가동하거나 다운타임 후 복구해야 하는 운영자에게 훨씬 더 실용적입니다.

### 스냅샷 부트스트래핑

Zakura는 초기 동기화 시간을 크게 줄여 주는 사전 구축 체인 스냅샷을 제공합니다.

| 부트스트랩 방식 | 시간 |
|-----------------|------|
| 아카이브 스냅샷 | 약 37분 |
| 프루닝 스냅샷 | **2분 이내** |
| Zebra(전체 동기화) | 약 20시간 |

프루닝 스냅샷은 약 **11GB**로, 제네시스부터 동기화하는 것과 비교해 **680배 더 빠른** 노드 부트스트랩을 제공합니다.

### 네이티브 블록 프루닝

Zakura는 구성 가능한 블록 프루닝을 지원하여 노드 운영자가 보존할 체인 기록의 양을 정의할 수 있습니다. 따라서 전체 과거 체인이 필요하지 않은 검증자, 개발자, 인프라 제공자에게 유용하며, 저장 공간이 제한된 하드웨어에서도 풀 노드를 실용적으로 운영할 수 있습니다.

### zcashd RPC 호환 모드

Zakura에는 레거시 `zcashd` JSON-RPC 인터페이스를 재현하는 호환 모드가 포함되어 있습니다. `zcashd` RPC에 의존하는 기존 지갑, 거래소 및 통합 기능은 코드 변경 없이 Zakura로 전환할 수 있습니다.

### 실험적 P2P 전송 계층

Zakura에는 현재 **기본적으로 비활성화된** 차세대 피어 투 피어 전송 계층이 포함되어 있습니다. 활성화하면 다음을 목표로 합니다.

- 네트워크 전체에서 최악의 경우에도 500ms 미만의 블록 전파
- 더 효율적인 트랜잭션 릴레이를 위한 멤풀 집계
- 네트워크 복원력을 높이는 DoS 방어형 가십 프로토콜

이 계층은 Project Tachyon에서 개발 중인 미래 Zcash 네트워크 수준 개선 사항의 미리보기입니다.

### Ironwood (NU6.3) 호환

Zakura는 2026년 중반 Zcash 메인넷에서 활성화된 Ironwood 네트워크 업그레이드(NU6.3)와 완전히 호환됩니다.

---

## Zakura Common: 더 빨라진 지갑 암호화

2026년 8월, Zakura 팀은 Zcash 지갑과 노드가 의존하는 암호화 라이브러리의 가속화된 포크 모음인 Zakura Common을 출시했습니다. Zakura는 버전 1.3.0에서 새 스택으로 전환했으며, Vizor Wallet은 이를 통합한 최초의 지갑 중 하나입니다.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Zakura 자체 벤치마크에 따르면 다음과 같습니다.

| 작업 | 속도 향상 |
|--|--|
| 모바일에서의 증명 생성 | 14배 이상(데스크톱: 5배 이상) |
| Sinsemilla 해싱 | 21배 이상 |
| zk-SNARK 검증 | 4–8배 |
| 시험 복호화 | 1.5배 이상 |

사용자에게 가장 눈에 띄는 변화는 대기 시간입니다. 프라이빗 트랜잭션을 구축하는 데 이전에는 지갑에서 3초 이상이 걸렸습니다. Zakura Common을 사용하면 많은 경우 200ms 미만이 소요될 수 있습니다. 이는 네트워크가 트랜잭션을 확인하는 시간이 아니라 기기가 트랜잭션을 준비하는 데 쓰는 시간입니다.


---

## Zakura와 다른 Zcash 노드의 관계

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| 언어 | C++(Bitcoin에서 포크) | Rust | Rust(Zebra에서 포크) |
| 상태 | 사용 중단됨 | 활성 | 활성(v1.0.0, 2026년 7월) |
| 동기화 속도 | 기준 | 약 1× | 약 5배 빠름 |
| 블록 프루닝 | 아니요 | 아니요 | 예 |
| zcashd RPC 호환 | 네이티브 | 부분적 | 예(호환 모드) |
| 스냅샷 부트스트랩 | 아니요 | 아니요 | 예(2분 미만) |
| 실험적 P2P | 아니요 | 아니요 | 예(옵트인) |

---

## 시작하기

다운로드 옵션, 스냅샷 및 구성 문서는 다음에서 확인할 수 있습니다.

- **다운로드 및 설정 가이드:** [zakura.com/download](https://zakura.com/download/)
- **체인 스냅샷:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **소스 코드:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## 관련 페이지

- [Zebra 풀 노드](Zebra_Full_Node.md) — Zakura가 포크된 업스트림 Zcash 풀 노드
- [Zaino 인덱서](Zaino.md) — Zebra 및 Zakura와 호환되는 Rust 기반 인덱서
- [풀 노드](Full_Nodes.md) — Zcash 풀 노드 옵션 개요
- [라이트월렛 노드](Lightwallet_Nodes.md) — 경량 클라이언트 대안

## 리소스

- [Zakura 소개 — 발표](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura 웹사이트](https://zakura.com/)
- [X/Twitter의 Zakura](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Common 발표](https://zakura.com/announcements/zakura-common/)
