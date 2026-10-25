#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[공식 웹사이트](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs는 인간 경험을 향상하는 데 전념하는 선구자들로 이루어진 팀입니다. 우리는 기술이 인류에 이로워야 하며, 합의에 기반한 상호작용을 통해 번영한다고 믿습니다. 이를 가능하게 하는 패턴을 찾아내고 있습니다.

Zingo Lab Cyan은 Shielded DAO로 운영됩니다. 저희는 모든 구성원이 뷰 키를 보유한 트레저리에 자금을 보관합니다. 구성원들이 제안에 찬성 투표할 때 트레저리에서 자금이 지출됩니다.

## 프로젝트

### Zingo! 지갑 ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo 지갑은 사용자 친화적으로 설계된 모든 기능을 갖춘 Zcash 지갑이며, 고급 사용자를 위한 일부 고급 기능도 포함합니다. 투명, Sapling 및 Ironwood 풀을 지원하고, 반복 결제를 위한 주소록을 제공하며, 다양한 언어로 이용할 수 있습니다. Orchard를 지원하고 NU5 형식을 구현한 최초의 지갑이었습니다.

Zingo!의 주요 기능 중 하나는 메모 필드를 사용하여 거래에 대한 유용한 정보를 제공하는 기능입니다.

Zingo!는 모바일 기기와 PC에서 사용할 수 있습니다. 모든 다운로드는 [여기](https://zingolabs.org/)에서 찾을 수 있습니다.

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
앱에서 사용할 수 있도록 zcash 기능을 노출하는 API 및 테스트 앱입니다. Zingolib는 zingo-mobile용 라이브러리와 함께 zingo-cli라는 포함된 CLI 애플리케이션을 제공합니다. 이는 [Zaino](/zcash-tech/zaino) 같은 체인 인덱서와 통신하는 명령줄 라이트 지갑입니다.

### Zaino 인덱서 ([GitHub](https://github.com/zingolabs/zaino))
Zaino는 Zingo 팀이 개발한 Zcash 블록체인을 위한 Rust 인덱서입니다. [Z3 스택](/zcash-tech/z3-stack)의 인덱서로서, [Zebra](/zcash-tech/zebra-full-node) 검증자로부터 체인 데이터를 인덱싱하고 지갑, 탐색기 및 기타 클라이언트에 제공합니다. lightwalletd의 후속 경로입니다.

Zaino는 지갑처럼 전체 블록체인 기록이 필요하지 않은 애플리케이션과 라이트 클라이언트, 그리고 풀 클라이언트 또는 지갑 모두에 필수 기능을 제공합니다. 또한 Zebra 풀 검증자가 관리하는 확정된 블록체인과 확정되지 않은 최적 체인 및 멤풀 모두에 접근할 수 있도록 블록 탐색기도 지원합니다.

`zcashd`는 2026년 7월 18일 블록 3,417,100에서 지원 종료 중단 상태에 도달했으며 Ironwood (NU6.3)를 지원하지 않습니다. Zaino는 Zebra 검증자를 읽습니다.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Zcash 프로세스를 실행하고 관리하는 유틸리티 모음입니다. 이는 다음의 개발 과정에서 통합 테스트에 사용됩니다.
- 라이트 클라이언트
- 인덱서
- 검증자

그 목표는 Zebra 같은 핵심 노드(검증자), Zaino 같은 인덱서, zingo-cli 같은 라이트 클라이언트 지갑을 위한 고도로 유연하고 견고한 테스트 환경을 제공하는 것입니다.

기본적으로 실행되는 스택은 Zebrad, zainod 및 zcash-devtool입니다. 레거시 `zcashd` 및 lightwalletd 프로세스는 지원되지 않는 `legacy-stack` 기능 뒤에 있으며 제거될 예정입니다.

메인넷, 테스트넷 및 regtest를 위한 Zcash 체인 데이터를 시작, 캐시 및 로드하는 도구를 제공하는 것 외에도, zcash-local-net은 Zaino의 테스트 스위트에서 Zaino에 호스팅된 Lightwallet RPC 서비스를 평가하는 데 사용됩니다([Zaino 테스트 문서](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md) 참조).
