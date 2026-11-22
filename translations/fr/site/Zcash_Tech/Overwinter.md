<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Overwinter

> Overwinter a été activé sur le mainnet de Zcash au bloc 347 500 (26 juin 2018 UTC).

Ce que vous allez retenir : comment Zcash a appris à modifier ses propres règles en toute sécurité, et pourquoi ces fondations ont rendu possible chaque mise à niveau ultérieure, à commencer par Sapling.

Overwinter est une Zcash [mise à niveau du réseau](../start-here/network-upgrades), la première depuis le lancement du réseau. Elle est définie dans plusieurs propositions d'amélioration de Zcash : [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) et [ZIP 143](https://zips.z.cash/zip-0143). Overwinter n'a ajouté aucune nouvelle fonctionnalité protégée. Elle a plutôt renforcé le protocole afin que les futures mises à niveau puissent être déployées en toute sécurité. La mise à niveau est documentée par [Electric Coin Company](../zcash-organizations/electric-coin-company) sur la page officielle de mise à niveau de Zcash.

Pourquoi c'est important. Modifier les règles d'une blockchain en fonctionnement est risqué. En cas d'erreur, deux versions du réseau peuvent être en désaccord, ou une transaction destinée à une chaîne peut être copiée sur une autre. Avant Overwinter, Zcash ne disposait d'aucun moyen standard et protégé contre la rejouabilité pour coordonner un changement de règles. Overwinter a corrigé cela. Elle a doté Zcash d'un processus formel de mise à niveau et, tout aussi important, d'une protection bidirectionnelle contre la rejouabilité, de sorte qu'une transaction valide selon un ensemble de règles ne puisse pas être rejouée selon un autre. Ce sont ces fondations qui ont permis d'activer proprement Sapling, ainsi que chaque mise à niveau suivante.

![Avant et après Overwinter : avant, aucun mécanisme de mise à niveau standard ni protection contre le rejeu. Après, un mécanisme de mise à niveau du réseau avec une protection bidirectionnelle contre le rejeu et des mises à niveau futures sûres](/content-images/overwinter-before-after-acf4f5d283.webp)

## Le mécanisme de mise à niveau

