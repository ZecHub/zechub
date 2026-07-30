# Comment exécuter Zebra sur Akash Network

Guide étape par étape pour déployer un nœud complet Zebra Zcash en utilisant [Akash Console](https://console.akash.network).

### Ce que vous allez déployer

Un nœud complet Zebra qui va :

-> Synchroniser l’intégralité de la blockchain Zcash (100GB+ pour le mainnet, ~40GB pour le testnet)

-> Coûter environ 15 $/mois selon les prix du jeton AKT

-> Prendre de plusieurs heures à plusieurs jours pour être complètement synchronisé

-> Utiliser 4 vCPU, 16GB de RAM, 350GB de stockage (mainnet) ou 2 vCPU, 8GB de RAM, 50GB (testnet)


### Important : Mappage des ports sur Akash

Lorsque vous exposez un port sur Akash (par ex., le port 8233 pour le P2P de Zebra), il **n’est PAS lié à ce port exact** sur l’IP publique du fournisseur. À la place, le fournisseur attribue un port élevé aléatoire (comme 31234 ou 42567) et fait un proxy inverse vers le port 8233 de votre conteneur.

C’est voulu par conception - les fournisseurs exécutent plusieurs déploiements, et ils auraient des conflits si tout le monde essayait d’utiliser directement le port 8233.

**Ce que cela signifie pour vous :**

-> Vous configurez le port 8233 dans le SDL (port P2P standard de Zebra)

-> Akash vous donne un URI comme *provider.com:31234*

-> Les autres nœuds Zcash se connectent à vous via *provider.com:31234*

-> À l’intérieur de votre conteneur, Zebra écoute toujours sur 8233


Cela est géré automatiquement. Utilisez simplement l’URI qu’Akash vous fournit.

### Prérequis

1. Extension de navigateur **Keplr Wallet** installée (Chrome/Brave/Firefox)
2. **Jetons AKT** - Obtenez 50-100 AKT sur un exchange (Coinbase, Kraken, Osmosis)
3. **5 minutes** pour parcourir l’interface de la Console

#### Étape 1 : Connecter votre wallet

-> Allez sur [https://console.akash.network](https://console.akash.network)

-> Cliquez sur **"Connect Wallet"** en haut à droite

-> Choisissez **Keplr** (ou votre wallet Cosmos préféré)

-> Approuvez la connexion lorsque Keplr s’ouvre


Votre solde AKT devrait apparaître en haut à droite. S’il est à zéro, approvisionnez d’abord votre wallet.

#### Étape 2 : Créer le déploiement

-> Cliquez sur le bouton **"Deploy"** (grand bouton bleu, au centre de la page)

-> Choisissez **"Build your template"** (ou passez directement au téléversement du SDL)


##### Option A : Téléverser le fichier SDL (recommandé)

[![Déployer sur Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Option B : Utiliser l’éditeur SDL

Si vous voulez coller manuellement [le SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) :

-> Copiez le contenu de *zebra-akash.yml*

-> Collez-le dans l’éditeur SDL

-> Modifiez selon vos besoins (voir la section de configuration ci-dessous)

-> Cliquez sur **"Create Deployment"**


#### Étape 3 : Vérifier et approuver le dépôt

La Console vous montrera :

-> **Dépôt de déploiement** : ~5 AKT (vous le récupérez lorsque vous fermez le déploiement)

-> **Coût estimé** : Basé sur le prix indiqué dans votre SDL

Cliquez sur **"Approve"** et signez la transaction dans Keplr.

#### Étape 4 : Choisir un fournisseur

Après ~ 30 secondes, vous verrez des offres de fournisseurs. Chaque offre affiche :

-> **Prix par bloc** (en AKT ou USDC)

-> **Coût mensuel estimé**

-> **Détails du fournisseur** (disponibilité, région, etc.)


**Ne choisissez pas seulement le moins cher.** Vérifiez :

-> % de disponibilité (visez > 95 %)

-> Région (plus proche de vous = meilleure latence, mais cela importe peu pour les nœuds blockchain)

-> Statut audité (coche verte = plus digne de confiance)


Cliquez sur **"Accept Bid"** pour le fournisseur choisi et signez dans Keplr.

#### Étape 5 : Attendre le déploiement

La Console va :

-> Créer le bail avec le fournisseur choisi

-> Envoyer le manifeste (qui indique au fournisseur quoi exécuter)

-> Démarrer votre conteneur

Cela prend 1 à 2 minutes. Vous verrez les mises à jour de statut dans l’interface.

#### Étape 6 : Vérifier qu’il est en cours d’exécution

Une fois déployé, vous verrez :

-> Onglet **Services** : Affiche votre service *zebra* avec son statut

-> Onglet **Logs** : Journaux du conteneur en direct

-> Onglet **Leases** : Détails sur votre déploiement (DSEQ, fournisseur, coût)


##### Vérifier les journaux

Cliquez sur **Logs** et vous devriez voir Zebra démarrer :

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

La synchronisation prendra **de plusieurs heures à plusieurs jours** selon le réseau. Surveillez :

-> Des hauteurs de bloc en augmentation

-> Les connexions pair-à-pair (vous devriez avoir 10-30 pairs)

-> L’absence d’erreurs répétées


#### Étape 7 : Obtenir l’adresse de votre nœud

Cliquez sur l’onglet **Leases**, puis sur **URIs**.

Vous verrez quelque chose comme :

```bash
zebra-8233: provider-hostname.com:31234
```

C’est le **point de terminaison P2P public** de votre nœud. Les autres nœuds Zcash se connecteront à vous à cette adresse.

**Notez le mappage des ports :** Vous avez configuré le port 8233 dans le SDL, mais Akash l’a attribué à un autre port public (31234 dans cet exemple). C’est normal - voir la section « Mappage des ports sur Akash » en haut si cela vous perturbe. Votre nœud est accessible sur le port affiché ici par Akash, pas nécessairement sur 8233.

Si vous avez activé le RPC (désactivé par commentaire par défaut dans le SDL), vous verrez aussi ici le point de terminaison RPC avec son propre port mappé.

### Options de configuration

#### Passer au testnet

Le SDL utilise le Mainnet par défaut. Pour utiliser le Testnet à la place :

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

-> **Optionnel : Réduisez les ressources** pour le Testnet dans *profiles.compute.zebra.resources* :

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Optionnel : Réduisez le prix** dans *profiles.placement.akash.pricing* :

   ```yaml
   amount: 5000  # Down from 10000
#### Activer l'accès RPC

Le RPC est désactivé par défaut pour des raisons de sécurité. Pour l'activer :

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

**Avertissement** : Si vous définissez *global: true* pour le RPC, vous l'exposez à internet. Zebra utilise l'authentification par cookie par défaut, mais malgré cela, ne faites pas cela à moins de savoir ce que vous faites.

**Rappel sur le mappage des ports** : Même si vous exposez le RPC globalement, Akash le mappera à un port élevé aléatoire (pas 8232/18232). Vérifiez les URI dans votre déploiement pour voir le véritable endpoint public. Pour *global: false* (recommandé), le endpoint RPC n'est accessible qu'au sein du réseau de déploiement Akash, et non depuis l'internet public.

#### Activer les métriques (Prometheus)

Pour collecter les métriques à des fins de surveillance :

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

Si vous ne recevez pas d'offres ou si vous voulez optimiser le coût :

**Pour les fournisseurs moins performants**, réduisez dans la section *profiles.compute.zebra.resources* :

-> CPU : *units: 2* (minimum pour une vitesse de synchronisation raisonnable)

-> Mémoire : *size: 12Gi* (minimum pour la stabilité)

-> Stockage : *size: 120Gi* (minimum pour le mainnet)

**Pour attirer davantage d'offres**, augmentez dans *profiles.placement.akash.pricing* :

-> Mainnet : Essayez *amount: 1000000* uakt/block

-> Testnet : Essayez *amount: 1000000* uakt/block

### Mise à jour de votre déploiement

Vous devez modifier la configuration après le déploiement ?

-> Allez dans **My Deployments** dans la Console

-> Trouvez votre déploiement Zebra

-> Cliquez sur **"Update Deployment"**

-> Modifiez le SDL

-> Cliquez sur **"Update"** et approuvez dans Keplr

**Remarque** : Une mise à jour redémarrera votre conteneur. Le nœud reprendra à partir de son état sauvegardé (stockage persistant), mais attendez-vous à 1-2 minutes d'interruption.

### Surveillance

#### Via la Console

-> **Onglet Logs** : journaux du conteneur en direct

-> **Onglet Shell** : obtenez un shell à l'intérieur du conteneur (utile pour le débogage)

-> **Onglet Events** : événements Kubernetes (généralement inutiles sauf si quelque chose est cassé)


#### Via RPC (si activé)

Si vous avez activé le RPC, vous pouvez interroger votre nœud comme un nœud complet zebrad normal (parce que c'en est un !)

### Fermer votre déploiement

Quand vous avez terminé ou que vous voulez arrêter de payer :

-> Allez dans **My Deployments**

-> Trouvez votre déploiement Zebra

-> Cliquez sur **"Close Deployment"**

-> Confirmez et signez dans Keplr

Votre dépôt de 5 AKT vous sera remboursé. Le **stockage persistant** devrait être préservé par le fournisseur, mais ne comptez pas dessus — traitez-le comme chez n'importe quel autre fournisseur cloud.

### Dépannage

#### Erreur "Insufficient funds"

Vous avez besoin de plus d'AKT. Approvisionnez votre portefeuille Keplr.

#### Aucune offre n'apparaît

Soit :

-> Votre tarification est trop basse (augmentez *amount* dans le SDL)

-> Vos exigences en ressources sont trop élevées pour les fournisseurs disponibles (réduisez CPU/mémoire/stockage)

-> Attendez plus longtemps (il faut parfois 60-90 secondes pour que les offres apparaissent)


#### Déploiement bloqué sur "pending"

Le fournisseur rencontre peut-être des problèmes. Fermez le déploiement et essayez avec un autre fournisseur.

#### Les journaux Zebra affichent "No peers connected"

C'est normal pendant les premières minutes. Zebra découvrira automatiquement des pairs. Si cela persiste après plus de 10 minutes, vous avez peut-être un problème de réseau (peu probable sur Akash).

#### Erreurs "Out of memory" dans les journaux

Vous avez été radin sur la RAM. Fermez le déploiement et redéployez avec au moins 12Gi de mémoire (16Gi recommandé).

#### La synchronisation prend une éternité

Définissez "une éternité" :

-> **Heures** : normal

-> **Jours** : également normal pour le mainnet à partir de zéro

-> **Semaines** : quelque chose ne va pas, vérifiez les journaux pour détecter des erreurs


### Gestion des coûts

Surveillez vos dépenses dans la Console :

-> **My Deployments** -> Votre déploiement -> affiche une estimation du "Cost per month"

-> Le solde de votre portefeuille Keplr diminuera avec le temps


Lorsque votre solde devient faible, Akash fermera automatiquement votre déploiement. **Rechargez périodiquement votre portefeuille** ou configurez des alertes.

#### Réduire les coûts

-> **Utilisez le Testnet** pour les tests non productifs (50 % moins cher)

-> **Réduisez CPU/mémoire** si vous n'avez pas besoin d'une synchronisation rapide

-> **Choisissez des fournisseurs moins chers** (ce n'est pas toujours judicieux — la disponibilité compte)


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

Commencez par le Testnet si vous testez simplement le processus de déploiement. Voir la section "Switching to Testnet" ci-dessus pour la configuration.
### Ressources supplémentaires

**Console Akash** : [https://console.akash.network](https://console.akash.network)

**Documentation Akash** : [https://akash.network/docs/](https://akash.network/docs/)

**Documentation Zebra** : [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Explorateurs Zcash** : [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Discord Akash** : [https://discord.akash.network](https://discord.akash.network) (pour les problèmes liés aux fournisseurs)
