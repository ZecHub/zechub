# Zcash Testnet

## Qu'est-ce que le Zcash Testnet ?

**Zcash Testnet** est une blockchain parallèle au véritable réseau principal Zcash (Mainnet) qui réplique exactement le protocole, les règles et la logique des transactions - mais avec deux différences essentielles :

1. **Les coins n'ont aucune valeur monétaire réelle** - ils sont appelés **TAZ**, et non ZEC, et sont utilisés uniquement pour les tests.  
2. **Les mises à niveau du réseau, les outils et les logiciels y sont testés en premier** avant leur déploiement sur la véritable blockchain Zcash.  

En d'autres termes, le Testnet est comme un **bac à sable ou un environnement expérimental** où les développeurs, les auditeurs et les builders peuvent essayer des idées sans risquer de l'argent réel.


## Pourquoi le Testnet existe-t-il ?

Le Testnet est crucial pour le développement blockchain, car **les blockchains réelles comme Zcash sont immuables** - une fois les transactions confirmées sur le réseau principal, elles ne peuvent pas être annulées. Le Testnet fournit une **réplique sûre** pour expérimenter, tester et déboguer des fonctionnalités avant de les déployer sur Mainnet.

### Cas d'utilisation du Testnet

#### 1. Développement logiciel et intégration

Les développeurs qui créent des wallets, des exchanges, des logiciels de minage ou des outils de confidentialité peuvent les tester en toute sécurité sur le Testnet. Les possibilités incluent :

- Envoyer et recevoir des transactions  
- Miner de nouveaux blocs avec des coins TAZ sans valeur  
- Construire des interfaces utilisateur et des API  
- Tester les fonctionnalités de confidentialité des transactions (transparentes vs blindées)  

**Exemple :**  
Des outils comme [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) utilisent le Testnet pour générer des transactions et tester les fonctionnalités d'actifs blindés de Zcash.  

**Scénario réel :**  
Un développeur de wallet peut connecter son logiciel à un endpoint RPC Testnet et simuler le cycle de vie complet - création d'adresses, envoi de transactions blindées et validation des soldes - avant de passer en production sur Mainnet.

#### 2. Test des mises à niveau du réseau

Zcash met à niveau son protocole principal périodiquement (par ex. Nu5, Nu6). Le Testnet active les nouvelles mises à niveau **avant Mainnet**, ce qui permet aux développeurs et à la communauté d'identifier et de corriger les bugs.

**Exemple :**  
Une nouvelle règle de consensus ou un nouveau type de transaction est d'abord déployé sur le Testnet. Après des tests réussis, il est activé sur Mainnet à une hauteur de bloc prédéfinie.

#### 3. Test des implémentations de nœuds

Zcash prend en charge plusieurs implémentations logicielles de nœuds - `zcashd` et **Zebra** (nœud basé sur Rust maintenu par la Zcash Foundation). Le Testnet permet de tester les nœuds dans des conditions réelles sans risque financier.  

Les développeurs de nœuds peuvent :

- Valider la propagation des blocs  
- Tester les interfaces RPC  
- Observer le comportement des nœuds sous charge  
- Tester les interactions avec les logiciels de minage  

#### 4. Apprentissage et éducation

Les débutants peuvent apprendre les fonctionnalités de Zcash telles que le minage, la création de transactions blindées et l'utilisation des Unified Address.  
Les tutoriels et la documentation de la communauté donnent accès à des **faucets, explorateurs et guides Testnet**.


## Cas d'utilisation réels du Testnet

### 1. Tests développeur (Wallet / App)

- Se connecter au Zcash Testnet  
- Demander des TAZ à un faucet  
- Envoyer des transactions blindées  
- Vérifier la confidentialité et la stabilité de l'interface utilisateur  

Aucun ZEC réel n'est perdu, même en cas d'erreur.

### 2. Tests d'intégration d'exchange

- Exécuter un nœud Testnet  
- Utiliser les endpoints JSON-RPC de Zebrad pour traiter les transactions  
- Tester la logique automatisée de dépôt/retrait  

Cela garantit un code de production sûr et évite les pertes financières.

### 3. Essais de configuration de minage

- Utiliser des modèles de minage  
- Tester la validation des blocs  
- Observer les récompenses de minage (TAZ uniquement)  
- Ajuster les performances de minage  

Cela évite les temps d'arrêt ou les pertes de revenus lors du passage à Mainnet.

### 4. Recherche académique / protocolaire

