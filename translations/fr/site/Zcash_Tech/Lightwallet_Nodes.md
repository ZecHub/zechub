<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nœuds de portefeuilles légers Zcash

## En bref

* La plupart des gens utilisent Zcash au moyen d'un portefeuille léger, qui ne télécharge pas toute la blockchain. Il communique plutôt avec un serveur qui a déjà fait ce travail.
* Deux logiciels servent aujourd'hui les portefeuilles légers : **lightwalletd**, le service d'origine écrit en Go, et **Zaino**, un indexeur plus récent écrit en Rust.
* Vos clés ne quittent jamais votre appareil, et le serveur ne peut ni dépenser vos fonds ni lire les montants et les mémos des transactions entièrement protégées.
* Ce que le serveur est bien placé pour connaître, c'est votre adresse IP et le moment de votre activité : les transactions protégées protègent ce qui figure sur la blockchain, pas votre connexion au serveur.
* Tor supprime l'identifiant que constitue l'adresse IP. Il est disponible dans les portefeuilles construits sur `zcash_client_backend` et, dans ZODL, il s'agit d'une option des « Paramètres avancés ».
* Vous pouvez changer le serveur utilisé par votre portefeuille ou faire tourner le vôtre : lightwalletd et Zaino sont tous deux open source.

## Explication principale

La plupart des gens utilisent Zcash au moyen d'un portefeuille léger, qui ne télécharge pas toute la blockchain. Il communique plutôt avec un serveur qui a déjà fait ce travail. Cette page explique ce que sont ces serveurs, ce qu'ils peuvent voir ou non à votre sujet, comment faire passer votre connexion par Tor et comment changer le serveur utilisé par votre portefeuille.

Deux logiciels servent aujourd'hui les portefeuilles légers. **lightwalletd** est le service d'origine, écrit en Go. **Zaino** est un indexeur plus récent écrit en Rust, développé dans le cadre des travaux visant à abandonner zcashd.

### Ce que fait un serveur de portefeuilles légers

Un serveur de portefeuilles légers se place entre votre portefeuille et la blockchain Zcash, et lui fournit une vue de la chaîne économe en bande passante. Il remplit trois fonctions pour vous.

Il sert des blocs compacts. Au lieu de blocs entiers, il envoie une forme compacte qui ne contient que ce dont un portefeuille a besoin pour détecter un paiement vers son adresse protégée, détecter la dépense de ses notes et mettre à jour ses témoins.

Il relaie vos transactions. Lorsque vous envoyez des fonds, votre portefeuille transmet la transaction finalisée au serveur, qui la diffuse sur le réseau.

Il répond aux requêtes sur la chaîne, comme la hauteur actuelle et les informations sur les frais dont votre portefeuille a besoin.

Votre portefeuille effectue toujours localement le travail confidentiel. Il conserve vos clés, effectue le déchiffrement d'essai des blocs pour trouver vos notes, puis construit et signe les transactions sur votre appareil.

### Ce que le serveur peut voir et ne peut pas voir

C'est sur ce point qu'il est facile de se tromper. Vos clés ne quittent jamais votre appareil, mais cela ne signifie pas que le serveur n'apprend rien sur vous.

La référence en la matière est le Zcashmodèle de menace des applications de portefeuille [](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), qui mérite d'être lu en entier si ce sujet vous importe. Il décrit plusieurs types d'adversaires. Celui qui compte pour cette page est un adversaire capable d'observer le trafic entre votre portefeuille et Internet, ainsi qu'entre le serveur et Internet. La personne qui exploite le serveur occupe forcément une partie de cette position, puisque votre portefeuille se connecte directement à elle.

Commençons par ce qui est protégé. Face à tous les adversaires du modèle, y compris celui qui a compromis le serveur, celui-ci « ne peut obtenir aucun élément des clés cryptographiques de l'utilisateur (clés de dépense, clés pour lecture seule, phrase de récupération, etc.) », ne peut pas voler vos fonds et ne peut pas vous amener à envoyer des fonds que vous n'aviez pas l'intention d'envoyer. Les montants et les mémos des transactions entièrement protégées restent chiffrés.

Vient ensuite ce qui n'est pas protégé. Le modèle de menace énumère les faiblesses connues suivantes face à un adversaire qui observe le trafic :

| Faiblesse | Comment |
|:--|:--|
| Savoir qui vous êtes | « L'adversaire connaît l'adresse IP de l'utilisateur, ce qui pourrait le mener à sa véritable identité » |
| Savoir approximativement où vous êtes | En recherchant votre IP « dans une base de données de géolocalisation pour estimer sa position » |
| Savoir que vous avez envoyé ou reçu une transaction protégée, et quand | L'envoi « utilise davantage de bande passante, ce qui est visible même si la connexion est chiffrée ». Le modèle précise que l'acte d'envoyer et de recevoir est visible par le serveur lui-même |
| Compter combien de transactions vous avez effectuées au fil du temps | Les mêmes schémas de bande passante, observés sur une plus longue période |
| Repérer des paiements récurrents | En observant à quel moment l'activité a lieu |
| Déterminer si une adresse vous appartient | Un adversaire qui connaît déjà une adresse « pourrait envoyer des fonds à cette adresse et surveiller l'apparition de pics de bande passante » lorsque votre portefeuille les récupère |

