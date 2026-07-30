#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="Texte alternatif" width="50"/> ZingoLabs

[Site officiel](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs est une équipe de visionnaires dédiée à l'amélioration de l'expérience humaine. Nous pensons que la technologie doit bénéficier à l'humanité et que nous nous épanouissons grâce à des interactions consensuelles. Nous identifions les schémas qui rendent cela possible.

Zingo Lab Cyan fonctionne comme une Shielded DAO. Nous stockons nos fonds dans une trésorerie où chaque membre possède une view key. Les fonds sont dépensés depuis la trésorerie lorsque les membres votent en faveur d'une proposition.

## Projets

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet est un portefeuille Zcash complet conçu pour être facile à utiliser, bien qu'il inclue aussi certaines fonctionnalités avancées pour les utilisateurs plus expérimentés. Il prend en charge les pools transparent, Sapling et Orchard, dispose d'un carnet d'adresses pour les paiements récurrents et est disponible en plusieurs langues. Il a été le premier portefeuille à prendre en charge Orchard et à implémenter les formats NU5.

L'une des principales fonctionnalités de Zingo! est sa capacité à utiliser le champ Memo pour offrir des informations précieuses sur vos transactions.

Zingo! est disponible pour les appareils mobiles et les PC. Vous trouverez tous les téléchargements [ici](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Une API et une application de test qui exposent les fonctionnalités de zcash pour une utilisation par des applications. Zingolib fournit à la fois une bibliothèque pour zingo-mobile, ainsi qu'une application cli incluse pour interagir avec zcashd via lightwalletd appelée Zingo-cli, un client proxy lightwalletd en ligne de commande.

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino est un indexeur développé en Rust par l'équipe Zingo, qui vise à remplacer lightwalletd et à faire progresser le projet de dépréciation de zcashd.

Zaino offre des fonctionnalités essentielles à la fois pour les clients légers, tels que les portefeuilles et les applications qui n'ont pas besoin de l'historique complet de la blockchain, et pour les clients complets ou les portefeuilles. Il prend également en charge les explorateurs de blocs, en donnant accès à la fois à la blockchain finalisée et à la meilleure chaîne non finalisée ainsi qu'à la mempool gérées par un validateur complet Zebra ou Zcashd.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/zcash-local-net))
Un ensemble d'utilitaires qui lancent et gèrent les processus Zcash. Cela est utilisé pour les tests d'intégration dans le développement de :
- clients légers
- indexeurs
- validateurs

Son objectif est d'offrir un environnement de test très adaptable et robuste pour les nœuds centraux (validateurs) tels que zcash et zebra, les indexeurs comme lightwallet et zaino, et, au minimum, zingo-cli en tant que portefeuille client léger.

Ce dépôt est conçu pour comparer les fonctionnalités de différents validateurs (comme Zcashd et Zebrad) et indexeurs (tels que Lightwalletd et Zaino) afin de faciliter la migration durant le processus de dépréciation de Zcashd.

En plus de fournir des outils pour démarrer, mettre en cache et charger les données de chaîne Zcash (pour mainnet, testnet et regtest), zcash-zocal-net inclut une série de tests pour comparer les capacités de Lightwalletd et Zaino sur l'ensemble des services RPC Lightwallet. Ces tests peuvent être exécutés directement depuis Zaino (voir [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)]) afin d'évaluer les services RPC Lightwallet hébergés dans Zaino.
