---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Sapling

> Sapling a été activé sur le mainnet de Zcash au bloc 419 200 (29 octobre 2018, 02:15 UTC).

Ce que vous allez retenir : Sapling a rendu les paiements privés Zcash assez rapides et légers pour fonctionner sur un téléphone ou un hardware wallet.

Sapling a été la deuxième mise à niveau majeure du réseau Zcash, activée pour le deuxième anniversaire de Zcash. Il s’agissait d’un hard fork de consensus qui a reconstruit la manière dont les transactions shielded (privées) sont assemblées. Le déploiement est défini par ZIP 205, les nouvelles règles de signature des transactions par ZIP 243, et les deux s’appuient sur ZIP 200, le mécanisme de mise à niveau du réseau. Tous les détails figurent dans la Spécification du protocole Zcash. Electric Coin Company a développé la mise à niveau et a livré la première version qui la prenait en charge, zcashd 2.0.0, en août 2018. On-chain, le réseau identifie les règles de Sapling par son consensus branch id.

Pourquoi c’est important. Avant Sapling, effectuer un paiement réellement privé signifiait attendre plusieurs minutes pendant que votre ordinateur utilisait des gigaoctets de mémoire pour construire la preuve. C’était trop lent et trop lourd pour la plupart des gens, si bien que beaucoup d’utilisateurs, d’exchanges et de commerces ont évité les transactions shielded et ont envoyé des ZEC à découvert à la place. Sapling a réduit ce travail à quelques secondes et environ 40 mégaoctets de mémoire. Ce seul changement a rendu les ZEC shielded pratiques à utiliser au quotidien, sur des téléphones ordinaires et sur des hardware wallets.

## Ce qui a changé

Au cœur de Sapling se trouve une méthode plus rapide pour construire la preuve à divulgation nulle de connaissance qui préserve la confidentialité d’une transaction shielded. Le design Sprout d’origine utilisait un seul circuit de preuve (le circuit JoinSplit), lent et gourmand en mémoire. Sapling l’a remplacé par deux circuits conçus pour cet usage, un circuit Spend et un circuit Output, décrits dans la Spécification du protocole Zcash. Le résultat est une forte baisse du coût. Selon Electric Coin Company, une transaction shielded peut être construite en seulement quelques secondes en utilisant environ 40 mégaoctets de mémoire. La référence Sprout avant Sapling était bien plus lourde, de l’ordre de plusieurs minutes et de plusieurs gigaoctets de mémoire (ces chiffres côté Sprout sont la référence approximative la plus couramment citée).

