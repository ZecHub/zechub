<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Synchronisation des wallets Zcash

## TL;DR

* Parce que les transactions Zcash protégées masquent leurs détails, un serveur ne peut pas simplement consulter le solde d’un wallet comme il le peut pour des monnaies transparentes telles que Bitcoin ou Ethereum.
* Les wallets légers téléchargent de petits « blocs compacts » depuis un serveur spécialisé (lightwalletd) et déchiffrent eux-mêmes les données pertinentes avec leurs clés privées.
* Le déchiffrement et le traitement de ces blocs prennent du temps ; les wallets utilisent donc des méthodes de synchronisation plus rapides afin de vous permettre d’utiliser vos fonds plus tôt.
* Approches notables : Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) et le DAGSync proposé.
* Ces méthodes échangent généralement davantage de mémoire ou de puissance de traitement contre une synchronisation plus rapide.

## Explication fondamentale

### Fonctionnement de la synchronisation Zcash

Zcash utilise des preuves à divulgation nulle de connaissance pour protéger les détails des transactions contre les parties non autorisées. Cette confidentialité rend la synchronisation plus difficile pour les wallets légers, car ils ne stockent pas l’intégralité de la blockchain localement et dépendent plutôt d’un serveur pour obtenir les informations nécessaires. Avec Bitcoin ou Ethereum, les serveurs peuvent indexer la blockchain et renvoyer rapidement les données d’un compte. Mais avec Zcash, le serveur ne peut pas voir les détails des transactions. Alors, comment un wallet léger peut-il synchroniser son solde et son historique sans télécharger et déchiffrer lui-même toute la blockchain ?

Zcash résout ce problème en combinant plusieurs approches. Il dispose d’un serveur spécialisé, lightwalletd, qui filtre les données d’un nœud complet et ne conserve que ce qui est nécessaire à l’identification des transactions. Ces données sont appelées blocs compacts et sont bien plus petites que les blocs d’origine. Les wallets légers téléchargent d’abord ces blocs compacts depuis le serveur lightwalletd, puis les déchiffrent avec leurs clés privées.

Même le déchiffrement et le traitement de ces blocs compacts peuvent prendre un temps considérable, surtout lorsqu’il y a de nombreuses transactions par bloc. Les wallets utilisent donc différentes méthodes pour accélérer la synchronisation et vous permettre d’utiliser vos fonds dès que possible.

## Visuel / Analogie

Imaginez la blockchain comme une immense salle de courrier remplie de boîtes verrouillées. Avec une monnaie transparente, l’employé de la salle de courrier peut lire les étiquettes et vous dire instantanément quelles boîtes sont les vôtres. Avec Zcash, les étiquettes sont masquées — votre wallet doit donc prendre ses clés et vérifier discrètement lui-même les boîtes pour trouver celles qu’il peut ouvrir. Les méthodes de synchronisation ci-dessous sont différentes stratégies pour vérifier ces boîtes plus rapidement.

## Analyse approfondie

### Warp Sync

Warp sync est une fonctionnalité de YWallet qui ignore les étapes intermédiaires de déchiffrement et de traitement de chaque bloc compact, en allant directement au résultat final.

Pour ce faire, elle utilise les mathématiques et la cryptographie afin de calculer le résultat final sans passer par chaque étape.

Warp sync peut traiter des milliers de blocs par seconde, beaucoup plus rapidement que la méthode de synchronisation habituelle. Cela signifie que les utilisateurs de YWallet peuvent profiter de performances rapides et fluides, même avec des centaines de milliers de transactions et de notes reçues dans leurs comptes.

En plus de cette technique qui évite certaines étapes, YWallet peut traiter plusieurs blocs simultanément, en répartissant la charge sur le matériel disponible afin de rendre le processus encore plus rapide.

