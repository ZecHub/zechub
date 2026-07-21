<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Pools de valeur Zcash 

## TL;DR

- Zcash dispose actuellement de **4 pools de valeur** : Sprout (hérité), Sapling, Orchard et Transparent.
- **Orchard** est le principal pool blindé actuel utilisé par les Unified Addresses (u1...).
- **Sapling** (adresses z commençant par `zs`) reste largement pris en charge et continue de sécuriser une quantité significative de ZEC blindés.
- Les adresses **Transparent** (t...) n’offrent aucune confidentialité des transactions et fonctionnent de manière similaire à Bitcoin.
- **Sprout** est un pool blindé historique qui a été retiré de l’usage actif.
- Un futur pool blindé connu sous le nom de **Ironwood** a été proposé pour renforcer la confiance dans l’intégrité de l’offre de ZEC blindés tout en préservant la confidentialité.
- Pour les garanties de confidentialité les plus fortes, les utilisateurs devraient continuer à privilégier les transactions **blindé à blindé (z → z)** chaque fois que possible.


<br/>

## Comprendre les pools de valeur Zcash

Zcash sépare les fonds en systèmes comptables distincts appelés pools de valeur. Chaque pool possède ses propres règles cryptographiques et propriétés de confidentialité, tandis que le protocole suit la valeur totale qui circule entre eux.

Aujourd’hui, le réseau contient quatre principaux pools de valeur :

- Transparent — Public et entièrement visible on-chain.
- Sapling — Le premier pool blindé moderne largement adopté.
- Orchard — Le principal pool blindé actuel introduit avec les Unified Addresses.
- Sprout — Le pool blindé d’origine lancé avec Zcash en 2016.
  


À mesure que Zcash évolue, de nouveaux pools blindés peuvent être introduits afin d’améliorer la sécurité, la confidentialité, l’utilisabilité et l’auditabilité tout en maintenant la compatibilité avec les fonds existants.

<br/>

![img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
Fig 1: Un graphique montrant les 4 pools actuels en octobre 2025

<br/>

## Les pools blindés 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
Fig 2: Un graphique montrant le pool Orchard en octobre 2025

<br/>

Le pool blindé Orchard a été activé le 31 mai 2022 dans le cadre de la mise à niveau réseau NU5. Orchard a introduit un nouveau protocole blindé qui a éliminé le besoin d’une configuration de confiance et est devenu le principal pool blindé utilisé par les Unified Addresses (UA).

Orchard a considérablement amélioré l’utilisabilité, l’efficacité et la confidentialité en réduisant les fuites de métadonnées de transaction et en introduisant un modèle de transaction plus flexible basé sur des Actions plutôt que sur les entrées et sorties blindées traditionnelles.

Aujourd’hui, Orchard reste le principal pool blindé de Zcash. Cependant, la communauté étudie une future migration vers un nouveau pool blindé appelé Ironwood, qui offrirait une assurance supplémentaire concernant l’intégrité de l’offre de ZEC blindés tout en préservant les garanties de confidentialité de Zcash.

Les [portefeuilles blindés Zcash](/site/Using_Zcash/Wallets) prennent désormais en charge Orchard. 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
Fig 3: Un graphique montrant le pool Sapling en octobre 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) était une mise à niveau du protocole Zcash introduite le 28 octobre 2018. Il s’agit d’une amélioration majeure par rapport à la version antérieure connue sous le nom de Sprout, qui présentait certaines limites en matière de confidentialité, d’efficacité et d’utilisabilité. 

Parmi les améliorations figurent de meilleures performances pour les adresses blindées, des Viewing Keys améliorées permettant aux utilisateurs de voir les transactions entrantes et sortantes sans exposer les clés privées de l’utilisateur, ainsi que des clés Zero Knowledge indépendantes pour les portefeuilles matériels lors de la signature des transactions. 

Zcash Sapling permet aux utilisateurs d’effectuer des transactions privées en seulement quelques secondes, comparé au temps plus long nécessaire dans la série Sprout. 

Le blindage des transactions renforce la confidentialité, rendant impossible pour des tiers de relier les transactions et de déterminer le montant de ZEC transféré. Sapling améliore également l’utilisabilité en réduisant les ressources de calcul nécessaires à la génération de transactions privées, ce qui le rend plus accessible aux utilisateurs.

Les adresses de portefeuille Sapling commencent par "zs", ce que l’on peut observer dans tous les portefeuilles blindés Zcash pris en charge (YWallet, Zingo Wallet, Nighthawk, etc.), qui intègrent des adresses Sapling. Zcash Sapling représente une avancée technologique significative en matière de confidentialité et d’efficacité des transactions, ce qui fait de Zcash une cryptomonnaie pratique et efficace pour les utilisateurs qui accordent de l’importance à la confidentialité et à la sécurité.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
Fig 4: Un graphique montrant le pool Sprout en octobre 2025

Sprout a été le tout premier protocole de confidentialité Zero Knowledge ouvert et sans permission jamais lancé. Il a été lancé le 28 octobre 2016.

Les adresses Sprout sont identifiées par leurs deux premières lettres, qui sont toujours "zc". Il a été nommé "Sprout" principalement pour souligner que le logiciel était jeune, une blockchain naissante avec un grand potentiel de croissance et ouverte au développement. 

Sprout a été utilisé comme outil initial pour le [slow start Mining de Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), ce qui a permis la distribution de ZEC et des récompenses de bloc pour les mineurs. 

À mesure que l’écosystème Zcash continuait de se développer avec un nombre croissant de transactions blindées, il a été observé que la série Zcash Sprout devenait limitée et moins efficace en matière de confidentialité des utilisateurs, de scalabilité des transactions et de traitement. Cela a conduit à la modification du réseau et à la mise à niveau Sapling. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparent</h3>
<br/>

