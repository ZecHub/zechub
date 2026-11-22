# Le protocole protégé, de bout en bout
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-27-4094293ec0.webp)

### Assembler toutes les pièces en une seule transaction Zcash privée

> **Série :** *Zcash à partir des principes fondamentaux* . **Article 6 . Le protocole protégé** (finale)
> **Public :** les nouveaux venus qui ont lu les articles 0 à 5. C'est ici que tout se rejoint.
> **Ce que vous en retirerez :** un modèle mental complet et correct d'une transaction Zcash protégée, avec chaque concept de la série à sa juste place, et chaque boucle de l'article 0 refermée.

Nous avons commencé, dans l'[article 0](article-0-shielded-transaction.md), par un paradoxe et une histoire d'enveloppes scellées sur un tableau public. Nous avons ensuite consacré cinq articles à construire les pièces : corps finis, courbes elliptiques, engagements, arbres de Merkle et preuves à divulgation nulle de connaissance. Maintenant, nous les assemblons et regardons un véritable paiement privé fonctionner, du début à la fin.

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Prise isolément, chaque pièce que vous avez étudiée est ingénieuse. Mais la *magie* de Zcash réside dans la façon dont elles s'imbriquent. Un nullifier seul n'apporte pas de confidentialité. Un engagement seul n'empêche pas la contrefaçon. Une preuve seule ne prouve rien d'utile. C'est l'**assemblage** qui transforme cinq composants en une monnaie à la fois confidentielle et digne de confiance.

Cet article est cet assemblage. À la fin, la phrase *« le réseau vérifie une transaction qu'il ne peut pas voir »* ne vous semblera plus un paradoxe, mais la conséquence évidente de pièces que vous comprenez déjà.

---

## 2. Les personnages, réunis

Voici toute la série sur une seule page, avec la correspondance entre l'histoire de l'article 0 et les véritables mécanismes.

| Élément de l'histoire de l'article 0 | Composant réel | Construit à partir de |
|---|---|---|
| L'argent dans une enveloppe | **Note** (valeur, destinataire, aléa) | encodée sous forme d'éléments de corps (art. 1) |
| L'enveloppe opaque scellée | **Engagement de note** | engagement de Pedersen / Sinsemilla (art. 2, 3) |
| Le tableau public | **Arbre des engagements de notes** (ancre = sa racine) | arbre de Merkle incrémental (art. 4) |
| Le jeton d'annulation | **Nullifier** | un hachage adapté aux preuves ZK de la note et d'une clé secrète (art. 2, 3) |
| « L'argent entrant égale l'argent sortant » | **Engagements de valeur + vérification de l'équilibre** | engagements de Pedersen homomorphes (art. 2, 3) |
| La magie en coulisses | **Preuve à divulgation nulle de connaissance** | zk-SNARK sur un circuit arithmétique (art. 5) |
| « Vous seul pouvez lire votre enveloppe » | **Note chiffrée + clés pour lecture seule** | chiffrement + hiérarchie de clés (cet article) |

---

## 3. D'où viennent les clés

Tout ce qu'un utilisateur peut faire découle d'un seul secret, la **clé de dépense**, à travers une hiérarchie à sens unique (chaque flèche est une dérivation irréversible, grâce aux trappes des articles 2 et 3) :

![alt text](/content-images/image-32-f443f9bb72.webp)

Deux points méritent d'être relevés, tous deux découlant des articles précédents :

- Cette séparation vous permet de remettre une **clé pour lecture seule** (par exemple à un auditeur) qui révèle vos transactions **sans** accorder le pouvoir de dépenser. La confidentialité est sélective, et non du tout ou rien.
- Chaque dérivation est **à sens unique** : détenir une clé pour lecture seule ne permet jamais à quiconque de retrouver la clé de dépense. C'est exactement la trappe des courbes elliptiques de l'article 2 qui fait son travail.

---

## 4. Dépenser une note : les quatre affirmations

