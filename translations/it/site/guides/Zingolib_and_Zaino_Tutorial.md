# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : full node zcash

**zaino**     : indicizzatore della blockchain zcash

**zingo-cli** : client da riga di comando zaino-proxy per zcash (sottoinsieme di Zingolib)

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


## Visione d'insieme

[Architettura del sistema](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- L'utente Zcash installa/compila Zingolib, che dà accesso a zingo-cli. Può inviare/ricevere ZEC secondo necessità.
- Zingo-cli si connette a zaino sia localmente sia tramite un canale sicuro online (all'utente Zcash non importa come funziona!)
- Zaino consente l'accesso sia a zebrad sia a zcashd            
- Un zebrad completamente sincronizzato è la fonte di verità (qui niente più wallet!)



## Installazione

Dovrai installare 3 cose perché tutto funzioni correttamente. Consiglio anche screen o qualcosa di simile per aiutare nella gestione delle sessioni

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*facoltativo* (crea una sessione screen per zebrad)

```
screen -S zebra
zebrad start
```

nota: questo dovrà sincronizzarsi completamente! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*facoltativo* (crea una sessione screen per zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Imposta la porta su 8232 per la mainnet
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*facoltativo* (crea una sessione screen per zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

nota: questo dovrà sincronizzarsi completamente, proprio come ha fatto lightwalletd. Consiglio di usare un disco esterno per risparmiare tempo :)


## Esecuzione

Se li stai eseguendo in screen, `screen -r` elencherà ogni screen, così potrai passare da uno all'altro secondo necessità
