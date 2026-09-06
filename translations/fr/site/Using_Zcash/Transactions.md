<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transactions

ZEC est un actif numérique largement utilisé pour les paiements, offrant de solides fonctionnalités de confidentialité qui le rendent adapté à diverses transactions comme payer des amis, effectuer des achats ou faire des dons. Pour maximiser la confidentialité et la sécurité, il est essentiel de comprendre comment fonctionnent les différents types de transactions au sein de Zcash.

## TL;DR

- Zcash prend en charge deux types de transactions : les transactions **protégées**, qui gardent les détails privés, et les transactions **transparentes**, qui les enregistrent publiquement.
- Les adresses protégées commencent par `u` ou `z`. Les adresses transparentes commencent par `t` et fonctionnent beaucoup comme une adresse Bitcoin.
- Le choix vous appartient pour chaque paiement. La confidentialité est une option que Zcash vous offre, et non un réglage que quelqu'un d'autre décide pour vous.
- Les retraits depuis une plateforme d'échange sont l'endroit le plus courant où les utilisateurs perdent leur confidentialité. Si la plateforme ne prend en charge que les retraits transparents, protégez vous-même les fonds une fois reçus.
- Les frais suivent [ZIP 317](https://zips.z.cash/zip-0317) et augmentent avec la taille de la transaction. Les wallets qui envoient encore l'ancien frais fixe peuvent voir leurs transactions retardées.
- La plupart des transactions Zcash ont une hauteur d'expiration conformément à [ZIP 203](https://zips.z.cash/zip-0203). Si une transaction expire avant d'être minée, elle ne peut plus être confirmée après cette hauteur d'expiration et devra peut-être être envoyée à nouveau.

## Transactions protégées

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Les transactions protégées ont lieu lorsque vous déplacez des ZEC vers votre wallet protégé. L'adresse de votre wallet protégé commence par `u` ou `z`. Lors de l'envoi de transactions protégées, vous et les personnes avec lesquelles vous effectuez des transactions pouvez préserver un niveau de confidentialité impossible sur les réseaux de paiement publics par défaut.

Envoyer une transaction protégée est plus simple avec un wallet qui prend en charge le réseau Zcash actuel et les pools protégés actuels. Avant de vous fier à un wallet pour votre confidentialité, vérifiez qu'il prend en charge l'envoi protégé, la réception protégée et le pool que vous prévoyez d'utiliser. Lorsque vous retirez des ZEC depuis une plateforme d'échange, vérifiez si elle prend en charge les retraits protégés ou transparents. Si elle ne prend en charge que les retraits transparents, déplacez les fonds vers un wallet compatible avec les transactions protégées après leur réception.

Utiliser des transactions protégées pour envoyer et recevoir des fonds est la meilleure façon de préserver la confidentialité et de réduire le risque de fuite de données de paiement.

## Transactions transparentes

Les transactions transparentes fonctionnent de manière similaire aux transactions Bitcoin. Les détails des transactions sont publiquement visibles sur la blockchain, y compris les adresses et les montants transparents. Les transactions transparentes devraient être évitées lorsque la confidentialité est prioritaire.

Les adresses transparentes restent utiles dans certaines situations, notamment lorsqu'une plateforme d'échange ou un service ne prend pas en charge les adresses protégées. Si vous recevez des ZEC sur une adresse transparente, envisagez de les protéger avant d'effectuer des paiements ultérieurs.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Une façon simple de se le représenter

Une transaction transparente est une carte postale. Le facteur la livre, mais toute personne qui la manipule en chemin peut lire le message, voir qui l'a envoyée et qui la reçoit.

Une transaction protégée est une enveloppe scellée. Le service postal confirme toujours qu'une véritable lettre avec un véritable affranchissement est passée par le système, et personne ne peut en falsifier une ni envoyer deux fois la même lettre. Le contenu de l'enveloppe reste entre l'expéditeur et le destinataire.

L'important est que Zcash vous permet de décider laquelle envoyer, paiement par paiement.

## Frais Zcash

Zcash n'utilise pas d'unités de gas comme Ethereum. Les frais de transaction Zcash sont payés en ZEC, généralement mesurés en **zatoshis**. Un ZEC équivaut à 100 000 000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) définit un mécanisme de frais conventionnel qui évolue avec la complexité de la transaction. Au lieu que chaque transaction utilise l'ancien frais fixe de 1 000 zatoshis, le frais conventionnel repose sur des « actions logiques » telles que les entrées, les sorties et les actions protégées. Les transactions simples commencent couramment autour de 10 000 zatoshis, soit 0,0001 ZEC, tandis que les transactions plus complexes peuvent exiger davantage.

