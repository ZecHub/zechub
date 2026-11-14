# Hachage et engagements : l'enveloppe scellée magique
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-15-0c16784b27.webp)

### Comment enfermer un secret en public sans jamais pouvoir mentir à son sujet

> **Série :** *Zcash à partir des principes fondamentaux* . **Article 3 . Hachage et engagements**
> **Public :** débutants. Nous nous appuyons sur l'[article 1 (corps finis)](article-1-finite-fields.md) et l'[article 2 (courbes elliptiques)](article-2-elliptic-curves.md), mais l'intuition se suffit à elle-même.
> **Ce que vous en retiendrez :** une compréhension claire des fonctions de hachage, de ce que signifient réellement « masquage » et « liaison », et de la manière dont Zcash construit les engagements de note qui ancrent chaque paiement privé.

Dans l'[article 0](article-0-shielded-transaction.md), nous avons décrit une « enveloppe scellée magique » : un objet que vous pouvez épingler sur un tableau public, qui prouve qu'une enveloppe existe tout en masquant son contenu, et que vous ne pourrez jamais remplacer par la suite. Nous avions promis d'expliquer comment une telle chose est possible. Voici cet article. Il nous faut deux ingrédients : les **fonctions de hachage** et les **engagements**.

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Imaginez que vous prédisiez le résultat d'une élection et que vous vouliez prouver, *après coup*, que vous l'aviez annoncé à l'avance. Vous ne pouvez pas simplement annoncer votre prédiction (cela influence les gens, ou vous expose à l'accusation de l'avoir modifiée). Et vous ne pouvez pas la garder entièrement secrète (vous ne pourriez alors rien prouver plus tard).

Ce que vous voulez, c'est un moyen de **verrouiller une valeur maintenant, en public, de sorte que :**

