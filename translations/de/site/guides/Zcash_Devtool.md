# Das Zcash Devtool

[Was ist das zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Das Zcash Devtool ist eine Plattform zum Hacken an Zcash. Es wird von Entwicklern für Entwickler entwickelt, zum Testen und Entwickeln neuer Zcash-Funktionalität; und sollte nicht als produktionsreif betrachtet werden. Die Befehlszeilen-API, die dieses Tool bereitstellt, kann sich jederzeit und ohne Vorwarnung ändern. Verwende KEINE erheblichen Beträge für die Verwaltung durch die eingebettete zcash-devtool Wallet.

### Video-Tutorial zum Zcash Devtool:
Kris Nuttycombe (@nuttycom) stellte dieses Tool während der ZconVI vor.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: das Zcash Entwicklungs-Multitool mit Kris Nuttycombe – ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Eine Schritt-für-Schritt-Anleitung für den Einstieg in diese Tools findest du in [dieser Anleitung](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Sie dokumentiert einen vollständigen Ablauf zum Einrichten und Verwenden der zcash-devtool-Tooling. Sie soll als Anleitung dafür dienen, wie du die Einrichtung vornimmst und eigene Funktionalität zum Tool hinzufügst.

## Schnellstart

Die folgenden Befehle wurden mit zcash-devtool `main` (Commit `5a26ee8`, August 2026) geprüft. Das Tool ändert sich ohne Vorankündigung; führe daher `--help` für jeden Befehl aus, falls etwas hier nicht mehr zutrifft.

### Installation

Es gibt keine vorkompilierten Binärdateien. Installiere [Rust](https://rustup.rs) und erstelle es dann aus dem Quellcode:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Die folgenden Beispiele rufen die erstellte Binärdatei `target/release/zcash-devtool` auf. `cargo run --release -- ...` funktioniert auf dieselbe Weise.

### Eine Testnet-Wallet erstellen

Beginne im Testnet. Testnet-Coins (TAZ) haben keinen Wert.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` ist das Wallet-Verzeichnis. Es steht nach `wallet` und vor dem Unterbefehl.
- `-i` ist eine [age](https://age-encryption.org)-Identitätsdatei. Die mnemonische Phrase der Wallet wird dafür verschlüsselt, und die Datei wird erstellt, falls sie nicht existiert. Bewahre sie auf: `send`, `shield` und andere Ausgabebefehle benötigen sie, um den Seed zu entschlüsseln.
- `-n` ist das Netzwerk: `test` oder `main`.
- `-s` wählt den Light-Wallet-Server aus. Der Standardwert `zecrocks` verbindet sich mit dem zec.rocks-Server für das gewählte Netzwerk.
- Um eine vorhandene Wallet wiederherzustellen, verwende `restore-mnemonic` anstelle von `init`. Es fordert zur Eingabe der Phrase auf.

`balance` listet jeden Pool separat auf, einschließlich Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Führe `zcash-devtool wallet -w ./my-wallet list-addresses` aus, um die Unified Address der Wallet anzuzeigen, und sende ihr Testnet-Mittel über einen [Faucet](https://zechub.wiki/using-zcash/faucets).

Für Mainnet übergib `-n main` an `init`. Verwende nur Beträge, deren Verlust du dir leisten kannst.

### Senden und shielden

Beträge werden in zatoshis angegeben (1 ZEC = 100.000.000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` zeigt die Transaktion, die ein `send` erstellen würde, ohne sie zu senden. `list-tx` und `list-unspent` zeigen den Verlauf und die Notes der Wallet an.

Jeder Befehl, der mit einem Server kommuniziert, akzeptiert auch `--connection tor`, wodurch die Verbindung über den integrierten Tor-Client geleitet wird.

### Adressen, Schlüssel und Transaktionen untersuchen

`inspect` dekodiert Zcash-Daten offline: Adressen, Schlüssel und Rohtransaktionen. Füge `--lookup` hinzu, um weitere Informationen von der Chain abzurufen, beispielsweise eine Transaktion anhand ihrer ID.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Ironwood-Notes werden an denselben Orchard-Receiver in einer Unified Address gesendet, daher haben sich die Adressen mit NU6.3 nicht geändert.

### Transaktionen schrittweise mit PCZTs erstellen

Eine PCZT (teilweise erstellte Zcash-Transaktion) unterteilt das Erstellen einer Transaktion in getrennte Schritte: Erstellen, Beweisen, Signieren und Senden. Jeder Schritt kann auf einer anderen Maschine ausgeführt werden, beispielsweise mit einem Hardware-Signer wie Keystone. Jeder `pczt`-Befehl liest die PCZT aus einer Datei oder stdin und schreibt sie in eine Datei (`--output`) oder stdout, sodass die Schritte per Pipe verbunden werden können:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` listet die weiteren Schritte auf, einschließlich `inspect`, `redact`, `combine`, `extract` und `shield`.

### Mittel von Orchard nach Ironwood verschieben

Seit NU6.3 können Orchard-Mittel nur noch an die eigenen Adressen der Wallet verschoben werden. Die `migration`-Befehle verschieben sie in Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` zeigt eine Vorschau der Note-Aufteilungen und des Transferzeitplans an und ändert nichts.
- `commit` erstellt und signiert die ersten Vorbereitungstransaktionen vor. Füge `--external` hinzu, um sie für einen externen Signer wie Keystone unsigniert zu lassen.
- `status` zeigt den Fortschritt der Migration und den nächsten Schritt.
- `advance` beweist die nächste Transaktion, deren Anchor bereit ist.

Die Migrationsbefehle werden noch entwickelt. `advance` hält bei der ersten sendebereiten Transaktion an, da das Broadcasting im Tool noch nicht implementiert ist. Verschiebe Mittel für die alltägliche Nutzung mit einer Wallet, die Ironwood unterstützt. Siehe [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools).


**Sicherheitswarnungen:**
DIES NICHT IN DER PRODUKTION VERWENDEN!!!
Die App wurde nicht mit Blick auf Sicherheit geschrieben. Sie bietet jedoch Vorkehrungen wie die Verschlüsselung der mnemonischen Seed-Phrasen, die sie auf eigenes Risiko für Experimente im kleinen Maßstab geeignet machen sollten.

### Fortgeschrittene Nutzung (librustzcash Tutorial )


[Video hier ansehen](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
