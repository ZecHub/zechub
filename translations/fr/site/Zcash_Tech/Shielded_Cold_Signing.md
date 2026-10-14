# Signature à froid protégée

> **Idée clé :** Le portefeuille compagnon voit tout ce qui est nécessaire pour créer et surveiller une transaction protégée. Seul le portefeuille matériel détient l’autorité nécessaire pour autoriser une dépense. Cette séparation est précisément l’objectif de la signature à froid protégée.

Le blindage dans Zcash consiste à déplacer des fonds d’une adresse publique et transparente vers une adresse privée et protégée, en masquant les détails de la transaction grâce aux fonctionnalités de confidentialité de Zcash.

### Que se passe-t-il lorsque vous protégez des ZEC ?

Avec une transaction transparente en Zcash, des informations telles que :

- l’adresse de l’expéditeur
- l’adresse du destinataire
- le montant transféré

peuvent être observées sur la blockchain.

Lorsque vous protégez des ZEC, vos fonds sont déplacés vers un pool privé (tel que Ironwood). La blockchain peut vérifier qu’une transaction est valide sans révéler les détails privés de votre transaction. Depuis la mise à niveau NU6.3 du 28 juillet 2026, les nouveaux fonds protégés sont placés dans le pool Ironwood, car l’ancien pool Orchard n’accepte plus de nouveaux dépôts, tout en autorisant toujours les retraits.

### Composants d’une transaction protégée

### 1. La note (l’enregistrement du solde protégé)

Une note est un enregistrement cryptographique privé représentant un montant non dépensé de ZEC détenu par un utilisateur.

Contrairement à une blockchain publique, où les soldes sont affichés en clair, une note protégée chiffre la valeur et les informations de propriété afin que les observateurs on-chain ne puissent pas voir qui possède les fonds.

Lorsqu’il initie une transaction, le portefeuille compagnon analyse le registre, identifie les notes non dépensées de l’utilisateur et sélectionne les notes à dépenser.

### 2. Le nullifier (le mécanisme de détection des doubles dépenses)

Comme les détails d’une note sont cachés du registre public, le réseau a besoin d’un mécanisme pour détecter les doubles dépenses sans révéler quelle note est dépensée.

Un nullifier est un marqueur cryptographique unique dérivé d’une note spécifique. Lorsqu’une note est dépensée, son nullifier est publié sur la blockchain.

Le réseau vérifie que le nullifier n’a pas été enregistré auparavant. Si ce n’est pas le cas, la dépense peut être acceptée. Il est essentiel qu’un observateur externe ne puisse pas utiliser le nullifier pour déterminer de quelle note spécifique il provient.

Le portefeuille compagnon dérive et construit le nullifier approprié lors de l’assemblage des données de transaction.

## Clés

Les clés sont des éléments d’information cryptographiques qui contrôlent l’accès à vos fonds et permettent à votre portefeuille d’effectuer des opérations telles que recevoir, consulter et dépenser des ZEC.

Un portefeuille contient plusieurs clés différentes, chacune ayant un objectif différent, de la même manière qu’un même compte peut disposer d’identifiants distincts pour l’accès en lecture et l’accès en écriture.

Les clés sont au cœur de la relation entre le portefeuille compagnon et le portefeuille matériel, car différentes clés remplissent différentes fonctions, et une seule d’entre elles doit rester verrouillée.

Il est important de savoir que chaque pool protégé construit ses clés sous la forme d’un arbre de dérivation, où les flèches vont d’un composant vers tout ce qui peut en être dérivé. Les utilisateurs qui souhaitent recevoir des paiements protégés doivent disposer d’une adresse de paiement protégée, générée à partir d’une clé de dépense.

### La hiérarchie des clés

**1. Clé de dépense**

C’est la clé la plus sensible du point de vue de la sécurité. Elle confère la capacité cryptographique d’autoriser la dépense de ZEC.

C’est la clé à laquelle il est fait référence chaque fois que l’expression « le portefeuille matériel détient la clé » apparaît ailleurs dans ce rapport.

Dans une architecture de signature à froid, la clé de dépense est conservée dans le portefeuille matériel et n’est jamais exposée au portefeuille compagnon. Le portefeuille compagnon ne devrait pas avoir besoin de posséder cette clé.

Dans Sapling comme dans Orchard, les hiérarchies de clés dérivent l’autorité de dépense et les capacités de consultation sous la forme de deux branches distinctes provenant d’une clé de dépense racine :

- **Sapling :** Une clé de dépense étendue (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘) dérive des clés d’autorisation de preuve (𝑎𝑘,𝑛𝑠𝑘) et des clés de visualisation complètes (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘), lesquelles produisent ensuite des clés de visualisation entrantes (𝑖𝑣𝑘) et des adresses diversifiées.
- **Orchard :** Une clé de dépense racine (𝑠𝑘) se divise directement en une clé d’autorisation de dépense (𝑎𝑠𝑘) et une clé de visualisation complète (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘).

Cette séparation structurelle constitue le fondement cryptographique formel de l’isolation des clés matérielles : le portefeuille exporte la branche de visualisation (UFVK) vers l’ordinateur hôte pour la synchronisation du solde et la création des transactions, tout en maintenant la branche d’autorisation de dépense verrouillée de façon permanente sur l’appareil.

La dérivation de clés est strictement unidirectionnelle. Cela signifie que les clés de visualisation ne peuvent pas être inversées pour reconstituer l’autorité de dépense. Cette irréversibilité cryptographique rend sûre l’exportation d’une Unified Full Viewing Key (UFVK), car elle offre une visibilité complète du portefeuille sans exposer les secrets de dépense présents sur l’appareil.

**2. Clés de visualisation**

Zcash sépare la capacité de voir l’activité protégée de celle de la dépenser. Une clé de visualisation permet à un portefeuille ou à une autre partie autorisée de consulter des informations sur les transactions protégées sans accorder l’autorité de dépense.

- **Full Viewing Key (FVK), encapsulée dans une Unified Full Viewing Key (UFVK) :** délibérément dérivée de la clé de dépense, elle permet au logiciel de détecter et de déchiffrer l’activité protégée du portefeuille, et ainsi d’identifier les transactions. Elle lui permet également de calculer les soldes sans pouvoir autoriser une dépense. Elle est mieux décrite comme un dérivé moins privé de la clé de dépense, et non comme une copie affaiblie de la seed.

La Full Viewing Key (FVK) offre une visibilité complète en lecture seule tout en maintenant une stricte séparation de sécurité. En déchiffrant les textes chiffrés des notes entrantes et sortantes (via son composant de clé de visualisation sortante), un portefeuille compagnon ne disposant que de la FVK peut afficher un historique de transactions complet et étiqueté, plutôt qu’un simple solde cumulé.

De multiples adresses de paiement diversifiées et non corrélables partagent la même FVK et la même clé de visualisation entrante (IVK), ce qui permet une génération illimitée d’adresses sans augmenter la charge d’analyse de la blockchain.

Cette séparation fonctionnelle constitue la base des flux de signature à froid. L’analyse continue de la chaîne, le suivi de l’historique et la gestion des adresses sont tous délégués au logiciel hôte, tandis que l’autorité de dépense reste isolée sur l’appareil matériel.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### La distinction cruciale : UFVK contre clé de dépense

> **L’UFVK peut être partagée. La clé de dépense doit rester sur le portefeuille matériel.**
>
> Le portefeuille compagnon utilise la clé de visualisation pour surveiller le portefeuille, détecter les fonds entrants, identifier les notes et aider à préparer les transactions. Il ne détient pas la clé privée nécessaire pour autoriser une dépense.

Comme indiqué précédemment, la séparation des clés constitue le fondement de l’architecture de signature à froid.

Le portefeuille compagnon peut effectuer la majeure partie du travail nécessaire pour préparer une transaction sans jamais contrôler les fonds. Le portefeuille matériel n’a besoin que de recevoir la transaction préparée et d’effectuer l’opération finale de signature.

