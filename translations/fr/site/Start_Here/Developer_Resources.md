<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ressources pour développeurs

Les ressources dont vous avez besoin pour développer sur Zcash, regroupées selon l’usage de chacune plutôt que listées pêle-mêle.

La pile a beaucoup changé en 2026. zcashd, qui a fait fonctionner le réseau pendant la majeure partie de son histoire, a atteint sa fin de vie le 18 juillet 2026 à la hauteur de bloc 3417100, et chaque nœud non modifié s'est arrêté à cette hauteur et refusera de redémarrer. Les guides écrits pour zcashd relèvent désormais de l'histoire plutôt que de constituer un point de départ ; cette page est donc organisée autour de ce qui l'a remplacé.

## La pile en un coup d'œil

| Couche | À utiliser | Commencer par |
|:--|:--|:--|
| Nœud complet | Zebra ou Zakura | [Le livre Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Wallet de nœud complet | Zallet, en bêta | [Le livre Zallet](https://zcash.github.io/zallet/) |
| Serveur de wallet léger | Zaino ou lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Bibliothèques de wallet | Les crates librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | SDK Android et iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Spécification | Spécification du protocole et ZIP | [zips.z.cash](https://zips.z.cash) |

## Nœuds

Un nœud valide le consensus et conserve la chaîne. Il existe deux implémentations activement développées.

[Zebra](/zcash-tech/zebra-full-node) est le nœud de la Zcash Foundation, écrit en Rust, et celui que présupposent désormais la plupart des guides. [Le livre Zebra](https://zebra.zfnd.org/) explique comment l'installer et l'exécuter, et le [dépôt](https://github.com/ZcashFoundation/zebra) est l'endroit où son développement a lieu.

[Zakura](/zcash-tech/zakura-node) est un nœud plus récent, décrit par ses auteurs comme un « nœud complet Zcash compatible avec le consensus, conçu pour passer à l'échelle », avec une synchronisation plus rapide, l'élagage des blocs et un mode de compatibilité zcashd. Il est dirigé par Sean Bowe, cofondateur de Zcash, et Dev Ojha. Son code source est ouvert sous licence Apache 2.0 sur [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub dispose d'une page [Nœuds complets](/zcash-tech/full-nodes) qui couvre les compromis entre eux.

## Le wallet de nœud complet

zcashd intégrait un wallet au nœud. Ce wallet a disparu, et [Zallet](https://github.com/zcash/zallet) le remplace. Le livre Zallet le décrit comme « un wallet Zcash de nœud complet écrit en Rust », « conçu pour remplacer le wallet zcashd ».

Lisez l'avertissement de sécurité avant de vous y fier. Zallet est en bêta, « n'a pas été entièrement audité », des changements incompatibles « peuvent survenir à tout moment et vous obliger à supprimer puis recréer votre wallet Zallet », et toutes les méthodes RPC de zcashd n'ont pas encore été portées.

Si vous migrez une configuration existante, ZecHub propose un [guide de migration de zcashd vers Zebra et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) ainsi qu'une [référence rapide Zallet](/using-zcash/zallet-quick-reference-guide).

## Serveurs de wallet léger

La plupart des wallets n'exécutent pas de nœud. Ils communiquent avec un serveur qui conserve la chaîne et leur en renvoie une vue compacte.

[lightwalletd](https://github.com/zcash/lightwalletd) est le service d'origine, écrit en Go, décrit comme « un service backend qui fournit une interface économe en bande passante vers la blockchain Zcash ». [Zaino](/zcash-tech/zaino) est le nouvel indexeur, écrit en Rust, et lit les données depuis un validateur complet plutôt que de conserver sa propre copie de la chaîne.

La documentation du [protocole de client léger](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) couvre le protocole lui-même. La page [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes) explique ce que ces serveurs peuvent et ne peuvent pas voir à propos d'un utilisateur, ce qui mérite d'être compris avant d'en choisir un.

## Créer un wallet

La plupart du travail sur les wallets s'effectue dans les crates Rust de [librustzcash](https://github.com/zcash/librustzcash), sur lesquelles s'appuient les SDK mobiles et plusieurs wallets de bureau. Chaque crate est documentée sur [docs.rs](https://docs.rs).

| Crate | Utilité |
|:--|:--|
| zcash_client_backend | « API pour créer des clients légers Zcash protégés », incluant la synchronisation et la construction de transactions |
| zcash_client_sqlite | « Un client léger Zcash basé sur SQLite », la couche de stockage pour le précédent |
| zcash_keys | « Gestion des clés et des adresses Zcash » |
| zcash_primitives | « Implémentations Rust des primitives Zcash » |
| zcash_protocol | « Constantes réseau et types de valeurs du protocole Zcash » |
| orchard | « Le protocole de transactions protégées Orchard » |
| sapling-crypto | « Bibliothèque cryptographique pour Zcash Sapling » |
| pczt | « Outils pour travailler avec des transactions Zcash partiellement créées », utilisés pour la signature matérielle et sur plusieurs appareils |
| zip321 | URI de demande de paiement, comme spécifié dans ZIP 321 |

Pour le mobile, le [SDK Android](https://github.com/zcash/zcash-android-wallet-sdk) et le [SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) encapsulent ces bibliothèques. Le dépôt iOS s'appelait auparavant ZcashLightClientKit ; les anciens liens et articles utilisent donc ce nom.

## Spécification et cryptographie

La [spécification du protocole](https://zips.z.cash/protocol/protocol.pdf) fait autorité sur le fonctionnement de Zcash, y compris les [encodages des adresses et des clés](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Les [ZIP](https://zips.z.cash) sont l'endroit où les changements sont proposés et spécifiés, et l'index indique lesquels sont des brouillons et lesquels sont définitifs. Les changements de consensus sont déployés dans les mises à niveau du réseau, que ZecHub suit sur la page [Mises à niveau du réseau](/start-here/network-upgrades).

Pour la cryptographie sous-jacente, lisez [le livre halo2](https://zcash.github.io/halo2/index.html) et [le livre Orchard](https://zcash.github.io/orchard/), ainsi que la documentation des crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) et [orchard](https://docs.rs/orchard/latest/orchard/). [Le livre FROST](https://frost.zfnd.org/) couvre les signatures à seuil, et ZecHub dispose d'une page [FROST](/zcash-tech/frost).

## Testnet

Testnet est une chaîne distincte avec des pièces sans valeur, appelées TAZ. Zebra et Zakura peuvent tous deux s'y exécuter, et le [guide testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) couvre la configuration des nœuds.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) est un explorateur de blocs testnet fonctionnel, avec un équivalent mainnet sur [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Obtenir des TAZ est la partie délicate. Les faucets publics apparaissent et disparaissent, et ceux liés dans l'ancienne documentation ne répondaient pas lors de la rédaction de cette page. La voie fiable consiste à demander sur le Discord R&D de Zcash, ce que recommande d'ailleurs la documentation Zcash elle-même.

## Documentation générale

[Documentation Zcash](https://zcash.readthedocs.io/en/latest/) reste la source unique la plus complète, couvrant les concepts du protocole, l'intégration et le minage. Lisez-la avec prudence. Elle est versionnée par rapport à zcashd, donc certaines parties décrivent un nœud qui ne fonctionne plus, tandis que les sections sur le protocole et les clients légers restent utiles. [Le modèle de menaces de l'application wallet Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) qui s'y trouve mérite d'être lu avant de concevoir quoi que ce soit touchant à la confidentialité des utilisateurs.

Si vous découvrez les blockchains en général, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) est la recommandation habituelle pour les fondamentaux communs et peut être lu gratuitement dans son intégralité. Il ne couvre pas les transactions protégées.

## Autres outils mentionnés par les développeurs

[Arti](https://docs.rs/arti/latest/arti/) est l'implémentation Rust de Tor, utilisée par zcash_client_backend pour acheminer le trafic des wallets. [Tailscale](https://github.com/tailscale/tailscale) est souvent mentionné pour se connecter à un nœud que vous exécutez vous-même. [warp2](https://github.com/hhanh00/warp2) est une implémentation de synchronisation rapide par Hanh, bien qu'elle n'ait pas été mise à jour depuis 2023.

## Communauté et événements

Le [Discord R&D de Zcash](https://discord.gg/6AK7keWFaK) est l'endroit où sont discutés le développement du protocole et des wallets, et le [forum communautaire Zcash](https://forum.zcashcommunity.com/) accueille des propositions plus longues et des fils d'assistance.

Les résultats récents de hackathons donnent une bonne idée de ce que les gens construisent : [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) et le [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Ressources retirées

Conservées parce que d'anciens articles y renvoient et parce qu'elles restent la référence sur le comportement de l'ancien nœud. Ne commencez pas ici.

[Le livre Zcashd](https://zcash.github.io/zcash/) et la [référence RPC zcashd](https://zcash.github.io/rpc/) documentent un logiciel qui a atteint sa [fin de vie](https://zcash.github.io/zcash/user/end-of-life.html) en juillet 2026. Le dépôt [zcash/zcash](https://github.com/zcash/zcash) est archivé.

Si vous avez une ressource à ajouter ou si vous repérez ici quelque chose d'obsolète, ouvrez une issue ou une pull request. Les équipes n'ont pas toujours la capacité de tout maintenir à jour, et signaler ce que vous avez rencontré aide à orienter les guides.

**Dernière mise à jour :** août 2026
