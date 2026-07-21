# Z3: (zebrad) ((zaino) ((zingo-cli)

**zebrad**: Zcash zuru ọnụ

**zaino**: Zcash blockchain indexer

**zingo-cli**: zcash akara iwu zaino-proxy ahịa (subset nke Zingolib)

## Vidio

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    kweeFullScreen
    loading="lazy"
  />
</div>


## Echiche Zuru Ezu

[Nhazi usoro](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash Onye ọrụ wụnye / Compiles Zingolib Nke na-enye ohere maka zingo-cli. Ha nwere ike izipu / nata ZEC dị ka mkpa.
- Zingo-cli connects to zaino either locally or via a secure channel online (Zcash user doesnt care how this works!)
- Zaino na-enye ohere ịbanye ma zebrad ma ọ bụ zcashd 
- Fully synced zebrad is source of truth (no more wallets here!)



## Ntinye

You will need to intall 3 things for this to work correctly. I also recommend screen or something similar to help with screen management

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
* nhọrọ* (mepụta oge ihuenyo maka zebrad)

```
screen -S zebra
zebrad start
```

mara: nke a ga-achọ ka ejikọta ya n'ụzọ zuru oke! 

### nwa ehi

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


* nhọrọ* (mepụta oge ihuenyo maka zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```


### ụgbụgbọ

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

* nhọrọ* (mepụta oge ihuenyo maka zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

edeturu: nke a ga-achọ ka ejikọta ya kpamkpam, dịka lightwalletd mere. Ana m akwado iji ụgbọala mpụga iji chekwaa oge :)


## Ịgba ọsọ

Ọ bụrụ na ị na-agba ọsọ ndị a na ákwà, `screen -r` ga-edepụta ihuenyo ọ bụla ka ị gaa dịka ọ dị mkpa
