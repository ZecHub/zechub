![alt text](image-1.png)
# Ironwood : prouver que l’argent ne peut pas être contrefait

### Comment Zcash a répondu à un bug par une preuve vérifiée par machine

> **Série :** *Vérification formelle* · **Partie 3 sur 3**
> **Public :** débutants. Les parties 1 et 2 présentent la vérification formelle et le bug Orchard ; ce final montre la rencontre de ces deux idées dans un système réel. Tout le nécessaire sera rappelé au fil de l’article.
> **Ce que vous en retiendrez :** une compréhension exacte de ce que Zcash a réellement prouvé à propos de son nouveau pool « Ironwood », de la structure de cette preuve, de ce qu’elle couvre ou non, de la manière dont l’ancien pool a été retiré en toute sécurité, et de la raison pour laquelle cela ouvre la voie à une nouvelle norme pour construire une monnaie cryptographique.

Dans la partie 1, nous avons appris ce que signifie *prouver* qu’un système est correct. Dans la partie 2, nous avons découvert une faille réelle que les tests n’ont pas détectée pendant quatre ans : une multiplication sur courbe elliptique insuffisamment contrainte qui aurait pu permettre une contrefaçon invisible illimitée. Cet article en est la résolution : comment Zcash a réagi non seulement avec un correctif, mais avec une preuve vérifiée par machine que toute cette classe de bug a disparu.

---

## 1. Pourquoi devriez-vous vous en préoccuper ?

Lorsqu’un bug menace de l’argent, la réponse habituelle consiste à le corriger puis à passer à autre chose. Zcash a fait preuve d’une ambition plus grande. Avec un nouveau pool protégé nommé **Ironwood**, activé le 28 juillet 2026, ses ingénieurs ont publié une **preuve mathématique vérifiée par machine**, comportant plus de **2 700 théorèmes** écrits dans l’assistant de preuve **Lean**, établissant que le nouveau pool ne peut pas créer de pièces contrefaites selon les hypothèses énoncées. La preuve est publique, dans le dépôt open source `ironwood`, et sa réalisation a nécessité plus d’un mois de travail de trois équipes de chercheurs et cryptographes.

Cela compte au-delà de Zcash. C’est l’une des démonstrations concrètes les plus claires qu’il est possible de prendre un système financier en activité, d’écrire précisément ce que signifie « aucune contrefaçon », et de le *prouver*, plutôt que d’espérer que les tests aient été exhaustifs. Cela transforme une promesse en théorème.

---

## 2. L’idée centrale : prouver la spécification, éliminer la classe de bug

La partie 2 s’est achevée sur l’idée qui a rendu cela possible. Rappelons-la, car tout ce qui suit en dépend :

> Un bug de contrefaçon *indétectable* ne peut exister que dans la **spécification** du protocole, la description mathématique de ce que le circuit doit imposer. Toute contrefaçon détectable apparaîtrait dans la comptabilité publique. Ainsi, prouver que la spécification est saine élimine d’un coup toute la classe des bugs de contrefaçon cachée.

Pourquoi « uniquement dans la spécification » ? Parce que chaque bloc enregistre de façon permanente le contenu complet de chaque transaction, y compris ses preuves. Si le *logiciel* acceptait à tort une mauvaise transaction, n’importe qui pourrait rejouer l’historique avec un logiciel corrigé et la détecter. Cette preuve est permanente et publique. Seule une faille dans les *mathématiques* sous-jacentes peut rester cachée indéfiniment, car il n’existe pas de « version correcte » avec laquelle rejouer l’historique. C’est précisément cette faille que vise la vérification formelle.

Les tests vérifient le *comportement sur des entrées échantillonnées*, et le bug Orchard est resté caché précisément parce qu’aucune entrée échantillonnée ne l’a déclenché. Une preuve portant sur la spécification couvre simultanément **toutes** les entrées, y compris les cas limites auxquels personne ne penserait à recourir. C’est le seul type de garantie suffisamment solide pour retirer avec confiance une faille invisible vieille de quatre ans.

![alt text](image-2.png)

---

## 3. Ce qui a été prouvé exactement

La preuve établit une propriété principale, fondée sur une propriété plus profonde.

### Intégrité du solde (la propriété principale)

> **Intégrité du solde :** la valeur cachée stockée dans le pool protégé ne dépasse jamais la valeur publique nette qui y a afflué.

