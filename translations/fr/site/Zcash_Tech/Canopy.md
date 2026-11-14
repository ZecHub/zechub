<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy a été activée sur le réseau principal de Zcash au bloc 1 046 400 (18 novembre 2020 UTC).

Ce que vous allez retenir : comment Zcash a continué de financer son propre développement après la fin de la récompense des fondateurs, et comment Canopy a mis en place la répartition du financement sur laquelle s'appuient encore les mises à niveau ultérieures.

Canopy est la cinquième mise à niveau du réseau de Zcash, également appelée mise à niveau du réseau 4 (NU4). Elle est déployée par [ZIP 251](https://zips.z.cash/zip-0251) et a été activée au bloc 1 046 400 du réseau principal le 18 novembre 2020 (UTC), au moment même du premier halving de la récompense de bloc de Zcash. Canopy était principalement une mise à niveau de gouvernance et de politique monétaire. Elle a mis fin à la récompense des fondateurs d'origine et a lancé le nouveau fonds de développement de Zcash, qui rémunère l'Electric Coin Company, la Zcash Foundation et des bénéficiaires de subventions indépendants. La politique à l'origine de ce fonds est issue d'un long processus de gouvernance communautaire mené en 2019.

Pourquoi c'est important. Zcash finance son propre développement à partir des récompenses de bloc, car aucune entreprise ne se trouve derrière lui. La récompense des fondateurs qui a financé ses premières années devait prendre fin au premier halving. Canopy en a été le remplacement : elle a dirigé une part fixe de chaque récompense de bloc vers un fonds de développement et a défini qui la reçoit. Ce modèle a été affiné par des mises à niveau ultérieures, jusqu'à [NU6.1](../zcash-tech/nu6-1).

![Avant Canopy, la récompense des fondateurs finançait le développement et devait prendre fin au premier halving. Après Canopy, le Development Fund prélève 20 % de chaque récompense de bloc jusqu'au deuxième halving en 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## Le fonds de développement

Canopy a mis fin à la récompense des fondateurs d'origine et l'a remplacée par le fonds de développement de Zcash. Ce changement est intervenu au même bloc que le premier halving de Zcash, lorsque la récompense de bloc est passée de 6,25 ZEC à 3,125 ZEC. Les mineurs ont donc vu leur récompense réduite de moitié le jour même où une nouvelle part de cette récompense plus petite a commencé à être versée au développement.

Le fonds devait fonctionner pendant quatre ans, de ce premier halving en novembre 2020 jusqu'au deuxième halving en 2024. La politique convenue a été rédigée sous la forme de [ZIP 1014](https://zips.z.cash/zip-1014). Le mécanisme de consensus qui déplace réellement les fonds est celui des flux de financement : [ZIP 207](https://zips.z.cash/zip-0207) a introduit la méthode générale permettant de diriger une partie de la récompense de bloc vers des bénéficiaires définis, et [ZIP 214](https://zips.z.cash/zip-0214) a fixé les règles précises et les adresses des bénéficiaires du fonds de développement.

## Comment les fonds sont répartis

Le fonds de développement prélève 20 % de chaque récompense de bloc. Les mineurs conservent les 80 % restants. Ces 20 % sont ensuite répartis en trois parts, conformément à ZIP 1014.

1. 35 % pour le projet Bootstrap, l'organisation mère de l'Electric Coin Company.
2. 25 % pour la Zcash Foundation.
3. 40 % pour les Grandes subventions, qui financent des travaux indépendants et sont administrées par la Zcash Foundation. Les Grandes subventions sont ensuite devenues Zcash Community Grants (ZCG).

Rapportées à l'ensemble de la récompense de bloc plutôt qu'au seul fonds, ces parts correspondent à 7 % pour l'Electric Coin Company, 5 % pour la Zcash Foundation et 8 % pour les Grandes subventions. Les deux façons de les décrire renvoient aux mêmes chiffres.

![Le Development Fund représente 20 % de chaque récompense de bloc, réparti à 35 % pour Bootstrap et l'Electric Coin Company, 25 % pour la Zcash Foundation et 40 % pour les Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Le changement du pool Sprout

Canopy a également commencé à retirer le plus ancien pool protégé. Sprout était le premier pool protégé de Zcash, et Canopy a commencé à le fermer progressivement au moyen de [ZIP 211](https://zips.z.cash/zip-0211).

Depuis l'activation de Canopy, aucune nouvelle valeur ne peut être ajoutée au pool Sprout. En termes techniques, le champ vpub_old de chaque JoinSplit doit être égal à zéro. Les fonds déjà présents dans Sprout peuvent toujours être retirés, de sorte que personne n'est bloqué, mais le pool ne peut désormais que diminuer. Il s'agit d'une première étape vers l'abandon à terme de l'ancien pool Sprout au profit de pools protégés plus récents.

![Avant Canopy, la valeur pouvait à la fois entrer dans le pool Sprout et en sortir. Après Canopy, aucune nouvelle valeur ne peut y entrer, mais les retraits restent autorisés](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Les ajouts techniques

En plus des changements de financement, Canopy comprenait deux ZIP techniques de moindre ampleur. [ZIP 212](https://zips.z.cash/zip-0212) a modifié la façon dont un destinataire dérive le secret éphémère Sapling, en le dérivant à partir du texte en clair de la note. [ZIP 215](https://zips.z.cash/zip-0215) a établi des règles explicites de validation des signatures Ed25519, afin que chaque nœud s'accorde exactement sur les signatures considérées comme valides.

## En bref

- Canopy (NU4) a été activée au bloc 1 046 400 du réseau principal (18 novembre 2020 UTC), le même bloc que le premier halving de Zcash, qui a réduit la récompense de bloc de 6,25 à 3,125 ZEC.
- Elle a mis fin à la récompense des fondateurs et créé le fonds de développement de Zcash : 20 % de chaque récompense de bloc pendant quatre ans, jusqu'au deuxième halving en 2024 (politique ZIP 1014 ; mécanisme ZIP 207/214).
- Les 20 % du fonds sont répartis à raison de 35 % pour Bootstrap (Electric Coin Company), 25 % pour la Zcash Foundation et 40 % pour les Grandes subventions, devenues plus tard Zcash Community Grants.
- Elle a fermé le pool Sprout à toute nouvelle valeur (ZIP 211) : aucun nouveau dépôt ne peut y entrer, mais les retraits restent possibles.
- Deux ZIP techniques l'accompagnaient : ZIP 212 (secret éphémère Sapling dérivé du texte en clair de la note) et ZIP 215 (règles explicites de validation Ed25519).

## Explication de fond

Zcash finance son propre développement à partir des récompenses de bloc, car aucune entreprise ne se trouve derrière lui. La récompense des fondateurs couvrait les premières années et devait prendre fin au premier halving : un remplacement devait donc exister avant cette échéance. Canopy a été ce remplacement : ZIP 207 a introduit le mécanisme général des flux de financement, qui dirige une partie de la récompense de bloc vers des adresses de bénéficiaires définies, et ZIP 214 a fixé les règles et adresses précises du fonds de développement. Rapportées à l'ensemble de la récompense plutôt qu'au seul fonds, les parts sont de 7 % pour ECC, 5 % pour Zcash Foundation et 8 % pour les Grandes subventions : les mêmes chiffres décrits de deux façons.

Canopy a également commencé à retirer Sprout, le plus ancien pool protégé de Zcash : dès l'activation, le champ vpub_old de chaque JoinSplit doit être égal à zéro, de sorte que la valeur peut sortir de Sprout mais ne peut jamais y revenir.

## Analogie visuelle

Canopy correspond au moment où la phase pendant laquelle les fondateurs d'une start-up se versent un salaire prend fin et où une constitution prend le relais : à partir de ce bloc, 20 centimes de chaque dollar émis par le réseau sont réservés à la maintenance et répartis selon la clé 35/25/40 entre trois services. Dans le même temps, l'ancien entrepôt (Sprout) est fermé à tout nouveau stockage : chacun peut encore récupérer ses marchandises, mais plus rien de nouveau n'y entre.

## Approfondissement

Le flux de financement est imposé par le consensus, et non par la confiance : les nœuds rejettent les blocs dont la transaction coinbase ne verse pas aux bénéficiaires définis les parts qui leur reviennent. Canopy a été volontairement activée sur le bloc du halving, de sorte que les mineurs ont vu leur récompense réduite de moitié au moment même où une nouvelle part de cette récompense plus petite commençait à être versée au développement. ZIP 212 a modifié la façon dont le secret éphémère Sapling est dérivé (à partir du texte en clair de la note), et ZIP 215 a établi des règles explicites d'acceptation Ed25519 afin que chaque nœud valide les signatures de manière identique : de petits changements qui ont éliminé des catégories entières d'ambiguïtés de consensus.

## Erreurs courantes

- **Penser que Canopy est le halving lui-même.** Ils partageaient le même bloc d'activation, mais il s'agit de changements distincts : ZIP 251 (Canopy) d'un côté, le calendrier d'émission de l'autre.
- **Comprendre que les 20 % sont prélevés sur la nouvelle part des mineurs.** Les mineurs ont conservé 80 % ; le fonds prélève 20 % de la récompense de bloc.
- **Supposer que les fonds de Sprout ont été gelés ou détruits.** Les retraits restent possibles : seuls les nouveaux dépôts ont été arrêtés.
- **Considérer « 35/25/40 du fonds » et « 7/5/8 de la récompense » comme des répartitions différentes.** Ce sont les mêmes chiffres, mesurés par rapport à des bases différentes.
- **Qualifier Canopy de mise à niveau cryptographique.** Il s'agissait principalement de gouvernance et de politique monétaire ; les ZIP techniques n'étaient que des ajustements mineurs.


## Glossaire

| Terme | Signification en langage simple |
|---|---|
| Founders reward | Le modèle de financement d'origine qui a payé les débuts du développement de Zcash, dont la fin était prévue au premier halving |
| Development Fund | La part de 20 % de chaque récompense de bloc que Canopy a dirigée vers le développement, jusqu'au deuxième halving |
| Block reward (subsidy) | Les nouveaux ZEC créés et versés à chaque bloc miné |
| Halving | L'événement programmé lors duquel la récompense de bloc est réduite de moitié |
| Funding stream | Le mécanisme de consensus (ZIP 207) qui dirige une partie de la récompense de bloc vers des adresses de bénéficiaires définies |
| Sprout pool | Le pool protégé d'origine de Zcash, dans lequel Canopy a cessé d'accepter toute nouvelle valeur |

## FAQ

Canopy modifie-t-elle mes ZEC ou ma confidentialité ? Non. Canopy concerne la manière dont le développement est financé, ainsi que quelques règles techniques. Vos soldes et vos transactions protégées ne sont pas affectés.

Canopy a-t-elle réduit la récompense de bloc ? Canopy a été activée au même bloc que le premier halving de Zcash, qui a réduit la récompense de 6,25 ZEC à 3,125 ZEC. Le halving fait partie de la politique monétaire de Zcash. Le rôle de Canopy était de décider de l'utilisation d'une part de cette récompense plus petite.

À quoi sert le fonds de développement ? Il finance les personnes qui construisent Zcash. Les fonds vont à l'Electric Coin Company (par l'intermédiaire du projet Bootstrap), à la Zcash Foundation et aux Grandes subventions, qui soutiennent des travaux indépendants.

Pouvez-vous encore utiliser des fonds dans le pool Sprout ? Oui. Vous pouvez toujours retirer les fonds qui se trouvent déjà dans Sprout. Vous ne pouvez simplement plus y ajouter de nouvelle valeur après Canopy.

Le fonds de développement est-il permanent ? Non. Il devait fonctionner pendant quatre ans, du premier halving en novembre 2020 jusqu'au deuxième halving en 2024, ce qui laissait à la communauté le temps d'observer son fonctionnement avant de le réexaminer.

Quel est le lien entre Canopy, NU6 et NU6.1 ? Canopy a mis en place la répartition du financement en trois parts et le mécanisme des flux de financement. Les mises à niveau ultérieures, dont NU6 et NU6.1, ont réexaminé et remodelé le fonds de développement construit sur cette base.

## Testez votre compréhension

Canopy a été activée exactement au même bloc que le premier halving de Zcash. Pourquoi ce calendrier a-t-il été choisi, et qu'serait-il advenu du financement du développement sans Canopy ?

<details>
<summary>Réponse</summary>

La récompense des fondateurs d'origine devait prendre fin au premier halving. Sans Canopy, la totalité de la récompense de bloc, plus petite après le halving, serait allée aux mineurs, ce qui n'aurait laissé aucun financement du développement au niveau du protocole. Canopy a remplacé la récompense des fondateurs par le fonds de développement à ce bloc précis, de sorte que le financement s'est poursuivi sans interruption.
</details>

### Ressources

[ZIP 251 : Déploiement de la mise à niveau du réseau Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014 : Création d'un fonds de développement pour ECC, la ZF et les Grandes subventions](https://zips.z.cash/zip-1014)

[ZIP 207 : Flux de financement](https://zips.z.cash/zip-0207)

[ZIP 214 : Règles de consensus pour un fonds de développement Zcash](https://zips.z.cash/zip-0214)

[ZIP 211 : Désactivation de l'ajout de nouvelle valeur au pool de valeur de la chaîne Sprout](https://zips.z.cash/zip-0211)

[Mise à niveau du réseau Canopy](https://z.cash/upgrade/canopy/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Fonds de développement](../start-here/development-fund)

[Politique monétaire de Zcash](../start-here/zcash-monetary-policy)

[Pools protégés](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Gouvernance de Zcash](../zcash-community/zcash-governance)

---

## Pages connexes

- [Sprout](./Sprout.md) — le pool que Canopy a fermé aux nouveaux dépôts
- [Heartwood](./Heartwood.md) — la mise à niveau précédente de la série
- [NU5](./NU5.md) — la mise à niveau suivante, qui a lancé Orchard
- [NU6.1](./NU6_1.md) — l'ajustement le plus récent du financement du développement


Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Heartwood](../zcash-tech/heartwood) · Suivant : [NU5](../zcash-tech/nu5)
