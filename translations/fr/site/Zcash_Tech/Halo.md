<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Halo

## TL;DR

Halo est un système sans confiance de preuve à divulgation nulle de connaissance (ZKP) récursive, découvert par Sean Bowe chez Electric Coin Co. Il élimine le besoin d'une configuration de confiance et rend pratique la composition récursive de preuves, qui constitue le fondement de la feuille de route actuelle de Zcash en matière d'évolutivité et de sécurité.

- **Ce que c'est :** une construction zk-SNARK avec une récursivité efficace et sans cérémonie de configuration de confiance.
- **Pourquoi c'est important :** le pool protégé Orchard de Zcash, activé avec NU5 en 2022, fonctionne sur Halo 2 — l'implémentation de production de cette recherche.
- **Propriété clé :** aucun « déchet toxique » issu des cérémonies de configuration, et des preuves pouvant attester un nombre pratiquement illimité d'autres preuves.
- **Licence :** Halo 2 est open source sous [MIT et Apache 2.0](https://github.com/zcash/halo2#readme), de sorte que toute personne de l'écosystème peut s'appuyer dessus.

---

## Explication fondamentale

Halo est un système sans confiance de preuve à divulgation nulle de connaissance récursive, découvert par Sean Bowe chez Electric Coin Co. Il élimine la configuration de confiance et permet une meilleure évolutivité de la blockchain Zcash. Halo a été le premier système de preuve à divulgation nulle de connaissance à être à la fois efficace et récursif — largement considéré comme une percée scientifique.

![halo](/content-images/_unavailable.svg "halo")

### Les deux composants

- **Schéma d'engagement polynomial succinct.** Permet à un émetteur d'engagement de s'engager sur un polynôme à l'aide d'une courte chaîne que peut utiliser un vérificateur pour confirmer les évaluations revendiquées du polynôme engagé.
- **Preuve Oracle interactive polynomiale.** Le vérificateur demande au prouveur (un algorithme) d'ouvrir tous les engagements aux points de son choix, à l'aide du schéma d'engagement polynomial, et vérifie que l'identité est vraie entre eux.

### Aucune configuration de confiance

zk-SNARKs reposent sur une chaîne de référence commune (CRS) comme paramètre public pour prouver et vérifier. Cette CRS doit être générée à l'avance par une partie de confiance. Jusqu'à récemment, des calculs multipartites sécurisés (MPC) élaborés — tels que ceux réalisés par le réseau Aztec et Zcash — étaient nécessaires pour atténuer le risque associé à cette [cérémonie de configuration de confiance](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Les précédents pools protégés Sprout et Sapling de Zcash utilisaient les systèmes de preuve zk BCTV14 et Groth16. Bien que ceux-ci fussent sécurisés, ils présentaient des limites : ils n'étaient pas évolutifs car liés à une seule application, les « déchets toxiques » (résidus de matériel cryptographique généré lors de la cérémonie de genèse) pouvaient persister, et il existait un élément de confiance (bien que minime) pour considérer la cérémonie comme acceptable.

Halo élimine la configuration de confiance en regroupant à plusieurs reprises plusieurs instances de problèmes difficiles sur des cycles de courbes elliptiques, afin que les preuves computationnelles puissent être utilisées efficacement pour raisonner sur elles-mêmes (amortissement imbriqué). Un effet secondaire est que la chaîne de référence structurée (le résultat d'une cérémonie) devient évolutive, permettant des applications telles que les contrats intelligents.

Halo offre aux utilisateurs deux assurances importantes quant à la sécurité d'un système de preuve à divulgation nulle de connaissance à grande échelle. Premièrement, il permet aux utilisateurs de prouver qu'aucune personne impliquée dans la cérémonie de genèse n'a créé de porte dérobée secrète pour exécuter des transactions frauduleuses. Deuxièmement, il permet aux utilisateurs de démontrer que le système est resté sécurisé au fil du temps, même lorsqu'il a subi des mises à jour et des changements.

[Sean BoweL'explication de Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visuel / Analogie

### La chaîne de notaires

Imaginez une zk-SNARK normale comme un document notarié : un tampon, une vérification, c'est fait. Imaginez maintenant que vous devez prouver qu'une pile de dix mille documents est authentique. Sans récursivité, un vérificateur devrait contrôler chaque tampon.

Halo transforme chaque document vérifié en tampon sur le document *suivant*, jusqu'à ce que toute la pile soit réduite à un seul document avec un seul tampon. Vérifier le dernier document suffit pour faire confiance à toute la chaîne — et, surtout, le notaire de Halo (le système de preuve) fabrique ses propres tampons sans jamais avoir besoin d'une autorité externe pour établir son sceau.

### Pourquoi supprimer la configuration de confiance est important

Dans les anciens systèmes, le « sceau » (la CRS) provenait d'une cérémonie. Les participants devaient détruire le matériel intermédiaire, et chacun devait leur faire confiance pour cela. Le sceau de Halo est produit par les mathématiques seules : il n'y a rien à détruire, rien à divulguer et aucune cérémonie à laquelle faire confiance.

---

## Analyse approfondie

### Preuves récursives

La composition récursive de preuves permet à une seule preuve d'attester l'exactitude d'un nombre pratiquement illimité d'autres preuves, en compressant une grande quantité de calculs (et d'informations). Il s'agit d'un composant essentiel de l'évolutivité, car elle permet au réseau d'évoluer horizontalement tout en permettant à des groupes de participants de faire confiance à l'intégrité du reste du réseau.

Avant Halo, parvenir à une composition récursive de preuves nécessitait une grande dépense de calcul et une configuration de confiance. L'une des principales découvertes était une technique appelée **amortissement imbriqué** : une composition récursive utilisant un schéma d'engagement polynomial fondé sur l'argument du produit intérieur, améliorant massivement les performances tout en évitant la configuration de confiance.

L'article [Halo](https://eprint.iacr.org/2019/1021.pdf) décrit entièrement ce schéma d'engagement polynomial et a découvert qu'une nouvelle technique d'agrégation y existait. Cette technique permet de vérifier un grand nombre de preuves créées indépendamment presque aussi rapidement qu'une seule preuve. À elle seule, elle offrait déjà une meilleure alternative au zk-SNARKs antérieur utilisé dans Zcash.

### Halo 2

Halo 2 est une implémentation zk-SNARK haute performance écrite en Rust qui élimine le besoin d'une configuration de confiance tout en préparant le terrain pour l'évolutivité de Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Il comprend une généralisation de l'approche appelée **schéma d'accumulation**. Cette formalisation révèle comment fonctionne réellement l'amortissement imbriqué : en ajoutant des preuves à un objet appelé **accumulateur**, où chaque preuve raisonne sur l'état précédent de l'accumulateur, toutes les preuves précédentes peuvent être vérifiées (par induction) simplement en vérifiant l'état actuel de l'accumulateur.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

En parallèle, de nombreuses autres équipes découvraient des IOP polynomiales plus efficaces que Sonic (utilisé dans Halo 1), telles que Marlin. Le plus efficace de ces protocoles est PLONK, qui offre une énorme flexibilité dans la conception d'implémentations efficaces fondées sur les besoins spécifiques de l'application et fournit un temps de prouveur 5× meilleur que Sonic.

[Aperçu de PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo dans l'écosystème élargi

Electric Coin Company a conclu un accord avec Protocol Labs, la Foundation Filecoin et l'Ethereum Foundation afin d'explorer la R&D Halo, notamment la façon dont cette technologie pourrait être utilisée dans leurs réseaux respectifs. L'accord vise à fournir une meilleure évolutivité, interopérabilité et confidentialité entre les écosystèmes et pour le Web 3.0.

En outre, Halo 2 est sous les [licences open source MIT et Apache 2.0](https://github.com/zcash/halo2#readme), ce qui signifie que toute personne de l'écosystème peut développer avec ce système de preuve.

**Filecoin.** Depuis son déploiement, la bibliothèque halo2 a été adoptée dans des projets tels que le zkEVM, et une intégration potentielle de Halo 2 dans le système de preuve de la machine virtuelle Filecoin est envisagée. Filecoin nécessite de nombreuses preuves coûteuses d'espace-temps et preuves de réplication ; Halo 2 joue un rôle central dans la compression de l'utilisation de l'espace et une meilleure évolution du réseau. [FilecoinVidéo de la Foundation avec Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Les deux écosystèmes bénéficieraient également de la possibilité d'effectuer les paiements de stockage Filecoin en ZEC, offrant la même confidentialité pour les achats de stockage que celle existant dans les transferts protégés Zcash — y compris le chiffrement de fichiers dans le stockage Filecoin et la prise en charge de clients mobiles qui joignent des médias à un mémo chiffré Zcash. [ECC × FilecoinArticle de blog](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Une preuve Halo 2 pour une fonction de délai vérifiable (VDF) efficace est en cours de développement. Une VDF est une primitive cryptographique ayant de nombreux cas d'utilisation potentiels, y compris l'aléa à usage général pour les contrats intelligents et l'élection de leader dans la Proof of Stake. ECC, la Foundation Filecoin, Protocol Labs et l'Ethereum Foundation travaillent également avec [SupraNational](https://www.supranational.net/), un fournisseur spécialisé dans la cryptographie accélérée par matériel, en vue d'un développement potentiel sur GPU et ASIC de la VDF. Le groupe [Privacy and Scaling Explorations](https://appliedzkp.org/) recherche d'autres moyens par lesquels les preuves Halo 2 peuvent améliorer la confidentialité et l'évolutivité pour Ethereum.

### Autres projets utilisant Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — un protocole d'échange atomique multichaîne préservant la confidentialité
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — un zkRollup L2 sur Cardano
- [Darkfi](https://dark.fi/book/arch/arch.html) — une blockchain zkEVM L1 privée
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — un zkRollup L2 sur Ethereum

---

## Implications pratiques

**Pour Zcash lui-même**

- Le pool protégé Orchard, activé avec NU5, est l'implémentation de ce nouveau système de preuve sur le réseau Zcash. Il est protégé par la même conception de tourniquet utilisée entre Sprout et Sapling, avec l'intention de retirer progressivement les anciens pools protégés.
- Après NU5 (mi-2022), l'intégration de preuves récursives est devenue possible et plusieurs améliorations de la confidentialité l'ont accompagnée — notamment l'introduction des « Actions » remplaçant les entrées/sorties, ce qui réduit la quantité de métadonnées de transaction.
- La suppression des configurations de confiance élimine un risque systémique qui devrait autrement être répété pour chaque mise à niveau majeure du protocole.

**Pour les détenteurs et opérateurs**

- La composition récursive de preuves offre le potentiel de compresser des quantités illimitées de calculs, de créer des systèmes distribués auditables et d'améliorer la capacité de la couche 1 pour les opérateurs de nœuds complets — ce qui est pertinent pour des extensions telles que les Shielded Assets Zcash et les conceptions à plus long terme de Zcash.

---

## Erreurs courantes

| Croyance courante | Ce qui est réellement le cas |
| --- | --- |
| « Halo est une future mise à niveau que Zcash attend. » | Orchard, actif sur le mainnet depuis NU5 (2022), fonctionne déjà sur Halo 2. |
| « Aucune configuration de confiance signifie aucun paramètre. » | Halo utilise toujours des paramètres structurés ; la différence est qu'ils ne comportent aucun déchet toxique et peuvent être générés et mis à niveau sans cérémonie à laquelle les participants doivent faire confiance. |
| « Halo 2 et l'article Halo sont la même chose. » | L'[article](https://eprint.iacr.org/2019/1021.pdf) décrit le schéma d'engagement polynomial et l'amortissement imbriqué ; Halo 2 est l'implémentation Rust de production avec un schéma d'accumulation et une arithmétisation PLONKish. |
| « La récursivité n'aide qu'à faire évoluer la vérification des blocs. » | La récursivité compresse aussi les calculs au niveau de l'application — voir les preuves d'espace-temps/réplication de Filecoin et les travaux sur les VDF pour Ethereum. |

---

## Pages associées

- [zk-SNARKs](/zcash-tech/zk-snarks) — la catégorie technologique générale à laquelle appartient Halo
- [Halo (article de recherche)](https://eprint.iacr.org/2019/1021.pdf) — la publication originale
- [Ironwood](/zcash-tech/ironwood) et [Le tourniquet](/zcash-tech/the-turnstile) — comment les pools protégés migrent tandis que les anciens sont retirés
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — une extension qui bénéficie des preuves récursives
- [Zebra Nœud complet](/zcash-tech/zebra-full-node) — l'implémentation de nœud qui valide les preuves sur la chaîne

## Pour aller plus loin

- [Une introduction aux ZKP et à Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 avec Daira et Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Article de blog explicatif technique](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentation**

- [Ressources Halo 2](https://github.com/mhchia/awesome-halo2)
- [Documentation Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
