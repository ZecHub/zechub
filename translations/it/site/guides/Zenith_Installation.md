# Zenith Installazione del portafoglio GUI full node

## Video tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Zenith Installazione e demo del portafoglio full node"
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
    title="Uso degli RPC con Zebrad + Zenith"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Installare Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Installare Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Installare Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad

Usa Zebra 7.0.0 o una versione più recente: NU7 è stata attivata su Mainnet al blocco 3,543,405 e le versioni precedenti di `zebrad` non possono seguire la chain oltre quell'altezza ([note di rilascio](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)). La versione di Zenith riportata sotto (0.7.2.0-beta) è obsoleta: la versione più recente al momento della stesura è la 0.13.0.0-beta (giugno 2026, supporto NU6.2). Consulta le versioni di [Zenith](https://code.vergara.tech/Vergara_Tech/zenith/releases) per trovarne una compatibile con NU7 prima di usarla su Mainnet.

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### ascoltare le richieste RPC su localhost

> listen_addr = "127.0.0.1:8232"

#### usare automaticamente più thread della CPU

parallel_cpu_threads = 0

enable_cookie_auth = false

## Installare Zenith

**Scarica il file tar.gz ed estrailo nella tua directory home**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### Installare le dipendenze

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Modificare il sorgente per aarch64

> nano configure

**Modifica il triple in entrambe le righe impostandolo su "aarch64-unknown-linux-gnu".**

> nano Setup.hs
 
 **Modifica Setup.hs sia nella cartella zcash-haskell che nella cartella zenith**

### Compilare

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### Modificare zenith.cfg

nodeUser = il_tuo_nome_utente

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [scarica la versione più recente di gldriver-test](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **Vai su advance e seleziona opengl => GL (Full KMS)**

  **Riavvia**



## Eseguire zenith

 ./zenith gui
 o
 ./zenith tui
 o
 ./zenithserver

## RPC

[guida](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