Pour dépenser une note de manière privée, vous devez convaincre le réseau de quatre choses à la fois **sans révéler la note, sa valeur, sa position ni votre identité.** Chaque affirmation est satisfaite par un composant que vous connaissez déjà.

![alt text](/content-images/image-31-86309af194.webp)

La preuve ne révèle **aucun** des faits sous-jacents (quelle note, quelle clé, quelle valeur). Elle révèle seulement que *les quatre affirmations sont vraies.* C'est là toute l'astuce de Zcash en mode protégé, résumée en un seul diagramme.

---

## 5. L'astuce de l'équilibre des valeurs (le bénéfice que nous avions gardé pour la fin)

Dans les articles 2 et 3, nous avons noté que les engagements de Pedersen **s'additionnent** : l'engagement sur `v_1` plus l'engagement sur `v_2` est un engagement sur `v_1 + v_2`. C'est ici que cela porte ses fruits.

Chaque note d'entrée et de sortie porte un **engagement de valeur** : un engagement de Pedersen `v.G + r.H` qui masque son montant `v`. Comme ces engagements s'additionnent, le réseau peut calculer :

```
(sum of input value commitments) − (sum of output value commitments)
```

Si la transaction est équilibrée (aucun argent créé ni détruit), les parties `v` s'annulent exactement, ne laissant qu'un engagement sur une **valeur nulle**, masqué par l'aléa restant. L'expéditeur prouve qu'il connaît cet aléa restant en produisant une petite signature appelée **signature de liaison.** Une signature de liaison valide n'est possible que si les valeurs s'équilibrent réellement, **et pourtant aucun montant n'a été révélé.**

> C'est l'illustration la plus nette de toute la série de la raison *pour laquelle* nous avions besoin d'engagements homomorphes fondés sur des courbes. La règle « l'argent entrant égale l'argent sortant » est appliquée en **additionnant des enveloppes scellées** et en vérifiant que le résultat se scelle à zéro.

---

## 6. Une transaction complète, observée de bout en bout

Assemblons un paiement d'Alice à Bob. Nous utiliserons la structure claire « côté dépense / côté sortie » de Sapling comme modèle pédagogique.

**Une transaction protégée regroupe deux types de descriptions :**

| Description de dépense (consomme une note) | Description de sortie (crée une note) |
|---|---|
| engagement de valeur de l'entrée | engagement de valeur de la sortie |
| l'**ancre** par rapport à laquelle elle prouve (une racine d'arbre) | le nouvel **engagement de note** (une nouvelle feuille) |
| le **nullifier** de la note dépensée | une **clé éphémère** pour le chiffrement |
| une clé publique re-randomisée + une signature d'autorisation de dépense | la **note chiffrée** (texte chiffré destiné au destinataire) |
| la **zk-SNARK** prouvant les quatre affirmations | une **zk-SNARK** prouvant que la sortie est bien formée |

S'y ajoute une **signature de liaison** sur l'ensemble du lot, qui garantit l'équilibre des valeurs (section 5).

![alt text](/content-images/image-30-98511eb2d0.webp)

Suivez la confidentialité : le réseau a vérifié l'ancre, vérifié que le nullifier était inédit, vérifié la preuve et vérifié l'équilibre. Il a accepté un paiement valide **sans avoir appris aucun montant, aucune adresse, ni quelle note a été dépensée.** Pendant ce temps, le **nullifier** de la note dépensée (sa mort) et le nouvel **engagement** de Bob (la naissance de sa note) se trouvent dans deux structures publiques différentes, sans lien visible entre elles : c'est le lien rompu de l'article 0.

---

## 7. Refermer chaque boucle de l'article 0

L'article 0 a délibérément ouvert des questions. Les voici toutes, refermées.

