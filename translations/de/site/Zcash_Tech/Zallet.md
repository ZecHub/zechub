<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet ist eine in Rust geschriebene Zcash-Wallet für Vollknoten. Sie ersetzt die Wallet, die früher in `zcashd` eingebettet war. Nachdem `zcashd` am 18. Juli 2026 bei Blockhöhe 3417100 das Ende seines Supports erreicht hatte, wurden Konsens- und Wallet-Aufgaben aufgeteilt: **Zebra** oder **Zakura** validieren die Chain, und **Zallet** verwaltet Schlüssel, scannt Notes und stellt die Wallet-JSON-RPC bereit.

Zallet befindet sich derzeit in der **Beta-Phase**. Es wurde noch nicht vollständig geprüft. Inkompatible Änderungen können das Löschen und Neuerstellen der Wallet erforderlich machen. Verwende es nicht als Verwahrungslösung für große Mengen an ZEC, ohne die Sicherheitswarnungen im [The Zallet Book](https://zcash.github.io/zallet/) gelesen zu haben.

---

## Kurzfassung

- Zallet ist eine **RPC-Wallet für Vollknoten**, keine mobile Light Wallet und kein Konsens-Knoten.
- Es ersetzt die Wallet-Hälfte von `zcashd`. Die Knoten-Hälfte ist [Zebra](Zebra_Full_Node.md) oder [Zakura](Zakura_Node.md).
- In **Rust** geschrieben, dual lizenziert unter MIT / Apache-2.0 und gepflegt in [zcash/zallet](https://github.com/zcash/zallet).
- Neueste veröffentlichte Version: **v0.1.0-beta.4** (2. November 2026). Sie folgt auf [NU7](NU7.md) und benötigt `zebrad` **7.0.0 oder höher**.
- Liest Chain-Daten über ein Backend, **zebra**: `ReadStateService` gegen das Zustandsverzeichnis eines `zebrad` auf demselben Host sowie Zebras JSON-RPC. Das Backend Zaino wurde in v0.1.0-beta.4 entfernt.
- Stellt eine Teilmenge der mit **zcashd kompatiblen JSON-RPC** bereit. Einige Methoden wurden geändert, andere bewusst ausgelassen.
- Schlüsselmaterial wird stets mit **age** verschlüsselt. Transaktionsverlauf, Adressen und Viewing Keys liegen in `wallet.db` im Klartext vor.
- Enthält zwei Binärdateien in einem signierten Archiv: `zallet` (Launcher) und `zallet-zebra`. **Nur Linux** kann eine Wallet synchronisieren: Unter macOS oder Windows läuft noch kein Chain-Backend.
- `zallet backup` (neu in Beta.4) erstellt einen konsistenten Snapshot einer laufenden oder gestoppten Wallet.
- Offizielle Dokumentation: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Warum Zallet existiert

`zcashd` bündelte einen von Bitcoin Core abgeleiteten Konsens-Knoten und eine Wallet in einem Prozess. Dieses Design existiert nicht mehr.

| Rolle | Alter Stack | Aktueller Stack |
|------|-----------|---------------|
| Konsens / P2P | `zcashd` | Zebra (`zebrad`) oder Zakura |
| Wallet / Schlüssel / Guthaben | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| Light-Client-Indexer | `lightwalletd` | Zaino oder `lightwalletd` |

Die Ausgliederung der Wallet aus dem Knoten bedeutet:

- Die Knoten-Software kann ausgetauscht werden (Zebra gegenüber Zakura), ohne Schlüssel zu verschieben.
- Wallet-Scanning und Ausgabeberechtigung laufen in einem Prozess, der separat abgesichert werden kann.
- Die RPC-Semantik kann sich in Richtung ZIP 32 Accounts, Unified Addresses und PCZTs entwickeln, statt an den Eigenheiten von `zcashd` festzuhalten.

Zallet ist die Wallet für Betreiber, die `zcashd` zuvor als Hot Wallet, Exchange-Backend, Faucet oder Mining-Auszahlungs-Wallet betrieben haben.

---

## Status

Zallet befindet sich in der **Beta-Phase**.

Das bedeutet in der Praxis:

- In jeder Beta können inkompatible Änderungen erscheinen. Möglicherweise musst du das Datenverzeichnis löschen und neu beginnen.
- Nicht jede Wallet-RPC von `zcashd` wurde portiert.
- Die Semantik einiger portierter Methoden unterscheidet sich von `zcashd`. Integrationen müssen die [Seite zu geänderter Semantik](https://zcash.github.io/zallet/zcashd/json_rpc.html) lesen.
- Die Crates befinden sich in Entwicklung und wurden noch nicht vollständig geprüft.
- Zallet ist **keine** Rust-Bibliothek. Es gibt keine Garantien, wenn du davon als solcher abhängig bist.

Feedback gehört in [GitHub-Issues](https://github.com/zcash/zallet/issues/new) oder in den Kanal `#wallet-dev` im [Zcash R&D Discord](https://discord.gg/xpzPR53xtU).

Eine spätere stabile Phase ist geplant, sobald die vorgesehene RPC-Oberfläche existiert. Aufrufer werden dann voraussichtlich auf die Methoden von Zallet migrieren müssen, einschließlich der dokumentierten semantischen Unterschiede.

---

## Architektur

Zallet ist auf Cargo-Workspaces aufgeteilt, damit jedes Chain-Backend seinen eigenen Abhängigkeitsgraphen verfolgen kann. Seit v0.1.0-beta.4 wird nur das Zebra-Backend mitgeliefert.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

Beide Binärdateien öffnen dieselbe `wallet.db`. Bis v0.1.0-beta.3 gab es außerdem ein `zallet-zaino`-Backend. Wenn deine `zallet.toml` `backend = "zaino"` angibt, ändere sie zu `backend = "zebra"`. Die Wallet-Datenbank muss nicht migriert werden, und der alte Ordner `zaino` im Datenverzeichnis kann gelöscht werden.

Das Zebra-Backend liest die Statusdatenbank von `zebrad` direkt aus. Daher benötigt es ein `zebrad`, das mit dem Feature `indexer` erstellt wurde, und dessen Statusverzeichnis **auf demselben Host** liegt. Für einen Zallet in einem Container, der über das Netzwerk mit einem `zebrad` in einem anderen Container kommuniziert, gibt es keine unterstützte Konfiguration, bis ein reines Netzwerk-Backend verfügbar ist ([zallet#900](https://github.com/zcash/zallet/pull/900)).

Typische Bereitstellung:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet ist eine **Wallet für Vollknoten**: Sie erwartet einen lokalen validierenden Knoten. Sie ist kein Light Client. Informationen zu Light Wallets und Compact-Block-Servern findest du unter [Zaino](Zaino.md) und [Lightwallet-Knoten](Lightwallet_Nodes.md).

Der Compose-Stack von Zcash Foundation’s [Z3](https://github.com/ZcashFoundation/z3) führt Zebra und Zallet gemeinsam aus, mit optionalem eigenständigem Zaino für externe Light Clients. Seine festgelegten Images stammen aus der Zeit vor NU7 und der Beta.4 von Zallet: Lies vor der Verwendung [Z3-Stack](Z3_Stack.md).

---

## Accounts, Adressen und Schlüssel

Zallet basiert auf ZIP 32 Accounts, nicht auf dem einzelnen impliziten Account von `zcashd`.

- Eine Wallet kann **mehrere BIP-39-Mnemonics** enthalten. Jede Mnemonic ist eine unabhängige Ausgabenwurzel und wird durch einen **Seed-Fingerabdruck** (`zip32seedfp1…`) identifiziert.
- **Accounts** werden aus einem Seed mit einem ZIP-32-Account-Index abgeleitet. Innerhalb einer Zallet-Instanz verfügen sie außerdem über eine lokale **UUID**. Die portable Identität eines Accounts ist `(seedfp, account index)`.
- Adressen sind **ZIP 316 Unified Addresses**, die mit `z_getaddressforaccount` erzeugt werden. Ein Account kann viele diversifizierte Adressen haben; Shielded Receiver sind on-chain nicht verknüpfbar.
- Importierte Spending Keys (`z_importkey`) und Watch-only-Adressen (`z_importaddress`) werden zu UUID-Accounts, die von keiner Mnemonic abgedeckt werden.
- Viewing Keys können exportiert und importiert werden (`z_exportviewingkey`, `z_importviewingkey`), einschließlich Unified Full Viewing Keys und Incoming Viewing Keys.

`getnewaddress` ist nicht implementiert. Verwende `z_getnewaccount` und `z_getaddressforaccount`.

Wenn `keystore.require_backup` aktiviert ist (die migrierte Form von `zcashd`s `walletrequirebackup`), verweigert Zallet das Ableiten neuer Ausgabeberechtigungen aus einer Mnemonic, deren Backup nicht bestätigt wurde.

---

## Verschlüsselung und Backups

Schlüsselmaterial wird **immer** verschlüsselt. Es gibt keinen unverschlüsselten Modus und keine `encryptwallet`-RPC — diese Methode von `zcashd` wurde nie vollständig unterstützt.

- Die Einrichtung erstellt eine **age**-Identität; Standardpfad ist `{datadir}/encryption-identity.txt`.
- Mnemonics und importierte Spending Keys werden als age-Chiffretexte in `wallet.db` gespeichert.
- Der übrige Teil der Datenbank wird **nicht** verschlüsselt. Verlauf, Adressen und Viewing Keys sind lesbar, wenn jemand die Datei erhält.
- Die Identität kann mit einer Passphrase geschützt werden (`generate-encryption-identity -p`). Entsperre sie mit der `walletpassphrase`-RPC; sperre sie mit `walletlock`.
- Der Verlust der Identitätsdatei oder ihrer Passphrase macht Spending Keys unwiederbringlich. Sichere die Identität, jede Mnemonic und jede separat verschlüsselte Kopie von `wallet.db`, die du aufbewahrst.

Das manuelle Kopieren von `wallet.db` während Zallet läuft, ist keine sichere Sicherung: SQLite kann beschädigt werden. Seit v0.1.0-beta.4 kannst du den Befehl [`backup`](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md) verwenden:

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

Es schreibt einen transaktionskonsistenten, auf Integrität geprüften Snapshot einer laufenden oder gestoppten Wallet. Wenn ein Verzeichnis angegeben wird, nennt es die Datei `zallet-wallet-backup-<UTC time>.db` und überschreibt niemals eine vorhandene Datei. Wenn ständige Schreibvorgänge in der Wallet (zum Beispiel während der ersten Synchronisierung) den Kopiervorgang immer wieder neu starten, bricht es nach zehn Minuten mit einer deutlichen Fehlermeldung ab: später erneut versuchen oder die Wallet zuerst stoppen. Das Backup enthält **nicht** die age-Identitätsdatei. Sichere diese einmal und bewahre sie getrennt von Datenbank-Backups auf, denn jeder, der beides besitzt, kann die Schlüssel entschlüsseln.

---

## JSON-RPC

Zallet implementiert eine Teilmenge der `zcashd`-Wallet-RPCs über HTTP mit Basic Auth. Binde sie an Loopback. Remote-Nutzung sollte über einen verschlüsselten Tunnel erfolgen. `rpc.allow_insecure_remote_bind` existiert und ist unsicher.

Wesentliche Unterschiede zu `zcashd`:

- Guthabenfelder bei `getwalletinfo` sind leer. Verwende `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`.
- Gebühren folgen **ZIP 317**. Es gibt kein `settxfee`.
- Die Erstellung von Ausgaben wechselt zu **PCZTs** (Partially Created Zcash Transactions, ZIP 374). PCZT-RPCs wurden in der Beta-Serie eingeführt.
- Eine globale **Sync-Sperre** blockiert Guthaben- und Ausgaben-RPCs, während die Wallet aufholt oder sich von einer Reorg erholt (`ClientInInitialDownload` / `ForbiddenBySafeMode`).

Bewusst ausgelassene Methoden umfassen `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` und `encryptwallet`. Ersatzmethoden sind im [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) aufgeführt.

---

## Erste Schritte

Offizielle Installationswege (Debian-Pakete, Docker, Release-Binärdateien) finden sich in der [Installationsanleitung](https://zcash.github.io/zallet/guide/installation/index.html). Release-Archive tragen den Namen `zallet-v<version>-linux-<amd64|arm64>.tar.gz` und enthalten `zallet` und `zallet-zebra`. Docker-Images werden als `zodlinc/zallet` veröffentlicht.

Minimaler Ablauf für eine neue Wallet:

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

Richte `[indexer]` mit `validator_address` auf den lokalen JSON-RPC-Endpunkt von `zebrad`. Diese Angabe ist erforderlich; standardmäßig wird nicht localhost verwendet. Das Zebra-Backend benötigt außerdem `[indexer.read_state_service]` und ein `zebrad` ab Version 7.0.0, das mit dem Feature `indexer` erstellt wurde und dessen Statusverzeichnis sich auf demselben Host befindet, damit Zallet direkt auf den Chain-Status zugreifen kann. `indexer.db_path` konfigurierte nur das entfernte Zaino-Backend; die Einstellung wird jetzt mit einer Warnung ignoriert.

Reproduzierbare Images können mit [StageX](https://codeberg.org/stagex/stagex/) erstellt werden (Docker 25+, containerd-Image-Store, GNU Make).

---

## Migration von zcashd

Bewahre das alte `zcashd`-Datadir auf, bis du Guthaben bestätigt und eine Wiederherstellung getestet hast.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` ist nur in Builds mit der Funktion `zcashd-import` verfügbar. Das Lesen von `wallet.dat` erfordert `db_dump` aus **Berkeley DB 6.2**, der von `zcashd` verwendeten Version.

Schrittweise Hinweise für Betreiber: [Migrationsleitfaden: zcashd zu Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Wie Zallet mit anderer Software zusammenhängt

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| Was es ist | RPC-Wallet für einen vollständigen Knoten | Shielded-first-Wallet-Server | Wallets für Endnutzer | Konsens-Knoten | Indexer- / lightwalletd-Ersatz |
| Ersetzt | `zcashd`-Wallet | Kein direkter `zcashd`-Klon | Mobile- und Desktop-Apps | `zcashd`-Knoten | `lightwalletd` |
| Benötigt einen lokalen Knoten | Ja | Ja (Zebra standardmäßig) | Nein (Light Client) | Ist selbst der Knoten | Ja |
| zcashd-RPC-Kompatibilität | Als Kompatibilitätspfad konzipiert | Nur eine kleine ausgewählte Teilmenge | k. A. | Partieller / Zakura-Kompatibilitätsmodus | Andere API |
| Verwahrungsmodell | Betreiber verwahrt Schlüssel in `wallet.db` | Server mit Seed-Wiederherstellung | Schlüssel auf dem Gerät des Nutzers | Keine Wallet | Keine Schlüssel |

Zallet und **zecd** können beide vor Zebra eingesetzt werden. Wähle Zallet, wenn du die Wallet-Oberfläche von `z_*` und einen Migrationspfad von `wallet.dat` benötigst. Wähle zecd, wenn du einen Shielded-first-Server möchtest, der ausdrücklich *kein* `zcashd`-Klon ist.

Unter [zallet.io](https://www.zallet.io/) gibt es ein separates Verbraucherprodukt, das denselben Namen verwendet. Diese App ist nicht dieses Projekt.

---

## Verwandte Seiten

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura und der eingestellte `zcashd`-Knoten
- [Zebra Full Node](Zebra_Full_Node.md) — das Standard-Backend des Knotens Zallet liest
- [Zakura Node](Zakura_Node.md) — alternativer validierender Knoten
- [Zaino](Zaino.md) — Indexer und Light-Client-Server (seit Beta.4 kein Zallet-Backend mehr)
- [Z3 Stack](Z3_Stack.md) — Zebra + Zallet-Compose-Stack
- [zecd](ZECD.md) — ein weiteres Wallet-Server-Design auf librustzcash
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md) — wie abgeschirmte Wallets die Blockchain scannen
- [Viewing Keys](Viewing_Keys.md)

## Ressourcen

- [Das Zallet Buch](https://zcash.github.io/zallet/)
- [zcash/zallet auf GitHub](https://github.com/zcash/zallet)
- [Veröffentlichungen](https://github.com/zcash/zallet/releases) · [Änderungsprotokoll zu v0.1.0-beta.4](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [Geänderte JSON-RPC-Semantik](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub Migrationsleitfaden](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry-Pi-Anleitung (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet Compose-Stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
