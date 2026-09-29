<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nœud Zakura

> 🇧🇷 [Version en portugais](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura est une implémentation de nœud complet gratuite et open source pour Zcash, conçue pour passer à l’échelle. Forkée depuis [Zebra](Zebra_Full_Node.md) et développée grâce à une collaboration entre **Valar Group** et **Project Tachyon**, Zakura offre une synchronisation considérablement plus rapide, un élagage natif des blocs et une couche de compatibilité pour les outils historiques de `zcashd`. La version 1.0.0 est sortie le 15 juillet 2026.

---

## En bref

- Zakura est un **nœud complet Zcash compatible avec le consensus** — une alternative à Zebra et zcashd, forkée depuis Zebra.
- La synchronisation de la blockchain est environ **5× plus rapide que Zebra** ; l’amorçage à partir d’un instantané s’effectue en **moins de 2 minutes**.
- L’**élagage natif des blocs** permet aux opérateurs d’exécuter un nœud complet avec considérablement moins d’espace disque (~11 Go pour un instantané élagué contre 300 Go pour un nœud Zebra complet).
- Un **mode de compatibilité RPC zcashd** permet aux portefeuilles et intégrations existants de fonctionner sans modification.
- Une **couche de transport P2P expérimentale** (désactivée par défaut) vise une propagation des blocs en moins de 500 ms avec un gossip résistant aux DoS.
- Compatible avec **Ironwood (NU6.3)**, la mise à niveau du réseau Zcash activée à la mi-2026.
- **Zakura Common** (v1.3.0, août 2026) accélère la cryptographie utilisée par les portefeuilles pour créer des transactions privées : dans de nombreux cas, elle passe de plus de 3 secondes à moins de 200 ms, selon les benchmarks de Zakura.
- Dirigé par **Sean Bowe** (cofondateur de Zcash, Project Tachyon) et **Dev Ojha** (Valar Group).

---

## Qu’est-ce que Zakura ?

Zakura est un nœud complet Zcash conçu dès le départ pour être prêt pour la production à grande échelle. Bien qu’il partage la compatibilité de consensus avec Zebra — ce qui signifie qu’il valide et suit les mêmes règles du protocole Zcash — Zakura apporte d’importantes améliorations d’ingénierie visant à réduire les obstacles à l’exécution d’un nœud complet Zcash.

Le projet est un effort conjoint de **Project Tachyon** (dirigé par Sean Bowe, l’un des ingénieurs cryptographes originels de Zcash) et de **Valar Group** (dirigé par Dev Ojha). Ensemble, ils se concentrent sur les améliorations de nouvelle génération du protocole Zcash, et Zakura sert de nœud de référence pour ce travail.

---

## Fonctionnalités clés

### Synchronisation de la chaîne 5× plus rapide

Zakura atteint une synchronisation de la blockchain environ 5× plus rapide que Zebra. Cela le rend beaucoup plus pratique pour les opérateurs qui doivent démarrer rapidement un nœud ou se remettre d’une interruption de service.

### Amorçage à partir d’instantanés

Zakura publie des instantanés préconstruits de la chaîne qui réduisent considérablement le temps de synchronisation initial :

| Méthode d’amorçage | Temps |
|-----------------|------|
| Instantané d’archive | ~37 minutes |
| Instantané élagué | **Moins de 2 minutes** |
| Zebra (synchronisation complète) | ~20 heures |

Les instantanés élagués font environ **11 Go**, permettant un amorçage de nœud **680× plus rapide** que la synchronisation depuis le bloc de genèse.

### Élagage natif des blocs

Zakura prend en charge l’élagage configurable des blocs, permettant aux opérateurs de nœuds de définir la quantité d’historique de la chaîne à conserver. Il devient ainsi pratique d’exécuter un nœud complet sur du matériel avec un stockage limité — utile pour les validateurs, développeurs et fournisseurs d’infrastructure qui n’ont pas besoin de l’intégralité de l’historique de la chaîne.

### Mode de compatibilité RPC zcashd

Zakura comprend un mode de compatibilité qui reproduit l’interface JSON-RPC historique de `zcashd`. Les portefeuilles, plateformes d’échange et intégrations existants qui s’appuient sur les RPC de `zcashd` peuvent passer à Zakura sans nécessiter de modifications du code.

### Couche de transport P2P expérimentale

Zakura est fourni avec une couche de transport pair-à-pair de nouvelle génération, actuellement **désactivée par défaut**. Lorsqu’elle est activée, elle vise :

- Une propagation des blocs dans le pire des cas en moins de 500 ms à travers le réseau
- L’agrégation du mempool pour un relais des transactions plus efficace
- Un protocole de gossip résistant aux DoS afin d’améliorer la résilience du réseau

Cette couche offre un aperçu des futures améliorations au niveau du réseau Zcash développées dans le cadre de Project Tachyon.

### Compatible avec Ironwood (NU6.3)

Zakura est entièrement compatible avec la mise à niveau du réseau Ironwood (NU6.3), activée sur le mainnet Zcash à la mi-2026.

---

## Zakura Common : cryptographie de portefeuille plus rapide

En août 2026, l’équipe Zakura a publié Zakura Common, un ensemble de forks accélérés des bibliothèques cryptographiques sur lesquelles s’appuient les portefeuilles et nœuds Zcash. Zakura est passé à cette nouvelle pile dans la version 1.3.0, et Vizor Wallet figure parmi les premiers portefeuilles à l’intégrer.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Selon les propres benchmarks de Zakura :

| Opération | Accélération |
|--|--|
| Génération de preuves sur mobile | plus de 14× (ordinateur : plus de 5×) |
| Hachage Sinsemilla | plus de 21× |
| Vérification zk-SNARK | 4–8× |
| Déchiffrement d’essai | plus de 1,5× |

Pour les utilisateurs, le changement le plus visible est le temps d’attente. La création d’une transaction privée prenait auparavant plus de trois secondes à un portefeuille. Avec Zakura Common, elle peut prendre moins de 200 ms dans de nombreux cas. Il s’agit du temps que votre appareil consacre à préparer la transaction, et non du temps nécessaire au réseau pour la confirmer.


---

## Comment Zakura se compare aux autres nœuds Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Langage | C++ (forké depuis Bitcoin) | Rust | Rust (forké depuis Zebra) |
| Statut | Obsolète | Actif | Actif (v1.0.0, juil. 2026) |
| Vitesse de synchronisation | Référence | ~1× | ~5× plus rapide |
| Élagage des blocs | Non | Non | Oui |
| Compatibilité RPC zcashd | Native | Partielle | Oui (mode de compatibilité) |
| Amorçage par instantané | Non | Non | Oui (moins de 2 min) |
| P2P expérimental | Non | Non | Oui (optionnel) |

---

## Premiers pas

Les options de téléchargement, les instantanés et la documentation de configuration sont disponibles à l’adresse :

- **Guide de téléchargement et de configuration :** [zakura.com/download](https://zakura.com/download/)
- **Instantanés de la chaîne :** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Code source :** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Pages associées

- [Nœud complet Zebra](Zebra_Full_Node.md) — le nœud complet Zcash en amont depuis lequel Zakura a été forké
- [Indexeur Zaino](Zaino.md) — un indexeur basé sur Rust compatible avec Zebra et Zakura
- [Nœuds complets](Full_Nodes.md) — aperçu des options de nœuds complets Zcash
- [Nœuds Lightwallet](Lightwallet_Nodes.md) — alternatives légères pour les clients

## Ressources

- [Présentation de Zakura — annonce](https://zakura.com/announcements/introducing-zakura/)
- [GitHub de Zakura](https://github.com/zakura-core/zakura)
- [Site web de Zakura](https://zakura.com/)
- [Zakura sur X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Annonce de Zakura Common](https://zakura.com/announcements/zakura-common/)
