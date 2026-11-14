# Zcash Testnet

## Qu'est-ce que le Testnet Zcash ?

Le **Testnet Zcash** est une blockchain parallèle au véritable réseau principal Zcash (Mainnet). Elle reproduit exactement le protocole, les règles et la logique des transactions, avec deux différences essentielles :

1. **Les pièces n'ont aucune valeur monétaire réelle** : elles s'appellent **TAZ**, et non ZEC, et servent uniquement aux tests.  
2. **Les mises à niveau du réseau, les outils et les logiciels y sont testés en premier** avant leur déploiement sur la véritable blockchain Zcash.  

Autrement dit, le Testnet est comme un **bac à sable ou un environnement expérimental** où les développeurs, les auditeurs et les bâtisseurs peuvent essayer des idées sans risquer d'argent réel.


## Pourquoi le Testnet existe-t-il ?

Le Testnet est essentiel au développement d'une blockchain parce que **les blockchains réelles comme Zcash sont immuables** : une fois les transactions confirmées sur le réseau principal, elles ne peuvent plus être annulées. Le Testnet fournit une **réplique sûre** pour expérimenter, tester et déboguer des fonctionnalités avant leur déploiement sur le Mainnet.

### Utilisations du Testnet

#### 1. Développement logiciel et intégration

Les développeurs qui créent des portefeuilles, des exchanges, des logiciels de minage ou des outils de confidentialité peuvent les tester en toute sécurité sur le Testnet. Il est notamment possible de :

- Envoyer et recevoir des transactions  
- Miner de nouveaux blocs avec des pièces TAZ sans valeur  
- Créer des interfaces utilisateur et des API  
- Tester les fonctionnalités de confidentialité des transactions (transparentes ou protégées)  

**Exemple :**  
Des outils comme [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) utilisent le Testnet pour générer des transactions et tester les fonctionnalités d'actifs protégés de Zcash.  

