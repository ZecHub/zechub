<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Canopy

> Canopy a été activé sur le mainnet de Zcash au bloc 1 046 400 (18 novembre 2020 UTC).

Ce que vous allez retenir : comment Zcash a continué à financer son propre développement après la fin de la récompense des fondateurs, et comment Canopy a mis en place la répartition du financement sur laquelle les mises à niveau ultérieures continuent de s’appuyer.

Canopy est la cinquième mise à niveau du réseau de Zcash, également appelée Network Upgrade 4 (NU4). Elle est déployée par [ZIP 251](https://zips.z.cash/zip-0251), et elle s’est activée au bloc 1 046 400 du mainnet le 18 novembre 2020 (UTC), exactement au même moment que la première réduction de moitié de la récompense de bloc de Zcash. Canopy était principalement une mise à niveau de gouvernance et de politique monétaire. Elle a mis fin à la récompense des fondateurs d’origine et lancé le nouveau Zcash Development Fund, qui rémunère Electric Coin Company, la Zcash Foundation et des bénéficiaires de subventions indépendants. La politique derrière ce fonds est issue d’un long processus de gouvernance communautaire en 2019.

Pourquoi c’est important. Zcash finance son propre développement à partir des récompenses de bloc, car il n’a pas d’entreprise derrière lui. La récompense des fondateurs qui finançait ses premières années devait prendre fin lors de la première réduction de moitié. Canopy a été le remplacement : il a dirigé une part fixe de chaque récompense de bloc vers un Development Fund et a défini qui la reçoit. Ce modèle a été affiné par les mises à niveau ultérieures, jusqu’à [NU6.1](../zcash-tech/nu6-1).

![Avant Canopy, la récompense des fondateurs finançait le développement et devait prendre fin lors de la première réduction de moitié. Après Canopy, le Development Fund prend 20 pour cent de chaque récompense de bloc et fonctionne jusqu’à la deuxième réduction de moitié en 2024](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## Le fonds de développement

Canopy a mis fin à la récompense des fondateurs d’origine et l’a remplacée par le Zcash Development Fund. Le changement a eu lieu au même bloc que la première réduction de moitié de Zcash, lorsque la récompense de bloc est passée de 6,25 ZEC à 3,125 ZEC. Les mineurs ont donc vu leur récompense divisée par deux le même jour où une nouvelle tranche de cette récompense plus faible a commencé à être dirigée vers le développement.

Le fonds devait fonctionner pendant quatre ans, depuis cette première réduction de moitié en novembre 2020 jusqu’à la deuxième réduction de moitié en 2024. La politique convenue a été rédigée dans [ZIP 1014](https://zips.z.cash/zip-1014). Le mécanisme de consensus qui déplace effectivement les fonds est le mécanisme de funding stream : [ZIP 207](https://zips.z.cash/zip-0207) a introduit la méthode générale permettant de diriger une partie de la subvention de bloc vers des bénéficiaires définis, et [ZIP 214](https://zips.z.cash/zip-0214) a fixé les règles spécifiques et les adresses des bénéficiaires pour le Development Fund.

## Comment l’argent est réparti

Le Development Fund prend 20 pour cent de chaque récompense de bloc. Les mineurs conservent les 80 pour cent restants. Ces 20 pour cent sont ensuite répartis en trois parts, conformément à ZIP 1014.

1. 35 pour cent pour le Bootstrap Project, l’organisation mère d’Electric Coin Company.
2. 25 pour cent pour la Zcash Foundation.
3. 40 pour cent pour Major Grants, qui finance des travaux indépendants et est administré par la Zcash Foundation. Major Grants est ensuite devenu Zcash Community Grants (ZCG).

Mesurées par rapport à la récompense de bloc totale plutôt qu’au seul fonds, ces parts correspondent à 7 pour cent pour Electric Coin Company, 5 pour cent pour la Zcash Foundation et 8 pour cent pour Major Grants. Les deux façons de le décrire correspondent aux mêmes chiffres.

![Le Development Fund représente 20 pour cent de chaque récompense de bloc, répartis en 35 pour cent pour Bootstrap et Electric Coin Company, 25 pour cent pour la Zcash Foundation et 40 pour cent pour Major Grants](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Le changement concernant le pool Sprout

Canopy a également commencé à retirer progressivement le plus ancien pool protégé. Sprout était le premier pool protégé de Zcash, et Canopy a commencé à l’abandonner progressivement via [ZIP 211](https://zips.z.cash/zip-0211).

À partir du moment où Canopy s’est activé, aucune nouvelle valeur ne peut être ajoutée au pool Sprout. En termes techniques, le champ vpub_old de chaque JoinSplit doit être égal à zéro. Les fonds déjà présents dans Sprout peuvent toujours être retirés, donc personne n’est bloqué, mais le pool ne peut désormais que diminuer. Il s’agit d’une première étape vers l’abandon à terme de l’ancien pool Sprout au profit de pools protégés plus récents.

![Avant Canopy, la valeur pouvait à la fois entrer et sortir du pool Sprout. Après Canopy, aucune nouvelle valeur ne peut y entrer, mais les retraits restent autorisés](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## Les compléments techniques

En plus des changements de financement, Canopy comprenait deux ZIP techniques plus modestes. [ZIP 212](https://zips.z.cash/zip-0212) a modifié la façon dont un destinataire dérive le secret éphémère Sapling, en le dérivant à partir du texte en clair de la note. [ZIP 215](https://zips.z.cash/zip-0215) a défini des règles explicites pour valider les signatures Ed25519, afin que chaque nœud s’accorde exactement sur les signatures considérées comme valides.

## Glossaire

| Terme | Signification en français courant |
|---|---|
| Founders reward | Le modèle de financement d’origine qui a payé les débuts du développement de Zcash, prévu pour prendre fin lors de la première réduction de moitié |
| Development Fund | La part de 20 pour cent de chaque récompense de bloc que Canopy a dirigée vers le développement, jusqu’à la deuxième réduction de moitié |
| Block reward (subsidy) | Les nouveaux ZEC créés et versés à mesure que chaque bloc est miné |
| Halving | L’événement programmé où la récompense de bloc est divisée par deux |
| Funding stream | Le mécanisme de consensus (ZIP 207) qui dirige une partie de la subvention de bloc vers des adresses de bénéficiaires définies |
| Sprout pool | Le pool protégé d’origine de Zcash, dans lequel Canopy a cessé d’accepter de nouvelles valeurs |

## FAQ

Canopy modifie-t-il mes ZEC ou ma confidentialité ? Non. Canopy concerne la manière dont le développement est financé, ainsi que quelques règles techniques. Vos soldes et vos transactions protégées ne sont pas affectés.

Canopy a-t-il réduit la récompense de bloc ? Canopy s’est activé au même bloc que la première réduction de moitié de Zcash, qui a fait passer la récompense de 6,25 ZEC à 3,125 ZEC. La réduction de moitié fait partie de la politique monétaire de Zcash. Le rôle de Canopy était de décider comment une part de cette récompense plus faible est utilisée.

À quoi sert le Development Fund ? Il finance les personnes qui construisent Zcash. L’argent va à Electric Coin Company (via le Bootstrap Project), à la Zcash Foundation et à Major Grants, qui soutient les travaux indépendants.

Puis-je encore utiliser les fonds du pool Sprout ? Oui. Vous pouvez toujours retirer les fonds déjà présents dans Sprout. Vous ne pouvez simplement plus y ajouter de nouvelle valeur après Canopy.

Le Development Fund est-il permanent ? Non. Il devait fonctionner pendant quatre ans, depuis la première réduction de moitié en novembre 2020 jusqu’à la deuxième réduction de moitié en 2024, laissant à la communauté le temps de voir comment il fonctionne avant de le réexaminer.

Quel est le lien entre Canopy, NU6 et NU6.1 ? Canopy a mis en place la répartition du financement en trois parts ainsi que le mécanisme de funding stream. Les mises à niveau ultérieures, notamment NU6 et NU6.1, ont réexaminé et remodelé le Development Fund construit sur cette base.

## Testez votre compréhension

Canopy s’est activé exactement au même bloc que la première réduction de moitié de Zcash. Pourquoi ce calendrier a-t-il été choisi, et qu’arriverait-il au financement du développement sans Canopy ?

<details>
<summary>Réponse</summary>

La récompense des fondateurs d’origine devait prendre fin lors de la première réduction de moitié. Sans Canopy, l’intégralité de la récompense de bloc plus faible après la réduction de moitié serait allée aux mineurs, ne laissant aucun financement du développement au niveau du protocole. Canopy a remplacé la récompense des fondateurs par le Development Fund à ce bloc précis, de sorte que le financement s’est poursuivi sans interruption.
</details>

### Ressources

[ZIP 251: Déploiement de la mise à niveau réseau Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014: Établissement d’un Dev Fund pour ECC, ZF et Major Grants](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Règles de consensus pour un Zcash Development Fund](https://zips.z.cash/zip-0214)

[ZIP 211: Désactivation de l’ajout de nouvelle valeur au pool de valeur de la chaîne Sprout](https://zips.z.cash/zip-0211)

[Canopy Network Upgrade](https://z.cash/upgrade/canopy/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Politique monétaire de Zcash](../start-here/zcash-monetary-policy)

[Pools protégés](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Gouvernance de Zcash](../zcash-community/zcash-governance)

---

Série : [Index des mises à niveau réseau](../start-here/network-upgrades) · Précédent : [Heartwood](../zcash-tech/heartwood) · Suivant : [NU5](../zcash-tech/nu5)
