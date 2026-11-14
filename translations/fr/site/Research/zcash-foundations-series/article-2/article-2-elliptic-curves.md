# Courbes elliptiques : là où naissent les clés et les engagements de Zcash
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-10-c1097b22d7.webp)

### Une rue à sens unique construite à partir des points d’une courbe

> **Série :** *Zcash à partir des premiers principes* . **Article 2 . Courbes elliptiques**
> **Public :** débutants. Nous supposons seulement connu l’[Article 1 (corps finis)](article-1-finite-fields.md) : une arithmétique qui « boucle » modulo un nombre premier. Aucune autre connaissance préalable n’est nécessaire.
> **Ce que vous en retiendrez :** une image intuitive et correcte des courbes elliptiques, de la « trappe » qui les rend utiles, et de la manière exacte dont Zcash les transforme en clés et en engagements.

L’[Article 1](article-1-finite-fields.md) nous a offert un terrain de jeu parfait pour l’arithmétique : le corps fini. Mais un corps, à lui seul, n’est qu’un ensemble de nombres. Pour construire des clés et les « enveloppes scellées » de l’[Article 0](article-0-shielded-transaction.md), Zcash a besoin d’un objet doté d’un type de difficulté particulier, à sens unique : facile à calculer dans un sens, pratiquement impossible à inverser. Cet objet est une **courbe elliptique**. Cet article la construit à partir de zéro, l’intuition avant l’algèbre.

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Tout système de confidentialité a besoin d’une **rue à sens unique** : une opération triviale à effectuer dans un sens et en pratique impossible à parcourir en sens inverse.

Voici pourquoi. Votre **clé secrète** est un nombre que vous gardez caché. Votre **clé publique** (et votre adresse) en est dérivée et montrée au monde entier. Toute la sécurité du système repose sur un seul fait : *à partir de la clé publique, personne ne peut remonter jusqu’à votre clé secrète.* Si quelqu’un le pouvait, il pourrait dépenser votre argent.

Il nous faut donc une opération mathématique pour laquelle :

- aller **dans un sens** (secret -> public) est rapide et facile, mais
- revenir **en arrière** (public -> secret) est si difficile que tous les ordinateurs de la Terre, travaillant pendant toute la durée de vie de l’univers, n’y parviendraient pas.

La simple multiplication dans un corps fini ne suffit pas : la division l’annule instantanément (c’était tout l’intérêt de l’Article 1). Il nous faut quelque chose sans bouton « annuler » facile. Les courbes elliptiques offrent exactement cela et, en prime, leurs points se combinent d’une manière idéale pour construire des engagements. Voyons comment.

---

## 2. L’intuition : une courbe dont on peut « additionner » les points

Oubliez un instant la cryptographie. Une **courbe elliptique** est simplement l’ensemble des points `(x, y)` qui satisfont une équation de la forme :

```
y^2 = x^3 + ax + b
```

Sur les nombres ordinaires, elle ressemble à une courbe lisse et sinueuse, souvent avec une boucle arrondie et deux branches :

![alt text](/content-images/image-14-1d2e8c25d2.webp)

La partie vraiment surprenante : **vous pouvez « additionner » deux points de cette courbe pour obtenir un troisième point sur la même courbe.** Il ne s’agit pas d’une addition ordinaire des coordonnées. C’est une règle géométrique, plus facile à *voir* qu’à décrire.

### La règle de la corde (additionner deux points différents)

Pour calculer `P + Q` :

1. Tracez une droite passant par `P` et `Q`.
2. Cette droite coupe la courbe en exactement un autre endroit. Appelez-le `R*`.
3. **Prenez le symétrique de `R*` par rapport à l’axe horizontal.** Ce symétrique est la réponse, `P + Q`.

![alt text](/content-images/image-11-61f3df1989.webp)

### La règle de la tangente (additionner un point à lui-même)

Pour calculer `P + P` (noté `2P`), il n’y a pas de second point par lequel tracer une droite ; vous utilisez donc la **tangente** en `P`, puis vous suivez la même recette : « troisième intersection, puis symétrie ».

C’est toute l’opération. Deux règles géométriques. Grâce à elles, les points d’une courbe elliptique forment ce que les mathématiciens appellent un **groupe** : un ensemble muni d’une « addition » qui se comporte bien. Il possède même un « zéro ».

