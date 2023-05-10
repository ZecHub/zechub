# Halo


## Qu'est-ce qu'Halo ?

Halo est une preuve de connaissance zéro récursive et sans confiance (ZKP) découverte par Sean Bowe chez Electric Coin Co. Elle élimine la configuration de confiance et permet une plus grande évolutivité de la blockchain Zcash. Halo a été le premier système de preuve sans connaissance à la fois efficace et récursif largement considéré comme une percée scientifique.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Composants**

Schéma d'engagement polynomial succinct : permet à un committer de s'engager sur un polynôme avec une chaîne courte qui peut être utilisée par un vérificateur pour confirmer les évaluations revendiquées du polynôme engagé.

Polynomial Interactive Oracle Proof : le vérificateur demande au prouveur (algorithme) d'ouvrir tous les engagements à divers points de son choix à l'aide d'un schéma d'engagement polynomial et vérifie que l'identité est vraie entre eux.


### Aucune configuration approuvée

Les zkSNARK s'appuient sur une chaîne de référence commune (CRS) en tant que paramètre public pour prouver et vérifier. Ce CRS doit être généré à l'avance par une partie de confiance. Jusqu'à récemment, des calculs multipartites sécurisés (MPC) élaborés comme ceux effectués par le réseau Aztec et Zcash étaient nécessaires pour atténuer le risque encouru lors de cette [cérémonie de configuration de confiance](https://zkproof.org/2021/06/30/setup-cérémonies/amp/).

Auparavant, les piscines blindées Sprout & Sapling de Zcash utilisaient les systèmes de vérification BCTV14 & Groth 16 zk. Bien que ceux-ci soient sécurisés, il y avait des limites. Ils n'étaient pas évolutifs car ils étaient liés à une seule application, les "déchets toxiques" (restes de matériel cryptographique générés lors de la cérémonie de genèse) pouvaient persister, et il y avait un élément de confiance (quoique infime) pour que les utilisateurs jugent la cérémonie acceptable .

En regroupant à plusieurs reprises plusieurs instances de problèmes difficiles ensemble sur des cycles de courbes elliptiques afin que les preuves informatiques puissent être utilisées pour raisonner sur elles-mêmes efficacement (amortissement imbriqué), le besoin d'une configuration de confiance est éliminé. Cela signifie également que la chaîne de référence structurée (sortie de la cérémonie) peut être mise à niveau pour permettre des applications telles que les contrats intelligents.

Halo fournit aux utilisateurs deux garanties importantes concernant la sécurité du système de preuve à grande échelle sans connaissance. Premièrement, il permet aux utilisateurs de prouver qu'aucune personne impliquée dans la cérémonie de genèse n'a créé de porte dérobée secrète pour exécuter des transactions frauduleuses. Deuxièmement, cela permet aux utilisateurs de démontrer que le système est resté sécurisé au fil du temps, même s'il a subi des mises à jour et des modifications.

[Explication de Sean Bowes sur Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)
 


### Preuves récursives

La composition de preuves récursives permet à une seule preuve d'attester de l'exactitude d'autres preuves pratiquement illimitées, ce qui permet de compresser une grande quantité de calculs (et d'informations). Il s'agit d'un composant essentiel pour l'évolutivité, notamment parce qu'il nous permet de faire évoluer horizontalement le réseau tout en permettant à des poches de participants de faire confiance à l'intégrité du reste du réseau.

Avant Halo, la réalisation d'une composition de preuve récursive nécessitait d'importantes dépenses de calcul et une configuration fiable. L'une des principales découvertes a été une technique appelée "amortissement imbriqué". Cette technique permet une composition récursive utilisant le schéma d'engagement polynomial basé sur l'argument du produit interne, améliorant considérablement les performances et évitant la configuration de confiance.

Dans l'[article Halo](https://eprint.iacr.org/2019/1021.pdf), nous avons entièrement décrit ce schéma d'engagement polynomial et découvert qu'il existait une nouvelle technique d'agrégation. La technique permet à un grand nombre de preuves créées indépendamment d'être vérifiées presque aussi rapidement que la vérification d'une seule preuve. Cela seul offrirait une meilleure alternative aux anciens zk-SNARK utilisés dans Zcash.


###Halo 2

Halo 2 est une implémentation zk-SNARK hautes performances écrite en Rust qui élimine le besoin d'une configuration de confiance tout en préparant le terrain pour l'évolutivité dans Zcash.

![halo2image](https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg "halo2")

Il comprend une généralisation de notre approche appelée « schéma d'accumulation ». Cette nouvelle formalisation expose le fonctionnement réel de notre technique d'amortissement imbriqué ; en ajoutant des preuves à un objet appelé "accumulateur", où les preuves raisonnent sur l'état précédent de l'accumulateur, nous pouvons vérifier que toutes les preuves précédentes étaient correctes (par induction) simplement en vérifiant l'état actuel de l'accumulateur.

