<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP et ZK-SNARKS

## En bref

- **zk-SNARKs** = arguments de connaissance succincts et non interactifs à divulgation nulle de connaissance
- Ils permettent à une partie de **prouver qu’elle sait quelque chose** sans révéler l’information elle-même
- Zcash utilise zk-SNARKs pour prouver qu’une transaction est valide (montants corrects, entrées non dépensées) **sans révéler l’expéditeur, le destinataire ni le montant**
- « Succinct » signifie que la preuve est minuscule et rapide à vérifier, même pour des énoncés complexes
- Le pool Orchard utilise Halo 2, un système de zk-SNARK qui **ne nécessite aucune configuration de confiance**

---

## Qu’est-ce qu’une preuve ?

Les preuves sont le fondement de toutes les mathématiques. Une preuve est une affirmation ou un théorème que vous cherchez à prouver, accompagné de la suite de déductions permettant de déclarer le théorème prouvé. Par exemple, le fait que la somme des angles d’un triangle soit égale à 180° peut être vérifié de manière indépendante par n’importe qui (le vérificateur).

**Preuves** 

Prouveur ---> Formule une affirmation ---> Le vérificateur choisit ---> Accepte/Rejette 

(Le prouveur et le vérificateur sont tous deux des algorithmes)

En informatique, les preuves vérifiables efficacement sont appelées preuves NP. Ces preuves courtes peuvent être vérifiées en temps polynomial. L’idée générale est la suivante : « Il existe une solution à un théorème et elle est transmise au vérificateur pour qu’il la contrôle »


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


Dans un langage NP, deux conditions doivent être remplies : 

Complétude : les affirmations vraies seront acceptées par le vérificateur (cela permet aux prouveurs honnêtes d’aboutir à la vérification)

Validité : les affirmations fausses n’auront pas de preuve (quelle que soit la stratégie d’un prouveur tricheur, celui-ci ne pourra pas prouver qu’une affirmation incorrecte est correcte).


### Preuves interactives et probabilistes

**Interaction** : plutôt que de simplement lire la preuve, le vérificateur échange avec un prouveur au fil de plusieurs tours de messages.

**Aléa** : les requêtes du vérificateur au prouveur sont aléatoires et le prouveur doit être capable de répondre correctement à chacune d’elles. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


En combinant interaction et aléa, il est possible de prouver une affirmation à un vérificateur aveugle en temps polynomial probabiliste (PPT). 

Les preuves interactives peuvent-elles vérifier efficacement davantage que les preuves NP ?

Preuves NP et preuves IP :

|  Énoncé   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  oui      |  oui   |
|    CO-NP     |  non       |  oui   |
|    #P        |  non       |  oui   |
|    PSPACE    |  non       |  oui   |


NP : il existe une solution à un énoncé

CO-NP : prouver qu’un énoncé n’a aucune solution

#P : compter combien de solutions un énoncé possède

PSPACE : prouver une alternance de différents énoncés

### Qu’est-ce que la divulgation nulle de connaissance ?

Ce qu’un vérificateur peut calculer après une interaction est identique à ce qu’il pouvait prouver auparavant. L’interaction sur plusieurs tours entre le prouveur et le vérificateur n’a pas accru la puissance de calcul du vérificateur.

**La simulation Paradigm**

Cette expérience se retrouve partout en cryptographie. Elle présente une « vue réelle » et une « vue simulée ». 

Vue réelle : tous les historiques possibles d’interactions entre le prouveur et le vérificateur (P,V)

Vue simulée : le vérificateur simule toutes les interactions possibles entre le prouveur et le vérificateur 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Un distingueur en temps polynomial tente de déterminer s’il observe la vue réelle ou la vue simulée, et demande à plusieurs reprises un échantillon de chacune.

Les deux vues sont dites « indistinguables sur le plan calculatoire » si, pour tous les algorithmes ou stratégies de distinction, même après avoir reçu un nombre polynomial d’échantillons de la vue réelle ou simulée, la probabilité est >1/2. 

**Arguments de connaissance à divulgation nulle de connaissance**

Un protocole interactif (P,V) est à divulgation nulle de connaissance s’il existe un simulateur (algorithme) tel que, pour tout vérificateur en temps polynomial probabiliste (lorsque le théorème est correct), les distributions de probabilité permettant de distinguer la vue réelle de la vue simulée sont indistinguables sur le plan calculatoire. 

Les protocoles interactifs sont utiles lorsqu’il n’y a qu’un seul vérificateur. Un exemple serait un contrôleur fiscal dans une application de « preuve d’impôts » à divulgation nulle de connaissance.

