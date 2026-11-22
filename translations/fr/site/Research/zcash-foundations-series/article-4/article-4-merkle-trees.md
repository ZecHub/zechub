# Arbres de Merkle : comment la blockchain se souvient de chaque note
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-19-cfbdcf8f78.webp)

### Résumer des millions d'engagements en une minuscule empreinte

> **Série :** *Zcash à partir des principes fondamentaux* . **Article 4 . Arbres de Merkle**
> **Public :** débutants. Nous nous appuyons sur l'[Article 3 (hachage et engagements)](article-3-hashing-commitments.md). Si vous savez ce que sont une empreinte et un engagement, vous êtes prêt.
> **Ce que vous en retirerez :** une image intuitive et exacte des arbres de Merkle, la manière de prouver l'appartenance sans révéler de quel élément il s'agit, et comment, précisément, cela devient l'arbre des engagements de notes de Zcash.

L'[Article 0](article-0-shielded-transaction.md) décrivait un « tableau public » qui contient chaque note jamais créée et ne fait que grandir. Vous pouvez désormais deviner ce qui y est épinglé : des **engagements** (Article 3), les enveloppes scellées. Mais un vrai tableau en contiendrait *des centaines de millions*. Comment le réseau stocke-t-il tout cela, le vérifie-t-il, et vous permet-il de prouver que votre enveloppe se trouve sur le tableau sans la désigner ? La réponse est l'une des structures les plus élégantes de l'informatique : l'**arbre de Merkle.**

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Deux problèmes apparaissent dès que vous disposez d'une gigantesque liste publique d'engagements.

**Premier problème : l'intégrité à grande échelle.** Si la liste compte 300 millions d'entrées, comment quiconque peut-il confirmer qu'*aucune* n'a été secrètement modifiée ? Revérifier 300 millions d'éléments à chaque coup d'œil est sans espoir.

**Second problème : l'appartenance confidentielle.** Pour dépenser une note (Article 0), vous devez prouver que votre engagement figure réellement sur le tableau. Mais si vous le désignez (« c'est l'entrée numéro 4 201 337 ! »), vous venez de vous désanonymiser. Vous devez prouver *« mon enveloppe se trouve quelque part sur ce tableau »* sans révéler **laquelle**.

Un arbre de Merkle résout les deux à la fois. Il compresse la liste entière en une seule empreinte, et il vous permet de prouver l'appartenance grâce à une preuve minuscule qui masque la position.

---

## 2. L'intuition : un tournoi d'empreintes

Imaginez le tableau d'un tournoi à élimination directe, mais au lieu de joueurs qui avancent, **ce sont des empreintes qui se combinent.**

