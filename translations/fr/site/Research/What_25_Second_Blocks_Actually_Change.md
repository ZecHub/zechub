# ZIP 218 : ce que changent réellement les blocs de 25 secondes

Lors du sondage des détenteurs de NU7 clôturé le 14 septembre 2026, environ 2 397 669 ZEC ont voté pour le ZIP 218 et 141,6 ZEC ont voté contre, soit un résultat de 99,9 %. La plupart des médias l'ont résumé par « Les blocs Zcash deviennent plus rapides ». C'est exact, mais cela passe sous silence l'essentiel de ce que fait la proposition et l'essentiel de ce qu'elle maintient délibérément à l'identique.

Cette page explique le ZIP 218 à partir de son propre texte : ce qui change, ce qui ne change pas et ce que cela coûte.

## En bref

| | Avant NU7 | Après ZIP 218 (NU7) |
|---|---|---|
| Espacement cible des blocs | 75 secondes | 25 secondes |
| Blocs par jour | 1 152 | 3 456 |
| Subvention par bloc (ère de halving actuelle) | 1,5625 ZEC | 0,52083333 ZEC |
| Nouveaux ZEC par jour | inchangé | inchangé |
| Intervalle de halving | 1 680 000 blocs | 5 040 000 blocs |
| Limites d'actions protégées par bloc | aucune (seulement la limite de taille de 2 Mo) | 330 au total, avec des plafonds par pool |
| Débit Orchard (transactions à 2 actions) | environ 2,9 par seconde | environ 6,6 par seconde |

![ZIP 218 réduit l'espacement cible entre les blocs de 75 secondes à 25, triplant le nombre de blocs quotidiens de 1,152 à 3,456, tout en divisant le subside par bloc par le même facteur trois, de 1.5625 à 0.52083333 ZEC ; l'émission quotidienne reste donc de 1,800 ZEC et l'intervalle entre les halvings passe de 1,680,000 à 5,040,000 blocs afin que les dates de halving restent inchangées](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Trois fois plus de blocs, chacun rapportant trois fois moins. Le calendrier d'émission reste inchangé.

## Pourquoi changer le temps de bloc

L'objectif principal est de **réduire le temps d'attente**. Avant NU7, un paiement attendait en moyenne 75 secondes sa première confirmation, quelle que soit la charge du réseau. À 25 secondes, cette attente tombe à 25 secondes en moyenne. Le ZIP cite les paiements en point de vente, les dépôts sur les exchanges et les ponts inter-chaînes comme les usages qui en bénéficient le plus.

Deux points du ZIP méritent d'être gardés à l'esprit :

- **Il n'invite personne à utiliser moins de confirmations.** Pour les utilisateurs qui conservent la même tolérance au risque d'annulation qu'aujourd'hui, le ZIP prévoit une amélioration du temps de confirmation légèrement inférieure à un facteur trois.
- **Il ne remplace pas les travaux sur la finalité.** Le ZIP se présente comme complémentaire des mécanismes de finalité tels que Crosslink. Des blocs plus rapides sur la couche de base sont utiles, qu'une couche de finalité soit ajoutée ultérieurement ou non.

Le ZIP note également qu'un débit plus élevé aurait pu, à lui seul, être obtenu avec une taille de bloc plus grande. C'est la latence qui justifie le choix de blocs plus courts.

## Ce qui change

### Émission : autant de ZEC par jour

Tripler le nombre de blocs triplerait l'émission quotidienne si rien d'autre ne changeait. Le ZIP 218 l'évite en divisant encore la subvention par bloc par trois une fois NU7 activé.

Dans l'ère de halving actuelle, la subvention par bloc passe ainsi de **1,5625 ZEC à 0,52083333 ZEC** (52 083 333 zatoshis). Comme 156 250 000 zatoshis ne sont pas divisibles par trois, chaque bloc est arrondi à l'inférieur d'un tiers de zatoshi. Sur un intervalle de halving complet de 5 040 000 blocs, cela représente environ 0,0168 ZEC au total.

La subvention correspond au total des nouveaux ZEC créés par bloc. La part existante destinée au financement du développement continue d'y être prélevée, si bien que les mineurs reçoivent moins que le montant total, exactement comme aujourd'hui.

> **Une note sur le chiffre de 0,26041666 ZEC.** La note explicative du projet de ZIP indique la subvention post-NU7 comme floor(156250000 / 6) = 0,26041666 ZEC, et certains médias l'ont reprise. Cette note se trompe d'un facteur deux : 156 250 000 zatoshis correspondent déjà à la subvention post-Blossom, donc la diviser par six applique une seconde fois le facteur deux de Blossom en plus du facteur trois de NU7. La formule normative donne floor(1 250 000 000 / (2 · 3 · 4)) = 52 083 333 zatoshis à l'indice de halving actuel. Le ticket d'implémentation de Zebra pour ce changement ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) indique que la note compte deux fois le facteur Blossom, demande aux développeurs d'« implémenter la formule, pas la note » et précise qu'une correction a été déposée pour le ZIP. Le chiffre correct à l'activation est **0,52083333 ZEC**.

