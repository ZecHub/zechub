<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Halo


## Qu’est-ce que Halo ?

Halo est une preuve à divulgation nulle de connaissance (ZKP) récursive et sans confiance, découverte par Sean Bowe chez Electric Coin Co. Elle élimine la configuration de confiance et permet une plus grande scalabilité de la blockchain Zcash. Halo a été le premier système de preuve à divulgation nulle de connaissance à être à la fois efficace et récursif, largement considéré comme une percée scientifique.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Composants**

Schéma d’engagement polynomial succinct : permet à un engageur de s’engager sur un polynôme avec une courte chaîne pouvant être utilisée par un vérificateur pour confirmer les évaluations revendiquées du polynôme engagé.

Preuve interactive oracle polynomiale : le vérificateur demande au prouveur (algorithme) d’ouvrir tous les engagements en divers points de son choix à l’aide du schéma d’engagement polynomial et vérifie que l’identité reste vraie entre eux. 


### Aucune configuration de confiance

Les zkSNARKs reposent sur une chaîne de référence commune (CRS) comme paramètre public pour prouver et vérifier. Cette CRS doit être générée à l’avance par une partie de confiance. Jusqu’à récemment, des calculs multipartites sécurisés (MPC) élaborés, comme ceux réalisés par le réseau Aztec et Zcash, étaient nécessaires pour atténuer le risque impliqué lors de cette [cérémonie de trusted setup](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Auparavant, les pools protégés Sprout et Sapling de Zcash utilisaient les systèmes de preuve zk BCTV14 et Groth 16. Bien qu’ils fussent sûrs, ils présentaient des limites. Ils n’étaient pas scalables car liés à une seule application, les « déchets toxiques » (résidus du matériel cryptographique généré durant la cérémonie de genèse) pouvaient persister, et il subsistait un élément de confiance (bien que minime) pour que les utilisateurs jugent la cérémonie acceptable.

En faisant s’effondrer de manière répétée plusieurs instances de problèmes difficiles au fil de cycles de courbes elliptiques, de sorte que les preuves computationnelles puissent raisonner efficacement sur elles-mêmes (amortissement imbriqué), la nécessité d’une configuration de confiance est éliminée. Cela signifie également que la chaîne de référence structurée (sortie de la cérémonie) peut être mise à niveau, permettant des applications telles que les smart contracts.

Halo offre aux utilisateurs deux garanties importantes concernant la sécurité du système de preuve à divulgation nulle de connaissance à grande échelle. Premièrement, il permet aux utilisateurs de prouver qu’aucune personne impliquée dans la cérémonie de genèse n’a créé de porte dérobée secrète pour exécuter des transactions frauduleuses. Deuxièmement, il permet aux utilisateurs de démontrer que le système est resté sûr au fil du temps, même lorsqu’il a subi des mises à jour et des changements.

[Explication de Sean Bowe sur Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Preuves récursives

La composition récursive de preuves permet à une seule preuve d’attester l’exactitude d’un nombre pratiquement illimité d’autres preuves, ce qui permet de compresser une grande quantité de calculs (et d’informations). Il s’agit d’un composant essentiel pour la scalabilité, notamment parce qu’il nous permet de faire évoluer horizontalement le réseau tout en permettant à des groupes de participants de faire confiance à l’intégrité du reste du réseau.

Avant Halo, obtenir une composition récursive de preuves exigeait un coût computationnel élevé et une configuration de confiance. L’une des principales découvertes a été une technique appelée **amortissement imbriqué**. Cette technique permet une composition récursive à l’aide du schéma d’engagement polynomial fondé sur un argument de produit interne, améliorant massivement les performances et évitant la configuration de confiance.

Dans le [papier Halo](https://eprint.iacr.org/2019/1021.pdf), nous avons décrit en détail ce schéma d’engagement polynomial et découvert qu’une nouvelle technique d’agrégation y existait. Cette technique permet de vérifier un grand nombre de preuves créées indépendamment presque aussi rapidement que la vérification d’une seule preuve. Cela offrirait à lui seul une meilleure alternative aux anciens zk-SNARKs utilisés dans Zcash.


### Halo 2

Halo 2 est une implémentation zk-SNARK haute performance écrite en Rust qui élimine le besoin d’une configuration de confiance tout en préparant le terrain pour la scalabilité de Zcash. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

Elle inclut une généralisation de notre approche appelée **schéma d’accumulation**. Cette nouvelle formalisation montre comment fonctionne réellement notre technique d’amortissement imbriqué ; en ajoutant des preuves à un objet appelé **accumulateur,** où les preuves raisonnent sur l’état précédent de l’accumulateur, nous pouvons vérifier que toutes les preuves précédentes étaient correctes (par induction) simplement en vérifiant l’état actuel de l’accumulateur.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



En parallèle, de nombreuses autres équipes découvraient de nouveaux Polynomial IOPs plus efficaces que Sonic (utilisé dans Halo 1), comme Marlin. 

Le plus efficace de ces nouveaux protocoles est PLONK, qui offre une énorme flexibilité pour concevoir des implémentations efficaces en fonction des besoins spécifiques aux applications et fournit un temps de preuve 5x meilleur que Sonic.

[Présentation de PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Comment cela profite-t-il à Zcash ?

Le pool protégé Orchard a été activé avec NU5 et constitue l’implémentation de ce nouveau système de preuve sur le réseau Zcash. Il est protégé par le même mécanisme de tourniquet que celui utilisé entre Sprout et Sapling, avec l’intention de retirer progressivement les anciens pools protégés. Cela encourage la migration vers un système de preuve entièrement sans confiance, renforçant la confiance dans la solidité de la base monétaire et réduisant la complexité d’implémentation ainsi que la surface d’attaque de Zcash dans son ensemble. À la suite de l’activation de NU5 à la mi-2022, l’intégration des preuves récursives est devenue possible (bien que cela ne soit pas encore terminé). Plusieurs améliorations de la confidentialité ont également été apportées de manière connexe. L’introduction des « Actions » pour remplacer les entrées/sorties a contribué à réduire la quantité de métadonnées de transaction. 

Les configurations de confiance sont généralement difficiles à coordonner et présentaient un risque systémique. Il aurait été nécessaire de les répéter pour chaque mise à niveau majeure du protocole. Leur suppression constitue une amélioration substantielle pour mettre en œuvre en toute sécurité de nouvelles mises à niveau du protocole. 

La composition récursive de preuves offre le potentiel de compresser des quantités illimitées de calcul, de créer des systèmes distribués auditables, et de rendre Zcash hautement capable, en particulier avec le passage au Proof of Stake. Cela est également utile pour des extensions telles que les Zcash Shielded Assets et pour améliorer la capacité de la couche 1 à l’extrémité supérieure de l’utilisation des nœuds complets dans les années à venir pour Zcash.


## Halo dans l’écosystème au sens large 

Electric Coin Company a conclu un accord avec Protocol Labs, la Filecoin Foundation et l’Ethereum Foundation afin d’explorer la R&D autour de Halo, notamment la manière dont la technologie pourrait être utilisée dans leurs réseaux respectifs. L’accord vise à offrir une meilleure scalabilité, interopérabilité et confidentialité entre les écosystèmes et pour le Web 3.0.

De plus, Halo 2 est publié sous les [licences open source MIT et Apache 2.0](https://github.com/zcash/halo2#readme), ce qui signifie que toute personne de l’écosystème peut construire avec ce système de preuve.

### Filecoin

Depuis son déploiement, la bibliothèque halo2 a été adoptée dans des projets comme le zkEVM, et il existe un potentiel d’intégration de Halo 2 dans le système de preuve de la Filecoin Virtual Machine. Filecoin exige de nombreuses preuves coûteuses de spacetime / proofs of replication. Halo2 sera déterminant pour compresser l’utilisation de l’espace et mieux faire évoluer le réseau.

[Vidéo de la Filecoin Foundation avec Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

De plus, il serait très bénéfique pour les écosystèmes Filecoin et Zcash que les paiements de stockage Filecoin puissent être effectués en ZEC, offrant le même niveau de confidentialité pour les achats de stockage que celui qui existe dans les transferts protégés de Zcash. Ce support ajouterait la capacité de chiffrer des fichiers dans le stockage Filecoin et d’ajouter la prise en charge aux clients mobiles afin qu’ils puissent **joindre** des médias ou des fichiers à un mémo chiffré Zcash. 

[Article de blog ECC x Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Mise en œuvre en cours d’une preuve Halo 2 pour la Verifiable Delay Function (VDF) efficace en cours de développement. Une VDF est une primitive cryptographique qui possède de nombreux cas d’usage potentiels. 

Elle peut être utilisée comme source d’aléa à usage général, notamment dans les applications de smart contracts ainsi que pour l’élection des leaders dans le Proof of Stake sur Ethereum et d’autres protocoles.

ECC, la Filecoin Foundation, Protocol Labs et l’Ethereum Foundation travailleront également avec [SupraNational](https://www.supranational.net/), un fournisseur spécialisé dans la cryptographie accélérée par matériel, pour une éventuelle conception GPU et ASIC ainsi que le développement de la VDF.

Le groupe [Privacy and Scaling Exploration](https://appliedzkp.org/) recherche également différentes façons dont les preuves Halo 2 peuvent améliorer la confidentialité et la scalabilité pour l’écosystème Ethereum. Ce groupe relève de l’Ethereum Foundation et se concentre largement sur les preuves à divulgation nulle de connaissance et les primitives cryptographiques. 

## Autres projets utilisant Halo

+ [Anoma, un protocole d’échange atomique multichaîne préservant la confidentialité](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, un zkRollup L2 sur Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, une blockchain zkEVM L1 privée](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, un zkRollup L2 sur Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Pour aller plus loin**:

[Une introduction aux zkp et à halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 avec Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Article d’explication technique](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Présentation communautaire de Halo 2 - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentation**

[Ressources Halo 2](https://github.com/adria0/awesome-halo2)

[Documentation Halo 2](https://zcash.github.io/halo2/)

[GitHub Halo 2](https://github.com/zcash/halo2)
