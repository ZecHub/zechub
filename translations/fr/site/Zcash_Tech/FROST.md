<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>
# FROST


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) est un protocole de signature à seuil et de génération distribuée de clés : plusieurs signataires détiennent chacun une part d’une clé privée commune, et un nombre seuil d’entre eux doit coopérer pour produire une signature.
* Comme le résultat est une signature Schnorr unique, une transaction réalisée de cette manière ressemble à une transaction ordinaire sur le réseau.
* Il nécessite un minimum de tours de communication, peut s’exécuter en parallèle, et peut identifier puis exclure un participant malveillant.
* Pour Zcash, cela signifie que FROST permet à plusieurs parties géographiquement séparées de contrôler l’autorité de dépense de ZEC protégés — utile pour la garde, l’entiercement, les services non dépositaires et les Zcash Shielded Assets (ZSA).
* Il a été créé par Chelsea Komlo (University of Waterloo, Zcash Foundation) et Ian Goldberg (University of Waterloo).

## Explication de base

### Qu’est-ce qu’une signature Schnorr ?

Une signature numérique Schnorr est un ensemble d’algorithmes : (KeyGen, Sign, Verify).

Les signatures Schnorr présentent plusieurs avantages. L’un des principaux est que lorsque plusieurs clés sont utilisées pour signer le même message, les signatures résultantes peuvent être combinées en une seule signature. Cela peut réduire considérablement la taille des paiements multisig et d’autres transactions liées au multisig.

### Qu’est-ce que FROST ?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Créé par Chelsea Komlo (University of Waterloo, Zcash Foundation) et Ian Goldberg (University of Waterloo).*

FROST est un protocole de signature à seuil et de génération distribuée de clés qui nécessite un minimum de tours de communication et peut être exécuté en parallèle. Le protocole FROST est une version à seuil du schéma de signature Schnorr.

Contrairement aux signatures dans un cadre à partie unique, les signatures à seuil nécessitent la coopération d’un nombre seuil de signataires, chacun détenant une part d’une clé privée commune.

