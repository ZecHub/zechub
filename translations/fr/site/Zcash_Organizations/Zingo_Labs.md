#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Site officiel](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs est une équipe de visionnaires qui se consacre à améliorer l'expérience humaine. Nous croyons que la technologie doit bénéficier à l'humanité et que nous prospérons grâce à des interactions consensuelles. Nous identifions les modèles qui rendent cela possible.

Zingo Lab Cyan fonctionne comme une Shielded DAO. Nous conservons nos fonds dans une trésorerie où chaque membre dispose d'une view key. Les fonds sont dépensés depuis la trésorerie lorsque les membres votent en faveur d'une proposition.

## Projets

### Portefeuille Zingo! ([GitHub](https://github.com/zingolabs/zingo-mobile))
Le portefeuille Zingo est un portefeuille Zcash complet conçu pour être facile à utiliser, bien qu'il inclue certaines fonctionnalités avancées pour les utilisateurs plus expérimentés. Il prend en charge les pools transparents, Sapling et Ironwood, possède un carnet d'adresses pour les paiements récurrents et est disponible dans diverses langues. C'était le premier portefeuille à prendre en charge Orchard et à implémenter les formats NU5.

L'une des principales fonctionnalités de Zingo! est sa capacité à utiliser le champ Memo pour offrir des informations précieuses sur vos transactions.

Zingo! est disponible pour les appareils mobiles et les PC. Vous trouverez tous les téléchargements [ici](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Une API et une application de test qui expose les fonctionnalités de zcash pour les applications. Zingolib fournit à la fois une bibliothèque pour zingo-mobile, ainsi qu'une application cli incluse appelée zingo-cli, un portefeuille léger en ligne de commande qui communique avec un indexeur de chaîne tel que [Zaino](/zcash-tech/zaino).

### Indexeur Zaino ([GitHub](https://github.com/zingolabs/zaino))
Zaino est un indexeur Rust pour la blockchain Zcash, développé par l'équipe Zingo. C'est l'indexeur de la [stack Z3](/zcash-tech/z3-stack) : il indexe les données de chaîne depuis un validateur [Zebra](/zcash-tech/zebra-full-node) et sert les portefeuilles, les explorateurs et les autres clients. Il constitue la voie de succession de lightwalletd.

Zaino offre des fonctionnalités essentielles tant pour les clients légers, tels que les portefeuilles et les applications qui ne nécessitent pas l'historique complet de la blockchain, que pour les clients ou portefeuilles complets. Il prend également en charge les explorateurs de blocs, donnant accès à la fois à la blockchain finalisée et à la meilleure chaîne non finalisée ainsi qu'au mempool gérés par un validateur complet Zebra.

`zcashd` a atteint son arrêt de fin de support le 18 juillet 2026 au bloc 3 417 100 et ne prend pas en charge Ironwood (NU6.3). Zaino lit un validateur Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Un ensemble d'utilitaires qui lancent et gèrent des processus Zcash. Il est utilisé pour les tests d'intégration lors du développement de :
- clients légers
- indexeurs
- validateurs

Son objectif est d'offrir un environnement de test très adaptable et robuste pour les nœuds principaux (validateurs) tels que Zebra, les indexeurs comme Zaino et les portefeuilles de clients légers tels que zingo-cli.

La stack par défaut qu'il lance est Zebrad, zainod et zcash-devtool. Les processus hérités `zcashd` et lightwalletd se trouvent derrière une fonctionnalité `legacy-stack` non prise en charge et leur suppression est prévue.

En plus de fournir des outils permettant de démarrer, mettre en cache et charger les données de chaîne Zcash (pour mainnet, testnet et regtest), zcash-local-net est utilisé depuis la suite de tests de Zaino pour évaluer les services RPC Lightwallet hébergés dans Zaino (voir la documentation de test [Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