### Le point à l’infini (le zéro de la courbe)

Tout système de nombres a besoin d’un `0`, l’élément qui ne change rien lorsqu’on l’ajoute. Sur une courbe elliptique, ce rôle est joué par un point supplémentaire particulier appelé **point à l’infini**, noté `O`. Vous pouvez l’imaginer « infiniment loin vers le haut », là où les droites verticales se rejoignent. Ajouter `O` à n’importe quel point le laisse inchangé, exactement comme ajouter `0`.

---

## 3. Des images à un corps fini

La courbe lisse ci-dessus représente l’*intuition*. Mais Zcash n’utilise pas les nombres réels (ils s’arrondissent et laissent fuiter leur taille, comme vu dans l’Article 1). Il utilise une courbe elliptique **sur un corps fini** : la même équation `y^2 = x^3 + ax + b`, mais avec toute l’arithmétique effectuée modulo un nombre premier.

Ce faisant, la jolie courbe se brise en un **nuage de points disjoints**, un point pour chaque paire `(x, y)` qui satisfait l’équation modulo `p`. Elle ne ressemble plus du tout à une courbe. Mais voici l’essentiel :

> **L’algèbre de la règle de la corde et de la tangente fonctionne toujours parfaitement.** Les mêmes formules qui trouvaient `P + Q` géométriquement le calculent désormais avec l’arithmétique du corps fini. Les points forment toujours un groupe, avec le même `0` (le point à l’infini).

Rendons cela concret avec un petit exemple entièrement vérifié.

### Une courbe complète, calculée exactement

Prenons `y^2 = x^3 + 2x + 2` sur le corps fini `F_17`. Le calcul de tous les points valides donne exactement **18 points, plus le point à l’infini = 19 au total.** En voici quelques-uns :

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Choisissons maintenant le point `G = (5, 1)` et ajoutons-le encore et encore à lui-même. Observez ce qui se passe (chaque ligne ci-dessous a été calculée, pas devinée) :

| Étape | Point | Étape | Point |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (infini)** |
| `10G` | (7, 11) | | |

Deux choses à remarquer :

- La suite **parcourt les 18 points finis puis aboutit à `O`** à l’étape 19, après quoi elle se répéterait indéfiniment. Le point de départ `G` « engendre » tout le groupe ; on l’appelle donc un **générateur**.
- C’est un groupe vérifié : par exemple `1G + 2G = (5,1) + (6,3) = (10,6)`, qui est exactement `3G`.  L’addition est cohérente en interne, comme l’exige un groupe.

---

## 4. La trappe : la multiplication scalaire

Ce tableau de `1G, 2G, 3G, ...` est au cœur de tout. Ajouter un point à lui-même de façon répétée s’appelle la **multiplication scalaire** : le point `kG` signifie « `G` ajouté à lui-même `k` fois ».

Voici maintenant la magie. Considérez les deux sens :

| Sens | Question | Difficulté |
|---|---|---|
| **Aller** | Étant donnés `k` et `G`, calculer `kG` | **Facile.** Même pour un `k` astronomiquement grand, une astuce appelée *doublement et addition* y parvient en quelques centaines d’étapes |
| **Retour** | Étant donnés `G` et `kG`, retrouver `k` | **En pratique impossible** sur une vraie courbe cryptographique |

Cette asymétrie est la **rue à sens unique** dont nous avions besoin dans la section 1. Le problème inverse (« quel `k` a produit ce point ? ») s’appelle le **problème du logarithme discret sur les courbes elliptiques (ECDLP)** et, sur les courbes qu’utilise Zcash, aucune méthode connue ne le résout avant la mort thermique de l’univers.

![alt text](/content-images/image-12-86b9ace6cb.webp)

> Sur notre courbe jouet `F_17`, vous *pourriez* simplement lire `k` dans le tableau, car elle n’a que 19 points. Les vraies courbes ont environ `2^(255)` points. Le tableau aurait plus de lignes qu’il n’y a d’atomes dans l’univers ; « le lire » n’est donc pas envisageable. C’est sa petite taille qui rend la courbe jouet pédagogique, et c’est aussi pour cela qu’elle n’est pas sûre.

---

## 5. Comment naissent les clés (le résultat)

Nous avons maintenant tout ce qu’il faut pour expliquer une vraie clé cryptographique, et c’est étonnamment simple :