Les fabricants de portefeuilles matériels n’ont pas besoin d’inventer eux-mêmes cette séparation. La conception des clés de Zcash sépare déjà les capacités de visualisation de l’autorité de dépense au niveau du protocole, et les fabricants ne font que construire leurs fonctions de signature et d’exportation sur cette structure existante. Le protocole permet de dériver des informations telles qu’une adresse protégée ou une clé de visualisation complète à partir d’une clé de dépense, tandis que la clé de dépense elle-même demeure privée, ce qui permet à des portefeuilles matériels tels que Ledger, Keystone et Hito de fournir au logiciel compagnon les informations de visualisation dont il a besoin sans jamais exposer la clé privée permettant de dépenser les fonds.

### Ce que fait réellement le portefeuille compagnon avec les informations de clé

À l’aide des données de clé de visualisation, le portefeuille compagnon peut :

- identifier vos fonds et vos notes
- déterminer quelles notes peuvent être dépensées
- dériver ou identifier les adresses pertinentes
- construire la transaction
- générer ou coordonner les preuves requises
- préparer la transaction pour la signature

Il est important de savoir que devoir construire une transaction n’est pas la même chose que devoir disposer de la clé privée de dépense. Ce découplage est l’une des idées de sécurité fondamentales derrière l’intégration des portefeuilles matériels.

## Construction et autorisation de transactions protégées

Voici les processus impliqués dans la création et l’autorisation de la transaction. En termes simples, ce sont les processus qui correspondent à ce que le portefeuille fait réellement avec ces données pour envoyer de l’argent :

### Construction de la transaction (assemblage de la transaction protégée)

La construction d’une transaction consiste à assembler les informations nécessaires à la création d’une transaction Zcash valide à partir du paiement envisagé par l’utilisateur.

Le processus de construction combine les notes sélectionnées, les destinataires, les montants, les frais, les nullifiers et les autres données de transaction requises dans une structure de transaction. Pour les transactions protégées, il prépare également les informations nécessaires à la génération des preuves à divulgation nulle de connaissance et des signatures requises.

Le portefeuille compagnon effectue généralement cette étape. Il :

- sélectionne les notes à dépenser
- détermine les entrées et les sorties de la transaction
- calcule les valeurs nécessaires
- prépare les données de transaction qui seront ensuite prouvées et signées.

Dans une configuration de signature à froid, les données de transaction résultantes peuvent être empaquetées dans un PCZT et transmises au portefeuille matériel pour l’étape de signature critique pour la sécurité.

### Preuve (démonstration de la validité du protocole)

La preuve désigne la génération de preuves à divulgation nulle de connaissance (telles que Halo 2 ou Groth16) qui démontrent qu’une transaction respecte les règles du protocole Zcash.

La preuve aide le réseau à garantir que :

- l’utilisateur qui dépense est autorisé à dépenser les notes ;
- les notes existent réellement ;
- les nullifiers correspondants sont uniques ;
- le total des entrées est égal au total des sorties plus les frais.

Elle accomplit tout cela sans révéler les détails privés sous-jacents.

La génération de preuves est intensive sur le plan computationnel. Confier cette responsabilité à l’appareil compagnon évite au portefeuille matériel de se bloquer ou de manquer de mémoire.

### Signature (autorisation de la dépense)

La signature est fondamentalement distincte de la preuve. Une signature numérique agit comme un cachet d’autorisation explicite produit par le détenteur de la clé privée.

Alors qu’une preuve à divulgation nulle de connaissance vérifie la validité de la transaction, une signature numérique prouve l’autorité de dépense. La signature certifie que le véritable propriétaire approuve les paramètres spécifiques du transfert.

La signature nécessite une puissance de calcul minimale, ce qui la rend idéale pour un portefeuille matériel.

### Qu’est-ce que la signature à froid protégée ?

La signature à froid protégée est une méthode permettant d’autoriser une transaction protégée en Zcash tout en gardant les clés privées de dépense isolées du portefeuille compagnon connecté à Internet. La transaction peut être construite et préparée sur un ordinateur en ligne, tandis qu’un portefeuille matériel distinct, conservé hors ligne ou autrement isolé, utilise ses clés protégées pour autoriser la transaction.

Le processus peut être simplifié ainsi :

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Le portefeuille compagnon envoie les paramètres structurés de la transaction à l’appareil matériel, qui signe la charge utile en interne sans jamais divulguer la clé privée de dépense à la machine hôte.

## Portefeuilles compagnons et matériels

Les transactions protégées peuvent impliquer à la fois un portefeuille compagnon et un portefeuille matériel, chacun remplissant une fonction distincte.

### Portefeuille compagnon

Qu’est-ce qu’un portefeuille compagnon ?

Le portefeuille compagnon fonctionne sur un ordinateur ou un appareil mobile et effectue la plupart des tâches liées à la création de la transaction, telles que :

- sélectionner les notes à dépenser ;
- construire la transaction ;
- calculer les données de transaction nécessaires ;
- coordonner la génération des preuves à divulgation nulle de connaissance requises.

### Pourquoi un portefeuille compagnon est-il utile ?

Le portefeuille compagnon gère le processus de création de transaction, mais si l’ordinateur est infecté par un malware, un attaquant pourrait être capable de :

- voir ce que vous faites ;
- modifier une transaction non signée ;
- tenter de vous inciter à approuver quelque chose.

Le portefeuille compagnon n’a pas besoin d’accéder à la clé privée stockée sur le portefeuille matériel ; il peut donc gérer la construction des transactions et d’autres tâches computationnelles tandis que le portefeuille matériel fournit la frontière de sécurité pour la clé privée.

### Portefeuille matériel

Un portefeuille matériel est un appareil physique hors ligne qui isole vos clés privées des téléphones ou ordinateurs connectés, agissant comme un coffre-fort sécurisé pour vos crypto-actifs.

### Pourquoi un portefeuille matériel est-il utile ?

Si votre ordinateur est infecté par un malware, un attaquant pourrait être capable de :

- voir ce que vous faites ;
- modifier une transaction non signée ;
- tenter de vous inciter à approuver quelque chose.

La clé privée ne peut pas être simplement extraite du portefeuille matériel ; l’appareil peut donc agir comme une frontière de sécurité.

Image des capacités du portefeuille compagnon par rapport au portefeuille matériel

La séparation entre ces deux portefeuilles est particulièrement importante pour les transactions protégées, car elles sont plus complexes que les transactions transparentes et impliquent des composants tels que des notes protégées, des nullifiers, des engagements, des preuves à divulgation nulle de connaissance et des signatures de transaction.

Il serait peu pratique que le portefeuille matériel effectue chaque opération computationnelle. Le portefeuille compagnon prépare plutôt la transaction et fournit les informations nécessaires au portefeuille matériel pour la signature, tandis que la clé privée de dépense reste isolée au sein de l’appareil matériel.

## Isolation des clés

> L’isolation des clés signifie que les clés privées pouvant autoriser une dépense ne quittent jamais le portefeuille matériel. Le compagnon peut préparer la transaction ; il ne peut pas la signer.

L’isolation des clés désigne le fait de garder les clés privées requises pour autoriser une transaction séparées du portefeuille compagnon et de l’appareil sur lequel il fonctionne. Dans une configuration de signature à froid protégée, le portefeuille compagnon peut construire la transaction et coordonner les preuves requises, tandis que le portefeuille matériel conserve les clés privées de dépense sensibles isolées.

Si l’ordinateur ou le téléphone compagnon est compromis, un attaquant peut être en mesure d’interagir avec la transaction avant sa signature, mais ne peut idéalement pas extraire la clé privée du portefeuille matériel. La clé demeure donc à l’intérieur de la frontière de sécurité de l’appareil matériel.

Cette séparation permet au portefeuille compagnon d’effectuer la construction des transactions et les tâches computationnelles sans lui donner un accès direct aux données de clé nécessaires pour autoriser la transaction.

![Key isolation](/content-images/key-isolation.webp)

La distinction essentielle à faire est que « clé de visualisation » ne signifie pas que l’application reçoit une version affaiblie de la seed.

Dans Zcash, une Full Viewing Key (FVK/UFVK) est délibérément dérivée de la clé de dépense et donne à son détenteur la capacité de détecter et de déchiffrer l’activité protégée pertinente, mais pas d’autoriser des dépenses. La FVK est un dérivé moins secret de la clé de dépense.

**Une importante réserve concernant la confidentialité :**

