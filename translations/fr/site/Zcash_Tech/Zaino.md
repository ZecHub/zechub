# Indexeur Zaino

Zaino est un indexeur, développé en Rust par l’équipe Zingo, qui vise à remplacer lightwalletd et à faire progresser le projet de dépréciation de zcashd.

Zaino offre des fonctionnalités essentielles à la fois pour les clients légers, tels que les portefeuilles et les applications qui n’ont pas besoin de l’historique complet de la blockchain, et pour les clients complets ou les portefeuilles. Il prend également en charge les explorateurs de blocs, en donnant accès à la fois à la blockchain finalisée et à la meilleure chaîne non finalisée ainsi qu’à la mempool gérées par un validateur complet Zebra ou Zcashd.

## Pourquoi un nouvel indexeur ?

La raison principale est de se préparer pour l’avenir. Zcashd et lightwalletd ont été construits en 2016 à partir d’un fork du code de bitcoind, en utilisant C plus. La plateforme et le code utilisés pour construire ces deux services commencent à vieillir, deviennent difficiles à faire évoluer, à maintenir et à utiliser pour développer des fonctionnalités modernes.

Rust est un langage moderne, robuste et sécurisé qui permet à Zcash d’être prêt pour les développements futurs, en invitant de nouveaux développeurs à construire de nombreuses nouvelles fonctionnalités dans et autour de l’écosystème Zcash.

Néanmoins, Zaino vise à rester rétrocompatible lorsque cela est possible, en fournissant des API et des interfaces qui aident à réduire les frictions d’adoption et à garantir que l’écosystème Zcash au sens large puisse bénéficier des améliorations de Zaino sans réécritures importantes ni courbe d’apprentissage significative.

De plus, Zaino permettra de séparer les fonctionnalités des clients légers du nœud complet, via un accès RPC et une bibliothèque cliente complète, permettant aux développeurs d’intégrer Zaino et d’accéder directement aux données de la chaîne depuis leur application de client léger, tout en maintenant les données sensibles du nœud Zebra isolées et sécurisées.

## Quelques schémas montrant comment fonctionne Zaino

### Architecture interne de Zaino
![Architecture interne de Zaino](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Architecture du service Zaino en direct
![Architecture du service Zebra en direct](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Architecture système de Zaino
![Architecture système de Zaino](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## Où puis-je en apprendre davantage ?
Vous pouvez en lire davantage sur l’indexeur Zaino dans le [fil officiel du forum de la communauté Zcash](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) ou sur sa [page Github officielle](https://github.com/zingolabs/zaino)
