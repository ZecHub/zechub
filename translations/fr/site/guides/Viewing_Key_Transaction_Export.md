<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exporter l'historique des transactions d'un Viewing Key

La plupart des exports de portefeuille sont sommaires. L'export fiscal de ZODL, par exemple, vous fournit les dates, les montants et les frais de l'année civile précédente, mais aucun identifiant de transaction, aucun mémo et aucune adresse. Cela ne suffit pas pour la comptabilité, pour vérifier une migration de portefeuille ou pour comprendre ce qu'il est advenu d'un paiement.

Vous n'avez pas besoin de votre phrase de récupération pour obtenir une vue complète. Une clé pour lecture seule complète unifiée (UFVK, commençant par `uview1`) permet de voir chaque transaction entrante et sortante d'un compte, et deux outils peuvent en tirer un fichier que vous conservez : le serveur GraphQL Zkool et zingo-cli. Ce guide rassemble les approches de [ce fil de discussion du forum](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) et les met à jour pour les versions actuelles.

Testé en septembre 2026 avec Zkool 6.30.0 et zingo-cli issu de zingolib 6.0.0.

## Avant de commencer

Vous avez besoin de deux choses :

1. **L'UFVK** du compte. [Viewing Keys](/zcash-tech/viewing-keys) explique ce qu'elle révèle et comment l'exporter.
2. **Une hauteur de naissance**, c'est-à-dire le bloc à partir duquel commencer l'analyse. Utilisez une hauteur antérieure à votre première transaction. Si elle est trop élevée, l'historique plus ancien manquera sans aucun avertissement. Si elle est trop basse, l'analyse prendra simplement plus de temps. L'activation de Sapling (419200) est toujours un choix sûr, mais son analyse peut prendre des heures.

## Préservez votre confidentialité

Une clé pour lecture seule ne permet pas de dépenser, mais elle montre l'intégralité de votre historique à quiconque la détient.

