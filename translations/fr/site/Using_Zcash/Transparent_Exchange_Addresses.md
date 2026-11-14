<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Que sont les adresses TEX Zcash ?

## En bref

* Une adresse TEX est une adresse Zcash transparente écrite dans un format différent. Elle commence par `tex1` et est définie dans la [ZIP 320](https://zips.z.cash/zip-0320).
* Elle indique une seule chose à votre portefeuille : payez cette adresse uniquement avec des fonds transparents.
* Si votre solde est protégé, un portefeuille compatible effectue deux étapes pour vous. Il transfère le montant vers une adresse transparente temporaire, puis l'envoie à l'adresse TEX.
* En 2023, Binance a demandé à la communauté Zcash un moyen de refuser les dépôts protégés et de les renvoyer. Les adresses TEX sont la réponse, et Binance est l'exchange de la liste ZecHub [Exchanges dépositaires](/using-zcash/custodial-exchanges) qui accepte les dépôts TEX.
* La prise en charge s'est aussi développée du côté de l'envoi : Coinbase permet à ses utilisateurs d'envoyer des ZEC vers des adresses TEX, et les boîtes à outils de portefeuilles ajoutent progressivement la prise en charge de la ZIP 320.
* Un paiement vers une adresse TEX est public sur la blockchain, comme tout paiement transparent. Le reste de votre solde protégé demeure privé.

## Explication principale

Une adresse TEX Zcash est un type particulier d'adresse de réception. TEX signifie « Transparent Exchange ». Il s'agit d'un réencodage en Bech32m d'une seule adresse transparente p2pkh. Les adresses TEX commencent par `tex1` et constituent un type distinct des adresses unifiées.

Une adresse TEX indique à un portefeuille compatible d'effectuer une transaction exclusivement transparente (T -> T). 

La logique est la suivante : lorsqu'un portefeuille compatible détecte une adresse TEX, il la décode pour obtenir le destinataire transparent qu'elle contient. Le portefeuille envoie ensuite les fonds nécessaires à la transaction depuis le pool protégé vers une adresse transparente éphémère distincte, contrôlée par l'utilisateur (Z -> T). Il envoie ensuite ces fonds au destinataire transparent décodé de l'adresse TEX (T -> T).  

La proposition technique des adresses TEX est décrite dans la Zcash [ZIP 320](https://zips.z.cash/zip-0320), qui définit un type d'adresse destiné exclusivement à recevoir des fonds provenant d'adresses transparentes.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Dans quelle mesure les adresses TEX sont-elles utilisées ?

L'adoption reste partielle, mais elle ne se limite plus à un seul exchange. Il convient de distinguer deux rôles différents :

* **Émettre des adresses de dépôt TEX.** Binance est l'exchange de notre liste [Exchanges dépositaires](/using-zcash/custodial-exchanges) qui fournit une adresse TEX pour les dépôts, afin que les fonds arrivent d'une source transparente ([ZIP 320, Contexte](https://zips.z.cash/zip-0320#background)). La ZIP 320 ne prévoit pas que d'autres exchanges émettent des adresses TEX, sauf s'ils ont besoin de savoir de quelle adresse provient un paiement.
* **Envoyer vers des adresses TEX.** C'est ce côté qui s'est développé. En octobre 2024, Coinbase a annoncé que les utilisateurs de Coinbase.com peuvent envoyer des Zcash vers des adresses TEX ([annonce Coinbase Assets](https://x.com/CoinbaseAssets/status/1844428577921507416)). Les boîtes à outils de portefeuilles ajoutent également la prise en charge de la ZIP 320 : KeepKey a ajouté la signature des transactions TEX dans le firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), et la bibliothèque XChainJS `zcash-js` a été corrigée après avoir rejeté des destinataires `tex1` valides (voir plus bas).

Les adresses TEX ne sont donc pas universelles, mais il ne faut plus supposer que Binance est le seul endroit où elles apparaissent.

### Quand ai-je besoin d'une adresse TEX ?

#### Vous avez besoin d'une adresse TEX lorsque vous envoyez des fonds vers une adresse transparente à l'aide d'un portefeuille qui ne permet pas l'envoi direct vers une adresse transparente.

Certains portefeuilles ne permettent pas l'envoi direct vers une adresse transparente, et le destinataire peut ne pas fournir d'équivalent TEX. Il peut donc parfois être nécessaire de convertir une adresse transparente en adresse TEX. Vous pouvez le faire manuellement en exécutant l'implémentation de référence décrite dans la [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Vous avez besoin d'une adresse TEX lorsque vous envoyez des fonds vers un exchange centralisé qui exige que ces fonds proviennent d'une source transparente.

[Binance](https://www.binance.com/) est la raison d'être des adresses TEX. En novembre 2023, il a indiqué à la communauté Zcash que les ZEC pourraient être retirés de la cote à moins qu'il n'existe un moyen de refuser les dépôts provenant d'adresses protégées et de les renvoyer au déposant ([ZIP 320, Contexte](https://zips.z.cash/zip-0320#background)). La ZIP 320 ne prévoit pas que d'autres exchanges émettent des adresses TEX, sauf s'ils ont besoin de savoir de quelle adresse provient un paiement. Binance est l'exchange de notre liste [Exchanges dépositaires](/using-zcash/custodial-exchanges) qui accepte les dépôts vers une adresse TEX.
Les adresses TEX indiquent à un portefeuille compatible que tous les fonds envoyés à cette adresse doivent être transparents, et excluent l'envoi de toute valeur protégée vers cette adresse.
Si un exchange comme Binance rejette la valeur envoyée, il dispose des moyens nécessaires pour la renvoyer à l'adresse d'où elle provient. Cela aide également des entités comme Binance à se conformer aux lois et réglementations imposées par les gouvernements ou d'autres autorités.

### Quels portefeuilles prennent en charge les adresses TEX ?

Vous pouvez consulter la liste la plus à jour sur notre page [Portefeuilles](/using-zcash/wallets). Utilisez le filtre « Adresse TEX ».

## Illustration / analogie

Imaginez votre solde protégé comme de l'argent rangé dans un coffre-fort fermé à clé chez vous. Personne à l'extérieur ne peut voir combien il contient.

Un exchange comme Binance a un panneau sur son comptoir : paiements acceptés uniquement dans une enveloppe transparente, afin que le caissier puisse voir d'où vient l'argent et le rendre si nécessaire. L'adresse TEX est ce panneau.

Lorsque votre portefeuille voit le panneau, il sort le montant du coffre-fort, le place dans une enveloppe transparente portant votre adresse de retour (l'adresse transparente temporaire) et apporte l'enveloppe au comptoir. Le coffre-fort reste fermé, et personne ne sait ce qu'il contient d'autre.

## Analyse approfondie

### Comment une adresse TEX est construite

Une adresse transparente normale commençant par `t1` contient un hachage de clé de 20 octets, écrit en Base58Check. Une adresse TEX contient les mêmes 20 octets, réencodés en Bech32m avec le préfixe `tex` (`textest` sur le testnet). Convertir l'une en l'autre ne demande que quelques lignes de code, que la ZIP 320 présente dans son implémentation de référence.

Cette conception simple était une exigence de Binance : la conversion devait pouvoir s'exécuter avec uniquement des bibliothèques Base58Check et Bech32m dans le code front-end de l'exchange. Une version antérieure de la ZIP 320 intégrait l'idée aux adresses unifiées, et cette version a été abandonnée pour cette raison.

Les adresses TEX empruntent l'encodage Bech32m au format des adresses unifiées, mais n'en conservent presque aucune structure. Si vous découvrez Bech32m et la manière dont les adresses Zcash sont validées, la page [Adresses unifiées](/using-zcash/unified-addresses) présente les bases dans le cadre de la [ZIP 316](https://zips.z.cash/zip-0316). Une adresse TEX diffère d'une adresse unifiée sur quatre points concrets :

| | Adresse unifiée (ZIP 316) | Adresse TEX (ZIP 320) |
|---|---|---|
| Ce qu'elle contient | plusieurs destinataires regroupés | un seul destinataire transparent P2PKH |
| Préfixe lisible par l'humain (HRP) | `u` (mainnet) | `tex` (`textest` sur le testnet) |
| Brouillage F4Jumble | oui | non |
| Codes de type pour chaque destinataire | oui | non |

En résumé, une adresse TEX est l'enveloppe Bech32m la plus simple possible : un hachage de clé transparent, un préfixe `tex`, et rien d'autre.

### Règles de traitement pour les portefeuilles et les intégrateurs

C'est la partie que les implémentations ont mal réalisée, il vaut donc la peine de l'énoncer clairement. Lorsqu'il détecte une adresse TEX, un portefeuille ou un intégrateur **ne doit pas dépenser directement depuis le pool protégé vers la destination TEX.** La ZIP 320 exige que toutes les entrées d'un paiement TEX soient transparentes ; le paiement est donc construit en deux étapes :

1. **Déprotéger.** Transférer le montant du pool protégé vers une nouvelle adresse transparente éphémère, contrôlée par l'utilisateur et appartenant au portefeuille (Z -> T).
2. **Envoyer de transparent à transparent.** Dépenser cette sortie éphémère vers le destinataire P2PKH décodé contenu dans l'adresse TEX (T -> T).

Quelques règles, toutes issues de la ZIP 320, assurent la sécurité de ce processus :

* L'adresse éphémère doit être dérivée de votre phrase de récupération, afin que, si l'exchange renvoie les fonds, votre portefeuille puisse toujours les retrouver et les dépenser.
* Une nouvelle adresse éphémère doit être utilisée à chaque fois, afin que des paiements distincts ne puissent pas être reliés entre eux.
* La seconde transaction ne doit dépenser que des entrées transparentes, afin que l'exchange voie un dépôt propre de transparent à transparent.

La conversion et le processus en deux étapes sont présentés dans l'[implémentation de référence de la ZIP 320](https://zips.z.cash/zip-0320#reference-implementation). Une erreur à ce niveau est un problème réel et récent : en octobre 2026, la bibliothèque XChainJS `zcash-js` rejetait des destinataires `tex1` valides avec l'erreur « Invalid 'to' address », car son validateur n'acceptait que la forme Base58Check `t1`, ce qui empêchait les dépôts de ZEC vers les services publiant une adresse `tex1` ([ticket #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Le problème a été corrigé en faisant accepter au validateur l'encodage de la ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Ce que révèle un envoi TEX

Un paiement TEX est un paiement transparent, il est donc public, mais il convient d'être précis sur ce qu'un observateur peut et ne peut pas voir.

Ce qui est **visible** on-chain :

* L'adresse transparente éphémère, puisqu'elle apparaît comme sortie de l'étape de déprotection et comme entrée de l'envoi final.
* Les deux montants : la valeur qui a quitté le pool protégé lors de l'étape Z -> T, et la valeur livrée lors de l'étape T -> T.
* Le destinataire transparent de l'exchange, c'est-à-dire l'adresse P2PKH encodée dans l'adresse TEX.

Ce qui reste **caché** :

* Le reste de votre solde protégé, ainsi que les notes protégées précises qui ont financé le paiement. L'étape de déprotection révèle qu'*une certaine* valeur a quitté le pool vers l'adresse éphémère, mais pas d'où elle provenait à l'intérieur du pool.

Un observateur peut donc relier l'adresse éphémère au paiement à l'exchange (mêmes fonds, de transparent à transparent) et voir qu'elle a été alimentée par un retrait protégé. Il ne peut pas la relier à vos autres fonds ou activités protégés. Rien on-chain ne marque réellement le paiement comme un envoi « TEX » : comme le souligne la ZIP 320, un paiement vers une adresse TEX est impossible à distinguer d'un paiement vers l'adresse `t1` correspondante, car les règles de consensus restent inchangées et la règle tout entière réside dans le portefeuille.

![Empreinte on-chain d'un envoi TEX : les fonds quittent le pool protégé vers une adresse transparente éphémère, puis passent de transparent à transparent jusqu'à l'exchange ; l'adresse éphémère, les deux montants et l'adresse de l'exchange sont visibles, tandis que le reste du solde protégé reste caché](/content-images/tex-onchain-footprint.webp)

### Ce que montre la blockchain

La règle TEX réside dans les portefeuilles. Les nœuds ne la vérifient pas, les règles de consensus restent donc les mêmes. On-chain, un paiement vers une adresse TEX est identique à un paiement vers l'adresse `t1` correspondante. Le montant, l'adresse éphémère et l'adresse de l'exchange sont publics, comme pour toute transaction transparente.

## Pages connexes

- [Adresses unifiées](/using-zcash/unified-addresses) : le format d'adresse `u1` défini par la ZIP 316, et les bases de Bech32m qu'une adresse TEX réutilise.
- [Exchanges dépositaires](/using-zcash/custodial-exchanges) : quels exchanges acceptent quels types d'adresses, y compris les dépôts TEX de Binance.
- [Portefeuilles](/using-zcash/wallets) : utilisez le filtre « Adresse TEX » pour trouver les portefeuilles capables de payer une adresse TEX.
- [Pools protégés](/using-zcash/shielded-pools) : où se trouve votre solde privé avant qu'un paiement TEX n'en fasse sortir une partie.
- [Qui peut voir votre paiement Zcash](/start-here/who-can-see-your-zcash-payment) : ce qui devient visible une fois que les fonds quittent le pool protégé.
- [Ce qu'un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see) : comment un paiement transparent apparaît on-chain.
- [URI de demande de paiement Zcash](/using-zcash/payment-request-uris) : une autre norme de portefeuille pour les paiements préremplis.

**Dernière mise à jour :** octobre 2026
