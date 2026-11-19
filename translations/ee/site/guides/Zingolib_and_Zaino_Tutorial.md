# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : Zcash ɣaɣla dzesi ŋɔŋlɔ blibo

**zaino**     : Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe indexer

**zingo-cli** : Zcash command line zaino-proxy client (subset of Zingolib)

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


## Nufiala gãtɔ

[System Architecture](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash Dɔlafoa Ɖe Ƒo Mɔ̃/Ɖe Ƒo Kɔmpiuta Ŋu Zingolib Esia na wò kpɔ mɔ ɖe zingo-cli. Woate ŋu aɖo/axɔ ZEC le esiawo hia nu.
- zingo-cli Ɗo kpe ɖe zaino ŋu le afima alo to online ƒe ɣaɣla mɔ dzi (Zcash dɔlafoa menya alesi esia wɔa dɔ o!)
- Zaino Na mɔ be woakpɔ zebrad alo zcashd            
- zebrad si ƒo ƒu bliboe nye nyateƒe ƒe dzɔtsoƒe (gakotoku bubuwo mele afii o!)



## Ɖe Ƒo Ƒo

Wòaxɔ nu etɔ̃ le woaɖe ƒo ɖe eme be esiawɔ dɔ nyuie. Mele susu be wòazã screen alo nu bubu si sɔe kple esia hena screen ƒe ɖoɖo ŋu.

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad
```

Zã Zebra 7.0.0 alo si wu: NU7 woɖe ɖe Mainnet le gaɖoɖo 3,543,405 dzi, eye `zebrad` ƒe version xoxowo mate ŋu adze ɖoɖonu la yome ne wòɖo dzi ma va yi o ([release notes](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)).

 
*optional* (Wɔ screen session na zebrad)

```
screen -S zebra
zebrad start
```

Ŋɔŋlɔ: Esia hia be wòafɔ ƒo ƒu bliboe! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*optional* (Wɔ screen session na zaino)

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

*optional* (Wɔ screen session na zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

Ŋɔŋlɔ: Esia hia be wòafɔ ƒo ƒu bliboe, abe ale si lightwalletd wɔe ene. Mele susu be wòazã external drive be nàxɔ ɣeyiɣi :)


## Ɖe Dɔ

Ne wòle esiawo wɔm le screens me la, `screen -r` aɖe screen ɖesiaɖe afia na wò be nàyi edzi abe ale si wòhiã ene.
