<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Exporter l’historique des transactions depuis un Viewing Key

La plupart des exports de portefeuilles sont succincts. L’export fiscal de ZODL, par exemple, vous donne les dates, les montants et les frais de l’année civile précédente, mais aucun identifiant de transaction, aucun mémo et aucune adresse. Cela ne suffit pas pour la comptabilité, pour vérifier une migration de portefeuille ou pour comprendre ce qu’il est advenu d’un paiement.

Vous n’avez pas besoin de votre phrase de récupération pour obtenir une vue complète. Une clé unifiée complète pour lecture seule (UFVK, commençant par `uview1`) permet de voir toutes les transactions entrantes et sortantes d’un compte, et deux outils peuvent en faire un fichier que vous conserverez : le serveur Zkool GraphQL et zingo-cli. Ce guide rassemble les méthodes présentées dans [ce fil de discussion du forum](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) et les met à jour pour les versions actuelles.

Testé en septembre 2026 avec Zkool 6.30.0 et zingo-cli depuis zingolib 6.0.0. Les deux précèdent NU7 ; en novembre 2026, les étapes ont donc été mises à jour pour Zkool 6.37.0 et zingolib 8.0.0. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388) est la première version de Zkool compilée avec la hauteur d’activation de NU7 Mainnet, et zingolib 8.0.0 est la version qui ajoute la prise en charge de NU7 Mainnet.

## Avant de commencer

Vous avez besoin de deux éléments :

1. **La UFVK** du compte. [Clés pour lecture seule](/zcash-tech/viewing-keys) explique ce qu’elle révèle et comment l’exporter.
2. **Une hauteur de départ**, c’est-à-dire le bloc à partir duquel commencer le scan. Choisissez une hauteur antérieure à votre première transaction. Si elle est trop élevée, l’historique ancien sera omis sans avertissement. Si elle est trop basse, le scan prendra simplement plus de temps. L’activation de Sapling (419200) est toujours un choix sûr, mais le scan peut prendre plusieurs heures.

## Préserver la confidentialité

Une clé pour lecture seule ne permet pas de dépenser, mais elle révèle tout votre historique à quiconque la détient.

