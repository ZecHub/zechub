# Fifi sori ẹrọ apamọwọ Node kikun ti Zenith GUI 

## Ìdánilẹ́kọ̀ọ́ fídíò

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

## Fi Haskell sori ẹrọ

> ìyípadà --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Fi Ipata sori ẹrọ

> ìyípadà --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Fi Zebra sori ẹrọ

> sudo apt fi sori ẹrọ libclang-dev

> fifi sori ẹrọ ẹru --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad ṣe ipilẹṣẹ -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### tẹ́tí sí àwọn ìbéèrè RPC lórí localhost

> listen_addr = "127.0.0.1:8232"

#### lo ọpọlọpọ awọn okun CPU laifọwọyi

parallel_cpu_threads = 0

enable_cookie_auth = èké

## Fi Zenith sori ẹrọ

**Ṣe igbasilẹ tar.gz ki o si ṣii sinu itọsọna ile rẹ**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### Awọn igbẹkẹle Fi sori ẹrọ

> sudo apt fi sori ẹrọ libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> fifi sori ẹrọ ẹru-c

> fifi sori ẹrọ akopọ c2hs

> àpò ìtọ́sọ́nà ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> orísun ~/.bashrc


### Ṣatunṣe orisun fun aarch64

> iṣeto nano

**Yipo mẹta si: "aarch64-unknown-linux-gnu" lori awọn ila mejeeji.**

> Setup nano.hs
 
 **Ṣe àtúnṣe Setup.hs nínú fódà zcash-haskell àti fódà zenith**

### Ṣe ìkójọpọ̀ 

- ./configure

- Ilé ọkọ̀ akérò

- mkdir ~/Zenith

- cd ~/Zenith

- awọn ohun-ini mkdir 

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/kọ́/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/dúkìá ~/Zenith/dúkìá


### Ṣe àtúnṣe zenith.cfg

nodeUser = orúkọ olùlò rẹ

nodePwd = superSecret

ibudo node = 8234

dbFáìlìOrúkọ = zenith.db

ZebraHost = 127.0.0.1

Àpótí zebra = 8232


> cd ~/Zenith

## Ìṣètò Raspi

> [ṣe igbasilẹ idanwo gldriver tuntun](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **lọ sí advance kí o sì yan opengl => GL (KMS Kíkún)**

  **atunbere**



## Sáré zenith

 ./gui zenith
 or
 ./zenith tui
 or
 ./zenithserver

## Àwọn RPC

[báwo ni a ṣe le](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)


