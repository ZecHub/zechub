# BTCPay Server avec prise en charge de Zcash : guide complet d’installation et d’intégration

BTCPay Server permet aux entreprises en ligne d’accepter directement des paiements en cryptomonnaie, sans intermédiaires ni dépositaires. Ce guide vous accompagne dans le processus complet de mise en place de BTCPay Server avec une prise en charge native des paiements blindés Zcash.

> Cette documentation se concentre sur l’intégration de Zcash dans votre instance BTCPay Server.  
> Elle prend en charge les configurations **nœud complet (Zebra)** et **basées sur lightwalletd**.

---

## Table des matières

- [Pourquoi utiliser BTCPay Server avec Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Comment fonctionne BTCPay Server](#How-BTCPay-Server-Works)
- [Où les fonds sont-ils stockés ? Qui contrôle les clés privées ?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Comment configurer BTCPay Server pour accepter Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Déployer BTCPay Server avec la prise en charge de Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Exécuter votre propre nœud complet Zcash (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Se connecter à un nœud lightwalletd externe (configuration personnalisée)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Héberger BTCPay Server chez soi avec Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Configurer le plugin Zcash dans l’interface web de BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Intégrer BTCPay Server à votre site web](#Integrating-BTCPay-Server-with-Your-Website)
  - [Intégration API](#API-Integration)
    - [Générer une clé API](#Generating-an-API-Key)
    - [Exemple : créer une facture via l’API](#Example-Creating-an-Invoice-via-API)
    - [Configurer un webhook](#Setting-Up-a-Webhook-Optional)
  - [Intégration CMS](#CMS-Integration)
  - [Bouton de paiement ou Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Conclusion](#Conclusion)
- [Ressources](#Resources)


---

## Pourquoi utiliser BTCPay Server avec Zcash

Le commerce en ligne accepte de plus en plus les cryptomonnaies. C’est rapide, mondial, et fonctionne sans banques. Cela profite à la fois aux commerçants et aux clients. Mais il y a un détail important que beaucoup négligent.

Lorsqu’un client passe une commande, il fournit généralement des informations personnelles : nom, adresse de livraison et numéro de téléphone. Si le paiement est effectué à l’aide d’une blockchain publique - comme Bitcoin, Ethereum ou des stablecoins sur Ethereum ou Tron - la transaction devient visible de façon permanente pour analyse.

N’importe qui, même sans savoir ce qui a été commandé, peut :

- voir quand et combien a été payé  
- retracer d’où viennent les fonds et où ils vont  
- relier une adresse de cryptomonnaie à une personne réelle s’il existe un point de corrélation (par exemple, un e-mail divulgué ou un nom de livraison)

Cela signifie qu’un seul achat peut révéler tout l’historique financier d’un client.

Et cela fonctionne aussi dans l’autre sens. Si l’adresse d’un commerçant est déjà apparue on-chain, il devient exposé. Des concurrents et des observateurs tiers peuvent suivre les volumes de paiement, l’activité des fournisseurs et la structure des flux commerciaux.

### La combinaison de BTCPay Server et Zcash peut résoudre ce problème.


BTCPay Server est un système gratuit et décentralisé pour recevoir des paiements en cryptomonnaie.  
Ce n’est pas un intermédiaire de paiement et il ne détient aucun fonds. Tous les paiements vont directement vers le portefeuille du commerçant.  
Il peut s’agir d’un portefeuille personnel ou d’une configuration multisig au sein d’une organisation.

Le serveur gère les tâches de coordination :

- génère une adresse unique pour chaque commande  
- suit la réception du paiement et le relie à la commande  
- émet des reçus et des notifications  
- fournit une interface de paiement pour le client  

Tout fonctionne sous le contrôle du propriétaire de la boutique, sans dépendre de services tiers.

Zcash est une cryptomonnaie fondée sur les preuves à divulgation nulle de connaissance. Elle prend en charge un modèle de transaction entièrement privé.  
Lors de l’utilisation d’adresses blindées (ci-après simplement appelées « adresses »), l’expéditeur, le destinataire et le montant de la transaction ne sont pas révélés sur la blockchain.

Pour les boutiques en ligne, cela signifie :

- L’acheteur peut effectuer le paiement sans révéler son historique financier  
- Le vendeur reçoit le paiement sans exposer son adresse, son volume de ventes ou la structure de ses transactions  
- Aucun observateur externe ne peut relier le paiement à la commande ni aux données du client

### Exemple pratique

Un utilisateur passe une commande et choisit Bitcoin ou USDT comme moyen de paiement.  
Le site web génère une adresse de paiement et affiche le montant.  
Une fois le paiement effectué, cette adresse est stockée sur la blockchain et devient publique.  
Il suffit à un attaquant de relier une seule commande à l’adresse pour obtenir une visibilité à long terme sur tout son historique de transactions.

Imaginez maintenant la même situation avec Zcash.  
BTCPay Server génère une adresse blindée. L’acheteur envoie le paiement.  
Du point de vue de la blockchain, rien ne se passe. Il n’existe aucune donnée publique à analyser.  
Le serveur reçoit la confirmation, la relie à la commande et termine le processus.

Pour toute personne extérieure, cela ressemble à un non-événement.  
Toute la logique reste entre la boutique et le client - comme cela devrait être.

Cette solution ne compromet ni l’automatisation ni l’utilisabilité.  
Tout fonctionne comme avec les autres cryptomonnaies, simplement sans le risque de fuite de données.



## Comment fonctionne BTCPay Server

BTCPay Server agit comme un pont de traitement des paiements entre votre plateforme e-commerce et la blockchain. Voici comment fonctionne le flux :

1. **Le client passe une commande** sur votre site web (par ex. WooCommerce, Magento, ou toute plateforme avec intégration BTCPay).

2. **La boutique demande une facture de paiement** à BTCPay Server. Le serveur génère une facture unique avec :
   - Le montant de la commande
   - Un compte à rebours
   - Une Zcash Unified Address (UA) - par ex., `u1...` - qui inclut par défaut un récepteur Orchard (blindé).

3. **Le client voit la page de paiement** et envoie des ZEC à l’adresse fournie.

4. **BTCPay Server surveille la blockchain**, en vérifiant le paiement par rapport à :
   - Le montant attendu
   - L’adresse de réception
   - L’horodatage de la facture

5. **Une fois la transaction détectée et confirmée**, BTCPay notifie la boutique.

6. **Le client reçoit une confirmation de paiement.** En option, le serveur peut envoyer un reçu par e-mail.

Tout ce processus se déroule **automatiquement**, sans intermédiaires ni dépositaires.  
BTCPay Server **ne détient aucun fonds** - il relie simplement le système de commande à la blockchain de manière sécurisée et privée.
## Où les fonds sont-ils stockés ? Qui contrôle les clés privées ?

BTCPay Server **n’est pas** un portefeuille et **ne nécessite pas de clés privées**.  
Tous les fonds vont **directement** vers le portefeuille du commerçant. La sécurité est assurée par l’utilisation d’une **architecture basée sur les clés de visualisation**.

### Comment cela fonctionne

- **Le portefeuille est créé à l’avance.**  
  Le commerçant utilise un portefeuille Zcash qui prend en charge les Viewing Key - comme [YWallet](https://ywallet.app/installation) ou [Zingo! Wallet](https://zingolabs.org/).  
  Une liste complète est disponible sur [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server se connecte via une Viewing Key.**  
  Une Viewing Key est une **clé en lecture seule** : elle peut détecter les paiements entrants et générer de nouvelles adresses de réception,  
  mais elle ne peut pas dépenser les fonds. Le serveur ne stocke ni phrases de récupération ni clés privées.

- **Les données blockchain sont accessibles via un serveur `lightwalletd`.**  
  Vous pouvez utiliser un nœud public comme `https://zec.rocks`, ou exécuter votre propre pile `Zebra + lightwalletd` pour une souveraineté totale.

- **Chaque commande reçoit une adresse unique.**  
  Les Viewing Key permettent au serveur de dériver de nouvelles adresses blindées Zcash pour chaque facture,  
  ce qui permet un suivi sécurisé des paiements et empêche la réutilisation d’adresses.

- **Vous conservez le contrôle total des fonds.**  
  Même si le serveur est compromis, personne ne peut voler votre argent - seules les métadonnées de paiement pourraient être exposées.

Cette conception sépare **l’infrastructure** du **contrôle des actifs**.  
Vous pouvez mettre à jour, migrer ou réinstaller BTCPay Server sans mettre aucun fonds en danger.

## Comment configurer BTCPay Server pour accepter Zcash

Dans les sections précédentes, nous avons expliqué comment BTCPay Server fonctionne avec Zcash et pourquoi c’est important pour les paiements respectueux de la vie privée. Il est maintenant temps de passer à la pratique.

Votre configuration exacte dépendra de plusieurs facteurs :

- Avez-vous déjà une instance BTCPay Server ?
- Voulez-vous utiliser un lightwalletd public ou exécuter votre propre nœud complet ?
- Le serveur fonctionnera-t-il sur un VPS ou à domicile ?

Ce chapitre couvre tous les scénarios de configuration actuels - des configurations minimales aux déploiements entièrement souverains.

Nous passerons en revue les points suivants :

- Comment tout déployer depuis zéro sur un VPS, y compris le nœud complet (Zebra)
- Comment exécuter BTCPay Server à domicile tout en gardant votre IP masquée grâce à **Cloudflare Tunnel**
- Comment activer et configurer la prise en charge de Zcash dans l’interface web de BTCPay Server
- Comment intégrer BTCPay à votre site web ou boutique en ligne


## Déployer BTCPay Server avec la prise en charge de Zcash

Passons maintenant à la configuration proprement dite. Dans cette section, nous allons installer BTCPay Server avec la prise en charge de Zcash - soit sur un VPS neuf, soit en ajoutant la prise en charge de ZEC à une instance existante.

Si vous avez déjà BTCPay Server en fonctionnement (par ex. pour BTC ou Lightning), vous n’avez pas besoin de tout réinstaller - il suffit d’activer le plugin ZEC.

Nous passerons en revue diverses configurations, depuis les configurations minimales utilisant un nœud public `lightwalletd` jusqu’aux installations entièrement souveraines avec votre propre nœud complet.  
La meilleure option dépend de l’emplacement de votre serveur et du degré d’indépendance que vous souhaitez avoir vis-à-vis d’une infrastructure externe.

> Documentation officielle du plugin :  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Avertissement - un portefeuille par instance :**  
> Le plugin Zcash utilise **un portefeuille partagé** pour **toutes les boutiques** de l’instance BTCPay.  
> Si vous hébergez plusieurs boutiques indépendantes sur une seule instance, elles partageront le même portefeuille Zcash.  
> Utilisez des instances séparées si vous avez besoin d’une isolation stricte des portefeuilles.

---

### Configuration VPS recommandée

Avant l’installation, assurez-vous d’avoir :

- Un VPS avec **Ubuntu 22.04+**
- Un nom de domaine pointant vers l’adresse IP de votre serveur (via DNS)
- `git`, `docker` et `docker-compose` installés
- Un accès SSH au serveur

---

## Préparer votre serveur (partie masquée)

<details>
  <summary>Cliquez pour développer</summary>

Pour déployer BTCPay Server avec la prise en charge de Zcash, vous aurez besoin des éléments suivants :

### 1. VPS avec Ubuntu 22.04 ou plus récent

Nous recommandons d’utiliser une installation minimale de **Ubuntu Server 22.04 LTS**.  
Tout fournisseur de VPS proposant une adresse IP dédiée conviendra.  

**Exigences minimales** :  
- 2 cœurs CPU  
- 4 GB de RAM  
- 40 GB d’espace disque  

Cette configuration est suffisante si vous utilisez lightwalletd pour Zcash.  
Si vous prévoyez d’exécuter un **nœud complet Zcash**, vous aurez besoin d’**au moins 300 GB** d’espace disque libre.

---

### 2. Nom de domaine pointant vers votre serveur

Dans le tableau de bord de votre fournisseur DNS, créez un enregistrement `A` pour un sous-domaine  
(par ex. `btcpay.example.com`) pointant vers l’adresse IP de votre VPS.  

Ce domaine sera utilisé pour accéder à BTCPay Server depuis le navigateur  
et pour générer automatiquement un **certificat SSL gratuit** via Let’s Encrypt.

---

### 3. Accès SSH au serveur

Pour installer BTCPay Server, vous devez vous connecter à votre VPS via SSH.  
Depuis votre terminal, exécutez :

`ssh root@YOUR_SERVER_IP`

Si vous utilisez macOS, Linux ou WSL sur Windows, SSH est déjà disponible dans le terminal.
Sur Windows standard, utilisez un client SSH comme **PuTTY**.

---

### 4. Installer Git, Docker et Docker Compose

Une fois connecté via SSH, mettez à jour les paquets système et installez les composants requis :

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Sur Ubuntu 22.04 et versions ultérieures, `docker-compose` depuis APT est obsolète.
> Le paquet recommandé est `docker-compose-plugin`, qui fournit la commande `docker compose` (notez l’espace au lieu d’un tiret).

Votre environnement serveur est maintenant prêt pour l’installation de BTCPay Server.

</details>

---

### Étape 1 : cloner le dépôt

Créez un répertoire de travail et téléchargez le déploiement Docker de BTCPay Server :

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Étape 2 : exporter les variables d’environnement

Remplacez `btcpay.example.com` par votre véritable domaine :

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Si vous prévoyez d’ajouter Monero ou Litecoin plus tard, vous pouvez les inclure dès maintenant :

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Vous pouvez ajouter de nouvelles monnaies à tout moment en exportant les variables appropriées et en relançant le script de configuration :

`. ./btcpay-setup.sh -i`

Pour ce guide, nous nous concentrerons sur **Zcash uniquement**.

---

### Étape 3 : lancer l’installateur

Exécutez le script de configuration pour construire et lancer le serveur :

`. ./btcpay-setup.sh -i`

Le script installera les dépendances, générera le `docker-compose.yml`, démarrera les services et configurera `systemd`.
Cela prend environ 5 minutes.

Une fois terminé, votre instance BTCPay Server sera disponible à l’adresse :

`https://btcpay.example.com`

> Si vous modifiez une installation existante (par ex. en ajoutant ZEC), veillez à arrêter puis redémarrer le serveur avec les nouveaux paramètres :

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Passez ensuite à la section suivante pour configurer Zcash dans l’interface web de BTCPay Server.



## Exécuter votre propre nœud complet Zcash

Si vous préférez **ne pas** dépendre de nœuds publics `lightwalletd`, vous pouvez déployer votre propre nœud complet Zcash ainsi que Lightwalletd sur le même serveur.  
Cela vous donne une **autonomie totale** - aucune dépendance externe, aucune confiance requise.

---

### Étape 1 : s’assurer de disposer d’un espace disque suffisant

Un nœud complet Zcash (Zebra + Lightwalletd) nécessite actuellement **plus de 300 GB** d’espace disque, et cela continue d’augmenter.

Répartition :

- La base de données blockchain de Zebra : ~260-270 GB
- L’indexation de Lightwalletd : ~15-20 GB

#### Stockage recommandé :

- **400 GB+** si le serveur est utilisé **uniquement** pour les paiements Zcash
- **800 GB+** si le serveur exécute également BTCPay Server, PostgreSQL, Nginx, etc.

> Idéalement, utilisez un disque SSD/NVMe d’**une capacité de 1 TB**, surtout si vous ne prévoyez pas d’élaguer les données régulièrement.

---

### Étape 2 : définir les variables d’environnement

Ajoutez ce qui suit à votre configuration d’environnement pour activer la configuration nœud complet :

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Cela inclura le fragment `zcash-fullnode`, qui lance à la fois `zebrad` et `lightwalletd` dans BTCPay Server.

---

### Étape 3 : relancer l’installateur

`. ./btcpay-setup.sh -i`

Le script va :

* Télécharger les images Docker de Zebra et Lightwalletd
* Configurer les services dans la pile BTCPay
* Relier le plugin Zcash à l’instance **locale** de `lightwalletd`

> **La synchronisation complète de la blockchain peut prendre plusieurs jours**, surtout sur les VPS peu puissants.
> Tant que la synchronisation n’est pas terminée, les paiements blindés ne seront pas disponibles.


## Se connecter à un nœud Lightwalletd externe

Dans la plupart des cas, une autonomie totale n’est pas nécessaire - et les commerçants ne souhaitent pas forcément consacrer du temps et de l’espace disque à l’exécution d’un nœud complet Zcash.  
Par défaut, BTCPay Server se connecte à un nœud public `lightwalletd` pour gérer les paiements blindés sans télécharger l’intégralité de la blockchain.

Le point d’accès par défaut est :

`https://zec.rocks:443`

Cependant, vous pouvez configurer BTCPay Server pour qu’il se connecte à **n’importe quel nœud externe `lightwalletd`**, tel que :

`https://lightwalletd.example:443`

Cette section montre comment procéder à l’aide d’un **fragment Docker personnalisé**.

> Un exemple de configuration complet avec toutes les variables d’environnement est disponible dans le [dépôt du plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Les étapes ci-dessous montrent une configuration minimale fonctionnelle.

---

### Étape 1 : créer un fragment Docker personnalisé

Dans votre répertoire de projet BTCPayServer, créez un fichier de fragment personnalisé :

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Ajoutez le contenu suivant :

```
exclusive:
- zcash
```

La directive `exclusive` garantit qu’un seul fragment portant le même label (`zcash` dans ce cas) peut être actif à la fois.
Cela évite les conflits de configuration - par exemple, vous ne pouvez pas exécuter simultanément le fragment `zcash-fullnode` et ce fragment externe personnalisé `lightwalletd`.
En le marquant comme `exclusive: zcash`, BTCPay Server désactivera automatiquement les conteneurs par défaut `zcash-fullnode` et `lightwalletd` internes, ce qui vous permettra de vous connecter à votre propre nœud externe à la place.

---

### Étape 2 : définir les variables d’environnement

Dans le terminal :

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Étape 3 : définir l’adresse du nœud externe

Ouvrez votre fichier `.env` :

`nano .env`

Ajoutez la ligne suivante en remplaçant l’URL par le point d’accès de votre choix :

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Vous pouvez utiliser :

* Un **nœud public**, tel que `https://lightwalletd.zcash-infra.com`
* Votre propre nœud auto-hébergé, déployé séparément de BTCPay Server

> Si le `lightwalletd` externe devient indisponible ou surchargé, les paiements blindés échoueront.
> Pour les services critiques, choisissez un **point d’accès stable et éprouvé** (comme le `zec.rocks` par défaut).

> Vous voulez auto-héberger `lightwalletd` ?
> Vous pouvez utiliser le fichier `docker-compose.lwd.yml` du [dépôt Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Avertissement :** cette configuration n’est pas officiellement documentée et nécessite une configuration manuelle de TLS, de redirection de ports et du pare-feu - recommandée uniquement pour les utilisateurs avancés.

---

### Étape 4 : relancer l’installateur

`. ./btcpay-setup.sh -i`

BTCPay Server appliquera votre configuration personnalisée et se connectera au nœud `lightwalletd` spécifié.

À partir de maintenant, le plugin Zcash utilisera ce point d’accès externe pour gérer les transactions blindées.


## Héberger BTCPay Server chez soi avec Cloudflare Tunnel

Vous souhaitez accepter des paiements Zcash tout en hébergeant BTCPay Server sur un appareil domestique - comme un Raspberry Pi 5 ou tout serveur local **sans IP statique** ?  
Vous pouvez exposer en toute sécurité votre instance sur internet en utilisant **Cloudflare Tunnel**.

Cette méthode évite la redirection de ports et masque votre véritable adresse IP au public - tout en gardant votre serveur accessible en HTTPS.

Elle vous aide également à **éviter le coût de location d’un VPS**, ce qui est idéal si les paiements en cryptomonnaie sont une fonctionnalité optionnelle plutôt que le cœur de votre activité.

---

### Étape 1 : installer Cloudflare Tunnel

1. Créez un compte sur [cloudflare.com](https://www.cloudflare.com) et ajoutez votre domaine.
2. Sur votre **serveur domestique**, installez Cloudflare Tunnel :

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Authentifiez-vous auprès de Cloudflare :

`cloudflared tunnel login`

Cette commande ouvrira une fenêtre de navigateur. Connectez-vous et autorisez l’accès à votre domaine.
Cloudflare créera automatiquement un fichier `credentials` contenant un jeton sur votre serveur.

4. Créez un nouveau tunnel (vous pouvez le nommer `btcpay` ou autrement) :

`cloudflared tunnel create btcpay`

Cela génère un fichier `btcpay.json` contenant l’ID du tunnel et les identifiants - vous en aurez besoin à l’étape suivante.

---

### Étape 2 : créer le fichier de configuration du tunnel

Créez le répertoire de configuration (s’il n’existe pas) et ouvrez le fichier de configuration :

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Collez la configuration suivante :

```
tunnel: btcpay    # nom de votre tunnel
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # votre domaine
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Explication :

* `tunnel` - nom du tunnel que vous avez créé précédemment
* `credentials-file` - chemin du fichier de jeton généré pendant `cloudflared tunnel login`
* `hostname` - votre domaine enregistré chez Cloudflare (par ex. `btcpay.example.com`)
* `service` - adresse locale de votre BTCPay Server (généralement `http://127.0.0.1:80` pour Nginx)

> Cloudflare proxifiera le trafic en toute sécurité vers votre serveur local, sans exposer votre IP domestique.


### Étape 3 : ajouter un enregistrement DNS pour votre tunnel

Après la création du tunnel, Cloudflare ajoutera généralement **automatiquement un enregistrement DNS CNAME** pour votre domaine. Il devrait ressembler à ceci :

`btcpay.example.com -> <UUID>.cfargotunnel.com`

S’il n’apparaît pas automatiquement, ajoutez-le manuellement :

1. Accédez à votre [tableau de bord Cloudflare](https://dash.cloudflare.com/)
2. Ouvrez la section **DNS**
3. Ajoutez un nouvel enregistrement CNAME :
   - **Nom** : `btcpay`
   - **Cible** : `<UUID>.cfargotunnel.com`  
     Vous pouvez trouver la valeur exacte dans votre fichier `btcpay.json` ou en exécutant :
     
     `cloudflared tunnel list`
     
   - **Statut du proxy** : activé (nuage orange)

> Cet enregistrement garantit que toutes les requêtes vers `btcpay.example.com` sont acheminées via le Cloudflare Tunnel, en masquant votre véritable adresse IP au public.

---

### Étape 4 : activer le tunnel au démarrage du système

Pour que le tunnel s’exécute automatiquement au démarrage, installez-le comme service système :

`sudo cloudflared service install`

Activez ensuite et démarrez le service :

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Vérifiez l’état :

`sudo systemctl status cloudflared`

Vous devriez voir un message comme `Active: active (running)` et une confirmation que `btcpay.example.com` est en ligne.

> À partir de maintenant, le tunnel démarrera automatiquement à chaque redémarrage, et votre BTCPay Server sera accessible publiquement - sans redirection de ports et sans exposer votre véritable adresse IP.

---

### Étape 5 : finaliser la configuration de BTCPay Server

Si vous êtes sur le point d’installer BTCPay Server pour la première fois, définissez votre domaine avant d’exécuter le script de configuration :

`export BTCPAY_HOST="btcpay.example.com"`

Cela garantit que le bon domaine est utilisé lors de la génération de la **configuration Nginx** et des **certificats SSL**.

Si BTCPay Server est déjà installé et que vous ajoutez simplement le tunnel :

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

La configuration régénérera les paramètres et appliquera le nouveau domaine.
Vous devriez maintenant pouvoir accéder à votre serveur à l’adresse :

`https://btcpay.example.com`

> Que vous utilisiez un `lightwalletd` public ou votre propre nœud complet, cela n’a aucun effet sur le tunnel.
> Tout ce qui compte, c’est que BTCPay Server écoute localement sur `127.0.0.1:80`.


## Configurer le plugin Zcash dans l’interface web de BTCPay Server

> **Important pour les configurations multi-boutiques :**  
> Le portefeuille Zcash configuré ici est **global** à l’instance. Toutes les boutiques utiliseront ce portefeuille, sauf si vous exécutez des instances BTCPay séparées.

Après avoir déployé avec succès votre instance BTCPay Server, vous devrez effectuer une configuration de base via l’interface web d’administration.  
La documentation officielle fournit des instructions complètes en anglais - ici, nous allons parcourir les étapes essentielles en nous concentrant spécifiquement sur la configuration du plugin Zcash.

---

### Étape 1 : se connecter à l’interface web

Visitez votre instance à l’adresse :

`[https://btcpay.example.com](https://btcpay.example.com)`

- Saisissez votre identifiant administrateur et votre mot de passe.
- S’il s’agit de votre première connexion, vous serez invité à créer un compte.
- Le premier compte que vous enregistrez se verra automatiquement attribuer les privilèges d’administrateur.

---

### Étape 2 : installer le plugin Zcash

1. Dans le menu principal, allez à :

`Plugins -> Browse Plugins`

2. Localisez le plugin **Zcash (ZEC)**. Utilisez la barre de recherche si nécessaire.
3. Cliquez sur **Install** et confirmez.

> Répétez ce processus pour toutes les autres altcoins que vous avez activées pendant la configuration du serveur.

Après l’installation, cliquez sur **Restart Server** pour recharger l’interface avec les plugins actifs.


### Étape 3 : connecter votre portefeuille via Viewing Key

Après avoir installé le plugin, une nouvelle section **Zcash** apparaîtra dans le menu des paramètres.

1. Allez à :

`Zcash -> Settings`

2. Collez votre **Unified Full Viewing Key (UFVK)** - BTCPay dérivera une Unified Address pour chaque facture et détectera les paiements blindés entrants.

> **Remarque :** les Viewing Key Sapling héritées sont prises en charge, mais pour utiliser Orchard/Unified Address, vous devez fournir une **UFVK**.


   Format d’exemple :

`uview184syv9wftwngkay8d...`

3. Saisissez une valeur dans le champ de hauteur de bloc

* **Configuration initiale avec un nouveau portefeuille (nouvelle phrase de récupération) :** saisissez la hauteur de bloc Zcash actuelle (vous pouvez la vérifier sur 3xpl.com/zcash) - cela accélère l’analyse initiale.
* **Migration sur le même serveur depuis une ancienne configuration Sapling uniquement vers Unified Address / Orchard :** laissez ce champ vide.
* **Déplacement de votre boutique vers un nouveau serveur avec le même portefeuille/UFVK :** vous pouvez éventuellement saisir la hauteur de naissance - une hauteur approximative correspondant à la première commande payée de votre boutique (faites correspondre la date de la commande sur 3xpl pour réduire le périmètre de l’analyse). En cas de doute, laissez ce champ vide.

> Tous les portefeuilles ne prennent pas encore en charge l’export de **Unified Full Viewing Key (UFVK)**.  
> Options recommandées :  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet (version pour PC)**](https://zingolabs.org/)  
> Dans les deux applications, recherchez l’export UFVK dans la section sauvegarde/export.

Ces clés prennent en charge la **rotation automatique des adresses**, ce qui signifie :
- Chaque client reçoit une adresse de paiement **unique**
- Vous voyez un solde **unique et unifié**

Vous trouverez une liste de compatibilité plus large sur [ZecHub -> Wallets](https://zechub.wiki/wallets).

Une fois tous les champs remplis, cliquez sur **Save**.

---

### Testez votre flux de paiement ZEC

Félicitations - votre portefeuille Zcash est maintenant connecté à BTCPay Server.

Faisons un test :

1. Allez à :

`Invoices -> Create New`

2. Générez une facture de test pour un petit montant en ZEC.
3. Envoyez des fonds depuis **un autre portefeuille** (pas celui connecté à BTCPay).
4. Une fois la transaction détectée, la page de la facture affichera une animation de célébration.
5. Confirmez que le statut de la facture passe à **Paid**.

Si tout fonctionne - vous êtes prêt à intégrer les paiements ZEC à votre site web à l’aide de l’API ou des plugins CMS.



## Intégrer BTCPay Server à votre site web

Une fois votre portefeuille Zcash connecté à BTCPay Server, vous pouvez intégrer le système de paiement à votre site web.  
Il existe plusieurs façons de le faire - de l’accès direct à l’API aux plugins prêts à l’emploi pour les plateformes CMS populaires.

---

### Options d’intégration

- **Intégration API**  
  Idéale pour les sites web personnalisés ou les systèmes sans CMS.  
  Elle vous donne un contrôle total sur la création de factures, le suivi des paiements et les notifications - le tout dans votre propre interface et logique.  
  Elle nécessite des connaissances de base en programmation, cette tâche est donc mieux prise en charge par votre développeur.

- **Plugins CMS**  
  Disponibles pour des plateformes comme **WooCommerce**, **PrestaShop**, et d’autres.  
  Ces plugins vous permettent d’accepter des paiements en quelques minutes - sans écrire de code.

- **Bouton de paiement ou Iframe**  
  La méthode la plus simple.  
  Parfaite pour les pages d’atterrissage, les sites personnels ou tout site où vous souhaitez simplement intégrer un lien de don ou un widget de paiement.

---

### Intégration API

Si vous utilisez une plateforme personnalisée (ou aucun CMS), l’API est la meilleure option.  
Elle vous offre une flexibilité totale : vous pouvez créer des factures, suivre leur statut, recevoir des notifications et contrôler entièrement l’expérience utilisateur.

> Remarque : même certains plugins CMS utilisent l’API en arrière-plan, la création d’une clé API est donc souvent la **première étape requise**, quelle que soit votre méthode d’intégration.

Étape suivante : générez une clé API pour votre boutique et commencez à utiliser la [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) pour construire votre intégration.


### Générer une clé API

Pour intégrer BTCPay Server à votre site web ou application, vous devrez générer une clé API.

1. Connectez-vous à BTCPay Server et ouvrez le **menu utilisateur** (coin supérieur droit)
2. Allez dans **API Keys**
3. Cliquez sur **Create a new API key**
4. Saisissez un nom pour votre clé
5. Dans la section **Permissions**, activez :
   - `Can create invoice`
   - `Can view invoice`
   - *(Facultatif)* `Can modify store settings` - uniquement si vous avez besoin de gérer la boutique au niveau des paramètres

6. Cliquez sur **Generate**. Votre clé API personnelle s’affichera - copiez-la et stockez-la en lieu sûr.

> Cette clé donne accès aux factures de votre boutique.  
> Ne la partagez **pas** publiquement et ne l’exposez pas dans du code côté client.

---

### Exemple : créer une facture via l’API

**Point d’accès :**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Corps de la requête :**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Réponse :**

Vous recevrez un objet JSON contenant :

* `invoiceId`
* Une URL de paiement que vous pouvez intégrer à votre site web ou envoyer au client

Voir la documentation complète :
[Greenfield API – Créer une facture](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Configurer un webhook (facultatif)

Pour recevoir des notifications en temps réel lorsque les statuts des factures changent (par ex. lorsqu’un paiement est reçu) :

1. Allez dans les paramètres de votre boutique -> **Webhooks**
2. Ajoutez l’URL de votre point d’accès backend qui gérera les requêtes `POST` de BTCPay Server
3. BTCPay enverra automatiquement des notifications lorsqu’une facture est payée ou expire

Les charges utiles des webhooks et la logique de nouvelle tentative sont décrites dans la [documentation officielle des webhooks](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Des intégrations d’exemple sont disponibles pour différents langages de programmation dans la documentation BTCPay et les dépôts GitHub.



### Intégration CMS

BTCPay Server prend en charge des plugins pour les systèmes de gestion de contenu (CMS) populaires.  
L’intégration la plus mature et la plus largement utilisée se fait avec **WordPress + WooCommerce**, ce qui facilite l’acceptation de paiements en ZEC **sans écrire de code**.

---

#### WooCommerce (WordPress)

BTCPay Server prend officiellement en charge un plugin pour WooCommerce.

Étapes pour l’intégration :

1. Installez le plugin **BTCPay for WooCommerce** depuis le répertoire des plugins WordPress ou depuis GitHub.
2. Dans votre panneau d’administration WordPress, allez à :

`WooCommerce -> Settings -> Payments`

3. Trouvez **BTCPay** dans la liste et cliquez sur **Set up**
4. Saisissez l’URL de votre BTCPay Server et suivez les instructions d’autorisation  
   (la génération automatique de clé API est recommandée)
5. Activez le moyen de paiement et enregistrez vos paramètres

> Des instructions détaillées, des tutoriels vidéo et des guides de dépannage sont disponibles dans la documentation du plugin.

Vous trouverez également d’autres options d’intégration CMS dans cette même section de la documentation BTCPay.

---

### Bouton de paiement ou Iframe (sans CMS ni API)

Si vous n’utilisez pas de CMS et ne souhaitez pas travailler avec des API, le moyen le plus simple d’accepter des paiements ZEC consiste à **intégrer directement un lien ou un widget de paiement** sur votre site web.

Cette méthode est idéale pour :

- Les pages d’atterrissage
- Les sites portfolio
- Les blogs ou pages statiques
- Les projets sans serveur backend

---

#### Option 1 : bouton de paiement (lien)

1. Dans BTCPay Server, créez manuellement une facture dans la section **Invoices**
2. Copiez le lien de paiement, par ex. :

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Ajoutez le lien à votre HTML :

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Option 2 : facture intégrée (Iframe)

Pour afficher la facture directement sur votre site, utilisez une iframe :

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Vous pouvez styliser le bouton ou le conteneur de l’iframe pour qu’ils correspondent au design de votre site - BTCPay Server permet une personnalisation flexible du thème de la page de facture.

## Conclusion

Ce guide était long - mais il ne couvre que les aspects fondamentaux de l’intégration des paiements Zcash avec BTCPay Server.

L’interface BTCPay Server offre bien plus de fonctionnalités que ce que nous avons montré ici. Heureusement, l’interface est disponible en plusieurs langues (y compris le russe), ce qui facilite l’exploration et l’expérimentation.

BTCPay est un outil extrêmement flexible. Vous pouvez :

* Héberger plusieurs boutiques indépendantes sur une seule instance
* Définir des rôles et permissions personnalisés pour les membres de votre équipe - de la consultation seule des commandes à l’administration complète
* Utiliser vos propres domaines et votre propre image de marque
* Configurer des webhooks, des portefeuilles de secours et même un accès Tor
* Configurer des paramètres avancés tels que les règles fiscales, les codes de réduction, la personnalisation de la page de paiement, les restrictions de moyens de paiement, et plus encore

BTCPay a été conçu comme une alternative open source aux fournisseurs de paiement centralisés. Si vous cherchez à accepter des paiements privés en ZEC sans intermédiaires, cette plateforme mérite absolument votre attention.

Nous vous souhaitons plein de succès dans l’exploration de l’écosystème BTCPay et dans la reprise du contrôle total de vos paiements.

## Ressources

* [Site officiel de BTCPay Server](https://btcpayserver.org/)
* [FAQ BTCPay](https://docs.btcpayserver.org/FAQ/)
* [Dépôt GitHub de BTCPay Server](https://github.com/btcpayserver/btcpayserver)
* [Démo Mainnet de BTCPay Server](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Plugin Zcash pour BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Guide d’installation du plugin Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Exemple personnalisé zcash-lightwalletd.custom.yml](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Fichier Docker Compose Lightwalletd (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Documentation des clés API BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Créer un Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Liste de compatibilité des portefeuilles Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd sur Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
