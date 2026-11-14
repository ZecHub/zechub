<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 a été activée sur le mainnet de Zcash au bloc 1 687 104 (31 mai 2022 UTC).

Ce que vous allez retenir : comment NU5 a doté Zcash d’un nouveau pool protégé qui ne nécessite aucune configuration de confiance, ainsi que d’un type d’adresse unique qui fonctionne entre les pools.

NU5 (mise à niveau du réseau 5) est la sixième [mise à niveau du réseau](../start-here/network-upgrades) de Zcash, déployée par [ZIP 252](https://zips.z.cash/zip-0252). Il s’agit d’une mise à niveau cryptographique majeure. Elle a introduit le protocole de paiement protégé Orchard, fondé sur le système de preuves Halo 2, ainsi que les adresses unifiées et un nouveau format de transaction version 5. NU5 a été livrée dans la version v5.0.0 de zcashd publiée par Electric Coin Company.

Pourquoi c’est important. Un pool protégé n’est digne de confiance que dans la mesure où la configuration qui l’a créé l’est. Les deux premiers pools protégés de Zcash, Sprout et Sapling, ont chacun nécessité une cérémonie unique de configuration de confiance pour générer leurs paramètres secrets. Si ces paramètres avaient été conservés au lieu d’être détruits, quelqu’un aurait pu créer des ZEC contrefaits sans que personne ne s’en aperçoive. Le pool Orchard de NU5 élimine cette inquiétude en utilisant le système de preuves Halo 2, qui ne nécessite aucune cérémonie de ce type.

## La configuration de confiance

Orchard est le protocole protégé introduit par NU5, défini dans la [ZIP 224](https://zips.z.cash/zip-0224). Il repose sur le système de preuves Halo 2, qui utilise une technique appelée arithmétisation PLONKish sur le cycle de courbes Pallas et Vesta. Le bénéfice pratique est simple : Halo 2 ne nécessite ni configuration de confiance ni chaîne de référence structurée, de sorte qu’il n’existe aucun paramètre secret qui pourrait un jour être utilisé à mauvais escient.

Sprout et Sapling dépendaient tous deux d’une configuration de confiance. Un groupe de personnes a organisé une cérémonie pour construire les paramètres de chaque pool, et chacun devait faire confiance au fait qu’au moins l’une d’entre elles avait détruit sa part du secret. Orchard supprime cette hypothèse. Les anciens pools existent toujours après NU5, la garantie d’absence de configuration s’applique donc aux fonds que vous détenez dans le pool Orchard.

![Avant NU5, Sprout et Sapling nécessitaient une cérémonie de configuration de confiance. Après NU5, le pool Orchard utilise le système Halo 2 et ne nécessite aucune configuration de confiance](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Ce que NU5 a changé

NU5 regroupe plusieurs modifications du consensus, toutes activées ensemble au bloc 1 687 104.

1. Elle a ajouté le pool protégé Orchard (ZIP 224), le protocole fondé sur Halo 2 décrit ci-dessus.
2. Elle a ajouté le format de transaction version 5 (ZIP 225), une structure réorganisée avec des zones distinctes pour les données transparentes, Sapling et les nouvelles données Orchard. Les champs Sprout ont été supprimés, et l’ancien format version 4 est resté valide après l’activation.
3. Elle a introduit les adresses unifiées et les clés unifiées pour lecture seule (ZIP 316), présentées dans la section suivante.
4. Elle a adopté la non-malléabilité de l’identifiant de transaction (ZIP 244), une nouvelle manière de calculer l’identifiant d’une transaction qui sépare ce que fait une transaction des preuves et des signatures qui l’autorisent.
5. Elle a adopté des encodages canoniques des points Jubjub (ZIP 216) afin de supprimer les encodages non standard et de renforcer les règles définissant une transaction valide.
6. Elle a permis le relais des transactions version 5 sur le réseau pair-à-pair (ZIP 239).

NU5 a également mis à jour plusieurs ZIP existantes (32, 203, 209, 212, 213, 221 et 401) afin qu’elles tiennent compte du nouveau pool Orchard.

## Adresses unifiées

Avant NU5, chaque pool avait son propre type d’adresse, et l’expéditeur devait savoir quel type vous souhaitiez. Les adresses unifiées, définies dans la [ZIP 316](https://zips.z.cash/zip-0316), changent cela. Une seule adresse unifiée peut regrouper des récepteurs pour plusieurs pools, de sorte que le portefeuille de l’expéditeur choisit simplement le meilleur qu’il prend en charge.

![Une adresse unifiée regroupe des récepteurs pour plusieurs pools : un récepteur transparent, un récepteur Sapling et un nouveau récepteur Orchard](/content-images/nu5-unified-address-6e2c84f66e.webp)

Les clés unifiées pour lecture seule fonctionnent de la même manière pour la consultation. Elles offrent une visibilité en lecture seule sur les pools couverts par une adresse. Pour en savoir plus, consultez la page [Viewing Keys](../zcash-tech/viewing-keys).

## La place de NU5

NU5 a succédé aux mises à niveau précédentes de Zcash : Overwinter, Sapling, Blossom, Heartwood et Canopy. Elle a été activée sur le mainnet le 31 mai 2022. Le cycle de courbes de Orchard a été choisi parce qu’il prend en charge la récursivité, ce qui pose les bases des travaux ultérieurs de mise à l’échelle. NU5 est le prédécesseur direct de la série de mises à niveau NU6 et NU6.x, qui se sont appuyées sur le pool Orchard puis l’ont corrigé.

## En bref

- NU5 a été activée sur le mainnet au bloc 1 687 104 (31 mai 2022 UTC) — la plus importante mise à niveau cryptographique de Zcash depuis Sapling, déployée par la ZIP 252.
- Elle a lancé le pool protégé Orchard, le premier pool de Zcash fondé sur Halo 2 — un système de preuves qui ne nécessite aucune configuration de confiance.
- Elle a introduit les adresses unifiées et les clés unifiées pour lecture seule (ZIP 316) : une seule chaîne d’adresse qui peut regrouper des récepteurs pour plusieurs pools.
- Elle a fait passer les transactions au format version 5 (ZIP 225) et a rendu les identifiants de transaction non malléables (ZIP 244).
- Orchard fonctionne sur le cycle de courbes Pallas/Vesta, qui prend en charge les preuves récursives — une base pour les travaux ultérieurs de mise à l’échelle et pour la série NU6.x.

## Explication principale

Le problème de la configuration de confiance : Sprout (2016) et Sapling (2018) ont chacun nécessité une cérémonie unique pour générer des paramètres secrets, et la sécurité reposait sur la destruction de son fragment par au moins un participant. Si chaque participant avait secrètement conservé une copie, la contrefaçon de ZEC aurait été possible. Orchard supprime entièrement cette hypothèse : Halo 2 n’utilise ni configuration de confiance ni chaîne de référence structurée, il n’existe donc aucun secret qui pourrait un jour être utilisé à mauvais escient.

NU5 a regroupé plusieurs modifications du consensus, activées ensemble : le pool Orchard (ZIP 224), le format de transaction version 5 (ZIP 225), les adresses unifiées (ZIP 316), la non-malléabilité de l’identifiant de transaction (ZIP 244), les encodages canoniques des points Jubjub (ZIP 216) et le relais pair-à-pair des transactions v5 (ZIP 239). Elle a également mis à jour les ZIP 32, 203, 209, 212, 213, 221 et 401 pour tenir compte du nouveau pool.

## Analogie visuelle

Les anciens pools ressemblent à des coffres-forts dont la combinaison a été générée lors d’une cérémonie collective unique — vous faites confiance au fait que chaque participant a détruit sa copie. Orchard est un coffre-fort dont la serrure se vérifie elle-même à chaque utilisation : pas de cérémonie, pas de secret maître, rien qui aurait pu être conservé. Les adresses unifiées sont une carte de visite qui énumère toutes les entrées — transparente, Sapling, Orchard — et le visiteur choisit la porte qu’il peut réellement ouvrir.

## Analyse approfondie

Halo 2 utilise l’arithmétisation PLONKish sur le cycle de courbes Pallas et Vesta — deux courbes adaptées aux couplages qui se complètent, ce qui permet la récursivité : des preuves qui vérifient d’autres preuves. Cette récursivité est le fondement sur lequel s’appuient les travaux ultérieurs de mise à l’échelle de Zcash. La structure des transactions v5 sépare les zones transparente, Sapling et Orchard et supprime les champs Sprout ; l’ancien format version 4 est resté valide après l’activation. La ZIP 244 calcule l’identifiant de transaction à partir de ce que fait une transaction, et non à partir des preuves et des signatures qui l’autorisent, ce qui élimine des vecteurs de malléabilité.

## Erreurs courantes

- **Penser que NU5 a supprimé la configuration de confiance pour tous les pools.** Seul Orchard est exempt de cérémonie ; les paramètres de Sapling existent toujours, la garantie d’absence de configuration s’applique donc aux fonds détenus dans Orchard.
- **Supposer que les anciennes adresses ou les anciens portefeuilles ont cessé de fonctionner.** NU5 a ajouté des options ; les types d’adresse propres à chaque pool et le format de transaction v4 sont restés valides.
- **Confondre Orchard et Halo 2.** Orchard est le protocole/pool protégé ; Halo 2 est le système de preuves sur lequel il fonctionne.
- **Considérer les adresses unifiées comme le seul type d’adresse.** Il s’agit d’un format supplémentaire que vous pouvez adopter lorsque votre portefeuille le prend en charge.
- **Croire que NU5 a modifié l’émission ou la confidentialité existante.** Elle a ajouté un pool et des formats ; les ZEC existants et leur confidentialité n’ont pas été touchés.


## Glossaire

| Terme | Signification en langage courant |
|---|---|
| Network upgrade (NU) | Une modification coordonnée des règles de consensus de Zcash, activée à une hauteur de bloc déterminée |
| Orchard | Le pool protégé introduit par NU5, fondé sur le système de preuves Halo 2 |
| Halo 2 | Le système de preuves qui sous-tend Orchard et ne nécessite aucune configuration de confiance |
| Trusted setup | Une cérémonie unique qui crée les paramètres secrets d’un pool et à laquelle il faut faire confiance pour les détruire |
| Unified Address | Une adresse unique qui peut regrouper des récepteurs pour plusieurs pools (ZIP 316) |
| Consensus branch id | Un identifiant indiquant à quel ensemble de règles appartient une transaction |

## FAQ

NU5 modifie-t-elle mes ZEC ou ma confidentialité ? Non. NU5 a ajouté un nouveau pool protégé et un nouveau format d’adresse. Vos ZEC existants ne sont pas affectés, et votre confidentialité n’est pas réduite. Transférer des fonds vers Orchard vous donne accès à un pool qui ne nécessite aucune configuration de confiance.

Qu’est-ce que Orchard ? Orchard est le protocole protégé de Zcash introduit par NU5. Il fonctionne sur le système de preuves Halo 2 et ne nécessite donc aucune cérémonie de configuration de confiance.

Dois-je faire quelque chose ? Non. Un portefeuille compatible gère NU5 pour vous. Vous pouvez continuer à utiliser vos anciennes adresses et commencer à utiliser les adresses unifiées lorsque votre portefeuille les propose.

Qu’est-ce qu’une adresse unifiée ? Une adresse unique qui peut contenir des récepteurs pour plusieurs pools. Le portefeuille de l’expéditeur choisit le pool qu’il prend en charge, vous n’avez donc pas à communiquer une adresse différente pour chaque type.

NU5 supprime-t-elle la configuration de confiance de mes anciens fonds ? Pas rétroactivement. Orchard ne nécessite aucune configuration de confiance, mais les paramètres antérieurs du pool Sapling existent toujours après NU5. La garantie d’absence de configuration s’applique aux fonds détenus dans le pool Orchard.

L’ancien format de transaction a-t-il cessé de fonctionner ? Non. NU5 a ajouté le format version 5, et l’ancien format version 4 est resté valide après l’activation.

## Testez vos connaissances

Sprout et Sapling ont tous deux nécessité une cérémonie de configuration de confiance. Qu’est-ce que le pool Orchard de NU5 a changé à cet égard, et pourquoi est-ce important ?

<details>
<summary>Réponse</summary>

Orchard repose sur le système de preuves Halo 2, qui ne nécessite ni configuration de confiance ni chaîne de référence structurée. Cela élimine le risque que des paramètres secrets résiduels puissent un jour servir à contrefaire des ZEC. La garantie s’applique aux fonds détenus dans le pool Orchard. Les anciens paramètres de Sapling existent toujours après NU5.
</details>

### Ressources

[ZIP 252 : déploiement de la mise à niveau du réseau NU5](https://zips.z.cash/zip-0252)

[ZIP 224 : protocole protégé Orchard](https://zips.z.cash/zip-0224)

[ZIP 225 : format de transaction version 5](https://zips.z.cash/zip-0225)

[ZIP 316 : adresses unifiées et clés unifiées pour lecture seule](https://zips.z.cash/zip-0316)

[Mise à niveau du réseau 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company : version 5.0.0 de zcashd](https://electriccoin.co/blog/new-release-5-0-0/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Pools protégés](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## Pages connexes

- [Halo](./Halo.md) — le système de preuves sans configuration de confiance qui sous-tend Orchard
- [Adresses unifiées](./Unified_Addresses.md) — analyse approfondie de l’adressage ZIP 316
- [Sapling](./Sapling.md) — le pool protégé précédent, toujours lié à sa cérémonie
- [NU6](./NU6.md) — la mise à niveau suivante, fondée sur le pool Orchard
- [zk_SNARKS](./zk_SNARKS.md) — la technologie à divulgation nulle de connaissance sous-jacente


Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Canopy](../zcash-tech/canopy) · Suivant : [NU6](../zcash-tech/nu6)