Il faut donc savoir que l’application ne peut pas voler les fonds avec l’UFVK seule, mais qu’elle peut voir l’activité protégée privée du portefeuille.

C’est pourquoi il est plus exact de décrire l’application compagnon comme disposant d’une *autorité de visualisation*, plutôt que de simplement dire qu’elle possède des « informations publiques ».

La manière la plus simple d’exprimer l’ensemble du concept est que le portefeuille compagnon reçoit suffisamment de données de clé pour savoir ce qui arrive au portefeuille, mais pas suffisamment de données de clé pour autoriser ce qui arrive aux fonds du portefeuille. Le portefeuille matériel, lui, conserve toutefois l’autorité de dépense isolée et ne l’utilise que lorsque l’utilisateur approuve une transaction.

C’est le modèle central d’isolation des clés derrière ces conceptions de portefeuilles matériels protégés en Zcash, et c’est le même modèle qui apparaît, implémentation après implémentation, dans Ledger, Keystone et Hito, qui seront bientôt abordés.

## PCZT

PCZT signifie Partially Created Zcash Transaction. C’est le paquet qui transporte une transaction Zcash ainsi que les informations nécessaires pour la terminer d’une étape à l’autre.

Il s’agit d’un format standardisé pour une transaction Zcash alors que la transaction est encore en cours de création. Il permet à différents participants ou appareils d’effectuer différentes parties du processus de création de transaction et de se transmettre la transaction partiellement achevée.

Construire une transaction est considérablement plus complexe que signer un simple transfert public dans des protocoles de cryptomonnaies à divulgation nulle de connaissance tels que Zcash. Les transactions protégées nécessitent des preuves à divulgation nulle de connaissance intensives sur le plan computationnel, telles que celles générées avec Halo 2 ou Groth16. Par conséquent, les appareils à faible puissance tels que les portefeuilles matériels peuvent ne pas disposer de la mémoire et de la capacité de traitement nécessaires pour gérer l’ensemble du flux de transaction.

L’introduction de PCZT répond à plusieurs défis fondamentaux de l’architecture crypto protégée. PCZT est un format de données intermédiaire standardisé qui décompose la création des transactions en rôles modulaires et indépendants. Il permet à un ordinateur compagnon puissant de gérer l’assemblage des transactions et la génération des preuves, tout en limitant strictement un portefeuille matériel hors ligne à l’autorisation et à la signature.

### Limitations du matériel et du stockage à froid

Bien que les portefeuilles matériels offrent un environnement sécurisé pour protéger les clés privées de dépense, ils disposent généralement de RAM, de puissance de calcul et de capacités de transfert de données limitées par rapport aux ordinateurs compagnons. Ces contraintes rendent peu pratique l’exécution d’une génération de preuves à divulgation nulle de connaissance intensive sur le plan computationnel ou le maintien de l’état complet de la transaction requis au cours du processus de construction de transaction.

En conséquence, le portefeuille compagnon peut gérer les tâches exigeantes sur le plan computationnel, tandis que le portefeuille matériel reste concentré sur l’opération critique pour la sécurité consistant à autoriser la transaction avec ses clés de dépense protégées.

Cela amène à se demander : si l’appareil est aussi contraint, comment peut-il tout de même effectuer *assez* de vérifications pour être digne de confiance ?

Pour le dire simplement, un portefeuille matériel ne peut pas accepter une valeur arbitraire provenant d’un ordinateur compagnon et la signer. Il lui faut des informations suffisantes pour établir que la valeur signée correspond à la transaction que l’utilisateur souhaite autoriser. Cela crée un équilibre difficile, car l’appareil doit effectuer suffisamment d’analyse et de vérification pour protéger le processus de signature, tout en opérant dans des limites strictes de mémoire, de calcul, de taille de firmware et de complexité d’implémentation.

La gestion de Ledger Orchard PCZT est un exemple de ce défi, suggérant qu’une analyse spécialisée dépendante des circuits peut rendre l’implémentation plus gérable sur des appareils contraints, mais peut aussi nécessiter des changements de firmware lorsque les structures de transaction ou les circuits pris en charge évoluent.

Deux efforts en cours illustrent différentes réponses à cette même contrainte.

Une proposition de recherche portant sur un pipeline de preuve entièrement à temps constant, adapté aux architectures de portefeuilles matériels open source et aux ordinateurs ordinaires, a été soumise dans le cadre de la subvention n° 423. L’objectif était d’étudier une infrastructure cryptographique pouvant être implémentée de manière sécurisée dans des environnements tels que C ou Rust, tout en réduisant la complexité et la charge de maintenance de la prise en charge protégée de Zcash.

Une autre approche est toutefois représentée par le **Zcash SeedSigner** proposé, un signataire open source isolé par air gap et construit à partir de composants peu coûteux et facilement disponibles. Son flux proposé maintient l’ordinateur compagnon séparé de l’appareil de signature, en faisant passer un PCZT à travers un air gap pour vérification et signature sur l’appareil.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Ensemble, ces approches illustrent le défi d’ingénierie plus large derrière les portefeuilles matériels protégés : la construction de transactions et la génération de preuves peuvent se produire hors de l’appareil critique pour la sécurité, mais le signataire doit tout de même disposer de suffisamment d’informations et de capacités de vérification pour autoriser en toute sécurité la transaction résultante.

### PCZT permet l’architecture répartie

La norme Partially Created Zcash Transaction (PCZT) est la structure de données formelle qui relie le portefeuille compagnon et le portefeuille matériel.

Un portefeuille compagnon est capable de gérer la sélection des notes, de calculer les nullifiers et de générer la preuve à divulgation nulle de connaissance de manière autonome. Cela est possible parce que les informations nécessaires à ces étapes, y compris la clé utilisée pour dériver les nullifiers, proviennent de la clé de visualisation plutôt que de tout élément lié à l’autorité de dépense. Le portefeuille compagnon empaquette ensuite ces éléments dans un conteneur PCZT.

Le PCZT est remis au portefeuille matériel, qui lit le contexte de la transaction (comme les montants et les adresses des destinataires), applique la signature à l’aide de ses clés de dépense protégées et remet le PCZT mis à jour à l’appareil compagnon.

Cette conception établit une frontière de sécurité stricte : le matériel hôte puissant peut effectuer des calculs complexes à divulgation nulle de connaissance sans avoir besoin d’accéder aux clés de dépense, tandis que les appareils de stockage à froid de faible puissance peuvent assurer la sécurité financière sans avoir à calculer de cryptographie lourde.

### Compromis de confidentialité du prouveur

Bien que déléguer la génération des preuves à divulgation nulle de connaissance au portefeuille compagnon ou à un autre prouveur maintienne les clés de dépense isolées, cela exige toujours que le prouveur accède à des informations de transaction sensibles, telles que les valeurs des notes, les adresses des destinataires et les engagements.

Le PCZT maintient la séparation architecturale en garantissant que ces informations peuvent être fournies pour la génération de preuves sans transférer les clés privées de dépense requises pour l’autorisation.

Cela garantit que l’autorité de preuve est séparée de l’autorité de dépense. Le prouveur peut effectuer la génération de preuves intensive sur le plan computationnel sans acquérir l’autorité cryptographique de dépenser les fonds de l’utilisateur.

### Interopérabilité de PCZT

À mesure que PCZT devient un élément important des flux de portefeuilles matériels, de multisignature et de signature isolée par air gap en Zcash, l’interopérabilité entre les implémentations indépendantes devient de plus en plus importante.

Une proposition de juin 2026 par AngryDavee a relevé que des implémentations de PCZT existaient déjà dans des projets comprenant Ledger, Keystone, Hito, OneKey et l’implémentation de référence dans librustzcash. Toutefois, la proposition a identifié l’absence de tests partagés permettant de confirmer que ces implémentations interprètent les PCZT de manière cohérente.

La solution proposée était une suite de tests d’interopérabilité open source contenant des vecteurs de test canoniques PCZT et des tests inter-implémentations couvrant le flux complet création → signature → finalisation. Elle proposait également de tester les limites des rôles, telles que le Combiner, où des informations partiellement signées provenant de différents signataires peuvent être combinées avant la finalisation d’une transaction.

