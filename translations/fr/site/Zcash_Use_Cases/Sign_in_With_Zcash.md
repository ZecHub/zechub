---
# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Se connecter avec Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermédiaire - 7 min</span>

## TL;DR

- Connectez-vous en prouvant que vous contrôlez une adresse Zcash, au lieu d’utiliser un mot de passe
- Deux conceptions sont utilisées : **signer un challenge**, ou **envoyer un paiement shielded avec un code dans le mémo**
- Comme les adresses shielded masquent le solde et l’historique, prouver leur contrôle n’expose pas vos finances
- Ce modèle en est à ses débuts. Il n’existe pas encore de standard ratifié, et les implémentations ne sont pas interopérables

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> À qui s’adresse cette page ?

- Les développeurs qui veulent une connexion sans mot de passe sans collecter de données personnelles
- Les utilisateurs qui préfèrent ne pas donner leur adresse e-mail à chaque site
- Toute personne qui veut se connecter sans lier son historique financier à un compte

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Le problème

La plupart des options de connexion divulguent quelque chose :

- **Les mots de passe et l’e-mail** créent un compte lié à votre identité, et tous deux finissent dans des fuites de données
- **La connexion via les réseaux sociaux** indique au fournisseur d’identité tous les endroits où vous vous connectez et à quel moment
- **La connexion par wallet sur des chaînes transparentes** est pire qu’elle n’en a l’air. Connecter un wallet peut donner au site l’accès à l’intégralité de votre solde et de votre historique de transactions, de façon permanente

En général, vous choisissez entre commodité et divulgation.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Pourquoi Zcash ?

Zcash sépare *la preuve de contrôle* de *la divulgation des finances* :

- **Les adresses shielded** gardent privés les soldes et l’historique des transactions, donc prouver que vous en détenez une ne révèle rien de ce que vous possédez
- **Les mémos chiffrés** peuvent transporter un code de connexion à usage unique de manière privée à l’intérieur d’une transaction
- **Les Viewing keys** permettent une divulgation sélective, de sorte qu’une application peut recevoir un accès en lecture à exactement ce dont elle a besoin, et rien de plus

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Comment ça fonctionne

Deux approches ont émergé. Les deux aboutissent à ce que l’application dispose pour vous d’un identifiant stable, sans mot de passe.

### Approche 1 : signer un challenge

1. L’application génère un challenge aléatoire à usage unique
2. Votre wallet signe ce challenge avec la clé derrière votre adresse
3. L’application vérifie la signature et vous connecte

