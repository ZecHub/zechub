<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# zecd — Serveur de portefeuille axé sur la protection

zecd est un serveur de portefeuille axé sur la protection pour Zcash, construit sur [librustzcash](https://github.com/zcash/librustzcash) et exposé via le dialecte JSON-RPC de Bitcoin Core. Il offre aux développeurs et aux intégrateurs de paiements une API familière, compatible avec Bitcoin, pour interagir avec Zcash, tout en faisant de Orchard (le pool le plus confidentiel) l'option par défaut. Développé par [zec.rocks](https://zec.rocks), zecd est conçu pour remplacer les fonctionnalités de portefeuille de `zcashd` dans les déploiements modernes et cloud-native.

**Version actuelle :** 0.5.0-rc3 (13 juillet 2026), avec la prise en charge de Ironwood (NU6.3). Installez-le via `cargo install zecd` ou utilisez l'image officielle Docker.

---

## TL;DR

- zecd est un **démon (serveur) de portefeuille**, et non un nœud complet. Il gère les clés, l'analyse, la génération de preuves et le RPC sans parler le protocole P2P de Zcash.
- Il parle le **dialecte JSON-RPC de Bitcoin Core** : mêmes noms de méthodes, mêmes structures de champs, même authentification et mêmes codes d'erreur. De nombreux clients RPC Bitcoin fonctionnent avec Zcash sans aucune adaptation.
- **Les adresses Orchard (protégées) sont utilisées par défaut** ; la prise en charge des adresses transparentes (t-address) et de Sapling nécessite une activation explicite pour chaque portefeuille.
- Il se connecte à un **nœud complet [Zebra](Zebra_Full_Node.md) auto-hébergé** via JSON-RPC local, sans besoin de lightwalletd.
- **Sans état par conception** : l'intégralité du portefeuille peut être récupérée à partir de la seule phrase de récupération, ce qui rend le répertoire de données jetable.
- **Ce n'est pas un remplacement direct de zcashd** : il n'implémente qu'un sous-ensemble des méthodes RPC de Zcash, avec des différences de conception intentionnelles pour la confidentialité et la sécurité.
- Les frais suivent le **ZIP-317** (calcul déterministe des frais) ; les frais spécifiés par l'utilisateur sont rejetés.
- Il prend en charge les **mémos protégés (ZIP-302)** via l'interface RPC Bitcoin familière.

---

## Quel problème zecd résout-il ?

`zcashd` était à l'origine le nœud et le portefeuille de Zcash réunis, issu d'un fork du code C++ de Bitcoin en 2016. Avec le temps, cela a créé des frictions : le code est difficile à maintenir, le portefeuille est étroitement couplé au nœud, et les adresses transparentes sont présentées comme des options à part entière, au même titre que les adresses protégées.

zecd sépare la responsabilité du portefeuille de celle du consensus. Il s'agit d'une **couche de portefeuille dédiée** qui se place entre les applications et un nœud complet Zebra, et qui fournit :

- Une implémentation Rust propre et moderne, construite sur librustzcash (la même bibliothèque qui alimente Zodl et Zingo)
- Une conception axée sur la confidentialité par défaut (adresses Orchard sauf configuration contraire)
- Une interface RPC compatible avec Bitcoin qui évite d'avoir à apprendre des outils spécifiques à Zcash
- Une architecture sans état, récupérable à partir de la phrase de récupération, adaptée aux déploiements conteneurisés et dans le cloud

---

## Architecture

zecd fonctionne selon un modèle à trois niveaux :

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       zecd
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

zecd communique avec Zebra **exclusivement via JSON-RPC local** : pas de réseau pair-à-pair, pas d'indexeurs tiers, pas de lightwalletd. La connexion à Zebra est volontairement limitée au local : zecd refusera d'envoyer des identifiants à un hôte routable globalement, sauf s'il est explicitement configuré pour un tunnel sécurisé hors bande (p. ex. WireGuard ou SSH).

---

## Fonctionnalités clés

### Axé sur la protection, Orchard par défaut

zecd utilise les adresses unifiées Orchard comme type d'adresse par défaut. Les pools Sapling et transparent (t-address) nécessitent une configuration explicite pour chaque portefeuille. Cette conception réduit le risque d'envois transparents accidentels, un piège courant pour la confidentialité dans les anciens outils Zcash.

La politique de confidentialité est configurable pour chaque appel ou globalement dans `[spend] privacy_policy` :

| Politique | Comportement |
|--------|----------|
| `AllowRevealedRecipients` (par défaut) | Autorise les envois vers des destinataires transparents ; révèle le montant et le destinataire on-chain |
| `AllowRevealedAmounts` | Autorise les envois entre pools (Sapling↔Orchard) mais rejette les destinataires transparents |
| `FullPrivacy` | Uniquement des envois entièrement protégés au sein d'un même pool ; rejette les destinataires transparents et les envois entre pools |
| `AllowFullyTransparent` | Autorise également les envois t→t financés à partir d'UTXO transparents |

### Compatibilité avec le RPC de Bitcoin Core

zecd implémente le dialecte JSON-RPC de Bitcoin Core avec une conformité portant sur :

- Les noms de méthodes (p. ex. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Les noms et types de champs dans les réponses
- La structure d'enveloppe JSON-RPC 1.0
- L'authentification basique, les entrées `rpcauth` et l'authentification par fichier cookie
- Les codes d'erreur et la correspondance des statuts HTTP (HTTP 500 avec corps d'erreur, sémantique 401)

Cela signifie que de nombreuses bibliothèques de paiement Bitcoin, intégrations d'exchanges et outils de supervision existants peuvent interagir avec Zcash via zecd avec peu ou pas de modifications du code.

La suite de conformité (plus de 140 vérifications) s'exécute à chaque PR sur un démon regtest actif et a également été validée sur le testnet public.

### Mémos protégés (ZIP-302)

zecd expose la fonctionnalité de mémo protégé de Zcash via l'interface RPC Bitcoin familière, ce qui n'est pas disponible dans les outils Bitcoin standard :

- `sendtoaddress` accepte un mémo hexadécimal facultatif comme paramètre supplémentaire en fin de liste (jusqu'à 512 octets ; rejeté pour les destinataires transparents)
- Les entrées de l'historique des transactions de `listtransactions` et `gettransaction` incluent les champs `memo` (hexadécimal) et `memoStr` (texte décodé) lorsqu'une sortie en contient un
- Les envois d'un montant nul vers un destinataire protégé sont pris en charge pour les cas d'utilisation limités au mémo (le modèle `z_sendmany` « memo-only-send »)

Cela rend zecd adapté aux applications qui ont besoin d'une messagerie privée on-chain en parallèle des paiements.

### Sans état par conception

zecd ne conserve **aucun état hors chaîne qu'une restauration à partir de la seule phrase de récupération ne pourrait pas reconstruire**. La base de données du portefeuille (`data.sqlite`) est entièrement dérivable de la phrase de récupération : les fonds protégés sont récupérés sans condition ; les fonds transparents sont récupérés dans la limite de l'écart configuré.

Pour restaurer un portefeuille à partir de la phrase de récupération :

```sh
zecd init --restore --birthday <block-height>
```

Le répertoire de données devient ainsi **jetable** : un conteneur sans volume persistant, reconstruit à partir de la phrase de récupération à chaque démarrage, ne perd rien d'essentiel. Les opérateurs sont responsables du suivi des adresses qu'ils distribuent : zecd ne mémorise les adresses qu'une fois qu'elles ont reçu des fonds on-chain.

Les étiquettes sont volontairement absentes. Comme les étiquettes n'ont aucune source on-chain et ne peuvent pas être reconstruites à partir de la phrase de récupération, zecd ne les prend tout simplement pas en charge. L'appel des méthodes d'étiquetage renvoie une erreur `method-not-found` (`-32601`).

### Aucune dépendance à lightwalletd

zecd obtient les blocs compacts, l'état de l'arbre et la visibilité sur le mempool directement depuis le JSON-RPC de Zebra. Il n'y a aucun lightwalletd à exploiter ni à maintenir, ce qui réduit la complexité opérationnelle des déploiements auto-hébergés.

### Déploiements cloud-native et conteneurisés

L'architecture sans état de zecd est conçue pour les environnements Docker et Kubernetes :

- Une pile Docker Compose complète (`zebra → zecd`) disponible dans le dépôt
- Un point de terminaison de santé sur le port `9233` avec des sondes de disponibilité configurables (`synced` ou `connected`)
- Une option de journalisation JSON structurée pour les pipelines d'agrégation de journaux
- Des frais déterministes ZIP-317 : aucun oracle de frais ni configuration manuelle des frais
- `bootstrap_from_keys` (activé par défaut) : un répertoire de données vide à côté de `keys.toml` reconstruit automatiquement le portefeuille au démarrage ; déployez en montant un seul Secret et en démarrant avec un PVC vide

---

## Modèles de garde

zecd prend en charge trois modèles de garde des clés, adaptés à différentes exigences de déploiement et de sécurité :

### 1. Non chiffré (par défaut, déverrouillage automatique)

Le mnémonique de la phrase de récupération dans `keys.toml` est enveloppé avec un **fichier d'identité age** (`identity.txt`). Avec le paramètre par défaut `auto_unlock = true`, la phrase de récupération est déchiffrée en mémoire au démarrage, de sorte que les envois se font sans intervention et qu'aucun appel à `walletpassphrase` n'est nécessaire.

Idéal pour : les processeurs de paiement automatisés, les portefeuilles chauds des exchanges, les environnements de développement.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Stockez `identity.txt` **en dehors** du répertoire de données sur le mainnet : toute personne capable de lire les deux fichiers dispose du pouvoir de dépense.

### 2. Chiffré (protégé par une phrase secrète)

Le mnémonique est enveloppé avec une phrase secrète (age scrypt) au lieu d'un fichier d'identité. Le portefeuille démarre verrouillé ; `walletpassphrase "<pass>" <timeout>` le déverrouille pour la durée indiquée et le reverrouille automatiquement à l'expiration du délai, conformément au comportement des portefeuilles chiffrés de Bitcoin Core.

Idéal pour : les portefeuilles connectés pour lesquels un pouvoir de dépense sans intervention n'est pas requis ; les flux de travail interactifs des opérateurs.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Lecture seule (UFVK, sans clé de dépense)

Initialisé avec une Unified Full Viewing Key (UFVK) exportée depuis un autre portefeuille. Il peut recevoir, analyser et indiquer les soldes, mais ne peut pas signer de transactions. Idéal pour la supervision, la facturation ou les nœuds d'audit séparés du portefeuille de signature.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Sauvegarde et récupération

Les fonds sont récupérables à partir **du seul mnémonique**. Tout le reste n'est qu'un cache.

| Élément | Emplacement | Ce qu'il protège | Sauvegarder ? |
|----------|----------|-----------------|----------|
| **Mnémonique de 24 mots** | Affiché une seule fois lors de `zecd init` | Les fonds : perte = perte définitive | **Oui, hors ligne (papier/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Phrase de récupération chiffrée + date de création + réseau | **Oui, en tant que Secret** |
| `identity.txt` | `[keys] age_identity` | Déchiffre `keys.toml` (pouvoir de dépense) | **Oui, séparément de `keys.toml`** |
| Hauteur de création | Dans `keys.toml` | Accélère la restauration (toute hauteur antérieure à la première transaction) | À noter avec le mnémonique |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cache du portefeuille, reconstruit à partir de la phrase de récupération lors de la restauration | Non, jetable |
| `blocks/` | `<wallet dir>/blocks/` | Cache des blocs compacts | Non, ne jamais le transférer ; peut devenir volumineux |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC éphémère | Non, régénéré au démarrage |

> **Le répertoire de données doit être local à l'hôte.** Le verrou d'instance unique de zecd (`<datadir>/.lock`) est un verrou consultatif du système d'exploitation : il ne s'étend pas à plusieurs hôtes. Ne partagez jamais un répertoire de données en lecture-écriture entre plusieurs machines (NFS, Kubernetes `ReadWriteMany`) : deux instances de zecd corrompraient la base de données du portefeuille. Utilisez des volumes `ReadWriteOnce` dans Kubernetes.

---

## Liste blanche des méthodes RPC

Pour les déploiements où une fuite d'identifiants serait catastrophique, zecd permet de restreindre l'interface RPC à un sous-ensemble choisi de méthodes :

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Toute méthode absente de la liste renvoie `-32601` (HTTP 404), ce qui la rend indiscernable d'une méthode inexistante : un serveur verrouillé ne révèle donc rien de ce qu'il a désactivé. Un outil de facturation en réception seule peut désactiver `sendtoaddress`, `sendmany` et `stop` afin de limiter l'impact d'un client compromis.

---

## Principales différences avec le RPC de Bitcoin Core

Les développeurs qui migrent depuis les outils Bitcoin ou zcashd doivent connaître ces divergences intentionnelles :

| Comportement | Bitcoin Core | zecd |
|----------|-------------|------|
| Format d'adresse | `1...` / `bc1...` | `u1...` (adresse unifiée Orchard) : ne peut pas être analysée comme une adresse Bitcoin par les clients qui analysent les chaînes de caractères |
| Étiquettes | Stockage complet des étiquettes | Non implémentées : `setlabel`, `listlabels`, etc. renvoient `-32601` |
| Frais | Définissables par l'utilisateur ; marché des frais | Uniquement déterministes selon ZIP-317 ; `settxfee`, `fee_rate`, `subtractfeefromamount` rejetés avec `-8` |
| Mémos | Non pris en charge | `sendtoaddress` accepte un mémo hexadécimal ; l'historique contient les champs `memo` + `memoStr` |
| Confirmations pour dépenser | 1 | 3 (monnaie rendue propre) / 10 (tiers), configurable via `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` lors d'une réorganisation | Remonte jusqu'au fork | Renvoie `-5` (Block not found) si le curseur est supprimé par la réorganisation ; rétablissez la référence avec un appel sans paramètre |
| Destinataires en double dans `sendmany` | Erreur | L'analyseur JSON fusionne les doublons (le dernier l'emporte) avant que zecd ne les voie : n'indiquez pas deux fois la même adresse |
| Solde pendant la synchronisation initiale | Bloque ou phase de préchauffage | Fournit un solde partiel : conditionnez l'automatisation à `GET /readyz` (renvoie 503 jusqu'à la synchronisation complète et la résorption du retard d'enrichissement) |
| `minconf 0` dans `getbalance` | Solde à 0 confirmation | Traité comme 1 : une note protégée n'est jamais dépensable avant d'être minée |

---

## Démarrage rapide

**Prérequis :** Zebra en cours d'exécution en local avec `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Installez depuis crates.io (0.4.3+) :

```sh
cargo install zecd
```

Ou compilez à partir des sources :

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Interagir via curl :**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Interagir via Python (à l'aide d'une bibliothèque RPC Bitcoin) :**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Restaurer à partir de la phrase de récupération :**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Ports par défaut

| Réseau | RPC zecd | RPC Zebra (backend) | Santé |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## zecd vs zcashd vs Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| Rôle | Nœud complet + portefeuille | Indexeur (remplace lightwalletd) | Serveur de portefeuille uniquement |
| Langage | C++ | Rust | Rust |
| Statut | Obsolète | Actif | Actif (v0.5.0-rc3, juil. 2026) |
| Pool par défaut | Transparent | N/A | Orchard (protégé) |
| Dialecte RPC | Spécifique à zcashd | gRPC (lightwalletd) | JSON-RPC de Bitcoin Core |
| Nécessite un nœud complet | Oui (lui-même) | Zebra ou zcashd | Zebra |
| Récupération sans état | Non | N/A | Oui (phrase de récupération seule) |
| Mémos protégés | Oui (`z_sendmany`) | N/A | Oui (interface RPC Bitcoin) |
| Lecture seule (UFVK) | Oui | Oui | Oui |
| Cloud-native | Non | Partiel | Oui |
| Installation | Compilation/binaire | Compilation | `cargo install zecd` |

---

## Pages connexes

- [Nœud complet Zebra](Zebra_Full_Node.md) : le nœud complet auquel zecd se connecte
- [Indexeur Zaino](Zaino.md) : approche alternative fondée sur un indexeur (remplace lightwalletd)
- [Nœud Zakura](Zakura_Node.md) : une autre implémentation de nœud complet (fork de Zebra)
- [Viewing Keys](Viewing_Keys.md) : comment zecd analyse la chaîne à l'aide des clés pour lecture seule du compte
- [Portefeuilles](/using-zcash/wallets) : vue d'ensemble de l'écosystème des portefeuilles

## Ressources

- [zecd GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Guide d'exploitation de zecd](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash : bibliothèque cryptographique principale de Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317 : mécanisme de frais de transfert proportionnels](https://zips.z.cash/zip-0317)
- [ZIP-302 : mémos protégés](https://zips.z.cash/zip-0302)
- [Portefeuille Zodl (compatible avec librustzcash)](https://github.com/zodl-inc/zodl-ios)
