# Ywallet FROST 데모

> **Ywallet은 더 이상 유지보수되지 않습니다.** 개발자는 Ironwood (NU6.3)에 맞춰 업데이트되지 않을 것이라고 확인했으므로, 더 이상 체인을 따라갈 수 없으며 아래 단계는 메인넷에서 완료할 수 없습니다. 이 페이지는 참고용으로 유지됩니다. 동일한 개발자가 만든 Zkool은 유지보수되는 후속 제품이며 FROST 멀티시그를 지원합니다.

## FROST 바이너리 컴파일

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

위 리포지토리를 사용하고 컴파일 지침을 따르세요: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

바이너리는 target 폴더에 생성됩니다.


## FROST UA 생성

`./generateFROST_UA.sh`



## UFVK를 Ywallet으로 가져오기

Accounts -> +를 클릭하고 위 단계의 ufvk를 붙여넣으세요

## Ywallet으로 트랜잭션 생성

아무 UA나 붙여넣고 tx를 전송하세요. 파일을 저장하세요.

## FROST 서명 절차 시작 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

첫 번째 입력값은 위 단계에서 생성한 원시 tx의 위치입니다
두 번째 입력값은 브로드캐스트하려는 서명된 tx의 위치와 이름입니다
이 단계에서 FROST에 모든 사람이 서명할 트랜잭션을 알려줍니다

## Coordinator 시작

`./runCoordinator.sh`

이는 각 참여자의 서명을 조정하고 그룹 서명을 생성합니다

## 각 Participant가 이 트랜잭션에 서명하도록 하기

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## 서명된 트랜잭션 마무리

Coordinator 창에서 출력되는 그룹 서명을 복사하여 FROST 서명 창에 붙여넣으세요.
그러면 FROST 서명이 완료되고 'mysingedtx'가 출력됩니다.


## Ywallet으로 트랜잭션 브로드캐스트

Ywallet의 오른쪽 하단에 있는 'More'를 클릭하고 'Broadcast'를 찾으세요. 'mysignedtx'를 찾아 확인을 클릭하세요.

모든 것이 정상 작동하면 트랜잭션 ID를 받게 됩니다 :)
