# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad** : zcash blibo ƒe node

**zaino** : zcash blockchain ƒe xexlẽdzesifiala

**zingo-cli** : zcash sedede ƒe fli zaino-proxy client (Zingolib ƒe hatsotso sue)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ɖe mɔ ɖeFullScreen ŋu
    loading="lazy"
  />
</div>


## Nɔnɔmetata Gã

[Dɔwɔɖoɖo ƒe Xɔtuɖaŋu](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash Zãla Dea/Ƒo Zingolib Si naa mɔɖeɖe ɖe zingo-cli ŋu. Woateŋu aɖo/xɔ ZEC abe alesi wòhiã ene.
- Zingo-cli doa ka kple zaino le nutoa me alo to mɔnu si le dedie dzi le internet dzi (Zcash zãla metsɔ ɖeke le alesi esia wɔa dɔe me o!)
- Zaino ɖe mɔ be woakpɔ zebrad alo zcashd 
- Fully synced zebrad is source of truth (no more wallets here!)



## Eɖoɖo ɖe dɔa me

Ahiã be nàƒo nu 3 ɖe eme hafi esia nawɔ dɔ nyuie. Mekafu screen alo nane si sɔ kplii hã be wòakpe ɖe screen dzikpɔkpɔ ŋu

`sudo apt install screen`

### zebrad (dzogbenyi) si woyɔna be zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*optional* (wɔ screen session na zebrad)

```
screen -S zebra
zebrad start
```

de dzesii: ahiã be esia nawɔ ɖeka bliboe! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*optional* (wɔ screen session na zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```


### zingo-cli ƒe ŋkɔ

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*optional* (wɔ screen session na zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

de dzesii: ahiã be esia nawɔ ɖeka bliboe, abe alesi lightwalletd wɔe ene. Meɖo aɖaŋu be nàzã gotagome ʋu aɖe be nàɖe ɣeyiɣi dzi akpɔtɔ :)


## Le du dzi

Ne wò duƒuƒu le esiawo me le screens, . `screen -r` aŋlɔ screen ɖesiaɖe si dzi nàʋu ayi ne ehiã
