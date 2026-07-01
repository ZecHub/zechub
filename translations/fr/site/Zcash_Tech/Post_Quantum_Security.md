<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Sécurité post-quantique dans Zcash

## TL;DR

- Les ordinateurs quantiques représentent un risque futur, car ils pourraient casser une partie de la cryptographie à clé publique utilisée aujourd’hui par les blockchains.
- « Post-quantique » désigne une cryptographie qui fonctionne sur des ordinateurs ordinaires, mais qui est conçue pour résister aux attaques de futurs ordinateurs quantiques.
- Zcash n’est pas entièrement post-quantique aujourd’hui.
- Le Zcash protégé réduit la quantité de données publiques de transaction que de futurs attaquants peuvent étudier, mais l’utilisation protégée n’est pas la même chose qu’une résistance quantique complète.
- Zcash se prépare par la recherche, les ZIP et des propositions de mise à niveau comme ZIP 2005 et Project Tachyon.
- Une migration post-quantique sûre doit protéger en même temps les fonds, la vie privée, les portefeuilles, les exchanges et les règles de consensus.

## Qu’est-ce que l’informatique quantique ?

Un ordinateur normal stocke l’information sous forme de bits. Chaque bit vaut soit `0`, soit `1`.

Un ordinateur quantique utilise des bits quantiques, appelés qubits. Les qubits peuvent être utilisés par des algorithmes spéciaux qui résolvent certains problèmes mathématiques bien plus rapidement que les ordinateurs normaux.

Cela ne signifie pas qu’un ordinateur quantique est plus rapide pour tout. Le risque est spécifique. Une partie de la cryptographie dépend de problèmes mathématiques très difficiles pour les ordinateurs normaux, mais beaucoup plus faciles pour un ordinateur quantique suffisamment puissant.

Pour les blockchains, l’exemple le plus important est la cryptographie à clé publique. Les clés publiques et les signatures servent à prouver qu’un utilisateur est autorisé à dépenser des coins.

## Pourquoi les blockchains sont concernées

Les blockchains utilisent la cryptographie pour plusieurs fonctions différentes :

| Outil cryptographique | Ce qu’il fait | Impact quantique |
| --- | --- | --- |
| Signatures numériques | Prouvent que le propriétaire a autorisé une dépense | Risque élevé pour les systèmes courants à courbe elliptique |
| Fonctions de hachage | Construisent les adresses, engagements, arbres de Merkle et défis | Risque plus faible, mais les marges de sécurité comptent |
| Preuves à divulgation nulle de connaissance | Prouvent que les transactions protégées sont valides sans révéler les détails | Dépend du système de preuve et des hypothèses |
| Accord de clés | Aide les portefeuilles à chiffrer les données de notes pour les destinataires | Nécessite un examen attentif dans un modèle de menace quantique |

Un ordinateur quantique suffisamment puissant pourrait menacer de nombreux schémas de signature utilisés aujourd’hui, y compris les signatures à courbe elliptique. C’est important, car une signature est ce qui permet au réseau de savoir qu’une transaction a été autorisée par la bonne clé.

Les fonctions de hachage sont différentes. L’algorithme de Grover peut accélérer la recherche par force brute, mais il ne casse pas les fonctions de hachage de la même manière directe. Des marges de sécurité plus larges peuvent aider.

## Qu’est-ce que la cryptographie post-quantique ?

La cryptographie post-quantique est une cryptographie conçue pour rester sûre à la fois contre les ordinateurs normaux et contre les futurs ordinateurs quantiques.

Cela ne signifie pas que la cryptographie utilise un ordinateur quantique. Cela signifie que le système repose sur des problèmes mathématiques difficiles différents.

En 2024, le NIST a publié les premières normes post-quantiques finalisées :

- **ML-KEM** pour l’établissement de clés
- **ML-DSA** pour les signatures numériques
- **SLH-DSA** pour les signatures numériques basées sur le hachage

Ces normes constituent une étape majeure, mais une blockchain ne peut pas simplement remplacer un algorithme par un autre du jour au lendemain. Les règles de consensus, les portefeuilles, les hardware wallets, la taille des transactions, les frais et la confidentialité doivent tous être pris en compte.

## Comment le risque quantique apparaît on-chain

Une manière simple de comprendre le risque est la suivante :

