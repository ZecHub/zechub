<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Pools de valeur Zcash

## TL;DR

- Zcash dispose actuellement de **5 pools de valeur** : Sprout (hérité), Sapling, Orchard (dépense uniquement), Ironwood et Transparent.
- **Ironwood** est le principal pool shielded actuel, en service depuis la mise à niveau NU6.3 du 28 juillet 2026.
- **Orchard** est désormais en **dépense uniquement** : aucune nouvelle valeur ne peut y entrer, et les fonds existants migrent vers Ironwood.
- **Sapling** (adresses z commençant par `zs`) reste largement pris en charge et continue de sécuriser une quantité importante de ZEC shielded.
- Les adresses **Transparent** (t...) n’offrent aucune confidentialité des transactions et fonctionnent de manière similaire à Bitcoin.
- **Sprout** est un pool shielded hérité qui a été retiré de l’usage actif.
- La migration d’Orchard vers Ironwood est **en cours** et est auditée publiquement par le turnstile.
- Pour les garanties de confidentialité les plus fortes, les utilisateurs devraient continuer à privilégier les transactions **shielded à shielded (z → z)** chaque fois que possible.


<br/>

## Comprendre les pools de valeur de Zcash

Zcash sépare les fonds en systèmes comptables distincts appelés pools de valeur. Chaque pool possède ses propres règles cryptographiques et propriétés de confidentialité, tandis que le protocole suit la valeur totale qui circule entre eux.

Aujourd’hui, le réseau contient cinq principaux pools de valeur :

- Transparent — Public et entièrement visible on-chain.
- Sapling — Le premier pool shielded moderne largement adopté, toujours actif.
- Orchard — L’ancien principal pool shielded, désormais en dépense uniquement.
- Ironwood — Le principal pool shielded actuel, introduit par NU6.3.
- Sprout — Le pool shielded d’origine lancé avec Zcash en 2016.
  


À mesure que Zcash évolue, de nouveaux pools shielded peuvent être introduits pour améliorer la sécurité, la confidentialité, la facilité d’utilisation et l’auditabilité tout en maintenant la compatibilité avec les fonds existants.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig 1: Un graphique montrant les 4 pools actuels en octobre 2025

<br/>

## Les pools shielded


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

Ironwood est le principal pool shielded actuel. Il a été activé le 28 juillet 2026 au bloc 3,428,143 dans le cadre de la mise à niveau du réseau NU6.3, et c’est là que se trouve désormais la nouvelle valeur shielded.

Il existe parce qu’une vulnérabilité a été découverte dans le système de preuve d’Orchard en mai 2026. Rien n’indique qu’elle ait jamais été exploitée, mais ce défaut signifiait que l’offre shielded ne pouvait pas être prouvée comme saine par les preuves seules. Plutôt que de corriger sur place, le réseau a créé un nouveau pool avec un circuit corrigé et a déplacé la valeur via un turnstile qui compte publiquement chaque pièce. C’est cette comptabilité qui rétablit la garantie que l’offre shielded est entièrement couverte.

Ironwood réutilise le modèle Action d’Orchard et les preuves Halo 2, il se comporte donc de la même manière au quotidien. Deux éléments sont nouveaux : les transactions utilisent le format v6, et les notes Ironwood sont **récupérables quantiquement** selon [ZIP 2005](https://zips.z.cash/zip-2005), ce qui signifie que l’enregistrement on-chain d’une pièce reste récupérable si un futur ordinateur quantique casse la cryptographie actuelle. Il s’agit d’une voie de récupération, pas d’une résistance quantique, et cela ne s’applique pas aux anciens pools.

Vous n’avez pas besoin d’une nouvelle adresse. Les adresses Unified regroupent plusieurs receivers, et les wallets choisissent le bon pool pour vous.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig 2: Un graphique montrant le pool Orchard en octobre 2025

<br/>

Le pool shielded Orchard a été activé le 31 mai 2022 dans le cadre de la mise à niveau du réseau NU5. Orchard a introduit un nouveau protocole shielded qui a éliminé le besoin d’une trusted setup et est devenu le principal pool shielded utilisé par les Unified Addresses (UA).

Orchard a considérablement amélioré la facilité d’utilisation, l’efficacité et la confidentialité en réduisant la fuite de métadonnées des transactions et en introduisant un modèle de transaction plus flexible basé sur des Actions plutôt que sur des entrées et sorties shielded traditionnelles.

Depuis l’activation de la mise à niveau Ironwood le 28 juillet 2026, **Orchard est en dépense uniquement**. Aucune nouvelle valeur ne peut entrer dans le pool. Les fonds qui s’y trouvent déjà peuvent toujours être dépensés, et migrent vers Ironwood via le turnstile. Les wallets s’en chargent pour vous, bien que la plupart vous laissent un certain contrôle sur le rythme.

Si vous détenez des fonds dans Orchard, consultez [Ironwood](/zcash-tech/ironwood) pour comprendre ce que cette migration signifie en pratique.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig 3: Un graphique montrant le pool Sapling en octobre 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) est une mise à niveau du protocole Zcash introduite le 28 octobre 2018. Il s’agit d’une amélioration majeure par rapport à la version antérieure connue sous le nom de Sprout, qui présentait certaines limites en matière de confidentialité, d’efficacité et de facilité d’utilisation. 