[Que sont les signatures à seuil ? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Par conséquent, la génération de signatures dans un cadre à seuil entraîne un surcoût dû aux tours réseau entre les signataires, ce qui la rend coûteuse lorsque les parts secrètes sont stockées sur des appareils à capacité réseau limitée ou lorsque la coordination a lieu sur des réseaux peu fiables.

La surcharge réseau pendant les opérations de signature est réduite grâce à l’utilisation d’une nouvelle technique qui protège contre les attaques de falsification et qui est également applicable à d’autres schémas.

FROST améliore les protocoles de signature à seuil en permettant qu’un nombre illimité d’opérations de signature soient effectuées en toute sécurité en parallèle (concurrence).

Il peut être utilisé soit comme un protocole à 2 tours, où les signataires envoient et reçoivent 2 messages au total, soit comme un protocole de signature optimisé à tour unique avec une étape de prétraitement.

FROST obtient en partie ses gains d’efficacité en permettant au protocole d’interrompre l’exécution en présence d’un participant malveillant, qui est ensuite identifié et exclu des opérations futures.

Des preuves de sécurité démontrant que FROST est sûr contre les attaques à message choisi, en supposant que le problème du logarithme discret est difficile et que l’adversaire contrôle moins de participants que le seuil, sont fournies [ici](https://eprint.iacr.org/2020/852.pdf#page=16).

### Comment fonctionne FROST ?

Le protocole FROST contient deux composantes importantes :

D’abord, n participants exécutent un protocole de génération distribuée de clés (DKG) afin de générer une clé de vérification commune. À la fin, chaque participant obtient une part de clé secrète privée et une part de clé de vérification publique.

Ensuite, n’importe quels t participants parmi n peuvent exécuter un protocole de signature à seuil afin de générer collaborativement une signature Schnorr valide.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Visuel / Analogie

Imaginez FROST comme un coffre-fort qui ne s’ouvre que lorsque plusieurs détenteurs de clés autorisés tournent leurs clés ensemble — mais tous les détenteurs de clés ne sont pas nécessaires ; seulement un nombre défini (par exemple, 3 sur 5). Une fois le coffre ouvert, un observateur extérieur ne peut pas savoir quels détenteurs de clés étaient présents, ni même que plusieurs personnes étaient impliquées. De la même manière, un groupe peut autoriser conjointement une transaction Zcash tandis que le réseau ne voit qu’une seule signature à l’apparence ordinaire.

## Approfondissement

**Génération distribuée de clés (DKG)**

L’objectif de cette phase est de générer des parts de clé secrète de longue durée et une clé de vérification conjointe. Cette phase est exécutée par n participants.

FROST construit sa propre phase de génération de clés sur le DKG de Pedersen (GJKR03), qui utilise à la fois le partage de secret de Shamir et les schémas de partage de secret vérifiable de Feldman comme sous-routines. En outre, chaque participant doit démontrer la connaissance de son propre secret en envoyant une preuve à divulgation nulle de connaissance aux autres participants, qui est elle-même une signature Schnorr. Cette étape supplémentaire protège contre les attaques par clé malveillante lorsque t ≥ n/2.

À la fin du protocole DKG, une clé de vérification conjointe vk est générée. Chaque participant Pᵢ détient une valeur (i, skᵢ ) qui constitue sa part secrète de longue durée ainsi qu’une part de clé de vérification vkᵢ = skᵢ *G. La part de clé de vérification vkᵢ du participant Pᵢ est utilisée par les autres participants pour vérifier la validité des parts de signature de Pᵢ pendant la phase de signature, tandis que la clé de vérification vk est utilisée par des parties externes pour vérifier les signatures émises par le groupe.

**Signature à seuil**

Cette phase s’appuie sur des techniques connues qui emploient le partage additif de secret et la conversion de parts pour générer de manière non interactive le nonce de chaque signature. Elle exploite également des techniques de liaison afin d’éviter les attaques de falsification connues sans limiter la concurrence.

Lors de l’étape de prétraitement, chaque participant prépare un nombre fixe de paires de points de courbe elliptique (EC) pour une utilisation ultérieure. Cette étape est exécutée une seule fois pour plusieurs phases de signature à seuil.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Tour de signature 1 : Chaque participant Pᵢ commence par générer une paire unique de nonces privés (dᵢ, eᵢ) ainsi que la paire correspondante de points EC (Dᵢ, Eᵢ), puis diffuse cette paire de points à tous les autres participants. Chaque participant stocke ces paires de points EC pour une utilisation ultérieure. Les tours de signature 2 et 3 constituent les opérations effectives dans lesquelles t participants parmi n coopèrent pour créer une signature Schnorr valide.

Tour de signature 2 : Les participants travaillent ensemble pour créer une signature Schnorr valide. La technique fondamentale derrière ce tour est le partage additif de secret t-sur-t.

Cette étape empêche les attaques de falsification, car les attaquants ne peuvent pas combiner des parts de signature issues d’opérations de signature distinctes ni permuter l’ensemble des signataires ou les points publiés pour chaque signataire.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Après avoir calculé le défi c, chaque participant peut calculer la réponse zᵢ en utilisant les nonces à usage unique et les parts secrètes de long terme, qui sont des parts secrètes de Shamir t-sur-n (de degré t-1) de la clé de long terme du groupe. À la fin du tour de signature 2, chaque participant diffuse zᵢ aux autres participants.

[Lire l’article complet](https://eprint.iacr.org/2020/852.pdf)
### Utilisation de FROST dans l’écosystème au sens large

**FROST chez [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Pour améliorer l’efficacité des systèmes de signatures à seuil de Coinbase, ils ont développé une version de FROST. Cette implémentation de Coinbase apporte de légères modifications par rapport au brouillon original de FROST.

Ils ont choisi de ne pas utiliser le rôle d’agrégateur de signatures. À la place, chaque participant est un agrégateur de signatures. Cette conception est plus sûre : tous les participants au protocole vérifient les calculs des autres, atteignant ainsi un niveau de sécurité plus élevé et réduisant les risques. L’étape de prétraitement à usage unique a également été supprimée pour accélérer l’implémentation, un troisième tour de signature étant utilisé à la place.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) par Blockstream**

Une amélioration spécifique à une application de FROST est proposée pour une utilisation sur la [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) pour Bitcoin.

« ROAST est une simple surcouche autour des schémas de signatures à seuil comme FROST. Il garantit qu’un quorum de signataires honnêtes, par exemple les fonctionnaires de Liquid, peut toujours obtenir une signature valide même en présence de signataires perturbateurs lorsque les connexions réseau ont une latence arbitrairement élevée. »

---

**FROST à l’IETF**

L’Internet Engineering Task Force, fondée en 1986, est la principale organisation d’élaboration de standards pour Internet. L’IETF développe des standards volontaires qui sont souvent adoptés par les utilisateurs d’Internet, les opérateurs de réseaux et les fournisseurs d’équipements, contribuant à façonner l’évolution d’Internet.

La version 11 de FROST (variante à deux tours) a été [soumise à l’IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Il s’agit d’une étape importante vers l’évaluation complète de FROST en tant que nouveau standard de schéma de signature à seuil destiné à être utilisé sur Internet, dans les appareils matériels et pour d’autres services dans les années à venir.


## Implications pratiques

Absolument oui. L’introduction de FROST dans Zcash permettra à plusieurs parties, séparées géographiquement, de contrôler l’autorité de dépense de ZEC protégés. Les transactions diffusées à l’aide de ce schéma de signature seront indiscernables des autres transactions sur le réseau, maintenant une forte résistance au suivi des paiements et limitant la quantité de données de blockchain disponibles pour l’analyse.

En pratique, cela permet de développer un large éventail de nouvelles applications sur le réseau, allant des fournisseurs d’entiercement à d’autres services non dépositaires.

FROST deviendra également un composant essentiel dans l’émission et la gestion sécurisées des Zcash Shielded Assets (ZSA), permettant une gestion plus sûre de l’autorité de dépense au sein des organisations de développement et des dépositaires de ZEC tels que les plateformes d’échange, tout en offrant également cette capacité aux utilisateurs de Zcash.

## Erreurs courantes

**Confondre FROST avec le multisig on-chain traditionnel**. Le multisig traditionnel peut révéler plusieurs signataires ou plusieurs signatures on-chain. FROST produit une signature Schnorr agrégée unique, de sorte qu’une transaction est indiscernable d’une transaction à signature unique.

**Supposer qu’un nombre inférieur au seuil peut signer**. Seul un nombre seuil (t-sur-n) de participants agissant ensemble peut produire une signature valide ; tout groupe plus petit ne le peut pas.

**Supposer que FROST cache tout off-chain**. FROST protège la signature on-chain, mais la coordination entre les signataires a toujours lieu off-chain et nécessite ses propres contrôles de confidentialité et de sécurité.


## Pages liées

- [Halo](/zcash-tech/halo) — le système de preuve sans confiance et récursif utilisé dans le pool Orchard de Zcash.
- [Viewing Keys](/zcash-tech/viewing-keys) — divulgation sélective pour les transactions protégées.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — là où FROST aide à gérer l’autorité de dépense/d’émission.
- [Synchronisation des portefeuilles Zcash](/zcash-tech/zcash-wallet-syncing) — un autre élément central de l’infrastructure de confidentialité de Zcash.


## Pour aller plus loin

[Article de Coinbase - Signatures à seuil](https://www.coinbase.com/blog/threshold-digital-signatures)

[Partage de secret de Shamir - Explication et exemple](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Courte vidéo sur les signatures numériques Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
