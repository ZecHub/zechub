![alt text](image-1.png)
# Le bug Orchard : quand un système de preuve présente une faille

### Comment une seule ligne de mathématiques sous-contrainte aurait pu permettre de créer une quantité illimitée d'argent invisible

> **Série :** *Série sur la vérification formelle* · **Partie 2 sur 3**
> **Public :** débutants. La partie 1 a présenté la vérification formelle ; nous découvrons ici le véritable bug qui l'a rendue urgente. Tout le nécessaire est expliqué depuis le début.
> **Ce que vous en retiendrez :** une vision intuitive mais exacte de la façon dont un système de preuve cryptographique peut contenir une faille de solidité, de ce qu'était exactement le bug « Orchard » de Zcash, de la raison pour laquelle cette catégorie de bug peut rester cachée pendant des années, et de pourquoi cela s'est déjà produit auparavant.

Dans la partie 1, nous avons dit que les tests peuvent montrer la présence de bugs, mais jamais leur absence, et que les bugs les plus dangereux se trouvent dans la *spécification* d'un système, ses mathématiques sous-jacentes. Cet article est l'étude de cas. En 2026, une faille a été trouvée dans le pool protégé Orchard de Zcash ; elle aurait pu permettre à un attaquant de créer invisiblement une quantité illimitée de fausse monnaie. Elle avait survécu quatre ans et plusieurs audits répétés. La comprendre, ainsi que ses prédécesseurs, est la motivation la plus claire qui soit pour prouver qu'un système est correct.

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Zcash est une cryptomonnaie dotée d'un mode privé. Dans son pool protégé, les montants, les expéditeurs et les destinataires des transactions sont **masqués**. Cette confidentialité est créée à l'aide de **preuves à divulgation nulle de connaissance** : des preuves cryptographiques qu'une transaction respecte toutes les règles, sans révéler le contenu de la transaction.

Cette conception a un double tranchant. Sur un registre transparent tel que celui de Bitcoin, si quelqu'un créait des pièces à partir de rien, les chiffres gonflés seraient visibles par tous, et le réseau pourrait les détecter et les annuler. Dans un pool protégé, les chiffres sont masqués par conception. Ainsi, si le système de preuve lui-même comportait une faille permettant à une transaction invalide de paraître valide, la contrefaçon serait **indétectable**. Il serait impossible de la repérer en inspectant le registre, car celui-ci est délibérément opaque.

C'est exactement le risque qui s'est matérialisé dans Orchard. Pour le comprendre, nous devons examiner ce que vérifie réellement une preuve à divulgation nulle de connaissance.

---

## 2. L'intuition : une preuve ne vaut que par sa liste de vérification

Imaginez un agent frontalier qui doit approuver des voyageurs sans voir directement leurs documents. Chaque voyageur remplit plutôt une **liste de vérification**, et l'agent approuve toute personne dont toutes les cases sont cochées. La liste est conçue pour que *seul un voyageur légitime puisse cocher toutes les cases.*

Supposons maintenant qu'il manque une case cruciale dans la liste, par exemple : « le passeport n'est pas expiré ». Presque tout le monde la remplit toujours honnêtement et rien ne semble anormal. Mais une personne ayant un passeport expiré peut *elle aussi* cocher toutes les cases restantes et passer sans encombre. Le système paraît fonctionner dans l'usage quotidien. La faille ne compte que pour quelqu'un qui la recherche.

Une preuve à divulgation nulle de connaissance fonctionne comme cette liste de vérification. Elle ne révèle pas les détails privés ; elle vérifie qu'ils satisfont un ensemble fixe de conditions. Et si une condition nécessaire est accidentellement omise, certaines entrées invalides peuvent *elles aussi* passer, tandis que tout continue de paraître normal.

Précisons ce qu'est cette « liste de conditions », car c'est exactement là que se trouvait le bug.

---

## 3. Les mathématiques : circuits, contraintes et solidité

Sous le capot, l'énoncé « cette transaction est valide » est encodé sous la forme d'un **circuit** : une collection fixe de conditions arithmétiques, appelées **contraintes**, écrites comme des équations sur des nombres. Pour produire une preuve valide, le prouveur doit fournir des valeurs secrètes (le **témoin**) qui satisfont *chaque* contrainte. La preuve convainc un vérificateur qu'un tel témoin existe, sans le révéler.

