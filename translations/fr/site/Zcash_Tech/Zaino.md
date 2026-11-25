<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Indexer de Zaino

## En bref

* **Zebra** valide la chaîne Zcash.
* **Zaino** indexe les données de la chaîne de Zebra et expose des API destinées aux clients.
* **Zallet** est le composant portefeuille de la pile Z3. Dans la configuration Z3 par défaut, Zallet communique directement avec Zebra et n’a pas besoin du service autonome Zaino.
* Le service autonome Zaino est utile lorsque les opérateurs ont besoin d’un point de terminaison gRPC compatible avec lightwalletd, d’un proxy JSON-RPC ou d’une infrastructure pour les portefeuilles légers, les explorateurs, les faucets et les services similaires.
* Zaino est une infrastructure active, mais les opérateurs doivent consulter la documentation officielle de Zaino et celle de Z3 pour connaître les détails de déploiement à jour avant de l’exploiter en production.

## Explication générale

Zaino est un indexeur Rust pour la blockchain Zcash. Il lit les données de la chaîne à partir d’un nœud complet Zebra. Il fournit les données dont les portefeuilles, les explorateurs, les faucets et les autres services ont besoin, sans confier à Zebra la responsabilité de chaque index destiné aux clients.

### Rôle de Zaino

Zaino se situe entre Zebra et les logiciels clients. Zebra est le nœud de consensus : il télécharge, vérifie et suit la blockchain Zcash. Zaino utilise Zebra comme source de données de la chaîne, puis prépare des vues indexées que les applications clientes peuvent interroger efficacement.

Cette séparation clarifie les rôles :

| Composant | Rôle |
|:--|:--|
| Zebra | Nœud complet et validateur |
| Zaino | Indexeur et service d’API destinées aux clients |
| Zallet | Service de portefeuille |
| lightwalletd | Ancien serveur de portefeuille léger que Zaino est conçu pour remplacer ou compléter |

Zaino fournit des fonctionnalités pour les clients légers, les clients complets ou les portefeuilles, ainsi que les explorateurs de blocs. Il donne accès à la chaîne finalisée, à la meilleure chaîne non finalisée et aux données de mempool détenues par Zebra.

### Son rôle dans la pile Zcash Stack actuelle

La pile Z3 actuelle repose sur Zebra, Zallet et Zaino, en option.

Dans le déploiement Z3 par défaut, Zebra et Zallet fonctionnent ensemble. Zallet accède directement à Zebra ; ainsi, un opérateur qui exécute uniquement une pile de portefeuille locale n’a pas besoin de démarrer le service autonome Zaino.

Zaino est ajouté lorsque l’opérateur souhaite fournir un service à des clients externes. Dans Z3, il s’exécute derrière le profil Compose `indexer` et ajoute :

* un point de terminaison gRPC compatible avec lightwalletd pour les clients de portefeuille léger
* un proxy JSON-RPC pour les explorateurs, les faucets et les serveurs principaux des services
* une base de données d’indexeur distincte de l’état de la chaîne de Zebra

Zaino est donc particulièrement pertinent pour les serveurs principaux de portefeuilles, les opérateurs d’infrastructures publiques, les explorateurs, les faucets et les développeurs qui testent des services nécessitant des données de chaîne Zcash indexées.

### Zaino et lightwalletd

lightwalletd est le serveur de portefeuille léger d’origine. Zaino est la solution qui lui succède pour ce rôle, basée sur Rust. Son objectif est de fournir des API compatibles dans la mesure du possible, afin que les portefeuilles et les services puissent migrer sans devoir être entièrement réécrits d’un seul coup.

Cela ne signifie pas que tous les déploiements lightwalletd sont déjà passés à Zaino. Les opérateurs doivent considérer Zaino comme un élément de la pile actuelle basée sur Zebra et consulter la documentation, les versions et les tableaux de bord des services du projet les plus récents avant de choisir quoi exécuter.

## Illustration / analogie

Imaginez la blockchain Zcash comme une immense archive de pages de registre.

Zebra est l’archiviste. Il reçoit chaque nouvelle page, vérifie qu’elle respecte les règles et la classe au bon endroit.

