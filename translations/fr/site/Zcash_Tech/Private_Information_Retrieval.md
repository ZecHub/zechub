# Récupération privée d'informations

## En bref

- La récupération privée d'informations, ou PIR, permet à un appareil d'obtenir un élément de la base de données d'un serveur sans que le serveur apprenne quel élément a été demandé
- Zcash en a besoin, car un portefeuille privé ne peut pas demander à un serveur quelles transactions lui appartiennent sans se trahir
- Aujourd'hui, les portefeuilles téléchargent et analysent beaucoup plus de données que nécessaire, ce qui explique en grande partie la lenteur de la synchronisation
- La PIR permettrait à un portefeuille de récupérer uniquement ses propres données de manière privée, supprimant ce goulot d'étranglement tout en préservant la confidentialité
- C'est un domaine de recherche actif pour Zcash, puissant en théorie, et que l'on est en train de rendre utilisable pour de vrais portefeuilles

<br/>

## À qui s'adresse cette page

- À toute personne qui s'est demandé comment un portefeuille privé retrouve ses propres pièces sans révéler lesquelles
- Aux nouveaux venus qui voient souvent la PIR mentionnée à côté des travaux de mise à l’échelle de Zcash
- Aux lecteurs qui veulent d'abord comprendre le concept, puis la cryptographie qui le sous-tend

<br/>

## Le problème que la PIR résout pour Zcash

Zcash masque le destinataire d'une transaction. Cette confidentialité soulève une question délicate : si le réseau ne peut pas voir quelles transactions vous appartiennent, comment votre propre portefeuille les retrouve-t-il ?

Aujourd'hui, la réponse est rudimentaire. Un portefeuille ne peut pas demander à un serveur quelles transactions sont les siennes, car cette question révélerait précisément ce que Zcash cherche à cacher. Le portefeuille télécharge donc une grande quantité de données et teste chaque élément localement pour savoir ce qui lui appartient. Cela fonctionne et préserve la confidentialité, mais c'est lent et lourd. Cette analyse est l'une des principales raisons pour lesquelles la synchronisation d'un portefeuille peut sembler poussive.

L'idéal serait qu'un portefeuille puisse demander à un serveur exactement ses propres données et les recevoir, sans que le serveur apprenne jamais ce qui a été demandé. C'est précisément ce qu'offre la récupération privée d'informations.

<br/>

## Qu'est-ce que la PIR

La récupération privée d'informations est une méthode cryptographique qui permet à un client de lire une entrée de la base de données d'un serveur sans révéler au serveur quelle entrée il a lue.

Imaginez une bibliothèque où vous pouvez recevoir exactement le livre que vous souhaitez, sans que le bibliothécaire sache jamais quel livre il vous a remis. Vous obtenez ce que vous voulez, et votre intérêt reste privé. La PIR est la version mathématique de cette idée, appliquée à n'importe quelle base de données.

Ce concept est étudié en cryptographie depuis des décennies. Il a été introduit pour la première fois en 1995 par Chor, Goldreich, Kushilevitz et Sudan, qui ont décrit l'approche à plusieurs serveurs, et la première version à serveur unique a suivi en 1997, proposée par Kushilevitz et Ostrovsky. Ce n'est pas une invention de Zcash, mais un domaine établi que Zcash applique désormais à un problème réel et tenace.

<br/>

## Comment fonctionne la PIR, dans les grandes lignes

Il existe deux grandes façons de construire une PIR, et la différence est importante.

La première utilise plusieurs serveurs. Le client envoie à chacun d'eux une partie de la requête et combine leurs réponses localement. Aucun serveur ne voit à lui seul suffisamment d'informations pour savoir ce qui a été demandé. C'est efficace, mais cela suppose que les serveurs ne s'entendent pas entre eux, ce qui est difficile à garantir dans le monde réel.

La seconde utilise un seul serveur et une cryptographie astucieuse au lieu de plusieurs parties. Le client s'appuie ici sur un outil particulier appelé chiffrement homomorphe, et c'est l'approche la plus utile pour les déploiements réels, car elle ne nécessite pas plusieurs serveurs qui ne s'entendent pas.

<br/>

## Le mécanisme : le chiffrement homomorphe

Le chiffrement homomorphe est un type de chiffrement qui permet à un serveur d'effectuer des calculs sur des données tout en les laissant chiffrées. Le serveur produit une réponse chiffrée correcte sans jamais voir les valeurs sous-jacentes.

Voici l'idée d'une PIR à serveur unique construite de cette façon. Le client veut l'élément numéro trois d'une liste. Il construit une requête qui correspond, en pratique, à un « oui » chiffré pour la position trois et à un « non » chiffré pour toutes les autres positions. Pour le serveur, cette requête n'est qu'un bruit dénué de sens : il ne peut pas savoir quelle position contient le « oui ».

