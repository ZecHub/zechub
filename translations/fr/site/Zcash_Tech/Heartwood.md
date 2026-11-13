<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood a été activé sur le mainnet de Zcash au bloc 903 000 (16 juillet 2020 UTC).

Ce que vous allez retenir : comment Heartwood a permis aux mineurs de recevoir leurs récompenses de bloc directement dans des adresses blindées, et comment il a rendu la preuve de travail de Zcash vérifiable par des clients légers.

Heartwood est une [mise à niveau du réseau](../start-here/network-upgrades) de Zcash, un hard fork des règles de consensus dont le déploiement est défini dans la [ZIP 250](https://zips.z.cash/zip-0250). Elle regroupait deux changements de fonctionnalités : la [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) et la [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood a été la quatrième grande mise à niveau du réseau de Zcash, et elle a été soutenue conjointement par l’[Electric Coin Company](../zcash-organizations/electric-coin-company) et la [Zcash Foundation](../zcash-organizations/zcash-foundation). Comme chaque mise à niveau de Zcash, elle a défini un nouvel identifiant de branche de consensus, une étiquette qui fournit une protection contre la relecture dans les deux sens afin qu’une transaction construite selon les nouvelles règles ne puisse pas être rejouée sur l’ancienne chaîne, et inversement.

Heartwood s’active à une hauteur de bloc définie (903 000), et non à une heure fixe, donc la minute exacte que vous voyez sur un tableau de bord peut légèrement varier d’un endroit à l’autre. Le bloc, et le moment, sont les mêmes.

Pourquoi c’est important. Les mineurs gagnent des ZEC nouvellement créés chaque fois qu’ils minent un bloc. Avant Heartwood, ce revenu devait arriver dans une adresse transparente, donc publique. N’importe qui pouvait voir combien un mineur gagnait et où les pièces allaient ensuite. Heartwood a permis que cette récompense aille directement dans une adresse blindée à la place, afin que la rémunération d’un mineur puisse rester privée. Cela a aussi rendu possible pour les wallets légers et d’autres chaînes de vérifier la preuve de travail de Zcash sans télécharger toute la chaîne.

## Coinbase blindé

La transaction coinbase est la transaction spéciale qui verse la récompense de bloc. Avant Heartwood, ses sorties devaient être transparentes, de sorte que les ZEC nouvellement créés d’un mineur commençaient toujours leur existence dans une adresse publique. Heartwood a modifié les règles de consensus pour que, selon les termes de la ZIP 213, les transactions coinbase puissent contenir des sorties Sapling. En termes simples, les mineurs peuvent désormais recevoir leurs récompenses directement dans des adresses Sapling blindées. Les sorties coinbase transparentes sont toujours prises en charge, il s’agit donc d’une nouvelle option, pas d’un changement imposé.

![Avant Heartwood, la récompense de bloc d’un mineur devait aller vers une adresse publique transparente. Après Heartwood, les transactions coinbase peuvent contenir des sorties Sapling, donc la récompense peut aller directement vers une adresse blindée](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Pourquoi Sapling d’abord

Le coinbase blindé cible spécifiquement les sorties Sapling, et il y a une raison à cela. La ZIP 213 explique que la mise à niveau Sapling a apporté des changements d’architecture et des améliorations de performances qui ont rendu possible le blindage direct des fonds dans la transaction coinbase. Le pool blindé Sprout d’origine demandait trop de ressources pour être blindé directement dans la coinbase. Le système de preuve plus efficace de Sapling et son format de note l’ont rendu pratique. Sapling avait lui-même étendu l’ancienne règle qui interdisait les sorties coinbase blindées afin qu’elle couvre aussi les sorties Sapling, et Heartwood assouplit cette règle pour les autoriser. C’est un bon exemple de la manière dont les mises à niveau de Zcash s’appuient les unes sur les autres : la plomberie d’une mise à niveau devient la base de la suivante.

## FlyClient

Heartwood a également modifié ce à quoi un en-tête de bloc s’engage. Le champ de l’en-tête auparavant nommé hashFinalSaplingRoot a été réaffecté et renommé hashLightClientRoot. Il s’engage désormais sur la racine d’un Merkle Mountain Range (MMR), une structure évolutive construite à partir des données d’en-tête et des métadonnées des blocs précédents, comme les horodatages, les cibles de difficulté, les racines Sapling, le travail accumulé et le nombre de transactions. Cet engagement permet à un client léger, ou à une chaîne externe, de vérifier la preuve de travail de Zcash à l’aide d’une petite preuve dont la taille n’augmente que logarithmiquement avec la longueur de la chaîne. Le bénéfice est de meilleurs wallets de clients légers et une intégration tierce et cross-chain plus facile, parce qu’un client n’a plus besoin de télécharger chaque bloc pour faire confiance au travail derrière la chaîne.

![Flux FlyClient : les données d’en-tête de chaque bloc sont engagées dans une racine de Merkle Mountain Range (hashLightClientRoot), ce qui permet à un client léger de vérifier la preuve de travail avec une petite preuve de taille logarithmique](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Où se situe Heartwood

Heartwood est une étape dans une série de mises à niveau de Zcash, chacune ajoutant un élément sur lequel la suivante s’appuie. Overwinter et Sapling sont arrivées en 2018, Blossom en 2019, et Heartwood en 2020 au bloc 903 000. Canopy a suivi plus tard en 2020 au bloc 1 046 400. Sapling est le maillon clé de cette chaîne pour Heartwood : son mécanisme efficace de transactions blindées était la condition technique préalable qui a rendu possible le coinbase blindé.

![Chronologie des mises à niveau de Zcash : Overwinter et Sapling en 2018, Blossom en 2019, et Heartwood en 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## En bref

- Heartwood a été activé au bloc 903 000 du mainnet (16 juillet 2020 UTC), déployé par ZIP 250 avec un nouvel identifiant de branche de consensus pour une protection bidirectionnelle contre la relecture.
- ZIP 213 (Coinbase blindé) : les transactions coinbase peuvent contenir des sorties Sapling, de sorte que les mineurs peuvent recevoir les récompenses de bloc directement sur une adresse blindée.
- ZIP 221 (FlyClient) : le champ hashLightClientRoot de l’en-tête s’engage désormais sur un Merkle Mountain Range, ce qui permet aux clients légers de vérifier la preuve de travail avec des preuves dont la taille ne croît que de façon logarithmique.
- Les sorties coinbase transparentes restent entièrement prises en charge : le coinbase blindé est une nouvelle option, pas une obligation.
- L’activation se produit à une hauteur de bloc, et non à une heure précise, de sorte que la minute exacte diffère selon les tableaux de bord et les fuseaux horaires.

## Explication de base

Avant Heartwood, les ZEC fraîchement émis d’un mineur devaient commencer leur existence dans une adresse transparente, de sorte que n’importe qui pouvait observer les revenus d’un mineur et retracer leur destination. ZIP 213 a assoupli la règle de consensus afin que la transaction coinbase puisse payer des sorties Sapling, préservant ainsi la confidentialité de la rémunération d’un mineur dès le tout premier instant de son existence. Il cible spécifiquement Sapling parce que la génération de preuves efficace de Sapling rendait le blindage au sein de la coinbase réalisable ; les preuves lourdes de Sprout n’y étaient pas envisageables.

ZIP 221 a réaffecté le champ d’en-tête hashFinalSaplingRoot en hashLightClientRoot. Il s’engage désormais sur un Merkle Mountain Range construit à partir des données d’en-tête des blocs précédents : horodatages, cibles de difficulté, racines Sapling, travail accumulé et nombre de transactions. Un client léger ou une autre chaîne peut alors vérifier la preuve de travail de Zcash grâce à une petite preuve, au lieu de télécharger chaque bloc.

## Analogie visuelle

Avant : la paie de chaque mineur était affichée sur un tableau public, et n’importe qui pouvait lire le montant et suivre sa trace. Après : la paie peut arriver dans une enveloppe scellée. Et chaque nouveau bloc porte désormais un petit sceau de cire qui résume tous les blocs précédents, si bien qu’un inconnu peut vérifier d’un coup d’œil toute la chaîne de travail au lieu de lire chaque page.

## Analyse approfondie

Ce changement de règle s'inscrivait dans une histoire : Sapling avait étendu l'interdiction initiale du coinbase blindé pour couvrir également les sorties Sapling, et Heartwood a levé cette restriction pour les autoriser. C'est un exemple parfait de la façon dont la tuyauterie d'une mise à niveau devient le socle de la suivante. L'engagement MMR porte ses fruits dans les wallets légers et l'intégration cross-chain, où vérifier le travail de Zcash exigeait auparavant de télécharger la chaîne complète. L'identifiant de branche de consensus ajouté lors de l'activation assure une protection contre la relecture dans les deux sens : une transaction construite selon les nouvelles règles ne peut pas être rejouée sur l'ancienne chaîne, et inversement.

## Erreurs courantes

- **Croire que le coinbase blindé est devenu obligatoire.** Les sorties coinbase transparentes restent valides ; ce sont les mineurs qui choisissent.
- **Supposer que Sprout peut recevoir un coinbase blindé.** Seules les sorties Sapling sont autorisées, car la génération de preuves de Sprout était trop gourmande en ressources.
- **Penser que FlyClient supprime le besoin de nœuds complets.** Il sert les clients légers et les vérificateurs inter-chaînes ; les nœuds complets restent le point d'ancrage du réseau.
- **Chercher une heure d'activation fixe.** L'activation était définie au bloc 903 000, donc la minute exacte en temps réel varie.
- **Confondre hashLightClientRoot avec l'ancien hashFinalSaplingRoot.** Le même champ a été réaffecté et renommé.

## Glossaire

| Terme | Signification en français simple |
|---|---|
| Network upgrade (NU) | Un changement coordonné des règles de consensus de Zcash, activé à une hauteur de bloc définie |
| Coinbase transaction | La transaction spéciale de chaque bloc qui verse la récompense de bloc |
| Shielded Sapling address | Un type d’adresse privée Zcash introduit par la mise à niveau Sapling |
| Shielded coinbase | Le changement de Heartwood qui permet de verser les récompenses de bloc dans des adresses Sapling blindées |
| FlyClient | Une méthode qui permet aux clients légers de vérifier la preuve de travail avec de petites preuves |
| Merkle Mountain Range (MMR) | Un résumé évolutif des blocs passés auquel l’en-tête de bloc s’engage |
| Consensus branch id | Une étiquette identifiant les règles de quelle mise à niveau une transaction suit, utilisée pour la protection contre la relecture |

## FAQ

Heartwood modifie-t-il mes ZEC ou ma vie privée ? Non. Heartwood n’a pas touché à vos fonds existants. Il a ajouté l’option permettant aux mineurs de recevoir leurs récompenses dans des adresses blindées et a amélioré la prise en charge des clients légers. Vos propres soldes et transactions blindées ne sont pas affectés.

Qu’est-ce que le coinbase blindé ? La coinbase est la transaction qui verse une récompense de bloc. Heartwood permet à cette récompense d’aller dans une adresse Sapling blindée plutôt que dans une adresse transparente, afin que les revenus des mineurs puissent rester privés.

Les mineurs doivent-ils désormais recevoir leurs récompenses de manière blindée ? Non. Le coinbase blindé est optionnel. Les sorties coinbase transparentes restent prises en charge, donc les mineurs peuvent choisir l’une ou l’autre.

Pourquoi le coinbase blindé utilise-t-il Sapling et non l’ancien pool Sprout ? Parce que la conception plus efficace de Sapling a rendu pratique le blindage direct dans la coinbase. L’ancien pool Sprout demandait trop de ressources pour cela.

Qu’est-ce qui a changé pour les clients légers ? L’en-tête de bloc s’engage désormais sur un Merkle Mountain Range couvrant les blocs passés via le champ hashLightClientRoot. Cela permet aux clients légers et à d’autres chaînes de vérifier la preuve de travail de Zcash avec de petites preuves de taille logarithmique au lieu de toute la chaîne.

## Testez votre compréhension

Avant Heartwood, pourquoi la récompense de bloc versée à un mineur apparaissait-elle publiquement, et qu’a changé Heartwood ?

<details>
<summary>Réponse</summary>

Les sorties Coinbase devaient être transparentes, de sorte que la récompense nouvellement créée d'un mineur atterrissait toujours sur une adresse transparente publique que n'importe qui pouvait consulter. Heartwood a modifié les règles de consensus (ZIP 213) afin que les transactions coinbase puissent contenir des sorties Sapling, permettant ainsi aux mineurs de recevoir leurs récompenses directement sur des adresses blindées.
</details>

### Ressources

[ZIP 250 : Déploiement de la mise à niveau du réseau Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213 : Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221 : FlyClient - Modifications de la couche de consensus](https://zips.z.cash/zip-0221)

[Mise à niveau du réseau Heartwood](https://z.cash/upgrade/heartwood/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Pools blindés](../using-zcash/shielded-pools)

[Wallets](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## Pages associées

- [Sapling](./Sapling.md) — le mécanisme efficace qui a rendu possible le coinbase blindé
- [Canopy](./Canopy.md) — la prochaine mise à niveau de la série
- [Nœuds complets](./Full_Nodes.md) — ce que la vérification complète apporte encore
- [Ce qu'un explorateur de blocs peut voir](./What_a_Block_Explorer_Can_See.md) — ce que révèle un coinbase transparent par rapport à un coinbase blindé

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Blossom](../zcash-tech/blossom) · Suivant : [Canopy](../zcash-tech/canopy)
