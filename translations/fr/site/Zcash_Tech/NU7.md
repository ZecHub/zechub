<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU7

> NU7 a été activée sur le Mainnet de Zcash au bloc 3 543 405 le 6 novembre 2026 (02 h 34 UTC, soit le soir du 5 novembre dans les fuseaux horaires des États-Unis). Elle est en service depuis.

Ce que vous allez retenir : ce que NU7 a changé (des blocs plus rapides, des limites sur les actions protégées, le recyclage des frais, la fin des transactions de version 4), ce qu'elle n'a pas modifié, et ce que les opérateurs de nœuds, les portefeuilles, les exchanges et les mineurs ont dû faire.

NU7 est une [mise à niveau du réseau](../start-here/network-upgrades) Zcash, déployée par [ZIP 259](https://zips.z.cash/zip-0259). Elle a réduit le temps entre deux blocs de 75 à 25 secondes. Elle a plafonné le nombre d'actions protégées qu'un bloc peut contenir. Elle retire désormais de la circulation 60 % des frais de transaction pour qu'ils puissent être réémis au profit des futurs mineurs. Enfin, elle a rendu invalides les transactions de version 4, ce qui a mis à la retraite l'ancien pool Sprout. Elle n'a pas introduit de nouveau format de transaction. Son identifiant de branche de consensus est `0x77190ad9`.

Pourquoi c'est important : avant NU7, vous attendiez en moyenne 75 secondes pour une première confirmation. C'est lent pour un paiement en magasin, un dépôt sur un exchange ou un échange inter-chaînes. NU7 a ramené ce délai à environ 25 secondes sans créer davantage de ZEC : la récompense par bloc a été divisée par trois, si bien que l'émission quotidienne n'a pas changé. C'est aussi la première mise à niveau qui ajoute un mécanisme destiné à financer la sécurité du réseau lorsque les récompenses de bloc diminueront.

Vous découvrez Zcash ? Commencez par [Qu'est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash) et [Les pools protégés](../using-zcash/shielded-pools), puis revenez ici.

## En bref

- **Blocs de 25 secondes** ([ZIP 218](https://zips.z.cash/zip-0218)) : la première confirmation arrive en 25 secondes environ au lieu de 75. La subvention de bloc est passée de 1,5625 à 0,52083333 ZEC, ce qui fait qu'environ 1 800 ZEC sont toujours émis chaque jour.
- **Limites sur les actions protégées** (ZIP 218) : un bloc contient au maximum 330 actions protégées, tous pools confondus, avec en plus des plafonds par pool. Ainsi, le coût de validation d'un bloc dans le pire des cas et le coût de synchronisation des portefeuilles restent inférieurs à ce qu'ils étaient auparavant.
- **Mécanisme de durabilité du réseau** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)) : 60 % des frais de transaction de chaque bloc sortent de la circulation. Ils seront réémis plus tard au profit des mineurs, à partir du bloc 8 939 664 (prévu vers février 2031). Le plafond de 21 millions d'unités ne change pas.
- **Les transactions de version 4 sont invalides** ([ZIP 2003](https://zips.z.cash/zip-2003)) : les portefeuilles doivent construire des transactions v5 ou v6. Sprout ne peut être dépensé qu'avec une transaction v4, si bien que les fonds encore présents dans Sprout sont désormais gelés.
- **Logiciels** : [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) et les versions suivantes appliquent les règles de NU7. Il n'existe aucune version de `zcashd` prenant en charge NU7.

## Analogie visuelle

Imaginez la chaîne comme une ligne de train. Avant NU7, un train partait toutes les 75 secondes et pouvait transporter autant de passagers que 2 Mo pouvaient en contenir. NU7 fait partir un train toutes les 25 secondes et paie chaque conducteur le tiers de l'ancien tarif, si bien que le total quotidien reste le même. Elle limite aussi le nombre de passagers les plus lourds (les actions protégées) qui peuvent monter dans un même train, afin que le contrôle d'aucun train ne prenne trop de temps.

## Ce que NU7 a changé

### Intervalle cible de 25 secondes entre les blocs (ZIP 218)

- L'ajustement de la difficulté vise désormais un bloc toutes les **25 secondes** au lieu de 75. Les blocs arrivent donc trois fois plus souvent.
- La subvention de bloc a été divisée par trois : elle est de **0,52083333 ZEC** par bloc pendant la période de halving en cours (contre 1,5625 ZEC auparavant). L'émission quotidienne reste d'environ 1 800 ZEC (3 456 blocs par jour au lieu de 1 152).
- Les halvings ont toujours lieu tous les quatre ans. Comme les blocs sont plus rapides, le prochain halving a été déplacé au bloc **6 132 390**, prévu vers fin novembre 2028 avec un intervalle de 25 secondes (ZIP 259).
- La fenêtre de calcul de la moyenne de difficulté est passée de 17 à **102 blocs**, de sorte que l'ajustement porte toujours sur une durée similaire.
- L'expiration par défaut des transactions est passée de 40 à **120 blocs**, ce qui la maintient à environ 50 minutes.

### Limites sur les actions protégées (ZIP 218)

Chaque bloc dispose désormais d'un budget commun et de plafonds par pool :

| Limite | Par bloc |
|---|---|
| Toutes les actions protégées, tous pools confondus | 330 |
| Actions Orchard | 330 |
| Actions Ironwood | 330 |
| Entrées + sorties Sapling | 300 |
| JoinSplits Sprout | aucun autorisé |

Avant NU7, un bloc plein de 2 Mo pouvait contenir environ 617 actions Orchard ou Ironwood, ou environ 2 107 sorties Sapling, sans aucune limite par pool. ZIP 218 fixe les nouveaux plafonds de sorte que, même avec trois fois plus de blocs, le pire des cas pour les nœuds et pour la synchronisation des portefeuilles soit moins lourd qu'auparavant. Par exemple, la bande passante maximale de synchronisation protégée d'un client léger passe d'environ 271 à 169 Mo par jour. Dans le même temps, le débit du protocole Orchard fait plus que doubler : il passe d'environ 2,9 à 6,6 transactions par seconde pour des transactions à 2 actions.

### Mécanisme de durabilité du réseau (ZIP 235 + ZIP 237)

- **Retrait des frais (ZIP 235) :** 60 % des frais de transaction de chaque bloc sont retirés de la circulation, et les 40 % restants reviennent au mineur comme auparavant. Contrairement à une destruction, le ZEC retiré fait l'objet d'un suivi pour pouvoir être émis de nouveau plus tard.
- **Réémission (ZIP 237) :** le ZEC retiré est conservé dans un état de consensus public appelé « solde de valeur NSM ». Ce solde a été initialisé lors de NU7 avec des montants que les mineurs n'avaient pas réclamés par le passé. À partir du bloc **8 939 664** (prévu vers février 2031), chaque bloc émet une part fixe de ce solde, en plus du calendrier normal des halvings.
- Le plafond de l'offre n'augmente pas. Quand le solde est nul, l'émission suit exactement l'ancien calendrier des halvings.
- NU7 n'a **pas** déployé [ZIP 233](https://zips.z.cash/zip-0233) (retrait volontaire par les utilisateurs) ni [ZIP 234](https://zips.z.cash/zip-0234) (remplacement des halvings par une courbe lissée). Les sondages auprès des détenteurs de pièces ont retenu la conception de ZIP 237, qui préserve les halvings.

### Interdiction des transactions de version 4 (ZIP 2003)

- Depuis NU7, toute transaction de version 4 est invalide. Cela concerne les transferts Sprout, mais aussi les transactions uniquement transparentes et les transactions Sapling construites au format v4. Les transactions de version 5 (NU5) et de version 6 ([Ironwood](../zcash-tech/ironwood)) ne changent pas.
- Les transferts Sprout n'existent qu'au format v4 : le pool [Sprout](../zcash-tech/sprout) ne peut donc plus être dépensé. Consultez [Récupérer des fonds](../using-zcash/recovering-funds).

### Changements mineurs

- Les règles du fonds de développement ont été révisées pour que les flux de financement fonctionnent avec des blocs de 25 secondes ([ZIP 207](https://zips.z.cash/zip-0207) révision 2, [ZIP 214](https://zips.z.cash/zip-0214) révision 3). Une liste d'adresses de flux de financement a aussi été mise à jour ([ZIP 2008](https://zips.z.cash/zip-2008)).
- Les nœuds NU7 annoncent la version **170190** du protocole réseau sur le Mainnet et se déconnectent des pairs plus anciens après l'activation.

## Ce que NU7 n'a pas fait

- **Pas de nouveau format de transaction.** NU7 a délibérément évité d'imposer une nouvelle migration aux portefeuilles et aux analyseurs juste après l'arrivée des transactions v6 avec Ironwood.
- **Aucun changement du plafond de l'offre ni du rythme des halvings tous les quatre ans.**
- **Aucun changement de la maturité des transactions coinbase.** Les pièces minées doivent toujours attendre 100 blocs avant de pouvoir être dépensées (soit environ 42 minutes désormais, au lieu d'environ 2 heures).
- **Pas de nouveau pool protégé.** Ironwood (NU6.3) reste le pool le plus récent. Orchard reste limité aux dépenses, comme c'est le cas depuis Ironwood.

## Ce que chaque groupe a dû faire

- **Opérateurs de nœuds :** exécutez [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) ou une version ultérieure. Au premier démarrage, Zebra 7 fait passer sa base de données du format v28 au format v29, et Zebra 6.x ne peut pas lire le format v29 : sauvegardez donc `state/v28` avant la mise à jour. `zcashd` n'a aucune version NU7 (sa dernière version est la 6.20.0, publiée en juin 2026). Le [zcashd guide de migration de l'API](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) du livre Zebra indique, pour chaque RPC de `zcashd`, son équivalent dans Zebra ou [Zallet](../zcash-tech/zallet), ou son remplaçant. Consultez [Nœuds complets](../zcash-tech/full-nodes) et le [guide Zebra renforcé](../guides/hardened-zebrad).
- **Portefeuilles :** arrêtez de construire des transactions v4. Utilisez l'expiration par défaut de 120 blocs, conservez la profondeur d'ancrage de 3 blocs (environ 1,25 minute désormais) et respectez les limites d'actions par bloc. Une transaction qui dépasse à elle seule une limite ne pourra jamais être minée.
- **Exchanges et services de paiement :** une confirmation prend désormais 25 secondes, si bien que le même nombre de confirmations correspond à un tiers de la durée d'avant. Réévaluez le nombre de confirmations exigé pour les dépôts en fonction du délai et du niveau de sécurité que vous visez réellement, plutôt que de conserver l'ancien chiffre par habitude.
- **Mineurs et pools :** les logiciels et les modèles de minage doivent appliquer la nouvelle subvention, la répartition des frais et les limites d'actions. Les blocs construits selon les anciennes règles sont rejetés.

## Erreurs courantes

- **« Mon ancien nœud tourne toujours, donc tout va bien. »** Pour NU7 uniquement, ZIP 259 a levé la règle habituelle qui veut qu'un logiciel antérieur à la mise à niveau s'arrête de lui-même avant l'activation. Un nœud Zebra 6.x ou un nœud `zcashd` peut donc rester en ligne avec les anciennes règles et se détacher discrètement de la vraie chaîne. Vérifiez que votre nœud indique une hauteur supérieure à 3 543 405 et qu'il concorde avec un explorateur de blocs.
- **« Des blocs plus rapides signifient que davantage de ZEC est créé. »** Non. La subvention par bloc a été divisée par trois, si bien que l'émission quotidienne ne change pas.
- **« 60 % des frais sont détruits pour toujours. »** Non. Ils sont retirés de la circulation, puis réémis plus tard au profit des mineurs par le NSM. Le plafond de l'offre ne change pas.
- **« Seuls les utilisateurs de Sprout sont concernés par le changement v4. »** Tout portefeuille ou script qui produisait encore des transactions v4, y compris des transactions uniquement transparentes ou Sapling, a cessé de fonctionner. Les transactions v4 en attente sont devenues invalides lors de l'activation, et il ne suffit pas de les signer de nouveau pour les rendre valides.
- **« Les paramètres exprimés en blocs restent valables. »** Tout ce qui se mesure en blocs (confirmations, expiration, délais de verrouillage, délais d'attente) s'écoule désormais trois fois plus vite en temps réel.

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| Block target spacing | Le temps moyen entre deux blocs visé par l'ajustement de la difficulté : 25 secondes depuis NU7 |
| Block subsidy | Les nouveaux ZEC créés dans chaque bloc, répartis entre le mineur et les flux du fonds de développement |
| Shielded action | Une unité de travail protégé dans une transaction (une action Orchard ou Ironwood, ou une entrée ou une sortie Sapling) |
| Network Sustainability Mechanism (NSM) | Les règles qui retirent de la circulation une partie des frais et la réémettent au profit des futurs mineurs |
| NSM Value Balance | Le total public et cumulé des ZEC retirés de la circulation et en attente de réémission |
| Version 4 transaction | Le format de transaction issu de Sapling, rendu invalide par NU7. Les formats v5 et v6 restent valides |
| Consensus branch ID | Le numéro qui identifie un ensemble de règles de consensus. Les signatures s'y engagent : une transaction signée selon les anciennes règles est donc invalide avec les nouvelles |

## FAQ

**Quand NU7 a-t-elle été activée ?** Au bloc 3 543 405 du Mainnet, le 6 novembre 2026 à 02 h 34 UTC. Le Testnet l'avait activée plus tôt, au bloc 4 465 026, le 4 octobre 2026.

**La récompense de bloc a-t-elle changé ?** Par bloc, oui : 0,52083333 ZEC au lieu de 1,5625 ZEC. Par jour, non : environ 1 800 ZEC dans les deux cas.

**Mes ZEC Sprout sont-ils perdus ?** Ils ne peuvent plus être déplacés, car les dépenses Sprout nécessitent des transactions v4, désormais invalides. Consultez [Récupérer des fonds](../using-zcash/recovering-funds) pour savoir ce que cela implique concrètement.

**Ai-je besoin d'un nouveau portefeuille ?** Il vous faut une version de portefeuille qui prend en charge NU7. La page [Portefeuilles](../using-zcash/wallets) de ZecHub indique quels portefeuilles sont compatibles avec NU7.

**Quand la réémission des frais commence-t-elle ?** Au bloc 8 939 664 sur le Mainnet, ce qui est prévu vers février 2031 si les blocs conservent une moyenne de 25 secondes.

**Pourquoi NU7 n'a-t-elle pas introduit de nouveau format de transaction ?** Pour épargner aux portefeuilles et aux analyseurs une deuxième migration juste après le format v6 de Ironwood. Par ailleurs, la répartition des frais est calculée par bloc : aucun nouveau champ de transaction n'était donc nécessaire.

## Testez vos connaissances

1. Pourquoi l'émission quotidienne de ZEC reste-t-elle la même après NU7 ?
2. Que deviennent les 60 % de frais retirés de la circulation ?
3. Pourquoi les fonds Sprout ne peuvent-ils plus être dépensés après NU7 ?
4. Pourquoi un nœud jamais mis à jour est-il particulièrement risqué lors de cette mise à niveau ?

Réponses : (1) la subvention par bloc a été divisée par trois alors que les blocs sont devenus trois fois plus fréquents ; (2) ils alimentent le solde de valeur NSM et sont réémis au profit des mineurs à partir du bloc 8 939 664 ; (3) les dépenses Sprout n'existent qu'au format v4, que NU7 a rendu invalide ; (4) ZIP 259 a supprimé l'arrêt automatique, si bien qu'un ancien nœud peut continuer à fonctionner sur la mauvaise chaîne.

### Ressources

[ZIP 259 : Déploiement de la mise à niveau du réseau NU7](https://zips.z.cash/zip-0259)

[ZIP 218 : Intervalle cible de 25 secondes entre les blocs](https://zips.z.cash/zip-0218)

[ZIP 235 : Retirer de la circulation 60 % des frais de transaction](https://zips.z.cash/zip-0235)

[ZIP 237 : Mécanisme de durabilité du réseau, une émission qui préserve les halvings](https://zips.z.cash/zip-0237)

[ZIP 2003 : Interdire les transactions de version 4](https://zips.z.cash/zip-2003)

[Notes de version de Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Forum communautaire Zcash : calendrier de NU7](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Pages associées

| Page | Lien avec ce sujet |
|---|---|
| [Ironwood](./Ironwood.md) | la mise à niveau précédente de la série, qui a introduit les transactions v6 |
| [Ce que les blocs de 25 secondes changent vraiment](../research/what-25-second-blocks-actually-change) | un examen approfondi du temps de bloc plus court |
| [Sprout](./Sprout.md) | le pool que NU7 a mis à la retraite |
| [Récupérer des fonds](../using-zcash/recovering-funds) | ce que le gel de Sprout implique pour les anciens fonds |
| [Transactions](../using-zcash/transactions) | l'expiration et les confirmations après NU7 |

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Ironwood](../zcash-tech/ironwood)
