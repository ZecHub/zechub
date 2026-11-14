# Comment fonctionne réellement une transaction Zcash protégée
##### Recherche originale de [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-fedc371488.webp)

### L'intuition avant les mathématiques : une présentation sans formules des paiements privés

> **Série :** *Zcash à partir des principes fondamentaux* . **Article 0 . L'ancre**
> **Public :** grands débutants. Aucune connaissance en cryptographie, en blockchain ou en mathématiques n'est requise.
> **Ce que vous en retiendrez :** un modèle mental juste de la manière dont Zcash cache *qui a payé qui, et combien*, tout en permettant au monde entier de vérifier qu'aucune somme n'a été contrefaite ni dépensée deux fois.

Chaque article suivant de cette série zoome sur une pièce de la machine que vous allez découvrir. Si un mot vous semble ici un peu vague, *tant mieux*. C'est la promesse que nous y reviendrons pour l'expliquer correctement.

---

## 1. Pourquoi cela devrait-il vous intéresser ?

Imaginez que votre relevé bancaire soit cloué sur un mur de la place du village. Pour toujours. N'importe qui (votre propriétaire, votre employeur, un inconnu, un futur employeur, un gouvernement) pourrait lire chaque loyer, chaque facture médicale, chaque don, chaque café, et retracer exactement à qui vous avez envoyé de l'argent et qui vous en a envoyé.

Ce n'est pas une hypothèse dystopique. **C'est à peu près ainsi que fonctionne Bitcoin.**

On dit souvent de Bitcoin qu'il est « anonyme », mais ce n'est pas le cas. Il est *pseudonyme* : votre nom ne figure pas dans le registre, mais chaque transaction, chaque montant et chaque lien entre adresses sont publics et permanents. Tout le domaine de l'« analyse de chaîne » existe pour lever ce mince pseudonyme et relier des adresses à de vraies personnes. Dès qu'une de vos adresses est associée à vous, tout votre historique financier se dévoile.

Zcash a été conçu pour répondre à une question faussement simple :

> **Peut-on disposer d'une monnaie totalement privée, qui cache l'expéditeur, le destinataire et le montant, tout en permettant à quiconque de vérifier que les règles ont été respectées ?**

Ces deux objectifs s'opposent. Un registre public est vérifiable *parce que* tout le monde peut le voir. La confidentialité signifie que personne ne peut le voir. Alors comment le public peut-il vérifier quelque chose qu'il n'a pas le droit de regarder ?

La résolution de ce paradoxe est toute l'histoire de cette série. Commençons.

---

## 2. Il existe deux mondes à l'intérieur de Zcash

Avant toute chose, dissipons une idée reçue : **Zcash n'est pas « la cryptomonnaie privée ». C'est une cryptomonnaie qui propose la confidentialité en option.** Elle est d'ailleurs née d'un fork de Bitcoin, et elle fait fonctionner deux systèmes parallèles sur la même blockchain.

| | **Monde transparent** | **Monde protégé** |
|---|---|---|
| Confidentialité | Public, exactement comme Bitcoin | Privé |
| Les adresses commencent par | `t...` | `z...` ou `u...` |
| Expéditeur / destinataire / montant | **Visibles** par tous | **Cachés** à tous |
| Technologie sous-jacente | Registre public de type Bitcoin | Engagements cryptographiques + preuves à divulgation nulle de connaissance |

L'argent peut même franchir la frontière entre les deux : faire passer des fonds *dans* le monde protégé s'appelle la *protection*, et les en faire sortir s'appelle la *déprotection*.

Le monde transparent, c'est « le Bitcoin que vous comprenez déjà à peu près ». C'est le **monde protégé** qui renferme toute la belle cryptographie, et c'est le seul monde dont traite cette série.

![alt text](/content-images/image-1-f821d24c6f.webp)

---

## 3. L'intuition : des enveloppes scellées sur un tableau public

Voici l'unique image mentale à garder pour la suite de l'article. Nous y reviendrons constamment.

Imaginez un immense **tableau d'affichage public** que tout le monde sur Terre peut voir en permanence.

* **Recevoir de l'argent** signifie que quelqu'un épingle une **enveloppe scellée et opaque** sur le tableau. À l'intérieur se trouvent *le montant qu'elle contient* et *un secret que seul le destinataire peut lire*, car l'enveloppe est verrouillée avec la clé personnelle de ce destinataire. Le monde entier voit qu'*une enveloppe est apparue*. Personne d'autre que son propriétaire ne peut voir ce qu'elle contient.

* **Le tableau ne fait que s'agrandir.** Les enveloppes ne sont jamais arrachées ni effacées. Les nouvelles sont épinglées par-dessus, pour toujours.

