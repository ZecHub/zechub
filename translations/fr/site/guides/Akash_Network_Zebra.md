# Comment exécuter Zebra sur le réseau Akash

Guide étape par étape pour déployer un nœud complet Zebra Zcash à l’aide de [la console Akash](https://console.akash.network).

### Ce que vous déployez

Un nœud complet Zebra qui va :

-> Synchroniser toute la blockchain Zcash (plus de 100 Go pour le mainnet, environ 40 Go pour le testnet)

-> Coûter environ 15 $/mois selon les prix du token AKT

-> Prendre de plusieurs heures à plusieurs jours pour se synchroniser entièrement

-> Utiliser 4 vCPU, 16 Go de RAM, 350 Go de stockage (mainnet) ou 2 vCPU, 8 Go de RAM, 50 Go (testnet)


### Important : mappage des ports sur Akash

Lorsque vous exposez un port sur Akash (par exemple, le port 8233 pour le P2P de Zebra), il **ne se lie PAS à ce port exact** sur l’IP publique du fournisseur. Le fournisseur attribue à la place un port élevé aléatoire (comme 31234 ou 42567) et le reverse-proxy vers le port 8233 de votre conteneur.

C’est voulu : les fournisseurs exécutent plusieurs déploiements, et il y aurait des conflits si tout le monde essayait d’utiliser directement le port 8233.

**Ce que cela signifie pour vous :**

-> Vous configurez le port 8233 dans le SDL (le port P2P standard de Zebra)

-> Akash vous donne une URI telle que *provider.com:31234*

-> Les autres nœuds Zcash se connectent à vous via *provider.com:31234*

-> À l’intérieur de votre conteneur, Zebra écoute toujours sur le port 8233


Tout cela est géré automatiquement. Utilisez simplement l’URI fournie par Akash.

### Prérequis

1. Extension de navigateur **Keplr Wallet** installée (Chrome/Brave/Firefox)
2. **Tokens AKT** - Obtenez 50 à 100 AKT sur un échange (Coinbase, Kraken, Osmosis)
3. **5 minutes** pour parcourir l’interface de la Console

#### Étape 1 : Connectez votre wallet

-> Rendez-vous sur [https://console.akash.network](https://console.akash.network)

-> Cliquez sur **"Connect Wallet"** en haut à droite

-> Choisissez **Keplr** (ou votre wallet Cosmos préféré)

-> Approuvez la connexion lorsque Keplr s’ouvre


Votre solde AKT devrait apparaître en haut à droite. S’il est à zéro, approvisionnez d’abord votre wallet.

#### Étape 2 : Créez le déploiement

-> Cliquez sur le bouton **"Deploy"** (grand bouton bleu, au centre de la page)

-> Choisissez **"Build your template"** (ou passez directement au téléversement du SDL)


##### Option A : téléverser un fichier SDL (recommandé)

[![Déployer sur Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Option B : utiliser l’éditeur SDL

Si vous souhaitez coller manuellement [le SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) :

-> Copiez le contenu de *zebra-akash.yml*

-> Collez-le dans l’éditeur SDL

-> Modifiez-le au besoin (voir la section de configuration ci-dessous)

-> Cliquez sur **"Create Deployment"**


#### Étape 3 : vérifiez et approuvez le dépôt

La Console vous affichera :

-> **Dépôt de déploiement** : environ 5 AKT (vous le récupérez lorsque vous fermez le déploiement)

-> **Coût estimé** : selon la tarification de votre SDL

Cliquez sur **"Approve"** et signez la transaction dans Keplr.

#### Étape 4 : choisissez un fournisseur

Après environ 30 secondes, vous verrez les offres des fournisseurs. Chaque offre indique :

-> **Prix par bloc** (en AKT ou USDC)

-> **Coût mensuel estimé**

-> **Détails du fournisseur** (disponibilité, région, etc.)


**Ne choisissez pas simplement le moins cher.** Vérifiez :

-> Pourcentage de disponibilité (visez > 95 %)

-> Région (plus elle est proche de vous, meilleure est la latence, mais cela importe peu pour les nœuds blockchain)

-> Statut audité (coche verte = plus fiable)


Cliquez sur **"Accept Bid"** pour le fournisseur choisi et signez dans Keplr.

#### Étape 5 : attendez le déploiement

La Console va :

-> Créer le bail avec le fournisseur choisi

-> Envoyer le manifeste (il indique au fournisseur quoi exécuter)

-> Démarrer votre conteneur

Cela prend 1 à 2 minutes. Vous verrez des mises à jour de statut dans l’interface.

#### Étape 6 : vérifiez qu’il fonctionne

Une fois déployé, vous verrez :

-> Onglet **Services** : affiche votre service *zebra* avec son statut

-> Onglet **Logs** : journaux du conteneur en direct

-> Onglet **Leases** : détails de votre déploiement (DSEQ, fournisseur, coût)


##### Vérifier les journaux

Cliquez sur **Logs** et vous devriez voir Zebra démarrer :

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

La synchronisation prendra **des heures à des jours** selon le réseau. Surveillez :

-> L’augmentation des hauteurs de bloc

-> Les connexions entre pairs (il devrait y avoir 10 à 30 pairs)

-> L’absence d’erreurs répétées


#### Étape 7 : obtenez l’adresse de votre nœud

Cliquez sur l’onglet **Leases**, puis sur **URIs**.

Vous verrez quelque chose comme :

```bash
zebra-8233: provider-hostname.com:31234
```

Il s’agit du **point de terminaison P2P public** de votre nœud. Les autres nœuds Zcash se connecteront à vous à cette adresse.

**Notez le mappage des ports :** vous avez configuré le port 8233 dans le SDL, mais Akash l’a attribué à un autre port public (31234 dans cet exemple). C’est normal : consultez la section « Mappage des ports sur Akash » en haut si cela vous semble confus. Votre nœud est accessible sur le port affiché ici par Akash, pas nécessairement sur le 8233.

Si vous avez activé RPC (commenté par défaut dans le SDL), vous verrez également ici le point de terminaison RPC avec son propre port mappé.

### Options de configuration

#### Passer au testnet

Le SDL utilise le mainnet par défaut. Pour utiliser le testnet à la place :

-> **Commentez la configuration Mainnet** dans la section *env* :

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Décommentez la configuration Testnet** :

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
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

-> **Facultatif : réduisez les ressources** pour le Testnet dans *profiles.compute.zebra.resources* :

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Facultatif : réduisez la tarification** dans *profiles.placement.akash.pricing* :

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Activer l’accès RPC

RPC est désactivé par défaut pour des raisons de sécurité. Pour l’activer :

**Pour le Mainnet :**

-> Décommentez dans la section *env* :

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Décommentez le port RPC Mainnet dans *expose* :

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Pour le Testnet :**

-> Décommentez dans la section *env* :

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Décommentez le port RPC Testnet dans *expose* :

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Avertissement** : si vous définissez *global: true* pour RPC, vous l’exposez à Internet. Zebra utilise l’authentification par cookie par défaut, mais ne le faites pas à moins de savoir ce que vous faites.

**Rappel concernant le mappage des ports** : même si vous exposez RPC globalement, Akash le mappera vers un port élevé aléatoire (et non 8232/18232). Consultez les URI de votre déploiement pour connaître le véritable point de terminaison public. Avec *global: false* (recommandé), le point de terminaison RPC est accessible uniquement au sein du réseau de déploiement Akash, et non depuis Internet.

#### Activer les métriques (Prometheus)

Pour collecter des métriques de surveillance :

-> Décommentez dans *env* :

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Décommentez le port des métriques dans *expose* :

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Ajuster les ressources/la tarification

Si vous n’obtenez pas d’offres ou souhaitez optimiser le coût :

**Pour des fournisseurs aux spécifications plus modestes**, réduisez les valeurs dans la section *profiles.compute.zebra.resources* :

-> CPU : *units: 2* (minimum pour une vitesse de synchronisation raisonnable)

-> Mémoire : *size: 12Gi* (minimum pour la stabilité)

-> Stockage : *size: 120Gi* (minimum pour le mainnet)

**Pour attirer davantage d’offres**, augmentez dans *profiles.placement.akash.pricing* :

-> Mainnet : essayez *amount: 1000000* uakt/bloc

-> Testnet : essayez *amount: 1000000* uakt/bloc

### Mettre à jour votre déploiement

Vous devez modifier la configuration après le déploiement ?

-> Allez dans **My Deployments** dans la Console

-> Trouvez votre déploiement Zebra

-> Cliquez sur **"Update Deployment"**

-> Modifiez le SDL

-> Cliquez sur **"Update"** et approuvez dans Keplr

**Note** : la mise à jour redémarrera votre conteneur. Le nœud reprendra depuis son état enregistré (stockage persistant), mais prévoyez 1 à 2 minutes d’indisponibilité.

### Surveillance

#### Via la Console

-> Onglet **Logs** : journaux du conteneur en direct

-> Onglet **Shell** : obtenez un shell dans le conteneur (utile pour le débogage)

-> Onglet **Events** : événements Kubernetes (généralement inutiles sauf en cas de problème)


#### Via RPC (si activé)

Si vous avez activé RPC, vous pouvez interroger votre nœud comme un nœud complet zebrad normal (car c’en est un !)

### Fermer votre déploiement

Lorsque vous avez terminé ou souhaitez arrêter de payer :

-> Allez dans **My Deployments**

-> Trouvez votre déploiement Zebra

-> Cliquez sur **"Close Deployment"**

-> Confirmez et signez dans Keplr

Votre dépôt de 5 AKT sera remboursé. Le **stockage persistant** devrait être conservé par le fournisseur, mais ne vous y fiez pas : traitez-le comme n’importe quel autre fournisseur cloud.

### Dépannage

#### Erreur « Insufficient funds »

Vous avez besoin de davantage d’AKT. Approvisionnez votre wallet Keplr.

#### Aucune offre n’apparaît

Soit :

-> Votre tarification est trop basse (augmentez *amount* dans le SDL)

-> Vos besoins en ressources sont trop élevés pour les fournisseurs disponibles (réduisez CPU/mémoire/stockage)

-> Attendez plus longtemps (il faut parfois 60 à 90 secondes pour que les offres apparaissent)


#### Déploiement bloqué sur « pending »

Le fournisseur rencontre peut-être des problèmes. Fermez le déploiement et essayez un autre fournisseur.

#### Les journaux Zebra affichent « No peers connected »

C’est normal pendant les premières minutes. Zebra découvrira automatiquement des pairs. Si cela persiste après plus de 10 minutes, vous avez peut-être un problème réseau (peu probable sur Akash).

#### Erreurs « Out of memory » dans les journaux

Vous avez économisé sur la RAM. Fermez le déploiement et redéployez avec au moins 12Gi de mémoire (16Gi recommandés).

#### La synchronisation prend une éternité

Définissez « éternité » :

-> **Heures** : normal

-> **Jours** : également normal pour le mainnet à partir de zéro

-> **Semaines** : il y a un problème, vérifiez les journaux pour y trouver des erreurs


### Gestion des coûts

Surveillez vos dépenses dans la Console :

-> **My Deployments** -> Votre déploiement -> affiche l’estimation du « Cost per month »

-> Le solde de votre wallet Keplr diminuera au fil du temps


Lorsque votre solde devient faible, Akash ferme automatiquement votre déploiement. **Approvisionnez régulièrement votre wallet** ou configurez des alertes.

#### Réduire les coûts

-> **Utilisez le Testnet** pour les tests hors production (50 % moins cher)

-> **Réduisez le CPU/la mémoire** si vous n’avez pas besoin d’une synchronisation rapide

-> **Choisissez des fournisseurs moins chers** (pas toujours judicieux : la disponibilité compte)


### Mainnet vs Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Commencez avec le Testnet si vous testez simplement le processus de déploiement. Consultez la section « Passer au testnet » ci-dessus pour la configuration.

### Ressources supplémentaires

**Console Akash** : [https://console.akash.network](https://console.akash.network)

**Documentation Akash** : [https://akash.network/docs/](https://akash.network/docs/)

**Documentation Zebra** : [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Explorateurs Zcash** : [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord Akash** : [https://discord.akash.network](https://discord.akash.network) (pour les problèmes de fournisseur)
