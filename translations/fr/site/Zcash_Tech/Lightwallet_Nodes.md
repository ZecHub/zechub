<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


# Nœuds Lightwallet Zcash

## Introduction

La plupart des gens utilisent Zcash via un wallet léger, qui ne télécharge pas toute la blockchain. À la place, il communique avec un serveur qui a déjà effectué ce travail. Cette page explique ce que sont ces serveurs, ce qu’ils peuvent et ne peuvent pas voir à votre sujet, comment faire passer votre connexion par Tor, et comment changer le serveur utilisé par votre wallet.

Deux logiciels servent aujourd’hui les wallets légers. **lightwalletd** est le service d’origine, écrit en Go. **Zaino** est un indexeur plus récent écrit en Rust, conçu dans le cadre du travail de dépréciation de zcashd.

## Ce que fait un serveur de wallet léger

Un serveur de wallet léger se place entre votre wallet et la blockchain Zcash et lui fournit une vue de la chaîne efficace en bande passante. Il fait trois choses pour vous.

Il sert des blocs compacts. Au lieu de blocs complets, il envoie une forme compacte ne contenant que ce dont un wallet a besoin pour détecter un paiement vers son adresse protégée, détecter une dépense de ses notes et mettre à jour ses témoins.

Il relaie vos transactions. Lorsque vous envoyez, votre wallet remet la transaction finalisée au serveur, qui la diffuse au réseau.

Il répond aux requêtes sur la chaîne, comme la hauteur actuelle et les informations de frais dont votre wallet a besoin.

Votre wallet effectue toujours le travail privé localement. Il conserve vos clés, tente de déchiffrer les blocs pour trouver vos notes, et construit et signe les transactions sur votre appareil.

## Ce que le serveur peut et ne peut pas voir

C’est la partie sur laquelle il est facile de se tromper. Vos clés ne quittent jamais votre appareil, mais cela ne veut pas dire que le serveur n’apprend rien à votre sujet.

La référence ici est le [modèle de menace de l’application wallet Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), qui mérite d’être lu en entier si cela vous importe. Il décrit plusieurs types d’adversaires. Celui qui compte pour cette page est un adversaire capable d’observer le trafic entre votre wallet et internet, ainsi qu’entre le serveur et internet. La personne qui exploite le serveur se trouve intrinsèquement en partie dans cette position, puisque votre wallet s’y connecte directement.

Commençons par ce qui est protégé. Contre tout adversaire du modèle, y compris un adversaire ayant compromis le serveur, il « ne peut apprendre aucun des éléments cryptographiques de l’utilisateur (clés de dépense, viewing keys, phrase de récupération, etc.) », ne peut pas voler vos fonds et ne peut pas vous faire envoyer des fonds que vous n’aviez pas l’intention d’envoyer. Les montants et les mémos à l’intérieur des transactions entièrement protégées restent chiffrés.

Ensuite, il y a ce qui n’est pas protégé. Le modèle de menace les liste comme des faiblesses connues face à un adversaire observant le trafic :

| Faiblesse | Comment |
|:--|:--|
| Dire qui vous êtes | « L’adversaire connaît l’adresse IP de l’utilisateur, ce qui pourrait le conduire à l’identité réelle de l’utilisateur » |
| Dire approximativement où vous êtes | En recherchant votre IP « dans une base de données de géolocalisation pour approximer sa localisation » |
| Dire que vous avez envoyé ou reçu une transaction protégée, et quand | L’envoi « utilise plus de bande passante, ce qui est visible même si la connexion est chiffrée ». Le modèle note que l’acte d’envoyer et de recevoir est visible pour le serveur lui-même |
| Compter combien de transactions vous avez effectuées au fil du temps | Les mêmes schémas de bande passante, observés sur une période plus longue |
| Repérer des schémas de paiement récurrents | En observant quand l’activité a lieu |
| Déterminer si une adresse est à vous | Un adversaire qui connaît déjà une adresse « pourrait envoyer des fonds à cette adresse et observer s’il y a des pics de bande passante » lorsque votre wallet la récupère |

Le modèle note aussi que le cas ordinaire suppose « une relation de confiance entre l’utilisateur et l’opérateur du serveur lightwalletd ».

Le résumé honnête est donc le suivant. Un serveur de wallet léger ne peut pas dépenser votre argent et ne peut pas lire les montants ni les mémos de vos transactions protégées. En revanche, il est bien placé pour apprendre votre adresse IP et le moment de votre activité, et ces deux éléments ensemble peuvent en dire long sur une personne. Les transactions protégées protègent ce qui figure sur la blockchain. Elles ne cachent pas, à elles seules, votre connexion au serveur.

## Faire passer la connexion par Tor

Tor rompt le lien entre votre adresse IP et le trafic de votre wallet, ce qui supprime l’identifiant le plus fort du tableau ci-dessus.