C’est la propriété anti-contrefaçon sous une forme simple. De l’argent peut entrer dans le pool protégé (de manière publiquement visible) et en sortir (de manière publiquement visible), mais à l’intérieur, où les montants sont cachés, aucune valeur ne peut être créée de toutes pièces. Rendons cela concret avec un petit registre (arithmétique vérifiée) :

- **Transaction honnête :** des entrées d’une valeur de `5 + 3 = 8` produisent des sorties d’une valeur de `4 + 4 = 8`. La valeur entrante égale la valeur sortante. L’intégrité du solde est respectée. ✓
- **Tentative de contrefaçon :** les mêmes entrées d’une valeur de `8`, mais des sorties de `4 + 4 + 2 = 10`. Cela créerait `2` unités à partir de rien. L’intégrité du solde **interdit** cela : le pool ne peut jamais verser plus que ce qui y est entré. ✗

L’intégrité du solde est l’énoncé mathématique selon lequel le second scénario ne peut jamais produire une transaction valide.

### Solidité de connaissance (le moteur sous-jacent)

Pour garantir l’intégrité du solde, les chercheurs ont d’abord dû prouver une propriété plus profonde et plus subtile du système de preuve à divulgation nulle de connaissance lui-même. La solidité ordinaire (le principe de la partie 2 selon lequel « seuls les énoncés vrais ont un témoin ») s’avère *insuffisante* pour un pool protégé, pour une raison fascinante : puisqu’une transaction cachée peut contenir n’importe quoi, presque tout énoncé possède techniquement *un* témoin. Les chercheurs ont donc prouvé une propriété plus forte :

> **Solidité de connaissance :** toute personne capable de produire une preuve de transaction valide doit *effectivement posséder* un témoin valide, c’est-à-dire de vraies pièces, correctement dérivées, à la bonne adresse.

L’outil formel employé est un **extracteur** : une procédure qui, à partir de tout prouveur capable de convaincre le vérificateur, peut en extraire le véritable témoin. Si un témoin peut toujours être extrait, alors un prouveur convaincant doit réellement en avoir eu un. Dans le langage de la partie 2, la solidité de connaissance est la promesse formelle qu’il n’existe **aucune faille de solidité**, aucune contrainte manquante permettant à un énoncé faux de passer. C’est exactement la propriété dont l’*absence* constituait le bug Orchard. Prouver sa présence, pour tous les prouveurs possibles, ferme définitivement cette porte.

![alt text](image-3.png)

---

## 4. Comment la preuve a été construite

La vérification a représenté un effort humain sérieux, et non le résultat d’une simple pression sur un bouton :

- Écrite dans l’assistant de preuve **Lean** (vu dans la partie 1 : une machine qui vérifie chaque étape logique).
- Composée de **plus de 2 700 théorèmes**, disponibles publiquement dans le dépôt `ironwood`.
- Produite par **trois équipes** de chercheurs et cryptographes pendant **plus d’un mois**, notamment dans le cadre de travaux menés par Tal Derei de Project Tachyon, avec des contributions de Gregor Mitscha-Baude de zkSecurity et de Daira-Emma Hopwood du Open Development Lab de Zcash, ainsi qu’une preuve parallèle indépendante de solidité réalisée par d’autres cryptographes.

Pour raisonner sur cette propriété, le modèle Lean décrit un **registre** entier comme une liste de transactions, chacune portant ses actions, sa valeur publique déclarée et ses signatures. Un prédicat que les chercheurs appellent **ValidLedger** retranscrit directement les règles de consensus du réseau : le témoin de chaque action doit satisfaire aux conditions requises, aucun marqueur de dépense (nullifier) ne peut apparaître deux fois, chaque état d’arbre référencé doit être un état réellement atteint par le système, et chaque signature doit être vérifiée. Les théorèmes quantifient ensuite sur **tout** registre valide. Cette expression, « tout registre valide », est l’essentiel : non pas un échantillon, mais tous les registres, un ensemble qui englobe tout ce qu’un véritable attaquant pourrait jamais assembler.

Le résultat d’intégrité du solde est composé de plusieurs théorèmes au niveau du registre, chacun démontrant qu’une voie vers la contrefaçon est fermée : chaque dépense correspond à une véritable sortie antérieure, la valeur totale est conservée, une note reçue reste dépensable et ne peut être volée, et toute dépense nécessite une autorisation correcte. Un élément distinct, la **signature de liaison**, relie les valeurs cachées de chaque transaction au montant public qu’elle déclare, afin que les comptabilités cachée et publique ne puissent pas discrètement diverger.

