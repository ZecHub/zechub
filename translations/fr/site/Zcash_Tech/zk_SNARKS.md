<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# ZKP & ZK-SNARKS

## TL;DR

- **ZK-SNARKs** = Arguments de connaissance succincts non interactifs à divulgation nulle
- Ils permettent à une partie de **prouver qu’elle sait quelque chose** sans révéler l’information elle-même
- Zcash utilise les ZK-SNARKs pour prouver qu’une transaction est valide (montants corrects, entrées non dépensées) **sans révéler l’expéditeur, le destinataire ni le montant**
- « Succinct » signifie que la preuve est minuscule et rapide à vérifier, même pour des énoncés complexes
- La pool Orchard utilise Halo 2, un système de ZK-SNARK ne nécessitant **aucune trusted setup**

---

## Qu’est-ce qu’une preuve ?

Les preuves sont la base de toutes les mathématiques. Une preuve est une affirmation ou un théorème que vous cherchez à démontrer, ainsi qu’une suite de dérivations permettant de déclarer que le théorème a été prouvé. Par ex., le fait que la somme des angles d’un triangle soit égale à 180° peut être vérifié indépendamment par n’importe qui (le vérificateur).

**Preuves** 

Prouveur ---> Fait une affirmation ---> Le vérificateur choisit ---> Accepter/Rejeter 

(Le prouveur et le vérificateur sont tous deux des algorithmes)

En informatique, le terme pour les preuves vérifiables efficacement est celui de preuves NP. Ces preuves courtes peuvent être vérifiées en temps polynomial. L’idée générale est : « Il existe une solution à un théorème et elle est transmise au vérificateur pour qu’il la contrôle »


<a href="">
    <img width="853" height="396" alt="LangageNP1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


Dans un langage NP = deux conditions doivent être réunies : 

Complétude : Les affirmations vraies seront acceptées par le vérificateur (ce qui permet aux prouveurs honnêtes d’obtenir la vérification)

Solidité : Les affirmations fausses n’auront aucune preuve (quelle que soit la stratégie d’un prouveur malhonnête, il ne pourra pas prouver la validité d’une affirmation incorrecte).


### Preuves interactives et probabilistes

**Interaction** : Au lieu de simplement lire la preuve, le vérificateur échange avec un prouveur aller-retour pendant plusieurs tours de messages.

**Aléa** : Les requêtes du vérificateur au prouveur sont randomisées, et le prouveur doit être capable d’y répondre correctement à chaque fois. 


<a href="">
 <img width="855" height="399" alt="ModèleIP1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


En utilisant ensemble l’interaction et l’aléa, il est possible de prouver une affirmation à un vérificateur aveugle en temps polynomial probabiliste (PPT). 

Les preuves interactives peuvent-elles vérifier efficacement davantage que les preuves NP ?

Preuves NP vs preuves IP :

|  Énoncé   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  oui      |  oui   |
|    CO-NP     |  non      |  oui   |
|    #P        |  non      |  oui   |
|    PSPACE    |  non      |  oui   |


NP - Il existe une solution à un énoncé

CO-NP - Prouver qu’il n’existe aucune solution à un énoncé

#P - Compter combien de solutions existent pour un énoncé

PSPACE  - Prouver une alternance de différents énoncés

### Qu’est-ce que la Zero Knowledge ?

Ce qu’un vérificateur peut calculer après une interaction est identique à ce qu’il pouvait prouver auparavant. L’interaction en plusieurs tours entre le prouveur et le vérificateur n’a pas augmenté la puissance de calcul du vérificateur.

**Le paradigme de simulation (Simulation Paradigm)**

Cette expérience existe dans toute la cryptographie. Elle présente une « vue réelle » et une « vue simulée ». 

Vue réelle : Tous les historiques possibles d’interactions entre le prouveur et le vérificateur (P,V)

Vue simulée : Le vérificateur simule toutes les interactions possibles entre le prouveur et le vérificateur 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Un distingueur en temps polynomial tente de déterminer s’il regarde la vue réelle ou la vue simulée et demande à plusieurs reprises un échantillon des deux.

