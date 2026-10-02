# ZIP 218 : ce que changent réellement les blocs de 25 secondes

Dans le sondage auprès des détenteurs de NU7 qui s'est clôturé le 14 septembre 2026, environ 2 397 669 ZEC ont voté pour ZIP 218 et 141,6 ZEC ont voté contre, soit un résultat de 99,9 %. La plupart des articles l'ont résumé ainsi : « les blocs Zcash deviennent plus rapides ». C'est vrai, mais cela omet l'essentiel de ce que fait la proposition ainsi que l'essentiel de ce qu'elle conserve délibérément à l'identique.

Cette page explique ZIP 218 à partir de son propre texte : ce qui change, ce qui ne change pas et ce que cela coûte.

## La version courte

| | Aujourd'hui | Après ZIP 218 |
|---|---|---|
| Espacement cible des blocs | 75 secondes | 25 secondes |
| Blocs par jour | 1 152 | 3 456 |
| Subvention de bloc (ère de halving actuelle) | 1,5625 ZEC | 0,52083333 ZEC |
| Nouveaux ZEC par jour | inchangé | inchangé |
| Intervalle de halving | 1 680 000 blocs | 5 040 000 blocs |
| Limites d'actions protégées par bloc | aucune (seulement la limite de taille de 2 Mo) | 330 au total, avec des plafonds par pool |
| Débit Orchard (transactions à 2 actions) | environ 2,9 par seconde | environ 6,6 par seconde |

Trois fois plus de blocs, chacun rapportant un tiers autant. Le calendrier d'émission reste inchangé.

## Pourquoi modifier le temps de bloc

L'objectif principal est **de réduire le temps d'attente**. Aujourd'hui, un paiement attend en moyenne 75 secondes pour sa première confirmation, quelle que soit la charge du réseau. Avec 25 secondes, cette moyenne tombe à 25 secondes. Le ZIP cite les paiements en point de vente, les dépôts sur les plateformes d'échange et les bridges inter-chaînes parmi les usages qui le ressentent le plus.

Deux points du ZIP méritent d'être gardés à l'esprit :

- **Il ne demande à personne d'utiliser moins de confirmations.** Pour les utilisateurs qui conservent la même tolérance au risque de réorganisation qu'aujourd'hui, le ZIP prévoit une amélioration du temps de confirmation légèrement inférieure à un facteur trois.
- **Il ne remplace pas le travail sur la finalité.** Le ZIP se décrit comme complémentaire aux mécanismes de finalité tels que Crosslink. Des blocs de couche de base plus rapides sont utiles, qu'une couche de finalité soit ajoutée ou non ultérieurement.

Le ZIP note également qu'un débit supérieur aurait pu être atteint uniquement avec une taille de bloc plus grande. La latence est la raison du choix de blocs plus courts.

## Ce qui change

### Émission : même quantité de ZEC par jour

Tripler le nombre de blocs triplerait l'émission quotidienne si rien d'autre ne changeait. ZIP 218 l'empêche en divisant la subvention par bloc par un facteur supplémentaire de trois une fois que NU7 est actif.

Dans l'ère de halving actuelle, la subvention de bloc passe ainsi de **1,5625 ZEC à 0,52083333 ZEC** (52 083 333 zatoshi). Comme 156 250 000 zatoshi ne se divisent pas exactement par trois, chaque bloc est arrondi à l'inférieur d'un tiers de zatoshi. Sur un intervalle complet de halving de 5 040 000 blocs, cela représente environ 0,0168 ZEC au total.

La subvention est le total des nouveaux ZEC créés par bloc. La part existante destinée au financement du développement continue d'en être prélevée, de sorte que les mineurs reçoivent moins que le montant total, exactement comme aujourd'hui.

> **Une remarque sur le chiffre de 0,26041666 ZEC.** La note explicative du projet de ZIP imprime la subvention post-NU7 comme floor(156250000 / 6) = 0,26041666 ZEC, et certains articles l'ont répétée. Cette note comporte une erreur d'un facteur deux : 156 250 000 zatoshi est déjà la subvention post-Blossom ; la division par six applique donc une seconde fois le facteur deux de Blossom, en plus du facteur trois de NU7. La formule normative donne floor(1,250,000,000 / (2 · 3 · 4)) = 52 083 333 zatoshi à l'indice de halving actuel. Le ticket d'implémentation de Zebra pour cette modification ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) indique que la note compte deux fois le facteur Blossom, demande aux implémenteurs d'« implémenter la formule, pas la note », et précise qu'une correction a été déposée concernant le ZIP. Le chiffre correct lors de l'activation est **0,52083333 ZEC**.

