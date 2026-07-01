<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Nœuds complets

Un nœud complet est un logiciel qui exécute une copie complète de la blockchain de n’importe quelle cryptomonnaie, donnant accès aux fonctionnalités du protocole.

Il conserve un enregistrement complet de chaque transaction ayant eu lieu depuis le bloc genesis et est donc capable de vérifier la validité des nouvelles transactions et des nouveaux blocs ajoutés à la blockchain.

## Zcashd

Zcashd est actuellement l’implémentation principale de nœud complet utilisée par Zcash, développée et maintenue par Electric Coin Company.

Zcashd expose un ensemble d’API via son interface RPC. Ces API fournissent des fonctions qui permettent aux applications externes d’interagir avec le nœud.

[Lightwalletd](https://github.com/zcash/lightwalletd) est un exemple d’application qui utilise un nœud complet pour permettre aux développeurs de créer et maintenir des portefeuilles légers protégés, adaptés aux mobiles, sans avoir à interagir directement avec Zcashd.

[Liste complète des commandes RPC prises en charge](https://zcash.github.io/rpc/)

[Le livre de Zcashd](https://zcash.github.io/zcash/)


### Démarrer un nœud (Linux)

- Installer les dépendances 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Cloner la dernière version, faire le checkout, configurer et compiler :

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Synchroniser la blockchain (cela peut prendre plusieurs heures)

    Pour démarrer le nœud, exécutez :

      ./src/zcashd

- Les clés privées sont stockées dans ~/.zcash/wallet.dat

[Guide pour Zcashd sur Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra est une implémentation indépendante de nœud complet pour le protocole Zcash créée par la Zcash Foundation. 

Elle est actuellement en phase de test et reste expérimentale.

Zebra comporte deux composants principaux. Le composant client est responsable de l’analyse de la blockchain et du déchiffrement d’essai des transactions. 

La seconde partie est l’outil en ligne de commande zebra. Cet outil gère les clés de dépense, les adresses et communique avec le composant client dans zebrad afin de fournir des fonctionnalités de portefeuille de base.

Toute personne intéressée par l’essai de Zebra pour miner des blocs est invitée à rejoindre le serveur Discord R&D. Assurez-vous également de lire le livre de Zebra pour les instructions d’installation. 

[Github](https://github.com/ZcashFoundation/zebra/)

[Le livre de Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Le réseau

En exécutant un nœud complet, vous contribuez à renforcer le réseau zcash en soutenant sa décentralisation. 

Cela aide à prévenir le contrôle par des acteurs adverses et à maintenir la résilience du réseau face à certaines formes de perturbation.

Les seeders DNS exposent une liste d’autres nœuds fiables via un serveur intégré. Cela permet aux transactions de se propager dans l’ensemble du réseau. 

### Statistiques du réseau

Voici des exemples de plateformes qui donnent accès aux données du réseau Zcash :

[Explorateur de blocs Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Vous pouvez également contribuer au développement du réseau en exécutant des tests, en proposant de nouvelles améliorations et en fournissant des métriques. 



### Minage

Les mineurs ont besoin de nœuds complets pour accéder à toutes les RPC liées au minage, telles que getblocktemplate et getmininginfo. 

Zcashd permet également le minage vers une coinbase protégée. Les mineurs et les pools de minage ont la possibilité de miner directement afin d’accumuler des ZEC protégés dans une z-address par défaut. 

Lisez le [Guide de minage](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou rejoignez la page du forum communautaire pour les [mineurs Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Confidentialité 

Exécuter un nœud complet vous permet de vérifier indépendamment toutes les transactions et tous les blocs sur le réseau Zcash.

Exécuter un nœud complet évite certains risques pour la confidentialité associés à l’utilisation de services tiers pour vérifier les transactions en votre nom.

Utiliser votre propre nœud permet également de se connecter au réseau via [Tor](https://zcash.github.io/zcash/user/tor.html).
Cela offre l’avantage supplémentaire de permettre à d’autres utilisateurs de se connecter en privé à l’adresse .onion de votre nœud.


**Besoin d’aide ?**

Lisez la [documentation de support](https://zcash.readthedocs.io/en/latest/)

Rejoignez notre [serveur Discord](https://discord.gg/zcash) ou contactez-nous sur [twitter](https://twitter.com/ZecHub)
