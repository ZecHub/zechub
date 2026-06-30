# Installation du portefeuille de nœud complet Zenith GUI  

## Tutoriel vidéo

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Installation et démonstration du portefeuille de nœud complet Zenith"
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
    title="Utiliser des RPC avec Zebrad + Zenith"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Installer Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Installer Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Installer Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### écouter les requêtes RPC sur localhost

> listen_addr = "127.0.0.1:8232"

#### utiliser automatiquement plusieurs threads CPU

parallel_cpu_threads = 0

enable_cookie_auth = false

## Installer Zenith

**Téléchargez le tar.gz et décompressez-le dans votre répertoire personnel**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://git.vergara.tech/Vergara_Tech/zcash-haskell.git


### Installer les dépendances

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Ajuster le code source pour aarch64

> nano configure

**changez le triplet en : "aarch64-unknown-linux-gnu" sur les deux lignes.**

> nano Setup.hs
 
 **Modifiez Setup.hs à la fois dans le dossier zcash-haskell et dans le dossier zenith**

### Compiler 

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### Ajuster zenith.cfg

nodeUser = yourusername

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [télécharger le dernier gldriver-test](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **allez dans advance et sélectionnez opengl => GL (Full KMS)**

  **redémarrez**



## Exécuter zenith

 ./zenith gui
 or
 ./zenith tui
 or
 ./zenithserver

## RPC

[guide pratique](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
