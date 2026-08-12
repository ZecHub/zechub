<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Nœuds complets

Un nœud complet est un logiciel qui exécute une copie complète de la blockchain de n’importe quelle cryptomonnaie, donnant accès aux fonctionnalités du protocole.

Il conserve un enregistrement complet de chaque transaction ayant eu lieu depuis le genesis et est donc capable de vérifier la validité des nouvelles transactions et des blocs ajoutés à la blockchain.

## Zcashd

> **Remarque :** zcashd est en cours d’abandon. Electric Coin Company a [annoncé officiellement](https://z.cash/support/zcashd-deprecation/) que zcashd est retiré, son rôle de nœud complet étant remplacé par [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) et son rôle de wallet par [Zallet](https://github.com/zcash/zallet). Pour les nouveaux déploiements, utilisez Zebra (voir ci-dessous). Si vous exécutez déjà un nœud zcashd, suivez le [Guide de migration : zcashd vers Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd était l’implémentation originale de nœud complet pour Zcash, développée et maintenue par Electric Coin Company. Les instructions de compilation ci-dessous sont conservées à titre de référence et pour les opérateurs migrant depuis zcashd.

Zcashd expose un ensemble d’API via son interface RPC. Ces API fournissent des fonctions qui permettent à des applications externes d’interagir avec le nœud.

[Lightwalletd](https://github.com/zcash/lightwalletd) est un exemple d’application qui utilise un nœud complet pour permettre aux développeurs de créer et maintenir des light wallets shielded adaptés aux mobiles sans avoir à interagir directement avec Zcashd.

[Liste complète des commandes RPC prises en charge](https://zcash.github.io/rpc/)

[Le livre de Zcashd](https://zcash.github.io/zcash/)


### Démarrer un nœud (Linux)

- Installer les dépendances

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Cloner la dernière version, faire le checkout, configurer et compiler :

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

[Guide pour Zcashd sur Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra est une implémentation indépendante de nœud complet du protocole Zcash, prête pour la production, créée par la Zcash Foundation et écrite en Rust. Comme zcashd est retiré, Zebra (`zebrad`) est le nœud complet recommandé pour les nouveaux déploiements.

Zebra valide les blocs et les transactions, participe au réseau pair à pair et expose une interface RPC pour les applications. Le wallet est désormais un composant séparé : [Zallet](https://github.com/zcash/zallet) fonctionne avec un nœud Zebra et gère les clés et les soldes. Cela remplace zcashd, qui regroupait le nœud et le wallet dans un seul processus.

Pour servir des light wallets shielded, le nœud fonctionne aux côtés d’un indexeur, soit le [lightwalletd](https://github.com/zcash/lightwalletd) bien établi, soit le plus récent [Zaino](https://zechub.wiki/zaino).

Assurez-vous de lire le livre de Zebra pour les instructions d’installation, et rejoignez le serveur Discord R&D pour obtenir de l’aide.

[Github](https://github.com/ZcashFoundation/zebra/)

[Le livre de Zebra](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Le réseau

En exécutant un nœud complet, vous contribuez à renforcer le réseau zcash en soutenant sa décentralisation.

Cela aide à empêcher un contrôle malveillant et à maintenir la résilience du réseau face à certaines formes de perturbation.

Les DNS seeders exposent une liste d’autres nœuds fiables via un serveur intégré. Cela permet aux transactions de se propager à travers le réseau.

### Statistiques du réseau

Voici des exemples de plateformes qui permettent d’accéder aux données du réseau Zcash :

[Explorateur de blocs Zcash](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Vous pouvez également contribuer au développement du réseau en exécutant des tests ou en proposant de nouvelles améliorations et en fournissant des métriques.



### Minage

Les mineurs ont besoin de nœuds complets pour accéder à toutes les RPC liées au minage, telles que getblocktemplate et getmininginfo.

Zcashd permet également le minage vers une coinbase shielded. Les mineurs et les pools de minage ont la possibilité de miner directement afin d’accumuler des ZEC shielded dans une z-address par défaut.

Lisez le [Guide de minage](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou rejoignez la page du forum communautaire pour les [mineurs Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Confidentialité

Exécuter un nœud complet vous permet de vérifier indépendamment toutes les transactions et tous les blocs sur le réseau Zcash.

Exécuter un nœud complet permet d’éviter certains risques pour la confidentialité associés à l’utilisation de services tiers pour vérifier les transactions en votre nom.

Utiliser votre propre nœud permet également de se connecter au réseau via [Tor](https://zcash.github.io/zcash/user/tor.html).
Cela présente l’avantage supplémentaire de permettre à d’autres utilisateurs de se connecter en privé à l’adresse .onion de votre nœud.


**Besoin d’aide ?**

Lisez la [documentation d’assistance](https://zcash.readthedocs.io/en/latest/)

Rejoignez notre [serveur Discord](https://discord.gg/zcash) ou contactez-nous sur [twitter](https://twitter.com/ZecHub)
