<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## En bref

Halo est un système de preuve à divulgation nulle de connaissance (ZKP) récursif et sans tiers de confiance, découvert par Sean Bowe chez Electric Coin Co. Il supprime le besoin d’une configuration de confiance et rend la composition récursive de preuves réalisable en pratique. C’est le fondement de la feuille de route actuelle de Zcash en matière de mise à l’échelle et de sécurité.

- **Ce que c’est :** une construction zk-SNARK dotée d’une récursion efficace et sans cérémonie de configuration de confiance.
- **Pourquoi c’est important :** le pool protégé Orchard de Zcash, activé avec NU5 en 2022, repose sur Halo 2, l’implémentation de production issue de ces recherches.
- **Propriété clé :** aucun « déchet toxique » issu de cérémonies de configuration, et des preuves capables d’attester d’un nombre pratiquement illimité d’autres preuves.
- **Licence :** Halo 2 est open source sous [licences MIT et Apache 2.0](https://github.com/zcash/halo2#readme), si bien que n’importe quel acteur de l’écosystème peut s’appuyer dessus.

---

## Explication de base

Halo est un système de preuve à divulgation nulle de connaissance récursif et sans tiers de confiance, découvert par Sean Bowe chez Electric Coin Co. Il élimine la configuration de confiance et permet une meilleure mise à l’échelle de la blockchain Zcash. Halo a été le premier système de preuve à divulgation nulle de connaissance à la fois efficace et récursif, ce qui est largement considéré comme une percée scientifique.

![halo](/content-images/_unavailable.svg "halo")

### Les deux composants

- **Schéma d’engagement polynomial succinct.** Il permet à un auteur d’engagement de s’engager sur un polynôme au moyen d’une courte chaîne de caractères, qu’un vérificateur peut utiliser pour confirmer les évaluations annoncées du polynôme engagé.
- **Preuve interactive à oracle polynomial.** Le vérificateur demande au prouveur (un algorithme) d’ouvrir tous les engagements en des points de son choix, à l’aide du schéma d’engagement polynomial, puis vérifie que l’identité est bien satisfaite entre eux.

### Aucune configuration de confiance

Certaines constructions zk-SNARK, comme Groth16, nécessitent une configuration de confiance pour générer leurs paramètres publics, souvent appelés chaîne de référence commune (CRS). La CRS est partagée avec les prouveurs et les vérificateurs ; ce n’est pas elle, le secret qui doit être détruit. C’est le matériel secret intermédiaire (les « déchets toxiques ») produit par une telle configuration qui doit être éliminé. Un calcul multipartite sécurisé permet de répartir cette confiance : la cérémonie est sûre si au moins un participant suit le protocole et détruit sa contribution secrète. Consultez l’[explication des paramètres publics et des déchets toxiques](https://zodl.com/snark-parameters/) proposée par ECC.

Les anciens pools protégés Sprout et Sapling de Zcash utilisaient des systèmes de preuve à configuration de confiance, respectivement BCTV14 et Groth16. Leurs paramètres publics restent disponibles pour la génération et la vérification des preuves. La question est de savoir si du matériel secret de configuration a été conservé, ce qui pourrait permettre de produire de fausses preuves. La publication de la CRS elle-même est normale et ne révèle pas ce matériel secret.

Halo combine la composition récursive de preuves avec un schéma d’engagement polynomial fondé sur un argument de produit scalaire. Ses paramètres publics ne nécessitent ni cérémonie de configuration de confiance ni destruction d’une trappe secrète de configuration. Le [livre Halo 2 décrit ces paramètres publics de groupe](https://zcash.github.io/halo2/background/pc-ipa.html#setup). Ce n’est pas la même chose que de rendre évolutive une chaîne de référence structurée générée par une cérémonie.

Supprimer cette exigence de configuration évite que la sécurité des preuves Halo dépende de la destruction du matériel secret d’une cérémonie. Cela ne prouve pas qu’une cérémonie Sprout ou Sapling antérieure n’a pas été compromise, et ne garantit pas non plus que toutes les modifications ultérieures du protocole sont sûres. Les preuves récursives attestent des calculs encodés dans leurs circuits, dans le cadre des hypothèses du système de preuve. L’exactitude des circuits et des implémentations reste importante : l’[explication du déploiement de Halo 2](https://zodl.com/technical-explainer-halo-on-zcash/) publiée par ECC mentionne explicitement le risque de nouveaux bogues ou de défauts de conception.

[L’explication de Sean Bowe chez Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Illustration et analogie

### La chaîne de notaires

Considérez un zk-SNARK classique comme un document notarié : un tampon, une vérification, et c’est terminé. Imaginez maintenant que vous deviez prouver l’authenticité d’une pile de dix mille documents. Sans récursion, un vérificateur devrait contrôler chaque tampon.

Halo transforme chaque document vérifié en tampon apposé sur le document *suivant*, jusqu’à ce que toute la pile se réduise à un seul document portant un seul tampon. Il suffit de contrôler le dernier document pour faire confiance à toute la chaîne. Point essentiel : le notaire de Halo (le système de preuve) fabrique ses propres tampons sans jamais avoir besoin d’une autorité extérieure pour créer son sceau.

### Pourquoi la suppression de la configuration de confiance est importante

Dans les anciens systèmes à configuration de confiance, le « sceau » public (la CRS) provenait d’une cérémonie. Les participants devaient détruire leur matériel secret intermédiaire tout en laissant les paramètres publics disponibles. Halo se passe de cette cérémonie et de sa trappe secrète de configuration. Il reste néanmoins nécessaire de protéger les clés de dépense des utilisateurs et de vérifier les hypothèses et l’implémentation du système de preuve.

---

## Analyse approfondie

### Preuves récursives

La composition récursive de preuves permet à une seule preuve d’attester de la validité d’un nombre pratiquement illimité d’autres preuves, ce qui compresse une grande quantité de calculs (et d’informations). C’est un élément essentiel de la mise à l’échelle, car le réseau peut ainsi croître horizontalement tandis que des groupes de participants peuvent toujours se fier à l’intégrité du reste du réseau.

Avant Halo, la composition récursive de preuves exigeait des calculs très coûteux et une configuration de confiance. L’une des principales découvertes a été une technique appelée **amortissement imbriqué** : une composition récursive utilisant un schéma d’engagement polynomial fondé sur l’argument de produit scalaire, qui améliore considérablement les performances tout en évitant la configuration de confiance.

L’[article Halo](https://eprint.iacr.org/2019/1021.pdf) décrit entièrement ce schéma d’engagement polynomial et a révélé qu’il contenait une nouvelle technique d’agrégation. Cette technique permet de vérifier un grand nombre de preuves créées indépendamment presque aussi rapidement qu’une seule preuve. À elle seule, elle offrait déjà une meilleure solution que le zk-SNARKs utilisé auparavant dans Zcash.

### Halo 2

Halo 2 est une implémentation zk-SNARK haute performance écrite en Rust, qui élimine le besoin d’une configuration de confiance tout en préparant le terrain pour la mise à l’échelle de Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Il comprend une généralisation de cette approche, appelée **schéma d’accumulation**. Cette formalisation montre comment fonctionne réellement l’amortissement imbriqué : des preuves sont ajoutées à un objet appelé **accumulateur**, et chaque preuve porte sur l’état précédent de l’accumulateur. Toutes les preuves antérieures peuvent ainsi être vérifiées (par récurrence) en contrôlant simplement l’état actuel de l’accumulateur.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Parallèlement, de nombreuses autres équipes découvraient des IOP polynomiales plus efficaces que Sonic (utilisé dans Halo 1), comme Marlin. Le plus efficace de ces protocoles est PLONK, qui offre une flexibilité considérable pour concevoir des implémentations efficaces adaptées aux besoins de chaque application, avec un temps de génération des preuves 5× meilleur que Sonic.

[Présentation de PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo dans l’écosystème élargi

Electric Coin Company a conclu un accord avec Protocol Labs, la Filecoin Foundation et la Ethereum Foundation pour explorer la R&D sur Halo, y compris la manière dont cette technologie pourrait être utilisée dans leurs réseaux respectifs. Cet accord vise à améliorer la mise à l’échelle, l’interopérabilité et la confidentialité entre les écosystèmes et pour le Web 3.0.

Par ailleurs, Halo 2 est publié sous [licences open source MIT et Apache 2.0](https://github.com/zcash/halo2#readme), ce qui signifie que n’importe quel acteur de l’écosystème peut utiliser ce système de preuve.

**Filecoin.** Depuis son déploiement, la bibliothèque halo2 a été adoptée par des projets comme la zkEVM, et une intégration de Halo 2 dans le système de preuve de la machine virtuelle Filecoin est envisageable. Filecoin nécessite de nombreuses preuves coûteuses d’espace-temps et de réplication ; Halo 2 joue un rôle clé pour réduire l’espace utilisé et améliorer la mise à l’échelle du réseau. [Vidéo de la Filecoin Foundation avec Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Les deux écosystèmes gagneraient aussi à ce que les paiements de stockage Filecoin puissent être effectués en ZEC. Les achats de stockage bénéficieraient alors de la même confidentialité que les transferts protégés de Zcash, y compris le chiffrement des fichiers stockés sur Filecoin et la prise en charge de clients mobiles qui joignent des médias à un mémo chiffré Zcash. [Article de blog ECC × Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Une preuve Halo 2 pour une fonction à délai vérifiable (VDF) efficace est en cours de développement. Une VDF est une primitive cryptographique qui a de nombreux cas d’utilisation potentiels, notamment la génération d’aléa à usage général pour les contrats intelligents et l’élection de leader dans la preuve d’enjeu. ECC, la Filecoin Foundation, Protocol Labs et la Ethereum Foundation collaborent également avec [SupraNational](https://www.supranational.net/), un fournisseur spécialisé dans la cryptographie accélérée par matériel, en vue d’un éventuel développement de la VDF sur GPU et ASIC. Le [groupe Privacy and Scaling Explorations](https://appliedzkp.org/) étudie d’autres façons dont les preuves Halo 2 peuvent améliorer la confidentialité et la mise à l’échelle d’Ethereum.

### Autres projets utilisant Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) : un protocole d’échange atomique multichaîne qui préserve la confidentialité
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) : un zkRollup de couche 2 sur Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) : une blockchain zkEVM privée de couche 1
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) : un zkRollup de couche 2 sur Ethereum

---

## Conséquences pratiques

**Pour Zcash lui-même**

- Le pool protégé Orchard, activé avec NU5, est l’implémentation de ce nouveau système de preuve sur le réseau Zcash. Il est protégé par le même sas comptable que celui utilisé entre Sprout et Sapling, l’objectif étant de retirer progressivement les anciens pools protégés.
- Après NU5 (mi-2022), l’intégration de preuves récursives est devenue possible et s’est accompagnée de plusieurs améliorations de la confidentialité, dont la plus notable est l’introduction des « Actions » qui remplacent les entrées et sorties et réduisent la quantité de métadonnées des transactions.
- La suppression des configurations de confiance élimine un risque systémique qui aurait autrement dû être réitéré à chaque mise à niveau majeure du protocole.

**Pour les détenteurs et les opérateurs**

- La composition récursive de preuves permettrait de compresser des quantités illimitées de calculs, de créer des systèmes distribués auditables et d’augmenter la capacité de la couche 1 pour les opérateurs de nœuds complets, ce qui concerne des extensions comme les actifs protégés de Zcash et les conceptions à plus long terme de Zcash.

---

## Erreurs courantes

| Idée reçue | Ce qui est vrai en réalité |
| --- | --- |
| « Halo est une future mise à niveau que Zcash attend. » | Orchard, actif sur le réseau principal depuis NU5 (2022), repose déjà sur Halo 2. |
| « Pas de configuration de confiance signifie aucun paramètre. » | Halo utilise toujours des paramètres publics. Ceux-ci ne nécessitent pas de cérémonie dans laquelle il faudrait faire confiance aux participants pour détruire le matériel secret de configuration. |
| « Halo 2 et l’article Halo sont la même chose. » | L’[article](https://eprint.iacr.org/2019/1021.pdf) décrit le schéma d’engagement polynomial et l’amortissement imbriqué ; Halo 2 est l’implémentation Rust de production, avec un schéma d’accumulation et une arithmétisation de type PLONKish. |
| « La récursion ne sert qu’à accélérer la vérification des blocs. » | La récursion compresse aussi les calculs au niveau des applications : voir les preuves d’espace-temps et de réplication de Filecoin, ainsi que les travaux sur la VDF pour Ethereum. |

---

## Pages connexes

- [zk-SNARKs](/zcash-tech/zk-snarks) : la catégorie technologique générale à laquelle appartient Halo
- [Halo (article de recherche)](https://eprint.iacr.org/2019/1021.pdf) : la publication d’origine
- [Ironwood](/zcash-tech/ironwood) et [Le sas comptable](/zcash-tech/the-turnstile) : comment les fonds migrent vers les nouveaux pools protégés pendant que les anciens sont retirés
- [Actifs protégés de Zcash](/zcash-tech/zcash-shielded-assets) : une extension qui bénéficie des preuves récursives
- [Nœud complet Zebra](/zcash-tech/zebra-full-node) : l’implémentation de nœud qui valide les preuves on-chain

## Pour aller plus loin

- [Une introduction aux ZKP et à Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 avec Daira et Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Article de blog d’explication technique](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Présentation communautaire de Halo 2 — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentation**

- [Ressources Halo 2](https://github.com/mhchia/awesome-halo2)
- [Documentation Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
