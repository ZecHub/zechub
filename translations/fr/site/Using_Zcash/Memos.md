<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Mémos

#### Envoi de mémos chiffrés

Lorsque vous envoyez une transaction Z2Z (protégée à protégée), vous pouvez inclure un mémo (message) dans la transaction. Ce mémo peut être utilisé pour un certain nombre de choses différentes.

#### Signature des transactions

Les mémos sont principalement utilisés pour signer les paiements. Comme les transactions protégées chiffrent vos données, vous ne pouvez pas voir qui vous a envoyé des ZEC, ni à quoi ces ZEC pouvaient être destinés. Les utilisateurs peuvent utiliser le champ de mémo pour signer de leur nom ou pseudonyme afin d’indiquer à leur correspondant de qui provenait la transaction. Ils peuvent aussi décrire l’objet de la transaction.

#### Envoi d’un message

Un autre cas d’usage du mémo chiffré consiste à envoyer un message à quelqu’un possédant une z-addr. Ces messages peuvent porter sur n’importe quoi, qu’il s’agisse d’un [rappel à un ami](https://twitter.com/iansagstette/status/1542142468505870336), ou d’un [message sensible qui doit rester aussi privé que possible](https://twitter.com/InsideZcash/status/1545800146352578560).

#### Mots d’amour sur la blockchain

Une personne a envoyé à son partenaire un mot d’amour dans l’un des premiers blocs de la blockchain Zcash. Quelqu’un a découvert que son partenaire lui avait envoyé un fichier via un mémo Zcash. Ce fichier était un billet pour un événement spécial, à l’étranger, auquel elle et son amoureux lointain parlaient d’assister ensemble. Le mémo était un mot d’amour.

#### Avancé

> **Historique. Cette démonstration ne fonctionne plus telle quelle.**
>
> La démonstration ci-dessous utilise zcashd, et son [script de réception](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) lit les mémos via `zcash-cli`. zcashd a atteint son arrêt automatique de fin de support le 18 juillet 2026 ; ce script ne peut donc plus joindre un nœud en fonctionnement, et il n'a pas été porté.
>
> La lecture des mémos protégés en ligne de commande fonctionne toujours avec Zallet : `zallet rpc z_listunspent` renvoie chaque note protégée reçue avec le même champ `memoStr` que lit le script. Voir le [guide de référence rapide de Zallet](/using-zcash/zallet-quick-reference-guide) pour la commande, et le [guide de migration vers Zebra et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) pour faire passer un nœud hors de zcashd. Zallet est encore en version bêta.
>
> Cette section est conservée comme trace historique de la démonstration Magic-Wormhole.

Voici comment utiliser les mémos protégés de Zcash avec la CLI Magic-Wormhole et zcashd pour envoyer des fichiers en toute sécurité d’un ordinateur à un autre !: 

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

#### Ressources

[Le champ de mémo chiffré](https://electriccoin.co/blog/encrypted-memo-field/)