Le modèle précise également que le cas ordinaire suppose « une relation de confiance entre l'utilisateur et l'exploitant du serveur lightwalletd ».

Le résumé honnête est donc le suivant. Un serveur de portefeuilles légers ne peut pas dépenser votre argent, et il ne peut pas lire les montants ni les mémos de vos transactions protégées. Ce qu'il est bien placé pour connaître, c'est votre adresse IP et le moment de votre activité, et ces deux éléments réunis peuvent en dire long sur une personne. Les transactions protégées protègent ce qui figure sur la blockchain. Elles ne masquent pas, à elles seules, votre connexion au serveur.

## Illustration et analogie

Imaginez une bibliothèque publique qui conserve tous les journaux jamais imprimés. Un nœud complet est un lecteur qui emporte chez lui l'intégralité des archives. Un portefeuille léger est un lecteur qui demande plutôt au bibliothécaire un résumé quotidien : une simple feuille contenant juste assez d'informations pour repérer si quelque chose le concerne.

Le résumé est scellé : le bibliothécaire le prépare sans pouvoir lire quels éléments vous intéressent, et vous l'ouvrez chez vous avec votre propre clé. C'est le bloc compact, et son ouverture correspond au déchiffrement d'essai sur votre appareil.

Mais le bibliothécaire voit toujours quel lecteur est entré, à quelle heure, et l'épaisseur de la liasse qu'il a emportée. Ce sont l'adresse IP et le moment de l'activité, visibles depuis le comptoir, aussi bien scellée que soit l'enveloppe. Tor revient à envoyer un coursier anonyme : le bibliothécaire remet toujours la même liasse, mais ne sait plus à quelle maison elle est destinée.

## Approfondissement

### Passer par Tor

Tor rompt le lien entre votre adresse IP et le trafic de votre portefeuille, ce qui supprime l'identifiant le plus révélateur du tableau ci-dessus.

