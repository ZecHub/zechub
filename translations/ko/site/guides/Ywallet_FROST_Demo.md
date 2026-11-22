# Ywallet FROST 데모

> **Ywallet은 더 이상 유지 관리되지 않습니다.** 개발자가 Ironwood(NU6.3)용으로 업데이트하지 않을 것이라고 확인했으므로, 이제 체인을 따라갈 수 없으며 아래 단계를 메인넷에서 완료할 수 없습니다. 이 페이지는 참고용으로 남겨 둡니다. 같은 개발자가 만든 Zkool은 유지 관리되는 후속 제품이며 FROST 멀티시그를 지원합니다.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet 거래 데모"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## FROST 바이너리 컴파일

[GitHub 링크](https://github.com/ZcashFoundation/frost-zcash-demo)

위 저장소를 사용하고 다음 지침에 따라 컴파일합니다.

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

바이너리는 target 폴더에 생성됩니다.

## FROST UA 만들기

`./generateFROST_UA.sh`



## Ywallet에 UFVK 가져오기

Accounts -> +를 클릭하고 위 단계에서 가져온 ufvk를 붙여 넣습니다.

## Ywallet로 거래 만들기

아무 UA나 붙여 넣고 거래를 전송합니다. 파일을 저장합니다.

## FROST 서명 절차 시작하기

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

첫 번째 입력란에는 위 단계에서 만든 원시 거래의 위치를 입력합니다.
두 번째 입력란에는 브로드캐스트할 서명된 거래의 위치와 파일명을 입력합니다.
이 단계에서 FROST에 모든 참가자가 서명할 거래를 지정합니다.

## 코디네이터 시작하기

`./runCoordinator.sh`

참가자 각자의 서명을 조정하고 그룹 서명을 생성합니다.

## 각 참가자가 이 거래에 서명하도록 하기

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## 서명된 거래 확정하기

코디네이터 창에서 출력된 그룹 서명을 복사해 FROST 서명 창에 붙여 넣습니다.
이렇게 하면 FROST 서명이 완료되고 ‘mysingedtx’가 출력됩니다.


## Ywallet로 거래 브로드캐스트하기

Ywallet의 오른쪽 아래에서 ‘More’를 클릭한 다음 ‘Broadcast’를 찾습니다. ‘mysignedtx’를 찾아 확인을 클릭합니다.

모든 과정이 제대로 진행되면 거래 ID가 표시됩니다 :)
