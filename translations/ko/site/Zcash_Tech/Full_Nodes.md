<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 풀 노드

## 요약

- 풀 노드는 Zcash 블록체인의 전체 사본을 보관하고, 새로운 블록과 거래가 합의 규칙을 따르는지 모두 확인합니다.
- Zebra(`zebrad`)는 현재 설치해야 할 노드입니다. Zakura는 Zebra에서 분기된 두 번째 구현체입니다.
- zcashd는 지원이 종료되었습니다. 지원 종료 중단은 2026년 7월 18일 블록 높이 3417100에서 발생했으며, 해당 노드는 더 이상 시작되지 않습니다.
- 이제 노드와 지갑은 별도의 프로그램입니다. [Zallet](https://github.com/zcash/zallet)는 노드에 연결되어 실행되며 키를 보관합니다.
- 자체 노드를 실행하면 독립적으로 검증할 수 있어 다른 사람의 서버를 신뢰할 필요가 없습니다.

## 핵심 설명

풀 노드는 암호화폐 블록체인의 전체 사본을 실행하는 소프트웨어로, 프로토콜 기능을 이용할 수 있게 해줍니다.

풀 노드는 제네시스부터 발생한 모든 거래의 전체 기록을 보관하므로 블록체인에 추가되는 새로운 거래와 블록의 유효성을 검증할 수 있습니다.

## 노드 구현체

### Zebra

Zebra는 Zcash Foundation가 만들고 Rust로 작성한 Zcash 프로토콜의 독립적이고 실제 운영 환경에 바로 사용할 수 있는 풀 노드 구현체입니다. zcashd가 지원 종료됨에 따라 Zebra(`zebrad`)가 새로 배포할 때 권장되는 풀 노드입니다.

Zebra는 블록과 거래를 검증하고, 피어 투 피어 네트워크에 참여하며, 애플리케이션을 위한 RPC 인터페이스를 제공합니다. 이제 지갑은 별도의 구성 요소입니다. [Zallet](https://github.com/zcash/zallet)는 Zebra 노드에 연결되어 실행되며 키와 잔액을 관리합니다. 이는 노드와 지갑을 단일 프로세스에 결합했던 zcashd를 대체합니다.

거래정보 보호 경량 지갑에 서비스를 제공하려면 기존 인덱서인 [lightwalletd](https://github.com/zcash/lightwalletd) 또는 새 인덱서인 [Zaino](https://zechub.wiki/zcash-tech/zaino)를 노드와 함께 실행해야 합니다.

설정 방법은 Zebra 책을 읽어 보시고, 지원이 필요하면 R&D Discord 서버에 참여해 주세요.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Zebra 책](https://zebra.zfnd.org)

설치 단계, 구성 및 하드웨어 요구 사항은 [Zebra 풀 노드](/zcash-tech/zebra-full-node)를 참조하세요.

### Zakura

Zakura는 합의 호환성을 갖춘 두 번째 풀 노드로, Zebra에서 분기되었으며 Valar Group가 Project Tachyon와 함께 개발했습니다. 동일한 프로토콜 규칙을 따르면서 더 빠른 동기화, 블록 가지치기, zcashd RPC 호환성 계층을 추가합니다. [Zakura 노드](/zcash-tech/zakura-node)를 참조하세요.

### zcashd(지원 종료)

> **참고:** zcashd는 지원이 종료되었습니다. Electric Coin Company [지원 중단을 발표했고](https://z.cash/support/zcashd-deprecation/), 자동 지원 종료 중단은 2026년 7월 18일 블록 높이 3417100에서 발생했습니다. 수정되지 않은 zcashd 6.20.0 노드는 모두 해당 높이에서 종료되며 다시 시작되지 않고, 소프트웨어는 NU6.3을 지원하지 않습니다. Zebra를 사용하세요. zcashd `wallet.dat`를 보유한 경우 [이전 가이드: zcashd에서 zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet)를 따르세요.

zcashd는 Zcash의 최초 풀 노드 구현체로, Electric Coin Company가 개발하고 유지 관리했습니다. 아래 빌드 지침은 참고용으로, 그리고 zcashd에서 마이그레이션하는 운영자를 위해 남겨 두었습니다.

zcashd는 RPC 인터페이스를 통해 여러 API를 제공합니다. 이러한 API를 사용하면 외부 애플리케이션이 노드와 상호작용할 수 있습니다.

[lightwalletd](https://github.com/zcash/lightwalletd)는 풀 노드를 사용하여 개발자가 zcashd와 직접 상호작용하지 않고도 모바일 친화적인 거래정보 보호 경량 지갑을 구축하고 유지 관리할 수 있게 해주는 애플리케이션의 예입니다.

[지원되는 RPC 명령 전체 목록](https://zcash.github.io/rpc/)

[zcashd 책](https://zcash.github.io/zcash/)

#### 노드 시작하기(Linux)

- 종속 항목 설치

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 최신 릴리스를 복제하고 체크아웃한 다음 설정 및 빌드:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- 블록체인 동기화(몇 시간 걸릴 수 있음)

    노드를 시작하려면 다음을 실행하세요.

      ./src/zcashd

- 개인 키는 ~/.zcash/wallet.dat에 저장됩니다.

[라즈베리 파이에서 zcashd 설정하기 안내](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## 실제 활용

### 네트워크

풀 노드를 실행하면 탈중앙화를 지원하여 zcash 네트워크를 강화하는 데 기여할 수 있습니다.

이는 적대적인 통제를 방지하고 일부 형태의 교란에도 네트워크가 회복력을 유지하도록 돕습니다.

DNS 시더는 내장 서버를 통해 신뢰할 수 있는 다른 노드 목록을 제공합니다. 이를 통해 거래가 네트워크 전체에 전파됩니다. Zcash Foundation의 시더는 [Zeeder](https://github.com/ZcashFoundation/zeeder)를 실행합니다. 이는 Rust로 작성된 DNS 시더로, 기존의 CoreDNS 기반 dnsseeder를 대체했습니다. 해당 이미지들은 `zfnd/zeeder`로 게시되며, 기존 `zfnd/dnsseeder` 이름은 폐기될 예정입니다.

### 네트워크 통계

다음은 Zcash 네트워크 데이터에 접근할 수 있는 플랫폼의 예입니다.

[Zcash 블록 탐색기](https://mainnet.zcashexplorer.app)

[Coin Metrics 네트워크 데이터](https://docs.coinmetrics.io/network-data/network-data-overview) — 지표 문서 및 현재 지원되는 자산 목록으로 연결되는 링크입니다.

테스트를 실행하거나 새로운 개선 사항을 제안하고 지표를 제공하여 네트워크 개발에 기여할 수도 있습니다.

### 채굴

채굴자는 getblocktemplate 및 getmininginfo와 같은 채굴 관련 RPC에 모두 접근하려면 풀 노드가 필요합니다.

zcashd는 거래정보 보호 코인베이스 채굴도 지원합니다. 채굴자와 채굴 풀은 기본적으로 z-address에 거래정보 보호 ZEC를 누적하도록 직접 채굴할 수 있습니다.

[채굴 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)를 읽거나 커뮤니티 포럼의 [Zcash 채굴자](https://forum.zcashcommunity.com/c/mining/13) 페이지에 참여하세요.

### 프라이버시

풀 노드를 실행하면 Zcash 네트워크의 모든 거래와 블록을 독립적으로 검증할 수 있습니다.

풀 노드를 실행하면 다른 사람을 대신해 거래를 검증해 주는 제3자 서비스 이용과 관련된 일부 프라이버시 위험을 피할 수 있습니다.

자체 노드를 사용하면 [Tor](https://zcash.github.io/zcash/user/tor.html)를 통해 네트워크에 연결할 수도 있습니다.
이렇게 하면 다른 사용자가 사용자의 .onion 주소를 통해 노드에 비공개로 연결할 수 있다는 추가 이점이 있습니다.

## 흔히 하는 실수

- 위 지침에 따라 zcashd를 빌드한 뒤 정상 작동하는 노드를 기대하는 것. 해당 바이너리는 지원 중단 높이에서 중단됩니다.
- 노드를 실행한 뒤 모바일 지갑도 이제 그 노드를 사용한다고 생각하는 것. 경량 지갑은 자체 노드를 지정하기 전까지 설정된 서버에 계속 연결됩니다. [경량 지갑 노드](/zcash-tech/lightwallet-nodes)를 참조하세요.
- `zebrad`만 실행한 뒤 경량 지갑이 연결될 것으로 기대하는 것. 노드 옆에서 lightwalletd 또는 [Zaino](/zcash-tech/zaino) 중 하나의 인덱서를 실행해야 합니다.
- 노드에서 지갑 RPC를 찾는 것. 키와 잔액은 Zallet로 옮겨졌습니다.

## 관련 페이지

- [Zebra 풀 노드](/zcash-tech/zebra-full-node) - 권장 노드의 설치, 구성 및 실행
- [Zakura 노드](/zcash-tech/zakura-node) - Zebra에서 분기된 두 번째 노드 구현체
- [경량 지갑 노드](/zcash-tech/lightwallet-nodes) - 경량 지갑이 조회하는 서버
- [Zaino](/zcash-tech/zaino) - 경량 지갑에 서비스를 제공하는 Rust 인덱서
- [Zinder](/zcash-tech/zinder) - Zcash Foundation의 Zebra 및 Zakura용 알파 인덱서
- [Zcash 지갑 동기화](/zcash-tech/zcash-wallet-syncing) - 동기화가 이러한 방식으로 작동하는 이유

## 더 알아보기

[지원 문서](https://zcash.readthedocs.io/en/latest/)를 읽어 보세요.

[Discord 서버](https://discord.gg/zcash)에 참여하거나 [X](https://X.com/ZecHub)로 문의해 주세요.
