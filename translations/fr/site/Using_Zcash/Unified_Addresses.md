<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Adresses unifiées

> Une seule adresse pour tout Zcash. Partagez-la, et le portefeuille de l'expéditeur trouve la manière la plus confidentielle de vous payer.

## En bref

* Une adresse unifiée (UA) est une seule adresse Zcash qui contient plusieurs récepteurs : Ironwood, Sapling et transparent.
* Sur le mainnet, les UA commencent par `u1`. La ZIP 316 les a définies, et elles sont arrivées avec la mise à niveau NU5 le 31 mai 2022.
* Le portefeuille de l'expéditeur choisit le pool le plus confidentiel que les deux portefeuilles prennent en charge. Vous n'avez jamais à choisir un pool vous-même.
* Votre UA a continué de fonctionner lorsque le pool Ironwood a été mis en service en juillet 2026. Vous n'avez pas eu besoin de partager une nouvelle adresse.
* Votre portefeuille peut créer une nouvelle UA pour chaque expéditeur, et toutes alimentent le même compte.

## Explication principale

Une adresse unifiée (UA) est une seule adresse Zcash qui regroupe plusieurs récepteurs en un. Les récepteurs sont les parties d'une adresse qui acceptent des fonds dans un pool de valeur spécifique : Ironwood, Sapling et transparent. Une UA commence par `u1` sur le mainnet et a été définie dans la [ZIP 316](https://zips.z.cash/zip-0316), introduite avec la mise à niveau du réseau NU5 le 31 mai 2022.

Avant les adresses unifiées, recevoir des ZEC obligeait à réfléchir aux types d'adresses. Une adresse `zs` recevait des fonds Sapling, une adresse `t` recevait des fonds transparents, et envoyer d'un type à l'autre demandait des étapes supplémentaires. Une UA met fin à tout cela. Vous partagez une seule adresse, et les portefeuilles s'occupent du reste.

### Comment ça fonctionne

Lorsque quelqu'un envoie des fonds à votre UA, son portefeuille lit les récepteurs qu'elle contient et choisit le pool le plus confidentiel que les deux portefeuilles prennent en charge :

1. Si les deux portefeuilles prennent en charge le pool protégé actuel, le paiement arrive protégé. Rien de public n'apparaît sur la chaîne.
2. Si l'expéditeur ne peut envoyer que depuis un pool plus ancien, le portefeuille se rabat sur le meilleur récepteur que vous avez en commun, comme Sapling.
3. Si l'expéditeur ne peut envoyer que des fonds transparents, le paiement arrive sur le récepteur transparent de votre UA, et votre portefeuille peut ensuite le protéger.

Vous n'avez jamais à gérer cela vous-même. L'adresse reste la même ; l'acheminement se fait à l'intérieur.

### Pourquoi c'est important aujourd'hui

Zcash continue d'évoluer. Lorsque le pool Ironwood a été activé avec NU6.3 le 28 juillet 2026, les détenteurs d'une UA n'ont pas eu besoin d'une nouvelle adresse : les portefeuilles ont simplement commencé à choisir le récepteur Ironwood à l'intérieur des adresses qu'ils possédaient déjà. Les utilisateurs qui détenaient d'anciennes adresses autonomes ont dû migrer. Les détenteurs d'une UA n'ont rien eu à faire.

C'est l'objectif de sa conception. De nouveaux pools arrivent avec les futures mises à niveau du réseau, et une adresse unifiée les intègre sans que personne n'ait à repartager d'adresse ni à déplacer des fonds manuellement. Consultez la page [Zcash pools de valeur](/using-zcash/shielded-pools) pour connaître la liste actuelle des pools.

### Une nouvelle adresse pour chaque expéditeur

Les portefeuilles peuvent générer de nombreuses adresses unifiées diversifiées pour un même compte. Chacune alimente les mêmes fonds, mais aucune d'entre elles ne peut être reliée à une autre on-chain. Donnez une UA différente à chaque personne ou service qui vous paie, et aucun d'entre eux ne pourra comparer les adresses pour découvrir qu'ils paient le même portefeuille.

