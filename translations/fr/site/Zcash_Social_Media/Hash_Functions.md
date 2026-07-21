# De zéro à la connaissance nulle : fonctions de hachage

**Introduction de la série**  
Bienvenue dans une nouvelle série : **De zéro à la connaissance nulle** !  

Dans cette série, nous apprendrons les fondamentaux d’un large éventail de technologies qui entrent dans la composition de nos protocoles de préservation de la vie privée.

---

## Partie 1 : Fonctions de hachage

Aujourd’hui, nous commençons avec les **fonctions de hachage** — un élément clé de la cryptographie utilisé dans les blockchains. Plus tard dans cette série, nous aborderons certains sujets qui s’appuient sur leurs propriétés.

### Qu’est-ce qu’une fonction de hachage ?

Les fonctions de hachage prennent une entrée de n’importe quelle longueur et produisent une sortie de longueur fixe.

- **Message à hacher** = Entrée  
- **L’algorithme utilisé** = Fonction de hachage  
- **Sortie résultante** = Valeur de hachage  


![Schéma d’une fonction de hachage](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### Essayez par vous-même !

Prenons-en une compréhension pratique à l’aide de cet outil !  
Saisissez n’importe quel texte arbitraire pour produire une sortie de longueur fixe. Observez comment la sortie varie selon les différents algorithmes de hachage.

**Essayez-le :** https://cryptii.com/pipes/hash-function

---

### Propriétés des fonctions de hachage cryptographiques

Les fonctions de hachage cryptographiques doivent posséder ces **3 propriétés** :

1. **À sens unique** — Il doit être impossible en pratique d’inverser une fonction de hachage  
2. **Résistante aux collisions** — Deux entrées différentes ne doivent pas produire la même sortie  
3. **Déterministe** — Pour une entrée donnée, une fonction de hachage doit toujours donner le même résultat

---

### Fonctions de hachage courantes

Il existe plusieurs classes de fonctions de hachage. Quelques exemples :

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** — Utilisé dans la dérivation de clés de Zcash

**Une introduction à BLAKE2 par Zooko** : https://www.zfnd.org/blog/blake2/

---

### Utilisations concrètes des fonctions de hachage

#### 1. Hachage d’intégrité (vérifications de l’intégrité des données)
Les vérifications de l’intégrité des données sont un exemple de « hachage d’intégrité ». Elles servent à générer des sommes de contrôle sur des fichiers de données et à fournir à l’utilisateur une assurance de validité.

![Exemple de hachage d’intégrité](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Arbres de Merkle (arbres de hachage)
Un **arbre de hachage** ou **arbre de Merkle** est composé de branches et de nœuds feuilles étiquetés avec le hachage cryptographique d’un bloc de données.

![Schéma d’un arbre de Merkle](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Les arbres de Merkle sont un exemple de **schéma d’engagement cryptographique**. La racine de l’arbre est considérée comme un engagement, et les nœuds feuilles sont prouvés comme faisant partie de l’engagement d’origine.

Ils permettent de vérifier les données stockées ou transférées sur des réseaux P2P, en garantissant que les données reçues des pairs n’ont pas été altérées.

#### 3. Arbre d’engagement des notes dans Zcash
Dans les pools protégés **Sapling** et **Orchard** de Zcash, l’**arbre d’engagement des notes** est utilisé pour vérifier que les transactions sont valides vis-à-vis du consensus tout en dissimulant parfaitement l’expéditeur, le destinataire et les montants consommés.

#### 4. Hachage de signature (blocs de type Bitcoin)
**SHA256** est un exemple de « hachage de signature » utilisé pour garantir l’immuabilité de chaque bloc dans la chaîne Bitcoin. Les mineurs utilisent le hachage du bloc précédent + un hachage de toutes les transactions du bloc actuel (hashMerkleRoot) + l’horodatage + une valeur aléatoire / la difficulté du réseau pour les nouveaux blocs.

![Schéma de bloc SHA256](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (minage de Zcash)
**Equihash** est l’algorithme de hachage utilisé pour miner Zcash. Il est également utilisé par des réseaux tels que Komodo et Horizen.

**Article original du blog Zcash sur Equihash** : https://electriccoin.co/blog/equihash/

---

### Pour aller plus loin

Pour acquérir une meilleure compréhension des différents types de fonctions de hachage et de leurs usages associés, voici une excellente ressource :  
https://en.wikipedia.org/wiki/Hash_function

---

**Fil de ZecHub (@ZecHub)**  
Fil X original : https://x.com/ZecHub/status/1621240109663227906  

---

*Cette page a été compilée à partir du fil original De zéro à la connaissance nulle pour le wiki ZecHub.*
