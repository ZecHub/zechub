<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nœuds de portefeuille léger Zcash

## TL;DR

* La plupart des gens utilisent Zcash via un portefeuille léger, qui ne télécharge pas toute la blockchain. Il communique plutôt avec un serveur qui a déjà effectué ce travail.
* Deux logiciels servent aujourd'hui les portefeuilles légers : **lightwalletd**, le service d'origine écrit en Go, et **Zaino**, un indexeur plus récent écrit en Rust.
* Vos clés ne quittent jamais votre appareil, et le serveur ne peut ni dépenser vos fonds ni lire les montants et mémos contenus dans les transactions entièrement blindées.
* Ce que le serveur est bien placé pour apprendre, c'est votre adresse IP et le moment de votre activité — les transactions blindées protègent ce qui se passe sur la blockchain, pas votre connexion au serveur.
* Tor supprime l'identifiant IP ; il est disponible dans les portefeuilles construits sur `zcash_client_backend`, et dans ZODL il s'agit d'un paramètre des Paramètres avancés.
* Vous pouvez changer le serveur utilisé par votre portefeuille, ou exécuter le vôtre — lightwalletd et Zaino sont tous deux open source.

## Explication essentielle

La plupart des gens utilisent Zcash via un portefeuille léger, qui ne télécharge pas toute la blockchain. Il communique plutôt avec un serveur qui a déjà effectué ce travail. Cette page explique ce que sont ces serveurs, ce qu'ils peuvent et ne peuvent pas voir de vous, comment acheminer votre connexion via Tor et comment changer le serveur utilisé par votre portefeuille.

Deux logiciels servent aujourd'hui les portefeuilles légers. **lightwalletd** est le service d'origine, écrit en Go. **Zaino** est un indexeur plus récent écrit en Rust, développé dans le cadre des travaux de dépréciation de zcashd.

### Ce que fait un serveur de portefeuille léger

Un serveur de portefeuille léger se situe entre votre portefeuille et la blockchain Zcash et lui fournit une vue de la chaîne efficace en bande passante. Il fait trois choses pour vous.

Il sert des blocs compacts. Plutôt que des blocs entiers, il envoie une forme compacte ne contenant que ce dont un portefeuille a besoin pour détecter un paiement vers son adresse blindée, détecter une dépense de ses notes et mettre à jour ses témoins.

Il relaie vos transactions. Lorsque vous envoyez des fonds, votre portefeuille remet la transaction finalisée au serveur, qui la diffuse sur le réseau.

Il répond aux requêtes sur la chaîne, comme la hauteur actuelle et les informations sur les frais dont votre portefeuille a besoin.

Votre portefeuille effectue toujours le travail privé localement. Il conserve vos clés, essaie de déchiffrer les blocs pour trouver vos notes, et construit et signe les transactions sur votre appareil.

### Ce que le serveur peut et ne peut pas voir

C'est la partie qu'il est facile de mal comprendre. Vos clés ne quittent jamais votre appareil, mais cela ne signifie pas que le serveur n'apprend rien à votre sujet.