* **Dépenser de l'argent** signifie passer derrière un rideau, prouver que *« je possède l'une des enveloppes non dépensées de ce tableau, et j'ai le droit de l'ouvrir »*, puis déposer un **jeton d'annulation** unique dans une corbeille publique des « dépenses » et épingler de **nouvelles enveloppes** pour la personne que vous payez.

Ce petit rituel (déposer un jeton d'annulation, épingler de nouvelles enveloppes, le tout depuis l'arrière d'un rideau) *est* un paiement Zcash. Tout le reste n'est que détail.

Donnons maintenant à ces accessoires leurs vrais noms.

---

## 4. Les cinq noms

Ces cinq termes constituent tout le vocabulaire de Zcash protégé. Apprenez-les comme une *histoire*, pas comme un glossaire, et ils resteront gravés.

| Dans l'histoire | Terme Zcash réel | Ce que c'est réellement |
|---|---|---|
| Le contenu de l'enveloppe (montant + propriétaire + un secret) | **Note** | La « pièce » privée : une quantité de valeur appartenant à quelqu'un |
| L'enveloppe scellée et opaque sur le tableau | **Engagement de note** | Un sceau cryptographique qui prouve qu'une enveloppe existe tout en cachant son contenu |
| Le tableau d'affichage lui-même | **Arbre des engagements de notes** | Un registre en ajout seul de *toutes les notes jamais créées* |
| Le jeton d'annulation dans la corbeille des « dépenses » | **Nullifier** | Un marqueur unique signifiant « cette note a maintenant été dépensée » |
| La magie « derrière le rideau » | **Preuve à divulgation nulle de connaissance** | Une preuve que toute la dépense est valide, sans rien en révéler |

Si vous ne deviez retenir qu'une chose de cet article, retenez ce tableau. Tout ce qui suit explique simplement *pourquoi* chaque pièce doit avoir la forme qu'elle a.

---

## 5. Pourquoi chaque pièce a la forme qu'elle a

C'est la partie que la plupart des explications sautent, et c'est précisément celle qui sépare « j'ai mémorisé quelques mots » de « je comprends la conception ». Chacune des cinq pièces existe pour résoudre **un problème précis.**

### L'engagement de note : cacher le contenu, mais rendre la contrefaçon impossible

Une enveloppe ordinaire peut être ouverte à la vapeur. Un **engagement de note** cryptographique, non. Voyez-le comme une enveloppe *magiquement* scellée et totalement opaque, dotée de deux superpouvoirs :

- **Masquage** : regarder l'enveloppe scellée ne vous apprend *rien* sur le montant ou le propriétaire qu'elle contient.
- **Liaison** : une fois scellée, son contenu ne peut pas être remplacé. Vous ne pouvez pas prétendre plus tard que l'enveloppe contenait un autre montant.

Comment un sceau peut-il faire les deux à la fois ? C'est une vraie question, et elle a une réponse. C'est le sujet de l'**article 3 (engagements)**. Pour l'instant, acceptez l'enveloppe comme magique et continuez.

### Le nullifier : la partie vraiment astucieuse

Lorsque vous dépensez une note, vous publiez son **nullifier**, le « jeton d'annulation ». Ce jeton est calculé à partir de *la note elle-même* **et** de *votre clé secrète*. Cette recette procure simultanément trois propriétés, et chacune compte :

1. **Seul le propriétaire peut le créer.** Il faut la clé secrète pour le calculer, donc personne ne peut dépenser vos notes à votre place.
2. **C'est toujours le *même* jeton pour une note donnée.** Si vous essayez de dépenser deux fois la même note, vous produirez le *même* jeton d'annulation les deux fois, et la corbeille publique des « dépenses » le contient déjà. Double dépense rejetée. 
3. **Personne ne peut le relier à son enveloppe.** Le jeton d'annulation semble totalement sans rapport avec l'enveloppe dont il provient.

Cette troisième propriété est le **cœur de la confidentialité de Zcash**, et elle mérite sa propre section ci-dessous.

### La preuve à divulgation nulle de connaissance : le rideau lui-même

Tout se passe derrière un rideau, et ce que vous remettez ensuite au monde est une **preuve à divulgation nulle de connaissance**, une sorte de certificat infalsifiable. Elle atteste silencieusement de tout ceci à la fois :

- *l'enveloppe que je dépense est bien épinglée au tableau* (c'est une note réelle et existante),
- *j'ai véritablement le droit de l'ouvrir* (je détiens la bonne clé),
- *mon jeton d'annulation est correctement calculé* (aucune tricherie sur le contrôle de double dépense),
- *mes nouvelles enveloppes contiennent exactement autant d'argent que l'ancienne* : **aucun argent créé à partir de rien.**

