<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Synchronisation des portefeuilles Zcash

## En bref

* Comme les transactions Zcash protégées masquent leurs détails, un serveur ne peut pas simplement consulter le solde d'un portefeuille comme il le fait pour des cryptomonnaies transparentes telles que Bitcoin ou Ethereum.
* Les portefeuilles légers téléchargent de petits « blocs compacts » depuis un serveur spécialisé (lightwalletd) et déchiffrent eux-mêmes les données pertinentes avec leurs clés privées.
* Le déchiffrement et le traitement de ces blocs prennent du temps : les portefeuilles utilisent donc des méthodes de synchronisation plus rapides pour vous permettre d'utiliser vos fonds plus tôt.
* Approches notables : Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) et DAGSync, qui est encore à l'état de proposition.
* En général, ces méthodes consomment davantage de mémoire ou de puissance de calcul pour accélérer la synchronisation.

## Explication principale

### Comment fonctionne la synchronisation Zcash

Zcash utilise des preuves à divulgation nulle de connaissance pour protéger les détails des transactions des parties non autorisées. Cette confidentialité complique la synchronisation des portefeuilles légers : ils ne stockent pas la blockchain complète localement et dépendent d'un serveur pour obtenir les informations nécessaires. Avec Bitcoin ou Ethereum, les serveurs peuvent indexer la blockchain et renvoyer rapidement les données d'un compte. Mais avec Zcash, le serveur ne peut pas voir les détails des transactions. Comment un portefeuille léger peut-il alors synchroniser son solde et son historique sans télécharger ni déchiffrer lui-même toute la blockchain ?

Zcash résout ce problème en combinant plusieurs approches. Il dispose d'un serveur spécialisé, lightwalletd, qui filtre les données d'un nœud complet et ne conserve que ce qui est nécessaire pour identifier les transactions. Ces données, appelées blocs compacts, sont beaucoup plus petites que les blocs d'origine. Les portefeuilles légers téléchargent d'abord ces blocs compacts depuis le serveur lightwalletd, puis les déchiffrent avec leurs clés privées.

Même le déchiffrement et le traitement de ces blocs compacts peuvent prendre beaucoup de temps, surtout lorsque chaque bloc contient de nombreuses transactions. Les portefeuilles utilisent donc différentes méthodes pour accélérer la synchronisation et vous permettre d'utiliser vos fonds le plus tôt possible.

## Illustration / analogie

Imaginez la blockchain comme un immense centre de tri rempli de boîtes verrouillées. Avec une cryptomonnaie transparente, l'employé du centre de tri peut lire les étiquettes et vous dire immédiatement quelles boîtes vous appartiennent. Avec Zcash, les étiquettes sont masquées : votre portefeuille doit donc prendre ses clés et vérifier lui-même les boîtes, discrètement, pour trouver celles qu'il peut ouvrir. Les méthodes de synchronisation ci-dessous sont différentes stratégies pour vérifier ces boîtes plus rapidement.

## Approfondissement

### Warp Sync

Warp Sync est une fonctionnalité de YWallet qui saute les étapes intermédiaires de déchiffrement et de traitement de chaque bloc compact pour passer directement au résultat final.

Pour cela, elle s'appuie sur les mathématiques et la cryptographie afin de calculer le résultat final sans passer par chaque étape.

Warp Sync peut traiter des milliers de blocs par seconde, bien plus vite que la méthode de synchronisation habituelle. Les utilisateurs de YWallet bénéficient ainsi de performances rapides et fluides, même avec des centaines de milliers de transactions et de notes reçues sur leurs comptes.

En plus de cette technique qui saute des étapes, YWallet peut traiter plusieurs blocs simultanément, en répartissant la charge sur le matériel disponible pour accélérer encore le processus.

