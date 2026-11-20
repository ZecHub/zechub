# Zenith: встановлення гаманця з повним вузлом через графічний інтерфейс  

## Відеоурок

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Zenith: встановлення гаманця з повним вузлом і демонстрація"
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
    title="Робота з RPC у Zebrad + Zenith"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Встановлення Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Встановлення Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Встановлення Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad

Використовуйте Zebra версії 7.0.0 або новішої: NU7 активовано в Mainnet на блоці 3,543,405, і старіші версії `zebrad` не можуть відстежувати ланцюг після цієї висоти ([нотатки до випуску](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)). Наведена нижче версія Zenith (0.7.2.0-beta) застаріла: на момент написання найновішою є версія 0.13.0.0-beta (червень 2026 року, підтримка NU6.2). Перш ніж використовувати [Zenith, перевірте випуски](https://code.vergara.tech/Vergara_Tech/zenith/releases) на наявність версії з підтримкою NU7.

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### прослуховування RPC-запитів на localhost

> listen_addr = "127.0.0.1:8232"

#### автоматичне використання кількох потоків ЦП

parallel_cpu_threads = 0

enable_cookie_auth = false

## Встановлення Zenith

**Завантажте tar.gz і розпакуйте в домашній каталог**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### Встановлення залежностей

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### Налаштування джерельного коду для aarch64

> nano configure

**замініть triple на "aarch64-unknown-linux-gnu" в обох рядках.**

> nano Setup.hs
 
 **Змініть Setup.hs в обох папках: zcash-haskell і zenith**

### Компіляція

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### Налаштування zenith.cfg

nodeUser = ваше_ім'я_користувача

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [завантажити найновіший gldriver-test](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **перейдіть до розділу advance і виберіть opengl => GL (Full KMS)**

  **перезавантажте пристрій**



## Запуск zenith

 ./zenith gui
 або
 ./zenith tui
 або
 ./zenithserver

## RPC-запити

[інструкція](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
