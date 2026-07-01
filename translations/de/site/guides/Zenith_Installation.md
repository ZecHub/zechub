# Installation der Zenith GUI Full Node Wallet  

## Videoanleitung

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Installation & Demo der Zenith Full Node Wallet"
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
    title="Verwendung von RPCs mit Zebrad + Zenith"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Haskell installieren

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Rust installieren

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Zebra installieren

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### Auf localhost auf RPC-Abfragen lauschen

> listen_addr = "127.0.0.1:8232"

#### Automatisch mehrere CPU-Threads verwenden

parallel_cpu_threads = 0

enable_cookie_auth = false

## Zenith installieren

**`tar.gz` herunterladen und in dein Home-Verzeichnis entpacken**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://git.vergara.tech/Vergara_Tech/zcash-haskell.git


### Abhängigkeiten installieren

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Quellcode für aarch64 anpassen

> nano configure

**Ändere auf beiden Zeilen das Triple zu: "aarch64-unknown-linux-gnu".**

> nano Setup.hs
 
 **Ändere Setup.hs sowohl im Ordner `zcash-haskell` als auch im Ordner `zenith`**

### Kompilieren 

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### zenith.cfg anpassen

nodeUser = yourusername

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [neueste gldriver-test herunterladen](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **Gehe zu advance und wähle opengl => GL (Full KMS)**

  **neu starten**



## Zenith ausführen

 ./zenith gui
 or
 ./zenith tui
 or
 ./zenithserver

## RPCs

[Anleitung](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
