# Zcash는 어떻게 구성되어 있나요

## TL;DR

- Zcash는 하나의 회사가 만드는 것이 아니라, 각각 서로 다른 작업 영역을 맡는 여러 독립 조직이 함께 구축합니다
- 역사 대부분의 기간 동안에는 Electric Coin Company와 Zcash Foundation, 두 조직이 개발을 주도했습니다
- 2026년 1월, 거버넌스 분쟁 이후 Electric Coin Company 팀 전체가 사임했고, 생태계는 여러 독립 팀으로 재편되었습니다
- 오늘날 프로토콜, 노드 소프트웨어, 지갑, 연구, 확장성, 자금 조달은 각각 별도의 그룹이 담당합니다
- 어떤 단일 조직도 Zcash를 통제하지 않으며, 네트워크는 오픈 소스이자 퍼미션리스이고, 모든 변화 속에서도 정상적으로 계속 운영되었습니다

<br/>

## 이 문서는 누구를 위한 것인가요

- 실제로 누가 Zcash를 구축하고 유지하는지 이해하려는 신규 사용자
- 생태계 안의 많은 조직 이름 때문에 혼란스러운 사람
- 누구와 협업할지, 또는 어디에 제안을 보낼지 결정하려는 기여자

<br/>

## 왜 이것이 중요한가요

이 구조를 이해하면 다른 모든 것도 더 쉬워집니다. 내가 의존하는 코드를 누가 유지하는지, 보조금을 받으려면 누구에게 접근해야 하는지, 그리고 내가 관심 있는 네트워크의 어느 부분을 누가 책임지는지를 알 수 있게 됩니다. 또한 이것은 Zcash의 조용한 강점 중 하나를 보여줍니다. 작업이 독립적인 그룹들에 분산되어 있기 때문에, 단일 실패 지점이 프로젝트를 장악하거나 멈출 수 없습니다.

이 페이지는 지도입니다. 이 위키에서 이미 별도의 전체 페이지가 있는 각 조직에 대해서는, 거기에 적힌 내용을 반복하는 대신 짧은 설명과 더 읽어볼 수 있는 링크를 제공합니다.

<br/>

## 예전에는 어떻게 운영되었나요

Zcash의 역사 대부분 동안에는 두 조직이 앞장섰습니다.

Electric Coin Company는 2016년에 Zcash를 출시했고, 핵심 개발 팀의 상당수를 고용했습니다. 이 회사는 Zcash를 지원하기 위해 만들어진 비영리 이사회인 Bootstrap의 감독을 받았습니다. Zcash Foundation은 독립적인 비영리 단체로서 그와 나란히 활동했으며, 프로토콜의 관리와 독립적인 노드 구축에 중점을 두었습니다. 두 조직 모두 개발을 위해 따로 배정된 블록 보상의 일부로 주로 자금을 지원받았습니다.

이 두 축 구조는 수년간 유지되었지만, 그 구조는 공동 자금 조달과 두 조직이 같은 방향을 유지하는 것에 의존하고 있었습니다. 원래의 개발 자금 구조가 변화하고 장기적인 미래가 점점 불확실해지면서, 지속적인 작업 비용을 어떻게 지불할 것인가라는 문제가 더 절박해졌습니다. 이 자금 문제는 이후에 바뀐 많은 일들의 배경에 놓여 있으며, 어떤 팀은 외부 자본을 조달하고 다른 팀은 보조금에 의존하는 이유의 일부이기도 합니다.

<br/>

## 2026년 재편

2026년 1월, 구조는 급격하게 바뀌었습니다. 1월 7일, Electric Coin Company의 최고경영자 Josh Swihart는 X를 통해 회사 팀 전체가 사임했다고 발표했습니다.