En savoir plus sur [Warp Sync](https://ywallet.app/warp/)

> Warp Sync est présenté ici en tant que technique de synchronisation. Ywallet n'est plus maintenu et ne sera pas mis à jour pour Ironwood : ce n'est donc pas un portefeuille à installer aujourd'hui.

### Spend-before-sync

Spend-before-sync est une nouvelle fonctionnalité du Zcash Mobile Wallet SDK V2 qui permet aux utilisateurs de dépenser instantanément leurs fonds dès l'ouverture de leur portefeuille, sans attendre sa synchronisation complète. Cette fonctionnalité accélère la découverte du solde disponible du portefeuille et améliore l'expérience utilisateur.

Spend-before-sync s'appuie sur un algorithme de synchronisation des blocs compacts qui traite les blocs du serveur lightwalletd dans un ordre non linéaire. Au lieu d'attendre qu'un bloc soit entièrement traité avant de passer au suivant, les portefeuilles peuvent utiliser un peu plus de mémoire et de puissance de calcul pour analyser différentes sections de la blockchain. En général, l'algorithme analyse différentes plages à la recherche de transactions plus récentes pendant que les blocs plus anciens sont téléchargés et traités. Si une note récente non dépensée est découverte, elle est immédiatement rendue disponible.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Développé par l'équipe de Zecwallet, Blaze Sync est un algorithme de synchronisation pour portefeuilles légers qui parcourt la blockchain à rebours, en partant du bloc le plus haut et le plus récent.

Le portefeuille peut ainsi trouver les notes dépensées avant les notes reçues, tout en rendant disponibles les notes non dépensées sans attendre la fin de la synchronisation complète.

En outre, il utilise une synchronisation dans le désordre en dissociant les composants de la synchronisation (téléchargement des blocs, essais de déchiffrement et mise à jour des témoins) et en les traitant en parallèle. Cela demande davantage de mémoire et de ressources processeur, mais multiplie la vitesse de synchronisation par 5.

### DAGSync

DAGSync est un algorithme de synchronisation proposé qui vise à améliorer l'expérience utilisateur des portefeuilles Zcash protégés en accélérant la synchronisation.

Il utilise un [graphe orienté acyclique (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) pour représenter les dépendances entre les notes, les témoins et les nullifiers d'un portefeuille Zcash.

Un DAG est une structure de données composée de nœuds et d'arêtes, chaque arête ayant une direction qui indique une relation entre deux nœuds. Un DAG ne comporte aucun cycle : il est impossible de partir d'un nœud et de suivre les arêtes pour revenir à ce même nœud.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Implications pratiques

Fait intéressant, tous ces mécanismes cherchent à répondre aux questions soulevées par Zcash Security dans son article sur la [messagerie privée évolutive](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) et son lien avec les systèmes de paiement privés. Certains vont même plus loin en téléchargeant depuis les serveurs toutes les données de mémos, à l'exception des données propres à une adresse, ce qui renforce la confidentialité au prix d'un léger surcoût en ressources.

Par ailleurs, la Zcash Foundation étudie d'autres solutions pour améliorer les performances des portefeuilles légers. C'est le cas de l'[Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), une construction que la fondation étudie « afin de déterminer si elle offre une solution potentielle aux récents problèmes de performance qui ont touché les utilisateurs de portefeuilles Zcash ».

## Erreurs courantes

**Croire que le serveur lightwalletd connaît votre solde.** Le serveur ne fournit que des blocs compacts ; votre portefeuille les déchiffre et les interprète localement avec vos propres clés.

**Interrompre la synchronisation trop tôt.** Certaines méthodes rendent les fonds récents disponibles avant la fin de la synchronisation complète, mais l'historique et les notes plus anciens peuvent encore être en cours de traitement.

**Comparer directement la synchronisation Zcash à celle d'une chaîne transparente.** Une synchronisation plus lente peut être le prix de la confidentialité, et non un défaut : le portefeuille effectue un travail qu'un serveur de cryptomonnaie publique ferait autrement en lisant ouvertement votre compte.


## Pages associées

- [Nœuds pour portefeuilles légers](/zcash-tech/lightwallet-nodes) : l'infrastructure lightwalletd sur laquelle reposent les portefeuilles légers.
- [Viewing Keys](/zcash-tech/viewing-keys) : les clés que les portefeuilles utilisent pour détecter et déchiffrer leurs propres notes.
- [Pepper Sync](/zcash-tech/pepper-sync) : une autre approche de la synchronisation des portefeuilles Zcash.
- [FROST](/zcash-tech/frost) : une autorité de signature distribuée pour les ZEC protégés.
