<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling a été activé sur le réseau principal de Zcash au bloc 419 200 (29 octobre 2018, 02:15 UTC).

Ce que vous allez retenir : Sapling a rendu les paiements Zcash privés suffisamment rapides et légers pour fonctionner sur un téléphone ou un portefeuille matériel.

Sapling a été la deuxième grande mise à niveau du réseau Zcash, activée le jour du deuxième anniversaire de Zcash. Il s'agissait d'un hard fork du consensus qui a refondu la manière dont les transactions protégées (privées) sont construites. Le déploiement est défini par la ZIP 205, les nouvelles règles de signature des transactions par la ZIP 243, et toutes deux s'appuient sur la ZIP 200, le mécanisme de mise à niveau du réseau. Tous les détails figurent dans la spécification du protocole Zcash. Electric Coin Company a conçu la mise à niveau et publié la première version qui la prenait en charge, zcashd 2.0.0, en août 2018. Sur la chaîne, le réseau identifie les règles de Sapling grâce à son identifiant de branche de consensus.

Pourquoi c'est important. Avant Sapling, effectuer un paiement réellement privé impliquait d'attendre plusieurs minutes pendant que votre ordinateur mobilisait des gigaoctets de mémoire pour construire la preuve. C'était trop lent et trop lourd pour la plupart des gens : de nombreux utilisateurs, exchanges et commerçants renonçaient donc aux transactions protégées et envoyaient plutôt des ZEC à découvert. Sapling a réduit ce travail à quelques secondes et à environ 40 mégaoctets de mémoire. C'est ce seul changement qui a rendu les ZEC protégés utilisables au quotidien, sur des téléphones ordinaires et sur des portefeuilles matériels.

## En bref

