# Déployer zcashd sur Akash via Console

Guide pour déployer un nœud complet Zcash zcashd (implémentation d'Electric Coin Co) en utilisant [Akash Console](https://console.akash.network). Voici ci-dessous un tutoriel vidéo. Un guide plus approfondi se trouve plus bas.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Configuration d’un nœud complet Zcash sur Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Ce que vous allez déployer

Un nœud complet zcashd qui va :

-> Synchroniser l’intégralité de la blockchain Zcash (350GB+ pour le mainnet, ~ 40GB pour le testnet)

-> Coûter environ $15/mois selon le prix du jeton AKT

-> Prendre de plusieurs heures à plusieurs jours pour se synchroniser complètement

-> Utiliser 4 vCPUs, 16GB de RAM, 350GB de stockage (mainnet) ou 2 vCPUs, 8GB de RAM, 50GB (testnet)

-> Télécharger les paramètres cryptographiques au premier démarrage (~ 2GB, une seule fois)

**zcashd vs Zebra :**

-> zcashd est l’implémentation originale du nœud Zcash par Electric Coin Co

-> Zebra est l’implémentation alternative de la Zcash Foundation

-> Les deux sont compatibles avec le réseau Zcash

-> zcashd dispose de plus de fonctionnalités (minage, portefeuille, API Insight Explorer)

-> Utilisez zcashd si vous avez besoin des fonctionnalités de portefeuille ou d’API RPC spécifiques


### **Important : mappage des ports sur Akash**

Lorsque vous exposez un port sur Akash (par ex., le port 8233 pour le P2P de zcashd), il **n’est PAS lié à ce port exact** sur l’IP publique du fournisseur. À la place, le fournisseur attribue un port élevé aléatoire (comme 31234 ou 42567) et le reverse-proxy vers le port 8233 de votre conteneur.

C’est voulu par conception - les fournisseurs exécutent plusieurs déploiements, et il y aurait des conflits si tout le monde essayait d’utiliser directement le port 8233.

**Ce que cela signifie pour vous :**

-> Vous configurez le port 8233 dans le SDL (port P2P standard de zcashd)

-> Akash vous donne une URI comme *provider.com:31234*

-> Les autres nœuds Zcash se connectent à vous via *provider.com:31234*

-> À l’intérieur de votre conteneur, zcashd écoute toujours sur 8233


Tout cela est géré automatiquement. Utilisez simplement l’URI que Akash vous fournit.

## Prérequis

-> Extension de navigateur **Keplr Wallet** installée (Chrome/Brave/Firefox)

-> Jetons **AKT** - Obtenez 50-100 AKT sur un exchange (Coinbase, Kraken, Osmosis)

-> **5 minutes** pour parcourir l’interface de Console


## Étape 1 : Connecter votre portefeuille

-> Allez sur [https://console.akash.network](https://console.akash.network)

-> Cliquez sur le bouton **"Connect Wallet"** en haut à droite

-> Choisissez **Keplr** (ou votre portefeuille Cosmos préféré)

-> Approuvez la connexion lorsque Keplr s’ouvre


Votre solde AKT devrait apparaître en haut à droite. S’il est à zéro, approvisionnez d’abord votre portefeuille.

## Étape 2 : Créer le déploiement

-> Cliquez sur le bouton **"Deploy"** (gros bouton bleu, au centre de la page)

-> Choisissez **"Build your template"** (ou passez directement au téléversement du SDL)

### Option A : Téléverser le fichier SDL (recommandé)

[![Déployer sur Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Option B : Utiliser l’éditeur SDL

Si vous souhaitez coller manuellement le SDL :

-> Copiez le contenu de *zcashd-akash.yml*

-> Collez-le dans l’éditeur SDL

-> Modifiez-le selon vos besoins (voir la section configuration ci-dessous)

-> Cliquez sur **"Create Deployment"**


## Étape 3 : Vérifier et approuver le dépôt

La Console vous affichera :

-> **Dépôt de déploiement** : ~ 5 AKT (vous les récupérez lorsque vous fermez le déploiement)

-> **Coût estimé** : basé sur la tarification de votre SDL


Cliquez sur **"Approve"** et signez la transaction dans Keplr.

## Étape 4 : Choisir un fournisseur

Après ~ 30 secondes, vous verrez des offres de fournisseurs. Chaque offre affiche :

-> **Prix par bloc** (en AKT ou USDC)

-> **Coût mensuel estimé**

-> **Détails du fournisseur** (disponibilité, région, etc.)


**Ne choisissez pas simplement le moins cher.** Vérifiez :

-> % de disponibilité (visez > 95%)

-> Région (plus elle est proche de vous = meilleure latence, mais cela importe peu pour les nœuds blockchain)

-> Statut audité (coche verte = plus fiable)


Cliquez sur **"Accept Bid"** pour le fournisseur choisi et signez dans Keplr.

## Étape 5 : Attendre le déploiement

Console va :

-> Créer le bail avec le fournisseur choisi

-> Envoyer le manifeste (indique au fournisseur quoi exécuter)

-> Démarrer votre conteneur


Cela prend 1 à 2 minutes. Vous verrez des mises à jour d’état dans l’interface.

## Étape 6 : Vérifier que tout fonctionne

Une fois déployé, vous verrez :

-> Onglet **Services** : affiche votre service *zcashd* avec son état

-> Onglet **Logs** : journaux en direct de votre nœud zcashd

-> Onglet **Leases** : détails sur votre déploiement (DSEQ, fournisseur, coût)


### Vérifier les journaux

Cliquez sur **Logs** et vous devriez voir zcashd démarrer :

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Au premier démarrage, zcash-params sera téléchargé (~2GB).** Il s’agit d’une opération unique qui prend 5 à 10 minutes selon la bande passante du fournisseur. Les redémarrages suivants l’ignoreront.

La synchronisation prendra **de plusieurs heures à plusieurs jours** selon le réseau. Surveillez :

-> L’augmentation des hauteurs de blocs

-> Les connexions de pairs (devraient être de 10 à 30 pairs)

-> L’absence d’erreurs répétées


## Étape 7 : Obtenir l’adresse de votre nœud

Cliquez sur l’onglet **Leases**, puis sur **URIs**.

Vous verrez quelque chose comme :

```
zcashd-8233: provider-hostname.com:31234
```

Il s’agit du **point de terminaison P2P public** de votre nœud. Les autres nœuds Zcash se connecteront à vous via cette adresse.

**Notez le mappage des ports :** vous avez configuré le port 8233 dans le SDL, mais Akash l’a attribué à un autre port public (31234 dans cet exemple). C’est normal - voir la section "Mappage des ports sur Akash" en haut si cela vous trouble. Votre nœud est accessible sur le port affiché ici par Akash, pas nécessairement sur 8233.

Si vous avez activé RPC (désactivé par défaut dans le SDL), vous verrez aussi ici le point de terminaison RPC avec son propre port mappé.

## Options de configuration

### Basculer sur le testnet

Le SDL utilise le Mainnet par défaut. Pour utiliser le Testnet à la place :

-> **Changez le réseau dans la section *env* :**

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

-> **Optionnel : réduisez les ressources** pour le Testnet dans *profiles.compute.zcashd.resources* :

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Optionnel : baissez le tarif** dans *profiles.placement.akash.pricing* :

   ```yaml
   amount: 5000  # Down from 10000
   ```

> note lowering prices may filter our providers form bidding. experiement with this value, or use the provider endpiont to check if they would bid. (review provider api documentation)

### Activer l’accès RPC

RPC est désactivé par défaut pour des raisons de sécurité. Pour l’activer :

**CRITIQUE : définissez des identifiants robustes.** Le RPC de zcashd transmet le nom d’utilisateur/mot de passe en HTTP (pas en HTTPS). N’exposez RPC que si vous comprenez les implications de sécurité.

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

   **Pour le Mainnet :**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Pour le Testnet :**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Avertissement** : si vous définissez *global: true* pour RPC, vous l’exposez à internet avec une authentification basique. C’est une mauvaise idée. Utilisez *global: false* et accédez au RPC via le réseau interne d’Akash ou mettez en place un tunnel sécurisé.

**Rappel sur le mappage des ports** : même si vous exposez RPC globalement, Akash le mappera vers un port élevé aléatoire (pas 8232/18232). Vérifiez les URIs de votre déploiement pour voir le véritable point de terminaison public. Avec *global: false* (recommandé), le point de terminaison RPC n’est accessible qu’à l’intérieur du réseau de déploiement Akash, pas depuis l’internet public.

### Activer l’index des transactions

L’index des transactions vous permet d’interroger n’importe quelle transaction par son ID via RPC. Utilise davantage de stockage (~ 20% d’augmentation).

Décommentez dans *env* :

```yaml
- "ZCASHD_TXINDEX=1"
```

**Avertissement** : activer txindex sur un nœud déjà synchronisé nécessite une réindexation de toute la blockchain, ce qui prend des heures.

### Activer Insight Explorer

Insight Explorer fournit des points de terminaison REST API supplémentaires pour les données blockchain (utile pour les explorateurs de blocs).

Décommentez dans *env* :

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Cela active automatiquement txindex et ajoute des méthodes RPC supplémentaires.

### Activer les métriques Prometheus

Pour collecter les métriques à des fins de monitoring :

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
   
Les métriques seront disponibles à l’adresse http://yourendpoint:9969/metrics au format Prometheus.

### Ajuster les ressources/la tarification

Si vous ne recevez pas d’offres ou si vous voulez optimiser les coûts :

**Pour les fournisseurs moins puissants**, réduisez dans la section *profiles.compute.zcashd.resources* :

-> CPU : *units: 2* (minimum pour une vitesse de synchronisation raisonnable)

-> Mémoire : *size: 12Gi* (minimum pour la stabilité)

-> Stockage : *size: 120Gi* (minimum pour le mainnet)


**Pour attirer davantage d’offres**, augmentez dans *profiles.placement.akash.pricing* :

-> Mainnet : essayez *amount: 15000* uakt/block

-> Testnet : essayez *amount: 7500* uakt/block


Les valeurs du SDL sont réglées de manière conservatrice et assez haute. La plupart des fournisseurs proposeront moins.

## Mettre à jour votre déploiement

Besoin de modifier la configuration après le déploiement ?

-> Allez dans **My Deployments** dans Console

-> Trouvez votre déploiement zcashd

-> Cliquez sur **"Update Deployment"**

-> Modifiez le SDL

-> Cliquez sur **"Update"** et approuvez dans Keplr


**Note** : la mise à jour redémarrera votre conteneur. Le nœud reprendra depuis son état sauvegardé (stockage persistant), mais prévoyez 1 à 2 minutes d’indisponibilité.

## Surveillance

### Via Console

-> Onglet **Logs** : journaux du conteneur en direct

-> Onglet **Shell** : obtenez un shell à l’intérieur du conteneur (utile pour le débogage)

-> Onglet **Events** : événements Kubernetes (la plupart du temps inutiles sauf si quelque chose est cassé)


### Via RPC (si activé)

Si vous avez activé RPC, vous pouvez interroger votre nœud comme un nœud complet zcashd classique (parce que c’en est un !)

### Alternative à zcash-cli

Si vous avez un accès shell via Console, vous pouvez utiliser *zcash-cli* directement :

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Fermer votre déploiement

Lorsque vous avez terminé ou si vous voulez arrêter de payer :

-> Allez dans **My Deployments**

-> Trouvez votre déploiement zcashd

-> Cliquez sur **"Close Deployment"**

-> Confirmez et signez dans Keplr


Votre dépôt de 5 AKT vous sera remboursé. Le **stockage persistant** devrait être conservé par le fournisseur, mais ne comptez pas dessus - traitez-le comme chez n’importe quel autre fournisseur cloud.

## Dépannage

### Erreur "Insufficient funds"

Vous avez besoin de plus d’AKT. Approvisionnez votre portefeuille Keplr.

### Aucune offre n’apparaît

Soit :

-> Votre tarification est trop basse (augmentez *amount* dans le SDL)

-> Vos exigences en ressources sont trop élevées pour les fournisseurs disponibles (réduisez CPU/mémoire/stockage)

-> Attendez plus longtemps (il faut parfois 60 à 90 secondes pour que les offres apparaissent)


### Déploiement bloqué sur "pending"

Le fournisseur rencontre peut-être des problèmes. Fermez le déploiement et essayez avec un autre fournisseur.

### Les journaux zcashd affichent "No peers connected"

C’est normal pendant les premières minutes. zcashd découvrira automatiquement des pairs. Si cela persiste après plus de 10 minutes, vous avez peut-être un problème réseau (peu probable sur Akash).

### Erreurs "Out of memory" dans les journaux

Vous avez trop économisé sur la RAM. Fermez le déploiement et redéployez avec au moins 12Gi de mémoire (16Gi recommandé).

### La synchronisation prend une éternité

Définissez "une éternité" :

-> **Des heures** : normal

-> **Des jours** : également normal pour le mainnet à partir de zéro

-> **Des semaines** : quelque chose ne va pas, vérifiez les journaux pour repérer les erreurs


### "Error fetching zcash-params"

Le fournisseur peut avoir des problèmes réseau ou une bande passante lente. Cela se résout généralement tout seul. Si cela persiste plus de 30 minutes, essayez de redéployer chez un autre fournisseur.

### Échecs d’authentification RPC

-> Vérifiez que *ZCASHD_RPCUSER* et *ZCASHD_RPCPASSWORD* sont correctement définis

-> Vérifiez que vous utilisez le bon port (8232 pour le mainnet, 18232 pour le testnet)

-> N’oubliez pas que les ports sont mappés par Akash - utilisez l’URI de votre déploiement, pas directement 8232


## Gestion des coûts

Surveillez vos dépenses dans la Console :

-> **My Deployments** -> Votre déploiement -> affiche l’estimation "Cost per month"

-> Le solde de votre portefeuille Keplr diminuera avec le temps


Lorsque votre solde devient faible, Akash fermera automatiquement votre déploiement. **Rechargez périodiquement votre portefeuille** ou configurez des alertes.

### Réduire les coûts

-> **Utilisez le Testnet** pour les tests hors production (50% moins cher)

-> **Réduisez CPU/mémoire** si vous n’avez pas besoin d’une synchronisation rapide

-> **Choisissez des fournisseurs moins chers** (pas toujours judicieux - la disponibilité compte)

-> **Utilisez USDC au lieu d’AKT** si le prix d’AKT est volatil (nécessite une modification de la tarification du SDL)

-> **Désactivez txindex** si vous n’en avez pas besoin (économise ~ 20% de stockage)


### Ressources supplémentaires

**Akash Console** : [https://console.akash.network](https://console.akash.network)

**Documentation Akash** : [https://akash.network/docs/](https://akash.network/docs/)

**Explorateurs Zcash** : [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord** : [https://discord.akash.network](https://discord.akash.network) (pour les problèmes liés aux fournisseurs)

## Notes finales

- **Le stockage persistant est important.** N’ignorez pas *persistent: true* et n’utilisez pas la classe *beta2*. Utilisez *beta3*.
- **La synchronisation initiale est lente.** Soyez patient. C’est normal pour les nœuds blockchain.
- **Gardez votre portefeuille approvisionné.** Les déploiements se ferment automatiquement lorsque vous n’avez plus d’AKT.
- **Les sauvegardes ne sont pas automatiques.** Si les données vous importent, partez du principe qu’elles peuvent disparaître et planifiez en conséquence.
- **La sécurité RPC est cruciale.** N’exposez pas RPC à internet sans mesures de sécurité appropriées.
- **zcash-params sont mis en cache.** Au premier démarrage, ~2GB de paramètres cryptographiques sont téléchargés. C’est normal et cela n’arrive qu’une seule fois.
