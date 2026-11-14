<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood a été activée sur le réseau principal de Zcash au bloc 903 000 (16 juillet 2020 UTC).

Ce que vous allez retenir : comment Heartwood a permis aux mineurs de recevoir leurs récompenses de bloc directement sur des adresses protégées, et comment cette mise à niveau a rendu la preuve de travail de Zcash vérifiable par des clients légers.

Heartwood est une Zcash [mise à niveau du réseau](../start-here/network-upgrades), c'est-à-dire un hard fork des règles de consensus dont le déploiement est défini dans la [ZIP 250](https://zips.z.cash/zip-0250). Elle regroupait deux évolutions fonctionnelles : la [ZIP 213](https://zips.z.cash/zip-0213) (Coinbase protégée) et la [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood était la quatrième mise à niveau du réseau majeure de Zcash, et elle a été soutenue conjointement par [Electric Coin Company](../zcash-organizations/electric-coin-company) et [Zcash Foundation](../zcash-organizations/zcash-foundation). Comme toute mise à niveau de Zcash, elle a défini un nouvel identifiant de branche de consensus, une étiquette qui offre une protection bidirectionnelle contre la rediffusion : une transaction construite selon les nouvelles règles ne peut pas être rediffusée sur l'ancienne chaîne, et inversement.

Heartwood s'active à une hauteur de bloc donnée (903 000), et non à une heure fixe ; la minute exacte affichée sur un tableau de bord peut donc légèrement varier d'un endroit à l'autre. Le bloc, et le moment, sont les mêmes.

Pourquoi c'est important. Les mineurs gagnent des ZEC nouvellement créés chaque fois qu'ils minent un bloc. Avant Heartwood, ce revenu devait arriver sur une adresse transparente, qui est publique. N'importe qui pouvait observer combien un mineur gagnait et où les pièces partaient ensuite. Heartwood a permis que cette récompense arrive directement sur une adresse protégée, de sorte que la rémunération d'un mineur peut rester confidentielle. Cette mise à niveau a aussi permis aux portefeuilles légers et à d'autres chaînes de vérifier la preuve de travail de Zcash sans télécharger toute la chaîne.

## Coinbase protégée

La transaction coinbase est la transaction spéciale qui verse une récompense de bloc. Avant Heartwood, ses sorties devaient être transparentes ; les ZEC fraîchement créés d'un mineur commençaient donc toujours leur existence sur une adresse publique. Heartwood a modifié les règles de consensus de sorte que, selon les termes de la ZIP 213, les transactions coinbase peuvent contenir des sorties Sapling. Concrètement, les mineurs peuvent désormais recevoir leurs récompenses directement sur des adresses Sapling protégées. Les sorties coinbase transparentes restent prises en charge : il s'agit donc d'une nouvelle option, et non d'un changement imposé.

