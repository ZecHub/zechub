# ZKP & ZK-SNARKS

## Qu'est-ce qu'une preuve ?

Les preuves sont la base de toutes les mathématiques. Une preuve est une affirmation ou un théorème que vous essayez de prouver et une séquence de dérivations faites pour déclarer que le théorème a été prouvé. par exemple. tous les angles d'un triangle totalisant 180° peuvent être vérifiés indépendamment par n'importe qui (vérificateur).

**Preuves**

Le prouveur ---> fait une réclamation ---> le vérificateur choisit ---> accepter/rejeter

(Le prouveur et le vérificateur sont des algorithmes)

En informatique, le terme pour les preuves effectivement vérifiables est les preuves NP. Ces preuves courtes peuvent être vérifiées en temps polynomial. L'idée générale étant "Il existe une solution à un théorème et elle est transmise au vérificateur pour la vérifier"

![Preuves NP](https://cdn.discordapp.com/attachments/860525418008674327/1070395089559494716/NPlanguage.jpg "NP Language")


Dans un langage NP = deux conditions doivent être remplies :

Intégralité : les affirmations vraies seront acceptées par le vérificateur (permet aux preuves honnêtes d'atteindre la vérification)

Solidité : les fausses affirmations n'auront aucune preuve (pour toute stratégie de preuve de triche, ils seront incapables de prouver l'exactitude d'une affirmation incorrecte).


### Preuves interactives et probabilistes

**Interaction** : plutôt que de simplement lire la preuve, le vérificateur s'engage avec un prouveur dans les deux sens sur plusieurs séries de messages.

**Aléatoire** : les demandes du vérificateur au prouveur sont aléatoires et le prouveur doit être en mesure de répondre correctement à chacune.

![Preuves IP](https://cdn.discordapp.com/attachments/860525418008674327/1070395089194594345/IPmodel.jpg "Protocole IP")

En utilisant l'interaction et le hasard ensemble, il est possible de prouver une affirmation à un vérificateur aveugle en temps polynomial probabiliste (PPT).

Les preuves interactives peuvent-elles vérifier efficacement plus que les preuves NP ?

Preuves NP vs preuves IP :

| Déclaration | NP | IP |
|-------------|-----------|--------|
| NP | oui | oui |
| CO-NP | non | oui |
| #P | non | oui |
| PSPACE | non | oui |


NP - Il existe une solution à un énoncé

CO-NP - Prouver qu'il n'y a pas de solutions à une déclaration

#P - Pour compter le nombre de solutions existantes à une déclaration

PSPACE - Prouver une alternance d'énoncés différents

### Qu'est-ce que la connaissance zéro ?

Ce qu'un vérificateur peut calculer après une interaction est identique à ce qu'il pouvait prouver avant. L'interaction sur plusieurs tours entre le prouveur et le vérificateur n'a pas augmenté la puissance de calcul du vérificateur.

**Le paradigme de la simulation**

Cette expérience existe dans toute la cryptographie. Il présente une "vue réelle" et une "vue simulée".

Vue réelle : tous les historiques possibles d'interactions entre le prouveur et le vérificateur (P,V)

Vue simulée : le vérificateur simule toutes les interactions possibles entre le prouveur et le vérificateur

![paradigme de simulation](https://cdn.discordapp.com/attachments/860525418008674327/1070395090259947520/simulation.jpg "Paradigme de simulation")

Un distingueur en temps polynomial tente de déterminer s'il regarde la vue réelle ou simulée et demande un échantillon aux deux à plusieurs reprises.

Les deux vues sont dites " indiscernables sur le plan informatique " si pour tous les algorithmes/stratégies de distinction, même après avoir reçu un nombre polynomial d'échantillons réels ou simulés, la probabilité est > 1/2.

** Arguments de connaissance sans connaissance **

Un protocole interactif (P,V) est à connaissance nulle s'il existe un simulateur (algorithme) tel que pour chaque vérificateur de temps polynomial de probabilité (lorsque le théorème est correct), les distributions de probabilité déterminant le réel à partir d'une vue simulée sont impossibles à distinguer par le calcul.

Les protocoles interactifs sont utiles lorsqu'il n'y a qu'un seul vérificateur. Un exemple serait un auditeur fiscal dans une application de « preuve d'impôts » à connaissance nulle.

## Qu'est-ce qu'un SNARK ?

** Argument succinct non interactif de la connaissance **

Définition large - Une preuve succincte qu'un énoncé est vrai. La preuve doit être courte et rapide à vérifier. Dans SNARKS, un seul message est envoyé du prouveur au vérificateur. Le vérificateur peut alors choisir d'accepter ou de rejeter.

exemple d'énoncé : "Je connais un message (m) tel que SHA256(m)=0"

Dans un zk-SNARK la preuve ne révèle rien sur le message (m).

**Polynômes** : sommes de termes contenant une constante (telle que 1,2,3), des variables (telles que x,y,z) et des exposants de variables (telles que x², y³).

exemple : "3x² + 8x + 17"

**Circuit arithmétique** : modèle de calcul de polynômes. Plus généralement, il peut être défini comme un graphe acyclique dirigé sur lequel, à chaque nœud du graphe, une opération arithmétique est effectuée. Le circuit se compose de portes d'addition, de portes de multiplication et de quelques portes constantes. De la même manière que les circuits booléens transportent des bits dans des fils, les circuits arithmétiques transportent des entiers.

![circuit](https://cdn.discordapp.com/attachments/860525418008674327/1070405388048011305/circuit.jpg "DAG")

Dans cet exemple, le prouveur veut convaincre le vérificateur qu'il connaît une solution du circuit arithmétique.

**Engagements** : Pour ce faire, le prouveur mettra en engagement toutes les valeurs (privées et publiques) associées au circuit. Les engagements cachent leurs entrées en utilisant une fonction dont la sortie est irréversible.

Sha256 est un exemple de fonction de hachage pouvant être utilisée dans un schéma d'engagement.

Une fois que le prouveur s'est engagé sur les valeurs, les engagements sont envoyés au vérificateur (étant convaincu qu'il est incapable de découvrir l'une des valeurs d'origine). Le démonstrateur est alors capable de montrer au vérificateur la connaissance de chacune des valeurs sur les nœuds du graphe.

**Transformation de Fiat-Shamir**

Pour rendre le protocole *non interactif*, le prouveur génère un caractère aléatoire (utilisé pour le défi caché) au nom du vérificateur en utilisant une fonction de hachage cryptographique. C'est ce qu'on appelle l'oracle aléatoire. Le prouveur peut alors envoyer un message unique au vérificateur qui peut alors vérifier qu'il est correct.

Pour former un SNARK pouvant être utilisé pour des circuits généraux, deux éléments sont nécessaires :

Schéma d'engagement fonctionnel : permet à un committer de s'engager sur un polynôme avec une chaîne courte qui peut être utilisée par un vérificateur pour confirmer les évaluations revendiquées du polynôme engagé.

Oracle interactif polynomial : le vérificateur demande au prouveur (algorithme) d'ouvrir tous les engagements à divers points de son choix à l'aide d'un schéma d'engagement polynomial et vérifie que l'identité est vraie entre eux.

**Installation**

Les procédures de configuration aident le vérificateur en résumant un circuit et en produisant des paramètres publics.

![Configuration](https://cdn.discordapp.com/attachments/860525418008674327/1070395089899229245/setup.jpg "Configuration")

**Types de configuration de prétraitement** :

Configuration sécurisée par circuit - Exécutée une fois par circuit. Est spécifique à un circuit et le caractère aléatoire secret (chaîne de référence commune) doit être gardé secret + détruit.

Une configuration compromise dans cette méthode signifie qu'un prouveur malhonnête peut prouver de fausses déclarations.

Configuration de confiance mais universelle - Ne doit exécuter qu'une seule fois la configuration de confiance et peut ensuite prétraiter de manière déterministe plusieurs circuits.

Configuration transparente (pas de configuration de confiance) - L'algorithme de prétraitement n'utilise aucun caractère aléatoire secret.


**Types de constructions résistantes au SNARK** :

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ) : Nécessite une configuration sécurisée, mais contient des preuves très courtes qui peuvent être vérifiées rapidement.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK) : Configuration universellement approuvée.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o) : Pas de configuration de confiance, mais produit des épreuves légèrement plus longues ou peut prendre plus de temps pour que l'épreuve s'exécute.

Les SNARKS sont utiles lorsque plusieurs vérificateurs sont nécessaires, comme une blockchain comme Zcash ou zk-Rollup comme [Aztec](https://docs.aztec.network) afin que plusieurs nœuds de validation n'aient pas à interagir sur plusieurs tours avec chacun preuve.

## Comment les zk-SNARK sont-ils implémentés dans Zcash ?

Généralement, les preuves à connaissance nulle sont un outil pour imposer un comportement honnête dans les protocoles sans révéler aucune information.

Zcash est une blockchain publique qui facilite les transactions privées. Les zk-SNARK sont utilisés pour prouver qu'une transaction privée est valide dans les règles de consensus du réseau sans révéler d'autres détails sur la transaction.

[Video Explainer](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Dans cette conférence, Ariel Gabizon fournit des descriptions de l'arbre d'engagement Zcash Note, de l'évaluation polynomiale aveugle et des défis homomorphiquement cachés et comment ils sont mis en œuvre sur le réseau.

Lisez le [livre Halo2](https://zcash.github.io/halo2/index.html) pour plus d'informations.

## Autres applications sans connaissance

zk-SNARKS offre plusieurs avantages dans une variété d'applications différentes. Jetons un coup d'œil à quelques exemples.

**Évolutivité** : ceci est obtenu grâce à l'« externalisation du calcul ». Il n'y a pas de besoin strict de connaissance zéro pour une chaîne L1 pour vérifier le travail d'un service hors chaîne. Les transactions ne sont pas nécessairement privées sur un zk-EVM.

L'avantage d'un service Rollup basé sur la preuve (zk-Rollup) est de traiter un lot de centaines/milliers de transactions et le L1 est capable de vérifier une preuve succincte que toutes les transactions ont été traitées correctement, augmentant le débit des transactions du réseau d'un facteur de 100 ou 1000.

![zkvm](https://cdn.discordapp.com/attachments/860525418008674327/1070395090612265000/zkvm.jpg "ZKVM")

**Interopérabilité** : Ceci est réalisé sur un zk-Bridge en "verrouillant" les actifs sur une chaîne source et en prouvant à la chaîne cible que les actifs ont été verrouillés (preuve de consensus).

**Conformité** : des projets tels que [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) sont en mesure de prouver qu'une transaction privée est conforme aux règles bancaires locales lois sans révéler les détails de la transaction.

**Combattre la désinformation** : parmi plusieurs exemples en dehors de la blockchain et de la crypto-monnaie, l'utilisation de la génération de preuves sur des images qui ont été traitées par des médias et des médias pour permettre aux téléspectateurs de vérifier indépendamment la source d'une image et toutes les opérations effectuées dessus. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Apprentissage complémentaire :

[Bibliographie Zero-Knowledge - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK est avec Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash : Halo 2 et SNARK sans configuration de confiance - Sean Bowe sur Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Preuves de connaissance zéro avec Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Preuves interactives de connaissance zéro - Article Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Conférence 1 : Introduction et histoire de ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Explication simple des circuits arithmétiques - Moyen](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[L'évolutivité est ennuyeuse, la confidentialité est morte : ZK-Proofs, à quoi servent-ils ?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

