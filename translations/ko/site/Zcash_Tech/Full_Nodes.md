<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 전체 노드

전체 노드는 암호화폐의 블록체인을 완전히 복사하여 실행하는 소프트웨어로, 프로토콜의 기능에 접근할 수 있게 해줍니다.

이 노드는 생성 이후 발생한 모든 거래의 전체 기록을 보유하고 있기 때문에, 블록체인에 추가되는 새로운 거래와 블록의 유효성을 검증할 수 있습니다.

## Zcashd

Zcashd는 현재 Zcash에서 사용하는 주요 전체 노드 구현으로, Electric Coin Company가 개발 및 유지보수하고 있습니다.

Zcashd는 RPC 인터페이스를 통해 일련의 API를 제공합니다. 이러한 API는 외부 애플리케이션이 노드와 상호작용할 수 있도록 기능을 제공합니다.

[Lightwalletd](https://github.com/zcash/lightwalletd)는 전체 노드를 사용하여 개발자가 Zcashd와 직접적으로 상호작용하지 않고도 모바일 친화적인 가상 지갑을 구축하고 유지보수할 수 있도록 해주는 애플리케이션의 예입니다.

[지원되는 RPC 명령어 목록 전체 보기](https://zcash.github.io/rpc/)

[Zcashd 문서](https://zcash.github.io/zcash/)


### 노드 실행 (Linux)

- 의존성 설치

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 최신 릴리스를 클론, 체크아웃, 설정 및 빌드:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- 블록체인 동기화 (수시간이 소요될 수 있음)

    노드를 실행하려면 다음을 실행합니다:

      ./src/zcashd

- 개인 키는 ~/.zcash/wallet.dat에 저장됩니다.

[Raspberry Pi에서 Zcashd 실행 가이드](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra는 Zcash Foundation에서 개발한 Zcash 프로토콜용 독립적인 전체 노드 구현입니다.

현재 테스트 중이며, 여전히 실험적입니다.

Zebra에는 두 가지 주요 구성 요소가 있습니다. 블록체인 스캔 및 거래의 시도 복호화를 담당하는 클라이언트 구성 요소와, 지출 키, 주소를 관리하고 zebrad에 있는 클라이언트 구성 요소와 통신하여 기본 지갑 기능을 제공하는 zebra 명령줄 도구입니다.

블록 채굴을 위해 Zebra를 사용해 보고 싶은 사람은 R&D 디스코드 서버에 가입하셔야 합니다. 또한 설정 지침을 읽기 위해 [Zebra 문서](https://zebra.zfnd.org)도 확인하시기 바랍니다.

[Github](https://github.com/ZcashFoundation/zebra/)

[The Zebra Book](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## 네트워크

전체 노드를 실행함으로써 Zcash 네트워크의 분산화를 지원하여 네트워크를 강화하는 데 도움을 줍니다.

이것은 적대적인 통제를 방지하고 일부 형태의 중단에 대한 네트워크의 회복력을 유지하는 데 도움이 됩니다.

DNS 시드러는 내장 서버를 통해 다른 신뢰할 수 있는 노드 목록을 제공합니다. 이는 거래가 네트워크 전반으로 전파되도록 합니다.

### 네트워크 통계

다음은 Zcash 네트워크 데이터에 접근할 수 있는 예시 플랫폼입니다:

[Zcash 블록 탐색기](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

네트워크 개발에 기여하기 위해 테스트를 실행하거나 새로운 개선사항을 제안하고 메트릭스를 제공하는 것도 가능합니다. 



### 채굴

채굴자는 getblocktemplate 및 getmininginfo와 같은 모든 채굴 관련 RPC에 접근하기 위해 전체 노드가 필요합니다.

Zcashd는 또한 보호된 코인베이스로의 채굴을 활성화합니다. 채굴자 및 채굴 풀은 기본적으로 z-주소를 통해 보호된 ZEC을 누적하는 방식으로 직접 채굴할 수 있는 선택권이 있습니다.

[채굴 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)를 읽거나 [Zcash 채굴자](https://forum.zcashcommunity.com/c/mining/13) 커뮤니티 포럼 페이지에 가입해 보세요.

### 프라이버시

전체 노드를 실행함으로써 Zcash 네트워크 상의 모든 거래 및 블록을 독립적으로 검증할 수 있습니다.

제3자 서비스를 사용하여 거래를 대신 검증하는 것과 관련된 일부 프라이버시 위험도 회피할 수 있습니다.

자신의 노드를 사용하면 [Tor](https://zcash.github.io/zcash/user/tor.html)을 통해 네트워크에 연결할 수도 있습니다. 이는 다른 사용자가 자신의 노드 .onion 주소를 통해 개인적으로 연결할 수 있는 추가적인 장점이 있습니다.


**도움이 필요하신가요?**

[지원 문서](https://zcash.readthedocs.io/en/latest/)를 읽어보세요.

[디스코드 서버](https://discord.gg/zcash)에 가입하거나 [트위터](https://twitter.com/ZecHub)에서 우리에게 연락해 보세요.

---

**Protected terms (keep in English):** `Zaino` `Zallet`