![Avant Heartwood, la récompense de bloc d'un mineur devait être versée à une adresse publique transparente. Après Heartwood, les transactions coinbase peuvent contenir des sorties Sapling, de sorte que la récompense peut aller directement à une adresse protégée](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Pourquoi Sapling d'abord

La coinbase protégée vise spécifiquement les sorties Sapling, et ce n'est pas un hasard. La ZIP 213 explique que la mise à niveau Sapling a apporté des changements d'architecture et des améliorations de performances qui ont rendu possible la protection des fonds directement dans la transaction coinbase. Le pool protégé Sprout d'origine était trop gourmand en ressources pour effectuer cette protection directement dans la coinbase. Le système de preuves plus efficace de Sapling et son format de note l'ont rendue réalisable. Sapling avait lui-même étendu l'ancienne règle interdisant les sorties coinbase protégées afin qu'elle couvre aussi les sorties Sapling, et Heartwood assouplit cette règle pour les autoriser. C'est un bon exemple de la manière dont les mises à niveau de Zcash s'appuient les unes sur les autres : la tuyauterie d'une mise à niveau devient la fondation de la suivante.

## FlyClient

Heartwood a aussi modifié ce sur quoi un en-tête de bloc s'engage. Le champ d'en-tête auparavant nommé hashFinalSaplingRoot a été réaffecté et renommé hashLightClientRoot. Il s'engage désormais sur la racine d'une Merkle Mountain Range (MMR), une structure cumulative construite à partir des données d'en-tête et des métadonnées des blocs précédents, comme les horodatages, les cibles de difficulté, les racines Sapling, le travail cumulé et le nombre de transactions. Cet engagement permet à un client léger, ou à une chaîne externe, de vérifier la preuve de travail de Zcash à l'aide d'une petite preuve dont la taille ne croît que de façon logarithmique avec la longueur de la chaîne. Le bénéfice : de meilleurs portefeuilles en client léger et une intégration plus facile pour les tiers et en inter-chaînes, car un client n'a plus besoin de télécharger chaque bloc pour faire confiance au travail qui sous-tend la chaîne.

![Flux FlyClient : les données d'en-tête de chaque bloc sont engagées dans une racine Merkle Mountain Range (hashLightClientRoot), ce qui permet à un client léger de vérifier la preuve de travail avec une preuve de petite taille, logarithmique](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## La place de Heartwood

Heartwood est une étape d'une série de mises à niveau de Zcash, chacune ajoutant un élément sur lequel la suivante s'appuie. Overwinter et Sapling sont arrivées en 2018, Blossom en 2019, et Heartwood en 2020 au bloc 903 000. Canopy a suivi plus tard en 2020 au bloc 1 046 400. Sapling est le maillon clé de cette chaîne pour Heartwood : ses mécanismes efficaces de transactions protégées étaient la condition technique préalable qui a rendu possible la coinbase protégée.

![Chronologie des mises à niveau de Zcash : Overwinter et Sapling en 2018, Blossom en 2019 et Heartwood en 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## En bref

- Heartwood a été activée au bloc 903 000 du réseau principal (16 juillet 2020 UTC), déployée par la ZIP 250 avec un nouvel identifiant de branche de consensus assurant une protection bidirectionnelle contre la rediffusion.
- ZIP 213 (Coinbase protégée) : les transactions coinbase peuvent contenir des sorties Sapling, de sorte que les mineurs peuvent recevoir leurs récompenses de bloc directement sur une adresse protégée.
- ZIP 221 (FlyClient) : le champ hashLightClientRoot de l'en-tête s'engage désormais sur une Merkle Mountain Range, ce qui permet aux clients légers de vérifier la preuve de travail avec des preuves dont la taille ne croît que de façon logarithmique.
- Les sorties coinbase transparentes restent pleinement prises en charge : la coinbase protégée est une nouvelle option, pas une obligation.
- L'activation se fait à une hauteur de bloc, et non à une heure donnée ; la minute exacte varie donc selon les tableaux de bord et les fuseaux horaires.

## Explication essentielle

Avant Heartwood, les ZEC fraîchement créés d'un mineur devaient commencer leur existence sur une adresse transparente, si bien que n'importe qui pouvait observer les revenus d'un mineur et suivre leur destination. La ZIP 213 a assoupli la règle de consensus afin que la transaction coinbase puisse payer des sorties Sapling, ce qui préserve la confidentialité de la rémunération d'un mineur dès le tout premier instant de son existence. Elle vise spécifiquement Sapling, car le système de preuves efficace de Sapling a rendu réalisable la protection au sein de la coinbase ; les preuves lourdes de Sprout ne le permettaient pas.

La ZIP 221 a réaffecté le champ d'en-tête hashFinalSaplingRoot en hashLightClientRoot. Il s'engage désormais sur une Merkle Mountain Range construite à partir des données d'en-tête des blocs précédents : horodatages, cibles de difficulté, racines Sapling, travail cumulé, nombre de transactions. Un client léger ou une autre chaîne peut alors vérifier la preuve de travail de Zcash avec une petite preuve au lieu de télécharger chaque bloc.

## Analogie visuelle

Avant : la paie de chaque mineur était affichée sur un panneau public ; le montant et sa trace étaient lisibles par tous. Après : la paie peut arriver dans une enveloppe scellée. Et chaque nouveau bloc porte désormais un petit sceau de cire résumant tous les blocs précédents, de sorte qu'un inconnu peut confirmer toute la chaîne de travail d'un coup d'œil au lieu de lire chaque page.

## Approfondissement

Ce changement de règle avait un historique : Sapling avait étendu l'interdiction d'origine de la coinbase protégée aux sorties Sapling, et Heartwood a levé cette restriction pour les autoriser ; un exemple net de la tuyauterie d'une mise à niveau qui devient la fondation de la suivante. L'engagement MMR porte ses fruits dans les portefeuilles légers et l'intégration inter-chaînes, où la vérification du travail de Zcash exigeait auparavant le téléchargement de la chaîne complète. L'identifiant de branche de consensus ajouté lors de l'activation offre une protection bidirectionnelle contre la rediffusion : une transaction construite selon les nouvelles règles ne peut pas être rediffusée sur l'ancienne chaîne, et inversement.

## Erreurs courantes

- **Penser que la coinbase protégée est devenue obligatoire.** Les sorties coinbase transparentes restent valides ; les mineurs choisissent.
- **Supposer que Sprout peut recevoir une coinbase protégée.** Seules les sorties Sapling sont autorisées ; le système de preuves de Sprout était trop gourmand en ressources.
- **Croire que FlyClient supprime le besoin de nœuds complets.** Elle sert les clients légers et les vérificateurs inter-chaînes ; les nœuds complets restent le point d'ancrage du réseau.
- **Chercher une heure d'activation fixe.** L'activation a été définie au bloc 903 000 ; la minute réelle varie donc.
- **Confondre hashLightClientRoot avec l'ancien hashFinalSaplingRoot.** Il s'agit du même champ, réaffecté et renommé.


## Glossaire

| Terme | Signification en termes simples |
|---|---|
| Network upgrade (NU) | Une modification coordonnée des règles de consensus de Zcash, activée à une hauteur de bloc donnée |
| Coinbase transaction | La transaction spéciale de chaque bloc qui verse la récompense de bloc |
| Shielded Sapling address | Un type d'adresse Zcash confidentielle introduit par la mise à niveau Sapling |
| Shielded coinbase | La modification de Heartwood qui permet de verser les récompenses de bloc sur des adresses Sapling protégées |
| FlyClient | Une méthode qui permet aux clients légers de vérifier la preuve de travail avec de petites preuves |
| Merkle Mountain Range (MMR) | Un résumé cumulatif des blocs passés sur lequel l'en-tête de bloc s'engage |
| Consensus branch id | Une étiquette indiquant les règles de quelle mise à niveau une transaction suit, utilisée pour la protection contre la rediffusion |

## FAQ

Heartwood modifie-t-elle mon ZEC ou ma confidentialité ? Non. Heartwood n'a pas touché à vos fonds existants. Elle a ajouté la possibilité pour les mineurs de recevoir leurs récompenses sur des adresses protégées et a amélioré la prise en charge des clients légers. Vos propres soldes et vos transactions protégées ne sont pas affectés.

Qu'est-ce que la coinbase protégée ? La coinbase est la transaction qui verse une récompense de bloc. Heartwood permet que cette récompense arrive sur une adresse Sapling protégée plutôt que sur une adresse transparente, afin que les revenus des mineurs puissent rester confidentiels.

Les mineurs doivent-ils désormais recevoir leurs récompenses de façon protégée ? Non. La coinbase protégée est facultative. Les sorties coinbase transparentes restent prises en charge ; les mineurs peuvent donc choisir l'une ou l'autre.

Pourquoi la coinbase protégée utilise-t-elle Sapling et non l'ancien pool Sprout ? Parce que la conception plus efficace de Sapling a rendu réalisable la protection directement dans la coinbase. L'ancien pool Sprout était trop gourmand en ressources pour le faire.

Qu'est-ce qui a changé pour les clients légers ? L'en-tête de bloc s'engage désormais, via le champ hashLightClientRoot, sur une Merkle Mountain Range couvrant les blocs passés. Cela permet aux clients légers et à d'autres chaînes de vérifier la preuve de travail de Zcash avec de petites preuves de taille logarithmique au lieu de la chaîne entière.

## Testez votre compréhension

Avant Heartwood, pourquoi la récompense de bloc versée à un mineur apparaissait-elle publiquement, et qu'est-ce que Heartwood a changé ?

<details>
<summary>Réponse</summary>

Les sorties Coinbase devaient être transparentes ; la récompense nouvellement créée d'un mineur arrivait donc toujours sur une adresse transparente publique que n'importe qui pouvait examiner. Heartwood a modifié les règles de consensus (ZIP 213) afin que les transactions coinbase puissent contenir des sorties Sapling, ce qui permet aux mineurs de recevoir leurs récompenses directement sur des adresses protégées.
</details>

### Ressources

[ZIP 250 : Déploiement de la mise à niveau du réseau Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213 : Coinbase protégée](https://zips.z.cash/zip-0213)

[ZIP 221 : FlyClient - Modifications de la couche de consensus](https://zips.z.cash/zip-0221)

[Heartwood mise à niveau du réseau](https://z.cash/upgrade/heartwood/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Pools protégés](../using-zcash/shielded-pools)

[Portefeuilles](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## Pages associées

- [Sapling](./Sapling.md) : les mécanismes efficaces qui ont rendu la coinbase protégée réalisable
- [Canopy](./Canopy.md) : la mise à niveau suivante de la série
- [Nœuds complets](./Full_Nodes.md) : ce que la vérification complète apporte encore
- [Ce qu'un explorateur de blocs peut voir](./What_a_Block_Explorer_Can_See.md) : ce que révèle une coinbase transparente par rapport à une coinbase protégée


Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Blossom](../zcash-tech/blossom) · Suivant : [Canopy](../zcash-tech/canopy)