Overwinter a introduit le mécanisme de mise à niveau du réseau, défini dans [ZIP 200](https://zips.z.cash/zip-0200). Chaque mise à niveau définit désormais deux éléments : un identifiant de branche de consensus, qui nomme l'ensemble de règles en vigueur, et une hauteur d'activation, c'est-à-dire le bloc à partir duquel les nouvelles règles s'appliquent. Cela laisse à toute personne exécutant un logiciel Zcash une fenêtre claire pour se mettre à jour avant la bascule.

Overwinter elle-même a été activée sur le mainnet au bloc 347 500.

[ZIP 201](https://zips.z.cash/zip-0201) régit la manière dont les nœuds se comportent les uns envers les autres autour d'une mise à niveau. Avant l'activation, les nœuds préfèrent se connecter à des pairs exécutant la même version. Au moment de l'activation, un nœud se déconnecte des pairs qui se trouvent sur une branche de consensus différente, de sorte que le réseau se sépare proprement selon les nouvelles règles au lieu de sombrer dans la confusion.

## Protection contre la rejouabilité

Une attaque par rejeu consiste à prendre une transaction valide sur une chaîne et à la rediffuser sur une autre. Overwinter ferme cette porte grâce à un nouveau schéma de signature, défini dans [ZIP 143](https://zips.z.cash/zip-0143). Lorsqu'un portefeuille signe une transaction, la signature s'engage désormais sur l'identifiant de branche de consensus de la chaîne en cours. Une transaction signée pour une branche n'est tout simplement pas valide sur une autre branche, dans un sens comme dans l'autre. C'est ce que signifie la protection bidirectionnelle contre la rejouabilité.

Cela fonctionne de pair avec le nouveau format de transaction version 3 issu de [ZIP 202](https://zips.z.cash/zip-0202), parfois appelé format Overwintered. Il ajoute un indicateur fOverwintered et un identifiant de groupe de versions qui indiquent clairement à quel ensemble de règles de consensus appartient une transaction. Avantage supplémentaire, le nouveau schéma de signature a également accéléré la validation des transactions transparentes.

![Fonctionnement de la protection contre le rejeu : un portefeuille signe une transaction qui s'engage sur l'identifiant de la branche de consensus actuelle, de sorte que la transaction ne peut être rejouée sur aucune autre branche](/content-images/overwinter-replay-flow-754ec8578a.webp)

## Expiration des transactions

[ZIP 203](https://zips.z.cash/zip-0203) a ajouté l'expiration des transactions. Une transaction peut désormais définir une hauteur de bloc d'expiration. Si elle n'a pas été minée à cette hauteur, les nœuds la retirent du mempool, la salle d'attente des transactions non confirmées. Auparavant, une transaction pouvait rester non confirmée pendant longtemps. Grâce à l'expiration, une transaction bloquée finit par disparaître d'elle-même, ce qui réduit l'incertitude pour vous et évite que le mempool ne se remplisse d'anciennes transactions non minées.

## Sa place dans l'histoire

Overwinter a été la première mise à niveau du réseau de Zcash après le lancement du mainnet en octobre 2016, et elle a été délibérément déployée avant Sapling. Son rôle portait sur l'infrastructure, pas sur les fonctionnalités. En installant d'abord le mécanisme de mise à niveau et le dispositif de protection contre la rejouabilité, elle a offert à chaque mise à niveau ultérieure (Sapling, Blossom, Heartwood, Canopy, NU5 et les suivantes) une voie d'activation sûre.

![Chronologie du lancement de Sprout en octobre 2016 à Overwinter en juin 2018, en passant par la période de 2016 à 2018 sans cadre de mise à niveau](/content-images/overwinter-timeline-689d9bcf20.webp)

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| Network upgrade (NU) | Une modification coordonnée des règles de consensus de Zcash, activée à une hauteur de bloc déterminée |
| Consensus branch id | Un court identifiant qui nomme l'ensemble de règles de consensus en vigueur |
| Activation height | Le bloc à partir duquel les nouvelles règles d'une mise à niveau du réseau s'appliquent |
| Replay protection | Une règle qui empêche une transaction valide sur une chaîne d'être réutilisée sur une autre |
| Mempool | L'ensemble des transactions diffusées mais pas encore minées dans un bloc |
| Transaction expiry | Une hauteur de bloc d'expiration au-delà de laquelle une transaction non minée est abandonnée |

## FAQ

Overwinter a-t-elle modifié mes ZEC ou ma confidentialité ? Non. Overwinter n'a ajouté aucune nouvelle fonctionnalité et n'a pas touché aux transactions protégées. Il s'agissait de la tuyauterie nécessaire à des mises à niveau futures sûres. Vos fonds et votre confidentialité n'ont pas été affectés.

Overwinter a-t-elle ajouté Sapling ou les adresses protégées ? Non. Overwinter n'a ajouté aucune fonctionnalité protégée. Elle a préparé le terrain pour que Sapling puisse être activée en toute sécurité par la suite.

Qu'est-ce qu'un identifiant de branche de consensus ? C'est une courte étiquette qui nomme l'ensemble de règles en vigueur. Les transactions s'engagent sur cet identifiant lors de leur signature, ce qui confère à Zcash sa protection contre la rejouabilité.

Pourquoi certaines sources indiquent-elles le 25 juin et d'autres le 26 juin ? Overwinter a été activée à 01 h 37 UTC le 26 juin 2018. C'était juste après minuit UTC, donc dans de nombreux fuseaux horaires occidentaux, l'heure locale indiquait encore le 25 juin. Il s'agit du même bloc et du même moment.

À quoi sert l'expiration des transactions ? Elle garantit qu'une transaction qui n'est jamais minée ne traîne pas indéfiniment. Une fois sa hauteur d'expiration atteinte, les nœuds l'abandonnent, de sorte que vous ne restez pas dans l'incertitude au sujet d'un paiement bloqué.

Dois-je faire quelque chose ? Non. Overwinter a été activée en 2018. Tout portefeuille ou nœud Zcash actuel suit déjà ces règles.

## Testez vos connaissances

Overwinter n'a ajouté aucune nouvelle fonctionnalité protégée. Pourquoi est-elle alors considérée comme l'une des mises à niveau les plus importantes de l'histoire de Zcash ?

<details>
<summary>Réponse</summary>

Parce qu'elle a construit le mécanisme dont dépend chaque mise à niveau ultérieure. Overwinter a introduit le mécanisme de mise à niveau du réseau et la protection bidirectionnelle contre la rejouabilité, offrant à Zcash un moyen standard et sûr de modifier ses règles de consensus. Sans ces fondations, Sapling et les mises à niveau suivantes n'auraient pas pu être activées proprement.
</details>

### Ressources

[ZIP 200 : mécanisme de mise à niveau du réseau](https://zips.z.cash/zip-0200)

[ZIP 201 : gestion des pairs du réseau pour Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202 : format de transaction version 3 pour Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203 : expiration des transactions](https://zips.z.cash/zip-0203)

[ZIP 143 : validation de la signature des transactions pour Overwinter](https://zips.z.cash/zip-0143)

[Mise à niveau du réseau Overwinter](https://z.cash/upgrade/overwinter/)

### Voir aussi

[Mises à niveau du réseau Zcash](../start-here/network-upgrades)

[Pools protégés](../using-zcash/shielded-pools)

[Nœuds complets](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Qu'est-ce que ZEC et Zcash](../start-here/what-is-zec-and-zcash)

---

Série : [Index des mises à niveau du réseau](../start-here/network-upgrades) · Précédent : [Sprout](../zcash-tech/sprout) · Suivant : [Sapling](../zcash-tech/sapling)
