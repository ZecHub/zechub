<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transactions

ZEC est un actif numérique largement utilisé pour les paiements, offrant de solides fonctionnalités de confidentialité qui le rendent adapté à diverses transactions comme payer des amis, effectuer des achats ou faire des dons. Pour maximiser la confidentialité et la sécurité, il est essentiel de comprendre comment fonctionnent les différents types de transactions dans Zcash.

## TL;DR

- Zcash prend en charge deux types de transaction : **protégée**, qui garde les détails privés, et **transparente**, qui les enregistre publiquement.
- Les adresses protégées commencent par `u` ou `z`. Les adresses transparentes commencent par `t` et se comportent un peu comme une adresse Bitcoin.
- Le choix vous appartient à chaque paiement. La confidentialité est une option que Zcash vous offre, pas un réglage que quelqu'un d'autre décide pour vous.
- Les retraits depuis un échange sont l'endroit le plus courant où les gens perdent leur confidentialité. Si l'échange ne prend en charge que les retraits transparents, protégez vous-même les fonds une fois qu'ils arrivent.
- Les frais suivent [ZIP 317](https://zips.z.cash/zip-0317) et augmentent avec la taille de la transaction. Les wallets qui envoient encore l'ancien frais fixe peuvent voir leurs transactions retardées.
- La plupart des transactions Zcash ont une hauteur d'expiration selon [ZIP 203](https://zips.z.cash/zip-0203). Si une transaction expire avant d'être minée, elle ne peut plus être confirmée après cette hauteur d'expiration et devra peut-être être renvoyée.

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

Les transactions protégées ont lieu lorsque vous déplacez des ZEC vers votre portefeuille protégé. L'adresse de votre portefeuille protégé commence par `u` ou `z`. Lorsque vous envoyez des transactions protégées, vous et les personnes avec lesquelles vous effectuez des transactions pouvez conserver un niveau de confidentialité impossible sur les réseaux de paiement publics par défaut.

Envoyer une transaction protégée est plus simple lorsque vous utilisez un wallet qui prend en charge le réseau Zcash actuel et les pools protégés actuels. Avant de compter sur un wallet pour la confidentialité, vérifiez s'il prend en charge l'envoi protégé, la réception protégée et le pool que vous prévoyez d'utiliser. Lorsque vous retirez des ZEC depuis un échange, vérifiez si l'échange prend en charge les retraits protégés ou transparents. S'il ne prend en charge que les retraits transparents, déplacez les fonds vers un wallet compatible avec la protection après leur arrivée.

Utiliser des transactions protégées pour envoyer et recevoir des fonds est la meilleure façon de préserver la confidentialité et de réduire le risque de fuite de données de paiement.

## Transactions transparentes

Les transactions transparentes fonctionnent de manière similaire aux transactions Bitcoin. Les détails des transactions sont visibles publiquement sur la blockchain, y compris les adresses transparentes et les montants transparents. Les transactions transparentes doivent être évitées lorsque la confidentialité est une priorité.

Les adresses transparentes restent utiles dans certaines situations, en particulier lorsqu'un échange ou un service ne prend pas en charge les adresses protégées. Si vous recevez des ZEC sur une adresse transparente, envisagez de les protéger avant d'effectuer des paiements ultérieurs.

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

## Une façon simple de l'imaginer

Une transaction transparente est une carte postale. Le facteur la livre, mais toute personne qui la manipule en chemin peut lire le message, voir qui l'a envoyée et voir qui la reçoit.

Une transaction protégée est une enveloppe scellée. Le service postal confirme toujours qu'une vraie lettre avec un vrai affranchissement a traversé le système, et personne ne peut en falsifier une ni envoyer deux fois la même lettre. Ce que contient l'enveloppe reste entre l'expéditeur et le destinataire.

L'important, c'est que Zcash vous laisse décider laquelle envoyer, paiement par paiement.

## Frais Zcash

Zcash n'utilise pas d'unités de gas comme Ethereum. Les frais de transaction Zcash sont payés en ZEC, généralement mesurés en **zatoshis**. Un ZEC équivaut à 100,000,000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) définit un mécanisme de frais conventionnel qui s'adapte à la complexité de la transaction. Au lieu que chaque transaction utilise l'ancien frais fixe de 1,000 zatoshis, le frais conventionnel repose sur des "actions logiques" telles que les entrées, les sorties et les actions protégées. Les transactions simples commencent souvent autour de 10,000 zatoshis, soit 0.0001 ZEC, et les transactions plus complexes peuvent nécessiter davantage.

