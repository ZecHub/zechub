<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Adresses unifiées

> Une adresse pour tout votre Zcash. Partagez-la, et le wallet de l’expéditeur trouvera le moyen le plus privé de vous payer.

## TL;DR

* Une adresse unifiée (UA) est une adresse Zcash qui contient plusieurs récepteurs : Ironwood, Sapling et transparent.
* Les UA du mainnet commencent par `u1`. ZIP 316 les a définies, et elles sont arrivées avec la mise à niveau NU5 le 31 mai 2022.
* Le wallet de l’expéditeur choisit le pool le plus privé pris en charge par les deux wallets. Vous ne choisissez jamais vous-même un pool.
* Votre UA a continué de fonctionner lorsque le pool Ironwood a été lancé en juillet 2026. Vous n’avez pas eu besoin de partager une nouvelle adresse.
* Votre wallet peut créer une nouvelle UA pour chaque expéditeur, et toutes versent sur le même compte.

## Explication principale

Une adresse unifiée (UA) est une adresse Zcash unique qui regroupe plusieurs récepteurs en une seule. Les récepteurs sont les parties d’une adresse qui acceptent des fonds dans un pool de valeur spécifique : Ironwood, Sapling et transparent. Une UA commence par `u1` sur le mainnet et a été définie dans [ZIP 316](https://zips.z.cash/zip-0316), introduite avec la mise à niveau réseau NU5 le 31 mai 2022.

Avant les adresses unifiées, recevoir des ZEC impliquait de réfléchir aux types d’adresses. Une adresse `zs` recevait des fonds Sapling, une adresse `t` recevait des fonds transparents, et l’envoi entre les types nécessitait des étapes supplémentaires. Une UA met fin à cela. Vous partagez une adresse, et les wallets s’occupent du reste.

### Fonctionnement

Lorsque quelqu’un envoie vers votre UA, son wallet lit les récepteurs qu’elle contient et choisit le pool le plus privé pris en charge par les deux wallets :

1. Si les deux wallets prennent en charge le pool blindé actuel, le paiement arrive blindé. Rien de public ne touche la chaîne.
2. Si l’expéditeur ne peut envoyer que depuis un pool plus ancien, le wallet revient au meilleur récepteur que vous partagez tous les deux, tel que Sapling.
3. Si l’expéditeur ne peut envoyer que des fonds transparents, le paiement arrive dans le récepteur transparent de votre UA, et votre wallet peut le blinder à partir de là.

Vous ne gérez jamais cela vous-même. L’adresse reste la même ; le routage s’effectue en son sein.

### Pourquoi cela compte maintenant

Zcash continue d’évoluer. Lorsque le pool Ironwood a été activé avec NU6.3 le 28 juillet 2026, les détenteurs d’UA n’ont pas eu besoin d’une nouvelle adresse : les wallets ont simplement commencé à choisir le récepteur Ironwood dans les adresses qu’ils possédaient déjà. Les utilisateurs détenant d’anciennes adresses autonomes ont dû migrer. Les détenteurs d’UA n’ont rien eu à faire.

C’est l’objectif de cette conception. De nouveaux pools arrivent avec les futures mises à niveau du réseau, et une adresse unifiée les absorbe sans que personne n’ait à repartager des adresses ni à déplacer des fonds manuellement. Consultez les [Zcash pools de valeur](/using-zcash/shielded-pools) pour connaître la configuration actuelle des pools.

### Une nouvelle adresse pour chaque expéditeur

Les wallets peuvent générer de nombreuses adresses unifiées diversifiées pour un même compte. Chacune verse sur les mêmes fonds, mais aucune paire d’entre elles ne peut être liée on-chain. Donnez une UA différente à chaque personne ou service qui vous paie, et aucune paire ne pourra comparer les adresses afin de savoir qu’elles paient le même wallet.

## Visuel / Analogie

Imaginez une porte d’entrée avec trois fentes à courrier. La plus récente dépose les lettres dans un coffre-fort verrouillé (Ironwood). La deuxième les dépose dans un tiroir verrouillé (Sapling). La troisième les dépose sur un plateau ouvert que n’importe qui peut lire à travers la fenêtre (transparent).

Le facteur est le wallet de l’expéditeur. Il utilise la fente la plus privée dans laquelle il peut passer. Vous distribuez une adresse pour la porte et, lorsque la maison reçoit un nouveau coffre-fort, l’adresse sur la porte reste la même.

## Approfondissement

### Outils associés

- **Clés de visualisation.** Chaque compte possède des clés de visualisation unifiées qui partagent ce qu’une UA reçoit (ou tout ce qu’elle envoie) sans partager l’autorité de dépense. Préfixes `uview` et `uivk`. Consultez les [clés de visualisation](/zcash-tech/viewing-keys).
- **Adresses TEX.** Certains exchanges, actuellement Binance, exigent que les dépôts proviennent d’une source transparente. Une adresse TEX ([ZIP 320](https://zips.z.cash/zip-0320)) est un complément uniquement transparent à votre UA pour ce cas précis. Consultez les [adresses transparentes pour exchanges](/using-zcash/transparent-exchange-addresses).
- **Demandes de paiement.** Une UA peut être intégrée dans un URI de demande de paiement avec un montant et un mémo préremplis. Consultez les [URI de demande de paiement](/using-zcash/payment-request-uris).

### Faits rapides

| | |
|---|---|
| Préfixe | `u1` (mainnet) |
| Encodage | bech32m |
| Défini dans | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introduit | NU5, 31 mai 2022 |
| Contient | Des récepteurs Ironwood, Sapling et transparents |
| Clé de dépense | Une par compte, partagée par toutes ses UA |

Vérifiez quels wallets prennent en charge les adresses unifiées sur la page [wallets](/wallets).

## Erreurs courantes

- **Partager une ancienne adresse `zs` ou `t`.** Une adresse autonome n’atteint qu’un seul pool et ne prend pas en charge les nouveaux. Partagez votre UA.
- **Donner la même UA à tout le monde.** Deux personnes qui vous paient peuvent comparer leurs informations et voir la même adresse. Donnez à chaque expéditeur une nouvelle UA depuis votre wallet.
- **S’attendre à ce que chaque paiement vers une UA soit privé.** Un expéditeur qui ne peut envoyer que des fonds transparents paie vers votre récepteur transparent, et ce paiement est public. Blindez-le ensuite depuis votre wallet.

## Pages associées

- [Pools blindés](/using-zcash/shielded-pools) : les pools de valeur derrière chaque récepteur d’une UA.
- [Adresses unifiées (technique)](/zcash-tech/unified-addresses) : comment ZIP 316 construit et encode une UA.
- [Clés de visualisation](/zcash-tech/viewing-keys) : partagez ce qu’une UA reçoit sans partager l’autorité de dépense.
- [Adresses transparentes pour exchanges](/using-zcash/transparent-exchange-addresses) : le format TEX pour les exchanges qui nécessitent une source transparente.
- [URI de demande de paiement](/using-zcash/payment-request-uris) : une UA avec le montant et le mémo renseignés.
- [Wallets](/using-zcash/wallets) : quels wallets créent et paient des adresses unifiées.
- [Exchanges non custodiaux](/using-zcash/non-custodial-exchanges) : ce qu’il faut vérifier lorsqu’un swap verse des ZEC dans votre wallet.
- [Qui peut voir votre paiement Zcash](/start-here/who-can-see-your-zcash-payment) : ce qui reste visible lorsqu’un paiement utilise chaque récepteur.

**Dernière mise à jour :** octobre 2026