- Ne la collez pas dans un site Web ou un explorateur de blocs. Importez-la dans un logiciel que vous exécutez vous-même.
- Le serveur à partir duquel vous synchronisez voit votre adresse IP et les transactions que vous téléchargez intégralement. Les deux outils ci-dessous récupèrent chacune de vos transactions par identifiant pour lire les mémos et les frais, et [ZIP 307](https://zips.z.cash/zip-0307) précise que cela indique au serveur quelles transactions vous appartiennent. Synchroniser depuis votre propre nœud Zebra avec Zaino ou lightwalletd évite cela. Le [Zingolib et le Zaino tutoriel](/guides/zingolib-and-zaino-tutorial) vous guident dans la configuration.
- zingo-cli envoie les paiements via le mixnet Nym, mais sa synchronisation se connecte toujours directement au serveur ; le point ci-dessus s’applique donc aussi à cet outil.
- Donnez à ces outils une clé pour lecture seule, jamais une phrase de récupération. La commande Docker ci-dessous démarre le serveur Zkool GraphQL avec `--allow-unauthenticated` : il n’y a donc aucune authentification, et son API peut renvoyer la phrase de récupération de tout compte créé à partir d’une telle phrase, et envoyer des fonds.
- Gardez le serveur sur votre propre machine. La commande Docker ci-dessous n’écoute que sur `127.0.0.1` de votre ordinateur. Dans le conteneur, le serveur doit écouter sur toutes les interfaces (`--bind-address 0.0.0.0`), sinon Docker ne peut pas le joindre ; le mappage `-p 127.0.0.1:8000:8000` le maintient accessible uniquement en local.
- Les deux outils stockent la clé et votre historique sans chiffrement. Zkool peut chiffrer sa base de données (`--db-password-file`), mais la commande ci-dessous reste simple avec `--allow-unencrypted-database`. Supprimez les données de travail lorsque vous avez terminé et conservez l’export dans un emplacement chiffré.

## Option 1 : Zkool GraphQL

`zkool_graphql` est le moteur de portefeuille de Zkool sous forme de serveur autonome. C’est un programme distinct de l’application Zkool. La manière la plus simple de l’exécuter consiste à utiliser l’image officielle Docker (amd64 et arm64). Il existe aussi un binaire Linux x86-64 sur la [Zkoolpage des versions](https://github.com/hhanh00/zkool2/releases) ; il nécessite glibc 2.38 ou une version ultérieure. Ubuntu 24.04 convient, mais Debian 12 ne convient pas.

### 1. Démarrer le serveur

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

Depuis la version 6.32.0, le serveur ne démarre pas tant que vous n’avez pas explicitement fait deux choix : la méthode d’authentification des clients (une clé JWT ou `--allow-unauthenticated`) et le chiffrement ou non de la base de données (un mot de passe ou `--allow-unencrypted-database`). Par défaut, il n’écoute désormais que sur `127.0.0.1` ; dans un conteneur, rien à l’extérieur ne peut donc le joindre, d’où `--bind-address 0.0.0.0`. Si le conteneur s’arrête immédiatement, `docker logs zkool-export` indique l’option manquante.

La synchronisation se fait depuis `https://zec.rocks`, sauf si vous ajoutez `--lwd-url` avec votre propre serveur. L’image contient déjà les paramètres Sapling ; vous n’avez donc rien d’autre à télécharger.

Ouvrez `http://127.0.0.1:8000/graphiql` dans un navigateur. Vous pouvez y coller chacune des étapes suivantes et l’exécuter.

### 2. Importer la clé

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

La commande renvoie l’identifiant du nouveau compte, qui est 1 sur un serveur neuf.

- Définissez toujours `birth`. Sans cela, Zkool démarre à partir du bloc actuel et ne trouve rien.
- `useInternal: true` permet à Zkool de vérifier aussi les adresses transparentes de monnaie rendue. Laissez cette option activée pour les clés de ZODL ; c’est le même réglage qu’utilise [Récupérer des fonds](/using-zcash/recovering-funds) pour les phrases de récupération ZODL.

### 3. Synchroniser

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Cette commande s’exécute jusqu’à la fin de la synchronisation. N’ajoutez pas `fast: true`. Cette option ignore le téléchargement des transactions complètes, qui contiennent les mémos, les frais et les sorties.

Le nombre renvoyé correspond à la hauteur visée, et ne prouve pas que la synchronisation l’a atteinte. Une erreur réseau peut interrompre la synchronisation prématurément sans rien signaler ; vérifiez donc :

```graphql
{ currentHeight accounts { id name height } }
```

Si le `height` du compte est inférieur à `currentHeight`, relancez la synchronisation. Elle reprendra là où elle s’est arrêtée.

### 4. Exporter

Enregistrez ceci sous le nom `history.graphql` :

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

Omettez l’argument `height`, sauf si vous le souhaitez vraiment. Il définit un seuil minimal ; l’exemple du forum avec `height: 3000000` exclut donc tout ce qui précède ce bloc.

Récupérez le fichier au format JSON :

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Chaque transaction devrait afficher des frais supérieurs à 0, sauf les récompenses de minage. Si l’une d’elles affiche `"fee": "0"` et aucun mémo, ses détails n’ont pas été téléchargés. Zkool récupère les transactions complètes une par une après le scan ; une seule erreur interrompt discrètement le reste. Pour répertorier celles qui sont concernées :

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Si des résultats apparaissent, relancez la synchronisation après quelques minutes, puis exportez à nouveau.

Convertissez ensuite le fichier en CSV, avec une ligne par transaction :

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Lire les données exportées

| Champ | Signification |
|---|---|
| `value` | Variation nette du compte en ZEC, frais inclus. Valeur négative pour les envois. |
| `fee` | Frais en ZEC. Pour les paiements reçus, ils sont à la charge de l’expéditeur et ne sont pas inclus dans `value`. |
| `time` | Heure du bloc en UTC, sans indicateur de fuseau horaire |
| `notes` | Ce que le compte a reçu dans cette transaction, monnaie rendue comprise. Les mémos qui vous sont envoyés se trouvent ici. Les entrées transparentes n’ont pas d’adresse. |
| `spends` | Les notes propres au compte utilisées par cette transaction |
| `outputs` | Ce que la transaction a envoyé : chaque sortie transparente, ainsi que les paiements protégés à d’autres adresses et leurs mémos |
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 externe (un paiement reçu), 1 interne (monnaie rendue) |

L’application Zkool propose aussi Export Transactions, Memos and Notes dans le menu du compte, mais il s’agit de données brutes des tables : les montants sont en zatoshis, les horodatages au format Unix et les mémos dans un fichier séparé.

## Option 2 : zingo-cli

zingo-cli est le portefeuille en ligne de commande de Zingo. Aucun téléchargement précompilé n’est disponible ; vous devez donc le compiler avec Rust. Utilisez zingolib 8.0.0 ou une version ultérieure : c’est la première version qui connaît la hauteur d’activation de NU7 Mainnet (3,543,405), d’après ses [notes de version](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0). Les compilations à partir de versions plus anciennes, comme la 6.0.0, ne la connaissent pas.

La compilation utilise [cargo-make](https://github.com/sagiegurari/cargo-make) (`cargo install cargo-make`). Sous Ubuntu, vous avez également besoin de `sudo apt install build-essential gcc libsqlite3-dev`.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

Cette commande compile `./target/release/zingo-cli` et place `nym-proxy` à côté. Vous avez besoin de `nym-proxy` même pour synchroniser : zingo-cli ne se connectera pas au réseau sans cet outil. Depuis la version 8.0.0, `zingo-netutils` fait partie de l’espace de travail principal ; l’ancienne recette qui copiait `nym-proxy` depuis `zingo-netutils/target/release/` ne fonctionne donc plus.

Si vous déplacez `zingo-cli` ailleurs, déplacez aussi `nym-proxy` ou indiquez son emplacement à zingo-cli avec `--nym-proxy /path/to/nym-proxy` ou la variable d’environnement `ZINGO_NYM_PROXY`. Sans ces indications, le programme cherche à côté de son propre binaire, puis dans votre `PATH`. S’il ne peut pas démarrer le proxy, il ne se connectera pas du tout au réseau.

Seuls les paiements (et la consultation des prix ZEC) passent par Nym. La synchronisation se connecte directement au serveur.

La première exécution crée un portefeuille en lecture seule, le synchronise et affiche l’historique :

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` doit être un chemin absolu.
- `--viewkey` et `--birthday` ne s’appliquent qu’à la création du portefeuille. Omettez-les ensuite.
- Un nouveau zingo-cli est hors ligne par défaut et nécessite votre consentement pour se connecter au réseau. `--server` choisit le serveur et vaut également consentement. Vous pouvez aussi utiliser `--online` (pour cette session uniquement) ou `--remember-online`, qui enregistre aussi le choix à côté du portefeuille afin que les exécutions suivantes se connectent sans option (`--forget-online` annule ce choix).
- La clé se retrouve dans l’historique de votre shell ; effacez-la ensuite.

Pour les exécutions suivantes :

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` lit les données déjà synchronisées sans accéder au réseau.

- `transactions` renvoie une entrée par transaction : txid, heure (UTC), hauteur, type (`received`, `sent`, `shield` ou `send-to-self`), valeur, frais et notes concernées.
- `value_transfers` renvoie une entrée par paiement ; un envoi à deux personnes donne donc deux entrées, chacune avec l’adresse du destinataire et les mémos.
- `messages` répertorie les mémos au format JSON.

Quelques points à connaître sur les données exportées :

- `transactions` et `value_transfers` affichent du texte brut qui ressemble un peu à du JSON, mais qui n’en est pas.
- Les montants sont en zatoshis (100 000 000 pour 1 ZEC) et toujours positifs. `kind` indique le sens du paiement. Pour les envois, `value` correspond au montant envoyé à d’autres personnes, hors frais.
- Les frais indiquent « non disponibles » lorsqu’une transaction dépense des fonds transparents qui ne vous appartenaient pas. Seuls les mémos textuels sont affichés.
- Si la synchronisation échoue, l’erreur s’affiche dans le terminal, pas dans le fichier. Depuis zingolib 8.0.0 (zingo-cli 0.5.0), une commande échouée se termine aussi avec un code différent de zéro, mais vérifiez le terminal avant de vous fier à `transactions.txt`.

Le [zingoHelper](https://github.com/dismad/zingoHelper) de dismad contient un script `exportToJSON.sh` qui convertit `transactions` en JSON. Il a été écrit avant zingo-cli 6, est configuré pour le testnet, représente certaines sorties Sapling et entrées transparentes comme des espaces réservés et nécessite les outils GNU ; il ne fonctionne donc pas sur une installation standard de macOS. Considérez ses données comme un point de départ et vérifiez les totaux.

## Ce qu’une clé pour lecture seule ne peut pas vous apprendre

- **Les prix.** Aucun des deux outils n’enregistre le prix ZEC au moment de chaque transaction. Ajoutez vous-même les valeurs en monnaie fiduciaire.
- **L’historique transparent, si la clé ne l’inclut pas.** La partie transparente d’une UFVK est facultative selon [ZIP 316](https://zips.z.cash/zip-0316). Avec zingo-cli, `$Z --offline parse_viewkey uview1...` indique les pools couverts par une clé.
- **L’identité de l’expéditeur.** Les paiements protégés ne contiennent pas l’adresse de l’expéditeur. À moins que celui-ci ne l’ait inscrite dans le mémo, elle n’est indiquée nulle part.
- **Certains détails des envois.** L’adresse de destination, le montant et le mémo des envois protégés sont récupérés par déchiffrement avec la clé. Un portefeuille peut construire une transaction de manière à rendre cela impossible, même si la plupart ne le font pas.

## Autres outils

| Outil | Données obtenues |
|---|---|
| ZODL | CSV fiscal avec les dates, les montants, les frais et une étiquette. Uniquement pour l’année civile précédente ; omet les transactions de protection, sans txid, mémo ni adresse. |
| application Zkool | Exports bruts des tables depuis le menu du compte |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importe une UFVK avec `importvk`. `listreceived` via RPC renvoie les notes reçues avec le txid et le mémo, mais sans les envois ni les frais. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` fournit des détails, mais est marqué comme expérimental ; Zallet n’importe que les clés pour lecture seule Sapling, pas les UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importe une UFVK avec `wallet init-fvk`, puis `wallet list-tx`. Le mode CSV ne fournit ni txid ni adresse, et le projet déconseille son utilisation en production. |

## Articles connexes

- [Clés pour lecture seule](/zcash-tech/viewing-keys)
- [Récupérer des fonds](/using-zcash/recovering-funds)
- [Zingolib et le Zainotutoriel](/guides/zingolib-and-zaino-tutorial)
- [Forum : exporter l’historique des transactions au format JSON/CSV depuis une UFVK/phrase de récupération](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum : Zkool et GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
