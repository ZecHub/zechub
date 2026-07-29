<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Processeur de paiement ZGo : accepter Zcash sans garde

ZGo est un processeur de paiement non dépositaire pour Zcash. Un client paie en ZEC depuis son propre portefeuille, ZGo surveille la blockchain Zcash pour la transaction, et les fonds arrivent directement dans le portefeuille du commerçant via un transfert blindé. ZGo ne détient jamais l’argent entre les deux.

Ce guide explique comment fonctionne le flux de paiement, comment configurer un compte et comment intégrer ZGo avec Xero et WooCommerce. Il couvre également les deux erreurs à l’origine de la plupart des problèmes lors d’une première configuration.

## Sur cette page

1. [Pourquoi utiliser ZGo](#why-use-zgo)
2. [Comment fonctionne ZGo](#how-zgo-works)
3. [Configurer un compte](#setting-up-an-account)
4. [ZGo avec Xero](#zgo-with-xero)
5. [ZGo avec WooCommerce](#zgo-with-woocommerce)
6. [Fonctionnalités](#features)
7. [Erreurs courantes](#common-mistakes)
8. [Conclusion](#conclusion)
9. [Ressources](#resources)

## Pourquoi utiliser ZGo

La plupart des processeurs de paiement en cryptomonnaie sont dépositaires. Les fonds arrivent d’abord sur le compte du processeur puis sont transférés plus tard au commerçant, ce qui signifie qu’un tiers contrôle temporairement l’argent et peut le geler, le retarder ou en faire un rapport.

ZGo adopte l’approche inverse. Les paiements vont directement du portefeuille du client au portefeuille du commerçant via une transaction blindée Zcash. Le processeur ne fait que générer la facture et surveiller la blockchain pour la confirmation. Il n’y a pas de solde intermédiaire, pas de processus de retrait et pas de tiers pouvant bloquer le règlement.

Pour un commerçant, cela signifie trois choses pratiques : la garde complète des ZEC entrants, la confidentialité des transactions blindées par défaut et aucune dépendance à un fournisseur centralisé qui doit rester en ligne ou solvable.

## Comment fonctionne ZGo

Le flux de paiement est le même, que ZGo soit utilisé seul, via Xero ou via WooCommerce :

1. Le commerçant génère une demande de paiement dans ZGo, qui s’affiche sous forme de code QR avec le montant, l’ID de facture et une adresse de réception Zcash.
2. Le client scanne le QR avec un portefeuille Zcash (les types d’adresse Orchard, Sapling et Transparent sont tous pris en charge sur le plugin WordPress) et approuve le paiement.
3. La transaction est diffusée sur le réseau Zcash comme un transfert blindé du portefeuille du client vers le portefeuille du commerçant.
4. ZGo surveille la blockchain Zcash pour détecter la transaction.
5. Après cinq confirmations, ZGo marque le paiement comme final et notifie toute intégration connectée (Xero, WooCommerce ou un webhook).

Le seuil de cinq confirmations est le chiffre clé. Avant cela, il s’agit d’un paiement en cours, pas d’un paiement reçu. L’exécution des commandes, les mises à jour d’inventaire et toute action irréversible du côté du commerçant doivent attendre l’étape 5.

ZGo fonctionne dans n’importe quel navigateur moderne sur ordinateur ou mobile, sans installation d’aucun côté. Le client a besoin d’un portefeuille Zcash ; le commerçant a besoin d’un portefeuille Zcash et d’un compte ZGo.

<img width="672" height="378" alt="Vue d’ensemble d’une demande de paiement ZGo et de la surveillance de la blockchain" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Configurer un compte

Pour créer un compte ZGo, un portefeuille Zcash contenant une petite quantité de ZEC est requis. Ce petit solde en ZEC couvre les frais on-chain de la transaction d’initialisation du compte. N’importe quel grand portefeuille Zcash convient pour cela ; voir [Portefeuilles ZecHub](https://zechub.wiki/wallets) pour les options actuelles.

La configuration de base :

1. Ouvrez [zgo.cash](https://zgo.cash/) dans un navigateur.
2. Créez un compte à l’aide d’un portefeuille Zcash sous le contrôle du commerçant. Ce portefeuille doit détenir les clés. Une adresse de dépôt d’exchange ne fonctionnera pas (voir [Erreurs courantes](#common-mistakes)).
3. Vérifiez le portefeuille en envoyant la petite transaction d’initialisation.
4. Configurez l’adresse de réception. Tous les paiements traités via ce compte arriveront dans ce portefeuille.

Une fois le compte actif, le même commerçant peut utiliser ZGo pour des paiements ponctuels (un seul code QR lors d’un événement pop-up) ou l’intégrer dans une configuration permanente via Xero ou WooCommerce.

## ZGo avec Xero

[Xero](https://www.xero.com/) est une plateforme de comptabilité cloud utilisée par de nombreuses petites et moyennes entreprises. L’intégration ZGo–Xero permet à un commerçant d’émettre une facture dans Xero, de faire payer le client en ZEC, puis de faire marquer automatiquement la facture comme payée dans Xero une fois la transaction confirmée.

Comment cela fonctionne :

1. Le commerçant crée une facture dans Xero comme d’habitude.
2. ZGo ajoute une option de paiement Zcash à la facture.
3. Le client paie en ZEC via son portefeuille.
4. ZGo surveille la [blockchain Zcash](https://z.cash/) pour la transaction.
5. Après cinq confirmations, ZGo renvoie l’information de paiement à Xero, qui marque la facture comme réglée.

Les ZEC arrivent dans le portefeuille du commerçant, et non dans un compte contrôlé par ZGo ou par Xero. L’enregistrement comptable dans Xero reste automatiquement synchronisé avec le règlement on-chain.

Pour la première configuration, suivez le guide dédié : [Configuration de l’intégration Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo avec WooCommerce

Pour les boutiques en ligne fonctionnant avec [WooCommerce](https://woocommerce.com/) et [WordPress](https://wordpress.org/), ZGo fournit un plugin dédié. Le plugin ajoute Zcash comme moyen de paiement au moment du checkout et gère automatiquement l’état de la commande lorsque le paiement est confirmé.

<img width="672" height="378" alt="Checkout du plugin ZGo WooCommerce et flux de commande" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

Flux de bout en bout dans une boutique WooCommerce :

1. Le client arrive au checkout et sélectionne Zcash comme moyen de paiement.
2. Le plugin génère une demande de paiement et affiche le code QR sur la page de checkout.
3. Le client paie depuis son portefeuille.
4. La transaction est diffusée sur le réseau Zcash et ZGo commence à la surveiller.
5. Après cinq confirmations, ZGo signale au plugin que le paiement est final.
6. Le plugin marque la commande WooCommerce comme payée et met à jour la base de données des commandes.

La commande n’est payée que lorsque l’étape 6 est terminée. Les états antérieurs (diffusion, premières confirmations) peuvent être affichés au client comme « paiement reçu, en attente de confirmation », mais l’inventaire, l’exécution et toute automatisation en aval doivent attendre l’état final.

Le plugin installe également un tableau de bord d’administration dans WordPress, où le commerçant peut surveiller les commandes et les paiements entrants en ZEC à côté de la vue normale des commandes WooCommerce. Le plugin prend en charge tous les types d’adresse Zcash actuels : Orchard, Sapling et Transparent. Les clients payant depuis n’importe quel portefeuille compatible peuvent finaliser la transaction.

## Fonctionnalités

**Non dépositaire.** Les paiements vont directement du portefeuille du client vers le portefeuille du commerçant via des transactions blindées. ZGo ne détient jamais les fonds entre les deux, et le commerçant conserve un contrôle total à tout moment.

**Déploiement flexible.** ZGo peut être utilisé pour un seul après-midi sur un marché pop-up, pour une installation permanente en point de vente, ou comme backend d’une boutique en ligne via les intégrations Xero ou WooCommerce.

**Basé sur le navigateur.** Aucune installation ni du côté du client ni du côté du commerçant. ZGo fonctionne dans n’importe quel navigateur moderne sur ordinateur ou mobile.

**Compatibilité des portefeuilles.** Les principaux portefeuilles Zcash, y compris ceux prenant en charge les types d’adresse Orchard, Sapling et Transparent, peuvent payer une facture ZGo sans configuration supplémentaire du côté du client.

**Intégrations.** Les intégrations directes avec Xero (comptabilité) et WooCommerce (e-commerce) couvrent immédiatement les deux workflows commerçants les plus courants.

## Erreurs courantes

**Considérer la commande comme payée avant cinq confirmations.** Une transaction diffusée n’est pas la même chose qu’un paiement confirmé. La transaction peut encore ne pas être confirmée ou être remplacée. Ce n’est qu’après cinq confirmations que ZGo signale le paiement comme final, et ce n’est qu’à ce moment-là que la commande doit être marquée comme payée en aval. Si un commerçant configure l’inventaire ou l’exécution pour se déclencher à l’événement de diffusion, des paiements frauduleux ou échoués entraîneront de vraies pertes.

**Pointer ZGo vers une adresse de dépôt d’exchange.** Elle ressemble à une adresse Zcash, mais les adresses de dépôt d’exchange sont contrôlées par l’exchange, pas par le commerçant. L’exchange détient les clés, ce qui signifie qu’il détient les fonds, ce qui annule la raison d’utiliser un processeur non dépositaire. L’adresse de portefeuille configurée dans ZGo doit être celle d’un portefeuille dont le commerçant contrôle directement la seed phrase.

**Considérer ZGo comme un portefeuille.** ZGo est un processeur de paiement, pas un portefeuille. Il ne stocke pas les clés, ne détient pas de soldes et ne permet pas au commerçant de dépenser les fonds. Un portefeuille Zcash distinct, sous le contrôle du commerçant, est requis pour recevoir l’argent que ZGo achemine.

## Conclusion

ZGo offre aux commerçants un moyen d’accepter des paiements Zcash sans abandonner la garde, sans dépendre d’un intermédiaire et sans exposer les détails des transactions sur une chaîne publique. Les deux intégrations (Xero et WooCommerce) couvrent les workflows commerçants les plus courants ; pour tout le reste, ZGo peut être utilisé seul depuis n’importe quel navigateur.

Pour la configuration, le chemin est court : obtenez un portefeuille Zcash, créez un compte sur [zgo.cash](https://zgo.cash/), puis commencez soit à générer directement des demandes de paiement, soit à installer l’intégration pertinente.

## Ressources

- [Site officiel de ZGo](https://zgo.cash/)
- [Guide de configuration de l’intégration Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) et [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Page d’accueil du projet Zcash](https://z.cash/)
- [Portefeuilles ZecHub](https://zechub.wiki/wallets), la liste des portefeuilles Zcash compatibles
- [Vue d’ensemble des processeurs de paiement ZecHub](https://zechub.wiki/payment-processors), ZGo dans le contexte des autres options de paiement Zcash
- [Plugin Zcash BTCPayServer](https://zechub.wiki/guides/btcpayserver-zcash-plugin), le guide ZecHub associé pour une alternative auto-hébergée
