# Z3 : (zebrad)(zaino)(zingo-cli)

**zebrad**    : nœud complet zcash

**zaino**     : indexeur de blockchain zcash

**zingo-cli** : client zaino-proxy zcash en ligne de commande (sous-ensemble de Zingolib)

## Vidéo

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


## Vue d'ensemble

[Architecture du système](https://github.com/zingolabs/zaino/blob/dev/docs/zaino_live_system_architecture.pdf)


- Zcash L'utilisateur installe ou compile Zingolib, ce qui lui donne accès à zingo-cli. Il peut envoyer et recevoir des ZEC selon ses besoins.
- zingo-cli se connecte à zaino soit localement, soit via un canal sécurisé en ligne (l'utilisateur de Zcash n'a pas à se soucier de son fonctionnement !)
- Zaino permet d'accéder soit à zebrad, soit à zcashd            
- Le zebrad entièrement synchronisé est la source de vérité (plus de portefeuilles ici !)



## Installation

Vous devrez installer 3 éléments pour que cela fonctionne correctement. Je vous recommande également screen ou un outil similaire pour faciliter la gestion des écrans

`sudo apt install screen`

### zebrad

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v7.0.0 zebrad
```

Utilisez Zebra 7.0.0 ou une version plus récente : NU7 a été activé sur le Mainnet au bloc 3 543 405, et les versions plus anciennes de `zebrad` ne peuvent pas suivre la chaîne au-delà de cette hauteur ([notes de version](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)).

 
*facultatif* (créez une session screen pour zebrad)

```
screen -S zebra
zebrad start
```

Remarque : il faudra attendre la synchronisation complète !

### zaino

```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```


*facultatif* (créez une session screen pour zaino)

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

*facultatif* (créez une session screen pour zingo-cli)

```
screen -S zingo
./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd
```

Remarque : il faudra attendre la synchronisation complète, tout comme pour lightwalletd. Je vous recommande d'utiliser un disque externe pour gagner du temps :)


## Exécution

Si vous exécutez ces programmes dans des sessions screen, `screen -r` affichera la liste de chaque session afin que vous puissiez passer de l'une à l'autre selon vos besoins
