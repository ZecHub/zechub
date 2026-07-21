<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Raspberry Pi 4에서 Zebra 실행 가이드

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Raspberry Pi 4에서 Zebra 노드 소프트웨어를 실행하면 Zcash 네트워크에 독립적이고 합의 가능한 노드로 참여할 수 있습니다. 이 가이드는 Raspberry Pi 4에서 Zebra를 설정하고 실행하는 단계를 안내합니다.

## 사전 조건

1. Raspberry Pi 4 (2GB RAM 이상 권장).

2. 설치된 Raspberry Pi OS (Raspbian)가 포함된 마이크로SD 카드 (16GB 이상 권장).

3. 안정적인 인터넷 연결.

4. 초기 설정을 위한 키보드, 마우스 및 모니터.

5. 원격 액세스를 위해 SSH 클라이언트 (선택 사항).

## 설치

1. __시스템 업데이트__
   터미널을 열거나 Raspberry Pi에 SSH로 접속한 후 다음 명령어를 실행하여 시스템이 최신 상태인지 확인합니다:

   __sudo apt update__

   __sudo apt upgrade__

2. __의존성 설치__
   Zebra를 빌드하고 실행하기 위해 필요한 의존성을 설치해야 합니다:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Zebra 저장소 클론__
   터미널을 열고 Raspberry Pi에 Zebra 저장소를 클론합니다:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Zebra 빌드__
   다음 명령어로 Zebra를 빌드합니다:

   __cargo build --release__

   이 과정은 시간이 오래 걸릴 수 있습니다. Raspberry Pi가 충분히 냉각되도록 하세요. 컴파일 중 열이 발생할 수 있기 때문입니다.

5. __설정__
   Zebra를 위한 설정 파일을 생성합니다. 기본 설정을 시작점으로 사용할 수 있습니다:

   __cp zcash.conf.example zcash.conf__

   zcash.conf 파일을 편집하여 노드의 설정을 맞춤화하세요. 네트워크, 채굴 활성화, 피어 연결 설정 등을 지정할 수 있습니다.

6. __Zebra 실행__
   이제 사용자 정의 설정으로 Zebra를 시작할 수 있습니다:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   이 명령은 Zebra 노드를 시작하고, Zcash 블록체인과 동기화를 시작합니다.

7. __모니터링__
   웹 브라우저에서 다음 주소로 이동하여 Zebra 노드의 진행 상황 및 상태를 모니터링할 수 있습니다: __http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## 문제 해결

Zebra를 빌드하거나 실행하는 과정에서 문제가 발생하면 [Zebra 문서](https://doc.zebra.zfnd.org/docs/intro.html)에서 문제 해결 팁 및 추가 정보를 확인하세요.

Raspberry Pi가 노드를 실행하면서 열을 발생시킬 수 있으므로, 냉각 솔루션(예: 선풍기 또는 히트 싱크)을 사용하는 것이 좋습니다.

## 결론

이 가이드를 따르면 Raspberry Pi 4에서 Zebra를 성공적으로 설치하고 실행했을 것입니다. 이제 독립 노드로서 Zcash 네트워크에 참여하여 Zcash 거래의 프라이버시 보안에 기여하고 있습니다.
