# De zéro à la connaissance nulle : protocole Lelantus

**Série :** De zéro à la connaissance nulle

Aujourd’hui, nous examinons **Lelantus** !

Publié en 2019, ce protocole s’appuie sur Zerocoin. Il est utilisé dans la monnaie **Firo** (anciennement Zcoin) pour permettre des transactions privées on-chain. Il ressemble à Zcash à certains égards, mais il est nettement différent dans la plupart des aspects.

![Introduction à Lelantus](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Zcash vs fondements des protocoles Firo

- **Zcash** - S’appuie sur le protocole **Zerocash**  
- **Firo (Zcoin)** - S’appuie sur le protocole **Zerocoin**

![Comparaison Zerocash vs Zerocoin](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Évolution des protocoles de confidentialité de Firo

Comme Zcash, Firo utilise des adresses blindées pour permettre des paiements anonymes.

**Chronologie :**
- **Zerocoin** - Solidité compromise
- **Sigma** - Système à dénominations fixes
- **Lelantus 1.0** - Manquait de preuves de sécurité correctes

![Évolution du protocole](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Limites du protocole Sigma

Le protocole Σ (Sigma) utilisé dans les premières versions de Zcoin/Firo présentait une limite majeure : les utilisateurs ne pouvaient frapper que des dénominations fixes.

Cela créait des ensembles d’anonymat plus petits et ouvrait la porte à des attaques par corrélation temporelle entre les opérations de mint et de redeem (ainsi qu’au problème de la « monnaie rendue contaminée »).

![Dénominations Sigma](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Comment Lelantus améliore la confidentialité

**Lelantus** résout le problème des dénominations fixes en permettant des mints à partir d’un seul ensemble plus large.

Principaux avantages :
- Élimine les ensembles d’anonymat à dénominations fixes
- Réduit les attaques temporelles entre burn/redeem
- Supprime le problème de la monnaie rendue contaminée

**Limite** : La taille de l’ensemble est actuellement plafonnée à **65,000 coins**.

![Avantages de Lelantus](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## Engagements de coin

Un **engagement de coin** est un engagement à double aveuglement qui encode le numéro de série du coin et la valeur du coin.

Ils fonctionnent de manière similaire aux **Notes** dans Zcash.

L’engagement de coin est publié et stocké dans le registre lorsque le coin est créé (via des transactions Mint ou Spend).

![Schéma d’engagement de coin](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Modèle Basecoin < - > Zerocoin

Lelantus utilise le modèle classique **basecoin < - > zerocoin**.

**Caractéristique importante** : Les rachats partiels sont désormais possibles tout en conservant le reste et les montants cachés.

Comme avec Zcash, les transactions transparentes doivent être explicitement sélectionnées par l’utilisateur.

![Flux Lelantus](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## Preuves One-of-Many

Lelantus utilise des **preuves One-of-Many** pour extraire les valeurs d’entrée nécessaires à la preuve de l’équilibre sans révéler l’origine des entrées — et sans nécessiter de trusted setup.

Ces preuves sont également utilisées dans **Triptych** (mentionné dans notre fil CryptoNote).

![Preuves One-of-Many](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## Confidentialité de la couche réseau : Dandelion++

Les nœuds Firo utilisent la même Network Magic que le Magicbean de Zcash.

Comme Monero, Firo a implémenté **Dandelion++** pour ajouter de la confidentialité en masquant l’adresse IP de l’émetteur de la transaction.

**Phases de Dandelion++ :**
- **Phase Stem** - La transaction est relayée vers un seul nœud aléatoire au lieu de tous les pairs
- **Phase Fluff** - Déclenchée aléatoirement, puis bascule en mode de diffusion gossip normal

Cela rend beaucoup plus difficile de retracer l’origine d’une transaction par analyse du réseau.

![Explication de Dandelion++](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## Avenir : Lelantus-Spark

**Lelantus-Spark** (prévu pour plus tard en 2023) introduit deux niveaux de visibilité optionnelle à l’aide d’une **dérivation de style ZIP-32** et d’adresses diversifiées.

Il ajoutera également la prise en charge de :
- Multisig
- Actifs confidentiels définis par l’utilisateur

Ces fonctionnalités sont parallèles aux Zcash Shielded Assets.

![Annonce de Lelantus-Spark](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**Fil original par ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Cette page a été compilée à partir du fil original Zero to Zero Knowledge pour le wiki ZecHub.*
