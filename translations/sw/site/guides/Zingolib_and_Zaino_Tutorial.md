# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : full node ya Zcash

**zaino**     : kiashiria cha blockchain ya Zcash

**zingo-cli** : mteja wa mstari wa amri wa zaino-proxy wa Zcash (kijisehemu cha Zingolib)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Utangulizi wa Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Mtazamo mpana

[Usanifu wa mfumo](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash Mtumiaji husakinisha/hukusanya Zingolib, jambo linalotoa ufikiaji wa zingo-cli. Anaweza kutuma/kupokea ZEC inapohitajika.
- zingo-cli huunganishwa na zaino ama ndani ya mfumo au kupitia njia salama mtandaoni (Zcash mtumiaji hajali jinsi hili linavyofanya kazi!)
- Zaino huruhusu ufikiaji wa ama zebrad au zcashd            
- zebrad iliyosawazishwa kikamilifu ndiyo chanzo cha ukweli (hakuna pochi tena hapa!)



## Usakinishaji

Utahitaji kusakinisha vitu 3 ili hili lifanye kazi ipasavyo. Pia ninapendekeza screen au kitu kinachofanana ili kusaidia katika usimamizi wa skrini

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*hiari* (unda kipindi cha screen kwa ajili ya zebrad)

```
screen -S zebra
zebrad start
```

Dokezo: Hiki kitahitaji kusawazishwa kikamilifu! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*hiari* (unda kipindi cha screen kwa ajili ya zaino)

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

*hiari* (unda kipindi cha screen kwa ajili ya zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

Dokezo: Hiki kitahitaji kusawazishwa kikamilifu, kama vile lightwalletd ilivyofanya. Ninapendekeza kutumia hifadhi ya nje ili kuokoa muda :)


## Kuendesha

Ikiwa unaviendesha hivi katika screen, `screen -r` itaorodhesha kila skrini ili uweze kuhamia kwa kila moja inapohitajika
