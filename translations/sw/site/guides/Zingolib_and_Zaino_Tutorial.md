# Z3: (zebrad) ((zaino) ((zingo-cli)

** zebrad **: zcash full node

** zaino **: zcash blockchain indexer

** zingo-cli **: Zcash amri line zaino-proxy mteja (subset ya Zingolib)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>


## Mfano Mkubwa

[Mfumo usanifu](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash User Installs/Compiles Zingolib Which gives access to zingo-cli. Wanaweza kutuma/kupokea ZEC kama inahitajika.
- Zingo-cli inaunganisha na zaino ama ndani ya nchi au kupitia njia salama mtandaoni (mtumiaji wa Zcash hajali jinsi hii inavyofanya kazi!)
- Zaino inaruhusu upatikanaji wa ama zebrad au zcashd 
- Fully synced zebrad is source of truth (no more wallets here!)



## Ufungaji

Itabidi intall 3 mambo kwa ajili ya hii kazi kwa usahihi. Mimi pia kupendekeza screen au kitu kama kusaidia na screen usimamizi

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
* hiari * (kuunda kikao screen kwa zebrad)

```
screen -S zebra
zebrad start
```

Kumbuka: hii itahitaji kabisa kulandanisha! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


* hiari * (kuunda kikao screen kwa zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```


### pango-mwili

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

* hiari * (kuunda kikao screen kwa ajili ya zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

Kumbuka: hii itahitaji kabisa kulandanisha, tu kama lightwalletd alifanya. Mimi kupendekeza kutumia gari nje ya kuokoa muda :)


## Kukimbia

Kama yako kuendesha hizi katika skrini, `screen -r` itakuwa orodha kila screen kwa ajili ya wewe hoja kama inahitajika
