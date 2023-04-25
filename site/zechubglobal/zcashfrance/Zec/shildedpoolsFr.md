# Pools de valeur Zcash

Nous examinerons les 4 [value pools](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html) dans Zcash qui incluent les pools Sprout, Sapling, Orchard et Transparent. Cette page wiki couvrira également les améliorations de la technologie et certaines meilleures pratiques de transfert de pool.


## Shielded Pools

### Sprout



![zcash-sprout-launch](https://user-images.githubusercontent.com/81990132/233535478-a84724d7-cb0e-4ad8-bfcc-499f665fba24.png)


La série Sprout a été le tout premier protocole de confidentialité ouvert et sans autorisation lancé sur Zcash et il est parfois appelé Zcash 1.0 ou "Ordinary Zcash". Il a été lancé le 28 octobre 2016 et c'était la première version de Zcash qui utilise la technologie de preuve de connaissance zéro qui est une caractéristique importante de la cryptographie Zcash.


Les adresses Sprout sont identifiées par leurs deux premières lettres qui sont toujours "zc". Il a été nommé "Sprout" dans le but principal de souligner que le logiciel était jeune, une blockchain en herbe avec un grand potentiel de croissance et ouvert au développement.

La série Sprout a été utilisée comme un des premiers outils pour [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) qui a entraîné la distribution de récompenses ZEC et Block pour les mineurs .

Alors que l'écosystème Zcash continue de se développer avec un nombre croissant de transactions protégées, il a été observé que la série Zcash Sprout est devenue limitée et moins efficace en ce qui concerne la confidentialité des utilisateurs, l'évolutivité et le traitement des transactions. Cela a conduit à la modification du réseau et à la mise à niveau de Sapling.


### Zcash Sapling

![zcash-sapling-vertical-fullcolor-2x](https://user-images.githubusercontent.com/81990132/233535552-f04b727e-078f-483a-8fbc-1628486be0c8.png)

[Zcash Sapling] (https://z.cash/upgrade/sapling) est une mise à niveau du protocole Zcash introduit le 28 octobre 2018. Il s'agit d'une amélioration majeure par rapport à la version précédente du connu sous le nom de Sprout qui présentait certaines limitations. en termes de confidentialité, d'efficacité et de convivialité.

Certaines des mises à niveau incluent des performances améliorées pour les adresses protégées, des clés de visualisation améliorées pour permettre aux utilisateurs de visualiser les transactions entrantes et sortantes sans exposer les clés privées de l'utilisateur et des clés indépendantes Zero Knowledge pour le portefeuille matériel lors de la signature de la transaction.

Zcash Sapling permet aux utilisateurs d'effectuer des transactions privées en quelques secondes seulement par rapport à la durée plus longue qu'il a fallu dans Sprout Series.

Le blindage des transactions améliore la confidentialité, empêchant les tiers de lier les transactions et de déterminer le montant de ZEC transféré. Sapling améliore également la convivialité en réduisant les exigences de calcul pour générer des transactions privées en le rendant plus accessible aux utilisateurs.

Les adresses de portefeuille Sapling commencent par "zs" et cela peut être observé dans tous les portefeuilles blindés Zcash pris en charge (YWallet, Zingo Wallet Nighthawk, etc.) qui ont des adresses Sapling intégrées. Zcash Sapling représente un développement technologique significatif en matière de confidentialité et d'efficacité des transactions, ce qui fait de Zcash une crypto-monnaie pratique et efficace pour les utilisateurs qui apprécient la confidentialité et la sécurité.

### Orchard Pool

L'Orchard Shielded Pool a été lancé le 31 mai 2022. Les adresses Orchard sont également appelées adresses unifiées (UA).

Étant donné que les adresses unifiées combinent les récepteurs pour Orchard, les adresses Sapling & Transparent, le montant des fonds stockés dans les adresses blindées devrait augmenter de manière significative. Il n'y a aucun moyen de faire la distinction entre les fonds envoyés aux pools transparents/protégés.

La piscine protégée Orchard constitue une amélioration significative des piscines existantes. Il forme un ensemble d'anonymat distinct des pools protégés Sprout et Sapling, ce qui contribue à accroître la confidentialité et l'anonymat des utilisateurs.

Les transactions au sein d'Orchard augmenteront la taille de l'ensemble d'anonymat plus rapidement que les transactions effectuées avec Sapling, en raison de la nature masquant l'arité des "actions" d'Orchard par rapport aux entrées et sorties UTXO.

La mise à niveau d'Orchard contribuera à apporter davantage d'améliorations au réseau Zcash, notamment des transactions plus rapides et plus efficaces, un anonymat accru, une sécurité améliorée et une plus grande flexibilité pour les développeurs afin de créer des applications décentralisées sur la Blockchain Zcash.

![IMG-20230419-221707](https://user-images.githubusercontent.com/81990132/233535609-6bf85926-567d-42ff-8b3f-9123afe98f65.jpg)

Les portefeuilles Zcash Shielded prennent désormais en charge Orchard sur leurs options de pool de fonds. Un bon exemple peut être trouvé sur l'application Zingo Wallet.


## Transparent Pool


Le pool Zcash Transparent est non protégé et non privé. L'adresse du portefeuille transparent sur Zcash commence par la lettre "t", la confidentialité est considérée comme très faible dans ce type de transaction.

Les transactions transparentes dans Zcash sont similaires aux transactions Bitcoin qui prennent en charge les transactions multi-signatures et utilisent des adresses publiques standard qui peuvent être envoyées et reçues par n'importe qui sur le réseau.


![IMG-20230420-100149](https://user-images.githubusercontent.com/81990132/233535663-bc536044-2537-41b2-9acb-69b3613e9ab6.jpg)

Les Zcash Transparent sont principalement utilisés par les échanges centralisés pour garantir une transparence élevée et une confirmation du réseau lors de l'envoi et de la réception de ZEC entre les utilisateurs.

Il est également important de noter que si les adresses Zcash Shielded offrent une confidentialité élevée lors des transactions, elles nécessitent également plus de ressources de calcul pour traiter les transactions. Par conséquent, certains utilisateurs peuvent adopter des adresses transparentes pour les transactions qui ne nécessitent pas le même niveau de confidentialité.

---
###

## Pratique recommandée pour le transfert de groupe

Lorsqu'il s'agit de prendre en compte un niveau élevé de confidentialité lors des transactions sur le réseau Zcash, il est recommandé de suivre les pratiques ci-dessous ;

![20230420_051415_0000.png](https://user-images.githubusercontent.com/38798812/233546739-e9076b2d-bcb5-40a1-96a8-25284dff0786.png)

Les transactions effectuées entre les portefeuilles "z à z" sur la blockchain Zcash sont principalement protégées et sont parfois appelées transactions privées en raison du niveau élevé de confidentialité généré. C'est généralement le moyen le plus efficace et le plus recommandé d'envoyer et de recevoir des $ZEC lorsque la confidentialité est requise.

---
![20230421_070131_0000.png](https://user-images.githubusercontent.com/38798812/233552931-d69f4ef3-b065-4d61-8e6b-adbc2edc4d70.png)

Lorsque vous envoyez ZEC de "Z-address" à "T-address", cela implique simplement une forme de transaction Deshielding. Dans ce type de transaction, le niveau de confidentialité n'est pas toujours élevé car certaines informations seront visibles sur la blockchain en raison de l'effet de l'envoi de ZEC sur une adresse transparente. La transaction de déblindage n'est pas toujours recommandée lorsqu'une confidentialité élevée est requise.

---

![20230421_071247_0000.png](https://user-images.githubusercontent.com/38798812/233555082-455fbcbd-c685-4c1d-91f2-2d911e6a6273.png)

Le transfert de ZEC d'une adresse transparente (adresse T) vers une adresse Z est simplement appelé blindage. Dans ce type de transaction, le niveau de confidentialité n'est pas toujours élevé par rapport à celui d'une transaction z-z, mais il est également recommandé lorsque la confidentialité est requise.



---

![20230420_091346_0000.png](https://user-images.githubusercontent.com/38798812/233546890-5580a7b9-e8c5-4e2c-a248-3f6338bbe0d1.png)

L'envoi de ZEC d'une adresse transparente (adresse T) à une autre adresse transparente (adresse T) sur le réseau Zcash (transaction T-T) est très similaire à celle de la transaction Bitcoin et c'est pourquoi les transactions T-T sur Zcash sont toujours appelées transactions publiques car les deux les détails de la transaction de l'expéditeur et du destinataire deviennent visibles au public, ce qui rend le niveau de confidentialité très faible dans une telle transaction.

La plupart des échanges centralisés de crypto-monnaie utilisent l'adresse transparente ("adresse T") lorsqu'il s'agit d'effectuer des transactions sur la blockchain Zcash, mais ce type de transaction (T-T) n'aura aucune propriété privée.