On dit que les deux vues sont « indiscernables du point de vue computationnel » si, pour tous les algorithmes/stratégies de distinction, même après avoir reçu un nombre polynomial d’échantillons de la vue réelle ou simulée, la probabilité est >1/2. 

**Arguments de connaissance à divulgation nulle**

Un protocole interactif (P,V) est à divulgation nulle s’il existe un simulateur (algorithme) tel que, pour tout vérificateur probabiliste en temps polynomial (lorsque le théorème est correct), les distributions de probabilité permettant de distinguer la vue réelle de la vue simulée sont indiscernables du point de vue computationnel. 

Les protocoles interactifs sont utiles lorsqu’il n’y a qu’un seul vérificateur. Un exemple serait un contrôleur fiscal dans une application de « preuve d’impôts » à divulgation nulle.

## Qu’est-ce qu’un SNARK ?

**Argument de connaissance succinct non interactif**

Définition générale - Une preuve succincte qu’un énoncé est vrai. La preuve doit être courte et rapide à vérifier. Dans les SNARKS, un seul message est envoyé du prouveur au vérificateur. Le vérificateur peut ensuite choisir d’accepter ou de rejeter. 

exemple d’énoncé : « Je connais un message (m) tel que SHA256(m)=0 »

Dans un zk-SNARK, la preuve ne révèle rien sur le message (m).

**Polynômes** : Sommes de termes contenant une constante (comme 1,2,3), des variables (comme x,y,z) et des exposants de variables (comme x², y³). 

exemple : « 3x² + 8x + 17 »

**Circuit arithmétique** : Un modèle pour calculer des polynômes. Plus généralement, il peut être défini comme un graphe orienté acyclique dans lequel une opération arithmétique est effectuée à chaque nœud du graphe. Le circuit se compose de portes d’addition, de portes de multiplication et de certaines portes constantes. De la même manière que les circuits booléens transportent des bits dans des fils, les circuits arithmétiques transportent des entiers.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

Dans cet exemple, le prouveur veut convaincre le vérificateur qu’il connaît une solution au circuit arithmétique.  

**Engagements** : Pour ce faire, le prouveur va placer toutes les valeurs (privées et publiques) associées au circuit dans un engagement. Les engagements masquent leurs entrées en utilisant une fonction dont la sortie est irréversible.

Sha256 est un exemple de fonction de hachage pouvant être utilisée dans un schéma d’engagement.

Après que le prouveur s’est engagé sur les valeurs, les engagements sont envoyés au vérificateur (avec l’assurance qu’il est incapable de retrouver les valeurs d’origine). Le prouveur est alors en mesure de montrer au vérificateur qu’il connaît chacune des valeurs aux nœuds du graphe. 

**Transformation de Fiat-Shamir**

Pour rendre le protocole *non interactif*, le prouveur génère l’aléa (utilisé pour le défi caché) au nom du vérificateur à l’aide d’une fonction de hachage cryptographique. C’est ce qu’on appelle l’oracle aléatoire. Le prouveur peut alors envoyer un seul message au vérificateur, qui peut ensuite vérifier qu’il est correct. 

Pour former un SNARK pouvant être utilisé pour des circuits généraux, deux éléments sont nécessaires :

Schéma d’engagement fonctionnel : Permet à un auteur d’engagement de s’engager sur un polynôme avec une courte chaîne pouvant être utilisée par un vérificateur pour confirmer les évaluations revendiquées du polynôme engagé.

Oracle interactif polynomial : Le vérificateur demande au prouveur (algorithme) d’ouvrir tous les engagements en différents points de son choix à l’aide d’un schéma d’engagement polynomial et vérifie que l’identité entre eux est bien respectée.

**Setup**

Les procédures de setup aident le vérificateur en résumant un circuit et en produisant des paramètres publics. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Types de setup de prétraitement** :

Trusted Setup par circuit - Est exécutée une fois par circuit. Elle est spécifique à un circuit et l’aléa secret (Common Reference String) doit rester secret et être détruit. 

Un setup compromis dans cette méthode signifie qu’un prouveur malhonnête peut prouver de fausses affirmations. 

Trusted Setup universelle - Il suffit d’exécuter la trusted setup une seule fois, puis il est possible de prétraiter de manière déterministe plusieurs circuits. 