### Les halvings conservent leur calendrier

L'intervalle de halving triple, passant de 1 680 000 blocs à 5 040 000 blocs. Puisque les blocs arrivent trois fois plus souvent, les halvings ont toujours lieu approximativement au même moment qu'ils l'auraient fait sans ce changement. Le plafond total d'approvisionnement n'est pas affecté.

Cela est distinct de l'autre question d'émission du sondage NU7, dans laquelle les détenteurs ont voté pour conserver les halvings plutôt que de les remplacer par une courbe lissée. ZIP 218 fonctionne avec le modèle de halving existant et ne le modifie pas.

### Nouvelles limites d'actions protégées par bloc

ZIP 218 ajoute des plafonds à la quantité d'activité protégée qu'un seul bloc peut contenir :

| Limite | Maximum par bloc |
|---|---|
| Tous les pools protégés combinés | 330 (chaque JoinSplit Sprout compte pour 2) |
| Actions Orchard | 330 |
| Entrées plus sorties Sapling | 300 |
| JoinSplits Sprout | 25 |

Les parties transparentes des transactions ne sont pas affectées, et la limite de taille de bloc de 2 Mo s'applique toujours.

Ces limites existent, car davantage de blocs signifierait autrement davantage de travail pour les wallets et les nœuds. Avec les plafonds en place, le pire cas devient en réalité **meilleur** qu'aujourd'hui, même avec trois fois plus de blocs :

- **Synchronisation du wallet :** la quantité maximale de données qu'un wallet léger pourrait être contraint de télécharger en une journée passe d'environ 271 Mo à environ 169 Mo, soit une réduction d'environ 38 %. Les déchiffrements d'essai dans le pire cas passent d'environ 4,8 millions à environ 2,3 millions par jour.
- **Vérification des blocs :** les benchmarks du ZIP situent un bloc Orchard dans le pire cas à environ 432 ms avec les nouvelles limites, contre environ 770 ms pour le pire cas actuel. Pour Sapling, la baisse est plus importante, de 3 175 ms à environ 272 ms.

Les plafonds Sapling et Sprout sont intentionnellement stricts. En mai 2026, Orchard détenait 87,9 % des ZEC protégés, Sapling 11,6 % et Sprout 0,5 % ; les pools plus petits disposent donc de suffisamment d'espace pour leur utilisation réelle tout en offrant moins de possibilités d'abus à un attaquant. Comme les frais de ZIP 317 facturent le même montant par action logique dans chaque pool, un attaquant ne gagne rien à saturer un pool plutôt qu'un autre.

### Débit

Avec 330 actions Orchard par bloc, une transaction Orchard standard à 2 actions peut tenir ⌊330 / 2⌋ = 165 fois par bloc. Avec un bloc toutes les 25 secondes, cela représente environ **6,6 transactions par seconde**, contre environ 2,9 aujourd'hui — le ZIP qualifie cela d'augmentation de 2,3× du débit normal de Orchard. Sapling atteint environ 3,0 par seconde, toujours au-dessus de ce que Orchard gère aujourd'hui.

### Ajustement de la difficulté

L'algorithme de difficulté calcule une moyenne sur une fenêtre de blocs récents. ZIP 218 fait passer cette fenêtre de 17 à 102 blocs, de sorte qu'elle couvre toujours environ 2 550 secondes de temps réel, soit la même durée qu'elle couvrait lorsque Zcash a été lancé avec des blocs de 150 secondes. Le ZIP donne deux raisons : éviter de faciliter les attaques de manipulation de la difficulté (il cite l'incident MWEB de Litecoin en avril 2026), et lisser les variations à court terme des temps de bloc.

Juste après l'activation, les temps de bloc mettront un certain temps à se stabiliser sur la nouvelle cible. C'est attendu et cela reflète ce qui s'est produit lors de Blossom, quand Zcash est passé de 150 à 75 secondes.

### Paramètres par défaut pour les nœuds et les wallets

Il s'agit de recommandations destinées aux implémentations plutôt que de règles de consensus :

- **Expiration des transactions :** l'expiration par défaut passe de 40 à 120 blocs, en conservant approximativement les mêmes 50 minutes.
- **Profondeur maximale de réorganisation :** la limite de Zebra passe de 99 à 600 blocs, soit environ 4,2 heures à 25 secondes, la même fenêtre qu'elle couvrait au lancement.
- **Profondeur d'ancre pour les transactions protégées :** reste à 3 blocs, de sorte que le délai passe de 3,75 minutes à 1,25 minute. Le ZIP suit ici le précédent de Blossom.
- **Plusieurs constantes réseau** mesurées en blocs sont multipliées par trois afin qu'elles couvrent la même durée.