> **Choisissez un nombre secret `k`. Publiez le point `kG`. C’est tout.**
> `k` est votre **clé privée**. `kG` est votre **clé publique**. La rue à sens unique (ECDLP) garantit que personne ne peut remonter de `kG` à `k`.

Cette idée unique, *une clé publique est un scalaire secret multiplié par un générateur fixe*, est le germe des clés de dépense, des clés pour lecture seule et des adresses de Zcash. L’arbre complet des clés ajoute davantage de structure par-dessus, mais chaque branche pousse à partir de cette racine.

### En prime : pourquoi les points d’une courbe font d’excellents engagements

Rappelez-vous l’« enveloppe scellée » (l’engagement) de l’Article 0, qui devait **cacher** son contenu tout en étant **impossible à falsifier**. Les courbes elliptiques nous offrent une manière élégante d’en construire une. Prenez deux points générateurs fixes et publics `G` et `H`, une valeur secrète `v` et un nombre aléatoire de masquage `r`, et formez :

```
Commitment  =  v.G  +  r.H
```

C’est un **engagement de Pedersen**, et il possède les deux propriétés recherchées :

- **Masquage :** le `r` aléatoire disperse le résultat sur toute la courbe, de sorte que le point ne révèle rien de `v`.
- **Liaison :** l’ECDLP rend impossible en pratique de trouver un `(v, r)` *différent* donnant le même point ; vous ne pouvez donc pas changer d’avis sur ce à quoi vous vous êtes engagé.

Une propriété supplémentaire se révélera inestimable par la suite : ces engagements **s’additionnent**. L’engagement sur `v_1` plus l’engagement sur `v_2` est un engagement valide sur `v_1 + v_2`. C’est ce comportement « homomorphe » qui permettra plus tard à Zcash de prouver que l’argent qui *entre* dans une transaction est égal à l’argent qui en *sort*, sans révéler aucun montant. Nous en tirerons parti vers l’Article 6.

---

## 6. Où cela se trouve dans Zcash

Les traces sont concrètes et vérifiables.

| Conception de Zcash | Courbes utilisées | Rôle |
|---|---|---|
| **Sapling** (plus ancien) | **BLS12-381** plus une courbe intégrée appelée **Jubjub** | BLS12-381 porte le système de preuves ; Jubjub est construite sur le corps scalaire de BLS12-381 afin que les opérations sur les clés et les engagements soient peu coûteuses à effectuer *à l’intérieur* d’une preuve à divulgation nulle de connaissance |
| **Orchard** (actuel) | **Pallas** et **Vesta** (le cycle « Pasta ») | Pallas porte les clés et les engagements de Orchard ; le couple Pallas/Vesta est spécialement agencé pour rendre efficaces les preuves avancées |

Les raisons pour lesquelles une courbe est « intégrée » dans le corps d’une autre, et pourquoi un *cycle* de deux courbes est utile, sont réelles et importantes, mais elles relèvent des articles sur les systèmes de preuves. Pour l’instant, retenez ceci : **chaque clé de Zcash est un scalaire multiplié par un générateur, et chaque engagement de Zcash est une somme de points de courbe**, situés sur l’une de ces courbes nommées.

![alt text](/content-images/image-13-ffdd703c60.webp)

---

## 7. Un avertissement honnête

Quelques simplifications ont permis de garder cet article lisible. Nous avons utilisé la forme de **Weierstrass courte** (`y^2 = x^3 + ax + b`) ; les courbes de Zcash sont souvent écrites sous d’autres formes équivalentes (Jubjub est une courbe d’*Edwards tordue*) choisies pour leur efficacité et leur sûreté, mais l’idée de groupe est identique. Nous n’avons pas défini les formules exactes d’addition de points (elles sont la version algébrique de « troisième intersection, puis symétrie »), et nous avons laissé de côté des subtilités comme l’ordre de la courbe, les cofacteurs et les « couplages », qui deviennent importants dans les articles sur les systèmes de preuves. Rien de tout cela ne change l’intuition ; cela l’affine.

---

## 8. Résumé

