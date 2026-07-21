# Zenith GUI Full Node Wallet Ufungaji 

## Video Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Zenith Full Node Wallet Installation & Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
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
    ruhusuFullScreen
    loading="lazy"
  />
</div>

## Sakinisha Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Kuweka kutu

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Sakinisha Zebra

> sudo apt install libclang-dev

> mzigo install --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad kuzalisha -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### kusikiliza kwa maswali RPC juu ya localhost

> kusikiliza_addr = "127.0.0.1:8232"

#### moja kwa moja kutumia nyuzi nyingi CPU

sambamba_cpu_threads = 0

enable_cookie_auth = uongo

## Sakinisha Zenith

** Download tar.gz na untar katika directory yako nyumbani **

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd kilele

> rmdir zcash-haskell

> kit clone https://git.vergara.tech/Vergara_Tech/zcash-haskell.git


### Weka Depedencies

> sudo apt install libssl-dev libgmp-dev Libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-devlibglew-dev gdk-pixbuf-tests raspi-config
  
> mzigo install mzigo-c

> stack kufunga c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> chanzo ~/.bashrc


### Kurekebisha chanzo kwa ajili ya aarch64

> nano Configure

**badilisha tatu kwa: "aarch64-unknown-linux-gnu" kwenye mistari yote miwili.**

> nano Setup.hs
 
 ** Kurekebisha Setup.hs katika wote folder zcash-haskell na zenith folder**

### Tayarisha 

- . / Configure

- ujenzi wa njama

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir mali 

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/Zenith/zenith.cfg ~/ Zenith

- cp -r ~/zenith/assets ~/Zenith/asets


### Kurekebisha zenith.cfg

nodeUser = jina lako la mtumiaji

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [Download karibuni gldriver-mtihani](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  ** kwenda mbele na kuchagua opengl => GL (Full KMS) **

  ** kuanzisha upya **



## Kukimbia zenith

 ./Zenith gui
 or
 ./Zenith tui
 or
 . / seva zenith

## RPC ya

[jinsi ya](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)


