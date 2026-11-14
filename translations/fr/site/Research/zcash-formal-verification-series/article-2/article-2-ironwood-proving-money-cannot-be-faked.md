![alt text](image-1.png)
# Ironwood : prouver que la monnaie ne peut pas être contrefaite

### Comment Zcash a répondu à un bug par une preuve vérifiée par machine

> **Série :** *Vérification formelle* · **Partie 3 sur 3**
> **Public :** débutants. Les parties 1 et 2 ont présenté la vérification formelle et le bug Orchard ; ce dernier volet montre comment ces deux idées se rejoignent dans un système réel. Tout ce dont vous avez besoin est rappelé au fil du texte.
> **Ce que vous en retirerez :** une compréhension exacte de ce que Zcash a réellement prouvé au sujet de son nouveau pool « Ironwood », de la structure de la preuve, de ce qu'elle couvre et ne couvre pas, de la manière dont l'ancien pool a été retiré en toute sécurité, et des raisons pour lesquelles tout cela annonce une nouvelle norme pour la conception de la monnaie cryptographique.

Dans la partie 1, nous avons vu ce que signifie *prouver* qu'un système est correct. Dans la partie 2, nous avons découvert une faille réelle que les tests n'ont pas détectée pendant quatre ans : une multiplication sur courbe elliptique insuffisamment contrainte qui aurait pu permettre une contrefaçon invisible et illimitée. Cet article en est le dénouement : comment Zcash a répondu non pas simplement par un correctif, mais par une preuve vérifiée par machine que toute cette catégorie de bugs a disparu.

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Lorsqu'un bug menace de l'argent, la réponse habituelle consiste à le corriger et à passer à autre chose. Zcash a fait quelque chose de plus ambitieux. En parallèle d'un nouveau pool protégé appelé **Ironwood**, activé le 28 juillet 2026, ses ingénieurs ont publié une **preuve mathématique vérifiée par machine**, composée de plus de **2 700 théorèmes** écrits dans l'assistant de preuve **Lean**, établissant que le nouveau pool ne peut pas créer de pièces contrefaites sous les hypothèses énoncées. La preuve est publique, dans le dépôt open source `ironwood`, et sa réalisation a demandé bien plus d'un mois de travail à trois équipes de chercheurs et de cryptographes.

Cela dépasse le cadre de Zcash. Il s'agit de l'une des démonstrations concrètes les plus claires qu'il est possible de prendre un système financier en production, d'écrire précisément ce que signifie « aucune contrefaçon » et de le *prouver*, plutôt que d'espérer que vos tests étaient exhaustifs. Une promesse devient ainsi un théorème.

---

## 2. L'idée centrale : prouver la spécification, éliminer la catégorie de bugs

La partie 2 s'est conclue sur l'idée qui a rendu cela possible. Rappelons-la, car tout ce qui suit repose sur elle :

> Un bug de contrefaçon *indétectable* ne peut se trouver que dans la **spécification** du protocole, c'est-à-dire la description mathématique de ce que le circuit doit imposer. Tout ce qui est détectable apparaîtrait dans la comptabilité publique. Prouver la solidité de la spécification élimine donc d'un seul coup toute la catégorie des bugs de contrefaçon cachée.

Pourquoi « uniquement dans la spécification » ? Parce que chaque bloc enregistre de façon permanente le contenu complet de chaque transaction, y compris ses preuves. Si le *logiciel* acceptait à tort une transaction invalide, n'importe qui pourrait rejouer l'historique avec un logiciel corrigé et s'en apercevoir. Cette trace est permanente et publique. Seule une faille dans les *mathématiques* sous-jacentes peut rester cachée pour toujours, car il n'existe aucune « version correcte » avec laquelle rejouer l'historique. C'est précisément ce type de faille que vise la vérification formelle.

Les tests vérifient le *comportement sur des entrées échantillonnées*, et le bug Orchard est resté caché justement parce qu'aucune entrée échantillonnée ne l'a déclenché. Une preuve portant sur la spécification couvre **toutes** les entrées simultanément, y compris les cas limites que personne n'aurait pensé à essayer. C'est le seul type de garantie suffisamment solide pour écarter en toute confiance une faille invisible vieille de quatre ans.

![alt text](image-2.png)

---

## 3. Ce qui a été prouvé exactement

La preuve établit une seule propriété phare, construite à partir d'une propriété plus profonde qui la sous-tend.

### L'intégrité des soldes (la propriété phare)

> **Intégrité des soldes :** la valeur cachée stockée dans le pool protégé ne dépasse jamais la valeur publique nette qui y est entrée.

Il s'agit de la propriété anti-contrefaçon sous sa forme la plus simple. L'argent peut entrer dans le pool protégé (de manière publiquement visible) et en sortir (de manière publiquement visible), mais à l'intérieur, là où les montants sont cachés, aucune valeur ne peut apparaître de nulle part. Rendons cela concret avec un minuscule registre (calculs vérifiés) :

- **Transaction honnête :** des entrées d'une valeur de `5 + 3 = 8` produisent des sorties d'une valeur de `4 + 4 = 8`. La valeur entrante est égale à la valeur sortante. L'intégrité des soldes est respectée. ✓
- **Tentative de contrefaçon :** les mêmes entrées d'une valeur de `8`, mais des sorties de `4 + 4 + 2 = 10`. Cela créerait `2` unités à partir de rien. L'intégrité des soldes **l'interdit** : le pool ne peut jamais verser plus que ce qui y est entré. ✗

L'intégrité des soldes est l'énoncé mathématique selon lequel le second scénario ne peut jamais produire une transaction valide.

### La solidité de la connaissance (le moteur sous-jacent)

Pour garantir l'intégrité des soldes, les chercheurs ont d'abord dû prouver une propriété plus profonde et plus subtile concernant le système de preuve à divulgation nulle de connaissance lui-même. La solidité ordinaire (le « seuls les énoncés vrais ont un témoin » de la partie 2) se révèle *insuffisante* pour un pool protégé, pour une raison fascinante : comme une transaction cachée peut contenir n'importe quoi, presque tout énoncé *possède* techniquement un témoin. Les chercheurs ont donc prouvé une propriété plus forte :

> **Solidité de la connaissance :** quiconque est capable de produire une preuve de transaction valide doit *réellement posséder* un témoin valide, c'est-à-dire de vraies pièces, correctement dérivées, à la bonne adresse.

L'outil formel utilisé pour cela est un **extracteur** : une procédure qui, face à n'importe quel prouveur capable de convaincre le vérificateur, peut extraire de lui le témoin réel. Si un témoin peut toujours être extrait, alors un prouveur convaincant devait réellement en posséder un. Dans le langage de la partie 2, la solidité de la connaissance est la promesse formelle qu'il n'existe **aucune lacune de solidité**, aucune contrainte manquante qui permettrait à un énoncé faux de passer. C'est exactement la propriété dont l'*absence* constituait le bug Orchard. Prouver sa présence, pour tous les prouveurs possibles, est ce qui referme définitivement cette porte.

![alt text](image-3.png)

---

## 4. Comment la preuve a été construite

La vérification a représenté un effort humain considérable, et non un résultat obtenu en appuyant sur un bouton :

- Rédigée dans l'assistant de preuve **Lean** (vu dans la partie 1 : une machine qui vérifie chaque étape logique).
- Composée de **plus de 2 700 théorèmes**, accessibles publiquement dans le dépôt `ironwood`.
- Réalisée par **trois équipes** de chercheurs et de cryptographes pendant **plus d'un mois**, avec notamment des travaux dirigés par Tal Derei du projet Tachyon, des contributions de Gregor Mitscha-Baude de zkSecurity et de Daira-Emma Hopwood de l'Zcash Open Development Lab, ainsi qu'une preuve de solidité indépendante menée en parallèle par d'autres cryptographes.

Pour raisonner sur cette propriété, le modèle Lean décrit un **registre** complet sous la forme d'une liste de transactions, chacune portant ses actions, sa valeur publique déclarée et ses signatures. Un prédicat que les chercheurs appellent **ValidLedger** transcrit directement les règles de consensus du réseau : le témoin de chaque action doit satisfaire les conditions requises, aucun marqueur de dépense (nullifier) ne peut apparaître deux fois, chaque état d'arbre référencé doit être un état que le système a réellement atteint, et chaque signature doit être valide. Les théorèmes portent ensuite sur **tous** les registres valides. Cette expression, « tous les registres valides », est tout l'enjeu : non pas un échantillon, mais la totalité d'entre eux, un ensemble englobant tout ce qu'un véritable attaquant pourrait jamais assembler.

Le résultat d'intégrité des soldes est assemblé à partir de plusieurs théorèmes portant sur le registre, chacun prouvant qu'une voie vers la contrefaçon est fermée : chaque dépense correspond à une sortie antérieure réelle, la valeur totale est conservée, une note reçue reste dépensable et ne peut pas être volée, et toute dépense exige une autorisation en bonne et due forme. Un élément distinct, la **signature de liaison**, relie les valeurs cachées de chaque transaction au montant public qu'elle déclare, de sorte que la comptabilité cachée et la comptabilité publique ne puissent pas diverger silencieusement.

---

## 5. Là où les mathématiques rencontrent le logiciel

Une question subtile et légitime : la preuve porte sur un modèle mathématique, mais le réseau exécute du *code Rust*. Comment savoir que le code correspond au modèle ?

L'équipe a tracé une frontière soigneuse qu'elle appelle l'**empreinte** du vérificateur. Au-dessus de cette frontière, les preuves Lean raisonnent sur le vérificateur en tant qu'objet mathématique précis. En dessous se trouve l'implémentation Rust ordinaire. L'argument clé est le même que dans la partie 2 :

> Toute manière dont le logiciel réel pourrait s'écarter du modèle prouvé serait un bug d'*implémentation*, et les bugs d'implémentation ne peuvent jamais produire qu'une contrefaçon *détectable*, car chaque preuve acceptée est enregistrée de façon permanente et peut être rejouée avec un logiciel corrigé.

La preuve traite donc la catégorie indétectable (la spécification), et l'enregistrement public permanent traite la catégorie détectable (l'implémentation). Entre les deux, il ne reste aucun endroit où un bug de contrefaçon *indétectable* pourrait se cacher. L'équipe a également effectué des vérifications croisées en exécutant le vérificateur réel et en confirmant qu'il reproduit exactement l'empreinte sur des cas capturés.

---

## 6. La réserve la plus importante : « sous les hypothèses énoncées »

La partie 1 insistait sur le fait qu'une preuve garantit que le système respecte la spécification *sous les hypothèses énoncées*, et ne signifie jamais « aucun bug, jamais ». L'équipe de Zcash a fait preuve d'une précision remarquable sur ce point, et un texte pédagogique honnête doit en faire autant.

La preuve ramène la sécurité de Ironwood à un petit ensemble d'hypothèses standard, clairement nommées. En particulier, sa solidité repose sur la difficulté du **problème du logarithme discret** sur la courbe elliptique qu'utilise Ironwood (une hypothèse bien étudiée, pour laquelle la meilleure attaque connue exigerait de l'ordre de `2^126` opérations, bien au-delà de tout calcul réalisable), ainsi que sur des hypothèses de modélisation standard pour la fonction de hachage. Deux limites méritent d'être énoncées clairement :

- **Elle est valable sous ces hypothèses cryptographiques.** Si une hypothèse fondamentale était brisée, la garantie tomberait. C'est la norme et c'est inévitable : pratiquement toute la cryptographie déployée repose sur de telles hypothèses.
- **Elle couvre l'intégrité des soldes, pas la confidentialité.** La preuve porte sur la solidité de la masse monétaire (pas de fausse monnaie). Elle ne prétend **pas** prouver les garanties de confidentialité du pool, qui constituent une propriété distincte reposant sur des arguments différents.

Loin d'affaiblir cette réussite, le fait de nommer ces limites est précisément ce qui la rend digne de confiance. L'affirmation est exacte : *sous des hypothèses cryptographiques standard, ce pool ne peut pas créer de pièces contrefaites indétectables.* C'est un théorème, pas un espoir, et sa portée précise est énoncée ouvertement.

![alt text](image-4.png)

---

## 7. Retirer l'ancien pool en toute sécurité : le sas comptable

Prouver la solidité du *nouveau* pool laisse encore une question en suspens : qu'en est-il de l'*ancien* pool Orchard, où la faille a existé pendant quatre ans ? Il est impossible de révéler son passé. Mais il est possible d'encadrer son avenir.

Zcash a introduit un mécanisme appelé **sas comptable**. La règle est simple et puissante :

> La valeur ne peut sortir de l'ancien pool qu'à hauteur du montant qui y est entré de manière vérifiable.

Comme les fonds qui entrent dans un pool protégé et en sortent sont publiquement visibles (seule l'activité *à l'intérieur* est cachée), le sas comptable permet à l'ensemble du réseau de vérifier qu'il ne sort jamais plus que ce qui est entré. Si des pièces contrefaites avaient été créées dans l'ancien pool, elles se heurteraient à ce plafond et ne pourraient pas sortir. Et à mesure que les fonds honnêtes migrent hors du pool sans qu'aucun excédent n'apparaisse, la communauté obtient une preuve publique solide que la faille n'a jamais été exploitée. C'est ce qui se rapproche le plus d'un audit de la masse monétaire d'un pool privé sans en compromettre la confidentialité, et cela rapproche l'intégrité de la masse monétaire du modèle transparent d'une chaîne comme Bitcoin, tout en préservant la confidentialité de Zcash.

![alt text](image-5.png)

Ironwood lui-même réutilise le circuit de preuve *corrigé*, repart de zéro avec un pool vide et ajoute des protections tournées vers l'avenir (notamment des dispositions permettant aux fonds de rester récupérables si de futurs ordinateurs quantiques venaient à menacer la cryptographie actuelle). La nouvelle activité protégée passe désormais par Ironwood, tandis que l'ancien pool Orchard est limité aux retraits.

---

## 8. Une vision plus large : la cryptographie à haute assurance

Ironwood s'inscrit dans une évolution plus large de la manière dont Zcash conçoit ses systèmes. Son effort de mise à l’échelle de nouvelle génération (une architecture appelée **Tachyon**, fondée sur des preuves récursives et une boîte à outils appelée **Ragu**) est développé selon une philosophie parfois appelée **cryptographie à haute assurance** : considérer la vérification formelle par machine non pas comme une réflexion après coup, mais comme une étape standard de la mise en production de systèmes cryptographiques inédits.

La logique est convaincante. La cryptographie de pointe est précisément le domaine où l'intuition humaine est la plus faible et où un cas limite subtil et non testé peut rester caché pendant des années, comme l'a montré Orchard. Prouver la spécification est la seule technique qui s'étend à « toutes les entrées possibles » et qui comble ces lacunes par construction. L'équipe a indiqué son intention d'étendre progressivement cet examen, vers l'implémentation et au-delà. Attendez-vous à voir cette exigence adoptée plus largement, au sein de Zcash et au-delà.

---

## 9. Un avertissement honnête

Nous avons simplifié par souci de clarté. Le véritable développement en Lean est bien plus détaillé que l'esquisse présentée ici, avec des définitions précises des actions, des énoncés, des engagements, des nullifiers et des signatures ; « l'intégrité des soldes » et « la solidité de la connaissance » ont des définitions formelles exactes que nous n'avons énoncées qu'avec des mots ; la réduction à la difficulté du logarithme discret passe par plusieurs modèles intermédiaires (un modèle algébrique du prouveur et un modèle d'oracle aléatoire pour le hachage) que nous avons résumés par « hypothèses standard » ; et nous avons décrit l'empreinte et le sas comptable à un niveau conceptuel. Rien de tout cela ne change l'essentiel : une spécification de « l'absence de contrefaçon », une preuve vérifiée par machine portant sur tous les registres valides, un énoncé explicite et honnête de la portée et des hypothèses, et un retrait sécurisé du pool défaillant. Pour un compte rendu faisant autorité, consultez les rapports de vérification publiés par le projet Tachyon et le dépôt de preuves `ironwood`.

---

## 10. Résumé

- Zcash a répondu au bug Orchard non seulement par un correctif, mais par une **preuve vérifiée par machine** (plus de **2 700 théorèmes** en **Lean**, accessibles publiquement) pour son nouveau pool **Ironwood**.
- La preuve établit l'**intégrité des soldes** (le pool ne verse jamais plus que ce qui y est entré publiquement), qui repose sur la **solidité de la connaissance** (une preuve valide exige que le prouveur détienne réellement un témoin authentique, ce que vérifie un **extracteur**). La solidité de la connaissance est exactement la propriété dont la lacune constituait le bug Orchard.
- Elle raisonne sur **tous les registres valides**, et non sur des cas échantillonnés, ce qui ferme la catégorie des bugs de contrefaçon cachée que les tests n'avaient pas détectés.
- L'écart entre les mathématiques et le logiciel est traité par une frontière d'**empreinte** : les bugs indétectables sont exclus par la preuve, et tout écart d'implémentation serait **détectable** dans l'enregistrement public permanent.
- La garantie est énoncée avec précision : elle est valable sous les **hypothèses de difficulté du logarithme discret et les hypothèses standard sur le hachage**, et elle couvre **la contrefaçon, pas la confidentialité**. Cette honnêteté est une qualité, pas une faiblesse.
- Le **sas comptable** retire l'ancien pool en toute sécurité en plafonnant ses sorties à ses dépôts vérifiables, ce qui exposerait toute contrefaçon et constitue une preuve publique de l'intégrité de la masse monétaire.
- Ironwood illustre une évolution vers la **cryptographie à haute assurance**, où la vérification formelle fait partie intégrante de la conception d'une monnaie cryptographique inédite.

---

## Glossaire

| Terme | Signification en termes simples |
|---|---|
| **Ironwood** | Le nouveau pool protégé de Zcash (2026), qui remplace le pool Orchard défaillant |
| **Balance integrity** | Le pool ne verse jamais plus de valeur que ce qui y est entré publiquement |
| **Knowledge soundness** | Une preuve valide exige que le prouveur détienne un témoin authentique |
| **Extractor** | Une procédure qui extrait le témoin de tout prouveur convaincant |
| **Lean** | L'assistant de preuve utilisé pour vérifier la preuve par machine |
| **ValidLedger** | Le modèle formel des règles de consensus sur lequel raisonnent les théorèmes |
| **Fingerprint** | La frontière entre les mathématiques prouvées et le logiciel Rust en fonctionnement |
| **Under stated assumptions** | La preuve est valable à condition que les hypothèses cryptographiques nommées le soient |
| **Turnstile** | Une règle qui plafonne les sorties d'un pool à ses dépôts vérifiables |
| **High-assurance cryptography** | Concevoir des systèmes cryptographiques en intégrant la vérification formelle comme étape standard |

---

## FAQ

**La preuve signifie-t-elle que Ironwood est exempt de bugs ?**
Non, et elle ne le prétend pas. Elle prouve une propriété précise, l'intégrité des soldes, sous les hypothèses énoncées. Cela exclut la contrefaçon indétectable, et non tous les bugs imaginables.

**La preuve garantit-elle que mes transactions sont confidentielles ?**
Non. La vérification couvre la solidité de la masse monétaire (pas de fausse monnaie), et non les garanties de confidentialité du pool, qui sont distinctes. Celles-ci reposent sur d'autres arguments.

**Pourquoi faire confiance à une preuve rédigée par des humains (et par une IA) ?**
Parce qu'elle est vérifiée par machine. L'assistant de preuve Lean vérifie mécaniquement chaque étape, de sorte que la confiance repose sur la spécification et sur les hypothèses nommées, et non sur le soin apporté à chaque étape par un humain ou une IA.

**Qu'advient-il des pièces encore présentes dans l'ancien pool Orchard ?**
Elles peuvent être retirées, mais seulement à hauteur du montant entré de manière vérifiable, ce qu'impose le sas comptable. Cela protège l'intégrité de la masse monétaire tout en aidant à démontrer que l'ancienne faille n'a jamais été exploitée.

**Est-ce la fin de l'histoire ?**
C'est une étape importante, pas une ligne d'arrivée. La future architecture de Zcash (Tachyon, avec la boîte à outils Ragu) est conçue avec la vérification formelle comme pratique standard, ce qui prolonge cette démarche.

---

### Testez votre intuition

Quelqu'un affirme : « Puisque Ironwood est formellement vérifié, il est désormais impossible que quoi que ce soit tourne mal avec Zcash. » En vous appuyant sur les idées des trois parties, donnez deux raisons distinctes pour lesquelles cette affirmation va trop loin. *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Premièrement, la preuve couvre une propriété *spécifique* (l'intégrité des soldes) sous des *hypothèses énoncées* (difficulté du logarithme discret et modélisation standard du hachage). Si une hypothèse cryptographique était brisée, ou si un problème survenait en dehors de ce qui a été spécifié (par exemple dans la confidentialité, dans un logiciel de portefeuille ou dans un composant non prouvé), la preuve n'en dit rien. Deuxièmement, la vérification formelle garantit que le système respecte *la spécification qui a été rédigée* ; si cette spécification elle-même ne rendait pas compte d'une exigence réelle, la preuve certifierait fidèlement la mauvaise chose. Ces deux points reformulent la réserve de la partie 1 : une preuve est exacte et délimitée, puissante précisément parce que sa portée est honnête, et non une garantie générale que rien ne pourra jamais mal tourner.
</details>

---

### La série, au complet

Au fil de ces trois parties, nous sommes passés d'une idée générale à une application concrète : ce que signifie **prouver** qu'un logiciel est correct plutôt que de le tester (partie 1), comment un circuit réel insuffisamment contraint aurait pu créer de la monnaie invisible (partie 2), et comment une preuve d'**intégrité des soldes** vérifiée par machine a éliminé définitivement cette catégorie de bugs (partie 3). Le fil conducteur est une promesse unique et honnête : non pas « aucun bug, jamais », mais « cette propriété précise est valable dans tous les cas, sous les hypothèses énoncées ». Pour une monnaie qui cache ses propres montants, c'est exactement la promesse qui mérite d'être prouvée.

*Fait partie de la série* Vérification formelle  *pour [ZecHub](https://zechub.org).*
