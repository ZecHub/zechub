# Zenith Grafik Arayüzlü Tam Düğüm Cüzdanı Kurulumu

## Video Eğitimi

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zu8nvr4FlXE"
    title="Zenith Tam Düğüm Cüzdanı Kurulumu ve Tanıtımı"
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
    title="Zebrad + Zenith ile RPC kullanımı"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Haskell'i yükleyin

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## Rust yükleyin

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## Zebra yükleyin

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad

Zebra 7.0.0 veya daha yenisini kullanın: NU7 Mainnet'te 3.543.405 numaralı blokta etkinleştirildi ve daha eski `zebrad` sürümleri Zincir'i bu yüksekliğin ötesinde izleyemez ([sürüm notları](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)). Aşağıdaki Zenith sürümü (0.7.2.0-beta) eskidir: Bu metnin yazıldığı sıradaki en yeni sürüm 0.13.0.0-beta'dır (Haziran 2026, NU6.2 desteği). Mainnet'te kullanmadan önce, NU7 desteği olan bir sürüm için [Zenith sürümlerine](https://code.vergara.tech/Vergara_Tech/zenith/releases) göz atın.

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### localhost üzerinde RPC sorgularını dinleyin

> listen_addr = "127.0.0.1:8232"

#### Birden fazla CPU iş parçacığını otomatik olarak kullanın

parallel_cpu_threads = 0

enable_cookie_auth = false

## Zenith yükleyin

**Tar.gz dosyasını indirin ve ana dizininize çıkarın**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### Bağımlılıkları yükleyin

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### aarch64 için kaynak kodunu ayarlayın

> nano configure

**Her iki satırda da triple değerini "aarch64-unknown-linux-gnu" olarak değiştirin.**

> nano Setup.hs
 
 **Setup.hs dosyasını hem zcash-haskell klasöründe hem de zenith klasöründe değiştirin**

### Derleyin

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### zenith.cfg dosyasını ayarlayın

nodeUser = kullanıcıadınız

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [en son gldriver-test sürümünü indirin](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **Gelişmiş ayarlara gidin ve opengl => GL (Full KMS) seçeneğini seçin**

  **Yeniden başlatın**



## zenith'i çalıştırın

 ./zenith gui
 veya
 ./zenith tui
 veya
 ./zenithserver

## RPC'ler

[nasıl yapılır](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
