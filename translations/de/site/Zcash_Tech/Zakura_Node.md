<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zakura Knoten

Zakura ist eine kostenlose, quelloffene Full-Knoten-Implementierung für Zcash, die auf Skalierung ausgelegt ist. Als Fork von [Zebra](Zebra_Full_Node.md) und entwickelt durch eine Zusammenarbeit zwischen **Valar Group** und **Project Tachyon** bietet Zakura eine drastisch schnellere Synchronisierung, natives Block-Pruning und eine Kompatibilitätsschicht für ältere `zcashd`-Werkzeuge. Version 1.0.0 wurde am 15. Juli 2026 veröffentlicht. Seitdem sind schnell weitere Versionen erschienen: 1.7.0 (22. Oktober 2026) aktivierte NU7 im Mainnet, und im November folgte die 1.8-Serie.

---

## Kurzfassung

- Zakura ist ein **konsenskompatibler Zcash-Full-Knoten** — eine Alternative zu Zebra und zcashd, geforkt von Zebra.
- Die Blockchain-Synchronisierung ist ungefähr **5× schneller als bei Zebra**; das Bootstrapping per Snapshot ist in **unter 2 Minuten** abgeschlossen.
- **Natives Block-Pruning** ermöglicht es Betreibern, einen Full-Knoten mit deutlich weniger Speicherplatz zu betreiben (~11 GB für einen geprunten Snapshot gegenüber 300 GB für einen vollständigen Zebra-Knoten).
- Ein **zcashd-RPC-Kompatibilitätsmodus** ermöglicht es bestehenden Wallets und Integrationen, ohne Änderungen weiterzuarbeiten.
- Eine **experimentelle P2P-Transportschicht** (standardmäßig deaktiviert) zielt auf eine Block-Propagation von unter 500 ms mit DoS-resistentem Gossip ab.
- Kompatibel mit **Ironwood (NU6.3)**, dem Zcash-Netzwerkupgrade, das Mitte 2026 aktiviert wurde.
- Folgt auf **NU7**: Zakura 1.7.0 ist die Version, die das Upgrade im Mainnet aktiviert. Jede Version stoppt außerdem an einem End-of-Support-Block, der wenige Wochen nach ihrer Veröffentlichung erreicht wird. Daher sollte regelmäßig aktualisiert werden (siehe „Bevor du loslegst“ weiter unten).
- **Zakura Common** (v1.3.0, August 2026) beschleunigt die Kryptografie, die Wallets zum Erstellen privater Transaktionen verwenden: von über 3 Sekunden auf unter 200 ms in vielen Fällen, laut den Benchmarks von Zakura.
- Geleitet von **Sean Bowe** (Mitgründer von Zcash, Project Tachyon) und **Dev Ojha** (Valar Group).

---

## Was ist Zakura?

Zakura ist ein Zcash-Full-Knoten, der von Grund auf für den produktiven Einsatz im großen Maßstab entwickelt wurde. Obwohl er die Konsenskompatibilität mit Zebra teilt — das heißt, er validiert und befolgt dieselben Zcash-Protokollregeln — führt Zakura wesentliche technische Verbesserungen ein, die darauf abzielen, die Hürde für den Betrieb eines Zcash-Full-Knotens zu senken.

Das Projekt ist eine gemeinsame Initiative von **Project Tachyon** (geleitet von Sean Bowe, einem der ursprünglichen Kryptografie-Ingenieure von Zcash) und **Valar Group** (geleitet von Dev Ojha). Gemeinsam konzentrieren sie sich auf Zcash-Protokollverbesserungen der nächsten Generation, und Zakura dient als Referenz-Knoten für diese Arbeit.

---

## Hauptmerkmale

### 5× Schnellere Chain-Synchronisierung

Zakura erreicht im Vergleich zu Zebra eine ungefähr 5× schnellere Blockchain-Synchronisierung. Das macht ihn deutlich praktischer für Betreiber, die schnell einen Knoten starten oder sich von Ausfallzeiten erholen müssen.

### Snapshot-Bootstrapping

Zakura veröffentlicht vorgefertigte Chain-Snapshots, die die anfängliche Synchronisierungszeit drastisch verkürzen:

| Bootstrap-Methode | Zeit |
|------------------|------|
| Archiv-Snapshot | ~37 Minuten |
| Geprunter Snapshot | **Unter 2 Minuten** |
| Zebra (vollständige Synchronisierung) | ~20 Stunden |