- Un système de confidentialité a besoin d’une **rue à sens unique** : facile dans un sens, infaisable en sens inverse. Les courbes elliptiques en fournissent une.
- Une **courbe elliptique** est l’ensemble des points satisfaisant `y^2 = x^3 + ax + b`, et ses points peuvent être **additionnés** grâce à la règle géométrique de la **corde et de la tangente**, un **point à l’infini** particulier jouant le rôle de zéro.
- Sur un **corps fini**, la courbe devient un nuage de points, mais la même addition fonctionne toujours et les points forment un **groupe**. (Exemple vérifié : `y^2 = x^3 + 2x + 2` sur `F_17` a 19 points, et `G = (5,1)` les engendre tous.)
- La **multiplication scalaire** `kG` est facile à calculer mais infaisable à inverser : c’est l’**ECDLP**. Voilà la trappe.
- **Clés :** clé privée `k`, clé publique `kG`. **Engagements :** forme de Pedersen `v.G + r.H`, qui masque, lie et, fort commodément, **s’additionne**.
- Dans **Zcash**, Sapling utilise **BLS12-381 + Jubjub** et Orchard utilise les courbes **Pallas/Vesta (Pasta)** ; chaque clé et chaque engagement s’y trouvent.

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Elliptic curve** | Points satisfaisant `y^2 = x^3 + ax + b`, munis d’une « addition » particulière des points |
| **Point addition** | La règle de la corde et de la tangente : droite passant par deux points, prendre la troisième intersection, puis le symétrique |
| **Point at infinity (`O`)** | Le « zéro » de la courbe ; l’ajouter ne change rien |
| **Generator (`G`)** | Un point de base dont les multiples finissent par couvrir tout le groupe |
| **Scalar multiplication (`kG`)** | Ajouter `G` à lui-même `k` fois ; facile dans un sens, difficile à inverser |
| **ECDLP** | Le problème difficile consistant à retrouver `k` à partir de `kG` ; le fondement de la sécurité |
| **Pedersen commitment** | `v.G + r.H` ; une enveloppe scellée qui masque, lie et s’additionne |

---

## FAQ

**Pourquoi des courbes plutôt que de simples grands nombres modulo un nombre premier ?**
Les deux peuvent fournir une rue à sens unique, mais les courbes elliptiques atteignent la même sécurité avec des clés bien plus petites et des opérations plus rapides, et leur arithmétique de points est idéale pour les engagements.

**Est-il prouvé que l’ECDLP est difficile ?**
Il n’est pas *prouvé* impossible, mais des décennies d’efforts intenses n’ont trouvé aucune attaque efficace sur des courbes bien choisies. La sécurité repose sur cette hypothèse éprouvée.

**Un ordinateur quantique pourrait-il casser cela ?**
Un ordinateur quantique suffisamment puissant pourrait casser l’ECDLP. C’est une préoccupation à long terme connue dans tout le secteur et un domaine de recherche actif ; les courbes actuelles restent sûres face aux ordinateurs classiques.

**Pourquoi Zcash utilise-t-il plus d’une courbe ?**
Pour des tâches différentes. Une courbe porte le système de preuves à divulgation nulle de connaissance ; une autre (intégrée dans le corps de la première) rend efficaces les opérations sur les clés et les engagements à l’intérieur des preuves. Les prochains articles expliquent pourquoi ce couplage est important.

---

### Testez votre intuition

À l’aide du tableau vérifié de la section 3, que vaut `9G + 10G` sur notre courbe jouet ? Et que vous apprend la réponse sur `G` ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

`9 + 10 = 19`, et nous avons vu que `19G = O`, le point à l’infini. Donc `9G + 10G = O`. Cela signifie que `10G` est l’**opposé** (l’inverse additif) de `9G` : deux points dont la somme est le point « zéro ». Sur une courbe, l’opposé d’un point est simplement son image miroir par rapport à l’axe des x, et en effet `9G = (7,6)` et `10G = (7,11)` ont le même `x` et des valeurs `y` dont la somme vaut `17 = 0 (mod 17)`. La structure est parfaitement cohérente, ce qui est exactement ce que garantit « c’est un groupe ».
</details>

---

### Et ensuite

**Article 3 . Hachage et engagements :** nous ouvrirons vraiment l’« enveloppe scellée magique ». Vous avez maintenant vu une manière de construire un engagement à partir de points de courbe ; nous verrons ensuite ce que signifient réellement le masquage et la liaison, nous découvrirons les fonctions de hachage et nous relierons les deux aux engagements de note qui ancrent chaque paiement Zcash.

*Fait partie de la série* Zcash à partir des premiers principes *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
