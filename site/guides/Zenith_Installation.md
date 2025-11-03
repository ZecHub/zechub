# Zenith GUI Full Node Wallet Installation  

## Video Tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/zu8nvr4FlXE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

<iframe width="640" height="360" src="https://www.youtube.com/embed/-gawirv0L_U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Install Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Install Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Install Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### listen for RPC queries on localhost

> listen_addr = "127.0.0.1:8232"

#### automatically use multiple CPU threads

parallel_cpu_threads = 0

enable_cookie_auth = false

## Install Zenith

**Download tar.gz and untar into your home directory**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://git.vergara.tech/Vergara_Tech/zcash-haskell.git


### Install Depedencies

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Adjust source for aarch64

> nano configure

**change triple to: "aarch64-unknown-linux-gnu" on both lines.**

> nano Setup.hs
 
 **Modify Setup.hs in both the zcash-haskell folder and zenith folder**

### Compile 

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### Adjust zenith.cfg

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

  **go to advance and select opengl => GL (Full KMS)**

  **reboot**



## Run zenith

 ./zenith gui
 or
 ./zenith tui
 or
 ./zenithserver

## RPC's

[howto](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)


