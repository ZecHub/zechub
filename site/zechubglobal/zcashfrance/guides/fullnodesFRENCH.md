# nœuds complets

Un nœud complet est un logiciel qui exécute une copie complète de la blockchain de n'importe quelle crypto-monnaie donnant accès aux fonctionnalités des protocoles.

Il détient un enregistrement complet de chaque transaction qui s'est produite depuis la genèse et est donc en mesure de vérifier la validité des nouvelles transactions et des blocs qui sont ajoutés à la blockchain.

## Zcashd

Zcashd est actuellement la principale implémentation de nœud complet utilisée par Zcash, développée et maintenue par Electric Coin Company.

Zcashd expose un ensemble d'API via son interface RPC. Ces API fournissent des fonctions qui permettent aux applications externes d'interagir avec le nœud.

Lightwalletd est un exemple d'application qui utilise un nœud complet pour permettre aux développeurs de créer et de maintenir des portefeuilles légers blindés adaptés aux mobiles sans avoir à interagir directement avec Zcashd.

[Liste complète](https://zcash.github.io/rpc/)

[Le livre Zcashd](https://zcash.github.io/zcash/)


### Démarrer un nœud (Linux)

- Installer les dépendances

      mise à jour sudo apt

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev décompresser git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Cloner la dernière version, vérifier, configurer et construire :

      clone git https://github.com/zcash/zcash.git

      cd zcash/

      git paiement v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sync Blockchain (peut prendre plusieurs heures)

    Pour démarrer l'exécution du nœud :

      ./src/zcashd

- Les clés privées sont stockées dans ~/.zcash/wallet.dat

[Guide pour Zcashd sur Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zèbre

Zebra est une implémentation de nœud complet indépendante pour le protocole Zcash créé par la Fondation Zcash.

Il est actuellement en cours de test et est encore expérimental.

Il y a deux composants principaux de Zebra. Le composant client qui est responsable de l'analyse de la blockchain et du décryptage d'essai des transactions.

La deuxième partie est l'outil de ligne de commande zebra. Cet outil gère les clés de dépenses, les adresses et communique avec le composant client dans zebrad pour fournir des fonctionnalités de portefeuille de base.

Toute personne intéressée à essayer Zebra pour extraire des blocs est invitée à rejoindre le serveur de discorde R&D. Assurez-vous également de lire le livre Zebra pour les instructions de configuration.

[Github](https://github.com/ZcashFoundation/zebra/)

[Le livre des zèbres](https://zebra.zfnd.org)

[Discord](https://discord.gg/uvEdHsrb)



## Le réseau

En exécutant un nœud complet, vous contribuez à renforcer le réseau zcash en soutenant sa décentralisation.

Cela permet d'éviter un contrôle contradictoire et de maintenir le réseau résilient à certaines formes de perturbation.

Les seeders DNS exposent une liste d'autres nœuds fiables via un serveur intégré. Cela permet aux transactions de se propager à travers le réseau.

### Statistiques du réseau

Voici des exemples de plates-formes permettant d'accéder aux données du réseau Zcash :

[Explorateur de blocs Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Vous pouvez également contribuer au développement du réseau en exécutant des tests ou en proposant de nouvelles améliorations et en fournissant des métriques.



### Exploitation minière

Les mineurs ont besoin de nœuds complets pour accéder à tous les RPC liés au minage tels que getblocktemplate et getmininginfo.

Zcashd permet également de miner vers une coinbase blindée. Les mineurs et les pools miniers ont la possibilité d'exploiter directement pour accumuler une ZEC protégée dans une adresse z par défaut.

Lisez [Mining Guide](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou rejoignez la page du forum communautaire pour [Zcash Miners](https://forum.zcashcommunity.com/c/exploitationminière/13).

### Confidentialité

L'exécution d'un nœud complet vous permet de vérifier indépendamment toutes les transactions et tous les blocs sur le réseau Zcash.

L'exécution d'un nœud complet évite certains risques de confidentialité associés à l'utilisation de services tiers pour vérifier les transactions en votre nom.

L'utilisation de votre propre nœud permet également de se connecter au réseau via [Tor](https://zcash.github.io/zcash/user/tor.html).
Cela a l'avantage supplémentaire de permettre à d'autres utilisateurs de se connecter en privé à votre adresse de nœud .onion.


**Besoin d'aide?**

Lire [Documentation d'assistance](https://zcash.readthedocs.io/en/latest/)

Rejoignez notre [Discord Sever](https://discord.gg/zcash) ou contactez-nous sur [twitter](https://twitter.com/ZecHub)