- En bas, chaque donnée reçoit sa propre empreinte (son hachage, vu à l'Article 3). Ce sont les **feuilles.**
- Regroupez-les par paires. Les deux empreintes de chaque paire sont hachées *ensemble* en une seule empreinte parente.
- Regroupez les parents par paires, hachez chaque paire ensemble, et ainsi de suite.
- Continuez jusqu'à ce qu'une **seule empreinte** trône au sommet. Ce champion est la **racine de Merkle.**

![alt text](/content-images/image-20-f5d57e425a.webp)

La propriété la plus importante découle directement de l'effet avalanche (Article 3) :

> **La racine est une empreinte de *tout* ce qui se trouve en dessous.** Modifiez n'importe quelle feuille, même d'un seul bit, et son empreinte change, ce qui change son parent, ce qui change *ce* parent-là, et ainsi de suite jusqu'en haut. **La racine change.** Ainsi, une petite valeur de racine certifie l'intégrité de la liste entière. Cela résout le premier problème.

---

## 3. Un vrai arbre, calculé exactement

Construisons l'arbre à quatre feuilles ci-dessus avec de vraies empreintes SHA-256 sur les feuilles `A, B, C, D` (condensés tronqués pour plus de lisibilité) :

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Tout se résume à « hacher un élément, puis hacher des paires de hachages ». Rien de plus exotique que l'Article 3, organisé en arbre.

---

## 4. La partie astucieuse : prouver l'appartenance sans révéler la position

Passons au second problème. Supposons que vous vouliez prouver que la feuille `C` se trouve dans l'arbre, à quelqu'un qui ne connaît que la **racine**. Vous ne lui remettez *pas* l'arbre entier. Vous lui remettez uniquement les empreintes nécessaires pour remonter de `C` jusqu'à la racine, ce qu'on appelle le **chemin d'authentification** (ou **preuve de Merkle**) :

> Pour prouver que `C` se trouve dans l'arbre, fournissez :
> - sa sœur `hD`, et
> - son oncle `hAB`.

Le vérificateur, qui ne connaît que la racine, recalcule la remontée :

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Calculé pour de vrai : on obtient `1b3faa3fcc5e...`, qui **correspond à la racine.** La présence de la feuille dans l'arbre est prouvée.

![alt text](/content-images/image-21-d9e5d6eaf6.webp)

Deux éléments rendent cela puissant :

- **C'est minuscule.** Pour 4 feuilles, vous avez fourni 2 hachages. Pour un arbre de `n` feuilles, vous ne fournissez qu'environ **log_2(n)** hachages. Pour un milliard de feuilles, cela fait environ **30 hachages**, et non un milliard. La preuve grossit à peine alors que la taille de l'arbre explose.
- **C'est le germe de la confidentialité.** La preuve montre que votre feuille se trouve *quelque part* dans l'arbre. Lorsque cette même vérification est effectuée *à l'intérieur d'une preuve à divulgation nulle de connaissance* (Article 5), même le chemin est masqué : vous prouvez ainsi « ma note est dans l'arbre » sans révéler ni la note ni sa position. Cela résout entièrement le second problème.

---

## 5. D'un arbre de Merkle à l'arbre des engagements de notes de Zcash

Nous pouvons maintenant préciser ce qu'est réellement le « tableau public » de l'Article 0 :

> L'**arbre des engagements de notes** est un arbre de Merkle dont les **feuilles sont des engagements de notes.** Chaque fois qu'une note est créée, où que ce soit dans le monde, son engagement est ajouté comme feuille suivante, et la racine est mise à jour.

Quelques détails concrets :

- **Il ne fait que grandir.** Les feuilles sont ajoutées, jamais supprimées. On parle d'**arbre de Merkle incrémental.** (Cela correspond au « le tableau ne retire jamais rien » de l'Article 0.)
- **La racine s'appelle l'*ancre*.** Lorsque vous dépensez, votre transaction fait référence à une ancre récente et prouve, à divulgation nulle de connaissance, que l'engagement de votre note se trouve dans l'arbre ayant cette racine.
- **Profondeur fixe.** Les arbres protégés de Zcash ont une profondeur de **32**, ce qui signifie qu'ils peuvent contenir jusqu'à `2^(32)` notes (plus de quatre milliards).
- **Un hachage adapté aux preuves à divulgation nulle de connaissance.** L'arbre n'est pas construit avec SHA-256. Sapling hache l'arbre avec des **hachages de Pedersen** et Orchard utilise **Sinsemilla** (tous deux présentés à l'Article 3), précisément pour que la remontée d'appartenance soit peu coûteuse à prouver à l'intérieur d'un circuit.

![alt text](/content-images/image-22-518354b8d5.webp)

### Une chose que l'arbre ne gère *pas* : les doubles dépenses

L'arbre prouve qu'une note **existe**. Il ne vous empêche pas, à lui seul, de dépenser deux fois la même note. Cette tâche revient à l'**ensemble des nullifiers** de l'Article 0 : une collection distincte de « jetons d'annulation ». Lorsque vous dépensez, vous publiez le nullifier de la note, et le réseau rejette tout nullifier qu'il a déjà vu.

Les deux structures publiques jouent donc des rôles complémentaires, et c'est précisément le fait de les garder séparées qui rompt le lien entre la naissance d'une note et sa mort :

| Structure | Question à laquelle elle répond | Mise à jour lorsque |
|---|---|---|
| **Arbre des engagements de notes** | « Cette note existe-t-elle ? » | Une note est **créée** (engagement ajouté) |
| **Ensemble des nullifiers** | « Cette note a-t-elle déjà été dépensée ? » | Une note est **dépensée** (nullifier publié) |

---

## 6. Un avertissement honnête

Des simplifications, comme d'habitude. Les véritables arbres de Merkle incrémentaux suivent des nœuds de « frontière » afin que la racine puisse être mise à jour sans tout reconstruire ; le réseau conserve une fenêtre d'ancres récentes, et pas seulement la dernière, afin que les portefeuilles ne soient pas perturbés à chaque nouveau bloc ; et les feuilles vides utilisent une valeur de remplissage définie. Nous avons aussi dessiné des arbres binaires avec de jolies puissances de deux. Rien de tout cela ne change l'intuition : des feuilles d'engagements, hachées par paires jusqu'à une racine unique, avec de courtes preuves d'appartenance. La comptabilité exacte sera abordée dans l'article consacré au protocole.

---

