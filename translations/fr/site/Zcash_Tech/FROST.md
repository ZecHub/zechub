<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## En bref

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) est un protocole de signature à seuil et de génération distribuée de clés : plusieurs signataires détiennent chacun une part d'une clé privée commune, et un nombre seuil d'entre eux doit coopérer pour produire une seule signature.
* Comme le résultat est une seule signature Schnorr, une transaction réalisée de cette manière ressemble à une transaction ordinaire sur le réseau.
* Il nécessite un nombre minimal de tours de communication, peut s'exécuter en parallèle et permet d'identifier et d'exclure un participant malveillant.
* Pour Zcash, cela signifie que FROST permet à plusieurs parties, géographiquement séparées, de contrôler l'autorité de dépense de ZEC protégés, ce qui est utile pour la garde, le séquestre, les services non dépositaires et les Zcash Shielded Assets (ZSA).
* Il a été créé par Chelsea Komlo (Université de Waterloo, Zcash Foundation) et Ian Goldberg (Université de Waterloo).

## Explication principale

### Qu'est-ce qu'une signature Schnorr ?

Une signature numérique Schnorr est un ensemble d'algorithmes : (KeyGen, Sign, Verify).

Les signatures Schnorr présentent plusieurs avantages. L'un des principaux est que, lorsque plusieurs clés sont utilisées pour signer le même message, les signatures obtenues peuvent être combinées en une seule signature. Cela peut réduire considérablement la taille des paiements multisig et des autres transactions liées au multisig.

### Qu'est-ce que FROST ?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Créé par Chelsea Komlo (Université de Waterloo, Zcash Foundation) et Ian Goldberg (Université de Waterloo).*

FROST est un protocole de signature à seuil et de génération distribuée de clés qui nécessite un nombre minimal de tours de communication et peut être exécuté en parallèle. Le protocole FROST est une version à seuil du schéma de signature Schnorr.

Contrairement aux signatures dans un contexte à une seule partie, les signatures à seuil exigent la coopération d'un nombre seuil de signataires, chacun détenant une part d'une clé privée commune.

