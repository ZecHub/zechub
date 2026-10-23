![alt text](image-1.png)
# Qu’est-ce que la vérification formelle ?

### Comment prouver qu’un programme est correct, au lieu de simplement l’espérer

> **Série :** *Série sur la vérification formelle* · **Partie 1 sur 3**
> **Public :** grands débutants. Aucune connaissance en mathématiques, programmation ou cryptographie n’est requise.
> **Ce que vous en retirerez :** une compréhension claire de ce que signifie *prouver* qu’un logiciel est correct, pourquoi cela diffère fondamentalement de le tester, ce qu’est une preuve vérifiée par machine, ainsi que les limites précises (et honnêtes) de ce qu’une telle preuve peut garantir.

La plupart des logiciels sont jugés fiables parce qu’ils ont été *testés* : nous les exécutons avec de nombreuses entrées et observons leur comportement. La vérification formelle pose une question plus audacieuse. Pouvons-nous *prouver*, avec une certitude mathématique, qu’un système fait ce qu’il doit faire pour **toutes** les entrées possibles, y compris celles que personne n’a jamais pensé à essayer ? Cet article construit cette idée depuis les bases. D’abord l’intuition, aucun symbole avant qu’il ne soit nécessaire.

---

## 1. Pourquoi devriez-vous vous en soucier ?

Voici une histoire vraie, et c’est la raison d’être de cette série.

En 2022, la cryptomonnaie axée sur la confidentialité Zcash a lancé un nouveau pool protégé nommé Orchard, permettant aux personnes d’effectuer des transactions dont les montants sont masqués. Pendant quatre ans, il a fonctionné sans défaut et a passé de nombreux audits professionnels. Puis, en mai 2026, un chercheur en sécurité qui raisonnait avec soin sur les mathématiques sous-jacentes (avec l’aide d’outils d’IA) a trouvé un unique endroit **sous-contraint** dans les calculs du système. Cette seule lacune aurait pu permettre à un attaquant de créer une quantité *illimitée* de monnaie contrefaite et, comme les montants étaient masqués, personne ne l’aurait vu se produire. La faille était présente depuis le début.

Elle n’a pas été détectée par les tests. Tous les tests avaient réussi pendant quatre ans. Elle a été détectée par quelqu’un qui *raisonnait sur les mathématiques*. Et lorsque l’équipe l’a corrigée, elle ne s’est pas contentée d’appliquer un correctif et de passer à autre chose. Elle a rédigé une **preuve mathématique vérifiée par machine**, portant sur plus de 2 700 théorèmes individuels, établissant que le remplacement ne pouvait absolument pas contenir cette catégorie de faille.

C’est cela, la vérification formelle, et voici ce qu’elle vous apporte : non pas « nous avons essayé beaucoup de cas et ils ont fonctionné », mais « nous avons prouvé que cela vaut pour tous les cas ». Pour les systèmes où un seul cas manqué est catastrophique (l’argent, les avions, les appareils médicaux, la cryptographie), cette différence est capitale.

L’angle mort des tests a été nommé il y a des décennies par l’informaticien Edsger Dijkstra, et cela reste vrai :

> **Les tests peuvent montrer la *présence* de bugs, mais jamais leur *absence*.**

Si un test réussit, vous avez appris que le système fonctionne *pour cette entrée*. Vous n’avez rien appris sur les entrées que vous n’avez pas essayées, et les bugs dangereux se trouvent presque toujours dans les cas que personne n’a essayés.

---

## 2. L’intuition : vérifier des portes contre prouver le bâtiment

Imaginez que vous êtes responsable d’un bâtiment comptant mille portes et que votre travail consiste à garantir que chaque porte est verrouillée la nuit.

- **L’approche par les tests :** faites le tour et essayez un échantillon de portes. Essayez-en cinquante, cent, cinq cents. Toutes celles que vous essayez sont verrouillées, donc votre confiance augmente. Mais vous ne les avez pas toutes essayées, et l’unique porte déverrouillée pourrait être une de celles que vous avez sautées.
- **L’approche par vérification formelle :** examinez le *système de verrouillage lui-même* et prouvez, à partir de sa conception, qu’appuyer sur le bouton « verrouiller » engage nécessairement chaque porte. Vous n’avez alors plus besoin d’essayer les portes individuellement. Vous avez montré qu’*aucune porte possible ne peut rester déverrouillée*, car le mécanisme l’empêche.

