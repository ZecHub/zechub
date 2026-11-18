<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Z3 Stack

Der **Z3 Stack** ist die paketierte Knotenplattform von Zcash Foundation: **Zebra** (Full Node) + **Zallet** (Full-Node-Wallet), mit einem optionalen **Zaino**-Indexer. Er ist als Ersatz für einen eigenständigen `zcashd`-Prozess vorgesehen, der Konsens und eine Wallet in einer Binärdatei bündelte und am 18. Juli 2026 das Ende seines Lebenszyklus erreichte.

Die Referenzimplementierung ist das Docker-Compose-Projekt unter [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3).

> **Status, 14. November 2026: Die Standard-Pins sind älter als NU7.** Z3s `docker-compose.yml` wurde zuletzt am 10. August 2026 geändert. Es pinnt weiterhin `zfnd/zebra:6.2.3` und `zodlinc/zallet:v0.1.0-beta.1` und startete als `zallet-zaino`-Binärdatei. [NU7](NU7.md) wurde am 6. November 2026 bei Block 3.543.405 auf Mainnet aktiviert, und nur Zebra 7.0.0 oder neuer folgt dieser Regel: Ein 6.x-Zebra hält sich an die alten Regeln und fällt aus der echten Chain. Zallet v0.1.0-beta.4, die erste Version, die NU7 folgt, enthält `zallet-zaino` gar nicht mehr. Prüfe vor dem Deployment das Repository auf neuere Pins. Wenn du die Images selbst überschreibst, beachte, dass das verbleibende `zebra`-Backend von Zallet das Statusverzeichnis von Zebra direkt liest. Daher muss Zallet auf demselben Host laufen und Zugriff auf dieses Verzeichnis haben ([Zallet](Zallet.md)).

---

## Kurzfassung

* Z3 ist **kein neuer Konsens-Client**. Es beschreibt, wie du den Stack nach `zcashd` gemeinsam betreibst: Zebra validiert die Chain, Zallet verwaltet Schlüssel und stellt Wallet-RPC bereit, und Zaino spricht optional das lightwalletd-gRPC-Protokoll.
* `zcashd` bündelte Knoten und Wallet. Z3 **trennt diese Rollen**. Börsen, Mining-Pools und andere Betreiber von Wallets für vollständige Knoten migrieren zu dieser Kombination statt zu Zebra allein.
* Drei isolierte Compose-Projekte können auf einem Host laufen: **Mainnet**, **Testnet** und **Regtest**.
* Der erste Mainnet-Sync dauert etwa **24–72 Stunden** und benötigt ungefähr **300 GB**. Regtest ist in Sekunden einsatzbereit und eignet sich am besten, um den Stack kennenzulernen.
* Im festgelegten Z3-Image verwendet Zallet sein `zallet-zaino`-Backend (die Indexer-Bibliotheken von Zaino) und kommuniziert per JSON-RPC mit Zebra. Zallet hat dieses Backend in v0.1.0-beta.4 entfernt; das aktuelle Zallet liest den Zustand von Zebra direkt. Der eigenständige Dienst Zaino wird nur benötigt, wenn du einen mit lightwalletd kompatiblen Endpunkt für externe Wallets möchtest.
* Zallet befindet sich in der **Beta**. Bei Änderungen mit inkompatiblen Folgen kann es nötig sein, die Wallet zu löschen und neu zu erstellen. Betrachte es nicht als ausgereifte Verwahrungssoftware für große Summen.

---

## Warum Z3 existiert

Während des größten Teils der Lebenszeit von Zcash war `zcashd` sowohl der Referenz-Full-Node als auch die einzige produktive Full-Node-Wallet. Gegen dieses Design integrierten Börsen, Pools und Verwahrer.

