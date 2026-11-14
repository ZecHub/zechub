# Preuves à divulgation nulle de connaissance : prouver que vous avez raison sans dire pourquoi
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-23-71534bece9.webp)

### Le rideau qui permet au monde de vérifier ce qu'il ne pourra jamais voir

> **Série :** *Zcash à partir des principes fondamentaux* . **Article 5 . Preuves à divulgation nulle de connaissance**
> **Public :** débutants. Nous nous appuyons sur tous les articles précédents (corps finis, courbes, engagements, arbres de Merkle), mais chaque idée est rappelée au moment où nous en avons besoin.
> **Ce que vous en retiendrez :** une compréhension intuitive et correcte de ce qu'est une preuve à divulgation nulle de connaissance, des trois garanties qu'elle offre, de la manière dont on prouve des énoncés arbitraires, et de ce qui fait fonctionner Sapling et Orchard dans Zcash.

Voici l'article vers lequel toute la série tendait. Depuis l'[Article 0](article-0-shielded-transaction.md), nous répétons qu'un paiement est validé « derrière un rideau », prouvé correct sans rien révéler. Une preuve à divulgation nulle de connaissance, c'est ce rideau. C'est la pièce qui résout enfin le paradoxe posé au départ : *comment le public peut-il vérifier une transaction qu'il n'a pas le droit de voir ?*

---

## 1. Pourquoi vous y intéresser ?

Rappelez-vous la contradiction au cœur de Zcash :

- Une blockchain est digne de confiance parce qu'elle est **vérifiable publiquement**.
- Les paiements Zcash sont **entièrement confidentiels** : montants, expéditeur, destinataire, tout est caché.

Ces deux propriétés semblent s'exclure mutuellement. Vérifier semble *exiger* de regarder. La confidentialité *interdit* de regarder. Si vous ne parvenez pas à les concilier, vous ne pouvez pas avoir une monnaie confidentielle à laquelle chacun fait confiance.

Une **preuve à divulgation nulle de connaissance (ZKP)** est cette conciliation. Elle permet à un **prouveur** de convaincre un **vérificateur** qu'un énoncé est vrai **sans rien révéler d'autre que le fait qu'il est vrai.** Aucun montant. Aucune identité. Aucune note. Simplement : *« tout ici respecte les règles. »* Construisons l'intuition avant toute mécanique.

---

## 2. L'intuition : trois preuves du quotidien

**Prouver que vous connaissez un mot de passe, sans le dire.** Un site web pourrait vérifier que vous connaissez votre mot de passe en vous regardant déverrouiller quelque chose que seul ce mot de passe déverrouille, sans jamais voir le mot de passe lui-même. Vous prouvez une *connaissance* sans *divulgation*.

**L'ami daltonien et les deux balles.** Vous tenez une balle rouge et une balle verte qui paraissent identiques à votre ami daltonien. Vous voulez le convaincre qu'elles sont de *couleurs différentes* sans lui dire laquelle est laquelle. Il les cache toutes les deux derrière son dos, les échange ou non, puis vous en montre une. Vous lui dites s'il les a échangées. Si les balles diffèrent réellement, vous avez toujours raison. Si elles étaient identiques, vous devineriez, et n'auriez raison qu'une fois sur deux. Après 20 manches, votre série ininterrompue le convainc qu'elles diffèrent, et pourtant il n'apprend jamais quelle balle est rouge. **Il est convaincu d'un fait sans rien apprendre d'autre.** C'est la divulgation nulle de connaissance en miniature.

**La grotte.** Une grotte en forme d'anneau possède au fond une porte magique qui ne s'ouvre qu'avec un mot secret. Vous affirmez connaître ce mot. Pour le prouver sans le révéler : un vérificateur attend dehors pendant que vous entrez et choisissez au hasard le passage de gauche ou de droite. Le vérificateur crie ensuite par quel côté il veut vous voir *ressortir*. Si vous connaissez vraiment le mot, vous pouvez toujours obéir (vous pouvez ouvrir la porte pour changer de côté si nécessaire). Si vous bluffez, vous ne pouvez ressortir du bon côté que par chance, à 50/50 à chaque manche. Répétez l'opération 20 fois, et les chances qu'un bluffeur s'en sorte sont inférieures à une sur un million.

