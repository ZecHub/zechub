<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra Nœud complet

## TL;DR

- Zebra (`zebrad`) est le nœud complet Zcash écrit en Rust et maintenu par la Zcash Foundation.
- Il valide les blocs et les transactions, conserve l’état de la chaîne et communique avec d’autres nœuds sur le réseau pair à pair.
- Zebra et zcashd implémentaient le même protocole et pouvaient interopérer. Depuis le retrait de zcashd, Zebra assure le rôle de consensus.
- Deux façons de l’exécuter : l’image Docker `zfnd/zebra`, ou une compilation depuis les sources.
- La configuration matérielle recommandée est de 4 cœurs CPU, 16 Go de RAM et 300 Go d’espace disque. Le minimum est de 2 cœurs et 4 Go de RAM, avec les mêmes 300 Go d’espace disque.

## Explication générale

Zebra est le premier nœud Zcash entièrement écrit en Rust. Il fonctionne sur le réseau pair à pair Zcash, où il valide et diffuse les transactions tout en conservant l’état de la blockchain. Disposer d’une deuxième implémentation indépendante rend l’infrastructure du réseau moins dépendante d’une seule base de code.

### Zebra et zcashd

Le nœud Zcash original, zcashd, a été développé par la Electric Coin Company à partir de la base de code de Bitcoin. Zebra a été écrit de zéro en Rust, un langage sûr pour la mémoire, en mettant l’accent sur la sécurité et l’efficacité.

Les deux implémentations suivent le même protocole et pouvaient donc communiquer et interopérer. zcashd a atteint son arrêt de fin de support le 18 juillet 2026 et ne démarre plus, ce qui laisse Zebra et Zakura comme implémentations de nœuds utilisées. Consultez [Nœuds complets](/zcash-tech/full-nodes) pour une vue d’ensemble plus large.

## Exécuter Zebra

Vous pouvez exécuter Zebra à l’aide de l’image Docker, ou le compiler manuellement. Veuillez consulter la section Configuration système requise.

### Utilisation de Docker

Pour exécuter la dernière version et la synchroniser avec la pointe de la chaîne, lancez la commande suivante :

```

docker run zfnd/zebra:latest

```

