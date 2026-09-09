<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[웹사이트 방문](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## 사명 선언문

Valar Group은 Zcash 확장, 코인 보유자 거버넌스 강화, 프로토콜의 프라이버시·성능·장기적 회복력 개선에 집중하는 독립 엔지니어링 조직입니다.

이들의 작업은 프로토콜 수준 인프라에 집중되어 있습니다. 여기에는 비공개 토큰 보유자 투표, 고성능 풀 노드 소프트웨어, 지갑 동기화 기술, 그리고 실드된 Zcash를 더 큰 규모에서 더 유용하게 만드는 네트워크 업그레이드가 포함됩니다.

이 조직은 ZEC 보유자가 자신의 선호를 비공개로 표현할 방법을 제공하고, 노드 운영자에게는 더 빠르고 성능이 뛰어난 소프트웨어를 제공하며, 지갑에는 네트워크 참여 비용을 낮추면서 사용자 프라이버시를 보존하는 도구를 제공하는 것을 목표로 합니다.

## 배경

Valar Group은 Osmosis의 공동 창립자이자 Cosmos 출범 팀의 일원이었던 Dev Ojha (ValarDragon)가 이끌고 있습니다. 그는 지난 10년간 zk-SNARKs, BFT 합의, 그리고 실제 운영되는 DeFi 시스템 전반에서 활동했습니다.

Zcash에서 이 그룹의 공개 작업은 2026년 핵심 개발 조직 개편 이후 생태계가 독립적인 프로토콜 팀 중심으로 전환되면서 두드러지게 되었습니다. Valar Group은 Project Tachyon, Shielded Labs, ZODL, Zcash Foundation과 함께 차세대 Zcash 인프라를 구축하는 조직 중 하나로 부상했습니다.

이들의 작업에서 반복되는 주제는 Zcash의 프라이버시 특성이 결제를 넘어 확장되어야 한다는 것입니다. 보유자에게 발행량, 블록 시간 또는 네트워크 업그레이드 범위에 대한 투표를 요청한다면, 신원·잔액·개별 투표를 공개하지 않고 실드된 잔액으로 투표할 수 있어야 합니다. 이러한 요구사항은 Valar Group이 전용 코인 보유자 투표 체인을 설계하고 출시하도록 이끌었습니다.

같은 확장성 및 암호학 배경은 노드 및 동기화 작업에도 영향을 주었습니다. 더 빠른 블록, 가벼운 지갑 동기화, 더 강력한 풀 노드는 가치 저장 수단에 그치지 않고 결제 네트워크 규모로 사용할 수 있는 프라이빗 화폐의 전제 조건으로 다뤄집니다.

## 비전

Valar Group의 공개 자료와 프로젝트 작업은 다음을 수행할 수 있는 Zcash 네트워크를 지향합니다.

- 반복 가능한 거버넌스 프로세스로서 비공개이며 감사 가능한 코인 보유자 투표를 지원합니다.
- 실드된 프라이버시를 희생하지 않고 작업 증명 결제를 확장합니다.
- PIR, 프루닝, 더 빠른 블록 전파를 통해 지갑 및 노드 병목 현상을 줄입니다.
- 독립적인 풀 노드 스택을 제공하여 구현 다양성을 높입니다.
- 포스트퀀텀 대비 및 공식 검토를 거친 프로토콜 업그레이드에 기여합니다.

이 조직은 프로토콜 소유자가 아닌 독립 기여자로 활동합니다. 프로토콜 변경은 여전히 ZIP, 구현, 검토, 커뮤니티 신호 수집 과정을 거칩니다. Valar Group의 역할은 이러한 프로세스를 실용적으로 만드는 시스템을 설계, 구현, 운영 및 오픈소스화하는 것입니다.

## 전략 영역

Valar Group의 작업은 네 가지 영역을 중심으로 이루어집니다.

### 비공개 코인 보유자 거버넌스

Zcash는 자동화된 온체인 프로토콜 제어를 사용하지 않습니다. 코인 보유자 설문조사는 더 광범위한 대략적 합의 과정에 반영되는 자문 신호입니다. Valar Group은 유권자 신원이나 개별 투표 규모를 노출하지 않고 실드된 잔액에서 그러한 신호를 수집할 수 있도록 Tokenholder Voting Chain을 구축했습니다.

현재 설계는 다음을 사용합니다.

- 투표 라운드를 조율하는 전용 Cosmos SDK 애플리케이션 체인.
- 사용 가능한 Ironwood 노트에 대한 스냅샷 증명.
- 투표 금액의 동형 암호화.
- 널리파이어 비소속 증명을 위한 Private Information Retrieval.
- 코디네이터 멀티시그 및 분산 선거 당국.

목표는 이전 토큰 보유자 투표 프로세스를 다른 조직이 운영하고 독립적으로 집계할 수 있는 재사용 가능하고 감사된 지갑 통합형 시스템으로 대체하는 것입니다.

### 노드 소프트웨어 및 네트워크 확장

Valar Group은 Zebra 코드베이스를 기반으로 구축된 Zcash 풀 노드인 Zakura에서 Project Tachyon과 협력합니다. Zakura는 더 빠른 초기 동기화, 프루닝, 스냅샷 부트스트래핑 및 기존 `zcashd` 사용자를 위한 호환성 경로가 필요한 운영자를 위한 고성능 노드로 자리매김하고 있습니다.

관련 확장 작업에는 다음이 포함됩니다.

- NU7 테스트넷에서의 25초 블록 실험을 포함한 더 빠른 목표 블록 시간.
- 향상된 피어 투 피어 블록 전파.
- 실드된 활동이 증가해도 Zcash를 계속 사용할 수 있도록 설계된 풀 노드 기능.

### 지갑 및 동기화 인프라

실드된 지갑은 역사적으로 많은 양의 체인 데이터를 스캔해야 했습니다. Valar Group은 지갑이 전체 널리파이어 세트를 다운로드하거나 관심 있는 노트를 드러내지 않고 필요한 증명을 가져올 수 있도록 PIR 시스템을 개발합니다.

이 작업은 투표 스택과 더 광범위한 지갑 동기화 연구 모두에서 나타납니다. 이 그룹은 또한 ZODL의 모바일 스택에서 사용되는 다중 서버 트랜잭션 제출 및 서버 선택 개선을 포함하여 지갑 측 신뢰성 작업에도 기여했습니다.

### 프로토콜 업그레이드 및 생태계 조율

Valar Group은 Orchard 회로 취약점 이후 Ironwood 대응에 공개적으로 참여하겠다고 약속한 조직 중 하나였습니다. Ironwood는 새로운 실드된 풀을 도입하고, 원래 Orchard 풀을 턴스타일 뒤로 봉인했으며, 유통 공급량을 독립적으로 검증할 수 있는 경로를 복원했습니다. Valar Group은 Project Tachyon, Shielded Labs, ZODL, Zcash Foundation과 함께 아키텍처, 합의 규칙 구현 및 생태계 조율에 참여했습니다.

이 그룹은 NU7 범위 설정, 테스트넷 운영 및 ZIP 편집에도 참여합니다. Dev Ojha는 ZIP 편집자로 등록되어 있습니다.

## 현재 이니셔티브

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote는 Zcash를 위한 Valar Group의 비공개 거버넌스 프로토콜입니다. 보유자는 개별 금액을 공개하거나 투표를 신원과 연결하지 않고 실드된 잔액으로 투표합니다.

주요 특성은 다음과 같습니다.

- 여러 날에 걸친 커밋/리빌 프로세스 대신 한 번의 온라인 세션으로 투표.
- 자금을 위험에 빠뜨리지 않고 투표권을 핫키에 위임하는 Keystone 호환 스냅샷 서명.
- 동형 ElGamal을 사용한 암호화된 투표 금액.
- 스냅샷 증명 중 널리파이어가 유출되지 않도록 하는 PIR 쿼리.
- 시간 상관관계를 줄이기 위한 투표 분할 및 지연된 릴레이 제출.
- 공개적으로 감사 가능한 집계.

2026년 8월, Valar Group과 Project Tachyon은 이 스택을 NU7 코인 보유자 투표에 사용했습니다. 자격 요건은 메인넷 높이 3,459,350에서 Ironwood 내 사용 가능한 실드된 ZEC를 보유하는 것이었습니다. 투표는 2026년 8월 25일부터 9월 14일까지 진행되었으며, 결과가 대표성을 갖는 것으로 간주되려면 1,000,000 ZEC의 참여 임계값이 필요했습니다. 질문은 NSM 발행 평활화, 재발행 시점, Sprout/v4 폐지, 25초 블록 시간 및 NU7 범위/준비 상태를 다뤘습니다.

기본 체인 조율은 Project Tachyon, Valar Group, Zcash Foundation, ZODL, Shielded Labs 간의 5명 중 2명 멀티시그를 사용합니다. 별도의 검증자 세트가 라운드별 복호화 키 지분을 보유합니다. 단일 검증자는 개별 투표를 복구할 수 없으며, 최종 집계를 생성하려면 검증자 임계값이 필요합니다.

공개 운영자 및 감사자 인터페이스는 다음과 같습니다.

- [투표 체인 설정](https://setup.valargroup.org)
- [집계 감사자](https://tally.valargroup.org)
- [코디네이터 UI](https://svote.valargroup.org/)
- [PIR 서버 설정](https://setup-pir.valargroup.org)
- [Shielded Vote 문서](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura는 Valar Group과 Project Tachyon의 협업으로 개발된 Zcash 풀 노드입니다. Zebra에서 파생되었으며 더 빠른 동기화, 네이티브 프루닝, 스냅샷 부트스트래핑, `zcashd` 호환성 경로 및 실험적인 고성능 P2P 작업을 추가합니다.

Zcash Foundation은 이 프로젝트를 공개적으로 환영하며, 독립 팀이 Zebra를 포크하고 개선할 수 있도록 Zebra가 허용적 라이선스로 출시되었고 여러 Zakura 기여자가 이미 Zebra 업스트림에 기여했다고 언급했습니다.

### Private Information Retrieval

Valar Group은 서로 관련된 두 가지 문제를 위한 PIR 서비스와 라이브러리를 유지 관리합니다.

- 널리파이어를 공개하지 않고 스냅샷 높이에서 노트가 사용되지 않았음을 증명.
- 지갑이 동기화하거나 투표하기 위해 가져와야 하는 데이터 감소.

이는 Shielded Vote의 핵심 의존성이자 더 빠른 프라이빗 지갑 UX를 위한 구성 요소입니다.

### Ironwood 및 NU7 엔지니어링

Valar Group은 Ironwood에 대한 2026년 6월 공동 약속에 참여했으며, 새 풀과 관련된 합의 규칙 구현 및 클라이언트 작업에 기여했습니다. 또한 조인 스크립트와 `nu7.valargroup.dev`에서 호스팅되는 공개 노드를 포함한 NU7 테스트넷 인프라를 운영했습니다.

### 오픈소스 프로토콜 라이브러리

`valargroup` GitHub 조직은 다음을 포함하여 투표 및 노드 스택을 공개 리포지터리로 게시합니다.

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — 비공개 온체인 투표를 위한 애플리케이션 특화 체인
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — 클라이언트 측 실드된 투표 라이브러리, 증명, 스토리지 및 FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — Halo2 위임 및 투표 회로
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — 널리파이어 비소속 증명을 위한 PIR
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — 지갑 서비스 검색 구성
- [`zebra`](https://github.com/valargroup/zebra) — Valar Group의 Zebra/Zakura 개발 포크

## 팀

Valar Group은 **Dev Ojha** (ValarDragon)가 이끌고 있습니다. Zakura와 관련된 공개 팀 페이지에는 다음 Valar 계열 엔지니어가 나열되어 있습니다.

- **Dev Ojha** — 유지 관리자, Valar Group 총괄. 주요 분야는 토큰 보유자 투표, 포스트퀀텀 작업, Zakura 및 PIR입니다.
- **Roman Akhtariev** — 수석 엔지니어. 이전 Osmosis 수석 엔지니어였으며, PIR 지갑 동기화, 토큰 보유자 투표 및 Zakura 동기화 성능을 담당합니다.
- **Evan Forbes** — 수석 엔지니어. 전 Celestia 합의 책임자이자 창립 엔지니어이며, 더 빠른 블록 시간 준비 및 QUIC P2P 스택을 담당합니다.
- **Adam Tucker** — 수석 엔지니어. 전 Osmosis 엔지니어이며, Roman Akhtariev와의 토큰 보유자 투표, 지갑 신뢰성 및 스택 전반의 Ironwood 통합을 담당합니다.

Zakura 자체는 Sean Bowe가 이끄는 Project Tachyon과 공동으로 유지 관리됩니다. 두 조직은 긴밀히 협력하지만 별개로 유지됩니다.

## 조직 구조

Valar Group은 독립 엔지니어링 조직으로 운영됩니다. Zcash Foundation, ZODL, Shielded Labs 또는 Zcash Community Grants의 일부가 아닙니다.

투표 체인 설계에서 Valar Group은 다섯 개 코디네이터 조직 중 하나입니다. 이 역할은 Zcash 거버넌스에 대한 독점적 통제권 주장이 아니라 투표 시스템의 매개변수입니다. 다른 팀도 검증자를 운영하고, 대체 투표 체인을 구축하거나, 공개 도구를 통해 게시된 집계를 감사할 수 있습니다.

법적 법인 유형, 이사회 구성 및 내부 거버넌스에 관한 추가 정보는 오래된 Zcash 조직과 동일한 수준으로 상세하게 공개되지 않았습니다.

## 자금 조달

2026년 중반의 공개 포럼 발언에서는 Valar Group과 Project Tachyon이 민간 기부를 통해 자금을 조달받는다고 설명합니다. ZODL의 공개된 벤처 라운드나 Shielded Labs의 공개 기부 발표와 달리, Valar Group은 상세한 기부자 목록 또는 보조금 일정을 공개하지 않았습니다.

이 자금 조달 모델은 팀을 과거 Development Fund / 블록 보상 경로로부터 독립적으로 유지하지만, 예산 규모와 자금 출처에 대한 공개 가시성이 더 낮다는 의미이기도 합니다.

## Zcash 생태계에서의 역할

Valar Group은 Zcash의 2026년 개발 환경을 중심으로 형성된 독립 프로토콜 조직 중 하나입니다. 이 환경에서:

- **Zcash Foundation**은 커뮤니티 관리와 Zebra를 계속 담당합니다.
- **ZODL**은 ECC 분리 이후 지갑 제품 및 프로토콜 연속성에 집중합니다.
- **Shielded Labs**는 지속 가능성, 보안 및 합의 연구에 집중합니다.
- **Project Tachyon**은 재귀, 형식 검증 및 장기 확장성에 집중합니다.
- **Valar Group**은 비공개 코인 보유자 투표, 노드 성능, PIR 및 이러한 시스템을 실제 환경에서 운영하는 데 필요한 엔지니어링에 집중합니다.

이들의 차별화된 기여는 실드된 거버넌스를 운영 가능하게 만드는 것입니다. NU7 투표는 그 스택의 첫 주요 사용 사례입니다. 보유자는 Ironwood 잔액을 증명하고, Zodl 및 Vizor 같은 지갑은 흐름을 통합할 수 있으며, 누구나 특정 보유자가 어떻게 투표했는지 알지 못한 채 집계를 감사할 수 있습니다.

같은 팀의 노드 및 동기화 작업은 이 그림의 나머지 절반을 지원하기 위한 것입니다. 지갑이 동기화할 수 없거나, 노드가 따라가지 못하거나, 업그레이드를 신속하게 구현할 수 없다면 비공개 투표의 유용성은 낮아집니다. Valar Group은 거버넌스, 노드 소프트웨어 및 지갑 인프라를 하나의 문제로 봅니다. 즉, 운영 권한을 단일 조직에 집중하지 않으면서 프라이빗 Zcash를 대규모로 사용할 수 있게 만드는 것입니다.

## 자료

- [Valar Group 웹사이트](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Shielded Vote 문서](https://valargroup.gitbook.io/shielded-vote-docs)
- [투표 체인 설정](https://setup.valargroup.org)
- [집계 감사자](https://tally.valargroup.org)
- [코디네이터 UI](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura 소개 / 팀](https://zakura.com/about/)
- [NU7 코인 보유자 투표 포럼 스레드](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Coinholder Voting Chain 포럼 스레드](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
