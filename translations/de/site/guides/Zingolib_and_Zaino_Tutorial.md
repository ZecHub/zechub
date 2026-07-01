# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : Zcash Full Node

**zaino**     : Zcash-Blockchain-Indexer

**zingo-cli** : Zcash-Befehlszeilenclient für zaino-proxy (Teilmenge von Zingolib)

## Video

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Eine Einführung in Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Gesamtüberblick

[Systemarchitektur](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Der Zcash-Nutzer installiert/kompiliert Zingolib, wodurch er Zugriff auf zingo-cli erhält. Er kann bei Bedarf ZEC senden/empfangen.
- Zingo-cli verbindet sich mit zaino, entweder lokal oder online über einen sicheren Kanal (dem Zcash-Nutzer ist egal, wie das funktioniert!)
- Zaino ermöglicht den Zugriff auf entweder zebrad oder zcashd            
- Ein vollständig synchronisierter zebrad ist die maßgebliche Quelle (keine Wallets mehr hier!)



## Installation

Du musst 3 Dinge installieren, damit das korrekt funktioniert. Ich empfehle außerdem `screen` oder etwas Ähnliches, um die Bildschirmverwaltung zu erleichtern.

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*optional* (eine `screen`-Sitzung für zebrad erstellen)

```
screen -S zebra
zebrad start
```

Hinweis: Dies muss vollständig synchronisieren! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*optional* (eine `screen`-Sitzung für zaino erstellen)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Port auf 8232 für Mainnet anpassen
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*optional* (eine `screen`-Sitzung für zingo-cli erstellen)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

Hinweis: Dies muss vollständig synchronisieren, genau wie lightwalletd. Ich empfehle die Verwendung eines externen Laufwerks, um Zeit zu sparen :)


## Ausführen

Wenn du diese in `screen`-Sitzungen ausführst, listet `screen -r` jede Sitzung auf, damit du bei Bedarf zu ihnen wechseln kannst.