Pour des instructions complètes, consultez la [documentation Docker](https://zebra.zfnd.org/user/docker.html).

### Compiler Zebra

La compilation de Zebra requiert Rust, libclang et un compilateur C++.

- Assurez-vous d’avoir installé la dernière version stable de Rust, car Zebra est exclusivement testé avec celle-ci.
- Les dépendances de compilation nécessaires comprennent :
  - libclang (également appelé libclang-dev ou llvm-dev)
  - clang ou un autre compilateur C++ (tel que g++ pour toutes les plateformes ou Xcode pour macOS)
  - protoc (compilateur Protocol Buffers) avec le drapeau *--experimental_allow_proto3_optional*, introduit dans Protocol Buffers v3.12.0 (publié le 16 mai 2020).

### Installer et démarrer

Sous Linux x86_64 ou aarch64 avec glibc 2.34 ou une version plus récente (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), vous pouvez ignorer les dépendances de compilation et installer un binaire précompilé signé :

```
cargo binstall zebrad
```

Les mêmes binaires sont joints à chaque version de GitHub sous le nom de `zebrad-<version>-<target>.tar.gz`, chacun avec une somme de contrôle SHA-256, une attestation de provenance de compilation Sigstore et une signature Cosign. Sur les plateformes plus anciennes, utilisez l’image Docker ou compilez depuis les sources.

Pour compiler depuis les sources, récupérez le code et compilez le binaire de publication :

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Démarrez le nœud avec :

```
target/release/zebrad start
```

Guide d’installation : [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Configurations et fonctionnalités optionnelles

### Initialisation du fichier de configuration

  - Générez un fichier de configuration à l’aide de la commande :

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Le fichier *zebrad.toml* généré sera placé dans le répertoire de préférences par défaut de Linux. Pour connaître les emplacements par défaut des autres systèmes d’exploitation, consultez la documentation.

### Configuration des barres de progression

  - Configurez *tracing.progress_bar* dans votre fichier *zebrad.toml* pour afficher des métriques clés dans le terminal à l’aide de barres de progression. Remarque : un problème connu peut faire devenir les estimations des barres de progression extrêmement élevées.

### Configuration du minage

  - Zebra peut être configuré pour le minage en spécifiant une *MINER_ADDRESS* et un mappage de ports dans Docker. Vous trouverez plus de détails dans la [documentation sur la prise en charge du minage](https://zebra.zfnd.org/user/mining-docker.html).

### Fonctionnalités de compilation personnalisées

  - Étendez les fonctionnalités de Zebra avec des fonctionnalités Cargo supplémentaires, telles que les métriques Prometheus, la surveillance Sentry, la prise en charge expérimentale d’Elasticsearch, et bien plus.

  - Combinez plusieurs fonctionnalités en les indiquant comme paramètres du drapeau `--features` lors de l’installation.

  - Certaines fonctionnalités de débogage et de surveillance sont désactivées dans les compilations de publication afin d’optimiser les performances. Pour consulter la liste complète des fonctionnalités expérimentales et destinées aux développeurs, consultez la [documentation de l’API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Configuration système requise et configuration réseau

### Configuration recommandée

- CPU : 4 cœurs CPU
- RAM : 16 Go
- Espace disque : 300 Go d’espace disque disponible pour compiler les binaires et stocker l’état mis en cache de la chaîne
- Réseau : connexion réseau de 100 Mbps avec un minimum de 300 Go de téléversements et de téléchargements par mois

### Configuration minimale

- CPU : 2 cœurs CPU
- RAM : 4 Go
- Espace disque : 300 Go d’espace disque disponible

La suite de tests de Zebra peut prendre plus d’une heure selon les caractéristiques de votre machine. Les systèmes plus lents peuvent compiler et exécuter Zebra. Les limites précises de performances n’ont pas été établies par des tests.

### Exigences en matière de disque

- Zebra utilise environ 300 Go pour les données Mainnet mises en cache et 10 Go pour les données Testnet mises en cache. Prévoyez une augmentation de l’utilisation du disque au fil du temps.
- La base de données est nettoyée périodiquement, ainsi qu’à l’arrêt ou au redémarrage. Les modifications sont validées à l’aide de transactions de base de données. Les modifications incomplètes causées par un arrêt forcé ou une panique sont annulées lors du prochain démarrage de Zebra.

### Exigences réseau et ports

- Zebra utilise les ports TCP suivants pour les connexions entrantes et sortantes :
  - 8233 pour Mainnet
  - 18233 pour Testnet
- Configurer Zebra avec une adresse listen_addr spécifique annonce cette adresse pour les connexions entrantes. Les connexions sortantes sont requises pour la synchronisation ; les connexions entrantes sont facultatives.
- L’accès aux serveurs DNS seeders de Zcash est nécessaire via le résolveur DNS du système d’exploitation (généralement le port 53).
- Zebra peut établir des connexions sortantes sur n’importe quel port. zcashd préfère les pairs utilisant les ports par défaut afin d’éviter d’être utilisé pour des attaques DDoS contre d’autres réseaux.

### Utilisation réseau Mainnet typique

- Synchronisation initiale : un téléchargement de 300 Go est requis pour la synchronisation initiale, et ce chiffre devrait augmenter.
- Mises à jour continues : téléversements et téléchargements quotidiens allant de 10 Mo à 10 Go, selon la taille des transactions des utilisateurs et les requêtes des pairs.
- Zebra lance une synchronisation initiale à chaque changement de version de la base de données interne, ce qui peut impliquer un téléchargement complet de la chaîne lors des mises à niveau de version.
- Les pairs ayant une latence aller-retour de 2 secondes ou moins sont privilégiés. Si la latence dépasse ce seuil, ouvrez un ticket dans le dépôt Zebra.

## Erreurs courantes

- Dimensionner le disque pour aujourd’hui. L’état Mainnet mis en cache approche déjà les 300 Go et continue de croître.
- Attendre des RPC de wallet de `zebrad`. Les clés et les soldes se trouvent dans [Zallet](https://github.com/zcash/zallet), un programme distinct.
- Exécuter `zebrad` seul et s’attendre à ce que les wallets légers se connectent. Ce chemin requiert un indexeur, soit lightwalletd, soit [Zaino](/zcash-tech/zaino).
- Considérer une resynchronisation inattendue comme une anomalie. Un changement de version de la base de données en déclenche une par conception.

## Pages connexes

- [Nœuds complets](/zcash-tech/full-nodes) - ce que fait un nœud complet et quelles implémentations existent
- [Zakura Nœud](/zcash-tech/zakura-node) - un nœud dérivé de Zebra avec une synchronisation plus rapide et l’élagage
- [Zaino](/zcash-tech/zaino) - l’indexeur Rust qui sert les wallets légers
- [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes) - les serveurs interrogés par les wallets légers
- [Zcash Guide de minage](/using-zcash/zcash-mining-guide) - miner avec votre propre nœud

## Pour aller plus loin

- [Le livre Zebra](https://zebra.zfnd.org)
- [Zebra sur GitHub](https://github.com/ZcashFoundation/zebra/)
- [Configuration système requise](https://zebra.zfnd.org/user/requirements.html)
