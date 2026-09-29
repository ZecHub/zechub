# Déployer zcashd sur Akash via la Console

> **Obsolète. Ne suivez pas ce guide pour déployer un nœud que vous comptez utiliser.**
>
> zcashd a atteint son arrêt automatique de fin de support le 18 juillet 2026. Un nœud zcashd déployé aujourd'hui ne se synchronisera pas avec le sommet de la chaîne, donc le déploiement coûte de l'argent chaque mois sans rien produire.
>
> Déployez plutôt **Zebra** : [Comment exécuter Zebra sur Akash Network](/guides/akash-network-zebra), qui couvre le même flux de travail dans la Console Akash et nécessite environ un tiers de l'espace disque. Si vous déplacez une configuration existante, consultez le [guide de migration de zcashd vers Zebra et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Cette page est conservée comme archive historique du déploiement de zcashd.

Guide pour déployer un nœud complet Zcash zcashd (implémentation de Electric Coin Co) en utilisant [Akash Console](https://console.akash.network). Vous trouverez ci-dessous un tutoriel vidéo. Un guide plus détaillé se trouve également plus bas.

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

-> Synchroniser toute la blockchain Zcash (350GB+ pour le mainnet, ~ 40GB pour le testnet)

-> Coûter environ 15 $/mois selon le prix du token AKT

-> Prendre de plusieurs heures à plusieurs jours pour être entièrement synchronisé

-> Utiliser 4 vCPU, 16GB de RAM, 350GB de stockage (mainnet) ou 2 vCPU, 8GB de RAM, 50GB (testnet)

-> Télécharger les paramètres cryptographiques au premier lancement (~ 2GB, une seule fois)

**zcashd vs Zebra :**

-> zcashd était l'implémentation originale du nœud Zcash par Electric Coin Co, arrêtée depuis le 18 juillet 2026

-> Zebra, de la Zcash Foundation, est le nœud complet utilisé aujourd'hui

-> Seul Zebra suit la chaîne actuelle ; un nœud zcashd ne peut pas atteindre le sommet

-> Le wallet de zcashd a été remplacé par [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Utilisez zcashd si vous avez besoin de fonctionnalités de wallet ou d'API RPC spécifiques


### **Important : Mappage des ports sur Akash**

Lorsque vous exposez un port sur Akash (par exemple, le port 8233 pour le P2P de zcashd), il **n'est PAS lié à ce port exact** sur l'IP publique du fournisseur. À la place, le fournisseur assigne un port élevé aléatoire (comme 31234 ou 42567) et le reverse-proxy vers le port 8233 de votre conteneur.

C'est voulu : les fournisseurs exécutent plusieurs déploiements, et il y aurait des conflits si tout le monde essayait d'utiliser directement le port 8233.

**Ce que cela signifie pour vous :**

-> Vous configurez le port 8233 dans le SDL (port P2P standard de zcashd)

-> Akash vous donne un URI comme *provider.com:31234*

-> D'autres nœuds Zcash se connectent à vous à *provider.com:31234*

-> À l'intérieur de votre conteneur, zcashd écoute toujours sur 8233


Cela est géré automatiquement. Utilisez simplement l'URI que Akash vous donne.

## Prérequis

-> Extension de navigateur **Keplr Wallet** installée (Chrome/Brave/Firefox)

-> **Tokens AKT** - Obtenez 50 à 100 AKT sur un exchange (Coinbase, Kraken, Osmosis)

-> **5 minutes** pour parcourir l'interface de la Console


## Étape 1 : Connecter votre wallet

-> Allez sur [https://console.akash.network](https://console.akash.network)

-> Cliquez sur **"Connect Wallet"** en haut à droite

-> Choisissez **Keplr** (ou votre wallet Cosmos préféré)

-> Approuvez la connexion lorsque Keplr s'ouvre


Votre solde AKT devrait apparaître en haut à droite. S'il est à zéro, approvisionnez d'abord votre wallet.

## Étape 2 : Créer un déploiement

-> Cliquez sur le bouton **"Deploy"** (gros bouton bleu, au centre de la page)

-> Choisissez **"Build your template"** (ou passez directement au téléversement du SDL)

### Option A : Téléverser un fichier SDL (recommandé)

> **Ce bouton déploie un nœud arrêté.** Il facture votre solde AKT pour un nœud qui ne peut pas se synchroniser. Utilisez plutôt le [guide Zebra](/guides/akash-network-zebra).

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Option B : Utiliser l'éditeur SDL

Si vous voulez coller manuellement le SDL :

-> Copiez le contenu de *zcashd-akash.yml*

-> Collez-le dans l'éditeur SDL

-> Modifiez-le selon vos besoins (voir la section de configuration ci-dessous)

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

-> % de disponibilité (visez > 95 %)

-> Région (plus elle est proche de vous, meilleure est la latence, mais cela importe peu pour les nœuds blockchain)

-> Statut audité (coche verte = plus fiable)


Cliquez sur **"Accept Bid"** pour le fournisseur choisi et signez dans Keplr.

## Étape 5 : Attendre le déploiement

La Console va :

-> Créer le bail avec le fournisseur choisi

-> Envoyer le manifeste (qui indique au fournisseur quoi exécuter)

-> Démarrer votre conteneur


Cela prend 1 à 2 minutes. Vous verrez les mises à jour de statut dans l'interface.

## Étape 6 : Vérifier qu'il fonctionne

Une fois déployé, vous verrez :

-> Onglet **Services** : affiche votre service *zcashd* avec son statut

-> Onglet **Logs** : logs en direct de votre nœud zcashd

-> Onglet **Leases** : détails sur votre déploiement (DSEQ, fournisseur, coût)


### Vérifier les logs

Cliquez sur **Logs** et vous devriez voir zcashd démarrer :

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**Au premier lancement, zcash-params sera téléchargé (~2GB).** Il s'agit d'une opération unique qui prend 5 à 10 minutes selon la bande passante du fournisseur. Les redémarrages suivants l'ignoreront.

La synchronisation prendra **de quelques heures à quelques jours** selon le réseau. Surveillez :

-> L'augmentation des hauteurs de blocs

-> Les connexions de pairs (devraient être de 10 à 30 pairs)

-> L'absence d'erreurs répétées


## Étape 7 : Obtenir l'adresse de votre nœud

Cliquez sur l'onglet **Leases**, puis sur **URIs**.

Vous verrez quelque chose comme :

```
zcashd-8233: provider-hostname.com:31234
```

Il s'agit du **point d'accès P2P public** de votre nœud. Les autres nœuds Zcash se connecteront à vous à cette adresse.

**Notez le mappage des ports :** vous avez configuré le port 8233 dans le SDL, mais Akash l'a assigné à un autre port public (31234 dans cet exemple). C'est normal - voir la section "Mappage des ports sur Akash" en haut si cela vous perturbe. Votre nœud est accessible sur le port affiché ici par Akash, pas nécessairement sur 8233.

Si vous avez activé RPC (commenté par défaut dans le SDL), vous verrez également ici le point d'accès RPC avec son propre port mappé.

## Options de configuration

### Basculer vers le testnet

Le SDL utilise le mainnet par défaut. Pour utiliser le testnet à la place :

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

-> **Optionnel : Réduisez les ressources** pour le testnet dans *profiles.compute.zcashd.resources* :

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
   ```

> note lowering prices may filter our providers form bidding. experiement with this value, or use the provider endpiont to check if they would bid. (review provider api documentation)

### Activer l'accès RPC

RPC est désactivé par défaut pour des raisons de sécurité. Pour l'activer :

**CRITIQUE : définissez des identifiants robustes.** Le RPC de zcashd transmet le nom d'utilisateur/mot de passe en HTTP (pas HTTPS). N'exposez RPC que si vous comprenez les implications de sécurité.

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

**Avertissement** : si vous définissez *global: true* pour RPC, vous l'exposez à internet avec une authentification basique. C'est une mauvaise idée. Utilisez *global: false* et accédez à RPC via le réseau interne d'Akash ou mettez en place un tunnel sécurisé.

**Rappel sur le mappage des ports** : même si vous exposez RPC globalement, Akash le mappera vers un port élevé aléatoire (pas 8232/18232). Vérifiez les URI dans votre déploiement pour voir le véritable point d'accès public. Avec *global: false* (recommandé), le point d'accès RPC n'est accessible qu'au sein du réseau de déploiement Akash, pas depuis l'internet public.

### Activer l'index des transactions

L'index des transactions vous permet d'interroger n'importe quelle transaction par son ID via RPC. Utilise plus de stockage (~ 20 % d'augmentation).

Décommentez dans *env* :

```yaml
- "ZCASHD_TXINDEX=1"
```

**Avertissement** : activer txindex sur un nœud existant déjà synchronisé nécessite de réindexer toute la blockchain, ce qui prend des heures.

### Activer Insight Explorer

Insight Explorer fournit des points d'accès REST API supplémentaires pour les données de la blockchain (utile pour les explorateurs de blocs).

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

### Ajuster les ressources/le prix

Si vous n'obtenez pas d'offres ou si vous voulez optimiser le coût :

**Pour les fournisseurs moins puissants**, réduisez dans la section *profiles.compute.zcashd.resources* :

-> CPU : *units: 2* (minimum pour une vitesse de synchronisation raisonnable)

-> Mémoire : *size: 12Gi* (minimum pour la stabilité)

-> Stockage : *size: 120Gi* (minimum pour le mainnet)


**Pour attirer plus d'offres**, augmentez dans *profiles.placement.akash.pricing* :

-> Mainnet : essayez *amount: 15000* uakt/block

-> Testnet : essayez *amount: 7500* uakt/block


Les valeurs du SDL sont définies de manière conservatrice et élevée. La plupart des fournisseurs proposeront moins.

## Mettre à jour votre déploiement

Besoin de modifier la configuration après le déploiement ?

-> Allez dans **My Deployments** dans la Console

-> Trouvez votre déploiement zcashd

-> Cliquez sur **"Update Deployment"**

-> Modifiez le SDL

-> Cliquez sur **"Update"** et approuvez dans Keplr


**Note** : la mise à jour redémarrera votre conteneur. Le nœud reprendra depuis son état sauvegardé (stockage persistant), mais prévoyez 1 à 2 minutes d'interruption.

## Supervision

### Via la Console

-> **Onglet Logs** : logs du conteneur en direct

-> **Onglet Shell** : obtenez un shell dans le conteneur (utile pour le débogage)

-> **Onglet Events** : événements Kubernetes (généralement inutiles sauf si quelque chose est cassé)


### Via RPC (si activé)

Si vous avez activé RPC, vous pouvez interroger votre nœud comme un nœud complet zcashd normal (puisque c'en est un !)

### Alternative à zcash-cli

Si vous avez un accès shell via la Console, vous pouvez utiliser directement *zcash-cli* :

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Fermer votre déploiement

Lorsque vous avez terminé ou que vous voulez arrêter de payer :

-> Allez dans **My Deployments**

-> Trouvez votre déploiement zcashd

-> Cliquez sur **"Close Deployment"**

-> Confirmez et signez dans Keplr


Votre dépôt de 5 AKT sera remboursé. Le **stockage persistant** devrait être conservé par le fournisseur, mais ne comptez pas dessus - traitez-le comme chez n'importe quel autre fournisseur cloud.

## Dépannage

### Erreur "Insufficient funds"

Vous avez besoin de plus d'AKT. Approvisionnez votre wallet Keplr.

### Aucune offre ne s'affiche

Soit :

-> Votre prix est trop bas (augmentez *amount* dans le SDL)

-> Vos besoins en ressources sont trop élevés pour les fournisseurs disponibles (réduisez CPU/mémoire/stockage)

-> Attendez plus longtemps (il faut parfois 60 à 90 secondes pour que les offres apparaissent)


### Déploiement bloqué sur "pending"

Le fournisseur rencontre peut-être des problèmes. Fermez le déploiement et essayez un autre fournisseur.

### Les logs de zcashd affichent "No peers connected"

Depuis l'arrêt de fin de support du 18 juillet 2026, il s'agit de l'état permanent attendu plutôt que d'un retard au démarrage, et aucune attente ou redéploiement n'y changera quoi que ce soit. Déployez plutôt [Zebra](/guides/akash-network-zebra).

### Erreurs "Out of memory" dans les logs

Vous avez trop économisé sur la RAM. Fermez le déploiement et redéployez avec au moins 12Gi de mémoire (16Gi recommandé).

### La synchronisation prend une éternité

Définissez "une éternité" :

-> **Heures** : normal

-> **Jours** : également normal pour le mainnet depuis zéro

-> **Semaines** : quelque chose ne va pas, vérifiez les logs pour des erreurs


### "Error fetching zcash-params"

Le fournisseur peut avoir des problèmes réseau ou une bande passante faible. Cela se résout généralement de soi-même. Si cela persiste plus de 30 minutes, essayez de redéployer chez un autre fournisseur.

### Échecs d'authentification RPC

-> Vérifiez que *ZCASHD_RPCUSER* et *ZCASHD_RPCPASSWORD* sont correctement définis

-> Vérifiez que vous utilisez le bon port (8232 pour le mainnet, 18232 pour le testnet)

-> N'oubliez pas que les ports sont mappés par Akash - utilisez l'URI de votre déploiement, pas directement 8232


## Gestion des coûts

Surveillez vos dépenses dans la Console :

-> **My Deployments** -> Votre déploiement -> affiche l'estimation "Cost per month"

-> Le solde de votre wallet Keplr diminuera au fil du temps


Lorsque votre solde devient faible, Akash fermera automatiquement votre déploiement. **Rechargez périodiquement votre wallet** ou configurez des alertes.

### Réduire les coûts

-> **Utilisez le testnet** pour des tests hors production (50 % moins cher)

-> **Réduisez CPU/mémoire** si vous n'avez pas besoin d'une synchronisation rapide

-> **Choisissez des fournisseurs moins chers** (pas toujours judicieux - la disponibilité compte)

-> **Utilisez USDC au lieu d'AKT** si le prix de l'AKT est volatil (nécessite une modification du prix dans le SDL)

-> **Désactivez txindex** si vous n'en avez pas besoin (économise ~ 20 % de stockage)


### Ressources supplémentaires

**Akash Console** : [https://console.akash.network](https://console.akash.network)

**Documentation Akash** : [https://akash.network/docs/](https://akash.network/docs/)

**Explorateurs Zcash** : [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord Akash** : [https://discord.akash.network](https://discord.akash.network) (pour les problèmes de fournisseur)

## Notes finales

- **Le stockage persistant est important.** N'ignorez pas *persistent: true* et n'utilisez pas la classe *beta2*. Utilisez *beta3*.
- **La synchronisation initiale est lente.** Soyez patient. C'est normal pour les nœuds blockchain.
- **Gardez votre wallet approvisionné.** Les déploiements se ferment automatiquement lorsque vous n'avez plus d'AKT.
- **Les sauvegardes ne sont pas automatiques.** Si les données vous importent, considérez qu'elles peuvent disparaître et planifiez en conséquence.
- **La sécurité RPC est critique.** N'exposez pas RPC à internet sans mesures de sécurité appropriées.
- **zcash-params est mis en cache.** Le premier lancement télécharge ~2GB de paramètres cryptographiques. C'est normal et cela ne se produit qu'une seule fois.
