# Hachage et engagements : l’enveloppe magique scellée
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![texte alternatif](image-15.png)

### Comment verrouiller un secret en public sans jamais pouvoir mentir à son sujet

> **Série :** *Zcash from First Principles* . **Article 3 . Hachage et engagements**
> **Public :** débutants. Nous nous appuyons sur [l’Article 1 (corps finis)](article-1-finite-fields.md) et [l’Article 2 (courbes elliptiques)](article-2-elliptic-curves.md), mais l’intuition se suffit à elle-même.
> **Ce que vous en retirerez :** une compréhension claire des fonctions de hachage, de ce que signifient réellement « hiding » et « binding », et de la manière dont Zcash construit les engagements de note qui ancrent chaque paiement privé.

Dans [l’Article 0](article-0-shielded-transaction.md), nous avons décrit une « enveloppe magique scellée » : quelque chose que vous pouvez épingler sur un tableau public et qui prouve qu’une enveloppe existe tout en cachant ce qu’elle contient, et que vous ne pourrez jamais remplacer plus tard. Nous avions promis d’expliquer comment une telle chose est possible. Cet article est cette explication. Nous avons besoin de deux ingrédients : les **fonctions de hachage** et les **engagements**.

---

## 1. Pourquoi devriez-vous vous en soucier ?

Imaginez que vous prédisiez le résultat d’une élection et que vous vouliez prouver, *après coup*, que vous l’aviez annoncé à l’avance. Vous ne pouvez pas simplement révéler votre prédiction (cela influence les gens, ou suscite des accusations selon lesquelles vous l’auriez changée). Et vous ne pouvez pas non plus la garder totalement secrète (dans ce cas, vous ne pourrez rien prouver plus tard).

Ce qu’il vous faut, c’est un moyen de **verrouiller une valeur maintenant, en public, de telle sorte que :**

- personne ne puisse savoir ce que vous avez verrouillé (cela reste secret pour le moment), et
- plus tard, lorsque vous la révélerez, vous **ne puissiez pas mentir** sur ce qu’elle était.

Ce mécanisme « verrouiller maintenant, révéler plus tard, sans pouvoir mentir » s’appelle un **engagement**, et il est partout dans Zcash. La valeur et le propriétaire d’une note sont verrouillés dans un engagement au moment même où la note est créée. Pour construire des engagements, nous avons d’abord besoin de leur cheval de bataille : la fonction de hachage.

---

## 2. L’intuition : une empreinte digitale pour les données

Une **fonction de hachage** prend n’importe quelle donnée, une seule lettre ou une bibliothèque entière, et l’écrase en une courte chaîne de taille fixe appelée **condensat** ou **haché**. Voyez-la comme une **empreinte digitale pour les données.**

![texte alternatif](image-16.png)

Une bonne empreinte cryptographique possède quatre propriétés. Gardez-les comme des intuitions, pas comme des équations :

| Propriété | Signification simple | Pourquoi c’est important |
|---|---|---|
| **Déterministe** | La même entrée donne toujours la même empreinte | Vous pouvez revérifier une empreinte à tout moment |
| **Rapide dans le sens direct** | Calculer l’empreinte est rapide | Utilisable en pratique partout |
| **À sens unique (résistance à la préimage)** | À partir d’une empreinte, on ne peut pas retrouver l’entrée qui l’a produite | Cache les données d’origine |
| **Résistance aux collisions** | On ne peut pas trouver deux entrées différentes avec la même empreinte | Personne ne peut forger une correspondance |

Et un autre comportement qui rend les empreintes presque magiques :

### L’effet avalanche (vérifié)

Modifiez l’entrée de la plus infime manière et l’empreinte change *complètement*, sans aucune ressemblance avec l’ancienne. Voici deux véritables empreintes SHA-256 de messages qui ne diffèrent que d’un seul caractère :

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Sur 64 chiffres hexadécimaux, **59 sont différents.** Un caractère en entrée, une empreinte totalement sans rapport en sortie. C’est pour cela qu’on ne peut pas faire dériver une entrée vers une empreinte cible : il n’y a aucun signal « plus chaud / plus froid » à suivre.

---

## 3. De l’empreinte à l’engagement

Voici une idée tentante mais défectueuse : pour s’engager sur une valeur secrète `v`, il suffit de publier son empreinte `H(v)`.

Cela vous *lie* bien (vous ne pourrez pas plus tard prétendre à une autre valeur `v`, car cela nécessiterait une collision). Mais cela **échoue à cacher.** Si l’ensemble des valeurs possibles est petit, un attaquant n’a qu’à calculer l’empreinte de chaque possibilité et comparer. Vous vous engagez sur « oui » ou « non » ? Il hache les deux et découvre instantanément lequel vous avez choisi. Le déterminisme, qui était notre ami il y a un instant, divulgue maintenant le secret.

La solution tient en un mot : **aléa.**

