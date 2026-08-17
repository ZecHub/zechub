---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECD — Serveur de wallet shielded en priorité

> 🇧🇷 [Version en portugais](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD est un serveur de wallet shielded en priorité pour Zcash, construit sur [librustzcash](https://github.com/zcash/librustzcash) et exposé via le dialecte JSON-RPC de Bitcoin Core. Il offre aux développeurs et aux intégrateurs de paiements une API familière, compatible avec Bitcoin, pour interagir avec Zcash — tout en faisant d'Orchard (le pool le plus privé) l'option par défaut. Développé par [zec.rocks](https://zec.rocks), ZECD est conçu pour remplacer la fonctionnalité wallet de `zcashd` dans les déploiements modernes, natifs cloud.

**Version actuelle :** 0.5.0-rc3 (13 juillet 2026) — avec prise en charge d'Ironwood (NU6.3). Installez-le via `cargo install zecd` ou utilisez l'image Docker officielle.

---

## TL;DR

- ZECD est un **daemon de wallet (serveur)** — pas un nœud complet. Il gère les clés, le scanning, la preuve et le RPC sans parler le protocole P2P de Zcash.
- Il parle le **dialecte JSON-RPC de Bitcoin Core** : mêmes noms de méthodes, formats de champs, auth et codes d'erreur — de nombreux clients RPC Bitcoin fonctionnent avec Zcash immédiatement.
- Les adresses **Orchard (shielded) sont l'option par défaut** ; la prise en charge du transparent (t-address) et de Sapling nécessite une activation explicite pour chaque wallet.
- Il se connecte à un **nœud complet [Zebra](Zebra_Full_Node.md) auto-hébergé** via JSON-RPC local — pas besoin de lightwalletd.
- **Sans état par conception** : l'ensemble du wallet peut être récupéré à partir de la seule phrase seed, ce qui rend le répertoire de données jetable.
- **Pas un remplacement direct de zcashd** : n'implémente qu'un sous-ensemble des méthodes RPC de Zcash, avec des différences de conception intentionnelles pour la confidentialité et la sécurité.
- Les frais suivent **ZIP-317** (calcul déterministe des frais) ; les frais spécifiés par l'utilisateur sont rejetés.
- Prend en charge les **mémos shielded (ZIP-302)** via l'interface RPC Bitcoin familière.

---

## Quel problème ZECD résout-il ?

`zcashd` était le nœud et wallet d'origine de Zcash — dérivé du codebase C++ de Bitcoin en 2016. Avec le temps, cela a créé des frictions : le code est difficile à maintenir, le wallet est étroitement couplé au nœud, et les adresses transparentes sont présentées comme des options de premier plan aux côtés des adresses shielded.

ZECD sépare la responsabilité du wallet du consensus. C'est une **couche wallet dédiée** qui se place entre les applications et un nœud complet Zebra, en fournissant :

- Une implémentation Rust propre et moderne, construite sur librustzcash (la même bibliothèque qui alimente Zodl et Zingo)
- Une conception privacy-by-default (adresses Orchard sauf configuration contraire)
- Une interface RPC compatible avec Bitcoin qui supprime le besoin d'apprendre des outils spécifiques à Zcash
- Une architecture sans état, récupérable par seed, adaptée aux déploiements conteneurisés et cloud

---

## Architecture

ZECD fonctionne selon un modèle à trois niveaux :

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD communique avec Zebra **exclusivement via JSON-RPC local** — pas de réseau pair-à-pair, pas d'indexeurs tiers, pas de lightwalletd. La connexion à Zebra est volontairement limitée au local : ZECD refusera d'envoyer des identifiants à un hôte globalement routable, sauf s'il est explicitement configuré pour un tunnel sécurisé hors bande (par ex. WireGuard ou SSH).

---

## Fonctionnalités clés

### Shielded en priorité, Orchard par défaut

ZECD utilise les Unified Address Orchard comme type d'adresse par défaut. Les pools Sapling et transparent (t-address) nécessitent une configuration explicite par wallet. Cette conception réduit le risque d'envois transparents accidentels — un piège fréquent pour la confidentialité dans les anciens outils Zcash.

La politique de confidentialité est configurable par appel ou globalement dans `[spend] privacy_policy` :

| Politique | Comportement |
|--------|----------|
| `AllowRevealedRecipients` (par défaut) | Autorise les envois vers des destinataires transparents ; révèle le montant et le destinataire on-chain |
| `AllowRevealedAmounts` | Autorise les envois inter-pools (Sapling↔Orchard) mais rejette les destinataires transparents |
| `FullPrivacy` | N'autorise que les envois entièrement shielded au sein d'un même pool ; rejette les destinataires transparents et les envois inter-pools |
| `AllowFullyTransparent` | Autorise également les envois t→t financés depuis des UTXO transparents |

### Compatibilité RPC Bitcoin Core

ZECD implémente le dialecte JSON-RPC de Bitcoin Core avec une conformité sur :

- Les noms de méthodes (par ex. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Les noms et types des champs dans les réponses
- La structure d'enveloppe JSON-RPC 1.0
- L'auth basic, les entrées `rpcauth` et l'authentification par fichier cookie
- Les codes d'erreur et le mapping des statuts HTTP (HTTP 500 avec corps d'erreur, sémantique 401)

Cela signifie que de nombreuses bibliothèques de paiement Bitcoin existantes, intégrations d'exchange et outils de monitoring peuvent interagir avec Zcash via ZECD avec peu ou pas de modifications de code.

La suite de conformité (140+ vérifications) s'exécute sur chaque PR contre un daemon regtest live et a également été validée sur le testnet public.

### Mémos shielded (ZIP-302)

ZECD expose la fonctionnalité de mémo shielded de Zcash via l'interface RPC Bitcoin familière — quelque chose d'indisponible dans l'outillage Bitcoin standard :

- `sendtoaddress` accepte un mémo hex optionnel comme paramètre supplémentaire en fin de liste (jusqu'à 512 octets ; rejeté pour les destinataires transparents)
- Les entrées d'historique de transactions de `listtransactions` et `gettransaction` incluent les champs `memo` (hex) et `memoStr` (texte décodé) lorsqu'une sortie en transporte un
- Les envois de montant nul vers un destinataire shielded sont pris en charge pour les cas d'usage mémo uniquement (le modèle `z_sendmany` "memo-only-send")

Cela rend ZECD adapté aux applications qui ont besoin d'une messagerie privée on-chain en plus des paiements.

### Sans état par conception

ZECD ne persiste **aucun état off-chain qu'une restauration à partir de la seule seed ne pourrait reconstruire**. La base de données wallet (`data.sqlite`) est entièrement dérivable à partir de la phrase seed — les fonds shielded sont récupérés sans condition ; les fonds transparents sont récupérés jusqu'à la limite de gap configurée.

Pour restaurer un wallet à partir de la seed :

```sh
zecd init --restore --birthday <block-height>
```

Cela rend le répertoire de données **jetable** : un conteneur sans volume persistant, reconstruit à partir de la seed à chaque démarrage, ne perd rien d'essentiel. Les opérateurs sont responsables du suivi des adresses qu'ils distribuent — ZECD ne mémorise les adresses qu'une fois qu'elles ont reçu des fonds on-chain.

Les labels sont intentionnellement absents. Comme les labels n'ont pas de source on-chain et ne peuvent pas être reconstruits à partir de la seed, ZECD ne les prend tout simplement pas en charge. Appeler des méthodes de label renvoie une erreur `method-not-found` (`-32601`).

### Aucune dépendance à lightwalletd

ZECD dérive directement les compact blocks, l'état des arbres et la visibilité du mempool à partir du JSON-RPC de Zebra. Il n'y a pas de lightwalletd à exploiter ou maintenir — ce qui réduit la complexité opérationnelle pour les déploiements auto-hébergés.

### Déploiements natifs cloud et conteneurisés

L'architecture sans état de ZECD est conçue pour les environnements Docker et Kubernetes :

- Stack Docker Compose complète (`zebra → zecd`) disponible dans le dépôt
- Endpoint de santé sur le port `9233` avec probes de readiness configurables (`synced` ou `connected`)
- Option de logs JSON structurés pour les pipelines d'agrégation de logs
- Frais déterministes ZIP-317 — pas d'oracle de frais ni de configuration manuelle des frais
- `bootstrap_from_keys` (activé par défaut) : un répertoire de données vide à côté de `keys.toml` reconstruit automatiquement le wallet au démarrage — déployez en montant un Secret et en démarrant avec un PVC vide

---

## Modèles de custody

ZECD prend en charge trois modèles de custody des clés, adaptés à différents besoins de déploiement et de sécurité :

### 1. Non chiffré (par défaut — déverrouillage automatique)

Le mnémonique seed dans `keys.toml` est encapsulé dans un **fichier d'identité age** (`identity.txt`). Avec le paramètre par défaut `auto_unlock = true`, la seed est déchiffrée en mémoire au démarrage, de sorte que les envois sont sans supervision et qu'aucun appel `walletpassphrase` n'est nécessaire.

Idéal pour : processeurs de paiement automatisés, hot wallets d'exchange, environnements de développement.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Stockez `identity.txt` **en dehors** du répertoire de données sur mainnet — toute personne qui lit les deux fichiers a l'autorité de dépense.

### 2. Chiffré (protégé par passphrase)

Le mnémonique est encapsulé avec une passphrase (age scrypt) au lieu d'un fichier d'identité. Le wallet démarre verrouillé ; `walletpassphrase "<pass>" <timeout>` le déverrouille pour la durée indiquée et il se reverrouille automatiquement à l'expiration — conformément au comportement du wallet chiffré de Bitcoin Core.

Idéal pour : hot wallets où l'autorité de dépense sans supervision n'est pas requise ; workflows interactifs d'opérateur.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Watch-only (UFVK — sans clé de dépense)

Initialisé avec une Unified Full Viewing Key (UFVK) exportée depuis un autre wallet. Peut recevoir, scanner et signaler les soldes — mais ne peut pas signer de transactions. Idéal pour le monitoring, la facturation ou les nœuds d'audit séparés du wallet signataire.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Sauvegarde et récupération

Les fonds sont récupérables à partir du **mnémonique seul**. Tout le reste n'est qu'un cache.

| Artéfact | Emplacement | Ce qu'il protège | Sauvegarder ? |
|----------|----------|-----------------|----------|
| **Mnémonique de 24 mots** | Affiché une seule fois à `zecd init` | Les fonds — perte = perte permanente | **Oui — hors ligne (papier/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Seed chiffrée + birthday + réseau | **Oui — comme Secret** |
| `identity.txt` | `[keys] age_identity` | Déchiffre `keys.toml` (autorité de dépense) | **Oui — séparément de `keys.toml`** |
| Hauteur de birthday | À l'intérieur de `keys.toml` | Rend la restauration rapide (n'importe quelle hauteur avant la première tx) | À noter avec le mnémonique |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Cache du wallet — reconstruit à partir de la seed lors de la restauration | Non — jetable |
| `blocks/` | `<wallet dir>/blocks/` | Cache de compact blocks | Non — ne jamais distribuer ; peut devenir volumineux |
| `.cookie` | `<datadir>/.cookie` | Cookie RPC éphémère | Non — régénéré au démarrage |

> **Le répertoire de données doit être local à l'hôte.** Le verrou mono-instance de ZECD (`<datadir>/.lock`) est un verrou consultatif du système d'exploitation — il ne s'étend pas entre les hôtes. Ne partagez jamais un répertoire de données en lecture-écriture entre plusieurs machines (NFS, Kubernetes `ReadWriteMany`) — deux instances ZECD corrompraient la base de données wallet. Utilisez des volumes `ReadWriteOnce` dans Kubernetes.

---

## Liste de méthodes RPC autorisées

Pour les déploiements où une fuite d'identifiants serait catastrophique, ZECD permet de restreindre la surface RPC à un sous-ensemble choisi de méthodes :

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Toute méthode absente de la liste renvoie `-32601` (HTTP 404) — indiscernable d'une méthode qui n'existe pas, de sorte qu'un serveur verrouillé ne révèle rien de ce qu'il a désactivé. Un service de facturation en réception seule peut désactiver `sendtoaddress`, `sendmany` et `stop` afin de minimiser le rayon d'impact d'un client compromis.

---

## Différences clés par rapport au RPC de Bitcoin Core

Les développeurs migrant depuis Bitcoin ou l'outillage zcashd doivent connaître ces divergences intentionnelles :

| Comportement | Bitcoin Core | ZECD |
|----------|-------------|------|
| Format d'adresse | `1...` / `bc1...` | `u1...` (Unified Address Orchard) — impossible à analyser comme adresse Bitcoin par les clients qui parsèment les chaînes |
| Labels | Stockage complet des labels | Non implémenté — `setlabel`, `listlabels`, etc. renvoient `-32601` |
| Frais | Configurables par l'utilisateur ; marché des frais | ZIP-317 déterministe uniquement ; `settxfee`, `fee_rate`, `subtractfeefromamount` rejetés avec `-8` |
| Mémos | Non pris en charge | `sendtoaddress` accepte un mémo hex ; l'historique a des champs `memo` + `memoStr` |
| Confirmations pour dépenser | 1 | 3 (sa propre monnaie rendue) / 10 (tiers) — configurable via `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` en cas de reorg | Revient jusqu'au fork | Renvoie `-5` (Block not found) si le curseur a été écarté par reorg — réinitialisez la base avec un appel sans paramètre |
| Destinataires dupliqués dans `sendmany` | Erreur | Le parseur JSON fusionne les doublons (le dernier l'emporte) avant que ZECD ne les voie — ne listez pas la même adresse deux fois |
| Solde pendant la sync initiale | Bloque ou warm-up | Sert un solde partiel — conditionnez l'automatisation à `GET /readyz` (renvoie 503 jusqu'à la sync complète et l'épuisement du backlog d'amélioration) |
| `minconf 0` dans `getbalance` | Solde à 0 confirmation | Servi comme 1 — une note shielded n'est jamais dépensable non minée |

---

## Démarrage rapide

**Prérequis :** Zebra en cours d'exécution localement avec `rpc.listen_addr = 127.0.0.1:18234` (testnet).

Installer depuis crates.io (0.4.3+) :

```sh
cargo install zecd
```

Ou compiler depuis les sources :

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

**Interagir via Python (en utilisant une bibliothèque RPC Bitcoin) :**

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

**Restaurer à partir de la seed :**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## Ports par défaut

| Réseau | RPC ZECD | RPC Zebra (backend) | Santé |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| Rôle | Nœud complet + wallet | Indexeur (remplace lightwalletd) | Serveur de wallet uniquement |
| Langage | C++ | Rust | Rust |
| Statut | Déprécié | Actif | Actif (v0.5.0-rc3, juil. 2026) |
| Pool par défaut | Transparent | N/A | Orchard (shielded) |
| Dialecte RPC | Spécifique à zcashd | gRPC (lightwalletd) | JSON-RPC Bitcoin Core |
| Nécessite un nœud complet | Oui (lui-même) | Zebra ou zcashd | Zebra |
| Récupération sans état | Non | N/A | Oui (seed seule) |
| Mémos shielded | Oui (`z_sendmany`) | N/A | Oui (surface RPC Bitcoin) |
| Watch-only (UFVK) | Oui | Oui | Oui |
| Natif cloud | Non | Partiel | Oui |
| Installation | Build/binaire | Build | `cargo install zecd` |

---

## Pages liées

- [Nœud complet Zebra](Zebra_Full_Node.md) — le nœud complet auquel ZECD se connecte
- [Indexeur Zaino](Zaino.md) — approche alternative d'indexation (remplace lightwalletd)
- [Nœud Zakura](Zakura_Node.md) — autre implémentation de nœud complet (fork de Zebra)
- [Viewing Keys](Viewing_Keys.md) — comment ZECD scanne la chaîne à l'aide des clés de visualisation du compte
- [Wallets](/using-zcash/wallets) — vue d'ensemble de l'écosystème des wallets

## Ressources

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [Runbook d'exploitation ZECD](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — bibliothèque cryptographique principale de Zcash](https://github.com/zcash/librustzcash)
- [ZIP-317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
- [ZIP-302: Shielded Memos](https://zips.z.cash/zip-0302)
- [wallet Zodl (compatible librustzcash)](https://github.com/zodl-inc/zodl-ios)
