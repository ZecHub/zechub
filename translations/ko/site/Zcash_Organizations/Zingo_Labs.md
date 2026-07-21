#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="Alt Text" width="50"/> ZingoLabs

[공식 웹사이트](https://zingolabs.org/) - [Github](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [인스타그램](https://www.instagram.com/zingolabesp/)

ZingoLabs는 인간 경험을 향상시키기 위해 열정을 가진 혁신가들의 팀입니다. 우리는 기술이 인류에 이익을 주어야 하며, 우리가 합의를 통해 상호작용함으로써 번영한다고 믿습니다. 이러한 가능성을 만들어내는 패턴들을 파악하고 있습니다.

Zingo Lab Cyan은 Shielded DAO로 운영됩니다. 우리의 자금은 모든 구성원이 시야 키를 가진 보물고에 저장되어 있습니다. 구성원들이 제안을 지지하는 경우, 보물고에서 자금이 사용됩니다.

## 프로젝트

### Zingo! Wallet ([Github](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet은 사용자 친화성을 중점으로 하되, 고급 기능도 포함한 완전한 Zcash 지갑입니다. 투명, Sapling 및 Orchard 풀을 지원하며, 반복적인 결제를 위한 주소록이 있고 여러 언어로 제공됩니다. Orchard를 처음 지원하고 NU5 형식을 구현한 최초의 지갑입니다.

Zingo!의 주요 기능 중 하나는 메모 필드를 사용하여 거래에 대한 유용한 정보를 제공할 수 있는 능력입니다.

Zingo!는 모바일 장치와 PC에서 이용 가능합니다. 모든 다운로드는 [여기](https://zingolabs.org/)에서 찾을 수 있습니다.

### Zingolib ([Github](https://github.com/zingolabs/zingolib))
앱이 사용할 수 있도록 zcash 기능을 노출하는 API 및 테스트 앱입니다. Zingolib은 zingo-mobile용 라이브러리와 lightwalletd를 통해 zcashd와 상호작용하는 Zingo-cli라는 명령줄 lightwalletd-프록시 클라이언트가 포함된 CLI 애플리케이션을 제공합니다.

### Zaino Indexer ([Github](https://github.com/zingolabs/zaino))
Zaino는 Rust로 개발된 Zingo 팀의 인덱서이며, lightwalletd를 대체하고 zcashd 폐지 프로젝트를 앞당기려는 목표를 가지고 있습니다.

Zaino는 가벼운 클라이언트(예: 지갑 및 블록체인 전체 역사가 필요하지 않은 앱)와 전체 클라이언트 또는 지갑 모두에 필수적인 기능을 제공합니다. 또한, Zebra 또는 zcashd 전체 검증자로 관리되는 최종화된 블록체인과 비최종화된 최상의 체인 및 메모풀에 접근할 수 있는 블록 탐색기도 지원합니다.

###  ZLN (zcash-local-net) ([Github](https://github.com/zingolabs/zcash-local-net))
Zcash 프로세스를 시작하고 관리하는 유틸리티의 집합입니다. 다음을 개발할 때 통합 테스트에 사용됩니다:
- 가벼운 클라이언트
- 인덱서
- 검증자

그 목표는 Zcash 및 Zebra와 같은 핵심 노드(검증자)에 대해 매우 유연하고 견고한 테스트 환경을 제공하는 것입니다. 또한, lightwallet과 zaino와 같은 인덱서, 최소한의 zingo-cli를 가벼운 클라이언트 지갑으로 사용합니다.

이 저장소는 Zcashd 폐지 과정 중 마이그레이션을 용이하게 하기 위해 다양한 검증자(예: Zcashd 및 Zebrad)와 인덱서(예: Lightwalletd 및 Zaino)의 기능을 비교하는 데 설계되었습니다.

또한, 메인넷, 테스트넷, regtest에 대한 Zcash 체인 데이터를 시작, 캐시 및 로드할 수 있는 도구를 제공하는 것 외에도 zcash-local-net은 Lightwalletd와 Zaino의 모든 Lightwallet RPC 서비스에서 기능을 비교하는 일련의 테스트를 포함합니다. 이러한 테스트는 Zaino에서 직접 실행할 수 있습니다(예: [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md))로, Zaino에 호스팅된 Lightwallet RPC 서비스를 평가할 수 있습니다.
