<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 풀 노드

## 요약

- 풀 노드는 Zcash 블록체인의 완전한 사본을 보관하고, 모든 새 블록과 트랜잭션을 합의 규칙에 따라 검증합니다.
- Zebra (`zebrad`)은 현재 설치해야 할 노드입니다. Zakura은 Zebra에서 포크된 두 번째 구현체입니다.
- zcashd은 은퇴했습니다. 지원 종료 중단 시점은 2026년 7월 18일 블록 높이 3417100에서 도달했으며, 해당 노드는 더 이상 시작되지 않습니다.
- 이제 노드와 지갑은 별도의 프로그램입니다. [Zallet](https://github.com/zcash/zallet)은 노드와 함께 실행되며 키를 보관합니다.
- 자체 노드를 운영하면 독립적으로 검증할 수 있으며 다른 사람의 서버를 신뢰할 필요가 없어집니다.

## 핵심 설명

풀 노드는 암호화폐 블록체인의 완전한 사본을 실행하는 소프트웨어로, 프로토콜 기능에 접근할 수 있게 해줍니다.

제네시스 이후 발생한 모든 트랜잭션의 완전한 기록을 보유하므로, 블록체인에 추가되는 새 트랜잭션과 블록의 유효성을 검증할 수 있습니다.

## 노드 구현체

### Zebra

Zebra은 Zcash Foundation이 만들고 Rust로 작성한 Zcash 프로토콜의 독립적이며 프로덕션 준비가 된 풀 노드 구현체입니다. zcashd이 은퇴했으므로, 신규 배포에는 Zebra (`zebrad`)이 권장되는 풀 노드입니다.

Zebra은 블록과 트랜잭션을 검증하고, 피어 투 피어 네트워크에 참여하며, 애플리케이션을 위한 RPC 인터페이스를 제공합니다. 이제 지갑은 별도 구성 요소입니다. [Zallet](https://github.com/zcash/zallet)은 Zebra 노드와 함께 실행되며 키와 잔액을 처리합니다. 이는 노드와 지갑을 단일 프로세스에 묶었던 zcashd을 대체합니다.

차폐 라이트 지갑에 서비스를 제공하기 위해 노드는 기존의 [lightwalletd](https://github.com/zcash/lightwalletd) 또는 더 새로운 [Zaino](https://zechub.wiki/zaino) 인덱서와 함께 실행됩니다.

설정 방법은 반드시 Zebra 책을 읽어 보고, 지원이 필요하면 R&D Discord 서버에 참여하세요.

[Github](https://github.com/ZcashFoundation/zebra/)

[Zebra 책](https://zebra.zfnd.org)

설치 단계, 구성 및 하드웨어 요구 사항은 [Zebra 풀 노드](/zcash-tech/zebra-full-node)을 참조하세요.

### Zakura

Zakura은 Zebra에서 포크되어 Valar Group과 Project Tachyon이 함께 개발한, 합의 호환성을 갖춘 두 번째 풀 노드입니다. 동일한 프로토콜 규칙을 따르며 더 빠른 동기화, 블록 가지치기 및 zcashd RPC 호환성 계층을 추가합니다. [Zakura 노드](/zcash-tech/zakura-node)을 참조하세요.

### zcashd (은퇴)

> **참고:** zcashd은 은퇴했습니다. Electric Coin Company [지원 종료를 발표했으며](https://z.cash/support/zcashd-deprecation/), 자동 지원 종료 중단 시점은 2026년 7월 18일 블록 높이 3417100에서 도달했습니다. 수정되지 않은 모든 zcashd 6.20.0 노드는 해당 높이에서 종료되며 재시작을 거부하고, 소프트웨어는 NU6.3을 지원하지 않습니다. Zebra을 사용하세요. zcashd `wallet.dat`을 보유하고 있다면 [마이그레이션 가이드: zcashd에서 Zebrad/Zallet로](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet)를 따르세요.

zcashd은 Zcash의 원래 풀 노드 구현체로, Electric Coin Company이 개발하고 유지 관리했습니다. 아래 빌드 지침은 참고용 및 zcashd에서 마이그레이션하는 운영자를 위해 유지됩니다.

Zcashd는 RPC 인터페이스를 통해 API 세트를 제공합니다. 이러한 API는 외부 애플리케이션이 노드와 상호 작용할 수 있도록 하는 기능을 제공합니다.

[Lightwalletd](https://github.com/zcash/lightwalletd)는 개발자가 Zcashd와 직접 상호 작용하지 않고도 모바일 친화적인 차폐 라이트 지갑을 구축하고 유지 관리할 수 있도록, 풀 노드를 사용하는 애플리케이션의 예입니다.

[지원되는 RPC 명령 전체 목록](https://zcash.github.io/rpc/)

[Zcashd 책](https://zcash.github.io/zcash/)

#### 노드 시작하기 (Linux)

- 종속성 설치

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- 최신 릴리스 복제, 체크아웃, 설정 및 빌드:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- 블록체인 동기화 (몇 시간이 걸릴 수 있음)

    노드를 시작하려면 다음을 실행하세요:

      ./src/zcashd

- 개인 키는 ~/.zcash/wallet.dat에 저장됩니다

[Raspberry Pi에서 Zcashd 사용 가이드](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## 실질적 영향

### 네트워크

풀 노드를 운영하면 탈중앙화를 지원하여 zcash 네트워크를 강화하는 데 기여하게 됩니다.

이는 적대적 통제를 방지하고 일부 형태의 중단에 대한 네트워크 복원력을 유지하는 데 도움이 됩니다.

DNS 시더는 내장 서버를 통해 신뢰할 수 있는 다른 노드 목록을 제공합니다. 이를 통해 트랜잭션이 네트워크 전체로 전파될 수 있습니다.

### 네트워크 통계

다음은 Zcash 네트워크 데이터에 접근할 수 있는 예시 플랫폼입니다:

[Zcash 블록 탐색기](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

테스트를 실행하거나 새로운 개선안을 제안하고 지표를 제공하여 네트워크 개발에 기여할 수도 있습니다.

### 채굴

채굴자는 getblocktemplate 및 getmininginfo 같은 모든 채굴 관련 RPC에 접근하기 위해 풀 노드가 필요합니다.

Zcashd는 차폐된 코인베이스로의 채굴도 지원합니다. 채굴자와 채굴 풀은 기본적으로 z-주소에서 차폐된 ZEC을 축적하도록 직접 채굴할 수 있습니다.

[채굴 가이드](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html)를 읽거나 [Zcash 채굴자](https://forum.zcashcommunity.com/c/mining/13)를 위한 커뮤니티 포럼 페이지에 참여하세요.

### 개인정보 보호

풀 노드를 운영하면 Zcash 네트워크의 모든 트랜잭션과 블록을 독립적으로 검증할 수 있습니다.

풀 노드를 운영하면 사용자를 대신해 트랜잭션을 검증하는 제3자 서비스를 이용할 때 발생하는 일부 개인정보 보호 위험을 피할 수 있습니다.

자체 노드를 사용하면 [Tor](https://zcash.github.io/zcash/user/tor.html)를 통해 네트워크에 연결할 수도 있습니다.
이렇게 하면 다른 사용자도 노드의 .onion 주소에 비공개로 연결할 수 있다는 추가 이점이 있습니다.

## 흔한 실수

- 위 지침으로 zcashd을 빌드하고 작동하는 노드를 기대하는 것. 해당 바이너리는 지원 종료 높이에서 중단됩니다.
- 노드를 운영하고 모바일 지갑이 이제 이를 사용한다고 가정하는 것. 라이트 지갑은 자체 서버를 지정하기 전까지 구성된 서버와 계속 통신합니다. [라이트월렛 노드](/zcash-tech/lightwallet-nodes)를 참조하세요.
- `zebrad`만 실행하고 라이트 지갑이 연결될 것을 기대하는 것. 노드 옆에는 lightwalletd 또는 [Zaino](/zcash-tech/zaino) 중 하나의 인덱서가 필요합니다.
- 노드에서 지갑 RPC를 찾는 것. 키와 잔액은 Zallet으로 옮겨졌습니다.

## 관련 페이지

- [Zebra 풀 노드](/zcash-tech/zebra-full-node) - 권장 노드 설치, 구성 및 실행
- [Zakura 노드](/zcash-tech/zakura-node) - Zebra에서 포크된 두 번째 노드 구현체
- [라이트월렛 노드](/zcash-tech/lightwallet-nodes) - 라이트 지갑이 질의하는 서버
- [Zaino](/zcash-tech/zaino) - 라이트 지갑에 서비스를 제공하는 Rust 인덱서
- [Zcash 지갑 동기화](/zcash-tech/zcash-wallet-syncing) - 동기화가 작동하는 방식

## 추가 학습

[지원 문서](https://zcash.readthedocs.io/en/latest/)를 읽어보세요

[Discord 서버](https://discord.gg/zcash)에 참여하거나 [X](https://X.com/ZecHub)에서 연락하세요