La propriété dont nous avons besoin pour ce système porte un nom :

> **Solidité :** il doit être impossible de produire une preuve valide pour un énoncé *faux*. Seuls les énoncés vrais doivent posséder des témoins satisfaisant toutes les contraintes.

La solidité est la garantie anti-contrefaçon. Si elle tient, une preuve valide signifie réellement qu'une transaction réelle respectant les règles a eu lieu. Si la solidité présente une lacune, une preuve valide peut ne plus rien signifier du tout.

### Ce que produit une contrainte manquante (un exemple vérifié)

Les contraintes doivent souvent forcer une valeur à être simple. Un exemple courant consiste à forcer une valeur `b` à être un seul **bit**, soit `0`, soit `1`. La façon standard de procéder consiste en une contrainte :

```
b × (b − 1) = 0
```

Pourquoi cela fonctionne-t-il ? Un produit est nul uniquement lorsque l'un de ses facteurs est nul. Ainsi, `b × (b − 1) = 0` impose `b = 0` ou `b = 1`, et rien d'autre. En vérifiant chaque valeur de 0 à 16 (dans une arithmétique qui reboucle à 17), les *seules* valeurs qui la satisfont sont exactement **0 et 1**. ✓

Imaginez maintenant que cette ligne soit **accidentellement omise** du circuit. Soudain, `b` n'est plus contraint. Un prouveur malhonnête peut fixer `b` à `5`, ou à `9`, ou à n'importe quoi, tout en satisfaisant les contraintes restantes. Cette unique ligne manquante constitue une **faille de solidité** : des énoncés faux ont désormais des témoins satisfaisants.

Ce n'est pas hypothétique. Une contrainte booléenne manquante exactement de ce type a été trouvée dans la toute première conception protégée de Zcash, Sprout, pendant son développement, puis corrigée avant son lancement. Le sous-contrainte est l'une des erreurs les plus fréquentes et les plus dangereuses lors de la construction de ces circuits.

![alt text](image-2.png)

C'est toute la forme du bug Orchard, à petite échelle. Passons maintenant au cas réel.

---

## 4. Ce qu'était réellement le bug Orchard

Les preuves protégées de Zcash reposent sur des **courbes elliptiques**, des objets mathématiques dont les points peuvent être combinés et « multipliés » par des nombres, opérations que le circuit doit imposer par des contraintes. Le circuit contient des gadgets qui effectuent une **multiplication sur courbe elliptique** et vérifient qu'elle a été réalisée correctement.

Selon la divulgation de Shielded Labs et du chercheur Taylor Hornby, la faille Orchard était précisément la suivante :

> Un **élément sous-contraint du circuit Orchard** permettait d'introduire des **entrées fausses arbitraires dans une multiplication sur courbe elliptique tout en faisant passer la vérification de la multiplication.**

En termes simples, il manquait à la liste de vérification du circuit les cases qui auraient dû déterminer cette multiplication. En raison de cette lacune, un attaquant suffisamment expert pouvait construire une preuve de transaction que le système accepterait, même si la transaction créait de la valeur à partir de rien. C'est de la **contrefaçon**, et puisque les montants du pool protégé sont masqués, elle aurait été **indétectable** à partir du registre. L'équipe Tachyon a ensuite décrit la même faille au niveau du code comme des lignes manquantes dans le circuit qui brouillaient discrètement les équations sous-jacentes.

Les parallèles avec notre histoire de liste de vérification sont exacts :

| Histoire de la liste de vérification | Le bug Orchard |
|---|---|
| Une case « passeport non expiré » manquante | Une contrainte manquante sur une multiplication sur courbe elliptique |
| Un voyageur avec un passeport expiré passe malgré tout | Des entrées fausses arbitraires passent la vérification de la multiplication |
| Tout le monde n'est pas affecté, donc rien ne semble anormal | Les transactions normales fonctionnaient parfaitement, masquant la faille |
| Seule une personne qui la cherche trouve la faille | Il a fallu un expert sondant délibérément les mathématiques du circuit |

