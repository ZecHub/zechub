#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Site officiel](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs est une équipe de visionnaires qui se consacre à l'amélioration de l'expérience humaine. Nous pensons que la technologie doit profiter à l'humanité et que nous nous épanouissons grâce à des interactions consenties. Nous identifions les schémas qui rendent cela possible.

Zingo Lab Cyan fonctionne comme une DAO protégée. Nous conservons nos fonds dans une trésorerie dont chaque membre possède une clé pour lecture seule. Les fonds de la trésorerie sont dépensés lorsque les membres votent en faveur d'une proposition.

## Projets

### Portefeuille Zingo! ([GitHub](https://github.com/zingolabs/zingo-mobile))
Le portefeuille Zingo est un portefeuille Zcash complet, conçu pour être facile à utiliser, même s'il comprend quelques fonctionnalités avancées pour les utilisateurs plus expérimentés. Il prend en charge les pools transparent, Sapling et Ironwood, dispose d'un carnet d'adresses pour les paiements récurrents et est disponible en plusieurs langues. C'est le premier portefeuille à avoir pris en charge Orchard et à avoir mis en œuvre les formats NU5.

L'une des principales fonctionnalités de Zingo! est sa capacité à utiliser le champ mémo pour fournir des informations précieuses sur vos transactions.

Zingo! est disponible pour les appareils mobiles et les PC. Vous trouverez tous les téléchargements [ici](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Une API et une application de test qui exposent les fonctionnalités de Zcash pour qu'elles soient utilisées par des applications. Zingolib fournit à la fois une bibliothèque pour zingo-mobile et une application en ligne de commande intégrée appelée zingo-cli, un portefeuille léger en ligne de commande qui communique avec un indexeur de chaîne tel que [Zaino](/zcash-tech/zaino).

### Indexeur Zaino ([GitHub](https://github.com/zingolabs/zaino))
Zaino est un indexeur Rust pour la blockchain Zcash, développé par l'équipe Zingo. C'est l'indexeur de la [pile Z3](/zcash-tech/z3-stack) : il indexe les données de la chaîne provenant d'un validateur [Zebra](/zcash-tech/zebra-full-node) et dessert les portefeuilles, les explorateurs et d'autres clients. Il constitue la voie de succession de lightwalletd.

Zaino offre des fonctionnalités essentielles à la fois pour les clients légers, tels que les portefeuilles et les applications qui ne nécessitent pas l'historique complet de la blockchain, et pour les clients ou portefeuilles complets. Il prend également en charge les explorateurs de blocs, en donnant accès à la fois à la blockchain finalisée et à la meilleure chaîne non finalisée ainsi qu'au mempool gérés par un validateur complet Zebra.

`zcashd` a atteint son arrêt de fin de support le 18 juillet 2026 au bloc 3 417 100 et ne prend pas en charge Ironwood (NU6.3). Zaino lit un validateur Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Un ensemble d'utilitaires qui lancent et gèrent des processus Zcash. Il est utilisé pour les tests d'intégration dans le développement :
- de clients légers
- d'indexeurs
- de validateurs

Son objectif est d'offrir un environnement de test hautement adaptable et robuste pour les nœuds principaux (validateurs) tels que Zebra, les indexeurs comme Zaino et les portefeuilles clients légers tels que zingo-cli.

La pile lancée par défaut se compose de Zebrad, zainod et zcash-devtool. Les anciens processus `zcashd` et lightwalletd se trouvent derrière une fonctionnalité `legacy-stack` non prise en charge et doivent être supprimés.

En plus de fournir des outils pour démarrer, mettre en cache et charger les données de chaîne de Zcash (pour le mainnet, le testnet et le regtest), zcash-local-net est utilisé par la suite de tests de Zaino pour évaluer les services RPC Lightwallet hébergés dans Zaino (voir [la documentation de test de Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
