![alt text](image-1.png)
# Qu'est-ce que la vérification formelle ?

### Comment prouver qu'un programme est correct, au lieu de simplement l'espérer

> **Série :** *Série sur la vérification formelle* · **Partie 1 sur 3**
> **Public :** grands débutants. Aucune connaissance préalable en mathématiques, en programmation ou en cryptographie n'est requise.
> **Ce que vous en retiendrez :** une compréhension claire de ce que signifie *prouver* qu'un logiciel est correct, de la raison pour laquelle cela diffère fondamentalement du fait de le tester, de ce qu'est une preuve vérifiée par machine, et des limites précises (et honnêtes) de ce qu'une telle preuve peut promettre.

La plupart des logiciels inspirent confiance parce qu'ils ont été *testés* : on les exécute sur de nombreuses entrées et on observe leur comportement. La vérification formelle pose une question plus audacieuse. Peut-on *prouver*, avec une certitude mathématique, qu'un système fait ce qu'il doit faire pour **toutes** les entrées possibles, y compris celles que personne n'a jamais pensé à essayer ? Cet article construit cette idée à partir de zéro. L'intuition d'abord, et aucun symbole tant qu'il n'est pas justifié.

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Voici une histoire vraie, et c'est la raison d'être de cette série.

En 2022, la cryptomonnaie axée sur la confidentialité Zcash a lancé un nouveau pool protégé nommé Orchard, permettant d'effectuer des transactions dont les montants sont masqués. Pendant quatre ans, il a fonctionné sans faille et a passé avec succès plusieurs audits professionnels. Puis, en mai 2026, un chercheur en sécurité, en raisonnant minutieusement sur les mathématiques sous-jacentes (avec l'aide d'outils d'IA), a découvert un unique point **sous-contraint** dans les mathématiques du système. Cette seule faille aurait pu permettre à un attaquant de créer une quantité *illimitée* de fausse monnaie, et comme les montants étaient masqués, personne ne l'aurait vu. La faille était présente depuis le début.

Elle n'a pas été détectée par les tests. Tous les tests avaient réussi pendant quatre ans. Elle a été détectée par quelqu'un qui *raisonnait sur les mathématiques*. Et lorsque l'équipe l'a corrigée, elle ne s'est pas contentée d'appliquer un correctif avant de passer à autre chose. Elle a rédigé une **preuve mathématique vérifiée par machine**, comptant plus de 2 700 théorèmes individuels, établissant que le remplacement ne pouvait absolument pas contenir ce type de faille.

C'est cela, la vérification formelle, et voici ce qu'elle vous apporte : non pas « nous avons essayé beaucoup de cas et ils ont fonctionné », mais « nous avons prouvé que cela tient pour tous les cas ». Pour les systèmes où un seul cas oublié est catastrophique (argent, avions, dispositifs médicaux, cryptographie), cette différence est essentielle.

L'angle mort des tests a été nommé il y a des décennies par l'informaticien Edsger Dijkstra, et il reste d'actualité :

> **Les tests peuvent montrer la *présence* de bogues, mais jamais leur *absence*.**

Si un test réussit, vous avez appris que le système fonctionne *pour cette entrée*. Vous n'avez rien appris sur les entrées que vous n'avez pas essayées, et les bogues dangereux se trouvent presque toujours dans les cas que personne n'a essayés.

---

## 2. L'intuition : vérifier des portes ou prouver le bâtiment

Imaginez que vous êtes responsable d'un bâtiment comptant mille portes, et que votre mission est de garantir que chaque porte est verrouillée la nuit.

- **L'approche par les tests :** faites le tour et essayez un échantillon de portes. Essayez-en cinquante, cent, cinq cents. Chacune de celles que vous essayez est verrouillée, et votre confiance augmente. Mais vous ne les avez pas toutes essayées, et la seule porte déverrouillée pourrait être l'une de celles que vous avez sautées.
- **L'approche par la vérification formelle :** examinez *le système de verrouillage lui-même* et prouvez, à partir de sa conception, qu'appuyer sur le bouton « verrouiller » enclenche nécessairement chaque porte. Vous n'avez alors plus besoin d'essayer les portes une par une. Vous avez montré qu'*aucune porte ne peut rester déverrouillée*, car le mécanisme rend cela impossible.

La différence est celle entre **échantillonner la réalité** et **prouver une propriété de la conception**. Les tests échantillonnent. La vérification formelle prouve. Voilà toute l'idée, et tout le reste n'est que la machinerie permettant de le faire avec rigueur.