Dans la plupart des wallets actuels, les utilisateurs ne devraient pas avoir besoin de calculer manuellement les frais ZIP 317. Le wallet devrait choisir automatiquement un frais approprié. Si un wallet utilise encore l'ancien frais fixe ou vous permet de définir un frais bien inférieur au frais conventionnel ZIP 317, la transaction peut être retardée, dépriorisée, abandonnée par certains nœuds ou ne pas être relayée de manière fiable.

## Résolution des transactions bloquées

Une transaction Zcash n'est pas définitive simplement parce qu'elle apparaît dans votre wallet. Elle devient définitive pour un usage ordinaire après avoir été minée dans un bloc et avoir reçu suffisamment de confirmations selon votre situation. Les plateformes d'échange et services peuvent exiger plus de confirmations que celles affichées par défaut par un wallet.

Utilisez cet arbre de décision avant de renvoyer une transaction :

1. **Votre wallet affiche-t-il un identifiant de transaction ?**
   - Si non, le wallet n'a peut-être pas encore créé ou diffusé la transaction. Vérifiez l'état de synchronisation, la connexion Internet, la version du wallet et tout message d'erreur du wallet.
   - Si oui, copiez l'identifiant de transaction et continuez.
2. **La transaction est-elle confirmée dans un bloc ?**
   - Si oui, attendez le nombre de confirmations requis par votre wallet, plateforme d'échange, commerçant ou service.
   - Si non, continuez.
3. **La transaction a-t-elle atteint sa hauteur d'expiration ?**
   - Si non, ne renvoyez pas encore manuellement le même paiement. La transaction initiale peut toujours être confirmée.
   - Si oui, la transaction ne peut pas être minée après cette hauteur d'expiration. Votre wallet peut la marquer comme expirée ou échouée, et vous devrez peut-être créer une nouvelle transaction.
4. **La transaction apparaît-elle sur un serveur ou explorateur, mais pas sur un autre ?**
   - Considérez cela comme un problème de visibilité du réseau, et non comme la preuve que la transaction a échoué. Différents nœuds peuvent avoir des vues différentes du mempool.
   - Attendez, resynchronisez votre wallet ou passez à un autre serveur de confiance si votre wallet le permet.
5. **La transaction a-t-elle disparu après être apparue comme confirmée ?**
   - Une courte réorganisation de chaîne peut temporairement retirer une transaction de la meilleure chaîne.
   - Attendez davantage de blocs. Si la transaction réapparaît, continuez d'attendre les confirmations. Si elle ne réapparaît pas et expire ensuite, créez une nouvelle transaction.
6. **Le wallet vous demande-t-il de renvoyer la transaction ?**
   - Suivez les indications actuelles du wallet seulement après avoir vérifié que la transaction précédente est expirée, échouée ou n'est plus valide.
   - Si vous n'êtes pas sûr, demandez de l'aide au support avant d'envoyer à nouveau.

## En attente, expirée, abandonnée et réorganisée

- **En attente** signifie que la transaction a été créée ou diffusée, mais n'a pas encore été minée dans un bloc.
- **Expirée** signifie que la hauteur d'expiration de la transaction est passée. Conformément à ZIP 203, une transaction ayant une hauteur d'expiration ne peut pas être minée après cette hauteur.
- **Abandonnée** signifie qu'un ou plusieurs nœuds ne conservent plus la transaction dans leur mempool. Cela peut se produire en raison de l'expiration, de frais faibles, de la politique du mempool, d'un redémarrage ou de différences de relais.
- **Réorganisée** signifie qu'un bloc qui contenait auparavant la transaction ne fait plus partie de la meilleure chaîne. La transaction pourra être minée de nouveau ultérieurement, ou revenir à l'état en attente si elle reste valide.

## Quand ne pas renvoyer

Ne renvoyez pas immédiatement une transaction simplement parce qu'elle est en attente, lente ou absente d'un explorateur. La renvoyer trop tôt peut entraîner de la confusion et, selon la façon dont le wallet crée le nouveau paiement, pourrait présenter un risque de payer deux fois.

Attendez ou contactez d'abord le support lorsque :

- La transaction possède un identifiant de transaction et n'a pas expiré.
- Un serveur l'affiche tandis qu'un autre ne l'affiche pas.
- Elle a récemment été minée, mais a perdu des confirmations après une possible réorganisation.
- Le service destinataire n'a pas terminé de compter les confirmations.
- Votre wallet est encore en cours de synchronisation.

Il est généralement plus sûr de renvoyer une transaction seulement après que le wallet l'a clairement marquée comme expirée ou échouée, ou après que le support a confirmé que la transaction initiale ne peut pas être confirmée.

## Vérifications respectueuses de la confidentialité

Vous pouvez vérifier l'état de base d'une transaction sans exposer plus d'informations que nécessaire :