## Qu’est-ce qu’un SNARK ?

**Argument de connaissance succinct et non interactif**

Définition générale : une preuve succincte qu’un énoncé est vrai. La preuve doit être courte et rapide à vérifier. Dans les SNARKS, un seul message est envoyé du prouveur au vérificateur. Le vérificateur peut alors choisir de l’accepter ou de le rejeter. 

Exemple d’énoncé : « Je connais un message (m) tel que SHA256(m)=0 »

Dans un zk-SNARK, la preuve ne révèle rien du message (m).

**Polynômes** : sommes de termes contenant une constante (comme 1, 2, 3), des variables (comme x, y, z) et des puissances de variables (comme x², y³). 

Exemple : « 3x² + 8x + 17 »

**Circuit arithmétique** : un modèle de calcul de polynômes. Plus généralement, il peut être défini comme un graphe orienté acyclique dans lequel une opération arithmétique est effectuée à chaque nœud du graphe. Le circuit se compose de portes d’addition, de portes de multiplication et de quelques portes constantes. De la même manière que les circuits booléens transportent des bits dans leurs fils, les circuits arithmétiques transportent des entiers.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

Dans cet exemple, le prouveur veut convaincre le vérificateur qu’il connaît une solution au circuit arithmétique.  

**Engagements** : pour ce faire, le prouveur place toutes les valeurs (privées et publiques) associées au circuit dans un engagement. Les engagements masquent leurs entrées en utilisant une fonction dont le résultat est irréversible.

Sha256 est un exemple de fonction de hachage pouvant être utilisée dans un schéma d’engagement.

Une fois que le prouveur s’est engagé sur les valeurs, les engagements sont envoyés au vérificateur (avec l’assurance que celui-ci ne peut découvrir aucune des valeurs d’origine). Le prouveur peut alors démontrer au vérificateur sa connaissance de chacune des valeurs des nœuds du graphe. 

**Transformation de Fiat-Shamir**

Pour rendre le protocole *non interactif*, le prouveur génère l’aléa (utilisé pour le défi caché) pour le compte du vérificateur à l’aide d’une fonction de hachage cryptographique. C’est ce que l’on appelle l’oracle aléatoire. Le prouveur peut alors envoyer un seul message au vérificateur, qui peut ensuite vérifier qu’il est correct. 

Pour construire un SNARK utilisable pour des circuits généraux, deux éléments sont nécessaires :

Schéma d’engagement fonctionnel : permet à celui qui s’engage de s’engager sur un polynôme au moyen d’une chaîne courte, qu’un vérificateur peut utiliser pour confirmer les évaluations annoncées du polynôme engagé.

Oracle interactif polynomial : le vérificateur demande au prouveur (algorithme) d’ouvrir tous les engagements en divers points de son choix à l’aide du schéma d’engagement polynomial, et vérifie que l’identité est respectée entre eux.

**Configuration**

Les procédures de configuration aident le vérificateur en résumant un circuit et en produisant des paramètres publics. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Types de configuration par prétraitement** :

