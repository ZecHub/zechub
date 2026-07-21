# Le protocole shielded, de bout en bout
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![texte alternatif](image-27.png)

### Assembler chaque pièce en une seule transaction privée Zcash

> **Série :** *Zcash from First Principles* . **Article 6 . Le protocole shielded** (final)
> **Public :** les nouveaux venus qui ont lu les articles 0 à 5. C'est ici que tout se relie.
> **Ce que vous en retirerez :** un modèle mental complet et correct d'une transaction shielded Zcash, avec chaque concept de la série à sa juste place, et chaque boucle ouverte dans l'article 0 refermée.

Nous avons commencé, dans [l'article 0](article-0-shielded-transaction.md), par un paradoxe et une histoire d'enveloppes scellées sur un tableau public. Puis nous avons passé cinq articles à construire les pièces : corps finis, courbes elliptiques, commitments, arbres de Merkle et preuves à divulgation nulle de connaissance. Maintenant, nous les assemblons et regardons fonctionner un véritable paiement privé, du début à la fin.

---

## 1. Pourquoi devriez-vous vous en soucier ?

Pris individuellement, chaque élément que vous avez appris est ingénieux. Mais la *magie* de Zcash réside dans la manière dont ils s'emboîtent. Un nullifier seul n'apporte pas la confidentialité. Un commitment seul n'empêche pas la falsification. Une preuve seule ne prouve rien d'utile. C'est l'**assemblage** qui transforme cinq composants en une monnaie à la fois privée et digne de confiance.

Cet article est cet assemblage. À la fin, la phrase *« le réseau vérifie une transaction qu'il ne peut pas voir »* vous paraîtra non plus comme un paradoxe, mais comme une conséquence évidente de pièces que vous comprenez déjà.

---

## 2. Les éléments, réassemblés

Voici toute la série sur une seule page, cartographiée de l'histoire de l'article 0 à la mécanique réelle.

| Élément de l'histoire de l'article 0 | Composant réel | Construit à partir de |
|---|---|---|
| L'argent à l'intérieur d'une enveloppe | **Note** (valeur, destinataire, aléa) | encodée sous forme d'éléments de corps (art. 1) |
| L'enveloppe opaque scellée | **Note commitment** | commitment Pedersen / Sinsemilla (art. 2, 3) |
| Le tableau public | **Arbre des note commitments** (anchor = sa racine) | arbre de Merkle incrémental (art. 4) |
| Le jeton du néant | **Nullifier** | un hachage compatible ZK de la note + clé secrète (art. 2, 3) |
| « argent entrant = argent sortant » | **Value commitments + vérification d'équilibre** | commitments Pedersen homomorphes (art. 2, 3) |
| La magie derrière le rideau | **Preuve à divulgation nulle de connaissance** | zk-SNARK sur un circuit arithmétique (art. 5) |
| « Vous seul pouvez lire votre enveloppe » | **Note chiffrée + viewing keys** | chiffrement + hiérarchie de clés (cet article) |

---

## 3. D'où viennent les clés

Tout ce qu'un utilisateur peut faire découle d'un unique secret, la **spending key**, à travers une hiérarchie à sens unique (chaque flèche est une dérivation irréversible, grâce aux fonctions pièges des articles 2 et 3) :

![texte alternatif](image-32.png)

Deux choses méritent d'être remarquées, toutes deux conséquences des articles précédents :

- Cette séparation vous permet de distribuer une **viewing key** (par exemple, à un auditeur) qui révèle vos transactions **sans** accorder le pouvoir de dépenser. La confidentialité est sélective, pas tout ou rien.
- Chaque dérivation est **à sens unique** : détenir une viewing key ne permet jamais à quiconque de retrouver la spending key, exactement comme la fonction piège des courbes elliptiques de l'article 2 fait son travail.

---

## 4. Dépenser une note : les quatre affirmations

Pour dépenser une note en privé, vous devez convaincre le réseau de quatre choses à la fois **sans révéler la note, sa valeur, sa position ni votre identité.** Chaque affirmation est satisfaite par un composant que vous connaissez déjà.

![texte alternatif](image-31.png)

La preuve ne révèle **aucun** des faits sous-jacents (quelle note, quelle clé, quelle valeur). Elle révèle seulement que *les quatre affirmations sont vraies.* C'est toute l'astuce de Zcash shielded, énoncée dans un seul schéma.

---

## 5. L'astuce de l'équilibre de valeur (le gain que nous avions gardé pour plus tard)

Dans les articles 2 et 3, nous avons remarqué que les commitments Pedersen **s'additionnent** : le commitment à `v_1` plus le commitment à `v_2` est un commitment à `v_1 + v_2`. Voici où cela devient utile.

Chaque note d'entrée et de sortie porte un **value commitment** : un commitment Pedersen `v.G + r.H` qui masque son montant `v`. Comme ils s'additionnent, le réseau peut calculer :

```
(sum of input value commitments) − (sum of output value commitments)
```

Si la transaction est équilibrée (aucune monnaie créée ni détruite), les parties `v` s'annulent exactement, ne laissant qu'un commitment sur une **valeur nulle**, masqué par l'aléa résiduel. L'expéditeur prouve qu'il connaît cet aléa résiduel en produisant une petite signature appelée la **binding signature.** Une binding signature valide n'est possible que lorsque les valeurs s'équilibrent réellement, **sans qu'un seul montant ne soit révélé.**

> C'est l'illustration la plus nette de toute la série de *pourquoi* nous avions besoin de commitments homomorphes basés sur des courbes. La règle « argent entrant = argent sortant » est imposée en **additionnant des enveloppes scellées** et en vérifiant que le résultat se scelle à zéro.

---

## 6. Une transaction complète, observée de bout en bout

Assemblons maintenant le paiement d'Alice à Bob. Nous utiliserons la structure limpide de Sapling « côté dépense / côté sortie » comme modèle pédagogique.

**Une transaction shielded regroupe deux types de descriptions :**

| Description de dépense (consomme une note) | Description de sortie (crée une note) |
|---|---|
| value commitment de l'entrée | value commitment de la sortie |
| l'**anchor** contre lequel elle prouve (une racine d'arbre) | le nouveau **note commitment** (une nouvelle feuille) |
| le **nullifier** de la note dépensée | une **clé éphémère** pour le chiffrement |
| une clé publique re-randomisée + signature d'autorisation de dépense | la **note chiffrée** (texte chiffré pour le destinataire) |
| le **zk-SNARK** prouvant les quatre affirmations | un **zk-SNARK** prouvant que la sortie est bien formée |

