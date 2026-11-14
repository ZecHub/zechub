# Zero to Zero Knowledge : le protocole Lelantus

**Série :** Zero to Zero Knowledge

Aujourd'hui, nous nous intéressons à **Lelantus** !

Lancé en 2019, ce protocole s'appuie sur Zerocoin. Il est utilisé par la cryptomonnaie **Firo** (anciennement Zcoin) pour permettre des transactions on-chain privées. Il ressemble à Zcash à certains égards, mais s'en distingue nettement sur la plupart des points.

![Lelantus intro](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Fondements des protocoles Zcash et Firo

- **Zcash** - S'appuie sur le protocole **Zerocash**  
- **Firo (Zcoin)** - S'appuie sur le protocole **Zerocoin**

![Comparaison entre Zerocash et Zerocoin](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Évolution des protocoles de confidentialité de Firo

Comme Zcash, Firo utilise des adresses protégées pour réaliser des paiements anonymes.

**Chronologie :**
- **Zerocoin** - Robustesse compromise
- **Sigma** - Système à dénominations fixes
- **Lelantus 1.0** - Absence de preuves de sécurité correctes

![Protocol evolution](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Limites du protocole Sigma

Le protocole Σ (Sigma), utilisé dans les versions antérieures de Zcoin/Firo, présentait une limite majeure : les utilisateurs ne pouvaient frapper que des dénominations fixes.

Cela entraînait des ensembles d'anonymat plus restreints et ouvrait la voie à des attaques temporelles entre les opérations de frappe et de rachat (sans compter le problème de la « monnaie rendue entachée »).

![Sigma denominations](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Comment Lelantus améliore la confidentialité

**Lelantus** résout le problème des dénominations fixes en permettant des frappes à partir d'un seul ensemble plus large.

Principaux avantages :
- Élimine les ensembles d'anonymat à dénominations fixes
- Réduit les attaques temporelles entre destruction et rachat
- Supprime le problème de la monnaie rendue entachée

**Limite** : la taille de l'ensemble est actuellement plafonnée à **65 000 pièces**.

![Lelantus advantages](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## Engagements de pièce

Un **engagement de pièce** est un engagement doublement aveuglé qui encode le numéro de série et la valeur de la pièce.

Ils fonctionnent de manière similaire aux **notes** dans Zcash.

L'engagement de pièce est publié et stocké dans le registre lors de la création de la pièce (via des transactions de frappe ou de dépense).

![Diagramme d'engagement de pièce](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Modèle basecoin < - > zerocoin

Lelantus utilise le modèle classique **basecoin < - > zerocoin**.

**Fonctionnalité importante** : les rachats partiels sont désormais possibles, tout en gardant le reliquat et les montants masqués.

Comme pour Zcash, les transactions transparentes doivent être explicitement sélectionnées par l'utilisateur.

![Lelantus flow](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## Preuves « un parmi plusieurs »

Lelantus utilise des **preuves « un parmi plusieurs »** pour extraire les valeurs d'entrée nécessaires à la preuve de l'équilibre, sans révéler l'origine des entrées et sans nécessiter de configuration de confiance.

Ces preuves sont également utilisées dans **Triptych** (mentionné dans notre fil sur CryptoNote).

![One-of-Many Proofs](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## Confidentialité de la couche réseau : Dandelion++

Les nœuds Firo utilisent le même Network Magic que Magicbean de Zcash.

Comme Monero, Firo a mis en œuvre **Dandelion++** pour renforcer la confidentialité en masquant l'adresse IP de l'émetteur de la transaction.

**Phases de Dandelion++ :**
- **Phase de tige** - La transaction est relayée vers un seul nœud aléatoire au lieu de tous les pairs
- **Phase de diffusion** - Déclenchée de manière aléatoire, elle bascule ensuite en mode de propagation normal

Il devient ainsi beaucoup plus difficile de retracer l'origine d'une transaction par l'analyse du réseau.

![Dandelion++ explanation](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## L'avenir : Lelantus-Spark

**Lelantus-Spark** (prévu pour fin 2023) introduit deux niveaux de visibilité optionnelle grâce à une **dérivation de type ZIP-32** et à des adresses diversifiées.

Il ajoutera également la prise en charge :
- Du multisig
- Des actifs confidentiels définis par l'utilisateur

Ces fonctionnalités sont comparables aux actifs protégés de Zcash.

![Lelantus-Spark announcement](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**Fil original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Cette page a été compilée à partir du fil Zero to Zero Knowledge original pour le wiki ZecHub.*
