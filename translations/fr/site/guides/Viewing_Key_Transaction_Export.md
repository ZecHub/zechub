<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exporter l'historique des transactions depuis un Viewing Key

La plupart des exports de wallet sont limités. L'export fiscal de ZODL, par exemple, vous donne les dates, les montants et les frais de l'année civile précédente, mais aucun identifiant de transaction, mémo ou adresse. Cela ne suffit pas pour la comptabilité, pour vérifier une migration de wallet ou pour déterminer ce qui est arrivé à un paiement.

Vous n'avez pas besoin de votre phrase de récupération pour avoir une vision complète. Une clé de visualisation complète unifiée (UFVK, commençant par `uview1`) peut voir chaque transaction entrante et sortante d'un compte, et deux outils peuvent la transformer en fichier à conserver : le serveur GraphQL Zkool et zingo-cli. Ce guide rassemble les approches du [fil de discussion du forum](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) et les met à jour pour les versions actuelles.

Testé en septembre 2026 avec Zkool 6.30.0 et zingo-cli de zingolib 6.0.0.

## Avant de commencer

Vous avez besoin de deux éléments :

1. **L'UFVK** du compte. [Clés de visualisation](/zcash-tech/viewing-keys) explique ce qu'elle révèle et comment en exporter une.
2. **Une hauteur de naissance**, le bloc à partir duquel commencer l'analyse. Utilisez une hauteur antérieure à votre première transaction. Si elle est trop élevée, l'historique plus ancien manque silencieusement. Si elle est trop basse, l'analyse prendra simplement plus de temps. L'activation de Sapling (419200) est toujours sûre, mais son analyse peut prendre des heures.

## Préservez votre confidentialité

Une clé de visualisation ne peut pas dépenser, mais elle montre tout votre historique à quiconque la détient.

