<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_pi5_Zebra_Lightwalletd_Zingo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# RPi5 Zebra lightwalletd와 Zingo 사용하기

## 동영상 튜토리얼

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/FfH5jiX8pT0"
    title="lightwalletd와 함께 Zcash Zebra 노드 사용하기: 튜토리얼"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 종속 항목

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sudo apt install libclang-dev clang pkg-config openssl protobuf-compiler npm
```

## Zebra 컴파일하기

[Zebra GitHub](https://github.com/ZcashFoundation/zebra)

* `time cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad`

Zebra 7.0.0 이상을 사용하세요. NU7은 메인넷에서 블록 3,543,405에서 활성화되었으며, 이전 `zebrad` 버전은 해당 높이 이후의 체인을 따라갈 수 없습니다([릴리스 노트](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)). Zebra 7을 사용하려면 Rust 1.91 이상이 필요합니다(`rustup update`).

## zebrad.toml 구성하기

다음을 추가하세요.

`listen_addr = '127.0.0.1:8232'`

`cache_dir = "/media/zebra5/zebra/"`

## Zebra 동기화하기

* `zebrad start`

## lightwalletd 컴파일하기

* go를 설치하세요.

```bash
wget https://go.dev/dl/go1.27.3.linux-arm64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.27.3.linux-arm64.tar.gz go/
export PATH=$PATH:/usr/local/go/bin
```

* lightwalletd을 설치하세요.

```bash
git clone https://github.com/zcash/lightwalletd
cd lightwalletd
make
make install
export PATH=$PATH:~/go/bin
```

## lightwalletd 동기화하기

* 데이터 디렉터리 변경 사항을 확인하세요.

  `lightwalletd --zcash-conf-path ~/.config/zcash.conf --data-dir /media/zebra5/zebra/.cache/lightwalletd --log-file /dev/stdout --no-tls-very-insecure`


## NodeJS 설치하기

```bash
 curl -fsSL https://deb.nodesource.com/setup_23.x -o nodesource_setup.sh
 sudo -E bash nodesource_setup.sh
 sudo apt update
 sudo apt install nodejs
```
오류가 발생하면 [여기](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)에서 NodeJS을 설치하는 몇 가지 다른 방법을 확인할 수 있습니다.

## Yarn 설치하기

`corepack enable`

## Zingo 설치하기

```bash
git clone https://github.com/zingolabs/zingo-pc.git
cd zingo-pc
yarn install
sudo apt install libopenjp2-tools protobuf-compiler openssl libssl-dev libfuse2
export USE_SYSTEM_FPM="true"
sudo apt-get install ruby-dev build-essential && sudo gem i fpm -f
yarn dist:linux
```

## Zingo-PC 시작하기

* AppImage 또는 압축을 푼 폴더의 바이너리를 사용할 수 있습니다.
* 즐겁게 사용하세요! :)

# 출처

```markdown
https://github.com/ZcashFoundation/zebra
https://github.com/zcash/lightwalletd
https://askubuntu.com/questions/1278447/installing-fpm-on-ubuntu-20-04
https://github.com/oxen-io/session-desktop/issues/1635
https://askubuntu.com/questions/1363783/cant-run-an-appimage-on-ubuntu-20-04
https://www.beekeeperstudio.io/blog/electron-apps-for-arm-and-raspberry-pi
https://github.com/electron-userland/electron-builder/issues/3901
https://askubuntu.com/questions/1278447/installing-fpm-on-ubuntu-20-04
https://yarnpkg.com/getting-started/install
https://pimylifeup.com/raspberry-pi-nodejs/
https://go.dev/dl/#stable
https://askubuntu.com/questions/1177492/openssl-installed-but-no-openssl-pc-needed-by-pkg-config
```
