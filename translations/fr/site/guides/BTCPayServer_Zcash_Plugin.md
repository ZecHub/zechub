# BTCPay Server avec prise en charge de Zcash : guide complet d'installation et d'intégration

BTCPay Server permet aux entreprises en ligne d'accepter directement des paiements en cryptomonnaie, sans intermédiaires ni dépositaires. Ce guide vous accompagne pas à pas dans la configuration complète de BTCPay Server avec la prise en charge native des paiements protégés en Zcash.

> Cette documentation porte sur l'intégration de Zcash dans votre instance BTCPay Server.  
> Elle prend en charge à la fois les **configurations avec nœud complet (Zebra)** et les **configurations basées sur lightwalletd**.

---

## Table des matières

- [Pourquoi utiliser BTCPay Server avec Zcash](#why-use-btcpay-server-with-zcash)
- [Comment fonctionne BTCPay Server](#how-btcpay-server-works)
- [Où sont stockés les fonds ? Qui contrôle les clés privées ?](#where-are-funds-stored-who-controls-the-private-keys)
- [Comment configurer BTCPay Server pour accepter Zcash](#how-to-set-up-btcpay-server-for-accepting-zcash)
  - [Déployer BTCPay Server avec la prise en charge de Zcash](#deploying-btcpay-server-with-zcash-support)
  - [Exécuter votre propre nœud complet Zcash (Zebra + lightwalletd)](#running-your-own-zcash-full-node)
  - [Se connecter à un nœud lightwalletd externe (configuration personnalisée)](#connecting-to-an-external-lightwalletd-node)
  - [Héberger BTCPay Server chez vous avec Cloudflare Tunnel](#hosting-btcpay-server-at-home-with-cloudflare-tunnel)
- [Configurer le plugin Zcash dans l'interface web de BTCPay Server](#configuring-the-zcash-plugin-in-the-btcpay-server-web-interface)
- [Intégrer BTCPay Server à votre site web](#integrating-btcpay-server-with-your-website)
  - [Intégration par API](#api-integration)
    - [Générer une clé API](#generating-an-api-key)
    - [Exemple : créer une facture via l'API](#example-creating-an-invoice-via-api)
    - [Configurer un webhook](#setting-up-a-webhook-optional)
  - [Intégration à un CMS](#cms-integration)
  - [Bouton de paiement ou iframe](#payment-button-or-iframe-no-cms-or-api-needed)
- [Conclusion](#conclusion)
- [Ressources](#resources)


---

## Pourquoi utiliser BTCPay Server avec Zcash

Le commerce en ligne accepte de plus en plus les cryptomonnaies. C'est rapide, mondial et cela fonctionne sans banques. Les commerçants comme les clients en profitent. Mais il existe un détail important que beaucoup négligent.

Lorsqu'il passe une commande, le client fournit généralement des informations personnelles : nom, adresse de livraison et numéro de téléphone. Si le paiement est effectué sur une blockchain publique, comme Bitcoin, Ethereum ou des stablecoins sur Ethereum ou Tron, la transaction devient visible en permanence et peut être analysée.

N'importe qui, même sans savoir ce qui a été commandé, peut :

- voir quand et combien a été payé  
- retracer d'où viennent les fonds et où ils sont allés  
- relier une adresse de cryptomonnaie à une personne réelle s'il existe le moindre point de corrélation (par exemple, une adresse e-mail divulguée ou le nom de livraison)

Cela signifie qu'un seul achat peut révéler tout l'historique financier d'un client.

Et cela fonctionne aussi dans l'autre sens. Si l'adresse d'un commerçant est déjà apparue on-chain, celui-ci est exposé. Les concurrents et les observateurs tiers peuvent suivre les volumes de paiement, l'activité des fournisseurs et la structure des flux commerciaux.

### La combinaison de BTCPay Server et de Zcash permet de résoudre ce problème.


BTCPay Server est un système gratuit et décentralisé de réception de paiements en cryptomonnaie.  
Ce n'est pas un intermédiaire de paiement et il ne détient aucun fonds. Tous les paiements vont directement dans le portefeuille du commerçant.  
Il peut s'agir d'un portefeuille personnel ou d'une configuration multisignature au sein d'une organisation.

Le serveur se charge des tâches de coordination :

- il génère une adresse unique pour chaque commande  
- il détecte la réception du paiement et le relie à la commande  
- il émet des reçus et des notifications  
- il fournit une interface de paiement au client  

Tout fonctionne sous le contrôle du propriétaire de la boutique, sans dépendre de services tiers.

Zcash est une cryptomonnaie fondée sur des preuves à divulgation nulle de connaissance. Elle prend en charge un modèle de transaction entièrement confidentiel.  
Lorsque vous utilisez des adresses protégées (simplement appelées « adresses » dans la suite), l'expéditeur, le destinataire et le montant de la transaction ne sont pas révélés sur la blockchain.

Pour les boutiques en ligne, cela signifie que :

- L'acheteur peut effectuer le paiement sans révéler son historique financier  
- Le vendeur reçoit le paiement sans exposer son adresse, son volume de ventes ni la structure de ses transactions  
- Aucun observateur extérieur ne peut relier le paiement à la commande ni aux données du client

### Exemple pratique

Un utilisateur passe une commande et choisit Bitcoin ou l'USDT comme moyen de paiement.  
Le site web génère une adresse de paiement et affiche le montant.  
Une fois le paiement effectué, cette adresse est enregistrée sur la blockchain et devient publique.  
Il suffit à un attaquant de relier une seule commande à l'adresse pour avoir une visibilité durable sur tout son historique de transactions.

Imaginez maintenant la même situation avec Zcash.  
BTCPay Server génère une adresse protégée. L'acheteur envoie le paiement.  
Du point de vue de la blockchain, il ne se passe rien. Il n'y a aucune donnée publique à analyser.  
Le serveur reçoit la confirmation, la relie à la commande et termine le processus.

Pour toute personne extérieure, c'est comme si rien ne s'était produit.  
Toute la logique reste entre la boutique et le client, comme il se doit.

Cette solution ne sacrifie ni l'automatisation ni la facilité d'utilisation.  
Tout fonctionne comme avec les autres cryptomonnaies, mais sans risque de fuite de données.



## Comment fonctionne BTCPay Server

BTCPay Server joue le rôle de pont de traitement des paiements entre votre plateforme d'e-commerce et la blockchain. Voici comment se déroule le processus :

1. **Le client passe une commande** sur votre site web (p. ex. WooCommerce, Magento ou toute plateforme disposant d'une intégration BTCPay).

2. **La boutique demande une facture de paiement** à BTCPay Server. Le serveur génère une facture unique comprenant :
   - Le montant de la commande
   - Un compte à rebours
   - Une Unified Address (UA) Zcash, p. ex. `u1...`, qui inclut par défaut un récepteur Orchard (protégé).

3. **Le client voit la page de paiement** et envoie des ZEC à l'adresse fournie.

4. **BTCPay Server surveille la blockchain** et vérifie le paiement par rapport :
   - Au montant attendu
   - À l'adresse de réception
   - À l'horodatage de la facture

5. **Une fois la transaction détectée et confirmée**, BTCPay en informe la boutique.

6. **Le client reçoit une confirmation de paiement.** En option, le serveur peut envoyer un reçu par e-mail.

L'ensemble de ce processus se déroule **automatiquement**, sans intermédiaires ni dépositaires.  
BTCPay Server ne **détient aucun fonds** : il se contente de relier le système de commande à la blockchain de manière sécurisée et confidentielle.
## Où sont stockés les fonds ? Qui contrôle les clés privées ?

BTCPay Server n'est **pas** un portefeuille et ne **nécessite pas de clés privées**.  
Tous les fonds vont **directement** dans le portefeuille du commerçant. La sécurité est assurée par une **architecture fondée sur les clés pour lecture seule**.

### Fonctionnement

- **Le portefeuille est créé à l'avance.**  
  Le commerçant utilise un portefeuille Zcash compatible avec les clés pour lecture seule, comme [Zkool](https://github.com/hhanh00/zkool2/) ou [Zingo! Wallet](https://zingolabs.org/).  
  Une liste complète est disponible sur [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server se connecte au moyen d'une clé pour lecture seule.**  
  Une clé pour lecture seule est une **clé en lecture seule** : elle peut détecter les paiements entrants et générer de nouvelles adresses de réception,  
  mais elle ne peut pas dépenser les fonds. Le serveur ne stocke ni phrases de récupération ni clés privées.

- **Les données de la blockchain sont consultées via un serveur `lightwalletd`.**  
  Vous pouvez utiliser un nœud public comme `https://zec.rocks`, ou exécuter votre propre pile `Zebra + lightwalletd` pour une souveraineté totale.

- **Chaque commande reçoit une adresse unique.**  
  Les clés pour lecture seule permettent au serveur de dériver de nouvelles adresses protégées Zcash pour chaque facture,  
  ce qui permet un suivi sécurisé des paiements et empêche la réutilisation des adresses.

- **Vous gardez le contrôle total de vos fonds.**  
  Même si le serveur est compromis, personne ne peut voler votre argent : seules les métadonnées de paiement pourraient être exposées.

Cette conception sépare l'**infrastructure** du **contrôle des actifs**.  
Vous pouvez mettre à jour, migrer ou réinstaller BTCPay Server sans mettre aucun fonds en danger.

## Comment configurer BTCPay Server pour accepter Zcash

Dans les sections précédentes, nous avons expliqué comment BTCPay Server fonctionne avec Zcash et pourquoi c'est important pour des paiements respectueux de la confidentialité. Passons maintenant à la pratique.

Votre configuration exacte dépendra de plusieurs facteurs :

- Disposez-vous déjà d'une instance BTCPay Server ?
- Souhaitez-vous utiliser un lightwalletd public ou exécuter votre propre nœud complet ?
- Le serveur fonctionnera-t-il sur un VPS ou chez vous ?

Ce chapitre couvre tous les scénarios de configuration actuels, des configurations minimales aux déploiements entièrement souverains.

Nous verrons notamment :

- Comment tout déployer de zéro sur un VPS, y compris le nœud complet (Zebra)
- Comment exécuter BTCPay Server chez vous tout en masquant votre adresse IP grâce à **Cloudflare Tunnel**
- Comment activer et configurer la prise en charge de Zcash dans l'interface web de BTCPay Server
- Comment intégrer BTCPay à votre site web ou à votre boutique en ligne


## Déployer BTCPay Server avec la prise en charge de Zcash

Passons à la configuration proprement dite. Dans cette section, nous allons installer BTCPay Server avec la prise en charge de Zcash, soit sur un nouveau VPS, soit en ajoutant la prise en charge de ZEC à une instance existante.

Si BTCPay Server fonctionne déjà chez vous (p. ex. pour BTC ou Lightning), inutile de tout réinstaller : activez simplement le plugin ZEC.

Nous passerons en revue différentes configurations, des installations minimales utilisant un nœud `lightwalletd` public aux installations entièrement souveraines avec votre propre nœud complet.  
La meilleure option dépend de l'emplacement de votre serveur et du degré d'indépendance que vous souhaitez vis-à-vis des infrastructures externes.

> Documentation officielle du plugin :  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Avertissement : un seul portefeuille par instance :**  
> Le plugin Zcash utilise **un portefeuille partagé** entre **toutes les boutiques** de l'instance BTCPay.  
> Si vous hébergez plusieurs boutiques indépendantes sur une même instance, elles partageront le même portefeuille Zcash.  
> Utilisez des instances distinctes si vous avez besoin d'une isolation stricte des portefeuilles.

---

### Configuration VPS recommandée

Avant l'installation, assurez-vous de disposer :

- D'un VPS sous **Ubuntu 22.04+**
- D'un nom de domaine pointant vers l'adresse IP de votre serveur (via le DNS)
- De `git`, `docker` et `docker-compose` installés
- D'un accès SSH au serveur

---

## Préparer votre serveur (partie masquée)

<details>
  <summary>Cliquez pour développer</summary>

Pour déployer BTCPay Server avec la prise en charge de Zcash, vous aurez besoin des éléments suivants :

### 1. Un VPS sous Ubuntu 22.04 ou plus récent

Nous recommandons une installation minimale d'**Ubuntu Server 22.04 LTS**.  
N'importe quel fournisseur de VPS proposant une adresse IP dédiée fera l'affaire.  

**Configuration minimale** :  
- 2 cœurs de processeur  
- 4 Go de RAM  
- 40 Go d'espace disque  

Cette configuration suffit si vous utilisez lightwalletd pour Zcash.  
Si vous prévoyez d'exécuter un **nœud Zcash complet**, il vous faudra **au moins 300 Go** d'espace disque libre.

---

### 2. Un nom de domaine pointant vers votre serveur

Dans le tableau de bord de votre fournisseur DNS, créez un enregistrement `A` pour un sous-domaine  
(p. ex. `btcpay.example.com`) qui pointe vers l'adresse IP de votre VPS.  

Ce domaine servira à accéder à BTCPay Server depuis le navigateur  
et à générer automatiquement un **certificat SSL gratuit** via Let's Encrypt.

---

### 3. Un accès SSH au serveur

Pour installer BTCPay Server, vous devez vous connecter à votre VPS en SSH.  
Depuis votre terminal, exécutez :

`ssh root@YOUR_SERVER_IP`

Si vous utilisez macOS, Linux ou WSL sous Windows, SSH est déjà disponible dans le terminal.
Sous Windows seul, utilisez un client SSH comme **PuTTY**.

---

### 4. Installer Git, Docker et Docker Compose

Une fois connecté en SSH, mettez à jour les paquets de votre système et installez les composants nécessaires :

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Sous Ubuntu 22.04 et versions ultérieures, `docker-compose` issu d'APT est obsolète.
> Le paquet recommandé est `docker-compose-plugin`, qui fournit la commande `docker compose` (notez l'espace à la place du tiret).

L'environnement de votre serveur est maintenant prêt pour l'installation de BTCPay Server.

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

### Étape 2 : exporter les variables d'environnement

Remplacez `btcpay.example.com` par votre propre domaine :

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Si vous prévoyez d'ajouter Monero ou Litecoin plus tard, vous pouvez les inclure dès maintenant :

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Vous pouvez ajouter de nouvelles cryptomonnaies à tout moment en exportant les variables appropriées et en relançant le script d'installation :

`. ./btcpay-setup.sh -i`

Dans ce guide, nous nous concentrerons **uniquement sur Zcash**.

---

### Étape 3 : lancer le programme d'installation

Exécutez le script d'installation pour construire et lancer le serveur :

`. ./btcpay-setup.sh -i`

Le script installe les dépendances, génère le `docker-compose.yml`, démarre les services et configure `systemd`.
Cela prend environ 5 minutes.

Une fois l'installation terminée, votre instance BTCPay Server sera accessible à l'adresse :

`https://btcpay.example.com`

> Si vous modifiez une installation existante (p. ex. pour ajouter ZEC), veillez à arrêter puis redémarrer le serveur avec les nouveaux paramètres :

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Passez ensuite à la section suivante pour configurer Zcash dans l'interface web de BTCPay Server.

## Exécuter votre propre nœud complet Zcash

Si vous préférez **ne pas** dépendre des nœuds `lightwalletd` publics, vous pouvez déployer votre propre nœud complet Zcash avec lightwalletd sur le même serveur.  
Cela vous offre une **autonomie totale** : aucune dépendance externe, aucune confiance requise.

---

### Étape 1 : vérifier l'espace disque disponible

Un nœud complet Zcash (Zebra + lightwalletd) nécessite actuellement **plus de 300 Go** d'espace disque, et ce volume continue d'augmenter.

Répartition :

- La base de données de la blockchain Zebra : environ 260-270 Go
- L'indexation lightwalletd : environ 15-20 Go

#### Stockage recommandé :

- **400 Go ou plus** si le serveur est utilisé **uniquement** pour les paiements Zcash
- **800 Go ou plus** si le serveur exécute également BTCPay Server, PostgreSQL, Nginx, etc.

> Idéalement, utilisez un disque SSD/NVMe d'une **capacité de 1 To**, surtout si vous ne prévoyez pas d'élaguer les données régulièrement.

---

### Étape 2 : définir les variables d'environnement

Ajoutez ce qui suit à votre configuration d'environnement pour activer la configuration du nœud complet :

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Cela inclura le fragment `zcash-fullnode`, qui lance à la fois `zebrad` et `lightwalletd` dans BTCPay Server.

---

### Étape 3 : relancer l'installateur

`. ./btcpay-setup.sh -i`

Le script va :

* Télécharger les images Docker pour Zebra et lightwalletd
* Configurer les services au sein de la pile BTCPay
* Relier le plugin Zcash à l'instance `lightwalletd` **locale**

> **La synchronisation complète de la blockchain peut prendre plusieurs jours**, en particulier sur des serveurs VPS aux ressources limitées.
> Tant que la synchronisation n'est pas terminée, les paiements protégés ne seront pas disponibles.


## Se connecter à un nœud lightwalletd externe

Dans la plupart des cas, une autonomie totale n'est pas nécessaire, et les commerçants ne souhaitent pas forcément consacrer du temps et de l'espace disque à l'exécution d'un nœud complet Zcash.  
Par défaut, BTCPay Server se connecte à un nœud `lightwalletd` public pour traiter les paiements protégés sans télécharger l'intégralité de la blockchain.

Le point de terminaison par défaut est :

`https://zec.rocks:443`

Vous pouvez toutefois configurer BTCPay Server pour qu'il se connecte à **n'importe quel nœud `lightwalletd` externe**, par exemple :

`https://lightwalletd.example:443`

Cette section explique comment procéder à l'aide d'un **fragment Docker personnalisé**.

> Un exemple de configuration complet avec toutes les variables d'environnement est disponible dans le [dépôt du plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Les étapes ci-dessous présentent une configuration minimale fonctionnelle.

---

### Étape 1 : créer un fragment Docker personnalisé

Dans le répertoire de votre projet BTCPayServer, créez un fichier de fragment personnalisé :

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

La directive `exclusive` garantit qu'un seul fragment portant la même étiquette (ici `zcash`) peut être actif à la fois.
Cela évite les conflits de configuration : par exemple, vous ne pouvez pas exécuter simultanément le fragment `zcash-fullnode` et ce fragment `lightwalletd` externe personnalisé.
En le marquant comme `exclusive: zcash`, BTCPay Server désactivera automatiquement les conteneurs `zcash-fullnode` par défaut et `lightwalletd` internes, ce qui vous permettra de vous connecter à votre propre nœud externe à la place.

---

### Étape 2 : définir les variables d'environnement

Dans le terminal :

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Étape 3 : définir l'adresse du nœud externe

Ouvrez votre fichier `.env` :

`nano .env`

Ajoutez la ligne suivante en remplaçant l'URL par le point de terminaison de votre choix :

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Vous pouvez utiliser :

* Un **nœud public**, tel que `https://zec.rocks:443`
* Votre propre nœud auto-hébergé, déployé séparément de BTCPay Server

> Si le `lightwalletd` externe devient indisponible ou surchargé, les paiements protégés échoueront.
> Pour les services critiques, choisissez un **point de terminaison stable et éprouvé** (comme le `zec.rocks` par défaut).

> Vous souhaitez auto-héberger `lightwalletd` ?
> Vous pouvez utiliser le `docker-compose.lwd.yml` du [Zebra dépôt](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Avertissement :** cette configuration n'est pas officiellement documentée et nécessite une configuration manuelle de TLS, de la redirection de ports et du pare-feu ; elle est recommandée aux utilisateurs avancés uniquement.

---

### Étape 4 : relancer l'installateur

`. ./btcpay-setup.sh -i`

BTCPay Server appliquera votre configuration personnalisée et se connectera au nœud `lightwalletd` indiqué.

Désormais, le plugin Zcash utilisera ce point de terminaison externe pour traiter les transactions protégées.


## Héberger BTCPay Server à domicile avec Cloudflare Tunnel

Vous souhaitez accepter des paiements Zcash tout en hébergeant BTCPay Server sur un appareil domestique, comme un Raspberry Pi 5 ou n'importe quel serveur local **sans IP statique** ?  
Vous pouvez exposer votre instance sur Internet en toute sécurité grâce à **Cloudflare Tunnel**.

Cette méthode évite la redirection de ports et masque votre véritable adresse IP au public, tout en gardant votre serveur accessible en HTTPS.

Elle vous permet également d'**éviter le coût de location d'un VPS**, ce qui est idéal si les paiements en cryptomonnaie sont une fonctionnalité facultative plutôt que le cœur de votre activité.

---

### Étape 1 : installer Cloudflare Tunnel

1. Créez un compte sur [cloudflare.com](https://www.cloudflare.com) et ajoutez votre domaine.
2. Sur votre **serveur domestique**, installez Cloudflare Tunnel à l'aide du dépôt de paquets officiel de Cloudflare :

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

Si `apt install cloudflared` échoue, installez plutôt le `.deb` correspondant :

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. Authentifiez-vous auprès de Cloudflare :

`cloudflared tunnel login`

Cette commande ouvrira une fenêtre de navigateur. Connectez-vous et autorisez l'accès à votre domaine.
Cloudflare créera automatiquement sur votre serveur un fichier `credentials` contenant un jeton.

4. Créez un nouveau tunnel (vous pouvez le nommer `btcpay` ou autrement) :

`cloudflared tunnel create btcpay`

Cela génère un fichier `btcpay.json` contenant l'identifiant du tunnel et les identifiants de connexion ; vous en aurez besoin à l'étape suivante.

---

### Étape 2 : créer le fichier de configuration du tunnel

Créez le répertoire de configuration (s'il n'existe pas) et ouvrez le fichier de configuration :

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Collez la configuration suivante :

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Explication :

* `tunnel` : nom du tunnel que vous avez créé précédemment
* `credentials-file` : chemin vers le fichier de jeton généré lors de `cloudflared tunnel login`
* `hostname` : votre domaine enregistré auprès de Cloudflare (p. ex. `btcpay.example.com`)
* `service` : adresse locale de votre BTCPay Server (généralement `http://127.0.0.1:80` pour Nginx)

> Cloudflare relaiera le trafic de manière sécurisée vers votre serveur local, sans exposer votre IP domestique.


### Étape 3 : ajouter un enregistrement DNS pour votre tunnel

Après la création du tunnel, Cloudflare **ajoute généralement automatiquement un enregistrement DNS CNAME** pour votre domaine. Il devrait ressembler à ceci :

`btcpay.example.com -> <UUID>.cfargotunnel.com`

S'il n'apparaît pas automatiquement, ajoutez-le manuellement :

1. Rendez-vous sur votre [tableau de bord Cloudflare](https://dash.cloudflare.com/)
2. Accédez à la section **DNS**
3. Ajoutez un nouvel enregistrement CNAME :
   - **Nom** : `btcpay`
   - **Cible** : `<UUID>.cfargotunnel.com`  
     Vous trouverez la valeur exacte dans votre fichier `btcpay.json` ou en exécutant :
     
     `cloudflared tunnel list`
     
   - **Statut du proxy** : activé (nuage orange)

> Cet enregistrement garantit que toutes les requêtes vers `btcpay.example.com` transitent par Cloudflare Tunnel, ce qui masque votre véritable adresse IP au public.

---

### Étape 4 : activer le tunnel au démarrage du système

Pour que le tunnel se lance automatiquement au démarrage, installez-le en tant que service système :

`sudo cloudflared service install`

Activez ensuite le service et démarrez-le :

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Vérifiez son état :

`sudo systemctl status cloudflared`

Vous devriez voir un message tel que `Active: active (running)` ainsi qu'une confirmation que `btcpay.example.com` est en ligne.

> Désormais, le tunnel démarrera automatiquement à chaque redémarrage, et votre BTCPay Server sera accessible publiquement, sans redirection de ports et sans exposer votre véritable IP.

---

### Étape 5 : finaliser la configuration de BTCPay Server

Si vous vous apprêtez à installer BTCPay Server pour la première fois, définissez votre domaine avant d'exécuter le script d'installation :

`export BTCPAY_HOST="btcpay.example.com"`

Cela garantit que le bon domaine est utilisé lors de la génération de la **configuration Nginx** et des **certificats SSL**.

Si BTCPay Server est déjà installé et que vous ajoutez simplement le tunnel :

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

L'installation régénérera les configurations et appliquera le nouveau domaine.
Vous devriez maintenant pouvoir accéder à votre serveur à l'adresse :

`https://btcpay.example.com`

> Que vous utilisiez un `lightwalletd` public ou votre propre nœud complet, cela n'a aucune incidence sur le tunnel.
> L'essentiel est que BTCPay Server écoute localement sur `127.0.0.1:80`.


## Configurer le plugin Zcash dans l'interface web de BTCPay Server

> **Important pour les configurations multi-boutiques :**  
> Le portefeuille Zcash configuré ici est **global** à l'instance. Toutes les boutiques utiliseront ce portefeuille, sauf si vous exécutez des instances BTCPay distinctes.

Après avoir déployé avec succès votre instance BTCPay Server, vous devrez effectuer une configuration de base via l'interface web d'administration.  
La documentation officielle fournit des instructions complètes en anglais ; ici, nous passerons en revue les étapes essentielles en nous concentrant sur la configuration du plugin Zcash.

---

### Étape 1 : se connecter à l'interface web

Accédez à votre instance à l'adresse :

`[https://btcpay.example.com](https://btcpay.example.com)`

- Saisissez votre identifiant et votre mot de passe d'administrateur.
- S'il s'agit de votre première connexion, vous serez invité à créer un compte.
- Le premier compte enregistré reçoit automatiquement les droits d'administrateur.

---

### Étape 2 : installer le plugin Zcash

1. Dans le menu principal, accédez à :

`Plugins -> Browse Plugins`

2. Repérez le plugin **Zcash (ZEC)**. Utilisez la barre de recherche si nécessaire.
3. Cliquez sur **Install** et confirmez.

> Répétez cette procédure pour tout autre altcoin que vous avez activé lors de la configuration du serveur.

Après l'installation, cliquez sur **Restart Server** pour recharger l'interface avec les plugins actifs.


### Étape 3 : connecter votre portefeuille via Viewing Key

Après l'installation du plugin, une nouvelle section **Zcash** apparaîtra dans le menu des paramètres.

1. Accédez à :

`Zcash -> Settings`

2. Collez votre **Unified Full Viewing Key (UFVK)** : BTCPay dérivera une adresse unifiée pour chaque facture et détectera les paiements protégés entrants.

> **Remarque :** les anciennes clés pour lecture seule Sapling sont prises en charge, mais pour utiliser Orchard et les adresses unifiées, vous devez fournir une **UFVK**.


   Exemple de format :

`uview184syv9wftwngkay8d...`

3. Saisissez une valeur dans le champ de hauteur de bloc

* **Première configuration avec un nouveau portefeuille (nouvelle phrase de récupération) :** saisissez la hauteur de bloc Zcash actuelle (vous pouvez la consulter sur 3xpl.com/zcash) ; cela accélère l'analyse initiale.
* **Migration, sur le même serveur, d'une ancienne configuration Sapling uniquement vers les adresses unifiées / Orchard :** laissez ce champ vide.
* **Déplacement de votre boutique vers un nouveau serveur avec le même portefeuille/la même UFVK :** saisissez éventuellement la hauteur de naissance, c'est-à-dire la hauteur approximative de la première commande payée de votre boutique (faites correspondre la date de la commande sur 3xpl pour restreindre l'analyse). En cas de doute, laissez ce champ vide.

> Tous les portefeuilles ne permettent pas encore l'export d'une **Unified Full Viewing Key (UFVK)**.  
> Options recommandées :  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (version pour PC)**](https://zingolabs.org/)  
> Dans les deux applications, cherchez l'export de l'UFVK dans la section de sauvegarde/export.

Ces clés prennent en charge la **rotation automatique des adresses**, ce qui signifie que :
- Chaque client reçoit une adresse de paiement **unique**
- Vous voyez un solde **unique et unifié**

Vous trouverez une liste de compatibilité plus complète sur [ZecHub -> Portefeuilles](https://zechub.wiki/wallets).

Une fois tous les champs remplis, cliquez sur **Save**.

---

### Tester votre flux de paiement ZEC

Félicitations : votre portefeuille Zcash est désormais connecté à BTCPay Server.

Effectuons un test :

1. Accédez à :

`Invoices -> Create New`

2. Générez une facture de test pour un petit montant en ZEC.
3. Envoyez des fonds depuis **un autre portefeuille** (pas celui connecté à BTCPay).
4. Une fois la transaction détectée, la page de la facture affichera une animation de célébration.
5. Vérifiez que le statut de la facture passe à **Paid**.

Si tout fonctionne, vous êtes prêt à intégrer les paiements ZEC à votre site web à l'aide de l'API ou des plugins CMS.



## Intégrer BTCPay Server à votre site web

Une fois votre portefeuille Zcash connecté à BTCPay Server, vous pouvez intégrer le système de paiement à votre site web.  
Il existe plusieurs façons de procéder, de l'accès direct à l'API aux plugins prêts à l'emploi pour les plateformes CMS populaires.

---

### Options d'intégration

- **Intégration par API**  
  Idéale pour les sites web sur mesure ou les systèmes sans CMS.  
  Elle vous donne un contrôle total sur la création des factures, le suivi des paiements et les notifications, le tout dans votre propre interface et selon votre propre logique.  
  Elle nécessite des connaissances de base en programmation ; il est donc préférable de confier cette tâche à votre développeur.

- **Plugins CMS**  
  Disponibles pour des plateformes comme **WooCommerce**, **PrestaShop** et d'autres.  
  Ces plugins vous permettent d'accepter des paiements en quelques minutes seulement, sans aucune programmation.

- **Bouton de paiement ou iframe**  
  La méthode la plus simple.  
  Parfaite pour les pages d'atterrissage, les sites personnels ou tout site sur lequel vous souhaitez simplement intégrer un lien de don ou un widget de paiement.

---

### Intégration par API

Si vous utilisez une plateforme sur mesure (ou aucun CMS), l'API est la meilleure option.  
Elle vous offre une flexibilité totale : vous pouvez créer des factures, suivre leur statut, recevoir des notifications et contrôler entièrement l'expérience utilisateur.

> Remarque : même certains plugins CMS utilisent l'API en arrière-plan ; la création d'une clé API est donc souvent la **première étape obligatoire**, quelle que soit votre méthode d'intégration.

Étape suivante : générez une clé API pour votre boutique et commencez à utiliser l'[API Greenfield](https://docs.btcpayserver.org/API/Greenfield/v1/) pour construire votre intégration.


### Générer une clé API

Pour intégrer BTCPay Server à votre site web ou à votre application, vous devez générer une clé API.

1. Connectez-vous à BTCPay Server et ouvrez le **menu utilisateur** (coin supérieur droit)
2. Accédez à **API Keys**
3. Cliquez sur **Create a new API key**
4. Saisissez un nom pour votre clé
5. Dans la section **Permissions**, activez :
   - `Can create invoice`
   - `Can view invoice`
   - *(Facultatif)* `Can modify store settings` : uniquement si vous avez besoin d'une gestion au niveau de la boutique

6. Cliquez sur **Generate**. Votre clé API personnelle s'affichera ; copiez-la et conservez-la en lieu sûr.

> Cette clé donne accès aux factures de votre boutique.  
> Ne la partagez **pas** publiquement et ne l'exposez pas dans du code côté client.

---

### Exemple : créer une facture via l'API

**Point de terminaison :**

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

Consultez la documentation complète :
[API Greenfield – Créer une facture](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Configurer un webhook (facultatif)

Pour recevoir des notifications en temps réel lorsque le statut d'une facture change (p. ex. lorsqu'un paiement est reçu) :

1. Accédez aux paramètres de votre boutique -> **Webhooks**
2. Ajoutez l'URL du point de terminaison de votre backend qui traitera les requêtes `POST` provenant de BTCPay Server
3. BTCPay enverra automatiquement des notifications lorsqu'une facture est payée ou expire

Le contenu des webhooks et la logique de nouvelle tentative sont décrits dans la [documentation officielle des webhooks](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Des exemples d'intégration pour divers langages de programmation sont disponibles dans la documentation de BTCPay et dans les dépôts GitHub.



### Intégration à un CMS

BTCPay Server prend en charge des plugins pour les systèmes de gestion de contenu (CMS) populaires.  
L'intégration la plus aboutie et la plus utilisée est celle avec **WordPress + WooCommerce**, qui permet d'accepter facilement des paiements ZEC **sans écrire de code**.

---

#### WooCommerce (WordPress)

BTCPay Server prend officiellement en charge un plugin pour WooCommerce.

Étapes d'intégration :

1. Installez le plugin **BTCPay for WooCommerce** depuis le répertoire des plugins WordPress ou depuis GitHub.
2. Dans votre panneau d'administration WordPress, accédez à :

`WooCommerce -> Settings -> Payments`

3. Trouvez **BTCPay** dans la liste et cliquez sur **Set up**
4. Saisissez l'URL de votre BTCPay Server et suivez les instructions d'autorisation  
   (la génération automatique de la clé API est recommandée)
5. Activez le moyen de paiement et enregistrez vos paramètres

> Des instructions détaillées, des tutoriels vidéo et des guides de dépannage sont disponibles dans la documentation du plugin.

Vous trouverez également d'autres options d'intégration à un CMS dans cette même section de la documentation de BTCPay.

---

### Bouton de paiement ou iframe (sans CMS ni API)

Si vous n'utilisez pas de CMS et ne souhaitez pas travailler avec des API, le moyen le plus simple d'accepter des paiements ZEC est d'**intégrer un lien de paiement ou un widget** directement sur votre site web.

Cette méthode est idéale pour :

- Les pages d'atterrissage
- Les sites de portfolio
- Les blogs ou les pages statiques
- Les projets sans serveur backend

---

#### Option 1 : bouton de paiement (lien)

1. Dans BTCPay Server, créez manuellement une facture dans la section **Invoices**
2. Copiez le lien de paiement, p. ex. :

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Ajoutez le lien à votre HTML :

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Option 2 : facture intégrée (iframe)

Pour afficher la facture directement sur votre site, utilisez une iframe :

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Vous pouvez styliser le bouton ou le conteneur de l'iframe pour l'adapter au design de votre site : BTCPay Server permet une personnalisation flexible du thème de la page de facture.

## Conclusion

Ce guide était long, mais il ne couvre que les aspects fondamentaux de l'intégration des paiements Zcash avec BTCPay Server.

L'interface BTCPay Server offre bien plus de fonctionnalités que celles présentées ici. Heureusement, l'interface utilisateur est disponible en plusieurs langues (dont le russe), ce qui permet de l'explorer et d'expérimenter facilement.

BTCPay est un outil très flexible. Vous pouvez :

* Héberger plusieurs boutiques indépendantes sur une seule instance
* Définir des rôles et des autorisations personnalisés pour les membres de l'équipe, de la simple consultation des commandes jusqu'à l'administration complète
* Utiliser vos propres domaines et votre propre identité visuelle
* Configurer des webhooks, des portefeuilles de secours et même un accès Tor
* Configurer des paramètres avancés tels que les règles fiscales, les codes de réduction, la personnalisation de la page de paiement, les restrictions de moyens de paiement, et plus encore

BTCPay a été conçu comme une alternative open source aux fournisseurs de paiement centralisés. Si vous souhaitez accepter des paiements ZEC confidentiels sans intermédiaires, cette plateforme mérite sans aucun doute votre attention.

Nous vous souhaitons beaucoup de succès dans l'exploration de l'écosystème BTCPay, afin que vos paiements vous appartiennent vraiment.

## Ressources

* [Site officiel de BTCPay Server](https://btcpayserver.org/)
* [FAQ de BTCPay](https://docs.btcpayserver.org/FAQ/)
* [Dépôt BTCPay Server GitHub](https://github.com/btcpayserver/btcpayserver)
* [Démo BTCPay Server sur le réseau principal](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Plugin Zcash pour BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Guide d'installation du plugin Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Exemple de fichier zcash-lightwalletd.custom.yml personnalisé](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Fichier Compose lightwalletd Docker (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Documentation des clés API de BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Créer un tunnel Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Liste de compatibilité des portefeuilles Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + lightwalletd sur Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