La référence est ici le [modèle de menace de l'application de portefeuille Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), qui mérite d'être lu intégralement si cela vous importe. Il décrit plusieurs types d'adversaires. Celui qui compte pour cette page est un adversaire capable d'observer le trafic entre votre portefeuille et Internet, ainsi qu'entre le serveur et Internet. Quiconque exploite le serveur se trouve intrinsèquement en partie dans cette position, car votre portefeuille s'y connecte directement.

Commençons par ce qui est protégé. Contre tous les adversaires du modèle, y compris celui qui a compromis le serveur, il « ne peut apprendre aucun élément du matériel cryptographique de l'utilisateur (clés de dépense, clés de visualisation, phrase de récupération, etc.) », ne peut pas voler vos fonds et ne peut pas vous faire envoyer des fonds que vous n'aviez pas l'intention d'envoyer. Les montants et mémos contenus dans les transactions entièrement blindées restent chiffrés.

Il y a ensuite ce qui n'est pas protégé. Le modèle de menace énumère les faiblesses connues suivantes face à un adversaire observant le trafic :

| Faiblesse | Comment |
|:--|:--|
| Déterminer qui vous êtes | « L'adversaire connaît l'adresse IP de l'utilisateur, ce qui pourrait le conduire à l'identité réelle de l'utilisateur » |
| Déterminer approximativement où vous êtes | Rechercher votre IP « dans une base de données de géolocalisation afin d'approximer sa position » |
| Déterminer que vous avez envoyé ou reçu une transaction blindée, et à quel moment | L'envoi « utilise davantage de bande passante, ce qui est visible même si la connexion est chiffrée ». Le modèle note que l'acte d'envoyer et de recevoir est visible par le serveur lui-même |
| Compter le nombre de transactions que vous avez effectuées au fil du temps | Les mêmes schémas de bande passante, observés sur une période plus longue |
| Repérer des schémas de paiement récurrents | Observer le moment où l'activité se produit |
| Déterminer si une adresse est la vôtre | Un adversaire qui connaît déjà une adresse « pourrait envoyer des fonds à cette adresse et observer s'il y a des pics de bande passante » lorsque votre portefeuille les récupère |

Le modèle note également que le cas ordinaire suppose « une relation de confiance entre l'utilisateur et l'opérateur du serveur lightwalletd ».

Voici donc le résumé honnête. Un serveur de portefeuille léger ne peut pas dépenser votre argent et ne peut pas lire les montants ou mémos de vos transactions blindées. Ce qu'il est bien placé pour apprendre, c'est votre adresse IP et le moment de votre activité, et ces deux éléments réunis peuvent en dire beaucoup sur une personne. Les transactions blindées protègent ce qui se passe sur la blockchain. Elles ne masquent pas, à elles seules, votre connexion au serveur.

## Visuel / Analogie

Imaginez une bibliothèque publique qui conserve tous les journaux jamais imprimés. Un nœud complet est un lecteur qui emporte chez lui l'intégralité des archives. Un portefeuille léger est un lecteur qui demande plutôt à la bibliothécaire un résumé quotidien — une mince feuille contenant juste assez d'informations pour repérer si quelque chose le concerne.

Le résumé est scellé : la bibliothécaire l'assemble sans pouvoir lire quels éléments vous importent, et vous l'ouvrez chez vous avec votre propre clé. C'est le bloc compact, et l'ouverture est le déchiffrement par essai sur votre appareil.

Mais la bibliothécaire voit toujours quel lecteur entre, à quel moment et quelle épaisseur fait le paquet qu'il emporte. Ce sont l'adresse IP et le moment — visibles depuis le comptoir, quelle que soit la qualité du scellement de l'enveloppe. Tor équivaut à envoyer un coursier anonyme : la bibliothécaire remet toujours le même paquet, mais ne sait plus vers quelle maison il se dirige.

## Analyse approfondie

### Acheminement via Tor

Tor rompt le lien entre votre adresse IP et le trafic de votre portefeuille, ce qui supprime l'identifiant le plus fort du tableau ci-dessus.

La prise en charge existe dans les bibliothèques Rust sur lesquelles sont construits de nombreux portefeuilles Zcash. zcash_client_backend comprend un module Tor fondé sur [Arti](https://tpo.pages.torproject.net/core/arti/), l'implémentation Rust de Tor ; un portefeuille peut ainsi acheminer la synchronisation, la diffusion des transactions et les recherches de prix via Tor sans distribuer de client Tor distinct.

Les développeurs de Zaino défendent le même argument, en citant directement le modèle de menace : il existe « un besoin d'utiliser des protocoles de transport anonymes (tels que Nym ou Tor) pour masquer l'identité des clients auprès des serveurs d'indexation de Zcash ».

Dans **ZODL**, Tor est un paramètre des Paramètres avancés. Les notes de version du portefeuille indiquent aux utilisateurs le mode de connexion manuel « ainsi que l'activation de Tor dans les Paramètres avancés » s'ils « préfèrent réduire l'exposition des métadonnées », et l'application propose d'activer Tor avant de restaurer un portefeuille, moment auquel une nouvelle IP serait autrement associée à tout l'historique d'un portefeuille.

Deux réserves. Tor masque votre IP au serveur, mais ne change pas ce que le serveur apprend des requêtes que vous effectuez. Et le routage en oignon ajoute de la latence, donc la synchronisation prend plus de temps. Exécuter votre propre serveur évite autrement la question de la confiance, puisque vous êtes alors l'opérateur.

### Zaino, l'indexeur Rust

[Zaino](/zcash-tech/zaino) est un indexeur écrit en Rust par l'équipe Zingo, conçu pour remplacer lightwalletd dans le cadre des travaux de dépréciation de zcashd. Il sert les clients légers, les clients complets et les explorateurs de blocs, en lisant les données de chaîne détenues par « un validateur complet Zebra ou Zcashd ».

Il est en développement actif, la version 0.8.0 étant sortie en août 2026. Il vise à rester rétrocompatible avec lightwalletd lorsque cela est possible, afin que les portefeuilles puissent l'utiliser sans être réécrits.

Zaino possède sa propre page avec des diagrammes d'architecture ; cette page ne couvre donc que son rôle de serveur de portefeuille léger.

### Exécuter le vôtre

L'option la plus robuste consiste à être votre propre opérateur, ce qui élimine entièrement la question de la confiance. Les deux serveurs sont open source : [lightwalletd](https://github.com/zcash/lightwalletd) en Go et [Zaino](https://github.com/zingolabs/zaino) en Rust. Tous deux lisent les données d'un validateur complet ; vous voudrez donc aussi [Zebra](/zcash-tech/zebra-full-node).

## Implications pratiques

### Liste des serveurs

Le tableau de bord [hosh.zec.rocks](https://hosh.zec.rocks/zec) suit les serveurs publics et leur état de santé, et c'est l'endroit où vérifier ce qui est réellement actif. [status.zec.rocks](https://status.zec.rocks/) affiche l'état des services.

Serveurs répertoriés sur ce tableau de bord au moment de la rédaction :

| Serveur | Notes |
|:--|:--|
| zec.rocks:443 | Des points de terminaison régionaux sont répertoriés à ses côtés : na.zec.rocks, eu.zec.rocks, ap.zec.rocks et sa.zec.rocks |
| zec-node.cakewallet.com:443 | Sur le domaine de Cake Wallet |
| zec.0xrpc.io:443 | Exploité par 0xRPC, qui propose des points de terminaison publics gratuits pour plusieurs chaînes et demande des dons pour couvrir la capacité |
| zaino.unsafe.zec.rocks:443 | Une instance Zaino. Notez le nom d'hôte et considérez-la comme expérimentale |
| testnet.zec.rocks:443 | Testnet, avec une instance Zaino testnet répertoriée à zaino.testnet.unsafe.zec.rocks |

Consultez le tableau de bord plutôt que de vous fier à cette liste. Les opérateurs apparaissent et disparaissent, et une page comme celle-ci vieillit.

### Changer le serveur dans votre portefeuille

Cela vaut la peine si vous souhaitez choisir un opérateur auquel vous faites confiance, répartir l'activité entre plusieurs opérateurs ou utiliser le vôtre.

Les chemins de menu ci-dessous étaient corrects lors de la mise à jour de cette page, mais les interfaces de portefeuille évoluent ; considérez-les donc comme une indication plutôt qu'un chemin exact. Cherchez les Paramètres avancés ou une option de serveur.

#### ZODL

Anciennement Zashi. L'engrenage dans le coin supérieur droit, puis Paramètres avancés. Tor se trouve sur le même écran. ZODL propose également un raccourci Changer de serveur lorsqu'un échec de synchronisation est causé par un serveur obsolète.

#### Ywallet

L'engrenage dans le coin supérieur droit, puis l'onglet Zcash.

![Paramètres du serveur Ywallet](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Le menu hamburger dans le coin supérieur gauche, puis Paramètres, puis faites défiler vers le bas.

![Paramètres du serveur Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Le menu hamburger dans le coin supérieur gauche, puis Paramètres, puis Avancé.

![Paramètres du serveur eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Ces captures d'écran ont été prises en mars 2025 et les applications ont publié des versions depuis ; les boutons ont donc peut-être été déplacés.

## Erreurs fréquentes

**Penser que le serveur peut lire vos transactions**. Ce n'est pas le cas. Vos clés restent sur votre appareil, et les montants et mémos contenus dans les transactions entièrement blindées restent chiffrés — même face à un adversaire ayant compromis le serveur.

**Comprendre « blindé » comme « connexion anonyme »**. Les transactions blindées protègent ce qui se passe sur la blockchain. Votre adresse IP et le moment de votre activité constituent une couche distincte, et c'est précisément cette couche que le serveur voit.

**Supposer que Tor efface toute trace**. Tor masque votre IP au serveur, mais ne change pas ce que le serveur apprend des requêtes que vous effectuez, et il ajoute de la latence à la synchronisation.

**Faire confiance à une liste de serveurs sur une page wiki**. Les opérateurs apparaissent et disparaissent. Consultez [hosh.zec.rocks](https://hosh.zec.rocks/zec) pour voir ce qui fonctionne réellement avant de diriger votre portefeuille vers quoi que ce soit.

## Résumé

Les portefeuilles légers vous donnent accès au pool blindé sans l'espace disque, ce qui est un bon compromis. Soyez simplement clair sur ce que vous échangez. Le serveur ne peut ni prendre vos fonds ni lire vos montants blindés, mais il est bien placé pour voir votre adresse IP et le moment où vous effectuez des transactions. Utilisez Tor, choisissez délibérément votre opérateur ou exécutez le vôtre.

## Pages associées

- [Qui peut voir votre paiement Zcash](/start-here/who-can-see-your-zcash-payment) — la vue destinée aux débutants sur la même question.
- [Ce qu'un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see) — ce qui est visible sur la chaîne, par opposition à ce qui l'est au niveau du serveur.
- [Zaino](/zcash-tech/zaino) — diagrammes d'architecture et rôle plus large de l'indexeur Rust.
- [Nœud complet Zebra](/zcash-tech/zebra-full-node) — le validateur depuis lequel un serveur de portefeuille léger lit les données.
- [Synchronisation du portefeuille Zcash](/zcash-tech/zcash-wallet-syncing) — comment votre portefeuille traite les blocs compacts envoyés par un serveur.

**Dernière mise à jour :** août 2026
