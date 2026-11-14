# Signature à froid protégée

> **Idée clé :** Le portefeuille compagnon voit tout ce qui est nécessaire pour construire et suivre une transaction protégée. Seul le portefeuille matériel détient le pouvoir d'autoriser une dépense. Cette séparation est toute la raison d'être de la signature à froid protégée.

La protection des fonds dans Zcash consiste à transférer des fonds d'une adresse publique et transparente vers une adresse privée et protégée, en masquant les détails de la transaction grâce aux fonctionnalités de confidentialité de Zcash.

### Qu'est-ce qui change lorsque vous protégez vos ZEC ?

Avec une transaction Zcash transparente, des informations telles que :

- l'adresse de l'expéditeur
- l'adresse du destinataire
- le montant transféré

peuvent être observées sur la blockchain.

Lorsque vous protégez vos ZEC, vos fonds sont transférés dans un pool privé (comme Ironwood). La blockchain peut vérifier qu'une transaction est valide sans révéler les détails privés de votre transaction. Depuis la mise à niveau NU6.3 du 28 juillet 2026, les fonds nouvellement protégés sont placés dans le pool Ironwood, car l'ancien pool Orchard n'accepte plus de nouveaux dépôts, mais autorise toujours les retraits.

### Composants d'une transaction protégée

### 1. La note (l'enregistrement du solde protégé)

Une note est un enregistrement cryptographique privé représentant un montant non dépensé de ZEC détenu par un utilisateur.

Contrairement à une blockchain publique, où les soldes sont affichés en clair, une note protégée chiffre la valeur et les informations de propriété afin que les observateurs on-chain ne puissent pas voir à qui appartiennent les fonds.

Lors de l'initiation d'une transaction, le portefeuille compagnon parcourt le registre, identifie les notes non dépensées de l'utilisateur et sélectionne les notes à dépenser.

### 2. Le nullifier (le mécanisme de détection des doubles dépenses)

Comme les détails d'une note sont masqués dans le registre public, le réseau a besoin d'un mécanisme pour détecter les doubles dépenses sans révéler quelle note est dépensée.

Un nullifier est un marqueur cryptographique unique dérivé d'une note précise. Lorsqu'une note est dépensée, son nullifier est publié sur la blockchain.

Le réseau vérifie que le nullifier n'a pas déjà été enregistré. Si ce n'est pas le cas, la dépense peut être acceptée. Point essentiel : un observateur extérieur ne peut pas utiliser le nullifier pour déterminer de quelle note précise il provient.

Le portefeuille compagnon dérive et construit le nullifier approprié lors de l'assemblage des données de la transaction.

## Clés

Les clés sont des informations cryptographiques qui contrôlent l'accès à vos fonds et permettent à votre portefeuille d'effectuer des opérations comme recevoir, consulter et dépenser des ZEC.

Un portefeuille contient plusieurs clés différentes, chacune ayant une fonction distincte, de la même manière qu'un compte unique peut disposer d'identifiants séparés pour l'accès en lecture et l'accès en écriture.

Les clés sont au cœur de la relation entre le portefeuille compagnon et le portefeuille matériel, car les différentes clés remplissent des fonctions différentes, et une seule d'entre elles doit rester sous clé.

Il est important de savoir que chaque pool protégé construit ses clés sous la forme d'un arbre de dérivation, dans lequel les flèches pointent d'un composant vers tout ce qui peut en être dérivé. Les utilisateurs qui souhaitent recevoir des paiements protégés doivent disposer d'une adresse de paiement protégée, générée à partir d'une clé de dépense.

### La hiérarchie des clés

**1. Clé de dépense**

Il s'agit de la clé la plus sensible sur le plan de la sécurité. Elle confère la capacité cryptographique d'autoriser la dépense de ZEC.

C'est à cette clé qu'il est fait référence chaque fois que l'expression « le portefeuille matériel détient la clé » apparaît ailleurs dans ce rapport.

Dans une architecture de signature à froid, la clé de dépense est conservée à l'intérieur du portefeuille matériel et n'est jamais exposée au portefeuille compagnon. Le portefeuille compagnon ne devrait jamais avoir besoin de posséder cette clé.

Dans Sapling comme dans Orchard, les hiérarchies de clés dérivent le pouvoir de dépense et les capacités de consultation sous la forme de deux branches distinctes issues d'une clé de dépense racine :

- **Sapling :** Une clé de dépense étendue (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) dérive des clés d'autorisation de preuve (𝑎𝑘,𝑛𝑠𝑘) et des clés pour lecture seule complètes (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), qui produisent à leur tour des clés pour lecture seule entrantes (𝑖𝑣𝑘) et des adresses diversifiées.
- **Orchard :** Une clé de dépense racine (𝑠𝑘) se divise directement en une clé d'autorisation de dépense (𝑎𝑠𝑘) et une clé pour lecture seule complète (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Cette séparation structurelle fournit le fondement cryptographique formel de l'isolation matérielle des clés : le portefeuille exporte la branche de consultation (UFVK) vers l'ordinateur hôte pour la synchronisation du solde et la construction des transactions, tandis que la branche d'autorisation de dépense reste verrouillée en permanence sur l'appareil.

La dérivation des clés est strictement unidirectionnelle. Cela signifie qu'il est impossible de remonter des clés pour lecture seule pour reconstituer le pouvoir de dépense. Cette irréversibilité cryptographique rend sûre l'exportation d'une Unified Full Viewing Key (UFVK), car elle offre une visibilité complète sur le portefeuille sans exposer les secrets de dépense stockés sur l'appareil.

**2. Clés pour lecture seule**

Zcash sépare la capacité de voir l'activité protégée de la capacité de la dépenser. Une clé pour lecture seule permet à un portefeuille ou à une autre partie autorisée de consulter les informations relatives aux transactions protégées sans lui accorder de pouvoir de dépense.

- **Full Viewing Key (FVK), encapsulée sous forme de Unified Full Viewing Key (UFVK) :** dérivée délibérément de la clé de dépense, elle permet à un logiciel de détecter et de déchiffrer l'activité protégée du portefeuille, et donc d'identifier les transactions. Elle lui permet également de calculer les soldes sans pouvoir autoriser une dépense. On la décrit le mieux comme un dérivé moins privé de la clé de dépense, et non comme une copie affaiblie de la phrase de récupération.

La Full Viewing Key (FVK) offre une visibilité complète en lecture seule tout en maintenant une stricte séparation de sécurité. En déchiffrant les textes chiffrés des notes entrantes et sortantes (grâce à son composant de clé pour lecture seule sortante), un portefeuille compagnon ne disposant que de la FVK peut afficher un historique complet et annoté des transactions, et pas seulement un solde courant.

Plusieurs adresses de paiement diversifiées, impossibles à relier entre elles, partagent la même FVK et la même clé pour lecture seule entrante (IVK), ce qui permet de générer un nombre illimité d'adresses sans alourdir l'analyse de la blockchain.

Cette séparation fonctionnelle constitue le fondement des processus de signature à froid. L'analyse continue de la chaîne, le suivi de l'historique et la gestion des adresses sont confiés au logiciel hôte, tandis que le pouvoir de dépense reste isolé sur l'appareil matériel.

![Diagrammes de dérivation de clés](/content-images/key-derivation-diagrams.webp)

### La distinction essentielle : UFVK ou clé de dépense

> **L'UFVK peut être partagée. La clé de dépense doit rester sur le portefeuille matériel.**
>
> Le portefeuille compagnon utilise la clé pour lecture seule pour surveiller le portefeuille, détecter les fonds entrants, identifier les notes et aider à préparer les transactions. Il ne dispose pas de la clé privée nécessaire pour autoriser une dépense.

Comme indiqué précédemment, la séparation des clés est le fondement de l'architecture de signature à froid.

Le portefeuille compagnon peut effectuer l'essentiel du travail nécessaire à la préparation d'une transaction sans jamais avoir le contrôle des fonds. Le portefeuille matériel a seulement besoin de recevoir la transaction préparée et d'effectuer l'opération finale de signature.

