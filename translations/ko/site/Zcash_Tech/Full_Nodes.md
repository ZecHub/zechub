<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 전체 노드

전체 노드는 모든 암호화폐의 블록체인 전체 사본을 실행하여 프로토콜 기능에 접근할 수 있게 해주는 소프트웨어입니다.

제네시스 이후 발생한 모든 거래의 완전한 기록을 보유하므로, 블록체인에 추가되는 새로운 거래와 블록의 유효성을 검증할 수 있습니다.

## Zcashd

> **참고:** zcashd는 사용 중단(deprecated)되고 있습니다. Electric Coin Company는 zcashd가 종료될 것이라고 [공식 발표](https://z.cash/support/zcashd-deprecation/)했으며, 전체 노드 역할은 [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`)가, 지갑 역할은 [Zallet](https://github.com/zcash/zallet)가 대체합니다. 새로운 배포에는 Zebra(아래 참조)를 사용하세요. 이미 zcashd 노드를 운영 중이라면 [마이그레이션 가이드: zcashd에서 Zebrad/Zallet로](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet)를 따르세요.

zcashd는 Electric Coin Company가 개발하고 유지보수한 Zcash의 원래 전체 노드 구현체였습니다. 아래 빌드 지침은 참고용 및 zcashd에서 마이그레이션하는 운영자를 위해 유지되고 있습니다.

Zcashd는 RPC 인터페이스를 통해 일련의 API를 제공합니다. 이 API들은 외부 애플리케이션이 노드와 상호작용할 수 있도록 하는 기능을 제공합니다.

[Lightwalletd](https://github.com/zcash/lightwalletd)는 개발자가 Zcashd와 직접 상호작용하지 않고도 모바일 친화적인 shielded 라이트 월렛을 구축하고 유지할 수 있도록, 전체 노드를 사용하는 애플리케이션의 한 예입니다.

[지원되는 RPC 명령어 전체 목록](https://zcash.github.io/rpc/)

[Zcashd 책](https://zcash.github.io/zcash/)


### 노드 시작하기 (Linux)

- 의존성 설치 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 최신 릴리스를 클론하고, 체크아웃하고, 설정하고, 빌드하기:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- 블록체인 동기화(몇 시간이 걸릴 수 있음)

    노드를 시작하려면 다음을 실행하세요:

      ./src/zcashd

- 개인 키는 ~/.zcash/wallet.dat에 저장됩니다.

[라즈베리 파이용 Zcashd 가이드](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra는 Zcash Foundation이 만들고 Rust로 작성한, 독립적이며 프로덕션 준비가 된 Zcash 프로토콜의 전체 노드 구현체입니다. zcashd가 종료됨에 따라 Zebra (`zebrad`)는 새로운 배포에 권장되는 전체 노드입니다.

Zebra는 블록과 거래를 검증하고, P2P 네트워크에 참여하며, 애플리케이션을 위한 RPC 인터페이스를 제공합니다. 이제 지갑은 별도 구성 요소입니다. [Zallet](https://github.com/zcash/zallet)은 Zebra 노드와 함께 실행되며 키와 잔액을 처리합니다. 이는 노드와 지갑을 하나의 프로세스에 함께 포함했던 zcashd를 대체합니다.

shielded 라이트 월렛을 서비스하려면, 노드는 기존의 [lightwalletd](https://github.com/zcash/lightwalletd) 또는 더 새로운 [Zaino](https://zechub.wiki/zaino)와 같은 인덱서와 함께 실행됩니다.

설정 지침은 반드시 Zebra book을 읽고, 지원을 위해 R&D Discord 서버에 참여하세요. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Zebra Book](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## 네트워크

전체 노드를 실행하면 분산화를 지원함으로써 zcash 네트워크를 더 강하게 만드는 데 도움을 주게 됩니다. 

이는 적대적인 통제를 방지하고 네트워크가 일부 형태의 장애에 대해 복원력을 유지하도록 돕습니다.

DNS 시더는 내장 서버를 통해 다른 신뢰할 수 있는 노드 목록을 제공합니다. 이를 통해 거래가 네트워크 전체로 전파될 수 있습니다. 

### 네트워크 통계

다음은 Zcash 네트워크 데이터에 접근할 수 있게 해주는 플랫폼의 예입니다:

[Zcash 블록 탐색기](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

또한 테스트를 실행하거나 새로운 개선안을 제안하고 메트릭을 제공함으로써 네트워크 개발에 기여할 수도 있습니다. 



### 채굴

채굴자는 getblocktemplate 및 getmininginfo와 같은 모든 채굴 관련 rpc에 접근하기 위해 전체 노드가 필요합니다. 

Zcashd는 또한 shielded coinbase로의 채굴을 지원합니다. 채굴자와 채굴 풀은 기본적으로 z-address에 shielded ZEC를 축적하도록 직접 채굴할 수 있는 선택권이 있습니다. 

[채굴 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)를 읽거나 [Zcash 채굴자](https://forum.zcashcommunity.com/c/mining/13)를 위한 커뮤니티 포럼 페이지에 참여하세요.

### 프라이버시 

전체 노드를 실행하면 Zcash 네트워크의 모든 거래와 블록을 독립적으로 검증할 수 있습니다.

전체 노드를 실행하면 거래 검증을 제3자 서비스에 대신 맡길 때 발생하는 일부 프라이버시 위험을 피할 수 있습니다.

자신의 노드를 사용하면 [Tor](https://zcash.github.io/zcash/user/tor.html)를 통해 네트워크에 연결하는 것도 가능합니다.
이는 다른 사용자가 당신의 노드 .onion 주소에 비공개로 연결할 수 있게 해주는 추가적인 장점도 있습니다.


**도움이 필요하신가요?**

[지원 문서](https://zcash.readthedocs.io/en/latest/)를 읽어보세요

[Discord Sever](https://discord.gg/zcash)에 참여하거나 [twitter](https://twitter.com/ZecHub)에서 문의하세요
