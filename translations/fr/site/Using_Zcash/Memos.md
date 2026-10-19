<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mémos

## TL;DR

* Un mémo est une courte note que vous joignez à un paiement envoyé vers une adresse protégée. Il est chiffré, de sorte que les personnes qui observent la blockchain ne peuvent pas le lire.
* Le champ mémo peut contenir jusqu'à 512 octets de texte.
* Les personnes utilisent les mémos pour indiquer qui a envoyé un paiement et à quoi il servait, ou pour envoyer un message privé.
* Les paiements vers des adresses transparentes ne peuvent pas contenir de mémo.
* Un [lien de demande de paiement](/using-zcash/payment-request-uris) peut remplir le mémo à votre place afin qu'une boutique puisse étiqueter chaque commande.

## Explication fondamentale

### Envoi de mémos chiffrés

Lorsque vous envoyez une transaction Z2Z (protégée à protégée), vous pouvez inclure un mémo (message) dans la transaction. Ce mémo peut servir à plusieurs choses.

### Signature des transactions

Les mémos servent principalement à signer les paiements. Comme les transactions protégées chiffrent vos données, vous ne pouvez pas voir qui vous a envoyé ZEC ni à quoi pouvait servir le ZEC. Les utilisateurs peuvent utiliser le champ mémo pour signer de leur nom ou pseudonyme afin d'indiquer à leur correspondant de qui provenait la transaction. Ils peuvent également décrire à quoi servait la transaction.

### Envoi d'un message

Un autre cas d'usage du mémo chiffré consiste à envoyer un message à quelqu'un possédant une z-addr. Ces messages peuvent porter sur n'importe quel sujet, qu'il s'agisse d'un [rappel à un ami](https://twitter.com/iansagstette/status/1542142468505870336) ou d'un [message sensible qui doit rester aussi privé que possible](https://twitter.com/InsideZcash/status/1545800146352578560).

### Mots doux sur la blockchain

Une personne a envoyé à son partenaire un mot doux dans l'un des premiers blocs de la blockchain Zcash. Quelqu'un a découvert que son partenaire lui avait envoyé un fichier via un mémo Zcash. Ce fichier était un billet pour un événement spécial à l'étranger, auquel elle et son amoureux lointain avaient parlé d'assister ensemble. Le mémo était un mot doux.

## Visuel / Analogie

Imaginez un paiement protégé comme une enveloppe scellée contenant de l'argent. Le mémo est une note pliée avec l'argent.

La blockchain est le bureau de poste. Elle transporte l'enveloppe et enregistre son arrivée, sans jamais l'ouvrir. La personne qui ouvre l'enveloppe lit la note. Un paiement transparent est une carte postale, il n'y a donc pas d'enveloppe dans laquelle glisser une note.

## Approfondissement

### Ce qui tient dans un mémo

Le champ mémo fait toujours exactement 512 octets. Un mémo textuel plus court est complété par des octets nuls avant d'être chiffré, de sorte que chaque mémo semble avoir la même taille sur la blockchain.

La plupart des mémos sont du texte UTF-8 brut. [ZIP 302](https://zips.z.cash/zip-0302) réserve également les mémos commençant par un octet de `0xF5` ou supérieur pour d'autres types de données, et un mémo composé de `0xF6` suivi de zéros signifie « aucun mémo ».

Chaque sortie protégée d'une transaction contient son propre mémo ; une transaction qui paie plusieurs personnes peut donc inclure une note différente pour chacune d'elles.

### Avancé

> **Historique. Cette démo ne fonctionne plus telle qu'elle est écrite.**
>
> La démo ci-dessous utilise zcashd, et son [script de réception](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) lit les mémos via `zcash-cli`. zcashd a atteint son arrêt automatique de fin de support le 18 juillet 2026 ; ce script ne peut donc pas joindre un nœud en fonctionnement et n'a pas été porté.
>
> La lecture des mémos protégés depuis la ligne de commande fonctionne toujours sur Zallet : `zallet rpc z_listunspent` renvoie chaque note protégée reçue avec le même champ `memoStr` que lit le script. Consultez le [Zallet Guide de référence rapide](/using-zcash/zallet-quick-reference-guide) pour la commande, ainsi que le [guide de migration vers Zebra et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) pour déplacer un nœud hors de zcashd. Zallet est toujours en bêta.
>
> Cette section est conservée comme archive historique de la démo Magic-Wormhole.

Voici comment utiliser les mémos protégés de Zcash avec l'interface en ligne de commande Magic-Wormhole et zcashd pour envoyer en toute sécurité des fichiers d'un ordinateur à un autre !

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DÉMO : transfert de fichiers chiffré avec Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Pages connexes

- [URI de demande de paiement](/using-zcash/payment-request-uris) : insérez un mémo dans un lien `zcash:` ou un code QR.
- [Transactions](/using-zcash/transactions) : types de transactions protégées et transparentes.
- [Pools protégés](/using-zcash/shielded-pools) : où se trouvent les notes protégées qui contiennent des mémos.
- [Portefeuilles](/using-zcash/wallets) : utilisez le filtre Mémo protégé pour trouver les portefeuilles prenant en charge les mémos.
- [Zallet Guide de référence rapide](/using-zcash/zallet-quick-reference-guide) : lisez les mémos reçus depuis la ligne de commande.
- [Zcash Outils pour créateurs](/using-zcash/creators-and-tips) : outils de pourboire qui envoient un message avec le pourboire.

### Ressources

[Le champ mémo chiffré](https://electriccoin.co/blog/encrypted-memo-field/)

**Dernière mise à jour :** octobre 2026