Les fabricants de portefeuilles matériels n'ont pas besoin d'inventer eux-mêmes cette séparation. La conception des clés de Zcash sépare déjà les capacités de consultation du pouvoir de dépense au niveau du protocole, et les fabricants se contentent de construire leurs fonctions de signature et d'exportation sur cette structure existante. Le protocole permet de dériver des informations telles qu'une adresse protégée ou une clé pour lecture seule complète à partir d'une clé de dépense, tandis que la clé de dépense elle-même reste privée. Des portefeuilles matériels comme Ledger, Keystone et Hito peuvent ainsi fournir au logiciel compagnon les informations de consultation dont il a besoin sans jamais exposer la clé privée capable de dépenser les fonds.

### Ce que le portefeuille compagnon fait réellement des informations de clé

Grâce aux éléments de la clé pour lecture seule, le portefeuille compagnon peut :

- identifier vos fonds et vos notes
- déterminer quelles notes peuvent être dépensées
- dériver ou identifier les adresses concernées
- construire la transaction
- générer ou coordonner les preuves requises
- préparer la transaction pour la signature

Il est important de savoir que devoir construire une transaction ne revient pas à avoir besoin de la clé de dépense privée. Ce découplage est l'un des principes de sécurité fondamentaux de l'intégration des portefeuilles matériels.

## Construction et autorisation des transactions protégées

Voici les processus impliqués dans la création et l'autorisation de la transaction. En termes simples, ces processus correspondent à ce que le portefeuille fait concrètement de ces données pour envoyer de l'argent :

### Construction de la transaction (assemblage de la transaction protégée)

La construction de la transaction est le processus qui consiste à rassembler les informations nécessaires pour créer une transaction Zcash valide à partir du paiement souhaité par l'utilisateur.

Le processus de construction de la transaction combine les notes sélectionnées, les destinataires, les montants, les frais, les nullifiers et les autres données requises dans une structure de transaction. Pour les transactions protégées, il prépare également les informations nécessaires à la génération des preuves à divulgation nulle de connaissance et des signatures requises.

C'est généralement le portefeuille compagnon qui effectue cette étape. Il :

- Sélectionne les notes à dépenser
- Détermine les entrées et les sorties de la transaction
- Calcule les valeurs nécessaires
- Prépare les données de la transaction qui seront ensuite prouvées et signées.

Dans une configuration de signature à froid, les données de transaction obtenues peuvent être regroupées dans une PCZT et transmises au portefeuille matériel pour l'étape de signature, critique pour la sécurité.

### Preuve (démonstration de la validité au regard du protocole)

La preuve désigne la génération de preuves à divulgation nulle de connaissance (comme Halo 2 ou Groth16) qui démontrent qu'une transaction respecte les règles du protocole Zcash.

La preuve permet au réseau de garantir que :

- L'utilisateur qui dépense est autorisé à dépenser les notes
- Les notes existent réellement
- Les nullifiers correspondants sont uniques
- Le total des entrées est égal au total des sorties plus les frais.

Elle fait tout cela sans révéler aucun des détails privés sous-jacents.

La génération des preuves est très gourmande en calcul. Confier cette tâche à l'appareil compagnon évite que le portefeuille matériel ne se bloque ou ne manque de mémoire.

### Signature (autorisation de la dépense)

La signature est fondamentalement différente de la preuve. Une signature numérique agit comme un sceau d'autorisation explicite produit par le détenteur de la clé privée.

Alors qu'une preuve à divulgation nulle de connaissance vérifie la validité de la transaction, une signature numérique prouve le pouvoir de dépense. La signature certifie que le véritable propriétaire approuve les paramètres précis du transfert.

La signature ne requiert qu'une puissance de calcul minimale, ce qui la rend idéale pour un portefeuille matériel.

### Qu'est-ce que la signature à froid protégée ?

La signature à froid protégée est une méthode qui permet d'autoriser une transaction protégée Zcash tout en gardant les clés de dépense privées isolées du portefeuille compagnon connecté à Internet. La transaction peut être construite et préparée sur un ordinateur en ligne, tandis qu'un portefeuille matériel distinct, maintenu hors ligne ou isolé d'une autre manière, utilise ses clés protégées pour autoriser la transaction.

Le processus peut être résumé ainsi :

![Processus de signature à froid protégée](/content-images/cold-signing-process.webp)

Le portefeuille compagnon envoie les paramètres structurés de la transaction à l'appareil matériel, qui signe les données en interne sans jamais transmettre la clé de dépense privée à la machine hôte.

## Portefeuilles compagnons et portefeuilles matériels

Les transactions protégées peuvent faire intervenir à la fois un portefeuille compagnon et un portefeuille matériel, chacun remplissant une fonction distincte.

### Portefeuille compagnon

Qu'est-ce qu'un portefeuille compagnon ?

Le portefeuille compagnon fonctionne sur un ordinateur ou un appareil mobile et effectue la plupart des tâches liées à la création de la transaction, notamment :

- La sélection des notes à dépenser
- La construction de la transaction
- Le calcul des données de transaction nécessaires
- La coordination de la génération des preuves à divulgation nulle de connaissance requises.

### Pourquoi un portefeuille compagnon est-il utile ?

Le portefeuille compagnon gère le processus de création de la transaction, mais si l'ordinateur est infecté par un logiciel malveillant, un attaquant pourrait :

- voir ce que vous faites,
- modifier une transaction non signée,
- tenter de vous amener par la ruse à approuver quelque chose.

Le portefeuille compagnon n'a pas besoin d'accéder à la clé privée stockée sur le portefeuille matériel. Il peut donc se charger de la construction de la transaction et des autres tâches de calcul, tandis que le portefeuille matériel constitue la barrière de sécurité qui protège la clé privée.

### Portefeuille matériel

Un portefeuille matériel est un appareil physique hors ligne qui isole vos clés privées des téléphones ou ordinateurs connectés, à la manière d'un coffre-fort sécurisé pour vos cryptoactifs.

### Pourquoi un portefeuille matériel est-il utile ?

Si votre ordinateur est infecté par un logiciel malveillant, un attaquant pourrait :

- voir ce que vous faites,
- modifier une transaction non signée,
- tenter de vous amener par la ruse à approuver quelque chose.

La clé privée ne peut pas être simplement extraite du portefeuille matériel ; l'appareil peut donc servir de barrière de sécurité.

Image : capacités du portefeuille compagnon et du portefeuille matériel

La séparation entre ces deux portefeuilles est particulièrement importante pour les transactions protégées, car elles sont plus complexes que les transactions transparentes et font intervenir des éléments tels que les notes protégées, les nullifiers, les engagements, les preuves à divulgation nulle de connaissance et les signatures de transaction.

Il serait peu pratique que le portefeuille matériel effectue toutes les opérations de calcul. Le portefeuille compagnon prépare donc la transaction et fournit au portefeuille matériel les informations nécessaires à la signature, tandis que la clé de dépense privée reste isolée dans l'appareil matériel.

## Isolation des clés

> L'isolation des clés signifie que les clés privées capables d'autoriser une dépense ne quittent jamais le portefeuille matériel. L'application compagnon peut préparer la transaction, mais elle ne peut pas la signer.

L'isolation des clés consiste à séparer les clés privées nécessaires pour autoriser une transaction du portefeuille compagnon et de l'appareil sur lequel il fonctionne. Dans une configuration de signature à froid protégée, le portefeuille compagnon peut construire la transaction et coordonner les preuves requises, tandis que le portefeuille matériel garde isolées les clés de dépense privées, qui sont sensibles.

Si l'ordinateur ou le téléphone compagnon est compromis, un attaquant peut éventuellement interagir avec la transaction avant sa signature, mais il ne devrait pas pouvoir extraire la clé privée du portefeuille matériel. La clé reste donc à l'intérieur du périmètre de sécurité de l'appareil matériel.

Cette séparation permet au portefeuille compagnon de construire la transaction et d'effectuer les calculs sans lui donner un accès direct aux éléments de clé nécessaires pour autoriser la transaction.

![Key isolation](/content-images/key-isolation.webp)

La distinction essentielle est la suivante : « clé pour lecture seule » ne signifie pas que l'application reçoit une version affaiblie de la phrase de récupération.

Dans Zcash, une Full Viewing Key (FVK/UFVK) est volontairement dérivée de la clé de dépense. Elle permet à son détenteur de détecter et de déchiffrer l'activité protégée qui le concerne, mais pas d'autoriser des dépenses. La FVK est un dérivé moins secret de la clé de dépense.

**Une réserve importante en matière de confidentialité :**

