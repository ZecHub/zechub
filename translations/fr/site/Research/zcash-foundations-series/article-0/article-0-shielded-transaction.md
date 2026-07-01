# Comment fonctionne réellement une transaction Zcash blindée
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![texte alternatif](image.png)

### L’intuition avant les maths : une explication des paiements privés sans formules

> **Série :** *Zcash from First Principles* . **Article 0 . L’ancre**
> **Public :** débutants complets. Aucune connaissance en cryptographie, en blockchain ou en mathématiques n’est supposée.
> **Ce que vous en retirerez :** un modèle mental correct de la manière dont Zcash cache *qui a payé qui, et combien*, tout en permettant au monde entier de vérifier qu’aucun argent n’a été créé ni dépensé deux fois.

Chaque article suivant de cette série zoome sur une pièce de la machine que vous allez découvrir. Donc si un mot ici vous semble approximatif, *tant mieux*. C’est la promesse que nous y reviendrons et que nous l’expliquerons correctement.

---

## 1. Pourquoi devriez-vous vous en soucier ?

Imaginez que votre relevé bancaire soit cloué à un mur sur la place du village. Pour toujours. N’importe qui (votre propriétaire, votre employeur, un inconnu, un futur employeur, un gouvernement) pourrait lire chaque paiement de loyer, chaque facture médicale, chaque don, chaque café, et retracer exactement à qui vous avez envoyé de l’argent et qui vous en a envoyé.

Ce n’est pas une hypothèse dystopique. **C’est à peu près ainsi que fonctionne Bitcoin.**

Bitcoin est souvent qualifié d’« anonyme », mais ce n’est pas le cas. Il est *pseudonyme* : votre nom n’apparaît pas dans le registre, mais chaque transaction, chaque montant et chaque lien entre adresses sont publics et permanents. Tout le domaine de la « chain analysis » existe pour percer ce mince pseudonyme et relier des adresses à de vraies personnes. Une fois qu’une de vos adresses est associée à vous, tout votre historique financier se déroule.

Zcash a été conçu pour répondre à une question d’une difficulté trompeuse :

> **Pouvons-nous avoir une monnaie totalement privée, cachant l’expéditeur, le destinataire et le montant, tout en permettant à quiconque de vérifier que les règles ont été respectées ?**

Ces deux objectifs s’opposent. Un registre public est vérifiable *parce que* tout le monde peut le voir. La confidentialité signifie que personne ne peut le voir. Alors comment le public peut-il vérifier quelque chose qu’il n’a pas le droit de regarder ?

Résoudre ce paradoxe est toute l’histoire de cette série. Commençons.

---

## 2. Il y a deux mondes à l’intérieur de Zcash

Avant toute chose, dissipons une idée reçue : **Zcash n’est pas « la monnaie privée ». C’est une monnaie qui offre la confidentialité comme option.** Elle a en réalité commencé comme un fork de Bitcoin, et elle embarque deux systèmes parallèles sur la même blockchain.

| | **Monde transparent** | **Monde blindé** |
|---|---|---|
| Confidentialité | Public, comme Bitcoin | Privé |
| Les adresses commencent par | `t...` | `z...` ou `u...` |
| Expéditeur / destinataire / montant | **Visibles** par tous | **Cachés** à tous |
| Technologie sous-jacente | Registre public de type Bitcoin | Engagements cryptographiques + preuves à divulgation nulle de connaissance |

L’argent peut même passer d’un monde à l’autre : déplacer des fonds *vers* le monde blindé s’appelle le *shielding*, et les faire ressortir s’appelle le *deshielding*.

Le monde transparent, c’est « le Bitcoin que vous comprenez déjà à peu près ». C’est le **monde blindé** qui contient toute la belle cryptographie, et c’est le seul monde qui nous intéresse dans cette série.

![texte alternatif](image-1.png)

---

## 3. L’intuition : des enveloppes scellées sur un panneau public

Voici l’image mentale unique à garder pour tout le reste de l’article. Nous y reviendrons sans cesse.

Imaginez un immense **panneau d’affichage public** que tout le monde sur Terre peut voir à tout moment.

* **Recevoir de l’argent** signifie que quelqu’un épingle au panneau une **enveloppe scellée et opaque**. À l’intérieur de l’enveloppe se trouvent *le montant qu’elle contient* et *un secret que seul le destinataire peut lire*, parce que l’enveloppe est verrouillée avec la clé personnelle de ce destinataire. Le monde entier voit *qu’une enveloppe est apparue*. Personne sauf son propriétaire ne peut voir ce qu’elle contient.

* **Le panneau ne fait que grandir.** Les enveloppes ne sont jamais retirées ni effacées. De nouvelles sont épinglées par-dessus, pour toujours.