- Vérifiez que votre wallet est entièrement synchronisé.
- Vérifiez que l'application du wallet est à jour.
- Vérifiez que la transaction possède un identifiant de transaction.
- Vérifiez si la transaction est confirmée, en attente, expirée ou échouée.
- Vérifiez la hauteur actuelle du bloc et comparez-la avec la hauteur d'expiration de la transaction si votre wallet l'affiche.
- Pour les transactions transparentes, un explorateur de blocs peut afficher la transaction publique, les adresses, les montants et les confirmations.
- Pour les transactions protégées, un explorateur de blocs peut indiquer qu'une transaction existe, mais il ne peut pas afficher l'expéditeur protégé, le destinataire, le montant ou les détails du mémo.

## Ce qu'il ne faut pas partager publiquement

Ne publiez jamais les éléments suivants dans un chat public, sur les réseaux sociaux ou dans un outil de suivi des problèmes :

- Phrase de récupération ou phrase de seed
- Clé de dépense, clé privée ou sauvegarde du wallet
- Full Viewing Key
- Captures d'écran montrant les soldes, les adresses complètes, les mémos, les codes QR ou les détails du compte d'échange
- Documents d'identité personnels ou dossiers de récupération de compte

Un identifiant de transaction est public sur la chaîne, mais il peut toujours relier votre demande de support à votre identité. Si la confidentialité est importante, partagez-le uniquement avec un canal de support de confiance.

## Ce dont les équipes de support ont besoin

Lorsque vous demandez de l'aide au support d'un wallet, d'une plateforme d'échange ou d'un service, ne partagez que le minimum d'informations utiles :

- Nom du wallet ou du service
- Version de l'application et système d'exploitation
- Si la transaction est protégée, transparente ou entre des adresses protégées et transparentes
- Identifiant de transaction, si vous êtes à l'aise de le partager
- Heure approximative de l'envoi
- Si le wallet est entièrement synchronisé
- État actuel affiché par le wallet
- Message d'erreur exact, avec les données privées supprimées
- Capture d'écran avec les soldes, adresses, mémos et détails du compte masqués

Les équipes de support n'ont pas besoin de votre phrase de seed, clé de dépense, clé privée ou Full Viewing Key.

## Erreurs courantes

- **Supposer que tout wallet répertoriant ZEC peut l'envoyer de manière privée.** Plusieurs wallets multi-devises ne prennent en charge que la partie transparente de Zcash. Vérifiez les pools pris en charge par le wallet avant de vous y fier pour votre confidentialité. La page [Wallets](https://zechub.wiki/using-zcash/wallets) liste cette information pour chaque option.
- **Retirer vers une adresse transparente et y laisser les fonds.** Le retrait lui-même est public, et tout mouvement ultérieur depuis cette adresse reste également public. Protégez les fonds dès leur réception.
- **Considérer la confidentialité comme quelque chose que l'on active une seule fois.** Chaque transaction est un choix distinct. Envoyer une transaction protégée aujourd'hui n'annule pas un paiement transparent effectué la semaine dernière.
- **Réutiliser une adresse transparente pour tout.** Comme l'activité transparente est visible en permanence, une seule adresse réutilisée relie progressivement des paiements qui n'avaient aucune raison d'être connectés.
- **Envoyer avec un frais par défaut obsolète.** Les wallets qui n'ont pas adopté ZIP 317 peuvent encore envoyer l'ancien frais fixe, ce qui peut laisser une transaction sans confirmation.
- **Renvoyer avant l'expiration.** Une transaction en attente peut toujours être confirmée jusqu'à son expiration. Vérifiez son état d'expiration avant de créer un autre paiement.

## Remarque

Veuillez noter que la manière la plus sûre d'utiliser ZEC consiste à utiliser des transactions protégées chaque fois que l'expéditeur, le destinataire, le wallet et le service les prennent tous en charge. Certains wallets et plateformes d'échange prennent en charge les [adresses unifiées](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), qui peuvent combiner plusieurs types de récepteurs Zcash dans une seule adresse.

## Ressources

- [ZIP 203 : Expiration des transactions](https://zips.z.cash/zip-0203)
- [ZIP 317 : Mécanisme de frais de transfert proportionnels](https://zips.z.cash/zip-0317)
- [ZIPs de Zcash](https://zips.z.cash/)

## Pages associées

- [Wallets](/using-zcash/wallets) - quels wallets prennent en charge l'envoi protégé et lesquels sont uniquement transparents
- [Pools protégés](/using-zcash/shielded-pools) - Sapling et Orchard, les pools où résident vos fonds protégés
- [Mémos](/using-zcash/memos) - messages chiffrés pouvant accompagner une transaction protégée
- [Adresses transparentes des plateformes d'échange](/using-zcash/transparent-exchange-addresses) - les adresses TEX et pourquoi les plateformes d'échange les utilisent
- [Plateformes d'échange custodiales](/using-zcash/custodial-exchanges) - quelles plateformes d'échange prennent en charge les retraits protégés

## Convertisseur ZEC vers ZAT