![alt text](image-2.png)

---

## 3. Les trois piliers de toute vérification formelle

Toute vérification formelle, aussi avancée soit-elle, repose sur exactement trois ingrédients. Gardez-les bien en tête, et le reste n'est que détail.

| Pilier | Signification simple | Analogie du bâtiment |
|---|---|---|
| **Spécification** | Un énoncé précis de ce que *signifie* « correct » | « Chaque porte doit être verrouillée la nuit » |
| **Système** | La chose réellement vérifiée (un programme, un circuit, un protocole) | Le bâtiment et son mécanisme de verrouillage |
| **Preuve** | Un argument rigoureux montrant que le système respecte toujours la spécification | La démonstration logique qu'appuyer sur « verrouiller » verrouille toutes les portes |

Et un quatrième ingrédient, plus discret, rend l'ensemble digne de confiance :

- **Un vérificateur automatique.** La preuve n'est pas rédigée par un humain puis simplement survolée du regard. Elle est soumise à un programme (un **assistant de preuve**, également appelé **prouveur de théorèmes**) qui vérifie *chaque étape logique, sans exception*. Un humain peut rester approximatif ou commettre une erreur subtile ; la machine n'acceptera aucune étape qui ne découle pas strictement des précédentes. C'est pourquoi on dit que le résultat est **vérifié par machine**.

![alt text](image-3.png)

Parmi les assistants de preuve dont vous entendrez peut-être parler figurent **Lean**, **Rocq** (anciennement Coq) et **Isabelle**. Ce sont, en pratique, des moteurs de vérification logique d'une rigueur extraordinaire. La preuve Zcash de notre histoire d'introduction a été rédigée en **Lean**. Fait notable, les modèles d'IA modernes sont de plus en plus utilisés pour aider à *rédiger* ces preuves, sous la direction d'humains, ce qui a ramené à quelques semaines des travaux qui prenaient autrefois des années. La machine vérifie toujours chaque étape, si bien que ce gain de vitesse ne coûte rien en certitude.

---

## 4. Ce qu'est réellement une preuve

Le mot « preuve » peut sembler intimidant ; démystifions-le donc à l'aide d'un exemple concret et vérifiable. Pas de cryptographie, juste de l'arithmétique scolaire.

**Affirmation :** pour tout nombre entier `n`, la somme `0 + 1 + 2 + ... + n` est égale à `n(n+1)/2`.