En savoir plus sur [Warp Sync](https://ywallet.app/warp/)

> Warp sync est présenté ici comme une technique de synchronisation. Ywallet lui-même n’est plus maintenu et ne sera pas mis à jour pour Ironwood ; ce n’est donc pas un wallet à installer aujourd’hui.

### Dépenser avant la synchronisation

Spend-before-sync est une nouvelle fonctionnalité du Zcash Mobile Wallet SDK V2 qui permet aux utilisateurs de dépenser instantanément des fonds à l’ouverture de leur wallet, sans attendre la synchronisation complète du wallet. Cette fonctionnalité accélère la découverte du solde dépensable du wallet et améliore l’expérience utilisateur.

Spend-before-sync fonctionne en utilisant un algorithme de synchronisation des blocs compacts qui traite les blocs du serveur lightwalletd dans un ordre non linéaire. Cela signifie qu’au lieu d’attendre qu’un bloc soit entièrement traité avant de passer au suivant, les wallets peuvent utiliser un peu plus de mémoire et de puissance de traitement pour analyser différentes sections de la blockchain. En général, il analyse différentes plages, à la recherche de transactions plus récentes pendant que les blocs plus anciens sont téléchargés et traités. Si une note récente non dépensée est découverte, elle sera immédiatement mise à disposition.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Développé par l’équipe Zecwallet, Blaze sync est un algorithme de synchronisation pour les wallets légers qui analyse la blockchain à rebours, en commençant par le bloc le plus élevé et le plus récent, puis en remontant.

Cela permet au wallet de trouver les notes dépensées avant les notes reçues, tout en rendant disponibles les notes auparavant non dépensées sans attendre la fin du processus complet de synchronisation.

De plus, il utilise Out-of-Order Sync en découplant les composants de la synchronisation les uns des autres — téléchargement des blocs, déchiffrements d’essai et mise à jour des témoins — puis en les traitant en parallèle. Cela nécessite davantage de mémoire et de ressources CPU, mais multiplie la vitesse de synchronisation par 5.

### DAGSync

DAGSync est un algorithme de synchronisation proposé qui vise à améliorer l’expérience utilisateur des wallets Zcash protégés en accélérant la synchronisation.

Il utilise un [graphe acyclique orienté (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) pour représenter les dépendances entre les notes, les témoins et les nullifiers dans un wallet Zcash.

Un DAG est une structure de données composée de nœuds et d’arêtes, où chaque arête possède une direction indiquant une relation entre deux nœuds. Un DAG ne comporte aucun cycle, ce qui signifie qu’il n’existe aucun moyen de partir d’un nœud et de suivre les arêtes pour revenir au même nœud.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Implications pratiques

Fait intéressant, tous ces mécanismes visent à répondre aux questions soulevées par Zcash Security dans son article sur [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) et sur sa relation avec les systèmes de paiement privés. Certains vont même jusqu’à télécharger toutes les données de mémo depuis les serveurs, à l’exception des données exclusives à une adresse, améliorant ainsi la confidentialité au prix de quelques ressources supplémentaires.

La Zcash Foundation a également étudié d’autres solutions pour améliorer les performances des wallets légers. C’est le cas de [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), une construction que la fondation étudie « afin de déterminer si elle offre une solution potentielle aux récents problèmes de performance qui ont affecté les utilisateurs de wallets Zcash. »

## Erreurs fréquentes

**Supposer que le serveur lightwalletd connaît votre solde.** Le serveur ne fournit que des blocs compacts ; votre wallet les déchiffre et les interprète localement avec vos propres clés.

**Arrêter la synchronisation trop tôt.** Certaines méthodes rendent les fonds dépensables récents disponibles avant la fin d’une synchronisation complète, mais l’historique et les notes plus anciens peuvent encore être en cours de traitement.

**Comparer directement la synchronisation Zcash à celle d’une chaîne transparente.** Un parcours plus lent peut être le coût de la préservation de la confidentialité, et non un défaut — le wallet effectue un travail qu’un serveur de monnaie publique ferait autrement en lisant ouvertement votre compte.


## Pages associées

- [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes) — l’infrastructure lightwalletd dont dépendent les wallets légers.
- [Clés de visualisation](/zcash-tech/viewing-keys) — les clés que les wallets utilisent pour détecter et déchiffrer leurs propres notes.
- [Pepper Sync](/zcash-tech/pepper-sync) — une autre approche de la synchronisation des wallets Zcash.
- [FROST](/zcash-tech/frost) — autorité de signature distribuée pour les ZEC protégés.
