# Ywallet FROST 데모

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet 트랜잭션 데모"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## FROST 바이너리 컴파일

[Github 링크](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

위의 저장소를 사용하여 다음 지침에 따라 컴파일하십시오:

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

바이너리는 target 폴더에 생성됩니다.

## FROST UA 생성

`./generateFROST_UA.sh`

## Ywallet에 UFVK 가져오기

계정 -> '+'를 클릭하고 위 단계에서 얻은 ufvk를 붙여넣으세요.

## Ywallet을 사용하여 트랜잭션 생성

임의의 UA를 붙여넣고 트랜잭션을 보내세요. 파일을 저장하세요.

## FROST 서명 절차 시작

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

첫 번째 입력은 위 단계에서 생성한 원본 트랜잭션의 위치입니다.
두 번째 입력은 브로드캐스트하고자 하는 서명된 트랜잭션의 위치와 이름입니다.
이 단계는 FROST가 모두가 서명할 트랜잭션을 지정하는 부분입니다.

## Coordinator 시작

`./runCoordinator.sh`

이 명령어는 각 참여자의 서명을 조율하고 그룹 서명을 생성합니다.

## 각 Participant가 이 트랜잭션에 서명하기

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## 서명된 트랜잭션 완료

Coordinator 창에서 출력되는 그룹 서명을 복사하여 FROST 서명 창에 붙여넣으세요.
이 작업은 FROST 서명을 완료하고 'mysignedtx'를 출력합니다.

## Ywallet로 트랜잭션 브로드캐스트

Ywallet 오른쪽 하단의 'More'를 클릭한 후 'Broadcast'를 찾습니다. 'mysignedtx'를 찾아 'OK'를 클릭하세요.

모든 것이 잘 작동하면 트랜잭션 ID를 받게 됩니다 :)