![img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
Fig 5: Un graphique montrant le pool Transparent en octobre 2025

<br/>

Le pool Transparent de Zcash n’est pas blindé et n’est pas privé. Les adresses de portefeuille Transparent sur Zcash commencent par la lettre "t" ; le niveau de confidentialité est très faible lorsqu’on utilise ce type d’adresse pour les transactions.

Les transactions Transparent sur Zcash sont similaires aux transactions Bitcoin, prennent en charge les transactions multi-signatures et utilisent des adresses publiques standard.

Les adresses Transparent de Zcash sont principalement utilisées par les plateformes d’échange centralisées afin d’assurer une forte transparence et une confirmation réseau lors de l’envoi et de la réception de ZEC entre utilisateurs.

Il est également important de noter que, bien que les adresses blindées Zcash offrent une forte confidentialité pendant les transactions, elles nécessitent aussi davantage de ressources de calcul pour traiter les transactions. Par conséquent, certains utilisateurs peuvent adopter des adresses Transparent pour des transactions qui ne nécessitent pas le même niveau de confidentialité.

<br/>

## Pratique recommandée pour les transferts entre pools

Lorsqu’il s’agit de rechercher un haut niveau de confidentialité pendant une transaction sur le réseau Zcash, il est recommandé de suivre les pratiques ci-dessous ;

Les transactions ayant lieu entre portefeuilles "z vers z" sur la blockchain Zcash sont pour la plupart blindées, et on les appelle parfois des transactions privées en raison du haut niveau de confidentialité qu’elles procurent. C’est généralement la meilleure et la plus recommandée des façons d’envoyer et de recevoir des $ZEC lorsque la confidentialité est requise. 

---

Lorsque vous envoyez des ZEC d’une "Z-address" vers une "T-address", cela correspond simplement à une forme de transaction de déblindage. Dans ce type de transaction, le niveau de confidentialité n’est pas toujours élevé, car certaines informations seront visibles sur la blockchain en raison de l’envoi de ZEC vers une adresse Transparent. La transaction de déblindage n’est pas toujours recommandée lorsqu’un haut niveau de confidentialité est requis. 

---

Le transfert de ZEC depuis une adresse Transparent (T-address) vers une Z-address est simplement appelé blindage. Dans ce type de transaction, le niveau de confidentialité n’est pas toujours aussi élevé que dans une transaction z-z, mais cela reste recommandé lorsque la confidentialité est requise. 

---

L’envoi de ZEC depuis une adresse Transparent (T-address) vers une autre adresse Transparent (T-address) sur le réseau Zcash (transaction T-T) est très similaire à une transaction Bitcoin, c’est pourquoi les transactions T-T sur Zcash sont toujours appelées transactions publiques, car les détails de transaction de l’expéditeur et du destinataire deviennent visibles au public, ce qui rend le niveau de confidentialité très faible dans ce type de transaction. 

La plupart des plateformes d’échange centralisées de cryptomonnaies utilisent des adresses Transparent ("T-address) pour effectuer des transactions sur la blockchain Zcash, mais ce type de transaction (T-T) n’aura aucune propriété privée.

<br/>

## L’avenir : pool Ironwood

La communauté Zcash évalue actuellement un pool blindé proposé appelé Ironwood.

Ironwood est conçu pour répondre à une vulnérabilité récemment découverte et corrigée dans le système de preuve d’Orchard. Bien qu’il n’existe aucune preuve que cette vulnérabilité ait jamais été exploitée, Ironwood fournirait une couche d’assurance supplémentaire en permettant une migration contrôlée depuis Orchard vers un pool blindé nouvellement créé.

L’objectif n’est pas de remplacer la confidentialité de Zcash, mais de renforcer la confiance dans l’intégrité de l’offre de ZEC blindés.

## Dans le cadre de la proposition :

1. Les nouvelles activités blindées migreraient progressivement vers Ironwood.
2. Les fonds Orchard existants pourraient être migrés de manière privée.
3. La comptabilité publique du turnstile fournirait des preuves plus solides que tous les fonds blindés restent entièrement garantis.
4. Les utilisateurs conserveraient les mêmes protections de confidentialité qu’ils attendent de Zcash.

<br/>
S’il est activé par de futures mises à niveau réseau, Ironwood deviendrait la prochaine génération de l’écosystème blindé de Zcash tout en préservant la compatibilité avec les fonds blindés existants.

<br/>

## Erreurs courantes à éviter

- **Envoyer de t-address à t-address** — entièrement public, aucune confidentialité. Blindez toujours les fonds d’abord.
- **Confondre les adresses Sapling et Orchard** — les adresses Sapling commencent par `zs`, les adresses Orchard/Unified commencent par `u1`
- **Laisser des fonds dans le pool Sprout** — Sprout est obsolète ; migrez les fonds vers Orchard
- **Supposer que t → z (blindage) est entièrement privé** — l’acte même de blindage est visible on-chain ; le contenu ne l’est pas

---

## Pages liées

- [Portefeuilles](/using-zcash/wallets) — Quels portefeuilles prennent en charge les pools Orchard et Sapling
- [Transactions](/using-zcash/transactions) — Comment envoyer des transactions blindées
- [Acheter du ZEC](/using-zcash/buying-zec) — Acquérir du ZEC avant de l’utiliser dans les pools
- [ZK-SNARKs](/zcash-tech/zk-snarks) — La base cryptographique des pools blindés
- [Qu’est-ce que ZEC et Zcash](/start-here/what-is-zec-and-zcash) — Contexte sur la confidentialité de Zcash