Plus une **binding signature** sur l'ensemble, qui impose l'équilibre de valeur (section 5).

![texte alternatif](image-30.png)

Suivez la confidentialité : le réseau a vérifié l'anchor, vérifié que le nullifier était inédit, vérifié la preuve, et vérifié l'équilibre. Il a accepté un paiement valide **sans apprendre aucun montant, aucune adresse, ni quelle note a été dépensée.** Pendant ce temps, le **nullifier** de la note dépensée (sa mort) et le nouveau **commitment** de Bob (la naissance de sa note) se trouvent dans deux structures publiques différentes sans lien visible entre eux, le lien coupé de l'article 0.

---

## 7. Refermer chaque boucle de l'article 0

L'article 0 ouvrait délibérément des questions. Les voici toutes, refermées.

| Boucle ouverte dans l'article 0 | Refermée par |
|---|---|
| Comment une enveloppe scellée mais infalsifiable est-elle possible ? | Les commitments : masquage par l'aléa, liaison par la résistance aux collisions / la fonction piège de la courbe (art. 3) |
| D'où viennent les clés et les recettes secrètes ? | L'arithmétique des corps et la multiplication scalaire sur courbe elliptique (art. 1, 2) |
| Qu'est-ce exactement que « le tableau » ? | Un arbre de Merkle incrémental de note commitments ; sa racine est l'anchor (art. 4) |
| Pourquoi le jeton du néant ne peut-il pas être relié à son enveloppe ? | Le nullifier est un hachage à clé conservé dans un ensemble distinct de celui des commitments (art. 2, 3, 4) |
| Comment prouver la validité sans rien révéler ? | Un zk-SNARK sur un circuit arithmétique encodant les quatre affirmations (art. 5) |
| Comment le destinataire apprend-il qu'il a été payé ? | La note est chiffrée vers son adresse ; il tente de la déchiffrer avec une viewing key (cet article) |
| Comment « argent entrant = argent sortant » est-il imposé en privé ? | Value commitments homomorphes + binding signature (sec. 5) |

Le paradoxe de la première page, *vérifier ce que l'on ne peut pas voir*, est maintenant entièrement dissipé. Le réseau vérifie des **affirmations sur des données cachées**, jamais les données elles-mêmes.

---

## 8. Sapling vs Orchard, en une phrase

Nous avons enseigné avec la structure de Sapling parce que sa séparation est la plus claire. La conception actuelle, **Orchard**, affine plutôt qu'elle ne remplace ces idées :

| | **Sapling** | **Orchard** |
|---|---|---|
| Unité de transaction | descriptions **Spend** et **Output** séparées | **Actions** unifiées (chacune effectue une dépense + une sortie) |
| Système de preuve | **Groth16** (trusted setup) | **Halo 2** (pas de trusted setup) |
| Courbes | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Hachage de commitment | Pedersen | Sinsemilla |

Chaque concept de cet article s'applique directement ; Orchard regroupe surtout dépense et sortie ensemble et remplace le système de preuve par un autre sans cérémonie. Les cinq piliers restent inchangés.

---

## 9. Une mise en garde honnête

Il s'agit de l'image la plus complète de la série, mais cela reste un modèle. Nous avons condensé les encodages exacts d'une note dans le corps, les formules précises de dérivation de clés, la re-randomisation des clés de dépense, les adresses diversifiées, les champs mémo, la gestion des frais, la différence entre value commitments et note commitments dans tous leurs détails, ainsi que le rôle précis de chaque signature. Nous avons également présenté un flux canonique ; les transactions réelles peuvent comporter de nombreuses dépenses et sorties à la fois et peuvent mélanger des parties transparentes et shielded. La source faisant autorité est la spécification du protocole Zcash. Ce que vous avez maintenant en main est la forme correcte ; la spécification en remplit chaque mesure.

