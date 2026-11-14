<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet est un portefeuille Zcash de nœud complet écrit en Rust. Il remplace le portefeuille qui était auparavant intégré à `zcashd`. Après l'arrêt de fin de support de `zcashd` le 18 juillet 2026 à la hauteur de bloc 3417100, les fonctions de consensus et de portefeuille ont été séparées : **Zebra** ou **Zakura** valident la chaîne, et **Zallet** conserve les clés, analyse les notes et expose le JSON-RPC du portefeuille.

Zallet est actuellement en **bêta**. Il n'a pas encore fait l'objet d'un audit complet. Des changements incompatibles peuvent obliger à supprimer puis recréer le portefeuille. Ne l'utilisez pas comme solution de conservation en production pour de gros montants de ZEC sans avoir lu les avertissements de sécurité figurant dans [Le livre Zallet](https://zcash.github.io/zallet/).

---

## TL;DR

- Zallet est un **portefeuille RPC de nœud complet**, et non un portefeuille léger mobile ni un nœud de consensus.
- Il remplace la partie portefeuille de `zcashd`. La partie nœud est assurée par [Zebra](Zebra_Full_Node.md) ou [Zakura](Zakura_Node.md).
- Écrit en **Rust**, sous double licence MIT / Apache-2.0, maintenu dans [zcash/zallet](https://github.com/zcash/zallet).
- Dernière version publiée à la fin du mois d'août 2026 : **v0.1.0-beta.3**.
- Accède aux données de la chaîne via l'un de deux backends : **zebra-state** (`ReadStateService` direct sur un `zebrad` local) ou **Zaino**.
- Expose un sous-ensemble de **JSON-RPC compatible avec zcashd**. Certaines méthodes ont changé, d'autres ont été volontairement omises.
- Les éléments de clé sont toujours chiffrés avec **age**. L'historique des transactions, les adresses et les clés pour lecture seule sont stockés en clair dans `wallet.db`.
- Fournit trois binaires dans une seule archive signée : `zallet` (lanceur), `zallet-zebra` et `zallet-zaino`.
- Documentation officielle : [Le livre Zallet](https://zcash.github.io/zallet/).

---

## Pourquoi Zallet existe

`zcashd` regroupait dans un seul processus un nœud de consensus dérivé de Bitcoin Core et un portefeuille. Cette conception a été abandonnée.

| Rôle | Ancienne pile | Pile actuelle |
|------|-----------|---------------|
| Consensus / P2P | `zcashd` | Zebra (`zebrad`) ou Zakura |
| Portefeuille / clés / soldes | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Indexeur pour clients légers | `lightwalletd` | Zaino ou `lightwalletd` |

Séparer le portefeuille du nœud signifie que :

- Le logiciel de nœud peut être remplacé (Zebra ou Zakura) sans déplacer les clés.
- L'analyse du portefeuille et l'autorité de dépense résident dans un processus qui peut être verrouillé séparément.
- La sémantique RPC peut évoluer vers les comptes ZIP 32, les Unified Addresses et les PCZT au lieu de rester figée sur les particularités de `zcashd`.

Zallet est le portefeuille destiné aux opérateurs qui utilisaient auparavant `zcashd` comme portefeuille chaud, backend d'exchange, faucet ou portefeuille de paiement de minage.

---

## Statut

Zallet est en **bêta**.

Concrètement, cela signifie que :

- Des changements incompatibles peuvent survenir dans n'importe quelle version bêta. Vous devrez peut-être supprimer le répertoire de données et repartir de zéro.
- Toutes les RPC de portefeuille de `zcashd` n'ont pas été portées.
- La sémantique de certaines méthodes portées diffère de celle de `zcashd`. Les intégrations doivent consulter la [page sur la sémantique modifiée](https://zcash.github.io/zallet/zcashd/json_rpc.html).
- Les crates sont en cours de développement et n'ont pas fait l'objet d'un audit complet.
- Zallet n'est **pas** une bibliothèque Rust. Aucune garantie n'est offerte si vous l'utilisez comme telle.

Vos retours sont les bienvenus via les [issues GitHub](https://github.com/zcash/zallet/issues/new) ou sur le canal `#wallet-dev` du [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

Une phase stable ultérieure est prévue une fois que l'ensemble des RPC envisagées sera disponible. Les utilisateurs devront alors migrer vers les méthodes de Zallet, en tenant compte des différences sémantiques documentées.

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

Les trois binaires ouvrent le **même** `wallet.db`. Le lanceur choisit un backend à l'exécution : vous n'avez pas besoin de recompiler pour en changer.

Déploiement type :

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet est un **portefeuille de nœud complet** : il nécessite un nœud de validation local. Ce n'est pas un client léger. Pour les portefeuilles légers et les serveurs de blocs compacts, consultez [Zaino](Zaino.md) et [Nœuds de portefeuille léger](Lightwallet_Nodes.md).

La pile compose [Z3](https://github.com/ZcashFoundation/z3) de Zcash Foundation exécute Zebra et Zallet ensemble, avec un Zaino autonome facultatif pour les clients légers externes.

---

## Comptes, adresses et clés

Zallet est conçu autour des comptes ZIP 32, et non du compte implicite unique de `zcashd`.

- Un portefeuille peut contenir **plusieurs phrases mnémoniques BIP 39**. Chaque phrase mnémonique est une racine de dépense indépendante, identifiée par une **empreinte de graine** (`zip32seedfp1…`).
- Les **comptes** sont dérivés d'une graine à l'aide d'un index de compte ZIP 32. Au sein d'une instance Zallet, ils disposent également d'un **UUID** local. L'identité portable d'un compte est `(seedfp, account index)`.
- Les adresses sont des **Unified Addresses ZIP 316**, générées avec `z_getaddressforaccount`. Un compte peut avoir de nombreuses adresses diversifiées ; les récepteurs protégés ne peuvent pas être reliés entre eux on-chain.
- Les clés de dépense importées (`z_importkey`) et les adresses en lecture seule (`z_importaddress`) deviennent des comptes UUID qui ne sont couverts par aucune phrase mnémonique.
- Les clés pour lecture seule peuvent être exportées et importées (`z_exportviewingkey`, `z_importviewingkey`), y compris les clés pour lecture seule complètes unifiées et les clés pour lecture seule entrantes.

`getnewaddress` n'est pas implémentée. Utilisez `z_getnewaccount` et `z_getaddressforaccount`.

Si `keystore.require_backup` est activé (la forme migrée de `walletrequirebackup` de `zcashd`), Zallet refuse de dériver une nouvelle autorité de dépense à partir d'une phrase mnémonique dont la sauvegarde n'a pas été confirmée.

---

## Chiffrement et sauvegardes

Les éléments de clé sont **toujours** chiffrés. Il n'existe ni mode non chiffré ni RPC `encryptwallet` : cette méthode de `zcashd` n'a jamais été entièrement prise en charge.

- La configuration crée une identité **age**, au chemin par défaut `{datadir}/encryption-identity.txt`.
- Les phrases mnémoniques et les clés de dépense importées sont stockées sous forme de textes chiffrés age dans `wallet.db`.
- Le reste de la base de données n'est **pas** chiffré. L'historique, les adresses et les clés pour lecture seule sont lisibles par quiconque obtient le fichier.
- L'identité peut être protégée par une phrase secrète (`generate-encryption-identity -p`). Déverrouillez-la avec la RPC `walletpassphrase` ; verrouillez-la avec `walletlock`.
- La perte du fichier d'identité ou de sa phrase secrète rend les clés de dépense irrécupérables. Sauvegardez l'identité, chaque phrase mnémonique et (séparément, sous forme chiffrée) toute copie de `wallet.db` que vous conservez.

Copier `wallet.db` pendant que Zallet est en cours d'exécution ne constitue pas une sauvegarde sûre. SQLite peut produire un fichier incohérent. Préférez un processus arrêté, ou attendez une commande officielle de sauvegarde à chaud.

---

## JSON-RPC

Zallet implémente un sous-ensemble des RPC de portefeuille de `zcashd` sur HTTP avec authentification Basic. Liez-le à l'interface de bouclage. L'utilisation à distance doit passer par un tunnel chiffré. `rpc.allow_insecure_remote_bind` existe et n'est pas sûr.

Différences notables par rapport à `zcashd` :

- Les champs de solde de `getwalletinfo` sont vides. Utilisez `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Les frais suivent le **ZIP 317**. Il n'y a pas de `settxfee`.
- La construction des dépenses évolue vers les **PCZT** (Partially Created Zcash Transactions, ZIP 374). Des RPC PCZT ont été ajoutées au cours de la série bêta.
- Un **verrou de synchronisation** global bloque les RPC de solde et de dépense pendant que le portefeuille rattrape son retard ou se remet d'une réorganisation (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Les méthodes volontairement omises comprennent `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` et `encryptwallet`. Leurs remplaçantes sont répertoriées dans le [livre Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html).

---

## Prise en main

Les méthodes d'installation officielles (paquets Debian, Docker, binaires de version) figurent dans le [guide d'installation](https://zcash.github.io/zallet/guide/installation/index.html). Les archives de version sont nommées `zallet-<version>-<arch>.tar.gz` et contiennent les trois binaires.

Procédure minimale de création d'un nouveau portefeuille :

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

Faites pointer `[indexer]` vers un point de terminaison JSON-RPC `zebrad` local. Le backend zebra nécessite également `[indexer.read_state_service]` et un `zebrad` compilé avec la fonctionnalité d'indexation afin que Zallet puisse lire directement l'état de la chaîne.

Des images reproductibles peuvent être compilées avec [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, magasin d'images containerd, GNU Make).

---

## Migrer depuis zcashd

Conservez l'ancien répertoire de données de `zcashd` jusqu'à ce que vous ayez vérifié les soldes et testé une restauration.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` n'est disponible que dans les builds dotés de la fonctionnalité `zcashd-import`. La lecture de `wallet.dat` nécessite `db_dump` issu de **Berkeley DB 6.2**, la version utilisée par `zcashd`.

Notes détaillées pour les opérateurs : [Guide de migration : de zcashd vers Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Relation entre Zallet et les autres logiciels

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| Nature | Portefeuille RPC de nœud complet | Serveur de portefeuille axé sur les transactions protégées | Portefeuilles pour utilisateurs finaux | Nœud de consensus | Indexeur / remplaçant de lightwalletd |
| Remplace | Portefeuille de `zcashd` | Pas un clone direct de `zcashd` | Applications mobiles/de bureau | Nœud `zcashd` | `lightwalletd` |
| Nécessite un nœud local | Oui | Oui (Zebra par défaut) | Non (client léger) | C'*est* le nœud | Oui |
| Compatibilité RPC zcashd | Conçu comme voie de compatibilité | Petit sous-ensemble choisi uniquement | Sans objet | Partielle / mode de compatibilité Zakura | API différente |
| Modèle de conservation | L'opérateur détient les clés dans `wallet.db` | Serveur récupérable par la graine | Clés sur l'appareil de l'utilisateur | Pas de portefeuille | Pas de clés |

Zallet et **zecd** peuvent tous deux être placés devant Zebra. Choisissez Zallet si vous avez besoin de l'interface de portefeuille de `z_*` et d'une voie de migration depuis `wallet.dat`. Choisissez zecd si vous voulez un serveur axé sur les transactions protégées qui n'est explicitement *pas* un clone de `zcashd`.

Il existe un produit grand public distinct sur [zallet.io](https://www.zallet.io/) qui reprend le même nom. Cette application n'a rien à voir avec ce projet.

---

## Pages connexes

- [Nœuds complets](Full_Nodes.md) : Zebra, Zakura et l'ancien nœud `zcashd`
- [Nœud complet Zebra](Zebra_Full_Node.md) : le nœud lu par le backend par défaut de Zallet
- [Nœud Zakura](Zakura_Node.md) : nœud de validation alternatif
- [Zaino](Zaino.md) : backend d'indexation et serveur pour clients légers
- [zecd](ZECD.md) : une autre conception de serveur de portefeuille sur librustzcash
- [Synchronisation des portefeuilles Zcash](Zcash_Wallet_Syncing.md) : comment les portefeuilles protégés analysent la chaîne
- [Viewing Keys](Viewing_Keys.md)

## Ressources

- [Le livre Zallet](https://zcash.github.io/zallet/)
- [zcash/zallet sur GitHub](https://github.com/zcash/zallet)
- [Versions](https://github.com/zcash/zallet/releases)
- [Sémantique modifiée du JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [Guide de migration ZecHub](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [Guide Raspberry Pi ZecHub (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (pile compose Zebra + Zallet)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) : `#wallet-dev`
