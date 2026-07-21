# Ywallet FROST 데모

## FROST 이진 파일 컴파일

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

위의 저장소를 사용하여 다음 지시사항에 따라 컴파일하십시오:

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

이진 파일은 target 폴더에 생성됩니다.


## FROST UA 생성

`./generateFROST_UA.sh`



## UFVK를 Ywallet에 가져오기

계정 -> '+' 버튼을 클릭하고 위 단계에서 얻은 ufvk를 붙여넣으세요


## Ywallet로 트랜잭션 생성

임의의 UA를 붙여넣고 트랜잭션을 보내세요. 파일을 저장하세요.


## FROST 서명 절차 시작 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

첫 번째 입력은 위 단계에서 생성된 원본 트랜잭션의 위치입니다.
두 번째 입력은 브로드캐스트하려는 서명된 트랜잭션의 위치와 이름입니다.
이 부분에서는 FROST가 모두가 서명해야 하는 트랜잭션을 지정합니다.

## Coordinator 시작

`./runCoordinator.sh`

이것은 각 참여자의 서명을 조율하고 그룹 서명을 생성합니다.

## 각 Participant가 이 트랜잭션에 서명하기

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`


## 서명된 트랜잭션 완료

Coordinator 창에서 출력되는 그룹 서명을 복사하여 FROST 서명 창으로 붙여넣으세요.
이렇게 하면 FROST 서명이 완료되고 'mysingedtx'가 생성됩니다.


## Ywallet로 트랜잭션 브로드캐스트

Ywallet 오른쪽 하단에 있는 'More'를 클릭하고 'Broadcast'를 찾으세요. 'mysignedtx'를 찾아 'OK'를 클릭하세요.

모든 것이 잘 작동하면 트랜잭션 ID가 나타납니다 :)