---

## 10. Résumé

- Une transaction shielded imbrique les cinq composants : une **note** (la valeur), son **commitment** dans l'**arbre des note commitments**, un **nullifier** pour empêcher les doubles dépenses, des **value commitments** pour l'équilibre, et un **zk-SNARK** qui lie le tout.
- Dépenser prouve **quatre affirmations à la fois** : la note existe, vous êtes autorisé, son nullifier est correct, et la valeur s'équilibre, en **connaissance nulle**, sans révéler aucun des faits sous-jacents.
- L'**équilibre de valeur** est imposé en **additionnant des commitments homomorphes** et en vérifiant qu'ils se scellent à zéro, via la **binding signature**, sans qu'aucun montant ne soit divulgué.
- Les capacités d'un utilisateur découlent d'une unique **spending key** à travers une **hiérarchie à sens unique**, ce qui permet des **viewing keys** qui révèlent sans accorder le pouvoir de dépenser.
- Le réseau **vérifie des affirmations sur des données cachées**, dissipant le paradoxe vérification-vs-confidentialité de l'article 0. Chaque boucle ouverte là-bas est maintenant refermée.
- **Orchard** affine **Sapling** (Actions unifiées, Halo 2 sans trusted setup, courbes Pasta, Sinsemilla) sans changer les cinq piliers.

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Spending key** | Le secret racine unique dont dérivent toutes les clés d'un utilisateur |
| **Viewing key** | Révèle vos transactions à un détenteur sans lui permettre de dépenser |
| **Description de dépense** | La partie d'une tx qui consomme une note (nullifier, anchor, preuve) |
| **Description de sortie** | La partie d'une tx qui crée une note (commitment, texte chiffré, preuve) |
| **Action (Orchard)** | Une unité unifiée effectuant ensemble une dépense et une sortie |
| **Value commitment** | Un commitment Pedersen homomorphe sur un montant |
| **Binding signature** | La signature qui prouve que les valeurs s'équilibrent sans les révéler |
| **Anchor** | La racine d'arbre contre laquelle une dépense prouve son appartenance |
| **Déchiffrement d'essai** | Le fait pour un destinataire de tester de nouveaux commitments pour trouver les notes qui lui sont destinées |

---

## FAQ

**Le réseau voit-il un jour le montant ou qui a payé qui ?**
Non. Il vérifie la preuve, la fraîcheur du nullifier, l'anchor et la binding signature. Toutes les valeurs privées restent cachées.

**Qu'est-ce qui m'empêche de dépenser deux fois la même note ?**
Le nullifier. La dépense le publie ; le réseau rejette tout nullifier déjà présent dans l'ensemble des nullifiers. La même note produit toujours le même nullifier.

**Comment l'équilibre peut-il être vérifié si les montants sont cachés ?**
Les value commitments s'additionnent de manière homomorphe ; les commitments d'une transaction équilibrée s'annulent en un commitment de zéro, ce que la binding signature prouve.

**Puis-je prouver mes transactions à un auditeur sans abandonner le contrôle ?**
Oui. Donnez-lui une viewing key. Elle révèle votre activité shielded mais ne peut pas autoriser de dépenses, grâce à la hiérarchie de clés à sens unique.

**Sapling est-il obsolète maintenant que Orchard existe ?**
Les deux ont existé sur le réseau ; Orchard est la conception actuelle. Les concepts sont partagés, donc comprendre l'un vous donne l'autre.

---

### Testez votre intuition

Un ami dit : « Puisque la preuve masque le montant, un voleur pourrait simplement prétendre que ses sorties valent plus que ses entrées et créer de l'argent gratuitement. » En utilisant la section 5, expliquez en deux phrases pourquoi cela échoue. *(Réponse ci-dessous.)*

<details><summary>Réponse</summary>

Les montants sont cachés, mais chacun est enveloppé dans un value commitment homomorphe, et le réseau additionne tous les commitments d'entrée et soustrait tous les commitments de sortie ; si les valeurs cachées ne s'équilibraient pas, le résultat ne se scellerait pas à zéro et **aucune binding signature valide ne pourrait être produite.** Le voleur peut cacher *combien*, mais il ne peut pas faire passer des valeurs déséquilibrées au contrôle d'équilibre ; créer de l'argent gratuitement est donc impossible, sans rien révéler et tout en étant malgré tout rattrapé par l'arithmétique.
</details>

---

### La série, complète

Vous avez maintenant voyagé d'un simple paradoxe jusqu'à un paiement privé complet :

![texte alternatif](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


À partir d'ici, l'arc naturel suivant va plus loin : le fonctionnement interne de Groth16 et Halo 2, les cérémonies de trusted setup, les circuits Sapling et Orchard en détail, la dérivation des clés et les adresses diversifiées, ainsi que l'évolution du protocole à travers les network upgrades. Mais les fondations sont désormais en place, et chacun de ces sujets a maintenant un point d'ancrage auquel se rattacher.

*Fait partie de la série* Zcash from First Principles *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
