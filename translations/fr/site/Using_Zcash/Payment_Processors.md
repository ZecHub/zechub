<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Processeurs de paiement Zcash

Les différentes façons d'accepter des ZEC en tant que commerçant, comparées côte à côte. Chaque entrée a été vérifiée sur le site et l'API du fournisseur le **29 juillet 2026**, à l'exception de Zcash Payment Service, ajouté le **1er novembre 2026**.

La prise en charge des actifs de confidentialité évolue souvent : chaque ligne indique donc sa propre date de vérification. Si vous lisez cette page plusieurs mois plus tard, consultez le site du fournisseur avant de procéder à l'intégration.

<div class="processor-table">

| Processeur | Garde des fonds | ZEC protégé | Auto-hébergement | Frais pour le commerçant | Régions / KYC | Vérifié |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Non dépositaire | Oui, Orchard via les Unified Addresses | Oui, open source | 1 % par paiement, gratuit en auto-hébergement | Pas de KYC, régions non précisées | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Non dépositaire, clé pour lecture seule uniquement | Oui, protégé uniquement (Sapling, Orchard, UA) | Oui, open source | Aucuns, vous ne payez que les frais de réseau | Mondial, pas de KYC | 2026-07-29 |
| [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service) | Non dépositaire, clé pour lecture seule des paiements entrants uniquement | Oui, protégé uniquement (Sapling et Orchard) | Oui, auto-hébergement uniquement, open source | Aucuns, vous ne payez que les frais de réseau | Pas de compte, pas de KYC | 2026-11-01 |
| [ZGo](https://zgo.cash/) | Non dépositaire | Oui, Sapling et Orchard | Non, service hébergé | Session prépayée, prix non publié | Pas de KYC indiqué, régions non précisées | 2026-07-29 |
| [Flexa](https://flexa.co/) | Le client conserve ses fonds, le commerçant est réglé en monnaie fiduciaire | Le client dépense depuis une adresse protégée, côté réception non documenté | Non | 1 % par paiement | États-Unis et 37 pays SEPA, ZEC dans l'UE non confirmé | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Non dépositaire par défaut | Non, adresse transparente uniquement | Non | 0,5 %, ou 1 % avec conversion | Mondial sauf là où c'est interdit, pas de KYC pour commencer | 2026-07-29 |
| [Plisio — paiements suspendus](https://plisio.net/) | Dépositaire, malgré son marketing | Non documenté | Non | 0,5 % via l'API, 1,5 % en marque blanche | Pas de KYC pour recevoir | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Dépositaire, hors chaîne | Non, dépôts protégés refusés | Non | Gratuit de portefeuille à portefeuille, 0,8 % sur les versements | Restrictions géographiques, ZEC retiré en FR, ES, IT, PL | 2026-07-29 |

</div>

### Signification des colonnes

**Garde des fonds** indique si le processeur détient vos ZEC. Non dépositaire signifie que les fonds arrivent dans un portefeuille que vous contrôlez.

**ZEC protégé** indique si vous pouvez être payé dans le pool protégé. Transparent uniquement signifie que le montant et les adresses sont publics sur la blockchain.

**Auto-hébergement** indique si vous pouvez faire tourner le logiciel vous-même, sans entreprise intermédiaire.

**Frais pour le commerçant** n'inclut pas les frais de réseau Zcash, que quelqu'un paie dans tous les cas.

Lorsqu'un fournisseur ne publie pas une information, l'entrée indique « non précisé » ou « non documenté » plutôt que de faire une supposition. Cela ne veut pas dire « non ».

### Lequel choisir

Pour un maximum de confidentialité et de contrôle, utilisez **BTCPay Server**, **CipherPay** en auto-hébergement, ou **Zcash Payment Service** si vous pouvez ajouter un peu de code à votre site. Les trois sont protégés, open source, et ne détiennent aucun fonds pour vous.

Pour encaisser des paiements en magasin plutôt qu'en ligne, utilisez **Flexa**.

Pour une passerelle hébergée, si les paiements transparents vous conviennent, utilisez **NOWPayments**. **Plisio** a suspendu les paiements (voir l'avis daté dans son entrée ci-dessous) : ne le choisissez donc pas pour le moment.

Une mise en garde mérite d'être répétée : un processeur limité aux adresses transparentes publie le montant et l'adresse de chaque paiement sur la blockchain. Et avec tout processeur non dépositaire hébergé, vous confiez votre clé pour lecture seule : l'entreprise peut donc voir vos paiements, même si elle ne peut pas les dépenser. L'auto-hébergement est le seul moyen d'éviter cela.

<div class="processor-note">

**Avertissement sur le service ZGo, 29 juillet 2026.** Le backend de ZGo à l'adresse api.zgo.cash renvoyait une erreur HTTP 503 sur tous les points de terminaison lors de la vérification de cette page. Le projet n'est pas abandonné et son mainteneur a été actif dans la communauté ce mois-ci, mais vérifiez que le service fonctionne avant de vous y fier.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Type de prise en charge** : protégé (Orchard, via les Unified Addresses)
- **Description** : acceptez des Zcash en quelques minutes, non dépositaire, aucune donnée sur l'acheteur, aucun intermédiaire.
- **URL** : [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Vous fournissez à CipherPay une clé pour lecture seule : les paiements arrivent donc directement dans votre propre portefeuille et le service ne détient jamais de fonds. Il utilise une nouvelle adresse pour chaque facture.

Orchard uniquement. Il n'y a aucune prise en charge de Sapling ni des adresses transparentes, même si le README du dépôt mentionne Sapling.

Il coûte 1 % par paiement, et rien du tout si vous l'hébergez vous-même. L'ensemble est open source, sous forme de binaire Rust avec SQLite ou d'image Docker. Il n'y a pas de KYC, et les acheteurs n'ont pas besoin de compte.

Les intégrations comprennent Shopify, WooCommerce, une API REST, une page de paiement hébergée, des liens de paiement et un QR code pour les paiements en personne.

Deux points à prendre en compte. Il a été lancé en février 2026 et n'a fait l'objet d'aucun audit de sécurité publié. Et dans l'offre hébergée, l'opérateur détient votre clé pour lecture seule : il peut donc voir vos paiements. L'auto-hébergement supprime ce problème. Les paiements protégés sont par ailleurs définitifs : un remboursement nécessite que l'acheteur vous communique une adresse.

**Dernière vérification :** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Type de prise en charge** : protégé uniquement (Sapling, Orchard, Unified Address)
- **Description** : BTCPay Server est un processeur de paiement en cryptomonnaies open source et auto-hébergé.
- **URL** : [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

C'est l'option la plus solide en matière de garde des fonds. Son backend de portefeuille fonctionne en lecture seule et ne détient ni phrase de récupération ni clé secrète : même un serveur compromis ne peut pas dépenser votre argent.

Protégé uniquement, avec prise en charge de Sapling, Orchard et des Unified Addresses. Il n'existe aucune solution de repli transparente : ne comptez donc pas dessus.

Pour l'installer, vous avez besoin du fork btcpay-zcash Docker sur la branche feat/zec, ainsi que d'une clé pour lecture seule exportée depuis un portefeuille tel que Zkool ou Zingo. Par défaut, il communique avec un lightwalletd distant, mais vous pouvez aussi faire tourner Zebra et lightwalletd vous-même.

Une limitation à connaître : le plugin utilise un seul portefeuille Zcash pour toutes les boutiques d'une même instance. Ne l'utilisez donc pas sur un serveur partagé. Des portefeuilles par boutique sont en cours de développement.

Le logiciel lui-même n'entraîne aucuns frais. Vous payez les frais de réseau Zcash et le coût de votre hébergement.

**Dernière vérification :** 2026-07-29

---

## [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)
- **Type de prise en charge** : protégé uniquement (Sapling et Orchard)
- **Description** : un processeur de paiement Zcash gratuit et auto-hébergé pour les commerçants en ligne, exécuté sous forme de conteneur Docker ou intégré sous forme de crate Rust.
- **URL** : [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)

Un processeur gratuit et open source (MIT) créé par Andrew Arnott, qui l'utilise déjà pour de vrais paiements dans sa propre application.

Il ne détient jamais qu'une clé pour lecture seule des paiements entrants (une UIVK). Il peut voir les paiements arriver, mais ne peut pas les dépenser : même un serveur compromis ne peut donc pas déplacer vos fonds. La clé reste sur votre propre serveur, si bien qu'aucune entreprise ne voit non plus vos paiements.

Chaque paiement reçoit une nouvelle adresse unifiée avec des récepteurs Sapling et Orchard, sans récepteur transparent. Les paiements arrivent directement dans votre propre portefeuille.

Il n'y a ni frais, ni compte, ni compteur d'utilisation. Vous payez les frais de réseau Zcash et votre hébergement.

Il fonctionne uniquement en auto-hébergement : un seul conteneur Docker, ou une crate Rust au sein d'une application que vous faites déjà tourner. Il lit la chaîne depuis un serveur lightwalletd de votre choix : vous n'avez donc pas besoin d'un nœud complet.

Sa mise en place demande du code, pas un plugin. Lors du paiement, votre site demande au service une adresse de paiement et un QR code, et le service informe votre site de l'arrivée des fonds au moyen de webhooks signés. Il existe un client npm pour les backends JavaScript et TypeScript, ainsi qu'une [boutique de démonstration](https://github.com/nerdcash/zcash-payment-demo-store) open source dont vous pouvez vous inspirer. Il n'existe pas de plugin Shopify ni WooCommerce : vous devez donc avoir la main sur le code de votre site, ou faire appel à un développeur qui l'a.

Points à prendre en compte. Il est récent : le dépôt a été créé en juin 2026, le client npm en est à la version 0.1, il n'y a encore aucune version publiée, et aucun audit de sécurité n'a été publié. Son API ne dispose d'aucune authentification propre : gardez-la donc sur un réseau privé et ne l'exposez jamais à Internet. Enfin, comme pour tout paiement protégé, un remboursement nécessite que l'acheteur vous communique une adresse.

**Dernière vérification :** 2026-11-01

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Type de prise en charge** : protégé (Sapling et Orchard)
- **Description** : ZGo est une plateforme de paiement électronique qui va directement de votre client à vous, sans aucun tiers.
- **URL** : [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

Une caisse qui fonctionne dans un navigateur : un ordinateur portable, une tablette ou un téléphone devient ainsi votre point d'encaissement. Il existe aussi un plugin WooCommerce et une API REST. Elle a été développée par Vergara Technologies et financée par Zcash Community Grants, y compris la migration de zcashd vers Zebra.

Les fonds vont directement du client à votre portefeuille, sans aucun intermédiaire.

Protégé, avec prise en charge de Sapling et Orchard via les Unified Addresses, et conforme à la ZIP 321. Aucune source actuelle n'indique qu'il gère les adresses transparentes : cette page ne l'affirme donc plus.

Vous ne pouvez pas vraiment l'auto-héberger. ZGo gère l'infrastructure Zcash pour vous et ne publie aucun guide de déploiement. Le code source est public sur le serveur Git du mainteneur, mais la copie GitLab que l'on trouve généralement est un miroir obsolète de 2022.

Il n'est pas gratuit non plus. ZGo vend des sessions prépayées et exige une session Pro pour WooCommerce, mais la page des tarifs est actuellement inaccessible : aucun montant n'est donc indiqué ici.

**Dernière vérification :** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Type de prise en charge** : le client dépense depuis une adresse protégée, côté réception non documenté
- **Description** : Flexa est un réseau de paiement qui permet aux clients de dépenser des actifs numériques, dont les Zcash, dans des points de vente physiques depuis un portefeuille en autogarde.
- **URL** : [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa n'est pas une passerelle de paiement en ligne : il ne remplace donc pas les autres solutions présentées ici. Le client ouvre un portefeuille compatible Flexa, comme Zodl, présente un code à usage unique, et le magasin le scanne. Il n'y a ni facture ZEC ni plugin de commerce électronique.

Le client conserve ses propres pièces jusqu'au moment du paiement. En tant que commerçant, vous ne recevez jamais de ZEC. Flexa vous règle dans la devise de votre choix : la partie crypto est donc gérée par ses soins.

L'annonce de Flexa décrit l'intégration de Zcash comme permettant de payer en ZEC protégés. Le type d'adresse sur lequel Flexa reçoit les fonds n'est publié nulle part.

Les frais s'élèvent à 1 % par paiement, conversion et garde des fonds comprises sans coût supplémentaire.

Il fonctionne aux États-Unis et, depuis juillet 2026, dans 37 pays et territoires SEPA. Il n'est pas précisé si les ZEC en particulier peuvent être dépensés en Europe.

**Dernière vérification :** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Type de prise en charge** : transparent uniquement
- **Description** : NOWPayments est une passerelle de paiement crypto qui permet aux commerçants d'accepter facilement des paiements et des dons en Zcash.
- **URL** : [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Aucune prise en charge des adresses protégées. Sa documentation vous demande de configurer une adresse transparente pour les Zcash, et ZEC est la seule cryptomonnaie qu'il traite de cette manière. Chaque paiement que vous recevez est public sur la blockchain.

Non dépositaire par défaut. Sa FAQ indique qu'il ne stocke pas de fonds et ne détient jamais de clés privées. Il existe un solde en garde facultatif : vérifiez donc les paramètres de votre compte si vous voulez en être certain.

Les frais sont de 0,5 % pour un paiement simple, ou de 1 % pour les paiements multidevises, à taux fixe ou avec « frais payés par l'utilisateur », auxquels s'ajoutent les frais de réseau.

Disponible dans le monde entier, sauf là où la loi l'interdit. Vous n'avez pas besoin de KYC pour commencer à accepter des cryptomonnaies, seulement pour retirer de la monnaie fiduciaire.

**Dernière vérification :** 2026-07-29

---

## [Plisio](https://plisio.net/) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />

> **Paiements suspendus — vérifié le 12 novembre 2026.** La [page d'accueil](https://plisio.net/) de Plisio indique que les paiements entrants et sortants sont temporairement suspendus le temps de travaux de rétablissement. Renseignez-vous auprès du fournisseur avant d'envoyer des fonds. Sa page consacrée à Zcash renvoie actuellement une erreur 404 ; cela ne prouve pas que ZEC ait été retiré. Les informations ci-dessous sur les frais, la garde des fonds et les adresses prises en charge ont été examinées pour la dernière fois le 29 juillet 2026 et n'ont pas été revérifiées.

- **Type de prise en charge** : transparent (non documenté)
- **Description** : Plisio est une passerelle de paiement en cryptomonnaies qui a annoncé la prise en charge de Zcash. Le traitement des paiements est actuellement suspendu ; voir l'avis daté ci-dessus.
- **URL** : [Plisio](https://plisio.net/)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Considérez-le comme dépositaire. Le marketing de Plisio le présente comme non dépositaire, mais ses propres pages d'aide décrivent des soldes détenus sur la plateforme, un stockage à froid et une procédure de retrait. L'affirmation de non-garde n'a pas pu être confirmée.

Plisio n'indique jamais quels types d'adresses Zcash il utilise : partez donc du principe qu'il s'agit d'adresses transparentes tant que personne n'a confirmé le contraire.

Le portefeuille est gratuit, la passerelle et l'API coûtent 0,5 %, et la marque blanche 1,5 %. La marque blanche est une version renommée de son service hébergé, et non de l'auto-hébergement.

Vous n'avez pas besoin de KYC pour recevoir des paiements, et aucune liste de pays soumis à restrictions n'est publiée.

**Dernière vérification :** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Type de prise en charge** : transparent uniquement, dépôts protégés refusés
- **Description** : Binance Pay est une plateforme de paiement en cryptomonnaies qui prend en charge les paiements en Zcash.
- **URL** : [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance refuse les ZEC envoyés depuis des adresses protégées. Ce refus est la raison pour laquelle les adresses TEX ont été créées.

Il est entièrement dépositaire. Les paiements circulent hors chaîne entre portefeuilles Binance Pay, et vous avez besoin d'un compte Binance vérifié.

Les transferts de portefeuille à portefeuille sont gratuits, les versements aux commerçants coûtent 0,8 % plafonnés à 5 USD, et les commerçants Mini Program paient 1 %.

Vérifiez la disponibilité dans votre pays avant d'en dépendre. Binance Pay n'est pas proposé dans certains pays et secteurs, ZEC a été retiré pour les utilisateurs en France, en Espagne, en Italie et en Pologne depuis 2023, et le service dans l'EEE a été perturbé par MiCA.

**Dernière vérification :** 2026-07-29

---

### N'acceptent plus les ZEC

Ces deux fournisseurs figuraient auparavant sur cette page. La liste des devises en vigueur de chacun a été vérifiée le 29 juillet 2026, et les Zcash n'y figurent plus.

**CoinPayments** ne mentionne pas les ZEC dans sa liste de cryptomonnaies v2, dans son ancienne liste ni dans son API des devises en vigueur, et son article sur Zcash redirige désormais vers la page d'accueil.

**CoinGate** ne mentionne pas les ZEC sur sa page des devises prises en charge ni dans son API publique. Aucun retrait n'a été annoncé : la raison et la date sont donc inconnues.

Si l'un d'eux propose à nouveau les Zcash, ajoutez-le de nouveau avec une date de vérification à jour.

### Maintenir cette page à jour

La prise en charge des cryptomonnaies de confidentialité évolue sans cesse : cette page n'est fiable qu'à la date de sa dernière vérification. Lorsque vous la mettez à jour :

1. Consultez la liste des devises ou l'API du fournisseur lui-même. Les listes tierces n'étaient plus à jour pour les deux processeurs retirés ci-dessus.
2. Vérifiez quels types d'adresses Zcash sont pris en charge. « Prend en charge Zcash » signifie généralement adresses transparentes uniquement.
3. Mettez à jour la date de vérification dans le tableau et dans la section du fournisseur concerné.
