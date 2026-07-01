<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# FROST 


## Qu'est-ce qu'une signature Schnorr ?

Une signature numérique Schnorr est un ensemble d'algorithmes : (KeyGen, Sign, Verify).

Les signatures Schnorr présentent plusieurs avantages. L'un des principaux avantages est que lorsque plusieurs clés sont utilisées pour signer le même message, les signatures résultantes peuvent être combinées en une seule signature. Cela peut être utilisé pour réduire considérablement la taille des paiements multisig et d'autres transactions liées au multisig.


## Qu'est-ce que FROST ?

**Flexible Round-Optimized Schnorr Threshold Signatures** -
*Créé par Chelsea Komlo (University of Waterloo, Zcash Foundation) et Ian Goldberg (University of Waterloo).*

FROST est un protocole de signature à seuil et de génération distribuée de clés qui offre un nombre minimal de tours de communication et dont l'exécution parallèle est sécurisée. Le protocole FROST est une version à seuil du schéma de signature Schnorr.

Contrairement aux signatures dans un cadre à partie unique, les signatures à seuil nécessitent la coopération d'un nombre seuil de signataires, chacun détenant une part d'une clé privée commune. 

[Que sont les signatures à seuil ? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Par conséquent, la génération de signatures dans un cadre à seuil impose une surcharge due aux tours réseau entre signataires, ce qui devient coûteux lorsque les parts secrètes sont stockées sur des appareils limités par le réseau ou lorsque la coordination se fait sur des réseaux peu fiables.

La surcharge réseau pendant les opérations de signature est réduite grâce à l'emploi d'une technique novatrice de protection contre les attaques par falsification applicable à d'autres schémas.
 
FROST améliore les protocoles de signature à seuil, car un nombre illimité d'opérations de signature peut être effectué en toute sécurité en parallèle (concurrence).
 
Il peut être utilisé soit comme protocole en 2 tours où les signataires envoient et reçoivent 2 messages au total, soit être optimisé en protocole de signature en un seul tour avec une étape de prétraitement. 

FROST obtient ses gains d'efficacité en partie en permettant au protocole d'interrompre l'exécution en présence d'un participant malveillant (qui est alors identifié et exclu des opérations futures).
 
Des preuves de sécurité démontrant que FROST est sécurisé contre les attaques à message choisi, en supposant que le problème du logarithme discret est difficile et que l'adversaire contrôle moins de participants que le seuil, sont fournies [ici](https://eprint.iacr.org/2020/852.pdf#page=16).


## Comment fonctionne FROST ?

Le protocole FROST contient deux composants importants :

Tout d'abord, n participants exécutent un *protocole de génération distribuée de clés (DKG)* afin de générer une clé de vérification commune ; à la fin, chaque participant obtient une part de clé secrète privée et une part de clé de vérification publique. 

Ensuite, n'importe quels t participants parmi n peuvent exécuter un *protocole de signature à seuil* afin de générer collaborativement une signature Schnorr valide. 

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

**Génération distribuée de clés (DKG)**

L'objectif de cette phase est de générer des parts de clé secrète durables et une clé de vérification conjointe. Cette phase est exécutée par n participants. 

FROST construit sa propre phase de génération de clés à partir de [Pedersens DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/)  dans lequel il utilise à la fois le partage de secret de Shamir et les schémas de partage de secret vérifiable de Feldman comme sous-routines. En outre, chaque participant doit démontrer la connaissance de son propre secret en envoyant aux autres participants une preuve à divulgation nulle de connaissance, qui est elle-même une signature Schnorr. Cette étape supplémentaire protège contre les attaques par rogue-key dans le cadre où t ≥ n/2.

À la fin du protocole DKG, une clé de vérification conjointe vk est générée. De plus, chaque participant P ᵢ détient une valeur (i, sk ᵢ ) qui constitue sa part secrète durable, ainsi qu'une part de clé de vérification vk ᵢ = sk ᵢ *G. La part de clé de vérification vk ᵢ du participant P ᵢ est utilisée par les autres participants pour vérifier la validité des parts de signature de P ᵢ lors de la phase de signature, tandis que la clé de vérification vk est utilisée par des parties externes pour vérifier les signatures émises par le groupe.

**Signature à seuil**

Cette phase s'appuie sur des techniques connues qui utilisent le partage additif de secrets et la conversion de parts pour générer de manière non interactive le nonce de chaque signature. Cette phase exploite également des techniques de liaison afin d'éviter des attaques de falsification connues sans limiter la concurrence.

Prétraitement : lors de l'étape de prétraitement, chaque participant prépare un nombre fixe de paires de points de courbe elliptique (EC) pour une utilisation ultérieure ; cette étape est exécutée une seule fois pour plusieurs phases de signature à seuil.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Tour de signature 1 : chaque participant Pᵢ commence par générer une paire unique de nonces privés (dᵢ, eᵢ) et la paire correspondante de points EC (Dᵢ, Eᵢ), puis diffuse cette paire de points à tous les autres participants. Chaque participant stocke ces paires de points EC reçues pour une utilisation ultérieure. Les tours de signature 2 et 3 sont les opérations effectives au cours desquelles t participants parmi n coopèrent pour créer une signature Schnorr valide.

Tour de signature 2 : pour créer une signature Schnorr valide, n'importe quels t participants collaborent pour exécuter ce tour. La technique centrale derrière ce tour est le partage additif de secrets t-sur-t.

Cette étape empêche les attaques par falsification, car les attaquants ne peuvent pas combiner des parts de signature issues d'opérations de signature distinctes ni permuter l'ensemble des signataires ou les points publiés pour chaque signataire. 

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Après avoir calculé le défi c, chaque participant est en mesure de calculer la réponse zᵢ au défi à l'aide des nonces à usage unique et des parts secrètes à long terme, qui sont des parts secrètes de Shamir t-sur-n (de degré t-1) de la clé durable du groupe. À la fin du tour de signature 2, chaque participant diffuse zᵢ aux autres participants.

[Lire l'article complet](https://eprint.iacr.org/2020/852.pdf)


## Est-ce bénéfique pour Zcash ?

Absolument oui. L'introduction de FROST dans Zcash permettra à plusieurs parties, géographiquement séparées, de contrôler l'autorité de dépense de ZEC blindés. Un avantage est que les transactions diffusées à l'aide de ce schéma de signature seront indiscernables des autres transactions sur le réseau, maintenant une forte résistance au suivi des paiements et limitant la quantité de données de blockchain disponibles pour l'analyse. 

En pratique, cela permet de créer sur le réseau toute une série de nouvelles applications, allant des prestataires d'entiercement à d'autres services non dépositaires. 

FROST deviendra également un composant essentiel dans l'émission et la gestion sécurisées des Zcash Shielded Assets (ZSA), permettant une gestion plus sûre de l'autorité de dépense au sein des organisations de développement et des dépositaires de ZEC tels que les plateformes d'échange, tout en fournissant également cette capacité aux utilisateurs de Zcash. 


## Utilisation de FROST dans l'écosystème plus large

**FROST dans [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Afin d'améliorer l'efficacité des systèmes de signature à seuil de Coinbase, ils ont développé une version de FROST. L'implémentation de Coinbase apporte de légères modifications par rapport au brouillon original de FROST.

Ils ont choisi de ne pas utiliser le rôle d'agrégateur de signatures. À la place, chaque participant est un agrégateur de signatures. Cette conception est plus sécurisée : tous les participants du protocole vérifient ce que les autres ont calculé afin d'atteindre un niveau de sécurité plus élevé et de réduire les risques. L'étape de prétraitement (à usage unique) a également été supprimée afin d'accélérer l'implémentation, avec un troisième tour de signature à la place.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) par Blockstream** 

Une amélioration spécifique à une application de FROST proposée pour une utilisation sur la [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) pour Bitcoin.

« ROAST est un simple wrapper autour de schémas de signature à seuil comme FROST. Il garantit qu'un quorum de signataires honnêtes, par exemple les fonctionnaires de Liquid, peut toujours obtenir une signature valide même en présence de signataires perturbateurs lorsque les connexions réseau ont une latence arbitrairement élevée. » 

___

**FROST à l'IETF**

L'Internet Engineering Task Force, fondée en 1986, est la principale organisation de développement de standards pour Internet. L'IETF élabore des standards volontaires qui sont souvent adoptés par les utilisateurs d'Internet, les opérateurs réseau et les fournisseurs d'équipements, et contribue ainsi à façonner la trajectoire du développement d'Internet.

La version 11 de FROST (variante à deux tours) a été [soumise à l'IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). 

Il s'agit d'une étape importante pour l'évaluation complète de FROST en tant que nouvelle norme de schéma de signature à seuil destinée à être utilisée sur Internet, dans les appareils matériels et dans d'autres services dans les années à venir. 
___


Pour aller plus loin :

[Article de Coinbase - Signatures à seuil](https://www.coinbase.com/blog/threshold-digital-signatures)

[Partage de secret de Shamir - Explication et exemple](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Courte vidéo sur les signatures numériques Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
