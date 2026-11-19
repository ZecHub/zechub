# Zaino Indexer

Zaino est un indexeur Rust pour la blockchain Zcash. Il lit les données de la chaîne depuis un nœud complet Zebra et fournit les données dont les portefeuilles, les explorateurs, les faucets et d’autres services ont besoin, sans rendre Zebra lui-même responsable de tous les index destinés aux clients.

## En bref

* **Zebra** valide la chaîne Zcash.
* **Zaino** indexe les données de la chaîne de Zebra et expose des API destinées aux clients.
* **Zallet** est le composant portefeuille de la pile Z3. Dans la configuration Z3 par défaut, Zallet communique directement avec Zebra et n’a pas besoin du service autonome Zaino.
* Le service autonome Zaino est utile lorsque les opérateurs ont besoin d’un point de terminaison gRPC compatible avec lightwalletd, d’un proxy JSON-RPC ou d’une infrastructure pour les portefeuilles légers, les explorateurs, les faucets et les services similaires.
* Zaino est une infrastructure active, mais les opérateurs doivent consulter la documentation officielle de Zaino et celle de Z3 pour connaître les détails de déploiement à jour avant de l’exploiter en production.

## Ce que fait Zaino

Zaino se situe entre Zebra et les logiciels clients. Zebra est le nœud de consensus : il télécharge, vérifie et suit la blockchain Zcash. Zaino utilise Zebra comme source de données de la chaîne, puis prépare des vues indexées que les applications clientes peuvent interroger efficacement.

Cette séparation clarifie les rôles :

| Composant | Rôle |
|:--|:--|
| Zebra | Nœud complet et validateur |
| Zaino | Indexeur et service d’API destinées aux clients |
| Zallet | Service de portefeuille |
| lightwalletd | Ancien serveur de portefeuille léger que Zaino est conçu pour remplacer ou compléter |

Zaino fournit des fonctionnalités aux clients légers, aux clients complets ou portefeuilles, ainsi qu’aux explorateurs de blocs. Il donne accès à la chaîne finalisée, à la meilleure chaîne non finalisée et aux données du mempool détenues par Zebra.

## Sa place dans la pile Zcash Stack actuelle

La pile Z3 actuelle repose sur Zebra, Zallet et Zaino, en option.

Dans le déploiement Z3 par défaut, Zebra et Zallet fonctionnent ensemble. Zallet accède directement à Zebra ; ainsi, un opérateur qui exécute uniquement une pile de portefeuille locale n’a pas besoin de démarrer le service autonome Zaino.

Zaino est ajouté lorsque l’opérateur souhaite fournir un service à des clients externes. Dans Z3, il s’exécute derrière le profil Compose `indexer` et ajoute :

* un point de terminaison gRPC compatible avec lightwalletd pour les clients de portefeuille léger
* un proxy JSON-RPC pour les explorateurs, les faucets et les serveurs principaux des services
* une base de données d’indexeur distincte de l’état de la chaîne de Zebra

Zaino est donc particulièrement pertinent pour les serveurs principaux de portefeuilles, les opérateurs d’infrastructures publiques, les explorateurs, les faucets et les développeurs qui testent des services nécessitant des données de chaîne Zcash indexées.

## Zaino et lightwalletd

lightwalletd est le serveur de portefeuille léger d’origine. Zaino est la solution qui lui succède pour ce rôle, basée sur Rust. Son objectif est de fournir des API compatibles dans la mesure du possible, afin que les portefeuilles et les services puissent migrer sans devoir être entièrement réécrits d’un seul coup.

Cela ne signifie pas que tous les déploiements lightwalletd sont déjà passés à Zaino. Les opérateurs doivent considérer Zaino comme un élément de la pile actuelle basée sur Zebra et consulter la documentation, les versions et les tableaux de bord des services du projet les plus récents avant de choisir quoi exécuter.

## Notes pour les opérateurs

Le dépôt Z3 est la voie de déploiement officielle la plus simple. Z3 inclut Zaino en tant que service facultatif :

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Commencez par la procédure Z3 habituelle et attendez que Zebra se synchronise avant de démarrer les services qui en dépendent sur le réseau principal ou le réseau de test.

Zaino expose deux types de services réseau. Le service gRPC est l’API destinée à lightwallet. Le service JSON-RPC est prévu pour les connexions locales ou les réseaux privés de confiance, sauf si une couche externe assure sa protection. N’exposez pas sur l’Internet public un point de terminaison JSON-RPC sans authentification ni chiffrement.

## Quelques schémas illustrant le fonctionnement de Zaino

### Architecture interne de Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Architecture des services en direct de Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Architecture système de Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Erreurs courantes

**Considérer Zaino comme un nœud complet.** Zaino n’est pas le validateur. Zebra valide la chaîne ; Zaino indexe les données de Zebra.

**Supposer que chaque déploiement Z3 a besoin de Zaino en mode autonome.** Zallet peut accéder directement à Zebra dans la pile Z3 par défaut. Démarrez Zaino lorsque vous avez besoin du service d’indexeur autonome pour des clients externes.

**Présenter des fonctionnalités prévues comme si elles étaient déjà déployées.** Zaino est en cours de développement actif. Consultez donc les notes de version et la documentation actuelles avant de présenter une fonctionnalité comme étant disponible.

**Exposer JSON-RPC sans précaution.** L’interface JSON-RPC de Zaino est destinée aux connexions locales ou aux réseaux privés de confiance, sauf si une autre couche la protège.

## Où en savoir plus ?

* [Zaino dépôt GitHub](https://github.com/zingolabs/zaino)
* [Zaino versions ](https://github.com/zingolabs/zaino/releases)
* [Zaino documentation générée ](https://zingolabs.github.io/zaino/)
* [dépôt de déploiement Z3](https://github.com/ZcashFoundation/z3)
* [Zebra documentation ](https://zebra.zfnd.org/)
* [Zaino discussion sur les subventions et le projet ](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)
* [Zinder](/zcash-tech/zinder), un autre indexeur Rust, issu de Zcash Foundation (alpha)

**Dernière mise à jour :** août 2026