1. Un utilisateur crée une paire de clés.
2. La clé publique ou les données de signature peuvent apparaître on-chain.
3. Un futur attaquant quantique peut être capable d’utiliser ce matériel public pour découvrir la clé privée.
4. Si des fonds sont encore contrôlés par cette clé, ils peuvent être en danger.

Les blockchains transparentes exposent beaucoup d’informations par conception. Les adresses, les montants et les liens entre transactions sont publics. Le matériel de clé publique peut aussi devenir visible lorsque des coins sont dépensés.

C’est l’une des raisons pour lesquelles la réutilisation d’adresse est nuisible. La réutilisation donne aujourd’hui plus de données à relier aux observateurs et fournit aux futurs attaquants plus de matériel historique à analyser.

## Qu’est-ce qui est différent avec Zcash ?

Zcash prend en charge à la fois les transactions transparentes et les transactions protégées.

Le Zcash transparent fonctionne davantage comme l’usage d’une blockchain publique de type Bitcoin. Les adresses, les montants et les relations entre transactions sont visibles.

Le Zcash protégé est différent. Les transactions protégées utilisent des preuves à divulgation nulle de connaissance afin que le réseau puisse vérifier qu’une transaction respecte les règles sans révéler l’expéditeur, le destinataire ni le montant.

Cela donne à Zcash un avantage important en matière de confidentialité :

- Moins de données de transaction sont publiées et visibles par tous.
- Les utilisateurs évitent de créer un graphe public des paiements lorsqu’ils restent protégés.
- Les futurs observateurs disposent de moins d’historique financier public à analyser.
- La divulgation sélective peut se faire via des viewing keys au lieu d’enregistrements publics par défaut.

Mais le Zcash protégé n’est pas automatiquement post-quantique. Les pools protégés dépendent encore d’hypothèses cryptographiques. L’autorisation de dépense, les engagements de notes, les nullifiers, les systèmes de preuve, le chiffrement et les clés de portefeuille nécessitent tous un examen attentif.

La version courte :

> L’usage protégé réduit l’exposition publique, mais Zcash a encore besoin de mises à niveau post-quantiques délibérées.

## Carte des risques de Zcash

| Domaine | Explication pour débutants | Préoccupation post-quantique |
| --- | --- | --- |
| Adresses transparentes | Adresses publiques et graphe public des transactions | Risques similaires à ceux des autres blockchains transparentes |
| Autorisation de dépense | La preuve qu’un utilisateur est autorisé à dépenser | Les schémas de signature peuvent nécessiter un remplacement ou une migration |
| Notes protégées | Enregistrements privés de valeur dans les pools protégés | Certains composants peuvent nécessiter de nouvelles hypothèses ou des outils de récupération |
| zk-SNARKs | Preuves que les transactions protégées sont valides | Les hypothèses du système de preuve doivent être réexaminées |
| Scan des portefeuilles | Comment les portefeuilles trouvent et déchiffrent les notes reçues | L’accord de clés et le chiffrement des notes doivent être réexaminés |
| Migration | Déplacer les fonds vers une cryptographie plus sûre | Il faut éviter à la fois la perte de fonds et les fuites de confidentialité |

## Comment Zcash se prépare

### Zcash a un processus de mise à niveau du réseau

Zcash a déjà modifié sa cryptographie par le passé. Sapling a rendu les transactions protégées plus faciles à utiliser. NU5 a introduit Orchard, Unified Address et Halo 2.

C’est important parce que la préparation au post-quantique n’est pas un correctif logiciel en une ligne. Elle nécessite des mises à niveau coordonnées du réseau, des changements dans les portefeuilles, des audits et du temps pour que les utilisateurs migrent.

Les précédentes mises à niveau de Zcash montrent que l’écosystème a de l’expérience dans le passage d’une cryptographie plus ancienne à des conceptions plus modernes.

### Halo et Orchard ont réduit les anciennes hypothèses

Halo 2 est utilisé par Orchard, le pool protégé moderne de Zcash. Une amélioration importante est que Halo a supprimé la nécessité d’un trusted setup pour le système de preuve d’Orchard.

Ce n’est pas la même chose que la sécurité post-quantique. C’est néanmoins pertinent, car cela montre que Zcash peut remplacer des briques cryptographiques majeures lorsque de meilleures conceptions sont disponibles.

### ZIP 2005 se concentre sur la récupérabilité quantique

ZIP 2005 s’intitule « Orchard Quantum Recoverability ». Il propose des changements destinés à aider les utilisateurs d’Orchard à récupérer ou migrer leurs fonds si des attaques quantiques contre d’anciennes hypothèses deviennent praticables.

