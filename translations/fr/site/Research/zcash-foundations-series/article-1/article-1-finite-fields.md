# Corps finis : le système de nombres dans lequel vit la cryptographie
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![texte alternatif](image-5.png)

### Pourquoi le « bouclage » est le fondement secret de Zcash

> **Série :** *Zcash from First Principles* . **Article 1 . Corps finis**
> **Public :** débutants. Nous supposons seulement l'arithmétique scolaire ordinaire (additionner, multiplier, diviser). Aucune connaissance préalable en cryptographie ou en mathématiques supérieures.
> **Ce que vous en retirerez :** une compréhension intuitive et correcte des corps finis, de la raison pour laquelle les cryptographes les utilisent, et de l'endroit où ils apparaissent dans Zcash.

Dans l'[Article 0](article-0-shielded-transaction.md), nous avons rencontré cinq personnages : la note, l'engagement, l'arbre des engagements de note, le nullifier et la preuve à divulgation nulle de connaissance. Nous avions laissé une question en suspens : *d'où viennent réellement toutes les clés et les recettes secrètes ?* Elles viennent des nombres. Mais pas des nombres ordinaires avec lesquels vous avez grandi. Elles viennent d'un système de nombres spécial et autonome appelé **corps fini**, et presque chaque élément de la cryptographie dans Zcash est construit par-dessus.

Cet article vous amène à cette idée progressivement. Comme promis, l'intuition d'abord. Aucune formule avant qu'elle ne soit vraiment utile.

---

## 1. Pourquoi devriez-vous vous y intéresser ?

Les nombres ordinaires ont un problème pour la cryptographie : ils sont en quantité infinie, et ils laissent fuiter de l'information.

Réfléchissez à ce qui se passe lorsqu'un nombre devient *plus grand*. Si je vous dis qu'un calcul secret a produit `8,142,067`, vous savez déjà beaucoup de choses : c'est un nombre à sept chiffres, il est impair, il est « assez grand ». La taille est un indice. Et les indices sont exactement ce qu'un système de confidentialité ne peut pas se permettre de révéler.

La cryptographie veut un système de nombres où :

- il y a un nombre **fini** de valeurs, afin qu'un ordinateur puisse toutes les stocker exactement, sans arrondi ni dépassement,
- les valeurs **ne révèlent pas leur taille**, parce que le système n'a pas de véritable notion de « plus grand »,
- vous pouvez quand même **additionner, soustraire, multiplier et diviser** librement et de manière réversible, parce que les recettes cryptographiques ont besoin d'une vraie algèbre pour fonctionner, et
- l'espace peut être rendu **astronomiquement grand**, de sorte que deviner soit sans espoir.

Cette liste de souhaits a un nom. C'est un **corps fini**. Construisons-en l'intuition avant d'écrire le moindre symbole.

---

## 2. L'intuition : une horloge

Vous utilisez déjà un corps fini tous les jours. C'est l'horloge sur votre mur.

Sur une horloge de 12 heures, les nombres *reviennent au début*. Commencez à 10 heures, ajoutez 5 heures, et vous n'arrivez pas à « 15 heures », vous arrivez à **3 heures**. L'horloge n'a que douze positions, et compter au-delà du sommet vous ramène simplement au départ.

![texte alternatif](image-9.png)

Trois choses viennent de se produire, et elles résument tout le propos de cet article :

1. **Le monde est fini.** Il y a exactement douze positions, quelle que soit la durée de votre comptage.
2. **L'addition fonctionne toujours.** Vous pouvez ajouter des heures toute la journée ; vous arriverez toujours sur une position valide de l'horloge.
3. **La taille a cessé d'importer.** « 3 heures » ne dit pas si vous avez compté 3 heures, 15 heures ou 27 heures. Le bouclage *a effacé l'information de taille.* Cet effacement est précisément la propriété favorable à la confidentialité que nous recherchions.

Cette arithmétique à bouclage a un nom formel : **l'arithmétique modulaire**. L'horloge fonctionne « modulo 12 », ce qu'on écrit **mod 12**. Les mathématiciens préfèrent compter les positions à partir de 0, donc une « horloge mod 12 » a en réalité les positions `0, 1, 2, ..., 11`. Une horloge mod 7 aurait les positions `0` à `6`.