Il faut donc savoir que l'application ne peut pas voler les fonds avec la seule UFVK, mais qu'elle peut voir l'activité protégée privée du portefeuille.

C'est pourquoi il est plus juste de dire que l'application compagnon dispose d'une *autorité de lecture* plutôt que de dire simplement qu'elle détient des « informations publiques ».

Pour résumer l'idée le plus simplement possible : le portefeuille compagnon reçoit suffisamment d'éléments de clé pour savoir ce qui arrive au portefeuille, mais pas assez pour autoriser ce qui arrive à ses fonds. Le portefeuille matériel, lui, garde l'autorité de dépense isolée et ne l'utilise que lorsque l'utilisateur approuve une transaction.

C'est le modèle d'isolation des clés au cœur de ces conceptions de portefeuilles matériels protégés Zcash. On retrouve ce même modèle, avec chaque implémentation, dans Ledger, Keystone et Hito, présentés plus loin.

## PCZT

PCZT signifie Partially Created Zcash Transaction. Il s'agit du paquet qui contient une transaction Zcash ainsi que les informations nécessaires pour la finaliser d'une étape à l'autre.

C'est un format standardisé pour une transaction Zcash en cours de construction. Il permet à différents participants ou appareils de réaliser différentes parties du processus de création de la transaction et de se transmettre la transaction partiellement terminée.

Dans les protocoles de cryptomonnaie à divulgation nulle de connaissance comme Zcash, construire une transaction est bien plus complexe que signer un simple transfert public. Les transactions protégées exigent des preuves à divulgation nulle de connaissance gourmandes en calcul, comme celles générées avec Halo 2 ou Groth16. Par conséquent, les appareils peu puissants comme les portefeuilles matériels peuvent manquer de mémoire et de capacité de traitement pour gérer l'ensemble du processus de transaction.

L'introduction de PCZT répond à plusieurs défis fondamentaux de l'architecture des cryptomonnaies protégées. PCZT est un format de données intermédiaire standardisé qui découpe la création d'une transaction en rôles modulaires et indépendants. Il permet à un ordinateur compagnon puissant de se charger de l'assemblage de la transaction et de la génération des preuves, tandis qu'un portefeuille matériel hors ligne se limite strictement à l'autorisation et à la signature.

### Limites du matériel et du stockage à froid

Les portefeuilles matériels offrent un environnement sûr pour protéger les clés de dépense privées, mais ils disposent généralement de peu de RAM, de puissance de calcul et de capacité de transfert de données par rapport aux ordinateurs compagnons. Ces contraintes les empêchent en pratique de générer des preuves à divulgation nulle de connaissance, très gourmandes en calcul, ou de conserver l'état complet de la transaction pendant sa construction.

Le portefeuille compagnon peut donc prendre en charge les tâches exigeantes en calcul, tandis que le portefeuille matériel se concentre sur l'opération critique pour la sécurité : autoriser la transaction avec ses clés de dépense protégées.

On peut alors se demander : si l'appareil est aussi limité, comment parvient-il à effectuer *suffisamment* de vérifications pour rester digne de confiance ?

En termes simples, un portefeuille matériel ne peut pas accepter n'importe quelle valeur envoyée par un ordinateur compagnon et la signer. Il a besoin d'assez d'informations pour établir que la valeur à signer correspond bien à la transaction que l'utilisateur veut autoriser. Il faut donc trouver un équilibre délicat : l'appareil doit analyser et vérifier suffisamment pour protéger le processus de signature, tout en respectant des limites strictes de mémoire, de calcul, de taille du micrologiciel et de complexité d'implémentation.

La gestion de PCZT par Orchard de Ledger illustre ce défi : une analyse spécialisée, dépendante du circuit, peut rendre l'implémentation plus réaliste sur des appareils limités, mais peut aussi exiger des mises à jour du micrologiciel lorsque les structures de transaction prises en charge ou les circuits évoluent.

Deux initiatives en cours montrent des réponses différentes à cette même contrainte.

La subvention n° 423 a présenté une proposition de recherche portant sur une chaîne de génération de preuves entièrement à temps constant, adaptée aux architectures de portefeuilles matériels open source comme aux ordinateurs ordinaires. L'objectif était d'étudier une infrastructure cryptographique pouvant être implémentée de façon sûre dans des environnements comme C ou Rust, tout en réduisant la complexité et la charge de maintenance de la prise en charge de Zcash protégé.

Une autre approche est représentée par le projet **Zcash SeedSigner**, un signataire open source isolé du réseau, construit à partir de composants bon marché et faciles à trouver. Le processus proposé garde l'ordinateur compagnon séparé de l'appareil de signature et fait passer un PCZT à travers cette isolation physique pour qu'il soit vérifié et signé sur l'appareil.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Ensemble, ces approches illustrent le défi d'ingénierie plus large des portefeuilles matériels protégés : la construction de la transaction et la génération des preuves peuvent se faire hors de l'appareil critique pour la sécurité, mais le signataire doit tout de même disposer d'assez d'informations et de capacités de vérification pour autoriser la transaction obtenue en toute sécurité.

### PCZT rend possible l'architecture divisée

Le standard Partially Created Zcash Transaction (PCZT) est la structure de données formelle qui relie le portefeuille compagnon et le portefeuille matériel.

Un portefeuille compagnon peut sélectionner les notes, calculer les nullifiers et générer la preuve à divulgation nulle de connaissance entièrement par lui-même. C'est possible parce que les informations nécessaires à ces étapes, y compris la clé servant à dériver les nullifiers, proviennent de la clé pour lecture seule et non d'un élément lié à l'autorité de dépense. Le portefeuille compagnon regroupe ensuite ces éléments dans un conteneur PCZT.

Le PCZT est transmis au portefeuille matériel, qui lit le contexte de la transaction (par exemple les montants et les adresses des destinataires), appose la signature à l'aide de ses clés de dépense protégées, puis renvoie le PCZT mis à jour à l'appareil compagnon.

Cette conception établit une frontière de sécurité stricte : un matériel hôte puissant peut effectuer les calculs complexes à divulgation nulle de connaissance sans avoir besoin des clés de dépense, tandis que des appareils de stockage à froid peu puissants peuvent garantir la sécurité financière sans devoir exécuter une cryptographie lourde.

### Compromis de confidentialité liés au prouveur

Confier la génération de la preuve à divulgation nulle de connaissance au portefeuille compagnon ou à un autre prouveur permet de garder les clés de dépense isolées, mais le prouveur doit tout de même accéder à des informations sensibles sur la transaction, comme les valeurs des notes, les adresses des destinataires et les engagements.

PCZT maintient la séparation architecturale en garantissant que ces informations peuvent être fournies pour la génération de la preuve sans transmettre les clés de dépense privées nécessaires à l'autorisation.

Cela garantit que l'autorité de preuve est séparée de l'autorité de dépense. Le prouveur peut générer la preuve, gourmande en calcul, sans obtenir l'autorité cryptographique nécessaire pour dépenser les fonds de l'utilisateur.

### Interopérabilité de PCZT

À mesure que PCZT prend une place importante dans les processus de portefeuilles matériels, de multisignature et de signature isolée du réseau de Zcash, l'interopérabilité entre implémentations indépendantes devient de plus en plus importante.

Une proposition de AngryDavee de juin 2026 relevait que des implémentations de PCZT existaient déjà dans plusieurs projets, dont Ledger, Keystone, Hito, OneKey et l'implémentation de référence dans librustzcash. La proposition constatait toutefois l'absence de tests communs permettant de confirmer que ces implémentations interprètent les PCZT de manière cohérente.

La solution proposée était une suite de tests d'interopérabilité open source contenant des vecteurs de test PCZT de référence et des tests croisés entre implémentations couvrant l'ensemble du processus créer → signer → finaliser. Elle prévoyait aussi de tester les limites entre rôles, comme le combinateur, où les informations partiellement signées par différents signataires peuvent être combinées avant la finalisation d'une transaction.

C'est particulièrement pertinent pour les portefeuilles matériels, car PCZT permet de séparer la construction et la signature de la transaction : un portefeuille compagnon peut construire une transaction et préparer un PCZT, tandis qu'un appareil matériel reçoit les informations de signature nécessaires et effectue l'opération de signature, critique pour la sécurité.

