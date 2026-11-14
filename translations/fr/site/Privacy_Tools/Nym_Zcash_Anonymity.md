<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Anonymat par le mixnet Nym pour Zcash

> Dernière vérification : 18 octobre 2026

Les pools protégés de Zcash masquent les montants, les expéditeurs et les destinataires on-chain. Ils ne masquent pas le chemin réseau entre un portefeuille et le serveur lightwallet. Le mixnet de Nym ajoute cette protection manquante au niveau de la couche réseau. En octobre 2026, l'intégration est en service dans des portefeuilles en production (Zingo, Zkool).

Source : [Comment Nym ajoute de l'anonymat aux portefeuilles Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 octobre 2026).

## Ce qui est protégé

Nym découpe les paquets de transaction (généralement 7 à 15 Ko de données de dépense et de preuves ZK) en paquets Sphinx et les achemine à travers le mixnet. Cela permet de :

- Masquer l'adresse IP de l'expéditeur au serveur lightwallet
- Mélanger le trafic avec le reste du trafic Nym
- Fournir environ 17 bits d'entropie avec les paramètres par défaut, avec un ensemble d'anonymat annoncé de plus de 100 000 utilisateurs

Les paiements et les demandes de prix dans Zingo v7 suivent ce chemin par défaut.

## Ce qui n'est pas protégé

La synchronisation de la chaîne, les requêtes de nullifiers, la récupération des transactions et le trafic du mempool utilisent actuellement la connexion normale à l'indexeur. Les métadonnées au niveau de l'appareil ou de l'application en dehors des paquets mélangés sont également hors du périmètre de Nym.

Si votre modèle de menace exige de masquer le trafic de synchronisation, combinez un portefeuille intégrant nativement le mixnet avec NymVPN au niveau du système. Consultez [VPN Nym](/guides/nym-vpn).

## Portefeuilles

| Portefeuille | Statut | Notes |
| --- | --- | --- |
| Zingo v7 | En service, par défaut | `makers run-cli` intègre `nym-proxy`. La session démarre hors ligne ; `--online`, `--remember-online` ou `--server` donne le consentement. |
| Zkool | En service | Intégration native du mixnet. |
| Autres | Via NymVPN | Faites passer le portefeuille par le mode Mixnet au niveau du système. |

Les détails de configuration pour le chemin au niveau du portefeuille se trouvent dans [Acheminer le trafic du portefeuille Zcash via le mixnet Nym](/guides/nym-mixnet-wallet-setup).

## Compromis

Une diffusion acheminée par Nym est environ 12,5 fois plus lente que via le clearnet (~3,4 s). Tor est plus rapide (~3,7 fois) mais utilise des flux FIFO sans mélange, de sorte qu'un adversaire global peut toujours établir des corrélations. Augmenter la base d'utilisateurs partagée de Nym renforce l'anonymat plus efficacement que l'ajout d'un délai supplémentaire.

## Hygiène de la couche applicative : nym-swizzle-zcash

La protection au niveau de la couche réseau ne suffit pas. Même avec un mixnet ou un VPN parfait, un serveur lightwallet peut encore relier des sessions en observant des schémas au niveau de la couche applicative :

- Chaînage des points de reprise : les clients reprennent la synchronisation exactement à partir de `previous end + 1`, de sorte que le serveur peut enchaîner les sessions à partir de la seule hauteur de bloc.
- Synchronisation puis envoi : les portefeuilles se synchronisent juste avant de diffuser, ce qui permet au serveur d'attribuer une transaction à la session de synchronisation précédente.

Le crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) met en œuvre une politique d'hygiène propre à Zcash qui répond à ces deux problèmes. Il regroupe les primitives générales de `nym-swizzle` dans une politique adaptée à la chaîne pour les clients légers.

**Plages de synchronisation quantifiées.** Les requêtes sont élargies selon une grille commune à l'ensemble du réseau, avec des cellules d'une journée. Le début est arrondi vers le bas et la fin vers le haut. Les plages sont déterministes, croissantes et disjointes. Les vérifications de réorganisation restent à l'intérieur de la plage élargie, de sorte que le point de reprise exact n'est pas révélé. L'anonymat provient de la collision (de nombreux portefeuilles émettant les mêmes bornes) plutôt que du bruit.

**Diffusions découplées.** Les envois de transactions sont retardés selon une distribution exponentielle (moyenne de 144 blocs ≈ 3 heures, plafond de 576 blocs ≈ 12 heures), conformément à la planification des transferts du ZIP 318. Les délais dépassent la durée de vie habituelle des processus, c'est pourquoi les planifications sont enregistrées de façon persistante. La transaction n'est construite qu'au moment de l'envoi, à partir d'une extrémité de chaîne à jour. La synchronisation et la diffusion devraient utiliser des serveurs différents.

Le crate expose les traits `BlockSource` et `TxBroadcaster`, se compile pour `wasm32-unknown-unknown` et ne possède pas de pile réseau propre. Consultez la [documentation Nym](https://nym.com/docs/developers/swizzle/zcash) pour l'API complète et des exemples.

## Sources

- [Comment Nym ajoute de l'anonymat aux portefeuilles Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 octobre 2026
- [nym-swizzle-zcash : politique d'hygiène pour les clients légers Zcash](https://nym.com/docs/developers/swizzle/zcash) — Documentation Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Acheminer le trafic du portefeuille Zcash via le mixnet Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [VPN Nym](/guides/nym-vpn) — ZecHub
