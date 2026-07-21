# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad** : zcash node a ɛyɛ ma

**zaino** : zcash blockchain nkyerɛkyerɛmufoɔ

**zingo-cli** : zcash ahyɛdeɛ kwan zaino-proxy afɛfoɔ (Zingolib no fã ketewa) .

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="An introduction to Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>


## Mfonini Kɛse

[Nhyehyɛe a Wɔde Yɛ Nneɛma](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash Ɔdefoɔ Installs/Compiles Zingolib Nea ɛma kwan kɔ zingo-cli so. Wobetumi de ZEC amena/agye sɛnea ɛho hia.
- Zingo-cli di nkitaho ne zaino wɔ mpɔtam hɔ anaasɛ ɛnam ɔkwan a ahobammɔ wom so wɔ intanɛt so (Zcash dwumayɛni no mfa sɛnea eyi yɛ adwuma ho!)
- Zaino ma kwan ma wotumi kɔ zebrad anaa zcashd so 
- Fully synced zebrad is source of truth (no more wallets here!)



## Installation a wɔde hyɛ mu

Ɛho behia sɛ wo intall nneɛma 3 na eyi ayɛ adwuma yiye. Mekamfo screen anaa biribi a ɛte saa nso kyerɛ sɛ ɛbɛboa wɔ screen management mu

`sudo apt install screen`

### ɔsebɔ a wɔfrɛ no zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*optional* (yɛ screen session ma zebrad) .

```
screen -S zebra
zebrad start
```

hyɛ no nsow: eyi behia sɛ wɔyɛ sync koraa! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*optional* (yɛ screen session ma zaino) .

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```


### zingo-cli na ɛwɔ hɔ

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*optional* (yɛ screen session ma zingo-cli) .

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

hyɛ no nsow: eyi behia sɛ ɛyɛ sync koraa, sɛnea lightwalletd yɛe no. Mekamfo kyerɛ sɛ fa abɔnten drive di dwuma na ama woakora bere so :)


## Retu mmirika

Sɛ wo mmirikatu eyinom wɔ screens, . `screen -r` bɛkyerɛw screen biara a wobɛkɔ so sɛnea ɛho hia