### Les halvings conservent leur calendrier

L'intervalle de halving triple, passant de 1 680 000 blocs à 5 040 000 blocs. Comme les blocs arrivent trois fois plus souvent, les halvings tombent toujours à peu près au même moment que sans ce changement. Le plafond total de l'offre n'est pas affecté.

Cette question est distincte de l'autre question sur l'émission posée lors du sondage NU7, dans laquelle les détenteurs ont voté pour conserver les halvings plutôt que de les remplacer par une courbe lissée. Le ZIP 218 s'appuie sur le modèle de halving existant et ne le modifie pas.

### Nouvelles limites d'actions protégées par bloc

Le ZIP 218 ajoute des plafonds sur la quantité d'activité protégée qu'un seul bloc peut contenir :

| Limite | Maximum par bloc |
|---|---|
| Tous les pools protégés confondus | 330 (chaque Sprout JoinSplit compte pour 2) |
| Actions Orchard | 330 |
| Entrées et sorties Sapling | 300 |
| JoinSplits Sprout | 25 |

Les parties transparentes des transactions ne sont pas concernées, et la limite de taille de bloc de 2 Mo s'applique toujours.

Ces limites existent parce que davantage de blocs signifierait sinon davantage de travail pour les portefeuilles et les nœuds. Avec ces plafonds, le pire scénario devient même **meilleur** qu'aujourd'hui, malgré trois fois plus de blocs :

- **Synchronisation des portefeuilles :** la quantité maximale de données qu'un portefeuille léger pourrait être contraint de télécharger en une journée passe d'environ 271 Mo à environ 169 Mo, soit une réduction d'environ 38 %. Le nombre de déchiffrements d'essai dans le pire cas passe d'environ 4,8 millions à environ 2,3 millions par jour.
- **Vérification des blocs :** les mesures du ZIP situent un bloc Orchard dans le pire cas à environ 432 ms avec les nouvelles limites, contre environ 770 ms pour le pire cas actuel. Pour Sapling, la baisse est plus importante : d'environ 3 175 ms à environ 272 ms.

Les plafonds Sapling et Sprout sont volontairement serrés. En mai 2026, Orchard détenait 87,9 % des ZEC protégés, Sapling 11,6 % et Sprout 0,5 %. Les petits pools disposent ainsi de suffisamment de place pour leur usage réel tout en offrant moins de prise à un attaquant. Comme les frais du ZIP 317 sont identiques par action logique dans chaque pool, un attaquant n'a rien à gagner à saturer un pool plutôt qu'un autre.

### Débit

Avec 330 actions Orchard par bloc, une transaction Orchard standard à 2 actions tient ⌊330 / 2⌋ = 165 fois par bloc. À raison d'un bloc toutes les 25 secondes, cela représente environ **6,6 transactions par seconde**, contre environ 2,9 aujourd'hui. Le ZIP parle d'une multiplication par 2,3 du débit Orchard normal. Sapling atteint environ 3,0 par seconde, ce qui reste supérieur à ce que Orchard permet aujourd'hui.

### Ajustement de la difficulté

L'algorithme de difficulté calcule une moyenne sur une fenêtre de blocs récents. Le ZIP 218 fait passer cette fenêtre de 17 à 102 blocs, de sorte qu'elle couvre toujours environ 2 550 secondes de temps réel, soit la même durée qu'au lancement de Zcash avec des blocs de 150 secondes. Le ZIP avance deux raisons : éviter de faciliter les attaques par manipulation de la difficulté (il cite l'incident MWEB d'avril 2026 sur Litecoin) et lisser les variations à court terme des temps de bloc.

Juste après l'activation, les temps de bloc mettront un certain temps à se stabiliser autour de la nouvelle cible. C'est attendu et cela reproduit ce qui s'est passé lors de Blossom, quand Zcash est passé de 150 à 75 secondes.

### Valeurs par défaut pour les nœuds et les portefeuilles

Il s'agit de recommandations pour les implémentations et non de règles de consensus :

- **Expiration des transactions :** l'expiration par défaut passe de 40 à 120 blocs, ce qui conserve environ 50 minutes.
- **Profondeur maximale de réorganisation :** la limite de Zebra passe de 99 à 600 blocs, soit environ 4,2 heures à 25 secondes, la même fenêtre qu'au lancement.
- **Profondeur d'ancrage des transactions protégées :** elle reste à 3 blocs, de sorte que le délai passe de 3,75 minutes à 1,25 minute. Le ZIP suit ici le précédent du Blossom.
- **Plusieurs constantes réseau** exprimées en blocs sont multipliées par trois afin de couvrir la même durée.

