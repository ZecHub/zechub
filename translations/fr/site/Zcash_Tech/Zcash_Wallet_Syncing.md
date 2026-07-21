<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Synchronisation des portefeuilles Zcash

## TL;DR

* Comme les transactions Zcash blindées masquent leurs détails, un serveur ne peut pas simplement consulter le solde d’un portefeuille comme il peut le faire pour des monnaies transparentes comme Bitcoin ou Ethereum.
* Les portefeuilles légers téléchargent de petits « compact blocks » depuis un serveur spécialisé (`lightwalletd`) et déchiffrent eux-mêmes les données pertinentes avec leurs clés privées.
* Le déchiffrement et le traitement de ces blocs prennent du temps, donc les portefeuilles utilisent des méthodes de synchronisation plus rapides pour vous permettre d’utiliser vos fonds plus tôt.
* Approches notables : Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) et le DAGSync proposé.
* Ces méthodes échangent généralement davantage de mémoire ou de puissance de calcul contre une synchronisation plus rapide.

## Explication de base

### Comment fonctionne la synchronisation de Zcash

Zcash utilise des preuves à divulgation nulle de connaissance pour protéger les détails des transactions contre les parties non autorisées. Cette confidentialité rend la synchronisation plus difficile pour les portefeuilles légers, car ils ne stockent pas la blockchain complète localement et dépendent à la place d’un serveur pour obtenir les informations nécessaires. Avec Bitcoin ou Ethereum, les serveurs peuvent indexer la blockchain et renvoyer rapidement les données des comptes. Mais avec Zcash, le serveur ne peut pas voir les détails des transactions. Alors, comment un portefeuille léger peut-il synchroniser son solde et son historique sans télécharger et déchiffrer lui-même l’intégralité de la blockchain ?

Zcash résout ce problème en combinant plusieurs approches. Il dispose d’un serveur spécialisé, `lightwalletd`, qui filtre les données d’un nœud complet et ne conserve que ce qui est nécessaire à l’identification des transactions. Ces données sont appelées compact blocks et sont beaucoup plus petites que les blocs d’origine. Les portefeuilles légers téléchargent d’abord ces compact blocks depuis le serveur `lightwalletd`, puis les déchiffrent avec leurs clés privées.

Même le déchiffrement et le traitement de ces compact blocks peuvent prendre un temps considérable, surtout lorsqu’il y a beaucoup de transactions par bloc. Les portefeuilles utilisent donc différentes méthodes pour accélérer la synchronisation et vous permettre d’utiliser vos fonds dès que possible.

## Visuel / Analogie

Imaginez la blockchain comme une immense salle de courrier remplie de boîtes verrouillées. Avec une monnaie transparente, le commis de la salle peut lire les étiquettes et vous dire instantanément quelles boîtes sont les vôtres. Avec Zcash, les étiquettes sont cachées — votre portefeuille doit donc prendre ses clés et vérifier discrètement lui-même les boîtes pour trouver celles qu’il peut ouvrir. Les méthodes de synchronisation ci-dessous sont différentes stratégies pour vérifier ces boîtes plus rapidement.

## Approfondissement

### Warp Sync

Warp Sync est une fonctionnalité de YWallet qui saute les étapes intermédiaires de déchiffrement et de traitement de chaque compact block pour aller directement au résultat final.

Pour ce faire, elle utilise les mathématiques et la cryptographie pour calculer le résultat final sans passer par chaque étape.

Warp Sync peut traiter des milliers de blocs par seconde, bien plus rapidement que la méthode de synchronisation habituelle. Cela signifie que les utilisateurs de YWallet peuvent profiter de performances rapides et fluides, même avec des centaines de milliers de transactions et de notes reçues dans leurs comptes.

En plus de cette technique qui saute des étapes, YWallet peut traiter plusieurs blocs simultanément, en répartissant la charge sur le matériel disponible afin de rendre le processus encore plus rapide.

