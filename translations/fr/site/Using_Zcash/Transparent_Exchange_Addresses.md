<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Que sont les adresses TEX de Zcash ?

## En bref

* Une adresse TEX est une adresse Zcash transparente écrite dans un format différent. Elle commence par `tex1` et est définie dans [ZIP 320](https://zips.z.cash/zip-0320).
* Elle indique une chose à votre wallet : ne payer cette adresse qu’avec des fonds transparents.
* Si votre solde est blindé, un wallet compatible effectue deux étapes pour vous. Il déplace le montant vers une adresse transparente temporaire, puis l’envoie à l’adresse TEX.
* En 2023, Binance a demandé à la communauté Zcash un moyen de refuser les dépôts blindés et de les renvoyer. Les adresses TEX sont la réponse, et Binance est l’exchange de la liste ZecHub [Exchanges centralisés](/using-zcash/custodial-exchanges) qui accepte les dépôts TEX.
* Un paiement vers une adresse TEX est public sur la blockchain, comme tout paiement transparent. Le reste de votre solde blindé reste privé.

## Explication essentielle

Une adresse TEX Zcash est un type particulier d’adresse de réception. TEX signifie « Transparent Exchange ». Il s’agit d’un réencodage Bech32m d’une seule adresse transparente p2pkh. Les adresses TEX commencent par `tex1` et constituent un type distinct des Unified Addresses.

Une adresse TEX indique à un wallet compatible d’effectuer une transaction Transparent-Only (T -> T). 

La logique est la suivante : lorsqu’un wallet compatible détecte une adresse TEX, il la décode afin d’obtenir le récepteur transparent qu’elle contient. Le wallet envoie alors les fonds requis pour la transaction depuis le pool blindé vers une adresse transparente éphémère distincte contrôlée par l’utilisateur (Z -> T). Il envoie ensuite ces fonds au récepteur transparent décodé de l’adresse TEX (T -> T).  

La proposition technique relative aux adresses TEX est décrite dans Zcash [ZIP 320](https://zips.z.cash/zip-0320), qui définit un type d’adresse exclusivement destiné à recevoir des fonds provenant d’adresses transparentes.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

Les adresses TEX ne sont pas encore largement adoptées. Les utilisateurs de Zcash pourraient devoir les utiliser à terme.

### Quand ai-je besoin d’une adresse TEX ?

#### Vous avez besoin d’une adresse TEX lorsque vous envoyez des fonds vers une adresse transparente avec un wallet qui ne prend pas en charge l’envoi direct vers une adresse transparente.

Certains wallets ne permettent pas d’envoyer directement vers une adresse transparente, et le destinataire peut ne pas fournir d’équivalent TEX. Il peut donc parfois être nécessaire de convertir une adresse transparente en adresse TEX. Cela peut être réalisé manuellement en exécutant l’implémentation de référence décrite dans [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Vous avez besoin d’une adresse TEX lorsque vous envoyez des fonds vers un exchange centralisé qui exige que ces fonds proviennent d’une source transparente.

[Binance](https://www.binance.com/) est la raison pour laquelle les adresses TEX existent. En novembre 2023, il a indiqué à la communauté Zcash que ZEC pourrait être retiré de la cote s’il n’existait pas de moyen de refuser les dépôts provenant d’adresses blindées et de les renvoyer au déposant ([ZIP 320, Contexte](https://zips.z.cash/zip-0320#background)). ZIP 320 ne prévoit pas que d’autres exchanges émettent des adresses TEX, sauf s’ils doivent savoir de quelle adresse provient un paiement. Binance est l’exchange de notre liste [Exchanges centralisés](/using-zcash/custodial-exchanges) qui accepte les dépôts vers une adresse TEX.
Les adresses TEX informent un wallet compatible que tous les fonds envoyés à cette adresse doivent être transparents et excluent toute valeur blindée de l’envoi vers cette adresse.
Si un exchange comme Binance refuse la valeur envoyée, il dispose des moyens nécessaires pour renvoyer cette valeur à l’adresse dont elle provient. Cela aide également des entités comme Binance à respecter les lois et réglementations imposées par les gouvernements ou d’autres autorités.

### Quels wallets prennent en charge les adresses TEX ?

Vous pouvez consulter la liste la plus à jour sur notre page [wallets](/using-zcash/wallets). Utilisez le filtre TEX Address.

## Visuel / Analogie

Imaginez votre solde blindé comme de l’argent dans un coffre-fort verrouillé à la maison. Personne à l’extérieur ne peut voir ce qu’il contient.

Un exchange comme Binance affiche un panneau à son guichet : paiements acceptés uniquement dans une enveloppe transparente, afin que le caissier puisse voir d’où vient l’argent et le renvoyer si nécessaire. L’adresse TEX est ce panneau.

Lorsque votre wallet voit le panneau, il retire le montant du coffre-fort, le place dans une enveloppe transparente portant votre adresse de retour (l’adresse transparente temporaire), puis apporte l’enveloppe au guichet. Le coffre-fort reste verrouillé, et personne ne découvre ce qu’il contient par ailleurs.

## Approfondissement

### Comment une adresse TEX est construite

Une adresse transparente normale commençant par `t1` contient un hachage de clé de 20 octets, écrit en Base58Check. Une adresse TEX contient les mêmes 20 octets, réencodés en Bech32m avec le préfixe `tex` (`textest` sur testnet). Convertir l’une en l’autre ne nécessite que quelques lignes de code, que ZIP 320 présente dans son implémentation de référence.

Cette conception simple était une exigence de Binance : la conversion devait fonctionner uniquement avec les bibliothèques Base58Check et Bech32m dans le code front-end de l’exchange. Une première ébauche de ZIP 320 intégrait l’idée aux Unified Addresses, et cette version a été abandonnée pour cette raison.

### Payer une adresse TEX depuis un solde blindé

ZIP 320 exige qu’un wallet compatible construise ici deux transactions. La première déplace les fonds de votre solde blindé vers une nouvelle adresse transparente éphémère. La seconde les envoie de cette adresse vers l’adresse TEX.

Si l’exchange refuse le dépôt, il renvoie les fonds vers l’adresse éphémère. Votre wallet doit pouvoir les trouver et les dépenser ; ZIP 320 demande donc aux wallets de dériver les adresses éphémères de votre phrase de récupération. Il demande également aux wallets d’utiliser à chaque fois une nouvelle adresse éphémère, afin que des paiements distincts ne puissent pas être liés entre eux.

### Ce que montre la blockchain

La règle TEX s’applique dans les wallets. Les nœuds ne la vérifient pas, donc les règles de consensus restent les mêmes. Sur la chaîne, un paiement vers une adresse TEX ressemble à un paiement vers l’adresse `t1` correspondante. Le montant, l’adresse éphémère et l’adresse de l’exchange sont publics, comme pour toute transaction transparente.

## Pages connexes

- [Exchanges centralisés](/using-zcash/custodial-exchanges) : quels exchanges acceptent quels types d’adresses, y compris les dépôts TEX de Binance.
- [Wallets](/using-zcash/wallets) : utilisez le filtre TEX Address pour trouver des wallets capables de payer une adresse TEX.
- [Pools blindés](/using-zcash/shielded-pools) : où se trouve votre solde privé avant qu’un paiement TEX n’en déplace une partie.
- [Qui peut voir votre paiement Zcash](/start-here/who-can-see-your-zcash-payment) : ce qui devient visible une fois que les fonds quittent le pool blindé.
- [Ce qu’un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see) : comment un paiement transparent apparaît sur la chaîne.
- [Zcash URI de demande de paiement](/using-zcash/payment-request-uris) : une autre norme de wallet pour les paiements préremplis.

**Dernière mise à jour :** octobre 2026