Cela est particulièrement pertinent pour les portefeuilles matériels, car PCZT permet de séparer la construction et la signature des transactions : un portefeuille compagnon peut construire une transaction et préparer un PCZT, tandis qu’un appareil matériel reçoit les informations de signature requises et effectue l’opération de signature critique pour la sécurité.

La proposition n’a pas été mise en œuvre parce que Zcash Community Grants a décidé de ne pas poursuivre la subvention après avoir examiné la proposition et pris en compte les retours de la communauté. En conséquence, la suite de tests inter-implémentations proposée n’a pas été développée dans le cadre de cette subvention. Il s’agit donc d’une réponse proposée à un défi d’interopérabilité PCZT identifié, et non d’une norme qui existe actuellement dans l’ensemble de Zcash.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Le cycle de vie d’un PCZT

| # | Étape | Description |
|---|---|---|
| 1 | Créateur | Initialise le PCZT avec les métadonnées globales de la transaction, y compris les versions de transaction, les identifiants de branche de consensus et les indicateurs de pool. |
| 2 | Constructeur | Remplit la transaction avec les entrées et sorties prévues dans les pools transparent, Sapling, Orchard ou Ironwood. |
| 3 | Finaliseur d’E/S | Déclare l’ensemble des entrées et sorties complet, calcule les clés de signature de liaison et signe les dépenses fictives lorsque cela est requis. |
| 4 | Metteur à jour | Joint les données de contexte nécessaires aux participants suivants, telles que les clés de visualisation complètes, les ancres et les témoins Merkle. |
| 5 | Prouveur et signataire | Exécute la génération de preuves à divulgation nulle de connaissance et la signature cryptographique. Dans les versions modernes de PCZT, ces deux tâches sont entièrement indépendantes et peuvent se dérouler séquentiellement ou en parallèle. |
| 6 | Combiner | Fusionne de façon déterministe plusieurs instances PCZT si différents appareils travaillent simultanément sur des aspects de la même transaction. Les règles de fusion exigent une résolution stricte des conflits afin d’éviter toute perte de données accidentelle. |
| 7 | Finaliseur de dépense et extracteur | Valide tous les éléments cryptographiques requis, supprime les métadonnées de contexte intermédiaires et produit la transaction Zcash finalisée prête à être diffusée sur le réseau. |

## Implémentations réelles de portefeuilles matériels

### En un coup d’œil

| Appareil   | Ce que reçoit le compagnon              | Ce qui reste sur l’appareil          | Transport      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, adresses            | Autorité de dépense                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Seed / clés de dépense              | QR (air gap)|
| Hito     | UFVK, Unified Address, empreinte de seed  | Seed et clés privées de dépense    | QR / local     |


Plusieurs implémentations de portefeuilles matériels ont été développées afin d’explorer comment les transactions protégées en Zcash peuvent être prises en charge tout en maintenant les clés de dépense sensibles isolées du portefeuille compagnon. Ledger, Keystone et Hito représentent différentes approches pour intégrer une protection des clés basée sur le matériel au flux de transaction Zcash.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Pour comprendre comment ils protègent les fonds protégés, il est important de distinguer les clés de dépense des clés de visualisation. Dans les trois cas, la séparation suit la même structure :

| Appareil | Ce que l’application compagnon peut recevoir | Ce qui demeure protégé sur l’appareil |
|---|---|---|
| Ledger | UFVK / Orchard FVK, adresses et informations publiques | Autorité de dépense / données de clé privée |
| Keystone | UFVK + Unified Address | Seed / clés de dépense |
| Hito | UFVK, Unified Address, empreinte de seed et informations réseau | Seed et clés privées de dépense |

### Ledger comme environnement de signature matériel

Ledger est une entreprise de portefeuilles matériels. Ses appareils sont construits autour d’un Secure Element, une puce dédiée conçue pour détenir les données de clé privée et les maintenir physiquement isolées du reste de l’appareil, ainsi que de tout ce qui y est connecté. Ce Secure Element est la raison même pour laquelle un appareil Ledger est fiable pour le stockage à froid. Cela signifie que même si l’ordinateur ou le téléphone qui y est connecté est compromis, les clés contenues dans le Secure Element ne peuvent pas être extraites.

Pris isolément, toutefois, un appareil Ledger est vierge vis-à-vis d’une cryptomonnaie spécifique. Il doit disposer d’une application installée qui sait gérer la cryptographie particulière de cette monnaie.

Un appareil Ledger est vierge vis-à-vis d’une cryptomonnaie spécifique ; il a donc besoin d’une application qui connaît la cryptographie de cette monnaie. Pour Zcash, il y a eu deux générations :

- L’application originale « Zcash Shielded » développée par Zondax, utilisée avec des portefeuilles compagnons tels que Zkool et dont le retrait est prévu le 5 novembre 2026, et
- la nouvelle application Zcash de Ledger (3.9.4+), utilisée nativement par Ledger Wallet Desktop 4.21+ pour les ZEC protégés en Ironwood.

Le modèle d’isolation des clés ci-dessous s’applique aux deux.

Zkool est le portefeuille compagnon sur votre téléphone ou votre ordinateur qui communique avec cette application. Il construit la transaction, l’envoie au Ledger, l’application Zondax sur l’appareil la signe ensuite et renvoie la signature.

Ainsi, Zondax est le logiciel qui fonctionne sur le matériel, et Zkool est le logiciel qui fonctionne à l’extérieur de celui-ci en utilisant l’application de Zondax pour communiquer avec l’appareil.

### Que quitte le Ledger ?

Le logiciel Zcash de Ledger comprend une fonction spécifique permettant d’exporter la clé de visualisation du portefeuille, c’est-à-dire la clé qui permet au logiciel de voir les soldes et les transactions sans pouvoir dépenser quoi que ce soit.

Cette fonction peut retourner l’une de deux choses :

- Une Unified Full Viewing Key (UFVK), qui est la clé de visualisation complète couvrant simultanément tous les pools protégés de Zcash, ou
- Une Orchard Full Viewing Key (FVK)

Dans les deux cas, ce qui sort n’est jamais qu’une clé de visualisation. Quelle que soit la version demandée, cette fonction n’a aucun moyen de retourner le seul élément d’information qui permettrait réellement à quelqu’un de déplacer des fonds : la clé de dépense.

C’est tout l’objectif de sa conception : elle est conçue de telle sorte que la seule chose qu’elle peut exporter est quelque chose de sûr à remettre à une application compagnon.

La hiérarchie de clés de Zcash est structurée de sorte que, pour chaque pool protégé, la clé de dépense dérive deux éléments distincts :

- une clé d’autorisation de dépense, et
- une clé de visualisation complète.

La FVK peut ensuite dériver d’autres capacités liées à la visualisation, mais à aucun moment ce chemin de dérivation ne ramène à l’autorité de dépense. Une fois qu’une clé s’est ramifiée dans le côté visualisation de la hiérarchie, elle y reste et ne peut pas être utilisée pour reconstituer la clé d’autorité de dépense dont elle provient.

Ironwood suit ce même schéma, puisqu’il réutilise la construction sous-jacente des clés et des notes de Orchard. Il s’agit cependant d’un pool distinct au niveau du consensus, avec son propre arbre d’engagements et son propre ensemble de nullifiers. Cela signifie qu’une UFVK est en réalité un ensemble de clés de visualisation par pool (transparent, Sapling, Orchard et maintenant Ironwood), et non une clé plate unique.

Une UFVK exportée avant l’activation de Ironwood n’inclura pas de clé de visualisation Ironwood, puisque ce pool n’existait pas encore. C’est précisément pourquoi les portefeuilles ont dû être mis à jour pour reconnaître et dériver des UFVK compatibles avec Ironwood après la mise à niveau NU6.3.

### Que reste-t-il sur Ledger ?

L’autorité de dépense reste sur l’appareil.

Le Signer Ledger reçoit une transaction/un PCZT depuis l’hôte et génère la signature d’autorisation de dépense selon le pool depuis lequel la transaction dépense (le pool Ironwood, car l’intégration actuelle de Ledger prend uniquement en charge Ironwood). La signature est ensuite produite sur l’appareil, et l’hôte ne reçoit que la signature, et non la clé privée de dépense.