La différence réside entre **échantillonner la réalité** et **prouver une propriété de la conception**. Les tests échantillonnent. La vérification formelle prouve. C’est toute l’idée, et tout le reste n’est que l’outillage permettant de le faire rigoureusement.

![alt text](image-2.png)

---

## 3. Les trois piliers de toute vérification formelle

Toute vérification formelle, aussi avancée soit-elle, est construite à partir d’exactement trois ingrédients. Gardez-les clairement en tête et le reste n’est que détail.

| Pilier | Signification simple | Analogie avec le bâtiment |
|---|---|---|
| **Spécification** | Une énonciation précise de ce que signifie être *correct* | « Chaque porte doit être verrouillée la nuit » |
| **Système** | La chose concrète vérifiée (un programme, un circuit, un protocole) | Le bâtiment et son mécanisme de verrouillage |
| **Preuve** | Un raisonnement rigoureux montrant que le système satisfait toujours la spécification | La démonstration logique qu’appuyer sur « verrouiller » verrouille toutes les portes |

Un quatrième ingrédient, plus discret, rend l’ensemble digne de confiance :

- **Un vérificateur automatique.** La preuve n’est pas écrite par un humain puis simplement examinée à l’œil. Elle est fournie à un programme (un **assistant de preuve**, également appelé **démonstrateur de théorèmes**) qui vérifie *chaque étape logique*. Un humain peut faire des gestes vagues ou commettre une erreur subtile ; la machine n’acceptera pas une étape qui ne découle pas strictement de ce qui précède. C’est pourquoi nous disons que le résultat est **vérifié par machine**.

![alt text](image-3.png)

Parmi les assistants de preuve que vous pourriez entendre citer figurent **Lean**, **Rocq** (anciennement Coq) et **Isabelle**. Ce sont, en pratique, des moteurs de vérification logique extraordinairement stricts. La preuve Zcash de notre histoire d’ouverture a été écrite dans **Lean**. Il est à noter que les modèles d’IA modernes sont de plus en plus employés pour aider à *rédiger* ces preuves, sous la direction d’humains, ce qui a réduit des efforts qui prenaient autrefois des années à quelques semaines. La machine vérifie toujours chaque étape, donc ce gain de vitesse ne diminue en rien la certitude.

---

## 4. Ce qu’est réellement une preuve

Le mot « preuve » peut sembler intimidant ; démystifions-le donc avec un exemple concret et vérifiable. Pas de cryptographie, seulement de l’arithmétique scolaire.

**Affirmation :** pour tout nombre entier naturel `n`, la somme `0 + 1 + 2 + ... + n` est égale à `n(n+1)/2`.

Vous pourriez *tester* cela. `n = 5` donne `0+1+2+3+4+5 = 15`, et `5 × 6 / 2 = 15`. ✓ Cela correspond. Essayez `n = 10` : la somme est `55`, et la formule donne `10 × 11 / 2 = 55`. ✓ (Ces calculs ont été effectués et confirmés ; l’affirmation est en fait vraie pour chaque `n` de 0 à 999 lorsqu’on la vérifie directement.)

Mais tester des valeurs, même un millier, n’atteint jamais « pour **tout** nombre entier naturel ». Il y en a une infinité. Une **preuve** comble cet écart infini par un raisonnement fini, grâce à une technique appelée **récurrence** :