## Ce qui reste inchangé

- Les ZEC émis par jour, le calendrier des halvings et le plafond de l'offre
- La limite de taille de bloc de 2 Mo
- Les transactions transparentes, que les nouvelles limites d'actions ne concernent pas
- La maturité Coinbase à 100 blocs. Notez que cela représente désormais environ 42 minutes au lieu d'environ 125, car le décompte se fait en blocs et non en temps.

## Le compromis : davantage de blocs orphelins

Des blocs plus rapides ne sont pas gratuits. Un bloc orphelin est un bloc valide qui perd la course à l'inclusion dans la chaîne parce qu'un autre bloc a atteint le réseau en premier. Plus l'intervalle entre les blocs est court, plus cela se produit souvent, et le ZIP relie le taux de blocs orphelins à la propagation des blocs, au temps de vérification et au risque de centralisation du minage.

- **Avant NU7 :** environ 0,4 %, chiffre qui, selon le ZIP, sous-estime peut-être le taux réel, car la puissance de hachage est concentrée dans des pools.
- **Valeur théorique à 25 secondes :** environ 3,26 %, sur la base des délais de propagation Zcash mesurés.
- **Test sur devnet :** 99 nœuds Zebra répartis géographiquement, produisant des blocs pleins de 2 Mo à 25 secondes d'intervalle, ont mesuré un taux de blocs orphelins de 4,86 % et un taux de fourche de 0,37 %. Le seul réglage nécessaire a porté sur la configuration TCP. Comme ce devnet était plus décentralisé que le mainnet actuel, le ZIP considère ces chiffres comme proches du pire cas.
- **Point de référence :** le ZIP retient comme seuil de sécurité le taux historique de blocs orphelins d'Ethereum en preuve de travail, soit 5,4 %. Les deux chiffres du devnet se situent en dessous.

Il existe également deux coûts moindres. Les portefeuilles légers téléchargent environ 200 Ko de plus par jour d'en-têtes de blocs compacts. Et comme il y a trois fois plus de blocs, un nœud complet resté hors ligne a davantage de blocs à traiter pour se resynchroniser, même si chaque bloc est moins coûteux à vérifier. Le ZIP accepte ces deux coûts.

## Statut et calendrier

- **Statut du ZIP :** Proposé. Responsables : Dev Ojha et Evan Forbes ; créé le 13 mars 2026.
- **Sondage des détenteurs :** clôturé le 14 septembre 2026, avec 99,9 % de soutien. Le sondage exprime une préférence ; il ne modifie pas à lui seul les règles de consensus.
- **Calendrier :** dans une annonce publiée sur le Zcash Community Forum le 17 septembre, les organisations de développement ont convenu d'un calendrier prévoyant la finalisation du code au 30 septembre, NU7 sur le testnet le 6 octobre et une décision finale le 20 octobre. NU7 a été activé sur le mainnet à la hauteur 3 543 405 ([ZIP 259](https://zips.z.cash/zip-0259)) le 6 novembre 2026 (UTC) : la cible de 25 secondes est donc désormais en vigueur.
- **Implémentation :** suivie dans Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) et dans Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Ce que cela signifie pour vous

- **Vous détenez des ZEC :** vous n'avez rien à faire. Votre solde et le calendrier d'émission ne sont pas affectés.
- **Vous utilisez un portefeuille :** mettez-le à jour lorsque votre portefeuille prendra en charge NU7. Les premières confirmations arriveront environ trois fois plus vite.
- **Vous exploitez un nœud, un exchange ou un service :** prévoyez la mise à niveau avant l'activation et vérifiez tous les paramètres exprimés en blocs, car un nombre fixe de blocs couvre désormais trois fois moins de temps qu'auparavant.

## Sources

- [ZIP 218 : espacement cible des blocs de 25 secondes](https://zips.z.cash/zip-0218)
- [ZIP 208 : espacement cible des blocs réduit](https://zips.z.cash/zip-0208), le précédent du Blossom
- [Forum : proposition — Réduire l'espacement cible des blocs Zcash à 25 s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum : la réduction du temps de bloc Zcash semble sûre pour NU7 avec un devnet uniquement Zebra](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Ticket Zebra #11463](https://github.com/ZcashFoundation/zebra/issues/11463), intervalle de halving et subvention post-NU7
- [Ticket Zebra #11440](https://github.com/ZcashFoundation/zebra/issues/11440), suivi de l'implémentation du ZIP 218
- Résultats du sondage NU7 et calendrier, tels que rapportés par Bitcoin.com News, crypto.news et KuCoin (16–19 septembre 2026)
