<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Les pools de valeur de Zcash 

## En bref

- Zcash compte actuellement **5 pools de valeur** : Sprout (historique), Sapling, Orchard (en dépense seule), Ironwood et le pool transparent.
- **Ironwood** est le pool protégé principal actuel, en service depuis la mise à niveau NU6.3 du 28 juillet 2026.
- **Orchard** est désormais **en dépense seule** : aucune nouvelle valeur ne peut y entrer, et les fonds existants migrent vers Ironwood.
- **Sapling** (adresses z commençant par `zs`) reste largement pris en charge et continue de sécuriser une quantité importante de ZEC protégés.
- Les adresses **transparentes** (t...) n’offrent aucune confidentialité des transactions et fonctionnent de manière similaire à Bitcoin.
- **Sprout** est un pool protégé historique qui a été retiré de l’usage actif.
- La migration de Orchard vers Ironwood est **en cours** et fait l’objet d’un audit public par le sas comptable.
- Pour obtenir les meilleures garanties de confidentialité, les utilisateurs doivent continuer à privilégier les transactions **de protégé à protégé (z → z)** dans la mesure du possible.


<br/>

## Comprendre les pools de valeur de Zcash

Zcash répartit les fonds dans des systèmes comptables distincts appelés pools de valeur. Chaque pool possède ses propres règles cryptographiques et ses propres propriétés de confidentialité, tandis que le protocole suit la valeur totale qui circule entre eux.

Aujourd’hui, le réseau compte cinq pools de valeur principaux :

- Transparent — Public et entièrement visible on-chain.
- Sapling — Le premier pool protégé moderne largement adopté, toujours actif.
- Orchard — L’ancien pool protégé principal, désormais en dépense seule.
- Ironwood — Le pool protégé principal actuel, introduit par NU6.3.
- Sprout — Le pool protégé d’origine, lancé avec Zcash en 2016.
  


À mesure que Zcash évolue, de nouveaux pools protégés peuvent être introduits afin d’améliorer la sécurité, la confidentialité, la facilité d’utilisation et l’auditabilité, tout en maintenant la compatibilité avec les fonds existants.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig. 1 : Graphique montrant les trois pools protégés (Sprout, Sapling et Orchard) jusqu’au 29 octobre 2025, avant l’activation de Ironwood

<br/>

## Les pools protégés 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

Ironwood est le pool protégé principal actuel. Il a été activé le 28 juillet 2026 au bloc 3 428 143 dans le cadre de la mise à niveau du réseau NU6.3, et c’est là que réside désormais la nouvelle valeur protégée.

Il existe parce qu’une vulnérabilité a été découverte dans le système de preuves de Orchard en mai 2026. Rien n’indique qu’elle ait jamais été exploitée, mais cette faille signifiait que l’intégrité de l’offre protégée ne pouvait pas être démontrée par les seules preuves. Plutôt que de corriger sur place, le réseau a créé un nouveau pool doté d’un circuit corrigé et y a transféré la valeur via un sas comptable qui compte publiquement chaque pièce. C’est cette comptabilité qui rétablit la garantie que l’offre protégée est entièrement couverte.

Ironwood réutilise le modèle d’Actions et les preuves Halo 2 de Orchard, de sorte qu’il se comporte de la même manière au quotidien. Deux éléments sont nouveaux : les transactions utilisent le format v6, et les notes Ironwood sont **récupérables face au quantique** selon [ZIP 2005](https://zips.z.cash/zip-2005), ce qui signifie que l’enregistrement on-chain d’une pièce reste récupérable si un futur ordinateur quantique venait à casser la cryptographie actuelle. Il s’agit d’une voie de récupération, et non d’une résistance au quantique, et elle ne s’applique pas aux anciens pools.

Vous n’avez pas besoin d’une nouvelle adresse. Les adresses unifiées regroupent plusieurs récepteurs, et les portefeuilles choisissent le bon pool pour vous.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig. 2 : Graphique montrant le pool Orchard jusqu’au 29 octobre 2025, avant l’activation de Ironwood

<br/>

Le pool protégé Orchard a été activé le 31 mai 2022 dans le cadre de la mise à niveau du réseau NU5. Orchard a introduit un nouveau protocole protégé qui a supprimé le besoin d’une configuration de confiance et est devenu le pool protégé principal utilisé par les adresses unifiées (UA).

Orchard a considérablement amélioré la facilité d’utilisation, l’efficacité et la confidentialité en réduisant les fuites de métadonnées des transactions et en introduisant un modèle de transaction plus flexible, fondé sur des Actions plutôt que sur les entrées et sorties protégées traditionnelles.

Depuis l’activation de la mise à niveau Ironwood le 28 juillet 2026, **Orchard est en dépense seule**. Aucune nouvelle valeur ne peut entrer dans le pool. Les fonds qui s’y trouvent déjà peuvent toujours être dépensés et migrent vers Ironwood via le sas comptable. Les portefeuilles s’en chargent pour vous, même si la plupart vous laissent un certain contrôle sur le rythme. Chaque sortie de Orchard affiche son montant sur la blockchain : la manière dont un portefeuille fractionne et échelonne la migration a donc une incidence sur la confidentialité.

Si vous détenez des fonds dans Orchard, consultez [Ironwood](/zcash-tech/ironwood) pour savoir ce que la migration implique concrètement.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig. 3 : Graphique montrant le pool Sapling jusqu’au 29 octobre 2025, avant l’activation de Ironwood

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) était une mise à niveau du protocole Zcash introduite le 28 octobre 2018. Elle constitue une amélioration majeure par rapport à la version antérieure, connue sous le nom de Sprout, qui présentait certaines limites en matière de confidentialité, d’efficacité et de facilité d’utilisation. 