Cette histoire de grotte illustre discrètement les **trois garanties** que toute preuve à divulgation nulle de connaissance doit offrir.

---

## 3. Les trois garanties

![alt text](/content-images/image-24-b559d31849.webp)

| Garantie | Dans l'histoire de la grotte | Dans Zcash |
|---|---|---|
| **Complétude** | Si vous connaissez le mot, vous sortez toujours du bon côté | Une transaction valide produit toujours une preuve acceptée |
| **Solidité** | Un bluffeur est démasqué avec une probabilité écrasante | Une transaction frauduleuse (fausse monnaie, double dépense) ne peut pas produire de preuve acceptée |
| **Divulgation nulle de connaissance** | Le vérificateur n'entend jamais le mot secret | Le réseau n'apprend jamais les montants, les adresses, ni de quelle note il s'agit |

Si l'une de ces garanties fait défaut, le système s'effondre : sans complétude, les utilisateurs honnêtes sont rejetés ; sans solidité, les faussaires impriment de la monnaie ; sans divulgation nulle de connaissance, la confidentialité s'évapore.

---

## 4. D'une grotte à *n'importe quel* énoncé : circuits et témoins

La grotte prouve un petit fait amusant. Zcash doit prouver un énoncé riche : *« Je connais une note non dépensée dans l'arbre, je suis autorisé à la dépenser, son nullifier est calculé correctement, et mes entrées sont égales à mes sorties. »* Comment passer des balles et des grottes à cela ?

Le pont est une idée qui relie toute cette série :

> **Tout énoncé que vous pouvez vérifier par un calcul peut être réécrit sous forme de circuit arithmétique :** un réseau d'additions et de multiplications sur un corps fini (Article 1).

Considérez le circuit comme une liste de contraintes arithmétiques qui ne sont *toutes satisfaites que si l'énoncé est vrai.* Les entrées privées qui font que tout se vérifie, votre note, votre clé, le chemin Merkle, sont appelées le **témoin.**

![alt text](/content-images/image-25-2479377e43.webp)

