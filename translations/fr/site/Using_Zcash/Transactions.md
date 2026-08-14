<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


# Transactions

Le ZEC est un actif numérique largement utilisé pour les paiements, offrant de solides fonctionnalités de confidentialité qui le rendent adapté à diverses transactions comme payer des amis, effectuer des achats ou faire des dons. Pour maximiser la confidentialité et la sécurité, il est essentiel de comprendre comment fonctionnent les différents types de transactions au sein de Zcash.

## TL;DR

- Zcash prend en charge deux types de transaction : **shielded**, qui garde les détails privés, et **transparent**, qui les enregistre publiquement.
- Les adresses shielded commencent par `u` ou `z`. Les adresses transparent commencent par `t` et fonctionnent un peu comme une adresse Bitcoin.
- Le choix vous appartient à chaque paiement. La confidentialité est une option que Zcash vous offre, pas un réglage que quelqu’un d’autre décide à votre place.
- Les retraits depuis un échange sont l’endroit le plus fréquent où les gens perdent leur confidentialité. Si l’échange ne prend en charge que les retraits transparents, protégez les fonds vous-même une fois qu’ils arrivent.
- Les frais suivent [ZIP 317](https://zips.z.cash/zip-0317) et augmentent avec la taille de la transaction. Les wallets qui envoient encore les anciens frais fixes peuvent voir leurs transactions retardées.

## Transactions shielded

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash expliqué : les transactions shielded de Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Les transactions shielded ont lieu lorsque vous déplacez du ZEC vers votre wallet shielded. L’adresse de votre wallet shielded commence par un U ou un Z. En envoyant des transactions shielded, vous vous assurez que vous, ainsi que les personnes avec qui vous effectuez des transactions, conservez un niveau de confidentialité impossible sur d’autres réseaux de paiement P2P. Envoyer une transaction shielded est très simple, il faut juste s’assurer de deux choses. La première est que vous utilisez le bon type de wallet. Le moyen le plus simple de vous assurer que vous utilisez le bon type de wallet est d’en télécharger un [wallet](https://zechub.wiki/wallets). La deuxième chose importante est de déplacer le ZEC vers un wallet shielded. Lorsque vous retirez du ZEC depuis un échange, vous devez savoir si l’échange prend en charge les retraits shielded ou transparents. S’il prend en charge les retraits shielded, vous pouvez simplement retirer du ZEC vers votre adresse shielded. Si l’échange ne prend en charge que les retraits transparents, alors vous devez utiliser YWallet et protéger automatiquement votre ZEC une fois reçu. Utiliser uniquement des transactions shielded pour envoyer et recevoir des fonds est la meilleure façon de préserver la confidentialité et de réduire le risque de fuite de données

## Transactions transparent

Les transactions transparent fonctionnent de manière similaire, mais sans protections de confidentialité, ce qui rend les détails de la transaction publiquement visibles sur la blockchain. Les transactions transparent devraient être évitées lorsque la confidentialité est une priorité. Remarque : les wallets transparent peuvent rencontrer des problèmes en raison de ZIP-317, qui exige des frais proportionnels à la complexité de la transaction. Les frais par défaut peuvent entraîner un rejet ou des retards, ce qui rend l’ajustement des frais crucial.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Découvrez les wallets shielded 🛡️Zcash !"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Une manière simple de se le représenter

Une transaction transparente est une carte postale. Le facteur la livre, mais toute personne qui la manipule en chemin peut lire le message, voir qui l’a envoyée et voir qui la reçoit.

Une transaction shielded est une enveloppe scellée. Le service postal confirme toujours qu’une vraie lettre avec un vrai affranchissement est bien passée par le système, et personne ne peut en falsifier une ni envoyer deux fois la même lettre. Ce que contient l’enveloppe reste entre l’expéditeur et le destinataire.

L’important, c’est que Zcash vous permet de décider laquelle envoyer, paiement par paiement.

## Gérer les frais pour les transactions transparent

Guide ZIP-317 : la structure des frais évolue avec la complexité de la transaction, ce qui nécessite des ajustements au-delà des frais standard de 0.00001 ZEC.
Exemple de calcul : une transaction simple avec une seule note peut nécessiter des frais de 0.0001 ZEC, avec une augmentation d’environ 0.00005 ZEC par note supplémentaire.

Modifier les frais dans les wallets

Trust Wallet : accédez aux paramètres avancés en appuyant sur l’icône d’engrenage lors de la création d’une transaction. Ajustez soigneusement les champs Miner Tip Gwei et Max Fee Gwei pour éviter l’échec de la transaction. Trust Wallet ne facture que les frais de réseau.
Coinomi Wallet : propose trois options de frais dynamiques — Low, Normal, High — selon les conditions du réseau. Pour les ajustements manuels, sélectionnez Custom sur les coins pris en charge ou utilisez Change Fee dans le coin supérieur droit. Les utilisateurs peuvent définir les frais par octet ou par kilo-octet, ce qui affecte les délais de confirmation. Il est recommandé d’utiliser les options dynamiques en cas d’incertitude.

## Erreurs courantes

- **Supposer que n’importe quel wallet listant ZEC peut l’envoyer de façon privée.** Un certain nombre de wallets multi-coins ne prennent en charge que la partie transparente de Zcash. Vérifiez les pools pris en charge par le wallet avant de vous y fier pour la confidentialité. La page [Wallets](https://zechub.wiki/using-zcash/wallets) l’indique pour chaque option.
- **Retirer vers une adresse transparente et y laisser les fonds.** Le retrait lui-même est public, et chaque mouvement ultérieur depuis cette adresse reste public lui aussi. Protégez les fonds une fois qu’ils arrivent.
- **Traiter la confidentialité comme quelque chose qu’on active une fois pour toutes.** Chaque transaction est un choix distinct. Envoyer en shielded aujourd’hui n’annule pas un paiement transparent que vous avez effectué la semaine dernière.
- **Réutiliser une adresse transparente pour tout.** Puisque l’activité transparente est visible de façon permanente, une seule adresse réutilisée relie progressivement des paiements qui n’avaient aucune raison d’être connectés.
- **Envoyer avec des frais par défaut obsolètes.** Les wallets qui n’ont pas adopté ZIP 317 peuvent encore envoyer les anciens frais fixes, ce qui peut laisser une transaction en attente de confirmation.

## Remarque

Veuillez noter que la manière la plus sûre d’utiliser le ZEC est d’utiliser uniquement des transactions shielded. Certains wallets sont en train de mettre en œuvre les [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) qui permettent aux utilisateurs et aux échanges de combiner ensemble des adresses transparent et shielded.

## Ressources

[ZIPS](https://zips.z.cash/)

## Pages associées

- [Wallets](/using-zcash/wallets) — quels wallets prennent en charge l’envoi shielded, et lesquels sont uniquement transparents
- [Pools shielded](/using-zcash/shielded-pools) — Sapling et Orchard, les pools où vivent vos fonds shielded
- [Memos](/using-zcash/memos) — des messages chiffrés qui peuvent accompagner une transaction shielded
- [Adresses d’échange transparentes](/using-zcash/transparent-exchange-addresses) — les adresses TEX et pourquoi les échanges les utilisent
- [Échanges custodial](/using-zcash/custodial-exchanges) — quels échanges prennent en charge les retraits shielded

## Convertisseur ZEC vers ZAT
