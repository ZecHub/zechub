<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nœud Zakura

Zakura est une implémentation de nœud complet libre et open source pour Zcash, conçue pour fonctionner à grande échelle. Issu d'un fork de [Zebra](Zebra_Full_Node.md) et développé dans le cadre d'une collaboration entre **Valar Group** et **Project Tachyon**, Zakura offre une synchronisation nettement plus rapide, un élagage natif des blocs et une couche de compatibilité avec les outils historiques de `zcashd`. La version 1.0.0 a été publiée le 15 juillet 2026.

---

## En bref

- Zakura est un **nœud complet Zcash compatible avec le consensus**, une alternative à Zebra et zcashd, issue d'un fork de Zebra.
- La synchronisation de la blockchain est environ **5× plus rapide qu'avec Zebra** ; l'amorçage par instantané se termine en **moins de 2 minutes**.
- **L'élagage natif des blocs** permet aux opérateurs de faire fonctionner un nœud complet avec beaucoup moins d'espace disque (~11 Go pour un instantané élagué contre 300 Go pour un nœud Zebra complet).
- Un **mode de compatibilité RPC zcashd** permet aux portefeuilles et aux intégrations existants de fonctionner sans modification.
- Une **couche de transport P2P expérimentale** (désactivée par défaut) vise une propagation des blocs inférieure à 500 ms grâce à un protocole de diffusion résistant aux attaques DoS.
- Compatible avec **Ironwood (NU6.3)**, la mise à niveau du réseau Zcash activée à la mi-2026.
- **Zakura Common** (v1.3.0, août 2026) accélère la cryptographie qu'utilisent les portefeuilles pour construire des transactions privées : de plus de 3 secondes à moins de 200 ms dans de nombreux cas, selon les tests de performance de Zakura.
- Dirigé par **Sean Bowe** (cofondateur de Zcash, Project Tachyon) et **Dev Ojha** (Valar Group).

---

## Qu'est-ce que Zakura ?

Zakura est un nœud complet Zcash conçu dès le départ pour être prêt pour la production à grande échelle. Il partage la compatibilité de consensus de Zebra, ce qui signifie qu'il valide et suit les mêmes règles du protocole Zcash. Zakura apporte cependant d'importantes améliorations techniques destinées à rendre l'exploitation d'un nœud complet Zcash plus accessible.