Parmi les améliorations figurent de meilleures performances pour les adresses shielded, des viewing keys améliorées permettant aux utilisateurs de voir les transactions entrantes et sortantes sans exposer les clés privées de l’utilisateur, ainsi que des clés Zero Knowledge indépendantes pour les hardware wallets lors de la signature des transactions. 

Zcash Sapling permet aux utilisateurs d’effectuer des transactions privées en seulement quelques secondes, comparé au temps plus long que cela prenait dans la série Sprout. 

Le shielding des transactions renforce la confidentialité, rendant impossible pour des tiers de relier les transactions et de déterminer le montant de ZEC transféré. Sapling améliore également la facilité d’utilisation en réduisant les exigences de calcul pour générer des transactions privées, ce qui le rend plus accessible aux utilisateurs.

Les adresses de wallet Sapling commencent par « zs », et cela peut être observé dans tous les wallets shielded Zcash pris en charge (YWallet, Zingo Wallet, Nighthawk, etc.) qui intègrent des adresses Sapling. Zcash Sapling représente une avancée technologique significative en matière de confidentialité et d’efficacité des transactions, ce qui fait de Zcash une cryptomonnaie pratique et efficace pour les utilisateurs qui accordent de l’importance à la confidentialité et à la sécurité.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig 4: Un graphique montrant le pool Sprout en octobre 2025

Sprout a été le tout premier protocole de confidentialité Zero Knowledge ouvert et sans permission jamais lancé. Il a été lancé le 28 octobre 2016.

Les adresses Sprout sont identifiées par leurs deux premières lettres, qui sont toujours « zc ». Il a été nommé « Sprout » principalement pour souligner que le logiciel était jeune, une blockchain naissante avec un grand potentiel de croissance et ouverte au développement. 

Sprout a été utilisé comme un premier outil pour le [slow start Mining de Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), ce qui a conduit à la distribution de ZEC et des récompenses de bloc aux mineurs. 

À mesure que l’écosystème Zcash continuait à se développer avec un nombre croissant de transactions shielded, il a été observé que la série Zcash Sprout devenait limitée et moins efficace en matière de confidentialité des utilisateurs, de scalabilité des transactions et de traitement. Cela a conduit à la modification du réseau et à la mise à niveau Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparent</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig 5: Un graphique montrant le pool Transparent en octobre 2025

<br/>

Le pool Transparent de Zcash n’est pas shielded et n’est pas privé. Les adresses de wallet Transparent sur Zcash commencent par la lettre « t » ; le niveau de confidentialité est très faible lorsque ce type d’adresse est utilisé pour les transactions.

Les transactions Transparent dans Zcash sont similaires aux transactions Bitcoin, prennent en charge les transactions multi-signatures et utilisent des adresses publiques standard.

Les adresses Transparent de Zcash sont principalement utilisées par les exchanges centralisés afin d’assurer une forte transparence et la confirmation du réseau lors de l’envoi et de la réception de ZEC entre utilisateurs.

Il est également important de noter que, bien que les adresses shielded de Zcash offrent un haut niveau de confidentialité lors des transactions, elles nécessitent aussi davantage de ressources de calcul pour traiter les transactions. Par conséquent, certains utilisateurs peuvent adopter des adresses Transparent pour des transactions qui ne nécessitent pas le même niveau de confidentialité.

<br/>

## Pratique recommandée pour les transferts entre pools

Lorsqu’il s’agit de viser un haut niveau de confidentialité lors d’une transaction sur le réseau Zcash, il est recommandé de suivre les pratiques ci-dessous ;

Les transactions entre wallets « z vers z » sur la blockchain Zcash sont principalement shielded et sont parfois appelées transactions privées en raison du haut niveau de confidentialité généré. C’est généralement la meilleure et la plus recommandée des façons d’envoyer et de recevoir des $ZEC lorsque la confidentialité est requise. 

---

Lorsque vous envoyez des ZEC d’une « Z-address » vers une « T-address », cela correspond simplement à une forme de transaction de deshielding. Dans ce type de transaction, le niveau de confidentialité n’est pas toujours élevé, car certaines informations seront visibles sur la blockchain en raison de l’envoi de ZEC vers une adresse Transparent. La transaction de deshielding n’est pas toujours recommandée lorsqu’un haut niveau de confidentialité est requis. 

