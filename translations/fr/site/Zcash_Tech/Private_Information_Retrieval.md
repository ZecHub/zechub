# Récupération privée d’informations

## TL;DR

- La récupération privée d’informations, ou PIR, permet à un appareil de récupérer un élément dans la base de données d’un serveur sans que le serveur apprenne quel élément a été demandé
- Zcash en a besoin parce qu’un wallet privé ne peut pas demander à un serveur quelles transactions lui appartiennent sans se dévoiler
- Aujourd’hui, les wallets téléchargent et analysent bien plus de données que nécessaire, ce qui est l’une des principales raisons pour lesquelles la synchronisation est lente
- Le PIR permettrait à un wallet de récupérer uniquement ses propres données de manière privée, supprimant ce goulot d’étranglement tout en préservant la confidentialité
- C’est un domaine de recherche actif pour Zcash, puissant en théorie, et en cours de concrétisation pour de vrais wallets

<br/>

## À qui s’adresse ceci

- Toute personne qui s’est déjà demandé comment un wallet privé retrouve ses propres coins sans révéler lesquels
- Les nouveaux venus qui voient sans cesse le PIR mentionné aux côtés des travaux de mise à l’échelle de Zcash
- Les lecteurs qui veulent d’abord comprendre le concept, puis la cryptographie sous-jacente ensuite

<br/>

## Le problème que le PIR résout pour Zcash

Zcash masque le destinataire d’une transaction. Cette confidentialité soulève une question délicate : si le réseau ne peut pas voir quelles transactions vous appartiennent, comment votre propre wallet les retrouve-t-il ?

Aujourd’hui, la réponse est brutale. Un wallet ne peut pas demander à un serveur quelles transactions sont les miennes, parce qu’une telle question révélerait précisément ce que Zcash cherche à cacher. Le wallet télécharge donc à la place une grande quantité de données et teste chaque élément localement pour voir ce qui lui appartient. Cela fonctionne, et cela préserve la confidentialité, mais c’est lent et lourd. Cette analyse est l’une des principales raisons pour lesquelles la synchronisation d’un wallet peut sembler laborieuse.

L’idéal serait un moyen pour un wallet de demander à un serveur exactement ses propres données, et de les recevoir, sans que le serveur n’apprenne jamais ce qui a été demandé. C’est exactement ce que fournit la récupération privée d’informations.

<br/>

## Ce qu’est le PIR

La récupération privée d’informations est une méthode cryptographique qui permet à un client de lire une entrée dans la base de données d’un serveur sans révéler au serveur quelle entrée a été lue.

Imaginez une bibliothèque où vous pouvez recevoir exactement le livre que vous voulez, mais où le bibliothécaire n’apprend jamais quel livre il vous a remis. Vous obtenez votre ouvrage, et votre intérêt reste privé. Le PIR est la version mathématique de cette idée, appliquée à n’importe quelle base de données.

Le concept est étudié en cryptographie depuis des décennies. Il a été introduit pour la première fois en 1995 par Chor, Goldreich, Kushilevitz et Sudan, qui ont décrit l’approche à serveurs multiples, et la première version à serveur unique a suivi en 1997 avec Kushilevitz et Ostrovsky. Ce n’est pas quelque chose que Zcash a inventé, c’est un domaine établi que Zcash applique désormais à un problème réel et tenace.

<br/>

## Comment fonctionne le PIR, à un premier niveau

Il existe deux grandes manières de construire un PIR, et cette différence compte.

La première utilise plusieurs serveurs. Le client envoie à chacun de plusieurs serveurs une partie de la requête, puis combine leurs réponses localement. Aucun serveur pris individuellement ne voit assez d’informations pour apprendre ce qui a été demandé. C’est efficace, mais cela dépend du fait que les serveurs ne collusionnent pas entre eux, ce qu’il est difficile de garantir dans le monde réel.

La seconde utilise un seul serveur et une cryptographie ingénieuse plutôt que plusieurs parties. Ici, le client s’appuie sur un outil spécial appelé chiffrement homomorphe, et c’est la direction la plus utile pour des déploiements réels, car elle ne nécessite pas plusieurs serveurs ne collusionnant pas.

<br/>

## Le mécanisme : le chiffrement homomorphe

Le chiffrement homomorphe est un type de chiffrement qui permet à un serveur de calculer sur des données tout en les gardant chiffrées. Le serveur produit une réponse chiffrée correcte sans jamais voir les valeurs sous-jacentes.

Voici l’idée derrière le PIR à serveur unique construit de cette façon. Le client veut l’élément numéro trois dans une liste. Il construit une requête qui est, en pratique, un oui chiffré pour la position trois et un non chiffré pour toutes les autres positions. Pour le serveur, cette requête n’est qu’un bruit dénué de sens, il ne peut pas dire quelle position contient le oui.

