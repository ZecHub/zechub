# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : zcash 풀 노드

**zaino**     : zcash 블록체인 인덱서

**zingo-cli** : zcash 명령줄 zaino-proxy 클라이언트 (Zingolib의 일부)

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


## 전체 그림

[시스템 아키텍처](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash 사용자는 Zingolib을 설치/컴파일하여 zingo-cli에 접근할 수 있습니다. 필요에 따라 ZEC를 보내고 받을 수 있습니다.
- Zingo-cli는 로컬에서 또는 온라인의 보안 채널을 통해 zaino에 연결됩니다 (Zcash 사용자는 이것이 어떻게 동작하는지 신경 쓸 필요가 없습니다!)
- Zaino는 zebrad 또는 zcashd에 대한 접근을 허용합니다            
- 완전히 동기화된 zebrad가 신뢰의 원천입니다 (이제 여기에는 더 이상 지갑이 없습니다!)



## 설치

이것이 제대로 작동하려면 3가지를 설치해야 합니다. 또한 화면 관리를 위해 screen이나 이와 비슷한 것을 사용하는 것을 추천합니다.

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*선택 사항* (zebrad용 screen 세션 생성)

```
screen -S zebra
zebrad start
```

참고: 이것은 완전히 동기화되어야 합니다! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*선택 사항* (zaino용 screen 세션 생성)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => 메인넷용으로 포트를 8232로 조정
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*선택 사항* (zingo-cli용 screen 세션 생성)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

참고: 이것도 lightwalletd와 마찬가지로 완전히 동기화되어야 합니다. 시간을 절약하려면 외장 드라이브를 사용하는 것을 추천합니다 :)


## 실행

이것들을 screen에서 실행 중이라면, `screen -r` 가 각 screen을 표시해 주므로 필요에 따라 이동할 수 있습니다
