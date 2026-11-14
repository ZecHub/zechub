# Indexeur Zaino

Zaino est un indexeur Rust pour la blockchain Zcash. Il lit les données de la chaîne depuis un nœud complet Zebra et fournit les données dont les portefeuilles, les explorateurs, les faucets et d'autres services ont besoin, sans que Zebra lui-même soit responsable de chaque index destiné aux clients.

## En bref

* **Zebra** valide la chaîne Zcash.
* **Zaino** indexe les données de la chaîne de Zebra et expose des API destinées aux clients.
* **Zallet** est le composant portefeuille de la pile Z3. Dans la configuration Z3 par défaut, Zallet communique directement avec Zebra et ne nécessite pas le service autonome Zaino.
* Le service autonome Zaino est utile lorsque les opérateurs ont besoin d'un point de terminaison gRPC compatible avec lightwalletd, d'un proxy JSON-RPC ou d'une infrastructure pour les portefeuilles légers, les explorateurs, les faucets et des services similaires.
* Zaino est une infrastructure active, mais les opérateurs doivent consulter la documentation officielle de Zaino et de Z3 pour connaître les détails de déploiement actuels avant de l'exécuter en production.

## Ce que fait Zaino

Zaino se situe entre Zebra et les logiciels clients. Zebra est le nœud de consensus : il télécharge, vérifie et suit la blockchain Zcash. Zaino utilise Zebra comme source de données de la chaîne, puis prépare des vues indexées que les applications clientes peuvent interroger efficacement.

Cette séparation permet de garder des rôles clairs :

| Composant | Rôle |
|:--|:--|
| Zebra | Nœud complet et validateur |
| Zaino | Indexeur et service d'API destiné aux clients |
| Zallet | Service de portefeuille |
| lightwalletd | Ancien serveur de portefeuille léger que Zaino est conçu pour remplacer ou compléter |

Zaino fournit des fonctionnalités pour les clients légers, les clients complets ou portefeuilles, et les explorateurs de blocs. Il donne accès à la chaîne finalisée, à la meilleure chaîne non finalisée et aux données du mempool détenues par Zebra.

## Sa place dans la pile Zcash actuelle

La pile Z3 actuelle est construite autour de Zebra, de Zallet et, en option, de Zaino.

Dans le déploiement Z3 par défaut, Zebra et Zallet fonctionnent ensemble. Zallet accède directement à Zebra : un opérateur qui n'exécute qu'une pile de portefeuille locale n'a donc pas besoin de démarrer le service autonome Zaino.

Zaino est ajouté lorsque l'opérateur souhaite servir des clients externes. Dans Z3, il fonctionne derrière le profil Compose `indexer` et ajoute :

* un point de terminaison gRPC compatible avec lightwalletd pour les clients de portefeuilles légers
* un proxy JSON-RPC pour les explorateurs, les faucets et les backends de services
* une base de données d'indexation distincte de l'état de la chaîne de Zebra

Zaino est donc particulièrement pertinent pour les backends de portefeuilles, les opérateurs d'infrastructures publiques, les explorateurs, les faucets et les développeurs qui testent des services ayant besoin de données indexées de la chaîne Zcash.

## Zaino et lightwalletd

lightwalletd est le serveur de portefeuille léger d'origine. Zaino est la voie de succession basée sur Rust pour ce rôle. Son objectif est de fournir des API compatibles dans la mesure du possible, afin que les portefeuilles et les services puissent migrer sans devoir être entièrement réécrits d'un seul coup.

Cela ne signifie pas que chaque déploiement de lightwalletd est déjà passé à Zaino. Les opérateurs doivent considérer Zaino comme faisant partie de la pile actuelle basée sur Zebra et consulter la documentation, les versions et les tableaux de bord de services les plus récents du projet avant de choisir ce qu'ils exécutent.

## Notes pour les opérateurs

La voie de déploiement de référence la plus simple est le dépôt Z3. Z3 inclut Zaino comme service optionnel :

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Effectuez d'abord la configuration Z3 normale et attendez que Zebra soit synchronisé avant de démarrer les services dépendants sur le mainnet ou le testnet.

Zaino expose deux types de services réseau. Le service gRPC est l'API destinée aux portefeuilles légers. Le service JSON-RPC est prévu pour le loopback ou pour des réseaux privés de confiance, sauf si une couche externe assure la protection. N'exposez pas un point de terminaison JSON-RPC non authentifié ou non chiffré sur l'Internet public.

## Quelques schémas montrant le fonctionnement de Zaino

### Architecture interne de Zaino

![Architecture interne de Zaino](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Architecture du service en production de Zaino

![Architecture du service Zebra Live](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Architecture système de Zaino

![Architecture système de Zaino](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Erreurs courantes

**Considérer Zaino comme un nœud complet.** Zaino n'est pas le validateur. Zebra valide la chaîne ; Zaino indexe les données provenant de Zebra.

**Supposer que chaque déploiement Z3 a besoin de Zaino en mode autonome.** Zallet peut accéder directement à Zebra dans la pile Z3 par défaut. Démarrez Zaino lorsque vous avez besoin du service d'indexation autonome pour des clients externes.

**Présenter des fonctionnalités prévues comme déjà déployées.** Zaino est activement développé : consultez donc les notes de version et la documentation actuelles avant de décrire une fonctionnalité comme disponible.

**Exposer JSON-RPC sans précaution.** L'interface JSON-RPC de Zaino est destinée au loopback ou à des réseaux privés de confiance, sauf si elle est protégée par une autre couche.

## Où puis-je en savoir plus ?

* [Dépôt Zaino GitHub](https://github.com/zingolabs/zaino)
* [Versions de Zaino](https://github.com/zingolabs/zaino/releases)
* [Documentation générée de Zaino](https://zingolabs.github.io/zaino/)
* [Dépôt de déploiement Z3](https://github.com/ZcashFoundation/z3)
* [Documentation de Zebra](https://zebra.zfnd.org/)
* [Subvention et discussion du projet Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Dernière mise à jour :** août 2026
