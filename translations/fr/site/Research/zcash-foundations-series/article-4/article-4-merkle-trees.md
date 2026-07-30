# Arbres de Merkle : comment la blockchain se souvient de chaque note
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![texte alternatif](image-19.png)

### Résumer des millions d'engagements en une minuscule empreinte

> **Série :** *Zcash from First Principles* . **Article 4 . Arbres de Merkle**
> **Public :** débutants. Nous nous appuyons sur [l'article 3 (hachage et engagements)](article-3-hashing-commitments.md). Si vous savez ce qu'est une empreinte et un engagement, vous êtes prêt.
> **Ce que vous en retirerez :** une vision intuitive et correcte des arbres de Merkle, comment prouver l'appartenance sans révéler quel élément vous désignez, et exactement comment cela devient l'arbre d'engagements de notes de Zcash.

[L'article 0](article-0-shielded-transaction.md) décrivait un « tableau public » qui contient chaque note jamais créée et ne fait que grandir. À présent, vous pouvez deviner ce qui y est affiché : des **engagements** (article 3), les enveloppes scellées. Mais un vrai tableau en contiendrait *des centaines de millions*. Comment le réseau stocke-t-il cela, le vérifie-t-il, et vous permet-il de prouver que votre enveloppe est sur le tableau sans la désigner ? La réponse est l'une des structures les plus élégantes de l'informatique : l'**arbre de Merkle.**

---

## 1. Pourquoi devriez-vous vous en soucier ?

Deux problèmes apparaissent dès que vous avez une gigantesque liste publique d'engagements.

**Premier problème : l'intégrité à grande échelle.** Si la liste contient 300 millions d'entrées, comment quelqu'un peut-il confirmer qu'il n'en a pas été secrètement modifiée *une seule* ? Revérifier 300 millions d'éléments à chaque coup d'œil est sans espoir.

**Deuxième problème : l'appartenance privée.** Pour dépenser une note (article 0), vous devez prouver que votre engagement est réellement sur le tableau. Mais si vous le désignez (« c'est l'entrée numéro 4 201 337 ! »), vous venez de vous désanonymiser. Vous devez prouver *« mon enveloppe se trouve quelque part sur ce tableau »* sans révéler **laquelle**.

Un arbre de Merkle résout les deux à la fois. Il compresse l'intégralité de la liste en une seule empreinte, et il vous permet de prouver l'appartenance avec une preuve minuscule qui dissimule la position.

---

## 2. L'intuition : un tournoi d'empreintes

Imaginez un tableau de tournoi à élimination directe, mais au lieu que des joueurs avancent, ce sont des **empreintes qui sont combinées**.

- En bas, chaque donnée reçoit sa propre empreinte (son hash de l'article 3). Ce sont les **feuilles**.
- On les met par paires. Les deux empreintes de chaque paire sont hachées *ensemble* en une empreinte parente.
- On met les parents par paires, on hache chaque paire ensemble, et ainsi de suite.
- On continue jusqu'à ce qu'une **empreinte unique** se trouve au sommet. Ce champion est la **racine de Merkle.**

![texte alternatif](image-20.png)

La propriété la plus importante découle directement de l'effet d'avalanche (article 3) :

> **La racine est une empreinte de *tout* ce qui se trouve en dessous.** Modifiez n'importe quelle feuille, même d'un seul bit, et son empreinte change, ce qui change son parent, ce qui change *ce* parent, jusqu'en haut. **La racine change.** Ainsi, une petite valeur de racine certifie l'intégrité de toute la liste. Cela résout le premier problème.

---

## 3. Un vrai arbre, calculé exactement

Construisons l'arbre à quatre feuilles ci-dessus avec de vraies empreintes SHA-256 sur les feuilles `A, B, C, D` (digests affichés tronqués pour la lisibilité) :

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Tout revient simplement à « hacher une chose, puis hacher des paires de hachages ». Rien de plus exotique que l'article 3, simplement arrangé en arbre.

---

## 4. La partie ingénieuse : prouver l'appartenance sans révéler la position

Passons maintenant au deuxième problème. Supposons que vous vouliez prouver que la feuille `C` est dans l'arbre, à quelqu'un qui ne connaît que la **racine**. Vous ne lui remettez *pas* tout l'arbre. Vous lui donnez uniquement les empreintes nécessaires pour remonter de `C` jusqu'à la racine, appelées le **chemin d'authentification** (ou **preuve de Merkle**) :

> Pour prouver que `C` est dans l'arbre, fournissez :
> - son voisin `hD`, et
> - son oncle `hAB`.

Le vérificateur, ne connaissant que la racine, recalcule la remontée :

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Calculé pour de vrai : cela donne `1b3faa3fcc5e...`, ce qui **correspond à la racine.** La présence de la feuille dans l'arbre est prouvée.

![texte alternatif](image-21.png)

Deux choses rendent cela puissant :

- **C'est minuscule.** Pour 4 feuilles, vous avez fourni 2 hachages. Pour un arbre de `n` feuilles, vous ne fournissez qu'environ **log_2(n)** hachages. Pour un milliard de feuilles, cela représente environ **30 hachages**, pas un milliard. La preuve grandit à peine alors que l'arbre explose en taille.
- **C'est la graine de la confidentialité.** La preuve montre que votre feuille se trouve *quelque part* dans l'arbre. Lorsque cette même vérification est effectuée *à l'intérieur d'une preuve à divulgation nulle de connaissance* (article 5), même le chemin lui-même est caché, vous prouvez donc « ma note est dans l'arbre » sans révéler ni la note ni sa position. Cela résout complètement le deuxième problème.

---

## 5. D'un arbre de Merkle à l'arbre d'engagements de notes de Zcash

Nous pouvons maintenant énoncer précisément ce qu'est réellement le « tableau public » de l'article 0 :

> L'**arbre d'engagements de notes** est un arbre de Merkle dont les **feuilles sont des engagements de notes.** Chaque fois qu'une note est créée quelque part dans le monde, son engagement est ajouté comme feuille suivante, et la racine est mise à jour.

Quelques précisions concrètes :

- **Il ne fait que grandir.** Les feuilles sont ajoutées, jamais supprimées. On appelle cela un **arbre de Merkle incrémental.** (Cela correspond au « le tableau n'arrache jamais rien » de l'article 0.)
- **La racine s'appelle l'*anchor*.** Lorsque vous dépensez, votre transaction référence un anchor récent et prouve, en connaissance nulle, que l'engagement de votre note se trouve dans l'arbre ayant cette racine.
- **Profondeur fixe.** Les arbres shielded de Zcash ont une profondeur de **32**, ce qui signifie qu'ils peuvent contenir jusqu'à `2^(32)` (plus de quatre milliards) de notes.
- **Hachage compatible ZK.** L'arbre n'est pas construit avec SHA-256. Sapling hache l'arbre avec des **hachages Pedersen** et Orchard utilise **Sinsemilla** (tous deux issus de l'article 3), précisément pour que la remontée d'appartenance soit peu coûteuse à prouver à l'intérieur d'un circuit.

![texte alternatif](image-22.png)

### Une chose que l'arbre *ne* gère *pas* : les doubles dépenses

L'arbre prouve qu'une note **existe**. Il n'empêche pas, à lui seul, de dépenser deux fois la même note. Cette tâche appartient à l'**ensemble des nullifiers** de l'article 0 : une collection séparée de « jetons d'annulation ». Quand vous dépensez, vous publiez le nullifier de la note, et le réseau rejette tout nullifier qu'il a déjà vu auparavant.

Les deux structures publiques jouent donc des rôles complémentaires, et le fait de les garder séparées est précisément ce qui coupe le lien entre la naissance d'une note et sa mort :

| Structure | Question à laquelle elle répond | Mise à jour quand |
|---|---|---|
| **Arbre d'engagements de notes** | « Cette note existe-t-elle ? » | Une note est **créée** (engagement ajouté) |
| **Ensemble des nullifiers** | « Cette note a-t-elle déjà été dépensée ? » | Une note est **dépensée** (nullifier publié) |

---

## 6. Une mise en garde honnête

Des simplifications, comme d'habitude. Les vrais arbres de Merkle incrémentaux suivent des nœuds de « frontier » afin que la racine puisse être mise à jour sans tout reconstruire ; le réseau conserve une fenêtre d'anchors récents, pas seulement le dernier, afin que les portefeuilles ne soient pas cassés à chaque nouveau bloc ; et les feuilles vides utilisent une valeur de remplissage définie. Nous avons aussi dessiné des arbres binaires avec de jolies puissances de deux. Rien de tout cela ne change l'intuition : des feuilles d'engagements, hachées par paires jusqu'à une seule racine, avec de courtes preuves d'appartenance. La comptabilité exacte reviendra dans l'article sur le protocole.

---

## 7. Résumé

- Un **arbre de Merkle** hache des données en **feuilles**, puis hache des **paires vers le haut** jusqu'à ce qu'il ne reste qu'une seule **racine**.
- Grâce à l'effet d'avalanche, la **racine est une empreinte de toute la liste** : modifiez une feuille et la racine change. Une petite valeur certifie un énorme jeu de données.
- Une **preuve d'appartenance (chemin d'authentification)** n'est rien d'autre que les voisins le long de la remontée vers la racine, soit environ **log_2(n)** hachages ; les preuves restent donc minuscules même pour des milliards de feuilles.
- Effectuée **à l'intérieur d'une preuve à divulgation nulle de connaissance**, cette vérification d'appartenance cache *quelle* feuille vous désignez, prouvant « ma note est dans l'arbre » sans révéler ni la note ni sa position.
- L'**arbre d'engagements de notes** de Zcash est un arbre de Merkle **incrémental** d'engagements de notes, de profondeur **32**, dont la racine est l'**anchor** ; Sapling le hache avec **Pedersen** et Orchard avec **Sinsemilla**.
- L'arbre prouve l'**existence** ; l'**ensemble des nullifiers** séparé empêche les **doubles dépenses**. Les garder séparés est ce qui dissocie la naissance d'une note de sa mort.

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Arbre de Merkle** | Un arbre de hachages ; les feuilles sont des empreintes de données, les parents hachent leurs enfants |
| **Feuille** | Un nœud du bas ; dans Zcash, un engagement de note |
| **Racine de Merkle** | L'unique empreinte au sommet qui résume tout l'arbre |
| **Chemin d'authentification / preuve de Merkle** | Les hachages frères nécessaires pour prouver qu'une feuille est dans l'arbre |
| **Arbre de Merkle incrémental** | Un arbre de Merkle en ajout uniquement (les feuilles ne font qu'être ajoutées) |
| **Anchor** | Une racine de Merkle qu'une dépense référence comme « l'état de l'arbre contre lequel je prouve » |
| **Ensemble des nullifiers** | La collection séparée de marqueurs de dépense qui bloque les doubles dépenses |

---

## FAQ

**Pourquoi un arbre et pas simplement une longue liste de hachages ?**
Une liste plate vous obligerait à révéler ou à traiter chaque entrée pour prouver l'appartenance. Un arbre vous donne des preuves de taille logarithmique et une racine unique pour l'intégrité.

**Le vérificateur a-t-il besoin de tout l'arbre ?**
Non. Le vérificateur n'a besoin que de la **racine** plus votre court chemin d'authentification. C'est tout l'intérêt.

**Pourquoi une profondeur de 32 précisément ?**
Cela borne l'arbre à environ quatre milliards de notes, ce qui laisse une large marge, tout en gardant la preuve d'appartenance (et son coût dans le circuit) d'une taille fixe et gérable.

**Si la racine change à chaque nouvelle note, comment les anciennes preuves restent-elles valides ?**
Le réseau se souvient d'une fenêtre de racines récentes (anchors), donc une preuve faite contre un anchor légèrement plus ancien se vérifie toujours. L'article sur le protocole rend cela précis.

---

### Testez votre intuition

Dans notre arbre à 4 feuilles, supposons qu'un attaquant remplace secrètement la feuille `C` par une valeur différente tout en laissant la racine publiée inchangée. Qu'est-ce qui se passe mal pour lui, et pourquoi ne peut-il pas le corriger discrètement ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Modifier `C` change `hC` (effet d'avalanche), ce qui change `hCD = H(hC, hD)`, ce qui change `ROOT = H(hAB, hCD)`. La racine recalculée ne correspond donc plus à la racine publiée, et la falsification est détectée. Pour le « corriger discrètement », il faudrait trouver un `C` différent qui produise le *même* `hC`, ce qui est une collision de hachage, irréalisable d'après l'article 3. L'intégrité tient.
</details>

---

### Et ensuite

**Article 5 . Preuves à divulgation nulle de connaissance :** le crescendo. Nous avons maintenant construit les notes, les engagements et l'arbre, et nous continuons à dire « prouvé en connaissance nulle ». L'article 5 explique enfin comment vous pouvez prouver qu'une affirmation est vraie, que votre note est dans l'arbre, que votre nullifier est correct, que l'argent s'équilibre, sans rien en révéler.

*Fait partie de la série* Zcash from First Principles *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
