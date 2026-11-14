# Déployer zcashd sur Akash via Console

> **Obsolète. Ne suivez pas ce guide pour déployer un nœud que vous comptez utiliser.**
>
> zcashd a atteint son arrêt automatique de fin de support le 18 juillet 2026. Un nœud zcashd déployé aujourd'hui ne se synchronisera pas jusqu'à la pointe de la chaîne : le déploiement vous coûtera donc de l'argent chaque mois sans rien produire.
>
> Déployez plutôt **Zebra** : [Comment exécuter Zebra sur Akash Network](/guides/akash-network-zebra), qui couvre le même processus dans Akash Console et nécessite environ un tiers de l'espace disque. Si vous migrez une installation existante, consultez le [guide de migration de zcashd vers Zebra et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Cette page est conservée comme archive historique du déploiement de zcashd.

Guide pour déployer un nœud complet zcashd Zcash (implémentation Electric Coin Co) à l'aide d'[Akash Console](https://console.akash.network). Vous trouverez ci-dessous un tutoriel vidéo, puis un guide plus détaillé.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Ce que vous déployez

Un nœud complet zcashd qui va :

-> Synchroniser l'intégralité de la blockchain Zcash (plus de 350 Go pour le mainnet, environ 40 Go pour le testnet)

-> Coûter environ 15 $ par mois selon le prix du jeton AKT

-> Mettre de plusieurs heures à plusieurs jours pour se synchroniser entièrement

-> Utiliser 4 vCPU, 16 Go de RAM et 350 Go de stockage (mainnet) ou 2 vCPU, 8 Go de RAM et 50 Go (testnet)

-> Télécharger les paramètres cryptographiques lors du premier lancement (environ 2 Go, une seule fois)

**zcashd ou Zebra :**

-> zcashd était l'implémentation de nœud Zcash d'origine, développée par Electric Coin Co, et elle est arrêtée depuis le 18 juillet 2026

-> Zebra, de la Zcash Foundation, est le nœud complet utilisé aujourd'hui

-> Seul Zebra suit la chaîne actuelle ; un nœud zcashd ne peut pas en atteindre la pointe

-> Le portefeuille de zcashd a été remplacé par [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Utilisez zcashd si vous avez besoin des fonctionnalités de portefeuille ou d'API RPC spécifiques


### **Important : la redirection des ports sur Akash**

Lorsque vous exposez un port sur Akash (p. ex. le port 8233 pour le P2P de zcashd), il **n'est PAS lié à ce port précis** sur l'IP publique du fournisseur. Le fournisseur attribue plutôt un port élevé aléatoire (comme 31234 ou 42567) et le redirige, via un proxy inverse, vers le port 8233 de votre conteneur.

C'est voulu : les fournisseurs hébergent plusieurs déploiements, et il y aurait des conflits si tout le monde essayait d'utiliser directement le port 8233.

**Ce que cela signifie pour vous :**

-> Vous configurez le port 8233 dans le SDL (le port P2P standard de zcashd)

-> Akash vous fournit une URI du type *provider.com:31234*

-> Les autres nœuds Zcash se connectent à vous via *provider.com:31234*

-> À l'intérieur de votre conteneur, zcashd écoute toujours sur le port 8233


Tout cela est géré automatiquement. Utilisez simplement l'URI fournie par Akash.

## Prérequis

-> L'extension de navigateur **Keplr Wallet** installée (Chrome/Brave/Firefox)

-> Des **jetons AKT** : procurez-vous 50 à 100 AKT sur un exchange (Coinbase, Kraken, Osmosis)

-> **5 minutes** pour cliquer dans l'interface de Console


## Étape 1 : connecter votre portefeuille

-> Rendez-vous sur [https://console.akash.network](https://console.akash.network)

-> Cliquez sur **« Connect Wallet »** en haut à droite

-> Choisissez **Keplr** (ou votre portefeuille Cosmos préféré)

-> Approuvez la connexion lorsque la fenêtre de Keplr s'ouvre


Votre solde d'AKT devrait apparaître en haut à droite. S'il est nul, commencez par approvisionner votre portefeuille.

## Étape 2 : créer un déploiement

-> Cliquez sur le bouton **« Deploy »** (grand bouton bleu au centre de la page)

-> Choisissez **« Build your template »** (ou passez directement au téléversement du SDL)

### Option A : téléverser le fichier SDL (recommandé)

> **Ce bouton déploie un nœud arrêté.** Il est facturé sur votre solde d'AKT pour un nœud incapable de se synchroniser. Utilisez plutôt le [guide Zebra](/guides/akash-network-zebra).

[![Déployer sur Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Option B : utiliser l'éditeur SDL

Si vous souhaitez coller le SDL manuellement :

-> Copiez le contenu de *zcashd-akash.yml*

-> Collez-le dans l'éditeur SDL

-> Modifiez-le selon vos besoins (voir la section de configuration ci-dessous)

-> Cliquez sur **« Create Deployment »**


## Étape 3 : vérifier et approuver le dépôt

Console vous indiquera :

-> **Le dépôt de déploiement** : environ 5 AKT (restitués lorsque vous fermez le déploiement)

-> **Le coût estimé** : basé sur la tarification de votre SDL


Cliquez sur **« Approve »** et signez la transaction dans Keplr.

## Étape 4 : choisir un fournisseur

Après environ 30 secondes, vous verrez les offres des fournisseurs. Chaque offre indique :

-> **Le prix par bloc** (en AKT ou en USDC)

-> **Le coût mensuel estimé**

-> **Les détails du fournisseur** (disponibilité, région, etc.)


**Ne choisissez pas simplement le moins cher.** Vérifiez :

-> Le pourcentage de disponibilité (visez plus de 95 %)

-> La région (plus elle est proche de vous, meilleure est la latence, mais cela importe peu pour des nœuds de blockchain)

-> Le statut d'audit (coche verte = plus digne de confiance)


Cliquez sur **« Accept Bid »** pour le fournisseur choisi et signez dans Keplr.

## Étape 5 : attendre le déploiement

Console va :

-> Créer le bail avec le fournisseur choisi

-> Envoyer le manifeste (qui indique au fournisseur ce qu'il doit exécuter)

-> Démarrer votre conteneur


Cela prend 1 à 2 minutes. Vous verrez les mises à jour de statut dans l'interface.

## Étape 6 : vérifier que tout fonctionne

Une fois le déploiement effectué, vous verrez :

-> L'onglet **Services** : affiche votre service *zcashd* et son statut

-> L'onglet **Logs** : les journaux en direct de votre nœud zcashd

-> L'onglet **Leases** : les détails de votre déploiement (DSEQ, fournisseur, coût)


### Consulter les journaux

Cliquez sur **Logs** et vous devriez voir zcashd démarrer :

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Le premier lancement télécharge zcash-params (environ 2 Go).** Cette opération n'a lieu qu'une seule fois et prend 5 à 10 minutes selon la bande passante du fournisseur. Les redémarrages suivants l'ignoreront.

La synchronisation prendra **de plusieurs heures à plusieurs jours** selon le réseau. Surveillez :

-> L'augmentation de la hauteur des blocs

-> Les connexions aux pairs (entre 10 et 30 pairs)

-> L'absence d'erreurs répétées


## Étape 7 : obtenir l'adresse de votre nœud

Cliquez sur l'onglet **Leases**, puis sur **URIs**.

Vous verrez quelque chose comme :

```
zcashd-8233: provider-hostname.com:31234
```

Il s'agit du **point de terminaison P2P public** de votre nœud. Les autres nœuds Zcash se connecteront à vous à cette adresse.

**Notez la redirection des ports :** vous avez configuré le port 8233 dans le SDL, mais Akash l'a associé à un autre port public (31234 dans cet exemple). C'est normal : consultez la section « La redirection des ports sur Akash » en haut de la page si cela vous paraît confus. Votre nœud est accessible sur le port qu'Akash affiche ici, pas forcément sur le port 8233.

Si vous avez activé le RPC (commenté par défaut dans le SDL), vous verrez également ici le point de terminaison RPC avec son propre port redirigé.

## Options de configuration

### Passer au testnet

Le SDL utilise le mainnet par défaut. Pour utiliser plutôt le testnet :

-> **Modifiez le réseau dans la section *env* :**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Mettez à jour le port exposé** dans la section *expose* :

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **Facultatif : réduisez les ressources** pour le testnet dans *profiles.compute.zcashd.resources* :

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Facultatif : baissez la tarification** dans *profiles.placement.akash.pricing* :

   ```yaml
   amount: 5000  # Down from 10000
   ```

> Notez que baisser les prix peut empêcher certains fournisseurs de faire une offre. Faites des essais avec cette valeur, ou utilisez le point de terminaison du fournisseur pour vérifier s'il ferait une offre (consultez la documentation de l'API des fournisseurs).

### Activer l'accès RPC

Le RPC est désactivé par défaut pour des raisons de sécurité. Pour l'activer :

**CRITIQUE : définissez des identifiants robustes.** Le RPC de zcashd transmet le nom d'utilisateur et le mot de passe en HTTP (et non en HTTPS). N'exposez le RPC que si vous en comprenez les implications en matière de sécurité.

-> Décommentez dans la section *env* :

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Décommentez le port RPC dans *expose* :

   **Pour le mainnet :**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Pour le testnet :**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Avertissement** : si vous définissez *global: true* pour le RPC, vous l'exposez à Internet avec une simple authentification basique. C'est une mauvaise idée. Utilisez *global: false* et accédez au RPC via le réseau interne d'Akash, ou mettez en place un tunnel sécurisé.

**Rappel sur la redirection des ports** : même si vous exposez le RPC globalement, Akash l'associera à un port élevé aléatoire (et non 8232/18232). Consultez les URI de votre déploiement pour connaître le point de terminaison public réel. Avec *global: false* (recommandé), le point de terminaison RPC n'est accessible qu'au sein du réseau de déploiement d'Akash, et non depuis l'Internet public.

### Activer l'index des transactions

L'index des transactions vous permet d'interroger n'importe quelle transaction par son identifiant via le RPC. Il utilise davantage de stockage (environ 20 % de plus).

Décommentez dans *env* :

```yaml
- "ZCASHD_TXINDEX=1"
```

**Avertissement** : activer txindex sur un nœud déjà synchronisé nécessite de réindexer toute la blockchain, ce qui prend des heures.

### Activer Insight Explorer

Insight Explorer fournit des points de terminaison d'API REST supplémentaires pour les données de la blockchain (utiles pour les explorateurs de blocs).

Décommentez dans *env* :

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Cela active automatiquement txindex et ajoute des méthodes RPC supplémentaires.

### Activer les métriques Prometheus

Pour collecter des métriques à des fins de supervision :

-> Décommentez dans *env* :

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Décommentez le port des métriques dans *expose* :

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Les métriques seront disponibles à l'adresse http://yourendpoint:9969/metrics au format Prometheus.

### Ajuster les ressources et la tarification

Si vous ne recevez aucune offre ou souhaitez optimiser les coûts :

**Pour des fournisseurs aux configurations plus modestes**, réduisez les valeurs dans la section *profiles.compute.zcashd.resources* :

-> CPU : *units: 2* (minimum pour une vitesse de synchronisation raisonnable)

-> Mémoire : *size: 12Gi* (minimum pour la stabilité)

-> Stockage : *size: 120Gi* (minimum pour le mainnet)


**Pour attirer davantage d'offres**, augmentez les valeurs dans *profiles.placement.akash.pricing* :

-> Mainnet : essayez *amount: 15000* uakt/bloc

-> Testnet : essayez *amount: 7500* uakt/bloc


Les valeurs du SDL sont volontairement élevées. La plupart des fournisseurs proposeront des offres inférieures.

## Mettre à jour votre déploiement

Besoin de modifier la configuration après le déploiement ?

-> Accédez à **My Deployments** dans Console

-> Trouvez votre déploiement zcashd

-> Cliquez sur **« Update Deployment »**

-> Modifiez le SDL

-> Cliquez sur **« Update »** et approuvez dans Keplr


**Remarque** : la mise à jour redémarrera votre conteneur. Le nœud reprendra à partir de son état sauvegardé (stockage persistant), mais prévoyez 1 à 2 minutes d'interruption.

## Supervision

### Via Console

-> **Onglet Logs** : journaux du conteneur en direct

-> **Onglet Shell** : ouvrez un shell dans le conteneur (utile pour le débogage)

-> **Onglet Events** : événements Kubernetes (généralement inutiles, sauf en cas de problème)


### Via le RPC (s'il est activé)

Si vous avez activé le RPC, vous pouvez interroger votre nœud comme n'importe quel nœud complet zcashd (car c'en est un !)

### Alternative avec zcash-cli

Si vous avez un accès shell via Console, vous pouvez utiliser directement *zcash-cli* :

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Fermer votre déploiement

Lorsque vous avez terminé ou souhaitez arrêter de payer :

-> Accédez à **My Deployments**

-> Trouvez votre déploiement zcashd

-> Cliquez sur **« Close Deployment »**

-> Confirmez et signez dans Keplr


Votre dépôt de 5 AKT vous sera remboursé. Le **stockage persistant** devrait être conservé par le fournisseur, mais ne comptez pas dessus : traitez-le comme n'importe quel autre fournisseur cloud.

## Dépannage

### Erreur « Insufficient funds »

Il vous faut davantage d'AKT. Approvisionnez votre portefeuille Keplr.

### Aucune offre n'apparaît

Au choix :

-> Votre tarification est trop basse (augmentez *amount* dans le SDL)

-> Vos exigences en ressources sont trop élevées pour les fournisseurs disponibles (réduisez le CPU, la mémoire ou le stockage)

-> Attendez plus longtemps (les offres mettent parfois 60 à 90 secondes à apparaître)


### Déploiement bloqué sur « pending »

Le fournisseur rencontre peut-être des problèmes. Fermez le déploiement et essayez un autre fournisseur.

### Les journaux de zcashd affichent « No peers connected »

Depuis l'arrêt de fin de support du 18 juillet 2026, il s'agit de l'état permanent attendu et non d'un délai de démarrage : aucune attente ni aucun redéploiement n'y changera rien. Déployez plutôt [Zebra](/guides/akash-network-zebra).

### Erreurs « Out of memory » dans les journaux

Vous avez lésiné sur la RAM. Fermez le déploiement et redéployez avec au moins 12Gi de mémoire (16Gi recommandés).

### La synchronisation n'en finit pas

Définissez « n'en finit pas » :

-> **Quelques heures** : normal

-> **Quelques jours** : également normal pour le mainnet à partir de zéro

-> **Plusieurs semaines** : quelque chose ne va pas, recherchez des erreurs dans les journaux


### « Error fetching zcash-params »

Le fournisseur rencontre peut-être des problèmes réseau ou dispose d'une bande passante lente. Cela se résout généralement de soi-même. Si le problème persiste plus de 30 minutes, essayez de redéployer chez un autre fournisseur.

### Échecs d'authentification RPC

-> Vérifiez que `ZCASHD_RPCUSER` et `ZCASHD_RPCPASSWORD` sont correctement définis

-> Vérifiez que vous utilisez le bon port (8232 pour le mainnet, 18232 pour le testnet)

-> N'oubliez pas que les ports sont redirigés par Akash : utilisez l'URI de votre déploiement, et non directement le port 8232


## Gestion des coûts

Surveillez vos dépenses dans Console :

-> **My Deployments** -> votre déploiement -> affiche une estimation « Cost per month »

-> Le solde de votre portefeuille Keplr diminuera au fil du temps


Lorsque votre solde devient trop bas, Akash ferme automatiquement votre déploiement. **Rechargez régulièrement votre portefeuille** ou configurez des alertes.

### Réduire les coûts

-> **Utilisez le testnet** pour les tests hors production (50 % moins cher)

-> **Réduisez le CPU et la mémoire** si vous n'avez pas besoin d'une synchronisation rapide

-> **Choisissez des fournisseurs moins chers** (pas toujours judicieux : la disponibilité compte)

-> **Utilisez USDC au lieu de l'AKT** si le prix de l'AKT est volatil (nécessite de modifier la tarification du SDL)

-> **Désactivez txindex** si vous n'en avez pas besoin (économise environ 20 % de stockage)


### Ressources supplémentaires

**Akash Console** : [https://console.akash.network](https://console.akash.network)

**Documentation Akash** : [https://akash.network/docs/](https://akash.network/docs/)

**Explorateurs Zcash** : [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord Akash** : [https://discord.akash.network](https://discord.akash.network) (pour les problèmes liés aux fournisseurs)

## Remarques finales

- **Le stockage persistant est important.** N'omettez pas *persistent: true* et n'utilisez pas la classe *beta2*. Utilisez *beta3*.
- **La synchronisation initiale est lente.** Soyez patient. C'est normal pour les nœuds de blockchain.
- **Gardez votre portefeuille approvisionné.** Les déploiements se ferment automatiquement lorsque vous n'avez plus d'AKT.
- **Les sauvegardes ne sont pas automatiques.** Si vous tenez à vos données, partez du principe qu'elles peuvent disparaître et prévoyez en conséquence.
- **La sécurité du RPC est essentielle.** N'exposez pas le RPC à Internet sans mesures de sécurité adéquates.
- **Les zcash-params sont mis en cache.** Le premier lancement télécharge environ 2 Go de paramètres cryptographiques. C'est normal et cela n'arrive qu'une seule fois.
