<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Overwinter

> Overwinter a été activé sur le mainnet de Zcash au bloc 347 500 (26 juin 2018 UTC).

Ce que vous allez retenir : comment Zcash a appris à modifier ses propres règles en toute sécurité, et pourquoi cette base a rendu possible chaque mise à niveau ultérieure, à commencer par Sapling.

Overwinter est une [mise à niveau du réseau](../start-here/network-upgrades) Zcash, la première après le lancement du réseau. Elle est définie dans plusieurs Propositions d'amélioration de Zcash : [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) et [ZIP 143](https://zips.z.cash/zip-0143). Overwinter n'a ajouté aucune nouvelle fonctionnalité shielded. À la place, elle a renforcé le protocole afin que les futures mises à niveau puissent être déployées en toute sécurité. La mise à niveau est documentée par [Electric Coin Company](../zcash-organizations/electric-coin-company) sur la page officielle des mises à niveau de Zcash.

Pourquoi c'est important. Modifier les règles d'une blockchain en fonctionnement est dangereux. Si cela est mal fait, deux versions du réseau peuvent être en désaccord, ou une transaction destinée à une chaîne peut être copiée sur une autre. Avant Overwinter, Zcash ne disposait d'aucune méthode standard et sûre contre les replays pour coordonner un changement de règles. Overwinter a corrigé cela. Elle a donné à Zcash un processus formel pour les mises à niveau et, tout aussi important, une protection bidirectionnelle contre les replays, de sorte qu'une transaction valide sous un ensemble de règles ne puisse pas être rejouée sous un autre. C'est cette base qui a permis à Sapling, et à chaque mise à niveau qui a suivi, d'être activés proprement.

