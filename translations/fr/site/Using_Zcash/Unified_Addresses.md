<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Adresses unifiées

> Une seule adresse pour tout Zcash. Partagez-la, et le wallet de l'expéditeur trouvera la manière la plus privée de vous payer.

Une adresse unifiée (UA) est une adresse Zcash unique qui regroupe plusieurs récepteurs en une seule. Les récepteurs sont les parties d'une adresse qui acceptent des fonds dans un pool de valeur spécifique : Ironwood, Sapling et transparent. Une UA commence par `u1` sur le mainnet et a été définie dans [ZIP 316](https://zips.z.cash/zip-0316), introduite avec la mise à niveau du réseau NU5 le 31 mai 2022.

Avant les adresses unifiées, recevoir des ZEC impliquait de réfléchir aux types d'adresses. Une adresse `zs` recevait des fonds Sapling, une adresse `t` recevait des fonds transparents, et l'envoi entre les types nécessitait des étapes supplémentaires. Une UA met fin à cela. Vous partagez une seule adresse, et les wallets s'occupent du reste.

## Fonctionnement

Lorsqu'une personne envoie des fonds à votre UA, son wallet lit les récepteurs qu'elle contient et choisit le pool le plus privé pris en charge par les deux wallets :

1. Si les deux wallets prennent en charge le pool blindé actuel, le paiement arrive de manière blindée. Rien de public ne touche la chaîne.
2. Si l'expéditeur ne peut envoyer que depuis un pool plus ancien, le wallet se rabat sur le meilleur récepteur que vous partagez tous les deux, tel que Sapling.
3. Si l'expéditeur ne peut envoyer que des fonds transparents, le paiement arrive dans le récepteur transparent de votre UA, et votre wallet peut ensuite le blinder.

Vous n'avez jamais à gérer cela vous-même. L'adresse reste la même ; le routage s'effectue à l'intérieur.

## Pourquoi cela compte maintenant

Zcash continue d'évoluer. Lorsque le pool Ironwood a été activé avec NU6.3 le 28 juillet 2026, les détenteurs d'UA n'ont pas eu besoin d'une nouvelle adresse : les wallets ont simplement commencé à sélectionner le récepteur Ironwood dans les adresses que les personnes possédaient déjà. Les utilisateurs détenant d'anciennes adresses autonomes ont dû migrer. Les détenteurs d'UA n'ont rien fait.

C'est l'objectif de cette conception. De nouveaux pools arrivent avec les futures mises à niveau du réseau, et une adresse unifiée les absorbe sans que personne n'ait à repartager ses adresses ni à déplacer manuellement ses fonds. Consultez les [pools de valeurZcash](/using-zcash/shielded-pools) pour connaître la liste actuelle des pools.

## Une nouvelle adresse pour chaque expéditeur

Les wallets peuvent générer de nombreuses adresses unifiées diversifiées pour un même compte. Chacune alimente les mêmes fonds, mais aucune paire d'entre elles ne peut être liée sur la chaîne. Donnez une UA différente à chaque personne ou service qui vous paie, et aucun d'entre eux ne pourra comparer les adresses pour savoir qu'ils paient le même wallet.

## Outils associés

- **Clés de visualisation.** Chaque compte possède des clés de visualisation unifiées qui partagent ce qu'une UA reçoit (ou tout ce qu'elle envoie) sans partager l'autorité de dépense. Préfixes `uview` et `uivk`. Consultez les [clés de visualisation](/zcash-tech/viewing-keys).
- **Adresses TEX.** Certaines plateformes d'échange, actuellement Binance, exigent que les dépôts arrivent depuis une source transparente. Une adresse TEX ([ZIP 320](https://zips.z.cash/zip-0320)) est un complément uniquement transparent à votre UA, précisément pour ce cas. Consultez les [adresses transparentes pour les plateformes d'échange](/using-zcash/transparent-exchange-addresses).
- **Demandes de paiement.** Une UA peut être intégrée dans un URI de demande de paiement avec un montant et un mémo préremplis. Consultez les [URI de demande de paiement](/using-zcash/payment-request-uris).

## Faits rapides

| | |
|---|---|
| Préfixe | `u1` (mainnet) |
| Encodage | bech32m |
| Défini dans | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introduit | NU5, 31 mai 2022 |
| Contient | Des récepteurs Ironwood, Sapling et transparents |
| Clé de dépense | Une par compte, partagée par toutes ses UA |

Vérifiez quels wallets prennent en charge les adresses unifiées sur la page [wallets](/wallets).
