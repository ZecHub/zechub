# Preuves à divulgation nulle de connaissance : prouver que vous avez raison sans dire pourquoi
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![texte alternatif](image-23.png)

### Le rideau qui permet au monde de vérifier ce qu’il ne pourra jamais voir

> **Série :** *Zcash from First Principles* . **Article 5 . Preuves à divulgation nulle de connaissance**
> **Public :** nouveaux venus. Nous nous appuyons sur chaque article précédent (corps finis, courbes, engagements, arbres de Merkle), mais chaque idée est rappelée au moment où nous en avons besoin.
> **Ce que vous en retirerez :** une compréhension intuitive et correcte de ce qu’est une preuve à divulgation nulle de connaissance, des trois garanties qu’elle apporte, de la manière dont des énoncés arbitraires sont prouvés, et de ce qui alimente Sapling et Orchard de Zcash.

C’est l’article vers lequel toute la série converge depuis le début. À partir de [l’Article 0](article-0-shielded-transaction.md), nous avons répété qu’un paiement est validé « derrière un rideau », prouvé correct tout en ne révélant rien. Une preuve à divulgation nulle de connaissance est ce rideau. C’est l’élément qui résout enfin le paradoxe par lequel nous avons commencé : *comment le public peut-il vérifier une transaction qu’il n’a pas le droit de voir ?*

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Rappelons la contradiction au cœur de Zcash :

- Une blockchain est digne de confiance parce qu’elle est **vérifiable publiquement**.
- Les paiements Zcash sont **complètement privés** : montants, expéditeur, destinataire, tout est caché.

Ces deux idées semblent mutuellement exclusives. La vérification semble *exiger* de regarder. La confidentialité *interdit* de regarder. Si vous ne pouvez pas les réconcilier, vous ne pouvez pas avoir une monnaie privée en laquelle tout le monde a confiance.

Une **preuve à divulgation nulle de connaissance (ZKP)** est cette réconciliation. Elle permet à un **prouveur** de convaincre un **vérificateur** qu’un énoncé est vrai **sans rien révéler au-delà du fait qu’il est vrai.** Aucun montant. Aucune identité. Aucune note. Juste : *« tout ici respecte les règles. »* Construisons d’abord l’intuition avant toute la machinerie.

---

## 2. L’intuition : trois preuves du quotidien

**Prouver que vous connaissez un mot de passe sans le dire.** Un site web pourrait vérifier que vous connaissez votre mot de passe en vous regardant déverrouiller quelque chose que seul ce mot de passe permet de déverrouiller, sans jamais voir le mot de passe lui-même. Vous prouvez la *connaissance* sans la *divulgation*.

**L’ami daltonien et deux balles.** Vous tenez une balle rouge et une balle verte qui paraissent identiques à votre ami daltonien. Vous voulez le convaincre qu’elles sont de *couleurs différentes* sans lui dire laquelle est laquelle. Il cache les deux derrière son dos, les échange éventuellement, puis vous en montre une. Vous dites s’il les a échangées. Si les balles sont réellement différentes, vous avez toujours raison. Si elles étaient identiques, vous devineriez, avec raison seulement une fois sur deux. Après 20 tours, votre série sans faute le convainc qu’elles sont différentes, et pourtant il n’apprend jamais quelle balle est rouge. **Il est convaincu d’un fait sans rien apprendre d’autre.** Voilà la divulgation nulle de connaissance en miniature.

**La grotte.** Une grotte en forme d’anneau possède au fond une porte magique qui ne s’ouvre qu’avec un mot secret. Vous affirmez connaître ce mot. Pour le prouver sans le révéler : un vérificateur attend dehors pendant que vous entrez et choisissez au hasard le passage de gauche ou de droite. Le vérificateur crie ensuite de quel côté il veut vous voir *ressortir*. Si vous connaissez vraiment le mot, vous pouvez toujours obéir (vous pouvez ouvrir la porte pour changer de côté si nécessaire). Si vous bluffez, vous ne pouvez ressortir du bon côté que par chance, 50/50 à chaque tour. Répétez cela 20 fois, et les chances qu’un bluffeur survive sont inférieures à une sur un million.