---

## 5. Là où les mathématiques rencontrent le logiciel

Une question subtile et honnête se pose : la preuve porte sur un modèle mathématique, mais le réseau exécute du *code Rust*. Comment savons-nous que le code correspond au modèle ?

L’équipe a tracé une frontière soigneuse qu’elle appelle l’**empreinte** du vérificateur. Au-dessus de cette frontière, les preuves Lean raisonnent sur le vérificateur comme sur un objet mathématique précis. En dessous se trouve l’implémentation Rust ordinaire. L’argument clé est le même que dans la partie 2 :

> Toute manière dont le logiciel réel pourrait s’écarter du modèle prouvé constituerait un bug d’*implémentation*, et les bugs d’implémentation ne peuvent produire qu’une contrefaçon *détectable*, car toute preuve acceptée est enregistrée de façon permanente et peut être rejouée avec un logiciel corrigé.

La preuve traite donc la classe indétectable (la spécification), et le registre public permanent traite la classe détectable (l’implémentation). Entre les deux, il ne reste aucun endroit où un bug de contrefaçon *indétectable* puisse se cacher. L’équipe a également effectué une vérification croisée en exécutant le véritable vérificateur et en confirmant qu’il reproduisait exactement l’empreinte sur des cas capturés.

---

## 6. La réserve la plus importante : « selon les hypothèses énoncées »

La partie 1 insistait sur le fait qu’une preuve garantit que le système satisfait la spécification *selon les hypothèses énoncées*, et ne signifie jamais « aucun bug ne se produira jamais ». L’équipe de Zcash a été admirablement précise sur ce point, et une rédaction pédagogique honnête doit l’être également.

La preuve ramène la sécurité d’Ironwood à un petit ensemble d’hypothèses standard, clairement nommées. En particulier, sa solidité repose sur la difficulté du **problème du logarithme discret** sur la courbe elliptique utilisée par Ironwood (une hypothèse bien étudiée, pour laquelle la meilleure attaque connue nécessiterait de l’ordre de `2^126` opérations, bien au-delà de tout calcul réalisable), ainsi que sur des hypothèses de modélisation standard pour la fonction de hachage. Deux limites méritent d’être clairement énoncées :

- **Elle tient sous ces hypothèses cryptographiques.** Si une hypothèse fondamentale était invalidée, la garantie disparaîtrait. Cela est standard et inévitable ; pratiquement toute cryptographie déployée repose sur de telles hypothèses.
- **Elle couvre l’intégrité du solde, et non la confidentialité.** La preuve porte sur la solidité de l’offre monétaire (pas de faux argent). Elle ne prétend **pas** prouver les garanties de confidentialité distinctes du pool, qui constituent une propriété différente avec des arguments différents.

Loin de diminuer cette réalisation, le fait de nommer ces limites est ce qui la rend digne de confiance. L’affirmation est précise : *selon des hypothèses cryptographiques standard, ce pool ne peut pas créer de pièces contrefaites indétectables.* C’est un théorème, pas un espoir, et son périmètre exact est énoncé ouvertement.

![alt text](image-4.png)

---

## 7. Retirer l’ancien pool en toute sécurité : le tourniquet

Prouver que le *nouveau* pool est sain laisse encore une question : qu’en est-il de l’ancien pool Orchard, où la faille a existé pendant quatre ans ? Il est impossible de révéler son passé. Mais il est possible d’en limiter l’avenir.

Zcash a introduit un mécanisme appelé le **tourniquet**. La règle est simple et puissante :

> La valeur ne peut quitter l’ancien pool qu’à hauteur du montant dont l’entrée peut être vérifiée.

Puisque les fonds entrant dans un pool protégé et en sortant sont publiquement visibles (seule l’activité *à l’intérieur* est cachée), le tourniquet permet à l’ensemble du réseau de vérifier qu’il n’en sort pas davantage qu’il n’y est jamais entré. Si des pièces contrefaites avaient été créées dans l’ancien pool, elles atteindraient ce plafond et ne pourraient pas en sortir. Et à mesure que les fonds honnêtes migrent vers l’extérieur sans qu’aucun excédent n’apparaisse, la communauté obtient une solide preuve publique que la faille n’a jamais été exploitée. C’est ce qui se rapproche le plus d’un audit de l’offre d’un pool privé sans compromettre sa confidentialité, et cela rapproche l’intégrité de l’offre du modèle transparent d’une chaîne comme Bitcoin tout en préservant la confidentialité de Zcash.

