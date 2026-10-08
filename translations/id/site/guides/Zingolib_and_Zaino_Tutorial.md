# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : zcash full node

**zaino**     : indexer blockchain zcash

**zingo-cli** : klien zaino-proxy command line zcash (subset dari Zingolib)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI""
    title="Pengenalan tentang Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div >


## Gambaran Besar

Arsitektur Sistem [](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash Pengguna Menginstal/Mengompilasi Zingolib yang memberikan akses ke zingo-cli. Mereka dapat mengirim/menerima ZEC sesuai kebutuhan.
- Zingo-cli terhubung ke zaino baik secara lokal maupun melalui saluran aman secara online (Zcash pengguna tidak perlu mempedulikan bagaimana cara kerjanya!)
- Zaino memungkinkan akses ke zebrad atau zcashd            
- zebrad yang tersinkronisasi penuh adalah sumber kebenaran (tidak ada lagi dompet di sini!)



## Instalasi

Kamu perlu menginstal 3 hal agar ini dapat berfungsi dengan benar. Saya juga menyarankan penggunaan screen atau sesuatu yang serupa untuk membantu manajemen layar.

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*opsional* (buat sesi screen untuk zebrad)

```
screen -S zebra
zebrad start
```

catatan: ini perlu sinkronisasi penuh!

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*opsional* (buat sesi screen untuk zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*opsional* (buat sesi screen untuk zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

catatan: ini perlu sinkronisasi penuh, sama seperti yang dilakukan lightwalletd. Saya menyarankan penggunaan drive eksternal untuk menghemat waktu :)


## Menjalankan

Jika kamu menjalankan ini di dalam screen, `screen -r` akan menampilkan setiap screen agar kamu bisa berpindah ke sana sesuai kebutuhan