Bootstrap은 2020년에 Electric Coin Company를 관리하기 위해 만들어진 비영리 단체였고, Electric Coin Company는 그 산하의 완전 자회사로 편입되어 있었습니다. 회사 팀과 이 이사회 사이의 의견 충돌은 시간이 지나며 누적되었고, 조직의 방향, 개발 자금을 어떻게 조달해야 하는지, 그리고 팀이 외부 자본을 조달하기 위해 민간 회사로 이전하길 원했던 Zashi 지갑의 미래를 포함한 여러 쟁점에 걸쳐 있었습니다. Swihart는 이 퇴사를 constructive discharge라고 설명했는데, 이는 근무 조건이 너무 심각하게 바뀌어 사실상 사임이 강요되었다는 뜻의 법률 용어이며, 이사회의 다수가 Zcash의 사명과 더 이상 같은 방향을 보지 않게 되었다고 말했습니다.

공정성을 위해서는 반대편의 설명도 중요합니다. Bootstrap은 이 갈등을 거버넌스와 비영리 법규 준수의 문제로 규정했습니다. Zcash의 창립자 Zooko Wilcox는 분쟁에서 거론된 이사회 구성원들을 공개적으로 옹호하며, 자신은 그들과 여러 해 동안 함께 일해왔고 높은 진실성을 가진 사람들로 여긴다고 말했습니다. 동시에 그는 분쟁 자체에서 어느 한쪽 편을 드는 것은 아니라는 점도 분명히 했습니다.

다만 두 가지는 विवाद의 대상이 아니었습니다. 어느 पक्ष도 범죄 행위를 주장하지 않았기 때문에, 이것은 법적 사건이라기보다 기업 및 거버넌스 차원의 분쟁이었습니다. 그리고 Zcash 네트워크 자체는 영향을 받지 않았고, 그 전 과정 내내 오픈 소스, 퍼미션리스, 안전하며 완전히 운영 가능한 상태를 유지했습니다. 이것은 Swihart와 Wilcox 모두가 사용자들에게 강조한 점이었습니다.

그 뒤에 이어진 것은 붕괴가 아니라 재편이었습니다. 이전 회사 팀은 2026년 후반에 ZODL을 설립했고, 별도로 이전 Bootstrap 이사회 구성원 세 명이 Sovright를 설립했습니다. 개발은 여러 독립 팀에 걸쳐 보다 분산된 형태로 자리 잡았습니다.

여기서 설명한 발언들은 2026년 1월 7일 Josh Swihart(@jswihart)와 Zooko Wilcox(@zooko)가 X에 공개적으로 게시한 내용이며, 원문 게시물은 그곳에서 전문을 읽을 수 있습니다.

<br/>

## 지금은 누가 Zcash를 구축하나요

현재 작업은 독립적인 조직들에 분산되어 있으며, 각 조직은 분명한 역할을 맡고 있습니다.

### 2026년 분리에서 나온 두 조직