| Boucle ouverte dans l'article 0 | Refermée par |
|---|---|
| Comment une enveloppe à la fois scellée et infalsifiable est-elle possible ? | Les engagements : masquage grâce à l'aléa, liaison grâce à la résistance aux collisions / la trappe de la courbe (art. 3) |
| D'où viennent les clés et les recettes secrètes ? | L'arithmétique des corps et la multiplication scalaire sur les courbes elliptiques (art. 1, 2) |
| Qu'est-ce exactement que « le tableau » ? | Un arbre de Merkle incrémental d'engagements de notes ; sa racine est l'ancre (art. 4) |
| Pourquoi le jeton d'annulation ne peut-il pas être relié à son enveloppe ? | Le nullifier est un hachage à clé conservé dans un ensemble distinct de celui des engagements (art. 2, 3, 4) |
| Comment prouver la validité sans rien révéler ? | Une zk-SNARK sur un circuit arithmétique encodant les quatre affirmations (art. 5) |
| Comment le destinataire apprend-il qu'il a été payé ? | La note est chiffrée pour son adresse ; il effectue un déchiffrement d'essai avec une clé pour lecture seule (cet article) |
| Comment la règle « argent entrant = argent sortant » est-elle appliquée de manière privée ? | Les engagements de valeur homomorphes + la signature de liaison (section 5) |

Le paradoxe de la première page, *vérifier ce que l'on ne peut pas voir*, est désormais entièrement dissipé. Le réseau vérifie des **affirmations sur des données cachées**, jamais les données elles-mêmes.

---

## 8. Sapling et Orchard, en un souffle

Nous avons enseigné avec la structure de Sapling, car sa séparation est la plus claire. La conception actuelle, **Orchard**, affine ces idées plutôt qu'elle ne les remplace :

| | **Sapling** | **Orchard** |
|---|---|---|
| Unité de transaction | descriptions de **dépense** et de **sortie** séparées | **Actions** unifiées (chacune effectue une dépense + une sortie) |
| Système de preuve | **Groth16** (configuration de confiance) | **Halo 2** (sans configuration de confiance) |
| Courbes | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Hachage d'engagement | Pedersen | Sinsemilla |

Chaque concept de cet article s'applique directement ; Orchard regroupe principalement la dépense et la sortie, et adopte un système de preuve sans cérémonie. Les cinq piliers restent inchangés.

---

## 9. Un avertissement honnête

C'est l'image la plus complète de la série, mais cela reste un modèle. Nous avons condensé les encodages exacts d'une note dans les corps, les formules précises de dérivation des clés, la re-randomisation des clés de dépense, les adresses diversifiées, les champs de mémo, la gestion des frais, la différence détaillée entre engagements de valeur et engagements de note, ainsi que le rôle précis de chaque signature. Nous avons également présenté un seul flux canonique ; les transactions réelles peuvent comporter de nombreuses dépenses et sorties à la fois et peuvent mélanger des parties transparentes et protégées. La source de référence est la spécification du protocole Zcash. Ce que vous détenez désormais, c'est la forme correcte ; la spécification en fournit chaque mesure.

---

## 10. Résumé

