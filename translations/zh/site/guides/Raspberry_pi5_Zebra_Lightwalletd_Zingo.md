<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_pi5_Zebra_Lightwalletd_Zingo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面 [Edit Page]"/>
</a>

# 使用 Zebra lightwalletd 搭配 Zingo

## 视频教程 [Video Tutorial]

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/FfH5jiX8pT0"
    title="使用 Zcash Zebra 节点 [Node] 搭配 lightwalletd：教程"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 依赖项 [Dependencies]

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sudo apt install libclang-dev clang pkg-config openssl protobuf-compiler npm
```

## 编译 [Compile] Zebra

[Zebra GitHub](https://github.com/ZcashFoundation/zebra)

* `time cargo install --git https://github.com/ZcashFoundation/zebra --tag v3.1.0 zebrad`

## 配置 [Configure] zebrad.toml

添加：

`listen_addr = '127.0.0.1:8232'`

`cache_dir = "/media/zebra5/zebra/"`

## 同步 [Sync] Zebra

* `zebrad start`

## 编译 [Compile] lightwalletd

* 安装 Go [go]

```bash
wget https://go.dev/dl/go1.25.5.linux-arm64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.25.5.linux-arm64.tar.gz go/
export PATH=$PATH:/usr/local/go/bin
```

* 安装 lightwalletd

```bash
git clone https://github.com/zcash/lightwalletd
cd lightwalletd
make
make install
export PATH=$PATH:~/go/bin
```

## 同步 [Sync] lightwalletd

* 注意 data-dir 变更 [change]

  `lightwalletd --zcash-conf-path ~/.config/zcash.conf --data-dir /media/zebra5/zebra/.cache/lightwalletd --log-file /dev/stdout --no-tls-very-insecure`


## 安装 [Install] NodeJS

```bash
 curl -fsSL https://deb.nodesource.com/setup_23.x -o nodesource_setup.sh
 sudo -E bash nodesource_setup.sh
 sudo apt update
 sudo apt install nodejs
```
如果遇到任何错误 [errors]，[这里 here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)提供了一些安装 NodeJS 的替代方法 [alternative ways]。

## 安装 [Install] Yarn

`corepack enable`

## 安装 [Install] Zingo

```bash
git clone https://github.com/zingolabs/zingo-pc.git
cd zingo-pc
yarn install
sudo apt install libopenjp2-tools protobuf-compiler openssl libssl-dev libfuse2
export USE_SYSTEM_FPM="true"
sudo apt-get install ruby-dev build-essential && sudo gem i fpm -f
yarn dist:linux
```

## 启动 [Start] Zingo-PC

* 可使用 AppImage [appimage]，或解压文件夹中的二进制文件 [binary]
* 享受吧！ :)

# 来源 [Sources]

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