> **La seule règle :** pour calculer quoi que ce soit « mod p », faites l'arithmétique ordinaire, puis divisez par `p` et ne gardez que le reste.
> Exemple en mod 7 : `5 + 4 = 9`, et `9` laisse le reste `2` après division par `7`, donc `5 + 4 = 2 (mod 7)`.

---

## 3. D'une horloge à un corps

Une horloge nous permet d'additionner. Un **corps** est la version améliorée : un système de nombres où les quatre opérations fonctionnent, y compris la plus délicate, la division.

De manière informelle, un **corps** est toute collection de « nombres » où l'on peut **additionner, soustraire, multiplier et diviser** (par tout sauf zéro), et où toutes les règles familières restent valables : l'ordre n'a pas d'importance pour l'addition ou la multiplication, les parenthèses peuvent être regroupées autrement, il existe un `0` et un `1`, et chaque nombre possède un opposé et (sauf `0`) un inverse.

Les nombres rationnels forment un corps. Les nombres réels forment un corps. Ce que nous voulons, c'est un corps *fini*.

Voici le résultat principal, et il est magnifique :

> **Prenez les nombres entiers `0, 1, ..., p-1` et faites toute l'arithmétique mod `p`. Si `p` est un nombre premier, le résultat est un corps fini.** On l'écrit `F_p` (lire « F indice p »).

Ainsi `F_7 = {0, 1, 2, 3, 4, 5, 6}` avec une arithmétique de type horloge mod 7 est un véritable corps fini. Regardons-le vivre.

### Multiplication dans F_7 (vérifiée)

Chaque case est `(ligne x colonne) mod 7` :

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Regardez les lignes pour `1` à `6` : chacune contient chaque valeur non nulle `1..6` exactement une fois. Ce motif « pas de répétitions, rien ne manque » est la signature visible d'un corps.

### Division : la magie qui exige un nombre premier

Diviser, c'est simplement « multiplier par l'inverse ». Dans `F_7`, l'inverse (ou **réciproque**) d'un nombre `a` est la valeur `a^(-1)` telle que `a x a^(-1) = 1`. En les lisant directement dans le tableau :

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Vérifiez-en un : `2 x 4 = 8 = 1 (mod 7)`. Donc « diviser par 2 » dans `F_7` signifie « multiplier par 4 ». Chaque élément non nul a son partenaire. **C'est ce qui fait de `F_7` un corps.**

---

## 4. Pourquoi le modulo doit être premier

C'est l'idée la plus importante de l'article, alors rendons-la concrète plutôt qu'abstraite.