Parmi les améliorations figurent de meilleures performances pour les adresses protégées, des clés pour lecture seule améliorées permettant aux utilisateurs de consulter les transactions entrantes et sortantes sans exposer leurs clés privées, ainsi que des clés à divulgation nulle de connaissance indépendantes pour les portefeuilles matériels lors de la signature des transactions. 

Zcash Sapling permet aux utilisateurs d’effectuer des transactions privées en quelques secondes seulement, contre une durée bien plus longue avec la série Sprout. 

La protection des transactions renforce la confidentialité, en empêchant les tiers de relier les transactions entre elles et de déterminer le montant de ZEC transféré. Sapling améliore également la facilité d’utilisation en réduisant les ressources de calcul nécessaires à la génération de transactions privées, ce qui les rend plus accessibles aux utilisateurs.

Les adresses de portefeuille Sapling commencent par « zs », ce que l’on peut observer dans tous les portefeuilles protégés Zcash compatibles (Zkool, Zingo Wallet, etc.) qui intègrent des adresses Sapling. Zcash Sapling représente une avancée technologique importante en matière de confidentialité et d’efficacité des transactions, ce qui fait de Zcash une cryptomonnaie pratique et efficace pour les utilisateurs attachés à la confidentialité et à la sécurité.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig. 4 : Graphique montrant le pool Sprout jusqu’au 29 octobre 2025, avant l’activation de Ironwood

Sprout a été le tout premier protocole de confidentialité ouvert, sans permission et à divulgation nulle de connaissance jamais lancé. Il a été lancé le 28 octobre 2016.

Les adresses Sprout se reconnaissent à leurs deux premières lettres, qui sont toujours « zc ». Il a été nommé « Sprout » principalement pour souligner que le logiciel était une blockchain jeune et naissante, dotée d’un fort potentiel de croissance et ouverte au développement. 

Sprout a servi d’outil précoce pour le [Zcash minage à démarrage lent](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), qui a permis la distribution de ZEC et des récompenses de bloc aux mineurs. 

À mesure que l’écosystème Zcash continuait de s’étendre avec un nombre croissant de transactions protégées, on a constaté que la série Zcash Sprout devenait limitée et moins efficace en matière de confidentialité des utilisateurs, de mise à l’échelle et de traitement des transactions. Cela a conduit à la modification du réseau et à la mise à niveau Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool transparent</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig. 5 : Graphique montrant le pool transparent jusqu’au 29 octobre 2025, avant l’activation de Ironwood

<br/>

Le pool transparent de Zcash n’est ni protégé ni privé. Les adresses de portefeuille transparentes sur Zcash commencent par la lettre « t », et la confidentialité est très faible lorsque l’on utilise ce type d’adresse pour les transactions.

Les transactions transparentes sur Zcash sont similaires aux transactions Bitcoin : elles prennent en charge les transactions multisignatures et utilisent des adresses publiques standard.

Les adresses transparentes de Zcash sont surtout utilisées par les exchanges centralisés afin de garantir une grande transparence et une confirmation par le réseau lors de l’envoi et de la réception de ZEC entre utilisateurs.

Il convient également de noter que si les adresses protégées de Zcash offrent une grande confidentialité lors des transactions, elles nécessitent aussi davantage de ressources de calcul pour traiter les transactions. C’est pourquoi certains utilisateurs peuvent opter pour des adresses transparentes pour les transactions qui ne requièrent pas le même niveau de confidentialité.

<br/>

## Bonnes pratiques pour les transferts entre pools

Si vous recherchez un niveau élevé de confidentialité lors de vos transactions sur le réseau Zcash, il est recommandé de suivre les pratiques ci-dessous :

Les transactions effectuées entre portefeuilles « z vers z » sur la blockchain Zcash sont essentiellement protégées et sont parfois appelées transactions privées en raison du niveau élevé de confidentialité qu’elles offrent. C’est généralement la meilleure façon, et la plus recommandée, d’envoyer et de recevoir des $ZEC lorsque la confidentialité est requise. 

---