Cela est également cohérent avec le modèle de sécurité général de Ledger. Son Secure Element isole les données de clé privée, et les exigences de sécurité des applications de Ledger interdisent explicitement aux applications d’exposer ces secrets à l’hôte.

Le signataire de Ledger peut exporter la FVK/UFVK tout en effectuant indépendamment la signature des transactions. Ces deux capacités sont fournies par des fonctions distinctes, et non regroupées dans une seule.

### Qu’est-ce que cela signifie en pratique ?

Supposons que votre Ledger contienne 10 ZEC.

Le portefeuille compagnon peut disposer de l’UFVK et donc déterminer : « Ce portefeuille a reçu 10 ZEC. » Il peut analyser et afficher les transactions et les soldes.

Mais si quelqu’un compromet le portefeuille compagnon, l’UFVK seule ne lui donne pas la capacité de créer la signature d’autorisation de dépense.

L’objectif de la signature distincte d’autorisation de dépense est de permettre à des appareils contraints tels que les portefeuilles matériels d’autoriser des dépenses protégées sans avoir à effectuer eux-mêmes la preuve complète zk-SNARK.

### Application Zondax Ledger ; le côté portefeuille matériel

#### Qu’est-ce que Zondax ?

Zondax est une entreprise de développement tierce qui a créé l’application Ledger Zcash. Il s’agit de l’application firmware qui fonctionne réellement sur le matériel Ledger et donne à l’appareil la capacité de comprendre et de traiter les transactions Zcash.

Zondax est un développeur externe. Le matériel Ledger n’a aucune capacité innée à traiter les transactions Zcash, et cette capacité provient entièrement du logiciel de Zondax.

### Implémentation originale de Zcash Ledger

Le dépôt de l’application Ledger Zcash de Zondax est le logiciel qui s’exécute sur un appareil Ledger. L’application s’est initialement concentrée sur les transactions protégées Sapling, avant que Orchard n’existe comme pool protégé principal de Zcash ; ainsi, la prise en charge de Sapling représentait toute l’étendue de ce qu’un appareil Ledger pouvait faire avec des ZEC protégés.

Son architecture illustre cette séparation : le côté hôte/compagnon prépare les informations de transaction tandis que le Ledger gère les opérations sensibles sur les clés et la signature.

Même dans cette première version de la prise en charge des portefeuilles matériels Zcash, les principes fondamentaux — construction et preuve sur l’hôte, puis signature isolée sur l’appareil — constituaient déjà la conception.

### Évolution vers Orchard

Le travail de Ledger s’est orienté vers Orchard + PCZT. Il s’agissait d’une transition significative plutôt que d’une mise à jour mineure, étant donné que Orchard utilise un système de preuve différent (Halo 2, contre Groth16 de Sapling) et une construction différente des notes et des clés. Étendre un firmware limité à Sapling pour gérer la signature Orchard exigeait donc de nouveaux fondements cryptographiques côté appareil, et pas seulement un correctif de firmware.

Cependant, à mesure que Zcash évoluait vers Ironwood, Zondax et Ledger ont réorienté leur développement vers la prise en charge directe de Ironwood, plutôt que d’achever une implémentation Orchard pour ensuite la reconcevoir pour Ironwood. Cela représente une étape supplémentaire dans l’évolution de l’implémentation Ledger, car Ironwood s’appuie sur l’architecture cryptographique de Orchard tout en introduisant un pool protégé distinct et des changements de protocole supplémentaires.

### Ce qui se produit dans cette application Ledger

Le flux résultant est décrit ainsi :

1. L’hôte construit un PCZT.
2. L’hôte envoie les informations de transaction pertinentes à l’appareil Ledger.
3. L’appareil produit les signatures d’autorisation de dépense Orchard.
4. L’hôte gère tout ce qui suit, y compris la signature de liaison et l’assemblage final de la transaction.

L’application fonctionnant dans le Ledger ne voit ni ne produit rien au-delà de la signature d’autorisation de dépense elle-même, et tout le travail lourd sur le plan computationnel ou exigeant en données (preuve, liaison, assemblage) reste sur l’hôte, auquel il n’est pas nécessaire de confier les données de clé.

### Intégration protégée native de Ledger ; Ledger Wallet Desktop

La dernière intégration Zcash de Ledger offre un exemple concret de la manière dont la construction des transactions protégées et la signature critique pour la sécurité peuvent être séparées entre un logiciel compagnon et un portefeuille matériel.

Avec Ledger Wallet Desktop 4.21+ et l’application d’appareil Zcash 3.9.4+, les utilisateurs peuvent envoyer et recevoir des ZEC protégés en Ironwood directement via Ledger Wallet Desktop. L’intégration prend en charge les transferts privé-à-privé, le blindage depuis le pool transparent, le déblindage vers le pool transparent, les adresses de réception privées et les mémos. Les transactions sont vérifiées et signées sur l’appareil Ledger plutôt que de se fier uniquement aux informations présentées par l’ordinateur.

Une partie essentielle de cette architecture est la séparation des capacités de visualisation et de dépense. Lors de la synchronisation des soldes privés, le Ledger exporte une Unified Full Viewing Key (UFVK), qui est stockée localement sur l’ordinateur. L’UFVK permet à Ledger Wallet Desktop de détecter les transactions protégées pertinentes et de déterminer le solde du portefeuille, mais elle ne fournit pas l’autorité nécessaire pour dépenser les fonds. L’autorité de dépense critique pour la sécurité demeure sur l’appareil Ledger, qui effectue l’opération finale de signature. Cela crée une frontière claire entre l’ordinateur, qui gère l’état du portefeuille et construit les transactions, et l’appareil matériel, qui protège la capacité nécessaire pour autoriser les dépenses.

Toutefois, l’intégration actuelle est spécifiquement limitée à Ironwood. Elle n’affiche ni ne gère les fonds Orchard ou Sapling via Ledger Wallet Desktop. Cela est historiquement important, car le développement antérieur de Zcash de Ledger était associé à la prise en charge protégée de Orchard avant que l’implémentation évolue vers le protocole Ironwood.

La transition met également en évidence l’importance de la compatibilité des clés et des comptes. Ledger dispose d’une ancienne application « Zcash Shielded » développée par Zondax et utilisée par des intégrations telles que YWallet et zkool, qui est désormais retirée. Comme cette ancienne application utilisait un schéma de dérivation différent pour les comptes protégés, ses comptes Sapling ne peuvent pas être simplement reproduits par la nouvelle application Ledger.

L’intégration illustre donc à la fois les progrès et les limitations restantes de la prise en charge des portefeuilles matériels protégés. Ledger peut désormais fournir une expérience complète Ironwood dans laquelle le logiciel compagnon gère la synchronisation du portefeuille et la préparation des transactions, tandis que l’appareil matériel demeure la frontière de sécurité pour la dépense.

Dans le même temps, la compatibilité historique des comptes, la prise en charge de pools protégés spécifiques seulement, les limites de taille des transactions matérielles, les restrictions de plateforme et les contraintes de calcul et de firmware liées à l’analyse et à la vérification des transactions protégées montrent que la prise en charge par portefeuille matériel de Zcash dépend non seulement des capacités du protocole, mais aussi de la conception et des ressources de chaque implémentation individuelle.

### Zkool + Ledger — utilisation de l’application officielle Zondax

En tant que successeur de Ywallet, Zkool a hérité de l’objectif de signature à froid protégée, mais a emprunté une voie différente pour l’atteindre, façonnée directement par le fait que la cryptographie seule ne rend pas une intégration utilisable si l’application de signature ne peut pas être distribuée de manière sûre.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Utilisation par Zkool de l’application Zondax

Zkool a évolué vers l’utilisation de l’application officielle Ledger Zcash développée par Zondax, plutôt que de l’application propriétaire abandonnée Ledger de Ywallet. Au lieu de maintenir une application personnalisée que le magasin de Ledger n’accepterait pas, Zkool s’est appuyé sur l’application déjà acceptée et distribuée à travers l’écosystème propre à Ledger.

Ce changement signifiait que les utilisateurs n’avaient plus besoin de compter sur l’installation d’une application Ledger personnalisée non signée pour utiliser cette intégration, puisque l’application de Zondax était officiellement distribuée par l’écosystème de Ledger.