Pour être clair sur la gravité de cette faille : le chercheur, avec l'aide de l'IA, a écrit un *exploit complet et fonctionnel* et a confirmé, dans un réseau de test local, qu'il produisait une quantité illimitée de pièces contrefaites indétectables. Il s'agissait d'une faille réelle et exploitable, et non d'une inquiétude théorique.

---

## 5. Pourquoi elle est restée cachée pendant quatre ans

Le bug a vécu dans Orchard depuis son activation en **mai 2022** jusqu'au correctif d'urgence de **juin 2026**, malgré des audits professionnels répétés réalisés par certains des meilleurs cryptographes du monde. Comment ?

Parce que, comme la partie 1 l'avait averti, **les tests échantillonnent des cas, et cette faille se trouvait dans un cas que personne n'avait échantillonné.** Les transactions ordinaires n'exerçaient jamais la contrainte manquante ; tous les tests passaient donc et chaque journée de fonctionnement normal paraissait irréprochable. La faille n'était atteignable qu'en construisant délibérément un témoin inhabituel visant précisément cette lacune. Elle a finalement été trouvée non pas en exécutant des tests, mais en *raisonnant sur les mathématiques du circuit*.

La découverte elle-même indique la direction que prend la sécurité. En avril 2026, Shielded Labs a engagé le chercheur en sécurité **Taylor Hornby** spécifiquement pour rechercher ce type précis de faille. Peu après la sortie d'un nouveau modèle d'IA de pointe (Claude Opus 4.8 d'Anthropic) à la fin mai 2026, Hornby l'a utilisé, avec un harnais d'analyse personnalisé et des méthodes traditionnelles, dans un examen ciblé du circuit Orchard. Le **29 mai 2026**, cet examen a révélé la vulnérabilité.

Deux faits sobres de la divulgation méritent d'être énoncés clairement :

- L'équipe n'a trouvé **aucune preuve** que le bug ait jamais été exploité et considère une exploitation antérieure peu probable (il avait échappé pendant des années à l'examen d'experts et a été trouvé par une démarche délibérée de white hat). Mais la nature même d'une faille *indétectable* signifie que le registre ne peut pas, à lui seul, prouver entièrement qu'elle ne s'est jamais produite.
- La découverte a provoqué une agitation importante, y compris une forte chute du prix de l'actif, précisément parce que la *possibilité* d'une contrefaçon cachée est si grave pour une monnaie.

![alt text](image-3.png)

---

## 6. Ce n'était pas la première fois

Le bug Orchard appartient à une famille récurrente, et voir cette famille rend la vérification formelle non pas facultative, mais inévitable. Une faille de contrefaçon remonte toujours à l'une de trois sources (la taxonomie de la partie 1) : la **spécification** (les mathématiques elles-mêmes), l'**implémentation** (du code qui ne suit pas les mathématiques correctes), ou une **hypothèse défaillante**. Et, point crucial :

> Un bug de contrefaçon n'est **indétectable** que s'il se trouve dans la **spécification**. Les bugs d'implémentation laissent des preuves publiques permanentes, car chaque bloc enregistre le contenu complet de chaque transaction ; rejouer l'historique avec un logiciel corrigé révélerait donc toute transaction que le code défectueux avait acceptée à tort.

L'histoire de Zcash illustre elle-même ce schéma :

| Bug (année) | Source | Détectable ? |
|---|---|---|
| Faille d'engagement Zerocash (2016, avant lancement) | Spécification (un hachage tronqué rompait une propriété de liaison) | Indétectable |
| Faille de solidité de la configuration de confiance (2018) | Spécification (une erreur dans l'article sous-jacent sur les zk-SNARK) | Indétectable |
| Collision de requêtes du système de preuve (2025) | Spécification (une vérification manquante dans le système de preuve) | Détectable |
| Bug de validation du sous-groupe de courbe (2016) | Implémentation (une vérification de sous-groupe manquante) | Détectable |
| **Multiplication sous-contraite Orchard (2026)** | **Spécification (le circuit)** | **Indétectable** |

Le fil conducteur est saisissant : les failles qui pourraient rester cachées à jamais sont celles qui se trouvent dans les mathématiques. C'est précisément la catégorie qu'une preuve de la spécification vérifiée par machine peut éliminer, tous les cas à la fois. Les tests et les audits échantillonnent ; seule une preuve des mathématiques couvre chaque entrée.

---

## 7. La réponse

Les développeurs de Zcash ont agi rapidement et par étapes :

1. **Remédiation d'urgence (au plus tard les 1er et 2 juin 2026).** Dans les jours suivant la divulgation, une mise à niveau d'urgence du réseau a fermé la fenêtre de vulnérabilité, en ajoutant les contraintes manquantes afin que les mathématiques du circuit redeviennent solides.
2. **Un nouveau départ démontrable (« Ironwood », activé le 28 juillet 2026).** Plutôt que de faire indéfiniment confiance à une version corrigée de l'ancien pool, la communauté a lancé un tout nouveau pool protégé, Ironwood, fondé sur le circuit corrigé mais démarrant proprement, et accompagné d'une preuve formelle de correction vérifiée par machine.

Cette deuxième étape est celle où la vérification formelle entre dans l'histoire, et elle est le sujet de la partie 3. L'idée sur laquelle l'équipe a agi mérite d'être annoncée, car elle relie toute cette série :

> Une faille de contrefaçon *indétectable* ne peut exister que dans la **spécification** du protocole. Ainsi, si vous pouvez **prouver que la spécification** exclut la contrefaçon, vous éliminez toute la catégorie de bug qui est restée cachée ici pendant quatre ans.

C'est exactement l'idée du premier pilier de la partie 1 : vérifiez la spécification, et vous comblez la lacune que les tests n'auraient jamais pu combler.

---

## 8. Une réserve honnête

Nous avons délibérément simplifié. Le circuit réel comporte des centaines de régions et plusieurs milliers de contraintes, et la faille réelle est techniquement plus complexe qu'une simple vérification de bit manquante ; nous avons utilisé la vérification de bit parce qu'elle montre exactement la *forme* d'un circuit sous-contraint, et parce que cette erreur précise est réelle dans l'histoire de Zcash. La faille précise Orchard était une multiplication sur courbe elliptique sous-contrainte, comme indiqué dans la divulgation officielle. Nous avons également condensé le calendrier de divulgation et de remédiation. Pour le compte rendu technique faisant autorité, consultez la divulgation de Shielded Labs et les documents de Project Tachyon.

---

## 9. Résumé

- Le pool protégé de Zcash masque les montants à l'aide de **preuves à divulgation nulle de connaissance** ; une faille dans ces preuves pourrait donc permettre une **contrefaçon invisible**.
- Un système de preuve vérifie un **circuit** fixe de **contraintes** ; sa propriété cruciale est la **solidité** : seuls les énoncés vrais devraient disposer d'un **témoin** satisfaisant.
- Une **contrainte manquante** crée une **faille de solidité**, permettant à des énoncés faux de passer. (Cas simplifié vérifié : `b(b−1)=0` force `b` à valoir 0 ou 1 ; supprimez-la et `b` peut valoir n'importe quoi. Cette catégorie exacte de bug est réelle dans l'histoire de Zcash.)
- Le **bug Orchard** était une **multiplication sur courbe elliptique sous-contrainte** : des entrées fausses arbitraires pouvaient passer la vérification de la multiplication, permettant une contrefaçon illimitée et indétectable. Un exploit fonctionnel a été démontré dans un réseau de test.
- Il est resté caché pendant **quatre ans** (de mai 2022 à juin 2026), car les tests échantillonnent des cas et ne l'ont jamais échantillonné ; il a été trouvé en raisonnant sur les mathématiques, avec l'aide de l'IA, le 29 mai 2026.
- La contrefaçon indétectable ne peut exister que dans la **spécification**, et Zcash a déjà connu cette famille de bugs. Zcash a répondu par un correctif d'urgence et un nouveau pool formellement vérifié, **Ironwood**, sujet de la partie 3.

---

## Glossaire

| Terme | Signification en termes simples |
|---|---|
| **Shielded pool** | Le mode privé de Zcash dans lequel les montants et les parties sont masqués |
| **Zero-knowledge proof** | Une preuve qu'un énoncé masqué est valide, sans rien révéler d'autre |
| **Circuit** | L'ensemble fixe de conditions arithmétiques qu'une transaction valide doit satisfaire |
| **Constraint** | Une condition (équation) dans le circuit |
| **Witness** | Les valeurs secrètes qui satisfont les contraintes |
| **Soundness** | La garantie que seuls les énoncés vrais peuvent produire une preuve valide |
| **Soundness gap** | Une contrainte manquante qui permet à des énoncés faux de passer |
| **Under-constrained** | Un circuit auquel manque une condition nécessaire, à l'origine du bug Orchard |
| **Detectable / undetectable** | La question de savoir si une exploitation laisserait des preuves dans le registre public |

---

## FAQ

**Des Zcash contrefaits ont-ils réellement été créés ?**
Aucune preuve d'exploitation n'a été trouvée, et l'équipe considère cela peu probable. Mais puisque la faille aurait été indétectable à partir du registre, celui-ci ne peut pas, à lui seul, prouver entièrement que cela ne s'est jamais produit ; c'est pourquoi la réponse a été si approfondie.

**Pourquoi masquer les montants aggrave-t-il un bug ?**
Sur une chaîne transparente, les pièces créées sont visibles et peuvent être détectées puis annulées. Lorsque les montants sont masqués pour préserver la confidentialité, un bug de contrefaçon ne produit aucune anomalie visible et peut donc persister sans être détecté.

**Pourquoi des années d'audits ne l'ont-elles pas détecté ?**
Les audits et les tests examinent en grande partie le comportement dans des cas réalistes. Cette faille ne se manifestait qu'avec une entrée inhabituelle, délibérément construite pour viser un cas limite mathématique, que l'examen de routine n'exerçait pas. Elle a été trouvée par un raisonnement ciblé sur le circuit, et non par des tests.

**Une seule contrainte manquante suffit-elle réellement ?**
Oui. Un système de preuve n'est aussi solide que son ensemble complet de contraintes. Une seule condition nécessaire omise suffit à laisser passer des énoncés invalides.

**Quel rôle l'IA a-t-elle joué ?**
Un chercheur a utilisé un modèle d'IA de pointe, avec un harnais personnalisé et des méthodes traditionnelles, pour examiner les mathématiques du circuit et trouver la faille. L'IA est de plus en plus utilisée des deux côtés de la sécurité, ce qui explique en partie pourquoi il est désormais si important de prouver que les systèmes sont corrects.

---

### Testez votre intuition

Supposons qu'une transaction protégée doive prouver que « l'argent entrant est égal à l'argent sortant », mais que le circuit oublie de contraindre une valeur de sortie. Que pourrait faire un prouveur malhonnête, et pourquoi le registre public paraîtrait-il parfaitement normal ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Cette sortie n'étant pas contrainte, le prouveur pourrait la fixer à une valeur supérieure à celle que permettent les entrées réelles, créant ainsi de la valeur à partir de rien : une contrefaçon. La preuve continuerait à être vérifiée, car la contrainte manquante est la seule chose qui aurait détecté le déséquilibre. Et puisque le pool protégé masque les montants, le registre indique seulement qu'« une transaction valide a eu lieu », sans déséquilibre visible susceptible de déclencher une alerte. La falsification est réelle mais invisible ; c'est exactement pourquoi la solidité du circuit est si importante, et exactement pourquoi elle doit être prouvée plutôt que testée.
</details>

---

### La suite

**Partie 3 · Ironwood :** le correctif n'était pas qu'un simple patch. Les ingénieurs de Zcash ont construit un nouveau pool protégé et l'ont accompagné d'une preuve mathématique vérifiée par machine, de plus de 2 700 théorèmes écrits dans l'assistant de preuve Lean, établissant qu'il ne peut pas créer de monnaie contrefaite selon les hypothèses énoncées. Nous verrons ce que signifient « intégrité de l'équilibre » et « solidité de la connaissance », ce que couvre ou non exactement la preuve, et comment l'ancien pool a été retiré en toute sécurité.

*Fait partie de la* série sur la vérification formelle *pour [ZecHub](https://zechub.org).*
