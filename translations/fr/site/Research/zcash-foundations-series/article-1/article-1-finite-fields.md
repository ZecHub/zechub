# Corps finis : le système de nombres dans lequel vit la cryptographie
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-5-6e8a8950f8.webp)

### Pourquoi le « retour au début » est le fondement secret de Zcash

> **Série :** *Zcash à partir des principes fondamentaux* . **Article 1 . Corps finis**
> **Public :** débutants. Nous supposons seulement une connaissance de l'arithmétique scolaire ordinaire (addition, multiplication, division). Aucune connaissance préalable en cryptographie ou en mathématiques avancées n'est requise.
> **Ce que vous en retiendrez :** une compréhension intuitive et correcte des corps finis, des raisons pour lesquelles les cryptographes les utilisent et des endroits où ils apparaissent dans Zcash.

Dans l'[article 0](article-0-shielded-transaction.md), nous avons rencontré cinq personnages : la note, l'engagement, l'arbre des engagements de notes, le nullifier et la preuve à divulgation nulle de connaissance. Nous avons laissé une question en suspens : *d'où viennent réellement toutes les clés et les recettes secrètes ?* Elles viennent des nombres. Mais pas des nombres ordinaires avec lesquels vous avez grandi. Elles viennent d'un système de nombres particulier et autonome appelé **corps fini**, et presque toute la cryptographie de Zcash repose sur lui.

Cet article construit cette idée pas à pas. Comme promis, l'intuition d'abord. Aucune formule tant qu'elle n'est pas vraiment utile.

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Les nombres ordinaires posent un problème à la cryptographie : il en existe une infinité, et ils divulguent des informations.

Pensez à ce qui se passe lorsqu'un nombre devient *plus grand*. Si je vous dis qu'un calcul secret a produit `8,142,067`, vous en savez déjà beaucoup : c'est un nombre à sept chiffres, il est impair, il est « assez grand ». La taille est un indice. Et les indices sont précisément ce qu'un système de confidentialité ne peut pas se permettre de divulguer.

La cryptographie veut un système de nombres dans lequel :

- il existe un **nombre fini** de valeurs, de sorte qu'un ordinateur peut stocker n'importe laquelle d'entre elles exactement, sans arrondi ni dépassement de capacité,
- les valeurs **ne divulguent pas leur taille**, car le système n'a pas de véritable notion de « plus grand »,
- vous pouvez toujours **additionner, soustraire, multiplier et diviser** librement et de manière réversible, car les recettes cryptographiques ont besoin d'une véritable algèbre pour fonctionner, et
- l'espace peut être rendu **astronomiquement grand**, de sorte que deviner est sans espoir.

Cette liste de souhaits a un nom. C'est un **corps fini**. Construisons l'intuition avant d'écrire le moindre symbole.

---

## 2. L'intuition : une horloge

Vous utilisez déjà un corps fini tous les jours. C'est l'horloge accrochée à votre mur.

Sur une horloge de 12 heures, les nombres *reviennent au début*. Partez de 10 heures, ajoutez 5 heures, et vous n'arrivez pas à « 15 heures », vous arrivez à **3 heures**. L'horloge n'a que douze positions, et compter au-delà du sommet vous ramène simplement au départ.

![alt text](/content-images/image-9-30b39f4cc5.webp)

Trois choses viennent de se produire, et elles sont tout l'intérêt de cet article :

1. **Le monde est fini.** Il y a exactement douze positions, quelle que soit la durée pendant laquelle vous comptez.
2. **L'addition fonctionne toujours.** Vous pouvez ajouter des heures toute la journée ; vous tombez toujours sur une position valide de l'horloge.
3. **La taille ne compte plus.** « 3 heures » ne vous dit pas si vous avez compté 3 heures, 15 ou 27. Le retour au début *a effacé l'information de taille.* Cet effacement est précisément la propriété favorable à la confidentialité que nous recherchions.

Cette arithmétique cyclique porte un nom formel : l'**arithmétique modulaire**. L'horloge fonctionne « modulo 12 », noté **mod 12**. Les mathématiciens préfèrent compter les positions à partir de 0, si bien qu'une « horloge mod 12 » a en réalité les positions `0, 1, 2, ..., 11`. Une horloge mod 7 aurait les positions `0` à `6`.