Rien n’est diffusé, donc il n’y a ni frais ni attente d’un bloc. La spécification pertinente est [ZIP 304, Signatures d’adresses Sapling](https://zips.z.cash/zip-0304), qui est encore un brouillon, donc la prise en charge de la signature de messages varie selon les wallets.

### Approche 2 : le prouver avec un paiement shielded

1. L’application génère un code à usage unique et affiche une demande de paiement
2. Vous envoyez une petite transaction shielded avec ce code dans le mémo
3. L’application surveille l’arrivée du mémo, fait correspondre le code et vous connecte

Cela fonctionne aujourd’hui avec les wallets qui prennent déjà en charge les mémos, ce qui est le cas de la plupart d’entre eux. L’inconvénient, c’est que cela coûte des frais réseau et qu’il faut attendre une confirmation.

### Garder l’adresse privée

Une application n’a pas besoin de stocker votre adresse pour vous reconnaître. Certaines implémentations la hachent avec une valeur propre à l’application, de sorte que chaque site voit un identifiant différent mais stable pour le même utilisateur. Cela empêche les sites de comparer leurs données pour relier vos comptes.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Compromis

Il vaut la peine de les comprendre avant de construire dessus ou de vous y fier.

| | Challenge signé | Paiement shielded |
|---|---|---|
| Coût | Gratuit | Frais réseau à chaque connexion |
| Vitesse | Instantané | Attend une confirmation |
| Prise en charge par les wallets | Limitée, ZIP 304 est un brouillon | Large, nécessite seulement les mémos |
| Laisse une trace on-chain | Non | Oui, une transaction existe |

Limites communes :

- **Pas de récupération de compte par défaut.** Perdre la clé signifie perdre le compte, sauf si l’application prévoit une voie de récupération
- **La réutilisation d’adresse peut vous relier.** Utiliser la même adresse sur de nombreux sites recrée le problème du pistage, c’est pourquoi les identifiants spécifiques à l’application comptent
- **Pas de standard ratifié.** Chaque projet a son propre schéma, donc une connexion conçue pour l’un ne fonctionne pas avec un autre
- **Ce n’est pas l’anonymat à lui seul.** Cela masque vos finances à l’application, mais l’application peut toujours profiler ce que vous faites une fois à l’intérieur

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Erreurs courantes à éviter

- Réutiliser un code de challenge. Chaque code doit être à usage unique et expirer rapidement, sinon un code intercepté peut être rejoué
- Demander aux utilisateurs d’envoyer un montant significatif pour se connecter. Le paiement est une preuve, donc le montant doit être insignifiant
- Stocker l’adresse brute alors qu’un identifiant propre à l’application ferait le même travail
- Supposer que la signature de messages fonctionne partout. Vérifiez les wallets que vos utilisateurs possèdent réellement
- Considérer un mémo comme secret après coup. Il prouve que l’expéditeur a agi, ce n’est pas un mot de passe

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Projets qui explorent cette approche

Ceux-ci ont été créés pour la piste **Zcash Login** du [Hackathon ZecHub 3.0](https://zechub.wiki/hackathon). Ce sont des expériences plutôt que des produits finis, et ils montrent à quel point une même idée peut être construite différemment.

- **ZecAuth** - un protocole de connexion de wallet pour Zcash, dans l’esprit de ce que WalletConnect fait ailleurs. L’application affiche un code QR ou un lien `zecauth://` contenant un challenge ainsi que les capacités qu’elle demande, comme la connexion, les demandes de paiement ou l’accès en visualisation. Pas de transaction, pas de frais, pas d’interaction on-chain. Il est livré avec une spécification de protocole écrite en plus du code
- **ZShield** - transforme une adresse shielded en DID W3C et en identité OpenID Connect. Le navigateur génère une paire de clés, le serveur émet un nonce via une interface de type ZIP 304, le wallet le signe, et le serveur renvoie un JWT. Comme le résultat est compatible OIDC, les applications existantes peuvent l’utiliser sans intégration sur mesure
- **ZecPass** - prouve la propriété via un mémo signé, et est conçu de façon à ce que l’application n’apprenne jamais du tout l’adresse de l’utilisateur. Il dérive un hash propre à l’application à utiliser comme identifiant stable, garde les challenges à usage unique et limités dans le temps, et fournit un bouton React prêt à l’emploi avec une bibliothèque de vérification Node
- **Portal** - permet la connexion en envoyant une transaction shielded avec un code à usage unique dans le mémo, en fonctionnement sur mainnet. Le même flux est réutilisé pour débloquer du contenu payant et pour envoyer ou recevoir de l’argent depuis un lien
- **ZcashMe** - utilise un paiement shielded comme preuve d’identité, et se concentre sur l’écart desktop-mobile afin que se connecter sur un ordinateur portable ne nécessite pas une extension de navigateur
- **ZBooks** - un outil de comptabilité et de paiements qui traite la connexion avec Zcash comme une primitive d’authentification réutilisable plutôt que comme le produit lui-même, et lit les données de trésorerie via une Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Pages liées

- [Mémos](/using-zcash/memos) - comment fonctionnent les mémos chiffrés, et comment un code de connexion circule à l’intérieur de l’un d’eux
- [Viewing Keys](/zcash-tech/viewing-keys) - accorder un accès en lecture seule sans céder le pouvoir de dépenser
- [Conserver des registres avec des ZEC shielded](/zcash-use-cases/keeping-records-with-shielded-zec) - la même idée de divulgation sélective, appliquée à la comptabilité
- [Envoyer de l’argent sans lier l’identité](/zcash-use-cases/send-money-without-linking-identity) - pourquoi la réutilisation d’adresse compromet la confidentialité

<br/>