![alt text](image-5.png)

Ironwood réutilise lui-même le circuit de preuve *corrigé*, repart avec un pool vide et ajoute des protections tournées vers l’avenir (notamment des dispositions permettant aux fonds de rester récupérables si de futurs ordinateurs quantiques venaient un jour à menacer la cryptographie actuelle). La nouvelle activité protégée passe désormais par Ironwood, tandis que l’ancien pool Orchard est limité aux retraits.

---

## 8. Une vision plus large : la cryptographie à haute assurance

Ironwood s’inscrit dans une évolution plus large de la manière dont Zcash construit ses systèmes. Son effort de mise à l’échelle de nouvelle génération (une architecture appelée **Tachyon**, fondée sur des preuves récursives et une boîte à outils appelée **Ragu**) est développé selon une philosophie parfois appelée **cryptographie à haute assurance** : considérer la vérification formelle par machine non comme une réflexion après coup, mais comme une partie standard de la mise en production de systèmes cryptographiques novateurs.

La logique est convaincante. La cryptographie de pointe est précisément le domaine où l’intuition humaine est la plus faible et où un cas limite subtil, non testé, peut rester caché pendant des années, comme l’a montré Orchard. Prouver la spécification est la seule technique qui s’étend à « toutes les entrées possibles » et qui ferme ces lacunes par construction. L’équipe a indiqué son intention d’étendre progressivement cet examen approfondi, vers l’implémentation et au-delà. Attendez-vous à voir cette exigence être adoptée plus largement, dans et au-delà de Zcash.

---

## 9. Une mise en garde honnête

Nous avons simplifié pour des raisons de clarté. Le développement Lean réel est bien plus détaillé que l’esquisse présentée ici, avec des définitions précises des actions, énoncés, engagements, nullifiers et signatures ; « intégrité du solde » et « solidité de connaissance » possèdent des définitions formelles exactes que nous n’avons formulées qu’en mots ; la réduction à la difficulté du logarithme discret passe par plusieurs modèles intermédiaires (un modèle algébrique du prouveur et un modèle d’oracle aléatoire du hachage), que nous avons condensés sous l’expression « hypothèses standard » ; et nous avons décrit l’empreinte et le tourniquet à un niveau conceptuel. Rien de cela ne change l’histoire essentielle : une spécification de « pas de contrefaçon », une preuve vérifiée par machine sur tous les registres valides, un énoncé explicite et honnête du périmètre et des hypothèses, ainsi qu’un retrait sûr du pool défectueux. Pour la présentation faisant autorité, consultez les textes de vérification publiés par Project Tachyon et le dépôt de preuves `ironwood`.

---

## 10. Résumé

- Zcash a répondu au bug Orchard non seulement par un correctif, mais par une **preuve vérifiée par machine** (plus de **2 700 théorèmes** dans **Lean**, disponibles publiquement) pour son nouveau pool **Ironwood**.
- La preuve établit l’**intégrité du solde** (le pool ne verse jamais plus que ce qui y est entré publiquement), fondée sur la **solidité de connaissance** (une preuve valide exige que le prouveur détienne réellement un témoin authentique, vérifié grâce à un **extracteur**). La solidité de connaissance est exactement la propriété dont la lacune constituait le bug Orchard.
- Elle raisonne sur **tout registre valide**, et non sur des cas échantillonnés, ce qui ferme la classe de bugs de contrefaçon cachée que les tests n’ont pas détectée.
- L’écart entre les mathématiques et le logiciel est traité par une frontière d’**empreinte** : la preuve exclut les bugs indétectables, et tout écart d’implémentation serait **détectable** dans le registre public permanent.
- La garantie est énoncée précisément : elle tient sous les hypothèses de **difficulté du logarithme discret et de hachage standard**, et elle couvre la **contrefaçon, non la confidentialité**. Cette honnêteté est une force, non une faiblesse.
- Le **tourniquet** retire l’ancien pool en toute sécurité en plafonnant ses sorties à ses dépôts vérifiables, révélant toute contrefaçon et établissant une preuve publique de l’intégrité de l’offre.
- Ironwood reflète une évolution vers la **cryptographie à haute assurance**, où la vérification formelle est une partie standard de la construction d’une monnaie cryptographique novatrice.

---

## Glossaire