> **La seule règle :** pour calculer quoi que ce soit « mod p », effectuez l'arithmétique ordinaire, puis divisez par `p` et ne gardez que le reste.
> Exemple mod 7 : `5 + 4 = 9`, et `9` donne un reste de `2` après division par `7`, donc `5 + 4 = 2 (mod 7)`.

---

## 3. De l'horloge au corps

Une horloge nous permet d'additionner. Un **corps** en est la version améliorée : un système de nombres dans lequel les quatre opérations fonctionnent correctement, y compris la plus délicate, la division.

De manière informelle, un **corps** est un ensemble de « nombres » dans lequel vous pouvez **additionner, soustraire, multiplier et diviser** (par tout sauf zéro), et toutes les règles familières restent valables : l'ordre n'a pas d'importance pour l'addition ou la multiplication, les parenthèses peuvent être regroupées autrement, il existe un `0` et un `1`, et chaque nombre possède un opposé et (sauf `0`) un inverse.

Les nombres rationnels forment un corps. Les nombres réels forment un corps. Ce que nous voulons, c'est un corps *fini*.

Voici le résultat principal, et il est magnifique :

> **Prenez les nombres entiers `0, 1, ..., p-1` et effectuez toute l'arithmétique mod `p`. Si `p` est un nombre premier, le résultat est un corps fini.** On le note `F_p` (lu « F indice p »).

Ainsi, `F_7 = {0, 1, 2, 3, 4, 5, 6}` muni de l'arithmétique d'horloge mod 7 est un véritable corps fini. Regardons-le vivre.

### Multiplication dans F_7 (vérifiée)

Chaque case vaut `(row x column) mod 7` :

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Regardez les lignes de `1` à `6` : chacune contient chaque valeur non nulle `1..6` exactement une fois. Ce motif « aucune répétition, rien ne manque » est l'empreinte visible d'un corps.

### La division : la magie qui exige un nombre premier

Diviser, c'est simplement « multiplier par l'inverse ». Dans `F_7`, l'inverse d'un nombre `a` est la valeur `a^(-1)` pour laquelle `a x a^(-1) = 1`. En les lisant directement dans le tableau :

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Vérifiez-en un : `2 x 4 = 8 = 1 (mod 7)`.  Ainsi, « diviser par 2 » dans `F_7` signifie « multiplier par 4 ». Chaque élément non nul a un partenaire. **C'est ce qui fait de `F_7` un corps.**

---

## 4. Pourquoi le module doit être premier

C'est l'idée la plus importante de l'article ; rendons-la donc concrète plutôt qu'abstraite.

