<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Visiter le site web](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## Déclaration de mission

Valar Group est une organisation d’ingénierie indépendante axée sur le passage à l’échelle de Zcash, le renforcement de la gouvernance des détenteurs de monnaies et l’amélioration de la confidentialité, des performances et de la résilience à long terme du protocole.

Son travail se concentre sur l’infrastructure au niveau du protocole : le vote privé des détenteurs de jetons, les logiciels de nœud complet haute performance, la technologie de synchronisation de wallet et les mises à niveau du réseau qui rendent Zcash blindé plus utilisable à grande échelle.

L’organisation vise à donner aux détenteurs de ZEC un moyen d’exprimer leurs préférences de manière privée, aux opérateurs de nœuds des logiciels plus rapides et plus performants, et aux wallets des outils qui préservent la confidentialité des utilisateurs tout en réduisant le coût de participation au réseau.

## Contexte

Valar Group est dirigé par Dev Ojha (ValarDragon), cofondateur d’Osmosis et membre de l’équipe qui a lancé Cosmos. Au cours de la dernière décennie, il a travaillé sur les zk-SNARKs, le consensus BFT et des systèmes DeFi en production.

Le travail public du groupe dans Zcash a gagné en importance à mesure que l’écosystème s’est orienté vers des équipes de protocole indépendantes après la réorganisation de 2026 du développement central. Valar Group est devenue l’une des organisations construisant la prochaine génération d’infrastructure Zcash aux côtés de Project Tachyon, Shielded Labs, ZODL et de la Zcash Foundation.

Un thème récurrent de son travail est que les propriétés de confidentialité de Zcash devraient s’étendre au-delà des paiements. Si les détenteurs sont invités à voter sur l’émission, les temps de bloc ou le périmètre des mises à niveau du réseau, ils devraient pouvoir le faire à partir de soldes blindés sans révéler leur identité, leurs soldes ni leurs votes individuels. Cette exigence a conduit Valar Group à concevoir et déployer une chaîne de vote dédiée aux détenteurs de monnaies.

Le même historique en matière de passage à l’échelle et de cryptographie a également façonné son travail sur les nœuds et la synchronisation. Des blocs plus rapides, une synchronisation de wallet plus légère et un nœud complet plus performant sont considérés comme des prérequis pour une monnaie privée pouvant être utilisée à l’échelle d’un réseau de paiement plutôt que seulement comme réserve de valeur.

## Vision

Les documents publics et les projets de Valar Group pointent vers un réseau Zcash capable de :

- Prendre en charge un vote privé et vérifiable des détenteurs de monnaies comme processus de gouvernance reproductible.
- Faire évoluer les paiements par preuve de travail sans sacrifier la confidentialité blindée.
- Réduire les goulots d’étranglement des wallets et des nœuds grâce au PIR, à l’élagage et à une propagation des blocs plus rapide.
- Accroître la diversité des implémentations en proposant une pile de nœud complet indépendante.
- Contribuer à la préparation post-quantique et à des mises à niveau du protocole examinées formellement.

L’organisation travaille comme contributeur indépendant, et non comme propriétaire du protocole. Les modifications du protocole passent toujours par les ZIP, l’implémentation, la revue et la signalisation communautaire. Le rôle de Valar Group est de concevoir, implémenter, exploiter et publier en open source les systèmes qui rendent ces processus pratiques.

## Domaines stratégiques

Le travail de Valar Group se regroupe autour de quatre domaines.

### Gouvernance privée des détenteurs de monnaies

Zcash n’utilise pas de contrôle automatique du protocole on-chain. Les sondages auprès des détenteurs de monnaies sont des signaux consultatifs qui alimentent un processus plus large de consensus approximatif. Valar Group a construit la Tokenholder Voting Chain afin que ces signaux puissent être collectés à partir de soldes blindés sans exposer l’identité des votants ni la taille des votes individuels.

La conception actuelle utilise :

- Une chaîne d’application Cosmos SDK dédiée pour orchestrer les cycles de vote.
- Des preuves d’instantané contre des notes Ironwood dépensables.
- Le chiffrement homomorphe des montants de vote.
- La récupération privée d’informations pour les preuves de non-appartenance des nullifiers.
- Une multisig de coordinateurs et une autorité électorale distribuée.

L’objectif est de remplacer les processus antérieurs de vote des détenteurs de jetons par un système réutilisable, audité et intégrable aux wallets, que d’autres organisations peuvent exploiter et comptabiliser indépendamment.

### Logiciel de nœud et passage à l’échelle du réseau

Valar Group collabore avec Project Tachyon sur Zakura, un nœud complet Zcash construit à partir de la base de code Zebra. Zakura est positionné comme un nœud haute performance pour les opérateurs ayant besoin d’une synchronisation initiale plus rapide, de l’élagage, d’un démarrage à partir d’instantanés et d’un chemin de compatibilité pour les anciens utilisateurs de `zcashd`.

Les travaux de passage à l’échelle associés comprennent :

- Des temps de bloc cibles plus rapides, y compris des expérimentations de blocs de 25 secondes sur les testnets NU7.
- Une propagation de blocs pair-à-pair améliorée.
- Des fonctionnalités de nœud complet destinées à maintenir Zcash utilisable à mesure que l’activité blindée augmente.

### Infrastructure de wallet et de synchronisation

Les wallets blindés doivent historiquement analyser de grandes quantités de données de chaîne. Valar Group développe des systèmes PIR afin que les wallets puissent récupérer les preuves dont ils ont besoin sans télécharger l’ensemble des nullifiers ni révéler les notes qui les intéressent.

Ce travail apparaît à la fois dans la pile de vote et dans des recherches plus larges sur la synchronisation de wallets. Le groupe a également contribué à des travaux sur la fiabilité côté wallet, notamment la soumission de transactions via plusieurs serveurs et des améliorations de sélection des serveurs utilisées dans la pile mobile de ZODL.

### Mises à niveau du protocole et coordination de l’écosystème

Valar Group faisait partie des organisations qui se sont publiquement engagées dans la réponse Ironwood après la vulnérabilité du circuit Orchard. Ironwood a introduit un nouveau pool blindé, a scellé le pool Orchard original derrière un tourniquet et a rétabli une voie permettant de vérifier indépendamment l’offre en circulation. Valar Group a travaillé avec Project Tachyon, Shielded Labs, ZODL et la Zcash Foundation sur l’architecture, l’implémentation des règles de consensus et la coordination de l’écosystème.

Le groupe participe également à la définition du périmètre de NU7, à l’exploitation de testnets et à l’édition de ZIP. Dev Ojha est répertorié comme éditeur de ZIP.

## Initiatives actuelles

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote est le protocole de gouvernance privée de Valar Group pour Zcash. Les détenteurs votent avec des soldes blindés sans révéler les montants individuels ni relier les votes à des identités.

Ses principales propriétés comprennent :

- Une seule session en ligne pour voter, plutôt qu’un processus commit/reveal de plusieurs jours.
- Une signature d’instantané compatible Keystone qui délègue les droits de vote à une hotkey sans mettre les fonds en danger.
- Des montants de vote chiffrés à l’aide d’ElGamal homomorphe.
- Des requêtes PIR afin que les nullifiers ne soient pas divulgués lors des preuves d’instantané.
- Le fractionnement des votes et la soumission de relais différée afin de réduire la corrélation temporelle.
- Des décomptes vérifiables publiquement.

En août 2026, Valar Group et Project Tachyon ont utilisé cette pile pour le vote des détenteurs de monnaies sur NU7. L’éligibilité exigeait des ZEC blindés dépensables dans Ironwood à la hauteur 3 459 350 du mainnet. Le vote s’est déroulé du 25 août au 14 septembre 2026, avec un seuil de participation de 1 000 000 ZEC pour que le résultat soit considéré comme représentatif. Les questions portaient sur le lissage de l’émission NSM, le calendrier de réémission, l’abandon de Sprout/v4, les temps de bloc de 25 secondes et le périmètre/la préparation de NU7.

La coordination de la chaîne par défaut utilise une multisig 2-sur-5 réunissant Project Tachyon, Valar Group, la Zcash Foundation, ZODL et Shielded Labs. Un ensemble distinct de validateurs détient les parts de clés de déchiffrement de chaque cycle. Aucun validateur unique ne peut récupérer les votes individuels ; un seuil de validateurs est nécessaire pour produire le décompte final.

Les interfaces publiques destinées aux opérateurs et aux auditeurs comprennent :

- [Configuration de la chaîne de vote](https://setup.valargroup.org)
- [Auditeur de décompte](https://tally.valargroup.org)
- [Interface des coordinateurs](https://svote.valargroup.org/)
- [Configuration du serveur PIR](https://setup-pir.valargroup.org)
- [Documentation Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura est un nœud complet Zcash développé en collaboration entre Valar Group et Project Tachyon. Il est dérivé de Zebra et ajoute une synchronisation plus rapide, un élagage natif, un démarrage à partir d’instantanés, des chemins de compatibilité avec `zcashd` et des travaux P2P haute performance expérimentaux.

La Zcash Foundation a publiquement salué le projet, notant que Zebra a été publié sous des licences permissives afin que des équipes indépendantes puissent le forker et l’améliorer, et que plusieurs contributeurs de Zakura avaient déjà contribué en amont à Zebra.

### Récupération privée d’informations

Valar Group maintient des services et des bibliothèques PIR pour deux problèmes liés :

- Prouver qu’une note n’était pas dépensée à une hauteur d’instantané sans révéler son nullifier.
- Réduire les données que les wallets doivent récupérer pour se synchroniser ou voter.

Il s’agit d’une dépendance centrale de Shielded Vote et d’un élément de base pour une UX de wallet privé plus rapide.

### Ingénierie Ironwood et NU7

Valar Group a participé à l’engagement conjoint de juin 2026 pour Ironwood et a contribué à l’implémentation des règles de consensus ainsi qu’au travail sur les clients autour du nouveau pool. Le groupe a également exploité l’infrastructure du testnet NU7, y compris des scripts de connexion et des nœuds publics hébergés sous `nu7.valargroup.dev`.

### Bibliothèques de protocole open source

L’organisation GitHub `valargroup` publie la pile de vote et de nœud sous forme de dépôts publics, notamment :

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — chaîne spécifique à l’application pour le vote privé on-chain
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — bibliothèque de vote blindé côté client, preuves, stockage et FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — circuits Halo2 de délégation et de vote
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR pour les preuves de non-appartenance des nullifiers
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — configuration de découverte de services pour wallets
- [`zebra`](https://github.com/valargroup/zebra) — fork de développement Zebra/Zakura de Valar Group

## Les équipes

Valar Group est dirigé par **Dev Ojha** (ValarDragon). Les pages publiques de l’équipe associées à Zakura répertorient les ingénieurs affiliés à Valar suivants :

- **Dev Ojha** — Responsable de maintenance ; dirige Valar Group. Ses domaines d’intérêt comprennent le vote des détenteurs de jetons, le travail post-quantique, Zakura et le PIR.
- **Roman Akhtariev** — Ingénieur principal. Auparavant ingénieur principal chez Osmosis ; ses travaux incluent la synchronisation de wallet PIR, le vote des détenteurs de jetons et les performances de synchronisation de Zakura.
- **Evan Forbes** — Ingénieur principal. Ancien responsable du consensus et ingénieur fondateur de Celestia ; ses travaux incluent la préparation aux temps de bloc plus rapides et une pile P2P QUIC.
- **Adam Tucker** — Ingénieur principal. Ancien ingénieur d’Osmosis ; ses travaux incluent le vote des détenteurs de jetons avec Roman Akhtariev, la fiabilité des wallets et l’intégration d’Ironwood dans toute la pile.

Zakura lui-même est maintenu conjointement avec Project Tachyon, dirigé par Sean Bowe. Les deux organisations collaborent étroitement mais restent distinctes.

## Structure organisationnelle

Valar Group opère comme une organisation d’ingénierie indépendante. Elle ne fait pas partie de la Zcash Foundation, de ZODL, de Shielded Labs ou de Zcash Community Grants.

Dans la conception de la chaîne de vote, Valar Group est l’une des cinq organisations coordinatrices. Ce rôle est un paramètre du système de vote, et non une revendication de contrôle exclusif sur la gouvernance de Zcash. D’autres équipes peuvent exploiter des validateurs, mettre en place des chaînes de vote alternatives ou auditer les décomptes publiés à partir des outils publics.

Des informations supplémentaires sur le type d’entité juridique, la composition du conseil d’administration et la gouvernance interne n’ont pas été publiées avec le même niveau de détail que pour les anciennes organisations Zcash.

## Financement

Des déclarations publiques sur les forums datant de la mi-2026 décrivent Valar Group et Project Tachyon comme financés par des dons privés. Contrairement au tour de financement divulgué de ZODL ou aux annonces publiques de dons de Shielded Labs, Valar Group n’a pas publié de liste détaillée de donateurs ni de calendrier de subventions.

Ce modèle de financement maintient l’équipe indépendante de la voie historique du Development Fund / des récompenses de bloc, mais il implique également moins de visibilité publique sur la taille du budget et les sources de financement.

## Rôle dans l’écosystème Zcash

Valar Group est l’une des organisations de protocole indépendantes qui se sont formées autour du paysage de développement de Zcash en 2026. Dans ce paysage :

- La **Zcash Foundation** poursuit la gestion communautaire et Zebra.
- **ZODL** se concentre sur le produit wallet et la poursuite du protocole après la séparation d’ECC.
- **Shielded Labs** se concentre sur la durabilité, la sécurité et la recherche sur le consensus.
- **Project Tachyon** se concentre sur la récursion, la vérification formelle et l’évolutivité à long terme.
- **Valar Group** se concentre sur le vote privé des détenteurs de monnaies, les performances des nœuds, le PIR et l’ingénierie nécessaire pour exploiter ces systèmes en production.

Sa contribution distinctive consiste à rendre la gouvernance blindée opérationnelle. Le vote NU7 est la première utilisation majeure de cette pile : les détenteurs prouvent leurs soldes Ironwood, des wallets tels que Zodl et Vizor peuvent intégrer le flux, et chacun peut auditer le décompte sans savoir comment un détenteur particulier a voté.

Le travail de la même équipe sur les nœuds et la synchronisation est destiné à soutenir l’autre moitié de cette vision. Le vote privé est moins utile si les wallets ne peuvent pas se synchroniser, si les nœuds ne peuvent pas suivre ou si les mises à niveau ne peuvent pas être implémentées rapidement. Valar Group traite la gouvernance, le logiciel de nœud et l’infrastructure de wallet comme un seul problème : rendre Zcash privé utilisable à grande échelle sans concentrer le pouvoir opérationnel dans une seule organisation.

## Ressources

- [Site web de Valar Group](https://valargroup.dev/)
- [GitHub de Valar Group](https://github.com/valargroup)
- [Documentation Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)
- [Configuration de la chaîne de vote](https://setup.valargroup.org)
- [Auditeur de décompte](https://tally.valargroup.org)
- [Interface des coordinateurs](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [À propos / équipe de Zakura](https://zakura.com/about/)
- [Fil de forum sur le vote des détenteurs de monnaies NU7](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Fil de forum sur la Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)