| Terme | Signification en langage clair |
|---|---|
| **Ironwood** | Le nouveau pool protégé de Zcash (2026), qui remplace le pool Orchard défectueux |
| **Intégrité du solde** | Le pool ne verse jamais plus de valeur que ce qui y est entré publiquement |
| **Solidité de connaissance** | Une preuve valide exige que le prouveur détienne un témoin authentique |
| **Extracteur** | Une procédure qui extrait le témoin de tout prouveur convaincant |
| **Lean** | L’assistant de preuve utilisé pour vérifier la preuve par machine |
| **ValidLedger** | Le modèle formel des règles de consensus sur lequel raisonnent les théorèmes |
| **Empreinte** | La frontière entre les mathématiques prouvées et le logiciel Rust exécuté |
| **Selon les hypothèses énoncées** | La preuve tient à condition que les hypothèses cryptographiques nommées soient valides |
| **Tourniquet** | Une règle plafonnant les sorties d’un pool à ses dépôts vérifiables |
| **Cryptographie à haute assurance** | Construire de la cryptographie en faisant de la vérification formelle une étape standard |

---

## FAQ

**La preuve signifie-t-elle qu’Ironwood est exempt de bugs ?**
Non, et elle ne prétend pas cela. Elle prouve une propriété précise, l’intégrité du solde, selon les hypothèses énoncées. Cela exclut la contrefaçon indétectable, mais pas tous les bugs imaginables.

**La preuve garantit-elle que mes transactions sont privées ?**
Non. La vérification couvre la solidité de l’offre monétaire (pas de faux argent), et non les garanties de confidentialité distinctes du pool. Celles-ci sont établies différemment.

**Pourquoi faire confiance à une preuve écrite par des humains (et une IA) ?**
Parce qu’elle est vérifiée par machine. L’assistant de preuve Lean vérifie mécaniquement chaque étape, de sorte que la confiance repose sur la spécification et les hypothèses nommées, et non sur le soin d’un humain ou d’une IA à chaque étape.

**Qu’arrive-t-il aux pièces qui se trouvent encore dans l’ancien pool Orchard ?**
Elles peuvent être retirées, mais uniquement à hauteur du montant dont l’entrée peut être vérifiée, conformément au tourniquet. Cela protège à la fois l’intégrité de l’offre et aide à démontrer que l’ancienne faille n’a jamais été exploitée.

**Est-ce la fin de l’histoire ?**
C’est une étape importante, pas une ligne d’arrivée. L’architecture future de Zcash (Tachyon, avec la boîte à outils Ragu) est construite avec la vérification formelle comme pratique standard, afin d’étendre davantage cette approche.

---

### Testez votre intuition

Quelqu’un affirme : « Puisqu’Ironwood est formellement vérifié, il est désormais impossible que quoi que ce soit tourne mal un jour avec Zcash. » En vous appuyant sur les idées des trois parties, donnez deux raisons distinctes pour lesquelles cette affirmation est trop forte. *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Premièrement, la preuve couvre une propriété *spécifique* (l’intégrité du solde) selon des *hypothèses énoncées* (la difficulté du logarithme discret et une modélisation standard du hachage). Si une hypothèse cryptographique était invalidée, ou si un problème survenait en dehors de ce qui a été spécifié (par exemple dans la confidentialité, dans le logiciel de wallet ou dans un composant non prouvé), la preuve n’en dirait rien. Deuxièmement, la vérification formelle garantit que le système respecte *la spécification qui a été écrite* ; si cette spécification elle-même ne capturait pas une exigence réelle, la preuve certifierait fidèlement la mauvaise chose. Ces deux points reformulent la réserve de la partie 1 : une preuve est exacte et limitée, puissante précisément parce que son périmètre est honnête, et non une garantie générale que rien ne pourra jamais mal tourner.
</details>

---

### La série complète

Au fil de trois parties, nous sommes passés d’une idée générale à une application en activité : ce que signifie **prouver** qu’un logiciel est correct plutôt que le tester (partie 1), comment un véritable circuit insuffisamment contraint aurait pu créer de l’argent invisible (partie 2), et comment une preuve d’**intégrité du solde** vérifiée par machine a définitivement éliminé cette classe de bug (partie 3). Le fil conducteur est une promesse unique et honnête : non pas « aucun bug, jamais », mais « cette propriété précise est valable dans tous les cas, selon les hypothèses énoncées ». Pour une monnaie qui cache ses propres montants, c’est exactement la promesse qui mérite d’être prouvée.

*Fait partie de la série* Formal Verification  *pour [ZecHub](https://zechub.org).*