![Coût d’une transaction shielded Sprout par rapport à Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Nouvelles clés

Sapling a également introduit un nouvel ensemble d’adresses et de clés shielded. Une seule clé peut dériver de nombreuses adresses diversifiées, qui sont des adresses de paiement distinctes qu’un observateur extérieur ne peut pas relier entre elles. Sapling a aussi ajouté des viewing keys : une viewing key complète ou entrante vous permet de partager la capacité de voir les détails des transactions d’un wallet sans céder la capacité de dépenser ses fonds. C’est utile pour l’audit, la comptabilité, ou simplement pour prouver qu’un paiement a été effectué.

Un changement lié est que Sapling a séparé la tâche de construction de la preuve de celle de signature de la transaction. L’appareil qui construit la preuve à divulgation nulle de connaissance n’a plus besoin d’être l’appareil qui détient l’autorité de dépense. Ce découplage permet à un hardware wallet de garder votre clé de dépense isolée pendant qu’un autre appareil effectue le travail de preuve plus lourd.

![L’appareil de preuve transmet la preuve à un appareil de signature distinct](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## Le trusted setup

Les circuits de Sapling reposent sur un ensemble de paramètres publics qui devaient être générés avec soin. Si une seule partie les avait produits seule et avait conservé les données secrètes résiduelles (les « toxic waste »), cette partie aurait pu falsifier des preuves. Pour éviter cela, les paramètres provenaient d’une cérémonie en deux phases et multipartite. La phase 1, appelée Powers of Tau, était indépendante du circuit, ce qui signifie qu’elle n’était pas liée aux circuits spécifiques de Sapling. La phase 2, le Sapling MPC, était spécifique au circuit. Chaque phase reste sûre tant qu’au moins un participant a été honnête et a détruit ses toxic waste, donc la cérémonie n’échoue que si absolument tous les participants se concertent.

## Comment il a été activé

Sapling a suivi Overwinter, la mise à niveau de juin 2018 qui a préparé le mécanisme de mise à niveau du réseau. Electric Coin Company a fixé la hauteur d’activation du mainnet dans zcashd 2.0.0, publié en août 2018, et le réseau est passé aux règles de Sapling lorsque le bloc 419 200 a été miné. On-chain, ce moment est marqué par le consensus branch id de Sapling.

![Chronologie du lancement de Zcash jusqu’à l’activation de Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| Transaction shielded | Une transaction Zcash privée qui masque l’expéditeur, le destinataire et le montant. |
| Sprout | Le protocole shielded d’origine avec lequel Zcash a été lancé, plus lent et plus lourd que Sapling. |
| Circuits Spend et Output | Les deux nouveaux circuits de preuve de Sapling qui ont remplacé l’unique circuit JoinSplit de Sprout. |
| Adresse diversifiée | L’une des nombreuses adresses de paiement non corrélables que vous pouvez dériver à partir d’une seule clé. |
| Viewing key | Une clé qui permet à quelqu’un de voir les transactions d’un wallet sans pouvoir dépenser depuis celui-ci. |
| Consensus branch id | Un code court qui indique au réseau quelles règles de mise à niveau une transaction suit. |

## FAQ

Sapling a-t-il modifié la quantité de ZEC que je possède ? Non. Sapling a modifié la manière dont les transactions shielded sont construites, pas la quantité de ZEC détenue par qui que ce soit ni l’offre totale. Votre solde n’a pas été affecté.

Mon ZEC est-il toujours privé après Sapling ? Oui, et il est plus utilisable. Sapling a conservé la forte confidentialité des transactions shielded et les a rendues assez rapides et peu coûteuses pour être réellement utilisées. Les fonds shielded restent cachés de la même manière.

Dois-je faire quelque chose ? Aucune action n’est requise de votre part en tant que détenteur. Sapling était une mise à niveau du réseau adoptée par les logiciels de wallet et de nœud. Les wallets modernes prennent déjà en charge les adresses Sapling.

Quelle est la différence entre Sprout et Sapling ? Sprout était le premier protocole shielded et utilisait un circuit de preuve unique, lent et très gourmand en mémoire. Sapling l’a remplacé par des circuits Spend et Output plus rapides, a ajouté les viewing keys et les adresses diversifiées, et a rendu les transactions shielded assez légères pour les téléphones et les hardware wallets.

Pourquoi certaines sources indiquent-elles le 28 octobre et d’autres le 29 octobre ? La hauteur d’activation a été fixée à l’avance pour viser le 28 octobre 2018. Le bloc qui a effectivement déclenché le changement, le bloc 419 200, a été miné dans les premières heures du 29 octobre UTC. Dans de nombreux fuseaux horaires locaux, c’était encore le 28 octobre. C’est le même bloc et le même moment dans tous les cas.

Qu’est-ce qu’une viewing key ? Une viewing key vous permet de partager un accès en lecture à un wallet shielded. Une personne disposant d’une viewing key complète ou entrante peut voir les détails des transactions du wallet mais ne peut pas dépenser ses fonds. Voir [Viewing Keys](../zcash-tech/viewing-keys) pour en savoir plus.

## Testez votre compréhension

Sous Sprout, pourquoi tant de personnes évitaient-elles les transactions shielded, et comment Sapling a-t-il résolu ce problème ?

<details>
<summary>Réponse</summary>
Sous Sprout, la construction d’une transaction shielded prenait plusieurs minutes et utilisait des gigaoctets de mémoire, donc c’était trop lent et trop lourd pour la plupart des utilisateurs, des exchanges et des commerces. Sapling a introduit des circuits Spend et Output plus rapides qui ont réduit ce travail à quelques secondes et environ 40 mégaoctets, rendant les transactions shielded pratiques sur les téléphones du quotidien et les hardware wallets.
</details>

### Ressources

- [ZIP 205 : Déploiement de la mise à niveau réseau Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243 : Validation des signatures de transaction pour Sapling](https://zips.z.cash/zip-0243)
- [Page de mise à niveau Zcash Sapling](https://z.cash/upgrade/sapling/)
- [Electric Coin Company : annonce de Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company : annonce du Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Voir aussi

- [Pools shielded](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Mises à niveau du réseau Zcash](../start-here/network-upgrades)
- [Wallets](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Overwinter](../zcash-tech/overwinter) · Suivant : [Blossom](../zcash-tech/blossom)