---

Transférer des ZEC d’une adresse Transparent (T-address) vers une Z-address est simplement appelé shielding. Dans ce type de transaction, le niveau de confidentialité n’est pas toujours aussi élevé que dans une transaction z-z, mais cela reste aussi recommandé lorsque la confidentialité est requise. 

---

Envoyer des ZEC d’une adresse Transparent (T-address) vers une autre adresse Transparent (T-address) sur le réseau Zcash (transaction T-T) est très similaire à une transaction Bitcoin, et c’est pourquoi les transactions T-T sur Zcash sont toujours appelées transactions publiques, car les détails de transaction de l’expéditeur et du destinataire deviennent visibles au public, ce qui rend le niveau de confidentialité très faible dans ce type de transaction. 

La plupart des exchanges centralisés de cryptomonnaies utilisent des adresses Transparent (« T-address ») lorsqu’il s’agit d’effectuer des transactions sur la blockchain Zcash, mais ce type de transaction (T-T) n’aura aucune propriété de confidentialité.

<br/>

## La migration d’Orchard vers Ironwood

La migration est en cours en ce moment. Orchard est fermé aux nouveaux dépôts, et la valeur qui s’y trouve encore se déplace vers Ironwood, transaction après transaction. Vous pouvez suivre les totaux sur [ironwood.live](https://ironwood.live/).

Ce que cela signifie dépend de l’endroit où se trouvent vos fonds :

1. **La nouvelle activité shielded** va automatiquement dans Ironwood. Rien à faire.
2. **Les fonds Orchard existants** doivent migrer. Les wallets maintenus le font pour vous, généralement par étapes plutôt qu’en une seule fois.
3. **Sapling n’est pas affecté** et continue d’accepter des fonds. Seul Orchard a été fermé.
4. **Le turnstile compte tout** ce qui traverse entre les pools, ce qui prouve qu’aucune pièce n’a été inventée en chemin.

> **Une réserve de confidentialité à connaître.** Le turnstile publie le *montant* qui traverse entre les pools, ainsi que la hauteur de bloc. L’expéditeur et le destinataire restent cachés comme toujours, mais un montant distinctif peut être relié à vous. C’est pourquoi les wallets effectuent la migration par étapes en utilisant des dénominations standard au lieu de déplacer votre solde en une seule masse reconnaissable. Laissez votre wallet gérer son propre rythme, et envisagez d’utiliser Tor ou un VPN afin que votre IP ne soit pas liée aux montants que vous déplacez.

Consultez [Ironwood](/zcash-tech/ironwood) pour la mise à niveau elle-même, et [The Turnstile](/zcash-tech/the-turnstile) pour comprendre le fonctionnement de cette comptabilité.

<br/>

## Erreurs courantes à éviter

- **Envoyer d’une t-address à une t-address** — entièrement public, aucune confidentialité. Shield les fonds d’abord.
- **Supposer qu’Orchard accepte encore des fonds** — il est en dépense uniquement depuis le 28 juillet 2026. La valeur peut en sortir, mais rien de nouveau n’y entre
- **Confondre Sapling et les adresses Unified** — les adresses Sapling commencent par `zs`. Les adresses Unified commencent par `u1` et regroupent plusieurs receivers, donc le pool dans lequel votre paiement atterrit dépend des receivers que cette adresse contient
- **Laisser des fonds dans le pool Sprout** — Sprout est obsolète depuis des années ; retirez-en ces fonds
- **S’attendre à ce qu’une migration soit complètement invisible** — le montant qui traverse le turnstile est public, même si l’expéditeur et le destinataire ne le sont pas
- **Supposer que t → z (shielding) est totalement privé** — l’acte même de shield est visible on-chain ; le contenu ne l’est pas

---

## Pages liées

- [Ironwood](/zcash-tech/ironwood) — La mise à niveau qui a créé le pool actuel
- [The Turnstile](/zcash-tech/the-turnstile) — Comment la valeur qui circule entre les pools est auditée
- [Wallets](/using-zcash/wallets) — Quels wallets sont maintenus et prêts pour Ironwood
- [Transactions](/using-zcash/transactions) — Comment envoyer des transactions shielded
- [Acheter du ZEC](/using-zcash/buying-zec) — Acquérir du ZEC avant de l’utiliser dans les pools
- [ZK-SNARKs](/zcash-tech/zk-snarks) — Le fondement cryptographique des pools shielded
- [Qu’est-ce que ZEC et Zcash](/start-here/what-is-zec-and-zcash) — Contexte sur la confidentialité de Zcash
