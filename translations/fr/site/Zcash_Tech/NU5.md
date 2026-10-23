<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 a été mis en ligne sur le réseau principal de Zcash au bloc 1 687 104 (31 mai 2022 UTC).

Ce que vous allez retenir : comment NU5 a donné à Zcash un nouveau pool protégé ne nécessitant aucune configuration de confiance, ainsi qu’un type d’adresse unique qui fonctionne entre les pools.

NU5 (Network Upgrade 5) est la sixième Zcash [mise à niveau du réseau](../start-here/network-upgrades) de [, déployée par ZIP 252](https://zips.z.cash/zip-0252). Il s’agit d’une mise à niveau cryptographique majeure. Elle a introduit le protocole de paiement protégé Orchard, construit sur le système de preuve Halo 2, ainsi que les adresses unifiées et un nouveau format de transaction version 5. NU5 a été livré dans la version v5.0.0 de Electric Coin Company de zcashd.

Pourquoi cela importe. Un pool protégé n’est digne de confiance qu’à la hauteur de la configuration qui l’a créé. Les deux premiers pools protégés de Zcash, Sprout et Sapling, nécessitaient chacun une cérémonie unique de configuration de confiance pour générer leurs paramètres secrets. Si ces paramètres avaient été conservés au lieu d’être détruits, quelqu’un aurait pu créer des ZEC contrefaits sans que personne ne s’en aperçoive. Le pool Orchard de NU5 élimine ce problème en utilisant le système de preuve Halo 2, qui ne nécessite aucune cérémonie de ce type.

## La configuration de confiance

Orchard est le protocole protégé introduit par NU5, défini dans [ZIP 224](https://zips.z.cash/zip-0224). Il est construit sur le système de preuve Halo 2, qui utilise une technique appelée arithmétisation PLONKish sur le cycle de courbes Pallas et Vesta. L’avantage pratique est simple : Halo 2 ne nécessite aucune configuration de confiance ni chaîne de référence structurée ; il n’existe donc aucun paramètre secret qui pourrait un jour être mal utilisé.

Sprout et Sapling dépendaient tous deux d’une configuration de confiance. Un groupe de personnes a organisé une cérémonie pour créer les paramètres de chaque pool, et tout le monde devait avoir confiance qu’au moins l’une d’entre elles détruirait sa part du secret. Orchard supprime cette hypothèse. Les anciens pools existent toujours après NU5 ; la garantie d’absence de configuration s’applique donc aux fonds que vous détenez dans le pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Ce que NU5 a changé

NU5 regroupe plusieurs modifications du consensus, toutes activées ensemble au bloc 1 687 104.

1. Il a ajouté le pool protégé Orchard (ZIP 224), le protocole basé sur Halo 2 décrit ci-dessus.
2. Il a ajouté le format de transaction version 5 (ZIP 225), une structure réorganisée avec des zones distinctes pour les données transparentes, Sapling et les nouvelles données Orchard. Les champs Sprout ont été supprimés, et l’ancien format version 4 est resté valide après l’activation.
3. Il a introduit les adresses unifiées et les clés de visualisation unifiées (ZIP 316), abordées dans la section suivante.
4. Il a adopté la non-malléabilité de l’identifiant de transaction (ZIP 244), une nouvelle méthode de calcul de l’identifiant d’une transaction qui sépare ce qu’une transaction fait des preuves et signatures qui l’autorisent.
5. Il a adopté les encodages canoniques des points Jubjub (ZIP 216) afin d’éliminer les encodages non standards et de renforcer les règles définissant une transaction valide.
6. Il a permis la transmission des transactions version 5 sur le réseau pair à pair (ZIP 239).

NU5 a également mis à jour plusieurs ZIP existants (32, 203, 209, 212, 213, 221 et 401) afin qu’ils prennent en compte le nouveau pool Orchard.

## Adresses unifiées

Avant NU5, chaque pool avait son propre type d’adresse, et l’expéditeur devait savoir quel type vous souhaitiez. Les adresses unifiées, définies dans [ZIP 316](https://zips.z.cash/zip-0316), changent cela. Une seule adresse Unified peut regrouper des récepteurs pour plusieurs pools ; le wallet de l’expéditeur choisit donc simplement le meilleur qu’il prend en charge.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Les clés de visualisation unifiées fonctionnent de la même façon pour la consultation. Elles offrent une visibilité en lecture seule sur les pools couverts par une adresse. Pour en savoir plus, consultez la page [Viewing Keys](../zcash-tech/viewing-keys).

## Où se situe NU5

NU5 a suivi les mises à niveau antérieures de Zcash : Overwinter, Sapling, Blossom, Heartwood et Canopy. Il a été activé sur le réseau principal le 31 mai 2022. Le cycle de courbes de Orchard a été choisi parce qu’il prend en charge la récursivité, ce qui constitue une base pour de futurs travaux de mise à l’échelle. NU5 est le prédécesseur direct de la lignée de mises à niveau NU6 et NU6.x, qui s’est appuyée sur le pool Orchard avant de le corriger par la suite.

## Glossaire

| Terme | Signification en langage clair |
|---|---|
| Network upgrade (NU) | Une modification coordonnée des règles de consensus de Zcash, activée à une hauteur de bloc définie |
| Orchard | Le pool protégé introduit par NU5, construit sur le système de preuve Halo 2 |
| Halo 2 | Le système de preuve derrière Orchard qui ne nécessite aucune configuration de confiance |
| Trusted setup | Une cérémonie unique qui crée les paramètres secrets d’un pool et qui doit être digne de confiance pour les détruire |
| Unified Address | Une adresse unique pouvant regrouper des récepteurs pour plusieurs pools (ZIP 316) |
| Consensus branch id | Un identifiant indiquant l’ensemble de règles auquel appartient une transaction |

## FAQ

NU5 modifie-t-il mes ZEC ou ma confidentialité ? Non. NU5 a ajouté un nouveau pool protégé et un nouveau format d’adresse. Vos ZEC existants ne sont pas affectés, et votre confidentialité n’est pas réduite. Déplacer des fonds dans Orchard vous donne accès à un pool qui ne nécessite aucune configuration de confiance.

Qu’est-ce que Orchard ? Orchard est le protocole protégé de Zcash introduit par NU5. Il fonctionne avec le système de preuve Halo 2, et ne nécessite donc aucune cérémonie de configuration de confiance.

Dois-je faire quelque chose ? Non. Un wallet pris en charge gère NU5 pour vous. Vous pouvez continuer à utiliser les anciennes adresses et commencer à utiliser les adresses unifiées lorsque votre wallet les propose.

Qu’est-ce qu’une adresse unifiée ? Une adresse unique pouvant contenir des récepteurs pour plusieurs pools. Le wallet de l’expéditeur choisit le pool qu’il prend en charge, vous n’avez donc pas à communiquer une adresse différente pour chaque type.

NU5 supprime-t-il la configuration de confiance de mes anciens fonds ? Pas rétroactivement. Orchard ne nécessite aucune configuration de confiance, mais les paramètres antérieurs du pool Sapling existent toujours après NU5. La garantie d’absence de configuration s’applique aux fonds détenus dans le pool Orchard.

L’ancien format de transaction a-t-il cessé de fonctionner ? Non. NU5 a ajouté le format version 5, et l’ancien format version 4 est resté valide après l’activation.

## Testez votre compréhension

Sprout et Sapling nécessitaient tous deux une cérémonie de configuration de confiance. Qu’est-ce que le pool Orchard de NU5 a changé à ce sujet, et pourquoi cela importe-t-il ?

<details>
<summary>Réponse</summary>

Orchard est construit sur le système de preuve Halo 2, qui ne nécessite aucune configuration de confiance ni chaîne de référence structurée. Cela élimine le risque que des paramètres secrets restants puissent un jour être utilisés pour contrefaire des ZEC. La garantie s’applique aux fonds détenus dans le pool Orchard. Les anciens paramètres Sapling existent toujours après NU5.
</details>

### Ressources

[ZIP 252 : Déploiement de la mise à niveau du réseau NU5](https://zips.z.cash/zip-0252)

[ZIP 224 : Protocole protégé Orchard](https://zips.z.cash/zip-0224)

[ZIP 225 : Format de transaction version 5](https://zips.z.cash/zip-0225)

[ZIP 316 : Adresses unifiées et clés de visualisation unifiées](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company : Version zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Voir aussi

[Zcash Mises à niveau du réseau](../start-here/network-upgrades)

[Pools protégés](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Clés de visualisation](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Canopy](../zcash-tech/canopy) · Suivant : [NU6](../zcash-tech/nu6)
