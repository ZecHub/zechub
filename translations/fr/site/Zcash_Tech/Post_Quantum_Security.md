<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sécurité post-quantique dans Zcash

## En bref

- Les ordinateurs quantiques représentent un risque futur, car ils pourraient casser une partie de la cryptographie à clé publique utilisée aujourd'hui par les blockchains.
- « Post-quantique » désigne une cryptographie qui fonctionne sur des ordinateurs ordinaires, mais qui est conçue pour résister aux attaques des futurs ordinateurs quantiques.
- Zcash n'est pas entièrement post-quantique aujourd'hui.
- Zcash protégé réduit la quantité de données de transaction publiques que de futurs attaquants pourraient étudier, mais un usage protégé n'équivaut pas à une résistance quantique complète.
- Zcash se prépare grâce à la recherche, aux ZIP et à des propositions de mise à niveau telles que la ZIP 2005 et le projet Tachyon.
- Une migration post-quantique sûre doit protéger à la fois les fonds, la confidentialité, les portefeuilles, les exchanges et les règles de consensus.

Pour savoir ce que Ironwood a changé et consulter l'état daté de chaque élément, voir [Zcash est-il post-quantique ?](/zcash-tech/is-zcash-post-quantum).

## Qu'est-ce que l'informatique quantique ?

Un ordinateur classique stocke l'information sous forme de bits. Chaque bit vaut soit `0`, soit `1`.

Un ordinateur quantique utilise des bits quantiques, appelés qubits. Les qubits peuvent être exploités par des algorithmes spéciaux qui résolvent certains problèmes mathématiques beaucoup plus rapidement que les ordinateurs classiques.

Cela ne signifie pas qu'un ordinateur quantique est plus rapide en tout. Le risque est spécifique. Une partie de la cryptographie repose sur des problèmes mathématiques très difficiles pour les ordinateurs classiques, mais beaucoup plus faciles pour un ordinateur quantique suffisamment puissant.

Pour les blockchains, l'exemple le plus important est la cryptographie à clé publique. Les clés publiques et les signatures servent à prouver qu'un utilisateur est autorisé à dépenser des pièces.

## Pourquoi les blockchains sont concernées

Les blockchains utilisent la cryptographie pour plusieurs tâches différentes :

| Outil cryptographique | Ce qu'il fait | Impact quantique |
| --- | --- | --- |
| Signatures numériques | Prouvent que le propriétaire a autorisé une dépense | Risque élevé pour les systèmes courants à courbes elliptiques |
| Fonctions de hachage | Construisent les adresses, les engagements, les arbres de Merkle et les défis | Risque plus faible, mais les marges de sécurité comptent |
| Preuves à divulgation nulle de connaissance | Prouvent que les transactions protégées sont valides sans en révéler les détails | Dépend du système de preuve et de ses hypothèses |
| Accord de clé | Aide les portefeuilles à chiffrer les données des notes pour les destinataires | Nécessite un examen attentif dans un modèle de menace quantique |

Un ordinateur quantique suffisamment puissant pourrait menacer de nombreux schémas de signature utilisés aujourd'hui, y compris les signatures à courbes elliptiques. C'est important, car c'est la signature qui permet au réseau de savoir qu'une transaction a été autorisée par la bonne clé.

Les fonctions de hachage sont différentes. L'algorithme de Grover peut accélérer une recherche par force brute, mais il ne casse pas les fonctions de hachage de manière aussi directe. Des marges de sécurité plus importantes peuvent aider.

## Qu'est-ce que la cryptographie post-quantique ?

La cryptographie post-quantique est une cryptographie conçue pour rester sûre face aux ordinateurs classiques comme aux futurs ordinateurs quantiques.

Cela ne signifie pas que cette cryptographie utilise un ordinateur quantique. Cela signifie que le système repose sur d'autres problèmes mathématiques difficiles.

En 2024, le NIST a publié les premières normes post-quantiques finalisées :

- **ML-KEM** pour l'établissement de clés
- **ML-DSA** pour les signatures numériques
- **SLH-DSA** pour les signatures numériques fondées sur le hachage

Ces normes constituent une étape majeure, mais une blockchain ne peut pas simplement remplacer un algorithme par un autre du jour au lendemain. Les règles de consensus, les portefeuilles, les portefeuilles matériels, la taille des transactions, les frais et la confidentialité doivent tous être pris en compte.

## Comment le risque quantique se manifeste on-chain

Une façon simple de se représenter le risque :