* **Dépenser de l’argent** signifie se placer derrière un rideau, prouver *« je possède l’une des enveloppes non dépensées de ce panneau et j’ai le droit de l’ouvrir »*, puis déposer un **jeton d’annulation** unique dans une corbeille publique des « dépenses » et épingler de **nouvelles enveloppes** pour les personnes que vous payez.

Ce petit rituel (épingler un jeton d’annulation, épingler de nouvelles enveloppes, le tout depuis derrière un rideau) *est* un paiement Zcash. Tout le reste n’est que détail.

Donnons maintenant à ces éléments leurs vrais noms.

---

## 4. Les cinq noms

Ces cinq termes constituent tout le vocabulaire du Zcash blindé. Apprenez-les comme une *histoire*, pas comme un glossaire, et ils resteront.

| Dans l’histoire | Terme réel de Zcash | Ce que c’est réellement |
|---|---|---|
| Le contenu de l’enveloppe (montant + propriétaire + un secret) | **Note** | La « pièce » privée : une quantité de valeur appartenant à quelqu’un |
| L’enveloppe scellée et opaque sur le panneau | **Note commitment** | Un sceau cryptographique prouvant qu’une enveloppe existe tout en cachant ce qu’elle contient |
| Le panneau d’affichage lui-même | **Note commitment tree** | Un registre en ajout seul de *toutes les notes jamais créées* |
| Le jeton d’annulation dans la corbeille des « dépenses » | **Nullifier** | Un marqueur unique signifiant « cette note a maintenant été dépensée » |
| La magie « derrière le rideau » | **Zero-knowledge proof** | Une preuve que toute la dépense est valide, sans rien en révéler |

Si vous ne retenez rien d’autre de cet article, retenez ce tableau. Tout ce qui suit n’est qu’une explication de *pourquoi* chaque pièce doit avoir cette forme.

---

## 5. Pourquoi chaque pièce a la forme qu’elle a

C’est la partie que la plupart des explications sautent, et c’est précisément celle qui fait la différence entre « j’ai mémorisé quelques mots » et « je comprends la conception ». Chacune des cinq pièces existe pour résoudre **un problème précis.**

### Le note commitment : cacher le contenu, tout en rendant la falsification impossible

Une enveloppe ordinaire peut être ouverte à la vapeur. Un **note commitment** cryptographique ne le peut pas. Voyez-le comme une enveloppe *magiquement* scellée, entièrement opaque, dotée de deux superpouvoirs :

- **Masquage** : regarder l’enveloppe scellée ne vous apprend *rien* sur le montant ou le propriétaire à l’intérieur.
- **Engagement contraignant** : une fois scellé, le contenu ne peut plus être remplacé. Vous ne pouvez pas prétendre plus tard que l’enveloppe contenait un autre montant.

Comment un sceau peut-il faire les deux à la fois ? C’est une vraie question, avec une vraie réponse. C’est le sujet de **l’Article 3 (engagements)**. Pour l’instant, acceptez l’enveloppe comme magique et avançons.

### Le nullifier : la partie réellement ingénieuse

Quand vous dépensez une note, vous publiez son **Nullifier**, le « jeton d’annulation ». Ce jeton est calculé à partir de *la note elle-même* **et** de *votre clé secrète*. Cette recette procure trois propriétés simultanément, et chacune compte :

1. **Seul le propriétaire peut le créer.** Il faut la clé secrète pour le calculer, donc personne ne peut dépenser vos notes à votre place.
2. **C’est toujours le *même* jeton pour une note donnée.** Essayez de dépenser la même note deux fois et vous produirez le *même* jeton d’annulation les deux fois, et la corbeille publique des « dépenses » le contient déjà. Double dépense rejetée.
3. **Personne ne peut le relier à son enveloppe d’origine.** Le jeton d’annulation semble totalement sans rapport avec l’enveloppe dont il provient.

Cette troisième propriété est le **cœur de la confidentialité de Zcash**, et elle mérite sa propre section plus bas.

### La zero-knowledge proof : le rideau lui-même

Tout se passe derrière un rideau, et ce que vous remettez ensuite au monde est une **zero-knowledge proof**, une sorte de certificat infalsifiable. Elle atteste silencieusement de tout ceci à la fois :

- *l’enveloppe que je dépense est bien épinglée au panneau* (c’est une note réelle, existante),
- *je suis réellement autorisé à l’ouvrir* (je possède la bonne clé),
- *mon jeton d’annulation est calculé correctement* (aucune triche dans la vérification de double dépense),
- *mes nouvelles enveloppes contiennent exactement autant d’argent que l’ancienne* : **aucun argent créé à partir de rien.**