Toutefois, cette intégration fait face à un changement important le 5 novembre 2026, lorsque la prise en charge de l’application historique Zcash Shielded doit prendre fin alors que Ledger la retire progressivement. Comme l’intégration Ledger de Zkool repose sur cette application, ce changement soulève des questions quant à la disponibilité future de la connexion existante. L’incidence précise sur Zkool dépend de sa capacité à continuer d’utiliser l’application historique en dehors de Ledger Wallet ou à passer à une alternative compatible.

### Pools protégés pris en charge

Selon le développeur de Ywallet, l’intégration Ledger de Zkool utilisait l’application officielle Ledger développée par Zondax et prenait en charge les Zcash transparents comme protégés. Toutefois, sa prise en charge protégée était limitée à Sapling et ne prenait pas en charge Orchard, ainsi que d’autres limitations d’intégration telles qu’un maximum de cinq entrées et sorties de chaque type et l’absence de compatibilité avec Ledger Live.

Cette limitation reflétait le périmètre de l’implémentation sous-jacente Zondax Ledger à l’époque. Le travail antérieur Ledger de Zondax assurait la prise en charge de Sapling, et sa version 2024 ultérieure de l’application Zcash Shielded Ledger excluait initialement Orchard et les Unified Addresses. Une intégration construite autour de cette application héritait donc des capacités et des limitations de l’implémentation de portefeuille matériel dont elle dépendait.

La situation a ensuite évolué avec la sortie de l’application dédiée Zcash Shielded Ledger en novembre 2024. Zondax a déclaré que l’application avait été officiellement publiée via Ledger Live et a ensuite publié des conseils d’intégration ainsi que des packages Rust et JavaScript permettant à d’autres portefeuilles de l’intégrer. Au lancement, cependant, l’application communiquait exclusivement avec Zecwallet Lite Desktop, tandis que des intégrations de portefeuilles plus larges étaient encore en développement.

L’étape suivante a été le développement de la nouvelle application Rust basée sur Ledger de Zcash. En juin 2026, Ledger a indiqué que le partage d’UFVK et la génération de Orchard Unified Address avaient été implémentés, tandis que la signature de transactions Orchard et ClearSign étaient encore en développement. Ledger a également déclaré que le travail se poursuivrait dans la voie Ironwood à mesure que le protocole évoluerait.

Ironwood a ensuite nécessité des mises à jour dans l’ensemble de l’écosystème de portefeuilles Zcash. Zkool a publié la prise en charge de la migration Orchard vers Ironwood à partir de la version 6.24.0 et a continué à affiner le pipeline de migration et de transaction dans les versions ultérieures. Ledger, séparément, a fusionné la signature PCZT v2 dans sa nouvelle application le 27 juillet, bien que l’implémentation n’ait pas encore achevé l’examen de Ledger ni le déploiement de Ledger Live le 20 août ; ce jalon a depuis été publié, Ledger Wallet Desktop 4.21+ offrant désormais directement une prise en charge native de Ironwood.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Ainsi, il est préférable de comprendre l’évolution non comme une seule mise à niveau de Zondax vers Ironwood, mais comme plusieurs développements liés : l’implémentation originale Zondax axée sur Sapling, l’application Zcash Shielded Ledger de 2024, la nouvelle application Ledger Rust avec prise en charge de Orchard et PCZT, l’intégration native propre de Ledger dans Ledger Wallet Desktop et les mises à jour parallèles de portefeuilles tels que Zkool à mesure que l’écosystème passait à Ironwood.

### Prise en charge actuelle des appareils et plateformes Ledger pour Zcash

La prise en charge de Zcash sur Ledger dépend :

- du modèle de l’appareil ;
- de l’application installée ;
- de la plateforme utilisée pour le gérer ; et
- du caractère transparent ou protégé de la transaction.

Au 21 juillet 2026 (dernière mise à jour de Ledger), l’application Zcash Shielded est prise en charge sur les Nano S Plus, Stax et Flex, mais pas encore sur les Nano X ou Nano Gen5.

Le Nano X et les autres modèles, à l’exception du Nano S d’origine, peuvent toujours utiliser l’application classique Zcash, qui prend en charge les transactions transparentes et la dépense de fonds protégés vers des adresses transparentes (déblindage), mais pas la signature protégé-à-protégé. Le Nano S d’origine ne prend en charge aucune des deux applications, car Ledger abandonne progressivement la prise en charge de l’appareil et sa dernière application Zcash n’est pas disponible sur celui-ci. Les appareils se connectent à Ledger Wallet (anciennement Ledger Live), l’application compagnon de Ledger, disponible sur ordinateur pour Windows, macOS et Linux, ainsi que sur mobile pour iOS et Android.

Ledger a ajouté des Zcash protégés natifs à Ledger Wallet Desktop, construits sur le pool Ironwood, ce qui supprime la nécessité d’un portefeuille compagnon distinct. Les ZEC protégés ne sont pas encore pris en charge dans l’application mobile de Ledger pour iOS et Android, bien qu’une prise en charge mobile soit prévue dans une future version.

En dehors du propre logiciel de Ledger, l’utilisation protégée dépend d’un portefeuille compagnon compatible et des plateformes qu’il prend en charge. Alors que Ledger continue d’étendre la prise en charge de Ironwood, la compatibilité dépend du modèle d’appareil, du firmware, de la version de l’application et du système d’exploitation ; une prise en charge générale de Zcash ne garantit donc pas nécessairement la compatibilité.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### Signature à froid YWallet ; une approche antérieure

Ywallet est un portefeuille compagnon, distinct de Ledger comme de Zondax, qui a suivi sa propre voie vers la signature à froid protégée.

Ywallet est historiquement important car il a exploré la signature à froid pour Zcash, ce qui signifiait que l’appareil de signature pouvait être maintenu séparé du portefeuille en ligne.

Pour réaliser cette architecture sur du matériel Ledger, Ywallet a créé sa propre application Ledger, une application propriétaire distincte de l’application Zondax abordée dans la section précédente. Cela signifiait que Ywallet ne s’appuyait pas sur l’implémentation existante Sapling de Zondax ; il disposait de son propre firmware exécutant le côté signature de la relation.

### Pourquoi l’intégration importait

Disposer de la cryptographie et du code de signature ne suffit pas. L’intégration d’un portefeuille matériel n’est pas un problème purement cryptographique ; c’est aussi inévitablement un problème de distribution et de plateforme. Au minimum, elle implique :

- l’approbation/la distribution de l’application — le fait que la boutique officielle d’applications du fabricant matériel accepte et distribue ou non l’application ;
- la sécurité du firmware/de l’application — le fait que l’application respecte ou non les exigences de sécurité du fabricant pour la gestion des données de clé ;
- les protocoles de communication — la manière dont le portefeuille compagnon et l’appareil échangent réellement les données de transaction ;
- la compatibilité avec le portefeuille — le fait que les formats de données et le flux de l’application de signature correspondent ou non à ce qu’attend le portefeuille compagnon ;
- les pools protégés pris en charge — lesquels parmi Sapling, Orchard (et maintenant Ironwood) l’application peut réellement signer.

L’application propriétaire Ledger de Ywallet satisfaisait aux exigences cryptographiques et architecturales ; elle pouvait signer des transactions Zcash protégées, mais elle n’a pas été acceptée dans la boutique d’applications officielle de Ledger.

### Abandon de l’application propriétaire Ledger

Comme l’application n’était pas officiellement acceptée, Ywallet aurait dû demander aux utilisateurs d’installer un firmware non signé pour l’utiliser. Cela constitue un véritable compromis de sécurité pour les utilisateurs, et Ywallet a choisi de ne pas le leur demander. Ywallet a donc finalement abandonné cette intégration particulière plutôt que de suivre cette voie.

Plutôt que de relancer une application propriétaire, le développement ultérieur (via Zkool, le successeur de Ywallet) s’est orienté vers l’application Ledger officielle développée par Zondax, remplaçant une implémentation personnalisée rejetée par une implémentation standardisée déjà acceptée dans l’écosystème de distribution de Ledger. Ce changement a fini par rendre à nouveau possible une intégration Ledger fonctionnelle.

### L’héritage de Ywallet