En savoir plus sur [Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync

Spend-before-sync est une nouvelle fonctionnalité du Zcash Mobile Wallet SDK V2 qui permet aux utilisateurs de dépenser instantanément leurs fonds dès l’ouverture de leur portefeuille, sans attendre la synchronisation complète du portefeuille. Cette fonctionnalité accélère la découverte du solde dépensable du portefeuille et améliore l’expérience utilisateur.

Spend-before-sync fonctionne en utilisant un algorithme de synchronisation des compact blocks qui traite les blocs du serveur `lightwalletd` dans un ordre non linéaire. Cela signifie qu’au lieu d’attendre qu’un bloc soit entièrement traité avant de passer au suivant, les portefeuilles peuvent utiliser un peu plus de mémoire et de puissance de calcul pour scanner différentes sections de la blockchain. En général, il analyse différentes plages, en recherchant des transactions plus récentes pendant que les blocs plus anciens sont téléchargés et traités. Si une note récente non dépensée est découverte, elle sera rendue disponible immédiatement.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Développé par l’équipe de Zecwallet, Blaze Sync est un algorithme de synchronisation pour les portefeuilles légers qui analyse la blockchain à rebours, en commençant par le bloc le plus élevé et le plus récent, puis en remontant vers l’arrière.

Cela permet au portefeuille de trouver les notes dépensées avant les notes reçues, tout en rendant disponibles les notes précédemment non dépensées sans attendre la fin du processus complet de synchronisation.

En plus de cela, il utilise la synchronisation hors ordre en dissociant entre eux les composants de la synchronisation — téléchargement des blocs, exécution des déchiffrements d’essai et mise à jour des témoins — et en les traitant en parallèle. Cela consomme davantage de mémoire et de ressources CPU, mais augmente la vitesse de synchronisation par X5.
### DAGSync

DAGSync est un algorithme de synchronisation proposé qui vise à améliorer l’expérience utilisateur des portefeuilles shielded Zcash en accélérant la synchronisation.

Il utilise un [graphe orienté acyclique (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) pour représenter les dépendances entre les notes, les témoins et les nullifiers dans un portefeuille Zcash.

Un DAG est une structure de données composée de nœuds et d’arêtes, où chaque arête a une direction qui indique une relation entre deux nœuds. Un DAG ne comporte aucun cycle, ce qui signifie qu’il n’existe aucun moyen de partir d’un nœud et de suivre les arêtes pour revenir au même nœud.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Implications pratiques

Il est intéressant de noter que tous ces mécanismes visent à répondre aux questions soulevées par Zcash Security dans son article sur le [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) et sa relation avec les systèmes de paiement privés. Certains vont même plus loin en téléchargeant toutes les données de memo depuis les serveurs, à l’exception des données exclusives à une adresse, ce qui augmente la confidentialité au prix d’un peu plus de ressources.

Par ailleurs, la Zcash Foundation s’est penchée sur d’autres alternatives pour améliorer les performances des portefeuilles légers. C’est le cas de [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), une construction que la fondation étudie afin de « déterminer si elle offre une solution potentielle aux récents problèmes de performance qui ont affecté les utilisateurs de portefeuilles Zcash. »

## Erreurs fréquentes

**Supposer que le serveur lightwalletd connaît votre solde.** Le serveur ne fournit que des blocs compacts ; votre portefeuille les déchiffre et les interprète localement avec vos propres clés.

**Arrêter la synchronisation trop tôt.** Certaines méthodes rendent les fonds récemment dépensables disponibles avant qu’une synchronisation complète ne soit terminée, mais l’historique plus ancien et les notes peuvent encore être en cours de traitement.

**Comparer directement la synchronisation de Zcash à celle d’une chaîne transparente.** Un chemin plus lent peut être le prix à payer pour préserver la confidentialité, et non un défaut — le portefeuille effectue un travail qu’un serveur de monnaie publique ferait autrement en lisant ouvertement votre compte.


## Pages liées

- [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes) — l’infrastructure lightwalletd sur laquelle les portefeuilles légers s’appuient.
- [Viewing Keys](/zcash-tech/viewing-keys) — les clés que les portefeuilles utilisent pour détecter et déchiffrer leurs propres notes.
- [Pepper Sync](/zcash-tech/pepper-sync) — une autre approche de la synchronisation des portefeuilles Zcash.
- [FROST](/zcash-tech/frost) — autorité de signature distribuée pour les ZEC shielded.