Geprunte Snapshots sind ungefähr **11 GB** groß und ermöglichen ein **680× schnelleres** Knoten-Bootstrapping im Vergleich zur Synchronisierung ab Genesis.

### Natives Block-Pruning

Zakura unterstützt konfigurierbares Block-Pruning, sodass Knotenbetreiber festlegen können, wie viel Chain-Verlauf sie aufbewahren möchten. Dadurch wird es praktikabel, einen Full-Knoten auf Hardware mit begrenztem Speicher zu betreiben — nützlich für Validatoren, Entwickler und Infrastrukturanbieter, die nicht die vollständige historische Chain benötigen.

### zcashd RPC-Kompatibilitätsmodus

Zakura enthält einen Kompatibilitätsmodus, der die ältere `zcashd`-JSON-RPC-Schnittstelle nachbildet. Bestehende Wallets, Börsen und Integrationen, die auf `zcashd`-RPCs angewiesen sind, können ohne Codeänderungen auf Zakura umsteigen.

### Experimentelle P2P-Transportschicht

Zakura wird mit einer Peer-to-Peer-Transportschicht der nächsten Generation ausgeliefert, die derzeit **standardmäßig deaktiviert** ist. Wenn sie aktiviert wird, zielt sie auf Folgendes ab:

- Block-Propagation im Worst-Case von unter 500 ms im gesamten Netzwerk
- Mempool-Aggregation für eine effizientere Weiterleitung von Transaktionen
- DoS-resistentes Gossip-Protokoll zur Verbesserung der Netzwerkresilienz

Diese Schicht stellt eine Vorschau auf zukünftige Verbesserungen auf Zcash-Netzwerkebene dar, die im Rahmen von Project Tachyon entwickelt werden.

### Kompatibel mit Ironwood (NU6.3)

Zakura ist vollständig kompatibel mit dem Ironwood-Netzwerkupgrade (NU6.3), das Mitte 2026 im Zcash-Mainnet aktiviert wurde.

### NU7

