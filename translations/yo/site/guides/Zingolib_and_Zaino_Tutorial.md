# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : zcash full node

**zaino**: ìdìpọ̀ ìsọ̀rí blockchain zcash

**zingo-cli** : zcash command line zaino-proxy client (subset of Zingolib)

## Fídíò

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    jẹ́ kíFullScreen
    loading="lazy"
  />
</div>


## Ohun Tó Ń Ṣẹlẹ̀

[Àwòrán ilé ètò](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Olumulo Zcash Fi sori ẹrọ / Kọ Zingolib Eyi ti o funni ni iraye si zingo-cli. Wọn le firanṣẹ / gba ZEC bi o ti nilo.
- Zingo-cli máa ń so mọ́ zaino yálà ní àdúgbò tàbí nípasẹ̀ ọ̀nà ààbò orí ayélujára (olùṣàmúlò Zcash kò bìkítà nípa bí èyí ṣe ń ṣiṣẹ́!)
- Zaino gba ọ laaye lati wọle si zebrad tabi zcashd 
- Fully synced zebrad is source of truth (no more wallets here!)



## Iṣẹ́-ṣiṣe

O yoo nilo lati intall 3 ohun fun yi lati ṣiṣẹ daradara. Mo tun so iboju tabi nkankan iru lati ran pẹlu iboju isakoso

`sudo apt install screen`

### ẹyẹ zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*optional* (create a screen session for zebrad)

```
screen -S zebra
zebrad start
```

àkíyèsí: èyí yóò nílò láti bára mu pátápátá! 

### àdàbà

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*optional* (Ṣẹ́ ìtòlẹ́sẹẹsẹ ìwífún fún zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```


### ẹ̀rọ-ìmọ̀ràn

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*optional* (Ṣẹ́ ìtòlẹ́sẹẹsẹ ìkápá fún zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

àkíyèsí: èyí yóò nílò láti ṣe àdàkọ ní kíkún, gẹ́gẹ́ bí lightwalletd ṣe ṣe. Mo dábàá lílo ẹ̀rọ alágbèéká láti fi dín àkókò kù :)


## Rírìn

Ti o ba ti wa ni ṣiṣe awọn wọnyi ni iboju, `screen -r` yoo ṣe akojọ iboju kọọkan fun ọ lati lọ si bi o ti nilo