Le miracle, c'est que la preuve ne révèle **aucun** de ces faits. Ni le montant, ni les adresses, ni l'enveloppe concernée. Elle vous convainc seulement que *chacune des affirmations ci-dessus est vraie*. Comment cela est possible, c'est l'objet de l'**article 5 (preuves à divulgation nulle de connaissance)**, le point culminant de la série.

---

## 6. La vie d'une note

Une note *naît*, elle *vit* sur le tableau, puis finit par *mourir*, et surtout, sa naissance et sa mort semblent sans rapport pour quiconque observe.

![alt text](/content-images/image-2-0eca0ea4f7.webp)

---

## 7. Un paiement, de bout en bout

Observons Alice payer Bob, avec chaque étape publique et privée indiquée.

![alt text](/content-images/image-4-7af0dfe795.webp)

Remarquez l'asymétrie qui fait fonctionner la confidentialité :

- **L'ancienne note d'Alice** meurt par un *nullifier* dans la corbeille des dépenses.
- **La nouvelle note de Bob** naît par un nouvel *engagement* sur le tableau.
- Pour tous les observateurs, ces deux événements n'ont **aucun lien visible.** La piste de l'argent se perd.

> **Comment Bob sait-il seulement qu'il a été payé ?** Sa note est chiffrée *pour sa clé*. Il parcourt continuellement le tableau et seules *ses* enveloppes s'ouvrent pour lui, comme si vous possédiez l'unique clé qui ouvre un ensemble précis de serrures. Le mécanisme derrière cela, ce sont les **clés pour lecture seule**, un sujet abordé plus tard.

---

## 8. Ce que le monde voit et ce qui reste caché

| Fait concernant le paiement | Visible par le public ? |
|---|---|
| Qu'*une* transaction protégée a eu lieu |  Oui |
| Qu'elle a respecté toutes les règles (pas de contrefaçon, pas de double dépense) |  Oui (grâce à la preuve) |
| **Qui** a envoyé l'argent |  Caché |
| **Qui** l'a reçu |  Caché |
| **Combien** a été envoyé |  Caché |
| **Quelle** note antérieure a été dépensée |  Caché |

Voici la résolution du paradoxe de la section 1. Le public vérifie les *règles*, pas le *contenu*. Vérification et confidentialité cessent de s'opposer, car la preuve à divulgation nulle de connaissance vous permet de contrôler les premières sans toucher au second.

---

## 9. Le cœur du sujet : pourquoi l'enveloppe et le jeton d'annulation sont impossibles à relier

Si vous comprenez cette seule idée, vous comprenez pourquoi Zcash est privé. Lisez lentement.

- Une **enveloppe (engagement)** est épinglée au tableau lorsqu'une note **naît**.
- Un **jeton d'annulation (nullifier)** est déposé dans la corbeille lorsque cette même note est **dépensée**, parfois des mois plus tard.
- Ils sont produits par des **recettes secrètes différentes**, et il n'existe **aucun calcul public** qui transforme l'un en l'autre.

Un observateur extérieur voit donc apparaître un flux d'enveloppes et un flux de jetons d'annulation, mais **ne peut pas les associer**. Il ne peut pas dire « le jeton d'annulation déposé aujourd'hui correspond à l'enveloppe épinglée en mars dernier ». Le lien n'existe *que* dans la connaissance secrète du propriétaire de la note, et la preuve à divulgation nulle de connaissance confirme que ce lien est valide *sans le révéler.*

Ce lien rompu, c'est précisément ce dont se régalent les sociétés d'analyse de chaîne avec Bitcoin, et ce que Zcash tranche délibérément.

> **Testez votre intuition :** si les nullifiers étaient calculés *uniquement* à partir de la note (sans clé secrète), laquelle des trois propriétés de la section 5 serait rompue, et pourquoi cela détruirait-il discrètement la confidentialité ? *(Réponse à la fin.)*

---

## 10. Un avertissement honnête