Configuration de confiance par circuit : exécutée séparément pour chaque circuit. La chaîne de référence commune (CRS) qui en résulte contient des paramètres publics utilisés par les prouveurs et les vérificateurs. Ce sont les éléments secrets intermédiaires de la configuration (« déchets toxiques »), et non la CRS, qui doivent être gardés secrets puis détruits. L’[explication des paramètres publics](https://zodl.com/snark-parameters/) de ECC distingue les deux.

Si les éléments secrets de configuration requis sont conservés ou récupérés, un prouveur malhonnête pourrait être en mesure de produire des preuves d’énoncés faux. Lors d’une cérémonie MPC, la sécurité peut reposer sur le fait qu’au moins un participant respecte le protocole et détruit sa contribution secrète.

Configuration de confiance mais universelle : une seule configuration de confiance produit des paramètres pouvant servir à dériver des clés de preuve et de vérification pour plusieurs circuits, dans les limites de taille prises en charge. Elle repose toujours sur une hypothèse de destruction du secret ; universelle ne signifie pas transparente.

Configuration transparente (sans configuration de confiance) : les paramètres publics peuvent être générés sans trappe secrète de configuration que quelqu’un devrait être chargé de détruire en toute confiance. Cela ne signifie pas que la génération de preuves n’utilise aucun aléa ni que le système n’a pas de paramètres publics. Le [livre Halo 2](https://zcash.github.io/halo2/background/pc-ipa.html#setup) donne un exemple de paramètres de groupe publics.


**Types de constructions de preuves SNARK** :

[Groth16](https://eprint.iacr.org/2016/260) : nécessite une configuration de confiance, mais produit des preuves très courtes qui peuvent être vérifiées rapidement.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[PLONK](https://eprint.iacr.org/2019/953) : configuration de confiance universelle.

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o) : aucune configuration de confiance, mais produisent des preuves légèrement plus longues ou peuvent demander plus de temps d’exécution au prouveur. 

Les SNARKS sont utiles lorsque plusieurs vérificateurs sont nécessaires, comme dans une blockchain telle que Zcash ou un zk-Rollup tel que [Aztec](https://docs.aztec.network), afin que les multiples nœuds validateurs n’aient pas à interagir sur plusieurs tours pour chaque preuve. 

## Comment les zk-SNARK sont-ils mis en œuvre dans Zcash ?

De manière générale, les preuves à divulgation nulle de connaissance sont un outil permettant d’imposer un comportement honnête dans les protocoles sans révéler la moindre information. 

Zcash est une blockchain publique qui permet des transactions privées. Les zk-SNARK servent à prouver qu’une transaction privée est valide au regard des règles de consensus du réseau, sans révéler aucun autre détail sur la transaction. 

[Vidéo explicative](https://www.youtube.com/watch?v=Kx4cIkCY2EA) : dans cette conférence, Ariel Gabizon décrit l’arbre d’engagements de notes de Zcash, l’évaluation polynomiale aveugle et les défis cachés de manière homomorphe, ainsi que leur mise en œuvre sur le réseau. 

Consultez le [livre Halo2](https://zcash.github.io/halo2/index.html) pour en savoir plus.

## Autres applications de la divulgation nulle de connaissance 

Les zk-SNARKs offrent plusieurs avantages dans des applications très variées. Examinons quelques exemples.

**Scalabilité** : elle est obtenue en « externalisant le calcul ». La divulgation nulle de connaissance n’est pas strictement nécessaire pour qu’une chaîne L1 vérifie le travail d’un service hors chaîne. Les transactions ne sont pas nécessairement privées sur une zk-EVM.

L’avantage d’un service de Rollup fondé sur les preuves (zk-Rollup) est de traiter un lot de centaines ou de milliers de transactions, la L1 pouvant vérifier une preuve succincte que toutes les transactions ont été traitées correctement, ce qui multiplie le débit de transactions du réseau par 100 ou 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Interopérabilité** : elle est obtenue sur un zk-Bridge en « verrouillant » des actifs sur une chaîne source et en prouvant à la chaîne cible que les actifs ont bien été verrouillés (preuve de consensus).

**Conformité** : des projets comme [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) sont capables de prouver qu’une transaction privée est conforme à la législation bancaire locale sans révéler les détails de la transaction. 

**Lutte contre la désinformation** : parmi plusieurs exemples en dehors de la blockchain et des cryptomonnaies, on peut citer la génération de preuves sur des images traitées par les organes de presse et les médias, afin de permettre aux lecteurs de vérifier de manière indépendante la source d’une image et toutes les opérations qui lui ont été appliquées. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Pour aller plus loin : 

[Bibliographie sur la divulgation nulle de connaissance - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[Les zkSNARK avec Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash : Halo 2 et les SNARKs sans configuration de confiance - Sean Bowe sur Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Les preuves à divulgation nulle de connaissance avec Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Preuves interactives à divulgation nulle de connaissance - article de Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Cours 1 : introduction et histoire des ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Explication simple des circuits arithmétiques - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[La scalabilité est ennuyeuse, la confidentialité est morte : à quoi servent les preuves ZK ?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Pages connexes

- [Pools protégés](/using-zcash/shielded-pools) — Comment les zk-SNARKs sont utilisés dans les pools de valeur Zcash
- [Halo](/zcash-tech/halo) — Le système de zk-SNARK de Zcash qui élimine les configurations de confiance
- [La sécurité post-quantique dans Zcash](/zcash-tech/post-quantum-security) - Le lien entre les futurs risques quantiques et la cryptographie Zcash
- [Actifs protégés Zcash](/zcash-tech/zcash-shielded-assets) — Les ZSA reposant sur la technologie zk-SNARK
- [Qu’est-ce que ZEC et Zcash](/start-here/what-is-zec-and-zcash) — Introduction à Zcash et à son modèle de confidentialité
- [Qui peut voir votre paiement Zcash ?](/start-here/who-can-see-your-zcash-payment) — Ce qui reste public et ce que la protection masque