C'est pourquoi nous avons consacré l'Article 1 aux corps finis et l'Article 3 aux fonctions de hachage adaptées au ZK : le circuit parle le langage de l'arithmétique sur les corps, donc chaque opération à l'intérieur de l'énoncé (y compris le hachage et la remontée Merkle de l'Article 4) doit être exprimée de cette manière. Moins chaque opération coûte à exprimer, plus la preuve est petite et rapide.

---

## 5. La rendre pratique : non interactive et succincte

La grotte nécessitait de nombreux allers-retours. C'est irréaliste pour une blockchain, où une preuve doit être publiée une seule fois et vérifiée par tout le monde, pour toujours. Deux améliorations règlent ce problème.

**Non interactive (l'idée de Fiat-Shamir).** Au lieu d'un vérificateur en direct qui lance des défis aléatoires, le prouveur génère lui-même les « défis aléatoires » en *hachant* sa propre preuve en cours de construction. Comme une bonne fonction de hachage est imprévisible (Article 3), le prouveur ne peut pas truquer les défis en sa faveur. La conversation à rallonge se réduit à **une seule preuve autonome** que chacun peut vérifier plus tard, sans aucune interaction.

**Succincte.** Les meilleurs systèmes rendent la preuve **minuscule et rapide à vérifier, quelle que soit la taille de l'énoncé.** C'est la partie véritablement stupéfiante.

> Une preuve Groth16 (le système qu'utilise Sapling) fait environ **192 octets** et se vérifie en quelques millisecondes, *que l'énoncé qu'elle prouve soit petit ou énorme.* Quelques centaines d'octets peuvent attester d'un calcul impliquant plusieurs milliers de contraintes.

Mettez tout cela ensemble et vous obtenez l'acronyme que vous verrez partout :

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge, soit un argument de connaissance succinct, non interactif et à divulgation nulle de connaissance. À divulgation nulle de connaissance (ne révèle rien), succinct (minuscule et rapide), non interactif (en une seule fois), argument de connaissance (le prouveur *connaît* réellement un témoin valide).

---

## 6. Le seul hic : la configuration de confiance

Rien n'est gratuit. De nombreux SNARK nécessitent une **configuration** unique qui produit des paramètres publics pour le circuit. Cette configuration génère au passage un aléa secret, et ce secret doit être **détruit.** Si quelqu'un le conservait, il pourrait falsifier des preuves, c'est-à-dire **fabriquer de la fausse monnaie** (mais, point crucial, il ne pourrait toujours *pas* briser la confidentialité).

Ce secret résiduel est surnommé **déchet toxique.** Pour s'en débarrasser en toute sécurité, Zcash a organisé d'élaborées **cérémonies multipartites** où de nombreux participants indépendants ont chacun apporté leur part d'aléa ; tant qu'*un seul* d'entre eux a détruit honnêtement sa part, le déchet toxique est irrécupérable.

![alt text](/content-images/image-26-cdad6625cd.webp)

Les systèmes plus récents suppriment entièrement cette exigence, et c'est l'une des principales raisons pour lesquelles Zcash a fait évoluer son système de preuve au fil du temps.

---

## 7. Où cela se situe dans Zcash

| Conception | Système de preuve | Configuration de confiance ? | Repose sur |
|---|---|---|---|
| **Sprout** (la plus ancienne) | zk-SNARK des débuts | Oui | cérémonie d'origine |
| **Sapling** | **Groth16** | Oui (la cérémonie multipartite « Powers of Tau » + Sapling) | **BLS12-381** (Article 2) |
| **Orchard** (actuelle) | **Halo 2** | **Aucune configuration de confiance** | **Pallas / Vesta** (Article 2) |

Le passage de Sprout à Sapling puis à Orchard est en grande partie l'histoire de preuves devenues plus petites, plus rapides, et débarrassées de la configuration de confiance. **Halo 2**, utilisé par Orchard, ne nécessite aucune cérémonie et est conçu pour prendre en charge la *récursion* (des preuves qui vérifient d'autres preuves), c'est pourquoi Orchard utilise le **cycle** de courbes Pallas/Vesta de l'Article 2 : chaque courbe est réglée pour vérifier les preuves écrites sur l'autre.

Cela referme la plus grande boucle ouverte dans l'Article 0. La magie « derrière le rideau » est un **zk-SNARK** : il prouve que votre transaction satisfait un circuit arithmétique qui encode toutes les règles, sans rien révéler d'autre que le seul bit « valide ».

---

## 8. Un avertissement honnête

Les preuves à divulgation nulle de connaissance constituent un domaine profond, et nous sommes volontairement restés au niveau de l'intuition. Nous n'avons pas défini les bornes de probabilité précises de la solidité, la forme exacte d'un circuit arithmétique (R1CS, PLONKish, etc.), la manière dont les polynômes et les engagements transforment un circuit en une preuve courte, ni le fonctionnement interne réel de Groth16 et de Halo 2. La grotte est une preuve *interactive* ; les systèmes en production sont non interactifs et bien plus complexes. Rien de cela ne change l'essentiel : prouver qu'un circuit est satisfait par un témoin secret, de manière complète, solide, et sans rien révéler. La mécanique mériterait à elle seule une série entière.

---

## 9. Résumé

- Une **preuve à divulgation nulle de connaissance** permet à un prouveur de convaincre un vérificateur qu'un énoncé est vrai **sans rien révéler d'autre**, ce qui résout le paradoxe entre vérification et confidentialité.
- Elle doit satisfaire trois garanties : la **complétude** (les énoncés vrais convainquent), la **solidité** (les énoncés faux ne le peuvent pas) et la **divulgation nulle de connaissance** (le vérificateur apprend seulement « c'est vrai »).
- Les énoncés arbitraires deviennent des **circuits arithmétiques** sur un corps fini ; les entrées secrètes qui satisfont le circuit forment le **témoin**. C'est pourquoi les corps finis et les fonctions de hachage adaptées au ZK étaient importants.
- **Fiat-Shamir** rend les preuves **non interactives** (en une seule fois) ; les meilleurs systèmes sont aussi **succincts** (une preuve Groth16 fait environ **192 octets** et se vérifie en quelques millisecondes, quelle que soit la taille de l'énoncé). Ensemble : un **zk-SNARK**.
- Certains SNARK nécessitent une **configuration de confiance** dont le **déchet toxique** résiduel doit être détruit (au moyen de cérémonies multipartites) ; une compromission permettrait de fabriquer de la fausse monnaie, mais **pas** de briser la confidentialité.
- **Sapling** utilise **Groth16** (configuration de confiance, BLS12-381) ; **Orchard** utilise **Halo 2** (aucune configuration de confiance, Pallas/Vesta, adapté à la récursion).

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Zero-knowledge proof** | Convaincre quelqu'un qu'un énoncé est vrai sans rien révéler d'autre |
| **Prover / Verifier** | Celui qui produit la preuve / celui qui la vérifie |
| **Completeness** | Les énoncés vrais sont toujours acceptés (venant d'un prouveur honnête) |
| **Soundness** | Les énoncés faux sont rejetés (les tricheurs ne peuvent gagner que par chance) |
| **Witness** | Les entrées secrètes qui rendent l'énoncé vrai |
| **Arithmetic circuit** | Un énoncé réécrit sous forme d'additions et de multiplications sur un corps fini |
| **Non-interactive (Fiat-Shamir)** | Une preuve en une seule fois, sans échanges en direct |
| **Succinct** | La preuve est minuscule et rapide à vérifier, quelle que soit la taille de l'énoncé |
| **zk-SNARK** | Argument de connaissance succinct, non interactif et à divulgation nulle de connaissance |
| **Trusted setup / toxic waste** | Génération unique de paramètres dont le secret résiduel doit être détruit |

---

## FAQ

**Si la preuve ne révèle rien, comment sa vérification peut-elle avoir un sens ?**
Parce que les mathématiques sont agencées de sorte que *seul* un témoin réel et valide puisse produire une preuve qui passe la vérification. Réussir la vérification constitue en soi la preuve, sans aucune divulgation.

**Quelqu'un pourrait-il falsifier une preuve ?**
La solidité rend cela irréalisable. La seule exception est un SNARK dont le déchet toxique de la configuration de confiance aurait été conservé ; c'est précisément pourquoi les cérémonies destinées à le détruire sont importantes.

**Une configuration de confiance compromise divulgue-t-elle mes données privées ?**
Non. Elle permettrait à un attaquant de fabriquer de la *nouvelle* monnaie, mais elle ne révèle **pas** les montants, les adresses ni les notes. La confidentialité et la solidité sont des garanties distinctes.

**Pourquoi Zcash a-t-il changé de système de preuve au fil du temps ?**
Pour obtenir des preuves plus petites et plus rapides et, avec Halo 2, pour éliminer entièrement la configuration de confiance et permettre la récursion.

---

### Testez votre intuition

Dans la grotte, pourquoi est-il essentiel que le vérificateur choisisse le côté de sortie *après* que le prouveur est déjà entré, plutôt que de l'annoncer à l'avance ? *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Si le vérificateur annonçait le côté d'abord, un bluffeur qui ne connaît pas le mot pourrait simplement entrer de ce côté dès le départ et ressortir tranquillement, sans jamais avoir besoin de la porte. Choisir *après* que le prouveur s'est engagé dans un passage oblige le bluffeur à compter sur la chance (50/50 par manche), et c'est ce qui rend les manches répétées convaincantes. Cet ordre « s'engager d'abord, puis être mis au défi » est exactement ce que préserve Fiat-Shamir en dérivant le défi d'un hachage de la preuve à laquelle le prouveur s'est déjà engagé.
</details>

---

### Et ensuite

**Article 6 . Le protocole protégé, de bout en bout :** le final. Nous reprenons chaque pièce, les notes, les engagements, l'arbre des engagements de notes, les nullifiers, l'équilibre des valeurs et la preuve à divulgation nulle de connaissance, et nous assemblons une transaction protégée Zcash complète, refermant chacune des boucles ouvertes dès l'Article 0.

*Fait partie de la série* Zcash à partir des principes fondamentaux *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
