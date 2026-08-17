---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 a été activée sur le mainnet de Zcash au bloc 1,687,104 (31 mai 2022 UTC).

Ce que vous allez retenir : comment NU5 a donné à Zcash une nouvelle pool protégée qui ne nécessite aucune configuration de confiance, ainsi qu’un type d’adresse unique qui fonctionne à travers plusieurs pools.

NU5 (Network Upgrade 5) est la sixième [mise à niveau du réseau](../start-here/network-upgrades) de Zcash, déployée par [ZIP 252](https://zips.z.cash/zip-0252). Il s’agit d’une mise à niveau cryptographique majeure. Elle a introduit le protocole de paiements protégés Orchard, construit sur le système de preuve Halo 2, ainsi que les adresses unifiées et un nouveau format de transaction version 5. NU5 a été livrée dans la version zcashd v5.0.0 de Electric Coin Company.

Pourquoi c’est important. Une pool protégée n’est digne de confiance qu’à la hauteur de la configuration qui l’a créée. Les deux premières pools protégées de Zcash, Sprout et Sapling, nécessitaient chacune une cérémonie unique de configuration de confiance pour générer leurs paramètres secrets. Si ces paramètres avaient été conservés au lieu d’être détruits, quelqu’un aurait pu créer de faux ZEC sans que personne ne s’en aperçoive. La pool Orchard de NU5 élimine cette inquiétude grâce au système de preuve Halo 2, qui ne nécessite aucune cérémonie de ce type.

## La configuration de confiance

Orchard est le plus récent protocole protégé de Zcash, défini dans [ZIP 224](https://zips.z.cash/zip-0224). Il est construit sur le système de preuve Halo 2, qui utilise une technique appelée arithmétisation PLONKish sur le cycle de courbes Pallas et Vesta. Le bénéfice pratique est simple : Halo 2 ne nécessite ni configuration de confiance ni chaîne de référence structurée, donc il n’existe aucun paramètre secret susceptible d’être détourné.

Sprout et Sapling dépendaient tous deux d’une configuration de confiance. Un groupe de personnes a exécuté une cérémonie pour construire les paramètres de chaque pool, et tout le monde devait avoir confiance dans le fait qu’au moins l’une d’entre elles avait détruit sa part du secret. Orchard supprime cette hypothèse. Les anciennes pools existent toujours après NU5, donc la garantie d’absence de configuration de confiance s’applique aux fonds que vous détenez dans la pool Orchard.

![Avant NU5, Sprout et Sapling nécessitaient une cérémonie de configuration de confiance. Après NU5, la pool Orchard utilise le système Halo 2 et ne nécessite aucune configuration de confiance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## Ce que NU5 a changé

NU5 regroupe plusieurs changements de consensus, tous activés ensemble au bloc 1,687,104.

1. Elle a ajouté la pool protégée Orchard (ZIP 224), le protocole basé sur Halo 2 décrit ci-dessus.
2. Elle a ajouté le format de transaction version 5 (ZIP 225), une structure réorganisée avec des sections séparées pour les données transparentes, Sapling et les nouvelles données Orchard. Les champs Sprout ont été supprimés, et l’ancien format version 4 est resté valide après l’activation.
3. Elle a introduit les adresses unifiées et les clés de visualisation unifiées (ZIP 316), présentées dans la section suivante.
4. Elle a adopté la non-malléabilité des identifiants de transaction (ZIP 244), une nouvelle façon de calculer l’identifiant d’une transaction qui sépare ce que fait une transaction des preuves et signatures qui l’autorisent.
5. Elle a adopté les encodages canoniques des points Jubjub (ZIP 216) afin de supprimer les encodages non standard et de renforcer les règles sur ce qui compte comme transaction valide.
6. Elle a permis la propagation des transactions version 5 à travers le réseau pair-à-pair (ZIP 239).

NU5 a également mis à jour plusieurs ZIP existants (32, 203, 209, 212, 213, 221 et 401) afin qu’ils prennent en compte la nouvelle pool Orchard.

## Adresses unifiées

Avant NU5, chaque pool avait son propre type d’adresse, et un expéditeur devait savoir quel type vous vouliez. Les adresses unifiées, définies dans [ZIP 316](https://zips.z.cash/zip-0316), changent cela. Une seule adresse unifiée peut regrouper des récepteurs pour plus d’une pool, de sorte que le wallet de l’expéditeur choisit simplement la meilleure option qu’il prend en charge.

![Une adresse unifiée regroupe des récepteurs pour plusieurs pools : un récepteur transparent, un récepteur Sapling et un nouveau récepteur Orchard](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Les clés de visualisation unifiées fonctionnent de la même manière pour la consultation. Elles donnent une visibilité en lecture seule à travers les pools couvertes par une adresse. Pour en savoir plus, consultez la page [Viewing Keys](../zcash-tech/viewing-keys).

## Où se situe NU5

NU5 a suivi les précédentes mises à niveau de Zcash : Overwinter, Sapling, Blossom, Heartwood et Canopy. Elle a été activée sur le mainnet le 31 mai 2022. Le cycle de courbes d’Orchard a été choisi parce qu’il prend en charge la récursion, ce qui pose les bases de futurs travaux de mise à l’échelle. NU5 est le prédécesseur direct de la série de mises à niveau NU6 et NU6.x, qui se sont appuyées sur la pool Orchard avant de la corriger plus tard.

## Glossaire

| Terme | Signification en clair |
|---|---|
| Mise à niveau du réseau (NU) | Un changement coordonné des règles de consensus de Zcash, activé à une hauteur de bloc définie |
| Orchard | La pool protégée introduite par NU5, construite sur le système de preuve Halo 2 |
| Halo 2 | Le système de preuve derrière Orchard qui ne nécessite aucune configuration de confiance |
| Configuration de confiance | Une cérémonie unique qui crée les paramètres secrets d’une pool et qui doit être digne de confiance pour les détruire |
| Adresse unifiée | Une adresse unique qui peut regrouper des récepteurs pour plus d’une pool (ZIP 316) |
| Identifiant de branche de consensus | Un identifiant marquant à quel ensemble de règles une transaction appartient |

## FAQ

Est-ce que NU5 change mes ZEC ou ma confidentialité ? Non. NU5 a ajouté une nouvelle pool protégée et un nouveau format d’adresse. Vos ZEC existants ne sont pas affectés, et votre confidentialité n’est pas réduite. Déplacer des fonds vers Orchard vous donne accès à une pool qui ne nécessite aucune configuration de confiance.

Qu’est-ce qu’Orchard ? Orchard est le protocole protégé de Zcash introduit par NU5. Il fonctionne sur le système de preuve Halo 2, donc il ne nécessite aucune cérémonie de configuration de confiance.

Dois-je faire quelque chose ? Non. Un wallet compatible gère NU5 pour vous. Vous pouvez continuer à utiliser les anciennes adresses, et vous pouvez commencer à utiliser des adresses unifiées lorsque votre wallet les proposera.

Qu’est-ce qu’une adresse unifiée ? Une adresse unique qui peut contenir des récepteurs pour plus d’une pool. Le wallet de l’expéditeur choisit la pool qu’il prend en charge, vous n’avez donc pas besoin de distribuer une adresse différente pour chaque type.

Est-ce que NU5 supprime la configuration de confiance de mes anciens fonds ? Pas rétroactivement. Orchard ne nécessite aucune configuration de confiance, mais les anciens paramètres de la pool Sapling existent toujours après NU5. La garantie d’absence de configuration de confiance s’applique aux fonds détenus dans la pool Orchard.

L’ancien format de transaction a-t-il cessé de fonctionner ? Non. NU5 a ajouté le format version 5, et l’ancien format version 4 est resté valide après l’activation.

## Testez votre compréhension

Sprout et Sapling nécessitaient toutes deux une cérémonie de configuration de confiance. Qu’est-ce que la pool Orchard de NU5 a changé à ce sujet, et pourquoi est-ce important ?

<details>
<summary>Réponse</summary>

Orchard est construit sur le système de preuve Halo 2, qui ne nécessite ni configuration de confiance ni chaîne de référence structurée. Cela supprime le risque que des paramètres secrets résiduels puissent un jour être utilisés pour contrefaire des ZEC. Cette garantie s’applique aux fonds détenus dans la pool Orchard. Les anciens paramètres de Sapling existent toujours après NU5.
</details>

### Ressources

[ZIP 252 : Déploiement de la mise à niveau réseau NU5](https://zips.z.cash/zip-0252)

[ZIP 224 : Protocole protégé Orchard](https://zips.z.cash/zip-0224)

[ZIP 225 : Format de transaction version 5](https://zips.z.cash/zip-0225)

[ZIP 316 : Adresses unifiées et clés de visualisation unifiées](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company : version zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Pools protégées](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Canopy](../zcash-tech/canopy) · Suivant : [NU6](../zcash-tech/nu6)