Observez ce qui se casse si nous essayons naïvement de construire un « corps » mod `6` (et `6` n'est *pas* premier) :

> Existe-t-il un `x` tel que `2 x x = 1 (mod 6)` ? En les vérifiant tous : `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **La réponse `1` n'apparaît jamais.** Donc `2` n'a pas d'inverse mod 6. Pire encore, `2 x 3 = 6 = 0 (mod 6)` : deux nombres non nuls dont le produit donne zéro.

Cette deuxième phrase est une catastrophe pour l'arithmétique. Deux éléments non nuls dont le produit est zéro (appelés **diviseurs de zéro**) signifient que la division est cassée, et un système dont la division est cassée n'est pas un corps. Cela se produit précisément parce que `6` se factorise en `2 x 3`.

Un nombre premier, par définition, n'a pas de tels facteurs. Ainsi, modulo un nombre premier, aucun diviseur de zéro ne peut apparaître, chaque élément non nul obtient un inverse propre, et la structure est un véritable corps.

![alt text](/content-images/image-8-573914db92.webp)

> **Formule réutilisable pour vos articles :** *module premier en entrée, division propre en sortie.*

---

## 5. La seule formule qui vaille la peine : comment les ordinateurs trouvent les inverses

Nous avons lu les inverses dans un tableau pour `F_7`, mais le nombre premier de Zcash compte des centaines de chiffres ; aucun tableau n'est possible. Il existe un raccourci classique, et c'est la seule formule de cet article.

Le **petit théorème de Fermat** affirme que, pour un nombre premier `p` et tout `a` non nul :

```
a^(p-1) = 1   (mod p)
```

Réarrangez-le (détachez un facteur `a`) et vous obtenez l'inverse gratuitement :

```
a^(-1) = a^(p-2)   (mod p)
```

Testez dans `F_7` (`p = 7`, donc `p - 2 = 5`) : l'inverse de `2` devrait être `2^5 = 32 = 4 (mod 7)`. Et en effet, notre tableau indiquait `2^(-1) = 4`.  Les ordinateurs élèvent à de grandes puissances extrêmement rapidement, ce qui transforme « trouver l'inverse » en un calcul rapide et exact, même pour des nombres premiers gigantesques.

Vous n'avez pas besoin de mémoriser cela. Vous devez savoir que **la division dans un corps fini est une opération rapide et exacte**, et c'est exactement pour cela que les cryptographes sont heureux de bâtir dessus.

---

## 6. Pourquoi la cryptographie est tombée amoureuse des corps finis

En rassemblant l'intuition, voici tout l'argumentaire sur une seule page.

| Propriété de `F_p` | Pourquoi un système de confidentialité la recherche |
|---|---|
| **Fini** | Un ordinateur stocke n'importe quel élément exactement ; pas d'arrondi, pas de dépassement de capacité, pas d'imprécision liée à la virgule flottante |
| **Retour au début** | Efface la « taille », de sorte qu'une valeur ne divulgue rien sur la manière dont elle a été produite |
| **Les quatre opérations fonctionnent** | Les recettes cryptographiques (clés, engagements, preuves) ont besoin d'une véritable algèbre, pas seulement de compter |
| **Taille au choix** | Choisissez un nombre premier de 255 ou 381 bits et le corps contient plus d'éléments qu'il n'y a d'atomes dans l'univers observable ; deviner est sans espoir |
| **Exact et déterministe** | Deux parties honnêtes qui calculent la même chose obtiennent toujours des résultats identiques, ce dont dépendent les preuves |

Un corps fini est, en une phrase, **un terrain de jeu pour l'arithmétique parfaitement clos, parfaitement exact et parfaitement immense.** Tout le reste de Zcash est construit en jouant à l'intérieur.

---

## 7. Où cela se trouve dans Zcash

Vous n'êtes pas obligé de croire sur parole que « Zcash utilise des corps finis ». Voici la carte concrète (la mécanique plus profonde sera traitée dans de prochains articles ; il s'agit simplement de montrer que les empreintes sont réelles).

- **Sapling** (une conception protégée plus ancienne) construit ses preuves sur une courbe appelée **BLS12-381**, dont le corps de base utilise un nombre premier long de **381 bits**. Chaque coordonnée, clé et élément de preuve est un élément d'un corps fini construit sur ce nombre premier.
- **Orchard** (la conception protégée actuelle) utilise une paire de courbes appelées **Pallas et Vesta** (les courbes « Pasta »), dont les corps utilisent des nombres premiers d'environ **255 bits**.
- L'**engagement de note**, le **nullifier** et les nombres contenus dans une **preuve à divulgation nulle de connaissance** de l'article 0 sont tous, au fond, des éléments de l'un de ces corps finis. Lorsque le protocole dit « calculez cet engagement », il signifie « effectuez cette arithmétique modulo ce nombre premier ».

![alt text](/content-images/image-7-c81fe982f0.webp)

Ainsi, la réponse à la question laissée ouverte par l'article 0, *« d'où viennent les recettes secrètes ? »*, commence ici : **tout commence par de l'arithmétique dans un corps fini.** Dans le prochain article, nous prendrons ce corps et construirons les véritables objets, des points sur une courbe elliptique, qui deviennent des clés et des engagements.

---

## 8. Un avertissement honnête

Pour rester accessibles aux débutants, nous avons simplifié quelques vérités. Les corps finis n'existent pas uniquement sous la forme `F_p` ; vous pouvez aussi construire des corps à `p^n` éléments (appelés **extensions de corps**), et ceux-ci comptent pour les « couplages » sur lesquels repose le système de preuves de Sapling. Nous avons également omis la liste complète des axiomes de corps et survolé la manière dont des nombres premiers de cette taille sont choisis et validés. Rien de tout cela ne change l'intuition que vous avez désormais ; cela l'affine. Nous rétablirons la précision, en le signalant, lorsqu'un prochain article en aura besoin.

---

## 9. Résumé

- La cryptographie a besoin d'un système de nombres **fini, exact, aveugle à la taille, entièrement inversible et immense.** Ce système est un **corps fini**.
- L'intuition est une **horloge** : une arithmétique qui **revient au début** (arithmétique modulaire), ce qui efface commodément la « taille » d'un nombre.
- Effectuer l'arithmétique avec les nombres `0..p-1` modulo un nombre **premier** `p` donne un véritable corps `F_p`, dans lequel vous pouvez aussi **diviser**, car chaque élément non nul possède un inverse.
- Le module **doit être premier** : un module composé crée des diviseurs de zéro (comme `2 x 3 = 0 mod 6`) et casse la division.
- Les ordinateurs trouvent rapidement les inverses grâce au **petit théorème de Fermat** (`a^(-1) = a^(p-2)`).
- Dans **Zcash**, chaque clé, engagement, nullifier et élément de preuve est en fin de compte un élément d'un grand corps fini (corps Pasta de 255 bits pour Orchard, un corps de 381 bits pour la BLS12-381 de Sapling).

---

## Glossaire

| Terme | Signification en langage simple |
|---|---|
| **Modular arithmetic** | Arithmétique qui revient au début après avoir atteint une valeur fixe, comme une horloge |
| **mod p** | « Divisez par `p` et gardez le reste » |
| **Field** | Un système de nombres dans lequel l'addition, la soustraction, la multiplication et la division fonctionnent toutes |
| **Finite field `F_p`** | Les nombres `0..p-1` avec une arithmétique effectuée modulo un nombre premier `p` |
| **Inverse (reciprocal)** | L'élément `a^(-1)` tel que `a x a^(-1) = 1` ; « diviser par `a` » signifie multiplier par lui |
| **Zero divisor** | Deux valeurs non nulles dont le produit est zéro ; ce qui ruine les modules composés |
| **Prime** | Un nombre entier supérieur à 1 qui n'a pas d'autres diviseurs que 1 et lui-même |

---

## FAQ

**Pourquoi ne pas simplement utiliser des entiers ordinaires ou des nombres décimaux ?**
Les nombres décimaux s'arrondissent et dérivent ; les entiers croissent sans limite et divulguent leur taille. Les corps finis sont exacts, bornés et aveugles à la taille, ce qu'exige la cryptographie.

**Le « retour au début » fait-il perdre de l'information ?**
Oui, volontairement. Effacer la taille des valeurs intermédiaires est une fonctionnalité, et non un défaut, pour la confidentialité.

**Un nombre premier plus grand est-il toujours plus sûr ?**
En gros, un corps plus grand signifie davantage de valeurs possibles et une devinette plus difficile, mais la sécurité dépend de l'ensemble de la construction, et pas uniquement de la taille du corps. De prochains articles préciseront ce point.

**Pourquoi ces nombres premiers précis (255 bits, 381 bits) dans Zcash ?**
Ils sont choisis pour que les courbes construites dessus aient la bonne structure et l'efficacité requise pour le système de preuves. Cette « bonne structure » est le sujet des deux prochains articles.

---

### Testez votre intuition

Dans `F_7`, combien vaut `5 - 6` ? (Rappel : restez dans `{0,...,6}` en revenant au début.) *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

`5 - 6 = -1`, et `-1` ramené dans `F_7` donne `6` (car `6 + 1 = 7 = 0`). Donc `5 - 6 = 6 (mod 7)`. La soustraction ne quitte jamais le corps ; elle revient simplement au début dans l'autre sens.
</details>

---

### Et ensuite

**Article 2 . Courbes elliptiques :** nous prenons le corps fini que nous venons de construire et l'utilisons pour tracer un type étrange de courbe dont les points peuvent être « additionnés ». Ces points deviennent les clés et les engagements de Zcash, et ils cachent une trappe à sens unique qui rend possible tout le système de confidentialité. L'intuition d'abord, comme toujours.

*Fait partie de la série* Zcash à partir des principes fondamentaux *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
