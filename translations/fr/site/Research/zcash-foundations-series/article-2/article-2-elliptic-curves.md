# Courbes elliptiques : là où naissent les clés et les engagements de Zcash
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![texte alternatif](image-10.png)

### Une rue à sens unique construite à partir de points sur une courbe

> **Série :** *Zcash from First Principles* . **Article 2 . Courbes elliptiques**
> **Public :** débutants. Nous supposons seulement l'[Article 1 (corps finis)](article-1-finite-fields.md) : une arithmétique qui revient à zéro modulo un nombre premier. Aucun autre prérequis n'est nécessaire.
> **Ce que vous en retirerez :** une vision intuitive et correcte des courbes elliptiques, de la « trappe » qui les rend utiles, et de la manière exacte dont Zcash les transforme en clés et en engagements.

[L'article 1](article-1-finite-fields.md) nous a donné un terrain de jeu parfait pour l'arithmétique : le corps fini. Mais un corps, à lui seul, ce ne sont que des nombres. Pour construire les clés et les « enveloppes scellées » de l'[Article 0](article-0-shielded-transaction.md), Zcash a besoin d'un objet doté d'un type particulier de difficulté à sens unique : facile à calculer dans le sens direct, pratiquement impossible à inverser. Cet objet est une **courbe elliptique**. Cet article la construit depuis les bases, avec l'intuition avant l'algèbre.

---

## 1. Pourquoi est-ce important ?

Tout système de confidentialité a besoin d'une **rue à sens unique** : une opération triviale à parcourir dans le sens direct et effectivement impossible à remonter.

Voici pourquoi. Votre **clé secrète** est un nombre que vous gardez caché. Votre **clé publique** (et votre adresse) en est dérivée et exposée au monde. Toute la sécurité du système repose sur un fait : *à partir de la clé publique, personne ne peut remonter jusqu'à votre clé secrète.* Si c'était possible, on pourrait dépenser votre argent.

Nous avons donc besoin d'une opération mathématique telle que :

- aller **dans le sens direct** (secret -> public) soit rapide et facile, mais
- aller **dans le sens inverse** (public -> secret) soit si difficile que tous les ordinateurs de la Terre, travaillant pendant toute la durée de vie de l'univers, n'y parviendraient pas.

La simple multiplication dans un corps fini ne suffit pas ; la division l'annule instantanément (c'était justement tout l'intérêt de l'Article 1). Il nous faut quelque chose sans bouton « annuler » facile. Les courbes elliptiques fournissent exactement cela et, en prime, leurs points se combinent d'une manière parfaite pour construire des engagements. Voyons cela.

---

## 2. L'intuition : une courbe dont on peut « additionner » les points

Oublions un instant la cryptographie. Une **courbe elliptique** n'est rien d'autre que l'ensemble des points `(x, y)` qui satisfont une équation de la forme :

```
y^2 = x^3 + ax + b
```

Sur les nombres ordinaires, cela ressemble à une courbe lisse et ondulante, souvent avec une boucle arrondie et deux branches :

![texte alternatif](image-14.png)

La partie vraiment surprenante : **on peut « additionner » deux points sur cette courbe pour obtenir un troisième point sur la même courbe.** Ce n'est pas l'addition ordinaire des coordonnées. C'est une règle géométrique, et il est plus facile de la *voir* que de la décrire.

### La règle de la corde (additionner deux points différents)

Pour additionner `P + Q` :

1. Tracez une ligne droite passant par `P` et `Q`.
2. Cette ligne coupe la courbe en exactement un autre point. Appelons-le `R*`.
3. **Réfléchissez `R*` par rapport à l'axe horizontal.** Son reflet est la réponse, `P + Q`.

![texte alternatif](image-11.png)

### La règle de la tangente (additionner un point à lui-même)

Pour calculer `P + P` (noté `2P`), il n'y a pas de second point pour tracer une droite, donc on utilise à la place la **tangente** à la courbe en `P`, puis on suit la même recette : « troisième intersection, puis réflexion ».

C'est toute l'opération. Deux règles géométriques. Avec elles, les points d'une courbe elliptique forment ce que les mathématiciens appellent un **groupe** : un ensemble muni d'une « addition » bien définie. Il possède même un « zéro ».

### Le point à l'infini (le zéro de la courbe)

