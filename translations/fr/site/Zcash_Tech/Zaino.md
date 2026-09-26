# Zaino Indexeur

Zaino est un indexeur Rust pour la blockchain Zcash. Il lit les données de la chaîne depuis un nœud complet Zebra et fournit les données dont les wallets, explorateurs, faucets et autres services ont besoin, sans que Zebra soit lui-même responsable de chaque index destiné aux clients.

## TL;DR

* **Zebra** valide la chaîne Zcash.
* **Zaino** indexe les données de la chaîne de Zebra et expose des API destinées aux clients.
* **Zallet** est le composant wallet de la pile Z3. Dans la configuration Z3 par défaut, Zallet communique directement avec Zebra et ne nécessite pas le service autonome Zaino.
* Le service autonome Zaino est utile lorsque les opérateurs ont besoin d’un point de terminaison gRPC compatible avec lightwalletd, d’un proxy JSON-RPC ou d’une infrastructure pour les wallets légers, les explorateurs, les faucets et des services similaires.
* Zaino est une infrastructure active, mais les opérateurs doivent consulter la documentation officielle de Zaino et de Z3 pour connaître les détails actuels de déploiement avant de l’exécuter en production.

## Ce que fait Zaino

Zaino se situe entre Zebra et les logiciels clients. Zebra est le nœud de consensus : il télécharge, vérifie et suit la blockchain Zcash. Zaino utilise Zebra comme source de données de chaîne, puis prépare des vues indexées que les applications clientes peuvent interroger efficacement.

Cette séparation clarifie les rôles :

| Composant | Rôle |
|:--|:--|
| Zebra | Nœud complet et validateur |
| Zaino | Indexeur et service d’API destiné aux clients |
| Zallet | Service wallet |
| lightwalletd | Ancien serveur de wallet léger que Zaino est conçu pour remplacer ou compléter |

Zaino fournit des fonctionnalités aux clients légers, aux clients complets ou wallets, ainsi qu’aux explorateurs de blocs. Il donne accès à la chaîne finalisée, à la meilleure chaîne non finalisée et aux données du mempool détenues par Zebra.

## Comment il s’intègre dans la pile Zcash actuelle

La pile Z3 actuelle est construite autour de Zebra, Zallet et de Zaino facultatif.

Dans le déploiement Z3 par défaut, Zebra et Zallet s’exécutent ensemble. Zallet accède directement à Zebra, donc un opérateur n’exécutant qu’une pile wallet locale n’a pas besoin de démarrer le service autonome Zaino.

Zaino est ajouté lorsque l’opérateur souhaite servir des clients externes. Dans Z3, il s’exécute derrière le profil Compose `indexer` et ajoute :

* un point de terminaison gRPC compatible avec lightwalletd pour les clients de wallets légers
* un proxy JSON-RPC pour les explorateurs, faucets et backends de services
* une base de données d’indexeur distincte de l’état de chaîne de Zebra

Cela rend Zaino particulièrement pertinent pour les backends de wallets, les opérateurs d’infrastructures publiques, les explorateurs, les faucets et les développeurs testant des services nécessitant des données de chaîne Zcash indexées.

## Zaino et lightwalletd

lightwalletd est le serveur de wallet léger d’origine. Zaino est la voie de remplacement basée sur Rust pour ce rôle. Son objectif est de fournir des API compatibles lorsque cela est possible, afin que les wallets et services puissent migrer sans devoir être entièrement réécrits en une seule fois.

Cela ne signifie pas que chaque déploiement de lightwalletd a déjà migré vers Zaino. Les opérateurs doivent considérer Zaino comme faisant partie de la pile actuelle basée sur Zebra et consulter la documentation, les versions et les tableaux de bord de service les plus récents avant de choisir quoi exécuter.

## Notes pour les opérateurs

Le chemin de déploiement faisant le plus autorité est le dépôt Z3. Z3 inclut Zaino comme service facultatif :

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Exécutez d’abord la configuration Z3 normale et attendez que Zebra se synchronise avant de démarrer les services dépendants sur le mainnet ou le testnet.

Zaino expose deux types de services réseau. Le service gRPC est l’API destinée aux wallets légers. Le service JSON-RPC est prévu pour le loopback ou les réseaux privés de confiance, à moins qu’une couche externe ne fournisse une protection. N’exposez pas au public un point de terminaison JSON-RPC non authentifié ou non chiffré.

## Quelques diagrammes montrant le fonctionnement de Zaino

### Architecture interne de Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Architecture du service en direct de Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Architecture système de Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Erreurs fréquentes

**Considérer Zaino comme un nœud complet.** Zaino n’est pas le validateur. Zebra valide la chaîne ; Zaino indexe les données provenant de Zebra.

**Supposer que chaque déploiement Z3 nécessite Zaino autonome.** Zallet peut accéder directement à Zebra dans la pile Z3 par défaut. Démarrez Zaino lorsque vous avez besoin du service d’indexeur autonome pour des clients externes.

**Présenter des fonctionnalités prévues comme déjà déployées.** Zaino est activement développé ; consultez donc les notes de version et la documentation actuelles avant de décrire une fonctionnalité comme disponible.

**Exposer JSON-RPC sans précaution.** L’interface JSON-RPC de Zaino est destinée au loopback ou aux réseaux privés de confiance, sauf si elle est protégée par une autre couche.

## Où puis-je en apprendre davantage ?

* [Dépôt GitHub de Zaino](https://github.com/zingolabs/zaino)
* [Versions de Zaino](https://github.com/zingolabs/zaino/releases)
* [Documentation générée de Zaino](https://zingolabs.github.io/zaino/)
* [Dépôt de déploiement Z3](https://github.com/ZcashFoundation/z3)
* [Documentation de Zebra](https://zebra.zfnd.org/)
* [Subvention et discussion du projet Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Dernière mise à jour :** août 2026
