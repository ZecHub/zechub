---
# Einen Full Node auf einem Raspberry Pi 4 betreiben (Zebra + Zallet)

*Aus der ursprünglichen zcashd-basierten Anleitung migriert. zcashd erreichte seinen automatischen End-of-Support-Stopp am 18. Juli 2026, daher verwendet diese Anleitung nun **Zebra** (den aktuellen Full Node, gepflegt von der Zcash Foundation) und **Zallet** (die Wallet, die als Ersatz für die integrierte Wallet von zcashd entwickelt wurde).*

## Was du lernen wirst
- Wie du Ubuntu Server 22.04+ (64-Bit) auf einem Raspberry Pi 4 für den kopflosen Betrieb flashst und konfigurierst
- Wie du Zebra installierst und ausführst, entweder per Docker oder mit einer vorgefertigten Binärdatei
- Wie du Zallet installierst, konfigurierst und initialisierst, einschließlich der Einrichtung der Wallet-Verschlüsselung
- Wie du optional eine bestehende zcashd-Konfiguration/Wallet in Zallet migrierst

## Was sich gegenüber der alten Anleitung geändert hat
Die vorherige Version dieser Anleitung führte durch die native Kompilierung von **zcashd** auf einem Pi 4 — eine Single-Thread-Kompilierung, die 3–4 Stunden dauerte, weil der Pi 4 nicht genug Speicher für einen parallelen Build (`-j$(nproc)`) hat. Zebra und Zallet stellen inzwischen beide **offizielle vorgefertigte ARM64-Binärdateien und Docker-Images** bereit, sodass du in den meisten Fällen auf dem Pi selbst nichts mehr aus dem Quellcode kompilieren musst.

## Voraussetzungen
- Ein Raspberry Pi 4 (4 GB RAM oder mehr empfohlen)
- Eine microSD-Karte (32 GB+) für das Betriebssystem
- Eine externe SSD/HDD mit USB-3.0-Unterstützung — **Zebra benötigt ungefähr 300 GB für zwischengespeicherte Mainnet-Daten**, und der Bedarf wächst mit der Zeit, also versuche nicht, dies nur von der microSD-Karte aus zu betreiben
- Ein Computer mit microSD-Kartensteckplatz (zum Flashen des OS-Images)
- Eine kabelgebundene Ethernet-Verbindung oder Wi-Fi
- Grundlegende Vertrautheit mit der Kommandozeile über SSH

## Schritt 1: Ubuntu Server 22.04+ (64-Bit) flashen
Die vorgefertigten Binärdateien und Docker-Images von Zebra und Zallet erfordern **glibc 2.34+**, was **Ubuntu Server 22.04 oder neuer (64-Bit/aarch64)** bedeutet.

1. Installiere den Raspberry Pi Imager auf deinem Hauptcomputer.
2. Stecke deine microSD-Karte ein.
3. Wähle **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (oder neuer).
4. Nutze die erweiterten Optionen des Imagers (Zahnradsymbol), um Hostnamen vorzukonfigurieren, SSH zu aktivieren und bei Bedarf Wi-Fi-Zugangsdaten für den ersten kopflosen Start einzurichten.
5. Schreibe das Image, stecke die Karte ein und schalte den Pi ein.
6. Per SSH verbinden: `ssh <username>@<pi-hostname-or-ip>`

## Schritt 2: Externen Speicher anschließen und einhängen
1. Schließe deine externe SSD/HDD über USB 3.0 an.
2. Identifiziere das Gerät: `lsblk`
3. Formatiere es (falls neu) und hänge es ein, z. B. unter `/mnt/zcash-data`, mit einer standardmäßigen `mkfs`/`fstab`-Einrichtung, sodass es nach einem Neustart automatisch eingehängt wird.

## Schritt 3: Das System aktualisieren
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Schritt 4: Zebra installieren und ausführen
### Option A — Docker (empfohlen)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # danach ab- und wieder anmelden
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Fortschritt prüfen: `docker logs -f zebra`

### Option B — Vorgefertigte Binärdatei über cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Dies installiert eine vorgefertigte `aarch64`-Binärdatei — keine Kompilierung erforderlich.

**Zur Synchronisierungszeit:** Rechne damit, dass dies eine Weile dauert — häufig genannte Zahlen für die erste Synchronisierung (ungefähr 2 Stunden) stammen von Referenzhardware, die leistungsstärker ist als die CPU eines Pi 4, daher wird deine tatsächliche Synchronisierungszeit auf echter Pi-4-Hardware wahrscheinlich länger ausfallen.

## Schritt 5: Zallet installieren
Zallet befindet sich derzeit in der **Alpha-Phase** — rechne mit inkompatiblen Änderungen und betrachte es noch nicht als produktionsreife Verwahrung für erhebliche Geldbeträge.

