# Zenith GUI ɣaɣla dzesi ŋɔŋlɔ blibo [full node] gakotoku [wallet] ƒe ɖoɖo  

## Video ƒe Nufiafia

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Zenith Full Node Wallet Installation & Demo"
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
    title="Using RPC's with Zebrad + Zenith"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Ɖo Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Ɖo Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Ɖo Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### Lele RPC ƒe biabiawo ŋu le localhost dzi

> listen_addr = "127.0.0.1:8232"

#### Zã CPU ƒe akpa geɖe le ɣeyiɣi ɖeka me le eɖokui si

parallel_cpu_threads = 0

enable_cookie_auth = false

## Ɖo Zenith

**Wɔ tar.gz ƒe download eye nàtae ɖe wò home directory me**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### Ɖo Nusiwo Hiã

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Trɔ asi le source ŋu na aarch64

> nano configure

**Trɔ triple la ɖe: "aarch64-unknown-linux-gnu" le fli evea siaa dzi.**

> nano Setup.hs
 
 **Trɔ asi le Setup.hs ŋu le zcash-haskell ƒe folder kple zenith ƒe folder me siaa**

### Ƒo ƒu 

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### Trɔ asi le zenith.cfg ŋu

nodeUser = yourusername

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [download latest gldriver-test](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **Yi ɖe advance eye nàtia opengl => GL (Full KMS)**

  **Gbugbɔ mɔ**



## Ƒo zenith du

 ./zenith gui
 or
 ./zenith tui
 or
 ./zenithserver

## RPC-wo

[howto](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
