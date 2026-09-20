<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Zallet

Zallet est un wallet Zcash à nœud complet écrit en Rust. Il remplace le wallet qui était auparavant intégré à `zcashd`. Après que `zcashd` a atteint son arrêt de fin de support le 18 juillet 2026 à la hauteur de bloc 3417100, les responsabilités de consensus et de wallet ont été séparées : **Zebra** ou **Zakura** valident la chaîne, et **Zallet** conserve les clés, analyse les notes et expose le JSON-RPC du wallet.

Zallet est actuellement en **bêta**. Il n'a pas été entièrement audité. Des changements incompatibles peuvent nécessiter de supprimer puis recréer le wallet. Ne le considérez pas comme une solution de conservation en production pour de grands montants de ZEC sans avoir lu les avertissements de sécurité dans [Le livre de Zallet](https://zcash.github.io/zallet/).

---

## TL;DR

- Zallet est un **wallet RPC à nœud complet**, et non un wallet léger mobile ni un nœud de consensus.
- Il remplace la partie wallet de `zcashd`. La partie nœud est [Zebra](Zebra_Full_Node.md) ou [Zakura](Zakura_Node.md).
- Écrit en **Rust**, sous double licence MIT / Apache-2.0, maintenu dans [zcash/zallet](https://github.com/zcash/zallet).
- Dernière version publiée fin août 2026 : **v0.1.0-beta.3**.
- Communique avec les données de la chaîne via l'un de deux backends : **zebra-state** (`ReadStateService` direct vers un `zebrad` local) ou **Zaino**.
- Expose un sous-ensemble **compatible avec zcashd du JSON-RPC**. Certaines méthodes ont changé ; d'autres ont été délibérément omises.
- Le matériel de clé est toujours chiffré avec **age**. L'historique des transactions, les adresses et les clés de visualisation restent en clair dans `wallet.db`.
- Fournit trois binaires dans une archive signée : `zallet` (lanceur), `zallet-zebra` et `zallet-zaino`.
- Documentation officielle : [Le livre de Zallet](https://zcash.github.io/zallet/).

---

## Pourquoi Zallet existe

`zcashd` regroupait un nœud de consensus dérivé de Bitcoin Core et un wallet dans un même processus. Cette conception a disparu.

| Rôle | Ancienne pile | Pile actuelle |
|------|-----------|---------------|
| Consensus / P2P | `zcashd` | Zebra (`zebrad`) ou Zakura |
| Wallet / clés / soldes | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indexeur de client léger | `lightwalletd` | Zaino ou `lightwalletd` |

Séparer le wallet du nœud signifie :

- Le logiciel de nœud peut être remplacé (Zebra contre Zakura) sans déplacer les clés.
- L'analyse du wallet et l'autorité de dépense résident dans un processus qui peut être verrouillé séparément.
- La sémantique RPC peut évoluer vers les comptes ZIP 32, les Unified Addresses et les PCZT au lieu de rester figée sur les particularités de `zcashd`.

Zallet est le wallet destiné aux opérateurs qui utilisaient auparavant `zcashd` comme wallet chaud, backend d'exchange, faucet ou wallet de paiement de minage.

---

## Statut

Zallet est en **bêta**.

En pratique, cela signifie :

- Des changements incompatibles peuvent être introduits dans toute version bêta. Vous pourriez devoir supprimer le répertoire de données et recommencer.
- Toutes les RPC de wallet `zcashd` n'ont pas été portées.
- La sémantique de certaines méthodes portées diffère de celle de `zcashd`. Les intégrations doivent lire la [page des sémantiques modifiées](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Les crates sont en cours de développement et n'ont pas été entièrement auditées.
- Zallet n'est **pas** une bibliothèque Rust. Aucune garantie n'est fournie si vous en dépendez comme telle.

Les retours doivent être adressés aux [tickets GitHub](https://github.com/zcash/zallet/issues/new) ou au canal `#wallet-dev` sur le [Zcash Discord R&D](https://discord.gg/xpzPR53xtU).

Une phase stable ultérieure est prévue une fois que la surface RPC visée existera. Les appelants devront alors migrer vers les méthodes de Zallet, y compris leurs différences sémantiques documentées.

---

## Architecture

Zallet est réparti sur trois espaces de travail Cargo afin que les deux backends de chaîne puissent suivre des graphes de dépendances différents.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

Les trois binaires ouvrent la **même** `wallet.db`. Le lanceur choisit un backend à l'exécution ; vous ne recompilez pas pour en changer.

Déploiement typique :

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet est un **wallet à nœud complet** : il nécessite un nœud local qui valide la chaîne. Ce n'est pas un client léger. Pour les wallets légers et les serveurs de blocs compacts, consultez [Zaino](Zaino.md) et [Nœuds Lightwallet](Lightwallet_Nodes.md).

La pile compose Zcash Foundation [Z3](https://github.com/ZcashFoundation/z3) exécute Zebra + Zallet ensemble, avec Zaino autonome facultatif pour les clients légers externes.

---

## Comptes, adresses et clés

Zallet est conçu autour des comptes ZIP 32, et non du compte implicite unique de `zcashd`.

- Un wallet peut contenir **plusieurs mnémoniques BIP 39**. Chaque mnémonique est une racine de dépense indépendante, identifiée par une **empreinte de seed** (`zip32seedfp1…`).
- Les **comptes** sont dérivés d'une seed avec un index de compte ZIP 32. Dans une même instance Zallet, ils disposent également d'un **UUID** local. L'identité portable d'un compte est `(seedfp, account index)`.
- Les adresses sont des **Unified Addresses ZIP 316**, produites avec `z_getaddressforaccount`. Un compte peut avoir de nombreuses adresses diversifiées ; les receveurs protégés ne sont pas associables sur la chaîne.
- Les clés de dépense importées (`z_importkey`) et les adresses en lecture seule (`z_importaddress`) deviennent des comptes UUID qu'aucun mnémonique ne couvre.
- Les clés de visualisation peuvent être exportées et importées (`z_exportviewingkey`, `z_importviewingkey`), y compris les clés de visualisation complètes unifiées et les clés de visualisation entrantes.

`getnewaddress` n'est pas implémenté. Utilisez `z_getnewaccount` et `z_getaddressforaccount`.

Si `keystore.require_backup` est activé (la forme migrée de `zcashd` `walletrequirebackup`), Zallet refuse de dériver une nouvelle autorité de dépense d'un mnémonique dont la sauvegarde n'a pas été confirmée.

---

## Chiffrement et sauvegardes

Le matériel de clé est **toujours** chiffré. Il n'existe aucun mode non chiffré ni RPC `encryptwallet` — cette méthode de `zcashd` n'a jamais été entièrement prise en charge.

- La configuration crée une identité **age**, au chemin par défaut `{datadir}/encryption-identity.txt`.
- Les mnémoniques et les clés de dépense importées sont stockés sous forme de textes chiffrés age dans `wallet.db`.
- Le reste de la base de données n'est **pas** chiffré. L'historique, les adresses et les clés de visualisation sont lisibles si quelqu'un obtient le fichier.
- L'identité peut être protégée par phrase de passe (`generate-encryption-identity -p`). Déverrouillez-la avec la RPC `walletpassphrase` ; verrouillez-la avec `walletlock`.
- Perdre le fichier d'identité ou sa phrase de passe rend les clés de dépense irrécupérables. Sauvegardez l'identité, chaque mnémonique et, séparément et chiffrée, toute copie `wallet.db` que vous conservez.

Copier `wallet.db` pendant l'exécution de Zallet n'est pas une sauvegarde sûre. SQLite peut produire un état incohérent. Préférez un processus arrêté, ou attendez une commande officielle de sauvegarde en ligne.

---

## JSON-RPC

Zallet implémente un sous-ensemble des RPC de wallet `zcashd` sur HTTP avec l'authentification Basic. Liez-le à la boucle locale. L'utilisation à distance devrait passer par un tunnel chiffré. `rpc.allow_insecure_remote_bind` existe et n'est pas sûr.

Différences notables par rapport à `zcashd` :

- Les champs de solde de `getwalletinfo` sont vides. Utilisez `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Les frais suivent **ZIP 317**. Il n'y a pas de `settxfee`.
- La construction des dépenses évolue vers les **PCZT** (transactions Zcash partiellement créées, ZIP 374). Les RPC PCZT sont arrivées dans la série bêta.
- Un **verrou de synchronisation** global bloque les RPC de solde et de dépense pendant que le wallet se met à jour ou récupère d'une réorganisation (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Les méthodes volontairement omises comprennent `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` et `encryptwallet`. Les remplacements sont indiqués dans [Le livre de Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Premiers pas

Les méthodes d'installation officielles (paquets Debian, Docker, binaires de version) sont présentées dans le [guide d'installation](https://zcash.github.io/zallet/guide/installation/index.html). Les archives de version sont nommées `zallet-<version>-<arch>.tar.gz` et contiennent les trois binaires.

Flux minimal pour un nouveau wallet :

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Pointez `[indexer]` vers un endpoint JSON-RPC `zebrad` local. Le backend zebra nécessite aussi `[indexer.read_state_service]` et un `zebrad` construit avec la fonctionnalité d'indexeur afin que Zallet puisse lire directement l'état de la chaîne.

Des images reproductibles peuvent être construites avec [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, magasin d'images containerd, GNU Make).

---

## Migration depuis zcashd

Conservez l'ancien répertoire de données `zcashd` jusqu'à ce que vous ayez confirmé les soldes et testé une restauration.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` n'est disponible que dans les builds dotés de la fonctionnalité `zcashd-import`. La lecture de `wallet.dat` nécessite `db_dump` de **Berkeley DB 6.2**, la version utilisée par `zcashd`.

Notes détaillées pour les opérateurs : [Guide de migration : zcashd vers Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Comment Zallet se rapporte aux autres logiciels

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Ce que c'est | Wallet RPC à nœud complet | Serveur de wallet orienté shielded | Wallets pour utilisateurs finaux | Nœud de consensus | Indexeur / remplacement de lightwalletd |
| Remplace | Wallet `zcashd` | Pas un clone `zcashd` directement substituable | Applications mobiles/de bureau | Nœud `zcashd` | `lightwalletd` |
| Nécessite un nœud local | Oui | Oui (Zebra par défaut) | Non (client léger) | C'est *le* nœud | Oui |
| Compatibilité RPC zcashd | Conçu comme chemin de compatibilité | Petit sous-ensemble choisi seulement | S/O | Mode de compatibilité partielle / Zakura | API différente |
| Modèle de conservation | L'opérateur détient les clés dans `wallet.db` | Serveur récupérable avec seed | Clés sur l'appareil de l'utilisateur | Pas de wallet | Pas de clés |

Zallet et **zecd** peuvent tous deux se placer devant Zebra. Choisissez Zallet lorsque vous avez besoin de la surface de wallet `z_*` et d'un chemin de migration depuis `wallet.dat`. Choisissez zecd lorsque vous voulez un serveur orienté shielded qui n'est explicitement *pas* un clone de `zcashd`.

Il existe un produit grand public distinct sur [zallet.io](https://www.zallet.io/) qui réutilise ce nom. Cette application n'est pas ce projet.

---

## Pages connexes

- [Nœuds complets](Full_Nodes.md) — Zebra, Zakura et le nœud `zcashd` retiré
- [Zebra Nœud complet](Zebra_Full_Node.md) — le nœud dont le backend par défaut de Zallet lit les données
- [Zakura Nœud](Zakura_Node.md) — nœud de validation alternatif
- [Zaino](Zaino.md) — backend d'indexeur et serveur de client léger
- [ZECD](ZECD.md) — autre conception de serveur de wallet sur librustzcash
- [Zcash Synchronisation de wallet](Zcash_Wallet_Syncing.md) — comment les wallets shielded analysent la chaîne
- [Clés de visualisation](Viewing_Keys.md)

## Ressources

- [Le livre de Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet sur GitHub](https://github.com/zcash/zallet)
- [Versions](https://github.com/zcash/zallet/releases)
- [Sémantique JSON-RPC modifiée](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Guide de migration ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Guide Raspberry Pi ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (pile compose Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Zcash Discord R&D](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
