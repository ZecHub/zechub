<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nœud complet Zebra

## En bref

- Zebra (`zebrad`) est le nœud complet Zcash écrit en Rust et maintenu par la Zcash Foundation.
- Il valide les blocs et les transactions, conserve l'état de la chaîne et communique avec les autres nœuds via le réseau pair-à-pair.
- Zebra et zcashd implémentaient le même protocole et pouvaient interopérer. Depuis le retrait de zcashd, c'est Zebra qui assure le rôle de consensus.
- Il existe deux façons de l'exécuter : l'image `zfnd/zebra` Docker ou une compilation à partir des sources.
- La configuration matérielle recommandée est de 4 cœurs de processeur, 16 Go de RAM et 300 Go de disque. Le minimum est de 2 cœurs et 4 Go de RAM, avec les mêmes 300 Go de disque.

## Explication de base

Zebra est le premier nœud Zcash entièrement écrit en Rust. Il fait partie du réseau pair-à-pair Zcash, où il valide et diffuse les transactions et conserve l'état de la blockchain. Disposer d'une seconde implémentation indépendante rend l'infrastructure du réseau moins dépendante d'une base de code unique.

### Zebra et zcashd

Le nœud Zcash d'origine, zcashd, a été développé par l'Electric Coin Company à partir de la base de code de Bitcoin. Zebra a été écrit de zéro en Rust, un langage sûr en mémoire, en mettant l'accent sur la sécurité et l'efficacité.

Les deux implémentations suivent le même protocole et pouvaient donc communiquer et interopérer. zcashd a atteint son arrêt de fin de support le 18 juillet 2026 et ne démarre plus, ce qui laisse Zebra et Zakura comme implémentations de nœud en service. Consultez [Nœuds complets](/zcash-tech/full-nodes) pour une vue d'ensemble.

## Exécuter Zebra

Vous pouvez exécuter Zebra à l'aide de l'image Docker ou le compiler manuellement. Veuillez consulter la section Configuration requise.

### Utilisation de Docker

Pour exécuter la dernière version et la synchroniser jusqu'au sommet de la chaîne, exécutez la commande suivante :

```

docker run zfnd/zebra:latest

```

