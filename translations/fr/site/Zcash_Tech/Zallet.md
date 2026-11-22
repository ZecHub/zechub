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
- Dernière version publiée : **v0.1.0-beta.4** (2 novembre 2026). Elle suit [NU7](NU7.md) et nécessite `zebrad` **7.0.0 ou une version ultérieure**.
- Lit les données de la chaîne via un seul backend, **zebra** : `ReadStateService` sur le répertoire d'état d'un `zebrad` sur le même hôte, ainsi que le JSON-RPC de Zebra. Le backend Zaino a été supprimé dans la version v0.1.0-beta.4.
- Expose un sous-ensemble de JSON-RPC compatible avec zcashd. Certaines méthodes ont changé ; d'autres ont été volontairement omises.
- Les éléments de clé sont toujours chiffrés avec **age**. L'historique des transactions, les adresses et les clés pour lecture seule sont stockés en clair dans `wallet.db`.
- Fournit deux binaires dans une seule archive signée : `zallet` (lanceur) et `zallet-zebra`. **Linux uniquement** pour synchroniser un portefeuille : aucun backend de chaîne ne fonctionne encore sur macOS ni sur Windows.
- `zallet backup` (nouveau dans la version beta.4) prend un instantané cohérent d'un portefeuille en cours d'exécution ou arrêté.
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

Zallet est réparti sur plusieurs espaces de travail Cargo afin que chaque backend de chaîne puisse suivre son propre graphe de dépendances. Depuis la v0.1.0-beta.4, seul le backend zebra est fourni.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Les deux binaires ouvrent le même `wallet.db`. Jusqu'à la version v0.1.0-beta.3, il existait aussi un backend `zallet-zaino`. Si votre `zallet.toml` indique `backend = "zaino"`, remplacez cette valeur par `backend = "zebra"`. La base de données du portefeuille ne nécessite aucune migration, et l'ancien dossier `zaino` du répertoire de données peut être supprimé.

Le backend zebra lit directement la base de données d’état de `zebrad`. Il a donc besoin d’un `zebrad` compilé avec la fonctionnalité `indexer` et de son répertoire d’état **sur le même hôte**. Un Zallet dans un conteneur qui communique sur le réseau avec un `zebrad` dans un autre conteneur n’a aucune configuration prise en charge tant qu’un backend utilisant uniquement le réseau n’est pas disponible ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Déploiement type :

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet est un **portefeuille de nœud complet** : il nécessite un nœud de validation local. Ce n'est pas un client léger. Pour les portefeuilles légers et les serveurs de blocs compacts, consultez [Zaino](Zaino.md) et [Nœuds de portefeuille léger](Lightwallet_Nodes.md).

Le stack Compose de Zcash Foundation [Z3](https://github.com/ZcashFoundation/z3) exécute Zebra et Zallet ensemble, avec un Zaino autonome facultatif pour les clients légers externes. Ses images épinglées sont antérieures à NU7 et à la version bêta 4 de Zallet : consultez [Z3 Stack](Z3_Stack.md) avant de l’utiliser.

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

Copier `wallet.db` manuellement pendant que Zallet est en cours d’exécution ne constitue pas une sauvegarde sûre : SQLite peut corrompre le fichier. Depuis la version v0.1.0-beta.4, utilisez la commande [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md).

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Il écrit un instantané cohérent avec les transactions et dont l’intégrité est vérifiée d’un portefeuille en cours d’exécution ou arrêté. À partir d’un répertoire, il nomme le fichier `zallet-wallet-backup-<UTC time>.db` et n’écrase jamais un fichier existant. Il abandonne en signalant clairement l’échec après dix minutes si des écritures constantes dans le portefeuille (par exemple pendant la synchronisation initiale) relancent sans cesse la copie : réessayez plus tard ou arrêtez d’abord le portefeuille. La sauvegarde n’inclut **pas** le fichier d’identité age. Sauvegardez celui-ci une fois et conservez-le à part des sauvegardes de la base de données, car quiconque détient les deux peut déchiffrer les clés.

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

Les méthodes d'installation officielles (paquets Debian, Docker, binaires de version) sont indiquées dans le [guide d'installation](https://zcash.github.io/zallet/guide/installation/index.html). Les archives de version portent le nom `zallet-v<version>-linux-<amd64|arm64>.tar.gz` et contiennent `zallet` et `zallet-zebra`. Les images Docker sont publiées sous `zodlinc/zallet`.

Procédure minimale de création d'un nouveau portefeuille :

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

Configurez `[indexer]` pour pointer vers le point de terminaison JSON-RPC local de `zebrad` avec `validator_address`. Ce paramètre est obligatoire et ne pointe pas par défaut vers localhost. Le backend zebra nécessite également `[indexer.read_state_service]` et un `zebrad` en version 7.0.0 ou ultérieure, compilé avec la fonctionnalité `indexer`, dont le répertoire d’état se trouve sur le même hôte, afin que Zallet puisse lire directement l’état de la chaîne. `indexer.db_path` ne configurait que le backend Zaino supprimé : ce paramètre est désormais ignoré avec un avertissement.

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

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Ce que c’est | Portefeuille RPC à nœud complet | Serveur de portefeuille privilégiant les adresses protégées | Portefeuilles pour utilisateurs finaux | Nœud de consensus | Indexeur / remplacement de lightwalletd |
| Remplace | Portefeuille `zcashd` | Pas un clone `zcashd` directement substituable | Applications mobiles/de bureau | Nœud `zcashd` | `lightwalletd` |
| Nécessite un nœud local | Oui | Oui (Zebra par défaut) | Non (client léger) | C’est le nœud | Oui |
| Compatibilité RPC zcashd | Conçu comme voie de compatibilité | Petit sous-ensemble choisi uniquement | S. O. | Mode de compatibilité partielle / Zakura | API différente |
| Modèle de garde | L’opérateur détient les clés dans `wallet.db` | Serveur récupérable à partir de la phrase de récupération | Clés sur l’appareil de l’utilisateur | Aucun portefeuille | Aucune clé |

Zallet et **zecd** peuvent tous deux être placés devant Zebra. Choisissez Zallet si vous avez besoin de l'interface de portefeuille de `z_*` et d'une voie de migration depuis `wallet.dat`. Choisissez zecd si vous voulez un serveur axé sur les transactions protégées qui n'est explicitement *pas* un clone de `zcashd`.

Il existe un produit grand public distinct sur [zallet.io](https://www.zallet.io/) qui reprend le même nom. Cette application n'a rien à voir avec ce projet.

---

## Pages connexes

- [Nœuds complets](Full_Nodes.md) — Zebra, Zakura et le nœud `zcashd` retiré
- [Zebra Nœud complet](Zebra_Full_Node.md) — les lectures du backend par défaut du nœud Zallet
- [Zakura Nœud](Zakura_Node.md) — nœud de validation alternatif
- [Zaino](Zaino.md) — indexeur et serveur de client léger (n’est plus un backend Zallet depuis la bêta.4)
- [Pile Z3](Z3_Stack.md) — pile composée de Zebra et Zallet
- [zecd](ZECD.md) — autre conception de serveur de portefeuille sur librustzcash
- [ZcashSynchronisation des portefeuilles](Zcash_Wallet_Syncing.md) — comment les portefeuilles protégés analysent la chaîne
- [Clés pour lecture seule](Viewing_Keys.md)

## Ressources

- [Le Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet sur GitHub](https://github.com/zcash/zallet)
- [Versions](https://github.com/zcash/zallet/releases) · [journal des modifications de v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [Sémantique modifiée de JSON-RPC](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub guide Raspberry Pi (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet pile compose)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
