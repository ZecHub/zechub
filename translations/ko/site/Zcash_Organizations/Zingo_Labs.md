#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[공식 웹사이트](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs는 인간의 경험을 향상하는 데 전념하는 선구자들로 이루어진 팀입니다. 기술은 인류에 도움이 되어야 하며, 우리는 서로 동의하는 상호작용을 통해 번영한다고 믿습니다. 이를 가능하게 하는 패턴을 찾아내고 있습니다.

Zingo Lab Cyan은 거래정보 보호 DAO로 운영됩니다. 공동 기금에 자금을 보관하며, 모든 구성원은 viewing key를 보유합니다. 구성원들이 제안에 찬성표를 던지면 공동 기금에서 자금을 지출합니다.

## 프로젝트

### Zingo! 지갑 ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo 지갑은 사용하기 쉽게 설계된 모든 기능을 갖춘 Zcash 지갑이지만, 고급 사용자를 위한 일부 고급 기능도 포함합니다. 투명 주소, Sapling 및 Ironwood 풀을 지원하고, 반복 결제를 위한 주소록이 있으며, 다양한 언어로 제공됩니다. Orchard를 지원하고 NU5 형식을 구현한 최초의 지갑입니다.

Zingo!의 주요 기능 중 하나는 메모 필드를 사용해 거래에 관한 유용한 정보를 제공하는 것입니다.

모바일용 Zingo 3.0(2026년 10월 31일)은 NU7를 지원하고 SwapKit을 통한 크로스체인 스왑 기능을 내장합니다. PC 앱은 2.0.26 버전부터 SwapKit 스왑을, 2.0.27 버전부터 메인넷 NU7 지원을 제공해 왔습니다.

Zingo!은 모바일 기기와 PC에서 사용할 수 있습니다. 모든 다운로드는 [여기](https://zingolabs.org/)에서 찾을 수 있습니다.

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
앱에서 사용할 수 있도록 Zcash 기능을 제공하는 API 및 테스트 앱입니다. Zingolib은 zingo-mobile용 라이브러리와 zingo-cli이라는 명령줄 라이트 지갑 앱을 함께 제공합니다. 이 앱은 [Zaino](/zcash-tech/zaino)과 같은 체인 인덱서와 통신합니다.

### Zaino 인덱서 ([GitHub](https://github.com/zingolabs/zaino))
Zaino는 Zingo 팀이 개발한 Zcash 블록체인용 Rust 인덱서입니다. [Z3 스택](/zcash-tech/z3-stack)의 인덱서로, [Zebra](/zcash-tech/zebra-full-node) 검증자의 체인 데이터를 인덱싱하고 지갑, 블록 탐색기 및 기타 클라이언트에 제공합니다. lightwalletd를 잇는 후속 경로입니다.

Zaino는 전체 블록체인 기록이 필요하지 않은 지갑 및 애플리케이션 같은 라이트 클라이언트와 풀 클라이언트 또는 지갑 모두에 필수적인 기능을 제공합니다. 또한 블록 탐색기도 지원하여, Zebra 풀 검증자가 관리하는 최종 확정 블록체인과 미확정 최적 체인 및 메모리풀 모두에 접근할 수 있게 합니다.

`zcashd`는 2026년 7월 18일 블록 3,417,100에서 지원 종료로 중단되었으며 Ironwood(NU6.3)을 지원하지 않습니다. Zaino는 Zebra 검증자의 데이터를 읽습니다.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Zcash 프로세스를 시작하고 관리하는 유틸리티 모음입니다. 다음 항목의 개발 과정에서 통합 테스트에 사용됩니다.
- 라이트 클라이언트
- 인덱서
- 검증자

목표는 Zebra 같은 핵심 노드(검증자), Zaino 같은 인덱서, zingo-cli 같은 라이트 클라이언트 지갑을 위한 유연하고 견고한 테스트 환경을 제공하는 것입니다.

기본 스택은 Zebrad, zainod 및 zcash-devtool로 구성됩니다. 레거시 `zcashd` 및 lightwalletd 프로세스는 지원이 중단된 `legacy-stack` 기능을 통해 실행되며, 제거될 예정입니다.

Zcash 체인 데이터(메인넷, 테스트넷 및 regtest용)를 시작하고 캐시하고 불러오는 도구를 제공하는 것 외에도, zcash-local-net은 Zaino의 테스트 스위트에서 Zaino에 호스팅된 Lightwallet RPC 서비스를 테스트하는 데 사용됩니다([Zaino 테스트 문서](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md) 참조).
