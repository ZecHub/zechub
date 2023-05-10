# FROST


## Qu'est-ce qu'une signature Schnorr ?

Une signature numérique Schnorr est un ensemble d'algorithmes : (KeyGen, Sign, Verify).

Les signatures Schnorr présentent plusieurs avantages. Un avantage clé est que lorsque plusieurs clés sont utilisées pour signer le même message, les signatures résultantes peuvent être combinées en une seule signature. Cela peut être utilisé pour réduire considérablement la taille des paiements multisig et d'autres transactions liées à multisig.


## Qu'est-ce que le FROST ?

**Signatures de seuil de Schnorr optimisées pour les rondes flexibles** -
*Créé par Chelsea Komlo (Université de Waterloo, Zcash Foundation) & Ian Goldberg (Université de Waterloo).*

FROST est un protocole de signature de seuil et de génération de clé distribuée qui offre un minimum de cycles de communication et est sécurisé pour être exécuté en parallèle. Le protocole FROST est une version seuil du schéma de signature Schnorr.

Contrairement aux signatures dans un cadre à partie unique, les signatures à seuil nécessitent une coopération entre un nombre seuil de signataires détenant chacun une part d'une clé privée commune.

[Que sont les signatures de seuil ? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Par conséquent, la génération de signatures dans un paramètre de seuil impose une surcharge en raison des rondes de réseau entre les signataires, ce qui s'avère coûteux lorsque les partages secrets sont stockés sur des appareils limités par le réseau ou lorsque la coordination se produit sur des réseaux non fiables.

La surcharge du réseau pendant les opérations de signature est réduite grâce à l'utilisation d'une nouvelle technique de protection contre les attaques de falsification applicables à d'autres schémas.
 
FROST améliore les protocoles de signature à seuil car un nombre illimité d'opérations de signature peuvent être effectuées en toute sécurité en parallèle (concurrence).
 
Il peut être utilisé soit comme un protocole à 2 tours où les signataires envoient et reçoivent 2 messages au total, soit optimisé pour un protocole de signature à un tour avec une étape de prétraitement.

FROST réalise ses améliorations d'efficacité en partie en permettant au protocole d'abandonner en présence d'un participant qui se comporte mal (qui est alors identifié et exclu des opérations futures).
 
Des preuves de sécurité démontrant que FROST est sécurisé contre les attaques par message choisi en supposant que le problème du logarithme discret est difficile et que l'adversaire contrôle moins de participants que le seuil sont fournies [ici](https://eprint.iacr.org/2020/852.pdf#page=16).


## Comment fonctionne FROST ?

Le protocole FROST contient deux composants importants :

Tout d'abord, n participants exécutent un *protocole de génération de clé distribuée (DKG)* pour générer une clé de vérification commune ; à la fin, chaque participant obtient un partage de clé secrète privée et un partage de clé de vérification publique.

Ensuite, tous les participants t-sur-n peuvent exécuter un * protocole de signature de seuil * pour générer en collaboration une signature Schnorr valide.

![Signe de seuil](https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg "thresholdsign")


**Génération de clé distribuée (DKG)**

L'objectif de cette phase est de générer des partages de clés secrètes à longue durée de vie et une clé de vérification conjointe. Cette phase est animée par n participants.

FROST construit sa propre phase de génération de clé sur [DKG de Pedersen (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/) dans laquelle il utilise à la fois le partage de secrets Shamir et les schémas de partage de secrets vérifiables de Feldman comme sous-programmes. De plus, chaque participant est tenu de démontrer la connaissance de son propre secret en envoyant aux autres participants une preuve de connaissance zéro, qui est elle-même une signature Schnorr. Cette étape supplémentaire protège contre les attaques par clé non autorisée dans le cadre où t ≥ n/2.

A la fin du protocole DKG, une clé de vérification conjointe vk est générée. De plus, chaque participant P ᵢ détient une valeur (i, sk ᵢ ) qui est leur part de secret à long terme et une part de clé de vérification vk ᵢ = sk ᵢ *G. La part de clé de vérification vk ᵢ du participant P ᵢ est utilisée par d'autres participants pour vérifier l'exactitude des parts de signature de P ᵢ lors de la phase de signature, tandis que la clé de vérification vk est utilisée par des parties externes pour vérifier les signatures émises par le groupe.

**Seuil de signature**

Cette phase s'appuie sur des techniques connues qui emploient un partage de secret additif et une conversion de partage pour générer de manière non interactive le nonce pour chaque signature. Cette phase exploite également les techniques de liaison pour éviter les attaques de falsification connues sans limiter la concurrence.

Prétraitement : dans la phase de prétraitement, chaque participant prépare un nombre fixe de paires de points de courbe elliptique (EC) pour une utilisation ultérieure, qui est exécutée une seule fois pour plusieurs phases de signature de seuil.

![Prétraitement](https://i.ibb.co/b5rJbXx/sign.png "signing protocol")

Signing Round 1 : chaque participant Pᵢ commence par générer une seule paire de nonce privée (dᵢ, eᵢ) et la paire correspondante de points EC (Dᵢ, Eᵢ) et diffuse cette paire de points à tous les autres participants. Chaque participant stocke ces paires de points EC reçus pour une utilisation ultérieure. Les cycles de signature 2 et 3 sont les opérations réelles dans lesquelles t participants sur n coopèrent pour créer une signature Schnorr valide.

Signing Round 2: Pour créer une signature Schnorr valide, tous les participants travaillent ensemble pour exécuter ce tour. La technique de base derrière ce cycle est le partage de secrets additif t-out-of-t.

Cette étape empêche l'attaque par falsification, car les attaquants ne peuvent pas combiner les partages de signature entre des opérations de signature distinctes ou permuter l'ensemble de signataires ou de points publiés pour chaque signataire.

![Protocole de signature](https://i.ibb.co/b5rJbXx/sign.png "protocole de signature")

Après avoir calculé le défi c, chaque participant est capable de calculer la réponse zᵢ au défi en utilisant les nonces à usage unique et les partages secrets à long terme, qui sont t-sur-n (degré t-1) partages secrets Shamir de la clé pérenne du groupe. À la fin du tour de signature 2, chaque participant diffuse zᵢ aux autres participants.

[Lire l'article complet](https://eprint.iacr.org/2020/852.pdf)


## Cela profite-t-il à Zcash ?

Absolument oui. L'introduction de FROST dans Zcash permettra à plusieurs parties, séparées géographiquement, de contrôler l'autorité de dépenses de la ZEC protégée. Un avantage étant que les transactions diffusées à l'aide de ce schéma de signature seront indiscernables des autres transactions sur le réseau, maintenant une forte résistance au suivi des paiements et limitant la quantité de données blockchain disponibles pour analyse.

Dans la pratique, cela permet de créer une multitude de nouvelles applications sur le réseau, allant des fournisseurs d'entiercement ou d'autres services non dépositaires.

FROST deviendra également un élément essentiel de l'émission et de la gestion sécurisées de Zcash Shielded Assets (ZSA) permettant une gestion plus sûre de l'autorité de dépenses au sein des organisations de développement et des dépositaires ZEC tels que les échanges en distribuant davantage la confiance tout en offrant cette capacité aux utilisateurs de Zcash également.


## Utilisation de FROST dans l'écosystème au sens large

**FROST dans [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Afin d'améliorer l'efficacité des systèmes de signature de seuil de Coinbase, ils ont développé une version de FROST. L'implémentation de Coinbase apporte de légères modifications par rapport au projet original de FROST.

Ils ont choisi de ne pas utiliser le rôle d'agrégateur de signatures. Au lieu de cela, chaque participant est un agrégateur de signatures. Cette conception est plus sécurisée : tous les participants du protocole vérifient ce que les autres ont calculé pour atteindre un niveau de sécurité plus élevé et réduire les risques. L'étape de prétraitement (unique) a également été supprimée afin d'accélérer la mise en œuvre, avec un troisième tour de signature à la place.

___

**[RÔTI](https://eprint.iacr.org/2022/550.pdf) par Blockstream**

Une amélioration spécifique à l'application sur FROST proposée pour une utilisation sur [Blockstream's Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) pour Bitcoin.

"ROAST est un simple wrapper autour des schémas de signature de seuil comme FROST. Il garantit qu'un quorum de signataires honnêtes, par exemple, les fonctionnaires de Liquid, peut toujours obtenir une signature valide même en présence de signataires perturbateurs lorsque les connexions réseau ont une latence arbitrairement élevée."

___

**GEL dans IETF**

L'Internet Engineering Task Force, fondée en 1986, est la première organisation de développement de normes pour Internet. L'IETF élabore des normes volontaires qui sont souvent adoptées par les utilisateurs d'Internet, les opérateurs de réseau et les fournisseurs d'équipements, et contribue ainsi à façonner la trajectoire du développement d'Internet.

FROST version 11 (variante à deux tours) a été [soumise à l'IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/).

Il s'agit d'une étape importante pour l'évaluation complète de FROST en tant que nouvelle norme de schéma de signature de seuil à utiliser sur Internet, dans les périphériques matériels et pour d'autres services dans les années à venir.
___


Apprentissage complémentaire :

[Article Coinbase - Signatures de seuil](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Explication et exemple](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Courte vidéo sur les signatures numériques Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___





