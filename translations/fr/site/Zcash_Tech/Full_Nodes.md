<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nœuds complets

## En bref

- Un nœud complet conserve une copie intégrale de la blockchain Zcash et vérifie chaque nouveau bloc et chaque nouvelle transaction selon les règles de consensus.
- Zebra (`zebrad`) est le nœud à installer aujourd'hui. Zakura est une seconde implémentation, dérivée de Zebra.
- zcashd n'est plus maintenu. Son arrêt de fin de support a été atteint le 18 juillet 2026 à la hauteur de bloc 3417100, et ces nœuds ne démarrent plus.
- Le nœud et le portefeuille sont désormais des programmes distincts. [Zallet](https://github.com/zcash/zallet) fonctionne avec un nœud et détient les clés.
- Faire tourner votre propre nœud vous permet une vérification indépendante et vous évite de devoir faire confiance au serveur de quelqu'un d'autre.

## Explication de base

Un nœud complet est un logiciel qui exécute une copie intégrale de la blockchain d'une cryptomonnaie, ce qui vous donne accès aux fonctionnalités du protocole.

Il conserve un historique complet de toutes les transactions effectuées depuis le bloc de genèse et peut donc vérifier la validité des nouvelles transactions et des nouveaux blocs ajoutés à la blockchain.

## Implémentations de nœuds

### Zebra

Zebra est une implémentation de nœud complet indépendante et prête pour la production du protocole Zcash, créée par la Zcash Foundation et écrite en Rust. Comme zcashd n'est plus maintenu, Zebra (`zebrad`) est le nœud complet recommandé pour les nouveaux déploiements.

Zebra valide les blocs et les transactions, participe au réseau pair-à-pair et expose une interface RPC pour les applications. Le portefeuille est désormais un composant distinct : [Zallet](https://github.com/zcash/zallet) fonctionne avec un nœud Zebra et gère les clés et les soldes. Il remplace zcashd, qui regroupait le nœud et le portefeuille dans un seul processus.

Pour servir les portefeuilles légers protégés, le nœud fonctionne avec un indexeur, soit le bien établi [lightwalletd](https://github.com/zcash/lightwalletd), soit le plus récent [Zaino](https://zechub.wiki/zcash-tech/zaino).

Lisez bien le livre Zebra pour les instructions d'installation, et rejoignez le serveur R&D Discord pour obtenir de l'aide.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Le livre Zebra](https://zebra.zfnd.org)

Consultez [Nœud complet Zebra](/zcash-tech/zebra-full-node) pour les étapes d'installation, la configuration et la configuration matérielle requise.

### Zakura

Zakura est un second nœud complet compatible avec le consensus, dérivé de Zebra et développé par Valar Group avec le projet Tachyon. Il suit les mêmes règles de protocole et ajoute une synchronisation plus rapide, l'élagage des blocs et une couche de compatibilité RPC zcashd. Consultez [Nœud Zakura](/zcash-tech/zakura-node).

### zcashd (retiré)

> **Remarque :** zcashd a été retiré. Electric Coin Company [a annoncé son abandon](https://z.cash/support/zcashd-deprecation/), et l'arrêt automatique de fin de support a été atteint le 18 juillet 2026 à la hauteur de bloc 3417100. Tous les nœuds zcashd 6.20.0 non modifiés se sont arrêtés à cette hauteur et refusent de redémarrer, et le logiciel ne prend pas en charge NU6.3. Utilisez Zebra. Si vous détenez un zcashd `wallet.dat`, suivez le [Guide de migration : de zcashd vers zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd était l'implémentation de nœud complet d'origine pour Zcash, développée et maintenue par Electric Coin Company. Les instructions de compilation ci-dessous sont conservées à titre de référence et pour les opérateurs qui migrent depuis zcashd.

zcashd expose un ensemble d'API via son interface RPC. Ces API fournissent des fonctions qui permettent à des applications externes d'interagir avec le nœud.

[lightwalletd](https://github.com/zcash/lightwalletd) est un exemple d'application qui utilise un nœud complet pour permettre aux développeurs de créer et de maintenir des portefeuilles légers protégés adaptés aux mobiles, sans avoir à interagir directement avec zcashd.

[Liste complète des commandes RPC prises en charge](https://zcash.github.io/rpc/)

[Le livre zcashd](https://zcash.github.io/zcash/)

#### Démarrer un nœud (Linux)

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

[Guide pour zcashd sur Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Implications pratiques

### Le réseau

En faisant tourner un nœud complet, vous contribuez à renforcer le réseau Zcash en soutenant sa décentralisation.

Cela aide à empêcher la prise de contrôle par des adversaires et à maintenir la résilience du réseau face à certaines formes de perturbation.

Les DNS seeders exposent une liste d'autres nœuds fiables via un serveur intégré. Cela permet aux transactions de se propager dans tout le réseau.

### Statistiques du réseau

Voici quelques exemples de plateformes qui donnent accès aux données du réseau Zcash :

[Explorateur de blocs Zcash](https://mainnet.zcashexplorer.app)

[Données réseau Coin Metrics](https://docs.coinmetrics.io/network-data/network-data-overview) — documentation des métriques et liens vers la couverture actuelle des actifs.

Vous pouvez également contribuer au développement du réseau en exécutant des tests, en proposant de nouvelles améliorations et en fournissant des métriques.

### Minage

Les mineurs ont besoin de nœuds complets pour accéder à toutes les RPC liées au minage, comme getblocktemplate et getmininginfo.

zcashd permet également le minage vers une coinbase protégée. Les mineurs et les pools de minage ont la possibilité de miner directement pour accumuler par défaut des ZEC protégés dans une z-adresse.

Lisez [Le guide du minage](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ou rejoignez la page du forum communautaire dédiée aux [mineurs Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Confidentialité

Faire tourner un nœud complet vous permet de vérifier de manière indépendante toutes les transactions et tous les blocs du réseau Zcash.

Faire tourner un nœud complet évite certains risques pour la confidentialité liés à l'utilisation de services tiers qui vérifient les transactions à votre place.

Utiliser votre propre nœud vous permet aussi de vous connecter au réseau via [Tor](https://zcash.github.io/zcash/user/tor.html).
Cela présente l'avantage supplémentaire de permettre à d'autres utilisateurs de se connecter de manière confidentielle à l'adresse .onion de votre nœud.

## Erreurs courantes

- Compiler zcashd à partir des instructions ci-dessus en s'attendant à obtenir un nœud fonctionnel. Ces binaires s'arrêtent à la hauteur d'abandon.
- Faire tourner un nœud en supposant que votre portefeuille mobile l'utilise désormais. Un portefeuille léger continue de communiquer avec le serveur pour lequel il est configuré tant que vous ne le dirigez pas vers le vôtre. Consultez [Nœuds pour portefeuilles légers](/zcash-tech/lightwallet-nodes).
- Faire tourner uniquement `zebrad` en s'attendant à ce que les portefeuilles légers s'y connectent. Le nœud a besoin d'un indexeur à ses côtés, soit lightwalletd, soit [Zaino](/zcash-tech/zaino).
- Chercher les RPC de portefeuille sur le nœud. Les clés et les soldes ont été déplacés vers Zallet.

## Pages connexes

- [Nœud complet Zebra](/zcash-tech/zebra-full-node) - installer, configurer et faire tourner le nœud recommandé
- [Nœud Zakura](/zcash-tech/zakura-node) - la seconde implémentation de nœud, dérivée de Zebra
- [Nœuds pour portefeuilles légers](/zcash-tech/lightwallet-nodes) - les serveurs que les portefeuilles légers interrogent
- [Zaino](/zcash-tech/zaino) - l'indexeur Rust qui sert les portefeuilles légers
- [Synchronisation des portefeuilles Zcash](/zcash-tech/zcash-wallet-syncing) - pourquoi la synchronisation fonctionne ainsi

## Pour aller plus loin

Lisez la [documentation d'assistance](https://zcash.readthedocs.io/en/latest/)

Rejoignez notre [serveur Discord](https://discord.gg/zcash) ou contactez-nous sur [X](https://X.com/ZecHub)