### Option A — Docker (empfohlen)
```bash
docker pull zodlinc/zallet:latest
```
Dieses Image unterstützt ARM64 (über einen Nix-basierten Build) und läuft auf einem minimalen Dateisystem ohne Shell — gib Konfigurations- und Datenpfade explizit über `--datadir` und Volume-Mounts an (siehe Schritt 6).

### Option B — Aus dem Quellcode bauen
```bash
# Erfordert Rust 1.85+ (siehe Schritt 4B für die rustup-Installation)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Die Crates von Zallet sind während der Alpha-Phase noch nicht auf crates.io veröffentlicht, daher ist die direkte Installation aus dem Git-Repo die unterstützte Nicht-Docker-Methode.

## Schritt 6: Zallet konfigurieren
Erstelle `zallet.toml` in deinem gewählten Datadir (z. B. `/mnt/zcash-data/zallet`):
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebras JSON-RPC-Endpunkt
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Passe `validator_address` an, falls Zebra auf einem anderen Host/Port läuft, und konfiguriere `validator_cookie_auth`/`validator_user`/`validator_password` unter `[indexer]`, damit es zu deiner Zebra-RPC-Authentifizierung passt.

**Migration von zcashd?** Falls du noch eine alte `zcash.conf` hast:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Schritt 7: Wallet-Verschlüsselung einrichten
Zallet verschlüsselt sämtliches Schlüsselmaterial mit `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Dies gibt einen öffentlichen Schlüssel und eine automatisch erzeugte Passphrase aus — **speichere die Passphrase; ohne sie kannst du die Identitätsdatei nicht wiederherstellen.**

## Schritt 8: Die Wallet initialisieren und starten
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Führe `generate-mnemonic` nur einmal aus**, es sei denn, du möchtest bewusst mehrere unabhängige Spending-Roots.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Schritt 9: Eine bestehende zcashd-Wallet migrieren (optional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Dafür wird das Hilfsprogramm `db_dump` benötigt (gebaut gegen Berkeley DB 6.2.23) — entweder aus einer Systeminstallation oder aus einem lokalen Source-Build von zcashd. Falls du zcashd nicht mehr installiert hast, ist dies der eine Migrationsschritt, der in Zallet noch nicht vollständig eigenständig enthalten ist.

## Schritt 10: Überprüfen, ob alles funktioniert
```bash
zallet -d /mnt/zcash-data/zallet help
```
Bestätige, dass die Wallet reagiert, und sobald Zebra die Synchronisierung abgeschlossen hat, dass Guthaben/Adressen den Erwartungen entsprechen.

## Fehlerbehebung
- **Zebra-Build-/Laufzeitprobleme auf ARM:** Wenn du aus dem Quellcode baust, installiere die Rust-ARM-Toolchain — das Ausführen von x86_64-Build-Tools auf ARM-Hardware ist gemäß der eigenen Dokumentation von Zebra spürbar langsamer.
- **Speicher läuft voll:** Zebras Speicherbedarf von ~300 GB wächst weiter — plane ausreichend Reserve ein.
- **Docker-Berechtigungsfehler:** Melde dich ab und wieder an, nachdem du deinen Benutzer zur Gruppe `docker` hinzugefügt hast, oder verwende in der Zwischenzeit `sudo`.
- **Zallet-Container hat keine Shell:** Das offizielle Image `zodlinc/zallet` ist absichtlich ein from-scratch-Image — gib immer `--datadir` explizit an und mounte dein Datenverzeichnis als Volume.

## Hardware-Hinweise im Vergleich zur alten zcashd-Anleitung
Zebra und Zallet sind bei der Einrichtung im Allgemeinen CPU-schonender als das Kompilieren von zcashd, da du vorgefertigte Binärdateien/Container ausführst. 4 GB RAM sind ein vernünftiger Ausgangspunkt; überwache mit `htop` und ziehe die 8-GB-Variante des Pi 4 in Betracht, wenn du starkes Swapping feststellst.

## Zusätzliche Ressourcen
- [Zebra Book](https://zebra.zfnd.org) — offizielle Zebra-Dokumentation
- [Zallet Book](https://zcash.github.io/wallet) — offizielle Zallet-Dokumentation
- [Hinweis zum End-of-Support von zcashd](https://z.cash/support/zcashd-deprecation)

---

*Wenn du diese Anleitung nützlich fandest, ziehe in Betracht, ZecHub zu unterstützen: [aktuelle abgeschirmte ZecHub-Spendenadresse von zechub.wiki/donation hier einfügen — hier nicht enthalten, da ich nicht verifizieren konnte, dass sie noch aktuell ist].*