Le miracle, c’est que la preuve ne révèle **aucun** de ces faits. Ni le montant, ni les adresses, ni quelle enveloppe. Elle vous convainc seulement que *chacune des affirmations ci-dessus est vraie*. Comment cela peut même être possible, c’est **l’Article 5 (zero-knowledge proofs)**, l’apogée de la série.

---

## 6. La vie d’une note unique

Une note *naît*, elle *vit* sur le panneau, puis finalement elle *meurt*, et surtout, sa naissance et sa mort paraissent sans rapport pour quiconque observe.

![texte alternatif](image-2.png)

---

## 7. Un paiement, de bout en bout

Regardons Alice payer Bob, avec chaque étape publique et privée étiquetée.

![texte alternatif](image-4.png)

Remarquez l’asymétrie qui rend la confidentialité possible :

- **L’ancienne note d’Alice** meurt via un *Nullifier* dans la corbeille des dépenses.
- **La nouvelle note de Bob** naît via un nouveau *commitment* sur le panneau.
- Pour tous ceux qui observent, ces deux événements n’ont **aucun lien visible**. La trace de l’argent s’interrompt.

> **Comment Bob sait-il seulement qu’il a été payé ?** Sa note est chiffrée *avec sa clé*. Il scanne continuellement le panneau, et seules *ses* enveloppes s’ouvrent pour lui, comme s’il possédait l’unique clé correspondant à un ensemble précis de serrures. Le mécanisme derrière cela repose sur les **Viewing Keys**, un sujet abordé plus tard.

---

## 8. Ce que le monde voit contre ce qui reste caché

| Fait concernant le paiement | Visible au public ? |
|---|---|
| Qu’une transaction blindée a eu lieu |  Oui |
| Qu’elle a respecté toutes les règles (pas de falsification, pas de double dépense) |  Oui (via la preuve) |
| **Qui** a envoyé l’argent |  Caché |
| **Qui** l’a reçu |  Caché |
| **Combien** a été envoyé |  Caché |
| **Quelle** note antérieure a été dépensée |  Caché |

Voilà la résolution du paradoxe de la section 1. Le public vérifie les *règles*, pas le *contenu*. Vérification et confidentialité cessent de s’opposer, parce que la zero-knowledge proof permet de contrôler la première sans toucher au second.

---

## 9. Le cœur du sujet : pourquoi l’enveloppe et le jeton d’annulation ne peuvent pas être reliés

Si vous comprenez cette seule idée, vous comprenez pourquoi Zcash est privé. Lisez-la lentement.

- Une **enveloppe (commitment)** est épinglée au panneau quand une note **naît**.
- Un **jeton d’annulation (Nullifier)** est déposé dans la corbeille quand cette même note est **dépensée**, peut-être des mois plus tard.
- Ils sont produits par **des recettes secrètes différentes**, et il n’existe **aucune relation mathématique publique** permettant de transformer l’un en l’autre.

Ainsi, un observateur extérieur voit apparaître un flux d’enveloppes et un flux de jetons d’annulation, mais **ne peut pas les faire correspondre**. Il ne peut pas dire « le jeton d’annulation déposé aujourd’hui correspond à l’enveloppe épinglée en mars dernier ». Ce lien n’existe *qu’à l’intérieur* du savoir secret du propriétaire de la note, et la zero-knowledge proof confirme que ce lien est valide *sans le révéler.*

Cette rupture de lien est précisément ce dont se nourrissent les sociétés de chain analysis dans Bitcoin, et ce que Zcash coupe délibérément.

> **Testez votre intuition :** si les Nullifiers étaient calculés *uniquement* à partir de la note (sans clé secrète), laquelle des trois propriétés de la section 5 se briserait, et pourquoi cela détruirait-il discrètement la confidentialité ? *(Réponse à la fin.)*

---

## 10. Une mise en garde honnête

Ceci est un **modèle mental**, pas la spécification. Pour le rendre accessible aux débutants, nous avons discrètement simplifié plusieurs aspects réels : Zcash a eu plusieurs conceptions blindées (Sprout, puis Sapling, maintenant Orchard) ; les transactions réelles peuvent dépenser et créer *plusieurs* notes à la fois ; « le panneau » est techniquement un type précis d’arbre, pas un véritable panneau d’affichage ; et l’équilibre de valeur est imposé avec une comptabilité cryptographique supplémentaire. Aucun de ces détails ne change l’histoire que vous venez d’apprendre ; ils la précisent. Nous réintroduirons cette précision, un article à la fois, et nous indiquerons clairement chaque fois que nous le ferons.

Un bon contenu pédagogique gagne la confiance en disant ce qu’il a omis. Cette section est cette promesse.