Dans la plupart des wallets actuels, les utilisateurs ne devraient pas avoir à calculer manuellement les frais ZIP 317. Le wallet devrait choisir automatiquement un frais approprié. Si un wallet utilise encore l'ancien frais fixe ou vous permet de définir un frais bien inférieur au frais conventionnel ZIP 317, la transaction peut être retardée, dépriorisée, abandonnée par certains nœuds, ou ne pas être relayée de manière fiable.

## Dépannage des transactions bloquées

Une transaction Zcash n'est pas définitive simplement parce qu'elle apparaît dans votre wallet. Elle devient définitive pour un usage ordinaire après avoir été minée dans un bloc et avoir reçu suffisamment de confirmations pour votre situation. Les échanges et services peuvent exiger davantage de confirmations que ce qu'un wallet affiche par défaut.

Utilisez cet arbre de décision avant de renvoyer :

1. **Votre wallet affiche-t-il un identifiant de transaction ?**
   - Si non, le wallet n'a peut-être pas encore créé ou diffusé la transaction. Vérifiez l'état de synchronisation, la connexion Internet, la version du wallet et tout message d'erreur du wallet.
   - Si oui, copiez l'identifiant de transaction et continuez.
2. **La transaction est-elle confirmée dans un bloc ?**
   - Si oui, attendez le nombre de confirmations requis par votre wallet, échange, marchand ou service.
   - Si non, continuez.
3. **La transaction a-t-elle atteint sa hauteur d'expiration ?**
   - Si non, ne renvoyez pas encore manuellement le même paiement. La transaction d'origine peut encore être confirmée.
   - Si oui, la transaction ne peut pas être minée après cette hauteur d'expiration. Votre wallet peut la marquer comme expirée ou échouée, et vous devrez peut-être créer une nouvelle transaction.
4. **La transaction apparaît-elle sur un serveur ou explorateur mais pas sur un autre ?**
   - Considérez cela comme un problème de visibilité réseau, pas comme une preuve que la transaction a échoué. Différents nœuds peuvent avoir des vues différentes du mempool.
   - Attendez, resynchronisez votre wallet, ou basculez vers un autre serveur de confiance si votre wallet le permet.
5. **La transaction a-t-elle disparu après être apparue comme confirmée ?**
   - Une courte réorganisation de chaîne peut temporairement retirer une transaction de la meilleure chaîne.
   - Attendez quelques blocs de plus. Si la transaction réapparaît, continuez d'attendre les confirmations. Si elle ne réapparaît pas et expire plus tard, créez une nouvelle transaction.
6. **Le wallet vous demande-t-il de renvoyer ?**
   - Suivez les indications actuelles du wallet seulement après avoir vérifié que la transaction précédente est expirée, échouée ou n'est plus valide.
   - Si vous avez un doute, contactez le support avant de renvoyer.

## En attente, expirée, abandonnée et réorganisée

- **En attente** signifie que la transaction a été créée ou diffusée mais n'a pas encore été minée dans un bloc.
- **Expirée** signifie que la hauteur d'expiration de la transaction est dépassée. Selon ZIP 203, une transaction avec une hauteur d'expiration ne peut pas être minée après cette hauteur.
- **Abandonnée** signifie qu'un ou plusieurs nœuds ne conservent plus la transaction dans leur mempool. Cela peut arriver en raison de l'expiration, de frais trop faibles, de la politique du mempool, du comportement au redémarrage ou de différences de relais.
- **Réorganisée** signifie qu'un bloc qui contenait auparavant la transaction ne fait plus partie de la meilleure chaîne. La transaction peut être minée de nouveau plus tard, ou revenir à l'état en attente si elle est encore valide.

## Quand ne pas renvoyer

Ne renvoyez pas immédiatement simplement parce qu'une transaction est en attente, lente ou absente d'un explorateur. Renvoyer trop tôt peut créer de la confusion et, selon la manière dont le wallet construit le nouveau paiement, pourrait entraîner un risque de double paiement.

Attendez ou demandez d'abord de l'aide quand :

- La transaction a un identifiant de transaction et n'a pas expiré.
- Un serveur l'affiche alors qu'un autre ne l'affiche pas.
- Elle a été minée récemment mais a perdu des confirmations après une possible réorganisation.
- Le service destinataire n'a pas encore fini de compter les confirmations.
- Votre wallet est encore en cours de synchronisation.

Il est généralement plus sûr de ne renvoyer qu'après que le wallet a clairement marqué la transaction comme expirée ou échouée, ou après que le support a confirmé que la transaction d'origine ne peut pas être confirmée.

## Vérifications sûres pour la confidentialité

Vous pouvez vérifier l'état de base d'une transaction sans exposer plus d'informations que nécessaire :

