# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : Zcash tam düğümü

**zaino**     : Zcash blokzincir indeksleyicisi

**zingo-cli** : Zcash komut satırı zaino-proxy istemcisi (Zingolib alt kümesi)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Zingolib + Zaino hakkında bir giriş"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Genel Bakış

[Sistem Mimarisi](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash Kullanıcı Zingolib yükler/derler; böylece zingo-cli erişebilir. Gerektikçe ZEC gönderip alabilir.
- zingo-cli, zaino'ya yerel olarak veya çevrimiçi güvenli bir kanal üzerinden bağlanır (Zcash kullanıcının bunun nasıl çalıştığını bilmesine gerek yok!)
- Zaino, zebrad ya da zcashd düğümlerine erişim sağlar            
- Tamamen eşitlenmiş zebrad gerçeğin kaynağıdır (artık burada cüzdan yok!)



## Kurulum

Bunun doğru çalışması için 3 şey yüklemeniz gerekecek. Ekran yönetimine yardımcı olması için screen veya benzeri bir şey kullanmanızı da öneririm.

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad
```

Zebra 7.0.0 veya daha yenisini kullanın: NU7, Mainnet'te 3.543.405 numaralı blokta etkinleştirildi ve daha eski `zebrad` sürümleri bu yüksekliğin ötesinde Zincir'i takip edemez ([sürüm notları](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)).


*isteğe bağlı* (zebrad için bir screen oturumu oluşturun)

```
screen -S zebra
zebrad start
```

Not: Tamamen eşitlenmesi gerekecek!

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
nano zindexer.toml  => Adjust port to 8232 for mainnet
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

Not: lightwalletd gibi bunun da tamamen eşitlenmesi gerekecek. Zaman kazanmak için harici bir sürücü kullanmanızı öneririm :)


## Çalıştırma

Bunları screen oturumlarında çalıştırıyorsanız, `screen -r` gerektiğinde geçiş yapabileceğiniz tüm screen oturumlarını listeler.
