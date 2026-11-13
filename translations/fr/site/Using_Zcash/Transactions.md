<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transactions

ZEC est un actif numérique largement utilisé pour les paiements, offrant de solides fonctionnalités de confidentialité qui le rendent adapté à diverses transactions comme payer des amis, effectuer des achats ou faire des dons. Pour maximiser la confidentialité et la sécurité, il est essentiel de comprendre comment fonctionnent les différents types de transactions au sein de Zcash.

## TL;DR

- Zcash prend en charge deux types de transaction : les transactions **protégées**, qui gardent les détails privés, et les transactions **transparentes**, qui les enregistrent publiquement.
- Les adresses protégées commencent par `u` ou `z`. Les adresses transparentes commencent par `t` et fonctionnent presque comme une adresse Bitcoin.
- Le choix vous appartient à chaque paiement. La confidentialité est une option que Zcash vous offre, pas un paramètre que quelqu’un d’autre décide à votre place.
- Les retraits depuis une plateforme d’échange sont le cas le plus courant où les utilisateurs perdent leur confidentialité. Si la plateforme ne prend en charge que les retraits transparents, protégez vous-même les fonds une fois reçus.
- Les frais suivent [ZIP 317](https://zips.z.cash/zip-0317) et augmentent avec la taille de la transaction. Les wallets qui envoient encore les anciens frais fixes peuvent voir leurs transactions retardées.
- La plupart des transactions Zcash ont une hauteur d’expiration conformément à [ZIP 203](https://zips.z.cash/zip-0203). Si une transaction expire avant d’être minée, elle ne peut pas être confirmée après cette hauteur d’expiration et peut devoir être envoyée de nouveau.

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

Les transactions protégées ont lieu lorsque vous déplacez des ZEC vers votre wallet protégé. L’adresse de votre wallet protégé commence par `u` ou `z`. Lorsque vous envoyez des transactions protégées, vous et les personnes avec qui vous effectuez des transactions pouvez conserver un niveau de confidentialité impossible sur les réseaux de paiement publics par défaut.

Envoyer une transaction protégée est plus simple lorsque vous utilisez un wallet compatible avec le réseau Zcash actuel et les pools protégés actuels. Avant de compter sur un wallet pour votre confidentialité, vérifiez qu’il prend en charge l’envoi protégé, la réception protégée et le pool que vous prévoyez d’utiliser. Lorsque vous retirez des ZEC d’une plateforme d’échange, vérifiez si celle-ci prend en charge les retraits protégés ou transparents. Si elle ne prend en charge que les retraits transparents, transférez les fonds vers un wallet compatible avec les transactions protégées après leur réception.

Utiliser des transactions protégées pour envoyer et recevoir des fonds est le meilleur moyen de préserver votre confidentialité et de réduire le risque de divulgation des données de paiement.

## Transactions transparentes

Les transactions transparentes fonctionnent de manière similaire aux transactions Bitcoin. Les détails des transactions sont visibles publiquement sur la blockchain, y compris les adresses et les montants transparents. Les transactions transparentes doivent être évitées lorsque la confidentialité est une priorité.

Les adresses transparentes restent utiles dans certaines situations, en particulier lorsqu’une plateforme d’échange ou un service ne prend pas en charge les adresses protégées. Si vous recevez des ZEC sur une adresse transparente, envisagez de les protéger avant d’effectuer des paiements ultérieurs.

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

Une transaction transparente est une carte postale. Le facteur la livre, mais toute personne qui la manipule en chemin peut lire le message, voir qui l’a envoyée et qui la reçoit.

Une transaction protégée est une enveloppe scellée. Le service postal confirme toujours qu’une véritable lettre avec un véritable affranchissement est passée par le système, et personne ne peut en falsifier une ni envoyer deux fois la même lettre. Le contenu de l’enveloppe reste entre l’expéditeur et le destinataire.

L’important est que Zcash vous laisse décider laquelle envoyer, paiement par paiement.

## Frais Zcash

Laissez votre wallet calculer les frais de réseau, et vérifiez-les avant d’envoyer. Les frais sont payés en ZEC : **1 ZEC = 100 000 000 zatoshis**. Le montant des frais en dollars américains dépend aussi du taux de change du ZEC.

### Pourquoi deux paiements peuvent avoir des frais différents

[ZIP 317](https://zips.z.cash/zip-0317#fee-calculation) calcule les frais conventionnels à partir des **actions logiques**, plutôt qu'en pourcentage du montant envoyé :

```text
fee in zatoshis = marginal fee × max(2, logical actions)
```

Les actions logiques mesurent les composants d’une transaction. Par exemple, une transaction uniquement Orchard utilise son nombre d’actions Orchard ; une transaction uniquement Sapling utilise le plus grand de ses nombres de dépenses et de sorties. Les contributions des différents pools s’additionnent. Les composants transparents utilisent un calcul basé sur la taille. Consultez la ZIP 317 pour la formule complète, y compris Ironwood et l’ancien Sprout.

Dépenser de nombreuses petites notes reçues ou utiliser plusieurs pools peut donc coûter plus cher qu'un paiement plus simple de même valeur. Le nombre de destinataires ne suffit pas à calculer les frais : la monnaie rendue et le remplissage (padding) comptent aussi.

Ces exemples partent d’un nombre d’actions logiques déjà calculé :

| Actions logiques | À 5 000 zatoshis par action | À 1 000 zatoshis par action |
| --- | --- | --- |
| 2 | 10 000 zatoshis / 0,0001 ZEC | 2 000 zatoshis / 0,00002 ZEC |
| 3 | 15 000 zatoshis / 0,00015 ZEC | 3 000 zatoshis / 0,00003 ZEC |
| 10 | 50 000 zatoshis / 0,0005 ZEC | 10 000 zatoshis / 0,0001 ZEC |

### Quels frais marginaux s'appliquent

**Vérifié le 11 novembre 2026 :** ZIP 317 indique la révision 2 et [ZIP 2009](https://zips.z.cash/zip-2009) comme proposée. Avant la révision 2, les frais marginaux sont de 5 000 zatoshis. La révision 2 les fixe à 1 000, ce qui donne un minimum de 2 000 zatoshis au lieu de 10 000.

La proposition fixe la hauteur du Mainnet à **3 590 000**, attendue vers le 19 novembre 2026, et celle du Testnet à **4 465 026**. Une estimation calendaire ne constitue pas la condition d’activation. Pour les wallets, la hauteur pertinente est celle du bloc dans lequel la transaction devrait être minée ; les nœuds utilisent la hauteur du bloc suivant. Revérifiez les spécifications liées et les consignes de version de votre wallet au fil de l’évolution du déploiement.

N’imposez pas manuellement les frais réduits simplement parce qu’une proposition ou une version logicielle les mentionne. ZIP 2009 exige que les nœuds déploient la nouvelle politique de relais avant que les wallets n’adoptent ces frais ; les nœuds qui utilisent les anciens paramètres peuvent refuser de relayer la transaction aux frais réduits. Le Testnet et le Mainnet ont par ailleurs des hauteurs d’activation différentes.

### Si l’estimation semble incorrecte

Vérifiez que votre wallet est à jour et synchronisé. Comparez séparément ses frais de réseau et les frais de retrait du service d’envoi : un devis du service ne correspond pas à la formule ZIP 317. Pour un paiement en attente, suivez les [étapes de dépannage ci-dessous](#troubleshooting-stuck-transactions) avant de renvoyer.

ZIP 317 est une politique des portefeuilles et des nœuds, et non une règle de consensus imposant ce montant exact de frais. Payer les frais conventionnels améliore la compatibilité de relais ; cela ne garantit pas un délai de confirmation.

## Résolution des transactions bloquées

Une transaction Zcash n’est pas définitive simplement parce qu’elle apparaît dans votre wallet. Elle devient définitive pour un usage courant après avoir été minée dans un bloc et avoir reçu suffisamment de confirmations selon votre situation. Les plateformes d’échange et les services peuvent exiger davantage de confirmations que celles affichées par défaut dans un wallet.

L’expiration correspond à une **hauteur de bloc**, et non à un compte à rebours fixe. Pour un paiement ordinaire dont la hauteur d’expiration est non nulle, cette hauteur correspond au dernier bloc dans lequel il peut être miné. Par exemple, un paiement qui expire à la hauteur 3539 peut être inclus dans le bloc 3539 ; au bloc 3540, il est trop tard. Pour un paiement ordinaire, une hauteur d’expiration de 0 signifie qu’il n’y a pas d’expiration. Voir [ZIP 203](https://zips.z.cash/zip-0203).

Les valeurs par défaut ne sont pas des délais universels. ZIP 203 spécifie 40 blocs après Blossom, soit environ 50 minutes avec un espacement cible de 75 secondes. La modification NU7 proposée recommande 120 blocs avec un espacement cible de 25 secondes, soit également environ 50 minutes ([ZIP 218](https://zips.z.cash/zip-0218)). Les paramètres et les implémentations des wallets peuvent varier, et les intervalles réels entre les blocs fluctuent. Vérifiez la hauteur d'expiration de la transaction concernée plutôt que de vous fier à un délai pour la renvoyer.

L’expiration n’annule pas un paiement déjà miné et ne crée pas de transaction de remboursement. Si la transaction d’origine a expiré sans avoir été minée, elle n’a jamais été réglée on-chain. Votre wallet devra peut-être se synchroniser avant d’afficher de nouveau les fonds concernés comme dépensables.

Utilisez cet arbre de décision avant de renvoyer une transaction :

1. **Votre wallet affiche-t-il un identifiant de transaction ?**
   - Si ce n'est pas le cas, il est possible que le wallet n'ait pas encore créé ou diffusé la transaction. Vérifiez l'état de la synchronisation, la connexion Internet, la version du wallet et tout message d'erreur du wallet.
   - Si c'est le cas, copiez l'identifiant de transaction et continuez.
2. **La transaction est-elle confirmée dans un bloc ?**
   - Si c'est le cas, attendez le nombre de confirmations exigé par votre wallet, votre plateforme d'échange, votre commerçant ou votre service.
   - Si ce n'est pas le cas, continuez.
3. **La transaction non minée a-t-elle dépassé sa hauteur d'expiration non nulle ?**
   - Si ce n'est pas le cas, ne renvoyez pas encore manuellement le même paiement. La transaction d'origine peut encore être confirmée.
   - Si c'est le cas, laissez le wallet se synchroniser et vérifiez que la transaction d'origine n'a pas été minée à cette hauteur ou avant. Suivez ensuite les instructions du wallet pour créer une transaction de remplacement si nécessaire.
4. **La transaction apparaît-elle sur un serveur ou un explorateur mais pas sur un autre ?**
   - Considérez cela comme un problème de visibilité sur le réseau, et non comme la preuve que la transaction a échoué. Différents nœuds peuvent avoir des vues différentes de la mempool.
   - Patientez, resynchronisez votre wallet ou passez à un autre serveur de confiance si votre wallet le permet.
5. **La transaction a-t-elle disparu après être apparue comme confirmée ?**
   - Une courte réorganisation de la chaîne peut retirer temporairement une transaction de la meilleure chaîne.
   - Attendez d'autres blocs. Si la transaction réapparaît, continuez d'attendre les confirmations. Si elle ne réapparaît pas et finit par expirer, créez une nouvelle transaction.
6. **Le wallet vous demande-t-il de renvoyer la transaction ?**
   - Suivez les instructions actuelles du wallet uniquement après avoir vérifié que la transaction précédente a expiré, a échoué ou n'est plus valide.
   - En cas de doute, contactez le support avant de renvoyer des fonds.

## En attente, expirée, abandonnée et réorganisée

- **En attente** signifie que la transaction a été créée ou diffusée, mais n’a pas encore été minée dans un bloc.
- **Expirée** signifie que la hauteur d’expiration de la transaction est dépassée. Conformément à ZIP 203, une transaction avec une hauteur d’expiration ne peut pas être minée après cette hauteur.
- **Abandonnée** signifie qu’un ou plusieurs nœuds ne conservent plus la transaction dans leur mempool. Cela peut se produire en raison de l’expiration, de frais faibles, de la politique du mempool, du comportement au redémarrage ou de différences de relais.
- **Réorganisée** signifie qu’un bloc qui contenait auparavant la transaction ne fait plus partie de la meilleure chaîne. La transaction peut être minée de nouveau ultérieurement, ou revenir en attente si elle est toujours valide.

## Quand ne pas renvoyer une transaction

Ne renvoyez pas immédiatement une transaction simplement parce qu’elle est en attente, lente ou absente d’un explorateur. Renvoyer trop tôt peut créer de la confusion et, selon la façon dont le wallet construit le nouveau paiement, risquer un double paiement.

Attendez ou contactez d’abord le support lorsque :

- La transaction a un identifiant de transaction et n’a pas expiré.
- Un serveur l’affiche alors qu’un autre ne l’affiche pas.
- Elle a récemment été minée, mais a perdu des confirmations après une possible réorganisation.
- Le service destinataire n’a pas fini de comptabiliser les confirmations.
- Votre wallet est encore en cours de synchronisation.

Il est généralement plus sûr de renvoyer une transaction uniquement après que le wallet l’a clairement indiquée comme expirée ou échouée, ou après que le support a confirmé que la transaction d’origine ne peut pas être confirmée.

## Vérifications respectueuses de la confidentialité

Vous pouvez vérifier l’état de base d’une transaction sans exposer plus d’informations que nécessaire :

- Vérifiez que votre wallet est entièrement synchronisé.
- Vérifiez que l’application du wallet est à jour.
- Vérifiez que la transaction possède un identifiant de transaction.
- Vérifiez si la transaction est confirmée, en attente, expirée ou échouée.
- Vérifiez la hauteur actuelle du bloc et comparez-la à la hauteur d’expiration de la transaction si votre wallet l’affiche.
- Pour les transactions transparentes, un explorateur de blocs peut afficher la transaction publique, les adresses, les montants et les confirmations.
- Pour les transactions protégées, un explorateur de blocs peut indiquer qu’une transaction existe, mais il ne peut pas afficher l’expéditeur protégé, le destinataire, le montant ou les détails du mémo.

## Ce qu’il ne faut pas partager publiquement

Ne publiez jamais les éléments suivants dans un chat public, sur les réseaux sociaux ou dans un outil de suivi des problèmes :

- Phrase de départ ou phrase de récupération
- Clé de dépense, clé privée ou sauvegarde de wallet
- Full Viewing Key
- Captures d’écran montrant les soldes, adresses complètes, mémos, codes QR ou détails de compte d’une plateforme d’échange
- Documents d’identité personnels ou dossiers de récupération de compte

Un identifiant de transaction est public sur la chaîne, mais il peut tout de même relier votre demande de support à votre identité. Si la confidentialité compte, ne le partagez qu’avec un canal de support de confiance.

## Ce dont les équipes de support ont besoin

Lorsque vous demandez de l’aide au support d’un wallet, d’une plateforme d’échange ou d’un service, ne partagez que le minimum d’informations utiles :

- Nom du wallet ou du service
- Version de l’application et système d’exploitation
- Si la transaction est protégée, transparente ou entre des adresses protégées et transparentes
- Identifiant de transaction, si vous êtes à l’aise de le partager
- Heure approximative de l’envoi
- Si le wallet est entièrement synchronisé
- État actuel affiché par le wallet
- Message d’erreur exact, avec les données privées supprimées
- Capture d’écran avec les soldes, adresses, mémos et détails de compte masqués

Les équipes de support n’ont pas besoin de votre phrase de départ, clé de dépense, clé privée ou clé de visualisation complète.

## Erreurs fréquentes

- **Supposer que tout wallet proposant ZEC peut l’envoyer de manière privée.** Plusieurs wallets multi-devises ne prennent en charge que le côté transparent de Zcash. Vérifiez les pools pris en charge par le wallet avant de vous y fier pour votre confidentialité. La page [Wallets](https://zechub.wiki/using-zcash/wallets) indique cela pour chaque option.
- **Retirer vers une adresse transparente et y laisser les fonds.** Le retrait lui-même est public, et tout mouvement ultérieur depuis cette adresse reste également public. Protégez les fonds dès leur réception.
- **Considérer la confidentialité comme quelque chose que l’on active une seule fois.** Chaque transaction est un choix distinct. Envoyer une transaction protégée aujourd’hui n’annule pas un paiement transparent effectué la semaine dernière.
- **Réutiliser une adresse transparente pour tout.** Comme l’activité transparente est visible de manière permanente, une même adresse réutilisée relie progressivement des paiements qui n’avaient aucune raison d’être associés.
- **Envoyer avec des frais par défaut obsolètes.** Les wallets qui n’ont pas adopté ZIP 317 peuvent encore envoyer les anciens frais fixes, laissant une transaction sans confirmation.
- **Renvoyer avant l’expiration.** Une transaction en attente peut toujours être confirmée jusqu’à son expiration. Vérifiez l’état d’expiration avant de créer un autre paiement.

## Remarque

Veuillez noter que la manière la plus sûre d’utiliser ZEC consiste à utiliser des transactions protégées chaque fois que l’expéditeur, le destinataire, le wallet et le service les prennent tous en charge. Certains wallets et plateformes d’échange prennent en charge les [adresses unifiées](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), qui peuvent combiner plusieurs types de récepteurs Zcash dans une seule adresse.

## Ressources

- [ZIP 203 : Expiration des transactions](https://zips.z.cash/zip-0203)
- [ZIP 317 : Mécanisme de frais de transfert proportionnels](https://zips.z.cash/zip-0317)
- [ZIPs Zcash](https://zips.z.cash/)

## Pages associées

- [Wallets](/using-zcash/wallets) - quels wallets prennent en charge l’envoi protégé et lesquels sont uniquement transparents
- [Divulgations de paiement](/zcash-tech/payment-disclosures) - comment un expéditeur peut prouver certains détails d’un paiement protégé
- [Pools protégés](/using-zcash/shielded-pools) - Sapling et Orchard, les pools où résident vos fonds protégés
- [Mémos](/using-zcash/memos) - messages chiffrés pouvant accompagner une transaction protégée
- [Adresses d’échange transparentes](/using-zcash/transparent-exchange-addresses) - les adresses TEX et pourquoi les plateformes d’échange les utilisent
- [Plateformes d’échange custodiales](/using-zcash/custodial-exchanges) - quelles plateformes d’échange prennent en charge les retraits protégés

## Convertisseur ZEC vers ZAT
