<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# NU6

> NU6 a été activée sur le mainnet de Zcash au bloc 2,726,400 (23 novembre 2024 UTC).

Ce que vous allez retenir : comment Zcash continue de financer son propre développement après un halving, pourquoi il a mis de côté une réserve dont il ne savait pas encore comment l’utiliser, et comment il a rendu l’offre totale de ZEC exactement prévisible.

NU6 est une [mise à niveau du réseau](../start-here/network-upgrades) Zcash, déployée par [ZIP 253](https://zips.z.cash/zip-0253), qui a été activée sur le mainnet en novembre 2024 au bloc 2,726,400. Il s’agit d’une mise à niveau monétaire et de [financement du développement](../start-here/development-fund) : elle a maintenu une part de la subvention de bloc destinée au développement au-delà du halving de novembre 2024, mis en place une réserve intégrée au protocole pour une utilisation future décidée par la communauté, et resserré la manière dont les nouveaux ZEC sont comptabilisés. NU6 a été soutenue à la fois par Electric Coin Company et par la Zcash Foundation.

Pourquoi c’est important. Le [Development Fund](../zcash-tech/canopy) de Zcash devait prendre fin autour du halving de novembre 2024, le deuxième de son histoire. NU6 a maintenu ce financement, mais au lieu de remettre chaque coin à des bénéficiaires fixes, elle en a réservé une partie au sein du protocole afin que la communauté puisse décider plus tard quoi en faire. Elle a aussi comblé un discret écart de comptabilité, de sorte que la quantité totale de ZEC qui existera un jour peut désormais être prédite avec exactitude.

## Ce que NU6 a changé

NU6 a continué à envoyer 20 % de la subvention de bloc au financement du développement après le halving de novembre 2024, une règle définie dans [ZIP 1015](https://zips.z.cash/zip-1015). Elle a réparti ces 20 % de deux façons.

1. 8 % de la subvention de bloc vont à Zcash Community Grants (ZCG), qui finance des travaux par et pour la communauté.
2. 12 % vont dans une nouvelle réserve intégrée au protocole, conservée pour une utilisation future décidée par la communauté.

Le reste de la subvention de bloc, ainsi que les frais de transaction, va aux mineurs qui sécurisent le réseau. NU6 a également mis à jour les règles existantes des funding streams et du Development Fund (ZIP 207 et ZIP 214) pour les adapter à cette nouvelle structure.

![Répartition du Development Fund dans NU6 : 20 pour cent de la subvention de bloc vont au développement, avec 8 pour cent pour Zcash Community Grants et 12 pour cent dans le Deferred Dev Fund Lockbox](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## La réserve différée

La part de 12 % est la nouveauté de NU6. Au lieu d’être versée à une adresse bénéficiaire, cette valeur est déposée directement dans un pool intégré au protocole appelé Deferred Dev Fund Lockbox, défini dans [ZIP 2001](https://zips.z.cash/zip-2001).

1. La lockbox est un nouveau type de funding stream (`DEFERRED_POOL`), où la valeur de la récompense de bloc va dans le protocole lui-même, et non à une personne ou à une organisation.
2. Le réseau la suit comme son propre solde de pool de valeur de chaîne, de la même manière qu’il suit les soldes des pools shielded.
3. NU6 a créé la lockbox intentionnellement mais a laissé la question difficile ouverte : qui contrôle ces fonds, et comment sont-ils débloqués ?

Cette question a reçu une réponse plus tard avec [NU6.1](../zcash-tech/nu6-1), qui a défini la gouvernance : elle a poursuivi le flux de 8 % de la subvention de bloc vers Zcash Community Grants et orienté un flux de 12 % vers un fonds contrôlé par les détenteurs de coins, alimenté par la lockbox.

## Équilibrer les comptes

NU6 a également comblé une lacune comptable dans la manière dont les nouveaux ZEC sont créés, définie dans [ZIP 236](https://zips.z.cash/zip-0236). Les transactions coinbase sont les transactions spéciales qui versent les nouveaux ZEC et les frais de chaque bloc.

1. Avant NU6, une transaction coinbase devait seulement ne pas réclamer plus que ce qui lui était dû. Un mineur pouvait réclamer moins que la subvention complète, ce qui brûlait discrètement ces ZEC.
2. Après NU6, une transaction coinbase doit s’équilibrer exactement : la valeur totale de sortie doit être égale à la subvention du mineur plus les frais, ni plus ni moins.
3. Comme les mineurs ne peuvent plus sous-réclamer et brûler accidentellement des ZEC, la quantité totale de ZEC qui existera un jour peut désormais être prédite exactement.

![Équilibrage des transactions coinbase avant et après NU6 : avant, coinbase pouvait sous-réclamer et brûler des ZEC, donc l’offre n’était pas exactement prévisible. Après, coinbase doit s’équilibrer exactement, donc l’émission est exactement prévisible](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## Comment le financement a évolué

NU6 est un chapitre d’une histoire plus longue sur la manière dont Zcash se finance lui-même.

1. Canopy (2020) a mis fin à la founders reward d’origine et a créé le [Development Fund](../start-here/development-fund).
2. NU6 (novembre 2024) a restructuré ce financement après le deuxième halving et mis en place le Deferred Dev Fund Lockbox, en réservant une part de l’émission pour de futures subventions décidées par la communauté.
3. NU6.1 (2025) a répondu à la question laissée ouverte par NU6, à savoir qui contrôle les fonds réservés, en maintenant 8 % de la subvention de bloc vers Zcash Community Grants et en orientant 12 % vers un fonds contrôlé par les détenteurs de coins, alimenté par la lockbox.

![Comment le financement de Zcash a évolué : Canopy a créé le Development Fund, NU6 a mis en place la lockbox, et NU6.1 a défini les règles sur qui la contrôle](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## Glossaire

| Terme | Signification en langage simple |
|---|---|
| Block subsidy | Les nouveaux ZEC créés avec chaque bloc miné |
| Coinbase transaction | La transaction spéciale qui verse la subvention et les frais d’un bloc |
| Deferred Dev Fund Lockbox | Une réserve intégrée au protocole qui conserve une part de l’émission pour une utilisation future décidée par la communauté |
| Zcash Community Grants (ZCG) | Un comité qui finance des travaux par et pour la communauté Zcash |
| Consensus branch id | L’identifiant que les nœuds utilisent pour savoir quelles règles de mise à niveau un bloc suit |
| Network upgrade (NU) | Un changement coordonné des règles de consensus de Zcash, activé à une hauteur de bloc définie |

## FAQ

NU6 modifie-t-elle mes ZEC ou ma confidentialité ? Non. NU6 concerne la manière dont le développement est financé et dont l’émission est comptabilisée, pas vos transactions ni votre confidentialité. Vos fonds et vos transactions shielded ne sont pas affectés.

D’où vient le financement ? De la subvention de bloc, les nouveaux ZEC émis à mesure que les blocs sont minés. Une part de 20 % est dirigée vers le développement au lieu d’aller entièrement aux mineurs.

À quoi sert la lockbox ? Elle réserve une part de l’émission au sein du protocole afin que la communauté puisse décider plus tard comment l’utiliser. NU6 a mis cette réserve de côté, et NU6.1 a défini les règles sur qui la contrôle.

La règle d’équilibre exact modifie-t-elle mes coins ? Non. Elle exige seulement que la transaction coinbase de chaque bloc verse exactement ce qui lui est dû. Elle affecte la comptabilité des nouvelles émissions, pas les soldes existants.

Qu’est-ce qui définit techniquement NU6 ? NU6 est déployée par ZIP 253, qui fixe son activation sur le mainnet au bloc 2,726,400 ainsi que son consensus branch id. Les changements de consensus eux-mêmes viennent de ZIP 236, ZIP 1015 et ZIP 2001, avec ZIP 207 et ZIP 214 mis à jour pour s’y adapter.

Quelle est la différence entre NU6 et NU6.1 ? NU6 a restructuré le financement et créé la lockbox. NU6.1 a décidé qui contrôle les fonds de la lockbox et comment la part réservée est répartie.

## Testez votre compréhension

NU6 a mis en place le Deferred Dev Fund Lockbox mais n’a pas indiqué qui le contrôle. Pourquoi une mise à niveau créerait-elle une réserve et laisserait-elle volontairement sa gouvernance à plus tard ?

<details>
<summary>Réponse</summary>

Créer la réserve a permis d’ancrer le fait qu’une part de l’émission serait mise de côté à l’intérieur du protocole au lieu d’être versée à des bénéficiaires fixes. Décider qui contrôle ces fonds et comment ils sont débloqués est une question de gouvernance plus difficile. NU6 l’a volontairement laissée ouverte, et NU6.1 y a répondu : 8 % de la subvention de bloc continuent d’aller à Zcash Community Grants, et 12 % vont à un fonds contrôlé par les détenteurs de coins, alimenté par la lockbox.
</details>

### Ressources

[ZIP 253: Déploiement de la mise à niveau réseau NU6](https://zips.z.cash/zip-0253)

[ZIP 236: Les blocs doivent s’équilibrer exactement](https://zips.z.cash/zip-0236)

[ZIP 1015: Répartition de la subvention de bloc pour le financement du développement non direct](https://zips.z.cash/zip-1015)

[ZIP 2001: Funding Streams de lockbox](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Politique monétaire de Zcash](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Qu’est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [NU5](../zcash-tech/nu5) · Suivant : [NU6.1](../zcash-tech/nu6-1)