Même après que Ywallet se soit retiré du développement actif, son créateur, Hanh, qui est également membre de ZCG, est resté une voix pertinente dans l’écosystème, en particulier lorsque la migration de Ironwood a fait émerger des problèmes signalés concernant des fonds qui semblaient avoir disparu.

**ZODL : un véritable utilisateur a rencontré des fonds manquants après la migration Orchard → Ironwood**

Un utilisateur, Jmo0615, a signalé que des fonds précédemment visibles dans son portefeuille ZODL n’apparaissaient plus après la migration de Orchard vers Ironwood. Il a déclaré avoir restauré la seed d’origine, réinitialisé et récupéré le portefeuille, et avoir laissé la version 3.14.1 (1) de ZODL se synchroniser complètement. Il a également confirmé qu’aucun portefeuille matériel Keystone n’était impliqué.

Il n’a pas été établi que les fonds étaient réellement perdus. Il s’agit plutôt vraisemblablement d’un problème de découverte du portefeuille ou lié à la migration, où des fonds auparavant visibles n’étaient plus affichés après la transition vers Ironwood. Les fonds qui ne sont pas détectés ou affichés ne devraient pas automatiquement être décrits comme définitivement perdus, et cette distinction est importante pour comprendre les problèmes de migration.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool : des « notes verrouillées » peuvent expliquer des fonds apparemment indisponibles**

Un autre aspect important des portefeuilles protégés est la manière dont l’état du portefeuille peut affecter les fonds qu’un utilisateur peut réellement dépenser. Hanh a expliqué qu’un utilisateur peut accidentellement verrouiller une note via le contrôle des pièces, une fonctionnalité qui permet aux utilisateurs de choisir manuellement quelles notes sont utilisées pour la dépense. Dans cette situation, une note peut toujours exister dans le portefeuille, mais être marquée comme indisponible à la dépense.

Cela met en évidence une distinction importante lors de l’étude des problèmes de portefeuille. Le montant de ZEC qui existe dans un portefeuille n’est pas toujours le même que le montant actuellement disponible à la dépense. Des facteurs tels que la sélection des notes, la synchronisation, l’état de migration, la récupération du portefeuille et les paramètres de contrôle des pièces peuvent affecter le solde affiché ou dépensable. Les signalements de « fonds manquants » doivent donc soigneusement distinguer les fonds qui ne sont pas détectés ou affichés, les fonds détectés mais indisponibles à la dépense, et les fonds réellement perdus.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Qu’est-ce que Keystone ?**

Keystone est un portefeuille matériel isolé par air gap. Son appareil de signature ne dispose d’aucune connexion filaire ou sans fil directe à l’application compagnon pendant le processus de signature lui-même et communique plutôt via des codes QR. Il est associé ici à Zashi (désormais renommé Zodl), le portefeuille compagnon natif de Zcash, et cet appariement rend le principe d’isolation des clés particulièrement explicite et facile à retracer.

**Le flux Keystone/Zashi**

L’intégration Zcash de Keystone avec Zashi rend cette séparation particulièrement explicite. Lorsque vous connectez Keystone à Zashi, la Unified Full Viewing Key est transférée de Keystone vers Zashi.

Le flux est donc :

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Que peut faire Zashi avec l’UFVK ?**

Zashi peut l’utiliser pour :

- identifier les transactions protégées entrantes ;
- déterminer les soldes ;
- obtenir des informations sur l’activité protégée.

Mais il ne peut pas dépenser les fonds simplement parce qu’il possède l’UFVK.

L’UFVK est une « capacité de visualisation » qui permet de connaître les soldes et les transactions, mais pas de dépenser.

### Que reste-t-il à l’intérieur de Keystone ?

La seed/l’autorité de dépense reste sur Keystone. Zashi ne reçoit ni la seed, ni la clé de dépense, ni la clé privée d’autorisation de dépense. Il reçoit l’UFVK, les informations d’adresse et les informations nécessaires à un fonctionnement en lecture seule.

Ensemble, ces deux moitiés complètent le tableau. Ce qui quitte l’appareil, tel que l’UFVK, les adresses et les informations de surveillance seule, est suffisant pour que Zashi surveille le compte, mais rien de ce qui quitte l’appareil ne suffit à déplacer des fonds hors de celui-ci.

C’est pourquoi l’intégration Zashi et Keystone peut fournir un stockage à froid protégé. L’application de portefeuille peut surveiller le compte sans posséder l’autorité requise pour en dépenser les fonds. L’intégration a été spécifiquement lancée afin de permettre le stockage à froid de ZEC protégés.

Lorsque vous souhaitez dépenser :

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito suit un modèle d’isolation des clés très similaire à celui de Keystone, mais son implémentation est plus récente. Plutôt que de s’associer à un portefeuille compagnon existant comme Zashi, Hito est fourni avec son propre portefeuille Android, et le processus d’intégration entre l’appareil matériel et cette application Android est documenté dans les jalons de développement de Hito.

**Intégration : ce que reçoit l’application Hito**

Le portefeuille Android utilise :

- la Unified Full Viewing Key (UFVK) ;
- Unified Address ;
- l’empreinte de seed ZIP-32 ;
- les informations réseau.

lors de l’intégration du compte matériel.

Notez que l’application Android ne reçoit jamais la seed ou les clés privées de dépense du portefeuille matériel.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Que reçoit l’application Hito ?**

Les informations d’intégration documentées incluent :

- UFVK
- Unified Address
- empreinte de seed ZIP-32
- réseau

L’UFVK donne au portefeuille Android les informations nécessaires pour exploiter le compte en tant que portefeuille capable de visualisation sans recevoir la seed. L’empreinte de seed est un identifiant de longueur fixe dérivé de la seed, utilisé pour reconnaître quel compte correspond à quel compte ; elle n’est pas la seed elle-même et ne confère aucune capacité de dépense, ce qui explique pourquoi sa présence ne contredit pas l’affirmation ci-dessus selon laquelle la seed n’est « jamais reçue ».

**Que reste-t-il sur Hito ?**

La seed réelle, les clés privées de dépense et l’autorité de signature restent sur l’appareil matériel. Hito effectue ensuite la signature hors ligne.

Le jalon actuel de Hito indique que l’ensemble du flux de création, d’exportation, de signature hors ligne et d’importation est opérationnel, avec le transport BLE et l’exportation QR BBQr du PCZT signé.

Ce flux mérite d’être nommé explicitement, puisqu’il constitue l’exemple concret du cycle complet abordé plus haut dans ce rapport : le portefeuille Android crée le PCZT non signé, l’exporte vers Hito, Hito signe hors ligne avec ses données de clé isolées, et le PCZT signé est réimporté dans le portefeuille Android.

À aucun moment la seed ou la clé de dépense ne franchit cette frontière, dans un sens ou dans l’autre.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## De Orchard à Ironwood : l’évolution de la prise en charge des portefeuilles matériels

Orchard est un pool protégé du protocole Zcash qui permet aux utilisateurs de stocker et de transférer des ZEC avec une confidentialité renforcée. Introduit dans Network Upgrade 5 (NU5), Orchard utilise le système de preuve Halo 2 et une architecture cryptographique repensée pour prendre en charge les transactions protégées sans révéler les informations sensibles de transaction telles que l’expéditeur, le destinataire ou le montant.

Ironwood est un pool protégé introduit dans la mise à niveau réseau NU6.3 de Zcash en tant que successeur du pool Orchard. Il utilise le protocole cryptographique Orchard tout en introduisant des changements conçus pour améliorer la sécurité à long terme des fonds protégés, y compris la récupérabilité quantique et de meilleures garanties quant à l’intégrité de l’offre.

D’emblée, il est essentiel de préciser que Ironwood n’a pas remplacé le protocole Orchard par un système cryptographique entièrement nouveau. Ironwood a été introduit comme un nouveau pool protégé construit à partir du protocole Orchard existant. Cela signifie qu’ils ont la même structure Action, le même système de preuve Halo 2 et les mêmes constructions de notes et de clés.

Ironwood possède son propre arbre d’engagements de notes, son propre ensemble de nullifiers, son ancre et son pool de valeurs ; il s’agit donc véritablement d’un pool distinct au niveau du consensus. Mais du point de vue cryptographique, c’est une extension de Orchard plutôt qu’une reconstruction.