Les chercheurs peuvent tester des innovations comme la **vérification sans état**, **l'optimisation des preuves à divulgation nulle de connaissance**, ou d'autres expériences de protocole à l'aide du Testnet.  
Les utilisateurs avancés peuvent également exécuter des **Testnets personnalisés ou des environnements regtest** pour des expériences spécialisées.


## Différences clés entre Mainnet et Testnet

| Feature               | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| Valeur des coins      | ZEC réel         | TAZ (sans valeur monétaire) |
| Risque                | Risque financier | Sûr pour les tests       |
| Mises à niveau du protocole | Production | Activation anticipée     |
| Récompenses de minage | Émission réelle  | Récompense de test uniquement |
| Utilité du réseau     | Transactions en direct | Tests et développement |

## Idées reçues courantes

- **Les coins du Testnet valent quelque chose** -> Faux, les TAZ ont une valeur nulle.  
- **Perdre des coins du Testnet a de l'importance** -> Faux, aucune valeur réelle n'est perdue.  
- **Le Testnet et Mainnet sont identiques** -> Faux, le Testnet est souvent réinitialisé et n'est pas sécurisé économiquement comme Mainnet.

---

## Qu'est-ce que TAZ ?

**TAZ** est la version Testnet des coins Zcash :  

- Ce n'est pas de l'argent réel ; ne peut pas être échangé contre des ZEC ou de la monnaie fiat  
- Utilisé pour les tests, le développement et l'apprentissage  
- Suit toutes les règles de Zcash : peut être envoyé, miné et utilisé dans des adresses blindées  

**Exemple :**  
Un développeur peut envoyer 100 TAZ d'une adresse Testnet à une autre pour tester une fonctionnalité de wallet sans risquer de vrais ZEC.  

Considérez TAZ comme **"de l'argent factice" pour le Zcash Testnet**.


## Que sont les faucets ?

Un **faucet** est un service qui distribue gratuitement des coins TAZ pour les tests :

- Généralement des sites web ou des API  
- Les utilisateurs fournissent une adresse Testnet ; le faucet envoie une petite quantité de TAZ  
- Évite d'avoir à miner des TAZ manuellement  

**Exemple :**  
1. Visitez un faucet Testnet (par ex., [testnet.zecfaucet.com](https://testnet.zecfaucet.com) | [fauzec.com](https://fauzec.com/))  
2. Saisissez votre adresse Testnet  
3. Demandez des TAZ  
4. Recevez instantanément des TAZ pour commencer les tests  

**Pourquoi c'est important :**  
- Tests sûrs sans risquer de ZEC  
- Accessibilité pour les débutants et les développeurs  
- Prototypage rapide pour les wallets, exchanges et apps



## Zkool et Zingo! Wallets

### Zkool

- Wallet multi-comptes pour les utilisateurs avancés de Zcash  
- Prend en charge les seed phrases, les Viewing Key, les adresses transparentes et blindées  
- Peut se connecter à Mainnet, Testnet ou Regtest via des nœuds complets ou des serveurs lightwallet

### Zingo!

- Wallet mobile axé sur la confidentialité et la simplicité  
- Prend en charge les adresses blindées et unifiées  
- Mis à jour pour prendre en charge les protocoles Testnet (y compris NU6 Testnet)

## Activer le Testnet dans les wallets

### Zkool Wallet

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
- Le wallet peut redémarrer lors du changement de réseau  
- Les comptes ZEC Mainnet ne sont pas affectés  
- Utilisez un serveur lightwallet Testnet si cela vous est demandé

### Zingo! Wallet

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


Une fois activé, les wallets peuvent envoyer et recevoir des TAZ, tester des transactions blindées et expérimenter en toute sécurité.


## Après avoir activé le Testnet

- Les transactions se comportent comme sur Mainnet, mais avec des **TAZ sans valeur**  
- Les transactions blindées, les adresses multiples et les fonctionnalités de confidentialité peuvent être testées  
- Les développeurs peuvent déboguer et tester des fonctionnalités sans risquer de vrais ZEC


## Résumé rapide

- **Zcash Testnet** est un environnement bac à sable sûr pour construire, tester et expérimenter  
- Cas d'utilisation : tests développeur, tests de nœuds, intégration d'exchange, recherche et éducation  
- Les **coins TAZ** sont utilisés à la place de ZEC et n'ont aucune valeur réelle  
- Le Testnet est essentiel avant de déployer des fonctionnalités en direct sur Mainnet
