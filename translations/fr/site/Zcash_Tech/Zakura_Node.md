---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nœud Zakura

> 🇧🇷 [Version en portugais](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura est une implémentation gratuite et open source de nœud complet pour Zcash, conçue pour passer à l’échelle. Issue d’un fork de [Zebra](Zebra_Full_Node.md) et développée grâce à une collaboration entre **Valar Group** et **Project Tachyon**, Zakura offre une synchronisation nettement plus rapide, un élagage natif des blocs et une couche de compatibilité pour les outils historiques `zcashd`. La version 1.0.0 a été publiée le 15 juillet 2026.

---

## TL;DR

- Zakura est un **nœud complet Zcash compatible avec le consensus** — une alternative à Zebra et zcashd, issue d’un fork de Zebra.
- La synchronisation de la blockchain est environ **5× plus rapide que Zebra** ; l’initialisation via snapshot se termine en **moins de 2 minutes**.
- L’**élagage natif des blocs** permet aux opérateurs d’exécuter un nœud complet avec beaucoup moins d’espace disque (~11 Go pour un snapshot élagué contre 300 Go pour un nœud Zebra complet).
- Un **mode de compatibilité RPC zcashd** permet aux portefeuilles et intégrations existants de fonctionner sans modification.
- Une **couche de transport P2P expérimentale** (désactivée par défaut) vise une propagation des blocs en moins de 500 ms avec un protocole de gossip résistant aux attaques DoS.
- Compatible avec **Ironwood (NU6.3)**, la mise à niveau du réseau Zcash activée à la mi-2026.
- Dirigé par **Sean Bowe** (cofondateur de Zcash, Project Tachyon) et **Dev Ojha** (Valar Group).

---

## Qu’est-ce que Zakura ?

Zakura est un nœud complet Zcash conçu dès le départ pour être prêt pour la production à grande échelle. Bien qu’il partage la compatibilité de consensus avec Zebra — ce qui signifie qu’il valide et suit les mêmes règles du protocole Zcash — Zakura introduit d’importantes améliorations d’ingénierie visant à réduire la barrière à l’exécution d’un nœud complet Zcash.

Le projet est un effort conjoint entre **Project Tachyon** (dirigé par Sean Bowe, l’un des ingénieurs cryptographes originels de Zcash) et **Valar Group** (dirigé par Dev Ojha). Ensemble, ils se concentrent sur les améliorations de nouvelle génération du protocole Zcash, et Zakura sert de nœud de référence pour ce travail.

---

## Fonctionnalités clés

### Synchronisation de la chaîne 5× plus rapide

Zakura atteint une synchronisation de la blockchain environ 5× plus rapide que Zebra. Cela le rend nettement plus pratique pour les opérateurs qui doivent lancer un nœud rapidement ou se remettre d’une interruption.

### Initialisation par snapshot

Zakura publie des snapshots préconstruits de la chaîne qui réduisent considérablement le temps de synchronisation initiale :

| Méthode d’initialisation | Temps |
|-----------------|------|
| Snapshot d’archive | ~37 minutes |
| Snapshot élagué | **Moins de 2 minutes** |
| Zebra (synchronisation complète) | ~20 heures |

Les snapshots élagués font environ **11 Go**, ce qui permet une initialisation de nœud **680× plus rapide** par rapport à une synchronisation depuis le genesis.

### Élagage natif des blocs

Zakura prend en charge l’élagage configurable des blocs, permettant aux opérateurs de nœuds de définir la quantité d’historique de chaîne à conserver. Cela rend pratique l’exécution d’un nœud complet sur du matériel avec un stockage limité — utile pour les validateurs, les développeurs et les fournisseurs d’infrastructure qui n’ont pas besoin de l’historique complet de la chaîne.

### Mode de compatibilité RPC zcashd

Zakura inclut un mode de compatibilité qui reproduit l’interface JSON-RPC historique de `zcashd`. Les portefeuilles, exchanges et intégrations existants qui dépendent des RPC `zcashd` peuvent passer à Zakura sans nécessiter de modifications de code.

### Couche de transport P2P expérimentale

Zakura est livré avec une couche de transport peer-to-peer de nouvelle génération, actuellement **désactivée par défaut**. Lorsqu’elle est activée, elle vise :

- Une propagation des blocs en moins de 500 ms dans le pire des cas à travers le réseau
- L’agrégation du mempool pour un relais des transactions plus efficace
- Un protocole de gossip résistant aux attaques DoS afin d’améliorer la résilience du réseau

Cette couche représente un aperçu des futures améliorations au niveau du réseau Zcash développées dans le cadre de Project Tachyon.

### Compatible avec Ironwood (NU6.3)

Zakura est entièrement compatible avec la mise à niveau du réseau Ironwood (NU6.3), activée sur le mainnet Zcash à la mi-2026.

---

## Comment Zakura se compare aux autres nœuds Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Langage | C++ (fork de Bitcoin) | Rust | Rust (fork de Zebra) |
| Statut | Obsolète | Actif | Actif (v1.0.0, juil. 2026) |
| Vitesse de synchronisation | Référence | ~1× | ~5× plus rapide |
| Élagage des blocs | Non | Non | Oui |
| Compatibilité RPC zcashd | Native | Partielle | Oui (mode compatibilité) |
| Initialisation par snapshot | Non | Non | Oui (<2 min) |
| P2P expérimental | Non | Non | Oui (opt-in) |

---

## Premiers pas

Les options de téléchargement, les snapshots et la documentation de configuration sont disponibles à l’adresse suivante :

- **Guide de téléchargement et de configuration :** [zakura.com/download](https://zakura.com/download/)
- **Snapshots de chaîne :** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Code source :** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Pages associées

- [Nœud complet Zebra](Zebra_Full_Node.md) — le nœud complet Zcash en amont dont Zakura est issu
- [Indexeur Zaino](Zaino.md) — un indexeur basé sur Rust compatible avec Zebra et Zakura
- [Nœuds complets](Full_Nodes.md) — aperçu des options de nœuds complets Zcash
- [Nœuds Lightwallet](Lightwallet_Nodes.md) — alternatives de clients légers

## Ressources

- [Présentation de Zakura — annonce](https://zakura.com/announcements/introducing-zakura/)
- [GitHub de Zakura](https://github.com/zakura-core/zakura)
- [Site web de Zakura](https://zakura.com/)
- [Zakura sur X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
