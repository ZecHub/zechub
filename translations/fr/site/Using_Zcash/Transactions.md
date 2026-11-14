<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transactions

ZEC est un actif numérique largement utilisé pour les paiements, doté de solides fonctionnalités de confidentialité qui le rendent adapté à diverses transactions : payer des amis, effectuer des achats ou faire des dons. Pour optimiser votre confidentialité et votre sécurité, il est essentiel de comprendre comment fonctionnent les différents types de transactions au sein de Zcash.

## En bref

- Zcash prend en charge deux types de transactions : les transactions **protégées**, qui gardent les détails confidentiels, et les transactions **transparentes**, qui les enregistrent publiquement.
- Les adresses protégées commencent par `u` ou `z`. Les adresses transparentes commencent par `t` et se comportent un peu comme une adresse Bitcoin.
- Le choix vous appartient à chaque paiement. La confidentialité est une option que Zcash vous offre, et non un paramètre que quelqu'un d'autre décide à votre place.
- Le retrait depuis un exchange est l'endroit où l'on perd le plus souvent sa confidentialité. Si l'exchange ne prend en charge que les retraits transparents, protégez vous-même les fonds dès leur arrivée.
- Les frais suivent la [ZIP 317](https://zips.z.cash/zip-0317) et augmentent avec la taille de la transaction. Les portefeuilles qui envoient encore l'ancien montant fixe de frais peuvent voir leurs transactions retardées.
- La plupart des transactions Zcash ont une hauteur d'expiration conformément à la [ZIP 203](https://zips.z.cash/zip-0203). Si une transaction expire avant d'être minée, elle ne peut plus être confirmée après cette hauteur d'expiration et il faudra peut-être l'envoyer de nouveau.

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

Les transactions protégées ont lieu lorsque vous transférez des ZEC vers votre portefeuille protégé. L'adresse de votre portefeuille protégé commence par `u` ou `z`. En envoyant des transactions protégées, vous et vos interlocuteurs pouvez conserver un niveau de confidentialité impossible à atteindre sur les réseaux de paiement publics par défaut.

Envoyer une transaction protégée est plus simple lorsque vous utilisez un portefeuille qui prend en charge le réseau Zcash actuel et les pools protégés actuels. Avant de compter sur un portefeuille pour votre confidentialité, vérifiez qu'il prend en charge l'envoi protégé, la réception protégée et le pool que vous comptez utiliser. Lorsque vous retirez des ZEC d'un exchange, vérifiez si l'exchange prend en charge les retraits protégés ou transparents. S'il ne prend en charge que les retraits transparents, transférez les fonds vers un portefeuille compatible avec les transactions protégées après leur arrivée.

Utiliser des transactions protégées pour envoyer et recevoir des fonds est le meilleur moyen de préserver votre confidentialité et de réduire le risque de fuite des données de paiement.

## Transactions transparentes

Les transactions transparentes fonctionnent de manière similaire aux transactions Bitcoin. Les détails de la transaction sont visibles publiquement sur la blockchain, y compris les adresses transparentes et les montants transparents. Il convient d'éviter les transactions transparentes lorsque la confidentialité est une priorité.

Les adresses transparentes restent utiles dans certaines situations, notamment lorsqu'un exchange ou un service ne prend pas en charge les adresses protégées. Si vous recevez des ZEC sur une adresse transparente, pensez à les protéger avant d'effectuer d'autres paiements.

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

Une transaction transparente est une carte postale. Le facteur la distribue, mais toute personne qui la manipule en chemin peut lire le message, voir qui l'a envoyée et qui la reçoit.

Une transaction protégée est une enveloppe scellée. Le service postal confirme toujours qu'une vraie lettre, affranchie correctement, a transité par le système, et personne ne peut en falsifier une ni envoyer deux fois la même lettre. Le contenu de l'enveloppe reste entre l'expéditeur et le destinataire.

L'essentiel est que Zcash vous permet de décider laquelle envoyer, paiement par paiement.

## Frais Zcash

Laissez votre portefeuille calculer les frais de réseau et vérifiez-les avant l'envoi. Les frais sont payés en ZEC : **1 ZEC = 100 000 000 zatoshis**. Le montant des frais en dollars américains dépend également du taux de change du ZEC.

### Pourquoi deux paiements peuvent avoir des frais différents

La [ZIP 317](https://zips.z.cash/zip-0317#fee-calculation) calcule les frais conventionnels à partir d'**actions logiques**, plutôt qu'en pourcentage du montant envoyé :

```text
fee in zatoshis = marginal fee × max(2, logical actions)
```

Les actions logiques mesurent les composants d'une transaction. Par exemple, une transaction uniquement Orchard utilise son nombre d'actions Orchard ; une transaction uniquement Sapling utilise le plus grand des deux nombres entre ses dépenses et ses sorties. Les contributions des différents pools s'additionnent. Les composants transparents font l'objet d'un calcul basé sur la taille. Consultez la ZIP 317 ZIP pour la formule complète, y compris Ironwood et l'ancien Sprout.

Dépenser de nombreuses petites notes reçues ou utiliser plusieurs pools peut donc coûter plus cher qu'un paiement plus simple de même valeur. Le nombre de destinataires ne suffit pas à calculer les frais : la monnaie rendue et le remplissage comptent aussi.

Ces exemples partent d'un nombre d'actions logiques déjà calculé :

| Actions logiques | À 5 000 zatoshis par action | À 1 000 zatoshis par action |
| --- | --- | --- |
| 2 | 10 000 zatoshis / 0,0001 ZEC | 2 000 zatoshis / 0,00002 ZEC |
| 3 | 15 000 zatoshis / 0,00015 ZEC | 3 000 zatoshis / 0,00003 ZEC |
| 10 | 50 000 zatoshis / 0,0005 ZEC | 10 000 zatoshis / 0,0001 ZEC |

### Quels frais marginaux s'appliquent

**Vérifié le 11 novembre 2026 :** la ZIP 317 indique la révision 2 et la [ZIP 2009](https://zips.z.cash/zip-2009) comme proposées. Avant la révision 2, les frais marginaux sont de 5 000 zatoshis. La révision 2 les fixe à 1 000, soit un minimum de 2 000 zatoshis au lieu de 10 000.

La proposition fixe la hauteur sur le Mainnet à **3 590 000**, attendue vers le 19 novembre 2026, et la hauteur sur le Testnet à **4 465 026**. Une estimation calendaire n'est pas la condition d'activation. Pour les portefeuilles, la hauteur pertinente est celle du bloc dans lequel la transaction devrait être minée ; les nœuds utilisent la hauteur du bloc suivant. Revérifiez les spécifications liées et les consignes de version de votre portefeuille à mesure que le déploiement évolue.

N'imposez pas manuellement les frais réduits simplement parce qu'une proposition ou une version logicielle les mentionne. La ZIP 2009 exige que les nœuds déploient la nouvelle politique de relais avant que les portefeuilles n'adoptent ces frais ; les nœuds utilisant les anciens paramètres peuvent refuser de relayer la transaction à frais réduits. Le Testnet et le Mainnet ont par ailleurs des hauteurs d'activation différentes.

### Si l'estimation semble incorrecte

Vérifiez que votre portefeuille est à jour et synchronisé. Comparez séparément ses frais de réseau et les frais de retrait du service émetteur : le tarif d'un service n'est pas la formule de la ZIP 317. Pour un paiement en attente, suivez les [étapes de dépannage ci-dessous](#troubleshooting-stuck-transactions) avant de renvoyer.

La ZIP 317 est une politique des portefeuilles et des nœuds, et non une règle de consensus imposant ces frais exacts. Payer les frais conventionnels améliore la compatibilité de relais ; cela ne garantit pas un délai de confirmation.

## Dépannage des transactions bloquées

Une transaction Zcash n'est pas définitive simplement parce qu'elle apparaît dans votre portefeuille. Elle devient définitive pour un usage courant après avoir été minée dans un bloc et avoir reçu suffisamment de confirmations pour votre situation. Les exchanges et les services peuvent exiger plus de confirmations que ce qu'un portefeuille affiche par défaut.

L'expiration est une **hauteur de bloc**, et non un compte à rebours fixe. Pour un paiement ordinaire dont la hauteur d'expiration n'est pas nulle, cette hauteur correspond au dernier bloc dans lequel il peut être miné. Par exemple, un paiement expirant à la hauteur 3539 peut être inclus dans le bloc 3539 ; le bloc 3540 est trop tard. Une hauteur d'expiration de 0 signifie qu'un paiement ordinaire n'expire pas. Consultez la [ZIP 203](https://zips.z.cash/zip-0203).

Les valeurs par défaut ne sont pas des délais universels. La ZIP 203 prévoyait 40 blocs après Blossom, soit environ 50 minutes avec un espacement cible de 75 secondes. Depuis l'activation de NU7 le 6 novembre 2026 (bloc 3 543 405), l'espacement cible est de 25 secondes et la ZIP 218 recommande une valeur par défaut de 120 blocs, soit toujours environ 50 minutes ([ZIP 218](https://zips.z.cash/zip-0218)). Les paramètres et les implémentations des portefeuilles peuvent varier, et les intervalles réels entre les blocs fluctuent. Vérifiez la hauteur d'expiration de la transaction concernée au lieu de chronométrer un renvoi.

L'expiration n'annule pas un paiement déjà miné et ne crée pas de transaction de remboursement. Si la transaction d'origine a expiré sans être minée, elle n'a jamais été réglée on-chain. Votre portefeuille devra peut-être se synchroniser avant d'afficher de nouveau les fonds concernés comme dépensables.

Utilisez cet arbre de décision avant de renvoyer :

1. **Votre portefeuille affiche-t-il un identifiant de transaction ?**
   - Si non, le portefeuille n'a peut-être pas encore créé ou diffusé la transaction. Vérifiez l'état de la synchronisation, la connexion Internet, la version du portefeuille et tout message d'erreur du portefeuille.
   - Si oui, copiez l'identifiant de transaction et poursuivez.
2. **La transaction est-elle confirmée dans un bloc ?**
   - Si oui, attendez le nombre de confirmations exigé par votre portefeuille, votre exchange, votre commerçant ou votre service.
   - Si non, poursuivez.
3. **La transaction non minée a-t-elle dépassé sa hauteur d'expiration non nulle ?**
   - Si non, ne renvoyez pas encore manuellement le même paiement. La transaction d'origine peut encore être confirmée.
   - Si oui, laissez le portefeuille se synchroniser et vérifiez que la transaction d'origine n'a pas été minée à cette hauteur ou avant. Suivez ensuite les consignes du portefeuille pour créer une transaction de remplacement si nécessaire.
4. **La transaction apparaît-elle sur un serveur ou un explorateur mais pas sur un autre ?**
   - Considérez cela comme un problème de visibilité sur le réseau, et non comme la preuve que la transaction a échoué. Différents nœuds peuvent avoir des vues différentes de la mempool.
   - Attendez, resynchronisez votre portefeuille ou passez à un autre serveur de confiance si votre portefeuille le permet.
5. **La transaction a-t-elle disparu après avoir été affichée comme confirmée ?**
   - Une courte réorganisation de la chaîne peut retirer temporairement une transaction de la meilleure chaîne.
   - Attendez davantage de blocs. Si la transaction réapparaît, continuez à attendre les confirmations. Si elle ne réapparaît pas et expire ensuite, créez une nouvelle transaction.
6. **Le portefeuille vous demande-t-il de renvoyer ?**
   - Suivez les consignes actuelles du portefeuille seulement après avoir vérifié que la transaction précédente a expiré, a échoué ou n'est plus valide.
   - En cas de doute, contactez le support avant de renvoyer.

## En attente, expirée, abandonnée et réorganisée

- **En attente** signifie que la transaction a été créée ou diffusée, mais n'a pas encore été minée dans un bloc.
- **Expirée** signifie que la hauteur d'expiration de la transaction est dépassée. Selon la ZIP 203, une transaction dotée d'une hauteur d'expiration ne peut pas être minée après cette hauteur.
- **Abandonnée** signifie qu'un ou plusieurs nœuds ne conservent plus la transaction dans leur mempool. Cela peut se produire en raison de l'expiration, de frais trop faibles, de la politique de mempool, du comportement au redémarrage ou de différences de relais.
- **Réorganisée** signifie qu'un bloc qui contenait auparavant la transaction ne fait plus partie de la meilleure chaîne. La transaction peut être minée de nouveau plus tard, ou revenir en attente si elle est toujours valide.

## Quand ne pas renvoyer

Ne renvoyez pas immédiatement une transaction simplement parce qu'elle est en attente, lente ou absente d'un explorateur. Renvoyer trop tôt peut semer la confusion et, selon la façon dont le portefeuille construit le nouveau paiement, risquer un double paiement.

Attendez ou contactez d'abord le support lorsque :

- La transaction a un identifiant de transaction et n'a pas expiré.
- Un serveur l'affiche alors qu'un autre ne l'affiche pas.
- Elle a été minée récemment mais a perdu des confirmations après une possible réorganisation.
- Le service destinataire n'a pas fini de compter les confirmations.
- Votre portefeuille est encore en cours de synchronisation.

Il est généralement plus sûr de ne renvoyer qu'une fois que le portefeuille indique clairement que la transaction a expiré ou échoué, ou après que le support a confirmé que la transaction d'origine ne peut pas être confirmée.

## Vérifications respectueuses de la confidentialité

Vous pouvez vérifier l'état de base d'une transaction sans exposer plus d'informations que nécessaire :

- Vérifiez que votre portefeuille est entièrement synchronisé.
- Vérifiez que l'application de portefeuille est à jour.
- Vérifiez que la transaction a un identifiant de transaction.
- Vérifiez si la transaction est confirmée, en attente, expirée ou échouée.
- Vérifiez la hauteur de bloc actuelle et comparez-la à la hauteur d'expiration de la transaction si votre portefeuille l'affiche.
- Pour les transactions transparentes, un explorateur de blocs peut afficher la transaction publique, les adresses, les montants et les confirmations.
- Pour les transactions protégées, un explorateur de blocs peut montrer qu'une transaction existe, mais il ne peut pas afficher l'expéditeur, le destinataire, le montant ni le mémo protégés.

## Ce qu'il ne faut pas partager publiquement

Ne publiez jamais les éléments suivants dans un chat public, sur les réseaux sociaux ou dans un outil de suivi de tickets :

- Phrase de récupération
- Clé de dépense, clé privée ou sauvegarde de portefeuille
- Full Viewing Key
- Captures d'écran montrant des soldes, des adresses complètes, des mémos, des codes QR ou les détails d'un compte d'exchange
- Pièces d'identité personnelles ou documents de récupération de compte

Un identifiant de transaction est public sur la chaîne, mais il peut tout de même relier votre demande d'assistance à votre identité. Si la confidentialité compte pour vous, ne le partagez qu'avec un canal d'assistance de confiance.

## Ce dont les équipes d'assistance ont besoin

Lorsque vous demandez de l'aide au support d'un portefeuille, d'un exchange ou d'un service, ne partagez que le minimum d'informations utiles :

- Nom du portefeuille ou du service
- Version de l'application et système d'exploitation
- Si la transaction est protégée, transparente ou entre adresses protégées et transparentes
- Identifiant de transaction, si vous êtes à l'aise pour le partager
- Heure approximative de l'envoi
- Si le portefeuille est entièrement synchronisé
- État actuel affiché par le portefeuille
- Message d'erreur exact, données privées supprimées
- Capture d'écran avec les soldes, adresses, mémos et détails du compte masqués

Les équipes d'assistance n'ont pas besoin de votre phrase de récupération, de votre clé de dépense, de votre clé privée ni de votre clé complète pour lecture seule.

## Erreurs courantes

- **Supposer que tout portefeuille qui affiche ZEC peut l'envoyer de manière confidentielle.** Un certain nombre de portefeuilles multi-cryptomonnaies ne prennent en charge que la partie transparente de Zcash. Vérifiez les pools pris en charge par le portefeuille avant de compter sur lui pour votre confidentialité. La page [Portefeuilles](https://zechub.wiki/using-zcash/wallets) l'indique pour chaque option.
- **Retirer vers une adresse transparente et y laisser les fonds.** Le retrait lui-même est public, et chaque mouvement ultérieur depuis cette adresse le reste aussi. Protégez les fonds dès leur arrivée.
- **Considérer la confidentialité comme une option qu'on active une fois pour toutes.** Chaque transaction est un choix distinct. Envoyer une transaction protégée aujourd'hui n'efface pas un paiement transparent effectué la semaine dernière.
- **Réutiliser une adresse transparente pour tout.** L'activité transparente étant visible en permanence, une seule adresse réutilisée relie progressivement des paiements qui n'avaient aucune raison d'être liés.
- **Envoyer avec des frais par défaut obsolètes.** Les portefeuilles qui n'ont pas adopté la ZIP 317 peuvent encore envoyer l'ancien montant fixe de frais, ce qui peut laisser une transaction non confirmée.
- **Renvoyer avant l'expiration.** Une transaction en attente peut encore être confirmée jusqu'à son expiration. Vérifiez l'état d'expiration avant de créer un autre paiement.

## Remarque

Notez que la façon la plus sûre d'utiliser ZEC est d'effectuer des transactions protégées chaque fois que l'expéditeur, le destinataire, le portefeuille et le service les prennent tous en charge. Certains portefeuilles et exchanges prennent en charge les [adresses unifiées](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), qui peuvent combiner plusieurs types de récepteurs Zcash en une seule adresse.

## Ressources

- [ZIP 203 : expiration des transactions](https://zips.z.cash/zip-0203)
- [ZIP 317 : mécanisme de frais de transfert proportionnels](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## Pages connexes

- [Portefeuilles](/using-zcash/wallets) - quels portefeuilles prennent en charge l'envoi protégé et lesquels sont uniquement transparents
- [Divulgations de paiement](/zcash-tech/payment-disclosures) - comment un expéditeur peut prouver certains détails d'un paiement protégé
- [Pools protégés](/using-zcash/shielded-pools) - Sapling et Orchard, les pools où se trouvent vos fonds protégés
- [Mémos](/using-zcash/memos) - messages chiffrés pouvant accompagner une transaction protégée
- [Adresses d'exchange transparentes](/using-zcash/transparent-exchange-addresses) - les adresses TEX et pourquoi les exchanges les utilisent
- [Exchanges dépositaires](/using-zcash/custodial-exchanges) - quels exchanges prennent en charge les retraits protégés

## Convertisseur ZEC en ZAT
