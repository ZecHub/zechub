# Zenith GUI Full Node Wallet ìfi sori ẹrọ 

## Àwọn Fídíò Ẹ̀kọ́

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Zenith Full Node Wallet Installation & Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    jẹ́ kíFullScreen
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
    jẹ́ kíFullScreen
    loading="lazy"
  />
</div>

## Fi Haskell sori ẹrọ

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Fi Rust sori ẹrọ

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Fi Zebra sori ẹrọ

> sudo apt fi libclang-dev sori ẹrọ

> fi ẹrù sori ẹrọ --git https://github.com/ZcashFoundation/zebra --tag v2.1.0 zebrad

> zebrad ṣe -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### gbọ́ fún àwọn ìbéèrè RPC lórí localhost

> listen_addr = "127.0.0.1:8232" Àwọn ojúewé wọ̀nyí jápọ̀ mọ́:

#### máa ń lo ọ̀pọ̀lọpọ̀ ìsọfúnni CPU

parallel_cpu_threads = 0 àwọn ìsọfúnni

enable_cookie_auth = false

## Fi Zenith sori ẹrọ

** Ṣe igbasilẹ tar.gz ati untar sinu itọsọna ile rẹ **

> wgetì https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> ẹ̀dà git https://git.vergara.tech/Vergara_Tech/zcash-haskell.git


### Ṣíṣàtúnṣe Àwọn Àlàfo

> sudo apt install libssl-dev libgmp-dev Libsecp256k1-dev libtinfo-dev ligbsdl2-dev libfreetype-dev ibglew-dev gdk-pixbuf-tests raspi-config
  
> ẹrù fi sori ẹrọ ẹrù-c

> fi sori ẹrọ c2hs

> àlẹmọ ìrọ́ ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> orísun ~/.bashrc


### Ṣatunṣe orísun fún aarch64

> ìtòlẹ́sẹẹsẹ nano

**yí triple padà sí: "aarch64-unknown-linux-gnu" lórí ìlà méjèèjì.**

> nano Setup.hs
 
 **Ṣàtúnṣe Setup.hs nínú àwo zcash-haskell àti àwo zenith**

### Ṣàtúnṣe 

- ./ìṣàtúnṣe

- ìkórajọ

- mkdir ~/Zenith

- cd ~/Zenith

- àwọn ohun ìní mkdir 

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/built/zenithi/zenithe ~/Zenith

- cp ~/zenith/zenithi.cfg ~/Zenith

- cp -r ~/zenith/ assets ~/Zenith/assets


### Ṣe àtúnṣe zenith.cfg

nodeUser = orúkọ oníṣe rẹ

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Àdàkọ:Raspi-config

> [wá ìtòlẹ́sẹẹsẹ ìdánwò gldriver tó ṣẹ̀ṣẹ̀ jáde]](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **lọ si ilọsiwaju ki o si yan opengl => GL (Full KMS) **

  Àtúnṣe àtúnṣe



## Ẹ sáré lọ sí ibi gíga.

 ./Zenith gui
 or
 ./Zenith Tui
 or
 ./ìkànnì Zenith

## Àwọn RPC

[báwo ni](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)