Le serveur combine ensuite sa base de données avec cette requête chiffrée en utilisant les propriétés spéciales du chiffrement homomorphe, en multipliant chaque élément stocké par le oui ou le non chiffré correspondant puis en additionnant les résultats. Ce qui en sort est un seul paquet chiffré contenant exactement l’élément voulu par le client, et rien ne révèle lequel c’était. Le client déchiffre ce paquet et lit son élément. Le serveur a répondu à la question sans jamais connaître la question.

Une version plus forte, appelée PIR symétrique, ajoute une seconde garantie : le client n’apprend que l’élément qu’il a demandé et rien sur les autres entrées de la base de données. Cela protège la base de données autant que le client.

<br/>

## Un regard plus approfondi pour les lecteurs techniques

Les schémas modernes à serveur unique sont construits sur la cryptographie sur réseaux, le plus souvent sur l’hypothèse learning with errors. La requête du client est un vecteur de ciphertexts, un chiffrement de un à l’indice cible et de zéro ailleurs, et le chiffrement est homomorphe additif, de sorte que le serveur peut additionner des ciphertexts et les multiplier par des entrées en clair de la base de données sans déchiffrer.

Le serveur traite la base de données comme une matrice, applique le vecteur de sélection chiffré et renvoie un seul ciphertext qui se déchiffre en la ligne voulue. Comme la requête est indiscernable d’un bruit aléatoire, le serveur n’obtient aucune information sur l’indice.

L’obstacle historique a toujours été le coût. De manière naïve, le serveur doit parcourir chaque entrée de la base de données pour chaque requête, ce qui est coûteux en calcul, et les ciphertexts sont volumineux, ce qui est coûteux en bande passante. Les recherches récentes s’attaquent à cela avec du prétraitement ; des schémas comme SimplePIR et FrodoPIR permettent au serveur de préparer la base de données à l’avance et de remettre à chaque client un petit indice, déplaçant une grande partie du travail dans une phase hors ligne afin que les requêtes en direct deviennent rapides. Un avantage utile supplémentaire est que les constructions fondées sur les réseaux sont aussi considérées comme résistantes aux attaques quantiques, ce qui s’aligne sur l’orientation plus large de Zcash vers une confidentialité post-quantique.

<br/>

## Le PIR dans Zcash

Le PIR fait partie des efforts visant à rendre Zcash à la fois privé et rapide à grande échelle.

Le goulot d’étranglement lié à l’analyse par le wallet décrit plus haut est la cible. Les travaux du Valar Group développent des techniques de récupération privée d’informations afin qu’un wallet puisse récupérer ses propres données depuis un serveur sans que celui-ci apprenne quelles entrées ont été demandées. Une application concrète consiste à vérifier les nullifiers de manière privée. Un nullifier est un marqueur unique publié lorsqu’une note est dépensée, ce qui empêche que les mêmes fonds soient dépensés deux fois. Un wallet doit souvent vérifier si un nullifier donné est déjà apparu, autrement dit si une note n’a pas encore été dépensée, et faire cela via un serveur aujourd’hui peut révéler quelle note est interrogée. La récupération privée d’informations permet au wallet de poser cette question sans révéler quel nullifier l’intéresse. Cela s’inscrit aux côtés d’autres travaux de mise à l’échelle, notamment Project Tachyon et de nouveaux logiciels de nœud, visant à supprimer les limites de performance qui freinent aujourd’hui les wallets privés.

Il est important d’être honnête sur le stade actuel. Il s’agit de recherche et d’ingénierie actives, pas d’une fonctionnalité terminée et déjà livrée. Le concept est bien établi et la direction est définie, mais rendre le PIR suffisamment efficace pour des wallets du quotidien sur des appareils ordinaires est précisément la partie difficile en cours de travail aujourd’hui.

<br/>

## Idées reçues fréquentes

- Le PIR masque l’élément que vous avez demandé, mais il ne masque pas nécessairement le fait que vous avez contacté le serveur ; les métadonnées au niveau du réseau sont une question distincte
- Le PIR n’est pas propre à Zcash, c’est un outil cryptographique général que Zcash applique à la confidentialité des wallets
- Une synchronisation plus rapide grâce au PIR est un objectif en cours, pas une fonctionnalité déjà présente dans les wallets
- Télécharger l’ensemble des données et les analyser localement, l’approche actuelle, est privé mais lent ; le PIR vise à préserver la confidentialité tout en supprimant cette lenteur

<br/>

## Pages liées

- [Synchronisation des wallets Zcash](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - pourquoi la synchronisation fonctionne aujourd’hui de cette manière
- [Nœuds lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - le modèle de client léger que le PIR améliorerait
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - l’autre grand outil cryptographique derrière la confidentialité de Zcash
- [Sécurité post-quantique](https://zechub.wiki/zcash-tech/post-quantum-security) - pourquoi les méthodes fondées sur les réseaux comptent pour l’avenir