> **Un engagement est l’empreinte de votre valeur mélangée à un nombre aléatoire frais :**
> `commitment = H(v, r)` où `r` est une valeur aléatoire secrète de « blinding ».

Maintenant, la même valeur `v` produit un engagement d’apparence différente à chaque fois, parce que `r` est différent. Les deux propriétés que nous voulions sont enfin réunies :

![texte alternatif](image-17.png)

Pour **ouvrir** (révéler) l’engagement plus tard, vous publiez `v` et `r` ; n’importe qui peut recalculer `H(v, r)` et vérifier que cela correspond. Vous êtes verrouillé. Voilà l’enveloppe magique scellée de l’Article 0, rendue réelle.

> **Deux idées à retenir pour toujours :** *binding* vient de la résistance aux collisions du hachage ; *hiding* vient du facteur d’aveuglement aléatoire `r`.

---

## 4. Deux façons de construire l’enveloppe

Il existe deux recettes courantes, et Zcash utilise les deux.

| | **Engagement basé sur le hachage** | **Engagement de Pedersen** (de l’Article 2) |
|---|---|---|
| Recette | `H(v, r)` | `v.G + r.H` (points sur une courbe) |
| Le hiding vient de | l’aléa `r` | l’aléa `r` |
| Le binding vient de | la résistance aux collisions | la trappe de la courbe elliptique (ECDLP) |
| Pouvoir spécial | simple et rapide | les engagements **s’additionnent** (homomorphes) |

Cette dernière ligne explique pourquoi les engagements de Pedersen sont si importants dans Zcash. Parce que `commit(v_1) + commit(v_2)` est un `commit(v_1 + v_2)` valide, le protocole peut ensuite prouver que **l’argent entrant égale l’argent sortant** en additionnant les engagements, le tout sans révéler un seul montant. Nous mettons ce fait de côté pour l’Article 6.

---

## 5. Une subtilité qui façonne tout Zcash : le hachage compatible ZK

Voici une idée que la plupart des introductions passent sous silence, et c’est précisément le point « les maths rencontrent l’ingénierie » qui mérite d’être souligné.

SHA-256 est une superbe empreinte pour l’informatique du quotidien. Mais Zcash ne fait pas que *calculer* des hachages ; il doit aussi **prouver, à l’intérieur d’une preuve à divulgation nulle de connaissance, qu’un hachage a été calculé correctement** (l’Article 5 explique pourquoi). Et voici la difficulté : une preuve à divulgation nulle de connaissance fonctionne dans le langage de l’**arithmétique sur corps finis** (Article 1), alors que SHA-256 est construit à partir d’opérations de manipulation de bits (décalages, AND, XOR). Exprimer toute cette manipulation de bits en arithmétique sur corps est extrêmement coûteux, ce qui rend les preuves énormes et lentes.

Les cryptographes de Zcash ont donc conçu des fonctions de hachage dont les mécanismes internes sont *déjà* de l’arithmétique sur corps, ce qui les rend peu coûteuses à prouver :

![texte alternatif](image-18.png)

Cette seule contrainte d’ingénierie, *« il faut que ce soit peu coûteux à prouver »*, explique pourquoi Zcash a inventé et adopté des fonctions de hachage spéciales au lieu d’utiliser SHA-256 partout.

---

## 6. Où cela se situe dans Zcash

Zcash a utilisé différents hachages selon ses conceptions, chacun choisi pour une tâche précise :

| Conception | Hachages utilisés | Où |
|---|---|---|
| **Sprout** (la plus ancienne) | **SHA-256** | Engagements de note et arbre |
| **Sapling** | **Pedersen hashes**, plus **BLAKE2** | Pedersen pour les engagements de note et l’arbre de Merkle ; BLAKE2 pour la dérivation de clés et les nullifiers |
| **Orchard** (actuel) | **Sinsemilla**, plus **Poseidon** | Sinsemilla pour les engagements de note et l’arbre de Merkle ; Poseidon pour le nullifier, le tout conçu pour des circuits arithmétiques |

Les noms à reconnaître sont **Pedersen** et **Sinsemilla** (des hachages de type engagement construits à partir de points de courbe, qui héritent donc du superpouvoir « s’additionne » et se prouvent à faible coût) et **Poseidon** (un hachage en arithmétique sur corps conçu spécialement pour les circuits à divulgation nulle de connaissance). Lorsque l’Article 0 disait que le contenu d’une note est scellé dans un engagement, *c’est* ce mécanisme qui effectue le scellement.

Ainsi, la boucle ouverte de l’Article 0, *« comment une enveloppe scellée peut-elle cacher son contenu tout en étant impossible à falsifier ? »*, est maintenant refermée : **hiding grâce à un facteur d’aveuglement aléatoire, binding grâce à la résistance aux collisions ou à la trappe de la courbe.**

---

## 7. Une mise en garde honnête