Cette histoire de grotte illustre discrètement les **trois garanties** que toute preuve à divulgation nulle de connaissance doit offrir.

---

## 3. Les trois garanties

![texte alternatif](image-24.png)

| Garantie | Dans l’histoire de la grotte | Dans Zcash |
|---|---|---|
| **Complétude** | Si vous connaissez le mot, vous ressortez toujours du bon côté | Une transaction valide produit toujours une preuve acceptée |
| **Solidité** | Un bluffeur se fait prendre avec une probabilité écrasante | Une transaction frauduleuse (monnaie forgée, double dépense) ne peut pas produire une preuve acceptée |
| **Divulgation nulle de connaissance** | Le vérificateur n’entend jamais le mot secret | Le réseau n’apprend jamais les montants, les adresses ni quelle note est concernée |

Si l’une de ces trois garanties échoue, le système s’effondre : sans complétude, les utilisateurs honnêtes sont rejetés ; sans solidité, les faussaires créent de la monnaie ; sans divulgation nulle de connaissance, la confidentialité s’évapore.

---

## 4. D’une grotte à *n’importe quel* énoncé : circuits et témoins

La grotte prouve un joli petit fait. Zcash doit prouver un énoncé riche : *« Je connais une note non dépensée dans l’arbre, je suis autorisé à la dépenser, son nullifier est calculé correctement, et mes entrées sont égales à mes sorties. »* Comment passe-t-on des balles et des grottes à cela ?

Le pont est une idée qui relie toute cette série :

> **Tout énoncé que l’on peut vérifier par un calcul peut être réécrit en circuit arithmétique :** un réseau d’additions et de multiplications sur un corps fini (Article 1).

Pensez au circuit comme à une liste de contraintes arithmétiques qui ne sont *toutes satisfaites que si l’énoncé est vrai.* Les entrées privées qui font que tout fonctionne, votre note, votre clé, le chemin de Merkle, sont appelées le **témoin**.

![texte alternatif](image-25.png)

C’est pourquoi nous avons consacré l’Article 1 aux corps finis et l’Article 3 aux fonctions de hachage compatibles ZK : le circuit parle l’arithmétique des corps finis, donc chaque opération à l’intérieur de l’énoncé (y compris le hachage et la remontée de Merkle de l’Article 4) doit être exprimée de cette manière. Plus chaque opération coûte peu à exprimer, plus la preuve est petite et rapide.

---

## 5. Rendre cela pratique : non interactif et succinct

La grotte nécessitait de nombreux allers-retours. C’est impraticable pour une blockchain, où une preuve doit être publiée une seule fois et vérifiée par tout le monde, pour toujours. Deux améliorations règlent cela.

**Non interactif (l’idée de Fiat-Shamir).** Au lieu qu’un vérificateur en direct lance des défis aléatoires, le prouveur génère lui-même les « défis aléatoires » en *hachant* sa propre preuve en cours. Parce qu’une bonne fonction de hachage est imprévisible (Article 3), le prouveur ne peut pas fabriquer des défis à son avantage. La conversation bavarde s’effondre en une **preuve autonome unique** que n’importe qui peut vérifier plus tard, sans interaction.

**Succinct.** Les meilleurs systèmes rendent la preuve **minuscule et rapide à vérifier, quelle que soit la taille de l’énoncé.** C’est la partie vraiment stupéfiante.

> Une preuve Groth16 (le système qu’utilise Sapling) fait environ **192 octets** et se vérifie en quelques millisecondes, *que l’énoncé qu’elle prouve soit petit ou énorme.* Quelques centaines d’octets peuvent attester d’un calcul impliquant plusieurs milliers de contraintes.

En réunissant ces deux idées, on obtient l’acronyme que vous verrez partout :

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Divulgation nulle de connaissance (ne révèle rien), succinct (minuscule et rapide), non interactif (en une seule fois), argument de connaissance (le prouveur *connaît* réellement un témoin valide).