La proposition n'a pas été mise en œuvre, car Zcash Community Grants a décidé de ne pas donner suite à la subvention après avoir examiné la proposition et pris en compte les retours de la communauté. La suite de tests croisés proposée n'a donc pas été développée dans le cadre de cette subvention. Il s'agit par conséquent d'une réponse proposée à un problème d'interopérabilité de PCZT identifié, et non d'un standard qui existe actuellement dans Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Le cycle de vie d'un PCZT

| # | Étape | Description |
|---|---|---|
| 1 | Créateur | Initialise le PCZT avec les métadonnées globales de la transaction, notamment les versions de transaction, les identifiants de branche de consensus et les indicateurs de pool. |
| 2 | Constructeur | Remplit la transaction avec les entrées et sorties prévues dans les pools transparent, Sapling, Orchard ou Ironwood. |
| 3 | Finaliseur d'entrées/sorties | Déclare l'ensemble des entrées et sorties comme complet, calcule les clés de la signature de liaison et signe les dépenses fictives si nécessaire. |
| 4 | Metteur à jour | Ajoute les données de contexte nécessaires aux participants suivants, comme les clés pour lecture seule complètes, les ancres et les témoins Merkle. |
| 5 | Prouveur et signataire | Génère les preuves à divulgation nulle de connaissance et effectue la signature cryptographique. Dans les versions récentes de PCZT, ces deux tâches sont entièrement indépendantes et peuvent se faire l'une après l'autre ou en parallèle. |
| 6 | Combinateur | Fusionne de manière déterministe plusieurs instances de PCZT lorsque différents appareils travaillent simultanément sur des aspects de la même transaction. Les règles de fusion imposent une résolution stricte des conflits afin d'éviter toute perte accidentelle de données. |
| 7 | Finaliseur de dépense et extracteur | Valide tous les éléments cryptographiques requis, supprime les métadonnées de contexte intermédiaires et produit la transaction Zcash finalisée, prête à être diffusée sur le réseau. |

## Implémentations concrètes de portefeuilles matériels

### En un coup d'œil

| Appareil   | Ce que reçoit l'application compagnon              | Ce qui reste sur l'appareil          | Transport      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / FVK Orchard, adresses            | Autorité de dépense                | USB / BLE      |
| Keystone | UFVK + adresse unifiée                   | Phrase de récupération / clés de dépense              | QR (isolé du réseau)|
| Hito     | UFVK, adresse unifiée, empreinte de la phrase de récupération  | Phrase de récupération et clés de dépense privées    | QR / local     |


Plusieurs implémentations de portefeuilles matériels ont été développées pour étudier comment prendre en charge les transactions protégées de Zcash tout en gardant les clés de dépense sensibles isolées du portefeuille compagnon. Ledger, Keystone et Hito représentent différentes approches pour intégrer la protection matérielle des clés au processus de transaction Zcash.

![Implémentations réelles de portefeuilles matériels](/content-images/hardware-wallet-implementations.webp)

Pour comprendre comment ils protègent les fonds protégés, il est important de distinguer les clés de dépense des clés pour lecture seule. Dans les trois cas, la répartition suit le même schéma :

| Appareil | Ce que l'application compagnon peut recevoir | Ce qui reste protégé sur l'appareil |
|---|---|---|
| Ledger | UFVK / FVK Orchard, adresses et informations publiques | Autorité de dépense / éléments de clé privée |
| Keystone | UFVK + adresse unifiée | Phrase de récupération / clés de dépense |
| Hito | UFVK, adresse unifiée, empreinte de la phrase de récupération et informations réseau | Phrase de récupération et clés de dépense privées |

### Ledger comme environnement de signature matériel

Ledger est une entreprise de portefeuilles matériels. Ses appareils sont construits autour d'un Secure Element, une puce dédiée conçue pour conserver les éléments de clé privée et les garder physiquement isolés du reste de l'appareil et de tout ce qui y est connecté. Ce Secure Element est précisément ce qui rend un appareil Ledger digne de confiance pour le stockage à froid. Ainsi, même si l'ordinateur ou le téléphone auquel il est branché est compromis, les clés contenues dans le Secure Element ne peuvent pas être extraites.

À lui seul, cependant, un appareil Ledger ne sait rien faire avec une cryptomonnaie particulière. Il a besoin qu'on y installe une application capable de gérer la cryptographie propre à cette monnaie.

Un appareil Ledger ne sait rien faire avec une cryptomonnaie particulière : il lui faut donc une application qui connaît la cryptographie de cette monnaie. Pour Zcash, il en a existé deux générations :

- l'application d'origine « Zcash Shielded » développée par Zondax, utilisée avec des portefeuilles compagnons comme Zkool et retirée le 5 novembre 2026 ;
- la nouvelle application Zcash de Ledger (3.9.4 et ultérieures), utilisée nativement par Ledger Wallet Desktop 4.21 et ultérieures pour les ZEC protégés Ironwood.

Le modèle d'isolation des clés décrit ci-dessous s'applique aux deux.

Zkool est le portefeuille compagnon, sur votre téléphone ou votre ordinateur, qui communique avec cette application. Il construit la transaction et l'envoie au Ledger ; l'application Zondax sur l'appareil la signe ensuite et renvoie la signature.

Ainsi, Zondax est le logiciel qui s'exécute sur le matériel, et Zkool est le logiciel qui s'exécute à l'extérieur et utilise l'application de Zondax pour communiquer avec l'appareil.

### Qu'est-ce qui sort du Ledger ?

Le logiciel Zcash de Ledger comprend une fonction spécifique pour exporter la clé pour lecture seule du portefeuille, c'est-à-dire la clé qui permet à un logiciel de voir les soldes et les transactions sans pouvoir dépenser quoi que ce soit.

Cette fonction peut renvoyer l'un de ces deux éléments :

- une Unified Full Viewing Key (UFVK), la clé pour lecture seule complète couvrant tous les pools protégés de Zcash à la fois ;
- une Full Viewing Key Orchard (FVK).

Dans les deux cas, ce qui sort n'est jamais qu'une clé pour lecture seule. Quelle que soit la version demandée, cette fonction n'a aucun moyen de renvoyer la seule information qui permettrait réellement de déplacer des fonds : la clé de dépense.

C'est tout l'intérêt de sa conception : elle est faite pour que la seule chose qu'elle puisse exporter soit un élément qu'il est sûr de confier à une application compagnon.

La hiérarchie des clés de Zcash est structurée de sorte que, pour chaque pool protégé, la clé de dépense dérive deux éléments distincts :

- une clé d'autorisation de dépense ;
- une clé pour lecture seule complète.

La FVK peut ensuite dériver ses propres capacités liées à la lecture, mais ce chemin de dérivation ne ramène jamais à l'autorité de dépense. Une fois qu'une clé est passée du côté lecture de la hiérarchie, elle y reste et ne peut pas servir à reconstituer la clé d'autorité de dépense dont elle est issue.

Ironwood suit le même schéma, puisqu'il réutilise la construction des clés et des notes de Orchard. C'est toutefois un pool distinct au niveau du consensus, avec son propre arbre d'engagements et son propre ensemble de nullifiers. Une UFVK est donc en réalité un ensemble de clés pour lecture seule propres à chaque pool (transparent, Sapling, Orchard et désormais Ironwood), et non une clé unique et uniforme.

Une UFVK exportée avant l'activation de Ironwood n'inclut pas de clé pour lecture seule Ironwood, puisque ce pool n'existait pas encore. C'est précisément pour cela que les portefeuilles ont dû être mis à jour pour reconnaître et dériver des UFVK compatibles avec Ironwood après la mise à niveau NU6.3.

### Qu'est-ce qui reste sur le Ledger ?

L'autorité de dépense reste sur l'appareil.