Zakura 1.7.0, veröffentlicht am 22. Oktober 2026, ist die Version, die NU7 im Mainnet aktiviert ([Versionshinweise](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). Ein Knoten benötigt Version 1.7.0 oder neuer, um der Chain nach dem Upgrade zu folgen. [NU7](NU7.md) beschreibt, was sich durch das Upgrade ändert.

---

## Zakura Common: Schnellere Wallet-Kryptografie

Im August 2026 veröffentlichte das Team von Zakura Zakura Common, eine Reihe beschleunigter Forks der Kryptografiebibliotheken, auf die Zcash-Wallets und Knoten angewiesen sind. Zakura wechselte in Version 1.3.0 auf den neuen Stack, und Vizor Wallet gehört zu den ersten Wallets, die ihn integrieren.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Laut den eigenen Benchmarks von Zakura:

| Vorgang | Beschleunigung |
|--|--|
| Proof-Erstellung auf Mobilgeräten | mehr als 14× (Desktop: mehr als 5×) |
| Sinsemilla-Hashing | mehr als 21× |
| zk-SNARK-Verifizierung | 4–8× |
| Testentschlüsselung | mehr als 1,5× |

Für Nutzer ist die sichtbarste Veränderung die Wartezeit. Das Erstellen einer privaten Transaktion dauerte für ein wallet früher mehr als drei Sekunden. Mit Zakura Common kann es in vielen Fällen weniger als 200 ms dauern. Das ist die Zeit, die dein Gerät für die Vorbereitung der Transaktion benötigt, nicht die Zeit, die das Netzwerk für ihre Bestätigung braucht.

---

## Wie Zakura mit anderen Zcash-Knoten zusammenhängt

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Sprache | C++ (Fork von Bitcoin) | Rust | Rust (Fork von Zebra) |
| Status | Veraltet | Aktiv | Aktiv (v1.0.0 Juli 2026; v1.8.8 November 2026) |
| Synchronisierungsgeschwindigkeit | Referenzwert | ~1× | ~5× schneller |
| Block-Pruning | Nein | Nein | Ja |
| zcashd-RPC-Kompatibilität | Nativ | Teilweise | Ja (Kompatibilitätsmodus) |
| Snapshot-Bootstrap | Nein | Nein | Ja (weniger als 2 Min.) |
| Experimentelles P2P | Nein | Nein | Ja (Opt-in) |

---

## Erste Schritte

Download-Optionen, Snapshots und Konfigurationsdokumentation sind verfügbar unter:

- **Download- und Einrichtungsanleitung:** [zakura.com/download](https://zakura.com/download/)
- **Kettensnapshots:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Quellcode:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **Versionshinweise:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### Bereitstellung für Light Wallets

Zakura ist kein Server für Light-Wallets. Es implementiert `CompactTxStreamer` nicht, das gRPC-Protokoll, das Light-Wallets wie Zodl (früher Zashi) verwenden. Daher kann sich eine Wallet nicht direkt mit `zakurad` verbinden. Um Light-Wallets zu bedienen, schalte einen der folgenden Dienste davor:

- [Zaino](Zaino.md) (bevorzugt)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer), Zcash Labs' Indexer und Light-Wallet-Server, der die Blockchain von einem Zakura Knoten liest, entweder eingebettet in seinen eigenen Prozess oder über JSON-RPC von einem entfernten Knoten

Der eigene Indexer-gRPC von Zakura (`indexer_listen_addr` im Abschnitt `[rpc]`, standardmäßig deaktiviert) ist eine separate Schnittstelle: Block-, Mempool- und Chain-Tip-Streams für vertrauenswürdige Software, die du selbst betreibst, nicht das Light-Wallet-Protokoll. Klartext ist nur über Loopback zulässig; für jede andere Adresse ist gegenseitiges TLS erforderlich ([Konfigurationsreferenz](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### Bevor du es ausführst

Einige Punkte aus den Versionshinweisen zu 1.8, die Betreiber überraschen:

- **Releases laufen ab.** Für jedes Zakura-Release gibt es eine Support-Endhöhe, und ein Mainnet-Knoten, auf dem es läuft, hält bei diesem Block an. Die Releases 1.8.x werden „bis Block 3.643.309, voraussichtlich am 3. Dezember 2026, im Mainnet unterstützt“; etwa drei Tage zuvor erscheinen Upgrade-Warnungen ([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). Prüfe vor diesem Datum, ob es ein neueres Release gibt, und verwende keine alte Version fest in Skripten oder Deployment-Vorlagen, ohne einen Plan für ein Upgrade zu haben.
- **x86-64-CPU-Anforderung seit 1.8.0.** Release-Binärdateien und Docker-Images verwenden BMI2/ADX-Befehlssatzerweiterungen. Dafür ist mindestens ein Intel Broadwell, AMD Zen oder neuer erforderlich. Auf einer älteren CPU wird `zakurad` beim Start mit einer Fehlermeldung zu den fehlenden Erweiterungen beendet. Erstelle mit `--features portable` einen Build aus dem Quellcode, um das Programm auf solchen Rechnern auszuführen ([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **Alte generierte Konfigurationen und natives P2P.** `zakurad generate` schrieb früher `peer_memory_budget_bytes = 8589934592` (8 GiB). Seit 1.8.3 ermöglicht das etwa halb so viele native P2P-Verbindungen; mit 4 GiB oder weniger lässt sich kein Knoten mit nativem P2P starten. Setze `[network.zakura] peer_memory_budget_bytes` auf mindestens 15 GiB oder lösche die Zeile, um den neuen Standardwert von 15 GiB zu verwenden ([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **Zustandswerkzeuge sind jetzt Teil von `zakurad`.** Seit 1.8.3 werden die eigenständigen Binärdateien `zakura-prune-state` und `zakura-rollback-state` nicht mehr mitgeliefert, auch nicht in Docker. Verwende stattdessen `zakurad prune-state` und `zakurad rollback-state`. Sie akzeptieren dieselben Argumente, laden aber `zakura.toml`. Übergib daher `--cache-dir`, um ein bestimmtes Zustandsverzeichnis anzugeben.

---

## Verwandte Seiten

- [Zebra Full Node](Zebra_Full_Node.md) — der Upstream-Zcash-Full-Knoten, von dem Zakura geforkt wurde
- [Zaino Indexer](Zaino.md) — ein Rust-basierter Indexer, der mit Zebra und Zakura kompatibel ist
- [Full-Knoten](Full_Nodes.md) — Überblick über Zcash-Full-Knoten-Optionen
- [Lightwallet-Knoten](Lightwallet_Nodes.md) — leichtgewichtige Client-Alternativen

## Ressourcen

- [Vorstellung von Zakura — Ankündigung](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura Website](https://zakura.com/)
- [Zakura auf X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Gemeinsame Ankündigung](https://zakura.com/announcements/zakura-common/)