- Ne la collez pas dans un site web ou un explorateur de blocs. Importez-la dans un logiciel que vous exécutez vous-même.
- Le serveur depuis lequel vous synchronisez voit votre adresse IP et les transactions que vous téléchargez intégralement. Les deux outils ci-dessous récupèrent chacune de vos transactions par ID pour lire les mémos et les frais, et [ZIP 307](https://zips.z.cash/zip-0307) indique que cela révèle au serveur quelles transactions sont les vôtres. La synchronisation depuis votre propre nœud Zebra avec Zaino ou lightwalletd évite cela. Le tutoriel [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) présente une configuration.
- zingo-cli 6 envoie les paiements via le mixnet Nym, mais sa synchronisation se connecte toujours directement au serveur ; le point ci-dessus s'applique donc aussi à lui.
- Donnez à ces outils une clé de visualisation, jamais une phrase de récupération. Le serveur GraphQL Zkool n'a pas de connexion par défaut, et son API renverra la phrase de récupération de tout compte créé à partir d'une telle phrase, et peut envoyer des fonds.
- Gardez le serveur sur votre propre machine. La commande Docker ci-dessous n'écoute que sur `127.0.0.1`.
- Les deux outils stockent la clé et votre historique sans chiffrement. Supprimez les données de travail lorsque vous avez terminé et conservez l'export dans un emplacement chiffré.

## Option 1 : GraphQL Zkool

`zkool_graphql` est le moteur de wallet de Zkool sous forme de serveur autonome. Il s'agit d'un programme distinct de l'application Zkool. La manière la plus simple de l'exécuter est l'image Docker officielle (amd64 et arm64). Il existe aussi un binaire Linux x86-64 sur la [Zkoolpage des versions](https://github.com/hhanh00/zkool2/releases) ; il nécessite glibc 2.38 ou une version plus récente, donc Ubuntu 24.04 convient, mais pas Debian 12.

### 1. Démarrer le serveur

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Il se synchronise depuis `https://zec.rocks`, sauf si vous ajoutez `--lwd-url` avec votre propre serveur. Au premier démarrage, il télécharge les paramètres Sapling (environ 50 Mo). Si cela échoue, `docker start zkool-export` réessaie.

Ouvrez `http://127.0.0.1:8000/graphiql` dans un navigateur. Vous pouvez y coller chacune des étapes suivantes et les exécuter.

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

Cela renvoie l'ID du nouveau compte, qui est 1 sur un serveur vierge.

- Définissez toujours `birth`. Sans cela, Zkool commence au bloc actuel et ne trouve rien.
- `useInternal: true` fait vérifier à Zkool les adresses transparentes de monnaie rendue également. Laissez-le activé pour les clés de ZODL ; c'est le même réglage que [Récupération de fonds](/using-zcash/recovering-funds) utilise pour les phrases de récupération ZODL.

### 3. Synchroniser

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Cette commande s'exécute jusqu'à la fin de la synchronisation. N'ajoutez pas `fast: true`. Cela évite le téléchargement des transactions complètes, qui est la source des mémos, frais et sorties.

Le nombre qu'elle renvoie est la hauteur qu'elle visait, et non une preuve qu'elle l'a atteinte. Une erreur réseau peut arrêter la synchronisation prématurément sans rien signaler ; vérifiez donc :

```graphql
{ currentHeight accounts { id name height } }
```

Si la `height` du compte est en retard sur `currentHeight`, relancez la synchronisation. Elle reprend là où elle s'est arrêtée.

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

Omettez l'argument `height` sauf si c'est intentionnel. Il définit un minimum ; ainsi, le `height: 3000000` de l'exemple du forum exclut tout ce qui précède ce bloc.

Récupérez-le au format JSON :

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Chaque transaction devrait afficher des frais supérieurs à 0, à l'exception des récompenses de minage. Si l'une affiche `"fee": "0"` et aucun mémo, ses détails n'ont pas été téléchargés. Zkool récupère les transactions complètes une à une après l'analyse, et un échec arrête silencieusement les suivantes. Pour lister les transactions concernées :

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Si quelque chose apparaît, synchronisez à nouveau quelques minutes plus tard, puis exportez de nouveau.

Ensuite, aplatissez-le en CSV, avec une ligne par transaction :

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Lire la sortie

| Champ | Signification |
|---|---|
| `value` | Variation nette du compte en ZEC, frais inclus. Négative pour les envois. |
| `fee` | Frais en ZEC. Pour les paiements que vous avez reçus, l'expéditeur les a payés et ils ne sont pas inclus dans `value`. |
| `time` | Heure du bloc en UTC, sans indicateur de fuseau horaire |
| `notes` | Ce que le compte a reçu dans cette transaction, y compris la monnaie rendue. Les mémos qui vous sont envoyés se trouvent ici. Les entrées transparentes n'ont pas d'adresse. |
| `spends` | Les propres notes du compte que cette transaction a consommées |
| `outputs` | Ce que la transaction a envoyé : chaque sortie transparente, ainsi que les paiements protégés vers d'autres adresses avec leurs mémos |
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 externe (un paiement entrant), 1 interne (monnaie rendue) |

L'application Zkool propose également Export Transactions, Memos et Notes dans le menu du compte, mais ce sont des exports de tables brutes : montants en zatoshis, horodatages Unix et mémos dans un fichier distinct.

## Option 2 : zingo-cli

zingo-cli est le wallet en ligne de commande de Zingo. Il n'existe aucun téléchargement précompilé ; vous devez donc le compiler avec Rust :

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Vous avez besoin de `nym-proxy` même pour simplement synchroniser. zingo-cli 6 ne se connectera à aucun serveur sans cela.

La première exécution crée un wallet en lecture seule, le synchronise et affiche l'historique :

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` doit être un chemin absolu.
- `--viewkey` et `--birthday` ne s'appliquent qu'à la création du wallet. Omettez-les ensuite.
- zingo-cli démarre hors ligne par défaut. `--server` sélectionne le serveur et vaut également consentement de votre part à vous connecter.
- La clé se retrouve dans l'historique de votre shell ; effacez-le ensuite.

Exécutions ultérieures :

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` lit ce qui est déjà synchronisé sans toucher au réseau.

- `transactions` donne une entrée par transaction : txid, heure (UTC), hauteur, type (`received`, `sent`, `shield` ou `send-to-self`), valeur, frais et notes concernées.
- `value_transfers` donne une entrée par paiement ; ainsi, un envoi à deux personnes produit deux entrées, chacune avec l'adresse du destinataire et les mémos.
- `messages` liste les mémos au format JSON.

Quelques points à connaître concernant la sortie :

- `transactions` et `value_transfers` affichent du texte brut qui ressemble un peu à du JSON, mais n'en est pas.
- Les montants sont en zatoshis (100 000 000 pour 1 ZEC) et toujours positifs. `kind` indique la direction. Pour les envois, `value` correspond à ce qui est allé à d'autres personnes, sans les frais.
- Les frais s'affichent comme « not available » lorsqu'une transaction dépense des fonds transparents qui ne vous appartenaient pas. Seuls les mémos textuels sont affichés.
- Si la synchronisation échoue, l'erreur s'affiche dans le terminal, pas dans le fichier, et zingo-cli se termine tout de même normalement. Vérifiez le terminal avant de vous fier à `transactions.txt`.

Le [zingoHelper](https://github.com/dismad/zingoHelper) de dismad contient un script `exportToJSON.sh` qui convertit `transactions` en JSON. Il a été écrit avant zingo-cli 6, est configuré pour testnet, marque certaines entrées sortantes Sapling et transparentes comme espaces réservés, et nécessite les outils GNU ; il ne fonctionnera donc pas sur macOS standard. Considérez sa sortie comme un point de départ et vérifiez les totaux.

## Ce qu'une clé de visualisation ne peut pas vous dire

- **Prix.** Aucun des deux outils n'enregistre le prix de ZEC au moment de chaque transaction. Ajoutez vous-même les valeurs en monnaie fiduciaire.
- **Historique transparent, si la clé ne l'inclut pas.** La partie transparente d'une UFVK est facultative selon [ZIP 316](https://zips.z.cash/zip-0316). Avec zingo-cli, `$Z --offline parse_viewkey uview1...` indique quels pools couvre une clé.
- **Qui vous a payé.** Les paiements protégés ne contiennent pas l'adresse de l'expéditeur. À moins que l'expéditeur n'en ait mis une dans le mémo, elle n'existe nulle part.
- **Certains détails sortants.** L'adresse de destination, le montant et le mémo des envois protégés sont récupérés en les déchiffrant avec la clé. Un wallet peut néanmoins construire une transaction de manière à ce que cela soit impossible, bien que la plupart ne le fassent pas.

## Autres outils

| Outil | Ce que vous obtenez |
|---|---|
| ZODL | CSV fiscal avec dates, montants, frais et une étiquette. Année civile précédente uniquement, ignore les transactions de protection, sans txid, mémo ni adresse. |
| Application Zkool | Exports de tables brutes depuis le menu du compte |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importe une UFVK avec `importvk`. `listreceived` via RPC renvoie les notes reçues avec txid et mémo, mais pas les envois ni les frais. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` est détaillé mais marqué expérimental, et Zallet n'importe que les clés de visualisation Sapling, pas les UFVK |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importe une UFVK avec `wallet init-fvk`, puis `wallet list-tx`. Son mode CSV ne contient ni txid ni adresse, et le projet indique de ne pas l'utiliser en production. |

## Articles connexes

- [Clés de visualisation](/zcash-tech/viewing-keys)
- [Récupération de fonds](/using-zcash/recovering-funds)
- [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum : Exporter l'historique des transactions en JSON/CSV depuis une UFVK/phrase de récupération](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum : Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [README de zingo-cli](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
