# Z3: (zebrad)(zaino)(zingo-cli)

**zebrad**    : nœud complet zcash

**zaino**     : indexeur de la blockchain zcash

**zingo-cli** : client zaino-proxy en ligne de commande zcash (sous-ensemble de Zingolib)

## Vidéo

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/b5dIuGstMvI"
    title="Une introduction à Zingolib + Zaino"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Vue d'ensemble

[Architecture du système](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- L'utilisateur Zcash installe/compile Zingolib, ce qui donne accès à zingo-cli. Il peut envoyer/recevoir des ZEC selon ses besoins.
- Zingo-cli se connecte à zaino soit localement, soit via un canal sécurisé en ligne (l'utilisateur Zcash n'a pas à se soucier de la façon dont cela fonctionne !)
- Zaino permet d'accéder soit à zebrad, soit à zcashd            
- Un zebrad entièrement synchronisé est la source de vérité (plus de portefeuilles ici !)



## Installation

Vous devrez installer 3 éléments pour que cela fonctionne correctement. Je recommande aussi `screen` ou quelque chose de similaire pour aider à la gestion des écrans

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```

 
*optionnel* (créer une session screen pour zebrad)

```
screen -S zebra
zebrad start
```

remarque : cela devra être entièrement synchronisé ! 

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*optionnel* (créer une session screen pour zaino)

```
screen -S zaino
cd ~/zaino/zainod
nano zindexer.toml  => Ajuster le port à 8232 pour le mainnet
zainod --config zindexer.toml
```


### zingo-cli

```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```

*optionnel* (créer une session screen pour zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

remarque : cela devra être entièrement synchronisé, tout comme lightwalletd l'était. Je recommande d'utiliser un disque externe pour gagner du temps :)


## Exécution

Si vous les exécutez dans des sessions screen, `screen -r` listera chaque écran afin que vous puissiez passer à celui dont vous avez besoin