Pour des instructions complètes, reportez-vous à la [documentation Docker](https://zebra.zfnd.org/user/docker.html).

### Compiler Zebra

La compilation de Zebra nécessite Rust, libclang et un compilateur C++.

- Assurez-vous d'avoir installé la dernière version stable de Rust, car Zebra est testé exclusivement avec celle-ci.
- Les dépendances de compilation nécessaires comprennent :
  - libclang (également appelé libclang-dev ou llvm-dev)
  - clang ou un autre compilateur C++ (comme g++ pour toutes les plateformes ou Xcode pour macOS)
  - protoc (compilateur Protocol Buffers) avec l'option *--experimental_allow_proto3_optional*, introduite dans Protocol Buffers v3.12.0 (publiée le 16 mai 2020).

### Installation et démarrage

Sur Linux x86_64 ou aarch64 avec glibc 2.34 ou plus récent (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), vous pouvez vous passer des dépendances de compilation et installer un binaire précompilé signé :

```
cargo binstall zebrad
```

Les mêmes binaires sont joints à chaque version de GitHub sous la forme `zebrad-<version>-<target>.tar.gz`, chacun accompagné d'une somme de contrôle SHA-256, d'une attestation de provenance de compilation Sigstore et d'une signature Cosign. Sur les plateformes plus anciennes, utilisez l'image Docker ou compilez à partir des sources.

Pour compiler à partir des sources, récupérez le code et compilez le binaire de version :

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Démarrez le nœud avec :

```
target/release/zebrad start
```

Guide d'installation : [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Configurations et fonctionnalités facultatives

### Initialisation du fichier de configuration

  - Générez un fichier de configuration à l'aide de la commande :

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Le fichier *zebrad.toml* généré sera placé dans le répertoire de préférences par défaut de Linux. Pour les emplacements par défaut des autres systèmes d'exploitation, reportez-vous à la documentation.

### Configuration des barres de progression

  - Configurez *tracing.progress_bar* dans votre fichier *zebrad.toml* pour afficher les indicateurs clés dans le terminal sous forme de barres de progression. Remarque : il existe un problème connu qui peut rendre les estimations des barres de progression excessivement élevées.

### Configuration du minage

  - Zebra peut être configuré pour le minage en indiquant une *MINER_ADDRESS* et une redirection de port dans Docker. Vous trouverez plus de détails dans la [documentation sur la prise en charge du minage](https://zebra.zfnd.org/user/mining-docker.html).

### Fonctionnalités de compilation personnalisées

  - Étendez les fonctionnalités de Zebra grâce à des fonctionnalités Cargo supplémentaires, comme les métriques Prometheus, la surveillance Sentry, la prise en charge expérimentale d'Elasticsearch, et plus encore.

  - Combinez plusieurs fonctionnalités en les indiquant comme paramètres de l'option `--features` lors de l'installation.

  - Certaines fonctionnalités de débogage et de surveillance sont désactivées dans les versions de production afin d'optimiser les performances. Pour la liste complète des fonctionnalités expérimentales et destinées aux développeurs, consultez la [documentation de l'API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Configuration requise et configuration réseau

### Configuration recommandée

- Processeur : 4 cœurs
- RAM : 16 Go
- Espace disque : 300 Go d'espace disque disponible pour compiler les binaires et stocker l'état de la chaîne en cache
- Réseau : connexion de 100 Mbit/s avec au moins 300 Go d'envoi et de réception par mois

### Configuration minimale

- Processeur : 2 cœurs
- RAM : 4 Go
- Espace disque : 300 Go d'espace disque disponible

La suite de tests de Zebra peut prendre plus d'une heure selon les caractéristiques de votre machine. Les systèmes plus lents peuvent compiler et exécuter Zebra. Les limites de performance précises n'ont pas été établies par des tests.

### Exigences en matière de disque

- Zebra utilise environ 300 Go pour les données Mainnet en cache et 10 Go pour les données Testnet en cache. Attendez-vous à ce que l'utilisation du disque augmente avec le temps.
- La base de données est nettoyée périodiquement, ainsi qu'à l'arrêt ou au redémarrage. Les modifications sont validées à l'aide de transactions de base de données. Les modifications incomplètes causées par un arrêt forcé ou une panique sont annulées au prochain démarrage de Zebra.

### Exigences réseau et ports

- Zebra utilise les ports TCP suivants pour les connexions entrantes et sortantes :
  - 8233 pour Mainnet
  - 18233 pour Testnet
- Configurer Zebra avec un listen_addr spécifique annonce cette adresse pour les connexions entrantes. Les connexions sortantes sont nécessaires à la synchronisation ; les connexions entrantes sont facultatives.
- L'accès aux serveurs DNS d'amorçage de Zcash est nécessaire via le résolveur DNS du système d'exploitation (généralement le port 53).
- Zebra peut établir des connexions sortantes sur n'importe quel port. zcashd privilégie les pairs utilisant les ports par défaut afin d'éviter d'être utilisé pour des attaques DDoS contre d'autres réseaux.

### Utilisation réseau typique sur Mainnet

- Synchronisation initiale : un téléchargement de 300 Go est nécessaire pour la synchronisation initiale, et ce chiffre devrait augmenter.
- Mises à jour continues : envois et réceptions quotidiens allant de 10 Mo à 10 Go, selon la taille des transactions des utilisateurs et les requêtes des pairs.
- Zebra lance une synchronisation initiale à chaque changement de version interne de la base de données, ce qui peut impliquer le téléchargement complet de la chaîne lors des mises à niveau de version.
- Les pairs ayant une latence aller-retour de 2 secondes ou moins sont privilégiés. Si la latence dépasse ce seuil, ouvrez un ticket dans le dépôt Zebra.

## Erreurs courantes

- Dimensionner le disque pour les besoins actuels. L'état Mainnet en cache avoisine déjà les 300 Go et continue de croître.
- Attendre des RPC de portefeuille de la part de `zebrad`. Les clés et les soldes se trouvent dans [Zallet](https://github.com/zcash/zallet), un programme distinct.
- Exécuter `zebrad` seul en s'attendant à ce que les portefeuilles légers s'y connectent. Cela nécessite un indexeur, soit lightwalletd, soit [Zaino](/zcash-tech/zaino).
- Considérer une resynchronisation inattendue comme une panne. Un changement de version de la base de données en déclenche une par conception.

## Pages connexes

- [Nœuds complets](/zcash-tech/full-nodes) - le rôle d'un nœud complet et les implémentations existantes
- [Nœud Zakura](/zcash-tech/zakura-node) - un nœud dérivé de Zebra avec une synchronisation plus rapide et l'élagage
- [Zaino](/zcash-tech/zaino) - l'indexeur Rust qui dessert les portefeuilles légers
- [Nœuds pour portefeuilles légers](/zcash-tech/lightwallet-nodes) - les serveurs interrogés par les portefeuilles légers
- [Guide de minage Zcash](/using-zcash/zcash-mining-guide) - miner avec votre propre nœud

## Pour aller plus loin

- [Le livre Zebra](https://zebra.zfnd.org)
- [Zebra sur GitHub](https://github.com/ZcashFoundation/zebra/)
- [Configuration requise](https://zebra.zfnd.org/user/requirements.html)