Le signataire Ledger reçoit une transaction/un PCZT de l'hôte et génère la signature d'autorisation de dépense selon le pool depuis lequel la transaction dépense (le pool Ironwood, car l'intégration actuelle de Ledger ne prend en charge que Ironwood). La signature est produite sur l'appareil, et l'hôte ne reçoit que la signature, jamais la clé de dépense privée.

C'est également conforme au modèle de sécurité général de Ledger. Son Secure Element isole les éléments de clé privée, et les exigences de sécurité de Ledger pour les applications interdisent expressément à celles-ci d'exposer ces secrets à l'hôte.

Le signataire de Ledger peut exporter la FVK/UFVK et, indépendamment, signer des transactions. Ces deux capacités sont fournies par des fonctions séparées et ne sont pas regroupées en une seule.

### Qu'est-ce que cela signifie en pratique ?

Supposons que votre Ledger contienne 10 ZEC.

Le portefeuille compagnon peut détenir l'UFVK et donc déterminer : « Ce portefeuille a reçu 10 ZEC. » Il peut analyser et afficher les transactions et les soldes.

Mais si quelqu'un compromet le portefeuille compagnon, l'UFVK seule ne lui donne pas la capacité de créer la signature d'autorisation de dépense.

La signature d'autorisation de dépense séparée a pour but de permettre à des appareils limités comme les portefeuilles matériels d'autoriser des dépenses protégées sans devoir générer eux-mêmes la preuve zk-SNARK complète.

### L'application Ledger de Zondax : le côté portefeuille matériel

#### Qu'est-ce que Zondax ?

Zondax est une société de développement tierce qui a créé l'application Zcash pour Ledger. C'est l'application du micrologiciel qui s'exécute réellement sur le matériel Ledger et qui donne avant tout à l'appareil la capacité de comprendre et de traiter les transactions Zcash.

Zondax est un développeur externe. Le matériel Ledger n'a aucune capacité intrinsèque à traiter les transactions Zcash : cette capacité provient entièrement du logiciel de Zondax.

### Implémentation d'origine de Ledger pour Zcash

Le dépôt de l'application Zcash pour Ledger de Zondax contient le logiciel qui s'exécute sur un appareil Ledger. L'application était initialement axée sur les transactions protégées Sapling, avant que Orchard ne devienne le principal pool protégé de Zcash ; la prise en charge de Sapling représentait donc tout ce qu'un appareil Ledger pouvait faire avec des ZEC protégés.

Son architecture illustre la séparation : le côté hôte/compagnon prépare les informations de la transaction, tandis que le Ledger gère les opérations sensibles sur les clés et la signature.

Même dans cette toute première version de la prise en charge de Zcash par un portefeuille matériel, les principes fondamentaux, à savoir la construction et la génération des preuves sur l'hôte puis la signature isolée sur l'appareil, faisaient déjà partie de la conception.

### Évolution vers Orchard

Les travaux de Ledger ont évolué vers Orchard + PCZT. Il s'agissait d'une véritable transition et non d'une simple mise à jour, car Orchard utilise un système de preuve différent (Halo 2, contre Groth16 pour Sapling) ainsi qu'une construction différente des notes et des clés. Étendre un micrologiciel limité à Sapling pour gérer la signature Orchard exigeait donc de nouvelles bases cryptographiques côté appareil, et pas seulement un correctif du micrologiciel.

Cependant, à mesure que Zcash évoluait vers Ironwood, Zondax et Ledger ont réorienté leur développement vers la prise en charge directe de Ironwood, plutôt que de terminer une implémentation Orchard pour devoir ensuite la repenser pour Ironwood. Il s'agit d'une nouvelle étape dans l'évolution de l'implémentation Ledger, puisque Ironwood s'appuie sur l'architecture cryptographique de Orchard tout en introduisant un pool protégé distinct et d'autres modifications du protocole.

### Ce qui se passe dans cette application Ledger

Le déroulement obtenu est le suivant :

1. L'hôte construit un PCZT.
2. L'hôte envoie les informations pertinentes de la transaction à l'appareil Ledger.
3. L'appareil produit les signatures d'autorisation de dépense Orchard.
4. L'hôte gère toutes les étapes suivantes, y compris la signature de liaison et l'assemblage final de la transaction.

L'application exécutée dans le Ledger ne voit et ne produit rien d'autre que la signature d'autorisation de dépense elle-même. Tout le travail lourd en calcul ou en données (génération des preuves, liaison, assemblage) reste sur l'hôte, à qui il n'est pas nécessaire de confier les éléments de clé.

### L'intégration protégée native de Ledger : Ledger Wallet Desktop

La dernière intégration de Zcash par Ledger fournit un exemple concret de la manière dont la construction des transactions protégées et la signature critique pour la sécurité peuvent être réparties entre le logiciel compagnon et un portefeuille matériel.

Avec Ledger Wallet Desktop 4.21 et ultérieures et l'application Zcash pour l'appareil en version 3.9.4 et ultérieures, les utilisateurs peuvent envoyer et recevoir des ZEC protégés Ironwood directement dans Ledger Wallet Desktop. L'intégration prend en charge les transferts de privé à privé, la protection de fonds venant du pool transparent, le retrait de fonds vers le pool transparent, les adresses de réception privées et les mémos. Les transactions sont vérifiées et signées sur l'appareil Ledger au lieu de reposer uniquement sur les informations affichées par l'ordinateur.

Un élément clé de cette architecture est la séparation des capacités de lecture et de dépense. Lors de la synchronisation du solde privé, le Ledger exporte une Unified Full Viewing Key (UFVK), stockée localement sur l'ordinateur. L'UFVK permet à Ledger Wallet Desktop de détecter les transactions protégées pertinentes et de déterminer le solde du portefeuille, mais elle ne donne pas l'autorité de dépenser les fonds. L'autorité de dépense, critique pour la sécurité, reste sur l'appareil Ledger, qui effectue l'opération de signature finale. On obtient ainsi une frontière nette entre l'ordinateur, qui gère l'état du portefeuille et construit les transactions, et l'appareil matériel, qui protège la capacité nécessaire pour autoriser les dépenses.

L'intégration actuelle est cependant limitée à Ironwood. Elle n'affiche pas et ne gère pas les fonds Orchard ou Sapling dans Ledger Wallet Desktop. C'est significatif sur le plan historique, car les premiers développements de Zcash par Ledger étaient liés à la prise en charge protégée de Orchard, avant que l'implémentation n'évolue vers le protocole Ironwood.

Cette transition souligne aussi l'importance de la compatibilité des clés et des comptes. Ledger dispose d'une ancienne application « Zcash Shielded » développée par Zondax et utilisée par des intégrations comme YWallet et zkool, qui est en cours de retrait. Comme cette ancienne application utilisait un schéma de dérivation différent pour les comptes protégés, ses comptes Sapling ne peuvent pas simplement être reproduits par la nouvelle application Ledger.

L'intégration illustre donc à la fois les progrès et les limites qui subsistent dans la prise en charge protégée par les portefeuilles matériels. Ledger peut désormais offrir une expérience Ironwood complète, dans laquelle le logiciel compagnon gère la synchronisation du portefeuille et la préparation des transactions, tandis que l'appareil matériel reste la frontière de sécurité pour les dépenses.

En même temps, la compatibilité des anciens comptes, la prise en charge limitée à certains pools protégés, les limites de taille des transactions sur le matériel, les restrictions de plateforme et les contraintes de calcul et de micrologiciel liées à l'analyse et à la vérification des transactions protégées montrent que la prise en charge de Zcash par les portefeuilles matériels dépend non seulement des capacités du protocole, mais aussi de la conception et des ressources de chaque implémentation.

### Zkool + Ledger : utilisation de l'application officielle Zondax

Successeur de Ywallet, Zkool a hérité de l'objectif de signature à froid protégée, mais a emprunté une autre voie pour l'atteindre. Ce choix découle directement d'un constat : la cryptographie seule ne rend pas une intégration utilisable si l'application de signature ne peut pas être distribuée de façon sûre.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Utilisation de l'application Zondax par Zkool

Zkool s'est tourné vers l'application officielle Zcash pour Ledger développée par Zondax, plutôt que vers l'application propriétaire Ledger abandonnée de Ywallet. Au lieu de maintenir une application personnalisée que la boutique de Ledger n'acceptait pas, Zkool s'est appuyé sur l'application déjà acceptée et distribuée dans l'écosystème de Ledger.

Grâce à ce changement, les utilisateurs n'avaient plus besoin d'installer une application Ledger personnalisée non signée pour utiliser cette intégration, puisque l'application de Zondax était officiellement distribuée dans l'écosystème de Ledger.

Cette intégration fait toutefois face à un changement important le 5 novembre 2026, date à laquelle la prise en charge de l'ancienne application Zcash Shielded doit prendre fin, Ledger la retirant progressivement. Comme l'intégration Ledger de Zkool repose sur cette application, ce changement soulève des questions sur la disponibilité future de la connexion existante. L'impact exact sur Zkool dépend de sa capacité à continuer d'utiliser l'ancienne application en dehors de Ledger Wallet ou à passer à une alternative compatible.

### Pools protégés pris en charge

Selon le développeur de Ywallet, l'intégration Ledger de Zkool utilisait l'application officielle Ledger développée par Zondax et prenait en charge les Zcash transparents comme protégés. Sa prise en charge protégée se limitait toutefois à Sapling et n'incluait pas Orchard. L'intégration présentait aussi d'autres limites, comme un maximum de cinq entrées et cinq sorties de chaque type et l'absence de compatibilité avec Ledger Live.

Cette limitation reflétait la portée de l'implémentation Zondax Ledger sous-jacente à l'époque. Les premiers travaux Ledger de Zondax assuraient la prise en charge de Sapling, et la version de l'application Zcash Shielded Ledger publiée ensuite en 2024 excluait initialement Orchard et les adresses unifiées. Par conséquent, une intégration construite autour de cette application héritait des capacités et des limites de l'implémentation du portefeuille matériel dont elle dépendait.

La situation a ensuite évolué avec la sortie de l'application dédiée Zcash Shielded Ledger en novembre 2024. Zondax a déclaré que l'application avait été officiellement publiée via Ledger Live, puis a publié des instructions d'intégration ainsi que des paquets Rust et JavaScript afin de permettre à d'autres portefeuilles de s'y intégrer. Au lancement, cependant, l'application communiquait exclusivement avec Zecwallet Lite Desktop, tandis que des intégrations plus larges avec d'autres portefeuilles étaient encore en cours de développement.

L'étape suivante a été le développement de la nouvelle application Zcash de Ledger, basée sur Rust. En juin 2026, Ledger a indiqué que le partage de l'UFVK et la génération d'adresses unifiées Orchard avaient été implémentés, tandis que la signature des transactions Orchard et ClearSign étaient encore en cours de développement. Ledger a également précisé que ces travaux seraient poursuivis dans la voie Ironwood à mesure que le protocole évoluerait.

Ironwood a ensuite nécessité des mises à jour dans l'ensemble de l'écosystème des portefeuilles Zcash. Zkool a publié la prise en charge de la migration de Orchard vers Ironwood à partir de la version 6.24.0, et a continué à affiner la migration et le traitement des transactions dans les versions suivantes. De son côté, Ledger a intégré la signature PCZT v2 à sa nouvelle application le 27 juillet, bien que l'implémentation n'ait pas encore achevé l'examen de Ledger ni le déploiement sur Ledger Live au 20 août, une étape qui a depuis été franchie : Ledger Wallet Desktop 4.21+ offre désormais directement une prise en charge native de Ironwood.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Ainsi, cette évolution se comprend mieux non pas comme une simple mise à niveau de Zondax vers Ironwood, mais comme plusieurs développements liés : l'implémentation Zondax d'origine centrée sur Sapling, l'application Zcash Shielded Ledger de 2024, la nouvelle application Ledger Rust prenant en charge Orchard et PCZT, l'intégration native propre à Ledger dans Ledger Wallet Desktop, et les mises à jour parallèles de portefeuilles tels que Zkool lors de la transition de l'écosystème vers Ironwood.

### Prise en charge actuelle de Zcash par les appareils et plateformes Ledger

La prise en charge de Zcash sur Ledger dépend :

- Du modèle de l'appareil
- De l'application installée
- De la plateforme utilisée pour le gérer et,
- Du caractère transparent ou protégé de la transaction.

Au 21 juillet 2026 (dernière mise à jour de Ledger), l'application Zcash Shielded est prise en charge sur le Nano S Plus, le Stax et le Flex, mais pas encore sur le Nano X ni sur le Nano Gen5.

Le Nano X et les autres modèles, à l'exception du Nano S d'origine, peuvent toujours utiliser l'application Zcash classique, qui prend en charge les transactions transparentes et la dépense de fonds protégés vers des adresses transparentes (déprotection), mais pas la signature de transactions d'une adresse protégée vers une adresse protégée. Le Nano S d'origine ne prend en charge aucune des deux applications, car Ledger abandonne progressivement la prise en charge de cet appareil et sa dernière application Zcash n'y est pas disponible. Les appareils se connectent à Ledger Wallet (anciennement Ledger Live), l'application compagnon de Ledger, disponible sur ordinateur pour Windows, macOS et Linux, et sur mobile pour iOS et Android.

Ledger a ajouté la prise en charge native de Zcash protégé à Ledger Wallet Desktop, basée sur le pool Ironwood, ce qui supprime le besoin d'un portefeuille compagnon distinct. ZEC protégé n'est pas encore pris en charge dans l'application mobile de Ledger pour iOS et Android, bien que la prise en charge mobile soit prévue dans une version future.

En dehors des logiciels propres à Ledger, l'utilisation protégée dépend d'un portefeuille compagnon compatible et des plateformes qu'il prend en charge. À mesure que Ledger continue d'étendre la prise en charge de Ironwood, la compatibilité dépend du modèle de l'appareil, du micrologiciel, de la version de l'application et du système d'exploitation ; une prise en charge générale de Zcash ne garantit donc pas nécessairement la compatibilité.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Signature à froid avec YWallet : une approche antérieure

Ywallet est un portefeuille compagnon, distinct à la fois de Ledger et de Zondax, qui a suivi sa propre voie vers la signature à froid protégée.

Ywallet est historiquement important, car il a exploré la signature à froid pour Zcash, ce qui signifie que l'appareil de signature pouvait être conservé séparément du portefeuille en ligne.

Pour mettre en œuvre cette architecture sur le matériel Ledger, Ywallet a développé sa propre application Ledger, une application propriétaire distincte de l'application Zondax présentée dans la section précédente. Cela signifiait que Ywallet ne s'appuyait pas sur l'implémentation Sapling existante de Zondax : il disposait de son propre micrologiciel assurant la partie signature de la relation.

### Pourquoi l'intégration était importante

Disposer du code cryptographique et du code de signature ne suffit pas. L'intégration d'un portefeuille matériel n'est pas un problème purement cryptographique, c'est aussi, inévitablement, un problème de distribution et de plateforme. Au minimum, elle implique :

- L'approbation et la distribution de l'application : la boutique d'applications officielle du fabricant du matériel acceptera-t-elle et distribuera-t-elle l'application ?
- La sécurité du micrologiciel et de l'application : l'application respecte-t-elle les exigences de sécurité du fabricant pour la manipulation des clés ?
- Les protocoles de communication : comment le portefeuille compagnon et l'appareil échangent-ils concrètement les données de transaction ?
- La compatibilité avec le portefeuille : les formats de données et le déroulement de l'application de signature correspondent-ils à ce qu'attend le portefeuille compagnon ?
- Les pools protégés pris en charge : pour lesquels de Sapling, Orchard (et désormais Ironwood) l'application peut-elle réellement signer ?

L'application Ledger propriétaire de Ywallet satisfaisait aux exigences cryptographiques et architecturales ; elle pouvait signer des transactions Zcash protégées, mais elle n'a pas été acceptée dans la boutique d'applications officielle de Ledger.

### Abandon de l'application Ledger propriétaire

L'application n'ayant pas été officiellement acceptée, Ywallet aurait dû demander aux utilisateurs d'installer un micrologiciel non signé pour l'utiliser, ce qui représente un réel compromis de sécurité pour les utilisateurs, et Ywallet a choisi de ne pas le leur demander. Ywallet a donc finalement abandonné cette intégration plutôt que de s'engager dans cette voie.

Plutôt que de relancer une application propriétaire, les développements ultérieurs (via Zkool, le successeur de Ywallet) se sont orientés vers l'application Ledger officielle développée par Zondax, remplaçant une implémentation personnalisée et refusée par une implémentation standardisée déjà acceptée dans l'écosystème de distribution de Ledger. C'est ce changement qui a finalement rendu de nouveau possible une intégration Ledger fonctionnelle.

### L'héritage de Ywallet

Même après que Ywallet s'est retiré du développement actif, son créateur, Hanh, qui est également membre de ZCG, est resté une voix importante dans l'écosystème, notamment lorsque la migration de Ironwood a fait apparaître des signalements de fonds semblant avoir disparu.

**ZODL : un utilisateur réel a constaté des fonds manquants après la migration Orchard → Ironwood**

Un utilisateur, Jmo0615, a signalé que des fonds auparavant visibles dans son portefeuille ZODL n'apparaissaient plus après la migration de Orchard vers Ironwood. Il a déclaré avoir restauré la phrase de récupération d'origine, réinitialisé et récupéré le portefeuille, puis laissé ZODL version 3.14.1 (1) se synchroniser entièrement. Il a également confirmé qu'aucun portefeuille matériel Keystone n'était impliqué.

Il n'a pas été établi que les fonds aient réellement été perdus. On soupçonne plutôt un problème lié à la détection par le portefeuille ou à la migration, où des fonds auparavant visibles n'étaient plus affichés après la transition vers Ironwood. Des fonds qui ne sont pas détectés ou affichés ne doivent pas automatiquement être décrits comme des fonds définitivement perdus, et cette distinction est importante pour comprendre les problèmes de migration.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool : les « notes verrouillées » peuvent expliquer des fonds apparemment indisponibles**

Un autre aspect important des portefeuilles protégés est la manière dont l'état du portefeuille peut affecter les fonds qu'un utilisateur peut réellement dépenser. Hanh a expliqué qu'un utilisateur peut accidentellement verrouiller une note via le contrôle des pièces, une fonctionnalité qui permet de choisir manuellement les notes utilisées pour une dépense. Dans ce cas, une note peut toujours exister dans le portefeuille tout en étant marquée comme indisponible à la dépense.

Cela met en évidence une distinction importante lors de l'examen des problèmes de portefeuille. Le montant de ZEC présent dans un portefeuille n'est pas toujours identique au montant actuellement disponible à la dépense. Des facteurs tels que la sélection des notes, la synchronisation, l'état de la migration, la récupération du portefeuille et les paramètres de contrôle des pièces peuvent affecter le solde affiché ou dépensable. Par conséquent, les signalements de « fonds manquants » doivent être soigneusement classés selon qu'il s'agit de fonds non détectés ou non affichés, de fonds détectés mais indisponibles à la dépense, ou de fonds réellement perdus.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Qu'est-ce que Keystone ?**

Keystone est un portefeuille matériel isolé physiquement (air gap). Son appareil de signature ne dispose d'aucune connexion directe, filaire ou sans fil, avec l'application compagnon pendant le processus de signature lui-même et communique à la place par codes QR. Il est associé ici à Zashi (désormais renommé Zodl), le portefeuille compagnon natif de Zcash, et cette association rend le principe d'isolation des clés particulièrement explicite et facile à suivre.

**Le flux Keystone/Zashi**

L'intégration Zcash de Keystone avec Zashi rend cette séparation particulièrement explicite. Lorsque vous connectez Keystone à Zashi, la Unified Full Viewing Key est transférée de Keystone vers Zashi.

Le flux est donc le suivant :

![Flux de consultation Keystone et Zashi](/content-images/keystone-zashi-viewing-flow.webp)

**Que peut faire Zashi avec l'UFVK ?**

Zashi peut l'utiliser pour :

- identifier les transactions protégées entrantes
- déterminer les soldes
- obtenir des informations sur l'activité protégée

Mais il ne peut pas dépenser les fonds du simple fait qu'il possède l'UFVK.

L'UFVK est une « capacité de consultation » qui permet de connaître les soldes et les transactions, mais pas de dépenser.

### Qu'est-ce qui reste dans Keystone ?

La phrase de récupération et l'autorité de dépense restent sur Keystone. Zashi ne reçoit ni la phrase de récupération, ni la clé de dépense, ni la clé privée d'autorisation de dépense. Il reçoit l'UFVK, les informations d'adresse et les informations nécessaires au fonctionnement en lecture seule.

Ensemble, ces deux moitiés complètent le tableau. Ce qui quitte l'appareil, comme l'UFVK, les adresses et les informations de suivi en lecture seule, suffit à Zashi pour surveiller le compte, mais rien de ce qui quitte l'appareil ne suffit à en retirer des fonds.

C'est pourquoi l'intégration entre Zashi et Keystone peut offrir un stockage à froid protégé. L'application de portefeuille peut surveiller le compte sans détenir l'autorité nécessaire pour en dépenser les fonds. L'intégration a été lancée spécifiquement pour permettre le stockage à froid de ZEC protégés.

Lorsque vous souhaitez dépenser :

![Flux de dépense Keystone et Zashi](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito suit un modèle d'isolation des clés très similaire à celui de Keystone, mais son implémentation est plus récente. Plutôt que de s'associer à un portefeuille compagnon existant comme Zashi, Hito est livré avec son propre portefeuille Android, et le processus d'intégration entre l'appareil matériel et cette application Android est documenté dans les jalons de développement de Hito.

**Intégration : ce que reçoit l'application Hito**

Le portefeuille Android utilise :

- la Unified Full Viewing Key (UFVK)
- l'adresse unifiée
- l'empreinte de la phrase de récupération ZIP-32
- les informations sur le réseau

lors de l'intégration du compte matériel.

Notez que l'application Android ne reçoit jamais la phrase de récupération ni les clés de dépense privées du portefeuille matériel.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Que reçoit l'application Hito ?**

Les informations d'intégration documentées comprennent :

- l'UFVK
- l'adresse unifiée
- l'empreinte de la phrase de récupération ZIP-32
- le réseau

L'UFVK donne au portefeuille Android les informations dont il a besoin pour gérer le compte en tant que portefeuille en lecture seule, sans recevoir la phrase de récupération. L'empreinte de la phrase de récupération est un identifiant de longueur fixe dérivé de celle-ci, utilisé pour reconnaître chaque compte ; ce n'est pas la phrase de récupération elle-même et elle ne confère aucune capacité de dépense, c'est pourquoi sa présence ne contredit pas l'affirmation ci-dessus selon laquelle l'application « ne reçoit jamais la phrase de récupération ».

**Qu'est-ce qui reste sur Hito ?**

La phrase de récupération elle-même, les clés de dépense privées et l'autorité de signature restent sur l'appareil matériel. Hito effectue ensuite la signature hors ligne.

Le jalon actuel de Hito indique que l'ensemble du processus de création, d'exportation, de signature hors ligne et d'importation est opérationnel, avec un transport BLE et une exportation par code QR BBQr du PCZT signé.

Ce processus mérite d'être décrit explicitement, car il constitue l'exemple concret du cycle complet présenté plus haut dans ce rapport : le portefeuille Android crée le PCZT non signé, l'exporte vers Hito, Hito le signe hors ligne avec ses clés isolées, puis le PCZT signé est réimporté dans le portefeuille Android.

À aucun moment la phrase de récupération ou la clé de dépense ne franchit cette frontière, dans un sens comme dans l'autre.

![Flux de signature Hito](/content-images/hito-signing-flow.webp)

## Orchard à Ironwood : l'évolution de la prise en charge des portefeuilles matériels

Orchard est un pool protégé du protocole Zcash qui permet aux utilisateurs de conserver des ZEC et d'effectuer des transactions avec une confidentialité renforcée. Introduit lors de la mise à niveau du réseau 5 (NU5), Orchard utilise le système de preuves Halo 2 et une architecture cryptographique repensée afin de prendre en charge les transactions protégées sans révéler d'informations sensibles sur la transaction, comme l'expéditeur, le destinataire ou le montant.

Ironwood est un pool protégé introduit lors de la mise à niveau du réseau NU6.3 de Zcash pour succéder au pool Orchard. Il utilise le protocole cryptographique Orchard tout en apportant des modifications destinées à améliorer la sécurité à long terme des fonds protégés, notamment la récupérabilité face aux ordinateurs quantiques et des garanties plus solides quant à l'intégrité de l'offre.

Précisons d'emblée que Ironwood n'a pas remplacé le protocole Orchard par un système cryptographique entièrement nouveau. Ironwood a été introduit comme un nouveau pool protégé construit à partir du protocole Orchard existant. Les deux partagent donc la même structure d'Action, le même système de preuves Halo 2 et les mêmes constructions de notes et de clés.

Ironwood possède son propre arbre d'engagements de notes, son propre ensemble de nullifiers, sa propre ancre et son propre pool de valeur : au niveau du consensus, il s'agit donc d'un pool véritablement distinct. Sur le plan cryptographique, en revanche, c'est une extension de Orchard plutôt qu'une reconstruction.

Il a été conçu ainsi pour :

1. **Garantir l'intégrité de l'offre.** Le 29 mai 2026, le chercheur en sécurité Taylor Hornby a signalé en privé une faille de robustesse critique dans le système de preuves à divulgation nulle de connaissance de Orchard, qui aurait pu permettre de créer des ZEC contrefaits sans laisser de trace on-chain. Comme les données des transactions de Orchard sont privées, personne ne peut vérifier de manière indépendante qu'aucun ZEC contrefait n'a été créé avant la correction. Sceller l'ancien pool et en démarrer un nouveau à zéro résout ce problème d'une manière qu'un simple correctif appliqué à Orchard ne permettait pas.
2. **Assurer la récupérabilité face aux ordinateurs quantiques.** Ironwood a été conçu pour que ses fonds puissent bénéficier d'un futur mécanisme de récupération si les hypothèses du logarithme discret sur lesquelles il repose venaient à être cassées.
3. **Limiter les modifications d'implémentation.** Plutôt que de concevoir un protocole protégé entièrement nouveau, l'architecture éprouvée de Orchard a été réutilisée. Il a ainsi fallu écrire beaucoup moins de nouveau code pour les transactions, les preuves, les portefeuilles et les portefeuilles matériels.

### La chronologie publique

- 29 mai : la vulnérabilité de Orchard est divulguée.
- Juin : les transactions Orchard sont temporairement restreintes pendant le déploiement d'un premier correctif via NU6.2. Le 12 juin, un développeur principal fixe au 21 juillet la date de la mise à niveau complète, qui sera ensuite repoussée d'une semaine. La communauté s'inquiète que les détenteurs de Keystone soient les derniers à pouvoir migrer ; un développeur principal répond alors que Keystone prendra en charge Ironwood dès le premier jour, avec un firmware prévu pour le 3 juillet, sous réserve de la finalisation des constantes de signature et des modifications de l'API Orchard par l'équipe principale de Zcash.
- Début juillet : NU6.3 arrive sur le testnet ; Zebra 6.0.0 sort le 10 juillet.
- 27-28 juillet : les travaux de signature PCZT v2 pour Ironwood de Ledger sont fusionnés dans une branche d'intégration. Ironwood (NU6.3) est activé le 28 juillet au bloc 3 428 143. Il scelle le pool Orchard d'origine derrière un sas comptable qui plafonne la quantité de ZEC pouvant sortir de Orchard au montant qui y a été légitimement déposé, et introduit un nouveau format de transaction.

Zebra devient le nœud obligatoire, puisque zcashd ne prend pas en charge les nouvelles règles de consensus. Les adresses ne changent pas, car Ironwood réutilise la structure de destinataire de Orchard : les portefeuilles orientent donc automatiquement les adresses existantes vers le nouveau pool. Ce dont les portefeuilles ont besoin, en revanche, c'est d'une fonction de migration, car les fonds Orchard doivent tôt ou tard être transférés vers Ironwood par leurs propriétaires, et les nouvelles sorties à destination de Orchard sont désormais entièrement bloquées par le consensus.

### Ce qui a changé sur le plan technique

Les formats de transaction sont passés de la version 5 à la version 6, de sorte qu'une même transaction peut contenir un composant Ironwood en plus des composants Sapling/Orchard/transparents existants. PCZT a été étendu en conséquence :

- L'encodage est passé de PCZT v1 à v2.
- Un bundle Ironwood distinct s'ajoute désormais aux bundles Sapling et Orchard.
- Les transactions v6 et un nouveau sighash v6 sont pris en charge.
- Les textes en clair des notes ont reçu une nouvelle version (V3).

C'est le changement de sighash qui compte le plus pour les portefeuilles matériels. En v6, les ancres Orchard et Ironwood sont exclues du hachage de signature et n'alimentent que le condensé des données d'autorisation. Il s'agit d'une véritable modification du firmware, pas d'un simple changement de numéro de version. L'appareil doit implémenter correctement le nouveau sighash et le recalculer lui-même plutôt que de se fier à ce que l'application compagnon prétend lui faire approuver.

Le contrat d'isolation, lui, n'a pas changé : l'appareil ne renvoie toujours que la signature d'autorisation de dépense, jamais `alpha`, et ne produit jamais la signature de liaison ; l'hôte continue de se charger des preuves et de tout le reste.

Une règle de signature a toutefois changé avec la v6 : les dépenses factices de remplissage sont signées par le finaliseur IO et non par l'appareil, puisque celui-ci n'a aucun moyen de les vérifier par rapport à des données de note réelles. Le rôle de signataire de l'appareil les ignore au lieu d'avoir à signer quelque chose qu'il ne peut pas contrôler. Les frais affichés additionnent désormais aussi les soldes de valeur de Orchard et de Ironwood, puisqu'une transaction v6 peut dépenser depuis l'un ou l'autre pool dans la même transaction.

Tenir correctement cette comptabilité des pools compte en pratique, et pas seulement en théorie. Un bug récent dans le portefeuille Zcash de Brave elle-même en est une bonne illustration : son calcul des frais supposait que toutes les entrées protégées appartenaient à l'ancien pool Orchard, ce qui entraînait des actions dupliquées et des estimations de frais erronées dès qu'une transaction impliquait réellement Ironwood. C'est précisément le type d'erreur que le principe « recalculez vous-même, ne faites pas confiance à l'hôte », au cœur de la signature par portefeuille matériel, est censé détecter. Un portefeuille compagnon s'est trompé dans la comptabilité des pools, et seul un appareil vérifiant ses propres calculs de manière indépendante pourrait le signaler avant de valider la signature.

### Où en est chaque signataire

**Ledger vient de changer complètement la donne.** Le 23 septembre 2026, Ledger a intégré la prise en charge native des Zcash protégés directement dans Ledger Wallet Desktop, sans qu'aucune application compagnon distincte ne soit plus nécessaire. Votre clé de dépense reste sur l'appareil, l'ordinateur effectue les calculs de la transaction, et vous approuvez tout à l'écran avant la signature. Seul Ironwood est pris en charge, pas les anciens pools Orchard ou Sapling. L'inconvénient est que l'ancienne application « Zcash Shielded » développée par Zondax, qui nécessitait un portefeuille compagnon comme Zkool, est abandonnée. Ledger retire cette ancienne application le 5 novembre : si vous l'utilisez encore, vous devez transférer vos fonds avant cette date.

**Keystone est en bonne posture.** Le firmware 3.0.2 a apporté la prise en charge complète de Ironwood dès juillet, et il reste la version stable actuellement requise. Cette version ou une version plus récente est toutefois nécessaire pour signer quoi que ce soit.

**Hito a dépassé le premier jalon du testnet.** Il a réussi à signer et à soumettre sa première vraie transaction de Orchard vers Ironwood sur du matériel physique (d'abord sur le testnet). Des mises à jour ultérieures ont confirmé des flux sur le mainnet (Ironwood→Ironwood, Ironwood→transparent, entre autres) sur du matériel de production. Un firmware stable et une diffusion plus large sont encore en préparation.

Zondax et Zkool sont actuellement dans une situation incertaine. C'est l'application de Zondax qui est retirée de Ledger. Zkool, qui s'appuyait sur cette application pour communiquer avec les appareils Ledger, n'a pas indiqué ce que deviendra ce rôle une fois l'ancienne application disparue. On ne sait pas s'il restera pertinent pour les utilisateurs de Ledger à l'avenir, ou si son avenir se jouera surtout avec d'autres appareils.

La migration elle-même est la conséquence la plus importante. Comme le montant qui passe d'un pool à l'autre est public, les portefeuilles répartissent les transferts en montants standards dans le temps plutôt que de déplacer un solde en un seul bloc visible. Cela implique de nombreuses transactions à signer pour chaque migration, et c'est précisément pourquoi la signature PCZT par lots était si importante pour les portefeuilles matériels.

Les travaux sur le firmware de Ledger se sont également heurtés aux limites du matériel : une vraie dépense de note pouvait nécessiter des dizaines de milliers d'appels système cryptographiques en une seule commande, déclenchant le chien de garde de l'appareil. La correction a consisté à transférer l'arithmétique des corps finis vers le logiciel et a exigé un état de travail partagé pour respecter les contraintes de pile de Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### L'évolution en une image

![L'évolution en une image](/content-images/orchard-to-ironwood-evolution.webp)
