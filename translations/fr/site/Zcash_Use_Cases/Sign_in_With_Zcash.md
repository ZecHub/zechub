# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Se connecter avec Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermédiaire - 7 min</span>

## En bref

- Connectez-vous en prouvant que vous contrôlez une adresse Zcash, au lieu d'utiliser un mot de passe
- Deux conceptions sont utilisées : **la signature d'un défi**, ou **l'envoi d'un paiement protégé avec un code dans le mémo**
- Comme les adresses protégées masquent le solde et l'historique, prouver leur contrôle n'expose pas vos finances
- Ce modèle en est à ses débuts. Il n'existe pas encore de norme ratifiée, et les implémentations ne sont pas interopérables

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> À qui s'adresse cette page ?

- Aux développeurs qui souhaitent une connexion sans mot de passe, sans collecter de données personnelles
- Aux utilisateurs qui préfèrent ne pas confier une adresse e-mail à chaque site
- À toute personne qui souhaite se connecter sans lier son historique financier à un compte

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Le problème

La plupart des options de connexion laissent fuiter quelque chose :

- **Les mots de passe et l'e-mail** créent un compte lié à votre identité, et tous deux finissent dans des fuites de données
- **La connexion via les réseaux sociaux** indique au fournisseur d'identité chaque endroit où vous vous connectez, et à quel moment
- **La connexion par portefeuille sur les chaînes transparentes** est pire qu'il n'y paraît. Connecter un portefeuille peut révéler au site l'intégralité de votre solde et de votre historique de transactions, de façon permanente

Vous devez généralement choisir entre commodité et divulgation.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Pourquoi Zcash ?

Zcash sépare le fait de *prouver le contrôle* de celui de *révéler ses finances* :

- **Les adresses protégées** gardent les soldes et l'historique des transactions confidentiels : prouver que vous en détenez une ne dit rien de ce que vous détenez
- **Les mémos chiffrés** peuvent transporter un code de connexion à usage unique de manière confidentielle à l'intérieur d'une transaction
- **Les clés pour lecture seule** permettent la divulgation sélective : une application peut ainsi recevoir un accès en lecture à exactement ce dont elle a besoin, et rien de plus

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Comment ça fonctionne

Deux approches ont vu le jour. Dans les deux cas, l'application finit par détenir un identifiant stable pour vous, sans mot de passe.

### Approche 1 : signer un défi

1. L'application génère un défi aléatoire à usage unique
2. Votre portefeuille signe ce défi avec la clé associée à votre adresse
3. L'application vérifie la signature et vous connecte

Rien n'est diffusé sur le réseau : il n'y a donc ni frais ni attente d'un bloc. La spécification concernée est [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), qui est encore à l'état de brouillon ; la prise en charge de la signature de messages varie donc selon les portefeuilles.

### Approche 2 : le prouver avec un paiement protégé

1. L'application génère un code à usage unique et affiche une demande de paiement
2. Vous envoyez une petite transaction protégée avec ce code dans le mémo
3. L'application surveille le mémo, vérifie la correspondance du code et vous connecte

Cette méthode fonctionne dès aujourd'hui avec les portefeuilles qui prennent en charge les mémos, c'est-à-dire la plupart d'entre eux. La contrepartie est qu'elle entraîne des frais de réseau et qu'il faut attendre la confirmation.

### Garder l'adresse confidentielle

Une application n'a pas besoin de stocker votre adresse pour vous reconnaître. Certaines implémentations la hachent avec une valeur propre à l'application, de sorte que chaque site voit un identifiant différent mais stable pour le même utilisateur. Cela empêche les sites de recouper leurs informations pour relier vos comptes.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Compromis

À bien comprendre avant de développer dessus ou de vous y fier.

| | Défi signé | Paiement protégé |
|---|---|---|
| Coût | Gratuit | Frais de réseau à chaque connexion |
| Rapidité | Instantané | Attente de la confirmation |
| Prise en charge par les portefeuilles | Limitée, la ZIP 304 est un brouillon | Large, nécessite seulement les mémos |
| Laisse une trace sur la chaîne | Non | Oui, une transaction existe |

