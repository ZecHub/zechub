# RPi5ZebraLightwalletdZingo.md

## Dependecies

* `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
* `sudo apt install libclang-dev clang pkg-config openssl protobuf-compiler npm`

## Compile Zebra

https://github.com/ZcashFoundation/zebra

* `time cargo install --git https://github.com/ZcashFoundation/zebra --tag v1.6.0 zebrad`

## Configure zebrad.toml

add:

`listen_addr = '127.0.0.1:8232'`

`cache_dir = "/media/zebra5/zebra/"`

## Sync Zebra

* `zebrad start`

## Compile lightwalletd

* install go
  
`wget https://go.dev/dl/go1.22.1.linux-arm64.tar.gz`

`sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.22.1.linux-arm64.tar.gz go/`

`export PATH=$PATH:/usr/local/go/bin`

* install lightwalletd

	   git clone https://github.com/zcash/lightwalletd
	   cd lightwalletd
	   make
	   make install

  `export PATH=$PATH:~/go/bin/`

## Sync lightwalletd

* notice the data-dir change

  `lightwalletd --zcash-conf-path ~/.config/zcash.conf --data-dir /media/zebra5/zebra/.cache/lightwalletd --log-file /dev/stdout --no-tls-very-insecure`


## Install NodeJS

 `sudo apt install -y ca-certificates curl gnupg`
 
 `curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg`
 
 `NODE_MAJOR=20`
 
 `echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list`
 
 `sudo apt update`
 
 `sudo apt install nodejs`

## Install Yarn

`corepack enable`

## Install Zingo

`git clone https://github.com/zingolabs/zingo-pc.git`

`cd zingo-pc`

`yarn install`

`sudo apt install libopenjp2-tools protobuf-compiler openssl libssl-dev libfuse2`

`export USE_SYSTEM_FPM="true"`

`sudo apt-get install ruby-dev build-essential && sudo gem i fpm -f`

`yarn dist:linux`


## Start Zingo-PC

* Can use appimage, or binary in unpacked folder
* Enjoy! :)

# Sources

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