---

## 6. Le seul piège : la configuration de confiance

Il n’y a pas de repas gratuit. Beaucoup de SNARKs nécessitent une **configuration** unique qui produit des paramètres publics pour le circuit. Cette configuration génère en sous-produit un aléa secret, et ce secret doit être **détruit.** Si quelqu’un le conservait, il pourrait forger des preuves, c’est-à-dire **forger de la monnaie** (bien que, point crucial, il ne pourrait toujours *pas* briser la confidentialité).

Ce secret résiduel est surnommé le **déchet toxique**. Pour s’en débarrasser en toute sécurité, Zcash a mené d’élaborées **cérémonies multipartites** au cours desquelles de nombreux participants indépendants ont chacun apporté de l’aléa ; tant qu’*au moins un seul* a détruit honnêtement sa part, le déchet toxique est irrécupérable.

![texte alternatif](image-26.png)

Les systèmes plus récents suppriment entièrement cette exigence, ce qui est l’une des principales raisons pour lesquelles Zcash a fait évoluer son système de preuve au fil du temps.

---

## 7. Où cela se situe dans Zcash

| Design | Système de preuve | Configuration de confiance ? | Basé sur |
|---|---|---|---|
| **Sprout** (le plus ancien) | premier zk-SNARK | Oui | cérémonie d’origine |
| **Sapling** | **Groth16** | Oui (la cérémonie multipartite « Powers of Tau » + cérémonie Sapling) | **BLS12-381** (Article 2) |
| **Orchard** (actuel) | **Halo 2** | **Aucune configuration de confiance** | **Pallas / Vesta** (Article 2) |

Le passage de Sprout à Sapling puis à Orchard est en grande partie l’histoire de preuves devenues plus petites, plus rapides, et débarrassées de la configuration de confiance. **Halo 2**, utilisé par Orchard, n’a besoin d’aucune cérémonie et est conçu pour prendre en charge la *récursion* (des preuves qui vérifient d’autres preuves), c’est pourquoi Orchard utilise le **cycle** de courbes Pallas/Vesta de l’Article 2 : chaque courbe est optimisée pour vérifier des preuves écrites sur l’autre.

Cela referme la plus grande boucle ouverte dans l’Article 0. La magie « derrière le rideau » est un **zk-SNARK** : il prouve que votre transaction satisfait un circuit arithmétique codant toutes les règles, tout en ne révélant rien d’autre que le bit unique « valide ».

---

## 8. Une mise au point honnête

Les preuves à divulgation nulle de connaissance sont un domaine profond, et nous sommes volontairement restés au niveau de l’intuition. Nous n’avons pas défini les bornes de probabilité précises de la solidité, la forme exacte d’un circuit arithmétique (R1CS, PLONKish, etc.), la manière dont les polynômes et les engagements transforment un circuit en preuve courte, ni les véritables mécanismes internes de Groth16 et Halo 2. La grotte est une preuve *interactive* ; les systèmes de production sont non interactifs et bien plus complexes. Rien de tout cela ne change le cœur du sujet : prouver qu’un circuit est satisfait par un témoin secret, de façon complète, solide, et sans rien révéler. La machinerie mérite à elle seule toute une série.

---

## 9. Résumé

