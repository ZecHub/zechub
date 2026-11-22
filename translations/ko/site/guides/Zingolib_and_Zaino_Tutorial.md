# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : Zcash 풀 노드

**zaino**     : Zcash 블록체인 인덱서

**zingo-cli** : Zcash 명령줄 zaino-proxy 클라이언트(Zingolib의 하위 집합)

## 동영상

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 전체 개요

[시스템 아키텍처](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash 사용자가 Zingolib을 설치하거나 컴파일하면 zingo-cli에 액세스할 수 있습니다. 필요에 따라 ZEC을 보내거나 받을 수 있습니다.
- zingo-cli는 로컬 또는 온라인 보안 채널을 통해 zaino에 연결됩니다(Zcash 사용자는 작동 방식을 신경 쓸 필요가 없습니다!).
- Zaino을 사용하면 zebrad 또는 zcashd에 액세스할 수 있습니다.
- 완전히 동기화된 zebrad가 신뢰할 수 있는 정보의 원천입니다(이제 지갑은 여기에 없습니다!).



## 설치

제대로 작동하도록 하려면 3가지를 설치해야 합니다. 화면을 관리하는 데 도움이 되도록 screen이나 비슷한 도구도 사용하는 것을 권장합니다.

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad
```

Zebra 7.0.0 이상을 사용하세요. NU7은 메인넷 블록 3,543,405에서 활성화되었으며, 이전 `zebrad` 버전은 해당 높이 이후의 체인을 따라갈 수 없습니다([릴리스 노트](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)).

 
*선택 사항* (zebrad용 screen 세션 만들기)

```
screen -S zebra
zebrad start
```

참고: 완전히 동기화해야 합니다!

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*선택 사항* (zaino용 screen 세션 만들기)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*선택 사항* (zingo-cli용 screen 세션 만들기)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

참고: lightwalletd과 마찬가지로 완전히 동기화해야 합니다. 시간을 절약할 수 있도록 외장 드라이브를 사용하는 것을 권장합니다 :)


## 실행

이 항목들을 screen에서 실행 중이라면, `screen -r`을 사용해 필요할 때 이동할 screen을 확인할 수 있습니다.
