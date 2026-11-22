# Zenith GUI 풀 노드 지갑 설치  

## 동영상 튜토리얼

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Zenith 풀 노드 지갑 설치 및 데모"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/-gawirv0L_U"
    title="Zebrad 및 Zenith에서 RPC 사용하기"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Haskell 설치

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Rust 설치

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Zebra 설치

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad

Zebra 7.0.0 이상을 사용하세요. NU7은 블록 3,543,405에서 메인넷에 활성화되었으며, 이전 `zebrad` 버전은 해당 높이 이후 체인을 따라갈 수 없습니다([릴리스 노트](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)). 아래의 Zenith 버전(0.7.2.0-beta)은 오래된 버전입니다. 이 문서를 작성하는 시점의 최신 릴리스는 0.13.0.0-beta(2026년 6월, NU6.2 지원)입니다. 메인넷에서 사용하기 전에 [Zenith 릴리스](https://code.vergara.tech/Vergara_Tech/zenith/releases)를 확인하여 NU7을 지원하는 버전을 찾으세요.

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### 로컬호스트에서 RPC 요청 수신

> listen_addr = "127.0.0.1:8232"

#### 여러 CPU 스레드 자동 사용

parallel_cpu_threads = 0

enable_cookie_auth = false

## Zenith 설치

**tar.gz를 다운로드한 다음 홈 디렉터리에 압축을 풉니다**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### 종속성 설치

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### aarch64용 소스 조정

> nano configure

**두 줄 모두에서 트리플을 "aarch64-unknown-linux-gnu"로 변경합니다.**

> nano Setup.hs
 
 **zcash-haskell 폴더와 zenith 폴더의 Setup.hs를 모두 수정합니다**

### 컴파일 

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### zenith.cfg 조정

nodeUser = 사용자 이름

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [최신 gldriver-test 다운로드](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **고급 메뉴로 이동한 다음 opengl => GL (Full KMS)을 선택합니다**

  **재부팅합니다**



## zenith 실행

 ./zenith gui
 또는
 ./zenith tui
 또는
 ./zenithserver

## RPC

[사용법](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
