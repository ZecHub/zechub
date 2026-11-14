# Zero to Zero Knowledge : les fonctions de hachage

**Présentation de la série**  
Bienvenue dans une nouvelle série : **Zero to Zero Knowledge** !  

Dans cette série, nous découvrirons les fondamentaux d'un large éventail de technologies qui entrent dans la conception de nos protocoles préservant la confidentialité.

---

## Partie 1 : les fonctions de hachage

Nous commençons aujourd'hui par les **fonctions de hachage**, un élément clé de la cryptographie utilisé dans les blockchains. Plus loin dans cette série, nous aborderons certains sujets qui reposent sur leurs propriétés.

### Qu'est-ce qu'une fonction de hachage ?

Les fonctions de hachage prennent une entrée de longueur quelconque et produisent une sortie de longueur fixe.

- **Message à hacher** = Entrée  
- **Algorithme utilisé** = Fonction de hachage  
- **Sortie obtenue** = Valeur de hachage  


![Diagramme de fonction de hachage](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Essayez par vous-même !

Familiarisez-vous concrètement avec le concept grâce à cet outil !  
Saisissez un texte quelconque pour produire une sortie de longueur fixe. Observez comment la sortie varie selon l'algorithme de hachage utilisé.

**Essayez-le :** https://cryptii.com/pipes/hash-function

---

### Propriétés des fonctions de hachage cryptographiques

Les fonctions de hachage cryptographiques doivent posséder ces **3 propriétés** :

1. **À sens unique** : il doit être impossible en pratique d'inverser une fonction de hachage  
2. **Résistante aux collisions** : deux entrées différentes ne doivent pas produire la même sortie  
3. **Déterministe** : pour une entrée donnée, une fonction de hachage doit toujours donner le même résultat

---

### Fonctions de hachage courantes

Il existe plusieurs catégories de fonctions de hachage. Quelques exemples :

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** : utilisée dans la dérivation de clés de Zcash

**Une introduction à BLAKE2** : https://www.blake2.net

---

### Utilisations concrètes des fonctions de hachage

#### 1. Hachage d'intégrité (contrôles d'intégrité des données)
Les contrôles d'intégrité des données sont un exemple de « hachage d'intégrité ». Ils servent à générer des sommes de contrôle sur des fichiers de données et garantissent à l'utilisateur que ces données sont correctes.

![Exemple de hachage d'intégrité](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Arbres de Merkle (arbres de hachage)
Un **arbre de hachage**, ou **arbre de Merkle**, est composé de branches et de nœuds feuilles étiquetés avec le hachage cryptographique d'un bloc de données.

![Diagramme d'arbre de Merkle](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Les arbres de Merkle sont un exemple de **schéma d'engagement cryptographique**. La racine de l'arbre est considérée comme un engagement, et l'on prouve que les nœuds feuilles font partie de l'engagement d'origine.

Ils permettent de vérifier les données stockées ou transférées sur les réseaux P2P, en garantissant que les données reçues des pairs n'ont pas été altérées.

#### 3. Arbre d'engagements de notes dans Zcash
Dans les pools protégés **Sapling** et **Orchard** de Zcash, l'**arbre d'engagements de notes** sert à vérifier que les transactions sont valides au regard du consensus, tout en masquant parfaitement l'expéditeur, le destinataire et les montants dépensés.

#### 4. Hachage de signature (blocs de type Bitcoin)
**SHA256** est un exemple de « hachage de signature » utilisé pour garantir l'immuabilité de chaque bloc de la chaîne Bitcoin. Pour les nouveaux blocs, les mineurs utilisent le hachage du bloc précédent + un hachage de toutes les transactions du bloc courant (hashMerkleRoot) + un horodatage + une valeur aléatoire / la difficulté du réseau.

![Schéma fonctionnel de SHA256](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (minage de Zcash)
**Equihash** est l'algorithme de hachage utilisé pour le minage de Zcash. Il est également utilisé par des réseaux comme Komodo et Horizen.

**Equihash : Asymmetric Proof-of-Work Based on the Generalized Birthday Problem** (Biryukov et Khovratovich) : https://eprint.iacr.org/2015/946

---

### Pour aller plus loin

Pour mieux comprendre les différents types de fonctions de hachage et leurs usages, voici une excellente ressource :  
https://en.wikipedia.org/wiki/Hash_function

---

**Fil de ZecHub (@ZecHub)**  
Fil X d'origine : https://x.com/ZecHub/status/1621240109663227906  

---

*Cette page a été compilée à partir du fil Zero to Zero Knowledge d'origine pour le wiki ZecHub.*
