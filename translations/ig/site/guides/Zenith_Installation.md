# Zenith GUI Full Node Wallet Ntinye 

## Nkuzi vidiyo

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Zenith Full Node Wallet Installation & Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
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
    kweeFullScreen
    loading="lazy"
  />
</div>

## Wụnye Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Wụnye Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Wụnye Zebra

> sudo apt wụnye libclang-dev

> wụnye ibu --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad mepụta -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### na-ege ntị maka ajụjụ RPC na localhost

> listen_addr = "127.0.0.1:8232"

#### na-akpaghị aka na-eji ọtụtụ CPU eri

parallel_cpu_threads = 0

enable_cookie_auth = ụgha

## Wụnye Zenith

**Download tar.gz na untar n'ime gị home directory**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git mmepụta oyiri https://git.vergara.tech/Vergara_Tech/zcash-haskell.git


### Wụnye Depedencies

> sudo apt wụnye libssl-dev libgmp- dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev Libglew-dev gdk-pixbuf-tests raspi-config
  
> ibu wụnye ibu-c

> wụnye stack c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> isi iyi ~/.bashrc


### Gbanwee isi iyi maka aarch64

> nano nhazi

**gbanwee okpukpu atọ na: "aarch64-unknown-linux-gnu" na ahịrị abụọ.**

> nano Setup.hs
 
 ** Gbanwee Setup.hs na ma nchekwa zcash-haskell na nchekwa zenith**

### Nchịkọta 

- ./configure

- ụlọ nkwakọba

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir akụ 

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/built/zenithi/zenit ~/Zenith

- cp ~/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/asets


### Gbanwee zenith.cfg

nodeUser = aha njirimara gị

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [Download ọhụrụ gldriver-ule](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **gaa n'ihu ma họrọ opengl => GL (Full KMS) **

  **megharịa**



## Na-agba ọsọ zenith

 ./zenith gui
 or
 ./Zenith Tui
 or
 ./ihe nkesa Zenith

## RPC si

[otú ị ga-esi](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)


