# Zenith Ntinye GUI full node e-akpa ego [wallet]  

## Nkuzi vidio [Video Tutorial]

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

## Wụnye Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Wụnye Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Wụnye Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### gee ntị na ajụjụ RPC na localhost

> listen_addr = "127.0.0.1:8232"

#### jiri ọtụtụ CPU threads na-akpaghị aka

parallel_cpu_threads = 0

enable_cookie_auth = false

## Wụnye Zenith

**Budata tar.gz ma kpọpụta ya n'ime ndekọ ụlọ gị**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### Wụnye Ndabere [Dependencies]

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Hazie isi mmalite maka aarch64

> nano configure

**gbanwee triple ka ọ bụrụ: "aarch64-unknown-linux-gnu" n'ahịrị abụọ ahụ.**

> nano Setup.hs
 
 **Gbanwee Setup.hs n'ime folda zcash-haskell na folda zenith abụọ ahụ**

### Kọmpaịlụ [Compile] 

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### Hazie zenith.cfg

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

  **gaa na advance ma họrọ opengl => GL (Full KMS)**

  **malitegharịa**



## Gbaa zenith

 ./zenith gui
 or
 ./zenith tui
 or
 ./zenithserver

## RPC's

[howto](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