![Avant et après Overwinter : avant, pas de voie standard de mise à niveau ni de protection contre les replays. Après, un mécanisme de mise à niveau du réseau avec protection bidirectionnelle contre les replays et futures mises à niveau sûres](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Le mécanisme de mise à niveau

Overwinter a introduit le mécanisme de mise à niveau du réseau, défini dans [ZIP 200](https://zips.z.cash/zip-0200). Chaque mise à niveau définit désormais deux choses : un identifiant de branche de consensus qui nomme l'ensemble actuel de règles, et une hauteur d'activation, le bloc auquel les nouvelles règles prennent effet. Cela donne à tous ceux qui exécutent un logiciel Zcash une fenêtre claire pour effectuer la mise à jour avant le basculement.

Overwinter elle-même a été activée sur le mainnet au bloc 347 500.

[ZIP 201](https://zips.z.cash/zip-0201) décrit la façon dont les nœuds se traitent mutuellement autour d'une mise à niveau. Avant l'activation, les nœuds préfèrent se connecter à des pairs exécutant la même version. Au moment de l'activation, un nœud se déconnecte des pairs qui se trouvent sur une branche de consensus différente, afin que le réseau se sépare proprement selon les nouvelles règles au lieu de devenir confus.

## Protection contre les replays

Un replay se produit lorsqu'une personne prend une transaction valide sur une chaîne et la rediffuse sur une autre. Overwinter ferme cette porte avec un nouveau schéma de signature, défini dans [ZIP 143](https://zips.z.cash/zip-0143). Lorsqu'un wallet signe une transaction, la signature s'engage désormais sur l'identifiant de branche de consensus de la chaîne actuelle. Une transaction signée pour une branche n'est tout simplement valide sur aucune autre branche, dans un sens comme dans l'autre. C'est ce que signifie la protection bidirectionnelle contre les replays.

Cela fonctionne main dans la main avec le nouveau format de transaction version 3 de [ZIP 202](https://zips.z.cash/zip-0202), parfois appelé format Overwintered. Il ajoute un drapeau fOverwintered et un identifiant de groupe de version qui indiquent clairement à quel ensemble de règles de consensus appartient une transaction. Comme avantage secondaire, le nouveau schéma de signature a également amélioré la rapidité de validation des transactions transparentes.

![Fonctionnement de la protection contre les replays : un wallet signe une transaction qui s'engage sur l'identifiant de branche de consensus actuel, de sorte que la transaction ne peut être rejouée sur aucune autre branche](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Expiration des transactions

[ZIP 203](https://zips.z.cash/zip-0203) a ajouté l'expiration des transactions. Une transaction peut désormais définir une hauteur de bloc d'expiration. Si elle n'a pas été minée à cette hauteur, les nœuds la retirent du mempool, la salle d'attente des transactions non confirmées. Avant cela, une transaction pouvait rester non confirmée pendant longtemps. L'expiration signifie qu'une transaction bloquée finit par se résorber d'elle-même, ce qui réduit l'incertitude pour vous et évite que le mempool se remplisse de transactions anciennes non minées.

## Où elle s'inscrit

Overwinter a été la première mise à niveau du réseau Zcash après le lancement du mainnet en octobre 2016, et elle a été déployée délibérément avant Sapling. Son rôle était l'infrastructure, pas les fonctionnalités. En installant d'abord le mécanisme de mise à niveau et l'architecture de protection contre les replays, elle a donné à chaque mise à niveau ultérieure (Sapling, Blossom, Heartwood, Canopy, NU5, et celles d'après) un chemin d'activation sûr.

![Chronologie depuis le lancement de Sprout en octobre 2016, en passant par la période 2016 à 2018 sans cadre de mise à niveau, jusqu'à Overwinter en juin 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Glossaire

| Terme | Signification en langage simple |
|---|---|
| Mise à niveau du réseau (NU) | Un changement coordonné des règles de consensus de Zcash, activé à une hauteur de bloc donnée |
| Identifiant de branche de consensus | Un identifiant court qui nomme l'ensemble actuel de règles de consensus |
| Hauteur d'activation | Le bloc auquel les nouvelles règles d'une mise à niveau du réseau prennent effet |
| Protection contre les replays | Une règle qui empêche qu'une transaction valide sur une chaîne soit réutilisée sur une autre |
| Mempool | L'ensemble des transactions qui ont été diffusées mais pas encore minées dans un bloc |
| Expiration des transactions | Une hauteur de bloc d'expiration après laquelle une transaction non minée est abandonnée |

## FAQ

Overwinter a-t-elle modifié mes ZEC ou ma confidentialité ? Non. Overwinter n'a ajouté aucune nouvelle fonctionnalité et n'a pas touché aux transactions shielded. C'était de la plomberie pour des mises à niveau futures sûres. Vos fonds et votre confidentialité n'ont pas été affectés.

Overwinter a-t-elle ajouté Sapling ou les adresses shielded ? Non. Overwinter n'a ajouté aucune fonctionnalité shielded. Elle a préparé le terrain afin que Sapling puisse être activé en toute sécurité plus tard.

Qu'est-ce qu'un identifiant de branche de consensus ? C'est une courte étiquette qui nomme l'ensemble actuel de règles. Les transactions s'y engagent lorsqu'elles sont signées, ce qui donne à Zcash sa protection contre les replays.

Pourquoi certaines sources disent-elles le 25 juin et d'autres le 26 juin ? Overwinter a été activée à 01:37 UTC le 26 juin 2018. C'est juste après minuit UTC, donc dans de nombreux fuseaux horaires occidentaux, l'heure locale indiquait encore le 25 juin. Il s'agit du même bloc et du même moment.

À quoi sert l'expiration des transactions ? Cela signifie qu'une transaction qui n'est jamais minée ne restera pas en attente pour toujours. Après sa hauteur d'expiration, les nœuds l'abandonnent, donc vous n'êtes pas laissé dans l'incertitude face à un paiement bloqué.

Dois-je faire quelque chose ? Non. Overwinter a été activée en 2018. Tout wallet ou nœud Zcash actuel suit déjà ces règles.

## Testez votre compréhension

Overwinter n'a ajouté aucune nouvelle fonctionnalité shielded. Alors pourquoi est-elle considérée comme l'une des mises à niveau les plus importantes de l'histoire de Zcash ?

<details>
<summary>Réponse</summary>

Parce qu'elle a construit le mécanisme dont chaque mise à niveau ultérieure dépend. Overwinter a introduit le mécanisme de mise à niveau du réseau et la protection bidirectionnelle contre les replays, donnant à Zcash une manière standard et sûre de modifier ses règles de consensus. Sans cette base, Sapling et les mises à niveau qui ont suivi n'auraient pas pu être activées proprement.
</details>

### Ressources

[ZIP 200 : Mécanisme de mise à niveau du réseau](https://zips.z.cash/zip-0200)

[ZIP 201 : Gestion des pairs du réseau pour Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202 : Format de transaction version 3 pour Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203 : Expiration des transactions](https://zips.z.cash/zip-0203)

[ZIP 143 : Validation des signatures de transaction pour Overwinter](https://zips.z.cash/zip-0143)

[Mise à niveau du réseau Overwinter](https://z.cash/upgrade/overwinter/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Pools shielded](../using-zcash/shielded-pools)

[Nœuds complets](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Qu'est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Sprout](../zcash-tech/sprout) · Suivant : [Sapling](../zcash-tech/sapling)