1. Un utilisateur crée une paire de clés.
2. La clé publique ou les données de signature peuvent apparaître on-chain.
3. Un futur attaquant quantique pourrait utiliser ces éléments publics pour retrouver la clé privée.
4. Si des fonds sont toujours contrôlés par cette clé, ils pourraient être menacés.

Les blockchains transparentes exposent beaucoup d'informations par conception. Les adresses, les montants et les liens entre transactions sont publics. Les éléments de clé publique peuvent également devenir visibles lorsque des pièces sont dépensées.

C'est l'une des raisons pour lesquelles la réutilisation d'adresses est nuisible. Elle donne aux observateurs davantage de données à relier aujourd'hui et fournit aux futurs attaquants davantage d'historique à analyser.

## En quoi Zcash est-il différent ?

Zcash prend en charge les transactions transparentes et les transactions protégées.

Zcash transparent fonctionne davantage comme une blockchain publique de type Bitcoin. Les adresses, les montants et les relations entre transactions sont visibles.

Zcash protégé est différent. Les transactions protégées utilisent des preuves à divulgation nulle de connaissance afin que le réseau puisse vérifier qu'une transaction respecte les règles sans révéler l'expéditeur, le destinataire ni le montant.

Cela confère à Zcash un avantage important en matière de confidentialité :

- Moins de données de transaction sont publiées à la vue de tous.
- Les utilisateurs évitent de créer un graphe public de paiements lorsqu'ils restent dans l'espace protégé.
- Les futurs observateurs disposent de moins d'historique financier public à analyser.
- La divulgation sélective peut se faire au moyen de clés pour lecture seule plutôt que par des registres publics par défaut.

Mais Zcash protégé n'est pas automatiquement post-quantique. Les pools protégés reposent toujours sur des hypothèses cryptographiques. L'autorisation de dépense, les engagements de note, les nullifiers, les systèmes de preuve, le chiffrement et les clés des portefeuilles nécessitent tous un examen attentif.

En résumé :

> Un usage protégé réduit l'exposition publique, mais Zcash a encore besoin de mises à niveau post-quantiques délibérées.

## Carte des risques de Zcash

| Domaine | Explication pour débutants | Préoccupation post-quantique |
| --- | --- | --- |
| Adresses transparentes | Adresses publiques et graphe public des transactions | Risques similaires à ceux des autres blockchains transparentes |
| Autorisation de dépense | La preuve qu'un utilisateur est autorisé à dépenser | Les schémas de signature pourraient devoir être remplacés ou migrés |
| Notes protégées | Enregistrements privés de valeur au sein des pools protégés | Certains composants pourraient nécessiter de nouvelles hypothèses ou des outils de récupération |
| zk-SNARKs | Preuves que les transactions protégées sont valides | Les hypothèses du système de preuve doivent être examinées |
| Analyse par le portefeuille | Comment les portefeuilles trouvent et déchiffrent les notes reçues | L'accord de clé et le chiffrement des notes doivent être examinés |
| Migration | Transférer les fonds vers une cryptographie plus sûre | Doit éviter à la fois la perte de fonds et les fuites de confidentialité |

## Comment Zcash se prépare

### Zcash dispose d'un processus de mise à niveau du réseau

Zcash a déjà changé de cryptographie par le passé. Sapling a rendu les transactions protégées plus faciles à utiliser. NU5 a introduit Orchard, les adresses unifiées et Halo 2.

C'est important, car la préparation post-quantique ne se résume pas à un correctif logiciel d'une ligne. Elle exige des mises à niveau du réseau coordonnées, des modifications des portefeuilles, des audits et du temps pour que les utilisateurs migrent.

Les mises à niveau passées de Zcash montrent que l'écosystème a l'expérience du passage d'une cryptographie ancienne à des conceptions plus récentes.

### Halo et Orchard ont réduit les anciennes hypothèses

Halo 2 est utilisé par Orchard, le pool protégé moderne de Zcash. Une amélioration importante est que Halo a supprimé le besoin d'une configuration de confiance pour le système de preuve Orchard.

Ce n'est pas la même chose que la sécurité post-quantique. C'est néanmoins pertinent, car cela montre que Zcash peut remplacer des briques cryptographiques majeures lorsque de meilleures conceptions sont disponibles.

### La ZIP 2005 se concentre sur la récupérabilité quantique

La ZIP 2005 s'intitule « Récupérabilité quantique pour Orchard ». Elle propose des modifications destinées à aider les utilisateurs de Orchard à récupérer ou à migrer leurs fonds si des attaques quantiques contre les anciennes hypothèses devenaient réalisables.

