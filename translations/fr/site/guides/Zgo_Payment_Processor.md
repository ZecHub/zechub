<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Processeur de paiement ZGo : accepter des Zcash sans dépositaire

ZGo est un processeur de paiement non dépositaire pour Zcash. Un client paie en ZEC depuis son propre portefeuille, ZGo surveille la blockchain Zcash pour détecter la transaction, et les fonds arrivent directement dans le portefeuille du commerçant grâce à un transfert protégé. ZGo ne détient jamais l'argent entre-temps.

Ce guide explique le fonctionnement du flux de paiement, la création d'un compte et l'intégration de ZGo avec Xero et WooCommerce. Il aborde également les deux erreurs à l'origine de la plupart des problèmes lors d'une première configuration.

## Sur cette page

1. [Pourquoi utiliser ZGo](#why-use-zgo)
2. [Fonctionnement de ZGo](#how-zgo-works)
3. [Créer un compte](#setting-up-an-account)
4. [ZGo avec Xero](#zgo-with-xero)
5. [ZGo avec WooCommerce](#zgo-with-woocommerce)
6. [Fonctionnalités](#features)
7. [Erreurs courantes](#common-mistakes)
8. [Conclusion](#conclusion)
9. [Ressources](#resources)

## Pourquoi utiliser ZGo

La plupart des processeurs de paiement en cryptomonnaie sont dépositaires. Les fonds arrivent d'abord sur le compte du processeur avant d'être transférés plus tard au commerçant, ce qui signifie qu'un tiers contrôle temporairement l'argent et peut le geler, le retarder ou le signaler.

ZGo adopte l'approche inverse. Les paiements passent directement du portefeuille du client à celui du commerçant au moyen d'une transaction protégée Zcash. Le processeur se contente de générer la facture et de surveiller la blockchain pour la confirmation. Il n'y a aucun solde intermédiaire, aucun processus de retrait et aucun tiers susceptible de bloquer le règlement.

Pour un commerçant, cela se traduit concrètement de trois façons : la garde totale des ZEC reçus, la confidentialité des transactions protégées par défaut et aucune dépendance envers un prestataire centralisé qui devrait rester en ligne ou solvable.

## Fonctionnement de ZGo

Le flux de paiement est le même, que ZGo soit utilisé seul, via Xero ou via WooCommerce :

1. Le commerçant génère une demande de paiement dans ZGo, qui s'affiche sous la forme d'un code QR contenant le montant, l'identifiant de la facture et une adresse de réception Zcash.
2. Le client scanne le code QR avec un portefeuille Zcash (les types d'adresses Orchard, Sapling et transparentes sont tous pris en charge par l'extension WordPress) et approuve le paiement.
3. La transaction est diffusée sur le réseau Zcash sous la forme d'un transfert protégé du portefeuille du client vers celui du commerçant.
4. ZGo surveille la blockchain Zcash pour détecter la transaction.
5. Après cinq confirmations, ZGo considère le paiement comme définitif et en informe toute intégration connectée (Xero, WooCommerce ou un webhook).

Le seuil de cinq confirmations est le chiffre clé. Avant cela, il s'agit d'un paiement en cours, et non d'un paiement reçu. L'exécution des commandes, la mise à jour des stocks et toute action irréversible côté commerçant doivent attendre l'étape 5.

ZGo fonctionne dans n'importe quel navigateur moderne, sur ordinateur comme sur mobile, sans aucune installation de part et d'autre. Le client a besoin d'un portefeuille Zcash ; le commerçant a besoin d'un portefeuille Zcash et d'un compte ZGo.

<img width="672" height="378" alt="ZGo payment request and blockchain monitoring overview" src="/content-images/de50885b-b068-4157-bbda-0981ca23efc8-a00a274776.webp" />

## Créer un compte

Pour créer un compte ZGo, il faut un portefeuille Zcash contenant une petite quantité de ZEC. Ce petit solde en ZEC couvre les frais on-chain de la transaction d'initialisation du compte. Tout portefeuille Zcash majeur convient ; consultez [Portefeuilles ZecHub](https://zechub.wiki/wallets) pour connaître les options actuelles.

La configuration de base :

1. Ouvrez [zgo.cash](https://zgo.cash/) dans un navigateur.
2. Créez un compte à l'aide d'un portefeuille Zcash que le commerçant contrôle. Ce portefeuille doit détenir les clés. Une adresse de dépôt d'un exchange ne fonctionnera pas (voir [Erreurs courantes](#common-mistakes)).
3. Vérifiez le portefeuille en envoyant la petite transaction d'initialisation.
4. Configurez l'adresse de réception. Tous les paiements traités via ce compte arriveront dans ce portefeuille.

Une fois le compte actif, le même commerçant peut utiliser ZGo pour des paiements ponctuels (un simple code QR lors d'un événement éphémère) ou l'intégrer dans une configuration permanente via Xero ou WooCommerce.

## ZGo avec Xero

[Xero](https://www.xero.com/) est une plateforme de comptabilité en ligne utilisée par de nombreuses petites et moyennes entreprises. L'intégration ZGo–Xero permet à un commerçant d'émettre une facture dans Xero, de la faire payer en ZEC par le client, puis de laisser Xero marquer automatiquement la facture comme payée une fois la transaction confirmée.

Fonctionnement :

1. Le commerçant crée une facture dans Xero comme d'habitude.
2. ZGo ajoute une option de paiement Zcash à la facture.
3. Le client paie en ZEC depuis son portefeuille.
4. ZGo surveille la [blockchain Zcash](https://z.cash/) pour détecter la transaction.
5. Après cinq confirmations, ZGo transmet le paiement à Xero, qui marque la facture comme réglée.

Les ZEC arrivent dans le portefeuille du commerçant, et non sur un compte contrôlé par ZGo ou par Xero. L'écriture comptable dans Xero reste automatiquement synchronisée avec le règlement on-chain.

Pour une première configuration, suivez le guide dédié : [Configuration de l'intégration Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo avec WooCommerce

Pour les boutiques en ligne fonctionnant sous [WooCommerce](https://woocommerce.com/) et [WordPress](https://wordpress.org/), ZGo propose une extension dédiée. Celle-ci ajoute Zcash comme moyen de paiement lors du passage en caisse et gère automatiquement l'état de la commande lorsque le paiement est confirmé.

<img width="672" height="378" alt="ZGo WooCommerce plugin checkout and order flow" src="/content-images/55a791bb-1947-4f55-b5b9-55083be8ed49-2bc8d2571e.webp" />

Flux complet dans une boutique WooCommerce :

1. Le client arrive au passage en caisse et sélectionne Zcash comme moyen de paiement.
2. L'extension génère une demande de paiement et affiche le code QR sur la page de paiement.
3. Le client paie depuis son portefeuille.
4. La transaction est diffusée sur le réseau Zcash et ZGo commence à la surveiller.
5. Après cinq confirmations, ZGo signale le paiement comme définitif à l'extension.
6. L'extension marque la commande WooCommerce comme payée et met à jour la base de données des commandes.

La commande n'est payée qu'une fois l'étape 6 terminée. Les états antérieurs (diffusion, premières confirmations) peuvent être présentés au client comme « paiement reçu, en attente de confirmation », mais les stocks, l'exécution de la commande et toute automatisation en aval doivent attendre l'état final.

L'extension installe également un tableau de bord d'administration dans WordPress, où le commerçant peut suivre les commandes et les paiements ZEC entrants, à côté de la vue habituelle des commandes WooCommerce. L'extension prend en charge tous les types d'adresses Zcash actuels : Orchard, Sapling et transparentes. Les clients qui paient depuis n'importe quel portefeuille compatible peuvent finaliser la transaction.

## Fonctionnalités

**Non dépositaire.** Les paiements passent directement du portefeuille du client à celui du commerçant au moyen de transactions protégées. ZGo ne détient jamais les fonds entre-temps, et le commerçant en garde le contrôle total du début à la fin.

**Déploiement flexible.** ZGo peut être utilisé le temps d'un après-midi sur un marché éphémère, pour un point de vente permanent ou comme back-end d'une boutique en ligne grâce aux intégrations Xero ou WooCommerce.

**Basé sur le navigateur.** Aucune installation n'est nécessaire, ni côté client ni côté commerçant. ZGo fonctionne dans n'importe quel navigateur moderne, sur ordinateur comme sur mobile.

**Compatibilité des portefeuilles.** Les principaux portefeuilles Zcash, y compris ceux qui prennent en charge les types d'adresses Orchard, Sapling et transparentes, peuvent régler une facture ZGo sans configuration supplémentaire côté client.

**Intégrations.** Les intégrations directes avec Xero (comptabilité) et WooCommerce (commerce en ligne) couvrent d'emblée les deux processus les plus courants chez les commerçants.

## Erreurs courantes

**Considérer la commande comme payée avant cinq confirmations.** Une transaction diffusée n'est pas un paiement confirmé. La transaction peut encore ne pas être confirmée ou être remplacée. Ce n'est qu'après cinq confirmations que ZGo signale le paiement comme définitif, et ce n'est qu'à ce moment que la commande doit être marquée comme payée en aval. Si un commerçant configure le déclenchement des stocks ou de l'exécution des commandes dès la diffusion, les paiements frauduleux ou échoués entraîneront des pertes réelles.

**Faire pointer ZGo vers une adresse de dépôt d'un exchange.** Elle ressemble à une adresse Zcash, mais les adresses de dépôt des exchanges sont contrôlées par l'exchange, et non par le commerçant. L'exchange détient les clés, donc les fonds, ce qui va à l'encontre de la raison même d'utiliser un processeur non dépositaire. L'adresse de portefeuille configurée dans ZGo doit appartenir à un portefeuille dont le commerçant contrôle directement la phrase de récupération.

**Considérer ZGo comme un portefeuille.** ZGo est un processeur de paiement, pas un portefeuille. Il ne stocke pas de clés, ne détient pas de soldes et ne permet pas au commerçant de dépenser des fonds. Un portefeuille Zcash distinct, contrôlé par le commerçant, est nécessaire pour recevoir l'argent acheminé par ZGo.

## Conclusion

ZGo permet aux commerçants d'accepter des paiements en Zcash sans renoncer à la garde de leurs fonds, sans dépendre d'un intermédiaire et sans exposer les détails des transactions sur une chaîne publique. Les deux intégrations (Xero et WooCommerce) couvrent les processus les plus courants ; pour tout le reste, ZGo peut être utilisé seul depuis n'importe quel navigateur.

La configuration est rapide : procurez-vous un portefeuille Zcash, créez un compte sur [zgo.cash](https://zgo.cash/), puis commencez directement à générer des demandes de paiement ou installez l'intégration appropriée.

## Ressources

- [Site officiel de ZGo](https://zgo.cash/)
- [Guide de configuration de l'intégration Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) et [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Page d'accueil du projet Zcash](https://z.cash/)
- [Portefeuilles ZecHub](https://zechub.wiki/wallets), la liste des portefeuilles Zcash compatibles
- [Présentation des processeurs de paiement ZecHub](https://zechub.wiki/payment-processors), ZGo parmi les autres options de paiement Zcash
- [Extension BTCPayServer Zcash](https://zechub.wiki/guides/btcpayserver-zcash-plugin), le guide ZecHub associé pour une solution auto-hébergée
