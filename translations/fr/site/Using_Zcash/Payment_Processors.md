<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Processeurs de paiement Zcash

Différentes façons d’accepter des paiements en ZEC en tant que commerçant, comparées côte à côte. Chaque entrée a été vérifiée par rapport au site et à l’API du prestataire lui-même le **29 juillet 2026**.

Le support des actifs de confidentialité change souvent, donc chaque ligne comporte sa propre date de vérification. Si vous lisez ceci plusieurs mois plus tard, vérifiez le site du prestataire avant d’intégrer sa solution.

<div class="processor-table">

| Processor | Custody | Shielded ZEC | Self-host | Merchant fee | Regions / KYC | Verified |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Non dépositaire | Oui, Orchard via Unified Addresses | Oui, open source | 1 % par paiement, gratuit si auto-hébergé | Pas de KYC, régions non indiquées | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Non dépositaire, viewing key uniquement | Oui, shielded uniquement (Sapling, Orchard, UA) | Oui, open source | Aucun, vous ne payez que les frais réseau | Mondial, pas de KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Non dépositaire | Oui, Sapling et Orchard | Non, service hébergé | Session prépayée, prix non publié | Aucun KYC indiqué, régions non indiquées | 2026-07-29 |
| [Flexa](https://flexa.co/) | Auto-garde côté client, règlement commerçant en monnaie fiat | Le client dépense en shielded, côté réception non documenté | Non | 1 % par paiement | États-Unis et 37 pays SEPA, ZEC dans l’UE non confirmé | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Non dépositaire par défaut | Non, adresse transparente uniquement | Non | 0,5 %, ou 1 % avec conversion | Mondial sauf là où c’est interdit, pas de KYC au départ | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Dépositaire, malgré le marketing | Non documenté | Non | 0,5 % API, 1,5 % marque blanche | Pas de KYC pour recevoir | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Dépositaire, hors chaîne | Non, dépôts shielded rejetés | Non | Gratuit de wallet à wallet, 0,8 % pour les versements | Restrictions géographiques, ZEC retiré en FR, ES, IT, PL | 2026-07-29 |

</div>

### Signification des colonnes

**Custody** indique si le processeur détient vos ZEC. Non dépositaire signifie qu’ils arrivent dans un wallet que vous contrôlez.

**Shielded ZEC** indique si vous pouvez être payé dans le pool shielded. Transparent uniquement signifie que le montant et les adresses sont publics sur la blockchain.

**Self-host** indique si vous pouvez exécuter le logiciel vous-même, sans entreprise intermédiaire.

**Merchant fee** n’inclut pas les frais réseau de Zcash, que quelqu’un paie dans tous les cas.

Lorsqu’un prestataire ne publie pas une information, l’entrée indique « non indiqué » ou « non documenté » au lieu de deviner. Ce n’est pas la même chose que « non ».

### Lequel choisir

Pour un maximum de confidentialité et de contrôle, utilisez **BTCPay Server** ou une instance auto-hébergée de **CipherPay**. Les deux prennent en charge le shielded, sont open source et ne détiennent pas vos fonds.

Pour accepter des paiements dans une boutique physique plutôt qu’en ligne, utilisez **Flexa**.

Pour une passerelle hébergée où les paiements transparents sont acceptables, utilisez **NOWPayments** ou **Plisio**.

Un point mérite d’être répété : un processeur transparent uniquement publie chaque montant de paiement et chaque adresse sur la blockchain. Et avec tout processeur non dépositaire hébergé, vous remettez votre Viewing Key, donc l’entreprise peut voir vos paiements même si elle ne peut pas les dépenser. L’auto-hébergement est le seul moyen d’éviter cela.

<div class="processor-note">

**Avertissement sur le service ZGo, 29 juillet 2026.** Le backend ZGo à l’adresse api.zgo.cash a renvoyé HTTP 503 sur tous les endpoints pendant la vérification de cette page. Le projet n’est pas abandonné et son mainteneur était actif dans la communauté ce mois-ci, mais confirmez que le service fonctionne avant de vous y fier.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="Logo de CipherPay" class="processor-logo" />
- **Support Type**: Shielded (Orchard, via Unified Addresses)
- **Description**: Acceptez Zcash en quelques minutes, non dépositaire, zéro donnée acheteur, aucun intermédiaire.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="Logo de CipherPay" width="200" hidden />

Vous fournissez à CipherPay une clé en lecture seule, donc les paiements vont directement vers votre propre wallet et le service ne détient jamais les fonds. Il utilise une nouvelle adresse pour chaque facture.

Orchard uniquement. Il n’y a pas de prise en charge de Sapling ni du transparent, même si le README du dépôt mentionne Sapling.

Cela coûte 1 % par paiement, et rien du tout si vous l’exécutez vous-même. L’ensemble est open source, sous forme de binaire Rust avec SQLite ou d’image Docker. Il n’y a pas de KYC, et les acheteurs n’ont pas besoin de compte.

Les intégrations couvrent Shopify, WooCommerce, une API REST, le checkout hébergé, les liens de paiement et les QR codes en présentiel.

Deux points sont à prendre en compte. Le service a été lancé en février 2026 et n’a pas d’audit de sécurité publié. Et avec l’offre hébergée, l’opérateur détient votre Viewing Key, donc il peut voir vos paiements. L’auto-hébergement supprime ce risque. Les paiements shielded sont également définitifs, donc un remboursement nécessite que l’acheteur vous fournisse une adresse.

**Dernière vérification :** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="Logo de BTCPay Server" class="processor-logo" />
- **Support Type**: Shielded uniquement (Sapling, Orchard, Unified Address)
- **Description**: BTCPay Server est un processeur de paiement en cryptomonnaie open source et auto-hébergé.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="Logo de BTCPay Server" width="200" hidden />

L’option la plus solide en matière de garde. Son backend wallet est en lecture seule et ne détient ni seed ni clé secrète, donc même un serveur compromis ne peut pas dépenser votre argent.

Shielded uniquement, avec prise en charge de Sapling, Orchard et Unified Addresses. Il n’y a pas de solution de repli transparente, donc ne comptez pas dessus.

Pour l’installer, vous avez besoin du fork Docker btcpay-zcash sur la branche feat/zec, ainsi que d’une Viewing Key exportée depuis un wallet comme Ywallet ou Zingo. Par défaut, il communique avec un lightwalletd distant, ou bien vous pouvez exécuter Zebra et lightwalletd vous-même.

Une limite à connaître : le plugin utilise un seul wallet Zcash pour toutes les boutiques d’une instance, donc ne l’exécutez pas sur un serveur partagé. La prise en charge d’un wallet par boutique est en cours de développement.

Le logiciel lui-même ne facture aucun frais. Vous payez les frais réseau de Zcash et vos éventuels coûts d’hébergement.

**Dernière vérification :** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="Logo de ZGo" class="processor-logo" />
- **Support Type**: Shielded (Sapling et Orchard)
- **Description**: ZGo est une plateforme de paiement électronique qui relie directement votre client à vous, sans tiers impliqué.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="Logo de ZGo" width="200" hidden />

Une caisse que vous utilisez dans un navigateur, de sorte qu’un ordinateur portable, une tablette ou un téléphone devient le terminal de paiement. Il existe aussi un plugin WooCommerce et une API REST. Le projet a été développé par Vergara Technologies et financé par Zcash Community Grants, y compris la migration de zcashd vers Zebra.

Les fonds vont directement du client à votre wallet, sans intermédiaire.

Shielded, avec prise en charge de Sapling et Orchard via Unified Addresses, et conforme à ZIP 321. Aucune source actuelle n’indique qu’il gère les adresses transparentes, donc cette page ne l’affirme plus.

Vous ne pouvez pas vraiment l’auto-héberger. ZGo exploite l’infrastructure Zcash pour vous et ne publie aucun guide de déploiement. Le code source est public sur le propre serveur Git du mainteneur, même si la copie GitLab que les gens trouvent habituellement est un miroir obsolète de 2022.

Ce n’est pas gratuit non plus. ZGo vend des sessions prépayées et exige une session Pro pour WooCommerce, mais la page tarifaire est actuellement inaccessible, donc aucun montant n’est indiqué ici.

**Dernière vérification :** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Logo de Flexa" class="processor-logo" />
- **Support Type**: Le client dépense en shielded, côté réception non documenté
- **Description**: Flexa est un réseau de paiement qui permet aux clients de dépenser des actifs numériques, y compris Zcash, dans des points de vente à partir d’un wallet en auto-garde.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Logo de Flexa" width="200" hidden />

Flexa n’est pas une passerelle de checkout, donc ce n’est pas un substitut aux autres options présentées ici. Le client ouvre un wallet compatible Flexa, comme Zodl, affiche un code à usage unique, et le magasin le scanne. Il n’y a ni facture en ZEC ni plugin e-commerce.

Le client garde ses propres coins jusqu’au moment du paiement. En tant que commerçant, vous ne recevez jamais de ZEC. Flexa vous règle dans la devise de votre choix, donc la partie crypto est gérée par eux.

L’annonce officielle de Flexa décrit l’intégration de Zcash comme un paiement en ZEC shielded. Le type d’adresse vers lequel Flexa reçoit n’est publié nulle part.

Les frais sont de 1 % par paiement, avec conversion et garde incluses sans coût supplémentaire.

Le service fonctionne aux États-Unis et, depuis juillet 2026, dans 37 pays et territoires SEPA. Il n’est pas indiqué si ZEC en particulier peut être dépensé en Europe.

**Dernière vérification :** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="Logo de NOWPayments" class="processor-logo processor-logo-wide" />
- **Support Type**: Transparent uniquement
- **Description**: NOWPayments est une passerelle de paiement crypto qui permet aux commerçants d’accepter facilement des paiements et des dons en Zcash.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="Logo de NOWPayments" width="200" hidden />

Aucune prise en charge du shielded. Leur documentation vous indique de définir une adresse transparente pour Zcash, et ZEC est la seule monnaie qu’ils distinguent de cette façon. Chaque paiement que vous recevez est public sur la blockchain.

Non dépositaire par défaut. Leur FAQ indique qu’ils ne stockent pas les fonds et ne détiennent jamais les clés privées. Il existe une option de solde dépositaire, donc vérifiez les paramètres de votre compte si vous devez en être certain.

Les frais sont de 0,5 % pour un paiement direct, ou de 1 % pour les paiements multidevises, à taux fixe, ou avec « frais payés par l’utilisateur », auxquels s’ajoutent les frais réseau.

Disponible dans le monde entier sauf là où la loi l’interdit. Vous n’avez pas besoin de KYC pour commencer à accepter des cryptos, seulement pour retirer en monnaie fiat.

**Dernière vérification :** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Logo de Plisio" class="processor-logo processor-logo-wide" />
- **Support Type**: Transparent (non documenté)
- **Description**: Plisio est une passerelle de paiement en cryptomonnaie qui permet aux entreprises d’accepter des paiements en Zcash.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Logo de Plisio" width="200" hidden />

Considérez-le comme dépositaire. Le marketing de Plisio le présente comme non dépositaire, mais ses propres pages d’aide décrivent des soldes détenus sur la plateforme, du cold storage et un processus de retrait. L’affirmation de non-dépositaire n’a pas pu être confirmée.

Plisio ne dit jamais quels types d’adresses Zcash il utilise, donc supposez du transparent jusqu’à confirmation contraire.

Le wallet est gratuit, la passerelle et l’API coûtent 0,5 %, et la formule White Label coûte 1,5 %. White Label est un rebranding de leur service hébergé, pas de l’auto-hébergement.

Vous n’avez pas besoin de KYC pour recevoir des paiements, et aucune liste de pays restreints n’est publiée.

**Dernière vérification :** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Logo de Binance Pay" class="processor-logo" />
- **Support Type**: Transparent uniquement, dépôts shielded rejetés
- **Description**: Binance Pay est une plateforme de paiement en cryptomonnaie qui prend en charge les paiements en Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Logo de Binance Pay" width="200" hidden />

Binance refuse les ZEC envoyés depuis des adresses shielded. C’est pour cette raison que les adresses TEX ont été créées.

Le service est entièrement dépositaire. Les paiements circulent hors chaîne entre wallets Binance Pay, et vous avez besoin d’un compte Binance vérifié.

Les transferts de wallet à wallet sont gratuits, les versements commerçants coûtent 0,8 % plafonnés à 5 USD, et les commerçants Mini Program paient 1 %.

Vérifiez la disponibilité dans votre région avant d’en dépendre. Binance Pay n’est pas proposé dans certains pays et secteurs, ZEC a été retiré pour les utilisateurs en France, en Espagne, en Italie et en Pologne depuis 2023, et le service dans l’EEE a été perturbé dans le cadre de MiCA.

**Dernière vérification :** 2026-07-29

---

### N’acceptent plus ZEC

Ces deux services figuraient auparavant ici. La liste des devises en direct de chaque prestataire a été vérifiée le 29 juillet 2026, et Zcash a disparu des deux.

**CoinPayments** ne liste pas ZEC dans sa liste de coins v2, sa liste historique, ni dans son API des devises en direct, et son article sur Zcash redirige désormais vers la page d’accueil.

**CoinGate** ne liste pas ZEC sur sa page des devises prises en charge ni dans son API publique. Aucun retrait n’a été annoncé, donc la raison et la date sont inconnues.

Si l’un des deux réintroduit Zcash, ajoutez-le à nouveau avec une nouvelle date de vérification.

### Garder cette page exacte

Le support des privacy coins évolue, donc cette page n’est fiable qu’à hauteur de sa dernière vérification. Lorsque vous la relisez :

1. Vérifiez la propre liste de devises ou l’API du prestataire. Les listes tierces étaient obsolètes pour les deux processeurs supprimés ci-dessus.
2. Vérifiez quels types d’adresses Zcash sont pris en charge. « Prend en charge Zcash » signifie généralement adresses transparentes uniquement.
3. Mettez à jour la date de vérification dans le tableau et dans la section de ce prestataire.
