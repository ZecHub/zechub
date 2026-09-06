# Ywallet FROST 데모

> **Ywallet은 더 이상 유지 관리되지 않습니다.** 개발자가 Ironwood (NU6.3)에 맞춰 업데이트되지 않을 것이라고 확인했으므로, 더 이상 체인을 따라갈 수 없으며 아래 단계는 메인넷에서 완료할 수 없습니다. 이 페이지는 참고용으로 유지됩니다. 동일한 개발자가 만든 Zkool은 유지 관리되는 후속 제품이며 FROST 멀티시그를 지원합니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## FROST 바이너리 컴파일

[Github 링크](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

위 저장소를 사용하고 컴파일 방법에 대한 안내를 따르세요: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

바이너리는 target 폴더에 생성됩니다.

## FROST UA 생성

`./generateFROST_UA.sh`



## UFVK를 Ywallet으로 가져오기

계정 -> +를 클릭하고 위 단계의 ufvk를 붙여넣습니다

## Ywallet으로 트랜잭션 생성

아무 UA나 붙여넣고 tx를 전송합니다. 파일을 저장하세요.

## FROST 서명 절차 시작

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

첫 번째 입력값은 위 단계에서 생성한 원본 tx의 위치입니다
두 번째 입력값은 브로드캐스트하려는 서명된 tx의 위치와 이름입니다
이 단계에서 FROST에 모든 사람이 서명할 트랜잭션을 지정합니다

## Coordinator 시작

`./runCoordinator.sh`

각 참가자의 서명을 조율하고 그룹 서명을 생성합니다

## 각 Participant가 이 트랜잭션에 서명하도록 하기

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## 서명된 트랜잭션 완료

Coordinator 창에서 출력된 그룹 서명을 복사하여 FROST 서명 창에 붙여넣습니다.
이렇게 하면 FROST 서명이 완료되고 'mysingedtx'가 출력됩니다


## Ywallet으로 트랜잭션 브로드캐스트

Ywallet 오른쪽 하단의 'More'를 클릭하고 'Broadcast'를 찾으세요. 'mysignedtx'를 찾아 확인을 클릭합니다.

모든 것이 작동하면 트랜잭션 ID를 받게 됩니다 :)
