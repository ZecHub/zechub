# Zenith نصب کیف‌پول فول‌نود با رابط گرافیکی

## آموزش ویدیویی

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

## نصب Haskell

> curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh


## نصب Rust

> curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


## نصب Zebra

> sudo apt install libclang-dev

> cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad

از Zebra نسخهٔ 7.0.0 یا جدیدتر استفاده کنید: NU7 در بلوک 3,543,405 روی Mainnet فعال شد و نسخه‌های قدیمی‌تر `zebrad` نمی‌توانند زنجیره را پس از این ارتفاع دنبال کنند ([یادداشت‌های انتشار](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)). نسخهٔ Zenith زیر (0.7.2.0-beta) قدیمی است: جدیدترین نسخه در زمان نگارش این متن 0.13.0.0-beta است (ژوئن 2026، با پشتیبانی از NU6.2). پیش از استفاده روی Mainnet، [نسخه‌های منتشرشدهٔ Zenith](https://code.vergara.tech/Vergara_Tech/zenith/releases) را بررسی کنید و نسخه‌ای را انتخاب کنید که از NU7 پشتیبانی می‌کند.

> zebrad generate -o ~/.config/zebrad.toml

> nano ~/.config/zebrad.toml


#### گوش دادن به درخواست‌های RPC روی localhost

> listen_addr = "127.0.0.1:8232"

#### استفادهٔ خودکار از چند رشتهٔ پردازنده

parallel_cpu_threads = 0

enable_cookie_auth = false

## نصب Zenith

**فایل tar.gz را دانلود کنید و آن را در پوشهٔ خانگی خود از حالت فشرده خارج کنید**

> wget https://code.vergara.tech/Vergara_Tech/zenith/archive/0.7.2.0-beta.tar.gz

> tar -C ~ -xvzf 0.7.2.0-beta.tar.gz

> cd zenith

> rmdir zcash-haskell

> git clone https://code.vergara.tech/Vergara_Tech/zcash-haskell.git


### نصب وابستگی‌ها

> sudo apt install libssl-dev libgmp-dev libsecp256k1-dev libtinfo-dev libsdl2-dev libfreetype-dev libglew-dev gdk-pixbuf-tests raspi-config
  
> cargo install cargo-c

> stack install c2hs

> mousepad ~/.bashrc

> export PATH="/home/zebra5/.local/bin:$PATH"

> source ~/.bashrc


### تنظیم کد منبع برای aarch64

> nano configure

**در هر دو خط، triple را به «aarch64-unknown-linux-gnu» تغییر دهید.**

> nano Setup.hs
 
 **فایل Setup.hs را هم در پوشهٔ zcash-haskell و هم در پوشهٔ zenith ویرایش کنید**

### کامپایل

- ./configure

- cabal build

- mkdir ~/Zenith

- cd ~/Zenith

- mkdir assets  

- cp ~/zenith/dist-newstyle/build/aarch64-linux/ghc-9.6.5/zenith-0.7.2.0/build/zenith/zenith ~/Zenith

- cp ~/zenith/zenith.cfg ~/Zenith

- cp -r ~/zenith/assets ~/Zenith/assets


### تنظیم zenith.cfg

nodeUser = yourusername

nodePwd = superSecret

nodePort = 8234

dbFileName = zenith.db

zebraHost = 127.0.0.1

zebraPort = 8232


> cd ~/Zenith

## Raspi-config

> [آخرین نسخهٔ gldriver-test را دانلود کنید](https://archive.raspberrypi.org/debian/pool/main/g/gldriver-test/)
  
> sudo dpkg - gldriver-test_0.15_all.deb
  
> sudo raspi-config

  **به بخش advance بروید و opengl => GL (Full KMS) را انتخاب کنید**

  **سیستم را راه‌اندازی مجدد کنید**



## اجرای zenith

 ./zenith gui
 یا
 ./zenith tui
 یا
 ./zenithserver

## RPCها

[راهنما](https://github.com/ZecHub/zechub/blob/main/site/tutorials/zenithserver/zenithBeta.md)
