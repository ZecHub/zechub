<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Valar Group

[웹사이트 방문](https://valargroup.dev/)

<img width="200" height="200" alt="254678133" src="/content-images/0dc8c697-bcad-492a-b024-89b502d27af4-4c0d4552c2.webp" />


## 사명 선언문

Valar Group는 Zcash의 scaling, 코인 보유자 거버넌스 강화, 프로토콜의 프라이버시와 성능 및 장기적인 회복력 개선에 주력하는 독립 엔지니어링 조직입니다.

활동은 프로토콜 수준의 인프라에 집중되어 있습니다. 여기에는 비공개 토큰 보유자 투표, 고성능 풀 노드 소프트웨어, 지갑 동기화 기술, 그리고 더 큰 규모에서 거래정보 보호 Zcash를 더욱 편리하게 이용할 수 있도록 하는 네트워크 업그레이드가 포함됩니다.

이 조직은 ZEC 보유자에게 선호 사항을 비공개로 표현할 방법을 제공하고, 노드 운영자에게 더 빠르고 강력한 소프트웨어를 제공하며, 네트워크 참여 비용을 낮추면서 사용자의 프라이버시를 지키는 도구를 지갑에 제공하는 것을 목표로 합니다.

## 배경

Valar Group는 Osmosis의 공동 창립자이자 Cosmos 출시 팀의 일원이었던 Dev Ojha(ValarDragon)가 이끌고 있습니다. 그는 지난 10년간 zk-SNARKs, BFT 합의, 프로덕션 DeFi 시스템 분야에서 활동해 왔습니다.

2026년 핵심 개발 조직 개편 이후 생태계가 독립적인 프로토콜 팀 중심으로 전환되면서, Zcash에서 이 그룹의 공개 활동이 두드러지기 시작했습니다. Valar Group는 Project Tachyon, Shielded Labs, ZODL, Zcash Foundation와 함께 차세대 Zcash 인프라를 구축하는 조직 중 하나로 부상했습니다.

이 조직의 활동에서 반복적으로 나타나는 주제는 Zcash의 프라이버시 속성이 결제에만 국한되어서는 안 된다는 것입니다. 보유자에게 발행량, 블록 시간 또는 네트워크 업그레이드 범위에 대한 투표를 요청한다면, 신원이나 잔액 또는 개별 투표를 공개하지 않고 거래정보 보호 잔액으로 투표할 수 있어야 합니다. 이러한 요구에 따라 Valar Group는 코인 보유자 투표 전용 체인을 설계하고 출시했습니다.

같은 scaling 및 암호학 배경은 노드와 동기화 작업에도 영향을 미쳤습니다. 더 빠른 블록, 더 가벼운 지갑 동기화, 더 강력한 풀 노드는 가치 저장 수단을 넘어 결제 네트워크 규모로 사용할 수 있는 프라이빗 화폐의 필수 조건으로 여겨집니다.

## 비전

Valar Group의 공개 자료와 프로젝트 활동은 다음과 같은 Zcash 네트워크를 지향합니다.

- 반복 가능한 거버넌스 절차로서 비공개이며 감사 가능한 코인 보유자 투표를 지원합니다.
- 거래정보 보호 프라이버시를 희생하지 않으면서 작업 증명 결제의 규모를 키웁니다.
- PIR, 가지치기, 더 빠른 블록 전파를 통해 지갑과 노드의 병목 현상을 줄입니다.
- 독립적인 풀 노드 스택을 출시해 구현의 다양성을 높입니다.
- 양자 내성 준비와 공식 검토를 거친 프로토콜 업그레이드에 기여합니다.

이 조직은 프로토콜 소유자가 아니라 독립 기여자로 활동합니다. 프로토콜 변경은 여전히 ZIP, 구현, 검토, 커뮤니티 신호 수렴 절차를 거칩니다. Valar Group의 역할은 이러한 절차를 실질적으로 운영할 수 있도록 시스템을 설계하고 구현하며 운영하고 오픈 소스로 공개하는 것입니다.

## 전략 분야

Valar Group의 활동은 네 가지 분야로 나뉩니다.

### 비공개 코인 보유자 거버넌스

Zcash는 온체인 프로토콜을 자동으로 제어하는 방식을 사용하지 않습니다. 코인 보유자 설문은 더 폭넓은 대략적 합의 절차에 반영되는 자문 성격의 신호입니다. Valar Group는 거래정보 보호 잔액으로 투표자 신원이나 개별 투표 규모를 공개하지 않고 이런 신호를 수집할 수 있도록 Tokenholder Voting Chain을 구축했습니다.

현재 설계에는 다음이 사용됩니다.

- 투표 라운드를 조정하는 전용 Cosmos SDK 애플리케이션 체인
- 사용 가능한 Ironwood 노트에 대한 스냅샷 증명
- 투표 금액의 동형 암호화
- nullifier 비포함 증명을 위한 비공개 정보 검색
- 조정자 멀티시그와 분산 선거 당국

목표는 기존 토큰 보유자 투표 절차를 재사용 및 감사를 거칠 수 있고 지갑에 통합할 수 있는 시스템으로 대체하여, 다른 조직도 운영하고 독립적으로 집계할 수 있도록 하는 것입니다.

### 노드 소프트웨어와 네트워크 scaling

Valar Group는 Project Tachyon와 함께 Zebra 코드베이스를 기반으로 구축된 Zcash 풀 노드인 Zakura를 개발하고 있습니다. Zakura는 더 빠른 초기 동기화, 가지치기, 스냅샷 부트스트래핑, 기존 `zcashd` 사용자를 위한 호환성 경로가 필요한 운영자를 위한 고성능 노드입니다.

관련 scaling 작업은 다음과 같습니다.

- NU7 테스트넷에서 진행한 25초 블록 실험을 비롯한 블록 목표 시간 단축
- P2P 블록 전파 개선
- 거래정보 보호 활동이 증가해도 Zcash를 계속 사용할 수 있도록 하는 풀 노드 기능

### 지갑 및 동기화 인프라

거래정보 보호 지갑은 역사적으로 많은 양의 체인 데이터를 스캔해야 합니다. Valar Group는 지갑이 전체 nullifier 집합을 내려받거나 어떤 노트에 관심이 있는지 공개하지 않고 필요한 증명을 가져올 수 있도록 PIR 시스템을 개발합니다.

이 작업은 투표 스택과 더 폭넓은 지갑 동기화 연구 모두에 적용됩니다. 또한 멀티 서버 거래 제출과 서버 선택 개선 등 지갑 측 안정성 개선에도 기여했으며, 이는 ZODL의 모바일 스택에 사용되고 있습니다.

### 프로토콜 업그레이드와 생태계 조정

Orchard 회로 취약점 발생 후 Valar Group는 Ironwood 대응에 공개적으로 참여하겠다고 약속한 조직 중 하나였습니다. Ironwood는 새로운 거래정보 보호 구역을 도입하고, 기존 Orchard 구역을 턴스타일 뒤에 봉인했으며, 유통 공급량을 독립적으로 검증할 수 있는 경로를 복원했습니다. Valar Group는 아키텍처, 합의 규칙 구현, 생태계 조정 분야에서 Project Tachyon, Shielded Labs, ZODL, Zcash Foundation와 협력했습니다.

이 그룹은 NU7 범위 설정, 테스트넷 운영, ZIP 편집에도 참여합니다. Dev Ojha는 ZIP 편집자로 등재되어 있습니다.

## 현재 진행 중인 프로젝트

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote는 Zcash를 위한 Valar Group의 비공개 거버넌스 프로토콜입니다. 보유자는 개별 금액을 공개하거나 투표를 신원과 연결하지 않고 거래정보 보호 잔액으로 투표합니다.

주요 특징은 다음과 같습니다.

- 여러 날에 걸친 커밋/리빌 프로세스가 아니라, 1번의 온라인 세션으로 투표합니다.
- Keystone 호환 스냅샷 서명을 사용해 자금을 위험에 빠뜨리지 않고 핫키에 투표권을 위임합니다.
- 동형 ElGamal을 사용해 투표 금액을 암호화합니다.
- 스냅샷 증명 중 nullifier가 유출되지 않도록 PIR 쿼리를 사용합니다.
- 투표를 분할하고 릴레이 제출을 지연해 시간적 상관관계를 줄입니다.
- 공개적으로 감사할 수 있는 집계 결과를 제공합니다.

2026년 8월, Valar Group와 Project Tachyon는 NU7 코인 보유자 투표에 이 스택을 사용했습니다. 투표 자격을 얻으려면 메인넷 높이 3,459,350에서 Ironwood의 사용 가능한 거래정보 보호 ZEC를 보유해야 했습니다. 투표는 2026년 8월 25일부터 9월 14일까지 진행되었으며, 결과를 대표성 있는 것으로 간주하려면 ZEC 참여 기준량인 1,000,000이 필요했습니다. 질문은 NSM 발행량 완화, 재발행 시점, Sprout/v4 폐기, 25초 블록 시간, NU7 범위와 준비 상태를 다뤘습니다.

기본 체인 조정은 Project Tachyon, Valar Group, Zcash Foundation, ZODL, Shielded Labs가 참여하는 2-of-5 멀티시그를 사용합니다. 별도의 검증자 집합은 라운드별 복호화 키 지분을 보유합니다. 단일 검증자는 개별 투표를 복원할 수 없으며, 최종 집계 결과를 산출하려면 검증자의 기준 수가 필요합니다.

공개 운영자 및 감사자용 인터페이스는 다음과 같습니다.

- [투표 체인 설정](https://setup.valargroup.org)
- [집계 감사 도구](https://tally.valargroup.org)
- [조정자 UI](https://svote.valargroup.org/)
- [PIR 서버 설정](https://setup-pir.valargroup.org)
- [Shielded Vote 문서](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura는 Valar Group와 Project Tachyon가 공동으로 개발한 Zcash 풀 노드입니다. Zebra를 기반으로 하며 더 빠른 동기화, 네이티브 가지치기, 스냅샷 부트스트래핑, `zcashd` 호환성 경로, 실험적인 고성능 P2P 작업을 추가했습니다.

Zcash Foundation는 이 프로젝트를 공개적으로 환영하며, 독립 팀이 이를 포크하고 개선할 수 있도록 Zebra가 허용적인 라이선스로 공개되었고, 여러 Zakura 기여자가 이미 Zebra에 기여했다고 밝혔습니다.

### 비공개 정보 검색

Valar Group는 다음 두 가지 관련 문제를 해결하기 위해 PIR 서비스와 라이브러리를 관리합니다.

- nullifier를 공개하지 않고 스냅샷 높이에서 노트가 사용되지 않았음을 증명합니다.
- 동기화 또는 투표에 필요한 지갑의 데이터 가져오기 양을 줄입니다.

이는 Shielded Vote의 핵심 의존 요소이자 더 빠른 비공개 지갑 UX를 위한 구성 요소입니다.

### Ironwood 및 NU7 엔지니어링

Valar Group는 2026년 6월 Ironwood에 대한 공동 약속에 참여했으며, 합의 규칙 구현과 새로운 구역 관련 클라이언트 작업에 기여했습니다. 또한 `nu7.valargroup.dev`에서 호스팅하는 조인 스크립트와 공개 노드를 비롯해 NU7 테스트넷 인프라도 운영했습니다.

### 오픈 소스 프로토콜 라이브러리

`valargroup` GitHub 조직은 투표 및 노드 스택을 공개 저장소로 게시하며, 여기에는 다음이 포함됩니다.

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — 비공개 온체인 투표를 위한 애플리케이션 전용 체인
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — 클라이언트 측 거래정보 보호 투표 라이브러리, 증명, 저장소, FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — Halo2 위임 및 투표 회로
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — nullifier 비포함 증명을 위한 PIR
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — 지갑 서비스 검색 구성
- [`zebra`](https://github.com/valargroup/zebra) — Valar Group의 Zebra/Zakura 개발 포크

## 팀

Valar Group는 **Dev Ojha**(ValarDragon)가 이끌고 있습니다. Zakura와 관련된 공개 팀 페이지에는 다음 Valar 소속 엔지니어가 등재되어 있습니다.

- **Dev Ojha** — 유지 관리자이며 Valar Group를 이끕니다. 주요 분야는 토큰 보유자 투표, 양자 내성 작업, Zakura, PIR입니다.
- **Roman Akhtariev** — 수석 엔지니어입니다. 이전에는 Osmosis의 수석 엔지니어였으며, PIR 지갑 동기화, 토큰 보유자 투표, Zakura 동기화 성능을 담당합니다.
- **Evan Forbes** — 수석 엔지니어입니다. 이전에는 Celestia의 합의 책임자이자 창립 엔지니어였으며, 블록 시간 단축 준비와 QUIC P2P 스택을 담당합니다.
- **Adam Tucker** — 수석 엔지니어입니다. 이전에는 Osmosis 엔지니어였으며, Roman Akhtariev와 함께하는 토큰 보유자 투표, 지갑 안정성, 스택 전반의 Ironwood 통합을 담당합니다.

Zakura는 Sean Bowe가 이끄는 Project Tachyon와 공동으로 유지 관리합니다. 두 조직은 긴밀히 협력하지만 별개로 운영됩니다.

## 조직 구조

Valar Group는 독립 엔지니어링 조직으로 운영됩니다. Zcash Foundation, ZODL, Shielded Labs 또는 Zcash Community Grants의 일부가 아닙니다.

투표 체인 설계에서 Valar Group는 5개 조정 조직 중 하나입니다. 이 역할은 투표 시스템의 매개변수일 뿐 Zcash 거버넌스를 독점적으로 통제한다는 뜻이 아닙니다. 다른 팀도 검증자를 운영하거나 대안 투표 체인을 구축하거나 공개 도구를 사용해 게시된 집계 결과를 감사할 수 있습니다.

법인 유형, 이사회 구성, 내부 거버넌스에 관한 추가 정보는 기존 Zcash 조직에 대해 공개된 수준만큼 자세히 공개되지 않았습니다.

## 자금 조달

2026년 중반의 공개 포럼 게시물에 따르면 Valar Group와 Project Tachyon는 민간 기부금으로 자금을 조달합니다. 공개된 벤처 투자 라운드가 있는 ZODL나 공개 기부 발표를 한 Shielded Labs와 달리 Valar Group는 상세한 기부자 명단이나 개발 지원금 일정을 공개하지 않았습니다.

이러한 자금 조달 모델은 팀이 기존 개발 기금/블록 보상 경로로부터 독립성을 유지하게 하지만, 예산 규모와 자금 출처에 대한 공개 정보는 줄어듭니다.

## Zcash 생태계에서의 역할

Valar Group는 Zcash의 2026년 개발 환경을 중심으로 형성된 독립 프로토콜 조직 중 하나입니다. 이 환경에서:

- **Zcash Foundation**는 커뮤니티 관리와 Zebra를 계속 담당합니다.
- **ZODL**는 ECC 분리 이후 지갑 제품과 프로토콜의 지속에 주력합니다.
- **Shielded Labs**는 지속 가능성, 보안, 합의 연구에 주력합니다.
- **Project Tachyon**는 재귀, 형식 검증, 장기적인 scalability에 주력합니다.
- **Valar Group**는 비공개 코인 보유자 투표, 노드 성능, PIR, 이러한 시스템을 프로덕션 환경에서 운영하는 데 필요한 엔지니어링에 주력합니다.

이 조직의 독보적인 기여는 거래정보 보호 거버넌스를 실제로 운영할 수 있게 만든다는 점입니다. NU7 투표는 이 스택을 사용한 첫 주요 사례입니다. 보유자는 Ironwood 잔액을 증명하고, ZODL 및 Vizor와 같은 지갑은 투표 흐름을 통합할 수 있으며, 누구나 특정 보유자의 투표 내용을 알지 못한 채 집계 결과를 감사할 수 있습니다.

같은 팀의 노드 및 동기화 작업은 이 구도의 다른 측면을 뒷받침하기 위한 것입니다. 지갑이 동기화할 수 없고, 노드가 처리량을 따라가지 못하며, 업그레이드를 신속히 구현할 수 없다면 비공개 투표의 효용은 떨어집니다. Valar Group는 거버넌스, 노드 소프트웨어, 지갑 인프라를 하나의 문제로 봅니다. 즉, 운영 권한을 단일 조직에 집중시키지 않으면서 비공개 Zcash를 대규모로 사용할 수 있도록 하는 것입니다.

## 자료

- [Valar Group 웹사이트](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Shielded Vote 문서](https://valargroup.gitbook.io/shielded-vote-docs)
- [투표 체인 설정](https://setup.valargroup.org)
- [집계 감사 도구](https://tally.valargroup.org)
- [조정자 UI](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura 소개 / 팀](https://zakura.com/about/)
- [NU7 코인 보유자 투표 포럼 게시물](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [코인 보유자 투표 체인 포럼 게시물](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