Nous avons simplifié pour rester clairs. Les véritables schémas d’engagement précisent exactement comment `v` et `r` sont encodés et quels générateurs sont utilisés ; *hiding* et *binding* existent chacun en plusieurs variantes (parfaites ou computationnelles) avec des définitions de sécurité précises ; et nous n’avons pas montré les mécanismes internes de Pedersen, Sinsemilla ou Poseidon. Rien de cela ne change l’intuition : un engagement est une empreinte plus de l’aléa, qui cache maintenant et lie pour toujours. Les détails reviendront, signalés comme tels, lorsque l’article sur le protocole en aura besoin.

---

## 8. Résumé

- Une **fonction de hachage** est une **empreinte digitale pour les données** : déterministe, rapide dans le sens direct, à sens unique, résistante aux collisions, avec un **effet avalanche** (un bit en entrée, une empreinte totalement différente en sortie).
- Un **engagement** vous permet de **verrouiller une valeur en public maintenant et de la révéler plus tard sans pouvoir mentir.**
- Publier une simple empreinte `H(v)` lie mais ne **cache pas**. Ajouter un facteur d’aveuglement aléatoire, `H(v, r)`, corrige cela : **hiding grâce à `r`, binding grâce à la résistance aux collisions.**
- Zcash utilise à la fois des engagements **basés sur le hachage** et des engagements **de Pedersen** ; les engagements de Pedersen **s’additionnent** en plus, ce que l’Article 6 exploitera pour prouver l’équilibre des valeurs en privé.
- Comme les hachages doivent être **prouvés** à l’intérieur de preuves à divulgation nulle de connaissance, Zcash utilise des hachages **compatibles ZK** construits à partir d’arithmétique sur corps (**Pedersen**, **Sinsemilla**, **Poseidon**) plutôt que SHA-256 partout.

---

## Glossaire

| Terme | Signification en langage clair |
|---|---|
| **Hash function** | Écrase n’importe quelle donnée en une courte empreinte de taille fixe (condensat) |
| **Digest** | L’empreinte de sortie d’une fonction de hachage |
| **Preimage resistance** | Impossible d’inverser un condensat pour retrouver son entrée (à sens unique) |
| **Collision resistance** | Impossible de trouver deux entrées ayant le même condensat |
| **Avalanche effect** | Une minuscule modification de l’entrée change complètement le condensat |
| **Commitment** | Verrouiller une valeur maintenant, la révéler plus tard, sans pouvoir mentir à son sujet |
| **Blinding factor (`r`)** | Le nombre aléatoire frais qui permet à un engagement de cacher |
| **ZK-friendly hash** | Un hachage construit à partir d’arithmétique sur corps pour qu’il soit peu coûteux à prouver |

---

## FAQ

**Pourquoi ne pas simplement chiffrer la valeur au lieu de s’y engager ?**
Le chiffrement concerne le *secret que l’on peut déchiffrer plus tard*. Un engagement concerne le *binding* : la garantie que vous ne pouvez pas changer votre réponse plus tard. Ce sont deux rôles différents.

**Si les engagements cachent la valeur, comment quelqu’un peut-il vérifier les règles ?**
C’est le rôle des preuves à divulgation nulle de connaissance (Article 5) : elles prouvent que la valeur cachée respecte les règles sans la révéler.

**SHA-256 est-il cassé, puisque Zcash l’évite à certains endroits ?**
Non. SHA-256 fonctionne très bien et Zcash l’utilise toujours. Il est simplement coûteux à *prouver à l’intérieur d’un circuit*, ce qui explique l’existence de hachages compatibles ZK pour cette tâche spécifique.

**D’où vient l’aléa `r`, et qui le conserve ?**
Il est généré fraîchement lorsque la note est créée et connu du propriétaire de la note. Il fait partie de ce qui rend chaque note unique et privée.

---

### Testez votre intuition

Vous vous engagez sur votre prédiction électorale sous la forme `H(v, r)` et vous la publiez. Un ami insiste pour que vous publiiez simplement `H(v)` afin de faire plus simple. En une phrase, pourquoi est-ce une mauvaise idée s’il n’y a que deux résultats possibles ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

S’il n’y a que deux résultats, votre ami peut simplement calculer lui-même `H("win")` et `H("lose")` puis comparer avec votre condensat publié, découvrant instantanément votre prédiction. Le hachage seul lie mais ne cache pas ; c’est l’aléa `r` qui empêche cette attaque par essai et vérification.
</details>

---

### La suite

**Article 4 . Arbres de Merkle :** nous avons maintenant des millions d’engagements qui s’accumulent. L’Article 4 montre comment Zcash les organise dans un arbre unique dont la minuscule empreinte racine représente tout l’historique, et comment vous pouvez prouver que votre note se trouve dans cet arbre sans révéler laquelle. C’est la véritable forme du « tableau public » de l’Article 0.

*Fait partie de la série* Zcash from First Principles *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