## Illustration / analogie

Imaginez une porte d'entrée dotée de trois fentes pour le courrier. La plus récente fait tomber les lettres dans un coffre-fort verrouillé (Ironwood). La deuxième les fait tomber dans un tiroir verrouillé (Sapling). La troisième les dépose sur un plateau ouvert que n'importe qui peut lire à travers la fenêtre (transparent).

Le facteur, c'est le portefeuille de l'expéditeur. Il utilise la fente la plus confidentielle par laquelle il peut passer. Vous donnez une seule adresse pour la porte, et lorsque la maison reçoit un nouveau coffre-fort, l'adresse sur la porte reste la même.

## Approfondissement

### Outils associés

- **Clés pour lecture seule.** Chaque compte possède des clés pour lecture seule unifiées qui permettent de partager ce qu'une UA reçoit (ou tout ce qu'elle envoie) sans partager le droit de dépense. Préfixes `uview` et `uivk`. Consultez la page [clés pour lecture seule](/zcash-tech/viewing-keys).
- **Adresses TEX.** Certains exchanges, actuellement Binance, exigent que les dépôts proviennent d'une source transparente. Une adresse TEX ([ZIP 320](https://zips.z.cash/zip-0320)) est une adresse uniquement transparente associée à votre UA, conçue précisément pour ce cas. Consultez la page [adresses d'exchange transparentes](/using-zcash/transparent-exchange-addresses).
- **Demandes de paiement.** Une UA peut être intégrée dans une URI de demande de paiement avec un montant et un mémo préremplis. Consultez la page [URI de demande de paiement](/using-zcash/payment-request-uris).

### En bref

| | |
|---|---|
| Préfixe | `u1` (mainnet) |
| Encodage | bech32m |
| Défini dans | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introduit | NU5, 31 mai 2022 |
| Contient | Récepteurs Ironwood, Sapling et transparent |
| Clé de dépense | Une par compte, partagée par toutes ses UA |

Vérifiez quels portefeuilles prennent en charge les adresses unifiées sur la page [portefeuilles](/wallets).

## Erreurs courantes

- **Partager une ancienne adresse `zs` ou `t`.** Une adresse autonome n'atteint qu'un seul pool et ne prend pas en charge les nouveaux. Partagez votre UA.
- **Donner la même UA à tout le monde.** Deux personnes qui vous paient peuvent comparer leurs informations et constater qu'il s'agit de la même adresse. Donnez à chaque expéditeur une nouvelle UA générée par votre portefeuille.
- **S'attendre à ce que chaque paiement vers une UA soit confidentiel.** Un expéditeur qui ne peut envoyer que des fonds transparents paie sur votre récepteur transparent, et ce paiement est public. Protégez-le ensuite depuis votre portefeuille.

## Pages associées

- [Pools protégés](/using-zcash/shielded-pools) : les pools de valeur derrière chaque récepteur d'une UA.
- [Adresses unifiées (technique)](/zcash-tech/unified-addresses) : comment la ZIP 316 construit et encode une UA.
- [Clés pour lecture seule](/zcash-tech/viewing-keys) : partagez ce qu'une UA reçoit sans partager le droit de dépense.
- [Adresses d'exchange transparentes](/using-zcash/transparent-exchange-addresses) : le format TEX pour les exchanges qui exigent une source transparente.
- [URI de demande de paiement](/using-zcash/payment-request-uris) : une UA avec le montant et le mémo préremplis.
- [Portefeuilles](/using-zcash/wallets) : quels portefeuilles créent des adresses unifiées et effectuent des paiements vers celles-ci.
- [Exchanges non dépositaires](/using-zcash/non-custodial-exchanges) : ce qu'il faut vérifier lorsqu'un échange verse des ZEC sur votre portefeuille.
- [Qui peut voir votre paiement Zcash](/start-here/who-can-see-your-zcash-payment) : ce qui reste visible lorsqu'un paiement utilise chaque récepteur.

**Dernière mise à jour :** octobre 2026