La prise en charge existe dans les bibliothèques Rust sur lesquelles de nombreux wallets Zcash s’appuient. zcash_client_backend inclut un module Tor basé sur [Arti](https://tpo.pages.torproject.net/core/arti/), l’implémentation Rust de Tor, de sorte qu’un wallet peut faire passer la synchronisation, la diffusion des transactions et les recherches de prix par Tor sans embarquer un client Tor séparé.

Les développeurs de Zaino avancent le même argument, en citant directement le modèle de menace : il existe « un besoin d’utiliser des protocoles de transport anonymes (tels que Nym ou Tor) pour masquer l’identité des clients vis-à-vis des serveurs d’indexation de Zcash ».

Dans **ZODL**, Tor est un réglage dans les paramètres avancés. Les notes de version du wallet orientent les utilisateurs vers le mode de connexion manuel « ainsi que l’activation de Tor dans Advanced Settings » s’ils « préfèrent réduire l’exposition des métadonnées », et l’application propose d’activer Tor avant de restaurer un wallet, c’est-à-dire au moment où une nouvelle IP serait autrement liée à tout l’historique d’un wallet.

Deux réserves. Tor masque votre IP au serveur, mais ne change pas ce que le serveur apprend à partir des requêtes que vous effectuez. Et le routage en oignon ajoute de la latence, donc la synchronisation prend plus de temps. Exploiter votre propre serveur évite la question de la confiance d’une autre manière, puisque dans ce cas l’opérateur, c’est vous.

## Zaino, l’indexeur Rust

[Zaino](/site/Zcash_Tech/Zaino) est un indexeur écrit en Rust par l’équipe Zingo, conçu pour remplacer lightwalletd dans le cadre du travail de dépréciation de zcashd. Il sert les clients légers, les clients complets et les explorateurs de blocs, en lisant les données de chaîne détenues par « soit un validateur complet Zebra, soit un validateur complet Zcashd ».

Il est en développement actif, avec la version 0.7.0 publiée en août 2026. Il vise à rester rétrocompatible avec lightwalletd lorsque c’est possible, afin que les wallets puissent pointer vers lui sans devoir être réécrits.

Zaino a sa propre page avec des diagrammes d’architecture ; cette page ne couvre donc que son rôle de serveur de wallet léger.

## Liste des serveurs

Le tableau de bord [hosh.zec.rocks](https://hosh.zec.rocks/zec) suit les serveurs publics et leur état de santé, et c’est l’endroit où vérifier ce qui est réellement en ligne. [status.zec.rocks](https://status.zec.rocks/) affiche l’état des services.

Serveurs listés sur ce tableau de bord au moment de la rédaction :

| Serveur | Notes |
|:--|:--|
| zec.rocks:443 | Des points d’accès régionaux sont listés à côté : na.zec.rocks, eu.zec.rocks, ap.zec.rocks et sa.zec.rocks |
| zec-node.cakewallet.com:443 | Sur le domaine de Cake Wallet |
| zec.0xrpc.io:443 | Exploité par 0xRPC, qui propose des endpoints publics gratuits pour plusieurs chaînes et demande des dons pour couvrir la capacité |
| zaino.unsafe.zec.rocks:443 | Une instance Zaino. Notez le nom d’hôte, considérez-la comme expérimentale |
| testnet.zec.rocks:443 | Testnet, avec une instance Zaino de testnet listée sur zaino.testnet.unsafe.zec.rocks |

Vérifiez le tableau de bord plutôt que de faire confiance à cette liste. Les opérateurs vont et viennent, et une page comme celle-ci vieillit.

## Changer le serveur dans votre wallet

Cela vaut la peine si vous voulez choisir un opérateur en qui vous avez confiance, répartir l’activité entre plusieurs opérateurs, ou pointer vers le vôtre.

Les chemins de menu ci-dessous étaient corrects lorsque cette page a été mise à jour, mais les interfaces des wallets évoluent ; considérez-les donc comme une indication plutôt qu’un parcours exact. Cherchez Advanced Settings ou une option de serveur.

#### ZODL

Anciennement Zashi. L’icône en forme de roue dentée en haut à droite, puis Advanced Settings. Tor se trouve sur le même écran. ZODL propose aussi un raccourci Switch server lorsqu’un échec de synchronisation est causé par un serveur obsolète.

#### Ywallet

La roue dentée en haut à droite, puis l’onglet Zcash.

![Paramètres du serveur Ywallet](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Le menu hamburger en haut à gauche, puis Settings, puis faites défiler vers le bas.

![Paramètres du serveur Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Le menu hamburger en haut à gauche, puis Settings, puis Advanced.

![Paramètres du serveur eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Ces captures d’écran ont été prises en mars 2025 et les applications ont publié de nouvelles versions depuis, donc les boutons ont pu changer d’emplacement.

## Exploiter le vôtre

L’option la plus solide consiste à être votre propre opérateur, ce qui supprime entièrement la question de la confiance. Les deux serveurs sont open source : [lightwalletd](https://github.com/zcash/lightwalletd) en Go et [Zaino](https://github.com/zingolabs/zaino) en Rust. Tous deux lisent depuis un validateur complet ; vous voudrez donc aussi [Zebra](/site/Zcash_Tech/Zebra_Full_Node).

## Résumé

Les wallets légers vous donnent accès à la pool protégée sans exiger d’espace disque, ce qui est un bon compromis. Soyez simplement clair sur ce que vous échangez. Le serveur ne peut pas prendre vos fonds ni lire vos montants protégés, mais il est bien placé pour voir votre adresse IP et le moment où vous effectuez des transactions. Passez par Tor, choisissez délibérément votre opérateur, ou exploitez le vôtre.

**Dernière mise à jour :** août 2026
