<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 a été activée sur le mainnet de Zcash au bloc 2 726 400 (23 novembre 2024 UTC).

Ce que vous allez retenir : comment Zcash continue de financer son propre développement après un halving, pourquoi il a mis de côté une réserve qu'il ne savait pas encore comment dépenser, et comment il a rendu l'offre totale de ZEC exactement prévisible.

NU6 est une [mise à niveau du réseau](../start-here/network-upgrades) de Zcash, déployée par [ZIP 253](https://zips.z.cash/zip-0253), qui a été activée sur le mainnet en novembre 2024 au bloc 2 726 400. Il s'agit d'une mise à niveau monétaire et de [financement du développement](../start-here/development-fund) : elle a maintenu une part de la subvention de bloc destinée au développement au-delà du halving de novembre 2024, mis en place une réserve intégrée au protocole pour un usage futur décidé par la communauté, et resserré la manière dont les nouveaux ZEC sont comptabilisés. NU6 a été approuvée à la fois par la Electric Coin Company et par la Zcash Foundation.

Pourquoi c'est important. Le [fonds de développement](../zcash-tech/canopy) de Zcash devait prendre fin aux alentours du halving de novembre 2024, le deuxième de son histoire. NU6 a maintenu ce financement, mais au lieu de remettre chaque pièce à des bénéficiaires fixes, elle en a réservé une part à l'intérieur du protocole afin que la communauté puisse décider plus tard de son usage. Elle a également comblé une discrète lacune comptable, de sorte que la quantité totale de ZEC qui existera un jour peut désormais être prédite exactement.

## En bref

- NU6 a été activée sur le mainnet au bloc 2 726 400 (23 novembre 2024 UTC), déployée par ZIP 253.
- Elle a maintenu 20 % de la subvention de bloc destinés au développement après le halving de novembre 2024 : 8 % pour Zcash Community Grants (ZCG), 12 % dans le nouveau coffre du fonds de développement différé (ZIP 2001).
- Le coffre est une réserve intégrée au protocole sans dépensier défini : NU6 a délibérément laissé la gouvernance ouverte, et NU6.1 (2025) a ensuite tranché la question.
- ZIP 236 exige désormais que chaque transaction coinbase soit exactement équilibrée, de sorte que les mineurs ne peuvent plus réclamer moins que leur dû et brûler accidentellement des ZEC ; l'offre future totale devient exactement prévisible.
- Les soldes, la confidentialité et les règles des transactions restent inchangés : NU6 est une mise à niveau de financement et de comptabilité.

## Analogie visuelle

Imaginez NU6 comme un foyer qui verse une allocation fixe à ses bâtisseurs et qui sait que ces versements doivent prendre fin. Au lieu d'arrêter de payer, NU6 divise l'allocation : une partie continue d'aller au comité des subventions communautaires, et une autre est placée dans un coffre-fort familial dont aucune combinaison n'a encore été annoncée. Le coffre garde l'argent de côté jusqu'à ce que le foyer s'accorde plus tard sur les règles pour l'ouvrir ; cet accord, c'est NU6.1.


## Ce que NU6 a changé

NU6 a continué d'envoyer 20 % de la subvention de bloc au financement du développement après le halving de novembre 2024, une règle définie dans [ZIP 1015](https://zips.z.cash/zip-1015). Elle a divisé ces 20 % en deux.

1. 8 % de la subvention de bloc vont à Zcash Community Grants (ZCG), qui finance des travaux réalisés par et pour la communauté.
2. 12 % vont dans un nouveau coffre intégré au protocole, conservés pour un usage futur décidé par la communauté.

Le reste de la subvention de bloc, ainsi que les frais de transaction, revient aux mineurs qui sécurisent le réseau. NU6 a également mis à jour les règles existantes sur les flux de financement et le fonds de développement (ZIP 207 et ZIP 214) pour les adapter à cette nouvelle structure.

![Répartition du fonds de développement NU6 : 20 % du subside de bloc va au développement, dont 8 % à Zcash Community Grants et 12 % à la Deferred Dev Fund Lockbox](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## Le coffre différé

La part de 12 % est la nouveauté de NU6. Au lieu d'être versée à une adresse bénéficiaire, cette valeur est déposée directement dans un pool intégré au protocole appelé coffre du fonds de développement différé, défini dans [ZIP 2001](https://zips.z.cash/zip-2001).

1. Le coffre est un nouveau type de flux de financement (DEFERRED_POOL), dans lequel la valeur de la récompense de bloc va au protocole lui-même, et non à une personne ou à une organisation.
2. Le réseau le suit comme un solde de pool de valeur de la chaîne à part entière, de la même manière qu'il suit les soldes des pools protégés.
3. NU6 a créé le coffre à dessein, mais a laissé ouverte la question difficile : qui contrôle ces fonds, et comment sont-ils débloqués ?

Cette question a reçu une réponse plus tard avec [NU6.1](../zcash-tech/nu6-1), qui a fixé la gouvernance : elle a prolongé le flux de 8 % de la subvention de bloc vers Zcash Community Grants et dirigé un flux de 12 % vers un fonds contrôlé par les détenteurs de pièces, alimenté initialement par le coffre.

## Équilibrer les comptes

NU6 a également comblé une lacune comptable dans la manière dont les nouveaux ZEC sont créés, définie dans [ZIP 236](https://zips.z.cash/zip-0236). Les transactions Coinbase sont les transactions spéciales qui versent les nouveaux ZEC et les frais de chaque bloc.

1. Avant NU6, une transaction coinbase devait seulement ne pas réclamer plus que son dû. Un mineur pouvait réclamer moins que la subvention complète, ce qui brûlait discrètement ces ZEC.
2. Après NU6, une transaction coinbase doit être exactement équilibrée : la valeur totale des sorties doit être égale à la subvention du mineur plus les frais, ni plus ni moins.
3. Comme les mineurs ne peuvent plus réclamer moins que leur dû et brûler accidentellement des ZEC, la quantité totale de ZEC qui existera un jour peut désormais être prédite exactement.

![Équilibrage de la coinbase avant et après NU6 : avant, la coinbase pouvait réclamer moins que le montant dû et brûler des ZEC, de sorte que l'offre n'était pas exactement prévisible. Après, la coinbase doit être exactement équilibrée, de sorte que l'émission est exactement prévisible](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## L'évolution du financement

NU6 est un chapitre d'une histoire plus longue sur la manière dont Zcash se finance lui-même.

1. Canopy (2020) a mis fin à la récompense des fondateurs d'origine et créé le [fonds de développement](../start-here/development-fund).
2. NU6 (novembre 2024) a restructuré ce financement après le deuxième halving et mis en place le coffre du fonds de développement différé, réservant une part de l'émission à de futures subventions décidées par la communauté.
3. NU6.1 (2025) a répondu à la question que NU6 avait laissée ouverte, à savoir qui contrôle les fonds réservés, en prolongeant le versement de 8 % de la subvention de bloc à Zcash Community Grants et en dirigeant 12 % vers un fonds contrôlé par les détenteurs de pièces, alimenté initialement par le coffre.

![Évolution du financement de Zcash : Canopy a créé le fonds de développement, NU6 a mis en place la lockbox et NU6.1 a fixé les règles déterminant qui la contrôle](/content-images/nu6-funding-timeline-2427db58c0.webp)

## Erreurs courantes

- **Penser que NU6 a modifié la politique monétaire.** Le calendrier d'émission et le moment du halving sont restés inchangés ; NU6 a changé qui reçoit une part de la subvention, et non la quantité de nouveaux ZEC émis.
- **Confondre le coffre avec un portefeuille de fondation.** Le coffre du fonds de développement différé est un pool de valeur de la chaîne suivi par le consensus, et non une adresse à partir de laquelle quelqu'un peut dépenser.
- **Supposer que NU6.1 et NU6 sont la même mise à niveau.** NU6 a créé la réserve ; NU6.1 a décidé qui la contrôle : 8 % pour ZCG et 12 % pour un fonds contrôlé par les détenteurs de pièces.
- **Croire que la règle d'équilibre exact (ZIP 236) modifie les pièces des utilisateurs.** Elle encadre les transactions coinbase, c'est-à-dire les versements d'émission de chaque bloc, et non les soldes existants ni les transactions ordinaires.
- **Considérer la part de 20 % pour le développement comme nouvelle.** Le financement du développement à hauteur de 20 % existe depuis Canopy ; NU6 l'a prolongé au-delà du halving et l'a divisé en 8 % pour ZCG et 12 % pour le coffre.


## Glossaire

| Terme | Signification en langage courant |
|---|---|
| Block subsidy | Les nouveaux ZEC créés avec chaque bloc miné |
| Coinbase transaction | La transaction spéciale qui verse la subvention et les frais d'un bloc |
| Deferred Dev Fund Lockbox | Une réserve intégrée au protocole qui conserve une part de l'émission pour un usage futur décidé par la communauté |
| Zcash Community Grants (ZCG) | Un comité qui finance des travaux réalisés par et pour la communauté Zcash |
| Consensus branch id | L'identifiant qu'utilisent les nœuds pour savoir quelles règles de mise à niveau un bloc suit |
| Network upgrade (NU) | Une modification coordonnée des règles de consensus de Zcash, activée à une hauteur de bloc donnée |

## FAQ

NU6 modifie-t-elle mes ZEC ou ma confidentialité ? Non. NU6 porte sur la manière dont le développement est financé et dont l'émission est comptabilisée, et non sur vos transactions ou votre confidentialité. Vos fonds et vos transactions protégées ne sont pas affectés.

D'où vient le financement ? De la subvention de bloc, c'est-à-dire les nouveaux ZEC émis à mesure que les blocs sont minés. Une part de 20 % est orientée vers le développement au lieu de revenir intégralement aux mineurs.

À quoi sert le coffre ? Il réserve une part de l'émission à l'intérieur du protocole afin que la communauté puisse décider plus tard de son usage. NU6 a mis la réserve de côté, et NU6.1 a fixé les règles déterminant qui la contrôle.

La règle d'équilibre exact modifie-t-elle mes pièces ? Non. Elle exige seulement que la transaction coinbase de chaque bloc verse exactement ce qui lui est dû. Elle concerne la comptabilité des nouvelles émissions, et non les soldes existants.

Qu'est-ce qui définit techniquement NU6 ? NU6 est déployée par ZIP 253, qui fixe son activation sur le mainnet au bloc 2 726 400 ainsi que son identifiant de branche de consensus. Les modifications du consensus elles-mêmes proviennent de ZIP 236, ZIP 1015 et ZIP 2001, avec ZIP 207 et ZIP 214 mises à jour en conséquence.

En quoi NU6 diffère-t-elle de NU6.1 ? NU6 a restructuré le financement et créé le coffre. NU6.1 a décidé qui contrôle les fonds du coffre et comment la part réservée est répartie.

## Testez votre compréhension

NU6 a mis en place le coffre du fonds de développement différé sans préciser qui le contrôle. Pourquoi une mise à niveau créerait-elle une réserve en laissant délibérément sa gouvernance pour plus tard ?

<details>
<summary>Réponse</summary>

La création de la réserve a garanti qu'une part de l'émission serait mise de côté à l'intérieur du protocole au lieu d'être versée à des bénéficiaires fixes. Décider qui contrôle ces fonds et comment ils sont débloqués est une question de gouvernance plus difficile. NU6 l'a délibérément laissée ouverte, et NU6.1 y a répondu : 8 % de la subvention de bloc continuent d'aller à Zcash Community Grants, et 12 % vont à un fonds contrôlé par les détenteurs de pièces, alimenté initialement par le coffre.
</details>

### Ressources

[ZIP 253 : Déploiement de la mise à niveau du réseau NU6](https://zips.z.cash/zip-0253)

[ZIP 236 : Les blocs doivent être exactement équilibrés](https://zips.z.cash/zip-0236)

[ZIP 1015 : Allocation de la subvention de bloc pour le financement non direct du développement](https://zips.z.cash/zip-1015)

[ZIP 2001 : Flux de financement vers le coffre](https://zips.z.cash/zip-2001)

[Mise à niveau du réseau 6 (NU6)](https://z.cash/upgrade/nu6/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Fonds de développement](../start-here/development-fund)

[Politique monétaire de Zcash](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Que sont ZEC et Zcash](../start-here/what-is-zec-and-zcash)

---

## Pages connexes

| Page | Pourquoi elle est liée |
|---|---|
| [Canopy](./Canopy.md) | A créé le fonds de développement que NU6 a restructuré |
| [NU6.1](./NU6_1.md) | A décidé qui contrôle les fonds du coffre |
| [NU6.2](./NU6_2.md) | La mise à niveau de réparation d'urgence de Orchard dans la même série |
| [Fonds de développement](../start-here/development-fund) | L'historique du financement à l'origine de la part de 20 % |


Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [NU5](../zcash-tech/nu5) · Suivant : [NU6.1](../zcash-tech/nu6-1)