## Ce qui reste identique

- Les ZEC émis par jour, le calendrier de halving et le plafond d'approvisionnement
- La limite de taille de bloc de 2 Mo
- Les transactions transparentes, que les nouvelles limites d'actions ne touchent pas
- La maturité Coinbase à 100 blocs. Notez que cela signifie désormais environ 42 minutes au lieu d'environ 125, car le décompte est en blocs, et non en temps.

## Le compromis : davantage de blocs obsolètes

Des blocs plus rapides ne sont pas gratuits. Un bloc obsolète est un bloc valide qui perd la course pour être inclus dans la chaîne parce qu'un autre bloc a atteint le réseau en premier. Plus l'écart entre les blocs est court, plus cela se produit souvent, et le ZIP relie le taux de blocs obsolètes à la propagation des blocs, au temps de vérification et au risque de centralisation du minage.

- **Aujourd'hui :** environ 0,4 %, ce que le ZIP note pourrait sous-estimer le taux sous-jacent, car la puissance de hachage est concentrée dans des pools.
- **Théorique à 25 secondes :** environ 3,26 %, sur la base des délais de propagation Zcash mesurés.
- **Test devnet :** 99 nœuds Zebra répartis géographiquement, produisant des blocs complets de 2 Mo avec un espacement de 25 secondes, ont mesuré un taux de blocs obsolètes de 4,86 % et un taux de forks de 0,37 %. Le seul réglage nécessaire concernait la configuration TCP. Comme ce devnet était plus décentralisé que le mainnet actuel, le ZIP considère ces chiffres comme proches du pire cas.
- **Point de référence :** le ZIP utilise le taux historique de blocs obsolètes de 5,4 % d'Ethereum en preuve de travail comme seuil de sécurité. Les deux chiffres du devnet sont inférieurs à ce seuil.

Il existe aussi deux coûts plus modestes. Les wallets légers téléchargent environ 200 Ko supplémentaires par jour d'en-têtes de blocs compacts. Et, comme il y a trois fois plus de blocs, un nœud complet qui a été hors ligne a davantage de blocs à traiter lorsqu'il se remet à jour, même si chaque bloc est moins coûteux à vérifier. Le ZIP accepte les deux.

## Statut et calendrier

- **Statut de ZIP :** Projet. Responsables : Dev Ojha et Evan Forbes ; créé le 13 mars 2026.
- **Sondage auprès des détenteurs :** clôturé le 14 septembre 2026, avec 99,9 % de soutien. Le sondage indique une préférence ; il ne modifie pas à lui seul les règles de consensus.
- **Calendrier :** dans une annonce du Community Forum de Zcash le 17 septembre, les organisations de développement ont convenu d'un calendrier prévoyant la finalisation du code le 30 septembre, NU7 sur testnet le 6 octobre, une décision finale et une hauteur d'activation du mainnet le 20 octobre, et une activation du mainnet visée autour du 5 novembre 2026. Le 5 novembre est un objectif, et non une date fixe, tant que la hauteur n'est pas définie.
- **Implémentation :** suivie dans Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) et dans Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Ce que cela signifie pour vous

- **Détenir des ZEC :** rien à faire. Votre solde et le calendrier d'approvisionnement ne sont pas affectés.
- **Utiliser un wallet :** mettez à jour lorsque votre wallet prendra en charge NU7. Les premières confirmations arriveront environ trois fois plus vite.
- **Exploiter un nœud, une plateforme d'échange ou un service :** prévoyez une mise à niveau avant l'activation et vérifiez les paramètres mesurés en blocs, car un nombre fixe de blocs couvre désormais un tiers du temps qu'il couvrait auparavant.

## Sources

- [ZIP 218 : espacement cible des blocs de 25 secondes](https://zips.z.cash/zip-0218)
- [ZIP 208 : espacement cible des blocs plus court](https://zips.z.cash/zip-0208), le précédent Blossom
- [Forum : proposition — réduire l'espacement cible des blocs Zcash à 25 s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum : la réduction du temps de bloc de Zcash semble sûre pour NU7 avec un devnet uniquement Zebra](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra ticket #11463](https://github.com/ZcashFoundation/zebra/issues/11463), intervalle de halving et subvention post-NU7
- [Zebra ticket #11440](https://github.com/ZcashFoundation/zebra/issues/11440), suivi de l'implémentation de ZIP 218
- NU7 résultats du sondage et calendrier, tels que rapportés par Bitcoin.com News, crypto.news et KuCoin (16–19 septembre 2026)
