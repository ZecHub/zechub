# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ blibo [full node]

**zaino**     : Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] ƒe indexer

**zingo-cli** : Zcash ƒe command line zaino-proxy client (Zingolib ƒe akpa)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Nuto ŋgɔ na Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Nɔnɔmetata Gã

[System ƒe ƒoƒoɖoɖo](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash Wò ƒo alo ɖo Zingolib, si na wò mɔ be wòakpɔ zingo-cli. Wòate ŋu aɖo alo axɔ ZEC ɣe sia ɣe si wòahiã.
- zingo-cli do ɖe zaino ŋu le teƒe sia me alo to kana dedie me le internet dzi (Zcash wòmehiã be wòanya ale si esia wɔa dɔ o!)
- Zaino na mɔ be woakpɔ zebrad alo zcashd            
- Ne zebrad wɔ sync blibo la, eyae nye nyateƒe ƒe dzɔƒe (gakotoku [wallet] aɖeke megali afi sia o!)



## Ɖoɖo

Wòahiã be wòaɖo nu 3 be esia nawɔ dɔ nyuie. Meɖe asi le screen alo nu si sɔ kplee ŋu hã be nàkpɔ screenwo dzi nyuie.

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*Dzi be wòadi* (wɔ screen session na zebrad)

```
screen -S zebra
zebrad start
```

Nudzɔdzɔ: Esia hiã be wòawɔ sync blibo! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*Dzi be wòadi* (wɔ screen session na zaino)

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

*Dzi be wòadi* (wɔ screen session na zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

Nudzɔdzɔ: Esia hiã be wòawɔ sync blibo, abe ale si lightwalletd wɔe ene. Meɖe asi le drive le gota ŋu be nàhe gaɣeyiɣi. :)


## Wɔwɔ Dɔ

Ne wòle esiawo wɔm le screen sessions me la, `screen -r` afia screen sia screen si wòate ŋu ayi ɖo ɣe sia ɣe si woahiã
