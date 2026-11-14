# Comment exécuter Zebra sur Akash Network

Guide étape par étape pour déployer un nœud complet Zebra Zcash sur Akash.

### Ce que vous déployez

Un nœud Zebra complet qui va :

-> Synchroniser l'intégralité de la blockchain Zcash (plus de 100 Go pour le mainnet, environ 40 Go pour le testnet)

-> Coûter environ 15 $/mois selon le prix du jeton AKT

-> Prendre de plusieurs heures à plusieurs jours pour se synchroniser complètement

-> Utiliser 4 vCPU, 16 Go de RAM et 350 Go de stockage (mainnet) ou 2 vCPU, 8 Go de RAM et 50 Go (testnet)

Le modèle awesome-akash épingle désormais **Zebra 7.0.0** (jamais `:latest`). Il active en interne Prometheus (`9999`) et le contrôle de santé (`8080`), le JSON-RPC en interne pour un **lightwalletd** colocalisé sur le port gRPC **9067**, ainsi que les options de fonctionnalités `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

Pour un nœud Mainnet élagué plus rapide, consultez [Comment exécuter Zakura sur Akash](/guides/akash-network-zakura). Pour un tableau de bord Regtest jetable, consultez [Ainsi parlait Zakura sur Akash](/guides/thus-spoke-zakura-akash).


### Comment Akash publie les ports

Les numéros figurant dans le SDL (`port` / `as`) sont des **ports du conteneur**. Zebra écoute toujours sur le port **8233**, lightwalletd sur le **9067** et le contrôle de santé sur le **8080**. Ces numéros servent au processus et aux autres services du même déploiement (`zebra:8232`).

Ce ne sont **pas** les ports de l'adresse IP publique du fournisseur.

**Par défaut (ce modèle) :** aucune IP dédiée. Pour chaque exposition TCP `global: true`, le fournisseur associe un **port élevé aléatoire** sur un hôte partagé au port de votre conteneur. Une fois le bail actif, Console/Air affiche les véritables points d'accès dans **Leases → URIs**, par exemple :

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Les pairs et les portefeuilles utilisent **ces** valeurs hôte:port. Copiez l'URI de l'exposition qui vous intéresse (P2P ou lightwalletd). Si vous définissez `ZEBRA_NETWORK__EXTERNAL_ADDR`, renseignez l'URI P2P associée (`provider.example:31482`), et non `…:8233`.

**HTTP** (`as: 80` avec `http_options`, utilisé sur le tableau de bord Thus Spoke) : de nombreux fournisseurs publient un **nom d'hôte d'entrée** (souvent sur les ports 80/443) au lieu d'un port TCP aléatoire. Ouvrez l'URI de ce service dans un navigateur.

**Interne** (`global: false` ou `to: service: lightwalletd`) : DNS du cluster uniquement (`zebra:8232`). Aucune URI publique.

Les **IP dédiées** (`endpoints` / `kind: ip` dans le SDL) sont une **option payante supplémentaire**. Elles permettent de fixer une IP publique et parfois le port `as` sur cette IP. Ces modèles n'en demandent **pas**. Ajoutez-la vous-même plus tard si vous souhaitez un `host:8233` stable ; attendez-vous à un coût supplémentaire et à moins de fournisseurs qui enchérissent.

### Quel site utiliser (paiements)

Le SDL est identique. Les deux interfaces web d'Akash diffèrent par **la manière dont vous payez**.

| Site | Paiements | Portefeuille |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Paiement web classique (carte / moyens fiat proposés par Console) | Compte Console |
| [air.akash.network](https://air.akash.network) | Paiements natifs sur la chaîne Akash (AKT / ACT) | **Keplr** |

Utilisez **Air** si vous souhaitez payer on-chain avec Keplr. Utilisez **Console** si vous souhaitez un parcours de paiement web classique. Ne vous attendez pas à un règlement natif via Keplr sur Console.

### Prérequis

**Si vous payez sur Console (paiement web)**

1. Un compte Console sur [console.akash.network](https://console.akash.network)
2. Un moyen de paiement accepté par l'interface Console
3. Quelques minutes dans l'interface

**Si vous payez sur Air (natif Akash / Keplr)**

1. L'extension de navigateur **Keplr** (Chrome/Brave/Firefox)
2. Des **AKT / ACT** dans Keplr pour le dépôt et le bail (obtenus sur un exchange ou via IBC)
3. Ouvrez [air.akash.network](https://air.akash.network)

#### Étape 1 : se connecter

**Console (paiements web)**

-> Rendez-vous sur [https://console.akash.network](https://console.akash.network)

-> Connectez-vous / suivez la procédure de création du compte Console

-> Utilisez le paiement proposé par l'interface (et non Keplr on-chain)

**Air (paiements natifs Akash)**

-> Rendez-vous sur [https://air.akash.network](https://air.akash.network)

-> Cliquez sur **« Connect Wallet »**

-> Choisissez **Keplr** et approuvez la connexion

-> Vérifiez que votre solde AKT/ACT suffit pour le dépôt et le bail

#### Étape 2 : créer le déploiement

-> Cliquez sur **« Deploy »**

-> Choisissez **« Build your template »** (ou passez directement au téléversement du SDL)


##### Option A : téléverser le fichier SDL (recommandé)

**Paiements web (Console)**

[![Déployer sur Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Paiements natifs Akash avec Keplr (Air)**

[Ouvrir ce modèle sur Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Option B : utiliser l'éditeur SDL

Si vous souhaitez coller manuellement [le SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) :

-> Copiez le contenu de *zebra-akash.yml*

-> Collez-le dans l'éditeur SDL

-> Modifiez-le selon vos besoins (voir la section de configuration ci-dessous)

-> Cliquez sur **« Create Deployment »**


#### Étape 3 : vérifier et approuver le dépôt

L'interface vous affichera :

-> **Dépôt du déploiement** : environ 5 AKT (récupérés lorsque vous fermez le déploiement)

-> **Coût estimé** : calculé d'après la tarification de votre SDL

Sur **Air**, cliquez sur **« Approve »** et signez dans **Keplr**. Sur **Console**, effectuez le paiement web proposé par l'interface.

#### Étape 4 : choisir un fournisseur

Après environ 30 secondes, vous verrez les offres des fournisseurs. Chaque offre indique :

-> **Prix par bloc** (en AKT ou USDC)

-> **Coût mensuel estimé**

-> **Détails du fournisseur** (disponibilité, région, etc.)


**Ne choisissez pas simplement le moins cher.** Vérifiez :

-> Le taux de disponibilité (visez plus de 95 %)

-> La région (plus elle est proche de vous, meilleure est la latence, mais cela compte peu pour les nœuds blockchain)

-> Le statut d'audit (coche verte = plus digne de confiance)


Cliquez sur **« Accept Bid »** pour le fournisseur choisi. Sur Air, signez dans Keplr. Sur Console, confirmez via le parcours de paiement web.

#### Étape 5 : attendre le déploiement

Console va :

-> Créer le bail avec le fournisseur choisi

-> Envoyer le manifeste (qui indique au fournisseur ce qu'il doit exécuter)

-> Démarrer votre conteneur

Cela prend 1 à 2 minutes. Vous verrez les mises à jour de statut dans l'interface.

#### Étape 6 : vérifier qu'il fonctionne

Une fois le déploiement effectué, vous verrez :

-> L'onglet **Services** : affiche votre service *zebra* et son statut

-> L'onglet **Logs** : journaux du conteneur en direct

-> L'onglet **Leases** : détails de votre déploiement (DSEQ, fournisseur, coût)


##### Consulter les journaux

Cliquez sur **Logs** et vous devriez voir Zebra démarrer :

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

La synchronisation prendra **de quelques heures à plusieurs jours** selon le réseau. Surveillez :

-> L'augmentation de la hauteur des blocs

-> Les connexions aux pairs (entre 10 et 30 pairs)

-> L'absence d'erreurs répétées


#### Étape 7 : obtenir l'adresse de votre nœud

Cliquez sur l'onglet **Leases**, puis sur **URIs**.

Vous verrez quelque chose comme :

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Chaque ligne correspond à une exposition `global: true`. Le nom inclut le port `as` du SDL (8233, 9067). Le nombre après le nom d'hôte est le **port associé par le fournisseur**, attribué lors de la création du bail. Les autres nœuds Zcash se connectent à `provider-hostname.com:31482`. Les portefeuilles compacts utilisent l'URI lightwalletd (TLS désactivé, sauf si vous assurez vous-même la terminaison TLS).

Le conteneur écoute toujours sur les ports 8233 / 9067. L'adresse publique est toujours l'URI, sauf si vous ajoutez ultérieurement une IP dédiée (non incluse dans ce modèle).

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

-> **Modifiez le port exposé** dans la section *expose* :

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

-> **Facultatif : baissez la tarification** dans *profiles.placement.akash.pricing* :

   ```yaml
   amount: 5000  # Down from 10000
   ```

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

**Avertissement** : si vous définissez *global: true* pour le RPC, vous l'exposez à Internet. Zebra utilise par défaut une authentification par cookie, mais malgré tout, ne le faites pas à moins de savoir exactement ce que vous faites.

Si vous exposez le RPC avec `global: true`, l'adresse publique reste une **URI de bail** (`host:&lt;random-high-port&gt;`), et non `host:8232`. Avec `global: false` (ce modèle), le RPC reste sur le réseau du déploiement (`zebra:8232` pour lightwalletd). Les baux avec IP dédiée sont une option payante distincte et ne figurent pas dans le SDL.

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

#### Ajuster les ressources et la tarification

Si vous ne recevez pas d'offres ou souhaitez optimiser les coûts :

**Pour les fournisseurs aux configurations plus modestes**, réduisez dans la section *profiles.compute.zebra.resources* :

-> CPU : *units: 2* (minimum pour une vitesse de synchronisation raisonnable)

-> Mémoire : *size: 12Gi* (minimum pour la stabilité)

-> Stockage : *size: 120Gi* (minimum pour le mainnet)

**Pour attirer davantage d'offres**, augmentez dans *profiles.placement.akash.pricing* :

-> Mainnet : essayez *amount: 1000000* uakt/bloc

-> Testnet : essayez *amount: 1000000* uakt/bloc

### Mettre à jour votre déploiement

Vous devez modifier la configuration après le déploiement ?

-> Allez dans **My Deployments** dans Console

-> Trouvez votre déploiement Zebra

-> Cliquez sur **« Update Deployment »**

-> Modifiez le SDL

-> Cliquez sur **« Update »** (Air : signez dans Keplr ; Console : confirmez via le parcours de paiement web)

**Remarque** : la mise à jour redémarrera votre conteneur. Le nœud reprendra à partir de son état sauvegardé (stockage persistant), mais prévoyez 1 à 2 minutes d'interruption.

### Surveillance

#### Via Console

-> **Onglet Logs** : journaux du conteneur en direct

-> **Onglet Shell** : ouvrez un shell dans le conteneur (utile pour le débogage)

-> **Onglet Events** : événements Kubernetes (généralement inutiles, sauf en cas de panne)


#### Via RPC (si activé)

Si vous avez activé le RPC, vous pouvez interroger votre nœud comme n'importe quel nœud complet zebrad (parce que c'en est un !)

### Fermer votre déploiement

Lorsque vous avez terminé ou souhaitez cesser de payer :

-> Allez dans **My Deployments**

-> Trouvez votre déploiement Zebra

-> Cliquez sur **« Close Deployment »**

-> Confirmez (Air : signez dans Keplr ; Console : confirmez dans l'interface Console)

Votre dépôt de 5 AKT vous sera remboursé. Le **stockage persistant** devrait être conservé par le fournisseur, mais ne comptez pas dessus : traitez-le comme chez n'importe quel autre fournisseur cloud.

### Dépannage

#### Erreur « Insufficient funds »

Sur Air, approvisionnez Keplr en AKT/ACT. Sur Console, rechargez le moyen de paiement Console.

#### Aucune offre n'apparaît

Soit :

-> Votre tarification est trop basse (augmentez *amount* dans le SDL)

-> Vos besoins en ressources sont trop élevés pour les fournisseurs disponibles (réduisez CPU/mémoire/stockage)

-> Il faut attendre plus longtemps (les offres mettent parfois 60 à 90 secondes à apparaître)


#### Déploiement bloqué en « pending »

Le fournisseur rencontre peut-être des problèmes. Fermez le déploiement et essayez un autre fournisseur.

#### Les journaux de Zebra affichent « No peers connected »

C'est normal pendant les premières minutes. Zebra découvrira automatiquement des pairs. Si le problème persiste au-delà de 10 minutes, vous avez peut-être un problème réseau (peu probable sur Akash).

#### Erreurs « Out of memory » dans les journaux

Vous avez lésiné sur la RAM. Fermez le déploiement et redéployez avec au moins 12Gi de mémoire (16Gi recommandés).

#### La synchronisation n'en finit pas

Définissez « n'en finit pas » :

-> **Des heures** : normal

-> **Des jours** : également normal pour le mainnet en partant de zéro

-> **Des semaines** : quelque chose ne va pas, consultez les journaux pour repérer des erreurs


### Gestion des coûts

Surveillez vos dépenses dans Console ou Air :

-> **My Deployments** -> votre déploiement -> affiche l'estimation « Cost per month »

-> Air : votre solde AKT/ACT dans Keplr diminue au fil du temps. Console : votre solde de paiement Console diminue.


Lorsque votre solde devient trop bas, Akash ferme automatiquement votre déploiement. **Rechargez régulièrement votre portefeuille** ou configurez des alertes.

#### Réduire les coûts

-> **Utilisez le Testnet** pour les tests hors production (50 % moins cher)

-> **Réduisez CPU/mémoire** si vous n'avez pas besoin d'une synchronisation rapide

-> **Choisissez des fournisseurs moins chers** (pas toujours judicieux : la disponibilité compte)


### Mainnet ou Testnet

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

Commencez par le Testnet si vous testez simplement le processus de déploiement. Consultez la section « Passer au testnet » ci-dessus pour la configuration.

### Ressources supplémentaires

**Akash Console** (paiements web) : [https://console.akash.network](https://console.akash.network)

**Akash Air** (AKT/ACT natifs + Keplr) : [https://air.akash.network](https://air.akash.network)

**Documentation Akash** : [https://akash.network/docs/](https://akash.network/docs/)

**Documentation Zebra** : [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Explorateurs Zcash** : [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord Akash** : [https://discord.akash.network](https://discord.akash.network) (pour les problèmes liés aux fournisseurs)