Il a été conçu ainsi pour :

1. **Intégrité de l’offre.** Le 29 mai 2026, le chercheur en sécurité Taylor Hornby a divulgué en privé une faille critique de solidité dans le système de preuve à divulgation nulle de connaissance de Orchard, qui aurait pu permettre de créer des ZEC contrefaits sans laisser de trace on-chain. Comme les données de transaction de Orchard sont privées, personne ne peut vérifier indépendamment qu’aucun ZEC contrefait n’a été créé avant le correctif. Sceller l’ancien pool et en créer un nouveau à zéro résout ce problème d’une façon qu’un correctif de Orchard sur place ne pouvait pas résoudre.
2. **Garantir la récupérabilité quantique.** Ironwood a été conçu de sorte que ses fonds puissent participer à un futur mécanisme de récupération si les hypothèses sous-jacentes sur le logarithme discret étaient un jour compromises.
3. **Minimiser les changements d’implémentation.** Au lieu de concevoir un protocole protégé entièrement nouveau, l’architecture éprouvée de Orchard a été réutilisée. Cela signifiait qu’il fallait écrire beaucoup moins de code de transaction, de preuve, de portefeuille et de portefeuille matériel à partir de zéro.

### La chronologie publique

- 29 mai : la vulnérabilité Orchard est divulguée.
- Juin : les transactions Orchard sont temporairement restreintes pendant qu’un correctif initial est publié via NU6.2. Le 12 juin, un développeur principal vise le 21 juillet pour la mise à niveau complète ; celle-ci est ensuite repoussée d’une semaine. Une préoccupation de la communauté est soulevée selon laquelle les détenteurs de Keystone seraient les derniers à migrer ; un développeur principal répond alors que Keystone prendrait en charge Ironwood dès le premier jour, avec un firmware ciblé pour le 3 juillet, sous réserve de constantes de signature finalisées et de modifications de l’API Orchard provenant du cœur de Zcash.
- Début juillet : NU6.3 atteint le testnet ; Zebra 6.0.0 est publié le 10 juillet.
- 27–28 juillet : le travail de signature Ironwood PCZT v2 de Ledger est fusionné dans une branche d’intégration. Ironwood (NU6.3) s’active le 28 juillet au bloc 3 428 143, scellant le pool Orchard d’origine derrière un tourniquet qui plafonne la quantité de ZEC pouvant sortir de Orchard au montant qui y avait été légitimement déposé, et introduit un nouveau format de transaction.

Zebra devient le nœud requis, car zcashd ne prend pas en charge les nouvelles règles de consensus. Les adresses ne changent pas parce que Ironwood réutilise la structure de receiver de Orchard ; les portefeuilles dirigent donc automatiquement les adresses existantes vers le nouveau pool. Ce dont les portefeuilles ont besoin, c’est d’une fonctionnalité de migration, car les fonds Orchard doivent finalement être déplacés par leurs propriétaires vers Ironwood, et les nouvelles sorties qui reçoivent des Orchard sont désormais entièrement bloquées par consensus.

### Changements techniques

Les formats de transaction sont passés de la version 5 à la version 6, de sorte qu’une seule transaction peut transporter un composant Ironwood aux côtés des composants existants Sapling/Orchard/transparents. PCZT a été étendu en conséquence :

- L’encodage est passé de PCZT v1 à v2.
- Un bundle Ironwood distinct se trouve désormais à côté des bundles Sapling et Orchard.
- Les transactions v6 et un nouveau sighash v6 sont pris en charge.
- Les textes en clair des notes ont acquis une nouvelle version (V3).

La modification du sighash est particulièrement importante pour les portefeuilles matériels. En v6, les ancres Orchard et Ironwood sont exclues du hachage de signature et ne contribuent qu’au condensat des données d’autorisation. Il s’agit d’un véritable changement de firmware, et non d’une simple mise à jour de version. Un appareil doit implémenter correctement le nouveau sighash et le recalculer lui-même, plutôt que de faire confiance à ce que l’application compagnon prétend approuver.

Le contrat d’isolation lui-même n’a pas changé : l’appareil ne renvoie toujours que la signature d’autorisation de dépense, jamais `alpha`, et ne produit jamais la signature de liaison ; l’hôte gère toujours la preuve et tout le reste.

Une règle de signataire a toutefois changé avec v6 : les dépenses de remplissage fictives sont signées par le finaliseur d’E/S plutôt que par l’appareil, puisque l’appareil ne peut pas les vérifier par rapport à des données de notes réelles. Le rôle Signer de l’appareil les ignore plutôt que d’être invité à signer quelque chose qu’il ne peut pas vérifier. Les frais affichés additionnent également désormais les soldes de valeur Orchard et Ironwood, puisqu’une transaction v6 peut dépenser depuis l’un ou l’autre pool dans la même transaction.

Une comptabilité correcte des pools est importante dans la pratique, et pas seulement en théorie. Un bug récent dans le portefeuille Zcash propre à Brave en fournit une illustration utile : son calcul des frais supposait que toutes les entrées protégées appartenaient au pool historique Orchard, ce qui entraînait des actions dupliquées et des estimations de frais incorrectes chaque fois qu’une transaction impliquait réellement Ironwood. C’est précisément le type d’erreur que le principe « recalculer soi-même, ne pas faire confiance à l’hôte » derrière la signature de portefeuille matériel vise à détecter. Un portefeuille compagnon s’est trompé dans la comptabilité du pool, et seul un appareil vérifiant indépendamment ses propres calculs signalerait cela avant de le signer.

### Situation de chaque signataire

**Ledger vient de changer complètement la donne.** Le 23 septembre 2026, Ledger a publié la prise en charge native des Zcash protégés directement dans Ledger Wallet Desktop, sans qu’une application compagnon distincte soit désormais nécessaire. Votre clé de dépense reste sur l’appareil, l’ordinateur effectue les calculs de transaction et vous approuvez tout à l’écran avant la signature. Il ne prend en charge que Ironwood, pas les anciens pools Orchard ou Sapling. L’inconvénient est que l’application historique « Zcash Shielded » créée par Zondax, qui nécessitait un portefeuille compagnon comme Zkool pour fonctionner, est abandonnée. Ledger retire cette ancienne application de la disponibilité le 5 novembre, de sorte que toute personne l’utilisant encore doit déplacer ses fonds avant cette date.

**Keystone est en bonne position.** Le firmware 3.0.2 a ajouté la prise en charge complète de Ironwood dès juillet, et c’est toujours l’exigence stable actuelle. Cette version ou une version ultérieure est toutefois nécessaire pour signer quoi que ce soit.

**Hito a dépassé le jalon initial du testnet.** Il a signé et soumis avec succès sa première véritable transaction Orchard vers Ironwood sur du matériel physique, initialement sur testnet. Les mises à jour ultérieures ont confirmé les flux mainnet (Ironwood→Ironwood, Ironwood→Transparent et d’autres) sur du matériel de production. Le firmware stable et une sortie plus large sont toujours en cours.

Zondax et Zkool sont actuellement en transition. L’application de Zondax est celle qui est retirée sur Ledger. Zkool, qui s’appuyait sur cette application pour communiquer avec les appareils Ledger, n’a pas indiqué ce qu’il adviendra de ce rôle une fois l’ancienne application disparue. Il n’est pas clair s’il restera pertinent pour les utilisateurs de Ledger à l’avenir ou si son avenir se situera principalement avec d’autres appareils.

La migration elle-même constitue la principale répercussion. Comme le montant traversant les pools est public, les portefeuilles répartissent les transferts entre des dénominations standard au fil du temps plutôt que de déplacer un solde en une seule tranche visible ; cela implique de nombreuses transactions à signer par migration, et explique précisément pourquoi la signature par lots PCZT était si importante pour les portefeuilles matériels.

Le travail de firmware de Ledger s’est également heurté à des limites matérielles : la dépense d’une note réelle pouvait atteindre des dizaines de milliers d’appels système cryptographiques en une seule commande, déclenchant le watchdog de l’appareil. Le correctif a déplacé l’arithmétique de corps vers le logiciel et a nécessité un état de travail partagé afin de tenir dans les contraintes de pile de Nano X.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### L’évolution en une image

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
