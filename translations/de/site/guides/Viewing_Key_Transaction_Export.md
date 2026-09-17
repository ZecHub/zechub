<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Exportieren des Transaktionsverlaufs aus einem Viewing Key

Die meisten Wallet-Exporte sind spärlich. Der Steuerexport von ZODL liefert beispielsweise Daten, Beträge und Gebühren für das vorherige Kalenderjahr, aber keine Transaktions-IDs, keine Memos und keine Adressen. Das reicht weder für die Buchhaltung noch zur Überprüfung einer Wallet-Migration oder um nachzuvollziehen, was mit einer Zahlung passiert ist.

Du benötigst deine Seed Phrase nicht, um das vollständige Bild zu erhalten. Ein Unified Full Viewing Key (UFVK, beginnend mit `uview1`) kann jede eingehende und ausgehende Transaktion eines Kontos sehen, und zwei Tools können daraus eine Datei erstellen, die du behältst: der Zkool-GraphQL-Server und zingo-cli. Dieser Leitfaden sammelt die Ansätze aus [diesem Forenthread](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) und aktualisiert sie für aktuelle Releases.

Getestet im September 2026 mit Zkool 6.30.0 und zingo-cli aus zingolib 6.0.0.

## Bevor du beginnst

Du benötigst zwei Dinge:

1. **Den UFVK** für das Konto. [Viewing Keys](/zcash-tech/viewing-keys) erklärt, was er offenlegt und wie du einen exportierst.
2. **Eine Geburtshöhe**, den Block, ab dem gescannt werden soll. Verwende eine Höhe vor deiner ersten Transaktion. Setzt du sie zu hoch, fehlt der ältere Verlauf unbemerkt. Setzt du sie zu niedrig, dauert der Scan lediglich länger. Die Aktivierung von Sapling (419200) ist immer sicher, kann aber Stunden zum Scannen benötigen.

## Privat halten

Ein Viewing Key kann nicht ausgeben, zeigt aber jedem, der ihn besitzt, deinen gesamten Verlauf.

