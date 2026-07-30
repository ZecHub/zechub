# Zaino 인덱서

Zaino는 릿스로 개발된 인덱서이며, Zingo 팀이 개발한 것으로 lightwalletd를 대체하고 zcashd의 사용 중단 프로젝트를 앞당기려는 목적으로 만들어졌습니다.

Zaino는 가벼운 클라이언트(예: 지갑 및 블록체인 전체 역사가 필요하지 않는 애플리케이션)와 전체 클라이언트 또는 지갑 모두에게 필수적인 기능을 제공합니다. 또한 블록 탐색기 지원도 포함되어 있어, Zebra 또는 zcashd의 전체 검증자에 의해 관리되는 최종화된 블록체인과 비최종화된 최상 체인 및 메모풀에 접근할 수 있도록 합니다.

## 새로운 인덱서가 필요한 이유

주요 이유는 미래를 대비하기 위해서입니다. Zcashd와 lightwalletd는 2016년에 bitcoind 코드에서 포크되어 C++으로 작성되었습니다. 이 두 서비스를 구축한 플랫폼과 코드는 점점 오래되고, 확장, 유지보수 및 현대적인 기능을 추가하는 것이 어려워지고 있습니다.

리스트는 현대적이며 견고하고 안전한 언어로, Zcash가 미래 개발에 대비할 수 있도록 해주며, 많은 새로운 개발자가 Zcash 생태계 주변과 위에 새로운 기능을 구축하도록 초대합니다.

그럼에도 불구하고, Zaino는 가능한 한 뒷 совмест성(호환성)을 유지하고자 합니다. API 및 인터페이스를 제공하여 채택 과정에서의 마찰을 줄이고, 더 넓은 Zcash 생태계가 Zaino의 개선 사항으로부터 이익을 볼 수 있도록 하되, 주요한 재작성이나 학습 곡선 없이도 가능하도록 합니다.

또한, RPC 액세스와 완전한 클라이언트 라이브러리를 통해 가벼운 클라이언트 기능을 전체 노드에서 분리할 수 있도록 하여, 개발자가 Zaino를 통합하고 가벼운 클라이언트 애플리케이션에서 직접 체인 데이터에 접근할 수 있도록 합니다. 이는 Zebra 노드의 민감한 데이터가 격리되고 보호되도록 해줍니다.

## Zaino 작동 방식을 보여주는 다이어그램

### Zaino 내부 아키텍처
![Zaino Internal Architecture](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Zaino 라이브 서비스 아키텍처
![Zebra Live Service Architecture](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Zaino 시스템 아키텍처
![Zaino System Architecture](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## 더 알아보기

공식 [Zcash 커뮤니티 포럼 스레드](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) 또는 공식 [Github 페이지](https://github.com/zingolabs/zaino)에서 Zaino 인덱서에 대해 더 읽을 수 있습니다.