La récupérabilité n’est pas la même chose qu’une sécurité post-quantique complète. C’est plus restreint et tout de même utile :

- La sécurité post-quantique complète cherche à empêcher le fonctionnement des attaques quantiques.
- La récupérabilité donne aux utilisateurs honnêtes une meilleure voie si l’ancienne cryptographie devient dangereuse.

Pour les débutants, on peut voir cela comme un plan de sortie de secours. Cela ne remplace pas tout le bâtiment, mais cela aide les gens à quitter l’ancienne pièce en sécurité si l’ancienne serrure devient faible.

### Project Tachyon vise des améliorations de protocole plus larges

Project Tachyon est une proposition de mise à niveau de Zcash axée sur l’échelle, la synchronisation et la croissance de l’état. Son site public indique que la proposition vise à réduire la taille des transactions, diminuer la croissance de l’état des validateurs et obtenir, comme effet secondaire, une confidentialité entièrement post-quantique.

Comme Tachyon est une proposition, elle dépend encore d’un travail d’ingénierie, d’un examen et de l’approbation de la communauté avant son activation. Il vaut mieux le comprendre comme une partie de la recherche active et de l’orientation des mises à niveau de Zcash, et non comme une fonctionnalité dont les utilisateurs disposent déjà aujourd’hui.

### La recherche et les normes évoluent

Le monde plus large de la cryptographie évolue lui aussi. Les normes post-quantiques du NIST donnent aux implémenteurs de meilleures briques pour les signatures et l’établissement de clés. Les chercheurs en preuves à divulgation nulle de connaissance continuent d’étudier des systèmes de preuve capables de tenir sous des hypothèses quantiques.

Zcash peut bénéficier de ce travail, mais il doit encore l’adapter à une blockchain préservant la confidentialité.

## Approches possibles pour de futures mises à niveau

### Autorisation de dépense post-quantique

Zcash pourrait finalement avoir besoin d’une autorisation de dépense qui ne repose pas sur des schémas de signature vulnérables au quantique.

Cela pourrait utiliser des signatures post-quantiques, des signatures hybrides ou une autre conception. Une conception hybride utilise à la fois des vérifications classiques et post-quantiques pendant une période de transition, de sorte que le système ne dépende pas d’une seule hypothèse.

Le défi est la taille et le coût. Les signatures post-quantiques peuvent être plus volumineuses que les signatures actuelles, ce qui affecte la taille des transactions, la bande passante, les frais, les portefeuilles mobiles et les hardware wallets.

### Nouveaux formats d’adresses et de clés

Une nouvelle cryptographie nécessite souvent de nouvelles clés et de nouvelles adresses. Les utilisateurs auraient besoin d’un chemin de migration clair entre les anciens formats et des formats plus sûrs.

La migration devrait être simple dans les portefeuilles. La plupart des utilisateurs ne devraient pas avoir à comprendre chaque détail cryptographique pour rester en sécurité.

### Migration préservant la confidentialité

La migration est particulièrement sensible pour Zcash. Si de nombreux utilisateurs déplacent des fonds des anciens pools vers les nouveaux selon des schémas évidents, la migration elle-même pourrait divulguer des informations.

Un bon plan de migration doit protéger :

- Les fonds des utilisateurs
- La vie privée des utilisateurs
- La compatibilité des portefeuilles
- Le support des exchanges
- Le support des hardware wallets
- La sécurité du consensus réseau

### Examen du système de preuve post-quantique

Remplacer les signatures ne suffit pas. La conception protégée de Zcash dépend aussi des preuves à divulgation nulle de connaissance et des engagements.

Les travaux futurs pourraient devoir examiner ou remplacer :

- Les hypothèses des zk-SNARK
- Les engagements polynomiaux
- Les hachages de défi Fiat-Shamir
- Les engagements de notes
- La construction des nullifiers
- Les hypothèses des arbres de Merkle
- Le chiffrement des notes et le comportement des viewing keys

Certains composants peuvent être acceptables avec des paramètres ajustés. D’autres peuvent nécessiter de nouvelles conceptions.

## Exemples pour débutants

### Exemple 1 : L’ancienne serrure

Imaginez un coffre-fort avec une serrure solide aujourd’hui. Un nouvel outil inventé dans le futur pourrait ouvrir rapidement cette ancienne serrure.