1. ZODL, 즉 Zcash Open Development Lab은 이전 Electric Coin Company 팀이 설립했고 Josh Swihart가 이끌고 있습니다. 외부 투자자로부터 2,500만 달러가 넘는 자금을 조달했으며, Zcash의 최신 실드 트랜잭션을 구동하는 Halo 2 증명 시스템을 포함한 핵심 프로토콜 개발과, 이전에 Zashi라고 불리던 실드 기본 모바일 지갑인 ZODL 지갑을 개발하고 있습니다. 자세한 내용은 [ZODL](https://zechub.wiki/zcash-organizations/zodl)을 참고하세요.
2. Sovright는 이전 Bootstrap 이사회 구성원 세 명이 설립한 비영리 단체입니다. 생태계를 위한 도구와 지원에 집중하고 있으며, 오래되어 더 이상 유지되지 않는 지갑에 묶여 있던 자금을 초기 사용자들이 복구할 수 있도록 돕는 도구 Argos를 만들었습니다. 자세한 내용은 [Sovright](https://zechub.wiki/zcash-organizations/sovright)를 참고하세요.

### 프로토콜 관리, 연구, 그리고 노드 소프트웨어

3. Zcash Foundation은 Rust 기반 노드인 Zebra를 유지하며, 구형 zcashd 클라이언트가 퇴출됨에 따라 이것이 네트워크의 주 노드가 됩니다. 또한 Zcash GitHub 조직, z.cash 웹사이트, X의 공식 Zcash 계정을 관리하고, 그 자산들 중 일부를 관리하는 데 ZecHub와 협력합니다. 자세한 내용은 [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)을 참고하세요.
4. Shielded Labs는 스위스에 기반을 둔, 기부금으로 운영되는 독립 비영리 단체입니다. 미래 개발 자금을 조달하는 네트워크 지속 가능성 메커니즘과, Zcash에 지분 증명 파이널리티를 추가하는 Crosslink 작업을 포함해, 연구와 장기 지속 가능성에 집중하고 있으며, 2026년에 Orchard 풀 취약점을 발견한 보안 감사를 후원했습니다. 자세한 내용은 [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)를 참고하세요.
5. Electric Coin Company는 2016년에 Zcash를 만들고 출시한 조직으로서 역사 속 일부로 남아 있습니다. 자세한 내용은 [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)를 참고하세요.

### 확장성과 암호학

6. Project Tachyon은 암호학자 Sean Bowe가 이끄는 확장성 노력입니다. 이 프로젝트는 지갑이 블록체인과 동기화하는 새로운 방법인 oblivious synchronization을 제안하며, 이 방식은 트랜잭션 크기를 줄이고 부수적으로 Zcash를 양자 내성 프라이버시 방향으로 이끕니다. 관련 작업은 [tachyon.z.cash](https://tachyon.z.cash/)에 문서화되어 있습니다.
7. Valar Group은 규모 있는 프라이빗 양자 내성 디지털 현금을 위한 Zcash 프로토콜을 연구하고 엔지니어링하는 암호학 연구 및 엔지니어링 랩입니다. 확장성과 양자 관련 작업에서 Project Tachyon과 긴밀히 협력합니다. 자세한 내용은 [valargroup.dev](https://valargroup.dev/)에서 확인할 수 있습니다.

### 지역 및 커뮤니티 조직

8. Obscura Labs는 나이지리아에 등록된 독립 조직으로, 아프리카와 신흥 시장에 집중하며 인프라와 채택 경로를 구축하고 있습니다. 자세한 내용은 [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs)를 참고하세요.

### 교육

9. ZecHub는 Zcash를 위한 탈중앙 교육 허브입니다. 커뮤니티 구성원들은 튜토리얼, 위키 문서, 팟캐스트, 주간 뉴스레터를 통해 사람들이 생태계를 이해하고 참여하는 방법을 배울 수 있도록 돕는 콘텐츠를 함께 만들고, 검증하고, 홍보합니다. 지금 읽고 있는 이 위키도 ZecHub의 일부이며, Zcash Foundation은 일부 커뮤니티 자원을 관리하는 데 ZecHub와 협력합니다.

### 자금 조달

10. Zcash Community Grants는 블록 보상의 일부를 통해 독립 기여자와 커뮤니티 프로젝트에 자금을 지원하며, 핵심 조직을 넘어 많은 팀에 걸쳐 작업이 분산되도록 합니다. 자세한 내용은 [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)를 참고하세요.
11. Financial Privacy Foundation은 Zcash 생태계와 커뮤니티 프로젝트를 지원합니다. 자세한 내용은 [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)을 참고하세요.

이 모든 조직은 오픈 소스 저장소를 유지하므로, 누구나 그들의 작업을 읽고, 검토하고, 그 위에 새로운 작업을 구축할 수 있습니다. 그리고 조직만이 전부는 아닙니다. 많은 중요한 기여는 핵심 조직만이 아니라, 개인과 보조금으로 자금을 지원받는 계약 회사들로부터 나옵니다. 그 옆에는 지갑 팀, 지역 커뮤니티, 독립 개발자, 그리고 프로토콜을 직접 개발하지는 않지만 ZEC를 보유하고 지원하는 투자자들도 있습니다. 위 목록은 뼈대이지, 전체 그림은 아닙니다.

<br/>

## 신규 사용자는 어디서 시작하면 좋을까요

어떤 조직이 중요한지는 당신이 무엇을 하고 싶은지에 따라 달라집니다.

1. Zcash를 사용하려면 지갑이 필요하므로, ZODL과 그 지갑이 자연스러운 출발점입니다.
2. 노드를 운영하거나 네트워크 소프트웨어를 이해하고 싶다면, Zcash Foundation과 그 Zebra 노드를 살펴보세요.
3. 프로젝트에 자금을 지원하거나 유급 기여를 하고 싶다면, Zcash Community Grants를 살펴보세요.
4. 연구와 프로토콜의 미래를 따라가고 싶다면, Shielded Labs, Project Tachyon, 그리고 Valar Group을 주목하세요.

<br/>

## 계속 알아보기

이 위키는 더 깊이 들어갈 수 있도록 돕기 위해 존재하므로, 가장 좋은 다음 단계는 계속 읽어 나가는 것입니다. 신규 사용자에게 좋은 후속 주제 몇 가지는 다음과 같습니다.

- 기본적인 네트워크와 코인을 이해하려면 [ZEC와 Zcash란 무엇인가](https://zechub.wiki/start-here/what-is-zec-and-zcash)
- Zcash를 처음 사용하는 과정을 따라가려면 [신규 사용자 가이드](https://zechub.wiki/start-here/new-user-guide)
- Zcash가 트랜잭션을 어떻게 비공개로 유지하는지 보려면 [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools)
- 코인 공급량이 어떻게 검증 가능하게 유지되는지 보려면 [턴스타일](https://zechub.wiki/zcash-tech/the-turnstile)
- 네트워크가 마이그레이션 중인 실드 풀에 대해 보려면 [Ironwood](https://zechub.wiki/zcash-tech/ironwood)
- Zcash가 시간이 지나며 어떻게 바뀌는지 보려면 [네트워크 업그레이드](https://zechub.wiki/start-here/network-upgrades)
- 프라이버시 뒤에 있는 암호학을 이해하려면 [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks)

각 페이지는 더 많은 내용으로 이어지는 링크를 제공하므로, 원하는 만큼 계속 따라가 볼 수 있습니다.

<br/>

## 흔한 오해

- Zcash는 어느 한 회사가 소유하거나 통제하지 않으며, 어떤 단일 조직도 혼자서 네트워크를 바꾸거나 멈출 수 없습니다
- 2026년 분쟁은 네트워크, 자금, 또는 프라이버시에 영향을 주지 않았고, 그것은 조직 간의 의견 충돌이었으며, 그 전 과정 내내 프로토콜은 정상적으로 운영되었습니다
- Electric Coin Company를 떠난 팀이 있다고 해서 Zcash가 끝난 것이 아니며, 작업은 새로운 독립 조직들로 옮겨갔습니다
- 많은 조직이 있다는 것은 약점이 아니라 강점이며, 단일 실패 지점을 제거하고 프로젝트의 회복력을 유지해 줍니다
- ZEC를 보유하거나 홍보하는 것은 Zcash를 구축하는 것과 같지 않으며, 투자자와 전도사는 커뮤니티의 일부이지만 프로토콜을 개발하는 팀과는 구별됩니다

<br/>

## 관련 페이지

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - 이전 Electric Coin Company 팀이 설립한 개발 랩
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - 이전 Bootstrap 이사회 구성원들이 설립한 비영리 단체
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - 프로토콜과 Zebra 노드의 관리 주체
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - 연구와 프로토콜 지속 가능성
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - 2016년에 Zcash를 출시한 회사
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - 아프리카와 신흥 시장 전반의 인프라와 채택
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - 독립 기여자를 위한 자금 지원