La récupérabilité n'est pas la même chose qu'une sécurité post-quantique complète. Elle est plus limitée, mais reste utile :

- Une sécurité post-quantique complète cherche à empêcher les attaques quantiques de fonctionner.
- La récupérabilité offre aux utilisateurs honnêtes une meilleure solution si l'ancienne cryptographie devient dangereuse.

Pour les débutants, voyez cela comme un plan d'évacuation d'urgence. Il ne remplace pas tout le bâtiment, mais il aide les gens à quitter l'ancienne pièce en toute sécurité si l'ancienne serrure devient fragile.

### Le projet Tachyon vise des améliorations plus larges du protocole

Le projet Tachyon est une proposition de mise à niveau de Zcash axée sur le passage à l'échelle, la synchronisation et la croissance de l'état. Son site public indique que la proposition vise à réduire la taille des transactions, à limiter la croissance de l'état des validateurs et à obtenir, par effet secondaire, une confidentialité post-quantique complète.

Comme Tachyon est une proposition, elle dépend encore de travaux d'ingénierie, d'examens et de l'approbation de la communauté avant son activation. Il est préférable de la considérer comme faisant partie de la recherche active et de l'orientation des mises à niveau de Zcash, et non comme une fonctionnalité dont les utilisateurs disposent déjà aujourd'hui.

### La recherche et les normes progressent

Le monde de la cryptographie dans son ensemble évolue également. Les normes post-quantiques du NIST fournissent aux développeurs des briques plus solides pour les signatures et l'établissement de clés. Les chercheurs en divulgation nulle de connaissance continuent d'étudier des systèmes de preuve capables de résister dans un contexte quantique.

Zcash peut tirer parti de ces travaux, mais doit encore les adapter à une blockchain préservant la confidentialité.

## Approches possibles pour de futures mises à niveau

### Autorisation de dépense post-quantique

Zcash pourrait à terme avoir besoin d'une autorisation de dépense qui ne repose pas sur des schémas de signature vulnérables aux attaques quantiques.

Cela pourrait passer par des signatures post-quantiques, des signatures hybrides ou une autre conception. Une conception hybride utilise à la fois des vérifications classiques et post-quantiques pendant une période de transition, de sorte que le système ne dépende pas d'une seule hypothèse.

Le défi tient à la taille et au coût. Les signatures post-quantiques peuvent être plus volumineuses que les signatures actuelles, ce qui affecte la taille des transactions, la bande passante, les frais, les portefeuilles mobiles et les portefeuilles matériels.

### Nouveaux formats d'adresses et de clés

Une nouvelle cryptographie nécessite souvent de nouvelles clés et de nouvelles adresses. Les utilisateurs auraient besoin d'une voie de migration claire des anciens formats vers des formats plus sûrs.

La migration devrait être simple dans les portefeuilles. La plupart des utilisateurs ne devraient pas avoir à comprendre chaque détail cryptographique pour rester en sécurité.

### Migration préservant la confidentialité

La migration est particulièrement délicate pour Zcash. Si de nombreux utilisateurs transfèrent leurs fonds des anciens pools vers les nouveaux selon des schémas évidents, la migration elle-même pourrait divulguer des informations.

Un bon plan de migration doit protéger :

- Les fonds des utilisateurs
- La confidentialité des utilisateurs
- La compatibilité des portefeuilles
- La prise en charge par les exchanges
- La prise en charge par les portefeuilles matériels
- La sécurité du consensus du réseau

### Examen post-quantique du système de preuve

Remplacer les signatures ne suffit pas. La conception protégée de Zcash repose également sur des preuves à divulgation nulle de connaissance et sur des engagements.

Les travaux futurs pourraient devoir examiner ou remplacer :

- Les hypothèses de zk-SNARK
- Les engagements polynomiaux
- Les hachages de défi Fiat-Shamir
- Les engagements de note
- La construction des nullifiers
- Les hypothèses relatives aux arbres de Merkle
- Le chiffrement des notes et le comportement des clés pour lecture seule

Certains composants pourraient rester acceptables avec des paramètres ajustés. D'autres pourraient nécessiter de nouvelles conceptions.

## Exemples pour débutants

### Exemple 1 : l'ancienne serrure

Imaginez un coffre-fort doté d'une serrure solide aujourd'hui. Un nouvel outil inventé à l'avenir pourrait ouvrir rapidement cette ancienne serrure.

La cryptographie post-quantique revient à remplacer la serrure par un modèle que le nouvel outil n'est pas censé pouvoir forcer.

Pour une blockchain, remplacer la serrure est difficile, car chaque portefeuille, nœud, exchange et appareil matériel doit comprendre la nouvelle conception.