Tout système de nombres a besoin d'un `0`, la chose qui ne change rien quand on l'additionne. Sur une courbe elliptique, ce rôle est joué par un point spécial supplémentaire appelé le **point à l'infini**, noté `O`. On peut l'imaginer comme « infiniment haut », l'endroit où se rejoignent les lignes verticales. Ajouter `O` à n'importe quel point le laisse inchangé, exactement comme l'addition de `0`.

---

## 3. Des images au corps fini

La courbe lisse ci-dessus est l'*intuition*. Mais Zcash n'utilise pas les nombres réels (ils introduisent des arrondis et révèlent les tailles, comme expliqué dans l'Article 1). Il utilise une courbe elliptique **sur un corps fini** : la même équation `y^2 = x^3 + ax + b`, mais avec toute l'arithmétique effectuée modulo un nombre premier.

Quand on fait cela, la jolie courbe éclate en une **dispersion de points déconnectés**, un point pour chaque paire `(x, y)` qui satisfait l'équation modulo `p`. Cela ne ressemble plus du tout à une courbe. Mais voici l'élément crucial :

> **L'algèbre de la règle de la corde et de la tangente continue de fonctionner parfaitement.** Les mêmes formules qui trouvaient `P + Q` géométriquement le calculent maintenant avec l'arithmétique des corps finis. Les points forment toujours un groupe, avec le même `0` (le point à l'infini).

Rendons cela concret avec un petit exemple entièrement vérifié.

### Une courbe complète, calculée exactement

Prenez `y^2 = x^3 + 2x + 2` sur le corps fini `F_17`. En calculant tous les points valides, on obtient exactement **18 points, plus le point à l'infini = 19 au total.** En voici quelques-uns :

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Choisissons maintenant le point `G = (5, 1)` et continuons à l'additionner à lui-même. Regardez ce qui se passe (chaque ligne ci-dessous a été calculée, pas devinée) :

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
| `9G` | (7, 6) | `19G` | **O (infinity)** |
| `10G` | (7, 11) | | |

Deux choses à remarquer :

- Il **visite les 18 points finis puis arrive sur `O`** à l'étape 19, après quoi il recommencerait indéfiniment. Le point de départ `G` « génère » tout le groupe, donc on l'appelle un **générateur**.
- C'est un groupe vérifié : par exemple `1G + 2G = (5,1) + (6,3) = (10,6)`, ce qui est exactement `3G`. L'addition est cohérente en interne, comme l'exige un groupe.

---

## 4. La trappe : la multiplication scalaire

Ce tableau de `1G, 2G, 3G, ...` est au cœur de tout. Le fait d'additionner un point à lui-même de façon répétée s'appelle la **multiplication scalaire** : le point `kG` signifie « `G` additionné à lui-même `k` fois ».

Et maintenant, la magie. Considérons les deux directions :

| Direction | Question | Difficulté |
|---|---|---|
| **Sens direct** | Étant donnés `k` et `G`, calculer `kG` | **Facile.** Même pour des `k` astronomiquement grands, une astuce appelée *double-and-add* y parvient en quelques centaines d'étapes |
| **Sens inverse** | Étant donnés `G` et `kG`, retrouver `k` | **Effectivement impossible** sur une véritable courbe cryptographique |

Cette asymétrie est la **rue à sens unique** dont nous avions besoin dans la section 1. Le problème inverse (« quel `k` a produit ce point ? ») s'appelle le **problème du logarithme discret sur courbe elliptique (ECDLP)** et, sur les courbes utilisées par Zcash, aucune méthode connue ne le résout avant la mort thermique de l'univers.

![texte alternatif](image-12.png)

> Sur notre courbe jouet `F_17`, vous *pourriez* simplement lire `k` dans le tableau, parce qu'elle n'a que 19 points. Les vraies courbes ont environ `2^(255)` points. Le tableau aurait plus de lignes qu'il n'y a d'atomes dans l'univers, donc « lire la réponse dedans » n'est pas une option. C'est sa petite taille qui rend la courbe jouet pédagogique, et c'est aussi pourquoi elle n'est pas sûre.

---

## 5. Comment naissent les clés (le gain)

Nous avons maintenant tout ce qu'il faut pour expliquer une véritable clé cryptographique, et c'est étonnamment simple :

> **Choisissez un nombre secret `k`. Publiez le point `kG`. C'est tout.**
> `k` est votre **clé privée**. `kG` est votre **clé publique**. La rue à sens unique (ECDLP) garantit que personne ne peut remonter de `kG` à `k`.

Cette idée unique, *une clé publique est un scalaire secret multiplié par un générateur fixe*, est la graine des clés de dépense, des Viewing Key et des adresses de Zcash. L'arbre complet des clés ajoute ensuite davantage de structure, mais chaque branche pousse à partir de cette racine.

### Bonus : pourquoi les points de courbe sont parfaits pour les engagements

Rappelez-vous l'« enveloppe scellée » (engagement) de l'Article 0, qui devait **cacher** son contenu tout en étant **impossible à falsifier**. Les courbes elliptiques nous offrent une manière propre d'en construire une. Prenez deux points générateurs publics fixes `G` et `H`, une valeur secrète `v`, et un nombre aléatoire d'aveuglement `r`, puis formez :

```
Commitment  =  v.G  +  r.H
```

C'est un **engagement de Pedersen**, et il possède bien les deux propriétés que nous voulions :

- **Masquage :** le `r` aléatoire répartit le résultat sur toute la courbe, de sorte que le point ne révèle rien sur `v`.
- **Lien :** l'ECDLP rend irréalisable le fait de trouver un couple `(v, r)` *différent* donnant le même point, donc vous ne pouvez pas changer d'avis sur ce à quoi vous vous êtes engagé.

Une propriété bonus se révèle inestimable plus tard : ces engagements **s'additionnent**. L'engagement sur `v_1` plus l'engagement sur `v_2` est un engagement valide sur `v_1 + v_2`. Ce comportement « homomorphe » permettra plus tard à Zcash de prouver que l'argent entrant *dans* une transaction est égal à l'argent qui en ressort, sans révéler aucun montant. Nous en profiterons vers l'Article 6.

---

## 6. Où cela se trouve dans Zcash

Les empreintes sont concrètes et vérifiables.

| Conception de Zcash | Courbes utilisées | Rôle |
|---|---|---|
| **Sapling** (plus ancien) | **BLS12-381** plus une courbe intégrée appelée **Jubjub** | BLS12-381 porte le système de preuve ; Jubjub est construite sur le corps scalaire de BLS12-381 afin que les opérations sur les clés et les engagements soient peu coûteuses à exécuter *à l'intérieur* d'une preuve à divulgation nulle de connaissance |
| **Orchard** (actuel) | **Pallas** et **Vesta** (le cycle « Pasta ») | Pallas porte les clés et les engagements d'Orchard ; l'association Pallas/Vesta est spécialement agencée pour rendre efficaces les preuves avancées |

Les raisons pour lesquelles une courbe est « intégrée » dans le corps d'une autre, et pourquoi un *cycle* de deux courbes est utile, sont réelles et importantes, mais elles appartiennent aux articles sur les systèmes de preuve. Pour l'instant, la conclusion essentielle est solide : **chaque clé Zcash est un scalaire multiplié par un générateur, et chaque engagement Zcash est une somme de points de courbe**, vivant sur l'une de ces courbes nommées.

![texte alternatif](image-13.png)

---

## 7. Une réserve honnête

Quelques simplifications ont permis de garder cela lisible. Nous avons utilisé la forme de **Weierstrass courte** (`y^2 = x^3 + ax + b`) ; les courbes de Zcash sont souvent écrites sous d'autres formes équivalentes (Jubjub est une courbe *twisted Edwards*) choisies pour l'efficacité et la sécurité, mais l'idée de groupe est identique. Nous n'avons pas défini les formules exactes d'addition des points (ce sont la version algébrique de « troisième intersection, puis réflexion »), et nous avons laissé de côté des subtilités comme l'ordre de la courbe, les cofactors et les « pairings », qui deviennent importants dans les articles sur les systèmes de preuve. Rien de tout cela ne change l'intuition ; cela l'affine.

---

## 8. Résumé

- Un système de confidentialité a besoin d'une **rue à sens unique** : facile dans le sens direct, irréalisable dans le sens inverse. Les courbes elliptiques en fournissent une.
- Une **courbe elliptique** est l'ensemble des points satisfaisant `y^2 = x^3 + ax + b`, et ses points peuvent être **additionnés** via la règle géométrique de la **corde et de la tangente**, avec un **point à l'infini** spécial jouant le rôle de zéro.
- Sur un **corps fini**, la courbe devient une dispersion de points, mais la même addition fonctionne toujours et les points forment un **groupe**. (Exemple vérifié : `y^2 = x^3 + 2x + 2` sur `F_17` possède 19 points, et `G = (5,1)` les génère tous.)
- La **multiplication scalaire** `kG` est facile à calculer mais irréalisable à inverser : c'est l'**ECDLP**. Voilà la trappe.
- **Clés :** clé privée `k`, clé publique `kG`. **Engagements :** forme de Pedersen `v.G + r.H`, qui masque, lie, et s'**additionne** commodément.
- Dans **Zcash**, Sapling utilise **BLS12-381 + Jubjub** et Orchard utilise les courbes **Pallas/Vesta (Pasta)** ; chaque clé et chaque engagement vit sur celles-ci.

---

## Glossaire

| Terme | Signification en français courant |
|---|---|
| **Courbe elliptique** | Points satisfaisant `y^2 = x^3 + ax + b`, avec une « addition » spéciale des points |
| **Addition de points** | La règle de la corde et de la tangente : droite passant par deux points, prendre la troisième intersection, réfléchir |
| **Point à l'infini (`O`)** | Le « zéro » de la courbe ; l'ajouter ne change rien |
| **Générateur (`G`)** | Un point de base dont les multiples finissent par couvrir tout le groupe |
| **Multiplication scalaire (`kG`)** | Additionner `G` à lui-même `k` fois ; facile dans le sens direct, difficile à inverser |
| **ECDLP** | Le problème difficile consistant à retrouver `k` à partir de `kG` ; le fondement de la sécurité |
| **Engagement de Pedersen** | `v.G + r.H` ; une enveloppe scellée qui cache, lie et s'additionne |

---

## FAQ

**Pourquoi des courbes plutôt que simplement de grands nombres modulo un nombre premier ?**
Les deux peuvent fournir une rue à sens unique, mais les courbes elliptiques atteignent le même niveau de sécurité avec des clés bien plus petites et des opérations plus rapides, et leur arithmétique de points est idéale pour les engagements.

**L'ECDLP est-il prouvé difficile ?**
Ce n'est pas *prouvé* impossible, mais des décennies d'efforts intensifs n'ont trouvé aucune attaque efficace contre des courbes bien choisies. La sécurité repose sur cette hypothèse largement éprouvée.

**Un ordinateur quantique pourrait-il casser cela ?**
Un ordinateur quantique suffisamment grand pourrait casser l'ECDLP. C'est une préoccupation connue à long terme dans tout le secteur et un domaine de recherche actif ; les courbes actuelles restent sûres face aux ordinateurs classiques.

**Pourquoi Zcash utilise-t-il plus d'une courbe ?**
Parce qu'elles ont des rôles différents. Une courbe porte le système de preuve à divulgation nulle de connaissance ; une autre (intégrée dans le corps de la première) rend efficaces les opérations sur les clés et les engagements à l'intérieur de la preuve. Les prochains articles expliqueront pourquoi cette association est importante.

---

### Testez votre intuition

En utilisant le tableau vérifié de la section 3, combien vaut `9G + 10G` sur notre courbe jouet ? Et que nous dit la réponse sur `G` ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

`9 + 10 = 19`, et nous avons vu que `19G = O`, le point à l'infini. Donc `9G + 10G = O`. Cela signifie que `10G` est le **négatif** (inverse additif) de `9G` : deux points qui s'additionnent pour donner le point « zéro ». Sur une courbe, le négatif d'un point est simplement son image miroir par rapport à l'axe des x, et en effet `9G = (7,6)` et `10G = (7,11)` ont le même `x` et des valeurs de `y` dont la somme vaut `17 = 0 (mod 17)`. La structure est parfaitement cohérente, ce qui est exactement ce que garantit l'affirmation « c'est un groupe ».
</details>

---

### Et ensuite

**Article 3 . Hachage et engagements :** nous allons enfin ouvrir correctement la « magique enveloppe scellée ». Vous avez maintenant vu une manière de construire un engagement à partir de points de courbe ; nous allons ensuite nous demander ce que signifient réellement le masquage et le lien, découvrir les fonctions de hachage, et relier le tout aux engagements de notes qui ancrent chaque paiement Zcash.

*Fait partie de la série* Zcash from First Principles *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