- Sapling a été la deuxième grande mise à niveau du réseau Zcash, activée au bloc 419 200 (29 octobre 2018, 02:15 UTC), le jour du deuxième anniversaire de Zcash.
- Il a refondu les transactions protégées autour de deux circuits spécialisés (Spend et Output), remplaçant le circuit JoinSplit unique et lent de Sprout (ZIP 205, ZIP 243).
- Résultat : la construction des preuves est passée de plusieurs minutes et de gigaoctets de mémoire à quelques secondes et environ 40 Mo, une charge assez légère pour les téléphones et les portefeuilles matériels.
- Nouvelles fonctionnalités : les adresses diversifiées (de nombreuses adresses de paiement impossibles à relier issues d'une seule clé), les clés pour lecture seule pour un accès limité à l'audit, et la séparation entre la génération des preuves et la signature.
- Ses paramètres sont issus d'une cérémonie multipartite en deux phases (Powers of Tau + MPC Sapling) ; la sécurité est garantie si au moins un participant a été honnête.

## Analogie visuelle

Sprout était un coursier privé qui portait chaque lettre à pied d'un bout à l'autre du pays : parfaitement confidentiel, mais lent et épuisant. Sapling a transformé ce même coursier en cycliste équipé d'un sac à dos léger : toujours confidentiel, mais assez rapide pour les livraisons du quotidien. Quant aux nouvelles clés pour lecture seule, elles reviennent à offrir à un auditeur une fenêtre transparente sur le registre du coursier, sans jamais lui remettre les clés de la cargaison.


## Ce qui a changé

Le cœur de Sapling est une méthode plus rapide pour construire la preuve à divulgation nulle de connaissance qui garantit la confidentialité d'une transaction protégée. La conception originale de Sprout utilisait un circuit de preuve unique (le circuit JoinSplit), lent et gourmand en mémoire. Sapling l'a remplacé par deux circuits spécialisés, un circuit Spend et un circuit Output, décrits dans la spécification du protocole Zcash. Il en résulte une forte baisse du coût. Selon Electric Coin Company, une transaction protégée peut être construite en quelques secondes à peine avec environ 40 mégaoctets de mémoire. La référence Sprout antérieure à Sapling était bien plus lourde, de l'ordre de plusieurs minutes et de plusieurs gigaoctets de mémoire (ces chiffres côté Sprout correspondent à la référence approximative couramment citée).

![Coût d'une transaction protégée Sprout par rapport à Sapling](/content-images/sapling-before-after-a045b0b48f.webp)

## Nouvelles clés

Sapling a également introduit un nouvel ensemble d'adresses et de clés protégées. Une seule clé peut dériver de nombreuses adresses diversifiées, c'est-à-dire des adresses de paiement distinctes qu'un observateur extérieur ne peut pas relier entre elles. Sapling a aussi ajouté les clés pour lecture seule : une clé pour lecture seule complète ou entrante vous permet de partager la possibilité de consulter le détail des transactions d'un portefeuille sans accorder la possibilité d'en dépenser les fonds. C'est utile pour l'audit, la comptabilité ou simplement pour prouver qu'un paiement a bien été effectué.

Autre changement lié : Sapling a séparé la tâche de construction de la preuve de celle de signature de la transaction. L'appareil qui construit la preuve à divulgation nulle de connaissance n'a plus besoin d'être celui qui détient l'autorisation de dépense. C'est cette séparation qui permet à un portefeuille matériel de garder votre clé de dépense isolée pendant qu'un autre appareil se charge du travail de preuve, plus lourd.

![L'appareil de preuve transmet la preuve à un appareil de signature distinct](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## La configuration de confiance

Les circuits de Sapling reposent sur un ensemble de paramètres publics qui devaient être générés avec soin. Si une seule partie les avait produits seule et avait conservé les données secrètes résiduelles (les « déchets toxiques »), elle aurait pu falsifier des preuves. Pour éviter cela, les paramètres sont issus d'une cérémonie multipartite en deux phases. La phase 1, appelée Powers of Tau, était indépendante du circuit, c'est-à-dire qu'elle n'était pas liée aux circuits spécifiques de Sapling. La phase 2, le MPC Sapling, était propre au circuit. Chaque phase reste sûre tant qu'au moins un participant a été honnête et a détruit ses déchets toxiques : la cérémonie n'échoue donc que si absolument tous les participants sont de connivence.

## Comment il a été activé

Sapling a succédé à Overwinter, la mise à niveau de juin 2018 qui avait préparé le mécanisme de mise à niveau du réseau. Electric Coin Company a fixé la hauteur d'activation sur le réseau principal dans zcashd 2.0.0, publié en août 2018, et le réseau est passé aux règles de Sapling lorsque le bloc 419 200 a été miné. Sur la chaîne, ce moment est marqué par l'identifiant de branche de consensus de Sapling.

![Chronologie du lancement de Zcash à l'activation de Sapling](/content-images/sapling-timeline-6cad184c30.webp)

## Erreurs fréquentes

- **Supposer que les paiements protégés ont toujours été utilisables.** Avant Sapling, la construction d'une preuve prenait plusieurs minutes et des gigaoctets de mémoire, si bien que la plupart des utilisateurs, exchanges et commerçants renonçaient complètement aux transactions protégées.
- **Considérer que les adresses de Sapling sont les mêmes que celles de Sprout.** Sapling a introduit ses propres types d'adresses et de clés (ainsi que les adresses diversifiées et les clés pour lecture seule) ; les clés Sprout ne sont pas interopérables avec les adresses Sapling.
- **Croire que la configuration de confiance était « le secret d'une seule entreprise ».** Il s'agissait d'une cérémonie multipartite : des preuves n'auraient pu être falsifiées que si tous les participants avaient été de connivence.
- **Penser que Sapling a modifié l'émission ou les soldes.** Il a modifié la manière dont les transactions protégées sont construites ; aucun montant en ZEC n'a été affecté.
- **Supposer que la preuve et la signature doivent être réalisées sur le même appareil.** C'est précisément la séparation introduite par Sapling qui permet aux portefeuilles matériels de garder les clés de dépense isolées pendant qu'un autre appareil construit les preuves.


## Glossaire

| Terme | Signification en langage simple |
|---|---|
| Shielded transaction | Une transaction Zcash privée qui masque l'expéditeur, le destinataire et le montant. |
| Sprout | Le protocole protégé d'origine avec lequel Zcash a été lancé, plus lent et plus lourd que Sapling. |
| Spend and Output circuits | Les deux nouveaux circuits de preuve de Sapling qui ont remplacé le circuit JoinSplit unique de Sprout. |
| Diversified address | L'une des nombreuses adresses de paiement impossibles à relier que vous pouvez dériver d'une seule clé. |
| Viewing Key | Une clé qui permet à quelqu'un de consulter les transactions d'un portefeuille sans pouvoir en dépenser les fonds. |
| Consensus branch id | Un code court qui indique au réseau les règles de quelle mise à niveau une transaction respecte. |

## FAQ

Sapling a-t-il modifié la quantité de ZEC que je possède ? Non. Sapling a modifié la manière dont les transactions protégées sont construites, pas la quantité de ZEC détenue par quiconque ni l'offre totale. Votre solde n'a pas été affecté.

Mes ZEC sont-ils toujours privés après Sapling ? Oui, et ils sont plus faciles à utiliser. Sapling a conservé la forte confidentialité des transactions protégées et les a rendues assez rapides et peu coûteuses pour être réellement utilisées. Les fonds protégés restent masqués de la même manière.

Dois-je faire quelque chose ? En tant que détenteur, vous n'avez rien à faire. Sapling était une mise à niveau du réseau adoptée par les logiciels de portefeuille et de nœud. Les portefeuilles modernes prennent déjà en charge les adresses Sapling.

Quelle est la différence entre Sprout et Sapling ? Sprout était le premier protocole protégé et utilisait un circuit de preuve unique, lent et gourmand en mémoire. Sapling l'a remplacé par des circuits Spend et Output plus rapides, a ajouté les clés pour lecture seule et les adresses diversifiées, et a rendu les transactions protégées assez légères pour les téléphones et les portefeuilles matériels.

Pourquoi certaines sources indiquent-elles le 28 octobre et d'autres le 29 octobre ? La hauteur d'activation avait été fixée à l'avance pour viser le 28 octobre 2018. Le bloc qui a effectivement déclenché le changement, le bloc 419 200, a été miné aux premières heures du 29 octobre UTC. Dans de nombreux fuseaux horaires, on était encore le 28 octobre. Dans les deux cas, il s'agit du même bloc et du même moment.

Qu'est-ce qu'une clé pour lecture seule ? Une clé pour lecture seule vous permet de partager un accès en lecture à un portefeuille protégé. Une personne disposant d'une clé pour lecture seule complète ou entrante peut consulter le détail des transactions du portefeuille, mais ne peut pas en dépenser les fonds. Pour en savoir plus, consultez [Viewing Keys](../zcash-tech/viewing-keys).

## Testez vos connaissances

Sous Sprout, pourquoi tant de personnes évitaient-elles les transactions protégées, et comment Sapling a-t-il résolu le problème ?

<details>
<summary>Réponse</summary>
Sous Sprout, construire une transaction protégée prenait plusieurs minutes et mobilisait des gigaoctets de mémoire : c'était donc trop lent et trop lourd pour la plupart des utilisateurs, exchanges et commerçants. Sapling a introduit des circuits Spend et Output plus rapides qui ont réduit ce travail à quelques secondes et à environ 40 mégaoctets, rendant les transactions protégées utilisables sur les téléphones et les portefeuilles matériels du quotidien.
</details>

### Ressources

- [ZIP 205 : déploiement de la mise à niveau du réseau Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243 : validation de la signature des transactions pour Sapling](https://zips.z.cash/zip-0243)
- [Page de la mise à niveau Sapling sur Zcash](https://z.cash/upgrade/sapling/)
- [Electric Coin Company : annonce de Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company : annonce du MPC Sapling](https://electriccoin.co/blog/sapling-mpc/)

### Voir aussi

- [Pools protégés](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Mises à niveau du réseau Zcash](../start-here/network-upgrades)
- [Portefeuilles](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

## Pages connexes

- [Viewing Keys](./Viewing_Keys.md) : la fonctionnalité de partage pour audit introduite par Sapling
- [Sprout](./Sprout.md) : le protocole protégé d'origine remplacé par Sapling
- [Blossom](./Blossom.md) : la mise à niveau suivante de la série (cadence des blocs, pas de cryptographie)
- [zk_SNARKS](./zk_SNARKS.md) : la technologie à divulgation nulle de connaissance sur laquelle reposent les circuits


Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Overwinter](../zcash-tech/overwinter) · Suivant : [Blossom](../zcash-tech/blossom)