[Que sont les signatures à seuil ? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Par conséquent, la génération de signatures dans un contexte à seuil entraîne un surcoût dû aux tours de communication réseau entre les signataires, ce qui la rend coûteuse lorsque les parts secrètes sont stockées sur des appareils à connectivité limitée ou lorsque la coordination se fait sur des réseaux peu fiables.

Le surcoût réseau lors des opérations de signature est réduit grâce à une technique inédite qui protège contre les attaques par falsification et qui s'applique également à d'autres schémas.

FROST améliore les protocoles de signature à seuil en permettant d'effectuer en toute sécurité un nombre illimité d'opérations de signature en parallèle (concurrence).

Il peut être utilisé soit comme un protocole à 2 tours, dans lequel les signataires envoient et reçoivent 2 messages au total, soit comme un protocole de signature optimisé à un seul tour avec une étape de prétraitement.

FROST obtient ses gains d'efficacité en partie en permettant au protocole d'être interrompu en présence d'un participant malveillant, qui est alors identifié et exclu des opérations futures.

Les preuves de sécurité démontrant que FROST est sûr face aux attaques à messages choisis, en supposant que le problème du logarithme discret est difficile et que l'adversaire contrôle moins de participants que le seuil, sont disponibles [ici](https://eprint.iacr.org/2020/852.pdf#page=16).

### Comment fonctionne FROST ?

Le protocole FROST comporte deux composants importants :

D'abord, n participants exécutent un protocole de génération distribuée de clés (DKG) afin de générer une clé de vérification commune. À la fin, chaque participant obtient une part de clé secrète privée et une part de clé de vérification publique.

Ensuite, n'importe quel groupe de t participants parmi n peut exécuter un protocole de signature à seuil pour générer ensemble une signature Schnorr valide.

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## Représentation visuelle / analogie

Imaginez FROST comme un coffre-fort qui ne s'ouvre que lorsque plusieurs détenteurs de clés autorisés tournent leurs clés ensemble, sans que tous les détenteurs soient nécessaires : seul un nombre défini suffit (par exemple, 3 sur 5). Une fois le coffre ouvert, un observateur extérieur ne peut pas savoir quels détenteurs étaient présents, ni même que plusieurs personnes ont participé. De la même manière, un groupe peut autoriser conjointement une transaction Zcash tandis que le réseau ne voit qu'une seule signature d'apparence ordinaire.

## Approfondissement

**Génération distribuée de clés (DKG)**

L'objectif de cette phase est de générer des parts de clé secrète à long terme et une clé de vérification commune. Cette phase est exécutée par n participants.

FROST fonde sa propre phase de génération de clés sur la DKG de Pedersen (GJKR03), qui utilise comme sous-routines les schémas de partage de secret de Shamir et de partage de secret vérifiable de Feldman. En outre, chaque participant doit démontrer qu'il connaît son propre secret en envoyant aux autres participants une preuve à divulgation nulle de connaissance, qui est elle-même une signature Schnorr. Cette étape supplémentaire protège contre les attaques par clé malveillante lorsque t ≥ n/2.

À la fin du protocole DKG, une clé de vérification commune vk est générée. Chaque participant Pᵢ détient une valeur (i, skᵢ ) qui constitue sa part secrète à long terme, ainsi qu'une part de clé de vérification vkᵢ = skᵢ *G. La part de clé de vérification vkᵢ du participant Pᵢ est utilisée par les autres participants pour vérifier l'exactitude des parts de signature de Pᵢ pendant la phase de signature, tandis que la clé de vérification vk est utilisée par des parties externes pour vérifier les signatures émises par le groupe.

**Signature à seuil**

Cette phase s'appuie sur des techniques connues qui utilisent le partage de secret additif et la conversion de parts pour générer de manière non interactive le nonce de chaque signature. Elle exploite également des techniques de liaison pour éviter les attaques par falsification connues sans limiter la concurrence.

Lors de l'étape de prétraitement, chaque participant prépare un nombre fixe de paires de points de courbe elliptique (EC) pour une utilisation ultérieure. Cette étape s'exécute une seule fois pour plusieurs phases de signature à seuil.

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

Tour de signature 1 : chaque participant Pᵢ commence par générer une seule paire de nonces privés (dᵢ, eᵢ) et la paire de points EC correspondante (Dᵢ, Eᵢ), puis diffuse cette paire de points à tous les autres participants. Chaque participant stocke ces paires de points EC pour une utilisation ultérieure. Les tours de signature 2 et 3 sont les opérations proprement dites au cours desquelles t participants parmi n coopèrent pour créer une signature Schnorr valide.

Tour de signature 2 : les participants collaborent pour créer une signature Schnorr valide. La technique centrale de ce tour est le partage de secret additif t parmi t.

Cette étape empêche les attaques par falsification, car les attaquants ne peuvent ni combiner des parts de signature issues d'opérations de signature distinctes, ni permuter l'ensemble des signataires ou les points publiés par chaque signataire.

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

Après avoir calculé le défi c, chaque participant peut calculer la réponse zᵢ à l'aide des nonces à usage unique et des parts secrètes à long terme, qui sont des parts secrètes de Shamir t parmi n (de degré t-1) de la clé à long terme du groupe. À la fin du tour de signature 2, chaque participant diffuse zᵢ aux autres participants.

[Lire l'article complet](https://eprint.iacr.org/2020/852.pdf)

### Utilisation de FROST dans l'écosystème élargi

**FROST chez [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Pour améliorer l'efficacité des systèmes de signature à seuil de Coinbase, ils ont développé une version de FROST. Cette implémentation de Coinbase apporte de légères modifications par rapport au brouillon original de FROST.

Ils ont choisi de ne pas utiliser le rôle d'agrégateur de signatures. À la place, chaque participant est un agrégateur de signatures. Cette conception est plus sûre : tous les participants au protocole vérifient les calculs des autres, ce qui permet d'atteindre un niveau de sécurité plus élevé et de réduire les risques. L'étape de prétraitement unique a également été supprimée afin d'accélérer l'implémentation, un troisième tour de signature étant utilisé à la place.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) par Blockstream**

Une amélioration de FROST propre à une application est proposée pour une utilisation sur la [sidechain Liquid de Blockstream](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) pour Bitcoin.

« ROAST est une simple surcouche autour de schémas de signature à seuil comme FROST. Il garantit qu'un quorum de signataires honnêtes, p. ex. les fonctionnaires de Liquid, peut toujours obtenir une signature valide, même en présence de signataires perturbateurs, lorsque les connexions réseau ont une latence arbitrairement élevée. »

---

**FROST à l'IETF**

L'Internet Engineering Task Force, fondée en 1986, est la principale organisation de développement de normes pour Internet. L'IETF élabore des normes volontaires qui sont souvent adoptées par les utilisateurs d'Internet, les opérateurs de réseaux et les fabricants d'équipements, contribuant ainsi à façonner l'évolution d'Internet.

La version 11 de FROST (variante à deux tours) a été [soumise à l'IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Il s'agit d'une étape importante vers l'évaluation complète de FROST comme nouvelle norme de schéma de signature à seuil destinée à être utilisée sur Internet, dans les appareils matériels et pour d'autres services dans les années à venir.


## Implications pratiques

Absolument. L'introduction de FROST dans Zcash permettra à plusieurs parties, géographiquement séparées, de contrôler l'autorité de dépense de ZEC protégés. Les transactions diffusées à l'aide de ce schéma de signature seront impossibles à distinguer des autres transactions sur le réseau, ce qui maintient une forte résistance au traçage des paiements et limite la quantité de données de la blockchain disponibles pour l'analyse.

En pratique, cela permet de construire un large éventail de nouvelles applications sur le réseau, des services de séquestre à d'autres services non dépositaires.

FROST deviendra également un composant essentiel de l'émission et de la gestion sécurisées des Zcash Shielded Assets (ZSA), en permettant une gestion plus sûre de l'autorité de dépense au sein des organisations de développement et des dépositaires de ZEC tels que les exchanges, tout en offrant également cette capacité aux utilisateurs de Zcash.

## Erreurs courantes

**Confondre FROST avec le multisig on-chain traditionnel**. Le multisig traditionnel peut révéler plusieurs signataires ou plusieurs signatures on-chain. FROST produit une seule signature Schnorr agrégée, de sorte qu'une transaction est impossible à distinguer d'une transaction à signature unique.

**Supposer qu'un nombre inférieur au seuil peut signer**. Seul un nombre seuil (t parmi n) de participants agissant ensemble peut produire une signature valide ; un groupe plus petit ne le peut pas.

**Supposer que FROST masque tout hors chaîne**. FROST protège la signature on-chain, mais la coordination entre les signataires a toujours lieu hors chaîne et nécessite ses propres mesures de confidentialité et de sécurité.


## Pages connexes

- [Halo](/zcash-tech/halo) : le système de preuves récursif et sans tiers de confiance utilisé dans le pool Orchard de Zcash.
- [Viewing Keys](/zcash-tech/viewing-keys) : la divulgation sélective pour les transactions protégées.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) : là où FROST aide à gérer l'autorité de dépense et d'émission.
- [Synchronisation des portefeuilles Zcash](/zcash-tech/zcash-wallet-syncing) : un autre élément central de l'infrastructure de confidentialité de Zcash.


## Pour aller plus loin

[Article de Coinbase : les signatures à seuil](https://www.coinbase.com/blog/threshold-digital-signatures)

[Partage de secret de Shamir : explication et exemple](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Courte vidéo sur les signatures numériques Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