Regardez ce qui se casse si nous essayons naïvement de construire un « corps » mod `6` (et `6` n'est *pas* premier) :

> Existe-t-il un `x` tel que `2 x x = 1 (mod 6)` ? En les vérifiant tous : `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **La réponse `1` n'apparaît jamais.** Donc `2` n'a pas d'inverse mod 6. Pire encore, `2 x 3 = 6 = 0 (mod 6)` : deux nombres non nuls se sont multipliés pour donner zéro.

Cette deuxième phrase est une catastrophe pour l'arithmétique. Deux choses non nulles qui se multiplient pour donner zéro (ce qu'on appelle un **diviseur de zéro**) signifient que la division est cassée, et un système où la division est cassée n'est pas un corps. Cela se produit précisément parce que `6` se factorise en `2 x 3`.

Un nombre premier, par définition, n'a pas de tels facteurs. Donc modulo un nombre premier, aucun diviseur de zéro ne peut apparaître, chaque élément non nul obtient un inverse propre, et la structure est un véritable corps.

![texte alternatif](image-8.png)

> **Formule réutilisable en une ligne pour vos articles :** *modulo premier en entrée, division propre en sortie.*

---

## 5. La seule formule qui mérite d'être connue : comment les ordinateurs trouvent les inverses

Nous avons lu les inverses dans un tableau pour `F_7`, mais le nombre premier de Zcash a des centaines de chiffres ; aucun tableau n'est possible. Il existe un raccourci classique, et c'est la seule formule de cet article.

**Le petit théorème de Fermat** dit que pour un nombre premier `p` et tout `a` non nul :

```
a^(p-1) = 1   (mod p)
```

Réarrangez-le (retirez un facteur de `a`) et vous obtenez l'inverse gratuitement :

```
a^(-1) = a^(p-2)   (mod p)
```

Testons dans `F_7` (`p = 7`, donc `p - 2 = 5`) : l'inverse de `2` devrait être `2^5 = 32 = 4 (mod 7)`. Et en effet, notre tableau disait `2^(-1) = 4`. Les ordinateurs élèvent à de grandes puissances extrêmement vite, donc cela transforme « trouver la réciproque » en un calcul rapide et exact, même pour des nombres premiers gigantesques.

Vous n'avez pas besoin de mémoriser cela. Vous devez savoir que **la division dans un corps fini est une opération rapide et exacte**, ce qui est précisément la raison pour laquelle les cryptographes sont heureux de bâtir dessus.

---

## 6. Pourquoi la cryptographie est tombée amoureuse des corps finis

En réunissant l'intuition, voici tout l'argument sur une seule page.

| Propriété de `F_p` | Pourquoi un système de confidentialité en a besoin |
|---|---|
| **Fini** | Un ordinateur stocke n'importe quel élément exactement ; pas d'arrondi, pas de dépassement, pas de flou lié aux nombres à virgule flottante |
| **Bouclage** | Efface la « taille », donc une valeur ne révèle rien sur la manière dont elle a été produite |
| **Les quatre opérations fonctionnent** | Les recettes cryptographiques (clés, engagements, preuves) ont besoin d'une vraie algèbre, pas seulement de comptage |
| **Taille choisissable** | Choisissez un nombre premier de 255 bits ou 381 bits et le corps contient plus d'éléments qu'il n'y a d'atomes dans l'univers observable ; deviner est sans espoir |
| **Exact et déterministe** | Deux parties honnêtes qui calculent la même chose obtiennent toujours des résultats identiques, ce dont dépendent les preuves |

Un corps fini est, en une phrase, **un terrain de jeu parfaitement fermé, parfaitement exact et parfaitement immense pour l'arithmétique.** Tout le reste dans Zcash est construit en jouant à l'intérieur.

---

## 7. Où cela se trouve dans Zcash

Vous n'avez pas à croire sur parole que « Zcash utilise des corps finis ». Voici la carte concrète (la mécanique plus profonde viendra dans de prochains articles ; ici, il s'agit seulement de montrer que les empreintes sont réelles).

- **Sapling** (une ancienne conception blindée) construit ses preuves sur une courbe appelée **BLS12-381**, dont le corps de base utilise un nombre premier de **381 bits**. Chaque coordonnée, clé et élément de preuve est un élément d'un corps fini construit sur ce nombre premier.
- **Orchard** (la conception blindée actuelle) utilise une paire de courbes appelée **Pallas et Vesta** (les courbes « Pasta »), dont les corps utilisent des nombres premiers d'environ **255 bits**.
- L'**engagement de note**, le **nullifier** et les nombres à l'intérieur d'une **preuve à divulgation nulle de connaissance** de l'Article 0 sont tous, fondamentalement, des éléments de l'un de ces corps finis. Quand le protocole dit « calculez cet engagement », cela signifie « faites cette arithmétique modulo ce nombre premier ».

![texte alternatif](image-7.png)

Donc la réponse à la question ouverte de l'Article 0, *« d'où viennent les recettes secrètes ? »*, commence ici : **tout commence comme une arithmétique dans un corps fini.** Dans l'article suivant, nous prendrons ce corps et construirons les objets réels, des points sur une courbe elliptique, qui deviennent des clés et des engagements.

---

## 8. Un avertissement honnête

Pour rester accessible aux débutants, nous avons simplifié quelques vérités. Les corps finis n'existent pas seulement sous la forme `F_p` ; on peut aussi construire des corps avec `p^n` éléments (appelés **corps d'extension**), et ceux-ci comptent pour les « pairings » dont dépend le système de preuve de Sapling. Nous avons aussi laissé de côté la liste complète des axiomes des corps et passé rapidement sur la façon dont des nombres premiers de cette taille sont choisis et validés. Rien de tout cela ne change l'intuition que vous avez maintenant ; cela la précise. Nous réintroduirons cette précision, avec des avertissements, lorsqu'un article ultérieur en aura besoin.

---

## 9. Résumé

- La cryptographie a besoin d'un système de nombres qui soit **fini, exact, aveugle à la taille, entièrement inversible et immense.** Ce système est un **corps fini**.
- L'intuition est celle d'une **horloge** : une arithmétique qui **revient au début** (arithmétique modulaire), ce qui efface commodément la « taille » d'un nombre.
- Faire de l'arithmétique avec les nombres `0..p-1` modulo un nombre **premier** `p` donne un vrai corps `F_p`, dans lequel on peut aussi **diviser** parce que chaque élément non nul possède un inverse.
- Le modulo **doit être premier** : un modulo composé crée des diviseurs de zéro (comme `2 x 3 = 0 mod 6`) et casse la division.
- Les ordinateurs trouvent rapidement les inverses grâce au **petit théorème de Fermat** (`a^(-1) = a^(p-2)`).
- Dans **Zcash**, chaque clé, engagement, nullifier et élément de preuve est ultimement un élément d'un grand corps fini (les corps Pasta de 255 bits pour Orchard, un corps de 381 bits pour le BLS12-381 de Sapling).

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Arithmétique modulaire** | Une arithmétique qui revient au début après avoir atteint une valeur fixe, comme une horloge |
| **mod p** | « Divisez par `p` et gardez le reste » |
| **Corps** | Un système de nombres dans lequel l'addition, la soustraction, la multiplication et la division fonctionnent toutes |
| **Corps fini `F_p`** | Les nombres `0..p-1` avec une arithmétique effectuée modulo un nombre premier `p` |
| **Inverse (réciproque)** | L'élément `a^(-1)` tel que `a x a^(-1) = 1` ; « diviser par `a` » signifie multiplier par lui |
| **Diviseur de zéro** | Deux valeurs non nulles dont le produit est zéro ; la chose qui ruine les modulos composés |
| **Premier** | Un nombre entier supérieur à 1 qui n'a pas d'autres facteurs que 1 et lui-même |

---

## FAQ

**Pourquoi ne pas simplement utiliser des entiers ordinaires ou des décimaux ?**
Les décimaux s'arrondissent et dérivent ; les entiers croissent sans borne et révèlent leur taille. Les corps finis sont exacts, bornés et aveugles à la taille, ce qu'exige la cryptographie.

**Est-ce que « revenir au début » fait perdre de l'information ?**
Oui, volontairement. Effacer la taille des valeurs intermédiaires est une fonctionnalité, pas un bug, pour la confidentialité.

**Un nombre premier plus grand est-il toujours plus sûr ?**
En gros, un corps plus grand signifie plus de valeurs possibles et une recherche par essai plus difficile, mais la sécurité dépend de toute la construction, pas seulement de la taille du corps. Les articles suivants préciseront cela.

**Pourquoi ces nombres premiers précis (255 bits, 381 bits) dans Zcash ?**
Ils sont choisis pour que les courbes construites dessus aient la bonne structure et la bonne efficacité pour le système de preuve. Cette « bonne structure » est le sujet des deux prochains articles.

---

### Testez votre intuition

Dans `F_7`, que vaut `5 - 6` ? (Rappelez-vous : restez à l'intérieur de `{0,...,6}` en revenant au début.) *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

`5 - 6 = -1`, et `-1` ramené dans `F_7` vaut `6` (parce que `6 + 1 = 7 = 0`). Donc `5 - 6 = 6 (mod 7)`. La soustraction ne sort jamais du corps ; elle boucle simplement dans l'autre sens.
</details>

---

### Et ensuite

**Article 2 . Courbes elliptiques :** nous prenons le corps fini que nous venons de construire et l'utilisons pour tracer un type étrange de courbe dont les points peuvent être « additionnés » entre eux. Ces points deviennent les clés et les engagements de Zcash, et ils cachent une trappe à sens unique qui rend tout le système de confidentialité possible. L'intuition d'abord, comme toujours.

*Fait partie de la série* Zcash from First Principles *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