### Exemple 2 : la boîte publique à reçus

Les données d'une blockchain transparente reviennent à déposer chaque reçu dans une boîte publique, pour toujours. Même si personne ne peut lire tous les schémas aujourd'hui, de futurs outils pourraient en apprendre davantage plus tard.

Zcash protégé cherche avant tout à éviter de publier ces reçus. Cela favorise la confidentialité à long terme, mais la serrure qui protège le système protégé doit encore être examinée en vue d'un avenir quantique.

### Exemple 3 : le plan d'évacuation

La récupérabilité revient à prévoir une issue de secours avant qu'un incendie ne se déclare. Vous espérez ne pas en avoir besoin, mais il est bien plus sûr de la concevoir à l'avance qu'en pleine urgence.

La ZIP 2005 correspond à cette idée pour les notes Orchard.

## Ce que les utilisateurs peuvent faire aujourd'hui

Les utilisateurs n'ont pas besoin de paniquer. Il n'existe pas aujourd'hui de grands ordinateurs quantiques publics capables de casser la cryptographie déployée dans les blockchains.

De bonnes habitudes restent utiles :

- Privilégiez un usage protégé de Zcash lorsque c'est possible.
- Évitez de réutiliser vos adresses.
- Maintenez vos portefeuilles à jour.
- Suivez les annonces de mises à niveau du réseau Zcash.
- Surveillez les ZIP et les recommandations des portefeuilles concernant la récupérabilité ou la migration.
- Ne partez pas du principe qu'une activité transparente est privée.
- Ne déplacez pas vos fonds sur la base de rumeurs ; attendez des consignes claires de la part de développeurs Zcash et d'équipes de portefeuilles de confiance.

## Défis

Les mises à niveau post-quantiques sont difficiles pour toutes les blockchains.

Parmi les défis courants :

- Des clés et des signatures plus volumineuses
- Des transactions plus volumineuses
- Des coûts de vérification plus élevés
- Une consommation de bande passante accrue
- De nouveaux audits de sécurité
- La prise en charge par les portefeuilles matériels
- Les performances des portefeuilles mobiles
- L'intégration avec les exchanges et les services de garde
- Les fuites de confidentialité pendant la migration
- L'accord de la communauté sur les modifications du consensus

Pour Zcash, le plus difficile n'est pas seulement de garder les pièces dépensables. Le plus difficile est de les garder dépensables tout en préservant la confidentialité qui rend Zcash différent.

## Résumé

Les ordinateurs quantiques pourraient à terme menacer une partie de la cryptographie utilisée par les blockchains. La cryptographie post-quantique est la réponse à long terme, mais elle doit être déployée avec soin.

Zcash n'est pas entièrement post-quantique aujourd'hui. Cependant, Zcash dispose d'atouts utiles : les transactions protégées réduisent l'exposition publique, le réseau a un historique de mises à niveau cryptographiques, et des recherches actuelles telles que la ZIP 2005 et le projet Tachyon visent déjà les risques quantiques futurs.

Pour les débutants, l'idée principale est simple : la confidentialité d'aujourd'hui réduit l'exposition future des données, et des mises à niveau soigneuses peuvent aider Zcash à évoluer vers une sécurité plus solide à l'ère quantique sans sacrifier la facilité d'utilisation.

## Pages connexes

- [Zcash est-il post-quantique ?](/zcash-tech/is-zcash-post-quantum) - Ce que Ironwood a changé, ce qui reste exposé, et un tableau d'état daté
- [Pools protégés](/using-zcash/shielded-pools) - Comment les transactions protégées de Zcash protègent les détails des transactions
- [Halo](/zcash-tech/halo) - Le système de preuve de Zcash sans configuration de confiance
- [ZKP et zk-SNARKs](/zcash-tech/zk-snarks) - Comment fonctionnent les preuves à divulgation nulle de connaissance dans Zcash
- [Clés pour lecture seule](/zcash-tech/viewing-keys) - Comment fonctionne la divulgation sélective pour Zcash protégé
- [Actifs protégés Zcash](/zcash-tech/zcash-shielded-assets) - Futurs actifs protégés et prise en charge d'actifs privés

## Références

- [NIST : premières normes de chiffrement post-quantique finalisées](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Projet de cryptographie post-quantique du NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005 : récupérabilité quantique pour Orchard](https://zips.z.cash/zip-2005)
- [Projet Tachyon](https://tachyon.z.cash/)
- [Spécification du protocole Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Livre Halo 2](https://zcash.github.io/halo2/)
