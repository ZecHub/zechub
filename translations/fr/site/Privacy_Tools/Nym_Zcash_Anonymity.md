<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Anonymat Mixnet de Nym pour Zcash

> Dernière vérification : 18 octobre 2026

Les pools protégés de Zcash masquent les montants, les expéditeurs et les destinataires sur la chaîne. Ils ne masquent pas le chemin réseau entre un wallet et le serveur lightwallet. Le mixnet de Nym ajoute cette protection manquante au niveau réseau. Depuis octobre 2026, l’intégration est active dans des wallets de production (Zingo, Zkool).

Source : [Comment Nym ajoute de l’anonymat aux wallets Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 octobre 2026).

## Ce qui est protégé

Nym divise les paquets de transaction (généralement 7 à 15 Ko de données de dépense et de preuves ZK) en paquets Sphinx et les achemine via le mixnet. Cela :

- Masque l’adresse IP de l’expéditeur au serveur lightwallet
- Mélange le trafic avec celui d’autres utilisateurs de Nym
- Fournit environ 17 bits d’entropie avec les paramètres par défaut, avec un ensemble d’anonymat cité de plus de 100 000 utilisateurs

Les paiements et demandes de prix dans Zingo v7 suivent ce chemin par défaut.

## Ce qui n’est pas protégé

La synchronisation de la chaîne, les requêtes de nullifier, la récupération de transactions et le trafic mempool utilisent actuellement la connexion normale à l’indexeur. Les métadonnées au niveau de l’appareil ou de l’application en dehors des paquets mélangés sont également hors du périmètre de Nym.

Si votre modèle de menace exige de masquer le trafic de synchronisation, combinez un wallet avec mixnet natif avec NymVPN au niveau du système. Consultez [Nym VPN](/guides/nym-vpn).

## Wallets

| Wallet | Statut | Notes |
| --- | --- | --- |
| Zingo v7 | Actif, par défaut | `makers run-cli` intègre `nym-proxy`. La session démarre hors ligne ; `--online`, `--remember-online` ou `--server` accorde le consentement. |
| Zkool | Actif | Intégration native du mixnet. |
| Autres | Via NymVPN | Faites passer le wallet par le mode Mixnet au niveau du système. |

Les détails de configuration du chemin au niveau du wallet se trouvent dans [Acheminer le trafic des wallets Zcash via le mixnet Nym](/guides/nym-mixnet-wallet-setup).

## Compromis

Une diffusion acheminée via Nym est environ 12,5× plus lente que sur clearnet (~3,4 s). Tor est plus rapide (~3,7×), mais utilise des flux FIFO sans mélange ; un adversaire mondial peut donc toujours établir des corrélations. L’augmentation de la base d’utilisateurs partagée de Nym améliore l’anonymat plus efficacement que l’ajout de délai supplémentaire.

## Hygiène de la couche applicative : nym-swizzle-zcash

La protection au niveau réseau ne suffit pas. Même avec un mixnet ou un VPN parfait, un serveur lightwallet peut toujours relier des sessions en observant les schémas de la couche applicative :

- Chaînage des points de reprise : les clients reprennent la synchronisation exactement depuis `previous end + 1`, de sorte que le serveur peut chaîner les sessions uniquement à partir de la hauteur de bloc.
- Synchronisation puis envoi : les wallets se synchronisent immédiatement avant la diffusion, ce qui permet au serveur d’attribuer une transaction à la session de synchronisation précédente.

La crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) met en œuvre une politique d’hygiène spécifique à Zcash qui répond aux deux problèmes. Elle intègre les primitives générales de `nym-swizzle` dans une politique adaptée à la chaîne pour les clients légers.

**Plages de synchronisation quantifiées.** Les requêtes sont élargies à une grille à l’échelle du réseau avec des cellules d’une journée. Le début est arrondi à l’inférieur et la fin à la supérieure. Les plages sont déterministes, croissantes et disjointes. Les vérifications de réorganisation restent dans la plage élargie afin que le point de reprise exact ne soit pas révélé. L’anonymat provient de la collision (de nombreux wallets émettant les mêmes limites) plutôt que du bruit.

**Diffusions découplées.** Les envois de transactions sont retardés selon une distribution exponentielle (moyenne de 144 blocs ≈ 3 heures, plafond de 576 blocs ≈ 12 heures) correspondant à la planification des transferts ZIP 318. Les délais dépassent les durées de vie typiques des processus ; les calendriers sont donc persistés. La transaction n’est construite qu’au moment du déclenchement, à partir d’un tip récent. La synchronisation et la diffusion devraient utiliser des serveurs différents.

La crate expose les traits `BlockSource` et `TxBroadcaster`, se compile pour `wasm32-unknown-unknown` et ne possède pas sa propre pile réseau. Consultez la documentation [Nym](https://nym.com/docs/developers/swizzle/zcash) pour l’API complète et des exemples.

## Sources

- [Comment Nym ajoute de l’anonymat aux wallets Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 octobre 2026
- [nym-swizzle-zcash : politique d’hygiène pour les clients légers Zcash](https://nym.com/docs/developers/swizzle/zcash) — documentation de Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Acheminer le trafic des wallets Zcash via le mixnet Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
