# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : zcash full node

**zaino**     : onye na-edepụta blockchain zcash

**zingo-cli** : onye ahịa zaino-proxy nke ahịrị iwu zcash (subset nke Zingolib)

## Vidio

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


## Nchịkọta Ukwa

[System Architecture](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash Onye ọrụ na-etinye/na-achịkọta Zingolib nke na-enye ohere ịnweta zingo-cli. Ha nwere ike izipu/nata ZEC dịka achọrọ.
- zingo-cli na-ejikọ na zaino ma n’ime mpaghara ma ọ bụ site na ọwa nchekwa n’ịntanetị (Zcash onye ọrụ anaghị eche maka otú nke a si arụ ọrụ!)
- Zaino na-enye ohere ịnweta ma zebrad ma ọ bụ zcashd            
- zebrad emekọrịtara kpamkpam bụ isi iyi eziokwu (e-akpa ego ọzọ adịghị ebe a!)



## Ntinye

Ị ga-achọ itinye ihe 3 ka nke a rụọ ọrụ nke ọma. Ana m akwado screen ma ọ bụ ihe yiri ya iji nyere aka na njikwa ihuenyo

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*nhọrọ* (mepụta nnọkọ screen maka zebrad)

```
screen -S zebra
zebrad start
```

note: nke a ga-adị mkpa ka emekọrịta ya kpamkpam! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*nhọrọ* (mepụta nnọkọ screen maka zaino)

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

*nhọrọ* (mepụta nnọkọ screen maka zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

note: nke a ga-adị mkpa ka emekọrịta ya kpamkpam, dịka lightwalletd mere. Ana m akwado iji draịvụ mpụga chekwaa oge :)


## Ịgba Ọrụ

Ọ bụrụ na ị na-agba ihe ndị a na screens, `screen -r` ga-edepụta screen ọ bụla ka ị gaa na ya dịka achọrọ
