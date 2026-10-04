<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Nœuds complets

## TL;DR

- Un nœud complet conserve une copie complète de la blockchain Zcash et vérifie chaque nouveau bloc et chaque transaction selon les règles de consensus.
- Zebra (`zebrad`) est le nœud à installer aujourd’hui. Zakura est une seconde implémentation, dérivée de Zebra.
- zcashd est retiré. Son arrêt de fin de support a été atteint le 18 juillet 2026 à la hauteur de bloc 3417100, et ces nœuds ne démarrent plus.
- Le nœud et le wallet sont désormais des programmes séparés. [Zallet](https://github.com/zcash/zallet) s’exécute avec un nœud et détient les clés.
- Exécuter votre propre nœud vous donne une vérification indépendante et élimine le besoin de faire confiance au serveur d’une autre personne.

## Explication de base

Un nœud complet est un logiciel qui exécute une copie complète de la blockchain d’une cryptomonnaie, vous donnant accès aux fonctionnalités du protocole.

Il conserve un historique complet de chaque transaction ayant eu lieu depuis le genesis et peut donc vérifier la validité des nouvelles transactions et des nouveaux blocs ajoutés à la blockchain.

## Implémentations de nœuds

### Zebra

Zebra est une implémentation indépendante et prête pour la production d’un nœud complet du protocole Zcash, créée par la Zcash Foundation et écrite en Rust. Comme zcashd est retiré, Zebra (`zebrad`) est le nœud complet recommandé pour les nouveaux déploiements.

Zebra valide les blocs et les transactions, participe au réseau pair-à-pair et expose une interface RPC aux applications. Le wallet est désormais un composant distinct : [Zallet](https://github.com/zcash/zallet) s’exécute avec un nœud Zebra et gère les clés et les soldes. Cela remplace zcashd, qui regroupait le nœud et le wallet dans un seul processus.

Pour servir les wallets légers protégés, le nœud s’exécute avec un indexeur, soit le [lightwalletd](https://github.com/zcash/lightwalletd) établi, soit le plus récent [Zaino](https://zechub.wiki/zcash-tech/zaino).

Veillez à lire le livre Zebra pour les instructions d’installation et rejoignez le serveur R&D Discord pour obtenir de l’aide.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Le livre Zebra](https://zebra.zfnd.org)

Consultez [Zebra Nœud complet](/zcash-tech/zebra-full-node) pour les étapes d’installation, la configuration et les exigences matérielles.

### Zakura

Zakura est un second nœud complet compatible avec le consensus, dérivé de Zebra et développé par Valar Group avec Project Tachyon. Il suit les mêmes règles de protocole et ajoute une synchronisation plus rapide, l’élagage des blocs et une couche de compatibilité RPC zcashd. Consultez [Zakura Nœud](/zcash-tech/zakura-node).

### zcashd (retiré)

> **Remarque :** zcashd a été retiré. La Electric Coin Company a [annoncé la dépréciation](https://z.cash/support/zcashd-deprecation/), et l’arrêt automatique de fin de support a été atteint le 18 juillet 2026 à la hauteur de bloc 3417100. Chaque nœud zcashd 6.20.0 non modifié s’est arrêté à cette hauteur et refuse de redémarrer, et le logiciel ne prend pas en charge NU6.3. Utilisez Zebra. Si vous détenez un zcashd `wallet.dat`, suivez le [Guide de migration : zcashd vers zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd était l’implémentation originale de nœud complet pour Zcash, développée et maintenue par la Electric Coin Company. Les instructions de compilation ci-dessous sont conservées à titre de référence et pour les opérateurs migrant depuis zcashd.

zcashd expose un ensemble d’API via son interface RPC. Ces API fournissent des fonctions permettant aux applications externes d’interagir avec le nœud.

[lightwalletd](https://github.com/zcash/lightwalletd) est un exemple d’application qui utilise un nœud complet afin de permettre aux développeurs de créer et de maintenir des wallets légers protégés adaptés aux appareils mobiles sans avoir à interagir directement avec zcashd.

[Liste complète des commandes RPC prises en charge](https://zcash.github.io/rpc/)

[Le livre zcashd](https://zcash.github.io/zcash/)

#### Démarrer un nœud (Linux)

- Installer les dépendances

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Cloner la dernière version, effectuer le checkout, configurer et compiler :

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Synchroniser la blockchain (cela peut prendre plusieurs heures)

    Pour démarrer le nœud, exécutez :

      ./src/zcashd

- Les clés privées sont stockées dans ~/.zcash/wallet.dat

[Guide pour zcashd sur Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Implications pratiques

### Le réseau

En exécutant un nœud complet, vous contribuez à renforcer le réseau Zcash en soutenant sa décentralisation.

Cela aide à prévenir le contrôle hostile et à maintenir la résilience du réseau face à certaines formes de perturbation.

Les seeders DNS exposent une liste d’autres nœuds fiables via un serveur intégré. Cela permet aux transactions de se propager dans l’ensemble du réseau.

### Statistiques du réseau

Voici des plateformes d’exemple permettant d’accéder aux données du réseau Zcash :

[Zcash Explorateur de blocs](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Vous pouvez également contribuer au développement du réseau en exécutant des tests, en proposant de nouvelles améliorations et en fournissant des métriques.

### Minage

Les mineurs ont besoin de nœuds complets pour accéder à toutes les RPC liées au minage, telles que getblocktemplate et getmininginfo.

zcashd permet également le minage vers des coinbases protégées. Les mineurs et les pools de minage peuvent miner directement afin d’accumuler par défaut des ZEC protégés dans une z-address.

Lisez [Le guide de minage](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou rejoignez la page du forum communautaire consacrée aux [Zcash Mineurs](https://forum.zcashcommunity.com/c/mining/13).

### Confidentialité

Exécuter un nœud complet vous permet de vérifier indépendamment toutes les transactions et tous les blocs sur le réseau Zcash.

Exécuter un nœud complet évite certains risques pour la confidentialité associés à l’utilisation de services tiers pour vérifier des transactions en votre nom.

Utiliser votre propre nœud permet également de vous connecter au réseau via [Tor](https://zcash.github.io/zcash/user/tor.html).
Cela offre l’avantage supplémentaire de permettre à d’autres utilisateurs de se connecter de manière privée à l’adresse .onion de votre nœud.

## Erreurs courantes

- Compiler zcashd à partir des instructions ci-dessus en espérant obtenir un nœud fonctionnel. Ces binaires s’arrêtent à la hauteur de dépréciation.
- Exécuter un nœud en supposant que votre wallet mobile l’utilise désormais. Un wallet léger continue de communiquer avec le serveur configuré jusqu’à ce que vous le dirigiez vers le vôtre. Consultez [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes).
- Exécuter uniquement `zebrad` et s’attendre à ce que les wallets légers se connectent. Le nœud nécessite un indexeur à ses côtés, soit lightwalletd, soit [Zaino](/zcash-tech/zaino).
- Chercher les RPC de wallet sur le nœud. Les clés et les soldes ont été déplacés vers Zallet.

## Pages associées

- [Zebra Nœud complet](/zcash-tech/zebra-full-node) - installer, configurer et exécuter le nœud recommandé
- [Zakura Nœud](/zcash-tech/zakura-node) - la seconde implémentation de nœud, dérivée de Zebra
- [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes) - les serveurs interrogés par les wallets légers
- [Zaino](/zcash-tech/zaino) - l’indexeur Rust qui sert les wallets légers
- [Zcash Synchronisation des wallets](/zcash-tech/zcash-wallet-syncing) - pourquoi la synchronisation fonctionne ainsi

## Pour aller plus loin

Lisez [Documentation d’assistance](https://zcash.readthedocs.io/en/latest/)

Rejoignez notre [Discord Serveur](https://discord.gg/zcash) ou contactez-nous sur [X](https://X.com/ZecHub)
