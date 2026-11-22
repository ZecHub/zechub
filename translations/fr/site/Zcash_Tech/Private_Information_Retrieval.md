# Récupération privée d’informations

## En bref

- La récupération privée d’informations, ou PIR, permet à un appareil de récupérer un élément dans la base de données d’un serveur sans que celui-ci sache quel élément a été demandé
- Zcash en a besoin, car un portefeuille privé ne peut pas demander à un serveur quelles transactions lui appartiennent sans se dévoiler
- Aujourd’hui, les portefeuilles téléchargent et analysent bien plus de données que nécessaire, ce qui explique en grande partie la lenteur de la synchronisation
- La PIR permettrait à un portefeuille de récupérer uniquement ses propres données en toute confidentialité, en éliminant ce goulot d’étranglement tout en préservant la confidentialité
- C’est un domaine de recherche actif pour Zcash, prometteur en théorie et en cours d’adaptation pour être utilisable dans de vrais portefeuilles
- Une démonstration en direct est déjà disponible : [ZecBlock Private](https://private.zecblock.com) est le premier explorateur de blocs Zcash complet fondé sur la PIR (transactions, blocs et adresses)

## À qui s’adresse cette page

- À toute personne qui s’est demandé comment un portefeuille privé retrouve ses propres fonds sans révéler lesquels
- Aux personnes qui découvrent le sujet et voient souvent la PIR mentionnée en parallèle des travaux de mise à l’échelle de Zcash
- Aux lecteurs qui souhaitent comprendre le concept avant d’aborder la cryptographie sous-jacente
- À toute personne curieuse de découvrir un explorateur de blocs fonctionnel fondé sur la PIR

## Le problème que la PIR résout pour Zcash

Zcash dissimule le destinataire d’une transaction. Cette confidentialité soulève une question délicate : si le réseau ne peut pas voir quelles transactions vous appartiennent, comment votre propre portefeuille les retrouve-t-il ?

Aujourd’hui, la réponse est simple. Un portefeuille ne peut pas demander à un serveur quelles transactions sont les miennes, car cette question révélerait précisément ce que Zcash cherche à dissimuler. Le portefeuille télécharge donc une grande quantité de données et vérifie chaque élément localement pour déterminer lesquels lui appartiennent. Cette méthode fonctionne et préserve la confidentialité, mais elle est lente et lourde. Cette analyse est l’une des principales raisons pour lesquelles la synchronisation d’un portefeuille peut sembler laborieuse.

L’idéal serait qu’un portefeuille puisse demander à un serveur précisément ses propres données et les recevoir sans que le serveur apprenne jamais ce qui a été demandé. C’est exactement ce que permet la récupération privée d’informations.

## Qu’est-ce que la PIR ?

La récupération privée d’informations est une méthode cryptographique qui permet à un client de lire une entrée dans la base de données d’un serveur sans révéler à celui-ci laquelle il a lue.

Imaginez une bibliothèque où vous pouvez recevoir exactement le livre que vous voulez, sans que la personne à l’accueil sache lequel elle vous a remis. Vous obtenez ce que vous cherchez et vos intérêts restent privés. La PIR est la version mathématique de cette idée, appliquée à n’importe quelle base de données.

Ce concept est étudié en cryptographie depuis des décennies. Il a été présenté pour la première fois en 1995 par Chor, Goldreich, Kushilevitz et Sudan, qui ont décrit l’approche à plusieurs serveurs. La première version à serveur unique a suivi en 1997, proposée par Kushilevitz et Ostrovsky. Ce n’est pas une invention de Zcash : c’est un domaine établi que Zcash applique aujourd’hui à un problème concret et persistant.

## Comment fonctionne la PIR, en première approche

Il existe deux grandes façons de concevoir la PIR, et cette différence est importante.

La première fait appel à plusieurs serveurs. Le client envoie à chacun d’eux une partie de sa requête, puis combine leurs réponses localement. Aucun serveur à lui seul n’en voit assez pour savoir ce qui a été demandé. Cette méthode est efficace, mais elle repose sur l’absence de collusion entre les serveurs, ce qui est difficile à garantir dans le monde réel.

La seconde s’appuie sur un seul serveur et sur une cryptographie ingénieuse plutôt que sur plusieurs parties. Le client utilise alors un outil spécial appelé chiffrement homomorphe. C’est l’approche la plus utile pour les déploiements réels, car elle ne nécessite pas plusieurs serveurs qui ne se concertent pas.

## Le mécanisme : le chiffrement homomorphe

Le chiffrement homomorphe est une forme de chiffrement qui permet à un serveur d’effectuer des calculs sur des données qui restent chiffrées. Le serveur produit une réponse chiffrée correcte sans jamais voir les valeurs sous-jacentes.

Voici le principe d’une PIR à serveur unique fondée sur cette méthode. Le client veut récupérer le troisième élément d’une liste. Il construit une requête qui revient à chiffrer un oui pour la troisième position et un non pour toutes les autres. Pour le serveur, cette requête n’est qu’un bruit dénué de sens : il ne peut pas savoir quelle position contient le oui.

Le serveur combine ensuite sa base de données avec cette requête chiffrée en s’appuyant sur les propriétés particulières du chiffrement homomorphe. Il multiplie chaque élément stocké par le oui ou le non chiffré correspondant, puis additionne les résultats. Il obtient ainsi un seul paquet chiffré qui contient exactement l’élément voulu par le client, sans rien révéler sur son identité. Le client déchiffre ce paquet et lit l’élément. Le serveur a répondu à la question sans jamais savoir quelle était cette question.

Une version plus forte, appelée PIR symétrique, ajoute une seconde garantie : le client n’apprend que l’élément demandé, sans rien apprendre sur les autres entrées de la base de données. Cela protège la base de données aussi bien que le client.

## Pour les lecteurs qui souhaitent approfondir les aspects techniques

Les schémas modernes à serveur unique reposent sur la cryptographie fondée sur les réseaux euclidiens, le plus souvent sur l’hypothèse « learning with errors ». La requête du client est un vecteur de textes chiffrés : le texte chiffré d’un à l’index visé et de zéros ailleurs. Le chiffrement est homomorphe pour l’addition, ce qui permet au serveur d’additionner les textes chiffrés et de les multiplier par les entrées en clair de la base de données sans les déchiffrer.

Le serveur traite la base de données comme une matrice, lui applique le vecteur de sélection chiffré et renvoie un seul texte chiffré qui, une fois déchiffré, donne la ligne voulue. Comme la requête ne peut pas être distinguée d’un bruit aléatoire, le serveur n’obtient aucune information sur l’index.

Le principal obstacle a toujours été le coût. De manière naïve, le serveur doit accéder à chaque entrée de la base de données pour chaque requête, ce qui coûte cher en calcul, et les textes chiffrés sont volumineux, ce qui coûte cher en bande passante. Des recherches récentes s’attaquent à ce problème par le prétraitement. Des schémas comme SimplePIR et FrodoPIR permettent au serveur de préparer la base de données à l’avance et de fournir à chaque client un petit indice. Une grande partie du travail est ainsi déplacée vers une phase hors ligne, ce qui accélère les requêtes en direct. Autre avantage : les constructions fondées sur les réseaux euclidiens sont également considérées comme résistantes aux attaques quantiques, ce qui rejoint l’évolution plus générale de Zcash vers une confidentialité post-quantique.

## La PIR dans Zcash

La PIR fait partie des efforts visant à rendre Zcash à la fois privé et rapide à grande échelle.

Le goulot d’étranglement lié à l’analyse du portefeuille décrit plus haut est la cible. Les travaux menés au Valar Group développent des techniques de récupération privée d’informations afin qu’un portefeuille puisse récupérer ses propres données sur un serveur sans que celui-ci sache quelles entrées ont été demandées. Vérifier les nullifiers en toute confidentialité est une application concrète. Un nullifier est un marqueur unique publié lorsqu’une note est dépensée, ce qui empêche de dépenser les mêmes fonds deux fois. Un portefeuille doit souvent vérifier si un nullifier donné a déjà été publié, autrement dit si une note n’a pas encore été dépensée. Aujourd’hui, effectuer cette vérification par l’intermédiaire d’un serveur peut révéler quelle note est concernée. La récupération privée d’informations permet au portefeuille de poser cette question sans révéler le nullifier qui l’intéresse. Ces travaux s’inscrivent aux côtés d’autres initiatives de mise à l’échelle, dont le projet Tachyon et de nouveaux logiciels de nœud, qui visent à supprimer les limites de performance qui freinent aujourd’hui les portefeuilles privés.

Il est important de préciser où en sont ces travaux. Il s’agit d’une recherche et d’un développement actifs, pas d’une fonctionnalité achevée et déployée. Le concept est bien établi et l’orientation est définie, mais rendre la PIR suffisamment efficace pour les portefeuilles utilisés au quotidien sur des appareils ordinaires constitue précisément le défi auquel les équipes s’attaquent actuellement.

## Exemple en direct : ZecBlock Private

En novembre 2026, ZecBlock a lancé **ZecBlock Private** (private.zecblock.com), une version de son explorateur qui utilise la récupération privée d’informations pour rechercher des transactions, des blocs et des adresses.

C’est le premier explorateur de blocs Zcash complet (couvrant les transactions, les blocs et les adresses) fondé sur la PIR. Les démonstrations précédentes d’explorateurs utilisant la PIR se limitaient à des recherches plus restreintes, comme le solde d’une adresse.

### Fonctionnement des recherches privées

- La requête (identifiant de transaction, hauteur/hash de bloc ou adresse) est entièrement chiffrée dans le navigateur avant son envoi.
- Le serveur traite l’ensemble des données publiées sans savoir quel enregistrement a été demandé.
- Le serveur renvoie une réponse chiffrée unique que seul le navigateur peut déchiffrer.
- Une recherche portant sur un élément existant est impossible à distinguer d’une recherche portant sur un élément inexistant (même taille et même forme de requête).

Après chaque recherche, le site affiche un bref récapitulatif exact des éléments envoyés, ce qui permet de vérifier facilement la garantie de confidentialité.

### Étapes de vérification

Chaque publication de données est signée. Le navigateur vérifie la signature de chaque résultat avant de l’afficher, afin qu’un serveur malveillant ou défectueux ne puisse pas lui substituer d’autres données.

### Fraîcheur des données

De nouveaux blocs sont publiés toutes les quelques secondes. Les données de l’explorateur privé ont généralement environ 20 secondes de retard sur celles de l’explorateur ZecBlock classique.

### Coûts de bande passante

La PIR coûte plus cher qu’une recherche classique, car le serveur doit accéder à l’ensemble des données :

- Recherche de transaction : environ 1,2 Mo envoyé
- Recherche d’adresse : environ 0,4 Mo envoyé

C’est le coût pratique de l’impossibilité pour le serveur de savoir quoi que ce soit sur la requête.

### Implémentation côté client

Le client du navigateur est un wrapper Rust → WebAssembly (actuellement dans le dépôt ZecBlock sous `prototype/pir-browser`). Il repose sur les bibliothèques PIR open source de Valar Group. Le wrapper n’est pas encore publié comme package npm autonome, mais cela est prévu.

### Différence avec la PIR des portefeuilles

ZecBlock Private démontre l’utilisation de la PIR pour les données **publiques** de la chaîne (rechercher une transaction, un bloc ou une adresse connue sans révéler lequel). Cela ne résout **pas** le problème plus difficile des portefeuilles : découvrir en toute confidentialité quelles notes appartiennent à une clé pour lecture seule ou vérifier en privé les nullifiers associés aux notes non dépensées. Ces sujets restent des domaines de recherche actifs.

## Idées reçues courantes

- La PIR masque l’élément demandé, mais ne masque pas nécessairement le fait que vous avez contacté le serveur ; les métadonnées au niveau du réseau sont un sujet distinct.
- La PIR n’est pas propre à Zcash : c’est un outil cryptographique général que Zcash applique à la confidentialité des portefeuilles.
- L’accélération de la synchronisation grâce à la PIR est un objectif en cours, pas une fonctionnalité déjà présente dans les portefeuilles.
- Télécharger toutes les données et les analyser localement, comme c’est le cas actuellement, préserve la confidentialité mais reste lent ; la PIR vise à préserver cette confidentialité tout en supprimant cette lenteur.

## Pages associées

- [Zcash Synchronisation des portefeuilles](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - pourquoi la synchronisation fonctionne ainsi aujourd’hui
- [Nœuds lightwallet](https://zechub.wiki/zcash-tech/lightwallet-nodes) - le modèle de client léger que la PIR pourrait améliorer
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - l’autre grand outil cryptographique au cœur de la confidentialité de Zcash
- [Sécurité post-quantique](https://zechub.wiki/zcash-tech/post-quantum-security) - pourquoi les méthodes fondées sur les réseaux euclidiens comptent pour l’avenir
- [ZecBlock](https://zecblock.com) - le principal explorateur public
- [Valar Group](https://zechub.wiki/zcash-organizations/valar-group) - les développeurs des bibliothèques PIR utilisées par le prototype de l’explorateur et les recherches sur les portefeuilles