La prise en charge existe dans les bibliothèques Rust sur lesquelles reposent de nombreux portefeuilles Zcash. zcash_client_backend comprend un module Tor construit sur [Arti](https://tpo.pages.torproject.net/core/arti/), l'implémentation Rust de Tor. Un portefeuille peut ainsi faire passer la synchronisation, la diffusion des transactions et la consultation des prix par Tor sans embarquer de client Tor distinct.

Les développeurs de Zaino avancent le même argument, en citant directement le modèle de menace : il existe « un besoin d'utiliser des protocoles de transport anonymes (tels que Nym ou Tor) pour masquer l'identité des clients vis-à-vis des serveurs d'indexation de Zcash ».

Dans **ZODL**, Tor est une option des « Paramètres avancés ». Les notes de version du portefeuille orientent les utilisateurs vers le mode de connexion manuelle « en activant également Tor dans les Paramètres avancés » s'ils « préfèrent réduire l'exposition des métadonnées ». L'application propose aussi d'activer Tor avant de restaurer un portefeuille, moment où une nouvelle adresse IP serait sinon liée à tout l'historique d'un portefeuille.

Deux réserves. Tor masque votre IP au serveur, mais ne change rien à ce que le serveur apprend des requêtes que vous effectuez. Par ailleurs, le routage en oignon ajoute de la latence, ce qui allonge la synchronisation. Faire tourner votre propre serveur règle autrement la question de la confiance, puisque l'exploitant, c'est alors vous.

### Zaino, l'indexeur Rust

[Zaino](/zcash-tech/zaino) est un indexeur écrit en Rust par l'équipe Zingo, conçu pour remplacer lightwalletd dans le cadre des travaux visant à abandonner zcashd. Il sert les clients légers, les clients complets et les explorateurs de blocs, en lisant les données de la chaîne détenues par « un validateur complet Zebra ou zcashd ».

Il est en développement actif, et la version 0.8.0 est sortie en août 2026. Il vise à rester rétrocompatible avec lightwalletd dans la mesure du possible, afin que les portefeuilles puissent s'y connecter sans être réécrits.

Zaino dispose de sa propre page avec des schémas d'architecture. Cette page ne traite donc que de son rôle de serveur de portefeuilles légers.

### Faire tourner votre propre serveur

L'option la plus sûre consiste à être votre propre exploitant, ce qui élimine entièrement la question de la confiance. Les deux serveurs sont open source : [lightwalletd](https://github.com/zcash/lightwalletd) en Go et [Zaino](https://github.com/zingolabs/zaino) en Rust. Tous deux lisent les données d'un validateur complet, vous aurez donc aussi besoin de [Zebra](/zcash-tech/zebra-full-node).

## Implications pratiques

### Liste des serveurs

Le tableau de bord [hosh.zec.rocks](https://hosh.zec.rocks/zec) suit les serveurs publics et leur état de santé. C'est là qu'il faut vérifier ce qui fonctionne réellement. [status.zec.rocks](https://status.zec.rocks/) indique l'état des services.

Serveurs répertoriés sur ce tableau de bord au moment de la rédaction :

| Serveur | Remarques |
|:--|:--|
| zec.rocks:443 | Des points d'accès régionaux sont répertoriés à côté : na.zec.rocks, eu.zec.rocks, ap.zec.rocks et sa.zec.rocks |
| zec-node.cakewallet.com:443 | Sur le domaine de Cake Wallet |
| zec.0xrpc.io:443 | Exploité par 0xRPC, qui propose des points d'accès publics gratuits pour un certain nombre de chaînes et sollicite des dons pour couvrir sa capacité |
| zaino.unsafe.zec.rocks:443 | Une instance Zaino. Notez le nom d'hôte et considérez-la comme expérimentale |
| testnet.zec.rocks:443 | Testnet, avec une instance testnet Zaino répertoriée à l'adresse zaino.testnet.unsafe.zec.rocks |

Consultez le tableau de bord plutôt que de vous fier à cette liste. Les exploitants vont et viennent, et une page comme celle-ci vieillit.

### Changer le serveur de votre portefeuille

Cela vaut la peine si vous souhaitez choisir un exploitant de confiance, répartir votre activité entre plusieurs exploitants ou vous connecter à votre propre serveur.

Les chemins de menu ci-dessous étaient corrects lors de la mise à jour de cette page, mais les interfaces des portefeuilles évoluent : considérez-les comme une indication plutôt que comme un itinéraire exact. Cherchez les « Paramètres avancés » ou une option relative au serveur.

#### ZODL

Anciennement Zashi. Touchez la roue dentée en haut à droite, puis « Paramètres avancés ». Tor se trouve sur le même écran. ZODL propose également un raccourci « Changer de serveur » lorsqu'un échec de synchronisation est dû à un serveur obsolète.

#### Ywallet

Touchez la roue dentée en haut à droite, puis l'onglet Zcash.

![Paramètres du serveur Ywallet](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Touchez le menu hamburger en haut à gauche, puis « Paramètres », puis faites défiler vers le bas.

![Paramètres du serveur Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Touchez le menu hamburger en haut à gauche, puis « Paramètres », puis « Avancé ».

![Paramètres du serveur eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Ces captures d'écran ont été prises en mars 2025, et les applications ont publié de nouvelles versions depuis : les boutons ont donc pu changer de place.

## Erreurs courantes

**Penser que le serveur peut lire vos transactions**. Il ne le peut pas. Vos clés restent sur votre appareil, et les montants et les mémos des transactions entièrement protégées restent chiffrés, même face à un adversaire qui a compromis le serveur.

**Confondre « protégé » et « connexion anonyme »**. Les transactions protégées protègent ce qui figure sur la blockchain. Votre adresse IP et le moment de votre activité relèvent d'une couche distincte, et c'est précisément cette couche que voit le serveur.

**Supposer que Tor efface toute trace**. Tor masque votre IP au serveur, mais ne change rien à ce que le serveur apprend des requêtes que vous effectuez, et il ajoute de la latence à la synchronisation.

**Se fier à une liste de serveurs publiée sur une page de wiki**. Les exploitants vont et viennent. Consultez [hosh.zec.rocks](https://hosh.zec.rocks/zec) pour savoir ce qui fonctionne réellement avant de connecter votre portefeuille à quoi que ce soit.

## Résumé

Les portefeuilles légers vous donnent accès au pool protégé sans l'espace disque, ce qui est un bon compromis. Sachez simplement ce que vous échangez. Le serveur ne peut ni prendre vos fonds ni lire vos montants protégés, mais il est bien placé pour voir votre adresse IP et le moment où vous effectuez des transactions. Passez par Tor, choisissez votre exploitant en connaissance de cause ou faites tourner votre propre serveur.

## Pages connexes

- [Qui peut voir votre paiement Zcash](/start-here/who-can-see-your-zcash-payment) : la même question, vue au niveau débutant.
- [Ce qu'un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see) : ce qui est visible on-chain, par opposition à ce qui l'est au niveau du serveur.
- [Zaino](/zcash-tech/zaino) : schémas d'architecture et rôle plus large de l'indexeur Rust.
- [Nœud complet Zebra](/zcash-tech/zebra-full-node) : le validateur dont un serveur de portefeuilles légers lit les données.
- [Synchronisation du portefeuille Zcash](/zcash-tech/zcash-wallet-syncing) : comment votre portefeuille traite les blocs compacts envoyés par un serveur.

**Dernière mise à jour :** août 2026