Vous pourriez *tester* cela. `n = 5` donne `0+1+2+3+4+5 = 15`, et `5 × 6 / 2 = 15`. ✓ Cela correspond. Essayez `n = 10` : la somme vaut `55`, et la formule donne `10 × 11 / 2 = 55`. ✓ (Ces valeurs ont été calculées et confirmées ; l'affirmation est d'ailleurs vraie pour tout `n` de 0 à 999 lorsqu'on la vérifie directement.)

Mais tester des valeurs, même un millier, ne permet jamais d'atteindre « pour **tout** nombre entier ». Il y en a une infinité. Une **preuve** comble cet écart infini par un argument fini, grâce à une technique appelée **récurrence** :

1. **Cas Base :** pour `n = 0`, la somme vaut simplement `0`, et la formule donne `0 × 1 / 2 = 0`. Elles concordent. ✓
2. **Étape de récurrence :** *supposez* que la formule est vraie pour un certain nombre `k`. Ajoutez maintenant le nombre suivant, `k+1`. La somme jusqu'à `k+1` vaut `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Une ligne d'algèbre la réarrange en `(k+1)(k+2)/2`, ce qui est exactement la formule avec `k+1` à la place de `k`. ✓

Puisqu'elle est vraie au départ (0) et que chaque étape la transmet au nombre suivant, elle est vraie pour **tous** les nombres entiers, pour toujours, en un seul argument fini. C'est cela, une preuve. Un assistant de preuve effectue exactement ce raisonnement, mais vérifie mécaniquement que chaque étape, y compris la « ligne d'algèbre », découle réellement de ce qui précède.

> Le saut à retenir : une preuve transforme « une infinité de cas » en un **argument fini et vérifiable**. C'est le super-pouvoir dont les tests sont structurellement dépourvus.

---

## 5. Où se trouvent réellement les bogues

La vérification formelle est puissante en partie grâce à une idée éclairante sur l'*origine* même des bogues. Toute faille dans un système de vérification de règles provient de l'un de ces trois endroits :

| Source d'un bogue | Ce que cela signifie | Peut-on l'éliminer par une preuve ? |
|---|---|---|
| **La spécification** | Les mathématiques ou les règles elles-mêmes sont erronées (une condition manquante, une mauvaise définition) | **Oui**, directement : c'est le terrain de prédilection de la vérification formelle |
| **L'implémentation** | Le code ne met pas fidèlement en œuvre une spécification correcte | En partie ; ces défaillances laissent souvent des traces détectables |
| **Une hypothèse invalide** | Un élément sur lequel repose tout le système s'avère faux | Non ; les hypothèses en sont le fondement irréductible |

Cette classification compte plus qu'il n'y paraît, et les parties 2 et 3 s'articulent autour d'elle. Les bogues les plus profonds et les plus dangereux, ceux qui peuvent rester cachés indéfiniment, se trouvent généralement dans la **spécification** : la description mathématique de ce que le système est censé faire. Or la spécification est précisément ce qu'une preuve vérifiée par machine peut examiner directement, pour tous les cas à la fois. C'est pourquoi les efforts sérieux de vérification formelle la ciblent en priorité.

![alt text](image-4.png)

---

## 6. La mise en garde la plus importante de tout le domaine

La vérification formelle est puissante, mais sa promesse est précise, et la comprendre de travers induit en erreur. Énonçons-la donc avec soin :

> **Une preuve garantit que le *système* respecte la *spécification*, sous des *hypothèses* énoncées. Rien de plus.**

Il en découle quatre conséquences, et chacune compte :

- **Si la spécification est erronée, la preuve ne vaut rien.** Si vous prouvez que « chaque porte se verrouille » alors que l'exigence réelle était que « chaque *fenêtre* se verrouille », vous avez prouvé, parfaitement, la mauvaise chose. La vérification contrôle que vous avez construit *ce que vous avez spécifié*, et non que vous avez spécifié la bonne chose.
- **Si une définition est subtilement mal formulée, la garantie se restreint discrètement.** Une preuve portant sur une définition légèrement erronée du « solde » peut établir moins que vous ne le pensez tout en passant toutes les vérifications. C'est pourquoi les définitions au cœur d'une vérification doivent être courtes, standard et ouvertement examinables par des humains.
- **Si les hypothèses ne tiennent pas, la garantie tombe.** Les preuves reposent sur des hypothèses (« le matériel de verrouillage n'est pas physiquement cassé »). Si une hypothèse est fausse dans la réalité, la conclusion n'est plus nécessairement vraie.
- **Cela ne signifie pas « jamais aucun bogue ».** Cela signifie « aucun bogue du type exclu par cette spécification, compte tenu de ces hypothèses ». Une affirmation plus étroite, plus honnête et bien plus utile.

Loin d'affaiblir la vérification formelle, cette précision fait sa force. Elle vous dit *exactement* ce que vous obtenez. Comme nous le verrons dans la partie 3, l'équipe Zcash, qui a énoncé clairement sa portée et ses hypothèses (« nous avons prouvé la solidité de l'offre, sous ces hypothèses nommées, et non la confidentialité »), est un modèle de cette honnêteté.

![alt text](image-5.png)

---

## 7. Un avertissement honnête

Pour que cet article reste lisible, nous avons simplifié. Les spécifications réelles sont rédigées dans des langages formels précis, et non en phrases courantes ; il existe plusieurs *styles* de vérification formelle (preuve interactive de théorèmes, vérification de modèles, méthodes fondées sur SMT) adaptés à différents problèmes ; et la rédaction de ces preuves reste un travail exigeant et spécialisé, même avec l'aide de l'IA. Nous avons également passé sous silence la manière dont un assistant de preuve représente la logique en interne. Rien de tout cela ne change l'essentiel : une spécification, un système et une preuve vérifiée par machine que les deux concordent, sous des hypothèses énoncées. Les détails reviendront lorsque nous en aurons besoin.

---

## 8. Résumé

- Les **tests** échantillonnent des entrées spécifiques et peuvent montrer qu'un bogue est présent, jamais que les bogues sont absents. Les bogues dangereux se cachent dans les cas que personne n'échantillonne.
- La **vérification formelle** prouve qu'une propriété est vraie pour **tous** les cas possibles, au moyen d'un argument fini et vérifiable.
- Toute vérification repose sur trois piliers : une **spécification** (ce que signifie « correct »), un **système** (la chose vérifiée) et une **preuve** qu'ils concordent, auxquels s'ajoute un **assistant de preuve** (comme **Lean**) qui vérifie chaque étape par machine.
- Une **preuve** (par exemple, par **récurrence**) réduit une infinité de cas à un seul argument fini.
- Les bogues se trouvent dans la **spécification**, l'**implémentation** ou une **hypothèse invalide**. La vérification formelle cible directement la spécification, là où se trouvent généralement les bogues les plus profonds et les mieux cachés.
- La garantie est précise : le système respecte **la spécification**, sous des **hypothèses énoncées**. Une spécification erronée, une définition mal formulée ou une hypothèse invalide l'annule, et elle ne signifie jamais « jamais aucun bogue ».

---

## Glossaire

| Terme | Signification en langage simple |
|---|---|
| **Formal verification** | Le fait de prouver mathématiquement qu'un système respecte une spécification dans tous les cas |
| **Specification** | Un énoncé précis de ce que signifie un « comportement correct » |
| **System** | Le programme, le circuit ou le protocole réellement vérifié |
| **Proof** | Une suite finie d'étapes logiques établissant une affirmation pour tous les cas |
| **Proof assistant / theorem prover** | Un logiciel (Lean, Rocq, Isabelle) qui vérifie chaque étape d'une preuve |
| **Machine-checked** | Contrôlé étape par étape par un ordinateur, et non par la seule lecture humaine |
| **Induction** | Une technique de preuve : vrai au départ, et chaque étape le transmet à la suivante |
| **Assumption** | Une condition sur laquelle repose la preuve ; si elle est fausse, la garantie peut ne pas tenir |

---

## FAQ

**La vérification formelle remplace-t-elle les tests ?**
Non. Elles se complètent. Les tests détectent à moindre coût les problèmes pratiques et les hypothèses erronées ; la vérification exclut des catégories entières de bogues que les tests pourraient ne jamais échantillonner.

**Si elle est si puissante, pourquoi tout n'est-il pas vérifié formellement ?**
Elle est coûteuse et exige des compétences spécialisées, même si l'assistance de l'IA en réduit le coût. Elle est réservée aux systèmes où un bogue rare serait catastrophique, ce qui est précisément là où son coût est rentabilisé.

**Un système vérifié formellement peut-il tout de même défaillir ?**
Oui, si la spécification était erronée, si une définition était mal formulée, si une hypothèse ne tenait pas ou si la défaillance se situe en dehors de ce qui a été spécifié. La preuve ne couvre que ce qu'elle prétend couvrir.

**Une preuve vérifiée par machine est-elle plus fiable qu'une preuve humaine ?**
Pour les preuves vastes et complexes, généralement oui. Une machine ne négligera pas une lacune subtile et n'acceptera pas un argument approximatif, même si elle fait toujours confiance à la spécification et aux définitions qui lui ont été fournies.

**Si l'IA aide à rédiger la preuve, pourquoi lui faire confiance ?**
Parce que l'assistant de preuve vérifie mécaniquement chaque étape. L'IA propose des étapes ; la machine les vérifie. Une étape erronée est tout simplement rejetée : l'IA accélère donc le travail sans affaiblir la garantie.

---

### Testez votre intuition

Vous prouvez que le logiciel d'une banque « ne laisse jamais le solde d'un compte devenir négatif ». Un an plus tard, de l'argent disparaît toujours. Comment ces deux faits peuvent-ils être vrais simultanément ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

La preuve garantissait exactement une propriété : les soldes ne deviennent jamais négatifs. De l'argent peut disparaître de façons que cette propriété n'a jamais abordées, par exemple un bogue qui transfère des fonds vers le mauvais compte (dont le solde reste positif ou nul), ou une faille dans une partie du système qui n'a jamais été spécifiée. La vérification a fait précisément ce qu'elle promettait, et rien de plus. C'est la mise en garde de la section 6 en action : une preuve couvre la spécification, et non toutes les notions imaginables de « correct ».
</details>

---

### La suite

**Partie 2 · Le bogue Orchard :** nous abordons en détail l'histoire réelle de 2026. Un système de confidentialité masquait les montants à l'aide de preuves cryptographiques, et une seule ligne sous-contrainte dans ses mathématiques permettait de faire mentir ces preuves, autorisant une contrefaçon invisible et illimitée. Nous verrons exactement ce que signifie « un circuit sous-contraint », pourquoi ce type de bogue peut rester caché indéfiniment, et pourquoi cela s'est produit plus d'une fois.

*Fait partie de la série* Vérification formelle *pour [ZecHub](https://zechub.org).*