Le projet est mené conjointement par **Project Tachyon** (dirigé par Sean Bowe, l'un des premiers ingénieurs en cryptographie de Zcash) et **Valar Group** (dirigé par Dev Ojha). Ensemble, ils travaillent sur les améliorations de nouvelle génération du protocole Zcash, et Zakura sert de nœud de référence pour ces travaux.

---

## Fonctionnalités principales

### Synchronisation de la chaîne 5 fois plus rapide

Zakura synchronise la blockchain environ 5 fois plus vite que Zebra. Il est donc beaucoup plus pratique pour les opérateurs qui doivent démarrer un nœud rapidement ou le remettre en service après une interruption.

### Amorçage à partir d'instantanés

Zakura publie des instantanés de la chaîne prêts à l'emploi, qui réduisent considérablement la durée de la synchronisation initiale :

| Méthode Bootstrap | Durée |
|-----------------|------|
| Instantané d'archive | environ 37 minutes |
| Instantané élagué | **Moins de 2 minutes** |
| Zebra (synchronisation complète) | environ 20 heures |

Les instantanés élagués pèsent environ **11 Go**. Le nœud s'amorce ainsi **680 fois plus vite** qu'en synchronisant depuis le bloc genèse.

### Élagage natif des blocs

Zakura prend en charge un élagage des blocs configurable : les opérateurs de nœuds définissent la quantité d'historique de la chaîne à conserver. Il devient ainsi possible de faire tourner un nœud complet sur du matériel au stockage limité, ce qui est utile aux validateurs, aux développeurs et aux fournisseurs d'infrastructure qui n'ont pas besoin de l'historique complet de la chaîne.

### Mode de compatibilité RPC zcashd

Zakura comprend un mode de compatibilité qui reproduit l'interface JSON-RPC historique de `zcashd`. Les portefeuilles, exchanges et intégrations existants qui s'appuient sur les RPC de `zcashd` peuvent passer à Zakura sans modifier leur code.

### Couche de transport P2P expérimentale

Zakura est livré avec une couche de transport pair-à-pair de nouvelle génération, actuellement **désactivée par défaut**. Une fois activée, elle vise :

- Une propagation des blocs sur le réseau en moins de 500 ms dans le pire des cas
- L'agrégation du mempool pour relayer les transactions plus efficacement
- Un protocole de diffusion résistant aux attaques DoS pour améliorer la résilience du réseau

Cette couche donne un aperçu des futures améliorations du réseau Zcash développées dans le cadre de Project Tachyon.

### Compatible avec Ironwood (NU6.3)

Zakura est entièrement compatible avec la mise à niveau du réseau Ironwood (NU6.3), activée sur le réseau principal Zcash mi-2026.

---

## Zakura Common : une cryptographie plus rapide pour les portefeuilles

En août 2026, l'équipe Zakura a publié Zakura Common, un ensemble de forks accélérés des bibliothèques cryptographiques sur lesquelles reposent les portefeuilles et les nœuds Zcash. Zakura est passé à cette nouvelle pile avec la version 1.3.0, et Vizor Wallet fait partie des premiers portefeuilles à l'intégrer.

![Paiement Zcash privé : vérification zk-SNARK 4 à 8 fois plus rapide, construction des transactions passant de plus de 3 secondes à moins de 200 ms, génération des preuves plus de 14 fois plus rapide sur mobile, hachage 21 fois plus rapide, déchiffrement d'essai 1.5 fois plus rapide, et bibliothèques open source ne nécessitant aucune mise à niveau du protocole](/content-images/zakuracommonspeedups.webp)

D'après les propres tests de performance de Zakura :

| Opération | Accélération |
|--|--|
| Génération de preuves sur mobile | plus de 14 fois (ordinateur : plus de 5 fois) |
| Hachage Sinsemilla | plus de 21 fois |
| Vérification zk-SNARK | 4 à 8 fois |
| Déchiffrement d'essai | plus de 1,5 fois |

Pour les utilisateurs, le changement le plus visible est le temps d'attente. Un portefeuille mettait auparavant plus de trois secondes à construire une transaction privée. Avec Zakura Common, cela peut souvent prendre moins de 200 ms. Il s'agit du temps que votre appareil passe à préparer la transaction, et non du temps nécessaire au réseau pour la confirmer.


---

## Comment Zakura se situe par rapport aux autres nœuds Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Langage | C++ (fork de Bitcoin) | Rust | Rust (fork de Zebra) |
| Statut | Obsolète | Actif | Actif (v1.0.0, juil. 2026) |
| Vitesse de synchronisation | Référence | environ 1 fois | environ 5 fois plus rapide |
| Élagage des blocs | Non | Non | Oui |
| Compatibilité RPC zcashd | Native | Partielle | Oui (mode de compatibilité) |
| Amorçage par instantané | Non | Non | Oui (moins de 2 min) |
| P2P expérimental | Non | Non | Oui (sur activation) |

---

## Bien démarrer

Les options de téléchargement, les instantanés et la documentation de configuration sont disponibles ici :

- **Téléchargement et guide d'installation :** [zakura.com/download](https://zakura.com/download/)
- **Instantanés de la chaîne :** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Code source :** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Pages connexes

- [Nœud complet Zebra](Zebra_Full_Node.md) : le nœud complet Zcash en amont, dont Zakura est issu
- [Indexeur Zaino](Zaino.md) : un indexeur basé sur Rust, compatible avec Zebra et Zakura
- [Nœuds complets](Full_Nodes.md) : présentation des options de nœuds complets Zcash
- [Nœuds pour portefeuilles légers](Lightwallet_Nodes.md) : alternatives sous forme de clients légers

## Ressources

- [Présentation de Zakura : annonce](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Site web de Zakura](https://zakura.com/)
- [Zakura sur X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Annonce de Zakura Common](https://zakura.com/announcements/zakura-common/)
