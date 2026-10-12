# Instalasi Dompet Full Node GUI Zenith

## Video Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Instalasi & Demo Dompet Full Node Zenith"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


---

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/-gawirv0L_U"
    title="Menggunakan RPC dengan Zebrad + Zenith"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >

## Instal Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Instal Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Instal Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### dengarkan kueri RPC pada localhost

> listen_addr = "127.0.0.1:8232"

#### secara otomatis menggunakan beberapa thread CPU

parallel_cpu_threads = 0

enable_cookie_auth = false

## Instal Zenith

**Unduh tar.gz dan ekstrak ke direktori home kamu**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### Instal Dependensi

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Menyesuaikan sumber untuk aarch64

> nano configure

**ubah triple menjadi: "aarch64-unknown-linux-gnu" pada kedua baris.**

> nano Setup.hs
 
**Modifikasi Setup.hs di dalam folder zcash-haskell dan folder zenith**

### Kompilasi

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### Sesuaikan zenith.cfg

nodeUser = usernamekamu

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [unduh gldriver-test terbaru](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

**buka menu advanced dan pilih opengl => GL (Full KMS)**

**reboot**



## Jalankan zenith

./zenith gui
 atau
 ./zenith tui
 atau
 ./zenithserver

## RPC

[cara ](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)