## 7. Résumé

- Un **arbre de Merkle** hache les données en **feuilles**, puis hache les **paires en remontant** jusqu'à ce qu'il ne reste qu'une seule **racine**.
- Grâce à l'effet avalanche, la **racine est une empreinte de la liste entière** : modifiez une feuille et la racine change. Une petite valeur certifie un énorme ensemble de données.
- Une **preuve d'appartenance (chemin d'authentification)** n'est que l'ensemble des sœurs le long de la remontée vers la racine, soit environ **log_2(n)** hachages, de sorte que les preuves restent minuscules même pour des milliards de feuilles.
- Effectuée **à l'intérieur d'une preuve à divulgation nulle de connaissance**, cette vérification d'appartenance masque *de quelle* feuille il s'agit, prouvant « ma note est dans l'arbre » sans révéler la note ni sa position.
- L'**arbre des engagements de notes** de Zcash est un arbre de Merkle **incrémental** d'engagements de notes, de profondeur **32**, dont la racine est l'**ancre** ; Sapling le hache avec **Pedersen** et Orchard avec **Sinsemilla**.
- L'arbre prouve l'**existence** ; l'**ensemble des nullifiers**, distinct, empêche les **doubles dépenses**. C'est leur séparation qui dissocie la naissance d'une note de sa mort.

---

## Glossaire

| Terme | Signification en langage simple |
|---|---|
| **Merkle tree** | Un arbre de hachages ; les feuilles sont des empreintes de données, les parents hachent leurs enfants |
| **Leaf** | Un nœud du bas ; dans Zcash, un engagement de note |
| **Merkle root** | L'unique empreinte du sommet qui résume l'arbre entier |
| **Authentication path / Merkle proof** | Les hachages des sœurs nécessaires pour prouver qu'une feuille se trouve dans l'arbre |
| **Incremental Merkle tree** | Un arbre de Merkle en ajout seul (les feuilles ne sont jamais qu'ajoutées) |
| **Anchor** | Une racine de Merkle à laquelle une dépense fait référence comme « l'état de l'arbre par rapport auquel je prouve » |
| **Nullifier set** | La collection distincte de marqueurs de dépense qui bloque les doubles dépenses |

---

## FAQ

**Pourquoi un arbre et pas simplement une longue liste de hachages ?**
Une liste plate vous obligerait à révéler ou à traiter chaque entrée pour prouver l'appartenance. Un arbre vous offre des preuves de taille logarithmique et une racine unique pour l'intégrité.

**Le vérificateur a-t-il besoin de l'arbre entier ?**
Non. Le vérificateur n'a besoin que de la **racine** et de votre court chemin d'authentification. C'est tout l'intérêt.

**Pourquoi précisément une profondeur de 32 ?**
Elle limite l'arbre à environ quatre milliards de notes, ce qui laisse une large marge, tout en maintenant la preuve d'appartenance (et son coût dans le circuit) à une taille fixe et raisonnable.

**Si la racine change à chaque nouvelle note, comment les anciennes preuves restent-elles valides ?**
Le réseau mémorise une fenêtre de racines récentes (ancres), de sorte qu'une preuve établie par rapport à une ancre légèrement plus ancienne reste vérifiable. L'article consacré au protocole précise ce point.

---

### Testez votre intuition

Dans notre arbre à 4 feuilles, supposons qu'un attaquant remplace secrètement la feuille `C` par une autre valeur, tout en laissant inchangée la racine publiée. Qu'est-ce qui tourne mal pour lui, et pourquoi ne peut-il pas corriger cela discrètement ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Modifier `C` modifie `hC` (effet avalanche), ce qui modifie `hCD = H(hC, hD)`, ce qui modifie `ROOT = H(hAB, hCD)`. La racine recalculée ne correspond donc plus à la racine publiée, et la falsification est détectée. Pour « corriger cela discrètement », il lui faudrait trouver un autre `C` produisant le *même* `hC`, c'est-à-dire une collision de hachage, irréalisable d'après l'Article 3. L'intégrité est préservée.
</details>

---

### La suite

**Article 5 . Preuves à divulgation nulle de connaissance :** le point culminant. Nous avons maintenant construit les notes, les engagements et l'arbre, et nous ne cessons de répéter « prouvé à divulgation nulle de connaissance ». L'Article 5 explique enfin comment vous pouvez prouver qu'une affirmation est vraie (que votre note est dans l'arbre, que votre nullifier est correct, que les montants s'équilibrent) sans rien en révéler.

*Fait partie de la série* Zcash à partir des principes fondamentaux *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