Le serveur combine ensuite sa base de données avec cette requête chiffrée grâce aux propriétés particulières du chiffrement homomorphe, en multipliant chaque élément stocké par le « oui » ou le « non » chiffré correspondant, puis en additionnant les résultats. Il en ressort un paquet chiffré unique qui contient exactement l'élément voulu par le client, sans que rien ne révèle lequel. Le client déchiffre ce paquet et lit son élément. Le serveur a répondu à la question sans jamais la connaître.

Une version plus robuste, appelée PIR symétrique, ajoute une seconde garantie : le client n'apprend que l'élément qu'il a demandé et rien sur les autres entrées de la base de données. Cela protège la base de données autant que le client.

<br/>

## Pour aller plus loin : aspects techniques

Les schémas modernes à serveur unique reposent sur la cryptographie à base de réseaux euclidiens, le plus souvent sur l'hypothèse d'apprentissage avec erreurs. La requête du client est un vecteur de chiffrés, qui chiffre un à l'indice cible et zéro partout ailleurs, et le chiffrement est additivement homomorphe : le serveur peut donc additionner des chiffrés et les multiplier par des entrées en clair de la base de données sans les déchiffrer.

Le serveur traite la base de données comme une matrice, lui applique le vecteur de sélection chiffré et renvoie un chiffré unique qui se déchiffre en la ligne voulue. Comme la requête est indiscernable d'un bruit aléatoire, le serveur n'obtient aucune information sur l'indice.

L'obstacle historique a toujours été le coût. Dans une approche naïve, le serveur doit parcourir chaque entrée de la base de données pour chaque requête, ce qui est coûteux en calcul, et les chiffrés sont volumineux, ce qui est coûteux en bande passante. Les recherches récentes s'attaquent à ce problème grâce au prétraitement : des schémas comme SimplePIR et FrodoPIR permettent au serveur de préparer la base de données à l'avance et de remettre à chaque client un petit indice, reportant une grande partie du travail sur une phase hors ligne afin que les requêtes en direct deviennent rapides. Autre avantage, les constructions à base de réseaux euclidiens sont également considérées comme résistantes aux attaques quantiques, ce qui s'inscrit dans l'évolution plus large de Zcash vers une confidentialité post-quantique.

<br/>

## La PIR dans Zcash

La PIR fait partie des efforts visant à rendre Zcash à la fois confidentiel et rapide à grande échelle.

L'objectif est le goulot d'étranglement de l'analyse par les portefeuilles décrit plus haut. Des travaux menés chez Valar Group développent des techniques de récupération privée d'informations afin qu'un portefeuille puisse obtenir ses propres données d'un serveur sans que celui-ci sache quelles entrées ont été demandées. Une application concrète est la vérification privée des nullifiers. Un nullifier est un marqueur unique publié lorsqu'une note est dépensée, ce qui empêche que les mêmes fonds soient dépensés deux fois. Un portefeuille doit souvent vérifier si un nullifier donné est déjà apparu, autrement dit si une note n'a pas encore été dépensée, et le faire aujourd'hui via un serveur peut révéler la note concernée. La récupération privée d'informations permet au portefeuille de poser cette question sans révéler le nullifier qui l'intéresse. Ces travaux s'inscrivent aux côtés d'autres chantiers de mise à l’échelle, dont le projet Tachyon et de nouveaux logiciels de nœud, qui visent à supprimer les limites de performance qui freinent aujourd'hui les portefeuilles privés.

Il importe d'être honnête sur l'état d'avancement. Il s'agit de recherche et d'ingénierie en cours, et non d'une fonctionnalité achevée et déployée. Le concept est bien établi et la direction est fixée, mais rendre la PIR suffisamment efficace pour des portefeuilles du quotidien sur des appareils ordinaires est précisément la partie difficile sur laquelle on travaille actuellement.

<br/>

## Idées reçues

- La PIR masque l'élément que vous avez demandé, mais elle ne masque pas nécessairement le fait que vous avez contacté le serveur : les métadonnées au niveau du réseau sont une question distincte
- La PIR n'est pas propre à Zcash : c'est un outil cryptographique général que Zcash applique à la confidentialité des portefeuilles
- Une synchronisation plus rapide grâce à la PIR est un objectif en cours, et non une fonctionnalité déjà présente dans les portefeuilles
- Tout télécharger et analyser localement, l'approche actuelle, est confidentiel mais lent : la PIR vise à conserver la confidentialité tout en supprimant la lenteur

<br/>

## Pages connexes

- [Zcash Synchronisation des portefeuilles](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - pourquoi la synchronisation fonctionne comme elle le fait aujourd'hui
- [Nœuds pour portefeuilles légers](https://zechub.wiki/zcash-tech/lightwallet-nodes) - le modèle de client léger que la PIR améliorerait
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - l'autre grand outil cryptographique qui sous-tend la confidentialité de Zcash
- [Sécurité post-quantique](https://zechub.wiki/zcash-tech/post-quantum-security) - pourquoi les méthodes à base de réseaux euclidiens comptent pour l'avenir