1. **Cas de base :** pour `n = 0`, la somme vaut simplement `0`, et la formule donne `0 × 1 / 2 = 0`. Elles concordent. ✓
2. **Étape inductive :** *supposez* que la formule est vraie pour un certain nombre `k`. Ajoutez maintenant le nombre suivant, `k+1`. La somme jusqu’à `k+1` est `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Une ligne d’algèbre réarrange cela en `(k+1)(k+2)/2`, qui est exactement la formule avec `k+1` à la place de `k`. ✓

Puisqu’elle est vraie au départ (0) et que chaque étape la transporte au nombre suivant, elle est vraie pour **tous** les nombres entiers naturels, indéfiniment, en un seul raisonnement fini. C’est cela, une preuve. Un assistant de preuve effectue exactement ce raisonnement, mais vérifie mécaniquement que chaque étape, y compris la « ligne d’algèbre », découle réellement de ce qui précède.

> Le saut conceptuel à retenir : une preuve transforme « une infinité de cas » en un **raisonnement fini et vérifiable**. C’est le superpouvoir qui manque structurellement aux tests.

---

## 5. Où se trouvent réellement les bugs

La vérification formelle est puissante notamment parce qu’elle apporte une idée éclairante sur *l’origine* même des bugs. Toute faille dans un système qui vérifie des règles remonte à l’un de trois endroits :

| Source d’un bug | Ce que cela signifie | Peut-on l’éliminer par une preuve ? |
|---|---|---|
| **La spécification** | Les mathématiques ou les règles elles-mêmes sont erronées (une condition manquante, une mauvaise définition) | **Oui**, directement ; c’est le domaine de prédilection de la vérification formelle |
| **L’implémentation** | Le code ne met pas fidèlement en œuvre une spécification correcte | En partie ; de tels échecs laissent souvent des traces détectables |
| **Une hypothèse défaillante** | Un élément sur lequel repose tout le système s’avère faux | Non ; les hypothèses constituent le fondement irréductible |

Cette taxonomie compte plus qu’il n’y paraît, et les parties 2 et 3 en dépendent. Les bugs les plus profonds et les plus dangereux, ceux qui peuvent rester cachés indéfiniment, se trouvent généralement dans la **spécification** : la description mathématique de ce que le système est censé faire. Or, la spécification est précisément ce qu’une preuve vérifiée par machine peut examiner directement, tous les cas à la fois. C’est pourquoi les efforts sérieux de vérification formelle commencent par là.

![alt text](image-4.png)

---

## 6. La réserve la plus importante de tout le domaine

La vérification formelle est puissante, mais sa promesse est précise ; la mal comprendre égare les gens. Énonçons-la donc avec soin :

> **Une preuve garantit que le *système* satisfait la *spécification*, sous les *hypothèses* énoncées. Rien de plus.**

Quatre conséquences en découlent, et chacune compte :

- **Si la spécification est erronée, la preuve ne vaut rien.** Si vous prouvez que « chaque porte se verrouille » alors que l’exigence réelle était que « chaque *fenêtre* se verrouille », vous avez parfaitement prouvé la mauvaise chose. La vérification contrôle que vous avez construit *ce que vous avez spécifié*, pas que vous avez spécifié la bonne chose.
- **Si une définition est formulée de manière subtilement incorrecte, la garantie se restreint silencieusement.** Une preuve concernant une définition légèrement erronée du « solde » peut établir moins que ce que vous pensez tout en réussissant chaque vérification. C’est pourquoi les définitions au cœur d’une vérification doivent être courtes, standard et ouvertement examinables par des humains.
- **Si les hypothèses échouent, la garantie cesse de s’appliquer.** Les preuves reposent sur des hypothèses (« le matériel de verrouillage n’est pas physiquement cassé »). Si une hypothèse est fausse dans la réalité, la conclusion ne doit pas nécessairement être vraie.
- **Cela ne signifie pas « aucun bug, jamais ».** Cela signifie « aucun bug du type exclu par cette spécification, compte tenu de ces hypothèses ». Une affirmation plus étroite, plus honnête et bien plus utile.

Loin d’affaiblir la vérification formelle, cette précision fait sa force. Elle vous indique *exactement* ce que vous obtenez. Comme nous le verrons dans la partie 3, l’équipe Zcash qui énonce clairement son périmètre et ses hypothèses (« nous avons prouvé la solidité de l’offre, sous ces hypothèses nommées, et non la confidentialité ») est un modèle de cette honnêteté.

![alt text](image-5.png)

---

## 7. Une mise en garde honnête

Pour préserver la lisibilité, nous avons simplifié. Les vraies spécifications sont écrites dans des langages formels précis, et non en phrases anglaises ; il existe plusieurs *styles* de vérification formelle (démonstration interactive de théorèmes, vérification de modèles, méthodes fondées sur SMT) adaptés à des problèmes différents ; et rédiger ces preuves demeure un travail qualifié et exigeant, même avec l’aide de l’IA. Nous avons également omis la façon dont un assistant de preuve représente la logique en interne. Rien de cela ne change l’essentiel : une spécification, un système et une preuve vérifiée par machine que les deux concordent, sous des hypothèses énoncées. Nous reviendrons aux détails à mesure qu’ils seront nécessaires.

---

## 8. Résumé

- **Les tests** échantillonnent des entrées précises et peuvent montrer qu’un bug est présent, jamais que les bugs sont absents. Les bugs dangereux se cachent dans les cas que personne n’échantillonne.
- **La vérification formelle** prouve qu’une propriété est vraie pour **tous** les cas possibles, dans un raisonnement fini et vérifiable.
- Toute vérification repose sur trois piliers : une **spécification** (ce que signifie être correct), un **système** (la chose vérifiée) et une **preuve** qu’ils concordent, ainsi qu’un **assistant de preuve** (comme **Lean**) qui vérifie mécaniquement chaque étape.
- Une **preuve** (par exemple, par **récurrence**) réduit une infinité de cas à un seul raisonnement fini.
- Les bugs se trouvent dans la **spécification**, l’**implémentation** ou une **hypothèse défaillante**. La vérification formelle cible directement la spécification, où se trouvent généralement les bugs les plus profonds et les mieux cachés.
- La garantie est précise : le système satisfait **la spécification**, sous **les hypothèses énoncées**. Une spécification erronée, une définition mal formulée ou une hypothèse défaillante l’annule, et cela ne signifie jamais « aucun bug, jamais ».

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Formal verification** | Prouver mathématiquement qu’un système satisfait une spécification dans tous les cas |
| **Specification** | Une énonciation précise de ce que signifie un « comportement correct » |
| **System** | Le programme, circuit ou protocole concret qui est vérifié |
| **Proof** | Une chaîne finie d’étapes logiques établissant une affirmation pour tous les cas |
| **Proof assistant / theorem prover** | Logiciel (Lean, Rocq, Isabelle) qui vérifie chaque étape d’une preuve |
| **Machine-checked** | Vérifié étape par étape par un ordinateur, et non seulement par une lecture humaine |
| **Induction** | Technique de preuve : vraie au départ, puis chaque étape l’étend à la suivante |
| **Assumption** | Condition dont dépend la preuve ; si elle est fausse, la garantie peut ne pas tenir |

---

## FAQ

**La vérification formelle remplace-t-elle les tests ?**
Non. Elles se complètent. Les tests détectent à faible coût les problèmes pratiques et les hypothèses erronées ; la vérification exclut des catégories entières de bugs que les tests pourraient ne jamais échantillonner.

**Si elle est si puissante, pourquoi tout n’est-il pas formellement vérifié ?**
Elle est coûteuse et exige des compétences spécialisées, même si l’assistance par IA réduit ce coût. Elle est réservée aux systèmes où un bug rare serait catastrophique, précisément là où son coût est justifié.

**Un système formellement vérifié peut-il tout de même échouer ?**
Oui, si la spécification était erronée, si une définition était mal formulée, si une hypothèse ne tenait pas, ou si la défaillance se situe hors de ce qui a été spécifié. La preuve ne couvre que ce qu’elle prétend couvrir.

**Une preuve vérifiée par machine est-elle plus digne de confiance qu’une preuve humaine ?**
Pour les preuves volumineuses et complexes, généralement oui. Une machine ne négligera pas une lacune subtile et n’acceptera pas une affirmation vague, bien qu’elle fasse toujours confiance à la spécification et aux définitions qui lui ont été données.

**Si l’IA aide à écrire la preuve, pourquoi lui faire confiance ?**
Parce que l’assistant de preuve vérifie mécaniquement chaque étape. L’IA propose des étapes ; la machine les vérifie. Une étape erronée est simplement rejetée ; l’IA accélère donc le travail sans affaiblir la garantie.

---

### Testez votre intuition

Vous prouvez que le logiciel d’une banque « ne laisse jamais le solde d’un compte devenir négatif ». Un an plus tard, de l’argent continue de disparaître. Comment ces deux faits peuvent-ils être vrais simultanément ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

La preuve garantissait exactement une propriété : les soldes ne deviennent jamais négatifs. De l’argent peut disparaître de manières que cette propriété n’a jamais couvertes, par exemple un bug qui transfère des fonds vers le mauvais compte (dont le solde reste néanmoins non négatif), ou une faille dans une partie du système qui n’a jamais été spécifiée. La vérification a fait exactement ce qu’elle promettait, et rien de plus. C’est la réserve de la section 6 en action : une preuve couvre la spécification, pas toute notion concevable de « correct ».
</details>

---

### La suite

**Partie 2 · Le bug Orchard :** nous nous tournons vers l’histoire réelle de 2026 dans son intégralité. Un système de confidentialité masquait les montants grâce à des preuves cryptographiques, et une ligne sous-contraite dans ses mathématiques signifiait que ces preuves pouvaient être amenées à mentir, permettant une contrefaçon invisible illimitée. Nous verrons exactement ce que signifie « un circuit sous-contraint », pourquoi cette catégorie de bug peut rester cachée indéfiniment et pourquoi elle s’est produite plus d’une fois.

*Fait partie de la* série sur la vérification formelle *pour [ZecHub](https://zechub.org).*
