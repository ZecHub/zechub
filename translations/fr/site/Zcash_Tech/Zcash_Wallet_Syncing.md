<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Synchronisation des portefeuilles Zcash

### Comment fonctionne la synchronisation de Zcash

Pour comprendre comment fonctionne la warp sync, laissez-moi expliquer un peu plus en détail Zcash. Il s’agit d’une cryptomonnaie axée sur la confidentialité qui utilise une technologie appelée preuves à divulgation nulle de connaissance pour protéger les détails des transactions contre toute personne qui n’est pas autorisée à les voir. Cela signifie que les transactions enregistrées sur la blockchain sont chiffrées ou masquées, et que seuls l’expéditeur et le destinataire peuvent les déchiffrer avec leurs clés privées.

Cependant, cela pose aussi un défi pour les portefeuilles légers, qui sont des applications ne stockant pas l’intégralité des données de la blockchain sur l’appareil, mais s’appuyant sur un serveur pour leur fournir les informations nécessaires. Avec des monnaies non axées sur la confidentialité, comme Bitcoin ou Ethereum, le serveur peut facilement indexer la blockchain et conserver une base de données de chaque compte. Lorsqu’un portefeuille léger demande les données spécifiques à son compte, le serveur peut les renvoyer rapidement.

Mais avec Zcash, le serveur ne peut pas faire cela, parce qu’il ne peut pas voir les détails des transactions. Alors comment un portefeuille léger peut-il synchroniser le solde de son compte et son historique de transactions sans télécharger et déchiffrer lui-même l’intégralité des données de la blockchain ?

Zcash résout ce problème en utilisant une approche mixte. Il dispose d’un serveur spécialisé appelé lightwalletd qui filtre les données d’un nœud complet et ne conserve que celles nécessaires à l’identification des transactions. Ces données sont appelées blocs compacts, et elles sont beaucoup plus petites que les blocs d’origine. Les portefeuilles légers n’ont qu’à télécharger ces blocs compacts depuis le serveur lightwalletd, puis à les déchiffrer eux-mêmes avec leurs clés privées.

Cependant, même le déchiffrement et le traitement de ces blocs compacts peuvent prendre un temps considérable, surtout s’il y a de nombreuses transactions dans chaque bloc. C’est pourquoi chaque portefeuille possède sa propre méthode alternative pour accélérer le processus de synchronisation afin que vous puissiez utiliser vos fonds le plus rapidement possible.

### Warp Sync
Warp sync est une fonctionnalité de YWallet qui lui permet d’ignorer les étapes intermédiaires de déchiffrement et de traitement de chaque bloc compact, et de passer directement au résultat final.

Pour ce faire, elle utilise des mathématiques et de la cryptographie ingénieuses afin de calculer le résultat final sans avoir à passer par chaque étape. 

Warp sync peut traiter des milliers de blocs par seconde, bien plus rapidement que la méthode de synchronisation habituelle. Cela signifie que les utilisateurs de YWallet peuvent bénéficier de performances rapides et fluides, même avec des centaines de milliers de transactions et de notes reçues dans leurs comptes.

En plus de cette technique de **saut d’étapes**, YWallet est également capable de traiter plusieurs blocs en même temps, en répartissant la charge sur le matériel disponible, ce qui rend le processus encore plus rapide.

En savoir plus sur [Warp Sync](https://ywallet.app/warp/)

### Dépenser avant synchronisation
Dépenser avant synchronisation est une nouvelle fonctionnalité implémentée dans Zcash Mobile Wallet SDK V2, qui permet aux utilisateurs de dépenser instantanément des fonds à l’ouverture de leur portefeuille, sans avoir à attendre une synchronisation complète du portefeuille. Cette fonctionnalité accélère la découverte du solde dépensable du portefeuille et améliore l’expérience utilisateur.

Le mode dépenser avant synchronisation fonctionne en utilisant un algorithme de synchronisation de blocs compacts qui traite les blocs du serveur lightwalletd dans un ordre non linéaire ; cela signifie qu’au lieu d’attendre qu’un bloc soit traité avant de passer à un autre, les portefeuilles peuvent désormais utiliser un peu plus de mémoire et de puissance de traitement pour analyser différentes sections de la blockchain. Généralement, il analysera différentes plages, en recherchant des transactions plus récentes en même temps que les blocs plus anciens sont téléchargés et traités. Si une note récente non dépensée est découverte, elle sera rendue disponible immédiatement.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync
Développé par l’équipe Zecwallet, Blaze sync est un algorithme de synchronisation pour les portefeuilles légers qui commence à analyser la blockchain « en arrière », en partant du bloc le plus élevé et le plus récent, puis en remontant à partir de là.

Cela permet au portefeuille de trouver les notes dépensées avant celles reçues, tout en rendant disponibles celles déjà non dépensées, sans attendre la fin du processus complet de synchronisation.

En outre, il utilise la synchronisation hors ordre, en dissociant « les composants de la synchronisation les uns des autres - téléchargement des blocs, déchiffrements d’essai, mise à jour des témoins », et en les traitant en parallèle, ce qui consomme un peu plus de mémoire et de ressources CPU, mais augmente la vitesse de synchronisation par 5.

### DAGSync

DAGSync est un algorithme de synchronisation proposé qui vise à améliorer l’expérience utilisateur des portefeuilles protégés de Zcash, en rendant la synchronisation plus rapide.

Il repose sur [l’idée d’utiliser un graphe orienté acyclique](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) (DAG) pour représenter les dépendances entre les notes, les témoins et les nullifiers dans un portefeuille Zcash. 

Un DAG est une structure de données composée de nœuds et d’arêtes, où chaque arête a une direction indiquant une relation entre deux nœuds. Un DAG n’a pas de cycles, ce qui signifie qu’il n’existe aucun moyen de partir d’un nœud et de suivre les arêtes pour revenir au même nœud.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

---

Fait intéressant, tous ces mécanismes tentent de répondre aux questions soulevées par Zcash Security dans son billet sur le [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) et sa relation avec les systèmes de paiement privés, certains allant même jusqu’à télécharger toutes les données de mémo depuis les serveurs, à l’exception de celles exclusives à une adresse, ce qui augmente la confidentialité au prix d’un léger surcoût en ressources.

Par ailleurs, la Zcash Foundation s’est penchée sur d’autres alternatives pour améliorer les performances des portefeuilles légers. C’est le cas de [Oblivious Message Retrieval (OMR](https://zfnd.org/oblivious-message-retrieval/)), une construction que la fondation étudie « afin de déterminer si elle offre une solution potentielle aux récents problèmes de performance qui ont affecté les utilisateurs de portefeuilles Zcash »