Lorsque vous envoyez des ZEC d’une « adresse Z » vers une « adresse T », il s’agit simplement d’une transaction de déprotection. Dans ce type de transaction, le niveau de confidentialité n’est pas toujours élevé, car certaines informations seront visibles sur la blockchain du fait de l’envoi de ZEC vers une adresse transparente. La déprotection n’est pas recommandée lorsqu’une confidentialité élevée est requise. 

---

Le transfert de ZEC d’une adresse transparente (adresse T) vers une adresse Z s’appelle simplement la protection. Dans ce type de transaction, le niveau de confidentialité n’est pas toujours aussi élevé que celui d’une transaction z-z, mais elle est également recommandée lorsque la confidentialité est requise. 

---

L’envoi de ZEC d’une adresse transparente (adresse T) vers une autre adresse transparente (adresse T) sur le réseau Zcash (transaction T-T) est très similaire à une transaction Bitcoin. C’est pourquoi les transactions T-T sur Zcash sont toujours appelées transactions publiques : les détails de la transaction de l’expéditeur comme du destinataire deviennent visibles par le public, ce qui rend le niveau de confidentialité très faible dans ce type de transaction. 

La plupart des exchanges centralisés de cryptomonnaies utilisent des adresses transparentes (« adresses T ») pour effectuer des transactions sur la blockchain Zcash, mais ce type de transaction (T-T) ne présente aucune propriété de confidentialité.

<br/>

## La migration de Orchard vers Ironwood

La migration est en cours. Orchard est fermé aux nouveaux dépôts, et la valeur qui s’y trouve encore est transférée vers Ironwood, une transaction à la fois. Vous pouvez suivre les totaux sur [ironwood.live](https://ironwood.live/).

Ce que cela implique dépend de l’endroit où se trouvent vos fonds :

1. **La nouvelle activité protégée** va automatiquement dans Ironwood. Vous n’avez rien à faire.
2. **Les fonds existants dans Orchard** doivent migrer. Les portefeuilles maintenus s’en chargent pour vous, généralement par étapes plutôt qu’en une seule fois.
3. **Sapling n’est pas concerné** et accepte toujours des fonds. Seul Orchard a été fermé.
4. **Le sas comptable compte tout** ce qui passe d’un pool à l’autre, ce qui prouve qu’aucune pièce n’a été créée en cours de route.

> **Une réserve importante en matière de confidentialité.** Le sas comptable publie le *montant* qui passe d’un pool à l’autre, ainsi que la hauteur de bloc. L’expéditeur et le destinataire restent cachés comme toujours, mais un montant reconnaissable peut être relié à vous. C’est pourquoi les portefeuilles migrent par étapes en utilisant des coupures standard, au lieu de déplacer votre solde en un seul bloc identifiable. Laissez votre portefeuille gérer son rythme, et envisagez d’utiliser Tor ou un VPN afin que votre adresse IP ne soit pas associée aux montants que vous déplacez.

Consultez [Ironwood](/zcash-tech/ironwood) pour la mise à niveau elle-même, et [Le sas comptable](/zcash-tech/the-turnstile) pour comprendre le fonctionnement de la comptabilité.

<br/>

## Erreurs courantes à éviter

- **Envoyer d’une adresse t vers une adresse t** — entièrement public, aucune confidentialité. Protégez toujours vos fonds d’abord.
- **Supposer que Orchard accepte encore des fonds** — il est en dépense seule depuis le 28 juillet 2026. La valeur peut en sortir, mais rien de nouveau n’y entre
- **Confondre les adresses Sapling et les adresses unifiées** — les adresses Sapling commencent par `zs`. Les adresses unifiées commencent par `u1` et regroupent plusieurs récepteurs : le pool dans lequel arrive votre paiement dépend donc des récepteurs que contient cette adresse
- **Laisser des fonds dans le pool Sprout** — Sprout est obsolète depuis des années ; transférez ces fonds ailleurs
- **S’attendre à ce qu’une migration soit totalement invisible** — le montant qui franchit le sas comptable est public, même si l’expéditeur et le destinataire ne le sont pas
- **Supposer que t → z (protection) est entièrement privé** — l’acte de protection lui-même est visible on-chain ; son contenu ne l’est pas

---

## Pages connexes

- [Ironwood](/zcash-tech/ironwood) — La mise à niveau qui a créé le pool actuel
- [Le sas comptable](/zcash-tech/the-turnstile) — Comment la valeur circulant entre les pools est auditée
- [Portefeuilles](/using-zcash/wallets) — Quels portefeuilles sont maintenus et prêts pour Ironwood
- [Transactions](/using-zcash/transactions) — Comment envoyer des transactions protégées
- [Acheter des ZEC](/using-zcash/buying-zec) — Acquérir des ZEC avant de les utiliser dans les pools
- [zk-SNARKs](/zcash-tech/zk-snarks) — Le fondement cryptographique des pools protégés
- [Qu’est-ce que ZEC et Zcash](/start-here/what-is-zec-and-zcash) — Contexte sur la confidentialité de Zcash
