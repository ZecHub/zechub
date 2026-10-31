<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Que sont les adresses TEX de Zcash ?

## TL;DR

* Une adresse TEX est une adresse Zcash transparente écrite dans un format différent. Elle commence par `tex1` et est définie dans [ZIP 320](https://zips.z.cash/zip-0320).
* Elle indique une chose à votre wallet : ne payez cette adresse qu’avec des fonds transparents.
* Si votre solde est blindé, un wallet compatible effectue deux étapes pour vous. Il déplace le montant vers une adresse transparente temporaire, puis l’envoie à l’adresse TEX.
* En 2023, Binance a demandé à la communauté Zcash un moyen de refuser les dépôts blindés et de les renvoyer. Les adresses TEX sont la réponse, et Binance est l’exchange de la liste ZecHub [Exchanges centralisés](/using-zcash/custodial-exchanges) qui accepte les dépôts TEX.
* La prise en charge s’est également développée du côté de l’envoi : Coinbase permet à ses utilisateurs d’envoyer des ZEC à des adresses TEX, et les boîtes à outils pour wallets ont ajouté la prise en charge de ZIP 320.
* Un paiement vers une adresse TEX est public sur la blockchain, comme tout paiement transparent. Le reste de votre solde blindé reste privé.

## Explication principale

Une adresse TEX Zcash est un type spécial d’adresse de réception. TEX signifie « Transparent Exchange ». Il s’agit d’un réencodage Bech32m d’une seule adresse transparente p2pkh. Les adresses TEX commencent par `tex1` et constituent un type distinct des Unified Addresses.

Une adresse TEX indique à un wallet compatible d’effectuer une transaction Transparent-Only (T -> T). 

La logique est la suivante : lorsqu’un wallet compatible détecte une adresse TEX, il la décode afin d’obtenir le récepteur transparent qu’elle contient. Le wallet envoie ensuite les fonds requis pour la transaction depuis le pool blindé vers une adresse transparente éphémère distincte, contrôlée par l’utilisateur (Z -> T). Il envoie alors ces fonds au récepteur transparent décodé de l’adresse TEX (T -> T).  

La proposition technique pour les adresses TEX est décrite dans Zcash [ZIP 320](https://zips.z.cash/zip-0320), qui définit un type d’adresse exclusivement destiné à recevoir des fonds depuis des adresses transparentes.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Dans quelle mesure les adresses TEX sont-elles utilisées ?

L’adoption reste partielle, mais elle ne se limite plus à un seul exchange. Il convient de distinguer deux rôles :

* **Émission d’adresses de dépôt TEX.** Binance est l’exchange de notre liste [Exchanges centralisés](/using-zcash/custodial-exchanges) qui fournit une adresse TEX pour les dépôts, afin que les fonds arrivent depuis une source transparente ([ZIP 320, Contexte](https://zips.z.cash/zip-0320#background)). ZIP 320 ne prévoit pas que d’autres exchanges émettent des adresses TEX, sauf s’ils doivent savoir de quelle adresse provient un paiement.
* **Envoi vers des adresses TEX.** C’est le côté qui s’est développé. En octobre 2024, Coinbase a annoncé que les utilisateurs de Coinbase.com peuvent envoyer des Zcash à des adresses TEX ([annonce de Coinbase Assets](https://x.com/CoinbaseAssets/status/1844428577921507416)). Les boîtes à outils pour wallets ont également ajouté la prise en charge de ZIP 320 : KeepKey a ajouté la signature des transactions TEX dans le firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), et la bibliothèque XChainJS `zcash-js` a été corrigée après avoir rejeté des destinataires `tex1` valides (plus d’informations ci-dessous).

Les adresses TEX ne sont donc pas universelles, mais un lecteur ne doit plus supposer que Binance est le seul endroit où elles apparaissent.

### Quand ai-je besoin d’une adresse TEX ?

#### Vous avez besoin d’une adresse TEX lorsque vous envoyez des fonds vers une adresse transparente avec un wallet qui ne permet pas l’envoi direct vers une adresse transparente.

Certains wallets ne permettent pas d’envoyer directement vers une adresse transparente, et le destinataire peut ne pas fournir d’équivalent TEX. Il peut donc parfois être nécessaire de convertir une adresse transparente en adresse TEX. Cela peut être effectué manuellement en exécutant l’implémentation de référence décrite dans [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Vous avez besoin d’une adresse TEX lorsque vous envoyez des fonds vers un exchange centralisé qui exige que ces fonds proviennent d’une source transparente.

[Binance](https://www.binance.com/) est la raison pour laquelle les adresses TEX existent. En novembre 2023, il a indiqué à la communauté Zcash que ZEC pourrait être retiré de la liste à moins qu’il n’existe un moyen de refuser les dépôts provenant d’adresses blindées et de les renvoyer au déposant ([ZIP 320, Contexte](https://zips.z.cash/zip-0320#background)). ZIP 320 ne prévoit pas que d’autres exchanges émettent des adresses TEX, sauf s’ils doivent savoir de quelle adresse provient un paiement. Binance est l’exchange de notre liste [Exchanges centralisés](/using-zcash/custodial-exchanges) qui accepte les dépôts vers une adresse TEX.
Les adresses TEX informent un wallet compatible que tous les fonds envoyés à cette adresse doivent être transparents et excluent l’envoi de toute valeur blindée à ladite adresse.
Si un exchange comme Binance rejette la valeur envoyée, il dispose des moyens nécessaires pour la renvoyer à l’adresse dont elle provient. Cela aide également des entités comme Binance à respecter les lois et réglementations imposées par les gouvernements ou d’autres autorités.

### Quels wallets prennent en charge les adresses TEX ?

Vous pouvez consulter la liste la plus à jour sur notre page [wallets](/using-zcash/wallets). Utilisez le filtre TEX Address.

## Visuel / Analogie

Imaginez votre solde blindé comme de l’argent dans un coffre-fort verrouillé chez vous. Personne à l’extérieur ne peut voir combien il contient.

Un exchange tel que Binance affiche une pancarte à son guichet : paiements acceptés uniquement dans une enveloppe transparente, afin que le caissier puisse voir d’où vient l’argent et le rendre si nécessaire. L’adresse TEX est cette pancarte.

Lorsque votre wallet voit la pancarte, il sort le montant du coffre-fort, le place dans une enveloppe transparente portant votre adresse de retour (l’adresse transparente temporaire), puis porte l’enveloppe au guichet. Le coffre-fort reste verrouillé, et personne ne découvre ce qu’il contient d’autre.

## Analyse approfondie

### Comment une adresse TEX est construite

Une adresse transparente normale commençant par `t1` contient un hash de clé de 20 octets, écrit en Base58Check. Une adresse TEX contient les mêmes 20 octets, réencodés en Bech32m avec le préfixe `tex` (`textest` sur testnet). La conversion de l’une à l’autre ne nécessite que quelques lignes de code, comme le montre ZIP 320 dans son implémentation de référence.

Cette conception simple était une exigence de Binance : la conversion devait fonctionner uniquement avec des bibliothèques Base58Check et Bech32m dans le code front-end de l’exchange. Une première version de ZIP 320 intégrait l’idée aux Unified Addresses, et cette version a été abandonnée pour cette raison.

Les adresses TEX empruntent l’encodage Bech32m au format Unified Address, mais n’en conservent presque aucune structure. Si vous découvrez Bech32m et la manière dont les adresses Zcash sont validées, la page [Unified Addresses](/using-zcash/unified-addresses) couvre les bases dans [ZIP 316](https://zips.z.cash/zip-0316). Une adresse TEX diffère d’une Unified Address de quatre manières concrètes :

| | Unified Address (ZIP 316) | Adresse TEX (ZIP 320) |
|---|---|---|
| Ce qu’elle contient | plusieurs récepteurs regroupés | un seul récepteur transparent P2PKH |
| Préfixe lisible par l’humain (HRP) | `u` (mainnet) | `tex` (`textest` sur testnet) |
| Obfuscation F4Jumble | oui | non |
| Typecodes pour chaque récepteur | oui | non |

En bref, une adresse TEX est l’enveloppe Bech32m la plus simple possible : un hash de clé transparente, un préfixe `tex`, et rien d’autre.

### Règles de traitement pour les wallets et les intégrateurs

C’est la partie que les implémentations ont mal gérée, il vaut donc la peine de l’énoncer clairement. Lorsqu’un wallet ou un intégrateur détecte une adresse TEX, il **ne doit pas dépenser directement depuis le pool blindé vers la destination TEX.** ZIP 320 exige que chaque entrée d’un paiement TEX soit transparente ; le paiement est donc construit en deux étapes :

1. **Déblindage.** Déplacez le montant du pool blindé vers une nouvelle adresse transparente éphémère contrôlée par l’utilisateur et détenue par le wallet (Z -> T).
2. **Envoi de transparent à transparent.** Dépensez cette sortie éphémère vers le récepteur P2PKH décodé dans l’adresse TEX (T -> T).

Quelques règles rendent cela sûr, toutes issues de ZIP 320 :

* L’adresse éphémère doit être dérivée de votre phrase de récupération, afin que votre wallet puisse toujours retrouver et dépenser les fonds si l’exchange les renvoie.
* Une nouvelle adresse éphémère doit être utilisée à chaque fois, afin que des paiements distincts ne puissent pas être liés entre eux.
* La seconde transaction ne doit dépenser que des entrées transparentes, afin que l’exchange voie un dépôt propre, de transparent à transparent.

La conversion et le flux en deux étapes sont illustrés dans l’[implémentation de référence de ZIP 320](https://zips.z.cash/zip-0320#reference-implementation). Une erreur sur ce point est un problème réel et récent : en octobre 2026, la bibliothèque XChainJS `zcash-js` a rejeté des destinataires `tex1` valides avec l’erreur « Invalid 'to' address », car son validateur n’acceptait que la forme Base58Check `t1`, ce qui empêchait les dépôts ZEC vers des services publiant une adresse `tex1` ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Le problème a été corrigé en apprenant au validateur à accepter l’encodage ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Ce qu’un envoi TEX révèle

Un paiement TEX est un paiement transparent, il est donc public, mais il est utile de préciser ce qu’un observateur peut et ne peut pas voir.

Ce qui est **visible** on-chain :

* L’adresse transparente éphémère, puisqu’elle apparaît comme sortie de l’étape de déblindage et comme entrée de l’envoi final.
* Les deux montants : la valeur qui a quitté le pool blindé lors de l’étape Z -> T, et la valeur livrée lors de l’étape T -> T.
* Le récepteur transparent de l’exchange, qui est l’adresse P2PKH encodée dans l’adresse TEX.

Ce qui reste **caché** :

* Le reste de votre solde blindé, ainsi que les notes blindées précises ayant financé le paiement. L’étape de déblindage révèle qu’une certaine valeur a quitté le pool pour l’adresse éphémère, mais pas son origine à l’intérieur du pool.

Un observateur peut donc relier l’adresse éphémère au paiement vers l’exchange (mêmes fonds, de transparent à transparent) et voir qu’elle a été approvisionnée par un retrait blindé. Il ne peut pas la relier à vos autres fonds ou activités blindés. Rien on-chain n’identifie réellement le paiement comme un envoi « TEX » : comme le note ZIP 320, un paiement vers une adresse TEX est indiscernable d’un paiement vers l’adresse `t1` correspondante, car les règles de consensus ne changent pas et toute la règle réside dans le wallet.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Ce que montre la blockchain

La règle TEX réside dans les wallets. Les nœuds ne la vérifient pas, les règles de consensus restent donc identiques. On-chain, un paiement vers une adresse TEX ressemble à un paiement vers l’adresse `t1` correspondante. Le montant, l’adresse éphémère et l’adresse de l’exchange sont publics, comme pour toute transaction transparente.

## Pages associées

- [Unified Addresses](/using-zcash/unified-addresses) : le format d’adresse `u1` défini dans ZIP 316, ainsi que les bases de Bech32m qu’une adresse TEX réutilise.
- [Exchanges centralisés](/using-zcash/custodial-exchanges) : quels exchanges acceptent quels types d’adresses, y compris les dépôts TEX de Binance.
- [Wallets](/using-zcash/wallets) : utilisez le filtre TEX Address pour trouver des wallets capables de payer une adresse TEX.
- [Pools blindés](/using-zcash/shielded-pools) : où se trouve votre solde privé avant qu’un paiement TEX n’en retire une partie.
- [Qui peut voir votre paiement Zcash ?](/start-here/who-can-see-your-zcash-payment) : ce qui devient visible une fois que les fonds quittent le pool blindé.
- [Ce qu’un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see) : comment un paiement transparent apparaît on-chain.
- [Zcash URI de demande de paiement](/using-zcash/payment-request-uris) : une autre norme de wallet pour les paiements préremplis.

**Dernière mise à jour :** octobre 2026
