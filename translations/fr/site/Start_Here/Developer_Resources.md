<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ressources pour les développeurs

Les ressources dont vous avez besoin pour développer sur Zcash, regroupées selon leur usage plutôt que listées en vrac.

La pile logicielle a beaucoup changé en 2026. zcashd, qui a fait fonctionner le réseau pendant la majeure partie de son histoire, est arrivé en fin de vie le 18 juillet 2026 à la hauteur de bloc 3417100. Tous les nœuds non modifiés se sont arrêtés à cette hauteur et refuseront de redémarrer. Les guides écrits pour zcashd relèvent désormais de l'histoire et ne constituent plus un point de départ. Cette page est donc organisée autour de ce qui l'a remplacé.

## La pile en un coup d'œil

| Couche | Quoi utiliser | Par où commencer |
|:--|:--|:--|
| Nœud complet | Zebra ou Zakura | [Le livre Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Portefeuille de nœud complet | Zallet, en bêta | [Le livre Zallet](https://zcash.github.io/zallet/) |
| Serveur de portefeuille léger | Zaino ou lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Bibliothèques de portefeuille | Les crates librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | SDK Android et iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Spécification | Spécification du protocole et ZIPs | [zips.z.cash](https://zips.z.cash) |

## Nœuds

Un nœud valide le consensus et conserve la chaîne. Il existe deux implémentations activement développées.

[Zebra](/zcash-tech/zebra-full-node) est le nœud de la Zcash Foundation, écrit en Rust. C'est celui que la plupart des guides supposent désormais. [Le livre Zebra](https://zebra.zfnd.org/) explique comment l'installer et le faire fonctionner, et le développement se fait dans le [dépôt](https://github.com/ZcashFoundation/zebra).

[Zakura](/zcash-tech/zakura-node) est un nœud plus récent, que ses auteurs décrivent comme un « nœud complet Zcash compatible avec le consensus, conçu pour passer à l'échelle ». Il offre une synchronisation plus rapide, l'élagage des blocs et un mode de compatibilité zcashd. Il est dirigé par Sean Bowe, cofondateur de Zcash, et Dev Ojha. Il est open source sous licence Apache 2.0 sur [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub propose une page [Nœuds complets](/zcash-tech/full-nodes) qui présente les compromis entre les deux.

## Le portefeuille de nœud complet

zcashd intégrait un portefeuille au nœud. Ce portefeuille a disparu, et [Zallet](https://github.com/zcash/zallet) le remplace. Le livre Zallet le décrit comme « un portefeuille Zcash de nœud complet écrit en Rust », « conçu pour remplacer le portefeuille zcashd ».

Lisez l'avertissement de sécurité avant d'en dépendre. Zallet est en bêta, « n'a pas été entièrement audité », des changements incompatibles « peuvent survenir à tout moment, vous obligeant à supprimer et recréer votre portefeuille Zallet », et toutes les méthodes RPC de zcashd n'ont pas encore été portées.

Si vous migrez une installation existante, ZecHub propose un [guide de migration de zcashd vers Zebra et Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) ainsi qu'un [aide-mémoire Zallet](/using-zcash/zallet-quick-reference-guide).

## Serveurs de portefeuilles légers

La plupart des portefeuilles ne font pas tourner de nœud. Ils communiquent avec un serveur qui conserve la chaîne et leur en renvoie une vue compacte.

[lightwalletd](https://github.com/zcash/lightwalletd) est le service d'origine, écrit en Go, décrit comme « un service backend qui fournit une interface économe en bande passante vers la blockchain Zcash ». [Zaino](/zcash-tech/zaino) est l'indexeur plus récent, écrit en Rust. Il lit les données depuis un validateur complet au lieu de conserver sa propre copie de la chaîne.

La documentation du [protocole client léger](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) décrit le protocole lui-même. La page [Nœuds de portefeuilles légers](/zcash-tech/lightwallet-nodes) explique ce que ces serveurs peuvent et ne peuvent pas voir d'un utilisateur, ce qu'il vaut la peine de comprendre avant d'en choisir un.

## Créer un portefeuille

L'essentiel du travail sur les portefeuilles se fait dans les crates Rust de [librustzcash](https://github.com/zcash/librustzcash), sur lesquelles reposent les SDK mobiles et plusieurs portefeuilles de bureau. Chaque crate est documentée sur [docs.rs](https://docs.rs).

| Crate | À quoi elle sert |
|:--|:--|
| zcash_client_backend | « API pour créer des clients légers Zcash protégés », y compris la synchronisation et la construction des transactions |
| zcash_client_sqlite | « Un client léger Zcash basé sur SQLite », la couche de stockage de la crate précédente |
| zcash_keys | « Gestion des clés et des adresses Zcash » |
| zcash_primitives | « Implémentations Rust des primitives Zcash » |
| zcash_protocol | « Constantes réseau et types de valeur du protocole Zcash » |
| orchard | « Le protocole de transactions protégées Orchard » |
| sapling-crypto | « Bibliothèque cryptographique pour Zcash Sapling » |
| pczt | « Outils pour manipuler des transactions Zcash partiellement créées », utilisée pour la signature sur matériel dédié et multi-appareils |
| zip321 | URI de demande de paiement, tels que spécifiés dans le ZIP 321 |

Pour le mobile, le [SDK Android](https://github.com/zcash/zcash-android-wallet-sdk) et le [SDK iOS](https://github.com/zcash/zcash-swift-wallet-sdk) encapsulent ces bibliothèques. Le dépôt iOS s'appelait auparavant ZcashLightClientKit, les anciens liens et articles utilisent donc ce nom.

## Spécification et cryptographie

La [spécification du protocole](https://zips.z.cash/protocol/protocol.pdf) fait autorité sur le fonctionnement de Zcash, y compris les [encodages des adresses et des clés](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

Les [ZIPs](https://zips.z.cash) sont l'endroit où les changements sont proposés et spécifiés, et l'index indique lesquels sont des brouillons et lesquels sont définitifs. Les changements de consensus sont déployés lors des mises à niveau du réseau, que ZecHub recense sur la page [Mises à niveau du réseau](/start-here/network-upgrades).

Pour la cryptographie sous-jacente, lisez [Le livre halo2](https://zcash.github.io/halo2/index.html) et [Le livre Orchard](https://zcash.github.io/orchard/), ainsi que la documentation des crates [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) et [orchard](https://docs.rs/orchard/latest/orchard/). [Le livre FROST](https://frost.zfnd.org/) traite des signatures à seuil, et ZecHub propose une page [FROST](/zcash-tech/frost).

## Testnet

Le testnet est une chaîne distincte dont les pièces, appelées TAZ, n'ont aucune valeur. Zebra et Zakura peuvent tous deux s'y connecter, et le [guide du testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) décrit la configuration des nœuds.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) est un explorateur de blocs fonctionnel pour le testnet, avec son équivalent pour le mainnet sur [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Obtenir des TAZ est la partie délicate, car les faucets indiqués dans l'ancienne documentation ne répondent plus. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) est un faucet géré par la communauté qui fait tourner « son propre nœud, son propre portefeuille et son propre mineur », distribue des « gouttes protégées z2z » et filtre les demandes par une « preuve de travail dans le navigateur au lieu d'un fournisseur de captcha ». Il est open source sous licence MIT. S'il n'est pas disponible, demandez sur le Zcash R&D Discord, comme le suggère la documentation de Zcash elle-même.

## Documentation générale

La [documentation Zcash](https://zcash.readthedocs.io/en/latest/) reste la source unique la plus complète, couvrant les concepts du protocole, l'intégration et le minage. Lisez-la avec un certain recul. Elle est versionnée par rapport à zcashd, si bien que certaines parties décrivent un nœud qui ne fonctionne plus, tandis que les sections sur le protocole et le client léger restent utiles. Le [modèle de menaces des applications de portefeuille Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) qui s'y trouve mérite d'être lu avant de concevoir quoi que ce soit qui touche à la confidentialité des utilisateurs.

Si vous découvrez les blockchains en général, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) est la recommandation habituelle pour les fondamentaux communs, et peut être lu gratuitement dans son intégralité. Il ne traite pas des transactions protégées.

## Autres outils mentionnés par les développeurs

[Arti](https://docs.rs/arti/latest/arti/) est l'implémentation Rust de Tor, utilisée par zcash_client_backend pour acheminer le trafic des portefeuilles. [Tailscale](https://github.com/tailscale/tailscale) est souvent cité pour se connecter à un nœud que vous faites tourner vous-même. [warp2](https://github.com/hhanh00/warp2) est une implémentation de synchronisation rapide développée par Hanh, bien qu'elle n'ait pas été mise à jour depuis 2023.

## Communauté et événements

Le [Zcash R&D Discord](https://discord.gg/6AK7keWFaK) est l'endroit où l'on discute du développement du protocole et des portefeuilles, et le [forum communautaire Zcash](https://forum.zcashcommunity.com/) accueille les propositions plus longues et les fils d'assistance.

Les résultats des hackathons récents donnent une bonne idée de ce que les gens construisent : [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) et le [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Ressources retirées

Conservées parce que d'anciens articles y renvoient, et parce qu'elles restent la référence sur le comportement du nœud retiré. Ne commencez pas par là.

[Le livre zcashd](https://zcash.github.io/zcash/) et la [référence RPC de zcashd](https://zcash.github.io/rpc/) documentent un logiciel arrivé en [fin de vie](https://zcash.github.io/zcash/user/end-of-life.html) en juillet 2026. Le dépôt [zcash/zcash](https://github.com/zcash/zcash) est archivé.

Si vous avez une ressource à ajouter, ou si vous remarquez ici quelque chose de périmé, ouvrez une issue ou une pull request. Les équipes n'ont pas toujours les moyens de tout maintenir à jour, et signaler ce que vous avez rencontré aide à orienter les guides.

**Dernière mise à jour :** août 2026