Il s'agit d'un **modèle mental**, pas de la spécification. Pour rester accessible aux débutants, nous avons discrètement simplifié plusieurs éléments réels : Zcash a connu plusieurs conceptions protégées (Sprout, puis Sapling, aujourd'hui Orchard) ; les vraies transactions peuvent dépenser et créer *plusieurs* notes à la fois ; « le tableau » est techniquement un type d'arbre particulier, pas un véritable panneau d'affichage ; et l'équilibre des valeurs est assuré par une comptabilité cryptographique supplémentaire. Aucun de ces détails ne change l'histoire que vous venez d'apprendre ; ils l'affinent. Nous réintroduirons la précision, un article à la fois, en le signalant clairement à chaque fois.

Un bon contenu pédagogique gagne la confiance en disant ce qu'il a laissé de côté. Cette section est cette promesse.

---

## 11. Les pistes que nous avons ouvertes (votre carte de la série)

Chaque « nous y reviendrons » ci-dessus est un fil. Voici où chacun sera noué :

![alt text](/content-images/image-29-27ef4636ff.webp)

| Point en suspens dans cet article | Où il est résolu |
|---|---|
| Comment une enveloppe scellée peut-elle être à la fois opaque *et* infalsifiable ? | Article 3 : engagements |
| D'où viennent les clés et les recettes secrètes ? | Articles 1 et 2 : corps et courbes |
| Qu'*est* exactement « le tableau » ? | Article 4 : arbres de Merkle |
| Comment prouver quelque chose sans rien révéler ? | Article 5 : preuves à divulgation nulle de connaissance |
| Comment les cinq pièces s'emboîtent-elles dans le vrai Zcash ? | Article 6 : le protocole protégé |

---

## 12. Résumé

- Bitcoin est **transparent** ; Zcash propose un monde **protégé** où l'expéditeur, le destinataire et le montant sont cachés.
- Le paradoxe apparent (*privé mais vérifiable publiquement*) est tout l'enjeu, et il peut être résolu.
- Un paiement protégé repose sur cinq pièces imbriquées : une **note** (la pièce), un **engagement de note** (l'enveloppe scellée), l'**arbre des engagements de notes** (le tableau public), un **nullifier** (le jeton d'annulation qui empêche les doubles dépenses) et une **preuve à divulgation nulle de connaissance** (le rideau qui prouve la validité sans rien révéler).
- La confidentialité repose en définitive sur **un lien rompu** : personne de l'extérieur ne peut relier la naissance d'une note (engagement) à sa mort (nullifier).
- Le public vérifie les **règles**, jamais le **contenu**.

Vous avez maintenant la carte en main. Le reste de la série la complète.

---

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| **Note** | Une unité de valeur privée, l'équivalent dans Zcash d'une pièce ou d'un billet |
| **Note commitment** | Un sceau cryptographique qui prouve qu'une note existe sans la révéler |
| **Note commitment tree** | Le registre public en ajout seul de tous les engagements de notes |
| **Nullifier** | Un marqueur « dépensé » unique publié lorsqu'une note est utilisée, empêchant les doubles dépenses |
| **Zero-knowledge proof** | Une preuve qu'une affirmation est vraie sans rien révéler d'autre que sa véracité |
| **Shielding / deshielding** | Faire entrer des fonds dans le monde protégé privé / les en faire sortir |
| **Viewing Key** | La clé qui permet au propriétaire de détecter et de lire les notes qui lui sont adressées |

---

## FAQ

**Zcash est-il toujours privé ?**
Non. La confidentialité s'applique au monde *protégé* (adresses `z...`/`u...`). Les transactions transparentes (`t...`) sont publiques, comme avec Bitcoin.

**Si tout est caché, qu'est-ce qui empêche quelqu'un d'imprimer de l'argent gratuitement ?**
La preuve à divulgation nulle de connaissance. Elle oblige mathématiquement les sorties de chaque transaction à être couvertes par des entrées réelles et non dépensées, *tout en* gardant les montants secrets.

**La même note peut-elle être dépensée deux fois ?**
Non. Dépenser une note publie son nullifier ; une seconde tentative publierait le même nullifier, qui se trouve déjà dans la corbeille des « dépenses », et le réseau la rejette donc.

**Des tiers peuvent-ils relier un expéditeur à un destinataire ?**
Non. L'engagement (naissance de la note) et le nullifier (mort de la note) ne peuvent être associés par personne sans la connaissance secrète du propriétaire.

---

### Réponse au test d'intuition (section 9)

Si le nullifier était calculé *uniquement* à partir de la note, sans clé secrète, alors **n'importe qui** pourrait le calculer, ce qui romprait la propriété n° 1 (seul le propriétaire peut dépenser). Pire encore, le nullifier pourrait alors être déduit directement d'informations publiques sur la note, ce qui permettrait aux observateurs de **relier le nullifier à son engagement**, rompant la propriété n° 3 et défaisant discrètement la confidentialité de tout le système. C'est la clé secrète qui rend le jeton d'annulation à la fois *exclusivement vôtre* et *impossible à relier.*

---

### La suite

**Article 1 . Corps finis :** l'étrange et magnifique système de nombres où l'arithmétique « boucle sur elle-même », et la raison pour laquelle chaque élément de cryptographie de cette série s'y trouve. Nous commencerons, comme toujours, par l'intuition, sans aucune formule avant qu'elle ne soit justifiée.

*Fait partie de la série* Zcash à partir des principes fondamentaux *pour [ZecHub](https://zechub.org). Sous licence CC BY-SA 4.0.*