- Füge ihn nicht auf einer Website oder in einem Block Explorer ein. Importiere ihn in Software, die du selbst ausführst.
- Der Server, von dem du synchronisierst, sieht deine IP-Adresse und welche Transaktionen du vollständig herunterlädst. Beide untenstehenden Tools rufen jede deiner Transaktionen anhand ihrer ID ab, um Memos und Gebühren zu lesen, und [ZIP 307](https://zips.z.cash/zip-0307) weist darauf hin, dass dies dem Server verrät, welche Transaktionen dir gehören. Die Synchronisierung über deinen eigenen Zebra-Knoten mit Zaino oder lightwalletd vermeidet das. Das [Zingolib- und Zaino-Tutorial](/guides/zingolib-and-zaino-tutorial) führt durch die Einrichtung.
- zingo-cli 6 sendet Zahlungen über das Nym-Mixnet, seine Synchronisierung verbindet sich jedoch weiterhin direkt mit dem Server; der obige Punkt gilt daher auch dafür.
- Gib diesen Tools einen Viewing Key, niemals einen Seed. Der Zkool-GraphQL-Server hat standardmäßig keine Anmeldung, und seine API gibt den Seed jedes damit erstellten Kontos zurück und kann Gelder versenden.
- Behalte den Server auf deinem eigenen Rechner. Der untenstehende Docker-Befehl lauscht nur auf `127.0.0.1`.
- Beide Tools speichern den Key und deinen Verlauf unverschlüsselt. Lösche die Arbeitsdaten, wenn du fertig bist, und bewahre den Export verschlüsselt auf.

## Option 1: Zkool GraphQL

`zkool_graphql` ist die Wallet-Engine von Zkool als eigenständiger Server. Es ist ein separates Programm von der Zkool-App. Am einfachsten startest du es mit dem offiziellen Docker-Image (amd64 und arm64). Auf der [Zkool-Releases-Seite](https://github.com/hhanh00/zkool2/releases) gibt es außerdem eine Linux-x86-64-Binärdatei; sie benötigt glibc 2.38 oder neuer, daher funktioniert Ubuntu 24.04, Debian 12 jedoch nicht.

### 1. Server starten

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Er synchronisiert über `https://zec.rocks`, sofern du nicht `--lwd-url` mit deinem eigenen Server hinzufügst. Beim ersten Start lädt er die Sapling-Parameter herunter (etwa 50 MB). Falls das fehlschlägt, versucht es `docker start zkool-export` erneut.

Öffne `http://127.0.0.1:8000/graphiql` in einem Browser. Du kannst dort jeden der nächsten Schritte einfügen und ausführen.

### 2. Key importieren

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

Es gibt die ID des neuen Kontos zurück, bei einem frischen Server ist das 1.

- Setze immer `birth`. Ohne diesen Wert startet Zkool beim aktuellen Block und findet nichts.
- `useInternal: true` sorgt dafür, dass Zkool auch transparente Wechselgeldadressen prüft. Lass es für Keys von ZODL aktiviert – dieselbe Einstellung, die [Recovering Funds](/using-zcash/recovering-funds) für ZODL-Seeds verwendet.

### 3. Synchronisieren

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Dies läuft, bis die Synchronisierung endet. Füge `fast: true` nicht hinzu. Damit wird das Herunterladen vollständiger Transaktionen übersprungen, aus denen Memos, Gebühren und Outputs stammen.

Die zurückgegebene Zahl ist die angestrebte Höhe, kein Beweis dafür, dass sie erreicht wurde. Ein Netzwerkfehler kann die Synchronisierung vorzeitig beenden, ohne etwas zu melden. Prüfe daher:

```graphql
{ currentHeight accounts { id name height } }
```

Wenn der `height` des Kontos hinter `currentHeight` liegt, führe die Synchronisierung erneut aus. Sie setzt dort fort, wo sie aufgehört hat.

### 4. Exportieren

Speichere dies als `history.graphql`:

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

Lass das Argument `height` weg, sofern du es nicht bewusst verwenden willst. Es setzt ein Minimum, daher lässt das Forumsbeispiel mit `height: 3000000` alles vor diesem Block weg.

Rufe es als JSON ab:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Jede Transaktion sollte – abgesehen von Mining-Rewards – eine Gebühr über 0 zeigen. Wenn eine `"fee": "0"` und kein Memo zeigt, wurden ihre Details nicht heruntergeladen. Zkool ruft nach dem Scan die vollständigen Transaktionen einzeln ab, und ein Fehler beendet unauffällig den Rest. Um betroffene Einträge aufzulisten:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Falls etwas erscheint, synchronisiere einige Minuten später erneut und exportiere wieder.

Anschließend in CSV abflachen, mit einer Zeile pro Transaktion:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Die Ausgabe lesen

| Feld | Bedeutung |
|---|---|
| `value` | Nettoveränderung des Kontos in ZEC, einschließlich Gebühr. Negativ bei Sendungen. |
| `fee` | Gebühr in ZEC. Bei Zahlungen, die du erhalten hast, hat der Sender sie bezahlt und sie ist nicht in `value` enthalten. |
| `time` | Blockzeit in UTC, ohne Zeitzonenkennzeichnung |
| `notes` | Was das Konto in dieser Transaktion erhalten hat, einschließlich Wechselgeld. An dich gesendete Memos stehen hier. Transparente Einträge haben keine Adresse. |
| `spends` | Die eigenen Notes des Kontos, die diese Transaktion verbraucht hat |
| `outputs` | Was die Transaktion gesendet hat: jeder transparente Output sowie abgeschirmte Zahlungen an andere Adressen mit ihren Memos |
| `pool` | 0 transparent, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 extern (eine eingehende Zahlung), 1 intern (Wechselgeld) |

Die Zkool-App bietet im Kontomenü ebenfalls Export Transactions, Memos und Notes, doch das sind reine Tabellen-Dumps: Beträge in Zatoshis, Unix-Zeitstempel und Memos in einer separaten Datei.

## Option 2: zingo-cli

zingo-cli ist die Kommandozeilen-Wallet von Zingo. Es gibt keine vorgefertigten Downloads, daher baust du sie mit Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Du benötigst `nym-proxy` sogar nur zum Synchronisieren. zingo-cli 6 verbindet sich ohne dies mit keinem Server.

Der erste Lauf erstellt eine reine Anzeige-Wallet, synchronisiert sie und gibt den Verlauf aus:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` muss ein absoluter Pfad sein.
- `--viewkey` und `--birthday` gelten nur beim Erstellen der Wallet. Lass sie danach weg.
- zingo-cli startet standardmäßig offline. `--server` wählt den Server und gilt zugleich als deine Zustimmung, online zu gehen.
- Der Key landet in deinem Shell-Verlauf, lösche ihn daher anschließend.

Spätere Läufe:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` liest bereits synchronisierte Daten, ohne das Netzwerk zu berühren.

- `transactions` liefert einen Eintrag pro Transaktion: txid, Zeit (UTC), Höhe, Art (`received`, `sent`, `shield` oder `send-to-self`), Wert, Gebühr und die beteiligten Notes.
- `value_transfers` liefert einen Eintrag pro Zahlung; eine Sendung an zwei Personen ergibt also zwei Einträge, jeweils mit Empfängeradresse und Memos.
- `messages` listet Memos als JSON auf.

Einige Dinge zur Ausgabe:

- `transactions` und `value_transfers` geben Klartext aus, der ein wenig wie JSON aussieht, aber keines ist.
- Beträge sind in Zatoshis (100.000.000 zu 1 ZEC) und immer positiv. `kind` zeigt dir die Richtung. Bei Sendungen ist `value` der Betrag, der an andere Personen ging, ohne die Gebühr.
- Die Gebühr wird als „not available“ angezeigt, wenn eine Transaktion transparente Gelder ausgibt, die nicht dir gehörten. Es werden nur Text-Memos angezeigt.
- Falls die Synchronisierung fehlschlägt, geht der Fehler ins Terminal, nicht in die Datei, und zingo-cli beendet sich trotzdem normal. Prüfe das Terminal, bevor du `transactions.txt` vertraust.

dismads [zingoHelper](https://github.com/dismad/zingoHelper) enthält ein `exportToJSON.sh`-Skript, das `transactions` in JSON umwandelt. Es wurde vor zingo-cli 6 geschrieben, ist für Testnet eingerichtet, kennzeichnet einige ausgehende Sapling- und transparente Einträge als Platzhalter und benötigt GNU-Tools, sodass es auf unverändertem macOS nicht läuft. Betrachte seine Ausgabe als Ausgangspunkt und überprüfe die Summen.

## Was ein Viewing Key nicht verraten kann

- **Preise.** Keines der Tools zeichnet einen ZEC-Preis zum Zeitpunkt jeder Transaktion auf. Füge Fiat-Werte selbst hinzu.
- **Transparenter Verlauf, falls der Key ihn nicht umfasst.** Der transparente Teil eines UFVK ist gemäß [ZIP 316](https://zips.z.cash/zip-0316) optional. Bei zingo-cli zeigt `$Z --offline parse_viewkey uview1...`, welche Pools ein Key abdeckt.
- **Wer dir gezahlt hat.** Abgeschirmte Zahlungen enthalten keine Senderadresse. Sofern der Sender keine in das Memo geschrieben hat, ist sie nirgends vorhanden.
- **Einige ausgehende Details.** Zieladresse, Betrag und Memo für abgeschirmte Sendungen werden durch Entschlüsselung mit dem Key wiederhergestellt. Eine Wallet kann eine Transaktion jedoch so erstellen, dass dies nicht möglich ist, auch wenn die meisten das nicht tun.

## Andere Tools

| Tool | Was du erhältst |
|---|---|
| ZODL | Steuer-CSV mit Daten, Beträgen, Gebühren und einem Tag. Nur das vorherige Kalenderjahr, überspringt Shielding-Transaktionen, keine txid, kein Memo und keine Adresse. |
| Zkool-App | Rohe Tabellenexporte aus dem Kontomenü |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importiert einen UFVK mit `importvk`. `listreceived` über RPC gibt empfangene Notes mit txid und Memo zurück, jedoch keine Sendungen und keine Gebühren. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` ist detailliert, aber als experimentell markiert, und Zallet importiert nur Sapling-Viewing Keys, keine UFVKs |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importiert einen UFVK mit `wallet init-fvk`, dann `wallet list-tx`. Sein CSV-Modus enthält keine txid oder Adresse, und das Projekt rät von der Nutzung in Produktion ab. |

## Verwandt

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Recovering Funds](/using-zcash/recovering-funds)
- [Zingolib- und Zaino-Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Forum: Transaktionsverlauf aus UFVK/Seed nach JSON/CSV exportieren](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Forum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
