# Installation du portefeuille à nœud complet Zenith avec interface graphique  

## Tutoriel vidéo

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

## Installer Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Installer Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Installer Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad

Utilisez Zebra 7.0.0 ou une version plus récente : NU7 a été activé sur le Mainnet au bloc 3 543 405, et les versions plus anciennes de `zebrad` ne peuvent pas suivre la chaîne au-delà de cette hauteur ([notes de version](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)). La version de Zenith ci-dessous (0.7.2.0-beta) est ancienne : la version la plus récente au moment de la rédaction est la 0.13.0.0-beta (juin 2026, prise en charge de NU6.2). Consultez [les versions de Zenith](https://code.vergara.tech/Vergara_Tech/zenith/releases) pour en trouver une qui prend en charge NU7 avant de l'utiliser sur le Mainnet.

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### Écouter les requêtes RPC sur localhost

> listen_addr = "127.0.0.1:8232"

#### Utiliser automatiquement plusieurs threads du processeur

parallel_cpu_threads = 0

enable_cookie_auth = false

## Installer Zenith

**Téléchargez le fichier tar.gz et décompressez-le dans votre répertoire personnel**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### Installer les dépendances

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Adapter les sources pour aarch64

> nano configure

**Remplacez le triplet par « aarch64-unknown-linux-gnu » sur les deux lignes.**

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


### Modifier zenith.cfg

nodeUser = yourusername

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [Télécharger la dernière version de gldriver-test](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **Allez dans les options avancées et sélectionnez opengl => GL (Full KMS)**

  **Redémarrez**



## Lancer zenith

 ./zenith gui
 ou
 ./zenith tui
 ou
 ./zenithserver

## RPC

[Mode d'emploi](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
