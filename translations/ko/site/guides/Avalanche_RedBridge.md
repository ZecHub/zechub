# Zcash Avalanche RedBridge

Zcash Avalanche RedBridge은 Zcash(ZEC)과 Avalanche(AVAX) 블록체인 간 상호운용성을 지원하는 탈중앙화 브릿지입니다. 이 브릿지는 ZEC을 Avalanche 블록체인으로 원활하게 전송하도록 설계되었으며, Zcash의 프라이버시 중심 기능을 유지하면서 Avalanche의 높은 처리량, 낮은 수수료, 친환경 합의 메커니즘을 활용합니다.

RedBridge은 크로스체인 탈중앙화 금융(DeFi), 비공개 거래, 유동성 공유 등 다양한 사용 사례를 지원하여 Zcash 보유자가 Avalanche 생태계에 더 폭넓게 접근할 수 있도록 합니다. 이 브릿지는 탈중앙화 노드와 오라클(oracle)로 구성된 시스템을 통해 운영됩니다. **ZavaX**라고 알려진 이 오라클은 Zcash과 Avalanche 간에 신뢰할 수 있는 데이터를 전송하고 가격을 검증합니다.

### 주요 기능

프라이버시 보호 상호운용성: Zcash 사용자는 Avalanche의 DeFi 애플리케이션을 이용하면서 프라이버시를 유지할 수 있습니다.
탈중앙화 오라클 ZavaX: 오라클 시스템을 통합해 정확한 ZEC/AVAX 가격 데이터를 제공하고, 신뢰가 필요 없는 크로스체인 작업을 지원합니다.
확장성과 친환경성: Avalanche의 합의 모델을 활용해 환경에 미치는 영향을 최소화하면서 빠른 거래를 지원합니다.
DeFi 및 DApp 지원: Zcash 보유자는 이제 프라이버시를 침해하지 않고 Avalanche의 다양한 DeFi 플랫폼에 참여할 수 있습니다.

### 기술 구성 요소

