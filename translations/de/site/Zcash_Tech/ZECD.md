---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# ZECD — Shielded-First-Wallet-Server

> 🇧🇷 [Version auf Portugiesisch](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD ist ein Shielded-First-Wallet-Server für Zcash, der auf [librustzcash](https://github.com/zcash/librustzcash) basiert und über den JSON-RPC-Dialekt von Bitcoin Core bereitgestellt wird. Er bietet Entwicklern und Zahlungsintegratoren eine vertraute, Bitcoin-kompatible API für die Interaktion mit Zcash — wobei Orchard (der privateste Pool) standardmäßig verwendet wird. ZECD wurde von [zec.rocks](https://zec.rocks) entwickelt und ist dafür ausgelegt, die Wallet-Funktionalität von `zcashd` in modernen, cloud-nativen Deployments zu ersetzen.

**Aktuelle Version:** 0.5.0-rc3 (13. Juli 2026) — mit Unterstützung für Ironwood (NU6.3). Installation über `cargo install zecd` oder mit dem offiziellen Docker-Image.

---

## Kurzfassung

- ZECD ist ein **Wallet-Daemon (Server)** — kein Full Node. Er übernimmt Schlüsselverwaltung, Scanning, Proving und RPC, ohne das Zcash-P2P-Protokoll zu sprechen.
- Er verwendet den **JSON-RPC-Dialekt von Bitcoin Core**: gleiche Methodennamen, Feldstrukturen, Authentifizierung und Fehlercodes — viele Bitcoin-RPC-Clients funktionieren mit Zcash sofort.
- **Orchard-(shielded)-Adressen sind der Standard**; Unterstützung für transparente (t-address) und Sapling-Adressen erfordert eine ausdrückliche Aktivierung pro Wallet.
- Er verbindet sich mit einem **selbst gehosteten [Zebra](Zebra_Full_Node.md) Full Node** über lokales JSON-RPC — kein lightwalletd erforderlich.
- **Zustandslos per Design**: Die gesamte Wallet lässt sich allein aus der Seed Phrase wiederherstellen, wodurch das Datenverzeichnis entbehrlich wird.
- **Kein direkter Ersatz für zcashd**: Es wird nur eine Teilmenge der Zcash-RPC-Methoden implementiert, mit absichtlichen Designunterschieden zugunsten von Privatsphäre und Sicherheit.
- Gebühren folgen **ZIP-317** (deterministische Gebührenberechnung); benutzerdefinierte Gebühren werden abgelehnt.
- Unterstützt **shielded Memos (ZIP-302)** über die vertraute Bitcoin-RPC-Oberfläche.

---

## Welches Problem löst ZECD?

`zcashd` war der ursprüngliche Knoten und die Wallet von Zcash in einem — 2016 von der C++-Codebasis von Bitcoin abgespalten. Mit der Zeit führte das zu Reibungen: Der Code ist schwer wartbar, die Wallet ist eng an den Knoten gekoppelt, und transparente Adressen werden als gleichrangige Optionen neben shielded Adressen dargestellt.

ZECD trennt die Verantwortung der Wallet vom Konsens. Es ist eine **dedizierte Wallet-Schicht**, die zwischen Anwendungen und einem Zebra-Full-Node sitzt und Folgendes bereitstellt:

- Eine saubere, moderne Rust-Implementierung auf Basis von librustzcash (derselben Bibliothek, die auch Zodl und Zingo antreibt)
- Ein Privacy-by-Default-Design (Orchard-Adressen, sofern nicht anders konfiguriert)
- Eine Bitcoin-kompatible RPC-Schnittstelle, die die Notwendigkeit beseitigt, Zcash-spezifische Werkzeuge zu erlernen
- Eine zustandslose, aus dem Seed wiederherstellbare Architektur, geeignet für containerisierte und Cloud-Deployments

---

## Architektur

ZECD arbeitet in einem Drei-Schichten-Modell:

```
Deine App / Bitcoin-RPC-Client
        ↓  JSON-RPC
       ZECD
   (Schlüssel, Scanning, Proving, RPC)
        ↓  JSON-RPC (nur lokal)
       Zebra
   (Full Node — Konsens, Mempool, Kettendaten)
```

ZECD kommuniziert mit Zebra **ausschließlich über lokales JSON-RPC** — kein Peer-to-Peer-Netzwerk, keine Indexer von Drittanbietern, kein lightwalletd. Die Verbindung zu Zebra ist bewusst auf lokal beschränkt: ZECD verweigert das Senden von Zugangsdaten an einen global routbaren Host, sofern dies nicht ausdrücklich für einen außerhalb des Bands gesicherten Tunnel (z. B. WireGuard oder SSH) konfiguriert wurde.

---

## Hauptfunktionen

### Shielded-First, Orchard standardmäßig

ZECD verwendet Orchard Unified Addresses als Standard-Adresstyp. Sapling- und transparente (t-address)-Pools erfordern eine ausdrückliche Konfiguration pro Wallet. Dieses Design reduziert das Risiko versehentlicher transparenter Sendungen — eine häufige Datenschutzfalle in älteren Zcash-Werkzeugen.

Die Datenschutzrichtlinie ist pro Aufruf oder global in `[spend] privacy_policy` konfigurierbar:

| Richtlinie | Verhalten |
|--------|----------|
| `AllowRevealedRecipients` (Standard) | Erlaubt Sendungen an transparente Empfänger; legt Betrag und Empfänger on-chain offen |
| `AllowRevealedAmounts` | Erlaubt poolübergreifende Sendungen (Sapling↔Orchard), lehnt aber transparente Empfänger ab |
| `FullPrivacy` | Nur vollständig shielded Sendungen innerhalb eines Pools; lehnt transparente Empfänger und poolübergreifende Sendungen ab |
| `AllowFullyTransparent` | Erlaubt auch t→t-Sendungen, die aus transparenten UTXOs finanziert werden |

### Kompatibilität mit Bitcoin-Core-RPC

ZECD implementiert den JSON-RPC-Dialekt von Bitcoin Core mit Konformität in folgenden Bereichen:

- Methodennamen (z. B. `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- Feldnamen und Typen in Antworten
- JSON-RPC-1.0-Umschlagstruktur
- Basic Auth, `rpcauth`-Einträge und Cookie-Datei-Authentifizierung
- Fehlercodes und HTTP-Status-Zuordnung (HTTP 500 mit Fehlertext, 401-Semantik)

Das bedeutet, dass viele bestehende Bitcoin-Zahlungsbibliotheken, Börsenintegrationen und Überwachungswerkzeuge mit wenig oder gar keinen Codeänderungen über ZECD mit Zcash interagieren können.

Die Konformitätssuite (mehr als 140 Prüfungen) läuft bei jedem PR gegen einen laufenden Regtest-Daemon und wurde außerdem gegen das öffentliche Testnet validiert.

### Shielded Memos (ZIP-302)

ZECD stellt die Shielded-Memo-Funktion von Zcash über die vertraute Bitcoin-RPC-Oberfläche bereit — etwas, das in Standard-Bitcoin-Werkzeugen nicht verfügbar ist:

- `sendtoaddress` akzeptiert ein optionales hexadezimales Memo als zusätzlichen nachgestellten Parameter (bis zu 512 Byte; wird für transparente Empfänger abgelehnt)
- Transaktionsverlaufseinträge aus `listtransactions` und `gettransaction` enthalten die Felder `memo` (hex) und `memoStr` (dekodierter Text), wenn ein Output eines trägt
- Sendungen mit Betrag Null an einen shielded Empfänger werden für reine Memo-Anwendungsfälle unterstützt (das `z_sendmany`-Muster „memo-only-send“)

Dadurch eignet sich ZECD für Anwendungen, die neben Zahlungen auch private On-Chain-Nachrichten benötigen.

### Zustandslos per Design

ZECD speichert **keinen Off-Chain-Zustand, den eine Wiederherstellung nur aus dem Seed nicht rekonstruieren könnte**. Die Wallet-Datenbank (`data.sqlite`) ist vollständig aus der Seed Phrase ableitbar — shielded Guthaben werden bedingungslos wiederhergestellt; transparente Guthaben werden bis zum konfigurierten Gap-Limit wiederhergestellt.

Um eine Wallet aus dem Seed wiederherzustellen:

```sh
zecd init --restore --birthday <block-height>
```

Dadurch wird das Datenverzeichnis **entbehrlich**: Ein Container ohne persistentes Volume, der bei jedem Start aus dem Seed neu aufgebaut wird, verliert nichts Kritisches. Betreiber sind selbst dafür verantwortlich, die von ihnen ausgegebenen Adressen nachzuverfolgen — ZECD merkt sich Adressen erst, nachdem sie On-Chain Gelder erhalten haben.

Labels fehlen bewusst. Da Labels keine On-Chain-Quelle haben und nicht aus dem Seed rekonstruiert werden können, unterstützt ZECD sie schlicht nicht. Ein Aufruf von Label-Methoden liefert einen `method-not-found`-Fehler (`-32601`) zurück.

### Keine lightwalletd-Abhängigkeit

ZECD leitet Compact Blocks, Tree State und Mempool-Sichtbarkeit direkt aus dem JSON-RPC von Zebra ab. Es gibt kein lightwalletd zu betreiben oder zu warten — das reduziert die operative Komplexität für selbst gehostete Deployments.

### Cloud-native und containerisierte Deployments

Die zustandslose Architektur von ZECD ist für Docker- und Kubernetes-Umgebungen ausgelegt:

- Vollständiger Docker-Compose-Stack (`zebra → zecd`) im Repository verfügbar
- Health-Endpunkt auf Port `9233` mit konfigurierbaren Readiness-Probes (`synced` oder `connected`)
- Option für strukturiertes JSON-Logging für Log-Aggregations-Pipelines
- Deterministische ZIP-317-Gebühren — keine Gebühren-Oracles oder manuelle Gebührenkonfiguration
- `bootstrap_from_keys` (standardmäßig aktiviert): Ein leeres Datenverzeichnis neben `keys.toml` baut die Wallet beim Start automatisch neu auf — Deployment durch Mounten eines Secrets und Start mit leerem PVC

---

## Verwahrungsmodelle

ZECD unterstützt drei Schlüsselverwahrungsmodelle, passend für unterschiedliche Deployment- und Sicherheitsanforderungen:

### 1. Unverschlüsselt (Standard — automatische Entsperrung)

Die Seed-Mnemonic in `keys.toml` wird in eine **age-Identitätsdatei** (`identity.txt`) eingebettet. Mit dem Standard `auto_unlock = true` wird der Seed beim Start in den Speicher entschlüsselt, sodass Sendungen unbeaufsichtigt erfolgen und kein Aufruf von `walletpassphrase` nötig ist.

Am besten geeignet für: automatisierte Zahlungsabwickler, Hot Wallets von Börsen, Entwicklerumgebungen.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> Speichere `identity.txt` im Mainnet **außerhalb** des Datenverzeichnisses — jeder, der beide Dateien lesen kann, hat Ausgabeberechtigung.

### 2. Verschlüsselt (durch Passphrase geschützt)

Die Mnemonic wird mit einer Passphrase (age scrypt) statt mit einer Identitätsdatei eingebettet. Die Wallet startet gesperrt; `walletpassphrase "<pass>" <timeout>` entsperrt sie für die angegebene Dauer und sperrt sie nach Ablauf automatisch wieder — entsprechend dem Verhalten verschlüsselter Wallets in Bitcoin Core.

Am besten geeignet für: Hot Wallets, bei denen keine unbeaufsichtigte Ausgabeberechtigung erforderlich ist; interaktive Betreiber-Workflows.

```sh
zecd init --datadir ./data --encrypt
# später: walletpassphrase "my-passphrase" 300
```

### 3. Watch-Only (UFVK — kein Spend Key)

Wird mit einem Unified Full Viewing Key (UFVK) initialisiert, der aus einer anderen Wallet exportiert wurde. Kann empfangen, scannen und Guthaben melden — aber keine Transaktionen signieren. Ideal für Monitoring, Rechnungsstellung oder Audit-Knoten, die von der signierenden Wallet getrennt sind.

```sh
# Auf dem Host der signierenden Wallet:
zecd export-ufvk

# Auf dem Watch-Only-Host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## Backup und Wiederherstellung

Gelder lassen sich **allein aus der Mnemonic** wiederherstellen. Alles andere ist ein Cache.

| Artefakt | Ort | Was es schützt | Sichern? |
|----------|----------|-----------------|----------|
| **24-Wort-Mnemonic** | Einmalig bei `zecd init` angezeigt | Die Gelder — Verlust = dauerhafter Verlust | **Ja — offline (Papier/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | Verschlüsselter Seed + Birthday + Netzwerk | **Ja — als Secret** |
| `identity.txt` | `[keys] age_identity` | Entschlüsselt `keys.toml` (Ausgabeberechtigung) | **Ja — getrennt von `keys.toml`** |
| Birthday-Höhe | In `keys.toml` enthalten | Macht die Wiederherstellung schnell (jede Höhe vor der ersten Tx) | Zusammen mit der Mnemonic notieren |
| `data.sqlite` | `<wallet dir>/data.sqlite` | Wallet-Cache — wird bei Wiederherstellung aus dem Seed neu aufgebaut | Nein — entbehrlich |
| `blocks/` | `<wallet dir>/blocks/` | Compact-Block-Cache | Nein — nie ausliefern; kann groß werden |
| `.cookie` | `<datadir>/.cookie` | Flüchtiges RPC-Cookie | Nein — wird beim Start neu erzeugt |

> **Das Datenverzeichnis muss hostlokal sein.** Die Single-Instance-Sperre von ZECD (`<datadir>/.lock`) ist eine advisory lock des Betriebssystems — sie erstreckt sich nicht über Hosts. Teile niemals ein Datenverzeichnis mit Lese-/Schreibzugriff über mehrere Maschinen hinweg (NFS, Kubernetes `ReadWriteMany`) — zwei ZECD-Instanzen würden die Wallet-DB beschädigen. Verwende in Kubernetes Volumes vom Typ `ReadWriteOnce`.

---

## RPC-Methoden-Safeliste

Für Deployments, bei denen ein Leck von Zugangsdaten katastrophal wäre, unterstützt ZECD die Beschränkung der RPC-Oberfläche auf eine ausgewählte Teilmenge von Methoden:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

Jede Methode, die nicht auf der Liste steht, gibt `-32601` (HTTP 404) zurück — nicht zu unterscheiden von einer Methode, die gar nicht existiert; so gibt ein abgesicherter Server nichts darüber preis, was er deaktiviert hat. Ein reiner Rechnungsempfänger kann `sendtoaddress`, `sendmany` und `stop` deaktivieren, um den Schadensradius bei einem kompromittierten Client zu minimieren.

---

## Wichtige Unterschiede zu Bitcoin-Core-RPC

Entwickler, die von Bitcoin- oder zcashd-Werkzeugen migrieren, sollten sich dieser absichtlichen Abweichungen bewusst sein:

| Verhalten | Bitcoin Core | ZECD |
|----------|-------------|------|
| Adressformat | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — von Clients, die nur Strings parsen, nicht als Bitcoin-Adresse interpretierbar |
| Labels | Vollständiger Label-Speicher | Nicht implementiert — `setlabel`, `listlabels` usw. geben `-32601` zurück |
| Gebühren | Vom Benutzer setzbar; Gebührenmarkt | Nur deterministisch nach ZIP-317; `settxfee`, `fee_rate`, `subtractfeefromamount` werden mit `-8` abgelehnt |
| Memos | Nicht unterstützt | `sendtoaddress` akzeptiert hex-Memo; Verlauf enthält die Felder `memo` + `memoStr` |
| Bestätigungen zum Ausgeben | 1 | 3 (eigene Change-Outputs) / 10 (Dritte) — konfigurierbar über `trusted_confirmations` / `untrusted_confirmations` |
| `listsinceblock` bei Reorg | Geht bis zur Fork zurück | Gibt `-5` (Block nicht gefunden) zurück, wenn der Cursor durch einen Reorg entfernt wurde — mit parameterlosem Aufruf neu baselinen |
| Doppelte Empfänger in `sendmany` | Fehler | JSON-Parser fasst Duplikate zusammen (der letzte gewinnt), bevor ZECD sie sieht — dieselbe Adresse nicht zweimal aufführen |
| Guthaben während der initialen Synchronisierung | Blockiert oder Warm-up | Liefert partielles Guthaben — Automatisierung an `GET /readyz` koppeln (liefert 503, bis vollständig synchronisiert und der Enhancement-Backlog abgearbeitet ist) |
| `minconf 0` in `getbalance` | 0-Conf-Guthaben | Wird als 1 geliefert — eine shielded Note ist ungemined niemals ausgabefähig |

---

## Schnellstart

**Voraussetzungen:** Zebra läuft lokal mit `rpc.listen_addr = 127.0.0.1:18234` (Testnet).

Installation von crates.io (0.4.3+):

```sh
cargo install zecd
```

Oder aus dem Quellcode bauen:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Eine Testnet-Wallet initialisieren (erzeugt eine 24-Wort-Mnemonic und ein Konto)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Den Daemon starten (synchronisiert im Hintergrund, stellt JSON-RPC auf Port 18232 bereit)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**Interaktion via curl:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Interaktion via Python (mit einer Bitcoin-RPC-Bibliothek):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # gibt eine u1... Orchard Unified Address zurück
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Mit einem shielded Memo senden
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**Aus Seed wiederherstellen:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# füge deine 24-Wort-Mnemonic ein, wenn du dazu aufgefordert wirst
```

---

## Standardports

| Netzwerk | ZECD RPC | Zebra RPC (Backend) | Health |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| Rolle | Full Node + Wallet | Indexer (ersetzt lightwalletd) | Nur Wallet-Server |
| Sprache | C++ | Rust | Rust |
| Status | Veraltet | Aktiv | Aktiv (v0.5.0-rc3, Juli 2026) |
| Standardpool | Transparent | N/V | Orchard (shielded) |
| RPC-Dialekt | zcashd-spezifisch | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| Benötigt Full Node | Ja (selbst) | Zebra oder zcashd | Zebra |
| Zustandslose Wiederherstellung | Nein | N/V | Ja (nur Seed) |
| Shielded Memos | Ja (`z_sendmany`) | N/V | Ja (Bitcoin-RPC-Oberfläche) |
| Watch-Only (UFVK) | Ja | Ja | Ja |
| Cloud-native | Nein | Teilweise | Ja |
| Installation | Build/Binärdatei | Build | `cargo install zecd` |

---

## Verwandte Seiten

- [Zebra Full Node](Zebra_Full_Node.md) — der Full Node, mit dem sich ZECD verbindet
- [Zaino Indexer](Zaino.md) — alternativer Indexer-Ansatz (ersetzt lightwalletd)
- [Zakura Knoten](Zakura_Node.md) — eine weitere Full-Node-Implementierung (Fork von Zebra)
- [Viewing Keys](Viewing_Keys.md) — wie ZECD die Chain mithilfe von Account-Viewing-Keys scannt
- [Wallets](/using-zcash/wallets) — Überblick über das Wallet-Ökosystem

## Ressourcen

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [ZECD Operations Runbook](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — Kernbibliothek für Zcash-Kryptografie](https://github.com/zcash/librustzcash)
- [ZIP-317: Proportional Transfer Fee Mechanism](https://zips.z.cash/zip-0317)
- [ZIP-302: Shielded Memos](https://zips.z.cash/zip-0302)
- [Zodl wallet (kompatibel mit librustzcash)](https://github.com/zodl-inc/zodl-ios)