- Vérifiez que votre wallet est entièrement synchronisé.
- Vérifiez que l'application du wallet est à jour.
- Vérifiez que la transaction possède un identifiant de transaction.
- Vérifiez si la transaction est confirmée, en attente, expirée ou échouée.
- Vérifiez la hauteur de bloc actuelle et comparez-la à la hauteur d'expiration de la transaction si votre wallet l'affiche.
- Pour les transactions transparentes, un explorateur de blocs peut montrer la transaction publique, les adresses, les montants et les confirmations.
- Pour les transactions protégées, un explorateur de blocs peut montrer qu'une transaction existe, mais il ne peut pas montrer l'expéditeur protégé, le destinataire, le montant ni les détails du mémo.

## Ce qu'il ne faut pas partager publiquement

Ne publiez jamais ces éléments dans un chat public, sur les réseaux sociaux ou dans un gestionnaire d'issues :

- Phrase de récupération ou seed phrase
- Clé de dépense, clé privée ou sauvegarde du wallet
- Full Viewing Key
- Captures d'écran montrant les soldes, les adresses complètes, les mémos, les QR codes ou les détails du compte d'échange
- Documents d'identité personnels ou dossiers de récupération de compte

Un identifiant de transaction est public sur la chaîne, mais il peut tout de même relier votre demande de support à votre identité. Si la confidentialité compte, partagez-le uniquement avec un canal de support de confiance.

## Ce dont les équipes de support ont besoin

Lorsque vous demandez de l'aide au support d'un wallet, d'un échange ou d'un service, ne partagez que le minimum d'informations utiles :

- Nom du wallet ou du service
- Version de l'application et système d'exploitation
- Si la transaction est protégée, transparente, ou entre des adresses protégées et transparentes
- Identifiant de transaction, si vous acceptez de le partager
- Heure approximative de l'envoi
- Si le wallet est entièrement synchronisé
- État actuel affiché par le wallet
- Message d'erreur exact, avec les données privées supprimées
- Capture d'écran avec les soldes, adresses, mémos et détails du compte masqués

Les équipes de support n'ont pas besoin de votre phrase de récupération, clé de dépense, clé privée ou full viewing key.

## Erreurs courantes

- **Supposer que n'importe quel wallet listant ZEC peut l'envoyer de manière privée.** Un certain nombre de wallets multi-actifs ne prennent en charge que le côté transparent de Zcash. Vérifiez les pools pris en charge par le wallet avant de compter sur lui pour la confidentialité. La page [Wallets](https://zechub.wiki/using-zcash/wallets) l'indique pour chaque option.
- **Retirer vers une adresse transparente et y laisser les fonds.** Le retrait lui-même est public, et chaque mouvement ultérieur depuis cette adresse reste public aussi. Protégez les fonds une fois qu'ils arrivent.
- **Considérer la confidentialité comme quelque chose qu'on active une fois pour toutes.** Chaque transaction est un choix distinct. Envoyer en mode protégé aujourd'hui n'annule pas un paiement transparent effectué la semaine dernière.
- **Réutiliser une adresse transparente pour tout.** Comme l'activité transparente est visible de façon permanente, une seule adresse réutilisée relie progressivement des paiements qui n'avaient aucune raison d'être connectés.
- **Envoyer avec un frais par défaut obsolète.** Les wallets qui n'ont pas adopté ZIP 317 peuvent encore envoyer l'ancien frais fixe, ce qui peut laisser une transaction sans confirmation.
- **Renvoyer avant l'expiration.** Une transaction en attente peut encore être confirmée jusqu'à son expiration. Vérifiez l'état d'expiration avant de créer un autre paiement.

## Note

Veuillez noter que la manière la plus sûre d'utiliser ZEC consiste à utiliser des transactions protégées chaque fois que l'expéditeur, le destinataire, le wallet et le service les prennent tous en charge. Certains wallets et échanges prennent en charge les [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), qui peuvent combiner plusieurs types de récepteurs Zcash dans une seule adresse.

## Ressources

- [ZIP 203: Expiration des transactions](https://zips.z.cash/zip-0203)
- [ZIP 317: Mécanisme proportionnel de frais de transfert](https://zips.z.cash/zip-0317)
- [ZIPs Zcash](https://zips.z.cash/)

## Pages connexes

- [Wallets](/using-zcash/wallets) - quels wallets prennent en charge l'envoi protégé, et lesquels sont uniquement transparents
- [Pools protégés](/using-zcash/shielded-pools) - Sapling et Orchard, les pools dans lesquels vivent vos fonds protégés
- [Mémos](/using-zcash/memos) - messages chiffrés qui peuvent accompagner une transaction protégée
- [Adresses transparentes d'échange](/using-zcash/transparent-exchange-addresses) - les adresses TEX et pourquoi les échanges les utilisent
- [Échanges dépositaires](/using-zcash/custodial-exchanges) - quels échanges prennent en charge les retraits protégés

## Convertisseur ZEC vers ZAT
