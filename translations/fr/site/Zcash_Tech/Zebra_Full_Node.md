<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

## Introduction au nœud Zebra

Présentation de Zebra : révolutionner l'infrastructure des nœuds Zcash avec Rust

Découvrez Zebra, une réalisation majeure en tant que premier nœud Zcash conçu entièrement en Rust. Intégré de manière fluide au réseau pair-à-pair Zcash, Zebra constitue un outil essentiel qui renforce la résilience du réseau. Grâce à ses fonctions fondamentales de validation et de diffusion des transactions, ainsi qu'au maintien rigoureux de l'état de la blockchain Zcash, Zebra contribue à une infrastructure réseau plus décentralisée.

## Avantages par rapport à l'implémentation du nœud Zcashd
Contrairement au nœud Zcash d'origine, zcashd, qui tire ses origines de la base de code fondatrice de Bitcoin et qui est développé par Electric Coin Company, notre implémentation se présente comme une entité autonome. Développé à partir de zéro avec un accent sur la sécurité et l'efficacité, Zebra exploite la puissance du langage Rust, sûr pour la mémoire.

Malgré leurs origines distinctes, zcashd et Zebra respectent tous deux le même protocole, ce qui facilite une communication fluide et l'interopérabilité entre eux. Cette innovation ne se contente pas d'élargir l'écosystème Zcash, elle établit également une nouvelle norme pour le développement des nœuds blockchain.

## Instructions pour Zebra Launcher

Vous pouvez exécuter Zebra en utilisant notre image Docker ou le compiler manuellement. Veuillez consulter la section Configuration requise du système.

### Utilisation de Docker :

Pour exécuter facilement notre dernière version et la synchroniser jusqu'à la pointe de la chaîne, lancez la commande suivante :

```

docker run zfnd/zebra:latest

```

Pour des instructions plus complètes et des informations détaillées, veuillez consulter notre [documentation Docker](https://zebra.zfnd.org/user/docker.html).

### Compiler Zebra :

La compilation de Zebra nécessite Rust, libclang et un compilateur C++.

- Assurez-vous d'avoir installé la dernière version stable de Rust, car Zebra est testé exclusivement avec celle-ci.
- Les dépendances de compilation nécessaires incluent :
  - libclang (également connu sous le nom de libclang-dev ou llvm-dev)
  - clang ou un autre compilateur C++ (tel que g++ pour toutes les plateformes ou Xcode pour macOS)
  - protoc (compilateur Protocol Buffers) avec l'option *--experimental_allow_proto3_optional*, introduite dans Protocol Buffers v3.12.0 (publiée le 16 mai 2020).



### Dépendances sur Arch :

Après vous être assuré que les dépendances sont satisfaites, procédez à la compilation et à l'installation de Zebra à l'aide de la commande suivante :

```

cargo install --locked zebrad

```

Démarrez Zebra en exécutant :

```
zebrad start

```


## Configurations et fonctionnalités optionnelles :


### - Initialisation du fichier de configuration :

  - Générez un fichier de configuration à l'aide de la commande :
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - Le fichier *zebrad.toml* généré sera placé dans le répertoire de préférences par défaut de Linux. Pour les emplacements par défaut des autres systèmes d'exploitation, consultez notre documentation.



### - Configuration des barres de progression :

  - Configurez *tracing.progress_bar* dans votre *zebrad.toml* pour afficher des métriques cruciales dans le terminal à l'aide de barres de progression. Remarque : un problème connu existe, selon lequel les estimations des barres de progression peuvent devenir excessivement grandes.



### - Configuration du minage :

  - Zebra peut être adapté au minage en spécifiant une *MINER_ADDRESS* et un mappage de port dans Docker. Vous trouverez davantage de détails dans notre [documentation sur la prise en charge du minage](https://zebra.zfnd.org/user/mining-docker.html).


### - Fonctionnalités de compilation personnalisées :

  - Étendez les fonctionnalités de Zebra avec des options Cargo supplémentaires telles que les métriques Prometheus, la surveillance Sentry, la prise en charge expérimentale d'Elasticsearch, et bien plus encore.

  - Combinez plusieurs fonctionnalités en les indiquant comme paramètres de l'option `--features` lors de l'installation.


### Remarque : certaines fonctionnalités de débogage et de surveillance sont désactivées dans les builds de publication afin d'optimiser les performances.

Pour une liste complète des fonctionnalités expérimentales et destinées aux développeurs, veuillez consulter notre [documentation API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# Configuration requise du système et configuration réseau pour Zebra

Pour garantir des performances et une fiabilité optimales, nous recommandons la configuration système suivante pour compiler et exécuter zebrad, le nœud Zcash révolutionnaire entièrement conçu en Rust :

### Configuration requise du système :
- CPU : 4 cœurs CPU
- RAM : 16 Go
- Espace disque : 300 Go d'espace disque disponible pour compiler les binaires et stocker l'état mis en cache de la chaîne
- Réseau : connexion réseau de 100 Mbps avec un minimum de 300 Go de téléversements et téléchargements par mois


Veuillez noter que la suite de tests de Zebra peut prendre plus d'une heure à se terminer selon les caractéristiques de votre machine. Bien que des systèmes plus lents puissent être capables de compiler et d'exécuter Zebra, nous n'avons pas encore établi de limites de performance précises par le biais de tests.


### Exigences de stockage :
- Zebra utilise environ 300 Go pour les données Mainnet en cache et 10 Go pour les données Testnet en cache. Attendez-vous à ce que l'utilisation du disque augmente au fil du temps.
- La base de données est régulièrement nettoyée, en particulier lors des arrêts ou des redémarrages, afin de garantir l'intégrité des données. Les modifications incomplètes dues à des arrêts forcés ou à des paniques sont annulées au redémarrage de Zebra.


### Exigences réseau et ports :
- Zebra utilise les ports TCP suivants pour les connexions entrantes et sortantes :
  - 8233 pour Mainnet
  - 18233 pour Testnet
- Configurer Zebra avec une valeur listen_addr spécifique permet d'annoncer cette adresse pour les connexions entrantes. Bien que les connexions sortantes soient essentielles pour la synchronisation, les connexions entrantes sont facultatives.
- L'accès aux seeders DNS de Zcash est nécessaire via le résolveur DNS du système d'exploitation (généralement le port 53).
- Bien que Zebra puisse établir des connexions sortantes sur n'importe quel port, zcashd préfère des pairs sur les ports par défaut afin d'atténuer les attaques DDoS sur d'autres réseaux.


### Utilisation réseau typique sur Mainnet :
- Synchronisation initiale : un téléchargement de 300 Go est nécessaire pour la synchronisation initiale, avec une croissance attendue des téléchargements ultérieurs.
- Mises à jour continues : attendez-vous à des téléversements et téléchargements quotidiens allant de 10 Mo à 10 Go, selon la taille des transactions des utilisateurs et les requêtes des pairs.
- Zebra lance une synchronisation initiale à chaque changement de version interne de la base de données, ce qui peut potentiellement nécessiter des téléchargements complets de la chaîne lors des mises à niveau de version.
- Les pairs ayant une latence aller-retour de 2 secondes ou moins sont préférés. Si la latence dépasse ce seuil, veuillez soumettre un ticket pour obtenir de l'aide.


En suivant ces recommandations et configurations, vous pouvez maximiser l'efficacité et l'efficience de Zebra au sein du réseau Zcash. Si vous rencontrez des problèmes ou avez besoin d'une assistance supplémentaire, notre équipe d'assistance est prête à vous guider.


Voici le lien vers le guide d'installation du nœud Zebra :
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra
