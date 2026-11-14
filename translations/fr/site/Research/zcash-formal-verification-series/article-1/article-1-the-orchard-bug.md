![alt text](image-1.png)
# Le bug Orchard : quand un système de preuve a une faille

### Comment une seule ligne mathématique sous-contrainte aurait pu créer une quantité illimitée de monnaie invisible

> **Série :** *Série sur la vérification formelle* · **Partie 2 sur 3**
> **Public :** débutants. La partie 1 présentait la vérification formelle ; ici, nous découvrons le bug réel qui l'a rendue urgente. Tout ce dont vous avez besoin est expliqué depuis le début.
> **Ce que vous en retiendrez :** une image intuitive mais exacte de la manière dont un système de preuve cryptographique peut contenir une faille de correction, de ce qu'était précisément le bug Zcash « Orchard » de 2026, des raisons pour lesquelles ce type de bug peut rester caché pendant des années, et des raisons pour lesquelles cela s'est déjà produit.

Dans la partie 1, nous avons dit que les tests peuvent montrer la présence de bugs, mais jamais leur absence, et que les bugs les plus dangereux se trouvent dans la *spécification* d'un système, c'est-à-dire dans ses mathématiques sous-jacentes. Cet article est l'étude de cas. En 2026, une faille a été découverte dans le pool protégé Orchard de Zcash. Elle aurait pu permettre à un attaquant de créer de manière invisible une quantité illimitée de fausse monnaie. Elle avait survécu pendant quatre ans et à des audits répétés. La comprendre, ainsi que ses précédents, constitue la meilleure motivation possible pour prouver que les systèmes sont corrects.

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Zcash est une cryptomonnaie dotée d'un mode privé. Dans son pool protégé, les montants, les expéditeurs et les destinataires des transactions sont **cachés**. Cette confidentialité repose sur des **preuves à divulgation nulle de connaissance** : des preuves cryptographiques qui démontrent qu'une transaction respecte toutes les règles, sans en révéler le contenu.

Cette conception est à double tranchant. Sur un registre transparent comme celui de Bitcoin, si quelqu'un faisait apparaître des pièces à partir de rien, les chiffres gonflés seraient visibles de tous, et le réseau pourrait le détecter et annuler l'opération. Dans un pool protégé, les chiffres sont cachés par conception. Si le système de preuve lui-même comportait une faille permettant à une transaction invalide de paraître valide, la contrefaçon serait donc **indétectable**. Vous ne pourriez pas la repérer en examinant le registre, puisque celui-ci est volontairement opaque.

C'est exactement le risque qui s'est concrétisé dans Orchard. Pour le comprendre, il faut regarder ce que vérifie réellement une preuve à divulgation nulle de connaissance.

---

## 2. L'intuition : une preuve ne vaut que ce que vaut sa liste de contrôle

Imaginez un agent des frontières qui doit autoriser des voyageurs sans voir directement leurs documents. Chaque voyageur remplit plutôt une **liste de contrôle**, et l'agent laisse passer toute personne dont la liste est entièrement cochée. La liste est conçue pour que *seul un voyageur en règle puisse cocher toutes les cases.*

Supposons maintenant qu'il manque une case essentielle à cette liste, par exemple « le passeport n'est pas expiré ». Presque tout le monde la remplit honnêtement et rien ne semble anormal. Mais une personne dont le passeport est expiré peut *elle aussi* cocher toutes les cases restantes et passer sans encombre. Le système semble fonctionner parfaitement au quotidien. La faille n'a d'importance que pour quelqu'un qui la cherche.

Une preuve à divulgation nulle de connaissance fonctionne comme cette liste de contrôle. Elle ne révèle pas les détails privés ; elle vérifie qu'ils remplissent un ensemble fixe de conditions. Et si l'une des conditions nécessaires est oubliée par erreur, certaines entrées invalides peuvent *elles aussi* passer, alors que tout continue de paraître normal.

Précisons ce qu'est cette « liste de conditions », car c'est exactement là que se trouvait le bug.

---

## 3. Les mathématiques : circuits, contraintes et correction

En coulisses, l'énoncé « cette transaction est valide » est encodé sous la forme d'un **circuit** : un ensemble fixe de conditions arithmétiques, appelées **contraintes**, écrites sous forme d'équations sur des nombres. Pour produire une preuve valide, le prouveur doit fournir des valeurs secrètes (le **témoin**) qui satisfont *toutes* les contraintes. La preuve convainc un vérificateur qu'un tel témoin existe, sans le révéler.

La propriété que nous attendons de ce système porte un nom :

> **Correction :** il doit être impossible de produire une preuve valide pour un énoncé *faux*. Seuls les énoncés vrais doivent avoir des témoins qui satisfont toutes les contraintes.

La correction est la garantie anti-contrefaçon. Si elle est assurée, une preuve valide signifie réellement qu'« une transaction réelle et conforme aux règles a eu lieu ». Si elle présente une lacune, une preuve valide peut ne rien signifier du tout.

### L'effet d'une contrainte manquante (un exemple vérifié)

Les contraintes doivent souvent obliger une valeur à rester simple. Un exemple courant : obliger une valeur `b` à être un seul **bit**, soit `0`, soit `1`. La méthode standard consiste à utiliser une seule contrainte :

```
b × (b − 1) = 0
```

Pourquoi cela fonctionne-t-il ? Un produit n'est nul que si l'un de ses facteurs est nul. Donc `b × (b − 1) = 0` impose `b = 0` ou `b = 1`, et rien d'autre. Si l'on vérifie toutes les valeurs de 0 à 16 (dans une arithmétique qui revient à zéro à 17), les *seules* valeurs qui la satisfont sont exactement **0 et 1**. ✓

Imaginez maintenant que cette ligne soit **oubliée par erreur** dans le circuit. Soudain, `b` n'est plus contraint. Un prouveur malhonnête peut fixer `b` à `5`, ou à `9`, ou à n'importe quoi, tout en satisfaisant les contraintes restantes. Cette seule ligne manquante constitue une **lacune de correction** : des énoncés faux ont désormais des témoins qui les satisfont.

Ce n'est pas une hypothèse. Une contrainte booléenne manquante exactement de ce type a été découverte dans la toute première conception protégée de Zcash, Sprout, pendant son développement, et corrigée avant le lancement. La sous-contrainte est l'une des erreurs les plus fréquentes et les plus dangereuses dans la construction de ces circuits.

![alt text](image-2.png)

Voilà, à petite échelle, toute la forme du bug Orchard. Passons maintenant au cas réel.

---

## 4. Ce qu'était réellement le bug Orchard

Les preuves protégées de Zcash reposent sur des **courbes elliptiques**, des objets mathématiques dont les points peuvent être combinés et « multipliés » par des nombres, des opérations que le circuit doit imposer au moyen de contraintes. Le circuit contient des composants qui effectuent la **multiplication sur courbe elliptique** et vérifient qu'elle a été réalisée correctement.

Selon la divulgation de Shielded Labs et du chercheur Taylor Hornby, la faille Orchard était précisément la suivante :

> Un **élément sous-contraint du circuit Orchard** permettait de fournir **des entrées fausses arbitraires à une multiplication sur courbe elliptique tout en faisant réussir la vérification de cette multiplication.**

En termes simples, il manquait à la liste de contrôle du circuit les cases qui auraient dû verrouiller cette multiplication. À cause de cette lacune, un attaquant suffisamment expert aurait pu construire une preuve de transaction que le système aurait acceptée alors que la transaction créait de la valeur à partir de rien. C'est de la **contrefaçon**, et comme les montants du pool protégé sont cachés, elle aurait été **indétectable** à partir du registre. L'équipe Tachyon a ensuite décrit la même faille au niveau du code comme des lignes manquantes dans le circuit, qui brouillaient discrètement les équations sous-jacentes.

Les parallèles avec notre histoire de liste de contrôle sont exacts :

| L'histoire de la liste de contrôle | Le bug Orchard |
|---|---|
| Une case « passeport non expiré » manquante | Une contrainte manquante sur une multiplication sur courbe elliptique |
| Un voyageur au passeport expiré passe quand même | Des entrées fausses arbitraires réussissent la vérification de la multiplication |
| Les autres ne sont pas affectés, donc rien ne semble anormal | Les transactions normales fonctionnaient parfaitement, ce qui masquait la faille |
| Seul celui qui la cherche trouve la faille | Il a fallu un expert sondant délibérément les mathématiques du circuit |

Pour être clair sur la gravité de la situation : le chercheur, aidé par l'IA, a écrit un *exploit complet et fonctionnel* et a confirmé sur un réseau de test local qu'il produisait une quantité illimitée de pièces contrefaites indétectables. Il s'agissait d'une faille réelle et exploitable, et non d'une inquiétude théorique.

---

## 5. Pourquoi il est resté caché pendant quatre ans

Le bug a existé dans Orchard depuis son activation en **mai 2022** jusqu'au correctif d'urgence de **juin 2026**, malgré des audits professionnels répétés menés par certains des meilleurs cryptographes du monde. Comment est-ce possible ?

Parce que, comme l'avertissait la partie 1, **les tests échantillonnent des cas, et cette faille se trouvait dans un cas que personne n'a échantillonné.** Les transactions ordinaires ne sollicitaient jamais la contrainte manquante : tous les tests réussissaient et chaque jour de fonctionnement normal paraissait irréprochable. La faille n'était accessible qu'en construisant délibérément un témoin inhabituel visant précisément la lacune. Elle a finalement été découverte non pas en exécutant des tests, mais en *raisonnant sur les mathématiques du circuit*.

La découverte elle-même indique la direction que prend la sécurité. En avril 2026, Shielded Labs a engagé le chercheur en sécurité **Taylor Hornby** précisément pour traquer ce type de faille. Peu après la sortie d'un nouveau modèle d'IA de pointe (Claude Opus 4.8 d'Anthropic) fin mai 2026, Hornby l'a utilisé, avec un environnement d'analyse sur mesure et des méthodes traditionnelles, pour un examen ciblé du circuit Orchard. Le **29 mai 2026**, cet examen a mis au jour la vulnérabilité.

Deux faits sobres tirés de la divulgation méritent d'être énoncés clairement :

- L'équipe n'a trouvé **aucune preuve** que le bug ait jamais été exploité, et considère une exploitation antérieure comme peu probable (il avait échappé à des années d'examen par des experts et a été découvert grâce à un effort délibéré de hacking éthique). Mais la nature même d'une faille *indétectable* signifie que le registre seul ne peut pas prouver totalement que cela ne s'est jamais produit.
- La découverte a provoqué de fortes turbulences, notamment une chute brutale du prix de l'actif, précisément parce que la simple *possibilité* d'une contrefaçon cachée est extrêmement grave pour une monnaie.

![alt text](image-3.png)

---

## 6. Ce n'était pas la première fois

Le bug Orchard appartient à une famille récurrente, et c'est en voyant cette famille que la vérification formelle apparaît non pas comme facultative, mais comme inévitable. Une faille de contrefaçon provient toujours de l'une de trois sources (la classification de la partie 1) : la **spécification** (les mathématiques elles-mêmes), l'**implémentation** (un code qui ne respecte pas des mathématiques correctes) ou une **hypothèse invalidée**. Et surtout :

> Un bug de contrefaçon n'est **indétectable** que s'il se trouve dans la **spécification**. Les bugs d'implémentation laissent des traces publiques permanentes, car chaque bloc enregistre le contenu complet de chaque transaction : rejouer l'historique avec un logiciel corrigé révélerait donc toute transaction acceptée à tort par le code défectueux.

L'histoire de Zcash elle-même illustre ce schéma :

| Bug (année) | Source | Détectable ? |
|---|---|---|
| Faille d'engagement de Zerocash (2016, avant le lancement) | Spécification (un hachage tronqué cassait une propriété de liaison) | Indétectable |
| Faille de correction de la configuration de confiance (2018) | Spécification (une erreur dans l'article zk-SNARK sous-jacent) | Indétectable |
| Collision de requêtes dans le système de preuve (2025) | Spécification (une vérification manquante dans le système de preuve) | Détectable |
| Bug de validation de sous-groupe de courbe (2016) | Implémentation (une vérification de sous-groupe manquante) | Détectable |
| **Multiplication sous-contrainte de Orchard (2026)** | **Spécification (le circuit)** | **Indétectable** |

Le fil conducteur est frappant : les failles qui pouvaient rester cachées pour toujours sont celles qui se trouvent dans les mathématiques. C'est précisément la catégorie qu'une preuve de la spécification vérifiée par machine peut éliminer, pour tous les cas à la fois. Les tests et les audits échantillonnent ; seule la preuve des mathématiques couvre toutes les entrées.

---

## 7. La réponse

Les développeurs de Zcash ont agi rapidement et par étapes :

1. **Correction d'urgence (au plus tard les 1er et 2 juin 2026).** Quelques jours après la divulgation, une mise à niveau du réseau d'urgence a refermé la fenêtre de vulnérabilité en ajoutant les contraintes manquantes, afin que les mathématiques du circuit soient de nouveau correctes.
2. **Un nouveau départ prouvable (« Ironwood », activé le 28 juillet 2026).** Plutôt que de faire confiance indéfiniment à une version corrigée de l'ancien pool, la communauté a lancé un tout nouveau pool protégé, Ironwood, fondé sur le circuit corrigé mais repartant de zéro, et accompagné d'une preuve formelle de correction vérifiée par machine.

Cette seconde étape marque l'entrée en scène de la vérification formelle, et c'est le sujet de la partie 3. La prise de conscience sur laquelle l'équipe s'est appuyée mérite d'être présentée dès maintenant, car elle relie toute cette série :

> Une faille de contrefaçon *indétectable* ne peut se trouver que dans la **spécification** du protocole. Donc, si vous pouvez **prouver que la spécification** exclut la contrefaçon, vous éliminez toute la catégorie de bugs qui est restée cachée ici pendant quatre ans.

C'est exactement l'idée du premier pilier présentée dans la partie 1 : vérifiez la spécification, et vous comblez la lacune que les tests ne pourraient jamais combler.

---

## 8. Un avertissement honnête

Nous avons délibérément simplifié. Le circuit réel comprend des centaines de régions et plusieurs milliers de contraintes, et la faille réelle est techniquement plus complexe qu'une simple vérification de bit manquante ; nous avons utilisé la vérification de bit parce qu'elle montre exactement la *forme* d'un circuit sous-contraint, et parce que cette erreur précise fait réellement partie de l'histoire de Zcash. La faille Orchard exacte était une multiplication sur courbe elliptique sous-contrainte, comme l'indique la divulgation officielle. Nous avons également condensé la chronologie de la divulgation et de la correction. Pour un compte rendu technique faisant autorité, consultez la divulgation de Shielded Labs et les comptes rendus du projet Tachyon.

---

## 9. Résumé

- Le pool protégé de Zcash cache les montants à l'aide de **preuves à divulgation nulle de connaissance** ; une faille dans ces preuves pourrait donc permettre une **contrefaçon invisible**.
- Un système de preuve vérifie un **circuit** fixe de **contraintes** ; sa propriété essentielle est la **correction** : seuls les énoncés vrais doivent avoir un **témoin** qui les satisfait.
- Une **contrainte manquante** crée une **lacune de correction**, qui laisse passer des énoncés faux. (Cas simplifié vérifié : `b(b−1)=0` impose à `b` de valoir 0 ou 1 ; supprimez-la et `b` peut valoir n'importe quoi. Cette catégorie précise de bug fait réellement partie de l'histoire de Zcash.)
- Le **bug Orchard** était une **multiplication sur courbe elliptique sous-contrainte** : des entrées fausses arbitraires pouvaient réussir la vérification de la multiplication, ce qui permettait une contrefaçon illimitée et indétectable. Un exploit fonctionnel a été démontré sur un réseau de test.
- Il est resté caché pendant **quatre ans** (de mai 2022 à juin 2026), car les tests échantillonnent des cas et n'avaient jamais échantillonné celui-ci ; il a été découvert en raisonnant sur les mathématiques, avec l'aide de l'IA, le 29 mai 2026.
- Une contrefaçon indétectable ne peut se trouver que dans la **spécification**, et Zcash a déjà connu cette famille de bugs. Zcash a répondu par un correctif d'urgence et un nouveau pool vérifié formellement, **Ironwood**, sujet de la partie 3.

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Shielded pool** | Le mode privé de Zcash, dans lequel les montants et les parties sont cachés |
| **Zero-knowledge proof** | Une preuve qu'un énoncé caché est valide, qui ne révèle rien d'autre |
| **Circuit** | L'ensemble fixe de conditions arithmétiques qu'une transaction valide doit satisfaire |
| **Constraint** | Une condition (équation) à l'intérieur du circuit |
| **Witness** | Les valeurs secrètes qui satisfont les contraintes |
| **Soundness** | La garantie que seuls des énoncés vrais peuvent produire une preuve valide |
| **Soundness gap** | Une contrainte manquante qui laisse passer des énoncés faux |
| **Under-constrained** | Se dit d'un circuit auquel manque une condition nécessaire, à l'origine du bug Orchard |
| **Detectable / undetectable** | Indique si une exploitation laisserait des traces dans le registre public |

---

## FAQ

**Des Zcash contrefaits ont-ils réellement été créés ?**
Aucune preuve d'exploitation n'a été trouvée, et l'équipe considère cette hypothèse comme peu probable. Mais comme la faille aurait été indétectable à partir du registre, celui-ci ne peut pas à lui seul prouver totalement que cela ne s'est jamais produit, ce qui explique la rigueur de la réponse.

**Pourquoi le fait de cacher les montants aggrave-t-il un bug ?**
Sur une chaîne transparente, les pièces créées sont visibles et peuvent être détectées et annulées. Lorsque les montants sont cachés pour des raisons de confidentialité, un bug de contrefaçon ne produit aucune anomalie visible et peut donc persister sans être vu.

**Pourquoi des années d'audits ne l'ont-elles pas détecté ?**
Les audits et les tests examinent surtout le comportement dans des cas réalistes. Cette faille n'apparaissait qu'avec une entrée inhabituelle, délibérément conçue pour viser un cas limite mathématique, que l'examen de routine ne sollicitait pas. Elle a été découverte par un raisonnement ciblé sur le circuit, et non par des tests.

**Une contrainte manquante suffit-elle vraiment ?**
Oui. Un système de preuve n'est solide que si l'ensemble de ses contraintes est complet. L'oubli d'une seule condition nécessaire suffit à laisser passer des énoncés invalides.

**Quel rôle l'IA a-t-elle joué ?**
Un chercheur a utilisé un modèle d'IA de pointe, avec un environnement sur mesure et des méthodes traditionnelles, pour examiner les mathématiques du circuit et trouver la faille. L'IA est de plus en plus utilisée des deux côtés de la sécurité, ce qui explique en partie pourquoi prouver que les systèmes sont corrects est aujourd'hui si important.

---

### Testez votre intuition

Supposons qu'une transaction protégée soit censée prouver que « l'argent entrant est égal à l'argent sortant », mais que le circuit oublie de contraindre une valeur de sortie. Que pourrait faire un prouveur malhonnête, et pourquoi le registre public paraîtrait-il tout à fait normal ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Cette sortie n'étant pas contrainte, le prouveur pourrait lui donner une valeur supérieure à ce que permettent les entrées réelles, créant ainsi de la valeur à partir de rien : une contrefaçon. La preuve serait tout de même validée, car la contrainte manquante était la seule chose qui aurait permis de détecter le déséquilibre. Et comme le pool protégé cache les montants, le registre indique seulement qu'« une transaction valide a eu lieu », sans aucun déséquilibre visible pour donner l'alerte. La falsification est réelle mais invisible, et c'est exactement pour cela que la correction du circuit est si importante, et qu'elle doit être prouvée plutôt que testée.
</details>

---

### La suite

**Partie 3 · Ironwood :** la solution n'a pas été un simple correctif. Les ingénieurs de Zcash ont construit un nouveau pool protégé et l'ont accompagné d'une preuve mathématique vérifiée par machine, soit plus de 2 700 théorèmes écrits dans l'assistant de preuve Lean, établissant qu'il ne peut pas créer de fausse monnaie sous ses hypothèses déclarées. Nous verrons ce que signifient l'« intégrité du solde » et la « correction de la connaissance », ce que la preuve couvre exactement et ce qu'elle ne couvre pas, ainsi que la manière dont l'ancien pool a été retiré en toute sécurité.

*Fait partie de la série* Vérification formelle *pour [ZecHub](https://zechub.org).*