Zaino est le bureau de consultation situé devant les archives. Il lit ce que Zebra a classé, crée des catalogues pour faciliter les recherches et répond rapidement aux visiteurs. Les portefeuilles légers, les explorateurs et les faucets s’adressent à ce bureau pour poser des questions comme « que contient ce bloc ? » ou « quelles transactions attendent dans la mempool ? ». Le bureau de consultation ne décide jamais quelles pages sont authentiques. Cette tâche revient à l’archiviste.

Zallet, dans la configuration Z3 par défaut, travaille dans le même bâtiment et se rend directement auprès de l’archiviste. Il n’a pas besoin du bureau de consultation.

### Quelques schémas du fonctionnement de Zaino

#### Architecture interne de Zaino

![Architecture interne de Zaino](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Architecture du service en direct de Zaino

![Architecture du service en direct de Zebra](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Architecture système de Zaino

![Architecture système de Zaino](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Pour aller plus loin

### Notes pour les opérateurs

Le dépôt Z3 est la voie de déploiement officielle la plus simple. Z3 inclut Zaino en tant que service facultatif :

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Commencez par la procédure Z3 habituelle et attendez que Zebra se synchronise avant de démarrer les services qui en dépendent sur le réseau principal ou le réseau de test.

Zaino expose deux types de services réseau. Le service gRPC fournit l’API destinée aux clients lightwallet. Le service JSON-RPC est destiné à la boucle locale ou aux réseaux privés de confiance, sauf si une couche externe assure sa protection. N’exposez pas sur l’Internet public un point de terminaison JSON-RPC non authentifié ou non chiffré.

## Erreurs courantes

**Considérer Zaino comme un nœud complet.** Zaino n’est pas le validateur. Zebra valide la chaîne ; Zaino indexe les données de Zebra.

**Supposer que chaque déploiement Z3 a besoin de Zaino en mode autonome.** Zallet peut accéder directement à Zebra dans la pile Z3 par défaut. Démarrez Zaino lorsque vous avez besoin du service d’indexeur autonome pour des clients externes.

**Présenter des fonctionnalités prévues comme si elles étaient déjà déployées.** Zaino est en cours de développement actif. Consultez donc les notes de version et la documentation actuelles avant de présenter une fonctionnalité comme étant disponible.

**Exposer JSON-RPC sans précaution.** L’interface JSON-RPC de Zaino est destinée aux connexions locales ou aux réseaux privés de confiance, sauf si une autre couche la protège.

## Pages connexes

- [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes) : les serveurs auxquels les portefeuilles légers se connectent, lightwalletd et Zaino, et la façon de passer de l’un à l’autre.
- [Zinder](/zcash-tech/zinder), un autre indexeur Rust, de Zcash Foundation (alpha)
- [Nœud complet de Zebra](/zcash-tech/zebra-full-node) : le nœud dont Zaino lit les données de chaîne.
- [Zallet](/zcash-tech/zallet) : le portefeuille pour nœud complet de la pile Z3.
- [Pile Z3](/zcash-tech/z3-stack) : Zebra, Zallet et l’indexeur facultatif Zaino regroupés.
- [Comparaison des indexeurs : Zaino et Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) : une comparaison reproductible de deux indexeurs lightwallet.
- [Nœuds complets](/zcash-tech/full-nodes) : présentation des logiciels de nœud complet Zcash.
- [Synchronisation du portefeuille de Zcash](/zcash-tech/zcash-wallet-syncing) : pourquoi les portefeuilles protégés ont besoin d’un processus de synchronisation.

### Ressources

* [Dépôt GitHub de Zaino](https://github.com/zingolabs/zaino)
* [Versions de Zaino ](https://github.com/zingolabs/zaino/releases)
* [Documentation générée de Zaino ](https://zingolabs.github.io/zaino/)
* [Dépôt de déploiement Z3](https://github.com/ZcashFoundation/z3)
* [Documentation de Zebra ](https://zebra.zfnd.org/)
* [Subvention et discussion sur le projet de Zaino ](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Dernière mise à jour :** novembre 2026