![Accumulateurimage](https://i.imgur.com/l4HrYgE.png "accumulateur")

En parallèle, de nombreuses autres équipes découvraient de nouveaux IOP polynomiaux plus efficaces que Sonic (utilisé dans Halo 1), comme Marlin.

Le plus efficace de ces nouveaux protocoles est PLONK, qui offre une énorme flexibilité dans la conception d'implémentations efficaces basées sur les besoins spécifiques à l'application et offrant un temps de preuve 5 fois supérieur de Sonic.

[Aperçu de PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Comment cela profite-t-il à Zcash ?

Le pool Orchard Shielded activé avec NU5 & est la mise en œuvre de ce nouveau système de preuve sur le réseau Zcash. Gardé par la même conception de tourniquet que celle utilisée entre Sprout et Sapling avec l'intention de retirer progressivement les anciennes piscines blindées. Cela encourage la migration vers un système de preuve entièrement sans confiance, renforçant la confiance dans la solidité de la base monétaire et réduisant la complexité de la mise en œuvre et la surface d'attaque de Zcash dans son ensemble. Suite à l'activation de NU5 mi 2022, l'intégration de preuves récursives est devenue possible (bien que ce ne soit pas complet). Plusieurs améliorations de la confidentialité ont également été apportées de manière tangentielle. L'introduction d''Actions' pour remplacer les entrées/sorties a permis de réduire la quantité de métadonnées de transaction.

Les configurations de confiance sont généralement difficiles à coordonner et présentent un risque systémique. Il serait nécessaire de les répéter pour chaque mise à jour majeure du protocole. Leur suppression présente une amélioration substantielle pour la mise en œuvre en toute sécurité de nouvelles mises à niveau de protocole.

La composition de preuves récursives a le potentiel de compresser des quantités illimitées de calculs, de créer des systèmes distribués auditables, ce qui rend Zcash très performant, en particulier avec le passage à la preuve de participation. Ceci est également utile pour les extensions telles que Zcash Shielded Assets et l'amélioration de la capacité de la couche 1 à l'extrémité supérieure de l'utilisation complète des nœuds dans les années à venir pour Zcash.


## Halo dans l'écosystème au sens large

L'Electric Coin Company a conclu un accord avec Protocol Labs, la Fondation Filecoin et la Fondation Ethereum pour explorer la R&D Halo, y compris la manière dont la technologie pourrait être utilisée dans leurs réseaux respectifs. L'accord vise à fournir une meilleure évolutivité, interopérabilité et confidentialité à travers les écosystèmes et pour le Web 3.0.

De plus, Halo 2 est sous les [licences open source MIT et Apache 2.0](https://github.com/zcash/halo2#readme), ce qui signifie que n'importe qui dans l'écosystème peut construire avec le système de vérification.

### Filecoin

Depuis son déploiement, la bibliothèque halo2 a été adoptée dans des projets comme le zkEVM, il existe une intégration potentielle de Halo 2 dans le système de preuve pour la machine virtuelle Filecoin. Filecoin nécessite de nombreuses preuves coûteuses d'espace-temps / preuves de réplication. Halo2 jouera un rôle central dans la compression de l'utilisation de l'espace, une meilleure mise à l'échelle du réseau.

[Vidéo de la Fondation Filecoin avec Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

De plus, il serait très avantageux pour les écosystèmes Filecoin et Zcash que les paiements de stockage Filecoin puissent être effectués dans ZEC, offrant le même niveau de confidentialité pour les achats de stockage qui existe dans les transferts protégés Zcash. Cette prise en charge ajouterait la possibilité de crypter des fichiers dans le stockage Filecoin et ajouterait une prise en charge aux clients mobiles afin qu'ils puissent « attacher » des médias ou des fichiers à un mémo crypté Zcash.

[Article de blog ECC x Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Éthereum

Implémentation d'une preuve Halo 2 pour la fonction de retard vérifiable (VDF) efficace en cours de développement. Un VDF est une primitive cryptographique qui a de nombreux cas d'utilisation potentiels.

Il peut être utilisé comme source d'aléatoire à usage général, y compris l'utilisation dans les applications de contrats intelligents ainsi que l'élection du leader dans la preuve de participation sur Ethereum et d'autres protocoles.

ECC, la Filecoin Foundation, Protocol Labs et la Ethereum Foundation travailleront également avec [SupraNational](https://www.supranational.net/), un fournisseur spécialisé dans la cryptographie accélérée par le matériel, pour la conception potentielle de GPU et d'ASIC et Développement du VDF.

Le [Privacy and Scaling Exploration group](https://appliedzkp.org/) étudie également différentes manières dont les preuves Halo 2 peuvent améliorer la confidentialité et l'évolutivité de l'écosystème Ethereum. Ce groupe rejoint la fondation Ethereum et se concentre largement sur les preuves à connaissance nulle et les primitives cryptographiques.

## Autres projets utilisant Halo

+ [Anoma, un protocole d'échange atomique multichaîne préservant la confidentialité](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, un zkRollup L2 sur Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, une blockchain privée L1 zkEVM](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, un zkRollup L2 sur Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Apprentissage complémentaire** :

[Une introduction à zkp et halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 avec Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Blog explicatif technique](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Vitrine de la communauté Halo 2 - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentation**

[Ressources Halo 2](https://github.com/adria0/awesome-halo2)

[Documents Halo 2](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)