- Ne la collez pas dans un site web ou un explorateur de blocs. Importez-la dans un logiciel que vous exécutez vous-même.
- Le serveur à partir duquel vous synchronisez voit votre adresse IP et les transactions que vous téléchargez en entier. Les deux outils ci-dessous récupèrent chacune de vos transactions par son identifiant pour lire les mémos et les frais, et [ZIP 307](https://zips.z.cash/zip-0307) souligne que cela indique au serveur quelles transactions vous appartiennent. Synchroniser à partir de votre propre nœud Zebra avec Zaino ou lightwalletd permet d'éviter cela. Le [tutoriel Zingolib et Zaino](/guides/zingolib-and-zaino-tutorial) décrit une installation pas à pas.
- zingo-cli 6 envoie les paiements via le mixnet Nym, mais sa synchronisation se connecte toujours directement au serveur ; le point précédent s'applique donc aussi à lui.
- Donnez à ces outils une clé pour lecture seule, jamais une phrase de récupération. Le serveur GraphQL Zkool n'a pas d'authentification par défaut, et son API renverra la phrase de récupération de tout compte créé à partir de celle-ci ; elle peut également envoyer des fonds.
- Gardez le serveur sur votre propre machine. La commande Docker ci-dessous n'écoute que sur `127.0.0.1`.
- Les deux outils stockent la clé et votre historique sans chiffrement. Supprimez les données de travail lorsque vous avez terminé et conservez l'export dans un emplacement chiffré.

## Option 1 : Zkool GraphQL

`zkool_graphql` est le moteur de portefeuille de Zkool sous forme de serveur autonome. C'est un programme distinct de l'application Zkool. Le moyen le plus simple de l'exécuter est l'image officielle Docker (amd64 et arm64). Il existe aussi un binaire Linux x86-64 sur la [Zkoolpage des versions](https://github.com/hhanh00/zkool2/releases) ; il nécessite glibc 2.38 ou une version plus récente, donc Ubuntu 24.04 fonctionne, mais pas Debian 12.

### 1. Démarrer le serveur

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Il se synchronise à partir de `https://zec.rocks`, sauf si vous ajoutez `--lwd-url` avec votre propre serveur. Au premier démarrage, il télécharge les paramètres Sapling (environ 50 Mo). Si cela échoue, `docker start zkool-export` réessaie.

Ouvrez `http://127.0.0.1:8000/graphiql` dans un navigateur. Vous pouvez y coller chacune des étapes suivantes et l'exécuter.

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

Cela renvoie l'identifiant du nouveau compte, qui est 1 sur un serveur neuf.

- Définissez toujours `birth`. Sans cela, Zkool commence au bloc actuel et ne trouve rien.
- `useInternal: true` fait aussi vérifier par Zkool les adresses de monnaie transparentes. Laissez-le activé pour les clés issues de ZODL ; c'est le même réglage que [Récupération des fonds](/using-zcash/recovering-funds) utilise pour les phrases de récupération ZODL.

### 3. Synchroniser

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Cette commande s'exécute jusqu'à la fin de la synchronisation. N'ajoutez pas `fast: true`. Cette option saute le téléchargement des transactions complètes, d'où proviennent les mémos, les frais et les sorties.

Le nombre renvoyé est la hauteur visée, pas la preuve qu'elle a été atteinte. Une erreur réseau peut interrompre la synchronisation prématurément sans rien signaler ; vérifiez donc :

```graphql
{ currentHeight accounts { id name height } }
```

Si le `height` du compte est en retard sur `currentHeight`, relancez la synchronisation. Elle reprend là où elle s'est arrêtée.

### 4. Exporter

Enregistrez ceci sous `history.graphql` :

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

N'incluez pas l'argument `height`, sauf si c'est voulu. Il fixe un minimum : le `height: 3000000` de l'exemple du forum supprime donc tout ce qui précède ce bloc.

Récupérez-le au format JSON :

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Chaque transaction devrait afficher des frais supérieurs à 0, à l'exception des récompenses de minage. Si l'une d'elles affiche `"fee": "0"` et aucun mémo, ses détails n'ont pas été téléchargés. Zkool récupère les transactions complètes une par une après l'analyse, et un seul échec interrompt silencieusement les suivantes. Pour lister celles qui sont concernées :

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Si quelque chose apparaît, relancez la synchronisation quelques minutes plus tard, puis exportez à nouveau.

Convertissez ensuite le résultat en CSV, avec une ligne par transaction :

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Lire le résultat

| Champ | Signification |
|---|---|
| `value` | Variation nette du compte en ZEC, frais inclus. Négative pour les envois. |
| `fee` | Frais en ZEC. Pour les paiements reçus, c'est l'expéditeur qui les a payés et ils ne figurent pas dans `value`. |
| `time` | Heure du bloc en UTC, sans indicateur de fuseau horaire |
| `notes` | Ce que le compte a reçu dans cette transaction, monnaie rendue comprise. Les mémos qui vous ont été envoyés se trouvent ici. Les entrées transparentes n'ont pas d'adresse. |
| `spends` | Les notes propres au compte que cette transaction a consommées |
| `outputs` | Ce que la transaction a envoyé : chaque sortie transparente, ainsi que les paiements protégés vers d'autres adresses avec leurs mémos |
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 externe (un paiement entrant), 1 interne (monnaie rendue) |

L'application Zkool propose aussi « Exporter les transactions », « Exporter les mémos » et « Exporter les notes » dans le menu du compte, mais il s'agit de simples vidages de tables : montants en zatoshis, horodatages Unix et mémos dans un fichier séparé.

## Option 2 : zingo-cli

zingo-cli est le portefeuille en ligne de commande de Zingo. Il n'existe pas de téléchargements précompilés ; vous devez donc le compiler avec Rust :

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Vous avez besoin de `nym-proxy`, même uniquement pour synchroniser. zingo-cli 6 ne se connecte à aucun serveur sans cela.

La première exécution crée un portefeuille en lecture seule, le synchronise et affiche l'historique :

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` doit être un chemin absolu.
- `--viewkey` et `--birthday` ne s'appliquent qu'à la création du portefeuille. Omettez-les ensuite.
- zingo-cli démarre hors ligne par défaut. `--server` sélectionne le serveur et vaut également consentement à passer en ligne.
- La clé se retrouve dans l'historique de votre shell ; effacez-le ensuite.

Exécutions suivantes :

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` lit ce qui est déjà synchronisé sans accéder au réseau.

- `transactions` fournit une entrée par transaction : txid, heure (UTC), hauteur, type (`received`, `sent`, `shield` ou `send-to-self`), valeur, frais et notes concernées.
- `value_transfers` fournit une entrée par paiement : un envoi à deux personnes donne donc deux entrées, chacune avec l'adresse du destinataire et les mémos.
- `messages` liste les mémos au format JSON.

Quelques points à connaître sur le résultat :

- `transactions` et `value_transfers` affichent du texte brut qui ressemble un peu à du JSON, mais n'en est pas.
- Les montants sont exprimés en zatoshis (100 000 000 pour 1 ZEC) et sont toujours positifs. `kind` indique le sens. Pour les envois, `value` correspond à ce qui est parti vers d'autres personnes, hors frais.
- Les frais s'affichent comme « not available » lorsqu'une transaction dépense des fonds transparents qui ne vous appartenaient pas. Seuls les mémos textuels sont affichés.
- Si la synchronisation échoue, l'erreur s'affiche dans le terminal et non dans le fichier, et zingo-cli se termine tout de même normalement. Vérifiez le terminal avant de vous fier à `transactions.txt`.

Le dépôt [zingoHelper](https://github.com/dismad/zingoHelper) de dismad contient un script `exportToJSON.sh` qui convertit `transactions` en JSON. Il a été écrit avant zingo-cli 6, est configuré pour le testnet, marque certaines entrées sortantes Sapling et transparentes comme des valeurs de remplacement, et nécessite les outils GNU : il ne fonctionnera donc pas sur un macOS standard. Considérez son résultat comme un point de départ et vérifiez les totaux.

## Ce qu'une clé pour lecture seule ne peut pas vous dire

- **Les prix.** Aucun des deux outils n'enregistre le cours du ZEC au moment de chaque transaction. Ajoutez vous-même les valeurs en monnaie fiduciaire.
- **L'historique transparent, si la clé ne l'inclut pas.** La partie transparente d'une UFVK est facultative selon [ZIP 316](https://zips.z.cash/zip-0316). Avec zingo-cli, `$Z --offline parse_viewkey uview1...` indique quels pools une clé couvre.
- **Qui vous a payé.** Les paiements protégés ne contiennent pas l'adresse de l'expéditeur. À moins que celui-ci ne l'ait indiquée dans le mémo, elle ne figure nulle part.
- **Certains détails des envois.** L'adresse de destination, le montant et le mémo des envois protégés sont récupérés en déchiffrant avec la clé. Un portefeuille peut toutefois construire une transaction de façon à rendre cela impossible, même si la plupart ne le font pas.

## Autres outils

| Outil | Ce que vous obtenez |
|---|---|
| ZODL | CSV fiscal avec dates, montants, frais et une étiquette. Uniquement l'année civile précédente, ignore les transactions de protection, sans txid, mémo ni adresse. |
| Application Zkool | Exports bruts des tables depuis le menu du compte |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importe une UFVK avec `importvk`. `listreceived` via RPC renvoie les notes reçues avec txid et mémo, mais ni les envois ni les frais. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` est détaillé, mais marqué comme expérimental, et Zallet n'importe que les clés pour lecture seule Sapling, pas les UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importe une UFVK avec `wallet init-fvk`, puis `wallet list-tx`. Son mode CSV ne comporte ni txid ni adresse, et le projet déconseille de l'utiliser en production. |

## Voir aussi

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Récupération des fonds](/using-zcash/recovering-funds)
- [Tutoriel Zingolib et Zaino](/guides/zingolib-and-zaino-tutorial)
- [Forum : exporter l'historique des transactions en JSON/CSV à partir d'une UFVK ou d'une phrase de récupération](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum : Zkool et GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [README de zingo-cli](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
