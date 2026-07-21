# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : zcash full node

**zaino**     : zcash blockchain indexleyici

**zingo-cli** : zcash komut satırı zaino-proxy istemcisi (Zingolib'in bir alt kümesi)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Genel Bakış

[Sistem Mimarisi](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash kullanıcısı, zingo-cli'ye erişim sağlayan Zingolib'i kurar/derler. Gerektiğinde ZEC gönderip alabilir.
- Zingo-cli, zaino'ya ya yerel olarak ya da çevrimiçi güvenli bir kanal üzerinden bağlanır (Zcash kullanıcısı bunun nasıl çalıştığını umursamaz!)
- Zaino, zebrad veya zcashd erişimi sağlar            
- Tamamen senkronize edilmiş zebrad, gerçeğin kaynağıdır (artık burada cüzdan yok!)



## Kurulum

Bunun düzgün çalışması için 3 şey kurmanız gerekecek. Ekran yönetimine yardımcı olması için ayrıca `screen` veya benzeri bir şey de tavsiye ederim.

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*isteğe bağlı* (zebrad için bir screen oturumu oluşturun)

```
screen -S zebra
zebrad start
```

not: bunun tamamen senkronize olması gerekecek! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*isteğe bağlı* (zaino için bir screen oturumu oluşturun)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Ana ağ için portu 8232 olarak ayarlayın
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*isteğe bağlı* (zingo-cli için bir screen oturumu oluşturun)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

not: bunun da tıpkı lightwalletd gibi tamamen senkronize olması gerekecek. Zaman kazanmak için harici bir sürücü kullanmanızı tavsiye ederim :)


## Çalıştırma

Bunları `screen` oturumlarında çalıştırıyorsanız, `screen -r` gerektiğinde geçiş yapmanız için her bir screen oturumunu listeler
