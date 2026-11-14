<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mémos

## En bref

* Un mémo est une courte note écrite que vous joignez à un paiement envoyé à une adresse protégée. Il est chiffré, de sorte que les personnes qui observent la blockchain ne peuvent pas le lire.
* Le champ mémo peut contenir jusqu'à 512 octets de texte.
* On utilise les mémos pour indiquer qui a envoyé un paiement et à quoi il correspond, ou pour envoyer un message privé.
* Les paiements vers des adresses transparentes ne peuvent pas contenir de mémo.
* Un [lien de demande de paiement](/using-zcash/payment-request-uris) peut remplir le mémo à votre place, ce qui permet à une boutique d'identifier chaque commande.

## Explication principale

### Envoyer des mémos chiffrés

Lorsque vous envoyez une transaction Z2Z (d'une adresse protégée vers une adresse protégée), vous pouvez inclure un mémo (message) dans la transaction. Ce mémo peut servir à plusieurs choses.

### Signer les transactions

Les mémos servent avant tout à signer les paiements. Comme les transactions protégées chiffrent vos données, vous ne pouvez pas voir qui vous a envoyé des ZEC ni à quoi ces ZEC étaient destinés. Les utilisateurs peuvent se servir du champ mémo pour signer de leur nom ou de leur pseudonyme afin que leur interlocuteur sache de qui provient la transaction. Ils peuvent aussi décrire l'objet de la transaction.

### Envoyer un message

Un autre cas d'utilisation du mémo chiffré consiste à envoyer un message à quelqu'un qui possède une z-addr. Ces messages peuvent porter sur n'importe quel sujet, qu'il s'agisse d'un [rappel adressé à un ami](https://twitter.com/iansagstette/status/1542142468505870336) ou d'un [message sensible qui doit rester aussi privé que possible](https://twitter.com/InsideZcash/status/1545800146352578560).

### Des mots doux sur la blockchain

Une personne a envoyé un mot doux à son partenaire dans l'un des premiers blocs de la blockchain Zcash. Quelqu'un a découvert que son partenaire lui avait envoyé un fichier par le biais d'un mémo Zcash. Ce fichier était un billet pour un événement spécial à l'étranger auquel elle et son amoureux lointain avaient parlé d'assister ensemble. Le mémo était un mot doux.

## Représentation visuelle / analogie

Imaginez un paiement protégé comme une enveloppe scellée contenant de l'argent. Le mémo est un mot plié et glissé avec l'argent.

La blockchain est la poste. Elle transporte l'enveloppe et enregistre son arrivée, sans jamais l'ouvrir. C'est la personne qui ouvre l'enveloppe qui lit le mot. Un paiement transparent est une carte postale : il n'y a pas d'enveloppe dans laquelle glisser un mot.

## Pour aller plus loin

### Ce que peut contenir un mémo

Le champ mémo fait toujours exactement 512 octets. Un mémo texte plus court est complété par des octets nuls avant d'être chiffré, de sorte que tous les mémos ont la même taille on-chain.

La plupart des mémos sont du simple texte UTF-8. Le [ZIP 302](https://zips.z.cash/zip-0302) réserve également les mémos qui commencent par un octet de valeur `0xF5` ou supérieure à d'autres types de données, et un mémo composé de `0xF6` suivi de zéros signifie « pas de mémo ».

Chaque sortie protégée d'une transaction porte son propre mémo : une même transaction qui paie plusieurs personnes peut donc inclure un mot différent pour chacune d'elles.

### Avancé

> **Historique. Cette démonstration ne fonctionne plus telle qu'elle est décrite.**
>
> La démonstration ci-dessous utilise zcashd, et son [script de réception](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) lit les mémos via `zcash-cli`. zcashd a atteint son arrêt automatique de fin de support le 18 juillet 2026 : ce script ne peut donc plus joindre un nœud en fonctionnement, et il n'a pas été porté.
>
> La lecture des mémos protégés en ligne de commande fonctionne toujours sur Zallet : `zallet rpc z_listunspent` renvoie chaque note protégée reçue avec le même champ `memoStr` que celui lu par le script. Consultez le [guide de référence rapide Zallet](/using-zcash/zallet-quick-reference-guide) pour la commande, ainsi que le [guide de migration vers Zebra et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) pour faire migrer un nœud depuis zcashd. Zallet est encore en version bêta.
>
> Cette section est conservée à titre d'archive historique de la démonstration Magic-Wormhole.

Voici comment utiliser les mémos protégés Zcash avec la CLI Magic-Wormhole et zcashd pour envoyer des fichiers en toute sécurité d'un ordinateur à un autre !

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Encrypted File Transfer with Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Pages associées

- [URI de demande de paiement](/using-zcash/payment-request-uris) : insérer un mémo dans un lien ou un QR code `zcash:`.
- [Transactions](/using-zcash/transactions) : types de transactions protégées et transparentes.
- [Pools protégés](/using-zcash/shielded-pools) : là où se trouvent les notes protégées qui portent les mémos.
- [Portefeuilles](/using-zcash/wallets) : utilisez le filtre « Mémo protégé » pour trouver les portefeuilles qui prennent en charge les mémos.
- [Guide de référence rapide Zallet](/using-zcash/zallet-quick-reference-guide) : lire les mémos reçus en ligne de commande.
- [Outils Zcash pour les créateurs](/using-zcash/creators-and-tips) : outils de pourboire qui envoient un message avec le pourboire.

### Ressources

[Le champ mémo chiffré](https://electriccoin.co/blog/encrypted-memo-field/)

**Dernière mise à jour :** octobre 2026
