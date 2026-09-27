# Zcash Avalanche RedBridge

Zcash Avalanche RedBridge는 Zcash(ZEC)와 Avalanche(AVAX) 블록체인 간의 상호운용성을 지원하는 탈중앙화 브리지입니다. 이 브리지는 Avalanche의 높은 처리량, 낮은 수수료 및 친환경 합의 메커니즘을 활용하면서 Zcash의 프라이버시 중심 기능을 보존하여 ZEC을 Avalanche 블록체인으로 원활하게 전송할 수 있도록 설계되었습니다.

RedBridge는 크로스체인 탈중앙화 금융(DeFi), 비공개 거래, 유동성 공유를 포함한 폭넓은 사용 사례를 지원하며, Zcash 보유자에게 Avalanche 생태계에 대한 확장된 접근성을 제공합니다. 이 브리지는 탈중앙화 노드 집합과 **ZavaX**라는 오라클을 통해 운영되며, Zcash과 Avalanche 간의 신뢰할 수 있는 데이터 전송 및 가격 검증을 보장합니다.

### 주요 기능

프라이버시 보존 상호운용성: Zcash 사용자가 Avalanche의 DeFi 애플리케이션을 이용하면서도 프라이버시를 유지할 수 있도록 합니다.
탈중앙화 오라클 ZavaX: 정확한 ZEC/AVAX 가격 데이터를 보장하는 오라클 시스템을 통합하여 신뢰가 필요 없는 크로스체인 작업을 가능하게 합니다.
확장 가능하고 친환경적: Avalanche의 합의 모델을 활용하여 환경 영향을 최소화하면서 고속 거래를 제공합니다.
DeFi 및 DApp 지원: Zcash 보유자는 이제 프라이버시를 훼손하지 않고 Avalanche의 다양한 DeFi 플랫폼에 참여할 수 있습니다.

### 기술 구성 요소

**탈중앙화 ZavaX 오라클**
설명: ZavaX 오라클은 크로스체인 가격 피드를 제공하고 신뢰가 필요 없는 ZEC-AVAX 변환을 가능하게 하는 브리지의 핵심 요소입니다.
[오라클 링크](https://zavax-oracle.red.dev)

**크로스체인 브리지 계약**
설명: Zcash Avalanche 브리지를 지원하는 스마트 계약 아키텍처로, ZEC의 예치, 변환 및 출금을 처리합니다.

**프라이버시 레이어 통합**
설명: 브리징 과정 전반에서 Zcash의 프라이버시 기능이 보존되도록 하여 비공개 크로스체인 거래를 가능하게 합니다.

## 산출물 및 문서

**Zcash Avalanche의 Elastic Subnet Bridge**: [보조금 제안서](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
아래는 Zcash Avalanche RedBridge 프로젝트를 위해 완료된 주요 산출물과 기술 리소스입니다.

산출물 1.1: CLI를 통해 테스트넷 Avalanche 서브넷에서 테스트넷 Zcash 거래를 조회할 수 있도록 지원하는 예비 PoC로, Github에 게시되었으며 Avalanche 테스트넷에 하나의 노드 서브넷을 갖추고 있습니다. https://github.com/red-dev-inc/zavax-oracle

산출물 2.1: [아키텍처](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### 마일스톤 3: 2024년 3월 31일

산출물 3.1이 완료되었으며, ZavaX 브리지의 임계값 서명에 BLS 대신 FROST을 채택하는 것에 대한 분석을 제시합니다. 이 전환은 Zcash Foundation의 감사된 라이브러리를 활용하며 더 나은 통합과 보안을 촉진합니다. https://github.com/ZcashFoundation/frost

산출물 3.2 GUI의 UX 및 UI 디자인이 완료되었으며, 침투 테스트 결과를 바탕으로 ZavaX Oracle 서브넷의 보안 향상 내용을 상세히 설명합니다. 서버 구성 및 테스트 결과를 포함한 자세한 내용은 [보안 평가](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[감사 보고서](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
또한 팀은 ZavaX에서 redbridge로 리브랜딩하고 스테이킹 토큰을 ZAX에서 RBR로 변경했습니다.

### 마일스톤 4: 2024년 4월 30일
산출물 4.1 CLI 지원 및 3개 검증자 서브넷을 포함하여 Zcash 및 Avalanche 테스트넷에 완전히 작동하는 배포

### 마일스톤 5: 2024년 5월 31일
산출물 5.1 GUI: Core 또는 Webapp으로 브리지 통합

마일스톤 6: 2024년 6월 30일
산출물 6.1 소프트웨어 감사 성공적 통과
산출물 6.2 감사된 소스 코드를 공개 Github 저장소에 게시

[Github 저장소](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)를 살펴보세요.
  
더 자세한 기술 정보는 사용자가 RedBridge 프로젝트의 저장소 및 문서를 검토하여 통합 세부 사항, 테스트 프레임워크 및 보안 프로토콜을 [살펴볼](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) 것을 권장합니다.


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* 산출물: 
2025년 1분기에 팀은 누구나 사용자 경험을 시험하고, 피드백을 제공하며, 개선 사항을 제안할 수 있는 [red·bridge 데모 웹사이트](https://redbridge-demo.red.dev/index.html)의 출시를 발표했습니다. 또한 비기술적인 사람들에게 프로젝트를 소개하는 쉬운 방법이기도 합니다.

* 팀은 red·bridge의 최종 버전에 Zebra을 사용했습니다. 이를 테스트하기 위해 Avalanche의 Fuji 테스트넷에서 실행되는 테스트 블록체인인 ZavaX Oracle의 세 노드 중 두 노드를 업그레이드했습니다. 마지막 노드도 성공적으로 업그레이드되어, 이제 [Zavax Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/)은 Zebra에서 실행됩니다!

* 2025년 1분기에 red.bridge 웹사이트는 처음의 빨간색 버전과 달리 red, Dark, Light 및 Zebra의 네 가지 화면을 제공하도록 코딩되었습니다.

* 또 다른 사항으로, 팀은 2025년 12월 Avalanche 메인넷에서 red·bridge L1을 활성화할 예정입니다. 초기에는 Zcash 블록체인의 오라클 역할을 수행하고, 곧이어 Bitcoin에도 서비스를 제공할 예정입니다. 각 요청에는 가스 토큰으로 0.001 AVAX가 소요됩니다. 이 구축을 통해 Avalanche의 모든 L1 또는 스마트 계약은 탈중앙화 방식으로 Zcash 및 Bitcoin의 데이터를 저렴하게 조회할 수 있게 됩니다.

* 2분기에 팀은 red.bridge 가디언 운영을 더 빠르고 누구나 더 저렴하게 할 수 있도록 Avalanche Foundation에 마일스톤 ACP-77(Avalanche9000으로 알려짐)을 제출했습니다. 초기에는 검증자가 약 2000 AVAX를 스테이킹해야 했지만, Avalanche9000 비용으로 검증자는 월 1 AVAX만 필요하게 되었습니다. 또한 이 마일스톤은 각 Guardian에게 브리지 지갑의 안전한 분산 제어를 위한 서명 지분을 제공하는 ZF의 FROST 구현을 사용할 계획도 확정합니다.

* 2026년 1분기와 2분기에 red.bridge는 Zcash 및 Avalanche 커뮤니티 구성원을 대상으로 RBR 토큰(기존 ZAX) 에어드롭을 진행할 예정입니다. red.dev의 창립자에 따르면, 사용자는 브리지를 테스트하는 데 도움을 주면서 RBR을 획득할 기회를 얻을 수 있는 인센티브 테스트넷을 운영할 예정입니다.