- Une **preuve à divulgation nulle de connaissance** permet à un prouveur de convaincre un vérificateur qu’un énoncé est vrai **sans rien révéler d’autre**, ce qui résout le paradoxe entre vérification et confidentialité.
- Elle doit satisfaire trois garanties : **complétude** (les énoncés vrais convainquent), **solidité** (les énoncés faux ne le peuvent pas) et **divulgation nulle de connaissance** (le vérificateur n’apprend que « c’est vrai »).
- Des énoncés arbitraires deviennent des **circuits arithmétiques** sur un corps fini ; les entrées secrètes qui satisfont le circuit sont le **témoin**. Voilà pourquoi les corps finis et les fonctions de hachage compatibles ZK étaient importants.
- **Fiat-Shamir** rend les preuves **non interactives** (en une seule fois) ; les meilleurs systèmes sont aussi **succincts** (une preuve Groth16 fait environ **192 octets** et se vérifie en quelques millisecondes quelle que soit la taille de l’énoncé). Ensemble : un **zk-SNARK**.
- Certains SNARKs nécessitent une **configuration de confiance** dont le **déchet toxique** résiduel doit être détruit (au moyen de cérémonies multipartites) ; une compromission permettrait de forger de la monnaie mais **pas** de briser la confidentialité.
- **Sapling** utilise **Groth16** (configuration de confiance, BLS12-381) ; **Orchard** utilise **Halo 2** (pas de configuration de confiance, Pallas/Vesta, compatible avec la récursion).

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Zero-knowledge proof** | Convaincre quelqu’un qu’un énoncé est vrai sans rien révéler d’autre |
| **Prover / Verifier** | Celui qui produit la preuve / celui qui la vérifie |
| **Completeness** | Les énoncés vrais sont toujours acceptés (par un prouveur honnête) |
| **Soundness** | Les énoncés faux sont rejetés (les tricheurs ne peuvent gagner que par chance) |
| **Witness** | Les entrées secrètes qui rendent l’énoncé vrai |
| **Arithmetic circuit** | Un énoncé réécrit sous forme d’additions et de multiplications sur un corps fini |
| **Non-interactive (Fiat-Shamir)** | Une preuve en une seule fois, sans allers-retours en direct |
| **Succinct** | La preuve est minuscule et rapide à vérifier quelle que soit la taille de l’énoncé |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Trusted setup / toxic waste** | Génération unique de paramètres dont le secret résiduel doit être détruit |

---

## FAQ

**Si la preuve ne révèle rien, comment sa vérification peut-elle avoir un sens ?**
Parce que les mathématiques sont organisées de telle sorte que *seul* un témoin réel et valide peut produire une preuve qui passe la vérification. Le fait de réussir cette vérification est en lui-même la preuve, sans qu’aucune divulgation soit nécessaire.

**Quelqu’un pourrait-il simuler une preuve ?**
La solidité rend cela irréalisable en pratique. La seule exception est un SNARK dont le déchet toxique de la configuration de confiance aurait été conservé ; c’est précisément pour cela que les cérémonies destinées à le détruire sont importantes.

**Une configuration de confiance compromise fuit-elle mes données privées ?**
Non. Elle permettrait à un attaquant de forger de la *nouvelle* monnaie, mais elle ne révèle **pas** les montants, les adresses ni les notes. La confidentialité et la solidité sont des garanties distinctes.

**Pourquoi Zcash a-t-il changé de systèmes de preuve au fil du temps ?**
Pour obtenir des preuves plus petites, plus rapides et, avec Halo 2, éliminer entièrement la configuration de confiance et permettre la récursion.

---

### Testez votre intuition

Dans la grotte, pourquoi est-il essentiel que le vérificateur choisisse le côté de sortie *après* que le prouveur est déjà entré, plutôt que de l’annoncer à l’avance ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Si le vérificateur annonçait d’abord le côté, un bluffeur qui ne connaît pas le mot pourrait simplement entrer de ce côté dès le départ et ressortir tranquillement, sans jamais avoir besoin de la porte. Le fait de choisir *après* que le prouveur s’est engagé dans un passage oblige un bluffeur à compter sur la chance (50/50 à chaque tour), ce qui rend des tours répétés convaincants. Cet ordre « d’abord s’engager, puis être mis au défi » est exactement ce que Fiat-Shamir préserve en dérivant le défi à partir d’un hachage de la preuve déjà engagée du prouveur.
</details>

---

### La suite

**Article 6 . Le protocole shielded de bout en bout :** le final. Nous prenons chaque pièce — notes, engagements, l’arbre d’engagements de notes, nullifiers, équilibre de valeur et preuve à divulgation nulle de connaissance — et assemblons une transaction shielded Zcash complète, en refermant chacune des boucles ouvertes dès l’Article 0.

*Fait partie de la série* Zcash from First Principles *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
