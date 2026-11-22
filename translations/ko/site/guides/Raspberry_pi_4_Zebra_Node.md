<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zebra 실행을 위한 라즈베리 파이 4 가이드

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="라즈베리 파이" width="300" height="300"/>

라즈베리 파이 4에서 Zebra 노드 소프트웨어를 실행하면 독립적이며 합의와 호환되는 노드로서 Zcash 네트워크에 참여할 수 있습니다. 이 가이드에서는 라즈베리 파이 4에 Zebra를 설정하고 실행하는 방법을 안내합니다.

## 사전 준비 사항

1. 라즈베리 파이 4(RAM 2GB 이상 권장).

2. Raspberry Pi OS(Raspbian)가 설치된 마이크로SD 카드(16GB 이상 권장).

3. 안정적인 인터넷 연결.

4. 키보드, 마우스 및 모니터(초기 설정용).

5. SSH 클라이언트(선택 사항, 원격 접속용).

## 설치

1. __시스템 업데이트__
   터미널을 열거나 SSH로 라즈베리 파이에 접속한 다음, 다음 명령을 실행해 시스템이 최신 상태인지 확인합니다.

   __sudo apt update__

   __sudo apt upgrade__

2. __종속 항목 설치__
   Zebra를 빌드하고 실행하는 데 필요한 종속 항목을 설치해야 합니다.

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Zebra 저장소 복제__
   터미널을 열고 Zebra 저장소를 라즈베리 파이에 복제합니다.

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Zebra 빌드__
   Zebra를 빌드하려면 다음 명령을 사용합니다.

   __cargo build --release__

   이 과정은 시간이 걸릴 수 있습니다. 컴파일 중 열이 발생할 수 있으므로 라즈베리 파이가 충분히 냉각되는지 확인합니다.

5. __구성__
   Zebra의 구성 파일을 만듭니다. 기본 구성을 시작점으로 사용할 수 있습니다.

   __cp zcash.conf.example zcash.conf__

   zcash.conf 파일을 편집해 노드 설정을 맞춤 구성합니다. 네트워크를 지정하고, 채굴을 활성화하고, 피어 연결을 설정하는 등의 작업을 할 수 있습니다.

6. __Zebra 시작__
   이제 맞춤 구성으로 Zebra를 시작할 수 있습니다.

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   이 명령은 Zebra 노드를 시작하고, 노드는 Zcash 블록체인과 동기화를 시작합니다.

7. __모니터링__
   웹 브라우저를 열고 __http://127.0.0.1:8233/status__.로 이동하면 Zebra 노드의 진행 상황과 상태를 모니터링할 수 있습니다.

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra 로고" width="200" height="200"/>

## 문제 해결

Zebra를 빌드하거나 실행하는 데 문제가 발생하면, 문제 해결 팁과 추가 정보는 [Zebra 문서](https://zebra.zfnd.org/user/troubleshooting.html)를 확인합니다.

노드를 실행하면 열이 발생할 수 있으므로 라즈베리 파이를 시원하게 유지해야 합니다. 팬이나 방열판 같은 냉각 장치를 사용하는 것이 좋습니다.

## 결론

이 가이드에 따라 라즈베리 파이 4에서 Zebra를 성공적으로 설정하고 실행했을 것입니다. 이제 독립적인 노드로 Zcash 네트워크에 기여하여 Zcash 거래의 프라이버시를 보호하는 데 도움을 주고 있습니다.
