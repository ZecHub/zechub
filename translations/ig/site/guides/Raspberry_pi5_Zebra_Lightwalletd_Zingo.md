<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_pi5_Zebra_Lightwalletd_Zingo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# RPi5 Zebra lightwalletd na Zingo

## Nkuzi Vidio

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/FfH5jiX8pT0"
    title="Iji Zcash Zebra Node na lightwalletd: NKUZI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Ihe ndị a chọrọ

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sudo apt install libclang-dev clang pkg-config openssl protobuf-compiler npm
```

## Kpọkọta Zebra

[Zebra GitHub](https://github.com/ZcashFoundation/zebra)

* `time cargo install --git https://github.com/ZcashFoundation/zebra --tag v3.1.0 zebrad`

## Hazie zebrad.toml

tinye:

`listen_addr = '127.0.0.1:8232'`

`cache_dir = "/media/zebra5/zebra/"`

## Mekọrịta Zebra

* `zebrad start`

## Kpọkọta lightwalletd

* wụnye go

```bash
wget https://go.dev/dl/go1.25.5.linux-arm64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.25.5.linux-arm64.tar.gz go/
export PATH=$PATH:/usr/local/go/bin
```

* wụnye lightwalletd

```bash
git clone https://github.com/zcash/lightwalletd
cd lightwalletd
make
make install
export PATH=$PATH:~/go/bin
```

## Mekọrịta lightwalletd

* rịba ama mgbanwe data-dir

  `lightwalletd --zcash-conf-path ~/.config/zcash.conf --data-dir /media/zebra5/zebra/.cache/lightwalletd --log-file /dev/stdout --no-tls-very-insecure`


## Wụnye NodeJS

```bash
 curl -fsSL https://deb.nodesource.com/setup_23.x -o nodesource_setup.sh
 sudo -E bash nodesource_setup.sh
 sudo apt update
 sudo apt install nodejs
```
Ọ bụrụ na ị nweta njehie ọ bụla, [ebe a](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04) bụ ụzọ ọzọ ụfọdụ iji wụnye NodeJS.

## Wụnye Yarn

`corepack enable`

## Wụnye Zingo

```bash
git clone https://github.com/zingolabs/zingo-pc.git
cd zingo-pc
yarn install
sudo apt install libopenjp2-tools protobuf-compiler openssl libssl-dev libfuse2
export USE_SYSTEM_FPM="true"
sudo apt-get install ruby-dev build-essential && sudo gem i fpm -f
yarn dist:linux
```

## Malite Zingo-PC

* Ị nwere ike iji appimage, ma ọ bụ binary dị na folda a kpọpụtara
* Nwee ọṅụ! :)

# Ebe mmalite

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
