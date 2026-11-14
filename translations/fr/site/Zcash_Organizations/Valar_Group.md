<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Visiter le site web](https://valargroup.dev/)

<img width="200" height="200" alt="254678133" src="/content-images/0dc8c697-bcad-492a-b024-89b502d27af4-4c0d4552c2.webp" />


## Déclaration de mission

Valar Group est une organisation d’ingénierie indépendante qui se consacre à la mise à l’échelle de Zcash, au renforcement de la gouvernance par les détenteurs de pièces et à l’amélioration de la confidentialité, des performances et de la résilience à long terme du protocole.

Ses travaux portent sur l’infrastructure au niveau du protocole : le vote privé des détenteurs de jetons, un logiciel de nœud complet à hautes performances, une technologie de synchronisation des portefeuilles et des mises à niveau du réseau qui rendent les Zcash protégés plus utilisables à grande échelle.

L’organisation vise à offrir aux détenteurs de ZEC un moyen d’exprimer leurs préférences de manière privée, à fournir aux opérateurs de nœuds un logiciel plus rapide et plus performant, et à donner aux portefeuilles des outils qui préservent la confidentialité des utilisateurs tout en réduisant le coût de participation au réseau.

## Contexte

Valar Group est dirigée par Dev Ojha (ValarDragon), cofondateur d’Osmosis et membre de l’équipe qui a lancé Cosmos. Au cours de la dernière décennie, il a travaillé sur zk-SNARKs, le consensus BFT et des systèmes DeFi en production.

Les travaux publics du groupe dans Zcash ont pris de l’importance lorsque l’écosystème s’est orienté vers des équipes de protocole indépendantes après la réorganisation du développement principal en 2026. Valar Group s’est imposée comme l’une des organisations qui construisent la prochaine génération de l’infrastructure de Zcash, aux côtés de Project Tachyon, Shielded Labs, ZODL et de la Zcash Foundation.

Un thème récurrent de ses travaux est que les propriétés de confidentialité de Zcash devraient s’étendre au-delà des paiements. Si l’on demande aux détenteurs de voter sur l’émission, les temps de bloc ou la portée d’une mise à niveau du réseau, ils devraient pouvoir le faire à partir de soldes protégés sans révéler leur identité, leurs soldes ni leurs votes individuels. Cette exigence a conduit Valar Group à concevoir et à déployer une chaîne dédiée au vote des détenteurs de pièces.

Ce même bagage en mise à l’échelle et en cryptographie a également façonné ses travaux sur les nœuds et la synchronisation. Des blocs plus rapides, une synchronisation des portefeuilles plus légère et un nœud complet plus performant sont considérés comme des prérequis pour une monnaie privée utilisable à l’échelle d’un réseau de paiement, et pas seulement comme réserve de valeur.

## Vision

Les documents publics et les projets de Valar Group dessinent un réseau Zcash capable de :

- Permettre un vote privé et vérifiable des détenteurs de pièces en tant que processus de gouvernance reproductible.
- Assurer la mise à l’échelle des paiements en preuve de travail sans sacrifier la confidentialité protégée.
- Réduire les goulets d’étranglement des portefeuilles et des nœuds grâce au PIR, à l’élagage et à une propagation plus rapide des blocs.
- Accroître la diversité des implémentations en livrant une pile de nœud complet indépendante.
- Contribuer à la préparation post-quantique et à des mises à niveau du protocole formellement examinées.

L’organisation agit en tant que contributeur indépendant, et non en tant que propriétaire du protocole. Les modifications du protocole passent toujours par les ZIP, l’implémentation, la revue et l’expression des préférences de la communauté. Le rôle de Valar Group est de concevoir, d’implémenter, d’exploiter et de publier en open source les systèmes qui rendent ces processus réalisables.

## Domaines stratégiques

Les travaux de Valar Group s’articulent autour de quatre domaines.

### Gouvernance privée par les détenteurs de pièces

Zcash n’utilise pas de contrôle automatique et on-chain du protocole. Les sondages des détenteurs de pièces sont des signaux consultatifs qui alimentent un processus plus large de consensus approximatif. Valar Group a construit la Tokenholder Voting Chain afin que ces signaux puissent être recueillis à partir de soldes protégés sans exposer l’identité des votants ni le poids de chaque vote.

La conception actuelle utilise :

- Une chaîne applicative dédiée basée sur le SDK Cosmos pour orchestrer les tours de vote.
- Des preuves d’instantané portant sur des notes Ironwood dépensables.
- Le chiffrement homomorphe des montants de vote.
- La récupération d’informations privée (PIR) pour les preuves de non-appartenance des nullifiers.
- Un multisig de coordination et une autorité électorale distribuée.

L’objectif est de remplacer les anciens processus de vote des détenteurs de jetons par un système réutilisable, audité et intégrable aux portefeuilles, que d’autres organisations peuvent exploiter et dont elles peuvent dépouiller les résultats de manière indépendante.

### Logiciel de nœud et mise à l’échelle du réseau

Valar Group collabore avec Project Tachyon sur Zakura, un nœud complet Zcash construit à partir du code de Zebra. Zakura se positionne comme un nœud à hautes performances destiné aux opérateurs qui ont besoin d’une synchronisation initiale plus rapide, de l’élagage, d’un amorçage par instantané et d’une voie de compatibilité pour les anciens utilisateurs de `zcashd`.

Les travaux de mise à l’échelle connexes comprennent :

- Des temps de bloc cibles plus courts, notamment des expérimentations de blocs de 25 secondes sur les testnets de NU7.
- Une propagation pair à pair des blocs améliorée.
- Des fonctionnalités de nœud complet destinées à garder Zcash utilisable à mesure que l’activité protégée augmente.

### Infrastructure des portefeuilles et de la synchronisation

Les portefeuilles protégés doivent historiquement analyser de grandes quantités de données de la chaîne. Valar Group développe des systèmes PIR afin que les portefeuilles puissent récupérer les preuves dont ils ont besoin sans télécharger l’ensemble complet des nullifiers ni révéler quelles notes les intéressent.

Ces travaux apparaissent à la fois dans la pile de vote et dans des recherches plus larges sur la synchronisation des portefeuilles. Le groupe a également contribué à la fiabilité côté portefeuille, notamment avec la soumission de transactions vers plusieurs serveurs et des améliorations de la sélection des serveurs utilisées dans la pile mobile de ZODL.

### Mises à niveau du protocole et coordination de l’écosystème

Valar Group a été l’une des organisations à s’engager publiquement dans la réponse Ironwood après la vulnérabilité du circuit Orchard. Ironwood a introduit un nouveau pool protégé, a scellé le pool Orchard d’origine derrière un sas comptable et a rétabli un moyen de vérifier de manière indépendante l’offre en circulation. Valar Group a travaillé avec Project Tachyon, Shielded Labs, ZODL et la Zcash Foundation sur l’architecture, l’implémentation des règles de consensus et la coordination de l’écosystème.

Le groupe participe également à la définition de la portée de NU7, à l’exploitation des testnets et à l’édition des ZIP. Dev Ojha figure parmi les éditeurs des ZIP.

## Initiatives en cours

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote est le protocole de gouvernance privée de Valar Group pour Zcash. Les détenteurs votent avec des soldes protégés sans révéler les montants individuels ni relier les votes à des identités.

Ses principales propriétés sont les suivantes :

- Une seule session en ligne pour voter, au lieu d’un processus d’engagement/révélation s’étalant sur plusieurs jours.
- Une signature d’instantané compatible avec Keystone qui délègue les droits de vote à une clé chaude sans mettre les fonds en danger.
- Des montants de vote chiffrés à l’aide d’ElGamal homomorphe.
- Des requêtes PIR afin que les nullifiers ne soient pas divulgués lors des preuves d’instantané.
- Le fractionnement des votes et une soumission différée par relais pour réduire la corrélation temporelle.
- Des dépouillements vérifiables publiquement.

En août 2026, Valar Group et Project Tachyon ont utilisé cette pile pour le vote des détenteurs de pièces sur NU7. Pour être éligible, il fallait détenir des ZEC protégés dépensables dans Ironwood à la hauteur 3 459 350 du mainnet. Le vote s’est déroulé du 25 août au 14 septembre 2026, avec un seuil de participation de 1 000 000 ZEC pour que le résultat soit considéré comme représentatif. Les questions portaient sur le lissage de l’émission NSM, le calendrier de réémission, la dépréciation de Sprout/v4, les temps de bloc de 25 secondes ainsi que la portée et l’état de préparation de NU7.

La coordination de la chaîne par défaut repose sur un multisig 2 sur 5 réunissant Project Tachyon, Valar Group, la Zcash Foundation, ZODL et Shielded Labs. Un ensemble distinct de validateurs détient les parts de clé de déchiffrement propres à chaque tour. Aucun validateur ne peut à lui seul retrouver les votes individuels ; un seuil de validateurs est nécessaire pour produire le dépouillement final.

Les interfaces publiques destinées aux opérateurs et aux auditeurs comprennent :

- [Configuration de la chaîne de vote](https://setup.valargroup.org)
- [Auditeur du dépouillement](https://tally.valargroup.org)
- [Interface de coordination](https://svote.valargroup.org/)
- [Configuration du serveur PIR](https://setup-pir.valargroup.org)
- [Documentation de Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura est un nœud complet Zcash développé en collaboration entre Valar Group et Project Tachyon. Il est dérivé de Zebra et y ajoute une synchronisation plus rapide, l’élagage natif, l’amorçage par instantané, des voies de compatibilité avec `zcashd` et des travaux expérimentaux sur un P2P à hautes performances.

La Zcash Foundation a publiquement salué le projet, en soulignant que Zebra avait été publié sous des licences permissives afin que des équipes indépendantes puissent le forker et l’améliorer, et que plusieurs contributeurs de Zakura avaient déjà contribué en amont à Zebra.

### Récupération d’informations privée

Valar Group maintient des services et des bibliothèques PIR pour deux problèmes liés :

- Prouver qu’une note n’était pas dépensée à une hauteur d’instantané donnée sans révéler son nullifier.
- Réduire la quantité de données que les portefeuilles doivent récupérer pour se synchroniser ou voter.

Il s’agit d’une dépendance essentielle de Shielded Vote et d’une brique de base pour une expérience utilisateur plus rapide des portefeuilles privés.

### Ingénierie Ironwood et NU7

Valar Group a pris part à l’engagement commun de juin 2026 en faveur de Ironwood et a contribué à l’implémentation des règles de consensus et aux travaux sur les clients autour du nouveau pool. Elle a également exploité l’infrastructure du testnet NU7, notamment des scripts pour le rejoindre et des nœuds publics hébergés sous `nu7.valargroup.dev`.

### Bibliothèques de protocole open source

L’organisation `valargroup` sur GitHub publie la pile de vote et de nœud sous forme de dépôts publics, notamment :

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — chaîne applicative dédiée au vote privé on-chain
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — bibliothèque côté client pour le vote protégé, les preuves, le stockage et le FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — circuits Halo2 de délégation et de vote
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR pour les preuves de non-appartenance des nullifiers
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — configuration de la découverte de services pour les portefeuilles
- [`zebra`](https://github.com/valargroup/zebra) — fork de développement Zebra/Zakura de Valar Group

## Les équipes

Valar Group est dirigée par **Dev Ojha** (ValarDragon). Les pages d’équipe publiques associées à Zakura mentionnent les ingénieurs affiliés à Valar suivants :

- **Dev Ojha** — Mainteneur ; dirige Valar Group. Ses domaines de prédilection comprennent le vote des détenteurs de jetons, les travaux post-quantiques, Zakura et le PIR.
- **Roman Akhtariev** — Ingénieur principal. Auparavant ingénieur principal chez Osmosis ; ses travaux portent notamment sur la synchronisation des portefeuilles par PIR, le vote des détenteurs de jetons et les performances de synchronisation de Zakura.
- **Evan Forbes** — Ingénieur principal. Ancien responsable du consensus et ingénieur fondateur de Celestia ; ses travaux portent notamment sur la préparation à des temps de bloc plus courts et sur une pile P2P QUIC.
- **Adam Tucker** — Ingénieur principal. Ancien ingénieur d’Osmosis ; ses travaux portent notamment sur le vote des détenteurs de jetons avec Roman Akhtariev, la fiabilité des portefeuilles et l’intégration de Ironwood dans l’ensemble de la pile.

Zakura lui-même est maintenu conjointement avec Project Tachyon, dirigé par Sean Bowe. Les deux organisations collaborent étroitement mais restent distinctes.

## Structure organisationnelle

Valar Group fonctionne comme une organisation d’ingénierie indépendante. Elle ne fait partie ni de la Zcash Foundation, ni de ZODL, ni de Shielded Labs, ni de Zcash Community Grants.

Dans la conception de la chaîne de vote, Valar Group est l’une des cinq organisations coordinatrices. Ce rôle est un paramètre du système de vote, et non la revendication d’un contrôle exclusif sur la gouvernance de Zcash. D’autres équipes peuvent exploiter des validateurs, mettre en place des chaînes de vote alternatives ou auditer les dépouillements publiés à l’aide des outils publics.

Les informations complémentaires sur la forme juridique, la composition du conseil d’administration et la gouvernance interne n’ont pas été publiées avec le même niveau de détail que pour les organisations plus anciennes de Zcash.

## Financement

Des déclarations publiques sur le forum datant de la mi-2026 indiquent que Valar Group et Project Tachyon sont financés par des dons privés. Contrairement au tour de financement en capital-risque divulgué par ZODL ou aux annonces publiques de dons de Shielded Labs, Valar Group n’a pas publié de liste détaillée de donateurs ni de calendrier de subventions.

Ce modèle de financement maintient l’équipe indépendante du mécanisme historique du Development Fund et de la récompense de bloc, mais il implique également une moindre visibilité publique sur la taille du budget et les sources de financement.

## Rôle dans l’écosystème Zcash

Valar Group est l’une des organisations de protocole indépendantes qui se sont formées dans le paysage du développement de Zcash en 2026. Dans ce paysage :

- La **Zcash Foundation** poursuit son rôle d’intendance communautaire et Zebra.
- **ZODL** se concentre sur le produit portefeuille et la continuité du protocole après la scission de ECC.
- **Shielded Labs** se concentre sur la durabilité, la sécurité et la recherche sur le consensus.
- **Project Tachyon** se concentre sur la récursion, la vérification formelle et la mise à l’échelle à long terme.
- **Valar Group** se concentre sur le vote privé des détenteurs de pièces, les performances des nœuds, le PIR et l’ingénierie nécessaire pour exploiter ces systèmes en production.

Sa contribution distinctive consiste à rendre la gouvernance protégée opérationnelle. Le vote sur NU7 est la première utilisation majeure de cette pile : les détenteurs prouvent leurs soldes Ironwood, des portefeuilles tels que ZODL et Vizor peuvent intégrer le processus, et n’importe qui peut auditer le dépouillement sans apprendre comment un détenteur donné a voté.

Les travaux de la même équipe sur les nœuds et la synchronisation visent à soutenir l’autre moitié de ce tableau. Le vote privé perd de son utilité si les portefeuilles ne peuvent pas se synchroniser, si les nœuds ne peuvent pas suivre ou si les mises à niveau ne peuvent pas être implémentées rapidement. Valar Group traite la gouvernance, le logiciel de nœud et l’infrastructure des portefeuilles comme un seul et même problème : rendre Zcash privé utilisable à grande échelle sans concentrer le pouvoir opérationnel au sein d’une seule organisation.

## Ressources

- [Site web de Valar Group](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Documentation de Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)
- [Configuration de la chaîne de vote](https://setup.valargroup.org)
- [Auditeur du dépouillement](https://tally.valargroup.org)
- [Interface de coordination](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura : à propos / équipe](https://zakura.com/about/)
- [Fil du forum sur le vote des détenteurs de pièces NU7](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Fil du forum sur la Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