---

## 11. Les boucles que nous avons ouvertes (votre carte de la série)

Chaque « nous y reviendrons » ci-dessus est un fil. Voici où chacun est noué :

![texte alternatif](image-29.png)

| Point laissé ouvert dans cet article | Où il est résolu |
|---|---|
| Comment une enveloppe scellée peut-elle à la fois dissimuler *et* être infalsifiable ? | Article 3 : engagements |
| D’où viennent les clés et les recettes secrètes ? | Articles 1 et 2 : corps finis et courbes |
| Qu’est-ce que *« le panneau »*, exactement ? | Article 4 : arbres de Merkle |
| Comment peut-on prouver quelque chose tout en ne révélant rien ? | Article 5 : zero-knowledge proofs |
| Comment les cinq pièces s’assemblent-elles dans le Zcash réel ? | Article 6 : le protocole blindé |

---

## 12. Résumé

- Bitcoin est **transparent** ; Zcash offre un monde **blindé** où l’expéditeur, le destinataire et le montant sont cachés.
- Le paradoxe apparent (*privé mais vérifiable publiquement*) est tout l’enjeu, et il peut être résolu.
- Un paiement blindé est composé de cinq pièces imbriquées : une **Note** (la pièce), un **Note commitment** (l’enveloppe scellée), le **Note commitment tree** (le panneau public), un **Nullifier** (le jeton d’annulation qui empêche les doubles dépenses) et une **Zero-knowledge proof** (le rideau qui prouve la validité sans rien révéler).
- La confidentialité repose en fin de compte sur **un lien rompu** : personne à l’extérieur ne peut relier la naissance d’une note (commitment) à sa mort (Nullifier).
- Le public vérifie les **règles**, jamais le **contenu**.

Vous tenez maintenant la carte. Le reste de la série vient la compléter.

---

## Glossaire

| Terme | Signification en anglais simple |
|---|---|
| **Note** | Une unité privée de valeur, l’équivalent dans Zcash d’une pièce ou d’un billet |
| **Note commitment** | Un sceau cryptographique qui prouve qu’une note existe sans la révéler |
| **Note commitment tree** | Le registre public en ajout seul de tous les note commitments |
| **Nullifier** | Un marqueur unique de « dépensé » publié lorsqu’une note est utilisée, empêchant les doubles dépenses |
| **Zero-knowledge proof** | Une preuve qu’une affirmation est vraie sans rien révéler au-delà de sa véracité |
| **Shielding / deshielding** | Le déplacement de fonds vers / hors du monde privé blindé |
| **Viewing Key** | La clé qui permet au propriétaire de détecter et de lire les notes qui lui sont adressées |

---

## FAQ

**Zcash est-il toujours privé ?**
Non. La confidentialité s’applique au monde *blindé* (adresses `z...`/`u...`). Les transactions transparentes (`t...`) sont publiques, comme sur Bitcoin.

**Si tout est caché, qu’est-ce qui empêche quelqu’un d’imprimer de l’argent gratuit ?**
La zero-knowledge proof. Elle impose mathématiquement que les sorties de chaque transaction soient adossées à de vraies entrées non dépensées, *tout en* gardant les montants secrets.

**La même note peut-elle être dépensée deux fois ?**
Non. Dépenser une note publie son Nullifier ; une seconde tentative publierait le même Nullifier, qui se trouve déjà dans la corbeille des « dépenses », donc le réseau la rejette.

**Des observateurs extérieurs peuvent-ils relier un expéditeur à un destinataire ?**
Non. Le commitment (la naissance de la note) et le Nullifier (la mort de la note) ne peuvent être appariés par personne sans la connaissance secrète du propriétaire.

---

### Réponse au test d’intuition (Section 9)

Si le Nullifier était calculé *uniquement* à partir de la note, sans clé secrète, alors **n’importe qui** pourrait le calculer, ce qui briserait la propriété n°1 (seul le propriétaire peut dépenser). Pire encore, le Nullifier deviendrait alors dérivable directement à partir d’informations publiques sur la note, ce qui pourrait permettre aux observateurs de **relier le Nullifier à son commitment**, brisant la propriété n°3 et défaisant discrètement la confidentialité de tout le système. La clé secrète est ce qui rend le jeton d’annulation à la fois *exclusivement vôtre* et *impossible à relier.*

---

### Et ensuite

**Article 1 . Corps finis :** l’étrange et magnifique système de nombres où l’arithmétique « revient au début », et la raison pour laquelle chaque élément de cryptographie de cette série y vit. Nous commencerons, comme toujours, par l’intuition, sans formules avant qu’elles ne soient méritées.

*Fait partie de la série* Zcash from First Principles *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