La cryptographie post-quantique, c’est comme remplacer la serrure par une conception que ce nouvel outil n’est pas censé casser.

Pour une blockchain, remplacer la serrure est difficile, car chaque portefeuille, nœud, exchange et appareil matériel doit comprendre la nouvelle conception.

### Exemple 2 : La boîte publique de reçus

Les données transparentes d’une blockchain, c’est comme mettre chaque reçu dans une boîte publique pour toujours. Même si personne ne peut lire tous les schémas aujourd’hui, les outils du futur pourraient en apprendre davantage plus tard.

Le Zcash protégé essaie d’éviter de publier ces reçus dès le départ. Cela aide la confidentialité à long terme, mais la serrure qui protège le système protégé doit quand même être réexaminée pour un futur quantique.

### Exemple 3 : Le plan de sortie

La récupérabilité, c’est comme planifier une voie de sortie avant qu’il y ait un incendie. On espère ne pas en avoir besoin, mais il est bien plus sûr de la concevoir tôt que pendant une urgence.

ZIP 2005 correspond à cette idée pour les notes Orchard.

## Ce que les utilisateurs peuvent faire aujourd’hui

Les utilisateurs n’ont pas besoin de paniquer. De grands ordinateurs quantiques publics capables de casser la cryptographie blockchain déployée ne sont pas disponibles aujourd’hui.

De bonnes habitudes restent utiles :

- Préférez l’utilisation de Zcash protégé lorsque c’est possible.
- Évitez de réutiliser les adresses.
- Gardez les portefeuilles à jour.
- Suivez les annonces de mise à niveau du réseau Zcash.
- Surveillez les ZIP et les recommandations des portefeuilles concernant la récupérabilité ou la migration.
- Ne supposez pas que l’activité transparente est privée.
- Ne déplacez pas vos fonds sur la base de rumeurs ; attendez des indications claires de développeurs Zcash et d’équipes de portefeuilles de confiance.

## Défis

Les mises à niveau post-quantiques sont difficiles pour toutes les blockchains.

Les défis courants incluent :

- Des clés et des signatures plus volumineuses
- Des transactions plus volumineuses
- Des coûts de vérification plus élevés
- Une utilisation accrue de la bande passante
- De nouveaux audits de sécurité
- Le support des hardware wallets
- Les performances des portefeuilles mobiles
- L’intégration avec les exchanges et la garde
- Des fuites de confidentialité pendant la migration
- L’accord de la communauté sur les changements de consensus

Pour Zcash, la partie la plus difficile n’est pas seulement de garder les coins dépensables. La difficulté est de les garder dépensables tout en préservant la confidentialité qui rend Zcash différent.

## Résumé

Les ordinateurs quantiques pourraient un jour menacer une partie de la cryptographie utilisée par les blockchains. La cryptographie post-quantique est la réponse à long terme, mais elle doit être déployée avec soin.

Zcash n’est pas entièrement post-quantique aujourd’hui. Cependant, Zcash a des atouts utiles : les transactions protégées réduisent l’exposition publique, le réseau a une histoire de mises à niveau cryptographiques, et les recherches actuelles comme ZIP 2005 et Project Tachyon visent déjà les futurs risques quantiques.

Pour les débutants, l’idée principale est simple : la confidentialité aujourd’hui réduit l’exposition future des données, et des mises à niveau soigneusement conçues peuvent aider Zcash à évoluer vers une sécurité plus forte à l’ère quantique sans sacrifier la facilité d’utilisation.

## Pages liées

- [Pools protégés](/using-zcash/shielded-pools) - Comment les transactions protégées de Zcash protègent les détails des transactions
- [Halo](/zcash-tech/halo) - Le système de preuve de Zcash sans trusted setup
- [ZKP & ZK-SNARKS](/zcash-tech/zk-snarks) - Comment fonctionnent les preuves à divulgation nulle de connaissance dans Zcash
- [Viewing Keys](/zcash-tech/viewing-keys) - Comment fonctionne la divulgation sélective pour le Zcash protégé
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) - Actifs protégés futurs et support des actifs privés
- [La confidentialité comme principe fondamental](/privacy/privacy-as-a-core-principle) - Pourquoi la confidentialité financière est importante

## Références

- [NIST : premières normes de chiffrement post-quantique finalisées](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Projet de cryptographie post-quantique du NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005 : Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Spécification du protocole Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Livre Halo 2](https://zcash.github.io/halo2/)