Limites communes :

- **Pas de récupération de compte par défaut.** Perdre la clé signifie perdre le compte, à moins que l'application ne prévoie un moyen de récupération
- **La réutilisation d'adresse peut vous identifier.** Utiliser la même adresse sur de nombreux sites recrée le problème du pistage, d'où l'importance des identifiants propres à chaque application
- **Pas de norme ratifiée.** Chaque projet a son propre schéma : une connexion conçue pour l'un ne fonctionne pas avec un autre
- **Pas d'anonymat à elle seule.** Elle masque vos finances à l'application, mais celle-ci peut toujours profiler ce que vous faites une fois connecté

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erreurs courantes à éviter

- Réutiliser un code de défi. Chaque code doit être à usage unique et expirer rapidement, sinon un code intercepté peut être rejoué
- Demander aux utilisateurs d'envoyer un montant significatif pour se connecter. Le paiement est une preuve : le montant doit être dérisoire
- Stocker l'adresse brute alors qu'un identifiant propre à l'application remplirait la même fonction
- Supposer que la signature de messages fonctionne partout. Vérifiez les portefeuilles que vos utilisateurs possèdent réellement
- Considérer un mémo comme secret après coup. Il prouve que l'expéditeur a agi, ce n'est pas un mot de passe

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Projets qui explorent cette idée

Ces projets ont été réalisés pour la catégorie **Connexion Zcash** du [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). Ce sont des expérimentations plutôt que des produits finis, et ils montrent à quel point une même idée peut être mise en œuvre de façons différentes.

- **ZecAuth** - un protocole de connexion de portefeuille pour Zcash, dans l'esprit de ce que fait WalletConnect ailleurs. L'application affiche un QR code ou un lien `zecauth://` contenant un défi ainsi que les autorisations demandées, comme la connexion, les demandes de paiement ou l'accès en lecture. Aucune transaction, aucuns frais, aucune interaction avec la chaîne. Il est fourni avec une spécification écrite du protocole en plus du code
- **ZShield** - transforme une adresse protégée en DID W3C et en identité OpenID Connect. Le navigateur génère une paire de clés, le serveur émet un nonce via une interface de type ZIP 304, le portefeuille le signe et le serveur renvoie un JWT. Comme le résultat est compatible OIDC, les applications existantes peuvent l'utiliser sans intégration sur mesure
- **ZecPass** - prouve la propriété au moyen d'un mémo signé, et est conçu pour que l'application n'apprenne jamais l'adresse de l'utilisateur. Il dérive un hachage propre à l'application, utilisé comme identifiant stable, maintient des défis à usage unique et limités dans le temps, et fournit un bouton React prêt à l'emploi accompagné d'une bibliothèque de vérification Node
- **Portal** - connexion par l'envoi d'une transaction protégée avec un code à usage unique dans le mémo, fonctionnant sur le réseau principal. Le même processus est réutilisé pour débloquer du contenu payant et pour envoyer ou recevoir de l'argent à partir d'un lien
- **ZcashMe** - utilise un paiement protégé comme preuve d'identité, et se concentre sur le passage de l'ordinateur au mobile, afin que la connexion sur un ordinateur portable ne nécessite pas d'extension de navigateur
- **ZBooks** - un outil de comptabilité et de versements qui considère la connexion avec Zcash comme une brique d'authentification réutilisable plutôt que comme le produit lui-même, et lit les données de trésorerie au moyen d'une Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Pages associées

- [Mémos](/using-zcash/memos) - comment fonctionnent les mémos chiffrés, et comment un code de connexion y circule
- [Clés pour lecture seule](/zcash-tech/viewing-keys) - accorder un accès en lecture seule sans céder le pouvoir de dépense
- [Tenir des registres avec ZEC protégé](/zcash-use-cases/keeping-records-with-shielded-zec) - la même idée de divulgation sélective, appliquée à la comptabilité
- [Envoyer de l'argent sans lier son identité](/zcash-use-cases/send-money-without-linking-identity) - pourquoi la réutilisation d'adresse nuit à la confidentialité

<br/>