Setup transparente (sans trusted setup)- L’algorithme de prétraitement n’utilise aucun aléa secret. 


**Types de constructions de preuves SNARK** :

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Nécessite une trusted setup mais possède des preuves très courtes qui peuvent être vérifiées rapidement.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Trusted Setup universelle.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Pas de trusted setup, mais produisent des preuves légèrement plus longues ou peuvent demander plus de temps d’exécution au prouveur. 

Les SNARKS sont utiles lorsque plusieurs vérificateurs sont nécessaires, comme sur une blockchain telle que Zcash ou un zk-Rollup tel que [Aztec](https://docs.aztec.network), afin que plusieurs nœuds de validation n’aient pas à interagir pendant plusieurs tours avec chaque preuve. 

## Comment les zk-SNARK sont-ils implémentés dans Zcash ?

De manière générale, les preuves à divulgation nulle sont un outil permettant d’imposer un comportement honnête dans les protocoles sans révéler aucune information. 

Zcash est une blockchain publique qui facilite les transactions privées. Les zk-SNARK sont utilisés pour prouver qu’une transaction privée est valide selon les règles de consensus du réseau sans révéler d’autres détails sur la transaction. 

[Explication vidéo](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Dans cette conférence, Ariel Gabizon décrit l’arbre d’engagement des notes de Zcash, l’évaluation polynomiale aveugle et les défis homomorphiquement cachés, ainsi que leur implémentation sur le réseau. 

Lisez le [livre Halo2](https://zcash.github.io/halo2/index.html) pour plus d’informations.

## Autres applications de la Zero Knowledge 

Les zk-SNARKS offrent plusieurs avantages dans une grande variété d’applications. Examinons quelques exemples.

**Scalabilité** : Cela est rendu possible par la « sous-traitance du calcul ». Il n’y a pas de besoin strict de Zero Knowledge pour qu’une chaîne L1 vérifie le travail d’un service hors chaîne. Les transactions ne sont pas nécessairement privées sur une zk-EVM.

L’avantage d’un service Rollup basé sur des preuves (zk-Rollup) est de traiter un lot de centaines ou de milliers de transactions, tandis que la L1 est capable de vérifier une preuve succincte que toutes les transactions ont été traitées correctement, augmentant le débit transactionnel du réseau d’un facteur 100 ou 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Interopérabilité** : Cela est réalisé sur un zk-Bridge en « verrouillant » des actifs sur une chaîne source et en prouvant à la chaîne cible que les actifs ont bien été verrouillés (preuve de consensus).

**Conformité** : Des projets tels que [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) sont capables de prouver qu’une transaction privée est conforme aux lois bancaires locales sans révéler les détails de la transaction. 

**Lutte contre la désinformation** : Parmi plusieurs exemples en dehors de la blockchain et des cryptomonnaies, on peut citer l’utilisation de génération de preuves sur des images traitées par des médias et organes de presse afin de permettre aux spectateurs de vérifier indépendamment la source d’une image et toutes les opérations qui y ont été effectuées. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Pour aller plus loin : 

[Bibliographie Zero-Knowledge - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's avec Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 and SNARKs without Trusted Setups - Sean Bowe chez Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Preuves Zero knowledge avec Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Preuves interactives à divulgation nulle - article Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Leçon 1 : Introduction et histoire des ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Explication simple des circuits arithmétiques - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[La scalabilité est ennuyeuse, la confidentialité est morte : à quoi servent les ZK-Proofs ?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Pages associées

- [Shielded Pools](/using-zcash/shielded-pools) — Comment les ZK-SNARKs sont utilisées dans les pools de valeur de Zcash
- [Halo](/zcash-tech/halo) — Le système de ZK-SNARK de Zcash qui élimine les trusted setups
- [Sécurité post-quantique dans Zcash](/zcash-tech/post-quantum-security) - Comment les futurs risques quantiques sont liés à la cryptographie de Zcash
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — Les ZSAs construites sur la technologie ZK-SNARK
- [Qu’est-ce que ZEC et Zcash](/start-here/what-is-zec-and-zcash) — Introduction à Zcash et à son modèle de confidentialité
- [La confidentialité comme principe fondamental](/privacy/privacy-as-a-core-principle) — Pourquoi la confidentialité financière est importante