**탈중앙화 ZavaX Oracle**
설명: ZavaX Oracle은 브릿지의 핵심 구성 요소로, 크로스체인 가격 피드를 제공하고 신뢰가 필요 없는 ZEC에서 AVAX으로의 변환을 지원합니다.
[오라클 링크](https://zavax-oracle.red.dev)

**크로스체인 브릿지 컨트랙트**
설명: Zcash Avalanche 브릿지를 지원하는 스마트 컨트랙트 아키텍처로, ZEC의 예치, 변환, 출금을 처리합니다.

**프라이버시 계층 통합**
설명: 브릿지 이용 과정 전반에서 Zcash의 프라이버시 기능을 유지하여 비공개 크로스체인 거래를 지원합니다.

## 결과물 및 문서

**Zcash Avalanche의 탄력적 서브넷 브릿지**: [개발 지원금 제안서](https://forum.zcashcommunity.com/t/zcash-elastic-subnet-bridge-on-avalanche/44220)
아래는 Zcash Avalanche RedBridge 프로젝트를 위해 완료한 주요 결과물과 기술 자료입니다.

결과물 1.1: CLI를 사용해 테스트넷 Avalanche 서브넷에서 테스트넷 Zcash 거래를 조회할 수 있는 예비 PoC입니다. GitHub에 게시되었으며, Avalanche 테스트넷에서 단일 노드 서브넷으로 실행됩니다. https://github.com/red-dev-inc/redbridge-oracle

결과물 2.1: [아키텍처](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)


### 마일스톤 3 — 2024년 3월 31일

결과물 3.1이 완료되었습니다. ZavaX 브릿지의 임계값 서명에 BLS 대신 FROST을 채택하는 방안을 분석했습니다. 이 변경으로 Zcash Foundation의 감사를 거친 라이브러리를 활용해 통합성과 보안을 개선할 수 있습니다. https://github.com/ZcashFoundation/frost

결과물 3.2 GUI의 UX 및 UI 디자인이 완료되었습니다. 침투 테스트 결과를 바탕으로 ZavaX Oracle 서브넷의 보안 강화 방안을 상세히 설명합니다. 서버 구성과 테스트 결과를 비롯한 자세한 내용은 [보안 평가](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/deployment-notes.md)에서 확인할 수 있습니다.
[감사 보고서](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/pen-testing-report-2024-09.md)
또한 팀은 ZavaX에서 redbridge로 브랜드를 변경하고 스테이킹 토큰을 ZAX에서 RBR로 변경했습니다.

### 마일스톤 4 — 2024년 4월 30일
결과물 4.1 Zcash 및 Avalanche 테스트넷에 완전히 작동하는 배포를 완료했습니다. CLI를 지원하는 검증자 3명으로 구성된 서브넷입니다.

### 마일스톤 5 — 2024년 5월 31일
결과물 5.1 GUI: 브릿지를 Core 또는 웹앱에 통합

마일스톤 6 — 2024년 6월 30일
결과물 6.1 소프트웨어 감사를 성공적으로 통과
결과물 6.2 감사가 완료된 소스 코드를 공개 GitHub 저장소에 게시

[GitHub 저장소](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)를 확인해 보세요.
  
기술 세부 정보를 확인하려면 저장소와 RedBridge 프로젝트 문서를 살펴보고 통합 세부 사항, 테스트 프레임워크, 보안 프로토콜을 [확인해 보시기](https://github.com/red-dev-inc/red-bridge) 바랍니다.


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* 결과물:
2025년 1분기에 팀은 [red·bridge 데모 웹사이트](https://redbridge-demo.red.dev/index.html)를 공개한다고 발표했습니다. 누구나 이 웹사이트에서 사용자 경험을 살펴보고 의견을 보내거나 개선 사항을 제안할 수 있습니다. 또한 기술에 익숙하지 않은 사람들에게 프로젝트를 쉽게 소개하는 데에도 활용됩니다.

* 팀은 red·bridge의 최종 버전에 Zebra을 사용했습니다. 이를 테스트하기 위해 Avalanche의 Fuji 테스트넷에서 실행되는 테스트 블록체인 ZavaX Oracle의 노드 3개 중 2개를 업그레이드했습니다. 마지막 노드도 성공적으로 업그레이드되어, 이제 [ZavaX Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/)이 Zebra에서 실행됩니다!

* 2025년 1분기에 red.bridge 웹사이트를 코딩해 빨강, 어두운 테마, 밝은 테마, Zebra의 4가지 화면을 제공했습니다. 빨강 테마만 있던 초기 버전에서 개선된 것입니다.

* 또 다른 소식으로, 팀은 2025년 12월에 Avalanche 메인넷에서 red·bridge L1을 가동할 예정입니다. 처음에는 Zcash 블록체인의 오라클로 사용하고, 곧이어 Bitcoin에도 활용할 계획입니다. 각 요청에는 가스 토큰 AVAX가 0.001 소요됩니다. 이 빌드를 통해 Avalanche의 모든 L1 또는 스마트 컨트랙트가 탈중앙화된 방식으로 Zcash 및 Bitcoin의 데이터를 저렴하게 조회할 수 있습니다.

* 2분기에 팀은 red.bridge 가디언을 누구나 더 일찍, 더 저렴하게 실행할 수 있도록 마일스톤 ACP-77(일명 Avalanche9000)을 Avalanche Foundation에 제출했습니다. 처음에는 검증자가 약 2,000 AVAX를 스테이킹해야 했지만, Avalanche9000의 비용 구조를 적용하면 검증자는 AVAX 1개월분만 필요합니다. 또한 이 마일스톤을 통해 ZF의 FROST 구현을 사용한다는 계획도 확정됩니다. 이 구현은 각 가디언에게 서명 지분을 부여해 브릿지 지갑을 안전하게 분산 관리할 수 있도록 합니다.

* 2026년 1분기와 2분기에 red.bridge는 Zcash 및 Avalanche 커뮤니티 구성원을 대상으로 RBR 토큰(기존 ZAX)의 에어드롭을 진행할 예정입니다. red.dev의 설립자에 따르면, 사용자가 브릿지를 테스트하는 데 참여하면서 RBR을 받을 기회를 얻을 수 있도록 인센티브가 제공되는 테스트넷도 운영할 계획입니다.