`zcashd` wurde eingestellt. Der Konsens wechselte zu [Zebra](/zcash-tech/zebra-full-node) (und inzwischen auch zu [Zakura](/zcash-tech/zakura-node)). Die integrierte Wallet wechselte zu [Zallet](https://github.com/zcash/zallet). Die Bereitstellung für Light Wallets wechselt von [lightwalletd](/zcash-tech/lightwallet-nodes) zu [Zaino](/zcash-tech/zaino).

Diese drei Komponenten sind separate Repositories, folgen separaten Release-Zyklen und haben separate Konfigurationen. Z3 ist der Klebstoff: angeheftete Images, Health Checks, die die Wallet erst starten lassen, wenn der Knoten synchronisiert ist, netzwerkspezifische Ports und Volumes sowie ein dokumentierter Pfad für Betreiber.

Der Name ist informeller Kurzgebrauch im Ökosystem — Zebra, Zaino, Zallet — obwohl die Standard-Compose-Datei nur Zebra und Zallet startet. Zaino ist ein Compose-Profil, kein erforderlicher dritter Prozess.

---

## Architektur

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| Komponente | Rolle in Z3 | Erforderlich? |
| --- | --- | --- |
| **Zebra** | Synchronisiert und validiert die Chain, Gossip, JSON-RPC und den Health-Endpunkt | Ja |
| **Zallet** | Wallet mit vollständigem Knoten. Das festgelegte beta.1-Image verwendet das Backend der Zaino-Bibliothek (`zallet-zaino`, entfernt in Zallet beta.4) und verbindet sich direkt mit Zebra JSON-RPC. Ruft den eigenständigen Zaino-Container **nicht** auf | Ja |
| **Zaino** | Eigenständiger Indexer. Mit lightwalletd kompatibles gRPC für externe Light-Clients sowie ein JSON-RPC-Proxy für Explorer und Faucets | Nein — `--profile indexer` |

Z3 heftet Image-Versionen in `docker-compose.yml` an. Überschreibe sie mit `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` oder `Z3_ZALLET_IMAGE`, wenn du einen anderen Tag benötigst.

---

## Unterschiede zu zcashd

| | zcashd | Z3 |
| --- | --- | --- |
| Sprache | C++ (Bitcoin-Fork) | Rust-Dienste, orchestriert mit Docker Compose |
| Prozessmodell | Eine Binärdatei: Knoten + Wallet | Getrennte Knoten- und Wallet-Container |
| Konsens | Eingestellt (EOS 18. Juli 2026) | Zebra (oder ein anderer kompatibler Knoten) |
| Wallet | Integriertes `wallet.dat` | Zallet, mit age verschlüsseltes Datadir |
| Light Clients | Üblicherweise ein separates lightwalletd | Optionales Zaino-Profil |
| Konfiguration | `zcash.conf` | Netzwerkspezifische Dateien unter `config/<network>/` plus Compose-Umgebungsdateien |
| Netzwerke auf einem Host | Schwierige Portkonflikte | Erstklassig: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

Wenn du noch eine `zcashd`-Wallet hast, nutze den [Migrationsleitfaden](/guides/migration-guide-zcashd-to-zebrad-zallet) von ZecHub und den Befehl `migrate-zcashd-wallet` von Zallet, statt `wallet.dat` in das Z3-Volume zu kopieren.

---

## Netzwerke

Z3 besteht aus drei unabhängigen Compose-Projekten. Sie teilen weder Ports noch Volumes.

| Netzwerk | Projektname | Verwende es für | Erste Synchronisierung | Echte Gelder |
| --- | --- | --- | --- | --- |
| **Mainnet** | `z3-mainnet` | Produktion | 24–72 Stunden | Ja |
| **Testnet** | `z3-testnet` | Staging im öffentlichen Testnetz | 2–12 Stunden | Nein (Test-ZEC) |
| **Regtest** | `z3-regtest` | Lokales Üben: sofortige Blöcke, keine Peers | Sekunden | Nein |

Neue Betreiber sollten mit **Regtest** beginnen, RPC- und Wallet-Abläufe bestätigen und dann zu Testnet oder Mainnet wechseln.

---

## Standard-Host-Ports

Alle drei Netzwerke sollen auf einem Rechner parallel bestehen. Die folgenden Werte sind die veröffentlichten Standardwerte; jeder einzelne kann über die entsprechende Umgebungsvariable `Z3_*` überschrieben werden. Die kanonische Matrix ist [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

| Dienst | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (nicht veröffentlicht) |
| Zebra Health (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (Indexer-Profil) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (Indexer-Profil) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Innerhalb des Compose-Netzwerks werden Dienste über ihren Namen aufgelöst (`zebra`, `zaino`, `zallet`).

---

## Daten und Backups

| Volume | Inhalt | Sichern? |
| --- | --- | --- |
| `z3-<network>-chain` | Chain-Status von Zebra (~300 GB Mainnet) | Optional — erneut synchronisierbar |
| `z3-<network>-zallet` | Verschlüsselte Wallet-Datenbank **und** die age-Identität, die sie entsperrt | **Ja — dies ist das einzige Volume, das gesichert werden muss** |
| `z3-<network>-zaino` | Indexer-Status (nur mit dem Indexer-Profil) | Optional — neu aufbaubar |
| `z3-<network>-cookie` | RPC-Cookie von Zebra | Nein — wird neu erzeugt |

Um den Chain-Status vor dem ersten Start auf eine andere Festplatte zu legen:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` stoppt den Stack und behält die Volumes. Das Hinzufügen von `-v` löscht sie und erzwingt eine vollständige erneute Synchronisierung. Füge `--profile "*"` ein, damit profilgebundene Dienste (Indexer, Monitoring) tatsächlich heruntergefahren werden.

---

## Erste Schritte

Voraussetzungen: Docker Engine, Docker Compose v2.24.4+, Git. `openssl` wird nur für Regtest benötigt.

### Regtest (der schnellste Weg, den Stack zu sehen)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

Siehe [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) für Testbefehle.

### Mainnet (Start in zwei Phasen)

Zebra muss die Synchronisierung abschließen, bevor Zallet sinnvoll nutzbar ist. Ein früher Start von Zallet führt zu einer Neustartschleife, bis `/ready` wahr ist.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

Für Testnet gilt derselbe Ablauf mit `.env.testnet` und `./scripts/check-zebra-readiness.sh 18080`.

Änderungen unter `config/<network>/` bleiben lokal und überdauern `git pull`.

### Optionale Profile

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Die Standard-Grafana-Ports sind 3000 (Mainnet), 13000 (Testnet), 23000 (Regtest).

---

## Hinweise für Betreiber

* **Fixierte Images.** Z3 wechselt nicht unbemerkt zu `:latest`. Aktualisiere einen Fix in einer geprüften Änderung oder setze `Z3_<SERVICE>_IMAGE`. Die Fixes wurden seit August 2026 nicht geändert und sind daher älter als NU7 (siehe Statushinweis oben).
* **Container ohne Root-Rechte.** Linux-Capabilities werden verworfen. Healthchecks halten die Wallet zurück, bis Zebra bereit ist. Eine Neustartrichtlinie ist standardmäßig aktiviert.
* **Protokolle.** Z3 legt keinen Protokolltreiber fest. Begrenze die Größe in der Docker-Daemon-Konfiguration, sonst wachsen die Protokolle auf einem rund um die Uhr betriebenen Knoten unbegrenzt.
* **P2P.** Mainnet und Testnet veröffentlichen den P2P-Port von Zebra. Hinter NAT setze `ZEBRA_NETWORK__EXTERNAL_ADDR` auf die Adresse, unter der Peers den Knoten erreichen sollen. Regtest hat keine Peers.
* **Zaino auf ARM.** Das vorgelagerte Zaino-Image ist nur für `linux/amd64` verfügbar. Auf Apple Silicon läuft es unter Emulation, sofern du es nicht aus dem Quellcode erstellst. Zebra und Zallet unterstützen mehrere Architekturen.
* **Gemeinsam genutzte Hosts.** Standardmäßig sind keine CPU- oder Speicherlimits festgelegt. Füge `deploy.resources.limits` in einer Override-Datei hinzu, wenn der Rechner nicht ausschließlich für den Knoten vorgesehen ist.

Checkliste und FAQ für produktionsähnliche Umgebungen: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Wer sollte Z3 betreiben?

**Gut geeignet**

* Börsen, Verwahrer und Mining-Pools, die `zcashd` als Knoten-plus-Wallet nutzten
* Betreiber, die ein unterstütztes Full-Node-Wallet-RPC gegen ein synchronisiertes Zebra wünschen
* Entwickler, die Mainnet, Testnet und Regtest nebeneinander benötigen
* Alle, die über das Profil Zaino einen privaten, mit lightwalletd kompatiblen Endpunkt einrichten

**In der Regel das falsche Werkzeug**

* Endnutzer, die nur ZEC senden und empfangen müssen — verwenden eine Light Wallet wie ZODL / Zashi, Zingo oder Zkool (den gepflegten Nachfolger von YWallet)
* Personen, die nur die Chain validieren möchten — führen allein Zebra (oder Zakura) aus
* Personen, die nur kompakte Blöcke bereitstellen möchten — führen Zebra + Zaino oder Zebra + lightwalletd ohne Zallet aus

---

## Verwandte Seiten

* [Zebra Full Node](/zcash-tech/zebra-full-node) — Konsens-Knoten, den Z3 umschließt
* [Zaino](/zcash-tech/zaino) — optionales Indexer-Profil
* [Full Nodes](/zcash-tech/full-nodes) — Zebra, Zakura und das eingestellte zcashd
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — womit Light Clients kommunizieren
* [Zakura Knoten](/zcash-tech/zakura-node) — alternativer Full Node; wird heute nicht von Z3 bereitgestellt
* [Migrationsleitfaden: zcashd zu Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Entwicklerressourcen](/start-here/developer-resources)

---

## Ressourcen

* [Z3-Repository](https://github.com/ZcashFoundation/z3)
* [Z3-Vertrag (Ports, Volumes, Projektnamen)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Das Zebra Buch](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Das Zallet Buch](https://zcash.github.io/zallet/)
* [Zcash Community Forum — Z3-Updates](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — Community-Control-Plane über dem offiziellen Compose-Stack (ZecHub Hackathon)