- personne ne puisse savoir ce que vous avez verrouillé (cela reste secret pour l'instant), et
- plus tard, lorsque vous la révélez, vous **ne puissiez pas mentir** sur ce qu'elle était.

Ce dispositif « verrouiller maintenant, révéler plus tard, sans mentir » s'appelle un **engagement**, et il est omniprésent dans Zcash. La valeur et le propriétaire d'une note sont verrouillés dans un engagement au moment même où la note est créée. Pour construire des engagements, il nous faut d'abord leur outil de base : la fonction de hachage.

---

## 2. L'intuition : une empreinte pour les données

Une **fonction de hachage** prend n'importe quelles données, une seule lettre comme une bibliothèque entière, et les réduit à une chaîne courte de taille fixe appelée **condensé** ou **haché**. Considérez-la comme une **empreinte digitale pour les données.**

![alt text](/content-images/image-16-52fdf62c87.webp)

Une bonne empreinte cryptographique possède quatre propriétés. Retenez-les comme des intuitions, pas comme des équations :

| Propriété | Signification simple | Pourquoi c'est important |
|---|---|---|
| **Déterministe** | La même entrée donne toujours la même empreinte | Vous pouvez revérifier une empreinte à tout moment |
| **Rapide dans le sens direct** | Le calcul de l'empreinte est rapide | Utilisable partout en pratique |
| **À sens unique (résistante à la préimage)** | À partir d'une empreinte, vous ne pouvez pas retrouver l'entrée qui l'a produite | Masque les données d'origine |
| **Résistante aux collisions** | Vous ne pouvez pas trouver deux entrées différentes ayant la même empreinte | Personne ne peut falsifier une correspondance |

Et un comportement supplémentaire qui rend les empreintes presque magiques :

### L'effet avalanche (vérifié)

Modifiez l'entrée de la plus infime quantité et l'empreinte change *complètement*, sans aucune ressemblance avec l'ancienne. Voici deux véritables empreintes SHA-256 de messages ne différant que d'un seul caractère :

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Sur 64 chiffres hexadécimaux, **59 sont différents.** Un caractère en entrée, une empreinte totalement différente en sortie. C'est pourquoi vous ne pouvez pas ajuster progressivement une entrée vers une empreinte cible : il n'existe aucun signal « tu chauffes / tu refroidis » à suivre.

---

## 3. De l'empreinte à l'engagement

Voici une idée séduisante mais erronée : pour vous engager sur une valeur secrète `v`, publiez simplement son empreinte `H(v)`.

Cela vous *lie* parfaitement (vous ne pouvez pas prétendre plus tard à une autre valeur `v`, car cela nécessiterait une collision). Mais cela **ne masque pas.** Si l'ensemble des valeurs possibles est petit, un attaquant calcule simplement l'empreinte de chaque candidat et compare. Vous vous engagez sur « oui » ou « non » ? Il hache les deux et apprend instantanément votre choix. Le déterminisme, notre allié d'il y a un instant, divulgue désormais le secret.

La solution tient en un mot : **l'aléa.**

> **Un engagement est l'empreinte de votre valeur mélangée à un nombre aléatoire frais :**
> `commitment = H(v, r)` où `r` est une valeur secrète aléatoire de « masquage ».

Désormais, la même valeur `v` produit à chaque fois un engagement d'apparence différente, car `r` est différent. Les deux propriétés recherchées sont enfin réunies :

![alt text](/content-images/image-17-3ec4617665.webp)

Pour **ouvrir** (révéler) l'engagement plus tard, vous publiez `v` et `r` ; n'importe qui recalcule `H(v, r)` et vérifie la correspondance. Vous êtes lié. Voilà l'enveloppe scellée magique de l'article 0, devenue réalité.

> **Deux leçons à retenir pour toujours :** la *liaison* provient de la résistance aux collisions du hachage ; le *masquage* provient du facteur de masquage aléatoire `r`.

---

## 4. Deux façons de construire l'enveloppe

Il existe deux recettes courantes, et Zcash utilise les deux.

| | **Engagement basé sur le hachage** | **Engagement de Pedersen** (de l'article 2) |
|---|---|---|
| Recette | `H(v, r)` | `v.G + r.H` (points sur une courbe) |
| Masquage grâce à | l'aléa `r` | l'aléa `r` |
| Liaison grâce à | la résistance aux collisions | la trappe des courbes elliptiques (ECDLP) |
| Pouvoir particulier | simple et rapide | les engagements **s'additionnent** (homomorphe) |

Cette dernière ligne explique pourquoi les engagements de Pedersen sont si importants dans Zcash. Puisque `commit(v_1) + commit(v_2)` est un `commit(v_1 + v_2)` valide, le protocole peut ensuite prouver que **l'argent entrant est égal à l'argent sortant** en additionnant les engagements, sans jamais révéler le moindre montant. Nous mettons ce fait de côté pour l'article 6.

---

## 5. Une subtilité qui façonne tout Zcash : le hachage adapté au ZK

Voici une idée que la plupart des introductions omettent, et c'est précisément le point « les mathématiques rencontrent l'ingénierie » qui mérite d'être souligné.

SHA-256 est une excellente empreinte pour l'informatique courante. Mais Zcash ne se contente pas de *calculer* des hachés ; il doit **prouver, à l'intérieur d'une preuve à divulgation nulle de connaissance, qu'un haché a été calculé correctement** (l'article 5 explique pourquoi). Et voici le problème : une preuve à divulgation nulle de connaissance s'exprime dans le langage de **l'arithmétique des corps finis** (article 1), alors que SHA-256 repose sur des manipulations de bits (décalages, AND, XOR). Exprimer toutes ces manipulations de bits en arithmétique de corps est extrêmement coûteux, ce qui rend les preuves énormes et lentes.

Les cryptographes de Zcash ont donc conçu des fonctions de hachage dont le fonctionnement interne relève *déjà* de l'arithmétique de corps, ce qui les rend peu coûteuses à prouver :

![alt text](/content-images/image-18-89ade807ad.webp)

Cette seule contrainte d'ingénierie, *« cela doit être peu coûteux à prouver »*, explique pourquoi Zcash a inventé et adopté des fonctions de hachage spéciales au lieu de recourir partout à SHA-256.

---

## 6. Où cela se trouve dans Zcash

Zcash a utilisé différents hachages au fil de ses conceptions, chacun choisi pour sa tâche :

| Conception | Hachages utilisés | Où |
|---|---|---|
| **Sprout** (la plus ancienne) | **SHA-256** | Engagements de note et arbre |
| **Sapling** | **Hachages de Pedersen**, plus **BLAKE2** | Pedersen pour les engagements de note et l'arbre Merkle ; BLAKE2 pour la dérivation des clés et les nullifiers |
| **Orchard** (actuelle) | **Sinsemilla**, plus **Poseidon** | Sinsemilla pour les engagements de note et l'arbre Merkle ; Poseidon pour le nullifier, tous conçus pour les circuits arithmétiques |

Les noms à retenir sont **Pedersen** et **Sinsemilla** (des hachages de type engagement construits à partir de points de courbe, qui héritent ainsi du superpouvoir « s'additionner » et se prouvent à moindre coût) et **Poseidon** (un hachage en arithmétique de corps conçu spécialement pour les circuits à divulgation nulle de connaissance). Lorsque l'article 0 indiquait que le contenu d'une note est scellé dans un engagement, c'est *ce* mécanisme qui assure le scellement.

La question laissée ouverte par l'article 0, *« comment une enveloppe scellée peut-elle masquer son contenu tout en étant impossible à falsifier ? »*, est donc désormais résolue : **le masquage grâce à un facteur de masquage aléatoire, la liaison grâce à la résistance aux collisions ou à la trappe de la courbe.**

---

## 7. Un avertissement honnête

Nous avons simplifié pour rester clairs. Les véritables schémas d'engagement spécifient précisément comment `v` et `r` sont encodés et quels générateurs sont utilisés ; le « masquage » et la « liaison » existent chacun en plusieurs variantes (parfaite ou calculatoire) avec des définitions de sécurité précises ; et nous n'avons pas montré le fonctionnement interne de Pedersen, Sinsemilla ou Poseidon. Rien de tout cela ne change l'intuition : un engagement est une empreinte plus de l'aléa, qui masque maintenant et lie pour toujours. Les détails reviendront, signalés, lorsque l'article sur le protocole en aura besoin.

---

## 8. Résumé

- Une **fonction de hachage** est une **empreinte pour les données** : déterministe, rapide dans le sens direct, à sens unique, résistante aux collisions, avec un **effet avalanche** (un bit en entrée, une empreinte totalement différente en sortie).
- Un **engagement** vous permet de **verrouiller une valeur en public maintenant et de la révéler plus tard sans pouvoir mentir.**
- Publier une simple empreinte `H(v)` lie mais ne masque **pas**. Ajouter un facteur de masquage aléatoire, `H(v, r)`, résout ce problème : **le masquage grâce à `r`, la liaison grâce à la résistance aux collisions.**
- Zcash utilise à la fois des engagements **basés sur le hachage** et des engagements de **Pedersen** ; les engagements de Pedersen ont en outre la propriété de **s'additionner**, ce que l'article 6 exploitera pour prouver l'équilibre des valeurs de manière privée.
- Comme les hachages doivent être **prouvés** à l'intérieur de preuves à divulgation nulle de connaissance, Zcash utilise des hachages **adaptés au ZK** construits à partir de l'arithmétique de corps (**Pedersen**, **Sinsemilla**, **Poseidon**) plutôt que SHA-256 partout.

---

## Glossaire

| Terme | Signification simple |
|---|---|
| **Hash function** | Réduit n'importe quelles données en une empreinte courte de taille fixe (condensé) |
| **Digest** | L'empreinte produite en sortie par une fonction de hachage |
| **Preimage resistance** | Impossible de remonter d'un condensé à son entrée (sens unique) |
| **Collision resistance** | Impossible de trouver deux entrées ayant le même condensé |
| **Avalanche effect** | Une infime modification de l'entrée change complètement le condensé |
| **Commitment** | Verrouiller une valeur maintenant, la révéler plus tard, sans pouvoir mentir à son sujet |
| **Blinding factor (`r`)** | Le nombre aléatoire frais qui permet à un engagement de masquer |
| **ZK-friendly hash** | Un hachage construit à partir de l'arithmétique de corps pour être peu coûteux à prouver |

---

## FAQ

**Pourquoi ne pas simplement chiffrer la valeur au lieu de s'engager sur elle ?**
Le chiffrement concerne *un secret que l'on peut déchiffrer plus tard*. Un engagement concerne la *liaison* : la garantie que vous ne pourrez pas changer votre réponse plus tard. Ce sont deux tâches différentes.

**Si les engagements masquent la valeur, comment vérifie-t-on le respect des règles ?**
C'est le rôle des preuves à divulgation nulle de connaissance (article 5) : elles prouvent que la valeur masquée respecte les règles sans la révéler.

**SHA-256 est-il cassé, puisque Zcash l'évite à certains endroits ?**
Non. SHA-256 est fiable et Zcash l'utilise encore. Il est simplement coûteux à *prouver à l'intérieur d'un circuit*, c'est pourquoi les hachages adaptés au ZK existent pour cette tâche précise.

**D'où vient l'aléa `r`, et qui le conserve ?**
Il est généré à neuf lors de la création de la note et connu du propriétaire de la note. Il contribue à rendre chaque note unique et privée.

---

### Testez votre intuition

Vous vous engagez sur votre prédiction électorale sous la forme `H(v, r)` et la publiez. Un ami insiste pour que vous publiiez simplement `H(v)`, par souci de simplicité. En une phrase, pourquoi est-ce une mauvaise idée s'il n'y a que deux résultats possibles ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Avec seulement deux résultats, votre ami peut simplement calculer lui-même `H("win")` et `H("lose")` et les comparer au condensé que vous avez publié, découvrant instantanément votre prédiction. Le haché seul lie mais ne masque pas ; c'est l'aléa `r` qui empêche cette attaque par essais successifs.
</details>

---

### La suite

**Article 4 . Les arbres de Merkle :** des millions d'engagements s'accumulent désormais. L'article 4 montre comment Zcash les organise en un arbre unique dont la minuscule empreinte racine représente l'historique entier, et comment vous pouvez prouver que votre note se trouve dans cet arbre sans révéler laquelle. C'est la véritable forme du « tableau public » de l'article 0.

*Fait partie de la série* Zcash à partir des principes fondamentaux *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