**Scénario concret :**  
Un développeur de portefeuille peut connecter son logiciel à un point de terminaison RPC du Testnet et simuler le cycle de vie complet (création d'adresses, envoi de transactions protégées et vérification des soldes) avant la mise en production sur le Mainnet.

#### 2. Tester les mises à niveau du réseau

Zcash met régulièrement à niveau son protocole de base (p. ex. NU6.1, NU6.2 et Ironwood). Le Testnet active les nouvelles mises à niveau **avant le Mainnet**, ce qui permet aux développeurs et à la communauté de repérer et de corriger les bogues.

**Exemple :**  
Une nouvelle règle de consensus ou un nouveau type de transaction est d'abord déployé sur le Testnet. Une fois les tests réussis, il est activé sur le Mainnet à une hauteur de bloc prédéterminée.

#### 3. Tester les implémentations de nœuds

Le nœud maintenu de Zcash est **Zebra** (le nœud basé sur Rust maintenu par la Zcash Foundation) et le portefeuille maintenu est [Zallet](https://github.com/zcash/zallet). `zcashd`, l'implémentation de nœud d'origine, a atteint son arrêt automatique de fin de support le 18 juillet 2026 et n'est plus maintenu : consultez le [guide de migration de zcashd vers Zebra et Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet). Le Testnet permet de tester les nœuds en conditions réelles sans risque financier.

Les développeurs de nœuds peuvent :

- Valider la propagation des blocs  
- Tester les interfaces RPC  
- Observer le comportement des nœuds sous charge  
- Tester les interactions avec les logiciels de minage  

#### 4. Apprentissage et formation

Les débutants peuvent découvrir les fonctionnalités de Zcash comme le minage, la création de transactions protégées et l'utilisation des adresses unifiées.  
Les tutoriels et la documentation de la communauté donnent accès à des **faucets, des explorateurs et des guides pour le Testnet**.


## Cas d'utilisation concrets du Testnet

### 1. Tests par les développeurs (portefeuille / application)

- Se connecter au Testnet Zcash  
- Demander des TAZ à un faucet  
- Envoyer des transactions protégées  
- Vérifier la confidentialité et la stabilité de l'interface  

Aucun ZEC réel n'est perdu, même en cas d'erreur.

### 2. Tests d'intégration pour les exchanges

- Faire tourner un nœud du Testnet  
- Utiliser les points de terminaison JSON-RPC de Zebrad pour traiter les transactions  
- Tester la logique automatisée de dépôt et de retrait  

Cela garantit un code de production sûr et évite les pertes financières.

### 3. Essais de configuration de minage

- Utiliser des modèles de minage  
- Tester la validation des blocs  
- Observer les récompenses de minage (en TAZ uniquement)  
- Optimiser les performances de minage  

Cela évite les interruptions de service ou les pertes de revenus lors du passage au Mainnet.

### 4. Recherche universitaire et sur le protocole

Les chercheurs peuvent tester des innovations comme la **vérification sans état**, l'**optimisation des preuves à divulgation nulle de connaissance** ou d'autres expériences sur le protocole à l'aide du Testnet.  
Les utilisateurs avancés peuvent aussi faire tourner des **Testnets personnalisés ou des environnements regtest** pour des expériences spécialisées.


## Principales différences entre le Mainnet et le Testnet

| Caractéristique       | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| Valeur des pièces     | ZEC réels        | TAZ (sans valeur monétaire)  |
| Risque                | Risque financier | Sûr pour les tests       |
| Mises à niveau du protocole | Production | Activation anticipée     |
| Récompenses de minage | Émission réelle  | Récompense de test uniquement |
| Utilité du réseau     | Transactions réelles | Tests et développement |

## Idées reçues courantes

- **Les pièces du Testnet ont de la valeur** -> Faux, les TAZ n'ont aucune valeur.  
- **Perdre des pièces du Testnet a des conséquences** -> Faux, aucune valeur réelle n'est perdue.  
- **Le Testnet et le Mainnet sont identiques** -> Faux, le Testnet est souvent réinitialisé et n'est pas sécurisé économiquement comme le Mainnet.

---

## Qu'est-ce que le TAZ ?

Le **TAZ** est la version Testnet des pièces Zcash :  

- Ce n'est pas de l'argent réel ; il ne peut pas être échangé contre des ZEC ni contre de la monnaie fiduciaire  
- Il sert aux tests, au développement et à l'apprentissage  
- Il suit toutes les règles de Zcash : il peut être envoyé, miné et utilisé sur des adresses protégées  

**Exemple :**  
Un développeur peut envoyer 100 TAZ d'une adresse du Testnet à une autre pour tester une fonctionnalité de portefeuille sans risquer de vrais ZEC.  

Considérez le TAZ comme de l'**« argent fictif » pour le Testnet Zcash**.


## Qu'est-ce qu'un faucet ?

Un **faucet** est un service qui distribue gratuitement des pièces TAZ pour les tests :

- Il s'agit généralement de sites web ou d'API  
- L'utilisateur fournit une adresse du Testnet ; le faucet lui envoie une petite quantité de TAZ  
- Cela évite d'avoir à miner des TAZ manuellement  

**Exemple :**  
1. Rendez-vous sur un faucet du Testnet (p. ex. [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/))  
2. Saisissez votre adresse du Testnet  
3. Demandez des TAZ  
4. Recevez instantanément des TAZ pour commencer vos tests  

**Pourquoi c'est important :**  
- Des tests sûrs sans risquer de ZEC  
- Une accessibilité pour les débutants et les développeurs  
- Un prototypage rapide de portefeuilles, d'exchanges et d'applications



## Portefeuilles Zkool et Zingo!

### Zkool

- Portefeuille multicompte pour les utilisateurs avancés de Zcash  
- Prend en charge les phrases de récupération, les clés pour lecture seule et les adresses transparentes et protégées  
- Peut se connecter au Mainnet, au Testnet ou au Regtest via des nœuds complets ou des serveurs lightwallet

### Zingo!

- Portefeuille mobile axé sur la confidentialité et la simplicité  
- Prend en charge les adresses protégées et unifiées  
- Mis à jour pour prendre en charge les protocoles du Testnet (y compris le Testnet NU6)

## Activer le Testnet dans les portefeuilles

### Portefeuille Zkool

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**Conseils :**  
- Le portefeuille peut redémarrer lors du changement de réseau  
- Les comptes ZEC du Mainnet ne sont pas affectés  
- Utilisez un serveur lightwallet du Testnet si cela vous est demandé

### Portefeuille Zingo!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


Une fois le Testnet activé, les portefeuilles peuvent envoyer et recevoir des TAZ, tester des transactions protégées et expérimenter en toute sécurité.


## Après l'activation du Testnet

- Les transactions se comportent comme sur le Mainnet, mais avec des **TAZ sans valeur**  
- Les transactions protégées, les adresses multiples et les fonctionnalités de confidentialité peuvent être testées  
- Les développeurs peuvent déboguer et tester des fonctionnalités sans risquer de vrais ZEC


## Résumé rapide

- Le **Testnet Zcash** est un environnement de type bac à sable, sûr, pour créer, tester et expérimenter  
- Cas d'utilisation : tests par les développeurs, tests de nœuds, intégration des exchanges, recherche et formation  
- Les **pièces TAZ** sont utilisées à la place des ZEC et n'ont aucune valeur réelle  
- Le Testnet est indispensable avant de déployer des fonctionnalités en production sur le Mainnet