- Une transaction protégée imbrique les cinq composants : une **note** (la valeur), son **engagement** dans l'**arbre des engagements de notes**, un **nullifier** pour empêcher les doubles dépenses, des **engagements de valeur** pour l'équilibre, et une **zk-SNARK** qui lie le tout.
- Dépenser prouve **quatre affirmations à la fois** (la note existe, vous êtes autorisé, son nullifier est correct et les valeurs s'équilibrent) à **divulgation nulle de connaissance**, sans révéler aucun des faits sous-jacents.
- L'**équilibre des valeurs** est garanti en **additionnant des engagements homomorphes** et en vérifiant qu'ils se scellent à zéro, au moyen de la **signature de liaison**, sans divulguer aucun montant.
- Les pouvoirs d'un utilisateur découlent d'une seule **clé de dépense** à travers une **hiérarchie à sens unique**, ce qui permet des **clés pour lecture seule** qui révèlent sans accorder le pouvoir de dépenser.
- Le réseau **vérifie des affirmations sur des données cachées**, ce qui dissipe le paradoxe vérification / confidentialité de l'article 0. Chaque boucle ouverte alors est désormais refermée.
- **Orchard** affine **Sapling** (Actions unifiées, Halo 2 sans configuration de confiance, courbes Pasta, Sinsemilla) sans modifier les cinq piliers.

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Spending key** | Le secret racine unique dont dérivent toutes les clés d'un utilisateur |
| **Viewing Key** | Révèle vos transactions à son détenteur sans lui permettre de dépenser |
| **Spend description** | La partie d'une transaction qui consomme une note (nullifier, ancre, preuve) |
| **Output description** | La partie d'une transaction qui crée une note (engagement, texte chiffré, preuve) |
| **Action (Orchard)** | Une unité unifiée effectuant une dépense et une sortie ensemble |
| **Value commitment** | Un engagement de Pedersen homomorphe sur un montant |
| **Binding signature** | La signature qui prouve que les valeurs s'équilibrent sans les révéler |
| **Anchor** | La racine de l'arbre par rapport à laquelle une dépense prouve l'appartenance |
| **Trial decryption** | Le fait, pour un destinataire, de tester les nouveaux engagements afin de trouver les notes qui lui sont destinées |

---

## FAQ

**Le réseau voit-il un jour le montant ou qui a payé qui ?**
Non. Il vérifie la preuve, le caractère inédit du nullifier, l'ancre et la signature de liaison. Toutes les valeurs privées restent cachées.

**Qu'est-ce qui m'empêche de dépenser une note deux fois ?**
Le nullifier. Dépenser une note le publie ; le réseau rejette tout nullifier déjà présent dans l'ensemble des nullifiers. La même note produit toujours le même nullifier.

**Comment l'équilibre peut-il être vérifié si les montants sont cachés ?**
Les engagements de valeur s'additionnent de manière homomorphe ; les engagements d'une transaction équilibrée s'annulent pour donner un engagement sur zéro, ce que prouve la signature de liaison.

**Puis-je prouver mes transactions à un auditeur sans en perdre le contrôle ?**
Oui. Remettez-lui une clé pour lecture seule. Elle révèle votre activité protégée mais ne peut pas autoriser de dépenses, grâce à la hiérarchie de clés à sens unique.

**Sapling est-il obsolète maintenant que Orchard existe ?**
Les deux ont coexisté sur le réseau ; Orchard est la conception actuelle. Les concepts sont communs, si bien que comprendre l'un vous permet de comprendre l'autre.

---

### Testez votre intuition

Un ami affirme : « Puisque la preuve masque le montant, un voleur pourrait simplement prétendre que ses sorties valent plus que ses entrées et créer de l'argent à partir de rien. » En vous appuyant sur la section 5, expliquez en deux phrases pourquoi cela échoue. *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Les montants sont cachés, mais chacun est enveloppé dans un engagement de valeur homomorphe, et le réseau additionne tous les engagements d'entrée et soustrait tous les engagements de sortie ; si les valeurs cachées ne s'équilibraient pas, le résultat ne se scellerait pas à zéro et **aucune signature de liaison valide ne pourrait être produite.** Le voleur peut cacher *combien*, mais il ne peut pas faire passer des valeurs déséquilibrées à travers la vérification de l'équilibre : créer de l'argent à partir de rien est donc impossible, car même sans rien révéler, il serait démasqué par l'arithmétique.
</details>

---

### La série, au complet

Vous avez désormais parcouru le chemin d'un simple paradoxe jusqu'à un paiement privé complet :

![alt text](/content-images/cd8bbb40-57b8-4854-b9cf-97f2485d126a-8847fae521.webp)


À partir d'ici, la suite naturelle va plus en profondeur : le fonctionnement interne de Groth16 et de Halo 2, les cérémonies de configuration de confiance, les circuits Sapling et Orchard en détail, la dérivation des clés et les adresses diversifiées, ainsi que l'évolution du protocole au fil des mises à niveau du réseau. Mais les fondations sont désormais en place, et chacun de ces sujets dispose d'un point d'ancrage.

*Fait partie de la série* Zcash à partir des principes fondamentaux *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
